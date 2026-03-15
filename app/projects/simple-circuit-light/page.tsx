import { notFound } from "next/navigation"
import { SimpleCircuitLightGuide } from "@/components/projects/simple-circuit-light-guide"
import { getProjectGuide } from "@/lib/project-guides"

export default function SimpleCircuitLightPage() {
  const project = getProjectGuide("simple-circuit-light")

  if (!project) {
    notFound()
  }

  return <SimpleCircuitLightGuide project={project} />
}
