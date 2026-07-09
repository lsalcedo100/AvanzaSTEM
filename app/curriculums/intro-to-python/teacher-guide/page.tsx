import type { Metadata } from "next"
import { IntroToPythonTeacherGuideContent } from "@/components/pages/intro-to-python-teacher-guide-content"
import { generateIntroToPythonTeacherGuideMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateIntroToPythonTeacherGuideMetadata()
}

export default function IntroToPythonTeacherGuidePage() {
  return <IntroToPythonTeacherGuideContent />
}
