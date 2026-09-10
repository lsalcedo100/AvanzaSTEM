/**
 * Presentation helpers shared by the workshop finder's sidebar and its map. Both
 * render the same session dates and the same partner names, so the formatting
 * lives here rather than being passed from one component into the other.
 */
import type { InternationalPartner } from "./locations"

const DATE_LOCALES: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  zh: "zh-CN",
  pt: "pt-BR",
}

/** Parse a YYYY-MM-DD string as local midnight (avoids UTC day-shift). */
export function parseISODate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function formatSessionDate(iso: string, language: string) {
  return parseISODate(iso).toLocaleDateString(DATE_LOCALES[language] ?? "en-US", {
    month: "short",
    day: "numeric",
  })
}

/** The first session that has not happened yet, or null once the series is done. */
export function nextSession(sessions: string[] | undefined) {
  if (!sessions?.length) return null
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  return sessions.find((iso) => parseISODate(iso) >= start) ?? null
}

/**
 * Venues abroad carry both an English name and one in their own script. Readers
 * of that script get the local name first; everyone else gets the English one.
 */
export function partnerPrimaryName(partner: InternationalPartner, language: string) {
  return language === "zh" && partner.localName ? partner.localName : partner.name
}

/** The name not used as the headline, plus the district line, if either exists. */
export function partnerSecondLine(
  partner: InternationalPartner,
  language: string,
  localityLabel: Record<"minhang", string>,
) {
  const otherName = language === "zh" ? partner.name : partner.localName
  const locality = partner.localityKey ? localityLabel[partner.localityKey] : null
  return [otherName, locality].filter(Boolean).join(" · ")
}
