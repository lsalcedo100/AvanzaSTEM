import { notFound } from "next/navigation"
import { BakingSodaVolcanoGuide } from "@/features/projects/components/baking-soda-volcano-guide"
import { getProjectGuide } from "@/features/projects/data"

export default function BakingSodaVolcanoPage() {
  const project = getProjectGuide("baking-soda-volcano")

  if (!project) {
    notFound()
  }

  return <BakingSodaVolcanoGuide project={project} />
}
