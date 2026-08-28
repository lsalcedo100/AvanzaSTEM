import type { Metadata } from "next"

import { IntroToPythonWorksheetsContent } from "@/components/pages/intro-to-python-worksheets-content"
import { generateIntroToPythonWorksheetsMetadata } from "@/features/curriculums/metadata"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.map((locale) => ({ locale }))
}

export function generateMetadata(): Metadata {
  return generateIntroToPythonWorksheetsMetadata()
}

export default function LocaleIntroToPythonWorksheetsPage() {
  return <IntroToPythonWorksheetsContent />
}
