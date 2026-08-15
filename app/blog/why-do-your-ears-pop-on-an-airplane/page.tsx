import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "why-do-your-ears-pop-on-an-airplane" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function WhyDoYourEarsPopPage() {
  return <BlogPostPage slug={SLUG} />
}
