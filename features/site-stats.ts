import { projectCount } from "@/features/projects/data"

export const siteStats = {
  studentsReached: {
    to: 250,
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
    to: 15,
    suffix: "",
  },
} as const
