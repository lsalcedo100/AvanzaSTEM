import type { MetadataRoute } from 'next'
import { localizedBlogArticles } from '@/features/blog/posts'
import { projectGuides } from '@/features/projects/data'
import { siteConfig } from '@/lib/site-config'

const staticRoutes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-06-12' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/games', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-11' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-02-20' },
  { path: '/workshops', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-06-12' },
  { path: '/find-a-workshop', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/host', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/gallery', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/curriculums', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly', lastModified: '2026-06-12' },
] as const

const blogLastModified: Record<string, string> = {
  'why-every-kid-should-learn-to-code': '2026-02-20',
  '5-easy-science-experiments': '2026-02-15',
  'how-to-build-the-strongest-popsicle-stick-bridge': '2026-02-10',
  'getting-started-with-lego-robotics': '2026-02-05',
  'what-is-ai-explaining-to-kids': '2026-01-28',
  'math-games-that-make-learning-fun': '2026-01-20',
  'building-a-community-stem-workshops': '2026-01-12',
}

const projectLastModified: Record<string, string> = {
  'popsicle-stick-bridge': '2026-06-12',
  'lego-robot-builder': '2026-06-12',
  'my-first-python-program': '2026-06-12',
  'coke-mentos-experiment': '2026-06-12',
  'rubber-band-powered-car': '2026-06-12',
}

// Fallback reflects the local SEO/content refresh date when individual guide dates are unavailable.
const fallbackLastModified = '2026-06-12'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticSitemapRoutes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    priority: route.priority,
    changeFrequency: route.changeFrequency,
    lastModified: route.lastModified,
  }))

  const blogRoutes: MetadataRoute.Sitemap = Object.keys(localizedBlogArticles.en).map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: blogLastModified[slug] ?? fallbackLastModified,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projectGuides.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: projectLastModified[project.slug] ?? fallbackLastModified,
  }))

  return [...staticSitemapRoutes, ...blogRoutes, ...projectRoutes]
}
