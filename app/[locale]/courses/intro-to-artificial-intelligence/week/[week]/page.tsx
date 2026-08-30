import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IntroToAiWeekContent } from "@/components/pages/intro-to-ai/week-content"
import { getWeek, weekParams } from "@/features/curriculums/intro-to-ai"
import { generateIntroToAiWeekMetadata } from "@/features/curriculums/metadata"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.flatMap((locale) =>
    weekParams().map(({ week }) => ({ locale, week })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; week: string }>
}): Promise<Metadata> {
  const { locale, week } = await params
  return generateIntroToAiWeekMetadata(Number(week), locale as Language)
}

export default async function LocaleIntroToAiWeekPage({
  params,
}: {
  params: Promise<{ locale: string; week: string }>
}) {
  const { week } = await params
  const courseWeek = getWeek(Number(week))
  if (!courseWeek) notFound()
  return <IntroToAiWeekContent weekNumber={courseWeek.week} />
}
