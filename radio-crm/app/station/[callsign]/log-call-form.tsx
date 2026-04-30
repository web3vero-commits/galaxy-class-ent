"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const RESULTS = [
  "ANSWERED",
  "VOICEMAIL",
  "NO_ANSWER",
  "WRONG_NUMBER",
  "CALLBACK_REQUESTED",
  "SUBMITTED_MUSIC",
  "REJECTED",
  "GATEKEEPER",
] as const;

export function LogCallForm({ callLetters }: { callLetters: string }) {
  const [result, setResult] = useState<typeof RESULTS[number]>("VOICEMAIL");
  const [contactReached, setContactReached] = useState("");
  const [notes, setNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      setMsg(null);
      const res = await fetch("/api/log-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ call_letters: callLetters, result, contact_reached: contactReached, notes, follow_up: followUp }),
      });
      if (!res.ok) {
        const err = await res.text();
        setMsg(`Error: ${err}`);
        return;
      }
      setMsg("Logged.");
      setNotes("");
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4 text-sm">
      <div>
        <label className="block text-ink-muted text-xs uppercase tracking-wider mb-2">Result</label>
        <select
          value={result}
          onChange={(e) => setResult(e.target.value as any)}
          className="w-full bg-bg border border-bg-border rounded px-3 py-2"
        >
          {RESULTS.map((r) => <option key={r} value={r}>{r.replace(/_/g, " ")}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-ink-muted text-xs uppercase tracking-wider mb-2">Person reached (if any)</label>
        <input
          value={contactReached}
          onChange={(e) => setContactReached(e.target.value)}
          placeholder="e.g. Jane Doe, MD"
          className="w-full bg-bg border border-bg-border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-ink-muted text-xs uppercase tracking-wider mb-2">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full bg-bg border border-bg-border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-ink-muted text-xs uppercase tracking-wider mb-2">Follow-up date</label>
        <input
          type="date"
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          className="bg-bg border border-bg-border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-ink text-bg font-medium px-4 py-2 rounded hover:bg-white disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>

      {msg && <p className="text-ink-dim">{msg}</p>}
    </form>
  );
}
