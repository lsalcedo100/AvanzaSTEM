import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"
import { BLOG_POST_META, generateBlogPostMetadata } from "@/features/blog/metadata"
import { type BlogSlug } from "@/features/blog/posts"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const BLOG_SLUGS = Object.keys(BLOG_POST_META) as BlogSlug[]

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.flatMap((locale) => BLOG_SLUGS.map((slug) => ({ locale, slug })))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const meta = BLOG_POST_META[slug as BlogSlug]
  return generateBlogPostMetadata(slug as BlogSlug, meta.description, meta.datePublished, locale as Language)
}

export default async function LocaleBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!BLOG_SLUGS.includes(slug as BlogSlug)) {
    notFound()
  }

  return <BlogPostPage slug={slug as BlogSlug} language={locale as Language} />
}
