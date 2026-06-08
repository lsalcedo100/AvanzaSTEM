import type { MetadataRoute } from 'next'
import { localizedBlogArticles } from '@/features/blog/posts'
import { projectGuides } from '@/features/projects/data'

const BASE_URL = 'https://avanzastem.org'

const staticRoutes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/games', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/workshops', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/find-a-workshop', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/workshop-finder', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/host', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/curriculums', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-06-07')

  const staticSitemapRoutes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    priority: route.priority,
    changeFrequency: route.changeFrequency,
  }))

  const blogRoutes: MetadataRoute.Sitemap = Object.keys(localizedBlogArticles.en).map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projectGuides.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticSitemapRoutes, ...blogRoutes, ...projectRoutes]
}
