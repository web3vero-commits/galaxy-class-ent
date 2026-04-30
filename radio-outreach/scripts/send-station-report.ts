import { Resend } from "resend";
import * as fs from "fs";
import * as path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

const csvPath = path.resolve(__dirname, "../exports/stations-2026-04-20.csv");
const csvContent = fs.readFileSync(csvPath);

const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="background:#0A0A0F; margin:0; padding:0 0 40px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<div style="max-width:600px; margin:0 auto;">

  <!-- Header -->
  <div style="padding:32px 40px 20px; border-bottom:1px solid #1E1E2E;">
    <img src="https://galaxyclassent.com/wp-content/uploads/2017/08/cropped-Logo-mobile-270x270.png"
      width="48" height="48" style="border-radius:50%; vertical-align:middle; margin-right:12px;" alt="GCE" />
    <span style="color:#6B6B7B; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; vertical-align:middle;">
      Galaxy Class Entertainment
    </span>
  </div>

  <!-- Greeting -->
  <div style="padding:36px 40px 0;">
    <p style="color:#6B6B7B; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; margin:0 0 8px;">
      ◆ Radio Outreach — Station Research
    </p>
    <h1 style="color:#E8E8F0; font-size:24px; font-weight:800; letter-spacing:-0.02em; line-height:1.2; margin:0 0 20px;">
      Hey Michael — your radio station contact list is ready.
    </h1>
    <p style="color:#9A9A9A; font-size:15px; line-height:1.7; margin:0 0 16px;">
      I spent some time today researching the stations across your key markets — Florida and Nashville —
      and pulling together a working spreadsheet of program directors, music directors, direct phone numbers,
      and emails. The attached CSV is ready to open in Google Sheets or Excel right now.
    </p>
    <p style="color:#9A9A9A; font-size:15px; line-height:1.7; margin:0 0 16px;">
      Here's where things stand across <strong style="color:#E8E8F0;">21 stations</strong>:
    </p>
  </div>

  <!-- Status summary -->
  <div style="margin:16px 40px 0; background:#111118; border:1px solid #1E1E2E; border-left:3px solid #1B3FCC; border-radius:6px; padding:24px 28px;">
    <p style="color:#1B3FCC; font-size:10px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; margin:0 0 14px;">Research Status</p>
    <table style="width:100%; border-collapse:collapse;">
      <tr>
        <td style="padding:6px 0; color:#4ade80; font-size:13px; font-weight:700; width:90px;">9 VERIFIED</td>
        <td style="padding:6px 0; color:#9A9A9A; font-size:13px;">Direct name + email + phone confirmed from station website</td>
      </tr>
      <tr>
        <td style="padding:6px 0; color:#C9A84C; font-size:13px; font-weight:700;">8 PARTIAL</td>
        <td style="padding:6px 0; color:#9A9A9A; font-size:13px;">PD or MD name confirmed from trade press — no direct email yet</td>
      </tr>
      <tr>
        <td style="padding:6px 0; color:#6B6B7B; font-size:13px; font-weight:700;">2 UNVERIFIED</td>
        <td style="padding:6px 0; color:#9A9A9A; font-size:13px;">General phone only — one call away from a name</td>
      </tr>
    </table>
  </div>

  <!-- Verified contacts highlight -->
  <div style="margin:12px 40px 0; background:#111118; border:1px solid #1E1E2E; border-left:3px solid #4ade80; border-radius:6px; padding:24px 28px;">
    <p style="color:#4ade80; font-size:10px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; margin:0 0 14px;">Ready To Call — Direct Contacts Confirmed</p>
    <table style="width:100%; border-collapse:collapse; font-size:13px;">
      ${[
        ["WEDR 99 Jamz", "Miami", "Phil Michaels-Trueba", "Dir. Branding & Programming", "305-567-5692"],
        ["WMMO 98.9", "Orlando", "Steve Stewart", "Dir. Branding & Programming", "321-281-2020"],
        ["WQYK 99.5", "Tampa", "Rick Thomas", "Program Director", "727-579-1925"],
        ["WAPE 95.1", "Jacksonville", "Jud Heussler", "Program Director", "904-245-8500"],
        ["WQIK 99.1", "Jacksonville", "Casey Carter", "Program Director", "904-636-0507"],
        ["WRUF 103.7", "Gainesville", "Tommy BoDean", "Brand Manager", "352-392-5551"],
        ["WKRO 93.1", "Daytona Beach", "Jonathan Wiley", "Program Director", "386-255-9300"],
        ["WQQK 92Q", "Nashville", "Kenny Smoov", "Program Director", "615-321-1067"],
        ["WBUZ 102.9", "Nashville", "Chris Atticus", "Program Director", "615-399-1029"],
      ].map(([station, market, name, title, phone]) => `
        <tr style="border-bottom:1px solid #1E1E2E;">
          <td style="padding:8px 8px 8px 0; color:#E8E8F0; font-weight:600; white-space:nowrap;">${station}</td>
          <td style="padding:8px 8px; color:#6B6B7B; white-space:nowrap;">${market}</td>
          <td style="padding:8px 8px; color:#9A9A9A;">${name}<br><span style="font-size:11px; color:#4a4a5a;">${title}</span></td>
          <td style="padding:8px 0 8px 8px; color:#1B3FCC; white-space:nowrap;">${phone}</td>
        </tr>
      `).join("")}
    </table>
  </div>

  <!-- Markets covered -->
  <div style="margin:12px 40px 0; background:#111118; border:1px solid #1E1E2E; border-left:3px solid #C9A84C; border-radius:6px; padding:24px 28px;">
    <p style="color:#C9A84C; font-size:10px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; margin:0 0 12px;">Markets Covered</p>
    <table style="width:100%; border-collapse:collapse;">
      ${[
        ["Orlando", "WXXL (iHeart), WMMO (CMG), WTKS (iHeart)"],
        ["Miami", "WHYI Y100, WEDR 99 Jamz, WMXJ The Beach, WKIS Kiss Country"],
        ["Tampa", "WFLZ 93.3, WMTX Mix 100.7, WQYK 99.5"],
        ["Jacksonville", "WAPE 95.1, WQIK 99.1 Country"],
        ["Gainesville", "WRUF 103.7 The Gator"],
        ["Daytona Beach", "WKRO 93.1 Country, WVYB 103.3 The Vibe"],
        ["Nashville", "WKDF 103.3, WSM-FM 95.5, WSIX Big 98, WQQK 92Q, WBUZ 102.9, WNFN Y'all 106.7"],
      ].map(([market, stations]) => `
        <tr>
          <td style="padding:6px 8px 6px 0; color:#E8E8F0; font-size:13px; font-weight:600; white-space:nowrap; vertical-align:top; width:120px;">${market}</td>
          <td style="padding:6px 0; color:#9A9A9A; font-size:13px;">${stations}</td>
        </tr>
      `).join("")}
    </table>
  </div>

  <!-- What's next -->
  <div style="margin:24px 40px 0;">
    <p style="color:#6B6B7B; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; margin:0 0 12px;">What Happens Next</p>
    <p style="color:#9A9A9A; font-size:14px; line-height:1.7; margin:0 0 12px;">
      The 9 verified stations are ready to call right now — you have the name and number.
      Best call window is <strong style="color:#E8E8F0;">Tuesday–Thursday, 10–11:30 AM local time</strong>.
      That's when MDs and PDs are most likely to pick up and have 2 minutes for you.
    </p>
    <p style="color:#9A9A9A; font-size:14px; line-height:1.7; margin:0;">
      As we build this out, the system will track every call, log results, and flag follow-ups.
      Phase 2 is automating the research to fill in the 4 remaining gaps.
      Phase 3 is an AI agent that makes the cold calls on your behalf and hands off live answers to you.
    </p>
  </div>

  <!-- Sign off -->
  <div style="margin:28px 40px 0; padding:24px 28px; background:#111118; border-radius:6px; border:1px solid #1E1E2E;">
    <p style="color:#9A9A9A; font-size:14px; line-height:1.7; margin:0 0 14px;">
      Open the attached CSV in Google Sheets — it's formatted and sorted by market.
      Let me know if you want me to narrow the focus to a specific format (country, pop, urban)
      or go deeper on any market.
    </p>
    <p style="color:#E8E8F0; font-size:14px; font-weight:600; margin:0 0 4px;">Mike Foley</p>
    <p style="color:#6B6B7B; font-size:13px; margin:0;">Web3Vero · foleymon@gmail.com · web3vero.com</p>
  </div>

  <!-- Footer -->
  <div style="margin:28px 40px 0; text-align:center; border-top:1px solid #1E1E2E; padding-top:20px;">
    <p style="color:#2a2a3a; font-size:11px; margin:0;">
      Galaxy Class Entertainment Inc. · Orlando, FL · Nashville, TN
    </p>
  </div>

</div>
</body>
</html>
`;

async function send() {
  const to = process.env.SEND_TO
    ? process.env.SEND_TO.split(",")
    : ["michael_z@galaxyclassent.com", "galaxyclassent1@gmail.com"];

  const { data, error } = await resend.emails.send({
    from: "Mike Foley via Galaxy Class <newsletter@galaxyclassent.com>",
    to,
    subject: "Your Radio Station Contact List — 21 Stations, 9 Ready to Call",
    html,
    attachments: [
      {
        filename: "GCE-Radio-Stations-2026-04-20.csv",
        content: csvContent,
      },
    ],
  });

  if (error) {
    console.error("Failed:", error.message);
  } else {
    console.log(`✓ Sent to ${to.join(", ")} — id: ${data?.id}`);
  }
}

send();
