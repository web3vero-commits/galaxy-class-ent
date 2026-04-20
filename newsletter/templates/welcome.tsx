import * as React from "react";
import {
  Body, Container, Head, Html, Preview, Section, Text, Heading, Button, Hr, Img,
} from "@react-email/components";
import { GCEHeader, GCEFooter } from "../lib/components";
import { colors, fonts, LOGO_URL, UNSUBSCRIBE_URL, SITE_URL } from "../lib/theme";

interface WelcomeProps {
  subscriberName?: string;
}

export default function Welcome({ subscriberName = "there" }: WelcomeProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Welcome to The Galaxy Report — your insider briefing from Galaxy Class Entertainment.</Preview>
      <Body style={{ backgroundColor: colors.bg, margin: 0, padding: "0 0 40px", fontFamily: fonts.sans }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto" }}>

          <GCEHeader />

          {/* Welcome Hero */}
          <Section style={{
            backgroundColor: colors.bgSection,
            padding: "48px 40px 40px",
            textAlign: "center" as const,
          }}>
            <Img src={LOGO_URL} width={72} height={72} alt="GCE" style={{ borderRadius: "50%", margin: "0 auto 20px" }} />
            <Heading as="h1" style={{
              fontFamily: fonts.sans,
              fontSize: "26px",
              fontWeight: "800",
              color: colors.text,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
            }}>
              Welcome to The Galaxy Report, {subscriberName}.
            </Heading>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "15px",
              color: colors.textMuted,
              lineHeight: "1.65",
              margin: "0 auto 28px",
              maxWidth: "440px",
            }}>
              You're now part of a community of artists, managers, and music professionals
              who get the inside track on radio promotions, industry news, and career opportunities.
            </Text>
            <Button
              href={`${SITE_URL}/newsletter`}
              style={{
                backgroundColor: colors.cobalt,
                color: colors.white,
                fontFamily: fonts.sans,
                fontSize: "13px",
                fontWeight: "600",
                padding: "14px 32px",
                borderRadius: "4px",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              Read the Latest Issue →
            </Button>
          </Section>

          {/* What to expect */}
          <Section style={{ padding: "32px 40px" }}>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "11px",
              fontWeight: "600",
              color: colors.gold,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              margin: "0 0 16px",
            }}>
              What You'll Get Every Issue
            </Text>

            {[
              { icon: "🎤", title: "Artist Spotlights", desc: "Deep-dives on artists in the Galaxy Class roster — their sound, their momentum, and where you can catch them." },
              { icon: "📻", title: "Radio Chart Watch", desc: "Weekly tracking of our active promotion campaigns — who's climbing, what's breaking." },
              { icon: "📰", title: "Industry News", desc: "Curated music business headlines: licensing, publishing, streaming, and live." },
              { icon: "🎯", title: "Service Highlights", desc: "Practical insights on how professional artist management and promotion actually works." },
            ].map((item) => (
              <Section key={item.title} style={{
                backgroundColor: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: "6px",
                padding: "16px 20px",
                marginBottom: "8px",
              }}>
                <Text style={{
                  fontFamily: fonts.sans,
                  fontSize: "14px",
                  fontWeight: "600",
                  color: colors.text,
                  margin: "0 0 4px",
                }}>
                  {item.icon}  {item.title}
                </Text>
                <Text style={{
                  fontFamily: fonts.sans,
                  fontSize: "13px",
                  color: colors.textMuted,
                  lineHeight: "1.55",
                  margin: 0,
                }}>
                  {item.desc}
                </Text>
              </Section>
            ))}
          </Section>

          <Hr style={{ borderColor: colors.border, margin: "0 40px" }} />

          {/* CTA */}
          <Section style={{ padding: "28px 40px" }}>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "14px",
              color: colors.textMuted,
              lineHeight: "1.65",
              margin: "0 0 16px",
            }}>
              Have a question or want to explore what Galaxy Class can do for your career?
              Reply to this email or reach us directly:
            </Text>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "13px",
              color: colors.text,
              margin: "0 0 4px",
            }}>
              Michael Zdanowicz · Galaxy Class Entertainment
            </Text>
            <Text style={{
              fontFamily: fonts.sans,
              fontSize: "13px",
              color: colors.textMuted,
              margin: "0",
            }}>
              Orlando: (407) 574-6988 · Nashville: (615) 512-1741
            </Text>
          </Section>

          <GCEFooter unsubscribeUrl={UNSUBSCRIBE_URL} />
        </Container>
      </Body>
    </Html>
  );
}
