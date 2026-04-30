/**
 * Initialize the GCE Radio CRM Google Sheet:
 *   - Stations tab: header row matching the radio-outreach Station schema
 *   - CallLog tab: header row for the per-call log
 *   - FollowUps tab: stub
 *   - Artists tab: stub for per-artist pitch scripts
 *
 * Pre-req: create an empty Google Sheet manually, share it with the
 * service account email as Editor, set GCE_RADIO_SHEET_ID in .env.local.
 *
 * Usage:
 *   set -a && source ../../.env && set +a
 *   npx tsx scripts/init-sheet.ts
 */

import { google } from "googleapis";
import * as fs from "fs";

const STATIONS_HEADERS = [
  "call_letters", "station_name", "frequency", "format",
  "market_city", "market_state", "market_rank", "owner",
  "phone_main", "phone_direct", "contact_name", "contact_title", "contact_email",
  "best_call_days", "best_call_time_start", "best_call_time_end", "timezone",
  "last_called", "last_result", "follow_up_date", "status", "notes",
  "verified_date", "source",
];

const CALLLOG_HEADERS = [
  "id", "call_letters", "date", "caller", "contact_reached",
  "result", "notes", "follow_up",
];

const ARTISTS_HEADERS = [
  "artist_id", "artist_name", "release_title", "release_date",
  "format_targets", "pitch_script", "active",
];

async function main() {
  const sheetId = process.env.GCE_RADIO_SHEET_ID;
  if (!sheetId) { console.error("GCE_RADIO_SHEET_ID not set"); process.exit(1); }

  const path = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_PATH;
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const credentials = inline
    ? JSON.parse(inline)
    : JSON.parse(fs.readFileSync(path!, "utf8"));

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  // Get current state
  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const existingTabs = (meta.data.sheets || []).map((s) => s.properties?.title);
  console.log("Existing tabs:", existingTabs.join(", "));

  const wantedTabs = [
    { title: "Stations", headers: STATIONS_HEADERS },
    { title: "CallLog", headers: CALLLOG_HEADERS },
    { title: "FollowUps", headers: ["call_letters", "date", "reason", "owner"] },
    { title: "Artists", headers: ARTISTS_HEADERS },
  ];

  // Add missing tabs
  const requests: any[] = [];
  for (const t of wantedTabs) {
    if (!existingTabs.includes(t.title)) {
      requests.push({ addSheet: { properties: { title: t.title } } });
    }
  }
  if (requests.length) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: sheetId, requestBody: { requests } });
    console.log(`Created tabs: ${requests.map((r) => r.addSheet.properties.title).join(", ")}`);
  }

  // Write headers
  for (const t of wantedTabs) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${t.title}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [t.headers] },
    });
    console.log(`Wrote ${t.headers.length} headers to ${t.title}.`);
  }

  console.log("\nDone. Sheet is ready. Next: import enriched data into Stations tab.");
}

main().catch((e) => { console.error(e); process.exit(1); });
