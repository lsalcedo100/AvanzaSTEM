import type { Metadata } from "next"

import {
  generateSitePageMetadata,
  sitePageDescription,
} from "@/features/site/page-metadata"
import { PythonIdePageContent } from "@/components/pages/python-ide-page-content"
import { siteConfig } from "@/lib/site-config"

export function generateMetadata(): Metadata {
  return generateSitePageMetadata("pythonIde", "en")
}

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Avanza STEM Python IDE",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web browser",
  url: `${siteConfig.url}/python-ide`,
  description: sitePageDescription("pythonIde", "en"),
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

export default function PythonIdePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <PythonIdePageContent />
    </>
  )
}
