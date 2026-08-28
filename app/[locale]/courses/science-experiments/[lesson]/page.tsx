import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ScienceExperimentsLessonContent } from "@/components/pages/science-experiments-lesson-content"
import { generateScienceLessonMetadata } from "@/features/curriculums/metadata"
import { scienceLessonSlugs } from "@/features/curriculums/science-experiments"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.flatMap((locale) =>
    scienceLessonSlugs().map((value) => ({ locale, lesson: String(value) })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>
}): Promise<Metadata> {
  const { locale, lesson } = await params
  return generateScienceLessonMetadata(lesson, locale as Language)
}

export default async function LocaleScienceLessonPage({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>
}) {
  const { lesson } = await params
  if (!scienceLessonSlugs().map(String).includes(lesson)) notFound()
  return <ScienceExperimentsLessonContent slug={lesson} />
}
