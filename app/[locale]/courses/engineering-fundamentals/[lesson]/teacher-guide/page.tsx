import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EngineeringTeacherGuideContent } from "@/components/pages/engineering-teacher-guide-content"
import { generateEngineeringTeacherGuideMetadata } from "@/features/curriculums/metadata"
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
  const { lesson } = await params
  return generateEngineeringTeacherGuideMetadata(lesson)
}

export default async function LocaleEngineeringTeacherGuidePage({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>
}) {
  const { lesson } = await params
  if (!ENGINEERING_SLUGS.map(String).includes(lesson)) notFound()
  return <EngineeringTeacherGuideContent slug={lesson} />
}
