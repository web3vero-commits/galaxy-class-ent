import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      ◆ A Note From Mike Foley
    </p>
    <h1 style="color:#E8E8F0; font-size:26px; font-weight:800; letter-spacing:-0.02em; line-height:1.2; margin:0 0 20px;">
      Hey Michael — here's what we built for you today.
    </h1>
    <p style="color:#9A9A9A; font-size:15px; line-height:1.7; margin:0 0 16px;">
      I wanted to give you a quick rundown of everything we put together for Galaxy Class today.
      I've been working with an AI development setup that lets us move fast — and today was a good example of that.
      Here's what's ready for you right now.
    </p>
  </div>

  <!-- Item 1: Website -->
  <div style="margin:24px 40px 0; background:#111118; border:1px solid #1E1E2E; border-left:3px solid #1B3FCC; border-radius:6px; padding:24px 28px;">
    <p style="color:#1B3FCC; font-size:10px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; margin:0 0 8px;">01 — New Website Mockup</p>
    <h2 style="color:#E8E8F0; font-size:17px; font-weight:700; margin:0 0 10px;">Your site rebuilt — live on Vercel right now</h2>
    <p style="color:#9A9A9A; font-size:14px; line-height:1.65; margin:0 0 14px;">
      I put together a full redesign of galaxyclassent.com using Next.js — fast, modern, mobile-first.
      It's got all your services, your artist roster (Rex Condor, Brook Ryan, David Mikeal and the rest),
      a newsletter signup section, and a clean dark aesthetic that puts you in the same visual league as
      the big management firms. Dark background, clean typography, no clutter.
    </p>
    <a href="https://galaxy-v3-deploy.vercel.app" style="color:#1B3FCC; font-size:13px; font-weight:600; text-decoration:none;">
      → See it live: galaxy-v3-deploy.vercel.app
    </a>
  </div>

  <!-- Item 2: Newsletter -->
  <div style="margin:12px 40px 0; background:#111118; border:1px solid #1E1E2E; border-left:3px solid #C9A84C; border-radius:6px; padding:24px 28px;">
    <p style="color:#C9A84C; font-size:10px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; margin:0 0 8px;">02 — Newsletter System</p>
    <h2 style="color:#E8E8F0; font-size:17px; font-weight:700; margin:0 0 10px;">The Galaxy Report — your own newsletter, no subscriptions needed</h2>
    <p style="color:#9A9A9A; font-size:14px; line-height:1.65; margin:0 0 14px;">
      You just received 4 example templates — a welcome email, a full weekly issue, an artist announcement,
      and a service promo. These are built on React Email and send through your own
      <strong style="color:#E8E8F0;">newsletter@galaxyclassent.com</strong> address (which I set up and verified today).
      No Mailchimp, no Beehiiv fees. You own the whole thing. The look is modeled after Beehiiv —
      clean, dark, professional — but it runs on your infrastructure.
    </p>
    <p style="color:#9A9A9A; font-size:14px; line-height:1.65; margin:0;">
      Think artist spotlights, radio chart updates, industry news — sent to your client list on your schedule.
    </p>
  </div>

  <!-- Item 3: Logo -->
  <div style="margin:12px 40px 0; background:#111118; border:1px solid #1E1E2E; border-left:3px solid #1B3FCC; border-radius:6px; padding:24px 28px;">
    <p style="color:#1B3FCC; font-size:10px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; margin:0 0 8px;">03 — Logo Redesign Concepts</p>
    <h2 style="color:#E8E8F0; font-size:17px; font-weight:700; margin:0 0 10px;">3 directions ready for you to pick from</h2>
    <p style="color:#9A9A9A; font-size:14px; line-height:1.65; margin:0 0 10px;">
      I put together three distinct logo concepts — all moving toward a cleaner, sharper corporate identity:
    </p>
    <p style="color:#E8E8F0; font-size:13px; line-height:1.7; margin:0 0 4px;">
      <strong>Direction 1 — "Signal"</strong> <span style="color:#9A9A9A;">(my pick)</span><br>
      <span style="color:#9A9A9A;">G formed from a signal arc. Geometric sans wordmark. Cobalt + platinum. SpaceX meets Sony Music.</span>
    </p>
    <p style="color:#E8E8F0; font-size:13px; line-height:1.7; margin:0 0 4px;">
      <strong>Direction 2 — "Constellation"</strong><br>
      <span style="color:#9A9A9A;">Editorial serif with star cluster inside the G counter. Navy + warm gold. Luxury / Roc Nation feel.</span>
    </p>
    <p style="color:#E8E8F0; font-size:13px; line-height:1.7; margin:0;">
      <strong>Direction 3 — "GCE Monogram"</strong><br>
      <span style="color:#9A9A9A;">Pure GCE typographic mark. Ultra-clean. Consulting-firm authority applied to entertainment.</span>
    </p>
  </div>

  <!-- Item 4: Domain Alert -->
  <div style="margin:12px 40px 0; background:#1a0a0a; border:1px solid #3a1a1a; border-left:3px solid #cf2e2e; border-radius:6px; padding:24px 28px;">
    <p style="color:#cf2e2e; font-size:10px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; margin:0 0 8px;">⚠ Action Required</p>
    <h2 style="color:#E8E8F0; font-size:17px; font-weight:700; margin:0 0 10px;">galaxyclassent.com expires in 10 days</h2>
    <p style="color:#9A9A9A; font-size:14px; line-height:1.65; margin:0;">
      Your domain registration expires <strong style="color:#E8E8F0;">April 30th</strong> and auto-renew is off.
      Log into your Hostinger account and renew it today — it's $20 and takes 2 minutes.
      If it lapses, your site and email both go down. Don't let this one slide.
    </p>
  </div>

  <!-- What's next -->
  <div style="margin:24px 40px 0; padding:0 0 8px;">
    <p style="color:#6B6B7B; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; margin:0 0 14px;">What We Can Do Next</p>
    <p style="color:#9A9A9A; font-size:14px; line-height:1.7; margin:0 0 10px;">
      This is just day one. Here's what's on deck whenever you're ready:
    </p>
    <table style="width:100%; border-collapse:collapse;">
      ${[
        ["Finish the website", "Inner pages, contact form, artist bios, pricing section"],
        ["Pick a logo direction", "I can get mockups generated from any of the 3 concepts fast"],
        ["Build your subscriber list", "Set up the newsletter signup on the new site, start growing"],
        ["More mockup versions", "V1 Classic and V2 Web3 are queued up if you want options"],
        ["Point your domain to Vercel", "Once you renew — 5 min DNS change and the new site goes live"],
      ].map(([title, desc]) => `
        <tr>
          <td style="padding:8px 12px 8px 0; vertical-align:top; width:4px;">
            <div style="width:4px; height:4px; border-radius:50%; background:#1B3FCC; margin-top:7px;"></div>
          </td>
          <td style="padding:8px 0; vertical-align:top;">
            <span style="color:#E8E8F0; font-size:13px; font-weight:600;">${title}</span>
            <span style="color:#6B6B7B; font-size:13px;"> — ${desc}</span>
          </td>
        </tr>
      `).join("")}
    </table>
  </div>

  <!-- Sign off -->
  <div style="margin:28px 40px 0; padding:24px 28px; background:#111118; border-radius:6px; border:1px solid #1E1E2E;">
    <p style="color:#9A9A9A; font-size:14px; line-height:1.7; margin:0 0 14px;">
      Give the mockup site a look and let me know what you think — what's right, what's off, what you want added.
      This is meant to be a starting point you can react to, not a finished product.
      The faster you give me feedback, the faster we can get something live.
    </p>
    <p style="color:#E8E8F0; font-size:14px; font-weight:600; margin:0 0 4px;">Mike Foley</p>
    <p style="color:#6B6B7B; font-size:13px; margin:0;">
      Web3Vero · foleymon@gmail.com · web3vero.com
    </p>
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
  const { data, error } = await resend.emails.send({
    from: "Mike Foley via Galaxy Class <newsletter@galaxyclassent.com>",
    to: ["michael_z@galaxyclassent.com", "galaxyclassent1@gmail.com"],
    subject: "Hey Michael — here's what we built for Galaxy Class today",
    html,
  });

  if (error) {
    console.error("Failed:", error.message);
  } else {
    console.log("✓ Sent to MikeZ — id:", data?.id);
  }
}

send();
