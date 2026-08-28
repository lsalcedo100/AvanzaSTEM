import type { Metadata } from "next"

import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { HostPageContent } from "@/components/pages/host-page-content"

export function generateMetadata(): Metadata {
  return generateSitePageMetadata("host", "en")
}

export default function HostPage() {
  return <HostPageContent />
}
