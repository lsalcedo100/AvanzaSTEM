import type { Metadata } from "next"
import { GalleryPageContent } from "@/components/pages/gallery-page-content"
import { enOnlyAlternates } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

export function generateMetadata(): Metadata {
  const title = "STEM Workshop Photos | Avanza STEM"
  const description = "Browse photos from Avanza STEM workshops and free hands-on programs for students."

  return {
    title,
    description,
    alternates: {
      canonical: "/gallery",
      languages: enOnlyAlternates("/gallery"),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/gallery`,
      siteName: siteConfig.name,
      type: "website",
    },
  }
}

export default function GalleryPage() {
  return <GalleryPageContent />
}
