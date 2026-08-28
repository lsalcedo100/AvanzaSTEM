import type { Metadata } from "next"

import type { Language } from "@/i18n/translations"
import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { WorkshopFinderPage } from "@/components/pages/workshop-finder-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateSitePageMetadata("findAWorkshop", locale as Language)
}

export default function LocaleFindAWorkshopPage() {
  return <WorkshopFinderPage />
}
