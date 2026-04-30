/**
 * Log a call result and update station record.
 *
 * Usage:
 *   npx tsx scripts/log-call.ts WKDF
 *   (interactive — prompts for result, contact reached, notes, follow-up date)
 */

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { randomUUID } from "crypto";

const STATIONS_PATH = path.resolve(__dirname, "../data/stations.csv");
const LOG_PATH = path.resolve(__dirname, "../data/call-log.csv");

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
  return [headers.join(","), ...rows.map((r) => headers.map((h) => r[h] ?? "").join(","))].join("\n") + "\n";
}

async function prompt(q: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) => rl.question(q, (a) => { rl.close(); res(a.trim()); }));
}

const RESULTS = ["ANSWERED","VOICEMAIL","NO_ANSWER","WRONG_NUMBER","CALLBACK_REQUESTED","SUBMITTED_MUSIC","REJECTED","GATEKEEPER"];

async function main() {
  const callLetters = process.argv[2]?.toUpperCase();
  if (!callLetters) {
    console.error("Usage: npx tsx scripts/log-call.ts <CALL_LETTERS>");
    process.exit(1);
  }

  const stationsRaw = fs.readFileSync(STATIONS_PATH, "utf8");
  const stations = parseCSV(stationsRaw);
  const idx = stations.findIndex((r) => r.call_letters === callLetters);
  if (idx === -1) {
    console.error(`Station ${callLetters} not found.`);
    process.exit(1);
  }

  const s = stations[idx];
  console.log(`\nLogging call for: ${s.call_letters} — ${s.station_name} (${s.market_city}, ${s.market_state})\n`);
  console.log(`Results: ${RESULTS.map((r, i) => `[${i + 1}] ${r}`).join("  ")}\n`);

  const resultIdx = parseInt(await prompt("Result [1-8]: ")) - 1;
  const result = RESULTS[resultIdx] ?? "NO_ANSWER";
  const contact = await prompt("Contact reached (name or blank): ");
  const notes = await prompt("Notes: ");
  const followUp = await prompt("Follow-up date (YYYY-MM-DD or blank): ");
  const caller = await prompt("Caller [MikeZ]: ") || "MikeZ";

  const logEntry = {
    id: randomUUID().slice(0, 8),
    call_letters: callLetters,
    date: new Date().toISOString(),
    caller,
    contact_reached: contact,
    result,
    notes,
    follow_up: followUp,
  };

  // Append to call log
  const logRaw = fs.readFileSync(LOG_PATH, "utf8").trim();
  const logHeaders = logRaw.split("\n")[0];
  const newLine = Object.values(logEntry).map((v) => String(v).replace(/,/g, ";")).join(",");
  fs.writeFileSync(LOG_PATH, logRaw + "\n" + newLine + "\n");

  // Update station record
  stations[idx].last_called = new Date().toISOString().split("T")[0];
  stations[idx].last_result = result;
  if (followUp) stations[idx].follow_up_date = followUp;
  if (contact && !stations[idx].contact_name) stations[idx].contact_name = contact;
  if (result === "ANSWERED" || result === "SUBMITTED_MUSIC") stations[idx].status = "ACTIVE";
  fs.writeFileSync(STATIONS_PATH, toCSV(stations));

  console.log(`\n✓ Logged call #${logEntry.id} — ${callLetters} → ${result}\n`);
}

main().catch(console.error);
