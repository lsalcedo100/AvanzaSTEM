import type { Metadata } from "next"
import { PythonIdePageContent } from "@/components/pages/python-ide-page-content"
import { enOnlyAlternates } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

const title = "Avanza STEM Python IDE | Free Online Python Editor"
const description =
  "Write and run real Python in your browser, free. Code editor, Run and Stop controls, and a live output terminal. No account, no install, nothing to download."

export function generateMetadata(): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: "/python-ide",
      languages: enOnlyAlternates("/python-ide"),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/python-ide`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        { url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Avanza STEM Python IDE",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web browser",
  url: `${siteConfig.url}/python-ide`,
  description,
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
