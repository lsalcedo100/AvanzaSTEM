import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IntroToAiLessonContent } from "@/components/pages/intro-to-ai/lesson-content"
import { allLessonParams, getLesson } from "@/features/curriculums/intro-to-ai"
import { generateIntroToAiLessonMetadata } from "@/features/curriculums/metadata"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.flatMap((locale) =>
    allLessonParams().map((entry) => ({ locale, ...entry })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; week: string; lesson: string }>
}): Promise<Metadata> {
  const { week, lesson } = await params
  return generateIntroToAiLessonMetadata(Number(week), lesson)
}

export default async function LocaleIntroToAiLessonPage({
  params,
}: {
  params: Promise<{ locale: string; week: string; lesson: string }>
}) {
  const { week, lesson } = await params
  if (!getLesson(Number(week), lesson)) notFound()
  return <IntroToAiLessonContent week={Number(week)} slug={lesson} />
}
