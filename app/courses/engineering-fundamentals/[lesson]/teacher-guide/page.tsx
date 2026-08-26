import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EngineeringTeacherGuideContent } from "@/components/pages/engineering-teacher-guide-content"
import {
  engineeringLessonSlugs,
  engineeringTeacherGuidePath,
  getEngineeringLesson,
} from "@/features/curriculums/engineering-fundamentals"
import { generateEngineeringTeacherGuideMetadata } from "@/features/curriculums/metadata"
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
  return generateEngineeringTeacherGuideMetadata(lesson)
}

export default async function EngineeringTeacherGuidePage({
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
      <CourseBreadcrumbJsonLd path={engineeringTeacherGuidePath(lesson)} leafName={`${data.title} teacher guide`} />
      <EngineeringTeacherGuideContent slug={lesson} />
    </>
  )
}
