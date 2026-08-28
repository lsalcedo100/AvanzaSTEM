import type { MetadataRoute } from 'next'
import { localizedBlogArticles } from '@/features/blog/posts'
import {
  introToPythonCurriculum,
  introToPythonPath,
  introToPythonTeacherGuidePath,
  introToPythonWeekPath,
  introToPythonWorksheetsPath,
} from '@/features/curriculums/intro-to-python'
import {
  engineeringFundamentalsCurriculum,
  engineeringFundamentalsPath,
  engineeringLessonPath,
  engineeringTeacherGuidePath,
  engineeringWorksheetPath,
} from '@/features/curriculums/engineering-fundamentals'
import {
  scienceExperimentsCurriculum,
  scienceExperimentsPath,
  scienceLessonPath,
} from '@/features/curriculums/science-experiments'
import {
  mathAdventuresCurriculum,
  mathAdventuresPath,
  mathLessonPath,
} from '@/features/curriculums/math-adventures'
import {
  roboticsCurriculum,
  roboticsLessonPath,
  roboticsPath,
  roboticsTeacherGuidePath,
  roboticsWorksheetPath,
} from '@/features/curriculums/robotics'
import {
  introToAiCourse,
  introToAiFinalAssessmentPath,
  introToAiFinalProjectPath,
  introToAiCompletionPath,
  introToAiLessonPath,
  introToAiPath,
  introToAiWeekPath,
} from '@/features/curriculums/intro-to-ai'
import { engineeringCurriculumHasTranslation } from '@/features/curriculums/engineering-fundamentals-i18n'
import { introToAiCourseHasTranslation } from '@/features/curriculums/intro-to-ai-i18n'
import { pythonCurriculumHasTranslation } from '@/features/curriculums/intro-to-python-i18n'
import { mathCurriculumHasTranslation } from '@/features/curriculums/math-adventures-i18n'
import { roboticsCurriculumHasTranslation } from '@/features/curriculums/robotics-i18n'
import { scienceCurriculumHasTranslation } from '@/features/curriculums/science-experiments-i18n'
import { projectGuides } from '@/features/projects/data'
import { enOnlyAlternates, languageAlternates, localizedPath } from '@/lib/i18n-routes'
import { siteConfig } from '@/lib/site-config'
import { VALID_LANGUAGES, type Language } from '@/i18n/translations'

// A course is advertised as translated only when every non-English locale has
// an overlay for it. The overlays are filled in course by course, so this is
// read off the data rather than kept as a hand-maintained list that would go
// stale the moment a translation lands.
const NON_ENGLISH_LANGUAGES = VALID_LANGUAGES.filter((language) => language !== 'en')

function fullyTranslated(hasTranslation: (language: Language) => boolean): boolean {
  return NON_ENGLISH_LANGUAGES.every(hasTranslation)
}

const introToPythonLessonPaths = introToPythonCurriculum.weeks.map((w) =>
  introToPythonWeekPath(w.week),
)

const engineeringFundamentalsLessonPaths = engineeringFundamentalsCurriculum.lessons.map((lesson) =>
  engineeringLessonPath(lesson.slug),
)

// Printable worksheets and per-lesson teacher guides.
const engineeringFundamentalsResourcePaths = engineeringFundamentalsCurriculum.lessons.flatMap(
  (lesson) => [engineeringWorksheetPath(lesson.slug), engineeringTeacherGuidePath(lesson.slug)],
)

const scienceExperimentsLessonPaths = scienceExperimentsCurriculum.lessons.map((lesson) =>
  scienceLessonPath(lesson.slug),
)

const mathAdventuresLessonPaths = mathAdventuresCurriculum.lessons.map((lesson) =>
  mathLessonPath(lesson.slug),
)

const roboticsLessonPaths = roboticsCurriculum.modules.map((module) =>
  roboticsLessonPath(module.slug),
)
const roboticsResourcePaths = roboticsCurriculum.modules.flatMap((module) => [
  roboticsWorksheetPath(module.slug),
  roboticsTeacherGuidePath(module.slug),
])
const roboticsSectionPaths = [
  `${roboticsPath}/review`,
  `${roboticsPath}/journal`,
  `${roboticsPath}/final-project`,
]

