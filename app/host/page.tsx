import type { Metadata } from "next"
import { HostPageContent } from "@/components/pages/host-page-content"
import { enOnlyAlternates } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

export function generateMetadata(): Metadata {
  const title = "Host a Workshop | Avanza STEM"
  const description = "Bring Avanza STEM to your school or library. Contact us to host a free STEM workshop for your community."

  return {
    title,
    description,
    alternates: {
      canonical: "/host",
      languages: enOnlyAlternates("/host"),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/host`,
      siteName: siteConfig.name,
      type: "website",
    },
  }
}

export default function HostPage() {
  return <HostPageContent />
}
