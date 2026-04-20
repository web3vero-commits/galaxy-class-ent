# Mockup V3 — "Corporate Signal" (New Addition)

This is a third mockup direction added alongside V1 and V2, designed specifically to match the new corporate logo direction and position Galaxy Class at the level of major management firms.

---

## Concept: "Corporate Signal"
Clean, dark, authoritative. No flashy animations, no Web3 gimmicks. The visual weight and whitespace do the work. Think CAA.com, WME.com, or Interscope.com — but accessible and conversion-focused.

---

## Visual Identity
- **Primary BG:** `#0A0A0F` (near-black)
- **Text:** `#E8E8F0` (platinum)
- **Accent:** `#1B3FCC` (cobalt) for CTAs
- **Gold touch:** `#C9A84C` for awards/stats/premium callouts
- **Font:** Inter Display (headlines) + Inter (body)
- **Spacing:** Generous — lots of breathing room, not compressed

---

## Page Architecture

### Hero
- Full-bleed dark section
- Left-aligned headline: `"YOUR MUSIC. YOUR CAREER. ELEVATED."`
- Subline: `"Full-service artist management and music promotion — Orlando & Nashville"`
- Two CTAs side by side: `[Book a Consultation]` (cobalt filled) + `[Our Services]` (ghost/outline)
- Right side: abstract signal/waveform graphic (SVG, not stock photo)
- No carousel, no slider — static, confident

### Stats Bar
Horizontal strip, platinum on dark:
```
12+  Artists Managed  |  50+  Radio Stations  |  15+  Years  |  2  Markets
```

### Services Grid
- 6-card grid (3×2 desktop, 1-col mobile)
- Each card: icon + title + 1-line description + arrow link
- Cards use subtle border `rgba(255,255,255,0.08)` — no heavy box shadows
- Hover: cobalt border glow

### Artist Roster Strip
- Horizontal scroll on mobile, 4-up grid on desktop
- Artist name + photo (grayscale by default, color on hover)
- Genre tag
- Link to individual artist page

### "Why Galaxy Class" Section
- 3-column feature list: Radio Reach / Career Consulting / Full Service
- Each with icon + headline + 2-line copy
- Clean, no background color change

### Testimonials
- 2-up quote cards
- Artist name, photo (small), quote text
- Gold left-border accent

### Newsletter Capture
- Dark section with cobalt left border accent
- Headline: `"The Galaxy Report — Industry news, artist spotlights, radio charts"`
- Email input + Subscribe button
- "No spam. Unsubscribe anytime." below

### Footer
- Logo mark (icon only, white)
- 4-column links: Services / Artists / Company / Contact
- Nashville + Florida address
- Social icons (minimal, line-style)
- Copyright

---

## Tech Implementation Notes

```
mockups/v3-corporate/
├── app/
│   ├── layout.tsx          # Inter font, dark theme meta
│   ├── page.tsx            # Home page assembly
│   ├── services/page.tsx
│   ├── artists/page.tsx
│   ├── about/page.tsx
│   ├── newsletter/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Hero.tsx
│   ├── StatsBar.tsx
│   ├── ServicesGrid.tsx
│   ├── ArtistRoster.tsx
│   ├── Testimonials.tsx
│   ├── NewsletterCapture.tsx
│   └── Footer.tsx
├── lib/
│   └── data.ts             # Static content (services, artists, stats)
├── public/
│   └── logo-placeholder.svg
├── tailwind.config.ts
└── package.json
```

### Dependencies
```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^11.0.0",
  "@next/font": "latest"
}
```

---

## Differentiator vs V1 and V2

| | V1 Classic | V2 Web3 Stage | V3 Corporate Signal |
|--|-----------|--------------|-------------------|
| Vibe | Traditional pro | Bold/edgy/crypto | Clean authority |
| Colors | Navy + gold | Neon + dark | Black + platinum + cobalt |
| Animation | Minimal | Heavy | Purposeful (stats count-up, subtle parallax) |
| Web3 | No | Yes (wallet) | No |
| Logo style | Current logo | Glowing variant | New mark (Direction 1) |
| Target feel | "We've been here" | "We're the future" | "We mean business" |

**Recommendation:** V3 Corporate Signal is the strongest candidate for the final site given the logo redesign direction toward corporate sharpness.

---

## Vercel Deployment
- Branch: `mockup/v3-corporate`
- Preview URL: `galaxy-v3.vercel.app`
- Environment variable: `NEXT_PUBLIC_SITE_VERSION=v3-corporate`
