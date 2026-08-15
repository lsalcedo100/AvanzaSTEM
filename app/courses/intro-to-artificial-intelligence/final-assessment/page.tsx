import type { Metadata } from "next"
import { IntroToAiFinalAssessmentContent } from "@/components/pages/intro-to-ai/mission-content"
import { generateIntroToAiFinalAssessmentMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"
import { introToAiFinalAssessmentPath } from "@/features/curriculums/intro-to-ai"

export function generateMetadata(): Metadata {
  return generateIntroToAiFinalAssessmentMetadata()
}

export default function IntroToAiFinalAssessmentPage() {
  return (
    <>
      <CourseBreadcrumbJsonLd path={introToAiFinalAssessmentPath} leafName={"Final assessment"} />
      <IntroToAiFinalAssessmentContent />
    </>
  )
}
