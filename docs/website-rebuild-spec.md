# Galaxy Class Entertainment — Website Rebuild Spec

## Goals
- Modern, professional music industry aesthetic
- Mobile-first, fast (Core Web Vitals green)
- SEO-optimized
- Web3-ready (wallet connect optional, NFT artist drops possible)
- Three mockup versions on Vercel before final decision
- Incorporate new corporate logo redesign direction (see logo-redesign-brief.md)

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 (App Router) | SSR/SSG, Vercel-native, fast |
| Styling | Tailwind CSS + shadcn/ui | Rapid UI, consistent design |
| Animations | Framer Motion | Music industry = visual impact |
| CMS | Sanity.io | Structured content, artist profiles |
| Email/Newsletter | React Email + Resend or Beehiiv embed | |
| Web3 | Wagmi + RainbowKit (optional) | Wallet connect, artist NFTs |
| Analytics | Vercel Analytics + PostHog | |
| Forms | React Hook Form + Resend | Replace current WP form |
| Media | Cloudinary or Vercel Blob | Podcast, MP3 previews |
| Deployment | Vercel | Auto-deploy from GitHub |

---

## Mockup V3 — "Corporate Signal" (NEW — Recommended)
See `website-mockup-v3-corporate.md` for full spec.
- Clean authority aesthetic: near-black + platinum + cobalt
- Designed around new logo Direction 1 ("Signal")
- No Web3, no heavy animation — whitespace and typography carry the weight
- Target peers: CAA, WME, Interscope
- Branch: `mockup/v3-corporate` → `galaxy-v3.vercel.app`

---

## Mockup V1 — "Classic Pro" (Conservative)
- Clean, dark music industry aesthetic
- Navy/black/gold color palette
- Strong typography (serif headline + sans body)
- Sections: Hero → Services → Artist Roster → About → Newsletter Signup → Contact
- No Web3 elements
- Target: existing clients who expect professionalism

## Mockup V2 — "Web3 Stage" (Forward-leaning)
- Bold, dynamic — neon/dark palette
- Animated hero with particle or waveform visual
- Wallet connect button in nav
- Artist NFT showcase section
- Tokenized loyalty/fan club teaser
- Same core sections + Web3 layer on top
- Target: artists who want cutting-edge representation

---

## Page Structure (both versions)

### `/` Home
- Hero: tagline, CTA (Get Started / Book a Call)
- Services grid (6 featured, link to full list)
- Stats bar: X artists managed, Y radio plays, Z years
- Artist spotlight carousel
- Newsletter signup strip
- Testimonials
- Footer

### `/services` 
- Full 13-service grid with icons, descriptions, pricing tiers

### `/artists`
- Roster grid with artist card, bio, links

### `/about`
- Company history, Michael Z bio, team, FL + Nashville offices

### `/newsletter`
- Beehiiv embed or custom signup
- Archive of past issues

### `/contact`
- Form (name, email, service interest, file upload)
- Office locations map
- Phone + email

---

## SEO Strategy
- Target keywords: "music artist management Florida", "radio promotion Nashville", "music career consulting"
- Schema markup: LocalBusiness, MusicGroup
- Blog/content section for long-tail ("how to get radio play", "artist booking tips")

---

## Deployment Plan
1. Initialize Next.js 14 repo → push to `galaxy-class-ent` GitHub
2. Connect to Vercel → auto-deploy previews
3. V1 mockup deployed at `galaxy-v1.vercel.app`
4. V2 mockup deployed at `galaxy-v2.vercel.app`
5. Michael reviews, picks direction
6. Point `galaxyclassent.com` DNS to Vercel (after renewal)
7. Final build + launch

---

## Domain/DNS Migration Notes
- Current: Hostinger shared hosting (WordPress)
- Target: Vercel (Next.js)
- DNS change: Add Vercel A records / CNAME to galaxyclassent.com
- Keep Hostinger for domain registration (or transfer to Cloudflare)
- **MUST renew galaxyclassent.com BEFORE starting DNS migration**
