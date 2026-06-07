import { notFound } from "next/navigation"
import { LemonPoweredBatteriesGuide } from "@/features/projects/components/lemon-powered-batteries-guide"
import { getProjectGuide } from "@/features/projects/data"

export default function LemonPoweredBatteriesPage() {
  const project = getProjectGuide("lemon-powered-batteries")

  if (!project) {
    notFound()
  }

  return <LemonPoweredBatteriesGuide project={project} />
}
