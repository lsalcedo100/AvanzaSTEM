import { notFound } from "next/navigation"
import { SimpleCircuitLightGuide } from "@/features/projects/components/simple-circuit-light-guide"
import { getProjectGuide } from "@/features/projects/data"

export default function SimpleCircuitLightPage() {
  const project = getProjectGuide("simple-circuit-light")

  if (!project) {
    notFound()
  }

  return <SimpleCircuitLightGuide project={project} />
}
