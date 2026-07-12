import type { Metadata } from "next"
import { IntroToAiCourseContent } from "@/components/pages/intro-to-ai/course-content"
import { generateIntroToAiMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateIntroToAiMetadata()
}

export default function IntroToAiCoursePage() {
  return <IntroToAiCourseContent />
}
