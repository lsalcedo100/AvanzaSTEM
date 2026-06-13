import type { Metadata } from "next"
import { HostPageContent } from "@/components/pages/host-page-content"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Host a Workshop | Avanza STEM",
  description: "Bring Avanza STEM to your school or library. Contact us to host a free STEM workshop for your community.",
  alternates: { canonical: "/host" },
  openGraph: {
    title: "Host a Workshop | Avanza STEM",
    description: "Bring Avanza STEM to your school or library. Contact us to host a free STEM workshop for your community.",
    url: `${siteConfig.url}/host`,
    siteName: siteConfig.name,
    type: "website",
  },
}

export default function HostPage() {
  return <HostPageContent />
}
