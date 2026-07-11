import type { Metadata } from "next"
import { EngineeringFundamentalsContent } from "@/components/pages/engineering-fundamentals-content"
import { generateEngineeringFundamentalsMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateEngineeringFundamentalsMetadata()
}

export default function EngineeringFundamentalsPage() {
  return <EngineeringFundamentalsContent />
}
