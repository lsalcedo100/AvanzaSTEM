import type { Metadata } from "next"
import { MathAdventuresContent } from "@/components/pages/math-adventures-content"
import { generateMathAdventuresMetadata } from "@/features/curriculums/metadata"
import { mathAdventuresPath } from "@/features/curriculums/math-adventures"
import {
  getCourseBreadcrumbJsonLd,
  getCourseJsonLd,
} from "@/features/curriculums/structured-data"

export function generateMetadata(): Metadata {
  return generateMathAdventuresMetadata()
}

const courseJsonLd = getCourseJsonLd(mathAdventuresPath)
const breadcrumbJsonLd = getCourseBreadcrumbJsonLd(mathAdventuresPath)

export default function MathAdventuresPage() {
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
      <MathAdventuresContent />
    </>
  )
}
