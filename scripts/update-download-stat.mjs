// Fetches the current download count for the Odyssey Visuals CurseForge
// project and writes it into the STATS array in content.js.
//
// Run via the "Update Download Stats" GitHub Action (see
// .github/workflows/update-downloads.yml). Not meant to be run with a
// hardcoded key locally — reads the key from the CURSEFORGE_API_KEY env var.

import { readFile, writeFile } from "node:fs/promises";

const PROJECT_ID = 1170942;
const CONTENT_JS_PATH = new URL("../content.js", import.meta.url);

const apiKey = process.env.CURSEFORGE_API_KEY;
if (!apiKey) {
  console.error("Missing CURSEFORGE_API_KEY environment variable.");
  process.exit(1);
}

// Formats a raw count like 312481 into the "312K+" style already used in
// content.js's STATS array. Falls back to a plain number under 1,000.
function formatCount(n) {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  }
  if (n >= 1_000) {
    return `${Math.floor(n / 1000)}K+`;
  }
  return String(n);
}

async function main() {
  const res = await fetch(`https://api.curseforge.com/v1/mods/${PROJECT_ID}`, {
    headers: {
      Accept: "application/json",
      "x-api-key": apiKey,
    },
  });

  if (!res.ok) {
    console.error(`CurseForge API request failed: ${res.status} ${res.statusText}`);
    const body = await res.text().catch(() => "");
    if (body) console.error(body);
    process.exit(1);
  }

  const json = await res.json();
  const downloadCount = json?.data?.downloadCount;

  if (typeof downloadCount !== "number") {
    console.error("Unexpected API response shape — no numeric downloadCount found.");
    console.error(JSON.stringify(json).slice(0, 500));
    process.exit(1);
  }

  const formatted = formatCount(downloadCount);
  console.log(`Fetched download count: ${downloadCount} -> "${formatted}"`);

  let source = await readFile(CONTENT_JS_PATH, "utf8");

  // Matches the DOWNLOADS entry in the STATS array, e.g.:
  //   { icon: "/assets/icon-downloads.svg", value: "300K+", label: "DOWNLOADS" },
  // Only the value string is replaced; icon/label/formatting are untouched.
  const statLinePattern =
    /(\{\s*icon:\s*"[^"]*"\s*,\s*value:\s*")([^"]*)("\s*,\s*label:\s*"DOWNLOADS"\s*\})/;

  if (!statLinePattern.test(source)) {
    console.error("Could not find the DOWNLOADS entry in STATS inside content.js — no changes made.");
    process.exit(1);
  }

  const updated = source.replace(statLinePattern, (_match, before, _oldValue, after) => {
    return `${before}${formatted}${after}`;
  });

  if (updated === source) {
    console.log("Download count unchanged — nothing to commit.");
    process.exit(0);
  }

  await writeFile(CONTENT_JS_PATH, updated, "utf8");
  console.log("content.js updated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
