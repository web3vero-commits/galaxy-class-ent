import * as React from "react";
import {
  Body, Container, Head, Html, Preview, Section, Text, Heading, Button, Img,
} from "@react-email/components";
import { GCEHeader, GCEFooter, CTABanner } from "../lib/components";
import { colors, fonts, UNSUBSCRIBE_URL, SITE_URL } from "../lib/theme";

interface ArtistAnnouncementProps {
  artistName?: string;
  genre?: string;
  announcementHeadline?: string;
  announcementBody?: string;
  ctaText?: string;
  ctaUrl?: string;
  artistImageUrl?: string;
}

export default function ArtistAnnouncement({
  artistName = "Brook Ryan",
  genre = "Pop / Singer-Songwriter",
  announcementHeadline = "Brook Ryan Drops New Single 'Still Here' — Available Now",
  announcementBody = "Galaxy Class Entertainment is proud to announce the release of Brook Ryan's latest single 'Still Here,' now available on all major streaming platforms. The track marks a significant step forward in Brook's career, with a radio promotion campaign already underway across 8 Florida markets.\n\nProduced at Studio Live USA, 'Still Here' showcases Brook's signature blend of emotional songwriting and polished pop production. A full EP is expected later this summer.",
  ctaText = "Stream 'Still Here' Now",
  ctaUrl = "https://brookeryan.net",
  artistImageUrl,
}: ArtistAnnouncementProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{announcementHeadline} — from Galaxy Class Entertainment</Preview>
      <Body style={{ backgroundColor: colors.bg, margin: 0, padding: "0 0 40px", fontFamily: fonts.sans }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto" }}>

          <GCEHeader />

          {/* Artist Hero */}
          <Section style={{
            backgroundColor: colors.bgSection,
            borderTop: `3px solid ${colors.gold}`,
            padding: "36px 40px",
          }}>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "10px",
              fontWeight: "600",
              color: colors.gold,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              margin: "0 0 8px",
            }}>
              ◆ New From Our Roster
            </Text>

            {artistImageUrl && (
              <Img
                src={artistImageUrl}
                width="100%"
                style={{ borderRadius: "6px", marginBottom: "20px", maxHeight: "240px", objectFit: "cover" }}
                alt={artistName}
              />
            )}

            <Heading as="h1" style={{
              fontFamily: fonts.sans,
              fontSize: "24px",
              fontWeight: "800",
              color: colors.text,
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
              margin: "0 0 6px",
            }}>
              {announcementHeadline}
            </Heading>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "12px",
              color: colors.textMuted,
              margin: "0 0 20px",
              letterSpacing: "0.04em",
            }}>
              {artistName} · {genre}
            </Text>

            {announcementBody.split("\n\n").map((para, i) => (
              <Text key={i} style={{
                fontFamily: fonts.sans,
                fontSize: "14px",
                color: colors.textMuted,
                lineHeight: "1.7",
                margin: "0 0 14px",
              }}>
                {para}
              </Text>
            ))}

            <Button
              href={ctaUrl}
              style={{
                backgroundColor: colors.cobalt,
                color: colors.white,
                fontFamily: fonts.sans,
                fontSize: "13px",
                fontWeight: "600",
                padding: "13px 28px",
                borderRadius: "4px",
                textDecoration: "none",
                letterSpacing: "0.04em",
                marginTop: "8px",
              }}
            >
              {ctaText}
            </Button>
          </Section>

          {/* About GCE */}
          <Section style={{ padding: "28px 40px" }}>
            <CTABanner
              headline="Want Galaxy Class to represent your music? We're accepting new artist inquiries."
              buttonText="Apply to Work With Us"
              buttonUrl={`${SITE_URL}/contact`}
            />
          </Section>

          <GCEFooter unsubscribeUrl={UNSUBSCRIBE_URL} />
        </Container>
      </Body>
    </Html>
  );
}
