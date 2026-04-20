import * as React from "react";
import { render } from "@react-email/components";
import { Resend } from "resend";

import Welcome from "../templates/welcome";
import WeeklyIssue from "../templates/weekly-issue";
import ArtistAnnouncement from "../templates/artist-announcement";
import ServicePromo from "../templates/service-promo";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = ["michael_z@galaxyclassent.com", "galaxyclassent1@gmail.com"];
const FROM = "Galaxy Class Entertainment <onboarding@resend.dev>";

const templates = [
  {
    subject: "[1/4] The Galaxy Report — Welcome to the List",
    element: React.createElement(Welcome, { subscriberName: "Mike" }),
    label: "WELCOME",
  },
  {
    subject: "[2/4] The Galaxy Report · Issue #1 · April 2026",
    element: React.createElement(WeeklyIssue, {
      issueNumber: 1,
      issueDate: "April 20, 2026",
    }),
    label: "WEEKLY ISSUE",
  },
  {
    subject: "[3/4] Brook Ryan Drops New Single 'Still Here' — Available Now",
    element: React.createElement(ArtistAnnouncement, {
      artistName: "Brook Ryan",
      genre: "Pop / Singer-Songwriter",
      announcementHeadline: "Brook Ryan Drops New Single 'Still Here' — Available Now",
      announcementBody: "Galaxy Class Entertainment is proud to announce the release of Brook Ryan's latest single 'Still Here,' now available on all major streaming platforms.\n\nThe track marks a significant step forward in Brook's career, with a radio promotion campaign underway across 8 Florida markets. Produced at Studio Live USA, 'Still Here' showcases Brook's signature blend of emotional songwriting and polished pop production.",
      ctaText: "Stream 'Still Here' Now",
      ctaUrl: "https://brookeryan.net",
    }),
    label: "ARTIST ANNOUNCEMENT",
  },
  {
    subject: "[4/4] Galaxy Class Radio Promotions — Get Your Music Heard",
    element: React.createElement(ServicePromo, {
      serviceName: "Radio Promotions",
      tagline: "Get your music heard on 50+ stations nationwide.",
      description: "Our radio promotion campaigns are built for independent artists who want real results — not just promises. We manage local market campaigns in Florida and Nashville with relationships at stations across the Southeast and beyond.",
      bullets: [
        "Local & national station outreach",
        "Tracked airplay reporting (BDS / Luminate)",
        "Weekly campaign updates",
        "Dedicated promotion manager",
        "Campaigns tailored to your budget",
      ],
      ctaText: "Get a Promotion Quote",
      ctaUrl: "https://galaxyclassent.com/contact",
    }),
    label: "SERVICE PROMO",
  },
];

async function send() {
  console.log(`Sending ${templates.length} templates to ${TO}...\n`);

  for (const [i, t] of templates.entries()) {
    const html = await render(t.element);
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: t.subject,
      html,
    });

    if (error) {
      console.error(`✗ [${i + 1}/${templates.length}] ${t.label} FAILED:`, error.message);
    } else {
      console.log(`✓ [${i + 1}/${templates.length}] ${t.label} — id: ${data?.id}`);
    }

    if (i < templates.length - 1) await new Promise(r => setTimeout(r, 800));
  }

  console.log("\nDone. Check foleymon@gmail.com.");
}

send();
