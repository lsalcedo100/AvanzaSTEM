import type { AuthorId } from "@/features/blog/authors"

const GALLERY_IMAGE_7 =
  "https://res.cloudinary.com/dw4uprmkk/image/upload/f_auto,q_auto:good,w_1600/gallery-00168.jpg"

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
  | { type: "image"; src: string; alt: string; caption?: string }
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
    minutes: { m3: "3 min", m4: "4 min", m5: "5 min", m6: "6 min", m7: "7 min" },
  },
  es: {
    minutes: { m3: "3 min", m4: "4 min", m5: "5 min", m6: "6 min", m7: "7 min" },
  },
  zh: {
    minutes: { m3: "3 分钟", m4: "4 分钟", m5: "5 分钟", m6: "6 分钟", m7: "7 分钟" },
  },
}

export const localizedBlogArticles: LocalizedBlogArticles = {
  en: {
    "why-every-kid-should-learn-to-code": {
      title: "Why Every Kid Should Learn to Code (And How to Start)",
      category: "Coding",
      categoryColor: "bg-avanza-green",
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
            { type: "paragraph", text: "At our coding workshops at Clifton Public Library, we have watched a student write a program that does nothing more than print \"Hello,\" then spend the next twenty minutes adding new questions, jokes, and sound effects to it. That moment is not just excitement; it is the realization that they can build things." },
          ],
        },
        {
          title: "It Is Not Really About Code",
          blocks: [
            { type: "paragraph", text: "The goal is not simply to produce programmers. The real value is in the thinking patterns that coding develops:" },
            { type: "list", items: ["Decomposition: breaking a big problem into smaller pieces", "Pattern recognition: spotting repeated structures", "Abstraction: focusing on what matters", "Debugging: testing ideas and figuring out why they fail"] },
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
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/blog/egg-experiment.jpg",
      imageAlt: "A close-up of an egg covered in carbon dioxide bubbles during a kitchen chemistry reaction",
      imageCaption: "Carbon dioxide bubbles form during a kitchen chemistry reaction, the same gas-producing reaction at work in several of these experiments.",
      endingProject: { href: "/projects/baking-soda-volcano", label: "Try this project: baking soda volcano" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "math-games-that-make-learning-fun",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You do not need a lab coat or expensive equipment to do real science. Many of the best experiments for kids use household items like vinegar, paper towels, and sparkling water." },
          { type: "paragraph", text: "Each experiment includes materials, steps, and a plain-language explanation so you can talk about what your child observed." },
          { type: "summary", timeLabel: "Time needed", time: "30-45 minutes for all five", ageLabel: "Best age range", age: "Ages 5 and up, with adult help for younger kids", supervisionLabel: "Adult supervision", supervision: "Yes, especially for the Egg in a Bottle experiment, which uses fire", learnLabel: "What kids will learn", learn: "chemical reactions, gas pressure, density, and capillary action", safetyLabel: "Safety note", safety: "An adult must light the match and supervise the egg experiment closely" },
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
          { type: "callout", title: "Workshop Connection", accent: "teal", text: "At our workshops, students have debated why the raisins kept sinking and rising in the Dancing Raisins experiment for almost ten minutes, longer than it took to set up. That kind of argument is exactly the goal." },
        ] },
      ],
    },
    "how-to-build-the-strongest-popsicle-stick-bridge": {
      title: "How to Build the Strongest Popsicle Stick Bridge",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
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
          { type: "paragraph", text: "At our workshops, student-built bridges typically weigh under 50 grams but hold 5 to 15 pounds before breaking, more than 50 times their own weight." },
          { type: "quote", text: "We started adding sticks only to the spot that broke last time, instead of everywhere. That is when our bridge actually got stronger.", attribution: "Student at an Avanza STEM bridge-building workshop" },
          { type: "callout", accent: "purple", text: "Our bridge-building workshop challenges students to optimize strength-to-weight ratio, which changes the whole strategy." },
        ] },
      ],
    },
    "getting-started-with-lego-robotics": {
      title: "Getting Started with LEGO Robotics: A Parent's Guide",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/shared/lego-robotics.jpeg",
      imageAlt: "A LEGO robotics kit arranged for a beginner build",
      imageCaption: "LEGO robotics can be a helpful at-home introduction to engineering and programming.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: LEGO SPIKE Prime Super Cleanup robot guide" },
      endingSecondary: { href: "/projects", label: "Browse more STEM projects" },
      endingRelatedSlug: "why-every-kid-should-learn-to-code",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "LEGO robotics introduces engineering and programming at the same time. Students can see motors spin, sensors react, and code affect the real world." },
          { type: "paragraph", text: "In a first robotics build, students might spend a whole session just getting a robot to drive in a straight line, and the troubleshooting that takes is usually the best learning of the day." },
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
          { type: "quote", text: "It kept driving in circles, and it turned out one wheel was just loose. Once we found that, it felt like we had actually fixed something.", attribution: "Student trying a LEGO robotics project" },
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
          { type: "ctaLink", title: "Build Your First Robot", text: "Start with a guided LEGO SPIKE Prime project that walks through the build, code logic, and troubleshooting steps.", linkText: "Try the robot guide", href: "/projects/lego-robot-builder", accent: "green" },
        ] },
      ],
    },
    "what-is-ai-explaining-to-kids": {
      title: "What is AI? Explaining Artificial Intelligence to Kids",
      category: "AI",
      categoryColor: "bg-avanza-teal",
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
          { type: "paragraph", text: "That conversation leads naturally to pattern-finding, which is the core idea behind many AI systems. At our AI workshop sessions, we ask students this question before explaining anything, and their guesses are almost always close. That is exactly the point." },
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
      readTime: common.en.minutes.m3,
      authorId: "enqi",
      image: "/images/blog/abacus.jpg",
      imageAlt: "A colorful wooden abacus, a tool for building number sense",
      imageCaption: "A wooden abacus is one of many simple tools that help build number sense before kids ever see a worksheet.",
      endingProject: { href: "/games", label: "Try these games" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "5-easy-science-experiments",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Math anxiety often starts when math feels like worksheets, timed tests, and red marks. Games make the same skills feel playful." },
          { type: "paragraph", text: "These games are designed for grades 2 through 5 and require minimal materials." },
          { type: "summary", timeLabel: "Time needed", time: "10-20 minutes per game", ageLabel: "Best age range", age: "Grades 2-5 (ages 7-11)", supervisionLabel: "Adult supervision", supervision: "No. Kids can play independently or with a family member", learnLabel: "What kids will learn", learn: "number sense, mental math, fractions, and estimation" },
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
        { title: "The Representation Problem and Why It Is Ours to Solve", blocks: [
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
      readTime: common.en.minutes.m5,
      authorId: "logan",
      image: "/images/blog/Triangles-Strongest.jpg",
      imageAlt: "Students examining a completed popsicle stick truss bridge at an Avanza STEM engineering workshop",
      imageCaption: "Students at an Avanza STEM workshop inspect a truss bridge. The triangles in the design are not decorative; they are why the bridge holds weight.",
      endingProject: { href: "/projects/popsicle-stick-bridge", label: "Try this project: build a popsicle stick truss bridge" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "how-to-build-the-strongest-popsicle-stick-bridge",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "At Avanza STEM engineering workshops, one of the most common questions students ask when they see a strong bridge is: why does that design work? The answer almost always comes back to one shape: the triangle." },
          { type: "paragraph", text: "This is not just a rule to memorize. Once you understand why triangles are so special, you start seeing them everywhere: in bridges, in towers, in bicycle frames, in rooftops, in roller coasters." },
        ] },
        { title: "The Problem With Squares", blocks: [
          { type: "paragraph", text: "Imagine building a square frame from four sticks and some tape. If you push on one corner, the frame leans sideways and changes into a diamond shape. This is called deformation, and it happens because a square has four joints that can rotate." },
          { type: "callout", title: "The Key Difference", accent: "purple", text: "A triangle has three sides and three corners. You cannot change the shape of a triangle without bending or breaking one of the sides. That is what makes it rigid." },
          { type: "paragraph", text: "This is why a square is the wrong shape for a load-bearing structure, and a triangle is the right one." },
        ] },
        { title: "What Happens When You Add One Diagonal", blocks: [
          { type: "paragraph", text: "Here is a trick that uses this idea: take a square frame and add one stick diagonally across the middle. You now have two triangles, and the structure becomes dramatically stronger." },
          { type: "paragraph", text: "That single added stick does not just reinforce the square. It splits it into two triangles, and the whole thing becomes rigid. At our popsicle stick bridge workshops, students who add diagonal bracing to a square panel see a noticeable difference in how much weight the panel can handle before it fails." },
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
            { title: "Triangles convert forces into tension and compression", body: "When a load pushes down on a triangle, each member either gets pulled (tension) or squeezed (compression). There is no bending, and bending is what breaks things." },
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
          { type: "callout", accent: "purple", text: "At our bridge workshops, the strongest bridges are always the ones built around a connected series of triangles. Students who understand why build better bridges, and they know what to fix when one fails." },
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
      readTime: common.en.minutes.m4,
      authorId: "logan",
      image: "/images/blog/Failed Bridge.jpeg",
      imageAlt: "Students testing a failed bridge with books during an Avanza STEM engineering workshop",
      imageCaption: "A structure that just failed is not a loss. It is data. Students examine where and why the break happened before thinking through the next improvement.",
      imageFit: "contain",
      endingProject: { href: "/projects/popsicle-stick-bridge", label: "Try this project: build a popsicle stick bridge" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "At Avanza STEM engineering workshops, something breaks at almost every session. A bridge collapses under weight. A tower falls when a block is added. A cardboard structure tips over. And almost every time, the student who built it knows exactly what went wrong the moment it happens." },
          { type: "paragraph", text: "That moment of understanding, 'oh, it broke right at the joint, because I did not glue it well enough,' is the most important moment in the whole session. It is not a failure. It is information." },
          { type: "youtube", videoId: "xPp8R64YEHQ", title: "How engineers think when something breaks", caption: "A quick look at the mindset engineers use when a design fails." },
        ] },
        { title: "The First Question an Engineer Asks", blocks: [
          { type: "paragraph", text: "When something breaks, the first engineering question is not 'what did I do wrong?' It is: 'where did it break, and what does that tell me?'" },
          { type: "paragraph", text: "A bridge that snaps in the middle tells you the middle was the weakest point. A joint that pulls apart tells you the connection was not strong enough. The break is giving you instructions for the next build." },
          { type: "callout", title: "Engineering Framing", accent: "purple", text: "A structure that broke is useful. A structure that was never tested tells you nothing." },
        ] },
        { title: "The Improve Loop", blocks: [
          { type: "paragraph", text: "Engineers use an iterative cycle, sometimes called the design loop. It is not a straight line from idea to success. It looks more like this:" },
          { type: "numbered", items: [
            { title: "Define the goal", body: "What exactly does the structure need to do? Hold 5 pounds? Span 30 centimeters? Weigh as little as possible?" },
            { title: "Build a first version", body: "Do not try to make it perfect on the first try. Make it testable." },
            { title: "Test it deliberately", body: "Apply the actual load or stress. Do not guess how it will do." },
            { title: "Observe what failed", body: "Notice not just that it failed, but where and how. That detail is the data." },
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
          { type: "paragraph", text: "If a bridge breaks and you rebuild it with better joints AND a different truss shape AND more bracing, you learn very little. Maybe it holds more weight, but you do not know which change made the difference, so you cannot apply that knowledge to the next build." },
          { type: "callout", accent: "purple", text: "Change one thing. Test. Observe. Then change the next thing. This is how engineers find out what actually works instead of getting lucky." },
        ] },
        { title: "This Thinking Works Everywhere", blocks: [
          { type: "paragraph", text: "The engineering mindset is not only for structures. The same pattern of observe, hypothesize, test, and improve shows up everywhere:" },
          { type: "list", items: [
            "Science: a failed experiment tells you something specific about the conditions or your hypothesis",
            "Coding: a program that crashes gives you an error message, so read it carefully before you change anything",
            "Math: a wrong answer tells you which step to go back and review, not that you are bad at math",
            "Sports: a missed shot shows you what to adjust in your stance or timing, not that you should quit",
          ] },
          { type: "ctaLink", title: "Join a Free Engineering Workshop", text: "At our engineering workshops, students build, test, and use the results to make better design choices.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "design-a-mars-rover-out-of-cardboard": {
      title: "Design a Mars Rover Out of Cardboard",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
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
          { type: "paragraph", text: "You will not be designing for 140 million miles today, but you will be working with the same kinds of constraints: limited materials, weight limits, rough terrain, and the requirement that your rover actually functions when tested." },
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
            { title: "Bonus: the arm", body: "Add a piece that extends outward from the body, like a rover arm, that can 'reach' down toward a surface without the whole rover moving." },
          ] },
        ] },
        { title: "Your Design Constraints", blocks: [
          { type: "paragraph", text: "Real engineering always has constraints. Working within them is the job. These are yours:" },
          { type: "list", items: [
            "Maximum size: must fit inside a shoebox",
            "No hot glue. Use tape and fasteners only",
            "Wheels must be round (any size, but actually round)",
            "Maximum build time: 45 minutes",
            "You must be able to explain one design decision before testing",
          ] },
        ] },
        { title: "Engineering Questions to Think Through Before You Build", blocks: [
          { type: "numbered", items: [
            { title: "How many wheels?", body: "Four wheels offer more stability than three. But more wheels mean more weight and more parts to break. Real rovers use six, with each one independently connected so one wheel hitting a rock does not tip the whole vehicle." },
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
          { type: "quote", text: "One student added a ramp on the front of his rover using a bent strip of cardboard. He said it was for pushing rocks out of the way. I asked if he had seen that on a real rover. He said no, he just thought it would help. That is the right kind of thinking.", attribution: "Noah Lopez, Avanza STEM mentor" },
        ] },
        { title: "The Real Rover Connection", blocks: [
          { type: "paragraph", text: "Perseverance, NASA's current Mars rover, weighs about 1,025 kilograms and has six wheels designed to each move independently. It carries cameras, a microphone, a drill, and a helicopter called Ingenuity. Every part had to be light enough to launch, strong enough to land, and reliable enough to operate for years without anyone nearby to repair it." },
          { type: "paragraph", text: "The design questions you are working through, including weight distribution, wheel count, terrain clearance, and payload capacity, are the same categories of question real rover engineers answer, just at very different scales." },
          { type: "ctaLink", title: "Try Engineering in Person", text: "At our workshops, students work through design challenges like this one and test their builds against real constraints.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "what-is-ai-actually-doing-when-it-answers-you": {
      title: "What Is AI Actually Doing When It Answers You?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/What AI actually does.jpg",
      imageAlt: "A glowing AI graphic above a tablet with digital network lines in the background",
      imageCaption: "At Avanza STEM AI workshops, students learn to ask what an AI is actually doing, not just whether the answer sounds right.",
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
            { title: "Trained on text", body: "Language models are trained on large amounts of written text, including articles, books, websites, code, and more. This exposed the model to billions of examples of how language is used." },
            { title: "Learned patterns", body: "The model learned statistical patterns: after this combination of words, these words tend to follow. The patterns are too complex to describe simply, but they are patterns, not rules a person wrote." },
            { title: "Got feedback", body: "The model then received ratings from people who evaluated which responses were more helpful, accurate, and appropriate. The model adjusted based on that feedback." },
            { title: "Generates responses", body: "When you ask a question, the model uses those patterns to generate a response that matches what a helpful answer looks like based on what it has seen in training." },
          ] },
        ] },
        { title: "Why It Can Sound Right and Be Wrong", blocks: [
          { type: "paragraph", text: "Because AI generates statistically likely text rather than verified facts, it can produce responses that sound confident and authoritative but contain errors. This is sometimes called a hallucination, when the AI states something that is not true in a way that sounds like it is." },
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
          { type: "paragraph", text: "For tasks where the answer needs to be provably correct, such as a specific fact, a medical question, or a legal decision, verify AI responses with a reliable source." },
        ] },
        { title: "A Good Habit: Ask It to Explain Itself", blocks: [
          { type: "paragraph", text: "When working with AI, after it gives you an answer, try asking: 'how do you know that?' or 'where would I verify this?' The response you get back is often revealing." },
          { type: "callout", accent: "teal", text: "In our AI workshop sessions, we ask students to choose one AI response and try to fact-check it. The goal is not to distrust AI. It is to read it the same way you would read any source: with your own judgment engaged." },
          { type: "quote", text: "I asked it about a scientist and it got the discovery date wrong by thirty years. I would have just believed it if we had not checked. Now I check things.", attribution: "Student at an Avanza STEM AI workshop" },
        ] },
        { title: "What This Means for Kids and Parents", blocks: [
          { type: "paragraph", text: "Kids who grow up using AI tools will benefit from understanding, at a basic level, what these systems do and what they do not do. That understanding shapes how they read AI output." },
          { type: "list", items: [
            "Use AI for brainstorming and drafting more than for finding specific facts",
            "Cross-reference important answers with a second source",
            "Notice when AI sounds overly confident and ask follow-up questions",
            "Understand that AI is not always wrong, but it is not always right either",
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
          { type: "paragraph", text: "The inventor did not start by trying to invent something. They started by noticing a problem that bothered them and then asking: what if there were a better way?" },
        ] },
        { title: "The Inventor Loop", blocks: [
          { type: "paragraph", text: "You do not need special materials or a lab to think like an inventor. You need four steps and about twenty minutes." },
          { type: "numbered", items: [
            { title: "Find a problem", body: "Look for something small and annoying. A door that always swings shut. A phone charger that falls out. A backpack zipper that catches. Small frustrations make better invention prompts than big ones, because you can actually test a solution." },
            { title: "Sketch a solution", body: "Draw what a fix might look like, even just a rough shape on paper. You are not trying to make it perfect. You are trying to make your idea specific enough to argue about." },
            { title: "Build a rough prototype", body: "Use what you have: paper, tape, cardboard, rubber bands. The prototype does not have to look good. It just has to be testable." },
            { title: "Test it", body: "Try to break your prototype. If it works perfectly the first time, your test was not hard enough. Find the weak point. That is your next problem to solve." },
          ] },
        ] },
        { title: "Finding Problems Worth Solving", blocks: [
          { type: "paragraph", text: "The hardest part for most students is step one, not because there are no problems, but because they are used to ignoring small annoyances instead of paying attention to them." },
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
          { type: "paragraph", text: "That commitment is what lets you test the idea. Without a sketch, you adjust as you go, which is fine, but slower. With a sketch, you know what you set out to build and can notice when reality differs from the plan." },
          { type: "callout", title: "One Rule", accent: "purple", text: "Do not touch any materials until you have drawn at least one version of the idea. The sketch does not have to be good. It just has to exist." },
        ] },
        { title: "What Counts as a Prototype", blocks: [
          { type: "paragraph", text: "A prototype is the fastest version of your idea you can build and test. It is not a finished product. It is not supposed to look nice. It is supposed to tell you something you did not already know." },
          { type: "list", items: [
            "Tape things together instead of gluing because you will be taking it apart",
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
            { title: "The first clue: the bridge twisted sideways", body: "Before it collapsed, the students noticed that one side was leaning more than the other. That told them the problem was not just weight. It was uneven support." },
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
          { type: "paragraph", text: "But if you change three things and the next version is better, you do not know which change made the difference. You just got lucky, and luck does not transfer to the next build." },
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
          { type: "paragraph", text: "Carrying 10 pounds in your hand is much harder than carrying 10 pounds on your back. That is not a trick; it is physics. A bag hung from one hand creates a moment arm, which multiplies the effort your muscles need to hold it. A backpack positions the weight close to your spine, reducing that effort." },
          { type: "paragraph", text: "The shoulder straps do more than just hold the bag up. Wider straps spread the same weight over more surface area, which reduces pressure per square centimeter. It is the same reason snowshoes keep you from sinking. Padded straps have a softer surface that compresses slightly, distributing pressure more evenly." },
          { type: "callout", title: "Weight Loading Order", accent: "purple", text: "Pack heavier items closest to your back and lighter items toward the outside. This keeps the center of mass near your spine and reduces the forward pull that strains your lower back." },
        ] },
        { title: "How a Zipper Actually Works", blocks: [
          { type: "paragraph", text: "A zipper is a row of interlocking teeth on each side of an opening. When you pull the slider, it forces the two rows of teeth together in a specific pattern. Each tooth has a small bump and a corresponding hollow. As the slider moves, it positions each tooth so the bump on one side clicks into the hollow on the other." },
          { type: "paragraph", text: "That click is why a closed zipper feels so solid. The interlocked teeth resist both pulling apart and sliding sideways. To open it, the slider wedges a small blade between the rows, forcing the teeth apart one pair at a time." },
          { type: "list", items: [
            "Metal zippers last longer but weigh more",
            "Plastic coil zippers are lighter and more flexible, good for curved seams",
            "YKK is the most common zipper manufacturer in the world and appears on most quality bags",
            "A zipper fails when the slider stretches too wide, and you can sometimes fix this by pressing it gently with pliers",
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
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: GALLERY_IMAGE_7,
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
          { type: "callout", accent: "purple", text: "At our bridge workshops, students do not watch a mentor build a bridge. They get materials, a load limit, and about 30 minutes. The frustration, the arguments with their partner about the design, the moment the bridge holds more than they expected: that is where the learning lives." },
        ] },
        { title: "How We Design Avanza STEM Activities", blocks: [
          { type: "paragraph", text: "Every activity we run goes through the same set of questions before we bring it to a workshop." },
          { type: "numbered", items: [
            { title: "Is there a real test?", body: "If students cannot find out whether their idea worked, it is not a design challenge. It is an art project. Every activity ends with a test: does the bridge hold the weight? Does the rover cross the terrain? Does the code run?" },
            { title: "Can it fail in an interesting way?", body: "Failure that teaches something is a feature. If the activity only succeeds or trivially fails, there is nothing to iterate on. The best failures are specific enough that students know what to fix." },
            { title: "Is there room for different approaches?", body: "A challenge with one correct answer turns into a race to find it. A challenge with multiple valid approaches lets students make genuine design decisions and learn from comparing results." },
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
            "Explain to the group what they learned, not what they built, but what they found out",
          ] },
          { type: "paragraph", text: "That last step is the one most workshops skip. When a student has to explain what they learned in words, they figure out whether they actually understood it or just got lucky." },
        ] },
        { title: "Why Noise Is Usually a Good Sign", blocks: [
          { type: "paragraph", text: "Quiet workshops make adults feel comfortable and usually make students feel less engaged. A session where students are talking, even loudly and even arguing, is a session where students are thinking." },
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
      readTime: common.en.minutes.m5,
      authorId: "logan",
      image: "/images/blog/Engineering a School Bus Medium.jpeg",
      imageAlt: "A yellow school bus showing its distinctive safety-yellow color, oversized mirrors, and emergency exit markings",
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
          { type: "paragraph", text: "School bus seats might not look fancy, but they are designed with safety in mind. Many school buses use something called compartmentalization: the seats are tall, padded, and close together. If the bus stops suddenly, the seat in front of you helps absorb some of the motion, almost like a soft wall." },
          { type: "paragraph", text: "The seats also have strong frames underneath. They need to handle bumps, turns, and years of students sitting, leaning, and moving around. A seat on a school bus is not just a place to sit. It is part of the safety system." },
        ] },
        { title: "Why Can the Driver See So Much?", blocks: [
          { type: "paragraph", text: "Bus drivers need to see the road, the students, the doors, the sidewalk, and the cars around them. That is why buses have huge mirrors. Some mirrors show what is behind the bus. Others help the driver see near the front bumper, where small children might be hard to spot." },
          { type: "paragraph", text: "Visibility is a major engineering challenge because a school bus is big. Engineers have to help the driver see around the size of the vehicle." },
        ] },
        { title: "Turning a Giant Vehicle", blocks: [
          { type: "paragraph", text: "A school bus is much longer than a car, so turning is harder. Engineers have to think about turning radius, or how much space a vehicle needs to make a turn. A bus needs more space than a small car, especially on narrow streets." },
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
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/blog/United_Airlines_Boeing_777-200 With Curved Wings.jpg",
      imageAlt: "A United Airlines Boeing 777-200 in flight, with its curved airfoil wings and upturned winglets clearly visible",
      imageCaption: "Airplane wings are not flat boards. Their curved airfoil shape creates the pressure difference that lifts a hundred-ton aircraft off the ground.",
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
          { type: "paragraph", text: "An airplane sitting still on a runway does not lift off. It needs to move fast because the wings need air moving over them. The faster the airplane moves, the more air flows around the wings, and more airflow can create more lift." },
          { type: "paragraph", text: "That is why airplanes speed down the runway before takeoff. The engines push the plane forward, the wings interact with the moving air, and eventually there is enough lift for the plane to rise." },
        ] },
        { title: "What About the Flaps?", blocks: [
          { type: "paragraph", text: "During takeoff and landing, you may see parts of the wing move. These are called flaps and slats. They change the shape of the wing, which helps it create more lift at slower speeds." },
          { type: "paragraph", text: "That is useful because planes need extra lift when they are taking off or landing. They cannot always go super fast near the ground, so engineers give the wings moving parts that help control the airflow." },
        ] },
        { title: "Try This: Paper Wing Test", blocks: [
          { type: "paragraph", text: "Take two pieces of paper. Fold one into a simple paper airplane. Keep the other flat. Now gently throw both. The folded paper airplane flies better because its shape helps it move through air in a more controlled way." },
          { type: "callout", title: "Shape Matters", accent: "purple", text: "Engineers test wing shapes in wind tunnels, computer simulations, and real flights. A tiny change in wing shape can make a big difference in how much lift is created. This is why it is not just the engines doing the work. The wings are carefully shaped engineering tools." },
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
      readTime: common.en.minutes.m4,
      authorId: "liam",
      image: "/images/blog/beautiful modern elevator Medium.jpeg",
      imageAlt: "A sleek modern elevator interior with illuminated floor buttons and polished metallic walls",
      imageCaption: "Behind that simple button press is a system of sensors, motors, counterweights, and logic that moves people safely between floors.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/how-engineers-think-when-something-breaks", label: "Read next: how engineers think when something breaks" },
      endingRelatedSlug: "how-engineers-think-when-something-breaks",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You press a button. The doors close. The elevator moves. Then it stops at the right floor. It feels simple, but elevators are full of engineering. They use buttons, sensors, motors, cables, counterweights, and computer logic to move people safely." },
          { type: "paragraph", text: "So how does an elevator know where to go?" },
        ] },
        { title: "The Button Sends a Request", blocks: [
          { type: "paragraph", text: "When you press an elevator button, you are not directly controlling the motor. You are sending a request to the elevator's control system, the elevator's brain. It keeps track of:" },
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
          { type: "paragraph", text: "Most elevators use electric motors to move. The motor turns a pulley system that moves cables attached to the elevator car. But here is the clever part: many elevators also use a counterweight, a heavy object connected to the elevator system. When the elevator car moves up, the counterweight moves down. When the car moves down, the counterweight moves up." },
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
          { type: "callout", title: "No Single Right Answer", accent: "purple", text: "There is not always one perfect solution. Engineers have to think about speed, fairness, safety, and energy use all at the same time. What trade-offs would you make?" },
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
      readTime: common.en.minutes.m5,
      authorId: "logan",
      image: "/images/blog/Taipei 101 Skyscraper that Sways.jpg",
      imageAlt: "Taipei 101 skyscraper rising above the Taipei skyline, one of the most studied examples of wind-resistant building design",
      imageCaption: "Taipei 101 is engineered to flex by design. In strong typhoon winds, the top can sway nearly a meter, and that is exactly what keeps it standing.",
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
          { type: "image", src: "/images/blog/Ball in the middle of Taipei 101.jpg", alt: "The 660-ton golden tuned mass damper ball suspended inside Taipei 101, visible from the observation deck", caption: "Taipei 101's 660-ton golden damper ball hangs near the 88th floor. When wind pushes the building one way, this pendulum swings the opposite direction and cancels out the motion people inside would feel." },
        ] },
        { title: "Shape Matters Too", blocks: [
          { type: "paragraph", text: "The shape of a building affects how wind moves around it. Sharp corners, flat sides, and tall narrow shapes can all change wind forces. Engineers test building models in wind tunnels to see how air flows around them." },
          { type: "paragraph", text: "Sometimes they round corners, add openings, or change the shape to reduce wind pressure. A skyscraper's shape is not just about looking cool. It is also about handling forces." },
        ] },
        { title: "Try This: Paper Tower Test", blocks: [
          { type: "paragraph", text: "Build two towers out of paper. Make one very stiff and straight. Make another with a little flexibility. Gently blow on them or push the table slightly. Which one falls first? Which one bends and recovers?" },
          { type: "callout", title: "What Engineers Study", accent: "purple", text: "This is a simple version of what engineers study with real buildings. The question is not just 'will it stand?' It is 'how will it behave when the wind or ground pushes on it?'" },
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
      readTime: common.en.minutes.m6,
      authorId: "noah",
      image: "/images/blog/The engineering behind a soccer ball.webp",
      imageAlt: "A modern match soccer ball showing its panel design and surface texturing",
      imageCaption: "Modern soccer balls are precision-engineered systems. Every layer, panel shape, and surface texture is designed to optimize flight, energy transfer, and aerodynamic stability.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-your-first-design-is-usually-not-your-best-one", label: "Read next: why your first design is usually not your best one" },
      endingRelatedSlug: "why-your-first-design-is-usually-not-your-best-one",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Modern soccer balls are precision-engineered to optimize aerodynamics, energy transfer, and flight stability. Gone are the heavy, water-absorbing leather balls of the past. Today's soccer balls rely on complex materials science, advanced panel geometry, and high-tech manufacturing to deliver consistent performance on the pitch." },
        ] },
        { title: "The 4-Layer Anatomy", blocks: [
          { type: "paragraph", text: "A standard, high-quality match ball consists of four distinct layers, each engineered for a specific function:" },
          { type: "list", items: [
            "Bladder: The innermost layer, usually made of synthetic butyl or latex rubber, holds the air and maintains internal pressure. Butyl bladders offer superior air retention, while latex provides a softer touch and better rebound.",
            "Lining: Wrapped around the bladder are layers of polyester and cotton woven fabrics. This lining determines the ball's strength, helps it retain its spherical shape over thousands of kicks, and softens the impact.",
            "Foam Cushioning: A layer of polyurethane (PU) or ethylene-vinyl acetate (EVA) foam sits beneath the outer casing. When a player strikes the ball, this layer compresses and springs back, transferring maximum energy for higher velocity shots.",
            "Casing: The outermost layer is made of durable synthetic leather (polyurethane). It resists water absorption so the ball does not get heavy in the rain, and features specialized texturing to grip the air properly.",
          ] },
        ] },
        { title: "Panel Design and Aerodynamics", blocks: [
          { type: "paragraph", text: "The most visually striking change in soccer ball engineering over the past two decades has been the evolution of the panels. Traditional balls, like the classic 32-panel design, had numerous seams that created high drag. Modern match balls use just 6 to 8 thermally-bonded panels, significantly reducing total seam length and drag." },
          { type: "paragraph", text: "Instead of stitching, the panels are bonded using heat or high-frequency glue, making the ball virtually seamless and watertight. Engineers use Computational Fluid Dynamics (CFD), the same simulation software used to design aircraft, to model how air moves over the ball's surface. The textured patterns on the outer shell are not decorative: they control the airflow boundary layer, helping the ball fly straighter at high speeds and move more predictably when spinning." },
        ] },
        { title: "Dynamic Balance and the Magnus Effect", blocks: [
          { type: "paragraph", text: "A perfectly designed ball must pass the test of dynamic balance, meaning its mass is distributed evenly so it rotates smoothly through the air without wobbling. When a player strikes the ball off-center, this smooth weight distribution allows it to spin cleanly." },
          { type: "paragraph", text: "That spin triggers the Magnus effect. As the ball rotates, one side of its surface moves with the surrounding airflow while the other moves against it. This creates a pressure difference on either side of the ball, which generates a sideways force that physically curves the ball's trajectory. This is the physics behind every bending free kick and curling corner you have ever seen." },
          { type: "callout", title: "The Magnus Effect in Action", accent: "purple", text: "Strike a ball off-center and it spins. The spinning surface drags air faster on one side than the other, creating uneven pressure. That pressure difference is a real physical force, the same principle that makes a curveball curve in baseball and a topspin shot dip in tennis." },
        ] },
        { title: "Embedded Technology", blocks: [
          { type: "paragraph", text: "Modern top-tier match balls are no longer just leather and air. They are smart. High-end balls feature Connected Ball Technology, housing an internal suspension system with advanced inertial measurement unit (IMU) sensors. These sensors track exact movement in three-dimensional space, communicating with optical tracking systems at 500 frames per second to provide real-time data on positioning, kick speed, and exact strike impact." },
          { type: "paragraph", text: "This data powers officiating technology like semi-automated offside detection and goal-line technology, which can determine within milliseconds whether a ball has fully crossed the line." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "A soccer ball is not just something you kick. It is a layered, precision-built system where materials science, fluid dynamics, and sensor technology all work together. Every great shot starts with engineering." },
        ] },
      ],
    },
    "why-manhole-covers-are-round": {
      title: "Why Are Manhole Covers Round?",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/blog/The engineering behind manhole covers.jpg",
      imageAlt: "A cast iron manhole cover set into city pavement, showing its circular shape and textured grip surface",
      imageCaption: "Manhole covers are round because a circle cannot fall through a hole of the same size, no matter how you rotate it.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-triangles-are-an-engineers-secret-weapon", label: "Read next: why triangles are an engineer's secret weapon" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "At first, a manhole cover sounds like a boring object. It is just a heavy metal lid in the street, right? Not exactly. Manhole covers are a famous engineering design because their shape solves several problems at once. So why are they usually round?" },
        ] },
        { title: "A Round Cover Cannot Fall Through Its Own Hole", blocks: [
          { type: "paragraph", text: "This is the classic reason. A circular cover cannot fall through a circular opening of the same size. No matter how you turn it, the circle's width stays the same." },
          { type: "paragraph", text: "But a square cover could fall through a square hole if you tilted it diagonally. The diagonal of a square is longer than its side, so the cover could slip in at the wrong angle. That would be dangerous for workers underground and for people above ground. A round cover helps prevent that problem." },
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
          { type: "paragraph", text: "Manhole covers need to handle cars, trucks, rain, snow, heat, cold, and years of use. The round shape helps spread weight evenly. The metal is usually textured on top so tires and shoes can grip it better. Even the pattern on top is designed; it is not just decoration." },
        ] },
        { title: "Try This: Shape Test", blocks: [
          { type: "paragraph", text: "Cut out a paper circle and a paper square. Draw matching holes on another piece of paper. Now try to rotate each cover over its matching hole. Which one can slip through if turned the wrong way? Which one always stays too wide to fall in?" },
          { type: "callout", title: "One Design, Many Solutions", accent: "purple", text: "This simple paper test shows why engineers like round covers. The shape is safe, strong, easy to move, and easy to replace all at once. That is great engineering: one solution that solves multiple problems." },
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
      readTime: common.en.minutes.m5,
      authorId: "logan",
      image: "/images/blog/The Engineering Behind Roller Coasters.webp",
      imageAlt: "A roller coaster with steep drops and loop-the-loops against a bright sky, showing the track design that keeps riders safely on board",
      imageCaption: "Roller coasters stay on the track because engineers design gravity, momentum, and multi-directional wheel systems to work together.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-airplane-wings-are-curved", label: "Read next: why airplane wings are curved" },
      endingRelatedSlug: "why-airplane-wings-are-curved",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Roller coasters look like they are breaking the rules. They climb huge hills, race downward, twist sideways, and sometimes go upside down. So how do they stay on the track? The answer is a mix of gravity, momentum, wheel design, and safety engineering." },
        ] },
        { title: "Gravity Starts the Ride", blocks: [
          { type: "paragraph", text: "Most roller coasters begin by climbing a big hill. A chain or launch system pulls the coaster up. At the top, the coaster has stored energy because it is high above the ground. This is called potential energy." },
          { type: "paragraph", text: "When the coaster drops, gravity pulls it downward. That stored energy turns into motion, called kinetic energy. That is why the first drop is so important. It gives the coaster speed for the rest of the ride." },
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
          { type: "callout", title: "Same Questions, Smaller Scale", accent: "purple", text: "You are doing the same kind of testing coaster engineers do, just on a smaller scale. Every time the marble flies off the track or stops early, that is data about what needs to change." },
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
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/blog/bridge-build.jpg",
      imageAlt: "Students constructing a popsicle stick bridge, testing joints and load distribution, the same structural principles that govern chairs",
      imageCaption: "Chairs and bridges share the same engineering problems: joints, load paths, and material choice determine whether they hold or fail.",
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
          { type: "paragraph", text: "Engineers choose materials based on cost, strength, comfort, weight, and appearance. The best chair uses the right material in the right place, not just the strongest material everywhere." },
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
      readTime: common.en.minutes.m6,
      authorId: "enqi",
      image: "/images/blog/the engineering behind water bottles.webp",
      imageAlt: "A clear plastic water bottle showing its ridged sides, threaded neck, and structural base design",
      imageCaption: "A disposable water bottle weighs a few grams but holds thousands of times its own weight in liquid. Every ridge, thread, and wall thickness is there for a reason.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/the-engineering-of-a-backpack", label: "Read next: the engineering of a backpack" },
      endingRelatedSlug: "the-engineering-of-a-backpack",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A single-use plastic water bottle seems like one of the simplest objects in the world. It holds water. You drink from it. Done. But from a materials science perspective, it is an engineering marvel." },
          { type: "paragraph", text: "Most disposable bottles weigh only a few grams, yet they can survive shipping, drops, squeezing, and pressure changes. Bottles made for carbonated drinks have to handle even more internal pressure. They also need to keep the water clean, seal tightly, feel easy to hold, and still be cheap enough to manufacture by the billions." },
          { type: "callout", title: "The Big Trade-off", accent: "purple", text: "The same design that makes single-use plastic bottles light, strong, and inexpensive also creates serious waste and possible plastic exposure concerns." },
        ] },
        { title: "The Engineering Feat", blocks: [
          { type: "paragraph", text: "The most common plastic used for disposable water bottles is polyethylene terephthalate, or PET. PET is clear, lightweight, moldable, and strong for its weight. That combination lets manufacturers make walls that are extremely thin without making the bottle uselessly fragile." },
          { type: "numbered", items: [
            { title: "Lightweight and strong", body: "A PET bottle can hold thousands of times its own weight in liquid. The plastic is stretched and shaped so the long polymer chains line up in ways that improve strength." },
            { title: "Thin but pressure-aware", body: "Ridges, curves, shoulders, and base shapes help the bottle resist crumpling. Carbonated bottles use especially careful geometry because trapped gas pushes outward on every wall." },
            { title: "Fast to manufacture", body: "Industrial machines heat small PET preforms, blow them into bottle molds, fill them, cap them, and label them at extremely high speed. That is one reason packaged drinking water became so widely available." },
          ] },
        ] },
        { title: "The Shape Is Not Random", blocks: [
          { type: "paragraph", text: "Water bottles need to be easy to hold, easy to pack, and strong enough not to collapse. Some bottles have grooves or curves in the middle. These make the bottle easier to grip, especially if your hands are wet." },
          { type: "paragraph", text: "The shape also affects how the bottle handles pressure. A completely smooth, thin bottle might crumple too easily. Ridges can make the bottle stronger without adding much extra plastic. That means the bottle can use less material while still doing its job." },
        ] },
        { title: "The Physics of the Cap", blocks: [
          { type: "paragraph", text: "Look closely at the top of a screw-on bottle. You will see spiral ridges. These are called threads. The cap has matching threads inside. When you twist the cap, the threads pull the cap downward onto the bottle." },
          { type: "paragraph", text: "That downward force compresses a tiny sealing surface near the opening. The goal is a hermetic lock: a seal tight enough to help prevent leaks, carbonation loss, and contamination from outside air or bacteria." },
          { type: "paragraph", text: "That tiny twist design is a simple machine. It turns your twisting motion into downward force. More force with less effort is what simple machines do." },
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
        { title: "The Trade-offs and Health Concerns", blocks: [
          { type: "paragraph", text: "Engineering success does not mean there are no problems. Single-use plastic bottles create environmental costs, and scientists are still studying what tiny plastic particles may mean for human health." },
          { type: "numbered", items: [
            { title: "Microplastic and nanoplastic particles", body: "Advanced microscopy studies have found that bottled water can contain far more tiny plastic particles than older methods could count. A Columbia and Rutgers research team reported an average of about 240,000 detectable plastic fragments per liter in tested bottled water, most of them nanoplastics." },
            { title: "Cap friction", body: "Opening and closing a bottle cap creates friction between plastic threads. Peer-reviewed research has shown that this cap-and-bottle interaction can generate additional microplastic particles." },
            { title: "Chemical leaching", body: "Heat, sunlight, long storage, or reusing a bottle designed for one use can increase concern about plastic breakdown and chemical additives moving into the water. The exact health effects of microplastics and nanoplastics are still being studied." },
            { title: "Environmental impact", body: "PET is technically recyclable, but many single-use bottles are not actually recycled. Bottles that become litter can persist for a very long time in landfills, waterways, and oceans." },
          ] },
          { type: "callout", title: "Engineering Means Trade-offs", accent: "purple", text: "A disposable bottle is brilliant at being light, sealed, strong, and cheap. It is much worse at disappearing after you are done with it." },
        ] },
        { title: "How to Reduce Plastic Exposure", blocks: [
          { type: "paragraph", text: "You do not need to panic or stop drinking water from a plastic bottle when it is the safe option available. But if you want to reduce everyday plastic exposure, there are simple swaps." },
          { type: "list", items: [
            "Use a glass or stainless steel bottle for daily hydration.",
            "Avoid leaving single-use plastic bottles in hot cars or direct sunlight.",
            "Do not repeatedly reuse bottles designed for one-time use.",
            "Use a certified home water filter if your local tap water is safe but you want extra treatment.",
            "Recycle PET bottles when local recycling accepts them, and choose refill stations when possible.",
          ] },
        ] },
        { title: "Try This: Bottle Design Test", blocks: [
          { type: "paragraph", text: "Compare two different bottles: one disposable bottle and one reusable bottle if you have both. Look at cap shape, grip texture, bottom design, wall thickness, opening size, how easy it is to squeeze, how stable it is when standing, and how easy it would be to clean." },
          { type: "callout", title: "No Perfect Answer", accent: "purple", text: "There is no single right answer here. A hiking bottle prioritizes durability. A kid's bottle prioritizes grip and spill resistance. A disposable bottle prioritizes cost and weight. Recognizing those trade-offs is what engineers do." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "A water bottle is not just a container. It is a small engineering project. It needs to hold liquid, prevent leaks, fit your hand, stand upright, survive drops, and use materials wisely. It also reminds us that engineering decisions have consequences after a product leaves our hands." },
          { type: "paragraph", text: "The next time you take a drink, look at the bottle for a second. Even something ordinary can be full of hidden engineering and hidden trade-offs." },
        ] },
      ],
    },
    "can-ai-actually-think": {
      title: "Can AI Actually Think?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/can artifical intelligence think Medium.jpeg",
      imageAlt: "An abstract visualization of artificial intelligence, with a digital brain or neural network pattern representing machine learning and pattern recognition",
      imageCaption: "AI can recognize patterns and generate answers, but that is different from thinking the way humans do. It predicts; it does not understand.",
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
          { type: "paragraph", text: "Now imagine you ask: 'Write a funny story about a fish riding a bicycle.' AI might write one. It can switch from fact mode to story mode because it recognizes what kind of answer you are asking for. That is useful, but it also means you need to be clear with AI. The way you ask changes the kind of answer you get." },
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
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/Why AI can get things wrong.jpg",
      imageAlt: "A visual representation of AI producing an incorrect or confused output, illustrating the concept of AI hallucination and error",
      imageCaption: "AI does not know things the way people do. It predicts, and sometimes its predictions are confidently wrong.",
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
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/How an Iphone recognizes your face.jpg",
      imageAlt: "An iPhone screen showing the Face ID setup interface with a face scan in progress, illustrating how the phone maps facial geometry",
      imageCaption: "Face ID maps thousands of points on your face and compares them to a stored 3D model, using the same kind of pattern recognition at the heart of modern AI.",
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
          { type: "paragraph", text: "Autocorrect does not have experiences. It does not know what a dog feels like, what a joke means, or why your friend's name is spelled a certain way. It only sees letters, words, and patterns. That is why autocorrect might change a word that was actually correct. It does not understand your intention. It just thinks another word is more likely." },
        ] },
        { title: "Names and Slang Can Confuse Autocorrect", blocks: [
          { type: "paragraph", text: "Names are one of autocorrect's biggest challenges. Maybe your friend has a name with an uncommon spelling. Maybe your town, school, or team name is not in the phone's dictionary. Autocorrect may try to 'fix' it into a more common word, even though the name was correct." },
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
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/When happens when you ask AI a question.png",
      imageAlt: "A student at an Avanza STEM AI workshop typing a question and reading the AI's response",
      imageCaption: "What happens between your question and the AI's answer is more interesting than it looks. It is all about prompts, patterns, and prediction.",
      imageFit: "contain",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-is-ai-actually-doing-when-it-answers-you",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "When you ask AI a question, it can feel like talking to a super-smart robot. You type 'Why is the sky blue?' and a few seconds later, you get an answer. But what actually happened between your question and the response?" },
          { type: "paragraph", text: "AI does not open a tiny brain and think like a person. It follows a process based on prompts, training, patterns, and prediction. Let's break it down." },
        ] },
        { title: "Step 1: You Give AI a Prompt", blocks: [
          { type: "paragraph", text: "A prompt is the question, instruction, or message you give to AI. A prompt can be simple, like 'Explain gravity,' or more specific: 'Explain gravity to a 3rd grader using a playground example.'" },
          { type: "callout", accent: "teal", text: "The second prompt usually gives a better answer because it tells AI what kind of response you want. Prompts are like instructions to a teammate. The clearer your instructions, the better the result." },
        ] },
        { title: "Step 2: AI Breaks Down Your Words", blocks: [
          { type: "paragraph", text: "AI looks at your prompt and breaks it into smaller pieces. It pays attention to the words, the order of the words, and the patterns those words create." },
          { type: "paragraph", text: "For example, if you ask 'Explain photosynthesis for kids,' the AI notices: 'Explain' means you want a teaching answer. 'Photosynthesis' is the topic. 'For kids' means the answer should be simple and clear. AI uses those clues to decide what kind of response to create." },
        ] },
        { title: "Step 3: AI Uses What It Learned During Training", blocks: [
          { type: "paragraph", text: "Before AI can answer questions, it has to be trained. Training means the AI system studies huge amounts of examples: text, questions, answers, explanations, stories, code, and other kinds of information." },
          { type: "paragraph", text: "During training, AI does not memorize everything. Instead, it learns patterns: which words often go together, how questions are usually answered, how explanations are structured, what facts are commonly connected, and what different writing styles look like. That training helps AI respond when you ask something new." },
        ] },
        { title: "Step 4: AI Predicts a Response", blocks: [
          { type: "paragraph", text: "AI creates answers by predicting what should come next. It does not pull a finished answer out of a drawer. It builds the response piece by piece. If you ask 'Why do plants need sunlight?' the AI might predict that a good answer should mention energy, food, leaves, and photosynthesis." },
          { type: "paragraph", text: "This is why AI can explain topics in many different ways. It can create a short answer, a long answer, a poem, a story, a quiz, or a step-by-step guide depending on your prompt." },
        ] },
        { title: "Step 5: The Answer Appears", blocks: [
          { type: "paragraph", text: "After the AI predicts and builds the response, you see the answer on your screen. It may look smooth and confident, but it is still important to remember how it was made." },
          { type: "paragraph", text: "AI is not a person who lived through experiences, checked a textbook, and thought carefully about what matters. It is a tool that uses patterns to generate a response. That response might be helpful, or it might need checking." },
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
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/should kids trust what ai says.jpg",
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
          { type: "callout", accent: "teal", text: "Smart AI users do not believe everything. They think, check, and ask questions. Use AI like a tool, not like the boss of your brain." },
        ] },
      ],
    },
    "how-do-video-games-use-ai": {
      title: "How Do Video Games Use AI?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/how video games use AI.webp",
      imageAlt: "A video game scene with characters and environments driven by AI behavior rules that control movement and decision-making",
      imageCaption: "Game AI is not the sci-fi kind. It is a rulebook that tells characters when to chase, flee, patrol, or react to a player.",
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
          { type: "paragraph", text: "One common use of AI in games is enemy movement. Imagine a maze game where a monster tries to find you. The monster needs to move through the maze without getting stuck. Game designers can use algorithms, or step-by-step sets of instructions, to help enemies navigate." },
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
      readTime: common.en.minutes.m4,
      authorId: "liam",
      image: "/images/blog/artificial intelligence vs robots.webp",
      imageAlt: "A graphic comparing a physical robot on one side with an AI brain or neural network on the other, showing they are different things",
      imageCaption: "A robot is a physical machine. AI is software that learns patterns. They are different things, and they do not always come together.",
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
          { type: "paragraph", text: "Motors help robots move. A motor can spin wheels, lift an arm, open a claw, or turn a joint. If sensors are like a robot's senses, motors are like its muscles. But motors do not decide anything by themselves; they need instructions." },
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
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/blog/how robots know where they are.jpg",
      imageAlt: "A robot using cameras and sensors to scan and map its surrounding environment for navigation",
      imageCaption: "Robots build a picture of their surroundings using cameras, lidar, and mapping software, then constantly update it as they move.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: build your first LEGO robot" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-makes-a-robot-a-robot",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Imagine you are walking through your school with your eyes closed. You might take a few steps, but pretty quickly you would run into a wall, a desk, or maybe someone's backpack. To move safely, you need clues about where you are." },
          { type: "paragraph", text: "Robots have the same problem. A robot does not automatically know where it is. It has to figure that out using sensors, cameras, wheels, maps, and math. The basic idea is simple: a robot collects clues from the world around it, then uses those clues to make its best guess about where it is and where it should go next." },
        ] },
        { title: "Robots Need Senses Too", blocks: [
          { type: "paragraph", text: "Humans use senses like sight, hearing, touch, and balance. Robots use sensors, tools that help a robot notice something about the world. Some detect distance. Others see objects, measure speed, or figure out direction." },
          { type: "list", items: [
            "Cameras: to see walls, roads, people, signs, or obstacles",
            "Wheels: to measure how far the robot has traveled",
            "GPS: to estimate location outdoors",
            "Lidar: to scan the area with laser light",
            "Ultrasonic sensors: to bounce sound waves off objects",
            "Gyroscopes: to sense turning or tilting",
          ] },
          { type: "paragraph", text: "Each sensor gives the robot a piece of the puzzle. A camera might show a doorway. A wheel sensor might say the robot has moved five feet. A distance sensor might detect a wall nearby. The robot combines those clues to understand its position." },
        ] },
        { title: "Counting Wheel Turns", blocks: [
          { type: "paragraph", text: "One simple way a robot can guess where it is is by counting how much its wheels turn. If a robot starts at the classroom door and its wheels roll forward ten feet, it can estimate that it is now ten feet from the start. This is called odometry, a little like counting your steps." },
          { type: "callout", accent: "green", text: "What if the wheel slips? What if the floor is uneven? Even a tiny measurement error can grow bigger over time. That is why robots usually rely on more than one sensor." },
        ] },
        { title: "Using Cameras Like Eyes", blocks: [
          { type: "paragraph", text: "Some robots use cameras to recognize what is around them. A robot vacuum notices furniture legs and walls. A self-driving car sees lane lines, traffic lights, and pedestrians. A Mars rover uses cameras to study rocks and avoid dangerous ground." },
          { type: "paragraph", text: "But a camera does not understand the world the way a human does. When you see a chair, you instantly know it is a chair. A robot sees the image as data. It has to process shapes, colors, edges, shadows, and patterns before it can decide what it is looking at. Lighting changes. Objects overlap. A chair looks different from the front, side, and back. A robot has to be trained to handle all of those possibilities." },
        ] },
        { title: "Building a Map", blocks: [
          { type: "paragraph", text: "Some robots make maps as they move. A robot vacuum might start in a room and slowly learn where the walls, furniture, and open spaces are. It can then use that map to clean more efficiently instead of bumping around randomly." },
          { type: "paragraph", text: "This is similar to what happens when you explore a new building. At first you do not know where anything is. After walking around, you start to remember: the stairs are near the entrance, the gym is down the hall, the library is around the corner. Robots build maps too, but they do it with sensors and computer programs." },
          { type: "callout", accent: "green", text: "Some robots try to build a map and figure out where they are inside that map at the same time, asking two questions at once: where am I, and what does this place look like?" },
        ] },
        { title: "Why Robots Still Get Lost", blocks: [
          { type: "paragraph", text: "Even smart robots can get confused. A robot might get lost if its wheels slip, a sensor gives a bad reading, the room changes, furniture gets moved, the lighting goes dark, something blocks the camera, or two hallways look almost the same." },
          { type: "paragraph", text: "That is why robots check their location again and again. They do not make one guess and trust it forever. They keep updating their estimate as new information comes in, a lot like how you check a map, look at the signs, and look around while walking through a museum." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Robots know where they are by collecting clues. They use sensors like cameras, wheels, GPS, lasers, and motion detectors, then combine those clues to estimate their location, build maps, avoid obstacles, and decide where to go next." },
          { type: "callout", accent: "green", text: "The next time you see a robot moving through a space, remember: it is not just rolling. It is sensing, guessing, checking, and adjusting over and over again. That is how robots find their way." },
        ] },
      ],
    },
    "why-robots-are-bad-at-easy-human-tasks": {
      title: "Why Robots Are Bad at Easy Human Tasks",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/blog/why robots are bad a simple human tasks.avif",
      imageAlt: "A robot struggling to perform a simple physical task that a human would do effortlessly without thinking",
      imageCaption: "Tasks that take a person a fraction of a second, like picking up a crumpled shirt, can take robots years of engineering to approximate.",
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
          { type: "paragraph", text: "Your brain and body are doing amazing things all the time, even when you do not notice. When you pick up a pencil, you instantly know where it is, how heavy it probably is, how hard to grip it, and how to move your fingers around it, even if it is sideways, under a notebook, or partly hanging off the table." },
          { type: "paragraph", text: "A robot has to figure all of that out step by step. First it has to see the pencil. Then it has to understand the pencil is separate from the table. Then it has to decide where to grab it. Then it has to move its arm without knocking anything over. Then it has to squeeze hard enough to hold the pencil but not so hard that it breaks it. That is a lot." },
          { type: "callout", accent: "green", text: "Humans make gripping look easy because we have had years of practice using our eyes, hands, muscles, and brains together. Robots have to learn all of that from scratch." },
        ] },
        { title: "Soft Things Are Hard", blocks: [
          { type: "paragraph", text: "Robots often struggle with soft, floppy objects. Laundry is a perfect example. A shirt does not keep one shape. It bends, wrinkles, twists, and collapses. A towel can fold over itself. A sock can hide inside another sock." },
          { type: "paragraph", text: "Hard objects are usually easier for robots. A metal block stays the same shape. A plastic box has clear edges. A cup has a predictable form. But cloth changes shape every time it moves. A robot cannot simply memorize one shirt shape. It has to understand how fabric behaves, which is very difficult." },
        ] },
        { title: "Opening Doors Is Not That Simple", blocks: [
          { type: "paragraph", text: "Think about how many different doors exist. Some have round knobs. Some have handles. Some slide. Some push. Some pull. Some are heavy. Some are light. Some stick. Some close automatically." },
          { type: "paragraph", text: "A human can look at most doors and quickly understand what to do. A robot has to detect the handle, understand how it moves, position its gripper correctly, apply the right force, and move backward or forward while opening it. If it pulls when it should push, it fails. If it grips the handle at the wrong angle, it fails. A task that takes you two seconds can become a major engineering challenge." },
        ] },
        { title: "The World Does Not Stay Still", blocks: [
          { type: "paragraph", text: "Factory robots are very good at repeating the same movement because their environment is controlled. A car part arrives in the same place every time. The robot arm moves in the same pattern. Homes, schools, and outdoor spaces are completely different." },
          { type: "paragraph", text: "Objects move around. A backpack might be on the floor one day and on a chair the next. A toy might be upside down. Robots have to handle surprises. Humans are excellent at this. If your pencil rolls under a chair, you can bend down, move the chair, reach around a backpack, and grab it without reprogramming. Robots are getting better at surprises, but it is still one of the biggest challenges in robotics." },
        ] },
        { title: "Picking Things Up Takes Judgment", blocks: [
          { type: "paragraph", text: "When humans pick something up, we automatically adjust our grip. You do not hold an egg the same way you hold a hammer. You do not grab a paper cup the same way you grab a baseball. You use different pressure, finger positions, and movements." },
          { type: "paragraph", text: "If a robot grips too softly, the object falls. If it grips too hard, the object breaks. If it grabs the wrong part, the object slips. This is especially hard when objects are shiny, clear, soft, tiny, heavy, oddly shaped, or moving. That is why robot hands and grippers are such an important area of engineering." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Robots are amazing, but the world humans live in is complicated. Tasks that feel easy to us are often hard for robots because humans are incredibly good at sensing, balancing, touching, adjusting, and learning from experience." },
          { type: "callout", accent: "green", text: "The next time you fold a shirt, open a door, or pick up a snack, you are doing something a robot might find very difficult. Your brain and hands are engineering masterpieces." },
        ] },
      ],
    },
    "what-makes-a-robot-a-robot": {
      title: "What Makes a Robot a Robot?",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m4,
      authorId: "noah",
      image: "/images/blog/what is a robot.webp",
      imageAlt: "A robot with visible sensors, motors, and articulated joints illustrating the three core components: sense, process, act",
      imageCaption: "A robot needs to sense its environment, process that information, and take physical action. All three together define what makes a machine a robot.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: build your first LEGO robot" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "how-do-robots-know-where-they-are",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Is a toaster a robot? What about a remote-control car? A vending machine? A smart speaker? A robot vacuum?" },
          { type: "paragraph", text: "The word robot gets used a lot, but not every machine is a robot. A robot is a machine that can sense the world, make decisions, and take action. That means most robots have three important parts: sensors, a controller, and actuators. In simpler words: a robot notices things, thinks through instructions, and moves or does something." },
        ] },
        { title: "Part 1: Sensors Help Robots Notice", blocks: [
          { type: "paragraph", text: "Robots need information about the world around them. That information comes from sensors, devices that detect something." },
          { type: "list", items: [
            "Light", "Distance", "Sound", "Touch", "Temperature", "Movement", "Direction", "Color", "Pressure",
          ] },
          { type: "paragraph", text: "A robot vacuum uses sensors to detect walls, stairs, furniture, and dirt. A self-driving car uses cameras and other sensors to detect roads, signs, cars, and people. A robotic arm in a factory might use sensors to know whether a part is in the right place. Without sensors, a robot would be like a person trying to navigate with no sight, hearing, or touch." },
        ] },
        { title: "Part 2: Controllers Help Robots Decide", blocks: [
          { type: "paragraph", text: "The controller is the robot's decision center. It is not a brain like a human brain, but it is the part that runs instructions, which might be simple or very advanced." },
          { type: "paragraph", text: "A simple robot might follow a rule like: if the sensor detects a wall, turn left. A more advanced robot might use a camera, map, and computer program to decide the safest path through a room. Controllers can be tiny computers, circuit boards, or powerful processors. They take sensor information and decide what the robot should do next." },
          { type: "callout", accent: "green", text: "Sense. Decide. Act. That loop repeats again and again, and it is one of the most important ideas in all of robotics." },
        ] },
        { title: "Part 3: Actuators Help Robots Move", blocks: [
          { type: "paragraph", text: "An actuator is the part of a robot that makes movement happen. Motors are one common type. They can spin wheels, move arms, turn gears, open grippers, or rotate joints." },
          { type: "paragraph", text: "A robot arm in a factory might have several motors, one for each joint. A robot hand might have tiny motors or cables to move its fingers. A drone uses motors to spin propellers and stay in the air. Without actuators, a robot could sense and decide, but it could not do anything physical." },
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
          { type: "callout", accent: "green", text: "Sense. Decide. Act. That loop is what makes robotics so powerful and so interesting." },
        ] },
      ],
    },
    "how-mars-rovers-drive-without-a-driver": {
      title: "How Mars Rovers Drive Without a Driver",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/blog/mars rover without driver.jpg",
      imageAlt: "A Mars rover navigating rocky red terrain on the Martian surface with no human driver, guided entirely by onboard cameras and software",
      imageCaption: "Mars rovers drive themselves because a signal from Earth takes up to 24 minutes one way. There is no time for a human to react to obstacles.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: build your first LEGO robot" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "design-a-mars-rover-out-of-cardboard",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "There are robots driving on Mars. Mars rovers are robotic explorers that move across the surface of another planet, study rocks, take pictures, and help scientists learn. And there is no driver sitting behind a steering wheel, no astronaut nearby with a remote control." },
          { type: "paragraph", text: "So how does a Mars rover drive? The answer involves space, cameras, wheels, planning, and a lot of patience." },
        ] },
        { title: "Mars Is Very Far Away", blocks: [
          { type: "paragraph", text: "Mars is millions of miles from Earth. Because of that distance, messages between Earth and Mars take time to travel. Even though radio signals move extremely fast, they are not instant. Depending on where Earth and Mars are in their orbits, a message can take several minutes to reach Mars." },
          { type: "paragraph", text: "That means scientists cannot drive a Mars rover like a video game car. If a rover starts rolling toward a rock, engineers on Earth cannot instantly press a button to stop it. By the time the command arrives, the rover might already be in trouble." },
        ] },
        { title: "The Rover Gets Instructions", blocks: [
          { type: "paragraph", text: "Mars rovers do not usually wake up and randomly decide where to go. Teams of scientists and engineers on Earth study images and data from the rover. They look at the landscape and choose interesting targets, such as rocks, soil, hills, or flat paths." },
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
          { type: "paragraph", text: "Mars rovers can use autonomous navigation, meaning the robot can handle some tasks by itself. Engineers might tell the rover to drive toward a point. As it moves, the rover uses its cameras to check for obstacles. If it sees a dangerous rock or slope, it can adjust its path or stop." },
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
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/blog/robot hands.jpg",
      imageAlt: "A mechanical robotic hand showing its articulated finger joints and sensors, attempting to replicate the versatility of a human hand",
      imageCaption: "A human hand can grip a grape without crushing it and a barbell without dropping it. Replicating that range in a robot is one of engineering's hardest problems.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM workshop" },
      endingSecondary: { href: "/blog/how-factory-robots-build-cars", label: "Read: how factory robots build cars" },
      endingRelatedSlug: "how-factory-robots-build-cars",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Look at your hand for a second. Open it. Close it. Wiggle your fingers. Touch your thumb to each fingertip. Pick up a pencil. Tap the table. Hold something gently. Your hand is doing something incredible." },
          { type: "paragraph", text: "Human hands are one of the hardest things for engineers to copy. Robot hands may look cool, but making them work like real hands is extremely difficult. Hands are not just simple grabbers; they are flexible, sensitive, strong, gentle, and controlled by a powerful brain." },
        ] },
        { title: "Fingers Are Complicated", blocks: [
          { type: "paragraph", text: "A human hand has many moving parts. Each finger has joints. Your thumb can move in a special way that lets it touch your other fingers. Your wrist can turn, bend, and adjust. All these parts work together so you can grab objects from different angles." },
          { type: "paragraph", text: "A robot hand needs mechanical parts to copy those movements: joints, motors, gears, cables, materials, and control systems. Even moving one finger smoothly can be difficult. Moving five fingers together in a useful way is much harder." },
        ] },
        { title: "Grip Strength Is Tricky", blocks: [
          { type: "paragraph", text: "When you pick something up, your hand automatically chooses how hard to squeeze. You hold a potato chip gently. You hold a heavy backpack strap firmly. You hold a pencil somewhere in between." },
          { type: "paragraph", text: "A robot has to learn this. If it squeezes too hard, it might crush something. If it squeezes too lightly, the object might slip. If it grabs the wrong part, the object might twist or fall. This is especially hard because objects have different shapes, sizes, weights, and textures. A smooth glass cup is different from a fuzzy tennis ball. A squishy sponge is different from a metal spoon." },
        ] },
        { title: "Touch Matters", blocks: [
          { type: "paragraph", text: "Your hand is covered in touch sensors. You can feel pressure, texture, temperature, slipping, and pain. If a cup starts sliding out of your hand, you feel it almost instantly and grip harder." },
          { type: "paragraph", text: "Robot hands need touch sensors too, but copying human touch is very difficult. A robot needs to know: am I touching the object? How hard am I pressing? Is the object slipping? Is it soft or hard? Am I about to break it? Without that feedback, a robot hand has to guess, and guessing can lead to dropped or broken objects." },
        ] },
        { title: "Human Hands Are Good at Weird Objects", blocks: [
          { type: "paragraph", text: "Human hands can pick up all kinds of things: a coin, a sandwich, a water bottle, a shoelace, a basketball, a crumpled piece of paper. These objects do not all have the same shape. Some are small, some are large, some are soft, some are slippery, some change shape when you touch them." },
          { type: "paragraph", text: "Robot hands often work best when objects are predictable. If a robot is designed to pick up one kind of part in a factory, it can be very good at that job. But a general-purpose robot hand that can pick up almost anything? That is much harder." },
        ] },
        { title: "Robot Hands Do Not Always Need to Look Human", blocks: [
          { type: "paragraph", text: "The best robot hand is not always the one that looks most like a human hand. Some robots use simple grippers with two fingers. Others use suction cups. Some use soft rubber fingers that wrap around objects. Some use magnets for metal parts." },
          { type: "callout", accent: "green", text: "Engineers choose the design based on the job. A robot hand should match the problem it is trying to solve, not the shape of a human hand." },
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
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/blog/robots building cars assembly line.jpg",
      imageAlt: "Robotic arms on a car manufacturing assembly line welding and assembling vehicle body panels with precision",
      imageCaption: "Factory robots are not general-purpose. Each arm is precisely programmed for one specific task, executed thousands of times without variation.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM workshop" },
      endingSecondary: { href: "/blog/why-robot-hands-are-so-hard-to-make", label: "Read: why robot hands are so hard to make" },
      endingRelatedSlug: "why-robot-hands-are-so-hard-to-make",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Cars are huge machines made from thousands of parts: doors, seats, wheels, windows, wires, lights, engines or motors, and many hidden pieces most people never see. Building one takes a lot of work." },
          { type: "paragraph", text: "In modern car factories, robots help do many of the jobs that need speed, strength, accuracy, and repetition. These robots do not usually look like people. Many look like giant mechanical arms, moving with incredible precision." },
        ] },
        { title: "Factory Robots Are Great at Repetition", blocks: [
          { type: "paragraph", text: "Robots are very good at doing the same task again and again. That is useful in car manufacturing because many parts need to be placed, welded, painted, or moved in exactly the same way. A robot arm can repeat a motion thousands of times with very little variation. It does not get bored, lose focus, or forget the next step." },
          { type: "callout", accent: "green", text: "If a robot needs to weld the same spot on every car frame, it can move to that exact position each time, consistently, all day long." },
        ] },
        { title: "Welding the Car Body", blocks: [
          { type: "paragraph", text: "One major job factory robots do is welding, which joins metal pieces together using heat. Car bodies need to be strong and carefully assembled, and robotic welding arms can move quickly and accurately to spots that may be awkward for humans to access." },
          { type: "paragraph", text: "Engineers, technicians, and workers design, monitor, repair, program, and inspect the robotic systems. The robot does the repeated physical action, but humans make sure the whole process works." },
        ] },
        { title: "Painting With Precision", blocks: [
          { type: "paragraph", text: "Painting a car is not as simple as spraying color on metal. The paint needs to be smooth, even, and consistent. Too much paint can drip. Too little can leave weak coverage. Factory robots are often used for painting because they can move spray tools in controlled patterns, applying paint evenly across doors, hoods, roofs, and other surfaces." },
        ] },
        { title: "Moving Heavy Parts", blocks: [
          { type: "paragraph", text: "Some car parts are heavy. Robots can help lift, move, and position these parts safely. A robotic arm might move a door into place. Another system might carry parts along the assembly line. Lifting heavy parts over and over can be tiring or dangerous for humans, so robots help reduce strain and make the factory safer." },
        ] },
        { title: "Safety and Programming", blocks: [
          { type: "paragraph", text: "Factory robots can be powerful and fast, so safety is extremely important. Many industrial robots work inside safety zones with barriers, sensors, and warning lights. Some newer robots, called collaborative robots or cobots, are designed with extra safety features to work more closely with people." },
          { type: "paragraph", text: "A factory robot does not magically know how to build a car. It has to be programmed. Engineers tell the robot where to move, how fast, when to use a tool, how much force to apply, and what to do if something goes wrong. A car factory may have robots, conveyor belts, cameras, tools, and human workers all connected in a carefully planned process." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Factory robots help build cars by welding, painting, moving parts, and repeating precise tasks over and over. They are not usually human-shaped because they are designed for specific jobs. A welding robot looks different from a painting robot because each job needs different tools and movements." },
          { type: "callout", accent: "green", text: "The best engineering lesson from car factories: you do not design a robot to look cool. You design it to solve a problem. In car factories, robots help turn thousands of separate parts into machines that can drive down the road." },
        ] },
      ],
    },
    "why-is-the-sky-blue-but-sunsets-are-orange": {
      title: "Why Is the Sky Blue but Sunsets Are Orange?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/blog/blue and orange sky Medium.jpeg",
      imageAlt: "A sky transitioning from deep blue at the top to warm orange and pink near the horizon at sunset",
      imageCaption: "The same atmosphere that scatters blue light across the daytime sky redirects warmer wavelengths to your eyes at sunset.",
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
      readTime: common.en.minutes.m4,
      authorId: "liam",
      image: "/images/blog/ears pop on airplane.jpg",
      imageAlt: "A view from inside an airplane cabin during ascent, illustrating the pressure change that causes ears to pop",
      imageCaption: "Your eardrums flex when air pressure outside changes faster than your body can equalize it. That is the pop you feel during takeoff and landing.",
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
          { type: "paragraph", text: "Inside your ear is a thin piece of tissue called the eardrum. It vibrates when sound hits it, helping you hear. There is air on both sides of your eardrum: air outside your ear, and air behind the eardrum in your middle ear." },
          { type: "paragraph", text: "For your ear to feel normal, the pressure on both sides of the eardrum needs to be balanced. When the pressure outside your ear changes quickly, the pressure behind your eardrum may not change right away. That pressure difference can push or pull on your eardrum. That is the full, clogged, or uncomfortable feeling you get." },
        ] },
        { title: "The Eustachian Tube Helps Fix It", blocks: [
          { type: "paragraph", text: "Your body has a small tube called the Eustachian tube. It connects your middle ear to the back of your throat. Most of the time, this tube is closed. But when you swallow, yawn, or chew, it can open for a moment." },
          { type: "paragraph", text: "When it opens, air can move in or out of your middle ear. That helps balance the pressure on both sides of your eardrum. The pop you feel is the pressure suddenly evening out." },
        ] },
        { title: "Why Landing Can Feel Worse Than Takeoff", blocks: [
          { type: "paragraph", text: "Many people notice their ears more during landing than during takeoff. That is because during landing, the air pressure in the cabin increases as the plane gets closer to the ground. Your middle ear needs to let more air in to match the outside pressure." },
          { type: "paragraph", text: "If your Eustachian tubes do not open easily, your eardrums can feel squeezed inward. That can hurt more than the pressure change during takeoff. This is also why flying with a cold can be uncomfortable: if your nose and throat are stuffy, the Eustachian tubes may not open as easily." },
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
      readTime: common.en.minutes.m4,
      authorId: "noah",
      image: "/images/blog/metal vs wood.jpg",
      imageAlt: "Metal and wooden objects side by side at room temperature, illustrating that they feel different despite being the same temperature",
      imageCaption: "Metal and wood at the same temperature feel completely different because metal conducts heat away from your hand far faster. The sensation is speed, not temperature.",
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
      readTime: common.en.minutes.m5,
      authorId: "logan",
      image: "/images/blog/riding on bike balancing Medium.jpeg",
      imageAlt: "A person riding a bicycle in motion, demonstrating the balance and physics that keep two wheels stable while moving",
      imageCaption: "A moving bike resists tipping due to gyroscopic forces, steering geometry, and constant small corrections from your brain, all working together invisibly.",
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
          { type: "paragraph", text: "This is one reason bikes feel more stable when they are rolling. Riders also do this without thinking. You are constantly making tiny steering changes while biking. Most of them are so small that you do not notice. Your brain, arms, and body work together to keep the bike under you." },
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
          { type: "paragraph", text: "When a bike is still, it cannot steer itself back under the rider. If it starts tipping, gravity pulls it farther down. Without motion, there is no easy way for the wheels to move under the center of mass. So the bike falls unless something holds it up, such as a kickstand, a wall, a rider's foot, or training wheels." },
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
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/blog/why ice is so slippery.avif",
      imageAlt: "A close-up of an icy surface showing its smooth, glassy texture that drastically reduces friction underfoot",
      imageCaption: "Ice is slippery because a thin quasi-liquid layer on its surface reduces friction to near zero, so your shoes have almost nothing to grip.",
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
          { type: "paragraph", text: "Your shoe is not just touching rough solid ground. It may be sliding over a smooth icy surface with a tiny bit of water acting like a lubricant, something that reduces friction like oil in a machine." },
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
      readTime: common.en.minutes.m5,
      authorId: "liam",
      image: "/images/blog/how noise cancelling works.webp",
      imageAlt: "A pair of noise-canceling headphones with a diagram showing how anti-noise waves cancel incoming sound waves",
      imageCaption: "Noise-canceling headphones use a microphone to detect incoming sound, then play the exact opposite wave to cancel it before it reaches your ears.",
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
          { type: "paragraph", text: "A sound wave has high points and low points. You can imagine it like a wiggly line moving through the air. Loud sounds have bigger waves. Quiet sounds have smaller waves." },
        ] },
        { title: "Opposite Waves Can Cancel", blocks: [
          { type: "paragraph", text: "Here is the key idea: waves can add together, but they can also cancel each other. If one wave pushes air forward while another wave pulls air backward at the same moment, the two waves can partly cancel out." },
          { type: "paragraph", text: "Noise-canceling headphones use this idea. They try to create an opposite sound wave that matches the unwanted noise. When the unwanted sound and the opposite sound meet, they reduce each other. This is called destructive interference." },
        ] },
        { title: "The Headphones Listen First", blocks: [
          { type: "paragraph", text: "Noise-canceling headphones have tiny microphones. These microphones listen to the noise around you, such as the hum of an airplane engine or the rumble of a train. Then the headphones' electronics quickly analyze that sound and create a matching opposite wave. The speakers inside the headphones play that opposite wave near your ears." },
          { type: "paragraph", text: "Your ears receive less of the original noise because part of it has been canceled out." },
        ] },
        { title: "Why They Work Best With Steady Sounds", blocks: [
          { type: "paragraph", text: "Noise canceling works especially well on steady, repeating sounds like airplane engines, air conditioners, fans, and train rumbling. These sounds are easier for the headphones to predict and cancel because they do not change too suddenly." },
          { type: "paragraph", text: "Sharp or random sounds are harder. A dog bark, a clap, or someone suddenly shouting changes quickly. The headphones may reduce it a little, but they usually cannot erase it completely. That is why noise-canceling headphones make the world quieter, not perfectly silent." },
        ] },
        { title: "Passive vs. Active Noise Canceling", blocks: [
          { type: "paragraph", text: "There are two ways headphones reduce noise. Passive noise reduction comes from physically blocking sound; thick ear cushions can stop some outside noise from getting in. Active noise canceling uses microphones and opposite sound waves. Many headphones use both: the cushions block some sound, and the electronics cancel some sound." },
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
      readTime: common.en.minutes.m4,
      authorId: "enqi",
      image: "/images/blog/Why some things sink while other things float.png",
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
          { type: "paragraph", text: "The ship's total average density, including the air inside it, is less than the density of water. That lets it float. If water floods into the ship, the air spaces fill up. The ship becomes denser overall, and it can sink." },
        ] },
        { title: "Why Do Boats Have Wide Bottoms?", blocks: [
          { type: "paragraph", text: "Boats are designed to push enough water out of the way. A wider hull helps the boat displace more water. More displaced water means more upward buoyant force. That is why a canoe, cargo ship, and cruise ship all have shapes designed around buoyancy, even though they look very different. Engineers must think carefully about weight, shape, balance, and materials when designing anything that floats." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Things float when the upward buoyant force from the water can balance their weight. Density matters, but shape matters too." },
          { type: "callout", accent: "orange", text: "A small rock sinks because it is dense and does not displace enough water. A huge ship floats because its shape lets it push aside enough water to support its weight. Floating is not about being light. It is about weight, space, shape, and water pushing back." },
        ] },
      ],
    },
    "why-do-magnets-stick-to-some-metals-but-not-others": {
      title: "Why Do Magnets Stick to Some Metals but Not Others?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m5,
      authorId: "noah",
      image: "/images/blog/how magnets really work.jpg",
      imageAlt: "A magnet attracting iron filings that align to reveal the invisible magnetic field lines emanating from its poles",
      imageCaption: "Magnets stick to iron and steel because tiny magnetic domains inside those metals line up with the external field. In copper or aluminum, they cannot.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-do-some-things-float-and-others-sink", label: "Read next: why do some things float and others sink?" },
      endingRelatedSlug: "why-do-some-things-float-and-others-sink",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Magnets seem simple at first. They stick to a refrigerator, grab paper clips, and snap onto some metal surfaces. But then you try to stick one to aluminum foil, a copper penny, or a soda can, and nothing happens. So why do magnets stick to some metals but not others?" },
          { type: "paragraph", text: "The answer comes from the tiny particles inside materials." },
        ] },
        { title: "Magnets Have Invisible Fields", blocks: [
          { type: "paragraph", text: "A magnet creates an invisible magnetic field around itself. You cannot see the field directly, but you can see what it does: it can pull certain objects closer or make another magnet twist around. A magnetic field is strongest near the magnet's poles, usually called north and south." },
          { type: "paragraph", text: "Opposite poles attract. Like poles repel. That is why one side of a magnet may pull another magnet close, while the other side pushes it away." },
        ] },
        { title: "Not All Metals Are Magnetic", blocks: [
          { type: "paragraph", text: "Many people think metal automatically means magnetic, but that is not true. Iron is strongly magnetic. Steel is usually magnetic because it contains iron. Nickel and cobalt are also magnetic. But many common metals are not strongly attracted to magnets. Aluminum, copper, gold, silver, and brass usually do not stick to regular magnets. They are still metals. They just do not have the right magnetic behavior." },
        ] },
        { title: "Tiny Magnetic Regions", blocks: [
          { type: "paragraph", text: "Inside magnetic materials, there are tiny regions called domains. You can imagine domains like tiny groups of arrows. Each arrow points in a magnetic direction. In an ordinary piece of iron, many of these arrows point in different directions, so their effects partly cancel out." },
          { type: "paragraph", text: "But when a magnet comes near, many domains can line up. When enough of them point the same way, the material is attracted to the magnet. That is why a paper clip can stick to a magnet: the magnet helps line up tiny magnetic regions inside the metal." },
        ] },
        { title: "Why Doesn't Copper Stick?", blocks: [
          { type: "paragraph", text: "Copper has electrons, just like iron does, but its tiny magnetic effects do not line up in the same strong way. The structure of copper does not allow it to become strongly magnetic like iron. So a regular fridge magnet will not stick to copper. The same basic idea applies to aluminum, gold, and many other metals because their internal structure does not create strong magnetic attraction." },
        ] },
        { title: "What About Steel?", blocks: [
          { type: "paragraph", text: "Steel is mostly iron mixed with other elements, often carbon. Because it contains iron, many types of steel are magnetic. But not all steel behaves the same way. Some stainless steels are weakly magnetic or not very magnetic because their internal structure is different. That is why a magnet might stick strongly to one metal object but barely stick to another, even if both look like steel." },
        ] },
        { title: "Magnets Are Useful Because They Are Selective", blocks: [
          { type: "paragraph", text: "The fact that magnets stick to some metals and not others is actually useful. Recycling centers use magnets to separate iron and steel from other materials. Electric motors use magnetism to create motion. Speakers use magnets to turn electrical signals into sound. Compasses use Earth's magnetic field to point north. Magnetism is not just a refrigerator trick; it is part of how many machines work." },
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
    imageAlt: "Un kit de robótica LEGO preparado para una construcción de principiantes",
    imageCaption: "La robótica LEGO puede ser una buena introducción en casa a la ingeniería y la programación.",
    endingSecondary: { href: "/projects", label: "Explorar más proyectos STEM" },
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "La robótica LEGO combina ingeniería y programación al mismo tiempo. Los estudiantes ven motores girar, sensores reaccionar y código afectar el mundo real." },
        { type: "paragraph", text: "En una primera construcción de robótica, los estudiantes pueden pasar una sesión completa solo logrando que un robot avance en línea recta, y ese proceso de prueba y error suele ser el mejor aprendizaje del día." },
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
        { type: "quote", text: "El robot seguía dando vueltas, y resultó que una rueda estaba floja. Cuando lo descubrimos, sentimos que habíamos arreglado algo de verdad.", attribution: "Estudiante probando un proyecto de robótica LEGO" },
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
        { type: "ctaLink", title: "Construye tu Primer Robot", text: "Empieza con un proyecto guiado de LEGO SPIKE Prime que explica la construcción, la lógica del código y los pasos para solucionar problemas.", linkText: "Probar la guía del robot", href: "/projects/lego-robot-builder", accent: "green" },
      ] },
    ],
  },
  "what-is-ai-explaining-to-kids": {
    ...localizedBlogArticles.en["what-is-ai-explaining-to-kids"],
    title: "¿Qué Es la IA? Explicando Inteligencia Artificial a los Niños",
    category: "IA",
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
      { title: "El Problema de Representación y Por Qué Es Nuestra Responsabilidad", blocks: [
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
  "why-triangles-are-an-engineers-secret-weapon": {
    ...localizedBlogArticles.en["why-triangles-are-an-engineers-secret-weapon"],
    title: "¿Por Qué los Triángulos Son el Arma Secreta de los Ingenieros?",
    category: "Ingeniería",
    readTime: common.es.minutes.m5,
    imageAlt: "Estudiantes examinando un puente de paletas de madera completado en un taller de ingeniería de Avanza STEM",
    imageCaption: "Estudiantes en un taller de Avanza STEM inspeccionan un puente de celosía. Los triángulos en el diseño no son decorativos; son la razón por la que el puente soporta el peso.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "En los talleres de ingeniería de Avanza STEM, una de las preguntas más frecuentes cuando los estudiantes ven un puente resistente es: ¿por qué ese diseño funciona? La respuesta casi siempre vuelve a una misma figura: el triángulo." },
        { type: "paragraph", text: "Esto no es solo una regla que memorizar. Una vez que entiendes por qué los triángulos son tan especiales, comienzas a verlos en todas partes: en puentes, torres, marcos de bicicletas, techos y montañas rusas." },
      ] },
      { title: "El Problema con los Cuadrados", blocks: [
        { type: "paragraph", text: "Imagina construir un marco cuadrado con cuatro palitos y cinta adhesiva. Si empujas una esquina, el marco se inclina hacia un lado y se convierte en un rombo. Esto se llama deformación, y ocurre porque un cuadrado tiene cuatro uniones que pueden girar." },
        { type: "callout", title: "La Diferencia Clave", accent: "purple", text: "Un triángulo tiene tres lados y tres esquinas. No puedes cambiar la forma de un triángulo sin doblar o romper uno de sus lados. Eso es lo que lo hace rígido." },
        { type: "paragraph", text: "Por eso el cuadrado es la forma incorrecta para una estructura que soporte carga, y el triángulo es la correcta." },
      ] },
      { title: "Qué Pasa Cuando Agregas una Diagonal", blocks: [
        { type: "paragraph", text: "Aquí hay un truco que usa esta idea: toma un marco cuadrado y agrega un palito en diagonal por el centro. Ahora tienes dos triángulos, y la estructura se vuelve dramáticamente más resistente." },
        { type: "paragraph", text: "Ese palito adicional no solo refuerza el cuadrado. Lo divide en dos triángulos y el conjunto se vuelve rígido. En nuestros talleres de puentes de paletas, los estudiantes que agregan refuerzo diagonal notan una diferencia notable en cuánto peso aguanta el panel antes de fallar." },
        { type: "callout", accent: "purple", text: "La diferencia entre un marco débil y uno fuerte puede ser un solo palito diagonal. Esa es la idea completa detrás de la triangulación." },
      ] },
      { title: "Por Qué los Triángulos Aparecen en Todas Partes en la Ingeniería", blocks: [
        { type: "paragraph", text: "Una vez que entiendes las figuras rígidas, puedes ver los triángulos usados para dar fortaleza estructural en todas partes." },
        { type: "list", items: [
          "Puentes de celosía: el diseño clásico usa una secuencia de triángulos conectados para soportar la carga",
          "La Torre Eiffel: construida con celosías triangulares para que pueda flexionarse con el viento sin derrumbarse",
          "Marcos de bicicletas: un triángulo está incorporado en casi todos los cuadros de bicicleta",
          "Vigas del techo: la forma de «A» de un techo inclinado crea un triángulo resistente",
          "Grúas de construcción: el brazo usa una celosía triangular para soportar cargas enormes",
          "Montañas rusas: la estructura de soporte es triangulada para manejar cambios bruscos de dirección y el peso de los pasajeros",
        ] },
      ] },
      { title: "La Ciencia Detrás: Cómo las Fuerzas Se Mueven por los Triángulos", blocks: [
        { type: "numbered", items: [
          { title: "Los triángulos convierten las fuerzas en tensión y compresión", body: "Cuando una carga empuja hacia abajo sobre un triángulo, cada elemento queda en tensión (jalado) o compresión (apretado). No hay flexión, y la flexión es lo que rompe las cosas." },
          { title: "Cada lado de un triángulo comparte la carga", body: "Un marco cuadrado concentra el estrés en las esquinas. Un triángulo reparte la fuerza en los tres lados a la vez." },
          { title: "La forma permanece fija", body: "Mientras ningún elemento falle, el triángulo no puede cambiar de forma bajo carga. El cuadrado no puede decir lo mismo." },
        ] },
      ] },
      { title: "Inténtalo Tú Mismo", blocks: [
        { type: "paragraph", text: "No necesitas un laboratorio. Consigue cuatro paletas de madera y un poco de cinta adhesiva." },
        { type: "list", items: [
          "Haz un cuadrado: une cuatro paletas en los extremos con cinta. Empuja una esquina. Observa cómo se inclina.",
          "Agrega una quinta paleta en diagonal por el centro. Empuja la misma esquina. Observa cómo aguanta.",
          "Prueba hacer un triángulo con tres paletas. Compara qué tan estable se siente.",
          "Conecta varios triángulos en fila y ve qué puedes construir.",
        ] },
        { type: "callout", accent: "purple", text: "En nuestros talleres de puentes, los puentes más resistentes siempre son los construidos alrededor de una serie de triángulos conectados. Los estudiantes que entienden el porqué construyen mejores puentes, y saben qué corregir cuando uno falla." },
      ] },
      { title: "Qué Significa Esto para Tu Puente", blocks: [
        { type: "paragraphWithLink", before: "Si estás trabajando en un puente de paletas y quieres instrucciones paso a paso, nuestra ", linkText: "guía del proyecto de puente de paletas", href: "/projects/popsicle-stick-bridge", after: " explica cómo construir un puente de celosía completo usando estos principios." },
        { type: "ctaLink", title: "Construye un Puente de Celosía", text: "En nuestros talleres de ingeniería, los estudiantes construyen puentes de paletas y prueban cuánto peso puede soportar una celosía triangulada.", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "how-engineers-think-when-something-breaks": {
    ...localizedBlogArticles.en["how-engineers-think-when-something-breaks"],
    title: "Cómo Piensan los Ingenieros Cuando Algo Se Rompe",
    category: "Ingeniería",
    readTime: common.es.minutes.m4,
    imageAlt: "Estudiantes probando un puente fallido con libros durante un taller de ingeniería de Avanza STEM",
    imageCaption: "Una estructura que acaba de fallar no es una pérdida. Es información. Los estudiantes examinan dónde y por qué se rompió antes de pensar en la siguiente mejora.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "En los talleres de ingeniería de Avanza STEM, algo se rompe en casi todas las sesiones. Un puente colapsa bajo el peso. Una torre cae cuando se añade un bloque. Una estructura de cartón se vuelca. Y casi siempre, el estudiante que la construyó sabe exactamente qué salió mal en el momento en que sucede." },
        { type: "paragraph", text: "Ese momento de comprensión, «se rompió justo en la unión porque no la pegué bien», es el más importante de toda la sesión. No es un fracaso. Es información." },
        { type: "youtube", videoId: "xPp8R64YEHQ", title: "Cómo piensan los ingenieros cuando algo se rompe", caption: "Un vistazo rápido a la mentalidad que usan los ingenieros cuando un diseño falla." },
      ] },
      { title: "La Primera Pregunta que Hace un Ingeniero", blocks: [
        { type: "paragraph", text: "Cuando algo se rompe, la primera pregunta de ingeniería no es «¿qué hice mal?» Sino: «¿dónde se rompió y qué me dice eso?»" },
        { type: "paragraph", text: "Un puente que se parte por el centro te dice que el centro era el punto más débil. Una unión que se separa te dice que la conexión no era suficientemente resistente. La ruptura te está dando instrucciones para la próxima construcción." },
        { type: "callout", title: "Perspectiva de Ingeniería", accent: "purple", text: "Una estructura que se rompió es útil. Una estructura que nunca fue probada no te dice nada." },
      ] },
      { title: "El Ciclo de Mejora", blocks: [
        { type: "paragraph", text: "Los ingenieros usan un ciclo iterativo, a veces llamado ciclo de diseño. No es una línea recta desde la idea hasta el éxito. Se parece más a esto:" },
        { type: "numbered", items: [
          { title: "Define el objetivo", body: "¿Qué necesita hacer exactamente la estructura? ¿Sostener 2 kilos? ¿Cruzar 30 centímetros? ¿Pesar lo menos posible?" },
          { title: "Construye una primera versión", body: "No intentes que sea perfecta desde el primer intento. Hazla verificable." },
          { title: "Pruébala deliberadamente", body: "Aplica la carga o el estrés real. No adivines cómo lo hará." },
          { title: "Observa qué falló", body: "Nota no solo que falló, sino dónde y cómo. Ese detalle es el dato." },
          { title: "Haz un cambio a la vez", body: "Si cambias tres cosas y la siguiente versión es mejor, no sabes cuál de los cambios ayudó." },
          { title: "Prueba de nuevo", body: "Repite. Cada ronda te da más información que la anterior." },
        ] },
      ] },
      { title: "Cómo Se Ve Esto en los Talleres de Avanza STEM", blocks: [
        { type: "paragraph", text: "Durante las sesiones de construcción de puentes, los estudiantes generalmente construyen una vez y luego prueban su estructura. Esa sola prueba enseña mucho. Cuando el puente se dobla, tuerce o finalmente colapsa, los estudiantes pueden ver qué parte del diseño soportó más estrés." },
        { type: "paragraph", text: "El momento importante es la conversación después de la prueba: ¿dónde falló?, ¿por qué cedió ese punto?, ¿qué reforzarías si construyeras una segunda versión?" },
        { type: "callout", accent: "purple", text: "Incluso una sola construcción puede enseñar la mentalidad completa de ingeniería: diseña, prueba honestamente, estudia el resultado y explica qué cambiaría la próxima versión." },
      ] },
      { title: "La Regla del Único Cambio", blocks: [
        { type: "paragraph", text: "Esta regla importa más de lo que la mayoría de los estudiantes cree: cuando algo se rompe, cambia solo una cosa a la vez antes de la siguiente prueba." },
        { type: "paragraph", text: "Si un puente se rompe y lo reconstruyes con mejores uniones Y una forma de celosía diferente Y más refuerzo, aprendes muy poco. Quizás sostiene más peso, pero no sabes cuál de los cambios marcó la diferencia, así que no puedes aplicar ese conocimiento a la próxima construcción." },
        { type: "callout", accent: "purple", text: "Cambia una cosa. Prueba. Observa. Luego cambia la siguiente. Así es como los ingenieros descubren qué funciona de verdad en lugar de tener suerte." },
      ] },
      { title: "Este Pensamiento Funciona en Todas Partes", blocks: [
        { type: "paragraph", text: "La mentalidad de ingeniería no es solo para estructuras. El mismo patrón de observar, hipotetizar, probar y mejorar aparece en todas partes:" },
        { type: "list", items: [
          "Ciencias: un experimento fallido te dice algo específico sobre las condiciones o tu hipótesis",
          "Programación: un programa que falla te da un mensaje de error; léelo con atención antes de cambiar algo",
          "Matemáticas: una respuesta incorrecta te dice qué paso revisar, no que eres malo en matemáticas",
          "Deportes: un tiro errado te muestra qué ajustar en tu postura o en el tiempo, no que debas rendirte",
        ] },
        { type: "ctaLink", title: "Únete a un Taller de Ingeniería Gratuito", text: "En nuestros talleres de ingeniería, los estudiantes construyen, prueban y usan los resultados para tomar mejores decisiones de diseño.", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "design-a-mars-rover-out-of-cardboard": {
    ...localizedBlogArticles.en["design-a-mars-rover-out-of-cardboard"],
    title: "Diseña un Rover de Marte con Cartón",
    category: "Ingeniería",
    readTime: common.es.minutes.m5,
    imageAlt: "Estudiantes trabajando en un desafío de diseño de ingeniería en un taller de Avanza STEM",
    imageCaption: "Los desafíos de ingeniería en Avanza STEM comienzan con un planteamiento de diseño y restricciones, y terminan con una prueba real.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Los rovers de Marte de la NASA tienen que funcionar a más de 200 millones de kilómetros del taller de reparaciones más cercano. Si se rompe una rueda o falla un sensor, no hay nadie que lo arregle. Cada decisión de diseño tiene eso en cuenta." },
        { type: "paragraph", text: "Hoy no diseñarás para esa distancia, pero trabajarás con el mismo tipo de restricciones: materiales limitados, límites de peso, terreno irregular y el requisito de que tu rover realmente funcione cuando se ponga a prueba." },
      ] },
      { title: "El Planteamiento de la Misión", blocks: [
        { type: "callout", title: "Tu Misión", accent: "purple", text: "Diseña un rover de Marte con cartón, cinta adhesiva y materiales básicos. Tu rover debe cargar una pequeña carga útil, moverse por terreno irregular y sobrevivir una prueba de caída. Tienes 45 minutos." },
      ] },
      { title: "Lo Que Necesitas", blocks: [
        { type: "list", items: [
          "Cartón (cajas de cereal, cajas de entrega, cualquier cartón plano)",
          "Cinta de tela o cinta de papel",
          "Tijeras",
          "Tubos de cartón (rollos de papel toalla o papel higiénico)",
          "Popotes",
          "Vasitos de papel pequeños",
          "Opcional: sujetadores de latón, ligas, una regla",
        ] },
      ] },
      { title: "Tus Objetivos de Diseño", blocks: [
        { type: "paragraph", text: "Los ingenieros reales son evaluados según requisitos específicos. Aquí están los tuyos:" },
        { type: "numbered", items: [
          { title: "Carga una carga útil", body: "Tu rover debe sostener un vasito con 3 monedas o 3 piedritas encima sin voltearse." },
          { title: "Atraviesa el terreno", body: "Tu rover debe rodar sobre una hoja de papel de cuaderno arrugada sin atascarse ni detenerse." },
          { title: "Sobrevive la caída", body: "Suéltalo desde la altura de tu rodilla. El rover debe quedar en una sola pieza y seguir rodando después." },
          { title: "Extra: el brazo", body: "Agrega una pieza que se extienda hacia afuera del cuerpo, como el brazo de un rover real, que pueda «alcanzar» hacia una superficie sin que todo el rover se mueva." },
        ] },
      ] },
      { title: "Tus Restricciones de Diseño", blocks: [
        { type: "paragraph", text: "La ingeniería real siempre tiene restricciones. Trabajar dentro de ellas es el trabajo. Estas son las tuyas:" },
        { type: "list", items: [
          "Tamaño máximo: debe caber dentro de una caja de zapatos",
          "Sin pistola de silicón caliente. Solo cinta adhesiva y sujetadores",
          "Las ruedas deben ser redondas (cualquier tamaño, pero verdaderamente redondas)",
          "Tiempo máximo de construcción: 45 minutos",
          "Debes poder explicar una decisión de diseño antes de hacer la prueba",
        ] },
      ] },
      { title: "Preguntas de Ingeniería para Pensar Antes de Construir", blocks: [
        { type: "numbered", items: [
          { title: "¿Cuántas ruedas?", body: "Cuatro ruedas ofrecen más estabilidad que tres. Pero más ruedas significan más peso y más partes que pueden romperse. Los rovers reales usan seis, con cada una conectada de forma independiente para que si una rueda choca con una roca no vuelque todo el vehículo." },
          { title: "¿Dónde está el peso?", body: "El peso arriba hace que el rover se vuelque fácilmente. El peso abajo lo mantiene estable. Pon las partes más pesadas lo más cerca posible del suelo." },
          { title: "¿Qué tan ancha es la vía?", body: "La distancia entre las ruedas izquierda y derecha se llama vía. Una vía más ancha hace que sea más difícil voltearlo de lado. Una vía más estrecha cabe en espacios más reducidos." },
          { title: "¿Qué pasa cuando una rueda choca con un bache?", body: "Si el eje es rígido, un bache en una rueda levanta todo un lado. Los rovers reales usan suspensión rocker-bogie para que cada rueda se mueva de forma independiente. ¿Puedes hacer algo así con cartón y cinta?" },
        ] },
      ] },
      { title: "Pruébalo y Luego Hazte Estas Preguntas", blocks: [
        { type: "list", items: [
          "¿Se volteó durante la prueba de carga? ¿Dónde está concentrado el peso?",
          "¿Se atascó en el papel arrugado? ¿Se hundió una rueda o arrastró el cuerpo?",
          "¿Sobrevivió la caída? ¿Qué parte falló primero?",
          "¿Cuál es el único cambio que harías si tuvieras diez minutos más?",
        ] },
        { type: "paragraph", text: "Escribe o dibuja tus respuestas. Ese registro es lo que separa una primera construcción de una segunda mejor." },
        { type: "quote", text: "Un estudiante agregó una rampa al frente de su rover usando una tira de cartón doblada. Dijo que era para empujar las rocas del camino. Le pregunté si había visto eso en un rover real. Dijo que no, que simplemente pensó que ayudaría. Ese es el tipo de pensamiento correcto.", attribution: "Noah López, mentor de Avanza STEM" },
      ] },
      { title: "La Conexión con el Rover Real", blocks: [
        { type: "paragraph", text: "Perseverance, el rover actual de la NASA en Marte, pesa aproximadamente 1,025 kilogramos y tiene seis ruedas diseñadas para moverse de forma independiente. Lleva cámaras, un micrófono, un taladro y un helicóptero llamado Ingenuity. Cada parte tuvo que ser suficientemente ligera para el lanzamiento, suficientemente resistente para el aterrizaje y suficientemente confiable para operar durante años sin nadie cerca que la repare." },
        { type: "paragraph", text: "Las preguntas de diseño con las que estás trabajando, incluyendo distribución del peso, número de ruedas, despeje del terreno y capacidad de carga, son las mismas categorías de preguntas que responden los ingenieros reales de rovers, solo que a escalas muy diferentes." },
        { type: "ctaLink", title: "Prueba la Ingeniería en Persona", text: "En nuestros talleres, los estudiantes trabajan en desafíos de diseño como este y prueban sus construcciones frente a restricciones reales.", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "what-is-ai-actually-doing-when-it-answers-you": {
    ...localizedBlogArticles.en["what-is-ai-actually-doing-when-it-answers-you"],
    title: "¿Qué Está Haciendo Realmente la IA Cuando Te Responde?",
    category: "IA",
    readTime: common.es.minutes.m5,
    imageAlt: "Un gráfico de inteligencia artificial brillante sobre una tableta con líneas de red digital al fondo",
    imageCaption: "En los talleres de IA de Avanza STEM, los estudiantes aprenden a preguntarse qué está haciendo realmente una IA, no solo si la respuesta parece correcta.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Cuando escribes una pregunta en una herramienta de chat con IA y te responde en segundos, ¿qué ocurrió realmente? Mucha gente asume que la IA buscó en internet, recuperó una respuesta de una base de datos o consultó algún tipo de conocimiento almacenado. Ninguna de esas cosas es del todo correcta." },
        { type: "paragraph", text: "La respuesta más precisa es que la IA predijo qué texto debería venir a continuación, palabra por palabra, basándose en patrones de enormes cantidades de datos con los que fue entrenada. Esa es una respuesta más extraña e interesante de lo que la mayoría espera." },
      ] },
      { title: "Se Parece Más al Autocorrector que a un Motor de Búsqueda", blocks: [
        { type: "callout", accent: "teal", text: "Piensa en el autocorrector de tu teléfono. Sugiere la siguiente palabra según qué palabras suelen seguir en mensajes como el tuyo. Un modelo de lenguaje hace algo similar, pero mucho más sofisticado y a una escala mucho mayor." },
        { type: "paragraph", text: "Cuando una IA genera una respuesta, no está recuperando una respuesta almacenada. Está calculando qué palabra tiene más probabilidad de venir a continuación, dado todo lo que vino antes. Luego repite ese proceso, palabra por palabra, hasta que la respuesta está completa." },
        { type: "paragraph", text: "Por eso la IA puede generar respuestas tan rápidamente. No está pensando en el problema como lo harías tú. Está ejecutando un cálculo de reconocimiento de patrones muy rápido." },
      ] },
      { title: "Cómo Aprendió la IA Qué Decir", blocks: [
        { type: "numbered", items: [
          { title: "Entrenada con texto", body: "Los modelos de lenguaje se entrenan con grandes cantidades de texto escrito: artículos, libros, sitios web, código y más. Esto expuso al modelo a miles de millones de ejemplos de cómo se usa el lenguaje." },
          { title: "Aprendió patrones", body: "El modelo aprendió patrones estadísticos: después de esta combinación de palabras, estas palabras tienden a seguir. Los patrones son demasiado complejos para describirlos simplemente, pero son patrones, no reglas que escribió una persona." },
          { title: "Recibió retroalimentación", body: "Luego el modelo recibió calificaciones de personas que evaluaron cuáles respuestas eran más útiles, precisas y apropiadas. El modelo se ajustó según esa retroalimentación." },
          { title: "Genera respuestas", body: "Cuando haces una pregunta, el modelo usa esos patrones para generar una respuesta que se parezca a cómo luce una respuesta útil basándose en lo que ha visto en el entrenamiento." },
        ] },
      ] },
      { title: "Por Qué Puede Sonar Bien y Estar Equivocada", blocks: [
        { type: "paragraph", text: "Como la IA genera texto estadísticamente probable en lugar de hechos verificados, puede producir respuestas que suenan seguras y autorizadas pero contienen errores. A esto a veces se le llama alucinación: cuando la IA afirma algo que no es verdad de una manera que suena como si lo fuera." },
        { type: "list", items: [
          "La IA no sabe lo que no sabe",
          "Puede confundir nombres similares, fechas o eventos de diferentes contextos",
          "Genera lo que suena plausible, no lo que ha sido verificado",
          "No puede buscar algo en tiempo real para verificar su propia respuesta",
        ] },
        { type: "callout", title: "La Versión Honesta", accent: "teal", text: "Una IA que dice «no estoy segura de esto» es más útil que una que suena completamente segura todo el tiempo. Haz preguntas de seguimiento y verifica las afirmaciones que importan." },
      ] },
      { title: "Para Qué Sirve Realmente la IA", blocks: [
        { type: "paragraph", text: "Entender las limitaciones te ayuda a usar la IA de manera efectiva en lugar de confiar demasiado en ella o evitarla por completo." },
        { type: "list", items: [
          "Explicar conceptos de múltiples maneras hasta que uno funcione",
          "Generar esquemas, borradores y ejemplos rápidamente",
          "Resumir ideas que están bien cubiertas en sus datos de entrenamiento",
          "Generar ideas y alternativas",
          "Ayudar con edición y reescritura",
          "Escribir código que luego pruebas tú mismo",
        ] },
        { type: "paragraph", text: "Para tareas donde la respuesta necesita ser verificablemente correcta, como un hecho específico, una pregunta médica o una decisión legal, verifica las respuestas de la IA con una fuente confiable." },
      ] },
      { title: "Un Buen Hábito: Pídele que Se Explique", blocks: [
        { type: "paragraph", text: "Cuando trabajes con IA, después de que te dé una respuesta, prueba preguntar: «¿cómo sabes eso?» o «¿dónde verificaría esto?» La respuesta que obtienes suele ser reveladora." },
        { type: "callout", accent: "teal", text: "En nuestras sesiones de talleres de IA, pedimos a los estudiantes que elijan una respuesta de la IA e intenten verificar los hechos. El objetivo no es desconfiar de la IA. Es leerla de la misma manera que leerías cualquier fuente: con tu propio juicio activo." },
        { type: "quote", text: "Le pregunté sobre un científico y obtuvo la fecha del descubrimiento mal por treinta años. Lo hubiera creído si no hubiéramos verificado. Ahora verifico las cosas.", attribution: "Estudiante en un taller de IA de Avanza STEM" },
      ] },
      { title: "Qué Significa Esto para los Niños y las Familias", blocks: [
        { type: "paragraph", text: "Los niños que crecen usando herramientas de IA se beneficiarán de entender, a un nivel básico, qué hacen estos sistemas y qué no hacen. Esa comprensión moldea cómo leen el resultado de la IA." },
        { type: "list", items: [
          "Usa la IA para generar ideas y borradores más que para encontrar hechos específicos",
          "Compara las respuestas importantes con una segunda fuente",
          "Nota cuando la IA suena demasiado segura y haz preguntas de seguimiento",
          "Entiende que la IA no siempre está equivocada, pero tampoco siempre tiene razón",
        ] },
        { type: "paragraphWithLink", before: "Para más información sobre cómo aprende la IA de los datos y los diferentes tipos de herramientas de IA, consulta nuestra guía anterior: ", linkText: "¿Qué es la IA? Explicando la Inteligencia Artificial a los Niños", href: "/blog/what-is-ai-explaining-to-kids", after: "." },
        { type: "ctaLink", title: "Aprende Sobre IA en Persona", text: "En nuestros talleres de IA, los estudiantes trabajan con sistemas de IA simples, intentan encontrar sus errores y discuten lo que aprendieron.", linkText: "Ver próximos talleres", href: "/workshops", accent: "teal" },
      ] },
    ],
  },
  "how-to-think-like-an-inventor-in-20-minutes": {
    ...localizedBlogArticles.en["how-to-think-like-an-inventor-in-20-minutes"],
    title: "Cómo Pensar Como un Inventor en 20 Minutos",
    category: "Ingeniería",
    readTime: common.es.minutes.m5,
    imageAlt: "Un niño pensando con signos de interrogación y un foco brillante dibujados encima",
    imageCaption: "En los talleres de Avanza STEM, los estudiantes se lanzan directamente a construir algo y luego descubren qué mejorar a partir de ahí.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "La mayoría de los inventos comenzaron con alguien irritado. El cierre de cremallera se inventó porque los cordones de los zapatos seguían desatándose. Las notas adhesivas Post-it surgieron de un pegamento que no pegaba lo suficiente. El velcro vino de un paseo por un campo lleno de cardos." },
        { type: "paragraph", text: "El inventor no empezó intentando inventar algo. Empezó notando un problema que le molestaba y luego preguntando: ¿y si hubiera una mejor manera?" },
      ] },
      { title: "El Ciclo del Inventor", blocks: [
        { type: "paragraph", text: "No necesitas materiales especiales ni un laboratorio para pensar como un inventor. Necesitas cuatro pasos y unos veinte minutos." },
        { type: "numbered", items: [
          { title: "Encuentra un problema", body: "Busca algo pequeño y molesto. Una puerta que siempre se cierra sola. Un cargador de teléfono que se cae. Una cremallera de mochila que se traba. Las pequeñas frustraciones hacen mejores puntos de partida para inventos que los grandes, porque puedes probar una solución de verdad." },
          { title: "Dibuja una solución", body: "Dibuja cómo podría verse el arreglo, aunque sea una forma tosca en papel. No intentas que sea perfecta. Intentas hacer tu idea lo suficientemente específica como para poder discutirla." },
          { title: "Construye un prototipo rápido", body: "Usa lo que tengas: papel, cinta adhesiva, cartón, ligas. El prototipo no tiene que verse bien. Solo tiene que poder probarse." },
          { title: "Pruébalo", body: "Trata de romper tu prototipo. Si funciona perfectamente a la primera, tu prueba no fue lo suficientemente difícil. Encuentra el punto débil. Ese es tu próximo problema que resolver." },
        ] },
      ] },
      { title: "Cómo Encontrar Problemas que Valgan la Pena Resolver", blocks: [
        { type: "paragraph", text: "La parte más difícil para la mayoría de los estudiantes es el primer paso, no porque no haya problemas, sino porque están acostumbrados a ignorar las pequeñas molestias en lugar de prestarles atención." },
        { type: "callout", accent: "purple", text: "En los talleres de Avanza STEM, le damos a los estudiantes un minuto de silencio para recorrer el salón y anotar tres cosas que podrían funcionar mejor. Casi todos los estudiantes encuentran al menos dos." },
        { type: "list", items: [
          "¿Qué tarda más de lo que debería?",
          "¿Qué se rompe más de lo que debería?",
          "¿Qué siempre tienes que sostener de una manera incómoda?",
          "¿Qué haces todos los días y desearías no tener que hacer?",
        ] },
        { type: "paragraph", text: "Escoge el más pequeño. Un problema que puedas sostener en tus manos es más fácil de inventar que uno que abarca todo un sistema." },
      ] },
      { title: "Por Qué Dibujar Importa Antes de Construir", blocks: [
        { type: "paragraph", text: "Un dibujo no es solo una imagen. Es una decisión. Cuando dibujas tu solución, tienes que comprometerte con la forma aproximada: dónde va la bisagra, qué lado se abre, qué tan ancho debe ser el agarre." },
        { type: "paragraph", text: "Ese compromiso es lo que te permite probar la idea. Sin un dibujo, ajustas sobre la marcha, lo cual está bien, pero es más lento. Con un dibujo, sabes qué intentaste construir y puedes notar cuando la realidad difiere del plan." },
        { type: "callout", title: "Una Regla", accent: "purple", text: "No toques ningún material hasta que hayas dibujado al menos una versión de la idea. El dibujo no tiene que ser bueno. Solo tiene que existir." },
      ] },
      { title: "Qué Cuenta Como Prototipo", blocks: [
        { type: "paragraph", text: "Un prototipo es la versión más rápida de tu idea que puedes construir y probar. No es un producto terminado. No se supone que luzca bien. Se supone que te diga algo que aún no sabías." },
        { type: "list", items: [
          "Une las cosas con cinta en lugar de pegamento porque las desmontarás",
          "Usa la forma más simple que pruebe lo que más te importa",
          "Construye para una pregunta específica: ¿aguanta la bisagra? ¿encaja? ¿desliza?",
          "Constrúyelo en menos de 10 minutos o lo estás complicando demasiado",
        ] },
      ] },
      { title: "El Desafío del Inventor de 20 Minutos", blocks: [
        { type: "summary", timeLabel: "Tiempo", time: "20 minutos en total", ageLabel: "Ideal para", age: "Niños de 8 años en adelante", supervisionLabel: "Materiales", supervision: "Papel, cinta adhesiva, cartón, tijeras, ligas, cualquier cosa que encuentres", learnLabel: "Lo que practicas", learn: "Identificación de problemas, pensamiento de diseño, prototipado rápido e iteración" },
        { type: "callout", title: "Prueba Esto Ahora", accent: "purple", text: "Pon un temporizador de 20 minutos. Encuentra un problema en el salón. Dibuja una solución. Construye una versión sencilla. Pruébala una vez. Escribe la única cosa que cambiarías si tuvieras diez minutos más." },
        { type: "quote", text: "Decidió arreglar cómo su lápiz siempre se caía del escritorio. Pegó con cinta un pequeño borde de cartón a lo largo del filo. Funcionó. Luego empezó a preguntar qué más podía arreglar.", attribution: "Mentor de Avanza STEM en un taller de ingeniería" },
      ] },
    ],
  },
  "why-your-first-design-is-usually-not-your-best-one": {
    ...localizedBlogArticles.en["why-your-first-design-is-usually-not-your-best-one"],
    title: "Por Qué Tu Primer Diseño Casi Nunca Es el Mejor",
    category: "Ingeniería",
    readTime: common.es.minutes.m4,
    imageAlt: "Un estudiante examinando una estructura que acaba de colapsar durante una prueba de carga en un taller de Avanza STEM",
    imageCaption: "El momento en que un puente colapsa no es el final de la sesión. Generalmente es el comienzo del aprendizaje real.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "En casi todos los talleres de ingeniería de Avanza STEM, los puentes caen. Y los niños que los construyeron casi siempre tienen la misma expresión en el rostro: no derrotados, sino pensando." },
        { type: "paragraph", text: "Esa expresión es lo que se siente la iteración desde adentro. Incluso cuando no hay tiempo para una reconstrucción completa, la prueba cambia cómo los estudiantes entienden su diseño." },
      ] },
      { title: "El Mito del Diseño Terminado", blocks: [
        { type: "paragraph", text: "La mayoría de la gente asume que un buen diseño viene de una persona inteligente que piensa mucho antes de tocar algo. Así no funciona la ingeniería. Así tampoco funcionan la mayoría de los campos creativos." },
        { type: "paragraph", text: "Los diseños reales mejoran al entrar en contacto con la realidad. No puedes llegar a un puente más resistente solo pensando. Tienes que construir uno, probarlo, entender qué pasó y decidir qué cambiarías." },
        { type: "callout", title: "La Idea Central", accent: "purple", text: "El primer diseño no es un producto terminado. Es una hipótesis. La prueba te dice si la hipótesis era correcta." },
      ] },
      { title: "Un Ejemplo Real del Taller", blocks: [
        { type: "paragraph", text: "Durante una de nuestras sesiones de construcción de puentes en la Biblioteca Pública de Clifton, un grupo construyó un puente de paletas, lo probó con libros y vio que un lado se torció antes de que el puente finalmente cediera." },
        { type: "numbered", items: [
          { title: "La primera pista: el puente se torció de lado", body: "Antes de colapsar, los estudiantes notaron que un lado se inclinaba más que el otro. Eso les indicó que el problema no era solo el peso. Era soporte desigual." },
          { title: "El punto débil: falta de refuerzo diagonal", body: "Los tramos laterales tenían rectángulos abiertos largos en lugar de triángulos. Una vez que aumentó la carga, esos rectángulos cambiaron de forma y el puente perdió rigidez." },
          { title: "La mejora rápida: un refuerzo específico", body: "Con el tiempo que quedaba, el grupo agregó refuerzo diagonal al lado más débil y conversaron sobre dónde irían los refuerzos complementarios en una versión futura." },
          { title: "La conclusión: la prueba les dio un mejor diseño", body: "No necesitaban reconstruir el puente entero para aprender algo real. Una prueba cuidadosa les mostró exactamente qué debería manejar mejor su próximo diseño." },
        ] },
        { type: "quote", text: "Falló justo donde no pusimos el refuerzo de pegamento caliente", attribution: "Mónica, estudiante en un taller de ingeniería de Avanza STEM" },
      ] },
      { title: "Por Qué Empezar de Nuevo No Es Empezar desde Cero", blocks: [
        { type: "paragraph", text: "Cuando los estudiantes hacen un cambio después de una prueba, no están empezando desde cero. Llevan consigo información que el primer diseño no tenía." },
        { type: "callout", accent: "purple", text: "La iteración no siempre significa reconstruir todo el proyecto durante el mismo taller. A veces significa un ajuste inteligente, un mejor dibujo o una nota clara para la próxima versión." },
        { type: "paragraph", text: "Por eso los ingenieros experimentados no siempre son más rápidos en el primer intento. Son mejores notando lo que el primer intento les está diciendo." },
      ] },
      { title: "La Regla del Único Cambio", blocks: [
        { type: "paragraph", text: "Cuando algo falla y hay tiempo para mejorarlo, haz exactamente un cambio antes de volver a probar. Esto es más difícil de lo que parece, porque el instinto es arreglarlo todo a la vez." },
        { type: "paragraph", text: "Pero si cambias tres cosas y la siguiente versión es mejor, no sabes cuál de los cambios marcó la diferencia. Solo tuviste suerte, y la suerte no se transfiere a la próxima construcción." },
        { type: "list", items: [
          "Escoge el cambio que aborda específicamente lo que falló",
          "Haz ese cambio si el tiempo del taller lo permite",
          "Vuelve a probar en las mismas condiciones si puedes",
          "Anota lo que pasó o lo que intentarías después",
          "Usa esa nota para guiar el próximo diseño",
        ] },
        { type: "ctaLink", title: "Construye Algo y Pruébalo", text: "En nuestros talleres de ingeniería, los estudiantes construyen estructuras, las prueban y descubren qué revelan los resultados sobre su diseño.", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "the-engineering-of-a-backpack": {
    ...localizedBlogArticles.en["the-engineering-of-a-backpack"],
    title: "La Ingeniería de una Mochila",
    category: "Ingeniería",
    readTime: common.es.minutes.m5,
    imageAlt: "Una fila de mochilas que muestran diferentes tamaños, materiales, correas, cierres y disposición de bolsillos",
    imageCaption: "Las mochilas son ingeniería cotidiana: la distribución del peso, los materiales, los cierres, las correas y los bolsillos tienen que funcionar juntos.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Tu mochila resuelve cerca de una docena de problemas de ingeniería a la vez. Las correas mantienen el peso fuera de tus manos. El panel acolchado de la espalda reparte la presión a lo largo de tu columna. Los cierres de cremallera se abren y cierran miles de veces sin romperse. La tela es resistente, ligera, impermeable y suficientemente económica para venderse a un estudiante." },
        { type: "paragraph", text: "Nada de eso ocurrió por accidente. Cada parte de una mochila fue diseñada por alguien que pensó en un problema y probó una solución." },
      ] },
      { title: "El Problema de la Distribución del Peso", blocks: [
        { type: "paragraph", text: "Cargar 5 kilos en la mano es mucho más difícil que cargar 5 kilos en la espalda. No es un truco; es física. Una bolsa colgada de una mano crea un brazo de momento, que multiplica el esfuerzo que necesitan tus músculos para sostenerla. Una mochila posiciona el peso cerca de tu columna, reduciendo ese esfuerzo." },
        { type: "paragraph", text: "Las correas para los hombros hacen más que solo sostener la bolsa. Las correas más anchas reparten el mismo peso en más superficie, lo que reduce la presión por centímetro cuadrado. Es la misma razón por la que las raquetas de nieve evitan que te hundas. Las correas acolchadas tienen una superficie más suave que se comprime ligeramente, distribuyendo la presión de manera más uniforme." },
        { type: "callout", title: "Orden de Carga por Peso", accent: "purple", text: "Empaca los objetos más pesados cerca de tu espalda y los más ligeros hacia afuera. Esto mantiene el centro de masa cerca de tu columna y reduce el jalón hacia adelante que fuerza la parte baja de tu espalda." },
      ] },
      { title: "Cómo Funciona un Cierre de Cremallera", blocks: [
        { type: "paragraph", text: "Un cierre de cremallera es una hilera de dientes entrelazados a cada lado de una abertura. Cuando jalas el deslizador, este obliga a las dos hileras de dientes a unirse en un patrón específico. Cada diente tiene un pequeño saliente y un hueco correspondiente. A medida que el deslizador se mueve, posiciona cada diente para que el saliente de un lado encaje en el hueco del otro." },
        { type: "paragraph", text: "Ese encaje es lo que hace que un cierre cerrado se sienta tan sólido. Los dientes entrelazados resisten tanto la separación como el deslizamiento lateral. Para abrirlo, el deslizador introduce una pequeña cuchilla entre las hileras, forzando los dientes a separarse uno a uno." },
        { type: "list", items: [
          "Los cierres de metal duran más pero pesan más",
          "Los cierres de espiral de plástico son más ligeros y flexibles, ideales para costuras curvas",
          "YKK es el fabricante de cremalleras más común del mundo y aparece en la mayoría de las bolsas de calidad",
          "Una cremallera falla cuando el deslizador se ensancha demasiado, y a veces puedes arreglarlo apretándolo suavemente con alicates",
        ] },
      ] },
      { title: "Materiales y Compromisos", blocks: [
        { type: "paragraph", text: "La tela de una mochila es una serie de compromisos entre peso, durabilidad, resistencia al agua y costo." },
        { type: "numbered", items: [
          { title: "Nylon", body: "Resistente, ligero y resistente a la abrasión. La mayoría de las mochilas de gama alta usan nylon porque se mantiene bien con el tiempo sin agregar mucho peso." },
          { title: "Poliéster", body: "Ligeramente más pesado que el nylon pero más económico y más resistente al desgaste por UV. Común en mochilas escolares y bolsas económicas." },
          { title: "Lona", body: "Pesada y duradera, pero absorbe el agua. Buena para cargas de corta distancia, no ideal para uso al aire libre bajo la lluvia." },
          { title: "Ripstop", body: "Un patrón de tejido con una cuadrícula de hilos de refuerzo. Cuando la tela se rasga, la cuadrícula de refuerzo detiene que el desgarro se propague. Se usa en mochilas de alto rendimiento." },
        ] },
        { type: "paragraph", text: "La resistencia al agua viene de un recubrimiento en el interior de la tela, no de la tela en sí. Ese recubrimiento se desgasta con el tiempo, por eso las bolsas viejas dejan entrar el agua aunque la tela exterior todavía luzca intacta." },
      ] },
      { title: "El Sistema de Bolsillos", blocks: [
        { type: "paragraph", text: "Los bolsillos de una mochila no son aleatorios. Reflejan un conjunto de suposiciones sobre cómo la gente organiza lo que carga." },
        { type: "list", items: [
          "El compartimiento principal tiene el tamaño de libretas, una funda para laptop o ropa doblada",
          "El bolsillo frontal es para cosas a las que accedes con frecuencia pero que no quieres sueltas en el compartimiento principal",
          "Los bolsillos laterales tienen el tamaño de botellas de agua porque esa forma es común y predecible",
          "El pequeño bolsillo superior es para artículos que necesitas sin abrir la bolsa principal",
          "Los bolsillos organizadores internos asumen que cargas bolígrafos, llaves y un teléfono",
        ] },
        { type: "callout", title: "Prueba Esto", accent: "purple", text: "Evalúa tu propia mochila como lo haría un ingeniero. Dale una puntuación del 1 al 5 en: distribución del peso, calidad del cierre, resistencia de la tela al agua, organización de bolsillos y qué tan cómodas son las correas después de 10 minutos caminando. ¿Qué cambiarías primero?" },
      ] },
    ],
  },
  "what-makes-a-stem-workshop-fun": {
    ...localizedBlogArticles.en["what-makes-a-stem-workshop-fun"],
    title: "¿Qué Hace Divertido un Taller de STEM?",
    category: "Comunidad",
    readTime: common.es.minutes.m5,
    imageAlt: "Estudiantes y familias construyendo, probando y conversando activamente en un taller comunitario de Avanza STEM",
    imageCaption: "Un taller donde los niños hablan, construyen y debaten está funcionando. Un salón silencioso generalmente no.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Un taller donde los estudiantes se sientan en silencio a ver a alguien demostrar cosas no es un taller de STEM. Es una presentación. Y las presentaciones, incluso las buenas, se olvidan en su mayoría al día siguiente." },
        { type: "paragraph", text: "En Avanza STEM, dedicamos tanto tiempo a pensar en el diseño de la sesión como en el contenido. Lo que los estudiantes hacen en el salón importa más que lo que les decimos." },
      ] },
      { title: "La Diferencia entre Activo y Pasivo", blocks: [
        { type: "paragraph", text: "Aprendizaje pasivo significa observar, escuchar y recibir. Aprendizaje activo significa hacer, probar, debatir y construir. La investigación sobre cuál funciona mejor no es ambigua." },
        { type: "paragraph", text: "Pero tampoco se trata solo de hacer algo. Los estudiantes pueden estar ocupados con las manos y aún así no estar pensando realmente. Un buen taller está diseñado para que el hacer obligue al pensar." },
        { type: "callout", accent: "purple", text: "En nuestros talleres de puentes, los estudiantes no observan a un mentor construir un puente. Reciben materiales, un límite de carga y unos 30 minutos. La frustración, los debates con su compañero sobre el diseño, el momento en que el puente soporta más de lo esperado: ahí es donde vive el aprendizaje." },
      ] },
      { title: "Cómo Diseñamos las Actividades de Avanza STEM", blocks: [
        { type: "paragraph", text: "Cada actividad que realizamos pasa por el mismo conjunto de preguntas antes de llevarla a un taller." },
        { type: "numbered", items: [
          { title: "¿Hay una prueba real?", body: "Si los estudiantes no pueden saber si su idea funcionó, no es un desafío de diseño. Es un proyecto de arte. Cada actividad termina con una prueba: ¿aguanta el puente el peso? ¿El rover cruza el terreno? ¿El código funciona?" },
          { title: "¿Puede fallar de una manera interesante?", body: "El fracaso que enseña algo es una característica. Si la actividad solo puede tener éxito o fallar de manera trivial, no hay nada que mejorar. Los mejores fracasos son lo suficientemente específicos para que los estudiantes sepan qué arreglar." },
          { title: "¿Hay espacio para diferentes enfoques?", body: "Un desafío con una sola respuesta correcta se convierte en una carrera para encontrarla. Un desafío con múltiples enfoques válidos permite que los estudiantes tomen decisiones de diseño genuinas y aprendan comparando resultados." },
          { title: "¿Están los estudiantes hablando entre sí?", body: "El desacuerdo productivo es una de las mejores señales de que una sesión está funcionando. Cuando los estudiantes debaten si agregar más diagonales o reforzar la unión, están haciendo ingeniería." },
        ] },
      ] },
      { title: "Qué Hacen Realmente los Estudiantes en Nuestros Talleres", blocks: [
        { type: "paragraph", text: "En una sesión típica de Avanza STEM, un estudiante puede hacer cinco o seis cosas distintas en 60 minutos." },
        { type: "list", items: [
          "Escuchar un planteamiento de dos minutos que les da el objetivo y las restricciones",
          "Debatir el diseño con su compañero por unos minutos antes de construir",
          "Construir una primera versión y probarla, muchas veces fallando en el primer intento",
          "Hacer un cambio específico basado en lo que vieron fallar",
          "Volver a probar y notar si el cambio ayudó",
          "Explicarle al grupo lo que aprendieron, no lo que construyeron, sino lo que descubrieron",
        ] },
        { type: "paragraph", text: "Ese último paso es el que la mayoría de los talleres omite. Cuando un estudiante tiene que explicar lo que aprendió con palabras, descubre si realmente lo entendió o solo tuvo suerte." },
      ] },
      { title: "Por Qué el Ruido Suele Ser una Buena Señal", blocks: [
        { type: "paragraph", text: "Los talleres silenciosos hacen que los adultos se sientan cómodos y generalmente hacen que los estudiantes se sientan menos involucrados. Una sesión donde los estudiantes hablan, aunque sea en voz alta y aunque estén discutiendo, es una sesión donde los estudiantes están pensando." },
        { type: "quote", text: "Pensé que se estaban distrayendo porque hacían tanto ruido con el tema de la cremallera. Pero luego escuché y en realidad estaban debatiendo si la fricción era mayor en el exterior o en el interior de la curva. Eso es exactamente lo que queríamos.", attribution: "Mentor de Avanza STEM después de una sesión de ciencias" },
        { type: "paragraph", text: "El trabajo del mentor en esos momentos no es callar el salón. Es hacer una pregunta que agudice el debate." },
      ] },
      { title: "Las Tres Cosas que Siempre Incluimos", blocks: [
        { type: "numbered", items: [
          { title: "Una prueba real con un resultado real", body: "No «buen trabajo a todos». Un pase o falle real contra el objetivo planteado." },
          { title: "Un modo de falla específico del que aprender", body: "Si todo funciona a la primera, los estudiantes no aprendieron cuáles son los límites." },
          { title: "Tiempo para explicar lo que descubrieron", body: "Construir sin reflexión es solo actividad. La reflexión es donde se consolida la comprensión." },
        ] },
        { type: "ctaLink", title: "Ven a Ver un Taller", text: "Los talleres de Avanza STEM son gratuitos, prácticos y abiertos a estudiantes de todos los niveles de experiencia. No se requiere experiencia previa en STEM.", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "engineering-inside-school-bus": {
    ...localizedBlogArticles.en["engineering-inside-school-bus"],
    title: "La Ingeniería Secreta Dentro de un Autobús Escolar",
    category: "Ingeniería",
    readTime: common.es.minutes.m5,
    imageAlt: "Un autobús escolar amarillo que muestra su color de seguridad distintivo, espejos grandes y señalización de salida de emergencia",
    imageCaption: "La ingeniería no solo se encuentra en laboratorios y fábricas. Está empacada en cada vehículo en el que viajas, incluyendo el autobús escolar.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Un autobús escolar puede parecer simple: una caja amarilla grande, muchos asientos, luces parpadeantes y un motor ruidoso. Pero un autobús escolar está lleno de decisiones de ingeniería. Casi cada parte está diseñada para responder una gran pregunta: ¿cómo transportamos a muchos niños de manera segura?" },
        { type: "paragraph", text: "Veamos la ingeniería oculta dentro de un autobús escolar." },
      ] },
      { title: "¿Por Qué los Autobuses Escolares Son Amarillos?", blocks: [
        { type: "paragraph", text: "Los autobuses escolares no son amarillos por accidente. Ese color brillante es fácil de ver por la mañana, por la tarde e incluso cuando el cielo está nublado. Los ingenieros y diseñadores de seguridad quieren que los conductores noten un autobús escolar rápidamente." },
        { type: "paragraph", text: "El color, las luces parpadeantes, el brazo de señal de parada y el gran tamaño trabajan juntos para decir: presta atención, hay niños cerca. El autobús básicamente está diseñado para ser imposible de ignorar." },
      ] },
      { title: "Los Asientos Son Herramientas de Seguridad", blocks: [
        { type: "paragraph", text: "Los asientos de un autobús escolar pueden no parecer elegantes, pero están diseñados con la seguridad en mente. Muchos autobuses escolares usan algo llamado compartimentación: los asientos son altos, acolchados y están cerca entre sí. Si el autobús frena de repente, el asiento frente a ti ayuda a absorber parte del movimiento, casi como una pared suave." },
        { type: "paragraph", text: "Los asientos también tienen marcos resistentes por debajo. Necesitan manejar baches, curvas y años de estudiantes sentados, recostándose y moviéndose. Un asiento en un autobús escolar no es solo un lugar para sentarse. Es parte del sistema de seguridad." },
      ] },
      { title: "¿Por Qué el Conductor Puede Ver Tanto?", blocks: [
        { type: "paragraph", text: "Los conductores de autobús necesitan ver la carretera, los estudiantes, las puertas, la acera y los autos alrededor. Por eso los autobuses tienen espejos enormes. Algunos espejos muestran lo que hay detrás del autobús. Otros ayudan al conductor a ver cerca del parachoques delantero, donde los niños pequeños pueden ser difíciles de ver." },
        { type: "paragraph", text: "La visibilidad es un gran desafío de ingeniería porque un autobús escolar es grande. Los ingenieros tienen que ayudar al conductor a ver alrededor del tamaño del vehículo." },
      ] },
      { title: "Girar un Vehículo Gigante", blocks: [
        { type: "paragraph", text: "Un autobús escolar es mucho más largo que un auto, por lo que girar es más difícil. Los ingenieros tienen que pensar en el radio de giro, o cuánto espacio necesita un vehículo para dar una vuelta. Un autobús necesita más espacio que un auto pequeño, especialmente en calles estrechas." },
        { type: "paragraph", text: "Por eso los conductores de autobús a veces se desplazan un poco más hacia afuera antes de girar. El autobús no está siendo dramático. Está siguiendo la geometría." },
      ] },
      { title: "Las Salidas de Emergencia Están en Todas Partes", blocks: [
        { type: "paragraph", text: "Un autobús escolar tiene más salidas que la puerta delantera. Puede haber una puerta de emergencia trasera, escotillas en el techo y ventanas de emergencia. La buena ingeniería no es solo para los días normales. También es para los días inesperados." },
        { type: "callout", title: "¿Por Qué Tantas Salidas?", accent: "purple", text: "¿Y si la puerta delantera está bloqueada? ¿Y si el autobús está inclinado? ¿Y si los estudiantes necesitan salir rápidamente? Los ingenieros planifican las situaciones hipotéticas antes de que sucedan." },
      ] },
      { title: "Prueba Esto: Diseña Tu Propio Autobús Más Seguro", blocks: [
        { type: "paragraph", text: "Toma papel y dibuja tu propio diseño de autobús escolar. Agrega espejos, salidas de emergencia, una disposición de asientos, luces, señales, ventanas y espacios de almacenamiento. Por cada parte que dibujes, pregúntate: ¿qué problema resuelve esto?" },
        { type: "callout", title: "La Pregunta del Ingeniero", accent: "purple", text: "Los ingenieros no solo preguntan, ¿se ve bien? Preguntan, ¿qué hace esto? ¿Qué problema resuelve? Aplica esa pregunta a cada parte de tu dibujo." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "La próxima vez que veas un autobús escolar, míralo más de cerca. El color, los espejos, los asientos, las salidas, las puertas y la forma al girar tienen un propósito. Un autobús escolar no es solo transporte. Es ingeniería sobre ruedas." },
      ] },
    ],
  },
  "why-airplane-wings-are-curved": {
    ...localizedBlogArticles.en["why-airplane-wings-are-curved"],
    title: "¿Por Qué las Alas de los Aviones Son Curvas?",
    category: "Ingeniería",
    readTime: common.es.minutes.m5,
    imageAlt: "Un Boeing 777-200 de United Airlines en vuelo, con sus alas de perfil aerodinámico curvadas y las winglets levantadas claramente visibles",
    imageCaption: "Las alas de los aviones no son tablas planas. Su forma de perfil aerodinámico crea la diferencia de presión que eleva del suelo a un avión de cien toneladas.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Las alas de los aviones tienen uno de los trabajos más increíbles en la ingeniería. Ayudan a levantar una enorme máquina de metal hacia el cielo. Eso suena imposible. ¿Cómo puede volar algo tan pesado como un avión?" },
        { type: "paragraph", text: "La respuesta tiene mucho que ver con la forma de las alas." },
      ] },
      { title: "Las Alas No Son Planas", blocks: [
        { type: "paragraph", text: "Si miras el ala de un avión de lado, no es solo una tabla plana. Generalmente tiene la parte superior curva y la parte inferior más plana. Esta forma se llama perfil aerodinámico. Un perfil aerodinámico está diseñado para moverse por el aire de una manera especial." },
        { type: "paragraph", text: "Cuando el avión avanza, el aire fluye alrededor del ala. La forma del ala ayuda a crear una diferencia de presión entre la parte superior e inferior del ala. Generalmente, la presión del aire sobre el ala se vuelve menor que la presión debajo de ella. La mayor presión debajo ayuda a empujar el ala hacia arriba. Esa fuerza hacia arriba se llama sustentación." },
      ] },
      { title: "La Sustentación No Es Magia", blocks: [
        { type: "paragraph", text: "La sustentación no es magia ni un solo truco simple. Las alas crean sustentación porque cambian cómo se mueve el aire. A medida que el ala avanza, empuja algo de aire hacia abajo. Cuando el aire es empujado hacia abajo, el ala es empujada hacia arriba. Eso está relacionado con la tercera ley de Newton: para cada acción, hay una reacción igual y opuesta. Entonces el ala está haciendo dos cosas importantes:" },
        { type: "numbered", items: [
          { title: "Crear diferencias de presión", body: "La superficie superior curva hace que el aire se mueva más rápido y crea menor presión sobre el ala." },
          { title: "Empujar el aire hacia abajo", body: "El ala redirige el flujo de aire, y la fuerza de reacción empuja el avión hacia arriba." },
        ] },
      ] },
      { title: "¿Por Qué el Avión Necesita Velocidad?", blocks: [
        { type: "paragraph", text: "Un avión parado en la pista no despega. Necesita moverse rápido porque las alas necesitan aire moviéndose sobre ellas. Cuanto más rápido se mueve el avión, más aire fluye alrededor de las alas, y más flujo de aire puede crear más sustentación." },
        { type: "paragraph", text: "Por eso los aviones aceleran por la pista antes de despegar. Los motores empujan el avión hacia adelante, las alas interactúan con el aire en movimiento y eventualmente hay suficiente sustentación para que el avión ascienda." },
      ] },
      { title: "¿Qué Son los Flaps?", blocks: [
        { type: "paragraph", text: "Durante el despegue y el aterrizaje, puedes ver partes del ala que se mueven. Estas se llaman flaps y slats. Cambian la forma del ala, lo que ayuda a crear más sustentación a velocidades más bajas." },
        { type: "paragraph", text: "Esto es útil porque los aviones necesitan sustentación adicional al despegar o aterrizar. No siempre pueden ir muy rápido cerca del suelo, por lo que los ingenieros le dan a las alas partes móviles que ayudan a controlar el flujo de aire." },
      ] },
      { title: "Prueba Esto: Test de Papel", blocks: [
        { type: "paragraph", text: "Toma dos hojas de papel. Dobla una en un avión de papel simple. Mantén la otra plana. Ahora lánzalos suavemente. El avión de papel vuela mejor porque su forma lo ayuda a moverse por el aire de manera más controlada." },
        { type: "callout", title: "La Forma Importa", accent: "purple", text: "Los ingenieros prueban formas de alas en túneles de viento, simulaciones por computadora y vuelos reales. Un cambio pequeño en la forma del ala puede hacer una gran diferencia en cuánta sustentación se crea. Por eso no son solo los motores los que hacen el trabajo. Las alas son herramientas de ingeniería cuidadosamente diseñadas." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Las alas de los aviones son curvas porque la forma controla el flujo de aire. Ese flujo de aire ayuda a crear sustentación, lo que permite que los aviones vuelen. Así que la próxima vez que veas un avión en el cielo, recuerda: no son solo los motores los que hacen el trabajo. Las alas son herramientas de ingeniería cuidadosamente diseñadas que convierten el aire en sustentación." },
      ] },
    ],
  },
  "how-elevators-know-where-to-go": {
    ...localizedBlogArticles.en["how-elevators-know-where-to-go"],
    title: "Cómo los Elevadores Saben a Dónde Ir",
    category: "Ingeniería",
    readTime: common.es.minutes.m4,
    imageAlt: "El interior de un elevador moderno con botones de piso iluminados y paredes metálicas pulidas",
    imageCaption: "Detrás de ese simple toque de botón hay un sistema de sensores, motores, contrapesos y lógica que mueve a las personas entre pisos de forma segura.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Presionas un botón. Las puertas se cierran. El elevador se mueve. Luego se detiene en el piso correcto. Parece simple, pero los elevadores están llenos de ingeniería. Usan botones, sensores, motores, cables, contrapesos y lógica computarizada para mover a las personas de forma segura." },
        { type: "paragraph", text: "Entonces, ¿cómo sabe un elevador a dónde ir?" },
      ] },
      { title: "El Botón Envía una Solicitud", blocks: [
        { type: "paragraph", text: "Cuando presionas un botón de elevador, no estás controlando directamente el motor. Estás enviando una solicitud al sistema de control del elevador, el «cerebro» del elevador. Este lleva un registro de:" },
        { type: "list", items: [
          "En qué piso está el elevador actualmente",
          "Qué botones han sido presionados",
          "En qué dirección se mueve el elevador",
          "Si las puertas están abiertas o cerradas",
          "Si algo está bloqueando las puertas",
        ] },
        { type: "paragraph", text: "El elevador no adivina. Sigue instrucciones de su sistema de control." },
      ] },
      { title: "Los Sensores Le Dicen al Elevador Dónde Está", blocks: [
        { type: "paragraph", text: "Un elevador necesita saber su posición. Usa sensores para detectar dónde se encuentra la cabina dentro del pasadizo. Estos sensores ayudan al sistema a saber cuándo reducir la velocidad, cuándo detenerse y si el elevador está alineado con el piso." },
        { type: "paragraph", text: "Esa última parte es importante. No querrás que el piso del elevador quede muy alto o muy bajo cuando se abran las puertas. Los ingenieros diseñan los elevadores para que se detengan con mucha precisión." },
      ] },
      { title: "Los Motores Hacen el Trabajo Pesado", blocks: [
        { type: "paragraph", text: "La mayoría de los elevadores usan motores eléctricos para moverse. El motor gira un sistema de poleas que mueve los cables conectados a la cabina del elevador. Pero aquí está la parte inteligente: muchos elevadores también usan un contrapeso, un objeto pesado conectado al sistema del elevador. Cuando la cabina sube, el contrapeso baja. Cuando la cabina baja, el contrapeso sube." },
        { type: "paragraph", text: "Esto ayuda a equilibrar el sistema para que el motor no tenga que trabajar tanto. Es como usar un balancín en lugar de levantar algo directamente por tu cuenta." },
      ] },
      { title: "El Elevador Usa Lógica Simple", blocks: [
        { type: "paragraph", text: "Los elevadores siguen reglas lógicas. Imagina que el elevador está en el piso 1 y las personas presionan los botones para los pisos 3, 5 y 2. El elevador puede decidir: subir, detenerse en el piso 2, detenerse en el piso 3, detenerse en el piso 5. No va de forma aleatoria. Intenta moverse de manera eficiente para que las personas no esperen demasiado." },
        { type: "paragraph", text: "En edificios altos, los sistemas de elevadores pueden volverse mucho más avanzados. Algunos sistemas agrupan a las personas por destino para que se necesiten menos paradas." },
      ] },
      { title: "La Seguridad Es lo Primero", blocks: [
        { type: "paragraph", text: "Los elevadores tienen muchos sistemas de seguridad. Las puertas usan sensores para no cerrarse sobre las personas. Los frenos ayudan a detener el elevador. Los sistemas de respaldo ayudan a mantener el elevador bajo control si una parte falla. Los ingenieros planifican los problemas antes de que sucedan." },
      ] },
      { title: "Prueba Esto: Juego de Lógica del Elevador", blocks: [
        { type: "paragraph", text: "Imagina que eres el controlador del elevador. Dibuja un edificio con 6 pisos. Pon el elevador en el piso 2. Alguien en el piso 5 quiere bajar, alguien en el piso 1 quiere subir y alguien adentro quiere el piso 4. ¿En qué orden debería atenderlos el elevador?" },
        { type: "callout", title: "No Hay Una Sola Respuesta Correcta", accent: "purple", text: "No siempre hay una solución perfecta. Los ingenieros tienen que pensar en velocidad, equidad, seguridad y uso de energía al mismo tiempo. ¿Qué compromisos harías tú?" },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Los elevadores no saben las cosas de la manera en que los humanos lo hacen. Usan sensores, motores y sistemas lógicos para tomar decisiones inteligentes. La próxima vez que te subas en uno, recuerda: detrás de ese simple botón hay todo un sistema de ingeniería funcionando silenciosamente en las paredes." },
      ] },
    ],
  },
  "why-buildings-sway-in-wind": {
    ...localizedBlogArticles.en["why-buildings-sway-in-wind"],
    title: "¿Por Qué los Edificios Se Mueven con el Viento?",
    category: "Ingeniería",
    readTime: common.es.minutes.m5,
    imageAlt: "El rascacielos Taipei 101 elevándose sobre el horizonte de Taipei, uno de los ejemplos más estudiados de diseño de edificios resistentes al viento",
    imageCaption: "El Taipei 101 está diseñado para flexionarse a propósito. Con vientos fuertes de tifón, la cima puede oscilar casi un metro, y eso es exactamente lo que lo mantiene en pie.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Si estuvieras en lo alto de un rascacielos muy alto durante un viento fuerte, podrías sentir que el edificio se mueve un poco. Eso suena aterrador, pero en realidad es parte del diseño. Los edificios altos no están pensados para ser perfectamente rígidos. En muchos casos, un edificio que puede oscilar un poco es más seguro que uno que se niega a moverse." },
      ] },
      { title: "El Viento Empuja a los Edificios", blocks: [
        { type: "paragraph", text: "El viento puede parecer invisible, pero puede empujar con mucha fuerza. Cuando el viento golpea un edificio alto, el edificio tiene que manejar esa fuerza. Cuanto más alto es el edificio, más viento puede captar. Los ingenieros deben preguntarse: ¿qué tan fuerte puede ser el viento aquí?, ¿qué tan alto es el edificio?, ¿qué forma tiene?, ¿cómo se moverá la estructura?, ¿y se sentirán cómodas las personas adentro?" },
        { type: "paragraph", text: "Un rascacielos no solo se sostiene a sí mismo. También está lidiando con el aire en movimiento." },
      ] },
      { title: "Ser Flexible Puede Ser Más Seguro", blocks: [
        { type: "paragraph", text: "Imagina doblar un palo seco. Se rompe. Ahora imagina doblar una rama verde de árbol. Se mueve, pero no se rompe tan fácilmente. Los edificios pueden ser similares. Si un edificio fuera demasiado rígido, el viento fuerte o las sacudidas de un terremoto podrían crear fuerzas enormes dentro de la estructura." },
        { type: "paragraph", text: "Pero si el edificio puede flexionarse un poco, puede absorber y distribuir parte de esa energía. Eso no significa que el edificio sea débil. Significa que está diseñado para moverse de forma segura." },
      ] },
      { title: "Los Terremotos También Sacuden los Edificios", blocks: [
        { type: "paragraph", text: "El viento empuja desde el lado. Los terremotos sacuden el suelo debajo. Durante un terremoto, la parte inferior del edificio se mueve primero porque el suelo se mueve. El resto del edificio tiene que responder." },
        { type: "paragraph", text: "Los ingenieros diseñan edificios con marcos resistentes, uniones flexibles, amortiguadores y cimientos especiales para ayudarlos a sobrevivir las sacudidas. El objetivo no siempre es hacer que el edificio se quede completamente quieto. El objetivo es mantenerlo en pie y proteger a las personas adentro." },
      ] },
      { title: "Algunos Edificios Tienen Amortiguadores Gigantes", blocks: [
        { type: "paragraph", text: "Algunos edificios altos tienen un peso gigante adentro llamado amortiguador de masa sintonizado. Es como un péndulo enorme. Cuando el edificio oscila hacia un lado, el amortiguador se mueve de una manera que ayuda a reducir el movimiento." },
        { type: "callout", accent: "purple", text: "Un amortiguador de masa sintonizado es casi como si el edificio tuviera una herramienta de equilibrio gigante escondida adentro. Puede que no lo veas desde la calle, pero puede hacer que el edificio se sienta dramáticamente más estable durante vientos fuertes." },
        { type: "image", src: "/images/blog/Ball in the middle of Taipei 101.jpg", alt: "La bola amortiguadora dorada de 660 toneladas suspendida dentro del Taipei 101, visible desde el mirador", caption: "La bola amortiguadora dorada de 660 toneladas del Taipei 101 cuelga cerca del piso 88. Cuando el viento empuja el edificio hacia un lado, este péndulo se balancea en dirección opuesta y cancela el movimiento que sentirían las personas adentro." },
      ] },
      { title: "La Forma También Importa", blocks: [
        { type: "paragraph", text: "La forma de un edificio afecta cómo el viento se mueve a su alrededor. Las esquinas agudas, los lados planos y las formas altas y estrechas pueden cambiar las fuerzas del viento. Los ingenieros prueban modelos de edificios en túneles de viento para ver cómo el aire fluye a su alrededor." },
        { type: "paragraph", text: "A veces redondean las esquinas, añaden aberturas o cambian la forma para reducir la presión del viento. La forma de un rascacielos no es solo para verse bien. También sirve para manejar las fuerzas." },
      ] },
      { title: "Prueba Esto: Prueba de Torre de Papel", blocks: [
        { type: "paragraph", text: "Construye dos torres con papel. Haz una muy rígida y recta. Haz otra con un poco de flexibilidad. Sópla suavemente sobre ellas o empuja la mesa ligeramente. ¿Cuál cae primero? ¿Cuál se dobla y se recupera?" },
        { type: "callout", title: "Lo Que Estudian los Ingenieros", accent: "purple", text: "Esta es una versión simple de lo que los ingenieros estudian con edificios reales. La pregunta no es solo «¿se sostendrá?» Sino «¿cómo se comportará cuando el viento o el suelo lo empuje?»" },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Los edificios oscilan porque el viento y los terremotos crean fuerzas. Un poco de movimiento puede ayudar a una estructura a sobrevivir esas fuerzas. Así que si un rascacielos se mueve levemente, eso no significa que los ingenieros fallaron. Puede significar que los ingenieros hicieron su trabajo." },
      ] },
    ],
  },
  "engineering-behind-soccer-ball": {
    ...localizedBlogArticles.en["engineering-behind-soccer-ball"],
    title: "La Ingeniería Detrás de un Balón de Fútbol",
    category: "Ingeniería",
    readTime: common.es.minutes.m6,
    imageAlt: "Un balón de fútbol moderno que muestra su diseño de paneles y la textura de su superficie",
    imageCaption: "Los balones de fútbol modernos son sistemas de precisión. Cada capa, forma de panel y textura superficial están diseñadas para optimizar el vuelo, la transferencia de energía y la estabilidad aerodinámica.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Los balones de fútbol modernos están diseñados con precisión para optimizar la aerodinámica, la transferencia de energía y la estabilidad en el vuelo. Los pesados balones de cuero del pasado que absorbían el agua quedaron atrás. Los balones actuales dependen de la ciencia de materiales, la geometría avanzada de paneles y la fabricación de alta tecnología para ofrecer un rendimiento constante en la cancha." },
      ] },
      { title: "La Anatomía de 4 Capas", blocks: [
        { type: "paragraph", text: "Un balón de partido de alta calidad tiene cuatro capas distintas, cada una diseñada para una función específica:" },
        { type: "list", items: [
          "Vejiga: la capa más interna, generalmente de goma butílica sintética o látex, retiene el aire y mantiene la presión interna. Las vejigas de butilo ofrecen mejor retención de aire, mientras que el látex proporciona un toque más suave y mejor rebote.",
          "Revestimiento: alrededor de la vejiga hay capas de telas tejidas de poliéster y algodón. Este revestimiento determina la resistencia del balón, le ayuda a mantener su forma esférica durante miles de patadas y amortigua el impacto.",
          "Amortiguación de espuma: una capa de espuma de poliuretano (PU) o acetato de vinilo y etileno (EVA) se encuentra debajo de la cubierta exterior. Cuando un jugador golpea el balón, esta capa se comprime y recupera su forma, transfiriendo la máxima energía para tiros de mayor velocidad.",
          "Cubierta: la capa más externa está hecha de cuero sintético durable (poliuretano). Resiste la absorción de agua para que el balón no se ponga pesado bajo la lluvia, y tiene texturas especializadas para atrapar el aire adecuadamente.",
        ] },
      ] },
      { title: "Diseño de Paneles y Aerodinámica", blocks: [
        { type: "paragraph", text: "El cambio más visualmente llamativo en la ingeniería de balones de fútbol en las últimas dos décadas ha sido la evolución de los paneles. Los balones tradicionales, como el clásico diseño de 32 paneles, tenían numerosas costuras que creaban mucha resistencia aerodinámica. Los balones de partido modernos usan solo 6 a 8 paneles unidos térmicamente, lo que reduce significativamente la longitud total de las costuras y la resistencia." },
        { type: "paragraph", text: "En lugar de costuras, los paneles se unen con calor o pegamento de alta frecuencia, haciendo el balón prácticamente sin costuras y resistente al agua. Los ingenieros usan Dinámica de Fluidos Computacional (CFD), el mismo software de simulación usado para diseñar aviones, para modelar cómo el aire se mueve sobre la superficie del balón. Los patrones texturizados en la cubierta exterior no son decorativos: controlan la capa límite del flujo de aire, ayudando al balón a volar más recto a altas velocidades." },
      ] },
      { title: "Equilibrio Dinámico y el Efecto Magnus", blocks: [
        { type: "paragraph", text: "Un balón bien diseñado debe pasar la prueba de equilibrio dinámico, lo que significa que su masa está distribuida uniformemente para que gire suavemente por el aire sin tambalear. Cuando un jugador golpea el balón fuera del centro, esta distribución de peso uniforme permite que gire limpiamente." },
        { type: "paragraph", text: "Ese giro activa el efecto Magnus. A medida que el balón rota, un lado de su superficie se mueve con el flujo de aire circundante mientras el otro se mueve en contra de él. Esto crea una diferencia de presión a cada lado del balón, que genera una fuerza lateral que curva físicamente la trayectoria del balón. Esta es la física detrás de cada tiro libre que se curva y cada córner que se enrosca que hayas visto." },
        { type: "callout", title: "El Efecto Magnus en Acción", accent: "purple", text: "Golpea un balón fuera del centro y girará. La superficie en rotación arrastra el aire más rápido en un lado que en el otro, creando presión desigual. Esa diferencia de presión es una fuerza física real, el mismo principio que hace que una curva en béisbol se curve y que un tiro con efecto en tenis baje." },
      ] },
      { title: "Tecnología Integrada", blocks: [
        { type: "paragraph", text: "Los balones de partido modernos de alta gama ya no son solo cuero y aire. Son inteligentes. Los balones de alta tecnología tienen tecnología de balón conectado, con un sistema de suspensión interno con sensores avanzados de unidad de medición inercial (IMU). Estos sensores rastrean el movimiento exacto en el espacio tridimensional, comunicándose con sistemas de seguimiento óptico a 500 fotogramas por segundo para proporcionar datos en tiempo real sobre posición, velocidad del tiro e impacto exacto." },
        { type: "paragraph", text: "Estos datos impulsan tecnología de arbitraje como la detección semiautomática de fuera de juego y la tecnología de línea de gol, que puede determinar en milisegundos si el balón cruzó completamente la línea." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Un balón de fútbol no es solo algo que pateas. Es un sistema construido con precisión por capas donde la ciencia de materiales, la dinámica de fluidos y la tecnología de sensores trabajan juntas. Cada gran tiro comienza con la ingeniería." },
      ] },
    ],
  },
  "why-manhole-covers-are-round": {
    ...localizedBlogArticles.en["why-manhole-covers-are-round"],
    title: "¿Por Qué las Tapas de Alcantarilla Son Redondas?",
    category: "Ingeniería",
    readTime: common.es.minutes.m4,
    imageAlt: "Una tapa de alcantarilla de hierro fundido sobre el pavimento de la ciudad, que muestra su forma circular y la textura de su superficie antideslizante",
    imageCaption: "Las tapas de alcantarilla son redondas porque un círculo no puede caer por un agujero del mismo tamaño, sin importar cómo lo gires.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "A primera vista, una tapa de alcantarilla parece un objeto aburrido. Es solo una tapa de metal pesada en la calle, ¿verdad? No exactamente. Las tapas de alcantarilla son un diseño de ingeniería famoso porque su forma resuelve varios problemas a la vez. Entonces, ¿por qué generalmente son redondas?" },
      ] },
      { title: "Una Tapa Redonda No Puede Caer por Su Propio Agujero", blocks: [
        { type: "paragraph", text: "Esta es la razón clásica. Una tapa circular no puede caer por una abertura circular del mismo tamaño. Sin importar cómo la gires, el ancho del círculo sigue siendo el mismo." },
        { type: "paragraph", text: "Pero una tapa cuadrada podría caer por un agujero cuadrado si la inclinas en diagonal. La diagonal de un cuadrado es más larga que su lado, por lo que la tapa podría deslizarse en el ángulo incorrecto. Eso sería peligroso para los trabajadores subterráneos y para las personas arriba. Una tapa redonda ayuda a prevenir ese problema." },
      ] },
      { title: "Las Tapas Redondas Son Más Fáciles de Mover", blocks: [
        { type: "paragraph", text: "Las tapas de alcantarilla son pesadas. Algunas pueden pesar más que una persona. Una tapa redonda puede rodarse. Los trabajadores pueden inclinarla y rodarla como una rueda por distancias cortas. Una tapa cuadrada sería más difícil de mover así porque tiene esquinas." },
        { type: "paragraph", text: "A los ingenieros les importa cómo los objetos son usados por personas reales. Un diseño no es solo sobre la forma. También es sobre cómo levantarlo, moverlo, reemplazarlo y mantenerlo durante años de uso." },
      ] },
      { title: "El Agujero También Es Redondo", blocks: [
        { type: "paragraph", text: "Muchos túneles subterráneos y pozos de acceso son redondos. Las formas redondas son resistentes porque distribuyen la presión de manera uniforme. Las tuberías son redondas por una razón similar. Si el agujero es redondo, tiene sentido que la tapa también sea redonda. La forma de la tapa coincide con la forma de la abertura." },
      ] },
      { title: "No Hay que Alinearla", blocks: [
        { type: "paragraph", text: "Una tapa redonda encaja sin importar cómo la gires. Con un cuadrado o un rectángulo, hay que alinear las esquinas. Con un círculo, cualquier dirección funciona. Eso ahorra tiempo cuando los trabajadores vuelven a colocar la tapa. También reduce la posibilidad de colocarla incorrectamente." },
      ] },
      { title: "Resistente y Simple", blocks: [
        { type: "paragraph", text: "Las tapas de alcantarilla necesitan soportar autos, camiones, lluvia, nieve, calor, frío y años de uso. La forma redonda ayuda a distribuir el peso uniformemente. El metal generalmente tiene textura en la parte superior para que los neumáticos y los zapatos puedan agarrarlo mejor. Incluso el patrón en la parte superior está diseñado; no es solo decoración." },
      ] },
      { title: "Prueba Esto: Prueba de Formas", blocks: [
        { type: "paragraph", text: "Recorta un círculo de papel y un cuadrado de papel. Dibuja agujeros coincidentes en otra hoja de papel. Ahora intenta rotar cada tapa sobre su agujero correspondiente. ¿Cuál puede deslizarse si se gira en el ángulo incorrecto? ¿Cuál siempre es demasiado ancha para caer?" },
        { type: "callout", title: "Un Diseño, Muchas Soluciones", accent: "purple", text: "Esta simple prueba con papel muestra por qué a los ingenieros les gustan las tapas redondas. La forma es segura, resistente, fácil de mover y fácil de reemplazar al mismo tiempo. Eso es gran ingeniería: una solución que resuelve múltiples problemas." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Las tapas de alcantarilla son redondas porque la forma es segura, resistente, fácil de mover y fácil de reemplazar. Es un gran ejemplo de ingeniería: un diseño simple que resuelve muchos problemas a la vez. La próxima vez que camines junto a una, no solo la pases de largo. Ese círculo de metal es más inteligente de lo que parece." },
      ] },
    ],
  },
  "how-roller-coasters-stay-on-track": {
    ...localizedBlogArticles.en["how-roller-coasters-stay-on-track"],
    title: "Cómo las Montañas Rusas Se Quedan en el Carril",
    category: "Ingeniería",
    readTime: common.es.minutes.m5,
    imageAlt: "Una montaña rusa con bajadas empinadas y loopings contra un cielo brillante, que muestra el diseño de la pista que mantiene a los pasajeros a bordo de forma segura",
    imageCaption: "Las montañas rusas permanecen en la pista porque los ingenieros diseñan la gravedad, el impulso y los sistemas de ruedas multidireccionales para que trabajen juntos.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Las montañas rusas parecen estar rompiendo las reglas. Suben colinas enormes, bajan a toda velocidad, giran de lado y a veces van boca abajo. Entonces, ¿cómo se quedan en la pista? La respuesta es una mezcla de gravedad, impulso, diseño de ruedas e ingeniería de seguridad." },
      ] },
      { title: "La Gravedad Inicia el Recorrido", blocks: [
        { type: "paragraph", text: "La mayoría de las montañas rusas comienzan subiendo una colina grande. Una cadena o sistema de lanzamiento jala el carrito hacia arriba. En la cima, el carrito tiene energía almacenada porque está muy por encima del suelo. Esto se llama energía potencial." },
        { type: "paragraph", text: "Cuando el carrito baja, la gravedad lo jala hacia abajo. Esa energía almacenada se convierte en movimiento, llamado energía cinética. Por eso la primera bajada es tan importante. Le da al carrito velocidad para el resto del recorrido." },
      ] },
      { title: "El Impulso Lo Mantiene en Movimiento", blocks: [
        { type: "paragraph", text: "Una vez que el carrito está en movimiento, quiere seguir moviéndose. Eso es impulso. El impulso ayuda al carrito a subir colinas más pequeñas, pasar por las curvas y moverse a través de los loopings." },
        { type: "paragraph", text: "Pero la fricción y la resistencia del aire lo frenan con el tiempo. Por eso las montañas rusas están cuidadosamente diseñadas para que el tren tenga suficiente velocidad para terminar la pista de forma segura, pero no tanta que el recorrido se vuelva inseguro." },
      ] },
      { title: "Las Ruedas Hacen Más de lo que Crees", blocks: [
        { type: "paragraph", text: "Un carrito de montaña rusa no solo descansa sobre la pista con ruedas normales. La mayoría de los trenes tienen varios conjuntos de ruedas:" },
        { type: "list", items: [
          "Ruedas en la parte superior de la pista",
          "Ruedas en el lado de la pista",
          "Ruedas inferiores debajo de la pista que mantienen el tren adherido incluso durante los loopings",
        ] },
        { type: "paragraph", text: "Así que cuando el carrito va boca abajo, no está solo esperando que la gravedad se comporte. Está físicamente sujeto a la pista por sistemas de ruedas." },
      ] },
      { title: "¿Por Qué No Caes?", blocks: [
        { type: "paragraph", text: "Las montañas rusas usan sujeciones como barras de regazo, cinturones de seguridad o arneses sobre los hombros. El tipo de sujeción depende del recorrido. Una montaña rusa familiar pequeña puede necesitar solo una barra de regazo. Una con inversiones puede usar un sistema de sujeción más seguro." },
        { type: "paragraph", text: "Los ingenieros diseñan las sujeciones para mantener a los pasajeros seguros mientras permiten que el recorrido se sienta emocionante. Una buena montaña rusa se siente salvaje, pero no es aleatoria." },
      ] },
      { title: "Los Loopings No Son Círculos Perfectos", blocks: [
        { type: "paragraph", text: "Muchos loopings de montaña rusa no son círculos perfectos. A menudo tienen una forma más parecida a una gota alargada. Porque un looping circular perfecto podría crear fuerzas incómodas en la parte inferior y no suficiente velocidad en la parte superior." },
        { type: "paragraph", text: "Un looping con forma de gota ayuda a gestionar las fuerzas sobre los cuerpos de los pasajeros. Hace que el looping sea más seguro y más suave de recorrer." },
      ] },
      { title: "Prueba Esto: Montaña Rusa de Canica", blocks: [
        { type: "paragraph", text: "Usa papel, cartón, cinta adhesiva y una canica. Construye una pista pequeña con una colina y una curva. Prueba qué pasa si la primera colina es demasiado baja, si la curva es demasiado pronunciada o si la pista no es suave. Cada falla te dice algo específico que corregir." },
        { type: "callout", title: "Las Mismas Preguntas, a Menor Escala", accent: "purple", text: "Estás haciendo el mismo tipo de pruebas que hacen los ingenieros de montañas rusas, solo que a menor escala. Cada vez que la canica sale de la pista o se detiene antes de tiempo, eso es información sobre qué necesita cambiar." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Las montañas rusas permanecen en la pista porque los ingenieros diseñan todo el sistema cuidadosamente. La gravedad da velocidad. El impulso lleva el tren. Las ruedas agarran la pista desde múltiples lados. Las sujeciones mantienen a los pasajeros seguros. La forma de la pista controla las fuerzas. La emoción es real. Pero detrás de la emoción hay mucha ingeniería." },
      ] },
    ],
  },
  "why-chairs-break": {
    ...localizedBlogArticles.en["why-chairs-break"],
    title: "¿Por Qué Algunas Sillas Se Rompen y Otras No?",
    category: "Ingeniería",
    readTime: common.es.minutes.m4,
    imageAlt: "Estudiantes construyendo un puente de paletas de madera, probando uniones y distribución de carga, los mismos principios estructurales que gobiernan las sillas",
    imageCaption: "Las sillas y los puentes comparten los mismos problemas de ingeniería: las uniones, los caminos de carga y la elección de materiales determinan si aguantan o fallan.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Una silla tiene un trabajo principal: sostenerte. Eso suena fácil, pero las sillas se rompen todo el tiempo. Las patas se quiebran, los respaldos se fisuran, los tornillos se aflojan y los asientos se doblan. Entonces, ¿por qué algunas sillas duran años mientras otras se rompen rápidamente? Tiene que ver con la ingeniería." },
      ] },
      { title: "Las Sillas Deben Manejar Fuerzas", blocks: [
        { type: "paragraph", text: "Cuando te sientas en una silla, tu peso empuja hacia abajo. La silla tiene que transferir esa fuerza por el asiento, hacia las patas y hasta el suelo. Si la fuerza se distribuye bien, la silla se mantiene resistente. Si demasiada fuerza va hacia un punto débil, la silla puede agrietarse o doblarse." },
        { type: "paragraph", text: "Eso se llama distribución del peso. Una buena silla no solo sostiene el peso. Mueve el peso de forma segura a través de la estructura." },
      ] },
      { title: "Los Materiales Importan", blocks: [
        { type: "paragraph", text: "Las sillas pueden estar hechas de madera, plástico, metal, tela o una combinación de materiales. Cada uno tiene fortalezas y debilidades. La madera puede ser resistente, pero puede partirse si la veta es débil o las uniones son malas. El plástico puede ser ligero y económico, pero el plástico delgado puede agrietarse. El metal puede ser muy resistente, pero puede doblarse si es demasiado delgado o tiene mala forma." },
        { type: "paragraph", text: "Los ingenieros eligen los materiales según el costo, la resistencia, la comodidad, el peso y la apariencia. La mejor silla usa el material correcto en el lugar correcto, no solo el material más resistente en todas partes." },
      ] },
      { title: "Las Uniones Suelen Ser la Parte Más Débil", blocks: [
        { type: "paragraph", text: "Una silla generalmente no se rompe en el medio de una pieza sólida. A menudo se rompe donde las partes se conectan. Estos puntos de conexión se llaman uniones. Una pata de silla puede conectarse al asiento con tornillos, pegamento, pernos, escuadras o formas especiales talladas en la madera." },
        { type: "paragraph", text: "Si las uniones son débiles, toda la silla es débil. Por eso las sillas que se tambalean son señales de advertencia. El tambaleo significa que las uniones se están moviendo cuando no deberían." },
      ] },
      { title: "La Forma Puede Hacer una Silla Más Resistente", blocks: [
        { type: "paragraph", text: "Algunas sillas tienen barras de soporte entre las patas. Estas barras ayudan a evitar que las patas se separen. Otras sillas usan plástico curvado, marcos de metal o soportes triangulares. Los triángulos son formas especialmente resistentes en ingeniería porque no cambian de forma fácilmente." },
        { type: "callout", accent: "purple", text: "Por eso ves triángulos en puentes, torres y a veces en muebles. Una silla puede usar la forma para volverse más resistente sin agregar mucho material extra." },
      ] },
      { title: "Las Pruebas Importan", blocks: [
        { type: "paragraph", text: "Antes de que se venda una silla, los diseñadores pueden probarla agregando peso, balanceándola, dejándola caer o sentándose en ella miles de veces con una máquina. Porque una silla necesita sobrevivir la vida real. La gente se recuesta, gira, se desploma, arrastra las sillas por el suelo y las apila." },
        { type: "paragraph", text: "Una silla que funciona una vez no es suficiente. Una buena silla necesita funcionar una y otra vez." },
      ] },
      { title: "Prueba Esto: Desafío de la Silla de Papel", blocks: [
        { type: "paragraph", text: "Construye una silla con papel y cinta adhesiva que pueda sostener un objeto pequeño, como un juguete o un libro. Prueba diferentes diseños: cuatro patas rectas, patas dobladas, soportes triangulares o tubos de papel enrollado. ¿Qué diseño sostiene más peso?" },
        { type: "callout", title: "Lo Que Descubrirás", accent: "purple", text: "Rápidamente verás que la forma y las uniones importan tanto como el material. Una silla simple bien diseñada a menudo supera a una compleja con malas uniones." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Algunas sillas se rompen porque las fuerzas no están bien manejadas. Otras duran porque los ingenieros eligieron materiales resistentes, formas inteligentes y uniones sólidas. Una silla puede parecer ordinaria, pero cada vez que sostiene a alguien, está haciendo trabajo de ingeniería." },
      ] },
    ],
  },
  "hidden-engineering-water-bottle": {
    ...localizedBlogArticles.en["hidden-engineering-water-bottle"],
    title: "La Ingeniería Oculta de una Botella de Agua",
    category: "Ingeniería",
    readTime: common.es.minutes.m6,
    imageAlt: "Una botella de plástico transparente que muestra sus lados con crestas, cuello con rosca y diseño de base estructural",
    imageCaption: "Una botella de agua desechable pesa unos pocos gramos pero contiene miles de veces su propio peso en líquido. Cada cresta, rosca y grosor de pared tiene una razón de ser.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Una botella de plástico de agua de un solo uso parece uno de los objetos más simples del mundo. Contiene agua. Bebes de ella. Listo. Pero desde la perspectiva de la ciencia de materiales, es una maravilla de la ingeniería." },
        { type: "paragraph", text: "La mayoría de las botellas desechables pesan solo unos pocos gramos, pero pueden sobrevivir el transporte, las caídas, el apretujamiento y los cambios de presión. Las botellas para bebidas carbonatadas tienen que manejar aún más presión interna. También necesitan mantener el agua limpia, sellar herméticamente, ser fáciles de sostener y aun así ser suficientemente baratas para fabricarse por miles de millones." },
        { type: "callout", title: "El Gran Compromiso", accent: "purple", text: "El mismo diseño que hace que las botellas de plástico de un solo uso sean ligeras, resistentes y económicas también crea serios problemas de residuos y posibles preocupaciones de exposición al plástico." },
      ] },
      { title: "La Proeza de Ingeniería", blocks: [
        { type: "paragraph", text: "El plástico más común utilizado para las botellas de agua desechables es el tereftalato de polietileno, o PET. El PET es claro, liviano, moldeable y resistente para su peso. Esa combinación permite a los fabricantes hacer paredes extremadamente delgadas sin que la botella sea inútilmente frágil." },
        { type: "numbered", items: [
          { title: "Ligera y resistente", body: "Una botella de PET puede contener miles de veces su propio peso en líquido. El plástico se estira y moldea de modo que las largas cadenas de polímeros se alinean de maneras que mejoran la resistencia." },
          { title: "Delgada pero consciente de la presión", body: "Las crestas, curvas, hombros y formas de la base ayudan a la botella a resistir el aplastamiento. Las botellas carbonatadas usan una geometría especialmente cuidadosa porque el gas atrapado empuja hacia afuera en cada pared." },
          { title: "Rápida de fabricar", body: "Las máquinas industriales calientan pequeñas preformas de PET, las soplan en moldes de botella, las llenan, las tapan y las etiquetan a una velocidad increíblemente alta. Por eso el agua potable envasada se volvió tan ampliamente disponible." },
        ] },
      ] },
      { title: "La Forma No Es Aleatoria", blocks: [
        { type: "paragraph", text: "Las botellas de agua necesitan ser fáciles de sostener, fáciles de empacar y suficientemente resistentes para no aplastarse. Algunas botellas tienen ranuras o curvas en el centro. Estas hacen que la botella sea más fácil de agarrar, especialmente si tus manos están mojadas." },
        { type: "paragraph", text: "La forma también afecta cómo la botella maneja la presión. Una botella completamente lisa y delgada podría aplastarse demasiado fácilmente. Las crestas pueden hacer la botella más resistente sin agregar mucho plástico extra. Eso significa que la botella puede usar menos material mientras sigue haciendo su trabajo." },
      ] },
      { title: "La Física de la Tapa", blocks: [
        { type: "paragraph", text: "Mira de cerca la parte superior de una botella con tapa de rosca. Verás crestas en espiral. Estas se llaman roscas. La tapa tiene roscas correspondientes adentro. Cuando giras la tapa, las roscas jalan la tapa hacia abajo sobre la botella." },
        { type: "paragraph", text: "Esa fuerza hacia abajo comprime una pequeña superficie de sellado cerca de la abertura. El objetivo es un cierre hermético: un sello lo suficientemente apretado para ayudar a prevenir fugas, pérdida de carbonatación y contaminación del aire exterior o bacterias." },
        { type: "paragraph", text: "Ese pequeño diseño de giro es una máquina simple. Convierte tu movimiento giratorio en fuerza hacia abajo. Más fuerza con menos esfuerzo es lo que hacen las máquinas simples." },
      ] },
      { title: "¿Por Qué el Plástico Es Más Grueso en Algunos Lugares?", blocks: [
        { type: "paragraph", text: "No todas las partes de una botella necesitan el mismo grosor. La base puede necesitar ser más resistente para que la botella pueda pararse. La parte superior necesita ser lo suficientemente resistente para que la tapa selle bien. Los lados pueden ser más delgados para ahorrar peso y material." },
        { type: "paragraph", text: "Los ingenieros tienen que equilibrar resistencia, costo, comodidad y residuos. Si la botella es demasiado delgada, se aplasta. Si es demasiado gruesa, usa más plástico del necesario. Un buen diseño a menudo significa usar solo el material suficiente en los lugares correctos." },
      ] },
      { title: "La Abertura Importa", blocks: [
        { type: "paragraph", text: "Una abertura de botella no puede ser demasiado pequeña o será molesto beber de ella. Pero si es demasiado ancha, puede derramarse fácilmente. Las botellas reutilizables suelen tener aberturas más anchas para que sean más fáciles de limpiar o llenar con hielo. Las botellas desechables generalmente tienen aberturas más pequeñas para facilitar el beber y reducir los derrames." },
        { type: "paragraph", text: "Incluso el tamaño de la abertura es una decisión de ingeniería." },
      ] },
      { title: "Etiquetas y Agarre", blocks: [
        { type: "paragraph", text: "Algunas botellas tienen etiquetas envueltas alrededor. La etiqueta no es solo para la marca. También puede agregar agarre. Las botellas reutilizables pueden usar goma, plástico texturizado, metal o superficies con recubrimiento en polvo para que sean más fáciles de sostener. Una botella resbaladiza es mal diseño, especialmente para niños, deportes o senderismo." },
      ] },
      { title: "Los Compromisos y Preocupaciones de Salud", blocks: [
        { type: "paragraph", text: "El éxito de la ingeniería no significa que no haya problemas. Las botellas de plástico de un solo uso crean costos ambientales, y los científicos todavía están estudiando qué pueden significar para la salud humana las pequeñas partículas de plástico." },
        { type: "numbered", items: [
          { title: "Partículas de microplástico y nanoplástico", body: "Estudios de microscopía avanzada han encontrado que el agua embotellada puede contener muchas más partículas plásticas diminutas de lo que los métodos más antiguos podían contar. Un equipo de investigación de Columbia y Rutgers reportó un promedio de unas 240,000 partículas de plástico detectables por litro en agua embotellada analizada, la mayoría nanoplásticos." },
          { title: "Fricción de la tapa", body: "Abrir y cerrar una tapa de botella crea fricción entre las roscas de plástico. La investigación revisada por pares ha mostrado que esta interacción tapa-botella puede generar partículas adicionales de microplástico." },
          { title: "Lixiviación de químicos", body: "El calor, la luz solar, el almacenamiento prolongado o reutilizar una botella diseñada para un solo uso pueden aumentar la preocupación sobre la degradación del plástico y los aditivos químicos que pasan al agua. Los efectos exactos en la salud de los microplásticos y nanoplásticos todavía se están estudiando." },
          { title: "Impacto ambiental", body: "El PET es técnicamente reciclable, pero muchas botellas de un solo uso no se reciclan realmente. Las botellas que se convierten en basura pueden persistir durante mucho tiempo en basureros, vías fluviales y océanos." },
        ] },
        { type: "callout", title: "La Ingeniería Implica Compromisos", accent: "purple", text: "Una botella desechable es brillante para ser ligera, sellada, resistente y económica. Es mucho peor para desaparecer después de que la usas." },
      ] },
      { title: "Cómo Reducir la Exposición al Plástico", blocks: [
        { type: "paragraph", text: "No necesitas entrar en pánico ni dejar de beber agua de una botella de plástico cuando es la opción segura disponible. Pero si quieres reducir la exposición diaria al plástico, hay cambios simples." },
        { type: "list", items: [
          "Usa una botella de vidrio o acero inoxidable para la hidratación diaria.",
          "Evita dejar botellas de plástico de un solo uso en autos calientes o bajo la luz solar directa.",
          "No reutilices repetidamente botellas diseñadas para un solo uso.",
          "Usa un filtro de agua casero certificado si el agua de tu grifo local es segura pero quieres tratamiento adicional.",
          "Recicla las botellas de PET cuando el reciclaje local las acepte, y elige estaciones de recarga cuando sea posible.",
        ] },
      ] },
      { title: "Prueba Esto: Prueba de Diseño de Botella", blocks: [
        { type: "paragraph", text: "Compara dos botellas diferentes: una botella desechable y una reutilizable si tienes ambas. Observa la forma de la tapa, la textura del agarre, el diseño de la base, el grosor de las paredes, el tamaño de la abertura, qué tan fácil es apretarla, qué tan estable es al pararse y qué tan fácil sería limpiarla." },
        { type: "callout", title: "No Hay Una Respuesta Perfecta", accent: "purple", text: "No hay una sola respuesta correcta aquí. Una botella de senderismo prioriza la durabilidad. La de un niño prioriza el agarre y la resistencia a los derrames. Una botella desechable prioriza el costo y el peso. Reconocer esos compromisos es lo que hacen los ingenieros." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Una botella de agua no es solo un recipiente. Es un pequeño proyecto de ingeniería. Necesita contener líquido, evitar fugas, caber en tu mano, pararse erguida, sobrevivir caídas y usar los materiales sabiamente. También nos recuerda que las decisiones de ingeniería tienen consecuencias después de que el producto sale de nuestras manos." },
        { type: "paragraph", text: "La próxima vez que tomes un sorbo, mira la botella por un momento. Incluso algo ordinario puede estar lleno de ingeniería oculta y compromisos ocultos." },
      ] },
    ],
  },
  "can-ai-actually-think": {
    ...localizedBlogArticles.en["can-ai-actually-think"],
    title: "¿La IA Realmente Puede Pensar?",
    category: "IA",
    readTime: common.es.minutes.m5,
    imageAlt: "Una visualización abstracta de la inteligencia artificial, con un cerebro digital o patrón de red neuronal que representa el aprendizaje automático y el reconocimiento de patrones",
    imageCaption: "La IA puede reconocer patrones y generar respuestas, pero eso es diferente a pensar como lo hacen los humanos. Predice; no comprende.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Cuando le haces una pregunta a una IA, puede parecer que está pensando. Podrías escribir «Explícame los agujeros negros como si tuviera 10 años» y segundos después te da una respuesta. Puedes pedirle que escriba un cuento, que te ayude con matemáticas, que haga una imagen o que sugiera ideas para un proyecto de ciencias. Eso puede sentirse bastante mágico." },
        { type: "paragraph", text: "Pero aquí está la gran pregunta: ¿la IA realmente está pensando? La respuesta es: no de la misma manera que las personas." },
        { type: "paragraph", text: "La IA puede hacer algunas cosas increíbles, pero no tiene un cerebro como el tuyo. No tiene sentimientos, recuerdos de su propia vida, imaginación como la tienen los humanos, ni una comprensión real del mundo. En cambio, la IA es muy buena para notar patrones." },
      ] },
      { title: "¿Qué Es el Reconocimiento de Patrones?", blocks: [
        { type: "paragraph", text: "El reconocimiento de patrones significa encontrar cosas que se repiten. Usas el reconocimiento de patrones todo el tiempo. Por ejemplo, si ves nubes oscuras, escuchas truenos y sientes que el viento aumenta, podrías pensar «probablemente va a llover». Notaste un patrón de cosas que has visto antes." },
        { type: "paragraph", text: "La IA hace algo similar, pero con enormes cantidades de información. Imagina leer miles de libros, artículos, sitios web, conversaciones y ejemplos. Con el tiempo, podrías empezar a notar qué palabras suelen ir juntas, qué respuestas suelen seguir ciertas preguntas y qué tipos de ideas están conectadas." },
        { type: "paragraph", text: "La IA aprende patrones a partir de datos. Luego, cuando le haces una pregunta, usa esos patrones para adivinar qué respuesta debería venir a continuación. Eso puede hacer que la IA suene inteligente. Pero sonar inteligente no es lo mismo que pensar como una persona." },
      ] },
      { title: "¿En Qué Se Diferencia el Pensamiento Humano?", blocks: [
        { type: "paragraph", text: "Los humanos hacemos más que reconocer patrones. Podemos preguntarnos cosas. Podemos preocuparnos por las personas. Podemos sentir confusión, emoción, nerviosismo, orgullo o curiosidad. Podemos decidir que algo nos importa. Podemos cambiar de opinión por una experiencia personal. Podemos notar cuando algo parece injusto o cuando un amigo necesita ayuda." },
        { type: "paragraph", text: "La IA no hace esas cosas de la manera en que los humanos lo hacemos. Por ejemplo, si construyes un puente de paletas y colapsa, podrías sentirte decepcionado. Luego podrías pensar «tal vez el centro necesita más soporte» y probar un nuevo diseño. Estás usando lógica, memoria, emoción, creatividad y experiencia al mismo tiempo." },
        { type: "paragraph", text: "La IA puede sugerir razones por las que el puente colapsó. Podría decir que la estructura necesitaba triángulos más resistentes o mejor distribución del peso. Pero no siente la frustración de ver caer el puente. No aprende del momento de la misma manera que tú." },
      ] },
      { title: "¿La IA Entiende Lo Que Dice?", blocks: [
        { type: "paragraph", text: "La IA puede explicar qué es un volcán. Puede escribir un poema sobre una tortuga. Puede responder preguntas sobre los planetas. Pero eso no significa que entienda esas cosas como lo hace una persona." },
        { type: "paragraph", text: "Piensa en el autocorrector de un teléfono. Si escribes «Voy a la», tu teléfono podría sugerir «tienda», «escuela» o «casa». No está pensando en tu día. Está prediciendo qué palabra podría venir a continuación." },
        { type: "callout", accent: "teal", text: "La IA funciona de una manera más avanzada, pero la idea básica es similar. Predice palabras, oraciones e ideas basándose en patrones que ha aprendido. Por eso la IA a veces puede dar una gran respuesta y otras veces una muy extraña." },
      ] },
      { title: "Un Ejemplo Simple", blocks: [
        { type: "paragraph", text: "Imagina que le preguntas a la IA: «¿Puede un pez montar una bicicleta?» Un humano podría reírse y decir «No, los peces no tienen piernas y las bicicletas son para la tierra». La IA también podría decir que no. Pero no lo dice porque ha visto a un pez intentar montar una bicicleta. Está usando patrones del lenguaje y los hechos que ha aprendido." },
        { type: "paragraph", text: "Ahora imagina que le preguntas: «Escribe un cuento gracioso sobre un pez montando una bicicleta». La IA podría escribir uno. Puede cambiar del modo de hechos al modo de cuento porque reconoce qué tipo de respuesta estás pidiendo. Eso es útil, pero también significa que debes ser claro con la IA. La manera en que preguntas cambia el tipo de respuesta que obtienes." },
      ] },
      { title: "Entonces, ¿La IA Es Inteligente?", blocks: [
        { type: "paragraph", text: "La IA puede ser inteligente en ciertas tareas. Puede encontrar patrones rápidamente, organizar información, ayudar a generar ideas, explicar temas de diferentes maneras, resumir textos, escribir código, traducir idiomas y ayudar a las personas a aprender." },
        { type: "paragraph", text: "Pero la IA no es inteligente en todos los sentidos. No sabe lo que es ser un niño, cometer un error, ayudar a un amigo, ganar un juego o sentirse orgulloso después de construir algo que finalmente funciona. No tiene sentido común como las personas. También puede estar equivocada con seguridad. Eso significa que la IA es una herramienta, no un reemplazo de tu cerebro." },
      ] },
      { title: "Piensa en la IA Como una Súper Calculadora de Palabras", blocks: [
        { type: "paragraph", text: "Una calculadora puede resolver problemas de matemáticas muy rápidamente. Pero una calculadora no sabe por qué necesitas la respuesta. No sabe si escribiste los números incorrectamente. No sabe si la respuesta tiene sentido en la vida real." },
        { type: "paragraph", text: "La IA es similar, excepto que en lugar de solo trabajar con números, trabaja con palabras, imágenes, código y patrones. Puede ayudarte a pensar, pero no debería hacer todo tu pensamiento por ti." },
      ] },
      { title: "Prueba Esto", blocks: [
        { type: "paragraph", text: "Hazle estas tres preguntas a una IA:" },
        { type: "list", items: [
          "Explica cómo vuela un avión de papel.",
          "Explica cómo vuela un avión de papel como si estuviera en 2º grado.",
          "Inventa un cuento gracioso sobre un avión de papel que va a Marte.",
        ] },
        { type: "paragraph", text: "Observa cómo cambian las respuestas. La IA no se está convirtiendo repentinamente en un maestro, un niño pequeño o un cuentacuentos. Está cambiando su respuesta basándose en el patrón de tu pregunta." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "La IA no piensa como un humano. Reconoce patrones, predice respuestas y crea respuestas basándose en lo que ha aprendido de los datos. Eso puede ser poderoso, útil y divertido. Pero los humanos todavía aportamos algo que la IA no tiene: comprensión real, creatividad, juicio, sentimientos y responsabilidad." },
        { type: "callout", accent: "teal", text: "La IA puede ayudarte a pensar, pero tu cerebro sigue siendo la herramienta más importante del salón." },
      ] },
    ],
  },
  "why-ai-sometimes-gets-things-wrong": {
    ...localizedBlogArticles.en["why-ai-sometimes-gets-things-wrong"],
    title: "Por Qué la IA a Veces Se Equivoca",
    category: "IA",
    readTime: common.es.minutes.m5,
    imageAlt: "Una representación visual de la IA produciendo un resultado incorrecto o confuso, ilustrando el concepto de alucinación y error de la IA",
    imageCaption: "La IA no sabe las cosas de la manera en que las saben las personas. Predice, y a veces sus predicciones están equivocadas con seguridad.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "La IA puede responder preguntas muy rápido. Puedes pedirle que explique dinosaurios, escriba un cuento, ayude con código o sugiera un proyecto de ciencias. A veces la respuesta es útil. A veces suena segura. Y a veces simplemente está equivocada." },
        { type: "paragraph", text: "Eso puede ser confuso. Si la IA es tan avanzada, ¿por qué sigue cometiendo errores? La respuesta es que la IA en realidad no sabe las cosas de la manera en que las saben las personas. Hace predicciones basadas en patrones. La mayoría de las veces, esos patrones llevan a respuestas útiles. Pero a veces llevan a errores." },
      ] },
      { title: "La IA Puede Adivinar Mal", blocks: [
        { type: "paragraph", text: "Cuando le haces una pregunta a la IA, intenta crear una respuesta que se adapte a tu solicitud. Mira los patrones que aprendió de muchos ejemplos y predice qué palabras deberían venir a continuación. Eso significa que la IA a menudo está haciendo una suposición muy fundamentada." },
        { type: "paragraph", text: "Por ejemplo, si preguntas «¿Cuál es la montaña más alta del mundo?», la IA probablemente dirá el Monte Everest. Ese es un hecho común con muchos ejemplos detrás. Pero si preguntas algo muy específico, la IA puede no saberlo. Si intenta responder de todas formas, puede inventar algo. Esa es una razón por la que la IA se equivoca: puede responder incluso cuando debería decir «no estoy segura»." },
      ] },
      { title: "¿Qué Es una Alucinación?", blocks: [
        { type: "paragraph", text: "Cuando la IA inventa información y la presenta como si fuera verdadera, a esto se le llama alucinación. Esto no significa que la IA esté viendo cosas como podría hacerlo una persona. Significa que la IA creó una respuesta que suena real pero en realidad no es correcta." },
        { type: "paragraph", text: "Por ejemplo, la IA podría inventar:" },
        { type: "list", items: [
          "Un título de libro falso",
          "Una fecha incorrecta",
          "Una cita inventada",
          "Un hecho científico que suena creíble pero es falso",
          "Una fuente que no existe",
        ] },
        { type: "callout", accent: "teal", text: "La parte difícil es que las alucinaciones de la IA pueden sonar muy seguras. Por eso los humanos todavía necesitan verificar las respuestas importantes." },
      ] },
      { title: "Los Datos Malos Pueden Llevar a Respuestas Malas", blocks: [
        { type: "paragraph", text: "La IA aprende de datos. Los datos significan ejemplos, texto, imágenes, números e información. Pero no todos los datos son buenos. Alguna información en línea es antigua. Alguna está sesgada. Alguna está incompleta. Alguna es simplemente incorrecta. Si la IA aprende patrones de información desordenada, a veces puede repetir esos errores." },
        { type: "paragraph", text: "Piensa en aprender de un cuaderno donde algunas páginas son correctas y algunas tienen respuestas incorrectas. Si estudias de ese cuaderno sin verificar, podrías aprender accidentalmente la cosa incorrecta. La IA tiene un problema similar. Puede aprender de información útil, pero también puede aprender errores, estereotipos, hechos desactualizados o ejemplos confusos." },
      ] },
      { title: "La IA No Siempre Entiende la Pregunta", blocks: [
        { type: "paragraph", text: "A veces la IA se equivoca porque la pregunta no es clara. Imagina que alguien te pregunta «¿Qué tan grande es?» Probablemente preguntarías «¿Qué tan grande es qué?» La IA podría intentar adivinar qué significa «eso». Si la suposición es incorrecta, toda la respuesta puede ser incorrecta." },
        { type: "paragraph", text: "Por eso importan las instrucciones. Lo que escribes o dices a la IA se llama instrucción o «prompt». Las instrucciones claras generalmente llevan a mejores respuestas. En lugar de preguntar «Háblame sobre la energía», podrías preguntar «Explica la diferencia entre energía renovable y no renovable para un niño de 4º grado». Eso le da a la IA más orientación." },
      ] },
      { title: "La IA Puede Confundir Cosas Similares", blocks: [
        { type: "paragraph", text: "La IA es excelente con los patrones, pero a veces confunde cosas que se parecen o suenan similar. Podría confundir dos figuras históricas con nombres similares, mezclar el título de una película con el de un libro, o explicar un concepto científico usando palabras que suenan correctas pero que no encajan bien." },
        { type: "paragraph", text: "Esto sucede porque la IA no tiene comprensión de la vida real. No está mirando el mundo directamente como tú lo haces. Algunos sistemas de IA tampoco conocen automáticamente la información más reciente. Para descubrimientos, reglas o eventos recientes, siempre consulta fuentes actuales de confianza." },
      ] },
      { title: "¿Cómo Puedes Verificar las Respuestas de la IA?", blocks: [
        { type: "callout", title: "Una Regla Simple", accent: "teal", text: "Usa la IA como ayudante, no como el juez final. Cuando la IA te dé una respuesta, especialmente sobre la escuela, seguridad, salud o noticias, verifícala." },
        { type: "paragraph", text: "Puedes preguntar: ¿de dónde vino esa información? ¿Puedo encontrar la misma respuesta en un sitio web de confianza? ¿Esto coincide con lo que dijo mi maestro? ¿Esto realmente tiene sentido?" },
        { type: "paragraph", text: "Prueba la regla de las tres verificaciones: ¿tiene sentido? ¿Otra fuente de confianza puede confirmarlo? ¿Estaría de acuerdo un maestro, padre o experto? Si la respuesta falla una de esas verificaciones, ve más despacio." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "La IA se equivoca porque predice y adivina, aprende de datos imperfectos, malinterpreta preguntas poco claras, confunde ideas similares y a veces carece de información actual. Eso no hace que la IA sea inútil. Solo significa que necesitamos usarla con sabiduría." },
        { type: "callout", accent: "teal", text: "La IA puede ayudarte a aprender más rápido y generar ideas. Pero tu trabajo es mantenerte curioso y preguntar: ¿cómo sé que esto es verdad?" },
      ] },
    ],
  },
  "how-does-your-phone-recognize-your-face": {
    ...localizedBlogArticles.en["how-does-your-phone-recognize-your-face"],
    title: "¿Cómo Reconoce tu Teléfono tu Cara?",
    category: "IA",
    readTime: common.es.minutes.m5,
    imageAlt: "Una pantalla de iPhone que muestra la interfaz de configuración de Face ID con un escaneo facial en progreso, ilustrando cómo el teléfono mapea la geometría facial",
    imageCaption: "El Face ID mapea miles de puntos en tu cara y los compara con un modelo 3D almacenado, usando el mismo tipo de reconocimiento de patrones que está en el corazón de la IA moderna.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Desbloquear un teléfono con tu cara puede sentirse como magia. Lo levantas, miras la pantalla y de repente se abre. Sin contraseña. Sin escribir. Solo tu cara." },
        { type: "paragraph", text: "Pero tu teléfono no está pensando «¡Oh, ese es mi amigo!». No te reconoce de la misma manera que tu familia o tus amigos. En cambio, tu teléfono usa cámaras, sensores, patrones y aprendizaje automático para decidir si la cara frente a él coincide con la cara que ha guardado." },
      ] },
      { title: "Tu Cara Tiene Patrones", blocks: [
        { type: "paragraph", text: "Cada cara tiene patrones. Tus ojos están a cierta distancia entre sí. Tu nariz tiene una cierta forma. Tu mandíbula, mejillas, frente y boca crean una disposición única. La tecnología de reconocimiento facial busca patrones en esas características." },
        { type: "paragraph", text: "Tu teléfono tiene un patrón de cara guardado. Cuando lo miras, verifica el nuevo patrón contra el guardado. Si coinciden lo suficiente, el teléfono se desbloquea. Piénsalo como un juego de emparejamiento muy avanzado." },
      ] },
      { title: "¿Qué Pasa Cuando Lo Configuras?", blocks: [
        { type: "paragraph", text: "Cuando configuras el reconocimiento facial por primera vez, tu teléfono te pide que muevas la cabeza o mires desde diferentes ángulos. Eso es porque tu cara no siempre luce exactamente igual. A veces estás con luz brillante. A veces estás en la sombra. A veces usas lentes." },
        { type: "paragraph", text: "El teléfono necesita aprender un patrón sólido de tu cara desde diferentes vistas. De esa manera, puede reconocerte más tarde incluso cuando las condiciones cambian." },
      ] },
      { title: "Las Cámaras y los Sensores Ayudan", blocks: [
        { type: "paragraph", text: "Una cámara normal toma una foto. Pero algunos teléfonos también usan sensores adicionales. Estos sensores pueden ayudar a medir la profundidad, es decir, qué tan lejos están las diferentes partes de tu cara. Eso puede ayudar al teléfono a distinguir entre una cara real y una foto plana." },
        { type: "paragraph", text: "Imagina mirar un dibujo de papel de un cubo versus un cubo real hecho de bloques. Un cubo real tiene profundidad. Un dibujo plano no. Algunos sistemas de reconocimiento facial usan la profundidad para hacer el reconocimiento más seguro y preciso." },
      ] },
      { title: "¿Dónde Entra el Aprendizaje Automático?", blocks: [
        { type: "paragraph", text: "El aprendizaje automático es un tipo de IA que ayuda a las computadoras a aprender patrones a partir de ejemplos. Para el reconocimiento facial, el aprendizaje automático ayuda al teléfono a entender qué tipos de patrones pertenecen a tu cara y cómo esos patrones podrían cambiar en diferentes situaciones." },
        { type: "paragraph", text: "Por ejemplo, tu cara podría verse un poco diferente si sonríes, usas un sombrero, inclinas la cabeza o te cortas el pelo. El aprendizaje automático ayuda al sistema a manejar pequeños cambios sin confundirse cada vez." },
      ] },
      { title: "Por Qué La Privacidad Importa", blocks: [
        { type: "paragraph", text: "El reconocimiento facial es útil, pero también plantea preguntas importantes sobre la privacidad. Tu cara es diferente de una contraseña. Si alguien aprende tu contraseña, puedes cambiarla. Pero no puedes cambiar tu cara fácilmente." },
        { type: "callout", accent: "teal", text: "Por eso las empresas, las escuelas, las aplicaciones y los dispositivos necesitan ser cuidadosos con el reconocimiento facial. Deben explicar qué datos recopilan, cómo se almacenan y quién puede acceder a ellos. Los niños deben preguntarle a un adulto antes de usar aplicaciones que escaneen caras." },
      ] },
      { title: "¿El Reconocimiento Facial Puede Cometer Errores?", blocks: [
        { type: "paragraph", text: "Sí. El reconocimiento facial a veces puede fallar. Puede que no se desbloquee cuando debería, o puede tener dificultades con poca luz. Algunos sistemas también han funcionado con menos precisión para ciertos grupos de personas, especialmente si no fueron entrenados con una amplia variedad de caras." },
        { type: "paragraph", text: "Por eso la tecnología necesita que los humanos la prueben, la mejoren y la usen de manera responsable." },
      ] },
      { title: "Prueba Este Experimento Mental", blocks: [
        { type: "paragraph", text: "Imagina que estás diseñando un sistema de desbloqueo facial. ¿Qué debería hacer si:" },
        { type: "list", items: [
          "El cuarto está oscuro?",
          "La persona usa lentes de sol?",
          "Alguien sostiene una foto del usuario?",
          "Gemelos intentan desbloquear el mismo teléfono?",
          "La cara del usuario cambia a medida que crece?",
        ] },
        { type: "paragraph", text: "Estos son problemas de ingeniería reales. Los diseñadores tienen que pensar en precisión, seguridad, equidad y privacidad al mismo tiempo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Tu teléfono reconoce tu cara buscando patrones, no entendiéndote como lo haría una persona. Usa cámaras y sensores para recopilar información, aprendizaje automático para entender los patrones faciales y reglas de seguridad para decidir si desbloquear." },
        { type: "callout", accent: "teal", text: "Antes de usar aplicaciones que escanean caras o compartir datos faciales, siempre es inteligente preguntar: ¿adónde va esta información y quién puede verla?" },
      ] },
    ],
  },
  "why-does-autocorrect-make-weird-mistakes": {
    ...localizedBlogArticles.en["why-does-autocorrect-make-weird-mistakes"],
    title: "¿Por Qué el Autocorrector Comete Errores Raros?",
    category: "IA",
    readTime: common.es.minutes.m4,
    imageAlt: "Estudiantes en un taller de IA de Avanza STEM discutiendo cómo funcionan los sistemas de predicción",
    imageCaption: "El autocorrector y la IA comparten la misma idea central: ambos predicen lo que debería venir después según los patrones del lenguaje.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "El autocorrector puede ser útil. Escribes 'pra' y lo corrige a 'para'. Escribes rápido, te saltas una letra, y tu teléfono te salva del error." },
        { type: "paragraph", text: "Pero a veces el autocorrector hace algo extraño. Intentas escribir 'voy a llevar botanas' y cambia una palabra por algo completamente diferente. ¿Por qué comete errores el autocorrector? La respuesta es que el autocorrector predice palabras. No entiende de verdad lo que quieres decir." },
      ] },
      { title: "El Autocorrector Es una Herramienta de Predicción", blocks: [
        { type: "paragraph", text: "El autocorrector mira lo que escribiste y adivina qué quisiste decir. Si escribes 'definitvamente', puede adivinar 'definitivamente'. Eso es útil porque la palabra mal escrita se parece a la correcta." },
        { type: "paragraph", text: "Usa patrones del lenguaje para hacerse preguntas como: ¿qué palabra se parece a esta ortografía? ¿Qué palabra suele ir después de la anterior? ¿Qué palabras usa seguido esta persona? ¿Cuál es la oración más probable? Funciona muchas veces, pero no siempre." },
      ] },
      { title: "Las Computadoras No Entienden las Palabras Como las Personas", blocks: [
        { type: "paragraph", text: "Tú entiendes las palabras porque las conectas con la vida real. Si alguien dice 'perro', quizás piensas en una mascota, ladridos, pelo, correr o un perro que conoces. Entiendes el significado porque tienes experiencias." },
        { type: "paragraph", text: "El autocorrector no tiene experiencias. No sabe cómo se siente un perro, qué significa un chiste o por qué el nombre de tu amigo se escribe de cierta manera. Solo ve letras, palabras y patrones. Por eso puede cambiar una palabra que estaba correcta: no entiende tu intención. Solo cree que otra palabra es más probable." },
      ] },
      { title: "Los Nombres y el Argot Confunden al Autocorrector", blocks: [
        { type: "paragraph", text: "Los nombres son uno de los mayores retos del autocorrector. Quizás tu amigo tiene un nombre con una ortografía poco común. Quizás el nombre de tu ciudad, escuela o equipo no está en el diccionario del teléfono. El autocorrector puede intentar 'corregirlo' por una palabra más común, aunque el nombre estuviera bien." },
        { type: "paragraph", text: "Las personas también usan el lenguaje de forma creativa. Los niños hacen chistes. Los amigos usan jerga. Las familias tienen apodos. El autocorrector puede no entender nada de eso. Si escribes una palabra inventada como broma, puede reemplazarla con algo aburrido o incorrecto." },
      ] },
      { title: "¿Por Qué a Veces Mejora?", blocks: [
        { type: "paragraph", text: "¿Has notado que tu teléfono aprende una palabra que usas mucho? Puede pasar porque algunos sistemas de autocorrección se adaptan a tu forma de escribir. Si usas seguido un nombre o frase, tu teléfono puede dejar de cambiarlo." },
        { type: "paragraph", text: "Eso es el aprendizaje automático en acción. El sistema nota tus patrones y se ajusta. Pero esto también puede causar problemas divertidos: si siempre escribes un error tipográfico por accidente, tu teléfono puede empezar a pensar que ese error es correcto." },
      ] },
      { title: "El Autocorrector y la IA Están Relacionados", blocks: [
        { type: "paragraph", text: "El autocorrector no es lo mismo que un chatbot de IA completo, pero están relacionados de una manera importante: ambos usan predicción. El autocorrector predice palabras u ortografía. Los chatbots de IA predicen respuestas más largas, oraciones y explicaciones. Ninguno entiende el lenguaje exactamente como lo hacen los humanos." },
        { type: "callout", accent: "teal", text: "Una persona puede preguntar '¿espera, qué quisiste decir?' y notar el sarcasmo, la emoción y el contexto. Una computadora intenta inferir esas cosas a partir de patrones, pero aún puede confundirse." },
      ] },
      { title: "Inténtalo", blocks: [
        { type: "paragraph", text: "Escribe una oración tonta usando palabras inventadas, nombres o jerga. Mira qué intenta cambiar el autocorrector. Luego pregúntate: ¿por qué eligió esa palabra? ¿Estaba usando la ortografía? ¿Frases comunes? ¿Una palabra que ya vio antes?" },
        { type: "paragraph", text: "Así piensan los ingenieros. No solo notan que algo falló. Preguntan por qué pasó." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "El autocorrector comete errores raros porque predice patrones del lenguaje en lugar de entender de verdad el significado. Puede corregir errores tipográficos, ahorrar tiempo y aprender de tu forma de escribir. Pero también puede cambiar palabras correctas por incorrectas." },
        { type: "callout", accent: "teal", text: "El autocorrector es útil, pero tu cerebro es el editor. Antes de enviar, siempre lee tu mensaje una vez más." },
      ] },
    ],
  },
  "what-happens-when-you-ask-ai-a-question": {
    ...localizedBlogArticles.en["what-happens-when-you-ask-ai-a-question"],
    title: "¿Qué Pasa Cuando le Haces una Pregunta a la IA?",
    category: "IA",
    readTime: common.es.minutes.m5,
    imageAlt: "Un estudiante en un taller de IA de Avanza STEM escribiendo una pregunta y leyendo la respuesta de la IA",
    imageCaption: "Lo que pasa entre tu pregunta y la respuesta de la IA es más interesante de lo que parece. Todo se trata de instrucciones, patrones y predicción.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Cuando le haces una pregunta a la IA, puede sentirse como hablar con un robot superinteligente. Escribes '¿Por qué el cielo es azul?' y unos segundos después recibes una respuesta. Pero ¿qué ocurrió exactamente entre tu pregunta y la respuesta?" },
        { type: "paragraph", text: "La IA no abre un pequeño cerebro y piensa como una persona. Sigue un proceso basado en instrucciones, entrenamiento, patrones y predicción. Vamos a analizarlo." },
      ] },
      { title: "Paso 1: Le Das a la IA una Instrucción", blocks: [
        { type: "paragraph", text: "Una instrucción es la pregunta, el mensaje o la orden que le das a la IA. Puede ser simple, como 'Explica la gravedad', o más específica: 'Explica la gravedad a un niño de tercer grado usando un ejemplo de un patio de recreo'." },
        { type: "callout", accent: "teal", text: "La segunda instrucción suele dar una mejor respuesta porque le dice a la IA qué tipo de respuesta quieres. Las instrucciones son como indicaciones a un compañero de equipo. Cuanto más claras sean tus instrucciones, mejor será el resultado." },
      ] },
      { title: "Paso 2: La IA Desglosa Tus Palabras", blocks: [
        { type: "paragraph", text: "La IA mira tu instrucción y la divide en partes más pequeñas. Presta atención a las palabras, el orden de las palabras y los patrones que esas palabras crean." },
        { type: "paragraph", text: "Por ejemplo, si preguntas 'Explica la fotosíntesis para niños', la IA nota: 'Explica' significa que quieres una respuesta didáctica. 'Fotosíntesis' es el tema. 'Para niños' significa que la respuesta debe ser simple y clara. La IA usa esas pistas para decidir qué tipo de respuesta crear." },
      ] },
      { title: "Paso 3: La IA Usa lo que Aprendió Durante el Entrenamiento", blocks: [
        { type: "paragraph", text: "Antes de que la IA pueda responder preguntas, tiene que ser entrenada. El entrenamiento significa que el sistema de IA estudia enormes cantidades de ejemplos: textos, preguntas, respuestas, explicaciones, historias, código y otros tipos de información." },
        { type: "paragraph", text: "Durante el entrenamiento, la IA no memoriza todo. En cambio, aprende patrones: qué palabras suelen ir juntas, cómo se responden normalmente las preguntas, cómo se estructuran las explicaciones, qué hechos suelen estar relacionados y cómo se ven los distintos estilos de escritura. Ese entrenamiento ayuda a la IA a responder cuando le preguntas algo nuevo." },
      ] },
      { title: "Paso 4: La IA Predice una Respuesta", blocks: [
        { type: "paragraph", text: "La IA crea respuestas prediciendo lo que debería venir después. No saca una respuesta terminada de un cajón. Construye la respuesta pieza por pieza. Si preguntas '¿Por qué las plantas necesitan luz solar?', la IA puede predecir que una buena respuesta debe mencionar energía, alimento, hojas y fotosíntesis." },
        { type: "paragraph", text: "Por eso la IA puede explicar temas de muchas maneras diferentes. Puede crear una respuesta corta, una respuesta larga, un poema, una historia, un cuestionario o una guía paso a paso, según tu instrucción." },
      ] },
      { title: "Paso 5: La Respuesta Aparece", blocks: [
        { type: "paragraph", text: "Después de que la IA predice y construye la respuesta, ves el resultado en tu pantalla. Puede parecer fluido y seguro, pero sigue siendo importante recordar cómo fue creado." },
        { type: "paragraph", text: "La IA no es una persona que vivió experiencias, revisó un libro de texto y pensó cuidadosamente sobre qué importa. Es una herramienta que usa patrones para generar una respuesta. Esa respuesta puede ser útil, o puede necesitar verificación." },
      ] },
      { title: "Por Qué las Instrucciones Claras Ayudan", blocks: [
        { type: "paragraph", text: "Las instrucciones mejores suelen llevar a respuestas mejores. En lugar de 'Cuéntame sobre robots', prueba 'Explica la diferencia entre robots e IA para un niño de cuarto grado, con ejemplos'. En lugar de 'Ayuda con ciencia', prueba 'Dame tres ideas sencillas para un proyecto de feria de ciencias sobre imanes usando materiales que pueda encontrar en casa'." },
        { type: "paragraph", text: "La IA funciona mejor cuando le das una tarea clara." },
      ] },
      { title: "Inténtalo", blocks: [
        { type: "paragraph", text: "Hazle a la IA la misma pregunta de tres maneras diferentes:" },
        { type: "list", items: [
          "Explica la electricidad.",
          "Explica la electricidad usando un ejemplo de un tobogán de agua.",
          "Explica la electricidad en cinco oraciones para un niño de tercer grado.",
        ] },
        { type: "paragraph", text: "Compara las respuestas. Verás cuánto cambia la respuesta según la instrucción." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Cuando le haces una pregunta a la IA, le das una instrucción. La IA lee la instrucción, usa patrones del entrenamiento, predice una respuesta y crea una contestación. Puede parecer que piensa, pero en realidad es predicción basada en patrones. Eso hace que la IA sea poderosa, aunque no perfecta." },
        { type: "callout", accent: "teal", text: "La IA puede darte una respuesta, pero tú eres responsable de entenderla. Mantén la curiosidad, escribe instrucciones claras y verifica las respuestas importantes." },
      ] },
    ],
  },
  "should-kids-trust-everything-ai-says": {
    ...localizedBlogArticles.en["should-kids-trust-everything-ai-says"],
    title: "¿Deben los Niños Confiar en Todo lo que Dice la IA?",
    category: "IA",
    readTime: common.es.minutes.m5,
    imageAlt: "Estudiantes en un taller de IA de Avanza STEM discutiendo cuándo confiar y cuándo verificar las respuestas de la IA",
    imageCaption: "Saber cuándo confiar en la IA y cuándo verificarla es una de las habilidades más importantes que los estudiantes pueden aprender en los talleres de IA de Avanza STEM.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "La IA puede ser útil. Puede explicar problemas de tarea, dar ideas para proyectos, escribir historias, responder preguntas y ayudarte a aprender cosas nuevas. Puede sentirse como tener un tutor, bibliotecario y compañero de ideas todo en uno." },
        { type: "paragraph", text: "Pero ¿deben los niños confiar en todo lo que dice la IA? No. La IA puede ser útil, pero no siempre tiene razón. Los niños deben usar la IA con curiosidad y precaución." },
      ] },
      { title: "La IA Puede Sonar Segura Aunque Esté Equivocada", blocks: [
        { type: "paragraph", text: "Una cosa difícil de la IA es que puede sonar muy segura de sí misma. Puede dar una respuesta de manera calmada y clara. Puede usar palabras complicadas. Incluso puede organizar la respuesta en secciones ordenadas." },
        { type: "callout", accent: "teal", text: "Una respuesta ordenada no siempre es una respuesta correcta. La IA puede cometer errores, confundir datos o incluso inventar información. Cuando la IA inventa algo, la gente suele llamarlo alucinación." },
      ] },
      { title: "Piensa Como un Detective", blocks: [
        { type: "paragraph", text: "Usar la IA de manera segura significa pensar como un detective. Un detective no acepta la primera pista sin verificar. Un detective hace preguntas, busca evidencia y compara información." },
        { type: "paragraph", text: "Cuando la IA te da una respuesta, pregúntate:" },
        { type: "list", items: [
          "¿Tiene sentido esto?",
          "¿De dónde vino esta información?",
          "¿Puedo verificarlo en otro lugar?",
          "¿Es esto sobre algo importante?",
          "¿Debería preguntarle a un adulto?",
        ] },
        { type: "paragraph", text: "El objetivo no es tenerle miedo a la IA. El objetivo es usarla con inteligencia." },
      ] },
      { title: "Algunas Preguntas Necesitan Más Cuidado", blocks: [
        { type: "paragraph", text: "Algunas respuestas de la IA son de bajo riesgo. Si le pides a la IA una historia tonta sobre un dragón que ama los hot cakes, no necesitas verificar cada detalle. Es solo por diversión." },
        { type: "paragraph", text: "Pero otros temas necesitan más cuidado. Ten precaución con las respuestas de la IA sobre:" },
        { type: "list", items: [
          "Salud y seguridad",
          "Dinero",
          "Noticias y eventos actuales",
          "Tareas escolares donde la precisión importa",
          "Problemas personales",
          "Información privada",
          "Cualquier cosa que pueda afectar a otra persona",
        ] },
        { type: "paragraph", text: "Para esos temas, la IA no debe ser tu única fuente." },
      ] },
      { title: "Pregúntale a un Adulto de Confianza", blocks: [
        { type: "paragraph", text: "Si no estás seguro de algo que dice la IA, pregúntale a un adulto de confianza. Puede ser un padre, maestro, bibliotecario, entrenador u otro adulto que pueda ayudarte a pensar." },
        { type: "paragraph", text: "La IA puede dar información general, pero no conoce toda tu vida. Un adulto de confianza puede entender mejor la situación. Esto es especialmente importante si la IA da consejos sobre tu cuerpo, sentimientos, amistades, familia, seguridad o decisiones personales." },
      ] },
      { title: "No Compartas Información Privada", blocks: [
        { type: "paragraph", text: "Otra regla importante: no compartas información privada con la IA. La información privada incluye:" },
        { type: "list", items: [
          "Tu nombre completo",
          "Tu domicilio o dirección escolar",
          "Contraseñas",
          "Números de teléfono",
          "Fotos personales",
          "Información privada de tu familia",
          "Cualquier cosa que te incomodaría que desconocidos vieran",
        ] },
        { type: "paragraph", text: "Las herramientas y aplicaciones de IA pueden manejar la información de distintas maneras. Como los niños pueden no saber adónde va esa información, es más seguro no compartir datos privados. Si tienes dudas, pregúntale primero a un adulto." },
      ] },
      { title: "Buenas Formas en Que los Niños Pueden Usar la IA", blocks: [
        { type: "paragraph", text: "La IA puede ser genial cuando se usa de la manera correcta. Puedes pedirle que:" },
        { type: "list", items: [
          "Explique un tema confuso con palabras más sencillas",
          "Dé problemas de práctica de matemáticas",
          "Ayude a generar ideas para proyectos de ciencias",
          "Te haga preguntas antes de un examen",
          "Sugiera preguntas para hacerle a un maestro",
          "Ayude a organizar el esquema de una historia",
          "Explique errores de programación",
          "Dé ejemplos de cómo funciona algo",
        ] },
        { type: "paragraph", text: "El mejor uso de la IA no es copiar. Es aprender. Si la IA te ayuda a entender algo mejor, eso es un logro." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los niños no deben confiar en todo lo que dice la IA. La IA puede ser útil, creativa y divertida, pero también puede equivocarse. Puede sonar segura incluso cuando comete errores." },
        { type: "callout", accent: "teal", text: "Los usuarios inteligentes de la IA no creen todo. Piensan, verifican y hacen preguntas. Usa la IA como una herramienta, no como el jefe de tu cerebro." },
      ] },
    ],
  },
  "how-do-video-games-use-ai": {
    ...localizedBlogArticles.en["how-do-video-games-use-ai"],
    title: "¿Cómo Usan la IA los Videojuegos?",
    category: "IA",
    readTime: common.es.minutes.m5,
    imageAlt: "Una escena de videojuego con personajes y entornos impulsados por reglas de comportamiento de IA que controlan el movimiento y la toma de decisiones",
    imageCaption: "La IA de los juegos no es del tipo de ciencia ficción. Es un manual de reglas que indica a los personajes cuándo perseguir, huir, patrullar o reaccionar al jugador.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "¿Alguna vez has jugado un videojuego donde un enemigo te persigue, un personaje te habla o el juego se vuelve más difícil a medida que mejoras? Eso no es magia aleatoria. Muchos videojuegos usan IA." },
        { type: "paragraph", text: "La IA de los juegos ayuda a los personajes a moverse, tomar decisiones, reaccionar a los jugadores y crear desafíos. Puede hacer que un juego se sienta más vivo. Pero la IA de los videojuegos no siempre es igual a la IA que puedes usar para responder preguntas. En los juegos, la IA a menudo significa reglas de comportamiento que hacen que los personajes parezcan inteligentes." },
      ] },
      { title: "¿Qué Es la IA de los Juegos?", blocks: [
        { type: "paragraph", text: "La IA de los juegos es la tecnología que controla cómo actúan los personajes controlados por la computadora. Estos personajes pueden ser enemigos, compañeros de equipo, animales, aldeanos, monstruos, corredores o tenderos. A menudo se les llama NPCs, que significa personajes no jugadores. Un NPC es cualquier personaje controlado por el juego en lugar de un jugador humano." },
        { type: "paragraph", text: "La IA de los juegos ayuda a los NPCs a decidir qué hacer. ¿Debería el enemigo perseguirte? ¿Debería un compañero de equipo seguirte? ¿Debería un auto de carreras frenar antes de una curva? ¿Debería un tendero saludarte cuando pasas cerca? Esas decisiones son parte de la IA de los juegos." },
      ] },
      { title: "Movimiento de los Enemigos", blocks: [
        { type: "paragraph", text: "Un uso común de la IA en los juegos es el movimiento de los enemigos. Imagina un juego de laberinto donde un monstruo intenta encontrarte. El monstruo necesita moverse por el laberinto sin quedarse atascado. Los diseñadores de juegos pueden usar algoritmos, o conjuntos de instrucciones paso a paso, para ayudar a los enemigos a navegar." },
        { type: "paragraph", text: "Por ejemplo, un enemigo podría seguir reglas como:" },
        { type: "list", items: [
          "Si el jugador está cerca, persíguelo.",
          "Si el jugador está lejos, patrulla el área.",
          "Si hay una pared, gira.",
          "Si la salud es baja, huye.",
          "Vigila un cofre del tesoro.",
        ] },
        { type: "paragraph", text: "Esas reglas simples pueden crear un comportamiento que parece inteligente." },
      ] },
      { title: "Decisiones de los NPCs y Dificultad", blocks: [
        { type: "paragraph", text: "Los NPCs también pueden tomar decisiones. En algunos juegos, un personaje puede hablar diferente según lo que hayas hecho antes. Un aldeano puede agradecerte por haberlo ayudado. Un guardia puede bloquearte el paso si no tienes una llave. El juego está verificando condiciones: si esto sucedió, haz aquello." },
        { type: "paragraph", text: "Algunos juegos también usan IA para ajustar la dificultad. Si el juego es demasiado fácil, los jugadores se aburren. Si es demasiado difícil, los jugadores se frustran. Los enemigos pueden volverse más rápidos, los acertijos más difíciles, o el juego puede dar pistas si estás atascado. Esto ayuda a mantener el juego divertido." },
      ] },
      { title: "La IA de los Juegos Puede Ser Simple o Compleja", blocks: [
        { type: "paragraph", text: "No toda la IA de los juegos es avanzada. A veces un personaje simplemente camina de un lado a otro. A veces un enemigo sigue un camino simple. Eso sigue contando como comportamiento del juego, aunque no sea muy 'inteligente'." },
        { type: "paragraph", text: "Otros juegos usan sistemas más complejos. Los personajes pueden reaccionar al sonido, la luz, las decisiones del jugador o los entornos cambiantes. El objetivo no siempre es hacer la IA lo más inteligente posible. El objetivo es hacer el juego divertido." },
      ] },
      { title: "¿Por Qué No Hacer Enemigos Perfectos?", blocks: [
        { type: "paragraph", text: "Si la IA de los juegos puede ser inteligente, ¿por qué no hacer a los enemigos invencibles? Porque eso no sería divertido. Imagina jugar un juego de fútbol donde la computadora bloquea cada tiro perfectamente, o un juego de carreras donde los autos de la computadora nunca cometen errores. Se sentiría injusto." },
        { type: "callout", accent: "teal", text: "La buena IA de los juegos está diseñada para desafiarte, no para aplastarte. A veces los diseñadores incluso hacen la IA menos perfecta a propósito. Los enemigos pueden pausar antes de atacar, fallar a veces o dar pistas a los jugadores. Eso te da la oportunidad de reaccionar, aprender y mejorar." },
      ] },
      { title: "Intenta Diseñar Tu Propia IA de Juego", blocks: [
        { type: "paragraph", text: "Puedes pensar como un diseñador de juegos ahora mismo. Imagina que estás creando un monstruo para un juego de laberinto. ¿Qué reglas debería seguir?" },
        { type: "list", items: [
          "Caminar aleatoriamente hasta que vea al jugador.",
          "Perseguir al jugador si está cerca.",
          "Dejar de perseguir después de 10 segundos.",
          "Huir si el jugador recoge un power-up.",
          "Vigilar un cofre del tesoro.",
        ] },
        { type: "paragraph", text: "Con solo unas pocas reglas, puedes crear un comportamiento interesante. La próxima vez que juegues, observa los personajes con cuidado y pregúntate: ¿qué reglas podrían estar controlando lo que hacen?" },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los videojuegos usan IA para controlar enemigos, NPCs, dificultad, movimiento y comportamiento del juego. La IA de los juegos puede ser reglas simples o sistemas más complejos. Ayuda a los personajes a reaccionar a los jugadores y hace los juegos más divertidos." },
        { type: "callout", accent: "teal", text: "La mejor IA de los juegos no siempre es la IA más inteligente. Es la IA que crea la mejor experiencia para el jugador." },
      ] },
    ],
  },
  "is-a-robot-the-same-thing-as-ai": {
    ...localizedBlogArticles.en["is-a-robot-the-same-thing-as-ai"],
    title: "¿Un Robot Es lo Mismo que la IA?",
    category: "IA",
    readTime: common.es.minutes.m4,
    imageAlt: "Un gráfico que compara un robot físico de un lado con un cerebro de IA o red neuronal del otro, mostrando que son cosas diferentes",
    imageCaption: "Un robot es una máquina física. La IA es software que aprende patrones. Son cosas diferentes y no siempre van juntas.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Los robots y la IA a menudo se mencionan juntos. En las películas, los robots caminan, hablan, piensan, hacen planes y a veces actúan casi como humanos. Por eso es fácil pensar que los robots y la IA son lo mismo." },
        { type: "paragraph", text: "Pero no lo son. Un robot es una máquina que puede hacer cosas físicamente. La IA es software que puede hacer predicciones, reconocer patrones o ayudar a tomar decisiones. A veces trabajan juntos. Pero un robot no siempre tiene IA, y la IA no siempre necesita el cuerpo de un robot." },
      ] },
      { title: "¿Qué Es un Robot?", blocks: [
        { type: "paragraph", text: "Un robot es una máquina que puede detectar, moverse o realizar tareas. Algunos robots parecen humanos, pero muchos no. Un robot puede ser:" },
        { type: "list", items: [
          "Una aspiradora robótica",
          "Un brazo de fábrica que construye autos",
          "Un dron",
          "Un rover de Marte",
          "Un robot de juguete",
          "Una máquina usada en cirugías",
        ] },
        { type: "paragraph", text: "Los robots suelen tener partes físicas como motores, ruedas, brazos, cámaras, sensores o pinzas. La idea clave es que los robots interactúan con el mundo físico." },
      ] },
      { title: "¿Qué Es la IA?", blocks: [
        { type: "paragraph", text: "La IA, o inteligencia artificial, es tecnología informática que puede realizar tareas que parecen requerir inteligencia. La IA puede reconocer patrones, hacer predicciones, generar texto, clasificar imágenes, traducir idiomas o recomendar videos." },
        { type: "paragraph", text: "La IA no necesita un cuerpo. Por ejemplo, un chatbot de IA vive dentro de un software. Puede responder preguntas, pero no puede tomar un lápiz a menos que esté conectado a un robot. La IA es como la parte que toma decisiones. Un robot es la parte de la máquina física." },
      ] },
      { title: "¿Qué Son los Sensores y los Motores?", blocks: [
        { type: "paragraph", text: "Los sensores ayudan a las máquinas a detectar el mundo. Los humanos tenemos sentidos como la vista, el oído y el tacto. Los robots usan sensores, herramientas que ayudan a un robot a notar algo sobre el mundo. Un robot puede usar una cámara para 'ver', un micrófono para 'escuchar', un sensor táctil para detectar contacto, un sensor de distancia para evitar paredes o un sensor de temperatura para medir el calor." },
        { type: "paragraph", text: "Los motores ayudan a los robots a moverse. Un motor puede girar ruedas, levantar un brazo, abrir una pinza o girar una articulación. Si los sensores son como los sentidos de un robot, los motores son como sus músculos. Pero los motores no deciden nada por sí solos; necesitan instrucciones." },
      ] },
      { title: "Un Robot Sin IA", blocks: [
        { type: "paragraph", text: "Algunos robots no usan mucha IA en absoluto. Imagina un robot simple que sigue una línea negra en el suelo. Tiene un sensor de luz debajo. Si ve la línea, avanza. Si se desvía, vuelve a girar." },
        { type: "paragraph", text: "Ese robot sigue reglas. Puede parecer inteligente, pero no necesariamente usa IA avanzada. Usa sensores, motores e instrucciones programadas." },
      ] },
      { title: "IA Sin un Robot", blocks: [
        { type: "paragraph", text: "Ahora imagina una IA que te ayuda a escribir un poema. Puede crear palabras, pero no tiene ruedas, brazos ni cámara. No puede caminar por la sala. No puede construir una torre. No puede tomar una botella de agua." },
        { type: "paragraph", text: "Eso es IA sin un robot. Puede trabajar con información, pero no tiene un cuerpo físico." },
      ] },
      { title: "Un Robot Con IA", blocks: [
        { type: "paragraph", text: "Algunos robots sí usan IA. Un auto que se maneja solo es un buen ejemplo. Tiene cámaras y sensores para observar carreteras, señales, carriles, autos y peatones. Usa IA para ayudar a entender qué está pasando y decidir cómo moverse con seguridad." },
        { type: "callout", accent: "teal", text: "En estos casos, el cuerpo del robot y el cerebro de IA trabajan juntos. El robot detecta el mundo, la IA ayuda a tomar decisiones y los motores hacen que el robot se mueva." },
      ] },
      { title: "Inténtalo", blocks: [
        { type: "paragraph", text: "Mira a tu alrededor en casa o en la escuela. ¿Puedes encontrar algo que sea un robot? ¿Algo que use IA? ¿Algo que sea solo una computadora normal?" },
        { type: "list", items: [
          "Una calculadora es una herramienta informática, pero generalmente no es IA.",
          "Una aspiradora robótica es un robot.",
          "Un asistente de voz puede usar IA.",
          "Una impresora es una máquina, pero generalmente no es un robot en el sentido habitual.",
        ] },
        { type: "paragraph", text: "Pensar así te ayuda a clasificar la tecnología como un ingeniero." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Un robot no es lo mismo que la IA. Un robot es una máquina física que puede moverse o realizar tareas. La IA es software que reconoce patrones, hace predicciones o ayuda a decidir qué hacer. Pueden trabajar juntos, pero son cosas diferentes." },
        { type: "callout", accent: "teal", text: "La próxima vez que veas un 'robot inteligente', pregúntate: ¿qué parte es el robot, qué parte es la IA y qué sensores lo ayudan a entender el mundo?" },
      ] },
    ],
  },
  "how-do-robots-know-where-they-are": {
    ...localizedBlogArticles.en["how-do-robots-know-where-they-are"],
    title: "¿Cómo Saben los Robots Dónde Están?",
    category: "Robótica",
    readTime: common.es.minutes.m5,
    imageAlt: "Un robot usando cámaras y sensores para escanear y mapear el entorno que lo rodea para navegar",
    imageCaption: "Los robots construyen una imagen de su entorno usando cámaras, lidar y software de mapeo, y lo actualizan constantemente mientras se mueven.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Imagina que caminas por tu escuela con los ojos cerrados. Quizás das unos pasos, pero muy pronto chocas con una pared, un escritorio o la mochila de alguien. Para moverte con seguridad, necesitas pistas sobre dónde estás." },
        { type: "paragraph", text: "Los robots tienen el mismo problema. Un robot no sabe automáticamente dónde está. Tiene que averiguarlo usando sensores, cámaras, ruedas, mapas y matemáticas. La idea básica es simple: un robot recopila pistas del mundo que lo rodea y luego las usa para hacer su mejor estimación de dónde está y hacia dónde debe ir." },
      ] },
      { title: "Los Robots También Necesitan Sentidos", blocks: [
        { type: "paragraph", text: "Los humanos usamos sentidos como la vista, el oído, el tacto y el equilibrio. Los robots usan sensores, herramientas que ayudan a un robot a notar algo sobre el mundo. Algunos detectan distancias. Otros ven objetos, miden velocidad o calculan dirección." },
        { type: "list", items: [
          "Cámaras: para ver paredes, caminos, personas, señales u obstáculos",
          "Ruedas: para medir cuánto ha viajado el robot",
          "GPS: para estimar la ubicación en exteriores",
          "Lidar: para escanear el área con luz láser",
          "Sensores ultrasónicos: para rebotar ondas de sonido en los objetos",
          "Giroscopios: para detectar giros o inclinaciones",
        ] },
        { type: "paragraph", text: "Cada sensor le da al robot una pieza del rompecabezas. Una cámara puede mostrar una puerta. Un sensor de ruedas puede decir que el robot avanzó un metro y medio. Un sensor de distancia puede detectar una pared cercana. El robot combina esas pistas para entender su posición." },
      ] },
      { title: "Contar los Giros de las Ruedas", blocks: [
        { type: "paragraph", text: "Una forma sencilla en que un robot puede estimar su posición es contando cuánto giran sus ruedas. Si un robot empieza en la puerta del salón y sus ruedas avanzan tres metros, puede estimar que ahora está a tres metros del inicio. Esto se llama odometría, algo así como contar tus pasos." },
        { type: "callout", accent: "green", text: "¿Y si la rueda resbala? ¿Y si el suelo es irregular? Incluso un pequeño error de medición puede hacerse más grande con el tiempo. Por eso los robots generalmente dependen de más de un sensor." },
      ] },
      { title: "Usar Cámaras Como Ojos", blocks: [
        { type: "paragraph", text: "Algunos robots usan cámaras para reconocer lo que está a su alrededor. Una aspiradora robótica nota las patas de los muebles y las paredes. Un auto autónomo ve las líneas de los carriles, los semáforos y los peatones. Un rover de Marte usa cámaras para estudiar las rocas y evitar terrenos peligrosos." },
        { type: "paragraph", text: "Pero una cámara no entiende el mundo como lo hace un humano. Cuando ves una silla, instantáneamente sabes que es una silla. Un robot ve la imagen como datos. Tiene que procesar formas, colores, bordes, sombras y patrones antes de poder decidir qué está mirando. La iluminación cambia. Los objetos se superponen. Una silla se ve diferente de frente, de lado y de espaldas. Un robot tiene que estar entrenado para manejar todas esas posibilidades." },
      ] },
      { title: "Construir un Mapa", blocks: [
        { type: "paragraph", text: "Algunos robots hacen mapas mientras se mueven. Una aspiradora robótica puede empezar en una habitación y aprender poco a poco dónde están las paredes, los muebles y los espacios abiertos. Luego puede usar ese mapa para limpiar con más eficiencia en lugar de chocar aleatoriamente." },
        { type: "paragraph", text: "Es similar a lo que pasa cuando exploras un edificio nuevo. Al principio no sabes dónde está nada. Después de caminar un poco, empiezas a recordar: las escaleras están cerca de la entrada, el gimnasio está al fondo del pasillo, la biblioteca está a la vuelta de la esquina. Los robots también construyen mapas, pero lo hacen con sensores y programas de computadora." },
        { type: "callout", accent: "green", text: "Algunos robots intentan construir un mapa y determinar su posición dentro de ese mapa al mismo tiempo, respondiendo dos preguntas a la vez: ¿dónde estoy y cómo se ve este lugar?" },
      ] },
      { title: "Por Qué los Robots Todavía Se Pierden", blocks: [
        { type: "paragraph", text: "Incluso los robots inteligentes pueden confundirse. Un robot puede perderse si sus ruedas resbalan, un sensor da una lectura incorrecta, la habitación cambia, los muebles se mueven, la luz se oscurece, algo bloquea la cámara o dos pasillos se ven casi iguales." },
        { type: "paragraph", text: "Por eso los robots verifican su ubicación una y otra vez. No hacen una suposición y la confían para siempre. Siguen actualizando su estimación a medida que llega nueva información, muy parecido a cómo tú consultas un mapa, lees las señales y miras alrededor mientras caminas por un museo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los robots saben dónde están recopilando pistas. Usan sensores como cámaras, ruedas, GPS, láseres y detectores de movimiento, y luego combinan esas pistas para estimar su ubicación, construir mapas, evitar obstáculos y decidir hacia dónde ir." },
        { type: "callout", accent: "green", text: "La próxima vez que veas un robot moviéndose por un espacio, recuerda: no solo está rodando. Está detectando, estimando, verificando y ajustando una y otra vez. Así es como los robots encuentran su camino." },
      ] },
    ],
  },
  "why-robots-are-bad-at-easy-human-tasks": {
    ...localizedBlogArticles.en["why-robots-are-bad-at-easy-human-tasks"],
    title: "¿Por Qué a los Robots les Cuesta Hacer Tareas Fáciles?",
    category: "Robótica",
    readTime: common.es.minutes.m5,
    imageAlt: "Un robot luchando por realizar una tarea física simple que un humano haría sin esfuerzo y sin pensarlo",
    imageCaption: "Tareas que a una persona le toman una fracción de segundo, como recoger una camisa arrugada, pueden llevar años de ingeniería aproximar en un robot.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Doblar la ropa parece fácil. Recoges una camisa, la sacudes, encuentras las mangas, la doblas a la mitad y la guardas. Probablemente no lo piensas mucho." },
        { type: "paragraph", text: "Pero para un robot, doblar ropa es extremadamente difícil. Lo mismo vale para abrir puertas, recoger juguetes, amarrar zapatos, servir cereal o agarrar una mochila del suelo. Estas tareas parecen simples para los humanos, pero son algunos de los problemas más difíciles de la robótica." },
        { type: "paragraph", text: "Los robots pueden construir autos, explorar Marte y levantar objetos pesados en fábricas. Entonces, ¿por qué un calcetín los confunde tanto? La respuesta es que el mundo real es desordenado." },
      ] },
      { title: "Los Humanos Son Mejores de lo que Creemos", blocks: [
        { type: "paragraph", text: "Tu cerebro y tu cuerpo hacen cosas increíbles todo el tiempo, incluso cuando no lo notas. Cuando recoges un lápiz, instantáneamente sabes dónde está, qué tan pesado probablemente es, con qué fuerza agarrarlo y cómo mover los dedos alrededor de él, incluso si está de lado, debajo de un cuaderno o colgando parcialmente de la mesa." },
        { type: "paragraph", text: "Un robot tiene que resolver todo eso paso a paso. Primero tiene que ver el lápiz. Luego tiene que entender que el lápiz está separado de la mesa. Luego tiene que decidir dónde agarrarlo. Luego tiene que mover el brazo sin voltear nada. Luego tiene que apretar lo suficiente para sostener el lápiz pero no tanto como para romperlo. Eso es mucho." },
        { type: "callout", accent: "green", text: "Los humanos hacen que agarrar cosas parezca fácil porque llevamos años practicando con ojos, manos, músculos y cerebro trabajando juntos. Los robots tienen que aprender todo eso desde cero." },
      ] },
      { title: "Las Cosas Suaves Son Difíciles", blocks: [
        { type: "paragraph", text: "Los robots a menudo tienen dificultades con objetos suaves y flexibles. La ropa es un ejemplo perfecto. Una camisa no mantiene una sola forma. Se dobla, arruga, tuerce y colapsa. Una toalla puede doblarse sobre sí misma. Un calcetín puede esconderse dentro de otro calcetín." },
        { type: "paragraph", text: "Los objetos rígidos generalmente son más fáciles para los robots. Un bloque de metal mantiene la misma forma. Una caja de plástico tiene bordes claros. Una taza tiene una forma predecible. Pero la tela cambia de forma cada vez que se mueve. Un robot no puede simplemente memorizar la forma de una camisa. Tiene que entender cómo se comporta la tela, lo cual es muy difícil." },
      ] },
      { title: "Abrir Puertas No Es Tan Simple", blocks: [
        { type: "paragraph", text: "Piensa en cuántas puertas diferentes existen. Algunas tienen perillas redondas. Algunas tienen manijas. Algunas se deslizan. Algunas empujan. Algunas jalan. Algunas son pesadas. Algunas son ligeras. Algunas se atascan. Algunas se cierran automáticamente." },
        { type: "paragraph", text: "Un humano puede mirar la mayoría de las puertas y entender rápidamente qué hacer. Un robot tiene que detectar la manija, entender cómo se mueve, posicionar su pinza correctamente, aplicar la fuerza correcta y moverse hacia atrás o adelante mientras la abre. Si jala cuando debería empujar, falla. Si agarra la manija en el ángulo equivocado, falla. Una tarea que a ti te toma dos segundos puede convertirse en un gran desafío de ingeniería." },
      ] },
      { title: "El Mundo No Se Queda Quieto", blocks: [
        { type: "paragraph", text: "Los robots de fábrica son muy buenos repitiendo el mismo movimiento porque su entorno está controlado. Una pieza de auto llega al mismo lugar cada vez. El brazo robótico se mueve en el mismo patrón. Los hogares, escuelas y espacios al aire libre son completamente diferentes." },
        { type: "paragraph", text: "Los objetos se mueven. Una mochila puede estar en el suelo un día y en una silla al día siguiente. Un juguete puede estar al revés. Los robots tienen que manejar sorpresas. Los humanos son excelentes en esto. Si tu lápiz rueda debajo de una silla, puedes agacharte, mover la silla, rodear la mochila y agarrarlo sin reprogramarte. Los robots están mejorando con las sorpresas, pero sigue siendo uno de los mayores desafíos en robótica." },
      ] },
      { title: "Recoger Cosas Requiere Juicio", blocks: [
        { type: "paragraph", text: "Cuando los humanos recogen algo, ajustamos automáticamente nuestro agarre. No sostienes un huevo de la misma manera que sostienes un martillo. No agarras un vaso de papel de la misma manera que agarras una pelota de béisbol. Usas diferente presión, posiciones de los dedos y movimientos." },
        { type: "paragraph", text: "Si un robot agarra muy suavemente, el objeto cae. Si agarra muy fuerte, el objeto se rompe. Si agarra la parte equivocada, el objeto se desliza. Esto es especialmente difícil cuando los objetos son brillantes, transparentes, suaves, pequeños, pesados, de forma extraña o están en movimiento. Por eso las manos y pinzas de los robots son un área tan importante de la ingeniería." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los robots son increíbles, pero el mundo en que viven los humanos es complicado. Las tareas que nos parecen fáciles a menudo son difíciles para los robots porque los humanos somos increíblemente buenos detectando, equilibrando, tocando, ajustando y aprendiendo de la experiencia." },
        { type: "callout", accent: "green", text: "La próxima vez que dobles una camisa, abras una puerta o recojas un bocadillo, estás haciendo algo que un robot podría encontrar muy difícil. Tu cerebro y tus manos son obras maestras de la ingeniería." },
      ] },
    ],
  },
  "what-makes-a-robot-a-robot": {
    ...localizedBlogArticles.en["what-makes-a-robot-a-robot"],
    title: "¿Qué Hace que un Robot Sea un Robot?",
    category: "Robótica",
    readTime: common.es.minutes.m4,
    imageAlt: "Un robot con sensores, motores y articulaciones visibles que ilustran los tres componentes esenciales: detectar, procesar, actuar",
    imageCaption: "Un robot necesita detectar su entorno, procesar esa información y actuar físicamente. Los tres juntos definen lo que hace que una máquina sea un robot.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "¿Es una tostadora un robot? ¿Y un auto de control remoto? ¿Una máquina expendedora? ¿Un altavoz inteligente? ¿Una aspiradora robótica?" },
        { type: "paragraph", text: "La palabra robot se usa mucho, pero no toda máquina es un robot. Un robot es una máquina que puede detectar el mundo, tomar decisiones y actuar. Eso significa que la mayoría de los robots tienen tres partes importantes: sensores, un controlador y actuadores. En palabras más simples: un robot nota cosas, sigue instrucciones y se mueve o hace algo." },
      ] },
      { title: "Parte 1: Los Sensores Ayudan a los Robots a Notar", blocks: [
        { type: "paragraph", text: "Los robots necesitan información sobre el mundo que los rodea. Esa información viene de los sensores, dispositivos que detectan algo." },
        { type: "list", items: ["Luz", "Distancia", "Sonido", "Tacto", "Temperatura", "Movimiento", "Dirección", "Color", "Presión"] },
        { type: "paragraph", text: "Una aspiradora robótica usa sensores para detectar paredes, escaleras, muebles y suciedad. Un auto autónomo usa cámaras y otros sensores para detectar caminos, señales, autos y personas. Un brazo robótico en una fábrica puede usar sensores para saber si una pieza está en el lugar correcto. Sin sensores, un robot sería como una persona intentando navegar sin vista, oído ni tacto." },
      ] },
      { title: "Parte 2: Los Controladores Ayudan a los Robots a Decidir", blocks: [
        { type: "paragraph", text: "El controlador es el centro de decisiones del robot. No es un cerebro como el cerebro humano, pero es la parte que ejecuta instrucciones, que pueden ser simples o muy avanzadas." },
        { type: "paragraph", text: "Un robot simple puede seguir una regla como: si el sensor detecta una pared, gira a la izquierda. Un robot más avanzado puede usar una cámara, un mapa y un programa de computadora para decidir el camino más seguro a través de una habitación. Los controladores pueden ser computadoras pequeñas, tarjetas de circuitos o procesadores potentes. Toman la información del sensor y deciden qué debe hacer el robot a continuación." },
        { type: "callout", accent: "green", text: "Detectar. Decidir. Actuar. Ese ciclo se repite una y otra vez, y es una de las ideas más importantes en toda la robótica." },
      ] },
      { title: "Parte 3: Los Actuadores Ayudan a los Robots a Moverse", blocks: [
        { type: "paragraph", text: "Un actuador es la parte de un robot que hace que ocurra el movimiento. Los motores son un tipo común. Pueden hacer girar ruedas, mover brazos, girar engranajes, abrir pinzas o rotar articulaciones." },
        { type: "paragraph", text: "Un brazo robótico en una fábrica puede tener varios motores, uno para cada articulación. Una mano robótica puede tener motores pequeños o cables para mover los dedos. Un dron usa motores para hacer girar las hélices y mantenerse en el aire. Sin actuadores, un robot podría detectar y decidir, pero no podría hacer nada físico." },
      ] },
      { title: "¿Un Robot Tiene que Parecer una Persona?", blocks: [
        { type: "paragraph", text: "No. Este es uno de los mitos más comunes sobre los robots. Los robots no necesitan cara, brazos, piernas ni ojos. La forma de un robot depende de su trabajo." },
        { type: "list", items: [
          "Una aspiradora pequeña", "Un rover", "Un brazo mecánico", "Un dron", "Un submarino", "Un carrito de entrega", "Una máquina dentro de una fábrica",
        ] },
        { type: "callout", accent: "green", text: "El buen diseño de robots comienza con la pregunta: ¿qué necesita hacer este robot? La respuesta guía cada decisión sobre la forma, los sensores y el movimiento." },
      ] },
      { title: "¿Es un Auto de Control Remoto un Robot?", blocks: [
        { type: "paragraph", text: "Por lo general, un auto de control remoto normal no se considera un robot completo porque un humano controla cada movimiento. Pero si el auto puede detectar obstáculos y decidir cómo dirigirse por sí solo, se vuelve más parecido a un robot. La diferencia es la toma de decisiones. Una máquina que solo sigue comandos humanos directos es solo una máquina. Un robot puede tomar al menos algunas decisiones basadas en la información que recopila." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Un robot es más que una máquina que se mueve. Un robot usa sensores para recopilar información, un controlador para procesar instrucciones y actuadores para actuar. No tiene que parecer humano. No tiene que hablar. En su esencia, sigue un ciclo simple:" },
        { type: "callout", accent: "green", text: "Detectar. Decidir. Actuar. Ese ciclo es lo que hace que la robótica sea tan poderosa e interesante." },
      ] },
    ],
  },
  "how-mars-rovers-drive-without-a-driver": {
    ...localizedBlogArticles.en["how-mars-rovers-drive-without-a-driver"],
    title: "¿Cómo Manejan los Rovers de Marte sin Conductor?",
    category: "Robótica",
    readTime: common.es.minutes.m5,
    imageAlt: "Un rover de Marte navegando por el terreno rocoso y rojizo de la superficie marciana sin conductor humano, guiado por cámaras y software a bordo",
    imageCaption: "Los rovers de Marte se manejan solos porque una señal desde la Tierra tarda hasta 24 minutos en un solo sentido. No hay tiempo para que un humano reaccione a los obstáculos.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Hay robots manejando en Marte. Los rovers de Marte son exploradores robóticos que recorren la superficie de otro planeta, estudian rocas, toman fotografías y ayudan a los científicos a aprender. Y no hay conductor detrás de un volante, ni astronauta cerca con un control remoto." },
        { type: "paragraph", text: "Entonces, ¿cómo maneja un rover de Marte? La respuesta involucra el espacio, cámaras, ruedas, planificación y mucha paciencia." },
      ] },
      { title: "Marte Está Muy Lejos", blocks: [
        { type: "paragraph", text: "Marte está a millones de kilómetros de la Tierra. Debido a esa distancia, los mensajes entre la Tierra y Marte tardan tiempo en viajar. Aunque las señales de radio se mueven extremadamente rápido, no son instantáneas. Dependiendo de dónde estén la Tierra y Marte en sus órbitas, un mensaje puede tardar varios minutos en llegar a Marte." },
        { type: "paragraph", text: "Eso significa que los científicos no pueden manejar un rover de Marte como un auto de videojuego. Si un rover empieza a rodar hacia una roca, los ingenieros en la Tierra no pueden presionar instantáneamente un botón para detenerlo. Para cuando llegue el comando, el rover ya podría estar en problemas." },
      ] },
      { title: "El Rover Recibe Instrucciones", blocks: [
        { type: "paragraph", text: "Los rovers de Marte generalmente no se despiertan y deciden aleatoriamente a dónde ir. Equipos de científicos e ingenieros en la Tierra estudian las imágenes y datos del rover. Miran el paisaje y eligen objetivos interesantes, como rocas, suelo, colinas o caminos planos." },
        { type: "paragraph", text: "Luego envían al rover un conjunto de instrucciones. Las instrucciones pueden decirle que se dirija hacia cierta ubicación, tome fotografías, examine una roca o use una herramienta científica. Pero debido al retraso de tiempo, el rover también necesita cierta capacidad para tomar decisiones por sí solo." },
      ] },
      { title: "Las Cámaras Son los Ojos del Rover", blocks: [
        { type: "paragraph", text: "Los rovers de Marte usan cámaras para ver el mundo que los rodea. Algunas cámaras miran hacia adelante para ayudar a planear un camino. Algunas miran hacia el suelo. Algunas toman fotografías panorámicas del paisaje. Otras ayudan a los científicos a estudiar las rocas en detalle." },
        { type: "paragraph", text: "El rover puede usar las imágenes de la cámara para detectar obstáculos como rocas grandes, pendientes pronunciadas, hoyos o terreno rugoso. Esto importa porque Marte no es un estacionamiento liso. Tiene polvo, piedras, crestas, cráteres y terreno irregular. Un rover tiene que moverse con cuidado para no quedar atascado o dañado." },
      ] },
      { title: "Ruedas Diseñadas para Otro Planeta", blocks: [
        { type: "paragraph", text: "Las ruedas de los rovers de Marte están diseñadas para terreno rugoso. Necesitan rodar sobre rocas, manejar el polvo y soportar el peso del rover en un entorno severo con temperaturas frías y sin taller de reparaciones cerca." },
        { type: "paragraph", text: "Si tu bicicleta tiene una llanta ponchada, alguien puede repararla. Si la rueda de un rover de Marte se daña, los ingenieros tienen que encontrar la manera de resolverlo desde la Tierra. Por eso la conducción del rover es lenta y cuidadosa. La velocidad no es el objetivo. La exploración sí lo es." },
      ] },
      { title: "El Rover Puede Evitar Algunos Problemas", blocks: [
        { type: "paragraph", text: "Los rovers de Marte pueden usar navegación autónoma, lo que significa que el robot puede manejar algunas tareas por sí solo. Los ingenieros pueden decirle al rover que se dirija hacia un punto. Mientras se mueve, el rover usa sus cámaras para verificar si hay obstáculos. Si ve una roca o pendiente peligrosa, puede ajustar su camino o detenerse." },
        { type: "callout", accent: "green", text: "El rover no piensa como un humano. Sigue instrucciones de computadora cuidadosamente diseñadas que preguntan: ¿es seguro este camino? ¿Hay un obstáculo? ¿Puedo rodearlo? ¿Debo detenerme y esperar más instrucciones?" },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los rovers de Marte manejan sin conductor usando instrucciones de la Tierra, cámaras para ver el terreno, ruedas diseñadas para terreno rugoso y software que los ayuda a evitar el peligro. No pueden manejarse como autos de control remoto porque Marte está demasiado lejos." },
        { type: "paragraph", text: "Cada giro de rueda es parte de una misión más grande: explorar un planeta que los humanos aún no han pisado." },
      ] },
    ],
  },
  "why-robot-hands-are-so-hard-to-make": {
    ...localizedBlogArticles.en["why-robot-hands-are-so-hard-to-make"],
    title: "¿Por Qué las Manos de los Robots Son Tan Difíciles de Fabricar?",
    category: "Robótica",
    readTime: common.es.minutes.m5,
    imageAlt: "Una mano robótica mecánica mostrando sus articulaciones de dedos y sensores, intentando replicar la versatilidad de una mano humana",
    imageCaption: "Una mano humana puede agarrar una uva sin aplastarla y una barra de pesas sin soltarla. Replicar ese rango en un robot es uno de los problemas más difíciles de la ingeniería.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Mira tu mano por un momento. Ábrela. Ciérrala. Mueve los dedos. Toca el pulgar con cada yema. Recoge un lápiz. Golpea la mesa. Sostén algo con suavidad. Tu mano está haciendo algo increíble." },
        { type: "paragraph", text: "Las manos humanas son una de las cosas más difíciles de copiar para los ingenieros. Las manos robóticas pueden lucir geniales, pero hacer que funcionen como manos reales es extremadamente difícil. Las manos no son solo simples agarraderas; son flexibles, sensibles, fuertes, delicadas y controladas por un cerebro poderoso." },
      ] },
      { title: "Los Dedos Son Complicados", blocks: [
        { type: "paragraph", text: "Una mano humana tiene muchas partes móviles. Cada dedo tiene articulaciones. El pulgar puede moverse de una manera especial que le permite tocar los otros dedos. La muñeca puede girar, doblarse y ajustarse. Todas estas partes trabajan juntas para que puedas agarrar objetos desde diferentes ángulos." },
        { type: "paragraph", text: "Una mano robótica necesita partes mecánicas para copiar esos movimientos: articulaciones, motores, engranajes, cables, materiales y sistemas de control. Incluso mover un solo dedo suavemente puede ser difícil. Mover cinco dedos juntos de manera útil es mucho más difícil." },
      ] },
      { title: "La Fuerza de Agarre Es Complicada", blocks: [
        { type: "paragraph", text: "Cuando recoges algo, tu mano automáticamente elige con qué fuerza apretar. Sostienes una papa frita con suavidad. Sostienes la correa de una mochila pesada con firmeza. Sostienes un lápiz en algún punto intermedio." },
        { type: "paragraph", text: "Un robot tiene que aprender esto. Si aprieta demasiado, puede aplastar algo. Si aprieta muy poco, el objeto puede resbalarse. Si agarra la parte equivocada, el objeto puede girar o caer. Esto es especialmente difícil porque los objetos tienen diferentes formas, tamaños, pesos y texturas. Un vaso liso es diferente de una pelota de tenis con pelo. Una esponja blanda es diferente de una cuchara de metal." },
      ] },
      { title: "El Tacto Importa", blocks: [
        { type: "paragraph", text: "Tu mano está cubierta de sensores táctiles. Puedes sentir presión, textura, temperatura, deslizamiento y dolor. Si un vaso empieza a resbalarse de tu mano, lo sientes casi instantáneamente y aprietas más." },
        { type: "paragraph", text: "Las manos robóticas también necesitan sensores táctiles, pero copiar el tacto humano es muy difícil. Un robot necesita saber: ¿estoy tocando el objeto? ¿Con qué fuerza estoy presionando? ¿Se está resbalando el objeto? ¿Es blando o duro? ¿Estoy a punto de romperlo? Sin esa retroalimentación, una mano robótica tiene que adivinar, y adivinar puede llevar a objetos caídos o rotos." },
      ] },
      { title: "Las Manos Humanas Son Buenas con Objetos Raros", blocks: [
        { type: "paragraph", text: "Las manos humanas pueden recoger todo tipo de cosas: una moneda, un sándwich, una botella de agua, un cordón, un balón de basquetbol, un papel arrugado. Estos objetos no tienen todos la misma forma. Algunos son pequeños, algunos son grandes, algunos son blandos, algunos son resbaladizos, algunos cambian de forma cuando los tocas." },
        { type: "paragraph", text: "Las manos robóticas a menudo funcionan mejor cuando los objetos son predecibles. Si un robot está diseñado para recoger un tipo de pieza en una fábrica, puede ser muy bueno en ese trabajo. Pero ¿una mano robótica de propósito general que pueda recoger casi cualquier cosa? Eso es mucho más difícil." },
      ] },
      { title: "Las Manos Robóticas No Siempre Necesitan Parecer Humanas", blocks: [
        { type: "paragraph", text: "La mejor mano robótica no siempre es la que más se parece a una mano humana. Algunos robots usan pinzas simples con dos dedos. Otros usan ventosas. Algunos usan dedos de goma suave que se envuelven alrededor de los objetos. Algunos usan imanes para partes de metal." },
        { type: "callout", accent: "green", text: "Los ingenieros eligen el diseño según el trabajo. Una mano robótica debe adaptarse al problema que intenta resolver, no a la forma de una mano humana." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Las manos robóticas son difíciles de fabricar porque agarrar no es simple. Una mano útil necesita movimiento, fuerza, delicadeza, tacto, control y la capacidad de manejar objetos que son desordenados, blandos, resbaladizos o de formas extrañas." },
        { type: "paragraph", text: "Las manos humanas son tan buenas que olvidamos lo increíbles que son. Cada vez que te amarras los zapatos, abres un bocadillo o atrapas una pelota, tu mano está haciendo algo que los ingenieros aún trabajan duro por copiar. Eso es lo que hace que las manos robóticas sean uno de los desafíos más interesantes de toda la robótica." },
      ] },
    ],
  },
  "how-factory-robots-build-cars": {
    ...localizedBlogArticles.en["how-factory-robots-build-cars"],
    title: "¿Cómo Fabrican Autos los Robots de Fábrica?",
    category: "Robótica",
    readTime: common.es.minutes.m5,
    imageAlt: "Brazos robóticos en una línea de ensamblaje de fabricación de autos soldando y ensamblando paneles de carrocería con precisión",
    imageCaption: "Los robots de fábrica no son de propósito general. Cada brazo está programado con precisión para una tarea específica, ejecutada miles de veces sin variación.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Los autos son máquinas enormes hechas de miles de piezas: puertas, asientos, ruedas, ventanas, cables, luces, motores y muchas piezas ocultas que la mayoría de las personas nunca ve. Construir uno requiere mucho trabajo." },
        { type: "paragraph", text: "En las fábricas modernas de autos, los robots ayudan a realizar muchos de los trabajos que necesitan velocidad, fuerza, precisión y repetición. Estos robots generalmente no parecen personas. Muchos parecen enormes brazos mecánicos que se mueven con increíble precisión." },
      ] },
      { title: "Los Robots de Fábrica Son Excelentes en la Repetición", blocks: [
        { type: "paragraph", text: "Los robots son muy buenos haciendo la misma tarea una y otra vez. Eso es útil en la fabricación de autos porque muchas piezas necesitan colocarse, soldarse, pintarse o moverse exactamente de la misma manera. Un brazo robótico puede repetir un movimiento miles de veces con muy poca variación. No se aburre, no pierde la concentración ni olvida el siguiente paso." },
        { type: "callout", accent: "green", text: "Si un robot necesita soldar el mismo punto en cada chasis de auto, puede moverse a esa posición exacta cada vez, de manera consistente, todo el día." },
      ] },
      { title: "Soldar el Cuerpo del Auto", blocks: [
        { type: "paragraph", text: "Un trabajo importante que realizan los robots de fábrica es la soldadura, que une piezas de metal usando calor. Los cuerpos de los autos necesitan ser fuertes y ensamblarse cuidadosamente, y los brazos de soldadura robóticos pueden moverse rápidamente y con precisión hacia puntos que pueden ser difíciles de acceder para los humanos." },
        { type: "paragraph", text: "Ingenieros, técnicos y trabajadores diseñan, monitorean, reparan, programan e inspeccionan los sistemas robóticos. El robot realiza la acción física repetida, pero los humanos se aseguran de que todo el proceso funcione." },
      ] },
      { title: "Pintar con Precisión", blocks: [
        { type: "paragraph", text: "Pintar un auto no es tan simple como rociar color sobre el metal. La pintura necesita ser lisa, uniforme y consistente. Demasiada pintura puede gotear. Muy poca puede dejar una cobertura débil. Los robots de fábrica se usan a menudo para pintar porque pueden mover herramientas de rociado en patrones controlados, aplicando pintura uniformemente sobre puertas, capós, techos y otras superficies." },
      ] },
      { title: "Mover Piezas Pesadas", blocks: [
        { type: "paragraph", text: "Algunas piezas de los autos son pesadas. Los robots pueden ayudar a levantar, mover y posicionar estas piezas de manera segura. Un brazo robótico puede colocar una puerta en su lugar. Otro sistema puede transportar piezas a lo largo de la línea de ensamblaje. Levantar piezas pesadas una y otra vez puede ser agotador o peligroso para los humanos, así que los robots ayudan a reducir el esfuerzo y hacer la fábrica más segura." },
      ] },
      { title: "Seguridad y Programación", blocks: [
        { type: "paragraph", text: "Los robots de fábrica pueden ser poderosos y rápidos, por lo que la seguridad es extremadamente importante. Muchos robots industriales trabajan dentro de zonas de seguridad con barreras, sensores y luces de advertencia. Algunos robots más nuevos, llamados robots colaborativos o cobots, están diseñados con características de seguridad adicionales para trabajar más cerca de las personas." },
        { type: "paragraph", text: "Un robot de fábrica no sabe mágicamente cómo construir un auto. Tiene que ser programado. Los ingenieros le dicen al robot adónde moverse, qué tan rápido, cuándo usar una herramienta, cuánta fuerza aplicar y qué hacer si algo sale mal. Una fábrica de autos puede tener robots, cintas transportadoras, cámaras, herramientas y trabajadores humanos todos conectados en un proceso cuidadosamente planificado." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los robots de fábrica ayudan a construir autos soldando, pintando, moviendo piezas y repitiendo tareas precisas una y otra vez. Generalmente no tienen forma humana porque están diseñados para trabajos específicos. Un robot de soldadura se ve diferente a un robot de pintura porque cada trabajo necesita diferentes herramientas y movimientos." },
        { type: "callout", accent: "green", text: "La mejor lección de ingeniería de las fábricas de autos: no diseñas un robot para que se vea genial. Lo diseñas para resolver un problema. En las fábricas de autos, los robots ayudan a convertir miles de piezas separadas en máquinas que pueden rodar por la carretera." },
      ] },
    ],
  },
  "why-is-the-sky-blue-but-sunsets-are-orange": {
    ...localizedBlogArticles.en["why-is-the-sky-blue-but-sunsets-are-orange"],
    title: "¿Por Qué el Cielo Es Azul pero los Atardeceres Son Anaranjados?",
    category: "Ciencia",
    readTime: common.es.minutes.m4,
    imageAlt: "Un cielo que transita del azul profundo en la parte superior a tonos cálidos anaranjados y rosados cerca del horizonte al atardecer",
    imageCaption: "La misma atmósfera que dispersa la luz azul por el cielo diurno redirige tonos más cálidos hacia tus ojos al atardecer.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Mira hacia arriba en una tarde despejada y el cielo generalmente se ve azul. Pero si miras de nuevo cerca del atardecer, ese mismo cielo puede brillar en anaranjado, rojo, rosa o incluso púrpura." },
        { type: "paragraph", text: "Entonces, ¿qué cambió? El sol sigue siendo el mismo sol. El aire sigue siendo el mismo aire. Pero el camino que recorre la luz solar a través de la atmósfera cambia, y eso hace una enorme diferencia." },
      ] },
      { title: "La Luz Solar No Es de Un Solo Color", blocks: [
        { type: "paragraph", text: "Aunque la luz solar nos parece blanca o amarillenta, en realidad está compuesta por muchos colores mezclados. Puedes imaginar la luz solar como un arco iris empaquetado en un solo rayo." },
        { type: "paragraph", text: "Ese arco iris incluye luz roja, anaranjada, amarilla, verde, azul, índigo y violeta. Cada color viaja como una onda. Algunos colores tienen ondas más largas, como el rojo y el anaranjado. Otros colores tienen ondas más cortas, como el azul y el violeta. Esto importa porque los diferentes colores se comportan de manera diferente cuando chocan con las pequeñas partículas del aire." },
      ] },
      { title: "El Aire No Está Vacío", blocks: [
        { type: "paragraph", text: "El cielo puede parecer espacio vacío, pero la atmósfera de la Tierra está llena de pequeñas moléculas. Estas moléculas son demasiado pequeñas para verlas, pero la luz solar choca con ellas constantemente." },
        { type: "paragraph", text: "Cuando la luz choca con estas pequeñas moléculas de aire, parte de la luz se dispersa. Dispersarse significa que la luz rebota en muchas direcciones en lugar de viajar en línea recta. La luz azul se dispersa más fácilmente que la luz roja o anaranjada porque la luz azul tiene una longitud de onda más corta." },
        { type: "paragraph", text: "Así que durante el día, cuando la luz solar entra en la atmósfera, la luz azul se dispersa por todo el cielo. Esa luz azul dispersa llega a tus ojos desde todas las direcciones, por eso todo el cielo parece azul." },
      ] },
      { title: "¿Por Qué el Cielo No Es Púrpura?", blocks: [
        { type: "paragraph", text: "La luz violeta se dispersa incluso más que la luz azul, así que esta es una gran pregunta. Hay algunas razones por las que el cielo generalmente no parece púrpura. Primero, el sol emite menos luz violeta que azul. Segundo, algo de luz violeta se absorbe en la parte superior de la atmósfera. Tercero, nuestros ojos son mejores viendo azul que violeta." },
        { type: "paragraph", text: "Así que aunque el violeta es parte de la historia, el azul gana." },
      ] },
      { title: "¿Qué Cambia al Atardecer?", blocks: [
        { type: "paragraph", text: "Al atardecer, el sol está bajo en el cielo. Eso significa que la luz solar tiene que viajar por un tramo mucho más largo de atmósfera antes de llegar a tus ojos. Imagina apuntar una linterna directamente a través de un vaso delgado de agua. Ahora imagina apuntarla de lado a través de la parte más larga del vaso. La luz tiene que pasar por mucho más material." },
        { type: "paragraph", text: "Eso es lo que sucede al atardecer. A medida que la luz solar viaja por este camino más largo de aire, gran parte de la luz azul se dispersa antes de llegar a ti. Los colores que quedan son los de longitudes de onda más largas, como el rojo, el anaranjado y el amarillo. Por eso los atardeceres a menudo se ven cálidos y brillantes." },
      ] },
      { title: "¿Por Qué Algunos Atardeceres Son Más Coloridos?", blocks: [
        { type: "paragraph", text: "Algunos atardeceres se ven simples. Otros parecen como si el cielo estuviera en llamas. La diferencia a menudo viene de lo que flota en el aire. El polvo, las gotas de agua, la contaminación, el humo y las nubes pueden afectar cómo se dispersa la luz." },
        { type: "paragraph", text: "Las nubes también pueden actuar como pantallas gigantes. Cuando el sol está bajo, la luz anaranjada y roja puede iluminar la parte inferior de las nubes, haciéndolas brillar. Por eso los atardeceres pueden verse especialmente dramáticos después de una tormenta o cuando el cielo tiene la mezcla perfecta de nubes y espacio despejado." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "El cielo es azul porque la luz azul se dispersa fácilmente en la atmósfera. Los atardeceres son anaranjados y rojos porque la luz solar viaja por más aire, dispersando gran parte de la luz azul y dejando atrás los colores más cálidos." },
        { type: "callout", accent: "orange", text: "Así que la próxima vez que veas un cielo azul o un brillante atardecer anaranjado, no solo estás mirando colores bonitos. Estás viendo la luz solar interactuar con la atmósfera de la Tierra." },
      ] },
    ],
  },
  "why-do-your-ears-pop-on-an-airplane": {
    ...localizedBlogArticles.en["why-do-your-ears-pop-on-an-airplane"],
    title: "¿Por Qué Se Te Tapan los Oídos en el Avión?",
    category: "Ciencia",
    readTime: common.es.minutes.m4,
    imageAlt: "Una vista desde el interior de la cabina de un avión durante el ascenso, ilustrando el cambio de presión que hace que los oídos se tapen",
    imageCaption: "Los tímpanos se flexionan cuando la presión del aire exterior cambia más rápido de lo que tu cuerpo puede equilibrarla. Eso es el pop que sientes durante el despegue y el aterrizaje.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Si alguna vez has volado en avión, quizás sentiste una extraña presión en los oídos durante el despegue o el aterrizaje. Y de repente: pop." },
        { type: "paragraph", text: "Puede sentirse raro, molesto o incluso un poco incómodo. Pero tus oídos no están rotos. Están reaccionando a la presión del aire." },
      ] },
      { title: "El Aire Tiene Presión", blocks: [
        { type: "paragraph", text: "El aire puede parecer ligero, pero igual ejerce presión sobre las cosas. El aire que te rodea siempre empuja tu cuerpo desde todas las direcciones. Al nivel del mar hay mucho aire encima de ti, por lo que la presión del aire es mayor. Más arriba en el cielo hay menos aire encima, por lo que la presión es menor." },
        { type: "paragraph", text: "Cuando un avión despega, sube hacia un aire con menor presión. Cuando aterriza, regresa a un aire con mayor presión. Aunque las cabinas de los aviones están presurizadas para mantener a los pasajeros seguros y cómodos, la presión dentro de la cabina igual cambia. Tus oídos lo notan." },
      ] },
      { title: "Tu Tímpano Siente la Diferencia", blocks: [
        { type: "paragraph", text: "Dentro de tu oído hay un tejido delgado llamado tímpano. Vibra cuando el sonido lo golpea, ayudándote a escuchar. Hay aire en ambos lados del tímpano: aire fuera de tu oído y aire detrás del tímpano en tu oído medio." },
        { type: "paragraph", text: "Para que tu oído se sienta normal, la presión en ambos lados del tímpano debe estar equilibrada. Cuando la presión fuera de tu oído cambia rápidamente, la presión detrás del tímpano puede no cambiar de inmediato. Esa diferencia de presión puede empujar o jalar el tímpano. Esa es la sensación de oído tapado o incómodo que sientes." },
      ] },
      { title: "La Trompa de Eustaquio Ayuda a Resolverlo", blocks: [
        { type: "paragraph", text: "Tu cuerpo tiene un tubo pequeño llamado trompa de Eustaquio. Conecta tu oído medio con la parte trasera de la garganta. La mayor parte del tiempo, este tubo está cerrado. Pero cuando tragás, bostezás o masticás, puede abrirse por un momento." },
        { type: "paragraph", text: "Cuando se abre, el aire puede entrar o salir de tu oído medio. Eso ayuda a equilibrar la presión en ambos lados del tímpano. El pop que sientes es la presión igualándose de repente." },
      ] },
      { title: "Por Qué el Aterrizaje Puede Sentirse Peor que el Despegue", blocks: [
        { type: "paragraph", text: "Muchas personas sienten más sus oídos durante el aterrizaje que durante el despegue. Eso es porque durante el aterrizaje, la presión del aire en la cabina aumenta a medida que el avión se acerca al suelo. Tu oído medio necesita dejar entrar más aire para igualar la presión exterior." },
        { type: "paragraph", text: "Si tus trompas de Eustaquio no se abren fácilmente, los tímpanos pueden sentirse apretados hacia adentro. Eso puede doler más que el cambio de presión durante el despegue. También es por eso que volar con resfriado puede ser incómodo: si la nariz y la garganta están tapadas, las trompas de Eustaquio pueden no abrirse tan fácilmente." },
      ] },
      { title: "Por Qué Tragar o Bostezar Ayuda", blocks: [
        { type: "paragraph", text: "Tragar y bostezar mueven los músculos cerca de las trompas de Eustaquio. Ese movimiento puede ayudar a que los tubos se abran. Masticar chicle, tomar sorbos de agua o bostezar durante el despegue y el aterrizaje puede ayudar a que los oídos se ajusten porque esas acciones animan al sistema de equilibrio de presión a funcionar." },
        { type: "paragraph", text: "Los bebés a menudo lloran en los aviones en parte porque sienten la presión en los oídos pero no saben cómo resolverlo. Llorar los hace mover la garganta y la boca, lo que en realidad puede ayudar a que los oídos se destapen." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los oídos se tapan en los aviones porque la presión del aire cambia mientras el avión sube o baja. El tímpano siente la diferencia y las trompas de Eustaquio ayudan a equilibrar la presión." },
        { type: "callout", accent: "orange", text: "Ese pequeño pop es tu cuerpo haciendo un ajuste. Puede sentirse raro, pero en realidad es un sistema inteligente incorporado haciendo su trabajo." },
      ] },
    ],
  },
  "why-does-metal-feel-colder-than-wood": {
    ...localizedBlogArticles.en["why-does-metal-feel-colder-than-wood"],
    title: "¿Por Qué el Metal Se Siente Más Frío que la Madera?",
    category: "Ciencia",
    readTime: common.es.minutes.m4,
    imageAlt: "Objetos de metal y madera uno al lado del otro a temperatura ambiente, ilustrando que se sienten diferentes aunque están a la misma temperatura",
    imageCaption: "El metal y la madera a la misma temperatura se sienten completamente diferentes porque el metal conduce el calor de tu mano mucho más rápido. La sensación es velocidad, no temperatura.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Toca la pata de una silla de metal y una mesa de madera en la misma habitación. El metal puede sentirse frío, mientras que la madera se siente más cálida. Pero aquí está la parte sorprendente: probablemente están a la misma temperatura." },
        { type: "paragraph", text: "Entonces, ¿por qué uno se siente más frío? La respuesta no es solo temperatura. Es transferencia de calor." },
      ] },
      { title: "Tu Mano Está Caliente", blocks: [
        { type: "paragraph", text: "Tu cuerpo generalmente está más caliente que los objetos a tu alrededor. Tu piel puede estar a unos 32 °C, mientras que una habitación puede estar a unos 21 °C. Cuando tocas algo más frío que tu mano, el calor se mueve de tu mano hacia ese objeto." },
        { type: "paragraph", text: "Tus nervios no solo sienten la temperatura del objeto. También sienten con qué rapidez el calor está saliendo de tu piel. Si el calor sale de tu mano rápidamente, el objeto se siente frío. Si el calor sale lentamente, no se siente tan frío." },
      ] },
      { title: "El Metal Mueve el Calor Rápidamente", blocks: [
        { type: "paragraph", text: "El metal es un buen conductor térmico. Eso significa que el calor puede moverse a través de él fácilmente. Cuando tocas metal, el calor de tu mano fluye rápidamente hacia el metal y se aleja del punto que tocaste. Como el calor sigue moviéndose, más calor sigue saliendo de tu mano. Tu piel se enfría rápido, así que tu cerebro dice que eso se siente frío." },
        { type: "paragraph", text: "La madera es diferente. La madera es un mal conductor térmico comparado con el metal. El calor no se mueve a través de ella tan rápidamente. Cuando tocas madera, el calor sale de tu mano más despacio. La pequeña área de madera bajo tus dedos se calienta un poco, y el calor no se aleja tan rápido. Así que la madera se siente más cálida, aunque esté a la misma temperatura que el metal." },
      ] },
      { title: "Misma Temperatura, Sensación Diferente", blocks: [
        { type: "paragraph", text: "Este es uno de los trucos más geniales de la ciencia cotidiana: la temperatura y cómo se siente algo no siempre son lo mismo. Una cuchara de metal y una cuchara de madera en el mismo cajón de la cocina probablemente están a la misma temperatura. Ambas han estado en la misma habitación por mucho tiempo. Pero la cuchara de metal se siente más fría porque toma el calor de tu mano más rápido." },
        { type: "callout", accent: "orange", text: "Tu sentido del tacto en realidad está detectando el movimiento del calor. Dos objetos a la misma temperatura pueden sentirse completamente diferentes según la rapidez con que jalan el calor de tu piel." },
      ] },
      { title: "¿Por Qué Importa Esto en el Diseño?", blocks: [
        { type: "paragraph", text: "Los ingenieros piensan en la transferencia de calor todo el tiempo. Una sartén de metal es útil porque transfiere calor rápidamente de la estufa a la comida. Pero eso también significa que el mango puede calentarse, por eso muchas sartenes tienen mangos de plástico, goma o madera." },
        { type: "paragraph", text: "Un abrigo de invierno funciona porque ralentiza la transferencia de calor. Atrapa el aire, y el aire no es bueno moviendo calor. Eso ayuda a mantener el calor de tu cuerpo cerca de ti. Un tobogán de metal bajo el sol puede ponerse muy caliente porque el metal transfiere calor rápidamente. Un banco de madera puede sentirse más cómodo porque no mueve el calor tan agresivamente." },
      ] },
      { title: "¿Qué Pasa con el Clima Frío?", blocks: [
        { type: "paragraph", text: "En clima frío, tocar metal puede sentirse dolorosamente frío porque jala el calor de tu piel tan rápidamente. Por eso el equipo de los parques, los pasamanos y las herramientas de metal pueden sentirse mucho más fríos que la madera o el plástico afuera en invierno. El metal no está mágicamente más frío. Solo es mejor robando calor de tu mano." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "El metal se siente más frío que la madera porque el metal transfiere calor más rápido. Cuando tocas metal, el calor sale de tu mano rápidamente, así que tu piel se enfría rápido. La madera transfiere calor más lentamente, así que se siente más cálida. Entonces cuando dices que algo se siente frío, a menudo estás notando con qué rapidez se mueve el calor, no solo la temperatura del objeto." },
      ] },
    ],
  },
  "why-do-bikes-stay-balanced-when-moving": {
    ...localizedBlogArticles.en["why-do-bikes-stay-balanced-when-moving"],
    title: "¿Por Qué las Bicicletas Se Mantienen Equilibradas al Moverse?",
    category: "Ciencia",
    readTime: common.es.minutes.m5,
    imageAlt: "Una persona montando una bicicleta en movimiento, demostrando el equilibrio y la física que mantienen dos ruedas estables mientras se mueven",
    imageCaption: "Una bicicleta en movimiento resiste la inclinación gracias a las fuerzas giroscópicas, la geometría de dirección y las pequeñas correcciones constantes de tu cerebro, todas trabajando juntas de forma invisible.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Una bicicleta parece que debería caerse. Tiene dos ruedas delgadas, un cuadro estrecho y no mucho que la sostenga erguida. Si intentas equilibrarte en una bicicleta mientras estás parado, es difícil. Pero una vez que la bicicleta empieza a moverse, se vuelve mucho más fácil." },
        { type: "paragraph", text: "Entonces, ¿por qué una bicicleta en movimiento se mantiene equilibrada? La respuesta no es un solo truco. Es una mezcla de movimiento, dirección, diseño y tu cerebro haciendo pequeñas correcciones." },
      ] },
      { title: "El Equilibrio Se Trata de Mantener el Centro Sobre las Ruedas", blocks: [
        { type: "paragraph", text: "Cada objeto tiene un centro de masa. Es el punto donde su peso está equilibrado. Para que una bicicleta y su rider se mantengan erguidos, su centro de masa combinado necesita estar sobre las ruedas. Si el centro de masa se mueve demasiado hacia un lado, la bicicleta empieza a inclinarse." },
        { type: "paragraph", text: "Cuando una bicicleta no se mueve, es difícil corregir esa inclinación. Tienes que girar el manubrio, cambiar tu cuerpo o poner un pie en el suelo. Pero cuando la bicicleta se mueve, dirigir puede ayudar a llevar las ruedas de regreso debajo de ti." },
      ] },
      { title: "Las Bicicletas Dirigen Hacia la Inclinación", blocks: [
        { type: "paragraph", text: "Aquí está la parte extraña: cuando una bicicleta empieza a inclinarse, la rueda delantera puede girar levemente en la dirección de la inclinación. Si la bicicleta se inclina a la izquierda, la rueda delantera puede dirigirse a la izquierda. Eso mueve el camino de la bicicleta de regreso debajo del rider, ayudando a restaurar el equilibrio." },
        { type: "paragraph", text: "Esta es una razón por la que las bicicletas se sienten más estables cuando están rodando. Los riders también hacen esto sin pensar. Estás constantemente haciendo pequeños cambios de dirección mientras pedaleas. La mayoría de ellos son tan pequeños que no los notas. Tu cerebro, brazos y cuerpo trabajan juntos para mantener la bicicleta debajo de ti." },
      ] },
      { title: "Las Ruedas También Ayudan", blocks: [
        { type: "paragraph", text: "Las ruedas de la bicicleta giran mientras pedaleas. Las ruedas girando tienen momento angular, lo que significa que tienden a seguir girando en la misma dirección. Esto puede ayudar a que la bicicleta se sienta más estable, pero no es la explicación completa. Las bicicletas pueden mantener el equilibrio incluso cuando el efecto de la rueda es pequeño. La forma y el diseño de la bicicleta también importan." },
      ] },
      { title: "El Diseño de la Bicicleta Hace el Equilibrio Más Fácil", blocks: [
        { type: "paragraph", text: "La horquilla delantera de una bicicleta está inclinada, no recta hacia arriba y abajo. Esto crea algo llamado avance, que ayuda a la rueda delantera a seguir naturalmente la dirección del movimiento. La idea es simple: la bicicleta está diseñada de modo que la rueda delantera tiende a alinearse de una manera útil. Ese diseño hace la dirección más suave y ayuda a la bicicleta a corregir pequeñas oscilaciones." },
        { type: "paragraph", text: "Los ingenieros se preocupan mucho por esto. Un pequeño cambio en el ángulo de la horquilla o el tamaño de las ruedas puede hacer que una bicicleta se sienta estable, nerviosa, lenta o suave." },
      ] },
      { title: "¿Por Qué Es Más Difícil Andar Despacio?", blocks: [
        { type: "paragraph", text: "Cuando pedaleas despacio, tienes menos tiempo y menos movimiento para corregir una inclinación. La bicicleta no responde tan suavemente, y las pequeñas oscilaciones se sienten más grandes. Por eso andar muy despacio en línea recta es más difícil que andar a una velocidad normal. También es por eso que los principiantes a menudo se sienten más estables una vez que pedalean un poco más rápido." },
      ] },
      { title: "¿Por Qué Una Bicicleta No Puede Quedarse Parada Sola?", blocks: [
        { type: "paragraph", text: "Cuando una bicicleta está quieta, no puede dirigirse de regreso debajo del rider. Si empieza a inclinarse, la gravedad la jala más hacia abajo. Sin movimiento, no hay manera fácil de que las ruedas se muevan debajo del centro de masa. Así que la bicicleta cae a menos que algo la sostenga, como un soporte, una pared, el pie del rider o las ruedas de entrenamiento." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Las bicicletas se mantienen equilibradas al moverse porque la dirección, el movimiento, las ruedas girando, el diseño de la bicicleta y las correcciones del rider trabajan juntos." },
        { type: "callout", accent: "orange", text: "Una bicicleta no se mantiene en pie por magia. Constantemente se está corrigiendo a sí misma, y tú también. Eso es lo que hace que andar en bicicleta se sienta tan suave una vez que agarras el ritmo." },
      ] },
    ],
  },
  "why-do-we-slip-on-ice": {
    ...localizedBlogArticles.en["why-do-we-slip-on-ice"],
    title: "¿Por Qué Nos Resbalamos en el Hielo?",
    category: "Ciencia",
    readTime: common.es.minutes.m4,
    imageAlt: "Un primer plano de una superficie helada que muestra su textura lisa y brillante que reduce drásticamente la fricción bajo los pies",
    imageCaption: "El hielo es resbaladizo porque una fina capa cuasi líquida en su superficie reduce la fricción a casi cero, por lo que tus zapatos casi no tienen nada a qué aferrarse.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Caminar por una acera es fácil. Caminar en el hielo no lo es. Un momento estás bien. Al siguiente, tu pie se desliza hacia adelante, los brazos salen volando y tratas de no caerte." },
        { type: "paragraph", text: "Entonces, ¿por qué el hielo es tan resbaladizo? La respuesta tiene que ver con la fricción, las superficies, la temperatura y lo que sucede entre tu zapato y el hielo." },
      ] },
      { title: "La Fricción Te Ayuda a Caminar", blocks: [
        { type: "paragraph", text: "La fricción es una fuerza que resiste el deslizamiento. Cuando caminas, empujas hacia atrás en el suelo con el pie. La fricción te empuja hacia adelante. Sin suficiente fricción, tu pie se desliza en lugar de agarrarse." },
        { type: "paragraph", text: "Por eso caminar sobre pavimento seco es fácil. La superficie rugosa le da a tus zapatos algo a qué aferrarse. El hielo es mucho más liso que el pavimento, así que hay menos agarre." },
      ] },
      { title: "El Hielo Tiene una Superficie Resbaladiza", blocks: [
        { type: "paragraph", text: "El hielo puede parecer sólido, pero su superficie puede comportarse de una manera curiosa. En muchas condiciones, puede haber una capa extremadamente fina de agua sobre el hielo. Esa fina capa puede hacer la superficie aún más resbaladiza." },
        { type: "paragraph", text: "Tu zapato no solo está tocando suelo sólido y rugoso. Puede estar deslizándose sobre una superficie helada lisa con un poco de agua que actúa como lubricante, algo que reduce la fricción como el aceite en una máquina." },
      ] },
      { title: "La Temperatura Importa", blocks: [
        { type: "paragraph", text: "No todo el hielo es igualmente resbaladizo. El hielo cerca de su punto de fusión a menudo es muy resbaladizo porque es más fácil que se forme una fina capa de agua en la superficie. El hielo extremadamente frío a veces puede ser menos resbaladizo porque hay menos agua líquida en la parte superior. Puede sentirse más seco y crujiente." },
        { type: "paragraph", text: "Eso no significa que el hielo muy frío sea seguro. De todas formas puede ser resbaladizo. Pero la temperatura cambia cómo se comporta la superficie." },
      ] },
      { title: "Los Zapatos También Importan", blocks: [
        { type: "paragraph", text: "Los diferentes zapatos agarran de manera diferente. Los zapatos con suelas planas y lisas no tienen mucho a qué aferrarse. Los zapatos con mayor profundidad de suela pueden presionarse mejor sobre la nieve o las superficies irregulares. Por eso las botas de invierno generalmente tienen fondos con textura. El patrón ayuda a crear más fricción. Pero incluso los buenos zapatos pueden resbalarse en hielo muy liso porque puede no haber suficiente rugosidad para que la suela se aferre." },
      ] },
      { title: "¿Por Qué Nos Deslizamos Tan Rápido?", blocks: [
        { type: "paragraph", text: "Cuando la fricción es baja, no hay mucha fuerza que detenga el movimiento de tu pie. En el pavimento, si tu pie empieza a deslizarse, la fricción lo desacelera rápidamente. En el hielo, la fricción es más débil, así que tu pie sigue deslizándose. Por eso una pequeña pérdida de equilibrio puede convertirse en un gran resbalón." },
      ] },
      { title: "El Hielo Es un Desafío de Diseño", blocks: [
        { type: "paragraph", text: "Los ingenieros y los planificadores de ciudades piensan en las superficies resbaladizas todo el tiempo. Las carreteras, aceras, neumáticos, zapatos y equipos deportivos tienen que lidiar con la fricción. La sal puede ayudar a derretir el hielo. La arena puede agregar rugosidad. Las bandas de rodadura de los neumáticos ayudan a los autos a empujar el agua y el aguanieve. El objetivo siempre es el mismo: aumentar el agarre." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Nos resbalamos en el hielo porque el hielo tiene poca fricción. Su superficie lisa, la posible fina capa de agua, la temperatura y el tipo de zapatos que usamos afectan cuánto agarre tenemos." },
        { type: "callout", accent: "orange", text: "Caminar depende de la fricción más de lo que la mayoría de la gente se da cuenta. Cada paso es un pequeño momento de trabajo en equipo entre tu zapato y el suelo." },
      ] },
    ],
  },
  "how-do-noise-canceling-headphones-work": {
    ...localizedBlogArticles.en["how-do-noise-canceling-headphones-work"],
    title: "¿Cómo Funcionan los Audífonos con Cancelación de Ruido?",
    category: "Ciencia",
    readTime: common.es.minutes.m5,
    imageAlt: "Un par de audífonos con cancelación de ruido con un diagrama que muestra cómo las ondas anti-ruido cancelan las ondas de sonido entrantes",
    imageCaption: "Los audífonos con cancelación de ruido usan un micrófono para detectar el sonido entrante y luego reproducen exactamente la onda opuesta para cancelarlo antes de que llegue a tus oídos.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Los audífonos con cancelación de ruido pueden hacer que la ruidosa cabina de un avión, un viaje en autobús o una sala concurrida se sienta mucho más tranquila. Pero no crean silencio solo usando cojines más gruesos. Algunos audífonos usan la ciencia para combatir el sonido con sonido." },
        { type: "paragraph", text: "Puede sonar imposible, pero funciona porque el sonido viaja en ondas." },
      ] },
      { title: "El Sonido Es una Onda", blocks: [
        { type: "paragraph", text: "El sonido ocurre cuando el aire vibra. Cuando alguien habla, sus cuerdas vocales vibran. Esas vibraciones empujan y jalan el aire, creando ondas de sonido. Las ondas viajan a tus oídos y tu cerebro las convierte en sonido." },
        { type: "paragraph", text: "Una onda de sonido tiene puntos altos y puntos bajos. Puedes imaginarlo como una línea ondulada que se mueve por el aire. Los sonidos fuertes tienen ondas más grandes. Los sonidos suaves tienen ondas más pequeñas." },
      ] },
      { title: "Las Ondas Opuestas Pueden Cancelarse", blocks: [
        { type: "paragraph", text: "Aquí está la idea clave: las ondas pueden sumarse, pero también pueden cancelarse. Si una onda empuja el aire hacia adelante mientras otra onda jala el aire hacia atrás al mismo momento, las dos ondas pueden cancelarse parcialmente." },
        { type: "paragraph", text: "Los audífonos con cancelación de ruido usan esta idea. Intentan crear una onda de sonido opuesta que coincida con el ruido no deseado. Cuando el sonido no deseado y el sonido opuesto se encuentran, se reducen mutuamente. Esto se llama interferencia destructiva." },
      ] },
      { title: "Los Audífonos Primero Escuchan", blocks: [
        { type: "paragraph", text: "Los audífonos con cancelación de ruido tienen micrófonos pequeños. Estos micrófonos escuchan el ruido que te rodea, como el zumbido de un motor de avión o el traqueteo de un tren. Luego la electrónica de los audífonos analiza rápidamente ese sonido y crea una onda opuesta que coincide. Los altavoces dentro de los audífonos reproducen esa onda opuesta cerca de tus oídos." },
        { type: "paragraph", text: "Tus oídos reciben menos ruido original porque parte de él ha sido cancelado." },
      ] },
      { title: "Por Qué Funcionan Mejor con Sonidos Constantes", blocks: [
        { type: "paragraph", text: "La cancelación de ruido funciona especialmente bien con sonidos constantes y repetitivos como motores de aviones, acondicionadores de aire, ventiladores y el traqueteo de trenes. Estos sonidos son más fáciles de predecir y cancelar para los audífonos porque no cambian demasiado de repente." },
        { type: "paragraph", text: "Los sonidos agudos o aleatorios son más difíciles. El ladrido de un perro, un aplauso o alguien que grita de repente cambia rápidamente. Los audífonos pueden reducirlo un poco, pero generalmente no pueden borrarlo completamente. Por eso los audífonos con cancelación de ruido hacen el mundo más tranquilo, no perfectamente silencioso." },
      ] },
      { title: "Cancelación de Ruido Pasiva vs. Activa", blocks: [
        { type: "paragraph", text: "Hay dos maneras en que los audífonos reducen el ruido. La reducción de ruido pasiva viene de bloquear físicamente el sonido; los cojines gruesos de la oreja pueden detener algo del ruido exterior. La cancelación de ruido activa usa micrófonos y ondas de sonido opuestas. Muchos audífonos usan ambos: los cojines bloquean algo de sonido y la electrónica cancela algo de sonido." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los audífonos con cancelación de ruido funcionan escuchando el ruido exterior, creando una onda de sonido opuesta y reproduciéndola a través de pequeños altavoces. Cuando las ondas se encuentran, parte del ruido se cancela." },
        { type: "callout", accent: "orange", text: "No son orejeras mágicas. Son pequeños ingenieros de ondas de sonido sentados en tu cabeza." },
      ] },
    ],
  },
  "why-do-some-things-float-and-others-sink": {
    ...localizedBlogArticles.en["why-do-some-things-float-and-others-sink"],
    title: "¿Por Qué Algunas Cosas Flotan y Otras Se Hunden?",
    category: "Ciencia",
    readTime: common.es.minutes.m4,
    imageAlt: "Estudiantes experimentando con flotabilidad y agua en un taller de ciencias de Avanza STEM",
    imageCaption: "Flotar no es solo cuestión de ser liviano. Tiene que ver con el peso, la forma y cuánta agua se desplaza.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Una piedra se hunde. Una pelota de playa flota. Un enorme barco de acero también flota, aunque el acero es mucho más pesado que el agua. Entonces, ¿qué decide si algo flota o se hunde?" },
        { type: "paragraph", text: "La respuesta es la flotabilidad." },
      ] },
      { title: "El Agua Empuja Hacia Arriba", blocks: [
        { type: "paragraph", text: "Cuando pones algo en el agua, el agua empuja hacia arriba sobre ello. Esa presión hacia arriba se llama fuerza de empuje. Al mismo tiempo, la gravedad jala el objeto hacia abajo. Si la fuerza de empuje hacia arriba es suficientemente fuerte para equilibrar el peso del objeto, el objeto flota. Si la gravedad gana, el objeto se hunde." },
      ] },
      { title: "Los Objetos Empujan el Agua de Su Camino", blocks: [
        { type: "paragraph", text: "Cuando un objeto entra al agua, ocupa espacio. El agua que antes estaba en ese espacio se empuja a un lado. Esto se llama desplazamiento. Cuanta más agua desplaza un objeto, mayor es la fuerza de empuje hacia arriba. Por eso la forma importa tanto." },
      ] },
      { title: "La Densidad Es una Gran Pista", blocks: [
        { type: "paragraph", text: "La densidad significa cuánta materia está empaquetada en cierta cantidad de espacio. Una piedra es densa porque mucha materia está empaquetada en un espacio pequeño. Una pelota de espuma es menos densa porque tiene mucho aire adentro. Si un objeto es más denso que el agua, generalmente se hunde. Si es menos denso que el agua, generalmente flota. Pero la forma puede cambiar la historia." },
      ] },
      { title: "¿Por Qué Puede Flotar un Barco de Acero?", blocks: [
        { type: "paragraph", text: "El acero es más denso que el agua. Una bola sólida de acero se hundiría. Pero un barco no es un bloque sólido de acero. Tiene una forma grande con mucho espacio lleno de aire adentro. Debido a esa forma, el barco distribuye su peso sobre un área grande y desplaza una enorme cantidad de agua." },
        { type: "paragraph", text: "La densidad promedio total del barco, incluyendo el aire dentro de él, es menor que la densidad del agua. Eso le permite flotar. Si el agua inunda el barco, los espacios de aire se llenan. El barco se vuelve más denso en general y puede hundirse." },
      ] },
      { title: "¿Por Qué los Barcos Tienen Fondos Anchos?", blocks: [
        { type: "paragraph", text: "Los barcos están diseñados para empujar suficiente agua a un lado. Un casco más ancho ayuda al barco a desplazar más agua. Más agua desplazada significa más fuerza de empuje hacia arriba. Por eso una canoa, un barco de carga y un crucero tienen formas diseñadas en torno a la flotabilidad, aunque se vean muy diferentes. Los ingenieros deben pensar cuidadosamente en el peso, la forma, el equilibrio y los materiales al diseñar cualquier cosa que flote." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Las cosas flotan cuando la fuerza de empuje hacia arriba del agua puede equilibrar su peso. La densidad importa, pero la forma también." },
        { type: "callout", accent: "orange", text: "Una piedra pequeña se hunde porque es densa y no desplaza suficiente agua. Un barco enorme flota porque su forma le permite empujar suficiente agua para soportar su peso. Flotar no es cuestión de ser liviano. Es cuestión de peso, espacio, forma y el agua empujando de regreso." },
      ] },
    ],
  },
  "why-do-magnets-stick-to-some-metals-but-not-others": {
    ...localizedBlogArticles.en["why-do-magnets-stick-to-some-metals-but-not-others"],
    title: "¿Por Qué los Imanes Se Pegan a Algunos Metales y a Otros No?",
    category: "Ciencia",
    readTime: common.es.minutes.m5,
    imageAlt: "Un imán atrayendo limaduras de hierro que se alinean para revelar las líneas del campo magnético invisible que emana de sus polos",
    imageCaption: "Los imanes se pegan al hierro y al acero porque los pequeños dominios magnéticos dentro de esos metales se alinean con el campo externo. En el cobre o el aluminio, no pueden.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Los imanes parecen simples al principio. Se pegan al refrigerador, agarran sujetapapeles y se adhieren a algunas superficies de metal. Pero luego intentas pegar uno en papel aluminio, una moneda de cobre o una lata de refresco, y no pasa nada. Entonces, ¿por qué los imanes se pegan a algunos metales pero no a otros?" },
        { type: "paragraph", text: "La respuesta viene de las partículas diminutas dentro de los materiales." },
      ] },
      { title: "Los Imanes Tienen Campos Invisibles", blocks: [
        { type: "paragraph", text: "Un imán crea un campo magnético invisible a su alrededor. No puedes ver el campo directamente, pero puedes ver lo que hace: puede jalar ciertos objetos más cerca o hacer que otro imán gire. Un campo magnético es más fuerte cerca de los polos del imán, generalmente llamados norte y sur." },
        { type: "paragraph", text: "Los polos opuestos se atraen. Los polos iguales se repelen. Por eso un lado de un imán puede jalar otro imán hacia sí, mientras que el otro lado lo empuja." },
      ] },
      { title: "No Todos los Metales Son Magnéticos", blocks: [
        { type: "paragraph", text: "Mucha gente piensa que metal automáticamente significa magnético, pero eso no es verdad. El hierro es fuertemente magnético. El acero generalmente es magnético porque contiene hierro. El níquel y el cobalto también son magnéticos. Pero muchos metales comunes no son fuertemente atraídos por los imanes. El aluminio, el cobre, el oro, la plata y el latón generalmente no se pegan a los imanes regulares. Siguen siendo metales. Solo no tienen el comportamiento magnético correcto." },
      ] },
      { title: "Pequeñas Regiones Magnéticas", blocks: [
        { type: "paragraph", text: "Dentro de los materiales magnéticos hay pequeñas regiones llamadas dominios. Puedes imaginar los dominios como pequeños grupos de flechas. Cada flecha apunta en una dirección magnética. En un pedazo ordinario de hierro, muchas de estas flechas apuntan en diferentes direcciones, por lo que sus efectos se cancelan parcialmente." },
        { type: "paragraph", text: "Pero cuando un imán se acerca, muchos dominios pueden alinearse. Cuando suficientes apuntan en la misma dirección, el material es atraído hacia el imán. Por eso un sujetapapeles puede pegarse a un imán: el imán ayuda a alinear las pequeñas regiones magnéticas dentro del metal." },
      ] },
      { title: "¿Por Qué el Cobre No Se Pega?", blocks: [
        { type: "paragraph", text: "El cobre tiene electrones, igual que el hierro, pero sus pequeños efectos magnéticos no se alinean de la misma manera fuerte. La estructura del cobre no le permite volverse fuertemente magnético como el hierro. Así que un imán de refrigerador normal no se pegará al cobre. La misma idea básica aplica al aluminio, al oro y a muchos otros metales porque su estructura interna no crea una atracción magnética fuerte." },
      ] },
      { title: "¿Qué Pasa con el Acero?", blocks: [
        { type: "paragraph", text: "El acero es principalmente hierro mezclado con otros elementos, a menudo carbono. Como contiene hierro, muchos tipos de acero son magnéticos. Pero no todo el acero se comporta igual. Algunos aceros inoxidables son débilmente magnéticos o no muy magnéticos porque su estructura interna es diferente. Por eso un imán puede pegarse fuertemente a un objeto de metal pero apenas pegarse a otro, aunque ambos parezcan acero." },
      ] },
      { title: "Los Imanes Son Útiles Porque Son Selectivos", blocks: [
        { type: "paragraph", text: "El hecho de que los imanes se peguen a algunos metales y no a otros es en realidad útil. Los centros de reciclaje usan imanes para separar el hierro y el acero de otros materiales. Los motores eléctricos usan el magnetismo para crear movimiento. Los altavoces usan imanes para convertir señales eléctricas en sonido. Las brújulas usan el campo magnético de la Tierra para apuntar al norte. El magnetismo no es solo un truco para el refrigerador; es parte de cómo funcionan muchas máquinas." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los imanes se pegan a algunos metales porque esos metales tienen pequeñas regiones magnéticas que pueden alinearse con un campo magnético. El hierro, el acero, el níquel y el cobalto son fuertemente atraídos por los imanes. Metales como el cobre y el aluminio no lo son, porque sus estructuras internas no se alinean de la misma manera." },
        { type: "callout", accent: "orange", text: "Entonces, cuando un imán se niega a pegarse a un objeto de metal, el imán no está roto. El metal simplemente no es del tipo magnético." },
      ] },
    ],
  },
}

localizedBlogArticles.zh = {
  "why-every-kid-should-learn-to-code": {
    ...localizedBlogArticles.en["why-every-kid-should-learn-to-code"],
    title: "为什么每个孩子都应该学习编程，以及如何开始",
    category: "编程",
    readTime: common.zh.minutes.m5,
    authorId: "liam",
    imageAlt: "Avanza STEM 导师在编程工作坊中授课，学生们坐在笔记本电脑前",
    imageCaption: "学生们在 Avanza STEM 工作坊中学习编程基础。",
    endingProject: { href: "/projects/my-first-python-program", label: "试试这个项目：写出你的第一个 Python 程序" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "what-is-ai-explaining-to-kids",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "编程不再只是科技从业者的技能。理解代码背后的逻辑，正在变得像阅读和写作一样基础。" }, { type: "paragraph", text: "当学生第一次让程序运行起来时，他们会意识到自己也能创造东西。" }, { type: "paragraph", text: "在 Clifton 公共图书馆的编程工作坊中，我们曾看到一名学生写出一个只会打印「你好」的程序，然后花了二十分钟不断给它添加新问题、笑话和音效。那一刻不仅仅是兴奋，而是他确信自己能创造东西的瞬间。" }] },
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
    readTime: common.zh.minutes.m4,
    authorId: "enqi",
    imageAlt: "一个鸡蛋表面覆盖着二氧化碳气泡，这是厨房化学反应的特写",
    imageCaption: "厨房化学反应中产生的二氧化碳气泡，和下面几个实验中的气体反应原理相同。",
    endingProject: { href: "/projects/baking-soda-volcano", label: "试试这个项目：小苏打火山" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "math-games-that-make-learning-fun",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "真正的科学不一定需要实验室外套或昂贵设备。许多好实验只需要醋、纸巾和气泡水等家中物品。" },
        { type: "paragraph", text: "每个实验都包含材料、步骤和简单解释，方便和孩子讨论观察结果。" },
        { type: "summary", timeLabel: "所需时间", time: "五个实验共需 30-45 分钟", ageLabel: "适合年龄", age: "5 岁及以上，年龄较小的孩子需要成人协助", supervisionLabel: "需要成人监督", supervision: "需要，尤其是「瓶中鸡蛋」实验，因为会用到明火", learnLabel: "孩子将学到", learn: "化学反应、气体压力、密度和毛细作用", safetyLabel: "安全提示", safety: "点燃火柴和监督鸡蛋实验必须由成人完成" },
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
        { type: "callout", title: "工作坊连接", accent: "teal", text: "在我们的工作坊中，学生们曾就「跳舞的葡萄干」实验中葡萄干为什么会反复上下浮动，讨论了将近十分钟，比准备实验本身花的时间还长。这正是我们希望看到的讨论。" },
      ] },
    ],
  },
  "how-to-build-the-strongest-popsicle-stick-bridge": {
    ...localizedBlogArticles.en["how-to-build-the-strongest-popsicle-stick-bridge"],
    title: "如何建造最坚固的冰棒棍桥",
    category: "工程",
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
        { type: "paragraph", text: "在我们的工作坊中，学生搭建的桥通常重量不到 50 克，却能承受 5 到 15 磅的重量才断裂，超过自身重量的 50 倍。" },
        { type: "quote", text: "我们开始只在上次断裂的地方加棍子，而不是到处乱加。就是从那时起，我们的桥才真正变强了。", attribution: "Avanza STEM 桥梁搭建工作坊一名学生" },
        { type: "callout", accent: "purple", text: "在我们的桥梁工作坊中，学生会优化强度重量比。" },
      ] },
    ],
  },
  "getting-started-with-lego-robotics": {
    ...localizedBlogArticles.en["getting-started-with-lego-robotics"],
    title: "乐高机器人入门：家长指南",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    authorId: "noah",
    imageAlt: "三名学生一起搭建并编程一个乐高机器人",
    imageCaption: "学生们合作搭建并编程他们的第一个乐高机器人。",
    endingProject: { href: "/projects/lego-robot-builder", label: "试试这个项目：搭建你的第一个乐高机器人" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "why-every-kid-should-learn-to-code",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "乐高机器人同时引入工程和编程。学生能看到电机转动、传感器反应，也能看到代码影响现实世界。" }, { type: "paragraph", text: "这份指南帮助家长选择套件并支持孩子学习。" }, { type: "paragraph", text: "在我们的机器人工作坊中，学生们常常整节第一节课都在努力让机器人沿直线前进。这个不断尝试和调整的过程，往往就是当天最重要的学习。" }] },
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
    readTime: common.zh.minutes.m4,
    authorId: "liam",
    imageAlt: "学生们在 Avanza STEM AI 工作坊中使用电脑，屏幕上显示着图表",
    imageCaption: "学生们在 Avanza STEM 工作坊中亲手探索 AI 概念。",
    endingProject: { href: "/projects/my-first-python-program", label: "试试这个项目：写出你的第一个 Python 程序" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "why-every-kid-should-learn-to-code",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "AI 会推荐视频、影响社交媒体、驱动语音助手并过滤邮件。孩子们常常在理解它之前就已经在使用它。" }, { type: "paragraph", text: "理解 AI 是一种现代素养：要学会问系统用什么数据学习、缺少谁的视角。" }] },
      { title: "从孩子熟悉的东西开始", blocks: [{ type: "callout", accent: "teal", text: "Spotify 给你推荐新歌时，它是怎么选出来的?" }, { type: "paragraph", text: "这个问题自然引出模式识别。在我们的 AI 工作坊中，我们会先问学生这个问题，再做任何解释。他们的回答几乎总能说到点子上，这正是我们想要的效果。" }] },
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
    readTime: common.zh.minutes.m3,
    authorId: "enqi",
    imageAlt: "一个色彩鲜艳的木制算盘，用于培养数感",
    imageCaption: "木制算盘是许多能在孩子接触练习册之前培养数感的简单工具之一。",
    endingProject: { href: "/games", label: "试试这些游戏" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "5-easy-science-experiments",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "数学焦虑常常来自练习册、限时测试和红色批改。游戏能改变这种体验。" },
        { type: "paragraph", text: "这些游戏适合 2 到 5 年级，并且材料很简单。" },
        { type: "summary", timeLabel: "所需时间", time: "每个游戏 10-20 分钟", ageLabel: "适合年龄", age: "2-5 年级（7-11 岁）", supervisionLabel: "需要成人监督", supervision: "不需要。孩子可以自己玩，也可以和家人一起玩", learnLabel: "孩子将学到", learn: "数感、心算、分数和估算" },
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
  "why-triangles-are-an-engineers-secret-weapon": {
    ...localizedBlogArticles.en["why-triangles-are-an-engineers-secret-weapon"],
    title: "为什么三角形是工程师的秘密武器",
    category: "工程",
    readTime: common.zh.minutes.m5,
    imageAlt: "学生在 Avanza STEM 工程工作坊检查用冰棍棒搭成的桁架桥",
    imageCaption: "学生在 Avanza STEM 工作坊检验桁架桥。设计中的三角形不是装饰，而是承重的关键所在。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "在 Avanza STEM 工程工作坊，学生看到一座坚固的桥时，最常问的问题是：为什么这个设计管用？答案几乎总会回到同一个形状：三角形。" },
        { type: "paragraph", text: "这不只是一条要死记的规则。一旦你理解了三角形为什么特别，就会发现它无处不在：桥梁、塔楼、自行车车架、屋顶、过山车……" },
      ] },
      { title: "正方形的问题", blocks: [
        { type: "paragraph", text: "想象用四根木棍和胶带拼一个正方形框架。如果你推一个角，框架会侧倒，变成菱形。这叫做变形，因为正方形有四个可以旋转的关节。" },
        { type: "callout", title: "关键区别", accent: "purple", text: "三角形有三条边和三个角。在不弯折或折断某条边的情况下，你根本无法改变三角形的形状。这就是它的刚性所在。" },
        { type: "paragraph", text: "这就是为什么正方形不适合承重结构，而三角形才是正确选择。" },
      ] },
      { title: "加一条斜边能带来什么", blocks: [
        { type: "paragraph", text: "这里有一个妙招：取一个正方形框架，斜着加一根木棍。你现在有了两个三角形，整个结构瞬间坚固许多。" },
        { type: "paragraph", text: "那一根斜棍不只是加固了正方形，而是将它分成了两个三角形，整体变得硬挺。在我们的冰棍棒桥工作坊，加了斜向支撑的学生明显发现，他们的面板能承受更多重量才会失效。" },
        { type: "callout", accent: "purple", text: "一根斜棍就能区分脆弱与坚固。这就是三角剖分的全部思想。" },
      ] },
      { title: "为什么三角形在工程中随处可见", blocks: [
        { type: "paragraph", text: "一旦你理解了刚性形状，就会在周围发现三角形被用于承重结构。" },
        { type: "list", items: ["桁架桥：经典桥梁设计用一系列相连的三角形来承载荷载", "埃菲尔铁塔：由格状三角形构成，能在大风中弯曲而不倒塌", "自行车车架：几乎每辆自行车的主车架都内置了一个三角形", "屋顶椽木：斜坡屋顶的 A 形创造了一个坚固的三角形", "施工吊车：悬臂采用三角形格架，能承受巨大荷载", "过山车：支撑结构经过三角化处理，能承受快速变向和乘客重量"] },
      ] },
      { title: "背后的科学：力如何在三角形中传导", blocks: [
        { type: "numbered", items: [
          { title: "三角形将力转化为拉力和压力", body: "当荷载压在三角形上时，每个构件要么被拉伸（拉力），要么被挤压（压力）。没有弯矩，而弯矩才是造成断裂的原因。" },
          { title: "三角形每条边都分担荷载", body: "正方形框架将应力集中在角点，三角形则同时沿三条边分散力。" },
          { title: "形状保持固定", body: "只要没有构件失效，三角形在荷载下就无法改变形状。正方形则不然。" },
        ] },
      ] },
      { title: "自己试试看", blocks: [
        { type: "paragraph", text: "你不需要实验室。准备四根冰棍棒和胶带。" },
        { type: "list", items: ["拼一个正方形：四根棍首尾相连用胶带固定。推一个角，观察它倾斜。", "斜着加第五根棍穿过中间。再推同一个角，观察它有多稳。", "试着用三根棍拼三角形，比比看稳定性有多大差异。", "把多个三角形连在一排，看看能搭出什么结构。"] },
        { type: "callout", accent: "purple", text: "在我们的桥梁工作坊，最坚固的桥总是那些由一系列相连三角形构成的桥。理解了原因的学生会做出更好的桥，也知道失败时该修哪里。" },
      ] },
      { title: "这对你的桥意味着什么", blocks: [
        { type: "paragraphWithLink", before: "如果你正在搭冰棍棒桥，需要一步步的搭建说明，我们的", linkText: "冰棍棒桥梁项目指南", href: "/projects/popsicle-stick-bridge", after: "详细介绍了如何用这些原理搭建完整的桁架桥。" },
        { type: "ctaLink", title: "搭一座桁架桥", text: "在我们的工程工作坊，学生会搭冰棍棒桥，并测试三角桁架能承受多少重量。", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "how-engineers-think-when-something-breaks": {
    ...localizedBlogArticles.en["how-engineers-think-when-something-breaks"],
    title: "东西坏了，工程师怎么思考？",
    category: "工程",
    readTime: common.zh.minutes.m4,
    imageAlt: "学生在 Avanza STEM 工程工作坊用书测试一座刚失效的桥",
    imageCaption: "一个刚刚失效的结构不是损失，而是数据。学生会分析断裂的位置和原因，再思考如何改进。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "在 Avanza STEM 工程工作坊，几乎每节课都会有东西坏掉。桥被重量压垮，加上一块积木后塔倒了，纸板结构翻了。几乎每一次，搭建者在那一刻都能立刻知道哪里出了问题。" },
        { type: "paragraph", text: "那个领悟的瞬间——\"哦，它从接头断了，因为我没粘好\"——是整节课最重要的时刻。这不是失败，而是信息。" },
        { type: "youtube", videoId: "xPp8R64YEHQ", title: "东西坏了，工程师怎么思考？", caption: "快速了解工程师在设计失败时所用的思维方式。" },
      ] },
      { title: "工程师问的第一个问题", blocks: [
        { type: "paragraph", text: "东西坏了，工程师的第一个问题不是\"我做错了什么\"，而是：\"它在哪里断的，这说明什么？\"" },
        { type: "paragraph", text: "桥在中间断裂，说明中间是最薄弱的地方。接头脱开，说明连接不够牢固。断裂本身就在告诉你下一次该怎么搭。" },
        { type: "callout", title: "工程思维框架", accent: "purple", text: "坏掉的结构是有用的。从未测试过的结构什么也告诉不了你。" },
      ] },
      { title: "改进循环", blocks: [
        { type: "paragraph", text: "工程师使用一种迭代循环，有时称为设计循环。它不是从想法到成功的直线，而是这样的：" },
        { type: "numbered", items: [
          { title: "明确目标", body: "结构究竟需要做什么？承受 5 磅重？跨越 30 厘米？重量越轻越好？" },
          { title: "搭建第一版", body: "不要试图第一次就做到完美，而是让它能被测试。" },
          { title: "主动测试", body: "施加实际的荷载或压力，不要猜测它会怎么表现。" },
          { title: "观察失效点", body: "不只注意它失效了，还要看清楚在哪里、以何种方式失效。那个细节就是数据。" },
          { title: "每次只改一处", body: "如果你同时改三处，下一版虽然更好，你却不知道是哪处改动起了作用。" },
          { title: "再次测试", body: "重复。每一轮都能给你比上一轮更多的信息。" },
        ] },
      ] },
      { title: "这在 Avanza STEM 工作坊是什么样子", blocks: [
        { type: "paragraph", text: "在桥梁搭建课中，学生通常搭一次就进行测试。即使只有一次测试，也能学到很多。当桥弯曲、扭转或最终断裂时，学生能看清设计的哪个部分承受了最大的应力。" },
        { type: "paragraph", text: "最重要的是测试之后的对话：它在哪里失效，为什么那个点撑不住，如果搭第二版你会加固哪里？" },
        { type: "callout", accent: "purple", text: "即使只搭一次，也能学到完整的工程思维：做出设计，诚实地测试，研究结果，说明下一版会改什么。" },
      ] },
      { title: "只改一处规则", blocks: [
        { type: "paragraph", text: "这条规则比大多数学生意识到的更重要：东西坏了后，在下一次测试前只改一处。" },
        { type: "paragraph", text: "如果桥坏了，你重建时改了接头、换了桁架形状、又加了支撑，你能学到的很少。也许它能承受更多重量，但你不知道是哪处改动起了作用，所以无法把这个知识用到下一次搭建。" },
        { type: "callout", accent: "purple", text: "改一处。测试。观察。再改下一处。这才是工程师找到真正有效方法的方式，而不是靠运气。" },
      ] },
      { title: "这种思维方式适用于所有地方", blocks: [
        { type: "paragraph", text: "工程思维不只适用于结构。观察、假设、测试、改进这套模式在各处都能看到：" },
        { type: "list", items: ["科学：失败的实验能告诉你关于条件或假设的具体问题", "编程：崩溃的程序会给你报错信息，改动前仔细读它", "数学：错误的答案告诉你回头检查哪一步，而不是说你不擅长数学", "运动：没投中的球告诉你调整姿势或时机，而不是放弃"] },
        { type: "ctaLink", title: "参加免费工程工作坊", text: "在我们的工程工作坊，学生会搭建、测试，并用结果做出更好的设计决策。", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "design-a-mars-rover-out-of-cardboard": {
    ...localizedBlogArticles.en["design-a-mars-rover-out-of-cardboard"],
    title: "用纸板设计一辆火星探测车",
    category: "工程",
    readTime: common.zh.minutes.m5,
    imageAlt: "学生在 Avanza STEM 工作坊完成一项动手工程设计挑战",
    imageCaption: "Avanza STEM 的工程挑战从设计简报和约束条件出发，以真实测试结束。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "NASA 的火星探测车要在距离最近维修站 1.4 亿英里的地方工作。如果轮子坏了或传感器失灵，没有人能去修。每一个设计决策都要考虑到这一点。" },
        { type: "paragraph", text: "你今天不会设计能飞越 1.4 亿英里的东西，但你会面对同样类型的约束：材料有限、有重量限制、要翻越崎岖地形，而且你的探测车在测试时必须真正能运作。" },
      ] },
      { title: "任务简报", blocks: [
        { type: "callout", title: "你的任务", accent: "purple", text: "用纸板、胶带和基础材料设计一辆火星探测车。你的探测车必须能携带一个小型货物，穿越崎岖地形，并通过跌落测试。你有 45 分钟。" },
      ] },
      { title: "你需要的材料", blocks: [
        { type: "list", items: ["纸板（谷物盒、快递盒，任意硬纸板）", "布基胶带或美纹纸胶带", "剪刀", "纸板管（纸巾或卫生纸卷筒）", "吸管", "小纸杯", "可选：黄铜扣、橡皮筋、直尺"] },
      ] },
      { title: "你的设计目标", blocks: [
        { type: "paragraph", text: "真正的工程师要按具体要求接受检验。以下是你的要求：" },
        { type: "numbered", items: [
          { title: "携带货物", body: "你的探测车必须能托住一个装有 3 枚硬币或 3 块小石头的小杯，不倒翻。" },
          { title: "通过地形", body: "你的探测车必须能滚过一张揉皱的笔记本纸，不卡住、不停下。" },
          { title: "通过跌落测试", body: "从膝盖高度跌落。探测车必须保持完整，之后仍能滚动。" },
          { title: "附加挑战：机械臂", body: "在车身外伸出一个零件，像探测车臂一样，能\"伸向\"地面，而整辆车不移动。" },
        ] },
      ] },
      { title: "你的设计约束", blocks: [
        { type: "paragraph", text: "真实工程永远有约束。在约束内工作就是这份工作的内容。以下是你的约束：" },
        { type: "list", items: ["最大尺寸：必须放进鞋盒", "不用热熔胶，只用胶带和扣件", "轮子必须是圆的（任意尺寸，但必须真正是圆的）", "最长搭建时间：45 分钟", "测试前你必须能说明一个设计决策"] },
      ] },
      { title: "搭建前要思考的工程问题", blocks: [
        { type: "numbered", items: [
          { title: "几个轮子？", body: "四个轮子比三个更稳定，但更多轮子意味着更重、更容易出故障。真实探测车用六个轮子，每个轮子独立连接，这样一个轮子碰到石头不会让整车翻倒。" },
          { title: "重量在哪里？", body: "重量高，探测车容易翻；重量低，探测车更稳。把重的零件尽量靠近地面。" },
          { title: "轴距多宽？", body: "左右轮之间的距离叫轨距。轨距越宽越不容易侧翻，越窄能通过更窄的空间。" },
          { title: "一个轮子碰到颠簸怎么办？", body: "如果车轴是刚性的，一个轮子碰到颠簸会把整侧抬起。真实探测车用摇臂-转向架悬挂，每个轮子独立移动。你能用纸板和胶带做类似的东西吗？" },
        ] },
      ] },
      { title: "测试后问这些问题", blocks: [
        { type: "list", items: ["货物测试时它翻了吗？重量集中在哪里？", "它在揉皱的纸上卡住了吗？是轮子陷下去了，还是车身拖地？", "它通过了跌落测试吗？哪部分先坏？", "如果再给你十分钟，你会做什么改变？"] },
        { type: "paragraph", text: "把答案写下来或画出来。那份记录就是区分第一版和更好的第二版的东西。" },
        { type: "quote", text: "一个学生在他的探测车前端用一条弯曲的纸板条加了一个斜坡，说是用来推开石头的。我问他有没有在真正的探测车上见过这个，他说没有，他只是觉得会有用。这就是正确的思考方式。", attribution: "Noah Lopez，Avanza STEM 导师" },
      ] },
      { title: "与真实探测车的联系", blocks: [
        { type: "paragraph", text: "NASA 现役火星探测车毅力号重约 1025 千克，有六个独立连接的轮子。它携带摄像机、麦克风、钻头以及一架名为\"机智号\"的直升机。每个零件都必须足够轻才能发射，足够强才能着陆，足够可靠才能在无人维修的情况下运行多年。" },
        { type: "paragraph", text: "你正在思考的设计问题——重量分布、轮子数量、地形通过能力、载货容量——都是真正的探测车工程师要回答的同类问题，只是规模完全不同。" },
        { type: "ctaLink", title: "亲身体验工程", text: "在我们的工作坊，学生会完成像这样的设计挑战，并在真实约束下测试他们的作品。", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "what-is-ai-actually-doing-when-it-answers-you": {
    ...localizedBlogArticles.en["what-is-ai-actually-doing-when-it-answers-you"],
    title: "AI 回答问题时，它究竟在做什么？",
    category: "AI",
    readTime: common.zh.minutes.m5,
    imageAlt: "一张平板电脑上空发光的 AI 图形，背景是数字网络线",
    imageCaption: "在 Avanza STEM 的 AI 工作坊，学生学会追问 AI 究竟在做什么，而不只是判断答案听起来对不对。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "当你在 AI 聊天工具里输入一个问题，几秒钟后它就给出回答，中间究竟发生了什么？很多人以为 AI 搜索了互联网，或者从数据库里检索了答案，或者查阅了某种储存的知识。这些都不太对。" },
        { type: "paragraph", text: "更准确的答案是：AI 根据它训练时接触过的大量数据中的规律，一次一个词地预测接下来应该出现什么文字。这个答案比大多数人预期的更奇特，也更有趣。" },
      ] },
      { title: "它更像自动补全，而不是搜索引擎", blocks: [
        { type: "callout", accent: "teal", text: "想想手机上的自动补全。它根据你的信息中通常会跟着出现的词来建议下一个词。语言模型做的是类似的事，但要复杂得多，规模也大得多。" },
        { type: "paragraph", text: "当 AI 生成回复时，它不是在检索一个储存好的答案。它在计算哪个词最有可能跟在前面所有内容之后出现，然后一遍又一遍地重复这个过程，直到回复完成。" },
        { type: "paragraph", text: "这就是为什么 AI 能这么快生成回复。它不是像你那样思考问题，而是在运行一个非常快速的模式匹配计算。" },
      ] },
      { title: "AI 是如何学会该说什么的", blocks: [
        { type: "numbered", items: [
          { title: "用文本训练", body: "语言模型在大量书面文本上训练，包括文章、书籍、网站、代码等，接触了数十亿个语言使用的例子。" },
          { title: "学习规律", body: "模型学习统计规律：在这组词之后，这些词往往会跟着出现。这些规律过于复杂，难以简单描述，但它们是规律，不是某个人写的规则。" },
          { title: "获得反馈", body: "然后模型接受人类评估者的评分，他们评估哪些回复更有帮助、更准确、更恰当。模型根据反馈进行调整。" },
          { title: "生成回复", body: "当你提问时，模型使用这些规律生成一个回复，让它看起来像训练中见过的有帮助的答案。" },
        ] },
      ] },
      { title: "为什么它可以听起来对但实际上是错的", blocks: [
        { type: "paragraph", text: "因为 AI 生成的是统计上可能的文本，而不是经过核实的事实，它可能产生听起来自信权威但实际上有误的回复。这有时被称为\"幻觉\"——AI 以听起来像真的方式陈述了不真实的内容。" },
        { type: "list", items: ["AI 不知道自己不知道什么", "它可能混淆不同语境中相似的名字、日期或事件", "它生成的是听起来合理的内容，而不是经过核实的内容", "它无法实时查询来检验自己的答案"] },
        { type: "callout", title: "诚实的版本", accent: "teal", text: "一个说\"我不确定这个\"的 AI，比一个每次都听起来完全自信的 AI 更有用。提问追问，核实重要的说法。" },
      ] },
      { title: "AI 真正擅长什么", blocks: [
        { type: "paragraph", text: "了解局限性能帮助你有效地使用 AI，而不是过度信任或完全回避它。" },
        { type: "list", items: ["用多种方式解释概念，直到找到一种你能理解的", "快速生成提纲、草稿和例子", "总结在训练数据中有充分覆盖的想法", "头脑风暴选项和替代方案", "帮助编辑和改写", "写出你自己再测试的代码"] },
        { type: "paragraph", text: "对于需要可证明正确的任务——比如某个具体事实、医疗问题或法律决定——要用可靠来源核实 AI 的回复。" },
      ] },
      { title: "一个好习惯：让它解释自己", blocks: [
        { type: "paragraph", text: "使用 AI 时，在它给出答案后，试着问：\"你怎么知道这个？\"或者\"我去哪里核实这个？\"你得到的回复往往很有启发性。" },
        { type: "callout", accent: "teal", text: "在我们的 AI 工作坊，我们让学生选一条 AI 回复并尝试进行事实核查。目标不是不信任 AI，而是像阅读任何来源一样阅读它：带着自己的判断。" },
        { type: "quote", text: "我问了一位科学家的事，它把发现日期说错了三十年。如果我们没有去查，我就会相信了。现在我会去查了。", attribution: "Avanza STEM AI 工作坊的一名学生" },
      ] },
      { title: "这对孩子和家长意味着什么", blocks: [
        { type: "paragraph", text: "在使用 AI 工具的环境中长大的孩子，能从基本了解这些系统做什么、不做什么中受益。这种了解会塑造他们阅读 AI 输出的方式。" },
        { type: "list", items: ["用 AI 头脑风暴和起草，而不是查找具体事实", "用第二个来源交叉核实重要答案", "注意 AI 听起来过于自信的时候，提追问", "明白 AI 不总是错的，但也不总是对的"] },
        { type: "paragraphWithLink", before: "关于 AI 如何从数据中学习以及不同类型的 AI 工具，请参阅我们早先的指南：", linkText: "什么是 AI？向孩子解释人工智能", href: "/blog/what-is-ai-explaining-to-kids", after: "。" },
        { type: "ctaLink", title: "亲身了解 AI", text: "在我们的 AI 工作坊，学生会使用简单的 AI 系统，尝试找出它们的错误，并讨论他们学到了什么。", linkText: "查看近期工作坊", href: "/workshops", accent: "teal" },
      ] },
    ],
  },
  "how-to-think-like-an-inventor-in-20-minutes": {
    ...localizedBlogArticles.en["how-to-think-like-an-inventor-in-20-minutes"],
    title: "20 分钟内，像发明家一样思考",
    category: "工程",
    readTime: common.zh.minutes.m5,
    imageAlt: "一个孩子在思考，头顶画着问号和发光的灯泡",
    imageCaption: "在 Avanza STEM 工作坊，学生直接开始搭建，再从中找出需要改进的地方。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "大多数发明都源于某人感到不耐烦。拉链是因为鞋带总是松开而发明的。便利贴来自一种黏性不够强的胶水。魔术贴来自一次穿越满是芒刺田野的散步。" },
        { type: "paragraph", text: "发明家不是一开始就想着要发明什么，而是先注意到一个让自己烦恼的问题，再问：如果有更好的方法会怎样？" },
      ] },
      { title: "发明家循环", blocks: [
        { type: "paragraph", text: "你不需要特殊材料或实验室就能像发明家一样思考。你只需要四个步骤和大约二十分钟。" },
        { type: "numbered", items: [
          { title: "找到一个问题", body: "寻找小而烦人的事情。总是自动关上的门，总是松脱的手机充电线，总是卡住的书包拉链。小烦恼比大烦恼更适合发明，因为你真的能测试解决方案。" },
          { title: "画出一个解决方案", body: "把可能的解决方法画出来，哪怕只是纸上的粗略形状。你不是要让它完美，而是要让你的想法具体到可以讨论。" },
          { title: "搭建粗糙的原型", body: "用手边的材料：纸、胶带、纸板、橡皮筋。原型不需要好看，只需要能被测试。" },
          { title: "测试它", body: "试着弄坏你的原型。如果第一次就完美运作，你的测试还不够难。找到弱点，那就是你下一个要解决的问题。" },
        ] },
      ] },
      { title: "找到值得解决的问题", blocks: [
        { type: "paragraph", text: "对大多数学生来说，最难的是第一步——不是因为没有问题，而是他们习惯了忽略小烦恼而不是关注它们。" },
        { type: "callout", accent: "purple", text: "在 Avanza STEM 工作坊，我们给学生一分钟安静时间，让他们在房间里走走，写下三件可以改进的事情。几乎每个学生都能找到至少两件。" },
        { type: "list", items: ["什么事情花的时间比应该的要长？", "什么东西坏的频率比应该的要高？", "你总是需要用奇怪的方式拿着什么东西？", "你每天都做但希望不用做的事情是什么？"] },
        { type: "paragraph", text: "选最小的那个。你能拿在手里的问题，比横跨整个系统的问题更容易发明解决方案。" },
      ] },
      { title: "为什么搭建前先画草图很重要", blocks: [
        { type: "paragraph", text: "草图不只是一张图，而是一个决定。当你画出你的解决方案时，你必须确定大致形状：铰链在哪里，哪一侧打开，把手应该多宽。" },
        { type: "paragraph", text: "这个确定让你能测试想法。没有草图，你会边做边调整，也可以，但更慢。有了草图，你知道自己想搭什么，也能注意到现实与计划的差异。" },
        { type: "callout", title: "一条规则", accent: "purple", text: "在触碰任何材料之前，先画出至少一个版本的想法。草图不需要好看，只需要存在。" },
      ] },
      { title: "什么算原型", blocks: [
        { type: "paragraph", text: "原型是你能搭建并测试的、你的想法最快速的版本。它不是成品，不需要好看，它应该告诉你一件你原本不知道的事。" },
        { type: "list", items: ["用胶带而不是胶水粘，因为你会拆开它", "用最简单的形状来测试你最关心的那件事", "只为一个具体问题搭建：铰链能撑住吗？它合适吗？它能滑动吗？", "在 10 分钟内搭好，否则就是太复杂了"] },
      ] },
      { title: "20 分钟发明家挑战", blocks: [
        { type: "summary", timeLabel: "时间", time: "共 20 分钟", ageLabel: "适合年龄", age: "8 岁及以上", supervisionLabel: "材料", supervision: "纸、胶带、纸板、剪刀、橡皮筋，以及你能找到的任何东西", learnLabel: "你练习的内容", learn: "问题识别、设计思维、快速原型制作和迭代" },
        { type: "callout", title: "现在试试", accent: "purple", text: "设置 20 分钟计时器。在房间里找一个问题。画出一个解决方案。搭建一个粗糙版本。测试一次。写下如果再给你十分钟，你会改什么。" },
        { type: "quote", text: "她决定解决铅笔总是从桌上滚下去的问题。她沿着桌边粘了一小条纸板边沿。管用了。然后她开始问还有什么可以修。", attribution: "Avanza STEM 工程工作坊导师" },
      ] },
    ],
  },
  "why-your-first-design-is-usually-not-your-best-one": {
    ...localizedBlogArticles.en["why-your-first-design-is-usually-not-your-best-one"],
    title: "为什么第一个设计通常不是最好的",
    category: "工程",
    readTime: common.zh.minutes.m4,
    imageAlt: "学生在 Avanza STEM 工作坊检查一个刚在荷载测试中倒塌的结构",
    imageCaption: "桥倒塌的那一刻不是课程的终点，通常才是真正学习的开始。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "在 Avanza STEM 的几乎每次工程工作坊，桥都会倒塌。而搭桥的孩子脸上几乎都会出现同样的表情：不是垂头丧气，而是在思考。" },
        { type: "paragraph", text: "那个表情就是从内部感受到迭代的样子。即使没有时间完全重建，那次测试也改变了学生对自己设计的理解。" },
      ] },
      { title: "\"完成品\"的迷思", blocks: [
        { type: "paragraph", text: "大多数人以为好设计来自于一个聪明人在动手之前深思熟虑。工程不是这样运作的，大多数创意领域也不是。" },
        { type: "paragraph", text: "真正的设计通过与现实接触来改进。你无法靠思考做出一座更坚固的桥，你必须搭一座、测试它、明白发生了什么，再决定下一步改什么。" },
        { type: "callout", title: "核心思想", accent: "purple", text: "第一个设计不是成品，而是一个假设。测试告诉你假设是否正确。" },
      ] },
      { title: "一个真实的工作坊案例", blocks: [
        { type: "paragraph", text: "在克利夫顿公共图书馆的一次桥梁搭建课中，一组学生搭了一座冰棍棒桥，用书测试，然后看着一侧扭曲，桥最终垮塌。" },
        { type: "numbered", items: [
          { title: "第一个线索：桥侧向扭曲", body: "在垮塌之前，学生注意到一侧比另一侧倾斜得更厉害。这告诉他们问题不只是重量，而是支撑不均匀。" },
          { title: "薄弱点：缺少斜向支撑", body: "侧面桁架有长长的开口矩形，而不是三角形。荷载增加后，那些矩形改变形状，桥失去了刚性。" },
          { title: "快速改进：一处有针对性的加固", body: "在剩余时间里，小组在最弱的一侧加了斜向支撑，并讨论了在未来版本中在哪里加对应的支撑。" },
          { title: "收获：测试给了他们更好的设计", body: "他们不需要重建整座桥就能学到真实的东西。一次仔细的测试准确告诉他们，下一个设计应该更好地处理什么。" },
        ] },
        { type: "quote", text: "它就在我们没加固的地方断了", attribution: "Monica，Avanza STEM 工程工作坊的学生" },
      ] },
      { title: "为什么重来不是从零开始", blocks: [
        { type: "paragraph", text: "学生在测试后做出改变，并不是从头开始，而是带着第一个设计没有的信息继续前进。" },
        { type: "callout", accent: "purple", text: "迭代不总意味着在同一次工作坊里重建整个项目。有时候它只是一处聪明的调整、一张更好的草图，或者一条为下一版写下的清晰笔记。" },
        { type: "paragraph", text: "这就是为什么有经验的工程师不总是在第一次尝试时更快，而是更擅长注意第一次尝试在告诉他们什么。" },
      ] },
      { title: "只改一处规则", blocks: [
        { type: "paragraph", text: "当东西失败后有时间改进时，在再次测试前只做一处改变。这比听起来更难，因为本能是想一次修掉所有问题。" },
        { type: "paragraph", text: "但如果你改了三处，下一版更好，你不知道是哪处改动起了作用。你只是运气好了，而运气是无法复制到下一次搭建的。" },
        { type: "list", items: ["选择针对具体失效点的那处改动", "如果工作坊时间允许，就做那处改动", "如果可以，在相同条件下再次测试", "记下发生了什么，或者你下一步会尝试什么", "用那条笔记指导下一个设计"] },
        { type: "ctaLink", title: "搭点什么并测试它", text: "在我们的工程工作坊，学生会搭建结构、测试它们，并弄清楚结果揭示了设计的什么。", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "the-engineering-of-a-backpack": {
    ...localizedBlogArticles.en["the-engineering-of-a-backpack"],
    title: "书包里的工程学",
    category: "工程",
    readTime: common.zh.minutes.m5,
    imageAlt: "一排展示不同尺寸、材料、背带、拉链和口袋布局的书包",
    imageCaption: "书包是日常工程：重量分配、材料、拉链、背带和口袋必须共同协作。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "你的书包同时解决了大约十几个工程问题。背带让重量不压在手上。加厚的背板把压力分散到脊椎上。拉链能开合数千次而不坏。面料既强韧、又轻便、防水，还便宜到能卖给学生。" },
        { type: "paragraph", text: "这一切都不是偶然的。书包的每个部分都经过某人思考一个问题、测试一个解决方案才设计出来。" },
      ] },
      { title: "重量分配问题", blocks: [
        { type: "paragraph", text: "手提 10 磅比背 10 磅累得多。这不是技巧，而是物理。从手里挂下来的包会产生力矩，让肌肉需要付出更多力气来维持。书包把重量定位在贴近脊椎的位置，减少了这种力矩。" },
        { type: "paragraph", text: "肩带的作用不只是把包托起来。更宽的肩带把同样的重量分散到更大的面积上，降低了每平方厘米的压力——就像雪鞋防止你陷进雪里一样。加厚的肩带有更柔软的表面，轻微压缩，更均匀地分配压力。" },
        { type: "callout", title: "装包顺序", accent: "purple", text: "把较重的物品放在最靠近背部的地方，较轻的物品放在外侧。这样能让重心靠近脊椎，减少对下背部造成负担的前倾拉力。" },
      ] },
      { title: "拉链究竟是怎么工作的", blocks: [
        { type: "paragraph", text: "拉链是开口两侧各有一排互锁齿的机构。当你拉动拉头时，它迫使两排齿以特定方式啮合。每个齿上有一个小突起和对应的凹槽。拉头移动时，它把每个齿定位，让一侧的突起嵌入另一侧的凹槽。" },
        { type: "paragraph", text: "那种卡入感就是为什么拉好的拉链感觉这么结实。互锁的齿既能抵抗拉开，也能抵抗横向滑动。打开拉链时，拉头用一个小楔子插入两排齿之间，一对一对地把齿分开。" },
        { type: "list", items: ["金属拉链更耐用但更重", "塑料螺旋拉链更轻更灵活，适合弧形接缝", "YKK 是世界上最常见的拉链制造商，出现在大多数优质包上", "当拉头被撑得太宽时拉链会失效，有时可以用钳子轻轻夹一下来修复"] },
      ] },
      { title: "材料与权衡", blocks: [
        { type: "paragraph", text: "书包面料是重量、耐用性、防水性和成本之间的一系列权衡。" },
        { type: "numbered", items: [
          { title: "尼龙", body: "强韧、轻便、耐磨。大多数高端书包使用尼龙，因为它经久耐用而不增加太多重量。" },
          { title: "聚酯", body: "比尼龙稍重，但更便宜、更耐紫外线褪色。常见于学生书包和平价包。" },
          { title: "帆布", body: "厚重耐用，但会吸水。短途携带效果好，雨天户外使用不理想。" },
          { title: "防撕裂布", body: "一种带有加固线格的编织方式。面料撕裂时，加固网格阻止撕裂扩展。用于高性能背包。" },
        ] },
        { type: "paragraph", text: "防水性来自面料内侧的涂层，而不是面料本身。该涂层会随时间磨损，这就是为什么旧包会漏水，即使外部面料看起来还完好。" },
      ] },
      { title: "口袋系统", blocks: [
        { type: "paragraph", text: "书包上的口袋不是随机的，而是反映了对人们如何整理携带物品的一套假设。" },
        { type: "list", items: ["主仓大小适合笔记本、笔记本电脑袋或折叠衣物", "前袋用于经常取用但不想散落在主仓里的东西", "侧袋大小适合水瓶，因为那个形状很常见且可预测", "顶部小袋或顶盖袋用于无需打开主包就能取到的物品", "内部整理袋假设你会携带笔、钥匙和手机"] },
        { type: "callout", title: "试试这个", accent: "purple", text: "像工程师一样给你自己的书包打分。在以下几项上各给 1 到 5 分：重量分配、拉链质量、面料手感和防水性、口袋整理性、走路 10 分钟后背带的舒适度。你会先改哪一点？" },
      ] },
    ],
  },
  "what-makes-a-stem-workshop-fun": {
    ...localizedBlogArticles.en["what-makes-a-stem-workshop-fun"],
    title: "什么让 STEM 工作坊变得有趣？",
    category: "社区",
    readTime: common.zh.minutes.m5,
    imageAlt: "学生和家庭在 Avanza STEM 社区工作坊积极搭建、测试和讨论",
    imageCaption: "孩子们在说话、搭建和争论的工作坊才是有效的。安静的房间通常不是。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "让学生安静坐着、看人演示的工作坊，不是 STEM 工作坊，而是演讲。即便是好的演讲，到第二天早上也基本上忘光了。" },
        { type: "paragraph", text: "在 Avanza STEM，我们在思考课程设计上花的时间，不亚于思考内容本身。学生在房间里做什么，比我们对他们说什么更重要。" },
      ] },
      { title: "主动学习与被动学习的区别", blocks: [
        { type: "paragraph", text: "被动学习是看、听和接收。主动学习是做、测试、争论和搭建。关于哪一种更有效，研究结论毫不模糊。" },
        { type: "paragraph", text: "但也不只是做些什么就行。学生可以双手忙碌却根本没有真正在思考。好的工作坊是这样设计的：做事本身就逼迫思考。" },
        { type: "callout", accent: "purple", text: "在我们的桥梁工作坊，学生不是看导师搭桥，而是拿到材料、一个荷载限制和大约 30 分钟。挫败感、与搭档争论设计的过程、桥承受了超出预期的重量那一刻——这些才是学习真正发生的地方。" },
      ] },
      { title: "我们如何设计 Avanza STEM 活动", blocks: [
        { type: "paragraph", text: "我们举办的每个活动，在带到工作坊之前都会经历同一套问题。" },
        { type: "numbered", items: [
          { title: "有真实的测试吗？", body: "如果学生无法知道自己的想法是否成功，这就不是设计挑战，而是艺术项目。每个活动都以测试结束：桥能承受重量吗？探测车能越过地形吗？代码能运行吗？" },
          { title: "它能以有趣的方式失败吗？", body: "能让人学到东西的失败是特性，不是缺陷。如果活动只有成功或微不足道的失败，就没有可以迭代的东西。最好的失败足够具体，让学生知道该修什么。" },
          { title: "有不同方法的空间吗？", body: "只有一个正确答案的挑战变成了找答案的比赛。有多种有效方法的挑战让学生做出真正的设计决策，并从对比结果中学习。" },
          { title: "学生在互相交谈吗？", body: "有成效的分歧是课程有效运作的最好标志之一。当学生争论是该多加斜撑还是加固接头时，他们就是在做工程。" },
        ] },
      ] },
      { title: "学生在我们工作坊实际上做什么", blocks: [
        { type: "paragraph", text: "在 Avanza STEM 的典型课程中，学生在 60 分钟里可能会做五六件不同的事。" },
        { type: "list", items: ["听一段两分钟的简介，了解目标和约束", "在开始搭建前，先和搭档争论几分钟设计方案", "搭建第一版并测试，通常第一次就失败", "根据他们看到失败的地方做一处具体改动", "再次测试，观察改动是否有帮助", "向小组解释他们学到了什么——不是搭了什么，而是发现了什么"] },
        { type: "paragraph", text: "最后这一步是大多数工作坊跳过的。当学生必须用语言解释他们学到了什么时，他们才能弄清楚自己是真的理解了，还是只是运气好。" },
      ] },
      { title: "为什么吵闹通常是个好兆头", blocks: [
        { type: "paragraph", text: "安静的工作坊让大人感到舒适，但通常让学生感到不那么投入。学生在交谈的课程——哪怕很吵甚至在争论——才是学生在思考的课程。" },
        { type: "quote", text: "我以为他们因为拉链的事闹得太厉害而跑题了。但后来我仔细听，他们其实在争论摩擦力在曲线内侧还是外侧更大。这正是我们想要的。", attribution: "Avanza STEM 科学课后的一位导师" },
        { type: "paragraph", text: "那些时刻，导师的工作不是让房间安静下来，而是提出一个能让争论更深入的问题。" },
      ] },
      { title: "我们始终包含的三件事", blocks: [
        { type: "numbered", items: [
          { title: "有真实结果的真实测试", body: "不是\"做得很好，大家都棒\"，而是对照陈述目标的实际通过或失败。" },
          { title: "可以从中学习的具体失败模式", body: "如果第一次所有东西都成功了，学生就没学到极限在哪里。" },
          { title: "解释自己搞清楚了什么的时间", body: "没有反思的搭建只是活动，反思才是理解沉淀的地方。" },
        ] },
        { type: "ctaLink", title: "来看一次工作坊", text: "Avanza STEM 工作坊免费、动手操作，对所有经验水平的学生开放。不需要任何 STEM 背景。", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "engineering-inside-school-bus": {
    ...localizedBlogArticles.en["engineering-inside-school-bus"],
    title: "校车里隐藏的工程学",
    category: "工程",
    readTime: common.zh.minutes.m5,
    imageAlt: "一辆黄色校车，展示其醒目的安全黄色、超大后视镜和紧急出口标志",
    imageCaption: "工程不只存在于实验室和工厂，它被装进了你乘坐的每一辆车，包括校车。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "校车看起来很简单：大黄箱子、很多座位、闪灯、响亮的引擎。但校车其实充满了工程决策。它几乎每个部分都是为了回答一个大问题而设计的：我们如何安全地载运很多孩子？" },
        { type: "paragraph", text: "让我们来看看校车里隐藏的工程学。" },
      ] },
      { title: "为什么校车是黄色的？", blocks: [
        { type: "paragraph", text: "校车不是偶然成为黄色的。那种鲜亮的颜色在早晨、下午、甚至阴天都很容易看见。工程师和安全设计师希望司机能快速注意到校车。" },
        { type: "paragraph", text: "颜色、闪灯、伸出的停车指示牌和庞大的尺寸，共同传达一个信息：注意，附近有孩子。这辆车基本上被设计成不可能被忽视的样子。" },
      ] },
      { title: "座位是安全工具", blocks: [
        { type: "paragraph", text: "校车座位看起来可能不花哨，但它们的设计考虑到了安全。许多校车采用一种叫做\"隔舱化\"的设计：座位又高、有衬垫，而且靠得很近。如果车子突然停下，你前面的座位能帮助吸收一些运动——几乎像是一堵软墙。" },
        { type: "paragraph", text: "座位下方也有坚固的框架，需要承受颠簸、转弯以及多年来学生坐、靠、移动的压力。校车座位不只是坐的地方，它是安全系统的一部分。" },
      ] },
      { title: "为什么司机能看到这么多？", blocks: [
        { type: "paragraph", text: "公交车司机需要看到道路、学生、车门、人行道和周围的车辆。这就是为什么校车有巨大的后视镜。有些后视镜显示车后的情况，有些帮助司机看到前保险杠附近的情况，那里的小孩子可能很难被发现。" },
        { type: "paragraph", text: "可见性是一个主要的工程挑战，因为校车体积很大，工程师必须帮助司机看到车辆尺寸之外的情况。" },
      ] },
      { title: "转动一辆巨型车辆", blocks: [
        { type: "paragraph", text: "校车比汽车长得多，所以转弯更难。工程师必须考虑转弯半径，也就是车辆转弯所需的空间。校车比小轿车需要更多空间，尤其是在狭窄的街道上。" },
        { type: "paragraph", text: "这就是为什么公交车司机在转弯前有时会向外摆一点。校车不是在刻意炫技，而是在遵循几何学。" },
      ] },
      { title: "紧急出口无处不在", blocks: [
        { type: "paragraph", text: "校车的出口不止前门。可能还有后紧急门、车顶舱口和紧急窗口。好的工程不只是为了正常的日子，也要为意外的日子做准备。" },
        { type: "callout", title: "为什么要这么多出口？", accent: "purple", text: "如果前门被堵住怎么办？如果车辆倾斜怎么办？如果学生需要迅速撤离怎么办？工程师在问题发生之前就为这些\"假如\"情境做规划。" },
      ] },
      { title: "试试这个：设计你自己更安全的校车", blocks: [
        { type: "paragraph", text: "拿纸画出你自己的校车设计。加上后视镜、紧急出口、座位布局、灯光、标志、窗户和储物空间。对于你画的每个部分，问自己：这解决了什么问题？" },
        { type: "callout", title: "工程师的问题", accent: "purple", text: "工程师不只问\"它看起来酷吗\"，他们问\"这有什么用？这解决了什么问题？\"试着用这个问题审视你画中的每个部分。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "下次你看到校车时，仔细看看。颜色、后视镜、座位、出口、车门和转弯方式都有其目的。校车不只是交通工具，它是安装了轮子的工程学。" },
      ] },
    ],
  },
  "why-airplane-wings-are-curved": {
    ...localizedBlogArticles.en["why-airplane-wings-are-curved"],
    title: "飞机机翼为什么是弯曲的？",
    category: "工程",
    readTime: common.zh.minutes.m5,
    imageAlt: "一架联合航空波音 777-200 在飞行中，弯曲的翼型机翼和翘起的翼尖清晰可见",
    imageCaption: "飞机机翼不是平板。它们弯曲的翼型形状创造了将百吨重的飞机升上天空所需的气压差。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "飞机机翼承担着工程学中最酷的任务之一：帮助一台巨大的金属机器升上天空。这听起来不可思议。一架这么重的飞机怎么能飞起来？" },
        { type: "paragraph", text: "答案很大程度上与机翼的形状有关。" },
      ] },
      { title: "机翼不是平的", blocks: [
        { type: "paragraph", text: "从侧面看飞机机翼，它不只是一块平板。通常顶部是弯曲的，底部则比较平。这种形状叫做翼型。翼型被设计成以一种特殊的方式穿越空气。" },
        { type: "paragraph", text: "当飞机向前运动时，空气绕着机翼流动。翼型帮助在机翼上下方产生气压差。通常，机翼上方的气压比下方低。下方较高的气压帮助将机翼向上推。这个向上的力叫做升力。" },
      ] },
      { title: "升力不是魔法", blocks: [
        { type: "paragraph", text: "升力不是魔法，也不只是一个简单的技巧。机翼通过改变空气流动方式来产生升力。当机翼向前运动时，它把一些空气向下推。当空气被向下推时，机翼被向上推。这与牛顿第三定律有关：每一个作用力都有一个大小相等、方向相反的反作用力。因此机翼在做两件重要的事：" },
        { type: "numbered", items: [
          { title: "产生气压差", body: "弯曲的上表面使空气流动更快，在机翼上方产生较低的气压。" },
          { title: "向下推动空气", body: "机翼改变气流方向，反作用力将飞机向上推。" },
        ] },
      ] },
      { title: "为什么飞机需要速度？", blocks: [
        { type: "paragraph", text: "静止在跑道上的飞机不会起飞。它需要快速移动，因为机翼需要有空气在上面流动。飞机移动得越快，流过机翼的空气就越多，更多的气流可以产生更多的升力。" },
        { type: "paragraph", text: "这就是为什么飞机在起飞前要沿跑道加速。发动机推动飞机向前，机翼与流动的空气相互作用，最终产生足够的升力让飞机升空。" },
      ] },
      { title: "那些襟翼是什么？", blocks: [
        { type: "paragraph", text: "在起飞和降落时，你可能会看到机翼的某些部分移动。这些叫做襟翼和缝翼。它们改变机翼的形状，帮助在较慢的速度下产生更多升力。" },
        { type: "paragraph", text: "这很有用，因为飞机在靠近地面时不能总是飞得很快，所以工程师为机翼装上了能控制气流的活动部件。" },
      ] },
      { title: "试试这个：纸翼测试", blocks: [
        { type: "paragraph", text: "拿两张纸。把一张折成简单的纸飞机。另一张保持平整。现在轻轻地把两者都扔出去。折叠的纸飞机飞得更好，因为它的形状帮助它以更可控的方式穿越空气。" },
        { type: "callout", title: "形状很重要", accent: "purple", text: "工程师在风洞、计算机模拟和真实飞行中测试机翼形状。机翼形状的微小改变会对产生的升力产生很大影响。这就是为什么不只是发动机在做功，机翼也是精心设计的工程工具。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "飞机机翼是弯曲的，因为形状控制着气流。那个气流帮助产生升力，让飞机能够飞翔。所以下次你看到空中的飞机时，记住：不只是发动机在做功，机翼是精心设计的工程工具，把空气转化成升力。" },
      ] },
    ],
  },
  "how-elevators-know-where-to-go": {
    ...localizedBlogArticles.en["how-elevators-know-where-to-go"],
    title: "电梯怎么知道该去哪里？",
    category: "工程",
    readTime: common.zh.minutes.m4,
    imageAlt: "一部现代电梯内部，带有发光的楼层按钮和光洁的金属墙壁",
    imageCaption: "在那次简单的按钮按压背后，是一套传感器、电机、配重和逻辑系统，在楼层间安全地移动人员。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "你按下按钮。门关上。电梯移动。然后它停在正确的楼层。这感觉很简单，但电梯充满了工程学。它们使用按钮、传感器、电机、钢缆、配重和计算机逻辑来安全地移动人员。" },
        { type: "paragraph", text: "那么电梯怎么知道该去哪里呢？" },
      ] },
      { title: "按钮发送请求", blocks: [
        { type: "paragraph", text: "当你按下电梯按钮时，你不是在直接控制电机，而是在向电梯的控制系统——电梯的\"大脑\"——发送请求。它会追踪：" },
        { type: "list", items: ["电梯当前在哪一层", "哪些按钮被按下了", "电梯正在向哪个方向运动", "门是开着还是关着", "是否有东西挡住了门"] },
        { type: "paragraph", text: "电梯不猜测，它遵循控制系统的指令。" },
      ] },
      { title: "传感器告诉电梯它在哪里", blocks: [
        { type: "paragraph", text: "电梯需要知道自己的位置。它用传感器检测电梯轿厢在井道中的位置。这些传感器帮助系统知道何时减速、何时停止，以及电梯是否与楼层对齐。" },
        { type: "paragraph", text: "最后这点很重要。你不希望门打开时电梯地板太高或太低。工程师将电梯设计得能非常精准地停下。" },
      ] },
      { title: "电机做重活", blocks: [
        { type: "paragraph", text: "大多数电梯使用电机驱动。电机带动一个滑轮系统，移动连接电梯轿厢的钢缆。但这里有个聪明之处：许多电梯还使用配重——一个连接到电梯系统的重物。电梯轿厢上升时，配重下降；轿厢下降时，配重上升。" },
        { type: "paragraph", text: "这帮助平衡系统，使电机不必那么费力。就像用跷跷板代替直接向上举起东西一样。" },
      ] },
      { title: "电梯使用简单逻辑", blocks: [
        { type: "paragraph", text: "电梯遵循逻辑规则。想象电梯在 1 楼，人们按下了 3 楼、5 楼和 2 楼的按钮。电梯可能决定：向上走，停在 2 楼，停在 3 楼，停在 5 楼。它不会随机移动，而是试图高效运动，让人们不用等太久。" },
        { type: "paragraph", text: "在高楼中，电梯系统可以更加先进。一些系统会按目的地对人进行分组，以减少停靠次数。" },
      ] },
      { title: "安全是第一位的", blocks: [
        { type: "paragraph", text: "电梯有许多安全系统。门用传感器确保不会夹到人。制动器帮助停止电梯。备用系统在某个部件失效时帮助控制电梯。工程师在问题发生之前就规划好应对措施。" },
      ] },
      { title: "试试这个：电梯逻辑游戏", blocks: [
        { type: "paragraph", text: "假装你是电梯控制器。画一栋有 6 层的楼，把电梯放在 2 楼。5 楼有人想下楼，1 楼有人想上楼，车厢里的人想去 4 楼。电梯应该按什么顺序处理这些请求？" },
        { type: "callout", title: "没有唯一的正确答案", accent: "purple", text: "不总是有一个完美的解决方案。工程师必须同时考虑速度、公平性、安全性和能耗。你会做出怎样的权衡？" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "电梯并不像人一样\"知道\"事情。它们使用传感器、电机和逻辑系统做出智能决策。下次你乘坐电梯时，记住：那个简单按钮背后是一套完整的工程系统，在墙壁内悄悄运作。" },
      ] },
    ],
  },
  "why-buildings-sway-in-wind": {
    ...localizedBlogArticles.en["why-buildings-sway-in-wind"],
    title: "高楼为什么会在风中摇晃？",
    category: "工程",
    readTime: common.zh.minutes.m5,
    imageAlt: "台北 101 大楼从台北天际线上拔地而起，是研究最多的抗风建筑设计案例之一",
    imageCaption: "台北 101 是按设计弯曲的。在强台风中，顶部可以摇晃近一米，这正是让它屹立不倒的原因。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "如果你站在一栋非常高的摩天大楼顶部，在强风中，你可能会感觉到建筑在微微移动。这听起来很吓人，但这其实是设计的一部分。高楼不应该是完全僵硬的。在很多情况下，能稍微摇晃的建筑比拒绝移动的建筑更安全。" },
      ] },
      { title: "风会推压建筑", blocks: [
        { type: "paragraph", text: "风看起来是无形的，但它能产生很大的推力。当风吹向一栋高楼时，建筑必须承受这个力。楼越高，可能受到的风力就越大。工程师必须问：这里的风能有多强？建筑有多高？它是什么形状？结构会如何移动？里面的人会感到舒适吗？" },
        { type: "paragraph", text: "摩天大楼不只是支撑自身的重量，还要应对移动的空气。" },
      ] },
      { title: "柔性可以更安全", blocks: [
        { type: "paragraph", text: "想象弯曲一根干燥的树枝，它会折断。现在想象弯曲一根新鲜的树枝，它会弯曲，但不那么容易折断。建筑也可以类似。如果建筑太僵硬，强风或地震震动可能在结构内部产生巨大的力。" },
        { type: "paragraph", text: "但如果建筑能稍微弯曲，它就能吸收并分散一些能量。这不意味着建筑是脆弱的，而是意味着它被设计成可以安全移动的。" },
      ] },
      { title: "地震也会震动建筑", blocks: [
        { type: "paragraph", text: "风从侧面推，地震从下方震动地基。地震发生时，建筑底部先移动，因为地面在移动，建筑的其余部分必须响应。" },
        { type: "paragraph", text: "工程师用强框架、柔性接头、减震器和特殊地基来设计建筑，帮助它们在震动中存活。目标不总是让建筑完全静止，而是保持它站立并保护里面的人。" },
      ] },
      { title: "有些建筑有巨大的阻尼器", blocks: [
        { type: "paragraph", text: "一些高楼内部有一个巨大的重锤，叫做调谐质量阻尼器，就像一个巨大的钟摆。当建筑向一个方向摇晃时，阻尼器以一种帮助减少运动的方式移动。" },
        { type: "callout", accent: "purple", text: "调谐质量阻尼器就像建筑内部藏着一个巨大的平衡工具。从街上看不到它，但在强风中，它能让建筑感觉稳定许多。" },
        { type: "image", src: "/images/blog/Ball in the middle of Taipei 101.jpg", alt: "悬挂在台北 101 内部的 660 吨金色调谐质量阻尼器球，从观景台可以看到", caption: "台北 101 重达 660 吨的金色阻尼器球悬挂在约第 88 层附近。当风把建筑推向一边时，这个钟摆向反方向摆动，抵消内部人员会感到的运动。" },
      ] },
      { title: "形状也很重要", blocks: [
        { type: "paragraph", text: "建筑的形状会影响风在其周围的流动方式。尖锐的棱角、平整的侧面和又高又窄的形状，都会改变风力。工程师在风洞中测试建筑模型，观察空气如何在其周围流动。" },
        { type: "paragraph", text: "有时他们会圆化棱角、增加开口或改变形状以减少风压。摩天大楼的形状不只是为了好看，也是为了处理力。" },
      ] },
      { title: "试试这个：纸塔测试", blocks: [
        { type: "paragraph", text: "用纸搭两座塔。一座做得非常硬挺笔直，另一座保留一点柔性。轻轻对它们吹气或稍微推一下桌子。哪座先倒？哪座弯曲后恢复了？" },
        { type: "callout", title: "工程师研究的就是这个", accent: "purple", text: "这是工程师用真实建筑研究的简单版本。问题不只是\"它会站立吗\"，而是\"当风或地面推它时，它会如何表现？\"" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "建筑摇晃是因为风和地震产生了力。少量的移动能帮助结构承受这些力。所以如果摩天大楼稍微移动，那不意味着工程师失败了，那可能意味着工程师完成了他们的工作。" },
      ] },
    ],
  },
  "engineering-behind-soccer-ball": {
    ...localizedBlogArticles.en["engineering-behind-soccer-ball"],
    title: "足球背后的工程学",
    category: "工程",
    readTime: common.zh.minutes.m6,
    imageAlt: "一个现代比赛用足球，展示其面板设计和表面纹理",
    imageCaption: "现代足球是精密工程系统。每一层、每种面板形状和每处表面纹理都是为了优化飞行、能量传递和空气动力稳定性而设计的。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "现代足球经过精密工程设计，以优化空气动力学、能量传递和飞行稳定性。过去那种又重又吸水的皮革球已成历史。如今的足球依靠复杂的材料科学、先进的面板几何形状和高科技制造工艺，在球场上实现一致的表现。" },
      ] },
      { title: "四层结构解析", blocks: [
        { type: "paragraph", text: "一个标准高品质比赛用球由四个不同的层组成，每层各有特定功能：" },
        { type: "list", items: [
          "气囊：最内层，通常由合成丁基或乳胶橡胶制成，负责充气并维持内部气压。丁基气囊气密性更好，乳胶则手感更柔软、弹性更佳。",
          "衬里：围绕气囊缠绕多层聚酯和棉织布料。这层衬里决定球的强度，帮助它在数千次踢球后保持球形，并缓冲冲击。",
          "泡沫缓冲层：外壳下方有一层聚氨酯（PU）或乙烯-醋酸乙烯酯（EVA）泡沫。球员击球时，这层材料压缩后回弹，最大限度地传递能量，提升射门速度。",
          "外壳：最外层由耐用的合成皮革（聚氨酯）制成，可防止吸水使球在雨中变重，表面特殊纹理有助于正确抓握空气。",
        ] },
      ] },
      { title: "面板设计与空气动力学", blocks: [
        { type: "paragraph", text: "过去二十年，足球工程中最引人注目的变化是面板的演变。传统球（如经典的32块面板设计）有大量接缝，产生很高的空气阻力。现代比赛用球只有6到8块热粘合面板，大幅减少了总接缝长度和阻力。" },
        { type: "paragraph", text: "面板不再缝合，而是通过热粘或高频胶水粘合，使球几乎没有接缝且不透水。工程师使用计算流体动力学（CFD）——与设计飞机所用相同的模拟软件——来模拟空气如何流过球的表面。外壳上的纹理图案不是装饰：它们控制气流边界层，帮助球在高速下飞行更直，旋转时运动更可预测。" },
      ] },
      { title: "动态平衡与马格努斯效应", blocks: [
        { type: "paragraph", text: "完美设计的球必须通过动态平衡测试，即质量均匀分布，在空中旋转时不会摇晃。当球员偏心击球时，这种均匀的重量分布使球能够干净地旋转。" },
        { type: "paragraph", text: "旋转触发马格努斯效应。球旋转时，其表面一侧与周围气流同向运动，另一侧则反向运动。这在球两侧产生气压差，形成一个横向力，使球的轨迹实际上发生弯曲。这就是你见过的每一个弯曲任意球和旋转角球背后的物理原理。" },
        { type: "callout", title: "马格努斯效应的实际体现", accent: "purple", text: "偏心击球会让球旋转。旋转的球面在一侧比另一侧更快地拖动空气，产生不均匀的气压。这个气压差是真实的物理力——与棒球的曲球弯曲和网球的上旋球下坠遵循同样的原理。" },
      ] },
      { title: "内嵌技术", blocks: [
        { type: "paragraph", text: "现代顶级比赛用球不再只是皮革和空气，它们变得\"智能\"了。高端球内置了\"互联球\"技术，配备先进惯性测量单元（IMU）传感器的内部悬挂系统。这些传感器以每秒500帧的速度跟踪三维空间中的精确运动，与光学追踪系统通信，提供位置、踢球速度和精确击球冲击的实时数据。" },
        { type: "paragraph", text: "这些数据支持半自动越位检测和门线技术等裁判辅助技术，可在几毫秒内判断球是否完全越过球门线。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "足球不只是用来踢的东西。它是一个多层次的精密系统，材料科学、流体动力学和传感器技术在其中协同工作。每一次精彩射门都从工程开始。" },
      ] },
    ],
  },
  "why-manhole-covers-are-round": {
    ...localizedBlogArticles.en["why-manhole-covers-are-round"],
    title: "井盖为什么是圆的？",
    category: "工程",
    readTime: common.zh.minutes.m4,
    imageAlt: "嵌入城市路面的铸铁井盖，展示其圆形和防滑表面纹理",
    imageCaption: "井盖是圆的，因为圆形无论如何旋转都无法落入同等大小的孔洞中。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "乍一看，井盖是个无聊的东西。它不过是街道上的一块重金属盖子，对吧？其实不然。井盖是工程设计中的经典案例，因为它的形状同时解决了多个问题。那么，它为什么通常是圆的呢？" },
      ] },
      { title: "圆形井盖不会掉进自己的洞里", blocks: [
        { type: "paragraph", text: "这是最经典的原因。圆形井盖无法掉进同样大小的圆形开口，无论怎么旋转，圆的宽度始终不变。" },
        { type: "paragraph", text: "但方形井盖可以从对角线方向掉进方形孔洞，因为正方形的对角线比边长更长，从错误角度就可能滑进去。这对地下工人和地面上的行人都很危险。圆形井盖有效防止了这个问题。" },
      ] },
      { title: "圆形井盖更容易移动", blocks: [
        { type: "paragraph", text: "井盖很重，有些超过一个成年人的重量。圆形井盖可以像轮子一样滚动。工人可以把它立起来、短距离滚走，而方形井盖因为有棱角，这样操作就很困难。" },
        { type: "paragraph", text: "工程师关心真实的人如何使用物体。设计不只关乎形状，还关乎多年使用中的举起、移动、替换和维护。" },
      ] },
      { title: "开口也是圆的", blocks: [
        { type: "paragraph", text: "许多地下隧道和检修井是圆形的。圆形能均匀分散压力，所以结构更强——管道也是圆形的，原因相同。如果洞是圆的，井盖是圆的也就顺理成章。井盖的形状与开口的形状相匹配。" },
      ] },
      { title: "不需要对准方向", blocks: [
        { type: "paragraph", text: "圆形井盖无论如何旋转都能放回去。方形或长方形的就需要对准角落。圆形省去了这个麻烦，也减少了放错方向的可能性。" },
      ] },
      { title: "坚固而简单", blocks: [
        { type: "paragraph", text: "井盖需要经受汽车、卡车、雨水、积雪、高温、低温以及多年的使用。圆形有助于均匀分散重量。金属表面通常有防滑纹理，让轮胎和鞋底都能更好地抓握。就连顶部的图案也是经过设计的，不只是装饰。" },
      ] },
      { title: "试试这个：形状测试", blocks: [
        { type: "paragraph", text: "剪一个纸圆和一个纸方块。在另一张纸上画出对应的孔。现在试着在对应孔上旋转每个盖子。哪个会在转错方向时滑进去？哪个始终太宽而不会掉落？" },
        { type: "callout", title: "一个设计，多种解决方案", accent: "purple", text: "这个简单的纸张测试展示了为什么工程师喜欢圆形井盖。这种形状既安全、又坚固、易移动、易替换。这就是出色的工程：一个解决多个问题的方案。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "井盖是圆的，因为这种形状既安全、又坚固、易移动、易替换。这是工程学的绝佳例子：一个简单的设计同时解决许多问题。下次走过井盖时，不要只是跨过它。那个金属圆形比看起来聪明多了。" },
      ] },
    ],
  },
  "how-roller-coasters-stay-on-track": {
    ...localizedBlogArticles.en["how-roller-coasters-stay-on-track"],
    title: "过山车如何保持在轨道上？",
    category: "工程",
    readTime: common.zh.minutes.m5,
    imageAlt: "一辆过山车在晴朗天空下急速下降和翻转，展示使乘客安全留在车上的轨道设计",
    imageCaption: "过山车保持在轨道上，是因为工程师将重力、动量和多方向轮系统设计成协同工作的整体。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "过山车看起来像是在打破规则。它爬上巨大的山坡，急速下降，侧身转弯，有时甚至倒过来。那它是怎么保持在轨道上的呢？答案是重力、动量、车轮设计和安全工程的综合运作。" },
      ] },
      { title: "重力启动旅程", blocks: [
        { type: "paragraph", text: "大多数过山车先爬上一个大坡。链条或弹射系统将车厢拉上去。到达顶部时，车厢储存了能量，因为它在地面以上很高的位置。这叫做势能。" },
        { type: "paragraph", text: "当过山车下降时，重力将它向下拉。储存的能量转化为运动，即动能。这就是为什么第一个下坡如此重要，它为后续行程提供了速度。" },
      ] },
      { title: "动量维持运动", blocks: [
        { type: "paragraph", text: "一旦过山车运动起来，它就想继续运动。这就是动量。动量帮助过山车爬上较小的山坡、绕过弯道、穿越环形。" },
        { type: "paragraph", text: "但摩擦力和空气阻力会随时间减慢它的速度。这就是为什么过山车要精心设计，确保车厢有足够的速度安全完成整段轨道，但又不至于速度过快变得不安全。" },
      ] },
      { title: "车轮的作用超乎你的想象", blocks: [
        { type: "paragraph", text: "过山车不是用普通轮子仅仅骑在轨道顶部。大多数过山车的列车有几组车轮：" },
        { type: "list", items: ["轨道上方的车轮", "轨道侧面的车轮", "轨道下方的止停轮，即使在环形中也能让列车保持连接"] },
        { type: "paragraph", text: "所以当过山车倒过来时，它不是寄希望于重力正常运作，而是由车轮系统将它物理固定在轨道上。" },
      ] },
      { title: "为什么你不会掉出来？", blocks: [
        { type: "paragraph", text: "过山车使用护栏，如腿部护栏、安全带或肩部护具。使用哪种护具取决于游乐设施。小型家庭过山车可能只需要腿部护栏，而有翻转动作的过山车则使用更安全的固定系统。" },
        { type: "paragraph", text: "工程师设计护具时既要保证乘客安全，又要让旅程感觉刺激。好的过山车感觉惊险，但绝非随机。" },
      ] },
      { title: "环形不是完美的圆", blocks: [
        { type: "paragraph", text: "许多过山车的环形不是完美的圆，而是更接近拉长的泪滴形状。因为完美的圆形环可能在底部产生令人不适的力，而在顶部又速度不够。" },
        { type: "paragraph", text: "泪滴形环有助于控制乘客身体承受的力，使环形更安全、乘坐更顺畅。" },
      ] },
      { title: "试试这个：弹珠过山车", blocks: [
        { type: "paragraph", text: "用纸、纸板、胶带和弹珠搭建一条小轨道，包含一个坡道和一个弯道。测试第一个坡太低、弯道太急或轨道不够光滑时会发生什么。每次失败都会具体告诉你需要修什么。" },
        { type: "callout", title: "同样的问题，更小的规模", accent: "purple", text: "你正在做的测试与过山车工程师做的测试相同，只是规模更小。每次弹珠飞出轨道或提前停下，都是需要改变什么的数据。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "过山车保持在轨道上，是因为工程师精心设计了整个系统。重力提供速度，动量带动列车运行，车轮从多个方向抓住轨道，护具安全固定乘客，轨道形状控制力的大小。刺激是真实的，但刺激背后是大量的工程学。" },
      ] },
    ],
  },
  "why-chairs-break": {
    ...localizedBlogArticles.en["why-chairs-break"],
    title: "椅子为什么会坏？",
    category: "工程",
    readTime: common.zh.minutes.m4,
    imageAlt: "学生在搭建冰棍棒桥，测试接头和荷载分配——与椅子相同的结构工程原理",
    imageCaption: "椅子和桥面临相同的工程问题：接头、荷载路径和材料选择决定了它们是撑住还是失败。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "椅子只有一个主要任务：支撑你。这听起来简单，但椅子经常坏掉。腿断了，靠背开裂，螺丝松了，座面弯了。为什么有些椅子能用好几年，而另一些很快就坏呢？这归根结底是工程学。" },
      ] },
      { title: "椅子必须承受力", blocks: [
        { type: "paragraph", text: "当你坐在椅子上，你的体重向下压。椅子必须将这个力从座面传到椅腿，再传到地面。如果力分布得好，椅子就保持坚固。如果太多的力集中到某个薄弱点，椅子就可能开裂或弯曲。" },
        { type: "paragraph", text: "这叫做重量分配。好的椅子不只是承受重量，而是通过结构安全地传导重量。" },
      ] },
      { title: "材料很重要", blocks: [
        { type: "paragraph", text: "椅子可以用木材、塑料、金属、织物或多种材料组合制成。每种材料各有优缺点。木材可以很坚固，但如果木纹薄弱或接头不好就会裂开。塑料轻便便宜，但薄塑料可能开裂。金属可以非常坚固，但如果太薄或形状不好就会弯曲。" },
        { type: "paragraph", text: "工程师根据成本、强度、舒适度、重量和外观来选择材料。最好的椅子是在正确的位置使用正确的材料，而不是到处都用最强的材料。" },
      ] },
      { title: "接头通常是最薄弱的地方", blocks: [
        { type: "paragraph", text: "椅子通常不会在实心部分的中间断裂，而是在零件连接处断裂。这些连接点叫做接头。椅腿可能通过螺丝、胶水、螺栓、支架或木材中特制的卯榫结构连接到座面。" },
        { type: "paragraph", text: "如果接头薄弱，整把椅子就薄弱。这就是为什么摇晃的椅子是警示信号——摇晃意味着接头在不该移动的时候移动了。" },
      ] },
      { title: "形状可以让椅子更坚固", blocks: [
        { type: "paragraph", text: "有些椅子在椅腿之间有支撑横杆，防止椅腿向外撑开。其他椅子使用弧形塑料、金属框架或三角形支撑。三角形在工程中是特别坚固的形状，因为它不容易改变形状。" },
        { type: "callout", accent: "purple", text: "这就是为什么你会在桥梁、塔楼，有时也在家具中看到三角形。椅子可以通过形状变得更坚固，而无需增加大量额外材料。" },
      ] },
      { title: "测试很重要", blocks: [
        { type: "paragraph", text: "椅子出售前，设计师可能会通过加重、摇晃、跌落，或用机器模拟坐千次来测试它。因为椅子需要在现实生活中经受考验——人们会向后靠、扭转、猛地坐下、拖着椅子走、还会叠放椅子。" },
        { type: "paragraph", text: "用一次没问题是不够的。好的椅子需要一次又一次地正常工作。" },
      ] },
      { title: "试试这个：纸椅挑战", blocks: [
        { type: "paragraph", text: "用纸和胶带搭一把能支撑小物体（如玩具或书）的椅子。测试不同设计：四条直腿、折叠腿、三角支撑或卷纸管。哪种设计能承受最多重量？" },
        { type: "callout", title: "你会发现什么", accent: "purple", text: "你会很快发现，形状和接头的重要性不亚于材料。形状好的简单椅子往往比接头差的复杂椅子更胜一筹。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "有些椅子坏掉是因为力没有被妥善处理。其他椅子能用很久，是因为工程师选择了坚固的材料、聪明的形状和牢固的接头。椅子看起来普通，但每次支撑着人，它都在做工程学的工作。" },
      ] },
    ],
  },
  "hidden-engineering-water-bottle": {
    ...localizedBlogArticles.en["hidden-engineering-water-bottle"],
    title: "水瓶里隐藏的工程学",
    category: "工程",
    readTime: common.zh.minutes.m6,
    imageAlt: "一个透明塑料水瓶，展示其凹凸侧面、螺旋瓶口和底部结构设计",
    imageCaption: "一次性水瓶只有几克重，却能装下自身重量数千倍的液体。每一条纹路、每道螺纹、每处壁厚都有其存在的理由。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "一次性塑料水瓶看起来是世界上最简单的东西之一。装水、喝水，就这样。但从材料科学的角度来看，它是一项工程壮举。" },
        { type: "paragraph", text: "大多数一次性瓶子只有几克重，却能承受运输、跌落、挤压和气压变化。装碳酸饮料的瓶子还需要承受更高的内压。它们还需要保持水的清洁，密封严实，握感舒适，能直立放置，而且成本要低到能以数十亿计量生产。" },
        { type: "callout", title: "核心权衡", accent: "purple", text: "让一次性塑料瓶轻便、坚固、廉价的同样设计，也造成了严峻的废弃物问题和可能的塑料暴露隐患。" },
      ] },
      { title: "工程壮举", blocks: [
        { type: "paragraph", text: "一次性水瓶最常用的塑料是聚对苯二甲酸乙二酯，简称PET。PET透明、轻质、可塑形、强度高。这些特点让制造商能够做出极薄的瓶壁，而不使瓶子变得脆弱无用。" },
        { type: "numbered", items: [
          { title: "轻便而坚固", body: "PET瓶能承受自身重量数千倍的液体。塑料经过拉伸成形，使长链聚合物以增强强度的方式排列。" },
          { title: "薄而有压力意识", body: "纹路、弧度、肩部和底部形状帮助瓶子抵抗压扁变形。碳酸瓶的几何形状尤为精心，因为瓶内气体对每面瓶壁都会向外施压。" },
          { title: "快速生产", body: "工业机器将小型PET预制件加热、吹塑成瓶模、灌装、封盖、贴标，速度极快。这也是瓶装饮用水得以广泛普及的原因之一。" },
        ] },
      ] },
      { title: "形状不是随机的", blocks: [
        { type: "paragraph", text: "水瓶需要便于抓握、易于携带，还要足够坚固不至于塌陷。有些瓶子中间有凹槽或弧度，这让瓶子更容易握持，尤其是当手湿的时候。" },
        { type: "paragraph", text: "形状还影响瓶子如何承受压力。完全光滑的薄瓶可能太容易压扁，而凸起的纹路可以增强瓶子强度而无需增加太多塑料，这意味着用更少的材料就能完成同样的工作。" },
      ] },
      { title: "瓶盖的物理学", blocks: [
        { type: "paragraph", text: "仔细看旋盖瓶的瓶口，你会看到螺旋纹路，这叫做螺纹。瓶盖内侧有对应的螺纹。拧紧瓶盖时，螺纹将盖子向下压向瓶口。" },
        { type: "paragraph", text: "这个向下的力压紧瓶口附近一个微小的密封面，目标是实现气密封闭：足够紧密以防止漏液、失碳和外部空气或细菌的污染。" },
        { type: "paragraph", text: "那个小小的拧盖设计就是一台简单机器，将你的旋转运动转化为向下的力。用更少的力产生更大的力，这正是简单机械的功能。" },
      ] },
      { title: "为什么有些地方塑料更厚？", blocks: [
        { type: "paragraph", text: "瓶子不是每个地方都需要相同的厚度。瓶底可能需要更坚固，这样瓶子才能直立。瓶口需要足够结实以实现密封。瓶身可以薄一些，以节省重量和材料。" },
        { type: "paragraph", text: "工程师必须在强度、成本、舒适度和废料之间取得平衡。瓶子太薄会被压扁，太厚又比需要的用更多塑料。好的设计往往意味着在正确的地方使用恰好足够的材料。" },
      ] },
      { title: "瓶口的大小也重要", blocks: [
        { type: "paragraph", text: "瓶口不能太小，否则喝水不方便；但如果太宽，可能容易洒出来。可重复使用的瓶子通常有更宽的瓶口，便于清洗或加冰块。一次性瓶子通常瓶口较小，让喝水更简单，减少溢出。" },
        { type: "paragraph", text: "就连瓶口的大小也是一个工程决策。" },
      ] },
      { title: "标签与握感", blocks: [
        { type: "paragraph", text: "有些瓶子贴有环绕的标签。标签不只是为了品牌宣传，还能增加握感。可重复使用的瓶子可能用橡胶、纹理塑料、金属或喷涂表面让握感更好。滑手的瓶子是差劲的设计，尤其对孩子、运动员或登山者来说。" },
      ] },
      { title: "权衡与健康隐患", blocks: [
        { type: "paragraph", text: "工程上的成功并不意味着没有问题。一次性塑料瓶造成环境代价，科学家仍在研究微小塑料颗粒对人体健康的潜在影响。" },
        { type: "numbered", items: [
          { title: "微塑料和纳米塑料颗粒", body: "先进显微镜研究发现，瓶装水中含有远比旧方法所能检测到的更多微小塑料颗粒。哥伦比亚大学和罗格斯大学的研究团队报告称，测试瓶装水中平均每升约有 24 万个可检测塑料碎片，其中大多数是纳米塑料。" },
          { title: "瓶盖摩擦", body: "开关瓶盖会在塑料螺纹之间产生摩擦。同行评审研究显示，这种瓶盖与瓶口的交互作用可能产生额外的微塑料颗粒。" },
          { title: "化学物质渗出", body: "高温、阳光、长期储存，或将一次性瓶子重复使用，都可能增加塑料降解和化学添加剂迁移到水中的隐患。微塑料和纳米塑料对健康的确切影响仍在研究中。" },
          { title: "环境影响", body: "PET在技术上是可回收的，但许多一次性瓶子实际上并没有被回收。成为垃圾的瓶子可以在填埋场、水道和海洋中长期存在。" },
        ] },
        { type: "callout", title: "工程意味着权衡", accent: "purple", text: "一次性瓶子在轻便、密封、坚固和廉价方面表现出色。但在你用完后消失这件事上，它的表现就差多了。" },
      ] },
      { title: "如何减少塑料暴露", blocks: [
        { type: "paragraph", text: "你不需要恐慌或在塑料瓶是唯一安全选项时停止饮水。但如果你想减少日常塑料暴露，有一些简单的替代方案。" },
        { type: "list", items: ["日常补水使用玻璃或不锈钢瓶。", "避免将一次性塑料瓶放在热车或阳光直射的地方。", "不要重复使用设计为一次性使用的瓶子。", "如果当地自来水安全但你想额外处理，可使用经认证的家用过滤器。", "当地回收设施接受PET瓶时进行回收，尽可能选择补水站。"] },
      ] },
      { title: "试试这个：瓶子设计测试", blocks: [
        { type: "paragraph", text: "如果你手边有，比较一个一次性瓶和一个可重复使用的瓶。观察瓶盖形状、握持纹理、底部设计、壁厚、开口大小、挤压难易程度、站立稳定性以及清洁便利性。" },
        { type: "callout", title: "没有完美答案", accent: "purple", text: "这里没有唯一的正确答案。登山瓶优先考虑耐用性。儿童瓶优先考虑握感和防溢。一次性瓶优先考虑成本和重量。认识到这些权衡，正是工程师的工作。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "水瓶不只是一个容器，它是一个小型工程项目。它需要装液体、防漏水、适合手握、能直立放置、经得起跌落，还要合理使用材料。它也提醒我们，工程决策在产品离开我们手中之后仍有后果。" },
        { type: "paragraph", text: "下次喝水时，花一秒钟看看那个瓶子。即使是普通的东西，也可能充满了隐藏的工程学和隐藏的权衡。" },
      ] },
    ],
  },
  "can-ai-actually-think": {
    ...localizedBlogArticles.en["can-ai-actually-think"],
    title: "AI 真的会思考吗？",
    category: "AI",
    readTime: common.zh.minutes.m5,
    imageAlt: "人工智能的抽象可视化，带有数字大脑或神经网络图案，代表机器学习和模式识别",
    imageCaption: "AI 能识别模式和生成答案，但这与人类的思考方式不同。它在预测，而不是理解。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "当你问 AI 一个问题，它看起来好像在思考。你可能会输入\"用10岁孩子能懂的方式解释黑洞\"，几秒钟后就得到了一个答案。你可能让它写故事、帮数学、做图片或提供科学项目建议。这感觉很神奇。" },
        { type: "paragraph", text: "但这里有一个大问题：AI 真的在思考吗？答案是：不是以人类的方式。" },
        { type: "paragraph", text: "AI 可以做一些惊人的事情，但它没有像你一样的大脑。它没有感情，没有自己生活的记忆，没有人类那样的想象力，也没有对世界的真正理解。AI 非常擅长的是识别规律。" },
      ] },
      { title: "什么是模式识别？", blocks: [
        { type: "paragraph", text: "模式识别就是发现重复出现的事物。你一直在使用模式识别。比如，如果你看到乌云密布、听到雷声、感受到风越来越大，你可能会想\"大概要下雨了\"。你注意到了以前见过的规律。" },
        { type: "paragraph", text: "AI 做的事情类似，但基于大量信息。想象读了数千本书、文章、网站、对话和例子。随着时间推移，你可能开始注意到哪些词通常连在一起出现，哪些答案通常跟着某类问题，以及哪些想法是有联系的。" },
        { type: "paragraph", text: "AI 从数据中学习规律。然后，当你问问题时，它用这些规律猜测接下来应该出现什么回应。这可能让 AI 听起来很聪明，但听起来聪明不等于像人一样思考。" },
      ] },
      { title: "人类的思考有什么不同？", blocks: [
        { type: "paragraph", text: "人类不只是识别规律。你能对事物感到好奇，关心他人，感到困惑、兴奋、紧张、自豪或好奇。你能决定某件事对你很重要，因为一次亲身经历而改变想法，注意到不公平，以及感受到朋友需要帮助。" },
        { type: "paragraph", text: "AI 不是以人类的方式做这些事。比如，如果你搭的冰棍棒桥倒塌了，你可能会感到失望。然后你可能想\"也许中间需要更多支撑\"，然后尝试新设计。你在同时使用逻辑、记忆、情感、创造力和经验。" },
        { type: "paragraph", text: "AI 可以建议桥倒塌的原因，它可能说结构需要更强的三角形或更好的重量分配。但它感受不到看着桥倒塌的沮丧，也不会像你那样从这一刻学到东西。" },
      ] },
      { title: "AI 理解它说的话吗？", blocks: [
        { type: "paragraph", text: "AI 可以解释火山是什么，可以写关于乌龟的诗，可以回答关于行星的问题。但这不意味着它像人一样理解这些事物。" },
        { type: "paragraph", text: "想想手机上的自动补全。如果你输入\"我要去\"，你的手机可能建议\"商店\"\"公园\"或\"比赛\"。它不是在思考你的一天，而是在预测接下来可能出现的词。" },
        { type: "callout", accent: "teal", text: "AI 的工作方式更高级，但基本思路类似。它根据学到的规律预测词语、句子和想法。这就是为什么 AI 有时给出很好的答案，有时给出非常奇怪的答案。" },
      ] },
      { title: "一个简单的例子", blocks: [
        { type: "paragraph", text: "假设你问 AI：\"鱼能骑自行车吗？\"人类可能会笑着说：\"不能，鱼没有腿，自行车是为陆地设计的。\"AI 也可能说不能，但它不是因为见过鱼尝试骑车才这样说。它是用从语言和事实中学到的规律来回答。" },
        { type: "paragraph", text: "现在假设你问：\"写一个鱼骑自行车的有趣故事。\"AI 可能会写一个。它能从事实模式切换到故事模式，因为它识别出你在要求哪种答案。这很有用，但也意味着你需要和 AI 表达清楚。你提问的方式会改变你得到的答案类型。" },
      ] },
      { title: "AI 算聪明吗？", blocks: [
        { type: "paragraph", text: "AI 在某些任务上可以很聪明。它能快速找到规律，整理信息，帮助头脑风暴，用不同方式解释话题，总结文本，写代码，翻译语言，帮助人们学习。" },
        { type: "paragraph", text: "但 AI 不是在各方面都聪明。它不知道做一个孩子是什么感觉，不知道犯错、帮助朋友、赢得比赛、或在终于做成某件事后感到骄傲的滋味。它没有人类那样的常识。它也可能自信地给出错误答案。这意味着 AI 是工具，不能取代你的大脑。" },
      ] },
      { title: "把 AI 想成处理文字的超级计算器", blocks: [
        { type: "paragraph", text: "计算器能非常快速地解决数学问题，但计算器不知道你为什么需要这个答案，不知道你是否输错了数字，也不知道答案在现实中是否有意义。" },
        { type: "paragraph", text: "AI 类似，只是它不只处理数字，还处理文字、图像、代码和规律。它可以帮助你思考，但不应该替你完成所有思考。" },
      ] },
      { title: "试试这个", blocks: [
        { type: "paragraph", text: "向 AI 提这三个问题：" },
        { type: "list", items: ["解释纸飞机如何飞行。", "用二年级学生能懂的方式解释纸飞机如何飞行。", "编一个纸飞机飞到火星的搞笑故事。"] },
        { type: "paragraph", text: "注意答案如何变化。AI 不是突然变成了老师、小孩子或讲故事的人。它是根据你提示的规律来改变回应的。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "AI 不像人类那样思考。它识别规律，预测回应，并根据从数据中学到的内容创建答案。这可以很强大、很有用、也很有趣。但人类仍然带来了 AI 没有的东西：真正的理解、创造力、判断力、情感和责任感。" },
        { type: "callout", accent: "teal", text: "AI 可以帮助你思考，但你的大脑仍然是房间里最重要的工具。" },
      ] },
    ],
  },
  "why-ai-sometimes-gets-things-wrong": {
    ...localizedBlogArticles.en["why-ai-sometimes-gets-things-wrong"],
    title: "AI 有时为什么会出错？",
    category: "AI",
    readTime: common.zh.minutes.m5,
    imageAlt: "AI 产生错误或混乱输出的视觉呈现，说明 AI 幻觉和错误的概念",
    imageCaption: "AI 不像人类那样了解事物，它在预测，有时它的预测是自信地错误的。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "AI 能很快回答问题。你可以让它解释恐龙、写故事、帮助编程或建议科学项目。有时答案很有用，有时听起来很自信，有时就是错的。" },
        { type: "paragraph", text: "这可能令人困惑。如果 AI 这么先进，为什么还会犯错？答案是 AI 并不像人类那样真正了解事物，它根据规律做出预测，大多数时候这些规律会给出有用的答案，但有时会导致错误。" },
      ] },
      { title: "AI 可能猜错", blocks: [
        { type: "paragraph", text: "当你问 AI 一个问题时，它会尝试创建一个符合你要求的答案。它查看从大量例子中学到的规律，预测接下来应该出现什么词。这意味着 AI 通常在做一个非常有根据的猜测。" },
        { type: "paragraph", text: "例如，如果你问\"世界上最高的山是什么\"，AI 很可能会说珠穆朗玛峰，因为这是有大量例子支持的常识。但如果你问非常具体的问题，AI 可能不知道。如果它仍然尝试回答，可能会编造一些东西。这就是 AI 出错的原因之一：即使应该说\"我不确定\"，它也可能给出答案。" },
      ] },
      { title: "什么是幻觉？", blocks: [
        { type: "paragraph", text: "当 AI 编造信息并将其呈现为真实时，人们通常称之为\"幻觉\"。这不是说 AI 像人一样看到了什么，而是指 AI 创造了一个听起来真实但实际上不正确的答案。" },
        { type: "paragraph", text: "例如，AI 可能编造：" },
        { type: "list", items: ["一个假书名", "一个错误的日期", "一句捏造的引言", "一个听起来可信但是错误的科学事实", "一个不存在的来源"] },
        { type: "callout", accent: "teal", text: "棘手的是，AI 的幻觉可能听起来非常自信。这就是为什么人类仍然需要核实重要的答案。" },
      ] },
      { title: "错误的数据会导致错误的答案", blocks: [
        { type: "paragraph", text: "AI 从数据中学习。数据意味着例子、文本、图像、数字和信息。但不是所有数据都是好的。网络上的一些信息是过时的，有些是有偏见的，有些是不完整的，有些就是错的。如果 AI 从混乱的信息中学习规律，有时会重复那些错误。" },
        { type: "paragraph", text: "想象从一本笔记本学习，其中有些页面是正确的，有些页面有错误答案。如果你不加核实地从那本笔记本学习，你可能会不小心学到错误的东西。AI 面临类似的问题，它能从有用的信息中学习，但也可能吸收错误、偏见、过时事实或令人困惑的例子。" },
      ] },
      { title: "AI 并不总是理解问题", blocks: [
        { type: "paragraph", text: "有时 AI 出错是因为问题不够清晰。想象有人问你\"它有多大\"，你可能会反问\"什么有多大？\"AI 可能会猜测\"它\"指的是什么。如果猜错了，整个答案都可能是错的。" },
        { type: "paragraph", text: "这就是为什么提示很重要。提示就是你输入或说给 AI 的内容。清晰的提示通常能得到更好的答案。不要问\"告诉我关于能源的事\"，而是问\"用4年级学生能懂的方式解释可再生能源和不可再生能源的区别\"。这给了 AI 更多方向。" },
      ] },
      { title: "AI 可能混淆相似的事物", blocks: [
        { type: "paragraph", text: "AI 擅长模式，但有时会混淆看起来或听起来相似的事物。它可能混淆名字相似的两个历史人物、混淆电影名和书名，或用听起来正确但不太准确的词解释科学概念。" },
        { type: "paragraph", text: "这是因为 AI 没有像你那样直接观察世界的真实经验。一些 AI 系统也不会自动了解最新信息。对于近期的发现、规定或事件，请务必查阅可信的最新来源。" },
      ] },
      { title: "怎么核实 AI 的答案？", blocks: [
        { type: "callout", title: "一条简单规则", accent: "teal", text: "把 AI 当作助手，而不是最终裁判。当 AI 给你答案时，尤其是关于学校作业、安全、健康或新闻的内容，要核实。" },
        { type: "paragraph", text: "你可以问：这条信息从哪里来的？我能在可信网站上找到相同答案吗？这与老师说的相符吗？这真的说得通吗？" },
        { type: "paragraph", text: "试试三重检查规则：它说得通吗？另一个可信来源能确认吗？老师、家长或专家会同意吗？如果答案有一条不通过，慢下来再想想。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "AI 出错是因为它在预测和猜测，从不完美的数据中学习，误解不清晰的问题，混淆相似的想法，有时缺乏最新信息。这不意味着 AI 没用，只是意味着我们需要明智地使用它。" },
        { type: "callout", accent: "teal", text: "AI 可以帮助你更快学习和进行头脑风暴，但你的工作是保持好奇并问：我怎么知道这是真的？" },
      ] },
    ],
  },
  "how-does-your-phone-recognize-your-face": {
    ...localizedBlogArticles.en["how-does-your-phone-recognize-your-face"],
    title: "手机如何识别你的脸？",
    category: "AI",
    readTime: common.zh.minutes.m5,
    imageAlt: "一部 iPhone 屏幕显示 Face ID 设置界面，正在扫描人脸，展示手机如何绘制面部几何图谱",
    imageCaption: "Face ID 在你的脸上绘制数千个点并与储存的3D模型对比，使用的是现代 AI 核心的那种模式识别。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "用脸解锁手机感觉像魔法。你拿起手机，看向屏幕，手机就开了。不需要密码，不需要输入，只需要你的脸。" },
        { type: "paragraph", text: "但你的手机不是在想\"哦，是我的朋友！\"它不像你的家人或朋友那样认识你。相反，你的手机使用摄像头、传感器、规律和机器学习，来判断眼前的脸是否与它保存的脸匹配。" },
      ] },
      { title: "你的脸有规律", blocks: [
        { type: "paragraph", text: "每张脸都有规律。你的眼睛之间有一定的距离，鼻子有特定的形状，下颌、脸颊、额头和嘴巴都构成独特的排列。人脸识别技术在这些特征中寻找规律。" },
        { type: "paragraph", text: "你的手机保存了一个脸部规律。当你看向它时，它将新规律与保存的规律进行对比。如果它们足够匹配，手机就解锁。把它想成一个非常高级的配对游戏。" },
      ] },
      { title: "设置时发生了什么？", blocks: [
        { type: "paragraph", text: "第一次设置人脸识别时，手机会要求你转动头部或从不同角度看。这是因为你的脸不总是看起来完全一样，有时你在明亮光线下，有时在阴影中，有时戴眼镜。" },
        { type: "paragraph", text: "手机需要从不同角度学习你脸的强规律，这样之后即使条件变化也能认出你。" },
      ] },
      { title: "摄像头和传感器帮忙", blocks: [
        { type: "paragraph", text: "普通摄像头拍照片，但有些手机还使用额外的传感器。这些传感器可能帮助测量深度，即你脸的不同部分距离有多远，这有助于手机区分真实的脸和平面照片。" },
        { type: "paragraph", text: "想象看一张纸上画的立方体和一个真正的积木方块。真正的方块有深度，平面画没有。有些人脸识别系统使用深度来使识别更安全、更准确。" },
      ] },
      { title: "机器学习在哪里发挥作用？", blocks: [
        { type: "paragraph", text: "机器学习是一种帮助计算机从例子中学习规律的 AI。对于人脸识别，机器学习帮助手机理解哪些规律属于你的脸，以及在不同情况下这些规律可能如何变化。" },
        { type: "paragraph", text: "例如，如果你微笑、戴帽子、歪头或剪了发型，你的脸可能看起来有点不同。机器学习帮助系统处理小变化，而不会每次都感到困惑。" },
      ] },
      { title: "为什么隐私很重要", blocks: [
        { type: "paragraph", text: "人脸识别很有用，但也引发重要的隐私问题。你的脸与密码不同。如果有人知道了你的密码，你可以更改。但你不能轻易更换自己的脸。" },
        { type: "callout", accent: "teal", text: "这就是为什么公司、学校、应用程序和设备需要谨慎对待人脸识别。它们应该解释收集什么数据、如何储存以及谁可以访问。孩子在使用扫描脸部的应用程序之前应该询问大人。" },
      ] },
      { title: "人脸识别会出错吗？", blocks: [
        { type: "paragraph", text: "会的。人脸识别有时会失败，可能在应该解锁时无法解锁，或在光线不好时遇到困难。一些系统对某些人群的准确性也较低，尤其是当它们没有在足够多样化的面孔上训练时。" },
        { type: "paragraph", text: "这也是为什么技术需要人类来测试、改进，并负责任地使用。" },
      ] },
      { title: "试试这个思想实验", blocks: [
        { type: "paragraph", text: "假设你在设计一个人脸解锁系统，遇到这些情况它应该怎么办：" },
        { type: "list", items: ["房间太暗？", "用户戴了太阳镜？", "有人举起了用户的照片？", "双胞胎想解锁同一部手机？", "用户随着成长面貌改变？"] },
        { type: "paragraph", text: "这些都是真实的工程问题。设计师必须同时考虑准确性、安全性、公平性和隐私。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "你的手机通过寻找规律来识别你的脸，而不是像人一样理解你。它使用摄像头和传感器收集信息，用机器学习理解脸部规律，用安全规则决定是否解锁。" },
        { type: "callout", accent: "teal", text: "在使用人脸扫描应用程序或分享脸部数据之前，问一下总是明智的：这条信息去哪了，谁能看到它？" },
      ] },
    ],
  },
  "why-does-autocorrect-make-weird-mistakes": {
    ...localizedBlogArticles.en["why-does-autocorrect-make-weird-mistakes"],
    title: "自动更正为什么会犯奇怪的错误？",
    category: "AI",
    readTime: common.zh.minutes.m4,
    imageAlt: "学生在 Avanza STEM AI 工作坊讨论预测系统的工作原理",
    imageCaption: "自动更正和 AI 有着相同的核心思路：两者都根据语言中的规律预测接下来应该出现什么。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "自动更正有时很有用。你输入 \"teh\"，它把它改成 \"the\"。你打字很快，漏了一个字母，手机帮你避免了拼写错误。" },
        { type: "paragraph", text: "但有时自动更正会做奇怪的事。你想写\"我要去带零食\"，结果它把一个词改成了完全不同的东西。为什么自动更正会犯错？答案是：自动更正在预测词语，它并没有真正理解你的意思。" },
      ] },
      { title: "自动更正是预测工具", blocks: [
        { type: "paragraph", text: "自动更正会看你输入的内容，然后猜测你的意思。它会问：这个词在拼写上接近哪个词？前一个词后面通常出现什么词？这个人经常输入什么词？最可能的句子是什么？大多数时候这能奏效，但并非总是如此。" },
      ] },
      { title: "计算机不像人一样理解词语", blocks: [
        { type: "paragraph", text: "你理解词语，是因为你把它们与现实生活联系起来。如果有人说\"狗\"，你可能会想到宠物、叫声、皮毛、奔跑，或者你认识的某条狗。你通过经验理解意思。" },
        { type: "paragraph", text: "自动更正没有经验。它不知道狗的感觉，不知道玩笑的含义，也不知道你朋友的名字为什么是那样拼的。它只能看到字母、词语和规律。这就是为什么自动更正有时会把一个正确的词改掉——它不理解你的意图，只是认为另一个词更可能出现。" },
      ] },
      { title: "人名和俚语会让自动更正困惑", blocks: [
        { type: "paragraph", text: "人名是自动更正最大的挑战之一。也许你朋友的名字拼写不常见，也许你的城镇、学校或球队的名字不在手机词典里。自动更正可能会把它\"纠正\"成更常见的词，尽管那个名字本来是对的。" },
        { type: "paragraph", text: "人们还会创意地使用语言：孩子爱开玩笑、朋友用俚语、家人有昵称。自动更正可能完全不懂这些。如果你开玩笑输入了一个自造的词，自动更正可能会把它替换成无聊的或错误的东西。" },
      ] },
      { title: "为什么它有时会变得更好？", blocks: [
        { type: "paragraph", text: "你有没有注意到手机开始学会你经常用的词？这是因为一些自动更正系统会适应你的输入习惯。如果你一直用某个名字或短语，手机可能会停止修改它。" },
        { type: "paragraph", text: "这就是机器学习在发挥作用。系统注意到你的规律并进行调整。但这也可能造成有趣的问题：如果你经常不小心输入某个错字，手机可能开始认为那个错字是正确的。" },
      ] },
      { title: "自动更正和 AI 有关联", blocks: [
        { type: "paragraph", text: "自动更正和完整的 AI 聊天机器人不同，但它们有一个重要的共同点：都在做预测。自动更正预测词语或拼写，AI 聊天机器人预测更长的回应、句子和解释。两者都不像人类那样真正理解语言。" },
        { type: "callout", accent: "teal", text: "一个人可以问\"等等，你是什么意思？\"并注意到反讽、情绪和背景。计算机试图从规律中推断这些，但仍然可能犯错。" },
      ] },
      { title: "试试这个", blocks: [
        { type: "paragraph", text: "用自造的词、名字或俚语写一个奇怪的句子，看看自动更正会修改什么。然后问自己：它为什么选那个词？是根据拼写？常见短语？还是以前见过的词？" },
        { type: "paragraph", text: "这就是工程师的思维方式——不只是注意到某样东西出了问题，而是问：为什么会这样？" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "自动更正犯奇怪的错误，是因为它预测语言规律，而不是真正理解意思。它能修复错字、节省时间，并从你的输入中学习。但它也可能把正确的词改成错误的词。" },
        { type: "callout", accent: "teal", text: "自动更正很有用，但你的大脑才是编辑。发送前，记得再读一遍你的信息。" },
      ] },
    ],
  },
  "what-happens-when-you-ask-ai-a-question": {
    ...localizedBlogArticles.en["what-happens-when-you-ask-ai-a-question"],
    title: "你向 AI 提问时发生了什么？",
    category: "AI",
    readTime: common.zh.minutes.m5,
    imageAlt: "一名学生在 Avanza STEM AI 工作坊输入问题并阅读 AI 的回应",
    imageCaption: "从你的问题到 AI 的答案之间发生的事情，比看起来更有趣。这一切都关乎提示词、规律和预测。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "向 AI 提问感觉像是在和一个超级聪明的机器人说话。你输入\"天空为什么是蓝色的？\"几秒钟后就得到了答案。但是，在你的问题和回应之间究竟发生了什么呢？" },
        { type: "paragraph", text: "AI 不是打开一个小小的大脑像人一样思考，它遵循一个基于提示词、训练、规律和预测的流程。让我们一步步来看。" },
      ] },
      { title: "第一步：你给 AI 一个提示词", blocks: [
        { type: "paragraph", text: "提示词就是你给 AI 的问题、指令或信息。它可以很简单，比如\"解释重力\"，也可以更具体：\"用三年级学生能懂的方式，用操场的例子解释重力。\"" },
        { type: "callout", accent: "teal", text: "第二个提示通常能得到更好的答案，因为它告诉了 AI 你想要什么样的回应。提示词就像给队友的指令——指令越清晰，结果越好。" },
      ] },
      { title: "第二步：AI 分解你的词语", blocks: [
        { type: "paragraph", text: "AI 会查看你的提示词并将其分解成更小的部分。它关注词语、词序以及这些词语构成的规律。" },
        { type: "paragraph", text: "例如，如果你问\"给孩子解释光合作用\"，AI 会注意到：\"解释\"意味着你想要一个教学式的答案；\"光合作用\"是主题；\"给孩子\"意味着答案应该简单清晰。AI 用这些线索来决定要创建什么样的回应。" },
      ] },
      { title: "第三步：AI 使用训练中学到的内容", blocks: [
        { type: "paragraph", text: "在 AI 能回答问题之前，它需要经过训练。训练意味着 AI 系统研究大量例子：文本、问题、答案、解释、故事、代码和其他各种信息。" },
        { type: "paragraph", text: "训练中，AI 不是记住所有内容，而是学习规律：哪些词经常连在一起出现，问题通常如何被回答，解释是如何组织的，以及不同的写作风格是什么样的。这些训练帮助 AI 在你问新问题时做出回应。" },
      ] },
      { title: "第四步：AI 预测回应", blocks: [
        { type: "paragraph", text: "AI 通过预测接下来应该出现什么来创建答案。它不是从抽屉里拿出一个现成的答案，而是逐步构建回应。如果你问\"植物为什么需要阳光？\"AI 可能预测一个好的答案应该提到能量、食物、叶子和光合作用。" },
        { type: "paragraph", text: "这就是为什么 AI 能以多种方式解释主题——根据你的提示，它可以创建简短答案、长答案、诗歌、故事、测验或分步指南。" },
      ] },
      { title: "第五步：答案出现了", blocks: [
        { type: "paragraph", text: "AI 预测并构建好回应后，你会在屏幕上看到答案。它可能看起来流畅而自信，但记住它是如何生成的仍然很重要。" },
        { type: "paragraph", text: "AI 不是一个有过亲身经历、查阅过教科书、仔细思考过什么重要的人。它是一个用规律生成回应的工具。这个回应可能有帮助，也可能需要核实。" },
      ] },
      { title: "为什么清晰的提示有帮助", blocks: [
        { type: "paragraph", text: "更好的提示通常能得到更好的答案。与其说\"告诉我关于机器人的事\"，不如说\"用4年级学生能懂的方式，举例解释机器人和 AI 的区别\"。与其说\"帮我做科学\"，不如说\"给我三个关于磁铁的简单科学展览项目想法，用我在家能找到的材料\"。AI 在你给它一个明确任务时表现最好。" },
      ] },
      { title: "试试这个", blocks: [
        { type: "paragraph", text: "用三种不同方式向 AI 提同一个问题：" },
        { type: "list", items: ["解释电。", "用水滑梯的例子解释电。", "用五句话为三年级学生解释电。"] },
        { type: "paragraph", text: "比较答案，你会看到提示词如何改变了回应。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "当你向 AI 提问时，你给它一个提示词。AI 读取提示词，使用训练中学到的规律，预测回应并创建答案。这看起来像思考，但实际上是基于规律的预测。这让 AI 强大，但并不完美。" },
        { type: "callout", accent: "teal", text: "AI 可以给你回应，但理解它是你的责任。保持好奇，写清晰的提示词，并核实重要的答案。" },
      ] },
    ],
  },
  "should-kids-trust-everything-ai-says": {
    ...localizedBlogArticles.en["should-kids-trust-everything-ai-says"],
    title: "孩子应该相信 AI 说的一切吗？",
    category: "AI",
    readTime: common.zh.minutes.m5,
    imageAlt: "学生在 Avanza STEM AI 工作坊讨论何时信任 AI，何时核实 AI 的回应",
    imageCaption: "知道何时信任 AI、何时核实，是学生在 Avanza STEM AI 工作坊学到的最重要技能之一。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "AI 可以很有用。它能解释作业问题、提供项目想法、写故事、回答问题，帮助你学习新东西。它感觉像是把家庭教师、图书馆员和头脑风暴伙伴集于一身。" },
        { type: "paragraph", text: "但孩子应该相信 AI 说的一切吗？不应该。AI 可能有用，但它并不总是正确的。孩子应该带着好奇心和谨慎之心使用 AI。" },
      ] },
      { title: "AI 即使出错也听起来很自信", blocks: [
        { type: "paragraph", text: "AI 有一个棘手之处：它可能对自己非常有把握。它可能用平静、清晰的方式给出答案，用大词，甚至把答案整理成整齐的段落。" },
        { type: "callout", accent: "teal", text: "整齐的答案不等于正确的答案。AI 可能犯错、混淆事实，甚至捏造信息。当 AI 编造内容时，人们通常称之为幻觉。" },
      ] },
      { title: "像侦探一样思考", blocks: [
        { type: "paragraph", text: "安全使用 AI 意味着像侦探一样思考。侦探不会不核实就接受第一条线索。侦探会提问、寻找证据、对比信息。" },
        { type: "paragraph", text: "当 AI 给你一个答案时，问自己：这有道理吗？这条信息从哪来的？我能在别处核实吗？这很重要吗？我应该问大人吗？" },
        { type: "paragraph", text: "目标不是害怕 AI，而是聪明地使用它。" },
      ] },
      { title: "有些问题需要格外小心", blocks: [
        { type: "paragraph", text: "有些 AI 回答风险较低。如果你让 AI 写一个关于喜欢煎饼的龙的搞笑故事，你不需要核实每个细节。这只是娱乐。" },
        { type: "paragraph", text: "但有些话题需要更谨慎。请小心处理 AI 关于以下内容的回答：健康和安全、金钱、新闻和时事、学校作业中要求准确的内容、个人问题、私人信息，以及任何可能影响他人的内容。对于这些话题，AI 不应该是你唯一的信息来源。" },
      ] },
      { title: "询问信任的大人", blocks: [
        { type: "paragraph", text: "如果你不确定 AI 说的某些内容，可以询问信任的大人——父母、老师、图书馆员、教练或其他能帮助你思考的成年人。" },
        { type: "paragraph", text: "AI 可以提供一般信息，但它不了解你的整个生活。信任的大人能更好地理解你的情况。这在 AI 涉及你的身体、感受、友谊、家庭、安全或个人选择时尤为重要。" },
      ] },
      { title: "不要分享私人信息", blocks: [
        { type: "paragraph", text: "另一个重要规则：不要向 AI 分享私人信息。私人信息包括：你的全名、你的家庭或学校地址、密码、电话号码、个人照片、私人家庭信息，以及任何如果陌生人看到你会感到不舒服的内容。" },
        { type: "paragraph", text: "AI 工具和应用程序可能以不同方式处理信息。由于孩子可能不知道这些信息会去哪里，不分享私人细节更安全。有疑问时，先问大人。" },
      ] },
      { title: "孩子可以怎样使用 AI", blocks: [
        { type: "paragraph", text: "AI 用得好的话很棒。你可以让它：用更简单的词解释令人困惑的话题、提供数学练习题、帮助头脑风暴科学项目想法、在考试前考你、建议你可以问老师的问题、帮你列故事大纲、解释编程错误，以及举例说明某样东西是如何工作的。" },
        { type: "paragraph", text: "使用 AI 最好的方式不是复制，而是学习。如果 AI 帮助你更好地理解某些内容，那就是成功。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "孩子不应该相信 AI 说的一切。AI 可以有用、有创意、也很有趣，但它也可能出错，即使在犯错时也听起来很自信。" },
        { type: "callout", accent: "teal", text: "聪明的 AI 用户不会什么都信。他们思考、核实、提问。把 AI 当作工具，而不是你大脑的老板。" },
      ] },
    ],
  },
  "how-do-video-games-use-ai": {
    ...localizedBlogArticles.en["how-do-video-games-use-ai"],
    title: "电子游戏如何使用 AI？",
    category: "AI",
    readTime: common.zh.minutes.m5,
    imageAlt: "由 AI 行为规则驱动角色和环境的游戏场景，控制角色的移动和决策",
    imageCaption: "游戏 AI 不是科幻那种。它是一本规则书，告诉角色何时追逐、逃跑、巡逻或对玩家做出反应。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "你有没有玩过一款游戏，其中敌人会追你、角色会和你说话，或者游戏随你进步而变难？这不是随机的魔法，许多电子游戏都在使用 AI。" },
        { type: "paragraph", text: "游戏 AI 帮助角色移动、做出选择、对玩家做出反应并制造挑战。它能让游戏感觉更有生命力。但电子游戏 AI 与你用来回答问题的 AI 不总是相同的。在游戏中，AI 通常意味着让角色看起来很聪明的行为规则。" },
      ] },
      { title: "什么是游戏 AI？", blocks: [
        { type: "paragraph", text: "游戏 AI 是控制计算机角色行为的技术。这些角色可能是敌人、队友、动物、村民、怪物、赛车手或店主，通常被称为 NPC，即非玩家角色——任何由游戏而非人类玩家控制的角色。" },
        { type: "paragraph", text: "游戏 AI 帮助 NPC 决定做什么：敌人应该追你吗？队友应该跟着你吗？赛车在弯道前应该减速吗？店主应该在你走近时打招呼吗？这些选择都是游戏 AI 的一部分。" },
      ] },
      { title: "敌人的移动", blocks: [
        { type: "paragraph", text: "游戏中 AI 最常见的用途之一是敌人的移动。想象一个迷宫游戏，一只怪物试图找到你。游戏设计师可以用算法——即分步指令集——来帮助敌人导航。" },
        { type: "paragraph", text: "例如，敌人可能遵循这样的规则：如果玩家近，就追；如果玩家远，就巡逻；如果有墙，就转弯；如果生命值低，就逃跑；守卫一个宝箱。" },
        { type: "paragraph", text: "这些简单的规则能创造出感觉很有智慧的行为。" },
      ] },
      { title: "NPC 的选择和难度", blocks: [
        { type: "paragraph", text: "NPC 也可以做出选择。在某些游戏中，一个角色可能根据你之前做的事情以不同方式说话。村民可能感谢你帮助了他们，守卫可能在你没有钥匙时挡住你的路——游戏在检查条件：如果发生了这件事，就做那件事。" },
        { type: "paragraph", text: "一些游戏还用 AI 调整难度。如果游戏太容易，玩家会无聊；太难，玩家会沮丧。敌人可能变得更快，谜题可能变得更难，或者如果你卡住了，游戏可能给出提示。这有助于保持游戏的趣味性。" },
      ] },
      { title: "游戏 AI 可以简单也可以复杂", blocks: [
        { type: "paragraph", text: "并非所有游戏 AI 都很先进。有时角色只是来回走动，有时敌人只是沿着简单路径移动。这仍然算作游戏行为，即使它不是很\"聪明\"。" },
        { type: "paragraph", text: "其他游戏使用更复杂的系统：角色可能对声音、光线、玩家选择或变化的环境做出反应。目标不总是让 AI 尽可能聪明，而是让游戏有趣。" },
      ] },
      { title: "为什么不让敌人变得完美？", blocks: [
        { type: "paragraph", text: "如果游戏 AI 可以很聪明，为什么不让敌人无敌呢？因为那样就没有乐趣了。想象玩一个计算机完美阻断每次射门的足球游戏，或者电脑赛车从不犯错的赛车游戏——那会感觉不公平。" },
        { type: "callout", accent: "teal", text: "好的游戏 AI 是为了挑战你，而不是压垮你。有时设计师甚至故意让 AI 不那么完美——敌人可能在攻击前暂停、偶尔失误，或者给玩家一些线索。这给了你反应、学习和进步的机会。" },
      ] },
      { title: "试着设计你自己的游戏 AI", blocks: [
        { type: "paragraph", text: "你现在就可以像游戏设计师一样思考。想象你在为一个迷宫游戏创造一只怪物，它应该遵循什么规则？随机走动，直到看到玩家；如果玩家近，就追；追了10秒后停止；如果玩家拿到了道具，就逃跑；守卫宝箱。" },
        { type: "paragraph", text: "用这几条规则，你就能创造有趣的行为。下次玩游戏时，仔细观察角色，问问自己：是什么规则在控制它们的行为？" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "电子游戏使用 AI 来控制敌人、NPC、难度、移动和游戏行为。游戏 AI 可以是简单规则，也可以是更复杂的系统。它帮助角色对玩家做出反应，让游戏更有趣。" },
        { type: "callout", accent: "teal", text: "最好的游戏 AI 不总是最聪明的 AI，而是为玩家创造最好体验的 AI。" },
      ] },
    ],
  },
  "is-a-robot-the-same-thing-as-ai": {
    ...localizedBlogArticles.en["is-a-robot-the-same-thing-as-ai"],
    title: "机器人和 AI 是同一回事吗？",
    category: "AI",
    readTime: common.zh.minutes.m4,
    imageAlt: "对比图，一侧是实体机器人，另一侧是 AI 大脑或神经网络，显示它们是不同的事物",
    imageCaption: "机器人是实体机器，AI 是学习规律的软件。它们是不同的东西，也不总是连在一起出现。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "机器人和 AI 经常被放在一起谈论。在电影里，机器人走路、说话、思考、制定计划，有时几乎像人一样行动。因此很容易认为机器人和 AI 是同一回事。" },
        { type: "paragraph", text: "但它们不是。机器人是能物理完成任务的机器，AI 是能做出预测、识别规律或帮助做决策的软件。有时它们会合作，但机器人不总是有 AI，AI 也不总是需要机器人的身体。" },
      ] },
      { title: "什么是机器人？", blocks: [
        { type: "paragraph", text: "机器人是能感知、移动或执行任务的机器。有些机器人看起来像人，但很多并不像。机器人可能是：扫地机器人、工厂里焊接汽车的机械臂、无人机、火星探测车、玩具机器人，或者手术中使用的机器。" },
        { type: "paragraph", text: "机器人通常有电机、轮子、机械臂、摄像头、传感器或夹持器等物理部件。关键点是：机器人与物理世界交互。" },
      ] },
      { title: "什么是 AI？", blocks: [
        { type: "paragraph", text: "AI，即人工智能，是能完成看似需要智能任务的计算机技术。AI 能识别规律、做预测、生成文本、分类图像、翻译语言或推荐视频。" },
        { type: "paragraph", text: "AI 不需要身体。例如，AI 聊天机器人存在于软件中。它能回答问题，但除非连接到机器人，否则无法拿起铅笔。AI 就像决策部分，机器人是物理机器部分。" },
      ] },
      { title: "传感器和电机是什么？", blocks: [
        { type: "paragraph", text: "传感器帮助机器检测世界。人类有视觉、听觉、触觉等感官，机器人用传感器收集信息——摄像头用来\"看\"，麦克风用来\"听\"，触觉传感器检测接触，距离传感器避开墙壁，温度传感器测量热量。" },
        { type: "paragraph", text: "电机帮助机器人移动——可以转动轮子、抬起机械臂、打开夹爪或转动关节。如果传感器是机器人的感官，电机就是它的肌肉。但电机自己不做任何决定，它们需要指令。" },
      ] },
      { title: "没有 AI 的机器人", blocks: [
        { type: "paragraph", text: "有些机器人根本不用什么 AI。想象一个沿着地面黑线行走的简单机器人：它下面有一个光线传感器，看到线就向前走，偏离就转回来。那个机器人在遵循规则，它可能看起来很聪明，但不一定在使用先进 AI，而是在使用传感器、电机和编好的指令。" },
      ] },
      { title: "没有机器人的 AI", blocks: [
        { type: "paragraph", text: "现在想象一个帮你写诗的 AI。它能创造文字，但没有轮子、机械臂或摄像头，无法走过房间、搭建积木或拿起水瓶。这就是没有机器人的 AI——它能处理信息，但没有物理身体。" },
      ] },
      { title: "有 AI 的机器人", blocks: [
        { type: "paragraph", text: "有些机器人确实使用 AI。自动驾驶汽车就是一个好例子——它有摄像头和传感器观察道路、标志、车道、汽车和行人，用 AI 帮助理解发生了什么并决定如何安全移动。" },
        { type: "callout", accent: "teal", text: "在这种情况下，机器人身体和 AI 大脑协同工作：机器人感知世界，AI 帮助做决策，电机让机器人移动。" },
      ] },
      { title: "试试这个", blocks: [
        { type: "paragraph", text: "环顾你的家或学校，你能找到机器人吗？能找到使用 AI 的东西吗？能找到只是普通计算机的东西吗？计算器是计算工具但通常不是 AI；扫地机器人是机器人；语音助手可能使用 AI；打印机是机器但通常不是我们通常意义上的机器人。" },
        { type: "paragraph", text: "这样思考能帮助你像工程师一样对技术进行分类。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "机器人和 AI 不是同一回事。机器人是能移动或执行任务的实体机器，AI 是识别规律、做预测或帮助做决定的软件。它们可以协同工作，但它们是不同的。" },
        { type: "callout", accent: "teal", text: "下次你看到\"智能机器人\"时，问一问：哪部分是机器人，哪部分是 AI，哪些传感器帮助它理解世界？" },
      ] },
    ],
  },
  "how-do-robots-know-where-they-are": {
    ...localizedBlogArticles.en["how-do-robots-know-where-they-are"],
    title: "机器人如何知道自己在哪里？",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    imageAlt: "一个机器人使用摄像头和传感器扫描并绘制周围环境地图以导航",
    imageCaption: "机器人使用摄像头、激光雷达和建图软件构建周围环境的图像，并在移动时不断更新。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "想象你闭着眼睛走过学校——也许走几步，但很快就会撞上墙、桌子或某人的书包。要安全移动，你需要关于自己位置的线索。" },
        { type: "paragraph", text: "机器人面临同样的问题。机器人不能自动知道自己在哪里，它必须用传感器、摄像头、轮子、地图和数学来弄清楚。基本思路很简单：机器人收集周围世界的线索，然后用这些线索对自己的位置做出最佳猜测，并决定下一步去哪里。" },
      ] },
      { title: "机器人也需要感官", blocks: [
        { type: "paragraph", text: "人类有视觉、听觉、触觉和平衡感，机器人使用传感器——能帮助机器人注意世界上某些事物的工具。有些传感器检测距离，有些看到物体，有些测量速度或辨别方向。" },
        { type: "list", items: ["摄像头：看墙、道路、人、标志或障碍物", "轮子：测量机器人走了多远", "GPS：在户外估计位置", "激光雷达：用激光光线扫描区域", "超声波传感器：用声波弹射到物体上", "陀螺仪：感知转动或倾斜"] },
        { type: "paragraph", text: "每个传感器给机器人一片拼图。摄像头可能看到一扇门，轮子传感器可能说机器人移动了五英尺，距离传感器可能检测到附近有墙。机器人把这些线索组合起来理解自己的位置。" },
      ] },
      { title: "数车轮转数", blocks: [
        { type: "paragraph", text: "机器人猜测自己在哪里的一种简单方法，是计算车轮转了多少圈。如果机器人从教室门口出发，车轮向前滚了三米，它可以估计自己现在距起点三米。这叫做里程计，有点像数步数。" },
        { type: "callout", accent: "green", text: "如果车轮打滑呢？如果地板不平呢？即使是微小的测量误差也会随时间累积变大。这就是为什么机器人通常依靠不止一个传感器。" },
      ] },
      { title: "像眼睛一样使用摄像头", blocks: [
        { type: "paragraph", text: "一些机器人用摄像头识别周围的事物。扫地机器人注意家具腿和墙壁，自动驾驶汽车看车道线、交通灯和行人，火星探测车用摄像头研究岩石、避开危险地面。" },
        { type: "paragraph", text: "但摄像头不像人一样理解世界。当你看到一把椅子，你立刻知道那是椅子；机器人把图像看作数据，需要处理形状、颜色、边缘、阴影和规律才能判断看到的是什么。光线会变化，物体会重叠，椅子从正面、侧面和背面看起来不同，机器人必须经过训练来处理所有这些可能性。" },
      ] },
      { title: "建立地图", blocks: [
        { type: "paragraph", text: "一些机器人在移动时建立地图。扫地机器人可能从一个房间出发，慢慢学习墙壁、家具和开放空间在哪里，然后用这张地图更有效率地清洁，而不是随机乱撞。" },
        { type: "paragraph", text: "这类似于你探索一栋新楼的过程。一开始你不知道任何东西在哪里；走了一圈后，你开始记住：楼梯在入口附近，体育馆在走廊尽头，图书馆在拐角处。机器人也建立地图，只是用传感器和计算机程序来做。" },
        { type: "callout", accent: "green", text: "一些机器人同时尝试建立地图并弄清楚自己在地图中的位置——同时问两个问题：我在哪里，这个地方长什么样？" },
      ] },
      { title: "为什么机器人还是会迷路", blocks: [
        { type: "paragraph", text: "即使是聪明的机器人也可能困惑。如果车轮打滑、传感器给出错误读数、房间发生变化、家具被移动、光线变暗、东西挡住摄像头，或者两条走廊看起来几乎一样，机器人可能会迷路。" },
        { type: "paragraph", text: "这就是为什么机器人要一遍又一遍地检查自己的位置，不会只做一次猜测然后永远相信它，而是随着新信息不断更新估计——就像你走过博物馆时查看地图、看指示牌、四处张望一样。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "机器人通过收集线索来知道自己在哪里，使用摄像头、轮子、GPS、激光和运动探测器等传感器，然后将这些线索组合起来估计位置、建立地图、避开障碍物并决定下一步去哪里。" },
        { type: "callout", accent: "green", text: "下次你看到机器人在空间中移动时，记住：它不只是在滚动，它在感知、猜测、检查和不断调整。这就是机器人找路的方式。" },
      ] },
    ],
  },
  "why-robots-are-bad-at-easy-human-tasks": {
    ...localizedBlogArticles.en["why-robots-are-bad-at-easy-human-tasks"],
    title: "机器人为什么不擅长人类轻松完成的事？",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    imageAlt: "一个机器人在努力完成一项人类毫不费力就能轻松完成的简单物理任务",
    imageCaption: "一个人只需零点几秒就能完成的任务——比如捡起一件揉皱的衬衫——可能需要工程师花费数年才能让机器人大致做到。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "叠衣服看起来很简单：拿起一件衬衫，抖开，找到袖子，对折，放好。你可能根本不需要动脑。" },
        { type: "paragraph", text: "但对机器人来说，叠衣服极其困难。开门、捡玩具、系鞋带、倒麦片，或从地板上拿起书包，对人类来说都很容易，对机器人来说却是最难解决的问题之一。" },
        { type: "paragraph", text: "机器人能建造汽车、探索火星、在工厂举起重物。那为什么一只袜子会让它困惑呢？答案是：真实世界是混乱的。" },
      ] },
      { title: "人类比我们意识到的更厉害", blocks: [
        { type: "paragraph", text: "你的大脑和身体一直在做令人惊叹的事情，即使你没有注意到。当你捡起一支铅笔时，你立刻知道它在哪里、它大概多重、要用多大力气握住它，以及如何让手指绕过它——即使它是侧放的、压在笔记本下面，或者一半悬在桌子边缘。" },
        { type: "paragraph", text: "机器人必须一步一步地搞清楚所有这些。首先要看到铅笔，然后要知道铅笔和桌子是分开的，然后要决定从哪里抓它，然后要移动手臂而不碰翻其他东西，然后要用足够的力气握住铅笔，但又不至于把它捏断。这要做很多事。" },
        { type: "callout", accent: "green", text: "人类让抓握看起来很容易，是因为我们花了多年时间同时练习使用眼睛、双手、肌肉和大脑。机器人必须从头开始学习这一切。" },
      ] },
      { title: "软东西很难处理", blocks: [
        { type: "paragraph", text: "机器人通常很难处理软的、松软的物体。洗好的衣服是个完美例子：衬衫没有固定形状，会弯曲、起皱、扭转和塌陷；毛巾可以折叠在自己上面；一只袜子可以藏进另一只袜子里。" },
        { type: "paragraph", text: "硬物对机器人通常更容易——金属块保持同样形状，塑料盒子有清晰的边缘，杯子有可预测的形态。但布料每次移动时都会改变形状，机器人不能简单地记住一种衬衫形状，它必须理解织物的行为方式，这非常困难。" },
      ] },
      { title: "开门没有那么简单", blocks: [
        { type: "paragraph", text: "想想有多少种不同的门：有圆形旋钮的，有把手的，滑动的，推的，拉的，重的，轻的，会卡住的，自动关的……" },
        { type: "paragraph", text: "人类看到大多数门就能快速明白该怎么做。机器人必须检测把手、理解它如何移动、正确定位夹持器、施加正确的力，并在开门时向后或向前移动。如果应该拉却变成了推，就失败了；如果从错误角度抓住把手，也失败了。一项你只需两秒的任务，可能变成重大的工程挑战。" },
      ] },
      { title: "世界不会静止不动", blocks: [
        { type: "paragraph", text: "工厂机器人非常擅长重复相同的动作，因为它们的环境是受控的——每次汽车零件都在同一个地方到达，机械臂做同样的动作。家庭、学校和室外空间则完全不同。" },
        { type: "paragraph", text: "东西到处移动：书包今天在地板上，明天可能在椅子上；玩具可能是倒置的。机器人必须处理意外情况。人类在这方面很出色——如果铅笔滚到椅子下面，你可以弯腰、移开椅子、绕过书包、抓住它，不需要重新编程。机器人在应对意外方面越来越好，但这仍然是机器人技术最大的挑战之一。" },
      ] },
      { title: "拿起东西需要判断力", blocks: [
        { type: "paragraph", text: "人类拿东西时会自动调整握力：你不会用握鸡蛋的方式握锤子，也不会用握棒球的方式握纸杯——力度、手指位置和动作都不同。" },
        { type: "paragraph", text: "机器人必须学习这些。握得太轻，东西会掉；握得太重，东西会破；抓错位置，东西会滑落。当物体是光滑的、透明的、软的、微小的、沉重的、形状奇怪的或在移动时，这尤其困难。这就是为什么机器人手和夹持器是工程学的一个重要研究领域。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "机器人很厉害，但人类生活的世界很复杂。对我们来说容易的任务对机器人往往很难，因为人类在感知、平衡、触摸、调整和从经验中学习方面惊人地出色。" },
        { type: "callout", accent: "green", text: "下次你叠衬衫、开门或拿零食时，你正在做一些机器人可能觉得非常困难的事情。你的大脑和双手是工程的杰作。" },
      ] },
    ],
  },
  "what-makes-a-robot-a-robot": {
    ...localizedBlogArticles.en["what-makes-a-robot-a-robot"],
    title: "机器人的本质是什么？",
    category: "机器人",
    readTime: common.zh.minutes.m4,
    imageAlt: "一个机器人，可见传感器、电机和关节，展示感知、处理、行动三个核心组成部分",
    imageCaption: "机器人需要感知环境、处理信息并采取物理行动。三者兼备才能定义一台机器是机器人。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "烤面包机是机器人吗？遥控汽车呢？自动售货机？智能音箱？扫地机器人呢？" },
        { type: "paragraph", text: "\"机器人\"这个词被大量使用，但并非每台机器都是机器人。机器人是能感知世界、做出决定并采取行动的机器。大多数机器人有三个重要部分：传感器、控制器和执行器。简单来说：机器人注意事物、遵循指令思考，然后移动或做某事。" },
      ] },
      { title: "第一部分：传感器帮助机器人注意", blocks: [
        { type: "paragraph", text: "机器人需要关于周围世界的信息，这些信息来自传感器——能检测某些东西的设备，可以检测：光线、距离、声音、触觉、温度、运动、方向、颜色、压力。" },
        { type: "paragraph", text: "扫地机器人用传感器检测墙壁、楼梯、家具和灰尘；自动驾驶汽车用摄像头和其他传感器检测道路、标志、汽车和行人；工厂里的机械臂可能用传感器知道零件是否在正确位置。没有传感器，机器人就像一个没有视觉、听觉和触觉的人在试图导航。" },
      ] },
      { title: "第二部分：控制器帮助机器人决定", blocks: [
        { type: "paragraph", text: "控制器是机器人的决策中心。它不是像人脑一样的大脑，但它是运行指令的部分——这些指令可能很简单，也可能非常先进。" },
        { type: "paragraph", text: "简单机器人可能遵循这样的规则：如果传感器检测到墙，就左转。更先进的机器人可能用摄像头、地图和计算机程序来决定穿越房间最安全的路径。控制器可以是微型计算机、电路板或强大的处理器。它接收传感器信息并决定机器人下一步该做什么。" },
        { type: "callout", accent: "green", text: "感知。决定。行动。这个循环一遍又一遍地重复，是机器人技术中最重要的概念之一。" },
      ] },
      { title: "第三部分：执行器帮助机器人移动", blocks: [
        { type: "paragraph", text: "执行器是机器人中使移动发生的部分。电机是一种常见类型，可以转动轮子、移动机械臂、转动齿轮、打开夹持器或旋转关节。" },
        { type: "paragraph", text: "工厂里的机械臂可能有多个电机——每个关节一个；机器人手可能有微型电机或电缆来移动手指；无人机用电机旋转螺旋桨保持飞行。没有执行器，机器人可以感知和决定，但无法做任何物理动作。" },
      ] },
      { title: "机器人必须看起来像人吗？", blocks: [
        { type: "paragraph", text: "不必。这是最大的机器人误解之一。机器人不需要脸、手臂、腿或眼睛。机器人的形状取决于它的工作：小型吸尘器、探测车、机械臂、无人机、潜水艇、送货车，或工厂里的机器。" },
        { type: "callout", accent: "green", text: "好的机器人设计从这个问题开始：这个机器人需要做什么？答案驱动关于形状、传感器和运动的每一个选择。" },
      ] },
      { title: "遥控汽车是机器人吗？", blocks: [
        { type: "paragraph", text: "通常情况下，普通遥控汽车不被认为是完整的机器人，因为人类控制每一个动作。但如果汽车能感知障碍物并自己决定如何转向，它就更像机器人了。区别在于决策能力——只遵循人类直接命令的机器只是机器，能根据自己收集的信息做出至少一些决策的机器才是机器人。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "机器人不只是会移动的机器。机器人用传感器收集信息，用控制器处理指令，用执行器采取行动。它不必看起来像人，不必会说话，其核心遵循一个简单循环：" },
        { type: "callout", accent: "green", text: "感知。决定。行动。这个循环让机器人技术如此强大，如此有趣。" },
      ] },
    ],
  },
  "how-mars-rovers-drive-without-a-driver": {
    ...localizedBlogArticles.en["how-mars-rovers-drive-without-a-driver"],
    title: "火星探测车如何在没有驾驶员的情况下行驶？",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    imageAlt: "一辆火星探测车在火星表面崎岖的红色地形上行驶，没有人类驾驶员，完全由车载摄像头和软件引导",
    imageCaption: "火星探测车自己驾驶是因为来自地球的信号单程最多需要24分钟。人类来不及对障碍物做出反应。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "火星上有机器人在行驶。火星探测车是在另一颗星球表面移动的机器人探险家，研究岩石、拍照，帮助科学家学习。而且没有驾驶员坐在方向盘后面，也没有宇航员在附近用遥控器控制。" },
        { type: "paragraph", text: "那么火星探测车是如何行驶的呢？答案涉及太空、摄像头、车轮、规划和很多耐心。" },
      ] },
      { title: "火星非常遥远", blocks: [
        { type: "paragraph", text: "火星距地球数百万英里。因此，地球和火星之间的信息传递需要时间。尽管无线电信号传播速度极快，但并不是即时的。根据地球和火星在各自轨道上的位置，一条信息到达火星可能需要几到二十多分钟。" },
        { type: "paragraph", text: "这意味着科学家不能像开电子游戏车一样驾驶火星探测车。如果探测车开始向一块岩石滚去，地球上的工程师无法立即按下按钮停止它——等命令到达时，探测车可能已经出问题了。" },
      ] },
      { title: "探测车接收指令", blocks: [
        { type: "paragraph", text: "火星探测车通常不会自己醒来随机决定去哪里。地球上的科学家和工程师团队研究来自探测车的图像和数据，观察地形并选择有趣的目标——比如岩石、土壤、山丘或平坦的路径。" },
        { type: "paragraph", text: "然后他们向探测车发送一组指令，可能告诉它开向某个位置、拍照、检查一块岩石或使用科学工具。但因为时间延迟，探测车也需要有一些自主决策的能力。" },
      ] },
      { title: "摄像头是探测车的眼睛", blocks: [
        { type: "paragraph", text: "火星探测车用摄像头看周围的世界。有些摄像头向前看以帮助规划路径，有些向下看地面，有些拍摄宽阔的景观图，其他的帮助科学家仔细研究岩石。" },
        { type: "paragraph", text: "探测车可以用摄像头图像检测障碍物，比如大岩石、陡坡、洞穴或崎岖地面。这很重要，因为火星不是平坦的停车场——它有尘土、石块、山脊、陨石坑和不平坦的地形。探测车必须小心移动以避免卡住或损坏。" },
      ] },
      { title: "为另一颗星球设计的车轮", blocks: [
        { type: "paragraph", text: "火星探测车的车轮是为崎岖地面设计的，需要能翻越岩石、应对尘土，并在极寒温度和没有修理站的恶劣环境中支撑探测车的重量。" },
        { type: "paragraph", text: "如果你的自行车爆胎，有人可以修。如果火星探测车的轮子损坏，工程师必须从地球上想出解决办法。这就是为什么探测车行驶缓慢而谨慎——速度不是目标，探索才是。" },
      ] },
      { title: "探测车可以自行避开一些麻烦", blocks: [
        { type: "paragraph", text: "火星探测车可以使用自主导航，即机器人能自行处理一些任务。工程师可能告诉探测车开向某个点，在移动过程中，探测车用摄像头检查障碍物，如果看到危险的岩石或斜坡，可以调整路径或停下来。" },
        { type: "callout", accent: "green", text: "探测车不是像人类一样在思考，它在遵循精心设计的计算机指令，这些指令会问：这条路安全吗？有障碍物吗？我能绕过去吗？我应该停下来等待更多指令吗？" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "火星探测车在没有驾驶员的情况下行驶，依靠地球发来的指令、看地形的摄像头、为崎岖地面设计的车轮，以及帮助它避开危险的软件。它们不能像遥控车一样被驾驶，因为火星太遥远了。" },
        { type: "paragraph", text: "每一次车轮转动都是更大使命的一部分：探索人类尚未踏足的星球。" },
      ] },
    ],
  },
  "why-robot-hands-are-so-hard-to-make": {
    ...localizedBlogArticles.en["why-robot-hands-are-so-hard-to-make"],
    title: "为什么机器人的手这么难做？",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    imageAlt: "一只机械机器人手，展示其铰接式手指关节和传感器，试图复制人手的多功能性",
    imageCaption: "人手能在不压碎葡萄的情况下握住它，也能在不放开杠铃的情况下举起它。在机器人中复制这种能力是工程最难的问题之一。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "看一下你的手。张开，握紧，摆动手指。拇指去触碰每根手指的指尖，拿起一支铅笔，敲敲桌子，轻轻拿着什么东西。你的手在做令人惊叹的事情。" },
        { type: "paragraph", text: "人手是工程师最难复制的东西之一。机器人手可能看起来很酷，但让它们像真正的手一样工作极其困难——手不只是简单的夹子，它们是灵活的、敏感的、强壮的、温柔的，由强大的大脑控制的。" },
      ] },
      { title: "手指很复杂", blocks: [
        { type: "paragraph", text: "人手有很多活动部件：每根手指有关节，拇指能以特殊方式移动，让它能触碰其他手指；手腕能转动、弯曲和调整。所有这些部件协同工作，让你能从不同角度抓取物体。" },
        { type: "paragraph", text: "机器人手需要机械部件来复制这些动作：关节、电机、齿轮、电缆、材料和控制系统。即使顺畅地移动一根手指也很难，同时协调五根手指做有用的事情则难得多。" },
      ] },
      { title: "握力很棘手", blocks: [
        { type: "paragraph", text: "当你拿起东西时，你的手会自动选择用多大力气：你轻轻拿薯片，紧紧握着重书包的背带，铅笔介于两者之间。" },
        { type: "paragraph", text: "机器人必须学习这些。握得太紧会捏碎东西，握得太轻东西会滑落，抓错地方东西会扭转或掉落。当物体有不同的形状、大小、重量和质地时，这尤其难——光滑的玻璃杯和毛茸茸的网球不同，海绵和金属勺子不同。" },
      ] },
      { title: "触感很重要", blocks: [
        { type: "paragraph", text: "你的手布满了触觉传感器，可以感觉压力、质地、温度、滑动和疼痛。如果杯子开始从手中滑落，你几乎立刻就能感觉到并握得更紧。" },
        { type: "paragraph", text: "机器人手也需要触觉传感器，但复制人类的触感非常困难。机器人需要知道：我碰到物体了吗？我用了多大力？物体在滑动吗？它是软的还是硬的？我快把它捏碎了吗？没有这些反馈，机器人手只能猜测，而猜测会导致物体被掉落或损坏。" },
      ] },
      { title: "人手擅长处理奇怪的物体", blocks: [
        { type: "paragraph", text: "人手可以拿起各种各样的东西：硬币、三明治、水瓶、鞋带、篮球、揉皱的纸。这些物体形状各不相同，有的小，有的大，有的软，有的滑，有的被触碰时会改变形状。" },
        { type: "paragraph", text: "机器人手在物体可预测时通常表现最好。如果机器人被设计来捡起工厂中某一种零件，它可以非常擅长这项工作。但能捡起几乎任何东西的通用机器人手？那难多了。" },
      ] },
      { title: "机器人手不总需要看起来像人手", blocks: [
        { type: "paragraph", text: "最好的机器人手不总是看起来最像人手的那种。一些机器人用只有两根手指的简单夹持器，其他的用吸盘，一些用能包裹物体的柔软橡胶手指，一些用磁铁吸附金属零件。" },
        { type: "callout", accent: "green", text: "工程师根据任务选择设计。机器人手应该匹配它试图解决的问题，而不是人手的形状。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "机器人手很难做，因为抓握并不简单。一只有用的手需要运动、力量、轻柔、触感、控制，以及能处理混乱的、软的、滑的或形状奇怪的物体的能力。" },
        { type: "paragraph", text: "人手如此出色，以至于我们忘记了它有多神奇。每次你系鞋带、打开零食包装或接住球，你的手都在做工程师还在努力复制的事情。这就是为什么机器人手是整个机器人技术中最有趣的挑战之一。" },
      ] },
    ],
  },
  "how-factory-robots-build-cars": {
    ...localizedBlogArticles.en["how-factory-robots-build-cars"],
    title: "工厂机器人如何制造汽车？",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    imageAlt: "汽车制造装配线上的机械臂正在焊接和装配车身面板",
    imageCaption: "工厂机器人不是通用的，每条机械臂都被精确编程用于一项特定任务，并一丝不苟地执行数千次。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "汽车是由数千个零件组成的庞大机器：车门、座椅、车轮、玻璃、电线、灯光、发动机或电机，还有许多大多数人从未见过的隐藏零件。制造一辆汽车需要大量工作。" },
        { type: "paragraph", text: "在现代汽车工厂里，机器人帮助完成许多需要速度、力量、精度和重复操作的工作。这些机器人通常不像人，很多看起来像巨大的机械臂，以令人难以置信的精度移动。" },
      ] },
      { title: "工厂机器人擅长重复", blocks: [
        { type: "paragraph", text: "机器人非常擅长一遍又一遍地做同样的任务。这在汽车制造中很有用，因为很多零件需要以完全相同的方式放置、焊接、喷漆或移动。机械臂可以以极小的误差重复一个动作数千次，不会厌倦、不会失去专注，也不会忘记下一步。" },
        { type: "callout", accent: "green", text: "如果一个机器人需要焊接每个车架上的同一个点，它可以每次都精确移动到那个位置，全天持续如此。" },
      ] },
      { title: "焊接车身", blocks: [
        { type: "paragraph", text: "工厂机器人的一项主要工作是焊接——用热量将金属件连接在一起。车身需要坚固且精心组装，机器人焊接臂可以快速准确地移动到人类难以触及的位置。" },
        { type: "paragraph", text: "工程师、技术人员和工人设计、监控、维修、编程并检查机器人系统。机器人做重复的物理动作，但人类确保整个过程正常运作。" },
      ] },
      { title: "精密喷漆", blocks: [
        { type: "paragraph", text: "给汽车喷漆不像往金属上喷颜色那么简单。油漆需要平整、均匀、一致——太多油漆会滴流，太少会造成覆盖不足。工厂机器人常用于喷漆，因为它们可以按照受控的模式移动喷枪，在车门、引擎盖、车顶和其他表面上均匀涂漆。" },
      ] },
      { title: "移动重型零件", blocks: [
        { type: "paragraph", text: "有些汽车零件很重。机器人可以帮助安全地举起、移动和定位这些零件。机械臂可能将车门移入位置，另一个系统可能沿着装配线运送零件。反复举起重型零件对人类来说既疲惫又危险，所以机器人帮助减少劳累，让工厂更安全。" },
      ] },
      { title: "安全与编程", blocks: [
        { type: "paragraph", text: "工厂机器人可能很强大、速度很快，所以安全极其重要。许多工业机器人在带有围栏、传感器和警告灯的安全区域内工作。一些较新的机器人被称为协作机器人，设计有额外的安全功能，能更紧密地与人类一起工作。" },
        { type: "paragraph", text: "工厂机器人不会神奇地知道如何制造汽车，它必须被编程：工程师告诉机器人去哪里移动、多快、何时使用工具、施加多大力，以及出错时该怎么做。汽车工厂可能有机器人、传送带、摄像头、工具和人类工人，全部以精心规划的流程连接在一起。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "工厂机器人通过焊接、喷漆、移动零件和一遍又一遍地精确重复任务来帮助制造汽车。它们通常不是人形的，因为它们是为特定工作设计的——焊接机器人和喷漆机器人看起来不同，因为每项工作需要不同的工具和动作。" },
        { type: "callout", accent: "green", text: "汽车工厂带来的最好工程课是：你不是为了好看而设计机器人，而是为了解决问题。在汽车工厂里，机器人帮助将数千个独立零件变成能在道路上行驶的机器。" },
      ] },
    ],
  },
  "why-is-the-sky-blue-but-sunsets-are-orange": {
    ...localizedBlogArticles.en["why-is-the-sky-blue-but-sunsets-are-orange"],
    title: "天空为什么是蓝色的，日落为什么是橙色的？",
    category: "科学",
    readTime: common.zh.minutes.m4,
    imageAlt: "天空从顶部的深蓝色过渡到日落时地平线附近温暖的橙色和粉红色",
    imageCaption: "白天在天空中散射蓝光的同样大气层，在日落时将更暖色调的光波引导进你的眼睛。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "在晴朗的下午抬头看，天空通常是蓝色的。但如果你在日落时再看，同一片天空可能会发出橙色、红色、粉红色，甚至紫色的光芒。" },
        { type: "paragraph", text: "什么改变了？太阳还是同一个太阳，空气还是同一种空气。但阳光穿越大气层的路径改变了，这带来了巨大的不同。" },
      ] },
      { title: "阳光不只是一种颜色", blocks: [
        { type: "paragraph", text: "尽管阳光在我们眼中看起来是白色或黄色的，但它实际上是由许多颜色混合在一起的。你可以把阳光想象成一道塞进一束光里的彩虹。" },
        { type: "paragraph", text: "那道彩虹包括红、橙、黄、绿、蓝、靛、紫光。每种颜色以波的形式传播：有些颜色波长较长，如红色和橙色；有些颜色波长较短，如蓝色和紫色。这很重要，因为不同颜色的光撞上微小空气粒子时表现不同。" },
      ] },
      { title: "空气并非空无一物", blocks: [
        { type: "paragraph", text: "天空看起来像空旷的空间，但地球大气层充满了微小的分子，这些分子小得看不见，但阳光一直在与它们碰撞。" },
        { type: "paragraph", text: "当光碰撞这些微小空气分子时，部分光会被散射——不是直线传播，而是向许多方向弹射。蓝光比红光或橙光更容易散射，因为蓝光波长更短。" },
        { type: "paragraph", text: "所以白天，当阳光进入大气层时，蓝光被散射到整片天空中，从各个方向进入你的眼睛，这就是为什么整个天空看起来是蓝色的。" },
      ] },
      { title: "那为什么天空不是紫色的？", blocks: [
        { type: "paragraph", text: "紫光比蓝光散射得更多，所以这是个很好的问题。天空通常不是紫色，有几个原因：首先，太阳发出的紫光比蓝光少；其次，一些紫光被大气层上层吸收；第三，我们的眼睛感知蓝光比紫光更强。所以即使紫色也参与其中，蓝色还是赢了。" },
      ] },
      { title: "日落时什么改变了？", blocks: [
        { type: "paragraph", text: "日落时，太阳在天空中很低。这意味着阳光在到达你眼睛之前需要穿越更长的一段大气层。想象把手电筒直接穿过一薄层玻璃水杯，然后再想象从侧面穿过杯子最长的部分——光必须穿过更多的物质。" },
        { type: "paragraph", text: "日落时就是这样。当阳光穿过这段更长的空气路径时，大部分蓝光在到达你之前就被散射掉了。剩下的颜色是波长较长的颜色，如红色、橙色和黄色。这就是为什么日落通常看起来温暖而发光。" },
      ] },
      { title: "为什么有些日落格外绚烂？", blocks: [
        { type: "paragraph", text: "有些日落看起来平淡无奇，另一些看起来像天空在燃烧。区别通常来自空气中漂浮的东西：尘土、水滴、污染、烟雾和云朵都能影响光的散射方式。" },
        { type: "paragraph", text: "云朵也能像巨大的屏幕一样。当太阳低垂时，橙色和红色的光可以照射在云朵底部，让它们发光。这就是为什么日落在暴风雨后或天空中有恰到好处的云层和晴空组合时，看起来特别壮观。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "天空是蓝色的，是因为蓝光在大气层中容易散射。日落是橙色和红色的，是因为阳光穿越更多空气，大部分蓝光被散射掉，留下更暖的颜色。" },
        { type: "callout", accent: "orange", text: "所以下次你看到蓝天或明亮的橙色日落时，你看到的不只是漂亮的颜色，而是阳光与地球大气层的相互作用。" },
      ] },
    ],
  },
  "why-do-your-ears-pop-on-an-airplane": {
    ...localizedBlogArticles.en["why-do-your-ears-pop-on-an-airplane"],
    title: "乘飞机时耳朵为什么会鸣响？",
    category: "科学",
    readTime: common.zh.minutes.m4,
    imageAlt: "从飞机舱内往外看起飞时的视角，说明导致耳朵鸣响的气压变化",
    imageCaption: "当外部气压变化比身体平衡的速度更快时，耳膜会弯曲。这就是起飞和降落时你感到的那种感觉。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "如果你坐过飞机，可能在起飞或降落时感到过耳朵里有奇怪的压力感，然后突然：嘭。" },
        { type: "paragraph", text: "这可能感觉奇怪、烦人，甚至有点不舒服。但你的耳朵没有问题，它们只是在对气压做出反应。" },
      ] },
      { title: "空气有压力", blocks: [
        { type: "paragraph", text: "空气看起来很轻，但它确实会向物体施加压力。你周围的空气一直从各个方向压着你的身体。在海平面，你头上有很多空气，所以气压更高。在天空中更高处，上方的空气更少，所以压力更低。" },
        { type: "paragraph", text: "飞机起飞时，会爬升到气压更低的空气中。降落时，又回到气压更高的空气中。尽管飞机客舱是增压的以保持乘客安全舒适，舱内气压仍然会变化，你的耳朵会注意到这些。" },
      ] },
      { title: "耳膜感受到了差异", blocks: [
        { type: "paragraph", text: "你耳朵里有一层薄薄的组织叫做耳膜，声音碰到它时它会振动，帮助你听到声音。耳膜两侧都有空气：耳朵外面的空气，以及耳膜后面中耳中的空气。" },
        { type: "paragraph", text: "为了让耳朵感觉正常，耳膜两侧的压力需要平衡。当耳外压力迅速变化时，耳膜后面的压力可能不会立刻跟上。这种压差会推或拉耳膜，这就是你感到的那种充满感、堵塞感或不舒服的感觉。" },
      ] },
      { title: "咽鼓管帮助解决问题", blocks: [
        { type: "paragraph", text: "你的身体有一根细小的管子叫做咽鼓管，连接中耳和咽喉后部。大多数时候这根管是关着的，但当你吞咽、打哈欠或咀嚼时，它可以短暂地打开。" },
        { type: "paragraph", text: "当它打开时，空气可以进出中耳，帮助平衡耳膜两侧的压力。你感到的那声鸣响，就是压力突然平衡的瞬间。" },
      ] },
      { title: "为什么降落时感觉比起飞更明显？", blocks: [
        { type: "paragraph", text: "很多人发现降落时耳朵比起飞时更明显。这是因为降落时，随着飞机接近地面，舱内气压升高。中耳需要让更多空气进入以匹配外部压力。" },
        { type: "paragraph", text: "如果咽鼓管不容易打开，耳膜可能会被向内挤压，比起飞时的压力变化更疼。这也是为什么感冒时坐飞机不舒服——如果鼻子和喉咙堵塞，咽鼓管可能更难打开。" },
      ] },
      { title: "为什么吞咽或打哈欠有帮助？", blocks: [
        { type: "paragraph", text: "吞咽和打哈欠会移动咽鼓管附近的肌肉，帮助管道打开。在起飞和降落时嚼口香糖、喝水或打哈欠有助于耳朵调整，因为这些动作鼓励压力平衡系统工作。" },
        { type: "paragraph", text: "婴儿在飞机上经常哭，部分原因是他们感到耳朵压力但不知道如何解决。哭让他们移动喉咙和嘴巴，这实际上可以帮助他们的耳朵通气。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "乘飞机时耳朵会鸣响，是因为飞机爬升或降落时气压发生变化。耳膜感受到差异，咽鼓管帮助平衡压力。" },
        { type: "callout", accent: "orange", text: "那声鸣响是你的身体在做调整。它可能感觉奇怪，但这实际上是一个聪明的内置系统在做它的工作。" },
      ] },
    ],
  },
  "why-does-metal-feel-colder-than-wood": {
    ...localizedBlogArticles.en["why-does-metal-feel-colder-than-wood"],
    title: "金属摸起来为什么比木头更冷？",
    category: "科学",
    readTime: common.zh.minutes.m4,
    imageAlt: "金属物体和木制物体并排放在室温下，说明它们感觉不同，尽管温度相同",
    imageCaption: "同样温度下的金属和木头感觉完全不同，因为金属从你手上传走热量的速度远快于木头。那种感觉是速度，不是温度。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "摸一下金属椅子腿，再摸一下同一房间里的木桌。金属可能感觉冷，而木头感觉温暖。但令人惊讶的是：它们的温度很可能是相同的。" },
        { type: "paragraph", text: "那为什么一个感觉更冷？答案不只是温度，而是热传导。" },
      ] },
      { title: "你的手是温暖的", blocks: [
        { type: "paragraph", text: "你的身体通常比周围的物体更温暖。你的皮肤可能约32°C，而一个房间可能约21°C。当你触摸比你的手更冷的东西时，热量从你的手流向那个物体。" },
        { type: "paragraph", text: "你的神经不只感知物体的温度，还感知热量离开皮肤的速度。如果热量快速离开你的手，物体感觉冷；如果热量缓慢离开，感觉就不那么冷。" },
      ] },
      { title: "金属快速传导热量", blocks: [
        { type: "paragraph", text: "金属是良好的热导体，意味着热量可以轻松穿过它。当你触摸金属时，手上的热量迅速流入金属并从你触摸的点向外扩散。因为热量不断散走，所以更多热量不断从你的手流出，皮肤迅速冷却，所以你的大脑觉得那是冷的。" },
        { type: "paragraph", text: "木头不同。与金属相比，木头是差的热导体，热量不能那么快地穿过它。当你触摸木头时，热量从手上缓慢散失，你手指下的那小块木头稍微变热，热量扩散得不那么快。所以木头感觉温暖，即使它和金属温度相同。" },
      ] },
      { title: "相同温度，不同感受", blocks: [
        { type: "paragraph", text: "这是日常科学中最酷的把戏之一：温度和感觉不总是一回事。放在同一个厨房抽屉里的金属勺和木勺可能处于相同的温度——它们在同一房间里放了很久。但金属勺感觉更冷，因为它从你手上带走热量更快。" },
        { type: "callout", accent: "orange", text: "你的触觉真正感知的是热量的移动。两个相同温度的物体根据它们从皮肤抽走热量的速度，感觉可以完全不同。" },
      ] },
      { title: "这在设计中为什么重要？", blocks: [
        { type: "paragraph", text: "工程师一直在思考热传导。金属锅有用是因为它能快速将热量从炉子传到食物，但这也意味着把手会变热，这就是为什么很多锅有塑料、橡胶或木制把手。" },
        { type: "paragraph", text: "冬季夹克之所以有效，是因为它减慢了热传导——它把空气困住，而空气不擅长传热，这有助于把体热留在身边。阳光下的金属滑梯可能变得很热，因为金属传热快；木制长椅可能感觉更舒适，因为它不那么主动地带走热量。" },
      ] },
      { title: "寒冷天气呢？", blocks: [
        { type: "paragraph", text: "在寒冷天气里，触摸金属可能感觉极其冷，因为它从皮肤抽走热量的速度太快。这就是为什么室外冬天的金属游乐设施、栏杆和工具比木头或塑料感觉冷得多——金属不是神奇地更冷，它只是更擅长从你手上偷走热量。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "金属摸起来比木头冷，是因为金属传热更快。触摸金属时，热量迅速从手上流走，皮肤快速冷却；木头传热更慢，所以感觉更温暖。所以当你说某样东西感觉冷时，你通常是在感知热量移动的速度，而不只是物体的温度。" },
      ] },
    ],
  },
  "why-do-bikes-stay-balanced-when-moving": {
    ...localizedBlogArticles.en["why-do-bikes-stay-balanced-when-moving"],
    title: "自行车移动时为什么能保持平衡？",
    category: "科学",
    readTime: common.zh.minutes.m5,
    imageAlt: "一个人骑着自行车在移动，展示让两个轮子在运动中保持稳定的平衡和物理原理",
    imageCaption: "移动的自行车能抵抗倾倒，是因为陀螺力、转向几何形状和你大脑不断做出的微小修正，这一切都在无形中协同工作。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "自行车看起来应该会倒。它有两个细轮子、一个窄框架，没有太多东西支撑它竖立。如果你试着站在原地骑自行车，很难保持平衡。但一旦自行车开始移动，就变得容易多了。" },
        { type: "paragraph", text: "那为什么移动的自行车能保持平衡？答案不是一个单一的技巧，而是运动、转向、设计和你的大脑做出微小修正的综合作用。" },
      ] },
      { title: "平衡是把重心保持在轮子上方", blocks: [
        { type: "paragraph", text: "每个物体都有重心，也就是重量平衡的点。对于自行车和骑手来说，要保持直立，它们合并后的重心需要保持在轮子正上方。如果重心偏向一侧太多，自行车就开始倾斜。" },
        { type: "paragraph", text: "自行车静止时很难纠正倾斜——你必须扭动车把、移动身体或把脚放下。但自行车移动时，转向可以帮助把轮子带回到你的正下方。" },
      ] },
      { title: "自行车向倾斜方向转向", blocks: [
        { type: "paragraph", text: "奇怪的地方在这里：当自行车开始倾斜时，前轮可以稍微向倾斜的方向转。如果自行车向左倾，前轮可以向左转，这把自行车的行进路线移到骑手下方，帮助恢复平衡。" },
        { type: "paragraph", text: "这是为什么自行车在滚动时感觉更稳定的原因之一。骑手也会不自觉地这样做——你骑车时一直在做微小的转向调整，大多数微小到你注意不到。你的大脑、手臂和身体协同工作，把自行车保持在你下方。" },
      ] },
      { title: "轮子也有帮助", blocks: [
        { type: "paragraph", text: "骑车时车轮会旋转，旋转的轮子有角动量，意味着它们倾向于保持在同一方向旋转。这能帮助自行车感觉更稳定，但这不是全部解释——即使轮子效应很小，自行车仍然可以保持平衡。自行车的形状和设计也很重要。" },
      ] },
      { title: "自行车设计让平衡更容易", blocks: [
        { type: "paragraph", text: "自行车前叉是倾斜的，而不是垂直的。这产生了一种叫做拖距的效果，帮助前轮自然地跟随运动方向。这个设计的思路很简单：自行车被设计成前轮趋向于以有益的方式对齐，让转向更顺畅，帮助自行车修正小幅摇摆。" },
        { type: "paragraph", text: "工程师非常关注这一点。前叉角度或轮子大小的微小变化，可以让自行车感觉稳定、敏感、迟钝或顺畅。" },
      ] },
      { title: "为什么慢骑更难？", blocks: [
        { type: "paragraph", text: "骑得慢时，你没有太多时间和运动来修正倾斜。自行车反应不那么顺畅，小幅摇摆感觉更大。这就是为什么骑得非常慢地走直线比以正常速度骑更难，也是为什么初学者在稍微骑快一点后通常感觉更稳定。" },
      ] },
      { title: "自行车为什么不能自己站立？", blocks: [
        { type: "paragraph", text: "自行车静止时，无法自己转向把自己带回到骑手下方。如果开始倾斜，重力会把它越拉越倾。没有运动，轮子就没有简单的方法移动到重心下方。所以自行车就会倒，除非有东西支撑它——比如支架、墙、骑手的脚或辅助轮。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "自行车移动时保持平衡，是因为转向、运动、旋转的车轮、自行车设计和骑手修正都协同工作。" },
        { type: "callout", accent: "orange", text: "自行车不是靠魔法保持直立，它在不断修正自身，你也是。这就是为什么一旦骑起来，感觉如此顺畅。" },
      ] },
    ],
  },
  "why-do-we-slip-on-ice": {
    ...localizedBlogArticles.en["why-do-we-slip-on-ice"],
    title: "我们为什么会在冰上滑倒？",
    category: "科学",
    readTime: common.zh.minutes.m4,
    imageAlt: "冰面的特写，展示其光滑、玻璃状的纹理，大大降低了脚下的摩擦力",
    imageCaption: "冰很滑，是因为表面有一层薄薄的准液态层，摩擦力几乎为零，鞋子几乎无处可抓。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "走人行道很容易，走在冰上却不行。一瞬间你还好好的，下一瞬间脚向前滑，双臂飞起，你在努力不摔倒。" },
        { type: "paragraph", text: "那为什么冰这么滑？答案涉及摩擦力、表面、温度，以及你的鞋和冰之间发生的事情。" },
      ] },
      { title: "摩擦力帮助你走路", blocks: [
        { type: "paragraph", text: "摩擦力是一种阻止滑动的力。走路时，你的脚向后推地面，摩擦力推着你向前。没有足够的摩擦力，你的脚就会滑而不是抓地。" },
        { type: "paragraph", text: "这就是为什么在干燥的路面上走路感觉容易：粗糙的表面给你的鞋子抓住的地方。冰比路面光滑得多，所以抓地力更少。" },
      ] },
      { title: "冰的表面很滑", blocks: [
        { type: "paragraph", text: "冰看起来是固体，但其表面可能以奇特的方式表现。在很多条件下，冰的顶部可能有一层极薄的水。那层薄薄的水可以让表面更滑。" },
        { type: "paragraph", text: "你的鞋子不只是触碰粗糙的固体地面，可能是在滑过光滑的冰面，中间还有一点点水，像机器里的润滑油一样减少摩擦。" },
      ] },
      { title: "温度很重要", blocks: [
        { type: "paragraph", text: "不是所有冰都一样滑。接近融点的冰通常非常滑，因为表面更容易形成那层薄薄的液态层。极冷的冰有时可能不那么滑，因为表面的液态水更少，感觉更干燥、更硬脆。" },
        { type: "paragraph", text: "这不意味着极冷的冰是安全的，它仍然可能很滑。但温度会改变表面的表现。" },
      ] },
      { title: "鞋子也很重要", blocks: [
        { type: "paragraph", text: "不同的鞋子抓地效果不同。底部平坦光滑的鞋子没有太多东西可以抓。花纹较深的鞋子能更好地抓住雪或不平坦的表面，这就是为什么冬季靴子通常有有纹理的底部——图案有助于产生更多摩擦。但即使是好鞋子，在非常光滑的冰上也可能打滑，因为鞋底可能没有足够的粗糙度可以抓。" },
      ] },
      { title: "为什么我们滑得那么快？", blocks: [
        { type: "paragraph", text: "当摩擦力很低时，没有太多力量阻止你的脚移动。在路面上，如果你的脚开始滑，摩擦力很快把它减慢。在冰上，摩擦力更弱，所以脚会一直滑。这就是为什么一点点失去平衡就会变成一个大滑。" },
      ] },
      { title: "冰是一个设计挑战", blocks: [
        { type: "paragraph", text: "工程师和城市规划者一直在考虑滑滑的表面。道路、人行道、轮胎、鞋子和运动器材都需要应对摩擦力问题。盐可以帮助融冰，沙子可以增加粗糙度，轮胎花纹帮助汽车推开水和雪浆。目标始终相同：增加抓地力。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "我们在冰上滑倒，是因为冰的摩擦力很低——光滑的表面、可能存在的薄薄液态层、温度，以及我们穿的鞋子，都影响我们能获得多少抓地力。" },
        { type: "callout", accent: "orange", text: "走路比大多数人意识到的更依赖摩擦力。每一步都是你的鞋子和地面之间微小的团队协作时刻。" },
      ] },
    ],
  },
  "how-do-noise-canceling-headphones-work": {
    ...localizedBlogArticles.en["how-do-noise-canceling-headphones-work"],
    title: "降噪耳机如何工作？",
    category: "科学",
    readTime: common.zh.minutes.m5,
    imageAlt: "一副降噪耳机，带有图表显示反噪声波如何抵消传入的声波",
    imageCaption: "降噪耳机用麦克风检测传入的声音，然后播放完全相反的声波，在声音到达耳朵之前将其抵消。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "降噪耳机可以让嘈杂的飞机舱、公交车乘坐或繁忙的房间感觉安静很多。但它们不只是靠更厚的耳垫制造安静，一些耳机用科学来以声抗声。" },
        { type: "paragraph", text: "这听起来不可能，但它有效，因为声音以波的形式传播。" },
      ] },
      { title: "声音是一种波", blocks: [
        { type: "paragraph", text: "声音发生在空气振动时。有人说话时，声带振动，那些振动推拉空气，产生声波。声波传到你的耳朵，你的大脑把它们转化成声音。" },
        { type: "paragraph", text: "声波有高点和低点，你可以把它想象成穿过空气移动的弯曲线条。响亮的声音有更大的波，安静的声音有更小的波。" },
      ] },
      { title: "相反的波可以相互抵消", blocks: [
        { type: "paragraph", text: "关键思路是：波可以叠加，但也可以相互抵消。如果一个波在同一时刻向前推动空气，而另一个波向后拉动空气，两个波可以部分抵消。" },
        { type: "paragraph", text: "降噪耳机用的就是这个原理，它们尝试创建一个与不想要的噪音相匹配的反向声波。当不想要的声音和反向声音相遇时，它们相互减弱，这叫做相消干涉。" },
      ] },
      { title: "耳机先在倾听", blocks: [
        { type: "paragraph", text: "降噪耳机有小型麦克风，这些麦克风倾听你周围的噪音——比如飞机发动机的嗡嗡声或火车的隆隆声。然后耳机的电子装置迅速分析那个声音，创建一个匹配的反向波，耳机内部的扬声器在你耳朵附近播放那个反向波。" },
        { type: "paragraph", text: "你的耳朵接收到的原始噪音变少了，因为一部分已经被抵消了。" },
      ] },
      { title: "为什么它对稳定的声音效果最好", blocks: [
        { type: "paragraph", text: "降噪对稳定的、重复的声音效果特别好，比如飞机发动机声、空调声、风扇声和火车隆隆声。这些声音对耳机来说更容易预测和抵消，因为它们变化不那么突然。" },
        { type: "paragraph", text: "尖锐或随机的声音更难处理。狗叫声、拍手声或突然喊叫声变化太快，耳机可能会稍微减弱它，但通常无法完全消除。这就是为什么降噪耳机让世界更安静，而不是完全寂静。" },
      ] },
      { title: "被动降噪与主动降噪", blocks: [
        { type: "paragraph", text: "耳机减少噪音有两种方式：被动降噪来自物理阻挡声音——厚厚的耳垫可以阻止一些外部噪音进入；主动降噪使用麦克风和反向声波。很多耳机两者兼用：耳垫阻挡一些声音，电子装置抵消一些声音。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "降噪耳机通过倾听外部噪音、创建反向声波、并通过微型扬声器播放来工作。当声波相遇时，一些噪音被抵消了。" },
        { type: "callout", accent: "orange", text: "它们不是魔法耳罩，而是坐在你头上的微型声波工程师。" },
      ] },
    ],
  },
  "why-do-some-things-float-and-others-sink": {
    ...localizedBlogArticles.en["why-do-some-things-float-and-others-sink"],
    title: "为什么有些东西会浮起来，有些会沉下去？",
    category: "科学",
    readTime: common.zh.minutes.m4,
    imageAlt: "学生在 Avanza STEM 科学工作坊进行浮力和水的实验",
    imageCaption: "漂浮不只关乎重量，而是关乎重力、形状，以及水被推开了多少。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "石头沉，沙滩球浮，巨大的钢铁船也浮——尽管钢铁比水重得多。那么是什么决定了东西是浮是沉呢？" },
        { type: "paragraph", text: "答案是浮力。" },
      ] },
      { title: "水向上推", blocks: [
        { type: "paragraph", text: "当你把东西放入水中时，水会向上推它。这个向上的推力叫做浮力。同时，重力向下拉着物体。如果向上的浮力足以平衡物体的重量，物体就浮起来；如果重力赢了，物体就沉下去。" },
      ] },
      { title: "物体把水推开", blocks: [
        { type: "paragraph", text: "物体进入水中时，它占据了空间。原来在那个空间的水被推到旁边，这叫做排水。物体排开的水越多，向上的浮力就越大。这就是为什么形状如此重要。" },
      ] },
      { title: "密度是一个重要线索", blocks: [
        { type: "paragraph", text: "密度是指在一定空间内塞了多少物质。石头密度大，因为大量物质被塞在很小的空间里。泡沫球密度小，因为内部有大量空气。如果物体的密度比水大，它通常会沉；如果比水小，它通常会浮。但形状可以改变这个故事。" },
      ] },
      { title: "钢铁船为什么能浮起来？", blocks: [
        { type: "paragraph", text: "钢铁的密度比水大。实心钢铁球会沉。但船不是实心的钢铁块，它有一个内部充满空气的大型形状。由于那种形状，船将重量分散在大面积上，排开了大量的水。" },
        { type: "paragraph", text: "船的整体平均密度——包括内部的空气——比水的密度小，这让它能浮起来。如果水涌入船中，空气空间被填满，船整体变得更密，就可能沉没。" },
      ] },
      { title: "为什么船有宽底部？", blocks: [
        { type: "paragraph", text: "船被设计成能推开足够多的水。更宽的船体帮助船排开更多的水，更多的排水量意味着更大的浮力。这就是为什么独木舟、货船和游轮都有围绕浮力设计的形状，尽管它们看起来非常不同。工程师在设计任何能浮的东西时，都必须仔细考虑重量、形状、平衡和材料。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "当来自水的向上浮力能平衡物体的重量时，物体就浮起来。密度很重要，但形状也很重要。" },
        { type: "callout", accent: "orange", text: "小石头沉，因为它密度大，排开的水不够多。巨大的船浮，因为它的形状让它能推开足够多的水来支撑自身重量。漂浮不关乎重量轻，而是关乎重量、空间、形状和水的反推力。" },
      ] },
    ],
  },
  "why-do-magnets-stick-to-some-metals-but-not-others": {
    ...localizedBlogArticles.en["why-do-magnets-stick-to-some-metals-but-not-others"],
    title: "磁铁为什么粘在某些金属上但不粘其他金属？",
    category: "科学",
    readTime: common.zh.minutes.m5,
    imageAlt: "一块磁铁吸引铁屑，铁屑排列成从磁极发出的不可见磁力线的形状",
    imageCaption: "磁铁粘在铁和钢上，是因为这些金属内部微小的磁畴与外部磁场对齐。在铜或铝中，这不会发生。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "磁铁乍一看很简单：粘在冰箱上，吸住回形针，吸附在某些金属表面。但当你试着把它贴到铝箔、铜硬币或汽水罐上时，什么都没发生。那为什么磁铁粘在某些金属上却不粘其他金属呢？" },
        { type: "paragraph", text: "答案来自材料内部的微小粒子。" },
      ] },
      { title: "磁铁有看不见的磁场", blocks: [
        { type: "paragraph", text: "磁铁在自己周围产生一个看不见的磁场。你不能直接看到磁场，但能看到它做什么：可以把某些物体拉近，或让另一块磁铁旋转。磁场在磁铁的磁极——通常称为南极和北极——附近最强。" },
        { type: "paragraph", text: "异名磁极相吸，同名磁极相斥。这就是为什么磁铁的一面可以把另一块磁铁拉近，而另一面则把它推开。" },
      ] },
      { title: "并非所有金属都有磁性", blocks: [
        { type: "paragraph", text: "很多人认为金属就自动有磁性，但这不对。铁的磁性很强，钢通常有磁性因为含有铁，镍和钴也有磁性。但很多常见金属对普通磁铁并没有强烈吸引力：铝、铜、金、银和黄铜通常不粘磁铁，它们仍然是金属，只是没有正确的磁性行为。" },
      ] },
      { title: "微小的磁性区域", blocks: [
        { type: "paragraph", text: "在有磁性的材料内部，有微小的区域叫做磁畴。你可以把磁畴想象成一群微小的箭头，每个箭头指向一个磁性方向。在普通的铁块中，这些箭头指向不同方向，所以它们的效果部分相互抵消。" },
        { type: "paragraph", text: "但当磁铁靠近时，许多磁畴可以对齐。当足够多的磁畴指向同一方向时，材料就被磁铁吸引。这就是为什么回形针可以粘在磁铁上——磁铁帮助金属内部微小的磁性区域对齐。" },
      ] },
      { title: "铜为什么不粘磁铁？", blocks: [
        { type: "paragraph", text: "铜和铁一样有电子，但它微小的磁性效应不会像铁那样强烈地对齐。铜的结构不允许它像铁一样变得强有磁性。所以普通的冰箱磁铁不会粘在铜上，同样的基本原理也适用于铝、金和许多其他金属——它们的内部结构不会产生强烈的磁吸引力。" },
      ] },
      { title: "钢怎么样？", blocks: [
        { type: "paragraph", text: "钢主要是铁和其他元素的混合物，通常含有碳。因为含有铁，很多类型的钢都有磁性。但不是所有的钢行为都相同，一些不锈钢磁性很弱，因为它们的内部结构不同。这就是为什么磁铁可能强力粘在一个金属物体上，却几乎不粘另一个，即使两者看起来都是钢。" },
      ] },
      { title: "磁铁有用是因为它们有选择性", blocks: [
        { type: "paragraph", text: "磁铁粘在某些金属上而不粘其他金属，这个事实实际上很有用。回收中心用磁铁把铁和钢从其他材料中分离出来，电动机用磁性产生运动，扬声器用磁铁把电信号转化成声音，指南针用地球磁场指向北方。磁性不只是冰箱上的小把戏，它是许多机器工作原理的一部分。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "磁铁粘在某些金属上，是因为那些金属有微小的磁性区域，可以与磁场对齐。铁、钢、镍和钴强烈被磁铁吸引。铜和铝不会，因为它们的内部结构不能以同样的方式对齐。" },
        { type: "callout", accent: "orange", text: "所以当磁铁拒绝粘在一个金属物体上时，磁铁没有坏——只是那种金属不是有磁性的那种。" },
      ] },
    ],
  },
}
