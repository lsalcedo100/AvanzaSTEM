import type { Metadata } from "next"

import type { Language } from "@/i18n/translations"
import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { HostPageContent } from "@/components/pages/host-page-content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateSitePageMetadata("host", locale as Language)
}

export default function LocaleHostPage() {
  return <HostPageContent />
}
