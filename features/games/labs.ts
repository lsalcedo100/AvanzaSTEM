/**
 * The interactive labs on /games, as data.
 *
 * The games page used to hold this list inline in its component, which made it
 * the only place that knew how many labs exist. The /resources hub and the
 * page's own "12 activities" copy both need that number, so the grouping lives
 * here and the page renders from it.
 *
 * Every lab's visible strings follow the same convention in the dictionary:
 * a lab with id `atom` reads `t.gamesPage.atomName` and `t.gamesPage.atomTagline`.
 * Adding a lab means adding its id here and those two keys in every locale.
 */
export const LAB_GROUPS = [
  { id: "group-code", labs: ["python", "robot", "logic", "sort"] },
  { id: "group-build", labs: ["bridge", "tower", "catapult", "marble"] },
  { id: "group-science", labs: ["atom", "circuit", "density", "gravity"] },
] as const

export type LabGroupId = (typeof LAB_GROUPS)[number]["id"]
export type LabId = (typeof LAB_GROUPS)[number]["labs"][number]

/** Total number of interactive labs, used by /games copy and the /resources hub. */
export const interactiveLabCount = LAB_GROUPS.reduce(
  (total, group) => total + group.labs.length,
  0,
)
