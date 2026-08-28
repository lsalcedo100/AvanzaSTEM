import type { Metadata } from "next"

import type { Language } from "@/i18n/translations"
import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { PrivacyPageContent } from "@/components/pages/privacy-page-content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateSitePageMetadata("privacy", locale as Language)
}

export default function LocalePrivacyPage() {
  return <PrivacyPageContent />
}
