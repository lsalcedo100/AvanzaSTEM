import { localizedBlogArticles } from "@/features/blog/posts"
import { COURSE_DESCRIPTORS } from "@/features/curriculums/structured-data"
import { interactiveLabCount } from "@/features/games/labs"
import { projectCount } from "@/features/projects/data"
import type { ResourceCounts } from "@/features/resources/catalog"

/**
 * How much of each kind of resource the site actually publishes.
 *
 * Every number is derived from the content data rather than written down, so
 * the hub page, its meta description and its JSON-LD all move the moment a
 * guide, course, lab or post is added. Called from server components only:
 * these imports pull in the full project and curriculum data.
 */
export function getResourceCounts(): ResourceCounts {
  return {
    projects: projectCount,
    courses: COURSE_DESCRIPTORS.length,
    labs: interactiveLabCount,
    articles: Object.keys(localizedBlogArticles.en).length,
  }
}
