import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-is-the-sky-blue-but-sunsets-are-orange" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyIsTheSkyBluePage() {
  return <BlogPostPage slug={SLUG} />
}
