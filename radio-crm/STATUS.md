# Radio CRM — Status

**Last updated:** 2026-04-30
**State:** ⏸ Paused — waiting on GCE Google Cloud billing account

## Where we stopped

Scaffold is committed (`8eb8d6b`) and pushed. Code compiles and runs locally if you fill in `.env.local`, but nothing's wired up to live infrastructure yet.

### Done

- Next.js 15 / App Router scaffold with NextAuth + Tailwind
- Workspace-domain-restricted OAuth + per-email allowlist (`michael_z@`, `michelle@`, `foleymon@`)
- Sheets-as-DB backend with 5-min read cache and call-log append
- `/queue`, `/station/[callsign]`, log-call form, tap-to-call links
- DNS create script (Hostinger API) — not run
- Vercel project create script — not run
- Sheet bootstrap script (`init-sheet.ts`) — not run
- Repo security: PAT out of `.git/config`, `.gitignore` hardened
- Two repo commits + push to `web3vero-commits/galaxy-class-ent`

### Blocked on GCE setup

GCE doesn't have a billing account on Google Cloud yet. Even though our actual usage (OAuth, Sheets API) lives well inside the free tier, creating the OAuth client and service account inside a GCP project is the gating step. Until Mike Z (or whoever owns GCE billing) attaches a billing account to a new "GCE Radio CRM" project signed in as `michelle@galaxyclassent.com`, we can't:

- Generate the OAuth Client ID / Secret
- Create the service account JSON for Sheets access
- Run `init-sheet.ts`
- Run `setup-vercel.ts` (this only needs Vercel creds — could actually run today)
- Run `setup-dns.ts` (only needs Hostinger — could actually run today)

### Resume checklist (when GCP billing is live)

1. Mike F (signed in as `michelle@galaxyclassent.com`) does the Cloud Console steps in `README.md` → "One-time setup" → §1
2. Create the empty Google Sheet, share with the service-account email
3. Drop into `/mnt/c/Users/foley/Projects/GalaxyClass/.env`:
   - `GOOGLE_OAUTH_CLIENT_ID`
   - `GOOGLE_OAUTH_CLIENT_SECRET`
   - `GOOGLE_SERVICE_ACCOUNT_JSON_PATH=/home/mike/secrets/gce-radio-crm-sa.json`
   - `GCE_RADIO_SHEET_ID`
   - `NEXTAUTH_SECRET` (gen via `openssl rand -base64 32`)
4. From `radio-crm/`:
   ```
   npm install
   npm run dev          # smoke test local
   npx tsx scripts/init-sheet.ts
   npx tsx scripts/setup-vercel.ts
   npx tsx scripts/setup-dns.ts
   ```
5. In Vercel dashboard → add the env vars → push → first deploy
6. Import enriched data into the `Stations` tab (after radio-outreach Phase 1 enrichment runs)

## Cross-project linkage

`radio-outreach/` (the data pipeline) is the upstream that produces the `Stations` tab content. That project is also paused — waiting on Mike Z's reply to the 2026-04-30 email asking which formats / markets / AllAccess sub.

When both unblock, the order is:
1. Mike Z answers genres + markets → run `radio-outreach/scripts/enrich-pd-md.ts` → get `stations-enriched.csv`
2. GCE billing → wire up GCP → run `radio-crm/scripts/init-sheet.ts` → import the enriched CSV into the Sheet
3. CRM goes live at `radio.galaxyclassent.com`
