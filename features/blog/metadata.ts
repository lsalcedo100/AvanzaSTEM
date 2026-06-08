import type { Metadata } from "next"
import { localizedBlogArticles, type BlogSlug } from "@/features/blog/posts"
import { getLanguage } from "@/lib/get-language"

const BASE_URL = "https://avanzastem.org"

export async function generateBlogPostMetadata(
  slug: BlogSlug,
  description: string,
  datePublished: string
): Promise<Metadata> {
  const lang = await getLanguage()

  const article =
    (lang !== "en" ? localizedBlogArticles[lang][slug] : undefined) ??
    localizedBlogArticles.en[slug]

  const title = `${article.title} - Avanza STEM`
  const url = `${BASE_URL}/blog/${slug}`

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: datePublished,
      authors: ["Liam Salcedo"],
      images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}
