import { notFound } from "next/navigation"
import { LemonPoweredBatteriesGuide } from "@/features/projects/components/lemon-powered-batteries-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import {
  getProjectBreadcrumbJsonLd,
  getProjectHowToJsonLd,
} from "@/features/projects/structured-data"

export async function generateMetadata() {
  return generateProjectMetadata("lemon-powered-batteries")
}

export default function LemonPoweredBatteriesPage() {
  const project = getProjectGuide("lemon-powered-batteries")
  const howToJsonLd = getProjectHowToJsonLd("lemon-powered-batteries")
  const breadcrumbJsonLd = getProjectBreadcrumbJsonLd("lemon-powered-batteries")

  if (!project) {
    notFound()
  }

  return (
    <>
      {howToJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      ) : null}
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
      <LemonPoweredBatteriesGuide project={project} />
    </>
  )
}
