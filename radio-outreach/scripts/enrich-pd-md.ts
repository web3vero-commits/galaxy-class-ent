/**
 * Phase 1 PD/MD Enrichment — Tavily search + Claude Haiku 4.5 extraction
 *
 * Reads:  data/stations-fcc-seed.csv (read-only, never modified)
 * Writes: data/stations-enriched.csv (resumable — appended after each station)
 * Logs:   data/enrichment-log.jsonl (one JSON object per station processed)
 *
 * Filter defaults: commercial only, market_rank <= 100, excludes format-locked
 * religious networks (EMF, AFR, Salem, Bible Broadcasting, CSN International,
 * Relevant Radio, Family Radio, Hope Media, Moody Radio, Smile FM, KHCB) and
 * any row already tagged Religious/Christian, College/Educational, or Public Radio.
 *
 * Usage:
 *   npx tsx scripts/enrich-pd-md.ts --dry-run                  # show what would run
 *   npx tsx scripts/enrich-pd-md.ts --limit 5                  # smoke test on 5 stations
 *   npx tsx scripts/enrich-pd-md.ts --rank-max 100 --limit 500 # full Phase 1 run
 *   npx tsx scripts/enrich-pd-md.ts --resume                   # skip already-processed call_letters
 *
 * Required env:
 *   ANTHROPIC_API_KEY=...
 *   TAVILY_API_KEY=...
 */

import * as fs from "fs";
import * as path from "path";
import Anthropic from "@anthropic-ai/sdk";

const ROOT = path.resolve(__dirname, "..");
const SEED_PATH = path.join(ROOT, "data/stations-fcc-seed.csv");
const OUT_PATH = path.join(ROOT, "data/stations-enriched.csv");
const LOG_PATH = path.join(ROOT, "data/enrichment-log.jsonl");

const HAIKU_MODEL = "claude-haiku-4-5-20251001";

// Owners that program from corporate HQ — station-level MDs do not pick spins.
const FORMAT_LOCKED_OWNERS = new Set([
  "EMF/K-LOVE",
  "American Family Radio",
  "Bible Broadcasting",
  "Salem",
  "CSN International",
  "Relevant Radio",
  "Family Radio",
  "Hope Media",
  "Moody Radio",
  "Smile FM",
  "KHCB",
]);

const SKIP_FORMATS = new Set([
  "Religious/Christian",
  "College/Educational",
  "Public Radio (News/Classical/AAA)",
]);

// ── CSV helpers ──────────────────────────────────────────────────────────────

function parseCSVLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuote && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuote = !inQuote;
    } else if (ch === "," && !inQuote) {
      out.push(cur); cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function parseCSV(raw: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = raw.split(/\r?\n/).filter((l) => l.length > 0);
  const headers = parseCSVLine(lines[0]).map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const vals = parseCSVLine(line);
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? ""]));
  });
  return { headers, rows };
}

function csvEscape(v: string): string {
  if (v == null) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function rowToCSV(headers: string[], row: Record<string, string>): string {
  return headers.map((h) => csvEscape(row[h] ?? "")).join(",");
}

// ── Filter ───────────────────────────────────────────────────────────────────

interface FilterOpts { rankMax: number; }

function isPromotable(r: Record<string, string>, opts: FilterOpts): boolean {
  if (FORMAT_LOCKED_OWNERS.has(r.owner)) return false;
  if (SKIP_FORMATS.has(r.format)) return false;
  const rank = parseInt(r.market_rank, 10);
  if (Number.isNaN(rank)) return false; // unranked = small/rural, skip for Phase 1
  if (rank > opts.rankMax) return false;
  return true;
}

// ── Tavily search ────────────────────────────────────────────────────────────

interface TavilyResult { url: string; title: string; content: string; }

async function tavilySearch(query: string): Promise<TavilyResult[]> {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      search_depth: "basic",
      max_results: 6,
      include_answer: false,
      include_raw_content: false,
    }),
  });
  if (!res.ok) throw new Error(`Tavily ${res.status}: ${await res.text()}`);
  const data = await res.json() as { results: TavilyResult[] };
  return data.results || [];
}

