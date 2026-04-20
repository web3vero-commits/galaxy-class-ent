import * as React from "react";
import {
  Body, Container, Head, Html, Preview, Section, Text,
} from "@react-email/components";
import {
  GCEHeader, GCEFooter, HeroBand, ArticleCard,
  ArtistSpotlight, CTABanner, LabeledDivider, SectionLabel,
} from "../lib/components";
import { colors, fonts, UNSUBSCRIBE_URL } from "../lib/theme";

interface WeeklyIssueProps {
  issueNumber?: number;
  issueDate?: string;
  previewText?: string;
}

export default function WeeklyIssue({
  issueNumber = 1,
  issueDate = "April 20, 2026",
  previewText = "Radio chart movers, artist spotlight: Rex Condor, and how to land your first sync deal.",
}: WeeklyIssueProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={{ backgroundColor: colors.bg, margin: 0, padding: "0 0 40px", fontFamily: fonts.sans }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto" }}>

          {/* Header */}
          <GCEHeader issue={issueNumber} date={issueDate} />

          {/* Hero */}
          <HeroBand
            headline="This Week in Music: Radio Charts, Artist Moves, and Sync Opportunities"
            subline="Your bi-weekly briefing from the Galaxy Class team — industry news curated for working artists and music professionals."
          />

          {/* Body */}
          <Section style={{ padding: "0 40px" }}>

            <LabeledDivider label="Artist Spotlight" />

            <ArtistSpotlight
              artistName="Rex Condor"
              genre="Country / Rock · Nashville"
              bio="Rex Condor's latest single 'Dust & Thunder' has been climbing regional country charts for three weeks, now reaching 14 stations across the Southeast. With a full album expected in Q3, Rex is booking select market dates — reach out to Galaxy Class to inquire about availability."
              website="rexcondormusic.com"
            />

            <LabeledDivider label="Radio Chart Watch" />

            <SectionLabel>Currently Charting</SectionLabel>

            {[
              {
                tag: "Country · Southeast",
                headline: "'Dust & Thunder' — Rex Condor",
                body: "Week 3 on regional charts. Now at 14 stations. Targeting Nashville top-40 push next cycle.",
                readMoreUrl: "https://rexcondormusic.com",
              },
              {
                tag: "Pop · Florida",
                headline: "'Still Here' — Brook Ryan",
                body: "New entry this week across 8 Central Florida markets. Radio campaign running through May.",
                readMoreUrl: "https://brookeryan.net",
              },
            ].map((article) => (
              <ArticleCard key={article.headline} {...article} />
            ))}

            <LabeledDivider label="Industry News" />

            <ArticleCard
              tag="Music Business"
              headline="Sync Licensing 101: How Independent Artists Can Land TV and Film Placements"
              body="Sync licensing has become one of the most reliable revenue streams for independent artists. This week we break down the key steps: registering your catalog, finding music supervisors, and what they're actually looking for in a pitch."
              readMoreUrl="https://galaxyclassent.com/blog"
            />

            <ArticleCard
              tag="Radio Promotions"
              headline="Why Local Radio Still Matters in 2026"
              body="Streaming numbers get the headlines, but regional radio continues to drive ticket sales and local fanbase growth in ways Spotify still can't replicate. Our promotion team breaks down the numbers."
              readMoreUrl="https://galaxyclassent.com/services#radio-promotions"
            />

            <LabeledDivider label="Service Spotlight" />

            <CTABanner
              headline="Looking to get your music on the radio? We manage campaigns at local and national level."
              buttonText="Learn About Radio Promotions"
              buttonUrl="https://galaxyclassent.com/services#radio-promotions"
            />

          </Section>

          {/* Footer */}
          <GCEFooter unsubscribeUrl={UNSUBSCRIBE_URL} />

        </Container>
      </Body>
    </Html>
  );
}
