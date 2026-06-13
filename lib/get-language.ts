import { headers } from "next/headers"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

/**
 * Resolves the active locale from the "x-locale" request header set by
 * middleware.ts based on the "/es" and "/zh" route prefixes. Defaults to "en".
 */
export async function getLanguage(): Promise<Language> {
  const headerList = await headers()
  const locale = headerList.get("x-locale")

  if (locale && (VALID_LANGUAGES as string[]).includes(locale)) {
    return locale as Language
  }

  return "en"
}
