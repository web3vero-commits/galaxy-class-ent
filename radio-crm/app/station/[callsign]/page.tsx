import Link from "next/link";
import { notFound } from "next/navigation";
import { getStation } from "@/lib/sheets-cache";
import { LogCallForm } from "./log-call-form";

export const dynamic = "force-dynamic";

export default async function StationPage({ params }: { params: Promise<{ callsign: string }> }) {
  const { callsign } = await params;
  const s = await getStation(callsign);
  if (!s) notFound();

  const phone = s.phone_direct || s.phone_main;

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <Link href="/queue" className="text-ink-muted text-sm hover:text-ink">← Queue</Link>

      <div className="mt-4 bg-bg-panel border border-bg-border rounded-lg p-6">
        <p className="text-ink-faint text-xs tracking-[0.18em] uppercase mb-2">{s.format || "Unspecified format"}</p>
        <h1 className="text-3xl font-extrabold">
          <span className="font-mono">{s.call_letters}</span>{" "}
          <span className="text-ink-muted text-xl">{s.frequency}</span>
        </h1>
        <p className="text-ink-dim mt-1">
          {s.station_name || s.call_letters} — {s.market_city}, {s.market_state}
          {s.market_rank ? <span className="text-ink-muted"> · rank {s.market_rank}</span> : null}
        </p>

        <dl className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Field label="Owner" value={s.owner} />
          <Field label="Status" value={s.status} />
          <Field label="Contact" value={s.contact_name ? `${s.contact_name} — ${s.contact_title}` : ""} />
          <Field label="Email" value={s.contact_email} link={s.contact_email ? `mailto:${s.contact_email}` : undefined} />
          <Field label="Direct" value={s.phone_direct} link={s.phone_direct ? `tel:${s.phone_direct}` : undefined} />
          <Field label="Main" value={s.phone_main} link={s.phone_main ? `tel:${s.phone_main}` : undefined} />
          <Field label="Best call" value={[s.best_call_days, `${s.best_call_time_start}–${s.best_call_time_end} ${s.timezone}`].filter(Boolean).join(" ")} />
          <Field label="Last called" value={s.last_called ? `${s.last_called.slice(0, 10)} → ${s.last_result}` : "never"} />
        </dl>

        {phone && (
          <a
            href={`tel:${phone}`}
            className="mt-6 inline-block bg-accent text-bg font-semibold px-6 py-3 rounded-md hover:opacity-90"
          >
            Call {phone}
          </a>
        )}

        {s.notes && (
          <div className="mt-6 pt-6 border-t border-bg-border">
            <p className="text-ink-muted text-xs uppercase tracking-wider mb-2">Notes</p>
            <p className="text-ink-dim text-sm whitespace-pre-wrap break-words">{s.notes}</p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-bg-panel border border-bg-border rounded-lg p-6">
        <h2 className="font-semibold mb-4">Log this call</h2>
        <LogCallForm callLetters={s.call_letters} />
      </div>
    </main>
  );
}

function Field({ label, value, link }: { label: string; value: string; link?: string }) {
  if (!value) return (
    <div>
      <dt className="text-ink-muted text-xs uppercase tracking-wider">{label}</dt>
      <dd className="text-ink-faint italic mt-1">—</dd>
    </div>
  );
  return (
    <div>
      <dt className="text-ink-muted text-xs uppercase tracking-wider">{label}</dt>
      <dd className="mt-1">{link ? <a href={link} className="text-accent hover:underline">{value}</a> : value}</dd>
    </div>
  );
}
