import type { MetadataRoute } from 'next'
import { localizedBlogArticles } from '@/features/blog/posts'
import { projectGuides } from '@/features/projects/data'
import { enOnlyAlternates, languageAlternates, localizedPath } from '@/lib/i18n-routes'
import { siteConfig } from '@/lib/site-config'
import { VALID_LANGUAGES, type Language } from '@/i18n/translations'

// Routes that are only rendered in English. They remain reachable at /es and
// /zh (middleware rewrites them to the English route), but since the visible
// content does not change per locale, we don't emit /es and /zh sitemap
// entries or hreflang alternates for them - only the canonical English URL.
const ENGLISH_ONLY_PATHS = new Set([
  '/about',
  '/games',
  '/workshops',
  '/find-a-workshop',
  '/host',
  '/gallery',
  '/faq',
  '/privacy',
])

// lastModified dates below reflect the last meaningful content/code update for
// each route (derived from git history at the time of writing), not a single
// mass-applied "today" stamp. Update the relevant entry when a page's content
// materially changes.
const staticRoutes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-06-11' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/games', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-06-12' },
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

// Per-project last-updated dates, based on when each guide's content/component
// was last meaningfully edited.
const projectLastModified: Record<string, string> = {
  'popsicle-stick-bridge': '2026-06-12',
  'lego-robot-builder': '2026-06-12',
  'my-first-python-program': '2026-06-12',
  'coke-mentos-experiment': '2026-06-12',
  'baking-soda-volcano': '2026-06-12',
  'simple-circuit-light': '2026-06-12',
  'elephant-toothpaste-experiment': '2026-06-12',
  'making-oobleck': '2026-06-12',
  'rubber-band-powered-car': '2026-06-11',
  'lemon-powered-batteries': '2026-06-07',
  'balloon-powered-car': '2026-06-07',
}

// Single fallback, used only if a route is added without an explicit date above.
const fallbackLastModified = '2026-06-12'

function buildRouteEntries(
  path: string,
  options: { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified: string },
): MetadataRoute.Sitemap {
  if (ENGLISH_ONLY_PATHS.has(path)) {
    return [
      {
        url: `${siteConfig.url}${path}`,
        priority: options.priority,
        changeFrequency: options.changeFrequency,
        lastModified: options.lastModified,
        alternates: { languages: enOnlyAlternates(path) },
      },
    ]
  }

  const alternates = { languages: languageAlternates(path) }
  const languages: readonly Language[] = VALID_LANGUAGES

  return languages.map((language) => ({
    url: `${siteConfig.url}${localizedPath(path, language)}`,
    priority: options.priority,
    changeFrequency: options.changeFrequency,
    lastModified: options.lastModified,
    alternates,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticSitemapRoutes: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    buildRouteEntries(route.path, route),
  )

  const blogRoutes: MetadataRoute.Sitemap = Object.keys(localizedBlogArticles.en).flatMap((slug) =>
    buildRouteEntries(`/blog/${slug}`, {
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: blogLastModified[slug] ?? fallbackLastModified,
    }),
  )

  const projectRoutes: MetadataRoute.Sitemap = projectGuides.flatMap((project) =>
    buildRouteEntries(`/projects/${project.slug}`, {
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: projectLastModified[project.slug] ?? fallbackLastModified,
    }),
  )

  return [...staticSitemapRoutes, ...blogRoutes, ...projectRoutes]
}
