import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EngineeringFundamentalsLessonContent } from "@/components/pages/engineering-fundamentals-lesson-content"
import { generateEngineeringLessonMetadata } from "@/features/curriculums/metadata"
import { engineeringFundamentalsCurriculum } from "@/features/curriculums/engineering-fundamentals"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const ENGINEERING_SLUGS = engineeringFundamentalsCurriculum.lessons.map((lesson) => lesson.slug)

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.flatMap((locale) =>
    ENGINEERING_SLUGS.map((value) => ({ locale, lesson: String(value) })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>
}): Promise<Metadata> {
  const { locale, lesson } = await params
  return generateEngineeringLessonMetadata(lesson, locale as Language)
}

export default async function LocaleEngineeringLessonPage({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>
}) {
  const { lesson } = await params
  if (!ENGINEERING_SLUGS.map(String).includes(lesson)) notFound()
  return <EngineeringFundamentalsLessonContent slug={lesson} />
}
