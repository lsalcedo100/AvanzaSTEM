import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EngineeringWorksheetContent } from "@/components/pages/engineering-worksheet-content"
import {
  engineeringLessonSlugs,
  engineeringWorksheetPath,
  getEngineeringLesson,
} from "@/features/curriculums/engineering-fundamentals"
import { generateEngineeringWorksheetMetadata } from "@/features/curriculums/metadata"
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
  return generateEngineeringWorksheetMetadata(lesson)
}

export default async function EngineeringWorksheetPage({
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
      <CourseBreadcrumbJsonLd path={engineeringWorksheetPath(lesson)} leafName={`${data.title} worksheet`} />
      <EngineeringWorksheetContent slug={lesson} />
    </>
  )
}
