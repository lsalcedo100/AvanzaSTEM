import { notFound } from "next/navigation"
import { LegoRobotGuide } from "@/components/projects/lego-robot-guide"
import { getProjectGuide } from "@/lib/project-guides"

export default function LegoRobotBuilderPage() {
  const project = getProjectGuide("lego-robot-builder")

  if (!project) {
    notFound()
  }

  return <LegoRobotGuide project={project} />
}
