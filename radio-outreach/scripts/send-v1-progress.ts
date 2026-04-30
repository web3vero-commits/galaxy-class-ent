import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const html = `<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; background:#0A0A0F; color:#E8E8F0; margin:0; padding:24px;">
<div style="max-width:680px; margin:0 auto; background:#0F0F17; padding:32px; border:1px solid #1E1E2E; border-radius:8px;">

<p style="color:#6B6B7B; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; margin:0 0 8px;">◆ Galaxy Class Entertainment — Radio Outreach</p>
<h1 style="font-size:22px; font-weight:800; margin:0 0 24px; line-height:1.3;">Radio Station Master Database — v1 progress + PD enrichment options</h1>

<p style="color:#C8C8D0; font-size:15px; line-height:1.7;">Mike,</p>

<p style="color:#C8C8D0; font-size:15px; line-height:1.7;">Progress update on the radio outreach database we've been building. Short version: we now have a master file with every US AM/FM station, pre-tagged and call-window-ready. Below is what's in it, how to use it, and what it would cost to fill in Program Directors for every row.</p>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px; padding-top:16px; border-top:1px solid #1E1E2E;">What we built</h2>
<ul style="color:#C8C8D0; font-size:14px; line-height:1.7; padding-left:20px;">
<li><strong>File:</strong> <code style="color:#9AD;background:#1E1E2E;padding:2px 6px;border-radius:3px;">C:\\Users\\foley\\Projects\\GalaxyClass\\radio-outreach\\data\\stations-fcc-seed.csv</code></li>
<li><strong>Version:</strong> v1 — FCC 2026-04-23 baseline</li>
<li><strong>Rows:</strong> 15,326 stations (11,181 FM / 4,145 AM)</li>
<li><strong>Size:</strong> 4.1 MB — opens in Excel or Google Sheets</li>
</ul>
<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">Every US full-power licensed AM/FM radio station, in one CSV, 26 columns per row, sortable and filterable any way you want.</p>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px;">What's in each row</h2>
<ul style="color:#C8C8D0; font-size:14px; line-height:1.7; padding-left:20px;">
<li><strong>Call letters, frequency, city, state</strong> — 100% populated</li>
<li><strong>Market rank (Nielsen Audio)</strong> — populated on 6,829 stations (44.6%); rest are small-market / rural / unrated</li>
<li><strong>Owner</strong> — collapsed to canonical group names: iHeartMedia (514), Cumulus (402), Townsquare (333), EMF/K-LOVE (545), Alpha (182), Audacy (120), Cox (46), Salem, Beasley, Urban One, Hubbard, Bonneville, Emmis, and others</li>
<li><strong>Format</strong> — seeded for Religious/Christian (1,939), College/Educational (1,167), Public Radio (124); commercial left blank since format varies inside a single group</li>
<li><strong>Best call days + time window</strong> — industry convention per station type (Tue/Wed/Thu 10–11:30am commercial, 9–11am religious, afternoons for college)</li>
<li><strong>Timezone</strong> — auto-filled for 99.3% of stations</li>
<li><strong>Licensee address + phone</strong> — useful for mailing servicing and legal, NOT for cold-calling a music pitch</li>
<li><strong>Status column</strong> — all flagged UNVERIFIED until you work the row</li>
</ul>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px;">How you actually use it</h2>
<ol style="color:#C8C8D0; font-size:14px; line-height:1.7; padding-left:20px;">
<li><strong>Top-market release push:</strong> Sort by market_rank ascending, filter ≤ 50, exclude College/Religious → ~1,400 stations in Nielsen top 50.</li>
<li><strong>Tour-date regional push:</strong> Filter by state/states, sort by rank. Example: CA + NV → 931 stations with SoCal metros at top.</li>
<li><strong>Corporate cluster pitch:</strong> Filter <code style="color:#9AD;background:#1E1E2E;padding:1px 5px;border-radius:3px;">owner = "iHeartMedia"</code> → 514 stations. Pitch one iHeart PD and they often program multiple stations in the same market. Same for Cumulus (402), Townsquare (333), Alpha (182), Audacy (120).</li>
<li><strong>Rock-adjacent client</strong> (Billy Morrison-type active rock / classic rock / AAA): Filter rank ≤ 100, exclude Religious/College/Public → ~1,600 promotable stations.</li>
<li><strong>Know what NOT to call:</strong>
<ul style="padding-left:20px;">
<li>College/Educational (1,167) — student-run music-add process, different pitch</li>
<li>Religious/Christian (1,939) — genre-specific content</li>
<li>Blank market_rank in rural areas — often simulcasts or satellite feeds</li>
</ul></li>
</ol>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px;">What's missing — the honest part</h2>
<p style="color:#C8C8D0; font-size:14px; line-height:1.7;"><strong>Program Director / Music Director NAMES are not included.</strong> That data doesn't exist in any free public source. The FCC gives you the licensing applicant (usually corporate attorney), which is not who you pitch music to. Every row has been flagged "PD — research via AllAccess" so nobody accidentally calls the wrong person.</p>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">Three ways to fill the gap:</p>
<ul style="color:#C8C8D0; font-size:14px; line-height:1.7; padding-left:20px;">
<li><strong>Option A — AllAccess.com Directory subscription.</strong> Industry gold standard; all formats; updated continuously. A few hundred dollars/year. Authoritative, current, but manual to use.</li>
<li><strong>Option B — Automated enrichment</strong> (I can run for you). Agent that searches AllAccess, RadioInk, LinkedIn, and station websites per station and writes PD/MD directly into the CSV. Tiered pricing below.</li>
<li><strong>Option C — Hand-curate a priority 50.</strong> Small enough to maintain manually.</li>
</ul>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px;">Cost estimate — automated PD enrichment (Option B)</h2>
<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">Pricing based on Tavily (web search) + Gemini Flash (extraction). Cheapest-per-call options with good accuracy on structured data.</p>

<table style="width:100%; border-collapse:collapse; font-size:13px; color:#C8C8D0; margin:12px 0;">
<thead><tr style="background:#1E1E2E;"><th style="padding:10px; text-align:left; border:1px solid #2A2A3A;">Tier</th><th style="padding:10px; text-align:left; border:1px solid #2A2A3A;">Scope</th><th style="padding:10px; text-align:right; border:1px solid #2A2A3A;">API Cost</th><th style="padding:10px; text-align:right; border:1px solid #2A2A3A;">Runtime</th></tr></thead>
<tbody>
<tr><td style="padding:10px; border:1px solid #2A2A3A;"><strong>1</strong></td><td style="padding:10px; border:1px solid #2A2A3A;">Top 500 stations (rank ≤ 50, commercial) — most likely to chart a release</td><td style="padding:10px; text-align:right; border:1px solid #2A2A3A;">$3–8</td><td style="padding:10px; text-align:right; border:1px solid #2A2A3A;">~4 hrs</td></tr>
<tr><td style="padding:10px; border:1px solid #2A2A3A;"><strong>2</strong></td><td style="padding:10px; border:1px solid #2A2A3A;">Top 2,000 (rank ≤ 150, commercial) — full reporting panel + major secondaries</td><td style="padding:10px; text-align:right; border:1px solid #2A2A3A;">$15–30</td><td style="padding:10px; text-align:right; border:1px solid #2A2A3A;">~1 day</td></tr>
<tr><td style="padding:10px; border:1px solid #2A2A3A;"><strong>3</strong></td><td style="padding:10px; border:1px solid #2A2A3A;">All ~9,000 promotable commercial stations — everything worth pitching music to</td><td style="padding:10px; text-align:right; border:1px solid #2A2A3A;">$60–120</td><td style="padding:10px; text-align:right; border:1px solid #2A2A3A;">2–3 days</td></tr>
<tr><td style="padding:10px; border:1px solid #2A2A3A;"><strong>4</strong></td><td style="padding:10px; border:1px solid #2A2A3A;">All 15,326 entries (complete coverage including non-commercial; low marginal value)</td><td style="padding:10px; text-align:right; border:1px solid #2A2A3A;">$200–400</td><td style="padding:10px; text-align:right; border:1px solid #2A2A3A;">~1 week</td></tr>
</tbody>
</table>

<p style="color:#9A9AAA; font-size:13px; line-height:1.7; font-style:italic;">Accuracy expectation: ~80–85% for Tier 1–2. PDs turn over every 18–24 months on average, so any one-time scrape goes stale. For ongoing accuracy, AllAccess beats repeated automation. Best combined approach: run Tier 2 once for a baseline, then maintain the priority 50–100 manually.</p>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;"><strong>My recommendation:</strong> Tier 1 or Tier 2. Spending $30 to get real PD names on your top 2,000 targets is a no-brainer next to the cost of one missed music add.</p>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px;">Next steps — your call</h2>
<ol style="color:#C8C8D0; font-size:14px; line-height:1.7; padding-left:20px;">
<li>Which tier do you want to run (if any)?</li>
<li>Any custom priority list that should go first (client-specific tour dates, format focus)?</li>
<li>Questions about the data layout or how to work the file in Excel?</li>
</ol>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">File is in the GalaxyClass project directory. I can walk you through it in person or we can Zoom.</p>

<p style="color:#E8E8F0; font-size:14px; line-height:1.7; margin-top:24px;">— Mike F</p>

</div></body></html>`;

