import type { Metadata } from "next"

import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { PrivacyPageContent } from "@/components/pages/privacy-page-content"

export function generateMetadata(): Metadata {
  return generateSitePageMetadata("privacy", "en")
}

export default function PrivacyPage() {
  return <PrivacyPageContent />
}
