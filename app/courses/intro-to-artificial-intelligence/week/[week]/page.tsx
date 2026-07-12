import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { IntroToAiWeekContent } from "@/components/pages/intro-to-ai/week-content"
import { getWeek, weekParams } from "@/features/curriculums/intro-to-ai"
import { generateIntroToAiWeekMetadata } from "@/features/curriculums/metadata"

export const dynamicParams = false

export function generateStaticParams() {
  return weekParams()
}

export async function generateMetadata({ params }: { params: Promise<{ week: string }> }): Promise<Metadata> {
  const { week } = await params
  return generateIntroToAiWeekMetadata(Number(week))
}

export default async function IntroToAiWeekPage({ params }: { params: Promise<{ week: string }> }) {
  const { week } = await params
  const courseWeek = getWeek(Number(week))
  if (!courseWeek) notFound()
  return <IntroToAiWeekContent week={courseWeek} />
}
