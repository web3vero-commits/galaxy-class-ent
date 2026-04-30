/**
 * Sends the Phase 1 PD/MD enrichment plan email to Mike Z.
 * Run: RESEND_API_KEY=... npx tsx scripts/send-pd-enrichment-plan.ts
 */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const html = `<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; background:#0A0A0F; color:#E8E8F0; margin:0; padding:24px;">
<div style="max-width:680px; margin:0 auto; background:#0F0F17; padding:32px; border:1px solid #1E1E2E; border-radius:8px;">

<p style="color:#6B6B7B; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; margin:0 0 8px;">◆ Galaxy Class Entertainment — Radio Outreach</p>
<h1 style="font-size:22px; font-weight:800; margin:0 0 24px; line-height:1.3;">PD/MD enrichment — revised plan, smaller spend, three quick questions</h1>

<p style="color:#C8C8D0; font-size:15px; line-height:1.7;">Mike,</p>

<p style="color:#C8C8D0; font-size:15px; line-height:1.7;">Following up on the four-tier proposal I sent last week. I want to walk back what I pitched and recommend something cheaper and tighter — I think the original $60–$120 / Tier 3 spend was overkill and would've handed you a lot of data you'll never dial. Here's the new thinking.</p>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px; padding-top:16px; border-top:1px solid #1E1E2E;">Why I'm shrinking the scope</h2>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">The 15,326-station file looks impressive but the actually-pitchable universe is way smaller:</p>
<ul style="color:#C8C8D0; font-size:14px; line-height:1.7; padding-left:20px;">
<li><strong>~1,300 religious-network stations</strong> (EMF/K-LOVE, AFR, Salem, Bible Broadcasting, Family Radio, etc.) — these are programmed from corporate HQ. The "MD" at the local station, if there is one, has zero say on adds. Pitching them is wasted breath.</li>
<li><strong>~1,170 college / educational</strong> — student MDs, rotate every semester, different pitch entirely. Not Phase 1.</li>
<li><strong>~125 public radio</strong> — doesn't take spin calls.</li>
<li><strong>~1,900 major-group commercial</strong> (iHeart, Cumulus, Townsquare, etc.) — yes, but corporate playlists limit the local PD's discretion.</li>
<li><strong>~7,000–8,000 indie commercial</strong> — this is where local-MD power actually lives. This is the real target.</li>
</ul>
<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">Even if we enriched every promotable row, you can realistically dial 20–30 stations a week. So 500 enriched leads = 4–6 months of work before you'd run out. We don't need to buy 9,000 names.</p>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px;">The new Phase 1 plan</h2>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;"><strong>Enrich the top 500 commercial stations only — market_rank ≤ 100, format-locked owners excluded.</strong> Rough cost: <strong>~$5</strong> in API fees. Runtime: a few hours. I've already written the script.</p>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">For each station, the agent does:</p>
<ol style="color:#C8C8D0; font-size:14px; line-height:1.7; padding-left:20px;">
<li>Targeted web search (Tavily) for "<call letters> <city> music director program director"</li>
<li>Claude Haiku 4.5 reads the top 5 hits and pulls out PD name + MD name + direct email + direct phone, with a citation URL</li>
<li>Confidence label on each row: HIGH (station's own staff page), MED (LinkedIn / RadioInk / trade press), LOW (inferred or stale), NONE (nothing found)</li>
<li>Writes to a new <code style="color:#9AD;background:#1E1E2E;padding:1px 5px;border-radius:3px;">stations-enriched.csv</code> — your seed file stays untouched as a backup</li>
</ol>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">Expected hit rate: <strong>~75%</strong>. The other ~25% won't have a clean public profile and we leave UNVERIFIED for manual lookup or AllAccess down the line.</p>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px;">On call-in times — I'm NOT going to scrape these per station</h2>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">You asked about call-in windows. Here's what I think: <strong>industry convention covers ~90% of commercial stations — Tue/Wed/Thu, 10am–noon local time</strong>. Trying to extract per-station call hours from the web will burn API tokens to confirm what's already the default. I'm applying that default to every commercial row. When you actually go to dial a specific station, if AllAccess or their site says different, we override that one row. Way cheaper than pre-enriching.</p>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px;">Why this beats the old Tier 3 plan</h2>

<table style="width:100%; border-collapse:collapse; font-size:13px; color:#C8C8D0; margin:12px 0;">
<thead><tr style="background:#1E1E2E;"><th style="padding:10px; text-align:left; border:1px solid #2A2A3A;">&nbsp;</th><th style="padding:10px; text-align:left; border:1px solid #2A2A3A;">Old Tier 3</th><th style="padding:10px; text-align:left; border:1px solid #2A2A3A;">New Phase 1</th></tr></thead>
<tbody>
<tr><td style="padding:10px; border:1px solid #2A2A3A;"><strong>Cost</strong></td><td style="padding:10px; border:1px solid #2A2A3A;">$60–120</td><td style="padding:10px; border:1px solid #2A2A3A;">~$5</td></tr>
<tr><td style="padding:10px; border:1px solid #2A2A3A;"><strong>Stations enriched</strong></td><td style="padding:10px; border:1px solid #2A2A3A;">~9,000</td><td style="padding:10px; border:1px solid #2A2A3A;">500</td></tr>
<tr><td style="padding:10px; border:1px solid #2A2A3A;"><strong>Runtime</strong></td><td style="padding:10px; border:1px solid #2A2A3A;">2–3 days</td><td style="padding:10px; border:1px solid #2A2A3A;">~half a day</td></tr>
<tr><td style="padding:10px; border:1px solid #2A2A3A;"><strong>Coverage of your dial-time</strong></td><td style="padding:10px; border:1px solid #2A2A3A;">~5 years</td><td style="padding:10px; border:1px solid #2A2A3A;">~6 months</td></tr>
<tr><td style="padding:10px; border:1px solid #2A2A3A;"><strong>Stale-data risk</strong></td><td style="padding:10px; border:1px solid #2A2A3A;">High — PDs turn over every 18–24 mo</td><td style="padding:10px; border:1px solid #2A2A3A;">Low — re-run before tail starts</td></tr>
</tbody>
</table>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">The honest reason I changed my mind: PDs turn over fast. If we enriched all 9,000 in April, half the data is stale by year-end. Better to enrich 500 now, watch which formats and markets actually convert for your artists, then run targeted enrichment passes on the next 500 you'll actually dial.</p>

<h2 style="color:#E8E8F0; font-size:16px; font-weight:700; margin:28px 0 12px;">Three questions before I run it</h2>

<ol style="color:#C8C8D0; font-size:14px; line-height:1.7; padding-left:20px;">
<li><strong>What genres / formats do your current GCE artists fit?</strong> Country, AC, active rock, classic rock, AAA, urban, CHR, hot AC — pick whichever apply. This lets me weight the 500 toward stations whose format actually plays your music instead of giving you 500 random commercial PDs across all genres.</li>
<li><strong>Any priority markets for upcoming tour dates or releases?</strong> If you've got a Billy Morrison run through the Southeast or a release pushing into specific regions, I'll bump those CBSAs to the top of the queue ahead of pure rank order.</li>
<li><strong>Do you already have an AllAccess login</strong>, or want me to expense one ($300/yr individual)? It's the industry directory — useful for the long tail later, and a sub gives you authoritative lookup access for any station I miss in the automation.</li>
</ol>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">Once you answer those, I run Phase 1 the same day. Output goes to a Google Sheet you can sort, filter, and start working from immediately. I'll tag every row with the source URL so you can verify the contact before you dial.</p>

<p style="color:#C8C8D0; font-size:14px; line-height:1.7;">Phone is on if it's easier — happy to walk through it.</p>

<p style="color:#E8E8F0; font-size:14px; line-height:1.7; margin-top:24px;">— Mike F</p>

</div></body></html>`;

