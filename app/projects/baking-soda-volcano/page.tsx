import { notFound } from "next/navigation"
import { BakingSodaVolcanoGuide } from "@/features/projects/components/baking-soda-volcano-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"

export async function generateMetadata() {
  return generateProjectMetadata("baking-soda-volcano")
}

export default function BakingSodaVolcanoPage() {
  const project = getProjectGuide("baking-soda-volcano")

  if (!project) {
    notFound()
  }

  return <BakingSodaVolcanoGuide project={project} />
}
