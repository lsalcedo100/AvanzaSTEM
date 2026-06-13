import type { Metadata } from "next"
import { FAQPageContent } from "@/components/pages/faq-page-content"
import { translations } from "@/i18n/translations"
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${siteConfig.url}/faq`,
  mainEntity: translations.en.faqPage.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQPageContent />
    </>
  )
}
