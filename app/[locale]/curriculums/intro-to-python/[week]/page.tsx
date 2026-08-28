import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IntroToPythonLessonContent } from "@/components/pages/intro-to-python-lesson-content"
import {
  getIntroToPythonWeek,
  introToPythonCurriculum,
  introToPythonWeekSlug,
  parseIntroToPythonWeekSlug,
} from "@/features/curriculums/intro-to-python"
import { generateIntroToPythonWeekMetadata } from "@/features/curriculums/metadata"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.flatMap((locale) =>
    introToPythonCurriculum.weeks.map((entry) => ({
      locale,
      week: introToPythonWeekSlug(entry.week),
    })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; week: string }>
}): Promise<Metadata> {
  const { locale, week } = await params
  const weekNumber = parseIntroToPythonWeekSlug(week)
  if (weekNumber === null) {
    return { title: "Lesson not found | Avanza STEM" }
  }
  return generateIntroToPythonWeekMetadata(weekNumber, locale as Language)
}

export default async function LocaleIntroToPythonWeekPage({
  params,
}: {
  params: Promise<{ locale: string; week: string }>
}) {
  const { week } = await params
  const weekNumber = parseIntroToPythonWeekSlug(week)
  const lesson = weekNumber === null ? undefined : getIntroToPythonWeek(weekNumber)

  if (!lesson) {
    notFound()
  }

  return <IntroToPythonLessonContent weekNumber={lesson.week} />
}
