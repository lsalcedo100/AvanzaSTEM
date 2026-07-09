import type { MetadataRoute } from 'next'
import { localizedBlogArticles } from '@/features/blog/posts'
import {
  introToPythonCurriculum,
  introToPythonPath,
  introToPythonTeacherGuidePath,
  introToPythonWeekPath,
  introToPythonWorksheetsPath,
} from '@/features/curriculums/intro-to-python'
import { projectGuides } from '@/features/projects/data'
import { enOnlyAlternates, languageAlternates, localizedPath } from '@/lib/i18n-routes'
import { siteConfig } from '@/lib/site-config'
import { VALID_LANGUAGES, type Language } from '@/i18n/translations'

// The Intro to Python curriculum landing and its per-week lesson pages render
// English content at every locale, so they are treated as English-only routes.
const introToPythonLessonPaths = introToPythonCurriculum.weeks.map((w) =>
  introToPythonWeekPath(w.week),
)

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
  introToPythonPath,
  introToPythonTeacherGuidePath,
  introToPythonWorksheetsPath,
  ...introToPythonLessonPaths,
])

// lastModified dates below reflect the last meaningful content/code update for
// each route (derived from git history at the time of writing), not a single
// mass-applied "today" stamp. Update the relevant entry when a page's content
// materially changes.
const staticRoutes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-06-13' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-16' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-12' },
  { path: '/games', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-13' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-06-16' },
  { path: '/workshops', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-06-13' },
  { path: '/find-a-workshop', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-13' },
  { path: '/host', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-13' },
  { path: '/gallery', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-13' },
  { path: '/curriculums', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-06-13' },
  { path: '/curriculums/intro-to-python', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-07' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-13' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly', lastModified: '2026-06-16' },
] as const

const blogLastModified: Record<string, string> = {
  // Original 7 posts — dates reflect last meaningful content/code edit per git history
  'why-every-kid-should-learn-to-code': '2026-06-16',
  '5-easy-science-experiments': '2026-06-16',
  'how-to-build-the-strongest-popsicle-stick-bridge': '2026-06-16',
  'getting-started-with-lego-robotics': '2026-06-16',
  'what-is-ai-explaining-to-kids': '2026-06-16',
  'math-games-that-make-learning-fun': '2026-06-16',
  'building-a-community-stem-workshops': '2026-06-16',
  // Posts added in commit 8188781 (2026-06-16)
  'why-triangles-are-an-engineers-secret-weapon': '2026-06-16',
  'how-engineers-think-when-something-breaks': '2026-06-16',
  'design-a-mars-rover-out-of-cardboard': '2026-06-16',
  'what-is-ai-actually-doing-when-it-answers-you': '2026-06-16',
  'how-to-think-like-an-inventor-in-20-minutes': '2026-06-16',
  'why-your-first-design-is-usually-not-your-best-one': '2026-06-16',
  'the-engineering-of-a-backpack': '2026-06-16',
  'what-makes-a-stem-workshop-fun': '2026-06-16',
  'engineering-inside-school-bus': '2026-06-16',
  'why-airplane-wings-are-curved': '2026-06-16',
  'how-elevators-know-where-to-go': '2026-06-16',
  'why-buildings-sway-in-wind': '2026-06-16',
  'engineering-behind-soccer-ball': '2026-06-16',
  'why-manhole-covers-are-round': '2026-06-16',
  'how-roller-coasters-stay-on-track': '2026-06-16',
  'why-chairs-break': '2026-06-16',
  'hidden-engineering-water-bottle': '2026-06-16',
  'can-ai-actually-think': '2026-06-16',
  'why-ai-sometimes-gets-things-wrong': '2026-06-16',
  'how-does-your-phone-recognize-your-face': '2026-06-16',
  'why-does-autocorrect-make-weird-mistakes': '2026-06-16',
  'what-happens-when-you-ask-ai-a-question': '2026-06-16',
  'should-kids-trust-everything-ai-says': '2026-06-16',
  'how-do-video-games-use-ai': '2026-06-16',
  'is-a-robot-the-same-thing-as-ai': '2026-06-16',
  'how-do-robots-know-where-they-are': '2026-06-16',
  'why-robots-are-bad-at-easy-human-tasks': '2026-06-16',
  'what-makes-a-robot-a-robot': '2026-06-16',
  'how-mars-rovers-drive-without-a-driver': '2026-06-16',
  'why-robot-hands-are-so-hard-to-make': '2026-06-16',
  'how-factory-robots-build-cars': '2026-06-16',
  'why-is-the-sky-blue-but-sunsets-are-orange': '2026-06-16',
  'why-do-your-ears-pop-on-an-airplane': '2026-06-16',
  'why-does-metal-feel-colder-than-wood': '2026-06-16',
  'why-do-bikes-stay-balanced-when-moving': '2026-06-16',
  'why-do-we-slip-on-ice': '2026-06-16',
  'how-do-noise-canceling-headphones-work': '2026-06-16',
  'why-do-some-things-float-and-others-sink': '2026-06-16',
  'why-do-magnets-stick-to-some-metals-but-not-others': '2026-06-16',
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

// Fallback used only if a route is added without an explicit date above.
const fallbackLastModified = '2026-06-16'

// Image sitemap entries (<image:loc>) must be absolute URLs. Content images are
// stored either as absolute Cloudinary URLs or as site-relative paths
// (e.g. "/images/blog/abacus.jpg"); resolve the latter against the site origin.
// Dedupes while preserving order so the same photo isn't emitted twice.
function absoluteImageUrls(images: readonly (string | undefined)[]): string[] {
  const seen = new Set<string>()
  const resolved: string[] = []
  for (const image of images) {
    if (!image) continue
    const url = /^https?:\/\//.test(image) ? image : `${siteConfig.url}${image}`
    if (seen.has(url)) continue
    seen.add(url)
    resolved.push(url)
  }
  return resolved
}

function buildRouteEntries(
  path: string,
  options: {
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
    lastModified: string
    images?: string[]
  },
): MetadataRoute.Sitemap {
  const images = options.images && options.images.length > 0 ? options.images : undefined

  if (ENGLISH_ONLY_PATHS.has(path)) {
    return [
      {
        url: `${siteConfig.url}${path}`,
        priority: options.priority,
        changeFrequency: options.changeFrequency,
        lastModified: options.lastModified,
        alternates: { languages: enOnlyAlternates(path) },
        ...(images ? { images } : {}),
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
    ...(images ? { images } : {}),
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticSitemapRoutes: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    buildRouteEntries(route.path, route),
  )

  const blogRoutes: MetadataRoute.Sitemap = Object.entries(localizedBlogArticles.en).flatMap(([slug, article]) =>
    buildRouteEntries(`/blog/${slug}`, {
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: blogLastModified[slug] ?? fallbackLastModified,
      images: absoluteImageUrls([article.image]),
    }),
  )

  const projectRoutes: MetadataRoute.Sitemap = projectGuides.flatMap((project) =>
    buildRouteEntries(`/projects/${project.slug}`, {
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: projectLastModified[project.slug] ?? fallbackLastModified,
      images: absoluteImageUrls([project.image, ...(project.stepImages?.map((step) => step.src) ?? [])]),
    }),
  )

  const introToPythonLessonRoutes: MetadataRoute.Sitemap = introToPythonCurriculum.weeks.flatMap((w) =>
    buildRouteEntries(introToPythonWeekPath(w.week), {
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: '2026-07-07',
    }),
  )

  const introToPythonResourceRoutes: MetadataRoute.Sitemap = [
    introToPythonTeacherGuidePath,
    introToPythonWorksheetsPath,
  ].flatMap((path) =>
    buildRouteEntries(path, {
      priority: 0.5,
      changeFrequency: 'monthly',
      lastModified: '2026-07-07',
    }),
  )

  return [
    ...staticSitemapRoutes,
    ...blogRoutes,
    ...projectRoutes,
    ...introToPythonLessonRoutes,
    ...introToPythonResourceRoutes,
  ]
}
