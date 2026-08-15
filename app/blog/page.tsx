import type { Metadata } from "next"
import { BlogPageContent } from "@/components/pages/blog-page-content"
import { generateBlogIndexMetadata, getBlogJsonLd } from "@/features/blog/metadata"

export function generateMetadata(): Metadata {
  return generateBlogIndexMetadata("en")
}

// On the index page, not in a layout: a layout would also emit this Blog node
// (which declares url = /blog) on all 46 post pages, alongside each post's own
// BlogPosting.
const blogJsonLd = getBlogJsonLd("en")

export default function BlogPage() {
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
