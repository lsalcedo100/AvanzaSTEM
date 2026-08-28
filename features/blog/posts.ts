const GALLERY_IMAGE_7 =
  "https://res.cloudinary.com/dw4uprmkk/image/upload/f_auto,q_auto:good,w_1600/gallery-00168.jpg"
const CODING_THUMBNAIL_IMAGE =
  "https://res.cloudinary.com/dw4uprmkk/image/upload/f_auto,q_auto:good,w_1600/gallery-00187.jpg"

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
  | "how-does-a-camera-work-without-a-lens"
  | "how-do-fiber-optic-cables-work"
  | "how-do-scientists-know-what-stars-are-made-of"
  | "why-do-things-glow-under-a-blacklight"
  | "is-light-a-wave-or-a-particle"

export type LocalizedBlogArticles = {
  en: Record<BlogSlug, BlogArticle>
  es: Partial<Record<BlogSlug, BlogArticle>>
  zh: Partial<Record<BlogSlug, BlogArticle>>
  pt: Partial<Record<BlogSlug, BlogArticle>>
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
  pt: {
    minutes: { m3: "3 min", m4: "4 min", m5: "5 min", m6: "6 min", m7: "7 min" },
  },
}

export const localizedBlogArticles: LocalizedBlogArticles = {
  en: {
    "why-every-kid-should-learn-to-code": {
      title: "Why Every Kid Should Learn to Code (And How to Start)",
      category: "Coding",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m5,
      image: CODING_THUMBNAIL_IMAGE,
      imageAlt: "An Avanza STEM mentor leading a coding workshop, with students seated at laptops",
      imageCaption: "Students learn the basics of coding during an Avanza STEM workshop session.",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-is-ai-explaining-to-kids",
      sections: [
        {
          title: "",
          blocks: [
            { type: "paragraph", text: "Here is something that catches a lot of people off guard: writing code is turning into a basic skill, right up there with reading and writing. And plenty of kids still get all the way through school without typing a single line of it." },
            { type: "paragraph", text: "We watched it click for one student at Clifton Public Library. They wrote a program that did exactly one thing: print the word \"Hello.\" Then they spent the next twenty minutes stuffing it with extra questions, bad jokes, and sound effects. Nobody asked them to. They had just figured out they could build things, and they did not want to stop." },
          ],
        },
        {
          title: "It Is Not Really About Code",
          blocks: [
            { type: "paragraph", text: "Here is the part nobody says out loud: the goal is not to turn every kid into a programmer. The goal is what coding does to the way they think." },
            { type: "list", items: ["Decomposition: chopping one giant problem into pieces small enough to actually solve", "Pattern recognition: noticing when you have seen this exact thing before", "Abstraction: ignoring the noise and zeroing in on what matters", "Debugging: trying an idea, watching it fail, and hunting down why"] },
            { type: "paragraph", text: "Engineers use those four moves. So do scientists, writers, and people starting businesses. A kid chasing down a bug in a Python loop is practicing the same thing they will need when an experiment flops or a group project falls apart." },
          ],
        },
        {
          title: "When Is the Right Age to Start?",
          blocks: [
            { type: "paragraph", text: "There is no magic number, but the path usually looks like this:" },
            { type: "numbered", items: [
              { title: "Ages 5-7: unplugged and visual logic", body: "Board games and apps like ScratchJr teach kids to put steps in order, and nobody has to touch a keyboard yet." },
              { title: "Ages 8-11: block-based coding", body: "Scratch lets kids snap together real games and animations. No typing means no barrier, so they get straight to building." },
              { title: "Ages 12+: text-based languages", body: "Python reads almost like English, professionals use it every day, and it makes a great first real language." },
            ] },
          ],
        },
        {
          title: "How to Get Started at Home",
          blocks: [
            { type: "list", items: ["Make a free Scratch account and let them poke around", "Watch one short beginner tutorial together, then get out of the way", "Ask them to explain out loud what their program does", "Let them get stuck. Getting unstuck is the whole skill", "Make a big deal out of what they build, even the tiny stuff"] },
          ],
        },
        {
          title: "A Simple First Python Program",
          blocks: [
            { type: "paragraph", text: "If your kid is ready to write actual code, open a browser editor like Replit or Trinket and type this in:" },
            { type: "code", title: "Try This", accent: "green", code: "name = input(\"What is your name? \")\nprint(\"Hello, \" + name + \"! Welcome to coding.\")" },
            { type: "paragraph", text: "That is a real program. It asks a question, it listens, it answers back. Add a few more questions and suddenly you have a chatbot or a quiz game." },
            { type: "paragraphWithLink", before: "Want the full walkthrough, including how to turn it into a quiz? Take a look at our ", linkText: "first Python quiz game guide", href: "/projects/my-first-python-program", after: "." },
          ],
        },
        {
          title: "The Bigger Picture",
          blocks: [
            { type: "paragraph", text: "Hispanic students are underrepresented in computer science, and it has nothing to do with ability. It comes down to who gets access, who sees it up close, and who gets told to keep going." },
            { type: "paragraph", text: "Avanza STEM exists to open doors that should never have been shut in the first place." },
            { type: "quote", text: "He came home and immediately wanted to show me the program he wrote. He kept adding new lines to it for the rest of the night.", attribution: "Parent of a student at a Clifton Library coding workshop" },
            { type: "ctaLink", title: "Try a Free Workshop", text: "If your kid wants to try a free in-person coding workshop, we bring every material you need and you can walk in with zero experience.", linkText: "See upcoming workshops", href: "/workshops", accent: "teal" },
          ],
        },
      ],
    },
    "5-easy-science-experiments": {
      title: "5 Easy Science Experiments You Can Do at Home",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m4,
      image: "/images/blog/egg-experiment.jpg",
      imageAlt: "A close-up of an egg covered in carbon dioxide bubbles during a kitchen chemistry reaction",
      imageCaption: "Carbon dioxide bubbles form during a kitchen chemistry reaction, the same gas-producing reaction at work in several of these experiments.",
      endingProject: { href: "/projects/baking-soda-volcano", label: "Try this project: baking soda volcano" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "math-games-that-make-learning-fun",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You do not need a lab coat, and you definitely do not need expensive gear. Some of the best science out there runs on vinegar, paper towels, and whatever soda is sitting in the fridge." },
          { type: "paragraph", text: "Each one below comes with materials, steps, and a plain-English explanation, so you can talk through what your kid just watched happen." },
          { type: "summary", timeLabel: "Time needed", time: "30-45 minutes for all five", ageLabel: "Best age range", age: "Ages 5 and up, with adult help for younger kids", supervisionLabel: "Adult supervision", supervision: "Yes, especially for the Egg in a Bottle experiment, which uses fire", learnLabel: "What kids will learn", learn: "chemical reactions, gas pressure, density, and capillary action", safetyLabel: "Safety note", safety: "An adult must light the match and supervise the egg experiment closely" },
        ] },
        { title: "", blocks: [{ type: "experiments", items: [
          { number: 1, title: "Baking Soda and Vinegar Volcano", category: "Chemistry", materialsLabel: "Materials", stepsLabel: "Steps", scienceLabel: "The Science", materials: ["1/2 cup baking soda", "1 cup white vinegar", "A few drops of dish soap", "Food coloring (optional)", "A cup or bowl"], steps: ["Dump the baking soda into the cup.", "Squeeze in the dish soap and a few drops of food coloring.", "Pour in the vinegar and get your hand out of the way.", "Watch the foam climb straight out of the cup."], science: "Baking soda and vinegar react the second they touch and start pumping out carbon dioxide gas. The dish soap catches all that gas in bubbles, which is what turns a plain fizz into an eruption." },
          { number: 2, title: "Dancing Raisins", category: "Physics", materialsLabel: "Materials", stepsLabel: "Steps", scienceLabel: "The Science", materials: ["A clear glass", "Sparkling water or clear soda", "A handful of raisins"], steps: ["Fill the glass with sparkling water.", "Drop in a few raisins.", "Keep watching. It takes a minute before they start moving."], science: "Tiny carbon dioxide bubbles grab onto the wrinkles in each raisin and float it to the top. Up there the bubbles pop, the raisin sinks, and the whole ride starts over." },
          { number: 3, title: "Homemade Lava Lamp", category: "Chemistry & Physics", materialsLabel: "Materials", stepsLabel: "Steps", scienceLabel: "The Science", materials: ["A clear bottle", "Vegetable oil", "Water", "Alka-Seltzer tablets", "Food coloring"], steps: ["Fill the bottle about three quarters full with oil.", "Top it off with water and a few drops of food coloring.", "Snap off a small piece of tablet and drop it in."], science: "Oil and water refuse to mix, so they sit in layers. The tablet makes gas bubbles that grab colored water and haul it upward, then let go at the top so it sinks back down." },
          { number: 4, title: "Paper Towel Chromatography", category: "Chemistry", materialsLabel: "Materials", stepsLabel: "Steps", scienceLabel: "The Science", materials: ["Paper towel or coffee filter", "Washable markers", "A cup of water", "Scissors"], steps: ["Cut a thin strip of paper.", "Draw a fat marker dot near the bottom.", "Dip only the very bottom edge in water and keep the dot dry.", "Wait, and watch one color split into several."], science: "That single marker color is really a few different pigments mixed together. Water drags them up the paper, and because some travel faster than others, they spread out into stripes." },
          { number: 5, title: "The Egg in a Bottle", category: "Physics", materialsLabel: "Materials", stepsLabel: "Steps", scienceLabel: "The Science", materials: ["A peeled hard-boiled egg", "A glass bottle", "A small piece of paper", "Matches with adult supervision"], steps: ["An adult lights the paper and drops it into the bottle.", "Set the egg on the opening, narrow end down.", "Stand back and watch the bottle swallow it."], science: "The flame heats the air inside the bottle. As that air cools it takes up less room, so the pressure inside drops, and the ordinary air pressing on the outside shoves the egg right through the neck." },
        ] }] },
        { title: "Making It Stick", blocks: [
          { type: "paragraph", text: "When an experiment wraps up, ask your kid to draw what happened and write one sentence about why. Saying it out loud to someone else is what turns a cool moment into something they actually understand." },
          { type: "paragraphWithLink", before: "Want more on the Baking Soda and Vinegar Volcano? Our ", linkText: "full project guide", href: "/projects/baking-soda-volcano", after: " has photos and fixes for when it does not go the way you expected." },
          { type: "callout", title: "Workshop Connection", accent: "teal", text: "At one workshop, students argued about why the raisins kept bobbing up and down for almost ten minutes. That is longer than the setup took. That argument is the whole goal." },
        ] },
      ],
    },
    "how-to-build-the-strongest-popsicle-stick-bridge": {
      title: "How to Build the Strongest Popsicle Stick Bridge",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m6,
      image: "https://res.cloudinary.com/dw4uprmkk/image/upload/f_auto,q_auto:good,w_1600/gallery-00158.jpg",
      imageAlt: "Avanza STEM mentor and students standing beside a popsicle stick bridge holding a tall stack of books",
      imageCaption: "Students test how much weight a popsicle stick bridge can hold during an Avanza STEM engineering workshop.",
      endingProject: { href: "/projects/popsicle-stick-bridge", label: "Try this project: build a popsicle stick truss bridge" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "getting-started-with-lego-robotics",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Bridge competitions are almost never won by whoever used the most sticks or the most glue. They come down to three things: your geometry, where the weight travels, and how clean your joints are." },
          { type: "paragraphWithLink", before: "This post digs into the engineering behind a bridge that holds. If you want the step-by-step build instead, head over to our ", linkText: "popsicle stick truss bridge project page", href: "/projects/popsicle-stick-bridge", after: "." },
        ] },
        { title: "Why Triangles Win Every Time", blocks: [
          { type: "paragraph", text: "Push on a square and it flops sideways into a parallelogram. Push on a triangle and nothing moves, unless something actually bends or snaps. That is the entire reason trusses are built out of triangles." },
          { type: "callout", title: "Key Insight", accent: "purple", text: "Add one diagonal brace to a square frame and you just turned it into two triangles. That single stick can multiply how much weight the whole structure holds." },
        ] },
        { title: "Understanding Load Paths", blocks: [
          { type: "list", items: ["The deck spreads the weight out across both side trusses", "The trusses funnel that force toward the supports", "The bottom chord gets stretched, which engineers call tension", "The top chord gets squeezed, which is compression", "The diagonals hand force from one part of the bridge to the next"] },
          { type: "paragraph", text: "The best designs beef up the spots doing the most work instead of gluing sticks everywhere and hoping something sticks." },
        ] },
        { title: "The Five Things That Separate Strong Bridges from Weak Ones", blocks: [
          { type: "numbered", items: [
            { title: "Consistent joint quality", body: "Glue gives out before the wood does. Build clean joints and let every one of them cure all the way." },
            { title: "Two matching side trusses", body: "If one side comes out sloppier than the other, it takes more of the load and goes first." },
            { title: "Top lateral bracing", body: "Cross pieces across the top stop the side walls from leaning outward and folding over." },
            { title: "A proper deck", body: "A deck that shares weight across both trusses beats dumping the whole load onto one point." },
            { title: "Staggered triangles", body: "Overlapping triangles give force a clean path all the way to the supports." },
          ] },
        ] },
        { title: "Common Mistakes to Avoid", blocks: [
          { type: "list", items: ["Drowning the whole thing in glue", "Building both trusses at once instead of copying one good template twice", "Skipping the lateral bracing", "Testing before the glue has fully cured", "Gluing on random sticks without knowing where the weak spot actually is"] },
        ] },
        { title: "The Strength-to-Weight Ratio Challenge", blocks: [
          { type: "paragraph", text: "Weigh your bridge. Then divide the weight it held by the weight of the bridge itself. That number is your real engineering score." },
          { type: "paragraph", text: "At our workshops, student bridges usually come in under 50 grams and hold somewhere between 5 and 15 pounds before they give up. That is over 50 times their own weight." },
          { type: "quote", text: "We started adding sticks only to the spot that broke last time, instead of everywhere. That is when our bridge actually got stronger.", attribution: "Student at an Avanza STEM bridge-building workshop" },
          { type: "callout", accent: "purple", text: "Our bridge-building workshop scores on strength-to-weight ratio, and that one rule changes how students build from the very first stick." },
        ] },
      ],
    },
    "getting-started-with-lego-robotics": {
      title: "Getting Started with LEGO Robotics: A Parent's Guide",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m5,
      image: "/images/shared/lego-robotics.jpeg",
      imageAlt: "A LEGO robotics kit arranged for a beginner build",
      imageCaption: "LEGO robotics can be a helpful at-home introduction to engineering and programming.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: LEGO SPIKE Prime Super Cleanup robot guide" },
      endingSecondary: { href: "/projects", label: "Browse more STEM projects" },
      endingRelatedSlug: "why-every-kid-should-learn-to-code",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "LEGO robotics hands kids engineering and programming at the same time. Motors spin, sensors notice things, and the code they typed makes something move in the room they are sitting in." },
          { type: "paragraph", text: "On a first build, a team can burn an entire session just trying to get a robot to drive in a straight line. That sounds like a wasted afternoon. It is usually the best learning of the day." },
        ] },
        { title: "Why Robotics Is Different from Regular LEGO", blocks: [
          { type: "paragraph", text: "Regular LEGO gives you a model that sits there looking good. Robotics gives you something that moves, senses, and reacts, all running off a programmable hub." },
          { type: "callout", title: "The Big Idea", accent: "green", text: "Robotics turns failure into a puzzle. When the robot does the wrong thing, it is telling you something about your design or your code, and now you get to figure out what." },
        ] },
        { title: "Which LEGO Robotics Kit Is Right for Your Child?", blocks: [
          { type: "numbered", items: [
            { title: "LEGO SPIKE Essential (Ages 6-10)", body: "A guided, block-based starter kit built for younger beginners." },
            { title: "LEGO SPIKE Prime (Ages 10-14)", body: "The kit a lot of schools use. More sensors, more motors, and room to grow into bigger projects." },
            { title: "LEGO Mindstorms Robot Inventor", body: "Discontinued but still floating around. Flexible, powerful, and worth grabbing if you spot a good deal." },
          ] },
        ] },
        { title: "What Your Child Will Actually Learn", blocks: [
          { type: "list", items: ["How machines really move: gears, axles, and leverage", "Sensor logic, or how a robot decides what to do next", "Programming step by step, plus if-this-then-that thinking", "Designing, testing, breaking it, and redesigning", "Working on a team and explaining an idea so someone else gets it"] },
          { type: "quote", text: "It kept driving in circles, and it turned out one wheel was just loose. Once we found that, it felt like we had actually fixed something.", attribution: "Student trying a LEGO robotics project" },
        ] },
        { title: "Tips for Parents Who Are Not Engineers", blocks: [
          { type: "paragraph", text: "You do not need the answers. You need good questions. These four do most of the work:" },
          { type: "list", items: ["What did you want it to do?", "What did it do instead?", "What would you change first?", "Can you make it do something completely different?"] },
        ] },
        { title: "First Projects to Try", blocks: [
          { type: "numbered", items: [
            { title: "Line follower", body: "Use the color sensor to chase a strip of black tape across the floor." },
            { title: "Obstacle avoider", body: "Use the distance sensor to turn away before the robot smacks into a wall." },
            { title: "Remote control", body: "Drive it by hand first, then try to recreate that exact path in code." },
            { title: "Sorting machine", body: "Build something that sorts objects by color and drops each one in the right pile." },
          ] },
          { type: "paragraphWithLink", before: "Want a guided first build with step-by-step instructions? Try our ", linkText: "LEGO SPIKE Prime Super Cleanup robot guide", href: "/projects/lego-robot-builder", after: "." },
        ] },
        { title: "Beyond the Kit", blocks: [
          { type: "paragraph", text: "Once a student is hungry for a real team challenge, FIRST LEGO League is the natural next stop." },
          { type: "ctaLink", title: "Build Your First Robot", text: "Start with a guided LEGO SPIKE Prime project that walks you through the build, the code, and what to do when none of it works yet.", linkText: "Try the robot guide", href: "/projects/lego-robot-builder", accent: "green" },
        ] },
      ],
    },
    "what-is-ai-explaining-to-kids": {
      title: "What is AI? Explaining Artificial Intelligence to Kids",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m4,
      image: "/images/shared/ai-workshop.jpg",
      imageAlt: "Students working at computers during an Avanza STEM AI workshop, with diagrams on their screens",
      imageCaption: "Students explore AI concepts hands-on during an Avanza STEM workshop session.",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "why-every-kid-should-learn-to-code",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "AI picks the next video, arranges the feed, answers the voice assistant, and quietly sorts the email. Most kids are using it constantly, years before anyone bothers to explain what it is." },
          { type: "paragraph", text: "Knowing how AI works counts as literacy now. There are two questions worth teaching: what did this thing learn from, and whose perspective got left out?" },
        ] },
        { title: "Start With What Kids Already Know", blocks: [
          { type: "callout", accent: "teal", text: "When Spotify drops a new song into your playlist, how do you think it picked that one?" },
          { type: "paragraph", text: "That question leads straight to pattern-finding, which is the engine behind most AI. We ask it at the start of our AI workshops before explaining anything, and students almost always land close to the real answer. That is exactly the point." },
        ] },
        { title: "A Simple Way to Explain How AI Learns", blocks: [
          { type: "paragraph", text: "AI learns the same way a toddler figures out what a dog is: by seeing a lot of dogs. Show a model enough labeled examples and it starts catching the pattern on its own." },
          { type: "callout", title: "The Technical Term", accent: "green", text: "The name for this is supervised learning. Supervised just means every training example came with the right answer attached." },
        ] },
        { title: "Types of AI Worth Explaining to Kids", blocks: [
          { type: "numbered", items: [
            { title: "Image recognition", body: "Face unlock, photo tagging, and doctors reading medical scans." },
            { title: "Recommendation systems", body: "The thing deciding what Netflix, Spotify, and YouTube put in front of you next." },
            { title: "Language models", body: "Systems that write text by predicting which words tend to come next." },
            { title: "Game-playing AI", body: "Programs that get better by playing millions of rounds and learning from what worked." },
          ] },
        ] },
        { title: "What AI Cannot Do (And Why That Matters)", blocks: [
          { type: "list", items: ["It only knows patterns like the ones it trained on. Show it something new and it is guessing", "Whatever bias sat in the training data comes right back out the other side", "It can be completely wrong and still sound totally sure of itself", "It chases the number you told it to chase, even when that misses the actual goal"] },
          { type: "paragraph", text: "Getting a kid in the habit of asking what a system was trained on is one of the most useful thinking tools you can hand them." },
        ] },
        { title: "A Hands-On Activity: Train Your Own Image Classifier", blocks: [
          { type: "list", items: ["Go to teachablemachine.withgoogle.com", "Set up two image classes, like thumbs up and thumbs down", "Train it using photos from your own camera", "Test it with a pose it has never seen before", "Then compare what happens with 5 example photos versus 50"] },
          { type: "callout", accent: "teal", text: "In about ten minutes you have walked through data collection, training, prediction, and the reason data quality decides everything." },
          { type: "quote", text: "I trained it to tell my hand apart from my friend's hand, and it kept guessing wrong until we used more pictures. That is when it actually clicked for me.", attribution: "Student at an Avanza STEM AI workshop" },
        ] },
        { title: "Responsible AI: The Part Most Tutorials Skip", blocks: [
          { type: "paragraph", text: "Kids need more than a list of tool tricks. They need to know when to double-check what an AI tells them, when to not lean on it at all, and who is on the hook when one of these systems causes real harm." },
          { type: "paragraphWithLink", before: "If this is your kid's first time building something with code, our ", linkText: "beginner Python project for kids", href: "/projects/my-first-python-program", after: " is a solid next step." },
        ] },
      ],
    },
    "math-games-that-make-learning-fun": {
      title: "Math Games That Make Learning Fun",
      category: "Math",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m3,
      image: "/images/blog/abacus.jpg",
      imageAlt: "A colorful wooden abacus, a tool for building number sense",
      imageCaption: "A wooden abacus is one of many simple tools that help build number sense before kids ever see a worksheet.",
      endingProject: { href: "/games", label: "Try these games" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "5-easy-science-experiments",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Math anxiety usually starts the same way: worksheets, a ticking timer, and red pen. Games run on the exact same skills, except nobody's stomach hurts." },
          { type: "paragraph", text: "These are built for grades 2 through 5, and almost none of them need more than a deck of cards or a pair of dice." },
          { type: "summary", timeLabel: "Time needed", time: "10-20 minutes per game", ageLabel: "Best age range", age: "Grades 2-5 (ages 7-11)", supervisionLabel: "Adult supervision", supervision: "No. Kids can play independently or with a family member", learnLabel: "What kids will learn", learn: "number sense, mental math, fractions, and estimation" },
        ] },
        { title: "", blocks: [{ type: "games", items: [
          { title: "Number War", gradeRange: "Grades 2-4", description: "A card game that builds number sense fast.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Pull the face cards out, or give them values.", "Deal the whole deck out evenly.", "Both players flip one card.", "Higher card takes both.", "Want multiplication? Flip two cards each and multiply."], whyItWorks: "Kids get piles of repetition and it never once feels like drilling." },
          { title: "101 and Out", gradeRange: "Grades 3-5", description: "A dice game about mental addition and knowing when to stop.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Start at 0.", "Roll two dice.", "Add them together, or use one as tens and one as ones.", "Get as close to 101 as you dare without going over."], whyItWorks: "That one choice forces kids to actually think about place value." },
          { title: "Fraction Pizza", gradeRange: "Grades 3-5", description: "A game where fractions turn into something you can hold.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Cut paper circles into fraction slices.", "Take turns drawing a slice.", "Race to complete exactly one whole circle.", "If a slice would push you over, you skip."], whyItWorks: "Sliding real pieces around builds a gut feel for equivalent fractions that no worksheet can." },
          { title: "Target Number", gradeRange: "Grades 4-5", description: "A mental math puzzle with more than one right path.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Pick five digits.", "Pick a target number.", "Use any operations you want to hit it.", "Compare answers and see who found a shortcut."], whyItWorks: "It quietly proves that a math problem can have several correct routes." },
          { title: "Twenty Questions Math Edition", gradeRange: "Grades 2-5", description: "A guessing game that sneaks in math vocabulary.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Think of a number and keep it secret.", "The other player asks yes or no math questions.", "Try to nail it in as few questions as possible."], whyItWorks: "Words like even, prime, and multiple suddenly matter, because knowing them helps you win." },
          { title: "Estimation Jar", gradeRange: "Grades 2-4", description: "A weekly guessing challenge that basically runs itself.", howToPlayLabel: "How to Play", whyItWorksLabel: "Why It Works", howToPlay: ["Fill a jar with small objects.", "Everyone writes down a guess.", "Count them together later in the week.", "Closest guess wins."], whyItWorks: "Guessing with nothing on the line is exactly how number sense grows." },
        ] }] },
        { title: "A Note on Timed Practice", blocks: [
          { type: "paragraph", text: "Fluency comes from seeing the same math over and over somewhere that getting it wrong costs nothing. Games do that. Timed tests do the opposite." },
          { type: "paragraphWithLink", before: "Want more? A bunch of these games and other activities live on our ", linkText: "games page", href: "/games", after: "." },
          { type: "list", items: ["Start with the game your kid already likes the look of", "Play with them, not at them", "Let them win a few early on", "Ask what they think before you correct anything", "Stop while they still want one more round"] },
          { type: "callout", title: "For Parents", accent: "orange", text: "At family math nights, the games that get replayed are always the ones where a kid can beat a grown-up fair and square. Number War and 101 and Out both do that." },
          { type: "quote", text: "My daughter asked to play 101 and Out three nights in a row. I never told her it was math practice.", attribution: "Parent from an Avanza STEM family math night" },
        ] },
      ],
    },
    "building-a-community-stem-workshops": {
      title: "Building a Community: How Local STEM Workshops Change Lives",
      category: "Community",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m7,
      image: "/images/blog/community-workshop.jpg",
      imageAlt: "Families and students gathering at the library for an Avanza STEM community event",
      imageCaption: "Families gather at the library for an Avanza STEM community workshop series.",
      endingProject: { href: "/host", label: "Host a workshop in your community" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "getting-started-with-lego-robotics",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "The hardest part of starting Avanza STEM was believing that showing up at a library with a box of materials and one laptop could possibly matter." },
          { type: "paragraph", text: "Then we ran programs at Clifton Public Library, Allwood Branch Library, Library of the Chathams, and Roseland Free Public Library, and more than 70 students came through. Now we know why it matters. Kids walk out of those rooms knowing STEM belongs to them too." },
        ] },
        { title: "What a Workshop Actually Looks Like", blocks: [
          { type: "paragraph", text: "Right now we run a three-week series: engineering, then coding, then AI. Every session is free, and nobody needs experience to walk in." },
          { type: "paragraph", text: "Students build things, write Python, and train simple AI models. Along the way we tie every activity back to a real idea engineers and scientists use." },
        ] },
        { title: "Why Libraries Are the Right Venue", blocks: [
          { type: "paragraph", text: "Libraries already do the hard part. They are trusted, they are open to everyone, and free learning is the entire point of the place." },
          { type: "list", items: ["Nobody pays to attend", "Kids already know the building and feel safe in it", "The library has a real relationship with the neighborhood", "Rooms and tech are flexible enough for a messy build session", "Students from a bunch of different schools can all get there"] },
        ] },
        { title: "What We Have Seen in the Room", blocks: [
          { type: "paragraph", text: "The best moments are small ones. A kid quietly adding a fifth question to their Python game. A family realizing a program like this is happening a ten minute walk from home. Two students going back and forth about why something worked." },
          { type: "quote", text: "We had a parent tell us her daughter asked to come back the next week before the session was even over. That is when we knew this was working.", attribution: "Librarian at Allwood Branch Library" },
          { type: "paragraph", text: "Take a kid's curiosity seriously once and they tend to go looking for more of it." },
        ] },
        { title: "The Representation Problem and Why It Is Ours to Solve", blocks: [
          { type: "paragraph", text: "Hispanic students are still underrepresented in STEM, and the reasons are boring and fixable: not enough exposure, not enough mentors, not enough encouragement, not enough access." },
          { type: "callout", title: "The Gap We Are Trying to Close", accent: "purple", text: "Seeing someone who looks like you doing the work changes who feels invited into STEM. That is not a small thing. It is most of the problem." },
        ] },
        { title: "How to Bring a Workshop to Your Community", blocks: [
          { type: "numbered", items: [
            { title: "Find a venue", body: "Libraries, community centers, churches, and schools all work. Start with whoever already knows your families." },
            { title: "Reach out to us", body: "We will talk through curriculum, materials, and how to get the word out." },
            { title: "Promote it locally", body: "Community groups, flyers, and local partners reach families that an online post never will." },
            { title: "Keep showing up", body: "Trust is built one session at a time, and it is worth the wait." },
          ] },
        ] },
        { title: "What Comes Next", blocks: [
          { type: "paragraph", text: "We want to reach more library branches and community centers, and we want the model to be simple enough that other people can run it themselves." },
          { type: "ctaLink", title: "Host a Workshop", text: "Want to bring a free STEM program to your library, school, or community center?", linkText: "Get in touch about hosting a workshop", href: "/host", accent: "purple" },
          { type: "ctaLink", text: "Rather see what a session actually looks like first?", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "why-triangles-are-an-engineers-secret-weapon": {
      title: "Why Triangles Are an Engineer's Secret Weapon",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m5,
      image: "/images/blog/Triangles-Strongest.jpg",
      imageAlt: "Students examining a completed popsicle stick truss bridge at an Avanza STEM engineering workshop",
      imageCaption: "Students at an Avanza STEM workshop inspect a truss bridge. The triangles in the design are not decorative; they are why the bridge holds weight.",
      endingProject: { href: "/projects/popsicle-stick-bridge", label: "Try this project: build a popsicle stick truss bridge" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "how-to-build-the-strongest-popsicle-stick-bridge",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Every engineering workshop we run, a student looks at the bridge that just held the most weight and asks the same thing: why does that one work? The answer keeps coming back to a single shape. The triangle." },
          { type: "paragraph", text: "This is not a rule to memorize and forget. Once you get why triangles are special, you cannot unsee them. Bridges, towers, bike frames, roofs, roller coasters. They are hiding in all of it." },
        ] },
        { title: "The Problem With Squares", blocks: [
          { type: "paragraph", text: "Picture a square you taped together from four sticks. Push one corner and the whole thing leans over into a diamond. Engineers call that deformation, and it happens because all four joints can swivel." },
          { type: "callout", title: "The Key Difference", accent: "purple", text: "A triangle has three sides and three corners, and there is no way to squish it into a different shape without bending or snapping a side. That is what rigid means." },
          { type: "paragraph", text: "So the square is the wrong shape to hold weight, and the triangle is the right one. That is the whole story in two sentences." },
        ] },
        { title: "What Happens When You Add One Diagonal", blocks: [
          { type: "paragraph", text: "Now try this. Take that same floppy square and lay one stick diagonally across the middle. You just made two triangles, and the frame goes from wobbly to solid." },
          { type: "paragraph", text: "The extra stick is not just reinforcement. It splits the square into two shapes that cannot deform, and suddenly the whole panel is rigid. Students at our bridge workshops feel this the second they add a diagonal. The panel that used to fold over now fights back." },
          { type: "callout", accent: "purple", text: "The gap between a weak frame and a strong one can be one diagonal stick. That is triangulation, and that is the entire trick." },
        ] },
        { title: "Why Triangles Show Up Everywhere in Engineering", blocks: [
          { type: "paragraph", text: "Once you know what to look for, you will start catching triangles doing structural work all over the place." },
          { type: "list", items: [
            "Truss bridges: a whole chain of connected triangles carrying the load from one end to the other",
            "The Eiffel Tower: a lattice of triangles that lets it sway in wind instead of snapping",
            "Bicycle frames: look at the main frame and you are looking at a triangle",
            "Rooftop rafters: the A-shape of a pitched roof is a triangle holding up the whole thing",
            "Construction cranes: that long boom is a triangular lattice lifting absurd amounts of weight",
            "Roller coasters: triangulated supports handle riders slamming through direction changes",
          ] },
        ] },
        { title: "The Science Behind It: How Forces Move Through Triangles", blocks: [
          { type: "numbered", items: [
            { title: "Triangles turn forces into pulls and squeezes", body: "Push down on a triangle and every member either gets stretched (tension) or squeezed (compression). Nothing bends. Bending is what breaks things." },
            { title: "All three sides share the work", body: "A square dumps all its stress into the corners. A triangle spreads the force along every side at once." },
            { title: "The shape refuses to move", body: "As long as no member fails, a loaded triangle stays exactly the shape you built it. A square cannot promise you that." },
          ] },
        ] },
        { title: "Try It Yourself", blocks: [
          { type: "paragraph", text: "No lab required. Grab four popsicle sticks and some tape and see it happen in about two minutes." },
          { type: "list", items: [
            "Tape four sticks end to end into a square. Push one corner and watch it lean.",
            "Lay a fifth stick diagonally across the middle. Push the same corner. It barely budges.",
            "Now build a plain three-stick triangle and see how much more solid it feels.",
            "Chain a few triangles together in a row and find out what you can hold up.",
          ] },
          { type: "callout", accent: "purple", text: "At our bridge workshops, the winners are always built from a connected run of triangles. Students who understand why build stronger bridges, and when one does break they already know where to look." },
        ] },
        { title: "What This Means for Your Bridge", blocks: [
          { type: "paragraphWithLink", before: "Ready to build one and want the step-by-step? Our ", linkText: "popsicle stick bridge project guide", href: "/projects/popsicle-stick-bridge", after: " walks through a full truss bridge using everything above." },
          { type: "ctaLink", title: "Build a Truss Bridge", text: "At our engineering workshops, students build popsicle stick bridges and then pile on weight until something finally gives.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "how-engineers-think-when-something-breaks": {
      title: "How Engineers Think When Something Breaks",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m4,
      image: "/images/blog/Failed Bridge.jpeg",
      imageAlt: "Students testing a failed bridge with books during an Avanza STEM engineering workshop",
      imageCaption: "A structure that just failed is not a loss. It is data. Students examine where and why the break happened before thinking through the next improvement.",
      imageFit: "contain",
      endingProject: { href: "/projects/popsicle-stick-bridge", label: "Try this project: build a popsicle stick bridge" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Something breaks at almost every workshop we run. A bridge folds under the books. A tower drops the second one more block goes on. A cardboard rover tips over on its first roll. And here is the interesting part: the student who built it usually knows what went wrong before anyone says a word." },
          { type: "paragraph", text: "That flash of recognition, the \"oh, it snapped right at the joint because I rushed the glue,\" is the best thing that happens all session. Nothing failed. You just got handed information." },
          { type: "youtube", videoId: "xPp8R64YEHQ", title: "How engineers think when something breaks", caption: "A quick look at the mindset engineers use when a design fails." },
        ] },
        { title: "The First Question an Engineer Asks", blocks: [
          { type: "paragraph", text: "When something breaks, an engineer does not ask \"what did I do wrong?\" They ask a much better question: where did it break, and what is that telling me?" },
          { type: "paragraph", text: "A bridge that snaps in the middle just told you the middle was weakest. A joint that pulls apart just told you the connection could not take it. The break is basically leaving you notes for the next build." },
          { type: "callout", title: "Engineering Framing", accent: "purple", text: "A structure that broke is useful. A structure nobody ever tested tells you absolutely nothing." },
        ] },
        { title: "The Improve Loop", blocks: [
          { type: "paragraph", text: "Engineers run in circles on purpose. The design loop is not a straight shot from idea to success. It goes like this:" },
          { type: "numbered", items: [
            { title: "Define the goal", body: "Get specific. Hold 5 pounds? Span 30 centimeters? Weigh as little as humanly possible? Vague goals give you vague results." },
            { title: "Build a first version", body: "Do not chase perfect. Chase testable. You want something you can put weight on in the next ten minutes." },
            { title: "Test it for real", body: "Put the actual load on it. Guessing how it would probably do is not a test." },
            { title: "Watch what failed", body: "Not just that it broke, but exactly where and how. That detail is your data." },
            { title: "Change one thing", body: "Change three things at once and you will never know which one saved you." },
            { title: "Test again", body: "Go again. Every round hands you more than the round before it." },
          ] },
        ] },
        { title: "What This Looks Like at Avanza STEM Workshops", blocks: [
          { type: "paragraph", text: "In a bridge session, most groups build once and test once. That is still plenty. When the bridge starts to bend, then twist, then finally give out, everyone in the room can see which part was carrying the most." },
          { type: "paragraph", text: "The real moment comes after. Where did it fail? Why that spot? If you built a second one tomorrow, what gets reinforced first?" },
          { type: "callout", accent: "purple", text: "One build is enough to learn the whole mindset: design it, test it honestly, study the wreckage, and say out loud what version two would do differently." },
        ] },
        { title: "The One Change Rule", blocks: [
          { type: "paragraph", text: "This one matters more than students expect. After something breaks, change exactly one thing before you test again." },
          { type: "paragraph", text: "Say your bridge breaks and you rebuild it with better joints AND a new truss shape AND extra bracing. Maybe it holds more. So what? You have no idea which change did it, so you cannot use any of it next time. You did not learn. You got lucky." },
          { type: "callout", accent: "purple", text: "Change one thing. Test. Watch. Then change the next thing. That is how engineers find out what actually works." },
        ] },
        { title: "This Thinking Works Everywhere", blocks: [
          { type: "paragraph", text: "None of this is only about structures. Observe, guess, test, improve. The same loop shows up all over your life:" },
          { type: "list", items: [
            "Science: an experiment that flops is telling you something specific about your setup or your hypothesis",
            "Coding: a crash hands you an error message. Read it before you touch a single line",
            "Math: a wrong answer points at the step to go back to. It is not a verdict on you",
            "Sports: a missed shot is feedback on your stance or your timing, not a reason to quit",
          ] },
          { type: "ctaLink", title: "Join a Free Engineering Workshop", text: "At our engineering workshops, students build something, break it on purpose, and use what they see to make the next one better.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "design-a-mars-rover-out-of-cardboard": {
      title: "Design a Mars Rover Out of Cardboard",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m5,
      image: "/images/blog/Cardboard Mars Rover.jpeg",
      imageAlt: "Students working on a hands-on engineering design challenge at an Avanza STEM workshop",
      imageCaption: "Engineering challenges at Avanza STEM start with a design brief and constraints, then end with a real test.",
      endingProject: { href: "/projects/rover-wheels", label: "Try this project: rover wheels vs. sand" },
      endingSecondary: { href: "/projects/popsicle-stick-bridge", label: "See this project: popsicle stick bridge" },
      endingRelatedSlug: "how-engineers-think-when-something-breaks",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "NASA's Mars rovers work 140 million miles from the nearest repair shop. A wheel cracks, a sensor dies, and there is nobody out there to fix it. Ever. Every single design choice gets made with that in mind." },
          { type: "paragraph", text: "You are not building for 140 million miles today. But you are stuck with the same kinds of limits: whatever materials you can find, a weight you cannot exceed, ugly terrain, and a rover that has to actually work when someone tests it in front of you." },
        ] },
        { title: "The Mission Brief", blocks: [
          { type: "callout", title: "Your Mission", accent: "purple", text: "Build a Mars rover out of cardboard, tape, and whatever else is around. It has to carry a payload, cross rough ground, and survive a drop. The clock says 45 minutes. Go." },
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
          { type: "paragraph", text: "Real engineers get graded against specific requirements, not vibes. Here are yours:" },
          { type: "numbered", items: [
            { title: "Carry a payload", body: "Balance a small cup holding 3 quarters or 3 rocks on top. If it tips, you failed the mission." },
            { title: "Clear terrain", body: "Roll over a crumpled piece of notebook paper without getting stuck or stalling out." },
            { title: "Survive a drop", body: "Drop it from knee height. It has to stay in one piece and still roll afterward." },
            { title: "Bonus: the arm", body: "Add something that reaches out from the body, like a rover arm, and can dip toward the ground while the rover itself stays put." },
          ] },
        ] },
        { title: "Your Design Constraints", blocks: [
          { type: "paragraph", text: "Every real engineering job comes with rules you did not pick. Working inside them is the whole job. Here are yours:" },
          { type: "list", items: [
            "It has to fit inside a shoebox",
            "No hot glue. Tape and fasteners only",
            "Wheels have to be round. Actually round, not sort of round",
            "45 minutes on the clock",
            "Before you test, you have to explain one choice you made and why",
          ] },
        ] },
        { title: "Engineering Questions to Think Through Before You Build", blocks: [
          { type: "numbered", items: [
            { title: "How many wheels?", body: "Four beats three for stability, but every wheel you add is more weight and one more thing that can snap. Real rovers run six, each one mounted so it moves on its own. That way a single rock does not flip the whole vehicle." },
            { title: "Where is the weight?", body: "Weight up high tips easy. Weight down low stays put. Get your heavy parts as close to the ground as you can." },
            { title: "How wide is the wheelbase?", body: "The gap between your left and right wheels is called track width. Wider is harder to tip sideways. Narrower squeezes through tight spots. Pick your problem." },
            { title: "What happens when one wheel hits a bump?", body: "With a rigid axle, one bump lifts that entire side of the rover. Real rovers use rocker-bogie suspension so each wheel can move on its own. Now the fun question: can you fake that with cardboard and tape?" },
          ] },
        ] },
        { title: "Test It, Then Ask These Questions", blocks: [
          { type: "list", items: [
            "Did it tip during the payload test? Where was all the weight sitting?",
            "Did the crumpled paper stop it? Did a wheel sink in, or did the body drag?",
            "Did it survive the drop, and if not, what gave out first?",
            "If someone handed you ten more minutes, what is the one thing you would change?",
          ] },
          { type: "paragraph", text: "Write the answers down or sketch them. That page is the difference between a first build and a genuinely better second one." },
          { type: "quote", text: "One student added a ramp on the front of his rover using a bent strip of cardboard. He said it was for pushing rocks out of the way. I asked if he had seen that on a real rover. He said no, he just thought it would help. That is the right kind of thinking.", attribution: "Noah Lopez, Avanza STEM mentor" },
        ] },
        { title: "The Real Rover Connection", blocks: [
          { type: "paragraph", text: "Perseverance, the rover currently rolling around Mars, weighs about 1,025 kilograms and rides on six wheels that each move independently. It hauls cameras, a microphone, a drill, and a whole helicopter named Ingenuity. Every piece had to be light enough to launch, tough enough to survive landing, and reliable enough to keep working for years with nobody around to help." },
          { type: "paragraph", text: "Weight distribution, wheel count, ground clearance, payload. Those are the exact questions rover engineers argue about at NASA. You are answering the same ones. The only difference is the budget." },
          { type: "ctaLink", title: "Try Engineering in Person", text: "At our workshops, students take on design challenges like this one and find out fast whether their build holds up.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "what-is-ai-actually-doing-when-it-answers-you": {
      title: "What Is AI Actually Doing When It Answers You?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      image: "/images/blog/What AI actually does.jpg",
      imageAlt: "A glowing AI graphic above a tablet with digital network lines in the background",
      imageCaption: "At Avanza STEM AI workshops, students learn to ask what an AI is actually doing, not just whether the answer sounds right.",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-is-ai-explaining-to-kids",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You type a question into an AI chat, and three seconds later there is a whole paragraph sitting there. So what just happened? Most people figure it searched the web, or pulled the answer out of some giant database, or looked it up in stored knowledge somewhere. None of those are right." },
          { type: "paragraph", text: "What actually happened is weirder. The AI predicted what text should come next, one word at a time, based on patterns it picked up from an enormous pile of writing. That is it. And honestly, that is more interesting than the version people imagine." },
        ] },
        { title: "It Is Closer to Autocomplete Than a Search Engine", blocks: [
          { type: "callout", accent: "teal", text: "Think about autocomplete on your phone. It guesses your next word based on what usually follows in messages like yours. A language model is doing a version of that, just enormously more sophisticated." },
          { type: "paragraph", text: "When an AI writes you a response, it is not pulling a saved answer off a shelf. It is working out which word is most likely to come next given everything before it, then doing that again, and again, until the answer is finished." },
          { type: "paragraph", text: "That is why it comes back so fast. It is not sitting there reasoning through your problem the way you would. It is running a very quick pattern calculation, over and over." },
        ] },
        { title: "How the AI Learned What to Say", blocks: [
          { type: "numbered", items: [
            { title: "It read an absurd amount of text", body: "Articles, books, websites, code, all of it. That gave the model billions of examples of how people actually use language." },
            { title: "It found patterns", body: "Not rules somebody typed in. Statistical patterns: after this combination of words, these words tend to show up. The patterns get too tangled to explain in a sentence, but patterns are all they are." },
            { title: "People graded it", body: "Humans rated which responses were more helpful, more accurate, and more appropriate. The model shifted based on that feedback." },
            { title: "Now it answers you", body: "You ask something, and it uses all those patterns to produce text shaped like a helpful answer, based on the helpful answers it saw during training." },
          ] },
        ] },
        { title: "Why It Can Sound Right and Be Wrong", blocks: [
          { type: "paragraph", text: "Here is the catch. The AI is generating text that is statistically likely, not text that has been checked. So it can hand you something confident, polished, and flat-out wrong. People call that a hallucination: the AI says something untrue in the exact tone it uses for things that are true." },
          { type: "list", items: [
            "It does not know what it does not know",
            "It can blend similar names, dates, or events from totally different situations",
            "It produces what sounds plausible, not what has been verified",
            "It cannot go look something up mid-sentence to check itself",
          ] },
          { type: "callout", title: "The Honest Version", accent: "teal", text: "An AI that admits \"I am not sure about this\" is more useful than one that sounds certain every single time. Ask follow-ups. Verify the claims that actually matter." },
        ] },
        { title: "What AI Is Actually Good At", blocks: [
          { type: "paragraph", text: "Knowing the limits is what lets you use AI well, instead of either trusting it blindly or refusing to touch it." },
          { type: "list", items: [
            "Explaining the same idea five different ways until one finally clicks",
            "Spitting out outlines, rough drafts, and examples in seconds",
            "Summarizing topics that are well covered in what it trained on",
            "Brainstorming when you are stuck and need options",
            "Editing and rewriting something you already made",
            "Writing code that you then run and test yourself",
          ] },
          { type: "paragraph", text: "When the answer has to be provably right, like a specific fact, a medical question, or anything legal, go check it against a real source. Every time." },
        ] },
        { title: "A Good Habit: Ask It to Explain Itself", blocks: [
          { type: "paragraph", text: "Next time an AI gives you an answer, hit it with a follow-up: \"how do you know that?\" or \"where would I go to verify this?\" What comes back tells you a lot." },
          { type: "callout", accent: "teal", text: "In our AI workshops, we have students pick one AI response and try to fact-check it. The point is not to teach kids that AI is bad. It is to read it like you would read any source, with your brain switched on." },
          { type: "quote", text: "I asked it about a scientist and it got the discovery date wrong by thirty years. I would have just believed it if we had not checked. Now I check things.", attribution: "Student at an Avanza STEM AI workshop" },
        ] },
        { title: "What This Means for Kids and Parents", blocks: [
          { type: "paragraph", text: "Kids are going to grow up with these tools no matter what. Knowing roughly what the tools do, and what they definitely do not do, changes how a kid reads every answer they get." },
          { type: "list", items: [
            "Lean on AI for brainstorming and drafting more than for pinning down specific facts",
            "Check anything important against a second source",
            "Get suspicious when it sounds too confident, then ask a follow-up",
            "Remember it is not always wrong. It is just not always right either",
          ] },
          { type: "paragraphWithLink", before: "Want the basics on how AI learns from data and what the different types are? Start with our earlier guide: ", linkText: "What is AI? Explaining Artificial Intelligence to Kids", href: "/blog/what-is-ai-explaining-to-kids", after: "." },
          { type: "ctaLink", title: "Learn About AI in Person", text: "At our AI workshops, students build simple AI systems, hunt for the mistakes they make, and talk through what they found.", linkText: "See upcoming workshops", href: "/workshops", accent: "teal" },
        ] },
      ],
    },
    "how-to-think-like-an-inventor-in-20-minutes": {
      title: "How to Think Like an Inventor in 20 Minutes",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m5,
      image: "/images/blog/kid thinking.jpg",
      imageAlt: "A child thinking with question marks and a glowing lightbulb drawn above them",
      imageCaption: "At Avanza STEM workshops, students skip straight to building something and figure out what to fix from there.",
      endingProject: { href: "/projects/egg-drop-budget", label: "Try this project: egg drop on a budget" },
      endingSecondary: { href: "/blog/why-your-first-design-is-usually-not-your-best-one", label: "Read next: why your first design is usually not your best one" },
      endingRelatedSlug: "why-your-first-design-is-usually-not-your-best-one",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Almost every invention you can name started with somebody getting annoyed. The zipper exists because shoelaces kept coming undone. Post-it notes came out of a glue that was too weak to be useful. Velcro came from a guy walking through a field and picking burrs off his dog." },
          { type: "paragraph", text: "None of them sat down planning to invent something. They noticed something that bugged them and asked one question: what if there were a better way to do this?" },
        ] },
        { title: "The Inventor Loop", blocks: [
          { type: "paragraph", text: "No lab, no special kit, no permission needed. Four steps and about twenty minutes is enough." },
          { type: "numbered", items: [
            { title: "Find a problem", body: "Go small and annoying. A door that keeps swinging shut. A charger that never stays plugged in. A zipper that snags on the same tooth every time. Tiny frustrations beat huge ones, because you can actually test a fix for a tiny one." },
            { title: "Sketch a solution", body: "Draw the fix. Even a lumpy shape on notebook paper counts. You are not making art. You are making your idea specific enough that someone could argue with it." },
            { title: "Build a rough prototype", body: "Whatever is nearby works: paper, tape, cardboard, rubber bands. It does not have to look good. It has to be testable." },
            { title: "Test it", body: "Now try to break it. If it survives the first try easily, your test was too soft. Find the weak spot. Congratulations, that is your next problem." },
          ] },
        ] },
        { title: "Finding Problems Worth Solving", blocks: [
          { type: "paragraph", text: "Step one trips up most students, and not because the world is short on problems. It is because we all get really good at ignoring small annoyances instead of noticing them." },
          { type: "callout", accent: "purple", text: "At our workshops we give students one quiet minute to walk the room and write down three things that could work better. Almost everybody comes back with at least two." },
          { type: "list", items: [
            "What takes way longer than it should?",
            "What breaks more often than it should?",
            "What are you always holding in some awkward way?",
            "What do you do every single day that you wish you did not have to?",
          ] },
          { type: "paragraph", text: "Then pick the smallest one on your list. A problem you can hold in your hands is far easier to invent for than one the size of a city." },
        ] },
        { title: "Why Sketching Matters Before Building", blocks: [
          { type: "paragraph", text: "A sketch is not a drawing. It is a decision. The second you put it on paper you have to commit: the hinge goes here, this side opens, the grip is about this wide." },
          { type: "paragraph", text: "That commitment is what makes the idea testable. Skip the sketch and you just adjust as you go, which works, but it is slower and you never notice when reality drifted away from your plan. With a sketch, you can see the gap." },
          { type: "callout", title: "One Rule", accent: "purple", text: "Do not touch a single material until you have drawn at least one version. The sketch does not have to be good. It just has to exist." },
        ] },
        { title: "What Counts as a Prototype", blocks: [
          { type: "paragraph", text: "A prototype is the fastest version of your idea that you can actually test. It is not a product. It is not supposed to be pretty. Its only job is to teach you something you did not already know." },
          { type: "list", items: [
            "Tape instead of glue, because you will be pulling it apart in five minutes",
            "Use the simplest shape that tests the one thing you care about",
            "Build to answer one question: does the hinge hold? does it fit? does it slide?",
            "If it takes more than 10 minutes, you are overbuilding it",
          ] },
        ] },
        { title: "The 20-Minute Inventor Challenge", blocks: [
          { type: "summary", timeLabel: "Time", time: "20 minutes total", ageLabel: "Best for", age: "Ages 8 and up", supervisionLabel: "Materials", supervision: "Paper, tape, cardboard, scissors, rubber bands, anything you can find", learnLabel: "What you practice", learn: "Problem identification, design thinking, rapid prototyping, and iteration" },
          { type: "callout", title: "Try This Now", accent: "purple", text: "Set a timer for 20 minutes. Find one problem in the room. Sketch one fix. Build one rough version. Test it once. Then write down the single thing you would change with ten more minutes." },
          { type: "quote", text: "She decided to fix the way her pencil always rolled off her desk. She taped a small cardboard lip along the edge. It worked. Then she started asking what else she could fix.", attribution: "Avanza STEM mentor at an engineering workshop" },
        ] },
      ],
    },
    "why-your-first-design-is-usually-not-your-best-one": {
      title: "Why Your First Design Is Usually Not Your Best One",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m4,
      image: "/images/workshops/past-engineering.jpg",
      imageAlt: "A student examining a structure that just collapsed during a load test at an Avanza STEM workshop",
      imageCaption: "The moment a bridge collapses is not the end of the session. It is usually the beginning of the real learning.",
      endingProject: { href: "/projects/egg-drop-budget", label: "Try this project: egg drop on a budget" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "how-engineers-think-when-something-breaks",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Bridges fall at almost every engineering workshop we run. And the kids who built them almost always wear the same expression afterward. Not crushed. Thinking." },
          { type: "paragraph", text: "That face is what iteration looks like from the inside. Even when there is no time left to rebuild, the test rewires how a student sees their own design." },
        ] },
        { title: "The Myth of the Finished Design", blocks: [
          { type: "paragraph", text: "There is this idea that good designs come from a smart person thinking very hard before they touch anything. Engineering does not work like that. Neither does writing, or music, or basically anything else worth doing." },
          { type: "paragraph", text: "Designs get better by crashing into reality. You cannot think your way to a stronger bridge from a chair. You build one, you load it up, you watch what breaks, and then you know something you did not know before." },
          { type: "callout", title: "The Core Idea", accent: "purple", text: "Your first design is not a product. It is a guess. The test is how you find out whether the guess was any good." },
        ] },
        { title: "A Real Workshop Example", blocks: [
          { type: "paragraph", text: "At a bridge session at Clifton Public Library, one group finished their popsicle stick bridge, started stacking books on it, and watched one whole side twist before the thing finally let go." },
          { type: "numbered", items: [
            { title: "The first clue: it twisted sideways", body: "Before anything snapped, they noticed one side leaning further than the other. That was the tell. The problem was not just too much weight. The support was uneven." },
            { title: "The weak point: no diagonal bracing", body: "Their side trusses were long open rectangles instead of triangles. Pile on enough weight and those rectangles just change shape, and the whole bridge goes soft." },
            { title: "The quick fix: one targeted reinforcement", body: "With the minutes they had left, they braced the weaker side diagonally and talked through where the matching braces would go on version two." },
            { title: "The takeaway: the test handed them a better design", body: "They never rebuilt the whole bridge, and they did not need to. One honest test told them exactly what the next one has to survive." },
          ] },
          { type: "quote", text: "It failed right where we didn't add reinforcement hot glue", attribution: "Monica, a student at an Avanza STEM engineering workshop" },
        ] },
        { title: "Why Starting Over Is Not Starting from Scratch", blocks: [
          { type: "paragraph", text: "Changing something after a test is not starting over. You are carrying forward information your first design never had access to." },
          { type: "callout", accent: "purple", text: "Iteration does not always mean rebuilding the entire thing before the session ends. Sometimes it is one smart adjustment, one better sketch, or one clear note scribbled down for next time." },
          { type: "paragraph", text: "This is the thing about experienced engineers. They are not necessarily better on the first attempt. They are just much better at reading what the first attempt is telling them." },
        ] },
        { title: "The One Improvement Rule", blocks: [
          { type: "paragraph", text: "When something fails and you have time to fix it, change exactly one thing before you test again. Sounds easy. It is not, because every instinct in your body wants to fix all of it at once." },
          { type: "paragraph", text: "Change three things and the next version holds more? Great, but which change did it? You have no idea. You got lucky, and luck does not carry over to the next build." },
          { type: "list", items: [
            "Pick the change that goes after the exact thing that failed",
            "Make that one change if the clock allows it",
            "Test again the same way, so the comparison actually means something",
            "Write down what happened, or what you want to try next",
            "Let that note drive the next design",
          ] },
          { type: "ctaLink", title: "Build Something and Test It", text: "At our engineering workshops, students build a structure, load it until it fails, and work out what the wreckage is telling them.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "the-engineering-of-a-backpack": {
      title: "The Engineering of a Backpack",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m5,
      image: "/images/blog/backpacks.webp",
      imageAlt: "A row of backpacks showing different sizes, materials, straps, zippers, and pocket layouts",
      imageCaption: "Backpacks are everyday engineering: weight distribution, materials, zippers, straps, and pockets all have to work together.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM workshop" },
      endingSecondary: { href: "/blog/how-to-think-like-an-inventor-in-20-minutes", label: "Read next: how to think like an inventor in 20 minutes" },
      endingRelatedSlug: "how-to-think-like-an-inventor-in-20-minutes",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "The bag on your shoulders right now is quietly solving about a dozen engineering problems at once. The straps keep the weight off your hands. The padded panel spreads pressure across your back. The zippers open and shut thousands of times and somehow keep working. The fabric is strong, light, mostly waterproof, and cheap enough that a student can afford it." },
          { type: "paragraph", text: "None of that is an accident. Somebody sat down with each of those problems, argued about it, tested a fix, and then tested it again." },
        ] },
        { title: "The Weight Distribution Problem", blocks: [
          { type: "paragraph", text: "Carry 10 pounds in one hand for a block and your arm is done. Carry the same 10 pounds on your back and you barely notice. That is not toughness, it is physics. A bag hanging off your hand creates a moment arm, which multiplies how hard your muscles have to work. A backpack parks that weight right up against your spine, and the math gets a lot friendlier." },
          { type: "paragraph", text: "Those shoulder straps are doing more than holding the bag on. A wider strap spreads the exact same weight across more surface, so the pressure on any one spot drops. Snowshoes work off the same idea. Padding helps too, because it squishes a little and evens out the load instead of digging into one line." },
          { type: "callout", title: "Weight Loading Order", accent: "purple", text: "Heavy stuff goes closest to your back, light stuff goes toward the outside. That keeps the center of mass near your spine instead of pulling you forward and wrecking your lower back." },
        ] },
        { title: "How a Zipper Actually Works", blocks: [
          { type: "paragraph", text: "Look closely at a zipper and you will see two rows of teeth facing each other. Every tooth has a little bump on one face and a matching hollow on the other. When you pull the slider, it lines each tooth up so the bump on one side drops into the hollow on the other. Click. Click. Click." },
          { type: "paragraph", text: "That is why a closed zipper feels so solid. Those interlocked teeth refuse to pull apart and refuse to slide sideways. Going the other direction, the slider wedges a tiny blade between the rows and pops the teeth apart one pair at a time." },
          { type: "list", items: [
            "Metal zippers last longer but weigh more",
            "Plastic coil zippers are lighter and bend around curved seams",
            "YKK makes most of the world's zippers, and you will find that logo on almost any decent bag",
            "Zippers usually fail because the slider got stretched too wide, and a gentle squeeze with pliers can sometimes bring it back",
          ] },
        ] },
        { title: "Materials and Trade-offs", blocks: [
          { type: "paragraph", text: "There is no perfect backpack fabric. Every option trades weight against durability against water resistance against price, and somebody had to pick." },
          { type: "numbered", items: [
            { title: "Nylon", body: "Strong, light, and it shrugs off scraping. Most expensive packs use it because it survives years without weighing much." },
            { title: "Polyester", body: "A bit heavier than nylon, cheaper, and it does not fade as fast in the sun. This is what most school backpacks are made of." },
            { title: "Canvas", body: "Tough and heavy, but it drinks water. Fine for a walk to class, rough choice for a rainy hike." },
            { title: "Ripstop", body: "A weave with a grid of reinforcing threads baked in. Tear it and the grid stops the rip from spreading. You see this on high-performance packs." },
          ] },
          { type: "paragraph", text: "Here is the part most people do not know: water resistance comes from a coating on the inside of the fabric, not from the fabric itself. That coating wears away over the years, which is why an old bag soaks through even though the outside still looks fine." },
        ] },
        { title: "The Pocket System", blocks: [
          { type: "paragraph", text: "Nobody scattered those pockets randomly. Each one is a bet somebody made about how you carry your stuff." },
          { type: "list", items: [
            "The main compartment is sized around notebooks, a laptop sleeve, or a folded hoodie",
            "The front pocket holds what you grab constantly and do not want floating loose",
            "Side pockets are shaped for water bottles because that shape is everywhere and easy to predict",
            "The little top pocket is for what you need without unzipping the whole bag",
            "The internal organizer assumes you are carrying pens, keys, and a phone",
          ] },
          { type: "callout", title: "Try This", accent: "purple", text: "Grade your own backpack the way an engineer would. Score it 1 to 5 on weight distribution, zipper quality, fabric and water resistance, pocket layout, and how the straps feel after ten minutes of walking. Now the real question: what would you fix first?" },
        ] },
      ],
    },
    "what-makes-a-stem-workshop-fun": {
      title: "What Makes a STEM Workshop Fun?",
      category: "Community",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m5,
      image: GALLERY_IMAGE_7,
      imageAlt: "Students and families actively building, testing, and discussing at an Avanza STEM community workshop",
      imageCaption: "A workshop where kids are talking, building, and arguing is working. A quiet room usually is not.",
      endingProject: { href: "/workshops", label: "See upcoming Avanza STEM workshops" },
      endingSecondary: { href: "/host", label: "Host a workshop in your community" },
      endingRelatedSlug: "building-a-community-stem-workshops",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "If students are sitting still watching an adult demonstrate something, that is not a STEM workshop. That is a presentation. And presentations, even the good ones, are basically gone by breakfast the next day." },
          { type: "paragraph", text: "So we put as much work into designing the session as we do into the content. What kids do in that room beats anything we could say at them." },
        ] },
        { title: "The Difference Between Active and Passive", blocks: [
          { type: "paragraph", text: "Passive learning is watching, listening, receiving. Active learning is building, testing, arguing, breaking something and fixing it. The research on which one sticks is not exactly a close call." },
          { type: "paragraph", text: "But keeping hands busy is not the same as thinking. A kid can glue popsicle sticks for thirty minutes on autopilot. The trick is designing the activity so the doing forces the thinking." },
          { type: "callout", accent: "purple", text: "Nobody watches a mentor build a bridge at our workshops. Students get materials, a weight target, and about 30 minutes. The frustration, the arguing with a partner over the design, the moment it holds way more than anyone expected: that is where the learning actually happens." },
        ] },
        { title: "How We Design Avanza STEM Activities", blocks: [
          { type: "paragraph", text: "Before any activity makes it into a session, it has to survive four questions." },
          { type: "numbered", items: [
            { title: "Is there a real test?", body: "If students cannot find out whether their idea worked, it is not a design challenge, it is an art project. Every activity ends with a verdict. Does the bridge hold? Does the rover make it across? Does the code run?" },
            { title: "Can it fail in an interesting way?", body: "Useful failure is a feature, not a bug. If something either works or falls apart for no clear reason, there is nothing to iterate on. The best failures are specific enough that a student knows exactly what to fix." },
            { title: "Is there more than one way in?", body: "A challenge with one right answer becomes a race. A challenge with several good approaches lets students make real decisions and then compare results with the table next to them." },
            { title: "Are they talking to each other?", body: "Two students going back and forth about whether to add another diagonal or reinforce the joint are not off task. They are doing engineering." },
          ] },
        ] },
        { title: "What Students Actually Do at Our Workshops", blocks: [
          { type: "paragraph", text: "In one 60-minute session, a student usually moves through five or six different things:" },
          { type: "list", items: [
            "Hear a two-minute prompt with the goal and the constraints, and nothing else",
            "Argue with a partner about the design before touching a single material",
            "Build version one and test it, usually watching it fail",
            "Make one specific change based on what they just saw",
            "Test again and find out whether that change actually helped",
            "Tell the group what they learned. Not what they built. What they found out",
          ] },
          { type: "paragraph", text: "That last step is the one almost every workshop skips. The second a student has to put it into words, they discover whether they understood it or just got lucky." },
        ] },
        { title: "Why Noise Is Usually a Good Sign", blocks: [
          { type: "paragraph", text: "A quiet room makes adults comfortable. It usually means the students checked out. When kids are talking over each other, even arguing, that room is thinking." },
          { type: "quote", text: "I thought they were getting off track because they were so loud about the zipper thing. But then I listened and they were actually debating whether friction was higher on the outside or inside of the curve. That is exactly what we wanted.", attribution: "Avanza STEM mentor after a science session" },
          { type: "paragraph", text: "In that moment, a mentor's job is not to quiet anybody down. It is to drop in one question that makes the argument sharper." },
        ] },
        { title: "The Three Things We Always Include", blocks: [
          { type: "numbered", items: [
            { title: "A real test with a real result", body: "Not \"great job everyone.\" An actual pass or fail against the goal we said out loud at the start." },
            { title: "A specific way to fail", body: "If everything works on the first try, nobody found out where the limits were." },
            { title: "Time to say what they figured out", body: "Building with no reflection is just activity. The reflection is where it locks in." },
          ] },
          { type: "ctaLink", title: "Come See a Workshop", text: "Our workshops are free, hands-on, and open to anybody. You can walk in having never built a thing in your life.", linkText: "See upcoming workshops", href: "/workshops", accent: "purple" },
        ] },
      ],
    },
    "engineering-inside-school-bus": {
      title: "The Secret Engineering Inside a School Bus",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m5,
      image: "/images/blog/Engineering a School Bus Medium.jpeg",
      imageAlt: "A yellow school bus showing its distinctive safety-yellow color, oversized mirrors, and emergency exit markings",
      imageCaption: "Engineering is not just found in labs and factories. It is packed into every vehicle you ride, including the school bus.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/the-engineering-of-a-backpack", label: "Read next: the engineering of a backpack" },
      endingRelatedSlug: "the-engineering-of-a-backpack",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A school bus looks about as simple as a vehicle gets. Big yellow box, rows of seats, flashing lights, an engine you can hear from two streets away. But almost every piece of that bus is an answer to one question somebody had to solve: how do you move a crowd of kids and get every single one of them home safe?" },
          { type: "paragraph", text: "Once you know what to look for, the bus stops being boring. Let's take it apart." },
        ] },
        { title: "Why Are School Buses Yellow?", blocks: [
          { type: "paragraph", text: "Nobody picked that yellow because it looked nice. It was chosen because your eye catches it in early morning light, in flat afternoon glare, and under a gray sky. Safety designers wanted a color that drivers spot before they have consciously registered anything." },
          { type: "paragraph", text: "Then stack on the flashing lights, the swing-out stop sign, and the sheer size of the thing. All of it is saying the same sentence: slow down, there are kids here. The bus is engineered to be impossible to ignore." },
        ] },
        { title: "The Seats Are Safety Tools", blocks: [
          { type: "paragraph", text: "Those seats look plain, but they are doing serious work. Most buses use a trick called compartmentalization: seats are tall, heavily padded, and packed close together on purpose. If the bus stops hard, the seat back in front of you catches you like a cushioned wall." },
          { type: "paragraph", text: "Underneath, the frames are built tough enough to survive potholes, sharp turns, and about a decade of students climbing over them. A bus seat is not furniture. It is part of the safety system." },
        ] },
        { title: "Why Can the Driver See So Much?", blocks: [
          { type: "paragraph", text: "A bus driver has to track the road, the kids, the door, the sidewalk, and every car around them, all at once. That is why the mirrors look almost comically large. Some cover what is behind the bus. Others are angled to catch the blind spot right in front of the bumper, where a small kid could disappear completely." },
          { type: "paragraph", text: "Visibility is one of the hardest problems on a vehicle this size. Engineers are basically inventing ways for the driver to see around the bus itself." },
        ] },
        { title: "Turning a Giant Vehicle", blocks: [
          { type: "paragraph", text: "A bus is way longer than a car, which makes every turn a math problem. Engineers call it turning radius: how much room a vehicle needs to swing around. On a narrow street, a bus needs a lot more of it than your family car." },
          { type: "paragraph", text: "So when a driver swings wide before making a turn, they are not showing off. They are obeying geometry." },
        ] },
        { title: "Emergency Exits Are Everywhere", blocks: [
          { type: "paragraph", text: "Count the exits next time you get on. Front door, rear emergency door, roof hatches, push-out windows. Good engineering does not just plan for the normal day. It plans for the day nothing goes normally." },
          { type: "callout", title: "Why So Many Exits?", accent: "purple", text: "What if the front door is blocked? What if the bus ends up tilted? What if forty kids need to get out in under a minute? Engineers ask the what-ifs long before anybody lives through one." },
        ] },
        { title: "Try This: Design Your Own Safer Bus", blocks: [
          { type: "paragraph", text: "Grab paper and draw your own bus. Put in mirrors, exits, a seat layout, lights, signs, windows, storage. Here is the rule: for every single part you draw, you have to say what problem it solves." },
          { type: "callout", title: "The Engineer's Question", accent: "purple", text: "Engineers do not ask \"does this look cool?\" They ask \"what does this do, and what problem does it solve?\" Run that question over every line in your drawing and see what survives." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Next time a school bus rolls past you, actually look at it. The color, the mirrors, the seats, the exits, even the way it takes a corner. Every one of those is a decision somebody made on purpose. That bus is engineering on wheels." },
        ] },
      ],
    },
    "why-airplane-wings-are-curved": {
      title: "Why Are Airplane Wings Curved?",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m5,
      image: "/images/blog/United_Airlines_Boeing_777-200 With Curved Wings.jpg",
      imageAlt: "A United Airlines Boeing 777-200 in flight, with its curved airfoil wings and upturned winglets clearly visible",
      imageCaption: "Airplane wings are not flat boards. Their curved airfoil shape creates the pressure difference that lifts a hundred-ton aircraft off the ground.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-triangles-are-an-engineers-secret-weapon", label: "Read next: why triangles are an engineer's secret weapon" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Wings have maybe the wildest job in all of engineering. A Boeing 777 weighs around 300,000 pounds fully loaded, and two wings talk it into the sky. Sit with that for a second. How does something that heavy get off the ground?" },
          { type: "paragraph", text: "Most of the answer is hiding in the shape." },
        ] },
        { title: "Wings Are Not Flat", blocks: [
          { type: "paragraph", text: "Look at a wing from the side sometime. It is not a flat board. The top curves up and over while the bottom stays much flatter. Engineers call that shape an airfoil, and it exists for one reason: to mess with air in a very specific way." },
          { type: "paragraph", text: "As the plane pushes forward, air splits and flows around the wing. That shape leaves the air above the wing at lower pressure than the air below it. Higher pressure underneath, lower pressure on top, and the wing gets shoved upward. That shove is lift." },
        ] },
        { title: "Lift Is Not Magic", blocks: [
          { type: "paragraph", text: "Lift is not one clever trick, and it is definitely not magic. A wing works because it changes where air goes. Slice through the sky and the wing throws a bunch of air downward. Newton's third law says every action gets an equal and opposite reaction, so if the wing shoves air down, the air shoves the wing up. Two things are happening at once:" },
          { type: "numbered", items: [
            { title: "It creates a pressure difference", body: "Air moving over the curved top goes faster, and the pressure up there drops below the pressure underneath." },
            { title: "It throws air downward", body: "The wing redirects the airflow toward the ground, and the reaction pushes the plane toward the sky." },
          ] },
        ] },
        { title: "Why Does the Plane Need Speed?", blocks: [
          { type: "paragraph", text: "A plane parked on the runway is not going anywhere, no matter how good its wings are. Wings need air rushing past them to do anything at all. Go faster, move more air, get more lift." },
          { type: "paragraph", text: "That is the whole point of that long sprint down the runway. Engines shove the plane forward, air starts pouring over the wings, and at some exact speed the lift finally beats the weight. Wheels leave the ground." },
        ] },
        { title: "What About the Flaps?", blocks: [
          { type: "paragraph", text: "Watch the wing during takeoff or landing and you will see chunks of it slide out and tilt down. Those are flaps and slats, and they physically change the wing's shape mid-flight to squeeze out more lift at low speed." },
          { type: "paragraph", text: "That matters because takeoff and landing are exactly when a plane cannot go fast. Nobody wants a jet screaming along at 500 miles per hour near the ground, so engineers gave the wing moving parts instead." },
        ] },
        { title: "Try This: Paper Wing Test", blocks: [
          { type: "paragraph", text: "Grab two sheets of paper. Fold one into a basic paper airplane, leave the other flat. Throw both the same way. The folded one goes somewhere. The flat one flutters and dies. Same paper, same throw, completely different shape." },
          { type: "callout", title: "Shape Matters", accent: "purple", text: "Engineers test wing shapes in wind tunnels, in simulations, and eventually on real flights. A change you could cover with your thumb can noticeably change how much lift a wing makes." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Wings curve because shape controls air, air makes lift, and lift beats gravity. So the next time a plane crosses overhead, do not give all the credit to the engines. Those wings are precision tools, quietly turning moving air into a way off the ground." },
        ] },
      ],
    },
    "how-elevators-know-where-to-go": {
      title: "How Elevators Know Where to Go",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m4,
      image: "/images/blog/beautiful modern elevator Medium.jpeg",
      imageAlt: "A sleek modern elevator interior with illuminated floor buttons and polished metallic walls",
      imageCaption: "Behind that simple button press is a system of sensors, motors, counterweights, and logic that moves people safely between floors.",
      endingProject: { href: "/projects/sensor-scavenger-hunt", label: "Try this project: sensor scavenger hunt" },
      endingSecondary: { href: "/blog/how-engineers-think-when-something-breaks", label: "Read next: how engineers think when something breaks" },
      endingRelatedSlug: "how-engineers-think-when-something-breaks",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You press a button. The doors slide shut. Something hums. Thirty seconds later you step out on exactly the floor you wanted. It feels like nothing. It is actually a small machine running sensors, motors, cables, counterweights, and a pile of logic, all so nobody has to think about it." },
          { type: "paragraph", text: "So how does the thing know where you want to go?" },
        ] },
        { title: "The Button Sends a Request", blocks: [
          { type: "paragraph", text: "Pressing the button does not control the motor. You are not driving. You are filing a request with the elevator's control system, which is basically its brain, and that brain is already keeping track of:" },
          { type: "list", items: [
            "Which floor the car is sitting on right now",
            "Every button anybody has pressed",
            "Which direction it is already heading",
            "Whether the doors are open or closed",
            "Whether something is stuck in the doorway",
          ] },
          { type: "paragraph", text: "It never guesses. Every move comes from that list." },
        ] },
        { title: "Sensors Tell the Elevator Where It Is", blocks: [
          { type: "paragraph", text: "An elevator has to know its own position inside the shaft, so sensors track the car the whole way up and down. Those readings tell the system when to start slowing, when to stop, and whether the car is actually level with the floor." },
          { type: "paragraph", text: "That last one matters more than you would think. A car that stops two inches high turns into a tripping hazard for everyone who walks out. So elevators are built to land within a fraction of an inch." },
        ] },
        { title: "Motors Do the Heavy Lifting", blocks: [
          { type: "paragraph", text: "An electric motor spins a pulley, the pulley pulls the cables, and the cables pull the car. Straightforward enough. But here is the clever bit: most elevators also hang a counterweight on the other end. Car goes up, counterweight goes down. Car goes down, counterweight goes up." },
          { type: "paragraph", text: "That balance means the motor is not fighting the full weight of a loaded car. It is more like a seesaw than a crane, and it saves an enormous amount of energy." },
        ] },
        { title: "The Elevator Uses Simple Logic", blocks: [
          { type: "paragraph", text: "Say the car is on floor 1 and people hit buttons for 3, 5, and 2. It does not handle them in the order they arrived. It heads up and grabs 2, then 3, then 5, sweeping in one direction. No wasted trips, nobody waiting forever." },
          { type: "paragraph", text: "In really tall buildings this gets much smarter. Some systems ask where you are going before you board, then group people by destination so each car makes fewer stops." },
        ] },
        { title: "Safety Comes First", blocks: [
          { type: "paragraph", text: "Elevators are stacked with safety systems. Door sensors stop them from closing on your arm. Brakes clamp the car if it moves when it should not. Backup systems take over when a part fails. Engineers spent a long time imagining everything that could go wrong so you never have to." },
        ] },
        { title: "Try This: Elevator Logic Game", blocks: [
          { type: "paragraph", text: "Your turn to be the controller. Draw a 6-floor building and put the car on floor 2. Someone on floor 5 wants to go down. Someone on floor 1 wants to go up. Someone already inside pressed 4. What order do you run them in?" },
          { type: "callout", title: "No Single Right Answer", accent: "purple", text: "There is no perfect solution here, and that is the point. Engineers juggle speed, fairness, safety, and energy use all at once. Which one are you willing to give up?" },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "An elevator does not know anything the way you know things. It reads sensors, runs logic, and turns motors. Next time you ride one, remember there is a whole engineered system working quietly inside the walls, and all you had to do was press a button." },
        ] },
      ],
    },
    "why-buildings-sway-in-wind": {
      title: "Why Do Buildings Sway in the Wind?",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m5,
      image: "/images/blog/Taipei 101 Skyscraper that Sways.jpg",
      imageAlt: "Taipei 101 skyscraper rising above the Taipei skyline, one of the most studied examples of wind-resistant building design",
      imageCaption: "Taipei 101 is engineered to flex by design. In strong typhoon winds, the top can sway nearly a meter, and that is exactly what keeps it standing.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-triangles-are-an-engineers-secret-weapon", label: "Read next: why triangles are an engineer's secret weapon" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Stand near the top of a skyscraper on a windy day and you might feel the floor shift under you. Just slightly. Your brain will immediately tell you something is wrong. Your brain is wrong. That movement is the design working, and a building that can sway a little is usually safer than one that refuses to budge." },
        ] },
        { title: "Wind Pushes on Buildings", blocks: [
          { type: "paragraph", text: "Wind feels like nothing when it goes past your face. Hit a 60-story wall of glass with it and it becomes a serious force. The taller you build, the more of that force you catch. So engineers have to answer some uncomfortable questions before anybody pours concrete: how hard does the wind get here, how tall are we going, what shape catches the least, how much will it move, and will people inside feel sick." },
          { type: "paragraph", text: "A skyscraper is not just holding itself up. It is in a permanent fight with moving air." },
        ] },
        { title: "Flexible Can Be Safer", blocks: [
          { type: "paragraph", text: "Bend a dry stick and it snaps clean. Bend a living branch and it just goes with you. Buildings work the same way. Make one too stiff and a hard wind or a shaking ground has nowhere to send that energy, so it builds up inside the structure until something gives." },
          { type: "paragraph", text: "A building that can flex soaks up some of that energy and spreads the rest around. Bending is not weakness here. It is the plan." },
        ] },
        { title: "Earthquakes Shake Buildings Too", blocks: [
          { type: "paragraph", text: "Wind shoves a building sideways from the outside. An earthquake attacks from underneath. The ground moves, so the bottom of the building moves with it, and everything above has to figure out what to do about that." },
          { type: "paragraph", text: "Engineers fight back with strong frames, flexible joints, shock absorbers, and foundations built to slide or isolate. The goal is almost never to keep the building perfectly still. The goal is to keep it standing and keep everyone inside alive." },
        ] },
        { title: "Some Buildings Have Giant Dampers", blocks: [
          { type: "paragraph", text: "Some skyscrapers hide an enormous weight near the top called a tuned mass damper. Picture a pendulum the size of a room. When the building leans one direction, the damper swings the other way and cancels out the motion." },
          { type: "callout", accent: "purple", text: "It is a giant counter-move built into the building. You cannot see it from the sidewalk, but on a windy day it is the reason nobody upstairs feels seasick." },
          { type: "image", src: "/images/blog/Ball in the middle of Taipei 101.jpg", alt: "The 660-ton golden tuned mass damper ball suspended inside Taipei 101, visible from the observation deck", caption: "Taipei 101's 660-ton golden damper ball hangs near the 88th floor. When wind pushes the building one way, this pendulum swings the opposite direction and cancels out the motion people inside would feel." },
        ] },
        { title: "Shape Matters Too", blocks: [
          { type: "paragraph", text: "How a building is shaped changes how wind travels around it. Sharp corners, flat faces, tall skinny profiles: each one handles air differently. So engineers build scale models and stick them in wind tunnels to watch what the air actually does." },
          { type: "paragraph", text: "Then they tweak. Round off the corners, cut openings through the tower, twist the whole profile. When a skyscraper looks strange, that shape is usually doing a job." },
        ] },
        { title: "Try This: Paper Tower Test", blocks: [
          { type: "paragraph", text: "Build two paper towers. Make one rigid and straight, make the other a little loose and springy. Now blow on them, or bump the table. Which one goes down first? Which one bends way over and comes back?" },
          { type: "callout", title: "What Engineers Study", accent: "purple", text: "That is a tiny version of the real question. It is never just \"will it stand up?\" It is \"what does it do when something pushes on it?\"" },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Buildings sway because wind and earthquakes push on them, and a little movement is how a structure survives that push. So when a skyscraper leans a few inches in a storm, nobody messed up. Somebody did their job right." },
        ] },
      ],
    },
    "engineering-behind-soccer-ball": {
      title: "The Engineering Behind a Soccer Ball",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m6,
      image: "/images/blog/The engineering behind a soccer ball.webp",
      imageAlt: "A modern match soccer ball showing its panel design and surface texturing",
      imageCaption: "Modern soccer balls are precision-engineered systems. Every layer, panel shape, and surface texture is designed to optimize flight, energy transfer, and aerodynamic stability.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-your-first-design-is-usually-not-your-best-one", label: "Read next: why your first design is usually not your best one" },
      endingRelatedSlug: "why-your-first-design-is-usually-not-your-best-one",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "The ball sitting in your garage is a more serious piece of engineering than it looks. Old soccer balls were leather, and leather drinks water, so by the second half of a rainy match players were basically kicking a wet brick. Today's match balls are built out of materials science, panel geometry, and factory tech that did not exist twenty years ago." },
        ] },
        { title: "The 4-Layer Anatomy", blocks: [
          { type: "paragraph", text: "Cut a real match ball open and you find four layers, each one there for a reason:" },
          { type: "list", items: [
            "Bladder: the balloon at the center, usually butyl or latex rubber, holding the air. Butyl keeps pressure longer. Latex feels softer and bounces better. Manufacturers pick their poison.",
            "Lining: layers of woven polyester and cotton wrapped around the bladder. This is what keeps the ball round after ten thousand kicks instead of slowly turning into an egg.",
            "Foam cushioning: a layer of polyurethane or EVA foam under the outer shell. It squashes on impact and springs back, firing more of your energy into the shot.",
            "Casing: the synthetic leather outside. It refuses to soak up water, so the ball weighs the same in minute 90 as it did in minute 1, and its texture is engineered to grip the air.",
          ] },
        ] },
        { title: "Panel Design and Aerodynamics", blocks: [
          { type: "paragraph", text: "The biggest change you can actually see is the panels. That classic 32-panel ball with black pentagons had seams everywhere, and every seam is drag. Modern match balls get away with 6 to 8 panels, which cuts the total seam length way down." },
          { type: "paragraph", text: "They are not even stitched anymore. Heat and high-frequency glue bond the panels into something nearly seamless and completely watertight. Engineers model the airflow using the same simulation software used to design aircraft. And those little bumps and grooves on the surface? Not decoration. They control the layer of air clinging to the ball, which is what keeps a hard shot flying straight instead of knuckling all over the place." },
        ] },
        { title: "Dynamic Balance and the Magnus Effect", blocks: [
          { type: "paragraph", text: "Every match ball has to pass a dynamic balance test, which means its weight is spread so evenly that it spins without wobbling. Get that wrong and the ball flutters unpredictably, which players hate and manufacturers get roasted for." },
          { type: "paragraph", text: "Get it right and you unlock the Magnus effect. Strike the ball off-center and it spins. One side of that spinning surface drags along with the air, the other side fights against it. That imbalance creates a real sideways force that bends the ball's path mid-flight. Every free kick that curls around a wall is that force doing its thing." },
          { type: "callout", title: "The Magnus Effect in Action", accent: "purple", text: "Same physics makes a curveball break in baseball and a topspin forehand dive in tennis. Spin the ball, mess up the air pressure around it, and the ball goes somewhere it has no business going." },
        ] },
        { title: "Embedded Technology", blocks: [
          { type: "paragraph", text: "Top-tier match balls are not just leather and air anymore. Some now carry a sensor suspended inside the ball on its own little frame, tracking movement in three dimensions and reporting back 500 times per second. Where the ball is, how fast it is going, the exact instant a boot touched it." },
          { type: "paragraph", text: "That feed is what powers semi-automated offside calls and goal-line technology, which can tell you within milliseconds whether the whole ball crossed the line. The ball is now part of the officiating crew." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "A soccer ball is not just a thing you kick. It is a layered system where materials science, fluid dynamics, and sensors all have to cooperate. Every unbelievable shot you have ever seen started with somebody engineering the ball." },
        ] },
      ],
    },
    "why-manhole-covers-are-round": {
      title: "Why Are Manhole Covers Round?",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m4,
      image: "/images/blog/The engineering behind manhole covers.jpg",
      imageAlt: "A cast iron manhole cover set into city pavement, showing its circular shape and textured grip surface",
      imageCaption: "Manhole covers are round because a circle cannot fall through a hole of the same size, no matter how you rotate it.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-triangles-are-an-engineers-secret-weapon", label: "Read next: why triangles are an engineer's secret weapon" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A manhole cover sounds like the most boring object on earth. Heavy metal lid, sits in the street, gets driven over. That is it, right? Except this thing is a famous engineering puzzle, and interviewers have been asking people about it for decades. So why is it round?" },
        ] },
        { title: "A Round Cover Cannot Fall Through Its Own Hole", blocks: [
          { type: "paragraph", text: "This is the answer everybody knows, and it is genuinely elegant. Spin a circle any direction you want and it is the same width across. So a round cover physically cannot drop through a round hole of the same size. It just cannot happen." },
          { type: "paragraph", text: "Now try that with a square. The diagonal across a square is longer than its sides, so tilt a square cover the right way and it slips straight down the hole. There are workers under there. Nobody wants a 250-pound iron plate falling on them, so the circle wins." },
        ] },
        { title: "Round Covers Are Easier to Move", blocks: [
          { type: "paragraph", text: "These things are heavy. Some weigh more than the person moving them. But a circle rolls. A worker can lever it up on edge and walk it across the street like a wheel. Try that with a square and you get four corners fighting you the whole way." },
          { type: "paragraph", text: "Engineers think about the humans who have to live with a design. Shape is only part of it. Somebody has to lift this, move it, replace it, and do it again in fifteen years." },
        ] },
        { title: "The Opening Is Round Too", blocks: [
          { type: "paragraph", text: "Look down the hole and you will notice the shaft itself is round. Round shapes spread pressure evenly, which is also why pipes are round instead of square. Round hole, round cover. The shape of the lid follows the shape of the thing it is covering." },
        ] },
        { title: "No Need to Line It Up", blocks: [
          { type: "paragraph", text: "Drop a round cover on a round hole from any angle and it fits. Every time. With a square you have to rotate it and line up corners while holding something that weighs as much as you do. Circles save time and remove one whole way to mess it up." },
        ] },
        { title: "Strong and Simple", blocks: [
          { type: "paragraph", text: "That lid takes cars, trucks, rain, snow, heat, ice, and about twenty years of it. Round spreads the weight evenly instead of piling it into corners. The bumpy pattern on top is not decoration either. It is there so tires and shoes get grip on wet metal." },
        ] },
        { title: "Try This: Shape Test", blocks: [
          { type: "paragraph", text: "Cut out a paper circle and a paper square. On a second sheet, cut matching holes. Now try to force each cover through its own hole at every angle you can think of. One of them will go. One never will." },
          { type: "callout", title: "One Design, Many Solutions", accent: "purple", text: "That paper test is the whole reason engineers love this shape. Safe, strong, easy to move, easy to replace, all at once. One design quietly solving five problems is about as good as engineering gets." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Round covers are safe, strong, rollable, and impossible to put back wrong. That is one simple shape doing five jobs. Next time you step over one, take a second look. That metal circle is smarter than it lets on." },
        ] },
      ],
    },
    "how-roller-coasters-stay-on-track": {
      title: "How Roller Coasters Stay on the Track",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m5,
      image: "/images/blog/The Engineering Behind Roller Coasters.webp",
      imageAlt: "A roller coaster with steep drops and loop-the-loops against a bright sky, showing the track design that keeps riders safely on board",
      imageCaption: "Roller coasters stay on the track because engineers design gravity, momentum, and multi-directional wheel systems to work together.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-airplane-wings-are-curved", label: "Read next: why airplane wings are curved" },
      endingRelatedSlug: "why-airplane-wings-are-curved",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Roller coasters look like they are cheating. They haul up an impossible hill, plunge down, snap sideways, and flip you upside down while your stomach files a complaint. So why does the train never leave the rails? Gravity, momentum, some very clever wheels, and a lot of engineers who really did not want you to fall out." },
        ] },
        { title: "Gravity Starts the Ride", blocks: [
          { type: "paragraph", text: "That slow clanking climb at the beginning is the whole ride getting loaded up. A chain or a launch motor drags the train to the top, and once it is up there, it is holding a bank account of energy just from being high off the ground. Engineers call that potential energy." },
          { type: "paragraph", text: "Then the track drops out from under you and gravity spends every bit of it. Stored energy becomes speed, which is kinetic energy. That first drop is not just for screaming. It is paying for the entire rest of the ride." },
        ] },
        { title: "Momentum Keeps It Moving", blocks: [
          { type: "paragraph", text: "Now the train is moving, and moving things want to keep moving. That is momentum, and it is what carries you over the next hills, around the curves, and up through the loops." },
          { type: "paragraph", text: "But friction and air resistance are stealing from you the entire time. So designers have to nail a narrow window: enough speed to make it home, not so much that the ride turns dangerous. Too slow and the train stalls upside down. Too fast and the forces get ugly." },
        ] },
        { title: "The Wheels Do More Than You Think", blocks: [
          { type: "paragraph", text: "The train is not just sitting on the rails like a car on a road. Look under one sometime and you will find three sets of wheels doing three different jobs:" },
          { type: "list", items: [
            "Road wheels riding on top of the rail",
            "Side friction wheels pressing against the outside, holding the train in line through turns",
            "Up-stop wheels underneath the rail, gripping from below so the train stays locked on when you go upside down",
          ] },
          { type: "paragraph", text: "So during a loop, the coaster is not politely hoping gravity cooperates. It is physically clamped around the rail from three directions." },
        ] },
        { title: "Why Do You Not Fall Out?", blocks: [
          { type: "paragraph", text: "Lap bars, seat belts, over-the-shoulder harnesses. Which one you get depends on what the ride is about to do to you. A gentle family coaster only needs a lap bar. Anything that flips you gets a much more serious restraint." },
          { type: "paragraph", text: "The design goal is a little sneaky. Engineers want you to feel like you are barely hanging on while you are, in fact, extremely attached to the seat. A good coaster feels reckless and is anything but." },
        ] },
        { title: "Loops Are Not Perfect Circles", blocks: [
          { type: "paragraph", text: "Here is a detail most riders never notice. Coaster loops are not circles. They are shaped like a stretched teardrop, wide at the bottom and pinched at the top. A true circle would crush you with force at the bottom and then leave you too slow at the peak." },
          { type: "paragraph", text: "The teardrop spreads those forces out so your body can handle them. It looks like a design choice. It is actually a rescue plan for your neck." },
        ] },
        { title: "Try This: Marble Coaster", blocks: [
          { type: "paragraph", text: "Paper, cardboard, tape, and one marble. Build a track with a hill and a curve. Then start sabotaging it. Make the first hill too short. Make the curve too tight. Leave the track bumpy. Every single failure tells you exactly what to fix." },
          { type: "callout", title: "Same Questions, Smaller Scale", accent: "purple", text: "That is the same testing real coaster engineers run, minus a few million dollars. Every time your marble flies off or dies halfway up a hill, it just handed you data." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "The train stays on the track because every piece was designed to keep it there. Gravity supplies the speed, momentum carries it home, wheels grip from three sides, restraints hold you down, and the shape of the track controls what your body feels. The thrill is completely real. So is the math underneath it." },
        ] },
      ],
    },
    "why-chairs-break": {
      title: "Why Do Some Chairs Break and Others Don't?",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m4,
      image: "/images/blog/bridge-build.jpg",
      imageAlt: "Students constructing a popsicle stick bridge, testing joints and load distribution, the same structural principles that govern chairs",
      imageCaption: "Chairs and bridges share the same engineering problems: joints, load paths, and material choice determine whether they hold or fail.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM engineering workshop" },
      endingSecondary: { href: "/blog/why-triangles-are-an-engineers-secret-weapon", label: "Read next: why triangles are an engineer's secret weapon" },
      endingRelatedSlug: "why-triangles-are-an-engineers-secret-weapon",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A chair has exactly one job. Hold you up. And yet chairs break constantly. Legs snap, backs crack, screws work themselves loose, seats slowly sag into a hammock. So why does one chair survive a decade of abuse while another gives out in a year? Engineering, all the way down." },
        ] },
        { title: "Chairs Must Handle Forces", blocks: [
          { type: "paragraph", text: "Sit down and your weight pushes straight into the seat. That force has to travel out through the frame, down the legs, and into the floor. Spread it out nicely and the chair shrugs. Funnel it all into one weak junction and something is going to crack." },
          { type: "paragraph", text: "That is weight distribution, and it is the whole game. A good chair does not just hold weight. It moves weight safely from you to the ground." },
        ] },
        { title: "Materials Matter", blocks: [
          { type: "paragraph", text: "Wood, plastic, metal, fabric, or some mix of all four. Every one has a way it fails. Wood is strong until the grain runs the wrong direction and it splits. Plastic is light and cheap until it gets thin and cracks. Metal is tough until it is too thin, and then it just folds." },
          { type: "paragraph", text: "Designers pick based on cost, strength, comfort, weight, and how it looks in a catalog. The best chairs use the right material in each specific spot. Nobody wins by making everything out of the strongest thing available." },
        ] },
        { title: "Joints Are Often the Weakest Part", blocks: [
          { type: "paragraph", text: "Chairs almost never snap in the middle of a solid piece of wood. They come apart where two pieces meet. Those connection points are joints, and a leg might attach to a seat with screws, glue, bolts, brackets, or a shape carved to slot together." },
          { type: "paragraph", text: "Weak joints, weak chair. That is why a wobble is a warning. Wobbling means something is moving that was never supposed to move, and it is only going to get worse." },
        ] },
        { title: "Shape Can Make a Chair Stronger", blocks: [
          { type: "paragraph", text: "Flip a sturdy chair over and you will probably find bars running between the legs. Those stretchers stop the legs from splaying outward under load. Other designs get there with curved plastic shells, welded frames, or straight-up triangles." },
          { type: "callout", accent: "purple", text: "Triangles again. Same reason they hold up bridges and towers: they refuse to change shape. A chair can get significantly stronger from geometry alone, without a gram of extra material." },
        ] },
        { title: "Testing Matters", blocks: [
          { type: "paragraph", text: "Before a chair ever hits a store, machines abuse it. They pile on weight, rock it back, drop it, and sit on it thousands of times in a row. Because real life is worse than any lab. People lean back on two legs, twist sideways, flop down hard, drag chairs across tile, and stack them six high." },
          { type: "paragraph", text: "Holding once is easy. Holding for the ten thousandth time is the actual challenge." },
        ] },
        { title: "Try This: Paper Chair Challenge", blocks: [
          { type: "paragraph", text: "Build a chair out of paper and tape that can hold something real, like a book or a toy. Then build three more. Straight legs, folded legs, triangle bracing, rolled paper tubes. Load them one at a time and see which one refuses to quit." },
          { type: "callout", title: "What You Will Find", accent: "purple", text: "You will figure out fast that shape and joints matter as much as material. A simple design with clean joints usually crushes a fancy design taped together badly." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "Chairs break when the forces have nowhere good to go. They last when somebody picked smart materials, a smart shape, and joints that hold. It looks like ordinary furniture, but every time it takes your weight, that chair is doing engineering." },
        ] },
      ],
    },
    "hidden-engineering-water-bottle": {
      title: "The Hidden Engineering of a Water Bottle",
      category: "Engineering",
      categoryColor: "bg-avanza-purple",
      readTime: common.en.minutes.m6,
      image: "/images/blog/the engineering behind water bottles.webp",
      imageAlt: "A clear plastic water bottle showing its ridged sides, threaded neck, and structural base design",
      imageCaption: "A disposable water bottle weighs a few grams but holds thousands of times its own weight in liquid. Every ridge, thread, and wall thickness is there for a reason.",
      endingProject: { href: "/projects/teardown-night", label: "Try this project: teardown night" },
      endingSecondary: { href: "/blog/the-engineering-of-a-backpack", label: "Read next: the engineering of a backpack" },
      endingRelatedSlug: "the-engineering-of-a-backpack",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A single-use water bottle might be the least impressive object you will touch today. It holds water. You drink it. You throw it away. But look at it as a materials problem and it turns into something kind of ridiculous." },
          { type: "paragraph", text: "That bottle weighs a few grams. It survives a factory, a truck, a warehouse, a cooler, your backpack, and getting dropped on concrete. If it is holding soda, it also contains gas pushing outward on every wall. On top of all that it has to keep the water clean, seal without leaking, feel decent in your hand, and cost almost nothing to make a billion times over." },
          { type: "callout", title: "The Big Trade-off", accent: "purple", text: "Everything that makes this bottle light, strong, and cheap is also what makes it a waste problem. Great engineering, uncomfortable ending." },
        ] },
        { title: "The Engineering Feat", blocks: [
          { type: "paragraph", text: "Almost all of them are made from PET, short for polyethylene terephthalate. PET is clear, light, easy to mold, and unusually strong for its weight. That combination is what lets a factory make walls thin enough to crinkle in your hand without the bottle falling apart on the shelf." },
          { type: "numbered", items: [
            { title: "Lightweight and strong", body: "A PET bottle holds thousands of times its own weight in water. Stretching the plastic during molding lines up the long polymer chains inside, and that alignment is a big part of where the strength comes from." },
            { title: "Thin but pressure-aware", body: "Those ridges, curves, and the weird bumpy base are all structural. Soda bottles get the most careful geometry of all, because trapped gas is constantly pushing outward on every square inch." },
            { title: "Fast to manufacture", body: "Machines heat a small PET preform that looks like a test tube, blow it into a mold, fill it, cap it, and label it faster than you can read this sentence. That speed is most of the reason bottled water is everywhere." },
          ] },
        ] },
        { title: "The Shape Is Not Random", blocks: [
          { type: "paragraph", text: "A bottle has to be grabbable, stackable, and stiff enough not to fold when you pick it up. Those grooves around the middle are not styling. They give your fingers something to hold onto, which matters a lot when your hands are wet." },
          { type: "paragraph", text: "Shape also decides how the bottle handles pressure. A perfectly smooth thin-walled bottle crumples the second you squeeze it. Add ridges and the same amount of plastic gets noticeably stiffer. Less material, same job." },
        ] },
        { title: "The Physics of the Cap", blocks: [
          { type: "paragraph", text: "Look at the neck of the bottle. Those spiral ridges are threads, and the cap has matching threads cut inside it. When you twist, the threads drag the cap downward instead of just spinning it around." },
          { type: "paragraph", text: "That downward pull squeezes a small sealing ring against the rim. What you want is a hermetic seal, tight enough to stop leaks, hold in carbonation, and keep out air and bacteria." },
          { type: "paragraph", text: "And that little cap is a simple machine, the same family as a ramp or a screw. It converts an easy twist into a strong downward squeeze. Getting more force out than you put in is exactly what simple machines are for." },
        ] },
        { title: "Why Is the Plastic Thicker in Some Places?", blocks: [
          { type: "paragraph", text: "Run your fingers along a bottle from top to bottom and the thickness changes. The base has to be beefy enough to stand up and take a drop. The neck has to be solid enough for the cap to bite into. The sides can afford to be thin, so they are." },
          { type: "paragraph", text: "That is engineers balancing strength, cost, comfort, and waste at the same time. Too thin and it crushes in your hand. Too thick and you just wasted plastic on a billion bottles. Good design puts material exactly where the stress is and nowhere else." },
        ] },
        { title: "The Opening Matters", blocks: [
          { type: "paragraph", text: "Make the opening too small and drinking is annoying. Make it too big and you pour it down your shirt. Reusable bottles usually go wide so you can fit ice in and actually clean the inside. Disposables go narrow, because they only need to survive one use and nobody is scrubbing them out." },
          { type: "paragraph", text: "Even that hole size was somebody's decision." },
        ] },
        { title: "Labels and Grip", blocks: [
          { type: "paragraph", text: "The label wrapped around the middle is doing two jobs. Branding, obviously, but it also adds friction where your hand goes. Reusable bottles take this further with rubber sleeves, textured plastic, or powder-coated metal. A bottle that squirts out of a wet hand is a failed design, especially for kids or anyone halfway up a trail." },
        ] },
        { title: "The Trade-offs and Health Concerns", blocks: [
          { type: "paragraph", text: "Solving a problem beautifully does not mean you solved every problem. Single-use bottles come with a real environmental bill, and researchers are still working out what all those tiny plastic fragments mean for us." },
          { type: "numbered", items: [
            { title: "Microplastic and nanoplastic particles", body: "Newer microscopy can spot particles older methods missed completely. A Columbia and Rutgers team counted an average of roughly 240,000 detectable plastic fragments per liter in the bottled water they tested, and most of those were nanoplastics." },
            { title: "Cap friction", body: "Every time you twist a cap on or off, plastic threads grind against plastic threads. Peer-reviewed research shows that grinding sheds additional microplastic particles right at the opening." },
            { title: "Chemical leaching", body: "Heat, sunlight, months of storage, or reusing a bottle built for one trip all raise concerns about the plastic breaking down and additives moving into the water. Scientists are still sorting out exactly what that does to people." },
            { title: "Environmental impact", body: "PET can be recycled. A lot of it is not. Bottles that end up as litter stick around in landfills, rivers, and oceans for a very long time." },
          ] },
          { type: "callout", title: "Engineering Means Trade-offs", accent: "purple", text: "A disposable bottle is outstanding at being light, sealed, strong, and cheap. It is terrible at going away once you are finished with it." },
        ] },
        { title: "How to Reduce Plastic Exposure", blocks: [
          { type: "paragraph", text: "Nobody needs to panic here, and a plastic bottle is still better than no clean water. But if you want to cut down on everyday plastic, the swaps are pretty easy." },
          { type: "list", items: [
            "Carry a glass or stainless steel bottle for your daily water.",
            "Do not leave plastic bottles baking in a hot car or sitting in direct sun.",
            "Skip the habit of refilling a bottle that was built for one use.",
            "Add a certified filter at home if your tap water is safe but you want extra peace of mind.",
            "Recycle PET wherever your town takes it, and use refill stations when you can find them.",
          ] },
        ] },
        { title: "Try This: Bottle Design Test", blocks: [
          { type: "paragraph", text: "Grab a disposable bottle and a reusable one and put them side by side. Compare the cap, the grip texture, the shape of the base, the wall thickness, the opening size, how easily each one squishes, how stable each one stands, and how you would go about cleaning either." },
          { type: "callout", title: "No Perfect Answer", accent: "purple", text: "Neither one wins outright, and that is the lesson. A hiking bottle is built to survive. A kid's bottle is built not to spill. A disposable is built to cost nothing. Spotting those trade-offs is the job." },
        ] },
        { title: "Final Thought", blocks: [
          { type: "paragraph", text: "A water bottle is a whole engineering project pretending to be a container. Hold liquid, do not leak, fit a hand, stand up, survive a drop, waste as little material as possible. It also happens to be a reminder that design decisions keep having consequences long after the product leaves your hands." },
          { type: "paragraph", text: "Next time you take a drink, spend two seconds looking at the bottle. There is more thinking packed into it than anybody meant you to notice." },
        ] },
      ],
    },
    "can-ai-actually-think": {
      title: "Can AI Actually Think?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      image: "/images/blog/can artifical intelligence think Medium.jpeg",
      imageAlt: "An abstract visualization of artificial intelligence, with a digital brain or neural network pattern representing machine learning and pattern recognition",
      imageCaption: "AI can recognize patterns and generate answers, but that is different from thinking the way humans do. It predicts; it does not understand.",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-is-ai-actually-doing-when-it-answers-you",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Type \"explain black holes like I'm 10\" into an AI and three seconds later you have a solid answer. Ask it for a story, some math help, a picture, a science project idea, and it just delivers. It really does feel like something over there is thinking." },
          { type: "paragraph", text: "So here is the question worth asking: is it? And the honest answer is no, not the way you do." },
          { type: "paragraph", text: "AI pulls off some genuinely amazing stuff, but there is no brain in there. No feelings. No memories of its own life. No imagination the way you have imagination. No actual grip on what the world is like. What it has instead is an incredible talent for spotting patterns." },
        ] },
        { title: "What Is Pattern Recognition?", blocks: [
          { type: "paragraph", text: "Pattern recognition is just noticing what repeats, and you do it constantly. Dark clouds roll in, thunder rumbles, the wind picks up, and before you have consciously decided anything your brain says \"rain.\" Nobody told you. You have seen this movie before." },
          { type: "paragraph", text: "AI does the same trick at an insane scale. Picture reading thousands of books, articles, websites, and conversations. Eventually you would start noticing which words hang out together, which answers tend to follow which questions, which ideas keep showing up side by side." },
          { type: "paragraph", text: "That is the whole deal. AI soaks up patterns from data, then uses them to guess what should come next when you ask something. It sounds smart because the patterns it learned came from smart people writing things down. Sounding smart and thinking are two different jobs." },
        ] },
        { title: "How Is Human Thinking Different?", blocks: [
          { type: "paragraph", text: "You do a lot more than pattern-match. You wonder about stuff. You care about people. You get confused, excited, nervous, proud, curious. You decide something matters to you. You change your mind because of one afternoon that stuck with you. You notice when something is unfair, or when your friend is having a bad day and is not saying so." },
          { type: "paragraph", text: "AI does none of that. Say your popsicle stick bridge collapses. You feel it drop in your stomach. Then you think, maybe the middle needed more support, and you start sketching version two. Logic, memory, emotion, creativity, and experience all firing at once." },
          { type: "paragraph", text: "Ask an AI why the bridge fell and it will give you a decent answer about triangles and weight distribution. But it never watched it fall. It did not care. Nothing about that moment changed it, and it will not remember it tomorrow." },
        ] },
        { title: "Does AI Understand What It Says?", blocks: [
          { type: "paragraph", text: "It can explain a volcano. It can write a poem about a turtle. It can tell you about Saturn's rings. None of that means it understands any of those things the way you do." },
          { type: "paragraph", text: "Think about your phone's autocomplete. Type \"I am going to the\" and it offers store, park, game. Your phone has no idea what your afternoon looks like. It is guessing the next word." },
          { type: "callout", accent: "teal", text: "AI is doing a far more sophisticated version of that same move. It predicts words, sentences, and ideas from patterns. Which is exactly why it can nail one answer and then say something completely bizarre thirty seconds later." },
        ] },
        { title: "A Simple Example", blocks: [
          { type: "paragraph", text: "Ask an AI: can a fish ride a bicycle? A person would laugh and say no, fish do not have legs and bikes need land. The AI will probably also say no. But not because it pictured a fish wobbling down the street. It is running patterns from language and facts it absorbed." },
          { type: "paragraph", text: "Now flip it: write a funny story about a fish riding a bicycle. Suddenly you get a story. It swapped from fact mode to story mode because it recognized what shape of answer you wanted. Useful, and also a warning. How you ask changes what you get." },
        ] },
        { title: "So Is AI Smart?", blocks: [
          { type: "paragraph", text: "At some things, absolutely. It finds patterns fast, organizes messy information, brainstorms with you at 11pm, explains a topic five different ways, summarizes, writes code, translates languages, and helps people learn." },
          { type: "paragraph", text: "At other things, not even close. It has no idea what it is like to be a kid, to mess up in front of people, to help a friend, to win something, or to feel that specific pride when the thing you built finally works. It has no common sense. And it can be completely wrong while sounding completely sure. It is a tool, not a substitute for your brain." },
        ] },
        { title: "Think of AI Like a Super Calculator for Words", blocks: [
          { type: "paragraph", text: "A calculator crushes math. But it has no clue why you need the answer, whether you typed the numbers in wrong, or whether the result makes any sense in real life. It just computes." },
          { type: "paragraph", text: "AI is the same idea, except it works with words, images, code, and patterns instead of only numbers. It can help you think. It should not be doing your thinking." },
        ] },
        { title: "Try This", blocks: [
          { type: "paragraph", text: "Go ask an AI these three things back to back:" },
          { type: "list", items: [
            "Explain how a paper airplane flies.",
            "Explain how a paper airplane flies like I am in 2nd grade.",
            "Make up a silly story about a paper airplane that goes to Mars.",
          ] },
          { type: "paragraph", text: "Watch how much the answers shift. The AI did not become a teacher, then a little kid, then a storyteller. It just matched the pattern of what you asked for. That is the whole thing in three prompts." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "AI does not think like you. It spots patterns, predicts what comes next, and builds answers out of what it learned from data. That is powerful and genuinely fun to use. But you still bring things it does not have: real understanding, actual creativity, judgment, feelings, and responsibility for what you do with the answer." },
          { type: "callout", accent: "teal", text: "AI can help you think. Your brain is still the best tool in the room, and it is the one that has to decide what to do next." },
        ] },
      ],
    },
    "why-ai-sometimes-gets-things-wrong": {
      title: "Why AI Sometimes Gets Things Wrong",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      image: "/images/blog/Why AI can get things wrong.jpg",
      imageAlt: "A visual representation of AI producing an incorrect or confused output, illustrating the concept of AI hallucination and error",
      imageCaption: "AI does not know things the way people do. It predicts, and sometimes its predictions are confidently wrong.",
      endingProject: { href: "/projects/sock-sorter", label: "Try this project: the sock sorter" },
      endingSecondary: { href: "/blog/what-is-ai-actually-doing-when-it-answers-you", label: "Read next: what is AI actually doing when it answers you" },
      endingRelatedSlug: "can-ai-actually-think",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "AI answers fast. Dinosaurs, a short story, a bug in your code, an idea for the science fair. Sometimes the answer is great. Sometimes it sounds great. Those are not always the same thing." },
          { type: "paragraph", text: "Which raises a fair question: if this technology is so advanced, why does it still blow it? Because AI does not know things the way you know things. It predicts, based on patterns. Usually that lands. Sometimes it goes sideways." },
        ] },
        { title: "AI Can Guess Wrong", blocks: [
          { type: "paragraph", text: "Every time you ask something, the AI is building an answer that fits the shape of your question. It leans on patterns from a mountain of examples and predicts what words belong next. So even when it sounds certain, it is making a very well-informed guess." },
          { type: "paragraph", text: "Ask what the tallest mountain in the world is and you will get Everest, no problem. That fact appears everywhere. But get really specific, ask about something obscure, and the AI may not have solid patterns to work from. Instead of saying so, it can just produce something that sounds right. That is failure mode number one: it answers when it should shrug." },
        ] },
        { title: "What Is a Hallucination?", blocks: [
          { type: "paragraph", text: "When an AI invents something and hands it to you like a fact, people call that a hallucination. It is not seeing things. It generated an answer that has the shape of the truth without the substance." },
          { type: "paragraph", text: "Stuff AI has been caught making up:" },
          { type: "list", items: [
            "A book title that does not exist",
            "A date that is off by decades",
            "A quote nobody ever said",
            "A science fact that sounds completely reasonable and is not true",
            "A source with a real-looking link that goes nowhere",
          ] },
          { type: "callout", accent: "teal", text: "The dangerous part is the tone. A hallucination arrives with the exact same confidence as a correct answer. That is why you still check the things that matter." },
        ] },
        { title: "Bad Data Can Lead to Bad Answers", blocks: [
          { type: "paragraph", text: "AI learns from data, and data means whatever text, images, and numbers it got fed. Some of that is outdated. Some is biased. Some is half a story. Some of it is flatly wrong. Learn patterns from a messy pile and you will repeat some of the mess." },
          { type: "paragraph", text: "Imagine studying from a notebook where half the pages are correct and half have wrong answers scribbled in. If you never check, you will confidently learn the wrong thing and not even know it. AI is stuck in the same situation, except the notebook is the size of the internet." },
        ] },
        { title: "AI Does Not Always Understand the Question", blocks: [
          { type: "paragraph", text: "Sometimes the AI is not the problem. The question is. If someone walked up and asked you \"how big is it?\" you would say \"how big is what?\" An AI will often just pick a meaning and run with it, and if it picked wrong, everything after that is wrong too." },
          { type: "paragraph", text: "This is why prompts matter so much. \"Tell me about energy\" gives it nothing to work with. \"Explain the difference between renewable and nonrenewable energy for a 4th grader\" gives it a target. Same tool, wildly different answer." },
        ] },
        { title: "AI Can Mix Up Similar Things", blocks: [
          { type: "paragraph", text: "Patterns are its strength and also its weakness. Two historical figures with similar names get blended into one person. A movie title swaps places with the book. A science explanation uses words that sound right but describe something slightly different." },
          { type: "paragraph", text: "It happens because the AI is not looking at the world. It is looking at text about the world. And some systems do not automatically know what happened recently, so for new discoveries, rule changes, or anything in the news, go check a current source." },
        ] },
        { title: "How Can You Check AI's Answers?", blocks: [
          { type: "callout", title: "A Simple Rule", accent: "teal", text: "AI is a helper, not the final word. Anything touching school, safety, health, or news gets checked before you use it." },
          { type: "paragraph", text: "Ask yourself a few things. Where would this information have come from? Can I find the same answer somewhere I trust? Does it line up with what my teacher said? And the big one: does this actually make sense?" },
          { type: "paragraph", text: "Three quick checks work well. Does it make sense? Can a trusted source back it up? Would a teacher, parent, or expert nod along? Fail any one of those and slow way down." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "AI gets things wrong because it guesses, because its training data was imperfect, because your question was vague, because it blended two similar things together, or because it never saw the newest information. None of that makes it useless. It just means you stay in the driver's seat." },
          { type: "callout", accent: "teal", text: "AI can help you learn faster and think louder. Your job is to keep asking one question: how do I know this is true?" },
        ] },
      ],
    },
    "how-does-your-phone-recognize-your-face": {
      title: "How Does Your Phone Recognize Your Face?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      image: "/images/blog/How an Iphone recognizes your face.jpg",
      imageAlt: "An iPhone screen showing the Face ID setup interface with a face scan in progress, illustrating how the phone maps facial geometry",
      imageCaption: "Face ID maps thousands of points on your face and compares them to a stored 3D model, using the same kind of pattern recognition at the heart of modern AI.",
      endingProject: { href: "/projects/sock-sorter", label: "Try this project: the sock sorter" },
      endingSecondary: { href: "/blog/can-ai-actually-think", label: "Read: can AI actually think?" },
      endingRelatedSlug: "why-ai-sometimes-gets-things-wrong",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You pick up your phone, glance at it, and it opens. No password, no typing, no thinking about it. Honestly it feels a little like magic." },
          { type: "paragraph", text: "But your phone is not going \"oh hey, it's you.\" It does not know you the way your friends know you. What it actually does is fire off cameras and sensors, turn your face into a pattern of numbers, and check whether that pattern is close enough to the one it saved." },
        ] },
        { title: "Your Face Has Patterns", blocks: [
          { type: "paragraph", text: "Your face is full of measurements. The gap between your eyes. The slope of your nose. Where your jaw sits relative to your cheekbones. Put all those distances together and you get an arrangement that almost nobody else has." },
          { type: "paragraph", text: "Your phone has one of those arrangements saved. When you look at it, it builds a fresh one and compares. Close enough, you are in. Basically a very intense matching game happening in under a second." },
        ] },
        { title: "What Happens When You Set It Up?", blocks: [
          { type: "paragraph", text: "Remember how setup makes you roll your head around in a circle? There is a reason for that. Your face does not look the same from every angle or in every light. Bright sun, dim room, glasses on, glasses off." },
          { type: "paragraph", text: "The phone is collecting enough views to build a pattern that survives all of that. Skip it and you would be locked out every time you sat somewhere shady." },
        ] },
        { title: "Cameras and Sensors Help", blocks: [
          { type: "paragraph", text: "A normal camera just takes a flat picture. Some phones add sensors that measure depth, meaning how far away each part of your face is from the lens. That is the difference between a face and a photo of a face." },
          { type: "paragraph", text: "Think about a drawing of a cube versus an actual cube sitting on a table. Same outline, completely different in three dimensions. Depth sensing is how a phone refuses to unlock for a printed photo somebody holds up." },
        ] },
        { title: "Where Does Machine Learning Come In?", blocks: [
          { type: "paragraph", text: "Machine learning is the part of AI where a computer figures out patterns from examples instead of following rules somebody typed in. For face unlock, it is what teaches the phone which patterns are yours and how much they are allowed to shift." },
          { type: "paragraph", text: "Because you change. You smile, you tilt your head, you throw on a hat, you get a haircut that you regret. Machine learning is what keeps the phone from panicking over every small change." },
        ] },
        { title: "Why Privacy Matters", blocks: [
          { type: "paragraph", text: "Here is the uncomfortable part. A password and a face are not the same kind of secret. If someone steals your password, you make a new one in thirty seconds. Nobody has ever gotten a new face." },
          { type: "callout", accent: "teal", text: "So companies, schools, and apps handling face data need to be extremely careful, and they should tell you what they collect, where it lives, and who can see it. If an app wants to scan your face, that is a good moment to go ask an adult first." },
        ] },
        { title: "Can Face Recognition Make Mistakes?", blocks: [
          { type: "paragraph", text: "Constantly. It refuses to unlock when it should. It gives up in bad lighting. And more seriously, some systems have worked noticeably worse for certain groups of people, usually because the faces they trained on were not diverse enough." },
          { type: "paragraph", text: "Which is exactly why humans have to keep testing this stuff, fixing it, and deciding where it should and should not be used." },
        ] },
        { title: "Try This Thought Experiment", blocks: [
          { type: "paragraph", text: "Pretend you are designing the face unlock system. What should it do when:" },
          { type: "list", items: [
            "The room is pitch dark?",
            "The person has sunglasses on?",
            "Someone holds up a photo of the owner?",
            "Identical twins both try to unlock the same phone?",
            "The kid who set it up is three years older now?",
          ] },
          { type: "paragraph", text: "Every one of those is a real problem engineers had to solve, and the answers pull against each other. Accuracy, security, fairness, and privacy do not always want the same thing." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Your phone knows your face as a pattern, not as a person. Cameras and sensors gather the data, machine learning decides what counts as a match, and security rules make the final call on whether to open." },
          { type: "callout", accent: "teal", text: "Before you let an app scan your face, ask the two questions that matter: where does this go, and who gets to look at it?" },
        ] },
      ],
    },
    "why-does-autocorrect-make-weird-mistakes": {
      title: "Why Does Autocorrect Make Weird Mistakes?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m4,
      image: "/images/shared/ai-workshop.jpg",
      imageAlt: "Students discussing how prediction systems work during an Avanza STEM AI workshop",
      imageCaption: "Autocorrect and AI share the same core idea: both predict what should come next based on patterns in language.",
      endingProject: { href: "/projects/family-chatbot", label: "Try this project: a chatbot that only knows your family" },
      endingSecondary: { href: "/blog/how-does-your-phone-recognize-your-face", label: "Read: how does your phone recognize your face?" },
      endingRelatedSlug: "how-does-your-phone-recognize-your-face",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Autocorrect is genuinely useful most of the time. You fumble \"teh\" and it quietly becomes \"the.\" You type at full speed, drop a letter, and nobody ever finds out." },
          { type: "paragraph", text: "And then there are the other times. You go to send something completely normal and your phone swaps in a word that makes no sense and slightly embarrasses you. So why does it do that? Because autocorrect is predicting words. It has no idea what you meant." },
        ] },
        { title: "Autocorrect Is a Prediction Tool", blocks: [
          { type: "paragraph", text: "It takes whatever you typed and guesses at the word you were going for. Type \"definitley\" and it lands on \"definitely,\" because those two are only a couple keystrokes apart." },
          { type: "paragraph", text: "Under the hood it is running a few questions at once. What real word is closest to this spelling? What word usually follows the one before it? What does this person type all the time? What is the most likely sentence here? Those questions get it right constantly. And then occasionally, spectacularly wrong." },
        ] },
        { title: "Computers Do Not Understand Words Like People Do", blocks: [
          { type: "paragraph", text: "When you read the word \"dog,\" something happens in your head. Fur, barking, a specific dog you know, maybe one that knocked you over once. You understand it because you have lived near dogs." },
          { type: "paragraph", text: "Autocorrect has lived near nothing. It has never met a dog, never gotten a joke, has no clue why your friend spells their name that way. It sees letters and probabilities. That is why it will confidently overwrite a word you spelled correctly. It is not disagreeing with you. It just thinks another word was more likely." },
        ] },
        { title: "Names and Slang Can Confuse Autocorrect", blocks: [
          { type: "paragraph", text: "Names wreck it. Your friend spells theirs an uncommon way. Your town or your team is not in the dictionary. Autocorrect sees something it does not recognize and helpfully replaces it with a word it does, which is how a person's actual name becomes a random noun." },
          { type: "paragraph", text: "Then there is everything people invent on purpose. Inside jokes, slang, nicknames, a word your group made up last month. Autocorrect has no category for any of it, so it flattens whatever you wrote into the nearest boring option." },
        ] },
        { title: "Why Does It Sometimes Get Better?", blocks: [
          { type: "paragraph", text: "You may have noticed your phone eventually giving up and letting you keep a word. That is because a lot of autocorrect systems adapt to you. Type the same name enough times and it stops fighting you about it." },
          { type: "paragraph", text: "That is machine learning doing its thing on a small scale. It notices your habits and adjusts. It also creates a very funny failure mode: make the same typo enough times and your phone decides the typo is correct now." },
        ] },
        { title: "Autocorrect and AI Are Related", blocks: [
          { type: "paragraph", text: "Autocorrect is not an AI chatbot, but they are cousins. Both are prediction machines. Autocorrect predicts one word. A chatbot predicts whole paragraphs. Neither one actually understands language the way you do." },
          { type: "callout", accent: "teal", text: "A person can stop and ask \"wait, what do you mean by that?\" They catch sarcasm, mood, and the thing you did not say. A computer has to infer all of that from patterns, and sometimes it infers wrong." },
        ] },
        { title: "Try This", blocks: [
          { type: "paragraph", text: "Type out a ridiculous sentence full of made-up words, names, and slang, and watch what your phone tries to do to it. Then get curious: why did it pick that replacement? Was it going off spelling? A common phrase? Something you typed last week?" },
          { type: "paragraph", text: "That is engineer brain right there. Do not just notice that something broke. Chase down why." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Autocorrect gets weird because it predicts patterns instead of understanding meaning. It saves you from typos, learns your habits, and occasionally torpedoes a perfectly good message." },
          { type: "callout", accent: "teal", text: "Autocorrect is the assistant. You are the editor. Read it once before you hit send." },
        ] },
      ],
    },
    "what-happens-when-you-ask-ai-a-question": {
      title: "What Happens When You Ask AI a Question?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      image: "/images/blog/When happens when you ask AI a question.png",
      imageAlt: "A student at an Avanza STEM AI workshop typing a question and reading the AI's response",
      imageCaption: "What happens between your question and the AI's answer is more interesting than it looks. It is all about prompts, patterns, and prediction.",
      imageFit: "contain",
      endingProject: { href: "/projects/my-first-python-program", label: "Try this project: first Python quiz game for kids" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-is-ai-actually-doing-when-it-answers-you",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Typing a question into an AI feels like texting a very fast, very well-read robot. You send \"why is the sky blue?\" and a few seconds later there is a full explanation waiting. But what actually happened in that gap?" },
          { type: "paragraph", text: "Nothing in there woke up and pondered your question. What happened was a process: prompt, training, patterns, prediction. Let's walk through it step by step." },
        ] },
        { title: "Step 1: You Give AI a Prompt", blocks: [
          { type: "paragraph", text: "The prompt is whatever you typed. It can be lazy, like \"explain gravity,\" or it can actually give the AI something to work with, like \"explain gravity to a 3rd grader using a playground example.\"" },
          { type: "callout", accent: "teal", text: "The second one gets a much better answer, because you told it who the answer is for and what to build it around. Think of a prompt like instructions to a teammate. Vague instructions, vague results." },
        ] },
        { title: "Step 2: AI Breaks Down Your Words", blocks: [
          { type: "paragraph", text: "The AI chops your prompt into pieces and looks at the words, the order they came in, and the shape they make together." },
          { type: "paragraph", text: "Say you ask for \"photosynthesis explained for kids.\" It picks up three signals. \"Explain\" means you want teaching, not a list. \"Photosynthesis\" is the subject. \"For kids\" sets the reading level. Those three clues shape everything that comes next." },
        ] },
        { title: "Step 3: AI Uses What It Learned During Training", blocks: [
          { type: "paragraph", text: "Long before you showed up, that model went through training, which means it processed a staggering amount of text. Articles, questions, answers, explanations, stories, code, all of it." },
          { type: "paragraph", text: "It did not memorize any of that. It absorbed patterns instead. Which words travel together. How a good explanation is usually built. Which facts tend to show up side by side. What different writing styles feel like. Those patterns are what it reaches for when you ask something it has never seen." },
        ] },
        { title: "Step 4: AI Predicts a Response", blocks: [
          { type: "paragraph", text: "Now it starts writing, and it does it by predicting what should come next, piece by piece. There is no finished answer sitting in a drawer. Ask \"why do plants need sunlight?\" and it predicts that a solid answer probably involves energy, food, leaves, and photosynthesis, then builds toward that." },
          { type: "paragraph", text: "This is also why the same question can get you a one-liner, an essay, a poem, a quiz, or a numbered guide. You are steering the prediction." },
        ] },
        { title: "Step 5: The Answer Appears", blocks: [
          { type: "paragraph", text: "The text lands on your screen looking smooth and sure of itself. Hold onto how it got made." },
          { type: "paragraph", text: "That answer did not come from someone who lived through anything, opened a textbook, or weighed what actually matters here. It came from a tool assembling patterns. Sometimes that is exactly what you needed. Sometimes it needs a second look." },
        ] },
        { title: "Why Clear Prompts Help", blocks: [
          { type: "paragraph", text: "Sharper prompt, sharper answer. Every time. Swap \"tell me about robots\" for \"explain the difference between robots and AI for a 4th grader, with examples.\" Swap \"help with science\" for \"give me three science fair ideas about magnets using stuff I can find at home.\"" },
          { type: "paragraph", text: "Give it a clear job and it will do a clear job." },
        ] },
        { title: "Try This", blocks: [
          { type: "paragraph", text: "Ask the same thing three ways and watch what changes:" },
          { type: "list", items: [
            "Explain electricity.",
            "Explain electricity using a water slide example.",
            "Explain electricity in five sentences for a 3rd grader.",
          ] },
          { type: "paragraph", text: "Line the three answers up next to each other. The topic never moved. Your prompt did all the work." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "You give a prompt. The AI reads it, leans on patterns from training, predicts what comes next, and builds an answer out of that. It looks like thinking. It is prediction. Which makes it powerful and also makes it fallible." },
          { type: "callout", accent: "teal", text: "The AI can hand you a response. Understanding it is still your job. Stay curious, write better prompts, and check the answers that count." },
        ] },
      ],
    },
    "should-kids-trust-everything-ai-says": {
      title: "Should Kids Trust Everything AI Says?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      image: "/images/blog/should kids trust what ai says.jpg",
      imageAlt: "Students at an Avanza STEM AI workshop discussing when to trust and when to verify AI responses",
      imageCaption: "Knowing when to trust AI and when to check it is one of the most important skills students can learn at Avanza STEM AI workshops.",
      endingProject: { href: "/projects/sock-sorter", label: "Try this project: the sock sorter" },
      endingSecondary: { href: "/blog/why-ai-sometimes-gets-things-wrong", label: "Read: why AI sometimes gets things wrong" },
      endingRelatedSlug: "what-happens-when-you-ask-ai-a-question",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "AI is genuinely handy. It untangles homework problems, throws out project ideas, writes stories, answers questions at midnight, and never gets tired of you asking again. It is kind of a tutor, a librarian, and a brainstorming partner stacked into one." },
          { type: "paragraph", text: "So should you believe everything it tells you? No. Not even close. Useful and correct are two different things, and the gap between them is where people get burned." },
        ] },
        { title: "AI Can Sound Confident Even When It Is Wrong", blocks: [
          { type: "paragraph", text: "This is the sneaky part. AI never sounds unsure. It answers calmly, uses impressive words, breaks things into tidy sections with headers. It reads like something written by someone who definitely knows." },
          { type: "callout", accent: "teal", text: "A neat answer is not a correct answer. AI mixes up facts and sometimes invents them outright. When it makes something up like that, people call it a hallucination." },
        ] },
        { title: "Think Like a Detective", blocks: [
          { type: "paragraph", text: "Using AI well means acting like a detective. A detective does not take the first clue at face value. They poke at it, look for backup evidence, and see whether the story holds together." },
          { type: "paragraph", text: "So when an answer lands, run through these:" },
          { type: "list", items: [
            "Does this actually make sense?",
            "Where would this information have come from?",
            "Can I find it somewhere I trust?",
            "Does it matter if this is wrong?",
            "Should I be asking an adult about this one?",
          ] },
          { type: "paragraph", text: "The goal is never to be afraid of AI. The goal is to be the smartest person in the conversation." },
        ] },
        { title: "Some Questions Need Extra Care", blocks: [
          { type: "paragraph", text: "Plenty of AI answers carry zero risk. Ask for a ridiculous story about a dragon who is obsessed with pancakes and nobody needs to fact-check the pancakes. Go have fun." },
          { type: "paragraph", text: "Other topics deserve real caution. Slow way down on anything about:" },
          { type: "list", items: [
            "Health and safety",
            "Money",
            "News and current events",
            "School assignments where accuracy matters",
            "Personal problems",
            "Private information",
            "Anything that could affect another person",
          ] },
          { type: "paragraph", text: "On any of those, AI can be a starting point. It should never be your only source." },
        ] },
        { title: "Ask a Trusted Adult", blocks: [
          { type: "paragraph", text: "When something an AI said does not sit right, go ask a real person. A parent, a teacher, a librarian, a coach, anybody who can help you think it through out loud." },
          { type: "paragraph", text: "AI knows general information. It does not know your life, your family, your school, or what happened yesterday. A trusted adult does. That matters most when the advice touches your body, your feelings, your friendships, your safety, or a decision you cannot undo." },
        ] },
        { title: "Do Not Share Private Information", blocks: [
          { type: "paragraph", text: "One more rule, and this one is not negotiable. Keep private information out of the chat. That means:" },
          { type: "list", items: [
            "Your full name",
            "Your home or school address",
            "Passwords",
            "Phone numbers",
            "Personal photos",
            "Private family information",
            "Anything that would make you uncomfortable if strangers saw it",
          ] },
          { type: "paragraph", text: "Different apps handle your information in wildly different ways, and you usually cannot tell which is which from the outside. When you cannot see where something goes, do not send it. Ask an adult first." },
        ] },
        { title: "Good Ways Kids Can Use AI", blocks: [
          { type: "paragraph", text: "Used right, this stuff is a genuine advantage. Try asking it to:" },
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
          { type: "paragraph", text: "The best thing you can do with AI is not copy it. It is understand something you did not understand an hour ago. That is the whole win." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Do not trust everything AI says. It is helpful, creative, fast, and sometimes flatly wrong, and it delivers all four in exactly the same tone of voice." },
          { type: "callout", accent: "teal", text: "People who are good at using AI do not believe it automatically. They think, they check, they push back. Treat it like a tool, not like the boss of your brain." },
        ] },
      ],
    },
    "how-do-video-games-use-ai": {
      title: "How Do Video Games Use AI?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      image: "/images/blog/how video games use AI.webp",
      imageAlt: "A video game scene with characters and environments driven by AI behavior rules that control movement and decision-making",
      imageCaption: "Game AI is not the sci-fi kind. It is a rulebook that tells characters when to chase, flee, patrol, or react to a player.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM AI workshop" },
      endingSecondary: { href: "/blog/what-is-ai-explaining-to-kids", label: "Read: what is AI?" },
      endingRelatedSlug: "what-is-ai-explaining-to-kids",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You know that moment when an enemy spots you and commits to the chase? Or when a game quietly gets harder right as you start getting good? None of that is luck. That is AI, and it is running in the background of almost every game you play." },
          { type: "paragraph", text: "Game AI moves characters, makes choices, reacts to you, and builds the challenge. It is what makes a world feel like it noticed you walked in. But it is not the same thing as the AI you chat with. In games, AI usually means a set of behavior rules that add up to something that feels smart." },
        ] },
        { title: "What Is Game AI?", blocks: [
          { type: "paragraph", text: "Game AI is whatever controls the characters you are not controlling. Enemies, teammates, animals, villagers, monsters, rival racers, the shopkeeper who says the same line every time. All of them are NPCs, short for non-player characters, which just means the game is driving instead of a person." },
          { type: "paragraph", text: "The AI is what makes their decisions. Does the enemy charge or hold position? Does your teammate follow you into the tunnel? Does the rival car brake before that corner? Does the shopkeeper look up when you walk past? Every one of those is a rule somebody wrote." },
        ] },
        { title: "Enemy Movement", blocks: [
          { type: "paragraph", text: "Movement is the classic one. Picture a maze game with a monster hunting you down. That monster has to get through the maze without pinning itself in a corner forever, which means designers give it an algorithm, a step-by-step set of instructions for finding its way." },
          { type: "paragraph", text: "The rules can be shockingly simple:" },
          { type: "list", items: [
            "If the player is close, chase them.",
            "If the player is far away, patrol the area.",
            "If there is a wall, turn.",
            "If health is low, run away.",
            "Guard a treasure chest.",
          ] },
          { type: "paragraph", text: "Five rules like that, and suddenly the monster feels like it is hunting you on purpose." },
        ] },
        { title: "NPC Choices and Difficulty", blocks: [
          { type: "paragraph", text: "NPCs make decisions too, and the good ones remember what you did. A villager thanks you for the thing you did two hours ago. A guard refuses to move because you never found the key. Underneath, the game is just checking conditions: if this happened, then do that." },
          { type: "paragraph", text: "Some games also quietly tune the difficulty while you play. Too easy and you get bored. Too hard and you rage quit. So enemies speed up, puzzles tighten, or a hint appears after you have been stuck on the same room for ten minutes. You were being managed the whole time." },
        ] },
        { title: "Game AI Can Be Simple or Complex", blocks: [
          { type: "paragraph", text: "Plenty of game AI is barely AI. A guard pacing back and forth on a fixed path. A fish swimming in a loop. Still counts, still doing a job, not exactly a genius." },
          { type: "paragraph", text: "Other games go deep. Characters react to sound, to light, to choices you made an hour ago, to a world that keeps changing. But nobody is chasing maximum intelligence here. They are chasing fun, and those are not the same target." },
        ] },
        { title: "Why Not Make Enemies Perfect?", blocks: [
          { type: "paragraph", text: "If designers can make AI smart, why not make enemies unbeatable? Because that game would be miserable. Picture a soccer game where the keeper saves every single shot, or a racing game where the computer never once takes a corner badly. You would quit in four minutes." },
          { type: "callout", accent: "teal", text: "Good game AI is built to challenge you, not humiliate you. Designers deliberately make it worse than it could be. Enemies hesitate before attacking, miss on purpose, telegraph the big move. All of that exists so you get a chance to react and get better." },
        ] },
        { title: "Try Designing Your Own Game AI", blocks: [
          { type: "paragraph", text: "You can do this right now, no code required. You are designing a monster for a maze game. What rules does it follow?" },
          { type: "list", items: [
            "Walk around randomly until it sees the player.",
            "Chase the player if they are close.",
            "Stop chasing after 10 seconds.",
            "Run away if the player picks up a power-up.",
            "Guard a treasure chest.",
          ] },
          { type: "paragraph", text: "Five rules and you have a creature with a personality. Next time you play something, stop and watch an NPC for thirty seconds. See if you can reverse-engineer the rules it is following. Once you spot them you cannot stop." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Games use AI to run enemies, NPCs, difficulty, and movement. It can be a handful of simple rules or a genuinely complicated system. Either way, its job is to make the world react to you." },
          { type: "callout", accent: "teal", text: "The best game AI is almost never the smartest one. It is the one that gives the player the best fight." },
        ] },
      ],
    },
    "is-a-robot-the-same-thing-as-ai": {
      title: "Is a Robot the Same Thing as AI?",
      category: "AI",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m4,
      image: "/images/blog/artificial intelligence vs robots.webp",
      imageAlt: "A graphic comparing a physical robot on one side with an AI brain or neural network on the other, showing they are different things",
      imageCaption: "A robot is a physical machine. AI is software that learns patterns. They are different things, and they do not always come together.",
      endingProject: { href: "/projects/lego-robot-builder", label: "Try this project: build your first LEGO robot" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "how-do-video-games-use-ai",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Movies did this to us. Robots stroll around, hold conversations, make plans, occasionally decide to take over the planet. So it is completely reasonable to assume robot and AI mean the same thing." },
          { type: "paragraph", text: "They do not. A robot is a machine that does things in the physical world. AI is software that recognizes patterns and makes predictions. They team up sometimes. But plenty of robots have no AI at all, and most AI has never had a body in its life." },
        ] },
        { title: "What Is a Robot?", blocks: [
          { type: "paragraph", text: "A robot is a machine that senses, moves, or gets a job done. Some look vaguely human. Most look nothing like us. You have probably been around several today:" },
          { type: "list", items: [
            "A robotic vacuum",
            "A factory arm building cars",
            "A drone",
            "A Mars rover",
            "A toy robot",
            "A machine used in surgery",
          ] },
          { type: "paragraph", text: "Robots come with physical hardware: motors, wheels, arms, cameras, sensors, grippers. That is the whole point. A robot touches the real world." },
        ] },
        { title: "What Is AI?", blocks: [
          { type: "paragraph", text: "AI stands for artificial intelligence, and it means software that pulls off tasks we used to think required a mind. Spotting patterns, predicting what comes next, writing text, sorting images, translating languages, deciding which video you see next." },
          { type: "paragraph", text: "None of that needs a body. A chatbot lives entirely inside software. It can write you an essay about pencils and it cannot pick up a pencil, not unless someone wires it into a robot. AI is the deciding part. The robot is the doing part." },
        ] },
        { title: "What Are Sensors and Motors?", blocks: [
          { type: "paragraph", text: "Sensors are how a machine notices anything. You get sight, hearing, and touch. A robot gets a camera to see, a microphone to hear, a bump sensor to feel contact, a distance sensor to stop before the wall, a thermometer to check heat." },
          { type: "paragraph", text: "Motors are how it moves. Spin a wheel, lift an arm, open a claw, rotate a joint. If sensors are the senses, motors are the muscles. And like muscles, they decide nothing on their own. Somebody has to tell them what to do." },
        ] },
        { title: "A Robot Without AI", blocks: [
          { type: "paragraph", text: "Plenty of robots run with basically no AI. Picture a little bot chasing a strip of black tape across the floor. Light sensor underneath. Sees the line, drives forward. Drifts off, steers back." },
          { type: "paragraph", text: "It looks clever. It is not. It is following two rules with sensors and motors, and it will follow them forever without ever learning a thing." },
        ] },
        { title: "AI Without a Robot", blocks: [
          { type: "paragraph", text: "Flip it around. An AI helps you write a poem. It has words, and that is it. No wheels, no arms, no camera. It cannot cross the room, stack a block, or hand you a water bottle." },
          { type: "paragraph", text: "That is AI with no robot attached. Brilliant with information, completely stuck in the computer." },
        ] },
        { title: "A Robot With AI", blocks: [
          { type: "paragraph", text: "Then there is the combination, and a self-driving car is the obvious one. Cameras and sensors watch the road, the signs, the lanes, the cars, the person about to step off the curb. AI turns all that into a decision about what to do in the next half second." },
          { type: "callout", accent: "teal", text: "Here the body and the brain finally work as a team. The robot senses, the AI decides, the motors act. That loop runs hundreds of times a second." },
        ] },
        { title: "Try This", blocks: [
          { type: "paragraph", text: "Look around wherever you are right now. Find something that is a robot. Find something that uses AI. Find something that is just a computer doing computer things." },
          { type: "list", items: [
            "A calculator is a computer tool, not AI.",
            "A robot vacuum is a robot, and a fairly simple one.",
            "A voice assistant is AI with no body.",
            "A printer is a machine with moving parts, but nobody really calls it a robot.",
          ] },
          { type: "paragraph", text: "Sorting things into those buckets is exactly how engineers think about technology, and it gets easier fast." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "A robot and an AI are two different things. One is a machine that moves through the physical world. The other is software that finds patterns and makes decisions. Put them together and you get something impressive. Apart, they are still each useful." },
          { type: "callout", accent: "teal", text: "Next time somebody shows off a \"smart robot,\" ask the three-part question: which part is the robot, which part is the AI, and what sensors are feeding it?" },
        ] },
      ],
    },
    "how-do-robots-know-where-they-are": {
      title: "How Do Robots Know Where They Are?",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m5,
      image: "/images/blog/how robots know where they are.jpg",
      imageAlt: "A robot using cameras and sensors to scan and map its surrounding environment for navigation",
      imageCaption: "Robots build a picture of their surroundings using cameras, lidar, and mapping software, then constantly update it as they move.",
      endingProject: { href: "/projects/sensor-scavenger-hunt", label: "Try this project: sensor scavenger hunt" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "what-makes-a-robot-a-robot",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Try walking down your school hallway with your eyes shut. You might get four or five steps before you clip a wall, a desk, or somebody's backpack. Moving through space safely turns out to require a constant stream of clues." },
          { type: "paragraph", text: "Robots are stuck with the same problem, except they start with nothing. A robot does not know where it is. It has to work that out from sensors, cameras, wheel counts, maps, and a lot of math. Gather clues, make your best guess, move, then check the guess again." },
        ] },
        { title: "Robots Need Senses Too", blocks: [
          { type: "paragraph", text: "You have sight, hearing, touch, and balance. A robot has sensors, and each one notices exactly one kind of thing. Some measure distance, some catch objects, some track speed, some figure out which way is which." },
          { type: "list", items: [
            "Cameras: to see walls, roads, people, signs, or obstacles",
            "Wheels: to measure how far the robot has traveled",
            "GPS: to estimate location outdoors",
            "Lidar: to scan the area with laser light",
            "Ultrasonic sensors: to bounce sound waves off objects",
            "Gyroscopes: to sense turning or tilting",
          ] },
          { type: "paragraph", text: "No single sensor tells the whole story. The camera spots a doorway. The wheel counter says you have gone five feet. The distance sensor insists there is a wall right there. Stack those together and a position starts to emerge." },
        ] },
        { title: "Counting Wheel Turns", blocks: [
          { type: "paragraph", text: "The simplest trick in the book is counting wheel rotations. Roll out from the classroom door, count ten feet worth of turns, and you can claim you are ten feet from the door. Engineers call it odometry. You do the same thing when you count your steps in the dark." },
          { type: "callout", accent: "green", text: "But what if a wheel spins on a slick floor? What if the ground tilts? A half-inch error becomes a two-foot error after enough turns. That drift is exactly why a robot never trusts one sensor alone." },
        ] },
        { title: "Using Cameras Like Eyes", blocks: [
          { type: "paragraph", text: "Cameras let a robot look around. A vacuum picks out chair legs and baseboards. A self-driving car reads lane lines and traffic lights. A Mars rover studies rocks and dodges ground that would swallow a wheel." },
          { type: "paragraph", text: "But a camera does not see the way you see. You glance at a chair and you just know. A robot gets a grid of colored pixels and has to work out edges, shapes, shadows, and patterns before it can call it a chair. Then the lights change. Then something sits in front of it. Then someone turns it around and the whole silhouette is different. Every one of those has to be trained for." },
        ] },
        { title: "Building a Map", blocks: [
          { type: "paragraph", text: "Better robots draw as they go. A vacuum starts in an unfamiliar room and slowly figures out where the walls are, where the couch sits, and which paths stay open. Once it has that map, it stops bumping around like a pinball and starts cleaning in efficient lines." },
          { type: "paragraph", text: "You do the exact same thing in a new building. Day one you are lost. By day three you know the stairs are by the entrance, the gym is down the hall, the library is around that corner. Robots build the same mental map, just with sensors and code instead of memory." },
          { type: "callout", accent: "green", text: "The hardest version of this is doing both at once: drawing the map while figuring out where you are inside the map you are still drawing. Two unknowns, one problem, and it is one of the great puzzles in robotics." },
        ] },
        { title: "Why Robots Still Get Lost", blocks: [
          { type: "paragraph", text: "They get lost constantly. A wheel slips. A sensor spits out garbage. Somebody moves the couch. The lights go out. A bag ends up in front of the camera. Two hallways look identical and the robot picks the wrong one." },
          { type: "paragraph", text: "So a robot never makes one guess and commits to it. It re-checks, over and over, updating its estimate every time new information shows up. Which is exactly what you do walking through a museum, glancing at signs, checking the map, looking around, adjusting." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Robots find their position by collecting clues and combining them. Cameras, wheel counts, GPS, lasers, motion sensors. All of it feeds one running estimate of where I am and where I should go next." },
          { type: "callout", accent: "green", text: "Next time you watch a robot cross a room, know that it is not just rolling. It is sensing, guessing, checking, and correcting, several times per second, the entire way." },
        ] },
      ],
    },
    "why-robots-are-bad-at-easy-human-tasks": {
      title: "Why Robots Are Bad at Easy Human Tasks",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m5,
      image: "/images/blog/why robots are bad a simple human tasks.avif",
      imageAlt: "A robot struggling to perform a simple physical task that a human would do effortlessly without thinking",
      imageCaption: "Tasks that take a person a fraction of a second, like picking up a crumpled shirt, can take robots years of engineering to approximate.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM workshop" },
      endingSecondary: { href: "/blog/getting-started-with-lego-robotics", label: "Read: getting started with LEGO robotics" },
      endingRelatedSlug: "getting-started-with-lego-robotics",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Folding laundry is nothing. You grab a shirt, shake it out, find the sleeves, fold, done. You are probably thinking about something else the entire time." },
          { type: "paragraph", text: "For a robot, folding laundry is close to a nightmare. Same goes for opening a door, picking a toy off the floor, tying a shoe, or pouring cereal without launching it across the counter. These are some of the hardest unsolved problems in robotics." },
          { type: "paragraph", text: "Which is strange, because robots build cars, drive on Mars, and throw around parts that would flatten a person. So how does a sock beat them? Because the real world does not hold still and does not hold its shape." },
        ] },
        { title: "Humans Are Better Than We Realize", blocks: [
          { type: "paragraph", text: "Your body pulls off ridiculous stuff constantly and never mentions it. Reach for a pencil and you instantly know where it is, roughly what it weighs, how tight to squeeze, and how to angle your fingers, even if it is sideways, half under a notebook, and hanging off the edge of the desk." },
          { type: "paragraph", text: "A robot has to grind through every one of those steps. See the pencil. Work out that the pencil is a separate object from the table it is lying on. Choose a grab point. Plan an arm path that does not knock over the water bottle. Squeeze hard enough to lift it and not hard enough to snap it. That is five hard problems for one pencil." },
          { type: "callout", accent: "green", text: "You make it look effortless because you have had years of practice wiring your eyes, hands, muscles, and brain together. A robot starts that training from zero." },
        ] },
        { title: "Soft Things Are Hard", blocks: [
          { type: "paragraph", text: "Anything floppy is a robot's worst day. A shirt refuses to be one shape. It bends, bunches, twists, and collapses into a pile that looks nothing like a shirt. A towel folds over itself. A sock hides inside another sock like it is doing it on purpose." },
          { type: "paragraph", text: "Rigid objects are so much friendlier. A metal block stays a block. A plastic bin has edges you can find. A cup looks like a cup. Cloth changes shape every single time it moves, so a robot cannot just memorize what a shirt looks like. It has to understand how fabric behaves, and that is a genuinely brutal problem." },
        ] },
        { title: "Opening Doors Is Not That Simple", blocks: [
          { type: "paragraph", text: "Count the doors you have opened this week. Round knobs, lever handles, sliders, push bars, pull handles, heavy fire doors, screen doors that snap shut behind you. All different." },
          { type: "paragraph", text: "You walk up and just know what to do. A robot has to spot the handle, work out which way it moves, line up its gripper, apply the right amount of force, and step backward or forward while pulling or pushing. Push when it should pull and it fails. Grip at a slightly wrong angle and it fails. Two seconds of your life is a research project for somebody." },
        ] },
        { title: "The World Does Not Stay Still", blocks: [
          { type: "paragraph", text: "Factory robots are incredible at repetition because their world never changes. The part shows up in the same spot at the same second every time. The arm runs the same motion. Nothing surprises anybody." },
          { type: "paragraph", text: "Your house is the opposite of a factory. The backpack is on the floor today and on the chair tomorrow. The toy is upside down. The dog moved. If your pencil rolls under a chair, you crouch, shove the chair, reach around a bag, and grab it without a single conscious decision. That kind of improvising is still one of the biggest walls in robotics." },
        ] },
        { title: "Picking Things Up Takes Judgment", blocks: [
          { type: "paragraph", text: "You adjust your grip automatically and you have never once thought about it. An egg gets a completely different hand than a hammer. A paper cup gets different fingers than a baseball. Different pressure, different contact points, different everything." },
          { type: "paragraph", text: "A robot has to get that right on purpose. Too soft and the object drops. Too hard and it cracks. Grab the wrong end and it twists out of the gripper. And it gets worse when the object is shiny, see-through, squishy, tiny, heavy, weirdly shaped, or already moving. That is why grippers are one of the biggest fields in the whole industry." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Robots are extraordinary. The world they have to operate in is just extraordinarily messy. What feels easy to you feels easy because you are absurdly good at sensing, balancing, touching, adjusting, and learning from every mistake you have ever made." },
          { type: "callout", accent: "green", text: "So the next time you fold a shirt, open a door, or grab a snack out of a bag, take a second of credit. Engineers are still trying to catch up to your hands." },
        ] },
      ],
    },
    "what-makes-a-robot-a-robot": {
      title: "What Makes a Robot a Robot?",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m4,
      image: "/images/blog/what is a robot.webp",
      imageAlt: "A robot with visible sensors, motors, and articulated joints illustrating the three core components: sense, process, act",
      imageCaption: "A robot needs to sense its environment, process that information, and take physical action. All three together define what makes a machine a robot.",
      endingProject: { href: "/projects/sensor-scavenger-hunt", label: "Try this project: sensor scavenger hunt" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "how-do-robots-know-where-they-are",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Quick quiz. Toaster: robot? Remote-control car? Vending machine? Smart speaker? Robot vacuum? Most people answer those five differently, which tells you the word is doing a lot of loose work." },
          { type: "paragraph", text: "Here is the actual line. A robot senses the world, decides something, and then acts on it. That means nearly every robot has three parts: sensors, a controller, and actuators. Or in plain terms, it notices, it thinks, it moves." },
        ] },
        { title: "Part 1: Sensors Help Robots Notice", blocks: [
          { type: "paragraph", text: "A robot cannot react to a world it cannot detect, so first it needs sensors. Each one picks up one kind of signal:" },
          { type: "list", items: [
            "Light", "Distance", "Sound", "Touch", "Temperature", "Movement", "Direction", "Color", "Pressure",
          ] },
          { type: "paragraph", text: "A robot vacuum uses them to find walls, avoid stairs, and notice dirt. A self-driving car uses them to track roads, signs, other cars, and people. A factory arm uses them to confirm the part is actually where it is supposed to be. Strip the sensors out and a robot is a person trying to cross a room with no sight, no hearing, and no touch." },
        ] },
        { title: "Part 2: Controllers Help Robots Decide", blocks: [
          { type: "paragraph", text: "The controller is where decisions happen. Not a brain, exactly. More like the part running the instructions, and those instructions can be almost laughably simple or seriously advanced." },
          { type: "paragraph", text: "One robot follows a single rule: if the sensor sees a wall, turn left. Another combines a camera feed, a map it built itself, and a pathfinding program to pick the safest route across a cluttered room. Controllers range from a chip the size of a fingernail to a serious processor. Either way, the job is the same. Read the sensors, choose what happens next." },
          { type: "callout", accent: "green", text: "Sense. Decide. Act. That three-step loop runs over and over, and it might be the single most important idea in robotics." },
        ] },
        { title: "Part 3: Actuators Help Robots Move", blocks: [
          { type: "paragraph", text: "Actuators are the parts that actually do something. Motors are the most common kind. They spin wheels, swing arms, turn gears, open grippers, rotate joints." },
          { type: "paragraph", text: "A factory arm has a motor at every joint. A robot hand might run tiny motors or pull cables like tendons. A drone has four motors spinning propellers just to stay in the air. Take the actuators away and you have a machine that senses everything, decides everything, and does absolutely nothing." },
        ] },
        { title: "Does a Robot Have to Look Like a Person?", blocks: [
          { type: "paragraph", text: "Absolutely not, and this is the myth movies planted in all of us. No face required. No arms, legs, or eyes required. Shape follows the job, always." },
          { type: "list", items: [
            "A small vacuum", "A rover", "A mechanical arm", "A drone", "A submarine", "A delivery cart", "A machine inside a factory",
          ] },
          { type: "callout", accent: "green", text: "Every good robot design starts with one question: what does this thing actually need to do? Answer that and the shape, the sensors, and the movement all fall out of it." },
        ] },
        { title: "Is a Remote-Control Car a Robot?", blocks: [
          { type: "paragraph", text: "Usually no, and here is why. You are making every single decision. You steer, it turns. That is a machine obeying you. But give that same car a sensor and let it swerve around an obstacle on its own, and it just crossed the line. Decision-making is the line. A machine that only follows commands is a machine. A robot decides at least a little bit for itself." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "A robot is not just a machine that moves. It gathers information with sensors, works through instructions with a controller, and acts through actuators. No human face required, no voice required. Underneath it all, one loop:" },
          { type: "callout", accent: "green", text: "Sense. Decide. Act. Everything else in robotics is a variation on those three words." },
        ] },
      ],
    },
    "how-mars-rovers-drive-without-a-driver": {
      title: "How Mars Rovers Drive Without a Driver",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m5,
      image: "/images/blog/mars rover without driver.jpg",
      imageAlt: "A Mars rover navigating rocky red terrain on the Martian surface with no human driver, guided entirely by onboard cameras and software",
      imageCaption: "Mars rovers drive themselves because a signal from Earth takes up to 24 minutes one way. There is no time for a human to react to obstacles.",
      endingProject: { href: "/projects/rover-wheels", label: "Try this project: rover wheels vs. sand" },
      endingSecondary: { href: "/workshops", label: "See upcoming workshops" },
      endingRelatedSlug: "design-a-mars-rover-out-of-cardboard",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Right now, as you read this, there are robots driving around on Mars. They cross the surface of another planet, study rocks, take pictures, and send it all home. Nobody is behind the wheel. There is no astronaut nearby with a controller. There is nobody on that planet at all." },
          { type: "paragraph", text: "So how does a rover drive itself? It comes down to distance, cameras, wheels, careful planning, and an almost unreasonable amount of patience." },
        ] },
        { title: "Mars Is Very Far Away", blocks: [
          { type: "paragraph", text: "Mars sits millions of miles out, and radio signals, fast as they are, still take real time to cross that gap. Depending on where both planets are in their orbits, a message can take several minutes each way." },
          { type: "paragraph", text: "So nobody is driving this thing like a video game. Imagine the rover rolling toward a rock it should not hit. An engineer on Earth will not even see the problem for ten minutes, and the stop command takes another ten to get back. By then the rover has been stuck for twenty minutes." },
        ] },
        { title: "The Rover Gets Instructions", blocks: [
          { type: "paragraph", text: "A rover does not wake up and pick a direction. Back on Earth, teams pore over the images and data it sent overnight, study the landscape, and choose targets worth visiting. An interesting rock. A patch of soil. A ridge. A route that will not eat a wheel." },
          { type: "paragraph", text: "Then they beam up a plan: drive to this spot, photograph that, drill here, run this instrument. But because of the delay, the plan cannot cover everything. The rover has to be able to handle surprises alone." },
        ] },
        { title: "Cameras Are the Rover's Eyes", blocks: [
          { type: "paragraph", text: "Rovers are covered in cameras, and each set has a job. Some look ahead to plan the next few meters. Some watch the ground directly under the wheels. Some grab wide landscape shots. Others zoom in close so scientists can study a rock without ever touching it." },
          { type: "paragraph", text: "Those images are also how it spots trouble: a boulder, a steep slope, a hole, sand it might sink into. Mars is not a parking lot. It is dust, stones, ridges, and craters, and a stuck rover stays stuck forever." },
        ] },
        { title: "Wheels Built for Another Planet", blocks: [
          { type: "paragraph", text: "Rover wheels are built for terrain nobody has ever tested in person. They have to climb rocks, shed dust, carry the whole rover, and survive brutal cold with no maintenance, ever." },
          { type: "paragraph", text: "Flat tire on your bike? Somebody patches it. Cracked wheel on Mars? Engineers on another planet redesign how the rover drives to work around the damage. That is exactly why rovers move so slowly and so carefully. Nobody is trying to set a speed record. They are trying to keep exploring." },
        ] },
        { title: "The Rover Can Avoid Some Trouble", blocks: [
          { type: "paragraph", text: "Rovers run autonomous navigation, which means they handle some of the driving themselves. Earth says go toward that point. Along the way, the rover checks its own camera feed. If it spots a nasty rock or a slope it does not like, it can steer around it or just stop and wait." },
          { type: "callout", accent: "green", text: "None of that is thinking. It is code asking a short list of questions over and over. Is the path clear? Is that an obstacle? Can I go around? Should I stop and phone home?" },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "A Mars rover drives without a driver by combining instructions from Earth, cameras that read the terrain, wheels built for a hostile planet, and software that knows when to stop. It cannot be steered live, because the universe is too big for that." },
          { type: "paragraph", text: "Every slow turn of those wheels is part of something larger: exploring a place no human has ever stood." },
        ] },
      ],
    },
    "why-robot-hands-are-so-hard-to-make": {
      title: "Why Robot Hands Are So Hard to Make",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m5,
      image: "/images/blog/robot hands.jpg",
      imageAlt: "A mechanical robotic hand showing its articulated finger joints and sensors, attempting to replicate the versatility of a human hand",
      imageCaption: "A human hand can grip a grape without crushing it and a barbell without dropping it. Replicating that range in a robot is one of engineering's hardest problems.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM workshop" },
      endingSecondary: { href: "/blog/how-factory-robots-build-cars", label: "Read: how factory robots build cars" },
      endingRelatedSlug: "how-factory-robots-build-cars",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Stop and look at your hand. Open it. Close it. Touch your thumb to each fingertip in order. Pick up a pencil, tap the table, then hold something like it might break. You just ran through moves that entire research labs are still trying to copy." },
          { type: "paragraph", text: "Hands are one of the hardest things in engineering. Robot hands look impressive in videos, and getting them to actually work like yours is brutally hard. A hand is not a grabber. It is flexible, sensitive, strong, gentle, and wired straight into a very good brain." },
        ] },
        { title: "Fingers Are Complicated", blocks: [
          { type: "paragraph", text: "Your hand is packed with moving parts. Every finger has multiple joints. Your thumb swings in a direction the others cannot, which is the entire reason you can pinch anything. Your wrist rotates, bends, and adjusts to feed all of it the right angle." },
          { type: "paragraph", text: "To copy that, a robot hand needs joints, motors, gears, cables, materials that bend the right way, and a control system to run all of it together. Getting one finger to move smoothly is already a project. Getting five to cooperate is a different level entirely." },
        ] },
        { title: "Grip Strength Is Tricky", blocks: [
          { type: "paragraph", text: "You never decide how hard to squeeze. It happens. A potato chip gets almost nothing. A loaded backpack strap gets a fist. A pencil lands somewhere in the middle, and you got there without a single thought." },
          { type: "paragraph", text: "A robot has to calculate it. Squeeze too hard and it crushes what it grabbed. Squeeze too soft and the thing slides out. Grab the wrong part and it twists loose halfway up. And every object is a different problem, because a smooth glass, a fuzzy tennis ball, a wet sponge, and a metal spoon all behave differently in the same gripper." },
        ] },
        { title: "Touch Matters", blocks: [
          { type: "paragraph", text: "Your hand is wallpapered in sensors. Pressure, texture, temperature, slipping, pain. When a cup starts to slide, you feel it and tighten up before you have consciously noticed anything is happening." },
          { type: "paragraph", text: "Robot hands need that feedback too, and faking human touch is extremely hard. The robot needs to know whether it is touching the object, how hard it is pressing, whether the thing is sliding, whether it is soft or rigid, and whether it is about to snap it in half. Without that, the hand is guessing. Guessing means dropped and broken things." },
        ] },
        { title: "Human Hands Are Good at Weird Objects", blocks: [
          { type: "paragraph", text: "Think about the range. A coin, a sandwich, a water bottle, a shoelace, a basketball, a crumpled ball of paper. Not one of those is like the others. Some are tiny, some are huge, some are slippery, some literally change shape the instant you touch them. Your hand handles all of it without complaint." },
          { type: "paragraph", text: "Robot hands love predictability. Give one a single part to pick up in a factory and it will do that better than any human, forever. Ask for a hand that can grab almost anything you hand it? That is still an open problem." },
        ] },
        { title: "Robot Hands Do Not Always Need to Look Human", blocks: [
          { type: "paragraph", text: "Here is the twist: the best robot hand often looks nothing like a hand. Some are two-finger pincers. Some are suction cups. Some are soft rubber tentacles that wrap around whatever they touch. Some are just a magnet, because the parts are steel and a magnet works great." },
          { type: "callout", accent: "green", text: "Engineers pick the design from the job, not from anatomy. A robot hand should match the problem it faces, not the shape of the thing at the end of your arm." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Robot hands are hard because grabbing is hard. A useful one needs movement, strength, gentleness, touch feedback, precise control, and the ability to deal with objects that are floppy, slick, tiny, or shaped like nothing in particular." },
          { type: "paragraph", text: "Your hands are so good at this that you have completely stopped noticing. Every shoe you tie, every bag you rip open, every ball you catch out of the air is a move engineers are still chasing. That is what makes this one of the most interesting problems in robotics." },
        ] },
      ],
    },
    "how-factory-robots-build-cars": {
      title: "How Factory Robots Build Cars",
      category: "Robotics",
      categoryColor: "bg-avanza-green",
      readTime: common.en.minutes.m5,
      image: "/images/blog/robots building cars assembly line.jpg",
      imageAlt: "Robotic arms on a car manufacturing assembly line welding and assembling vehicle body panels with precision",
      imageCaption: "Factory robots are not general-purpose. Each arm is precisely programmed for one specific task, executed thousands of times without variation.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM workshop" },
      endingSecondary: { href: "/blog/why-robot-hands-are-so-hard-to-make", label: "Read: why robot hands are so hard to make" },
      endingRelatedSlug: "why-robot-hands-are-so-hard-to-make",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "A car is thousands of parts pretending to be one object. Doors, seats, wheels, glass, miles of wiring, lights, a motor, and a huge number of pieces you will never see unless something goes wrong. Assembling all of that is an enormous job." },
          { type: "paragraph", text: "So modern factories hand the speed, strength, precision, and repetition to robots. Almost none of them look like people. Most look like giant mechanical arms bolted to the floor, swinging around with unsettling accuracy." },
        ] },
        { title: "Factory Robots Are Great at Repetition", blocks: [
          { type: "paragraph", text: "Doing the same thing perfectly, over and over, is the one job robots are genuinely better at than us. Car building is full of exactly that. The same part, placed the same way, welded in the same spot, thousands of times. A robot arm hits that mark every time. It does not get bored, does not zone out on a Friday, does not forget step four." },
          { type: "callout", accent: "green", text: "If a weld belongs at one precise point on every frame, the robot puts it there. Car one and car nine thousand come out identical." },
        ] },
        { title: "Welding the Car Body", blocks: [
          { type: "paragraph", text: "Welding is the big one. It uses heat to fuse metal pieces into a single structure, and a car body has to be strong enough to protect people in a crash. Robot welding arms move fast, hit the exact same coordinates every time, and reach into corners a person would have to contort into." },
          { type: "paragraph", text: "None of that runs itself. Engineers, technicians, and workers design the systems, program them, watch them, repair them, and inspect the results. The robot does the repeated motion. Humans own the process." },
        ] },
        { title: "Painting With Precision", blocks: [
          { type: "paragraph", text: "Painting sounds easy right up until you try it. Too much and it runs. Too little and the coverage is thin and weak. The coat has to be even across a curved hood, a flat roof, and a door with a crease in it. Robots handle it because they can sweep a spray head in the same controlled pattern at the same distance every time, and your arm cannot." },
        ] },
        { title: "Moving Heavy Parts", blocks: [
          { type: "paragraph", text: "Car parts get heavy fast. Robots lift, carry, and position them without strain. One arm swings a door into place. Another system runs parts down the line. Hoisting something awkward and heavy four hundred times a shift wrecks human bodies, so this is a case where the robot is protecting people, not replacing them." },
        ] },
        { title: "Safety and Programming", blocks: [
          { type: "paragraph", text: "These machines are strong and quick, which makes safety a serious engineering problem on its own. Most industrial robots live inside fenced zones with sensors and warning lights, and the arm shuts down the instant a person crosses the line. Newer machines called cobots, short for collaborative robots, are built with extra safety systems so they can work right next to people." },
          { type: "paragraph", text: "And no robot arrives knowing how to build a car. Somebody programs every move: where to go, how fast, when to fire the tool, how much force to apply, and what to do the moment something goes wrong. A factory floor is robots, conveyors, cameras, tools, and people all choreographed into one very long process." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Factory robots weld, paint, haul parts, and repeat precise motions until the shift ends. They are not human-shaped because they were never meant to be. A welding robot and a painting robot look completely different, because they are solving completely different problems." },
          { type: "callout", accent: "green", text: "That is the real lesson from a car factory. You do not design a robot to look cool. You design it to kill one specific problem. Do that a few hundred times and thousands of loose parts become something that drives away." },
        ] },
      ],
    },
    "why-is-the-sky-blue-but-sunsets-are-orange": {
      title: "Why Is the Sky Blue but Sunsets Are Orange?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m4,
      image: "/images/blog/blue and orange sky Medium.jpeg",
      imageAlt: "A sky transitioning from deep blue at the top to warm orange and pink near the horizon at sunset",
      imageCaption: "The same atmosphere that scatters blue light across the daytime sky redirects warmer wavelengths to your eyes at sunset.",
      endingProject: { href: "/projects/sunset-in-a-jar", label: "Try this project: sunset in a jar" },
      endingSecondary: { href: "/blog/why-does-metal-feel-colder-than-wood", label: "Read next: why does metal feel colder than wood?" },
      endingRelatedSlug: "why-does-metal-feel-colder-than-wood",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Look up at two in the afternoon and the sky is blue. Look up again three hours later and that same sky is burning orange, red, and pink." },
          { type: "paragraph", text: "Nothing swapped out. Same sun, same air, same you standing in the same yard. The only thing that changed is the route sunlight takes to reach your eyes, and that turns out to change everything." },
        ] },
        { title: "Sunlight Is Not Just One Color", blocks: [
          { type: "paragraph", text: "Sunlight looks white, but it is a lie of a color. It is every color at once, jammed into one beam. A rainbow that has not been unpacked yet." },
          { type: "paragraph", text: "Red, orange, yellow, green, blue, indigo, violet. Each one travels as a wave, and the waves are not the same size. Red and orange have long, lazy waves. Blue and violet have short, tight ones. That size difference is the entire reason the sky does what it does." },
        ] },
        { title: "The Air Is Not Empty", blocks: [
          { type: "paragraph", text: "The sky looks like nothing is up there. It is actually packed with molecules, way too small to see, and sunlight is smashing into them nonstop the whole way down." },
          { type: "paragraph", text: "When light hits one of those molecules, some of it scatters, which just means it ricochets off in a new direction instead of continuing straight. And here is the key: short waves scatter much more easily than long ones. Blue bounces. Red mostly plows through." },
          { type: "paragraph", text: "So during the day, blue light gets flung all over the atmosphere and then arrives at your eyes from every direction at once. That is not the sun you are seeing when you look at empty sky. That is scattered blue light coming from everywhere." },
        ] },
        { title: "So Why Isn't the Sky Purple?", blocks: [
          { type: "paragraph", text: "Excellent question, because violet scatters even harder than blue. Three things gang up on it. The sun puts out less violet to begin with, some of it gets absorbed high in the atmosphere, and your eyes are simply much more sensitive to blue than to violet." },
          { type: "paragraph", text: "Violet is up there doing its part. Blue just wins the vote." },
        ] },
        { title: "What Changes at Sunset?", blocks: [
          { type: "paragraph", text: "At sunset the sun drops low, so its light is no longer coming straight down at you. It is coming in sideways, which means it has to cut through a much longer stretch of atmosphere to reach you." },
          { type: "paragraph", text: "Picture a flashlight pointed down through a glass of water versus pointed sideways through the long way. Way more material to cross. Along that longer path, nearly all the blue gets scattered off somewhere else before it ever reaches you. What survives the trip is red, orange, and yellow, which is exactly what you see." },
        ] },
        { title: "Why Are Some Sunsets Extra Colorful?", blocks: [
          { type: "paragraph", text: "Some sunsets are forgettable. Some make everyone in the neighborhood stop and pull out a phone. The difference is usually whatever is floating around up there. Dust, water droplets, smoke, and pollution all change how the light bounces." },
          { type: "paragraph", text: "Clouds pull double duty as projection screens. With the sun low, red and orange light hits the undersides of clouds and sets them glowing. Which is why the best sunsets often show up right after a storm, when the air is clean and the sky still has some clouds hanging around." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "The sky is blue because blue scatters easily and comes at you from all directions. Sunsets go orange because low-angle light crosses so much more air that the blue is stripped out before it arrives." },
          { type: "callout", accent: "orange", text: "So a blue sky and a wild orange sunset are the same physics on different settings. You are watching sunlight negotiate with the atmosphere in real time." },
        ] },
      ],
    },
    "why-do-your-ears-pop-on-an-airplane": {
      title: "Why Do Your Ears Pop on an Airplane?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m4,
      image: "/images/blog/ears pop on airplane.jpg",
      imageAlt: "A view from inside an airplane cabin during ascent, illustrating the pressure change that causes ears to pop",
      imageCaption: "Your eardrums flex when air pressure outside changes faster than your body can equalize it. That is the pop you feel during takeoff and landing.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-is-the-sky-blue-but-sunsets-are-orange", label: "Read next: why is the sky blue but sunsets are orange?" },
      endingRelatedSlug: "why-is-the-sky-blue-but-sunsets-are-orange",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "You know the feeling. The plane starts climbing, your ears get full and muffled like someone stuffed cotton in them, and then out of nowhere: pop." },
          { type: "paragraph", text: "It is uncomfortable and a little alarming the first time. Nothing is wrong with your ears. They are dealing with a pressure problem in the only way they know how." },
        ] },
        { title: "Air Has Pressure", blocks: [
          { type: "paragraph", text: "Air feels like nothing, but there is a whole column of it stacked above your head pressing down on you right now. At sea level that column is tall and heavy, so the pressure is high. Climb higher and there is less air above you, so the pressure drops." },
          { type: "paragraph", text: "A plane taking off is hauling you into thinner air. Landing brings you back into thick air. Cabins are pressurized so nobody passes out, but the pressure inside still shifts as you go up and down. Your ears absolutely notice." },
        ] },
        { title: "Your Eardrum Feels the Difference", blocks: [
          { type: "paragraph", text: "Your eardrum is a thin sheet of tissue stretched across your ear canal, and it vibrates when sound hits it. That is how hearing works. Now the important part: there is air on both sides of it. Outside air in the canal, and a sealed pocket of air behind it in your middle ear." },
          { type: "paragraph", text: "Everything feels normal when those two sides are balanced. But when the outside pressure drops fast, the air behind your eardrum has not caught up yet, so it pushes outward on the drum and stretches it. That stretch is the clogged, full, slightly awful feeling." },
        ] },
        { title: "The Eustachian Tube Helps Fix It", blocks: [
          { type: "paragraph", text: "Your body already has a fix installed. It is a narrow passage called the Eustachian tube, running from your middle ear down to the back of your throat. It sits closed most of the time. Swallow, yawn, or chew, and it flicks open for a second." },
          { type: "paragraph", text: "In that second, air rushes in or out and the two sides even up. That release is the pop. Your body just equalized the pressure and you felt it happen." },
        ] },
        { title: "Why Landing Can Feel Worse Than Takeoff", blocks: [
          { type: "paragraph", text: "Landing usually hurts more, and there is a reason. On the way down, cabin pressure climbs, so now the outside is pushing harder than the inside and your middle ear has to pull air in to keep up." },
          { type: "paragraph", text: "If your Eustachian tubes are being stubborn, your eardrums get pressed inward instead, and that pinch is genuinely painful. It is also why flying with a cold is miserable. A stuffy nose and throat means those tubes barely open at all." },
        ] },
        { title: "Why Swallowing or Yawning Helps", blocks: [
          { type: "paragraph", text: "Swallowing and yawning flex the muscles right next to those tubes, which is what pops them open. That is the entire reason chewing gum, sipping water, or forcing a yawn during takeoff and landing works. You are manually triggering a system your body usually runs on its own." },
          { type: "paragraph", text: "It is also why babies cry on planes. They feel the pressure, they have no idea what it is, and they cannot fix it on purpose. The crying moves their throat and mouth, which pops their ears anyway. They are solving the problem by accident." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Your ears pop because air pressure changes faster than your middle ear can keep up. The eardrum takes the strain, and the Eustachian tubes even it back out." },
          { type: "callout", accent: "orange", text: "That little pop is your body running a pressure adjustment. Strange feeling, extremely good engineering." },
        ] },
      ],
    },
    "why-does-metal-feel-colder-than-wood": {
      title: "Why Does Metal Feel Colder Than Wood?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m4,
      image: "/images/blog/metal vs wood.jpg",
      imageAlt: "Metal and wooden objects side by side at room temperature, illustrating that they feel different despite being the same temperature",
      imageCaption: "Metal and wood at the same temperature feel completely different because metal conducts heat away from your hand far faster. The sensation is speed, not temperature.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-do-we-slip-on-ice", label: "Read next: why do we slip on ice?" },
      endingRelatedSlug: "why-do-we-slip-on-ice",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Go touch a metal chair leg, then touch a wooden table in the same room. The metal feels cold. The wood feels almost warm. Now the part that breaks people's brains: they are the same temperature. Both have been sitting in that room all day." },
          { type: "paragraph", text: "So what are you actually feeling? Not temperature. Speed." },
        ] },
        { title: "Your Hand Is Warm", blocks: [
          { type: "paragraph", text: "You are the hottest thing in most rooms you walk into. Your skin sits around 90°F while the room is closer to 70°F. Touch anything cooler than you and heat immediately starts pouring out of your hand and into that object." },
          { type: "paragraph", text: "Here is the twist. Your nerves cannot measure an object's temperature. They can only measure how fast heat is leaving your skin. Fast escape, your brain reports cold. Slow escape, your brain shrugs." },
        ] },
        { title: "Metal Moves Heat Quickly", blocks: [
          { type: "paragraph", text: "Metal is a fantastic thermal conductor, which means heat travels through it with almost no resistance. Touch it and your body heat does not just enter the metal, it keeps racing away from the contact point. That spot never warms up, so more heat keeps draining out of you. Your skin cools fast and your brain shouts cold." },
          { type: "paragraph", text: "Wood is terrible at conducting heat, and in this case terrible is great. Heat crawls into wood and mostly stays put right under your fingers. That little patch warms up to match your hand within seconds, and once it matches, the draining stops. Same temperature as the metal, completely different experience." },
        ] },
        { title: "Same Temperature, Different Feeling", blocks: [
          { type: "paragraph", text: "This is one of the best everyday science tricks there is: what something feels like and what temperature it is are two separate facts. A metal spoon and a wooden spoon sharing the same drawer are identical in temperature. Pick them up back to back and you will swear they are not." },
          { type: "callout", accent: "orange", text: "Your sense of touch is not a thermometer. It is a heat-flow detector. Two things at the exact same temperature can feel wildly different depending on how fast they pull warmth out of you." },
        ] },
        { title: "Why Does This Matter in Design?", blocks: [
          { type: "paragraph", text: "Engineers use this constantly. A metal pan is great precisely because heat blasts through it from the burner into your food. Unfortunately heat also blasts up the handle, which is why almost every pan has a plastic, rubber, or wooden grip bolted onto the end." },
          { type: "paragraph", text: "A winter jacket does the opposite job. It traps air, air is lousy at moving heat, and so your body warmth stays with you. Meanwhile a metal slide in July becomes a hazard because metal dumps heat into you just as efficiently as it pulls heat out. A wooden bench in the same sun is fine." },
        ] },
        { title: "What About Cold Weather?", blocks: [
          { type: "paragraph", text: "Grab a metal railing in January and it genuinely hurts. That is not because the metal is colder than the wood next to it. It is because metal strips heat out of your skin so fast that your nerves register it as pain. The metal is not colder. It is just better at robbing you." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Metal feels colder because it moves heat away from you faster. Wood feels warmer because it does not. So next time you call something cold, know what you are really reporting: not a temperature, but how quickly heat is leaving your hand." },
        ] },
      ],
    },
    "why-do-bikes-stay-balanced-when-moving": {
      title: "Why Do Bikes Stay Balanced When Moving?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m5,
      image: "/images/blog/riding on bike balancing Medium.jpeg",
      imageAlt: "A person riding a bicycle in motion, demonstrating the balance and physics that keep two wheels stable while moving",
      imageCaption: "A moving bike resists tipping due to gyroscopic forces, steering geometry, and constant small corrections from your brain, all working together invisibly.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-do-we-slip-on-ice", label: "Read next: why do we slip on ice?" },
      endingRelatedSlug: "why-do-we-slip-on-ice",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "On paper, a bicycle has no business staying upright. Two skinny wheels, a narrow frame, and a person perched on top of all of it. Try balancing on one while standing still and you will be down in seconds. Start rolling and suddenly it is effortless." },
          { type: "paragraph", text: "So what changes? Not one thing. It is motion, steering, frame design, and your brain making corrections you never notice, all stacked on top of each other." },
        ] },
        { title: "Balance Is About Keeping the Center Over the Wheels", blocks: [
          { type: "paragraph", text: "Everything has a center of mass, the single point where all its weight balances out. For you and the bike to stay up, that combined point has to stay above the line of the wheels. Let it drift too far to one side and gravity takes over." },
          { type: "paragraph", text: "Standing still, you have almost no way to fix that. You can wrench the handlebars, throw your weight around, or put a foot down. Rolling, though, you have a much better option: steer the wheels back underneath yourself." },
        ] },
        { title: "Bikes Steer Into a Lean", blocks: [
          { type: "paragraph", text: "Here is the genuinely weird part. When the bike starts tipping left, the front wheel turns left. Not away from the fall, into it. And that steers the whole bike back under your center of mass, which stands you back up." },
          { type: "paragraph", text: "You are doing this constantly and you have no idea. Every second you ride, your arms are making steering corrections too small to feel. Your brain, your arms, and the bike are running a balance loop together, and none of it reaches your conscious mind." },
        ] },
        { title: "The Wheels Help Too", blocks: [
          { type: "paragraph", text: "Spinning wheels have angular momentum, which means they resist changing direction. That gives a moving bike some extra steadiness. But it is not the main event. Researchers have built bikes that cancel out the gyroscope effect entirely and they still balance. The frame geometry is doing more work than the wheels are." },
        ] },
        { title: "Bike Design Makes Balance Easier", blocks: [
          { type: "paragraph", text: "Look at the front fork on any bike. It is angled forward, not straight up and down. That angle creates something called trail, and trail is what makes the front wheel want to line itself up with wherever the bike is going. It is the same reason a shopping cart wheel swings around to follow you." },
          { type: "paragraph", text: "Engineers obsess over this. Shift the fork angle a couple of degrees or change the wheel size and the same bike goes from stable and calm to twitchy and nervous." },
        ] },
        { title: "Why Is It Harder to Ride Slowly?", blocks: [
          { type: "paragraph", text: "Slow riding kills your options. Less speed means steering does less, so every lean takes longer to fix and every wobble grows before you can catch it. That is why riding a straight line at walking pace is genuinely difficult, and why a nervous beginner suddenly feels solid the moment they pedal a little harder." },
        ] },
        { title: "Why Can't a Bike Stand Still by Itself?", blocks: [
          { type: "paragraph", text: "Because a parked bike cannot steer itself back under anything. It starts to tip, gravity pulls harder, and there is no motion available to move the wheels sideways and rescue it. Without a kickstand, a wall, a foot, or training wheels, over it goes." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "A moving bike stays up because steering, momentum, spinning wheels, frame geometry, and your own tiny corrections are all working the problem at once." },
          { type: "callout", accent: "orange", text: "You are not balancing on a bike. You are falling in every direction slightly and catching yourself, hundreds of times a minute, without ever noticing. That is what riding actually is." },
        ] },
      ],
    },
    "why-do-we-slip-on-ice": {
      title: "Why Do We Slip on Ice?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m4,
      image: "/images/blog/why ice is so slippery.avif",
      imageAlt: "A close-up of an icy surface showing its smooth, glassy texture that drastically reduces friction underfoot",
      imageCaption: "Ice is slippery because a thin quasi-liquid layer on its surface reduces friction to near zero, so your shoes have almost nothing to grip.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-does-metal-feel-colder-than-wood", label: "Read next: why does metal feel colder than wood?" },
      endingRelatedSlug: "why-does-metal-feel-colder-than-wood",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Sidewalk: no problem. Ice: total betrayal. One second you are walking normally, the next your foot has left without you, your arms are doing something desperate, and you are negotiating with physics." },
          { type: "paragraph", text: "So what makes ice so much worse than everything else? It comes down to friction, the surface itself, the temperature, and what is happening in the paper-thin gap between your shoe and the ground." },
        ] },
        { title: "Friction Helps You Walk", blocks: [
          { type: "paragraph", text: "Friction is the force that fights sliding, and walking runs entirely on it. Every step, you shove backward against the ground and friction shoves you forward. No friction, no push, no walking. Your foot just goes." },
          { type: "paragraph", text: "Dry pavement is rough at a scale you cannot see, and all that roughness gives your sole something to bite into. Ice is smooth at that same scale, so there is nothing to bite." },
        ] },
        { title: "Ice Has a Slippery Surface", blocks: [
          { type: "paragraph", text: "Ice looks like a solid block, but the very top of it behaves strangely. Under a lot of conditions there is an incredibly thin film of water sitting on the surface, and that film is what turns bad into catastrophic." },
          { type: "paragraph", text: "So your shoe is not gripping solid ground. It is gliding across smooth ice on a microscopic layer of water doing the exact job oil does inside an engine. You are being lubricated on purpose by nature." },
        ] },
        { title: "Temperature Matters", blocks: [
          { type: "paragraph", text: "Not all ice is out to get you equally. Ice hovering near its melting point is the worst, because that watery surface layer forms easily. Really cold ice, the kind that squeaks underfoot, can actually be less slick, because there is less liquid up top." },
          { type: "paragraph", text: "Do not read that as safe. Cold ice will still take you out. Temperature just changes how it does it." },
        ] },
        { title: "Shoes Matter Too", blocks: [
          { type: "paragraph", text: "Your shoes are half the equation. A flat, worn sole has nothing to work with. Deep tread digs into snow and uneven surfaces and buys you grip, which is exactly why winter boots have aggressive patterns molded into the bottom. But be honest with yourself: on truly smooth ice, even great boots can lose. There is simply nothing there to grab." },
        ] },
        { title: "Why Do We Slide So Fast?", blocks: [
          { type: "paragraph", text: "Low friction means almost nothing is stopping your foot once it starts moving. On pavement, a small slip gets killed by friction in an inch or two. On ice, the slip just keeps going, and a tiny loss of balance turns into an entire unplanned journey." },
        ] },
        { title: "Ice Is a Design Challenge", blocks: [
          { type: "paragraph", text: "Whole professions exist to fight this. Road crews, city planners, tire engineers, boot designers, people who build sports surfaces. Salt melts the ice away. Sand throws roughness back on top of it. Tire treads carve channels to shove water and slush out of the contact patch. Different tools, one goal: get some grip back." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "You slip on ice because ice barely has friction. Its smooth surface, that thin water film, the temperature, and whatever is on your feet all decide how much grip you get." },
          { type: "callout", accent: "orange", text: "Walking is a friction trick you have been performing since you were one year old. Ice is just the one surface that refuses to hold up its end of the deal." },
        ] },
      ],
    },
    "how-do-noise-canceling-headphones-work": {
      title: "How Do Noise-Canceling Headphones Work?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m5,
      image: "/images/blog/how noise cancelling works.webp",
      imageAlt: "A pair of noise-canceling headphones with a diagram showing how anti-noise waves cancel incoming sound waves",
      imageCaption: "Noise-canceling headphones use a microphone to detect incoming sound, then play the exact opposite wave to cancel it before it reaches your ears.",
      endingProject: { href: "/projects/loudest-room", label: "Try this project: find the loudest room in the house" },
      endingSecondary: { href: "/blog/why-is-the-sky-blue-but-sunsets-are-orange", label: "Read next: why is the sky blue but sunsets are orange?" },
      endingRelatedSlug: "why-is-the-sky-blue-but-sunsets-are-orange",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Put on a good pair of noise-canceling headphones in a roaring airplane cabin and press the button. The engine noise does not fade. It vanishes, all at once, like someone unplugged the world. The first time it happens it is genuinely unsettling." },
          { type: "paragraph", text: "That is not thick padding doing the work. Those headphones are fighting sound with more sound, and it works because of how waves behave." },
        ] },
        { title: "Sound Is a Wave", blocks: [
          { type: "paragraph", text: "Sound is just air being shoved around. Someone talks, their vocal cords vibrate, and those vibrations push and pull the air into waves that travel across the room and rattle your eardrums." },
          { type: "paragraph", text: "Every sound wave has peaks and valleys, like a wiggly line moving through the air. Loud sounds have tall waves. Quiet sounds have short ones." },
        ] },
        { title: "Opposite Waves Can Cancel", blocks: [
          { type: "paragraph", text: "Now the part that makes all of this possible. Two waves can add together and get louder, but they can also fight. If one wave pushes air forward at the exact instant another pulls it backward, they cancel each other out. Peak meets valley and you get nothing." },
          { type: "paragraph", text: "That is the whole trick. The headphones generate a wave that is the perfect mirror image of the noise coming at you. The two collide near your ear and mostly erase each other. Scientists call it destructive interference." },
        ] },
        { title: "The Headphones Listen First", blocks: [
          { type: "paragraph", text: "Before they can cancel anything, they have to hear it. Tiny microphones on the outside of each cup pick up whatever is around you, the engine drone, the train rumble, the air conditioner. The electronics inside analyze that wave and build its opposite in a fraction of a millisecond. Then the same speakers playing your music quietly play the anti-noise too." },
          { type: "paragraph", text: "You never hear that anti-noise as sound. You just hear the original noise get smaller." },
        ] },
        { title: "Why They Work Best With Steady Sounds", blocks: [
          { type: "paragraph", text: "Constant, droning sounds are the easy target. Airplane engines, fans, AC units, train rumble. They repeat, so they are easy to predict, and predicting is most of the battle." },
          { type: "paragraph", text: "Sudden sounds are a nightmare. A dog bark, a clap, someone shouting your name. By the time the system has analyzed it, the sound has already reached your ear. So the headphones knock it down a little and let the rest through. That is why the world gets quieter and never goes completely silent." },
        ] },
        { title: "Passive vs. Active Noise Canceling", blocks: [
          { type: "paragraph", text: "Two different things are happening at once. Passive reduction is physical: thick cushions sealing against your head, blocking sound the old-fashioned way. Active canceling is the microphone-and-opposite-wave system. Good headphones do both, and the two together are what make an airplane cabin feel like a library." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Noise-canceling headphones listen to the noise around you, build its exact opposite, and play it into your ear. The two waves meet, cancel, and a big chunk of the noise stops existing." },
          { type: "callout", accent: "orange", text: "They are not fancy earmuffs. They are tiny sound engineers strapped to your head, running the math thousands of times a second." },
        ] },
      ],
    },
    "why-do-some-things-float-and-others-sink": {
      title: "Why Do Some Things Float and Others Sink?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m4,
      image: "/images/blog/Why some things sink while other things float.png",
      imageAlt: "Students experimenting with buoyancy and water at an Avanza STEM science workshop",
      imageCaption: "Floating is not just about being light. It is about weight, shape, and how much water gets pushed out of the way.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-do-magnets-stick-to-some-metals-but-not-others", label: "Read next: why do magnets stick to some metals but not others?" },
      endingRelatedSlug: "why-do-magnets-stick-to-some-metals-but-not-others",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Toss a rock in a lake and it is gone. Toss in a beach ball and it bobs right back. Fine, makes sense. Now explain the 200,000-ton steel cargo ship sitting on top of the same water. Steel does not float. Except apparently it does." },
          { type: "paragraph", text: "The word for what is going on here is buoyancy, and once it clicks the ship stops being weird." },
        ] },
        { title: "Water Pushes Up", blocks: [
          { type: "paragraph", text: "Water is not a passive thing you drop stuff into. It pushes back. Put anything in water and the water shoves upward on it, and that shove has a name: buoyant force. Meanwhile gravity is pulling down. Whichever one wins decides everything. Buoyant force big enough to match the weight? It floats. Gravity wins? Down it goes." },
        ] },
        { title: "Objects Push Water Out of the Way", blocks: [
          { type: "paragraph", text: "Here is where it gets interesting. Anything you put in water has to shove water aside to make room for itself. That shoving-aside is called displacement, and the more water you displace, the harder the water pushes back up. Which means shape is not a detail. Shape is the whole game." },
        ] },
        { title: "Density Is a Big Clue", blocks: [
          { type: "paragraph", text: "Density is how much stuff is crammed into a given space. A rock is dense: tons of matter squeezed into a small volume. A foam ball is not: mostly air with a little plastic holding it together. Denser than water, you generally sink. Less dense, you generally float. Generally. Shape can flip the whole thing." },
        ] },
        { title: "Why Can a Steel Ship Float?", blocks: [
          { type: "paragraph", text: "Steel is way denser than water, and a solid steel ball drops like the rock. But a ship is not solid steel. It is a thin steel shell wrapped around an enormous volume of air, and that shape displaces a staggering amount of water." },
          { type: "paragraph", text: "Count the air, and the ship's average density comes out lower than water. That is the loophole, and it is why it floats. Punch a hole in the hull and water replaces the air. Average density climbs past water. And then the ship goes down, exactly the way the rock did." },
        ] },
        { title: "Why Do Boats Have Wide Bottoms?", blocks: [
          { type: "paragraph", text: "Because wide means more water displaced, and more water displaced means a bigger push upward. A canoe, a cargo ship, and a cruise liner look nothing alike, but every one of those hulls was shaped around the same buoyancy math. Anybody designing something that floats is juggling weight, shape, balance, and materials at the same time." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Things float when the water pushing up can match the weight pulling down. Density gets you partway there. Shape decides the rest." },
          { type: "callout", accent: "orange", text: "A pebble sinks because it is dense and barely displaces anything. A cruise ship floats because its shape shoves aside an ocean's worth of water. Floating was never about being light. It is about how much water you can push out of the way." },
        ] },
      ],
    },
    "why-do-magnets-stick-to-some-metals-but-not-others": {
      title: "Why Do Magnets Stick to Some Metals but Not Others?",
      category: "Science",
      categoryColor: "bg-avanza-orange",
      readTime: common.en.minutes.m5,
      image: "/images/blog/how magnets really work.jpg",
      imageAlt: "A magnet attracting iron filings that align to reveal the invisible magnetic field lines emanating from its poles",
      imageCaption: "Magnets stick to iron and steel because tiny magnetic domains inside those metals line up with the external field. In copper or aluminum, they cannot.",
      endingProject: { href: "/workshops", label: "Join a free Avanza STEM science workshop" },
      endingSecondary: { href: "/blog/why-do-some-things-float-and-others-sink", label: "Read next: why do some things float and others sink?" },
      endingRelatedSlug: "why-do-some-things-float-and-others-sink",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Magnets seem like they have one simple rule. Stick to fridge, grab paper clips, snap onto metal. Easy. Then you try one on aluminum foil, or a penny, or a soda can, and absolutely nothing happens. All of those are metal. So what gives?" },
          { type: "paragraph", text: "The answer is happening way down at the level of the particles inside the material." },
        ] },
        { title: "Magnets Have Invisible Fields", blocks: [
          { type: "paragraph", text: "Every magnet is surrounded by a field you cannot see but can absolutely feel. Bring one near a paper clip and the clip jumps. Bring one near another magnet and you can feel the invisible push before anything touches. That field is strongest at the ends, the poles, which we call north and south." },
          { type: "paragraph", text: "Opposites attract, matching poles shove each other away. Flip one magnet around and the same two objects go from grabbing each other to fighting. Same magnets, opposite behavior, and nothing changed but the direction." },
        ] },
        { title: "Not All Metals Are Magnetic", blocks: [
          { type: "paragraph", text: "The big misconception is that metal means magnetic. It does not. Iron is strongly magnetic. Steel usually is, because steel is mostly iron. Nickel and cobalt make the list too. But aluminum, copper, gold, silver, and brass? A fridge magnet will not care about any of them. They are perfectly good metals that simply do not do this particular trick." },
        ] },
        { title: "Tiny Magnetic Regions", blocks: [
          { type: "paragraph", text: "Inside a magnetic material there are microscopic zones called domains. Picture each one as a tiny arrow pointing some magnetic direction. In a plain unmagnetized chunk of iron, those arrows are pointing every which way, so all their little pulls cancel each other out and the iron does nothing." },
          { type: "paragraph", text: "Bring a magnet close and the arrows start swinging into alignment. Get enough of them pointing the same direction and the whole piece of metal becomes attracted. That is what is happening when a paper clip snaps to a magnet. You did not add magnetism. You organized what was already in there." },
        ] },
        { title: "Why Doesn't Copper Stick?", blocks: [
          { type: "paragraph", text: "Copper has electrons doing their thing just like iron does. What it does not have is a structure that lets all those tiny magnetic effects line up and add together. Without that alignment, there is nothing for the magnet to grab. Aluminum, gold, and most other metals are in the same boat. The ingredients are there. The arrangement is not." },
        ] },
        { title: "What About Steel?", blocks: [
          { type: "paragraph", text: "Steel is iron with other elements mixed in, usually carbon. Iron content means most steel is magnetic. But not all of it, and this trips people up. Certain stainless steels barely respond to a magnet at all, because the way their atoms are arranged internally is different. That is why a magnet slaps onto one steel thing and slides right off another that looks identical." },
        ] },
        { title: "Magnets Are Useful Because They Are Selective", blocks: [
          { type: "paragraph", text: "The picky behavior is exactly what makes magnets useful. Recycling plants run giant magnets over the conveyor to yank iron and steel out of a mixed stream in one pass. Electric motors turn magnetism into motion. Speakers turn electrical signals into sound with a magnet and a coil. A compass reads the magnetic field of the entire planet. This is not a fridge trick. It is load-bearing technology." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Magnets stick to metals whose internal domains can line up with a magnetic field. Iron, steel, nickel, and cobalt can do it. Copper and aluminum cannot, because their structure does not allow that alignment." },
          { type: "callout", accent: "orange", text: "So when a magnet slides off a metal object, nothing is broken. That metal just is not the magnetic kind, and now you know why." },
        ] },
      ],
    },
    "how-does-a-camera-work-without-a-lens": {
      title: "How Does a Camera Work Without a Lens?",
      category: "Light & Optics",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      image: "",
      imageAlt: "",
      imageCaption: "",
      endingProject: { href: "/projects/shoebox-camera-obscura", label: "Try this project: shoebox camera obscura" },
      endingSecondary: { href: "/blog/is-light-a-wave-or-a-particle", label: "Read next: is light a wave or a particle?" },
      endingRelatedSlug: "why-is-the-sky-blue-but-sunsets-are-orange",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "No lens. No battery. No film, no sensor, no app. A cardboard box with one pinhole in it will show you a full-color, moving picture of the world outside, and it has been doing that for at least a thousand years." },
          { type: "paragraph", text: "It is also the simplest way to understand what every camera, and your own eye, is actually doing." },
        ] },
        { title: "Light Goes Straight, and That Is the Whole Trick", blocks: [
          { type: "paragraph", text: "Every lit-up point in front of you is throwing light in every direction at once. The top of a tree outside your window is sending rays toward the sky, toward the ground, toward your face, and toward every part of the wall behind you." },
          { type: "paragraph", text: "Now put a wall between the tree and a sheet of paper, and punch one small hole in it. Almost all of those rays get stopped. From the top of the tree, only the one narrow bundle aimed exactly at your hole makes it through, and because light travels in straight lines, that bundle keeps going and lands on one small spot on the paper." },
          { type: "paragraph", text: "The same thing happens for every other point on the tree. Each one gets its own small spot. Line up all those spots and you have a picture." },
        ] },
        { title: "Why the Picture Is Upside Down", blocks: [
          { type: "paragraph", text: "Rays from the top of the tree are travelling downward as they pass through the hole, so they land low on the paper. Rays from the bottom are travelling upward, so they land high. The two paths cross each other right at the pinhole." },
          { type: "paragraph", text: "Nothing is flipping the image. It arrives inverted because straight lines through a single point have no other option, and left and right get swapped for exactly the same reason." },
          { type: "callout", accent: "teal", title: "Try this", text: "Hold a finger over the top half of the hole. The bottom half of the picture is what disappears. That one test tells you more about how the image is built than any diagram." },
        ] },
        { title: "Smaller Hole, Sharper Picture", blocks: [
          { type: "paragraph", text: "A hole is not really a point, it is an opening with a width. So each point on the tree does not make a perfect dot on the paper, it makes a small disc, roughly as wide as the hole itself." },
          { type: "paragraph", text: "Make the hole bigger and every one of those discs gets wider. They start overlapping their neighbors, and overlapping discs are what blur looks like. Make the hole smaller and the discs shrink, the overlap shrinks, and detail appears." },
          { type: "paragraph", text: "You pay for it in brightness. A smaller hole lets less light through, so the picture that gets sharper also gets dimmer. That trade is not a flaw in cardboard cameras. Photographers still make exactly this trade every time they change the aperture on a modern lens." },
        ] },
        { title: "So Why Not Make the Hole Microscopically Small?", blocks: [
          { type: "paragraph", text: "Because light stops cooperating. Below roughly half a millimeter, a strange thing happens: instead of continuing in a tidy straight line, light passing through a very narrow opening spreads out as it leaves." },
          { type: "paragraph", text: "That spreading is called diffraction, and it means the discs start growing again. There is a sweet spot, a hole size where the shrinking from geometry and the spreading from diffraction balance out, and your picture is as sharp as that box will ever get. Go smaller than that and you make things worse." },
          { type: "callout", accent: "purple", title: "The same effect, doing something useful", text: "Diffraction is not just a nuisance here. Send a laser through two narrow slits instead of one hole and that same spreading produces a row of stripes on the wall, which is the experiment that told physicists light behaves like a wave." },
        ] },
        { title: "Your Eye Is Doing This Right Now", blocks: [
          { type: "paragraph", text: "Your eye is a dark box with a hole in the front. The hole is your pupil, and the back wall is your retina. The image landing on your retina at this moment is upside down and backwards, exactly like the one in a shoebox." },
          { type: "paragraph", text: "Your eye then adds something a pinhole camera does not have: a lens, which lets the opening be much wider while still bringing rays back to a sharp point. That is how you get a picture that is bright and sharp at the same time, instead of having to pick one." },
          { type: "paragraph", text: "Your brain handles the upside down part without ever mentioning it to you." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "A camera does not need glass, electronics, or anything clever. It needs a dark space, one small opening, and the fact that light travels in straight lines. Everything after that, lenses included, is an improvement on a picture that already exists." },
          { type: "callout", accent: "green", text: "You can build one this afternoon out of a shoebox and a piece of foil, and the first time the outside world appears on the tracing paper, upside down and in color, it does not feel like a science demonstration. It feels like a trick." },
          { type: "ctaLink", title: "Build one", accent: "teal", text: "Our step-by-step guide walks through sealing the box, making a clean pinhole in foil, and swapping in three different hole sizes so you can find the sharpest one yourself.", linkText: "Shoebox camera obscura guide", href: "/projects/shoebox-camera-obscura" },
        ] },
      ],
    },
    "how-do-fiber-optic-cables-work": {
      title: "How Do Fiber Optic Cables Work?",
      category: "Light & Optics",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m6,
      image: "",
      imageAlt: "",
      imageCaption: "",
      endingProject: { href: "/projects/light-pipe-water-stream", label: "Try this project: bending light down a stream of water" },
      endingSecondary: { href: "/blog/how-does-a-camera-work-without-a-lens", label: "Read next: how does a camera work without a lens?" },
      endingRelatedSlug: "how-does-a-camera-work-without-a-lens",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "This page reached you as pulses of light. For most of its journey it was travelling inside a strand of glass thinner than a human hair, and a good part of that journey was along the floor of an ocean." },
          { type: "paragraph", text: "Which raises an awkward question, because light travels in straight lines and the cable does not." },
        ] },
        { title: "Light Really Does Go Straight", blocks: [
          { type: "paragraph", text: "It is not a simplification. Straight-line travel is why a pinhole camera works, why shadows have sharp edges, and why you cannot see around a corner." },
          { type: "paragraph", text: "So a fiber that curves under the sea should leak its light out at the first bend, like water out of a bent hose with a hole in it. It does not. A modern fiber can carry a signal something like fifty to a hundred kilometers before it needs any help at all." },
          { type: "paragraph", text: "The light is not bending. It is bouncing, and the bouncing is the part worth understanding." },
        ] },
        { title: "The Bounce That Loses Nothing", blocks: [
          { type: "paragraph", text: "When light inside a dense material like glass or water arrives at the boundary with something less dense, like air, one of two things happens. Hit that boundary steeply and most of the light escapes. Hit it at a shallow enough angle and none of it does. All of it reflects back inside." },
          { type: "paragraph", text: "There is a specific cutoff angle where the behavior switches over, called the critical angle. For water it sits at about 49 degrees. For glass it is closer to 42. Shallower than the cutoff and the light is trapped." },
          { type: "callout", accent: "teal", title: "Why not just line the cable with mirrors?", text: "Because mirrors are not perfect. Every bounce off even a very good mirror loses a percent or two, and after a few thousand bounces there is nothing left. Total internal reflection is not a good mirror, it is not a mirror at all: nothing is absorbed, because nothing gets out." },
        ] },
        { title: "How You Get Light to Stay Inside", blocks: [
          { type: "paragraph", text: "Send light into a fiber at a shallow angle and it strikes the wall past the critical angle, reflects, crosses to the other wall, and strikes that one at the same shallow angle too. So it bounces again. And again, tens of thousands of times per kilometer, zigzagging its way along." },
          { type: "paragraph", text: "When the fiber curves gently, the geometry still holds. Each bounce keeps arriving shallower than the cutoff, so the light keeps being turned back inward and ends up following the curve. Bend a fiber too tightly and you break that condition, the angle goes past the cutoff, and the light escapes. Installers have a minimum bend radius for exactly this reason." },
          { type: "paragraph", text: "Real fibers do not rely on a glass-to-air boundary, because a scratch or a fingerprint would ruin it. Instead the glass core is wrapped in a second layer of glass called cladding, made slightly less dense on purpose. The bounce then happens at a boundary buried safely inside the cable." },
        ] },
        { title: "Why Glass Beat Copper", blocks: [
          { type: "numbered", items: [
            { title: "Light can carry far more", body: "Information is carried by flickering the signal on and off. Light waves cycle vastly faster than the electrical signals in a copper wire, so they can be flickered vastly faster too." },
            { title: "Many colors, one strand", body: "A single fiber can carry dozens of different wavelengths at the same time, each one an independent channel, and they pass straight through each other without interfering." },
            { title: "It barely fades", body: "Modern fiber is so transparent that if the ocean were made of it you could see the bottom. That is why the signal survives tens of kilometers between amplifiers." },
            { title: "It ignores electrical noise", body: "A copper wire picks up interference from motors, lightning, and other cables. A photon is not bothered by any of it." },
          ] },
        ] },
        { title: "You Can Watch It Happen in Your Kitchen", blocks: [
          { type: "paragraph", text: "You do not need glass. Water works, because water has a critical angle too." },
          { type: "paragraph", text: "Punch a hole low in a plastic bottle, fill it with water, and let the stream arc out into a sink. Shine a light in through the opposite side, straight at the hole, and the beam gets caught in the falling stream. It follows the arc all the way down and lights up the spot where the water lands." },
          { type: "paragraph", text: "Put a finger in the stream and the light stops dead at your finger, because you have broken the smooth surface it was bouncing off. That is the same failure mode as a fiber bent too tightly, and it is the clearest thirty seconds of the whole demonstration." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Fiber optic cables do not bend light. They trap it, using a boundary that reflects perfectly whenever light arrives at a shallow enough angle, and then they let the trapped light follow wherever the glass goes." },
          { type: "callout", accent: "green", text: "It is the same effect that makes the underside of a swimming pool surface look like a mirror when you are down there looking up. Most of the internet runs on it." },
          { type: "ctaLink", title: "See it for yourself", accent: "teal", text: "Our guide walks through the bottle, the hole, the stream, and the safety rules for the light source, plus how to measure how far the light stays trapped before it leaks out.", linkText: "Bending light down a stream of water", href: "/projects/light-pipe-water-stream" },
        ] },
      ],
    },
    "how-do-scientists-know-what-stars-are-made-of": {
      title: "How Do Scientists Know What Stars Are Made Of?",
      category: "Light & Optics",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m6,
      image: "",
      imageAlt: "",
      imageCaption: "",
      endingProject: { href: "/projects/cd-spectroscope", label: "Try this project: build a spectroscope from a CD" },
      endingSecondary: { href: "/blog/why-do-things-glow-under-a-blacklight", label: "Read next: why do things glow under a blacklight?" },
      endingRelatedSlug: "why-is-the-sky-blue-but-sunsets-are-orange",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Nobody has been to a star. Nobody has brought a piece of one back. The closest one is 150 million kilometers away and everything after that is unreachable for a very long time." },
          { type: "paragraph", text: "And yet we can tell you what stars are made of, in what proportions, how hot they are, and whether they are moving toward us or away. All of it came from light, and you can do a simplified version of the same measurement with a cereal box." },
        ] },
        { title: "Split the Light and It Stops Being One Color", blocks: [
          { type: "paragraph", text: "White light is not a color. It is every color at once, and the only reason it looks white is that your eye adds them all together." },
          { type: "paragraph", text: "Spread them back apart, with a prism or with something that has microscopically fine grooves in it, and the mixture separates. What you get is called a spectrum, and it is the single most useful thing in astronomy." },
        ] },
        { title: "Some Lights Give You a Rainbow, Others Give You Stripes", blocks: [
          { type: "paragraph", text: "Take the spectrum of an old filament light bulb and you get a smooth continuous band. Red bleeds into orange bleeds into yellow, with nothing missing anywhere." },
          { type: "paragraph", text: "Now take the spectrum of a fluorescent tube. It looks nothing like that. Instead of a smooth band you get a handful of separate bright lines with darkness between them: a strong green, a pair of yellows, a blue. Only certain exact colors are there, and the rest were never emitted at all." },
          { type: "paragraph", text: "The difference is what the light is coming from. A hot solid glows in every color because its atoms are crowded together and constantly jostling each other. A thin glowing gas has atoms far enough apart to act on their own, and on their own they are astonishingly picky." },
        ] },
        { title: "Why an Atom Is Picky", blocks: [
          { type: "paragraph", text: "Here is the part that took physics a long time to accept. An electron inside an atom cannot have just any amount of energy. It can only occupy certain fixed levels, and there is no in between." },
          { type: "paragraph", text: "Think of a ladder where you can stand on the rungs but there is genuinely no space between them. Not a ramp with steps drawn on it. A ramp does not exist for an electron." },
          { type: "paragraph", text: "When an electron drops from a higher rung to a lower one, the leftover energy leaves as a single photon, and the energy of that photon is set exactly by the size of the gap it fell across. Photon energy determines color. So a fixed set of gaps produces a fixed set of colors, and nothing else." },
          { type: "callout", accent: "purple", title: "This is where quantum mechanics came from", text: "Those separated lines were not predicted, they were found, and nobody could explain why light came in specific colors instead of a smooth spread. The word quantum means a fixed amount, and it entered physics because atoms insisted on it." },
        ] },
        { title: "Every Element Has Its Own Set of Stripes", blocks: [
          { type: "paragraph", text: "Different elements have different rungs, so they emit different colors. Sodium produces an intense pair of yellow lines so close together they look like one, which is why old street lamps had that unmistakable orange glow. Hydrogen has a red line, a blue-green one, and a couple in violet. Neon has a crowd of reds and oranges, which is why a neon sign is that color and not some other." },
          { type: "paragraph", text: "Those patterns do not shift. They are the same in a laboratory in New Jersey and in a star. So if you spread out the light from something unreachable and find sodium's yellow pair sitting exactly where sodium's yellow pair belongs, you have identified sodium in an object you will never touch." },
        ] },
        { title: "Helium Was Found in the Sun Before It Was Found on Earth", blocks: [
          { type: "paragraph", text: "During a solar eclipse in 1868, astronomers examined the spectrum of the glowing edge of the sun and found a yellow line that did not match any known element. It was not sodium, it was not anything on the list." },
          { type: "paragraph", text: "The conclusion was bold and correct: the sun contains an element nobody on Earth had ever isolated. It was named helium, after helios, the Greek word for sun." },
          { type: "paragraph", text: "It took another twenty-seven years before anyone found helium on Earth to confirm it. An element was discovered by looking at a stripe of light, ninety-three million miles from the nearest sample." },
        ] },
        { title: "Dark Lines Tell You What Got in the Way", blocks: [
          { type: "paragraph", text: "There is a second trick hiding in the same spectrum. Atoms absorb precisely the colors they would emit, so cool gas sitting in front of a hot source removes those exact colors from the light passing through." },
          { type: "paragraph", text: "Spread out sunlight carefully and the rainbow is crossed by hundreds of thin dark gaps. Each one is a color that got absorbed on the way out, by a specific element in the sun's own atmosphere. The missing colors are the message." },
          { type: "callout", accent: "orange", text: "This is how we know stars are mostly hydrogen and helium, how the composition of a planet's atmosphere gets measured from light-years away, and how astronomers tell whether a galaxy is rushing away from us: the whole pattern shifts toward red when it is." },
        ] },
        { title: "You Can Do the Simple Version With a Cereal Box", blocks: [
          { type: "paragraph", text: "A CD has grooves packed closer together than the wavelength of light, which makes it a diffraction grating: the working part of a real spectroscope. Tape one inside a cereal box with a narrow slit at the far end and you have an instrument." },
          { type: "paragraph", text: "Point it at daylight bounced off a wall and you get the smooth continuous band. Point it at a fluorescent tube and the separated lines appear. Nobody has to tell you they are there. You just look, and there they are." },
          { type: "ctaLink", title: "Build the spectroscope", accent: "teal", text: "Our guide covers the slit, cutting the disc safely, getting the angle right, and a comparison sheet for sketching four different light sources side by side.", linkText: "Build a spectroscope from a CD", href: "/projects/cd-spectroscope" },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "We know what stars are made of because atoms can only emit and absorb specific colors, those colors are a fingerprint, and light carries the fingerprint across any distance without changing it." },
          { type: "callout", accent: "green", text: "The lines you can see in a cereal box are the same lines that identified an element in the sun before anyone had found it on Earth. Same physics, worse equipment." },
        ] },
      ],
    },
    "why-do-things-glow-under-a-blacklight": {
      title: "Why Do Things Glow Under a Blacklight?",
      category: "Light & Optics",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m5,
      image: "",
      imageAlt: "",
      imageCaption: "",
      endingProject: { href: "/projects/uv-glow-lab", label: "Try this project: the glow rule" },
      endingSecondary: { href: "/blog/how-do-scientists-know-what-stars-are-made-of", label: "Read next: how do scientists know what stars are made of?" },
      endingRelatedSlug: "how-do-scientists-know-what-stars-are-made-of",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "Switch on a blacklight and ordinary things start behaving strangely. Tonic water turns a vivid blue. A highlighter mark blazes. White socks light up, laundry powder glows, and a banknote reveals a strip that was invisible a second ago." },
          { type: "paragraph", text: "The strangest part is that the lamp does not look like it is putting out much of anything. So where is all that color coming from?" },
        ] },
        { title: "Ultraviolet Is Light You Cannot See", blocks: [
          { type: "paragraph", text: "Your eye handles a band of colors from red at one end to violet at the other. Just past violet, the waves keep getting shorter and your eye simply stops reporting them. That is ultraviolet." },
          { type: "paragraph", text: "Shorter waves mean more energy per photon. An ultraviolet photon arrives carrying more punch than any photon you can actually see, and that extra energy is the whole reason the glow happens." },
          { type: "paragraph", text: "A cheap blacklight is not pure ultraviolet, which is why it looks faintly purple: a little visible violet leaks out along with the invisible part." },
        ] },
        { title: "The Glow Is New Light, Not Reflected Light", blocks: [
          { type: "paragraph", text: "This is the piece people usually get wrong. A glowing highlighter mark is not bouncing the lamp's light back at you. It is absorbing that light, keeping it for a fraction of a billionth of a second, and then making its own." },
          { type: "paragraph", text: "You can tell because the color changes. Reflection cannot do that. A red shirt under blue light looks dark, not red, because reflection can only give back a subset of what fell on it. Something invisible going in and bright blue coming out is not reflection at all." },
        ] },
        { title: "Up, Then Down, With a Little Lost on the Way", blocks: [
          { type: "numbered", items: [
            { title: "Absorb", body: "An ultraviolet photon hits the right kind of molecule and is swallowed whole. Its energy lifts an electron up to a higher energy level." },
            { title: "Settle", body: "The electron immediately gives up a small part of that energy, usually as a tiny amount of heat shaken into the molecule around it." },
            { title: "Emit", body: "The electron falls back down and releases the rest as a brand new photon of its own." },
          ] },
          { type: "paragraph", text: "Because step two threw a little energy away, the photon that comes out in step three always has less energy than the one that went in. Less energy means a longer wavelength, and longer wavelength means a color further toward red." },
        ] },
        { title: "The Rule With No Exceptions", blocks: [
          { type: "paragraph", text: "That gives you a rule you can go and test: the light coming out is always a lower-energy color than the light going in. Ultraviolet in, blue out. Blue in, green or yellow out. The shift only ever goes one way." },
          { type: "paragraph", text: "You will not find something that takes in red and hands back blue, because that would mean getting more energy out than went in. The step down even has a name, the Stokes shift, after the physicist who wrote it down in the 1850s." },
          { type: "callout", accent: "teal", title: "Worth doing", text: "Go hunting for the exception on purpose. Failing to find one is what turns a list of glowing objects into an actual rule, and rules are what physics is made of." },
        ] },
        { title: "Why Detergent Makes Clothes Look Whiter Than White", blocks: [
          { type: "paragraph", text: "Laundry powder has fluorescent compounds added to it deliberately. They are called optical brighteners, and they stay in the fabric after washing." },
          { type: "paragraph", text: "Daylight contains ultraviolet. Those brighteners catch the ultraviolet you cannot see and hand it back as visible blue, so the shirt returns slightly more visible light than actually landed on it. It is not whiter. It is cheating, very slightly, using light you were never able to see in the first place." },
          { type: "paragraph", text: "The blue is chosen on purpose too, because fabric tends to yellow with age and a touch of blue cancels that out." },
        ] },
        { title: "Glow-in-the-Dark Is the Slow Version", blocks: [
          { type: "paragraph", text: "Everything above stops the instant the lamp goes off. Fluorescence is fast: absorb, emit, done, in less than a millionth of a second." },
          { type: "paragraph", text: "Glow-in-the-dark stars are different. In those materials the lifted electron gets stuck in a state it cannot easily drop out of, so instead of falling back immediately it waits. And waits. The energy trickles out over minutes rather than pouring out at once, which is why the stars keep going long after you have turned everything off. That slower cousin is called phosphorescence." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Things glow under a blacklight because they absorb high-energy invisible photons and emit lower-energy visible ones. The color always steps down, never up, because a little energy is always lost on the way." },
          { type: "callout", accent: "green", text: "A five dollar torch, a bottle of tonic water, and a dark room is enough to watch photon energy behave in a way you can predict before you test it." },
          { type: "ctaLink", title: "Run the hunt", accent: "teal", text: "Our guide has the safe torch specification, a list of things worth testing, and a log sheet built around comparing the color going in against the color coming out.", linkText: "The Glow Rule", href: "/projects/uv-glow-lab" },
        ] },
      ],
    },
    "is-light-a-wave-or-a-particle": {
      title: "Is Light a Wave or a Particle?",
      category: "Light & Optics",
      categoryColor: "bg-avanza-teal",
      readTime: common.en.minutes.m7,
      image: "",
      imageAlt: "",
      imageCaption: "",
      endingProject: { href: "/projects/double-slit-at-home", label: "Try this project: the double slit on your bedroom wall" },
      endingSecondary: { href: "/blog/how-do-scientists-know-what-stars-are-made-of", label: "Read next: how do scientists know what stars are made of?" },
      endingRelatedSlug: "how-do-scientists-know-what-stars-are-made-of",
      sections: [
        { title: "", blocks: [
          { type: "paragraph", text: "The honest answer is that light is neither, and that this is not a dodge." },
          { type: "paragraph", text: "Waves and particles are both ideas we borrowed from things much bigger than light: ripples on a pond, and thrown pebbles. Light behaves like each of them in different experiments, and like neither of them all the time. Getting to that conclusion took about two centuries and three rounds of argument." },
        ] },
        { title: "Round One: Light Is a Wave", blocks: [
          { type: "paragraph", text: "In 1801 Thomas Young cut two narrow slits close together and shone light through them onto a screen." },
          { type: "paragraph", text: "If light were a stream of tiny bullets, the answer is obvious: two bright bands, one behind each slit. That is not what appeared. He got a whole row of evenly spaced bright stripes with dark gaps between them, spreading out well beyond where the two slits were." },
          { type: "paragraph", text: "That pattern has only one good explanation. Waves leaving the two slits travel slightly different distances to reach each point on the screen. Where the difference is a whole number of wavelengths, the crests line up and add together into a bright stripe. Where it is half a wavelength, a crest meets a trough and they cancel into darkness." },
          { type: "paragraph", text: "Two things adding up to nothing is something only waves do. Bullets do not cancel. Round one to the wave." },
        ] },
        { title: "Round Two: Light Is a Particle", blocks: [
          { type: "paragraph", text: "A century later a different experiment refused to fit. Shine light on a piece of metal and electrons can be knocked loose. Reasonable enough, if light is a wave delivering energy." },
          { type: "paragraph", text: "But the details were wrong in a way nobody could explain. Shine a very dim blue light and electrons come out immediately. Shine an extremely bright red light and none come out at all, no matter how long you wait or how much you crank up the brightness." },
          { type: "paragraph", text: "A wave should not care. Pile on enough energy and the electron should eventually shake loose. It never did." },
          { type: "paragraph", text: "Einstein's explanation in 1905 was that light arrives in individual packets, and the energy of each packet is set by its color, not by the brightness. A blue packet carries enough to free an electron. A red packet does not, and a billion red packets are still a billion things that individually cannot do the job. Brightness only changes how many packets arrive." },
          { type: "callout", accent: "orange", title: "Worth knowing", text: "Einstein's Nobel Prize was for this, not for relativity. Those packets are what we now call photons, and this is the same idea that explains why ultraviolet makes things glow and visible light does not." },
        ] },
        { title: "Round Three: Both, and It Gets Stranger", blocks: [
          { type: "paragraph", text: "So light comes in packets, and light makes interference stripes. Those two facts sound like they belong to different objects. So somebody eventually did the obvious cruel experiment: run the double slit again, but turn the source down so far that only one photon is in the apparatus at a time." },
          { type: "paragraph", text: "Each photon arrives at the screen as a single dot, in one specific place, exactly like a particle. No stripes, just a dot. Then another dot somewhere else. Then another." },
          { type: "paragraph", text: "Leave it running for hours and the dots pile up. And the pattern they build, one isolated arrival at a time, is the striped interference pattern. With nothing else in the machine to interfere with, each photon behaved as though it went through both slits and interfered with itself." },
          { type: "paragraph", text: "That result is not a metaphor or a simplification. It is what the experiment does." },
        ] },
        { title: "What This Does Not Mean", blocks: [
          { type: "paragraph", text: "It does not mean light is confused, or that it decides what to be based on how you feel about it, or that thinking about something changes it. Those versions get repeated a lot and they are not what the physics says." },
          { type: "paragraph", text: "What it means is narrower and more interesting. Wave and particle are two pictures we invented from watching everyday objects, and photons are not everyday objects. Each picture predicts the outcome perfectly in some situations and fails in others. The mathematics handles all of it consistently. It is only the pictures in our heads that have to take turns." },
          { type: "quote", text: "The failure is not in light. It is in expecting something that small to resemble anything we have ever held.", attribution: "The usual conclusion, put plainly" },
        ] },
        { title: "What You Can and Cannot Do at Home", blocks: [
          { type: "paragraph", text: "You can absolutely get Young's result. Two slits cut into aluminum foil, a cheap red laser held by an adult, and a wall a few meters away will give you the stripes. It takes some patience to cut the slits close enough together, and that is genuinely the hard part." },
          { type: "paragraph", text: "You can then go further than Young did, because you know something he did not: the wavelength of your laser. Measure how far apart the stripes are, and you can work backwards to calculate the gap between your two slits, a distance far too small to measure with any ruler you own." },
          { type: "paragraph", text: "What you cannot do at home is round three. Your laser is firing trillions of photons at once, so what lands on your wall is honest wave interference and nothing weirder. Doing the one-photon-at-a-time version needs detectors and darkness that a bedroom cannot provide." },
          { type: "callout", accent: "purple", text: "That is worth being straight about. The pattern on your wall is the evidence that convinced 1801. The strange part came a hundred and twenty years later, and it starts from exactly the same stripes." },
        ] },
        { title: "The Big Idea", blocks: [
          { type: "paragraph", text: "Light interferes like a wave, arrives like a particle, and does both in the same experiment. Neither picture is wrong and neither is complete, because both were built by people looking at things enormously larger than a photon." },
          { type: "ctaLink", title: "Get the stripes", accent: "teal", text: "Our guide covers cutting the slits, the laser safety rules, and the arithmetic for turning your fringe spacing into a slit separation you could never measure directly.", linkText: "The double slit on your bedroom wall", href: "/projects/double-slit-at-home" },
        ] },
      ],
    },
  },
  es: {},
  zh: {},
  pt: {},
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
        { type: "paragraph", text: "Algo que sorprende a mucha gente: programar se está volviendo una habilidad básica, al mismo nivel que leer y escribir. Y aun así, muchísimos niños terminan la escuela sin escribir una sola línea de código." },
        { type: "paragraph", text: "Lo vimos pasar en la Biblioteca Pública de Clifton. Un estudiante escribió un programa que hacía exactamente una cosa: imprimir la palabra \"Hola\". Después pasó veinte minutos llenándolo de preguntas nuevas, chistes malos y efectos de sonido. Nadie se lo pidió. Acababa de descubrir que podía construir cosas y ya no quiso parar." },
      ] },
      { title: "No Se Trata Solo de Código", blocks: [
        { type: "paragraph", text: "Aquí está lo que casi nadie dice en voz alta: la meta no es convertir a todos los niños en programadores. La meta es lo que programar le hace a su forma de pensar." },
        { type: "list", items: ["Partir un problema enorme en pedazos que sí se puedan resolver", "Notar cuándo ya viste algo exactamente igual antes", "Ignorar el ruido y concentrarte en lo que importa", "Probar una idea, verla fallar y cazar el porqué"] },
        { type: "paragraph", text: "Los ingenieros usan esas cuatro movidas. También los científicos, los escritores y quien abre un negocio. Un niño persiguiendo un error en un bucle de Python está practicando lo mismo que va a necesitar cuando un experimento falle o un trabajo en equipo se caiga a pedazos." },
      ] },
      { title: "¿Cuál Es la Mejor Edad para Empezar?", blocks: [
        { type: "numbered", items: [
          { title: "5-7 años: lógica visual y sin pantalla", body: "Juegos de mesa y apps como ScratchJr enseñan a poner pasos en orden, y todavía nadie tiene que tocar un teclado." },
          { title: "8-11 años: bloques", body: "Scratch deja armar juegos y animaciones de verdad. Sin escribir código no hay barrera, así que van directo a construir." },
          { title: "12+ años: lenguajes de texto", body: "Python se lee casi como inglés, los profesionales lo usan todos los días y es un primer lenguaje real excelente." },
        ] },
      ] },
      { title: "Cómo Empezar en Casa", blocks: [
        { type: "list", items: ["Crea una cuenta gratuita de Scratch y déjalos explorar", "Vean un tutorial corto juntos y después hazte a un lado", "Pídeles que expliquen en voz alta qué hace su programa", "Déjalos atorarse. Desatorarse es la habilidad completa", "Haz un escándalo con lo que construyan, aunque sea diminuto"] },
      ] },
      { title: "Un Primer Programa en Python", blocks: [
        { type: "paragraph", text: "Si tu hijo ya está listo para escribir código de verdad, abre un editor en el navegador como Replit o Trinket y escribe esto:" },
        { type: "code", title: "Prueba Esto", accent: "green", code: "nombre = input(\"¿Cómo te llamas? \")\nprint(\"Hola, \" + nombre + \"! Bienvenido a programar.\")" },
        { type: "paragraph", text: "Eso es un programa real. Hace una pregunta, escucha y responde. Agrégale unas preguntas más y de repente tienes un chatbot o un juego de preguntas." },
        { type: "paragraphWithLink", before: "¿Quieres la guía completa, incluyendo cómo convertirlo en un quiz? Mira nuestra ", linkText: "guía de Mi Primer Programa en Python", href: "/projects/my-first-python-program", after: "." },
      ] },
      { title: "La Imagen Completa", blocks: [
        { type: "paragraph", text: "Los estudiantes hispanos están subrepresentados en computación, y no tiene nada que ver con capacidad. Tiene que ver con quién recibe acceso, quién lo ve de cerca y a quién le dicen que siga adelante." },
        { type: "paragraph", text: "Avanza STEM existe para abrir puertas que nunca debieron cerrarse." },
        { type: "quote", text: "Llegó a casa y de inmediato quiso mostrarme el programa que escribió. Siguió agregándole líneas el resto de la noche.", attribution: "Madre de un estudiante en un taller de programación en la Biblioteca de Clifton" },
        { type: "ctaLink", title: "Prueba un Taller Gratuito", text: "Si tu hijo quiere probar un taller de programación gratuito y presencial, nosotros llevamos todos los materiales y puede llegar sin ninguna experiencia.", linkText: "Ver próximos talleres", href: "/workshops", accent: "teal" },
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
        { type: "paragraph", text: "No necesitas bata de laboratorio y definitivamente no necesitas equipo caro. La mejor ciencia casera funciona con vinagre, toallas de papel y el refresco que esté en el refrigerador." },
        { type: "paragraph", text: "Cada experimento de abajo trae materiales, pasos y una explicación en español simple, para que puedas platicar con tu hijo sobre lo que acaba de ver." },
        { type: "summary", timeLabel: "Tiempo necesario", time: "30-45 minutos para los cinco", ageLabel: "Edad recomendada", age: "5 años en adelante, con ayuda de un adulto para los más pequeños", supervisionLabel: "Supervisión adulta", supervision: "Sí, especialmente para el experimento del Huevo en la Botella, que usa fuego", learnLabel: "Lo que aprenderán", learn: "reacciones químicas, presión de gases, densidad y capilaridad", safetyLabel: "Nota de seguridad", safety: "Un adulto debe encender el cerillo y supervisar de cerca el experimento del huevo" },
      ] },
      { title: "", blocks: [{ type: "experiments", items: [
        { number: 1, title: "Volcán de Bicarbonato y Vinagre", category: "Química", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["1/2 taza de bicarbonato", "1 taza de vinagre blanco", "Jabón para platos", "Colorante (opcional)", "Un vaso o recipiente"], steps: ["Vacía el bicarbonato en el vaso.", "Exprime el jabón y unas gotas de colorante.", "Vierte el vinagre y quita la mano rápido.", "Mira cómo la espuma se trepa fuera del vaso."], science: "El bicarbonato y el vinagre reaccionan en el instante en que se tocan y sueltan dióxido de carbono. El jabón atrapa todo ese gas en burbujas, y eso convierte un simple burbujeo en una erupción." },
        { number: 2, title: "Pasas Bailarinas", category: "Física", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Un vaso transparente", "Agua con gas o refresco claro", "Un puñado de pasas"], steps: ["Llena el vaso con agua con gas.", "Echa unas cuantas pasas.", "Sigue mirando. Tardan un minuto en empezar a moverse."], science: "Las burbujas de dióxido de carbono se agarran de las arrugas de cada pasa y la suben hasta arriba. Ahí revientan, la pasa se hunde y el viaje empieza otra vez." },
        { number: 3, title: "Lámpara de Lava Casera", category: "Química y física", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Una botella transparente", "Aceite vegetal", "Agua", "Tabletas efervescentes", "Colorante"], steps: ["Llena como tres cuartos de la botella con aceite.", "Complétala con agua y unas gotas de colorante.", "Rompe un pedacito de tableta y échalo."], science: "El aceite y el agua se niegan a mezclarse, así que se quedan en capas. La tableta genera burbujas de gas que agarran el agua de color, la jalan hacia arriba y la sueltan para que caiga de nuevo." },
        { number: 4, title: "Cromatografía con Papel", category: "Química", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Toalla de papel o filtro de café", "Marcadores lavables", "Un vaso de agua", "Tijeras"], steps: ["Corta una tira delgada de papel.", "Dibuja un punto gordo de marcador cerca del borde de abajo.", "Mete solo el borde inferior en el agua y deja el punto seco.", "Espera y mira cómo un color se parte en varios."], science: "Ese único color de marcador en realidad son varios pigmentos mezclados. El agua los arrastra hacia arriba, y como unos viajan más rápido que otros, se separan en franjas." },
        { number: 5, title: "El Huevo en la Botella", category: "Física", materialsLabel: "Materiales", stepsLabel: "Pasos", scienceLabel: "La Ciencia", materials: ["Un huevo cocido y pelado", "Una botella de vidrio", "Un pedazo pequeño de papel", "Cerillos, con supervisión de un adulto"], steps: ["Un adulto enciende el papel y lo deja caer en la botella.", "Pon el huevo sobre la boca, con la punta delgada hacia abajo.", "Hazte para atrás y mira cómo la botella se lo traga."], science: "La llama calienta el aire dentro de la botella. Al enfriarse, ese aire ocupa menos espacio y la presión adentro cae, así que el aire de afuera empuja el huevo por el cuello sin ningún esfuerzo." },
      ] }] },
      { title: "Hacer Que Se Quede", blocks: [
        { type: "paragraph", text: "Cuando termine el experimento, pídele a tu hijo que dibuje lo que pasó y escriba una frase explicando por qué. Decirlo en voz alta es lo que convierte un momento padre en algo que de verdad entendió." },
        { type: "paragraphWithLink", before: "¿Quieres más sobre el Volcán de Bicarbonato y Vinagre? Nuestra ", linkText: "guía completa del proyecto", href: "/projects/baking-soda-volcano", after: " trae fotos y qué hacer cuando no sale como esperabas." },
        { type: "callout", title: "Conexión con Nuestros Talleres", accent: "teal", text: "En un taller, los estudiantes discutieron casi diez minutos sobre por qué las pasas seguían subiendo y bajando. Eso es más de lo que tomó preparar el experimento. Esa discusión es justo el objetivo." },
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
        { type: "paragraph", text: "Los concursos de puentes casi nunca los gana quien usó más palitos o más pegamento. Se ganan con tres cosas: la geometría, hacia dónde viaja el peso y qué tan limpias están tus uniones." },
        { type: "paragraphWithLink", before: "Aquí vamos a meternos en la ingeniería detrás de un puente que aguanta. Si lo que quieres es el paso a paso, mejor pásate a nuestra ", linkText: "página detallada del proyecto", href: "/projects/popsicle-stick-bridge", after: "." },
      ] },
      { title: "Por Qué los Triángulos Ganan Siempre", blocks: [
        { type: "paragraph", text: "Empuja un cuadrado y se desploma de lado hasta volverse un rombo. Empuja un triángulo y no pasa nada, a menos que algo de verdad se doble o se trueneme. Esa es la razón completa por la que las armaduras se hacen de triángulos." },
        { type: "callout", title: "Idea Clave", accent: "purple", text: "Ponle un palito en diagonal a un marco cuadrado y acabas de crear dos triángulos. Ese único palito puede multiplicar cuánto peso aguanta toda la estructura." },
      ] },
      { title: "Entender los Caminos de Carga", blocks: [
        { type: "list", items: ["El tablero reparte el peso entre las dos armaduras laterales", "Las armaduras llevan esa fuerza hacia los apoyos", "La cuerda inferior se estira, y a eso los ingenieros le llaman tensión", "La cuerda superior se aplasta, y eso es compresión", "Las diagonales pasan la fuerza de una parte del puente a la siguiente"] },
        { type: "paragraph", text: "Los mejores diseños refuerzan justo los puntos que más trabajan, en lugar de pegar palitos por todos lados a ver si pega." },
      ] },
      { title: "Las Cinco Diferencias entre Puentes Fuertes y Débiles", blocks: [
        { type: "numbered", items: [
          { title: "Uniones de buena calidad", body: "El pegamento cede antes que la madera. Haz uniones limpias y déjalas secar por completo, todas." },
          { title: "Dos armaduras laterales iguales", body: "Si un lado te sale más descuidado, recibe más carga y se va primero." },
          { title: "Refuerzo lateral superior", body: "Las piezas cruzadas de arriba evitan que las paredes se abran hacia afuera y se doblen." },
          { title: "Un tablero adecuado", body: "Un tablero que reparte el peso entre ambas armaduras gana contra echarle toda la carga a un solo punto." },
          { title: "Triángulos escalonados", body: "Los triángulos superpuestos le dan a la fuerza un camino limpio hasta los apoyos." },
        ] },
      ] },
      { title: "Errores Comunes que Debes Evitar", blocks: [
        { type: "list", items: ["Ahogar todo en pegamento", "Construir las dos armaduras al mismo tiempo en vez de copiar dos veces una plantilla que ya funcionó", "Saltarte el refuerzo lateral", "Probarlo antes de que el pegamento haya secado del todo", "Pegar palitos al azar sin saber dónde está el punto débil de verdad"] },
      ] },
      { title: "El Reto de la Relación Resistencia-Peso", blocks: [
        { type: "paragraph", text: "Pesa tu puente. Después divide el peso que aguantó entre lo que pesa el puente. Ese número es tu verdadera calificación de ingeniería." },
        { type: "paragraph", text: "En nuestros talleres, los puentes de los estudiantes suelen pesar menos de 50 gramos y aguantan entre 5 y 15 libras antes de rendirse. Eso es más de 50 veces su propio peso." },
        { type: "quote", text: "Empezamos a agregar palitos solo donde se rompió la última vez, no en todas partes. Ahí fue cuando nuestro puente realmente se hizo más fuerte.", attribution: "Estudiante en un taller de construcción de puentes de Avanza STEM" },
        { type: "callout", accent: "purple", text: "En nuestro taller calificamos según la relación resistencia-peso, y esa sola regla cambia cómo construyen los estudiantes desde el primer palito." },
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
        { type: "paragraph", text: "La robótica LEGO le entrega a los niños ingeniería y programación al mismo tiempo. Los motores giran, los sensores detectan cosas y el código que acaban de escribir mueve algo en el cuarto donde están sentados." },
        { type: "paragraph", text: "En una primera construcción, un equipo puede quemarse la sesión completa nada más tratando de que el robot avance derecho. Suena a tarde perdida. Casi siempre es el mejor aprendizaje del día." },
      ] },
      { title: "Por Qué Es Diferente del LEGO Normal", blocks: [
        { type: "paragraph", text: "El LEGO normal te deja un modelo bonito que se queda quieto. La robótica te deja algo que se mueve, detecta y reacciona, todo controlado por un hub programable." },
        { type: "callout", title: "La Gran Idea", accent: "green", text: "La robótica convierte el error en acertijo. Cuando el robot hace lo incorrecto, te está diciendo algo sobre tu diseño o tu código, y ahora te toca averiguar qué." },
      ] },
      { title: "¿Qué Kit de Robótica LEGO le Conviene a tu Hijo?", blocks: [
        { type: "numbered", items: [
          { title: "LEGO SPIKE Essential (6-10 años)", body: "Un kit de entrada guiado y con bloques, hecho para principiantes pequeños." },
          { title: "LEGO SPIKE Prime (10-14 años)", body: "El kit que usan muchas escuelas. Más sensores, más motores y espacio para crecer hacia proyectos grandes." },
          { title: "LEGO Mindstorms Robot Inventor", body: "Descontinuado pero todavía se consigue. Flexible, potente y vale la pena si te topas con una buena oferta." },
        ] },
      ] },
      { title: "Qué Aprenderá tu Hijo en Realidad", blocks: [
        { type: "list", items: ["Cómo se mueven las máquinas de verdad: engranes, ejes y palancas", "Lógica de sensores, o cómo un robot decide qué hacer después", "Programar paso a paso, y pensar en si esto entonces aquello", "Diseñar, probar, romperlo y rediseñar", "Trabajar en equipo y explicar una idea para que alguien más la entienda"] },
        { type: "quote", text: "El robot seguía dando vueltas, y resultó que una rueda estaba floja. Cuando lo descubrimos, sentimos que habíamos arreglado algo de verdad.", attribution: "Estudiante probando un proyecto de robótica LEGO" },
      ] },
      { title: "Consejos para Padres que No Son Ingenieros", blocks: [
        { type: "paragraph", text: "No necesitas las respuestas. Necesitas buenas preguntas. Estas cuatro hacen casi todo el trabajo:" },
        { type: "list", items: ["¿Qué querías que hiciera?", "¿Qué hizo en vez de eso?", "¿Qué cambiarías primero?", "¿Puedes hacer que haga algo completamente distinto?"] },
      ] },
      { title: "Primeros Proyectos para Probar", blocks: [
        { type: "numbered", items: [
          { title: "Seguidor de línea", body: "Usa el sensor de color para perseguir una tira de cinta negra por el piso." },
          { title: "Evasor de obstáculos", body: "Usa el sensor de distancia para girar antes de estrellarse contra la pared." },
          { title: "Control remoto", body: "Maneja el robot a mano primero y después intenta recrear ese mismo recorrido con código." },
          { title: "Máquina clasificadora", body: "Arma algo que separe objetos por color y deje cada uno en el montón correcto." },
        ] },
        { type: "paragraphWithLink", before: "¿Quieres una primera construcción guiada con instrucciones paso a paso? Prueba nuestra ", linkText: "guía del proyecto LEGO Robot Builder", href: "/projects/lego-robot-builder", after: "." },
      ] },
      { title: "Más Allá del Kit", blocks: [
        { type: "paragraph", text: "Cuando un estudiante ya tenga hambre de un reto en equipo de verdad, FIRST LEGO League es la siguiente parada natural." },
        { type: "ctaLink", title: "Construye tu Primer Robot", text: "Empieza con un proyecto guiado de LEGO SPIKE Prime que te lleva por la construcción, el código y qué hacer cuando todavía nada funciona.", linkText: "Probar la guía del robot", href: "/projects/lego-robot-builder", accent: "green" },
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
        { type: "paragraph", text: "La IA elige el siguiente video, acomoda el feed, contesta al asistente de voz y ordena el correo sin que nadie se lo pida. La mayoría de los niños la usan todo el día, años antes de que alguien se moleste en explicarles qué es." },
        { type: "paragraph", text: "Saber cómo funciona la IA hoy cuenta como alfabetización. Y hay dos preguntas que vale la pena enseñar: ¿de qué aprendió esta cosa? y ¿qué perspectiva quedó fuera?" },
      ] },
      { title: "Empieza con lo que los Niños Ya Saben", blocks: [
        { type: "callout", accent: "teal", text: "Cuando Spotify te mete una canción nueva a la lista, ¿cómo crees que escogió esa?" },
        { type: "paragraph", text: "Esa pregunta lleva directo a la búsqueda de patrones, que es el motor de casi toda la IA. La hacemos al inicio de nuestros talleres antes de explicar nada, y los estudiantes casi siempre llegan cerca de la respuesta real. Ese es justamente el punto." },
      ] },
      { title: "Una Forma Sencilla de Explicar Cómo Aprende la IA", blocks: [
        { type: "paragraph", text: "La IA aprende igual que un niño chiquito descubre qué es un perro: viendo muchísimos perros. Dale a un modelo suficientes ejemplos etiquetados y empieza a captar el patrón por su cuenta." },
        { type: "callout", title: "El Término Técnico", accent: "green", text: "Esto se llama aprendizaje supervisado. Supervisado solo significa que cada ejemplo de entrenamiento venía con la respuesta correcta pegada." },
      ] },
      { title: "Tipos de IA que Vale la Pena Explicar a los Niños", blocks: [
        { type: "numbered", items: [
          { title: "Reconocimiento de imágenes", body: "Desbloqueo facial, etiquetado de fotos y doctores leyendo estudios médicos." },
          { title: "Sistemas de recomendación", body: "Lo que decide qué te ponen enfrente Netflix, Spotify y YouTube." },
          { title: "Modelos de lenguaje", body: "Sistemas que escriben texto prediciendo qué palabras suelen venir después." },
          { title: "IA para videojuegos", body: "Programas que mejoran jugando millones de rondas y aprendiendo de lo que sí funcionó." },
        ] },
      ] },
      { title: "Lo Que la IA No Puede Hacer (y Por Qué Importa)", blocks: [
        { type: "list", items: ["Solo conoce patrones parecidos a los que entrenó. Enséñale algo nuevo y está adivinando", "Cualquier sesgo que estuviera en los datos sale por el otro lado igualito", "Puede estar completamente equivocada y aun así sonar segurísima", "Persigue el número que le dijiste que persiguiera, aunque eso no sea el objetivo real"] },
        { type: "paragraph", text: "Enseñarle a un niño el hábito de preguntar con qué se entrenó un sistema es una de las herramientas de pensamiento más útiles que le puedes dar." },
      ] },
      { title: "Actividad Práctica: Entrena tu Propio Clasificador de Imágenes", blocks: [
        { type: "list", items: ["Entra a teachablemachine.withgoogle.com", "Crea dos clases de imágenes, por ejemplo pulgar arriba y pulgar abajo", "Entrénalo con fotos de tu propia cámara", "Pruébalo con una pose que nunca haya visto", "Después compara qué pasa con 5 fotos de ejemplo contra 50"] },
        { type: "callout", accent: "teal", text: "En unos diez minutos ya recorriste recolección de datos, entrenamiento, predicción y la razón por la que la calidad de los datos lo decide todo." },
        { type: "quote", text: "Lo entrené para distinguir mi mano de la de mi amigo, y seguía equivocándose hasta que usamos más fotos. Ahí fue cuando realmente lo entendí.", attribution: "Estudiante en un taller de IA de Avanza STEM" },
      ] },
      { title: "IA Responsable: La Parte que Casi Nadie Explica", blocks: [
        { type: "paragraph", text: "Los niños necesitan más que una lista de trucos. Necesitan saber cuándo verificar lo que la IA les dijo, cuándo no apoyarse en ella para nada, y quién responde cuando uno de estos sistemas causa daño real." },
        { type: "paragraphWithLink", before: "Si es la primera vez que tu hijo va a construir algo con código, nuestra ", linkText: "guía para escribir un primer programa en Python", href: "/projects/my-first-python-program", after: " es un siguiente paso sólido." },
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
        { type: "paragraph", text: "La ansiedad matemática casi siempre empieza igual: hojas de ejercicios, un cronómetro corriendo y tinta roja. Los juegos usan exactamente las mismas habilidades, solo que a nadie le duele el estómago." },
        { type: "paragraph", text: "Estos están hechos para grados 2 a 5, y casi ninguno necesita más que una baraja o un par de dados." },
        { type: "summary", timeLabel: "Tiempo necesario", time: "10-20 minutos por juego", ageLabel: "Edad recomendada", age: "Grados 2-5 (7-11 años)", supervisionLabel: "Supervisión adulta", supervision: "No, los niños pueden jugar solos o con la familia", learnLabel: "Lo que aprenderán", learn: "sentido numérico, cálculo mental, fracciones y estimación" },
      ] },
      { title: "", blocks: [{ type: "games", items: [
        { title: "Guerra de Números", gradeRange: "Grados 2-4", description: "Un juego de cartas que construye sentido numérico rapidísimo.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Saca las figuras o asígnales un valor.", "Reparte toda la baraja en partes iguales.", "Los dos jugadores voltean una carta.", "La carta más alta se lleva ambas.", "¿Quieres multiplicación? Que cada quien voltee dos cartas y las multiplique."], whyItWorks: "Los niños practican muchísimo y nunca se siente como tarea." },
        { title: "101 y Fuera", gradeRange: "Grados 3-5", description: "Un juego de dados sobre suma mental y saber cuándo parar.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Empieza en 0.", "Tira dos dados.", "Súmalos, o usa uno como decenas y otro como unidades.", "Acércate a 101 lo más que te atrevas sin pasarte."], whyItWorks: "Esa sola decisión obliga a pensar de verdad en el valor posicional." },
        { title: "Pizza de Fracciones", gradeRange: "Grados 3-5", description: "Un juego donde las fracciones se vuelven algo que puedes agarrar.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Corta círculos de papel en rebanadas de fracciones.", "Por turnos, toma una rebanada.", "Compite por completar exactamente un círculo entero.", "Si una rebanada te pasaría, pierdes el turno."], whyItWorks: "Mover piezas reales construye una intuición de fracciones equivalentes que ninguna hoja de ejercicios logra." },
        { title: "Número Objetivo", gradeRange: "Grados 4-5", description: "Un rompecabezas mental con más de un camino correcto.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Elige cinco dígitos.", "Elige un número objetivo.", "Usa las operaciones que quieras para llegar a él.", "Comparen respuestas y vean quién encontró un atajo."], whyItWorks: "Demuestra en silencio que un problema de matemáticas puede tener varias rutas correctas." },
        { title: "Veinte Preguntas Matemáticas", gradeRange: "Grados 2-5", description: "Un juego de adivinanzas que mete vocabulario matemático por la puerta de atrás.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Piensa en un número y no lo digas.", "El otro jugador hace preguntas matemáticas de sí o no.", "Trata de atinarle con las menos preguntas posibles."], whyItWorks: "Palabras como par, primo y múltiplo de repente importan, porque saberlas te hace ganar." },
        { title: "Frasco de Estimación", gradeRange: "Grados 2-4", description: "Un reto semanal de adivinanza que prácticamente se cuida solo.", howToPlayLabel: "Cómo Jugar", whyItWorksLabel: "Por Qué Funciona", howToPlay: ["Llena un frasco con objetos pequeños.", "Cada quien escribe su estimación.", "Cuéntenlos juntos más adelante en la semana.", "Gana quien se acerque más."], whyItWorks: "Adivinar sin nada en juego es exactamente como crece el sentido numérico." },
      ] }] },
      { title: "Una Nota sobre la Práctica Cronometrada", blocks: [
        { type: "paragraph", text: "La fluidez viene de ver las mismas matemáticas una y otra vez en un lugar donde equivocarse no cuesta nada. Los juegos hacen eso. Los exámenes cronometrados hacen lo contrario." },
        { type: "paragraphWithLink", before: "¿Quieres más? Varios de estos juegos y otras actividades viven en nuestra ", linkText: "página de juegos", href: "/games", after: "." },
        { type: "list", items: ["Empieza con el juego que a tu hijo ya le llame la atención", "Juega con él, no contra él", "Déjalo ganar unas cuantas al principio", "Pregúntale qué piensa antes de corregir nada", "Párale mientras todavía quiera una ronda más"] },
        { type: "callout", title: "Para Padres", accent: "orange", text: "En las noches familiares de matemáticas, los juegos que siempre se repiten son los que dejan que un niño le gane a un adulto limpiamente. Guerra de Números y 101 y Fuera hacen exactamente eso." },
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
        { type: "paragraph", text: "Lo más difícil de arrancar Avanza STEM fue creer que llegar a una biblioteca con una caja de materiales y una laptop podía servir de algo." },
        { type: "paragraph", text: "Después corrimos programas en Clifton Public Library, Allwood Branch Library, Library of the Chathams y Roseland Free Public Library, y pasaron por ahí más de 70 estudiantes. Ahora sabemos por qué importa. Los niños salen de esos salones sabiendo que STEM también es suyo." },
      ] },
      { title: "Cómo Es un Taller en la Práctica", blocks: [
        { type: "paragraph", text: "Ahorita manejamos una serie de tres semanas: ingeniería, luego programación, luego IA. Cada sesión es gratis y nadie necesita experiencia para entrar." },
        { type: "paragraph", text: "Los estudiantes construyen cosas, escriben Python y entrenan modelos sencillos de IA. En el camino conectamos cada actividad con una idea que usan ingenieros y científicos de verdad." },
      ] },
      { title: "Por Qué las Bibliotecas Son el Lugar Correcto", blocks: [
        { type: "paragraph", text: "Las bibliotecas ya hicieron la parte difícil. La gente confía en ellas, están abiertas para todos y el aprendizaje gratuito es la razón misma por la que existen." },
        { type: "list", items: ["Nadie paga por entrar", "Los niños ya conocen el edificio y se sienten seguros ahí", "La biblioteca tiene una relación real con el vecindario", "Los salones y la tecnología aguantan una sesión desordenada de construcción", "Llegan estudiantes de escuelas muy distintas"] },
      ] },
      { title: "Lo Que Hemos Visto en el Salón", blocks: [
        { type: "paragraph", text: "Los mejores momentos son los chiquitos. Un niño agregándole en silencio una quinta pregunta a su juego en Python. Una familia dándose cuenta de que un programa así está pasando a diez minutos caminando de su casa. Dos estudiantes discutiendo por qué algo funcionó." },
        { type: "quote", text: "Una madre nos contó que su hija pidió volver la siguiente semana antes de que terminara la sesión. Ahí supimos que estaba funcionando.", attribution: "Bibliotecaria de la Sucursal Allwood" },
        { type: "paragraph", text: "Toma en serio la curiosidad de un niño una sola vez y lo más probable es que salga a buscar más." },
      ] },
      { title: "El Problema de Representación y Por Qué Es Nuestra Responsabilidad", blocks: [
        { type: "paragraph", text: "Los estudiantes hispanos siguen subrepresentados en STEM, y las razones son aburridas y solucionables: poca exposición, pocos mentores, poco aliento, poco acceso." },
        { type: "callout", title: "La Brecha que Buscamos Cerrar", accent: "purple", text: "Ver a alguien que se parece a ti haciendo el trabajo cambia quién se siente invitado a STEM. Eso no es un detalle. Es casi todo el problema." },
      ] },
      { title: "Cómo Llevar un Taller a tu Comunidad", blocks: [
        { type: "numbered", items: [
          { title: "Encuentra un lugar", body: "Bibliotecas, centros comunitarios, iglesias y escuelas funcionan. Empieza por quien ya conozca a tus familias." },
          { title: "Contáctanos", body: "Platicamos sobre el plan de actividades, los materiales y cómo correr la voz." },
          { title: "Promueve a nivel local", body: "Los grupos comunitarios, los volantes y los aliados del barrio llegan a familias que una publicación en línea nunca alcanza." },
          { title: "Sigue apareciendo", body: "La confianza se construye una sesión a la vez, y vale la pena la espera." },
        ] },
      ] },
      { title: "Lo Que Sigue", blocks: [
        { type: "paragraph", text: "Queremos llegar a más sucursales de bibliotecas y centros comunitarios, y queremos que el modelo sea tan sencillo que otras personas puedan correrlo por su cuenta." },
        { type: "ctaLink", title: "Lleva un Taller a tu Comunidad", text: "¿Quieres traer un programa STEM gratuito a tu biblioteca, escuela o centro comunitario?", linkText: "Contáctanos para organizar un taller", href: "/host", accent: "purple" },
        { type: "ctaLink", text: "¿Prefieres ver primero cómo es una sesión de verdad?", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "En cada taller de ingeniería que damos, algún estudiante mira el puente que aguantó más peso y pregunta lo mismo: ¿por qué ese sí funciona? La respuesta siempre regresa a una sola figura. El triángulo." },
        { type: "paragraph", text: "Y esto no es una regla para memorizar y olvidar. Cuando entiendes por qué los triángulos son especiales ya no los puedes dejar de ver. Puentes, torres, cuadros de bicicleta, techos, montañas rusas. Están escondidos en todo." },
      ] },
      { title: "El Problema con los Cuadrados", blocks: [
        { type: "paragraph", text: "Imagina un cuadrado que armaste con cuatro palitos y cinta. Empuja una esquina y todo se recuesta hasta volverse un rombo. Los ingenieros le dicen deformación, y pasa porque las cuatro uniones pueden girar." },
        { type: "callout", title: "La Diferencia Clave", accent: "purple", text: "Un triángulo tiene tres lados y tres esquinas, y no hay forma de aplastarlo en otra figura sin doblar o romper un lado. Eso es lo que significa rígido." },
        { type: "paragraph", text: "Así que el cuadrado es la figura equivocada para sostener peso y el triángulo es la correcta. Esa es la historia completa en dos frases." },
      ] },
      { title: "Qué Pasa Cuando Agregas una Diagonal", blocks: [
        { type: "paragraph", text: "Ahora prueba esto. Toma ese mismo cuadrado flojo y ponle un palito en diagonal por el centro. Acabas de hacer dos triángulos, y el marco pasa de tambaleante a sólido." },
        { type: "paragraph", text: "El palito extra no es solo refuerzo. Parte el cuadrado en dos figuras que no se pueden deformar, y de pronto todo el panel es rígido. Los estudiantes de nuestros talleres lo sienten en el segundo que agregan la diagonal. El panel que antes se doblaba ahora se defiende." },
        { type: "callout", accent: "purple", text: "La distancia entre un marco débil y uno fuerte puede ser un solo palito en diagonal. Eso es la triangulación, y ese es todo el truco." },
      ] },
      { title: "Por Qué los Triángulos Aparecen en Todas Partes en la Ingeniería", blocks: [
        { type: "paragraph", text: "Una vez que sabes qué buscar, vas a empezar a cachar triángulos haciendo trabajo estructural por todas partes." },
        { type: "list", items: [
          "Puentes de celosía: una cadena entera de triángulos conectados llevando la carga de un extremo al otro",
          "La Torre Eiffel: una malla de triángulos que le permite mecerse con el viento en lugar de tronarse",
          "Cuadros de bicicleta: mira el cuadro principal y estás viendo un triángulo",
          "Vigas del techo: la forma de «A» de un techo inclinado es un triángulo sosteniendo todo",
          "Grúas de construcción: ese brazo larguísimo es una celosía triangular levantando pesos absurdos",
          "Montañas rusas: los soportes triangulados aguantan a los pasajeros azotando en cada cambio de dirección",
        ] },
      ] },
      { title: "La Ciencia Detrás: Cómo las Fuerzas Se Mueven por los Triángulos", blocks: [
        { type: "numbered", items: [
          { title: "Los triángulos convierten las fuerzas en jalones y aplastones", body: "Empuja hacia abajo un triángulo y cada elemento se estira (tensión) o se aprieta (compresión). Nada se dobla. Y doblarse es lo que rompe las cosas." },
          { title: "Los tres lados comparten el trabajo", body: "Un cuadrado avienta todo su estrés a las esquinas. Un triángulo reparte la fuerza en cada lado al mismo tiempo." },
          { title: "La forma se niega a moverse", body: "Mientras ningún elemento falle, un triángulo cargado se queda exactamente como lo construiste. Un cuadrado no te puede prometer eso." },
        ] },
      ] },
      { title: "Inténtalo Tú Mismo", blocks: [
        { type: "paragraph", text: "No necesitas laboratorio. Agarra cuatro paletas de madera y cinta y míralo pasar en como dos minutos." },
        { type: "list", items: [
          "Pega cuatro paletas por los extremos hasta formar un cuadrado. Empuja una esquina y mira cómo se recuesta.",
          "Pon una quinta paleta en diagonal por el centro. Empuja la misma esquina. Casi ni se mueve.",
          "Ahora arma un triángulo simple de tres paletas y siente qué tan sólido es.",
          "Encadena varios triángulos en fila y descubre cuánto puedes sostener.",
        ] },
        { type: "callout", accent: "purple", text: "En nuestros talleres, los ganadores siempre están hechos de una serie conectada de triángulos. Los estudiantes que entienden el porqué construyen puentes más fuertes, y cuando uno se rompe ya saben dónde buscar." },
      ] },
      { title: "Qué Significa Esto para Tu Puente", blocks: [
        { type: "paragraphWithLink", before: "¿Listo para construir uno y quieres el paso a paso? Nuestra ", linkText: "guía del proyecto de puente de paletas", href: "/projects/popsicle-stick-bridge", after: " te lleva por un puente de celosía completo usando todo lo de arriba." },
        { type: "ctaLink", title: "Construye un Puente de Celosía", text: "En nuestros talleres de ingeniería, los estudiantes construyen puentes de paletas y luego les apilan peso hasta que algo por fin cede.", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "Algo se rompe en casi todos los talleres que damos. Un puente se dobla bajo los libros. Una torre se cae en cuanto le pones un bloque más. Un rover de cartón se voltea en su primer recorrido. Y lo interesante es esto: el estudiante que lo construyó casi siempre sabe qué pasó antes de que alguien diga una palabra." },
        { type: "paragraph", text: "Ese destello de «ah, se rompió justo en la unión porque le eché el pegamento a las carreras» es lo mejor que pasa en toda la sesión. Nada fracasó. Te acaban de entregar información." },
        { type: "youtube", videoId: "xPp8R64YEHQ", title: "Cómo piensan los ingenieros cuando algo se rompe", caption: "Un vistazo rápido a la mentalidad que usan los ingenieros cuando un diseño falla." },
      ] },
      { title: "La Primera Pregunta que Hace un Ingeniero", blocks: [
        { type: "paragraph", text: "Cuando algo se rompe, un ingeniero no pregunta «¿qué hice mal?». Pregunta algo mucho mejor: ¿dónde se rompió y qué me está diciendo eso?" },
        { type: "paragraph", text: "Un puente que se parte por el centro te acaba de decir que el centro era lo más débil. Una unión que se abre te acaba de decir que esa conexión no aguantaba. La ruptura básicamente te está dejando notas para la próxima construcción." },
        { type: "callout", title: "Perspectiva de Ingeniería", accent: "purple", text: "Una estructura que se rompió es útil. Una estructura que nadie probó nunca no te dice absolutamente nada." },
      ] },
      { title: "El Ciclo de Mejora", blocks: [
        { type: "paragraph", text: "Los ingenieros dan vueltas a propósito. El ciclo de diseño no es una línea recta de la idea al éxito. Va así:" },
        { type: "numbered", items: [
          { title: "Define el objetivo", body: "Sé específico. ¿Sostener 2 kilos? ¿Cruzar 30 centímetros? ¿Pesar lo menos humanamente posible? Objetivos vagos, resultados vagos." },
          { title: "Construye una primera versión", body: "No persigas la perfección. Persigue algo que puedas probar. Quieres algo a lo que le puedas poner peso en los próximos diez minutos." },
          { title: "Pruébala de verdad", body: "Ponle la carga real encima. Adivinar cómo le habría ido no es una prueba." },
          { title: "Observa qué falló", body: "No solo que se rompió, sino exactamente dónde y cómo. Ese detalle son tus datos." },
          { title: "Cambia una sola cosa", body: "Cambia tres a la vez y nunca vas a saber cuál te salvó." },
          { title: "Prueba de nuevo", body: "Otra vuelta. Cada ronda te entrega más que la anterior." },
        ] },
      ] },
      { title: "Cómo Se Ve Esto en los Talleres de Avanza STEM", blocks: [
        { type: "paragraph", text: "En una sesión de puentes, casi todos los grupos construyen una vez y prueban una vez. Con eso alcanza. Cuando el puente empieza a doblarse, luego a torcerse y por fin cede, todo el salón puede ver qué parte estaba cargando más." },
        { type: "paragraph", text: "El momento de verdad llega después. ¿Dónde falló? ¿Por qué justo ahí? Si construyeras otro mañana, ¿qué reforzarías primero?" },
        { type: "callout", accent: "purple", text: "Una sola construcción basta para aprender la mentalidad completa: diseña, prueba con honestidad, estudia el desastre y di en voz alta qué haría distinto la versión dos." },
      ] },
      { title: "La Regla del Único Cambio", blocks: [
        { type: "paragraph", text: "Esta importa más de lo que los estudiantes esperan. Después de que algo se rompe, cambia exactamente una cosa antes de volver a probar." },
        { type: "paragraph", text: "Digamos que tu puente se rompe y lo reconstruyes con mejores uniones Y una celosía distinta Y más refuerzo. Tal vez aguanta más. ¿Y qué? No tienes idea de cuál cambio lo logró, así que no puedes usar ninguno la próxima vez. No aprendiste. Tuviste suerte." },
        { type: "callout", accent: "purple", text: "Cambia una cosa. Prueba. Observa. Luego cambia la siguiente. Así descubren los ingenieros qué funciona de verdad." },
      ] },
      { title: "Este Pensamiento Funciona en Todas Partes", blocks: [
        { type: "paragraph", text: "Nada de esto es solo para estructuras. Observar, suponer, probar, mejorar. El mismo ciclo aparece por toda tu vida:" },
        { type: "list", items: [
          "Ciencias: un experimento que sale mal te está diciendo algo específico sobre tu montaje o tu hipótesis",
          "Programación: una falla te entrega un mensaje de error. Léelo antes de tocar una sola línea",
          "Matemáticas: una respuesta incorrecta señala a qué paso regresar. No es un veredicto sobre ti",
          "Deportes: un tiro errado es información sobre tu postura o tu tiempo, no una razón para rendirte",
        ] },
        { type: "ctaLink", title: "Únete a un Taller de Ingeniería Gratuito", text: "En nuestros talleres de ingeniería, los estudiantes construyen algo, lo rompen a propósito y usan lo que ven para mejorar el siguiente.", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "Los rovers de la NASA trabajan a más de 200 millones de kilómetros del taller más cercano. Se agrieta una rueda, se muere un sensor, y no hay nadie allá afuera que lo arregle. Nunca. Cada decisión de diseño se toma pensando en eso." },
        { type: "paragraph", text: "Hoy no vas a construir para 200 millones de kilómetros. Pero te tocan los mismos límites: los materiales que encuentres, un peso que no puedes pasar, terreno horrible y un rover que tiene que funcionar de verdad cuando alguien lo pruebe frente a ti." },
      ] },
      { title: "El Planteamiento de la Misión", blocks: [
        { type: "callout", title: "Tu Misión", accent: "purple", text: "Construye un rover de Marte con cartón, cinta y lo que haya alrededor. Tiene que cargar algo, cruzar terreno irregular y sobrevivir una caída. El reloj marca 45 minutos. Empieza." },
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
        { type: "paragraph", text: "A los ingenieros reales los califican con requisitos específicos, no con buenas intenciones. Estos son los tuyos:" },
        { type: "numbered", items: [
          { title: "Carga una carga útil", body: "Equilibra encima un vasito con 3 monedas o 3 piedritas. Si se voltea, fallaste la misión." },
          { title: "Atraviesa el terreno", body: "Rueda sobre una hoja de cuaderno arrugada sin atascarte ni quedarte parado." },
          { title: "Sobrevive la caída", body: "Suéltalo desde la altura de tu rodilla. Tiene que quedar en una pieza y seguir rodando." },
          { title: "Extra: el brazo", body: "Ponle algo que se extienda hacia afuera del cuerpo, como el brazo de un rover, y que pueda bajar hacia el suelo mientras el rover se queda quieto." },
        ] },
      ] },
      { title: "Tus Restricciones de Diseño", blocks: [
        { type: "paragraph", text: "Todo trabajo real de ingeniería viene con reglas que tú no elegiste. Trabajar dentro de ellas es el trabajo completo. Aquí van las tuyas:" },
        { type: "list", items: [
          "Tiene que caber en una caja de zapatos",
          "Nada de silicón caliente. Solo cinta y sujetadores",
          "Las ruedas tienen que ser redondas. Redondas de verdad, no más o menos redondas",
          "45 minutos en el reloj",
          "Antes de probar, tienes que explicar una decisión que tomaste y por qué",
        ] },
      ] },
      { title: "Preguntas de Ingeniería para Pensar Antes de Construir", blocks: [
        { type: "numbered", items: [
          { title: "¿Cuántas ruedas?", body: "Cuatro le ganan a tres en estabilidad, pero cada rueda que agregas es más peso y una cosa más que se puede tronar. Los rovers reales llevan seis, cada una montada para moverse por su cuenta. Así una sola piedra no voltea el vehículo entero." },
          { title: "¿Dónde está el peso?", body: "Peso arriba, se voltea fácil. Peso abajo, se queda. Lleva las partes pesadas lo más cerca del suelo que puedas." },
          { title: "¿Qué tan ancha es la vía?", body: "La distancia entre tus ruedas izquierda y derecha se llama vía. Más ancha es más difícil de voltear de lado. Más angosta se cuela por lugares apretados. Escoge tu problema." },
          { title: "¿Qué pasa cuando una rueda pega en un bache?", body: "Con un eje rígido, un solo bache levanta todo ese lado del rover. Los rovers reales usan suspensión rocker-bogie para que cada rueda se mueva sola. Y ahora la pregunta divertida: ¿puedes fingir eso con cartón y cinta?" },
        ] },
      ] },
      { title: "Pruébalo y Luego Hazte Estas Preguntas", blocks: [
        { type: "list", items: [
          "¿Se volteó en la prueba de carga? ¿Dónde estaba todo el peso?",
          "¿El papel arrugado lo detuvo? ¿Se hundió una rueda o arrastró el cuerpo?",
          "¿Sobrevivió la caída? Y si no, ¿qué cedió primero?",
          "Si alguien te diera diez minutos más, ¿qué única cosa cambiarías?",
        ] },
        { type: "paragraph", text: "Escribe las respuestas o dibújalas. Esa hoja es la diferencia entre una primera construcción y una segunda que de verdad sea mejor." },
        { type: "quote", text: "Un estudiante agregó una rampa al frente de su rover usando una tira de cartón doblada. Dijo que era para empujar las rocas del camino. Le pregunté si había visto eso en un rover real. Dijo que no, que simplemente pensó que ayudaría. Ese es el tipo de pensamiento correcto.", attribution: "Noah López, mentor de Avanza STEM" },
      ] },
      { title: "La Conexión con el Rover Real", blocks: [
        { type: "paragraph", text: "Perseverance, el rover que anda rodando por Marte ahora mismo, pesa como 1,025 kilogramos y va sobre seis ruedas que se mueven de forma independiente. Carga cámaras, un micrófono, un taladro y un helicóptero entero llamado Ingenuity. Cada pieza tuvo que ser bastante ligera para despegar, bastante dura para sobrevivir el aterrizaje y bastante confiable para seguir trabajando años sin nadie que la ayude." },
        { type: "paragraph", text: "Distribución del peso, número de ruedas, despeje del suelo, carga útil. Sobre eso exactamente discuten los ingenieros de rovers en la NASA. Tú estás contestando las mismas preguntas. La única diferencia es el presupuesto." },
        { type: "ctaLink", title: "Prueba la Ingeniería en Persona", text: "En nuestros talleres, los estudiantes toman desafíos de diseño como este y descubren rapidísimo si su construcción aguanta.", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "Escribes una pregunta en un chat de IA y tres segundos después ya hay un párrafo completo ahí. ¿Qué acaba de pasar? La mayoría de la gente asume que buscó en internet, o sacó la respuesta de una base de datos gigante, o consultó conocimiento guardado en algún lado. Ninguna de esas es correcta." },
        { type: "paragraph", text: "Lo que de verdad pasó es más raro. La IA predijo qué texto debía venir después, palabra por palabra, usando patrones que absorbió de una montaña de escritos. Nada más. Y honestamente eso es más interesante que la versión que la gente se imagina." },
      ] },
      { title: "Se Parece Más al Autocorrector que a un Motor de Búsqueda", blocks: [
        { type: "callout", accent: "teal", text: "Piensa en el autocorrector de tu teléfono. Adivina tu siguiente palabra según lo que suele venir en mensajes como el tuyo. Un modelo de lenguaje hace una versión de eso, solo que enormemente más sofisticada." },
        { type: "paragraph", text: "Cuando una IA te escribe una respuesta no está bajando algo de un estante. Está calculando qué palabra es más probable que siga, dado todo lo anterior, y luego lo vuelve a hacer, y otra vez, hasta terminar." },
        { type: "paragraph", text: "Por eso contesta tan rápido. No está ahí razonando tu problema como lo harías tú. Está corriendo un cálculo de patrones velocísimo, una y otra vez." },
      ] },
      { title: "Cómo Aprendió la IA Qué Decir", blocks: [
        { type: "numbered", items: [
          { title: "Leyó una cantidad absurda de texto", body: "Artículos, libros, sitios web, código, todo. Eso le dio miles de millones de ejemplos de cómo la gente usa el lenguaje de verdad." },
          { title: "Encontró patrones", body: "No reglas que alguien escribió. Patrones estadísticos: después de esta combinación de palabras, estas otras suelen aparecer. Los patrones se enredan demasiado para explicarlos en una frase, pero patrones es todo lo que son." },
          { title: "La gente lo calificó", body: "Personas reales evaluaron cuáles respuestas eran más útiles, más precisas y más apropiadas. El modelo se movió según esa retroalimentación." },
          { title: "Ahora te contesta", body: "Preguntas algo y usa todos esos patrones para producir texto con forma de respuesta útil, basado en las respuestas útiles que vio durante el entrenamiento." },
        ] },
      ] },
      { title: "Por Qué Puede Sonar Bien y Estar Equivocada", blocks: [
        { type: "paragraph", text: "Aquí está el detalle. La IA genera texto estadísticamente probable, no texto verificado. Así que te puede entregar algo seguro, bien redactado y completamente falso. A eso le dicen alucinación: la IA dice algo que no es cierto con el mismo tono que usa para lo que sí lo es." },
        { type: "list", items: [
          "No sabe lo que no sabe",
          "Puede mezclar nombres, fechas o eventos parecidos de situaciones totalmente distintas",
          "Produce lo que suena plausible, no lo que fue verificado",
          "No puede ir a buscar algo a media frase para revisarse a sí misma",
        ] },
        { type: "callout", title: "La Versión Honesta", accent: "teal", text: "Una IA que admite «no estoy segura de esto» es más útil que una que suena convencida cada vez. Haz preguntas de seguimiento. Verifica lo que de verdad importa." },
      ] },
      { title: "Para Qué Sirve Realmente la IA", blocks: [
        { type: "paragraph", text: "Conocer los límites es lo que te deja usarla bien, en vez de creerle ciegamente o no tocarla nunca." },
        { type: "list", items: [
          "Explicar la misma idea de cinco maneras distintas hasta que una por fin te haga clic",
          "Escupir esquemas, borradores y ejemplos en segundos",
          "Resumir temas que están bien cubiertos en lo que entrenó",
          "Lanzarte opciones cuando estás atorado",
          "Editar y reescribir algo que tú ya hiciste",
          "Escribir código que después tú corres y pruebas",
        ] },
        { type: "paragraph", text: "Cuando la respuesta tiene que ser verificablemente correcta, como un dato específico, una pregunta médica o cualquier cosa legal, ve y confírmalo con una fuente real. Siempre." },
      ] },
      { title: "Un Buen Hábito: Pídele que Se Explique", blocks: [
        { type: "paragraph", text: "La próxima vez que una IA te dé una respuesta, tírale una pregunta de seguimiento: «¿cómo sabes eso?» o «¿dónde puedo verificarlo?». Lo que regresa te dice muchísimo." },
        { type: "callout", accent: "teal", text: "En nuestros talleres de IA, los estudiantes escogen una respuesta e intentan verificarla. El punto no es enseñarles que la IA es mala. Es leerla como leerías cualquier fuente, con el cerebro encendido." },
        { type: "quote", text: "Le pregunté sobre un científico y obtuvo la fecha del descubrimiento mal por treinta años. Lo hubiera creído si no hubiéramos verificado. Ahora verifico las cosas.", attribution: "Estudiante en un taller de IA de Avanza STEM" },
      ] },
      { title: "Qué Significa Esto para los Niños y las Familias", blocks: [
        { type: "paragraph", text: "Los niños van a crecer con estas herramientas de todos modos. Saber más o menos qué hacen, y qué definitivamente no hacen, cambia cómo leen cada respuesta que reciben." },
        { type: "list", items: [
          "Apóyate en la IA para lluvia de ideas y borradores más que para clavar datos exactos",
          "Cualquier cosa importante, contrástala con una segunda fuente",
          "Desconfía cuando suene demasiado segura, y haz una pregunta de seguimiento",
          "Recuerda que no siempre se equivoca. Nada más tampoco siempre tiene razón",
        ] },
        { type: "paragraphWithLink", before: "¿Quieres lo básico de cómo aprende la IA de los datos y qué tipos existen? Empieza por nuestra guía anterior: ", linkText: "¿Qué es la IA? Explicando la Inteligencia Artificial a los Niños", href: "/blog/what-is-ai-explaining-to-kids", after: "." },
        { type: "ctaLink", title: "Aprende Sobre IA en Persona", text: "En nuestros talleres de IA, los estudiantes construyen sistemas sencillos, cazan los errores que cometen y platican sobre lo que encontraron.", linkText: "Ver próximos talleres", href: "/workshops", accent: "teal" },
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
        { type: "paragraph", text: "Casi todos los inventos que se te ocurran empezaron con alguien harto. El cierre existe porque las agujetas no dejaban de desatarse. Las notas Post-it salieron de un pegamento tan débil que no servía para nada. El velcro nació de un señor caminando por el campo quitándole cardos a su perro." },
        { type: "paragraph", text: "Ninguno se sentó con la intención de inventar algo. Notaron algo que les molestaba y se hicieron una pregunta: ¿y si hubiera una mejor manera de hacer esto?" },
      ] },
      { title: "El Ciclo del Inventor", blocks: [
        { type: "paragraph", text: "Sin laboratorio, sin kit especial, sin permiso de nadie. Cuatro pasos y unos veinte minutos alcanzan." },
        { type: "numbered", items: [
          { title: "Encuentra un problema", body: "Busca algo chiquito y molesto. Una puerta que se cierra sola. Un cargador que nunca se queda conectado. Un cierre que se traba siempre en el mismo diente. Las frustraciones diminutas le ganan a las enormes, porque de una diminuta sí puedes probar la solución." },
          { title: "Dibuja una solución", body: "Dibuja el arreglo. Aunque sea una forma chueca en una hoja de cuaderno, cuenta. No estás haciendo arte. Estás haciendo tu idea lo bastante específica como para que alguien pueda discutirla." },
          { title: "Construye un prototipo rápido", body: "Lo que tengas cerca sirve: papel, cinta, cartón, ligas. No tiene que verse bien. Tiene que poder probarse." },
          { title: "Pruébalo", body: "Ahora trata de romperlo. Si sobrevive el primer intento sin sudar, tu prueba estuvo muy suave. Encuentra el punto débil. Felicidades, ese es tu próximo problema." },
        ] },
      ] },
      { title: "Cómo Encontrar Problemas que Valgan la Pena Resolver", blocks: [
        { type: "paragraph", text: "El primer paso es el que atora a casi todos, y no porque falten problemas en el mundo. Es porque todos nos volvimos expertos en ignorar las molestias pequeñas en lugar de notarlas." },
        { type: "callout", accent: "purple", text: "En nuestros talleres les damos a los estudiantes un minuto en silencio para recorrer el salón y anotar tres cosas que podrían funcionar mejor. Casi todos regresan con al menos dos." },
        { type: "list", items: [
          "¿Qué tarda muchísimo más de lo que debería?",
          "¿Qué se rompe más seguido de lo que debería?",
          "¿Qué siempre acabas cargando de una manera incómoda?",
          "¿Qué haces todos los días y ojalá no tuvieras que hacer?",
        ] },
        { type: "paragraph", text: "Después escoge el más pequeño de tu lista. Un problema que cabe en tus manos es muchísimo más fácil de resolver que uno del tamaño de una ciudad." },
      ] },
      { title: "Por Qué Dibujar Importa Antes de Construir", blocks: [
        { type: "paragraph", text: "Un dibujo no es una imagen. Es una decisión. En cuanto lo pones en papel te tienes que comprometer: la bisagra va aquí, este lado se abre, el agarre mide más o menos así." },
        { type: "paragraph", text: "Ese compromiso es lo que hace que la idea se pueda probar. Sin dibujo vas ajustando sobre la marcha, lo cual funciona, pero es más lento y nunca notas cuándo la realidad se alejó del plan. Con dibujo, puedes ver la diferencia." },
        { type: "callout", title: "Una Regla", accent: "purple", text: "No toques ni un material hasta que hayas dibujado al menos una versión. El dibujo no tiene que ser bueno. Solo tiene que existir." },
      ] },
      { title: "Qué Cuenta Como Prototipo", blocks: [
        { type: "paragraph", text: "Un prototipo es la versión más rápida de tu idea que de verdad puedas probar. No es un producto. No se supone que sea bonito. Su único trabajo es enseñarte algo que todavía no sabías." },
        { type: "list", items: [
          "Cinta en vez de pegamento, porque lo vas a desarmar en cinco minutos",
          "Usa la forma más simple que pruebe lo único que te importa",
          "Construye para contestar una pregunta: ¿aguanta la bisagra? ¿encaja? ¿desliza?",
          "Si te toma más de 10 minutos, lo estás complicando de más",
        ] },
      ] },
      { title: "El Desafío del Inventor de 20 Minutos", blocks: [
        { type: "summary", timeLabel: "Tiempo", time: "20 minutos en total", ageLabel: "Ideal para", age: "Niños de 8 años en adelante", supervisionLabel: "Materiales", supervision: "Papel, cinta adhesiva, cartón, tijeras, ligas, cualquier cosa que encuentres", learnLabel: "Lo que practicas", learn: "Identificación de problemas, pensamiento de diseño, prototipado rápido e iteración" },
        { type: "callout", title: "Prueba Esto Ahora", accent: "purple", text: "Pon un temporizador de 20 minutos. Encuentra un problema en el cuarto. Dibuja un arreglo. Construye una versión tosca. Pruébala una vez. Y anota la única cosa que cambiarías con diez minutos más." },
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
        { type: "paragraph", text: "En casi todos nuestros talleres de ingeniería, los puentes se caen. Y los niños que los construyeron casi siempre ponen la misma cara. No derrotados. Pensando." },
        { type: "paragraph", text: "Esa cara es como se siente la iteración desde adentro. Aunque ya no quede tiempo para reconstruir, la prueba les reconfigura por completo cómo ven su propio diseño." },
      ] },
      { title: "El Mito del Diseño Terminado", blocks: [
        { type: "paragraph", text: "Existe esta idea de que los buenos diseños salen de una persona muy inteligente pensando mucho antes de tocar nada. La ingeniería no funciona así. Tampoco escribir, ni la música, ni básicamente nada que valga la pena." },
        { type: "paragraph", text: "Los diseños mejoran chocando contra la realidad. No puedes llegar a un puente más fuerte pensando desde una silla. Construyes uno, le pones peso, ves qué se rompe, y ahora sabes algo que antes no sabías." },
        { type: "callout", title: "La Idea Central", accent: "purple", text: "Tu primer diseño no es un producto. Es una suposición. La prueba es cómo averiguas si la suposición servía." },
      ] },
      { title: "Un Ejemplo Real del Taller", blocks: [
        { type: "paragraph", text: "En una sesión de puentes en la Biblioteca Pública de Clifton, un grupo terminó su puente de paletas, empezó a apilarle libros encima y vio cómo un lado entero se torcía antes de que la cosa por fin cediera." },
        { type: "numbered", items: [
          { title: "La primera pista: se torció de lado", body: "Antes de que se rompiera nada, notaron que un lado se inclinaba más que el otro. Esa fue la señal. El problema no era solo demasiado peso. El soporte estaba desigual." },
          { title: "El punto débil: sin refuerzo diagonal", body: "Sus tramos laterales eran rectángulos largos y abiertos en lugar de triángulos. Ponle suficiente peso y esos rectángulos simplemente cambian de forma, y todo el puente se ablanda." },
          { title: "El arreglo rápido: un refuerzo bien dirigido", body: "Con los minutos que les quedaban, reforzaron en diagonal el lado más débil y hablaron sobre dónde irían los refuerzos gemelos en la versión dos." },
          { title: "La conclusión: la prueba les dio un mejor diseño", body: "Nunca reconstruyeron el puente completo, y no hacía falta. Una prueba honesta les dijo exactamente qué tiene que sobrevivir el siguiente." },
        ] },
        { type: "quote", text: "Falló justo donde no pusimos el refuerzo de pegamento caliente", attribution: "Mónica, estudiante en un taller de ingeniería de Avanza STEM" },
      ] },
      { title: "Por Qué Empezar de Nuevo No Es Empezar desde Cero", blocks: [
        { type: "paragraph", text: "Cambiar algo después de una prueba no es empezar de nuevo. Llevas contigo información a la que tu primer diseño nunca tuvo acceso." },
        { type: "callout", accent: "purple", text: "Iterar no siempre significa reconstruir todo antes de que acabe la sesión. A veces es un ajuste inteligente, un dibujo mejor, o una nota clara garabateada para la próxima." },
        { type: "paragraph", text: "Y ese es el detalle con los ingenieros con experiencia. No necesariamente les sale mejor el primer intento. Son mucho mejores leyendo lo que el primer intento les está diciendo." },
      ] },
      { title: "La Regla del Único Cambio", blocks: [
        { type: "paragraph", text: "Cuando algo falla y todavía tienes tiempo para arreglarlo, cambia exactamente una cosa antes de volver a probar. Suena fácil. No lo es, porque todo tu instinto quiere arreglarlo todo de golpe." },
        { type: "paragraph", text: "¿Cambias tres cosas y la siguiente versión aguanta más? Qué bien, ¿pero cuál lo logró? No tienes idea. Tuviste suerte, y la suerte no se pasa a la siguiente construcción." },
        { type: "list", items: [
          "Escoge el cambio que ataca exactamente lo que falló",
          "Haz ese único cambio si el reloj te lo permite",
          "Vuelve a probar de la misma forma, para que la comparación signifique algo",
          "Anota qué pasó, o qué quieres intentar después",
          "Deja que esa nota maneje el próximo diseño",
        ] },
        { type: "ctaLink", title: "Construye Algo y Pruébalo", text: "En nuestros talleres de ingeniería, los estudiantes construyen una estructura, le ponen peso hasta que falla y descubren qué les está diciendo el desastre.", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "La bolsa que traes en los hombros ahora mismo está resolviendo como una docena de problemas de ingeniería en silencio. Las correas quitan el peso de tus manos. El panel acolchado reparte la presión por tu espalda. Los cierres se abren y cierran miles de veces y de alguna forma siguen funcionando. La tela es resistente, ligera, casi impermeable y lo bastante barata para que un estudiante la pueda pagar." },
        { type: "paragraph", text: "Nada de eso es accidente. Alguien se sentó con cada uno de esos problemas, discutió, probó un arreglo y luego lo volvió a probar." },
      ] },
      { title: "El Problema de la Distribución del Peso", blocks: [
        { type: "paragraph", text: "Carga 5 kilos en una mano por una cuadra y tu brazo se muere. Carga los mismos 5 kilos en la espalda y ni lo notas. Eso no es aguante, es física. Una bolsa colgando de tu mano crea un brazo de momento, que multiplica cuánto tienen que trabajar tus músculos. Una mochila pega ese peso contra tu columna, y de repente las matemáticas se ponen mucho más amables." },
        { type: "paragraph", text: "Esas correas hacen más que sostener la bolsa. Una correa más ancha reparte exactamente el mismo peso en más superficie, así que la presión en cada punto baja. Las raquetas de nieve usan la misma idea. El acolchado también ayuda, porque se aplasta un poco y empareja la carga en vez de encajarse en una sola línea." },
        { type: "callout", title: "Orden de Carga por Peso", accent: "purple", text: "Lo pesado va lo más pegado a tu espalda posible y lo ligero hacia afuera. Eso mantiene el centro de masa junto a tu columna en lugar de jalarte hacia adelante y destrozarte la espalda baja." },
      ] },
      { title: "Cómo Funciona un Cierre de Cremallera", blocks: [
        { type: "paragraph", text: "Mira un cierre de cerca y vas a ver dos hileras de dientes encaradas. Cada diente tiene un bultito de un lado y un hueco del otro. Cuando jalas el deslizador, este alinea cada diente para que el bulto de un lado caiga en el hueco del otro. Clic. Clic. Clic." },
        { type: "paragraph", text: "Por eso un cierre cerrado se siente tan firme. Esos dientes entrelazados se niegan a separarse y se niegan a deslizarse de lado. En el otro sentido, el deslizador mete una cuchillita entre las hileras y va soltando los dientes de par en par." },
        { type: "list", items: [
          "Los cierres de metal duran más pero pesan más",
          "Los de espiral de plástico son más ligeros y se doblan alrededor de costuras curvas",
          "YKK fabrica la mayoría de los cierres del mundo, y vas a ver ese logo en casi cualquier bolsa decente",
          "Casi siempre fallan porque el deslizador se abrió de más, y un apretón suave con pinzas a veces lo revive",
        ] },
      ] },
      { title: "Materiales y Compromisos", blocks: [
        { type: "paragraph", text: "No existe la tela perfecta para mochilas. Cada opción cambia peso por durabilidad por resistencia al agua por precio, y alguien tuvo que decidir." },
        { type: "numbered", items: [
          { title: "Nylon", body: "Resistente, ligero y aguanta los raspones. La mayoría de las mochilas caras lo usan porque sobrevive años sin pesar casi nada." },
          { title: "Poliéster", body: "Un poco más pesado que el nylon, más barato y no se destiñe tan rápido con el sol. De esto están hechas casi todas las mochilas escolares." },
          { title: "Lona", body: "Dura y pesada, pero se bebe el agua. Perfecta para caminar a clase, pésima elección para una excursión bajo lluvia." },
          { title: "Ripstop", body: "Un tejido con una cuadrícula de hilos de refuerzo integrada. Si se rasga, la cuadrícula detiene el desgarre en seco. Lo vas a ver en mochilas de alto rendimiento." },
        ] },
        { type: "paragraph", text: "Y aquí va lo que casi nadie sabe: la resistencia al agua viene de un recubrimiento por dentro de la tela, no de la tela misma. Ese recubrimiento se desgasta con los años, por eso una mochila vieja se moja aunque por fuera se vea perfecta." },
      ] },
      { title: "El Sistema de Bolsillos", blocks: [
        { type: "paragraph", text: "Nadie regó esos bolsillos al azar. Cada uno es una apuesta que alguien hizo sobre cómo cargas tus cosas." },
        { type: "list", items: [
          "El compartimiento principal está dimensionado para libretas, una funda de laptop o una sudadera doblada",
          "El bolsillo frontal guarda lo que agarras a cada rato y no quieres suelto por ahí",
          "Los bolsillos laterales tienen forma de botella porque esa forma está en todos lados y es fácil de predecir",
          "El bolsillito de arriba es para lo que necesitas sin abrir toda la mochila",
          "El organizador interno asume que cargas plumas, llaves y un teléfono",
        ] },
        { type: "callout", title: "Prueba Esto", accent: "purple", text: "Califica tu propia mochila como lo haría un ingeniero. Del 1 al 5 en distribución del peso, calidad del cierre, tela y resistencia al agua, acomodo de bolsillos, y cómo se sienten las correas después de diez minutos caminando. Y ahora la pregunta real: ¿qué arreglarías primero?" },
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
        { type: "paragraph", text: "Si los estudiantes están sentados quietos viendo a un adulto demostrar algo, eso no es un taller de STEM. Es una presentación. Y las presentaciones, hasta las buenas, ya se les olvidaron para el desayuno del día siguiente." },
        { type: "paragraph", text: "Por eso le metemos tanto trabajo al diseño de la sesión como al contenido. Lo que los niños hacen en ese salón le gana a cualquier cosa que nosotros les podamos decir." },
      ] },
      { title: "La Diferencia entre Activo y Pasivo", blocks: [
        { type: "paragraph", text: "Aprendizaje pasivo es mirar, escuchar, recibir. Activo es construir, probar, discutir, romper algo y arreglarlo. La investigación sobre cuál se queda en la cabeza no está ni cerca de estar peleada." },
        { type: "paragraph", text: "Pero tener las manos ocupadas no es lo mismo que pensar. Un niño puede pegar paletas en piloto automático durante treinta minutos. El truco es diseñar la actividad para que el hacer obligue al pensar." },
        { type: "callout", accent: "purple", text: "En nuestros talleres nadie ve a un mentor construir un puente. Los estudiantes reciben materiales, una meta de peso y unos 30 minutos. La frustración, la discusión con el compañero sobre el diseño, el momento en que aguanta muchísimo más de lo que esperaban: ahí es donde de verdad pasa el aprendizaje." },
      ] },
      { title: "Cómo Diseñamos las Actividades de Avanza STEM", blocks: [
        { type: "paragraph", text: "Antes de que una actividad llegue a una sesión, tiene que sobrevivir cuatro preguntas." },
        { type: "numbered", items: [
          { title: "¿Hay una prueba real?", body: "Si los estudiantes no pueden averiguar si su idea funcionó, no es un desafío de diseño, es un proyecto de arte. Cada actividad termina con un veredicto. ¿Aguanta el puente? ¿Cruza el rover? ¿Corre el código?" },
          { title: "¿Puede fallar de forma interesante?", body: "Un fracaso útil es una característica, no un error. Si algo solo funciona o se cae sin razón clara, no hay nada que iterar. Los mejores fracasos son tan específicos que el estudiante sabe exactamente qué arreglar." },
          { title: "¿Hay más de un camino?", body: "Un desafío con una sola respuesta correcta se vuelve una carrera. Uno con varios enfoques buenos deja que los estudiantes tomen decisiones reales y luego comparen resultados con la mesa de al lado." },
          { title: "¿Se están hablando entre ellos?", body: "Dos estudiantes discutiendo si agregar otra diagonal o reforzar la unión no están distraídos. Están haciendo ingeniería." },
        ] },
      ] },
      { title: "Qué Hacen Realmente los Estudiantes en Nuestros Talleres", blocks: [
        { type: "paragraph", text: "En una sesión de 60 minutos, un estudiante suele pasar por cinco o seis cosas distintas:" },
        { type: "list", items: [
          "Escuchar un planteamiento de dos minutos con el objetivo y las restricciones, y nada más",
          "Discutir el diseño con su compañero antes de tocar un solo material",
          "Construir la versión uno y probarla, casi siempre viéndola fallar",
          "Hacer un cambio específico basado en lo que acaba de ver",
          "Volver a probar y descubrir si ese cambio de verdad ayudó",
          "Contarle al grupo qué aprendió. No qué construyó. Qué descubrió",
        ] },
        { type: "paragraph", text: "Ese último paso es el que casi todos los talleres se saltan. En el segundo en que un estudiante lo tiene que poner en palabras, descubre si lo entendió o si solo tuvo suerte." },
      ] },
      { title: "Por Qué el Ruido Suele Ser una Buena Señal", blocks: [
        { type: "paragraph", text: "Un salón callado hace que los adultos se sientan cómodos. Casi siempre significa que los estudiantes se desconectaron. Cuando los niños se están hablando encima, incluso discutiendo, ese salón está pensando." },
        { type: "quote", text: "Pensé que se estaban distrayendo porque hacían tanto ruido con el tema de la cremallera. Pero luego escuché y en realidad estaban debatiendo si la fricción era mayor en el exterior o en el interior de la curva. Eso es exactamente lo que queríamos.", attribution: "Mentor de Avanza STEM después de una sesión de ciencias" },
        { type: "paragraph", text: "En ese momento, el trabajo del mentor no es callar a nadie. Es soltar una pregunta que haga la discusión más afilada." },
      ] },
      { title: "Las Tres Cosas que Siempre Incluimos", blocks: [
        { type: "numbered", items: [
          { title: "Una prueba real con un resultado real", body: "Nada de «muy bien todos». Un pasa o no pasa contra el objetivo que dijimos en voz alta al inicio." },
          { title: "Una forma específica de fallar", body: "Si todo funciona al primer intento, nadie descubrió dónde estaban los límites." },
          { title: "Tiempo para decir qué descubrieron", body: "Construir sin reflexión es pura actividad. La reflexión es donde se fija." },
        ] },
        { type: "ctaLink", title: "Ven a Ver un Taller", text: "Nuestros talleres son gratis, prácticos y abiertos a todos. Puedes llegar sin haber construido nada en tu vida.", linkText: "Ver próximos talleres", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "Un autobús escolar parece lo más simple que existe. Caja amarilla enorme, filas de asientos, luces parpadeando, un motor que se escucha a dos cuadras. Pero casi cada pieza de ese autobús es la respuesta a una pregunta que alguien tuvo que resolver: ¿cómo mueves a un montón de niños y los entregas a todos completos?" },
        { type: "paragraph", text: "Cuando sabes qué buscar, el autobús deja de ser aburrido. Vamos a desarmarlo." },
      ] },
      { title: "¿Por Qué los Autobuses Escolares Son Amarillos?", blocks: [
        { type: "paragraph", text: "Nadie eligió ese amarillo porque se viera bonito. Lo eligieron porque tu ojo lo caza en la luz de la mañana, en el reflejo plano de la tarde y bajo un cielo gris. Los diseñadores de seguridad querían un color que los conductores detecten antes de darse cuenta de que lo detectaron." },
        { type: "paragraph", text: "Ahora súmale las luces parpadeando, el brazo con la señal de alto y el tamaño absurdo. Todo dice la misma frase: baja la velocidad, hay niños aquí. El autobús está diseñado para ser imposible de ignorar." },
      ] },
      { title: "Los Asientos Son Herramientas de Seguridad", blocks: [
        { type: "paragraph", text: "Esos asientos se ven simplones, pero están haciendo trabajo serio. La mayoría de los autobuses usan un truco llamado compartimentación: asientos altos, muy acolchados y pegados unos a otros a propósito. Si el autobús frena fuerte, el respaldo de enfrente te atrapa como una pared acolchonada." },
        { type: "paragraph", text: "Por debajo, los marcos están hechos para sobrevivir baches, curvas cerradas y como una década de estudiantes trepándose encima. Un asiento de autobús no es un mueble. Es parte del sistema de seguridad." },
      ] },
      { title: "¿Por Qué el Conductor Puede Ver Tanto?", blocks: [
        { type: "paragraph", text: "El conductor tiene que seguir la carretera, a los niños, la puerta, la banqueta y cada auto alrededor, todo al mismo tiempo. Por eso los espejos se ven casi cómicamente grandes. Unos cubren lo que va detrás. Otros están angulados para cachar el punto ciego justo frente a la defensa, donde un niño chiquito puede desaparecer por completo." },
        { type: "paragraph", text: "La visibilidad es uno de los problemas más duros en un vehículo de este tamaño. Los ingenieros básicamente están inventando formas de que el conductor vea alrededor del autobús mismo." },
      ] },
      { title: "Girar un Vehículo Gigante", blocks: [
        { type: "paragraph", text: "Un autobús es muchísimo más largo que un auto, lo que convierte cada vuelta en un problema de matemáticas. Los ingenieros le dicen radio de giro: cuánto espacio necesita un vehículo para dar la vuelta. En una calle angosta, un autobús necesita mucho más que el carro de tu familia." },
        { type: "paragraph", text: "Así que cuando un conductor se abre mucho antes de girar, no está presumiendo. Está obedeciendo la geometría." },
      ] },
      { title: "Las Salidas de Emergencia Están en Todas Partes", blocks: [
        { type: "paragraph", text: "Cuenta las salidas la próxima vez que te subas. Puerta delantera, puerta trasera de emergencia, escotillas en el techo, ventanas que se empujan hacia afuera. La buena ingeniería no planea para el día normal. Planea para el día en que nada sale normal." },
        { type: "callout", title: "¿Por Qué Tantas Salidas?", accent: "purple", text: "¿Y si la puerta delantera está bloqueada? ¿Y si el autobús queda inclinado? ¿Y si cuarenta niños tienen que salir en menos de un minuto? Los ingenieros se hacen esas preguntas mucho antes de que alguien las viva." },
      ] },
      { title: "Prueba Esto: Diseña Tu Propio Autobús Más Seguro", blocks: [
        { type: "paragraph", text: "Toma papel y dibuja tu propio autobús. Ponle espejos, salidas, acomodo de asientos, luces, señales, ventanas, espacio de carga. Y aquí va la regla: por cada parte que dibujes, tienes que decir qué problema resuelve." },
        { type: "callout", title: "La Pregunta del Ingeniero", accent: "purple", text: "Los ingenieros no preguntan «¿se ve bien?». Preguntan «¿qué hace esto y qué problema resuelve?». Pásale esa pregunta a cada línea de tu dibujo y ve qué sobrevive." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "La próxima vez que pase un autobús escolar, míralo de verdad. El color, los espejos, los asientos, las salidas, hasta cómo toma la esquina. Cada una de esas cosas es una decisión que alguien tomó a propósito. Ese autobús es ingeniería sobre ruedas." },
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
        { type: "paragraph", text: "Las alas tienen quizá el trabajo más loco de toda la ingeniería. Un Boeing 777 lleno pesa como 135 toneladas, y dos alas lo convencen de subir al cielo. Piénsalo tantito. ¿Cómo despega algo tan pesado?" },
        { type: "paragraph", text: "Casi toda la respuesta está escondida en la forma." },
      ] },
      { title: "Las Alas No Son Planas", blocks: [
        { type: "paragraph", text: "Mira un ala de perfil alguna vez. No es una tabla. La parte de arriba se curva y la de abajo se queda mucho más plana. Los ingenieros le llaman perfil aerodinámico, y existe por una sola razón: para meterse con el aire de una manera muy específica." },
        { type: "paragraph", text: "Cuando el avión avanza, el aire se parte y fluye alrededor del ala. Esa forma deja el aire de arriba a menor presión que el de abajo. Más presión debajo, menos presión encima, y el ala recibe un empujón hacia arriba. Ese empujón es la sustentación." },
      ] },
      { title: "La Sustentación No Es Magia", blocks: [
        { type: "paragraph", text: "La sustentación no es un truco inteligente, y definitivamente no es magia. Un ala funciona porque cambia hacia dónde va el aire. Al cortar el cielo, el ala avienta una montaña de aire hacia abajo. La tercera ley de Newton dice que toda acción tiene una reacción igual y opuesta, así que si el ala empuja aire hacia abajo, el aire empuja el ala hacia arriba. Están pasando dos cosas a la vez:" },
        { type: "numbered", items: [
          { title: "Crea una diferencia de presión", body: "El aire que pasa por arriba de la curva va más rápido, y la presión ahí cae por debajo de la de abajo." },
          { title: "Avienta aire hacia abajo", body: "El ala redirige el flujo hacia el suelo, y la reacción empuja el avión hacia el cielo." },
        ] },
      ] },
      { title: "¿Por Qué el Avión Necesita Velocidad?", blocks: [
        { type: "paragraph", text: "Un avión estacionado en la pista no va a ningún lado, por buenas que sean sus alas. Las alas necesitan aire pasando por encima para hacer cualquier cosa. Ve más rápido, mueve más aire, consigue más sustentación." },
        { type: "paragraph", text: "Ese es todo el punto de la carrera larguísima por la pista. Los motores empujan el avión hacia adelante, el aire empieza a correr sobre las alas y en una velocidad exacta la sustentación por fin le gana al peso. Las ruedas se despegan del suelo." },
      ] },
      { title: "¿Qué Son los Flaps?", blocks: [
        { type: "paragraph", text: "Mira el ala en el despegue o el aterrizaje y vas a ver pedazos que se deslizan hacia afuera y se inclinan hacia abajo. Esos son los flaps y los slats, y le cambian la forma al ala a medio vuelo para exprimir más sustentación a baja velocidad." },
        { type: "paragraph", text: "Eso importa porque despegar y aterrizar son justo los momentos en que el avión no puede ir rápido. Nadie quiere un jet volando a 800 kilómetros por hora cerca del suelo, así que los ingenieros le pusieron partes móviles al ala." },
      ] },
      { title: "Prueba Esto: Test de Papel", blocks: [
        { type: "paragraph", text: "Agarra dos hojas de papel. Dobla una en un avión básico y deja la otra plana. Lanza las dos igual. El avión llega a algún lado. La hoja plana aletea y se muere. Mismo papel, mismo lanzamiento, forma completamente distinta." },
        { type: "callout", title: "La Forma Importa", accent: "purple", text: "Los ingenieros prueban formas de alas en túneles de viento, en simulaciones y al final en vuelos reales. Un cambio que taparías con el pulgar puede modificar de forma notable cuánta sustentación genera un ala." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Las alas se curvan porque la forma controla el aire, el aire crea sustentación y la sustentación le gana a la gravedad. Así que la próxima vez que pase un avión arriba de ti, no le des todo el crédito a los motores. Esas alas son herramientas de precisión convirtiendo aire en movimiento en una salida del suelo." },
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
        { type: "paragraph", text: "Presionas un botón. Las puertas se cierran. Algo zumba. Treinta segundos después sales exactamente en el piso que querías. Se siente como nada. En realidad es una máquina corriendo sensores, motores, cables, contrapesos y un montón de lógica, todo para que nadie tenga que pensarlo." },
        { type: "paragraph", text: "Entonces, ¿cómo sabe esa cosa a dónde quieres ir?" },
      ] },
      { title: "El Botón Envía una Solicitud", blocks: [
        { type: "paragraph", text: "Apretar el botón no controla el motor. Tú no estás manejando. Estás metiendo una solicitud al sistema de control, que es básicamente su cerebro, y ese cerebro ya está llevando la cuenta de:" },
        { type: "list", items: [
          "En qué piso está la cabina en este momento",
          "Todos los botones que alguien haya presionado",
          "Hacia dónde ya va",
          "Si las puertas están abiertas o cerradas",
          "Si algo está atorado en la puerta",
        ] },
        { type: "paragraph", text: "Nunca adivina. Cada movimiento sale de esa lista." },
      ] },
      { title: "Los Sensores Le Dicen al Elevador Dónde Está", blocks: [
        { type: "paragraph", text: "Un elevador tiene que saber su propia posición dentro del pasadizo, así que hay sensores rastreando la cabina en todo el recorrido. Esas lecturas le dicen cuándo empezar a frenar, cuándo detenerse y si de verdad quedó al nivel del piso." },
        { type: "paragraph", text: "Esa última importa más de lo que crees. Una cabina que se detiene cinco centímetros arriba se convierte en un tropiezo para todos los que salen. Por eso los diseñan para llegar con una precisión de milímetros." },
      ] },
      { title: "Los Motores Hacen el Trabajo Pesado", blocks: [
        { type: "paragraph", text: "Un motor eléctrico gira una polea, la polea jala los cables y los cables jalan la cabina. Hasta ahí, sencillo. Pero aquí viene lo ingenioso: casi todos los elevadores cuelgan un contrapeso del otro extremo. La cabina sube, el contrapeso baja. La cabina baja, el contrapeso sube." },
        { type: "paragraph", text: "Ese equilibrio significa que el motor no está peleando contra el peso completo de una cabina llena. Se parece más a un balancín que a una grúa, y ahorra una cantidad enorme de energía." },
      ] },
      { title: "El Elevador Usa Lógica Simple", blocks: [
        { type: "paragraph", text: "Digamos que la cabina está en el piso 1 y la gente presiona 3, 5 y 2. No los atiende en el orden en que llegaron. Sube y recoge el 2, luego el 3, luego el 5, barriendo en una sola dirección. Cero viajes desperdiciados, nadie esperando eternamente." },
        { type: "paragraph", text: "En edificios muy altos esto se pone mucho más listo. Algunos sistemas te preguntan a qué piso vas antes de que te subas, y agrupan a la gente por destino para que cada cabina haga menos paradas." },
      ] },
      { title: "La Seguridad Es lo Primero", blocks: [
        { type: "paragraph", text: "Un elevador viene cargado de sistemas de seguridad. Sensores en la puerta para que no se cierre sobre tu brazo. Frenos que agarran la cabina si se mueve cuando no debe. Respaldos que toman el control cuando una pieza falla. Alguien ya se imaginó todo lo que podía salir mal para que tú nunca tengas que hacerlo." },
      ] },
      { title: "Prueba Esto: Juego de Lógica del Elevador", blocks: [
        { type: "paragraph", text: "Te toca ser el controlador. Dibuja un edificio de 6 pisos y pon la cabina en el piso 2. Alguien en el 5 quiere bajar. Alguien en el 1 quiere subir. Alguien ya adentro presionó el 4. ¿En qué orden los atiendes?" },
        { type: "callout", title: "No Hay Una Sola Respuesta Correcta", accent: "purple", text: "Aquí no hay solución perfecta, y ese es el punto. Los ingenieros hacen malabares con velocidad, justicia, seguridad y consumo de energía al mismo tiempo. ¿Cuál estás dispuesto a sacrificar?" },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Un elevador no sabe nada de la forma en que tú sabes cosas. Lee sensores, corre lógica y gira motores. La próxima vez que te subas, acuérdate de que hay un sistema completo trabajando en silencio dentro de las paredes, y lo único que tuviste que hacer fue apretar un botón." },
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
        { type: "paragraph", text: "Párate cerca de la punta de un rascacielos en un día ventoso y vas a sentir el piso moverse debajo de ti. Poquito. Tu cerebro va a gritar de inmediato que algo está mal. Tu cerebro se equivoca. Ese movimiento es el diseño funcionando, y un edificio que puede oscilar un poco es normalmente más seguro que uno que se niega a ceder." },
      ] },
      { title: "El Viento Empuja a los Edificios", blocks: [
        { type: "paragraph", text: "El viento se siente como nada cuando te pega en la cara. Aviéntalo contra una pared de vidrio de 60 pisos y se vuelve una fuerza muy seria. Entre más alto construyas, más de esa fuerza atrapas. Así que los ingenieros tienen que contestar preguntas incómodas antes de que se cuele el primer concreto: qué tan fuerte pega el viento aquí, qué tan alto vamos, qué forma atrapa menos, cuánto se va a mover y si la gente adentro se va a marear." },
        { type: "paragraph", text: "Un rascacielos no solo se está sosteniendo. Está en una pelea permanente contra el aire en movimiento." },
      ] },
      { title: "Ser Flexible Puede Ser Más Seguro", blocks: [
        { type: "paragraph", text: "Dobla un palo seco y truena limpio. Dobla una rama viva y simplemente se va contigo. Los edificios funcionan igual. Haz uno demasiado rígido y un viento fuerte o un temblor no tienen a dónde mandar esa energía, así que se acumula adentro de la estructura hasta que algo cede." },
        { type: "paragraph", text: "Un edificio que se puede flexionar absorbe parte de esa energía y reparte el resto. Doblarse aquí no es debilidad. Es el plan." },
      ] },
      { title: "Los Terremotos También Sacuden los Edificios", blocks: [
        { type: "paragraph", text: "El viento empuja el edificio de lado desde afuera. Un terremoto ataca desde abajo. El suelo se mueve, la base del edificio se mueve con él, y todo lo de arriba tiene que descubrir qué hacer al respecto." },
        { type: "paragraph", text: "Los ingenieros contraatacan con marcos resistentes, uniones flexibles, amortiguadores y cimientos hechos para deslizarse o aislar. La meta casi nunca es dejar el edificio perfectamente quieto. La meta es que siga en pie y que todos adentro sigan vivos." },
      ] },
      { title: "Algunos Edificios Tienen Amortiguadores Gigantes", blocks: [
        { type: "paragraph", text: "Algunos rascacielos esconden un peso enorme cerca de la punta que se llama amortiguador de masa sintonizado. Imagina un péndulo del tamaño de un cuarto. Cuando el edificio se recuesta hacia un lado, el amortiguador se columpia al otro y cancela el movimiento." },
        { type: "callout", accent: "purple", text: "Es un contragolpe gigante instalado dentro del edificio. No lo puedes ver desde la banqueta, pero en un día ventoso es la razón por la que nadie allá arriba se marea." },
        { type: "image", src: "/images/blog/Ball in the middle of Taipei 101.jpg", alt: "La bola amortiguadora dorada de 660 toneladas suspendida dentro del Taipei 101, visible desde el mirador", caption: "La bola amortiguadora dorada de 660 toneladas del Taipei 101 cuelga cerca del piso 88. Cuando el viento empuja el edificio hacia un lado, este péndulo se balancea en dirección opuesta y cancela el movimiento que sentirían las personas adentro." },
      ] },
      { title: "La Forma También Importa", blocks: [
        { type: "paragraph", text: "La forma de un edificio cambia cómo viaja el viento a su alrededor. Esquinas agudas, caras planas, perfiles altos y flacos: cada uno maneja el aire distinto. Por eso los ingenieros construyen modelos a escala y los meten a túneles de viento para ver qué hace el aire de verdad." },
        { type: "paragraph", text: "Luego ajustan. Redondean las esquinas, abren huecos que atraviesan la torre, tuercen todo el perfil. Cuando un rascacielos se ve raro, esa forma casi siempre está haciendo un trabajo." },
      ] },
      { title: "Prueba Esto: Prueba de Torre de Papel", blocks: [
        { type: "paragraph", text: "Construye dos torres de papel. Una rígida y derecha, la otra un poco floja y elástica. Ahora sóplales, o golpea la mesa. ¿Cuál cae primero? ¿Cuál se dobla muchísimo y regresa?" },
        { type: "callout", title: "Lo Que Estudian los Ingenieros", accent: "purple", text: "Esa es una versión chiquita de la pregunta real. Nunca es solo «¿se va a quedar parado?». Es «¿qué hace cuando algo lo empuja?»" },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Los edificios oscilan porque el viento y los terremotos los empujan, y un poco de movimiento es justo cómo una estructura sobrevive ese empujón. Así que cuando un rascacielos se recorre unos centímetros en una tormenta, nadie se equivocó. Alguien hizo bien su trabajo." },
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
        { type: "paragraph", text: "El balón que está en tu garaje es una pieza de ingeniería más seria de lo que parece. Los balones viejos eran de cuero, y el cuero se bebe el agua, así que para el segundo tiempo de un partido lluvioso los jugadores básicamente le pegaban a un ladrillo mojado. Los balones de hoy están hechos de ciencia de materiales, geometría de paneles y tecnología de fábrica que no existía hace veinte años." },
      ] },
      { title: "La Anatomía de 4 Capas", blocks: [
        { type: "paragraph", text: "Abre un balón de partido de verdad y vas a encontrar cuatro capas, cada una ahí por una razón:" },
        { type: "list", items: [
          "Vejiga: el globo del centro, normalmente de goma butílica o látex, que guarda el aire. El butilo retiene la presión más tiempo. El látex se siente más suave y rebota mejor. Los fabricantes eligen su veneno.",
          "Revestimiento: capas de poliéster y algodón tejidos envueltos alrededor de la vejiga. Esto es lo que mantiene el balón redondo después de diez mil patadas en lugar de convertirse lentamente en un huevo.",
          "Amortiguación de espuma: una capa de poliuretano o EVA debajo de la cubierta. Se aplasta con el impacto y rebota, disparando más de tu energía hacia el tiro.",
          "Cubierta: el cuero sintético de afuera. Se niega a absorber agua, así que el balón pesa lo mismo en el minuto 90 que en el minuto 1, y su textura está diseñada para agarrar el aire.",
        ] },
      ] },
      { title: "Diseño de Paneles y Aerodinámica", blocks: [
        { type: "paragraph", text: "El cambio más visible son los paneles. Ese balón clásico de 32 paneles con pentágonos negros tenía costuras por todos lados, y cada costura es resistencia. Los balones modernos se las arreglan con 6 u 8 paneles, lo que recorta muchísimo la longitud total de costura." },
        { type: "paragraph", text: "Y ya ni siquiera están cosidos. Calor y pegamento de alta frecuencia unen los paneles en algo casi sin costuras y completamente impermeable. Los ingenieros modelan el flujo de aire con el mismo software de simulación que se usa para diseñar aviones. ¿Y esas bolitas y ranuras en la superficie? No son decoración. Controlan la capa de aire pegada al balón, y eso es lo que hace que un tiro fuerte vuele derecho en vez de bailar por todos lados." },
      ] },
      { title: "Equilibrio Dinámico y el Efecto Magnus", blocks: [
        { type: "paragraph", text: "Todo balón de partido tiene que pasar una prueba de equilibrio dinámico, que significa que su peso está tan bien repartido que gira sin tambalearse. Si eso sale mal, el balón se mueve de forma impredecible, los jugadores lo odian y a la marca la destrozan en internet." },
        { type: "paragraph", text: "Si sale bien, desbloqueas el efecto Magnus. Golpea el balón fuera del centro y gira. Un lado de esa superficie girando se va con el aire, el otro pelea contra él. Ese desequilibrio crea una fuerza lateral real que dobla la trayectoria a media volada. Cada tiro libre que se enrosca alrededor de la barrera es esa fuerza haciendo lo suyo." },
        { type: "callout", title: "El Efecto Magnus en Acción", accent: "purple", text: "La misma física hace que una curva en béisbol quiebre y que un derechazo con topspin en tenis se caiga. Gira el balón, desordena la presión del aire a su alrededor, y el balón se va a un lugar al que no tenía por qué ir." },
      ] },
      { title: "Tecnología Integrada", blocks: [
        { type: "paragraph", text: "Los balones de élite ya no son solo cuero y aire. Algunos ahora llevan un sensor suspendido adentro sobre su propia estructura, rastreando el movimiento en tres dimensiones y reportando 500 veces por segundo. Dónde está el balón, qué tan rápido va, el instante exacto en que un botín lo tocó." },
        { type: "paragraph", text: "Esa señal es lo que hace posible el fuera de juego semiautomático y la tecnología de línea de gol, que puede decirte en milisegundos si el balón completo cruzó la raya. El balón ya es parte del equipo arbitral." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Un balón de fútbol no es solo algo que pateas. Es un sistema por capas donde la ciencia de materiales, la dinámica de fluidos y los sensores tienen que cooperar. Cada tiro increíble que has visto empezó con alguien diseñando el balón." },
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
        { type: "paragraph", text: "Una tapa de alcantarilla suena como el objeto más aburrido del planeta. Tapa pesada de metal, en la calle, los carros le pasan encima. Ya, ¿no? Pues resulta que es un acertijo famoso de ingeniería y llevan décadas preguntándolo en entrevistas de trabajo. Entonces, ¿por qué es redonda?" },
      ] },
      { title: "Una Tapa Redonda No Puede Caer por Su Propio Agujero", blocks: [
        { type: "paragraph", text: "Esta es la respuesta que todos conocen, y es genuinamente elegante. Gira un círculo en la dirección que quieras y mide lo mismo de lado a lado. Así que una tapa redonda físicamente no puede caer por un agujero redondo del mismo tamaño. Simplemente no puede pasar." },
        { type: "paragraph", text: "Ahora intenta eso con un cuadrado. La diagonal de un cuadrado es más larga que sus lados, así que si lo inclinas en el ángulo correcto la tapa se va derecho por el hoyo. Y hay trabajadores allá abajo. Nadie quiere una placa de hierro de 100 kilos cayéndoles encima, así que gana el círculo." },
      ] },
      { title: "Las Tapas Redondas Son Más Fáciles de Mover", blocks: [
        { type: "paragraph", text: "Estas cosas pesan muchísimo. Algunas pesan más que la persona que las mueve. Pero un círculo rueda. Un trabajador la puede parar de canto y caminarla por la calle como si fuera una llanta. Intenta eso con un cuadrado y tienes cuatro esquinas peleándote todo el camino." },
        { type: "paragraph", text: "Los ingenieros piensan en los humanos que van a vivir con el diseño. La forma es solo una parte. Alguien tiene que levantar esto, moverlo, reemplazarlo y volverlo a hacer en quince años." },
      ] },
      { title: "El Agujero También Es Redondo", blocks: [
        { type: "paragraph", text: "Asómate al hoyo y vas a notar que el pozo también es redondo. Las formas redondas reparten la presión de manera pareja, que es la misma razón por la que las tuberías son redondas y no cuadradas. Hoyo redondo, tapa redonda. La forma de la tapa sigue la forma de lo que está tapando." },
      ] },
      { title: "No Hay que Alinearla", blocks: [
        { type: "paragraph", text: "Suelta una tapa redonda sobre un hoyo redondo desde cualquier ángulo y encaja. Siempre. Con un cuadrado tienes que girarla y alinear esquinas mientras cargas algo que pesa lo mismo que tú. Los círculos ahorran tiempo y eliminan una forma entera de arruinarlo." },
      ] },
      { title: "Resistente y Simple", blocks: [
        { type: "paragraph", text: "Esa tapa aguanta autos, camiones, lluvia, nieve, calor, hielo y unos veinte años de todo eso. Ser redonda reparte el peso de forma pareja en vez de amontonarlo en las esquinas. Y el patrón texturizado de arriba tampoco es decoración. Está ahí para que llantas y zapatos agarren metal mojado." },
      ] },
      { title: "Prueba Esto: Prueba de Formas", blocks: [
        { type: "paragraph", text: "Recorta un círculo de papel y un cuadrado de papel. En otra hoja, recorta los agujeros que les corresponden. Ahora intenta meter cada tapa por su propio agujero en todos los ángulos que se te ocurran. Una va a pasar. La otra nunca." },
        { type: "callout", title: "Un Diseño, Muchas Soluciones", accent: "purple", text: "Esa prueba de papel es la razón exacta por la que los ingenieros aman esta forma. Segura, resistente, fácil de mover, fácil de reponer, todo al mismo tiempo. Un solo diseño resolviendo cinco problemas en silencio es casi lo mejor que la ingeniería puede ofrecer." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Las tapas redondas son seguras, resistentes, rodables e imposibles de colocar mal. Eso es una sola forma haciendo cinco trabajos. La próxima vez que pases encima de una, échale otra mirada. Ese círculo de metal es más listo de lo que aparenta." },
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
        { type: "paragraph", text: "Las montañas rusas parecen estar haciendo trampa. Suben una colina imposible, se lanzan al vacío, te avientan de lado y te ponen de cabeza mientras tu estómago presenta una queja formal. Entonces, ¿por qué el tren nunca se sale de los rieles? Gravedad, impulso, unas ruedas muy ingeniosas y un montón de ingenieros que de verdad no querían que te cayeras." },
      ] },
      { title: "La Gravedad Inicia el Recorrido", blocks: [
        { type: "paragraph", text: "Esa subida lenta y ruidosa del principio es todo el recorrido cargándose. Una cadena o un motor arrastra el tren hasta arriba, y una vez allá, el tren tiene una cuenta bancaria de energía solo por estar alto. Los ingenieros le dicen energía potencial." },
        { type: "paragraph", text: "Después la pista desaparece bajo tus pies y la gravedad se gasta hasta el último centavo. La energía guardada se vuelve velocidad, que es energía cinética. Esa primera bajada no es solo para gritar. Está pagando todo el resto del recorrido." },
      ] },
      { title: "El Impulso Lo Mantiene en Movimiento", blocks: [
        { type: "paragraph", text: "Ahora el tren va en movimiento, y las cosas en movimiento quieren seguir en movimiento. Eso es impulso, y es lo que te lleva por las siguientes colinas, las curvas y los loopings." },
        { type: "paragraph", text: "Pero la fricción y la resistencia del aire te están robando todo el tiempo. Así que los diseñadores tienen que clavar una ventana muy angosta: suficiente velocidad para llegar a casa, no tanta como para que el recorrido se vuelva peligroso. Muy lento y el tren se detiene de cabeza. Muy rápido y las fuerzas se ponen feas." },
      ] },
      { title: "Las Ruedas Hacen Más de lo que Crees", blocks: [
        { type: "paragraph", text: "El tren no está solo apoyado sobre el riel como un carro sobre la carretera. Asómate debajo de uno alguna vez y vas a encontrar tres juegos de ruedas haciendo tres trabajos distintos:" },
        { type: "list", items: [
          "Ruedas de rodadura que van encima del riel",
          "Ruedas laterales que presionan por fuera y mantienen el tren alineado en las curvas",
          "Ruedas de retención por debajo del riel, agarrando desde abajo para que el tren no se suelte cuando vas de cabeza",
        ] },
        { type: "paragraph", text: "Así que durante un looping, la montaña rusa no está esperando amablemente a que la gravedad coopere. Está físicamente abrazada al riel desde tres direcciones." },
      ] },
      { title: "¿Por Qué No Caes?", blocks: [
        { type: "paragraph", text: "Barras de regazo, cinturones, arneses sobre los hombros. Cuál te toca depende de lo que el recorrido está a punto de hacerte. Una montaña rusa familiar tranquila solo necesita una barra. Cualquier cosa que te ponga de cabeza recibe algo mucho más serio." },
        { type: "paragraph", text: "Y el objetivo del diseño es un poco tramposo. Los ingenieros quieren que sientas que apenas te estás sosteniendo mientras estás, de hecho, extremadamente pegado al asiento. Una buena montaña rusa se siente imprudente y es todo lo contrario." },
      ] },
      { title: "Los Loopings No Son Círculos Perfectos", blocks: [
        { type: "paragraph", text: "Aquí va un detalle que casi nadie nota. Los loopings no son círculos. Tienen forma de gota estirada, anchos abajo y apretados arriba. Un círculo de verdad te aplastaría con fuerza abajo y luego te dejaría demasiado lento en la punta." },
        { type: "paragraph", text: "La forma de gota reparte esas fuerzas para que tu cuerpo las aguante. Parece una decisión estética. En realidad es un plan de rescate para tu cuello." },
      ] },
      { title: "Prueba Esto: Montaña Rusa de Canica", blocks: [
        { type: "paragraph", text: "Papel, cartón, cinta y una canica. Construye una pista con una colina y una curva. Y ahora sabotéala. Haz la primera colina demasiado baja. Haz la curva demasiado cerrada. Deja la pista con bultos. Cada falla te dice exactamente qué arreglar." },
        { type: "callout", title: "Las Mismas Preguntas, a Menor Escala", accent: "purple", text: "Esas son las mismas pruebas que corren los ingenieros de montañas rusas, menos unos cuantos millones de dólares. Cada vez que tu canica sale volando o se muere a media colina, te acaba de entregar datos." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "El tren se queda en la pista porque cada pieza fue diseñada para mantenerlo ahí. La gravedad da la velocidad, el impulso lo lleva a casa, las ruedas agarran desde tres lados, las sujeciones te mantienen abajo y la forma de la pista controla lo que siente tu cuerpo. La emoción es completamente real. Las matemáticas debajo también." },
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
        { type: "paragraph", text: "Una silla tiene exactamente un trabajo. Sostenerte. Y aun así las sillas se rompen todo el tiempo. Patas que truenan, respaldos que se fisuran, tornillos que se van aflojando solos, asientos que poco a poco se convierten en hamaca. ¿Por qué una silla sobrevive una década de maltrato y otra se rinde en un año? Ingeniería, de arriba a abajo." },
      ] },
      { title: "Las Sillas Deben Manejar Fuerzas", blocks: [
        { type: "paragraph", text: "Te sientas y tu peso empuja directo al asiento. Esa fuerza tiene que viajar por el marco, bajar por las patas y llegar al suelo. Repártela bien y la silla ni se inmuta. Métela toda en una sola unión débil y algo se va a agrietar." },
        { type: "paragraph", text: "Eso es la distribución del peso, y es todo el juego. Una buena silla no solo aguanta peso. Lo lleva de ti al piso sin dramas." },
      ] },
      { title: "Los Materiales Importan", blocks: [
        { type: "paragraph", text: "Madera, plástico, metal, tela, o una mezcla de los cuatro. Cada uno tiene su manera de fallar. La madera es fuerte hasta que la veta va en la dirección equivocada y se parte. El plástico es ligero y barato hasta que se hace delgado y se cuartea. El metal es duro hasta que es demasiado delgado, y entonces simplemente se dobla." },
        { type: "paragraph", text: "Los diseñadores eligen según costo, resistencia, comodidad, peso y cómo se ve en el catálogo. Las mejores sillas usan el material correcto en cada punto específico. Nadie gana haciendo todo del material más resistente que exista." },
      ] },
      { title: "Las Uniones Suelen Ser la Parte Más Débil", blocks: [
        { type: "paragraph", text: "Las sillas casi nunca se truenan a la mitad de una pieza sólida de madera. Se abren donde dos piezas se encuentran. Esos puntos de conexión son las uniones, y una pata puede pegarse al asiento con tornillos, pegamento, pernos, escuadras o una forma tallada para encajar." },
        { type: "paragraph", text: "Uniones débiles, silla débil. Por eso un tambaleo es una advertencia. Tambalearse significa que algo se está moviendo que nunca debió moverse, y solo va a empeorar." },
      ] },
      { title: "La Forma Puede Hacer una Silla Más Resistente", blocks: [
        { type: "paragraph", text: "Voltea una silla resistente y probablemente encuentres barras conectando las patas. Esos travesaños evitan que las patas se abran bajo la carga. Otros diseños llegan al mismo lugar con plástico curvo, marcos soldados o triángulos directos." },
        { type: "callout", accent: "purple", text: "Triángulos otra vez. Por la misma razón que sostienen puentes y torres: se niegan a cambiar de forma. Una silla puede volverse mucho más fuerte solo por geometría, sin un gramo de material extra." },
      ] },
      { title: "Las Pruebas Importan", blocks: [
        { type: "paragraph", text: "Antes de que una silla llegue a una tienda, hay máquinas maltratándola. Le apilan peso, la recargan hacia atrás, la dejan caer y se sientan en ella miles de veces seguidas. Porque la vida real es peor que cualquier laboratorio. La gente se columpia en dos patas, se retuerce, se deja caer de golpe, arrastra sillas por el piso y las apila de seis en seis." },
        { type: "paragraph", text: "Aguantar una vez es fácil. Aguantar la vez número diez mil es el reto de verdad." },
      ] },
      { title: "Prueba Esto: Desafío de la Silla de Papel", blocks: [
        { type: "paragraph", text: "Construye con papel y cinta una silla que pueda sostener algo real, como un libro o un juguete. Después construye tres más. Patas rectas, patas dobladas, refuerzos triangulares, tubos de papel enrollado. Cárgalas una por una y ve cuál se niega a rendirse." },
        { type: "callout", title: "Lo Que Descubrirás", accent: "purple", text: "Vas a descubrir rapidísimo que la forma y las uniones importan tanto como el material. Un diseño simple con uniones limpias normalmente aplasta a un diseño elegante mal pegado." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Las sillas se rompen cuando las fuerzas no tienen a dónde ir. Duran cuando alguien eligió materiales inteligentes, una forma inteligente y uniones que aguantan. Parece un mueble cualquiera, pero cada vez que soporta tu peso, esa silla está haciendo ingeniería." },
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
        { type: "paragraph", text: "Una botella de agua desechable puede ser el objeto menos impresionante que vas a tocar hoy. Guarda agua. Te la tomas. La tiras. Pero míralo como un problema de materiales y se convierte en algo medio ridículo." },
        { type: "paragraph", text: "Esa botella pesa unos cuantos gramos. Sobrevive una fábrica, un camión, una bodega, una hielera, tu mochila y una caída al concreto. Si trae refresco, además tiene gas empujando hacia afuera en cada pared. Encima de todo eso tiene que mantener el agua limpia, sellar sin fugarse, sentirse bien en tu mano y costar casi nada mil millones de veces seguidas." },
        { type: "callout", title: "El Gran Compromiso", accent: "purple", text: "Todo lo que hace a esta botella ligera, resistente y barata es también lo que la convierte en un problema de basura. Gran ingeniería, final incómodo." },
      ] },
      { title: "La Proeza de Ingeniería", blocks: [
        { type: "paragraph", text: "Casi todas están hechas de PET, abreviatura de tereftalato de polietileno. El PET es transparente, ligero, fácil de moldear y sorprendentemente resistente para lo que pesa. Esa combinación es lo que permite hacer paredes tan delgadas que se arrugan en tu mano sin que la botella se caiga a pedazos en el estante." },
        { type: "numbered", items: [
          { title: "Ligera y resistente", body: "Una botella de PET carga miles de veces su propio peso en agua. Estirar el plástico durante el moldeado alinea las largas cadenas de polímeros de adentro, y esa alineación es buena parte de la resistencia." },
          { title: "Delgada pero consciente de la presión", body: "Esas crestas, curvas y la base con forma rara son todas estructurales. Las botellas de refresco reciben la geometría más cuidadosa de todas, porque el gas atrapado empuja constantemente hacia afuera en cada centímetro." },
          { title: "Rápida de fabricar", body: "Las máquinas calientan una preforma de PET que parece tubo de ensayo, la soplan dentro de un molde, la llenan, la tapan y la etiquetan más rápido de lo que lees esta frase. Esa velocidad es casi toda la razón por la que el agua embotellada está en todos lados." },
        ] },
      ] },
      { title: "La Forma No Es Aleatoria", blocks: [
        { type: "paragraph", text: "Una botella tiene que ser agarrable, apilable y lo bastante rígida para no doblarse cuando la levantas. Esas ranuras a la mitad no son estilo. Le dan a tus dedos algo de dónde sostenerse, lo cual importa muchísimo cuando traes las manos mojadas." },
        { type: "paragraph", text: "La forma también decide cómo maneja la presión. Una botella perfectamente lisa y de pared delgada se aplasta en cuanto la aprietas. Ponle crestas y la misma cantidad de plástico se vuelve notablemente más rígida. Menos material, mismo trabajo." },
      ] },
      { title: "La Física de la Tapa", blocks: [
        { type: "paragraph", text: "Mira el cuello de la botella. Esas crestas en espiral son roscas, y la tapa tiene roscas que embonan por dentro. Cuando giras, las roscas jalan la tapa hacia abajo en lugar de solo hacerla dar vueltas." },
        { type: "paragraph", text: "Ese jalón hacia abajo aprieta un anillo de sellado contra el borde. Lo que buscas es un sello hermético, tan apretado que detiene fugas, mantiene la carbonatación adentro y deja afuera el aire y las bacterias." },
        { type: "paragraph", text: "Y esa tapita es una máquina simple, de la misma familia que una rampa o un tornillo. Convierte un giro fácil en un apretón fuerte hacia abajo. Sacar más fuerza de la que metiste es exactamente para lo que existen las máquinas simples." },
      ] },
      { title: "¿Por Qué el Plástico Es Más Grueso en Algunos Lugares?", blocks: [
        { type: "paragraph", text: "Pasa los dedos por una botella de arriba abajo y el grosor cambia. La base tiene que ser robusta para pararse y aguantar una caída. El cuello tiene que ser sólido para que la tapa muerda. Los lados se pueden dar el lujo de ser delgados, así que lo son." },
        { type: "paragraph", text: "Eso son ingenieros equilibrando resistencia, costo, comodidad y desperdicio al mismo tiempo. Muy delgada y se aplasta en tu mano. Muy gruesa y acabas de desperdiciar plástico mil millones de veces. Un buen diseño pone material exactamente donde está el esfuerzo y en ningún otro lado." },
      ] },
      { title: "La Abertura Importa", blocks: [
        { type: "paragraph", text: "Haz la abertura muy chica y beber es molesto. Hazla muy grande y te la echas encima de la camisa. Las botellas reutilizables van anchas para que quepa hielo y de verdad puedas lavarlas por dentro. Las desechables van angostas, porque solo tienen que sobrevivir un uso y nadie las va a tallar." },
        { type: "paragraph", text: "Hasta ese hueco fue la decisión de alguien." },
      ] },
      { title: "Etiquetas y Agarre", blocks: [
        { type: "paragraph", text: "La etiqueta envuelta a la mitad está haciendo dos trabajos. Marca, obviamente, pero también agrega fricción justo donde va tu mano. Las botellas reutilizables llevan esto más lejos con fundas de goma, plástico texturizado o metal con recubrimiento en polvo. Una botella que se te resbala de la mano mojada es un diseño fallido, sobre todo para niños o para alguien a media montaña." },
      ] },
      { title: "Los Compromisos y Preocupaciones de Salud", blocks: [
        { type: "paragraph", text: "Resolver un problema con elegancia no significa que resolviste todos los problemas. Las botellas de un solo uso traen una factura ambiental real, y los investigadores todavía están descifrando qué significan para nosotros todas esas partículas diminutas de plástico." },
        { type: "numbered", items: [
          { title: "Partículas de microplástico y nanoplástico", body: "La microscopía nueva detecta partículas que los métodos viejos ni siquiera veían. Un equipo de Columbia y Rutgers contó un promedio de unas 240,000 partículas de plástico detectables por litro en el agua embotellada que analizaron, y la mayoría eran nanoplásticos." },
          { title: "Fricción de la tapa", body: "Cada vez que giras una tapa, rosca de plástico raspa contra rosca de plástico. Investigación revisada por pares muestra que ese raspado suelta más partículas de microplástico justo en la abertura." },
          { title: "Lixiviación de químicos", body: "El calor, el sol, meses de almacenamiento o reutilizar una botella hecha para un solo viaje aumentan la preocupación de que el plástico se degrade y sus aditivos pasen al agua. Los científicos siguen estudiando qué le hace eso exactamente a la gente." },
          { title: "Impacto ambiental", body: "El PET se puede reciclar. Mucho no se recicla. Las botellas que terminan como basura se quedan en basureros, ríos y océanos por muchísimo tiempo." },
        ] },
        { type: "callout", title: "La Ingeniería Implica Compromisos", accent: "purple", text: "Una botella desechable es excelente para ser ligera, sellada, resistente y barata. Es pésima para desaparecer cuando terminas con ella." },
      ] },
      { title: "Cómo Reducir la Exposición al Plástico", blocks: [
        { type: "paragraph", text: "Nadie necesita entrar en pánico aquí, y una botella de plástico sigue siendo mejor que no tener agua limpia. Pero si quieres bajarle al plástico de todos los días, los cambios son bastante fáciles." },
        { type: "list", items: [
          "Carga una botella de vidrio o acero inoxidable para tu agua diaria.",
          "No dejes botellas de plástico cociéndose en un carro caliente ni bajo el sol directo.",
          "Sáltate la costumbre de rellenar una botella que fue hecha para un solo uso.",
          "Ponle un filtro certificado en casa si el agua de tu llave es segura pero quieres tranquilidad extra.",
          "Recicla el PET donde tu ciudad lo acepte, y usa estaciones de recarga cuando las encuentres.",
        ] },
      ] },
      { title: "Prueba Esto: Prueba de Diseño de Botella", blocks: [
        { type: "paragraph", text: "Agarra una botella desechable y una reutilizable y ponlas lado a lado. Compara la tapa, la textura del agarre, la forma de la base, el grosor de la pared, el tamaño de la abertura, qué tan fácil se aplasta cada una, qué tan estable se para y cómo le harías para lavarlas." },
        { type: "callout", title: "No Hay Una Respuesta Perfecta", accent: "purple", text: "Ninguna gana del todo, y esa es la lección. Una botella de montaña está hecha para sobrevivir. La de un niño está hecha para no derramarse. La desechable está hecha para no costar nada. Detectar esos compromisos es el trabajo." },
      ] },
      { title: "Reflexión Final", blocks: [
        { type: "paragraph", text: "Una botella de agua es un proyecto de ingeniería completo disfrazado de recipiente. Guardar líquido, no fugarse, caber en una mano, pararse, sobrevivir una caída, desperdiciar el mínimo material posible. También es un recordatorio de que las decisiones de diseño siguen teniendo consecuencias mucho después de que el producto sale de tus manos." },
        { type: "paragraph", text: "La próxima vez que tomes un trago, dedícale dos segundos a la botella. Tiene mucho más pensamiento encima del que alguien quería que notaras." },
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
        { type: "paragraph", text: "Escribe «explícame los agujeros negros como si tuviera 10 años» en una IA y tres segundos después tienes una respuesta sólida. Pídele un cuento, ayuda con matemáticas, una imagen, una idea para la feria de ciencias, y simplemente te la entrega. De verdad se siente como si algo allá adentro estuviera pensando." },
        { type: "paragraph", text: "Entonces vale la pena preguntar: ¿lo está? Y la respuesta honesta es no, no como tú." },
        { type: "paragraph", text: "La IA logra cosas genuinamente impresionantes, pero ahí adentro no hay un cerebro. No hay sentimientos. No hay recuerdos de su propia vida. No hay imaginación como la tuya. No tiene idea real de cómo es el mundo. Lo que sí tiene es un talento increíble para detectar patrones." },
      ] },
      { title: "¿Qué Es el Reconocimiento de Patrones?", blocks: [
        { type: "paragraph", text: "Reconocer patrones es solo notar lo que se repite, y tú lo haces todo el tiempo. Se juntan nubes oscuras, truena a lo lejos, se levanta el viento, y antes de decidir nada tu cerebro ya dijo «lluvia». Nadie te lo enseñó. Ya viste esta película." },
        { type: "paragraph", text: "La IA hace el mismo truco a una escala absurda. Imagina leer miles de libros, artículos, sitios web y conversaciones. Con el tiempo empezarías a notar qué palabras andan juntas, qué respuestas suelen seguir a qué preguntas, y qué ideas aparecen siempre lado a lado." },
        { type: "paragraph", text: "Ese es todo el asunto. La IA absorbe patrones de datos y luego los usa para adivinar qué sigue cuando le preguntas algo. Suena inteligente porque los patrones que aprendió vinieron de gente inteligente escribiendo cosas. Sonar inteligente y pensar son dos trabajos distintos." },
      ] },
      { title: "¿En Qué Se Diferencia el Pensamiento Humano?", blocks: [
        { type: "paragraph", text: "Tú haces mucho más que emparejar patrones. Te preguntas cosas. Te importan las personas. Te confundes, te emocionas, te pones nervioso, orgulloso, curioso. Decides que algo te importa. Cambias de opinión por una tarde que se te quedó grabada. Notas cuando algo es injusto, o cuando tu amigo está mal y no lo dice." },
        { type: "paragraph", text: "La IA no hace nada de eso. Digamos que tu puente de paletas colapsa. Lo sientes en el estómago. Después piensas, tal vez el centro necesitaba más soporte, y empiezas a dibujar la versión dos. Lógica, memoria, emoción, creatividad y experiencia disparando al mismo tiempo." },
        { type: "paragraph", text: "Pregúntale a una IA por qué se cayó el puente y te va a dar una respuesta decente sobre triángulos y distribución de peso. Pero nunca lo vio caer. No le importó. Nada de ese momento la cambió, y mañana no lo va a recordar." },
      ] },
      { title: "¿La IA Entiende Lo Que Dice?", blocks: [
        { type: "paragraph", text: "Puede explicarte un volcán. Puede escribir un poema sobre una tortuga. Puede contarte de los anillos de Saturno. Nada de eso significa que entienda ninguna de esas cosas como tú." },
        { type: "paragraph", text: "Piensa en el autocorrector de tu teléfono. Escribes «voy a la» y te ofrece tienda, escuela, casa. Tu teléfono no tiene idea de cómo va tu tarde. Está adivinando la siguiente palabra." },
        { type: "callout", accent: "teal", text: "La IA está haciendo una versión muchísimo más sofisticada de esa misma jugada. Predice palabras, oraciones e ideas a partir de patrones. Que es exactamente por qué puede clavar una respuesta y treinta segundos después decir algo completamente extraño." },
      ] },
      { title: "Un Ejemplo Simple", blocks: [
        { type: "paragraph", text: "Pregúntale a una IA: ¿puede un pez andar en bicicleta? Una persona se reiría y diría que no, los peces no tienen piernas y las bicis necesitan tierra. La IA probablemente también dirá que no. Pero no porque se haya imaginado a un pez tambaleándose por la calle. Está corriendo patrones de lenguaje y hechos que absorbió." },
        { type: "paragraph", text: "Ahora voltéalo: escribe un cuento gracioso sobre un pez andando en bicicleta. De repente tienes un cuento. Cambió de modo hechos a modo cuento porque reconoció qué forma de respuesta querías. Útil, y también una advertencia. Cómo preguntas cambia lo que recibes." },
      ] },
      { title: "Entonces, ¿La IA Es Inteligente?", blocks: [
        { type: "paragraph", text: "En algunas cosas, absolutamente. Encuentra patrones rapidísimo, organiza información desordenada, hace lluvia de ideas contigo a las 11 de la noche, explica un tema de cinco maneras, resume, escribe código, traduce idiomas y ayuda a la gente a aprender." },
        { type: "paragraph", text: "En otras cosas, ni cerca. No tiene idea de lo que es ser un niño, regarla frente a otras personas, ayudar a un amigo, ganar algo, o sentir ese orgullo específico cuando lo que construiste por fin funciona. No tiene sentido común. Y puede estar completamente equivocada sonando completamente segura. Es una herramienta, no un sustituto de tu cerebro." },
      ] },
      { title: "Piensa en la IA Como una Súper Calculadora de Palabras", blocks: [
        { type: "paragraph", text: "Una calculadora destruye las matemáticas. Pero no tiene idea de por qué necesitas la respuesta, si escribiste mal los números, ni si el resultado tiene algún sentido en la vida real. Solo calcula." },
        { type: "paragraph", text: "La IA es la misma idea, solo que trabaja con palabras, imágenes, código y patrones en lugar de solo números. Te puede ayudar a pensar. No debería estar pensando por ti." },
      ] },
      { title: "Prueba Esto", blocks: [
        { type: "paragraph", text: "Ve y hazle estas tres cosas a una IA, una tras otra:" },
        { type: "list", items: [
          "Explica cómo vuela un avión de papel.",
          "Explica cómo vuela un avión de papel como si estuviera en 2º grado.",
          "Inventa un cuento gracioso sobre un avión de papel que va a Marte.",
        ] },
        { type: "paragraph", text: "Fíjate cuánto cambian las respuestas. La IA no se volvió maestra, luego niña, luego cuentacuentos. Solo emparejó el patrón de lo que le pediste. Ese es todo el asunto en tres preguntas." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "La IA no piensa como tú. Detecta patrones, predice qué sigue y arma respuestas con lo que aprendió de los datos. Eso es poderoso y genuinamente divertido de usar. Pero tú sigues trayendo cosas que ella no tiene: comprensión real, creatividad de verdad, criterio, sentimientos y responsabilidad por lo que hagas con la respuesta." },
        { type: "callout", accent: "teal", text: "La IA te puede ayudar a pensar. Tu cerebro sigue siendo la mejor herramienta del salón, y es el que tiene que decidir qué sigue." },
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
        { type: "paragraph", text: "La IA responde rápido. Dinosaurios, un cuento corto, un error en tu código, una idea para la feria de ciencias. A veces la respuesta es excelente. A veces suena excelente. No siempre es lo mismo." },
        { type: "paragraph", text: "Lo cual levanta una pregunta justa: si esta tecnología es tan avanzada, ¿por qué la sigue regando? Porque la IA no sabe cosas de la forma en que tú sabes cosas. Predice, con base en patrones. Casi siempre le atina. A veces se va de lado." },
      ] },
      { title: "La IA Puede Adivinar Mal", blocks: [
        { type: "paragraph", text: "Cada vez que preguntas algo, la IA está armando una respuesta con la forma de tu pregunta. Se apoya en patrones de una montaña de ejemplos y predice qué palabras van después. Así que incluso cuando suena segurísima, está haciendo una suposición muy bien informada." },
        { type: "paragraph", text: "Pregunta cuál es la montaña más alta del mundo y te dice Everest sin problema. Ese dato aparece en todos lados. Pero ponte muy específico, pregúntale algo oscuro, y quizá no tenga patrones sólidos de dónde jalar. En lugar de decírtelo, puede producir algo que suene correcto. Ese es el modo de falla número uno: contesta cuando debería encogerse de hombros." },
      ] },
      { title: "¿Qué Es una Alucinación?", blocks: [
        { type: "paragraph", text: "Cuando una IA inventa algo y te lo entrega como si fuera un hecho, la gente le dice alucinación. No está viendo cosas. Generó una respuesta con la forma de la verdad pero sin nada adentro." },
        { type: "paragraph", text: "Cosas que la IA ha inventado con toda tranquilidad:" },
        { type: "list", items: [
          "Un título de libro que no existe",
          "Una fecha equivocada por décadas",
          "Una cita que nadie dijo jamás",
          "Un dato científico que suena completamente razonable y es falso",
          "Una fuente con un enlace muy convincente que no lleva a ningún lado",
        ] },
        { type: "callout", accent: "teal", text: "Lo peligroso es el tono. Una alucinación llega con exactamente la misma seguridad que una respuesta correcta. Por eso sigues verificando lo que importa." },
      ] },
      { title: "Los Datos Malos Pueden Llevar a Respuestas Malas", blocks: [
        { type: "paragraph", text: "La IA aprende de datos, y datos significa el texto, las imágenes y los números que le dieron de comer. Algo de eso está desactualizado. Algo está sesgado. Algo cuenta media historia. Algo está simplemente mal. Aprende patrones de un montón desordenado y vas a repetir parte del desorden." },
        { type: "paragraph", text: "Imagina estudiar de un cuaderno donde la mitad de las páginas están correctas y la otra mitad tiene respuestas equivocadas anotadas. Si nunca verificas, vas a aprender lo incorrecto con toda confianza y ni te vas a enterar. La IA está en la misma situación, solo que su cuaderno es del tamaño del internet." },
      ] },
      { title: "La IA No Siempre Entiende la Pregunta", blocks: [
        { type: "paragraph", text: "A veces el problema no es la IA. Es la pregunta. Si alguien llegara y te preguntara «¿qué tan grande es?», dirías «¿qué tan grande es qué?». Una IA muchas veces solo elige un significado y se lanza, y si eligió mal, todo lo que sigue está mal." },
        { type: "paragraph", text: "Por eso importa tanto cómo preguntas. «Háblame de la energía» no le da nada con qué trabajar. «Explica la diferencia entre energía renovable y no renovable para un niño de 4º grado» le da un blanco. Misma herramienta, respuesta radicalmente distinta." },
      ] },
      { title: "La IA Puede Confundir Cosas Similares", blocks: [
        { type: "paragraph", text: "Los patrones son su fuerza y también su debilidad. Dos figuras históricas con nombres parecidos se mezclan en una sola persona. El título de una película cambia de lugar con el de un libro. Una explicación científica usa palabras que suenan bien pero describen algo ligeramente distinto." },
        { type: "paragraph", text: "Pasa porque la IA no está mirando el mundo. Está mirando texto sobre el mundo. Y algunos sistemas ni siquiera conocen lo que pasó recientemente, así que para descubrimientos nuevos, cambios de reglas o cualquier cosa en las noticias, ve a revisar una fuente actual." },
      ] },
      { title: "¿Cómo Puedes Verificar las Respuestas de la IA?", blocks: [
        { type: "callout", title: "Una Regla Simple", accent: "teal", text: "La IA es ayudante, no la última palabra. Todo lo que toque escuela, seguridad, salud o noticias se verifica antes de usarse." },
        { type: "paragraph", text: "Pregúntate un par de cosas. ¿De dónde habría salido esta información? ¿La puedo encontrar en algún lugar que sí me dé confianza? ¿Concuerda con lo que dijo mi maestro? Y la más importante: ¿esto de verdad tiene sentido?" },
        { type: "paragraph", text: "Tres verificaciones rápidas funcionan bien. ¿Tiene sentido? ¿Una fuente confiable lo respalda? ¿Un maestro, un papá o un experto estarían de acuerdo? Si falla cualquiera de las tres, bájale muchísimo a la velocidad." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "La IA se equivoca porque adivina, porque sus datos de entrenamiento eran imperfectos, porque tu pregunta fue vaga, porque mezcló dos cosas parecidas, o porque nunca vio la información más nueva. Nada de eso la hace inútil. Solo significa que tú te quedas al volante." },
        { type: "callout", accent: "teal", text: "La IA te puede ayudar a aprender más rápido y a pensar en voz alta. Tu trabajo es seguir haciendo una pregunta: ¿cómo sé que esto es verdad?" },
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
        { type: "paragraph", text: "Levantas el teléfono, lo volteas a ver y se abre. Sin contraseña, sin escribir, sin pensarlo. La verdad se siente un poco a magia." },
        { type: "paragraph", text: "Pero tu teléfono no está diciendo «ah, eres tú». No te conoce como te conocen tus amigos. Lo que hace es disparar cámaras y sensores, convertir tu cara en un patrón de números y revisar si ese patrón se parece lo suficiente al que tiene guardado." },
      ] },
      { title: "Tu Cara Tiene Patrones", blocks: [
        { type: "paragraph", text: "Tu cara está llena de medidas. La distancia entre tus ojos. La inclinación de tu nariz. Dónde queda tu mandíbula respecto a tus pómulos. Junta todas esas distancias y obtienes una combinación que casi nadie más tiene." },
        { type: "paragraph", text: "Tu teléfono tiene una de esas combinaciones guardada. Cuando lo miras, arma una nueva y las compara. Se parecen lo suficiente, entras. Básicamente es un juego de emparejar carísimo pasando en menos de un segundo." },
      ] },
      { title: "¿Qué Pasa Cuando Lo Configuras?", blocks: [
        { type: "paragraph", text: "¿Te acuerdas de cómo la configuración te hace girar la cabeza en círculo? Hay una razón. Tu cara no se ve igual desde todos los ángulos ni con toda la luz. Sol directo, cuarto oscuro, lentes puestos, lentes quitados." },
        { type: "paragraph", text: "El teléfono está juntando suficientes vistas para armar un patrón que sobreviva todo eso. Sáltatelo y te quedarías fuera cada vez que te sientes en la sombra." },
      ] },
      { title: "Las Cámaras y los Sensores Ayudan", blocks: [
        { type: "paragraph", text: "Una cámara normal solo toma una foto plana. Algunos teléfonos agregan sensores que miden profundidad, o sea qué tan lejos está cada parte de tu cara del lente. Esa es la diferencia entre una cara y la foto de una cara." },
        { type: "paragraph", text: "Piensa en un dibujo de un cubo comparado con un cubo real sobre la mesa. Mismo contorno, completamente distintos en tres dimensiones. Detectar profundidad es por lo que un teléfono se niega a desbloquearse con una foto impresa." },
      ] },
      { title: "¿Dónde Entra el Aprendizaje Automático?", blocks: [
        { type: "paragraph", text: "El aprendizaje automático es la parte de la IA donde la computadora descubre patrones a partir de ejemplos en vez de seguir reglas que alguien escribió. Para el desbloqueo facial, es lo que le enseña al teléfono qué patrones son tuyos y cuánto se les permite cambiar." },
        { type: "paragraph", text: "Porque tú cambias. Sonríes, ladeas la cabeza, te pones una gorra, te haces un corte de pelo del que te arrepientes. El aprendizaje automático es lo que evita que el teléfono se asuste con cada cambio pequeño." },
      ] },
      { title: "Por Qué La Privacidad Importa", blocks: [
        { type: "paragraph", text: "Aquí viene la parte incómoda. Una contraseña y una cara no son el mismo tipo de secreto. Si te roban la contraseña, haces otra en treinta segundos. Nadie ha conseguido nunca una cara nueva." },
        { type: "callout", accent: "teal", text: "Así que las empresas, escuelas y apps que manejan datos faciales tienen que ser extremadamente cuidadosas, y deberían decirte qué recopilan, dónde vive y quién puede verlo. Si una app quiere escanear tu cara, ese es un buen momento para ir a preguntarle a un adulto." },
      ] },
      { title: "¿El Reconocimiento Facial Puede Cometer Errores?", blocks: [
        { type: "paragraph", text: "Todo el tiempo. Se niega a desbloquear cuando debería. Se rinde con poca luz. Y más grave: algunos sistemas han funcionado notablemente peor para ciertos grupos de personas, normalmente porque las caras con las que entrenaron no eran lo bastante diversas." },
        { type: "paragraph", text: "Que es exactamente por qué los humanos tenemos que seguir probando esto, arreglándolo y decidiendo dónde debería y no debería usarse." },
      ] },
      { title: "Prueba Este Experimento Mental", blocks: [
        { type: "paragraph", text: "Imagina que tú estás diseñando el sistema de desbloqueo facial. ¿Qué debería hacer cuando:" },
        { type: "list", items: [
          "¿El cuarto está completamente a oscuras?",
          "¿La persona trae lentes de sol?",
          "¿Alguien levanta una foto del dueño?",
          "¿Dos gemelos idénticos intentan abrir el mismo teléfono?",
          "¿El niño que lo configuró ya tiene tres años más?",
        ] },
        { type: "paragraph", text: "Cada uno de esos es un problema real que alguien tuvo que resolver, y las respuestas se pelean entre sí. Precisión, seguridad, justicia y privacidad no siempre quieren lo mismo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Tu teléfono conoce tu cara como un patrón, no como una persona. Las cámaras y los sensores juntan los datos, el aprendizaje automático decide qué cuenta como coincidencia, y las reglas de seguridad toman la decisión final de abrir o no." },
        { type: "callout", accent: "teal", text: "Antes de dejar que una app escanee tu cara, haz las dos preguntas que importan: ¿a dónde va esto y quién lo puede ver?" },
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
        { type: "paragraph", text: "El autocorrector es genuinamente útil casi siempre. Tecleas 'pra' y calladito se vuelve 'para'. Escribes a toda velocidad, se te va una letra, y nadie se entera." },
        { type: "paragraph", text: "Y luego están las otras veces. Vas a mandar algo perfectamente normal y tu teléfono mete una palabra que no tiene sentido y te deja en ridículo. ¿Por qué hace eso? Porque el autocorrector está prediciendo palabras. No tiene idea de qué quisiste decir." },
      ] },
      { title: "El Autocorrector Es una Herramienta de Predicción", blocks: [
        { type: "paragraph", text: "Toma lo que escribiste y adivina la palabra que buscabas. Escribes 'definitvamente' y aterriza en 'definitivamente', porque están a dos teclas de distancia." },
        { type: "paragraph", text: "Por debajo está corriendo varias preguntas a la vez. ¿Qué palabra real se parece más a esta ortografía? ¿Qué palabra suele seguir a la anterior? ¿Qué escribe esta persona todo el tiempo? ¿Cuál es la oración más probable aquí? Esas preguntas le atinan constantemente. Y de vez en cuando fallan de forma espectacular." },
      ] },
      { title: "Las Computadoras No Entienden las Palabras Como las Personas", blocks: [
        { type: "paragraph", text: "Cuando lees la palabra 'perro', algo pasa en tu cabeza. Pelo, ladridos, un perro específico que conoces, tal vez uno que una vez te tumbó. La entiendes porque has vivido cerca de perros." },
        { type: "paragraph", text: "El autocorrector no ha vivido cerca de nada. Nunca conoció un perro, nunca entendió un chiste, no tiene idea de por qué tu amigo escribe su nombre así. Ve letras y probabilidades. Por eso sobrescribe con toda seguridad una palabra que escribiste bien. No te está contradiciendo. Solo pensó que otra palabra era más probable." },
      ] },
      { title: "Los Nombres y el Argot Confunden al Autocorrector", blocks: [
        { type: "paragraph", text: "Los nombres lo destruyen. Tu amigo escribe el suyo de forma poco común. Tu colonia o tu equipo no están en el diccionario. El autocorrector ve algo que no reconoce y amablemente lo reemplaza por algo que sí, y así el nombre de una persona se vuelve un sustantivo al azar." },
        { type: "paragraph", text: "Y luego está todo lo que la gente inventa a propósito. Chistes internos, jerga, apodos, una palabra que tu grupo se sacó el mes pasado. El autocorrector no tiene categoría para nada de eso, así que aplana lo que escribiste hacia la opción más aburrida que encuentra." },
      ] },
      { title: "¿Por Qué a Veces Mejora?", blocks: [
        { type: "paragraph", text: "Quizás has notado que tu teléfono eventualmente se rinde y te deja usar una palabra. Eso es porque muchos sistemas de autocorrección se adaptan a ti. Escribe el mismo nombre suficientes veces y deja de pelear." },
        { type: "paragraph", text: "Es aprendizaje automático haciendo lo suyo a escala pequeña. Nota tus costumbres y se ajusta. También crea un modo de falla muy chistoso: comete el mismo error tipográfico suficientes veces y tu teléfono decide que ese error ahora es correcto." },
      ] },
      { title: "El Autocorrector y la IA Están Relacionados", blocks: [
        { type: "paragraph", text: "El autocorrector no es un chatbot de IA, pero son primos. Los dos son máquinas de predicción. El autocorrector predice una palabra. Un chatbot predice párrafos completos. Ninguno de los dos entiende el lenguaje como tú." },
        { type: "callout", accent: "teal", text: "Una persona puede detenerse y preguntar «espera, ¿a qué te refieres?». Cacha el sarcasmo, el estado de ánimo, lo que no dijiste. Una computadora tiene que inferir todo eso desde patrones, y a veces infiere mal." },
      ] },
      { title: "Inténtalo", blocks: [
        { type: "paragraph", text: "Escribe una oración ridícula llena de palabras inventadas, nombres y jerga, y observa qué le intenta hacer tu teléfono. Después ponte curioso: ¿por qué eligió ese reemplazo? ¿Se fue por la ortografía? ¿Por una frase común? ¿Por algo que escribiste la semana pasada?" },
        { type: "paragraph", text: "Eso es cerebro de ingeniero. No te quedes en que algo falló. Persigue el porqué." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "El autocorrector se pone raro porque predice patrones en lugar de entender significado. Te salva de errores tipográficos, aprende tus mañas y de vez en cuando hunde un mensaje perfectamente bueno." },
        { type: "callout", accent: "teal", text: "El autocorrector es el asistente. Tú eres el editor. Léelo una vez antes de darle enviar." },
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
        { type: "paragraph", text: "Escribirle a una IA se siente como mandarle mensaje a un robot rapidísimo y muy leído. Mandas «¿por qué el cielo es azul?» y unos segundos después ya hay una explicación completa esperándote. ¿Pero qué pasó realmente en ese hueco?" },
        { type: "paragraph", text: "Nada allá adentro despertó a meditar tu pregunta. Lo que pasó fue un proceso: instrucción, entrenamiento, patrones, predicción. Vamos paso por paso." },
      ] },
      { title: "Paso 1: Le Das a la IA una Instrucción", blocks: [
        { type: "paragraph", text: "La instrucción es lo que escribiste. Puede ser floja, como «explica la gravedad», o puede darle algo con qué trabajar, como «explica la gravedad a un niño de tercer grado usando un ejemplo del patio de recreo»." },
        { type: "callout", accent: "teal", text: "La segunda recibe una respuesta muchísimo mejor, porque le dijiste para quién es y alrededor de qué construirla. Una instrucción es como darle indicaciones a un compañero de equipo. Indicaciones vagas, resultados vagos." },
      ] },
      { title: "Paso 2: La IA Desglosa Tus Palabras", blocks: [
        { type: "paragraph", text: "La IA parte tu instrucción en pedazos y revisa las palabras, el orden en que llegaron y la forma que hacen juntas." },
        { type: "paragraph", text: "Digamos que pides «explica la fotosíntesis para niños». Detecta tres señales. «Explica» significa que quieres enseñanza, no una lista. «Fotosíntesis» es el tema. «Para niños» fija el nivel de lectura. Esas tres pistas moldean todo lo que sigue." },
      ] },
      { title: "Paso 3: La IA Usa lo que Aprendió Durante el Entrenamiento", blocks: [
        { type: "paragraph", text: "Mucho antes de que tú llegaras, ese modelo pasó por un entrenamiento, lo que significa que procesó una cantidad de texto que da vértigo. Artículos, preguntas, respuestas, explicaciones, historias, código, todo." },
        { type: "paragraph", text: "No memorizó nada de eso. Absorbió patrones. Qué palabras viajan juntas. Cómo se construye normalmente una buena explicación. Qué hechos suelen aparecer lado a lado. Cómo se siente cada estilo de escritura. A esos patrones recurre cuando le preguntas algo que nunca ha visto." },
      ] },
      { title: "Paso 4: La IA Predice una Respuesta", blocks: [
        { type: "paragraph", text: "Ahora empieza a escribir, y lo hace prediciendo qué debe venir después, pedazo por pedazo. No hay una respuesta terminada en un cajón. Pregunta «¿por qué las plantas necesitan luz solar?» y predice que una respuesta sólida probablemente incluye energía, alimento, hojas y fotosíntesis, y construye hacia allá." },
        { type: "paragraph", text: "Por eso la misma pregunta te puede dar una línea, un ensayo, un poema, un cuestionario o una guía numerada. Tú estás dirigiendo la predicción." },
      ] },
      { title: "Paso 5: La Respuesta Aparece", blocks: [
        { type: "paragraph", text: "El texto llega a tu pantalla luciendo pulido y muy seguro de sí mismo. No sueltes cómo se fabricó." },
        { type: "paragraph", text: "Esa respuesta no vino de alguien que vivió algo, abrió un libro de texto o pesó qué importa de verdad aquí. Vino de una herramienta ensamblando patrones. A veces es exactamente lo que necesitabas. A veces necesita una segunda revisada." },
      ] },
      { title: "Por Qué las Instrucciones Claras Ayudan", blocks: [
        { type: "paragraph", text: "Instrucción más afilada, respuesta más afilada. Siempre. Cambia «cuéntame sobre robots» por «explica la diferencia entre robots e IA para un niño de cuarto grado, con ejemplos». Cambia «ayuda con ciencia» por «dame tres ideas para la feria de ciencias sobre imanes usando cosas que tenga en casa»." },
        { type: "paragraph", text: "Dale un trabajo claro y hará un trabajo claro." },
      ] },
      { title: "Inténtalo", blocks: [
        { type: "paragraph", text: "Pregunta lo mismo de tres formas y mira qué cambia:" },
        { type: "list", items: [
          "Explica la electricidad.",
          "Explica la electricidad usando un ejemplo de un tobogán de agua.",
          "Explica la electricidad en cinco oraciones para un niño de tercer grado.",
        ] },
        { type: "paragraph", text: "Pon las tres respuestas una junto a otra. El tema nunca se movió. Tu instrucción hizo todo el trabajo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Das una instrucción. La IA la lee, se apoya en patrones del entrenamiento, predice qué sigue y arma una respuesta con eso. Parece que piensa. Es predicción. Lo cual la hace poderosa y también falible." },
        { type: "callout", accent: "teal", text: "La IA te puede entregar una respuesta. Entenderla sigue siendo tu trabajo. Quédate curioso, escribe mejores instrucciones y verifica las respuestas que cuentan." },
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
        { type: "paragraph", text: "La IA sí es útil. Desenreda problemas de tarea, avienta ideas para proyectos, escribe historias, contesta preguntas a medianoche y nunca se cansa de que le vuelvas a preguntar. Es medio tutor, medio bibliotecaria y medio compañero de lluvia de ideas, todo apilado en uno." },
        { type: "paragraph", text: "Entonces, ¿deberías creerle todo? No. Ni cerca. Útil y correcto son dos cosas distintas, y en ese hueco es donde la gente se quema." },
      ] },
      { title: "La IA Puede Sonar Segura Aunque Esté Equivocada", blocks: [
        { type: "paragraph", text: "Esta es la parte tramposa. La IA nunca suena insegura. Contesta con calma, usa palabras impresionantes, parte todo en secciones ordenaditas con títulos. Se lee como algo escrito por alguien que definitivamente sabe." },
        { type: "callout", accent: "teal", text: "Una respuesta ordenada no es una respuesta correcta. La IA confunde datos y a veces los inventa por completo. Cuando inventa algo así, la gente le llama alucinación." },
      ] },
      { title: "Piensa Como un Detective", blocks: [
        { type: "paragraph", text: "Usar bien la IA significa portarte como detective. Un detective no acepta la primera pista tal cual. La pica, busca evidencia que la respalde y ve si la historia se sostiene." },
        { type: "paragraph", text: "Así que cuando aterrice una respuesta, corre esta lista:" },
        { type: "list", items: [
          "¿Esto de verdad tiene sentido?",
          "¿De dónde habría salido esta información?",
          "¿La puedo encontrar en algún lugar en el que confíe?",
          "¿Importa si esto está mal?",
          "¿Esta debería ir con un adulto?",
        ] },
        { type: "paragraph", text: "El objetivo nunca es tenerle miedo a la IA. El objetivo es ser la persona más lista de la conversación." },
      ] },
      { title: "Algunas Preguntas Necesitan Más Cuidado", blocks: [
        { type: "paragraph", text: "Muchísimas respuestas de IA no traen ningún riesgo. Pide una historia ridícula sobre un dragón obsesionado con los hot cakes y nadie necesita verificar los hot cakes. Ve y diviértete." },
        { type: "paragraph", text: "Otros temas merecen precaución de verdad. Bájale mucho a la velocidad con cualquier cosa sobre:" },
        { type: "list", items: [
          "Salud y seguridad",
          "Dinero",
          "Noticias y eventos actuales",
          "Tareas escolares donde la precisión importa",
          "Problemas personales",
          "Información privada",
          "Cualquier cosa que pueda afectar a otra persona",
        ] },
        { type: "paragraph", text: "En cualquiera de esos, la IA puede ser un punto de partida. Nunca debería ser tu única fuente." },
      ] },
      { title: "Pregúntale a un Adulto de Confianza", blocks: [
        { type: "paragraph", text: "Cuando algo que dijo la IA no te cuadre, ve con una persona real. Un papá, un maestro, una bibliotecaria, un entrenador, quien sea que te pueda ayudar a pensarlo en voz alta." },
        { type: "paragraph", text: "La IA sabe información general. No sabe de tu vida, tu familia, tu escuela ni lo que pasó ayer. Un adulto de confianza sí. Eso importa muchísimo cuando el consejo toca tu cuerpo, tus sentimientos, tus amistades, tu seguridad o una decisión que no puedes deshacer." },
      ] },
      { title: "No Compartas Información Privada", blocks: [
        { type: "paragraph", text: "Una regla más, y esta no se negocia. La información privada se queda fuera del chat. Eso incluye:" },
        { type: "list", items: [
          "Tu nombre completo",
          "Tu domicilio o dirección escolar",
          "Contraseñas",
          "Números de teléfono",
          "Fotos personales",
          "Información privada de tu familia",
          "Cualquier cosa que te incomodaría que desconocidos vieran",
        ] },
        { type: "paragraph", text: "Cada app maneja tu información de forma muy distinta, y casi nunca puedes saber cuál es cuál desde afuera. Si no puedes ver a dónde va algo, no lo mandes. Pregúntale primero a un adulto." },
      ] },
      { title: "Buenas Formas en Que los Niños Pueden Usar la IA", blocks: [
        { type: "paragraph", text: "Usada bien, esta cosa es una ventaja real. Prueba pedirle que:" },
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
        { type: "paragraph", text: "Lo mejor que puedes hacer con la IA no es copiarla. Es entender algo que hace una hora no entendías. Ese es todo el logro." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "No le creas todo a la IA. Es útil, creativa, rápida y a veces está rotundamente equivocada, y te entrega las cuatro cosas con exactamente el mismo tono de voz." },
        { type: "callout", accent: "teal", text: "La gente que usa bien la IA no le cree automáticamente. Piensa, verifica y la contradice. Trátala como herramienta, no como el jefe de tu cerebro." },
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
        { type: "paragraph", text: "¿Conoces ese momento en que un enemigo te ve y se lanza a perseguirte? ¿O cuando el juego se pone más difícil justo cuando empiezas a mejorar? Nada de eso es suerte. Es IA, y está corriendo en el fondo de casi cualquier juego que toques." },
        { type: "paragraph", text: "La IA de los juegos mueve personajes, toma decisiones, reacciona a ti y arma el desafío. Es lo que hace que un mundo se sienta como si notara que llegaste. Pero no es lo mismo que la IA con la que chateas. En los juegos, IA normalmente significa un conjunto de reglas de comportamiento que suman algo que se siente inteligente." },
      ] },
      { title: "¿Qué Es la IA de los Juegos?", blocks: [
        { type: "paragraph", text: "La IA de los juegos es lo que controla a todos los personajes que tú no estás controlando. Enemigos, compañeros, animales, aldeanos, monstruos, corredores rivales, el tendero que dice la misma línea siempre. Todos son NPCs, abreviatura de personajes no jugadores, que solo significa que el juego los maneja en lugar de una persona." },
        { type: "paragraph", text: "La IA toma sus decisiones. ¿El enemigo carga o se queda en posición? ¿Tu compañero te sigue al túnel? ¿El coche rival frena antes de esa curva? ¿El tendero levanta la vista cuando pasas? Cada una de esas es una regla que alguien escribió." },
      ] },
      { title: "Movimiento de los Enemigos", blocks: [
        { type: "paragraph", text: "El movimiento es el clásico. Imagina un juego de laberinto con un monstruo cazándote. Ese monstruo tiene que atravesar el laberinto sin encerrarse solo en una esquina para siempre, lo que significa que los diseñadores le dan un algoritmo, un conjunto de instrucciones paso a paso para encontrar el camino." },
        { type: "paragraph", text: "Las reglas pueden ser sorprendentemente simples:" },
        { type: "list", items: [
          "Si el jugador está cerca, persíguelo.",
          "Si el jugador está lejos, patrulla el área.",
          "Si hay una pared, gira.",
          "Si la salud es baja, huye.",
          "Vigila un cofre del tesoro.",
        ] },
        { type: "paragraph", text: "Cinco reglas así y de repente el monstruo se siente como si te estuviera cazando a propósito." },
      ] },
      { title: "Decisiones de los NPCs y Dificultad", blocks: [
        { type: "paragraph", text: "Los NPCs también deciden cosas, y los buenos se acuerdan de lo que hiciste. Un aldeano te agradece por algo que hiciste hace dos horas. Un guardia se niega a moverse porque nunca encontraste la llave. Por debajo, el juego solo está revisando condiciones: si pasó esto, entonces haz aquello." },
        { type: "paragraph", text: "Algunos juegos también le ajustan la dificultad en silencio mientras juegas. Muy fácil y te aburres. Muy difícil y avientas el control. Así que los enemigos aceleran, los acertijos se aprietan, o aparece una pista después de que llevas diez minutos atorado en el mismo cuarto. Te estuvieron administrando todo el tiempo." },
      ] },
      { title: "La IA de los Juegos Puede Ser Simple o Compleja", blocks: [
        { type: "paragraph", text: "Buena parte de la IA de los juegos apenas es IA. Un guardia caminando de un lado a otro en una ruta fija. Un pez nadando en círculo. Sigue contando, sigue haciendo un trabajo, no es exactamente un genio." },
        { type: "paragraph", text: "Otros juegos se van hasta el fondo. Los personajes reaccionan al sonido, a la luz, a decisiones que tomaste hace una hora, a un mundo que no deja de cambiar. Pero nadie está persiguiendo la máxima inteligencia. Están persiguiendo diversión, y no son el mismo blanco." },
      ] },
      { title: "¿Por Qué No Hacer Enemigos Perfectos?", blocks: [
        { type: "paragraph", text: "Si los diseñadores pueden hacer la IA inteligente, ¿por qué no hacer enemigos invencibles? Porque ese juego sería insoportable. Imagina un juego de fútbol donde el portero ataja absolutamente todo, o uno de carreras donde la computadora jamás toma mal una curva. Lo cierras en cuatro minutos." },
        { type: "callout", accent: "teal", text: "La buena IA de juegos está hecha para retarte, no para humillarte. Los diseñadores la hacen peor de lo que podría ser, a propósito. Los enemigos dudan antes de atacar, fallan de vez en cuando, telegrafían el golpe grande. Todo eso existe para que tengas chance de reaccionar y mejorar." },
      ] },
      { title: "Intenta Diseñar Tu Propia IA de Juego", blocks: [
        { type: "paragraph", text: "Puedes hacer esto ahora mismo, sin escribir código. Estás diseñando un monstruo para un juego de laberinto. ¿Qué reglas sigue?" },
        { type: "list", items: [
          "Caminar aleatoriamente hasta que vea al jugador.",
          "Perseguir al jugador si está cerca.",
          "Dejar de perseguir después de 10 segundos.",
          "Huir si el jugador recoge un power-up.",
          "Vigilar un cofre del tesoro.",
        ] },
        { type: "paragraph", text: "Cinco reglas y ya tienes una criatura con personalidad. La próxima vez que juegues algo, párate a observar a un NPC treinta segundos. A ver si puedes deducir qué reglas está siguiendo. Cuando las empiezas a ver ya no puedes parar." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los juegos usan IA para manejar enemigos, NPCs, dificultad y movimiento. Puede ser un puñado de reglas simples o un sistema genuinamente complicado. En cualquier caso, su trabajo es hacer que el mundo reaccione a ti." },
        { type: "callout", accent: "teal", text: "La mejor IA de juego casi nunca es la más inteligente. Es la que te da la mejor pelea." },
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
        { type: "paragraph", text: "Las películas nos hicieron esto. Los robots caminan por ahí, platican, hacen planes y de vez en cuando deciden apoderarse del planeta. Así que es completamente razonable asumir que robot e IA significan lo mismo." },
        { type: "paragraph", text: "No es así. Un robot es una máquina que hace cosas en el mundo físico. La IA es software que reconoce patrones y hace predicciones. A veces se juntan. Pero un montón de robots no tienen nada de IA, y casi toda la IA nunca ha tenido cuerpo en su vida." },
      ] },
      { title: "¿Qué Es un Robot?", blocks: [
        { type: "paragraph", text: "Un robot es una máquina que detecta, se mueve o hace un trabajo. Algunos se parecen vagamente a nosotros. La mayoría no se parece en nada. Probablemente estuviste cerca de varios hoy:" },
        { type: "list", items: [
          "Una aspiradora robótica",
          "Un brazo de fábrica que construye autos",
          "Un dron",
          "Un rover de Marte",
          "Un robot de juguete",
          "Una máquina usada en cirugías",
        ] },
        { type: "paragraph", text: "Los robots traen hardware físico: motores, ruedas, brazos, cámaras, sensores, pinzas. Ese es todo el punto. Un robot toca el mundo real." },
      ] },
      { title: "¿Qué Es la IA?", blocks: [
        { type: "paragraph", text: "IA significa inteligencia artificial, y quiere decir software que logra tareas que antes creíamos que requerían una mente. Detectar patrones, predecir qué sigue, escribir texto, clasificar imágenes, traducir idiomas, decidir qué video ves después." },
        { type: "paragraph", text: "Nada de eso necesita cuerpo. Un chatbot vive completamente dentro del software. Te puede escribir un ensayo sobre lápices y no puede levantar un lápiz, a menos que alguien lo conecte a un robot. La IA es la parte que decide. El robot es la parte que hace." },
      ] },
      { title: "¿Qué Son los Sensores y los Motores?", blocks: [
        { type: "paragraph", text: "Los sensores son cómo una máquina se entera de algo. Tú tienes vista, oído y tacto. Un robot tiene una cámara para ver, un micrófono para oír, un sensor de contacto para sentir un golpe, un sensor de distancia para frenar antes de la pared, un termómetro para medir el calor." },
        { type: "paragraph", text: "Los motores son cómo se mueve. Girar una rueda, levantar un brazo, abrir una pinza, rotar una articulación. Si los sensores son los sentidos, los motores son los músculos. Y como los músculos, no deciden nada solos. Alguien les tiene que decir qué hacer." },
      ] },
      { title: "Un Robot Sin IA", blocks: [
        { type: "paragraph", text: "Un montón de robots funcionan prácticamente sin IA. Imagina un robotito persiguiendo una tira de cinta negra por el suelo. Sensor de luz abajo. Ve la línea, avanza. Se desvía, corrige." },
        { type: "paragraph", text: "Se ve listo. No lo es. Está siguiendo dos reglas con sensores y motores, y las va a seguir para siempre sin aprender absolutamente nada." },
      ] },
      { title: "IA Sin un Robot", blocks: [
        { type: "paragraph", text: "Ahora al revés. Una IA te ayuda a escribir un poema. Tiene palabras, y ya. Sin ruedas, sin brazos, sin cámara. No puede cruzar el cuarto, ni apilar un bloque, ni pasarte una botella de agua." },
        { type: "paragraph", text: "Eso es IA sin robot pegado. Brillante con la información, completamente atrapada en la computadora." },
      ] },
      { title: "Un Robot Con IA", blocks: [
        { type: "paragraph", text: "Y luego está la combinación, y un auto autónomo es el ejemplo obvio. Cámaras y sensores vigilan la carretera, las señales, los carriles, los otros autos, la persona a punto de bajarse de la banqueta. La IA convierte todo eso en una decisión sobre qué hacer en el próximo medio segundo." },
        { type: "callout", accent: "teal", text: "Aquí el cuerpo y el cerebro por fin trabajan en equipo. El robot detecta, la IA decide, los motores actúan. Ese ciclo corre cientos de veces por segundo." },
      ] },
      { title: "Inténtalo", blocks: [
        { type: "paragraph", text: "Mira a tu alrededor donde estés ahorita. Encuentra algo que sea un robot. Encuentra algo que use IA. Encuentra algo que sea solo una computadora haciendo cosas de computadora." },
        { type: "list", items: [
          "Una calculadora es una herramienta informática, no IA.",
          "Una aspiradora robótica es un robot, y de los sencillos.",
          "Un asistente de voz es IA sin cuerpo.",
          "Una impresora es una máquina con partes móviles, pero nadie de verdad le llama robot.",
        ] },
        { type: "paragraph", text: "Acomodar cosas en esas cajas es exactamente cómo piensan los ingenieros sobre la tecnología, y se vuelve fácil rapidísimo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Un robot y una IA son dos cosas distintas. Uno es una máquina que se mueve por el mundo físico. La otra es software que encuentra patrones y toma decisiones. Júntalos y consigues algo impresionante. Por separado, cada uno sigue siendo útil." },
        { type: "callout", accent: "teal", text: "La próxima vez que alguien presuma un «robot inteligente», hazle la pregunta de tres partes: ¿cuál parte es el robot, cuál es la IA y qué sensores lo están alimentando?" },
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
        { type: "paragraph", text: "Intenta caminar por el pasillo de tu escuela con los ojos cerrados. Aguantas cuatro o cinco pasos antes de rozar una pared, un pupitre o la mochila de alguien. Moverte por el espacio sin lastimarte resulta requerir un flujo constante de pistas." },
        { type: "paragraph", text: "Los robots están atorados con el mismo problema, solo que empiezan sin nada. Un robot no sabe dónde está. Lo tiene que deducir con sensores, cámaras, conteo de ruedas, mapas y muchas matemáticas. Junta pistas, haz tu mejor estimación, muévete y vuelve a revisar la estimación." },
      ] },
      { title: "Los Robots También Necesitan Sentidos", blocks: [
        { type: "paragraph", text: "Tú tienes vista, oído, tacto y equilibrio. Un robot tiene sensores, y cada uno detecta exactamente un tipo de cosa. Unos miden distancia, otros cachan objetos, otros siguen la velocidad, otros descubren hacia dónde apunta qué." },
        { type: "list", items: [
          "Cámaras: para ver paredes, caminos, personas, señales u obstáculos",
          "Ruedas: para medir cuánto ha viajado el robot",
          "GPS: para estimar la ubicación en exteriores",
          "Lidar: para escanear el área con luz láser",
          "Sensores ultrasónicos: para rebotar ondas de sonido en los objetos",
          "Giroscopios: para detectar giros o inclinaciones",
        ] },
        { type: "paragraph", text: "Ningún sensor solo cuenta la historia completa. La cámara detecta una puerta. El contador de ruedas dice que avanzaste metro y medio. El sensor de distancia insiste en que hay una pared justo ahí. Apílalos y empieza a aparecer una posición." },
      ] },
      { title: "Contar los Giros de las Ruedas", blocks: [
        { type: "paragraph", text: "El truco más simple del libro es contar vueltas de rueda. Sal de la puerta del salón, cuenta tres metros de giros, y puedes afirmar que estás a tres metros de la puerta. Los ingenieros le llaman odometría. Tú haces exactamente lo mismo cuando cuentas tus pasos en la oscuridad." },
        { type: "callout", accent: "green", text: "¿Pero qué pasa si una rueda patina en un piso resbaloso? ¿Y si el suelo se inclina? Un error de un centímetro se vuelve un error de medio metro después de suficientes vueltas. Ese desvío es exactamente por qué un robot nunca confía en un solo sensor." },
      ] },
      { title: "Usar Cámaras Como Ojos", blocks: [
        { type: "paragraph", text: "Las cámaras dejan que un robot vea alrededor. Una aspiradora distingue patas de sillas y zócalos. Un auto autónomo lee líneas de carril y semáforos. Un rover de Marte estudia rocas y esquiva terreno que se tragaría una rueda." },
        { type: "paragraph", text: "Pero una cámara no ve como tú ves. Tú miras una silla y simplemente sabes. Un robot recibe una cuadrícula de pixeles de colores y tiene que deducir bordes, formas, sombras y patrones antes de poder llamarle silla. Luego cambia la luz. Luego algo se le pone enfrente. Luego alguien la voltea y la silueta es otra. Cada uno de esos casos hay que entrenarlo." },
      ] },
      { title: "Construir un Mapa", blocks: [
        { type: "paragraph", text: "Los robots buenos van dibujando mientras avanzan. Una aspiradora arranca en un cuarto desconocido y poco a poco descubre dónde están las paredes, dónde está el sillón y qué caminos se quedan libres. Con ese mapa deja de rebotar como pinball y empieza a limpiar en líneas eficientes." },
        { type: "paragraph", text: "Tú haces exactamente lo mismo en un edificio nuevo. El día uno andas perdido. Para el día tres ya sabes que las escaleras están junto a la entrada, el gimnasio al fondo del pasillo, la biblioteca a la vuelta. Los robots construyen el mismo mapa mental, solo que con sensores y código en lugar de memoria." },
        { type: "callout", accent: "green", text: "La versión más difícil es hacer las dos cosas a la vez: dibujar el mapa mientras averiguas dónde estás dentro del mapa que todavía estás dibujando. Dos incógnitas, un problema, y uno de los grandes acertijos de la robótica." },
      ] },
      { title: "Por Qué los Robots Todavía Se Pierden", blocks: [
        { type: "paragraph", text: "Se pierden todo el tiempo. Una rueda patina. Un sensor escupe basura. Alguien mueve el sillón. Se va la luz. Una bolsa termina frente a la cámara. Dos pasillos se ven idénticos y el robot elige el equivocado." },
        { type: "paragraph", text: "Por eso un robot nunca hace una suposición y se casa con ella. Vuelve a revisar, una y otra vez, actualizando su estimación cada vez que llega información nueva. Que es exactamente lo que tú haces caminando por un museo, viendo letreros, revisando el mapa, mirando alrededor, corrigiendo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los robots encuentran su posición juntando pistas y combinándolas. Cámaras, conteo de ruedas, GPS, láseres, sensores de movimiento. Todo alimenta una sola estimación viva de dónde estoy y hacia dónde voy después." },
        { type: "callout", accent: "green", text: "La próxima vez que veas un robot cruzar un cuarto, ten en cuenta que no solo está rodando. Está detectando, estimando, verificando y corrigiendo, varias veces por segundo, todo el camino." },
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
        { type: "paragraph", text: "Doblar la ropa no es nada. Agarras una camisa, la sacudes, encuentras las mangas, doblas, listo. Probablemente estabas pensando en otra cosa todo el rato." },
        { type: "paragraph", text: "Para un robot, doblar la ropa es casi una pesadilla. Lo mismo con abrir una puerta, levantar un juguete del suelo, amarrar una agujeta o servir cereal sin aventarlo por toda la barra. Estos son de los problemas sin resolver más duros de la robótica." },
        { type: "paragraph", text: "Lo cual es raro, porque los robots construyen autos, manejan en Marte y avientan piezas que aplastarían a una persona. Entonces, ¿cómo los derrota un calcetín? Porque el mundo real no se queda quieto ni conserva su forma." },
      ] },
      { title: "Los Humanos Son Mejores de lo que Creemos", blocks: [
        { type: "paragraph", text: "Tu cuerpo hace cosas ridículas todo el tiempo y nunca las presume. Alcanzas un lápiz y al instante sabes dónde está, más o menos cuánto pesa, qué tan fuerte apretar y cómo acomodar los dedos, aunque esté de lado, medio debajo de un cuaderno y colgando del borde del escritorio." },
        { type: "paragraph", text: "Un robot tiene que moler cada uno de esos pasos. Ver el lápiz. Deducir que el lápiz es un objeto separado de la mesa en la que está. Elegir dónde agarrarlo. Planear una ruta del brazo que no tire la botella de agua. Apretar lo suficiente para levantarlo y no tanto como para tronarlo. Eso son cinco problemas duros para un solo lápiz." },
        { type: "callout", accent: "green", text: "Tú lo haces ver sin esfuerzo porque llevas años cableando ojos, manos, músculos y cerebro juntos. Un robot empieza ese entrenamiento desde cero." },
      ] },
      { title: "Las Cosas Suaves Son Difíciles", blocks: [
        { type: "paragraph", text: "Cualquier cosa flexible es el peor día de un robot. Una camisa se niega a tener una sola forma. Se dobla, se amontona, se tuerce y colapsa en un bulto que no se parece en nada a una camisa. Una toalla se dobla sobre sí misma. Un calcetín se esconde dentro de otro calcetín como si lo hiciera a propósito." },
        { type: "paragraph", text: "Los objetos rígidos son mucho más amables. Un bloque de metal sigue siendo un bloque. Una caja de plástico tiene bordes que puedes encontrar. Una taza se ve como taza. La tela cambia de forma cada vez que se mueve, así que un robot no puede solo memorizar cómo se ve una camisa. Tiene que entender cómo se comporta la tela, y ese es un problema genuinamente brutal." },
      ] },
      { title: "Abrir Puertas No Es Tan Simple", blocks: [
        { type: "paragraph", text: "Cuenta las puertas que has abierto esta semana. Perillas redondas, manijas de palanca, correderas, barras de empuje, jaladeras, puertas contra incendios pesadísimas, mosquiteros que se azotan detrás de ti. Todas distintas." },
        { type: "paragraph", text: "Tú llegas y simplemente sabes qué hacer. Un robot tiene que localizar la manija, deducir hacia dónde se mueve, alinear su pinza, aplicar la fuerza correcta y dar un paso atrás o adelante mientras jala o empuja. Empuja cuando debía jalar y falla. Agarra con un ángulo ligeramente equivocado y falla. Dos segundos de tu vida son el proyecto de investigación de alguien más." },
      ] },
      { title: "El Mundo No Se Queda Quieto", blocks: [
        { type: "paragraph", text: "Los robots de fábrica son increíbles repitiendo porque su mundo nunca cambia. La pieza aparece en el mismo lugar en el mismo segundo cada vez. El brazo corre el mismo movimiento. Nada sorprende a nadie." },
        { type: "paragraph", text: "Tu casa es lo opuesto a una fábrica. La mochila está en el piso hoy y en la silla mañana. El juguete está de cabeza. El perro se movió. Si tu lápiz rueda debajo de una silla, te agachas, empujas la silla, rodeas una bolsa y lo agarras sin tomar una sola decisión consciente. Ese tipo de improvisación sigue siendo uno de los muros más grandes de la robótica." },
      ] },
      { title: "Recoger Cosas Requiere Juicio", blocks: [
        { type: "paragraph", text: "Ajustas tu agarre automáticamente y nunca lo has pensado. Un huevo recibe una mano completamente distinta que un martillo. Un vaso de papel recibe dedos distintos que una pelota de béisbol. Distinta presión, distintos puntos de contacto, distinto todo." },
        { type: "paragraph", text: "Un robot tiene que acertarle a propósito. Muy suave y el objeto se cae. Muy fuerte y se truena. Agárralo del lado equivocado y se le tuerce en la pinza. Y se pone peor cuando el objeto es brillante, transparente, blando, diminuto, pesado, de forma rara o ya se está moviendo. Por eso las pinzas son de los campos más grandes de toda la industria." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los robots son extraordinarios. El mundo en el que tienen que operar es extraordinariamente desordenado. Lo que a ti se te hace fácil se te hace fácil porque eres absurdamente bueno detectando, equilibrando, tocando, ajustando y aprendiendo de cada error que has cometido." },
        { type: "callout", accent: "green", text: "Así que la próxima vez que dobles una camisa, abras una puerta o saques algo de una bolsa, date un segundo de crédito. Los ingenieros todavía están tratando de alcanzar a tus manos." },
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
        { type: "paragraph", text: "Examen rápido. Tostadora: ¿robot? ¿Auto de control remoto? ¿Máquina expendedora? ¿Bocina inteligente? ¿Aspiradora robótica? La mayoría de la gente contesta esas cinco distinto, lo cual te dice que la palabra anda muy suelta." },
        { type: "paragraph", text: "Aquí está la línea real. Un robot detecta el mundo, decide algo y actúa en consecuencia. Eso significa que casi todos tienen tres partes: sensores, un controlador y actuadores. O dicho llanamente: nota, piensa, se mueve." },
      ] },
      { title: "Parte 1: Los Sensores Ayudan a los Robots a Notar", blocks: [
        { type: "paragraph", text: "Un robot no puede reaccionar a un mundo que no puede detectar, así que primero necesita sensores. Cada uno capta un tipo de señal:" },
        { type: "list", items: ["Luz", "Distancia", "Sonido", "Tacto", "Temperatura", "Movimiento", "Dirección", "Color", "Presión"] },
        { type: "paragraph", text: "Una aspiradora robótica los usa para encontrar paredes, esquivar escalones y detectar suciedad. Un auto autónomo los usa para seguir caminos, señales, otros autos y personas. Un brazo de fábrica los usa para confirmar que la pieza sí está donde debería. Quítale los sensores y un robot es una persona intentando cruzar un cuarto sin vista, sin oído y sin tacto." },
      ] },
      { title: "Parte 2: Los Controladores Ayudan a los Robots a Decidir", blocks: [
        { type: "paragraph", text: "El controlador es donde ocurren las decisiones. No es exactamente un cerebro. Es más bien la parte que ejecuta las instrucciones, y esas instrucciones pueden ser casi risiblemente simples o muy avanzadas." },
        { type: "paragraph", text: "Un robot sigue una sola regla: si el sensor ve una pared, gira a la izquierda. Otro combina una cámara, un mapa que construyó solo y un programa de rutas para elegir el camino más seguro por un cuarto lleno de cosas. Los controladores van desde un chip del tamaño de una uña hasta un procesador serio. En cualquier caso, el trabajo es el mismo. Lee los sensores, elige qué pasa después." },
        { type: "callout", accent: "green", text: "Detectar. Decidir. Actuar. Ese ciclo de tres pasos corre una y otra vez, y quizá sea la idea más importante de toda la robótica." },
      ] },
      { title: "Parte 3: Los Actuadores Ayudan a los Robots a Moverse", blocks: [
        { type: "paragraph", text: "Los actuadores son las partes que de verdad hacen algo. Los motores son los más comunes. Giran ruedas, mueven brazos, giran engranes, abren pinzas, rotan articulaciones." },
        { type: "paragraph", text: "Un brazo de fábrica tiene un motor en cada articulación. Una mano robótica puede usar motores diminutos o jalar cables como tendones. Un dron tiene cuatro motores girando hélices solo para quedarse en el aire. Quítale los actuadores y tienes una máquina que detecta todo, decide todo y no hace absolutamente nada." },
      ] },
      { title: "¿Un Robot Tiene que Parecer una Persona?", blocks: [
        { type: "paragraph", text: "Para nada, y este es el mito que las películas nos sembraron a todos. No se requiere cara. No se requieren brazos, piernas ni ojos. La forma sigue al trabajo, siempre." },
        { type: "list", items: [
          "Una aspiradora pequeña", "Un rover", "Un brazo mecánico", "Un dron", "Un submarino", "Un carrito de entrega", "Una máquina dentro de una fábrica",
        ] },
        { type: "callout", accent: "green", text: "Todo buen diseño de robot empieza con una pregunta: ¿qué necesita hacer de verdad esta cosa? Contéstala y la forma, los sensores y el movimiento salen solos." },
      ] },
      { title: "¿Es un Auto de Control Remoto un Robot?", blocks: [
        { type: "paragraph", text: "Normalmente no, y aquí está el porqué. Tú estás tomando cada decisión. Tú diriges, él gira. Eso es una máquina obedeciéndote. Pero ponle un sensor a ese mismo auto y deja que esquive un obstáculo por su cuenta, y acaba de cruzar la línea. La toma de decisiones es la línea. Una máquina que solo sigue órdenes es una máquina. Un robot decide al menos un poco por sí mismo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Un robot no es solo una máquina que se mueve. Junta información con sensores, procesa instrucciones con un controlador y actúa mediante actuadores. No se requiere cara humana ni voz. Debajo de todo, un solo ciclo:" },
        { type: "callout", accent: "green", text: "Detectar. Decidir. Actuar. Todo lo demás en robótica es una variación de esas tres palabras." },
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
        { type: "paragraph", text: "Justo ahora, mientras lees esto, hay robots rodando por Marte. Cruzan la superficie de otro planeta, estudian rocas, toman fotos y mandan todo de vuelta. Nadie va al volante. No hay un astronauta cerca con un control. No hay nadie en ese planeta, punto." },
        { type: "paragraph", text: "Entonces, ¿cómo maneja solo un rover? Se reduce a distancia, cámaras, ruedas, planeación cuidadosa y una cantidad de paciencia casi irracional." },
      ] },
      { title: "Marte Está Muy Lejos", blocks: [
        { type: "paragraph", text: "Marte está a millones de kilómetros, y las señales de radio, por rápidas que sean, tardan tiempo real en cruzar ese hueco. Según dónde estén ambos planetas en sus órbitas, un mensaje puede tardar varios minutos en cada dirección." },
        { type: "paragraph", text: "Así que nadie está manejando esto como videojuego. Imagina el rover rodando hacia una roca que no debería tocar. Un ingeniero en la Tierra ni siquiera va a ver el problema durante diez minutos, y el comando de alto tarda otros diez en regresar. Para entonces el rover lleva veinte minutos atascado." },
      ] },
      { title: "El Rover Recibe Instrucciones", blocks: [
        { type: "paragraph", text: "Un rover no despierta y elige una dirección. De vuelta en la Tierra, equipos revisan las imágenes y datos que mandó durante la noche, estudian el paisaje y eligen objetivos que valgan el viaje. Una roca interesante. Un parche de suelo. Una cresta. Una ruta que no se coma una rueda." },
        { type: "paragraph", text: "Después le suben un plan: maneja a este punto, fotografía aquello, perfora aquí, corre este instrumento. Pero por el retraso, el plan no puede cubrirlo todo. El rover tiene que poder manejar sorpresas solo." },
      ] },
      { title: "Las Cámaras Son los Ojos del Rover", blocks: [
        { type: "paragraph", text: "Los rovers están cubiertos de cámaras y cada juego tiene su trabajo. Unas miran adelante para planear los próximos metros. Otras vigilan el suelo justo bajo las ruedas. Otras toman panorámicas amplias. Y otras hacen acercamientos para que los científicos estudien una roca sin tocarla nunca." },
        { type: "paragraph", text: "Esas imágenes también son cómo detecta problemas: una piedra grande, una pendiente fuerte, un hoyo, arena en la que se podría hundir. Marte no es un estacionamiento. Es polvo, piedras, crestas y cráteres, y un rover atascado se queda atascado para siempre." },
      ] },
      { title: "Ruedas Diseñadas para Otro Planeta", blocks: [
        { type: "paragraph", text: "Las ruedas de un rover están hechas para terreno que nadie ha probado en persona. Tienen que trepar rocas, sacudirse el polvo, cargar todo el rover y sobrevivir un frío brutal sin ningún mantenimiento, nunca." },
        { type: "paragraph", text: "¿Se poncha tu bici? Alguien la parcha. ¿Se agrieta una rueda en Marte? Ingenieros en otro planeta rediseñan cómo maneja el rover para trabajar alrededor del daño. Exactamente por eso los rovers se mueven tan lento y con tanto cuidado. Nadie está buscando un récord de velocidad. Están buscando seguir explorando." },
      ] },
      { title: "El Rover Puede Evitar Algunos Problemas", blocks: [
        { type: "paragraph", text: "Los rovers corren navegación autónoma, o sea que manejan parte del recorrido ellos mismos. La Tierra dice ve hacia ese punto. En el camino, el rover revisa su propia cámara. Si detecta una roca fea o una pendiente que no le gusta, la rodea o simplemente se detiene y espera." },
        { type: "callout", accent: "green", text: "Nada de eso es pensar. Es código haciendo una lista corta de preguntas una y otra vez. ¿Está libre el camino? ¿Eso es un obstáculo? ¿Le puedo dar la vuelta? ¿Me detengo y llamo a casa?" },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Un rover de Marte maneja sin conductor combinando instrucciones desde la Tierra, cámaras que leen el terreno, ruedas hechas para un planeta hostil y software que sabe cuándo frenar. No se puede manejar en vivo porque el universo es demasiado grande para eso." },
        { type: "paragraph", text: "Cada giro lento de esas ruedas es parte de algo más grande: explorar un lugar donde ningún humano ha puesto un pie." },
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
        { type: "paragraph", text: "Detente y mírate la mano. Ábrela. Ciérrala. Toca el pulgar con cada yema en orden. Levanta un lápiz, golpetea la mesa, y luego sostén algo como si se pudiera romper. Acabas de ejecutar movimientos que laboratorios enteros siguen intentando copiar." },
        { type: "paragraph", text: "Las manos son de lo más difícil en toda la ingeniería. Las manos robóticas se ven impresionantes en video, y lograr que de verdad funcionen como la tuya es brutalmente difícil. Una mano no es una pinza. Es flexible, sensible, fuerte, delicada y está conectada directo a un cerebro muy bueno." },
      ] },
      { title: "Los Dedos Son Complicados", blocks: [
        { type: "paragraph", text: "Tu mano está repleta de partes móviles. Cada dedo tiene varias articulaciones. Tu pulgar se mueve en una dirección que los demás no pueden, que es exactamente por qué puedes pellizcar cualquier cosa. Tu muñeca rota, se dobla y se ajusta para darle a todo eso el ángulo correcto." },
        { type: "paragraph", text: "Para copiar eso, una mano robótica necesita articulaciones, motores, engranes, cables, materiales que se doblen bien y un sistema de control que coordine todo junto. Que un solo dedo se mueva suave ya es un proyecto. Que cinco cooperen es otro nivel completamente." },
      ] },
      { title: "La Fuerza de Agarre Es Complicada", blocks: [
        { type: "paragraph", text: "Tú nunca decides cuánto apretar. Simplemente pasa. Una papa frita recibe casi nada. La correa de una mochila cargada recibe un puño. Un lápiz cae a la mitad, y llegaste ahí sin un solo pensamiento." },
        { type: "paragraph", text: "Un robot lo tiene que calcular. Aprieta de más y aplasta lo que agarró. Aprieta de menos y se le resbala. Agárralo del lado equivocado y se le zafa a medio camino. Y cada objeto es un problema distinto, porque un vaso liso, una pelota de tenis peluda, una esponja mojada y una cuchara de metal se comportan diferente en la misma pinza." },
      ] },
      { title: "El Tacto Importa", blocks: [
        { type: "paragraph", text: "Tu mano está tapizada de sensores. Presión, textura, temperatura, deslizamiento, dolor. Cuando un vaso empieza a resbalarse, lo sientes y aprietas antes de haberte dado cuenta conscientemente de que algo estaba pasando." },
        { type: "paragraph", text: "Las manos robóticas también necesitan esa retroalimentación, y fingir el tacto humano es extremadamente difícil. El robot necesita saber si está tocando el objeto, qué tan fuerte está presionando, si la cosa se está deslizando, si es blanda o rígida y si está a punto de partirla en dos. Sin eso, la mano está adivinando. Adivinar significa cosas caídas y rotas." },
      ] },
      { title: "Las Manos Humanas Son Buenas con Objetos Raros", blocks: [
        { type: "paragraph", text: "Piensa en el rango. Una moneda, un sándwich, una botella de agua, una agujeta, un balón de basquetbol, una bola de papel arrugado. Ninguno se parece a los otros. Unos son diminutos, otros enormes, unos resbalosos, y algunos literalmente cambian de forma en cuanto los tocas. Tu mano se encarga de todos sin quejarse." },
        { type: "paragraph", text: "Las manos robóticas aman lo predecible. Dale a una un solo tipo de pieza que levantar en una fábrica y lo va a hacer mejor que cualquier humano, para siempre. ¿Pero una mano que pueda agarrar casi cualquier cosa que le pases? Ese sigue siendo un problema abierto." },
      ] },
      { title: "Las Manos Robóticas No Siempre Necesitan Parecer Humanas", blocks: [
        { type: "paragraph", text: "Y aquí el giro: la mejor mano robótica muchas veces no se parece nada a una mano. Algunas son pinzas de dos dedos. Otras son ventosas. Otras son tentáculos de goma suave que se enrollan alrededor de lo que tocan. Algunas son solo un imán, porque las piezas son de acero y un imán funciona perfecto." },
        { type: "callout", accent: "green", text: "Los ingenieros escogen el diseño según el trabajo, no según la anatomía. Una mano robótica debe encajar con el problema que enfrenta, no con la forma de lo que traes al final del brazo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Las manos robóticas son difíciles porque agarrar es difícil. Una útil necesita movimiento, fuerza, delicadeza, tacto, control preciso y la capacidad de lidiar con objetos flojos, resbalosos, diminutos o con forma de nada en particular." },
        { type: "paragraph", text: "Tus manos son tan buenas en esto que dejaste de notarlo por completo. Cada agujeta que amarras, cada bolsa que abres de un jalón, cada pelota que atrapas en el aire es un movimiento que los ingenieros siguen persiguiendo. Eso es lo que hace este uno de los problemas más interesantes de la robótica." },
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
        { type: "paragraph", text: "Un auto son miles de piezas fingiendo ser un solo objeto. Puertas, asientos, ruedas, vidrios, kilómetros de cable, luces, un motor y una enorme cantidad de piezas que nunca vas a ver a menos que algo salga mal. Armar todo eso es un trabajo gigantesco." },
        { type: "paragraph", text: "Así que las fábricas modernas le entregan la velocidad, la fuerza, la precisión y la repetición a los robots. Casi ninguno se parece a una persona. La mayoría parecen brazos mecánicos enormes atornillados al piso, moviéndose con una exactitud medio inquietante." },
      ] },
      { title: "Los Robots de Fábrica Son Excelentes en la Repetición", blocks: [
        { type: "paragraph", text: "Hacer lo mismo a la perfección, una y otra vez, es el único trabajo en el que los robots de verdad nos ganan. Construir autos está lleno de exactamente eso. La misma pieza, colocada igual, soldada en el mismo punto, miles de veces. Un brazo robótico le pega a esa marca siempre. No se aburre, no se distrae un viernes, no olvida el paso cuatro." },
        { type: "callout", accent: "green", text: "Si una soldadura va en un punto exacto de cada chasis, el robot la pone ahí. El auto uno y el auto nueve mil salen idénticos." },
      ] },
      { title: "Soldar el Cuerpo del Auto", blocks: [
        { type: "paragraph", text: "La soldadura es la grande. Usa calor para fundir piezas de metal en una sola estructura, y la carrocería de un auto tiene que ser lo bastante fuerte para proteger gente en un choque. Los brazos soldadores se mueven rápido, aciertan las mismas coordenadas cada vez y alcanzan rincones donde una persona tendría que contorsionarse." },
        { type: "paragraph", text: "Nada de eso corre solo. Ingenieros, técnicos y trabajadores diseñan los sistemas, los programan, los vigilan, los reparan e inspeccionan los resultados. El robot hace el movimiento repetido. Los humanos son dueños del proceso." },
      ] },
      { title: "Pintar con Precisión", blocks: [
        { type: "paragraph", text: "Pintar suena fácil hasta que lo intentas. Demasiada pintura y escurre. Muy poca y la cobertura queda delgada y débil. La capa tiene que quedar pareja en un cofre curvo, un techo plano y una puerta con un doblez. Los robots lo hacen porque pueden barrer la pistola con el mismo patrón controlado a la misma distancia cada vez, y tu brazo no puede." },
      ] },
      { title: "Mover Piezas Pesadas", blocks: [
        { type: "paragraph", text: "Las piezas de auto se ponen pesadas rápido. Los robots las levantan, las cargan y las posicionan sin esfuerzo. Un brazo columpia una puerta a su lugar. Otro sistema corre piezas por la línea. Cargar algo pesado e incómodo cuatrocientas veces por turno destroza cuerpos humanos, así que aquí el robot está protegiendo gente, no reemplazándola." },
      ] },
      { title: "Seguridad y Programación", blocks: [
        { type: "paragraph", text: "Estas máquinas son fuertes y rápidas, lo que convierte la seguridad en un problema de ingeniería por sí solo. Casi todos los robots industriales viven dentro de zonas cercadas con sensores y luces de advertencia, y el brazo se apaga en el instante en que una persona cruza la línea. Las máquinas nuevas llamadas cobots, o robots colaborativos, traen sistemas de seguridad extra para poder trabajar justo al lado de la gente." },
        { type: "paragraph", text: "Y ningún robot llega sabiendo construir un auto. Alguien programa cada movimiento: a dónde ir, qué tan rápido, cuándo disparar la herramienta, cuánta fuerza aplicar y qué hacer en el momento en que algo sale mal. El piso de una fábrica son robots, bandas, cámaras, herramientas y personas coreografiados en un proceso larguísimo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los robots de fábrica sueldan, pintan, cargan piezas y repiten movimientos precisos hasta que termina el turno. No tienen forma humana porque nunca fue la intención. Un robot soldador y uno pintor se ven completamente distintos porque están resolviendo problemas completamente distintos." },
        { type: "callout", accent: "green", text: "Esa es la verdadera lección de una fábrica de autos. No diseñas un robot para que se vea genial. Lo diseñas para matar un problema específico. Haz eso unos cientos de veces y miles de piezas sueltas se convierten en algo que sale manejando." },
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
        { type: "paragraph", text: "Mira hacia arriba a las dos de la tarde y el cielo está azul. Mira otra vez tres horas después y ese mismo cielo está ardiendo en naranja, rojo y rosa." },
        { type: "paragraph", text: "Nada se cambió. Mismo sol, mismo aire, tú parado en el mismo patio. Lo único distinto es la ruta que toma la luz solar para llegar a tus ojos, y resulta que eso lo cambia todo." },
      ] },
      { title: "La Luz Solar No Es de Un Solo Color", blocks: [
        { type: "paragraph", text: "La luz del sol se ve blanca, pero es un color mentiroso. En realidad son todos los colores a la vez, apretados en un solo rayo. Un arcoíris que todavía no ha sido desempacado." },
        { type: "paragraph", text: "Rojo, naranja, amarillo, verde, azul, índigo, violeta. Cada uno viaja como onda, y las ondas no son del mismo tamaño. El rojo y el naranja tienen ondas largas y perezosas. El azul y el violeta las tienen cortas y apretadas. Esa diferencia de tamaño es toda la razón por la que el cielo hace lo que hace." },
      ] },
      { title: "El Aire No Está Vacío", blocks: [
        { type: "paragraph", text: "El cielo parece que no hay nada allá arriba. En realidad está lleno de moléculas, demasiado chicas para verlas, y la luz solar está chocando contra ellas sin parar en todo el camino hacia abajo." },
        { type: "paragraph", text: "Cuando la luz golpea una de esas moléculas, parte se dispersa, lo que solo significa que rebota en una nueva dirección en vez de seguir derecho. Y aquí está la clave: las ondas cortas se dispersan mucho más fácil que las largas. El azul rebota. El rojo mayormente sigue de largo." },
        { type: "paragraph", text: "Así que durante el día, la luz azul se avienta por toda la atmósfera y luego llega a tus ojos desde todas las direcciones al mismo tiempo. Cuando ves cielo vacío no estás viendo el sol. Estás viendo luz azul dispersa llegando de todos lados." },
      ] },
      { title: "¿Por Qué el Cielo No Es Púrpura?", blocks: [
        { type: "paragraph", text: "Excelente pregunta, porque el violeta se dispersa todavía más que el azul. Tres cosas se le juntan en contra. El sol emite menos violeta de entrada, parte se absorbe alto en la atmósfera, y tus ojos son simplemente mucho más sensibles al azul que al violeta." },
        { type: "paragraph", text: "El violeta está allá arriba haciendo su parte. El azul nada más gana la votación." },
      ] },
      { title: "¿Qué Cambia al Atardecer?", blocks: [
        { type: "paragraph", text: "Al atardecer el sol baja, así que su luz ya no te llega en línea recta desde arriba. Llega de lado, lo que significa que tiene que atravesar un tramo muchísimo más largo de atmósfera para alcanzarte." },
        { type: "paragraph", text: "Imagina una linterna apuntando hacia abajo a través de un vaso de agua contra la misma linterna apuntando de lado a lo largo. Mucho más material que cruzar. En ese camino largo, casi todo el azul se dispersa hacia otro lado antes de llegarte. Lo que sobrevive el viaje es rojo, naranja y amarillo, que es exactamente lo que ves." },
      ] },
      { title: "¿Por Qué Algunos Atardeceres Son Más Coloridos?", blocks: [
        { type: "paragraph", text: "Hay atardeceres olvidables y hay atardeceres que hacen que todo el vecindario se detenga a sacar el celular. La diferencia normalmente es lo que anda flotando allá arriba. Polvo, gotas de agua, humo y contaminación cambian cómo rebota la luz." },
        { type: "paragraph", text: "Las nubes también funcionan como pantallas de proyección. Con el sol bajo, la luz roja y naranja pega en la parte de abajo de las nubes y las enciende. Por eso los mejores atardeceres aparecen justo después de una tormenta, cuando el aire está limpio y todavía quedan nubes rondando." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "El cielo es azul porque el azul se dispersa fácil y te llega desde todas las direcciones. Los atardeceres se ponen naranjas porque la luz en ángulo bajo cruza tanto aire que el azul se le arranca antes de llegar." },
        { type: "callout", accent: "orange", text: "Así que un cielo azul y un atardecer salvaje son la misma física en configuraciones distintas. Estás viendo la luz solar negociar con la atmósfera en tiempo real." },
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
        { type: "paragraph", text: "Conoces la sensación. El avión empieza a subir, tus oídos se llenan y todo se escucha amortiguado como si te hubieran metido algodón, y luego de la nada: pop." },
        { type: "paragraph", text: "Es incómodo y medio alarmante la primera vez. Tus oídos no tienen nada malo. Están resolviendo un problema de presión de la única forma que conocen." },
      ] },
      { title: "El Aire Tiene Presión", blocks: [
        { type: "paragraph", text: "El aire se siente como nada, pero hay una columna entera apilada encima de tu cabeza presionando sobre ti en este momento. Al nivel del mar esa columna es alta y pesada, así que la presión es alta. Sube y hay menos aire encima, así que la presión baja." },
        { type: "paragraph", text: "Un avión despegando te está llevando a aire más delgado. Aterrizar te regresa a aire denso. Las cabinas se presurizan para que nadie se desmaye, pero la presión adentro igual se mueve mientras subes y bajas. Tus oídos definitivamente lo notan." },
      ] },
      { title: "Tu Tímpano Siente la Diferencia", blocks: [
        { type: "paragraph", text: "Tu tímpano es una lámina delgada de tejido estirada a lo ancho de tu canal auditivo, y vibra cuando le pega el sonido. Así funciona escuchar. Ahora lo importante: hay aire de los dos lados. Aire exterior en el canal, y una bolsa sellada de aire detrás, en tu oído medio." },
        { type: "paragraph", text: "Todo se siente normal cuando esos dos lados están equilibrados. Pero cuando la presión de afuera cae rápido, el aire detrás de tu tímpano no ha alcanzado, así que empuja hacia afuera y lo estira. Ese estiramiento es la sensación tapada, llena y medio horrible." },
      ] },
      { title: "La Trompa de Eustaquio Ayuda a Resolverlo", blocks: [
        { type: "paragraph", text: "Tu cuerpo ya trae la solución instalada. Es un conducto angosto llamado trompa de Eustaquio que corre de tu oído medio hasta el fondo de tu garganta. Casi siempre está cerrado. Traga, bosteza o mastica y se abre por un segundo." },
        { type: "paragraph", text: "En ese segundo, el aire entra o sale y los dos lados se emparejan. Esa liberación es el pop. Tu cuerpo acaba de igualar la presión y tú lo sentiste pasar." },
      ] },
      { title: "Por Qué el Aterrizaje Puede Sentirse Peor que el Despegue", blocks: [
        { type: "paragraph", text: "El aterrizaje normalmente duele más, y hay una razón. De bajada, la presión de la cabina sube, así que ahora el exterior empuja más fuerte que el interior y tu oído medio tiene que jalar aire hacia adentro para alcanzarlo." },
        { type: "paragraph", text: "Si tus trompas de Eustaquio se ponen necias, tus tímpanos se hunden hacia adentro en vez de equilibrarse, y ese pellizco duele de verdad. También por eso volar con gripa es una tortura. Nariz y garganta tapadas significan que esos conductos casi no se abren." },
      ] },
      { title: "Por Qué Tragar o Bostezar Ayuda", blocks: [
        { type: "paragraph", text: "Tragar y bostezar mueven los músculos que están justo al lado de esos conductos, y eso es lo que los abre. Por eso masticar chicle, tomar agua a sorbos o forzar un bostezo durante el despegue y el aterrizaje funciona. Estás disparando a mano un sistema que tu cuerpo normalmente corre solo." },
        { type: "paragraph", text: "También por eso los bebés lloran en los aviones. Sienten la presión, no tienen idea de qué es y no la pueden arreglar a propósito. El llanto mueve su garganta y su boca, y les destapa los oídos de todos modos. Resolvieron el problema por accidente." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Tus oídos truenan porque la presión del aire cambia más rápido de lo que tu oído medio puede seguir. El tímpano se lleva la tensión y las trompas de Eustaquio la vuelven a emparejar." },
        { type: "callout", accent: "orange", text: "Ese pequeño pop es tu cuerpo corriendo un ajuste de presión. Sensación rara, ingeniería excelente." },
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
        { type: "paragraph", text: "Ve y toca la pata de una silla de metal, luego toca una mesa de madera en el mismo cuarto. El metal se siente frío. La madera casi se siente tibia. Ahora la parte que le rompe el cerebro a la gente: están a la misma temperatura. Las dos llevan todo el día en ese cuarto." },
        { type: "paragraph", text: "Entonces, ¿qué estás sintiendo de verdad? Temperatura no. Velocidad." },
      ] },
      { title: "Tu Mano Está Caliente", blocks: [
        { type: "paragraph", text: "Tú eres lo más caliente en casi cualquier cuarto al que entras. Tu piel anda por los 32 °C mientras el cuarto está más cerca de los 21 °C. Toca cualquier cosa más fría que tú y el calor empieza a salirse inmediatamente de tu mano hacia ese objeto." },
        { type: "paragraph", text: "Y aquí está el giro. Tus nervios no pueden medir la temperatura de un objeto. Solo pueden medir qué tan rápido se está escapando el calor de tu piel. Escape rápido, tu cerebro reporta frío. Escape lento, tu cerebro se encoge de hombros." },
      ] },
      { title: "El Metal Mueve el Calor Rápidamente", blocks: [
        { type: "paragraph", text: "El metal es un conductor térmico fantástico, o sea que el calor lo atraviesa casi sin resistencia. Tócalo y el calor de tu cuerpo no solo entra al metal, sino que sigue corriendo lejos del punto de contacto. Ese punto nunca se calienta, así que sigue saliendo calor de ti. Tu piel se enfría rápido y tu cerebro grita frío." },
        { type: "paragraph", text: "La madera es pésima conduciendo calor, y en este caso pésima es genial. El calor se arrastra hacia la madera y se queda casi todo justo debajo de tus dedos. Ese parche se calienta hasta igualar tu mano en segundos, y cuando iguala, el drenaje se detiene. Misma temperatura que el metal, experiencia completamente distinta." },
      ] },
      { title: "Misma Temperatura, Sensación Diferente", blocks: [
        { type: "paragraph", text: "Este es uno de los mejores trucos de ciencia cotidiana que existen: lo que algo se siente y a qué temperatura está son dos hechos separados. Una cuchara de metal y una de madera en el mismo cajón están a temperaturas idénticas. Agárralas una tras otra y vas a jurar que no." },
        { type: "callout", accent: "orange", text: "Tu sentido del tacto no es un termómetro. Es un detector de flujo de calor. Dos cosas a exactamente la misma temperatura se pueden sentir radicalmente distintas según qué tan rápido te sacan el calor." },
      ] },
      { title: "¿Por Qué Importa Esto en el Diseño?", blocks: [
        { type: "paragraph", text: "Los ingenieros usan esto constantemente. Una sartén de metal es genial precisamente porque el calor la atraviesa desde la hornilla hasta la comida. Por desgracia el calor también sube por el mango, y por eso casi toda sartén trae un agarre de plástico, goma o madera atornillado al final." },
        { type: "paragraph", text: "Un abrigo de invierno hace el trabajo opuesto. Atrapa aire, el aire es malísimo moviendo calor, y así el calor de tu cuerpo se queda contigo. Mientras tanto un tobogán de metal en julio se vuelve un peligro, porque el metal te mete calor con la misma eficiencia con la que te lo saca. Una banca de madera bajo el mismo sol está bien." },
      ] },
      { title: "¿Qué Pasa con el Clima Frío?", blocks: [
        { type: "paragraph", text: "Agarra un barandal de metal en enero y de verdad duele. No es porque el metal esté más frío que la madera junto a él. Es porque el metal te arranca el calor de la piel tan rápido que tus nervios lo registran como dolor. El metal no está más frío. Nada más es mejor robándote." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "El metal se siente más frío porque mueve el calor lejos de ti más rápido. La madera se siente más tibia porque no. Así que la próxima vez que digas que algo está frío, ten claro qué estás reportando de verdad: no una temperatura, sino qué tan rápido se está yendo el calor de tu mano." },
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
        { type: "paragraph", text: "En papel, una bicicleta no tiene por qué quedarse parada. Dos ruedas flaquitas, un cuadro angosto y una persona encima de todo eso. Intenta equilibrarte en una sin moverte y te vas al suelo en segundos. Empieza a rodar y de repente no cuesta nada." },
        { type: "paragraph", text: "Entonces, ¿qué cambia? No una cosa. Movimiento, dirección, geometría del cuadro y tu cerebro haciendo correcciones que nunca notas, todo apilado encima de todo." },
      ] },
      { title: "El Equilibrio Se Trata de Mantener el Centro Sobre las Ruedas", blocks: [
        { type: "paragraph", text: "Todo tiene un centro de masa, el punto único donde todo su peso se equilibra. Para que tú y la bici sigan arriba, ese punto combinado tiene que quedarse sobre la línea de las ruedas. Deja que se corra demasiado a un lado y la gravedad toma el control." },
        { type: "paragraph", text: "Parado quieto, casi no tienes cómo arreglar eso. Puedes jalonear el manubrio, aventar tu peso o poner un pie. Rodando, tienes una opción mucho mejor: dirigir las ruedas de vuelta debajo de ti." },
      ] },
      { title: "Las Bicicletas Dirigen Hacia la Inclinación", blocks: [
        { type: "paragraph", text: "Aquí está la parte genuinamente rara. Cuando la bici empieza a caerse hacia la izquierda, la rueda delantera gira a la izquierda. No hacia el lado contrario de la caída, hacia adentro de la caída. Y eso mete toda la bici de vuelta debajo de tu centro de masa, lo que te vuelve a parar." },
        { type: "paragraph", text: "Estás haciendo esto constantemente y no tienes idea. Cada segundo que ruedas, tus brazos están haciendo correcciones de dirección demasiado pequeñas para sentirlas. Tu cerebro, tus brazos y la bici están corriendo un ciclo de equilibrio juntos, y nada de eso llega a tu mente consciente." },
      ] },
      { title: "Las Ruedas También Ayudan", blocks: [
        { type: "paragraph", text: "Las ruedas girando tienen momento angular, o sea que se resisten a cambiar de dirección. Eso le da algo de estabilidad extra a una bici en movimiento. Pero no es lo principal. Han construido bicicletas que cancelan por completo el efecto giroscópico y siguen equilibrándose. La geometría del cuadro está haciendo más trabajo que las ruedas." },
      ] },
      { title: "El Diseño de la Bicicleta Hace el Equilibrio Más Fácil", blocks: [
        { type: "paragraph", text: "Mira la horquilla delantera de cualquier bici. Está inclinada hacia adelante, no derecha hacia arriba y abajo. Ese ángulo crea algo llamado avance, y el avance es lo que hace que la rueda delantera quiera alinearse con hacia donde va la bici. Es la misma razón por la que la rueda de un carrito de súper se voltea sola para seguirte." },
        { type: "paragraph", text: "Los ingenieros se obsesionan con esto. Muévele un par de grados al ángulo de la horquilla o cámbiale el tamaño de rueda y la misma bici pasa de estable y calmada a nerviosa y respingona." },
      ] },
      { title: "¿Por Qué Es Más Difícil Andar Despacio?", blocks: [
        { type: "paragraph", text: "Ir despacio te quita opciones. Menos velocidad significa que dirigir hace menos, así que cada inclinación tarda más en corregirse y cada bamboleo crece antes de que lo puedas atrapar. Por eso ir en línea recta a paso de caminata es genuinamente difícil, y por eso un principiante nervioso de repente se siente firme en cuanto pedalea un poco más fuerte." },
      ] },
      { title: "¿Por Qué Una Bicicleta No Puede Quedarse Parada Sola?", blocks: [
        { type: "paragraph", text: "Porque una bici estacionada no puede dirigirse de regreso debajo de nada. Empieza a inclinarse, la gravedad jala más fuerte, y no hay movimiento disponible para correr las ruedas de lado y rescatarla. Sin pata, pared, pie o rueditas de entrenamiento, se va al suelo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Una bici en movimiento se queda arriba porque la dirección, el impulso, las ruedas girando, la geometría del cuadro y tus propias correcciones diminutas están todos trabajando el problema al mismo tiempo." },
        { type: "callout", accent: "orange", text: "Tú no te estás equilibrando sobre una bicicleta. Te estás cayendo un poquito en todas direcciones y atrapándote a ti mismo, cientos de veces por minuto, sin notarlo nunca. Eso es andar en bici de verdad." },
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
        { type: "paragraph", text: "Banqueta: ningún problema. Hielo: traición total. Un segundo vas caminando normal, al siguiente tu pie se fue sin ti, tus brazos están haciendo algo desesperado y estás negociando con la física." },
        { type: "paragraph", text: "Entonces, ¿qué hace al hielo tanto peor que todo lo demás? Se reduce a fricción, a la superficie misma, a la temperatura y a lo que pasa en el hueco delgadísimo entre tu zapato y el suelo." },
      ] },
      { title: "La Fricción Te Ayuda a Caminar", blocks: [
        { type: "paragraph", text: "La fricción es la fuerza que pelea contra el deslizamiento, y caminar funciona completamente con ella. En cada paso empujas hacia atrás contra el suelo y la fricción te empuja hacia adelante. Sin fricción no hay empujón, no hay caminata. Tu pie nada más se va." },
        { type: "paragraph", text: "El pavimento seco es rugoso a una escala que no puedes ver, y toda esa rugosidad le da a tu suela dónde morder. El hielo es liso a esa misma escala, así que no hay nada que morder." },
      ] },
      { title: "El Hielo Tiene una Superficie Resbaladiza", blocks: [
        { type: "paragraph", text: "El hielo parece un bloque sólido, pero la mera superficie se comporta raro. En muchas condiciones hay una película increíblemente delgada de agua encima, y esa película es la que convierte lo malo en catastrófico." },
        { type: "paragraph", text: "Así que tu zapato no está agarrando suelo sólido. Está deslizándose sobre hielo liso encima de una capa microscópica de agua haciendo exactamente el trabajo que hace el aceite dentro de un motor. La naturaleza te está lubricando a propósito." },
      ] },
      { title: "La Temperatura Importa", blocks: [
        { type: "paragraph", text: "No todo el hielo te quiere tumbar por igual. El hielo cerca de su punto de fusión es el peor, porque esa capa acuosa se forma con facilidad. El hielo muy frío, el que rechina bajo tus pies, en realidad puede resbalar menos, porque hay menos líquido arriba." },
        { type: "paragraph", text: "No lo leas como seguro. El hielo frío también te va a tumbar. La temperatura nada más cambia cómo lo hace." },
      ] },
      { title: "Los Zapatos También Importan", blocks: [
        { type: "paragraph", text: "Tus zapatos son la mitad de la ecuación. Una suela plana y gastada no tiene con qué trabajar. Un dibujo profundo se clava en la nieve y en superficies irregulares y te compra agarre, que es exactamente por qué las botas de invierno traen patrones agresivos moldeados abajo. Pero sé honesto contigo mismo: en hielo verdaderamente liso, hasta las buenas botas pierden. Sencillamente no hay nada de dónde agarrarse." },
      ] },
      { title: "¿Por Qué Nos Deslizamos Tan Rápido?", blocks: [
        { type: "paragraph", text: "Poca fricción significa que casi nada detiene tu pie una vez que arranca. En el pavimento, un resbalón chico lo mata la fricción en dos o tres centímetros. En el hielo, el resbalón sigue y sigue, y una pérdida diminuta de equilibrio se convierte en un viaje completo no planeado." },
      ] },
      { title: "El Hielo Es un Desafío de Diseño", blocks: [
        { type: "paragraph", text: "Hay profesiones enteras peleando contra esto. Cuadrillas de carreteras, planificadores urbanos, ingenieros de llantas, diseñadores de botas, gente que construye superficies deportivas. La sal derrite el hielo. La arena le avienta rugosidad encima. Las llantas tallan canales para sacar agua y aguanieve del punto de contacto. Herramientas distintas, un solo objetivo: recuperar algo de agarre." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Te resbalas en el hielo porque el hielo casi no tiene fricción. Su superficie lisa, esa película de agua, la temperatura y lo que traigas en los pies deciden cuánto agarre te toca." },
        { type: "callout", accent: "orange", text: "Caminar es un truco de fricción que llevas haciendo desde que tenías un año. El hielo es la única superficie que se niega a cumplir su parte del trato." },
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
        { type: "paragraph", text: "Ponte unos buenos audífonos con cancelación de ruido en una cabina de avión rugiendo y aprieta el botón. El ruido del motor no se desvanece. Desaparece, de golpe, como si alguien hubiera desconectado el mundo. La primera vez que pasa es genuinamente inquietante." },
        { type: "paragraph", text: "Eso no es el acolchado grueso haciendo el trabajo. Esos audífonos están peleando contra el sonido con más sonido, y funciona por cómo se comportan las ondas." },
      ] },
      { title: "El Sonido Es una Onda", blocks: [
        { type: "paragraph", text: "El sonido es aire siendo empujado de un lado a otro. Alguien habla, sus cuerdas vocales vibran, y esas vibraciones empujan y jalan el aire hasta formar ondas que cruzan el cuarto y sacuden tus tímpanos." },
        { type: "paragraph", text: "Cada onda de sonido tiene crestas y valles, como una línea ondulada moviéndose por el aire. Los sonidos fuertes tienen ondas altas. Los suaves las tienen chicas." },
      ] },
      { title: "Las Ondas Opuestas Pueden Cancelarse", blocks: [
        { type: "paragraph", text: "Ahora la parte que hace posible todo esto. Dos ondas se pueden sumar y hacerse más fuertes, pero también se pueden pelear. Si una empuja el aire hacia adelante en el instante exacto en que la otra lo jala hacia atrás, se cancelan mutuamente. Cresta contra valle y no queda nada." },
        { type: "paragraph", text: "Ese es todo el truco. Los audífonos generan una onda que es el espejo perfecto del ruido que viene hacia ti. Las dos chocan junto a tu oído y se borran casi por completo. Los científicos le llaman interferencia destructiva." },
      ] },
      { title: "Los Audífonos Primero Escuchan", blocks: [
        { type: "paragraph", text: "Antes de cancelar nada, tienen que oírlo. Micrófonos diminutos en el exterior de cada copa recogen lo que sea que haya a tu alrededor: el zumbido del motor, el traqueteo del tren, el aire acondicionado. La electrónica adentro analiza esa onda y construye su opuesta en una fracción de milisegundo. Después las mismas bocinas que tocan tu música tocan calladamente el anti-ruido." },
        { type: "paragraph", text: "Nunca escuchas ese anti-ruido como sonido. Solo escuchas el ruido original hacerse chiquito." },
      ] },
      { title: "Por Qué Funcionan Mejor con Sonidos Constantes", blocks: [
        { type: "paragraph", text: "Los sonidos constantes y zumbones son el blanco fácil. Motores de avión, ventiladores, aires acondicionados, el traqueteo de un tren. Se repiten, así que son fáciles de predecir, y predecir es casi toda la batalla." },
        { type: "paragraph", text: "Los sonidos repentinos son una pesadilla. Un perro ladrando, un aplauso, alguien gritando tu nombre. Para cuando el sistema lo analizó, el sonido ya llegó a tu oído. Así que los audífonos lo bajan un poco y dejan pasar el resto. Por eso el mundo se pone más tranquilo y nunca queda en silencio total." },
      ] },
      { title: "Cancelación de Ruido Pasiva vs. Activa", blocks: [
        { type: "paragraph", text: "Están pasando dos cosas distintas a la vez. La reducción pasiva es física: cojines gruesos sellando contra tu cabeza, bloqueando sonido a la antigua. La cancelación activa es el sistema de micrófono y onda opuesta. Los buenos audífonos hacen las dos, y esa combinación es lo que convierte una cabina de avión en una biblioteca." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los audífonos con cancelación de ruido escuchan el ruido a tu alrededor, construyen su opuesto exacto y lo tocan dentro de tu oído. Las dos ondas se encuentran, se cancelan, y un buen pedazo del ruido deja de existir." },
        { type: "callout", accent: "orange", text: "No son orejeras elegantes. Son ingenieros de sonido diminutos amarrados a tu cabeza, corriendo las matemáticas miles de veces por segundo." },
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
        { type: "paragraph", text: "Avienta una piedra a un lago y se acabó. Avienta una pelota de playa y regresa botando. Bien, tiene sentido. Ahora explícame el barco de carga de acero de 200,000 toneladas parado encima de la misma agua. El acero no flota. Excepto que aparentemente sí." },
        { type: "paragraph", text: "La palabra para lo que está pasando aquí es flotabilidad, y en cuanto te hace clic, el barco deja de ser raro." },
      ] },
      { title: "El Agua Empuja Hacia Arriba", blocks: [
        { type: "paragraph", text: "El agua no es algo pasivo donde avientas cosas. Empuja de vuelta. Mete cualquier cosa al agua y el agua la empuja hacia arriba, y ese empujón tiene nombre: fuerza de flotación. Mientras tanto la gravedad jala hacia abajo. Quien gane decide todo. ¿La flotación alcanza para igualar el peso? Flota. ¿Gana la gravedad? Al fondo." },
      ] },
      { title: "Los Objetos Empujan el Agua de Su Camino", blocks: [
        { type: "paragraph", text: "Aquí se pone interesante. Cualquier cosa que metas al agua tiene que empujar agua a un lado para hacerse espacio. A ese empujón se le llama desplazamiento, y entre más agua desplaces, más fuerte empuja el agua de regreso. O sea que la forma no es un detalle. La forma es todo el juego." },
      ] },
      { title: "La Densidad Es una Gran Pista", blocks: [
        { type: "paragraph", text: "La densidad es cuánta materia está apretada en cierto espacio. Una piedra es densa: muchísima materia metida en poco volumen. Una pelota de espuma no: casi puro aire con un poco de plástico sosteniéndolo. Más denso que el agua, generalmente te hundes. Menos denso, generalmente flotas. Generalmente. La forma puede voltear todo el asunto." },
      ] },
      { title: "¿Por Qué Puede Flotar un Barco de Acero?", blocks: [
        { type: "paragraph", text: "El acero es muchísimo más denso que el agua, y una bola sólida de acero se va como la piedra. Pero un barco no es acero macizo. Es un cascarón delgado de acero envolviendo un volumen enorme de aire, y esa forma desplaza una cantidad brutal de agua." },
        { type: "paragraph", text: "Cuenta el aire y la densidad promedio del barco queda por debajo de la del agua. Ese es el truco legal, y por eso flota. Ábrele un hoyo al casco y el agua reemplaza al aire. La densidad promedio se pasa de la del agua. Y entonces el barco se va abajo, exactamente igual que la piedra." },
      ] },
      { title: "¿Por Qué los Barcos Tienen Fondos Anchos?", blocks: [
        { type: "paragraph", text: "Porque ancho significa más agua desplazada, y más agua desplazada significa un empujón más grande hacia arriba. Una canoa, un buque de carga y un crucero no se parecen en nada, pero cada uno de esos cascos fue moldeado alrededor de las mismas matemáticas de flotación. Quien diseña algo que flota está haciendo malabares con peso, forma, equilibrio y materiales al mismo tiempo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Las cosas flotan cuando el agua empujando hacia arriba puede igualar el peso jalando hacia abajo. La densidad te lleva parte del camino. La forma decide el resto." },
        { type: "callout", accent: "orange", text: "Una piedrita se hunde porque es densa y casi no desplaza nada. Un crucero flota porque su forma avienta a un lado un océano de agua. Flotar nunca se trató de ser liviano. Se trata de cuánta agua puedes quitar de tu camino." },
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
        { type: "paragraph", text: "Los imanes parecen tener una sola regla. Se pegan al refri, agarran clips, se prenden del metal. Fácil. Después le pones uno al papel aluminio, o a una moneda, o a una lata de refresco, y no pasa absolutamente nada. Todo eso es metal. ¿Entonces qué?" },
        { type: "paragraph", text: "La respuesta está pasando muy allá abajo, al nivel de las partículas dentro del material." },
      ] },
      { title: "Los Imanes Tienen Campos Invisibles", blocks: [
        { type: "paragraph", text: "Todo imán está rodeado de un campo que no puedes ver pero sí puedes sentir. Acércalo a un clip y el clip salta. Acércalo a otro imán y sientes el empujón invisible antes de que se toquen. Ese campo es más fuerte en las puntas, los polos, que llamamos norte y sur." },
        { type: "paragraph", text: "Los opuestos se atraen, los iguales se avientan. Voltea un imán y los mismos dos objetos pasan de agarrarse a pelearse. Mismos imanes, comportamiento opuesto, y lo único que cambió fue la dirección." },
      ] },
      { title: "No Todos los Metales Son Magnéticos", blocks: [
        { type: "paragraph", text: "La gran confusión es que metal significa magnético. No es cierto. El hierro es fuertemente magnético. El acero normalmente sí, porque es casi todo hierro. El níquel y el cobalto también entran a la lista. ¿Pero el aluminio, el cobre, el oro, la plata y el latón? A un imán de refri no le van a importar. Son metales perfectamente buenos que simplemente no hacen este truco en particular." },
      ] },
      { title: "Pequeñas Regiones Magnéticas", blocks: [
        { type: "paragraph", text: "Dentro de un material magnético hay zonas microscópicas llamadas dominios. Imagina cada una como una flechita apuntando en alguna dirección magnética. En un pedazo de hierro sin magnetizar, esas flechas apuntan para todos lados, así que todos sus jaloncitos se cancelan y el hierro no hace nada." },
        { type: "paragraph", text: "Acerca un imán y las flechas empiezan a girar hacia la alineación. Consigue que suficientes apunten en la misma dirección y todo el pedazo de metal queda atraído. Eso es lo que pasa cuando un clip se pega de golpe a un imán. No le agregaste magnetismo. Organizaste lo que ya traía adentro." },
      ] },
      { title: "¿Por Qué el Cobre No Se Pega?", blocks: [
        { type: "paragraph", text: "El cobre tiene electrones haciendo lo suyo igual que el hierro. Lo que no tiene es una estructura que permita que todos esos efectos magnéticos diminutos se alineen y se sumen. Sin esa alineación no hay nada de dónde agarre el imán. El aluminio, el oro y casi todos los demás metales están en el mismo barco. Los ingredientes están ahí. El acomodo no." },
      ] },
      { title: "¿Qué Pasa con el Acero?", blocks: [
        { type: "paragraph", text: "El acero es hierro con otros elementos mezclados, normalmente carbono. Como trae hierro, casi todo el acero es magnético. Pero no todo, y eso confunde a la gente. Ciertos aceros inoxidables apenas le responden a un imán, porque la forma en que sus átomos están acomodados es distinta. Por eso un imán se pega de golpe a una cosa de acero y se resbala de otra que se ve idéntica." },
      ] },
      { title: "Los Imanes Son Útiles Porque Son Selectivos", blocks: [
        { type: "paragraph", text: "Que sean tan quisquillosos es exactamente lo que los hace útiles. Las plantas de reciclaje pasan imanes gigantes sobre la banda para arrancar hierro y acero de una corriente mezclada en una sola pasada. Los motores eléctricos convierten magnetismo en movimiento. Las bocinas convierten señales eléctricas en sonido con un imán y una bobina. Una brújula lee el campo magnético del planeta entero. Esto no es un truco de refrigerador. Es tecnología que sostiene el mundo." },
      ] },
      { title: "La Gran Idea", blocks: [
        { type: "paragraph", text: "Los imanes se pegan a los metales cuyos dominios internos se pueden alinear con un campo magnético. El hierro, el acero, el níquel y el cobalto pueden. El cobre y el aluminio no, porque su estructura no permite esa alineación." },
        { type: "callout", accent: "orange", text: "Así que cuando un imán se resbala de un objeto de metal, no hay nada descompuesto. Ese metal simplemente no es del tipo magnético, y ahora ya sabes por qué." },
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
    imageAlt: "Avanza STEM 导师在编程工作坊中授课，学生们坐在笔记本电脑前",
    imageCaption: "学生们在 Avanza STEM 工作坊中学习编程基础。",
    endingProject: { href: "/projects/my-first-python-program", label: "试试这个项目：写出你的第一个 Python 程序" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "what-is-ai-explaining-to-kids",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "有件事会让很多人吃一惊：写代码正在变成一项基本技能，和读写差不多重要。可还是有一大堆孩子读完整个学校，一行代码都没敲过。" }, { type: "paragraph", text: "我们在 Clifton 公共图书馆亲眼见过那一刻。一个学生写了个程序，功能只有一个：打印「你好」。接着他花了二十分钟往里塞新问题、冷笑话和音效。没人要求他这么做。他只是发现自己能造东西了，然后就停不下来。" }] },
      { title: "重点不只是代码", blocks: [{ type: "paragraph", text: "这里有个大家不太说破的事实：目标不是把每个孩子都变成程序员，而是编程会改造他们的思考方式。" }, { type: "list", items: ["把一个巨大的问题切成真能解决的小块", "认出「这个我以前见过」", "屏蔽噪音，抓住真正要紧的东西", "试一个想法，看它失败，然后追查原因"] }, { type: "paragraph", text: "工程师天天用这四招。科学家、作家、创业的人也一样。一个孩子在 Python 循环里追一个 bug，练的正是将来实验搞砸或小组作业崩掉时要用的本事。" }] },
      { title: "什么时候开始合适?", blocks: [{ type: "numbered", items: [{ title: "5-7 岁：不用屏幕的视觉逻辑", body: "桌游和 ScratchJr 教孩子把步骤排好顺序，这个阶段谁都不用碰键盘。" }, { title: "8-11 岁：积木式编程", body: "Scratch 让孩子直接拼出能玩的游戏和动画。不用打字就没有门槛，可以直奔创作。" }, { title: "12 岁以上：文本语言", body: "Python 读起来几乎像英文，专业人士每天都在用，是非常好的第一门真语言。" }] }] },
      { title: "如何在家开始", blocks: [{ type: "list", items: ["注册一个免费的 Scratch 账号，然后放手让他们乱点", "一起看一个入门教程，然后你就退到一边", "让他们把自己的程序大声讲一遍", "让他们卡住。把自己弄不卡住，这才是全部本事", "他们做出来的东西，哪怕再小也要夸得夸张一点"] }] },
      { title: "第一个 Python 程序", blocks: [{ type: "paragraph", text: "如果孩子已经准备好写真代码，打开 Replit 或者 Trinket，敲下这几行：" }, { type: "code", title: "试试看", accent: "green", code: "name = input(\"你叫什么名字? \")\nprint(\"你好, \" + name + \"! 欢迎学习编程。\")" }, { type: "paragraph", text: "这就是一个真程序。它提问，它听，它回答。再加几个问题，它立刻就变成聊天机器人或者答题游戏。" }, { type: "paragraphWithLink", before: "想看完整教程，包括怎么把它改成问答游戏？看看我们的", linkText: "《我的第一个 Python 程序》指南", href: "/projects/my-first-python-program", after: "。" }] },
      { title: "更大的意义", blocks: [{ type: "paragraph", text: "西班牙裔学生在计算机科学里人数偏少，这跟能力毫无关系。真正的原因是谁能接触到、谁能近距离看到，以及谁被鼓励继续走下去。" }, { type: "quote", text: "他回家后立刻想给我看他写的程序，整个晚上都在不断给它加新内容。", attribution: "Clifton 图书馆编程工作坊一名学生的家长" }, { type: "ctaLink", title: "试试免费工作坊", text: "如果孩子想来试试免费的线下编程工作坊，材料我们全带齐，零经验也能直接进来。", linkText: "查看近期工作坊", href: "/workshops", accent: "teal" }] },
    ],
  },
  "5-easy-science-experiments": {
    ...localizedBlogArticles.en["5-easy-science-experiments"],
    title: "5 个可以在家做的简单科学实验",
    category: "科学",
    readTime: common.zh.minutes.m4,
    imageAlt: "一个鸡蛋表面覆盖着二氧化碳气泡，这是厨房化学反应的特写",
    imageCaption: "厨房化学反应中产生的二氧化碳气泡，和下面几个实验中的气体反应原理相同。",
    endingProject: { href: "/projects/baking-soda-volcano", label: "试试这个项目：小苏打火山" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "math-games-that-make-learning-fun",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "你不需要白大褂，更不需要贵设备。最好玩的科学基本上靠醋、纸巾和冰箱里那瓶汽水就能跑起来。" },
        { type: "paragraph", text: "下面每一个都配了材料、步骤和大白话解释，这样孩子做完你能跟他聊清楚刚才到底发生了什么。" },
        { type: "summary", timeLabel: "所需时间", time: "五个实验共需 30-45 分钟", ageLabel: "适合年龄", age: "5 岁及以上，年龄较小的孩子需要成人协助", supervisionLabel: "需要成人监督", supervision: "需要，尤其是「瓶中鸡蛋」实验，因为会用到明火", learnLabel: "孩子将学到", learn: "化学反应、气体压力、密度和毛细作用", safetyLabel: "安全提示", safety: "点燃火柴和监督鸡蛋实验必须由成人完成" },
      ] },
      { title: "", blocks: [{ type: "experiments", items: [
        { number: 1, title: "小苏打和醋火山", category: "化学", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["半杯小苏打", "一杯白醋", "几滴洗洁精", "可选食用色素", "杯子或碗"], steps: ["把小苏打倒进杯子。", "挤几滴洗洁精，再滴几滴色素。", "倒醋，然后赶紧把手挪开。", "看泡沫自己爬出杯口。"], science: "小苏打和醋一碰上就开始反应，疯狂放出二氧化碳。洗洁精把这些气体全困在泡泡里，于是普通的冒泡就变成了喷发。" },
        { number: 2, title: "跳舞的葡萄干", category: "物理", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["透明杯子", "气泡水或透明汽水", "一些葡萄干"], steps: ["把气泡水倒满杯子。", "丢几颗葡萄干进去。", "接着看。要等一会儿它们才开始动。"], science: "小小的二氧化碳气泡抓住葡萄干皱褶，把它托到水面。到了上面气泡破掉，葡萄干沉下去，然后整个过程重来一遍。" },
        { number: 3, title: "自制熔岩灯", category: "化学和物理", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["透明瓶子", "植物油", "水", "泡腾片", "食用色素"], steps: ["瓶子倒进大约四分之三的油。", "再加水和几滴色素。", "掰一小块泡腾片丢进去。"], science: "油和水死活不肯混在一起，所以分成两层。泡腾片放出的气泡抓着带颜色的水往上拽，到顶再松手，水就落回去。" },
        { number: 4, title: "纸巾色谱", category: "化学", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["纸巾或咖啡滤纸", "可水洗马克笔", "水", "剪刀"], steps: ["剪一条细纸条。", "在靠近底端画一个粗粗的墨点。", "只把最下面的边浸进水里，别让墨点碰到水。", "等着看一种颜色裂成好几种。"], science: "那一种马克笔颜色其实是好几种色素混出来的。水拖着它们往上爬，有的跑得快有的跑得慢，于是分成一条条彩带。" },
        { number: 5, title: "瓶中鸡蛋", category: "物理", materialsLabel: "材料", stepsLabel: "步骤", scienceLabel: "科学原理", materials: ["剥壳熟鸡蛋", "玻璃瓶", "小纸片", "火柴并需成人监督"], steps: ["由大人点燃纸片，丢进瓶子里。", "把鸡蛋窄的一头朝下架在瓶口。", "退后一步，看瓶子把它吞下去。"], science: "火焰把瓶里的空气烤热。空气冷下来后占的地方变小，瓶内压力下降，外面那些平平常常的空气就把鸡蛋从瓶口硬推了进去。" },
      ] }] },
      { title: "让学习留下来", blocks: [
        { type: "paragraph", text: "实验做完，让孩子画一画刚才发生了什么，再写一句为什么。把它讲出来，才能把一个「好酷」的瞬间变成他真的懂了的东西。" },
        { type: "paragraphWithLink", before: "想深挖小苏打和醋火山？我们的", linkText: "完整项目指南", href: "/projects/baking-soda-volcano", after: "里有照片，也有做砸了怎么办。" },
        { type: "callout", title: "工作坊连接", accent: "teal", text: "有一次工作坊上，学生为了「葡萄干凭什么一直上下浮」吵了将近十分钟，比准备实验的时间还长。那场争论就是我们要的效果。" },
      ] },
    ],
  },
  "how-to-build-the-strongest-popsicle-stick-bridge": {
    ...localizedBlogArticles.en["how-to-build-the-strongest-popsicle-stick-bridge"],
    title: "如何建造最坚固的冰棒棍桥",
    category: "工程",
    readTime: common.zh.minutes.m6,
    imageAlt: "Avanza STEM 导师和学生站在一座承受高高一摞书的冰棒棍桥旁边",
    imageCaption: "学生们在 Avanza STEM 工程工作坊中测试冰棒棍桥能承受多重。",
    endingProject: { href: "/projects/popsicle-stick-bridge", label: "试试这个项目：搭建冰棒棍桥" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "getting-started-with-lego-robotics",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "桥梁比赛几乎从来不是靠棍子多或胶水多赢的。真正决定胜负的只有三件事：几何形状、力往哪里走，还有你的接头做得干不干净。" }, { type: "paragraphWithLink", before: "这篇聊的是一座桥为什么撑得住。如果你想要一步一步的搭建教程，直接去我们的", linkText: "详细项目页面", href: "/projects/popsicle-stick-bridge", after: "。" }] },
      { title: "为什么三角形最强", blocks: [{ type: "paragraph", text: "推一下正方形，它立刻歪成平行四边形。推一下三角形，什么都不会发生，除非真的有东西弯了或断了。桁架全用三角形，原因就这么简单。" }, { type: "callout", title: "关键想法", accent: "purple", text: "给正方形加一根斜撑，你就造出了两个三角形。这一根棍子能让整个结构的承重能力翻好几倍。" }] },
      { title: "理解载荷路径", blocks: [{ type: "list", items: ["桥面把重量摊开，分给两侧桁架", "桁架再把这些力送到支撑点", "下弦杆被拉长，工程师叫它受拉", "上弦杆被压扁，这叫受压", "斜杆负责把力从桥的一段递到下一段"] }, { type: "paragraph", text: "好设计只加固最吃力的那几个点，而不是到处糊棍子然后祈祷。" }] },
      { title: "强桥和弱桥的五个差别", blocks: [{ type: "numbered", items: [{ title: "接头做得一致", body: "胶水永远比木头先投降。接头要做干净，而且每一个都必须完全干透。" }, { title: "两侧桁架一模一样", body: "有一侧做得糙一点，它就会多扛力，然后先垮。" }, { title: "顶部横向支撑", body: "顶上的横杆能防止两侧墙板往外张开然后整个折过去。" }, { title: "像样的桥面", body: "能把重量分给两侧桁架的桥面，永远赢过把全部载荷压在一个点上。" }, { title: "交错三角形", body: "彼此重叠的三角形能给力一条通到支撑点的干净路径。" }] }] },
      { title: "常见错误", blocks: [{ type: "list", items: ["把整座桥泡在胶水里", "两侧一起做，而不是照着一个做好的模板复制两遍", "省掉横向支撑", "胶水没干透就上去测试", "不知道弱点在哪，就随便加棍子"] }] },
      { title: "强度重量比挑战", blocks: [
        { type: "paragraph", text: "先称桥的重量。再用它撑住的重量除以桥自身的重量。这个数字才是你真正的工程分数。" },
        { type: "paragraph", text: "在我们的工作坊里，学生的桥一般不到 50 克，却能扛住 5 到 15 磅才断。那是自身重量的 50 倍还多。" },
        { type: "quote", text: "我们开始只在上次断裂的地方加棍子，而不是到处乱加。就是从那时起，我们的桥才真正变强了。", attribution: "Avanza STEM 桥梁搭建工作坊一名学生" },
        { type: "callout", accent: "purple", text: "我们的桥梁工作坊按强度重量比打分，就这一条规则，会彻底改变学生从第一根棍子起的做法。" },
      ] },
    ],
  },
  "getting-started-with-lego-robotics": {
    ...localizedBlogArticles.en["getting-started-with-lego-robotics"],
    title: "乐高机器人入门：家长指南",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    imageAlt: "三名学生一起搭建并编程一个乐高机器人",
    imageCaption: "学生们合作搭建并编程他们的第一个乐高机器人。",
    endingProject: { href: "/projects/lego-robot-builder", label: "试试这个项目：搭建你的第一个乐高机器人" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "why-every-kid-should-learn-to-code",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "乐高机器人把工程和编程一起塞给孩子。电机转起来，传感器察觉到东西，他们刚敲下的代码让某个物体在自己坐的这间屋子里动了起来。" }, { type: "paragraph", text: "第一次搭的时候，一个小组可能整节课都在折腾怎么让机器人走直线。听着像浪费时间。其实那常常是当天最有价值的学习。" }] },
      { title: "它和普通乐高有什么不同", blocks: [{ type: "paragraph", text: "普通乐高给你一个摆着好看的模型。机器人给你一个会动、会感知、会反应的东西，全部由一块可编程主控在指挥。" }, { type: "callout", title: "核心想法", accent: "green", text: "机器人把失败变成谜题。机器人做错了事，就是在告诉你结构或代码有问题，接下来轮到你去查是哪一处。" }] },
      { title: "选择哪种套件", blocks: [{ type: "numbered", items: [{ title: "SPIKE Essential (6-10 岁)", body: "有引导、用积木编程的入门套件，专为年纪小的初学者做的。" }, { title: "SPIKE Prime (10-14 岁)", body: "很多学校在用的那一款。传感器更多、电机更多，也有往上做大项目的空间。" }, { title: "Mindstorms Robot Inventor", body: "已经停产但市面上还能找到。灵活、强大，碰到好价格值得下手。" }] }] },
      { title: "孩子会学到什么", blocks: [{ type: "list", items: ["机器到底怎么动：齿轮、轴和杠杆", "传感器逻辑，也就是机器人怎么决定下一步", "一步一步编程，还有「如果这样就那样」的思路", "设计、测试、弄坏、再重来", "在团队里把自己的想法讲到别人能听懂"] }, { type: "quote", text: "机器人一直在打转，后来我们发现是一个轮子松了。发现这个问题的时候，感觉像是真正修好了什么东西。", attribution: "Avanza STEM 机器人工作坊一名学生" }] },
      { title: "给非工程师家长的建议", blocks: [{ type: "paragraph", text: "你不需要答案，你需要好问题。这四句基本上够用了：" }, { type: "list", items: ["你本来想让它做什么?", "它实际做了什么?", "你会先改哪一处?", "能不能让它做点完全不一样的事?"] }] },
      { title: "可以先试的项目", blocks: [{ type: "numbered", items: [{ title: "巡线机器人", body: "用颜色传感器追着地上一条黑胶带跑。" }, { title: "避障机器人", body: "用距离传感器在撞墙之前拐弯。" }, { title: "遥控", body: "先用手开一遍，再试着用代码把那条路线复现出来。" }, { title: "分类机器", body: "做一台能按颜色把东西分到不同堆里的机器。" }] }, { type: "paragraphWithLink", before: "想要一个有完整步骤的第一个项目？试试我们的", linkText: "乐高机器人搭建指南", href: "/projects/lego-robot-builder", after: "。" }] },
      { title: "套件之外", blocks: [{ type: "paragraph", text: "等孩子开始想要一场真正的团队挑战，FIRST LEGO League 就是很自然的下一站。" }, { type: "ctaLink", title: "搭建你的第一个机器人", text: "从一个有引导的 LEGO SPIKE Prime 项目开始，它会带你走完结构、代码，以及「现在什么都不好使」的时候该怎么办。", linkText: "查看近期工作坊", href: "/workshops", accent: "green" }] },
    ],
  },
  "what-is-ai-explaining-to-kids": {
    ...localizedBlogArticles.en["what-is-ai-explaining-to-kids"],
    title: "什么是 AI? 给孩子解释人工智能",
    category: "AI",
    readTime: common.zh.minutes.m4,
    imageAlt: "学生们在 Avanza STEM AI 工作坊中使用电脑，屏幕上显示着图表",
    imageCaption: "学生们在 Avanza STEM 工作坊中亲手探索 AI 概念。",
    endingProject: { href: "/projects/my-first-python-program", label: "试试这个项目：写出你的第一个 Python 程序" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "why-every-kid-should-learn-to-code",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "AI 挑下一个视频、排你的信息流、回答语音助手，还悄悄帮你分邮件。大多数孩子每天都在用它，比谁认真跟他们解释这是什么早了好几年。" }, { type: "paragraph", text: "现在懂 AI 已经算一种基本素养了。有两个问题特别值得教：这东西是从什么里学出来的？还有，谁的视角被落下了？" }] },
      { title: "从孩子熟悉的东西开始", blocks: [{ type: "callout", accent: "teal", text: "Spotify 往你歌单里塞了一首新歌，你觉得它是怎么挑中那一首的?" }, { type: "paragraph", text: "这个问题会直接把人带到「找模式」上，而找模式正是绝大多数 AI 的引擎。我们在 AI 工作坊一开场就问，解释都还没开始。学生的猜测几乎每次都很接近真相，这正是重点所在。" }] },
      { title: "AI 如何学习", blocks: [{ type: "paragraph", text: "AI 学东西的方式，和一个小孩搞懂什么叫狗差不多：看很多很多狗。给模型足够多带标签的例子，它自己就开始抓到规律了。" }, { type: "callout", title: "技术术语", accent: "green", text: "这个叫监督学习。所谓监督，只是说每一个训练例子都自带正确答案。" }] },
      { title: "值得给孩子解释的 AI 类型", blocks: [{ type: "numbered", items: [{ title: "图像识别", body: "人脸解锁、照片自动分类，还有医生看片子。" }, { title: "推荐系统", body: "决定 Netflix、Spotify 和 YouTube 下一个推到你面前的是什么。" }, { title: "语言模型", body: "靠预测下一个词通常是什么来写出文字的系统。" }, { title: "游戏 AI", body: "靠玩上百万局、从有效的做法里学习，然后越来越强。" }] }] },
      { title: "AI 不能做什么", blocks: [{ type: "list", items: ["它只认得和训练数据像的模式。给它没见过的东西，它就是在猜", "训练数据里有什么偏见，另一头就会原样吐出来", "它可以彻底错，同时听上去无比笃定", "你让它追哪个数字它就追哪个，哪怕那根本不是真正的目标"] }, { type: "paragraph", text: "让孩子养成「这系统是拿什么训练的」这个提问习惯，是你能给他的最好用的思维工具之一。" }] },
      { title: "动手活动", blocks: [{ type: "list", items: ["打开 teachablemachine.withgoogle.com", "建两个图像类别，比如竖大拇指和倒大拇指", "用自己的摄像头拍照训练", "拿一个它从没见过的姿势去考它", "然后比一比：5 张训练照和 50 张训练照差多少"] }, { type: "callout", accent: "teal", text: "十分钟左右，你就已经走完了数据收集、训练、预测，还有「为什么数据质量决定一切」这一整套。" }, { type: "quote", text: "我训练它来分辨我和朋友的手，一开始一直认错，直到我们用了更多照片。那一刻我才真正明白是怎么回事。", attribution: "Avanza STEM AI 工作坊一名学生" }] },
      { title: "负责任地使用 AI", blocks: [{ type: "paragraph", text: "孩子需要的不只是一串使用技巧。他们要知道什么时候该去核实 AI 说的话，什么时候干脆不能依赖它，以及这类系统真造成伤害时该由谁负责。" }, { type: "paragraphWithLink", before: "如果这是孩子第一次用代码做东西，我们的", linkText: "《我的第一个 Python 程序》指南", href: "/projects/my-first-python-program", after: "是很稳的下一步。" }] },
    ],
  },
  "math-games-that-make-learning-fun": {
    ...localizedBlogArticles.en["math-games-that-make-learning-fun"],
    title: "让学习变有趣的数学游戏",
    category: "数学",
    readTime: common.zh.minutes.m3,
    imageAlt: "一个色彩鲜艳的木制算盘，用于培养数感",
    imageCaption: "木制算盘是许多能在孩子接触练习册之前培养数感的简单工具之一。",
    endingProject: { href: "/games", label: "试试这些游戏" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "5-easy-science-experiments",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "数学焦虑的开头基本都一样：练习册、倒计时、还有满页红笔。游戏用的是完全相同的能力，只是没人会胃疼。" },
        { type: "paragraph", text: "下面这些是给 2 到 5 年级设计的，几乎都只需要一副牌或者两颗骰子。" },
        { type: "summary", timeLabel: "所需时间", time: "每个游戏 10-20 分钟", ageLabel: "适合年龄", age: "2-5 年级（7-11 岁）", supervisionLabel: "需要成人监督", supervision: "不需要。孩子可以自己玩，也可以和家人一起玩", learnLabel: "孩子将学到", learn: "数感、心算、分数和估算" },
      ] },
      { title: "", blocks: [{ type: "games", items: [
        { title: "数字大战", gradeRange: "2-4 年级", description: "一副牌就能快速练出数感。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["把人头牌抽出来，或者给它们定个数值。", "整副牌平分。", "两个人各翻一张。", "大的那张把两张都收走。", "想练乘法？每人翻两张相乘。"], whyItWorks: "孩子练得飞起，却一次都没觉得自己在做题。" },
        { title: "101 不超线", gradeRange: "3-5 年级", description: "关于心算和「什么时候该收手」的骰子游戏。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["从 0 开始。", "掷两颗骰子。", "把它们相加，或者一个当十位一个当个位。", "尽量逼近 101，但绝不能超。"], whyItWorks: "就这一个选择，逼着孩子真去想位值。" },
        { title: "分数披萨", gradeRange: "3-5 年级", description: "把分数变成能拿在手里的东西。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["把纸圆剪成分数块。", "轮流抽一块。", "比谁先刚好拼满一个整圆。", "如果这一块会让你超出，就跳过这轮。"], whyItWorks: "手上真的在挪块，会长出练习册给不了的等值分数直觉。" },
        { title: "目标数字", gradeRange: "4-5 年级", description: "一道不止一条正解路径的心算谜题。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["挑五个数字。", "定一个目标数。", "用任意运算凑到它。", "对答案，看谁找到了更妙的走法。"], whyItWorks: "它悄悄证明了一道数学题可以有好几条正确路线。" },
        { title: "数学二十问", gradeRange: "2-5 年级", description: "把数学词汇偷偷塞进来的猜谜游戏。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["想一个数字，别说出来。", "另一个人用数学问题问是或否。", "尽量用最少的问题猜中。"], whyItWorks: "偶数、质数、倍数这些词突然变得要紧，因为知道它们你才赢得了。" },
        { title: "估算罐", gradeRange: "2-4 年级", description: "一个基本能自己跑起来的每周猜谜挑战。", howToPlayLabel: "怎么玩", whyItWorksLabel: "为什么有效", howToPlay: ["把小东西装满一个罐子。", "每个人写下自己的猜测。", "过几天一起数出来。", "最接近的人赢。"], whyItWorks: "在完全没有压力的情况下猜，正是数感长出来的方式。" },
      ] }] },
      { title: "关于限时练习", blocks: [
        { type: "paragraph", text: "熟练来自一遍遍地见到同样的数学，而且做错完全不用付代价。游戏能做到这点。限时测试恰好相反。" },
        { type: "paragraphWithLink", before: "还想要更多？这些游戏和别的活动有不少都放在我们的", linkText: "游戏页面", href: "/games", after: "上。" },
        { type: "list", items: ["从孩子一眼就想玩的那个开始", "和他一起玩，不是盯着他玩", "开头让他赢几局", "在纠正任何东西之前，先问他是怎么想的", "在他还想再来一局的时候停下"] },
        { type: "callout", title: "给家长的提示", accent: "orange", text: "在家庭数学之夜，被反复要求再玩一次的，永远是那些孩子能光明正大赢过大人的游戏。「数字大战」和「101 不超线」都做到了这一点。" },
        { type: "quote", text: "我女儿连续三个晚上都要玩「101 不超线」。我从来没告诉她这其实是数学练习。", attribution: "Avanza STEM 家庭数学之夜一名家长" },
      ] },
    ],
  },
  "building-a-community-stem-workshops": {
    ...localizedBlogArticles.en["building-a-community-stem-workshops"],
    title: "建设社区：本地 STEM 工作坊如何改变生活",
    category: "社区",
    readTime: common.zh.minutes.m7,
    imageAlt: "家庭和学生们聚集在图书馆参加 Avanza STEM 社区活动",
    imageCaption: "家庭们聚集在图书馆，参加 Avanza STEM 社区工作坊系列活动。",
    endingProject: { href: "/host", label: "在你的社区举办工作坊" },
    endingSecondary: { href: "/workshops", label: "查看近期工作坊" },
    endingRelatedSlug: "getting-started-with-lego-robotics",
    sections: [
      { title: "", blocks: [{ type: "paragraph", text: "创办 Avanza STEM 最难的一步，是相信抱着一箱材料和一台笔记本走进图书馆，真的能起到作用。" }, { type: "paragraph", text: "后来我们在 Clifton 公共图书馆和 Allwood 分馆办了项目，前后来了七十多名学生。现在我们知道为什么它重要了。孩子走出那间屋子的时候，知道 STEM 也是属于他们的。" }] },
      { title: "工作坊是什么样", blocks: [{ type: "paragraph", text: "现在我们跑的是三周系列：先工程，再编程，再 AI。每一场都免费，谁都不需要经验就能进来。" }, { type: "paragraph", text: "学生动手搭东西、写 Python、训练简单的 AI 模型。整个过程里，我们把每个活动都接回工程师和科学家真正在用的想法上。" }] },
      { title: "为什么图书馆合适", blocks: [{ type: "paragraph", text: "图书馆已经把最难的那部分做完了。大家信任它，它对所有人开放，而免费学习本来就是它存在的理由。" }, { type: "list", items: ["没有人需要付钱进来", "孩子本来就认识这栋楼，在里面有安全感", "图书馆和这个社区有真实的关系", "场地和设备扛得住一场乱糟糟的动手课", "来自不同学校的学生都能到得了" ] }] },
      { title: "我们在现场看到的", blocks: [{ type: "paragraph", text: "最好的瞬间都很小。一个孩子安安静静给自己的 Python 游戏加上第五个问题。一个家庭忽然意识到，这样的项目就在离家十分钟的地方。两个学生为了「这个为什么能行」你一句我一句。" }, { type: "quote", text: "一位家长告诉我们，她的女儿在课程结束前就已经在问下周还能不能再来。那一刻我们知道，这个项目真的有用。", attribution: "Allwood 分馆图书管理员" }, { type: "paragraph", text: "把一个孩子的好奇心当回事，哪怕只有一次，他多半就会自己出去找更多。" }] },
      { title: "代表性问题", blocks: [{ type: "paragraph", text: "西班牙裔学生在 STEM 里人数依然偏少，原因既普通又可解决：接触太少、导师太少、鼓励太少、机会太少。" }, { type: "callout", title: "我们想缩小的差距", accent: "purple", text: "看到一个长得像自己的人在做这件事，会改变谁觉得自己被 STEM 邀请了。这不是小事，这几乎就是问题本身。" }] },
      { title: "如何把工作坊带到你的社区", blocks: [{ type: "numbered", items: [{ title: "找个场地", body: "图书馆、社区中心、教堂、学校都行。先找那个本来就认识你们家庭的地方。" }, { title: "联系我们", body: "我们会一起过一遍课程、材料，以及怎么把消息传出去。" }, { title: "在本地推广", body: "社区群组、传单和当地伙伴能触到那些线上帖子永远够不着的家庭。" }, { title: "一直出现", body: "信任是一场一场攒出来的，值得这个等待。" }] }] },
      { title: "接下来", blocks: [
        { type: "paragraph", text: "我们想覆盖更多图书馆分馆和社区中心，也希望这套模式简单到别人自己就能跑起来。" },
        { type: "ctaLink", title: "在你的社区举办工作坊", text: "想为你所在的图书馆、学校或社区中心带来免费的 STEM 项目吗？", linkText: "联系我们安排工作坊", href: "/host", accent: "purple" },
        { type: "ctaLink", text: "想先亲眼看看一场真实的工作坊长什么样？", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "我们每办一次工程工作坊，都会有学生盯着那座扛住最多重量的桥问同一句话：为什么偏偏这个能行？答案总是绕回同一个形状。三角形。" },
        { type: "paragraph", text: "这不是一条背下来就完事的规则。一旦你明白三角形特别在哪，你就再也看不见「没有三角形」的世界了。桥、塔、自行车车架、屋顶、过山车，全都藏着它。" },
      ] },
      { title: "正方形的问题", blocks: [
        { type: "paragraph", text: "想象一个你用四根棍子和胶带拼出来的正方形。推一个角，整个框架就歪成一个菱形。工程师管这叫变形，原因是那四个关节全都能转。" },
        { type: "callout", title: "关键区别", accent: "purple", text: "三角形有三条边、三个角，你没法在不弯断某条边的前提下把它挤成别的形状。这就是「刚性」的意思。" },
        { type: "paragraph", text: "所以正方形是承重结构的错误答案，三角形才是对的。整件事两句话就说完了。" },
      ] },
      { title: "加一条斜边能带来什么", blocks: [
        { type: "paragraph", text: "现在试试这个。拿那个软趴趴的正方形，斜着横一根棍子过去。你刚刚造出了两个三角形，框架立刻从晃悠变成结实。" },
        { type: "paragraph", text: "那根棍子不只是加固。它把正方形切成了两个没法变形的形状，于是整块面板一下子硬了。我们工作坊的学生一加上斜撑就能立刻感觉到。刚才还会折下去的面板，现在开始顶回来了。" },
        { type: "callout", accent: "purple", text: "脆弱和结实之间，可能就差一根斜棍。这就是三角化，也就是全部的诀窍。" },
      ] },
      { title: "为什么三角形在工程中随处可见", blocks: [
        { type: "paragraph", text: "一旦知道该看什么，你就会开始在到处逮到三角形在干结构活。" },
        { type: "list", items: ["桁架桥：一整串相连的三角形，把荷载从这头运到那头", "埃菲尔铁塔：一张三角形格网，让它在大风里晃而不是折", "自行车车架：看一眼主车架，你看到的就是一个三角形", "屋顶椽木：斜屋顶的那个 A 字形，就是一个撑着整栋房子的三角形", "施工吊车：那条长长的臂是三角格架，正在吊起离谱的重量", "过山车：三角化的支撑扛得住乘客在变向时的猛烈甩动"] },
      ] },
      { title: "背后的科学：力如何在三角形中传导", blocks: [
        { type: "numbered", items: [
          { title: "三角形把力变成拉和压", body: "往三角形上一压，每根构件要么被拉长，要么被压扁。没有东西在弯。而弯，才是把东西弄断的那件事。" },
          { title: "三条边一起干活", body: "正方形把全部应力都塞进四个角。三角形把力同时摊到每一条边上。" },
          { title: "形状拒绝动", body: "只要没有构件失效，一个受力的三角形就保持你搭出来的样子。正方形给不了这个保证。" },
        ] },
      ] },
      { title: "自己试试看", blocks: [
        { type: "paragraph", text: "不用实验室。拿四根冰棍棒和胶带，两分钟就能亲眼看到。" },
        { type: "list", items: ["四根棍首尾相接粘成正方形。推一个角，看它塌下去。", "斜着横上第五根棍。再推同一个角，它几乎纹丝不动。", "再用三根棍拼一个纯三角形，感受一下结实多少。", "把几个三角形串成一排，看看你能撑起什么。"] },
        { type: "callout", accent: "purple", text: "我们工作坊里的冠军桥，永远是由一串相连的三角形搭出来的。懂原理的学生搭得更结实，而且真断了的时候，他们已经知道该往哪儿看。" },
      ] },
      { title: "这对你的桥意味着什么", blocks: [
        { type: "paragraphWithLink", before: "准备动手搭一座，想要一步步的教程？我们的", linkText: "冰棍棒桥梁项目指南", href: "/projects/popsicle-stick-bridge", after: "会用上面这些原理带你搭完一整座桁架桥。" },
        { type: "ctaLink", title: "搭一座桁架桥", text: "在我们的工程工作坊，学生搭好冰棍棒桥之后就往上压重量，一直压到有东西终于撑不住为止。", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "我们办的工作坊，几乎每一节都会有东西坏掉。桥被书压垮了。再放一块积木塔就倒了。纸板探测车第一次开就翻了。有意思的是，搭它的那个学生通常在别人开口之前就已经知道哪儿出了问题。" },
        { type: "paragraph", text: "那一下子的反应，「哦，它从接头断了，因为我胶水打太急」，是整节课里最棒的事。没有什么失败了。你刚拿到一条信息。" },
        { type: "youtube", videoId: "xPp8R64YEHQ", title: "东西坏了，工程师怎么思考？", caption: "快速了解工程师在设计失败时所用的思维方式。" },
      ] },
      { title: "工程师问的第一个问题", blocks: [
        { type: "paragraph", text: "东西坏了的时候，工程师不会问「我做错了什么」。他们会问一个好得多的问题：它是从哪儿断的，这在告诉我什么？" },
        { type: "paragraph", text: "桥从正中间断，就是在告诉你中间最弱。接头脱开，就是在告诉你那个连接扛不住。断裂基本上是在给你留下一次搭建的笔记。" },
        { type: "callout", title: "工程思维框架", accent: "purple", text: "坏掉的结构很有用。从来没被测试过的结构，什么都告诉不了你。" },
      ] },
      { title: "改进循环", blocks: [
        { type: "paragraph", text: "工程师是故意绕圈子的。设计循环不是从想法直奔成功的一条直线。它长这样：" },
        { type: "numbered", items: [
          { title: "把目标说具体", body: "扛住 5 磅？跨过 30 厘米？轻到不能再轻？目标含糊，结果也含糊。" },
          { title: "先搭出第一版", body: "别追求完美，追求能测。你要的是十分钟内就能往上压重量的东西。" },
          { title: "认真测", body: "把真实荷载压上去。猜它「大概能行」不算测试。" },
          { title: "盯住它怎么坏的", body: "不只是坏了，而是究竟从哪儿、以什么方式坏的。那个细节就是你的数据。" },
          { title: "一次只改一处", body: "一次改三处，你永远不会知道到底是哪一处救了你。" },
          { title: "再测一遍", body: "再来。每一轮给你的都比上一轮多。" },
        ] },
      ] },
      { title: "这在 Avanza STEM 工作坊是什么样子", blocks: [
        { type: "paragraph", text: "在桥梁课上，大多数小组搭一次、测一次。这就够了。当桥开始弯，然后扭，最后终于撑不住的时候，全场都能看清哪一部分扛得最多。" },
        { type: "paragraph", text: "真正的关键在之后。它从哪里失效的？为什么偏偏是那儿？如果明天再搭一座，第一个要加固的是什么？" },
        { type: "callout", accent: "purple", text: "搭一次就足够学到整套思维：设计它，诚实地测它，研究残骸，然后大声说出第二版会做出什么改变。" },
      ] },
      { title: "只改一处规则", blocks: [
        { type: "paragraph", text: "这条比学生想的重要得多。东西坏了之后，在下次测试前只改一处，就一处。" },
        { type: "paragraph", text: "假设你的桥断了，你重建时换了更好的接头，又换了桁架形状，还加了支撑。也许它这次扛得更多。那又怎样？你完全不知道是哪一处起了作用，所以下次一个都用不上。你没学到东西，你只是运气好。" },
        { type: "callout", accent: "purple", text: "改一处。测。看。再改下一处。工程师就是这样搞清楚什么才真的管用的。" },
      ] },
      { title: "这种思维方式适用于所有地方", blocks: [
        { type: "paragraph", text: "这一套完全不只关于结构。观察、猜测、测试、改进。同一个循环会在你生活的各个角落冒出来：" },
        { type: "list", items: ["科学：一个搞砸的实验，正在告诉你关于装置或假设的某个具体问题", "编程：崩溃会给你一条报错信息。碰代码之前先读它", "数学：一个错答案指向该回去看的那一步。它不是对你本人的判决", "运动：没投中的那一球是关于姿势或时机的反馈，不是放弃的理由"] },
        { type: "ctaLink", title: "参加免费工程工作坊", text: "在我们的工程工作坊，学生会搭出东西、故意把它压坏，再用眼前看到的把下一个做得更好。", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "NASA 的火星探测车工作在距离最近的维修站 1.4 亿英里的地方。一个轮子裂了，一个传感器死了，外面没有任何人能去修。永远没有。每一个设计决定都是在这个前提下做出来的。" },
        { type: "paragraph", text: "你今天不用为 1.4 亿英里做设计。但你要面对同一类限制：只能用手边找得到的材料、有一个不能超的重量、地形很难看，而且当别人当场测试的时候，你的车必须真的能跑。" },
      ] },
      { title: "任务简报", blocks: [
        { type: "callout", title: "你的任务", accent: "purple", text: "用纸板、胶带和身边任何东西做一辆火星车。它得能载货、能过崎岖地面、能扛住一次跌落。计时器写着 45 分钟。开始。" },
      ] },
      { title: "你需要的材料", blocks: [
        { type: "list", items: ["纸板（谷物盒、快递盒，任意硬纸板）", "布基胶带或美纹纸胶带", "剪刀", "纸板管（纸巾或卫生纸卷筒）", "吸管", "小纸杯", "可选：黄铜扣、橡皮筋、直尺"] },
      ] },
      { title: "你的设计目标", blocks: [
        { type: "paragraph", text: "真正的工程师是按具体指标被打分的，不是按感觉。你的指标在这儿：" },
        { type: "numbered", items: [
          { title: "载货", body: "顶上要稳住一个装了 3 枚硬币或 3 块小石头的小杯。翻了就算任务失败。" },
          { title: "过地形", body: "滚过一张揉皱的笔记本纸，不能卡住，也不能停在半路。" },
          { title: "扛住跌落", body: "从膝盖高度松手。落地后要还是一整块，而且还能滚。" },
          { title: "附加挑战：机械臂", body: "加一个从车身伸出去的东西，像探测车的机械臂，能往地面探下去，而整辆车原地不动。" },
        ] },
      ] },
      { title: "你的设计约束", blocks: [
        { type: "paragraph", text: "每一份真实的工程工作，都带着一堆不是你自己挑的规则。在这些规则里干活，就是这份工作的全部。你的规则如下：" },
        { type: "list", items: ["必须能装进一个鞋盒", "不许用热熔胶，只能用胶带和扣件", "轮子必须是圆的。真的圆，不是差不多圆", "计时 45 分钟", "测试之前，你得说清楚自己做的某一个决定，以及为什么"] },
      ] },
      { title: "搭建前要思考的工程问题", blocks: [
        { type: "numbered", items: [
          { title: "几个轮子？", body: "四个比三个稳，但你每加一个轮子就是多一份重量，也多一个会断的地方。真的探测车用六个，每一个都单独装着，这样一块石头掀不翻整辆车。" },
          { title: "重量放在哪？", body: "重心高就爱翻，重心低就稳得住。把重的零件尽量压到贴近地面。" },
          { title: "轮距多宽？", body: "左右轮之间的间距叫轨距。宽一点更难侧翻，窄一点更能钻缝。挑你想要哪个麻烦。" },
          { title: "一个轮子撞上坑怎么办？", body: "车轴如果是硬连的，一个坑会把整侧抬起来。真的探测车用摇臂转向架悬挂，让每个轮子各走各的。现在是有意思的问题了：你能不能用纸板和胶带把这个效果糊出来？" },
        ] },
      ] },
      { title: "测试后问这些问题", blocks: [
        { type: "list", items: ["载货测试的时候它翻了吗？重量当时都堆在哪儿？", "揉皱的纸把它拦下来了吗？是轮子陷进去了，还是车底在拖地？", "它扛住那一摔了吗？如果没有，最先散架的是哪一块？", "要是有人再给你十分钟，你只改一件事的话会改什么？"] },
        { type: "paragraph", text: "把答案写下来，或者画出来。那一页纸，就是第一版和真正更好的第二版之间的区别。" },
        { type: "quote", text: "一个学生在他的探测车前端用一条弯曲的纸板条加了一个斜坡，说是用来推开石头的。我问他有没有在真正的探测车上见过这个，他说没有，他只是觉得会有用。这就是正确的思考方式。", attribution: "Noah Lopez，Avanza STEM 导师" },
      ] },
      { title: "与真实探测车的联系", blocks: [
        { type: "paragraph", text: "此刻正在火星上跑的毅力号重约 1025 千克，六个轮子各自独立运动。它带着摄像机、麦克风、一把钻，还有一整架叫机智号的直升机。每一个零件都得轻到能发射、结实到能扛住着陆、可靠到在没人帮忙的情况下连续工作好几年。" },
        { type: "paragraph", text: "重量分布、轮子数量、离地间隙、载荷。这些正是 NASA 的探测车工程师吵来吵去的问题。你在回答的是同一批问题，唯一的差别是预算。" },
        { type: "ctaLink", title: "亲身体验工程", text: "在我们的工作坊，学生会接下这样的设计挑战，然后飞快地发现自己的作品到底扛不扛得住。", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "你在 AI 聊天框里敲一个问题，三秒钟后那儿就躺着一整段话。刚才到底发生了什么？大多数人以为它搜了网、从某个巨大的数据库里捞了答案，或者查了某处存好的知识。全都不对。" },
        { type: "paragraph", text: "真实发生的事更怪一点。AI 一次一个词地预测接下来该出现什么文字，靠的是它从一大堆文字里吸收来的规律。就这些。说实话，这比大家想象的那个版本有意思多了。" },
      ] },
      { title: "它更像自动补全，而不是搜索引擎", blocks: [
        { type: "callout", accent: "teal", text: "想想手机上的自动补全。它根据「你这种消息里通常接什么」来猜下一个词。语言模型干的是同一件事的加强版，只是复杂得多得多。" },
        { type: "paragraph", text: "AI 给你写回复的时候，不是从架子上取下一个存好的答案。它在算：在前面这一切之后，哪个词最可能出现。然后再算一次，再算一次，一直到答案写完。" },
        { type: "paragraph", text: "所以它才回得这么快。它不是坐在那儿像你一样推理你的问题，而是在飞快地跑一个模式计算，一遍又一遍。" },
      ] },
      { title: "AI 是如何学会该说什么的", blocks: [
        { type: "numbered", items: [
          { title: "它读了荒谬多的文字", body: "文章、书、网站、代码，全都读。这给了它数十亿个「人类实际上怎么用语言」的例子。" },
          { title: "它找到了规律", body: "不是谁敲进去的规则，而是统计规律：在这串词之后，这些词往往会跟着出现。这些规律缠得太紧，一句话讲不清，但它们只是规律而已。" },
          { title: "人给它打了分", body: "真人评估哪些回复更有用、更准确、更合适。模型根据这些反馈往那个方向偏。" },
          { title: "现在它回答你", body: "你问一句，它用那一大堆规律生成一段长得像「有用答案」的文字，参照的就是它训练时见过的那些有用答案。" },
        ] },
      ] },
      { title: "为什么它可以听起来对但实际上是错的", blocks: [
        { type: "paragraph", text: "问题就在这儿。AI 生成的是统计上很可能的文字，不是被核实过的文字。所以它可以给你一段自信、漂亮、彻头彻尾错误的东西。大家管这个叫幻觉：AI 用讲真话的那种语气，说了一件不是真的事。" },
        { type: "list", items: ["它不知道自己不知道什么", "它会把不同场合里相似的名字、日期或事件搅在一起", "它产出的是听着合理的东西，不是被验证过的东西", "它没法说到一半跑去查一下自己" ] },
        { type: "callout", title: "诚实的版本", accent: "teal", text: "一个肯说「这个我不太确定」的 AI，比一个每次都笃定的有用得多。多追问几句。真正要紧的说法，去核实。" },
      ] },
      { title: "AI 真正擅长什么", blocks: [
        { type: "paragraph", text: "知道边界在哪，你才能把它用好，而不是要么全信要么完全不碰。" },
        { type: "list", items: ["把同一个概念换五种说法，直到有一种终于让你懂了", "几秒钟内吐出提纲、草稿和例子", "总结它训练时覆盖得很充分的话题", "在你卡住需要选项的时候陪你头脑风暴", "帮你改写和润色你已经写好的东西", "写出你之后要亲自跑一遍、测一遍的代码"] },
        { type: "paragraph", text: "当答案必须是确凿正确的时候，比如一个具体事实、一个医疗问题、任何跟法律有关的东西，就去用真实来源核对。每一次都要。" },
      ] },
      { title: "一个好习惯：让它解释自己", blocks: [
        { type: "paragraph", text: "下次 AI 给你答案，接着追一句：「你是怎么知道的？」或者「我去哪儿能核实这个？」回来的内容会告诉你很多。" },
        { type: "callout", accent: "teal", text: "在我们的 AI 工作坊，学生会挑一条 AI 回复去做事实核查。重点不是教孩子 AI 很糟，而是像读任何来源一样读它，脑子开着。" },
        { type: "quote", text: "我问了一位科学家的事，它把发现日期说错了三十年。如果我们没有去查，我就会相信了。现在我会去查了。", attribution: "Avanza STEM AI 工作坊的一名学生" },
      ] },
      { title: "这对孩子和家长意味着什么", blocks: [
        { type: "paragraph", text: "孩子反正都会在这些工具里长大。大致知道它们在做什么、又绝对做不到什么，会改变他们读每一条答案的方式。" },
        { type: "list", items: ["把 AI 更多用在头脑风暴和起草上，少用在钉死某个具体事实上", "任何重要的东西，都拿第二个来源对一遍", "它听起来太笃定的时候要起疑，然后追问一句", "记住它不是总在错。它只是也不总在对"] },
        { type: "paragraphWithLink", before: "想先补一下 AI 怎么从数据里学习、都有哪些类型？从我们早先那篇开始：", linkText: "什么是 AI？向孩子解释人工智能", href: "/blog/what-is-ai-explaining-to-kids", after: "。" },
        { type: "ctaLink", title: "亲身了解 AI", text: "在我们的 AI 工作坊，学生会亲手搭简单的 AI 系统，去抓它们犯的错，再一起聊聊自己发现了什么。", linkText: "查看近期工作坊", href: "/workshops", accent: "teal" },
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
        { type: "paragraph", text: "你叫得出名字的发明，几乎每一个都始于某人被烦到了。拉链之所以存在，是因为鞋带老是自己散开。便利贴出自一种弱到没用的胶水。魔术贴来自一个男人在田野里散步，一路给他的狗摘苍耳。" },
        { type: "paragraph", text: "他们都不是坐下来打算发明点什么。他们只是注意到一件让自己不爽的事，然后问了一句：这事有没有更好的做法？" },
      ] },
      { title: "发明家循环", blocks: [
        { type: "paragraph", text: "不用实验室，不用特殊套件，也不用谁批准。四个步骤，二十分钟左右，就够了。" },
        { type: "numbered", items: [
          { title: "找到一个问题", body: "往小了找，往烦人了找。老是自己关上的门。永远插不牢的充电线。每次都卡在同一颗齿上的拉链。小烦恼比大问题好用，因为小烦恼你真的能测试一个解决方案。" },
          { title: "画出一个解决方案", body: "把修法画出来。哪怕是笔记本上一坨歪歪扭扭的形状也算。你不是在做艺术，你是在把想法具体到别人能跟你争论的程度。" },
          { title: "搭一个粗糙原型", body: "手边有什么用什么：纸、胶带、纸板、橡皮筋。它不用好看，它得能测。" },
          { title: "测试它", body: "现在试着把它弄坏。如果第一次就轻轻松松扛过去了，说明你测得太温柔。找出弱点。恭喜，那就是你的下一个问题。" },
        ] },
      ] },
      { title: "找到值得解决的问题", blocks: [
        { type: "paragraph", text: "第一步卡住的人最多，倒不是世界上缺问题。是因为我们都特别擅长忽略小烦恼，而不是注意到它们。" },
        { type: "callout", accent: "purple", text: "在我们的工作坊，我们给学生一分钟安静时间，让他们绕着房间走一圈，写下三件本可以做得更好的事。几乎所有人回来时至少写了两件。" },
        { type: "list", items: ["什么事花的时间明显比该花的长？", "什么东西坏得比该坏的频繁？", "你是不是总在用某个别扭的姿势拿着某样东西？", "有没有什么事你天天都得做，而你真心希望不用做？"] },
        { type: "paragraph", text: "然后从清单里挑最小的那个。一个能拿在手里的问题，比一个城市那么大的问题好解决太多了。" },
      ] },
      { title: "为什么搭建前先画草图很重要", blocks: [
        { type: "paragraph", text: "草图不是画，是一个决定。你一落笔就必须表态：铰链装这儿，这一侧打开，握把大概这么宽。" },
        { type: "paragraph", text: "正是这个表态让想法变得可测。不画草图你就边做边改，也行，但更慢，而且你永远不会发现现实什么时候偏离了原来的打算。有草图，你看得见那个差距。" },
        { type: "callout", title: "一条规则", accent: "purple", text: "在画出至少一个版本之前，一样材料都别碰。草图不用好看，它只需要存在。" },
      ] },
      { title: "什么算原型", blocks: [
        { type: "paragraph", text: "原型是你能真正测试的、最快的那一版想法。它不是产品，不该好看。它唯一的任务是告诉你一件你原本不知道的事。" },
        { type: "list", items: ["用胶带别用胶水，因为五分钟后你就要把它拆了", "用最简单的形状去测你真正在意的那一件事", "为了回答一个问题而搭：铰链撑得住吗？装得下吗？滑得动吗？", "如果超过 10 分钟，说明你在过度设计"] },
      ] },
      { title: "20 分钟发明家挑战", blocks: [
        { type: "summary", timeLabel: "时间", time: "共 20 分钟", ageLabel: "适合年龄", age: "8 岁及以上", supervisionLabel: "材料", supervision: "纸、胶带、纸板、剪刀、橡皮筋，以及你能找到的任何东西", learnLabel: "你练习的内容", learn: "问题识别、设计思维、快速原型制作和迭代" },
        { type: "callout", title: "现在试试", accent: "purple", text: "定一个 20 分钟的计时器。在这个房间里找出一个问题。画一个修法。搭一个粗糙版本。测一次。然后写下如果多给你十分钟，你唯一会改的那件事。" },
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
        { type: "paragraph", text: "我们办的工程工作坊，几乎每一场都有桥倒。而搭桥的孩子脸上几乎都是同一个表情。不是被打垮，是在想事。" },
        { type: "paragraph", text: "那个表情就是迭代从内部看起来的样子。哪怕已经没时间重搭，那一次测试也彻底改写了他对自己设计的看法。" },
      ] },
      { title: "「完成品」的迷思", blocks: [
        { type: "paragraph", text: "大家总有个印象：好设计来自一个聪明人在动手之前想得特别透。工程根本不是这么运作的。写作、音乐，基本上任何值得做的事都不是。" },
        { type: "paragraph", text: "设计是靠撞上现实变好的。你没法坐在椅子上想出一座更结实的桥。你得搭一座，往上压重量，看它从哪儿断，然后你就知道了一件之前不知道的事。" },
        { type: "callout", title: "核心思想", accent: "purple", text: "你的第一个设计不是产品，是一个猜测。测试就是你验证这个猜测靠不靠谱的方式。" },
      ] },
      { title: "一个真实的工作坊案例", blocks: [
        { type: "paragraph", text: "在克利夫顿公共图书馆的一节桥梁课上，一个小组做完了冰棍棒桥，开始往上摞书，然后眼看着整整一侧扭了过去，桥终于撑不住。" },
        { type: "numbered", items: [
          { title: "第一个线索：它侧着扭了", body: "在断掉之前，他们注意到一侧比另一侧歪得多。这就是信号。问题不只是重量太大，而是支撑不均匀。" },
          { title: "薄弱点：没有斜撑", body: "他们的侧桁架是一串长长的空矩形，不是三角形。重量一上来，矩形就直接改变形状，整座桥就软了。" },
          { title: "快速修补：一处对症的加固", body: "用剩下的几分钟，他们给弱的那一侧加了斜撑，还讨论了第二版里对称的斜撑该装在哪儿。" },
          { title: "收获：测试直接送了他们一个更好的设计", body: "他们从没重建整座桥，也不需要。一次诚实的测试已经准确告诉他们，下一座必须扛住什么。" },
        ] },
        { type: "quote", text: "它就在我们没加固的地方断了", attribution: "Monica，Avanza STEM 工程工作坊的学生" },
      ] },
      { title: "为什么重来不是从零开始", blocks: [
        { type: "paragraph", text: "测试之后做出改动，不叫从头再来。你带着一条第一版根本拿不到的信息往前走。" },
        { type: "callout", accent: "purple", text: "迭代不一定意味着在下课前把整个东西重搭一遍。有时候它就是一处聪明的调整、一张更好的草图，或者随手写下的一条给下次的笔记。" },
        { type: "paragraph", text: "有经验的工程师厉害的地方就在这儿。他们第一次未必做得更好，他们只是特别会读第一次到底在说什么。" },
      ] },
      { title: "只改一处规则", blocks: [
        { type: "paragraph", text: "东西坏了、你还有时间修的时候，在下次测试前只改一处。听着简单，其实不简单，因为你全身的本能都想一次把所有毛病都治了。" },
        { type: "paragraph", text: "改三处，下一版扛得更多？很好，可到底是哪一处起的作用？你完全不知道。你只是运气好，而运气不会跟着你走到下一次搭建。" },
        { type: "list", items: ["挑那个直击失效点的改动", "时间允许的话，就只做这一处", "用同样的方式再测一遍，这样对比才有意义", "写下发生了什么，或者你下一步想试什么", "让那条笔记来决定下一版的设计"] },
        { type: "ctaLink", title: "搭点什么并测试它", text: "在我们的工程工作坊，学生会搭一个结构、往上压到它失效，再弄清楚这堆残骸到底在告诉他们什么。", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "此刻挂在你肩上的那个包，正在悄悄同时解决大约十几个工程问题。背带把重量从手上卸走。加厚背板把压力摊开在你背上。拉链开合几千次还在工作。面料结实、轻、基本防水，而且便宜到一个学生买得起。" },
        { type: "paragraph", text: "这里头没有一件是碰巧的。每一个问题都有人坐下来吵过、试过一个方案，然后又试了一遍。" },
      ] },
      { title: "重量分配问题", blocks: [
        { type: "paragraph", text: "单手拎 10 磅走一个街区，你的胳膊就废了。同样 10 磅背在背上，你几乎没感觉。这不是你厉害，这是物理。挂在手上的包会产生一个力臂，把你肌肉要出的力放大好几倍。书包把这份重量直接贴到你的脊椎旁边，数学立刻友好了很多。" },
        { type: "paragraph", text: "肩带干的活也不止是把包挂住。更宽的带子把完全相同的重量摊到更大的面积上，于是任何一点上的压强都下来了。雪鞋用的就是同一个原理。加厚也有用，因为它会稍微压扁，把力摊匀，而不是勒成一条线。" },
        { type: "callout", title: "装包顺序", accent: "purple", text: "重的东西尽量贴着背，轻的往外放。这样重心留在脊椎旁边，而不是把你往前拽、顺便毁掉你的下背。" },
      ] },
      { title: "拉链究竟是怎么工作的", blocks: [
        { type: "paragraph", text: "凑近看拉链，你会看到两排面对面的齿。每颗齿一面有个小凸起，另一面有个对应的凹坑。你一拉拉头，它就把每颗齿摆到位，让一边的凸起正好落进另一边的坑里。咔。咔。咔。" },
        { type: "paragraph", text: "所以拉好的拉链才那么牢。咬合住的齿既不肯被拉开，也不肯横向滑走。反方向走的时候，拉头会把一片小小的楔子插进两排之间，一对一对地把齿撬开。" },
        { type: "list", items: ["金属拉链更耐用，但更重", "塑料螺旋拉链更轻，也能顺着弧形接缝弯", "全世界大多数拉链都是 YKK 做的，稍微像样点的包上都能找到这个标", "拉链坏掉通常是拉头被撑宽了，用钳子轻轻夹一下，有时候真能救回来"] },
      ] },
      { title: "材料与权衡", blocks: [
        { type: "paragraph", text: "根本不存在完美的书包面料。每一种都在重量、耐用、防水和价格之间做取舍，总得有人拍板。" },
        { type: "numbered", items: [
          { title: "尼龙", body: "结实、轻，还特别抗刮。贵一点的包基本都用它，因为它能撑好几年，还不怎么加重量。" },
          { title: "聚酯", body: "比尼龙略重一点，更便宜，晒久了也不容易褪色。大多数学生书包用的就是这个。" },
          { title: "帆布", body: "又硬又沉，但它喝水。走去教室完全没问题，下雨天进山就很难受了。" },
          { title: "防撕裂布", body: "织的时候在里面加了一层加强线格。撕开一个口子，那层格子会当场把裂口拦住。高性能背包爱用它。" },
        ] },
        { type: "paragraph", text: "还有一件大多数人不知道的事：防水靠的是面料内侧的一层涂层，不是面料本身。那层涂层会一年年磨掉，所以旧包外面看着好好的，一淋雨就湿透。" },
      ] },
      { title: "口袋系统", blocks: [
        { type: "paragraph", text: "那些口袋不是随手撒上去的。每一个都是有人对「你会怎么带东西」下的一个赌注。" },
        { type: "list", items: ["主仓的尺寸是围着笔记本、笔电内胆或者一件叠好的卫衣定的", "前袋放你一直要拿、又不想让它在包里乱飘的东西", "侧袋是照着水瓶的形状做的，因为这个形状到处都是，好预测", "顶上那个小袋，是为了让你不用把整个包拉开就能拿到东西", "内部收纳格默认你带着笔、钥匙和手机"] },
        { type: "callout", title: "试试这个", accent: "purple", text: "像工程师一样给自己的书包打分。重量分配、拉链质量、面料和防水、口袋布局、走十分钟之后肩带的感受，各打 1 到 5 分。然后是真正的问题：你会先修哪一项？" },
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
        { type: "paragraph", text: "如果学生只是安静坐着看大人演示，那不是 STEM 工作坊，那是演讲。而演讲，就算讲得好，到第二天早饭基本也就没了。" },
        { type: "paragraph", text: "所以我们花在设计一节课上的力气，跟花在内容上的一样多。孩子在那个房间里做了什么，胜过我们能对他们说的任何话。" },
      ] },
      { title: "主动学习与被动学习的区别", blocks: [
        { type: "paragraph", text: "被动学习是看、听、接收。主动学习是搭、测、吵、把东西弄坏再修好。关于哪一种能留下来，研究结论根本不接近平手。" },
        { type: "paragraph", text: "但手忙不等于脑子在动。一个孩子可以半自动地粘三十分钟冰棍棒。真正的窍门是把活动设计成：动手这件事本身逼着你动脑。" },
        { type: "callout", accent: "purple", text: "我们工作坊里没人看导师搭桥。学生拿到材料、一个重量目标和大约 30 分钟。那些挫败感、跟搭档为了设计吵起来的过程、桥撑住了远超预期重量的那一刻，学习就发生在那儿。" },
      ] },
      { title: "我们如何设计 Avanza STEM 活动", blocks: [
        { type: "paragraph", text: "一个活动进课堂之前，得先扛过四个问题。" },
        { type: "numbered", items: [
          { title: "有没有一次真的测试？", body: "如果学生没法知道自己的想法成没成，那它就不是设计挑战，是手工课。我们每个活动最后都会有一个判决。桥撑住了吗？探测车过去了吗？代码跑起来了吗？" },
          { title: "它能不能以有意思的方式失败？", body: "有用的失败是功能，不是 bug。如果一个东西要么成功、要么莫名其妙散架，那就没什么可迭代的。最好的失败足够具体，具体到学生当场就知道该修哪儿。" },
          { title: "有没有不止一条路？", body: "只有一个正确答案的挑战会变成抢答比赛。有好几种做法都成立的挑战，才会逼学生做真决定，然后回头跟隔壁桌比结果。" },
          { title: "他们在互相说话吗？", body: "两个学生为了「该再加一根斜撑还是加固接头」来回争，不是跑题。那就是在做工程。" },
        ] },
      ] },
      { title: "学生在我们工作坊实际上做什么", blocks: [
        { type: "paragraph", text: "一节 60 分钟的课，一个学生通常会走过五六件不同的事：" },
        { type: "list", items: ["听两分钟的简介，只给目标和约束，别的什么都不给", "在碰任何材料之前，先和搭档为设计吵一架", "搭出第一版然后测，通常眼睁睁看它失败", "根据刚才看到的东西做一处具体改动", "再测一次，看看那处改动到底有没有用", "告诉全组自己学到了什么。不是搭了什么，是发现了什么"] },
        { type: "paragraph", text: "最后这一步几乎所有工作坊都跳过。可一旦要用嘴说出来，学生立刻就知道自己到底是懂了，还是刚才只是运气好。" },
      ] },
      { title: "为什么吵闹通常是个好兆头", blocks: [
        { type: "paragraph", text: "安静的教室让大人舒服。它通常意味着学生已经神游了。孩子七嘴八舌抢着说话，甚至吵起来的时候，那个房间在思考。" },
        { type: "quote", text: "我以为他们因为拉链的事闹得太厉害而跑题了。但后来我仔细听，他们其实在争论摩擦力在曲线内侧还是外侧更大。这正是我们想要的。", attribution: "Avanza STEM 科学课后的一位导师" },
        { type: "paragraph", text: "在那种时刻，导师的活儿不是让谁安静下来，而是丢进一个问题，把这场争论削得更锋利。" },
      ] },
      { title: "我们始终包含的三件事", blocks: [
        { type: "numbered", items: [
          { title: "一次有真实结果的真实测试", body: "不是「大家都很棒」，是对照我们一开始就说出口的那个目标，判个过或不过。" },
          { title: "一种具体的失败方式", body: "如果第一次什么都顺，那就没人摸到极限在哪儿。" },
          { title: "说出自己想明白了什么的时间", body: "只搭不复盘就只是活动。复盘才是它真正扎下来的地方。" },
        ] },
        { type: "ctaLink", title: "来看一次工作坊", text: "我们的工作坊免费、全程动手，谁都能来。这辈子什么都没搭过也可以直接走进来。", linkText: "查看近期工作坊", href: "/workshops", accent: "purple" },
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
        { type: "paragraph", text: "校车看起来是这世上最简单的车了。一个大黄箱子、几排座位、闪着的灯，还有隔两条街都听得见的引擎。可这辆车上几乎每一处，都是有人在解一道题的答案：怎么把一大群孩子拉走，然后把每一个都完好无损地送到家？" },
        { type: "paragraph", text: "一旦知道该看什么，校车就不无聊了。我们来把它拆开。" },
      ] },
      { title: "为什么校车是黄色的？", blocks: [
        { type: "paragraph", text: "没人是因为「这个黄好看」才选它的。选它，是因为在清晨的光里、在下午刺眼的反光里、在阴沉的天空下，你的眼睛都能立刻抓到它。安全设计师要的就是一种在你意识到自己看见之前就已经看见的颜色。" },
        { type: "paragraph", text: "再加上闪灯、伸出来的停车牌，还有这玩意儿本身的体积。所有这些都在说同一句话：慢下来，这儿有孩子。这辆车被设计成不可能被忽略。" },
      ] },
      { title: "座位是安全工具", blocks: [
        { type: "paragraph", text: "那些座位看着平平无奇，其实在干正经活。大多数校车用一个叫「隔舱化」的招数：座位又高、垫得很厚，而且是故意排得很密。车一个急刹，你前面那个椅背就像一堵软墙把你接住。" },
        { type: "paragraph", text: "下面的框架也做得足够硬，硬到能扛住坑洼、急转弯，还有大约十年里不停往上爬的学生。校车座椅不是家具，它是安全系统的一部分。" },
      ] },
      { title: "为什么司机能看到这么多？", blocks: [
        { type: "paragraph", text: "司机得同时盯着路、孩子、车门、人行道和周围每一辆车。所以那些后视镜大得有点滑稽。有的照车后，有的角度专门去抓保险杠正前方那块盲区，一个小孩站在那儿可能整个人都消失。" },
        { type: "paragraph", text: "在这么大一辆车上，视野是最难的问题之一。工程师基本上是在想办法让司机看到校车自己挡住的地方。" },
      ] },
      { title: "转动一辆巨型车辆", blocks: [
        { type: "paragraph", text: "校车比小汽车长太多，于是每一次转弯都变成一道数学题。工程师管它叫转弯半径：一辆车绕过去需要多大空间。在窄街上，校车要的空间比你家的车多得多。" },
        { type: "paragraph", text: "所以当司机在转弯前先往外甩一点，他不是在耍帅。他是在服从几何。" },
      ] },
      { title: "紧急出口无处不在", blocks: [
        { type: "paragraph", text: "下次上车数一数出口。前门、后面的紧急门、车顶舱盖、能推出去的窗户。好的工程不只为正常的一天做准备，它为一切都不正常的那一天做准备。" },
        { type: "callout", title: "为什么要这么多出口？", accent: "purple", text: "前门被堵住了怎么办？车翻到一侧了怎么办？四十个孩子要在一分钟内出去怎么办？工程师在任何人真的经历这些之前，就已经把这些「如果」全问过一遍了。" },
      ] },
      { title: "试试这个：设计你自己更安全的校车", blocks: [
        { type: "paragraph", text: "拿张纸，画你自己的校车。后视镜、出口、座位布局、灯、标识、窗户、储物空间都画上。规则只有一条：你画的每一个部件，都得说出它解决了什么问题。" },
        { type: "callout", title: "工程师的问题", accent: "purple", text: "工程师不会问「这看起来酷不酷」。他们问的是「这东西干什么用，它解决了什么问题」。把这个问题套到你图上的每一根线，看看还剩下几根。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "下次有校车从你身边开过去，认真看一眼。颜色、后视镜、座位、出口，甚至它拐弯的方式。每一样都是有人特意做出的决定。那辆车就是装了轮子的工程学。" },
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
        { type: "paragraph", text: "机翼大概是整个工程界最疯的一份工作。一架满载的波音 777 大约 135 吨，两片机翼把它劝上了天。停下来想两秒。这么重的东西凭什么能离地？" },
        { type: "paragraph", text: "答案大半藏在形状里。" },
      ] },
      { title: "机翼不是平的", blocks: [
        { type: "paragraph", text: "找机会从侧面看一眼机翼。它不是一块板。上面拱起来一个弧，下面平得多。工程师管这个形状叫翼型，它存在只有一个理由：用一种非常特定的方式去搅动空气。" },
        { type: "paragraph", text: "飞机往前冲的时候，空气被劈开，从机翼上下两侧绕过去。这个形状让机翼上方的空气压力低于下方。下面压得多，上面压得少，机翼就被往上顶。那一顶，就是升力。" },
      ] },
      { title: "升力不是魔法", blocks: [
        { type: "paragraph", text: "升力不是一个聪明的小把戏，更绝对不是魔法。机翼管用，是因为它改变了空气往哪儿去。切过天空的时候，机翼把一大堆空气往下甩。牛顿第三定律说每个作用力都有等大反向的反作用力，所以机翼把空气往下推，空气就把机翼往上推。两件事在同时发生：" },
        { type: "numbered", items: [
          { title: "它制造出压力差", body: "从弯曲上表面走的空气跑得更快，那里的压力就掉到了下方之下。" },
          { title: "它把空气往下甩", body: "机翼把气流拐向地面，反作用力就把飞机推向天空。" },
        ] },
      ] },
      { title: "为什么飞机需要速度？", blocks: [
        { type: "paragraph", text: "停在跑道上的飞机哪儿也去不了，机翼再好也没用。机翼必须有空气从它身上冲过去才干得了活。跑得更快，赶动更多空气，拿到更多升力。" },
        { type: "paragraph", text: "跑道上那一段长长的冲刺，全部意义就在这儿。发动机把飞机往前推，空气开始从机翼上倾泻而过，到某一个确切的速度，升力终于赢过了重量。轮子离地。" },
      ] },
      { title: "那些襟翼是什么？", blocks: [
        { type: "paragraph", text: "起飞或降落的时候盯着机翼看，你会看到一块块东西滑出来、往下翻。那是襟翼和缝翼，它们在飞行途中直接改变机翼的形状，好在低速时硬挤出更多升力。" },
        { type: "paragraph", text: "这很关键，因为起飞和降落恰恰是飞机没法开快的时候。谁也不想一架喷气机贴着地面以每小时八百公里飞过去，所以工程师干脆给机翼装上了会动的零件。" },
      ] },
      { title: "试试这个：纸翼测试", blocks: [
        { type: "paragraph", text: "拿两张纸。一张折成最基础的纸飞机，另一张保持平的。用同样的方式扔出去。折过的那张飞去了某个地方，平的那张扑腾两下就死了。同样的纸、同样的手劲，完全不同的形状。" },
        { type: "callout", title: "形状很重要", accent: "purple", text: "工程师在风洞里试机翼形状，在模拟里试，最后才在真飞机上试。一个你用大拇指就能盖住的改动，都可能明显改变一片机翼能产生多少升力。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "机翼是弯的，因为形状控制空气，空气造出升力，升力打赢重力。所以下次有飞机从你头顶划过去，别把功劳全给发动机。那两片机翼是精密工具，正安安静静地把流动的空气，变成一条离开地面的路。" },
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
        { type: "paragraph", text: "你按下按钮。门滑上。有个东西在嗡嗡响。三十秒后你走出来，正好是你要去的那一层。感觉像什么都没发生。其实那是一台跑着传感器、电机、钢缆、配重和一大堆逻辑的机器，为的就是让谁都不用去想它。" },
        { type: "paragraph", text: "那么这玩意儿到底怎么知道你想去哪儿？" },
      ] },
      { title: "按钮发送请求", blocks: [
        { type: "paragraph", text: "按按钮并不是在控制电机。你没在开车。你是在给电梯的控制系统提交一个请求，那基本上就是它的大脑，而这个大脑已经在盯着这些事：" },
        { type: "list", items: ["轿厢此刻停在几楼", "所有人按过的每一个按钮", "它已经在往哪个方向走", "门是开着还是关着", "有没有东西卡在门口"] },
        { type: "paragraph", text: "它从来不猜。每一次移动都来自这份清单。" },
      ] },
      { title: "传感器告诉电梯它在哪里", blocks: [
        { type: "paragraph", text: "电梯得知道自己在井道里的位置，所以一路上下都有传感器在跟着轿厢。这些读数告诉系统什么时候开始减速、什么时候停，以及轿厢有没有真的跟楼面对齐。" },
        { type: "paragraph", text: "最后一条比你想的重要。停高了五厘米，走出来的每个人都可能被绊一下。所以电梯是按毫米级的精度设计着陆的。" },
      ] },
      { title: "电机做重活", blocks: [
        { type: "paragraph", text: "电机转动滑轮，滑轮拉钢缆，钢缆拉轿厢。到这儿都挺直白。但聪明的地方在这儿：大多数电梯还在另一头挂了一块配重。轿厢上去，配重下来；轿厢下来，配重上去。" },
        { type: "paragraph", text: "这个平衡意味着电机不用去硬扛一整个满载轿厢的重量。它更像跷跷板，不像吊车，省下的电多到吓人。" },
      ] },
      { title: "电梯使用简单逻辑", blocks: [
        { type: "paragraph", text: "假设轿厢在 1 楼，有人按了 3、5 和 2。它不会按大家按下的先后顺序跑，而是一路往上，顺手接走 2 楼，再接 3 楼，再到 5 楼，一个方向扫过去。没有多余的来回，也没人被晾在那儿。" },
        { type: "paragraph", text: "在真正的高楼里这套会精明得多。有些系统在你上电梯之前就先问你去几层，然后按目的地把人分组，好让每一部轿厢少停几次。" },
      ] },
      { title: "安全是第一位的", blocks: [
        { type: "paragraph", text: "电梯身上堆满了安全系统。门传感器不让它夹到你的胳膊。制动器会在轿厢不该动的时候把它咬住。备份系统在某个零件失效时接手。有一大群人花了很久去想象所有可能出错的情况，好让你永远不用去想。" },
      ] },
      { title: "试试这个：电梯逻辑游戏", blocks: [
        { type: "paragraph", text: "轮到你当控制器了。画一栋 6 层的楼，把轿厢放在 2 楼。5 楼有人要下楼。1 楼有人要上楼。已经在里面的人按了 4。你按什么顺序跑？" },
        { type: "callout", title: "没有唯一的正确答案", accent: "purple", text: "这里没有完美解，这才是重点。工程师要同时兼顾速度、公平、安全和能耗。你愿意先放弃哪一个？" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "电梯并不像你「知道」东西那样知道任何事。它读传感器、跑逻辑、转电机。下次坐的时候记住，墙里面有一整套工程系统在安静地干活，而你要做的只是按一下按钮。" },
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
        { type: "paragraph", text: "在刮风的日子站到摩天大楼靠顶的位置，你会感到脚下的地板在移。就一点点。你的大脑会立刻告诉你出事了。你的大脑错了。那个移动就是设计在起作用，而一栋能稍微晃一晃的楼，通常比死活不肯动的那种更安全。" },
      ] },
      { title: "风会推压建筑", blocks: [
        { type: "paragraph", text: "风吹过你脸的时候什么感觉都没有。把它砸在六十层高的一整面玻璃墙上，它就成了一个相当可怕的力。你盖得越高，接住的这份力就越多。所以在浇第一方混凝土之前，工程师得先回答几个让人不太舒服的问题：这里的风最狠能到多大，我们要盖多高，什么形状受风最小，它会晃多少，还有楼里的人会不会晕。" },
        { type: "paragraph", text: "摩天大楼不只是在撑住自己。它在跟流动的空气打一场没有尽头的架。" },
      ] },
      { title: "柔性可以更安全", blocks: [
        { type: "paragraph", text: "掰一根干树枝，它干脆地断了。掰一根活的树枝，它就跟着你走。建筑也一样。做得太硬，一阵大风或者一次地动就没地方送那份能量，于是能量在结构内部越积越多，直到某处让步。" },
        { type: "paragraph", text: "一栋能弯的楼会吃掉一部分能量，再把剩下的摊开。这里的「弯」不是软弱，而是计划本身。" },
      ] },
      { title: "地震也会震动建筑", blocks: [
        { type: "paragraph", text: "风是从外面把楼往旁边推。地震是从底下往上打。地面动，楼的底部跟着动，上面所有东西都得临时想办法应对。" },
        { type: "paragraph", text: "工程师的反击手段是强框架、柔性节点、阻尼器，还有能滑动或隔震的地基。目标几乎从来不是让楼一动不动，而是让它站着、让里面的每个人活着。" },
      ] },
      { title: "有些建筑有巨大的阻尼器", blocks: [
        { type: "paragraph", text: "有些摩天大楼在靠顶的位置藏了一块巨大的重锤，叫调谐质量阻尼器。想象一个房间那么大的钟摆。楼往一边倒的时候，阻尼器往另一边荡，把这份运动抵消掉。" },
        { type: "callout", accent: "purple", text: "那就是内建在楼里的一记反手。从人行道上你看不见它，但在刮大风的日子里，它就是楼上没人晕船的原因。" },
        { type: "image", src: "/images/blog/Ball in the middle of Taipei 101.jpg", alt: "悬挂在台北 101 内部的 660 吨金色调谐质量阻尼器球，从观景台可以看到", caption: "台北 101 重达 660 吨的金色阻尼器球悬挂在约第 88 层附近。当风把建筑推向一边时，这个钟摆向反方向摆动，抵消内部人员会感到的运动。" },
      ] },
      { title: "形状也很重要", blocks: [
        { type: "paragraph", text: "楼的形状决定了风怎么绕着它走。尖角、平面、又高又瘦的剖面，每一种对空气的处理都不一样。所以工程师会做出缩比模型塞进风洞，看看空气到底会干什么。" },
        { type: "paragraph", text: "然后开始改。把角磨圆、在塔身上开洞、把整个剖面拧一下。一栋摩天大楼看起来奇怪的时候，那个形状通常正在干活。" },
      ] },
      { title: "试试这个：纸塔测试", blocks: [
        { type: "paragraph", text: "用纸搭两座塔。一座做得又直又硬，另一座留点松、带点弹。现在对它们吹气，或者撞一下桌子。哪座先倒？哪座弯下去一大截又弹回来？" },
        { type: "callout", title: "工程师研究的就是这个", accent: "purple", text: "那就是真问题的迷你版。它从来不只是「它站得住吗」，而是「有东西推它的时候，它会怎么反应」。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "建筑摇晃，是因为风和地震在推它，而一点点的移动正是一个结构熬过这份推力的方式。所以当一栋摩天大楼在暴风里偏出去几厘米，没有人搞砸。是有人把活干对了。" },
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
        { type: "paragraph", text: "你家车库里那个球，比看上去要严肃得多。老足球是皮的，而皮会喝水，所以下雨天打到下半场，球员基本上是在踢一块湿砖头。今天的比赛用球是用材料科学、面板几何和二十年前根本不存在的工厂技术堆出来的。" },
      ] },
      { title: "四层结构解析", blocks: [
        { type: "paragraph", text: "把一颗真正的比赛用球剖开，你会看到四层，每一层都有它非在不可的理由：" },
        { type: "list", items: [
          "气囊：正中间那个气球，通常是丁基或乳胶橡胶，负责兜住空气。丁基保压更久，乳胶手感更软、回弹更好。厂商各自挑毒药。",
          "衬里：裹在气囊外面的一层层聚酯和棉织物。就是它让球在被踢一万次之后还是圆的，而不是慢慢变成一颗蛋。",
          "泡沫缓冲层：外壳底下的一层聚氨酯或 EVA 泡沫。挨到一脚时它压扁再弹回，把你更多的力气射进这一脚里。",
          "外壳：外面那层合成皮。它死活不吸水，所以第 90 分钟的球和第 1 分钟一样重，而且它的纹理是特意做出来抓住空气的。",
        ] },
      ] },
      { title: "面板设计与空气动力学", blocks: [
        { type: "paragraph", text: "你肉眼能看到的最大变化就是面板。那种带黑色五边形的经典 32 块球到处都是接缝，而每一道接缝都是阻力。现代比赛用球只用 6 到 8 块就搞定，总接缝长度直接砍下去一大截。" },
        { type: "paragraph", text: "而且现在根本不是缝的了。热压和高频胶把面板粘成一个几乎无缝、完全不透水的整体。工程师用来模拟气流的软件，跟设计飞机用的是同一套。至于表面那些小凸起和凹槽？不是装饰。它们在控制贴着球表面的那层空气，这才是一脚重炮飞得笔直、而不是满天乱飘的原因。" },
      ] },
      { title: "动态平衡与马格努斯效应", blocks: [
        { type: "paragraph", text: "每一颗比赛用球都得通过动态平衡测试，意思是它的重量分布均匀到旋转起来不会摇。做砸了，球就会飘得毫无规律，球员恨死，厂商也会被骂上热搜。" },
        { type: "paragraph", text: "做对了，你就解锁了马格努斯效应。踢在偏离球心的位置，球开始转。旋转球面的一侧顺着空气走，另一侧顶着空气走。这个不平衡产生一个真实的横向力，把球在半空中掰弯。每一记绕过人墙的任意球，就是这个力在干活。" },
        { type: "callout", title: "马格努斯效应的实际体现", accent: "purple", text: "棒球的曲球会拐、网球的上旋会往下扎，用的是同一套物理。让球转起来，搅乱它周围的气压，球就会去到一个它本来没道理去的地方。" },
      ] },
      { title: "内嵌技术", blocks: [
        { type: "paragraph", text: "顶级比赛用球早就不只是皮和空气了。有些球里面用一套小支架吊着一个传感器，在三维空间里追踪运动，每秒回报 500 次。球在哪儿、跑多快、球鞋碰到它的确切那一瞬间。" },
        { type: "paragraph", text: "这条数据流就是半自动越位判罚和门线技术的底气，它能在几毫秒内告诉你整颗球有没有完全过线。现在球本身也算裁判组的一员了。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "足球不只是一个你拿来踢的东西。它是一套分层系统，材料科学、流体力学和传感器必须全部配合好。你见过的每一记不可思议的射门，都是从有人设计这颗球开始的。" },
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
        { type: "paragraph", text: "井盖听上去像是地球上最无聊的东西。一块沉甸甸的铁盖子，躺在马路上，被车压来压去。就这样，对吧？可它偏偏是个著名的工程谜题，面试官已经拿它折腾人几十年了。所以，它为什么是圆的？" },
      ] },
      { title: "圆形井盖不会掉进自己的洞里", blocks: [
        { type: "paragraph", text: "这是人人都知道的答案，而且它是真的漂亮。把一个圆转到任何角度，它横过来的宽度都一样。所以一块圆盖子在物理上根本掉不进同样大小的圆洞。它就是做不到。" },
        { type: "paragraph", text: "换成方的试试。正方形的对角线比边长长，所以把方盖子斜到某个角度，它就会直接顺着洞滑下去。下面还有工人。谁也不想被一块一百多公斤的铁板砸中，所以圆形赢了。" },
      ] },
      { title: "圆形井盖更容易移动", blocks: [
        { type: "paragraph", text: "这东西非常沉，有些比搬它的人还重。但圆的能滚。工人可以把它撬起来立成一个轮子，然后横穿马路一路推走。换成方的，四个角一路跟你作对。" },
        { type: "paragraph", text: "工程师会想着那些要跟这个设计过日子的人。形状只是其中一部分。总得有人抬它、挪它、换它，然后十五年后再来一次。" },
      ] },
      { title: "开口也是圆的", blocks: [
        { type: "paragraph", text: "往洞里看一眼，你会发现下面那个竖井本身就是圆的。圆形能把压力摊得很均匀，这也是管道是圆的而不是方的原因。圆洞配圆盖。盖子的形状是跟着它盖住的东西走的。" },
      ] },
      { title: "不需要对准方向", blocks: [
        { type: "paragraph", text: "从任何角度把一块圆盖子扔回圆洞上，它都合得上。每一次都合得上。方形的话，你得一边扛着一个跟你差不多重的东西，一边转它去对角。圆形省时间，还直接消灭了一整类会出错的方式。" },
      ] },
      { title: "坚固而简单", blocks: [
        { type: "paragraph", text: "那块盖子要扛小汽车、卡车、雨、雪、暴晒、结冰，还要扛大约二十年。圆形能把重量摊均匀，而不是全堆到几个角上。上面那些凸起的花纹也不是装饰，它们在那儿是为了让轮胎和鞋底在湿铁上还能抓得住。" },
      ] },
      { title: "试试这个：形状测试", blocks: [
        { type: "paragraph", text: "剪一个纸圆和一个纸方块。在另一张纸上剪出对应的洞。现在换尽可能多的角度，试着把每个盖子从自己的洞里塞进去。有一个会掉下去，另一个永远不会。" },
        { type: "callout", title: "一个设计，多种解决方案", accent: "purple", text: "这个纸测试就是工程师偏爱这个形状的全部原因。安全、结实、好挪、好放回去，一次全都占了。一个设计悄无声息地解决五个问题，工程能做到的差不多也就这样了。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "圆形井盖安全、结实、能滚，而且根本放不错。那就是一个形状在干五份活。下次跨过一个的时候，多看它一眼。那块铁圆比它表现出来的聪明。" },
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
        { type: "paragraph", text: "过山车看起来像在作弊。它拖着你爬上一个不可能的坡，一头栽下去，横着甩过弯，还把你倒过来，同时你的胃在提交投诉。那为什么车厢从来不脱轨？重力、动量、几组非常聪明的轮子，还有一群实在不想让你摔出去的工程师。" },
      ] },
      { title: "重力启动旅程", blocks: [
        { type: "paragraph", text: "开头那段哐当哐当的慢爬，是整趟车在充能。链条或弹射电机把车厢拖到顶，等它上去了，它光靠「离地面很高」这件事就存下了一大笔能量。工程师管它叫势能。" },
        { type: "paragraph", text: "然后轨道从你脚下消失，重力把这笔钱一次花光。储存的能量变成速度，也就是动能。第一个大俯冲不是为了让你尖叫，它是在为整趟车买单。" },
      ] },
      { title: "动量维持运动", blocks: [
        { type: "paragraph", text: "现在车在动了，而动着的东西就想继续动。这就是动量，它带你翻过后面那些小坡、过弯、穿环。" },
        { type: "paragraph", text: "可摩擦和空气阻力一路都在偷你的钱。所以设计师得卡住一个很窄的窗口：够快到能开回站台，又别快到危险。太慢会在环顶停住，太快力就变得很难看。" },
      ] },
      { title: "车轮的作用超乎你的想象", blocks: [
        { type: "paragraph", text: "车厢不是像汽车压马路那样只搁在轨道上。找机会看看它底下，你会发现三组轮子在干三份不同的活：" },
        { type: "list", items: ["走行轮，压在轨道上面", "侧向轮，顶着轨道外侧，在弯道里把车按在线上", "止脱轮，从轨道下面往上咬，倒过来的时候就是它把车锁死在轨道上"] },
        { type: "paragraph", text: "所以在翻环的时候，过山车不是在客客气气地指望重力配合。它是从三个方向被死死抱在轨道上的。" },
      ] },
      { title: "为什么你不会掉出来？", blocks: [
        { type: "paragraph", text: "压腿杆、安全带、肩部护具。给你哪一种，取决于这趟车接下来打算对你做什么。温和的家庭过山车只要一根压腿杆。任何会把你翻过来的，都会配上认真得多的固定系统。" },
        { type: "paragraph", text: "而设计目标其实有点狡猾。工程师要让你觉得自己勉强挂在上面，而事实上你被牢牢按在座位里。好的过山车感觉很不要命，实际上一点都不。" },
      ] },
      { title: "环形不是完美的圆", blocks: [
        { type: "paragraph", text: "有个细节大多数人从没注意过：过山车的环不是圆的。它是一个拉长的泪滴形，底下宽、顶上收紧。真正的正圆会在底部用巨大的力压垮你，然后在最高点把你甩得速度不够。" },
        { type: "paragraph", text: "泪滴形把这些力摊开，摊到你的身体扛得住。它看起来像一个造型选择，其实是给你脖子准备的救命方案。" },
      ] },
      { title: "试试这个：弹珠过山车", blocks: [
        { type: "paragraph", text: "纸、纸板、胶带，一颗弹珠。搭一条带坡带弯的轨道。然后开始搞破坏。把第一个坡做矮点。把弯做急点。让轨道坑坑洼洼。每一次失败都会准确告诉你该修哪儿。" },
        { type: "callout", title: "同样的问题，更小的规模", accent: "purple", text: "这就是真正的过山车工程师在跑的测试，只是少了几百万美元。每次弹珠飞出去或者半路死在坡上，它都刚给了你一份数据。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "车厢待在轨道上，是因为每一个零件都为此而设计。重力提供速度，动量把它带回家，轮子从三个方向咬住轨道，护具把你按住，轨道形状决定你的身体感受到什么。刺激完全是真的。底下那套数学也是。" },
      ] },
    ],
  },
  "why-chairs-break": {
    ...localizedBlogArticles.en["why-chairs-break"],
    title: "椅子为什么会坏？",
    category: "工程",
    readTime: common.zh.minutes.m4,
    imageAlt: "学生在搭建冰棍棒桥，测试接头和荷载分配，用的是和椅子完全相同的结构工程原理",
    imageCaption: "椅子和桥面临相同的工程问题：接头、荷载路径和材料选择决定了它们是撑住还是失败。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "椅子只有一份工作：把你撑住。可椅子偏偏一直在坏。腿断、靠背裂、螺丝自己松掉、座面慢慢塌成一张吊床。为什么有的椅子被折腾十年还好好的，有的一年就投降了？从头到尾都是工程学。" },
      ] },
      { title: "椅子必须承受力", blocks: [
        { type: "paragraph", text: "你一坐下，体重就直接压进座面。这份力得穿过框架、顺着椅腿走下去，最后进地板。摊得好，椅子连眉头都不皱。全挤进一个薄弱的连接点，那儿迟早要裂。" },
        { type: "paragraph", text: "这就是重量分配，也是全部胜负所在。好椅子不只是扛住重量，它把重量安全地从你身上送到地面。" },
      ] },
      { title: "材料很重要", blocks: [
        { type: "paragraph", text: "木头、塑料、金属、布，或者四样混着用。每一种都有它自己的死法。木头很结实，直到木纹走向不对，它就顺着裂开。塑料又轻又便宜，直到做薄了就崩。金属很硬，直到太薄，然后它就直接折了。" },
        { type: "paragraph", text: "设计师按成本、强度、舒适度、重量，还有它在图册里好不好看来挑。最好的椅子在每一个具体位置用对材料。把所有东西都做成最结实的那种，谁也赢不了。" },
      ] },
      { title: "接头通常是最薄弱的地方", blocks: [
        { type: "paragraph", text: "椅子几乎从来不是从一整块实木中间断掉的。它是在两块东西相接的地方裂开。那些连接点叫接头，一条腿可能靠螺丝、胶、螺栓、角码或者一个刻出来的榫卯装到座面上。" },
        { type: "paragraph", text: "接头弱，椅子就弱。所以晃动是个警告。晃意味着有个本来不该动的东西在动，而且只会越来越糟。" },
      ] },
      { title: "形状可以让椅子更坚固", blocks: [
        { type: "paragraph", text: "把一把结实的椅子翻过来，你多半会看到腿之间连着横杆。那些横撑是在防止椅腿受力时往外劈开。别的设计用弧形塑料壳、焊接框架，或者干脆上三角形。" },
        { type: "callout", accent: "purple", text: "又是三角形。理由和它撑起桥梁与铁塔时一模一样：它拒绝改变形状。一把椅子光靠几何就能变结实很多，一克额外材料都不用加。" },
      ] },
      { title: "测试很重要", blocks: [
        { type: "paragraph", text: "在一把椅子上架之前，机器会先虐它一遍。往上堆重量、往后掰、摔在地上，再连着坐上几千次。因为真实生活比任何实验室都狠。人会翘起两条腿往后仰、扭着身子转、一屁股砸下去、拖着椅子在瓷砖上刮，还会一口气摞六把。" },
        { type: "paragraph", text: "撑住一次很容易。撑住第一万次才是真正的考验。" },
      ] },
      { title: "试试这个：纸椅挑战", blocks: [
        { type: "paragraph", text: "用纸和胶带搭一把椅子，要能撑住一本书或者一个玩具。然后再搭三把。直腿的、折腿的、加三角支撑的、用卷纸管的。一把一把往上压，看哪一把死活不肯投降。" },
        { type: "callout", title: "你会发现什么", accent: "purple", text: "你很快就会发现，形状和接头和材料一样要紧。一个接头干净的简单设计，通常吊打一个粘得乱七八糟的花哨设计。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "椅子坏掉，是因为那些力没地方可去。椅子耐用，是因为有人挑对了材料、挑对了形状，也做出了撑得住的接头。它看着就是件普通家具，可每一次它接住你的体重，那把椅子都在做工程。" },
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
        { type: "paragraph", text: "一次性水瓶大概是你今天会碰到的最不起眼的东西。装水、喝掉、扔了。可要是把它当成一个材料学问题来看，它就变得有点荒唐了。" },
        { type: "paragraph", text: "那个瓶子只有几克重。它熬过了工厂、卡车、仓库、冰柜、你的背包，还有被摔在水泥地上。如果里面装的是汽水，它还得顶住气体往每一面瓶壁往外推。除了这些，它还要保持水干净、密封不漏、握着不难受，而且要便宜到能这样做上十亿次。" },
        { type: "callout", title: "核心权衡", accent: "purple", text: "让这个瓶子又轻又结实又便宜的每一样东西，同时也让它变成了一个垃圾问题。工程做得漂亮，结尾很难受。" },
      ] },
      { title: "工程壮举", blocks: [
        { type: "paragraph", text: "它们几乎都是 PET 做的，全名聚对苯二甲酸乙二酯。PET 透明、轻、好成型，而且论重量算强度出奇地高。正是这个组合，让厂家能把瓶壁做到你一捏就响，同时又不至于在货架上散架。" },
        { type: "numbered", items: [
          { title: "轻便而坚固", body: "一个 PET 瓶能装下自身重量几千倍的水。成型时塑料被拉伸，里面的长链分子会顺着方向排好，强度有很大一部分就是从这儿来的。" },
          { title: "薄而有压力意识", body: "那些棱纹、弧度和奇怪的凹底全都是结构件。汽水瓶的几何做得最讲究，因为里面的气体一刻不停地往每一平方厘米上顶。" },
          { title: "快速生产", body: "机器把一个像试管的 PET 预成型件加热、吹进模具、灌装、封盖、贴标，速度比你读完这句话还快。这个速度，就是瓶装水到处都是的主要原因。" },
        ] },
      ] },
      { title: "形状不是随机的", blocks: [
        { type: "paragraph", text: "一个瓶子得抓得住、摞得起来，还得硬到你拿起来时不会自己塌下去。中间那圈凹槽不是造型，它是给你的手指留的着力点，手湿的时候尤其重要。" },
        { type: "paragraph", text: "形状还决定它怎么应付压力。一个完全光滑的薄壁瓶，你一捏就瘪。加上棱纹，同样多的塑料立刻硬了一大截。材料更少，活照干。" },
      ] },
      { title: "瓶盖的物理学", blocks: [
        { type: "paragraph", text: "看瓶口那一段。那些螺旋凸起叫螺纹，瓶盖里面刻着能咬合的对应螺纹。你一拧，螺纹就把盖子往下拽，而不是让它原地空转。" },
        { type: "paragraph", text: "这个往下的拽力，把一圈小小的密封面压在瓶口边缘上。你要的是气密封闭：紧到不漏液、锁得住气泡、挡得住外面的空气和细菌。" },
        { type: "paragraph", text: "而那个小盖子本身就是一台简单机械，和斜面、螺旋是一家的。它把一个轻松的旋转，变成一记结实的下压。用小力气换出大力气，简单机械存在的意义正是这个。" },
      ] },
      { title: "为什么有些地方塑料更厚？", blocks: [
        { type: "paragraph", text: "用手指从上到下摸一遍，你会摸出厚度在变。瓶底得够厚才站得住、摔得起。瓶颈得够实，盖子才咬得牢。瓶身可以薄，那就薄。" },
        { type: "paragraph", text: "这就是工程师在同时平衡强度、成本、手感和浪费。太薄，你一握就瘪。太厚，你在十亿个瓶子上白白多用了塑料。好设计把材料放在受力的地方，别处一点不给。" },
      ] },
      { title: "瓶口的大小也重要", blocks: [
        { type: "paragraph", text: "瓶口做太小，喝起来难受。做太大，你就往衣服上倒。可重复使用的瓶子做得宽，好塞冰块，也才洗得到里面。一次性的做得窄，因为它只需要撑过一次，也没人会去刷它。" },
        { type: "paragraph", text: "连那个洞多大，都是某个人的决定。" },
      ] },
      { title: "标签与握感", blocks: [
        { type: "paragraph", text: "缠在中间那圈标签在干两件事。一是品牌，二是在你手握的位置增加摩擦。可重复使用的瓶子把这一步做得更狠，用橡胶套、磨砂塑料或者喷粉金属。一个湿手一握就飞出去的瓶子是失败的设计，对孩子、对爬到半山腰的人来说尤其如此。" },
      ] },
      { title: "权衡与健康隐患", blocks: [
        { type: "paragraph", text: "把一个问题解得漂亮，不等于所有问题都解完了。一次性瓶子背着一笔实打实的环境账单，而那些微小塑料碎片对我们意味着什么，研究者还在算。" },
        { type: "numbered", items: [
          { title: "微塑料和纳米塑料颗粒", body: "新的显微技术能看到旧方法完全漏掉的颗粒。哥伦比亚大学和罗格斯大学的团队在他们测试的瓶装水里，平均每升数出了大约 24 万个可检测的塑料碎片，其中大部分是纳米塑料。" },
          { title: "瓶盖摩擦", body: "你每拧一次盖子，塑料螺纹就在塑料螺纹上磨一次。同行评审的研究显示，这种磨损会在瓶口处直接掉下更多微塑料颗粒。" },
          { title: "化学物质渗出", body: "高温、日晒、放上好几个月，或者反复使用一个本来只打算用一次的瓶子，都会加重「塑料降解、添加剂跑进水里」的担忧。这些东西究竟对人做了什么，科学家还在弄清楚。" },
          { title: "环境影响", body: "PET 是可以回收的，可很多并没有被回收。变成垃圾的瓶子会在填埋场、河流和海洋里待非常非常久。" },
        ] },
        { type: "callout", title: "工程意味着权衡", accent: "purple", text: "一次性瓶子在「又轻、又密封、又结实、又便宜」这件事上表现极其出色。在「你喝完之后消失」这件事上表现极其糟糕。" },
      ] },
      { title: "如何减少塑料暴露", blocks: [
        { type: "paragraph", text: "这里没人需要恐慌，而且一瓶塑料装的水，仍然好过没有干净的水。但如果你想少沾一点日常塑料，可以换的东西其实很容易。" },
        { type: "list", items: ["日常喝水换成玻璃瓶或不锈钢瓶。", "别把塑料瓶扔在晒着的车里，也别让它在太阳底下烤。", "别养成反复灌一个只为一次使用做的瓶子的习惯。", "如果自来水本身安全但你想更放心，在家装一个认证过的滤水器。", "所在城市回收 PET 的话就好好回收，看到接水站就用。"] },
      ] },
      { title: "试试这个：瓶子设计测试", blocks: [
        { type: "paragraph", text: "拿一个一次性瓶和一个可重复使用的瓶并排放好。对比瓶盖、握持纹理、瓶底形状、壁厚、开口大小、各自多好捏、站得稳不稳，还有你要怎么把它们洗干净。" },
        { type: "callout", title: "没有完美答案", accent: "purple", text: "两个都不算完胜，这才是重点。登山瓶是为活下来做的。儿童瓶是为不洒做的。一次性瓶是为便宜到不要钱做的。看得出这些取舍，就是这份工作本身。" },
      ] },
      { title: "最后的思考", blocks: [
        { type: "paragraph", text: "一个水瓶，是一个伪装成容器的完整工程项目。装液体、不漏、贴合手掌、能站住、摔得起、尽量少浪费材料。它同时也在提醒：设计决策在产品离开你的手之后，还会继续产生后果。" },
        { type: "paragraph", text: "下次喝水的时候，花两秒看看那个瓶子。里面塞着的思考，比任何人希望你注意到的都多。" },
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
        { type: "paragraph", text: "在 AI 里打一句「用十岁小孩能懂的方式讲讲黑洞」，三秒钟后你就拿到一段像模像样的解释。让它写故事、帮你算数学、生成一张图、想个科学项目，它就直接给你。真的很像那头有什么东西在思考。" },
        { type: "paragraph", text: "所以值得问一句：它在吗？老实的答案是没有，至少不是你那种思考。" },
        { type: "paragraph", text: "AI 能做到一些确实惊人的事，但那里面没有大脑。没有情绪。没有属于自己的记忆。没有你这种想象力。对这个世界也没有任何真实的把握。它有的，是一种识别规律的恐怖天赋。" },
      ] },
      { title: "什么是模式识别？", blocks: [
        { type: "paragraph", text: "识别模式就是注意到什么在重复，而你一直在做这件事。乌云压过来、远处打雷、风突然起来，在你自己决定任何事之前，你的脑子已经说出了「要下雨」。没人教你。这部片你看过。" },
        { type: "paragraph", text: "AI 把同一个把戏放大到离谱的规模。想象读完几千本书、几千篇文章、几千个网站和对话。你最后一定会开始注意到哪些词爱凑在一起、哪类答案通常跟在哪类问题后面、哪些想法总是并排出现。" },
        { type: "paragraph", text: "整件事就这样。AI 从数据里吸收规律，然后在你提问时用它们来猜接下来该出现什么。它听着聪明，是因为那些规律本来就来自聪明人写下的东西。听着聪明和思考，是两份不同的工作。" },
      ] },
      { title: "人类的思考有什么不同？", blocks: [
        { type: "paragraph", text: "你做的事远不止对模式。你会好奇。你会在乎别人。你会困惑、兴奋、紧张、骄傲。你会决定某件事对你重要。你会因为某个下午的经历而改变想法。你会注意到什么不公平，或者朋友今天不对劲却什么都没说。" },
        { type: "paragraph", text: "AI 一样都做不到。假设你的冰棍棒桥塌了，那一下你是从胃里感觉到的。接着你想，也许中间需要更多支撑，然后开始画第二版。逻辑、记忆、情绪、创造力和经验在同一秒里一起点火。" },
        { type: "paragraph", text: "去问 AI 桥为什么塌，它会给你一段关于三角形和重量分配的像样回答。但它没看见桥塌。它不在乎。那一刻没有改变它任何东西，明天它也不会记得。" },
      ] },
      { title: "AI 理解它说的话吗？", blocks: [
        { type: "paragraph", text: "它能讲清火山。它能写一首关于乌龟的诗。它能跟你聊土星环。这些都不代表它像你一样理解其中任何一件。" },
        { type: "paragraph", text: "想想手机上的自动补全。你打「我要去」，它给你商店、公园、比赛。你的手机对你今天下午一无所知。它在猜下一个词。" },
        { type: "callout", accent: "teal", text: "AI 玩的是这一招的高级得多的版本。它根据规律预测词、句子和想法。所以它才可能一句答得极准，三十秒后又说出某种彻底离谱的东西。" },
      ] },
      { title: "一个简单的例子", blocks: [
        { type: "paragraph", text: "问 AI：鱼能骑自行车吗？人会笑一下说不能，鱼没有腿，自行车得在陆地上骑。AI 大概也会说不能。但不是因为它脑子里出现了一条鱼在街上摇摇晃晃的画面。它在跑它吸收来的语言规律和事实。" },
        { type: "paragraph", text: "现在反过来：写一个鱼骑自行车的搞笑故事。你立刻就有了一个故事。它从事实模式切到了故事模式，因为它认出了你想要哪种形状的答案。这很有用，同时也是一个提醒：你怎么问，决定你拿到什么。" },
      ] },
      { title: "AI 算聪明吗？", blocks: [
        { type: "paragraph", text: "在某些事上，绝对算。它找规律飞快，能把一堆乱七八糟的信息理顺，能在晚上十一点陪你头脑风暴，能把一个话题换五种说法，能总结、写代码、翻译语言、帮人学东西。" },
        { type: "paragraph", text: "在另一些事上，差得很远。它不知道当一个小孩是什么感觉，不知道在一群人面前搞砸是什么感觉，不知道帮朋友、赢一次、或者亲手做的东西终于成了的那种骄傲。它没有常识。而且它可以在彻底说错的同时听起来无比确定。它是工具，不是你大脑的替代品。" },
      ] },
      { title: "把 AI 想成处理文字的超级计算器", blocks: [
        { type: "paragraph", text: "计算器算数学能把人打趴下。可它完全不知道你为什么要这个答案、你有没有把数字敲错、或者这个结果在现实里说不说得通。它只是在算。" },
        { type: "paragraph", text: "AI 是同一个思路，只不过它处理的是文字、图像、代码和规律，而不只是数字。它可以帮你思考。它不该替你思考。" },
      ] },
      { title: "试试这个", blocks: [
        { type: "paragraph", text: "去找个 AI，连着问它这三句：" },
        { type: "list", items: ["解释纸飞机如何飞行。", "用二年级学生能懂的方式解释纸飞机如何飞行。", "编一个纸飞机飞到火星的搞笑故事。"] },
        { type: "paragraph", text: "看答案变化有多大。AI 没有先变成老师、再变成小孩、再变成说书人。它只是在匹配你要求的形状。三个提示，就是全部真相。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "AI 不像你那样思考。它抓规律、预测下一步、用从数据里学到的东西拼出答案。这很强大，用起来也是真的有意思。但你仍然带着它没有的东西：真正的理解、真正的创造力、判断力、情感，以及对你拿这个答案去做什么负责。" },
        { type: "callout", accent: "teal", text: "AI 能帮你思考。你的大脑仍然是屋里最好的那件工具，而且它是那个必须决定下一步的人。" },
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
        { type: "paragraph", text: "AI 回答问题快得离谱。让它讲恐龙、写故事、帮你找代码里的毛病、想个科学项目，几秒钟就来了。有时候答案很好用。有时候它说得特别有底气。有时候它就是错的。" },
        { type: "paragraph", text: "这就有点让人摸不着头脑了：都厉害成这样了，怎么还会错？因为 AI 其实并不「知道」任何事。它在按规律往下预测，多数时候预测得挺准，偶尔就翻车。" },
      ] },
      { title: "AI 可能猜错", blocks: [
        { type: "paragraph", text: "你抛出一个问题，AI 要做的是拼出一个形状对得上的答案。它翻出从海量例子里学到的规律，一个词一个词地预测下一个该是什么。说白了，它从头到尾都在做同一件事：非常有根据地猜。" },
        { type: "paragraph", text: "问「世界最高的山是哪座」，它几乎不会错，珠穆朗玛峰这件事在它见过的资料里出现过无数次。但问题一变得又偏又具体，它可能压根不知道。麻烦在于它还是会答，而且答得很顺。该说「我不确定」的时候，它常常不说。" },
      ] },
      { title: "什么是幻觉？", blocks: [
        { type: "paragraph", text: "AI 编出一条信息，还一本正经地当成事实端给你，这种情况大家叫它「幻觉」。它不是真看见了什么，它是造出了一个听起来很真、其实不成立的答案。" },
        { type: "paragraph", text: "它可能给你这些：" },
        { type: "list", items: ["一本根本不存在的书名", "一个对不上的日期", "一句从来没人说过的名言", "一条听着很科学、其实是错的知识", "一个你怎么查都查不到的出处"] },
        { type: "callout", accent: "teal", text: "最难缠的地方在这儿：幻觉听起来往往比真话还自信。所以重要的答案，还是得有人去核一遍。" },
      ] },
      { title: "错误的数据会导致错误的答案", blocks: [
        { type: "paragraph", text: "AI 是从数据里学出来的。数据就是文字、图片、数字和各种各样的例子。可数据本身不一定干净。网上有过时的东西，有带偏见的东西，有缺了一半的东西，也有纯粹就是错的东西。规律从哪儿学来，错也就从哪儿跟着来。" },
        { type: "paragraph", text: "想象你借了一本笔记本复习，里面有些页写得很好，有些页答案是错的。你要是照单全收，就会不知不觉把错的一起背下去。AI 掉的是同一个坑，只不过它那本笔记本大了几亿倍。" },
      ] },
      { title: "AI 并不总是理解问题", blocks: [
        { type: "paragraph", text: "有时候答错纯粹是因为问题没问清楚。有人跑过来问你「它多大？」，你的第一反应肯定是「什么它？」。AI 不会这么反问，它会自己猜「它」指的是谁。猜歪了，后面整段就全歪了。" },
        { type: "paragraph", text: "所以提示词很要紧。提示词就是你敲给 AI 的那句话。与其说「跟我讲讲能源」，不如说「用四年级学生能听懂的方式，讲清可再生能源和不可再生能源的区别」。方向给足了，答案立刻是另一个水准。" },
      ] },
      { title: "AI 可能混淆相似的事物", blocks: [
        { type: "paragraph", text: "AI 抓规律很厉害，可长得像、听着像的东西容易被它揉成一团。名字相近的两个历史人物、同名的电影和书、一个说法很顺但其实不准的科学解释，都可能出岔子。" },
        { type: "paragraph", text: "它没有像你这样亲眼看过这个世界。有些系统也不会自动更新到最新。碰上刚出的发现、新规定、这两天发生的事，一定要自己去查可信的一手来源。" },
      ] },
      { title: "怎么核实 AI 的答案？", blocks: [
        { type: "callout", title: "一条简单规则", accent: "teal", text: "把 AI 当助手，别把它当裁判。凡是牵扯到作业、安全、健康和新闻的答案，都值得你自己再走一遍。" },
        { type: "paragraph", text: "可以这样问自己：这条信息是哪来的？换个靠谱网站还能找到同样的说法吗？跟老师讲的对得上吗？它本身讲得通吗？" },
        { type: "paragraph", text: "有个三重检查特别好用：它说得通吗？另一个可信来源认不认？老师、家长或者懂行的人会同意吗？只要有一条卡住，就先慢下来。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "AI 会错，原因就那几条：它在预测，它学的数据不完美，它会误读没问清的问题，它会把相近的东西搞混，它有时候不知道最新的事。这不代表它没用，只代表用它得带着脑子。" },
        { type: "callout", accent: "teal", text: "AI 可以让你学得更快、想得更开。但「我怎么知道这是真的」这句话，永远得由你自己问出口。" },
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
        { type: "paragraph", text: "用脸解锁手机这件事，停下来想两秒还挺离谱的。你把手机拿起来，看它一眼，它就开了。没有密码，没有输入，就一张脸。" },
        { type: "paragraph", text: "但手机并没有在想「哦，是我朋友」。它不像你家里人那样认识你。它干的是另一件事：用摄像头、传感器和一堆学来的规律，判断眼前这张脸跟它存着的那套对不对得上。" },
      ] },
      { title: "你的脸有规律", blocks: [
        { type: "paragraph", text: "每张脸都自带一套规律。两只眼睛隔多远，鼻梁是什么形状，下巴、颧骨、额头和嘴怎么排布，这一整套组合基本上只属于你一个人。" },
        { type: "paragraph", text: "手机存下来的就是这套规律。你看向它的时候，它把刚读到的和存着的摆在一起比。够像，就开锁。说到底是一场精度高得吓人的连连看。" },
      ] },
      { title: "设置时发生了什么？", blocks: [
        { type: "paragraph", text: "第一次设置的时候，手机会让你慢慢转头，从各个角度看它。这不是走个形式。你的脸在不同时候本来就长得不太一样：光线足的时候、背光的时候、戴眼镜的时候，全都不同。" },
        { type: "paragraph", text: "它得把你这套规律从各个角度学扎实，之后条件一变，才还认得出你。" },
      ] },
      { title: "摄像头和传感器帮忙", blocks: [
        { type: "paragraph", text: "普通摄像头只负责拍平面，但有些手机还带额外的传感器，能测深度，也就是你脸上各个部位离镜头有多远。有了深度，真人和一张照片就分得开了。" },
        { type: "paragraph", text: "想想纸上画的正方体和手里真的积木块。真积木有厚度，画没有。有些人脸识别系统正是靠这一点，把安全性往上抬了一大截。" },
      ] },
      { title: "机器学习在哪里发挥作用？", blocks: [
        { type: "paragraph", text: "机器学习是让计算机从例子里学规律的一种 AI。放到人脸识别上，它负责搞清楚哪些规律是你的，以及这些规律在不同情况下会怎么变。" },
        { type: "paragraph", text: "你笑起来、扣顶帽子、歪着头、剪了个新发型，脸就有点不一样了。机器学习让系统吃得下这些小变化，而不是每次都懵在那儿。" },
      ] },
      { title: "为什么隐私很重要", blocks: [
        { type: "paragraph", text: "人脸识别好用，但它带来的隐私问题是真的。脸和密码不是一回事。密码泄露了，你换一个就行。脸泄露了，你换不了。" },
        { type: "callout", accent: "teal", text: "所以公司、学校、应用和设备在动用人脸这件事上必须讲清楚：收了哪些数据，存在什么地方，谁能看。孩子在用任何扫脸的应用之前，先找大人问一句。" },
      ] },
      { title: "人脸识别会出错吗？", blocks: [
        { type: "paragraph", text: "会。光线一差它就可能认不出你，该开的时候不开。有些系统对某些人群的准确率明显更低，尤其是训练时见过的面孔不够多样的时候。" },
        { type: "paragraph", text: "这正是技术需要人来测、来改、来负责的地方。" },
      ] },
      { title: "试试这个思想实验", blocks: [
        { type: "paragraph", text: "假设这套解锁系统交给你来设计。下面这几种情况，你打算怎么办：" },
        { type: "list", items: ["房间黑得几乎看不见？", "用户戴着墨镜？", "有人举着用户的照片对准镜头？", "双胞胎想解锁同一部手机？", "用户一年年长大，脸慢慢变了？"] },
        { type: "paragraph", text: "这些全是工程师真的在吵的问题。准确、安全、公平、隐私，四件事得同时顾上。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "手机认出你，靠的是找规律，不是像人那样认识你。摄像头和传感器负责收集信息，机器学习负责读懂脸上的规律，安全规则负责拍板开还是不开。" },
        { type: "callout", accent: "teal", text: "在用扫脸应用、或者交出自己的脸部数据之前，问一句总没坏处：这条信息去哪儿了，谁看得到？" },
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
        { type: "paragraph", text: "自动更正有时候是真救命。你手快打成 \"teh\"，它悄悄给你改回 \"the\"。漏了个字母，它替你兜住了，没人看得出来。" },
        { type: "paragraph", text: "可它也有发疯的时候。你本来想写「我去带点零食」，它把其中一个词换成了完全不相干的东西。为什么？因为自动更正从头到尾都在猜词。它压根没懂你想说什么。" },
      ] },
      { title: "自动更正是预测工具", blocks: [
        { type: "paragraph", text: "它盯着你敲下的字母，然后开始推理：拼写上离哪个词最近？上一个词后面通常跟什么？这个人平时爱打什么？整句话最可能是哪句？多数时候这套推理成立。不成立的那几次，就成了大家互相转发的截图。" },
      ] },
      { title: "计算机不像人一样理解词语", blocks: [
        { type: "paragraph", text: "你懂一个词，是因为它连着现实。有人说「狗」，你脑子里立刻有毛、有叫声、有跑过来的画面，说不定还有一条你认识的狗。意思是从经历里长出来的。" },
        { type: "paragraph", text: "自动更正没有经历。它不知道狗摸上去什么感觉，不知道一个玩笑好笑在哪，也不知道你朋友的名字为什么这么拼。它眼里只有字母、词和出现频率。所以它才会把一个本来正确的词改掉：它不是在纠正你，它只是觉得另一个词更常见。" },
      ] },
      { title: "人名和俚语会让自动更正困惑", blocks: [
        { type: "paragraph", text: "人名是它最大的克星。朋友的名字拼得少见，你住的镇子、你的学校、你的球队不在手机词典里，它就可能把一个完全正确的名字「更正」成某个更普通的词。" },
        { type: "paragraph", text: "而且人用语言本来就很野。孩子爱造词，朋友之间有黑话，家里人有专属外号。这些自动更正一个都不懂。你兴致勃勃打了个自创词，它可能给你换成某个无聊到家的东西。" },
      ] },
      { title: "为什么它有时会变得更好？", blocks: [
        { type: "paragraph", text: "有没有发现手机慢慢学会了你常用的那些词？有些自动更正系统确实会跟着你的习惯调整。同一个名字你打过几十遍之后，它就不再动它了。" },
        { type: "paragraph", text: "这就是机器学习在干活：它注意到你的规律，然后跟上。副作用也挺好笑的。某个错字你要是打顺手了，手机可能会认定那才是对的。" },
      ] },
      { title: "自动更正和 AI 有关联", blocks: [
        { type: "paragraph", text: "自动更正和成熟的 AI 聊天机器人不是一个量级，但内核是同一件事：预测。自动更正预测一个词或一种拼法，聊天机器人预测整段回应、整个解释。两个都没有真的听懂语言。" },
        { type: "callout", accent: "teal", text: "人可以停下来问一句「等等，你什么意思？」，也能读出反讽、情绪和当时的场合。计算机只能从规律往回推，推错是常事。" },
      ] },
      { title: "试试这个", blocks: [
        { type: "paragraph", text: "编一句怪句子，塞满自造词、名字和俚语，看自动更正动了哪几个地方。然后回头问自己：它凭什么挑那个词？是拼写像？是常见搭配？还是它以前见过？" },
        { type: "paragraph", text: "工程师的思路差不多就是这样。不停在「这里坏了」，而是再追一句：它为什么会这样坏？" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "自动更正闹笑话，是因为它预测的是语言规律，不是意思。它能修错字、省时间、跟着你学。它同样能把对的词改成错的。" },
        { type: "callout", accent: "teal", text: "它是工具，你才是编辑。按下发送之前，眼睛再走一遍。" },
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
        { type: "paragraph", text: "问 AI 一个问题，感觉像在跟一个特别聪明的机器人聊天。你打「天空为什么是蓝的？」，三秒后答案就躺在屏幕上了。可从你按下回车到那段文字冒出来，中间到底发生了什么？" },
        { type: "paragraph", text: "那里面没有一个小脑袋在思考。有的是一条流水线：提示词、训练、规律、预测。我们一步一步把它拆开。" },
      ] },
      { title: "第一步：你给 AI 一个提示词", blocks: [
        { type: "paragraph", text: "提示词就是你丢给 AI 的那句话，问题也好、指令也好。它可以很短，比如「解释重力」。也可以具体得多：「用三年级学生能懂的方式，拿操场当例子解释重力。」" },
        { type: "callout", accent: "teal", text: "第二种问法拿到的答案基本上会好一大截，因为你把想要的样子说清楚了。提示词就像给队友派任务：任务说得越准，结果越靠谱。" },
      ] },
      { title: "第二步：AI 分解你的词语", blocks: [
        { type: "paragraph", text: "AI 接住你的提示词，第一件事是把它拆成小块。它看的是词、词的先后顺序，以及这些词凑出来的规律。" },
        { type: "paragraph", text: "拿「给孩子解释光合作用」来说，它读出三件事：「解释」说明你要的是讲解，「光合作用」是题目，「给孩子」说明得说得简单。这三条线索决定了它接下来往哪个方向搭答案。" },
      ] },
      { title: "第三步：AI 使用训练中学到的内容", blocks: [
        { type: "paragraph", text: "在 AI 能回答任何问题之前，它得先训练。训练就是让它啃下海量例子：文章、问答、解释、故事、代码，什么都有。" },
        { type: "paragraph", text: "它并没有把这些背下来。它学的是规律：哪些词爱凑在一起，一个问题通常怎么被回答，一段解释一般怎么搭起来，不同文风长什么样。你现在抛过去的新问题，就是靠这些规律接住的。" },
      ] },
      { title: "第四步：AI 预测回应", blocks: [
        { type: "paragraph", text: "AI 造答案的方式是预测下一步该出现什么。它不是从抽屉里抽出一份现成的，而是一点一点往外搭。你问「植物为什么需要阳光」，它会预测一个像样的答案里大概得有能量、食物、叶子和光合作用。" },
        { type: "paragraph", text: "所以同一个话题它能讲出无数个版本。要短的、要长的、要一首诗、要一个故事、要一份测验、要分步教程，全看你怎么点。" },
      ] },
      { title: "第五步：答案出现了", blocks: [
        { type: "paragraph", text: "预测完、搭完，答案就出现在你眼前了。它读起来通顺又笃定。但它是怎么来的，最好别忘。" },
        { type: "paragraph", text: "屏幕那头不是一个亲身经历过什么、翻过教科书、认真掂量过轻重的人。那是一个按规律生成文字的工具。它给的东西可能很有用，也可能需要你去核一遍。" },
      ] },
      { title: "为什么清晰的提示有帮助", blocks: [
        { type: "paragraph", text: "问得越具体，拿到的东西越能用。别说「跟我讲讲机器人」，试试「用四年级学生能懂的方式，举例说清机器人和 AI 的区别」。别说「帮我做科学」，试试「给我三个关于磁铁的科学展项目，材料得是我家里能找到的」。你给它一个明确任务，它才发挥得出来。" },
      ] },
      { title: "试试这个", blocks: [
        { type: "paragraph", text: "同一个问题，换三种方式问 AI：" },
        { type: "list", items: ["解释电。", "用水滑梯打比方解释电。", "用五句话，讲给三年级学生听。"] },
        { type: "paragraph", text: "三个答案摆在一起，你会一眼看出提示词的分量。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "你向 AI 提问，其实是给了它一个提示词。它读提示词，调出训练时学到的规律，预测出一段回应，再搭给你。整个过程看着像思考，骨子里是按规律预测。这让它很强，也让它不完美。" },
        { type: "callout", accent: "teal", text: "AI 负责给你回应，读懂它是你的活儿。保持好奇，把提示词写清楚，重要的答案自己核一遍。" },
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
        { type: "paragraph", text: "AI 是真能帮上忙。作业卡住了它能讲，项目没思路它能给，故事、问答、新知识，它都接得住。有点像家教、图书馆员和头脑风暴搭子被塞进了同一个框里。" },
        { type: "paragraph", text: "那它说什么就是什么吗？不是。AI 有用，但它不总是对的。用它的正确姿势是：好奇一点，同时谨慎一点。" },
      ] },
      { title: "AI 即使出错也听起来很自信", blocks: [
        { type: "paragraph", text: "AI 有个特别难对付的地方：它错的时候，语气跟对的时候一模一样。答案照样平静清楚，词照样漂亮，段落照样分得整整齐齐。" },
        { type: "callout", accent: "teal", text: "答案整齐不等于答案正确。AI 会记错，会把两件事搅在一起，也会直接编。它编东西的时候，大家管这叫幻觉。" },
      ] },
      { title: "像侦探一样思考", blocks: [
        { type: "paragraph", text: "安全地用 AI，说白了就是像侦探一样想事情。侦探不会拿到第一条线索就收工。他们会追问，会找证据，会把不同说法摆在一起对。" },
        { type: "paragraph", text: "AI 给你答案的时候，你可以问自己：这讲得通吗？这条信息哪来的？我能在别的地方对上吗？这件事重不重要？要不要找个大人问问？" },
        { type: "paragraph", text: "目的不是怕它，是把它用明白。" },
      ] },
      { title: "有些问题需要格外小心", blocks: [
        { type: "paragraph", text: "有些答案风险很低。你让 AI 写一条爱吃煎饼的龙的搞笑故事，没必要一句句去核实。那就是图个乐。" },
        { type: "paragraph", text: "有些话题就得多留个心眼：健康和安全、钱、新闻时事、作业里必须准确的部分、私人问题、个人信息，以及任何会影响到别人的事。在这些话题上，AI 不能是你唯一的来源。" },
      ] },
      { title: "询问信任的大人", blocks: [
        { type: "paragraph", text: "拿不准的时候，去问一个你信得过的大人。爸妈、老师、图书馆员、教练，谁都行，只要能陪你把事情想清楚。" },
        { type: "paragraph", text: "AI 只给得出通用的说法，它不了解你的生活。信得过的大人清楚你的处境。一旦话题碰到你的身体、情绪、朋友、家庭、安全，或者要你自己拿主意的事，这一点尤其重要。" },
      ] },
      { title: "不要分享私人信息", blocks: [
        { type: "paragraph", text: "还有一条硬规矩：私人信息别交给 AI。私人信息包括你的全名、家里或学校的地址、密码、电话号码、个人照片、家里的私事，以及任何被陌生人看到会让你不舒服的东西。" },
        { type: "paragraph", text: "不同的 AI 工具和应用，处理信息的方式并不一样。既然你很难知道这些内容最后去了哪儿，那就干脆不给。拿不准的时候，先问大人。" },
      ] },
      { title: "孩子可以怎样使用 AI", blocks: [
        { type: "paragraph", text: "用对了，AI 相当能打。你可以让它把绕人的概念换成大白话、出一批数学练习题、陪你想科学项目、考试前抽你、列几个能拿去问老师的问题、帮故事搭个大纲、解释代码里的报错、举个例子说清某个东西怎么运作。" },
        { type: "paragraph", text: "最好的用法不是抄，是学。如果一段回答让你真的把某件事搞懂了，那这一局就赢了。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "AI 说的话不能全信。它有用、有创意，也确实好玩，但它会出错，而且出错的时候听着照样理直气壮。" },
        { type: "callout", accent: "teal", text: "会用 AI 的人不照单全收。他们会想、会核、会追问。把它当工具，别让它当你脑子的老板。" },
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
        { type: "paragraph", text: "玩过那种敌人会盯着你追、角色会跟你搭话、你越强它越难的游戏吗？那不是随机撞出来的。那是 AI 在后台干活。" },
        { type: "paragraph", text: "游戏 AI 负责让角色移动、做选择、对你的动作有反应，也负责给你制造麻烦。它让一个世界看起来是活的。不过游戏里的 AI 和你拿来问问题的那种不完全是一回事。在游戏里，AI 多数时候指的是一套让角色显得很聪明的行为规则。" },
      ] },
      { title: "什么是游戏 AI？", blocks: [
        { type: "paragraph", text: "游戏 AI 就是控制电脑角色怎么行动的那套东西。这些角色可能是敌人、队友、动物、村民、怪物、赛车手或者小店老板，统称 NPC，也就是非玩家角色，凡是不由真人操控的都算。" },
        { type: "paragraph", text: "游戏 AI 替 NPC 拿主意：这个敌人该不该追上去？队友要不要跟着你？赛车过弯前该不该松油门？店主看见你走近要不要打声招呼？这些判断全是它的活儿。" },
      ] },
      { title: "敌人的移动", blocks: [
        { type: "paragraph", text: "最常见的用法就是让敌人动起来。想象一个迷宫游戏，一只怪物正在找你。设计师会给它写一套算法，也就是一步一步的指令，让它知道该往哪走。" },
        { type: "paragraph", text: "规则可能长这样：玩家离得近就追；离得远就巡逻；撞墙就转向；血量低就跑；守住那个宝箱。" },
        { type: "paragraph", text: "就这么几条，跑起来就已经像模像样了。" },
      ] },
      { title: "NPC 的选择和难度", blocks: [
        { type: "paragraph", text: "NPC 也会做选择。有些游戏里，一个角色说什么取决于你之前干过什么。村民会谢你帮过忙，守卫会因为你没钥匙把你拦下来。游戏一直在检查条件：如果这件事成立，就执行那件事。" },
        { type: "paragraph", text: "还有些游戏用 AI 调难度。太简单你会腻，太难你会摔手柄。于是敌人可能变快，谜题可能加码，或者你卡太久的时候游戏悄悄递个提示过来。目的只有一个：让你还想再玩一局。" },
      ] },
      { title: "游戏 AI 可以简单也可以复杂", blocks: [
        { type: "paragraph", text: "不是所有游戏 AI 都高级。有的角色就在原地来回踱步，有的敌人沿着一条固定路线走到底。这照样算行为设计，哪怕它一点也不「聪明」。" },
        { type: "paragraph", text: "另一些游戏就复杂多了：角色会对声音、光线、你的选择和环境变化做出反应。设计师追的从来不是「让 AI 尽可能聪明」，而是「让这一局好玩」。" },
      ] },
      { title: "为什么不让敌人变得完美？", blocks: [
        { type: "paragraph", text: "既然游戏 AI 能做得很强，为什么不干脆把敌人做成无敌的？因为那一秒钟游戏就死了。想象一款足球游戏，电脑门将每一脚都扑得到；或者一款赛车游戏，对手从不失误。你不会觉得刺激，你只会觉得这游戏在耍你。" },
        { type: "callout", accent: "teal", text: "好的游戏 AI 是来挑战你的，不是来碾你的。设计师有时候会故意把它做得不那么完美：敌人出手前停顿半秒，偶尔打空一次，或者给你留个破绽。那半秒就是你反应、学习和变强的空间。" },
      ] },
      { title: "试着设计你自己的游戏 AI", blocks: [
        { type: "paragraph", text: "你现在就能像设计师一样想事情。假设你要给一个迷宫游戏造一只怪物，它该守哪些规则？没看见玩家就乱走；玩家靠近就追；追满十秒就放弃；玩家拿到道具就掉头跑；守住宝箱。" },
        { type: "paragraph", text: "五条规则，行为就已经有意思了。下次玩游戏的时候盯着角色多看一会儿，然后问自己：是哪几条规则在推着它动？" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "电子游戏用 AI 管敌人、管 NPC、管难度、管移动、管各种行为。它可以是几条简单规则，也可以是一整套复杂系统。它让角色对你有反应，让这一局值得玩下去。" },
        { type: "callout", accent: "teal", text: "最好的游戏 AI 不一定是最聪明的那个，而是让玩的人体验最好的那个。" },
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
        { type: "paragraph", text: "机器人和 AI 老是被塞进同一句话里。电影里的机器人会走、会说、会想、会定计划，有时候跟人差不多。看多了，很容易觉得这两个词说的是一回事。" },
        { type: "paragraph", text: "其实不是。机器人是能在现实世界里干活的机器，AI 是能做预测、找规律、帮着拿主意的软件。它们经常搭档，但机器人不一定装了 AI，AI 也不一定需要一副身体。" },
      ] },
      { title: "什么是机器人？", blocks: [
        { type: "paragraph", text: "机器人是能感知、能动、能干活的机器。有些长得像人，更多的一点都不像。扫地机器人是，工厂里焊车身的机械臂是，无人机是，火星车是，玩具机器人是，做手术用的那台也是。" },
        { type: "paragraph", text: "机器人身上通常有电机、轮子、机械臂、摄像头、传感器或者夹爪。判断标准就一条：它得跟物理世界打交道。" },
      ] },
      { title: "什么是 AI？", blocks: [
        { type: "paragraph", text: "AI 是人工智能的简称，指那些能干「看起来需要动脑」的活儿的计算机技术。它能认规律、做预测、写文字、给图片分类、翻译语言、给你推视频。" },
        { type: "paragraph", text: "AI 不需要身体。聊天机器人就活在软件里，它能回答你任何问题，但除非接上一台机器人，它连一支铅笔都拿不起来。AI 是负责拿主意的那部分，机器人是负责动手的那部分。" },
      ] },
      { title: "传感器和电机是什么？", blocks: [
        { type: "paragraph", text: "传感器让机器读到这个世界。人靠眼睛、耳朵和皮肤，机器人靠传感器收集信息：摄像头负责看，麦克风负责听，触觉传感器知道碰到了东西，距离传感器负责别撞墙，温度传感器负责测热。" },
        { type: "paragraph", text: "电机负责动：转轮子、抬手臂、开夹爪、拧关节。传感器是机器人的感官，电机就是它的肌肉。但电机自己什么都不决定，它们在等指令。" },
      ] },
      { title: "没有 AI 的机器人", blocks: [
        { type: "paragraph", text: "有些机器人压根没什么 AI。想象一台沿着地上黑线走的小车：底下装一个光线传感器，看到线就往前，跑偏了就拐回来。它看起来挺聪明，其实只是在执行规则。传感器、电机、写死的指令，就这三样。" },
      ] },
      { title: "没有机器人的 AI", blocks: [
        { type: "paragraph", text: "再想一个帮你写诗的 AI。它能把字造出来，可它没有轮子、没有手臂、没有摄像头。它走不过房间，搭不了积木，也拿不起一瓶水。这就是没有身体的 AI：能处理信息，也就到此为止。" },
      ] },
      { title: "有 AI 的机器人", blocks: [
        { type: "paragraph", text: "当然也有两样都齐的。自动驾驶汽车就是典型：摄像头和传感器盯着路面、标志、车道、旁边的车和过马路的人，AI 负责搞懂眼前是什么情况、接下来怎么走才安全。" },
        { type: "callout", accent: "teal", text: "这时候身体和大脑是一起在干活：机器人感知世界，AI 负责判断，电机负责把判断变成动作。" },
      ] },
      { title: "试试这个", blocks: [
        { type: "paragraph", text: "在家里或者学校转一圈。哪些是机器人？哪些用了 AI？哪些只是普通的机器？计算器算得飞快，但通常算不上 AI；扫地机器人是机器人；语音助手大概率用了 AI；打印机是机器，可一般不算我们说的那种机器人。" },
        { type: "paragraph", text: "这样归归类，你就已经在用工程师的方式看技术了。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "机器人和 AI 不是一回事。机器人是能动、能干活的实体机器，AI 是能找规律、做预测、帮着做决定的软件。它们可以合作，但它们是两样东西。" },
        { type: "callout", accent: "teal", text: "下次听到「智能机器人」，可以把它拆开问一句：哪部分是机器人，哪部分是 AI，靠哪些传感器读懂世界？" },
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
        { type: "paragraph", text: "闭上眼睛在学校里走一段试试。前几步没问题，然后你就会撞上墙、桌角，或者谁扔在地上的书包。想走得安全，你得先知道自己在哪儿。" },
        { type: "paragraph", text: "机器人面对的是同一道题。它并不会自动知道自己的位置，它得靠传感器、摄像头、轮子、地图和一堆数学慢慢算出来。思路其实不复杂：把周围的线索收集起来，对自己在哪儿做一个最靠谱的猜测，然后决定下一步往哪走。" },
      ] },
      { title: "机器人也需要感官", blocks: [
        { type: "paragraph", text: "人有视觉、听觉、触觉和平衡感。机器人有传感器，负责替它留意这个世界。有的量距离，有的看东西，有的测速度，有的分辨方向。" },
        { type: "list", items: ["摄像头：看墙、路面、人、标志和障碍物", "轮子编码器：数机器人走了多远", "GPS：在户外估个大概位置", "激光雷达：用激光把周围扫一遍", "超声波传感器：靠声波弹回来判断距离", "陀螺仪：感觉自己是在转还是在歪"] },
        { type: "paragraph", text: "每个传感器只递给它一块拼图。摄像头看到一扇门，轮子说走了五英尺，距离传感器说右边有堵墙。这些线索拼起来，它才知道自己站在哪儿。" },
      ] },
      { title: "数车轮转数", blocks: [
        { type: "paragraph", text: "最土也最好用的一招，是数轮子转了多少圈。从教室门口出发，轮子往前滚了三米，那它现在大概离起点三米。这叫里程计，说穿了就是数步数。" },
        { type: "callout", accent: "green", text: "那轮子打滑了呢？地面不平呢？一丁点误差会一路攒下去，越滚越大。所以机器人从来不只靠一个传感器。" },
      ] },
      { title: "像眼睛一样使用摄像头", blocks: [
        { type: "paragraph", text: "有些机器人拿摄像头当眼睛。扫地机器人盯着家具腿和墙脚，自动驾驶汽车看车道线、红绿灯和行人，火星车用它研究岩石、绕开会陷进去的地形。" },
        { type: "paragraph", text: "但摄像头看到的世界和你看到的不一样。你一眼扫过去就知道那是把椅子；机器人拿到的是一堆数据，得从形状、颜色、边缘、阴影和规律里推出来那是什么。光线会变，东西会互相挡住，椅子从正面、侧面和背面长得都不一样。这些情况它全都得提前训练过。" },
      ] },
      { title: "建立地图", blocks: [
        { type: "paragraph", text: "有些机器人边走边画地图。扫地机器人从一个房间开始，慢慢摸清墙在哪、家具在哪、哪块是空地，然后照着这张图有条理地扫，而不是满屋子乱撞。" },
        { type: "paragraph", text: "跟你第一次进一栋陌生的楼是一个道理。刚进去两眼一抹黑，转两圈之后你开始记住：楼梯在门口附近，体育馆在走廊尽头，图书馆一拐弯就是。机器人也在记，只不过用的是传感器和程序。" },
        { type: "callout", accent: "green", text: "有些机器人更狠，一边画地图一边给自己定位，等于同时回答两个问题：这地方长什么样，我又在这张图的哪个点上？" },
      ] },
      { title: "为什么机器人还是会迷路", blocks: [
        { type: "paragraph", text: "再聪明的机器人也有懵的时候。轮子打滑、传感器读数出错、房间被重新布置、家具挪了位、灯关了、镜头被挡住，或者两条走廊长得几乎一模一样，它就可能找不着北。" },
        { type: "paragraph", text: "所以它会一遍一遍重新确认自己在哪儿。它不会猜一次就认定到底，而是每拿到一点新信息就把估计更新一次。你在博物馆里也是这么干的：瞄一眼地图，看一眼指示牌，再抬头找个参照物。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "机器人知道自己在哪儿，靠的是不停收集线索。摄像头、轮子、GPS、激光和运动传感器各出一份力，它把这些拼在一起估算位置、画地图、躲开障碍、决定下一步。" },
        { type: "callout", accent: "green", text: "下次看到机器人在房间里穿行，别只看到它在滚。它在感知、在猜、在核对、在随时改主意。找路这件事，就是这么完成的。" },
      ] },
    ],
  },
  "why-robots-are-bad-at-easy-human-tasks": {
    ...localizedBlogArticles.en["why-robots-are-bad-at-easy-human-tasks"],
    title: "机器人为什么不擅长人类轻松完成的事？",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    imageAlt: "一个机器人在努力完成一项人类毫不费力就能轻松完成的简单物理任务",
    imageCaption: "捡起一件揉成一团的衬衫，人零点几秒就搞定了。同一件事，工程师可能要花上几年，才能让机器人勉强做出来。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "叠衣服听起来能有多难：拿起衬衫，抖开，找到袖子，对折，放好。你做这一整套的时候，脑子基本是空的。" },
        { type: "paragraph", text: "换成机器人，这是地狱难度。开门、捡玩具、系鞋带、倒麦片、从地上拎起书包，全是人随手就干了的事，也全是机器人领域最难啃的问题。" },
        { type: "paragraph", text: "它们能造汽车、能上火星、能在工厂里举起几百公斤。怎么一只袜子就把它难住了？因为真实世界实在太乱了。" },
      ] },
      { title: "人类比我们意识到的更厉害", blocks: [
        { type: "paragraph", text: "你的大脑和身体一直在干一些非常了不起的事，只是你从来没留意过。伸手去拿一支铅笔，你瞬间就知道它在哪儿、大概多重、要用多大劲捏住、手指该怎么绕过去。哪怕它是侧躺着的、压在笔记本底下、或者半截悬在桌沿外面。" },
        { type: "paragraph", text: "这一整套，机器人得一步一步算。先看见铅笔，再判断铅笔和桌子是两个东西，再选一个下手的位置，再把手臂挪过去还不能碰倒旁边的杯子，再用刚刚好的力气捏住它，还不能捏断。要做的事多得离谱。" },
        { type: "callout", accent: "green", text: "抓东西之所以看起来毫不费力，是因为我们花了很多年，把眼睛、双手、肌肉和大脑练成了一套。机器人得从零开始学这一切。" },
      ] },
      { title: "软东西很难处理", blocks: [
        { type: "paragraph", text: "软的、塌的、没固定形状的东西，是机器人的噩梦。刚洗好的衣服就是最好的例子：衬衫没有固定形状，会弯、会皱、会拧、会瘫成一团；毛巾能折到自己身上；一只袜子能整个藏进另一只袜子里。" },
        { type: "paragraph", text: "硬东西反而好办。金属块永远是那个形状，塑料盒有清清楚楚的边，杯子的样子可以预判。布料不一样，它每动一下就换一个形状。机器人没法记住「衬衫长这样」，它得搞懂布是怎么行动的。这非常难。" },
      ] },
      { title: "开门没有那么简单", blocks: [
        { type: "paragraph", text: "数数你见过多少种门：圆旋钮的、长把手的、左右推拉的、往里推的、往外拉的、沉得要命的、轻飘飘的、会卡住的、自己会关上的。" },
        { type: "paragraph", text: "人扫一眼基本就知道该怎么办。机器人得先找到把手，搞清它往哪个方向动，把夹爪摆到正确角度，使出合适的力气，还得在门开的同时把自己往后或往前挪开。该拉的时候推了，失败；抓把手的角度歪了，也失败。你两秒钟的事，是人家一个正经的工程课题。" },
      ] },
      { title: "世界不会静止不动", blocks: [
        { type: "paragraph", text: "工厂机器人做重复动作强到可怕，因为那个环境是被控住的：零件每次都从同一个位置过来，手臂每次都走同一条轨迹。家里、学校和户外完全是另一回事。" },
        { type: "paragraph", text: "东西一直在挪。书包今天在地上，明天在椅子上；玩具可能是倒扣着的。机器人得应付这些没写在剧本里的情况。人类在这方面简直开挂：铅笔滚到椅子底下了，你弯个腰、把椅子拉开、绕过书包、伸手捞出来，全程不需要重新编程。机器人正在变好，但这仍然是整个领域最硬的骨头之一。" },
      ] },
      { title: "拿起东西需要判断力", blocks: [
        { type: "paragraph", text: "人拿东西的时候会自动换手感。你握锤子和捏鸡蛋不是一个力道，抓棒球和端纸杯也完全不同。力度、手指位置、动作路线，全都在悄悄调整。" },
        { type: "paragraph", text: "这些机器人得一条条学。捏轻了掉地上，捏重了直接碎，抓的位置不对就一路滑下去。碰上光滑的、透明的、软的、特别小的、特别沉的、形状怪的，或者干脆还在动的，难度再翻几倍。所以机械手和夹爪到今天仍然是工程界的重点战场。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "机器人很强，但人类生活的世界实在太复杂。对我们来说随手就干的事，对它们往往是难题，因为人在感知、平衡、触觉、临场调整和从经验里学习这几件事上，好得有点过分。" },
        { type: "callout", accent: "green", text: "下次你叠一件衬衫、开一扇门、从柜子里摸出一包零食，你正在完成机器人可能搞不定的动作。你的大脑和这双手，本身就是顶级的工程作品。" },
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
        { type: "paragraph", text: "烤面包机算机器人吗？遥控车呢？自动售货机？智能音箱？扫地机器人呢？" },
        { type: "paragraph", text: "「机器人」这个词现在被到处乱用，可不是每台机器都够格。机器人是一台能感知世界、做出判断、然后动手的机器。绝大多数机器人身上有三样东西：传感器、控制器、执行器。翻译成人话就是：它注意到了什么，它想了一下，然后它动了。" },
      ] },
      { title: "第一部分：传感器帮助机器人注意", blocks: [
        { type: "paragraph", text: "机器人得先知道周围在发生什么，这些信息全靠传感器。传感器就是专门探测某样东西的小装置，能探到的包括光线、距离、声音、触碰、温度、运动、方向、颜色和压力。" },
        { type: "paragraph", text: "扫地机器人靠传感器找墙、避楼梯、绕家具、找灰；自动驾驶汽车靠摄像头和一堆传感器读路面、标志、车和行人；工厂里的机械臂靠传感器确认零件有没有摆到位。没有传感器的机器人，等于一个没有视觉、听觉和触觉的人在陌生房间里瞎摸。" },
      ] },
      { title: "第二部分：控制器帮助机器人决定", blocks: [
        { type: "paragraph", text: "控制器是机器人拿主意的地方。它不是人那样的大脑，它是跑指令的那一块。而指令可以简单到不能再简单，也可以复杂得吓人。" },
        { type: "paragraph", text: "简单的机器人守着一句话就够了：传感器碰到墙，就左转。高级一点的会调用摄像头、地图和一整套程序，算出穿过房间最安全的那条路。控制器可能是一块微型计算机、一张电路板，也可能是一颗很猛的处理器。它接住传感器送来的信息，然后决定下一步。" },
        { type: "callout", accent: "green", text: "感知，决策，行动。这个圈一遍遍转下去，是整个机器人技术里最重要的概念之一。" },
      ] },
      { title: "第三部分：执行器帮助机器人移动", blocks: [
        { type: "paragraph", text: "执行器是真正让机器人动起来的那部分。电机是最常见的一种，能转轮子、抬手臂、带齿轮、开夹爪、拧关节。" },
        { type: "paragraph", text: "工厂里的机械臂往往每个关节配一台电机；机械手靠微型电机或者钢索拉动手指；无人机靠电机转螺旋桨把自己顶在空中。没有执行器，机器人能看能想，但一步也迈不出去。" },
      ] },
      { title: "机器人必须看起来像人吗？", blocks: [
        { type: "paragraph", text: "不必。这大概是关于机器人最大的一个误会。它不需要脸，不需要胳膊腿，也不需要眼睛。形状完全取决于它要干的活：小圆盘吸尘器、六轮探测车、单臂机械手、无人机、潜水器、送货小车，或者流水线上那台方方正正的机器。" },
        { type: "callout", accent: "green", text: "好的机器人设计都从同一个问题开始：这台机器人到底要做什么？形状、传感器、怎么动，全是从这个答案里长出来的。" },
      ] },
      { title: "遥控汽车是机器人吗？", blocks: [
        { type: "paragraph", text: "一般来说不算，因为每一个动作都是人按出来的。但如果这台车能自己发现障碍、自己决定往哪拐，它就开始像机器人了。分界线就落在决策这两个字上：只执行人类直接命令的，是机器；能根据自己收集到的信息做出哪怕一点点判断的，才是机器人。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "机器人不只是会动的机器。它用传感器收集信息，用控制器处理指令，用执行器把想法变成动作。它不必长得像人，也不必会说话，它的核心永远是同一个循环：" },
        { type: "callout", accent: "green", text: "感知，决策，行动。就是这个循环，让机器人技术这么强，也这么好玩。" },
      ] },
    ],
  },
  "how-mars-rovers-drive-without-a-driver": {
    ...localizedBlogArticles.en["how-mars-rovers-drive-without-a-driver"],
    title: "火星探测车如何在没有驾驶员的情况下行驶？",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    imageAlt: "一辆火星探测车在火星表面崎岖的红色地形上行驶，没有人类驾驶员，完全由车载摄像头和软件引导",
    imageCaption: "探测车得自己开，因为地球发出的信号单程最长要走 24 分钟。等人类反应过来，早就撞上去了。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "就在此刻，火星上有机器人在开车。火星探测车是一批在另一颗星球表面跑来跑去的机器人探险家，研究岩石、拍照片、把线索送回给科学家。方向盘后面没人坐，附近也没有哪个宇航员握着遥控器。" },
        { type: "paragraph", text: "那它到底是怎么开的？答案里有距离、摄像头、轮子、计划，还有大量的耐心。" },
      ] },
      { title: "火星非常遥远", blocks: [
        { type: "paragraph", text: "火星离地球好几百万英里。这么远，任何一条消息都得在路上跑一会儿。无线电信号已经快到离谱，可它依然不是瞬间到达。取决于两颗星球各自跑到了轨道的哪个位置，一条指令送到火星要花几分钟到二十多分钟。" },
        { type: "paragraph", text: "所以科学家没法像玩赛车游戏那样开探测车。假如它正朝一块石头滚过去，地球上的工程师按下停止键也没用。等命令飞到火星，事故早就发生完了。" },
      ] },
      { title: "探测车接收指令", blocks: [
        { type: "paragraph", text: "探测车通常不会某天醒来就自己决定去哪儿逛逛。地球上有一整支团队在研究它传回来的图像和数据，看地形，挑目标：一块有意思的岩石、一片土壤、一座小丘、一段好走的路。" },
        { type: "paragraph", text: "然后他们把一组指令打包发过去，可能是开到某个点、拍几张照、检查一块石头、启用某台科学仪器。但因为那段延迟，探测车自己也得有点主见。" },
      ] },
      { title: "摄像头是探测车的眼睛", blocks: [
        { type: "paragraph", text: "探测车靠摄像头看世界。有的朝前，负责规划路线；有的朝下，盯着脚底下的地面；有的拍大场面的全景；还有的专门帮科学家把一块石头看个仔细。" },
        { type: "paragraph", text: "它能从这些画面里挑出麻烦：大石块、陡坡、坑洞、松软的沙地。这件事很关键，因为火星不是一片平整的停车场。那里有尘土、碎石、山脊、陨石坑和各种起伏。走错一步就可能陷住或者撞坏。" },
      ] },
      { title: "为另一颗星球设计的车轮", blocks: [
        { type: "paragraph", text: "它的轮子是专门为烂路设计的，得能翻过石头、能在尘土里咬住地面、能在冻死人的低温下扛住整车的重量，而且方圆几亿公里没有一家修理厂。" },
        { type: "paragraph", text: "自行车爆胎了，总有人能帮你补上。探测车的轮子裂了，工程师只能隔着一整个星际距离想办法。所以它开得又慢又谨慎。这里比的从来不是速度，是别停下。" },
      ] },
      { title: "探测车可以自行避开一些麻烦", blocks: [
        { type: "paragraph", text: "探测车用的是自主导航，也就是把一部分决定交给机器人自己。工程师告诉它开到某个点，路上它一边走一边用摄像头检查前方，遇到危险的岩石或者斜坡，它可以自己改道，也可以干脆停下来。" },
        { type: "callout", accent: "green", text: "它不是在像人一样思考。它在跑一套写得非常讲究的程序，程序一路都在问：这条路安全吗？前面有东西吗？我能绕过去吗？还是先停下来等新指令？" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "火星探测车没有驾驶员，靠的是地球发来的计划、看路的摄像头、为烂地形造的轮子，还有替它避开危险的软件。它不可能被当成遥控车来开，因为火星实在太远了。" },
        { type: "paragraph", text: "每一圈车轮转动都算在同一件事上：替人类去看一眼我们还没能亲自站上去的地方。" },
      ] },
    ],
  },
  "why-robot-hands-are-so-hard-to-make": {
    ...localizedBlogArticles.en["why-robot-hands-are-so-hard-to-make"],
    title: "为什么机器人的手这么难做？",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    imageAlt: "一只机械机器人手，展示其铰接式手指关节和传感器，试图复制人手的多功能性",
    imageCaption: "同一只手，能捏住一颗葡萄不把它压破，也能攥住一根杠铃不撒手。把这件事复刻到机器上，是工程界最难的题目之一。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "低头看看你的手。张开，握紧，把手指挨个动一遍。用拇指去点每一根指尖，捏起一支铅笔，敲两下桌子，再轻轻托住点什么。你的手刚刚做完了一串相当夸张的动作。" },
        { type: "paragraph", text: "人手是工程师最难复刻的东西之一。机器人手拍出来很酷，但要让它真像一只手那样干活，难度高得离谱。手不是一把夹子。它同时是灵活的、敏感的、有力的、温柔的，而且背后连着一个非常强的大脑。" },
      ] },
      { title: "手指很复杂", blocks: [
        { type: "paragraph", text: "人手上的活动部件多到吓人。每根手指都有好几个关节，拇指还能用一种特别的方式转过来点到其他每一根手指，手腕能转、能弯、能微调角度。这一大堆零件配合起来，你才能从任何角度把东西抓住。" },
        { type: "paragraph", text: "机器人手得用机械件把这些动作全部复刻一遍：关节、电机、齿轮、钢索、材料、控制系统。光是让一根手指动得顺滑就已经很难，让五根同时协作着干一件有用的事，难度再上一个台阶。" },
      ] },
      { title: "握力很棘手", blocks: [
        { type: "paragraph", text: "你拿东西的时候，力道是自动配好的。捏薯片轻得像没使劲，背书包的时候手指扣得死紧，铅笔在两者中间。" },
        { type: "paragraph", text: "这些机器人全得学。太紧，东西碎了；太松，东西滑走了；抓的位置不对，东西在手里一拧就掉。物体的形状、大小、重量和手感一变，难度就跟着变。光溜溜的玻璃杯和毛茸茸的网球不是一回事，海绵和金属勺也不是。" },
      ] },
      { title: "触感很重要", blocks: [
        { type: "paragraph", text: "你的手上铺满了触觉传感器，能读出压力、质地、温度、有没有在打滑，还有疼。杯子刚开始往下溜的那一瞬间，你的手指就已经收紧了。" },
        { type: "paragraph", text: "机器人手也需要这套感觉，可复刻人的触觉极其困难。它得随时知道：我碰到了吗？我用了多大力？它在滑吗？这东西是软是硬？我是不是快把它捏坏了？没有这些反馈，它就只能靠猜，而猜的结果通常是东西掉在地上。" },
      ] },
      { title: "人手擅长处理奇怪的物体", blocks: [
        { type: "paragraph", text: "人手能拿的东西种类多到荒谬：硬币、三明治、水瓶、鞋带、篮球、揉成一团的纸。这些东西形状全不一样，有小有大，有软有滑，有的你一碰它就变形。" },
        { type: "paragraph", text: "机器人手在东西可预测的时候表现最好。专门为工厂里某一种零件设计的手，可以做得又快又准。但一只什么都能捡起来的通用机械手？那是完全不同量级的难题。" },
      ] },
      { title: "机器人手不总需要看起来像人手", blocks: [
        { type: "paragraph", text: "最好用的机器人手，往往不是最像人手的那只。有的机器人只装两根手指的夹钳，有的直接用吸盘，有的用能裹住物体的软橡胶指，有的干脆用磁铁去吸金属件。" },
        { type: "callout", accent: "green", text: "工程师是按任务挑设计的。机器人手要匹配的是它要解决的问题，不是人手的形状。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "机器人手难做，是因为「抓住一个东西」这件事根本不简单。一只真正好用的手需要动作、力量、轻重拿捏、触觉、控制，还得应付那些软的、滑的、皱的、形状离谱的东西。" },
        { type: "paragraph", text: "人手好用到我们已经忘了它有多神。你每一次系鞋带、撕开零食袋、伸手接住一个球，都在做工程师至今还在追赶的事。这也正是机器人手在整个机器人领域里最有意思的原因。" },
      ] },
    ],
  },
  "how-factory-robots-build-cars": {
    ...localizedBlogArticles.en["how-factory-robots-build-cars"],
    title: "工厂机器人如何制造汽车？",
    category: "机器人",
    readTime: common.zh.minutes.m5,
    imageAlt: "汽车制造装配线上的机械臂正在焊接和装配车身面板",
    imageCaption: "工厂里的机械臂没有一台是万能的。每条手臂只被编好一件事，然后一丝不苟地重复几千遍。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "一辆车是几千个零件拼出来的庞然大物：车门、座椅、轮子、玻璃、线束、灯、发动机或者电机，还有一大堆藏在里面、多数人一辈子没见过的部件。把这些东西装成一辆车，工作量大得惊人。" },
        { type: "paragraph", text: "现代汽车厂里，那些讲速度、讲力气、讲精度、讲重复的活儿，很多都交给了机器人。它们基本上都不像人。更多的是一条条巨大的机械臂，动起来准得有点吓人。" },
      ] },
      { title: "工厂机器人擅长重复", blocks: [
        { type: "paragraph", text: "机器人最强的本事，是把同一个动作做上一万遍还不走样。造车正好吃这一套：太多零件必须以完全相同的方式摆好、焊上、喷好、送走。一条机械臂能在极小的误差里重复几千次，不会累，不会走神，也不会忘了下一步是什么。" },
        { type: "callout", accent: "green", text: "要是它的任务是在每副车架的同一个点上焊一下，那它就能一整天精确地落在那个点上，一次不差。" },
      ] },
      { title: "焊接车身", blocks: [
        { type: "paragraph", text: "机械臂在厂里的头号工作之一是焊接，也就是用高温把金属件接到一起。车身必须结实、必须装得规规矩矩，而焊接臂能又快又准地伸到人手很难够着的位置。" },
        { type: "paragraph", text: "工程师、技术员和工人负责设计、盯着、修理、编程和检查这一整套系统。机器人做重复的体力动作，人负责让整条线真的跑得起来。" },
      ] },
      { title: "精密喷漆", blocks: [
        { type: "paragraph", text: "给车喷漆可不是往铁皮上刷个颜色那么随便。漆面要平、要匀、要前后一致。喷多了会流下来，喷少了会盖不住。所以这活儿常常交给机器人：它能按着设定好的轨迹移动喷枪，在车门、引擎盖、车顶和各种曲面上铺出均匀的一层。" },
      ] },
      { title: "移动重型零件", blocks: [
        { type: "paragraph", text: "有些零件是真的重。机器人可以把它们安全地抬起来、挪过去、摆到位。一条机械臂负责把车门送进卡位，另一套系统负责沿着装配线把零件运过来。反复搬重物对人来说又累又危险，机器人接手之后，工厂安全了不少。" },
      ] },
      { title: "安全与编程", blocks: [
        { type: "paragraph", text: "这些机器人力气大、速度快，所以安全是头等大事。很多工业机器人被围在有护栏、传感器和警示灯的区域里干活。有一类比较新的叫协作机器人，多加了好几层安全设计，可以离人更近一些。" },
        { type: "paragraph", text: "工厂机器人不会凭空知道怎么造车，一切都得写进去：往哪儿动、动多快、什么时候换工具、使多大力、出岔子了怎么办。一个汽车厂里，机器人、传送带、摄像头、工具和工人被一条规划得极细的流程串在一起。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "工厂机器人靠焊接、喷漆、搬零件和一遍遍精确重复，把车造出来。它们大多不是人形的，因为它们是为具体的活儿设计的。焊接机器人和喷漆机器人长得完全不一样，因为这两件事需要的工具和动作根本不同。" },
        { type: "callout", accent: "green", text: "汽车厂里最好的一堂工程课是这样的：机器人不是拿来好看的，是拿来解决问题的。在这里，它们负责把几千个孤零零的零件变成一台能上路的机器。" },
      ] },
    ],
  },
  "why-is-the-sky-blue-but-sunsets-are-orange": {
    ...localizedBlogArticles.en["why-is-the-sky-blue-but-sunsets-are-orange"],
    title: "天空为什么是蓝色的，日落为什么是橙色的？",
    category: "科学",
    readTime: common.zh.minutes.m4,
    imageAlt: "天空从顶部的深蓝色过渡到日落时地平线附近温暖的橙色和粉红色",
    imageCaption: "白天把蓝光撒满天空的那层大气，到了傍晚，送进你眼睛的换成了更暖的那几种光。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "找个晴天抬头看，天是蓝的。傍晚太阳落下去的时候再抬一次头，同一片天可能烧成橙色、红色、粉色，运气好还带点紫。" },
        { type: "paragraph", text: "中间到底变了什么？太阳没换，空气也没换。变的是阳光穿过大气层的那条路。就这一点差别，结果天差地别。" },
      ] },
      { title: "阳光不只是一种颜色", blocks: [
        { type: "paragraph", text: "阳光在我们眼里是白的或者淡黄的，其实它是一大堆颜色混在一起的结果。你可以把一束阳光想成一道被压扁塞进去的彩虹。" },
        { type: "paragraph", text: "这道彩虹里有红、橙、黄、绿、蓝、靛、紫。每种颜色都以波的形式往前跑，有的波长比较长，比如红和橙；有的波长比较短，比如蓝和紫。这一点非常关键，因为撞上空气里的微小颗粒时，长波和短波的反应完全不同。" },
      ] },
      { title: "空气并非空无一物", blocks: [
        { type: "paragraph", text: "天看起来空荡荡的，可地球的大气层里塞满了小到看不见的分子。阳光一路下来，一直在跟它们相撞。" },
        { type: "paragraph", text: "撞上去之后，一部分光会被散射，也就是不再走直线，而是往各个方向乱弹。蓝光波长更短，所以它比红光和橙光更容易被弹开。" },
        { type: "paragraph", text: "于是白天阳光一进大气层，蓝光就被撒得满天都是，从四面八方钻进你的眼睛。整片天看起来是蓝的，原因就在这儿。" },
      ] },
      { title: "那为什么天空不是紫色的？", blocks: [
        { type: "paragraph", text: "这个问题问得很好，因为紫光散射得比蓝光还厉害。天之所以通常不是紫的，有三个原因叠在一起：太阳发出的紫光本来就比蓝光少；一部分紫光在大气层上层就被吸收掉了；而我们的眼睛对蓝光比对紫光敏感得多。紫色确实也在场，只是蓝色赢了。" },
      ] },
      { title: "日落时什么改变了？", blocks: [
        { type: "paragraph", text: "太阳落到很低的位置时，阳光得穿过厚得多的一段大气才能到你眼睛里。拿手电筒直直地照穿一薄片玻璃，再拿它从侧面照穿一整个玻璃杯最长的那条路，光要挤过去的东西完全不是一个量级。" },
        { type: "paragraph", text: "日落就是后面那种情况。光在这条更长的路上走着走着，蓝光基本已经被散射光了。剩下能跑到你眼前的，是波长更长的那几种：红、橙、黄。所以傍晚的天看起来又暖又亮。" },
      ] },
      { title: "为什么有些日落格外绚烂？", blocks: [
        { type: "paragraph", text: "有的日落平平无奇，有的像整片天被点着了。差别通常来自空气里飘着的东西：尘土、水滴、污染、烟和云，都会改变光被散射的方式。" },
        { type: "paragraph", text: "云还能当巨大的幕布使。太阳压得很低的时候，橙红色的光会从底下打上去，把云照得整个发亮。所以暴雨刚过、或者天上云和晴空的比例刚刚好的时候，日落往往最惊人。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "天是蓝的，因为蓝光在大气里最容易被散射开。日落是橙红的，因为阳光要穿过更多空气，蓝光半路就被散射光了，只剩下暖色跑到你眼前。" },
        { type: "callout", accent: "orange", text: "所以下次你抬头看到一片蓝天，或者一场烧起来的日落，你看到的不只是好看的颜色，而是阳光和地球大气层正面撞上的结果。" },
      ] },
    ],
  },
  "why-do-your-ears-pop-on-an-airplane": {
    ...localizedBlogArticles.en["why-do-your-ears-pop-on-an-airplane"],
    title: "乘飞机时耳朵为什么会鸣响？",
    category: "科学",
    readTime: common.zh.minutes.m4,
    imageAlt: "从飞机舱内往外看起飞时的视角，说明导致耳朵鸣响的气压变化",
    imageCaption: "外面的气压变得比你身体能跟上的速度还快，耳膜就会被顶出一个弧度。起飞和降落时那股难受劲，就是这么来的。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "坐过飞机的话，你大概经历过这个：起飞或者降落的时候耳朵里越来越胀，越来越闷，然后突然一下，啵。" },
        { type: "paragraph", text: "那感觉挺怪的，有点烦，有时候还真疼。但你的耳朵一点问题都没有。它只是在对气压做出反应。" },
      ] },
      { title: "空气有压力", blocks: [
        { type: "paragraph", text: "空气看起来轻飘飘的，其实它一直在压着东西。此时此刻，你周围的空气正从各个方向往你身上压。在海平面，你头顶上堆着厚厚一层空气，所以压力大。飞到高空，头顶上的空气少了，压力就低。" },
        { type: "paragraph", text: "飞机起飞是往低压区爬，降落是往高压区回。客舱虽然做了增压来保证大家安全舒服，舱内气压还是会变。而你的耳朵，恰好特别在意这件事。" },
      ] },
      { title: "耳膜感受到了差异", blocks: [
        { type: "paragraph", text: "你耳朵里有一层很薄的膜，叫耳膜。声音撞上去它就振动，你才听得见。耳膜的两边都有空气：外面耳道里的，和后面中耳里的。" },
        { type: "paragraph", text: "耳朵要想舒服，这两边的压力得差不多。可外面的压力一旦变得太快，后面那边常常跟不上。压差一出现，耳膜就被推过去或者吸过来。那股发胀、发堵、说不上哪儿不对的感觉，就是这么来的。" },
      ] },
      { title: "咽鼓管帮助解决问题", blocks: [
        { type: "paragraph", text: "你身体里有一根细管子，叫咽鼓管，一头连着中耳，一头通到嗓子后面。它平时是闭着的，但你吞咽、打哈欠或者嚼东西的时候，它会短暂地开一下。" },
        { type: "paragraph", text: "一开，空气就能进出中耳，两边的压力立刻扯平。你听到的那声啵，就是压力被扯平的那一瞬间。" },
      ] },
      { title: "为什么降落时感觉比起飞更明显？", blocks: [
        { type: "paragraph", text: "很多人觉得降落比起飞难受得多。因为降落的时候飞机在往下走，舱内气压在升高，中耳得赶紧灌进更多空气才追得上外面。" },
        { type: "paragraph", text: "如果咽鼓管不太愿意开，耳膜就会被硬生生往里压，比起飞时那种变化疼得多。这也是为什么感冒的时候坐飞机特别遭罪：鼻子和喉咙一堵，咽鼓管更打不开了。" },
      ] },
      { title: "为什么吞咽或打哈欠有帮助？", blocks: [
        { type: "paragraph", text: "吞咽和打哈欠会带动咽鼓管附近的肌肉，帮它把门推开。所以起飞降落的时候嚼口香糖、喝点水、故意打个哈欠都有用，这些动作等于在催那套平衡系统赶紧干活。" },
        { type: "paragraph", text: "飞机上的婴儿老是哭，有一部分原因就是耳朵胀得难受又不知道该拿它怎么办。不过哭这件事会让他们不停地动嘴和喉咙，结果反而真的帮耳朵通了气。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "坐飞机耳朵会响，是因为飞机爬升和下降的时候气压在变。耳膜察觉到了两边的差，咽鼓管出面把它们扯平。" },
        { type: "callout", accent: "orange", text: "那一声啵，是你的身体刚刚完成了一次调整。感觉是有点怪，但那其实是一套挺聪明的内置系统正在干活。" },
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
        { type: "paragraph", text: "去摸一下金属椅子腿，再摸一下同一个房间里的木桌。金属摸着凉，木头摸着温吞吞的。可有意思的地方在这儿：它们的温度八成一模一样。" },
        { type: "paragraph", text: "那为什么一个更凉？因为你摸出来的其实不是温度，是热量跑掉的速度。" },
      ] },
      { title: "你的手是温暖的", blocks: [
        { type: "paragraph", text: "你的身体通常比周围的东西暖。皮肤大概 32°C，房间大概 21°C。你一碰上比手凉的东西，热量就开始从手往那个东西里流。" },
        { type: "paragraph", text: "而你的神经读的不是那东西有多少度，是热量离开皮肤的速度。热量走得快，你觉得凉；走得慢，就没那么凉。" },
      ] },
      { title: "金属快速传导热量", blocks: [
        { type: "paragraph", text: "金属是很好的热导体，热量在它内部跑得毫无阻碍。你一碰上去，手上的热量迅速灌进金属，还从接触点一路往外摊开。热量不停被带走，你的手就不停往外送，皮肤温度掉得飞快，大脑给出的结论是：凉。" },
        { type: "paragraph", text: "木头是另一个极端。跟金属比，它导热差得多，热量在里面几乎挪不动。你摸上去，热量慢吞吞地散，指头底下那一小块木头稍微热了一点，而且热量不怎么往外跑。于是它摸着是温的，哪怕它和金属是同一个温度。" },
      ] },
      { title: "相同温度，不同感受", blocks: [
        { type: "paragraph", text: "这是日常生活里最好玩的把戏之一：温度和手感根本不是一回事。同一个厨房抽屉里的金属勺和木勺，放了那么久，温度基本相同。可金属勺摸着就是更凉，因为它从你手上抽热量抽得更快。" },
        { type: "callout", accent: "orange", text: "你的触觉真正在读的是热量的流动。两个温度完全一样的东西，只要抽热的速度不同，摸起来就能差出一个季节。" },
      ] },
      { title: "这在设计中为什么重要？", blocks: [
        { type: "paragraph", text: "工程师天天在琢磨热传导这件事。金属锅好用，是因为它能把炉子的热量飞快送进食物。可同样的道理，锅把手也会烫到握不住。所以很多锅的把手是塑料、橡胶或者木头的。" },
        { type: "paragraph", text: "冬天的外套管用，靠的是把热传导拖慢：它把空气困在里面，而空气导热很差，你的体温就跑不掉。晒了一下午太阳的金属滑梯烫到不敢坐，因为金属传热太快；旁边的木长椅坐着就舒服，因为它不那么积极地从你身上取热。" },
      ] },
      { title: "寒冷天气呢？", blocks: [
        { type: "paragraph", text: "冬天在室外摸一把金属，那种凉是能钻进骨头里的，因为它抽热的速度实在太快。所以外面的金属栏杆、金属器械和金属工具，摸起来永远比木头和塑料冷得多。金属并没有神奇地更冷，它只是更会偷你的热量。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "金属摸着比木头凉，是因为它传热更快。你一碰上去，热量迅速从手上溜走，皮肤降温很快；木头传得慢，所以摸着是温的。下次你说某样东西「好凉」，你说的其实通常是热量跑得有多快，而不是它到底几度。" },
      ] },
    ],
  },
  "why-do-bikes-stay-balanced-when-moving": {
    ...localizedBlogArticles.en["why-do-bikes-stay-balanced-when-moving"],
    title: "自行车移动时为什么能保持平衡？",
    category: "科学",
    readTime: common.zh.minutes.m5,
    imageAlt: "一个人骑着自行车在移动，展示让两个轮子在运动中保持稳定的平衡和物理原理",
    imageCaption: "一辆跑起来的自行车之所以不倒，靠的是陀螺效应、转向几何，还有你大脑一刻不停做出的微调。这三样都在你察觉不到的地方使劲。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "按理说自行车应该倒。两个细轮子，一个窄车架，几乎没什么东西撑着它站住。你要是原地骑，几秒钟就得撑地。可只要车一动起来，事情立刻简单了。" },
        { type: "paragraph", text: "跑起来的自行车凭什么就不倒了？答案不是某一个诀窍，而是运动、转向、车架设计和你大脑的微调，四件事一起在干活。" },
      ] },
      { title: "平衡是把重心保持在轮子上方", blocks: [
        { type: "paragraph", text: "任何东西都有重心，也就是重量平衡的那个点。人和车加在一起也有一个共同的重心，只要它保持在轮子正上方，车就立得住。一旦它往一边偏得太多，车就开始倒。" },
        { type: "paragraph", text: "车停着的时候，你几乎没法纠正这种倾斜，只能扭车把、扭身子，或者干脆一脚点地。车动起来就不一样了：转向能把轮子重新挪回到你身体正下方。" },
      ] },
      { title: "自行车向倾斜方向转向", blocks: [
        { type: "paragraph", text: "反直觉的地方在这儿：车往哪边倒，前轮就往哪边拐一点。车往左歪，前轮就往左偏，整条行进路线挪到骑手底下，平衡就回来了。" },
        { type: "paragraph", text: "所以车滚起来才会稳。而且骑车的人一直在无意识地做这件事。你全程都在做极小的转向修正，小到你自己完全没察觉。你的大脑、手臂和身体在合力把车一直保持在你屁股底下。" },
      ] },
      { title: "轮子也有帮助", blocks: [
        { type: "paragraph", text: "骑起来的时候车轮在高速旋转，转动的轮子带着角动量，也就是它倾向于保持原来的转动方向。这确实让车感觉更稳，但它不是全部答案。就算把这个效应削得很弱，自行车照样能保持平衡。车架的形状和设计同样重要。" },
      ] },
      { title: "自行车设计让平衡更容易", blocks: [
        { type: "paragraph", text: "自行车的前叉是斜着的，不是竖直的。这带来一个叫拖距的效果，让前轮自然而然地跟着前进方向走。思路很朴素：把车设计成前轮会自己往有利的方向对齐，转向就更顺，小幅度的摇晃也能自己修回来。" },
        { type: "paragraph", text: "工程师对这块特别较真。前叉角度或者轮子尺寸变一点点，整辆车就会从稳重变得灵敏，或者从跟手变得发飘。" },
      ] },
      { title: "为什么慢骑更难？", blocks: [
        { type: "paragraph", text: "骑得慢的时候，你没有足够的时间和速度去纠正倾斜。车的反应变钝，一点点晃动就被放大。所以慢速走直线比正常速度骑难得多，也所以刚学车的人一旦敢骑快一点，反而立刻觉得稳了。" },
      ] },
      { title: "自行车为什么不能自己站立？", blocks: [
        { type: "paragraph", text: "车停着的时候，它没法靠转向把自己挪回骑手底下。一开始歪，重力就一路把它往下拽。没有前进的动作，轮子也就没有办法跑到重心下面去。所以它只能倒，除非有东西撑着：脚撑、墙、你的脚，或者辅助轮。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "自行车动起来能保持平衡，是转向、运动、旋转的车轮、车架设计和骑手的修正一起作用的结果。" },
        { type: "callout", accent: "orange", text: "它不是靠魔法立着的，它一直在纠正自己。你也一样。所以骑顺了之后，那种感觉才那么丝滑。" },
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
        { type: "paragraph", text: "在人行道上走路是件不用过脑子的事。走上冰面就完全不是了。前一秒你好端端地站着，下一秒脚往前飞出去，两条胳膊在空中乱抡，你正在全力以赴地不摔。" },
        { type: "paragraph", text: "冰凭什么这么滑？答案牵扯到摩擦力、表面状态、温度，还有你的鞋和冰之间到底发生了什么。" },
      ] },
      { title: "摩擦力帮助你走路", blocks: [
        { type: "paragraph", text: "摩擦力是那种专门跟滑动作对的力。你走路的时候，脚往后蹬地面，摩擦力就把你往前推。抓不住地，脚就只能空转。" },
        { type: "paragraph", text: "所以在干燥路面上走路毫不费劲：粗糙的表面给了鞋底一堆能咬住的东西。冰比这光滑太多了，能咬的地方少得可怜。" },
      ] },
      { title: "冰的表面很滑", blocks: [
        { type: "paragraph", text: "冰看着是块结结实实的固体，可它的表面行为相当古怪。在很多情况下，冰的最顶上会有一层极薄的水。就是这层薄水，让表面滑得离谱。" },
        { type: "paragraph", text: "所以你的鞋不是踩在一块粗糙的硬地上，而是隔着一点点水，在光溜溜的冰面上滑行。那点水起的作用，和机器里的润滑油差不多。" },
      ] },
      { title: "温度很重要", blocks: [
        { type: "paragraph", text: "不是所有的冰都一样滑。接近融点的冰通常最要命，因为那层薄薄的液态层最容易形成。冻得极狠的冰有时候反而没那么滑，表面的水更少，摸上去更干、更脆。" },
        { type: "paragraph", text: "但别误会，极冷的冰照样能让你摔。温度改变的是表面的脾气，不是危险本身。" },
      ] },
      { title: "鞋子也很重要", blocks: [
        { type: "paragraph", text: "鞋和鞋差别很大。鞋底又平又光的，基本没什么能咬住地面的东西。花纹深的鞋在雪地和不平的地面上抓得住，所以冬靴的底通常都做得坑坑洼洼，那些纹路就是用来制造摩擦的。不过碰上真正光滑的冰，好鞋也可能失手，因为鞋底再糙，也得有东西让它咬。" },
      ] },
      { title: "为什么我们滑得那么快？", blocks: [
        { type: "paragraph", text: "摩擦力一低，就没什么东西拦得住你的脚。在普通路面上，脚刚开始滑，摩擦力很快就把它按住了。在冰上，摩擦力太弱，脚会一路滑下去。所以一个本来微不足道的重心不稳，能直接演变成一次华丽的摔倒。" },
      ] },
      { title: "冰是一个设计挑战", blocks: [
        { type: "paragraph", text: "光滑表面是工程师和城市规划者天天在头疼的问题。道路、人行道、轮胎、鞋子、运动器材，全都绕不开摩擦力。撒盐是为了化冰，撒沙是为了增加粗糙度，轮胎花纹是为了把水和雪泥挤开。目标从头到尾只有一个：把抓地力找回来。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "我们在冰上摔跤，是因为冰的摩擦力太低。光滑的表面、可能存在的那层薄水、当时的温度、脚上那双鞋，共同决定了你能抓住多少地。" },
        { type: "callout", accent: "orange", text: "走路这件事对摩擦力的依赖，比大多数人以为的深得多。你迈出的每一步，都是鞋底和地面之间一次短暂的配合。" },
      ] },
    ],
  },
  "how-do-noise-canceling-headphones-work": {
    ...localizedBlogArticles.en["how-do-noise-canceling-headphones-work"],
    title: "降噪耳机如何工作？",
    category: "科学",
    readTime: common.zh.minutes.m5,
    imageAlt: "一副降噪耳机，带有图表显示反噪声波如何抵消传入的声波",
    imageCaption: "耳机用麦克风听见迎面而来的声音，立刻放出一段完全相反的波，在它抵达你耳朵之前把它抹掉。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "戴上降噪耳机的那一秒，吵成一锅粥的机舱、公交车和满是人的房间会突然安静一大截。这不是靠更厚的耳罩硬捂出来的。有些耳机是在用科学，拿声音去打声音。" },
        { type: "paragraph", text: "听起来不太可能，但它真的管用，因为声音是以波的形式跑的。" },
      ] },
      { title: "声音是一种波", blocks: [
        { type: "paragraph", text: "空气一振动，声音就出现了。有人说话的时候声带在抖，这些抖动推着拉着周围的空气，声波就这么产生了。波传到你耳朵里，大脑把它翻译成你听见的东西。" },
        { type: "paragraph", text: "声波有波峰也有波谷，你可以把它想成一条在空气里往前爬的曲线。声音越响，波越大；越轻，波越小。" },
      ] },
      { title: "相反的波可以相互抵消", blocks: [
        { type: "paragraph", text: "关键的一步在这里：波能叠起来，也能互相抵掉。一个波正在把空气往前推，另一个波在同一时刻把空气往回拉，两个撞在一起就会削掉一部分。" },
        { type: "paragraph", text: "降噪耳机干的就是这件事。它试图造出一段和噪音正好相反的波。不想听的声音和这段反向波迎面撞上，两边一起变弱。这个现象叫相消干涉。" },
      ] },
      { title: "耳机先在倾听", blocks: [
        { type: "paragraph", text: "降噪耳机上装着小麦克风，专门听你周围的噪音，比如飞机发动机的嗡嗡声、火车的隆隆声。耳机里的电路飞快地分析这段声音，算出一段相反的波，然后由耳机内侧的扬声器在你耳边把它放出来。" },
        { type: "paragraph", text: "结果就是真正钻进你耳朵的噪音变少了，因为有一部分在半路就被抵掉了。" },
      ] },
      { title: "为什么它对稳定的声音效果最好", blocks: [
        { type: "paragraph", text: "降噪对那些又稳又重复的声音特别灵：飞机发动机、空调、风扇、火车。这类声音变化不剧烈，耳机好预测，也好抵消。" },
        { type: "paragraph", text: "尖锐或者随机的声音就难对付了。狗叫、鼓掌、突然一声喊，变化太快，耳机顶多把它削弱一点，很难完全抹掉。所以降噪耳机给你的是一个更安静的世界，不是一个绝对无声的世界。" },
      ] },
      { title: "被动降噪与主动降噪", blocks: [
        { type: "paragraph", text: "耳机降噪有两条路。一条是被动的，靠物理硬挡：厚实的耳垫能拦住一部分外界声音。另一条是主动的，靠麦克风和反向波。大多数耳机两条一起上，耳垫挡掉一层，电路再抵掉一层。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "降噪耳机的工作方式是：听见外面的噪音，算出一段相反的声波，用小扬声器放出来。两段波一相遇，噪音就少了一块。" },
        { type: "callout", accent: "orange", text: "它们不是什么魔法耳罩，而是两个坐在你头上的微型声学工程师。" },
      ] },
    ],
  },
  "why-do-some-things-float-and-others-sink": {
    ...localizedBlogArticles.en["why-do-some-things-float-and-others-sink"],
    title: "为什么有些东西会浮起来，有些会沉下去？",
    category: "科学",
    readTime: common.zh.minutes.m4,
    imageAlt: "学生在 Avanza STEM 科学工作坊进行浮力和水的实验",
    imageCaption: "东西浮不浮，重量只是其中一环。真正说了算的是重力、形状，还有它把多少水挤开了。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "石头往下沉，沙滩球往上浮，而几万吨的钢铁货轮居然也浮着，哪怕钢比水重得多。到底是什么在决定谁浮谁沉？" },
        { type: "paragraph", text: "答案是浮力。" },
      ] },
      { title: "水向上推", blocks: [
        { type: "paragraph", text: "你把东西放进水里，水会往上顶它。这股向上的力就叫浮力。同时重力在往下拽。浮力顶得住这个重量，东西就浮着；重力赢了，它就沉下去。" },
      ] },
      { title: "物体把水推开", blocks: [
        { type: "paragraph", text: "东西一进水，就占了地方。原本待在那块地方的水被挤到旁边去，这叫排水。挤开的水越多，往上顶的力就越大。形状之所以关键，原因就在这儿。" },
      ] },
      { title: "密度是一个重要线索", blocks: [
        { type: "paragraph", text: "密度说的是一定的空间里塞了多少东西。石头密度大，因为很多物质被压进了很小的体积。泡沫球密度小，因为里面几乎全是空气。密度比水大，通常就沉；比水小，通常就浮。但形状能把这个故事整个改写。" },
      ] },
      { title: "钢铁船为什么能浮起来？", blocks: [
        { type: "paragraph", text: "钢的密度比水大。一个实心钢球扔下去，直接到底。可船不是一坨实心钢，它是一个巨大的、肚子里全是空气的形状。就因为这个形状，它的重量被摊到很大一片面积上，挤开了海量的水。" },
        { type: "paragraph", text: "把船身和它肚子里的空气一起算，整艘船的平均密度比水小。所以它浮着。一旦水灌进来把空气的位置填满，整体密度上去了，它就会沉。" },
      ] },
      { title: "为什么船有宽底部？", blocks: [
        { type: "paragraph", text: "船的设计目标是把足够多的水挤开。船体越宽，排开的水越多，托着它的浮力也越大。所以独木舟、货轮和邮轮长得天差地别，骨子里却都是围着浮力设计的。工程师做任何要浮起来的东西，都得把重量、形状、平衡和材料一起摆上桌面算。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "水往上顶的力顶得住物体的重量，这个东西就浮着。密度很重要，形状同样重要。" },
        { type: "callout", accent: "orange", text: "小石头会沉，因为它密度大，挤开的水又不够多。巨轮会浮，因为它的形状能挤开足以托住自己的水。浮起来靠的从来不是「轻」，而是重量、体积、形状和水的反推之间那笔账。" },
      ] },
    ],
  },
  "why-do-magnets-stick-to-some-metals-but-not-others": {
    ...localizedBlogArticles.en["why-do-magnets-stick-to-some-metals-but-not-others"],
    title: "磁铁为什么粘在某些金属上但不粘其他金属？",
    category: "科学",
    readTime: common.zh.minutes.m5,
    imageAlt: "一块磁铁吸引铁屑，铁屑排列成从磁极发出的不可见磁力线的形状",
    imageCaption: "磁铁能吸住铁和钢，是因为这些金属内部那些微小的磁畴会跟着外面的磁场排好队。换成铜或者铝，队伍根本排不起来。",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "磁铁看着简单得很：往冰箱上一贴就不掉，一靠近回形针就吸过来，碰到某些金属表面立刻黏住。可你拿它去贴铝箔、铜币或者易拉罐，什么都不会发生。凭什么有的金属吸得住，有的完全不理它？" },
        { type: "paragraph", text: "答案藏在材料内部那些极小的粒子里。" },
      ] },
      { title: "磁铁有看不见的磁场", blocks: [
        { type: "paragraph", text: "每块磁铁都在自己周围撑起一个看不见的磁场。你看不到磁场本身，但你看得到它干的事：把某些东西拽过来，或者让另一块磁铁自己转个方向。磁场在磁铁的两极附近最强，也就是我们平时说的南极和北极。" },
        { type: "paragraph", text: "异极相吸，同极相斥。所以同一块磁铁，一面能把另一块拉过来，翻过来就把它推开。" },
      ] },
      { title: "并非所有金属都有磁性", blocks: [
        { type: "paragraph", text: "很多人默认金属就该有磁性，其实不是。铁的磁性很强，钢因为含铁通常也吸得住，镍和钴同样有磁性。但一大堆常见金属对普通磁铁毫无反应：铝、铜、金、银、黄铜，贴上去就掉。它们当然还是金属，只是没有那种磁性行为。" },
      ] },
      { title: "微小的磁性区域", blocks: [
        { type: "paragraph", text: "有磁性的材料内部有一片片极小的区域，叫磁畴。你可以把它们想成一大群小箭头，每个箭头都指着某个磁性方向。在一块普通的铁里，这些箭头朝哪儿的都有，效果互相抵掉了一大半。" },
        { type: "paragraph", text: "磁铁一靠近，情况就变了：大量磁畴开始转向同一边。等排好队的箭头足够多，这块材料就被磁铁吸住了。回形针能挂在磁铁上，就是因为磁铁把它内部那些小箭头理成了一列。" },
      ] },
      { title: "铜为什么不粘磁铁？", blocks: [
        { type: "paragraph", text: "铜里当然也有电子，可它那些微小的磁效应没法像铁那样整齐地排起队。铜的内部结构不支持它变成一块强磁性的东西。所以冰箱贴在铜上待不住。铝、金和很多别的金属也是同一个道理：结构不对，吸力就出不来。" },
      ] },
      { title: "钢怎么样？", blocks: [
        { type: "paragraph", text: "钢主要是铁跟其他元素混出来的，常见的搭配里有碳。因为含铁，很多种钢都吸得住磁铁。但钢和钢也不一样，有些不锈钢的磁性弱得几乎测不出来，因为它们的内部结构不同。所以你会碰到这种情况：两个看起来都是钢的东西，磁铁在一个上面牢牢吸住，在另一个上面直接滑下来。" },
      ] },
      { title: "磁铁有用是因为它们有选择性", blocks: [
        { type: "paragraph", text: "磁铁挑食这件事其实非常有用。回收站靠磁铁把铁和钢从一堆材料里捞出来，电动机靠磁性产生转动，扬声器靠磁铁把电信号变成声音，指南针靠地球的磁场替你找到北。磁性不只是冰箱上那点小把戏，它撑着很多机器的运转。" },
      ] },
      { title: "核心思想", blocks: [
        { type: "paragraph", text: "磁铁能吸住某些金属，是因为那些金属内部有能跟磁场对齐的微小磁性区域。铁、钢、镍和钴被吸得很牢。铜和铝不行，它们的内部结构排不出那种队。" },
        { type: "callout", accent: "orange", text: "所以磁铁死活贴不住某块金属的时候，磁铁没坏。只是那块金属不属于会被吸引的那一类。" },
      ] },
    ],
  },
}

localizedBlogArticles.pt = {
  "why-every-kid-should-learn-to-code": {
    ...localizedBlogArticles.en["why-every-kid-should-learn-to-code"],
    title: "Por Que Toda Criança Deveria Aprender a Programar (e Como Começar)",
    category: "Programação",
    readTime: common.pt.minutes.m5,
    imageAlt: "Um mentor da Avanza STEM conduzindo uma oficina de programação, com estudantes em frente a notebooks",
    imageCaption: "Estudantes aprendem os fundamentos da programação durante uma oficina da Avanza STEM.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Uma coisa surpreende muita gente: programar está virando uma habilidade básica, no mesmo nível de ler e escrever. E, mesmo assim, um monte de criança termina a escola sem escrever uma única linha de código." },
        { type: "paragraph", text: "A gente viu isso acontecer na Biblioteca Pública de Clifton. Um estudante escreveu um programa que fazia exatamente uma coisa: imprimir a palavra \"Olá\". Depois passou vinte minutos enchendo o programa de perguntas novas, piadas ruins e efeitos sonoros. Ninguém pediu. Ele tinha acabado de descobrir que conseguia construir coisas e não quis mais parar." },
      ] },
      { title: "Não É Só Sobre Código", blocks: [
        { type: "paragraph", text: "Eis o que quase ninguém diz em voz alta: a meta não é transformar toda criança em programadora. A meta é o que programar faz com o jeito de pensar delas." },
        { type: "list", items: ["Quebrar um problema enorme em pedaços que dá para resolver", "Perceber quando você já viu algo exatamente igual antes", "Ignorar o ruído e focar no que importa", "Testar uma ideia, vê-la falhar e caçar o motivo"] },
        { type: "paragraph", text: "Os engenheiros usam essas quatro jogadas. Cientistas, escritores e quem abre um negócio também. Uma criança caçando um erro em um laço de Python está treinando exatamente o que vai precisar quando um experimento falhar ou um trabalho em grupo desandar." },
      ] },
      { title: "Qual É a Melhor Idade para Começar?", blocks: [
        { type: "numbered", items: [
          { title: "5 a 7 anos: lógica visual e sem tela", body: "Jogos de tabuleiro e apps como o ScratchJr ensinam a colocar passos em ordem, e ninguém precisa encostar em um teclado ainda." },
          { title: "8 a 11 anos: blocos", body: "O Scratch permite montar jogos e animações de verdade. Sem precisar escrever código, não há barreira, então elas vão direto para a construção." },
          { title: "12 anos ou mais: linguagens de texto", body: "O Python se lê quase como inglês, os profissionais o usam todos os dias e ele é uma excelente primeira linguagem de verdade." },
        ] },
      ] },
      { title: "Como Começar em Casa", blocks: [
        { type: "list", items: ["Crie uma conta gratuita no Scratch e deixe a criança explorar", "Assistam a um tutorial curto juntos e depois saia de perto", "Peça para ela explicar em voz alta o que o programa dela faz", "Deixe a criança travar. Destravar é a habilidade inteira", "Faça uma festa com o que ela construir, mesmo que seja pequenininho"] },
      ] },
      { title: "Um Primeiro Programa em Python", blocks: [
        { type: "paragraph", text: "Se seu filho já está pronto para escrever código de verdade, abra um editor no navegador como Replit ou Trinket e digite isto:" },
        { type: "code", title: "Teste Isto", accent: "green", code: "nome = input(\"Qual é o seu nome? \")\nprint(\"Olá, \" + nome + \"! Bem-vindo à programação.\")" },
        { type: "paragraph", text: "Isso é um programa de verdade. Ele faz uma pergunta, escuta e responde. Acrescente mais algumas perguntas e, de repente, você tem um chatbot ou um jogo de perguntas." },
        { type: "paragraphWithLink", before: "Quer o guia completo, incluindo como transformar isso em um quiz? Veja nosso ", linkText: "guia do Meu Primeiro Programa em Python", href: "/projects/my-first-python-program", after: "." },
      ] },
      { title: "O Quadro Completo", blocks: [
        { type: "paragraph", text: "Os estudantes hispânicos estão sub-representados na computação, e isso não tem nada a ver com capacidade. Tem a ver com quem recebe acesso, quem vê aquilo de perto e a quem dizem para seguir em frente." },
        { type: "paragraph", text: "A Avanza STEM existe para abrir portas que nunca deveriam ter sido fechadas." },
        { type: "quote", text: "Ele chegou em casa e quis logo me mostrar o programa que escreveu. Ficou acrescentando linhas o resto da noite.", attribution: "Mãe de um estudante em uma oficina de programação na Biblioteca de Clifton" },
        { type: "ctaLink", title: "Experimente uma Oficina Gratuita", text: "Se seu filho quiser experimentar uma oficina de programação gratuita e presencial, nós levamos todos os materiais e ele pode chegar sem nenhuma experiência.", linkText: "Ver próximas oficinas", href: "/workshops", accent: "teal" },
      ] },
    ],
  },
  "5-easy-science-experiments": {
    ...localizedBlogArticles.en["5-easy-science-experiments"],
    title: "5 Experimentos de Ciências Fáceis Para Fazer em Casa",
    category: "Ciências",
    imageAlt: "Um ovo coberto de bolhas de dióxido de carbono durante uma reação química de cozinha",
    imageCaption: "Bolhas de dióxido de carbono se formam durante uma reação química de cozinha, o mesmo tipo de reação presente em vários destes experimentos.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Você não precisa de jaleco e definitivamente não precisa de equipamento caro. A melhor ciência caseira funciona com vinagre, papel-toalha e o refrigerante que estiver na geladeira." },
        { type: "paragraph", text: "Cada experimento abaixo traz materiais, passos e uma explicação em português simples, para você conversar com seu filho sobre o que ele acabou de ver." },
        { type: "summary", timeLabel: "Tempo necessário", time: "30 a 45 minutos para os cinco", ageLabel: "Idade recomendada", age: "A partir de 5 anos, com ajuda de um adulto para os menores", supervisionLabel: "Supervisão de adulto", supervision: "Sim, principalmente no experimento do Ovo na Garrafa, que usa fogo", learnLabel: "O que vão aprender", learn: "reações químicas, pressão dos gases, densidade e capilaridade", safetyLabel: "Aviso de segurança", safety: "Um adulto deve acender o fósforo e supervisionar de perto o experimento do ovo" },
      ] },
      { title: "", blocks: [{ type: "experiments", items: [
        { number: 1, title: "Vulcão de Bicarbonato e Vinagre", category: "Química", materialsLabel: "Materiais", stepsLabel: "Passos", scienceLabel: "A Ciência", materials: ["1/2 xícara de bicarbonato de sódio", "1 xícara de vinagre branco", "Detergente", "Corante (opcional)", "Um copo ou pote"], steps: ["Coloque o bicarbonato no copo.", "Aperte um pouco de detergente e pingue algumas gotas de corante.", "Despeje o vinagre e tire a mão rápido.", "Veja a espuma escalar para fora do copo."], science: "O bicarbonato e o vinagre reagem no instante em que se encostam e soltam dióxido de carbono. O detergente prende todo esse gás em bolhas, e isso transforma um simples borbulhar em uma erupção." },
        { number: 2, title: "Uvas-Passas Dançarinas", category: "Física", materialsLabel: "Materiais", stepsLabel: "Passos", scienceLabel: "A Ciência", materials: ["Um copo transparente", "Água com gás ou refrigerante claro", "Um punhado de uvas-passas"], steps: ["Encha o copo com água com gás.", "Jogue algumas uvas-passas.", "Continue olhando. Elas levam um minuto para começar a se mexer."], science: "As bolhas de dióxido de carbono se agarram nas rugas de cada passa e a levam até o topo. Lá em cima elas estouram, a passa afunda e a viagem começa de novo." },
        { number: 3, title: "Lâmpada de Lava Caseira", category: "Química e física", materialsLabel: "Materiais", stepsLabel: "Passos", scienceLabel: "A Ciência", materials: ["Uma garrafa transparente", "Óleo vegetal", "Água", "Comprimidos efervescentes", "Corante"], steps: ["Encha uns três quartos da garrafa com óleo.", "Complete com água e algumas gotas de corante.", "Quebre um pedacinho do comprimido e jogue dentro."], science: "O óleo e a água se recusam a misturar, então ficam em camadas. O comprimido gera bolhas de gás que agarram a água colorida, puxam para cima e soltam para ela cair de novo." },
        { number: 4, title: "Cromatografia em Papel", category: "Química", materialsLabel: "Materiais", stepsLabel: "Passos", scienceLabel: "A Ciência", materials: ["Papel-toalha ou filtro de café", "Canetinhas laváveis", "Um copo de água", "Tesoura"], steps: ["Corte uma tira fina de papel.", "Faça um ponto bem grosso de canetinha perto da borda de baixo.", "Mergulhe só a borda de baixo na água, deixando o ponto seco.", "Espere e veja uma cor se dividir em várias."], science: "Aquela única cor de canetinha, na verdade, é uma mistura de vários pigmentos. A água os arrasta para cima e, como uns viajam mais rápido que outros, eles se separam em faixas." },
        { number: 5, title: "O Ovo na Garrafa", category: "Física", materialsLabel: "Materiais", stepsLabel: "Passos", scienceLabel: "A Ciência", materials: ["Um ovo cozido e descascado", "Uma garrafa de vidro", "Um pedaço pequeno de papel", "Fósforos, com supervisão de um adulto"], steps: ["Um adulto acende o papel e o solta dentro da garrafa.", "Coloque o ovo sobre a boca da garrafa, com a ponta fina para baixo.", "Afaste-se e veja a garrafa engolir o ovo."], science: "A chama esquenta o ar dentro da garrafa. Ao esfriar, esse ar ocupa menos espaço e a pressão lá dentro cai, então o ar de fora empurra o ovo pelo gargalo sem nenhum esforço." },
      ] }] },
      { title: "Fazer a Ideia Ficar", blocks: [
        { type: "paragraph", text: "Quando o experimento acabar, peça para seu filho desenhar o que aconteceu e escrever uma frase explicando por quê. Dizer em voz alta é o que transforma um momento legal em algo que ele realmente entendeu." },
        { type: "paragraphWithLink", before: "Quer mais sobre o Vulcão de Bicarbonato e Vinagre? Nosso ", linkText: "guia completo do projeto", href: "/projects/baking-soda-volcano", after: " traz fotos e o que fazer quando não sai como esperado." },
        { type: "callout", title: "Conexão com Nossas Oficinas", accent: "teal", text: "Em uma oficina, os estudantes discutiram quase dez minutos sobre por que as uvas-passas continuavam subindo e descendo. Isso é mais tempo do que levou para preparar o experimento. Essa discussão é exatamente o objetivo." },
      ] },
    ],
  },
  "how-to-build-the-strongest-popsicle-stick-bridge": {
    ...localizedBlogArticles.en["how-to-build-the-strongest-popsicle-stick-bridge"],
    title: "Como Construir a Ponte de Palitos Mais Forte",
    category: "Engenharia",
    imageAlt: "Mentor e estudantes da Avanza STEM ao lado de uma ponte de palitos que sustenta uma pilha alta de livros",
    imageCaption: "Estudantes testam quanto peso uma ponte de palitos aguenta durante uma oficina de engenharia da Avanza STEM.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Concursos de pontes quase nunca são vencidos por quem usou mais palitos ou mais cola. Eles são vencidos por três coisas: a geometria, para onde o peso viaja e o quanto suas emendas estão bem-feitas." },
        { type: "paragraphWithLink", before: "Aqui a gente vai entrar na engenharia por trás de uma ponte que aguenta. Se o que você quer é o passo a passo, pule direto para a nossa ", linkText: "página detalhada do projeto", href: "/projects/popsicle-stick-bridge", after: "." },
      ] },
      { title: "Por Que os Triângulos Sempre Ganham", blocks: [
        { type: "paragraph", text: "Empurre um quadrado e ele desaba de lado até virar um losango. Empurre um triângulo e não acontece nada, a não ser que algo realmente entorte ou quebre. Essa é a razão inteira de as treliças serem feitas de triângulos." },
        { type: "callout", title: "Ideia-Chave", accent: "purple", text: "Coloque um palito na diagonal de uma armação quadrada e você acabou de criar dois triângulos. Esse único palito pode multiplicar quanto peso a estrutura inteira aguenta." },
      ] },
      { title: "Entendendo os Caminhos de Carga", blocks: [
        { type: "list", items: ["O tabuleiro divide o peso entre as duas treliças laterais", "As treliças levam essa força até os apoios", "O banzo inferior é esticado, e os engenheiros chamam isso de tração", "O banzo superior é comprimido, e isso é compressão", "As diagonais passam a força de uma parte da ponte para a seguinte"] },
        { type: "paragraph", text: "Os melhores projetos reforçam justamente os pontos que mais trabalham, em vez de colar palitos por todo lado só para ver o que gruda." },
      ] },
      { title: "As Cinco Diferenças entre Pontes Fortes e Fracas", blocks: [
        { type: "numbered", items: [
          { title: "Emendas bem-feitas", body: "A cola cede antes da madeira. Faça emendas limpas e deixe todas secarem por completo." },
          { title: "Duas treliças laterais iguais", body: "Se um lado sair mais desleixado, ele recebe mais carga e cede primeiro." },
          { title: "Contraventamento superior", body: "As peças cruzadas de cima impedem que as laterais abram para fora e entortem." },
          { title: "Um tabuleiro decente", body: "Um tabuleiro que divide o peso entre as duas treliças ganha de jogar toda a carga em um ponto só." },
          { title: "Triângulos alternados", body: "Triângulos sobrepostos dão à força um caminho limpo até os apoios." },
        ] },
      ] },
      { title: "Erros Comuns Para Evitar", blocks: [
        { type: "list", items: ["Afogar tudo em cola", "Construir as duas treliças ao mesmo tempo em vez de copiar duas vezes um gabarito que já funcionou", "Pular o contraventamento lateral", "Testar antes de a cola secar por completo", "Colar palitos a esmo sem saber onde está o ponto fraco de verdade"] },
      ] },
      { title: "O Desafio da Relação Resistência-Peso", blocks: [
        { type: "paragraph", text: "Pese sua ponte. Depois divida o peso que ela aguentou pelo peso dela. Esse número é a sua nota de engenharia de verdade." },
        { type: "paragraph", text: "Nas nossas oficinas, as pontes dos estudantes costumam pesar menos de 50 gramas e aguentam entre 2 e 7 quilos antes de ceder. Isso é mais de 50 vezes o próprio peso." },
        { type: "quote", text: "A gente começou a colocar palitos só onde quebrou da última vez, não em todo lugar. Foi aí que nossa ponte realmente ficou mais forte.", attribution: "Estudante em uma oficina de construção de pontes da Avanza STEM" },
        { type: "callout", accent: "purple", text: "Na nossa oficina, a nota é a relação resistência-peso, e essa regra sozinha muda o jeito como os estudantes constroem desde o primeiro palito." },
      ] },
    ],
  },
  "getting-started-with-lego-robotics": {
    ...localizedBlogArticles.en["getting-started-with-lego-robotics"],
    title: "Começando na Robótica LEGO: Guia para Pais",
    category: "Robótica",
    imageAlt: "Um kit de robótica LEGO preparado para uma construção de iniciante",
    imageCaption: "A robótica LEGO pode ser uma boa porta de entrada, em casa, para a engenharia e a programação.",
    endingSecondary: { href: "/projects", label: "Explorar mais projetos de STEM" },
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "A robótica LEGO entrega às crianças engenharia e programação ao mesmo tempo. Os motores giram, os sensores detectam coisas e o código que elas acabaram de escrever move algo no mesmo cômodo em que estão sentadas." },
        { type: "paragraph", text: "Em uma primeira construção, uma equipe pode gastar o encontro inteiro só tentando fazer o robô andar reto. Parece uma tarde perdida. Quase sempre é o melhor aprendizado do dia." },
      ] },
      { title: "Por Que É Diferente do LEGO Comum", blocks: [
        { type: "paragraph", text: "O LEGO comum deixa você com um modelo bonito que fica parado. A robótica deixa você com algo que se move, detecta e reage, tudo controlado por um hub programável." },
        { type: "callout", title: "A Grande Ideia", accent: "green", text: "A robótica transforma o erro em enigma. Quando o robô faz a coisa errada, ele está te dizendo algo sobre o seu projeto ou o seu código, e agora é com você descobrir o quê." },
      ] },
      { title: "Qual Kit de Robótica LEGO Combina com Seu Filho?", blocks: [
        { type: "numbered", items: [
          { title: "LEGO SPIKE Essential (6 a 10 anos)", body: "Um kit de entrada guiado e baseado em blocos, feito para iniciantes pequenos." },
          { title: "LEGO SPIKE Prime (10 a 14 anos)", body: "O kit que muitas escolas usam. Mais sensores, mais motores e espaço para crescer rumo a projetos grandes." },
          { title: "LEGO Mindstorms Robot Inventor", body: "Descontinuado, mas ainda dá para achar. Flexível, potente e vale a pena se você encontrar uma boa oferta." },
        ] },
      ] },
      { title: "O Que Seu Filho Vai Aprender de Verdade", blocks: [
        { type: "list", items: ["Como as máquinas de verdade se movem: engrenagens, eixos e alavancas", "Lógica de sensores, ou como um robô decide o que fazer em seguida", "Programar passo a passo, e pensar em se isto então aquilo", "Projetar, testar, quebrar e redesenhar", "Trabalhar em equipe e explicar uma ideia de um jeito que outra pessoa entenda"] },
        { type: "quote", text: "O robô ficava dando voltas, e no fim era uma roda frouxa. Quando descobrimos, sentimos que tínhamos consertado algo de verdade.", attribution: "Estudante testando um projeto de robótica LEGO" },
      ] },
      { title: "Dicas para Pais Que Não São Engenheiros", blocks: [
        { type: "paragraph", text: "Você não precisa das respostas. Você precisa de boas perguntas. Estas quatro fazem quase todo o trabalho:" },
        { type: "list", items: ["O que você queria que ele fizesse?", "O que ele fez em vez disso?", "O que você mudaria primeiro?", "Você consegue fazer ele fazer algo completamente diferente?"] },
      ] },
      { title: "Primeiros Projetos Para Testar", blocks: [
        { type: "numbered", items: [
          { title: "Seguidor de linha", body: "Use o sensor de cor para perseguir uma tira de fita preta pelo chão." },
          { title: "Desviador de obstáculos", body: "Use o sensor de distância para virar antes de bater na parede." },
          { title: "Controle remoto", body: "Dirija o robô na mão primeiro e depois tente recriar o mesmo percurso com código." },
          { title: "Máquina de separar", body: "Monte algo que separe objetos por cor e deixe cada um no monte certo." },
        ] },
        { type: "paragraphWithLink", before: "Quer uma primeira construção guiada, com instruções passo a passo? Experimente nosso ", linkText: "guia do projeto Robô LEGO com Garra", href: "/projects/lego-robot-builder", after: "." },
      ] },
      { title: "Além do Kit", blocks: [
        { type: "paragraph", text: "Quando um estudante já estiver com fome de um desafio em equipe de verdade, a FIRST LEGO League é a próxima parada natural." },
        { type: "ctaLink", title: "Construa Seu Primeiro Robô", text: "Comece com um projeto guiado de LEGO SPIKE Prime que passa pela construção, pelo código e pelo que fazer quando ainda nada funciona.", linkText: "Ver o guia do robô", href: "/projects/lego-robot-builder", accent: "green" },
      ] },
    ],
  },
  "what-is-ai-explaining-to-kids": {
    ...localizedBlogArticles.en["what-is-ai-explaining-to-kids"],
    title: "O Que É IA? Explicando Inteligência Artificial Para Crianças",
    category: "IA",
    imageAlt: "Estudantes trabalhando em computadores durante uma oficina de IA da Avanza STEM, com diagramas nas telas",
    imageCaption: "Estudantes exploram conceitos de IA na prática durante um encontro de oficina da Avanza STEM.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "A IA escolhe o próximo vídeo, organiza o feed, responde ao assistente de voz e arruma o e-mail sem ninguém pedir. A maioria das crianças usa IA o dia inteiro, anos antes de alguém se dar ao trabalho de explicar o que ela é." },
        { type: "paragraph", text: "Saber como a IA funciona hoje conta como alfabetização. E há duas perguntas que vale a pena ensinar: com o que essa coisa aprendeu? e qual ponto de vista ficou de fora?" },
      ] },
      { title: "Comece pelo Que as Crianças Já Sabem", blocks: [
        { type: "callout", accent: "teal", text: "Quando o Spotify enfia uma música nova na sua playlist, como você acha que ele escolheu justo aquela?" },
        { type: "paragraph", text: "Essa pergunta leva direto à busca de padrões, que é o motor de quase toda IA. A gente faz essa pergunta no começo das nossas oficinas, antes de explicar qualquer coisa, e os estudantes quase sempre chegam perto da resposta real. É exatamente esse o ponto." },
      ] },
      { title: "Um Jeito Simples de Explicar Como a IA Aprende", blocks: [
        { type: "paragraph", text: "A IA aprende igual a uma criança pequena que descobre o que é um cachorro: vendo muitos e muitos cachorros. Dê a um modelo exemplos rotulados suficientes e ele começa a captar o padrão sozinho." },
        { type: "callout", title: "O Termo Técnico", accent: "green", text: "Isso se chama aprendizado supervisionado. Supervisionado só quer dizer que cada exemplo de treinamento veio com a resposta certa junto." },
      ] },
      { title: "Tipos de IA Que Vale a Pena Explicar Para as Crianças", blocks: [
        { type: "numbered", items: [
          { title: "Reconhecimento de imagens", body: "Desbloqueio facial, marcação de fotos e médicos lendo exames." },
          { title: "Sistemas de recomendação", body: "O que decide o que Netflix, Spotify e YouTube colocam na sua frente." },
          { title: "Modelos de linguagem", body: "Sistemas que escrevem texto prevendo quais palavras costumam vir depois." },
          { title: "IA de videogame", body: "Programas que melhoram jogando milhões de partidas e aprendendo com o que deu certo." },
        ] },
      ] },
      { title: "O Que a IA Não Consegue Fazer (e Por Que Isso Importa)", blocks: [
        { type: "list", items: ["Ela só conhece padrões parecidos com os do treinamento. Mostre algo novo e ela está chutando", "Qualquer viés que estivesse nos dados sai do outro lado igualzinho", "Ela pode estar completamente errada e ainda assim soar muito confiante", "Ela persegue o número que você mandou perseguir, mesmo que esse não seja o objetivo real"] },
        { type: "paragraph", text: "Ensinar uma criança a ter o hábito de perguntar com o que um sistema foi treinado é uma das ferramentas de raciocínio mais úteis que você pode dar a ela." },
      ] },
      { title: "Atividade Prática: Treine Seu Próprio Classificador de Imagens", blocks: [
        { type: "list", items: ["Entre em teachablemachine.withgoogle.com", "Crie duas classes de imagens, por exemplo joinha para cima e joinha para baixo", "Treine com fotos da sua própria câmera", "Teste com uma pose que ele nunca viu", "Depois compare o que acontece com 5 fotos de exemplo e com 50"] },
        { type: "callout", accent: "teal", text: "Em uns dez minutos você já passou por coleta de dados, treinamento, previsão e pelo motivo de a qualidade dos dados decidir tudo." },
        { type: "quote", text: "Treinei para diferenciar minha mão da mão do meu amigo, e ele continuava errando até a gente usar mais fotos. Foi aí que eu realmente entendi.", attribution: "Estudante em uma oficina de IA da Avanza STEM" },
      ] },
      { title: "IA Responsável: A Parte Que Quase Ninguém Explica", blocks: [
        { type: "paragraph", text: "As crianças precisam de mais do que uma lista de truques. Precisam saber quando conferir o que a IA disse, quando não se apoiar nela de jeito nenhum e quem responde quando um desses sistemas causa dano real." },
        { type: "paragraphWithLink", before: "Se for a primeira vez que seu filho vai construir algo com código, nosso ", linkText: "guia para escrever um primeiro programa em Python", href: "/projects/my-first-python-program", after: " é um próximo passo sólido." },
      ] },
    ],
  },
  "math-games-that-make-learning-fun": {
    ...localizedBlogArticles.en["math-games-that-make-learning-fun"],
    title: "Jogos de Matemática Que Deixam o Aprendizado Divertido",
    category: "Matemática",
    imageAlt: "Um ábaco de madeira colorido, uma ferramenta para desenvolver o senso numérico",
    imageCaption: "Um ábaco de madeira, uma das muitas ferramentas simples que ajudam a desenvolver o senso numérico antes de qualquer folha de exercícios.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "A ansiedade com matemática quase sempre começa do mesmo jeito: folhas de exercícios, um cronômetro correndo e caneta vermelha. Os jogos usam exatamente as mesmas habilidades, só que ninguém fica com dor de barriga." },
        { type: "paragraph", text: "Estes aqui são para o 2º ao 5º ano, e quase nenhum precisa de mais do que um baralho ou um par de dados." },
        { type: "summary", timeLabel: "Tempo necessário", time: "10 a 20 minutos por jogo", ageLabel: "Idade recomendada", age: "2º ao 5º ano (7 a 11 anos)", supervisionLabel: "Supervisão de adulto", supervision: "Não, as crianças podem jogar sozinhas ou com a família", learnLabel: "O que vão aprender", learn: "senso numérico, cálculo mental, frações e estimativa" },
      ] },
      { title: "", blocks: [{ type: "games", items: [
        { title: "Guerra dos Números", gradeRange: "2º ao 4º ano", description: "Um jogo de cartas que constrói senso numérico rapidinho.", howToPlayLabel: "Como Jogar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Tire as figuras ou defina um valor para elas.", "Divida o baralho inteiro em partes iguais.", "Os dois jogadores viram uma carta.", "A carta mais alta leva as duas.", "Quer multiplicação? Cada um vira duas cartas e multiplica."], whyItWorks: "As crianças praticam muito e nunca parece dever de casa." },
        { title: "101 e Fora", gradeRange: "3º ao 5º ano", description: "Um jogo de dados sobre soma mental e saber a hora de parar.", howToPlayLabel: "Como Jogar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Comece do 0.", "Jogue dois dados.", "Some os dois, ou use um como dezena e outro como unidade.", "Chegue o mais perto de 101 que você tiver coragem, sem passar."], whyItWorks: "Essa única decisão obriga a pensar de verdade em valor posicional." },
        { title: "Pizza de Frações", gradeRange: "3º ao 5º ano", description: "Um jogo em que as frações viram algo que dá para pegar na mão.", howToPlayLabel: "Como Jogar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Corte círculos de papel em fatias de frações.", "Cada um, na sua vez, pega uma fatia.", "Dispute quem completa exatamente um círculo inteiro.", "Se uma fatia fizer você passar, perde a vez."], whyItWorks: "Mexer em peças de verdade constrói uma intuição de frações equivalentes que nenhuma folha de exercícios consegue." },
        { title: "Número-Alvo", gradeRange: "4º ao 5º ano", description: "Um quebra-cabeça mental com mais de um caminho certo.", howToPlayLabel: "Como Jogar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Escolha cinco algarismos.", "Escolha um número-alvo.", "Use as operações que quiser para chegar nele.", "Comparem as respostas e vejam quem achou um atalho."], whyItWorks: "Mostra em silêncio que um problema de matemática pode ter vários caminhos certos." },
        { title: "Vinte Perguntas Matemáticas", gradeRange: "2º ao 5º ano", description: "Um jogo de adivinhação que entra com o vocabulário matemático pela porta dos fundos.", howToPlayLabel: "Como Jogar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Pense em um número e não conte.", "O outro jogador faz perguntas matemáticas de sim ou não.", "Tente acertar com o menor número de perguntas possível."], whyItWorks: "Palavras como par, primo e múltiplo de repente importam, porque saber o que significam faz você ganhar." },
        { title: "Pote da Estimativa", gradeRange: "2º ao 4º ano", description: "Um desafio semanal de adivinhação que praticamente se cuida sozinho.", howToPlayLabel: "Como Jogar", whyItWorksLabel: "Por Que Funciona", howToPlay: ["Encha um pote com objetos pequenos.", "Cada um escreve a própria estimativa.", "Contem tudo juntos mais para o fim da semana.", "Ganha quem chegar mais perto."], whyItWorks: "Chutar sem nada em jogo é exatamente como o senso numérico cresce." },
      ] }] },
      { title: "Uma Observação Sobre a Prática Cronometrada", blocks: [
        { type: "paragraph", text: "A fluência vem de ver a mesma matemática de novo e de novo em um lugar onde errar não custa nada. Os jogos fazem isso. As provas cronometradas fazem o contrário." },
        { type: "paragraphWithLink", before: "Quer mais? Vários desses jogos e outras atividades estão na nossa ", linkText: "página de atividades", href: "/games", after: "." },
        { type: "list", items: ["Comece pelo jogo que já chamou a atenção do seu filho", "Jogue com ele, não contra ele", "Deixe ele ganhar algumas no começo", "Pergunte o que ele acha antes de corrigir qualquer coisa", "Pare enquanto ele ainda quiser mais uma rodada"] },
        { type: "callout", title: "Para os Pais", accent: "orange", text: "Nas noites de matemática em família, os jogos que sempre se repetem são os que deixam uma criança ganhar de um adulto de forma limpa. Guerra dos Números e 101 e Fora fazem exatamente isso." },
        { type: "quote", text: "Minha filha pediu para jogar 101 e Fora três noites seguidas. Nunca contei que aquilo era treino de matemática.", attribution: "Mãe em uma noite de matemática em família da Avanza STEM" },
      ] },
    ],
  },
  "building-a-community-stem-workshops": {
    ...localizedBlogArticles.en["building-a-community-stem-workshops"],
    title: "Construindo Comunidade: Como as Oficinas de STEM Mudam Vidas",
    category: "Comunidade",
    imageAlt: "Famílias e estudantes reunidos na biblioteca para um evento comunitário da Avanza STEM",
    imageCaption: "Famílias se reúnem na biblioteca para uma série de oficinas comunitárias da Avanza STEM.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "A parte mais difícil de começar a Avanza STEM foi acreditar que chegar em uma biblioteca com uma caixa de materiais e um notebook poderia servir para alguma coisa." },
        { type: "paragraph", text: "Depois rodamos programas na Clifton Public Library, na Allwood Branch Library, na Library of the Chathams e na Roseland Free Public Library, e mais de 70 estudantes passaram por lá. Agora a gente sabe por que isso importa. As crianças saem daquelas salas sabendo que o STEM também é delas." },
      ] },
      { title: "Como É uma Oficina na Prática", blocks: [
        { type: "paragraph", text: "Hoje a gente conduz uma série de três semanas: engenharia, depois programação, depois IA. Cada encontro é gratuito e ninguém precisa de experiência para entrar." },
        { type: "paragraph", text: "Os estudantes constroem coisas, escrevem Python e treinam modelos simples de IA. No caminho, a gente liga cada atividade a uma ideia usada por engenheiros e cientistas de verdade." },
      ] },
      { title: "Por Que as Bibliotecas São o Lugar Certo", blocks: [
        { type: "paragraph", text: "As bibliotecas já fizeram a parte difícil. As pessoas confiam nelas, elas estão abertas para todo mundo e o aprendizado gratuito é a razão de existirem." },
        { type: "list", items: ["Ninguém paga para entrar", "As crianças já conhecem o prédio e se sentem seguras ali", "A biblioteca tem uma relação de verdade com o bairro", "As salas e a tecnologia aguentam um encontro bagunçado de construção", "Chegam estudantes de escolas bem diferentes"] },
      ] },
      { title: "O Que a Gente Já Viu na Sala", blocks: [
        { type: "paragraph", text: "Os melhores momentos são os pequenos. Uma criança acrescentando em silêncio uma quinta pergunta ao jogo dela em Python. Uma família percebendo que um programa desses acontece a dez minutos de caminhada de casa. Dois estudantes discutindo por que alguma coisa deu certo." },
        { type: "quote", text: "Uma mãe contou que a filha pediu para voltar na semana seguinte antes de o encontro acabar. Foi aí que a gente soube que estava funcionando.", attribution: "Bibliotecária da Unidade Allwood" },
        { type: "paragraph", text: "Leve a curiosidade de uma criança a sério uma única vez e é bem provável que ela saia atrás de mais." },
      ] },
      { title: "O Problema da Representatividade e Por Que Ele É Nossa Responsabilidade", blocks: [
        { type: "paragraph", text: "Os estudantes hispânicos seguem sub-representados no STEM, e os motivos são chatos e resolvíveis: pouca exposição, poucos mentores, pouco incentivo, pouco acesso." },
        { type: "callout", title: "A Lacuna Que Queremos Fechar", accent: "purple", text: "Ver alguém parecido com você fazendo o trabalho muda quem se sente convidado ao STEM. Isso não é um detalhe. É quase o problema inteiro." },
      ] },
      { title: "Como Levar uma Oficina Para a Sua Comunidade", blocks: [
        { type: "numbered", items: [
          { title: "Encontre um lugar", body: "Bibliotecas, centros comunitários, igrejas e escolas funcionam. Comece por quem já conhece as suas famílias." },
          { title: "Fale com a gente", body: "A gente conversa sobre o plano de atividades, os materiais e como espalhar a notícia." },
          { title: "Divulgue localmente", body: "Grupos comunitários, cartazes e parceiros do bairro chegam a famílias que uma publicação online nunca alcança." },
          { title: "Continue aparecendo", body: "A confiança se constrói um encontro por vez, e vale a espera." },
        ] },
      ] },
      { title: "O Que Vem a Seguir", blocks: [
        { type: "paragraph", text: "Queremos chegar a mais unidades de bibliotecas e centros comunitários, e queremos que o modelo seja tão simples que outras pessoas consigam tocá-lo sozinhas." },
        { type: "ctaLink", title: "Leve uma Oficina Para a Sua Comunidade", text: "Quer trazer um programa de STEM gratuito para a sua biblioteca, escola ou centro comunitário?", linkText: "Fale com a gente para receber uma oficina", href: "/host", accent: "purple" },
        { type: "ctaLink", text: "Prefere ver primeiro como é um encontro de verdade?", linkText: "Ver próximas oficinas", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "why-triangles-are-an-engineers-secret-weapon": {
    ...localizedBlogArticles.en["why-triangles-are-an-engineers-secret-weapon"],
    title: "Por Que os Triângulos São a Arma Secreta dos Engenheiros?",
    category: "Engenharia",
    readTime: common.pt.minutes.m5,
    imageAlt: "Estudantes examinando uma ponte de palitos de picolé pronta em uma oficina de engenharia da Avanza STEM",
    imageCaption: "Estudantes em uma oficina da Avanza STEM inspecionam uma ponte treliçada. Os triângulos do projeto não são decoração; são a razão de a ponte aguentar o peso.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Em toda oficina de engenharia que a gente dá, algum estudante olha para a ponte que aguentou mais peso e faz a mesma pergunta: por que essa aí funciona? A resposta sempre volta para uma única forma. O triângulo." },
        { type: "paragraph", text: "E isto não é uma regra para decorar e esquecer. Quando você entende por que os triângulos são especiais, não consegue mais deixar de vê-los. Pontes, torres, quadros de bicicleta, telhados, montanhas-russas. Eles estão escondidos em tudo." },
      ] },
      { title: "O Problema com os Quadrados", blocks: [
        { type: "paragraph", text: "Imagine um quadrado montado com quatro palitos e fita. Empurre um canto e tudo se deita até virar um losango. Os engenheiros chamam isso de deformação, e acontece porque as quatro junções podem girar." },
        { type: "callout", title: "A Diferença Principal", accent: "purple", text: "Um triângulo tem três lados e três cantos, e não existe jeito de achatá-lo em outra forma sem entortar ou quebrar um lado. É isso que significa ser rígido." },
        { type: "paragraph", text: "Então o quadrado é a forma errada para sustentar peso e o triângulo é a certa. Essa é a história inteira em duas frases." },
      ] },
      { title: "O Que Acontece Quando Você Acrescenta uma Diagonal", blocks: [
        { type: "paragraph", text: "Agora teste isto. Pegue aquele mesmo quadrado bambo e coloque um palito na diagonal, atravessando o meio. Você acabou de fazer dois triângulos, e a armação passa de trêmula a sólida." },
        { type: "paragraph", text: "O palito extra não é só reforço. Ele divide o quadrado em duas formas que não podem se deformar, e de repente o painel inteiro fica rígido. Os estudantes das nossas oficinas sentem isso no segundo em que colocam a diagonal. O painel que antes entortava agora se defende." },
        { type: "callout", accent: "purple", text: "A distância entre uma armação fraca e uma forte pode ser um único palito na diagonal. Isso é triangulação, e é esse o truque inteiro." },
      ] },
      { title: "Por Que os Triângulos Aparecem em Todo Lugar na Engenharia", blocks: [
        { type: "paragraph", text: "Depois que você sabe o que procurar, começa a flagrar triângulos fazendo trabalho estrutural por toda parte." },
        { type: "list", items: [
          "Pontes treliçadas: uma cadeia inteira de triângulos ligados levando a carga de uma ponta à outra",
          "A Torre Eiffel: uma malha de triângulos que permite a ela balançar com o vento em vez de quebrar",
          "Quadros de bicicleta: olhe o quadro principal e você está vendo um triângulo",
          "Tesouras de telhado: o formato de \"A\" de um telhado inclinado é um triângulo segurando tudo",
          "Guindastes de obra: aquele braço comprido é uma treliça triangular levantando pesos absurdos",
          "Montanhas-russas: os apoios triangulados aguentam os passageiros sacudindo a cada mudança de direção",
        ] },
      ] },
      { title: "A Ciência por Trás: Como as Forças Andam pelos Triângulos", blocks: [
        { type: "numbered", items: [
          { title: "Os triângulos transformam forças em puxões e apertos", body: "Empurre um triângulo para baixo e cada elemento é esticado (tração) ou comprimido (compressão). Nada entorta. E entortar é o que quebra as coisas." },
          { title: "Os três lados dividem o trabalho", body: "Um quadrado joga toda a tensão nos cantos. Um triângulo distribui a força por cada lado ao mesmo tempo." },
          { title: "A forma se recusa a mudar", body: "Enquanto nenhum elemento falhar, um triângulo carregado fica exatamente como você o construiu. Um quadrado não consegue prometer isso." },
        ] },
      ] },
      { title: "Teste Você Mesmo", blocks: [
        { type: "paragraph", text: "Você não precisa de laboratório. Pegue quatro palitos de picolé e fita e veja acontecer em uns dois minutos." },
        { type: "list", items: [
          "Cole quatro palitos pelas pontas até formar um quadrado. Empurre um canto e veja tudo se deitar.",
          "Coloque um quinto palito na diagonal, atravessando o meio. Empurre o mesmo canto. Quase não mexe.",
          "Agora monte um triângulo simples com três palitos e sinta como ele é sólido.",
          "Encadeie vários triângulos em fila e descubra quanto peso dá para sustentar.",
        ] },
        { type: "callout", accent: "purple", text: "Nas nossas oficinas, as vencedoras são sempre feitas de uma sequência ligada de triângulos. Os estudantes que entendem o porquê constroem pontes mais fortes e, quando uma quebra, já sabem onde procurar." },
      ] },
      { title: "O Que Isso Significa Para a Sua Ponte", blocks: [
        { type: "paragraphWithLink", before: "Pronto para construir uma e quer o passo a passo? Nosso ", linkText: "guia do projeto de ponte de palitos", href: "/projects/popsicle-stick-bridge", after: " leva você por uma ponte treliçada inteira usando tudo o que está acima." },
        { type: "ctaLink", title: "Construa uma Ponte Treliçada", text: "Nas nossas oficinas de engenharia, os estudantes constroem pontes de palitos e depois empilham peso em cima até alguma coisa finalmente ceder.", linkText: "Ver próximas oficinas", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "how-engineers-think-when-something-breaks": {
    ...localizedBlogArticles.en["how-engineers-think-when-something-breaks"],
    title: "Como os Engenheiros Pensam Quando Algo Quebra",
    category: "Engenharia",
    readTime: common.pt.minutes.m4,
    imageAlt: "Estudantes testando uma ponte que falhou, com livros, durante uma oficina de engenharia da Avanza STEM",
    imageCaption: "Uma estrutura que acabou de falhar não é uma perda. É informação. Os estudantes examinam onde e por que ela quebrou antes de pensar na próxima melhoria.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Alguma coisa quebra em quase toda oficina que a gente dá. Uma ponte entorta sob os livros. Uma torre cai assim que entra mais um bloco. Um rover de papelão capota no primeiro percurso. E o interessante é isto: o estudante que construiu quase sempre sabe o que aconteceu antes de alguém dizer uma palavra." },
        { type: "paragraph", text: "Aquele estalo de \"ah, quebrou bem na emenda porque eu colei com pressa\" é a melhor coisa do encontro inteiro. Nada fracassou. Você acabou de receber informação." },
        { type: "youtube", videoId: "xPp8R64YEHQ", title: "Como os engenheiros pensam quando algo quebra", caption: "Um olhar rápido sobre a mentalidade que os engenheiros usam quando um projeto falha." },
      ] },
      { title: "A Primeira Pergunta Que um Engenheiro Faz", blocks: [
        { type: "paragraph", text: "Quando algo quebra, um engenheiro não pergunta \"o que eu fiz de errado?\". Ele pergunta algo bem melhor: onde quebrou e o que isso está me dizendo?" },
        { type: "paragraph", text: "Uma ponte que parte no meio acabou de te dizer que o meio era a parte mais fraca. Uma emenda que se abre acabou de te dizer que aquela ligação não aguentava. A quebra está basicamente deixando recados para a próxima construção." },
        { type: "callout", title: "Olhar de Engenheiro", accent: "purple", text: "Uma estrutura que quebrou é útil. Uma estrutura que ninguém testou não diz absolutamente nada." },
      ] },
      { title: "O Ciclo de Melhoria", blocks: [
        { type: "paragraph", text: "Os engenheiros dão voltas de propósito. O ciclo de projeto não é uma linha reta da ideia até o sucesso. Ele funciona assim:" },
        { type: "numbered", items: [
          { title: "Defina o objetivo", body: "Seja específico. Sustentar 2 quilos? Vencer 30 centímetros? Pesar o mínimo humanamente possível? Objetivo vago, resultado vago." },
          { title: "Construa uma primeira versão", body: "Não persiga a perfeição. Persiga algo que dê para testar. Você quer algo em que possa colocar peso nos próximos dez minutos." },
          { title: "Teste de verdade", body: "Coloque a carga real em cima. Imaginar como teria ido não é um teste." },
          { title: "Observe o que falhou", body: "Não só que quebrou, mas exatamente onde e como. Esse detalhe são os seus dados." },
          { title: "Mude uma coisa só", body: "Mude três de uma vez e você nunca vai saber qual delas salvou a construção." },
          { title: "Teste de novo", body: "Mais uma volta. Cada rodada entrega mais do que a anterior." },
        ] },
      ] },
      { title: "Como Isso Aparece nas Oficinas da Avanza STEM", blocks: [
        { type: "paragraph", text: "Em um encontro de pontes, quase todos os grupos constroem uma vez e testam uma vez. Já basta. Quando a ponte começa a entortar, depois a torcer e enfim cede, a sala inteira consegue ver qual parte estava trabalhando mais." },
        { type: "paragraph", text: "O momento de verdade vem depois. Onde falhou? Por que bem ali? Se você construísse outra amanhã, o que reforçaria primeiro?" },
        { type: "callout", accent: "purple", text: "Uma única construção basta para aprender a mentalidade inteira: projete, teste com honestidade, estude a bagunça e diga em voz alta o que a versão dois faria diferente." },
      ] },
      { title: "A Regra da Mudança Única", blocks: [
        { type: "paragraph", text: "Esta importa mais do que os estudantes esperam. Depois que algo quebra, mude exatamente uma coisa antes de testar de novo." },
        { type: "paragraph", text: "Digamos que sua ponte quebre e você a reconstrua com emendas melhores E uma treliça diferente E mais reforço. Talvez ela aguente mais. E daí? Você não faz ideia de qual mudança resolveu, então não pode usar nenhuma na próxima vez. Você não aprendeu. Você teve sorte." },
        { type: "callout", accent: "purple", text: "Mude uma coisa. Teste. Observe. Depois mude a seguinte. É assim que os engenheiros descobrem o que funciona de verdade." },
      ] },
      { title: "Esse Raciocínio Funciona em Todo Lugar", blocks: [
        { type: "paragraph", text: "Nada disso vale só para estruturas. Observar, supor, testar, melhorar. O mesmo ciclo aparece pela sua vida inteira:" },
        { type: "list", items: [
          "Ciências: um experimento que dá errado está te dizendo algo específico sobre a sua montagem ou a sua hipótese",
          "Programação: uma falha te entrega uma mensagem de erro. Leia antes de mexer em uma única linha",
          "Matemática: uma resposta errada aponta a que passo voltar. Não é um veredito sobre você",
          "Esportes: um arremesso errado é informação sobre a sua postura ou o seu tempo, não motivo para desistir",
        ] },
        { type: "ctaLink", title: "Participe de uma Oficina de Engenharia Gratuita", text: "Nas nossas oficinas de engenharia, os estudantes constroem algo, quebram de propósito e usam o que veem para melhorar a próxima versão.", linkText: "Ver próximas oficinas", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "design-a-mars-rover-out-of-cardboard": {
    ...localizedBlogArticles.en["design-a-mars-rover-out-of-cardboard"],
    title: "Projete um Rover de Marte com Papelão",
    category: "Engenharia",
    readTime: common.pt.minutes.m5,
    imageAlt: "Estudantes trabalhando em um desafio de projeto de engenharia em uma oficina da Avanza STEM",
    imageCaption: "Os desafios de engenharia da Avanza STEM começam com um enunciado de projeto e restrições, e terminam com um teste de verdade.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Os rovers da NASA trabalham a mais de 200 milhões de quilômetros da oficina mais próxima. Uma roda racha, um sensor morre, e não tem ninguém lá fora para consertar. Nunca. Toda decisão de projeto é tomada pensando nisso." },
        { type: "paragraph", text: "Hoje você não vai construir para 200 milhões de quilômetros. Mas os limites são os mesmos: os materiais que você achar, um peso que não dá para passar, terreno horrível e um rover que precisa funcionar de verdade quando alguém testar na sua frente." },
      ] },
      { title: "O Enunciado da Missão", blocks: [
        { type: "callout", title: "Sua Missão", accent: "purple", text: "Construa um rover de Marte com papelão, fita e o que houver por perto. Ele precisa carregar alguma coisa, atravessar terreno irregular e sobreviver a uma queda. O relógio marca 45 minutos. Comece." },
      ] },
      { title: "O Que Você Precisa", blocks: [
        { type: "list", items: [
          "Papelão (caixas de cereal, caixas de entrega, qualquer papelão plano)",
          "Fita silver tape ou fita crepe",
          "Tesoura",
          "Tubos de papelão (rolos de papel-toalha ou papel higiênico)",
          "Canudos",
          "Copinhos de papel",
          "Opcional: colchetes de latão, elásticos, uma régua",
        ] },
      ] },
      { title: "Seus Objetivos de Projeto", blocks: [
        { type: "paragraph", text: "Os engenheiros de verdade são avaliados por requisitos específicos, não por boas intenções. Estes são os seus:" },
        { type: "numbered", items: [
          { title: "Carregue uma carga útil", body: "Equilibre em cima um copinho com 3 moedas ou 3 pedrinhas. Se virar, a missão falhou." },
          { title: "Atravesse o terreno", body: "Role sobre uma folha de caderno amassada sem atolar nem parar." },
          { title: "Sobreviva à queda", body: "Solte da altura do seu joelho. Ele precisa ficar inteiro e continuar rodando." },
          { title: "Extra: o braço", body: "Coloque algo que se estenda para fora do corpo, como o braço de um rover, e que possa descer até o chão enquanto o rover fica parado." },
        ] },
      ] },
      { title: "Suas Restrições de Projeto", blocks: [
        { type: "paragraph", text: "Todo trabalho real de engenharia vem com regras que você não escolheu. Trabalhar dentro delas é o trabalho inteiro. Aqui estão as suas:" },
        { type: "list", items: [
          "Precisa caber em uma caixa de sapato",
          "Nada de cola quente. Só fita e colchetes",
          "As rodas precisam ser redondas. Redondas de verdade, não mais ou menos redondas",
          "45 minutos no relógio",
          "Antes de testar, você precisa explicar uma decisão que tomou e por quê",
        ] },
      ] },
      { title: "Perguntas de Engenharia Para Pensar Antes de Construir", blocks: [
        { type: "numbered", items: [
          { title: "Quantas rodas?", body: "Quatro ganham de três em estabilidade, mas cada roda a mais é mais peso e mais uma coisa que pode quebrar. Os rovers de verdade usam seis, cada uma montada para se mover sozinha. Assim uma pedra só não vira o veículo inteiro." },
          { title: "Onde está o peso?", body: "Peso em cima, capota fácil. Peso embaixo, fica firme. Deixe as partes pesadas o mais perto do chão que der." },
          { title: "Qual é a largura da bitola?", body: "A distância entre as rodas da esquerda e da direita se chama bitola. Mais larga é mais difícil de virar de lado. Mais estreita passa por lugares apertados. Escolha o seu problema." },
          { title: "O que acontece quando uma roda pega um buraco?", body: "Com um eixo rígido, um buraco só levanta aquele lado inteiro do rover. Os rovers de verdade usam suspensão rocker-bogie para cada roda se mover sozinha. E agora a pergunta divertida: dá para imitar isso com papelão e fita?" },
        ] },
      ] },
      { title: "Teste e Depois Faça Estas Perguntas", blocks: [
        { type: "list", items: [
          "Ele capotou no teste de carga? Onde estava todo o peso?",
          "O papel amassado travou o rover? Uma roda afundou ou o corpo arrastou?",
          "Ele sobreviveu à queda? E, se não, o que cedeu primeiro?",
          "Se alguém te desse mais dez minutos, qual única coisa você mudaria?",
        ] },
        { type: "paragraph", text: "Escreva as respostas ou desenhe. Essa folha é a diferença entre uma primeira construção e uma segunda que seja realmente melhor." },
        { type: "quote", text: "Um estudante colocou uma rampa na frente do rover dele usando uma tira de papelão dobrada. Disse que era para empurrar as pedras do caminho. Perguntei se ele tinha visto isso em um rover de verdade. Ele disse que não, que só achou que ia ajudar. Esse é o tipo certo de raciocínio.", attribution: "Noah López, mentor da Avanza STEM" },
      ] },
      { title: "A Ligação com o Rover de Verdade", blocks: [
        { type: "paragraph", text: "O Perseverance, o rover que está rodando por Marte agora mesmo, pesa cerca de 1.025 quilos e anda sobre seis rodas que se movem de forma independente. Ele carrega câmeras, um microfone, uma broca e um helicóptero inteiro chamado Ingenuity. Cada peça precisou ser leve o bastante para decolar, resistente o bastante para sobreviver ao pouso e confiável o bastante para continuar trabalhando por anos sem ninguém para ajudar." },
        { type: "paragraph", text: "Distribuição de peso, número de rodas, altura livre do solo, carga útil. É exatamente sobre isso que os engenheiros de rover da NASA discutem. Você está respondendo às mesmas perguntas. A única diferença é o orçamento." },
        { type: "ctaLink", title: "Experimente a Engenharia Pessoalmente", text: "Nas nossas oficinas, os estudantes encaram desafios de projeto como este e descobrem rapidinho se a construção deles aguenta.", linkText: "Ver próximas oficinas", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "what-is-ai-actually-doing-when-it-answers-you": {
    ...localizedBlogArticles.en["what-is-ai-actually-doing-when-it-answers-you"],
    title: "O Que a IA Está Fazendo de Verdade Quando Te Responde?",
    category: "IA",
    readTime: common.pt.minutes.m5,
    imageAlt: "Um gráfico de inteligência artificial brilhando sobre um tablet, com linhas de rede digital ao fundo",
    imageCaption: "Nas oficinas de IA da Avanza STEM, os estudantes aprendem a se perguntar o que uma IA está fazendo de verdade, não só se a resposta parece certa.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Você digita uma pergunta em um chat de IA e três segundos depois já tem um parágrafo inteiro ali. O que acabou de acontecer? A maioria das pessoas acha que ela buscou na internet, ou pegou a resposta de um banco de dados gigante, ou consultou um conhecimento guardado em algum lugar. Nenhuma dessas está certa." },
        { type: "paragraph", text: "O que realmente aconteceu é mais estranho. A IA previu qual texto deveria vir em seguida, palavra por palavra, usando padrões que absorveu de uma montanha de textos. Só isso. E, sinceramente, isso é mais interessante do que a versão que as pessoas imaginam." },
      ] },
      { title: "É Mais Parecido com o Corretor Automático do Que com um Buscador", blocks: [
        { type: "callout", accent: "teal", text: "Pense no corretor automático do seu celular. Ele adivinha a sua próxima palavra pelo que costuma aparecer em mensagens como a sua. Um modelo de linguagem faz uma versão disso, só que absurdamente mais sofisticada." },
        { type: "paragraph", text: "Quando uma IA escreve uma resposta para você, ela não está tirando algo de uma prateleira. Está calculando qual palavra tem mais chance de vir em seguida, dado tudo o que veio antes, e depois faz isso de novo, e de novo, até terminar." },
        { type: "paragraph", text: "É por isso que ela responde tão rápido. Ela não está ali raciocinando sobre o seu problema como você faria. Está rodando um cálculo de padrões velocíssimo, repetidas vezes." },
      ] },
      { title: "Como a IA Aprendeu o Que Dizer", blocks: [
        { type: "numbered", items: [
          { title: "Ela leu uma quantidade absurda de texto", body: "Artigos, livros, sites, código, tudo. Isso deu a ela bilhões de exemplos de como as pessoas usam a linguagem de verdade." },
          { title: "Ela encontrou padrões", body: "Não regras que alguém escreveu. Padrões estatísticos: depois desta combinação de palavras, estas outras costumam aparecer. Os padrões ficam emaranhados demais para explicar em uma frase, mas padrões é tudo o que eles são." },
          { title: "Pessoas deram notas", body: "Pessoas reais avaliaram quais respostas eram mais úteis, mais precisas e mais adequadas. O modelo se ajustou com base nesse retorno." },
          { title: "Agora ela te responde", body: "Você pergunta algo e ela usa todos esses padrões para produzir um texto com cara de resposta útil, baseado nas respostas úteis que viu durante o treinamento." },
        ] },
      ] },
      { title: "Por Que Ela Pode Soar Certa e Estar Errada", blocks: [
        { type: "paragraph", text: "Aqui está o detalhe. A IA gera texto estatisticamente provável, não texto verificado. Então ela pode te entregar algo confiante, bem escrito e completamente falso. Chamam isso de alucinação: a IA diz algo que não é verdade com o mesmo tom que usa para o que é." },
        { type: "list", items: [
          "Ela não sabe o que não sabe",
          "Ela pode misturar nomes, datas ou eventos parecidos de situações totalmente diferentes",
          "Ela produz o que soa plausível, não o que foi verificado",
          "Ela não consegue ir checar algo no meio da frase para se corrigir",
        ] },
        { type: "callout", title: "A Versão Honesta", accent: "teal", text: "Uma IA que admite \"não tenho certeza disso\" é mais útil que uma que soa convencida toda vez. Faça perguntas de acompanhamento. Confira o que realmente importa." },
      ] },
      { title: "Para Que a IA Serve de Verdade", blocks: [
        { type: "paragraph", text: "Conhecer os limites é o que permite usá-la bem, em vez de acreditar cegamente ou nunca encostar nela." },
        { type: "list", items: [
          "Explicar a mesma ideia de cinco jeitos diferentes até um finalmente fazer sentido para você",
          "Cuspir esquemas, rascunhos e exemplos em segundos",
          "Resumir temas bem cobertos naquilo em que ela treinou",
          "Jogar opções na sua frente quando você travou",
          "Editar e reescrever algo que você já fez",
          "Escrever código que depois você roda e testa",
        ] },
        { type: "paragraph", text: "Quando a resposta precisa ser comprovadamente correta, como um dado específico, uma pergunta médica ou qualquer coisa jurídica, vá confirmar em uma fonte de verdade. Sempre." },
      ] },
      { title: "Um Bom Hábito: Peça Para Ela Se Explicar", blocks: [
        { type: "paragraph", text: "Da próxima vez que uma IA te der uma resposta, mande uma pergunta de acompanhamento: \"como você sabe disso?\" ou \"onde posso conferir?\". O que volta diz muita coisa." },
        { type: "callout", accent: "teal", text: "Nas nossas oficinas de IA, os estudantes escolhem uma resposta e tentam conferi-la. O objetivo não é ensinar que a IA é ruim. É lê-la como você leria qualquer fonte, com o cérebro ligado." },
        { type: "quote", text: "Perguntei sobre um cientista e ela errou a data da descoberta em trinta anos. Eu teria acreditado se a gente não tivesse conferido. Agora eu confiro as coisas.", attribution: "Estudante em uma oficina de IA da Avanza STEM" },
      ] },
      { title: "O Que Isso Significa Para Crianças e Famílias", blocks: [
        { type: "paragraph", text: "As crianças vão crescer com essas ferramentas de qualquer jeito. Saber mais ou menos o que elas fazem, e o que definitivamente não fazem, muda como as crianças leem cada resposta que recebem." },
        { type: "list", items: [
          "Use a IA mais para chuva de ideias e rascunhos do que para cravar dados exatos",
          "Qualquer coisa importante, confirme com uma segunda fonte",
          "Desconfie quando ela soar confiante demais e faça uma pergunta de acompanhamento",
          "Lembre-se de que ela nem sempre erra. Só que também nem sempre acerta",
        ] },
        { type: "paragraphWithLink", before: "Quer o básico de como a IA aprende com dados e quais tipos existem? Comece pelo nosso guia anterior: ", linkText: "O Que É IA? Explicando Inteligência Artificial Para Crianças", href: "/blog/what-is-ai-explaining-to-kids", after: "." },
        { type: "ctaLink", title: "Aprenda Sobre IA Pessoalmente", text: "Nas nossas oficinas de IA, os estudantes montam sistemas simples, caçam os erros que eles cometem e conversam sobre o que encontraram.", linkText: "Ver próximas oficinas", href: "/workshops", accent: "teal" },
      ] },
    ],
  },
  "how-to-think-like-an-inventor-in-20-minutes": {
    ...localizedBlogArticles.en["how-to-think-like-an-inventor-in-20-minutes"],
    title: "Como Pensar Como um Inventor em 20 Minutos",
    category: "Engenharia",
    readTime: common.pt.minutes.m5,
    imageAlt: "Uma criança pensando, com pontos de interrogação e uma lâmpada acesa desenhados acima",
    imageCaption: "Nas oficinas da Avanza STEM, os estudantes partem direto para construir alguma coisa e depois descobrem o que melhorar a partir dali.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Quase toda invenção que você conseguir lembrar começou com alguém de saco cheio. O zíper existe porque os cadarços viviam desamarrando. Os post-its saíram de uma cola tão fraca que não servia para nada. O velcro nasceu de um senhor caminhando pelo campo e tirando carrapichos do cachorro." },
        { type: "paragraph", text: "Nenhum deles sentou com a intenção de inventar algo. Eles notaram algo que incomodava e fizeram uma pergunta: e se existisse um jeito melhor de fazer isso?" },
      ] },
      { title: "O Ciclo do Inventor", blocks: [
        { type: "paragraph", text: "Sem laboratório, sem kit especial, sem permissão de ninguém. Quatro passos e uns vinte minutos já bastam." },
        { type: "numbered", items: [
          { title: "Encontre um problema", body: "Procure algo pequeno e irritante. Uma porta que fecha sozinha. Um carregador que nunca fica encaixado. Um zíper que trava sempre no mesmo dente. Frustrações minúsculas ganham das enormes, porque dá para testar a solução de uma minúscula." },
          { title: "Desenhe uma solução", body: "Desenhe o conserto. Mesmo que seja uma forma torta em uma folha de caderno, vale. Você não está fazendo arte. Está deixando a sua ideia específica o bastante para alguém discutir com você." },
          { title: "Monte um protótipo rápido", body: "O que estiver por perto serve: papel, fita, papelão, elásticos. Não precisa ficar bonito. Precisa poder ser testado." },
          { title: "Teste", body: "Agora tente quebrar. Se ele sobreviver à primeira tentativa sem suar, o seu teste foi fraco demais. Ache o ponto fraco. Parabéns, esse é o seu próximo problema." },
        ] },
      ] },
      { title: "Como Achar Problemas Que Valem a Pena Resolver", blocks: [
        { type: "paragraph", text: "O primeiro passo é o que trava quase todo mundo, e não é por falta de problemas no mundo. É porque todos nós viramos especialistas em ignorar pequenos incômodos em vez de notá-los." },
        { type: "callout", accent: "purple", text: "Nas nossas oficinas, damos aos estudantes um minuto em silêncio para andar pela sala e anotar três coisas que poderiam funcionar melhor. Quase todos voltam com pelo menos duas." },
        { type: "list", items: [
          "O que demora muito mais do que deveria?",
          "O que quebra com mais frequência do que deveria?",
          "O que você sempre acaba carregando de um jeito desconfortável?",
          "O que você faz todo dia e queria não precisar fazer?",
        ] },
        { type: "paragraph", text: "Depois escolha o menor da sua lista. Um problema que cabe nas suas mãos é muito mais fácil de resolver do que um do tamanho de uma cidade." },
      ] },
      { title: "Por Que Desenhar Importa Antes de Construir", blocks: [
        { type: "paragraph", text: "Um desenho não é uma imagem. É uma decisão. No instante em que você coloca no papel, precisa se comprometer: a dobradiça vai aqui, este lado abre, a pegada tem mais ou menos este tamanho." },
        { type: "paragraph", text: "Esse compromisso é o que deixa a ideia testável. Sem desenho, você vai ajustando no caminho, o que funciona, mas é mais lento e você nunca percebe quando a realidade se afastou do plano. Com desenho, dá para ver a diferença." },
        { type: "callout", title: "Uma Regra", accent: "purple", text: "Não encoste em nenhum material até ter desenhado pelo menos uma versão. O desenho não precisa ser bom. Só precisa existir." },
      ] },
      { title: "O Que Conta Como Protótipo", blocks: [
        { type: "paragraph", text: "Um protótipo é a versão mais rápida da sua ideia que dá para testar de verdade. Não é um produto. Não é para ser bonito. O único trabalho dele é te ensinar algo que você ainda não sabia." },
        { type: "list", items: [
          "Fita em vez de cola, porque você vai desmontar em cinco minutos",
          "Use a forma mais simples que teste a única coisa que te interessa",
          "Construa para responder a uma pergunta: a dobradiça aguenta? encaixa? desliza?",
          "Se levar mais de 10 minutos, você está complicando demais",
        ] },
      ] },
      { title: "O Desafio do Inventor de 20 Minutos", blocks: [
        { type: "summary", timeLabel: "Tempo", time: "20 minutos no total", ageLabel: "Ideal para", age: "Crianças a partir de 8 anos", supervisionLabel: "Materiais", supervision: "Papel, fita adesiva, papelão, tesoura, elásticos, o que você encontrar", learnLabel: "O que você pratica", learn: "Identificação de problemas, raciocínio de projeto, prototipagem rápida e iteração" },
        { type: "callout", title: "Teste Isto Agora", accent: "purple", text: "Coloque um timer de 20 minutos. Encontre um problema no cômodo. Desenhe um conserto. Monte uma versão tosca. Teste uma vez. E anote a única coisa que você mudaria com dez minutos a mais." },
        { type: "quote", text: "Ele decidiu resolver o fato de o lápis dele sempre cair da mesa. Prendeu com fita uma bordinha de papelão na beirada. Funcionou. Depois começou a perguntar o que mais dava para consertar.", attribution: "Mentor da Avanza STEM em uma oficina de engenharia" },
      ] },
    ],
  },
  "why-your-first-design-is-usually-not-your-best-one": {
    ...localizedBlogArticles.en["why-your-first-design-is-usually-not-your-best-one"],
    title: "Por Que Seu Primeiro Projeto Quase Nunca É o Melhor",
    category: "Engenharia",
    readTime: common.pt.minutes.m4,
    imageAlt: "Um estudante examinando uma estrutura que acabou de desabar durante um teste de carga em uma oficina da Avanza STEM",
    imageCaption: "O momento em que uma ponte desaba não é o fim do encontro. Costuma ser o começo do aprendizado de verdade.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Em quase toda oficina de engenharia nossa, as pontes caem. E as crianças que as construíram quase sempre fazem a mesma cara. Não de derrota. De quem está pensando." },
        { type: "paragraph", text: "Essa cara é como a iteração se sente por dentro. Mesmo quando não sobra tempo para reconstruir, o teste reconfigura completamente o jeito como elas enxergam o próprio projeto." },
      ] },
      { title: "O Mito do Projeto Pronto", blocks: [
        { type: "paragraph", text: "Existe uma ideia de que bons projetos saem de uma pessoa muito inteligente pensando bastante antes de encostar em qualquer coisa. A engenharia não funciona assim. Escrever também não, nem música, nem basicamente nada que valha a pena." },
        { type: "paragraph", text: "Os projetos melhoram batendo de frente com a realidade. Você não chega a uma ponte mais forte pensando de uma cadeira. Você constrói uma, coloca peso, vê o que quebra e agora sabe algo que antes não sabia." },
        { type: "callout", title: "A Ideia Central", accent: "purple", text: "Seu primeiro projeto não é um produto. É um palpite. O teste é como você descobre se o palpite prestava." },
      ] },
      { title: "Um Exemplo Real da Oficina", blocks: [
        { type: "paragraph", text: "Em um encontro de pontes na Biblioteca Pública de Clifton, um grupo terminou a ponte de palitos, começou a empilhar livros em cima e viu um lado inteiro torcer antes de a coisa finalmente ceder." },
        { type: "numbered", items: [
          { title: "A primeira pista: torceu de lado", body: "Antes de qualquer coisa quebrar, eles notaram que um lado inclinava mais que o outro. Esse foi o sinal. O problema não era só peso demais. O apoio estava desigual." },
          { title: "O ponto fraco: sem escora diagonal", body: "As laterais deles eram retângulos compridos e abertos em vez de triângulos. Coloque peso suficiente e esses retângulos simplesmente mudam de forma, e a ponte inteira amolece." },
          { title: "O conserto rápido: um reforço bem direcionado", body: "Com os minutos que sobraram, eles escoraram na diagonal o lado mais fraco e conversaram sobre onde ficariam as escoras gêmeas na versão dois." },
          { title: "A conclusão: o teste deu a eles um projeto melhor", body: "Eles nunca reconstruíram a ponte inteira, e não precisava. Um teste honesto disse exatamente o que a próxima precisa suportar." },
        ] },
        { type: "quote", text: "Falhou bem onde a gente não colocou o reforço de cola quente", attribution: "Mônica, estudante em uma oficina de engenharia da Avanza STEM" },
      ] },
      { title: "Por Que Recomeçar Não É Começar do Zero", blocks: [
        { type: "paragraph", text: "Mudar algo depois de um teste não é recomeçar. Você leva junto uma informação a que o seu primeiro projeto nunca teve acesso." },
        { type: "callout", accent: "purple", text: "Iterar nem sempre significa reconstruir tudo antes de o encontro acabar. Às vezes é um ajuste inteligente, um desenho melhor ou uma anotação clara rabiscada para a próxima vez." },
        { type: "paragraph", text: "E é esse o detalhe dos engenheiros experientes. Eles não necessariamente acertam mais na primeira tentativa. Eles são muito melhores em ler o que a primeira tentativa está dizendo." },
      ] },
      { title: "A Regra da Mudança Única", blocks: [
        { type: "paragraph", text: "Quando algo falha e você ainda tem tempo de consertar, mude exatamente uma coisa antes de testar de novo. Parece fácil. Não é, porque todo o seu instinto quer consertar tudo de uma vez." },
        { type: "paragraph", text: "Mudou três coisas e a versão seguinte aguentou mais? Ótimo, mas qual delas resolveu? Você não faz ideia. Foi sorte, e sorte não passa para a próxima construção." },
        { type: "list", items: [
          "Escolha a mudança que ataca exatamente o que falhou",
          "Faça essa única mudança, se o relógio permitir",
          "Teste de novo do mesmo jeito, para a comparação significar alguma coisa",
          "Anote o que aconteceu, ou o que você quer tentar depois",
          "Deixe essa anotação guiar o próximo projeto",
        ] },
        { type: "ctaLink", title: "Construa Algo e Teste", text: "Nas nossas oficinas de engenharia, os estudantes constroem uma estrutura, colocam peso até ela falhar e descobrem o que a bagunça está dizendo.", linkText: "Ver próximas oficinas", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "the-engineering-of-a-backpack": {
    ...localizedBlogArticles.en["the-engineering-of-a-backpack"],
    title: "A Engenharia de Uma Mochila",
    category: "Engenharia",
    readTime: common.pt.minutes.m5,
    imageAlt: "Uma fileira de mochilas mostrando tamanhos, materiais, alças, zíperes e disposição de bolsos diferentes",
    imageCaption: "As mochilas são engenharia do dia a dia: a distribuição do peso, os materiais, os zíperes, as alças e os bolsos precisam funcionar juntos.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "A bolsa que você está carregando nos ombros agora mesmo está resolvendo, em silêncio, uma dúzia de problemas de engenharia. As alças tiram o peso das suas mãos. O painel acolchoado distribui a pressão pelas suas costas. Os zíperes abrem e fecham milhares de vezes e, de algum jeito, continuam funcionando. O tecido é resistente, leve, quase impermeável e barato o bastante para um estudante conseguir pagar." },
        { type: "paragraph", text: "Nada disso é acaso. Alguém sentou com cada um desses problemas, discutiu, testou um conserto e depois testou de novo." },
      ] },
      { title: "O Problema da Distribuição do Peso", blocks: [
        { type: "paragraph", text: "Carregue 5 quilos em uma mão por um quarteirão e seu braço morre. Carregue os mesmos 5 quilos nas costas e você quase nem nota. Isso não é resistência, é física. Uma bolsa pendurada na sua mão cria um braço de alavanca, que multiplica o quanto seus músculos precisam trabalhar. Uma mochila encosta esse peso na sua coluna e, de repente, a conta fica muito mais amigável." },
        { type: "paragraph", text: "Aquelas alças fazem mais do que segurar a bolsa. Uma alça mais larga distribui exatamente o mesmo peso por mais superfície, então a pressão em cada ponto cai. Os sapatos de neve usam a mesma ideia. O acolchoamento também ajuda, porque ele amassa um pouco e nivela a carga em vez de cravar em uma linha só." },
        { type: "callout", title: "Ordem de Carga por Peso", accent: "purple", text: "O pesado vai o mais colado nas suas costas possível e o leve vai para fora. Isso mantém o centro de massa junto da sua coluna, em vez de te puxar para a frente e detonar a sua lombar." },
      ] },
      { title: "Como Funciona um Zíper", blocks: [
        { type: "paragraph", text: "Olhe um zíper de perto e você vai ver duas fileiras de dentes viradas uma para a outra. Cada dente tem uma saliência de um lado e um encaixe do outro. Quando você puxa o cursor, ele alinha cada dente para que a saliência de um lado caia no encaixe do outro. Clique. Clique. Clique." },
        { type: "paragraph", text: "É por isso que um zíper fechado parece tão firme. Aqueles dentes entrelaçados se recusam a se separar e se recusam a deslizar de lado. No sentido contrário, o cursor enfia uma pequena cunha entre as fileiras e vai soltando os dentes aos pares." },
        { type: "list", items: [
          "Zíperes de metal duram mais, mas pesam mais",
          "Zíperes de espiral de plástico são mais leves e acompanham costuras curvas",
          "A YKK fabrica a maioria dos zíperes do mundo, e você vai ver esse logo em quase toda bolsa decente",
          "Eles quase sempre falham porque o cursor abriu demais, e um aperto suave com alicate às vezes ressuscita o zíper",
        ] },
      ] },
      { title: "Materiais e Escolhas", blocks: [
        { type: "paragraph", text: "Não existe tecido perfeito para mochila. Cada opção troca peso por durabilidade por resistência à água por preço, e alguém teve que decidir." },
        { type: "numbered", items: [
          { title: "Náilon", body: "Resistente, leve e aguenta arranhões. A maioria das mochilas caras usa náilon porque ele sobrevive anos sem quase pesar nada." },
          { title: "Poliéster", body: "Um pouco mais pesado que o náilon, mais barato e não desbota tão rápido no sol. É disso que quase toda mochila escolar é feita." },
          { title: "Lona", body: "Dura e pesada, mas bebe água. Perfeita para ir andando à escola, péssima escolha para uma trilha na chuva." },
          { title: "Ripstop", body: "Um tecido com uma grade de fios de reforço embutida. Se rasgar, a grade trava o rasgo na hora. Você vê isso em mochilas de alto desempenho." },
        ] },
        { type: "paragraph", text: "E aqui vai o que quase ninguém sabe: a resistência à água vem de um revestimento no lado de dentro do tecido, não do tecido em si. Esse revestimento se desgasta com os anos, e é por isso que uma mochila velha molha mesmo parecendo perfeita por fora." },
      ] },
      { title: "O Sistema de Bolsos", blocks: [
        { type: "paragraph", text: "Ninguém espalhou aqueles bolsos a esmo. Cada um é uma aposta que alguém fez sobre como você carrega as suas coisas." },
        { type: "list", items: [
          "O compartimento principal é dimensionado para cadernos, uma capa de notebook ou um moletom dobrado",
          "O bolso da frente guarda o que você pega toda hora e não quer solto por aí",
          "Os bolsos laterais têm formato de garrafa porque essa forma está em todo lugar e é fácil de prever",
          "O bolsinho de cima é para o que você precisa sem abrir a mochila inteira",
          "O organizador interno pressupõe que você carrega canetas, chaves e um celular",
        ] },
        { type: "callout", title: "Teste Isto", accent: "purple", text: "Avalie a sua própria mochila como um engenheiro faria. De 1 a 5 em distribuição de peso, qualidade do zíper, tecido e resistência à água, arranjo dos bolsos e como as alças ficam depois de dez minutos andando. E agora a pergunta de verdade: o que você consertaria primeiro?" },
      ] },
    ],
  },
  "what-makes-a-stem-workshop-fun": {
    ...localizedBlogArticles.en["what-makes-a-stem-workshop-fun"],
    title: "O Que Deixa Uma Oficina de STEM Divertida?",
    category: "Comunidade",
    readTime: common.pt.minutes.m5,
    imageAlt: "Estudantes e famílias construindo, testando e conversando ativamente em uma oficina comunitária da Avanza STEM",
    imageCaption: "Uma oficina em que as crianças falam, constroem e debatem está funcionando. Uma sala silenciosa geralmente não está.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Se os estudantes estão sentados quietos vendo um adulto demonstrar algo, isso não é uma oficina de STEM. É uma apresentação. E as apresentações, até as boas, já foram esquecidas no café da manhã do dia seguinte." },
        { type: "paragraph", text: "Por isso a gente coloca tanto trabalho no desenho do encontro quanto no conteúdo. O que as crianças fazem naquela sala ganha de qualquer coisa que a gente possa dizer a elas." },
      ] },
      { title: "A Diferença entre Ativo e Passivo", blocks: [
        { type: "paragraph", text: "Aprendizado passivo é olhar, escutar, receber. Ativo é construir, testar, discutir, quebrar algo e consertar. A pesquisa sobre qual dos dois fica na cabeça não chega nem perto de ser disputada." },
        { type: "paragraph", text: "Mas ter as mãos ocupadas não é a mesma coisa que pensar. Uma criança pode colar palitos no piloto automático por trinta minutos. O truque é desenhar a atividade para que o fazer obrigue a pensar." },
        { type: "callout", accent: "purple", text: "Nas nossas oficinas, ninguém assiste a um mentor construir uma ponte. Os estudantes recebem materiais, uma meta de peso e uns 30 minutos. A frustração, a discussão com o colega sobre o projeto, o momento em que a ponte aguenta muito mais do que eles esperavam: é ali que o aprendizado acontece de verdade." },
      ] },
      { title: "Como a Gente Desenha as Atividades da Avanza STEM", blocks: [
        { type: "paragraph", text: "Antes de uma atividade entrar em um encontro, ela precisa sobreviver a quatro perguntas." },
        { type: "numbered", items: [
          { title: "Existe um teste de verdade?", body: "Se os estudantes não conseguem descobrir se a ideia deles funcionou, não é um desafio de projeto, é um trabalho de artes. Cada atividade termina com um veredito. A ponte aguenta? O rover atravessa? O código roda?" },
          { title: "Ela pode falhar de um jeito interessante?", body: "Uma falha útil é um recurso, não um defeito. Se algo só funciona ou desaba sem motivo claro, não há o que iterar. As melhores falhas são tão específicas que o estudante sabe exatamente o que consertar." },
          { title: "Existe mais de um caminho?", body: "Um desafio com uma única resposta certa vira uma corrida. Um com várias abordagens boas deixa os estudantes tomarem decisões de verdade e depois compararem resultados com a mesa do lado." },
          { title: "Eles estão conversando entre si?", body: "Dois estudantes discutindo se acrescentam outra diagonal ou reforçam a emenda não estão distraídos. Estão fazendo engenharia." },
        ] },
      ] },
      { title: "O Que os Estudantes Realmente Fazem nas Nossas Oficinas", blocks: [
        { type: "paragraph", text: "Em um encontro de 60 minutos, um estudante costuma passar por cinco ou seis coisas diferentes:" },
        { type: "list", items: [
          "Ouvir um enunciado de dois minutos com o objetivo e as restrições, e nada mais",
          "Discutir o projeto com o colega antes de encostar em qualquer material",
          "Construir a versão um e testar, quase sempre vendo a coisa falhar",
          "Fazer uma mudança específica com base no que acabou de ver",
          "Testar de novo e descobrir se aquela mudança realmente ajudou",
          "Contar ao grupo o que aprendeu. Não o que construiu. O que descobriu",
        ] },
        { type: "paragraph", text: "Esse último passo é o que quase toda oficina pula. No segundo em que um estudante precisa colocar aquilo em palavras, ele descobre se entendeu ou se só teve sorte." },
      ] },
      { title: "Por Que Barulho Costuma Ser um Bom Sinal", blocks: [
        { type: "paragraph", text: "Uma sala calada deixa os adultos confortáveis. Quase sempre significa que os estudantes desligaram. Quando as crianças estão falando por cima umas das outras, até discutindo, aquela sala está pensando." },
        { type: "quote", text: "Achei que estavam se dispersando de tanto barulho em cima do assunto do zíper. Mas aí eu escutei e, na verdade, eles estavam debatendo se o atrito era maior por fora ou por dentro da curva. É exatamente isso que a gente queria.", attribution: "Mentor da Avanza STEM depois de um encontro de ciências" },
        { type: "paragraph", text: "Naquele momento, o trabalho do mentor não é mandar ninguém calar a boca. É soltar uma pergunta que deixe a discussão mais afiada." },
      ] },
      { title: "As Três Coisas Que Sempre Incluímos", blocks: [
        { type: "numbered", items: [
          { title: "Um teste de verdade com um resultado de verdade", body: "Nada de \"muito bem, pessoal\". Um passou ou não passou, contra o objetivo que a gente disse em voz alta no começo." },
          { title: "Um jeito específico de falhar", body: "Se tudo funciona na primeira tentativa, ninguém descobriu onde estavam os limites." },
          { title: "Tempo para dizer o que descobriram", body: "Construir sem reflexão é pura atividade. A reflexão é onde a coisa fixa." },
        ] },
        { type: "ctaLink", title: "Venha Ver uma Oficina", text: "Nossas oficinas são gratuitas, práticas e abertas a todo mundo. Você pode chegar sem nunca ter construído nada na vida.", linkText: "Ver próximas oficinas", href: "/workshops", accent: "purple" },
      ] },
    ],
  },
  "engineering-inside-school-bus": {
    ...localizedBlogArticles.en["engineering-inside-school-bus"],
    title: "A Engenharia Secreta Dentro de Um Ônibus Escolar",
    category: "Engenharia",
    readTime: common.pt.minutes.m5,
    imageAlt: "Um ônibus escolar amarelo mostrando a cor de segurança característica, espelhos grandes e sinalização de saída de emergência",
    imageCaption: "A engenharia não está só em laboratórios e fábricas. Ela está embalada em cada veículo em que você anda, inclusive no ônibus escolar.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Um ônibus escolar parece a coisa mais simples do mundo. Caixa amarela enorme, fileiras de bancos, luzes piscando, um motor que se ouve a dois quarteirões. Mas quase toda peça daquele ônibus é a resposta a uma pergunta que alguém teve que resolver: como transportar um monte de crianças e entregar todas inteiras?" },
        { type: "paragraph", text: "Quando você sabe o que procurar, o ônibus deixa de ser chato. Vamos desmontá-lo." },
      ] },
      { title: "Por Que os Ônibus Escolares São Amarelos?", blocks: [
        { type: "paragraph", text: "Ninguém escolheu aquele amarelo porque ficava bonito. Escolheram porque o seu olho o captura na luz da manhã, no reflexo chapado da tarde e sob um céu cinza. Os projetistas de segurança queriam uma cor que os motoristas percebessem antes mesmo de notar que perceberam." },
        { type: "paragraph", text: "Agora some as luzes piscando, o braço com a placa de pare e o tamanho absurdo. Tudo diz a mesma frase: reduza a velocidade, tem criança aqui. O ônibus é projetado para ser impossível de ignorar." },
      ] },
      { title: "Os Bancos São Ferramentas de Segurança", blocks: [
        { type: "paragraph", text: "Aqueles bancos parecem simplórios, mas fazem um trabalho sério. A maioria dos ônibus usa um truque chamado compartimentação: bancos altos, bem acolchoados e colados uns nos outros de propósito. Se o ônibus frear forte, o encosto da frente segura você como uma parede acolchoada." },
        { type: "paragraph", text: "Por baixo, as estruturas são feitas para sobreviver a buracos, curvas fechadas e uns dez anos de estudantes subindo em cima. Um banco de ônibus não é um móvel. É parte do sistema de segurança." },
      ] },
      { title: "Por Que o Motorista Consegue Ver Tanta Coisa?", blocks: [
        { type: "paragraph", text: "O motorista precisa acompanhar a via, as crianças, a porta, a calçada e cada carro em volta, tudo ao mesmo tempo. É por isso que os espelhos parecem quase cômicos de tão grandes. Alguns cobrem o que vem atrás. Outros ficam angulados para pegar o ponto cego bem na frente do para-choque, onde uma criança pequena pode sumir por completo." },
        { type: "paragraph", text: "A visibilidade é um dos problemas mais difíceis em um veículo desse tamanho. Os engenheiros estão basicamente inventando jeitos de o motorista enxergar em volta do próprio ônibus." },
      ] },
      { title: "Fazer um Veículo Gigante Virar", blocks: [
        { type: "paragraph", text: "Um ônibus é muito mais comprido que um carro, o que transforma cada curva em um problema de matemática. Os engenheiros chamam isso de raio de giro: quanto espaço um veículo precisa para dar a volta. Em uma rua estreita, um ônibus precisa de muito mais que o carro da sua família." },
        { type: "paragraph", text: "Então, quando um motorista abre bastante antes de virar, ele não está se exibindo. Está obedecendo à geometria." },
      ] },
      { title: "As Saídas de Emergência Estão em Todo Lugar", blocks: [
        { type: "paragraph", text: "Conte as saídas na próxima vez que entrar. Porta da frente, porta traseira de emergência, escotilhas no teto, janelas que empurram para fora. A boa engenharia não planeja para o dia normal. Planeja para o dia em que nada sai normal." },
        { type: "callout", title: "Por Que Tantas Saídas?", accent: "purple", text: "E se a porta da frente estiver bloqueada? E se o ônibus ficar tombado? E se quarenta crianças precisarem sair em menos de um minuto? Os engenheiros fazem essas perguntas muito antes de alguém viver isso." },
      ] },
      { title: "Teste Isto: Projete Seu Próprio Ônibus Mais Seguro", blocks: [
        { type: "paragraph", text: "Pegue papel e desenhe o seu próprio ônibus. Coloque espelhos, saídas, arranjo dos bancos, luzes, placas, janelas, espaço de carga. E aqui vai a regra: para cada parte que você desenhar, precisa dizer qual problema ela resolve." },
        { type: "callout", title: "A Pergunta do Engenheiro", accent: "purple", text: "Os engenheiros não perguntam \"está bonito?\". Eles perguntam \"o que isto faz e qual problema resolve?\". Passe essa pergunta por cada linha do seu desenho e veja o que sobrevive." },
      ] },
      { title: "Reflexão Final", blocks: [
        { type: "paragraph", text: "Da próxima vez que um ônibus escolar passar, olhe de verdade. A cor, os espelhos, os bancos, as saídas, até o jeito como ele faz a esquina. Cada uma dessas coisas é uma decisão que alguém tomou de propósito. Aquele ônibus é engenharia sobre rodas." },
      ] },
    ],
  },
  "why-airplane-wings-are-curved": {
    ...localizedBlogArticles.en["why-airplane-wings-are-curved"],
    title: "Por Que as Asas dos Aviões São Curvas?",
    category: "Engenharia",
    readTime: common.pt.minutes.m5,
    imageAlt: "Um Boeing 777-200 da United Airlines em voo, com as asas de perfil aerodinâmico curvadas e as winglets levantadas bem visíveis",
    imageCaption: "As asas dos aviões não são tábuas planas. O formato de perfil aerodinâmico cria a diferença de pressão que tira do chão um avião de cem toneladas.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "As asas têm talvez o trabalho mais doido de toda a engenharia. Um Boeing 777 cheio pesa cerca de 135 toneladas, e duas asas convencem essa coisa a subir para o céu. Pense um pouco nisso. Como algo tão pesado decola?" },
        { type: "paragraph", text: "Quase toda a resposta está escondida na forma." },
      ] },
      { title: "As Asas Não São Planas", blocks: [
        { type: "paragraph", text: "Olhe uma asa de perfil alguma vez. Não é uma tábua. A parte de cima é curvada e a de baixo fica bem mais plana. Os engenheiros chamam isso de perfil aerodinâmico, e ele existe por um único motivo: mexer com o ar de um jeito bem específico." },
        { type: "paragraph", text: "Quando o avião avança, o ar se divide e escoa em volta da asa. Esse formato deixa o ar de cima com pressão menor que o de baixo. Mais pressão embaixo, menos pressão em cima, e a asa recebe um empurrão para cima. Esse empurrão é a sustentação." },
      ] },
      { title: "A Sustentação Não É Mágica", blocks: [
        { type: "paragraph", text: "A sustentação não é um truque esperto e definitivamente não é mágica. Uma asa funciona porque muda para onde o ar vai. Ao cortar o céu, a asa joga uma montanha de ar para baixo. A terceira lei de Newton diz que toda ação tem uma reação igual e contrária, então, se a asa empurra ar para baixo, o ar empurra a asa para cima. Duas coisas acontecem ao mesmo tempo:" },
        { type: "numbered", items: [
          { title: "Ela cria uma diferença de pressão", body: "O ar que passa por cima da curva vai mais rápido, e a pressão ali cai abaixo da de baixo." },
          { title: "Ela joga ar para baixo", body: "A asa redireciona o fluxo para o chão, e a reação empurra o avião para o céu." },
        ] },
      ] },
      { title: "Por Que o Avião Precisa de Velocidade?", blocks: [
        { type: "paragraph", text: "Um avião parado na pista não vai a lugar nenhum, por melhores que sejam as asas dele. As asas precisam de ar passando por cima para fazer qualquer coisa. Vá mais rápido, mova mais ar, ganhe mais sustentação." },
        { type: "paragraph", text: "É esse o ponto inteiro daquela corrida comprida pela pista. Os motores empurram o avião para a frente, o ar começa a correr sobre as asas e, em uma velocidade exata, a sustentação enfim ganha do peso. As rodas se soltam do chão." },
      ] },
      { title: "O Que São os Flaps?", blocks: [
        { type: "paragraph", text: "Olhe a asa na decolagem ou no pouso e você vai ver pedaços que deslizam para fora e se inclinam para baixo. Esses são os flaps e os slats, e eles mudam o formato da asa em pleno voo para espremer mais sustentação em baixa velocidade." },
        { type: "paragraph", text: "Isso importa porque decolar e pousar são justamente os momentos em que o avião não pode ir rápido. Ninguém quer um jato voando a 800 quilômetros por hora perto do chão, então os engenheiros colocaram partes móveis na asa." },
      ] },
      { title: "Teste Isto: Experimento com Papel", blocks: [
        { type: "paragraph", text: "Pegue duas folhas de papel. Dobre uma em um aviãozinho básico e deixe a outra plana. Lance as duas do mesmo jeito. O aviãozinho vai a algum lugar. A folha plana esvoaça e morre. Mesmo papel, mesmo lançamento, forma completamente diferente." },
        { type: "callout", title: "A Forma Importa", accent: "purple", text: "Os engenheiros testam formatos de asa em túneis de vento, em simulações e, por fim, em voos de verdade. Uma mudança que você taparia com o polegar pode alterar bastante a sustentação que uma asa gera." },
      ] },
      { title: "Reflexão Final", blocks: [
        { type: "paragraph", text: "As asas são curvas porque a forma controla o ar, o ar cria sustentação e a sustentação ganha da gravidade. Então, da próxima vez que um avião passar acima de você, não dê todo o crédito aos motores. Aquelas asas são ferramentas de precisão transformando ar em movimento e em uma saída do chão." },
      ] },
    ],
  },
  "how-elevators-know-where-to-go": {
    ...localizedBlogArticles.en["how-elevators-know-where-to-go"],
    title: "Como os Elevadores Sabem Para Onde Ir",
    category: "Engenharia",
    readTime: common.pt.minutes.m4,
    imageAlt: "O interior de um elevador moderno com botões de andar iluminados e paredes metálicas polidas",
    imageCaption: "Por trás daquele simples toque de botão existe um sistema de sensores, motores, contrapesos e lógica que move pessoas entre andares com segurança.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Você aperta um botão. As portas fecham. Alguma coisa zumbe. Trinta segundos depois você sai exatamente no andar que queria. Parece nada. Na verdade é uma máquina rodando sensores, motores, cabos, contrapesos e um monte de lógica, tudo para ninguém precisar pensar nisso." },
        { type: "paragraph", text: "Então, como essa coisa sabe para onde você quer ir?" },
      ] },
      { title: "O Botão Envia um Pedido", blocks: [
        { type: "paragraph", text: "Apertar o botão não controla o motor. Você não está dirigindo. Está enviando um pedido ao sistema de controle, que é basicamente o cérebro dele, e esse cérebro já está acompanhando:" },
        { type: "list", items: [
          "Em qual andar a cabine está neste momento",
          "Todos os botões que alguém apertou",
          "Para onde ela já está indo",
          "Se as portas estão abertas ou fechadas",
          "Se tem alguma coisa presa na porta",
        ] },
        { type: "paragraph", text: "Ele nunca chuta. Cada movimento sai dessa lista." },
      ] },
      { title: "Os Sensores Dizem ao Elevador Onde Ele Está", blocks: [
        { type: "paragraph", text: "Um elevador precisa saber a própria posição dentro do poço, então há sensores rastreando a cabine no percurso inteiro. Essas leituras dizem quando começar a frear, quando parar e se ele realmente ficou no nível do piso." },
        { type: "paragraph", text: "Essa última importa mais do que parece. Uma cabine que para cinco centímetros acima vira um tropeço para todo mundo que sai. É por isso que eles são projetados para chegar com precisão de milímetros." },
      ] },
      { title: "Os Motores Fazem o Trabalho Pesado", blocks: [
        { type: "paragraph", text: "Um motor elétrico gira uma polia, a polia puxa os cabos e os cabos puxam a cabine. Até aí, simples. Mas aqui vem a sacada: quase todo elevador pendura um contrapeso na outra ponta. A cabine sobe, o contrapeso desce. A cabine desce, o contrapeso sobe." },
        { type: "paragraph", text: "Esse equilíbrio significa que o motor não está brigando contra o peso inteiro de uma cabine cheia. Parece mais uma gangorra do que um guindaste, e economiza uma quantidade enorme de energia." },
      ] },
      { title: "O Elevador Usa Lógica Simples", blocks: [
        { type: "paragraph", text: "Digamos que a cabine esteja no andar 1 e as pessoas apertem 3, 5 e 2. Ele não atende na ordem em que os pedidos chegaram. Ele sobe e pega o 2, depois o 3, depois o 5, varrendo em uma direção só. Zero viagens desperdiçadas, ninguém esperando eternamente." },
        { type: "paragraph", text: "Em prédios muito altos isso fica bem mais esperto. Alguns sistemas perguntam para qual andar você vai antes de você entrar, e agrupam as pessoas por destino para cada cabine fazer menos paradas." },
      ] },
      { title: "A Segurança Vem Primeiro", blocks: [
        { type: "paragraph", text: "Um elevador é carregado de sistemas de segurança. Sensores na porta para ela não fechar no seu braço. Freios que travam a cabine se ela se mover quando não deve. Redundâncias que assumem o controle quando uma peça falha. Alguém já imaginou tudo o que poderia dar errado para que você nunca precise imaginar." },
      ] },
      { title: "Teste Isto: Jogo de Lógica do Elevador", blocks: [
        { type: "paragraph", text: "Agora você é o controlador. Desenhe um prédio de 6 andares e coloque a cabine no andar 2. Alguém no 5 quer descer. Alguém no 1 quer subir. Alguém que já está dentro apertou o 4. Em que ordem você atende?" },
        { type: "callout", title: "Não Existe Uma Única Resposta Certa", accent: "purple", text: "Aqui não há solução perfeita, e é esse o ponto. Os engenheiros equilibram velocidade, justiça, segurança e consumo de energia ao mesmo tempo. Qual deles você está disposto a sacrificar?" },
      ] },
      { title: "Reflexão Final", blocks: [
        { type: "paragraph", text: "Um elevador não sabe nada do jeito que você sabe as coisas. Ele lê sensores, roda lógica e gira motores. Da próxima vez que você entrar em um, lembre que existe um sistema inteiro trabalhando em silêncio dentro das paredes, e a única coisa que você teve que fazer foi apertar um botão." },
      ] },
    ],
  },
  "why-buildings-sway-in-wind": {
    ...localizedBlogArticles.en["why-buildings-sway-in-wind"],
    title: "Por Que os Prédios Balançam com o Vento?",
    category: "Engenharia",
    readTime: common.pt.minutes.m5,
    imageAlt: "O arranha-céu Taipei 101 erguendo-se sobre o horizonte de Taipé, um dos exemplos mais estudados de projeto de prédio resistente ao vento",
    imageCaption: "O Taipei 101 é projetado para se flexionar de propósito. Com ventos fortes de tufão, o topo pode oscilar quase um metro, e é exatamente isso que o mantém em pé.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Fique perto do topo de um arranha-céu em um dia de vento e você vai sentir o piso se mover embaixo de você. Pouquinho. Seu cérebro vai gritar na hora que tem algo errado. Seu cérebro está errado. Esse movimento é o projeto funcionando, e um prédio que consegue oscilar um pouco costuma ser mais seguro do que um que se recusa a ceder." },
      ] },
      { title: "O Vento Empurra os Prédios", blocks: [
        { type: "paragraph", text: "O vento parece nada quando bate no seu rosto. Jogue-o contra uma parede de vidro de 60 andares e ele vira uma força bem séria. Quanto mais alto você constrói, mais dessa força você captura. Então os engenheiros precisam responder a perguntas incômodas antes de o primeiro concreto ser lançado: com que força o vento bate aqui, quão alto vamos, qual forma captura menos, quanto o prédio vai se mover e se as pessoas lá dentro vão passar mal." },
        { type: "paragraph", text: "Um arranha-céu não está só se sustentando. Ele está em uma briga permanente contra o ar em movimento." },
      ] },
      { title: "Ser Flexível Pode Ser Mais Seguro", blocks: [
        { type: "paragraph", text: "Dobre um graveto seco e ele estala limpo. Dobre um galho vivo e ele simplesmente acompanha o movimento. Os prédios funcionam igual. Faça um rígido demais e um vento forte ou um terremoto não têm para onde mandar essa energia, então ela se acumula dentro da estrutura até algo ceder." },
        { type: "paragraph", text: "Um prédio que consegue se flexionar absorve parte dessa energia e distribui o resto. Dobrar, aqui, não é fraqueza. É o plano." },
      ] },
      { title: "Os Terremotos Também Sacodem os Prédios", blocks: [
        { type: "paragraph", text: "O vento empurra o prédio de lado, por fora. Um terremoto ataca por baixo. O solo se move, a base do prédio se move junto, e tudo lá em cima precisa descobrir o que fazer a respeito." },
        { type: "paragraph", text: "Os engenheiros revidam com estruturas resistentes, ligações flexíveis, amortecedores e fundações feitas para deslizar ou isolar. A meta quase nunca é deixar o prédio perfeitamente parado. A meta é ele continuar em pé e todo mundo lá dentro continuar vivo." },
      ] },
      { title: "Alguns Prédios Têm Amortecedores Gigantes", blocks: [
        { type: "paragraph", text: "Alguns arranha-céus escondem um peso enorme perto do topo, chamado amortecedor de massa sintonizado. Imagine um pêndulo do tamanho de um cômodo. Quando o prédio se inclina para um lado, o amortecedor balança para o outro e cancela o movimento." },
        { type: "callout", accent: "purple", text: "É um contragolpe gigante instalado dentro do prédio. Você não vê da calçada, mas, em um dia de vento, é por causa dele que ninguém lá em cima passa mal." },
        { type: "image", src: "/images/blog/Ball in the middle of Taipei 101.jpg", alt: "A esfera amortecedora dourada de 660 toneladas suspensa dentro do Taipei 101, visível do mirante", caption: "A esfera amortecedora dourada de 660 toneladas do Taipei 101 fica pendurada perto do 88º andar. Quando o vento empurra o prédio para um lado, esse pêndulo balança na direção oposta e cancela o movimento que as pessoas sentiriam lá dentro." },
      ] },
      { title: "A Forma Também Importa", blocks: [
        { type: "paragraph", text: "A forma de um prédio muda como o vento viaja em volta dele. Cantos vivos, faces planas, perfis altos e magros: cada um lida com o ar de um jeito. É por isso que os engenheiros constroem modelos em escala e os colocam em túneis de vento para ver o que o ar faz de verdade." },
        { type: "paragraph", text: "Depois eles ajustam. Arredondam os cantos, abrem vãos que atravessam a torre, torcem o perfil inteiro. Quando um arranha-céu parece estranho, aquela forma quase sempre está fazendo um trabalho." },
      ] },
      { title: "Teste Isto: Teste da Torre de Papel", blocks: [
        { type: "paragraph", text: "Construa duas torres de papel. Uma rígida e reta, a outra um pouco frouxa e elástica. Agora sopre nelas, ou bata na mesa. Qual cai primeiro? Qual dobra bastante e volta?" },
        { type: "callout", title: "O Que os Engenheiros Estudam", accent: "purple", text: "Essa é uma versão pequenininha da pergunta real. Nunca é só \"ele vai ficar em pé?\". É \"o que ele faz quando alguma coisa o empurra?\"" },
      ] },
      { title: "Reflexão Final", blocks: [
        { type: "paragraph", text: "Os prédios oscilam porque o vento e os terremotos os empurram, e um pouco de movimento é justamente como uma estrutura sobrevive a esse empurrão. Então, quando um arranha-céu se desloca alguns centímetros em uma tempestade, ninguém errou. Alguém fez o trabalho direito." },
      ] },
    ],
  },
  "engineering-behind-soccer-ball": {
    ...localizedBlogArticles.en["engineering-behind-soccer-ball"],
    title: "A Engenharia Por Trás de Uma Bola de Futebol",
    category: "Engenharia",
    readTime: common.pt.minutes.m6,
    imageAlt: "Uma bola de futebol moderna mostrando o desenho dos gomos e a textura da superfície",
    imageCaption: "As bolas de futebol modernas são sistemas de precisão. Cada camada, formato de gomo e textura de superfície é projetada para otimizar o voo, a transferência de energia e a estabilidade aerodinâmica.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "A bola que está na sua garagem é uma peça de engenharia mais séria do que parece. As bolas antigas eram de couro, e o couro bebe água, então, no segundo tempo de um jogo com chuva, os jogadores basicamente chutavam um tijolo molhado. As bolas de hoje são feitas de ciência dos materiais, geometria de gomos e tecnologia de fábrica que não existia vinte anos atrás." },
      ] },
      { title: "A Anatomia de 4 Camadas", blocks: [
        { type: "paragraph", text: "Abra uma bola oficial de jogo e você vai encontrar quatro camadas, cada uma ali por um motivo:" },
        { type: "list", items: [
          "Câmara: o balão do centro, geralmente de borracha butílica ou látex, que guarda o ar. O butil segura a pressão por mais tempo. O látex tem toque mais macio e quica melhor. Os fabricantes escolhem o próprio veneno.",
          "Revestimento: camadas de poliéster e algodão trançados enroladas em volta da câmara. É isso que mantém a bola redonda depois de dez mil chutes, em vez de ela virar um ovo aos poucos.",
          "Amortecimento de espuma: uma camada de poliuretano ou EVA embaixo da capa. Ela amassa no impacto e volta, devolvendo mais da sua energia ao chute.",
          "Capa: o couro sintético de fora. Ele se recusa a absorver água, então a bola pesa o mesmo no minuto 90 e no minuto 1, e a textura dela é projetada para agarrar o ar.",
        ] },
      ] },
      { title: "Desenho dos Gomos e Aerodinâmica", blocks: [
        { type: "paragraph", text: "A mudança mais visível são os gomos. Aquela bola clássica de 32 gomos com pentágonos pretos tinha costuras por todo lado, e cada costura é arrasto. As bolas modernas se viram com 6 ou 8 gomos, o que corta muito o comprimento total de costura." },
        { type: "paragraph", text: "E elas nem são mais costuradas. Calor e cola de alta frequência unem os gomos em algo quase sem costura e totalmente impermeável. Os engenheiros modelam o escoamento do ar com o mesmo software de simulação usado para projetar aviões. E aquelas bolinhas e ranhuras na superfície? Não são enfeite. Elas controlam a camada de ar grudada na bola, e é isso que faz um chute forte voar reto em vez de dançar para todo lado." },
      ] },
      { title: "Equilíbrio Dinâmico e o Efeito Magnus", blocks: [
        { type: "paragraph", text: "Toda bola oficial precisa passar em um teste de equilíbrio dinâmico, o que significa que o peso dela está tão bem distribuído que ela gira sem oscilar. Se isso der errado, a bola se move de forma imprevisível, os jogadores odeiam e a marca é destruída na internet." },
        { type: "paragraph", text: "Se der certo, você destrava o efeito Magnus. Chute a bola fora do centro e ela gira. Um lado dessa superfície girando acompanha o ar, o outro briga contra ele. Esse desequilíbrio cria uma força lateral de verdade que curva a trajetória em pleno voo. Toda falta que dá a volta na barreira é essa força fazendo o trabalho dela." },
        { type: "callout", title: "O Efeito Magnus em Ação", accent: "purple", text: "A mesma física faz uma bola curva no beisebol quebrar e uma direita com topspin no tênis mergulhar. Gire a bola, bagunce a pressão do ar em volta dela, e a bola vai para um lugar onde não tinha motivo para ir." },
      ] },
      { title: "Tecnologia Integrada", blocks: [
        { type: "paragraph", text: "As bolas de elite não são mais só couro e ar. Algumas hoje levam um sensor suspenso dentro delas, sobre a própria estrutura, rastreando o movimento em três dimensões e reportando 500 vezes por segundo. Onde a bola está, com que velocidade ela vai, o instante exato em que uma chuteira encostou nela." },
        { type: "paragraph", text: "Esse sinal é o que torna possível o impedimento semiautomático e a tecnologia da linha do gol, capaz de dizer em milissegundos se a bola inteira cruzou a linha. A bola já é parte da equipe de arbitragem." },
      ] },
      { title: "Reflexão Final", blocks: [
        { type: "paragraph", text: "Uma bola de futebol não é só algo que você chuta. É um sistema em camadas em que ciência dos materiais, dinâmica dos fluidos e sensores precisam cooperar. Todo chute incrível que você já viu começou com alguém projetando a bola." },
      ] },
    ],
  },
  "why-manhole-covers-are-round": {
    ...localizedBlogArticles.en["why-manhole-covers-are-round"],
    title: "Por Que as Tampas de Bueiro São Redondas?",
    category: "Engenharia",
    readTime: common.pt.minutes.m4,
    imageAlt: "Uma tampa de bueiro de ferro fundido no asfalto da cidade, mostrando o formato circular e a textura antiderrapante da superfície",
    imageCaption: "As tampas de bueiro são redondas porque um círculo não consegue cair dentro de um buraco do mesmo tamanho, não importa como você o gire.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Uma tampa de bueiro parece o objeto mais chato do planeta. Tampa pesada de metal, na rua, os carros passam por cima. Só isso, né? Pois é um enigma famoso de engenharia, e faz décadas que ele aparece em entrevistas de emprego. Então, por que ela é redonda?" },
      ] },
      { title: "Uma Tampa Redonda Não Cai no Próprio Buraco", blocks: [
        { type: "paragraph", text: "Esta é a resposta que todo mundo conhece, e ela é genuinamente elegante. Gire um círculo na direção que quiser e ele mede o mesmo de lado a lado. Então uma tampa redonda fisicamente não consegue cair em um buraco redondo do mesmo tamanho. Ela simplesmente não passa." },
        { type: "paragraph", text: "Agora tente isso com um quadrado. A diagonal de um quadrado é mais comprida que os lados, então, se você inclinar no ângulo certo, a tampa desce direto pelo buraco. E tem gente trabalhando lá embaixo. Ninguém quer uma placa de ferro de 100 quilos caindo em cima, então o círculo ganha." },
      ] },
      { title: "Tampas Redondas São Mais Fáceis de Mover", blocks: [
        { type: "paragraph", text: "Essas coisas são pesadíssimas. Algumas pesam mais que a pessoa que as move. Mas um círculo rola. Um trabalhador consegue colocá-la de pé e tocá-la pela rua como se fosse um pneu. Tente isso com um quadrado e você tem quatro cantos brigando com você o caminho inteiro." },
        { type: "paragraph", text: "Os engenheiros pensam nas pessoas que vão conviver com o projeto. A forma é só uma parte. Alguém precisa levantar isso, mover, substituir e fazer tudo de novo daqui a quinze anos." },
      ] },
      { title: "O Buraco Também É Redondo", blocks: [
        { type: "paragraph", text: "Olhe dentro do buraco e você vai notar que o poço também é redondo. Formas redondas distribuem a pressão por igual, que é a mesma razão de os canos serem redondos e não quadrados. Buraco redondo, tampa redonda. A forma da tampa acompanha a forma do que ela está tampando." },
      ] },
      { title: "Não Precisa Alinhar", blocks: [
        { type: "paragraph", text: "Solte uma tampa redonda sobre um buraco redondo de qualquer ângulo e ela encaixa. Sempre. Com um quadrado você precisa girar e alinhar cantos enquanto carrega algo que pesa o mesmo que você. Os círculos economizam tempo e eliminam um jeito inteiro de errar." },
      ] },
      { title: "Resistente e Simples", blocks: [
        { type: "paragraph", text: "Aquela tampa aguenta carros, caminhões, chuva, neve, calor, gelo e uns vinte anos de tudo isso. Ser redonda distribui o peso por igual em vez de concentrá-lo nos cantos. E o padrão texturizado de cima também não é decoração. Ele está ali para pneus e sapatos agarrarem metal molhado." },
      ] },
      { title: "Teste Isto: Teste de Formas", blocks: [
        { type: "paragraph", text: "Recorte um círculo de papel e um quadrado de papel. Em outra folha, recorte os buracos correspondentes. Agora tente passar cada tampa pelo próprio buraco em todos os ângulos que conseguir imaginar. Uma vai passar. A outra, nunca." },
        { type: "callout", title: "Um Projeto, Muitas Soluções", accent: "purple", text: "Esse teste de papel é exatamente o motivo de os engenheiros amarem essa forma. Segura, resistente, fácil de mover, fácil de repor, tudo ao mesmo tempo. Um único projeto resolvendo cinco problemas em silêncio é quase o melhor que a engenharia consegue oferecer." },
      ] },
      { title: "Reflexão Final", blocks: [
        { type: "paragraph", text: "As tampas redondas são seguras, resistentes, roláveis e impossíveis de colocar errado. Isso é uma forma só fazendo cinco trabalhos. Da próxima vez que você passar por cima de uma, dê outra olhada. Aquele círculo de metal é mais esperto do que parece." },
      ] },
    ],
  },
  "how-roller-coasters-stay-on-track": {
    ...localizedBlogArticles.en["how-roller-coasters-stay-on-track"],
    title: "Como as Montanhas-Russas Ficam Presas no Trilho",
    category: "Engenharia",
    readTime: common.pt.minutes.m5,
    imageAlt: "Uma montanha-russa com descidas íngremes e loopings contra um céu claro, mostrando o projeto do trilho que mantém os passageiros a bordo com segurança",
    imageCaption: "As montanhas-russas permanecem no trilho porque os engenheiros projetam a gravidade, o impulso e os sistemas de rodas multidirecionais para trabalharem juntos.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "As montanhas-russas parecem estar trapaceando. Elas sobem uma ladeira impossível, se jogam no vazio, te atiram para o lado e te colocam de cabeça para baixo enquanto seu estômago registra uma reclamação formal. Então, por que o trem nunca sai dos trilhos? Gravidade, impulso, umas rodas muito engenhosas e um monte de engenheiros que realmente não queriam que você caísse." },
      ] },
      { title: "A Gravidade Começa o Passeio", blocks: [
        { type: "paragraph", text: "Aquela subida lenta e barulhenta do começo é o passeio inteiro se carregando. Uma corrente ou um motor arrasta o trem até o topo e, uma vez lá, o trem tem uma conta bancária de energia só por estar alto. Os engenheiros chamam isso de energia potencial." },
        { type: "paragraph", text: "Depois o trilho some debaixo dos seus pés e a gravidade gasta até o último centavo. A energia guardada vira velocidade, que é energia cinética. Aquela primeira descida não é só para gritar. Ela está pagando por todo o resto do passeio." },
      ] },
      { title: "O Impulso Mantém Tudo em Movimento", blocks: [
        { type: "paragraph", text: "Agora o trem está em movimento, e coisas em movimento querem continuar em movimento. Isso é impulso, e é o que leva você pelas ladeiras seguintes, pelas curvas e pelos loopings." },
        { type: "paragraph", text: "Mas o atrito e a resistência do ar estão te roubando o tempo todo. Então os projetistas precisam acertar uma janela bem estreita: velocidade suficiente para chegar em casa, não tanta a ponto de o passeio ficar perigoso. Devagar demais e o trem para de cabeça para baixo. Rápido demais e as forças ficam feias." },
      ] },
      { title: "As Rodas Fazem Mais do Que Você Imagina", blocks: [
        { type: "paragraph", text: "O trem não está só apoiado sobre o trilho como um carro na estrada. Olhe embaixo de um deles alguma vez e você vai encontrar três conjuntos de rodas fazendo três trabalhos diferentes:" },
        { type: "list", items: [
          "Rodas de rolagem, que ficam em cima do trilho",
          "Rodas laterais, que pressionam por fora e mantêm o trem alinhado nas curvas",
          "Rodas de retenção por baixo do trilho, agarrando de baixo para o trem não se soltar quando você está de cabeça para baixo",
        ] },
        { type: "paragraph", text: "Então, durante um looping, a montanha-russa não está esperando educadamente a gravidade cooperar. Ela está fisicamente abraçada ao trilho por três direções." },
      ] },
      { title: "Por Que Você Não Cai?", blocks: [
        { type: "paragraph", text: "Barras de colo, cintos, travas sobre os ombros. Qual delas você recebe depende do que o passeio está prestes a fazer com você. Uma montanha-russa familiar tranquila só precisa de uma barra. Qualquer coisa que te deixe de cabeça para baixo recebe algo bem mais sério." },
        { type: "paragraph", text: "E o objetivo do projeto é meio trapaceiro. Os engenheiros querem que você sinta que está mal se segurando, enquanto na verdade você está extremamente preso ao banco. Uma boa montanha-russa parece imprudente e é exatamente o contrário." },
      ] },
      { title: "Os Loopings Não São Círculos Perfeitos", blocks: [
        { type: "paragraph", text: "Aqui vai um detalhe que quase ninguém nota. Os loopings não são círculos. Eles têm formato de gota esticada, largos embaixo e apertados em cima. Um círculo de verdade te esmagaria com força lá embaixo e depois te deixaria lento demais no topo." },
        { type: "paragraph", text: "O formato de gota distribui essas forças para o seu corpo aguentar. Parece uma decisão estética. Na verdade é um plano de resgate para o seu pescoço." },
      ] },
      { title: "Teste Isto: Montanha-Russa de Bolinha", blocks: [
        { type: "paragraph", text: "Papel, papelão, fita e uma bolinha de gude. Construa uma pista com uma ladeira e uma curva. E agora sabote. Faça a primeira ladeira baixa demais. Faça a curva fechada demais. Deixe a pista cheia de calombos. Cada falha diz exatamente o que consertar." },
        { type: "callout", title: "As Mesmas Perguntas, em Escala Menor", accent: "purple", text: "Esses são os mesmos testes que os engenheiros de montanha-russa rodam, menos alguns milhões de dólares. Toda vez que a sua bolinha sai voando ou morre no meio da ladeira, ela acabou de te entregar dados." },
      ] },
      { title: "Reflexão Final", blocks: [
        { type: "paragraph", text: "O trem fica no trilho porque cada peça foi projetada para mantê-lo ali. A gravidade dá a velocidade, o impulso leva até o fim, as rodas agarram por três lados, as travas mantêm você no lugar e o formato do trilho controla o que o seu corpo sente. A emoção é totalmente real. A matemática por baixo também." },
      ] },
    ],
  },
  "why-chairs-break": {
    ...localizedBlogArticles.en["why-chairs-break"],
    title: "Por Que Algumas Cadeiras Quebram e Outras Não?",
    category: "Engenharia",
    readTime: common.pt.minutes.m4,
    imageAlt: "Estudantes construindo uma ponte de palitos de picolé, testando emendas e distribuição de carga, os mesmos princípios estruturais que valem para as cadeiras",
    imageCaption: "Cadeiras e pontes compartilham os mesmos problemas de engenharia: as junções, os caminhos de carga e a escolha dos materiais determinam se elas aguentam ou falham.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Uma cadeira tem exatamente um trabalho. Sustentar você. E mesmo assim as cadeiras quebram o tempo todo. Pés que estalam, encostos que racham, parafusos que vão afrouxando sozinhos, assentos que aos poucos viram rede. Por que uma cadeira sobrevive a uma década de maus-tratos e outra desiste em um ano? Engenharia, de cima a baixo." },
      ] },
      { title: "As Cadeiras Precisam Lidar com Forças", blocks: [
        { type: "paragraph", text: "Você senta e o seu peso empurra direto o assento. Essa força precisa viajar pela estrutura, descer pelos pés e chegar ao chão. Distribua bem e a cadeira nem se abala. Jogue tudo em uma única junção fraca e alguma coisa vai rachar." },
        { type: "paragraph", text: "Isso é a distribuição do peso, e é o jogo inteiro. Uma boa cadeira não só aguenta peso. Ela leva esse peso de você até o piso sem drama." },
      ] },
      { title: "Os Materiais Importam", blocks: [
        { type: "paragraph", text: "Madeira, plástico, metal, tecido, ou uma mistura dos quatro. Cada um tem o próprio jeito de falhar. A madeira é forte até a fibra correr na direção errada e ela lascar. O plástico é leve e barato até ficar fino demais e trincar. O metal é duro até ficar fino demais, e aí simplesmente entorta." },
        { type: "paragraph", text: "Os projetistas escolhem pensando em custo, resistência, conforto, peso e como fica no catálogo. As melhores cadeiras usam o material certo em cada ponto específico. Ninguém ganha fazendo tudo com o material mais resistente que existe." },
      ] },
      { title: "As Junções Costumam Ser a Parte Mais Fraca", blocks: [
        { type: "paragraph", text: "As cadeiras quase nunca quebram no meio de uma peça maciça de madeira. Elas se abrem onde duas peças se encontram. Esses pontos de ligação são as junções, e um pé pode se prender ao assento com parafusos, cola, pinos, cantoneiras ou um encaixe entalhado." },
        { type: "paragraph", text: "Junções fracas, cadeira fraca. É por isso que um bambeio é um aviso. Bambear significa que algo está se mexendo que nunca deveria se mexer, e só vai piorar." },
      ] },
      { title: "A Forma Pode Deixar Uma Cadeira Mais Resistente", blocks: [
        { type: "paragraph", text: "Vire uma cadeira resistente de cabeça para baixo e você provavelmente vai encontrar barras ligando os pés. Esses travessões impedem que os pés abram sob a carga. Outros projetos chegam ao mesmo lugar com plástico curvado, estruturas soldadas ou triângulos escancarados." },
        { type: "callout", accent: "purple", text: "Triângulos de novo. Pelo mesmo motivo de sustentarem pontes e torres: eles se recusam a mudar de forma. Uma cadeira pode ficar muito mais forte só pela geometria, sem um grama de material a mais." },
      ] },
      { title: "Os Testes Importam", blocks: [
        { type: "paragraph", text: "Antes de uma cadeira chegar à loja, tem máquina maltratando ela. Empilham peso, inclinam para trás, deixam cair e sentam nela milhares de vezes seguidas. Porque a vida real é pior que qualquer laboratório. As pessoas se balançam em dois pés, se torcem, se jogam de uma vez, arrastam cadeiras pelo chão e empilham de seis em seis." },
        { type: "paragraph", text: "Aguentar uma vez é fácil. Aguentar a vez número dez mil é o desafio de verdade." },
      ] },
      { title: "Teste Isto: Desafio da Cadeira de Papel", blocks: [
        { type: "paragraph", text: "Construa com papel e fita uma cadeira capaz de sustentar algo real, como um livro ou um brinquedo. Depois construa mais três. Pés retos, pés dobrados, escoras triangulares, tubos de papel enrolado. Carregue uma por uma e veja qual se recusa a ceder." },
        { type: "callout", title: "O Que Você Vai Descobrir", accent: "purple", text: "Você vai descobrir bem rápido que a forma e as junções importam tanto quanto o material. Um projeto simples com junções limpas costuma esmagar um projeto elegante mal colado." },
      ] },
      { title: "Reflexão Final", blocks: [
        { type: "paragraph", text: "As cadeiras quebram quando as forças não têm para onde ir. Elas duram quando alguém escolheu materiais inteligentes, uma forma inteligente e junções que aguentam. Parece um móvel qualquer, mas toda vez que suporta o seu peso, aquela cadeira está fazendo engenharia." },
      ] },
    ],
  },
  "hidden-engineering-water-bottle": {
    ...localizedBlogArticles.en["hidden-engineering-water-bottle"],
    title: "A Engenharia Escondida de Uma Garrafa de Água",
    category: "Engenharia",
    readTime: common.pt.minutes.m6,
    imageAlt: "Uma garrafa plástica transparente mostrando as laterais com frisos, o gargalo com rosca e o projeto estrutural da base",
    imageCaption: "Uma garrafa de água descartável pesa poucos gramas mas contém milhares de vezes o próprio peso em líquido. Cada friso, rosca e espessura de parede tem um motivo de ser.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Uma garrafa de água descartável pode ser o objeto menos impressionante que você vai tocar hoje. Ela guarda água. Você bebe. Você joga fora. Mas olhe para ela como um problema de materiais e a coisa fica meio ridícula." },
        { type: "paragraph", text: "Essa garrafa pesa poucos gramas. Ela sobrevive a uma fábrica, a um caminhão, a um depósito, a um cooler, à sua mochila e a uma queda no concreto. Se tiver refrigerante, ainda tem gás empurrando cada parede para fora. Além disso tudo, ela precisa manter a água limpa, vedar sem vazar, ficar boa na mão e custar quase nada um bilhão de vezes seguidas." },
        { type: "callout", title: "O Grande Dilema", accent: "purple", text: "Tudo o que torna esta garrafa leve, resistente e barata é também o que a transforma em um problema de lixo. Grande engenharia, final incômodo." },
      ] },
      { title: "A Façanha de Engenharia", blocks: [
        { type: "paragraph", text: "Quase todas são feitas de PET, sigla de politereftalato de etileno. O PET é transparente, leve, fácil de moldar e surpreendentemente resistente para o peso que tem. Essa combinação é o que permite fazer paredes tão finas que amassam na sua mão sem a garrafa se desfazer na prateleira." },
        { type: "numbered", items: [
          { title: "Leve e resistente", body: "Uma garrafa de PET carrega milhares de vezes o próprio peso em água. Esticar o plástico durante a moldagem alinha as longas cadeias de polímero lá dentro, e esse alinhamento responde por boa parte da resistência." },
          { title: "Fina, mas ciente da pressão", body: "Aqueles frisos, curvas e a base de formato estranho são todos estruturais. As garrafas de refrigerante recebem a geometria mais cuidadosa de todas, porque o gás preso empurra o tempo todo para fora, em cada centímetro." },
          { title: "Rápida de fabricar", body: "As máquinas aquecem uma pré-forma de PET parecida com um tubo de ensaio, sopram dentro de um molde, enchem, tampam e rotulam mais rápido do que você leva para ler esta frase. Essa velocidade é quase toda a razão de a água engarrafada estar em todo lugar." },
        ] },
      ] },
      { title: "A Forma Não É Aleatória", blocks: [
        { type: "paragraph", text: "Uma garrafa precisa ser fácil de segurar, empilhável e rígida o bastante para não dobrar quando você a levanta. Aquelas ranhuras no meio não são estilo. Elas dão aos seus dedos algo em que se apoiar, o que importa muito quando as mãos estão molhadas." },
        { type: "paragraph", text: "A forma também decide como a garrafa lida com a pressão. Uma garrafa perfeitamente lisa e de parede fina amassa assim que você aperta. Coloque frisos e a mesma quantidade de plástico fica visivelmente mais rígida. Menos material, mesmo trabalho." },
      ] },
      { title: "A Física da Tampa", blocks: [
        { type: "paragraph", text: "Olhe o gargalo da garrafa. Aqueles frisos em espiral são roscas, e a tampa tem roscas que se encaixam por dentro. Quando você gira, as roscas puxam a tampa para baixo em vez de só fazê-la girar." },
        { type: "paragraph", text: "Esse puxão para baixo aperta um anel de vedação contra a borda. O que você quer é uma vedação hermética, tão apertada que impede vazamentos, mantém o gás dentro e deixa o ar e as bactérias de fora." },
        { type: "paragraph", text: "E aquela tampinha é uma máquina simples, da mesma família de uma rampa ou de um parafuso. Ela transforma um giro fácil em um aperto forte para baixo. Tirar mais força do que você colocou é exatamente para isso que as máquinas simples existem." },
      ] },
      { title: "Por Que o Plástico É Mais Grosso em Alguns Lugares?", blocks: [
        { type: "paragraph", text: "Passe os dedos por uma garrafa de cima a baixo e a espessura muda. A base precisa ser robusta para ficar de pé e aguentar uma queda. O gargalo precisa ser sólido para a tampa morder. As laterais podem se dar ao luxo de ser finas, então são." },
        { type: "paragraph", text: "Isso são engenheiros equilibrando resistência, custo, conforto e desperdício ao mesmo tempo. Fina demais e ela amassa na sua mão. Grossa demais e você acabou de desperdiçar plástico um bilhão de vezes. Um bom projeto coloca material exatamente onde está o esforço e em nenhum outro lugar." },
      ] },
      { title: "A Abertura Importa", blocks: [
        { type: "paragraph", text: "Faça a abertura pequena demais e beber vira um incômodo. Faça grande demais e você derrama na camisa. As garrafas reutilizáveis são largas para caber gelo e para você conseguir lavar por dentro. As descartáveis são estreitas, porque só precisam sobreviver a um uso e ninguém vai esfregá-las." },
        { type: "paragraph", text: "Até aquele buraco foi decisão de alguém." },
      ] },
      { title: "Rótulos e Pegada", blocks: [
        { type: "paragraph", text: "O rótulo enrolado no meio faz dois trabalhos. Marca, claro, mas também acrescenta atrito bem onde a sua mão vai. As garrafas reutilizáveis levam isso mais longe, com capas de borracha, plástico texturizado ou metal com pintura eletrostática. Uma garrafa que escorrega da mão molhada é um projeto que falhou, principalmente para crianças ou para alguém no meio de uma trilha." },
      ] },
      { title: "Os Dilemas e as Preocupações de Saúde", blocks: [
        { type: "paragraph", text: "Resolver um problema com elegância não significa que você resolveu todos os problemas. As garrafas de uso único trazem uma conta ambiental real, e os pesquisadores ainda estão descobrindo o que todas aquelas partículas minúsculas de plástico significam para nós." },
        { type: "numbered", items: [
          { title: "Partículas de microplástico e nanoplástico", body: "A microscopia nova detecta partículas que os métodos antigos nem enxergavam. Uma equipe da Columbia e da Rutgers contou uma média de cerca de 240.000 partículas de plástico detectáveis por litro na água engarrafada que analisou, e a maioria era de nanoplásticos." },
          { title: "Atrito da tampa", body: "Toda vez que você gira uma tampa, rosca de plástico raspa em rosca de plástico. Pesquisas revisadas por pares mostram que esse atrito solta mais partículas de microplástico bem na abertura." },
          { title: "Migração de substâncias", body: "Calor, sol, meses de armazenamento ou reutilizar uma garrafa feita para uma viagem só aumentam a preocupação de o plástico se degradar e os aditivos dele passarem para a água. Os cientistas seguem estudando o que exatamente isso faz com as pessoas." },
          { title: "Impacto ambiental", body: "O PET pode ser reciclado. Boa parte não é. As garrafas que viram lixo ficam em aterros, rios e oceanos por muitíssimo tempo." },
        ] },
        { type: "callout", title: "A Engenharia Envolve Escolhas", accent: "purple", text: "Uma garrafa descartável é excelente em ser leve, vedada, resistente e barata. É péssima em desaparecer quando você termina de usar." },
      ] },
      { title: "Como Reduzir a Exposição ao Plástico", blocks: [
        { type: "paragraph", text: "Ninguém precisa entrar em pânico aqui, e uma garrafa de plástico ainda é melhor do que não ter água limpa. Mas, se você quiser diminuir o plástico do dia a dia, as mudanças são bem fáceis." },
        { type: "list", items: [
          "Leve uma garrafa de vidro ou aço inoxidável para a sua água do dia a dia.",
          "Não deixe garrafas de plástico cozinhando em um carro quente nem sob sol direto.",
          "Pule o costume de reencher uma garrafa que foi feita para um uso só.",
          "Coloque um filtro certificado em casa, se a água da sua torneira é segura mas você quer tranquilidade extra.",
          "Recicle o PET onde a sua cidade aceitar, e use estações de reabastecimento quando encontrar.",
        ] },
      ] },
      { title: "Teste Isto: Análise de Projeto de Garrafa", blocks: [
        { type: "paragraph", text: "Pegue uma garrafa descartável e uma reutilizável e coloque lado a lado. Compare a tampa, a textura da pegada, o formato da base, a espessura da parede, o tamanho da abertura, o quanto cada uma amassa fácil, o quanto elas ficam estáveis em pé e como você lavaria cada uma." },
        { type: "callout", title: "Não Existe Resposta Perfeita", accent: "purple", text: "Nenhuma delas ganha de vez, e essa é a lição. Uma garrafa de trilha é feita para sobreviver. A de uma criança é feita para não derramar. A descartável é feita para não custar nada. Enxergar esses dilemas é o trabalho." },
      ] },
      { title: "Reflexão Final", blocks: [
        { type: "paragraph", text: "Uma garrafa de água é um projeto de engenharia completo disfarçado de recipiente. Guardar líquido, não vazar, caber em uma mão, ficar de pé, sobreviver a uma queda, desperdiçar o mínimo de material possível. Também é um lembrete de que decisões de projeto continuam tendo consequências muito depois de o produto sair das suas mãos." },
        { type: "paragraph", text: "Da próxima vez que você tomar um gole, dedique dois segundos à garrafa. Tem muito mais pensamento ali do que alguém queria que você notasse." },
      ] },
    ],
  },
  "can-ai-actually-think": {
    ...localizedBlogArticles.en["can-ai-actually-think"],
    title: "A IA Consegue Mesmo Pensar?",
    category: "IA",
    readTime: common.pt.minutes.m5,
    imageAlt: "Uma visualização abstrata da inteligência artificial, com um cérebro digital ou padrão de rede neural representando aprendizado de máquina e reconhecimento de padrões",
    imageCaption: "A IA consegue reconhecer padrões e gerar respostas, mas isso é diferente de pensar como os humanos pensam. Ela prevê; não compreende.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Digite \"me explique buracos negros como se eu tivesse 10 anos\" em uma IA e três segundos depois você tem uma resposta sólida. Peça uma história, ajuda com matemática, uma imagem, uma ideia para a feira de ciências, e ela simplesmente entrega. Realmente parece que alguma coisa lá dentro está pensando." },
        { type: "paragraph", text: "Então vale a pena perguntar: está? E a resposta honesta é não, não como você." },
        { type: "paragraph", text: "A IA faz coisas genuinamente impressionantes, mas não existe um cérebro lá dentro. Não há sentimentos. Não há lembranças da própria vida. Não há imaginação como a sua. Ela não tem ideia real de como o mundo é. O que ela tem é um talento incrível para detectar padrões." },
      ] },
      { title: "O Que É Reconhecimento de Padrões?", blocks: [
        { type: "paragraph", text: "Reconhecer padrões é só notar o que se repete, e você faz isso o tempo todo. Nuvens escuras se juntam, um trovão soa longe, o vento levanta, e antes de decidir qualquer coisa o seu cérebro já disse \"chuva\". Ninguém te ensinou. Você já viu esse filme." },
        { type: "paragraph", text: "A IA faz o mesmo truque em uma escala absurda. Imagine ler milhares de livros, artigos, sites e conversas. Com o tempo você começaria a notar quais palavras andam juntas, quais respostas costumam seguir quais perguntas e quais ideias sempre aparecem lado a lado." },
        { type: "paragraph", text: "É esse o assunto inteiro. A IA absorve padrões de dados e depois os usa para adivinhar o que vem em seguida quando você pergunta algo. Ela soa inteligente porque os padrões que aprendeu vieram de gente inteligente escrevendo coisas. Soar inteligente e pensar são dois trabalhos diferentes." },
      ] },
      { title: "Em Que o Pensamento Humano É Diferente?", blocks: [
        { type: "paragraph", text: "Você faz muito mais do que casar padrões. Você se pergunta coisas. Você se importa com as pessoas. Você se confunde, se empolga, fica nervoso, orgulhoso, curioso. Você decide que algo importa para você. Você muda de ideia por causa de uma tarde que ficou marcada. Você percebe quando algo é injusto, ou quando seu amigo está mal e não fala." },
        { type: "paragraph", text: "A IA não faz nada disso. Digamos que a sua ponte de palitos desabe. Você sente no estômago. Depois pensa, talvez o centro precisasse de mais apoio, e começa a desenhar a versão dois. Lógica, memória, emoção, criatividade e experiência disparando ao mesmo tempo." },
        { type: "paragraph", text: "Pergunte a uma IA por que a ponte caiu e ela vai dar uma resposta decente sobre triângulos e distribuição de peso. Mas ela nunca viu a ponte cair. Ela não se importou. Nada daquele momento a mudou, e amanhã ela não vai lembrar." },
      ] },
      { title: "A IA Entende o Que Diz?", blocks: [
        { type: "paragraph", text: "Ela consegue te explicar um vulcão. Consegue escrever um poema sobre uma tartaruga. Consegue te contar dos anéis de Saturno. Nada disso significa que ela entenda qualquer uma dessas coisas como você." },
        { type: "paragraph", text: "Pense no corretor automático do seu celular. Você escreve \"vou para a\" e ele oferece loja, escola, casa. Seu celular não faz ideia de como está a sua tarde. Ele está adivinhando a próxima palavra." },
        { type: "callout", accent: "teal", text: "A IA está fazendo uma versão muito mais sofisticada dessa mesma jogada. Ela prevê palavras, frases e ideias a partir de padrões. É exatamente por isso que ela pode cravar uma resposta e, trinta segundos depois, dizer algo completamente estranho." },
      ] },
      { title: "Um Exemplo Simples", blocks: [
        { type: "paragraph", text: "Pergunte a uma IA: um peixe consegue andar de bicicleta? Uma pessoa riria e diria que não, peixes não têm pernas e bicicletas precisam de terra firme. A IA provavelmente também diria que não. Mas não porque imaginou um peixe cambaleando pela rua. Ela está rodando padrões de linguagem e fatos que absorveu." },
        { type: "paragraph", text: "Agora inverta: escreva uma história engraçada sobre um peixe andando de bicicleta. De repente você tem uma história. Ela mudou do modo fatos para o modo história porque reconheceu que formato de resposta você queria. Útil, e também um alerta. Como você pergunta muda o que você recebe." },
      ] },
      { title: "Então, a IA É Inteligente?", blocks: [
        { type: "paragraph", text: "Em algumas coisas, com certeza. Ela encontra padrões rapidíssimo, organiza informação bagunçada, faz chuva de ideias com você às 11 da noite, explica um tema de cinco jeitos, resume, escreve código, traduz idiomas e ajuda as pessoas a aprender." },
        { type: "paragraph", text: "Em outras coisas, nem perto. Ela não faz ideia do que é ser criança, pisar na bola na frente dos outros, ajudar um amigo, ganhar alguma coisa ou sentir aquele orgulho específico quando o que você construiu enfim funciona. Ela não tem bom senso. E pode estar completamente errada soando completamente segura. É uma ferramenta, não um substituto do seu cérebro." },
      ] },
      { title: "Pense na IA Como uma Supercalculadora de Palavras", blocks: [
        { type: "paragraph", text: "Uma calculadora arrasa na matemática. Mas ela não faz ideia de por que você precisa da resposta, se você digitou os números errados, nem se o resultado faz algum sentido na vida real. Ela só calcula." },
        { type: "paragraph", text: "A IA é a mesma ideia, só que trabalha com palavras, imagens, código e padrões em vez de só números. Ela pode te ajudar a pensar. Não deveria estar pensando por você." },
      ] },
      { title: "Teste Isto", blocks: [
        { type: "paragraph", text: "Vá e faça estas três coisas com uma IA, uma atrás da outra:" },
        { type: "list", items: [
          "Explique como um aviãozinho de papel voa.",
          "Explique como um aviãozinho de papel voa como se eu estivesse no 2º ano.",
          "Invente uma história engraçada sobre um aviãozinho de papel que vai a Marte.",
        ] },
        { type: "paragraph", text: "Repare o quanto as respostas mudam. A IA não virou professora, depois criança, depois contadora de histórias. Ela só casou o padrão do que você pediu. É esse o assunto inteiro em três perguntas." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "A IA não pensa como você. Ela detecta padrões, prevê o que vem em seguida e monta respostas com o que aprendeu dos dados. Isso é poderoso e genuinamente divertido de usar. Mas você continua trazendo coisas que ela não tem: compreensão real, criatividade de verdade, critério, sentimentos e responsabilidade pelo que você fizer com a resposta." },
        { type: "callout", accent: "teal", text: "A IA pode te ajudar a pensar. Seu cérebro continua sendo a melhor ferramenta da sala, e é ele que precisa decidir o que vem depois." },
      ] },
    ],
  },
  "why-ai-sometimes-gets-things-wrong": {
    ...localizedBlogArticles.en["why-ai-sometimes-gets-things-wrong"],
    title: "Por Que a IA Às Vezes Erra",
    category: "IA",
    readTime: common.pt.minutes.m5,
    imageAlt: "Uma representação visual da IA produzindo um resultado incorreto ou confuso, ilustrando o conceito de alucinação e erro da IA",
    imageCaption: "A IA não sabe as coisas do jeito que as pessoas sabem. Ela prevê, e às vezes as previsões dela estão erradas com toda a confiança.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "A IA responde rápido. Dinossauros, um conto curto, um erro no seu código, uma ideia para a feira de ciências. Às vezes a resposta é excelente. Às vezes ela soa excelente. Nem sempre é a mesma coisa." },
        { type: "paragraph", text: "O que levanta uma pergunta justa: se essa tecnologia é tão avançada, por que ela continua errando? Porque a IA não sabe as coisas do jeito que você sabe. Ela prevê, com base em padrões. Quase sempre acerta. Às vezes sai pela tangente." },
      ] },
      { title: "A IA Pode Chutar Errado", blocks: [
        { type: "paragraph", text: "Toda vez que você pergunta algo, a IA está montando uma resposta com o formato da sua pergunta. Ela se apoia em padrões de uma montanha de exemplos e prevê quais palavras vêm depois. Então, mesmo quando soa segura demais, ela está fazendo um palpite muito bem informado." },
        { type: "paragraph", text: "Pergunte qual é a montanha mais alta do mundo e ela diz Everest sem problema. Esse dado aparece em todo lugar. Mas fique muito específico, pergunte algo obscuro, e talvez ela não tenha padrões sólidos de onde puxar. Em vez de te avisar, ela pode produzir algo que soa certo. Esse é o modo de falha número um: ela responde quando deveria dar de ombros." },
      ] },
      { title: "O Que É uma Alucinação?", blocks: [
        { type: "paragraph", text: "Quando uma IA inventa algo e te entrega como se fosse fato, as pessoas chamam isso de alucinação. Ela não está vendo coisas. Ela gerou uma resposta com o formato da verdade, mas sem nada dentro." },
        { type: "paragraph", text: "Coisas que a IA já inventou com toda a tranquilidade:" },
        { type: "list", items: [
          "Um título de livro que não existe",
          "Uma data errada por décadas",
          "Uma citação que ninguém jamais disse",
          "Um dado científico que soa completamente razoável e é falso",
          "Uma fonte com um link bem convincente que não leva a lugar nenhum",
        ] },
        { type: "callout", accent: "teal", text: "O perigoso é o tom. Uma alucinação chega com exatamente a mesma confiança de uma resposta certa. É por isso que você continua conferindo o que importa." },
      ] },
      { title: "Dados Ruins Podem Levar a Respostas Ruins", blocks: [
        { type: "paragraph", text: "A IA aprende com dados, e dados significam o texto, as imagens e os números com que a alimentaram. Parte disso está desatualizada. Parte é enviesada. Parte conta metade da história. Parte está simplesmente errada. Aprenda padrões de uma pilha bagunçada e você vai repetir parte da bagunça." },
        { type: "paragraph", text: "Imagine estudar por um caderno em que metade das páginas está certa e a outra metade tem respostas erradas anotadas. Se você nunca confere, vai aprender o errado com toda a confiança e nem perceber. A IA está na mesma situação, só que o caderno dela é do tamanho da internet." },
      ] },
      { title: "A IA Nem Sempre Entende a Pergunta", blocks: [
        { type: "paragraph", text: "Às vezes o problema não é a IA. É a pergunta. Se alguém chegasse e perguntasse \"qual é o tamanho?\", você diria \"o tamanho de quê?\". Uma IA muitas vezes só escolhe um significado e vai, e, se escolheu errado, tudo o que vem depois está errado." },
        { type: "paragraph", text: "É por isso que o jeito de perguntar importa tanto. \"Me fale sobre energia\" não dá nada com que trabalhar. \"Explique a diferença entre energia renovável e não renovável para uma criança do 4º ano\" dá um alvo. Mesma ferramenta, resposta radicalmente diferente." },
      ] },
      { title: "A IA Pode Confundir Coisas Parecidas", blocks: [
        { type: "paragraph", text: "Os padrões são a força dela e também a fraqueza. Duas figuras históricas com nomes parecidos se fundem em uma pessoa só. O título de um filme troca de lugar com o de um livro. Uma explicação científica usa palavras que soam certas mas descrevem algo levemente diferente." },
        { type: "paragraph", text: "Isso acontece porque a IA não está olhando para o mundo. Está olhando para textos sobre o mundo. E alguns sistemas nem conhecem o que aconteceu recentemente, então, para descobertas novas, mudanças de regras ou qualquer coisa no noticiário, vá conferir uma fonte atual." },
      ] },
      { title: "Como Você Pode Conferir as Respostas da IA?", blocks: [
        { type: "callout", title: "Uma Regra Simples", accent: "teal", text: "A IA é ajudante, não a palavra final. Tudo o que envolver escola, segurança, saúde ou notícias se confere antes de usar." },
        { type: "paragraph", text: "Faça algumas perguntas a você mesmo. De onde essa informação teria vindo? Consigo encontrar isso em algum lugar em que confio? Isso bate com o que meu professor disse? E a mais importante: isso faz sentido de verdade?" },
        { type: "paragraph", text: "Três conferências rápidas funcionam bem. Faz sentido? Uma fonte confiável confirma? Um professor, um pai ou uma pessoa especialista concordaria? Se falhar em qualquer uma das três, reduza muito a velocidade." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "A IA erra porque chuta, porque os dados de treinamento dela eram imperfeitos, porque a sua pergunta foi vaga, porque ela misturou duas coisas parecidas ou porque nunca viu a informação mais nova. Nada disso a torna inútil. Só significa que você continua no volante." },
        { type: "callout", accent: "teal", text: "A IA pode te ajudar a aprender mais rápido e a pensar em voz alta. Seu trabalho é continuar fazendo uma pergunta: como eu sei que isso é verdade?" },
      ] },
    ],
  },
  "how-does-your-phone-recognize-your-face": {
    ...localizedBlogArticles.en["how-does-your-phone-recognize-your-face"],
    title: "Como Seu Celular Reconhece Seu Rosto?",
    category: "IA",
    readTime: common.pt.minutes.m5,
    imageAlt: "Uma tela de iPhone mostrando a configuração do Face ID com um escaneamento facial em andamento, ilustrando como o celular mapeia a geometria do rosto",
    imageCaption: "O Face ID mapeia milhares de pontos do seu rosto e os compara com um modelo 3D guardado, usando o mesmo tipo de reconhecimento de padrões que está no coração da IA moderna.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Você levanta o celular, olha para ele e a tela abre. Sem senha, sem digitar, sem pensar. Realmente parece meio mágico." },
        { type: "paragraph", text: "Mas o seu celular não está dizendo \"ah, é você\". Ele não te conhece como os seus amigos conhecem. O que ele faz é acionar câmeras e sensores, transformar o seu rosto em um padrão de números e conferir se esse padrão parece suficientemente com o que está guardado." },
      ] },
      { title: "Seu Rosto Tem Padrões", blocks: [
        { type: "paragraph", text: "Seu rosto é cheio de medidas. A distância entre os olhos. A inclinação do nariz. Onde fica o queixo em relação às maçãs do rosto. Junte todas essas distâncias e você tem uma combinação que quase ninguém mais tem." },
        { type: "paragraph", text: "Seu celular tem uma dessas combinações guardada. Quando você olha para ele, ele monta uma nova e compara as duas. Se são parecidas o bastante, você entra. É basicamente um joguinho de combinar caríssimo acontecendo em menos de um segundo." },
      ] },
      { title: "O Que Acontece Quando Você Configura?", blocks: [
        { type: "paragraph", text: "Lembra que a configuração pede para você girar a cabeça em círculo? Existe um motivo. Seu rosto não parece igual de todos os ângulos nem com toda luz. Sol direto, cômodo escuro, óculos no rosto, óculos fora." },
        { type: "paragraph", text: "O celular está juntando vistas suficientes para montar um padrão que sobreviva a tudo isso. Pule essa parte e você ficaria trancado do lado de fora toda vez que sentasse na sombra." },
      ] },
      { title: "As Câmeras e os Sensores Ajudam", blocks: [
        { type: "paragraph", text: "Uma câmera comum só tira uma foto plana. Alguns celulares acrescentam sensores que medem profundidade, ou seja, o quão longe cada parte do seu rosto está da lente. Essa é a diferença entre um rosto e a foto de um rosto." },
        { type: "paragraph", text: "Pense no desenho de um cubo comparado a um cubo de verdade em cima da mesa. Mesmo contorno, completamente diferentes em três dimensões. Detectar profundidade é por que um celular se recusa a desbloquear com uma foto impressa." },
      ] },
      { title: "Onde Entra o Aprendizado de Máquina?", blocks: [
        { type: "paragraph", text: "O aprendizado de máquina é a parte da IA em que o computador descobre padrões a partir de exemplos, em vez de seguir regras que alguém escreveu. No desbloqueio facial, é o que ensina ao celular quais padrões são seus e o quanto eles podem mudar." },
        { type: "paragraph", text: "Porque você muda. Você sorri, inclina a cabeça, coloca um boné, faz um corte de cabelo do qual se arrepende. O aprendizado de máquina é o que impede o celular de surtar a cada pequena mudança." },
      ] },
      { title: "Por Que a Privacidade Importa", blocks: [
        { type: "paragraph", text: "Aqui vem a parte incômoda. Uma senha e um rosto não são o mesmo tipo de segredo. Se roubarem a sua senha, você faz outra em trinta segundos. Ninguém nunca conseguiu um rosto novo." },
        { type: "callout", accent: "teal", text: "Então empresas, escolas e aplicativos que lidam com dados faciais precisam ser extremamente cuidadosos, e deveriam dizer o que coletam, onde isso fica e quem pode ver. Se um aplicativo quiser escanear o seu rosto, é uma boa hora para ir perguntar a um adulto." },
      ] },
      { title: "O Reconhecimento Facial Pode Errar?", blocks: [
        { type: "paragraph", text: "O tempo todo. Ele se recusa a desbloquear quando deveria. Desiste com pouca luz. E, mais sério: alguns sistemas funcionaram visivelmente pior para certos grupos de pessoas, geralmente porque os rostos com que eles treinaram não eram diversos o bastante." },
        { type: "paragraph", text: "É exatamente por isso que nós, humanos, precisamos continuar testando isso, corrigindo e decidindo onde essa tecnologia deve e não deve ser usada." },
      ] },
      { title: "Teste Este Experimento Mental", blocks: [
        { type: "paragraph", text: "Imagine que você está projetando o sistema de desbloqueio facial. O que ele deveria fazer quando:" },
        { type: "list", items: [
          "O cômodo está completamente escuro?",
          "A pessoa está de óculos escuros?",
          "Alguém levanta uma foto do dono?",
          "Dois gêmeos idênticos tentam abrir o mesmo celular?",
          "A criança que configurou já tem três anos a mais?",
        ] },
        { type: "paragraph", text: "Cada um desses é um problema real que alguém teve que resolver, e as respostas brigam entre si. Precisão, segurança, justiça e privacidade nem sempre querem a mesma coisa." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Seu celular conhece o seu rosto como um padrão, não como uma pessoa. As câmeras e os sensores juntam os dados, o aprendizado de máquina decide o que conta como correspondência, e as regras de segurança tomam a decisão final de abrir ou não." },
        { type: "callout", accent: "teal", text: "Antes de deixar um aplicativo escanear o seu rosto, faça as duas perguntas que importam: para onde isso vai e quem pode ver?" },
      ] },
    ],
  },
  "why-does-autocorrect-make-weird-mistakes": {
    ...localizedBlogArticles.en["why-does-autocorrect-make-weird-mistakes"],
    title: "Por Que o Corretor Automático Comete Erros Estranhos?",
    category: "IA",
    readTime: common.pt.minutes.m4,
    imageAlt: "Estudantes em uma oficina de IA da Avanza STEM discutindo como funcionam os sistemas de previsão",
    imageCaption: "O corretor automático e a IA compartilham a mesma ideia central: os dois preveem o que deveria vir em seguida com base nos padrões da linguagem.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "O corretor automático é genuinamente útil quase sempre. Você digita 'pra' e ele vira 'para' caladinho. Você escreve a toda velocidade, some uma letra, e ninguém percebe." },
        { type: "paragraph", text: "E aí tem as outras vezes. Você vai mandar algo perfeitamente normal e o seu celular enfia uma palavra sem sentido e te deixa em situação ridícula. Por que ele faz isso? Porque o corretor automático está prevendo palavras. Ele não faz ideia do que você quis dizer." },
      ] },
      { title: "O Corretor Automático É uma Ferramenta de Previsão", blocks: [
        { type: "paragraph", text: "Ele pega o que você escreveu e adivinha a palavra que você queria. Você escreve 'definitvamente' e ele chega em 'definitivamente', porque as duas estão a duas teclas de distância." },
        { type: "paragraph", text: "Por baixo, ele roda várias perguntas ao mesmo tempo. Qual palavra real mais se parece com essa grafia? Qual palavra costuma vir depois da anterior? O que essa pessoa escreve o tempo todo? Qual é a frase mais provável aqui? Essas perguntas acertam constantemente. E, de vez em quando, erram de forma espetacular." },
      ] },
      { title: "Os Computadores Não Entendem Palavras Como as Pessoas", blocks: [
        { type: "paragraph", text: "Quando você lê a palavra 'cachorro', alguma coisa acontece na sua cabeça. Pelo, latido, um cachorro específico que você conhece, talvez um que já te derrubou. Você entende porque conviveu com cachorros." },
        { type: "paragraph", text: "O corretor automático não conviveu com nada. Ele nunca conheceu um cachorro, nunca entendeu uma piada, não faz ideia de por que o seu amigo escreve o nome dele daquele jeito. Ele vê letras e probabilidades. É por isso que ele sobrescreve com toda a confiança uma palavra que você escreveu certo. Ele não está te contradizendo. Só achou que outra palavra era mais provável." },
      ] },
      { title: "Nomes e Gírias Confundem o Corretor", blocks: [
        { type: "paragraph", text: "Os nomes acabam com ele. Seu amigo escreve o nome dele de um jeito incomum. Seu bairro ou seu time não estão no dicionário. O corretor vê algo que não reconhece e gentilmente troca por algo que reconhece, e assim o nome de uma pessoa vira um substantivo aleatório." },
        { type: "paragraph", text: "E aí tem tudo o que as pessoas inventam de propósito. Piadas internas, gírias, apelidos, uma palavra que o seu grupo criou mês passado. O corretor não tem categoria para nada disso, então ele achata o que você escreveu para a opção mais sem graça que encontrar." },
      ] },
      { title: "Por Que Ele Às Vezes Melhora?", blocks: [
        { type: "paragraph", text: "Talvez você tenha notado que o seu celular acaba desistindo e deixa você usar uma palavra. Isso porque muitos sistemas de correção automática se adaptam a você. Escreva o mesmo nome vezes suficientes e ele para de brigar." },
        { type: "paragraph", text: "É aprendizado de máquina fazendo o trabalho dele em escala pequena. Ele nota os seus hábitos e se ajusta. Também cria um modo de falha muito engraçado: cometa o mesmo erro de digitação vezes suficientes e o seu celular decide que aquele erro agora está certo." },
      ] },
      { title: "O Corretor Automático e a IA São Parentes", blocks: [
        { type: "paragraph", text: "O corretor automático não é um chatbot de IA, mas eles são primos. Os dois são máquinas de previsão. O corretor prevê uma palavra. Um chatbot prevê parágrafos inteiros. Nenhum dos dois entende a linguagem como você." },
        { type: "callout", accent: "teal", text: "Uma pessoa pode parar e perguntar \"espera, como assim?\". Ela capta o sarcasmo, o humor, o que você não disse. Um computador precisa inferir tudo isso a partir de padrões, e às vezes infere errado." },
      ] },
      { title: "Experimente", blocks: [
        { type: "paragraph", text: "Escreva uma frase ridícula cheia de palavras inventadas, nomes e gírias, e observe o que o seu celular tenta fazer com ela. Depois fique curioso: por que ele escolheu aquela substituição? Foi pela grafia? Por uma expressão comum? Por algo que você escreveu semana passada?" },
        { type: "paragraph", text: "Isso é cabeça de engenheiro. Não pare em \"deu errado\". Corra atrás do porquê." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "O corretor automático fica estranho porque prevê padrões em vez de entender significado. Ele te salva de erros de digitação, aprende as suas manias e, de vez em quando, afunda uma mensagem perfeitamente boa." },
        { type: "callout", accent: "teal", text: "O corretor automático é o assistente. Você é o editor. Leia uma vez antes de apertar enviar." },
      ] },
    ],
  },
  "what-happens-when-you-ask-ai-a-question": {
    ...localizedBlogArticles.en["what-happens-when-you-ask-ai-a-question"],
    title: "O Que Acontece Quando Você Faz Uma Pergunta à IA?",
    category: "IA",
    readTime: common.pt.minutes.m5,
    imageAlt: "Um estudante em uma oficina de IA da Avanza STEM digitando uma pergunta e lendo a resposta da IA",
    imageCaption: "O que acontece entre a sua pergunta e a resposta da IA é mais interessante do que parece. É tudo instrução, padrões e previsão.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Escrever para uma IA parece mandar mensagem para um robô rapidíssimo e muito lido. Você manda \"por que o céu é azul?\" e alguns segundos depois já tem uma explicação completa esperando. Mas o que aconteceu de verdade naquele intervalo?" },
        { type: "paragraph", text: "Nada lá dentro acordou para meditar sobre a sua pergunta. O que aconteceu foi um processo: instrução, treinamento, padrões, previsão. Vamos passo a passo." },
      ] },
      { title: "Passo 1: Você Dá uma Instrução à IA", blocks: [
        { type: "paragraph", text: "A instrução é o que você escreveu. Ela pode ser preguiçosa, como \"explique a gravidade\", ou pode dar algo com que trabalhar, como \"explique a gravidade para uma criança do terceiro ano usando um exemplo do parquinho\"." },
        { type: "callout", accent: "teal", text: "A segunda recebe uma resposta muito melhor, porque você disse para quem ela é e em torno do que construí-la. Uma instrução é como dar orientações a um colega de equipe. Orientações vagas, resultados vagos." },
      ] },
      { title: "Passo 2: A IA Destrincha as Suas Palavras", blocks: [
        { type: "paragraph", text: "A IA divide a sua instrução em pedaços e olha as palavras, a ordem em que chegaram e o formato que elas fazem juntas." },
        { type: "paragraph", text: "Digamos que você peça \"explique a fotossíntese para crianças\". Ela detecta três sinais. \"Explique\" significa que você quer ensino, não uma lista. \"Fotossíntese\" é o tema. \"Para crianças\" define o nível de leitura. Essas três pistas moldam tudo o que vem depois." },
      ] },
      { title: "Passo 3: A IA Usa o Que Aprendeu Durante o Treinamento", blocks: [
        { type: "paragraph", text: "Muito antes de você chegar, aquele modelo passou por um treinamento, o que significa que processou uma quantidade de texto de dar vertigem. Artigos, perguntas, respostas, explicações, histórias, código, tudo." },
        { type: "paragraph", text: "Ele não memorizou nada disso. Ele absorveu padrões. Quais palavras viajam juntas. Como uma boa explicação costuma ser construída. Quais fatos costumam aparecer lado a lado. Como cada estilo de escrita soa. É a esses padrões que ele recorre quando você pergunta algo que ele nunca viu." },
      ] },
      { title: "Passo 4: A IA Prevê uma Resposta", blocks: [
        { type: "paragraph", text: "Agora ela começa a escrever, e faz isso prevendo o que deve vir em seguida, pedaço por pedaço. Não existe uma resposta pronta em uma gaveta. Pergunte \"por que as plantas precisam de luz do sol?\" e ela prevê que uma boa resposta provavelmente inclui energia, alimento, folhas e fotossíntese, e constrói nessa direção." },
        { type: "paragraph", text: "É por isso que a mesma pergunta pode render uma linha, um texto longo, um poema, um questionário ou um guia numerado. Você está guiando a previsão." },
      ] },
      { title: "Passo 5: A Resposta Aparece", blocks: [
        { type: "paragraph", text: "O texto chega à sua tela parecendo polido e muito confiante. Não esqueça como ele foi fabricado." },
        { type: "paragraph", text: "Aquela resposta não veio de alguém que viveu algo, abriu um livro didático ou pesou o que realmente importa aqui. Veio de uma ferramenta montando padrões. Às vezes é exatamente o que você precisava. Às vezes precisa de uma segunda olhada." },
      ] },
      { title: "Por Que Instruções Claras Ajudam", blocks: [
        { type: "paragraph", text: "Instrução mais afiada, resposta mais afiada. Sempre. Troque \"me fale sobre robôs\" por \"explique a diferença entre robôs e IA para uma criança do quarto ano, com exemplos\". Troque \"ajuda com ciências\" por \"me dê três ideias de feira de ciências sobre ímãs usando coisas que eu tenho em casa\"." },
        { type: "paragraph", text: "Dê a ela um trabalho claro e ela fará um trabalho claro." },
      ] },
      { title: "Experimente", blocks: [
        { type: "paragraph", text: "Pergunte a mesma coisa de três jeitos e veja o que muda:" },
        { type: "list", items: [
          "Explique a eletricidade.",
          "Explique a eletricidade usando um exemplo de um tobogã aquático.",
          "Explique a eletricidade em cinco frases para uma criança do terceiro ano.",
        ] },
        { type: "paragraph", text: "Coloque as três respostas lado a lado. O tema nunca mudou. A sua instrução fez todo o trabalho." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Você dá uma instrução. A IA lê, se apoia em padrões do treinamento, prevê o que vem depois e monta uma resposta com isso. Parece que ela pensa. É previsão. O que a torna poderosa e também falível." },
        { type: "callout", accent: "teal", text: "A IA pode te entregar uma resposta. Entendê-la continua sendo o seu trabalho. Fique curioso, escreva instruções melhores e confira as respostas que contam." },
      ] },
    ],
  },
  "should-kids-trust-everything-ai-says": {
    ...localizedBlogArticles.en["should-kids-trust-everything-ai-says"],
    title: "As Crianças Devem Confiar em Tudo o Que a IA Diz?",
    category: "IA",
    readTime: common.pt.minutes.m5,
    imageAlt: "Estudantes em uma oficina de IA da Avanza STEM discutindo quando confiar e quando conferir as respostas da IA",
    imageCaption: "Saber quando confiar na IA e quando conferi-la é uma das habilidades mais importantes que os estudantes podem aprender nas oficinas de IA da Avanza STEM.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "A IA é útil mesmo. Ela desembaraça problemas de dever de casa, joga ideias para projetos, escreve histórias, responde perguntas à meia-noite e nunca se cansa de você perguntar de novo. É meio tutora, meio bibliotecária e meio parceira de chuva de ideias, tudo empilhado em uma coisa só." },
        { type: "paragraph", text: "Então você deveria acreditar em tudo? Não. Nem perto. Útil e correto são duas coisas diferentes, e é nesse intervalo que as pessoas se queimam." },
      ] },
      { title: "A IA Pode Soar Confiante Mesmo Estando Errada", blocks: [
        { type: "paragraph", text: "Esta é a parte traiçoeira. A IA nunca soa insegura. Ela responde com calma, usa palavras impressionantes, divide tudo em seções bem arrumadas com títulos. Parece algo escrito por alguém que definitivamente sabe." },
        { type: "callout", accent: "teal", text: "Uma resposta arrumada não é uma resposta certa. A IA confunde dados e às vezes os inventa por completo. Quando ela inventa assim, as pessoas chamam de alucinação." },
      ] },
      { title: "Pense Como Detetive", blocks: [
        { type: "paragraph", text: "Usar bem a IA significa agir como detetive. Um detetive não aceita a primeira pista do jeito que ela veio. Ele cutuca, procura provas que sustentem aquilo e vê se a história se mantém de pé." },
        { type: "paragraph", text: "Então, quando uma resposta chegar, rode esta lista:" },
        { type: "list", items: [
          "Isso faz sentido de verdade?",
          "De onde essa informação teria vindo?",
          "Consigo encontrar isso em algum lugar em que eu confio?",
          "Faz diferença se isso estiver errado?",
          "Essa aqui deveria passar por um adulto?",
        ] },
        { type: "paragraph", text: "O objetivo nunca é ter medo da IA. O objetivo é ser a pessoa mais esperta da conversa." },
      ] },
      { title: "Algumas Perguntas Pedem Mais Cuidado", blocks: [
        { type: "paragraph", text: "Um monte de resposta de IA não traz risco nenhum. Peça uma história ridícula sobre um dragão obcecado por panquecas e ninguém precisa conferir as panquecas. Vá se divertir." },
        { type: "paragraph", text: "Outros temas merecem cuidado de verdade. Reduza bastante a velocidade com qualquer coisa sobre:" },
        { type: "list", items: [
          "Saúde e segurança",
          "Dinheiro",
          "Notícias e acontecimentos atuais",
          "Trabalhos escolares em que a precisão importa",
          "Problemas pessoais",
          "Informação privada",
          "Qualquer coisa que possa afetar outra pessoa",
        ] },
        { type: "paragraph", text: "Em qualquer um desses, a IA pode ser um ponto de partida. Ela nunca deveria ser a sua única fonte." },
      ] },
      { title: "Pergunte a um Adulto de Confiança", blocks: [
        { type: "paragraph", text: "Quando algo que a IA disse não fechar, vá falar com uma pessoa de verdade. Um pai, uma mãe, um professor, uma bibliotecária, um treinador, quem quer que possa ajudar você a pensar em voz alta." },
        { type: "paragraph", text: "A IA sabe informação geral. Ela não sabe da sua vida, da sua família, da sua escola nem do que aconteceu ontem. Um adulto de confiança sabe. Isso faz muita diferença quando o conselho toca o seu corpo, os seus sentimentos, as suas amizades, a sua segurança ou uma decisão que você não pode desfazer." },
      ] },
      { title: "Não Compartilhe Informações Privadas", blocks: [
        { type: "paragraph", text: "Mais uma regra, e esta não é negociável. Informação privada fica fora do chat. Isso inclui:" },
        { type: "list", items: [
          "Seu nome completo",
          "Seu endereço de casa ou da escola",
          "Senhas",
          "Números de telefone",
          "Fotos pessoais",
          "Informações privadas da sua família",
          "Qualquer coisa que te deixaria desconfortável se estranhos vissem",
        ] },
        { type: "paragraph", text: "Cada aplicativo lida com as suas informações de um jeito bem diferente, e quase nunca dá para saber qual é qual olhando de fora. Se você não consegue ver para onde algo vai, não mande. Pergunte primeiro a um adulto." },
      ] },
      { title: "Bons Jeitos de as Crianças Usarem a IA", blocks: [
        { type: "paragraph", text: "Usada direito, essa coisa é uma vantagem real. Experimente pedir que ela:" },
        { type: "list", items: [
          "Explique um tema confuso com palavras mais simples",
          "Dê problemas de matemática para praticar",
          "Ajude a gerar ideias para projetos de ciências",
          "Faça perguntas para você antes de uma prova",
          "Sugira perguntas para fazer a um professor",
          "Ajude a organizar o roteiro de uma história",
          "Explique erros de programação",
          "Dê exemplos de como algo funciona",
        ] },
        { type: "paragraph", text: "A melhor coisa que você pode fazer com a IA não é copiar. É entender algo que você não entendia uma hora atrás. É essa a conquista inteira." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Não acredite em tudo o que a IA diz. Ela é útil, criativa, rápida e às vezes está redondamente errada, e entrega as quatro coisas exatamente com o mesmo tom de voz." },
        { type: "callout", accent: "teal", text: "As pessoas que usam bem a IA não acreditam nela automaticamente. Elas pensam, conferem e a contradizem. Trate a IA como ferramenta, não como chefe do seu cérebro." },
      ] },
    ],
  },
  "how-do-video-games-use-ai": {
    ...localizedBlogArticles.en["how-do-video-games-use-ai"],
    title: "Como os Videogames Usam IA?",
    category: "IA",
    readTime: common.pt.minutes.m5,
    imageAlt: "Uma cena de videogame com personagens e cenários movidos por regras de comportamento de IA que controlam movimento e tomada de decisão",
    imageCaption: "A IA dos jogos não é do tipo ficção científica. É um manual de regras que diz aos personagens quando perseguir, fugir, patrulhar ou reagir ao jogador.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Conhece aquele momento em que um inimigo te vê e sai correndo atrás? Ou quando o jogo fica mais difícil bem na hora em que você começa a melhorar? Nada disso é sorte. É IA, e ela está rodando no fundo de quase todo jogo em que você encosta." },
        { type: "paragraph", text: "A IA dos jogos move personagens, toma decisões, reage a você e monta o desafio. É o que faz um mundo parecer que notou a sua chegada. Mas não é a mesma coisa que a IA com que você conversa. Nos jogos, IA geralmente significa um conjunto de regras de comportamento que, somadas, dão algo que parece inteligente." },
      ] },
      { title: "O Que É a IA dos Jogos?", blocks: [
        { type: "paragraph", text: "A IA dos jogos é o que controla todos os personagens que você não está controlando. Inimigos, companheiros, animais, aldeões, monstros, corredores rivais, o lojista que repete a mesma fala sempre. Todos são NPCs, sigla para personagens não jogáveis, o que só significa que o jogo cuida deles em vez de uma pessoa." },
        { type: "paragraph", text: "A IA toma as decisões deles. O inimigo avança ou mantém a posição? Seu companheiro te segue no túnel? O carro rival freia antes daquela curva? O lojista levanta a cabeça quando você passa? Cada uma dessas coisas é uma regra que alguém escreveu." },
      ] },
      { title: "Movimento dos Inimigos", blocks: [
        { type: "paragraph", text: "O movimento é o clássico. Imagine um jogo de labirinto com um monstro te caçando. Esse monstro precisa atravessar o labirinto sem se trancar em um canto para sempre, o que significa que os projetistas dão a ele um algoritmo, um conjunto de instruções passo a passo para achar o caminho." },
        { type: "paragraph", text: "As regras podem ser surpreendentemente simples:" },
        { type: "list", items: [
          "Se o jogador estiver perto, persiga.",
          "Se o jogador estiver longe, patrulhe a área.",
          "Se houver uma parede, vire.",
          "Se a vida estiver baixa, fuja.",
          "Fique de olho em um baú do tesouro.",
        ] },
        { type: "paragraph", text: "Cinco regras assim e de repente o monstro parece estar caçando você de propósito." },
      ] },
      { title: "Decisões dos NPCs e Dificuldade", blocks: [
        { type: "paragraph", text: "Os NPCs também decidem coisas, e os bons lembram o que você fez. Um aldeão te agradece por algo que você fez duas horas atrás. Um guarda se recusa a sair do lugar porque você nunca achou a chave. Por baixo, o jogo só está checando condições: se isso aconteceu, então faça aquilo." },
        { type: "paragraph", text: "Alguns jogos também ajustam a dificuldade em silêncio enquanto você joga. Fácil demais e você enjoa. Difícil demais e você joga o controle longe. Então os inimigos aceleram, os enigmas apertam, ou aparece uma dica depois de você passar dez minutos travado na mesma sala. Eles estavam te gerenciando o tempo todo." },
      ] },
      { title: "A IA dos Jogos Pode Ser Simples ou Complexa", blocks: [
        { type: "paragraph", text: "Boa parte da IA dos jogos mal é IA. Um guarda andando de um lado para o outro em uma rota fixa. Um peixe nadando em círculo. Continua contando, continua fazendo um trabalho, mas não é exatamente um gênio." },
        { type: "paragraph", text: "Outros jogos vão até o fundo. Os personagens reagem ao som, à luz, a decisões que você tomou uma hora atrás, a um mundo que não para de mudar. Mas ninguém está atrás da inteligência máxima. Estão atrás de diversão, e esses não são o mesmo alvo." },
      ] },
      { title: "Por Que Não Fazer Inimigos Perfeitos?", blocks: [
        { type: "paragraph", text: "Se os projetistas conseguem deixar a IA inteligente, por que não fazer inimigos invencíveis? Porque esse jogo seria insuportável. Imagine um jogo de futebol em que o goleiro defende absolutamente tudo, ou um de corrida em que o computador nunca erra uma curva. Você fecha em quatro minutos." },
        { type: "callout", accent: "teal", text: "A boa IA de jogo é feita para te desafiar, não para te humilhar. Os projetistas a deixam pior do que poderia ser, de propósito. Os inimigos hesitam antes de atacar, erram de vez em quando, telegrafam o golpe grande. Tudo isso existe para você ter chance de reagir e melhorar." },
      ] },
      { title: "Tente Projetar a Sua Própria IA de Jogo", blocks: [
        { type: "paragraph", text: "Dá para fazer isso agora mesmo, sem escrever código. Você está projetando um monstro para um jogo de labirinto. Quais regras ele segue?" },
        { type: "list", items: [
          "Andar aleatoriamente até ver o jogador.",
          "Perseguir o jogador se ele estiver perto.",
          "Parar de perseguir depois de 10 segundos.",
          "Fugir se o jogador pegar um power-up.",
          "Ficar de olho em um baú do tesouro.",
        ] },
        { type: "paragraph", text: "Cinco regras e você já tem uma criatura com personalidade. Da próxima vez que jogar alguma coisa, pare para observar um NPC por trinta segundos. Veja se consegue deduzir quais regras ele está seguindo. Quando você começa a enxergar, não consegue mais parar." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Os jogos usam IA para cuidar de inimigos, NPCs, dificuldade e movimento. Pode ser um punhado de regras simples ou um sistema genuinamente complicado. Em qualquer caso, o trabalho dela é fazer o mundo reagir a você." },
        { type: "callout", accent: "teal", text: "A melhor IA de jogo quase nunca é a mais inteligente. É a que dá a melhor briga." },
      ] },
    ],
  },
  "is-a-robot-the-same-thing-as-ai": {
    ...localizedBlogArticles.en["is-a-robot-the-same-thing-as-ai"],
    title: "Um Robô É a Mesma Coisa Que IA?",
    category: "IA",
    readTime: common.pt.minutes.m4,
    imageAlt: "Um gráfico comparando um robô físico de um lado com um cérebro de IA ou rede neural do outro, mostrando que são coisas diferentes",
    imageCaption: "Um robô é uma máquina física. A IA é um software que aprende padrões. São coisas diferentes e nem sempre andam juntas.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Os filmes fizeram isso com a gente. Os robôs andam por aí, conversam, fazem planos e de vez em quando decidem dominar o planeta. Então é completamente razoável achar que robô e IA significam a mesma coisa." },
        { type: "paragraph", text: "Não significam. Um robô é uma máquina que faz coisas no mundo físico. A IA é um software que reconhece padrões e faz previsões. Às vezes eles se juntam. Mas um monte de robô não tem nada de IA, e quase toda IA nunca teve corpo na vida." },
      ] },
      { title: "O Que É um Robô?", blocks: [
        { type: "paragraph", text: "Um robô é uma máquina que detecta, se move ou faz um trabalho. Alguns lembram vagamente a gente. A maioria não lembra nada. Você provavelmente esteve perto de vários hoje:" },
        { type: "list", items: [
          "Um aspirador robô",
          "Um braço de fábrica que monta carros",
          "Um drone",
          "Um rover de Marte",
          "Um robô de brinquedo",
          "Uma máquina usada em cirurgias",
        ] },
        { type: "paragraph", text: "Os robôs trazem hardware físico: motores, rodas, braços, câmeras, sensores, garras. É esse o ponto inteiro. Um robô encosta no mundo real." },
      ] },
      { title: "O Que É IA?", blocks: [
        { type: "paragraph", text: "IA significa inteligência artificial, e quer dizer software que dá conta de tarefas que a gente achava que exigiam uma mente. Detectar padrões, prever o que vem depois, escrever texto, classificar imagens, traduzir idiomas, decidir qual vídeo você vê em seguida." },
        { type: "paragraph", text: "Nada disso precisa de corpo. Um chatbot vive inteiramente dentro do software. Ele pode escrever um texto sobre lápis para você e não consegue levantar um lápis, a não ser que alguém o conecte a um robô. A IA é a parte que decide. O robô é a parte que faz." },
      ] },
      { title: "O Que São Sensores e Motores?", blocks: [
        { type: "paragraph", text: "Os sensores são como uma máquina fica sabendo de alguma coisa. Você tem visão, audição e tato. Um robô tem uma câmera para ver, um microfone para ouvir, um sensor de contato para sentir uma batida, um sensor de distância para frear antes da parede, um termômetro para medir calor." },
        { type: "paragraph", text: "Os motores são como ele se move. Girar uma roda, levantar um braço, abrir uma garra, girar uma articulação. Se os sensores são os sentidos, os motores são os músculos. E, como músculos, eles não decidem nada sozinhos. Alguém precisa dizer o que fazer." },
      ] },
      { title: "Um Robô Sem IA", blocks: [
        { type: "paragraph", text: "Um monte de robô funciona praticamente sem IA. Imagine um robozinho perseguindo uma tira de fita preta pelo chão. Sensor de luz embaixo. Vê a linha, avança. Sai da linha, corrige." },
        { type: "paragraph", text: "Parece esperto. Não é. Ele está seguindo duas regras com sensores e motores, e vai seguir para sempre sem aprender absolutamente nada." },
      ] },
      { title: "IA Sem um Robô", blocks: [
        { type: "paragraph", text: "Agora ao contrário. Uma IA te ajuda a escrever um poema. Ela tem palavras, e só. Sem rodas, sem braços, sem câmera. Ela não consegue atravessar o cômodo, nem empilhar um bloco, nem te passar uma garrafa de água." },
        { type: "paragraph", text: "Isso é IA sem robô junto. Brilhante com informação, completamente presa no computador." },
      ] },
      { title: "Um Robô Com IA", blocks: [
        { type: "paragraph", text: "E aí tem a combinação, e um carro autônomo é o exemplo óbvio. Câmeras e sensores vigiam a estrada, as placas, as faixas, os outros carros, a pessoa prestes a descer da calçada. A IA transforma tudo isso em uma decisão sobre o que fazer no próximo meio segundo." },
        { type: "callout", accent: "teal", text: "Aqui o corpo e o cérebro enfim trabalham em equipe. O robô detecta, a IA decide, os motores agem. Esse ciclo roda centenas de vezes por segundo." },
      ] },
      { title: "Experimente", blocks: [
        { type: "paragraph", text: "Olhe em volta de onde você está agora. Encontre algo que seja um robô. Encontre algo que use IA. Encontre algo que seja só um computador fazendo coisa de computador." },
        { type: "list", items: [
          "Uma calculadora é uma ferramenta de computação, não IA.",
          "Um aspirador robô é um robô, e dos simples.",
          "Um assistente de voz é IA sem corpo.",
          "Uma impressora é uma máquina com partes móveis, mas ninguém realmente chama de robô.",
        ] },
        { type: "paragraph", text: "Encaixar as coisas nessas caixinhas é exatamente como os engenheiros pensam sobre tecnologia, e fica fácil rapidinho." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Um robô e uma IA são duas coisas diferentes. Um é uma máquina que se move pelo mundo físico. A outra é um software que encontra padrões e toma decisões. Junte os dois e você consegue algo impressionante. Separados, cada um continua útil." },
        { type: "callout", accent: "teal", text: "Da próxima vez que alguém se gabar de um \"robô inteligente\", faça a pergunta de três partes: qual parte é o robô, qual é a IA e quais sensores estão alimentando isso?" },
      ] },
    ],
  },
  "how-do-robots-know-where-they-are": {
    ...localizedBlogArticles.en["how-do-robots-know-where-they-are"],
    title: "Como os Robôs Sabem Onde Estão?",
    category: "Robótica",
    readTime: common.pt.minutes.m5,
    imageAlt: "Um robô usando câmeras e sensores para escanear e mapear o ambiente em volta para navegar",
    imageCaption: "Os robôs constroem uma imagem do ambiente usando câmeras, lidar e software de mapeamento, e a atualizam constantemente enquanto se movem.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Tente andar pelo corredor da sua escola de olhos fechados. Você aguenta quatro ou cinco passos antes de raspar em uma parede, em uma carteira ou na mochila de alguém. Se mover pelo espaço sem se machucar exige, no fim das contas, um fluxo constante de pistas." },
        { type: "paragraph", text: "Os robôs estão presos ao mesmo problema, só que começam do zero. Um robô não sabe onde está. Ele precisa deduzir com sensores, câmeras, contagem de rodas, mapas e muita matemática. Junte pistas, faça a melhor estimativa, mova-se e confira a estimativa de novo." },
      ] },
      { title: "Os Robôs Também Precisam de Sentidos", blocks: [
        { type: "paragraph", text: "Você tem visão, audição, tato e equilíbrio. Um robô tem sensores, e cada um detecta exatamente um tipo de coisa. Uns medem distância, outros captam objetos, outros acompanham a velocidade, outros descobrem para onde algo está apontando." },
        { type: "list", items: [
          "Câmeras: para ver paredes, caminhos, pessoas, placas ou obstáculos",
          "Rodas: para medir quanto o robô já percorreu",
          "GPS: para estimar a localização ao ar livre",
          "Lidar: para escanear a área com luz laser",
          "Sensores ultrassônicos: para rebater ondas de som nos objetos",
          "Giroscópios: para detectar giros ou inclinações",
        ] },
        { type: "paragraph", text: "Nenhum sensor sozinho conta a história inteira. A câmera detecta uma porta. O contador de rodas diz que você andou um metro e meio. O sensor de distância insiste que há uma parede bem ali. Empilhe tudo e uma posição começa a aparecer." },
      ] },
      { title: "Contar as Voltas das Rodas", blocks: [
        { type: "paragraph", text: "O truque mais simples do livro é contar voltas de roda. Saia da porta da sala, conte três metros de giros e você pode afirmar que está a três metros da porta. Os engenheiros chamam isso de odometria. Você faz exatamente a mesma coisa quando conta os seus passos no escuro." },
        { type: "callout", accent: "green", text: "Mas e se uma roda patinar em um piso escorregadio? E se o chão for inclinado? Um erro de um centímetro vira um erro de meio metro depois de voltas suficientes. Esse desvio é exatamente por que um robô nunca confia em um sensor só." },
      ] },
      { title: "Usar Câmeras Como Olhos", blocks: [
        { type: "paragraph", text: "As câmeras deixam um robô enxergar em volta. Um aspirador distingue pés de cadeira e rodapés. Um carro autônomo lê faixas e semáforos. Um rover de Marte estuda rochas e desvia de terreno que engoliria uma roda." },
        { type: "paragraph", text: "Mas uma câmera não vê como você vê. Você olha para uma cadeira e simplesmente sabe. Um robô recebe uma grade de pixels coloridos e precisa deduzir bordas, formas, sombras e padrões antes de conseguir chamar aquilo de cadeira. Depois a luz muda. Depois alguma coisa se coloca na frente. Depois alguém vira a cadeira e a silhueta é outra. Cada um desses casos precisa ser treinado." },
      ] },
      { title: "Construir um Mapa", blocks: [
        { type: "paragraph", text: "Os robôs bons vão desenhando enquanto andam. Um aspirador começa em um cômodo desconhecido e aos poucos descobre onde estão as paredes, onde está o sofá e quais caminhos ficam livres. Com esse mapa, ele para de quicar feito pinball e passa a limpar em linhas eficientes." },
        { type: "paragraph", text: "Você faz exatamente a mesma coisa em um prédio novo. No primeiro dia você anda perdido. No terceiro você já sabe que a escada fica ao lado da entrada, a quadra no fim do corredor, a biblioteca virando a esquina. Os robôs constroem o mesmo mapa mental, só que com sensores e código no lugar da memória." },
        { type: "callout", accent: "green", text: "A versão mais difícil é fazer as duas coisas ao mesmo tempo: desenhar o mapa enquanto descobre onde você está dentro do mapa que ainda está desenhando. Duas incógnitas, um problema, e um dos grandes enigmas da robótica." },
      ] },
      { title: "Por Que os Robôs Ainda se Perdem", blocks: [
        { type: "paragraph", text: "Eles se perdem o tempo todo. Uma roda patina. Um sensor cospe lixo. Alguém move o sofá. A luz apaga. Uma sacola acaba na frente da câmera. Dois corredores parecem idênticos e o robô escolhe o errado." },
        { type: "paragraph", text: "É por isso que um robô nunca faz um palpite e se casa com ele. Ele confere de novo, e de novo, atualizando a estimativa toda vez que chega informação nova. Que é exatamente o que você faz andando por um museu, olhando placas, conferindo o mapa, olhando em volta, corrigindo." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Os robôs encontram a própria posição juntando pistas e combinando tudo. Câmeras, contagem de rodas, GPS, lasers, sensores de movimento. Tudo alimenta uma única estimativa viva de onde estou e para onde vou em seguida." },
        { type: "callout", accent: "green", text: "Da próxima vez que você vir um robô atravessar um cômodo, lembre que ele não está só rolando. Ele está detectando, estimando, conferindo e corrigindo, várias vezes por segundo, o caminho inteiro." },
      ] },
    ],
  },
  "why-robots-are-bad-at-easy-human-tasks": {
    ...localizedBlogArticles.en["why-robots-are-bad-at-easy-human-tasks"],
    title: "Por Que os Robôs Têm Dificuldade com Tarefas Fáceis?",
    category: "Robótica",
    readTime: common.pt.minutes.m5,
    imageAlt: "Um robô se atrapalhando para realizar uma tarefa física simples que uma pessoa faria sem esforço e sem pensar",
    imageCaption: "Tarefas que levam uma fração de segundo para uma pessoa, como pegar uma camiseta amassada, podem exigir anos de engenharia para um robô só chegar perto.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Dobrar roupa não é nada. Você pega uma camiseta, sacode, acha as mangas, dobra, pronto. Provavelmente estava pensando em outra coisa o tempo inteiro." },
        { type: "paragraph", text: "Para um robô, dobrar roupa é quase um pesadelo. O mesmo vale para abrir uma porta, pegar um brinquedo do chão, amarrar um cadarço ou servir cereal sem espalhar pela bancada. Esses estão entre os problemas em aberto mais difíceis da robótica." },
        { type: "paragraph", text: "O que é estranho, porque os robôs montam carros, dirigem em Marte e arremessam peças que esmagariam uma pessoa. Então, como uma meia derrota um robô? Porque o mundo real não fica parado nem mantém a forma." },
      ] },
      { title: "Os Humanos São Melhores do Que a Gente Imagina", blocks: [
        { type: "paragraph", text: "Seu corpo faz coisas ridículas o tempo todo e nunca se gaba delas. Você estica a mão para pegar um lápis e na hora sabe onde ele está, mais ou menos quanto pesa, com que força apertar e como posicionar os dedos, mesmo que ele esteja de lado, meio embaixo de um caderno e pendurado na beira da mesa." },
        { type: "paragraph", text: "Um robô precisa moer cada um desses passos. Ver o lápis. Deduzir que o lápis é um objeto separado da mesa em que está. Escolher onde segurar. Planejar um caminho de braço que não derrube a garrafa de água. Apertar o suficiente para levantar e não a ponto de quebrar. São cinco problemas difíceis para um lápis só." },
        { type: "callout", accent: "green", text: "Você faz parecer sem esforço porque passou anos ligando olhos, mãos, músculos e cérebro. Um robô começa esse treinamento do zero." },
      ] },
      { title: "Coisas Moles São Difíceis", blocks: [
        { type: "paragraph", text: "Qualquer coisa flexível é o pior dia de um robô. Uma camiseta se recusa a ter uma forma só. Ela dobra, amontoa, torce e desaba em um bolo que não parece nada com uma camiseta. Uma toalha se dobra sobre si mesma. Uma meia se esconde dentro de outra meia como se fizesse de propósito." },
        { type: "paragraph", text: "Objetos rígidos são bem mais gentis. Um bloco de metal continua sendo um bloco. Uma caixa de plástico tem bordas que dá para achar. Uma caneca parece uma caneca. O tecido muda de forma toda vez que se mexe, então um robô não pode simplesmente decorar como uma camiseta é. Ele precisa entender como o tecido se comporta, e esse é um problema genuinamente brutal." },
      ] },
      { title: "Abrir Portas Não É Tão Simples", blocks: [
        { type: "paragraph", text: "Conte as portas que você abriu esta semana. Maçanetas redondas, alavancas, portas de correr, barras de empurrar, puxadores, portas corta-fogo pesadíssimas, telas que batem atrás de você. Todas diferentes." },
        { type: "paragraph", text: "Você chega e simplesmente sabe o que fazer. Um robô precisa localizar a maçaneta, deduzir para onde ela se move, alinhar a garra, aplicar a força certa e dar um passo para trás ou para a frente enquanto puxa ou empurra. Empurre quando era para puxar e falhou. Segure em um ângulo levemente errado e falhou. Dois segundos da sua vida são o projeto de pesquisa de outra pessoa." },
      ] },
      { title: "O Mundo Não Fica Parado", blocks: [
        { type: "paragraph", text: "Os robôs de fábrica são incríveis em repetir porque o mundo deles nunca muda. A peça aparece no mesmo lugar, no mesmo segundo, toda vez. O braço roda o mesmo movimento. Nada surpreende ninguém." },
        { type: "paragraph", text: "Sua casa é o oposto de uma fábrica. A mochila está no chão hoje e na cadeira amanhã. O brinquedo está de cabeça para baixo. O cachorro se mexeu. Se o seu lápis rolar para baixo de uma cadeira, você se abaixa, empurra a cadeira, contorna uma sacola e pega, sem tomar uma única decisão consciente. Esse tipo de improviso continua sendo uma das maiores paredes da robótica." },
      ] },
      { title: "Pegar Coisas Exige Julgamento", blocks: [
        { type: "paragraph", text: "Você ajusta a sua pegada automaticamente e nunca pensou nisso. Um ovo recebe uma mão completamente diferente da de um martelo. Um copo de papel recebe dedos diferentes dos de uma bola de beisebol. Pressão diferente, pontos de contato diferentes, tudo diferente." },
        { type: "paragraph", text: "Um robô precisa acertar isso de propósito. Suave demais e o objeto cai. Forte demais e ele quebra. Segure pelo lado errado e ele torce na garra. E piora quando o objeto é brilhante, transparente, mole, minúsculo, pesado, de formato estranho ou já está se movendo. É por isso que as garras são um dos campos mais movimentados de toda a indústria." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Os robôs são extraordinários. O mundo em que eles precisam operar é extraordinariamente bagunçado. O que é fácil para você é fácil porque você é absurdamente bom em detectar, equilibrar, tocar, ajustar e aprender com cada erro que já cometeu." },
        { type: "callout", accent: "green", text: "Então, da próxima vez que você dobrar uma camiseta, abrir uma porta ou tirar algo de uma sacola, dê um segundo de crédito a si mesmo. Os engenheiros ainda estão tentando alcançar as suas mãos." },
      ] },
    ],
  },
  "what-makes-a-robot-a-robot": {
    ...localizedBlogArticles.en["what-makes-a-robot-a-robot"],
    title: "O Que Faz de um Robô um Robô?",
    category: "Robótica",
    readTime: common.pt.minutes.m4,
    imageAlt: "Um robô com sensores, motores e articulações visíveis, ilustrando os três componentes essenciais: detectar, processar, agir",
    imageCaption: "Um robô precisa detectar o ambiente, processar essa informação e agir fisicamente. Os três juntos definem o que faz de uma máquina um robô.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Teste rápido. Torradeira: robô? Carrinho de controle remoto? Máquina de vendas? Caixa de som inteligente? Aspirador robô? A maioria das pessoas responde essas cinco de jeitos diferentes, o que já diz que a palavra anda bem solta." },
        { type: "paragraph", text: "Aqui está a linha de verdade. Um robô detecta o mundo, decide algo e age de acordo. Isso significa que quase todos têm três partes: sensores, um controlador e atuadores. Ou, em bom português: nota, pensa, se move." },
      ] },
      { title: "Parte 1: Os Sensores Ajudam os Robôs a Notar", blocks: [
        { type: "paragraph", text: "Um robô não consegue reagir a um mundo que não consegue detectar, então primeiro ele precisa de sensores. Cada um capta um tipo de sinal:" },
        { type: "list", items: ["Luz", "Distância", "Som", "Toque", "Temperatura", "Movimento", "Direção", "Cor", "Pressão"] },
        { type: "paragraph", text: "Um aspirador robô usa esses sensores para achar paredes, desviar de degraus e detectar sujeira. Um carro autônomo usa para acompanhar a pista, as placas, outros carros e pessoas. Um braço de fábrica usa para confirmar que a peça está mesmo onde deveria. Tire os sensores e um robô vira uma pessoa tentando atravessar um cômodo sem visão, sem audição e sem tato." },
      ] },
      { title: "Parte 2: Os Controladores Ajudam os Robôs a Decidir", blocks: [
        { type: "paragraph", text: "O controlador é onde as decisões acontecem. Não é exatamente um cérebro. É mais a parte que executa as instruções, e essas instruções podem ser quase risíveis de tão simples ou bem avançadas." },
        { type: "paragraph", text: "Um robô segue uma única regra: se o sensor vir uma parede, vire à esquerda. Outro combina uma câmera, um mapa que ele mesmo construiu e um programa de rotas para escolher o caminho mais seguro por um cômodo cheio de coisas. Os controladores vão de um chip do tamanho de uma unha a um processador sério. Em qualquer caso, o trabalho é o mesmo. Leia os sensores, escolha o que acontece em seguida." },
        { type: "callout", accent: "green", text: "Detectar. Decidir. Agir. Esse ciclo de três passos roda repetidamente, e talvez seja a ideia mais importante de toda a robótica." },
      ] },
      { title: "Parte 3: Os Atuadores Ajudam os Robôs a se Mover", blocks: [
        { type: "paragraph", text: "Os atuadores são as partes que de fato fazem alguma coisa. Os motores são os mais comuns. Eles giram rodas, movem braços, giram engrenagens, abrem garras, rodam articulações." },
        { type: "paragraph", text: "Um braço de fábrica tem um motor em cada articulação. Uma mão robótica pode usar motores minúsculos ou puxar cabos como tendões. Um drone tem quatro motores girando hélices só para ficar no ar. Tire os atuadores e você tem uma máquina que detecta tudo, decide tudo e não faz absolutamente nada." },
      ] },
      { title: "Um Robô Precisa Parecer uma Pessoa?", blocks: [
        { type: "paragraph", text: "De jeito nenhum, e este é o mito que os filmes plantaram na cabeça de todo mundo. Não é preciso ter rosto. Não é preciso ter braços, pernas nem olhos. A forma segue o trabalho, sempre." },
        { type: "list", items: [
          "Um aspirador pequeno", "Um rover", "Um braço mecânico", "Um drone", "Um submarino", "Um carrinho de entrega", "Uma máquina dentro de uma fábrica",
        ] },
        { type: "callout", accent: "green", text: "Todo bom projeto de robô começa com uma pergunta: o que essa coisa precisa fazer de verdade? Responda e a forma, os sensores e o movimento saem sozinhos." },
      ] },
      { title: "Um Carrinho de Controle Remoto É um Robô?", blocks: [
        { type: "paragraph", text: "Geralmente não, e eis o porquê. Você está tomando cada decisão. Você dirige, ele vira. Isso é uma máquina te obedecendo. Mas coloque um sensor nesse mesmo carrinho e deixe que ele desvie de um obstáculo sozinho, e ele acabou de cruzar a linha. A tomada de decisão é a linha. Uma máquina que só segue ordens é uma máquina. Um robô decide pelo menos um pouco por conta própria." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Um robô não é só uma máquina que se move. Ele junta informação com sensores, processa instruções com um controlador e age por meio de atuadores. Não é preciso rosto humano nem voz. Por baixo de tudo, um único ciclo:" },
        { type: "callout", accent: "green", text: "Detectar. Decidir. Agir. Todo o resto da robótica é uma variação dessas três palavras." },
      ] },
    ],
  },
  "how-mars-rovers-drive-without-a-driver": {
    ...localizedBlogArticles.en["how-mars-rovers-drive-without-a-driver"],
    title: "Como os Rovers de Marte Dirigem Sem Motorista?",
    category: "Robótica",
    readTime: common.pt.minutes.m5,
    imageAlt: "Um rover de Marte navegando pelo terreno rochoso e avermelhado da superfície marciana sem motorista humano, guiado por câmeras e software de bordo",
    imageCaption: "Os rovers de Marte dirigem sozinhos porque um sinal vindo da Terra leva até 24 minutos em um só sentido. Não há tempo para um humano reagir aos obstáculos.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Agora mesmo, enquanto você lê isto, existem robôs rodando por Marte. Eles atravessam a superfície de outro planeta, estudam rochas, tiram fotos e mandam tudo de volta. Ninguém está ao volante. Não há um astronauta por perto com um controle. Não há ninguém naquele planeta, ponto." },
        { type: "paragraph", text: "Então, como um rover dirige sozinho? Tudo se resume a distância, câmeras, rodas, planejamento cuidadoso e uma quantidade quase irracional de paciência." },
      ] },
      { title: "Marte Está Muito Longe", blocks: [
        { type: "paragraph", text: "Marte está a milhões de quilômetros, e os sinais de rádio, por mais rápidos que sejam, levam tempo real para atravessar esse vão. Dependendo de onde os dois planetas estão nas órbitas, uma mensagem pode levar vários minutos em cada direção." },
        { type: "paragraph", text: "Então ninguém está dirigindo isso como um videogame. Imagine o rover indo em direção a uma rocha em que ele não deveria encostar. Um engenheiro na Terra nem vai ver o problema por dez minutos, e o comando de parada leva outros dez para voltar. A essa altura o rover já está preso há vinte minutos." },
      ] },
      { title: "O Rover Recebe Instruções", blocks: [
        { type: "paragraph", text: "Um rover não acorda e escolhe uma direção. Aqui na Terra, equipes revisam as imagens e os dados que ele mandou durante a noite, estudam a paisagem e escolhem alvos que valham a viagem. Uma rocha interessante. Uma faixa de solo. Uma crista. Uma rota que não engula uma roda." },
        { type: "paragraph", text: "Depois eles enviam um plano: dirija até este ponto, fotografe aquilo, perfure aqui, rode este instrumento. Mas, por causa do atraso, o plano não consegue cobrir tudo. O rover precisa dar conta de surpresas sozinho." },
      ] },
      { title: "As Câmeras São os Olhos do Rover", blocks: [
        { type: "paragraph", text: "Os rovers são cobertos de câmeras, e cada conjunto tem um trabalho. Umas olham para a frente para planejar os próximos metros. Outras vigiam o solo logo abaixo das rodas. Outras tiram panorâmicas amplas. E outras fazem aproximações para os cientistas estudarem uma rocha sem nunca encostar nela." },
        { type: "paragraph", text: "Essas imagens também são como ele detecta problemas: uma pedra grande, uma inclinação forte, um buraco, areia em que ele poderia afundar. Marte não é um estacionamento. É poeira, pedras, cristas e crateras, e um rover atolado fica atolado para sempre." },
      ] },
      { title: "Rodas Projetadas Para Outro Planeta", blocks: [
        { type: "paragraph", text: "As rodas de um rover são feitas para um terreno que ninguém testou pessoalmente. Elas precisam escalar rochas, sacudir a poeira, carregar o rover inteiro e sobreviver a um frio brutal sem nenhuma manutenção, nunca." },
        { type: "paragraph", text: "Furou o pneu da sua bicicleta? Alguém conserta. Rachou uma roda em Marte? Engenheiros em outro planeta redesenham o jeito de o rover dirigir para contornar o dano. É exatamente por isso que os rovers se movem tão devagar e com tanto cuidado. Ninguém está atrás de recorde de velocidade. Estão atrás de continuar explorando." },
      ] },
      { title: "O Rover Consegue Evitar Alguns Problemas", blocks: [
        { type: "paragraph", text: "Os rovers rodam navegação autônoma, ou seja, dirigem parte do trajeto sozinhos. A Terra diz: vá até aquele ponto. No caminho, o rover confere a própria câmera. Se detectar uma rocha feia ou uma inclinação de que não gosta, ele contorna ou simplesmente para e espera." },
        { type: "callout", accent: "green", text: "Nada disso é pensar. É código fazendo uma listinha de perguntas repetidamente. O caminho está livre? Aquilo é um obstáculo? Consigo contornar? Paro e chamo a base?" },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Um rover de Marte dirige sem motorista combinando instruções vindas da Terra, câmeras que leem o terreno, rodas feitas para um planeta hostil e software que sabe a hora de frear. Não dá para dirigir ao vivo porque o universo é grande demais para isso." },
        { type: "paragraph", text: "Cada giro lento daquelas rodas é parte de algo maior: explorar um lugar onde nenhum ser humano jamais pisou." },
      ] },
    ],
  },
  "why-robot-hands-are-so-hard-to-make": {
    ...localizedBlogArticles.en["why-robot-hands-are-so-hard-to-make"],
    title: "Por Que as Mãos dos Robôs São Tão Difíceis de Fazer?",
    category: "Robótica",
    readTime: common.pt.minutes.m5,
    imageAlt: "Uma mão robótica mecânica mostrando as articulações dos dedos e os sensores, tentando reproduzir a versatilidade de uma mão humana",
    imageCaption: "Uma mão humana consegue segurar uma uva sem amassar e uma barra de peso sem soltar. Reproduzir esse alcance em um robô é um dos problemas mais difíceis da engenharia.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Pare e olhe para a sua mão. Abra. Feche. Toque o polegar em cada ponta de dedo, em ordem. Pegue um lápis, tamborile na mesa e depois segure alguma coisa como se ela pudesse quebrar. Você acabou de executar movimentos que laboratórios inteiros ainda tentam copiar." },
        { type: "paragraph", text: "As mãos estão entre as coisas mais difíceis de toda a engenharia. As mãos robóticas ficam impressionantes em vídeo, e fazer com que elas realmente funcionem como a sua é brutalmente difícil. Uma mão não é uma garra. Ela é flexível, sensível, forte, delicada e ligada direto a um cérebro muito bom." },
      ] },
      { title: "Os Dedos São Complicados", blocks: [
        { type: "paragraph", text: "Sua mão é lotada de partes móveis. Cada dedo tem várias articulações. Seu polegar se move em uma direção que os outros não conseguem, que é exatamente por que você consegue pinçar qualquer coisa. Seu punho gira, dobra e se ajusta para dar a tudo isso o ângulo certo." },
        { type: "paragraph", text: "Para copiar isso, uma mão robótica precisa de articulações, motores, engrenagens, cabos, materiais que dobrem direito e um sistema de controle que coordene tudo junto. Fazer um único dedo se mover com suavidade já é um projeto. Fazer cinco cooperarem é outro nível completamente." },
      ] },
      { title: "A Força da Pegada É Complicada", blocks: [
        { type: "paragraph", text: "Você nunca decide o quanto apertar. Simplesmente acontece. Uma batata frita recebe quase nada. A alça de uma mochila cheia recebe um punho. Um lápis fica no meio do caminho, e você chegou lá sem um único pensamento." },
        { type: "paragraph", text: "Um robô precisa calcular. Aperte demais e ele amassa o que pegou. Aperte de menos e escorrega. Segure pelo lado errado e o objeto se solta no meio do caminho. E cada objeto é um problema diferente, porque um copo liso, uma bola de tênis felpuda, uma esponja molhada e uma colher de metal se comportam de jeitos diferentes na mesma garra." },
      ] },
      { title: "O Tato Importa", blocks: [
        { type: "paragraph", text: "Sua mão é forrada de sensores. Pressão, textura, temperatura, deslizamento, dor. Quando um copo começa a escorregar, você sente e aperta antes de perceber conscientemente que alguma coisa estava acontecendo." },
        { type: "paragraph", text: "As mãos robóticas também precisam desse retorno, e imitar o tato humano é extremamente difícil. O robô precisa saber se está encostando no objeto, com que força está pressionando, se a coisa está escorregando, se é mole ou rígida e se está prestes a partir tudo ao meio. Sem isso, a mão está chutando. Chutar significa coisas caídas e quebradas." },
      ] },
      { title: "As Mãos Humanas São Boas com Objetos Estranhos", blocks: [
        { type: "paragraph", text: "Pense no alcance. Uma moeda, um sanduíche, uma garrafa de água, um cadarço, uma bola de basquete, uma bola de papel amassado. Nenhum se parece com os outros. Uns são minúsculos, outros enormes, uns escorregadios, e alguns literalmente mudam de forma assim que você encosta. Sua mão dá conta de todos sem reclamar." },
        { type: "paragraph", text: "As mãos robóticas amam o previsível. Dê a uma delas um único tipo de peça para levantar em uma fábrica e ela vai fazer isso melhor que qualquer humano, para sempre. Mas uma mão que consiga segurar quase qualquer coisa que você passar? Isso ainda é um problema em aberto." },
      ] },
      { title: "As Mãos Robóticas Nem Sempre Precisam Parecer Humanas", blocks: [
        { type: "paragraph", text: "E aqui vem a virada: a melhor mão robótica muitas vezes não se parece nada com uma mão. Algumas são garras de dois dedos. Outras são ventosas. Outras são tentáculos de borracha macia que se enrolam no que tocam. Algumas são só um ímã, porque as peças são de aço e um ímã funciona perfeitamente." },
        { type: "callout", accent: "green", text: "Os engenheiros escolhem o projeto pelo trabalho, não pela anatomia. Uma mão robótica deve combinar com o problema que enfrenta, não com o formato do que você tem na ponta do braço." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "As mãos robóticas são difíceis porque segurar é difícil. Uma mão útil precisa de movimento, força, delicadeza, tato, controle preciso e a capacidade de lidar com objetos moles, escorregadios, minúsculos ou com formato de nada em particular." },
        { type: "paragraph", text: "Suas mãos são tão boas nisso que você parou de notar completamente. Cada cadarço que você amarra, cada saco que você abre com um puxão, cada bola que você pega no ar é um movimento que os engenheiros ainda estão perseguindo. É isso que faz deste um dos problemas mais interessantes da robótica." },
      ] },
    ],
  },
  "how-factory-robots-build-cars": {
    ...localizedBlogArticles.en["how-factory-robots-build-cars"],
    title: "Como os Robôs de Fábrica Montam Carros?",
    category: "Robótica",
    readTime: common.pt.minutes.m5,
    imageAlt: "Braços robóticos em uma linha de montagem de carros soldando e montando painéis de carroceria com precisão",
    imageCaption: "Os robôs de fábrica não são de uso geral. Cada braço é programado com precisão para uma tarefa específica, executada milhares de vezes sem variação.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Um carro é milhares de peças fingindo ser um objeto só. Portas, bancos, rodas, vidros, quilômetros de fio, luzes, um motor e uma quantidade enorme de peças que você nunca vai ver, a menos que algo dê errado. Juntar tudo isso é um trabalho gigantesco." },
        { type: "paragraph", text: "Então as fábricas modernas entregam a velocidade, a força, a precisão e a repetição aos robôs. Quase nenhum se parece com uma pessoa. A maioria parece braços mecânicos enormes parafusados no chão, movendo-se com uma exatidão meio perturbadora." },
      ] },
      { title: "Os Robôs de Fábrica São Excelentes em Repetição", blocks: [
        { type: "paragraph", text: "Fazer a mesma coisa com perfeição, de novo e de novo, é o único trabalho em que os robôs realmente ganham da gente. Montar carros é cheio disso. A mesma peça, colocada igual, soldada no mesmo ponto, milhares de vezes. Um braço robótico acerta essa marca sempre. Ele não fica entediado, não se distrai numa sexta-feira, não esquece o passo quatro." },
        { type: "callout", accent: "green", text: "Se uma solda vai em um ponto exato de cada chassi, o robô coloca ali. O carro um e o carro nove mil saem idênticos." },
      ] },
      { title: "Soldar a Carroceria do Carro", blocks: [
        { type: "paragraph", text: "A soldagem é a grande. Ela usa calor para fundir peças de metal em uma estrutura só, e a carroceria de um carro precisa ser forte o bastante para proteger pessoas em uma batida. Os braços de solda se movem rápido, acertam as mesmas coordenadas toda vez e alcançam cantos onde uma pessoa teria que se contorcer." },
        { type: "paragraph", text: "Nada disso roda sozinho. Engenheiros, técnicos e trabalhadores projetam os sistemas, programam, monitoram, consertam e inspecionam os resultados. O robô faz o movimento repetido. As pessoas são donas do processo." },
      ] },
      { title: "Pintar com Precisão", blocks: [
        { type: "paragraph", text: "Pintar parece fácil até você tentar. Tinta demais e escorre. Tinta de menos e a cobertura fica fina e fraca. A camada precisa ficar uniforme em um capô curvo, um teto plano e uma porta com uma dobra. Os robôs conseguem porque varrem a pistola com o mesmo padrão controlado, na mesma distância, toda vez, e o seu braço não consegue." },
      ] },
      { title: "Mover Peças Pesadas", blocks: [
        { type: "paragraph", text: "As peças de carro ficam pesadas rápido. Os robôs levantam, carregam e posicionam sem esforço. Um braço encaixa uma porta no lugar. Outro sistema leva peças pela linha. Carregar algo pesado e desajeitado quatrocentas vezes por turno destrói corpos humanos, então aqui o robô está protegendo pessoas, não substituindo." },
      ] },
      { title: "Segurança e Programação", blocks: [
        { type: "paragraph", text: "Essas máquinas são fortes e rápidas, o que faz da segurança um problema de engenharia por si só. Quase todos os robôs industriais ficam dentro de áreas cercadas, com sensores e luzes de aviso, e o braço desliga no instante em que uma pessoa cruza a linha. As máquinas novas chamadas cobots, ou robôs colaborativos, trazem sistemas de segurança extras para poderem trabalhar bem ao lado das pessoas." },
        { type: "paragraph", text: "E nenhum robô chega sabendo montar um carro. Alguém programa cada movimento: para onde ir, com que velocidade, quando acionar a ferramenta, quanta força aplicar e o que fazer no instante em que algo dá errado. O chão de uma fábrica são robôs, esteiras, câmeras, ferramentas e pessoas coreografados em um processo longuíssimo." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Os robôs de fábrica soldam, pintam, carregam peças e repetem movimentos precisos até o turno acabar. Eles não têm forma humana porque nunca foi essa a intenção. Um robô de solda e um de pintura parecem completamente diferentes porque estão resolvendo problemas completamente diferentes." },
        { type: "callout", accent: "green", text: "Essa é a lição de verdade de uma fábrica de carros. Você não projeta um robô para ele ficar bonito. Projeta para matar um problema específico. Faça isso algumas centenas de vezes e milhares de peças soltas viram algo que sai dirigindo." },
      ] },
    ],
  },
  "why-is-the-sky-blue-but-sunsets-are-orange": {
    ...localizedBlogArticles.en["why-is-the-sky-blue-but-sunsets-are-orange"],
    title: "Por Que o Céu É Azul mas o Pôr do Sol É Alaranjado?",
    category: "Ciências",
    readTime: common.pt.minutes.m4,
    imageAlt: "Um céu que passa do azul profundo no alto para tons quentes de laranja e rosa perto do horizonte no fim da tarde",
    imageCaption: "A mesma atmosfera que espalha a luz azul pelo céu do dia redireciona tons mais quentes até os seus olhos no fim da tarde.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Olhe para cima às duas da tarde e o céu está azul. Olhe de novo três horas depois e esse mesmo céu está pegando fogo em laranja, vermelho e rosa." },
        { type: "paragraph", text: "Nada foi trocado. Mesmo sol, mesmo ar, você parado no mesmo quintal. A única coisa diferente é o caminho que a luz do sol faz até os seus olhos, e acontece que isso muda tudo." },
      ] },
      { title: "A Luz do Sol Não É de Uma Cor Só", blocks: [
        { type: "paragraph", text: "A luz do sol parece branca, mas essa cor é mentirosa. Na verdade são todas as cores ao mesmo tempo, apertadas em um único feixe. Um arco-íris que ainda não foi desembrulhado." },
        { type: "paragraph", text: "Vermelho, laranja, amarelo, verde, azul, índigo, violeta. Cada um viaja como onda, e as ondas não têm o mesmo tamanho. O vermelho e o laranja têm ondas longas e preguiçosas. O azul e o violeta têm ondas curtas e apertadas. Essa diferença de tamanho é a razão inteira de o céu fazer o que faz." },
      ] },
      { title: "O Ar Não Está Vazio", blocks: [
        { type: "paragraph", text: "O céu parece que não tem nada lá em cima. Na verdade ele é cheio de moléculas, pequenas demais para enxergar, e a luz do sol está batendo nelas sem parar no caminho todo para baixo." },
        { type: "paragraph", text: "Quando a luz encontra uma dessas moléculas, parte dela é espalhada, o que só significa que ela quica em uma direção nova em vez de seguir reto. E aqui está a chave: as ondas curtas se espalham muito mais facilmente do que as longas. O azul quica. O vermelho, na maior parte, segue em frente." },
        { type: "paragraph", text: "Então, durante o dia, a luz azul é jogada por toda a atmosfera e depois chega aos seus olhos de todas as direções ao mesmo tempo. Quando você olha um céu vazio, não está vendo o sol. Está vendo luz azul espalhada chegando de todo lado." },
      ] },
      { title: "Por Que o Céu Não É Roxo?", blocks: [
        { type: "paragraph", text: "Ótima pergunta, porque o violeta se espalha ainda mais que o azul. Três coisas jogam contra ele. O sol emite menos violeta para começar, parte é absorvida no alto da atmosfera, e os seus olhos são simplesmente muito mais sensíveis ao azul do que ao violeta." },
        { type: "paragraph", text: "O violeta está lá em cima fazendo a parte dele. O azul só ganha a votação." },
      ] },
      { title: "O Que Muda no Fim da Tarde?", blocks: [
        { type: "paragraph", text: "No fim da tarde o sol baixa, então a luz dele não chega mais até você em linha reta de cima. Ela chega de lado, o que significa atravessar um trecho muito mais longo de atmosfera para te alcançar." },
        { type: "paragraph", text: "Imagine uma lanterna apontada para baixo através de um copo de água contra a mesma lanterna apontada de lado, ao longo do copo. Muito mais material para atravessar. Nesse caminho longo, quase todo o azul é espalhado para outro lado antes de chegar em você. O que sobrevive à viagem é vermelho, laranja e amarelo, que é exatamente o que você vê." },
      ] },
      { title: "Por Que Alguns Fins de Tarde São Mais Coloridos?", blocks: [
        { type: "paragraph", text: "Existem fins de tarde esquecíveis e existem aqueles que fazem o bairro inteiro parar para pegar o celular. A diferença geralmente é o que está flutuando lá em cima. Poeira, gotas de água, fumaça e poluição mudam como a luz quica." },
        { type: "paragraph", text: "As nuvens também funcionam como telas de projeção. Com o sol baixo, a luz vermelha e laranja bate na parte de baixo das nuvens e as acende. É por isso que os melhores fins de tarde aparecem logo depois de uma tempestade, quando o ar está limpo e ainda sobraram nuvens rondando." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "O céu é azul porque o azul se espalha com facilidade e chega até você de todas as direções. O fim de tarde fica laranja porque a luz em ângulo baixo atravessa tanto ar que o azul é arrancado antes de chegar." },
        { type: "callout", accent: "orange", text: "Então um céu azul e um pôr do sol selvagem são a mesma física em configurações diferentes. Você está vendo a luz do sol negociar com a atmosfera em tempo real." },
      ] },
    ],
  },
  "why-do-your-ears-pop-on-an-airplane": {
    ...localizedBlogArticles.en["why-do-your-ears-pop-on-an-airplane"],
    title: "Por Que Seus Ouvidos Tampam no Avião?",
    category: "Ciências",
    readTime: common.pt.minutes.m4,
    imageAlt: "Uma vista de dentro da cabine de um avião durante a subida, ilustrando a mudança de pressão que faz os ouvidos estalarem",
    imageCaption: "Os tímpanos se flexionam quando a pressão do ar externa muda mais rápido do que o seu corpo consegue equilibrar. É esse o estalo que você sente na decolagem e no pouso.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Você conhece a sensação. O avião começa a subir, seus ouvidos entopem e tudo soa abafado como se tivessem enfiado algodão neles, e então, do nada: poc." },
        { type: "paragraph", text: "É desconfortável e meio assustador na primeira vez. Seus ouvidos não têm nada de errado. Eles estão resolvendo um problema de pressão do único jeito que conhecem." },
      ] },
      { title: "O Ar Tem Pressão", blocks: [
        { type: "paragraph", text: "O ar parece nada, mas há uma coluna inteira empilhada acima da sua cabeça pressionando você neste momento. No nível do mar essa coluna é alta e pesada, então a pressão é alta. Suba e há menos ar em cima, então a pressão cai." },
        { type: "paragraph", text: "Um avião decolando está te levando para um ar mais rarefeito. Pousar te traz de volta ao ar denso. As cabines são pressurizadas para ninguém desmaiar, mas a pressão lá dentro ainda muda enquanto você sobe e desce. Seus ouvidos definitivamente notam." },
      ] },
      { title: "Seu Tímpano Sente a Diferença", blocks: [
        { type: "paragraph", text: "Seu tímpano é uma película fina de tecido esticada pelo seu canal auditivo, e ela vibra quando o som bate. É assim que ouvir funciona. Agora o importante: há ar dos dois lados. Ar externo no canal, e uma bolsa vedada de ar atrás, no seu ouvido médio." },
        { type: "paragraph", text: "Tudo parece normal quando esses dois lados estão equilibrados. Mas, quando a pressão de fora cai rápido, o ar atrás do seu tímpano não acompanhou, então ele empurra para fora e estica a película. Esse esticão é a sensação entupida, cheia e meio horrível." },
      ] },
      { title: "A Tuba Auditiva Ajuda a Resolver", blocks: [
        { type: "paragraph", text: "Seu corpo já vem com a solução instalada. É um canal estreito chamado tuba auditiva, que vai do seu ouvido médio até o fundo da garganta. Ele fica quase sempre fechado. Engula, boceje ou masque algo e ele abre por um segundo." },
        { type: "paragraph", text: "Nesse segundo, o ar entra ou sai e os dois lados se igualam. Essa liberação é o poc. Seu corpo acabou de equalizar a pressão e você sentiu acontecer." },
      ] },
      { title: "Por Que o Pouso Pode Ser Pior Que a Decolagem", blocks: [
        { type: "paragraph", text: "O pouso costuma doer mais, e há um motivo. Na descida, a pressão da cabine sobe, então agora o lado de fora empurra mais forte que o de dentro e o seu ouvido médio precisa puxar ar para acompanhar." },
        { type: "paragraph", text: "Se as suas tubas auditivas ficarem teimosas, os tímpanos afundam para dentro em vez de equilibrar, e esse beliscão dói de verdade. Também é por isso que voar gripado é uma tortura. Nariz e garganta entupidos significam que esses canais quase não abrem." },
      ] },
      { title: "Por Que Engolir ou Bocejar Ajuda", blocks: [
        { type: "paragraph", text: "Engolir e bocejar movem os músculos bem ao lado desses canais, e é isso que os abre. Por isso mascar chiclete, beber água em goles ou forçar um bocejo durante a decolagem e o pouso funciona. Você está acionando na mão um sistema que o seu corpo normalmente roda sozinho." },
        { type: "paragraph", text: "Também é por isso que os bebês choram nos aviões. Eles sentem a pressão, não fazem ideia do que é e não conseguem resolver de propósito. O choro move a garganta e a boca deles, e destampa os ouvidos de qualquer jeito. Eles resolveram o problema por acidente." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Seus ouvidos estalam porque a pressão do ar muda mais rápido do que o seu ouvido médio consegue acompanhar. O tímpano leva a tensão e as tubas auditivas equilibram tudo de novo." },
        { type: "callout", accent: "orange", text: "Aquele pequeno poc é o seu corpo rodando um ajuste de pressão. Sensação estranha, engenharia excelente." },
      ] },
    ],
  },
  "why-does-metal-feel-colder-than-wood": {
    ...localizedBlogArticles.en["why-does-metal-feel-colder-than-wood"],
    title: "Por Que o Metal Parece Mais Frio Que a Madeira?",
    category: "Ciências",
    readTime: common.pt.minutes.m4,
    imageAlt: "Objetos de metal e de madeira lado a lado em temperatura ambiente, ilustrando que eles parecem diferentes mesmo estando na mesma temperatura",
    imageCaption: "Metal e madeira na mesma temperatura parecem completamente diferentes porque o metal conduz o calor da sua mão muito mais rápido. A sensação é velocidade, não temperatura.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Vá encostar no pé de uma cadeira de metal e depois em uma mesa de madeira no mesmo cômodo. O metal parece frio. A madeira quase parece morna. Agora a parte que quebra a cabeça das pessoas: os dois estão na mesma temperatura. Os dois passaram o dia inteiro naquele cômodo." },
        { type: "paragraph", text: "Então, o que você está sentindo de verdade? Não é temperatura. É velocidade." },
      ] },
      { title: "Sua Mão Está Quente", blocks: [
        { type: "paragraph", text: "Você é a coisa mais quente de quase todo cômodo em que entra. Sua pele fica lá pelos 32 °C enquanto o cômodo está mais perto de 21 °C. Encoste em qualquer coisa mais fria que você e o calor começa a sair na hora da sua mão para aquele objeto." },
        { type: "paragraph", text: "E aqui vem a virada. Seus nervos não conseguem medir a temperatura de um objeto. Eles só conseguem medir a que velocidade o calor está escapando da sua pele. Escape rápido, o seu cérebro reporta frio. Escape lento, o seu cérebro dá de ombros." },
      ] },
      { title: "O Metal Move o Calor Rapidamente", blocks: [
        { type: "paragraph", text: "O metal é um condutor térmico fantástico, ou seja, o calor o atravessa quase sem resistência. Encoste nele e o calor do seu corpo não só entra no metal, como continua correndo para longe do ponto de contato. Esse ponto nunca esquenta, então o calor continua saindo de você. Sua pele esfria rápido e o seu cérebro grita frio." },
        { type: "paragraph", text: "A madeira é péssima em conduzir calor e, neste caso, péssima é ótimo. O calor se arrasta para dentro da madeira e fica quase todo bem embaixo dos seus dedos. Aquele pedacinho esquenta até igualar a sua mão em segundos e, quando iguala, o dreno para. Mesma temperatura do metal, experiência completamente diferente." },
      ] },
      { title: "Mesma Temperatura, Sensação Diferente", blocks: [
        { type: "paragraph", text: "Este é um dos melhores truques de ciência do dia a dia que existem: o que algo parece e em que temperatura ele está são dois fatos separados. Uma colher de metal e uma de madeira na mesma gaveta estão em temperaturas idênticas. Pegue uma depois da outra e você vai jurar que não." },
        { type: "callout", accent: "orange", text: "Seu tato não é um termômetro. É um detector de fluxo de calor. Duas coisas exatamente na mesma temperatura podem parecer radicalmente diferentes conforme a velocidade com que tiram calor de você." },
      ] },
      { title: "Por Que Isso Importa no Projeto?", blocks: [
        { type: "paragraph", text: "Os engenheiros usam isso o tempo todo. Uma frigideira de metal é ótima justamente porque o calor a atravessa da boca do fogão até a comida. Infelizmente o calor também sobe pelo cabo, e é por isso que quase toda frigideira tem uma pegada de plástico, borracha ou madeira parafusada na ponta." },
        { type: "paragraph", text: "Um casaco de inverno faz o trabalho oposto. Ele prende ar, o ar é péssimo em mover calor, e assim o calor do seu corpo fica com você. Enquanto isso, um escorregador de metal em pleno verão vira um perigo, porque o metal enfia calor em você com a mesma eficiência com que tira. Um banco de madeira sob o mesmo sol fica de boa." },
      ] },
      { title: "E no Frio?", blocks: [
        { type: "paragraph", text: "Segure um corrimão de metal em pleno inverno e dói de verdade. Não é porque o metal está mais frio que a madeira ao lado dele. É porque o metal arranca o calor da sua pele tão rápido que os seus nervos registram aquilo como dor. O metal não está mais frio. Ele só é melhor em roubar de você." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "O metal parece mais frio porque move o calor para longe de você mais rápido. A madeira parece mais morna porque não faz isso. Então, da próxima vez que você disser que algo está frio, saiba o que está realmente reportando: não uma temperatura, mas a velocidade com que o calor está saindo da sua mão." },
      ] },
    ],
  },
  "why-do-bikes-stay-balanced-when-moving": {
    ...localizedBlogArticles.en["why-do-bikes-stay-balanced-when-moving"],
    title: "Por Que a Bicicleta Se Equilibra Quando Está em Movimento?",
    category: "Ciências",
    readTime: common.pt.minutes.m5,
    imageAlt: "Uma pessoa pedalando uma bicicleta em movimento, demonstrando o equilíbrio e a física que mantêm duas rodas estáveis em movimento",
    imageCaption: "Uma bicicleta em movimento resiste à inclinação graças às forças giroscópicas, à geometria da direção e às pequenas correções constantes do seu cérebro, todas trabalhando juntas de forma invisível.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "No papel, uma bicicleta não tinha por que ficar em pé. Duas rodas magrinhas, um quadro estreito e uma pessoa em cima de tudo isso. Tente se equilibrar em uma sem se mover e você vai ao chão em segundos. Comece a rolar e de repente não custa nada." },
        { type: "paragraph", text: "Então, o que muda? Não é uma coisa só. Movimento, direção, geometria do quadro e o seu cérebro fazendo correções que você nunca nota, tudo empilhado." },
      ] },
      { title: "Equilíbrio É Manter o Centro Sobre as Rodas", blocks: [
        { type: "paragraph", text: "Tudo tem um centro de massa, o único ponto em que todo o peso se equilibra. Para você e a bicicleta continuarem em pé, esse ponto combinado precisa ficar sobre a linha das rodas. Deixe que ele se desloque demais para um lado e a gravidade assume." },
        { type: "paragraph", text: "Parado, você quase não tem como consertar isso. Dá para sacudir o guidão, jogar o peso ou colocar um pé no chão. Rolando, você tem uma opção muito melhor: virar as rodas de volta para debaixo de você." },
      ] },
      { title: "As Bicicletas Viram Para o Lado da Queda", blocks: [
        { type: "paragraph", text: "Aqui está a parte genuinamente estranha. Quando a bicicleta começa a cair para a esquerda, a roda dianteira vira para a esquerda. Não para o lado contrário da queda, para dentro da queda. E isso traz a bicicleta inteira de volta para debaixo do seu centro de massa, o que te coloca de pé de novo." },
        { type: "paragraph", text: "Você faz isso o tempo todo e não faz ideia. A cada segundo que você rola, seus braços estão fazendo correções de direção pequenas demais para sentir. Seu cérebro, seus braços e a bicicleta estão rodando um ciclo de equilíbrio juntos, e nada disso chega à sua mente consciente." },
      ] },
      { title: "As Rodas Também Ajudam", blocks: [
        { type: "paragraph", text: "As rodas girando têm momento angular, ou seja, elas resistem a mudar de direção. Isso dá alguma estabilidade extra a uma bicicleta em movimento. Mas não é o principal. Já construíram bicicletas que cancelam completamente o efeito giroscópico e elas continuam se equilibrando. A geometria do quadro faz mais trabalho que as rodas." },
      ] },
      { title: "O Projeto da Bicicleta Facilita o Equilíbrio", blocks: [
        { type: "paragraph", text: "Olhe o garfo dianteiro de qualquer bicicleta. Ele é inclinado para a frente, não reto de cima a baixo. Esse ângulo cria algo chamado trail, e o trail é o que faz a roda dianteira querer se alinhar com a direção em que a bicicleta vai. É a mesma razão de a rodinha de um carrinho de supermercado girar sozinha para te seguir." },
        { type: "paragraph", text: "Os engenheiros se obcecam com isso. Mude alguns graus no ângulo do garfo ou troque o tamanho da roda e a mesma bicicleta passa de estável e calma a nervosa e respondona." },
      ] },
      { title: "Por Que É Mais Difícil Andar Devagar?", blocks: [
        { type: "paragraph", text: "Ir devagar tira as suas opções. Menos velocidade significa que virar o guidão faz menos efeito, então cada inclinação demora mais para ser corrigida e cada balanço cresce antes de você conseguir pegar. É por isso que ir em linha reta em velocidade de caminhada é genuinamente difícil, e por isso um iniciante nervoso de repente se sente firme assim que pedala um pouco mais forte." },
      ] },
      { title: "Por Que uma Bicicleta Não Fica em Pé Sozinha?", blocks: [
        { type: "paragraph", text: "Porque uma bicicleta parada não consegue se virar de volta para debaixo de nada. Ela começa a inclinar, a gravidade puxa mais forte, e não há movimento disponível para deslocar as rodas para o lado e salvar a situação. Sem descanso, parede, pé ou rodinhas, ela vai ao chão." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Uma bicicleta em movimento fica em pé porque a direção, o impulso, as rodas girando, a geometria do quadro e as suas próprias correções minúsculas estão todos trabalhando o problema ao mesmo tempo." },
        { type: "callout", accent: "orange", text: "Você não está se equilibrando em uma bicicleta. Você está caindo um pouquinho em todas as direções e se segurando, centenas de vezes por minuto, sem nunca notar. É isso que é andar de bicicleta de verdade." },
      ] },
    ],
  },
  "why-do-we-slip-on-ice": {
    ...localizedBlogArticles.en["why-do-we-slip-on-ice"],
    title: "Por Que a Gente Escorrega no Gelo?",
    category: "Ciências",
    readTime: common.pt.minutes.m4,
    imageAlt: "Um close de uma superfície congelada mostrando a textura lisa e brilhante que reduz drasticamente o atrito sob os pés",
    imageCaption: "O gelo é escorregadio porque uma fina camada quase líquida na superfície reduz o atrito a quase zero, então os seus sapatos quase não têm em que se agarrar.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Calçada: problema nenhum. Gelo: traição total. Em um segundo você está andando normal, no outro o seu pé foi embora sem você, seus braços estão fazendo algo desesperado e você está negociando com a física." },
        { type: "paragraph", text: "Então, o que torna o gelo tão pior que todo o resto? Tudo se resume a atrito, à própria superfície, à temperatura e ao que acontece no vão finíssimo entre o seu sapato e o chão." },
      ] },
      { title: "O Atrito Ajuda Você a Andar", blocks: [
        { type: "paragraph", text: "O atrito é a força que briga contra o deslizamento, e andar funciona inteiramente por causa dele. A cada passo você empurra para trás contra o chão e o atrito te empurra para a frente. Sem atrito não há empurrão, não há caminhada. Seu pé simplesmente vai embora." },
        { type: "paragraph", text: "O asfalto seco é áspero em uma escala que você não enxerga, e toda essa aspereza dá à sua sola onde morder. O gelo é liso nessa mesma escala, então não há nada para morder." },
      ] },
      { title: "O Gelo Tem uma Superfície Escorregadia", blocks: [
        { type: "paragraph", text: "O gelo parece um bloco sólido, mas a superfície em si se comporta de um jeito estranho. Em muitas condições existe um filme incrivelmente fino de água em cima, e é esse filme que transforma o ruim em catastrófico." },
        { type: "paragraph", text: "Então o seu sapato não está agarrando um chão sólido. Está deslizando sobre gelo liso em cima de uma camada microscópica de água fazendo exatamente o trabalho que o óleo faz dentro de um motor. A natureza está te lubrificando de propósito." },
      ] },
      { title: "A Temperatura Importa", blocks: [
        { type: "paragraph", text: "Nem todo gelo quer te derrubar do mesmo jeito. O gelo perto do ponto de fusão é o pior, porque aquela camada aguada se forma com facilidade. O gelo muito frio, aquele que range sob os pés, pode até escorregar menos, porque há menos líquido em cima." },
        { type: "paragraph", text: "Não leia isso como seguro. O gelo frio também vai te derrubar. A temperatura só muda o jeito como isso acontece." },
      ] },
      { title: "Os Sapatos Também Importam", blocks: [
        { type: "paragraph", text: "Seus sapatos são metade da equação. Uma sola lisa e gasta não tem com o que trabalhar. Um desenho profundo crava na neve e em superfícies irregulares e compra aderência, que é exatamente por que as botas de inverno têm padrões agressivos moldados embaixo. Mas seja honesto: em gelo realmente liso, até as boas botas perdem. Simplesmente não há em que se agarrar." },
      ] },
      { title: "Por Que a Gente Desliza Tão Rápido?", blocks: [
        { type: "paragraph", text: "Pouco atrito significa que quase nada segura o seu pé depois que ele começa. No asfalto, um escorregãozinho morre no atrito em dois ou três centímetros. No gelo, o escorregão continua e continua, e uma perda minúscula de equilíbrio vira uma viagem inteira não planejada." },
      ] },
      { title: "O Gelo É um Desafio de Projeto", blocks: [
        { type: "paragraph", text: "Existem profissões inteiras brigando com isso. Equipes de estrada, urbanistas, engenheiros de pneus, projetistas de botas, gente que constrói superfícies esportivas. O sal derrete o gelo. A areia joga aspereza por cima. Os pneus abrem canais para tirar água e lama do ponto de contato. Ferramentas diferentes, um único objetivo: recuperar alguma aderência." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Você escorrega no gelo porque o gelo quase não tem atrito. A superfície lisa, aquele filme de água, a temperatura e o que você tem nos pés decidem quanta aderência você recebe." },
        { type: "callout", accent: "orange", text: "Andar é um truque de atrito que você faz desde que tinha um ano. O gelo é a única superfície que se recusa a cumprir a parte dela do trato." },
      ] },
    ],
  },
  "how-do-noise-canceling-headphones-work": {
    ...localizedBlogArticles.en["how-do-noise-canceling-headphones-work"],
    title: "Como Funcionam os Fones com Cancelamento de Ruído?",
    category: "Ciências",
    readTime: common.pt.minutes.m5,
    imageAlt: "Um par de fones com cancelamento de ruído com um diagrama mostrando como as ondas antirruído cancelam as ondas sonoras que chegam",
    imageCaption: "Os fones com cancelamento de ruído usam um microfone para detectar o som que chega e depois reproduzem exatamente a onda oposta para cancelá-lo antes que ele alcance os seus ouvidos.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Coloque um bom fone com cancelamento de ruído em uma cabine de avião rugindo e aperte o botão. O barulho do motor não some aos poucos. Ele desaparece, de uma vez, como se alguém tivesse desligado o mundo da tomada. A primeira vez que isso acontece é genuinamente esquisito." },
        { type: "paragraph", text: "Não é o acolchoamento grosso fazendo o trabalho. Aqueles fones estão brigando contra o som com mais som, e funciona por causa de como as ondas se comportam." },
      ] },
      { title: "O Som É uma Onda", blocks: [
        { type: "paragraph", text: "Som é ar sendo empurrado para lá e para cá. Alguém fala, as cordas vocais vibram, e essas vibrações empurram e puxam o ar até formar ondas que atravessam o cômodo e sacodem os seus tímpanos." },
        { type: "paragraph", text: "Cada onda sonora tem cristas e vales, como uma linha ondulada se movendo pelo ar. Sons altos têm ondas grandes. Sons baixos têm ondas pequenas." },
      ] },
      { title: "Ondas Opostas Podem se Cancelar", blocks: [
        { type: "paragraph", text: "Agora a parte que torna tudo isso possível. Duas ondas podem se somar e ficar mais fortes, mas também podem brigar. Se uma empurra o ar para a frente no exato instante em que a outra puxa para trás, elas se cancelam. Crista contra vale e não sobra nada." },
        { type: "paragraph", text: "É esse o truque inteiro. Os fones geram uma onda que é o espelho perfeito do ruído que vem na sua direção. As duas se encontram ao lado do seu ouvido e se apagam quase por completo. Os cientistas chamam isso de interferência destrutiva." },
      ] },
      { title: "Os Fones Primeiro Escutam", blocks: [
        { type: "paragraph", text: "Antes de cancelar qualquer coisa, eles precisam ouvir. Microfones minúsculos na parte de fora de cada concha captam o que houver em volta de você: o zumbido do motor, o chacoalhar do trem, o ar-condicionado. A eletrônica lá dentro analisa essa onda e constrói a oposta em uma fração de milissegundo. Depois os mesmos alto-falantes que tocam a sua música tocam baixinho o antirruído." },
        { type: "paragraph", text: "Você nunca escuta esse antirruído como som. Você só escuta o ruído original ficar pequenininho." },
      ] },
      { title: "Por Que Eles Funcionam Melhor com Sons Constantes", blocks: [
        { type: "paragraph", text: "Sons constantes e zumbidos são o alvo fácil. Motores de avião, ventiladores, ar-condicionado, o chacoalhar de um trem. Eles se repetem, então são fáceis de prever, e prever é quase a batalha inteira." },
        { type: "paragraph", text: "Sons repentinos são um pesadelo. Um cachorro latindo, uma palma, alguém gritando o seu nome. Quando o sistema termina de analisar, o som já chegou ao seu ouvido. Então os fones abaixam um pouco e deixam o resto passar. É por isso que o mundo fica mais silencioso e nunca fica totalmente mudo." },
      ] },
      { title: "Cancelamento de Ruído Passivo x Ativo", blocks: [
        { type: "paragraph", text: "Duas coisas diferentes acontecem ao mesmo tempo. A redução passiva é física: almofadas grossas vedando contra a sua cabeça, bloqueando som à moda antiga. O cancelamento ativo é o sistema de microfone e onda oposta. Os bons fones fazem os dois, e é essa combinação que transforma uma cabine de avião em uma biblioteca." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Os fones com cancelamento de ruído escutam o barulho à sua volta, constroem o oposto exato e tocam isso dentro do seu ouvido. As duas ondas se encontram, se cancelam, e um bom pedaço do ruído deixa de existir." },
        { type: "callout", accent: "orange", text: "Não são protetores de ouvido chiques. São engenheiros de som minúsculos amarrados na sua cabeça, rodando a matemática milhares de vezes por segundo." },
      ] },
    ],
  },
  "why-do-some-things-float-and-others-sink": {
    ...localizedBlogArticles.en["why-do-some-things-float-and-others-sink"],
    title: "Por Que Algumas Coisas Flutuam e Outras Afundam?",
    category: "Ciências",
    readTime: common.pt.minutes.m4,
    imageAlt: "Estudantes experimentando flutuação e água em uma oficina de ciências da Avanza STEM",
    imageCaption: "Flutuar não é só uma questão de ser leve. Tem a ver com peso, forma e quanta água é deslocada.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Jogue uma pedra em um lago e acabou. Jogue uma bola de praia e ela volta quicando. Certo, faz sentido. Agora me explique o navio de carga de aço de 200.000 toneladas parado em cima da mesma água. Aço não flutua. Só que aparentemente flutua." },
        { type: "paragraph", text: "A palavra para o que está acontecendo aqui é empuxo e, assim que a ficha cai, o navio deixa de ser estranho." },
      ] },
      { title: "A Água Empurra Para Cima", blocks: [
        { type: "paragraph", text: "A água não é uma coisa passiva onde você joga objetos. Ela empurra de volta. Coloque qualquer coisa na água e a água a empurra para cima, e esse empurrão tem nome: força de empuxo. Enquanto isso, a gravidade puxa para baixo. Quem ganhar decide tudo. O empuxo dá conta de igualar o peso? Flutua. A gravidade ganha? Vai para o fundo." },
      ] },
      { title: "Os Objetos Empurram a Água do Caminho", blocks: [
        { type: "paragraph", text: "Aqui fica interessante. Qualquer coisa que você coloca na água precisa empurrar água para o lado para abrir espaço. Esse empurrão se chama deslocamento e, quanto mais água você desloca, com mais força a água empurra de volta. Ou seja, a forma não é um detalhe. A forma é o jogo inteiro." },
      ] },
      { title: "A Densidade É uma Grande Pista", blocks: [
        { type: "paragraph", text: "A densidade é quanta matéria está apertada em um determinado espaço. Uma pedra é densa: muita matéria enfiada em pouco volume. Uma bola de isopor não: quase só ar com um pouco de plástico segurando tudo. Mais denso que a água, você geralmente afunda. Menos denso, geralmente flutua. Geralmente. A forma pode virar o jogo inteiro." },
      ] },
      { title: "Por Que um Navio de Aço Consegue Flutuar?", blocks: [
        { type: "paragraph", text: "O aço é muito mais denso que a água, e uma bola maciça de aço afunda como a pedra. Mas um navio não é aço maciço. É uma casca fina de aço envolvendo um volume enorme de ar, e essa forma desloca uma quantidade brutal de água." },
        { type: "paragraph", text: "Conte o ar e a densidade média do navio fica abaixo da densidade da água. É esse o truque legal, e por isso ele flutua. Abra um buraco no casco e a água substitui o ar. A densidade média passa da água. E aí o navio vai para baixo, exatamente como a pedra." },
      ] },
      { title: "Por Que os Navios Têm Fundos Largos?", blocks: [
        { type: "paragraph", text: "Porque largo significa mais água deslocada, e mais água deslocada significa um empurrão maior para cima. Uma canoa, um cargueiro e um navio de cruzeiro não se parecem em nada, mas cada um desses cascos foi moldado em torno da mesma matemática de flutuação. Quem projeta algo que flutua está equilibrando peso, forma, estabilidade e materiais ao mesmo tempo." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "As coisas flutuam quando a água empurrando para cima consegue igualar o peso puxando para baixo. A densidade te leva parte do caminho. A forma decide o resto." },
        { type: "callout", accent: "orange", text: "Uma pedrinha afunda porque é densa e quase não desloca nada. Um navio de cruzeiro flutua porque a forma dele joga um oceano de água para o lado. Flutuar nunca foi sobre ser leve. É sobre quanta água você consegue tirar do caminho." },
      ] },
    ],
  },
  "why-do-magnets-stick-to-some-metals-but-not-others": {
    ...localizedBlogArticles.en["why-do-magnets-stick-to-some-metals-but-not-others"],
    title: "Por Que os Ímãs Grudam em Alguns Metais e em Outros Não?",
    category: "Ciências",
    readTime: common.pt.minutes.m5,
    imageAlt: "Um ímã atraindo limalha de ferro que se alinha e revela as linhas do campo magnético invisível que sai dos polos",
    imageCaption: "Os ímãs grudam no ferro e no aço porque os pequenos domínios magnéticos dentro desses metais se alinham com o campo externo. No cobre ou no alumínio, eles não conseguem.",
    sections: [
      { title: "", blocks: [
        { type: "paragraph", text: "Os ímãs parecem ter uma regra só. Eles grudam na geladeira, pegam clipes, se prendem no metal. Fácil. Depois você encosta um no papel-alumínio, ou em uma moeda, ou em uma lata de refrigerante, e não acontece absolutamente nada. Tudo isso é metal. E aí?" },
        { type: "paragraph", text: "A resposta está acontecendo bem lá embaixo, no nível das partículas dentro do material." },
      ] },
      { title: "Os Ímãs Têm Campos Invisíveis", blocks: [
        { type: "paragraph", text: "Todo ímã é cercado por um campo que você não vê mas consegue sentir. Aproxime-o de um clipe e o clipe pula. Aproxime-o de outro ímã e você sente o empurrão invisível antes de eles se tocarem. Esse campo é mais forte nas pontas, os polos, que chamamos de norte e sul." },
        { type: "paragraph", text: "Opostos se atraem, iguais se repelem. Vire um ímã e os mesmos dois objetos passam de se agarrar a brigar. Mesmos ímãs, comportamento oposto, e a única coisa que mudou foi a direção." },
      ] },
      { title: "Nem Todo Metal É Magnético", blocks: [
        { type: "paragraph", text: "A grande confusão é achar que metal significa magnético. Não é verdade. O ferro é fortemente magnético. O aço geralmente é, porque é quase todo ferro. O níquel e o cobalto também entram na lista. Mas alumínio, cobre, ouro, prata e latão? Um ímã de geladeira não vai nem se importar. São metais perfeitamente bons que só não fazem esse truque específico." },
      ] },
      { title: "Pequenas Regiões Magnéticas", blocks: [
        { type: "paragraph", text: "Dentro de um material magnético existem zonas microscópicas chamadas domínios. Imagine cada uma como uma setinha apontando para alguma direção magnética. Em um pedaço de ferro não magnetizado, essas setas apontam para todo lado, então os puxõezinhos delas se cancelam e o ferro não faz nada." },
        { type: "paragraph", text: "Aproxime um ímã e as setas começam a girar para o alinhamento. Consiga que um número suficiente aponte na mesma direção e o pedaço inteiro de metal é atraído. É isso que acontece quando um clipe gruda de uma vez em um ímã. Você não acrescentou magnetismo. Você organizou o que já estava lá dentro." },
      ] },
      { title: "Por Que o Cobre Não Gruda?", blocks: [
        { type: "paragraph", text: "O cobre tem elétrons fazendo a parte deles, igual ao ferro. O que ele não tem é uma estrutura que permita que todos esses efeitos magnéticos minúsculos se alinhem e se somem. Sem esse alinhamento não há nada em que o ímã se agarre. O alumínio, o ouro e quase todos os outros metais estão no mesmo barco. Os ingredientes estão lá. A arrumação, não." },
      ] },
      { title: "E o Aço?", blocks: [
        { type: "paragraph", text: "O aço é ferro com outros elementos misturados, geralmente carbono. Como tem ferro, quase todo aço é magnético. Mas não todo, e isso confunde as pessoas. Certos aços inoxidáveis mal respondem a um ímã, porque o jeito como os átomos deles estão arrumados é diferente. É por isso que um ímã gruda de uma vez em uma peça de aço e escorrega de outra que parece idêntica." },
      ] },
      { title: "Os Ímãs São Úteis Porque São Seletivos", blocks: [
        { type: "paragraph", text: "Serem tão exigentes é exatamente o que os torna úteis. As usinas de reciclagem passam ímãs gigantes sobre a esteira para arrancar ferro e aço de uma corrente misturada em uma única passada. Os motores elétricos transformam magnetismo em movimento. Os alto-falantes transformam sinais elétricos em som com um ímã e uma bobina. Uma bússola lê o campo magnético do planeta inteiro. Isso não é truque de geladeira. É tecnologia que sustenta o mundo." },
      ] },
      { title: "A Grande Ideia", blocks: [
        { type: "paragraph", text: "Os ímãs grudam nos metais cujos domínios internos conseguem se alinhar com um campo magnético. O ferro, o aço, o níquel e o cobalto conseguem. O cobre e o alumínio não, porque a estrutura deles não permite esse alinhamento." },
        { type: "callout", accent: "orange", text: "Então, quando um ímã escorrega de um objeto de metal, não há nada quebrado. Aquele metal simplesmente não é do tipo magnético, e agora você já sabe por quê." },
      ] },
    ],
  },
}
