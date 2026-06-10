export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "paragraphWithLink"; before: string; linkText: string; href: string; after: string }
  | { type: "list"; items: string[] }
  | { type: "numbered"; items: { title: string; body: string }[] }
  | { type: "callout"; text: string; title?: string; accent?: "green" | "orange" | "purple" | "teal" }
  | { type: "code"; title?: string; code: string; accent?: "green" | "orange" | "purple" | "teal" }
  | { type: "experiments"; items: Experiment[] }
  | { type: "games"; items: MathGame[] }

export type BlogSection = {
  title: string
  blocks: BlogBlock[]
}

export type BlogArticle = {
  title: string
  category: string
  categoryColor: string
  date: string
  readTime: string
  author: string
  image: string
  imageAlt: string
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
    author: "Liam Salcedo",
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
    author: "Liam Salcedo",
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
    author: "Liam Salcedo",
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
      author: common.en.author,
      image: "/images/blog/featured-coding.jpg",
      imageAlt: "A child learning to code on a laptop",
      sections: [
        {
          title: "",
          blocks: [
            { type: "paragraph", text: "Coding is not just for tech professionals anymore. In 2026, understanding the logic behind code is becoming as foundational as reading and writing, yet many kids still never write a single line." },
            { type: "paragraph", text: "At Avanza STEM, we see how powerful it is when a student writes their first program and watches it run. That moment is not just excitement; it is the realization that they can build things." },
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
          ],
        },
        {
          title: "The Bigger Picture",
          blocks: [
            { type: "paragraph", text: "Hispanic students are underrepresented in computer science because of access, exposure, and encouragement, not ability." },
            { type: "paragraph", text: "Avanza STEM is about opening doors that should have been open all along." },
            { type: "callout", accent: "teal", text: "If your child wants to try a free in-person coding workshop, check our workshops page for upcoming sessions. All materials are provided and no experience is required." },
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
      author: common.en.author,
      image: "/images/blog/egg-experiment.jpg",
      imageAlt: "Children doing a science experiment at home",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You do not need a lab coat or expensive equipment to do real science. Many of the best experiments for kids use household items like vinegar, paper towels, and sparkling water." },
          { type: "paragraph", text: "Each experiment includes materials, steps, and a plain-language explanation so you can talk about what your child observed." },
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
          { type: "callout", accent: "teal", text: "Our workshops include experiments like these plus guided discussion that helps students understand the science behind the reactions." },
        ] },
      ],
    },
    "how-to-build-the-strongest-popsicle-stick-bridge": {
      title: "How to Build the Strongest Popsicle Stick Bridge",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.feb10,
      readTime: common.en.minutes.m6,
      author: common.en.author,
      image: "/images/blog/bridge-build.jpg",
      imageAlt: "A popsicle stick bridge being constructed",
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
      author: common.en.author,
      image: "/images/shared/lego-robotics.jpeg",
      imageAlt: "Children building a LEGO robotics project",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "LEGO robotics introduces engineering and programming at the same time. Students can see motors spin, sensors react, and code affect the real world." },
          { type: "paragraph", text: "The product ecosystem can be confusing, so this guide explains what to choose and how to support your child." },
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
        ] },
        { title: "Beyond the Kit", blocks: [
          { type: "paragraph", text: "FIRST LEGO League is a natural next step for students ready for a team challenge." },
          { type: "callout", accent: "green", text: "At our robotics workshops, students build and program their first robot from scratch. No experience is needed." },
        ] },
      ],
    },
    "what-is-ai-explaining-to-kids": {
      title: "What is AI? Explaining Artificial Intelligence to Kids",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      date: common.en.dates.jan28,
      readTime: common.en.minutes.m4,
      author: common.en.author,
      image: "/images/shared/ai-workshop.jpg",
      imageAlt: "Kids exploring AI concepts in a workshop setting",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "AI already recommends videos, shapes social feeds, powers voice assistants, and filters email. Most kids use it long before they understand it." },
          { type: "paragraph", text: "Understanding AI is a form of literacy. Students should learn to ask what data a system learned from and whose perspective may be missing." },
        ] },
        { title: "Start With What Kids Already Know", blocks: [
          { type: "callout", accent: "teal", text: "When Spotify adds a new song to your playlist, how do you think it chose that song?" },
          { type: "paragraph", text: "That conversation leads naturally to pattern-finding, which is the core idea behind many AI systems." },
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
        ] },
        { title: "Responsible AI: The Part Most Tutorials Skip", blocks: [
          { type: "paragraph", text: "Kids need more than tool tips. They need to know when to verify AI output, when not to rely on it, and who is responsible when systems cause harm." },
        ] },
      ],
    },
    "math-games-that-make-learning-fun": {
      title: "Math Games That Make Learning Fun",
      category: "Math",
      categoryColor: "bg-avanza-orange",
      date: common.en.dates.jan20,
      readTime: common.en.minutes.m3,
      author: common.en.author,
      image: "/images/blog/abacus.jpg",
      imageAlt: "Math manipulatives and learning tools for kids",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Math anxiety often starts when math feels like worksheets, timed tests, and red marks. Games make the same skills feel playful." },
          { type: "paragraph", text: "These games are designed for grades 2 through 5 and require minimal materials." },
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
          { type: "list", items: ["Start with games your child already likes", "Play alongside them", "Let them win sometimes early on", "Ask what they think before correcting", "End while they still want to continue"] },
        ] },
      ],
    },
    "building-a-community-stem-workshops": {
      title: "Building a Community: How Local STEM Workshops Change Lives",
      category: "Community",
      categoryColor: "bg-avanza-purple",
      date: common.en.dates.jan12,
      readTime: common.en.minutes.m7,
      author: common.en.author,
      image: "/images/blog/community-workshop.jpg",
      imageAlt: "Students at a community STEM workshop",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "The hardest part of starting Avanza STEM was believing that showing up to a library with materials and a laptop could matter." },
          { type: "paragraph", text: "After programs at Clifton Public Library and Allwood Branch Library, the answer is clear: it matters because students see that STEM belongs to them too." },
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
          { type: "callout", accent: "purple", text: "Check our workshops page for upcoming sessions, or reach out if you want to bring a program to your community." },
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
    title: "Por Que Todo Nino Deberia Aprender a Programar (Y Como Empezar)",
    category: "Programacion",
    date: common.es.dates.feb20,
    readTime: common.es.minutes.m5,
    imageAlt: "Un nino aprendiendo a programar en una laptop",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "Programar ya no es solo para profesionales de tecnologia. Entender la logica del codigo se esta volviendo tan basico como leer y escribir." }, { type: "paragraph", text: "Cuando un estudiante ejecuta su primer programa, descubre que puede construir cosas. Ese momento cambia la forma en que se ve a si mismo." }] },
      { title: "No Se Trata Solo De Codigo", blocks: [{ type: "paragraph", text: "El valor real esta en los patrones de pensamiento que desarrolla:" }, { type: "list", items: ["Dividir problemas grandes en partes pequenas", "Reconocer patrones", "Enfocarse en lo importante", "Probar ideas, encontrar errores y corregirlos"] }, { type: "paragraph", text: "Estas habilidades sirven para ingenieria, ciencia, escritura, emprendimiento y la vida diaria." }] },
      { title: "Cual Es La Mejor Edad Para Empezar?", blocks: [{ type: "numbered", items: [{ title: "5-7 anos: logica visual y sin pantalla", body: "Juegos y apps como ScratchJr ensenan secuencias." }, { title: "8-11 anos: bloques", body: "Scratch permite crear juegos y animaciones sin preocuparse por escribir sintaxis." }, { title: "12+ anos: lenguajes de texto", body: "Python es legible, util y un gran primer lenguaje real." }] }] },
      { title: "Como Empezar En Casa", blocks: [{ type: "list", items: ["Crear una cuenta gratuita de Scratch", "Ver un tutorial corto juntos", "Pedir que expliquen su programa", "Dejar que se equivoquen y depuren", "Celebrar lo que construyen"] }] },
      { title: "Un Primer Programa En Python", blocks: [{ type: "paragraph", text: "Si tu hijo esta listo para escribir codigo, abre Replit o Trinket y prueba esto:" }, { type: "code", title: "Prueba Esto", accent: "green", code: "nombre = input(\"Como te llamas? \")\nprint(\"Hola, \" + nombre + \"! Bienvenido a programar.\")" }, { type: "paragraph", text: "Es un programa real: recibe informacion y responde. Desde ahi se pueden agregar mas preguntas." }] },
      { title: "La Imagen Completa", blocks: [{ type: "paragraph", text: "Los estudiantes hispanos estan subrepresentados en computacion por acceso y exposicion, no por capacidad." }, { type: "callout", accent: "teal", text: "Si tu hijo quiere probar un taller gratuito de programacion, revisa nuestra pagina de talleres." }] },
    ],
  },
  "5-easy-science-experiments": {
    ...localizedBlogArticles.en["5-easy-science-experiments"],
    title: "5 Experimentos de Ciencia Faciles Para Hacer En Casa",
    category: "Ciencia",
    date: common.es.dates.feb15,
    imageAlt: "Ninos haciendo un experimento de ciencia en casa",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "No necesitas bata ni equipo caro para hacer ciencia real. Muchos experimentos usan materiales comunes como vinagre, papel y agua con gas." }, { type: "paragraph", text: "Cada actividad incluye materiales, pasos y una explicacion sencilla para hablar sobre lo que observaron." }] },
      { title: "", blocks: [{ type: "experiments", items: [
        { number: 1, title: "Volcan de Bicarbonato y Vinagre", category: "Quimica", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["1/2 taza de bicarbonato", "1 taza de vinagre blanco", "Jabon para platos", "Colorante opcional", "Un vaso o recipiente"], steps: ["Pon bicarbonato en el recipiente.", "Agrega jabon y colorante.", "Vierte el vinagre y retrocede.", "Observa la espuma."], science: "El bicarbonato y el vinagre producen dioxido de carbono. El jabon atrapa las burbujas y forma espuma." },
        { number: 2, title: "Pasas Bailarinas", category: "Fisica", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Un vaso transparente", "Agua con gas o refresco claro", "Unas pasas"], steps: ["Llena el vaso con agua con gas.", "Agrega pasas.", "Observa varios minutos."], science: "Las burbujas se pegan a las pasas, las suben, revientan y las dejan caer otra vez." },
        { number: 3, title: "Lampara de Lava Casera", category: "Quimica y fisica", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Botella transparente", "Aceite vegetal", "Agua", "Tableta efervescente", "Colorante"], steps: ["Llena casi todo con aceite.", "Agrega agua y colorante.", "Pon un pedazo de tableta."], science: "El aceite y el agua no se mezclan. Las burbujas llevan gotas de agua coloreada hacia arriba." },
        { number: 4, title: "Cromatografia Con Papel", category: "Quimica", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Papel toalla o filtro", "Marcadores lavables", "Agua", "Tijeras"], steps: ["Corta una tira.", "Dibuja un punto de marcador.", "Mete solo la punta en agua.", "Mira como se separan los colores."], science: "La tinta mezcla pigmentos. El agua los mueve a distintas velocidades y aparecen bandas de color." },
        { number: 5, title: "Huevo En Una Botella", category: "Fisica", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Huevo duro pelado", "Botella de vidrio", "Papel pequeno", "Fosforos con supervision adulta"], steps: ["Enciende el papel y ponlo en la botella.", "Coloca el huevo arriba.", "Observa la presion del aire."], science: "El aire caliente se expande y luego se enfria. La presion exterior empuja el huevo hacia adentro." },
      ] }] },
      { title: "Hacer Que Se Quede", blocks: [{ type: "paragraph", text: "Despues de cada experimento, pide un dibujo y una frase sobre lo que paso. Explicarlo refuerza el aprendizaje." }, { type: "callout", accent: "teal", text: "Nuestros talleres incluyen experimentos como estos y conversacion guiada sobre la ciencia detras de las reacciones." }] },
    ],
  },
  "how-to-build-the-strongest-popsicle-stick-bridge": {
    ...localizedBlogArticles.en["how-to-build-the-strongest-popsicle-stick-bridge"],
    title: "Como Construir El Puente De Palitos Mas Fuerte",
    category: "Ingenieria",
    date: common.es.dates.feb10,
    imageAlt: "Un puente de palitos en construccion",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "La fuerza de un puente depende de geometria, distribucion de carga y calidad de uniones, no solo de usar mas palitos o mas pegamento." }, { type: "paragraphWithLink", before: "Para la guia completa de construccion, visita nuestra ", linkText: "pagina detallada del proyecto", href: "/projects/popsicle-stick-bridge", after: "." }] },
      { title: "Por Que Los Triangulos Ganan", blocks: [{ type: "paragraph", text: "Los cuadrados se deforman; los triangulos mantienen su forma. Por eso las celosias usan triangulos conectados." }, { type: "callout", title: "Idea Clave", accent: "purple", text: "Un cuadrado con una diagonal se convierte en dos triangulos y soporta mucho mas peso." }] },
      { title: "Entender Los Caminos De Carga", blocks: [{ type: "list", items: ["El tablero reparte el peso", "Las celosias llevan fuerza a los soportes", "Abajo hay tension", "Arriba hay compresion", "Las diagonales transfieren fuerza"] }] },
      { title: "Cinco Diferencias Entre Puentes Fuertes Y Debiles", blocks: [{ type: "numbered", items: [{ title: "Uniones consistentes", body: "El pegamento debe curar bien." }, { title: "Dos celosias iguales", body: "Si una es distinta, falla primero." }, { title: "Refuerzo lateral superior", body: "Evita que los lados se abran." }, { title: "Buen tablero", body: "Distribuye la carga entre ambos lados." }, { title: "Triangulos escalonados", body: "Crean un camino continuo para la fuerza." }] }] },
      { title: "Errores Comunes", blocks: [{ type: "list", items: ["Demasiado pegamento", "Construir ambos lados sin plantilla", "Omitir refuerzos laterales", "Probar antes de que seque", "Agregar palitos al azar"] }] },
      { title: "El Desafio Peso-Resistencia", blocks: [{ type: "paragraph", text: "Divide el peso que soporta el puente entre el peso del puente. Esa relacion es la verdadera puntuacion de ingenieria." }, { type: "callout", accent: "purple", text: "En nuestro taller, los estudiantes compiten por la mejor relacion resistencia-peso." }] },
    ],
  },
  "getting-started-with-lego-robotics": {
    ...localizedBlogArticles.en["getting-started-with-lego-robotics"],
    title: "Comenzando Con Robotica LEGO: Guia Para Padres",
    category: "Robotica",
    date: common.es.dates.feb5,
    imageAlt: "Ninos construyendo un proyecto de robotica LEGO",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "La robotica LEGO combina ingenieria y programacion. Los estudiantes ven motores moverse, sensores reaccionar y codigo afectar el mundo real." }, { type: "paragraph", text: "Esta guia ayuda a elegir un kit y acompanar a tu hijo." }] },
      { title: "Por Que Es Diferente Del LEGO Normal", blocks: [{ type: "paragraph", text: "Un modelo normal es estatico. Un robot se mueve, siente y responde con un hub programable." }, { type: "callout", title: "La Gran Idea", accent: "green", text: "La robotica convierte el error en un acertijo para resolver." }] },
      { title: "Que Kit Conviene?", blocks: [{ type: "numbered", items: [{ title: "SPIKE Essential (6-10)", body: "Guiado y con bloques para principiantes pequenos." }, { title: "SPIKE Prime (10-14)", body: "Mas sensores, motores y proyectos avanzados." }, { title: "Mindstorms Robot Inventor", body: "Descontinuado, pero flexible si encuentras buena oferta." }] }] },
      { title: "Que Aprende Tu Hijo", blocks: [{ type: "list", items: ["Mecanica basica", "Logica de sensores", "Programacion condicional", "Diseno iterativo", "Trabajo en equipo"] }] },
      { title: "Consejos Para Padres Que No Son Ingenieros", blocks: [{ type: "paragraph", text: "No necesitas saber todas las respuestas. Haz buenas preguntas." }, { type: "list", items: ["Que querias que hiciera?", "Que paso en cambio?", "Que cambiarias primero?", "Puedes hacerlo diferente?"] }] },
      { title: "Primeros Proyectos", blocks: [{ type: "numbered", items: [{ title: "Seguidor de linea", body: "Usa sensor de color para seguir una linea." }, { title: "Evita obstaculos", body: "Usa sensor de distancia para girar." }, { title: "Control remoto", body: "Maneja primero y luego recrea con codigo." }, { title: "Clasificadora", body: "Ordena objetos por color." }] }] },
      { title: "Mas Alla Del Kit", blocks: [{ type: "paragraph", text: "FIRST LEGO League es un siguiente paso natural para estudiantes listos para trabajar en equipo." }, { type: "callout", accent: "green", text: "En nuestros talleres, los estudiantes construyen y programan su primer robot desde cero." }] },
    ],
  },
  "what-is-ai-explaining-to-kids": {
    ...localizedBlogArticles.en["what-is-ai-explaining-to-kids"],
    title: "Que Es La IA? Explicando Inteligencia Artificial A Los Ninos",
    category: "IA",
    date: common.es.dates.jan28,
    imageAlt: "Ninos explorando conceptos de IA en un taller",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "La IA recomienda videos, organiza redes sociales, impulsa asistentes de voz y filtra correos. Los ninos la usan antes de entenderla." }, { type: "paragraph", text: "Entender IA es alfabetizacion moderna: hay que preguntar con que datos aprendio y que perspectivas faltan." }] },
      { title: "Empieza Con Lo Que Ya Conocen", blocks: [{ type: "callout", accent: "teal", text: "Cuando Spotify agrega una cancion nueva a tu lista, como crees que la eligio?" }, { type: "paragraph", text: "Esa pregunta abre la puerta a la idea de encontrar patrones." }] },
      { title: "Como Aprende La IA", blocks: [{ type: "paragraph", text: "La IA aprende con ejemplos, como un nino aprende a reconocer perros despues de ver muchos perros." }, { type: "callout", title: "Termino Tecnico", accent: "green", text: "Esto se llama aprendizaje supervisado: los ejemplos de entrenamiento tienen respuestas correctas." }] },
      { title: "Tipos De IA Para Explicar", blocks: [{ type: "numbered", items: [{ title: "Reconocimiento de imagenes", body: "Desbloqueo facial y etiquetas de fotos." }, { title: "Recomendaciones", body: "Netflix, Spotify, YouTube y redes sociales." }, { title: "Modelos de lenguaje", body: "Generan texto prediciendo patrones de palabras." }, { title: "IA de juegos", body: "Mejora jugando y aprendiendo resultados." }] }] },
      { title: "Lo Que La IA No Puede Hacer", blocks: [{ type: "list", items: ["Solo reconoce patrones parecidos a sus datos", "Puede repetir sesgos", "Puede equivocarse con confianza", "Puede optimizar una medida y fallar el objetivo real"] }, { type: "paragraph", text: "Preguntar con que datos fue entrenada es una habilidad critica." }] },
      { title: "Actividad Practica", blocks: [{ type: "list", items: ["Abre Teachable Machine", "Crea dos clases", "Entrena con la camara", "Prueba una pose nueva", "Compara 5 ejemplos contra 50"] }, { type: "callout", accent: "teal", text: "La actividad muestra recoleccion de datos, entrenamiento y calidad del modelo en minutos." }] },
      { title: "IA Responsable", blocks: [{ type: "paragraph", text: "Los ninos deben aprender cuando verificar resultados, cuando no depender de la IA y quien responde si causa dano." }] },
    ],
  },
  "math-games-that-make-learning-fun": {
    ...localizedBlogArticles.en["math-games-that-make-learning-fun"],
    title: "Juegos De Matematicas Que Hacen Divertido Aprender",
    category: "Matematicas",
    date: common.es.dates.jan20,
    imageAlt: "Materiales de matematicas para ninos",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "La ansiedad matematica aparece cuando las matematicas se sienten como hojas, examenes cronometrados y errores marcados. Los juegos cambian el contexto." }, { type: "paragraph", text: "Estos juegos son para grados 2 a 5 y usan materiales simples." }] },
      { title: "", blocks: [{ type: "games", items: [
        { title: "Guerra de Numeros", gradeRange: "Grados 2-4", description: "Juego de cartas para comparar numeros.", howToPlayLabel: "Como Jugar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Reparte cartas.", "Cada jugador voltea una.", "La mayor gana.", "Para multiplicar, voltea dos."], whyItWorks: "Da practica repetida sin sentirse como tarea." },
        { title: "101 y Fuera", gradeRange: "Grados 3-5", description: "Juego de dados con suma mental.", howToPlayLabel: "Como Jugar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Empieza en 0.", "Tira dos dados.", "Suma o forma decenas.", "Acercate a 101 sin pasarte."], whyItWorks: "Refuerza valor posicional." },
        { title: "Pizza de Fracciones", gradeRange: "Grados 3-5", description: "Juego visual de fracciones.", howToPlayLabel: "Como Jugar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Corta circulos en fracciones.", "Toma piezas por turnos.", "Completa un entero exacto."], whyItWorks: "Manipular piezas ayuda a entender equivalencias." },
        { title: "Numero Objetivo", gradeRange: "Grados 4-5", description: "Reto de calculo creativo.", howToPlayLabel: "Como Jugar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Elige cinco digitos.", "Elige un objetivo.", "Usa operaciones para llegar."], whyItWorks: "Muestra que hay varios caminos." },
        { title: "Veinte Preguntas Matematicas", gradeRange: "Grados 2-5", description: "Juego logico con vocabulario.", howToPlayLabel: "Como Jugar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Piensa un numero.", "Haz preguntas si/no.", "Adivina con pocas preguntas."], whyItWorks: "El vocabulario sirve para ganar." },
        { title: "Frasco de Estimacion", gradeRange: "Grados 2-4", description: "Reto semanal de estimar.", howToPlayLabel: "Como Jugar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Llena un frasco.", "Todos estiman.", "Cuentan juntos.", "Gana el mas cercano."], whyItWorks: "Construye sentido numerico." },
      ] }] },
      { title: "Nota Sobre Practica Cronometrada", blocks: [{ type: "paragraph", text: "La fluidez viene de exposicion repetida sin miedo. Los juegos ofrecen practica sin activar ansiedad." }, { type: "list", items: ["Empieza con juegos conocidos", "Juega junto a tu hijo", "Dejalo ganar al inicio", "Pregunta antes de corregir", "Termina cuando aun quiera jugar"] }] },
    ],
  },
  "building-a-community-stem-workshops": {
    ...localizedBlogArticles.en["building-a-community-stem-workshops"],
    title: "Construyendo Comunidad: Como Los Talleres STEM Cambian Vidas",
    category: "Comunidad",
    date: common.es.dates.jan12,
    imageAlt: "Estudiantes en un taller STEM comunitario",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "Lo mas dificil de iniciar Avanza STEM fue creer que llegar a una biblioteca con materiales y una laptop podia importar." }, { type: "paragraph", text: "Despues de programas en Clifton y Allwood, esta claro que importa porque los estudiantes ven que STEM tambien les pertenece." }] },
      { title: "Como Se Ve Un Taller", blocks: [{ type: "paragraph", text: "Nuestro formato actual dura tres semanas: ingenieria, programacion e IA. Todo es gratuito y no requiere experiencia." }, { type: "paragraph", text: "Los estudiantes construyen, escriben Python y entrenan modelos simples de IA." }] },
      { title: "Por Que Las Bibliotecas Son El Lugar Correcto", blocks: [{ type: "paragraph", text: "Las bibliotecas son espacios confiables y gratuitos para aprender." }, { type: "list", items: ["Sin costo", "Espacio conocido y seguro", "Relacion con la comunidad", "Salones y tecnologia", "Acceso para varias escuelas"] }] },
      { title: "Lo Que Hemos Visto", blocks: [{ type: "paragraph", text: "Vemos estudiantes agregando preguntas a sus juegos, familias sorprendidas de tener STEM cerca y conversaciones reales sobre ciencia." }] },
      { title: "El Problema De Representacion", blocks: [{ type: "paragraph", text: "Los estudiantes hispanos necesitan exposicion, mentoria, animo y acceso." }, { type: "callout", title: "La Brecha Que Queremos Cerrar", accent: "purple", text: "La visibilidad influye en quien se siente invitado a STEM." }] },
      { title: "Como Llevar Un Taller A Tu Comunidad", blocks: [{ type: "numbered", items: [{ title: "Identifica un lugar", body: "Bibliotecas, centros comunitarios, iglesias y escuelas pueden funcionar." }, { title: "Conecta con nosotros", body: "Podemos hablar de curriculo, materiales y promocion." }, { title: "Promueve localmente", body: "Grupos comunitarios y aliados locales ayudan." }, { title: "Se constante", body: "La confianza crece con el tiempo." }] }] },
      { title: "Lo Que Sigue", blocks: [{ type: "paragraph", text: "Queremos expandirnos a mas bibliotecas y compartir un modelo que otros puedan replicar." }, { type: "callout", accent: "purple", text: "Revisa la pagina de talleres o contactanos para llevar un programa a tu comunidad." }] },
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
    imageAlt: "孩子在笔记本电脑上学习编程",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "编程不再只是科技从业者的技能。理解代码背后的逻辑，正在变得像阅读和写作一样基础。" }, { type: "paragraph", text: "当学生第一次让程序运行起来时，他们会意识到自己也能创造东西。" }] },
      { title: "重点不只是代码", blocks: [{ type: "paragraph", text: "真正的价值在于编程培养的思维方式：" }, { type: "list", items: ["把大问题拆成小问题", "发现重复模式", "抓住重要信息", "测试想法并修复错误"] }, { type: "paragraph", text: "这些能力在工程、科学、写作、创业和日常生活中都很有用。" }] },
      { title: "什么时候开始合适?", blocks: [{ type: "numbered", items: [{ title: "5-7 岁：无屏幕和视觉逻辑", body: "游戏和 ScratchJr 可以教顺序思维。" }, { title: "8-11 岁：积木式编程", body: "Scratch 让孩子不用担心语法也能做游戏。" }, { title: "12 岁以上：文本语言", body: "Python 易读、实用，是很好的第一门真实语言。" }] }] },
      { title: "如何在家开始", blocks: [{ type: "list", items: ["创建免费的 Scratch 账号", "一起看一个入门教程", "请孩子解释程序做什么", "允许他们卡住并调试", "庆祝他们做出来的东西"] }] },
      { title: "第一个 Python 程序", blocks: [{ type: "paragraph", text: "如果孩子准备写代码，可以打开 Replit 或 Trinket 试试：" }, { type: "code", title: "试试看", accent: "green", code: "name = input(\"你叫什么名字? \")\nprint(\"你好, \" + name + \"! 欢迎学习编程。\")" }, { type: "paragraph", text: "这是一个真正的程序：它接收输入并回应。" }] },
      { title: "更大的意义", blocks: [{ type: "paragraph", text: "西班牙裔学生在计算机科学中代表性不足，原因是机会和接触不足，而不是能力不足。" }, { type: "callout", accent: "teal", text: "如果孩子想参加免费的线下编程工作坊，请查看我们的工作坊页面。" }] },
    ],
  },
  "5-easy-science-experiments": {
    ...localizedBlogArticles.en["5-easy-science-experiments"],
    title: "5 个可以在家做的简单科学实验",
    category: "科学",
    date: common.zh.dates.feb15,
    readTime: common.zh.minutes.m4,
    imageAlt: "孩子在家做科学实验",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "真正的科学不一定需要实验室外套或昂贵设备。许多好实验只需要醋、纸巾和气泡水等家中物品。" }, { type: "paragraph", text: "每个实验都包含材料、步骤和简单解释，方便和孩子讨论观察结果。" }] },
      { title: "", blocks: [{ type: "experiments", items: [
        { number: 1, title: "小苏打和醋火山", category: "化学", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["半杯小苏打", "一杯白醋", "几滴洗洁精", "可选食用色素", "杯子或碗"], steps: ["把小苏打放入容器。", "加入洗洁精和色素。", "倒入醋并后退。", "观察泡沫喷发。"], science: "小苏打和醋反应产生二氧化碳，洗洁精把气泡困住形成泡沫。" },
        { number: 2, title: "跳舞的葡萄干", category: "物理", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["透明杯子", "气泡水或透明汽水", "一些葡萄干"], steps: ["倒入气泡水。", "放入葡萄干。", "观察几分钟。"], science: "气泡附着在葡萄干上把它们带上去，破裂后葡萄干又沉下去。" },
        { number: 3, title: "自制熔岩灯", category: "化学和物理", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["透明瓶子", "植物油", "水", "泡腾片", "食用色素"], steps: ["倒入大部分油。", "加入水和色素。", "放入一小块泡腾片。"], science: "油和水不混合，气泡把彩色水滴带上去又释放下来。" },
        { number: 4, title: "纸巾色谱", category: "化学", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["纸巾或咖啡滤纸", "可水洗马克笔", "水", "剪刀"], steps: ["剪一条纸。", "在底部附近画点。", "只把纸底部放入水。", "观察颜色分离。"], science: "墨水由多种颜料组成，水带着它们以不同速度移动。" },
        { number: 5, title: "瓶中鸡蛋", category: "物理", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["剥壳熟鸡蛋", "玻璃瓶", "小纸片", "火柴并需成人监督"], steps: ["点燃纸片放入瓶中。", "把鸡蛋放在瓶口。", "观察气压作用。"], science: "瓶内空气先受热后冷却，内部压力降低，外部气压把鸡蛋推入瓶中。" },
      ] }] },
      { title: "让学习留下来", blocks: [{ type: "paragraph", text: "每次实验后，请孩子画出发生了什么并写一句原因。解释给别人听能巩固理解。" }, { type: "callout", accent: "teal", text: "我们的工作坊也包含这些实验和引导讨论。" }] },
    ],
  },
  "how-to-build-the-strongest-popsicle-stick-bridge": {
    ...localizedBlogArticles.en["how-to-build-the-strongest-popsicle-stick-bridge"],
    title: "如何建造最坚固的冰棒棍桥",
    category: "工程",
    date: common.zh.dates.feb10,
    readTime: common.zh.minutes.m6,
    imageAlt: "正在搭建的冰棒棍桥",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "桥的强度取决于几何结构、载荷分布和连接质量，而不只是棍子或胶水的数量。" }, { type: "paragraphWithLink", before: "完整搭建步骤请查看我们的", linkText: "详细项目页面", href: "/projects/popsicle-stick-bridge", after: "。" }] },
      { title: "为什么三角形最强", blocks: [{ type: "paragraph", text: "正方形会变形，三角形更能保持形状，所以桁架使用相连的三角形。" }, { type: "callout", title: "关键想法", accent: "purple", text: "给正方形加一根斜撑，就变成两个三角形，承重能力会大幅提高。" }] },
      { title: "理解载荷路径", blocks: [{ type: "list", items: ["桥面分散重量", "桁架把力传向支撑点", "下方受拉", "上方受压", "斜杆传递力"] }] },
      { title: "强桥和弱桥的五个差别", blocks: [{ type: "numbered", items: [{ title: "连接稳定", body: "胶水需要完全固化。" }, { title: "两侧桁架一致", body: "不一致会让弱侧先失效。" }, { title: "顶部横向支撑", body: "防止侧面外翻。" }, { title: "合适桥面", body: "把重量分给两侧。" }, { title: "交错三角形", body: "形成连续受力路径。" }] }] },
      { title: "常见错误", blocks: [{ type: "list", items: ["胶水太多", "没有模板就同时做两侧", "省略横向支撑", "胶水未干就测试", "随意加棍子"] }] },
      { title: "强度重量比挑战", blocks: [{ type: "paragraph", text: "用桥承受的重量除以桥本身重量，这才是真正的工程分数。" }, { type: "callout", accent: "purple", text: "在我们的桥梁工作坊中，学生会优化强度重量比。" }] },
    ],
  },
  "getting-started-with-lego-robotics": {
    ...localizedBlogArticles.en["getting-started-with-lego-robotics"],
    title: "乐高机器人入门：家长指南",
    category: "机器人",
    date: common.zh.dates.feb5,
    readTime: common.zh.minutes.m5,
    imageAlt: "孩子搭建乐高机器人项目",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "乐高机器人同时引入工程和编程。学生能看到电机转动、传感器反应，也能看到代码影响现实世界。" }, { type: "paragraph", text: "这份指南帮助家长选择套件并支持孩子学习。" }] },
      { title: "它和普通乐高有什么不同", blocks: [{ type: "paragraph", text: "普通乐高是静态模型，机器人会移动、感知和回应。" }, { type: "callout", title: "核心想法", accent: "green", text: "机器人让失败变成一个要解决的谜题。" }] },
      { title: "选择哪种套件", blocks: [{ type: "numbered", items: [{ title: "SPIKE Essential (6-10 岁)", body: "适合低龄初学者。" }, { title: "SPIKE Prime (10-14 岁)", body: "传感器和电机更多，项目更高级。" }, { title: "Mindstorms Robot Inventor", body: "已停产但仍灵活，遇到好价格可以考虑。" }] }] },
      { title: "孩子会学到什么", blocks: [{ type: "list", items: ["机械基础", "传感器逻辑", "条件编程", "迭代设计", "团队沟通"] }] },
      { title: "给非工程师家长的建议", blocks: [{ type: "paragraph", text: "你不需要知道所有答案，只要提出好问题。" }, { type: "list", items: ["你想让它做什么?", "实际发生了什么?", "你会先改哪里?", "能不能让它做别的事?"] }] },
      { title: "可以先试的项目", blocks: [{ type: "numbered", items: [{ title: "巡线机器人", body: "用颜色传感器跟随黑线。" }, { title: "避障机器人", body: "用距离传感器转向。" }, { title: "遥控", body: "先手动驾驶，再用代码重现。" }, { title: "分类机器", body: "按颜色分类物体。" }] }] },
      { title: "套件之外", blocks: [{ type: "paragraph", text: "FIRST LEGO League 是团队挑战的自然下一步。" }, { type: "callout", accent: "green", text: "在我们的工作坊中，学生会从零搭建并编程第一个机器人。" }] },
    ],
  },
  "what-is-ai-explaining-to-kids": {
    ...localizedBlogArticles.en["what-is-ai-explaining-to-kids"],
    title: "什么是 AI? 给孩子解释人工智能",
    category: "AI",
    date: common.zh.dates.jan28,
    readTime: common.zh.minutes.m4,
    imageAlt: "孩子在工作坊中探索 AI 概念",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "AI 会推荐视频、影响社交媒体、驱动语音助手并过滤邮件。孩子们常常在理解它之前就已经在使用它。" }, { type: "paragraph", text: "理解 AI 是一种现代素养：要学会问系统用什么数据学习、缺少谁的视角。" }] },
      { title: "从孩子熟悉的东西开始", blocks: [{ type: "callout", accent: "teal", text: "Spotify 给你推荐新歌时，它是怎么选出来的?" }, { type: "paragraph", text: "这个问题自然引出模式识别。" }] },
      { title: "AI 如何学习", blocks: [{ type: "paragraph", text: "AI 从例子中学习，就像孩子看过许多狗之后学会认狗。" }, { type: "callout", title: "技术术语", accent: "green", text: "这叫监督学习：训练例子带有正确答案。" }] },
      { title: "值得给孩子解释的 AI 类型", blocks: [{ type: "numbered", items: [{ title: "图像识别", body: "用于人脸解锁和照片标签。" }, { title: "推荐系统", body: "用于 Netflix、Spotify、YouTube 和社交平台。" }, { title: "语言模型", body: "通过预测文字模式生成文本。" }, { title: "游戏 AI", body: "通过不断尝试和结果反馈来改进。" }] }] },
      { title: "AI 不能做什么", blocks: [{ type: "list", items: ["只能识别类似训练数据的模式", "可能重复偏见", "可能自信地出错", "可能优化指标却错过真正目标"] }, { type: "paragraph", text: "询问训练数据是什么，是很重要的批判性思维。" }] },
      { title: "动手活动", blocks: [{ type: "list", items: ["打开 Teachable Machine", "创建两个类别", "用摄像头训练", "测试新动作", "比较 5 个例子和 50 个例子的差别"] }, { type: "callout", accent: "teal", text: "这个活动能在几分钟内展示数据收集、训练和模型质量。" }] },
      { title: "负责任地使用 AI", blocks: [{ type: "paragraph", text: "孩子需要知道什么时候验证 AI、什么时候不该依赖它，以及系统造成伤害时谁负责。" }] },
    ],
  },
  "math-games-that-make-learning-fun": {
    ...localizedBlogArticles.en["math-games-that-make-learning-fun"],
    title: "让学习变有趣的数学游戏",
    category: "数学",
    date: common.zh.dates.jan20,
    readTime: common.zh.minutes.m3,
    imageAlt: "儿童数学教具",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "数学焦虑常常来自练习册、限时测试和红色批改。游戏能改变这种体验。" }, { type: "paragraph", text: "这些游戏适合 2 到 5 年级，并且材料很简单。" }] },
      { title: "", blocks: [{ type: "games", items: [
        { title: "数字大战", gradeRange: "2-4 年级", description: "练习数字比较的纸牌游戏。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["发牌。", "每人翻一张。", "大的赢。", "乘法版翻两张。"], whyItWorks: "反复练习但不像作业。" },
        { title: "101 不超线", gradeRange: "3-5 年级", description: "练习心算和策略的骰子游戏。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["从 0 开始。", "掷两个骰子。", "相加或组成十位数。", "尽量接近 101 但不能超过。"], whyItWorks: "强化位值理解。" },
        { title: "分数披萨", gradeRange: "3-5 年级", description: "动手理解分数。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["把圆剪成分数片。", "轮流抽取。", "刚好拼成一个整圆。"], whyItWorks: "移动实物能帮助理解等值分数。" },
        { title: "目标数字", gradeRange: "4-5 年级", description: "开放式心算挑战。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["选五个数字。", "设一个目标。", "用运算达到目标。"], whyItWorks: "展示一道题可以有多种路径。" },
        { title: "数学二十问", gradeRange: "2-5 年级", description: "用数学词汇玩的逻辑游戏。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["想一个数字。", "问是/否问题。", "用尽量少的问题猜中。"], whyItWorks: "词汇变得有用，因为它能帮助获胜。" },
        { title: "估算罐", gradeRange: "2-4 年级", description: "每周估算挑战。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["装满一个透明罐。", "每个人写估计值。", "一起数。", "最接近者获胜。"], whyItWorks: "低压力估算能建立数感。" },
      ] }] },
      { title: "关于限时练习", blocks: [{ type: "paragraph", text: "熟练来自低压力的反复接触。游戏能提供练习，同时减少焦虑。" }, { type: "list", items: ["从孩子喜欢的游戏开始", "和孩子一起玩", "一开始让他们赢几次", "纠正前先问他们怎么想", "在他们还想玩时结束"] }] },
    ],
  },
  "building-a-community-stem-workshops": {
    ...localizedBlogArticles.en["building-a-community-stem-workshops"],
    title: "建设社区：本地 STEM 工作坊如何改变生活",
    category: "社区",
    date: common.zh.dates.jan12,
    readTime: common.zh.minutes.m7,
    imageAlt: "社区 STEM 工作坊中的学生",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "创办 Avanza STEM 最难的部分，是相信带着材料和电脑出现在图书馆真的会有意义。" }, { type: "paragraph", text: "在 Clifton 和 Allwood 的项目之后，答案很清楚：它有意义，因为学生看到 STEM 也属于他们。" }] },
      { title: "工作坊是什么样", blocks: [{ type: "paragraph", text: "目前的形式是三周系列：工程、编程和 AI。全部免费，不需要经验。" }, { type: "paragraph", text: "学生会搭建、写 Python，并训练简单 AI 模型。" }] },
      { title: "为什么图书馆合适", blocks: [{ type: "paragraph", text: "图书馆是社区信任的免费学习空间。" }, { type: "list", items: ["免费参加", "熟悉且安全", "与社区有联系", "有空间和技术", "不同学校的学生都能来"] }] },
      { title: "我们在现场看到的", blocks: [{ type: "paragraph", text: "学生会主动给 Python 游戏加问题，家庭第一次在附近看到这样的 STEM 项目，孩子们也会认真讨论科学现象。" }] },
      { title: "代表性问题", blocks: [{ type: "paragraph", text: "西班牙裔学生需要更多接触、导师、鼓励和机会。" }, { type: "callout", title: "我们想缩小的差距", accent: "purple", text: "可见性会影响谁觉得自己被 STEM 邀请进来。" }] },
      { title: "如何把工作坊带到你的社区", blocks: [{ type: "numbered", items: [{ title: "找到地点", body: "图书馆、社区中心、教堂和学校都可以。" }, { title: "联系我们", body: "我们可以讨论课程、材料和推广。" }, { title: "在本地推广", body: "社区群组和当地伙伴很有帮助。" }, { title: "持续出现", body: "信任需要时间建立。" }] }] },
      { title: "接下来", blocks: [{ type: "paragraph", text: "我们希望扩展到更多图书馆和社区中心，并分享可复制的模式。" }, { type: "callout", accent: "purple", text: "查看工作坊页面，或联系我们把项目带到你的社区。" }] },
    ],
  },
}
