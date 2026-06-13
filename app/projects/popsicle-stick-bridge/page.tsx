import { notFound } from "next/navigation"
import { PopsicleStickBridgeGuide } from "@/features/projects/components/popsicle-stick-bridge-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import { getProjectHowToJsonLd } from "@/features/projects/structured-data"

export async function generateMetadata() {
  return generateProjectMetadata("popsicle-stick-bridge")
}

export default function PopsicleStickBridgePage() {
  const project = getProjectGuide("popsicle-stick-bridge")
  const howToJsonLd = getProjectHowToJsonLd("popsicle-stick-bridge")

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
      <PopsicleStickBridgeGuide project={project} />
    </>
  )
}
