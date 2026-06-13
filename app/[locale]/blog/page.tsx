import type { Metadata } from "next"
import { BlogPageContent } from "@/components/pages/blog-page-content"
import { generateBlogIndexMetadata, getBlogJsonLd } from "@/features/blog/metadata"
import type { Language } from "@/i18n/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateBlogIndexMetadata(locale as Language)
}

export default async function LocaleBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const blogJsonLd = getBlogJsonLd(locale as Language)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogPageContent />
    </>
  )
}
