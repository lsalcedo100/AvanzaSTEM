import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EngineeringFundamentalsLessonContent } from "@/components/pages/engineering-fundamentals-lesson-content"
import {
  engineeringLessonPath,
  engineeringLessonSlugs,
  getEngineeringLesson,
} from "@/features/curriculums/engineering-fundamentals"
import { generateEngineeringLessonMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"

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

  return (
    <>
      <CourseBreadcrumbJsonLd path={engineeringLessonPath(lesson)} leafName={data.title} />
      <EngineeringFundamentalsLessonContent slug={lesson} />
    </>
  )
}
