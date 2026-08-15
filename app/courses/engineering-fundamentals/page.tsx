import type { Metadata } from "next"
import { EngineeringFundamentalsContent } from "@/components/pages/engineering-fundamentals-content"
import { generateEngineeringFundamentalsMetadata } from "@/features/curriculums/metadata"
import { engineeringFundamentalsPath } from "@/features/curriculums/engineering-fundamentals"
import {
  getCourseBreadcrumbJsonLd,
  getCourseJsonLd,
} from "@/features/curriculums/structured-data"

export function generateMetadata(): Metadata {
  return generateEngineeringFundamentalsMetadata()
}

const courseJsonLd = getCourseJsonLd(engineeringFundamentalsPath)
const breadcrumbJsonLd = getCourseBreadcrumbJsonLd(engineeringFundamentalsPath)

export default function EngineeringFundamentalsPage() {
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
      <EngineeringFundamentalsContent />
    </>
  )
}
