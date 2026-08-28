import type { Metadata } from "next"

import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { AboutPageContent } from "@/components/pages/about-page-content"

export function generateMetadata(): Metadata {
  return generateSitePageMetadata("about", "en")
}

export default function AboutPage() {
  return <AboutPageContent />
}
