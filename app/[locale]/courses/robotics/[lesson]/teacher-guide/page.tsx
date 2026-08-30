import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { RoboticsTeacherGuideContent } from "@/components/pages/robotics-teacher-guide-content"
import { generateRoboticsTeacherGuideMetadata } from "@/features/curriculums/metadata"
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
  const { locale, lesson } = await params
  return generateRoboticsTeacherGuideMetadata(lesson, locale as Language)
}

export default async function LocaleRoboticsTeacherGuidePage({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>
}) {
  const { lesson } = await params
  if (!ROBOTICS_SLUGS.map(String).includes(lesson)) notFound()
  return <RoboticsTeacherGuideContent slug={lesson} />
}
