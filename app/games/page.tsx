import type { Metadata } from "next"
import { translations } from "@/i18n/translations"
import { GamesPageContent } from "@/components/pages/games-page-content"
import { getLanguage } from "@/lib/get-language"

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
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
