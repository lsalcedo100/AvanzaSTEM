import { notFound } from "next/navigation"
import { RubberBandPoweredCarGuide } from "@/features/projects/components/rubber-band-powered-car-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"

export async function generateMetadata() {
  return generateProjectMetadata("rubber-band-powered-car")
}

export default function RubberBandPoweredCarPage() {
  const project = getProjectGuide("rubber-band-powered-car")

  if (!project) {
    notFound()
  }

  return <RubberBandPoweredCarGuide project={project} />
}