// The Intro to Artificial Intelligence course: hub, six weekly overviews, 18
// lessons, and its final-project/assessment/completion sections.
const introToAiWeekPaths = introToAiCourse.weeks.map((w) => introToAiWeekPath(w.week))
const introToAiLessonPaths = introToAiCourse.weeks.flatMap((w) =>
  w.lessons.map((lesson) => introToAiLessonPath(w.week, lesson.slug)),
)
const introToAiSectionPaths = [
  introToAiFinalProjectPath,
  introToAiFinalAssessmentPath,
  introToAiCompletionPath,
]

const COURSE_PATHS: { translated: boolean; paths: string[] }[] = [
  {
    translated: fullyTranslated(pythonCurriculumHasTranslation),
    paths: [
      introToPythonPath,
      introToPythonTeacherGuidePath,
      introToPythonWorksheetsPath,
      ...introToPythonLessonPaths,
    ],
  },
  {
    translated: fullyTranslated(engineeringCurriculumHasTranslation),
    paths: [
      engineeringFundamentalsPath,
      ...engineeringFundamentalsLessonPaths,
      ...engineeringFundamentalsResourcePaths,
    ],
  },
  {
    translated: fullyTranslated(scienceCurriculumHasTranslation),
    paths: [scienceExperimentsPath, ...scienceExperimentsLessonPaths],
  },
  {
    translated: fullyTranslated(mathCurriculumHasTranslation),
    paths: [mathAdventuresPath, ...mathAdventuresLessonPaths],
  },
  {
    translated: fullyTranslated(roboticsCurriculumHasTranslation),
    paths: [
      roboticsPath,
      ...roboticsLessonPaths,
      ...roboticsResourcePaths,
      ...roboticsSectionPaths,
    ],
  },
  {
    translated: fullyTranslated(introToAiCourseHasTranslation),
    paths: [
      introToAiPath,
      ...introToAiWeekPaths,
      ...introToAiLessonPaths,
      ...introToAiSectionPaths,
    ],
  },
]

// Routes that are only rendered in English. They remain reachable at /es, /pt
// and /zh (middleware rewrites them to the English route), but since the
// visible content does not change per locale, we don't emit localized sitemap
// entries or hreflang alternates for them - only the canonical English URL.
//
// The flat pages and the home, blog and project routes are all translated, so
// nothing outside the untranslated courses belongs in here.
const ENGLISH_ONLY_PATHS = new Set(
  COURSE_PATHS.filter((course) => !course.translated).flatMap((course) => course.paths),
)

