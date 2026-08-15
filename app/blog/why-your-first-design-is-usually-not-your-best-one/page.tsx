import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-your-first-design-is-usually-not-your-best-one" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyYourFirstDesignPage() {
  return <BlogPostPage slug={SLUG} />
}
