import type { Metadata } from "next"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"

export const metadata: Metadata = {
  title: "Why Every Kid Should Learn to Code (And How to Start) - Avanza STEM",
  description:
    "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming — no prior experience needed.",
  alternates: { canonical: '/blog/why-every-kid-should-learn-to-code' },
  openGraph: {
    title: "Why Every Kid Should Learn to Code (And How to Start) - Avanza STEM",
    description: "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming — no prior experience needed.",
    url: 'https://avanzastem.org/blog/why-every-kid-should-learn-to-code',
    type: 'article',
    images: [{ url: '/images/og-default-en.png', width: 1200, height: 630, alt: 'Avanza STEM' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Every Kid Should Learn to Code (And How to Start) - Avanza STEM",
    description: "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming — no prior experience needed.",
    images: ['/images/og-default-en.png'],
  },
}

const blogPostJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Why Every Kid Should Learn to Code (And How to Start)',
  description: 'Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming — no prior experience needed.',
  author: { '@type': 'Person', name: 'Liam Salcedo' },
  publisher: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
  datePublished: '2026-02-20',
  url: 'https://avanzastem.org/blog/why-every-kid-should-learn-to-code',
}

export default function WhyKidsShouldLearnToCodePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <LocalizedBlogPost slug="why-every-kid-should-learn-to-code" />
    </>
  )
}
