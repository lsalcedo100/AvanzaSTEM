import type { Metadata } from "next"
import { GalleryPageContent } from "@/components/pages/gallery-page-content"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "STEM Workshop Photos | Avanza STEM",
  description: "Browse photos from Avanza STEM workshops and free hands-on programs for students.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "STEM Workshop Photos | Avanza STEM",
    description: "Browse photos from Avanza STEM workshops and free hands-on programs for students.",
    url: `${siteConfig.url}/gallery`,
    siteName: siteConfig.name,
    type: "website",
  },
}

export default function GalleryPage() {
  return <GalleryPageContent />
}
