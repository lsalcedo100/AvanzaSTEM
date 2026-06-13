import { type Language } from "@/i18n/translations"

export async function getLanguage(): Promise<Language> {
  return "en"
}
