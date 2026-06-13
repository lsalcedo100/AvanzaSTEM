import { notFound } from "next/navigation"
import { PopsicleStickBridgeGuide } from "@/features/projects/components/popsicle-stick-bridge-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import {
  getProjectBreadcrumbJsonLd,
  getProjectFaqJsonLd,
  getProjectHowToJsonLd,
} from "@/features/projects/structured-data"

export async function generateMetadata() {
  return generateProjectMetadata("popsicle-stick-bridge")
}

export default function PopsicleStickBridgePage() {
  const project = getProjectGuide("popsicle-stick-bridge")
  const howToJsonLd = getProjectHowToJsonLd("popsicle-stick-bridge")
  const faqJsonLd = getProjectFaqJsonLd("popsicle-stick-bridge")
  const breadcrumbJsonLd = getProjectBreadcrumbJsonLd("popsicle-stick-bridge")

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
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
      <PopsicleStickBridgeGuide project={project} />
    </>
  )
}
