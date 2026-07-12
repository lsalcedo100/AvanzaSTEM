import type { Metadata } from "next"
import { IntroToAiFinalAssessmentContent } from "@/components/pages/intro-to-ai/mission-content"
import { generateIntroToAiFinalAssessmentMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateIntroToAiFinalAssessmentMetadata()
}

export default function IntroToAiFinalAssessmentPage() {
  return <IntroToAiFinalAssessmentContent />
}
