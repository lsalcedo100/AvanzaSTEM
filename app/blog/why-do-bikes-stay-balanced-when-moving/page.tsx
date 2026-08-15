import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-do-bikes-stay-balanced-when-moving" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyDoBikesStayBalancedPage() {
  return <BlogPostPage slug={SLUG} />
}
