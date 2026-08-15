import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-do-magnets-stick-to-some-metals-but-not-others" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyDoMagnetsStickPage() {
  return <BlogPostPage slug={SLUG} />
}
