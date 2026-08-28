import { VALID_LANGUAGES, type Language } from "@/i18n/translations"
import { siteConfig } from "@/lib/site-config"

/** Prefixes a site-root-relative path with the origin to yield an absolute URL. */
function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`
}

/**
 * URL prefixes for locale-prefixed routing. English is the default locale and
 * has no prefix (e.g. "/projects"), while Spanish, Chinese and Portuguese
 * routes are served under "/es", "/zh" and "/pt" (e.g. "/es/projects",
 * "/zh/projects", "/pt/projects") via middleware.
 */
export const LOCALE_PREFIXES: Record<Language, string> = {
  en: "",
  es: "/es",
  zh: "/zh",
  pt: "/pt",
}

/** Returns the locale-prefixed path for a given canonical (English) path. */
export function localizedPath(path: string, language: Language): string {
  const normalized = path === "/" ? "" : path
  const prefixed = `${LOCALE_PREFIXES[language]}${normalized}`
  return prefixed === "" ? "/" : prefixed
}

/**
 * Builds an `alternates.languages` map (including `x-default`) for a canonical
 * (English) path, pointing to the equivalent /es, /zh and /pt routes.
 */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const language of VALID_LANGUAGES) {
    languages[language] = absoluteUrl(localizedPath(path, language))
  }
  languages["x-default"] = absoluteUrl(localizedPath(path, "en"))
  return languages
}

/**
 * `alternates.languages` map for routes that only have English content (the
 * page is reachable at /es, /zh and /pt via middleware, but renders the same
 * English copy, so we don't advertise it as a localized alternate). Only
 * `en` and `x-default` point at the canonical English path.
 */
export function enOnlyAlternates(path: string): Record<string, string> {
  return { en: absoluteUrl(path), "x-default": absoluteUrl(path) }
}

/**
 * Strips any locale prefix off a live pathname, yielding the canonical English
 * path. `/pt/courses/robotics` becomes `/courses/robotics`, and a path that is
 * already unprefixed is returned unchanged.
 */
export function canonicalPath(pathname: string): string {
  const segments = pathname.split("/")
  const first = segments[1]
  if (!first || !VALID_LANGUAGES.includes(first as Language) || first === "en") {
    return pathname
  }
  const rest = `/${segments.slice(2).join("/")}`
  return rest === "/" ? "/" : rest.replace(/\/$/, "")
}
