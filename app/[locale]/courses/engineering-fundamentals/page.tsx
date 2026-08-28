import type { Metadata } from "next"

import { EngineeringFundamentalsContent } from "@/components/pages/engineering-fundamentals-content"
import { generateEngineeringFundamentalsMetadata } from "@/features/curriculums/metadata"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateEngineeringFundamentalsMetadata(locale as Language)
}

export default function LocaleEngineeringFundamentalsPage() {
  return <EngineeringFundamentalsContent />
}
