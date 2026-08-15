import type { Metadata } from "next"
import { IntroToAiCompletionContent } from "@/components/pages/intro-to-ai/completion-content"
import { generateIntroToAiCompletionMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"
import { introToAiCompletionPath } from "@/features/curriculums/intro-to-ai"

export function generateMetadata(): Metadata {
  return generateIntroToAiCompletionMetadata()
}

export default function IntroToAiCompletionPage() {
  return (
    <>
      <CourseBreadcrumbJsonLd path={introToAiCompletionPath} leafName={"Course completion"} />
      <IntroToAiCompletionContent />
    </>
  )
}
