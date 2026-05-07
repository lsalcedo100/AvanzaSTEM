import type { Metadata } from "next"
import { cookies } from "next/headers"
import { type Language, translations } from "@/i18n/translations"
import { WorkshopFinderPage } from "@/components/pages/workshop-finder-page"

const VALID_LANGUAGES: Language[] = ["en", "es", "zh"]

function isLanguage(value: string | undefined): value is Language {
  return VALID_LANGUAGES.includes(value as Language)
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const cookieLanguage = cookieStore.get("avanza-lang")?.value
  const language: Language = isLanguage(cookieLanguage) ? cookieLanguage : "en"
  const t = translations[language].home
  return {
    title: t.finderMetaTitle,
    description: t.finderMetaDesc,
    alternates: { canonical: "/find-a-workshop" },
  }
}

export default function FindAWorkshopRoute() {
  return <WorkshopFinderPage />
}
