import { projectCount } from "@/features/projects/data"

export const siteStats = {
  studentsReached: {
    to: 150,
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
    to: 13,
    suffix: "",
  },
} as const
