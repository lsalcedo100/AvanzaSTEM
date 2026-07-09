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

export const dynamicParams = false

export function generateStaticParams() {
  return introToPythonCurriculum.weeks.map((w) => ({ week: introToPythonWeekSlug(w.week) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string }>
}): Promise<Metadata> {
  const { week } = await params
  const weekNumber = parseIntroToPythonWeekSlug(week)
  if (weekNumber === null) {
    return { title: "Lesson not found | Avanza STEM" }
  }
  return generateIntroToPythonWeekMetadata(weekNumber)
}

export default async function IntroToPythonLessonPage({
  params,
}: {
  params: Promise<{ week: string }>
}) {
  const { week } = await params
  const weekNumber = parseIntroToPythonWeekSlug(week)
  const lesson = weekNumber === null ? undefined : getIntroToPythonWeek(weekNumber)

  if (!lesson) {
    notFound()
  }

  return <IntroToPythonLessonContent week={lesson} />
}
