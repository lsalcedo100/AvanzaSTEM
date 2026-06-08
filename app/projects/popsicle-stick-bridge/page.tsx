import { notFound } from "next/navigation"
import { PopsicleStickBridgeGuide } from "@/features/projects/components/popsicle-stick-bridge-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"

export async function generateMetadata() {
  return generateProjectMetadata("popsicle-stick-bridge")
}

export default function PopsicleStickBridgePage() {
  const project = getProjectGuide("popsicle-stick-bridge")

  if (!project) {
    notFound()
  }

  return <PopsicleStickBridgeGuide project={project} />
}