const text = `Mike,

Progress update on the radio outreach database we've been building. Short version: we now have a master file with every US AM/FM station, pre-tagged and call-window-ready.

WHAT WE BUILT
-------------
File:    C:\\Users\\foley\\Projects\\GalaxyClass\\radio-outreach\\data\\stations-fcc-seed.csv
Version: v1 — FCC 2026-04-23 baseline
Rows:    15,326 stations (11,181 FM / 4,145 AM)

WHAT'S IN EACH ROW
------------------
• Call letters, frequency, city, state — 100% populated
• Market rank (Nielsen Audio) — on 6,829 stations (44.6%)
• Owner — canonical groups: iHeartMedia (514), Cumulus (402), Townsquare (333), EMF/K-LOVE (545), Alpha (182), Audacy (120), Cox (46), Salem, Beasley, Urban One, Hubbard, Bonneville, Emmis, etc.
• Format — seeded Religious/Christian (1,939), College/Educational (1,167), Public Radio (124)
• Best call days + time — industry convention per station type
• Timezone — auto-filled for 99.3%
• Status — all UNVERIFIED until worked

HOW TO USE IT
-------------
1. Top-market release push: sort by market_rank ≤ 50, exclude College/Religious → ~1,400 stations
2. Tour-date regional push: filter by state, sort by rank
3. Corporate cluster pitch: filter by owner = "iHeartMedia" → 514 stations
4. Rock-adjacent client: rank ≤ 100, exclude Religious/College/Public → ~1,600 stations
5. Skip: College (1,167), Religious (1,939), blank-rank rural simulcasts

WHAT'S MISSING — PD/MD NAMES
----------------------------
Not in any free public source. FCC gives you the licensing applicant (usually corporate attorney), not who you pitch to. Every row flagged "PD — research via AllAccess".

Three fill options:
A) Subscribe to AllAccess.com Directory — a few hundred $/year
B) Automated enrichment (see pricing below)
C) Hand-curate a priority 50

COST TO FILL PDs VIA AUTOMATION
--------------------------------
Tavily (search) + Gemini Flash (extraction):

Tier 1 — Top 500 stations (rank ≤ 50, commercial)
  Cost: $3–8  |  Runtime: ~4 hours

Tier 2 — Top 2,000 (rank ≤ 150, commercial)
  Cost: $15–30  |  Runtime: ~1 day

Tier 3 — All ~9,000 promotable commercial stations
  Cost: $60–120  |  Runtime: 2–3 days

Tier 4 — All 15,326 entries (complete coverage)
  Cost: $200–400  |  Runtime: ~1 week

Accuracy: ~80–85% for Tier 1–2. PDs turn over every 18–24 months, so any scrape goes stale. Best combined approach: Tier 2 once as baseline, maintain priority 50–100 manually.

My recommendation: Tier 1 or Tier 2. $30 for real PDs on top 2,000 targets is a no-brainer next to one missed music add.

NEXT STEPS — YOUR CALL
----------------------
1. Which tier do you want to run?
2. Custom priority list to go first (client tour dates, format focus)?
3. Questions on data layout or how to work the file in Excel?

File is in the GalaxyClass project directory. Happy to walk you through in person or on Zoom.

— Mike F`;

(async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Mike Foley <newsletter@galaxyclassent.com>",
      to: ["Michael_Z@galaxyclassent.com"],
      cc: ["foleymon@gmail.com"],
      replyTo: "foleymon@gmail.com",
      subject: "Radio Station Master Database — v1 progress + PD enrichment options",
      html,
      text,
    });
    if (error) {
      console.error("ERROR:", JSON.stringify(error, null, 2));
      process.exit(1);
    }
    console.log("SENT id=", data?.id);
  } catch (e) {
    console.error("CAUGHT:", e);
    process.exit(1);
  }
})();
