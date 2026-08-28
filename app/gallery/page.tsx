import type { Metadata } from "next"

import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { GalleryPageContent } from "@/components/pages/gallery-page-content"

export function generateMetadata(): Metadata {
  return generateSitePageMetadata("gallery", "en")
}

export default function GalleryPage() {
  return <GalleryPageContent />
}
