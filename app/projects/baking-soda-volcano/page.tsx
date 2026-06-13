import { notFound } from "next/navigation"
import { BakingSodaVolcanoGuide } from "@/features/projects/components/baking-soda-volcano-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import {
  getProjectBreadcrumbJsonLd,
  getProjectFaqJsonLd,
  getProjectHowToJsonLd,
} from "@/features/projects/structured-data"

export async function generateMetadata() {
  return generateProjectMetadata("baking-soda-volcano")
}

export default function BakingSodaVolcanoPage() {
  const project = getProjectGuide("baking-soda-volcano")
  const howToJsonLd = getProjectHowToJsonLd("baking-soda-volcano")
  const faqJsonLd = getProjectFaqJsonLd("baking-soda-volcano")
  const breadcrumbJsonLd = getProjectBreadcrumbJsonLd("baking-soda-volcano")

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
      <BakingSodaVolcanoGuide project={project} />
    </>
  )
}
