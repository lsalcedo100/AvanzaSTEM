import type { Metadata } from "next"
import { localizedBlogArticles, type BlogSlug } from "@/features/blog/posts"
import { type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

/**
 * Per-post metadata used to render BlogPosting JSON-LD and generate page
 * metadata for locale-prefixed blog post routes (app/[locale]/blog/[slug]).
 * Headline/description are kept in English (matching the canonical BlogPosting
 * schema on the English routes); only the URL and language alternates vary.
 */
export const BLOG_POST_META: Record<BlogSlug, { headline: string; description: string; datePublished: string }> = {
  "5-easy-science-experiments": {
    headline: "5 Easy Science Experiments You Can Do at Home",
    description:
      "Try 5 easy science experiments at home using household items. Safe, fun, and educational activities for kids in grades 2 and up.",
    datePublished: "2026-02-15",
  },
  "building-a-community-stem-workshops": {
    headline: "Building a Community: How Local STEM Workshops Change Lives",
    description:
      "See how free STEM workshops are changing lives in Hispanic communities in New Jersey - and how to bring one to your neighborhood.",
    datePublished: "2026-01-12",
  },
  "getting-started-with-lego-robotics": {
    headline: "Getting Started with LEGO Robotics: A Parent's Guide",
    description:
      "LEGO robotics kits make a great STEM introduction for kids. Learn which kit to choose, what your child will learn, and how to get started at home.",
    datePublished: "2026-02-05",
  },
  "how-to-build-the-strongest-popsicle-stick-bridge": {
    headline: "How to Build the Strongest Popsicle Stick Bridge",
    description:
      "Learn the engineering secrets behind a strong popsicle stick bridge. Triangles, load paths, and joints - a step-by-step guide for young engineers.",
    datePublished: "2026-02-10",
  },
  "math-games-that-make-learning-fun": {
    headline: "Math Games That Make Learning Fun",
    description:
      "Six math games that turn number practice into playtime for grades 2-5. Build number sense, fractions, and logic skills - no worksheets needed.",
    datePublished: "2026-01-20",
  },
  "what-is-ai-explaining-to-kids": {
    headline: "What is AI? Explaining Artificial Intelligence to Kids",
    description:
      "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.",
    datePublished: "2026-01-28",
  },
  "why-every-kid-should-learn-to-code": {
    headline: "Why Every Kid Should Learn to Code (And How to Start)",
    description:
      "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming. No prior experience needed.",
    datePublished: "2026-02-20",
  },
}

export function generateBlogPostMetadata(
  slug: BlogSlug,
  description: string,
  datePublished: string,
  language: Language = "en",
): Metadata {
  const article =
    (language !== "en" ? localizedBlogArticles[language][slug] : undefined) ??
    localizedBlogArticles.en[slug]

  const title = `${article.title} - Avanza STEM`
  const path = `/blog/${slug}`
  const url = `${siteConfig.url}${localizedPath(path, language)}`

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(path, language),
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: datePublished,
      authors: ["Liam Salcedo"],
      images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

const blogIndexMetadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: "STEM Blog for Hispanic Students - Avanza STEM",
    description:
      "STEM tips, tutorials, and how-to guides for young Hispanic students. Learn coding, science, engineering, and math in a fun and engaging way.",
  },
  es: {
    title: "Blog STEM para Estudiantes Hispanos - Avanza STEM",
    description:
      "Consejos STEM, ideas de actividades divertidas e inspiración para jóvenes estudiantes hispanos. Experimentos de ciencias, tutoriales de programación y proyectos de ingeniería en el blog de Avanza STEM.",
  },
  zh: {
    title: "STEM 博客 - Avanza STEM",
    description:
      "为西班牙裔学生和家庭提供 STEM 技巧、有趣活动创意和灵感。Avanza STEM 博客上的科学实验、编程教程和工程项目。",
  },
}

export function generateBlogIndexMetadata(language: Language = "en"): Metadata {
  const { title, description } = blogIndexMetadataByLanguage[language]
  return {
    title,
    description,
    alternates: {
      canonical: localizedPath("/blog", language),
      languages: languageAlternates("/blog"),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath("/blog", language)}`,
      type: "website",
      images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function getBlogJsonLd(language: Language = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Avanza STEM Blog",
    description: "STEM tips, activity ideas, and inspiration for young Hispanic students",
    url: `${siteConfig.url}${localizedPath("/blog", language)}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: language,
  }
}
