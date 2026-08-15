import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "getting-started-with-lego-robotics" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function LegoRoboticsParentsGuidePage() {
  return <BlogPostPage slug={SLUG} />
}
