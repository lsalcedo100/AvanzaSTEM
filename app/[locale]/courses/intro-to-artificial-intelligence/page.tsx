import type { Metadata } from "next"

import { IntroToAiCourseContent } from "@/components/pages/intro-to-ai/course-content"
import { generateIntroToAiMetadata } from "@/features/curriculums/metadata"
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
  return generateIntroToAiMetadata(locale as Language)
}

export default function LocaleIntroToAiPage() {
  return <IntroToAiCourseContent />
}
