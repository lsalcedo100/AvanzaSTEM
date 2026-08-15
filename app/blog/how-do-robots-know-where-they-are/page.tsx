import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-do-robots-know-where-they-are" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HowDoRobotsKnowWhereTheyArePage() {
  return <BlogPostPage slug={SLUG} />
}
