import type { Metadata } from "next"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

export const metadata: Metadata = {
  title: "Building a Community: How Local STEM Workshops Change Lives - Avanza STEM",
  description:
    "See how free STEM workshops are changing lives in Hispanic communities in New Jersey - and how to bring one to your neighborhood.",
  alternates: { canonical: "/blog/building-a-community-stem-workshops" },
  openGraph: {
    title: "Building a Community: How Local STEM Workshops Change Lives - Avanza STEM",
    description:
      "See how free STEM workshops are changing lives in Hispanic communities in New Jersey - and how to bring one to your neighborhood.",
    url: "https://avanzastem.org/blog/building-a-community-stem-workshops",
    type: "article",
    images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building a Community: How Local STEM Workshops Change Lives - Avanza STEM",
    description:
      "See how free STEM workshops are changing lives in Hispanic communities in New Jersey - and how to bring one to your neighborhood.",
    images: ["/images/og-default-en.png"],
  },
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Building a Community: How Local STEM Workshops Change Lives",
  description:
    "See how free STEM workshops are changing lives in Hispanic communities in New Jersey - and how to bring one to your neighborhood.",
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: "Avanza STEM", url: "https://avanzastem.org" },
  datePublished: "2026-01-12",
  url: "https://avanzastem.org/blog/building-a-community-stem-workshops",
}

export default function BuildingACommunityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <LocalizedBlogPost slug="building-a-community-stem-workshops" />
    </>
  )
}
