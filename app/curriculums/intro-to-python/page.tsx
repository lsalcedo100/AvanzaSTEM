import type { Metadata } from "next"
import { IntroToPythonCurriculumContent } from "@/components/pages/intro-to-python-curriculum-content"
import { generateIntroToPythonMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateIntroToPythonMetadata()
}

export default function IntroToPythonCurriculumPage() {
  return <IntroToPythonCurriculumContent />
}
