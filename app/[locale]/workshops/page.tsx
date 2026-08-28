import type { Metadata } from "next"

import type { Language } from "@/i18n/translations"
import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { WorkshopsPageContent } from "@/components/pages/workshops-page-content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateSitePageMetadata("workshops", locale as Language)
}

export default function LocaleWorkshopsPage() {
  return <WorkshopsPageContent />
}
