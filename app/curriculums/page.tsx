import type { Metadata } from "next"
import { CurriculumsPageContent } from "@/components/pages/curriculums-page-content"
import { generateCurriculumsMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateCurriculumsMetadata("en")
}

export default function CurriculumsPage() {
  return <CurriculumsPageContent />
}
