import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { MathAdventuresLessonContent } from "@/components/pages/math-adventures-lesson-content"
import { generateMathLessonMetadata } from "@/features/curriculums/metadata"
import { mathAdventuresCurriculum } from "@/features/curriculums/math-adventures"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const MATH_SLUGS = mathAdventuresCurriculum.lessons.map((lesson) => lesson.slug)

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.flatMap((locale) =>
    MATH_SLUGS.map((value) => ({ locale, lesson: String(value) })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>
}): Promise<Metadata> {
  const { lesson } = await params
  return generateMathLessonMetadata(lesson)
}

export default async function LocaleMathLessonPage({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>
}) {
  const { lesson } = await params
  if (!MATH_SLUGS.map(String).includes(lesson)) notFound()
  return <MathAdventuresLessonContent slug={lesson} />
}
