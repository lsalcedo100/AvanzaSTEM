import type { Metadata } from "next"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

export const metadata: Metadata = {
  title: "5 Easy Science Experiments You Can Do at Home - Avanza STEM",
  description:
    "Try 5 easy science experiments at home using household items. Safe, fun, and educational activities for kids in grades 2 and up.",
  alternates: { canonical: "/blog/5-easy-science-experiments" },
  openGraph: {
    title: "5 Easy Science Experiments You Can Do at Home - Avanza STEM",
    description:
      "Try 5 easy science experiments at home using household items. Safe, fun, and educational activities for kids in grades 2 and up.",
    url: "https://avanzastem.org/blog/5-easy-science-experiments",
    type: "article",
    images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Easy Science Experiments You Can Do at Home - Avanza STEM",
    description:
      "Try 5 easy science experiments at home using household items. Safe, fun, and educational activities for kids in grades 2 and up.",
    images: ["/images/og-default-en.png"],
  },
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "5 Easy Science Experiments You Can Do at Home",
  description:
    "Try 5 easy science experiments at home using household items. Safe, fun, and educational activities for kids in grades 2 and up.",
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: "Avanza STEM", url: "https://avanzastem.org" },
  datePublished: "2026-02-15",
  url: "https://avanzastem.org/blog/5-easy-science-experiments",
}

export default function FiveEasyScienceExperimentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <LocalizedBlogPost slug="5-easy-science-experiments" />
    </>
  )
}
