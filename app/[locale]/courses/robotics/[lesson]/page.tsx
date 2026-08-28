import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { RoboticsLessonContent } from "@/components/pages/robotics-lesson-content"
import { generateRoboticsLessonMetadata } from "@/features/curriculums/metadata"
import { roboticsCurriculum } from "@/features/curriculums/robotics"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const ROBOTICS_SLUGS = roboticsCurriculum.modules.map((module) => module.slug)

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.flatMap((locale) =>
    ROBOTICS_SLUGS.map((value) => ({ locale, lesson: String(value) })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>
}): Promise<Metadata> {
  const { lesson } = await params
  return generateRoboticsLessonMetadata(lesson)
}

export default async function LocaleRoboticsLessonPage({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>
}) {
  const { lesson } = await params
  if (!ROBOTICS_SLUGS.map(String).includes(lesson)) notFound()
  return <RoboticsLessonContent slug={lesson} />
}
