import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-factory-robots-build-cars" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HowFactoryRobotsBuildCarsPage() {
  return <BlogPostPage slug={SLUG} />
}
