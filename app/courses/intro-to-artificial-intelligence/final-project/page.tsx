import type { Metadata } from "next"
import { IntroToAiFinalProjectContent } from "@/components/pages/intro-to-ai/final-project-studio"
import { generateIntroToAiFinalProjectMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"
import { introToAiFinalProjectPath } from "@/features/curriculums/intro-to-ai"

export function generateMetadata(): Metadata {
  return generateIntroToAiFinalProjectMetadata()
}

export default function IntroToAiFinalProjectPage() {
  return (
    <>
      <CourseBreadcrumbJsonLd path={introToAiFinalProjectPath} leafName={"Final project"} />
      <IntroToAiFinalProjectContent />
    </>
  )
}
