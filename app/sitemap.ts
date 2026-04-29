import type { MetadataRoute } from 'next'

const BASE_URL = 'https://avanzastem.org'

const blogSlugs = [
  'why-every-kid-should-learn-to-code',
  '5-easy-science-experiments',
  'how-to-build-the-strongest-popsicle-stick-bridge',
  'getting-started-with-lego-robotics',
  'what-is-ai-explaining-to-kids',
  'math-games-that-make-learning-fun',
  'building-a-community-stem-workshops',
]

const projectSlugs = [
  'popsicle-stick-bridge',
  'lego-robot-builder',
  'my-first-python-program',
  'baking-soda-volcano',
  'simple-circuit-light',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-04-29')

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/curriculums`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/projects`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/blog`, lastModified, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/workshops`, lastModified, priority: 0.8, changeFrequency: 'weekly' },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticRoutes, ...blogRoutes, ...projectRoutes]
}
