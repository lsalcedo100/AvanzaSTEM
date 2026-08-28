import type { Metadata } from "next"

import type { Language } from "@/i18n/translations"
import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { PythonIdePageContent } from "@/components/pages/python-ide-page-content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateSitePageMetadata("pythonIde", locale as Language)
}

export default function LocalePythonIdePage() {
  return <PythonIdePageContent />
}
