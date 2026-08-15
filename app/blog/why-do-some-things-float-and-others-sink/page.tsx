import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-do-some-things-float-and-others-sink" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyDoSomeThingsFloatPage() {
  return <BlogPostPage slug={SLUG} />
}
