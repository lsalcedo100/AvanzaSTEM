import type { Metadata } from "next"

import { MathAdventuresContent } from "@/components/pages/math-adventures-content"
import { generateMathAdventuresMetadata } from "@/features/curriculums/metadata"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.map((locale) => ({ locale }))
}

export function generateMetadata(): Metadata {
  return generateMathAdventuresMetadata()
}

export default function LocaleMathAdventuresPage() {
  return <MathAdventuresContent />
}
