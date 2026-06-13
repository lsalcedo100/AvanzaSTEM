import type { Metadata } from "next"
import { FAQPageContent } from "@/components/pages/faq-page-content"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Free STEM Workshop FAQ | Avanza STEM",
  description: "Answers to common questions about Avanza STEM workshops, curricula, costs, and how to get involved.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Free STEM Workshop FAQ | Avanza STEM",
    description: "Answers to common questions about Avanza STEM workshops, curricula, costs, and how to get involved.",
    url: `${siteConfig.url}/faq`,
    siteName: siteConfig.name,
    type: "website",
  },
}

export default function FAQPage() {
  return <FAQPageContent />
}
