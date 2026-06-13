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

export type LocalizedBlogArticles = {
  en: Record<BlogSlug, BlogArticle>
  es: Partial<Record<BlogSlug, BlogArticle>>
  zh: Partial<Record<BlogSlug, BlogArticle>>
}

const common = {
  en: {
    dates: {
      feb20: "February 20, 2026",
      feb15: "February 15, 2026",
      feb10: "February 10, 2026",
      feb5: "February 5, 2026",
      jan28: "January 28, 2026",
      jan20: "January 20, 2026",
      jan12: "January 12, 2026",
    },
    minutes: { m3: "3 min", m4: "4 min", m5: "5 min", m6: "6 min", m7: "7 min" },
  },
  es: {
    dates: {
      feb20: "20 de febrero de 2026",
      feb15: "15 de febrero de 2026",
      feb10: "10 de febrero de 2026",
      feb5: "5 de febrero de 2026",
      jan28: "28 de enero de 2026",
      jan20: "20 de enero de 2026",
      jan12: "12 de enero de 2026",
    },
    minutes: { m3: "3 min", m4: "4 min", m5: "5 min", m6: "6 min", m7: "7 min" },
  },
  zh: {
    dates: {
      feb20: "2026 年 2 月 20 日",
      feb15: "2026 年 2 月 15 日",
      feb10: "2026 年 2 月 10 日",
      feb5: "2026 年 2 月 5 日",
      jan28: "2026 年 1 月 28 日",
      jan20: "2026 年 1 月 20 日",
      jan12: "2026 年 1 月 12 日",
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
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: write your first Python program" },
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
            { type: "paragraphWithLink", before: "For a full walkthrough of this project, including how to turn it into a quiz, see our ", linkText: "My First Python Program guide", href: "/projects/my-first-python-program", after: "." },
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
      endingProject: { href: "/projects/popsicle-stick-bridge", label: "Try this project: build a popsicle stick bridge" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "getting-started-with-lego-robotics",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Bridge competitions come down to geometry, load distribution, and joint quality, not just how many sticks or how much glue you use." },
          { type: "paragraphWithLink", before: "This post explains the engineering ideas behind strong bridges. For the full build guide, visit our ", linkText: "detailed project page", href: "/projects/popsicle-stick-bridge", after: "." },
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
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: build your first LEGO robot" },
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
          { type: "paragraphWithLink", before: "For a guided first build with step-by-step instructions, see our ", linkText: "LEGO Robot Builder project guide", href: "/projects/lego-robot-builder", after: "." },
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
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: write your first Python program" },
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
          { type: "paragraphWithLink", before: "If this is your child's first time building something with code, our ", linkText: "guide to writing a first Python program", href: "/projects/my-first-python-program", after: " is a good next step." },
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
          { type: "paragraph", text: "After programs at Clifton Public Library and Allwood Branch Library reaching more than 70 students, the answer is clear: it matters because students see that STEM belongs to them too." },
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
        { type: "paragraph", text: "Después de programas en la Biblioteca Pública de Clifton y la Sucursal Allwood que han llegado a más de 70 estudiantes, la respuesta es clara: importa porque los estudiantes ven que STEM también les pertenece." },
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
