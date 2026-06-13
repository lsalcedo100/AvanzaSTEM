import { notFound } from "next/navigation"
import { BalloonPoweredCarGuide } from "@/features/projects/components/balloon-powered-car-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import { getProjectHowToJsonLd } from "@/features/projects/structured-data"

export async function generateMetadata() {
  return generateProjectMetadata("balloon-powered-car")
}

export default function BalloonPoweredCarPage() {
  const project = getProjectGuide("balloon-powered-car")
  const howToJsonLd = getProjectHowToJsonLd("balloon-powered-car")

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
      <BalloonPoweredCarGuide project={project} />
    </>
  )
}
