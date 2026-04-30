# Radio Outreach Agent — Design Spec
## Phase 2: Autonomous Station Research & Cold Call Agent

---

### What It Does

The agent autonomously:
1. Picks the next UNVERIFIED station from the queue
2. Scrapes station website, AllAccess, LinkedIn for MD/PD contact info
3. Verifies email via SMTP ping or Hunter.io API
4. Updates stations.csv with verified contact info
5. (Phase 3) Initiates a call via Twilio or Bland.ai with the approved call script
6. Logs the outcome to call-log.csv
7. Schedules follow-up calls via cron

---

### Phase 1 (Current) — Manual Research + Logging
- `scripts/research.ts` — surfaces stations needing info, shows research URLs
- `scripts/log-call.ts` — interactive call result logger
- `scripts/export-sheet.ts` — Google Sheets export
- `data/stations.csv` — master station database
- `data/call-log.csv` — call history

### Phase 2 — Automated Research Agent
**Stack:**
- `tsx` + `playwright` or `puppeteer` — headless scraping
- `Hunter.io API` — email verification ($49/mo or free tier)
- `OpenAI / Claude API` — parse unstructured staff pages
- Cron or Claude Code loop — run nightly on Talon

**Flow:**
```
pick_next_station()
  → scrape_station_website(url)
  → scrape_allaccess(call_letters)
  → scrape_linkedin(station_name + "music director")
  → parse_contacts(raw_html) → {name, title, email, phone}
  → verify_email(email)
  → update_station_record(call_letters, contact)
  → log_research_result()
```

### Phase 3 — Autonomous Cold Calling
**Stack:**
- `Bland.ai` or `Twilio + ElevenLabs` — AI voice agent
- Approved call script from `docs/call-script.md`
- Human escalation trigger: if agent reaches live MD, alert MikeZ via SMS/Telegram

**Rules:**
- Only call during approved windows (Tue–Thu, 10:00–11:30 AM local)
- Max 2 automated attempts per station before human takeover
- Never leave a voicemail more than once per station per month
- MikeZ gets SMS notification for every live answer — he can join the call

---

### Data Flow

```
stations.csv  ←→  research agent  ←→  AllAccess / LinkedIn / Station sites
     ↑                                          ↓
call-log.csv  ←  log-call.ts / call agent  ←  Bland.ai / Twilio
     ↓
exports/  →  Google Sheets (shared with MikeZ)
```

---

### Environment Variables Needed (Phase 2+)

```
HUNTER_API_KEY=           # email verification
BLAND_API_KEY=            # AI calling (Phase 3)
TWILIO_SID=               # fallback calling
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
MIKEZ_PHONE=+14075746988  # SMS alerts on live answer
TELEGRAM_BOT_TOKEN=       # optional — alert via Telegram
```

---

*Galaxy Class Entertainment — Radio Outreach System*
*Last updated: April 2026*