// lastModified dates below reflect the last meaningful content update for each
// route, derived from git history over the files that actually render it - not
// a single mass-applied "today" stamp.
//
// Keep these honest. Google leans on <lastmod> only while it stays verifiably
// accurate; a sitemap claiming June for a page edited in August teaches it to
// discount the field entirely. Twelve entries here had drifted by up to two
// months (/workshops and /gallery gained library photos and new locations on
// 2026-08-14 while still advertising 2026-06-13).
//
// Refresh an entry when the page's *content* changes, not when its metadata or
// surrounding code is refactored: the blog posts deliberately keep their
// 2026-06-16 dates even though posts.ts was edited on 2026-08-14, because that
// commit removed an unused authorId field and changed nothing a reader sees.
const staticRoutes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', lastModified: '2026-08-14' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-07-12' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-07-04' },
  { path: '/games', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-16' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-08-14' },
  { path: '/workshops', priority: 0.8, changeFrequency: 'weekly', lastModified: '2026-08-14' },
  { path: '/find-a-workshop', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-08-14' },
  { path: '/host', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-07-02' },
  { path: '/gallery', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-08-14' },
  { path: '/curriculums', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-07-16' },
  { path: '/curriculums/intro-to-python', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-07' },
  { path: '/courses/engineering-fundamentals', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-08' },
  { path: '/courses/science-experiments', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-09' },
  { path: '/courses/math-adventures', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-09' },
  { path: '/courses/robotics', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-09' },
  { path: '/courses/robotics/review', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-07-09' },
  { path: '/courses/robotics/journal', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-07-09' },
  { path: '/courses/robotics/final-project', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-07-09' },
  { path: '/courses/intro-to-artificial-intelligence', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-11' },
  { path: '/courses/intro-to-artificial-intelligence/final-project', priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-07-11' },
  { path: '/courses/intro-to-artificial-intelligence/final-assessment', priority: 0.5, changeFrequency: 'monthly', lastModified: '2026-07-11' },
  { path: '/courses/intro-to-artificial-intelligence/completion', priority: 0.4, changeFrequency: 'monthly', lastModified: '2026-07-11' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-06-13' },
  { path: '/python-ide', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-07-12' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly', lastModified: '2026-07-02' },
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
  // Light & Optics strand added 2026-08-27
  'how-does-a-camera-work-without-a-lens': '2026-08-27',
  'how-do-fiber-optic-cables-work': '2026-08-27',
  'how-do-scientists-know-what-stars-are-made-of': '2026-08-27',
  'why-do-things-glow-under-a-blacklight': '2026-08-27',
  'is-light-a-wave-or-a-particle': '2026-08-27',
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
    // Several image filenames contain spaces, which are not legal in a
    // sitemap <image:loc>. encodeURI leaves an already-valid path alone.
    const url = /^https?:\/\//.test(image) ? image : encodeURI(`${siteConfig.url}${image}`)
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

  const engineeringFundamentalsLessonRoutes: MetadataRoute.Sitemap =
    engineeringFundamentalsCurriculum.lessons.flatMap((lesson) =>
      buildRouteEntries(engineeringLessonPath(lesson.slug), {
        priority: 0.6,
        changeFrequency: 'monthly',
        lastModified: '2026-07-08',
      }),
    )

  const engineeringFundamentalsResourceRoutes: MetadataRoute.Sitemap =
    engineeringFundamentalsResourcePaths.flatMap((path) =>
      buildRouteEntries(path, {
        priority: 0.5,
        changeFrequency: 'monthly',
        lastModified: '2026-07-08',
      }),
    )

  const scienceExperimentsLessonRoutes: MetadataRoute.Sitemap =
    scienceExperimentsCurriculum.lessons.flatMap((lesson) =>
      buildRouteEntries(scienceLessonPath(lesson.slug), {
        priority: 0.6,
        changeFrequency: 'monthly',
        lastModified: '2026-07-09',
      }),
    )

  const mathAdventuresLessonRoutes: MetadataRoute.Sitemap =
    mathAdventuresCurriculum.lessons.flatMap((lesson) =>
      buildRouteEntries(mathLessonPath(lesson.slug), {
        priority: 0.6,
        changeFrequency: 'monthly',
        lastModified: '2026-07-09',
      }),
    )

  const roboticsLessonRoutes: MetadataRoute.Sitemap = roboticsCurriculum.modules.flatMap((module) =>
    buildRouteEntries(roboticsLessonPath(module.slug), {
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: '2026-07-09',
    }),
  )

  const roboticsResourceRoutes: MetadataRoute.Sitemap = roboticsResourcePaths.flatMap((path) =>
    buildRouteEntries(path, {
      priority: 0.5,
      changeFrequency: 'monthly',
      lastModified: '2026-07-09',
    }),
  )

  const introToAiWeekRoutes: MetadataRoute.Sitemap = introToAiWeekPaths.flatMap((path) =>
    buildRouteEntries(path, {
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: '2026-07-11',
    }),
  )

  const introToAiLessonRoutes: MetadataRoute.Sitemap = introToAiLessonPaths.flatMap((path) =>
    buildRouteEntries(path, {
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: '2026-07-11',
    }),
  )

  return [
    ...staticSitemapRoutes,
    ...blogRoutes,
    ...projectRoutes,
    ...introToPythonLessonRoutes,
    ...introToPythonResourceRoutes,
    ...engineeringFundamentalsLessonRoutes,
    ...engineeringFundamentalsResourceRoutes,
    ...scienceExperimentsLessonRoutes,
    ...mathAdventuresLessonRoutes,
    ...roboticsLessonRoutes,
    ...roboticsResourceRoutes,
    ...introToAiWeekRoutes,
    ...introToAiLessonRoutes,
  ]
}
