import type { Metadata } from "next"
import { IntroToPythonCurriculumContent } from "@/components/pages/intro-to-python-curriculum-content"
import { generateIntroToPythonMetadata } from "@/features/curriculums/metadata"
import { introToPythonPath } from "@/features/curriculums/intro-to-python"
import {
  getCourseBreadcrumbJsonLd,
  getCourseJsonLd,
} from "@/features/curriculums/structured-data"

export function generateMetadata(): Metadata {
  return generateIntroToPythonMetadata()
}

const courseJsonLd = getCourseJsonLd(introToPythonPath)
const breadcrumbJsonLd = getCourseBreadcrumbJsonLd(introToPythonPath)

export default function IntroToPythonCurriculumPage() {
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
      <IntroToPythonCurriculumContent />
    </>
  )
}
