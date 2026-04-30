/**
 * Create a Vercel project for radio-crm and bind the radio.galaxyclassent.com domain.
 *
 * Idempotent — skips if project exists; skips if domain already bound.
 *
 * Usage:
 *   set -a && source ../../.env && set +a
 *   npx tsx scripts/setup-vercel.ts
 *
 * Required env: VERCEL_TOKEN, VERCEL_TEAM_ID
 */

const PROJECT_NAME = "gce-radio-crm";
const DOMAIN = "radio.galaxyclassent.com";
const FRAMEWORK = "nextjs";
const ROOT_DIRECTORY = "radio-crm";
const GIT_REPO = "web3vero-commits/galaxy-class-ent";

const API = "https://api.vercel.com";

async function v(path: string, init?: RequestInit) {
  const teamSep = path.includes("?") ? "&" : "?";
  const url = `${API}${path}${teamSep}teamId=${process.env.VERCEL_TEAM_ID}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Authorization": `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Vercel ${res.status} ${path}: ${text}`);
  return text ? JSON.parse(text) : {};
}

async function main() {
  if (!process.env.VERCEL_TOKEN || !process.env.VERCEL_TEAM_ID) {
    console.error("VERCEL_TOKEN and VERCEL_TEAM_ID required");
    process.exit(1);
  }

  // Check if project already exists
  let project: any;
  try {
    project = await v(`/v9/projects/${PROJECT_NAME}`);
    console.log(`Project ${PROJECT_NAME} exists (id=${project.id}).`);
  } catch (e: any) {
    if (!String(e.message).includes("404")) throw e;
    console.log(`Creating Vercel project ${PROJECT_NAME}...`);
    project = await v(`/v11/projects`, {
      method: "POST",
      body: JSON.stringify({
        name: PROJECT_NAME,
        framework: FRAMEWORK,
        rootDirectory: ROOT_DIRECTORY,
        gitRepository: { type: "github", repo: GIT_REPO },
      }),
    });
    console.log(`Created (id=${project.id}).`);
  }

  // Bind domain
  console.log(`\nBinding domain ${DOMAIN} to project...`);
  try {
    const result = await v(`/v10/projects/${project.id}/domains`, {
      method: "POST",
      body: JSON.stringify({ name: DOMAIN }),
    });
    console.log("Domain bound:", result.name);
  } catch (e: any) {
    if (String(e.message).includes("already") || String(e.message).includes("409")) {
      console.log("Domain already bound — OK.");
    } else {
      throw e;
    }
  }

  console.log(`\nNext steps:
  1. Add the env vars from .env.example to the Vercel project
     (Project Settings → Environment Variables)
  2. Push the radio-crm directory; Vercel will auto-deploy from the git repo
  3. Wait for DNS to propagate (~5-15 min)
  4. https://${DOMAIN}/ should serve the app once SSL provisions`);
}

main().catch((e) => { console.error(e); process.exit(1); });