function buildQuery(s: Record<string, string>): string {
  const station = s.station_name && s.station_name !== s.call_letters
    ? `${s.call_letters} ${s.station_name}`
    : s.call_letters;
  return `${station} ${s.frequency} ${s.market_city} ${s.market_state} program director music director contact`;
}

// ── Claude extraction ────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You extract radio station Program Director / Music Director contact details from web search results.

You are given:
- Station identifiers (call letters, frequency, city, state, owner)
- 3-6 web search snippets that may or may not mention staff

Your job: identify the current Program Director (PD) and Music Director (MD), or whoever directly handles music adds / spin decisions. Return a JSON object via the extract_contacts tool.

Rules:
- Only extract people clearly labeled PD / Program Director / Music Director / MD / Operations Manager / Brand Manager / APD-MD. Do NOT return general managers, sales staff, on-air talent (DJs/hosts) unless they are also explicitly the MD.
- Direct phone = a number specifically tied to a person, not the station main line.
- Direct email = a person-named email (john@station.com), not info@/contact@/news@.
- If a search result is a press release announcing a hire or departure, prefer the most recent date.
- "confidence" rubric:
  - HIGH = name + title from a station's own staff page or AllAccess profile
  - MED  = name + title from LinkedIn, RadioInk, Country Aircheck, FMQB, or trade-press hire announcement
  - LOW  = name only, or title-only, or stale source (>2 years old by visible date), or inferred
- If you find nothing, set both pd_name and md_name to "" and confidence to "NONE".
- Always populate source_urls with the URLs you actually used (1-3 max).
- Never fabricate. If unsure, leave the field blank.`;

interface ExtractedContacts {
  pd_name: string;
  pd_title: string;
  pd_email: string;
  pd_phone: string;
  md_name: string;
  md_title: string;
  md_email: string;
  md_phone: string;
  station_website: string;
  source_urls: string[];
  confidence: "HIGH" | "MED" | "LOW" | "NONE";
  notes: string;
}

const EXTRACT_TOOL = {
  name: "extract_contacts",
  description: "Return the extracted PD/MD contact details for the station.",
  input_schema: {
    type: "object" as const,
    properties: {
      pd_name: { type: "string", description: "Program Director full name, or empty string" },
      pd_title: { type: "string", description: "Exact title, e.g. 'Program Director' or 'Operations Manager'" },
      pd_email: { type: "string" },
      pd_phone: { type: "string" },
      md_name: { type: "string", description: "Music Director full name, or empty string" },
      md_title: { type: "string" },
      md_email: { type: "string" },
      md_phone: { type: "string" },
      station_website: { type: "string", description: "Canonical station homepage URL if discovered" },
      source_urls: { type: "array", items: { type: "string" }, description: "URLs used to derive this answer" },
      confidence: { type: "string", enum: ["HIGH", "MED", "LOW", "NONE"] },
      notes: { type: "string", description: "Any caveats: stale source, multiple candidates, conflicting info" },
    },
    required: ["pd_name", "md_name", "confidence", "source_urls"],
  },
};

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function extractContacts(
  station: Record<string, string>,
  results: TavilyResult[],
): Promise<ExtractedContacts> {
  const stationContext = `STATION:
  call_letters: ${station.call_letters}
  station_name: ${station.station_name || "(unknown)"}
  frequency:    ${station.frequency}
  market:       ${station.market_city}, ${station.market_state}
  owner:        ${station.owner}
  market_rank:  ${station.market_rank || "unranked"}`;

  const resultsBlock = results.map((r, i) =>
    `[${i + 1}] ${r.title}
