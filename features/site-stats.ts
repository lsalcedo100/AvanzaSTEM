import { projectCount } from "@/features/projects/data"

export const siteStats = {
  studentsReached: {
    to: 120,
    suffix: "+",
  },
  curriculumTopics: {
    to: 6,
    suffix: "",
  },
  diyProjects: {
    to: projectCount,
    suffix: "",
  },
  workshopsHosted: {
    to: 12,
    suffix: "",
  },
} as const
