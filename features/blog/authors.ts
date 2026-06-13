export type AuthorId = "liam" | "enqi" | "logan" | "noah"

type AuthorInfo = { name: string; role: string; bio: string }

export const blogAuthors: Record<AuthorId, { en: AuthorInfo; es: AuthorInfo }> = {
  liam: {
    en: {
      name: "Liam Salcedo",
      role: "student founder",
      bio: "Liam founded Avanza STEM as a high school student and leads our coding and AI workshops at Clifton and Allwood libraries.",
    },
    es: {
      name: "Liam Salcedo",
      role: "fundador estudiante",
      bio: "Liam fundó Avanza STEM cuando era estudiante de preparatoria y dirige nuestros talleres de programación e inteligencia artificial en las bibliotecas de Clifton y Allwood.",
    },
  },
  enqi: {
    en: {
      name: "Enqi Qi",
      role: "Avanza STEM volunteer",
      bio: "Enqi volunteers with Avanza STEM and helps plan the science and math activities used in our workshop sessions.",
    },
    es: {
      name: "Enqi Qi",
      role: "voluntaria de Avanza STEM",
      bio: "Enqi es voluntaria de Avanza STEM y ayuda a planear las actividades de ciencias y matemáticas de nuestros talleres.",
    },
  },
  logan: {
    en: {
      name: "Logan Smith",
      role: "workshop mentor",
      bio: "Logan mentors students through hands-on engineering builds at Avanza STEM workshops, including our bridge and community sessions.",
    },
    es: {
      name: "Logan Smith",
      role: "mentor de talleres",
      bio: "Logan acompaña a los estudiantes en los proyectos de ingeniería práctica de los talleres de Avanza STEM, incluyendo las sesiones de puentes y comunidad.",
    },
  },
  noah: {
    en: {
      name: "Noah Lopez",
      role: "student volunteer",
      bio: "Noah is a student volunteer who helps run our robotics sessions and supports students building their first robot.",
    },
    es: {
      name: "Noah Lopez",
      role: "voluntario estudiante",
      bio: "Noah es voluntario estudiante y ayuda a dirigir las sesiones de robótica, apoyando a quienes construyen su primer robot.",
    },
  },
}
