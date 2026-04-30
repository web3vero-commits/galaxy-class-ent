/**
 * Export stations.csv as a formatted Google Sheets-ready CSV
 * with color-coding hints and sorted by priority (market rank, then status).
 *
 * Usage: npx tsx scripts/export-sheet.ts > exports/stations-$(date +%F).csv
 */

import * as fs from "fs";
import * as path from "path";

const DATA_PATH = path.resolve(__dirname, "../data/stations.csv");
const EXPORT_DIR = path.resolve(__dirname, "../exports");

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

const STATUS_PRIORITY: Record<string, number> = {
  ACTIVE: 1, VERIFIED: 2, CALLBACK_REQUESTED: 3,
  UNVERIFIED: 4, NO_CONTACT: 5, DNC: 9, SUBMITTED: 2,
};

const EXPORT_HEADERS = [
  "call_letters","station_name","frequency","format","market_city","market_state",
  "phone_main","phone_direct","contact_name","contact_title","contact_email",
  "best_call_days","best_call_time_start","best_call_time_end","timezone",
  "last_called","last_result","follow_up_date","status","notes",
];

function main() {
  const rows = parseCSV(fs.readFileSync(DATA_PATH, "utf8"));

  const sorted = rows.sort((a, b) => {
    const rankA = parseInt(a.market_rank) || 999;
    const rankB = parseInt(b.market_rank) || 999;
    const statusA = STATUS_PRIORITY[a.status] ?? 5;
    const statusB = STATUS_PRIORITY[b.status] ?? 5;
    return statusA - statusB || rankA - rankB;
  });

  const lines = [
    EXPORT_HEADERS.join(","),
    ...sorted.map((r) => EXPORT_HEADERS.map((h) => `"${(r[h] ?? "").replace(/"/g, '""')}"`).join(",")),
  ];
  const csv = lines.join("\n") + "\n";

  const date = new Date().toISOString().split("T")[0];
  const outPath = path.join(EXPORT_DIR, `stations-${date}.csv`);
  fs.writeFileSync(outPath, csv);
  console.log(`Exported ${sorted.length} stations → ${outPath}`);
  console.log(`\nStatus summary:`);
  const counts: Record<string, number> = {};
  sorted.forEach((r) => { counts[r.status] = (counts[r.status] || 0) + 1; });
  Object.entries(counts).sort((a,b) => a[0].localeCompare(b[0])).forEach(([s, n]) => console.log(`  ${s.padEnd(20)} ${n}`));
}

main();
