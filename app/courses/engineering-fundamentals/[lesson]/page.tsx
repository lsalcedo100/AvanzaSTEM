import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EngineeringFundamentalsLessonContent } from "@/components/pages/engineering-fundamentals-lesson-content"
import {
  engineeringLessonSlugs,
  getEngineeringLesson,
} from "@/features/curriculums/engineering-fundamentals"
import { generateEngineeringLessonMetadata } from "@/features/curriculums/metadata"

export const dynamicParams = false

export function generateStaticParams() {
  return engineeringLessonSlugs().map((lesson) => ({ lesson }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lesson: string }>
}): Promise<Metadata> {
  const { lesson } = await params
  return generateEngineeringLessonMetadata(lesson)
}

export default async function EngineeringFundamentalsLessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>
}) {
  const { lesson } = await params
  const data = getEngineeringLesson(lesson)

  if (!data) {
    notFound()
  }

  return <EngineeringFundamentalsLessonContent lesson={data} />
}
