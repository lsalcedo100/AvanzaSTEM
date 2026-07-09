import type { Metadata } from "next"
import { IntroToPythonWorksheetsContent } from "@/components/pages/intro-to-python-worksheets-content"
import { generateIntroToPythonWorksheetsMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateIntroToPythonWorksheetsMetadata()
}

export default function IntroToPythonWorksheetsPage() {
  return <IntroToPythonWorksheetsContent />
}
