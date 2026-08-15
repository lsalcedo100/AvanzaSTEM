import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { BlogPostPage } from "@/features/blog/components/blog-post-page"

const SLUG = "how-does-your-phone-recognize-your-face" as const

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG)
}

export default function HowDoesYourPhoneRecognizeYourFacePage() {
  return <BlogPostPage slug={SLUG} />
}
