/**
 * Radio Station Research Tool
 * Looks up music director / PD contact info for a given station call letters.
 * Sources: radiolocator.com, allaccess.com, country-aircheck.com, station websites.
 *
 * Usage:
 *   RESEND_API_KEY=... npx tsx scripts/research.ts WKDF
 *   npx tsx scripts/research.ts --market Orlando --format Country
 */

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const DATA_PATH = path.resolve(__dirname, "../data/stations.csv");

// ── CSV helpers ──────────────────────────────────────────────────────────────

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let cur = "";
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuote && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuote = !inQuote;
    } else if (ch === "," && !inQuote) {
      result.push(cur.trim()); cur = "";
    } else {
      cur += ch;
    }
  }
  result.push(cur.trim());
  return result;
}

function parseCSV(raw: string): Record<string, string>[] {
  const lines = raw.trim().split("\n");
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map((line) => {
    const vals = parseCSVLine(line);
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (vals[i] ?? "").trim()]));
  });
}

function toCSV(rows: Record<string, string>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(","), ...rows.map((r) => headers.map((h) => r[h] ?? "").join(","))];
  return lines.join("\n") + "\n";
}

// ── Research targets ─────────────────────────────────────────────────────────

function researchUrls(callLetters: string): string[] {
  const lc = callLetters.toLowerCase();
  return [
    `https://www.radiolocator.com/cgi-bin/locate?select=callsign&callsign=${callLetters}`,
    `https://www.allaccess.com/net-news/archive/search?q=${callLetters}`,
    `https://${lc}.com`,
    `https://www.${lc}.com/about`,
    `https://www.${lc}.com/contact`,
    `https://www.fcc.gov/media/radio/fm-query?call_sign=${callLetters}`,
  ];
}

// ── Print station summary ─────────────────────────────────────────────────────

function printStation(s: Record<string, string>) {
  console.log("\n" + "─".repeat(58));
  console.log(`  ${s.call_letters}  —  ${s.station_name}  (${s.frequency})`);
  console.log(`  ${s.market_city}, ${s.market_state}  |  Format: ${s.format}`);
  console.log("─".repeat(58));
  console.log(`  Status:        ${s.status}`);
  console.log(`  Main Phone:    ${s.phone_main || "(not collected)"}`);
  console.log(`  Direct Line:   ${s.phone_direct || "(not collected)"}`);
  console.log(`  Contact:       ${s.contact_name || "(not collected)"} — ${s.contact_title || ""}`);
  console.log(`  Email:         ${s.contact_email || "(not collected)"}`);
  console.log(`  Best Call:     ${s.best_call_days || "?"} ${s.best_call_time_start}–${s.best_call_time_end} ${s.timezone}`);
  console.log(`  Last Called:   ${s.last_called || "never"}  →  ${s.last_result || ""}`);
  console.log(`  Follow-up:     ${s.follow_up_date || "—"}`);
  if (s.notes) console.log(`  Notes:         ${s.notes}`);
  console.log();
  console.log("  Research URLs:");
  researchUrls(s.call_letters).forEach((u) => console.log(`    ${u}`));
  console.log("─".repeat(58) + "\n");
}

// ── Update a field interactively ─────────────────────────────────────────────

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans.trim()); }));
}

async function interactiveUpdate(station: Record<string, string>): Promise<Record<string, string>> {
  console.log("\nUpdate fields (press Enter to keep current value):\n");
  const fields = ["phone_main","phone_direct","contact_name","contact_title","contact_email",
                  "best_call_days","best_call_time_start","best_call_time_end","timezone","notes","status","verified_date","source"];
  for (const field of fields) {
    const current = station[field] || "";
    const val = await prompt(`  ${field.padEnd(24)} [${current || "empty"}]: `);
    if (val) station[field] = val;
  }
  return station;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const rows = parseCSV(raw);

  if (!args.length) {
    // List all unverified stations needing research
    const unverified = rows.filter((r) => r.status === "UNVERIFIED" || !r.contact_name);
    console.log(`\n${unverified.length} stations need research:\n`);
    unverified.forEach((r) => {
      const missing = [];
      if (!r.phone_main) missing.push("phone");
      if (!r.contact_name) missing.push("contact");
      if (!r.best_call_time_start) missing.push("call window");
      console.log(`  ${r.call_letters.padEnd(8)} ${r.market_city.padEnd(16)} ${r.format.padEnd(20)} missing: ${missing.join(", ")}`);
    });
    console.log("\nRun: npx tsx scripts/research.ts <CALL_LETTERS>  to research a specific station");
    console.log("Run: npx tsx scripts/research.ts --market Orlando  to filter by market\n");
    return;
  }

  // Filter by market flag
  if (args[0] === "--market") {
    const market = args[1]?.toLowerCase();
    const filtered = rows.filter((r) => r.market_city.toLowerCase().includes(market));
    filtered.forEach(printStation);
    return;
  }

  // Single station lookup + optional interactive update
  const callLetters = args[0].toUpperCase();
  const idx = rows.findIndex((r) => r.call_letters === callLetters);
  if (idx === -1) {
    console.error(`Station ${callLetters} not found in database.`);
    process.exit(1);
  }

  printStation(rows[idx]);

  if (args.includes("--update")) {
    rows[idx] = await interactiveUpdate(rows[idx]);
    rows[idx].verified_date = new Date().toISOString().split("T")[0];
    rows[idx].status = "VERIFIED";
    fs.writeFileSync(DATA_PATH, toCSV(rows));
    console.log(`\nSaved. ${callLetters} marked VERIFIED.\n`);
  }
}

main().catch(console.error);
