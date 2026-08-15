import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-does-metal-feel-colder-than-wood" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyDoesMetalFeelColderPage() {
  return <BlogPostPage slug={SLUG} />
}
