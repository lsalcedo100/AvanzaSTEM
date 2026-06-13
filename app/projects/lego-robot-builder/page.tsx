import { notFound } from "next/navigation"
import { LegoRobotGuide } from "@/features/projects/components/lego-robot-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import { getProjectHowToJsonLd } from "@/features/projects/structured-data"

export async function generateMetadata() {
  return generateProjectMetadata("lego-robot-builder")
}

export default function LegoRobotBuilderPage() {
  const project = getProjectGuide("lego-robot-builder")
  const howToJsonLd = getProjectHowToJsonLd("lego-robot-builder")

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
      <LegoRobotGuide project={project} />
    </>
  )
}
