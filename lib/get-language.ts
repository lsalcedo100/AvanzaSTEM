import { cookies } from "next/headers"
import { type Language, VALID_LANGUAGES } from "@/i18n/translations"

const COOKIE_NAME = "avanza-lang"

export async function getLanguage(): Promise<Language> {
  const cookieStore = await cookies()
  const value = cookieStore.get(COOKIE_NAME)?.value

  return VALID_LANGUAGES.includes(value as Language) ? (value as Language) : "en"
}
