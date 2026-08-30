import assert from "node:assert/strict"
import { readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

import sitemap from "../../app/sitemap.ts"
import { siteConfig } from "../../lib/site-config.ts"
import { VALID_LANGUAGES } from "../../i18n/translations.ts"

/**
 * The sitemap is generated from curriculum data, not hand-maintained, so the
 * failure mode is not a typo - it is a route that exists on disk and never
 * reaches the file, or a locale that silently stops being emitted.
 *
 * Both have happened. Every course page was emitted for all four locales only
 * because `fullyTranslated` read `hasLocaleOverlay`, which answers "does an
 * overlay object exist", not "is it complete". These tests pin the observable
 * contract instead: one entry per locale per route, reciprocal hreflang on
 * each, and no route on disk left out.
 */

const entries = sitemap()
const origin = siteConfig.url
const paths = entries.map((entry) => entry.url.replace(origin, "") || "/")

/** Strips the /es, /zh or /pt prefix to get the canonical English path. */
function canonical(path: string): string {
  const match = path.match(/^\/(es|zh|pt)(\/.*)?$/)
  if (!match) return path
  return match[2] ?? "/"
}

test("every URL is absolute and appears exactly once", () => {
  for (const entry of entries) {
    assert.ok(entry.url.startsWith(`${origin}/`), `not an absolute site URL: ${entry.url}`)
  }
  const unique = new Set(entries.map((entry) => entry.url))
  assert.equal(unique.size, entries.length, "the sitemap lists the same URL twice")
})

test("every route is emitted once per locale", () => {
  const byCanonical = new Map<string, Set<string>>()
  for (const path of paths) {
    const key = canonical(path)
    const prefix = path.match(/^\/(es|zh|pt)(\/|$)/)
    const language = prefix ? prefix[1] : "en"
    if (!byCanonical.has(key)) byCanonical.set(key, new Set())
    byCanonical.get(key)!.add(language)
  }

  for (const [route, languages] of byCanonical) {
    assert.deepEqual(
      [...languages].sort(),
      [...VALID_LANGUAGES].sort(),
      `${route} is not emitted for every locale`,
    )
  }
})

test("every entry carries reciprocal hreflang including x-default", () => {
  for (const entry of entries) {
    const languages = entry.alternates?.languages as Record<string, string> | undefined
    assert.ok(languages, `${entry.url} has no hreflang alternates`)

    const route = canonical(entry.url.replace(origin, "") || "/")
    for (const language of VALID_LANGUAGES) {
      const expected =
        language === "en"
          ? `${origin}${route}`
          : `${origin}/${language}${route === "/" ? "" : route}`
      assert.equal(
        languages[language],
        expected,
        `${entry.url} is missing a reciprocal hreflang for ${language}`,
      )
    }
    assert.equal(
      languages["x-default"],
      `${origin}${route}`,
      `${entry.url} must point x-default at the English URL`,
    )
  }
})

test("lastModified is a real ISO date, never in the future", () => {
  const today = new Date().toISOString().slice(0, 10)
  for (const entry of entries) {
    const value = String(entry.lastModified)
    assert.match(value, /^\d{4}-\d{2}-\d{2}$/, `${entry.url} has a malformed lastModified`)
    assert.ok(
      value <= today,
      `${entry.url} claims a lastModified in the future (${value}), which teaches Google to ignore the field`,
    )
  }
})

/**
 * Walks app/ for statically routed pages. Dynamic segments are skipped: they
 * are enumerated from curriculum data, which the checks above already cover.
 */
function staticRoutesOnDisk(dir: string, prefix = ""): string[] {
  const found: string[] = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (!statSync(full).isDirectory()) {
      if (name === "page.tsx") found.push(prefix === "" ? "/" : prefix)
      continue
    }
    // [locale] mirrors the English tree; [slug]/[lesson] are data-driven.
    if (name.startsWith("[") || name.startsWith("(") || name === "api") continue
    found.push(...staticRoutesOnDisk(full, `${prefix}/${name}`))
  }
  return found
}

test("every page on disk is in the sitemap", () => {
  const inSitemap = new Set(paths.map(canonical))
  const missing = staticRoutesOnDisk("app").filter((route) => !inSitemap.has(route))
  assert.deepEqual(missing, [], `these routes render but are not in the sitemap: ${missing.join(", ")}`)
})
