import * as React from "react";
import {
  Body, Container, Head, Html, Img, Link, Preview,
  Section, Text, Row, Column, Hr, Button, Heading,
} from "@react-email/components";
import { colors, fonts, LOGO_URL, SITE_URL, NEWSLETTER_NAME, COMPANY_NAME } from "./theme";

/* ── Header ─────────────────────────────────────────────── */
export function GCEHeader({ issue, date }: { issue?: number; date?: string }) {
  return (
    <Section style={{ backgroundColor: colors.bg, padding: "32px 40px 24px" }}>
      <Row>
        <Column style={{ width: "60px", verticalAlign: "middle" }}>
          <Img
            src={LOGO_URL}
            width={52}
            height={52}
            alt="Galaxy Class Entertainment"
            style={{ borderRadius: "50%" }}
          />
        </Column>
        <Column style={{ verticalAlign: "middle", paddingLeft: "12px" }}>
          <Text style={{
            margin: 0,
            fontFamily: fonts.sans,
            fontSize: "15px",
            fontWeight: "700",
            color: colors.text,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            {NEWSLETTER_NAME}
          </Text>
          <Text style={{
            margin: 0,
            fontFamily: fonts.sans,
            fontSize: "11px",
            color: colors.textMuted,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
          }}>
            {COMPANY_NAME}
            {issue ? ` · Issue #${issue}` : ""}
            {date ? ` · ${date}` : ""}
          </Text>
        </Column>
        <Column style={{ textAlign: "right" as const, verticalAlign: "middle" }}>
          <Link href={`${SITE_URL}/newsletter`}
            style={{
              fontFamily: fonts.sans,
              fontSize: "11px",
              color: colors.cobalt,
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
            }}>
            View in Browser →
          </Link>
        </Column>
      </Row>
      <Hr style={{ borderColor: colors.border, margin: "20px 0 0" }} />
    </Section>
  );
}

/* ── Section Label ───────────────────────────────────────── */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Row>
      <Column>
        <Text style={{
          fontFamily: fonts.sans,
          fontSize: "10px",
          fontWeight: "600",
          color: colors.gold,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          margin: "0 0 6px",
        }}>
          ◆ {children}
        </Text>
      </Column>
    </Row>
  );
}

