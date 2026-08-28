import type { Metadata } from "next"

import { generateSitePageMetadata } from "@/features/site/page-metadata"
import { FAQPageContent } from "@/components/pages/faq-page-content"
import { translations } from "@/i18n/translations"
import { siteConfig } from "@/lib/site-config"

export function generateMetadata(): Metadata {
  return generateSitePageMetadata("faq", "en")
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
