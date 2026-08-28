import type { Metadata } from "next"

import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { WorkshopsPageContent } from "@/components/pages/workshops-page-content"

export function generateMetadata(): Metadata {
  return generateSitePageMetadata("workshops", "en")
}

export default function WorkshopsPage() {
  return <WorkshopsPageContent />
}
