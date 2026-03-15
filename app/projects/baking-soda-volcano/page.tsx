import { notFound } from "next/navigation"
import { BakingSodaVolcanoGuide } from "@/components/projects/baking-soda-volcano-guide"
import { getProjectGuide } from "@/lib/project-guides"

export default function BakingSodaVolcanoPage() {
  const project = getProjectGuide("baking-soda-volcano")

  if (!project) {
    notFound()
  }

  return <BakingSodaVolcanoGuide project={project} />
}
