# GCE Radio CRM

Web CRM at **radio.galaxyclassent.com** for Galaxy Class Entertainment radio outreach. Mike Z signs in with his `@galaxyclassent.com` Google account, gets a queue of stations to call, taps phone numbers to dial, logs results back to a Google Sheet.

## Stack

- **Next.js 15** (App Router) on Vercel
- **NextAuth.js** with Google OAuth (Workspace-restricted)
- **Google Sheets API** as the database (service-account auth, 5-min read cache)
- **Tailwind CSS** for the UI
- **Hostinger** DNS (`radio.galaxyclassent.com` CNAME → Vercel)

## Account / role split

- `michelle@galaxyclassent.com` — Workspace super-admin. Used by Mike Foley for Cloud Console, OAuth project ownership, service account creation. NOT a daily-use account.
- `michael_z@galaxyclassent.com` — End user. Signs into the CRM, does the calls.
- `foleymon@gmail.com` — Mike Foley dev access via the `ALLOWED_USERS` allowlist.

## One-time setup

### 1. Google Cloud Console (signed in as `michelle@`)

1. Create project **"GCE Radio CRM"**
2. APIs & Services → Library → enable **Google Sheets API**, **Google Drive API**, **OAuth2 API**
3. APIs & Services → OAuth consent screen → User type **Internal**, app name "GCE Radio CRM"
4. APIs & Services → Credentials → Create Credentials → OAuth client ID:
   - Application type: **Web application**
   - Authorized JavaScript origins: `https://radio.galaxyclassent.com`, `http://localhost:3000`
   - Authorized redirect URIs: `https://radio.galaxyclassent.com/api/auth/callback/google`, `http://localhost:3000/api/auth/callback/google`
   - Save → copy Client ID + Client Secret into `.env.local`
5. Credentials → Create Credentials → Service Account:
   - Name: `radio-crm-backend`
   - Skip role grant (we share specific Sheets with it)
   - After creation: Keys tab → Add Key → JSON → save outside the repo, e.g. `/home/mike/secrets/gce-radio-crm-sa.json`

### 2. Create the Google Sheet

1. Go to [sheets.new](https://sheets.new), name it **"GCE Radio CRM"**
2. Share → add the service-account email (looks like `radio-crm-backend@<project-id>.iam.gserviceaccount.com`) as **Editor**
3. Copy the Sheet ID from the URL → set `GCE_RADIO_SHEET_ID` in `.env.local`
4. Run `npx tsx scripts/init-sheet.ts` to add tabs and headers

### 3. Local dev

```bash
cp .env.example .env.local
# fill in: GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET,
#          GOOGLE_SERVICE_ACCOUNT_JSON_PATH, GCE_RADIO_SHEET_ID,
#          NEXTAUTH_SECRET (generate via `openssl rand -base64 32`)
npm install
npm run dev
```

Visit http://localhost:3000 → sign in with a `@galaxyclassent.com` account.

### 4. Production deploy (Vercel)

```bash
# Create Vercel project + bind domain
set -a && source ../.env && set +a
npx tsx scripts/setup-vercel.ts

# Create DNS record
npx tsx scripts/setup-dns.ts
```

Then in Vercel dashboard → Project Settings → Environment Variables, paste the same values from `.env.local` (use `GOOGLE_SERVICE_ACCOUNT_JSON` inline form here, not the path form).

Push to `main` → Vercel auto-deploys.

## Project layout

```
radio-crm/
├── app/
│   ├── layout.tsx, providers.tsx, globals.css, page.tsx (redirect)
│   ├── login/page.tsx
│   ├── queue/page.tsx              # call list, sorted by priority
│   ├── station/[callsign]/         # detail + log-call form
│   └── api/
│       ├── auth/[...nextauth]/     # NextAuth handler
│       └── log-call/               # POST: append to CallLog tab
├── lib/
│   ├── auth.ts                     # NextAuth config + allowlist enforcement
│   ├── google.ts                   # service account loader
│   └── sheets-cache.ts             # Sheets reads with 5-min TTL cache
├── middleware.ts                   # Auth gate on every route except /login
├── scripts/
│   ├── init-sheet.ts               # One-time sheet bootstrap
│   ├── setup-dns.ts                # Hostinger CNAME create
│   └── setup-vercel.ts             # Vercel project + domain bind
└── package.json, tsconfig.json, next.config.js, tailwind.config.ts, vercel.json
```

## Roadmap

- v0 — read-only queue + station detail (this scaffold)
- v1 — log call results back to Sheets *(scaffolded, needs sheet to test)*
- v2 — Workspace integrations: Gmail send, Calendar callback, Contacts add
- v3 — Twilio click-to-call (real VoIP) + auto-log call duration
- v4 — AI-assisted pitch personalization per station, fed by `radio-outreach/` enrichment
