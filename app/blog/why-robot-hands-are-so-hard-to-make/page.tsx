import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-robot-hands-are-so-hard-to-make" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyRobotHandsAreSoHardToMakePage() {
  return <BlogPostPage slug={SLUG} />
}
