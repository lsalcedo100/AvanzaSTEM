import { generateBlogPostMetadata } from "@/features/blog/metadata"
import { LocalizedBlogPost } from "@/components/blog/localized-blog-post"
import { siteConfig } from "@/lib/site-config"

const SLUG = "getting-started-with-lego-robotics" as const
const DESCRIPTION =
  "LEGO robotics kits make a great STEM introduction for kids. Learn which kit to choose, what your child will learn, and how to get started at home."

export async function generateMetadata() {
  return generateBlogPostMetadata(SLUG, DESCRIPTION, "2026-02-05")
}

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Getting Started with LEGO Robotics: A Parent's Guide",
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Liam Salcedo" },
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  datePublished: "2026-02-05",
  url: `${siteConfig.url}/blog/getting-started-with-lego-robotics`,
}

export default function LegoRoboticsParentsGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <LocalizedBlogPost slug={SLUG} />
    </>
  )
}
