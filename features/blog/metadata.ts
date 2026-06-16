import type { Metadata } from "next"
import { localizedBlogArticles, type BlogSlug } from "@/features/blog/posts"
import { type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

/**
 * Per-post metadata used to render BlogPosting JSON-LD and generate page
 * metadata for locale-prefixed blog post routes (app/[locale]/blog/[slug]).
 * Headline/description are kept in English (matching the canonical BlogPosting
 * schema on the English routes); only the URL and language alternates vary.
 */
export const BLOG_POST_META: Record<BlogSlug, { headline: string; description: string; datePublished: string }> = {
  "5-easy-science-experiments": {
    headline: "5 Easy Science Experiments You Can Do at Home",
    description:
      "Try 5 easy science experiments at home using household items. Safe, fun, and educational activities for kids in grades 2 and up.",
    datePublished: "2025-06-15",
  },
  "building-a-community-stem-workshops": {
    headline: "Building a Community: How Local STEM Workshops Change Lives",
    description:
      "See how free STEM workshops are changing lives in Hispanic communities in New Jersey - and how to bring one to your neighborhood.",
    datePublished: "2025-07-26",
  },
  "getting-started-with-lego-robotics": {
    headline: "Getting Started with LEGO Robotics: A Parent's Guide",
    description:
      "LEGO robotics kits make a great STEM introduction for kids. Learn which kit to choose, what your child will learn, and how to get started at home.",
    datePublished: "2025-07-02",
  },
  "how-to-build-the-strongest-popsicle-stick-bridge": {
    headline: "How to Build the Strongest Popsicle Stick Bridge",
    description:
      "Learn the engineering secrets behind a strong popsicle stick bridge. Triangles, load paths, and joints - a step-by-step guide for young engineers.",
    datePublished: "2025-06-24",
  },
  "math-games-that-make-learning-fun": {
    headline: "Math Games That Make Learning Fun",
    description:
      "Six math games that turn number practice into playtime for grades 2-5. Build number sense, fractions, and logic skills - no worksheets needed.",
    datePublished: "2025-07-18",
  },
  "what-is-ai-explaining-to-kids": {
    headline: "What is AI? Explaining Artificial Intelligence to Kids",
    description:
      "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.",
    datePublished: "2025-07-10",
  },
  "why-every-kid-should-learn-to-code": {
    headline: "Why Every Kid Should Learn to Code (And How to Start)",
    description:
      "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming. No prior experience needed.",
    datePublished: "2025-06-07",
  },
  "why-triangles-are-an-engineers-secret-weapon": {
    headline: "Why Triangles Are an Engineer's Secret Weapon",
    description:
      "The triangle is the strongest shape in engineering. Learn why triangles are used in bridges, trusses, and towers - and how to use this in your popsicle stick bridge.",
    datePublished: "2025-08-04",
  },
  "how-engineers-think-when-something-breaks": {
    headline: "How Engineers Think When Something Breaks",
    description:
      "When a structure fails, it gives you information. Learn the engineering mindset that turns a broken build into a stronger second attempt.",
    datePublished: "2025-08-12",
  },
  "design-a-mars-rover-out-of-cardboard": {
    headline: "Design a Mars Rover Out of Cardboard",
    description:
      "A hands-on engineering challenge for kids: design a cardboard Mars rover with real design goals, constraints, and reflection questions - just like NASA engineers face.",
    datePublished: "2025-08-20",
  },
  "what-is-ai-actually-doing-when-it-answers-you": {
    headline: "What Is AI Actually Doing When It Answers You?",
    description:
      "AI does not search the internet or look up stored facts. It predicts likely text based on patterns. Here is what that means and why it can be wrong.",
    datePublished: "2025-08-28",
  },
  "how-to-think-like-an-inventor-in-20-minutes": {
    headline: "How to Think Like an Inventor in 20 Minutes",
    description:
      "A 20-minute design challenge for kids: find a real problem, sketch a solution, build a rough prototype, and test it. Learn the inventor loop Avanza STEM uses in workshops.",
    datePublished: "2025-09-05",
  },
  "why-your-first-design-is-usually-not-your-best-one": {
    headline: "Why Your First Design Is Usually Not Your Best One",
    description:
      "Engineering improves through testing and observation, not perfect planning. See how one student group used a bridge test to understand exactly what they would improve next.",
    datePublished: "2025-09-14",
  },
  "the-engineering-of-a-backpack": {
    headline: "The Engineering of a Backpack",
    description:
      "Your backpack solves a dozen engineering problems at once. Explore how straps, zippers, materials, and pockets are all deliberate design decisions - not accidents.",
    datePublished: "2025-09-22",
  },
  "what-makes-a-stem-workshop-fun": {
    headline: "What Makes a STEM Workshop Fun?",
    description:
      "A behind-the-scenes look at how Avanza STEM designs activities so students are actively building, testing, and discovering - not just watching someone else explain.",
    datePublished: "2025-10-08",
  },
  "engineering-inside-school-bus": {
    headline: "The Secret Engineering Inside a School Bus",
    description:
      "A school bus is packed with engineering decisions. Learn how the color, seats, mirrors, turning radius, and emergency exits all work together to move kids safely.",
    datePublished: "2025-10-16",
  },
  "why-airplane-wings-are-curved": {
    headline: "Why Are Airplane Wings Curved?",
    description:
      "Airplane wings are curved because shape controls airflow. Learn how the airfoil design creates lift and why the wings - not just the engines - keep a plane in the sky.",
    datePublished: "2025-10-25",
  },
  "how-elevators-know-where-to-go": {
    headline: "How Elevators Know Where to Go",
    description:
      "Elevators use buttons, sensors, motors, counterweights, and control logic to move people safely. Learn how the whole system works behind that simple button press.",
    datePublished: "2025-11-02",
  },
  "why-buildings-sway-in-wind": {
    headline: "Why Do Buildings Sway in the Wind?",
    description:
      "Tall buildings sway on purpose. Learn why flexibility makes skyscrapers safer in wind and earthquakes, and how engineers use tuned mass dampers to reduce motion.",
    datePublished: "2025-11-10",
  },
  "engineering-behind-soccer-ball": {
    headline: "The Engineering Behind a Soccer Ball",
    description:
      "A soccer ball is a carefully engineered system. Shape, air pressure, panel design, and materials all affect how it rolls, bounces, and curves through the air.",
    datePublished: "2025-11-18",
  },
  "why-manhole-covers-are-round": {
    headline: "Why Are Manhole Covers Round?",
    description:
      "Manhole covers are round because the shape is safe, strong, easy to move, and impossible to drop through the hole. One design solving multiple problems at once.",
    datePublished: "2025-11-26",
  },
  "how-roller-coasters-stay-on-track": {
    headline: "How Roller Coasters Stay on the Track",
    description:
      "Roller coasters use gravity, momentum, multi-sided wheel systems, and carefully shaped loops to stay on the track - even upside down. Here is how it all works.",
    datePublished: "2025-12-05",
  },
  "why-chairs-break": {
    headline: "Why Do Some Chairs Break and Others Don't?",
    description:
      "Chair strength comes down to weight distribution, material choice, joint quality, and shape. Learn why wobbly chairs are a warning sign and what engineers do about it.",
    datePublished: "2025-12-13",
  },
  "hidden-engineering-water-bottle": {
    headline: "The Hidden Engineering of a Water Bottle",
    description:
      "A water bottle solves more engineering problems than you might think. Shape, cap threads, wall thickness, opening size, and grip are all deliberate design decisions.",
    datePublished: "2025-12-21",
  },
  "can-ai-actually-think": {
    headline: "Can AI Actually Think?",
    description:
      "AI can answer questions, write stories, and help you learn. But is it actually thinking? Learn how AI uses pattern recognition and why it is not the same as a human brain.",
    datePublished: "2025-12-29",
  },
  "why-ai-sometimes-gets-things-wrong": {
    headline: "Why AI Sometimes Gets Things Wrong",
    description:
      "AI makes predictions based on patterns. Learn why it can give confident but wrong answers, what hallucinations are, and how to fact-check what AI tells you.",
    datePublished: "2026-01-06",
  },
  "how-does-your-phone-recognize-your-face": {
    headline: "How Does Your Phone Recognize Your Face?",
    description:
      "Your phone uses cameras, sensors, and machine learning to match face patterns, not to understand you. Learn how face recognition works and why privacy matters.",
    datePublished: "2026-01-15",
  },
  "why-does-autocorrect-make-weird-mistakes": {
    headline: "Why Does Autocorrect Make Weird Mistakes?",
    description:
      "Autocorrect predicts words based on patterns. Learn why it changes correct words, struggles with names and slang, and how it is related to AI language prediction.",
    datePublished: "2026-01-23",
  },
  "what-happens-when-you-ask-ai-a-question": {
    headline: "What Happens When You Ask AI a Question?",
    description:
      "When you ask AI a question it follows a process of prompts, training, and prediction. Learn each step from your question to the response and why clear prompts help.",
    datePublished: "2026-01-31",
  },
  "should-kids-trust-everything-ai-says": {
    headline: "Should Kids Trust Everything AI Says?",
    description:
      "AI can be helpful and creative, but it can also be wrong. Learn how to think like a detective with AI, what topics need extra care, and how to protect your privacy.",
    datePublished: "2026-02-08",
  },
  "how-do-video-games-use-ai": {
    headline: "How Do Video Games Use AI?",
    description:
      "Video games use AI to control enemy movement, NPC choices, and difficulty. Learn how behavior rules make characters feel smart and try designing your own game AI.",
    datePublished: "2026-02-16",
  },
  "is-a-robot-the-same-thing-as-ai": {
    headline: "Is a Robot the Same Thing as AI?",
    description:
      "A robot is a physical machine. AI is software that makes decisions. They can work together but they are different. Learn about sensors, motors, and what each part does.",
    datePublished: "2026-02-24",
  },
  "how-do-robots-know-where-they-are": {
    headline: "How Do Robots Know Where They Are?",
    description:
      "Robots use cameras, wheel sensors, GPS, lidar, and more to estimate their location. Learn how robots sense, map, and navigate the world around them.",
    datePublished: "2026-03-05",
  },
  "why-robots-are-bad-at-easy-human-tasks": {
    headline: "Why Robots Are Bad at Easy Human Tasks",
    description:
      "Folding laundry and opening doors are simple for humans but very hard for robots. Learn why everyday tasks challenge robots and what engineers are doing about it.",
    datePublished: "2026-03-13",
  },
  "what-makes-a-robot-a-robot": {
    headline: "What Makes a Robot a Robot?",
    description:
      "A robot uses sensors to notice, a controller to decide, and actuators to act. Learn the three parts that define a robot and why robots do not need to look human.",
    datePublished: "2026-03-21",
  },
  "how-mars-rovers-drive-without-a-driver": {
    headline: "How Mars Rovers Drive Without a Driver",
    description:
      "Mars is too far away for remote control. Learn how rovers use cameras, wheels, instructions from Earth, and autonomous navigation to explore another planet.",
    datePublished: "2026-03-29",
  },
  "why-robot-hands-are-so-hard-to-make": {
    headline: "Why Robot Hands Are So Hard to Make",
    description:
      "Gripping different objects requires movement, strength, gentleness, and touch — all at once. Learn why robot hands are one of the hardest challenges in robotics.",
    datePublished: "2026-04-06",
  },
  "how-factory-robots-build-cars": {
    headline: "How Factory Robots Build Cars",
    description:
      "Factory robots weld, paint, and move car parts with precision and consistency. Learn how robotic arms are programmed, kept safe, and used alongside human workers.",
    datePublished: "2026-04-14",
  },
  "why-is-the-sky-blue-but-sunsets-are-orange": {
    headline: "Why Is the Sky Blue but Sunsets Are Orange?",
    description:
      "The sky looks blue during the day, but at sunset it turns orange or red. Learn how sunlight, air molecules, and scattering work together to create both colors.",
    datePublished: "2026-04-23",
  },
  "why-do-your-ears-pop-on-an-airplane": {
    headline: "Why Do Your Ears Pop on an Airplane?",
    description:
      "Your ears pop on airplanes because air pressure changes as the plane climbs or lands. Learn how your eardrum and Eustachian tubes balance the pressure.",
    datePublished: "2026-05-01",
  },
  "why-does-metal-feel-colder-than-wood": {
    headline: "Why Does Metal Feel Colder Than Wood?",
    description:
      "Metal and wood can be the same temperature, but metal feels colder because it pulls heat away from your hand much faster. Learn how thermal conductivity works.",
    datePublished: "2026-05-09",
  },
  "why-do-bikes-stay-balanced-when-moving": {
    headline: "Why Do Bikes Stay Balanced When Moving?",
    description:
      "Bikes stay balanced because of motion, steering, wheel design, and constant tiny corrections from the rider. Learn the physics behind bicycle stability.",
    datePublished: "2026-05-17",
  },
  "why-do-we-slip-on-ice": {
    headline: "Why Do We Slip on Ice?",
    description:
      "Ice is slippery because it has low friction, and a thin layer of water can make it even harder for your shoes to grip. Learn the science behind slipping.",
    datePublished: "2026-05-25",
  },
  "how-do-noise-canceling-headphones-work": {
    headline: "How Do Noise-Canceling Headphones Work?",
    description:
      "Noise-canceling headphones use microphones and opposite sound waves to reduce unwanted noise before it reaches your ears. Learn the wave physics behind it.",
    datePublished: "2026-06-01",
  },
  "why-do-some-things-float-and-others-sink": {
    headline: "Why Do Some Things Float and Others Sink?",
    description:
      "Floating and sinking depend on density, shape, and how much water an object displaces. Learn why a steel ship floats while a small rock sinks.",
    datePublished: "2026-06-09",
  },
  "why-do-magnets-stick-to-some-metals-but-not-others": {
    headline: "Why Do Magnets Stick to Some Metals but Not Others?",
    description:
      "Magnets stick to iron, steel, and nickel because tiny magnetic regions inside those metals line up. Copper and aluminum don't work the same way.",
    datePublished: "2026-06-16",
  },
}

export function generateBlogPostMetadata(
  slug: BlogSlug,
  description: string,
  datePublished: string,
  language: Language = "en",
): Metadata {
  const article =
    (language !== "en" ? localizedBlogArticles[language][slug] : undefined) ??
    localizedBlogArticles.en[slug]

  const title = `${article.title} - Avanza STEM`
  const path = `/blog/${slug}`
  const url = `${siteConfig.url}${localizedPath(path, language)}`

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(path, language),
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: datePublished,
      authors: ["Liam Salcedo"],
      images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

const blogIndexMetadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: "STEM Blog for Hispanic Students - Avanza STEM",
    description:
      "STEM tips, tutorials, and how-to guides for young Hispanic students. Learn coding, science, engineering, and math in a fun and engaging way.",
  },
  es: {
    title: "Blog STEM para Estudiantes Hispanos - Avanza STEM",
    description:
      "Consejos STEM, ideas de actividades divertidas e inspiración para jóvenes estudiantes hispanos. Experimentos de ciencias, tutoriales de programación y proyectos de ingeniería en el blog de Avanza STEM.",
  },
  zh: {
    title: "STEM 博客 - Avanza STEM",
    description:
      "为西班牙裔学生和家庭提供 STEM 技巧、有趣活动创意和灵感。Avanza STEM 博客上的科学实验、编程教程和工程项目。",
  },
}

export function generateBlogIndexMetadata(language: Language = "en"): Metadata {
  const { title, description } = blogIndexMetadataByLanguage[language]
  return {
    title,
    description,
    alternates: {
      canonical: localizedPath("/blog", language),
      languages: languageAlternates("/blog"),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath("/blog", language)}`,
      type: "website",
      images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

export function getBlogJsonLd(language: Language = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Avanza STEM Blog",
    description: "STEM tips, activity ideas, and inspiration for young Hispanic students",
    url: `${siteConfig.url}${localizedPath("/blog", language)}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: language,
  }
}
