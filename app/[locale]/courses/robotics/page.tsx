import type { Metadata } from "next"

import { RoboticsCourseContent } from "@/components/pages/robotics-course-content"
import { generateRoboticsMetadata } from "@/features/curriculums/metadata"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.map((locale) => ({ locale }))
}

export function generateMetadata(): Metadata {
  return generateRoboticsMetadata()
}

export default function LocaleRoboticsPage() {
  return <RoboticsCourseContent />
}
