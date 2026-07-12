import type { Metadata } from "next"
import { IntroToAiCompletionContent } from "@/components/pages/intro-to-ai/completion-content"
import { generateIntroToAiCompletionMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateIntroToAiCompletionMetadata()
}

export default function IntroToAiCompletionPage() {
  return <IntroToAiCompletionContent />
}
