import type { Metadata } from "next"
import { PrivacyPageContent } from "@/components/pages/privacy-page-content"
import { enOnlyAlternates } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

export function generateMetadata(): Metadata {
  const title = "Privacy Policy | Avanza STEM"
  const description = "Learn how Avanza STEM collects, uses, and protects your personal information."

  return {
    title,
    description,
    alternates: {
      canonical: "/privacy",
      languages: enOnlyAlternates("/privacy"),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/privacy`,
      siteName: siteConfig.name,
      type: "website",
    },
  }
}

export default function PrivacyPage() {
  return <PrivacyPageContent />
}
