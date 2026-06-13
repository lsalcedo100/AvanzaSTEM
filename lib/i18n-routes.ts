import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

/**
 * URL prefixes for locale-prefixed routing. English is the default locale and
 * has no prefix (e.g. "/projects"), while Spanish and Chinese routes are served
 * under "/es" and "/zh" (e.g. "/es/projects", "/zh/projects") via middleware.
 */
export const LOCALE_PREFIXES: Record<Language, string> = {
  en: "",
  es: "/es",
  zh: "/zh",
}

/** Returns the locale-prefixed path for a given canonical (English) path. */
export function localizedPath(path: string, language: Language): string {
  const normalized = path === "/" ? "" : path
  const prefixed = `${LOCALE_PREFIXES[language]}${normalized}`
  return prefixed === "" ? "/" : prefixed
}

/**
 * Builds an `alternates.languages` map (including `x-default`) for a canonical
 * (English) path, pointing to the equivalent /es and /zh routes.
 */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const language of VALID_LANGUAGES) {
    languages[language] = localizedPath(path, language)
  }
  languages["x-default"] = localizedPath(path, "en")
  return languages
}

/**
 * `alternates.languages` map for routes that only have English content (the
 * page is reachable at /es and /zh via middleware, but renders the same
 * English copy, so we don't advertise it as a localized alternate). Only
 * `en` and `x-default` point at the canonical English path.
 */
export function enOnlyAlternates(path: string): Record<string, string> {
  return { en: path, "x-default": path }
}
