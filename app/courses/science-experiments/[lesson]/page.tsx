import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ScienceExperimentsLessonContent } from "@/components/pages/science-experiments-lesson-content"
import {
  getScienceLesson,
  scienceLessonPath,
  scienceLessonSlugs,
} from "@/features/curriculums/science-experiments"
import { generateScienceLessonMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"

export const dynamicParams = false

export function generateStaticParams() {
  return scienceLessonSlugs().map((lesson) => ({ lesson }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lesson: string }>
}): Promise<Metadata> {
  const { lesson } = await params
  return generateScienceLessonMetadata(lesson)
}

export default async function ScienceExperimentsLessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>
}) {
  const { lesson } = await params
  const data = getScienceLesson(lesson)

  if (!data) {
    notFound()
  }

  return (
    <>
      <CourseBreadcrumbJsonLd path={scienceLessonPath(lesson)} leafName={data.title} />
      <ScienceExperimentsLessonContent lesson={data} />
    </>
  )
}
