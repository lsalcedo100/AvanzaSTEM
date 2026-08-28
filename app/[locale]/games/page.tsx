import type { Metadata } from "next"

import type { Language } from "@/i18n/translations"
import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { GamesPageContent } from "@/components/pages/games-page-content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateSitePageMetadata("games", locale as Language)
}

export default function LocaleGamesPage() {
  return <GamesPageContent />
}
