import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-robots-are-bad-at-easy-human-tasks" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyRobotsAreBadAtEasyHumanTasksPage() {
  return <BlogPostPage slug={SLUG} />
}
