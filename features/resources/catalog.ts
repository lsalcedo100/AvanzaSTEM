import type { Translations } from "@/i18n/translations"

/**
 * The six kinds of resource the /resources hub collects, in the order the page
 * lists them.
 *
 * Deliberately free of heavy imports: this module is pulled into the client
 * bundle by the page component, so it holds ids and hrefs only. The counts that
 * go beside each entry are read from the real content data on the server (see
 * `./counts`) and passed in as a prop.
 */
export type ResourceItemId = "projects" | "courses" | "labs" | "blog" | "ide" | "workshops"

export type ResourceItem = {
  id: ResourceItemId
  href: string
  /** Which count fills the entry's `{count}` hole, if it takes one. */
  countKey?: keyof ResourceCounts
}

export const RESOURCE_ITEMS: readonly ResourceItem[] = [
  { id: "projects", href: "/projects", countKey: "projects" },
  { id: "courses", href: "/curriculums", countKey: "courses" },
  { id: "labs", href: "/games", countKey: "labs" },
  { id: "blog", href: "/blog", countKey: "articles" },
  { id: "ide", href: "/python-ide" },
  { id: "workshops", href: "/workshops" },
]

export type ResourceCounts = {
  projects: number
  courses: number
  labs: number
  articles: number
}

/**
 * Deep links worth surfacing for the adults who run a session. These are real
 * pages several levels down that nothing else on the site links to directly,
 * so listing them here also shortens their crawl path.
 */
export const TEACHER_LINKS: readonly {
  id: keyof Translations["resourcesPage"]["teachersLinks"]
  href: string
}[] = [
  { id: "pythonGuide", href: "/curriculums/intro-to-python/teacher-guide" },
  { id: "pythonWorksheets", href: "/curriculums/intro-to-python/worksheets" },
  { id: "engineering", href: "/courses/engineering-fundamentals" },
  { id: "robotics", href: "/courses/robotics" },
  { id: "host", href: "/host" },
  { id: "faq", href: "/faq" },
]
