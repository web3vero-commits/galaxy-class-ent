# Galaxy Class Newsletter — Specification

## Model: Beehiiv-Inspired

### Core Features to Replicate

#### Publishing
- Drag-and-drop email builder (no code)
- Pre-built section templates
- Web version of each issue (SEO-indexed)
- AI writing assist
- Scheduled sends

#### Growth
- Embedded subscribe forms (website + landing page)
- Referral program (readers refer readers)
- Magic links (one-click subscribe from social)
- Pop-up capture
- Subscriber segmentation

#### Monetization
- Paid subscriber tier (premium content)
- Sponsorship slots (above/below fold)
- Digital product links
- Boost units (cross-promote other newsletters)

#### Analytics
- Open rate, CTR, unsubscribe rate
- Per-issue performance
- Subscriber growth chart
- Revenue dashboard

---

## Galaxy Class Newsletter Content Plan

### Proposed Name: **The Galaxy Report** (or "The Backstage Pass")

### Sections (each issue)
1. **Featured Artist Spotlight** — profile of a GCE roster artist
2. **Industry News** — music biz headlines (radio, streaming, publishing)
3. **Radio Chart Watch** — tracks GCE is currently promoting
4. **Service Highlight** — deep-dive one service per issue
5. **Studio Sessions** — recording tips, production notes
6. **Events & Bookings** — upcoming shows, booking opportunities
7. **Subscriber Exclusive** — discount code, early access, or freebie

### Cadence: Weekly or Bi-weekly

### Tech Options

| Option | Pros | Cons |
|--------|------|------|
| **Beehiiv** (hosted) | Fastest launch, built-in monetization, referrals | Monthly cost, less customization |
| **React Email + Resend** (custom) | Full control, Web3-ready, owned stack | More dev time |
| **Mailchimp** | Familiar | Expensive at scale, less modern |
| **ConvertKit** | Creator-focused | No native Web3 |

**Recommendation:** Start with Beehiiv for speed-to-launch. Migrate to custom React Email / Resend stack once the audience is established and Web3 features are needed.

---

## Implementation Notes
- Embed subscribe form on new Vercel site
- Dedicated newsletter landing page at `/newsletter` or `newsletter.galaxyclassent.com`
- Archive of past issues publicly accessible
- GDPR/CAN-SPAM compliant footer on all sends
