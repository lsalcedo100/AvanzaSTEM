import type { Metadata } from "next"

import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { GamesPageContent } from "@/components/pages/games-page-content"

export function generateMetadata(): Metadata {
  return generateSitePageMetadata("games", "en")
}

export default function GamesRoute() {
  return <GamesPageContent />
}
