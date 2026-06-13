import type { Metadata } from "next"
import { CurriculumsPageContent } from "@/components/pages/curriculums-page-content"
import { generateCurriculumsMetadata } from "@/features/curriculums/metadata"
import type { Language } from "@/i18n/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateCurriculumsMetadata(locale as Language)
}

export default function LocaleCurriculumsPage() {
  return <CurriculumsPageContent />
}
