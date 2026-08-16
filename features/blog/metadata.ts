import type { Metadata } from "next"
import { LOCALIZED_BLOG_DESCRIPTIONS } from "@/features/blog/localized-descriptions"
import { localizedBlogArticles, type BlogSlug } from "@/features/blog/posts"
import { type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

/** og:locale value per site language. */
export const OG_LOCALE_BY_LANGUAGE: Record<Language, string> = {
  en: "en_US",
  es: "es_US",
  zh: "zh_CN",
}

/**
 * Canonical English headline and meta description per post. Spanish and
 * Chinese descriptions live in features/blog/localized-descriptions.ts and are
 * resolved by getBlogPostDescription(); localized titles come from
 * localizedBlogArticles.
 */
export const BLOG_POST_META: Record<BlogSlug, { headline: string; description: string }> = {
  "5-easy-science-experiments": {
    headline: "5 Easy Science Experiments You Can Do at Home",
    description:
      "Try 5 easy science experiments at home using household items. Safe, fun, and educational activities for kids in grades 2 and up.",
  },
  "building-a-community-stem-workshops": {
    headline: "Building a Community: How Local STEM Workshops Change Lives",
    description:
      "See how free STEM workshops are changing lives in Hispanic communities in New Jersey and how to bring one to your neighborhood.",
  },
  "getting-started-with-lego-robotics": {
    headline: "Getting Started with LEGO Robotics: A Parent's Guide",
    description:
      "LEGO robotics kits make a great STEM introduction for kids. Learn which kit to choose, what your child will learn, and how to get started at home.",
  },
  "how-to-build-the-strongest-popsicle-stick-bridge": {
    headline: "How to Build the Strongest Popsicle Stick Bridge",
    description:
      "Learn the engineering secrets behind a strong popsicle stick bridge. Explore triangles, load paths, and joints in this step-by-step guide for young engineers.",
  },
  "math-games-that-make-learning-fun": {
    headline: "Math Games That Make Learning Fun",
    description:
      "Six math games that turn number practice into playtime for grades 2-5. Build number sense, fractions, and logic skills with no worksheets needed.",
  },
  "what-is-ai-explaining-to-kids": {
    headline: "What is AI? Explaining Artificial Intelligence to Kids",
    description:
      "Artificial intelligence explained for kids. Learn how AI learns from data, where it already lives in daily life, and how to think critically about it.",
  },
  "why-every-kid-should-learn-to-code": {
    headline: "Why Every Kid Should Learn to Code (And How to Start)",
    description:
      "Coding teaches problem-solving, creativity, and logic. Learn how to start your child with Python programming. No prior experience needed.",
  },
  "why-triangles-are-an-engineers-secret-weapon": {
    headline: "Why Triangles Are an Engineer's Secret Weapon",
    description:
      "The triangle is the strongest shape in engineering. Learn why bridges, trusses, and towers use them, and how to brace your own popsicle stick bridge.",
  },
  "how-engineers-think-when-something-breaks": {
    headline: "How Engineers Think When Something Breaks",
    description:
      "When a structure fails, it gives you information. Learn the engineering mindset that turns a broken build into a stronger second attempt.",
  },
  "design-a-mars-rover-out-of-cardboard": {
    headline: "Design a Mars Rover Out of Cardboard",
    description:
      "A hands-on engineering challenge for kids: design a cardboard Mars rover with real design goals, constraints, and reflection questions, just like NASA engineers face.",
  },
  "what-is-ai-actually-doing-when-it-answers-you": {
    headline: "What Is AI Actually Doing When It Answers You?",
    description:
      "AI does not search the internet or look up stored facts. It predicts likely text based on patterns. Here is what that means and why it can be wrong.",
  },
  "how-to-think-like-an-inventor-in-20-minutes": {
    headline: "How to Think Like an Inventor in 20 Minutes",
    description:
      "A 20-minute design challenge for kids: find a real problem, sketch a solution, build a rough prototype, and test it. The inventor loop we use in workshops.",
  },
  "why-your-first-design-is-usually-not-your-best-one": {
    headline: "Why Your First Design Is Usually Not Your Best One",
    description:
      "Engineering improves through testing, not perfect planning. See how one student group used a bridge test to work out exactly what they would change next.",
  },
  "the-engineering-of-a-backpack": {
    headline: "The Engineering of a Backpack",
    description:
      "Your backpack solves a dozen engineering problems at once. Explore how straps, zippers, materials, and pockets are all deliberate design decisions, not accidents.",
  },
  "what-makes-a-stem-workshop-fun": {
    headline: "What Makes a STEM Workshop Fun?",
    description:
      "A behind-the-scenes look at how Avanza STEM designs activities so students are actively building, testing, and discovering, not just watching someone else explain.",
  },
  "engineering-inside-school-bus": {
    headline: "The Secret Engineering Inside a School Bus",
    description:
      "A school bus is packed with engineering decisions. Learn how the color, seats, mirrors, turning radius, and emergency exits all work together to move kids safely.",
  },
  "why-airplane-wings-are-curved": {
    headline: "Why Are Airplane Wings Curved?",
    description:
      "Airplane wings are rounded on top and flatter underneath because that shape bends airflow and creates lift. Learn how an airfoil works and why wings keep a plane up.",
  },
  "how-elevators-know-where-to-go": {
    headline: "How Elevators Know Where to Go",
    description:
      "Elevators use buttons, sensors, motors, counterweights, and control logic to move people safely. Learn how the whole system works behind that simple button press.",
  },
  "why-buildings-sway-in-wind": {
    headline: "Why Do Buildings Sway in the Wind?",
    description:
      "Yes, tall buildings really do sway in the wind, and they are designed to. Learn how much skyscrapers move, why flexibility is safer, and what a tuned mass damper does.",
  },
  "engineering-behind-soccer-ball": {
    headline: "The Engineering Behind a Soccer Ball",
    description:
      "A soccer ball is a carefully engineered system. Shape, air pressure, panel design, and materials all affect how it rolls, bounces, and curves through the air.",
  },
  "why-manhole-covers-are-round": {
    headline: "Why Are Manhole Covers Round?",
    description:
      "Manhole covers are round because the shape is safe, strong, easy to move, and impossible to drop through the hole. One design solving multiple problems at once.",
  },
  "how-roller-coasters-stay-on-track": {
    headline: "How Roller Coasters Stay on the Track",
    description:
      "Roller coasters stay on the track using gravity, momentum, and wheels that grip the rail from three sides. Learn how they hold on even when upside down.",
  },
  "why-chairs-break": {
    headline: "Why Do Some Chairs Break and Others Don't?",
    description:
      "Chair strength comes down to weight distribution, material choice, joint quality, and shape. Learn why wobbly chairs are a warning sign and what engineers do about it.",
  },
  "hidden-engineering-water-bottle": {
    headline: "The Hidden Engineering of a Water Bottle",
    description:
      "Single-use plastic bottles are lightweight engineering marvels, but their PET design, cap threads, microplastics, and waste all come with trade-offs.",
  },
  "can-ai-actually-think": {
    headline: "Can AI Actually Think?",
    description:
      "AI can answer questions, write stories, and help you learn. But is it thinking? Learn how AI uses pattern recognition and why that is not a human brain.",
  },
  "why-ai-sometimes-gets-things-wrong": {
    headline: "Why AI Sometimes Gets Things Wrong",
    description:
      "AI makes predictions based on patterns. Learn why it can give confident but wrong answers, what hallucinations are, and how to fact-check what AI tells you.",
  },
  "how-does-your-phone-recognize-your-face": {
    headline: "How Does Your Phone Recognize Your Face?",
    description:
      "Your phone uses cameras, sensors, and machine learning to match face patterns, not to understand you. Learn how face recognition works and why privacy matters.",
  },
  "why-does-autocorrect-make-weird-mistakes": {
    headline: "Why Does Autocorrect Make Weird Mistakes?",
    description:
      "Autocorrect predicts words based on patterns. Learn why it changes correct words, struggles with names and slang, and how it is related to AI language prediction.",
  },
  "what-happens-when-you-ask-ai-a-question": {
    headline: "What Happens When You Ask AI a Question?",
    description:
      "When you ask AI a question it follows a process of prompts, training, and prediction. Learn each step from your question to the response and why clear prompts help.",
  },
  "should-kids-trust-everything-ai-says": {
    headline: "Should Kids Trust Everything AI Says?",
    description:
      "AI can be helpful and creative, but it can also be wrong. Learn how to think like a detective with AI, what topics need extra care, and how to protect your privacy.",
  },
  "how-do-video-games-use-ai": {
    headline: "How Do Video Games Use AI?",
    description:
      "Video games use AI to control enemy movement, NPC choices, and difficulty. Learn how behavior rules make characters feel smart and try designing your own game AI.",
  },
  "is-a-robot-the-same-thing-as-ai": {
    headline: "Is a Robot the Same Thing as AI?",
    description:
      "A robot is a physical machine. AI is software that makes decisions. They can work together but they are different. Learn about sensors, motors, and what each part does.",
  },
  "how-do-robots-know-where-they-are": {
    headline: "How Do Robots Know Where They Are?",
    description:
      "Robots use cameras, wheel sensors, GPS, lidar, and more to estimate their location. Learn how robots sense, map, and navigate the world around them.",
  },
  "why-robots-are-bad-at-easy-human-tasks": {
    headline: "Why Robots Are Bad at Easy Human Tasks",
    description:
      "Folding laundry and opening doors are simple for humans but very hard for robots. Learn why everyday tasks challenge robots and what engineers are doing about it.",
  },
  "what-makes-a-robot-a-robot": {
    headline: "What Makes a Robot a Robot?",
    description:
      "A robot uses sensors to notice, a controller to decide, and actuators to act. Learn the three parts that define a robot and why robots do not need to look human.",
  },
  "how-mars-rovers-drive-without-a-driver": {
    headline: "How Mars Rovers Drive Without a Driver",
    description:
      "Mars is too far away for remote control. Learn how rovers use cameras, wheels, instructions from Earth, and autonomous navigation to explore another planet.",
  },
  "why-robot-hands-are-so-hard-to-make": {
    headline: "Why Robot Hands Are So Hard to Make",
    description:
      "Gripping different objects requires movement, strength, gentleness, and touch all at once. Learn why robot hands are one of the hardest challenges in robotics.",
  },
  "how-factory-robots-build-cars": {
    headline: "How Factory Robots Build Cars",
    description:
      "Factory robots weld, paint, and move car parts with precision and consistency. Learn how robotic arms are programmed, kept safe, and used alongside human workers.",
  },
  "why-is-the-sky-blue-but-sunsets-are-orange": {
    headline: "Why Is the Sky Blue but Sunsets Are Orange?",
    description:
      "The sky looks blue during the day, but at sunset it turns orange or red. Learn how sunlight, air molecules, and scattering work together to create both colors.",
  },
  "why-do-your-ears-pop-on-an-airplane": {
    headline: "Why Do Your Ears Pop on an Airplane?",
    description:
      "Your ears pop on airplanes because air pressure changes as the plane climbs or lands. Learn how your eardrum and Eustachian tubes balance the pressure.",
  },
  "why-does-metal-feel-colder-than-wood": {
    headline: "Why Does Metal Feel Colder Than Wood?",
    description:
      "Metal and wood can be the same temperature, but metal feels colder because it pulls heat away from your hand much faster. Learn how thermal conductivity works.",
  },
  "why-do-bikes-stay-balanced-when-moving": {
    headline: "Why Do Bikes Stay Balanced When Moving?",
    description:
      "Bikes stay balanced because of motion, steering, wheel design, and constant tiny corrections from the rider. Learn the physics behind bicycle stability.",
  },
  "why-do-we-slip-on-ice": {
    headline: "Why Do We Slip on Ice?",
    description:
      "Ice is slippery because it has low friction, and a thin layer of water can make it even harder for your shoes to grip. Learn the science behind slipping.",
  },
  "how-do-noise-canceling-headphones-work": {
    headline: "How Do Noise-Canceling Headphones Work?",
    description:
      "Noise-canceling headphones use microphones and opposite sound waves to reduce unwanted noise before it reaches your ears. Learn the wave physics behind it.",
  },
  "why-do-some-things-float-and-others-sink": {
    headline: "Why Do Some Things Float and Others Sink?",
    description:
      "Whether something floats or sinks comes down to density, shape, and how much water it pushes aside. Learn why a steel ship floats but a small rock sinks.",
  },
  "why-do-magnets-stick-to-some-metals-but-not-others": {
    headline: "Why Do Magnets Stick to Some Metals but Not Others?",
    description:
      "Magnets stick to iron, steel, and nickel because tiny magnetic regions inside those metals line up. Learn why copper, aluminium, and gold are not magnetic at all.",
  },
}

/**
 * Article author per post.
 *
 * Seeded from the byline each English route declared in its inline BlogPosting
 * JSON-LD, then reconciled against features/blog/authors.ts (removed in commit
 * 991696c), which is the canonical source for these names. Three posts were
 * credited to "Logan" in the route markup but carried authorId "logan", whose
 * canonical name is "Logan Smith"; they now match. Centralising this also
 * means the /es and /zh variants credit the same person as the English page -
 * previously they all defaulted to "Liam Salcedo".
 */
export const BLOG_POST_AUTHORS: Record<BlogSlug, string> = {
  "5-easy-science-experiments": "Liam Salcedo",
  "building-a-community-stem-workshops": "Liam Salcedo",
  "getting-started-with-lego-robotics": "Liam Salcedo",
  "how-to-build-the-strongest-popsicle-stick-bridge": "Liam Salcedo",
  "math-games-that-make-learning-fun": "Liam Salcedo",
  "what-is-ai-explaining-to-kids": "Liam Salcedo",
  "why-every-kid-should-learn-to-code": "Liam Salcedo",
  "why-triangles-are-an-engineers-secret-weapon": "Logan Smith",
  "how-engineers-think-when-something-breaks": "Logan Smith",
  "design-a-mars-rover-out-of-cardboard": "Noah Lopez",
  "what-is-ai-actually-doing-when-it-answers-you": "Liam Salcedo",
  "how-to-think-like-an-inventor-in-20-minutes": "Liam Salcedo",
  "why-your-first-design-is-usually-not-your-best-one": "Logan Smith",
  "the-engineering-of-a-backpack": "Enqi Qi",
  "what-makes-a-stem-workshop-fun": "Liam Salcedo",
  "engineering-inside-school-bus": "Logan Smith",
  "why-airplane-wings-are-curved": "Noah Lopez",
  "how-elevators-know-where-to-go": "Liam Salcedo",
  "why-buildings-sway-in-wind": "Logan Smith",
  "engineering-behind-soccer-ball": "Noah Lopez",
  "why-manhole-covers-are-round": "Enqi Qi",
  "how-roller-coasters-stay-on-track": "Logan Smith",
  "why-chairs-break": "Enqi Qi",
  "hidden-engineering-water-bottle": "Enqi Qi",
  "can-ai-actually-think": "Liam Salcedo",
  "why-ai-sometimes-gets-things-wrong": "Liam Salcedo",
  "how-does-your-phone-recognize-your-face": "Liam Salcedo",
  "why-does-autocorrect-make-weird-mistakes": "Liam Salcedo",
  "what-happens-when-you-ask-ai-a-question": "Liam Salcedo",
  "should-kids-trust-everything-ai-says": "Liam Salcedo",
  "how-do-video-games-use-ai": "Liam Salcedo",
  "is-a-robot-the-same-thing-as-ai": "Liam Salcedo",
  "how-do-robots-know-where-they-are": "Noah Lopez",
  "why-robots-are-bad-at-easy-human-tasks": "Noah Lopez",
  "what-makes-a-robot-a-robot": "Noah Lopez",
  "how-mars-rovers-drive-without-a-driver": "Noah Lopez",
  "why-robot-hands-are-so-hard-to-make": "Noah Lopez",
  "how-factory-robots-build-cars": "Noah Lopez",
  "why-is-the-sky-blue-but-sunsets-are-orange": "Enqi Qi",
  "why-do-your-ears-pop-on-an-airplane": "Liam Salcedo",
  "why-does-metal-feel-colder-than-wood": "Noah Lopez",
  "why-do-bikes-stay-balanced-when-moving": "Logan Smith",
  "why-do-we-slip-on-ice": "Enqi Qi",
  "how-do-noise-canceling-headphones-work": "Liam Salcedo",
  "why-do-some-things-float-and-others-sink": "Enqi Qi",
  "why-do-magnets-stick-to-some-metals-but-not-others": "Noah Lopez",
}

/**
 * Publish and last-modified dates, taken from git history (first commit that
 * added the post, and the most recent commit that touched it). Article /
 * BlogPosting rich results require datePublished, which no post previously
 * emitted - the Search Console "Search appearance" report was empty.
 */
export const BLOG_POST_DATES: Record<BlogSlug, { datePublished: string; dateModified: string }> = {
  "5-easy-science-experiments": { datePublished: "2026-04-25", dateModified: "2026-06-17" },
  "building-a-community-stem-workshops": { datePublished: "2026-04-25", dateModified: "2026-06-17" },
  "getting-started-with-lego-robotics": { datePublished: "2026-04-25", dateModified: "2026-06-17" },
  "how-to-build-the-strongest-popsicle-stick-bridge": { datePublished: "2026-04-25", dateModified: "2026-06-17" },
  "math-games-that-make-learning-fun": { datePublished: "2026-04-25", dateModified: "2026-06-17" },
  "what-is-ai-explaining-to-kids": { datePublished: "2026-04-25", dateModified: "2026-06-17" },
  "why-every-kid-should-learn-to-code": { datePublished: "2026-04-25", dateModified: "2026-06-17" },
  "why-triangles-are-an-engineers-secret-weapon": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "how-engineers-think-when-something-breaks": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "design-a-mars-rover-out-of-cardboard": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "what-is-ai-actually-doing-when-it-answers-you": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "how-to-think-like-an-inventor-in-20-minutes": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-your-first-design-is-usually-not-your-best-one": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "the-engineering-of-a-backpack": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "what-makes-a-stem-workshop-fun": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "engineering-inside-school-bus": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-airplane-wings-are-curved": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "how-elevators-know-where-to-go": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-buildings-sway-in-wind": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "engineering-behind-soccer-ball": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-manhole-covers-are-round": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "how-roller-coasters-stay-on-track": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-chairs-break": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "hidden-engineering-water-bottle": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "can-ai-actually-think": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-ai-sometimes-gets-things-wrong": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "how-does-your-phone-recognize-your-face": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-does-autocorrect-make-weird-mistakes": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "what-happens-when-you-ask-ai-a-question": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "should-kids-trust-everything-ai-says": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "how-do-video-games-use-ai": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "is-a-robot-the-same-thing-as-ai": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "how-do-robots-know-where-they-are": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-robots-are-bad-at-easy-human-tasks": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "what-makes-a-robot-a-robot": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "how-mars-rovers-drive-without-a-driver": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-robot-hands-are-so-hard-to-make": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "how-factory-robots-build-cars": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-is-the-sky-blue-but-sunsets-are-orange": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-do-your-ears-pop-on-an-airplane": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-does-metal-feel-colder-than-wood": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-do-bikes-stay-balanced-when-moving": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-do-we-slip-on-ice": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "how-do-noise-canceling-headphones-work": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-do-some-things-float-and-others-sink": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
  "why-do-magnets-stick-to-some-metals-but-not-others": { datePublished: "2026-06-16", dateModified: "2026-06-17" },
}

/**
 * Resolves the meta description for a post in the requested language.
 *
 * Before this existed, /es/blog/* and /zh/blog/* rendered a localized <title>
 * over the English description from BLOG_POST_META, which is what Search
 * Console showed as ~3,300 localized impressions converting at ~0.4%.
 */
export function getBlogPostDescription(slug: BlogSlug, language: Language = "en"): string {
  if (language !== "en") {
    const localized = LOCALIZED_BLOG_DESCRIPTIONS[language]?.[slug]
    if (localized) return localized
  }
  return BLOG_POST_META[slug].description
}

export function generateBlogPostMetadata(slug: BlogSlug, language: Language = "en"): Metadata {
  const article =
    (language !== "en" ? localizedBlogArticles[language][slug] : undefined) ??
    localizedBlogArticles.en[slug]

  const description = getBlogPostDescription(slug, language)
  // The brand suffix is only worth the characters when the headline leaves
  // room for it. Spanish headlines in particular ran past 75 characters with
  // it appended, so the SERP truncated the headline itself; Google shows the
  // site name next to the title regardless.
  const title =
    article.title.length + 14 <= 60 ? `${article.title} - Avanza STEM` : article.title
  const path = `/blog/${slug}`
  const url = `${siteConfig.url}${localizedPath(path, language)}`
  const image = article.image ?? "/images/og-default-en.png"
  const imageAlt = article.imageAlt ?? article.title
  const { datePublished, dateModified } = BLOG_POST_DATES[slug]

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
      siteName: siteConfig.name,
      locale: OG_LOCALE_BY_LANGUAGE[language],
      type: "article",
      publishedTime: datePublished,
      modifiedTime: dateModified,
      authors: [BLOG_POST_AUTHORS[slug]],
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

const blogIndexMetadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    // 506 impressions at avg position 4.94 but only 0.4% CTR. The posts that
    // actually rank are everyday engineering and science explainers ("why do
    // buildings sway", "why are airplane wings curved"), which the previous
    // audience-first title did not signal.
    title: "STEM Blog: Everyday Engineering and Science Explained",
    description:
      "Short, clear answers to how things work: bridges, airplane wings, robots, magnets, and AI. Engineering and science explained for curious kids and their teachers.",
  },
  es: {
    title: "Blog STEM para Estudiantes Hispanos - Avanza STEM",
    description:
      "Respuestas claras sobre cómo funcionan las cosas: puentes, alas de avión, robots, imanes e IA. Ingeniería y ciencia explicadas para niños curiosos y sus maestros.",
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
