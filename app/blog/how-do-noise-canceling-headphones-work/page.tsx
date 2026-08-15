import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-do-noise-canceling-headphones-work" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HowDoNoiseCancelingHeadphonesWorkPage() {
  return <BlogPostPage slug={SLUG} />
}
