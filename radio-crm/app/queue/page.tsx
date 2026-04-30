import Link from "next/link";
import { getStations } from "@/lib/sheets-cache";

export const dynamic = "force-dynamic";

function priorityScore(s: { follow_up_date: string; market_rank: string; status: string }): number {
  // Lower score = higher priority
  const today = new Date().toISOString().slice(0, 10);
  if (s.follow_up_date && s.follow_up_date <= today) return -1000; // overdue follow-ups first
  const rank = parseInt(s.market_rank, 10);
  return Number.isNaN(rank) ? 9999 : rank;
}

export default async function QueuePage() {
  let stations: Awaited<ReturnType<typeof getStations>> = [];
  let error: string | null = null;
  try {
    stations = await getStations();
  } catch (e: any) {
    error = e?.message || String(e);
  }

  const queue = stations
    .filter((s) => s.status !== "DNC" && s.status !== "SUBMITTED")
    .sort((a, b) => priorityScore(a) - priorityScore(b))
    .slice(0, 100);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <header className="flex items-baseline justify-between mb-8">
        <div>
          <p className="text-ink-faint text-xs tracking-[0.18em] uppercase">◆ GCE Radio CRM</p>
          <h1 className="text-2xl font-extrabold mt-1">Today&apos;s Queue</h1>
        </div>
        <p className="text-ink-muted text-sm">{queue.length} of {stations.length}</p>
      </header>

      {error && (
        <div className="bg-red-950 border border-red-800 text-red-200 p-4 rounded-md mb-6 text-sm">
          <strong>Sheet not loaded:</strong> {error}
          <p className="mt-2 text-xs">Check GCE_RADIO_SHEET_ID and that the service account has access.</p>
        </div>
      )}

      <div className="bg-bg-panel border border-bg-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-border text-ink-muted text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Call</th>
              <th className="px-4 py-3 text-left">Market</th>
              <th className="px-4 py-3 text-left">Format</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((s) => (
              <tr key={s.call_letters} className="border-t border-bg-border hover:bg-bg-border/40">
                <td className="px-4 py-3 text-ink-muted">{s.market_rank || "—"}</td>
                <td className="px-4 py-3 font-mono">
                  <Link href={`/station/${s.call_letters}`} className="text-accent hover:underline">
                    {s.call_letters}
                  </Link>
                </td>
                <td className="px-4 py-3">{s.market_city}, {s.market_state}</td>
                <td className="px-4 py-3 text-ink-dim">{s.format || "—"}</td>
                <td className="px-4 py-3">{s.contact_name || <span className="text-ink-muted italic">unknown</span>}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-1 rounded bg-bg-border text-ink-dim">{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
