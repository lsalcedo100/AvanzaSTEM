import { notFound } from "next/navigation"
import { BalloonPoweredCarGuide } from "@/features/projects/components/balloon-powered-car-guide"
import { getProjectGuide } from "@/features/projects/data"

export default function BalloonPoweredCarPage() {
  const project = getProjectGuide("balloon-powered-car")

  if (!project) {
    notFound()
  }

  return <BalloonPoweredCarGuide project={project} />
}
