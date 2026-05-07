import type { Metadata } from "next"
import { cookies } from "next/headers"
import { type Language, translations } from "@/i18n/translations"
import { GamesPageContent } from "@/components/pages/games-page-content"

const VALID_LANGUAGES: Language[] = ["en", "es", "zh"]

function isLanguage(value: string | undefined): value is Language {
  return VALID_LANGUAGES.includes(value as Language)
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const cookieLanguage = cookieStore.get("avanza-lang")?.value
  const language: Language = isLanguage(cookieLanguage) ? cookieLanguage : "en"
  const t = translations[language].gamesPage
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: { canonical: "/games" },
  }
}

export default function GamesRoute() {
  return <GamesPageContent />
}
