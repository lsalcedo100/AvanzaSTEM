import sitemap from "../../app/sitemap.ts"
import { siteConfig } from "../../lib/site-config.ts"

/**
 * Tells IndexNow-participating search engines (Bing, and through it DuckDuckGo
 * and Yahoo; also Yandex, Naver and Seznam) that pages changed, so they recrawl
 * within minutes instead of whenever their crawler next comes around.
 *
 * Google does not take part in IndexNow. For Google, recrawls are requested by
 * hand in Search Console (URL Inspection -> Request indexing); the accurate
 * <lastmod> values in app/sitemap.ts are the only automated signal it reads.
 *
 * The key is public by design: engines verify ownership by fetching
 * /<key>.txt from the site and checking it contains the key. That file lives
 * in public/, so run this only AFTER the deploy carrying it is live, or the
 * first submission is rejected with a 403.
 *
 * Run it with:
 *   npm run indexnow                      submit every sitemap URL
 *   npm run indexnow -- --since=2026-09-01  only URLs whose lastmod is on/after the date
 *   npm run indexnow -- --dry-run           print what would be sent, send nothing
 */
const INDEXNOW_KEY = "7d8029f789246b3ff4e8d4ff02ab9498"
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

// IndexNow accepts at most 10,000 URLs per request.
const MAX_URLS_PER_REQUEST = 10_000

const args = process.argv.slice(2)
const dryRun = args.includes("--dry-run")
const since = args.find((arg) => arg.startsWith("--since="))?.slice("--since=".length)

if (since && !/^\d{4}-\d{2}-\d{2}$/.test(since)) {
  console.error(`--since expects YYYY-MM-DD, got "${since}"`)
  process.exit(1)
}

const urls = sitemap()
  // lastModified values in the sitemap are ISO date strings, so a plain string
  // comparison orders them correctly.
  .filter((entry) => !since || String(entry.lastModified ?? "") >= since)
  .map((entry) => entry.url)

if (urls.length === 0) {
  console.log("No URLs matched; nothing to submit.")
  process.exit(0)
}

const host = new URL(siteConfig.url).host

console.log(`${dryRun ? "[dry run] Would submit" : "Submitting"} ${urls.length} URLs for ${host}`)

if (dryRun) {
  for (const url of urls) console.log(`  ${url}`)
  process.exit(0)
}

for (let start = 0; start < urls.length; start += MAX_URLS_PER_REQUEST) {
  const batch = urls.slice(start, start + MAX_URLS_PER_REQUEST)
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
      urlList: batch,
    }),
  })

  // 200 = accepted, 202 = accepted and the key is still being verified.
  if (response.status !== 200 && response.status !== 202) {
    console.error(`IndexNow rejected the submission: ${response.status} ${response.statusText}`)
    if (response.status === 403) {
      console.error(`Is ${siteConfig.url}/${INDEXNOW_KEY}.txt deployed and reachable?`)
    }
    process.exit(1)
  }

  console.log(`  ${batch.length} URLs accepted (${response.status})`)
}
