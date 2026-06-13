import { notFound } from "next/navigation"
import { SimpleCircuitLightGuide } from "@/features/projects/components/simple-circuit-light-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import { getProjectHowToJsonLd } from "@/features/projects/structured-data"

export async function generateMetadata() {
  return generateProjectMetadata("simple-circuit-light")
}

export default function SimpleCircuitLightPage() {
  const project = getProjectGuide("simple-circuit-light")
  const howToJsonLd = getProjectHowToJsonLd("simple-circuit-light")

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
      <SimpleCircuitLightGuide project={project} />
    </>
  )
}
