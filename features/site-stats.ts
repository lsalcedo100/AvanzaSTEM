import { projectCount } from "@/features/projects/data"

export const siteStats = {
  studentsReached: {
    to: 300,
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
    to: 20,
    suffix: "+",
  },
} as const
