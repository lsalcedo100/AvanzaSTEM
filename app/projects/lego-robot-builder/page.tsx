import { notFound } from "next/navigation"
import { LegoRobotGuide } from "@/features/projects/components/lego-robot-guide"
import { getProjectGuide } from "@/features/projects/data"

export default function LegoRobotBuilderPage() {
  const project = getProjectGuide("lego-robot-builder")

  if (!project) {
    notFound()
  }

  return <LegoRobotGuide project={project} />
}
