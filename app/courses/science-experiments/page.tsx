import type { Metadata } from "next"
import { ScienceExperimentsContent } from "@/components/pages/science-experiments-content"
import { generateScienceExperimentsMetadata } from "@/features/curriculums/metadata"
import { scienceExperimentsPath } from "@/features/curriculums/science-experiments"
import {
  getCourseBreadcrumbJsonLd,
  getCourseJsonLd,
} from "@/features/curriculums/structured-data"

export function generateMetadata(): Metadata {
  return generateScienceExperimentsMetadata()
}

const courseJsonLd = getCourseJsonLd(scienceExperimentsPath)
const breadcrumbJsonLd = getCourseBreadcrumbJsonLd(scienceExperimentsPath)

export default function ScienceExperimentsPage() {
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
      <ScienceExperimentsContent />
    </>
  )
}
