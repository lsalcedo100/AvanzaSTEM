import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-do-things-glow-under-a-blacklight" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function GlowUnderBlacklightPage() {
  return <BlogPostPage slug={SLUG} />
}
