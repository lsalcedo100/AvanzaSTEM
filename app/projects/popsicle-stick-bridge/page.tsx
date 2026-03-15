import { notFound } from "next/navigation"
import { PopsicleStickBridgeGuide } from "@/components/projects/popsicle-stick-bridge-guide"
import { getProjectGuide } from "@/lib/project-guides"

export default function PopsicleStickBridgePage() {
  const project = getProjectGuide("popsicle-stick-bridge")

  if (!project) {
    notFound()
  }

  return <PopsicleStickBridgeGuide project={project} />
}
