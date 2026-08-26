import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MathAdventuresLessonContent } from "@/components/pages/math-adventures-lesson-content"
import { MathFinalProjectContent } from "@/components/pages/math-final-project-content"
import { getMathLessonBySlug, mathLessonPath, mathLessonSlugs } from "@/features/curriculums/math-adventures"
import { generateMathLessonMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"

export const dynamicParams = false

export function generateStaticParams() {
  return mathLessonSlugs().map((lesson) => ({ lesson }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lesson: string }>
}): Promise<Metadata> {
  const { lesson } = await params
  return generateMathLessonMetadata(lesson)
}

export default async function MathAdventuresLessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>
}) {
  const { lesson } = await params
  const data = getMathLessonBySlug(lesson)

  if (!data) {
    notFound()
  }

  if (data.isFinalProject) {
    return <MathFinalProjectContent slug={lesson} />
  }

  return (
    <>
      <CourseBreadcrumbJsonLd path={mathLessonPath(lesson)} leafName={data.title} />
      <MathAdventuresLessonContent slug={lesson} />
    </>
  )
}
