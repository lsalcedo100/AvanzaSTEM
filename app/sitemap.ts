import type { MetadataRoute } from 'next'
import { localizedBlogArticles } from '@/features/blog/posts'
import { projectGuides } from '@/features/projects/data'
import { siteConfig } from '@/lib/site-config'

const staticRoutes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/games', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/workshops', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/find-a-workshop', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/host', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/curriculums', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticSitemapRoutes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    priority: route.priority,
    changeFrequency: route.changeFrequency,
  }))

  const blogRoutes: MetadataRoute.Sitemap = Object.keys(localizedBlogArticles.en).map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projectGuides.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticSitemapRoutes, ...blogRoutes, ...projectRoutes]
}
