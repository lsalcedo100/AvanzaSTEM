import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { IntroToAiLessonContent } from "@/components/pages/intro-to-ai/lesson-content"
import { allLessonParams, getLesson, introToAiLessonPath } from "@/features/curriculums/intro-to-ai"
import { generateIntroToAiLessonMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"

export const dynamicParams = false

export function generateStaticParams() {
  return allLessonParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string; lesson: string }>
}): Promise<Metadata> {
  const { week, lesson } = await params
  return generateIntroToAiLessonMetadata(Number(week), lesson)
}

export default async function IntroToAiLessonPage({
  params,
}: {
  params: Promise<{ week: string; lesson: string }>
}) {
  const { week, lesson } = await params
  const weekNum = Number(week)
  const found = getLesson(weekNum, lesson)
  if (!found) notFound()
  return (
    <>
      <CourseBreadcrumbJsonLd path={introToAiLessonPath(weekNum, lesson)} leafName={found.title} />
      <IntroToAiLessonContent week={weekNum} lesson={found} />
    </>
  )
}
