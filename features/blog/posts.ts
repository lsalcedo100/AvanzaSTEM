import type { AuthorId } from "@/features/blog/authors"

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "paragraphWithLink"; before: string; linkText: string; href: string; after: string }
  | { type: "list"; items: string[] }
  | { type: "numbered"; items: { title: string; body: string }[] }
  | { type: "callout"; text: string; title?: string; accent?: "green" | "orange" | "purple" | "teal" }
  | { type: "code"; title?: string; code: string; accent?: "green" | "orange" | "purple" | "teal" }
  | { type: "experiments"; items: Experiment[] }
  | { type: "games"; items: MathGame[] }
  | { type: "quote"; text: string; attribution: string }
  | { type: "youtube"; videoId: string; title: string; caption?: string }
  | { type: "ctaLink"; title?: string; text: string; linkText: string; href: string; accent?: "green" | "orange" | "purple" | "teal" }
  | {
      type: "summary"
      timeLabel: string
      time: string
      ageLabel: string
      age: string
      supervisionLabel: string
      supervision: string
      learnLabel: string
      learn: string
      safetyLabel?: string
      safety?: string
    }

export type BlogSection = {
  title: string
  blocks: BlogBlock[]
}

export type ArticleEndingLink = {
  href: string
  label: string
}

export type BlogArticle = {
  title: string
  category: string
  categoryColor: string
  date: string
  readTime: string
  authorId: AuthorId
  image: string
  imageAlt: string
  imageCaption: string
  imageFit?: "cover" | "contain"
  endingProject: ArticleEndingLink
  endingSecondary: ArticleEndingLink
  endingRelatedSlug: BlogSlug
  sections: BlogSection[]
}

export type Experiment = {
  number: number
  title: string
  category: string
  materialsLabel: string
  stepsLabel: string
  scienceLabel: string
  materials: string[]
  steps: string[]
  science: string
}

export type MathGame = {
  title: string
  gradeRange: string
  description: string
  howToPlayLabel: string
  whyItWorksLabel: string
  howToPlay: string[]
  whyItWorks: string
}

export type BlogSlug =
  | "why-every-kid-should-learn-to-code"
  | "5-easy-science-experiments"
  | "how-to-build-the-strongest-popsicle-stick-bridge"
  | "getting-started-with-lego-robotics"
  | "what-is-ai-explaining-to-kids"
  | "math-games-that-make-learning-fun"
  | "building-a-community-stem-workshops"
  | "why-triangles-are-an-engineers-secret-weapon"
  | "how-engineers-think-when-something-breaks"
  | "design-a-mars-rover-out-of-cardboard"
  | "what-is-ai-actually-doing-when-it-answers-you"
  | "how-to-think-like-an-inventor-in-20-minutes"
  | "why-your-first-design-is-usually-not-your-best-one"
  | "the-engineering-of-a-backpack"
  | "what-makes-a-stem-workshop-fun"
  | "engineering-inside-school-bus"
  | "why-airplane-wings-are-curved"
  | "how-elevators-know-where-to-go"
  | "why-buildings-sway-in-wind"
  | "engineering-behind-soccer-ball"
  | "why-manhole-covers-are-round"
  | "how-roller-coasters-stay-on-track"
  | "why-chairs-break"
  | "hidden-engineering-water-bottle"
  | "can-ai-actually-think"
  | "why-ai-sometimes-gets-things-wrong"
  | "how-does-your-phone-recognize-your-face"
  | "why-does-autocorrect-make-weird-mistakes"
  | "what-happens-when-you-ask-ai-a-question"
  | "should-kids-trust-everything-ai-says"
  | "how-do-video-games-use-ai"
  | "is-a-robot-the-same-thing-as-ai"
  | "how-do-robots-know-where-they-are"
  | "why-robots-are-bad-at-easy-human-tasks"
  | "what-makes-a-robot-a-robot"
  | "how-mars-rovers-drive-without-a-driver"
  | "why-robot-hands-are-so-hard-to-make"
  | "how-factory-robots-build-cars"
  | "why-is-the-sky-blue-but-sunsets-are-orange"
  | "why-do-your-ears-pop-on-an-airplane"
  | "why-does-metal-feel-colder-than-wood"
  | "why-do-bikes-stay-balanced-when-moving"
  | "why-do-we-slip-on-ice"
  | "how-do-noise-canceling-headphones-work"
  | "why-do-some-things-float-and-others-sink"
  | "why-do-magnets-stick-to-some-metals-but-not-others"

export type LocalizedBlogArticles = {
  en: Record<BlogSlug, BlogArticle>
  es: Partial<Record<BlogSlug, BlogArticle>>
  zh: Partial<Record<BlogSlug, BlogArticle>>
}

const common = {
  en: {
    dates: {
      feb20: "June 7, 2025",
      feb15: "June 15, 2025",
      feb10: "June 24, 2025",
      feb5: "July 2, 2025",
      jan28: "July 10, 2025",
      jan20: "July 18, 2025",
      jan12: "July 26, 2025",
      mar5: "August 4, 2025",
      mar12: "August 12, 2025",
      mar19: "August 20, 2025",
      mar26: "August 28, 2025",
      apr2: "September 5, 2025",
      apr9: "September 14, 2025",
      apr16: "September 22, 2025",
      apr23: "September 30, 2025",
      apr30: "October 8, 2025",
      may7: "October 16, 2025",
      may14: "October 25, 2025",
      may21: "November 2, 2025",
      may28: "November 10, 2025",
      jun4: "November 18, 2025",
      jun11: "November 26, 2025",
      jun18: "December 5, 2025",
      jun25: "December 13, 2025",
      jul2: "December 21, 2025",
      jul9: "December 29, 2025",
      jul16: "January 6, 2026",
      jul23: "January 15, 2026",
      jul30: "January 23, 2026",
      aug6: "January 31, 2026",
      aug13: "February 8, 2026",
      aug20: "February 16, 2026",
      aug27: "February 24, 2026",
      sep3: "March 5, 2026",
      sep10: "March 13, 2026",
      sep17: "March 21, 2026",
      sep24: "March 29, 2026",
      oct1: "April 6, 2026",
      oct8: "April 14, 2026",
      oct15: "April 23, 2026",
      oct22: "May 1, 2026",
      oct29: "May 9, 2026",
      nov5: "May 17, 2026",
      nov12: "May 25, 2026",
      nov19: "June 1, 2026",
      nov26: "June 9, 2026",
      dec3: "June 16, 2026",
    },
    minutes: { m3: "3 min", m4: "4 min", m5: "5 min", m6: "6 min", m7: "7 min" },
  },
  es: {
    dates: {
      feb20: "7 de junio de 2025",
      feb15: "15 de junio de 2025",
      feb10: "24 de junio de 2025",
      feb5: "2 de julio de 2025",
      jan28: "10 de julio de 2025",
      jan20: "18 de julio de 2025",
      jan12: "26 de julio de 2025",
      mar5: "4 de agosto de 2025",
      mar12: "12 de agosto de 2025",
      mar19: "20 de agosto de 2025",
      mar26: "28 de agosto de 2025",
      may7: "16 de octubre de 2025",
      may14: "25 de octubre de 2025",
      may21: "2 de noviembre de 2025",
      may28: "10 de noviembre de 2025",
      jun4: "18 de noviembre de 2025",
      jun11: "26 de noviembre de 2025",
      jun18: "5 de diciembre de 2025",
      jun25: "13 de diciembre de 2025",
      jul2: "21 de diciembre de 2025",
      jul9: "29 de diciembre de 2025",
      jul16: "6 de enero de 2026",
      jul23: "15 de enero de 2026",
      jul30: "23 de enero de 2026",
      aug6: "31 de enero de 2026",
      aug13: "8 de febrero de 2026",
      aug20: "16 de febrero de 2026",
      aug27: "24 de febrero de 2026",
      sep3: "5 de marzo de 2026",
      sep10: "13 de marzo de 2026",
      sep17: "21 de marzo de 2026",
      sep24: "29 de marzo de 2026",
      oct1: "6 de abril de 2026",
      oct8: "14 de abril de 2026",
      oct15: "23 de abril de 2026",
      oct22: "1 de mayo de 2026",
      oct29: "9 de mayo de 2026",
      nov5: "17 de mayo de 2026",
      nov12: "25 de mayo de 2026",
      nov19: "1 de junio de 2026",
      nov26: "9 de junio de 2026",
      dec3: "16 de junio de 2026",
    },
    minutes: { m3: "3 min", m4: "4 min", m5: "5 min", m6: "6 min", m7: "7 min" },
  },
  zh: {
    dates: {
      feb20: "2025 年 6 月 7 日",
      feb15: "2025 年 6 月 15 日",
      feb10: "2025 年 6 月 24 日",
      feb5: "2025 年 7 月 2 日",
      jan28: "2025 年 7 月 10 日",
      jan20: "2025 年 7 月 18 日",
      jan12: "2025 年 7 月 26 日",
      mar5: "2025 年 8 月 4 日",
      mar12: "2025 年 8 月 12 日",
      mar19: "2025 年 8 月 20 日",
      mar26: "2025 年 8 月 28 日",
      may7: "2025 年 10 月 16 日",
      may14: "2025 年 10 月 25 日",
      may21: "2025 年 11 月 2 日",
      may28: "2025 年 11 月 10 日",
      jun4: "2025 年 11 月 18 日",
      jun11: "2025 年 11 月 26 日",
      jun18: "2025 年 12 月 5 日",
      jun25: "2025 年 12 月 13 日",
      jul2: "2025 年 12 月 21 日",
      jul9: "2025 年 12 月 29 日",
      jul16: "2026 年 1 月 6 日",
      jul23: "2026 年 1 月 15 日",
      jul30: "2026 年 1 月 23 日",
      aug6: "2026 年 1 月 31 日",
      aug13: "2026 年 2 月 8 日",
      aug20: "2026 年 2 月 16 日",
      aug27: "2026 年 2 月 24 日",
      sep3: "2026 年 3 月 5 日",
      sep10: "2026 年 3 月 13 日",
      sep17: "2026 年 3 月 21 日",
      sep24: "2026 年 3 月 29 日",
      oct1: "2026 年 4 月 6 日",
      oct8: "2026 年 4 月 14 日",
      oct15: "2026 年 4 月 23 日",
      oct22: "2026 年 5 月 1 日",
      oct29: "2026 年 5 月 9 日",
      nov5: "2026 年 5 月 17 日",
      nov12: "2026 年 5 月 25 日",
      nov19: "2026 年 6 月 1 日",
      nov26: "2026 年 6 月 9 日",
      dec3: "2026 年 6 月 16 日",
    },
    minutes: { m3: "3 分钟", m4: "4 分钟", m5: "5 分钟", m6: "6 分钟", m7: "7 分钟" },
  },
}

