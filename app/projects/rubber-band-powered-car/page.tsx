import { notFound } from "next/navigation"
import { RubberBandPoweredCarGuide } from "@/features/projects/components/rubber-band-powered-car-guide"
import { getProjectGuide } from "@/features/projects/data"

export default function RubberBandPoweredCarPage() {
  const project = getProjectGuide("rubber-band-powered-car")

  if (!project) {
    notFound()
  }

  return <RubberBandPoweredCarGuide project={project} />
}