const text = `Mike,

Following up on the four-tier proposal I sent last week. I want to walk back what I pitched and recommend something cheaper and tighter — I think the original $60–$120 / Tier 3 spend was overkill and would've handed you a lot of data you'll never dial. Here's the new thinking.

WHY I'M SHRINKING THE SCOPE
---------------------------
The 15,326-station file looks impressive but the actually-pitchable universe is way smaller:

• ~1,300 religious-network stations (EMF/K-LOVE, AFR, Salem, Bible Broadcasting, Family Radio, etc.) — programmed from corporate HQ. Local "MDs" have zero say on adds. Pitching them is wasted breath.
• ~1,170 college / educational — student MDs, rotate every semester, different pitch entirely. Not Phase 1.
• ~125 public radio — doesn't take spin calls.
• ~1,900 major-group commercial (iHeart, Cumulus, Townsquare, etc.) — yes, but corporate playlists limit the local PD's discretion.
• ~7,000–8,000 indie commercial — this is where local-MD power actually lives. The real target.

Even if we enriched every promotable row, you can realistically dial 20–30 stations a week. So 500 enriched leads = 4–6 months of work before you run out. We don't need to buy 9,000 names.

THE NEW PHASE 1 PLAN
---------------------
Enrich the top 500 commercial stations only — market_rank ≤ 100, format-locked owners excluded. Cost: ~$5 in API fees. Runtime: a few hours. Script is already written.

For each station the agent does:
1. Targeted web search (Tavily) for "<call letters> <city> music director program director"
2. Claude Haiku 4.5 reads the top 5 hits, pulls out PD name + MD name + direct email + direct phone, with a citation URL
3. Confidence label per row: HIGH (station staff page), MED (LinkedIn / RadioInk / trade press), LOW (inferred or stale), NONE (nothing found)
4. Writes to stations-enriched.csv — your seed file stays untouched

Expected hit rate: ~75%. The other ~25% we leave UNVERIFIED for manual lookup or AllAccess later.

ON CALL-IN TIMES — NOT SCRAPING THESE PER STATION
--------------------------------------------------
Industry convention covers ~90% of commercial: Tue/Wed/Thu, 10am–noon local. Trying to extract per-station call hours from the web burns API tokens to confirm what's already the default. I'm applying that default to every commercial row. When you go to dial a specific station, if AllAccess or their site says different, we override that one row. Way cheaper than pre-enriching.

WHY THIS BEATS THE OLD TIER 3 PLAN
-----------------------------------
                          Old Tier 3        New Phase 1
Cost:                     $60–120           ~$5
Stations enriched:        ~9,000            500
Runtime:                  2–3 days          half a day
Coverage of dial-time:    ~5 years          ~6 months
Stale-data risk:          high              low — re-run before tail

PDs turn over every 18–24 months. If we enriched all 9,000 in April, half the data is stale by year-end. Better to enrich 500 now, watch which formats and markets convert for your artists, then run targeted passes on the next 500 you'll actually dial.

THREE QUESTIONS BEFORE I RUN IT
--------------------------------
1. What genres / formats do your current GCE artists fit? (Country, AC, active rock, classic rock, AAA, urban, CHR, hot AC — pick what applies.) Lets me weight the 500 toward stations whose format plays your music.

2. Any priority markets for upcoming tour dates or releases? Billy Morrison run through the Southeast, or a release pushing into specific regions — I'll bump those CBSAs ahead of pure rank.

3. Do you already have an AllAccess login, or want me to expense one ($300/yr individual)? Industry directory, useful for the long tail later. A sub gives you authoritative lookup for anything the automation misses.

Once you answer, I run Phase 1 the same day. Output to a Google Sheet you can sort/filter immediately. Every row tagged with the source URL so you can verify before you dial.

Phone's on if easier — happy to walk through it.

— Mike F`;

(async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Mike Foley <newsletter@galaxyclassent.com>",
      to: ["Michael_Z@galaxyclassent.com"],
      cc: ["foleymon@gmail.com"],
      replyTo: "foleymon@gmail.com",
      subject: "PD/MD enrichment — revised plan, smaller spend, 3 quick questions",
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
