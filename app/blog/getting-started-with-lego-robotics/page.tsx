import type { Metadata } from "next"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

export const metadata: Metadata = {
  title: "Getting Started with LEGO Robotics: A Parent's Guide - Avanza STEM",
  description:
    "LEGO robotics kits make a great STEM introduction for kids. Learn which kit to choose, what your child will learn, and how to get started at home.",
  alternates: { canonical: "/blog/getting-started-with-lego-robotics" },
  openGraph: {
    title: "Getting Started with LEGO Robotics: A Parent's Guide - Avanza STEM",
    description:
      "LEGO robotics kits make a great STEM introduction for kids. Learn which kit to choose, what your child will learn, and how to get started at home.",
    url: "https://avanzastem.org/blog/getting-started-with-lego-robotics",
    type: "article",
    images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Getting Started with LEGO Robotics: A Parent's Guide - Avanza STEM",
    description:
      "LEGO robotics kits make a great STEM introduction for kids. Learn which kit to choose, what your child will learn, and how to get started at home.",
    images: ["/images/og-default-en.png"],
  },
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Getting Started with LEGO Robotics: A Parent's Guide",
  description:
    "LEGO robotics kits make a great STEM introduction for kids. Learn which kit to choose, what your child will learn, and how to get started at home.",
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: "Avanza STEM", url: "https://avanzastem.org" },
  datePublished: "2026-02-05",
  url: "https://avanzastem.org/blog/getting-started-with-lego-robotics",
}

export default function LegoRoboticsParentsGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <LocalizedBlogPost slug="getting-started-with-lego-robotics" />
    </>
  )
}
