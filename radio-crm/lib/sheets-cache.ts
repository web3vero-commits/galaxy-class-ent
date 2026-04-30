import { sheetsClient, SHEET_ID } from "./google";

const TTL_MS = 5 * 60 * 1000;

interface CacheEntry<T> { value: T; at: number; }
const cache = new Map<string, CacheEntry<any>>();

async function readRange(range: string): Promise<string[][]> {
  const cached = cache.get(range);
  if (cached && Date.now() - cached.at < TTL_MS) return cached.value;

  const res = await sheetsClient().spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  const value = (res.data.values || []) as string[][];
  cache.set(range, { value, at: Date.now() });
  return value;
}

export interface Station {
  call_letters: string;
  station_name: string;
  frequency: string;
  format: string;
  market_city: string;
  market_state: string;
  market_rank: string;
  owner: string;
  phone_main: string;
  phone_direct: string;
  contact_name: string;
  contact_title: string;
  contact_email: string;
  best_call_days: string;
  best_call_time_start: string;
  best_call_time_end: string;
  timezone: string;
  last_called: string;
  last_result: string;
  follow_up_date: string;
  status: string;
  notes: string;
}

function rowsToObjects<T>(rows: string[][]): T[] {
  if (!rows.length) return [];
  const headers = rows[0];
  return rows.slice(1).map((r) =>
    Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""]))
  ) as T[];
}

export async function getStations(): Promise<Station[]> {
  const rows = await readRange("Stations!A1:Z");
  return rowsToObjects<Station>(rows);
}

export async function getStation(callLetters: string): Promise<Station | null> {
  const all = await getStations();
  return all.find((s) => s.call_letters.toUpperCase() === callLetters.toUpperCase()) || null;
}

export async function appendCallLog(entry: {
  call_letters: string;
  caller: string;
  result: string;
  contact_reached?: string;
  notes?: string;
  follow_up?: string;
}) {
  const date = new Date().toISOString();
  await sheetsClient().spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "CallLog!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        crypto.randomUUID(),
        entry.call_letters,
        date,
        entry.caller,
        entry.contact_reached || "",
        entry.result,
        entry.notes || "",
        entry.follow_up || "",
      ]],
    },
  });
  // Bust cache so the station's last_called updates show up faster
  cache.delete("Stations!A1:Z");
}

export function bustCache() { cache.clear(); }
