import { notFound } from "next/navigation"
import { SimpleCircuitLightGuide } from "@/features/projects/components/simple-circuit-light-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import {
  getProjectBreadcrumbJsonLd,
  getProjectHowToJsonLd,
} from "@/features/projects/structured-data"

export async function generateMetadata() {
  return generateProjectMetadata("simple-circuit-light")
}

export default function SimpleCircuitLightPage() {
  const project = getProjectGuide("simple-circuit-light")
  const howToJsonLd = getProjectHowToJsonLd("simple-circuit-light")
  const breadcrumbJsonLd = getProjectBreadcrumbJsonLd("simple-circuit-light")

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
      <SimpleCircuitLightGuide project={project} />
    </>
  )
}