URL: ${r.url}
${r.content}`
  ).join("\n\n");

  const response = await anthropic.messages.create({
    model: HAIKU_MODEL,
    max_tokens: 800,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    tools: [EXTRACT_TOOL],
    tool_choice: { type: "tool", name: "extract_contacts" },
    messages: [
      {
        role: "user",
        content: `${stationContext}\n\nSEARCH RESULTS:\n\n${resultsBlock}\n\nExtract PD/MD contacts.`,
      },
    ],
  });

  const toolUse = response.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("Model did not call extract_contacts tool");
  }
  return toolUse.input as ExtractedContacts;
}

// ── Apply extraction back onto the row ───────────────────────────────────────

function applyExtraction(
  row: Record<string, string>,
  ex: ExtractedContacts,
): Record<string, string> {
  // Prefer MD over PD for the primary contact (MD = the spin-decision person).
  // If only PD known, use PD. If both, prefer MD as contact_name and stash PD in notes.
  const out = { ...row };
  let primaryName = "", primaryTitle = "", primaryEmail = "", primaryPhone = "";

  if (ex.md_name) {
    primaryName = ex.md_name;
    primaryTitle = ex.md_title || "Music Director";
    primaryEmail = ex.md_email;
    primaryPhone = ex.md_phone;
  } else if (ex.pd_name) {
    primaryName = ex.pd_name;
    primaryTitle = ex.pd_title || "Program Director";
    primaryEmail = ex.pd_email;
    primaryPhone = ex.pd_phone;
  }

  if (primaryName) {
    out.contact_name = primaryName;
    out.contact_title = primaryTitle;
    if (primaryEmail) out.contact_email = primaryEmail;
    if (primaryPhone) out.phone_direct = primaryPhone;
  }

  // Stash secondary contact + sources in notes (preserve existing notes)
  const noteParts: string[] = [];
  if (out.notes) noteParts.push(out.notes);
  if (ex.md_name && ex.pd_name) noteParts.push(`pd=${ex.pd_name} (${ex.pd_title || "PD"})${ex.pd_email ? " " + ex.pd_email : ""}${ex.pd_phone ? " " + ex.pd_phone : ""}`);
  if (ex.station_website) noteParts.push(`website=${ex.station_website}`);
  if (ex.source_urls?.length) noteParts.push(`sources=${ex.source_urls.slice(0, 3).join("|")}`);
  if (ex.notes) noteParts.push(`extract=${ex.notes}`);
  noteParts.push(`enriched=${new Date().toISOString().slice(0, 10)} conf=${ex.confidence}`);
  out.notes = noteParts.join(" ; ");

  // Status transition
  if (ex.confidence === "HIGH" || ex.confidence === "MED") out.status = "VERIFIED";
  else if (ex.confidence === "LOW" && primaryName) out.status = "PARTIAL";
  // NONE / no name → leave UNVERIFIED

  if (primaryName) out.verified_date = new Date().toISOString().slice(0, 10);
  out.source = (out.source ? out.source + "; " : "") + "enrich-v1";
  return out;
}

// ── Resume support ───────────────────────────────────────────────────────────

function loadProcessedCallLetters(): Set<string> {
  if (!fs.existsSync(LOG_PATH)) return new Set();
  const lines = fs.readFileSync(LOG_PATH, "utf8").split("\n").filter(Boolean);
  const set = new Set<string>();
  for (const line of lines) {
    try { set.add(JSON.parse(line).call_letters); } catch { /* ignore */ }
  }
  return set;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const flag = (name: string) => args.includes(name);
  const opt = (name: string, def: string) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : def;
  };

  const dryRun = flag("--dry-run");
  const resume = flag("--resume");
  const rankMax = parseInt(opt("--rank-max", "100"), 10);
  const limit = parseInt(opt("--limit", "500"), 10);

  if (!dryRun && !process.env.ANTHROPIC_API_KEY) {
    console.error("ERROR: ANTHROPIC_API_KEY not set"); process.exit(1);
  }
  if (!dryRun && !process.env.TAVILY_API_KEY) {
    console.error("ERROR: TAVILY_API_KEY not set"); process.exit(1);
  }

  const { headers, rows } = parseCSV(fs.readFileSync(SEED_PATH, "utf8"));
  console.log(`Loaded ${rows.length} stations from seed.`);

  const candidates = rows
    .filter((r) => isPromotable(r, { rankMax }))
    .sort((a, b) => parseInt(a.market_rank, 10) - parseInt(b.market_rank, 10));

  console.log(`${candidates.length} stations match filter (commercial, rank≤${rankMax}, non-format-locked).`);

  const processed = resume ? loadProcessedCallLetters() : new Set<string>();
  if (resume) console.log(`Resume: skipping ${processed.size} already-processed call letters.`);

  const queue = candidates.filter((r) => !processed.has(r.call_letters)).slice(0, limit);
  console.log(`Queue size for this run: ${queue.length}\n`);

  if (dryRun) {
    console.log("Top 20 of queue:");
    queue.slice(0, 20).forEach((r) => {
      console.log(`  rank ${String(r.market_rank).padStart(4)}  ${r.call_letters.padEnd(6)} ${r.frequency.padEnd(8)} ${r.market_city}, ${r.market_state}  [${r.owner}]`);
    });
    console.log("\nDry run complete. Re-run without --dry-run to execute.");
    return;
  }

  // Initialize output file: copy seed, then we'll patch matched rows in-memory and rewrite at the end.
  // For resumability, we keep an in-memory map keyed by call_letters and rewrite the full file every N stations.
  const enrichedMap = new Map<string, Record<string, string>>();
  if (resume && fs.existsSync(OUT_PATH)) {
    const existing = parseCSV(fs.readFileSync(OUT_PATH, "utf8"));
    for (const r of existing.rows) enrichedMap.set(r.call_letters, r);
  } else {
    for (const r of rows) enrichedMap.set(r.call_letters, { ...r });
  }

  const flushCSV = () => {
    const allRows = rows.map((r) => enrichedMap.get(r.call_letters) || r);
    const out = [headers.join(","), ...allRows.map((r) => rowToCSV(headers, r))].join("\n") + "\n";
    fs.writeFileSync(OUT_PATH, out);
  };

  let ok = 0, none = 0, err = 0;
  const t0 = Date.now();

  for (let i = 0; i < queue.length; i++) {
    const station = queue[i];
    const tag = `[${i + 1}/${queue.length}] ${station.call_letters} ${station.market_city}`;
    try {
      const query = buildQuery(station);
      const results = await tavilySearch(query);
      if (!results.length) {
        none++;
        fs.appendFileSync(LOG_PATH, JSON.stringify({ call_letters: station.call_letters, status: "no_search_results", at: new Date().toISOString() }) + "\n");
        console.log(`${tag}  no search results`);
        continue;
      }

      const ex = await extractContacts(station, results);
      const updated = applyExtraction(enrichedMap.get(station.call_letters)!, ex);
      enrichedMap.set(station.call_letters, updated);

      const tally = ex.md_name || ex.pd_name ? "ok" : "none";
      if (tally === "ok") ok++; else none++;
      fs.appendFileSync(LOG_PATH, JSON.stringify({
        call_letters: station.call_letters,
        status: tally,
        confidence: ex.confidence,
        pd_name: ex.pd_name,
        md_name: ex.md_name,
        sources: ex.source_urls,
        at: new Date().toISOString(),
      }) + "\n");

      const who = ex.md_name ? `MD ${ex.md_name}` : ex.pd_name ? `PD ${ex.pd_name}` : "—";
      console.log(`${tag}  ${ex.confidence.padEnd(5)} ${who}`);
    } catch (e: any) {
      err++;
      fs.appendFileSync(LOG_PATH, JSON.stringify({ call_letters: station.call_letters, status: "error", error: String(e?.message || e), at: new Date().toISOString() }) + "\n");
      console.log(`${tag}  ERROR ${e?.message || e}`);
    }

    // Flush every 10 stations so a crash doesn't lose progress
    if ((i + 1) % 10 === 0) flushCSV();
  }

  flushCSV();
  const dt = ((Date.now() - t0) / 1000).toFixed(0);
  console.log(`\nDone in ${dt}s.  found=${ok}  none=${none}  errors=${err}`);
  console.log(`Output: ${OUT_PATH}`);
  console.log(`Log:    ${LOG_PATH}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
