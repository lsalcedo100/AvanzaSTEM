import type { Metadata } from "next"
import { IntroToAiFinalProjectContent } from "@/components/pages/intro-to-ai/final-project-studio"
import { generateIntroToAiFinalProjectMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateIntroToAiFinalProjectMetadata()
}

export default function IntroToAiFinalProjectPage() {
  return <IntroToAiFinalProjectContent />
}
