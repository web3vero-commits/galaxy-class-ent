/**
 * Create CNAME radio.galaxyclassent.com → cname.vercel-dns.com via Hostinger API.
 *
 * Idempotent — checks if a record already exists for "radio" before creating.
 *
 * Usage:
 *   set -a && source ../../.env && set +a
 *   npx tsx scripts/setup-dns.ts
 *
 * Required env: HOSTINGER_API_KEY_GALAXYCLASS
 */

const DOMAIN = "galaxyclassent.com";
const SUBDOMAIN = "radio";
const TARGET = "cname.vercel-dns.com";

const API = "https://developers.hostinger.com/api";

async function api(path: string, init?: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      "Authorization": `Bearer ${process.env.HOSTINGER_API_KEY_GALAXYCLASS}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Hostinger ${res.status} ${path}: ${await res.text()}`);
  }
  return res.json();
}

async function main() {
  if (!process.env.HOSTINGER_API_KEY_GALAXYCLASS) {
    console.error("HOSTINGER_API_KEY_GALAXYCLASS not set");
    process.exit(1);
  }

  console.log(`Looking up zone for ${DOMAIN}...`);
  const records = await api(`/dns/v1/zones/${DOMAIN}`);
  console.log(`Found ${Array.isArray(records) ? records.length : "?"} records.`);

  const existing = (records as any[]).find(
    (r) => r.name === SUBDOMAIN && (r.type === "CNAME" || r.type === "A")
  );

  if (existing) {
    console.log(`Record already exists: ${existing.type} ${existing.name} → ${existing.value || existing.target}`);
    console.log("Aborting to avoid clobbering. Update manually if needed.");
    return;
  }

  console.log(`Creating CNAME ${SUBDOMAIN}.${DOMAIN} → ${TARGET}`);
  const result = await api(`/dns/v1/zones/${DOMAIN}`, {
    method: "PUT",
    body: JSON.stringify({
      overwrite: false,
      zone: [
        {
          name: SUBDOMAIN,
          type: "CNAME",
          ttl: 3600,
          records: [{ content: TARGET }],
        },
      ],
    }),
  });
  console.log("OK:", JSON.stringify(result, null, 2));
  console.log(`\nDNS propagation: ~5-15 min. Verify with:`);
  console.log(`  dig ${SUBDOMAIN}.${DOMAIN} CNAME +short`);
}

main().catch((e) => { console.error(e); process.exit(1); });
