import type { Metadata } from "next"
import { IntroToAiCourseContent } from "@/components/pages/intro-to-ai/course-content"
import { generateIntroToAiMetadata } from "@/features/curriculums/metadata"
import { introToAiPath } from "@/features/curriculums/intro-to-ai"
import {
  getCourseBreadcrumbJsonLd,
  getCourseJsonLd,
} from "@/features/curriculums/structured-data"

export function generateMetadata(): Metadata {
  return generateIntroToAiMetadata()
}

const courseJsonLd = getCourseJsonLd(introToAiPath)
const breadcrumbJsonLd = getCourseBreadcrumbJsonLd(introToAiPath)

export default function IntroToAiCoursePage() {
  return (
    <>
      {courseJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
      ) : null}
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
      <IntroToAiCourseContent />
    </>
  )
}
