import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "engineering-inside-school-bus" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function EngineeringInsideSchoolBusPage() {
  return <BlogPostPage slug={SLUG} />
}