export const localizedBlogArticles: LocalizedBlogArticles = {
  en: {
    "why-every-kid-should-learn-to-code": {
      title: "Why Every Kid Should Learn to Code (And How to Start)",
      category: "Coding",
      categoryColor: "bg-avanza-green",
      date: common.en.dates.feb20,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/workshops/upcoming-python.jpg",
      imageAlt: "An Avanza STEM mentor leading a coding workshop, with students seated at laptops",
      imageCaption: "Students learn the basics of coding during an Avanza STEM workshop session.",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-is-ai-explaining-to-kids",
      sections: [
        {
          title: "",
          blocks: [
            { type: "paragraph", text: "Coding is not just for tech professionals anymore. In 2026, understanding the logic behind code is becoming as foundational as reading and writing, yet many kids still never write a single line." },
            { type: "paragraph", text: "At our coding workshops at Clifton Public Library, we have watched a student write a program that does nothing more than print \"Hello\" - and then spend the next twenty minutes adding new questions, jokes, and sound effects to it. That moment is not just excitement; it is the realization that they can build things." },
          ],
        },
        {
          title: "It Is Not Really About Code",
          blocks: [
            { type: "paragraph", text: "The goal is not simply to produce programmers. The real value is in the thinking patterns that coding develops:" },
            { type: "list", items: ["Decomposition - breaking a big problem into smaller pieces", "Pattern recognition - spotting repeated structures", "Abstraction - focusing on what matters", "Debugging - testing ideas and figuring out why they fail"] },
            { type: "paragraph", text: "These are the same skills used by engineers, scientists, writers, and entrepreneurs. A child who learns to debug a Python loop is also learning how to approach a failed experiment or a miscommunication." },
          ],
        },
        {
          title: "When Is the Right Age to Start?",
          blocks: [
            { type: "paragraph", text: "There is no single right answer, but this age-based guide helps:" },
            { type: "numbered", items: [
              { title: "Ages 5-7: unplugged and visual logic", body: "Board games and apps like ScratchJr teach sequencing without requiring typing." },
              { title: "Ages 8-11: block-based coding", body: "Scratch lets kids build real games and animations while removing typing as a barrier." },
              { title: "Ages 12+: text-based languages", body: "Python is readable, widely used, and a strong first real language." },
            ] },
          ],
        },
        {
          title: "How to Get Started at Home",
          blocks: [
            { type: "list", items: ["Create a free Scratch account and let them explore", "Watch a short beginner tutorial together", "Ask them to explain what their program does", "Let them get stuck; debugging is the skill", "Celebrate what they build, even if it is simple"] },
          ],
        },
        {
          title: "A Simple First Python Program",
          blocks: [
            { type: "paragraph", text: "If your child is ready to write code, open a browser-based editor like Replit or Trinket and try this:" },
            { type: "code", title: "Try This", accent: "green", code: "name = input(\"What is your name? \")\nprint(\"Hello, \" + name + \"! Welcome to coding.\")" },
            { type: "paragraph", text: "That is a real program: it collects input and responds. Add more questions and it can become a tiny chatbot or quiz game." },
            { type: "paragraphWithLink", before: "For a full walkthrough of this project, including how to turn it into a quiz, see our ", linkText: "first Python quiz game guide", href: "/projects/my-first-python-program", after: "." },
          ],
        },
        {
          title: "The Bigger Picture",
          blocks: [
            { type: "paragraph", text: "Hispanic students are underrepresented in computer science because of access, exposure, and encouragement, not ability." },
            { type: "paragraph", text: "Avanza STEM is about opening doors that should have been open all along." },
            { type: "quote", text: "He came home and immediately wanted to show me the program he wrote. He kept adding new lines to it for the rest of the night.", attribution: "Parent of a student at a Clifton Library coding workshop" },
            { type: "ctaLink", title: "Try a Free Workshop", text: "If your child wants to try a free in-person coding workshop, all materials are provided and no experience is required.", linkText: "See upcoming workshops", href: "/workshops", accent: "teal" },
          ],
        },
      ],
    },
    "5-easy-science-experiments": {
      title: "5 Easy Science Experiments You Can Do at Home",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.feb15,
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/blog/egg-experiment.jpg",
      imageAlt: "A close-up of an egg covered in carbon dioxide bubbles during a kitchen chemistry reaction",
      imageCaption: "Carbon dioxide bubbles form during a kitchen chemistry reaction - the same gas-producing reaction at work in several of these experiments.",
      endingProject: { href: "/projects/baking-soda-volcano", label: "Try this project: baking soda volcano" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "math-games-that-make-learning-fun",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You do not need a lab coat or expensive equipment to do real science. Many of the best experiments for kids use household items like vinegar, paper towels, and sparkling water." },
          { type: "paragraph", text: "Each experiment includes materials, steps, and a plain-language explanation so you can talk about what your child observed." },
          { type: "summary", timeLabel: "Time needed", time: "30-45 minutes for all five", ageLabel: "Best age range", age: "Ages 5 and up, with adult help for younger kids", supervisionLabel: "Adult supervision", supervision: "Yes - especially for the Egg in a Bottle experiment, which uses fire", learnLabel: "What kids will learn", learn: "chemical reactions, gas pressure, density, and capillary action", safetyLabel: "Safety note", safety: "An adult must light the match and supervise the egg experiment closely" },
        ] },
        { title: "", blocks: [{ type: "experiments", items: [
          { number: 1, title: "Baking Soda and Vinegar Volcano", category: "Chemistry", materialsLabel: "Materials", stepsLabel: "Steps", scienceLabel: "The Science", materials: ["1/2 cup baking soda", "1 cup white vinegar", "A few drops of dish soap", "Food coloring (optional)", "A cup or bowl"], steps: ["Put baking soda in the cup.", "Add dish soap and food coloring.", "Pour in vinegar and step back.", "Watch the foam erupt."], science: "Baking soda and vinegar react to produce carbon dioxide gas. Dish soap traps the bubbles and makes foam." },
          { number: 2, title: "Dancing Raisins", category: "Physics", materialsLabel: "Materials", stepsLabel: "Steps", scienceLabel: "The Science", materials: ["A clear glass", "Sparkling water or clear soda", "A handful of raisins"], steps: ["Fill the glass with sparkling water.", "Drop in a few raisins.", "Watch for several minutes."], science: "Carbon dioxide bubbles stick to the raisins, lift them up, pop at the surface, and let them sink again." },
          { number: 3, title: "Homemade Lava Lamp", category: "Chemistry & Physics", materialsLabel: "Materials", stepsLabel: "Steps", scienceLabel: "The Science", materials: ["A clear bottle", "Vegetable oil", "Water", "Alka-Seltzer tablets", "Food coloring"], steps: ["Fill the bottle mostly with oil.", "Add water and food coloring.", "Drop in a small tablet piece."], science: "Oil and water do not mix. Gas bubbles carry colored water upward, then release it so it falls again." },
          { number: 4, title: "Paper Towel Chromatography", category: "Chemistry", materialsLabel: "Materials", stepsLabel: "Steps", scienceLabel: "The Science", materials: ["Paper towel or coffee filter", "Washable markers", "A cup of water", "Scissors"], steps: ["Cut a paper strip.", "Draw a marker dot near the bottom.", "Dip only the bottom edge in water.", "Watch colors separate."], science: "Ink is made of multiple pigments. Water carries them up the paper at different speeds, separating the colors." },
          { number: 5, title: "The Egg in a Bottle", category: "Physics", materialsLabel: "Materials", stepsLabel: "Steps", scienceLabel: "The Science", materials: ["A peeled hard-boiled egg", "A glass bottle", "A small piece of paper", "Matches with adult supervision"], steps: ["Light the paper and drop it in the bottle.", "Place the egg on the opening.", "Watch the air pressure push it in."], science: "The flame heats air inside the bottle. When it cools, pressure drops inside and outside air pressure pushes the egg through." },
        ] }] },
        { title: "Making It Stick", blocks: [
          { type: "paragraph", text: "After each experiment, ask your child to draw what happened and write one sentence about why. Explaining it to someone else turns a fun moment into real understanding." },
          { type: "paragraphWithLink", before: "Want more detail on the Baking Soda and Vinegar Volcano? See our ", linkText: "full project guide", href: "/projects/baking-soda-volcano", after: " with photos and troubleshooting tips." },
          { type: "callout", title: "Workshop Connection", accent: "teal", text: "At our workshops, students have debated why the raisins kept sinking and rising in the Dancing Raisins experiment for almost ten minutes - longer than it took to set up. That kind of argument is exactly the goal." },
        ] },
      ],
    },
    "how-to-build-the-strongest-popsicle-stick-bridge": {
      title: "How to Build the Strongest Popsicle Stick Bridge",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.feb10,
      readTime: common.en.minutes.m6,
      authorId: "logan",
      image: "https://res.cloudinary.com/dw4uprmkk/image/upload/f_auto,q_auto:good,w_1600/gallery-00158.jpg",
      imageAlt: "Avanza STEM mentor and students standing beside a popsicle stick bridge holding a tall stack of books",
      imageCaption: "Students test how much weight a popsicle stick bridge can hold during an Avanza STEM engineering workshop.",
      endingProject: { href: "/projects/popsicle-stick-bridge", label: "Try this project: build a popsicle stick truss bridge" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "getting-started-with-lego-robotics",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Bridge competitions come down to geometry, load distribution, and joint quality, not just how many sticks or how much glue you use." },
          { type: "paragraphWithLink", before: "This post explains the engineering ideas behind strong bridges. For the full build guide, visit our ", linkText: "popsicle stick truss bridge project page", href: "/projects/popsicle-stick-bridge", after: "." },
        ] },
        { title: "Why Triangles Win Every Time", blocks: [
          { type: "paragraph", text: "Squares can deform into parallelograms, but triangles hold their shape unless a member bends or breaks. That is why trusses are built from connected triangles." },
          { type: "callout", title: "Key Insight", accent: "purple", text: "A square frame with one diagonal brace becomes two triangles, and that single stick can multiply the load the structure can handle." },
        ] },
        { title: "Understanding Load Paths", blocks: [
          { type: "list", items: ["The deck spreads weight across both side trusses", "Trusses carry force toward the supports", "The bottom chord is pulled in tension", "The top chord is squeezed in compression", "Diagonal members transfer force through the bridge"] },
          { type: "paragraph", text: "Strong designs reinforce the most loaded spots instead of adding sticks everywhere." },
        ] },
        { title: "The Five Things That Separate Strong Bridges from Weak Ones", blocks: [
          { type: "numbered", items: [
            { title: "Consistent joint quality", body: "Weak glue joints fail before the wood does, so let them cure fully." },
            { title: "Two matching side trusses", body: "If the sides differ, the weaker side takes more load and fails first." },
            { title: "Top lateral bracing", body: "Cross pieces prevent the side walls from leaning outward." },
            { title: "A proper deck", body: "A deck that shares load across both trusses is stronger than one-point loading." },
            { title: "Staggered triangles", body: "Overlapping triangles create a continuous load path." },
          ] },
        ] },
        { title: "Common Mistakes to Avoid", blocks: [
          { type: "list", items: ["Using too much glue", "Building two trusses at the same time instead of copying one good template", "Skipping lateral bracing", "Testing before glue cures", "Adding random sticks without understanding the weak spot"] },
        ] },
        { title: "The Strength-to-Weight Ratio Challenge", blocks: [
          { type: "paragraph", text: "Measure the bridge weight, then divide the load it held by the bridge weight. That ratio is the real engineering score." },
          { type: "paragraph", text: "At our workshops, student-built bridges typically weigh under 50 grams but hold 5 to 15 pounds before breaking - more than 50 times their own weight." },
          { type: "quote", text: "We started adding sticks only to the spot that broke last time, instead of everywhere. That is when our bridge actually got stronger.", attribution: "Student at an Avanza STEM bridge-building workshop" },
          { type: "callout", accent: "purple", text: "Our bridge-building workshop challenges students to optimize strength-to-weight ratio, which changes the whole strategy." },
        ] },
      ],
    },
    "getting-started-with-lego-robotics": {
      title: "Getting Started with LEGO Robotics: A Parent's Guide",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      date: common.en.dates.feb5,
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/workshops/upcoming-robotics.jpg",
      imageAlt: "Three students working together to build and program a LEGO robot",
      imageCaption: "Students collaborate on building and programming their first LEGO robot.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: LEGO SPIKE Prime Super Cleanup robot guide" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "why-every-kid-should-learn-to-code",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "LEGO robotics introduces engineering and programming at the same time. Students can see motors spin, sensors react, and code affect the real world." },
          { type: "paragraph", text: "At our robotics workshops, students often spend their entire first session just getting a robot to drive in a straight line - and the troubleshooting that takes is usually the best learning of the day." },
        ] },
        { title: "Why Robotics Is Different from Regular LEGO", blocks: [
          { type: "paragraph", text: "Classic LEGO creates a static model. LEGO robotics creates something that moves, senses, and responds through a programmable hub." },
          { type: "callout", title: "The Big Idea", accent: "green", text: "Robotics makes failure educational. When a robot does the wrong thing, the design or code gives you a puzzle to solve." },
        ] },
        { title: "Which LEGO Robotics Kit Is Right for Your Child?", blocks: [
          { type: "numbered", items: [
            { title: "LEGO SPIKE Essential (Ages 6-10)", body: "A guided, block-based entry kit for younger beginners." },
            { title: "LEGO SPIKE Prime (Ages 10-14)", body: "A common school kit with more sensors, motors, and advanced project options." },
            { title: "LEGO Mindstorms Robot Inventor", body: "Discontinued but still available, flexible, and worth considering if you find a good deal." },
          ] },
        ] },
        { title: "What Your Child Will Actually Learn", blocks: [
          { type: "list", items: ["Mechanical engineering basics", "Sensor logic", "Sequential and conditional programming", "Iterative design", "Teamwork and communication"] },
          { type: "quote", text: "It kept driving in circles, and it turned out one wheel was just loose. Once we found that, it felt like we had actually fixed something.", attribution: "Student at an Avanza STEM robotics workshop" },
        ] },
        { title: "Tips for Parents Who Are Not Engineers", blocks: [
          { type: "paragraph", text: "You do not need to know all the answers. Ask curious questions instead." },
          { type: "list", items: ["What did you want it to do?", "What happened instead?", "What would you change first?", "Can you make it do something different?"] },
        ] },
        { title: "First Projects to Try", blocks: [
          { type: "numbered", items: [
            { title: "Line follower", body: "Use a color sensor to follow a black line." },
            { title: "Obstacle avoider", body: "Use a distance sensor to turn before hitting an object." },
            { title: "Remote control", body: "Drive manually first, then recreate the movement with code." },
            { title: "Sorting machine", body: "Sort objects by color with a simple mechanism." },
          ] },
          { type: "paragraphWithLink", before: "For a guided first build with step-by-step instructions, see our ", linkText: "LEGO SPIKE Prime Super Cleanup robot guide", href: "/projects/lego-robot-builder", after: "." },
        ] },
        { title: "Beyond the Kit", blocks: [
          { type: "paragraph", text: "FIRST LEGO League is a natural next step for students ready for a team challenge." },
          { type: "ctaLink", title: "Build Your First Robot", text: "At our robotics workshops, students build and program their first robot from scratch. No experience is needed.", linkText: "See upcoming workshops", href: "/workshops", accent: "green" },
        ] },
      ],
    },
    "what-is-ai-explaining-to-kids": {
      title: "What is AI? Explaining Artificial Intelligence to Kids",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.jan28,
      readTime: common.en.minutes.m4,
      authorId: "liam",
      image: "/images/shared/ai-workshop.jpg",
      imageAlt: "Students working at computers during an Avanza STEM AI workshop, with diagrams on their screens",
      imageCaption: "Students explore AI concepts hands-on during an Avanza STEM workshop session.",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "why-every-kid-should-learn-to-code",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "AI already recommends videos, shapes social feeds, powers voice assistants, and filters email. Most kids use it long before they understand it." },
          { type: "paragraph", text: "Understanding AI is a form of literacy. Students should learn to ask what data a system learned from and whose perspective may be missing." },
        ] },
        { title: "Start With What Kids Already Know", blocks: [
          { type: "callout", accent: "teal", text: "When Spotify adds a new song to your playlist, how do you think it chose that song?" },
          { type: "paragraph", text: "That conversation leads naturally to pattern-finding, which is the core idea behind many AI systems. At our AI workshop sessions, we ask students this question before explaining anything, and their guesses are almost always close - which is exactly the point." },
        ] },
        { title: "A Simple Way to Explain How AI Learns", blocks: [
          { type: "paragraph", text: "AI learns from examples. Just as a child recognizes dogs after seeing many dogs, a machine learning model finds patterns in labeled examples." },
          { type: "callout", title: "The Technical Term", accent: "green", text: "This is supervised learning: the training examples include the correct answer." },
        ] },
        { title: "Types of AI Worth Explaining to Kids", blocks: [
          { type: "numbered", items: [
            { title: "Image recognition", body: "Used for face unlock, photo tagging, and medical scans." },
            { title: "Recommendation systems", body: "Used by Netflix, Spotify, YouTube, and social feeds." },
            { title: "Language models", body: "Systems that generate text by predicting likely word patterns." },
            { title: "Game-playing AI", body: "Programs that improve by playing and learning from results." },
          ] },
        ] },
        { title: "What AI Cannot Do (And Why That Matters)", blocks: [
          { type: "list", items: ["Recognize only patterns like the data it trained on", "Reflect bias in training data", "Give confident wrong answers", "Optimize a metric while missing the real goal"] },
          { type: "paragraph", text: "Teaching kids to ask what a system was trained on is a powerful critical-thinking habit." },
        ] },
        { title: "A Hands-On Activity: Train Your Own Image Classifier", blocks: [
          { type: "list", items: ["Go to teachablemachine.withgoogle.com", "Create two image classes", "Train with examples from your camera", "Test the model with a new pose", "Compare what happens with 5 examples versus 50"] },
          { type: "callout", accent: "teal", text: "This activity shows data collection, model training, inference, and data quality in about 10 minutes." },
          { type: "quote", text: "I trained it to tell my hand apart from my friend's hand, and it kept guessing wrong until we used more pictures. That is when it actually clicked for me.", attribution: "Student at an Avanza STEM AI workshop" },
        ] },
        { title: "Responsible AI: The Part Most Tutorials Skip", blocks: [
          { type: "paragraph", text: "Kids need more than tool tips. They need to know when to verify AI output, when not to rely on it, and who is responsible when systems cause harm." },
          { type: "paragraphWithLink", before: "If this is your child's first time building something with code, our ", linkText: "beginner Python project for kids", href: "/projects/my-first-python-program", after: " is a good next step." },
        ] },
      ],
    },
    "math-games-that-make-learning-fun": {
      title: "Math Games That Make Learning Fun",
      category: "Math",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.jan20,
      readTime: common.en.minutes.m3,
      authorId: "enqi",
      image: "/images/blog/abacus.jpg",
      imageAlt: "A colorful wooden abacus, a tool for building number sense",
      imageCaption: "A wooden abacus - one of many simple tools that help build number sense before kids ever see a worksheet.",
      endingProject: { href: "/games", label: "Try these games" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "5-easy-science-experiments",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Math anxiety often starts when math feels like worksheets, timed tests, and red marks. Games make the same skills feel playful." },
          { type: "paragraph", text: "These games are designed for grades 2 through 5 and require minimal materials." },
          { type: "summary", timeLabel: "Time needed", time: "10-20 minutes per game", ageLabel: "Best age range", age: "Grades 2-5 (ages 7-11)", supervisionLabel: "Adult supervision", supervision: "No - kids can play independently or with a family member", learnLabel: "What kids will learn", learn: "number sense, mental math, fractions, and estimation" },
        ] },
        { title: "", blocks: [{ type: "games", items: [
          { title: "Number War", gradeRange: "Grades 2-4", description: "A card game for number sense and comparison.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Remove face cards or assign values.", "Deal cards evenly.", "Each player flips a card.", "Higher card wins both.", "For multiplication, flip two cards and multiply."], whyItWorks: "It gives fast repetition without feeling like drill practice." },
          { title: "101 and Out", gradeRange: "Grades 3-5", description: "A dice game for mental addition and strategy.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Start at 0.", "Roll two dice.", "Add them or use one as tens and one as ones.", "Get close to 101 without going over."], whyItWorks: "The choice makes students think about place value." },
          { title: "Fraction Pizza", gradeRange: "Grades 3-5", description: "A hands-on game for fractions.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Cut paper circles into fraction pieces.", "Take turns drawing pieces.", "Complete one whole circle exactly.", "Skip a turn if a piece would go over."], whyItWorks: "Moving pieces builds intuition for equivalent fractions." },
          { title: "Target Number", gradeRange: "Grades 4-5", description: "A creative mental math challenge.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Pick five digits.", "Choose a target number.", "Use operations to reach it.", "Compare solutions."], whyItWorks: "It shows that math problems can have more than one path." },
          { title: "Twenty Questions Math Edition", gradeRange: "Grades 2-5", description: "A logic game with math vocabulary.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Think of a number.", "Ask yes/no math questions.", "Guess in as few questions as possible."], whyItWorks: "Vocabulary becomes useful because it helps players win." },
          { title: "Estimation Jar", gradeRange: "Grades 2-4", description: "A weekly estimation challenge.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Fill a jar with small objects.", "Everyone writes an estimate.", "Count together later.", "Closest estimate wins."], whyItWorks: "Low-stakes estimating builds number sense over time." },
        ] }] },
        { title: "A Note on Timed Practice", blocks: [
          { type: "paragraph", text: "Fluency comes from repeated exposure in low-stakes contexts. Games provide that exposure without triggering math anxiety." },
          { type: "paragraphWithLink", before: "Looking for more? Many of these games and other activities are on our ", linkText: "games page", href: "/games", after: "." },
          { type: "list", items: ["Start with games your child already likes", "Play alongside them", "Let them win sometimes early on", "Ask what they think before correcting", "End while they still want to continue"] },
          { type: "callout", title: "For Parents", accent: "orange", text: "In our family math nights, the games that get replayed most are the ones where a kid can beat an adult fair and square. Number War and 101 and Out both work well for that." },
          { type: "quote", text: "My daughter asked to play 101 and Out three nights in a row. I never told her it was math practice.", attribution: "Parent from an Avanza STEM family math night" },
        ] },
      ],
    },
    "building-a-community-stem-workshops": {
      title: "Building a Community: How Local STEM Workshops Change Lives",
      category: "Community",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.jan12,
      readTime: common.en.minutes.m7,
      authorId: "logan",
      image: "/images/blog/community-workshop.jpg",
      imageAlt: "Families and students gathering at the library for an Avanza STEM community event",
      imageCaption: "Families gather at the library for an Avanza STEM community workshop series.",
      endingProject: { href: "/host", label: "Host a workshop in your community" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "getting-started-with-lego-robotics",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "The hardest part of starting Avanza STEM was believing that showing up to a library with materials and a laptop could matter." },
          { type: "paragraph", text: "After programs at Clifton Public Library, Allwood Branch Library, Library of the Chathams, and Roseland Free Public Library reaching more than 70 students, the answer is clear: it matters because students see that STEM belongs to them too." },
        ] },
        { title: "What a Workshop Actually Looks Like", blocks: [
          { type: "paragraph", text: "Our current format is a three-week series covering engineering, coding, and AI. Each session is free and requires no prior experience." },
          { type: "paragraph", text: "Students build, write Python, and train simple AI models while connecting each activity to real STEM ideas." },
        ] },
        { title: "Why Libraries Are the Right Venue", blocks: [
          { type: "paragraph", text: "Libraries are trusted community spaces committed to free public learning." },
          { type: "list", items: ["No cost to attend", "A familiar and safe space", "A real relationship with the community", "Flexible rooms and technology", "Access for students from multiple schools"] },
        ] },
        { title: "What We Have Seen in the Room", blocks: [
          { type: "paragraph", text: "The best moments are students adding questions to their Python games, families seeing this programming in their neighborhood for the first time, and kids arguing productively about science." },
          { type: "quote", text: "We had a parent tell us her daughter asked to come back the next week before the session was even over. That is when we knew this was working.", attribution: "Librarian at Allwood Branch Library" },
          { type: "paragraph", text: "When curiosity is taken seriously, students are more likely to seek out more learning." },
        ] },
        { title: "The Representation Problem - and Why It Is Ours to Solve", blocks: [
          { type: "paragraph", text: "Hispanic students remain underrepresented in STEM because of gaps in exposure, mentorship, encouragement, and access." },
          { type: "callout", title: "The Gap We Are Trying to Close", accent: "purple", text: "Visibility is a structural factor in who feels invited into STEM." },
        ] },
        { title: "How to Bring a Workshop to Your Community", blocks: [
          { type: "numbered", items: [
            { title: "Identify a venue", body: "Libraries, community centers, churches, and schools can all work." },
            { title: "Connect with us", body: "We can discuss curriculum, materials, and promotion." },
            { title: "Promote locally", body: "Community groups, flyers, and local partners help reach families." },
            { title: "Show up consistently", body: "Trust grows over time." },
          ] },
        ] },
        { title: "What Comes Next", blocks: [
          { type: "paragraph", text: "Our goal is to expand to more library branches and community centers and share a model others can replicate." },
          { type: "ctaLink", title: "Host a Workshop", text: "Want to bring a free STEM program to your library, school, or community center?", linkText: "Get in touch about hosting a workshop", href: "/host", accent: "purple" },
          { type: "ctaLink", text: "Want to see what a session looks like first?", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "why-triangles-are-an-engineers-secret-weapon": {
      title: "Why Triangles Are an Engineer's Secret Weapon",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.mar5,
      readTime: common.en.minutes.m5,
      authorId: "logan",
      image: "/images/blog/Triangles-Strongest.jpg",
      imageAlt: "Students examining a completed popsicle stick truss bridge at an Avanza STEM engineering workshop",
      imageCaption: "Students at an Avanza STEM workshop inspect a truss bridge. The triangles in the design are not decorative - they are why the bridge holds weight.",
      endingProject: { href: "/projects/popsicle-stick-bridge", label: "Try this project: build a popsicle stick truss bridge" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "how-to-build-the-strongest-popsicle-stick-bridge",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "At Avanza STEM engineering workshops, one of the most common questions students ask when they see a strong bridge is: why does that design work? The answer almost always comes back to one shape: the triangle." },
          { type: "paragraph", text: "This is not just a rule to memorize. Once you understand why triangles are so special, you start seeing them everywhere - in bridges, in towers, in bicycle frames, in rooftops, in roller coasters." },
        ] },
        { title: "The Problem With Squares", blocks: [
          { type: "paragraph", text: "Imagine building a square frame from four sticks and some tape. If you push on one corner, the frame leans sideways and changes into a diamond shape. This is called deformation, and it happens because a square has four joints that can rotate." },
          { type: "callout", title: "The Key Difference", accent: "purple", text: "A triangle has three sides and three corners. You cannot change the shape of a triangle without bending or breaking one of the sides. That is what makes it rigid." },
          { type: "paragraph", text: "This is why a square is the wrong shape for a load-bearing structure, and a triangle is the right one." },
        ] },
        { title: "What Happens When You Add One Diagonal", blocks: [
          { type: "paragraph", text: "Here is a trick that uses this idea: take a square frame and add one stick diagonally across the middle. You now have two triangles, and the structure becomes dramatically stronger." },
          { type: "paragraph", text: "That single added stick does not just reinforce the square - it splits it into two triangles, and the whole thing becomes rigid. At our popsicle stick bridge workshops, students who add diagonal bracing to a square panel see a noticeable difference in how much weight the panel can handle before it fails." },
          { type: "callout", accent: "purple", text: "The difference between a weak frame and a strong one can be a single diagonal stick. That is the whole idea behind triangulation." },
        ] },
        { title: "Why Triangles Show Up Everywhere in Engineering", blocks: [
          { type: "paragraph", text: "Once you understand rigid shapes, you can spot triangles being used for structural strength all around you." },
          { type: "list", items: [
            "Truss bridges: the classic bridge design uses a connected sequence of triangles to carry load",
            "The Eiffel Tower: built from lattice triangles so it can flex in wind without collapsing",
            "Bicycle frames: a triangle (the main frame triangle) is built into almost every bike",
            "Rooftop rafters: the A-shape of a pitched roof creates a strong triangle",
            "Construction cranes: the boom uses a triangular lattice to carry enormous loads",
            "Roller coasters: the support structure is triangulated to handle rapid direction changes and rider weight",
          ] },
        ] },
        { title: "The Science Behind It: How Forces Move Through Triangles", blocks: [
          { type: "numbered", items: [
            { title: "Triangles convert forces into tension and compression", body: "When a load pushes down on a triangle, each member either gets pulled (tension) or squeezed (compression). There is no bending - and bending is what breaks things." },
            { title: "Every side of a triangle shares the load", body: "A square frame concentrates stress at the corners. A triangle spreads force along all three sides at once." },
            { title: "The shape stays fixed", body: "As long as no member fails, the triangle cannot change shape under load. The square cannot say the same." },
          ] },
        ] },
        { title: "Try It Yourself", blocks: [
          { type: "paragraph", text: "You do not need a lab for this. Get four popsicle sticks and some tape." },
          { type: "list", items: [
            "Make a square: tape four sticks end to end. Push one corner. Notice how it leans.",
            "Add a fifth stick diagonally across the middle. Push the same corner. Notice how it holds.",
            "Try making a three-stick triangle instead. Compare how much more stable it feels.",
            "Connect multiple triangles in a row and see what you can build.",
          ] },
          { type: "callout", accent: "purple", text: "At our bridge workshops, the strongest bridges are always the ones built around a connected series of triangles. Students who understand why build better bridges - and they know what to fix when one fails." },
        ] },
        { title: "What This Means for Your Bridge", blocks: [
          { type: "paragraphWithLink", before: "If you are working on a popsicle stick bridge and want step-by-step build instructions, our ", linkText: "popsicle stick bridge project guide", href: "/projects/popsicle-stick-bridge", after: " explains how to construct a full truss bridge using these principles." },
          { type: "ctaLink", title: "Build a Truss Bridge", text: "At our engineering workshops, students build popsicle stick bridges and test how much weight a triangulated truss can hold.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "how-engineers-think-when-something-breaks": {
      title: "How Engineers Think When Something Breaks",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.mar12,
      readTime: common.en.minutes.m4,
      authorId: "logan",
      image: "/images/blog/Failed Bridge.jpeg",
      imageAlt: "Students testing a failed bridge with books during an Avanza STEM engineering workshop",
      imageCaption: "A structure that just failed is not a loss - it is data. Students examine where and why the break happened before thinking through the next improvement.",
      imageFit: "contain",
      endingProject: { href: "/projects/popsicle-stick-bridge", label: "Try this project: build a popsicle stick bridge" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "At Avanza STEM engineering workshops, something breaks at almost every session. A bridge collapses under weight. A tower falls when a block is added. A cardboard structure tips over. And almost every time, the student who built it knows exactly what went wrong the moment it happens." },
          { type: "paragraph", text: "That moment of understanding - 'oh, it broke right at the joint, because I did not glue it well enough' - is the most important moment in the whole session. It is not a failure. It is information." },
          { type: "youtube", videoId: "xPp8R64YEHQ", title: "How engineers think when something breaks", caption: "A quick look at the mindset engineers use when a design fails." },
        ] },
        { title: "The First Question an Engineer Asks", blocks: [
          { type: "paragraph", text: "When something breaks, the first engineering question is not 'what did I do wrong?' It is: 'where did it break, and what does that tell me?'" },
          { type: "paragraph", text: "A bridge that snaps in the middle tells you the middle was the weakest point. A joint that pulls apart tells you the connection was not strong enough. The break is giving you instructions for the next build." },
          { type: "callout", title: "Engineering Framing", accent: "purple", text: "A structure that broke is useful. A structure that was never tested tells you nothing." },
        ] },
        { title: "The Improve Loop", blocks: [
          { type: "paragraph", text: "Engineers use an iterative cycle - sometimes called the design loop. It is not a straight line from idea to success. It looks more like this:" },
          { type: "numbered", items: [
            { title: "Define the goal", body: "What exactly does the structure need to do? Hold 5 pounds? Span 30 centimeters? Weigh as little as possible?" },
            { title: "Build a first version", body: "Do not try to make it perfect on the first try. Make it testable." },
            { title: "Test it deliberately", body: "Apply the actual load or stress. Do not guess how it will do." },
            { title: "Observe what failed", body: "Not just that it failed - but where and how. That detail is the data." },
            { title: "Make one change at a time", body: "If you change three things and the next version is better, you do not know which change helped." },
            { title: "Test again", body: "Repeat. Each round gives you more information than the last." },
          ] },
        ] },
        { title: "What This Looks Like at Avanza STEM Workshops", blocks: [
          { type: "paragraph", text: "During bridge-building sessions, students usually build once and then test their structure. That single test still teaches a lot. When the bridge bends, twists, or finally breaks, students can see which part of the design carried the most stress." },
          { type: "paragraph", text: "The important moment is the conversation after the test: where did it fail, why did that spot give out, and what would you reinforce if you built a second version?" },
          { type: "callout", accent: "purple", text: "Even one build can teach the full engineering mindset: make a design, test it honestly, study the result, and explain what the next version would change." },
        ] },
        { title: "The One Change Rule", blocks: [
          { type: "paragraph", text: "This rule matters more than most students realize: when something breaks, change only one thing at a time before the next test." },
          { type: "paragraph", text: "If a bridge breaks and you rebuild it with better joints AND a different truss shape AND more bracing, you learn very little. Maybe it holds more weight - but you do not know which change made the difference, so you cannot apply that knowledge to the next build." },
          { type: "callout", accent: "purple", text: "Change one thing. Test. Observe. Then change the next thing. This is how engineers find out what actually works instead of getting lucky." },
        ] },
        { title: "This Thinking Works Everywhere", blocks: [
          { type: "paragraph", text: "The engineering mindset is not only for structures. The same pattern of observe, hypothesize, test, and improve shows up everywhere:" },
          { type: "list", items: [
            "Science: a failed experiment tells you something specific about the conditions or your hypothesis",
            "Coding: a program that crashes gives you an error message - read it carefully before you change anything",
            "Math: a wrong answer tells you which step to go back and review, not that you are bad at math",
            "Sports: a missed shot shows you what to adjust in your stance or timing - not that you should quit",
          ] },
          { type: "ctaLink", title: "Join a Free Engineering Workshop", text: "At our engineering workshops, students build, test, and use the results to make better design choices.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "design-a-mars-rover-out-of-cardboard": {
      title: "Design a Mars Rover Out of Cardboard",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.mar19,
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/blog/Cardboard Mars Rover.jpeg",
      imageAlt: "Students working on a hands-on engineering design challenge at an Avanza STEM workshop",
      imageCaption: "Engineering challenges at Avanza STEM start with a design brief and constraints, then end with a real test.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/projects/popsicle-stick-bridge", label: "See this project: popsicle stick bridge" },
      endingRelatedSlug: "how-engineers-think-when-something-breaks",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "NASA's Mars rovers have to work 140 million miles from the nearest repair shop. If a wheel breaks or a sensor fails, there is no one to fix it. Every design decision accounts for that." },
          { type: "paragraph", text: "You will not be designing for 140 million miles today - but you will be working with the same kinds of constraints: limited materials, weight limits, rough terrain, and the requirement that your rover actually functions when tested." },
        ] },
        { title: "The Mission Brief", blocks: [
          { type: "callout", title: "Your Mission", accent: "purple", text: "Design a Mars rover out of cardboard, tape, and basic materials. Your rover must carry a small payload, move across rough terrain, and survive a drop test. You have 45 minutes." },
        ] },
        { title: "What You Need", blocks: [
          { type: "list", items: [
            "Cardboard (cereal boxes, delivery boxes, any flat cardboard)",
            "Duct tape or masking tape",
            "Scissors",
            "Cardboard tubes (paper towel or toilet paper rolls)",
            "Straws",
            "Small paper cups",
            "Optional: brass fasteners, rubber bands, a ruler",
          ] },
        ] },
        { title: "Your Design Goals", blocks: [
          { type: "paragraph", text: "Real engineers get tested against specific requirements. Here are yours:" },
          { type: "numbered", items: [
            { title: "Carry a payload", body: "Your rover must hold a small cup with 3 quarters or 3 small rocks on top without tipping over." },
            { title: "Clear terrain", body: "Your rover must roll over a piece of crumpled notebook paper without getting stuck or stopping." },
            { title: "Survive a drop", body: "Drop from knee height. The rover must stay in one piece and still roll afterward." },
            { title: "Bonus - the arm", body: "Add a piece that extends outward from the body, like a rover arm, that can 'reach' down toward a surface without the whole rover moving." },
          ] },
        ] },
        { title: "Your Design Constraints", blocks: [
          { type: "paragraph", text: "Real engineering always has constraints. Working within them is the job. These are yours:" },
          { type: "list", items: [
            "Maximum size: must fit inside a shoebox",
            "No hot glue - tape and fasteners only",
            "Wheels must be round (any size, but actually round)",
            "Maximum build time: 45 minutes",
            "You must be able to explain one design decision before testing",
          ] },
        ] },
        { title: "Engineering Questions to Think Through Before You Build", blocks: [
          { type: "numbered", items: [
            { title: "How many wheels?", body: "Four wheels offer more stability than three. But more wheels mean more weight and more parts to break. Real rovers use six - each one independently connected so one wheel hitting a rock does not tip the whole vehicle." },
            { title: "Where is the weight?", body: "Weight up high makes the rover easy to tip. Weight low keeps it stable. Put heavy parts as close to the ground as possible." },
            { title: "How wide is the wheelbase?", body: "The distance between the left and right wheels is called the track width. Wider track means harder to tip sideways. Narrower track fits through tighter spaces." },
            { title: "What happens when one wheel hits a bump?", body: "If your axle is rigid, a bump on one wheel lifts the entire side. Real rovers use rocker-bogie suspension so each wheel moves independently. Can you make something like that from cardboard and tape?" },
          ] },
        ] },
        { title: "Test It, Then Ask These Questions", blocks: [
          { type: "list", items: [
            "Did it tip during the payload test? Where is the weight concentrated?",
            "Did it get stuck on the crumpled paper? Did a wheel sink, or did the body drag?",
            "Did it survive the drop? Which part failed first?",
            "What is the single change you would make if you had ten more minutes?",
          ] },
          { type: "paragraph", text: "Write down or sketch your answers. That record is what separates a first build from a better second build." },
          { type: "quote", text: "One student added a ramp on the front of his rover using a bent strip of cardboard - he said it was for pushing rocks out of the way. I asked if he had seen that on a real rover. He said no, he just thought it would help. That is the right kind of thinking.", attribution: "Noah Lopez, Avanza STEM mentor" },
        ] },
        { title: "The Real Rover Connection", blocks: [
          { type: "paragraph", text: "Perseverance, NASA's current Mars rover, weighs about 1,025 kilograms and has six wheels designed to each move independently. It carries cameras, a microphone, a drill, and a helicopter called Ingenuity. Every part had to be light enough to launch, strong enough to land, and reliable enough to operate for years without anyone nearby to repair it." },
          { type: "paragraph", text: "The design questions you are working through - weight distribution, wheel count, terrain clearance, payload capacity - are the same categories of question real rover engineers answer, just at very different scales." },
          { type: "ctaLink", title: "Try Engineering in Person", text: "At our workshops, students work through design challenges like this one and test their builds against real constraints.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "what-is-ai-actually-doing-when-it-answers-you": {
      title: "What Is AI Actually Doing When It Answers You?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.mar26,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/What AI actually does.jpg",
      imageAlt: "A glowing AI graphic above a tablet with digital network lines in the background",
      imageCaption: "At Avanza STEM AI workshops, students learn to ask what an AI is actually doing - not just whether the answer sounds right.",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-is-ai-explaining-to-kids",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "When you type a question into an AI chat tool and it answers you in a few seconds, what actually happened? A lot of people assume AI searched the internet, or retrieved an answer from a database, or consulted some kind of stored knowledge. None of those things are quite right." },
          { type: "paragraph", text: "The more accurate answer is that the AI predicted what text should come next, one word at a time, based on patterns in enormous amounts of data it was trained on. That is a stranger and more interesting answer than most people expect." },
        ] },
        { title: "It Is Closer to Autocomplete Than a Search Engine", blocks: [
          { type: "callout", accent: "teal", text: "Think about the autocomplete on your phone. It suggests the next word based on what words usually follow in messages like yours. A language model does something similar, but far more sophisticated and at much larger scale." },
          { type: "paragraph", text: "When an AI generates a response, it is not retrieving a stored answer. It is calculating which word is most likely to come next, given everything that came before it. Then it repeats that process, word by word, until the response is done." },
          { type: "paragraph", text: "This is why AI can generate responses so quickly. It is not thinking through the problem the way you would. It is running a very fast pattern-matching calculation." },
        ] },
        { title: "How the AI Learned What to Say", blocks: [
          { type: "numbered", items: [
            { title: "Trained on text", body: "Language models are trained on large amounts of written text - articles, books, websites, code, and more. This exposed the model to billions of examples of how language is used." },
            { title: "Learned patterns", body: "The model learned statistical patterns: after this combination of words, these words tend to follow. The patterns are too complex to describe simply, but they are patterns, not rules a person wrote." },
            { title: "Got feedback", body: "The model then received ratings from people who evaluated which responses were more helpful, accurate, and appropriate. The model adjusted based on that feedback." },
            { title: "Generates responses", body: "When you ask a question, the model uses those patterns to generate a response that matches what a helpful answer looks like - based on what it has seen in training." },
          ] },
        ] },
        { title: "Why It Can Sound Right and Be Wrong", blocks: [
          { type: "paragraph", text: "Because AI generates statistically likely text rather than verified facts, it can produce responses that sound confident and authoritative but contain errors. This is sometimes called a hallucination - when the AI states something that is not true, in a way that sounds like it is." },
          { type: "list", items: [
            "The AI does not know what it does not know",
            "It may mix up similar names, dates, or events from different contexts",
            "It generates what sounds plausible, not what has been verified",
            "It cannot look something up in real time to check its own answer",
          ] },
          { type: "callout", title: "The Honest Version", accent: "teal", text: "An AI that says 'I am not sure about this' is more useful than one that sounds completely confident every time. Ask follow-up questions and verify claims that matter." },
        ] },
        { title: "What AI Is Actually Good At", blocks: [
          { type: "paragraph", text: "Understanding the limitations helps you use AI effectively instead of either over-trusting it or avoiding it entirely." },
          { type: "list", items: [
            "Explaining concepts in multiple ways until one clicks",
            "Generating outlines, drafts, and examples quickly",
            "Summarizing ideas that are well-covered in its training data",
            "Brainstorming options and alternatives",
            "Helping with editing and rewriting",
            "Writing code that you then test yourself",
          ] },
          { type: "paragraph", text: "For tasks where the answer needs to be provably correct - a specific fact, a medical question, a legal decision - verify AI responses with a reliable source." },
        ] },
        { title: "A Good Habit: Ask It to Explain Itself", blocks: [
          { type: "paragraph", text: "When working with AI, after it gives you an answer, try asking: 'how do you know that?' or 'where would I verify this?' The response you get back is often revealing." },
          { type: "callout", accent: "teal", text: "In our AI workshop sessions, we ask students to choose one AI response and try to fact-check it. The goal is not to distrust AI - it is to read it the same way you would read any source: with your own judgment engaged." },
          { type: "quote", text: "I asked it about a scientist and it got the discovery date wrong by thirty years. I would have just believed it if we had not checked. Now I check things.", attribution: "Student at an Avanza STEM AI workshop" },
        ] },
        { title: "What This Means for Kids and Parents", blocks: [
          { type: "paragraph", text: "Kids who grow up using AI tools will benefit from understanding - at a basic level - what these systems do and what they do not do. That understanding shapes how they read AI output." },
          { type: "list", items: [
            "Use AI for brainstorming and drafting more than for finding specific facts",
            "Cross-reference important answers with a second source",
            "Notice when AI sounds overly confident and ask follow-up questions",
            "Understand that AI is not always wrong - but it is not always right either",
          ] },
          { type: "paragraphWithLink", before: "For more on how AI learns from data and the different types of AI tools, see our earlier guide: ", linkText: "What is AI? Explaining Artificial Intelligence to Kids", href: "/blog/what-is-ai-explaining-to-kids", after: "." },
          { type: "ctaLink", title: "Learn About AI in Person", text: "At our AI workshops, students work with simple AI systems, try to find their mistakes, and discuss what they learned.", linkText: "See upcoming workshops", href: "/workshops", accent: "teal" },
        ] },
      ],
    },
    "how-to-think-like-an-inventor-in-20-minutes": {
      title: "How to Think Like an Inventor in 20 Minutes",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.apr2,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/kid thinking.jpg",
      imageAlt: "A child thinking with question marks and a glowing lightbulb drawn above them",
      imageCaption: "At Avanza STEM workshops, students skip straight to building something and figure out what to fix from there.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-your-first-design-is-usually-not-your-best-one", label: "Read next: why your first design is usually not your best one" },
      endingRelatedSlug: "why-your-first-design-is-usually-not-your-best-one",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Most inventions started with someone getting annoyed. A zipper was invented because shoelaces kept coming undone. Post-it notes came from a glue that did not stick well enough. Velcro came from a walk through a field of burrs." },
          { type: "paragraph", text: "The inventor did not start by trying to invent something. They started by noticing a problem that bothered them - and then asking: what if there were a better way?" },
        ] },
        { title: "The Inventor Loop", blocks: [
          { type: "paragraph", text: "You do not need special materials or a lab to think like an inventor. You need four steps - and about twenty minutes." },
          { type: "numbered", items: [
            { title: "Find a problem", body: "Look for something small and annoying. A door that always swings shut. A phone charger that falls out. A backpack zipper that catches. Small frustrations make better invention prompts than big ones, because you can actually test a solution." },
            { title: "Sketch a solution", body: "Draw what a fix might look like - even just a rough shape on paper. You are not trying to make it perfect. You are trying to make your idea specific enough to argue about." },
            { title: "Build a rough prototype", body: "Use what you have: paper, tape, cardboard, rubber bands. The prototype does not have to look good. It just has to be testable." },
            { title: "Test it", body: "Try to break your prototype. If it works perfectly the first time, your test was not hard enough. Find the weak point. That is your next problem to solve." },
          ] },
        ] },
        { title: "Finding Problems Worth Solving", blocks: [
          { type: "paragraph", text: "The hardest part for most students is step one - not because there are no problems, but because they are used to ignoring small annoyances instead of paying attention to them." },
          { type: "callout", accent: "purple", text: "At Avanza STEM workshops, we give students one quiet minute to walk around the room and write down three things that could work better. Almost every student finds at least two." },
          { type: "list", items: [
            "What takes longer than it should?",
            "What breaks more often than it should?",
            "What do you always have to hold in an awkward way?",
            "What do you do every day that you wish you did not have to?",
          ] },
          { type: "paragraph", text: "Pick the smallest one. A problem you can hold in your hands is easier to invent for than one that spans a whole system." },
        ] },
        { title: "Why Sketching Matters Before Building", blocks: [
          { type: "paragraph", text: "A sketch is not just a picture. It is a decision. When you draw your solution, you have to commit to the rough shape: where the hinge goes, which side opens, how wide the grip should be." },
          { type: "paragraph", text: "That commitment is what lets you test the idea. Without a sketch, you adjust as you go - which is fine, but slower. With a sketch, you know what you set out to build and can notice when reality differs from the plan." },
          { type: "callout", title: "One Rule", accent: "purple", text: "Do not touch any materials until you have drawn at least one version of the idea. The sketch does not have to be good. It just has to exist." },
        ] },
        { title: "What Counts as a Prototype", blocks: [
          { type: "paragraph", text: "A prototype is the fastest version of your idea you can build and test. It is not a finished product. It is not supposed to look nice. It is supposed to tell you something you did not already know." },
          { type: "list", items: [
            "Tape things together instead of gluing - you will be taking it apart",
            "Use the simplest shape that tests the thing you care about most",
            "Build for one specific question: does the hinge hold? does it fit? does it slide?",
            "Build it in under 10 minutes or you are making it too complicated",
          ] },
        ] },
        { title: "The 20-Minute Inventor Challenge", blocks: [
          { type: "summary", timeLabel: "Time", time: "20 minutes total", ageLabel: "Best for", age: "Ages 8 and up", supervisionLabel: "Materials", supervision: "Paper, tape, cardboard, scissors, rubber bands, anything you can find", learnLabel: "What you practice", learn: "Problem identification, design thinking, rapid prototyping, and iteration" },
          { type: "callout", title: "Try This Now", accent: "purple", text: "Set a timer for 20 minutes. Find one problem in the room. Sketch one solution. Build one rough version. Test it once. Write down the one thing you would change if you had ten more minutes." },
          { type: "quote", text: "She decided to fix the way her pencil always rolled off her desk. She taped a small cardboard lip along the edge. It worked. Then she started asking what else she could fix.", attribution: "Avanza STEM mentor at an engineering workshop" },
        ] },
      ],
    },
    "why-your-first-design-is-usually-not-your-best-one": {
      title: "Why Your First Design Is Usually Not Your Best One",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.apr9,
      readTime: common.en.minutes.m4,
      authorId: "logan",
      image: "/images/workshops/past-engineering.jpg",
      imageAlt: "A student examining a structure that just collapsed during a load test at an Avanza STEM workshop",
      imageCaption: "The moment a bridge collapses is not the end of the session. It is usually the beginning of the real learning.",
      endingProject: { href: "/projects/popsicle-stick-bridge", label: "Try this project: popsicle stick truss bridge" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "how-engineers-think-when-something-breaks",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "At almost every Avanza STEM engineering workshop, bridges fall. And the kids who built it almost always have the same look on their face: not defeated, but thinking." },
          { type: "paragraph", text: "That look is what iteration feels like from the inside. Even when there is not time for a full rebuild, the test changes how students understand their design." },
        ] },
        { title: "The Myth of the Finished Design", blocks: [
          { type: "paragraph", text: "Most people assume that a good design comes from a smart person thinking really hard before touching anything. That is not how engineering works. That is not how most creative fields work, either." },
          { type: "paragraph", text: "Real designs improve through contact with reality. You cannot think your way to a stronger bridge. You have to build one, test it, understand what happened, and decide what you would change next." },
          { type: "callout", title: "The Core Idea", accent: "purple", text: "The first design is not a finished product. It is a hypothesis. The test tells you whether the hypothesis was right." },
        ] },
        { title: "A Real Workshop Example", blocks: [
          { type: "paragraph", text: "During one of our bridge-building sessions at Clifton Public Library, one group built a popsicle stick bridge, tested it with books, and watched one side twist before the bridge finally gave way." },
          { type: "numbered", items: [
            { title: "The first clue: the bridge twisted sideways", body: "Before it collapsed, the students noticed that one side was leaning more than the other. That told them the problem was not just weight - it was uneven support." },
            { title: "The weak point: missing diagonal bracing", body: "The side trusses had long open rectangles instead of triangles. Once the load increased, those rectangles changed shape and the bridge lost its stiffness." },
            { title: "The quick improvement: one targeted reinforcement", body: "With the time left, the group added diagonal bracing to the weakest side and talked through where matching braces would go on a future version." },
            { title: "The takeaway: the test gave them a better design", body: "They did not need to rebuild the whole bridge to learn something real. One careful test showed them exactly what their next design should handle better." },
          ] },
          { type: "quote", text: "It failed right where we didn't add reinforcement hot glue", attribution: "Monica, a student at an Avanza STEM engineering workshop" },
        ] },
        { title: "Why Starting Over Is Not Starting from Scratch", blocks: [
          { type: "paragraph", text: "When students make a change after a test, they are not starting from scratch. They are carrying forward information the first design did not have." },
          { type: "callout", accent: "purple", text: "Iteration does not always mean rebuilding the whole project during the same workshop. Sometimes it means one smart adjustment, one better sketch, or one clear note for the next version." },
          { type: "paragraph", text: "This is why experienced engineers are not always faster at the first try. They are better at noticing what the first try is telling them." },
        ] },
        { title: "The One Improvement Rule", blocks: [
          { type: "paragraph", text: "When something fails and there is time to improve it, make exactly one change before testing again. This is harder than it sounds, because the instinct is to fix everything at once." },
          { type: "paragraph", text: "But if you change three things and the next version is better, you do not know which change made the difference. You just got lucky - and luck does not transfer to the next build." },
          { type: "list", items: [
            "Pick the change that addresses the specific thing that failed",
            "Make that change if the workshop time allows",
            "Test again under the same conditions if you can",
            "Write down what happened or what you would try next",
            "Use that note to guide the next design",
          ] },
          { type: "ctaLink", title: "Build Something and Test It", text: "At our engineering workshops, students build structures, test them, and figure out what the results reveal about their design.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "the-engineering-of-a-backpack": {
      title: "The Engineering of a Backpack",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.apr16,
      readTime: common.en.minutes.m5,
      authorId: "enqi",
      image: "/images/blog/backpacks.webp",
      imageAlt: "A row of backpacks showing different sizes, materials, straps, zippers, and pocket layouts",
      imageCaption: "Backpacks are everyday engineering: weight distribution, materials, zippers, straps, and pockets all have to work together.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM workshop" },
      endingSecondary: { href: "/blog/how-to-think-like-an-inventor-in-20-minutes", label: "Read next: how to think like an inventor in 20 minutes" },
      endingRelatedSlug: "how-to-think-like-an-inventor-in-20-minutes",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Your backpack solves about a dozen engineering problems at once. The straps keep weight off your hands. The padded back panel spreads pressure across your spine. The zippers open and close thousands of times without breaking. The fabric is strong, light, water-resistant, and cheap enough to sell to a student." },
          { type: "paragraph", text: "None of that happened by accident. Every part of a backpack was designed by someone who thought through a problem and tested a solution." },
        ] },
        { title: "The Weight Distribution Problem", blocks: [
          { type: "paragraph", text: "Carrying 10 pounds in your hand is much harder than carrying 10 pounds on your back. That is not a trick - it is physics. A bag hung from one hand creates a moment arm, which multiplies the effort your muscles need to hold it. A backpack positions the weight close to your spine, reducing that effort." },
          { type: "paragraph", text: "The shoulder straps do more than just hold the bag up. Wider straps spread the same weight over more surface area, which reduces pressure per square centimeter - the same reason snowshoes keep you from sinking. Padded straps have a softer surface that compresses slightly, distributing pressure more evenly." },
          { type: "callout", title: "Weight Loading Order", accent: "purple", text: "Pack heavier items closest to your back and lighter items toward the outside. This keeps the center of mass near your spine and reduces the forward pull that strains your lower back." },
        ] },
        { title: "How a Zipper Actually Works", blocks: [
          { type: "paragraph", text: "A zipper is a row of interlocking teeth on each side of an opening. When you pull the slider, it forces the two rows of teeth together in a specific pattern. Each tooth has a small bump and a corresponding hollow. As the slider moves, it positions each tooth so the bump on one side clicks into the hollow on the other." },
          { type: "paragraph", text: "That click is why a closed zipper feels so solid. The interlocked teeth resist both pulling apart and sliding sideways. To open it, the slider wedges a small blade between the rows, forcing the teeth apart one pair at a time." },
          { type: "list", items: [
            "Metal zippers last longer but weigh more",
            "Plastic coil zippers are lighter and more flexible, good for curved seams",
            "YKK is the most common zipper manufacturer in the world and appears on most quality bags",
            "A zipper fails when the slider stretches too wide - you can sometimes fix this by pressing it gently with pliers",
          ] },
        ] },
        { title: "Materials and Trade-offs", blocks: [
          { type: "paragraph", text: "Backpack fabric is a series of trade-offs between weight, durability, water resistance, and cost." },
          { type: "numbered", items: [
            { title: "Nylon", body: "Strong, lightweight, and abrasion-resistant. Most higher-end backpacks use nylon because it holds up well over time without adding much weight." },
            { title: "Polyester", body: "Slightly heavier than nylon but cheaper and more resistant to UV fading. Common in school backpacks and budget bags." },
            { title: "Canvas", body: "Heavy and durable, but absorbs water. Good for short-distance carrying, not great for outdoor use in rain." },
            { title: "Ripstop", body: "A weave pattern with a grid of reinforcing threads. When the fabric tears, the reinforcing grid stops the tear from spreading. Used in high-performance packs." },
          ] },
          { type: "paragraph", text: "Water resistance comes from a coating on the inside of the fabric, not the fabric itself. That coating wears off over time, which is why older bags let water in even though the outside fabric still looks intact." },
        ] },
        { title: "The Pocket System", blocks: [
          { type: "paragraph", text: "The pockets on a backpack are not random. They reflect a set of assumptions about how people organize what they carry." },
          { type: "list", items: [
            "The main compartment is sized for notebooks, a laptop sleeve, or folded clothing",
            "The front pocket is for things you access often but do not want loose in the main compartment",
            "Side pockets are sized for water bottles because that shape is common and predictable",
            "The small top pocket or lid pocket is for items you need without opening the main bag",
            "Internal organizer pockets assume you carry pens, keys, and a phone",
          ] },
          { type: "callout", title: "Try This", accent: "purple", text: "Rate your own backpack like an engineer would. Give it a score from 1 to 5 on: weight distribution, zipper quality, fabric feel and water resistance, pocket organization, and how comfortable the straps are after 10 minutes of walking. What would you change first?" },
        ] },
      ],
    },
    "what-makes-a-stem-workshop-fun": {
      title: "What Makes a STEM Workshop Fun?",
      category: "Community",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.apr30,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/community-workshop.jpg",
      imageAlt: "Students and families actively building, testing, and discussing at an Avanza STEM community workshop",
      imageCaption: "A workshop where kids are talking, building, and arguing is working. A quiet room usually is not.",
      endingProject: { href: "/workshops", label: "See upcoming Avanza STEM workshops" },
      endingSecondary: { href: "/host", label: "Host a workshop in your community" },
      endingRelatedSlug: "building-a-community-stem-workshops",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A workshop where students sit quietly and watch someone demonstrate things is not a STEM workshop. It is a presentation. And presentations, even good ones, are mostly forgotten by the next morning." },
          { type: "paragraph", text: "At Avanza STEM, we spend as much time thinking about session design as we do about content. What students do in the room matters more than what we say to them." },
        ] },
        { title: "The Difference Between Active and Passive", blocks: [
          { type: "paragraph", text: "Passive learning means watching, listening, and receiving. Active learning means doing, testing, arguing, and building. The research on which one works better is not ambiguous." },
          { type: "paragraph", text: "But it is also not just about doing something. Students can be busy with their hands and still not really be thinking. A good workshop is designed so that the doing forces the thinking." },
          { type: "callout", accent: "purple", text: "At our bridge workshops, students do not watch a mentor build a bridge. They get materials, a load limit, and about 30 minutes. The frustration, the arguments with their partner about the design, the moment the bridge holds more than they expected - that is where the learning lives." },
        ] },
        { title: "How We Design Avanza STEM Activities", blocks: [
          { type: "paragraph", text: "Every activity we run goes through the same set of questions before we bring it to a workshop." },
          { type: "numbered", items: [
            { title: "Is there a real test?", body: "If students cannot find out whether their idea worked, it is not a design challenge - it is an art project. Every activity ends with a test: does the bridge hold the weight? Does the rover cross the terrain? Does the code run?" },
            { title: "Can it fail in an interesting way?", body: "Failure that teaches something is a feature. If the activity only succeeds or trivially fails, there is nothing to iterate on. The best failures are specific enough that students know what to fix." },
            { title: "Is there room for different approaches?", body: "A challenge with one correct answer turns into a race to find it. A challenge with multiple valid approaches lets students make genuine design decisions - and learn from comparing results." },
            { title: "Are students talking to each other?", body: "Productive disagreement is one of the best signs that a session is working. When students argue about whether to add more diagonals or strengthen the joint, they are doing engineering." },
          ] },
        ] },
        { title: "What Students Actually Do at Our Workshops", blocks: [
          { type: "paragraph", text: "At a typical Avanza STEM session, a student might do five or six distinct things in 60 minutes." },
          { type: "list", items: [
            "Hear a two-minute prompt that gives them the goal and the constraints",
            "Argue with their partner about the design for a few minutes before building",
            "Build a first version and test it, often failing on the first try",
            "Make a specific change based on what they saw fail",
            "Test again and notice whether the change helped",
            "Explain to the group what they learned - not what they built, but what they found out",
          ] },
          { type: "paragraph", text: "That last step is the one most workshops skip. When a student has to explain what they learned in words, they figure out whether they actually understood it or just got lucky." },
        ] },
        { title: "Why Noise Is Usually a Good Sign", blocks: [
          { type: "paragraph", text: "Quiet workshops make adults feel comfortable and usually make students feel less engaged. A session where students are talking - even loudly, even arguing - is a session where students are thinking." },
          { type: "quote", text: "I thought they were getting off track because they were so loud about the zipper thing. But then I listened and they were actually debating whether friction was higher on the outside or inside of the curve. That is exactly what we wanted.", attribution: "Avanza STEM mentor after a science session" },
          { type: "paragraph", text: "The mentor's job in those moments is not to quiet the room. It is to ask one question that sharpens the argument." },
        ] },
        { title: "The Three Things We Always Include", blocks: [
          { type: "numbered", items: [
            { title: "A real test with a real result", body: "Not 'good job, everyone'. Actual pass or fail against the stated goal." },
            { title: "A specific failure mode to learn from", body: "If everything works the first time, students did not learn what the limits were." },
            { title: "Time to explain what they figured out", body: "Building without reflection is just activity. Reflection is where the understanding consolidates." },
          ] },
          { type: "ctaLink", title: "Come See a Workshop", text: "Avanza STEM workshops are free, hands-on, and open to students of all experience levels. No prior STEM background required.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "engineering-inside-school-bus": {
      title: "The Secret Engineering Inside a School Bus",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.may7,
      readTime: common.en.minutes.m5,
      authorId: "logan",
      image: "/images/workshops/past-engineering.jpg",
      imageAlt: "Students examining everyday objects and discussing how they were designed and built at an Avanza STEM workshop",
      imageCaption: "Engineering is not just found in labs and factories. It is packed into every vehicle you ride, including the school bus.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/the-engineering-of-a-backpack", label: "Read next: the engineering of a backpack" },
      endingRelatedSlug: "the-engineering-of-a-backpack",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A school bus might look simple: big yellow box, lots of seats, flashing lights, and a loud engine. But a school bus is actually packed with engineering decisions. Almost every part of it is designed to answer one big question: how do we move a lot of kids safely?" },
          { type: "paragraph", text: "Let's look at the hidden engineering inside a school bus." },
        ] },
        { title: "Why Are School Buses Yellow?", blocks: [
          { type: "paragraph", text: "School buses are not yellow by accident. That bright color is easy to see in the morning, in the afternoon, and even when the sky is cloudy. Engineers and safety designers want drivers to notice a school bus quickly." },
          { type: "paragraph", text: "The color, flashing lights, stop sign arm, and large size all work together to say: pay attention, kids are nearby. The bus is basically designed to be impossible to ignore." },
        ] },
        { title: "The Seats Are Safety Tools", blocks: [
          { type: "paragraph", text: "School bus seats might not look fancy, but they are designed with safety in mind. Many school buses use something called compartmentalization - the seats are tall, padded, and close together. If the bus stops suddenly, the seat in front of you helps absorb some of the motion, almost like a soft wall." },
          { type: "paragraph", text: "The seats also have strong frames underneath. They need to handle bumps, turns, and years of students sitting, leaning, and moving around. A seat on a school bus is not just a place to sit. It is part of the safety system." },
        ] },
        { title: "Why Can the Driver See So Much?", blocks: [
          { type: "paragraph", text: "Bus drivers need to see the road, the students, the doors, the sidewalk, and the cars around them. That is why buses have huge mirrors. Some mirrors show what is behind the bus. Others help the driver see near the front bumper, where small children might be hard to spot." },
          { type: "paragraph", text: "Visibility is a major engineering challenge because a school bus is big. Engineers have to help the driver see around the size of the vehicle." },
        ] },
        { title: "Turning a Giant Vehicle", blocks: [
          { type: "paragraph", text: "A school bus is much longer than a car, so turning is harder. Engineers have to think about turning radius - how much space a vehicle needs to make a turn. A bus needs more space than a small car, especially on narrow streets." },
          { type: "paragraph", text: "That is why bus drivers sometimes swing a little wider before turning. The bus is not being dramatic. It is following geometry." },
        ] },
        { title: "Emergency Exits Are Everywhere", blocks: [
          { type: "paragraph", text: "A school bus has more exits than the front door. There may be a rear emergency door, roof hatches, and emergency windows. Good engineering is not just about normal days. It is also about unexpected days." },
          { type: "callout", title: "Why So Many Exits?", accent: "purple", text: "What if the front door is blocked? What if the bus is tilted? What if students need to exit quickly? Engineers plan for what-if situations before they happen." },
        ] },
        { title: "Try This: Design Your Own Safer Bus", blocks: [
          { type: "paragraph", text: "Grab paper and draw your own school bus design. Add mirrors, emergency exits, a seat layout, lights, signs, windows, and storage spaces. For each part you draw, ask yourself: what problem does this solve?" },
          { type: "callout", title: "The Engineer's Question", accent: "purple", text: "Engineers do not just ask, does it look cool? They ask, what does this do? What problem does this solve? Try that question on every part of your drawing." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "The next time you see a school bus, look closer. The color, mirrors, seats, exits, doors, and turning shape all have a purpose. A school bus is not just transportation. It is engineering on wheels." },
        ] },
      ],
    },
    "why-airplane-wings-are-curved": {
      title: "Why Are Airplane Wings Curved?",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.may14,
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/curriculums/engineering.jpg",
      imageAlt: "Students working on an engineering design challenge at an Avanza STEM workshop",
      imageCaption: "Understanding how shape affects how things move through air is one of the core ideas in engineering.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-triangles-are-an-engineers-secret-weapon", label: "Read next: why triangles are an engineer's secret weapon" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Airplane wings have one of the coolest jobs in engineering. They help lift a giant metal machine into the sky. That sounds impossible. How can something as heavy as an airplane fly?" },
          { type: "paragraph", text: "The answer has a lot to do with the shape of the wings." },
        ] },
        { title: "Wings Are Not Flat", blocks: [
          { type: "paragraph", text: "If you look at an airplane wing from the side, it is not just a flat board. It usually has a curved top and a flatter bottom. This shape is called an airfoil. An airfoil is designed to move through air in a special way." },
          { type: "paragraph", text: "When the airplane moves forward, air flows around the wing. The wing shape helps create a pressure difference between the top and bottom of the wing. Usually, the air pressure above the wing becomes lower than the pressure below it. The higher pressure below helps push the wing upward. That upward force is called lift." },
        ] },
        { title: "Lift Is Not Magic", blocks: [
          { type: "paragraph", text: "Lift is not magic, and it is not just one simple trick. Wings create lift because they change how air moves. As the wing moves forward, it pushes some air downward. When air gets pushed down, the wing gets pushed upward. That is related to Newton's third law: for every action, there is an equal and opposite reaction. So the wing is doing two important things:" },
          { type: "numbered", items: [
            { title: "Creating pressure differences", body: "The curved top surface causes air to move faster and creates lower pressure above the wing." },
            { title: "Pushing air downward", body: "The wing redirects airflow, and the reaction force pushes the plane up." },
          ] },
        ] },
        { title: "Why Does the Plane Need Speed?", blocks: [
          { type: "paragraph", text: "An airplane sitting still on a runway does not lift off. It needs to move fast. Because the wings need air moving over them - the faster the airplane moves, the more air flows around the wings, and more airflow can create more lift." },
          { type: "paragraph", text: "That is why airplanes speed down the runway before takeoff. The engines push the plane forward, the wings interact with the moving air, and eventually there is enough lift for the plane to rise." },
        ] },
        { title: "What About the Flaps?", blocks: [
          { type: "paragraph", text: "During takeoff and landing, you may see parts of the wing move. These are called flaps and slats. They change the shape of the wing, which helps it create more lift at slower speeds." },
          { type: "paragraph", text: "That is useful because planes need extra lift when they are taking off or landing. They cannot always go super fast near the ground, so engineers give the wings moving parts that help control the airflow." },
        ] },
        { title: "Try This: Paper Wing Test", blocks: [
          { type: "paragraph", text: "Take two pieces of paper. Fold one into a simple paper airplane. Keep the other flat. Now gently throw both. The folded paper airplane flies better because its shape helps it move through air in a more controlled way." },
          { type: "callout", title: "Shape Matters", accent: "purple", text: "Engineers test wing shapes in wind tunnels, computer simulations, and real flights. A tiny change in wing shape can make a big difference in how much lift is created. This is why it is not just the engines doing the work - the wings are carefully shaped engineering tools." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Airplane wings are curved because shape controls airflow. That airflow helps create lift, which allows planes to fly. So the next time you see an airplane overhead, remember: it is not just the engines doing the work. The wings are carefully shaped engineering tools, turning air into lift." },
        ] },
      ],
    },
    "how-elevators-know-where-to-go": {
      title: "How Elevators Know Where to Go",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.may21,
      readTime: common.en.minutes.m4,
      authorId: "liam",
      image: "/images/workshops/upcoming-bridge-building.jpg",
      imageAlt: "Students testing and building at an Avanza STEM engineering workshop",
      imageCaption: "Even systems that feel simple - like pressing a button and arriving at the right floor - are full of engineering decisions.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/how-engineers-think-when-something-breaks", label: "Read next: how engineers think when something breaks" },
      endingRelatedSlug: "how-engineers-think-when-something-breaks",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You press a button. The doors close. The elevator moves. Then it stops at the right floor. It feels simple, but elevators are full of engineering. They use buttons, sensors, motors, cables, counterweights, and computer logic to move people safely." },
          { type: "paragraph", text: "So how does an elevator know where to go?" },
        ] },
        { title: "The Button Sends a Request", blocks: [
          { type: "paragraph", text: "When you press an elevator button, you are not directly controlling the motor. You are sending a request to the elevator's control system - the elevator's brain. It keeps track of:" },
          { type: "list", items: [
            "Which floor the elevator is currently on",
            "Which buttons have been pressed",
            "Which direction the elevator is moving",
            "Whether the doors are open or closed",
            "Whether anything is blocking the doors",
          ] },
          { type: "paragraph", text: "The elevator does not guess. It follows instructions from its control system." },
        ] },
        { title: "Sensors Tell the Elevator Where It Is", blocks: [
          { type: "paragraph", text: "An elevator needs to know its position. It uses sensors to detect where the elevator car is inside the shaft. These sensors help the system know when to slow down, when to stop, and whether the elevator is lined up with the floor." },
          { type: "paragraph", text: "That last part is important. You do not want the elevator floor to be too high or too low when the doors open. Engineers design elevators to stop very precisely." },
        ] },
        { title: "Motors Do the Heavy Lifting", blocks: [
          { type: "paragraph", text: "Most elevators use electric motors to move. The motor turns a pulley system that moves cables attached to the elevator car. But here is the clever part: many elevators also use a counterweight - a heavy object connected to the elevator system. When the elevator car moves up, the counterweight moves down. When the car moves down, the counterweight moves up." },
          { type: "paragraph", text: "This helps balance the system so the motor does not have to work as hard. It is like using a seesaw instead of lifting something straight up by yourself." },
        ] },
        { title: "The Elevator Uses Simple Logic", blocks: [
          { type: "paragraph", text: "Elevators follow logic rules. Imagine the elevator is on floor 1 and people press buttons for floors 3, 5, and 2. The elevator might decide: go up, stop at floor 2, stop at floor 3, stop at floor 5. It does not go randomly. It tries to move efficiently so people do not wait too long." },
          { type: "paragraph", text: "In tall buildings, elevator systems can get much more advanced. Some systems group people by destination so fewer stops are needed." },
        ] },
        { title: "Safety Comes First", blocks: [
          { type: "paragraph", text: "Elevators have many safety systems. Doors use sensors so they do not close on people. Brakes help stop the elevator. Backup systems help keep the elevator controlled if one part fails. Engineers plan for problems before they happen." },
        ] },
        { title: "Try This: Elevator Logic Game", blocks: [
          { type: "paragraph", text: "Pretend you are the elevator controller. Draw a building with 6 floors. Put the elevator on floor 2. Someone on floor 5 wants to go down, someone on floor 1 wants to go up, and someone inside wants floor 4. What order should the elevator handle them?" },
          { type: "callout", title: "No Single Right Answer", accent: "purple", text: "There is not always one perfect solution. Engineers have to think about speed, fairness, safety, and energy use - all at the same time. What trade-offs would you make?" },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Elevators do not actually know things the way humans do. They use sensors, motors, and logic systems to make smart decisions. The next time you ride one, remember: behind that simple button is a whole engineering system working quietly in the walls." },
        ] },
      ],
    },
    "why-buildings-sway-in-wind": {
      title: "Why Do Buildings Sway in the Wind?",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.may28,
      readTime: common.en.minutes.m5,
      authorId: "logan",
      image: "/images/blog/bridge-build.jpg",
      imageAlt: "Students examining a structural engineering model at an Avanza STEM workshop",
      imageCaption: "Structures that handle forces well - whether a bridge or a skyscraper - are designed to flex, not just stand stiff.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-triangles-are-an-engineers-secret-weapon", label: "Read next: why triangles are an engineer's secret weapon" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "If you stood at the top of a very tall skyscraper during strong wind, you might feel the building move a tiny bit. That sounds scary, but it is actually part of the design. Tall buildings are not supposed to be perfectly stiff. In many cases, a building that can sway a little is safer than one that refuses to move." },
        ] },
        { title: "Wind Pushes on Buildings", blocks: [
          { type: "paragraph", text: "Wind may feel invisible, but it can push with a lot of force. When wind hits a tall building, the building has to handle that force. The taller the building, the more wind it may catch. Engineers must ask: how strong can the wind get here, how tall is the building, what shape is it, how will the structure move, and will people inside feel comfortable?" },
          { type: "paragraph", text: "A skyscraper is not just holding itself up. It is also dealing with moving air." },
        ] },
        { title: "Flexible Can Be Safer", blocks: [
          { type: "paragraph", text: "Imagine bending a dry stick. It snaps. Now imagine bending a green tree branch. It moves, but it does not break as easily. Buildings can be similar. If a building were too stiff, strong wind or earthquake shaking could create huge forces inside the structure." },
          { type: "paragraph", text: "But if the building can flex a little, it can absorb and spread out some of that energy. That does not mean the building is weak. It means it is designed to move safely." },
        ] },
        { title: "Earthquakes Shake Buildings Too", blocks: [
          { type: "paragraph", text: "Wind pushes from the side. Earthquakes shake the ground underneath. During an earthquake, the bottom of the building moves first because the ground moves. The rest of the building has to respond." },
          { type: "paragraph", text: "Engineers design buildings with strong frames, flexible joints, shock absorbers, and special foundations to help them survive shaking. The goal is not always to make the building completely still. The goal is to keep it standing and protect the people inside." },
        ] },
        { title: "Some Buildings Have Giant Dampers", blocks: [
          { type: "paragraph", text: "Some tall buildings have a giant weight inside called a tuned mass damper. It is like a huge pendulum. When the building sways one way, the damper moves in a way that helps reduce the motion." },
          { type: "callout", accent: "purple", text: "A tuned mass damper is almost like the building has a giant balancing tool hidden inside it. You may not see it from the street, but it can make the building feel dramatically steadier during strong wind." },
        ] },
        { title: "Shape Matters Too", blocks: [
          { type: "paragraph", text: "The shape of a building affects how wind moves around it. Sharp corners, flat sides, and tall narrow shapes can all change wind forces. Engineers test building models in wind tunnels to see how air flows around them." },
          { type: "paragraph", text: "Sometimes they round corners, add openings, or change the shape to reduce wind pressure. A skyscraper's shape is not just about looking cool. It is also about handling forces." },
        ] },
        { title: "Try This: Paper Tower Test", blocks: [
          { type: "paragraph", text: "Build two towers out of paper. Make one very stiff and straight. Make another with a little flexibility. Gently blow on them or push the table slightly. Which one falls first? Which one bends and recovers?" },
          { type: "callout", title: "What Engineers Study", accent: "purple", text: "This is a simple version of what engineers study with real buildings. The question is not just 'will it stand?' - it is 'how will it behave when the wind or ground pushes on it?'" },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Buildings sway because wind and earthquakes create forces. A little movement can help a structure survive those forces. So if a skyscraper moves slightly, that does not mean the engineers failed. It may mean the engineers did their job." },
        ] },
      ],
    },
    "engineering-behind-soccer-ball": {
      title: "The Engineering Behind a Soccer Ball",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.jun4,
      readTime: common.en.minutes.m4,
      authorId: "noah",
      image: "/images/workshops/past-science.jpg",
      imageAlt: "Students testing and observing during a hands-on science and engineering challenge",
      imageCaption: "Everyday objects like a soccer ball are carefully engineered systems. Shape, materials, and air pressure all affect how the ball moves.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-your-first-design-is-usually-not-your-best-one", label: "Read next: why your first design is usually not your best one" },
      endingRelatedSlug: "why-your-first-design-is-usually-not-your-best-one",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A soccer ball seems simple. You kick it, it rolls, it bounces, and sometimes it curves through the air in a way that feels impossible. But a soccer ball is a carefully engineered object. Its shape, panels, air pressure, material, and surface all affect how it moves." },
        ] },
        { title: "Why Is a Soccer Ball Round?", blocks: [
          { type: "paragraph", text: "A soccer ball needs to roll smoothly and bounce predictably. A round shape helps it move in many directions without getting stuck on corners. But making a ball round is not as easy as it sounds. Many soccer balls are made from panels stitched or bonded together." },
          { type: "paragraph", text: "The classic soccer ball design has black pentagons and white hexagons. That pattern helps form a shape close to a sphere. Modern balls may use different panel shapes, but the goal is still the same: make the ball round, strong, and controllable." },
        ] },
        { title: "Air Pressure Changes Everything", blocks: [
          { type: "paragraph", text: "Inside the ball is air. That air pressure helps the ball keep its shape. If a soccer ball has too little air, it feels soft and will not bounce as well. If it has too much air, it can feel too hard and bounce too much. A ball is not just a shell. The air inside is part of the design." },
          { type: "list", items: [
            "Too little air: soft feel, harder to kick far, less predictable bounce",
            "Too much air: too hard, too bouncy, less comfortable to control",
            "Right pressure: consistent bounce, predictable flight, responsive feel",
          ] },
        ] },
        { title: "Why Does a Ball Curve?", blocks: [
          { type: "paragraph", text: "Have you ever seen a soccer ball bend through the air? That happens because of spin. When a ball spins, it changes how air moves around it. One side of the ball moves with the airflow, while the other side moves against it." },
          { type: "paragraph", text: "This creates a sideways force that curves the ball's path - which is why players can kick a ball around a wall of defenders or make it dip toward the goal. The engineering word connected to this is the Magnus effect." },
        ] },
        { title: "Materials Matter", blocks: [
          { type: "paragraph", text: "Soccer balls need to handle grass, turf, mud, rain, hard kicks, and thousands of impacts. The outside material must be tough but not too heavy. The inside layers help the ball keep its shape. The bladder inside holds air. A cheap ball and a professional ball may look similar, but they can feel very different because of materials and construction." },
        ] },
        { title: "Bounce and Energy", blocks: [
          { type: "paragraph", text: "When you drop a soccer ball, it bounces because energy is stored and released. As the ball hits the ground, it squishes slightly. Then it springs back into shape and pushes off the ground." },
          { type: "paragraph", text: "Some energy is lost as sound, heat, and vibration, so the ball does not bounce back to the exact same height. Engineers test this to make sure balls behave consistently." },
        ] },
        { title: "Try This: Ball Experiment", blocks: [
          { type: "paragraph", text: "Use two balls with different air pressure. Drop each one from the same height. Watch how high they bounce. Then gently kick each one. Which feels easier to control? Which goes farther?" },
          { type: "callout", title: "Testing Like an Engineer", accent: "purple", text: "You are testing how pressure affects performance - the same thing engineers do when they design sports equipment. Try to change only one variable at a time so you know what actually caused the difference." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "A soccer ball is not just something you kick. It is a designed system. The shape helps it roll. The air pressure helps it bounce. The panels affect flight. The materials affect touch and durability. Every great shot starts with engineering." },
        ] },
      ],
    },
    "why-manhole-covers-are-round": {
      title: "Why Are Manhole Covers Round?",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.jun11,
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/curriculums/engineering.jpg",
      imageAlt: "Students discussing engineering design decisions at an Avanza STEM workshop",
      imageCaption: "Good engineering solves multiple problems at once with a single design. Manhole covers are a perfect example.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-triangles-are-an-engineers-secret-weapon", label: "Read next: why triangles are an engineer's secret weapon" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "At first, a manhole cover sounds like a boring object. It is just a heavy metal lid in the street, right? Not exactly. Manhole covers are a famous engineering design because their shape solves several problems at once. So why are they usually round?" },
        ] },
        { title: "A Round Cover Cannot Fall Through Its Own Hole", blocks: [
          { type: "paragraph", text: "This is the classic reason. A circular cover cannot fall through a circular opening of the same size. No matter how you turn it, the circle's width stays the same." },
          { type: "paragraph", text: "But a square cover could fall through a square hole if you tilted it diagonally. The diagonal of a square is longer than its side, so the cover could slip in at the wrong angle - which would be dangerous for workers underground and for people above ground. A round cover helps prevent that problem." },
        ] },
        { title: "Round Covers Are Easier to Move", blocks: [
          { type: "paragraph", text: "Manhole covers are heavy. Some can weigh more than a person. A round cover can be rolled. Workers can tilt it up and roll it like a wheel for short distances. A square cover would be harder to move that way because it has corners." },
          { type: "paragraph", text: "Engineers care about how objects are used by real people. A design is not only about shape. It is also about lifting, moving, replacing, and maintaining it over years of use." },
        ] },
        { title: "The Opening Is Round Too", blocks: [
          { type: "paragraph", text: "Many underground tunnels and access shafts are round. Round shapes are strong because they spread pressure evenly. Pipes are round for a similar reason. If the hole is round, it makes sense for the cover to be round too. The shape of the cover matches the shape of the opening." },
        ] },
        { title: "No Need to Line It Up", blocks: [
          { type: "paragraph", text: "A round cover fits no matter how you rotate it. With a square or rectangle, you have to line up the corners. With a circle, every direction works. That saves time when workers put the cover back. It also reduces the chance of placing it incorrectly." },
        ] },
        { title: "Strong and Simple", blocks: [
          { type: "paragraph", text: "Manhole covers need to handle cars, trucks, rain, snow, heat, cold, and years of use. The round shape helps spread weight evenly. The metal is usually textured on top so tires and shoes can grip it better. Even the pattern on top is designed - it is not just decoration." },
        ] },
        { title: "Try This: Shape Test", blocks: [
          { type: "paragraph", text: "Cut out a paper circle and a paper square. Draw matching holes on another piece of paper. Now try to rotate each cover over its matching hole. Which one can slip through if turned the wrong way? Which one always stays too wide to fall in?" },
          { type: "callout", title: "One Design, Many Solutions", accent: "purple", text: "This simple paper test shows why engineers like round covers. The shape is safe, strong, easy to move, and easy to replace - all at once. That is great engineering: one solution that solves multiple problems." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Manhole covers are round because the shape is safe, strong, easy to move, and easy to replace. It is a great example of engineering: one simple design solving many problems at the same time. The next time you walk past one, do not just step over it. That metal circle is smarter than it looks." },
        ] },
      ],
    },
    "how-roller-coasters-stay-on-track": {
      title: "How Roller Coasters Stay on the Track",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.jun18,
      readTime: common.en.minutes.m5,
      authorId: "logan",
      image: "/images/workshops/past-engineering.jpg",
      imageAlt: "Students building and testing a physics-based engineering challenge at an Avanza STEM workshop",
      imageCaption: "Roller coasters look like they break every rule of physics. The engineering behind them is exactly why they do not.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-airplane-wings-are-curved", label: "Read next: why airplane wings are curved" },
      endingRelatedSlug: "why-airplane-wings-are-curved",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Roller coasters look like they are breaking the rules. They climb huge hills, race downward, twist sideways, and sometimes go upside down. So how do they stay on the track? The answer is a mix of gravity, momentum, wheel design, and safety engineering." },
        ] },
        { title: "Gravity Starts the Ride", blocks: [
          { type: "paragraph", text: "Most roller coasters begin by climbing a big hill. A chain or launch system pulls the coaster up. At the top, the coaster has stored energy because it is high above the ground. This is called potential energy." },
          { type: "paragraph", text: "When the coaster drops, gravity pulls it downward. That stored energy turns into motion, called kinetic energy. That is why the first drop is so important - it gives the coaster speed for the rest of the ride." },
        ] },
        { title: "Momentum Keeps It Moving", blocks: [
          { type: "paragraph", text: "Once the coaster is moving, it wants to keep moving. That is momentum. Momentum helps the coaster climb smaller hills, go around curves, and move through loops." },
          { type: "paragraph", text: "But friction and air resistance slow it down over time. That is why roller coasters are carefully designed so the train has enough speed to finish the track safely, but not so much speed that the ride becomes unsafe." },
        ] },
        { title: "The Wheels Do More Than You Think", blocks: [
          { type: "paragraph", text: "A roller coaster does not just sit on top of the track with regular wheels. Most coaster trains have several sets of wheels:" },
          { type: "list", items: [
            "Wheels on top of the track",
            "Wheels on the side of the track",
            "Up-stop wheels underneath the track that keep the train attached even during loops",
          ] },
          { type: "paragraph", text: "So when a coaster goes upside down, it is not just hoping gravity behaves. It is physically held to the track by wheel systems." },
        ] },
        { title: "Why Do You Not Fall Out?", blocks: [
          { type: "paragraph", text: "Roller coasters use restraints like lap bars, seat belts, or over-the-shoulder harnesses. The type of restraint depends on the ride. A small family coaster may only need a lap bar. A coaster with inversions may use a more secure restraint system." },
          { type: "paragraph", text: "Engineers design restraints to hold riders safely while still allowing the ride to feel exciting. A good coaster feels wild, but it is not random." },
        ] },
        { title: "Loops Are Not Perfect Circles", blocks: [
          { type: "paragraph", text: "Many roller coaster loops are not perfect circles. They are often shaped more like a stretched teardrop. Because a perfect circular loop could create uncomfortable forces at the bottom and not enough speed at the top." },
          { type: "paragraph", text: "A teardrop-shaped loop helps manage the forces on riders' bodies. It makes the loop safer and smoother to ride through." },
        ] },
        { title: "Try This: Marble Coaster", blocks: [
          { type: "paragraph", text: "Use paper, cardboard, tape, and a marble. Build a small track with a hill and a curve. Test what happens if the first hill is too low, if the curve is too sharp, or if the track is not smooth. Each failure tells you something specific to fix." },
          { type: "callout", title: "Same Questions, Smaller Scale", accent: "purple", text: "You are doing the same kind of testing coaster engineers do - just on a smaller scale. Every time the marble flies off the track or stops early, that is data about what needs to change." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Roller coasters stay on the track because engineers design the whole system carefully. Gravity gives speed. Momentum carries the train. Wheels grip the track from multiple sides. Restraints hold riders safely. The track shape controls forces. The thrill is real. But behind the thrill is a lot of engineering." },
        ] },
      ],
    },
    "why-chairs-break": {
      title: "Why Do Some Chairs Break and Others Don't?",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.jun25,
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/workshops/upcoming-bridge-building.jpg",
      imageAlt: "Students building and testing a structure during an Avanza STEM engineering workshop",
      imageCaption: "The same engineering principles that make a bridge strong also determine whether a chair holds up for years or breaks in months.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-triangles-are-an-engineers-secret-weapon", label: "Read next: why triangles are an engineer's secret weapon" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A chair has one main job: hold you up. That sounds easy, but chairs break all the time. Legs snap, backs crack, screws loosen, and seats bend. So why do some chairs last for years while others break quickly? It comes down to engineering." },
        ] },
        { title: "Chairs Must Handle Forces", blocks: [
          { type: "paragraph", text: "When you sit on a chair, your weight pushes downward. The chair has to send that force through the seat, into the legs, and down to the floor. If the force is spread out well, the chair stays strong. If too much force goes into one weak spot, the chair can crack or bend." },
          { type: "paragraph", text: "That is called weight distribution. A good chair does not just hold weight. It moves the weight safely through the structure." },
        ] },
        { title: "Materials Matter", blocks: [
          { type: "paragraph", text: "Chairs can be made from wood, plastic, metal, fabric, or a mix of materials. Each has strengths and weaknesses. Wood can be strong, but it can split if the grain is weak or the joints are poor. Plastic can be light and cheap, but thin plastic may crack. Metal can be very strong, but it can bend if it is too thin or badly shaped." },
          { type: "paragraph", text: "Engineers choose materials based on cost, strength, comfort, weight, and appearance. The best chair uses the right material in the right place - not just the strongest material everywhere." },
        ] },
        { title: "Joints Are Often the Weakest Part", blocks: [
          { type: "paragraph", text: "A chair does not usually break in the middle of a solid piece. It often breaks where parts connect. These connection points are called joints. A chair leg might connect to the seat with screws, glue, bolts, brackets, or special shapes cut into the wood." },
          { type: "paragraph", text: "If the joints are weak, the whole chair is weak. That is why wobbly chairs are warning signs. Wobbling means the joints are moving when they should not be." },
        ] },
        { title: "Shape Can Make a Chair Stronger", blocks: [
          { type: "paragraph", text: "Some chairs have support bars between the legs. These bars help stop the legs from spreading apart. Other chairs use curved plastic, metal frames, or triangular supports. Triangles are especially strong shapes in engineering because they do not change shape easily." },
          { type: "callout", accent: "purple", text: "That is why you see triangles in bridges, towers, and sometimes furniture. A chair can use shape to become stronger without adding a lot of extra material." },
        ] },
        { title: "Testing Matters", blocks: [
          { type: "paragraph", text: "Before a chair is sold, designers may test it by adding weight, rocking it, dropping it, or sitting on it thousands of times with a machine. Because a chair needs to survive real life. People lean back, twist, flop down, drag chairs across floors, and stack them." },
          { type: "paragraph", text: "A chair that works once is not enough. A good chair needs to work again and again." },
        ] },
        { title: "Try This: Paper Chair Challenge", blocks: [
          { type: "paragraph", text: "Build a chair out of paper and tape that can hold a small object, like a toy or a book. Test different designs: four straight legs, folded legs, triangle supports, or rolled paper tubes. Which design holds the most weight?" },
          { type: "callout", title: "What You Will Find", accent: "purple", text: "You will quickly see that shape and joints matter just as much as material. A well-shaped simple chair often beats a poorly joined complex one." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Some chairs break because the forces are not handled well. Others last because engineers chose strong materials, smart shapes, and sturdy joints. A chair may seem ordinary, but every time it holds someone up, it is doing engineering work." },
        ] },
      ],
    },
    "hidden-engineering-water-bottle": {
      title: "The Hidden Engineering of a Water Bottle",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.jul2,
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/workshops/past-science.jpg",
      imageAlt: "Students observing and analyzing everyday objects at an Avanza STEM science workshop",
      imageCaption: "Even the most ordinary objects around us are full of engineering decisions. A water bottle is a good place to start looking.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/the-engineering-of-a-backpack", label: "Read next: the engineering of a backpack" },
      endingRelatedSlug: "the-engineering-of-a-backpack",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A water bottle seems like one of the simplest objects in the world. It holds water. You drink from it. Done. But if you look closely, a water bottle is full of design choices. The shape, grip, cap, plastic thickness, opening size, and even the tiny threads near the top are all engineered." },
        ] },
        { title: "The Shape Is Not Random", blocks: [
          { type: "paragraph", text: "Water bottles need to be easy to hold, easy to pack, and strong enough not to collapse. Some bottles have grooves or curves in the middle. These make the bottle easier to grip, especially if your hands are wet." },
          { type: "paragraph", text: "The shape also affects how the bottle handles pressure. A completely smooth, thin bottle might crumple too easily. Ridges can make the bottle stronger without adding much extra plastic. That means the bottle can use less material while still doing its job." },
        ] },
        { title: "The Cap Uses Threads", blocks: [
          { type: "paragraph", text: "Look closely at the top of a screw-on bottle. You will see spiral ridges. These are called threads. The cap has matching threads inside. When you twist the cap, the threads pull the cap down tightly onto the bottle, creating a seal so water does not leak out." },
          { type: "paragraph", text: "That tiny twist design is a simple machine. It turns your twisting motion into downward force. More force with less effort - that is what simple machines do." },
        ] },
        { title: "Why Is the Plastic Thicker in Some Places?", blocks: [
          { type: "paragraph", text: "Not every part of a bottle needs the same thickness. The bottom may need to be stronger so the bottle can stand up. The top needs to be strong enough for the cap to seal. The sides may be thinner to save weight and material." },
          { type: "paragraph", text: "Engineers have to balance strength, cost, comfort, and waste. If the bottle is too thin, it crushes. If it is too thick, it uses more plastic than needed. Good design often means using just enough material in the right places." },
        ] },
        { title: "The Opening Matters", blocks: [
          { type: "paragraph", text: "A bottle opening cannot be too tiny, or it is annoying to drink from. But if it is too wide, it may spill easily. Reusable bottles often have wider openings so they are easier to clean or fill with ice. Disposable bottles usually have smaller openings to make drinking simple and reduce spills." },
          { type: "paragraph", text: "Even the size of the opening is an engineering decision." },
        ] },
        { title: "Labels and Grip", blocks: [
          { type: "paragraph", text: "Some bottles have labels wrapped around them. The label is not just for branding. It can also add grip. Reusable bottles may use rubber, textured plastic, metal, or powder-coated surfaces to make them easier to hold. A slippery bottle is bad design, especially for kids, sports, or hiking." },
        ] },
        { title: "Try This: Bottle Design Test", blocks: [
          { type: "paragraph", text: "Compare two different bottles. Look at cap shape, grip texture, bottom design, plastic thickness, opening size, how easy it is to squeeze, and how stable it is when standing. Then decide: which bottle is better designed, and why?" },
          { type: "callout", title: "No Perfect Answer", accent: "purple", text: "There is no single right answer here. Different bottles are designed for different jobs. A hiking bottle prioritizes durability. A kid's bottle prioritizes grip and spill resistance. A disposable bottle prioritizes cost and weight. Recognizing those trade-offs is what engineers do." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "A water bottle is not just a container. It is a small engineering project. It needs to hold liquid, prevent leaks, fit your hand, stand upright, survive drops, and use materials wisely. The next time you take a drink, look at the bottle for a second. Even something ordinary can be full of hidden engineering." },
        ] },
      ],
    },
    "can-ai-actually-think": {
      title: "Can AI Actually Think?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.jul9,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/curriculums/ai.jpg",
      imageAlt: "A student at an Avanza STEM AI workshop examining a chatbot response on a screen",
      imageCaption: "At Avanza STEM AI workshops, students explore how AI tools respond to different prompts and ask why the answers change.",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-is-ai-actually-doing-when-it-answers-you",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "When you ask an AI a question, it can seem like it is thinking. You might type, 'Explain black holes like I'm 10,' and a few seconds later, it gives you an answer. You might ask it to write a story, help with math, make a picture, or suggest ideas for a science project. That can feel pretty magical." },
          { type: "paragraph", text: "But here is the big question: Is AI actually thinking? The answer is: not in the same way people do." },
          { type: "paragraph", text: "AI can do some amazing things, but it does not have a brain like you. It does not have feelings, memories from its own life, imagination the way humans do, or a real understanding of the world. Instead, AI is very good at noticing patterns." },
        ] },
        { title: "What Is Pattern Recognition?", blocks: [
          { type: "paragraph", text: "Pattern recognition means finding things that repeat. You use pattern recognition all the time. For example, if you see dark clouds, hear thunder, and feel wind picking up, you might think, 'It is probably going to rain.' You noticed a pattern from things you have seen before." },
          { type: "paragraph", text: "AI does something similar, but with huge amounts of information. Imagine reading thousands of books, articles, websites, conversations, and examples. Over time, you might start noticing which words usually go together, what answers usually follow certain questions, and what kinds of ideas are connected." },
          { type: "paragraph", text: "AI learns patterns from data. Then, when you ask it a question, it uses those patterns to guess what response should come next. That can make AI sound smart. But sounding smart is not the same thing as thinking like a person." },
        ] },
        { title: "How Is Human Thinking Different?", blocks: [
          { type: "paragraph", text: "Humans do more than recognize patterns. You can wonder about things. You can care about people. You can feel confused, excited, nervous, proud, or curious. You can decide that something matters to you. You can change your mind because of a personal experience. You can notice when something feels unfair or when a friend needs help." },
          { type: "paragraph", text: "AI does not do those things the way humans do. For example, if you build a popsicle-stick bridge and it collapses, you might feel disappointed. Then you might think, 'Maybe the middle needs more support,' and try a new design. You are using logic, memory, emotion, creativity, and experience all at once." },
          { type: "paragraph", text: "AI can suggest reasons the bridge collapsed. It might say the structure needed stronger triangles or better weight distribution. But it does not feel the frustration of watching the bridge fall. It does not learn from the moment the same way you do." },
        ] },
        { title: "Does AI Understand What It Says?", blocks: [
          { type: "paragraph", text: "AI can explain what a volcano is. It can write a poem about a turtle. It can answer questions about planets. But that does not mean it understands those things like a person does." },
          { type: "paragraph", text: "Think about autocomplete on a phone. If you type, 'I am going to the,' your phone might suggest 'store,' 'park,' or 'game.' It is not thinking about your day. It is predicting what word might come next." },
          { type: "callout", accent: "teal", text: "AI works in a more advanced way, but the basic idea is similar. It predicts words, sentences, and ideas based on patterns it has learned. That is why AI can sometimes give a great answer and sometimes give a very strange one." },
        ] },
        { title: "A Simple Example", blocks: [
          { type: "paragraph", text: "Imagine you ask AI: 'Can a fish ride a bicycle?' A human might laugh and say, 'No, fish do not have legs, and bicycles are made for land.' AI might also say no. But it is not saying no because it has seen a fish try to ride a bike. It is using patterns from language and facts it has learned." },
          { type: "paragraph", text: "Now imagine you ask: 'Write a funny story about a fish riding a bicycle.' AI might write one. It can switch from fact mode to story mode because it recognizes what kind of answer you are asking for. That is useful - but it also means you need to be clear with AI. The way you ask changes the kind of answer you get." },
        ] },
        { title: "So Is AI Smart?", blocks: [
          { type: "paragraph", text: "AI can be smart at certain tasks. It can find patterns quickly, organize information, help brainstorm ideas, explain topics in different ways, summarize text, write code, translate languages, and help people learn." },
          { type: "paragraph", text: "But AI is not smart in every way. It does not know what it is like to be a kid, make a mistake, help a friend, win a game, or feel proud after building something that finally works. It does not have common sense the way people do. It can also be confidently wrong. That means AI is a tool, not a replacement for your brain." },
        ] },
        { title: "Think of AI Like a Super Calculator for Words", blocks: [
          { type: "paragraph", text: "A calculator can solve math problems very quickly. But a calculator does not know why you need the answer. It does not know if you typed the numbers wrong. It does not know whether the answer makes sense in real life." },
          { type: "paragraph", text: "AI is similar, except instead of only working with numbers, it works with words, images, code, and patterns. It can help you think, but it should not do all your thinking for you." },
        ] },
        { title: "Try This", blocks: [
          { type: "paragraph", text: "Ask an AI these three questions:" },
          { type: "list", items: [
            "Explain how a paper airplane flies.",
            "Explain how a paper airplane flies like I am in 2nd grade.",
            "Make up a silly story about a paper airplane that goes to Mars.",
          ] },
          { type: "paragraph", text: "Notice how the answers change. The AI is not suddenly becoming a teacher, a little kid, or a storyteller. It is changing its response based on the pattern of your prompt." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "AI does not think like a human. It recognizes patterns, predicts responses, and creates answers based on what it has learned from data. That can be powerful, helpful, and fun. But humans still bring something AI does not have: real understanding, creativity, judgment, feelings, and responsibility." },
          { type: "callout", accent: "teal", text: "AI can help you think, but your brain is still the most important tool in the room." },
        ] },
      ],
    },
    "why-ai-sometimes-gets-things-wrong": {
      title: "Why AI Sometimes Gets Things Wrong",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.jul16,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/shared/ai-workshop.jpg",
      imageAlt: "Students at an Avanza STEM AI workshop fact-checking an AI response together",
      imageCaption: "At Avanza STEM AI workshops, students learn to check AI answers carefully and ask how they know something is true.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM AI workshop" },
      endingSecondary: { href: "/blog/what-is-ai-actually-doing-when-it-answers-you", label: "Read next: what is AI actually doing when it answers you" },
      endingRelatedSlug: "can-ai-actually-think",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "AI can answer questions really fast. You can ask it to explain dinosaurs, write a story, help with code, or suggest a science project. Sometimes the answer is helpful. Sometimes it sounds confident. And sometimes it is just wrong." },
          { type: "paragraph", text: "That can be confusing. If AI is so advanced, why does it still make mistakes? The answer is that AI does not actually know things the way people do. It makes predictions based on patterns. Most of the time, those patterns lead to useful answers. But sometimes, they lead to mistakes." },
        ] },
        { title: "AI Can Guess Wrong", blocks: [
          { type: "paragraph", text: "When you ask AI a question, it tries to create an answer that fits your request. It looks at patterns it learned from lots of examples and predicts what words should come next. That means AI is often making a very educated guess." },
          { type: "paragraph", text: "For example, if you ask, 'What is the tallest mountain in the world?' AI will probably say Mount Everest. That is a common fact with lots of examples behind it. But if you ask something very specific, AI may not know. If it tries to answer anyway, it might make something up. That is one reason AI gets things wrong: it may answer even when it should say, 'I am not sure.'" },
        ] },
        { title: "What Is a Hallucination?", blocks: [
          { type: "paragraph", text: "When AI makes up information and presents it like it is true, people often call that a hallucination. This does not mean AI is seeing things like a person might. It means the AI created an answer that sounds real but is not actually correct." },
          { type: "paragraph", text: "For example, AI might invent:" },
          { type: "list", items: [
            "A fake book title",
            "A wrong date",
            "A made-up quote",
            "A science fact that sounds believable but is false",
            "A source that does not exist",
          ] },
          { type: "callout", accent: "teal", text: "The tricky part is that AI hallucinations can sound very confident. That is why humans still need to check important answers." },
        ] },
        { title: "Bad Data Can Lead to Bad Answers", blocks: [
          { type: "paragraph", text: "AI learns from data. Data means examples, text, images, numbers, and information. But not all data is good. Some information online is old. Some is biased. Some is incomplete. Some is just plain wrong. If AI learns patterns from messy information, it can sometimes repeat those mistakes." },
          { type: "paragraph", text: "Think about learning from a notebook where some pages are correct and some pages have wrong answers. If you study from that notebook without checking, you might accidentally learn the wrong thing. AI has a similar problem. It can learn from useful information, but it can also pick up errors, stereotypes, outdated facts, or confusing examples." },
        ] },
        { title: "AI Does Not Always Understand the Question", blocks: [
          { type: "paragraph", text: "Sometimes AI gets things wrong because the question is unclear. Imagine someone asks you, 'How big is it?' You would probably ask, 'How big is what?' AI might try to guess what 'it' means. If the guess is wrong, the whole answer can be wrong." },
          { type: "paragraph", text: "That is why prompts matter. A prompt is what you type or say to AI. Clear prompts usually lead to better answers. Instead of asking 'Tell me about energy,' you could ask 'Explain the difference between renewable and nonrenewable energy for a 4th grader.' That gives AI more direction." },
        ] },
        { title: "AI Can Mix Up Similar Things", blocks: [
          { type: "paragraph", text: "AI is great at patterns, but sometimes it mixes up things that look or sound similar. It might confuse two historical figures with similar names, mix up a movie title and a book title, or explain a science concept using words that sound correct but do not quite fit." },
          { type: "paragraph", text: "This happens because AI does not have real-life understanding. It is not looking at the world directly the way you do. Some AI systems also do not automatically know the newest information. For recent discoveries, rules, or events, always check trusted current sources." },
        ] },
        { title: "How Can You Check AI's Answers?", blocks: [
          { type: "callout", title: "A Simple Rule", accent: "teal", text: "Use AI as a helper, not the final judge. When AI gives you an answer, especially for school, safety, health, or news, check it." },
          { type: "paragraph", text: "You can ask: Where did that information come from? Can I find the same answer on a trusted website? Does this match what my teacher said? Does this actually make sense?" },
          { type: "paragraph", text: "Try the three-check rule: Does it make sense? Can another trusted source confirm it? Would a teacher, parent, or expert agree? If the answer fails one of those checks, slow down." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "AI gets things wrong because it predicts and guesses, learns from imperfect data, misunderstands unclear questions, mixes up similar ideas, and sometimes lacks current information. That does not make AI useless. It just means we need to use it wisely." },
          { type: "callout", accent: "teal", text: "AI can help you learn faster and brainstorm ideas. But your job is to stay curious and ask: how do I know this is true?" },
        ] },
      ],
    },
    "how-does-your-phone-recognize-your-face": {
      title: "How Does Your Phone Recognize Your Face?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.jul23,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/curriculums/ai.jpg",
      imageAlt: "Students at an Avanza STEM workshop learning how AI systems can recognize images and patterns",
      imageCaption: "Pattern recognition is at the heart of face recognition technology. At Avanza STEM workshops, students explore how AI learns to identify patterns.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM AI workshop" },
      endingSecondary: { href: "/blog/can-ai-actually-think", label: "Read: can AI actually think?" },
      endingRelatedSlug: "why-ai-sometimes-gets-things-wrong",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Unlocking a phone with your face can feel like magic. You pick it up, look at the screen, and suddenly it opens. No password. No typing. Just your face." },
          { type: "paragraph", text: "But your phone is not thinking, 'Oh, that's my friend!' It does not recognize you the same way your family or friends do. Instead, your phone uses cameras, sensors, patterns, and machine learning to decide whether the face in front of it matches the face it has saved." },
        ] },
        { title: "Your Face Has Patterns", blocks: [
          { type: "paragraph", text: "Every face has patterns. Your eyes are a certain distance apart. Your nose has a certain shape. Your jaw, cheeks, forehead, and mouth all create a unique arrangement. Face recognition technology looks for patterns in those features." },
          { type: "paragraph", text: "Your phone has a saved face pattern. When you look at it, it checks the new pattern against the saved one. If they match closely enough, the phone unlocks. Think of it like a very advanced matching game." },
        ] },
        { title: "What Happens When You Set It Up?", blocks: [
          { type: "paragraph", text: "When you first set up face recognition, your phone asks you to move your head or look from different angles. That is because your face does not always look exactly the same. Sometimes you are in bright light. Sometimes you are in shadow. Sometimes you wear glasses." },
          { type: "paragraph", text: "The phone needs to learn a strong pattern of your face from different views. That way, it can recognize you later even when conditions change." },
        ] },
        { title: "Cameras and Sensors Help", blocks: [
          { type: "paragraph", text: "A regular camera takes a picture. But some phones use extra sensors too. These sensors may help measure depth, which means how far away different parts of your face are. That can help the phone tell the difference between a real face and a flat photo." },
          { type: "paragraph", text: "Imagine looking at a paper drawing of a cube versus a real cube made out of blocks. A real cube has depth. A flat drawing does not. Some face recognition systems use depth to make recognition safer and more accurate." },
        ] },
        { title: "Where Does Machine Learning Come In?", blocks: [
          { type: "paragraph", text: "Machine learning is a type of AI that helps computers learn patterns from examples. For face recognition, machine learning helps the phone understand what kinds of patterns belong to your face and how those patterns might change in different situations." },
          { type: "paragraph", text: "For example, your face might look a little different if you smile, wear a hat, tilt your head, or get a haircut. Machine learning helps the system handle small changes without getting confused every time." },
        ] },
        { title: "Why Privacy Matters", blocks: [
          { type: "paragraph", text: "Face recognition is useful, but it also raises important privacy questions. Your face is different from a password. If someone learns your password, you can change it. But you cannot easily change your face." },
          { type: "callout", accent: "teal", text: "That is why companies, schools, apps, and devices need to be careful with face recognition. They should explain what data they collect, how it is stored, and who can access it. Kids should ask an adult before using apps that scan faces." },
        ] },
        { title: "Can Face Recognition Make Mistakes?", blocks: [
          { type: "paragraph", text: "Yes. Face recognition can sometimes fail. It might not unlock when it should, or it might struggle in bad lighting. Some systems have also worked less accurately for certain groups of people, especially if they were not trained on a wide variety of faces." },
          { type: "paragraph", text: "That is another reason technology needs humans to test it, improve it, and use it responsibly." },
        ] },
        { title: "Try This Thought Experiment", blocks: [
          { type: "paragraph", text: "Imagine you are designing a face unlock system. What should it do if:" },
          { type: "list", items: [
            "The room is dark?",
            "The person is wearing sunglasses?",
            "Someone holds up a photo of the user?",
            "Twins try to unlock the same phone?",
            "The user's face changes as they grow?",
          ] },
          { type: "paragraph", text: "These are real engineering problems. Designers have to think about accuracy, safety, fairness, and privacy all at once." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Your phone recognizes your face by looking for patterns, not by understanding you like a person does. It uses cameras and sensors to gather information, machine learning to understand face patterns, and security rules to decide whether to unlock." },
          { type: "callout", accent: "teal", text: "Before using face-scanning apps or sharing face data, it is always smart to ask: where is this information going, and who can see it?" },
        ] },
      ],
    },
    "why-does-autocorrect-make-weird-mistakes": {
      title: "Why Does Autocorrect Make Weird Mistakes?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.jul30,
      readTime: common.en.minutes.m4,
      authorId: "liam",
      image: "/images/shared/ai-workshop.jpg",
      imageAlt: "Students discussing how prediction systems work during an Avanza STEM AI workshop",
      imageCaption: "Autocorrect and AI share the same core idea: both predict what should come next based on patterns in language.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM AI workshop" },
      endingSecondary: { href: "/blog/how-does-your-phone-recognize-your-face", label: "Read: how does your phone recognize your face?" },
      endingRelatedSlug: "how-does-your-phone-recognize-your-face",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Autocorrect can be helpful. You type 'teh,' and it fixes it to 'the.' You type fast, miss a letter, and your phone saves you from a typo." },
          { type: "paragraph", text: "But sometimes autocorrect does something strange. You try to write 'I am bringing snacks,' and it changes a word into something totally different. So why does autocorrect make mistakes? The answer is that autocorrect predicts words. It does not truly understand what you mean." },
        ] },
        { title: "Autocorrect Is a Prediction Tool", blocks: [
          { type: "paragraph", text: "Autocorrect looks at what you typed and guesses what you probably meant. If you type 'definitley,' it might guess 'definitely.' That is useful because the misspelled word looks close to the correct one." },
          { type: "paragraph", text: "It uses patterns from language to ask questions like: What word is close to this spelling? What word usually comes after the previous word? What words does this person type often? What is the most likely sentence? That works a lot of the time, but not always." },
        ] },
        { title: "Computers Do Not Understand Words Like People Do", blocks: [
          { type: "paragraph", text: "You understand words because you connect them to real life. If someone says 'dog,' you might picture a pet, barking, fur, running, or a dog you know. You understand the meaning because you have experiences." },
          { type: "paragraph", text: "Autocorrect does not have experiences. It does not know what a dog feels like, what a joke means, or why your friend's name is spelled a certain way. It only sees letters, words, and patterns. That is why autocorrect might change a word that was actually correct - it does not understand your intention. It just thinks another word is more likely." },
        ] },
        { title: "Names and Slang Can Confuse Autocorrect", blocks: [
          { type: "paragraph", text: "Names are one of autocorrect's biggest challenges. Maybe your friend has a name with an uncommon spelling. Maybe your town, school, or team name is not in the phone's dictionary. Autocorrect may try to 'fix' it into a more common word - even though the name was correct." },
          { type: "paragraph", text: "People also use language creatively. Kids make jokes. Friends use slang. Families have nicknames. Autocorrect may not understand any of that. If you type a made-up word as a joke, autocorrect might replace it with something boring or wrong." },
        ] },
        { title: "Why Does It Sometimes Get Better?", blocks: [
          { type: "paragraph", text: "Have you ever noticed your phone learning a word you use a lot? That can happen because some autocorrect systems adapt to your typing. If you keep using a certain name or phrase, your phone may stop changing it." },
          { type: "paragraph", text: "That is machine learning in action. The system notices your patterns and adjusts. But this can also cause funny problems: if you often type a typo by accident, your phone might start thinking the typo is correct." },
        ] },
        { title: "Autocorrect and AI Are Related", blocks: [
          { type: "paragraph", text: "Autocorrect is not the same as a full AI chatbot, but they are related in an important way: both use prediction. Autocorrect predicts words or spellings. AI chatbots predict longer responses, sentences, and explanations. Neither one understands language exactly like humans do." },
          { type: "callout", accent: "teal", text: "A person can ask, 'Wait, what do you mean?' and notice sarcasm, emotion, and context. A computer tries to infer those things from patterns, but it can still get confused." },
        ] },
        { title: "Try This", blocks: [
          { type: "paragraph", text: "Write a silly sentence using made-up words, names, or slang. See what autocorrect tries to change. Then ask yourself: why did it choose that word? Was it using spelling? Common phrases? A word it has seen before?" },
          { type: "paragraph", text: "That is how engineers think. They do not just notice that something broke. They ask why it happened." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Autocorrect makes weird mistakes because it predicts language patterns instead of truly understanding meaning. It can fix typos, save time, and learn from your typing. But it can also change correct words into wrong ones." },
          { type: "callout", accent: "teal", text: "Autocorrect is helpful, but your brain is the editor. Before you hit send, always read your message one more time." },
        ] },
      ],
    },
    "what-happens-when-you-ask-ai-a-question": {
      title: "What Happens When You Ask AI a Question?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.aug6,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/curriculums/ai.jpg",
      imageAlt: "A student at an Avanza STEM AI workshop typing a question and reading the AI's response",
      imageCaption: "What happens between your question and the AI's answer is more interesting than it looks. It is all about prompts, patterns, and prediction.",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-is-ai-actually-doing-when-it-answers-you",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "When you ask AI a question, it can feel like talking to a super-smart robot. You type 'Why is the sky blue?' and a few seconds later, you get an answer. But what actually happened between your question and the response?" },
          { type: "paragraph", text: "AI does not open a tiny brain and think like a person. It follows a process based on prompts, training, patterns, and prediction. Let's break it down." },
        ] },
        { title: "Step 1: You Give AI a Prompt", blocks: [
          { type: "paragraph", text: "A prompt is the question, instruction, or message you give to AI. A prompt can be simple - 'Explain gravity.' - or more specific: 'Explain gravity to a 3rd grader using a playground example.'" },
          { type: "callout", accent: "teal", text: "The second prompt usually gives a better answer because it tells AI what kind of response you want. Prompts are like instructions to a teammate. The clearer your instructions, the better the result." },
        ] },
        { title: "Step 2: AI Breaks Down Your Words", blocks: [
          { type: "paragraph", text: "AI looks at your prompt and breaks it into smaller pieces. It pays attention to the words, the order of the words, and the patterns those words create." },
          { type: "paragraph", text: "For example, if you ask 'Explain photosynthesis for kids,' the AI notices: 'Explain' means you want a teaching answer. 'Photosynthesis' is the topic. 'For kids' means the answer should be simple and clear. AI uses those clues to decide what kind of response to create." },
        ] },
        { title: "Step 3: AI Uses What It Learned During Training", blocks: [
          { type: "paragraph", text: "Before AI can answer questions, it has to be trained. Training means the AI system studies huge amounts of examples - text, questions, answers, explanations, stories, code, and other kinds of information." },
          { type: "paragraph", text: "During training, AI does not memorize everything. Instead, it learns patterns: which words often go together, how questions are usually answered, how explanations are structured, what facts are commonly connected, and what different writing styles look like. That training helps AI respond when you ask something new." },
        ] },
        { title: "Step 4: AI Predicts a Response", blocks: [
          { type: "paragraph", text: "AI creates answers by predicting what should come next. It does not pull a finished answer out of a drawer. It builds the response piece by piece. If you ask 'Why do plants need sunlight?' the AI might predict that a good answer should mention energy, food, leaves, and photosynthesis." },
          { type: "paragraph", text: "This is why AI can explain topics in many different ways. It can create a short answer, a long answer, a poem, a story, a quiz, or a step-by-step guide depending on your prompt." },
        ] },
        { title: "Step 5: The Answer Appears", blocks: [
          { type: "paragraph", text: "After the AI predicts and builds the response, you see the answer on your screen. It may look smooth and confident, but it is still important to remember how it was made." },
          { type: "paragraph", text: "AI is not a person who lived through experiences, checked a textbook, and thought carefully about what matters. It is a tool that uses patterns to generate a response. That response might be helpful - or it might need checking." },
        ] },
        { title: "Why Clear Prompts Help", blocks: [
          { type: "paragraph", text: "Better prompts usually lead to better answers. Instead of 'Tell me about robots,' try 'Explain the difference between robots and AI for a 4th grader, with examples.' Instead of 'Help with science,' try 'Give me three simple science fair project ideas about magnets using materials I can find at home.'" },
          { type: "paragraph", text: "AI works best when you give it a clear job." },
        ] },
        { title: "Try This", blocks: [
          { type: "paragraph", text: "Ask AI the same question three different ways:" },
          { type: "list", items: [
            "Explain electricity.",
            "Explain electricity using a water slide example.",
            "Explain electricity in five sentences for a 3rd grader.",
          ] },
          { type: "paragraph", text: "Compare the answers. You will see how much the prompt changes the response." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "When you ask AI a question, you give it a prompt. The AI reads the prompt, uses patterns from training, predicts a response, and creates an answer. It may seem like thinking, but it is really pattern-based prediction. That makes AI powerful, but not perfect." },
          { type: "callout", accent: "teal", text: "AI can give you a response, but you are responsible for understanding it. Stay curious, write clear prompts, and check important answers." },
        ] },
      ],
    },
    "should-kids-trust-everything-ai-says": {
      title: "Should Kids Trust Everything AI Says?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.aug13,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/shared/ai-workshop.jpg",
      imageAlt: "Students at an Avanza STEM AI workshop discussing when to trust and when to verify AI responses",
      imageCaption: "Knowing when to trust AI and when to check it is one of the most important skills students can learn at Avanza STEM AI workshops.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM AI workshop" },
      endingSecondary: { href: "/blog/why-ai-sometimes-gets-things-wrong", label: "Read: why AI sometimes gets things wrong" },
      endingRelatedSlug: "what-happens-when-you-ask-ai-a-question",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "AI can be helpful. It can explain homework problems, give project ideas, write stories, answer questions, and help you learn new things. It can feel like having a tutor, librarian, and brainstorming partner all in one place." },
          { type: "paragraph", text: "But should kids trust everything AI says? No. AI can be useful, but it is not always right. Kids should use AI with curiosity and caution." },
        ] },
        { title: "AI Can Sound Confident Even When It Is Wrong", blocks: [
          { type: "paragraph", text: "One tricky thing about AI is that it can sound very sure of itself. It might give an answer in a calm, clear way. It might use big words. It might even organize the answer into neat sections." },
          { type: "callout", accent: "teal", text: "A neat answer is not always a correct answer. AI can make mistakes, mix up facts, or even invent information. When AI makes something up, people often call it a hallucination." },
        ] },
        { title: "Think Like a Detective", blocks: [
          { type: "paragraph", text: "Using AI safely means thinking like a detective. A detective does not accept the first clue without checking. A detective asks questions, looks for evidence, and compares information." },
          { type: "paragraph", text: "When AI gives you an answer, ask:" },
          { type: "list", items: [
            "Does this make sense?",
            "Where did this information come from?",
            "Can I check it somewhere else?",
            "Is this about something important?",
            "Should I ask an adult?",
          ] },
          { type: "paragraph", text: "The goal is not to be scared of AI. The goal is to be smart with it." },
        ] },
        { title: "Some Questions Need Extra Care", blocks: [
          { type: "paragraph", text: "Some AI answers are low-risk. If you ask AI for a silly story about a dragon who loves pancakes, you do not need to fact-check every detail. It is just for fun." },
          { type: "paragraph", text: "But other topics need more caution. Be careful with AI answers about:" },
          { type: "list", items: [
            "Health and safety",
            "Money",
            "News and current events",
            "School assignments where accuracy matters",
            "Personal problems",
            "Private information",
            "Anything that could affect another person",
          ] },
          { type: "paragraph", text: "For those topics, AI should not be your only source." },
        ] },
        { title: "Ask a Trusted Adult", blocks: [
          { type: "paragraph", text: "If you are unsure about something AI says, ask a trusted adult. That could be a parent, teacher, librarian, coach, or another grown-up who can help you think it through." },
          { type: "paragraph", text: "AI can give general information, but it does not know your whole life. A trusted adult can understand the situation better. This is especially important if AI gives advice about your body, feelings, friendships, family, safety, or personal choices." },
        ] },
        { title: "Do Not Share Private Information", blocks: [
          { type: "paragraph", text: "Another important rule: do not share private information with AI. Private information includes:" },
          { type: "list", items: [
            "Your full name",
            "Your home or school address",
            "Passwords",
            "Phone numbers",
            "Personal photos",
            "Private family information",
            "Anything that would make you uncomfortable if strangers saw it",
          ] },
          { type: "paragraph", text: "AI tools and apps may handle information in different ways. Since kids may not know where that information goes, it is safer not to share private details. When in doubt, ask an adult first." },
        ] },
        { title: "Good Ways Kids Can Use AI", blocks: [
          { type: "paragraph", text: "AI can be great when used the right way. You can ask it to:" },
          { type: "list", items: [
            "Explain a confusing topic in simpler words",
            "Give practice math problems",
            "Help brainstorm science project ideas",
            "Quiz you before a test",
            "Suggest questions to ask a teacher",
            "Help you outline a story",
            "Explain coding errors",
            "Give examples of how something works",
          ] },
          { type: "paragraph", text: "The best use of AI is not copying. It is learning. If AI helps you understand something better, that is a win." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Kids should not trust everything AI says. AI can be helpful, creative, and fun, but it can also be wrong. It can sound confident even when it makes mistakes." },
          { type: "callout", accent: "teal", text: "Smart AI users do not believe everything. They think, check, and ask questions. Use AI like a tool - not like the boss of your brain." },
        ] },
      ],
    },
    "how-do-video-games-use-ai": {
      title: "How Do Video Games Use AI?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.aug20,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/curriculums/ai.jpg",
      imageAlt: "Students at an Avanza STEM workshop designing rules for a simple simulation, similar to game AI",
      imageCaption: "Designing rules for how something should behave is the same skill behind game AI. Avanza STEM students practice this kind of logical thinking.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM AI workshop" },
      endingSecondary: { href: "/blog/what-is-ai-explaining-to-kids", label: "Read: what is AI?" },
      endingRelatedSlug: "what-is-ai-explaining-to-kids",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Have you ever played a video game where an enemy chased you, a character talked to you, or the game got harder as you improved? That is not random magic. Many video games use AI." },
          { type: "paragraph", text: "Game AI helps characters move, make choices, react to players, and create challenges. It can make a game feel more alive. But video game AI is not always the same as the AI you might use to answer questions. In games, AI often means behavior rules that make characters seem smart." },
        ] },
        { title: "What Is Game AI?", blocks: [
          { type: "paragraph", text: "Game AI is technology that controls how computer characters act. These characters might be enemies, teammates, animals, villagers, monsters, racers, or shopkeepers. They are often called NPCs, which stands for non-player characters. An NPC is any character controlled by the game instead of a human player." },
          { type: "paragraph", text: "Game AI helps NPCs decide what to do. Should the enemy chase you? Should a teammate follow you? Should a racing car slow down before a turn? Should a shopkeeper say hello when you walk nearby? Those choices are part of game AI." },
        ] },
        { title: "Enemy Movement", blocks: [
          { type: "paragraph", text: "One common use of AI in games is enemy movement. Imagine a maze game where a monster tries to find you. The monster needs to move through the maze without getting stuck. Game designers can use algorithms - step-by-step sets of instructions - to help enemies navigate." },
          { type: "paragraph", text: "For example, an enemy might follow rules like:" },
          { type: "list", items: [
            "If the player is close, chase them.",
            "If the player is far away, patrol the area.",
            "If there is a wall, turn.",
            "If health is low, run away.",
            "Guard a treasure chest.",
          ] },
          { type: "paragraph", text: "Those simple rules can create behavior that feels intelligent." },
        ] },
        { title: "NPC Choices and Difficulty", blocks: [
          { type: "paragraph", text: "NPCs can also make choices. In some games, a character might talk differently depending on what you did earlier. A villager might thank you for helping them. A guard might block your path if you do not have a key. The game is checking conditions: if this happened, do that." },
          { type: "paragraph", text: "Some games also use AI to adjust difficulty. If a game is too easy, players get bored. If it is too hard, players get frustrated. Enemies might become faster, puzzles might get harder, or the game might give hints if you are stuck. This helps keep the game fun." },
        ] },
        { title: "Game AI Can Be Simple or Complex", blocks: [
          { type: "paragraph", text: "Not all game AI is advanced. Sometimes a character just walks back and forth. Sometimes an enemy follows a simple path. That still counts as game behavior, even if it is not very 'smart.'" },
          { type: "paragraph", text: "Other games use more complex systems. Characters may react to sound, light, player choices, or changing environments. The goal is not always to make the AI as smart as possible. The goal is to make the game fun." },
        ] },
        { title: "Why Not Make Enemies Perfect?", blocks: [
          { type: "paragraph", text: "If game AI can be smart, why not make enemies unbeatable? Because that would not be fun. Imagine playing a soccer game where the computer blocks every shot perfectly, or a racing game where computer cars never make mistakes. That would feel unfair." },
          { type: "callout", accent: "teal", text: "Good game AI is designed to challenge you, not crush you. Sometimes designers even make AI less perfect on purpose. Enemies might pause before attacking, miss sometimes, or give players clues. That gives you a chance to react, learn, and improve." },
        ] },
        { title: "Try Designing Your Own Game AI", blocks: [
          { type: "paragraph", text: "You can think like a game designer right now. Imagine you are creating a monster for a maze game. What rules should it follow?" },
          { type: "list", items: [
            "Walk around randomly until it sees the player.",
            "Chase the player if they are close.",
            "Stop chasing after 10 seconds.",
            "Run away if the player picks up a power-up.",
            "Guard a treasure chest.",
          ] },
          { type: "paragraph", text: "With just a few rules, you can create interesting behavior. Next time you play a game, watch the characters carefully and ask: what rules might be controlling what they do?" },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Video games use AI to control enemies, NPCs, difficulty, movement, and game behavior. Game AI can be simple rules or more complex systems. It helps characters react to players and makes games more fun." },
          { type: "callout", accent: "teal", text: "The best game AI is not always the smartest AI. It is the AI that creates the best experience for the player." },
        ] },
      ],
    },
    "is-a-robot-the-same-thing-as-ai": {
      title: "Is a Robot the Same Thing as AI?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.aug27,
      readTime: common.en.minutes.m4,
      authorId: "liam",
      image: "/images/workshops/upcoming-robotics.jpg",
      imageAlt: "Students building and programming a robot at an Avanza STEM robotics workshop",
      imageCaption: "A robot is the body. AI can be the brain. At Avanza STEM robotics workshops, students learn how sensors, motors, and code work together.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: build your first LEGO robot" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "how-do-video-games-use-ai",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Robots and AI often get talked about together. In movies, robots walk around, talk, think, make plans, and sometimes act almost human. Because of that, it is easy to think robots and AI are the same thing." },
          { type: "paragraph", text: "But they are not. A robot is a machine that can physically do things. AI is software that can make predictions, recognize patterns, or help make decisions. Sometimes they work together. But a robot does not always have AI, and AI does not always need a robot body." },
        ] },
        { title: "What Is a Robot?", blocks: [
          { type: "paragraph", text: "A robot is a machine that can sense, move, or perform tasks. Some robots look human, but many do not. A robot might be:" },
          { type: "list", items: [
            "A robotic vacuum",
            "A factory arm building cars",
            "A drone",
            "A Mars rover",
            "A toy robot",
            "A machine used in surgery",
          ] },
          { type: "paragraph", text: "Robots usually have physical parts like motors, wheels, arms, cameras, sensors, or grippers. The key idea is that robots interact with the physical world." },
        ] },
        { title: "What Is AI?", blocks: [
          { type: "paragraph", text: "AI, or artificial intelligence, is computer technology that can do tasks that seem to require intelligence. AI can recognize patterns, make predictions, generate text, classify images, translate languages, or recommend videos." },
          { type: "paragraph", text: "AI does not need a body. For example, an AI chatbot lives inside software. It can answer questions, but it cannot pick up a pencil unless it is connected to a robot. AI is like the decision-making part. A robot is the physical machine part." },
        ] },
        { title: "What Are Sensors and Motors?", blocks: [
          { type: "paragraph", text: "Sensors help machines detect the world. Humans have senses like sight, hearing, and touch. Robots use sensors to gather information. A robot might use a camera to 'see,' a microphone to 'hear,' a touch sensor to detect contact, a distance sensor to avoid walls, or a temperature sensor to measure heat." },
          { type: "paragraph", text: "Motors help robots move. A motor can spin wheels, lift an arm, open a claw, or turn a joint. If sensors are like a robot's senses, motors are like its muscles. But motors do not decide anything by themselves - they need instructions." },
        ] },
        { title: "A Robot Without AI", blocks: [
          { type: "paragraph", text: "Some robots do not use much AI at all. Imagine a simple robot that follows a black line on the floor. It has a light sensor underneath. If it sees the line, it moves forward. If it drifts away, it turns back." },
          { type: "paragraph", text: "That robot is following rules. It may seem smart, but it is not necessarily using advanced AI. It is using sensors, motors, and programmed instructions." },
        ] },
        { title: "AI Without a Robot", blocks: [
          { type: "paragraph", text: "Now imagine an AI that helps you write a poem. It can create words, but it has no wheels, arms, or camera. It cannot walk across the room. It cannot build a tower. It cannot grab a water bottle." },
          { type: "paragraph", text: "That is AI without a robot. It can work with information, but it does not have a physical body." },
        ] },
        { title: "A Robot With AI", blocks: [
          { type: "paragraph", text: "Some robots do use AI. A self-driving car is a good example. It has cameras and sensors to observe roads, signs, lanes, cars, and pedestrians. It uses AI to help understand what is happening and decide how to move safely." },
          { type: "callout", accent: "teal", text: "In these cases, the robot body and AI brain work together. The robot senses the world, the AI helps make decisions, and the motors make the robot move." },
        ] },
        { title: "Try This", blocks: [
          { type: "paragraph", text: "Look around your home or school. Can you find something that is a robot? Can you find something that uses AI? Can you find something that is just a regular computer?" },
          { type: "list", items: [
            "A calculator is a computer tool, but it is not usually AI.",
            "A robotic vacuum is a robot.",
            "A voice assistant may use AI.",
            "A printer is a machine, but not usually a robot in the way we normally mean.",
          ] },
          { type: "paragraph", text: "Thinking this way helps you classify technology like an engineer." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "A robot is not the same thing as AI. A robot is a physical machine that can move or do tasks. AI is software that recognizes patterns, makes predictions, or helps decide what to do. They can work together, but they are different." },
          { type: "callout", accent: "teal", text: "The next time you see a 'smart robot,' ask: what part is the robot, what part is the AI, and what sensors help it understand the world?" },
        ] },
      ],
    },
    "how-do-robots-know-where-they-are": {
      title: "How Do Robots Know Where They Are?",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      date: common.en.dates.sep3,
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/workshops/upcoming-robotics.jpg",
      imageAlt: "Students programming a robot at an Avanza STEM robotics workshop",
      imageCaption: "To move safely through a space, robots collect clues from sensors — just like humans use their senses to navigate.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: build your first LEGO robot" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-makes-a-robot-a-robot",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Imagine you are walking through your school with your eyes closed. You might take a few steps, but pretty quickly you would run into a wall, a desk, or maybe someone's backpack. To move safely, you need clues about where you are." },
          { type: "paragraph", text: "Robots have the same problem. A robot does not automatically know where it is. It has to figure that out using sensors, cameras, wheels, maps, and math. The basic idea is simple: a robot collects clues from the world around it, then uses those clues to make its best guess about where it is and where it should go next." },
        ] },
        { title: "Robots Need Senses Too", blocks: [
          { type: "paragraph", text: "Humans use senses like sight, hearing, touch, and balance. Robots use sensors — tools that help a robot notice something about the world. Some detect distance. Others see objects, measure speed, or figure out direction." },
          { type: "list", items: [
            "Cameras — to see walls, roads, people, signs, or obstacles",
            "Wheels — to measure how far the robot has traveled",
            "GPS — to estimate location outdoors",
            "Lidar — to scan the area with laser light",
            "Ultrasonic sensors — to bounce sound waves off objects",
            "Gyroscopes — to sense turning or tilting",
          ] },
          { type: "paragraph", text: "Each sensor gives the robot a piece of the puzzle. A camera might show a doorway. A wheel sensor might say the robot has moved five feet. A distance sensor might detect a wall nearby. The robot combines those clues to understand its position." },
        ] },
        { title: "Counting Wheel Turns", blocks: [
          { type: "paragraph", text: "One simple way a robot can guess where it is is by counting how much its wheels turn. If a robot starts at the classroom door and its wheels roll forward ten feet, it can estimate that it is now ten feet from the start. This is called odometry — a little like counting your steps." },
          { type: "callout", accent: "green", text: "What if the wheel slips? What if the floor is uneven? Even a tiny measurement error can grow bigger over time. That is why robots usually rely on more than one sensor." },
        ] },
        { title: "Using Cameras Like Eyes", blocks: [
          { type: "paragraph", text: "Some robots use cameras to recognize what is around them. A robot vacuum notices furniture legs and walls. A self-driving car sees lane lines, traffic lights, and pedestrians. A Mars rover uses cameras to study rocks and avoid dangerous ground." },
          { type: "paragraph", text: "But a camera does not understand the world the way a human does. When you see a chair, you instantly know it is a chair. A robot sees the image as data — it has to process shapes, colors, edges, shadows, and patterns before it can decide what it is looking at. Lighting changes. Objects overlap. A chair looks different from the front, side, and back. A robot has to be trained to handle all of those possibilities." },
        ] },
        { title: "Building a Map", blocks: [
          { type: "paragraph", text: "Some robots make maps as they move. A robot vacuum might start in a room and slowly learn where the walls, furniture, and open spaces are. It can then use that map to clean more efficiently instead of bumping around randomly." },
          { type: "paragraph", text: "This is similar to what happens when you explore a new building. At first you do not know where anything is. After walking around, you start to remember: the stairs are near the entrance, the gym is down the hall, the library is around the corner. Robots build maps too, but they do it with sensors and computer programs." },
          { type: "callout", accent: "green", text: "Some robots try to build a map and figure out where they are inside that map at the same time — asking two questions at once: where am I, and what does this place look like?" },
        ] },
        { title: "Why Robots Still Get Lost", blocks: [
          { type: "paragraph", text: "Even smart robots can get confused. A robot might get lost if its wheels slip, a sensor gives a bad reading, the room changes, furniture gets moved, the lighting goes dark, something blocks the camera, or two hallways look almost the same." },
          { type: "paragraph", text: "That is why robots check their location again and again. They do not make one guess and trust it forever. They keep updating their estimate as new information comes in — a lot like how you check a map, look at the signs, and look around while walking through a museum." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Robots know where they are by collecting clues. They use sensors like cameras, wheels, GPS, lasers, and motion detectors, then combine those clues to estimate their location, build maps, avoid obstacles, and decide where to go next." },
          { type: "callout", accent: "green", text: "The next time you see a robot moving through a space, remember: it is not just rolling. It is sensing, guessing, checking, and adjusting — over and over again. That is how robots find their way." },
        ] },
      ],
    },
    "why-robots-are-bad-at-easy-human-tasks": {
      title: "Why Robots Are Bad at Easy Human Tasks",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      date: common.en.dates.sep10,
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/curriculums/engineering.jpg",
      imageAlt: "Students testing a gripper design at an Avanza STEM engineering workshop",
      imageCaption: "Tasks that feel simple to humans — like picking up an object — require robots to solve many smaller problems all at once.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM workshop" },
      endingSecondary: { href: "/blog/getting-started-with-lego-robotics", label: "Read: getting started with LEGO robotics" },
      endingRelatedSlug: "getting-started-with-lego-robotics",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Folding laundry seems easy. You pick up a shirt, shake it out, find the sleeves, fold it in half, and put it away. You probably do not think hard about it." },
          { type: "paragraph", text: "But for a robot, folding laundry is extremely difficult. The same is true for opening doors, picking up toys, tying shoes, pouring cereal, or grabbing a backpack from the floor. These tasks seem simple to humans, but they are some of the hardest problems in robotics." },
          { type: "paragraph", text: "Robots can build cars, explore Mars, and lift heavy objects in factories. So why is a sock so confusing? The answer is that the real world is messy." },
        ] },
        { title: "Humans Are Better Than We Realize", blocks: [
          { type: "paragraph", text: "Your brain and body are doing amazing things all the time, even when you do not notice. When you pick up a pencil, you instantly know where it is, how heavy it probably is, how hard to grip it, and how to move your fingers around it — even if it is sideways, under a notebook, or partly hanging off the table." },
          { type: "paragraph", text: "A robot has to figure all of that out step by step. First it has to see the pencil. Then it has to understand the pencil is separate from the table. Then it has to decide where to grab it. Then it has to move its arm without knocking anything over. Then it has to squeeze hard enough to hold the pencil but not so hard that it breaks it. That is a lot." },
          { type: "callout", accent: "green", text: "Humans make gripping look easy because we have had years of practice using our eyes, hands, muscles, and brains together. Robots have to learn all of that from scratch." },
        ] },
        { title: "Soft Things Are Hard", blocks: [
          { type: "paragraph", text: "Robots often struggle with soft, floppy objects. Laundry is a perfect example. A shirt does not keep one shape. It bends, wrinkles, twists, and collapses. A towel can fold over itself. A sock can hide inside another sock." },
          { type: "paragraph", text: "Hard objects are usually easier for robots. A metal block stays the same shape. A plastic box has clear edges. A cup has a predictable form. But cloth changes shape every time it moves. A robot cannot simply memorize one shirt shape — it has to understand how fabric behaves, which is very difficult." },
        ] },
        { title: "Opening Doors Is Not That Simple", blocks: [
          { type: "paragraph", text: "Think about how many different doors exist. Some have round knobs. Some have handles. Some slide. Some push. Some pull. Some are heavy. Some are light. Some stick. Some close automatically." },
          { type: "paragraph", text: "A human can look at most doors and quickly understand what to do. A robot has to detect the handle, understand how it moves, position its gripper correctly, apply the right force, and move backward or forward while opening it. If it pulls when it should push, it fails. If it grips the handle at the wrong angle, it fails. A task that takes you two seconds can become a major engineering challenge." },
        ] },
        { title: "The World Does Not Stay Still", blocks: [
          { type: "paragraph", text: "Factory robots are very good at repeating the same movement because their environment is controlled. A car part arrives in the same place every time. The robot arm moves in the same pattern. Homes, schools, and outdoor spaces are completely different." },
          { type: "paragraph", text: "Objects move around. A backpack might be on the floor one day and on a chair the next. A toy might be upside down. Robots have to handle surprises. Humans are excellent at this. If your pencil rolls under a chair, you can bend down, move the chair, reach around a backpack, and grab it — no reprogramming needed. Robots are getting better at surprises, but it is still one of the biggest challenges in robotics." },
        ] },
        { title: "Picking Things Up Takes Judgment", blocks: [
          { type: "paragraph", text: "When humans pick something up, we automatically adjust our grip. You do not hold an egg the same way you hold a hammer. You do not grab a paper cup the same way you grab a baseball. You use different pressure, finger positions, and movements." },
          { type: "paragraph", text: "If a robot grips too softly, the object falls. If it grips too hard, the object breaks. If it grabs the wrong part, the object slips. This is especially hard when objects are shiny, clear, soft, tiny, heavy, oddly shaped, or moving. That is why robot hands and grippers are such an important area of engineering." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Robots are amazing, but the world humans live in is complicated. Tasks that feel easy to us are often hard for robots because humans are incredibly good at sensing, balancing, touching, adjusting, and learning from experience." },
          { type: "callout", accent: "green", text: "The next time you fold a shirt, open a door, or pick up a snack — you are doing something a robot might find very difficult. Your brain and hands are engineering masterpieces." },
        ] },
      ],
    },
    "what-makes-a-robot-a-robot": {
      title: "What Makes a Robot a Robot?",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      date: common.en.dates.sep17,
      readTime: common.en.minutes.m4,
      authorId: "noah",
      image: "/images/workshops/past-engineering.jpg",
      imageAlt: "Students exploring how sensors and motors work together at an Avanza STEM engineering workshop",
      imageCaption: "A robot is not just a machine that moves. It is a system that senses, decides, and acts — and students at Avanza STEM workshops explore exactly how that works.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: build your first LEGO robot" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "how-do-robots-know-where-they-are",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Is a toaster a robot? What about a remote-control car? A vending machine? A smart speaker? A robot vacuum?" },
          { type: "paragraph", text: "The word robot gets used a lot, but not every machine is a robot. A robot is a machine that can sense the world, make decisions, and take action. That means most robots have three important parts: sensors, a controller, and actuators. In simpler words: a robot notices things, thinks through instructions, and moves or does something." },
        ] },
        { title: "Part 1: Sensors Help Robots Notice", blocks: [
          { type: "paragraph", text: "Robots need information about the world around them. That information comes from sensors — devices that detect something." },
          { type: "list", items: [
            "Light", "Distance", "Sound", "Touch", "Temperature", "Movement", "Direction", "Color", "Pressure",
          ] },
          { type: "paragraph", text: "A robot vacuum uses sensors to detect walls, stairs, furniture, and dirt. A self-driving car uses cameras and other sensors to detect roads, signs, cars, and people. A robotic arm in a factory might use sensors to know whether a part is in the right place. Without sensors, a robot would be like a person trying to navigate with no sight, hearing, or touch." },
        ] },
        { title: "Part 2: Controllers Help Robots Decide", blocks: [
          { type: "paragraph", text: "The controller is the robot's decision center. It is not a brain like a human brain, but it is the part that runs instructions — which might be simple or very advanced." },
          { type: "paragraph", text: "A simple robot might follow a rule like: if the sensor detects a wall, turn left. A more advanced robot might use a camera, map, and computer program to decide the safest path through a room. Controllers can be tiny computers, circuit boards, or powerful processors. They take sensor information and decide what the robot should do next." },
          { type: "callout", accent: "green", text: "Sense. Decide. Act. That loop repeats again and again — and it is one of the most important ideas in all of robotics." },
        ] },
        { title: "Part 3: Actuators Help Robots Move", blocks: [
          { type: "paragraph", text: "An actuator is the part of a robot that makes movement happen. Motors are one common type. They can spin wheels, move arms, turn gears, open grippers, or rotate joints." },
          { type: "paragraph", text: "A robot arm in a factory might have several motors — one for each joint. A robot hand might have tiny motors or cables to move its fingers. A drone uses motors to spin propellers and stay in the air. Without actuators, a robot could sense and decide, but it could not do anything physical." },
        ] },
        { title: "Does a Robot Have to Look Like a Person?", blocks: [
          { type: "paragraph", text: "No. This is one of the biggest robot myths. Robots do not need faces, arms, legs, or eyes. The shape of a robot depends on its job." },
          { type: "list", items: [
            "A small vacuum", "A rover", "A mechanical arm", "A drone", "A submarine", "A delivery cart", "A machine inside a factory",
          ] },
          { type: "callout", accent: "green", text: "Good robot design starts with the question: what does this robot need to do? The answer drives every choice about shape, sensors, and movement." },
        ] },
        { title: "Is a Remote-Control Car a Robot?", blocks: [
          { type: "paragraph", text: "Usually, a regular remote-control car is not considered a full robot because a human controls every movement. But if the car can sense obstacles and decide how to steer on its own, it becomes more robot-like. The difference is decision-making. A machine that only follows direct human commands is just a machine. A robot can make at least some decisions based on information it collects." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "A robot is more than a machine that moves. A robot uses sensors to collect information, a controller to process instructions, and actuators to take action. It does not have to look human. It does not have to talk. At its core, it follows one simple loop:" },
          { type: "callout", accent: "green", text: "Sense. Decide. Act. That loop is what makes robotics so powerful — and so interesting." },
        ] },
      ],
    },
    "how-mars-rovers-drive-without-a-driver": {
      title: "How Mars Rovers Drive Without a Driver",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      date: common.en.dates.sep24,
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/curriculums/engineering.jpg",
      imageAlt: "Students working through an engineering design challenge at an Avanza STEM workshop",
      imageCaption: "Mars rovers move slowly and carefully across another planet — using cameras, wheels, and software to navigate terrain no human can reach.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: build your first LEGO robot" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "design-a-mars-rover-out-of-cardboard",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "There are robots driving on Mars. Mars rovers are robotic explorers that move across the surface of another planet, study rocks, take pictures, and help scientists learn. And there is no driver sitting behind a steering wheel — no astronaut nearby with a remote control." },
          { type: "paragraph", text: "So how does a Mars rover drive? The answer involves space, cameras, wheels, planning, and a lot of patience." },
        ] },
        { title: "Mars Is Very Far Away", blocks: [
          { type: "paragraph", text: "Mars is millions of miles from Earth. Because of that distance, messages between Earth and Mars take time to travel. Even though radio signals move extremely fast, they are not instant. Depending on where Earth and Mars are in their orbits, a message can take several minutes to reach Mars." },
          { type: "paragraph", text: "That means scientists cannot drive a Mars rover like a video game car. If a rover starts rolling toward a rock, engineers on Earth cannot instantly press a button to stop it. By the time the command arrives, the rover might already be in trouble." },
        ] },
        { title: "The Rover Gets Instructions", blocks: [
          { type: "paragraph", text: "Mars rovers do not usually wake up and randomly decide where to go. Teams of scientists and engineers on Earth study images and data from the rover. They look at the landscape and choose interesting targets — rocks, soil, hills, or flat paths." },
          { type: "paragraph", text: "Then they send the rover a set of instructions. The instructions might tell it to drive toward a certain location, take pictures, examine a rock, or use a scientific tool. But because of the time delay, the rover also needs some ability to make decisions on its own." },
        ] },
        { title: "Cameras Are the Rover's Eyes", blocks: [
          { type: "paragraph", text: "Mars rovers use cameras to see the world around them. Some cameras look ahead to help plan a path. Some look at the ground. Some take wide landscape pictures. Others help scientists study rocks in detail." },
          { type: "paragraph", text: "The rover can use camera images to detect obstacles like large rocks, steep slopes, holes, or rough ground. This matters because Mars is not a smooth parking lot. It has dust, stones, ridges, craters, and uneven terrain. A rover has to move carefully to avoid getting stuck or damaged." },
        ] },
        { title: "Wheels Built for Another Planet", blocks: [
          { type: "paragraph", text: "Mars rover wheels are designed for rough ground. They need to roll over rocks, handle dust, and support the rover's weight in a harsh environment with cold temperatures and no repair shop nearby." },
          { type: "paragraph", text: "If your bike gets a flat tire, someone can fix it. If a Mars rover wheel gets damaged, engineers have to work around the problem from Earth. That is why rover driving is slow and careful. Speed is not the goal. Exploration is." },
        ] },
        { title: "The Rover Can Avoid Some Trouble", blocks: [
          { type: "paragraph", text: "Mars rovers can use autonomous navigation — meaning the robot can handle some tasks by itself. Engineers might tell the rover to drive toward a point. As it moves, the rover uses its cameras to check for obstacles. If it sees a dangerous rock or slope, it can adjust its path or stop." },
          { type: "callout", accent: "green", text: "The rover is not thinking like a human. It is following carefully designed computer instructions that ask: is this path safe? Is there an obstacle? Can I go around it? Should I stop and wait for more instructions?" },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Mars rovers drive without a driver by using instructions from Earth, cameras to see the terrain, wheels designed for rough ground, and software that helps them avoid danger. They cannot be driven like remote-control cars because Mars is too far away." },
          { type: "paragraph", text: "Every wheel turn is part of a bigger mission: to explore a planet humans have not walked on yet." },
        ] },
      ],
    },
    "why-robot-hands-are-so-hard-to-make": {
      title: "Why Robot Hands Are So Hard to Make",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      date: common.en.dates.oct1,
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/workshops/upcoming-robotics.jpg",
      imageAlt: "Students testing a robotic gripper at an Avanza STEM robotics workshop",
      imageCaption: "Designing a hand that can grip many different objects is one of the hardest open problems in robotics — and one of the most interesting.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM robotics workshop" },
      endingSecondary: { href: "/blog/how-factory-robots-build-cars", label: "Read: how factory robots build cars" },
      endingRelatedSlug: "how-factory-robots-build-cars",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Look at your hand for a second. Open it. Close it. Wiggle your fingers. Touch your thumb to each fingertip. Pick up a pencil. Tap the table. Hold something gently. Your hand is doing something incredible." },
          { type: "paragraph", text: "Human hands are one of the hardest things for engineers to copy. Robot hands may look cool, but making them work like real hands is extremely difficult. Because hands are not just simple grabbers — they are flexible, sensitive, strong, gentle, and controlled by a powerful brain." },
        ] },
        { title: "Fingers Are Complicated", blocks: [
          { type: "paragraph", text: "A human hand has many moving parts. Each finger has joints. Your thumb can move in a special way that lets it touch your other fingers. Your wrist can turn, bend, and adjust. All these parts work together so you can grab objects from different angles." },
          { type: "paragraph", text: "A robot hand needs mechanical parts to copy those movements — joints, motors, gears, cables, materials, and control systems. Even moving one finger smoothly can be difficult. Moving five fingers together in a useful way is much harder." },
        ] },
        { title: "Grip Strength Is Tricky", blocks: [
          { type: "paragraph", text: "When you pick something up, your hand automatically chooses how hard to squeeze. You hold a potato chip gently. You hold a heavy backpack strap firmly. You hold a pencil somewhere in between." },
          { type: "paragraph", text: "A robot has to learn this. If it squeezes too hard, it might crush something. If it squeezes too lightly, the object might slip. If it grabs the wrong part, the object might twist or fall. This is especially hard because objects have different shapes, sizes, weights, and textures. A smooth glass cup is different from a fuzzy tennis ball. A squishy sponge is different from a metal spoon." },
        ] },
        { title: "Touch Matters", blocks: [
          { type: "paragraph", text: "Your hand is covered in touch sensors. You can feel pressure, texture, temperature, slipping, and pain. If a cup starts sliding out of your hand, you feel it almost instantly and grip harder." },
          { type: "paragraph", text: "Robot hands need touch sensors too, but copying human touch is very difficult. A robot needs to know: am I touching the object? How hard am I pressing? Is the object slipping? Is it soft or hard? Am I about to break it? Without that feedback, a robot hand has to guess — and guessing can lead to dropped or broken objects." },
        ] },
        { title: "Human Hands Are Good at Weird Objects", blocks: [
          { type: "paragraph", text: "Human hands can pick up all kinds of things: a coin, a sandwich, a water bottle, a shoelace, a basketball, a crumpled piece of paper. These objects do not all have the same shape. Some are small, some are large, some are soft, some are slippery, some change shape when you touch them." },
          { type: "paragraph", text: "Robot hands often work best when objects are predictable. If a robot is designed to pick up one kind of part in a factory, it can be very good at that job. But a general-purpose robot hand that can pick up almost anything? That is much harder." },
        ] },
        { title: "Robot Hands Do Not Always Need to Look Human", blocks: [
          { type: "paragraph", text: "The best robot hand is not always the one that looks most like a human hand. Some robots use simple grippers with two fingers. Others use suction cups. Some use soft rubber fingers that wrap around objects. Some use magnets for metal parts." },
          { type: "callout", accent: "green", text: "Engineers choose the design based on the job. A robot hand should match the problem it is trying to solve — not the shape of a human hand." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Robot hands are hard to make because gripping is not simple. A useful hand needs movement, strength, gentleness, touch, control, and the ability to handle objects that are messy, soft, slippery, or oddly shaped." },
          { type: "paragraph", text: "Human hands are so good that we forget how amazing they are. Every time you tie your shoes, open a snack, or catch a ball, your hand is doing something engineers are still working hard to copy. That is what makes robot hands one of the most interesting challenges in all of robotics." },
        ] },
      ],
    },
    "how-factory-robots-build-cars": {
      title: "How Factory Robots Build Cars",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      date: common.en.dates.oct8,
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/workshops/past-engineering.jpg",
      imageAlt: "Students examining how robot arms work during an Avanza STEM engineering workshop",
      imageCaption: "Factory robots are designed for specific jobs — welding, painting, and moving parts with precision and consistency.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM workshop" },
      endingSecondary: { href: "/blog/why-robot-hands-are-so-hard-to-make", label: "Read: why robot hands are so hard to make" },
      endingRelatedSlug: "why-robot-hands-are-so-hard-to-make",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Cars are huge machines made from thousands of parts — doors, seats, wheels, windows, wires, lights, engines or motors, and many hidden pieces most people never see. Building one takes a lot of work." },
          { type: "paragraph", text: "In modern car factories, robots help do many of the jobs that need speed, strength, accuracy, and repetition. These robots do not usually look like people. Many look like giant mechanical arms, moving with incredible precision." },
        ] },
        { title: "Factory Robots Are Great at Repetition", blocks: [
          { type: "paragraph", text: "Robots are very good at doing the same task again and again. That is useful in car manufacturing because many parts need to be placed, welded, painted, or moved in exactly the same way. A robot arm can repeat a motion thousands of times with very little variation. It does not get bored, lose focus, or forget the next step." },
          { type: "callout", accent: "green", text: "If a robot needs to weld the same spot on every car frame, it can move to that exact position each time — consistently, all day long." },
        ] },
        { title: "Welding the Car Body", blocks: [
          { type: "paragraph", text: "One major job factory robots do is welding — joining metal pieces together using heat. Car bodies need to be strong and carefully assembled, and robotic welding arms can move quickly and accurately to spots that may be awkward for humans to access." },
          { type: "paragraph", text: "Engineers, technicians, and workers design, monitor, repair, program, and inspect the robotic systems. The robot does the repeated physical action, but humans make sure the whole process works." },
        ] },
        { title: "Painting With Precision", blocks: [
          { type: "paragraph", text: "Painting a car is not as simple as spraying color on metal. The paint needs to be smooth, even, and consistent. Too much paint can drip. Too little can leave weak coverage. Factory robots are often used for painting because they can move spray tools in controlled patterns — applying paint evenly across doors, hoods, roofs, and other surfaces." },
        ] },
        { title: "Moving Heavy Parts", blocks: [
          { type: "paragraph", text: "Some car parts are heavy. Robots can help lift, move, and position these parts safely. A robotic arm might move a door into place. Another system might carry parts along the assembly line. Lifting heavy parts over and over can be tiring or dangerous for humans, so robots help reduce strain and make the factory safer." },
        ] },
        { title: "Safety and Programming", blocks: [
          { type: "paragraph", text: "Factory robots can be powerful and fast, so safety is extremely important. Many industrial robots work inside safety zones with barriers, sensors, and warning lights. Some newer robots, called collaborative robots or cobots, are designed with extra safety features to work more closely with people." },
          { type: "paragraph", text: "A factory robot does not magically know how to build a car — it has to be programmed. Engineers tell the robot where to move, how fast, when to use a tool, how much force to apply, and what to do if something goes wrong. A car factory may have robots, conveyor belts, cameras, tools, and human workers all connected in a carefully planned process." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Factory robots help build cars by welding, painting, moving parts, and repeating precise tasks over and over. They are not usually human-shaped — they are designed for specific jobs. A welding robot looks different from a painting robot because each job needs different tools and movements." },
          { type: "callout", accent: "green", text: "The best engineering lesson from car factories: you do not design a robot to look cool. You design it to solve a problem — and in car factories, robots help turn thousands of separate parts into machines that can drive down the road." },
        ] },
      ],
    },
    "why-is-the-sky-blue-but-sunsets-are-orange": {
      title: "Why Is the Sky Blue but Sunsets Are Orange?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.oct15,
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/workshops/past-science.jpg",
      imageAlt: "Students exploring light and color at an Avanza STEM science workshop",
      imageCaption: "The colors we see in the sky depend on how sunlight scatters through the atmosphere.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-does-metal-feel-colder-than-wood", label: "Read next: why does metal feel colder than wood?" },
      endingRelatedSlug: "why-does-metal-feel-colder-than-wood",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Look up on a clear afternoon and the sky usually looks blue. But if you look again near sunset, the same sky can glow orange, red, pink, or even purple." },
          { type: "paragraph", text: "So what changed? The sun is still the same sun. The air is still the same air. But the path sunlight takes through the atmosphere changes, and that makes a huge difference." },
        ] },
        { title: "Sunlight Is Not Just One Color", blocks: [
          { type: "paragraph", text: "Even though sunlight looks white or yellowish to our eyes, it is actually made of many colors mixed together. You can think of sunlight like a rainbow packed into one beam." },
          { type: "paragraph", text: "That rainbow includes red, orange, yellow, green, blue, indigo, and violet light. Each color travels as a wave. Some colors have longer waves, like red and orange. Other colors have shorter waves, like blue and violet. This matters because different colors behave differently when they crash into tiny bits of air." },
        ] },
        { title: "The Air Is Not Empty", blocks: [
          { type: "paragraph", text: "The sky may look like empty space, but Earth's atmosphere is full of tiny molecules. These molecules are far too small to see, but sunlight bumps into them constantly." },
          { type: "paragraph", text: "When light hits these tiny air molecules, some of the light gets scattered. Scattering means the light gets bounced in many directions instead of traveling straight. Blue light scatters more easily than red or orange light because blue light has a shorter wavelength." },
          { type: "paragraph", text: "So during the day, when sunlight enters the atmosphere, blue light gets scattered all across the sky. That scattered blue light comes at your eyes from every direction, which is why the whole sky looks blue." },
        ] },
        { title: "So Why Isn't the Sky Purple?", blocks: [
          { type: "paragraph", text: "Violet light scatters even more than blue light, so this is a great question. There are a few reasons the sky does not usually look purple. First, the sun gives off less violet light than blue light. Second, some violet light gets absorbed higher in the atmosphere. Third, our eyes are better at seeing blue than violet." },
          { type: "paragraph", text: "So even though violet is part of the story, blue wins." },
        ] },
        { title: "What Changes at Sunset?", blocks: [
          { type: "paragraph", text: "At sunset, the sun is low in the sky. That means sunlight has to travel through a much longer stretch of atmosphere before it reaches your eyes. Imagine shining a flashlight straight through a thin glass of water. Now imagine shining it sideways through the longest part of the glass. The light has to pass through much more material." },
          { type: "paragraph", text: "That is what happens at sunset. As sunlight travels through this longer path of air, much of the blue light gets scattered away before it reaches you. The colors that are left are the longer-wavelength colors, like red, orange, and yellow. That is why sunsets often look warm and glowing." },
        ] },
        { title: "Why Are Some Sunsets Extra Colorful?", blocks: [
          { type: "paragraph", text: "Some sunsets look plain. Others look like the sky is on fire. The difference often comes from what is floating in the air. Dust, water droplets, pollution, smoke, and clouds can all affect how light scatters." },
          { type: "paragraph", text: "Clouds can also act like giant screens. When the sun is low, orange and red light can shine onto the bottoms of clouds, making them glow. That is why sunsets can look especially dramatic after a storm or when the sky has just the right mix of clouds and clear space." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "The sky is blue because blue light scatters easily in the atmosphere. Sunsets are orange and red because sunlight travels through more air, scattering much of the blue light away and leaving warmer colors behind." },
          { type: "callout", accent: "orange", text: "So the next time you see a blue sky or a bright orange sunset, you are not just looking at pretty colors. You are watching sunlight interact with Earth's atmosphere." },
        ] },
      ],
    },
    "why-do-your-ears-pop-on-an-airplane": {
      title: "Why Do Your Ears Pop on an Airplane?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.oct22,
      readTime: common.en.minutes.m4,
      authorId: "liam",
      image: "/images/workshops/past-science.jpg",
      imageAlt: "Students discovering how air pressure works at an Avanza STEM science workshop",
      imageCaption: "Air pressure is invisible, but your body notices it — especially when it changes quickly.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-is-the-sky-blue-but-sunsets-are-orange", label: "Read next: why is the sky blue but sunsets are orange?" },
      endingRelatedSlug: "why-is-the-sky-blue-but-sunsets-are-orange",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "If you have ever flown in an airplane, you may have felt a strange pressure in your ears during takeoff or landing. Then suddenly: pop." },
          { type: "paragraph", text: "It can feel weird, annoying, or even a little uncomfortable. But your ears are not broken. They are reacting to air pressure." },
        ] },
        { title: "Air Has Pressure", blocks: [
          { type: "paragraph", text: "Air may seem light, but it still pushes on things. The air around you is always pressing on your body from every direction. At sea level, there is a lot of air above you, so the air pressure is higher. Higher up in the sky, there is less air above you, so the pressure is lower." },
          { type: "paragraph", text: "When an airplane takes off, it climbs into air with lower pressure. When it lands, it returns to air with higher pressure. Even though airplane cabins are pressurized to keep passengers safe and comfortable, the pressure inside the cabin still changes. Your ears notice." },
        ] },
        { title: "Your Eardrum Feels the Difference", blocks: [
          { type: "paragraph", text: "Inside your ear is a thin piece of tissue called the eardrum. It vibrates when sound hits it, helping you hear. There is air on both sides of your eardrum — air outside your ear, and air behind the eardrum in your middle ear." },
          { type: "paragraph", text: "For your ear to feel normal, the pressure on both sides of the eardrum needs to be balanced. When the pressure outside your ear changes quickly, the pressure behind your eardrum may not change right away. That pressure difference can push or pull on your eardrum. That is the full, clogged, or uncomfortable feeling you get." },
        ] },
        { title: "The Eustachian Tube Helps Fix It", blocks: [
          { type: "paragraph", text: "Your body has a small tube called the Eustachian tube. It connects your middle ear to the back of your throat. Most of the time, this tube is closed. But when you swallow, yawn, or chew, it can open for a moment." },
          { type: "paragraph", text: "When it opens, air can move in or out of your middle ear. That helps balance the pressure on both sides of your eardrum. The pop you feel is the pressure suddenly evening out." },
        ] },
        { title: "Why Landing Can Feel Worse Than Takeoff", blocks: [
          { type: "paragraph", text: "Many people notice their ears more during landing than during takeoff. That is because during landing, the air pressure in the cabin increases as the plane gets closer to the ground. Your middle ear needs to let more air in to match the outside pressure." },
          { type: "paragraph", text: "If your Eustachian tubes do not open easily, your eardrums can feel squeezed inward. That can hurt more than the pressure change during takeoff. This is also why flying with a cold can be uncomfortable — if your nose and throat are stuffy, the Eustachian tubes may not open as easily." },
        ] },
        { title: "Why Swallowing or Yawning Helps", blocks: [
          { type: "paragraph", text: "Swallowing and yawning move muscles near the Eustachian tubes. That movement can help the tubes open. Chewing gum, sipping water, or yawning during takeoff and landing can help your ears adjust because those actions encourage the pressure-balancing system to work." },
          { type: "paragraph", text: "Babies often cry on airplanes partly because they feel ear pressure but do not know how to fix it. Crying makes them move their throat and mouth, which can actually help their ears pop." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Your ears pop on airplanes because air pressure changes as the plane climbs or lands. Your eardrum feels the difference, and your Eustachian tubes help balance the pressure." },
          { type: "callout", accent: "orange", text: "That little pop is your body making an adjustment. It may feel strange, but it is actually a smart built-in system doing its job." },
        ] },
      ],
    },
    "why-does-metal-feel-colder-than-wood": {
      title: "Why Does Metal Feel Colder Than Wood?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.oct29,
      readTime: common.en.minutes.m4,
      authorId: "noah",
      image: "/images/workshops/past-science.jpg",
      imageAlt: "Students testing materials at an Avanza STEM science workshop",
      imageCaption: "Two objects can be the same temperature but feel completely different — and the reason is about how heat moves, not just where it sits.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-do-we-slip-on-ice", label: "Read next: why do we slip on ice?" },
      endingRelatedSlug: "why-do-we-slip-on-ice",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Touch a metal chair leg and a wooden table in the same room. The metal might feel cold, while the wood feels warmer. But here is the surprising part: they are probably the same temperature." },
          { type: "paragraph", text: "So why does one feel colder? The answer is not just temperature. It is heat transfer." },
        ] },
        { title: "Your Hand Is Warm", blocks: [
          { type: "paragraph", text: "Your body is usually warmer than the objects around you. Your skin might be around 90°F, while a room might be around 70°F. When you touch something cooler than your hand, heat moves from your hand into that object." },
          { type: "paragraph", text: "Your nerves do not only sense the object's temperature. They also sense how quickly heat is leaving your skin. If heat leaves your hand quickly, the object feels cold. If heat leaves slowly, it does not feel as cold." },
        ] },
        { title: "Metal Moves Heat Quickly", blocks: [
          { type: "paragraph", text: "Metal is a good thermal conductor. That means heat can move through it easily. When you touch metal, heat from your hand quickly flows into the metal and spreads away from the spot you touched. Because the heat keeps moving away, more heat keeps leaving your hand. Your skin cools down fast, so your brain says that feels cold." },
          { type: "paragraph", text: "Wood is different. Wood is a poor thermal conductor compared with metal. Heat does not move through it as quickly. When you touch wood, heat leaves your hand more slowly. The tiny area of wood under your fingers warms up a little, and the heat does not spread away as fast. So wood feels warmer, even if it is the same temperature as the metal." },
        ] },
        { title: "Same Temperature, Different Feeling", blocks: [
          { type: "paragraph", text: "This is one of the coolest tricks in everyday science: temperature and how something feels are not always the same. A metal spoon and a wooden spoon sitting in the same kitchen drawer are probably at the same temperature. They have both been in the same room for a long time. But the metal spoon feels colder because it takes heat from your hand faster." },
          { type: "callout", accent: "orange", text: "Your sense of touch is really sensing heat movement. Two objects at the same temperature can feel completely different based on how fast they pull heat from your skin." },
        ] },
        { title: "Why Does This Matter in Design?", blocks: [
          { type: "paragraph", text: "Engineers think about heat transfer all the time. A metal pan is useful because it transfers heat quickly from the stove to the food. But that also means the handle can get hot, which is why many pans have plastic, rubber, or wooden handles." },
          { type: "paragraph", text: "A winter jacket works because it slows heat transfer. It traps air, and air is not great at moving heat. That helps keep your body heat near you. A metal slide in the sun can get very hot because metal transfers heat quickly. A wooden bench may feel more comfortable because it does not move heat as aggressively." },
        ] },
        { title: "What About Cold Weather?", blocks: [
          { type: "paragraph", text: "In cold weather, touching metal can feel painfully cold because it pulls heat from your skin so quickly. That is why metal playground equipment, railings, and tools can feel much colder than wood or plastic outside in winter. The metal is not magically colder. It is just better at stealing heat from your hand." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Metal feels colder than wood because metal transfers heat faster. When you touch metal, heat leaves your hand quickly, so your skin cools down fast. Wood transfers heat more slowly, so it feels warmer. So when you say something feels cold, you are often noticing how quickly heat is moving, not just the object's temperature." },
        ] },
      ],
    },
    "why-do-bikes-stay-balanced-when-moving": {
      title: "Why Do Bikes Stay Balanced When Moving?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.nov5,
      readTime: common.en.minutes.m5,
      authorId: "logan",
      image: "/images/curriculums/engineering.jpg",
      imageAlt: "Students exploring forces, motion, and balance at an Avanza STEM engineering workshop",
      imageCaption: "Balancing on a bike looks simple, but it involves physics, steering, design, and your brain working together.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-do-we-slip-on-ice", label: "Read next: why do we slip on ice?" },
      endingRelatedSlug: "why-do-we-slip-on-ice",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A bicycle seems like it should fall over. It has two thin wheels, a narrow frame, and not much holding it upright. If you try to balance on a bike while standing still, it is hard. But once the bike starts moving, it becomes much easier." },
          { type: "paragraph", text: "So why does a moving bike stay balanced? The answer is not one single trick. It is a mix of motion, steering, design, and your brain making tiny corrections." },
        ] },
        { title: "Balance Is About Keeping the Center Over the Wheels", blocks: [
          { type: "paragraph", text: "Every object has a center of mass. That is the point where its weight is balanced. For a bike and rider to stay upright, their combined center of mass needs to stay above the wheels. If the center of mass moves too far to one side, the bike starts to tip." },
          { type: "paragraph", text: "When a bike is not moving, it is hard to fix that tip. You have to twist the handlebars, shift your body, or put a foot down. But when the bike is moving, steering can help bring the wheels back under you." },
        ] },
        { title: "Bikes Steer Into a Lean", blocks: [
          { type: "paragraph", text: "Here is the strange part: when a bike starts leaning, the front wheel can turn slightly in the direction of the lean. If the bike leans left, the front wheel can steer left. That moves the bike's path under the rider again, helping restore balance." },
          { type: "paragraph", text: "This is one reason bikes feel more stable when they are rolling. Riders also do this without thinking — you are constantly making tiny steering changes while biking. Most of them are so small that you do not notice. Your brain, arms, and body work together to keep the bike under you." },
        ] },
        { title: "The Wheels Help Too", blocks: [
          { type: "paragraph", text: "Bike wheels spin as you ride. Spinning wheels have angular momentum, which means they tend to keep spinning in the same direction. This can help the bike feel steadier, but it is not the whole explanation. Bikes can still balance even when the wheel effect is small. The shape and design of the bike matter too." },
        ] },
        { title: "Bike Design Makes Balance Easier", blocks: [
          { type: "paragraph", text: "The front fork of a bike is angled, not straight up and down. This creates something called trail, which helps the front wheel naturally follow the direction of motion. The idea is simple: the bike is designed so the front wheel tends to line itself up in a helpful way. That design makes steering smoother and helps the bike correct small wobbles." },
          { type: "paragraph", text: "Engineers care a lot about this. A tiny change in the angle of the fork or the size of the wheels can make a bike feel stable, twitchy, slow, or smooth." },
        ] },
        { title: "Why Is It Harder to Ride Slowly?", blocks: [
          { type: "paragraph", text: "When you ride slowly, you have less time and less motion to correct a lean. The bike does not respond as smoothly, and small wobbles feel bigger. That is why riding very slowly in a straight line is harder than riding at a normal speed. It is also why beginners often feel more stable once they pedal a little faster." },
        ] },
        { title: "Why Can't a Bike Stand Still by Itself?", blocks: [
          { type: "paragraph", text: "When a bike is still, it cannot steer itself back under the rider. If it starts tipping, gravity pulls it farther down. Without motion, there is no easy way for the wheels to move under the center of mass. So the bike falls unless something holds it up — a kickstand, a wall, a rider's foot, or training wheels." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Bikes stay balanced when moving because steering, motion, spinning wheels, bike design, and rider corrections all work together." },
          { type: "callout", accent: "orange", text: "A bike is not just staying up by magic. It is constantly correcting itself, and so are you. That is what makes biking feel so smooth once you get going." },
        ] },
      ],
    },
    "why-do-we-slip-on-ice": {
      title: "Why Do We Slip on Ice?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.nov12,
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/workshops/past-science.jpg",
      imageAlt: "Students learning about friction and surfaces at an Avanza STEM science workshop",
      imageCaption: "Friction is what keeps your feet on the ground. When friction disappears — like on ice — walking becomes a very different challenge.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-does-metal-feel-colder-than-wood", label: "Read next: why does metal feel colder than wood?" },
      endingRelatedSlug: "why-does-metal-feel-colder-than-wood",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Walking on a sidewalk is easy. Walking on ice is not. One moment you are fine. The next moment your foot slides forward, your arms fly out, and you are trying not to fall." },
          { type: "paragraph", text: "So why is ice so slippery? The answer has to do with friction, surfaces, temperature, and what happens between your shoe and the ice." },
        ] },
        { title: "Friction Helps You Walk", blocks: [
          { type: "paragraph", text: "Friction is a force that resists sliding. When you walk, you push backward on the ground with your foot. Friction pushes you forward. Without enough friction, your foot slides instead of gripping." },
          { type: "paragraph", text: "That is why walking on dry pavement feels easy. The rough surface gives your shoes something to grip. Ice is much smoother than pavement, so there is less grip." },
        ] },
        { title: "Ice Has a Slippery Surface", blocks: [
          { type: "paragraph", text: "Ice may look solid, but its surface can behave in a tricky way. Under many conditions, there can be an extremely thin layer of water on top of the ice. That thin layer can make the surface even more slippery." },
          { type: "paragraph", text: "Your shoe is not just touching rough solid ground. It may be sliding over a smooth icy surface with a tiny bit of water acting like a lubricant — something that reduces friction, like oil in a machine." },
        ] },
        { title: "Temperature Matters", blocks: [
          { type: "paragraph", text: "Not all ice is equally slippery. Ice near its melting point is often very slippery because it is easier for a thin watery layer to form on the surface. Extremely cold ice can sometimes be less slippery because there is less liquid-like water on top. It can feel more dry and crunchy." },
          { type: "paragraph", text: "That does not mean very cold ice is safe. It can still be slippery. But temperature changes how the surface behaves." },
        ] },
        { title: "Shoes Matter Too", blocks: [
          { type: "paragraph", text: "Different shoes grip differently. Shoes with flat, smooth soles do not have much to grab onto. Shoes with deeper tread can press into snow or uneven surfaces better. That is why winter boots usually have textured bottoms. The pattern helps create more friction. But even good shoes can slip on very smooth ice because there may not be enough roughness for the sole to grip." },
        ] },
        { title: "Why Do We Slide So Fast?", blocks: [
          { type: "paragraph", text: "When friction is low, there is not much force stopping your foot from moving. On pavement, if your foot starts to slide, friction quickly slows it down. On ice, friction is weaker, so your foot keeps sliding. That is why a tiny loss of balance can become a big slide." },
        ] },
        { title: "Ice Is a Design Challenge", blocks: [
          { type: "paragraph", text: "Engineers and city planners think about slippery surfaces all the time. Roads, sidewalks, tires, shoes, and sports equipment all have to deal with friction. Salt can help melt ice. Sand can add roughness. Tire treads help cars push water and slush away. The goal is always the same: increase grip." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "We slip on ice because ice has low friction. Its smooth surface, possible thin water layer, temperature, and the type of shoes we wear all affect how much grip we get." },
          { type: "callout", accent: "orange", text: "Walking depends on friction more than most people realize. Every step is a tiny teamwork moment between your shoe and the ground." },
        ] },
      ],
    },
    "how-do-noise-canceling-headphones-work": {
      title: "How Do Noise-Canceling Headphones Work?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.nov19,
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/curriculums/ai.jpg",
      imageAlt: "Students exploring how sound and technology work together at an Avanza STEM workshop",
      imageCaption: "Noise-canceling headphones use science to fight sound with sound — a real-world application of wave physics.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-is-the-sky-blue-but-sunsets-are-orange", label: "Read next: why is the sky blue but sunsets are orange?" },
      endingRelatedSlug: "why-is-the-sky-blue-but-sunsets-are-orange",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Noise-canceling headphones can make a loud airplane cabin, bus ride, or busy room feel much quieter. But they do not create silence by using thicker cushions only. Some headphones use science to fight sound with sound." },
          { type: "paragraph", text: "That may sound impossible, but it works because sound travels in waves." },
        ] },
        { title: "Sound Is a Wave", blocks: [
          { type: "paragraph", text: "Sound happens when air vibrates. When someone talks, their vocal cords vibrate. Those vibrations push and pull the air, creating sound waves. The waves travel to your ears, and your brain turns them into sound." },
          { type: "paragraph", text: "A sound wave has high points and low points — you can imagine it like a wiggly line moving through the air. Loud sounds have bigger waves. Quiet sounds have smaller waves." },
        ] },
        { title: "Opposite Waves Can Cancel", blocks: [
          { type: "paragraph", text: "Here is the key idea: waves can add together, but they can also cancel each other. If one wave pushes air forward while another wave pulls air backward at the same moment, the two waves can partly cancel out." },
          { type: "paragraph", text: "Noise-canceling headphones use this idea. They try to create an opposite sound wave that matches the unwanted noise. When the unwanted sound and the opposite sound meet, they reduce each other. This is called destructive interference." },
        ] },
        { title: "The Headphones Listen First", blocks: [
          { type: "paragraph", text: "Noise-canceling headphones have tiny microphones. These microphones listen to the noise around you — such as the hum of an airplane engine or the rumble of a train. Then the headphones' electronics quickly analyze that sound and create a matching opposite wave. The speakers inside the headphones play that opposite wave near your ears." },
          { type: "paragraph", text: "Your ears receive less of the original noise because part of it has been canceled out." },
        ] },
        { title: "Why They Work Best With Steady Sounds", blocks: [
          { type: "paragraph", text: "Noise canceling works especially well on steady, repeating sounds — like airplane engines, air conditioners, fans, and train rumbling. These sounds are easier for the headphones to predict and cancel because they do not change too suddenly." },
          { type: "paragraph", text: "Sharp or random sounds are harder. A dog bark, a clap, or someone suddenly shouting changes quickly. The headphones may reduce it a little, but they usually cannot erase it completely. That is why noise-canceling headphones make the world quieter, not perfectly silent." },
        ] },
        { title: "Passive vs. Active Noise Canceling", blocks: [
          { type: "paragraph", text: "There are two ways headphones reduce noise. Passive noise reduction comes from physically blocking sound — thick ear cushions can stop some outside noise from getting in. Active noise canceling uses microphones and opposite sound waves. Many headphones use both: the cushions block some sound, and the electronics cancel some sound." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Noise-canceling headphones work by listening to outside noise, creating an opposite sound wave, and playing it through tiny speakers. When the waves meet, some of the noise gets canceled." },
          { type: "callout", accent: "orange", text: "They are not magic earmuffs. They are tiny sound wave engineers sitting on your head." },
        ] },
      ],
    },
    "why-do-some-things-float-and-others-sink": {
      title: "Why Do Some Things Float and Others Sink?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.nov26,
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/workshops/past-science.jpg",
      imageAlt: "Students experimenting with buoyancy and water at an Avanza STEM science workshop",
      imageCaption: "Floating is not just about being light. It is about weight, shape, and how much water gets pushed out of the way.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-do-magnets-stick-to-some-metals-but-not-others", label: "Read next: why do magnets stick to some metals but not others?" },
      endingRelatedSlug: "why-do-magnets-stick-to-some-metals-but-not-others",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A rock sinks. A beach ball floats. A giant steel ship floats too, even though steel is much heavier than water. So what decides whether something floats or sinks?" },
          { type: "paragraph", text: "The answer is buoyancy." },
        ] },
        { title: "Water Pushes Up", blocks: [
          { type: "paragraph", text: "When you place something in water, the water pushes upward on it. This upward push is called buoyant force. At the same time, gravity pulls the object downward. If the upward buoyant force is strong enough to balance the object's weight, the object floats. If gravity wins, the object sinks." },
        ] },
        { title: "Objects Push Water Out of the Way", blocks: [
          { type: "paragraph", text: "When an object enters water, it takes up space. The water that used to be in that space gets pushed aside. This is called displacement. The more water an object displaces, the bigger the upward buoyant force. That is why shape matters so much." },
        ] },
        { title: "Density Is a Big Clue", blocks: [
          { type: "paragraph", text: "Density means how much stuff is packed into a certain amount of space. A rock is dense because a lot of matter is packed into a small space. A foam ball is less dense because it has lots of air inside. If an object is denser than water, it usually sinks. If it is less dense than water, it usually floats. But shape can change the story." },
        ] },
        { title: "Why Can a Steel Ship Float?", blocks: [
          { type: "paragraph", text: "Steel is denser than water. A solid ball of steel would sink. But a ship is not a solid block of steel. It has a large shape with lots of air-filled space inside. Because of that shape, the ship spreads its weight over a big area and displaces a huge amount of water." },
          { type: "paragraph", text: "The ship's total average density — including the air inside it — is less than the density of water. That lets it float. If water floods into the ship, the air spaces fill up. The ship becomes denser overall, and it can sink." },
        ] },
        { title: "Why Do Boats Have Wide Bottoms?", blocks: [
          { type: "paragraph", text: "Boats are designed to push enough water out of the way. A wider hull helps the boat displace more water. More displaced water means more upward buoyant force. That is why a canoe, cargo ship, and cruise ship all have shapes designed around buoyancy, even though they look very different. Engineers must think carefully about weight, shape, balance, and materials when designing anything that floats." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Things float when the upward buoyant force from the water can balance their weight. Density matters, but shape matters too." },
          { type: "callout", accent: "orange", text: "A small rock sinks because it is dense and does not displace enough water. A huge ship floats because its shape lets it push aside enough water to support its weight. Floating is not about being light — it is about weight, space, shape, and water pushing back." },
        ] },
      ],
    },
    "why-do-magnets-stick-to-some-metals-but-not-others": {
      title: "Why Do Magnets Stick to Some Metals but Not Others?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.dec3,
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/curriculums/engineering.jpg",
      imageAlt: "Students exploring magnetism and materials at an Avanza STEM science workshop",
      imageCaption: "Magnets stick to some metals and not others because of how tiny magnetic regions inside the material line up.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-do-some-things-float-and-others-sink", label: "Read next: why do some things float and others sink?" },
      endingRelatedSlug: "why-do-some-things-float-and-others-sink",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Magnets seem simple at first. They stick to a refrigerator, grab paper clips, and snap onto some metal surfaces. But then you try to stick one to aluminum foil, a copper penny, or a soda can, and nothing happens. So why do magnets stick to some metals but not others?" },
          { type: "paragraph", text: "The answer comes from the tiny particles inside materials." },
        ] },
        { title: "Magnets Have Invisible Fields", blocks: [
          { type: "paragraph", text: "A magnet creates an invisible magnetic field around itself. You cannot see the field directly, but you can see what it does — it can pull certain objects closer or make another magnet twist around. A magnetic field is strongest near the magnet's poles, usually called north and south." },
          { type: "paragraph", text: "Opposite poles attract. Like poles repel. That is why one side of a magnet may pull another magnet close, while the other side pushes it away." },
        ] },
        { title: "Not All Metals Are Magnetic", blocks: [
          { type: "paragraph", text: "Many people think metal automatically means magnetic, but that is not true. Iron is strongly magnetic. Steel is usually magnetic because it contains iron. Nickel and cobalt are also magnetic. But many common metals are not strongly attracted to magnets — aluminum, copper, gold, silver, and brass usually do not stick to regular magnets. They are still metals. They just do not have the right magnetic behavior." },
        ] },
        { title: "Tiny Magnetic Regions", blocks: [
          { type: "paragraph", text: "Inside magnetic materials, there are tiny regions called domains. You can imagine domains like tiny groups of arrows. Each arrow points in a magnetic direction. In an ordinary piece of iron, many of these arrows point in different directions, so their effects partly cancel out." },
          { type: "paragraph", text: "But when a magnet comes near, many domains can line up. When enough of them point the same way, the material is attracted to the magnet. That is why a paper clip can stick to a magnet — the magnet helps line up tiny magnetic regions inside the metal." },
        ] },
        { title: "Why Doesn't Copper Stick?", blocks: [
          { type: "paragraph", text: "Copper has electrons, just like iron does, but its tiny magnetic effects do not line up in the same strong way. The structure of copper does not allow it to become strongly magnetic like iron. So a regular fridge magnet will not stick to copper. The same basic idea applies to aluminum, gold, and many other metals — their internal structure does not create strong magnetic attraction." },
        ] },
        { title: "What About Steel?", blocks: [
          { type: "paragraph", text: "Steel is mostly iron mixed with other elements, often carbon. Because it contains iron, many types of steel are magnetic. But not all steel behaves the same way. Some stainless steels are weakly magnetic or not very magnetic because their internal structure is different. That is why a magnet might stick strongly to one metal object but barely stick to another, even if both look like steel." },
        ] },
        { title: "Magnets Are Useful Because They Are Selective", blocks: [
          { type: "paragraph", text: "The fact that magnets stick to some metals and not others is actually useful. Recycling centers use magnets to separate iron and steel from other materials. Electric motors use magnetism to create motion. Speakers use magnets to turn electrical signals into sound. Compasses use Earth's magnetic field to point north. Magnetism is not just a refrigerator trick — it is part of how many machines work." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Magnets stick to some metals because those metals have tiny magnetic regions that can line up with a magnetic field. Iron, steel, nickel, and cobalt are strongly attracted to magnets. Metals like copper and aluminum are not, because their internal structures do not line up the same way." },
          { type: "callout", accent: "orange", text: "So when a magnet refuses to stick to a metal object, the magnet is not broken. The metal is just not the magnetic kind." },
        ] },
      ],
    },
  },
  es: {},
  zh: {},
}

