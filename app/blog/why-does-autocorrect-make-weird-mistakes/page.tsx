import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { getBlogBreadcrumbJsonLd } from "@/features/blog/structured-data"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "why-does-autocorrect-make-weird-mistakes" as const
const DESCRIPTION =
  "Autocorrect predicts words based on patterns. Learn why it changes correct words, struggles with names and slang, and how it is related to AI language prediction."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION)
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Why Does Autocorrect Make Weird Mistakes?",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  url: `${siteConfig.url}/blog/why-does-autocorrect-make-weird-mistakes`,
}

const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(SLUG)

export default function WhyDoesAutocorrectMakeWeirdMistakesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
      <LocalizedBlogPost slug={SLUG} />
    </>
  )
}
