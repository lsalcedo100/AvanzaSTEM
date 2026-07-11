import type { Metadata } from "next"
import { ScienceExperimentsContent } from "@/components/pages/science-experiments-content"
import { generateScienceExperimentsMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateScienceExperimentsMetadata()
}

export default function ScienceExperimentsPage() {
  return <ScienceExperimentsContent />
}
