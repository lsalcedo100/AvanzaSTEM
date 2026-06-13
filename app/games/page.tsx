import type { Metadata } from "next"
import { translations } from "@/i18n/translations"
import { GamesPageContent } from "@/components/pages/games-page-content"
import { getLanguage } from "@/lib/get-language"
import { siteConfig } from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
  const t = translations[language].gamesPage
  const title = t.metaTitle
  const description = t.metaDesc
  return {
    title,
    description,
    alternates: { canonical: "/games" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/games`,
      siteName: siteConfig.name,
      type: "website",
    },
  }
}

export default function GamesRoute() {
  return <GamesPageContent />
}
