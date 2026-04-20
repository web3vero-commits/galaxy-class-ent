import * as React from "react";
import {
  Body, Container, Head, Html, Preview, Section, Text, Heading, Button, Hr, Row, Column,
} from "@react-email/components";
import { GCEHeader, GCEFooter } from "../lib/components";
import { colors, fonts, UNSUBSCRIBE_URL, SITE_URL } from "../lib/theme";

interface ServicePromoProps {
  serviceName?: string;
  tagline?: string;
  description?: string;
  bullets?: string[];
  ctaText?: string;
  ctaUrl?: string;
}

export default function ServicePromo({
  serviceName = "Radio Promotions",
  tagline = "Get your music heard on 50+ stations nationwide.",
  description = "Our radio promotion campaigns are built for independent artists who want real results — not just promises. We manage local market campaigns in Florida and Nashville, and have relationships with program directors at stations across the Southeast and beyond.",
  bullets = [
    "Local & national station outreach",
    "Tracked airplay reporting (BDS / Luminate)",
    "Weekly campaign updates",
    "Dedicated promotion manager",
    "Campaigns starting at competitive rates",
  ],
  ctaText = "Get a Promotion Quote",
  ctaUrl = `${SITE_URL}/contact`,
}: ServicePromoProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{serviceName} from Galaxy Class Entertainment — {tagline}</Preview>
      <Body style={{ backgroundColor: colors.bg, margin: 0, padding: "0 0 40px", fontFamily: fonts.sans }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto" }}>

          <GCEHeader />

          {/* Service Hero */}
          <Section style={{
            background: `linear-gradient(135deg, ${colors.cobalt}22 0%, ${colors.bg} 100%)`,
            borderLeft: `4px solid ${colors.cobalt}`,
            padding: "36px 40px",
          }}>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "10px",
              fontWeight: "600",
              color: colors.cobalt,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              margin: "0 0 8px",
            }}>
              ◆ Galaxy Class Services
            </Text>
            <Heading as="h1" style={{
              fontFamily: fonts.sans,
              fontSize: "28px",
              fontWeight: "800",
              color: colors.text,
              letterSpacing: "-0.02em",
              lineHeight: "1.15",
              margin: "0 0 8px",
            }}>
              {serviceName}
            </Heading>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "16px",
              color: colors.gold,
              fontWeight: "500",
              margin: "0 0 20px",
            }}>
              {tagline}
            </Text>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "14px",
              color: colors.textMuted,
              lineHeight: "1.7",
              margin: "0 0 24px",
            }}>
              {description}
            </Text>
          </Section>

          {/* Bullet points */}
          <Section style={{ padding: "24px 40px 8px" }}>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "11px",
              fontWeight: "600",
              color: colors.gold,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              margin: "0 0 14px",
            }}>
              What's Included
            </Text>
            {bullets.map((bullet, i) => (
              <Row key={i} style={{ marginBottom: "10px" }}>
                <Column style={{ width: "20px", verticalAlign: "top" }}>
                  <Text style={{
                    fontFamily: fonts.sans,
                    fontSize: "14px",
                    color: colors.cobalt,
                    margin: 0,
                    lineHeight: "1.55",
                  }}>
                    ✓
                  </Text>
                </Column>
                <Column>
                  <Text style={{
                    fontFamily: fonts.sans,
                    fontSize: "14px",
                    color: colors.text,
                    margin: 0,
                    lineHeight: "1.55",
                  }}>
                    {bullet}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          {/* CTA */}
          <Section style={{ padding: "16px 40px 32px" }}>
            <Hr style={{ borderColor: colors.border, margin: "0 0 24px" }} />
            <Button
              href={ctaUrl}
              style={{
                backgroundColor: colors.cobalt,
                color: colors.white,
                fontFamily: fonts.sans,
                fontSize: "14px",
                fontWeight: "700",
                padding: "16px 36px",
                borderRadius: "4px",
                textDecoration: "none",
                letterSpacing: "0.04em",
                display: "block",
                textAlign: "center" as const,
              }}
            >
              {ctaText}
            </Button>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "12px",
              color: colors.textMuted,
              textAlign: "center" as const,
              margin: "10px 0 0",
            }}>
              No commitment. We'll discuss your goals and build a custom plan.
            </Text>
          </Section>

          <GCEFooter unsubscribeUrl={UNSUBSCRIBE_URL} />
        </Container>
      </Body>
    </Html>
  );
}