/* ── Hero Band ───────────────────────────────────────────── */
export function HeroBand({
  headline,
  subline,
  ctaText,
  ctaUrl,
}: {
  headline: string;
  subline?: string;
  ctaText?: string;
  ctaUrl?: string;
}) {
  return (
    <Section style={{
      backgroundColor: colors.bgSection,
      borderLeft: `3px solid ${colors.cobalt}`,
      padding: "32px 40px",
    }}>
      <Heading as="h1" style={{
        fontFamily: fonts.sans,
        fontSize: "28px",
        fontWeight: "800",
        color: colors.text,
        letterSpacing: "-0.02em",
        lineHeight: "1.15",
        margin: "0 0 12px",
      }}>
        {headline}
      </Heading>
      {subline && (
        <Text style={{
          fontFamily: fonts.sans,
          fontSize: "15px",
          color: colors.textMuted,
          lineHeight: "1.6",
          margin: "0 0 20px",
        }}>
          {subline}
        </Text>
      )}
      {ctaText && ctaUrl && (
        <Button
          href={ctaUrl}
          style={{
            backgroundColor: colors.cobalt,
            color: colors.white,
            fontFamily: fonts.sans,
            fontSize: "13px",
            fontWeight: "600",
            padding: "12px 24px",
            borderRadius: "4px",
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          {ctaText}
        </Button>
      )}
    </Section>
  );
}

/* ── Article Card ────────────────────────────────────────── */
export function ArticleCard({
  tag,
  headline,
  body,
  readMoreUrl,
  imageUrl,
}: {
  tag: string;
  headline: string;
  body: string;
  readMoreUrl?: string;
  imageUrl?: string;
}) {
  return (
    <Section style={{
      backgroundColor: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderRadius: "6px",
      padding: "24px 28px",
      marginBottom: "12px",
    }}>
      {imageUrl && (
        <Img src={imageUrl} width="100%" style={{ borderRadius: "4px", marginBottom: "16px" }} alt={headline} />
      )}
      <Text style={{
        fontFamily: fonts.sans,
        fontSize: "10px",
        fontWeight: "600",
        color: colors.gold,
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        margin: "0 0 8px",
      }}>
        {tag}
      </Text>
      <Heading as="h2" style={{
        fontFamily: fonts.sans,
        fontSize: "18px",
        fontWeight: "700",
        color: colors.text,
        letterSpacing: "-0.01em",
        lineHeight: "1.3",
        margin: "0 0 10px",
      }}>
        {headline}
      </Heading>
      <Text style={{
        fontFamily: fonts.sans,
        fontSize: "14px",
        color: colors.textMuted,
        lineHeight: "1.65",
        margin: "0 0 14px",
      }}>
        {body}
      </Text>
      {readMoreUrl && (
        <Link href={readMoreUrl} style={{
          fontFamily: fonts.sans,
          fontSize: "12px",
          fontWeight: "600",
          color: colors.cobalt,
          textDecoration: "none",
          letterSpacing: "0.06em",
        }}>
          Read more →
        </Link>
      )}
    </Section>
  );
}

/* ── Artist Spotlight Card ───────────────────────────────── */
export function ArtistSpotlight({
  artistName,
  genre,
  bio,
  website,
  imageUrl,
}: {
  artistName: string;
  genre: string;
  bio: string;
  website: string;
  imageUrl?: string;
}) {
  return (
    <Section style={{
      backgroundColor: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderTop: `3px solid ${colors.gold}`,
      borderRadius: "6px",
      padding: "24px 28px",
    }}>
      <Row>
        {imageUrl && (
          <Column style={{ width: "64px", paddingRight: "16px", verticalAlign: "top" }}>
            <Img src={imageUrl} width={56} height={56} style={{ borderRadius: "50%", border: `2px solid ${colors.gold}` }} alt={artistName} />
          </Column>
        )}
        <Column style={{ verticalAlign: "top" }}>
          <Text style={{
            fontFamily: fonts.sans,
            fontSize: "10px",
            color: colors.gold,
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            margin: "0 0 4px",
            fontWeight: "600",
          }}>
            Artist Spotlight
          </Text>
          <Text style={{
            fontFamily: fonts.sans,
            fontSize: "18px",
            fontWeight: "700",
            color: colors.text,
            margin: "0 0 2px",
          }}>
            {artistName}
          </Text>
          <Text style={{
            fontFamily: fonts.sans,
            fontSize: "12px",
            color: colors.textMuted,
            margin: "0 0 12px",
          }}>
            {genre}
          </Text>
        </Column>
      </Row>
      <Text style={{
        fontFamily: fonts.sans,
        fontSize: "14px",
        color: colors.textMuted,
        lineHeight: "1.65",
        margin: "12px 0 14px",
      }}>
        {bio}
      </Text>
      <Link href={`https://${website}`} style={{
        fontFamily: fonts.sans,
        fontSize: "12px",
        color: colors.cobalt,
        textDecoration: "none",
        fontWeight: "600",
      }}>
        Visit {website} →
      </Link>
    </Section>
  );
}

/* ── Divider with label ──────────────────────────────────── */
export function LabeledDivider({ label }: { label: string }) {
  return (
    <Section style={{ padding: "24px 0 8px" }}>
      <Row>
        <Column style={{ width: "20px" }}>
          <Hr style={{ borderColor: colors.border, margin: "8px 0" }} />
        </Column>
        <Column style={{ width: "1px", paddingRight: "12px" }} />
        <Column>
          <Text style={{
            fontFamily: fonts.sans,
            fontSize: "10px",
            color: colors.textMuted,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            margin: 0,
            whiteSpace: "nowrap" as const,
          }}>
            {label}
          </Text>
        </Column>
        <Column style={{ width: "20px" }}>
          <Hr style={{ borderColor: colors.border, margin: "8px 0" }} />
        </Column>
      </Row>
    </Section>
  );
}

/* ── CTA Banner ──────────────────────────────────────────── */
export function CTABanner({
  headline,
  buttonText,
  buttonUrl,
}: {
  headline: string;
  buttonText: string;
  buttonUrl: string;
}) {
  return (
    <Section style={{
      backgroundColor: colors.cobalt,
      borderRadius: "6px",
      padding: "28px 32px",
      textAlign: "center" as const,
    }}>
      <Text style={{
        fontFamily: fonts.sans,
        fontSize: "17px",
        fontWeight: "700",
        color: colors.white,
        margin: "0 0 16px",
        lineHeight: "1.4",
      }}>
        {headline}
      </Text>
      <Button
        href={buttonUrl}
        style={{
          backgroundColor: colors.white,
          color: colors.cobalt,
          fontFamily: fonts.sans,
          fontSize: "13px",
          fontWeight: "700",
          padding: "12px 28px",
          borderRadius: "4px",
          textDecoration: "none",
          letterSpacing: "0.04em",
        }}
      >
        {buttonText}
      </Button>
    </Section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
export function GCEFooter({ unsubscribeUrl }: { unsubscribeUrl?: string }) {
  return (
    <Section style={{
      backgroundColor: colors.bg,
      borderTop: `1px solid ${colors.border}`,
      padding: "28px 40px",
    }}>
      <Row style={{ marginBottom: "16px" }}>
        <Column style={{ textAlign: "center" as const }}>
          <Img
            src={LOGO_URL}
            width={36}
            height={36}
            alt="GCE"
            style={{ borderRadius: "50%", margin: "0 auto 8px" }}
          />
          <Text style={{
            fontFamily: fonts.sans,
            fontSize: "11px",
            color: colors.textMuted,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            margin: "0 0 4px",
          }}>
            Galaxy Class Entertainment
          </Text>
          <Text style={{
            fontFamily: fonts.sans,
            fontSize: "11px",
            color: colors.border,
            margin: "0 0 12px",
          }}>
            Orlando, FL · Nashville, TN
          </Text>
          <Row>
            {[
              { label: "Website", url: SITE_URL },
              { label: "Services", url: `${SITE_URL}/services` },
              { label: "Contact", url: `${SITE_URL}/contact` },
            ].map((link) => (
              <Column key={link.label} style={{ padding: "0 8px", textAlign: "center" as const }}>
                <Link href={link.url} style={{
                  fontFamily: fonts.sans,
                  fontSize: "11px",
                  color: colors.textMuted,
                  textDecoration: "none",
                }}>
                  {link.label}
                </Link>
              </Column>
            ))}
          </Row>
        </Column>
      </Row>
      <Hr style={{ borderColor: colors.border, margin: "16px 0" }} />
      <Text style={{
        fontFamily: fonts.sans,
        fontSize: "11px",
        color: colors.border,
        textAlign: "center" as const,
        margin: "0 0 6px",
        lineHeight: "1.5",
      }}>
        You received this because you subscribed to The Galaxy Report.
      </Text>
      <Text style={{
        fontFamily: fonts.sans,
        fontSize: "11px",
        textAlign: "center" as const,
        margin: 0,
      }}>
        <Link href={unsubscribeUrl || "#"} style={{ color: colors.textMuted, textDecoration: "underline" }}>
          Unsubscribe
        </Link>
        {" · "}
        <Link href={`${SITE_URL}/privacy`} style={{ color: colors.textMuted, textDecoration: "underline" }}>
          Privacy Policy
        </Link>
      </Text>
    </Section>
  );
}
