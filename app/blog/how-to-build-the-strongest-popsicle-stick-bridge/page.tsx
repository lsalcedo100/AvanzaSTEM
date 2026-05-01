import type { Metadata } from "next"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

export const metadata: Metadata = {
  title: "How to Build the Strongest Popsicle Stick Bridge - Avanza STEM",
  description:
    "Learn the engineering secrets behind a strong popsicle stick bridge. Triangles, load paths, and joints - a step-by-step guide for young engineers.",
  alternates: { canonical: "/blog/how-to-build-the-strongest-popsicle-stick-bridge" },
  openGraph: {
    title: "How to Build the Strongest Popsicle Stick Bridge - Avanza STEM",
    description:
      "Learn the engineering secrets behind a strong popsicle stick bridge. Triangles, load paths, and joints - a step-by-step guide for young engineers.",
    url: "https://avanzastem.org/blog/how-to-build-the-strongest-popsicle-stick-bridge",
    type: "article",
    images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Build the Strongest Popsicle Stick Bridge - Avanza STEM",
    description:
      "Learn the engineering secrets behind a strong popsicle stick bridge. Triangles, load paths, and joints - a step-by-step guide for young engineers.",
    images: ["/images/og-default-en.png"],
  },
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Build the Strongest Popsicle Stick Bridge",
  description:
    "Learn the engineering secrets behind a strong popsicle stick bridge. Triangles, load paths, and joints - a step-by-step guide for young engineers.",
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: "Avanza STEM", url: "https://avanzastem.org" },
  datePublished: "2026-02-10",
  url: "https://avanzastem.org/blog/how-to-build-the-strongest-popsicle-stick-bridge",
}

export default function PopsicleStickBridgeBlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <LocalizedBlogPost slug="how-to-build-the-strongest-popsicle-stick-bridge" />
    </>
  )
}
