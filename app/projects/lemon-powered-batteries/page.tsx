import { notFound } from "next/navigation"
import { LemonPoweredBatteriesGuide } from "@/features/projects/components/lemon-powered-batteries-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"

export async function generateMetadata() {
  return generateProjectMetadata("lemon-powered-batteries")
}

export default function LemonPoweredBatteriesPage() {
  const project = getProjectGuide("lemon-powered-batteries")

  if (!project) {
    notFound()
  }

  return <LemonPoweredBatteriesGuide project={project} />
}
