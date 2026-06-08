import { cookies } from "next/headers"
import type { Metadata } from "next"
import { localizedBlogArticles, type BlogSlug } from "@/features/blog/posts"
import type { Language } from "@/i18n/translations"

const VALID_LANGUAGES: Language[] = ["en", "es", "zh"]
const BASE_URL = "https://avanzastem.org"

export async function generateBlogPostMetadata(
  slug: BlogSlug,
  description: string,
  datePublished: string
): Promise<Metadata> {
  const cookieStore = await cookies()
  const rawLang = cookieStore.get("avanza-lang")?.value
  const lang: Language = VALID_LANGUAGES.includes(rawLang as Language)
    ? (rawLang as Language)
    : "en"

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
