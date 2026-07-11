import type { Metadata } from "next"
import { MathAdventuresContent } from "@/components/pages/math-adventures-content"
import { generateMathAdventuresMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateMathAdventuresMetadata()
}

export default function MathAdventuresPage() {
  return <MathAdventuresContent />
}