localizedBlogArticles.es = {
  "why-every-kid-should-learn-to-code": {
    ...localizedBlogArticles.en["why-every-kid-should-learn-to-code"],
    title: "Por Qué Todo Niño Debería Aprender a Programar (y Cómo Empezar)",
    category: "Programación",
    date: common.es.dates.feb20,
    readTime: common.es.minutes.m5,
    imageAlt: "Un mentor de Avanza STEM dirigiendo un taller de programación, con estudiantes frente a laptops",
    imageCaption: "Estudiantes aprenden los fundamentos de la programación durante un taller de Avanza STEM.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Programar ya no es solo para profesionales de la tecnología. Entender la lógica detrás del código se está volviendo tan básico como leer y escribir, pero muchos niños nunca escriben una sola línea." },
        { type: "paragraph", text: "En nuestros talleres de programación en la Biblioteca Pública de Clifton, hemos visto a un estudiante escribir un programa que solo imprime \"Hola\" y luego pasar veinte minutos agregándole nuevas preguntas, bromas y efectos de sonido. Ese momento no es solo emoción: es la certeza de que pueden construir cosas." },
      ] },
      { title: "No Se Trata Solo de Código", blocks: [
        { type: "paragraph", text: "El valor real está en los patrones de pensamiento que desarrolla:" },
        { type: "list", items: ["Dividir problemas grandes en partes pequeñas", "Reconocer patrones repetidos", "Enfocarse en lo importante", "Probar ideas, encontrar errores y corregirlos"] },
        { type: "paragraph", text: "Estas habilidades sirven para ingeniería, ciencia, escritura, emprendimiento y la vida diaria." },
      ] },
      { title: "¿Cuál Es la Mejor Edad para Empezar?", blocks: [
        { type: "numbered", items: [
          { title: "5-7 años: lógica visual y sin pantalla", body: "Juegos y apps como ScratchJr enseñan secuencias sin necesidad de escribir." },
          { title: "8-11 años: bloques", body: "Scratch permite crear juegos y animaciones sin preocuparse por la sintaxis." },
          { title: "12+ años: lenguajes de texto", body: "Python es legible, útil y un gran primer lenguaje real." },
        ] },
      ] },
      { title: "Cómo Empezar en Casa", blocks: [
        { type: "list", items: ["Crear una cuenta gratuita de Scratch", "Ver un tutorial corto juntos", "Pedirles que expliquen qué hace su programa", "Dejar que se equivoquen y depuren; esa es la habilidad", "Celebrar lo que construyen, aunque sea sencillo"] },
      ] },
      { title: "Un Primer Programa en Python", blocks: [
        { type: "paragraph", text: "Si tu hijo está listo para escribir código, abre un editor en línea como Replit o Trinket y prueba esto:" },
        { type: "code", title: "Prueba Esto", accent: "green", code: "nombre = input(\"¿Cómo te llamas? \")\nprint(\"Hola, \" + nombre + \"! Bienvenido a programar.\")" },
        { type: "paragraph", text: "Es un programa real: recibe información y responde. Si le agregan más preguntas, puede convertirse en un pequeño chatbot o juego de preguntas." },
        { type: "paragraphWithLink", before: "Para ver la guía completa de este proyecto, incluyendo cómo convertirlo en un quiz, visita nuestra ", linkText: "guía de Mi Primer Programa en Python", href: "/projects/my-first-python-program", after: "." },
      ] },
      { title: "La Imagen Completa", blocks: [
        { type: "paragraph", text: "Los estudiantes hispanos están subrepresentados en computación por falta de acceso, exposición y aliento, no por capacidad." },
        { type: "paragraph", text: "Avanza STEM busca abrir las puertas que siempre debieron estar abiertas." },
        { type: "quote", text: "Llegó a casa y de inmediato quiso mostrarme el programa que escribió. Siguió agregándole líneas el resto de la noche.", attribution: "Madre de un estudiante en un taller de programación en la Biblioteca de Clifton" },
        { type: "ctaLink", title: "Prueba un Taller Gratuito", text: "Si tu hijo quiere probar un taller de programación gratuito y presencial, todos los materiales se proporcionan y no se necesita experiencia previa.", linkText: "Ver próximos talleres", href: "/workshops", accent: "teal" },
      ] },
    ],
  },
  "5-easy-science-experiments": {
    ...localizedBlogArticles.en["5-easy-science-experiments"],
    title: "5 Experimentos de Ciencia Fáciles para Hacer en Casa",
    category: "Ciencia",
    date: common.es.dates.feb15,
    imageAlt: "Un huevo cubierto de burbujas de dióxido de carbono durante una reacción química de cocina",
    imageCaption: "Burbujas de dióxido de carbono se forman durante una reacción química de cocina, el mismo tipo de reacción presente en varios de estos experimentos.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "No necesitas bata de laboratorio ni equipo caro para hacer ciencia real. Muchos de los mejores experimentos para niños usan cosas que ya tienes en casa, como vinagre, toallas de papel y agua mineral con gas." },
        { type: "paragraph", text: "Cada experimento incluye materiales, pasos y una explicación sencilla para que puedas hablar con tu hijo sobre lo que observó." },
        { type: "summary", timeLabel: "Tiempo necesario", time: "30-45 minutos para los cinco", ageLabel: "Edad recomendada", age: "5 años en adelante, con ayuda de un adulto para los más pequeños", supervisionLabel: "Supervisión adulta", supervision: "Sí, especialmente para el experimento del Huevo en la Botella, que usa fuego", learnLabel: "Lo que aprenderán", learn: "reacciones químicas, presión de gases, densidad y capilaridad", safetyLabel: "Nota de seguridad", safety: "Un adulto debe encender el cerillo y supervisar de cerca el experimento del huevo" },
      ] },
      { title: "", blocks: [{ type: "experiments", items: [
        { number: 1, title: "Volcán de Bicarbonato y Vinagre", category: "Química", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["1/2 taza de bicarbonato", "1 taza de vinagre blanco", "Jabón para platos", "Colorante (opcional)", "Un vaso o recipiente"], steps: ["Pon el bicarbonato en el recipiente.", "Agrega jabón y colorante.", "Vierte el vinagre y retrocede.", "Observa la espuma."], science: "El bicarbonato y el vinagre reaccionan y producen dióxido de carbono. El jabón atrapa las burbujas y forma espuma." },
        { number: 2, title: "Pasas Bailarinas", category: "Física", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Un vaso transparente", "Agua con gas o refresco claro", "Un puñado de pasas"], steps: ["Llena el vaso con agua con gas.", "Agrega unas pasas.", "Observa durante varios minutos."], science: "Las burbujas de dióxido de carbono se pegan a las pasas, las suben, revientan en la superficie y las dejan caer otra vez." },
        { number: 3, title: "Lámpara de Lava Casera", category: "Química y física", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Una botella transparente", "Aceite vegetal", "Agua", "Tabletas efervescentes", "Colorante"], steps: ["Llena casi toda la botella con aceite.", "Agrega agua y colorante.", "Pon un pedazo pequeño de tableta."], science: "El aceite y el agua no se mezclan. Las burbujas de gas llevan el agua coloreada hacia arriba y luego la dejan caer de nuevo." },
        { number: 4, title: "Cromatografía con Papel", category: "Química", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Toalla de papel o filtro de café", "Marcadores lavables", "Un vaso de agua", "Tijeras"], steps: ["Corta una tira de papel.", "Dibuja un punto de marcador cerca de la parte inferior.", "Mete solo el borde inferior en el agua.", "Observa cómo se separan los colores."], science: "La tinta está hecha de varios pigmentos. El agua los arrastra por el papel a distintas velocidades, separando los colores." },
        { number: 5, title: "El Huevo en la Botella", category: "Física", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Un huevo cocido y pelado", "Una botella de vidrio", "Un pedazo pequeño de papel", "Cerillos, con supervisión de un adulto"], steps: ["Enciende el papel y déjalo caer en la botella.", "Coloca el huevo sobre la abertura.", "Observa cómo la presión del aire lo empuja hacia adentro."], science: "La llama calienta el aire dentro de la botella. Cuando se enfría, la presión baja por dentro y la presión del aire de afuera empuja el huevo hacia adentro." },
      ] }] },
      { title: "Hacer Que Se Quede", blocks: [
        { type: "paragraph", text: "Después de cada experimento, pide a tu hijo que dibuje lo que pasó y escriba una frase sobre por qué pasó. Explicarlo a otra persona convierte un momento divertido en aprendizaje real." },
        { type: "paragraphWithLink", before: "¿Quieres más detalles sobre el Volcán de Bicarbonato y Vinagre? Mira nuestra ", linkText: "guía completa del proyecto", href: "/projects/baking-soda-volcano", after: " con fotos y consejos." },
        { type: "callout", title: "Conexión con Nuestros Talleres", accent: "teal", text: "En nuestros talleres, los estudiantes han debatido casi diez minutos sobre por qué las pasas seguían subiendo y bajando en el experimento de las Pasas Bailarinas, más tiempo del que tomó preparar el experimento. Ese tipo de discusión es exactamente el objetivo." },
      ] },
    ],
  },
  "how-to-build-the-strongest-popsicle-stick-bridge": {
    ...localizedBlogArticles.en["how-to-build-the-strongest-popsicle-stick-bridge"],
    title: "Cómo Construir el Puente de Palitos Más Fuerte",
    category: "Ingeniería",
    date: common.es.dates.feb10,
    imageAlt: "Mentor y estudiantes de Avanza STEM junto a un puente de palitos que sostiene una pila alta de libros",
    imageCaption: "Estudiantes prueban cuánto peso puede sostener un puente de palitos durante un taller de ingeniería de Avanza STEM.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "La fuerza de un puente depende de la geometría, la distribución de carga y la calidad de las uniones, no solo de usar más palitos o más pegamento." },
        { type: "paragraphWithLink", before: "Esta publicación explica las ideas de ingeniería detrás de los puentes fuertes. Para la guía completa de construcción, visita nuestra ", linkText: "página detallada del proyecto", href: "/projects/popsicle-stick-bridge", after: "." },
      ] },
      { title: "Por Qué los Triángulos Ganan Siempre", blocks: [
        { type: "paragraph", text: "Los cuadrados se pueden deformar en paralelogramos, pero los triángulos mantienen su forma a menos que una pieza se doble o se rompa. Por eso las armaduras se construyen con triángulos conectados." },
        { type: "callout", title: "Idea Clave", accent: "purple", text: "Un marco cuadrado con un refuerzo diagonal se convierte en dos triángulos, y ese único palito puede multiplicar la carga que la estructura puede soportar." },
      ] },
      { title: "Entender los Caminos de Carga", blocks: [
        { type: "list", items: ["El tablero distribuye el peso entre las dos armaduras laterales", "Las armaduras llevan la fuerza hacia los apoyos", "La cuerda inferior está en tensión", "La cuerda superior está en compresión", "Los miembros diagonales transfieren la fuerza por el puente"] },
        { type: "paragraph", text: "Los diseños fuertes refuerzan los puntos con más carga en lugar de agregar palitos en todas partes." },
      ] },
      { title: "Las Cinco Diferencias entre Puentes Fuertes y Débiles", blocks: [
        { type: "numbered", items: [
          { title: "Uniones de buena calidad", body: "Las uniones con poco pegamento fallan antes que la madera, así que déjalas secar por completo." },
          { title: "Dos armaduras laterales iguales", body: "Si los lados son distintos, el lado más débil recibe más carga y falla primero." },
          { title: "Refuerzo lateral superior", body: "Las piezas cruzadas evitan que las paredes laterales se inclinen hacia afuera." },
          { title: "Un tablero adecuado", body: "Un tablero que reparte la carga entre ambas armaduras es más fuerte que cargar un solo punto." },
          { title: "Triángulos escalonados", body: "Los triángulos superpuestos crean un camino de carga continuo." },
        ] },
      ] },
      { title: "Errores Comunes que Debes Evitar", blocks: [
        { type: "list", items: ["Usar demasiado pegamento", "Construir las dos armaduras al mismo tiempo en lugar de copiar una plantilla que ya funcionó", "Omitir el refuerzo lateral", "Probar el puente antes de que el pegamento seque por completo", "Agregar palitos al azar sin entender dónde está el punto débil"] },
      ] },
      { title: "El Reto de la Relación Resistencia-Peso", blocks: [
        { type: "paragraph", text: "Mide el peso del puente y divide la carga que soportó entre ese peso. Esa relación es la verdadera puntuación de ingeniería." },
        { type: "paragraph", text: "En nuestros talleres, los puentes que construyen los estudiantes suelen pesar menos de 50 gramos, pero soportan entre 5 y 15 libras antes de romperse, más de 50 veces su propio peso." },
        { type: "quote", text: "Empezamos a agregar palitos solo donde se rompió la última vez, no en todas partes. Ahí fue cuando nuestro puente realmente se hizo más fuerte.", attribution: "Estudiante en un taller de construcción de puentes de Avanza STEM" },
        { type: "callout", accent: "purple", text: "En nuestro taller de construcción de puentes, retamos a los estudiantes a optimizar la relación resistencia-peso, lo que cambia toda la estrategia." },
      ] },
    ],
  },
  "getting-started-with-lego-robotics": {
    ...localizedBlogArticles.en["getting-started-with-lego-robotics"],
    title: "Comenzando con Robótica LEGO: Guía para Padres",
    category: "Robótica",
    date: common.es.dates.feb5,
    imageAlt: "Tres estudiantes trabajando juntos para construir y programar un robot LEGO",
    imageCaption: "Estudiantes colaboran para construir y programar su primer robot LEGO.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "La robótica LEGO combina ingeniería y programación al mismo tiempo. Los estudiantes ven motores girar, sensores reaccionar y código afectar el mundo real." },
        { type: "paragraph", text: "En nuestros talleres de robótica, los estudiantes suelen pasar toda la primera sesión solo logrando que un robot avance en línea recta, y ese proceso de prueba y error suele ser el mejor aprendizaje del día." },
      ] },
      { title: "Por Qué Es Diferente del LEGO Normal", blocks: [
        { type: "paragraph", text: "Un modelo de LEGO normal es estático. La robótica LEGO crea algo que se mueve, percibe y responde mediante un hub programable." },
        { type: "callout", title: "La Gran Idea", accent: "green", text: "La robótica convierte el error en algo educativo. Cuando un robot hace algo incorrecto, el diseño o el código te da un acertijo para resolver." },
      ] },
      { title: "¿Qué Kit de Robótica LEGO le Conviene a tu Hijo?", blocks: [
        { type: "numbered", items: [
          { title: "LEGO SPIKE Essential (6-10 años)", body: "Un kit de entrada guiado y con bloques, ideal para principiantes pequeños." },
          { title: "LEGO SPIKE Prime (10-14 años)", body: "Un kit escolar común con más sensores, motores y proyectos avanzados." },
          { title: "LEGO Mindstorms Robot Inventor", body: "Descontinuado, pero todavía disponible, flexible y vale la pena si encuentras una buena oferta." },
        ] },
      ] },
      { title: "Qué Aprenderá tu Hijo en Realidad", blocks: [
        { type: "list", items: ["Fundamentos de mecánica", "Lógica de sensores", "Programación secuencial y condicional", "Diseño iterativo", "Trabajo en equipo y comunicación"] },
        { type: "quote", text: "El robot seguía dando vueltas, y resultó que una rueda estaba floja. Cuando lo descubrimos, sentimos que habíamos arreglado algo de verdad.", attribution: "Estudiante en un taller de robótica de Avanza STEM" },
      ] },
      { title: "Consejos para Padres que No Son Ingenieros", blocks: [
        { type: "paragraph", text: "No necesitas saber todas las respuestas. En su lugar, haz preguntas con curiosidad." },
        { type: "list", items: ["¿Qué querías que hiciera?", "¿Qué pasó en realidad?", "¿Qué cambiarías primero?", "¿Puedes hacer que haga algo diferente?"] },
      ] },
      { title: "Primeros Proyectos para Probar", blocks: [
        { type: "numbered", items: [
          { title: "Seguidor de línea", body: "Usa un sensor de color para seguir una línea negra." },
          { title: "Evasor de obstáculos", body: "Usa un sensor de distancia para girar antes de chocar con un objeto." },
          { title: "Control remoto", body: "Maneja el robot manualmente primero y luego recrea el movimiento con código." },
          { title: "Máquina clasificadora", body: "Clasifica objetos por color con un mecanismo sencillo." },
        ] },
        { type: "paragraphWithLink", before: "Para una primera construcción guiada con instrucciones paso a paso, visita nuestra ", linkText: "guía del proyecto LEGO Robot Builder", href: "/projects/lego-robot-builder", after: "." },
      ] },
      { title: "Más Allá del Kit", blocks: [
        { type: "paragraph", text: "FIRST LEGO League es un siguiente paso natural para estudiantes listos para un reto en equipo." },
        { type: "ctaLink", title: "Construye tu Primer Robot", text: "En nuestros talleres de robótica, los estudiantes construyen y programan su primer robot desde cero. No se necesita experiencia previa.", linkText: "Ver próximos talleres", href: "/workshops", accent: "green" },
      ] },
    ],
  },
  "what-is-ai-explaining-to-kids": {
    ...localizedBlogArticles.en["what-is-ai-explaining-to-kids"],
    title: "¿Qué Es la IA? Explicando Inteligencia Artificial a los Niños",
    category: "IA",
    date: common.es.dates.jan28,
    imageAlt: "Estudiantes trabajando en computadoras durante un taller de IA de Avanza STEM, con diagramas en sus pantallas",
    imageCaption: "Estudiantes exploran conceptos de IA de forma práctica durante una sesión de taller de Avanza STEM.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "La IA ya recomienda videos, da forma a las redes sociales, impulsa los asistentes de voz y filtra el correo. La mayoría de los niños la usan mucho antes de entenderla." },
        { type: "paragraph", text: "Entender la IA es una forma de alfabetización. Los estudiantes deben aprender a preguntar con qué datos aprendió un sistema y qué perspectivas podrían faltar." },
      ] },
      { title: "Empieza con lo que los Niños Ya Saben", blocks: [
        { type: "callout", accent: "teal", text: "Cuando Spotify agrega una canción nueva a tu lista, ¿cómo crees que la eligió?" },
        { type: "paragraph", text: "Esa conversación lleva naturalmente a la idea de encontrar patrones, que es la base de muchos sistemas de IA. En nuestros talleres de IA hacemos esta pregunta antes de explicar nada, y las respuestas de los estudiantes casi siempre van por buen camino, que es justamente el punto." },
      ] },
      { title: "Una Forma Sencilla de Explicar Cómo Aprende la IA", blocks: [
        { type: "paragraph", text: "La IA aprende a partir de ejemplos. Así como un niño reconoce perros después de ver muchos perros, un modelo de aprendizaje automático encuentra patrones en ejemplos etiquetados." },
        { type: "callout", title: "El Término Técnico", accent: "green", text: "Esto se llama aprendizaje supervisado: los ejemplos de entrenamiento incluyen la respuesta correcta." },
      ] },
      { title: "Tipos de IA que Vale la Pena Explicar a los Niños", blocks: [
        { type: "numbered", items: [
          { title: "Reconocimiento de imágenes", body: "Se usa para desbloqueo facial, etiquetado de fotos y escaneos médicos." },
          { title: "Sistemas de recomendación", body: "Usados por Netflix, Spotify, YouTube y las redes sociales." },
          { title: "Modelos de lenguaje", body: "Sistemas que generan texto prediciendo patrones probables de palabras." },
          { title: "IA para videojuegos", body: "Programas que mejoran jugando y aprendiendo de los resultados." },
        ] },
      ] },
      { title: "Lo Que la IA No Puede Hacer (y Por Qué Importa)", blocks: [
        { type: "list", items: ["Solo reconoce patrones parecidos a los de sus datos de entrenamiento", "Puede reflejar los sesgos de esos datos", "Puede dar respuestas incorrectas con mucha confianza", "Puede optimizar una medida y aun así fallar en el objetivo real"] },
        { type: "paragraph", text: "Enseñar a los niños a preguntar con qué datos se entrenó un sistema es un hábito poderoso de pensamiento crítico." },
      ] },
      { title: "Actividad Práctica: Entrena tu Propio Clasificador de Imágenes", blocks: [
        { type: "list", items: ["Ve a teachablemachine.withgoogle.com", "Crea dos clases de imágenes", "Entrena con ejemplos de tu cámara", "Prueba el modelo con una pose nueva", "Compara qué pasa con 5 ejemplos frente a 50"] },
        { type: "callout", accent: "teal", text: "Esta actividad muestra recolección de datos, entrenamiento del modelo, inferencia y calidad de los datos en unos 10 minutos." },
        { type: "quote", text: "Lo entrené para distinguir mi mano de la de mi amigo, y seguía equivocándose hasta que usamos más fotos. Ahí fue cuando realmente lo entendí.", attribution: "Estudiante en un taller de IA de Avanza STEM" },
      ] },
      { title: "IA Responsable: La Parte que Casi Nadie Explica", blocks: [
        { type: "paragraph", text: "Los niños necesitan más que trucos para usar herramientas. Necesitan saber cuándo verificar lo que dice la IA, cuándo no confiar en ella, y quién es responsable cuando un sistema causa daño." },
        { type: "paragraphWithLink", before: "Si esta es la primera vez que tu hijo construye algo con código, nuestra ", linkText: "guía para escribir un primer programa en Python", href: "/projects/my-first-python-program", after: " es un buen siguiente paso." },
      ] },
    ],
  },
  "math-games-that-make-learning-fun": {
    ...localizedBlogArticles.en["math-games-that-make-learning-fun"],
    title: "Juegos de Matemáticas que Hacen Divertido Aprender",
    category: "Matemáticas",
    date: common.es.dates.jan20,
    imageAlt: "Un ábaco de madera de colores, una herramienta para desarrollar el sentido numérico",
    imageCaption: "Un ábaco de madera, una de muchas herramientas sencillas que ayudan a desarrollar el sentido numérico antes de ver una hoja de ejercicios.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "La ansiedad matemática a menudo comienza cuando las matemáticas se sienten como hojas de ejercicios, exámenes cronometrados y marcas en rojo. Los juegos hacen que las mismas habilidades se sientan divertidas." },
        { type: "paragraph", text: "Estos juegos están diseñados para los grados 2 a 5 y requieren muy pocos materiales." },
        { type: "summary", timeLabel: "Tiempo necesario", time: "10-20 minutos por juego", ageLabel: "Edad recomendada", age: "Grados 2-5 (7-11 años)", supervisionLabel: "Supervisión adulta", supervision: "No, los niños pueden jugar solos o con la familia", learnLabel: "Lo que aprenderán", learn: "sentido numérico, cálculo mental, fracciones y estimación" },
      ] },
      { title: "", blocks: [{ type: "games", items: [
        { title: "Guerra de Números", gradeRange: "Grados 2-4", description: "Un juego de cartas para el sentido numérico y la comparación.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Quita las cartas con figuras o asígnales un valor.", "Reparte las cartas en partes iguales.", "Cada jugador voltea una carta.", "La carta más alta gana ambas.", "Para multiplicar, voltea dos cartas y multiplícalas."], whyItWorks: "Da práctica repetida y rápida sin que se sienta como un ejercicio." },
        { title: "101 y Fuera", gradeRange: "Grados 3-5", description: "Un juego de dados para la suma mental y la estrategia.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Empieza en 0.", "Tira dos dados.", "Súmalos o usa uno como decenas y otro como unidades.", "Acércate a 101 sin pasarte."], whyItWorks: "La decisión hace que los estudiantes piensen en el valor posicional." },
        { title: "Pizza de Fracciones", gradeRange: "Grados 3-5", description: "Un juego práctico para entender fracciones.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Corta círculos de papel en piezas de fracciones.", "Por turnos, toma una pieza.", "Completa un círculo entero exacto.", "Pierde el turno si una pieza haría que te pasaras."], whyItWorks: "Mover las piezas desarrolla la intuición sobre fracciones equivalentes." },
        { title: "Número Objetivo", gradeRange: "Grados 4-5", description: "Un reto creativo de cálculo mental.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Elige cinco dígitos.", "Elige un número objetivo.", "Usa operaciones para llegar a él.", "Compara las soluciones."], whyItWorks: "Muestra que los problemas de matemáticas pueden tener más de un camino." },
        { title: "Veinte Preguntas Matemáticas", gradeRange: "Grados 2-5", description: "Un juego de lógica con vocabulario matemático.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Piensa en un número.", "Haz preguntas de sí o no.", "Adivina en la menor cantidad de preguntas posible."], whyItWorks: "El vocabulario se vuelve útil porque ayuda a ganar." },
        { title: "Frasco de Estimación", gradeRange: "Grados 2-4", description: "Un reto semanal de estimación.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Llena un frasco con objetos pequeños.", "Todos escriben una estimación.", "Cuenten juntos después.", "Gana quien se acerque más."], whyItWorks: "Estimar sin presión desarrolla el sentido numérico con el tiempo." },
      ] }] },
      { title: "Una Nota sobre la Práctica Cronometrada", blocks: [
        { type: "paragraph", text: "La fluidez viene de la exposición repetida en contextos de bajo riesgo. Los juegos ofrecen esa exposición sin generar ansiedad matemática." },
        { type: "paragraphWithLink", before: "¿Quieres más? Muchos de estos juegos y otras actividades están en nuestra ", linkText: "página de juegos", href: "/games", after: "." },
        { type: "list", items: ["Empieza con juegos que a tu hijo ya le gusten", "Juega junto a él o ella", "Déjalo ganar algunas veces al principio", "Pregunta qué piensa antes de corregir", "Termina mientras todavía quiera seguir jugando"] },
        { type: "callout", title: "Para Padres", accent: "orange", text: "En nuestras noches familiares de matemáticas, los juegos que más se repiten son los que permiten que un niño le gane a un adulto limpiamente. Guerra de Números y 101 y Fuera funcionan muy bien para eso." },
        { type: "quote", text: "Mi hija me pidió jugar 101 y Fuera tres noches seguidas. Nunca le dije que era práctica de matemáticas.", attribution: "Madre en una noche familiar de matemáticas de Avanza STEM" },
      ] },
    ],
  },
  "building-a-community-stem-workshops": {
    ...localizedBlogArticles.en["building-a-community-stem-workshops"],
    title: "Construyendo Comunidad: Cómo los Talleres STEM Cambian Vidas",
    category: "Comunidad",
    date: common.es.dates.jan12,
    imageAlt: "Familias y estudiantes reunidos en la biblioteca para un evento comunitario de Avanza STEM",
    imageCaption: "Familias se reúnen en la biblioteca para una serie de talleres comunitarios de Avanza STEM.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Lo más difícil de empezar Avanza STEM fue creer que llegar a una biblioteca con materiales y una laptop podía importar." },
        { type: "paragraph", text: "Después de programas en Clifton Public Library, Allwood Branch Library, Library of the Chathams y Roseland Free Public Library que han llegado a más de 70 estudiantes, la respuesta es clara: importa porque los estudiantes ven que STEM también les pertenece." },
      ] },
      { title: "Cómo Es un Taller en la Práctica", blocks: [
        { type: "paragraph", text: "Nuestro formato actual es una serie de tres semanas que cubre ingeniería, programación e inteligencia artificial. Cada sesión es gratuita y no requiere experiencia previa." },
        { type: "paragraph", text: "Los estudiantes construyen, escriben Python y entrenan modelos sencillos de IA mientras conectan cada actividad con ideas reales de STEM." },
      ] },
      { title: "Por Qué las Bibliotecas Son el Lugar Correcto", blocks: [
        { type: "paragraph", text: "Las bibliotecas son espacios comunitarios de confianza, comprometidos con el aprendizaje público y gratuito." },
        { type: "list", items: ["Sin costo de asistencia", "Un espacio conocido y seguro", "Una relación real con la comunidad", "Salones y tecnología flexibles", "Acceso para estudiantes de distintas escuelas"] },
      ] },
      { title: "Lo Que Hemos Visto en el Salón", blocks: [
        { type: "paragraph", text: "Los mejores momentos son cuando los estudiantes agregan preguntas a sus juegos en Python, cuando las familias ven este tipo de programación en su propio vecindario por primera vez, y cuando los niños debaten productivamente sobre ciencia." },
        { type: "quote", text: "Una madre nos contó que su hija pidió volver la siguiente semana antes de que terminara la sesión. Ahí supimos que estaba funcionando.", attribution: "Bibliotecaria de la Sucursal Allwood" },
        { type: "paragraph", text: "Cuando se toma en serio la curiosidad, los estudiantes tienen más probabilidades de buscar más aprendizaje por su cuenta." },
      ] },
      { title: "El Problema de Representación - y Por Qué Es Nuestra Responsabilidad", blocks: [
        { type: "paragraph", text: "Los estudiantes hispanos siguen subrepresentados en STEM debido a brechas en exposición, mentoría, aliento y acceso." },
        { type: "callout", title: "La Brecha que Buscamos Cerrar", accent: "purple", text: "La visibilidad es un factor estructural en quién se siente invitado a participar en STEM." },
      ] },
      { title: "Cómo Llevar un Taller a tu Comunidad", blocks: [
        { type: "numbered", items: [
          { title: "Identifica un lugar", body: "Bibliotecas, centros comunitarios, iglesias y escuelas pueden funcionar." },
          { title: "Contáctanos", body: "Podemos hablar sobre el plan de actividades, los materiales y la promoción." },
          { title: "Promueve a nivel local", body: "Los grupos comunitarios, los volantes y los aliados locales ayudan a llegar a más familias." },
          { title: "Mantén la constancia", body: "La confianza se construye con el tiempo." },
        ] },
      ] },
      { title: "Lo Que Sigue", blocks: [
        { type: "paragraph", text: "Nuestra meta es expandirnos a más sucursales de bibliotecas y centros comunitarios, y compartir un modelo que otros puedan replicar." },
        { type: "ctaLink", title: "Lleva un Taller a tu Comunidad", text: "¿Quieres traer un programa STEM gratuito a tu biblioteca, escuela o centro comunitario?", linkText: "Contáctanos para organizar un taller", href: "/host", accent: "purple" },
        { type: "ctaLink", text: "¿Quieres ver primero cómo es una sesión?", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
}

localizedBlogArticles.zh = {
  "why-every-kid-should-learn-to-code": {
    ...localizedBlogArticles.en["why-every-kid-should-learn-to-code"],
    title: "为什么每个孩子都应该学习编程，以及如何开始",
    category: "编程",
    date: common.zh.dates.feb20,
    readTime: common.zh.minutes.m5,
    authorId: "liam",
    imageAlt: "Avanza STEM 导师在编程工作坊中授课，学生们坐在笔记本电脑前",
    imageCaption: "学生们在 Avanza STEM 工作坊中学习编程基础。",
    endingProject: { href: "/projects/my-first-python-program", label: "试试这个项目：写出你的第一个 Python 程序" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "what-is-ai-explaining-to-kids",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "编程不再只是科技从业者的技能。理解代码背后的逻辑，正在变得像阅读和写作一样基础。" }, { type: "paragraph", text: "当学生第一次让程序运行起来时，他们会意识到自己也能创造东西。" }, { type: "paragraph", text: "在 Clifton 公共图书馆的编程工作坊中，我们曾看到一名学生写出一个只会打印「你好」的程序，然后花了二十分钟不断给它添加新问题、笑话和音效。那一刻不仅仅是兴奋——那是他确信自己能创造东西的瞬间。" }] },
      { title: "重点不只是代码", blocks: [{ type: "paragraph", text: "真正的价值在于编程培养的思维方式：" }, { type: "list", items: ["把大问题拆成小问题", "发现重复模式", "抓住重要信息", "测试想法并修复错误"] }, { type: "paragraph", text: "这些能力在工程、科学、写作、创业和日常生活中都很有用。" }] },
      { title: "什么时候开始合适?", blocks: [{ type: "numbered", items: [{ title: "5-7 岁：无屏幕和视觉逻辑", body: "游戏和 ScratchJr 可以教顺序思维。" }, { title: "8-11 岁：积木式编程", body: "Scratch 让孩子不用担心语法也能做游戏。" }, { title: "12 岁以上：文本语言", body: "Python 易读、实用，是很好的第一门真实语言。" }] }] },
      { title: "如何在家开始", blocks: [{ type: "list", items: ["创建免费的 Scratch 账号", "一起看一个入门教程", "请孩子解释程序做什么", "允许他们卡住并调试", "庆祝他们做出来的东西"] }] },
      { title: "第一个 Python 程序", blocks: [{ type: "paragraph", text: "如果孩子准备写代码，可以打开 Replit 或 Trinket 试试：" }, { type: "code", title: "试试看", accent: "green", code: "name = input(\"你叫什么名字? \")\nprint(\"你好, \" + name + \"! 欢迎学习编程。\")" }, { type: "paragraph", text: "这是一个真正的程序：它接收输入并回应。" }, { type: "paragraphWithLink", before: "想查看完整的项目指南，包括如何把它做成一个小问答游戏，请访问我们的", linkText: "《我的第一个 Python 程序》指南", href: "/projects/my-first-python-program", after: "。" }] },
      { title: "更大的意义", blocks: [{ type: "paragraph", text: "西班牙裔学生在计算机科学中代表性不足，原因是机会和接触不足，而不是能力不足。" }, { type: "quote", text: "他回家后立刻想给我看他写的程序，整个晚上都在不断给它加新内容。", attribution: "Clifton 图书馆编程工作坊一名学生的家长" }, { type: "ctaLink", title: "试试免费工作坊", text: "如果孩子想参加免费的线下编程工作坊，所有材料都会提供，不需要任何编程经验。", linkText: "查看近期工作坊", href: "/workshops", accent: "teal" }] },
    ],
  },
  "5-easy-science-experiments": {
    ...localizedBlogArticles.en["5-easy-science-experiments"],
    title: "5 个可以在家做的简单科学实验",
    category: "科学",
    date: common.zh.dates.feb15,
    readTime: common.zh.minutes.m4,
    authorId: "enqi",
    imageAlt: "一个鸡蛋表面覆盖着二氧化碳气泡，这是厨房化学反应的特写",
    imageCaption: "厨房化学反应中产生的二氧化碳气泡——这与下面几个实验中的气体反应原理相同。",
    endingProject: { href: "/projects/baking-soda-volcano", label: "试试这个项目：小苏打火山" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "math-games-that-make-learning-fun",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "真正的科学不一定需要实验室外套或昂贵设备。许多好实验只需要醋、纸巾和气泡水等家中物品。" },
        { type: "paragraph", text: "每个实验都包含材料、步骤和简单解释，方便和孩子讨论观察结果。" },
        { type: "summary", timeLabel: "所需时间", time: "五个实验共需 30-45 分钟", ageLabel: "适合年龄", age: "5 岁及以上，年龄较小的孩子需要成人协助", supervisionLabel: "需要成人监督", supervision: "需要——尤其是「瓶中鸡蛋」实验，因为会用到明火", learnLabel: "孩子将学到", learn: "化学反应、气体压力、密度和毛细作用", safetyLabel: "安全提示", safety: "点燃火柴和监督鸡蛋实验必须由成人完成" },
      ] },
      { title: "", blocks: [{ type: "experiments", items: [
        { number: 1, title: "小苏打和醋火山", category: "化学", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["半杯小苏打", "一杯白醋", "几滴洗洁精", "可选食用色素", "杯子或碗"], steps: ["把小苏打放入容器。", "加入洗洁精和色素。", "倒入醋并后退。", "观察泡沫喷发。"], science: "小苏打和醋反应产生二氧化碳，洗洁精把气泡困住形成泡沫。" },
        { number: 2, title: "跳舞的葡萄干", category: "物理", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["透明杯子", "气泡水或透明汽水", "一些葡萄干"], steps: ["倒入气泡水。", "放入葡萄干。", "观察几分钟。"], science: "气泡附着在葡萄干上把它们带上去，破裂后葡萄干又沉下去。" },
        { number: 3, title: "自制熔岩灯", category: "化学和物理", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["透明瓶子", "植物油", "水", "泡腾片", "食用色素"], steps: ["倒入大部分油。", "加入水和色素。", "放入一小块泡腾片。"], science: "油和水不混合，气泡把彩色水滴带上去又释放下来。" },
        { number: 4, title: "纸巾色谱", category: "化学", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["纸巾或咖啡滤纸", "可水洗马克笔", "水", "剪刀"], steps: ["剪一条纸。", "在底部附近画点。", "只把纸底部放入水。", "观察颜色分离。"], science: "墨水由多种颜料组成，水带着它们以不同速度移动。" },
        { number: 5, title: "瓶中鸡蛋", category: "物理", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["剥壳熟鸡蛋", "玻璃瓶", "小纸片", "火柴并需成人监督"], steps: ["点燃纸片放入瓶中。", "把鸡蛋放在瓶口。", "观察气压作用。"], science: "瓶内空气先受热后冷却，内部压力降低，外部气压把鸡蛋推入瓶中。" },
      ] }] },
      { title: "让学习留下来", blocks: [
        { type: "paragraph", text: "每次实验后，请孩子画出发生了什么并写一句原因。解释给别人听能巩固理解。" },
        { type: "paragraphWithLink", before: "想了解更多关于小苏打和醋火山实验的细节吗？请查看我们的", linkText: "完整项目指南", href: "/projects/baking-soda-volcano", after: "，里面有照片和小贴士。" },
        { type: "callout", title: "工作坊连接", accent: "teal", text: "在我们的工作坊中，学生们曾就「跳舞的葡萄干」实验中葡萄干为什么会反复上下浮动，讨论了将近十分钟——比准备实验本身花的时间还长。这正是我们希望看到的讨论。" },
      ] },
    ],
  },
  "how-to-build-the-strongest-popsicle-stick-bridge": {
    ...localizedBlogArticles.en["how-to-build-the-strongest-popsicle-stick-bridge"],
    title: "如何建造最坚固的冰棒棍桥",
    category: "工程",
    date: common.zh.dates.feb10,
    readTime: common.zh.minutes.m6,
    authorId: "logan",
    imageAlt: "Avanza STEM 导师和学生站在一座承受高高一摞书的冰棒棍桥旁边",
    imageCaption: "学生们在 Avanza STEM 工程工作坊中测试冰棒棍桥能承受多重。",
    endingProject: { href: "/projects/popsicle-stick-bridge", label: "试试这个项目：搭建冰棒棍桥" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "getting-started-with-lego-robotics",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "桥的强度取决于几何结构、载荷分布和连接质量，而不只是棍子或胶水的数量。" }, { type: "paragraphWithLink", before: "完整搭建步骤请查看我们的", linkText: "详细项目页面", href: "/projects/popsicle-stick-bridge", after: "。" }] },
      { title: "为什么三角形最强", blocks: [{ type: "paragraph", text: "正方形会变形，三角形更能保持形状，所以桁架使用相连的三角形。" }, { type: "callout", title: "关键想法", accent: "purple", text: "给正方形加一根斜撑，就变成两个三角形，承重能力会大幅提高。" }] },
      { title: "理解载荷路径", blocks: [{ type: "list", items: ["桥面分散重量", "桁架把力传向支撑点", "下方受拉", "上方受压", "斜杆传递力"] }] },
      { title: "强桥和弱桥的五个差别", blocks: [{ type: "numbered", items: [{ title: "连接稳定", body: "胶水需要完全固化。" }, { title: "两侧桁架一致", body: "不一致会让弱侧先失效。" }, { title: "顶部横向支撑", body: "防止侧面外翻。" }, { title: "合适桥面", body: "把重量分给两侧。" }, { title: "交错三角形", body: "形成连续受力路径。" }] }] },
      { title: "常见错误", blocks: [{ type: "list", items: ["胶水太多", "没有模板就同时做两侧", "省略横向支撑", "胶水未干就测试", "随意加棍子"] }] },
      { title: "强度重量比挑战", blocks: [
        { type: "paragraph", text: "用桥承受的重量除以桥本身重量，这才是真正的工程分数。" },
        { type: "paragraph", text: "在我们的工作坊中，学生搭建的桥通常重量不到 50 克，却能承受 5 到 15 磅的重量才断裂——超过自身重量的 50 倍。" },
        { type: "quote", text: "我们开始只在上次断裂的地方加棍子，而不是到处乱加。就是从那时起，我们的桥才真正变强了。", attribution: "Avanza STEM 桥梁搭建工作坊一名学生" },
        { type: "callout", accent: "purple", text: "在我们的桥梁工作坊中，学生会优化强度重量比。" },
      ] },
    ],
  },
  "getting-started-with-lego-robotics": {
    ...localizedBlogArticles.en["getting-started-with-lego-robotics"],
    title: "乐高机器人入门：家长指南",
    category: "机器人",
    date: common.zh.dates.feb5,
    readTime: common.zh.minutes.m5,
    authorId: "noah",
    imageAlt: "三名学生一起搭建并编程一个乐高机器人",
    imageCaption: "学生们合作搭建并编程他们的第一个乐高机器人。",
    endingProject: { href: "/projects/lego-robot-builder", label: "试试这个项目：搭建你的第一个乐高机器人" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "why-every-kid-should-learn-to-code",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "乐高机器人同时引入工程和编程。学生能看到电机转动、传感器反应，也能看到代码影响现实世界。" }, { type: "paragraph", text: "这份指南帮助家长选择套件并支持孩子学习。" }, { type: "paragraph", text: "在我们的机器人工作坊中，学生们常常整节第一节课都在努力让机器人沿直线前进——这个不断尝试和调整的过程，往往就是当天最重要的学习。" }] },
      { title: "它和普通乐高有什么不同", blocks: [{ type: "paragraph", text: "普通乐高是静态模型，机器人会移动、感知和回应。" }, { type: "callout", title: "核心想法", accent: "green", text: "机器人让失败变成一个要解决的谜题。" }] },
      { title: "选择哪种套件", blocks: [{ type: "numbered", items: [{ title: "SPIKE Essential (6-10 岁)", body: "适合低龄初学者。" }, { title: "SPIKE Prime (10-14 岁)", body: "传感器和电机更多，项目更高级。" }, { title: "Mindstorms Robot Inventor", body: "已停产但仍灵活，遇到好价格可以考虑。" }] }] },
      { title: "孩子会学到什么", blocks: [{ type: "list", items: ["机械基础", "传感器逻辑", "条件编程", "迭代设计", "团队沟通"] }, { type: "quote", text: "机器人一直在打转，后来我们发现是一个轮子松了。发现这个问题的时候，感觉像是真正修好了什么东西。", attribution: "Avanza STEM 机器人工作坊一名学生" }] },
      { title: "给非工程师家长的建议", blocks: [{ type: "paragraph", text: "你不需要知道所有答案，只要提出好问题。" }, { type: "list", items: ["你想让它做什么?", "实际发生了什么?", "你会先改哪里?", "能不能让它做别的事?"] }] },
      { title: "可以先试的项目", blocks: [{ type: "numbered", items: [{ title: "巡线机器人", body: "用颜色传感器跟随黑线。" }, { title: "避障机器人", body: "用距离传感器转向。" }, { title: "遥控", body: "先手动驾驶，再用代码重现。" }, { title: "分类机器", body: "按颜色分类物体。" }] }, { type: "paragraphWithLink", before: "想要有步骤说明的第一个搭建项目，请查看我们的", linkText: "乐高机器人搭建指南", href: "/projects/lego-robot-builder", after: "。" }] },
      { title: "套件之外", blocks: [{ type: "paragraph", text: "FIRST LEGO League 是团队挑战的自然下一步。" }, { type: "ctaLink", title: "搭建你的第一个机器人", text: "在我们的机器人工作坊中，学生会从零开始搭建并编程他们的第一个机器人，不需要任何经验。", linkText: "查看近期工作坊", href: "/workshops", accent: "green" }] },
    ],
  },
  "what-is-ai-explaining-to-kids": {
    ...localizedBlogArticles.en["what-is-ai-explaining-to-kids"],
    title: "什么是 AI? 给孩子解释人工智能",
    category: "AI",
    date: common.zh.dates.jan28,
    readTime: common.zh.minutes.m4,
    authorId: "liam",
    imageAlt: "学生们在 Avanza STEM AI 工作坊中使用电脑，屏幕上显示着图表",
    imageCaption: "学生们在 Avanza STEM 工作坊中亲手探索 AI 概念。",
    endingProject: { href: "/projects/my-first-python-program", label: "试试这个项目：写出你的第一个 Python 程序" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "why-every-kid-should-learn-to-code",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "AI 会推荐视频、影响社交媒体、驱动语音助手并过滤邮件。孩子们常常在理解它之前就已经在使用它。" }, { type: "paragraph", text: "理解 AI 是一种现代素养：要学会问系统用什么数据学习、缺少谁的视角。" }] },
      { title: "从孩子熟悉的东西开始", blocks: [{ type: "callout", accent: "teal", text: "Spotify 给你推荐新歌时，它是怎么选出来的?" }, { type: "paragraph", text: "这个问题自然引出模式识别。在我们的 AI 工作坊中，我们会先问学生这个问题，再做任何解释——他们的回答几乎总能说到点子上，这正是我们想要的效果。" }] },
      { title: "AI 如何学习", blocks: [{ type: "paragraph", text: "AI 从例子中学习，就像孩子看过许多狗之后学会认狗。" }, { type: "callout", title: "技术术语", accent: "green", text: "这叫监督学习：训练例子带有正确答案。" }] },
      { title: "值得给孩子解释的 AI 类型", blocks: [{ type: "numbered", items: [{ title: "图像识别", body: "用于人脸解锁和照片标签。" }, { title: "推荐系统", body: "用于 Netflix、Spotify、YouTube 和社交平台。" }, { title: "语言模型", body: "通过预测文字模式生成文本。" }, { title: "游戏 AI", body: "通过不断尝试和结果反馈来改进。" }] }] },
      { title: "AI 不能做什么", blocks: [{ type: "list", items: ["只能识别类似训练数据的模式", "可能重复偏见", "可能自信地出错", "可能优化指标却错过真正目标"] }, { type: "paragraph", text: "询问训练数据是什么，是很重要的批判性思维。" }] },
      { title: "动手活动", blocks: [{ type: "list", items: ["打开 Teachable Machine", "创建两个类别", "用摄像头训练", "测试新动作", "比较 5 个例子和 50 个例子的差别"] }, { type: "callout", accent: "teal", text: "这个活动能在几分钟内展示数据收集、训练和模型质量。" }, { type: "quote", text: "我训练它来分辨我和朋友的手，一开始一直认错，直到我们用了更多照片。那一刻我才真正明白是怎么回事。", attribution: "Avanza STEM AI 工作坊一名学生" }] },
      { title: "负责任地使用 AI", blocks: [{ type: "paragraph", text: "孩子需要知道什么时候验证 AI、什么时候不该依赖它，以及系统造成伤害时谁负责。" }, { type: "paragraphWithLink", before: "如果这是孩子第一次用代码做东西，我们的", linkText: "《我的第一个 Python 程序》指南", href: "/projects/my-first-python-program", after: "是很好的下一步。" }] },
    ],
  },
  "math-games-that-make-learning-fun": {
    ...localizedBlogArticles.en["math-games-that-make-learning-fun"],
    title: "让学习变有趣的数学游戏",
    category: "数学",
    date: common.zh.dates.jan20,
    readTime: common.zh.minutes.m3,
    authorId: "enqi",
    imageAlt: "一个色彩鲜艳的木制算盘，用于培养数感",
    imageCaption: "木制算盘——许多能在孩子接触练习册之前培养数感的简单工具之一。",
    endingProject: { href: "/games", label: "试试这些游戏" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "5-easy-science-experiments",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "数学焦虑常常来自练习册、限时测试和红色批改。游戏能改变这种体验。" },
        { type: "paragraph", text: "这些游戏适合 2 到 5 年级，并且材料很简单。" },
        { type: "summary", timeLabel: "所需时间", time: "每个游戏 10-20 分钟", ageLabel: "适合年龄", age: "2-5 年级（7-11 岁）", supervisionLabel: "需要成人监督", supervision: "不需要——孩子可以自己玩，也可以和家人一起玩", learnLabel: "孩子将学到", learn: "数感、心算、分数和估算" },
      ] },
      { title: "", blocks: [{ type: "games", items: [
        { title: "数字大战", gradeRange: "2-4 年级", description: "练习数字比较的纸牌游戏。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["发牌。", "每人翻一张。", "大的赢。", "乘法版翻两张。"], whyItWorks: "反复练习但不像作业。" },
        { title: "101 不超线", gradeRange: "3-5 年级", description: "练习心算和策略的骰子游戏。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["从 0 开始。", "掷两个骰子。", "相加或组成十位数。", "尽量接近 101 但不能超过。"], whyItWorks: "强化位值理解。" },
        { title: "分数披萨", gradeRange: "3-5 年级", description: "动手理解分数。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["把圆剪成分数片。", "轮流抽取。", "刚好拼成一个整圆。"], whyItWorks: "移动实物能帮助理解等值分数。" },
        { title: "目标数字", gradeRange: "4-5 年级", description: "开放式心算挑战。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["选五个数字。", "设一个目标。", "用运算达到目标。"], whyItWorks: "展示一道题可以有多种路径。" },
        { title: "数学二十问", gradeRange: "2-5 年级", description: "用数学词汇玩的逻辑游戏。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["想一个数字。", "问是/否问题。", "用尽量少的问题猜中。"], whyItWorks: "词汇变得有用，因为它能帮助获胜。" },
        { title: "估算罐", gradeRange: "2-4 年级", description: "每周估算挑战。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["装满一个透明罐。", "每个人写估计值。", "一起数。", "最接近者获胜。"], whyItWorks: "低压力估算能建立数感。" },
      ] }] },
      { title: "关于限时练习", blocks: [
        { type: "paragraph", text: "熟练来自低压力的反复接触。游戏能提供练习，同时减少焦虑。" },
        { type: "paragraphWithLink", before: "想要更多游戏？我们的", linkText: "游戏页面", href: "/games", after: "上有更多这类活动。" },
        { type: "list", items: ["从孩子喜欢的游戏开始", "和孩子一起玩", "一开始让他们赢几次", "纠正前先问他们怎么想", "在他们还想玩时结束"] },
        { type: "callout", title: "给家长的提示", accent: "orange", text: "在我们的家庭数学之夜中，最受欢迎的游戏往往是能让孩子光明正大地赢过大人的游戏。「数字大战」和「101 不超线」在这方面效果很好。" },
        { type: "quote", text: "我女儿连续三个晚上都要玩「101 不超线」。我从来没告诉她这其实是数学练习。", attribution: "Avanza STEM 家庭数学之夜一名家长" },
      ] },
    ],
  },
  "building-a-community-stem-workshops": {
    ...localizedBlogArticles.en["building-a-community-stem-workshops"],
    title: "建设社区：本地 STEM 工作坊如何改变生活",
    category: "社区",
    date: common.zh.dates.jan12,
    readTime: common.zh.minutes.m7,
    authorId: "logan",
    imageAlt: "家庭和学生们聚集在图书馆参加 Avanza STEM 社区活动",
    imageCaption: "家庭们聚集在图书馆，参加 Avanza STEM 社区工作坊系列活动。",
    endingProject: { href: "/host", label: "在你的社区举办工作坊" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "getting-started-with-lego-robotics",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "创办 Avanza STEM 最难的部分，是相信带着材料和电脑出现在图书馆真的会有意义。" }, { type: "paragraph", text: "在 Clifton 公共图书馆和 Allwood 分馆开展项目后，已经有超过 70 名学生参与，答案很清楚：它有意义，因为学生看到 STEM 也属于他们。" }] },
      { title: "工作坊是什么样", blocks: [{ type: "paragraph", text: "目前的形式是三周系列：工程、编程和 AI。全部免费，不需要经验。" }, { type: "paragraph", text: "学生会搭建、写 Python，并训练简单 AI 模型。" }] },
      { title: "为什么图书馆合适", blocks: [{ type: "paragraph", text: "图书馆是社区信任的免费学习空间。" }, { type: "list", items: ["免费参加", "熟悉且安全", "与社区有联系", "有空间和技术", "不同学校的学生都能来"] }] },
      { title: "我们在现场看到的", blocks: [{ type: "paragraph", text: "学生会主动给 Python 游戏加问题，家庭第一次在附近看到这样的 STEM 项目，孩子们也会认真讨论科学现象。" }, { type: "quote", text: "一位家长告诉我们，她的女儿在课程结束前就已经在问下周还能不能再来。那一刻我们知道，这个项目真的有用。", attribution: "Allwood 分馆图书管理员" }] },
      { title: "代表性问题", blocks: [{ type: "paragraph", text: "西班牙裔学生需要更多接触、导师、鼓励和机会。" }, { type: "callout", title: "我们想缩小的差距", accent: "purple", text: "可见性会影响谁觉得自己被 STEM 邀请进来。" }] },
      { title: "如何把工作坊带到你的社区", blocks: [{ type: "numbered", items: [{ title: "找到地点", body: "图书馆、社区中心、教堂和学校都可以。" }, { title: "联系我们", body: "我们可以讨论课程、材料和推广。" }, { title: "在本地推广", body: "社区群组和当地伙伴很有帮助。" }, { title: "持续出现", body: "信任需要时间建立。" }] }] },
      { title: "接下来", blocks: [
        { type: "paragraph", text: "我们希望扩展到更多图书馆和社区中心，并分享可复制的模式。" },
        { type: "ctaLink", title: "在你的社区举办工作坊", text: "想为你所在的图书馆、学校或社区中心带来免费的 STEM 项目吗？", linkText: "联系我们安排工作坊", href: "/host", accent: "purple" },
        { type: "ctaLink", text: "想先看看一次工作坊是什么样子？", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
}
