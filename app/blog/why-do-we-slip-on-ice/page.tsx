import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-do-we-slip-on-ice" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyDoWeSlipOnIcePage() {
  return <BlogPostPage slug={SLUG} />
}
