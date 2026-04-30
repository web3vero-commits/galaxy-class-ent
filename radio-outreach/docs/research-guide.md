# Station Research Guide
## How to find Music Director / PD contact info

### Fastest Sources (in order)

1. **AllAccess.com** — industry directory, requires free account
   - `https://www.allaccess.com/net-news/archive/search?q=WKDF+music+director`
   - Search by call letters + "music director" or "program director"

2. **Radio Ink / RadioInfo** — often has staff changes and move announcements
   - `https://radioink.com/?s=WKDF+music+director`

3. **Country Aircheck / CHR Radio** — format-specific trades, staff directories
   - `https://countryaircheck.com`
   - `https://chrradio.com`

4. **LinkedIn** — search "[CALL LETTERS] music director" or "[STATION NAME] programming"
   - Usually shows full name + email format (first.last@station.com)

5. **Station Website** — /about or /staff pages
   - Pattern: `https://[callletters].com/about`
   - Pattern: `https://www.[callletters].com/staff`

6. **FCC License Search** — ownership + contact info
   - `https://www.fcc.gov/media/radio/fm-query`

7. **Google** — `"WKDF" "music director" site:linkedin.com`

---

### Email Patterns to Try

Once you have a name, try these patterns (verify with Hunter.io or similar):
- `firstname.lastname@[station].com`
- `flastname@[station].com`
- `firstname@[station].com`
- `music@[callletters].com`
- `md@[callletters].com`

---

### What to Collect Per Station

| Field | Notes |
|-------|-------|
| Contact name | Full name, correct spelling |
| Title | Music Director vs Program Director vs both |
| Direct phone | Extension or direct line if available |
| Email | Verified if possible |
| Best call days | Typically Tue–Thu, avoid Mon/Fri |
| Best call window | Most MDs available 10–11:30 AM local |
| Submission method | Email? Upload portal? FTP? |
| Add dates | When does the station update its playlist? |

---

### Research Status Workflow

```
UNVERIFIED → (research done) → VERIFIED → (first contact) → ACTIVE
                                                           → NO_CONTACT (3+ attempts)
                                                           → DNC (do not call)
```

Run `npx tsx scripts/research.ts` to see all stations needing research.
Run `npx tsx scripts/research.ts WKDF --update` to update a station interactively.

---

*Galaxy Class Entertainment — Radio Outreach System*
