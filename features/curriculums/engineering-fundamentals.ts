/**
 * Engineering Fundamentals - a 6-week hands-on engineering curriculum for
 * grades 2-5.
 *
 * This file is the single source of truth for the curriculum. It is intentionally
 * data-driven: the course overview page and the individual lesson pages read from
 * this structure so that content can be reviewed and edited here without touching
 * layout code (mirroring the approach used by `intro-to-python.ts`).
 *
 * Design intent (see the course design rules): this is a physical-build course,
 * not a coding one, so lessons are framed around the engineering design process -
 * ask, imagine, plan, build, test, improve. Each lesson centers on one project a
 * student builds from common, low-cost materials, then tests and redesigns.
 *
 * Editing guidance:
 * - Keep `materials` to realistic, cheap, classroom/library-friendly supplies.
 * - `testingChallenges` are meant to render as a lab-notebook style testing table
 *   (a measurable test, how to run it, and what number to record).
 * - Lessons build on each other: the final challenge assumes the structures,
 *   motion, and testing ideas from lessons 1-5, so keep those concepts intact.
 */

/** A single engineering concept and its kid-friendly, grounded definition. */
export type EngineeringConcept = {
  term: string
  definition: string
}

/**
 * One row of a lesson's testing table. Students run the test and record a
 * result, which gives them a number to improve on their redesign.
 */
export type EngineeringTest = {
  /** Short name of the test, e.g. "Load test". */
  test: string
  /** Plain-language instructions for running the test. */
  howTo: string
  /** What to observe or write down (the measurable result). */
  measure: string
}

/**
 * Facilitator-facing guide for a single lesson, shown on the per-lesson
 * teacher/parent guide page. Practical and specific: what to set up, what to
 * watch for, and the exact questions an adult should ask.
 */
export type EngineeringTeacherGuide = {
  /** How to set the room up before students arrive. */
  setup: string[]
  /** What to prepare or pre-cut from the materials ahead of time. */
  materialsPrep: string[]
  /** Specific safety points for this build. */
  safetyNotes: string[]
  /** What a student should be able to do or explain by the end. */
  learningObjectives: string[]
  /** The ways this build most commonly fails, so adults can spot them. */
  commonFailures: string[]
  /** Concrete questions to ask instead of fixing the design. */
  questionsToAsk: string[]
  /** How to make the challenge more accessible for younger students. */
  easierVersion: string
  /** How to stretch the challenge for students who need more. */
  harderVersion: string
  /** How to pack up and what to save for next time. */
  cleanup: string[]
}

/** One lesson: a build project plus the concepts, testing, and reflection around it. */
export type EngineeringLesson = {
  /** URL slug, e.g. "lesson-1" or "final-challenge". */
  slug: string
  /** 1-based position in the course, used for ordering and prev/next. */
  order: number
  /** Marks the capstone lesson so pages can frame it differently. */
  isFinal?: boolean
  /** Lesson title shown in the schedule and lesson header. */
  title: string
  /** Name of the build for this lesson. */
  projectName: string
  /** One or two sentences describing what the lesson covers. */
  summary: string
  /** Rough session length for the lesson and build, e.g. "45-60 minutes". */
  estimatedTime: string
  /** The engineering ideas introduced this lesson, in teaching order. */
  concepts: EngineeringConcept[]
  /** The design challenge, stated the way an engineer would receive a brief. */
  designBrief: string
  /**
   * A short, concrete scenario that gives the build a purpose (the "why").
   * Optional: lessons that have been fully written include it; others fall back
   * to the design brief.
   */
  problem?: string
  /**
   * Where this engineering idea shows up in everyday life: a one-line intro and
   * a few familiar places students have seen it. Optional; falls back to
   * `realWorldExamples` when absent.
   */
  realWorldConnection?: {
    intro: string
    appearsIn: string[]
  }
  /** The rules and limits the design has to work within. */
  constraints: string[]
  /** Concrete, low-cost supplies needed for this lesson's build. */
  materials: string[]
  /** Everyday swaps when a material is not on hand. Optional. */
  substitutions?: string[]
  /**
   * Names (from the course `materialProperties`) of the materials worth
   * comparing in this lesson. Renders a material comparison table. Optional.
   */
  comparedMaterials?: string[]
  /** A simple force/motion figure to show on this lesson. Optional. */
  diagram?: EngineeringDiagramKind
  /**
   * Guided-but-open build steps. Written to leave room for different designs
   * rather than one required build. Optional; shown when present.
   */
  buildSteps?: string[]
  /**
   * Redesign prompts tied to the ways a build commonly fails, used in the
   * "Improve your design" section. Optional; falls back to a generic prompt.
   */
  redesignPrompts?: string[]
  /**
   * Distinct design directions a student can pick between (used by the final
   * challenge's "Choose your solution path" section). Optional.
   */
  solutionPaths?: string[]
  /**
   * A short list of the concepts this lesson pulls together, shown as a review
   * line above the key ideas. Used by the final challenge. Optional.
   */
  conceptsReviewed?: string[]
  /**
   * Prompts a student answers when presenting their finished design to the
   * group (used by the final challenge's "Present your design" section). Optional.
   */
  presentationPrompts?: string[]
  /** Everyday objects that use the same engineering idea. */
  realWorldExamples: string[]
  /** Measurable tests students run on their build (renders as a testing table). */
  testingChallenges: EngineeringTest[]
  /** Questions that connect the build back to the student's own thinking. */
  reflectionQuestions: string[]
  /** Open-ended stretch tasks for students who finish early. */
  extensionChallenges: string[]
  /** Notes for the facilitator: pacing, common mistakes, and safety. */
  teacherNotes: string
  /** Structured facilitator guide, shown on the per-lesson teacher guide page. */
  teacherGuide?: EngineeringTeacherGuide
}

/** One step in the engineering design process that every lesson follows. */
export type EngineeringDesignStep = {
  title: string
  description: string
}

/** A practical grouping of course materials, e.g. "Basic supplies". */
export type EngineeringMaterialGroup = {
  label: string
  items: string[]
}

/** One material and a kid-friendly note on how it behaves. */
export type EngineeringMaterialProperty = {
  name: string
  property: string
}

/** Which simple diagram, if any, a lesson shows. Each maps to one SVG figure. */
export type EngineeringDiagramKind = "bridge-forces" | "lever" | "flight" | "material-layers"

/** Top-level course metadata plus the ordered list of lessons. */
export type EngineeringCurriculum = {
  /** URL slug for the course landing route. */
  slug: string
  title: string
  subtitle: string
  /** One-sentence description for the overview page header. */
  description: string
  /** Grade band this is designed for, e.g. "Grades 2-5". */
  gradeRange: string
  /** Number of lessons in the course. */
  totalLessons: number
  /** How long the whole course runs, e.g. "6 weeks". */
  duration: string
  /** Typical session length per lesson. */
  estimatedTimePerLesson: string
  /** What a student needs to take part (materials, no devices required). */
  requirement: string
  /** Short paragraph describing the course for families and teachers. */
  summary: string
  /** Plain-language notes about how the course is structured and run. */
  format: string[]
  /** Specific, concrete skills students walk away with. */
  learningGoals: string[]
  /** The full materials list across the whole course, as one flat list. */
  materials: string[]
  /** The same materials grouped into practical categories for the overview page. */
  materialGroups: EngineeringMaterialGroup[]
  /** How common materials behave, for the per-lesson material comparison. */
  materialProperties: EngineeringMaterialProperty[]
  /** A reassuring note that not every material is needed to begin. */
  materialsNote: string
  /**
   * The planning prompts students work through before building, shared across
   * every lesson so the "plan before you build" habit stays consistent.
   */
  planningPrompts: string[]
  /** The design process every lesson repeats, so students know the shape. */
  designProcess: EngineeringDesignStep[]
  lessons: EngineeringLesson[]
}

export const engineeringFundamentalsCurriculum: EngineeringCurriculum = {
  slug: "engineering-fundamentals",
  title: "Engineering Fundamentals",
  subtitle:
    "Learn how engineers design, build, test, and improve solutions through six hands-on challenges.",
  description:
    "A 6-week hands-on engineering course where students learn how real engineers think by building, testing, and redesigning structures, machines, and solutions from everyday materials.",
  gradeRange: "Grades 2-5",
  totalLessons: 6,
  duration: "6 weeks",
  estimatedTimePerLesson: "45-75 minutes",
  requirement: "Common building materials, no computer needed",
  summary:
    "Students learn engineering the way engineers actually work: they get a challenge, sketch a plan, build a first version, test it with real measurements, and improve the design. Each week centers on one project built from cheap, everyday materials - paper, cardboard, tape, and string - and one big engineering idea, from stability to simple machines to flight. The course ends with a final challenge that combines everything into one rescue-mission design.",
  format: [
    "One engineering idea and one build per week, in an order that builds up skills.",
    "Every lesson follows the same design process: ask, imagine, plan, build, test, improve.",
    "Students test their builds with real measurements and record the results.",
    "Redesign is built in - the first version is never the final version.",
    "All projects use common, low-cost materials and need no computer or kit.",
  ],
  learningGoals: [
    "Explain what engineers do",
    "Use the engineering design process",
    "Build and test simple structures",
    "Understand forces, loads, and stability",
    "Compare materials",
    "Improve a design after failure",
    "Solve problems with constraints",
    "Complete a final engineering design challenge",
  ],
  materials: [
    "Printer or construction paper, and index cards",
    "Cardboard (cereal boxes, shipping boxes) and cardstock",
    "Masking tape and clear tape",
    "String, yarn, and rubber bands",
    "Craft sticks (popsicle sticks) and wooden skewers or straws",
    "Scissors, a ruler, and pencils",
    "Paper cups, small paper plates, and paper clips or brass fasteners",
    "Coins, washers, or small weights for load testing",
    "Cotton balls, sand or gravel, and a clear cup for the water-filter lesson",
    "A sketchbook or the printable planning sheets for each lesson",
  ],
  materialGroups: [
    {
      label: "Basic supplies",
      items: ["Paper", "Cardboard", "Tape", "Scissors", "Ruler", "Pencil"],
    },
    {
      label: "Building materials",
      items: ["Popsicle sticks", "Straws", "Index cards", "Paper cups", "Paper clips"],
    },
    {
      label: "Motion materials",
      items: ["String", "Rubber bands", "Brass fasteners", "Small objects to lift"],
    },
    {
      label: "Testing materials",
      items: ["Coins", "Washers", "Books", "Measuring tape", "Small weights"],
    },
    {
      label: "Optional materials",
      items: ["Coffee filters", "Cotton balls", "Gravel", "Sand", "Plastic eggs", "Ping pong balls"],
    },
  ],
  materialProperties: [
    { name: "Paper", property: "Light and bends easily. Much stronger when folded or rolled." },
    { name: "Cardboard", property: "Stronger than paper. Good for panels, decks, and bases." },
    { name: "Straws", property: "Light and handy for frames, but bend if nothing supports them." },
    {
      name: "Popsicle sticks",
      property: "Strong as beams and hard to bend, but heavier than paper.",
    },
    { name: "String", property: "Great for pulling, but it cannot push - it just goes slack." },
    { name: "Tape", property: "Useful for joining parts, but joints can fail if overloaded." },
    { name: "Rubber bands", property: "Stretch to store energy and pull parts back together." },
  ],
  materialsNote: "You do not need every material to start. Each lesson includes substitutions.",
  planningPrompts: [
    "Draw your idea before you build it. A rough sketch is fine.",
    "Label the strongest part of your design, and the part you are least sure about.",
    "Predict what might fail first when you test it.",
    "Decide which material goes where, and why that material fits that job.",
  ],
  designProcess: [
    {
      title: "Ask",
      description:
        "Read the challenge and its rules. What has to work, and what are you not allowed to do?",
    },
    {
      title: "Imagine",
      description:
        "Think of a few different ways to solve it. Engineers never start with only one idea.",
    },
    {
      title: "Plan",
      description:
        "Sketch your design and label the parts. Decide what materials each part needs.",
    },
    {
      title: "Create",
      description:
        "Build a first version - a prototype. It does not have to be perfect; it has to be testable.",
    },
    {
      title: "Test",
      description:
        "Run the same fair test every time and write down what actually happened.",
    },
    {
      title: "Improve",
      description:
        "Use what the test showed you to change one thing, then test again. That is redesign.",
    },
  ],
  lessons: [
    {
      slug: "lesson-1",
      order: 1,
      title: "Think Like an Engineer",
      projectName: "Paper Tower Challenge",
      summary:
        "Students meet the engineering design process by building the tallest tower they can from a few sheets of paper and a little tape, then redesigning it to stand taller and steadier.",
      estimatedTime: "45-60 minutes",
      concepts: [
        {
          term: "Engineering design process",
          definition:
            "The steps engineers repeat to solve a problem: ask, imagine, plan, build, test, and improve.",
        },
        {
          term: "Stability",
          definition:
            "How well something stays standing without tipping over. A wide, low base is more stable.",
        },
        {
          term: "Prototype",
          definition:
            "A first version of a design that you build so you can test it and learn from it.",
        },
        {
          term: "Redesign",
          definition:
            "Changing your design after a test to make it work better, instead of starting over.",
        },
      ],
      designBrief:
        "Build the tallest free-standing paper tower you can that stands on its own for at least ten seconds. Then use what you learned from testing to build a second, better version.",
      problem:
        "Your team has a stack of paper and a little tape, and one job: build the tallest tower you can that stands up by itself. It has to hold steady for at least ten seconds with nobody touching it. Taller is better - but a tall tower that falls over does not count.",
      realWorldConnection: {
        intro:
          "Anything tall has to solve the same problem your tower does: how to stay up without tipping over. Engineers who design tall structures spend most of their effort on the base and on balance, not the top.",
        appearsIn: ["Skyscrapers", "Cell and radio towers", "Lookout towers", "Construction cranes"],
      },
      constraints: [
        "Use only the paper and tape you are given (for example, 5 sheets of paper and 30 cm of tape).",
        "The tower must stand on its own - no leaning on a wall, no holding it up.",
        "No other materials, and no cutting the tower down to prop it up.",
      ],
      materials: ["Paper", "Tape", "Scissors", "Ruler", "Coins or small weights"],
      substitutions: [
        "Index cards instead of paper",
        "Books or small blocks instead of coins",
      ],
      buildSteps: [
        "Start with the base. Decide how wide to make it - a wider base is harder to tip over.",
        "Choose how to use your paper: rolled tubes, folded columns, flat strips, or a mix. There is no single right shape.",
        "Build up in sections you can test, instead of the whole tower at once.",
        "Use tape only where parts join. Too much tape near the top adds weight where you do not want it.",
        "Stand it up as you go to check it is not leaning before you build higher.",
      ],
      redesignPrompts: [
        "If it tipped over, widen the base or move more of the weight lower down.",
        "If it sagged or bent in the middle, add a fold or a support to stiffen that section.",
        "If the top drooped, use less paper up high so the tower is lighter where it is weakest.",
        "Change only one thing, then test again so you know what actually helped.",
      ],
      realWorldExamples: [
        "Skyscrapers use a wide, heavy base so wind cannot tip them over.",
        "Cell-phone and radio towers use a triangle-braced frame to stay tall without falling.",
        "A traffic cone is wide at the bottom and light at the top so it is hard to knock over.",
      ],
      testingChallenges: [
        {
          test: "Height test",
          howTo: "Stand the finished tower on a flat table and measure from the table to the top.",
          measure: "Height in centimeters",
        },
        {
          test: "Stand-alone test",
          howTo: "Let go completely and start counting.",
          measure: "How many seconds it stands before tipping (goal: 10+)",
        },
        {
          test: "Wobble test",
          howTo: "Gently blow on the tower from an arm's length away.",
          measure: "Does it sway and recover, or fall over?",
        },
      ],
      reflectionQuestions: [
        "What made your tower stable or unstable?",
        "What shape or base worked best?",
        "What failed first?",
        "What did you improve after testing?",
        "How was your second design better than your first?",
      ],
      extensionChallenges: [
        "Rebuild your tower to hold a single coin at the very top without falling.",
        "Try to beat your best height using one fewer sheet of paper.",
        "Design a tower that survives a gentle desk bump as well as a puff of air.",
      ],
      teacherNotes:
        "The goal of week one is the process, not the tallest tower. Give students a short first build, then stop the room to test and talk before letting them rebuild - the redesign is where the learning happens. Common mistake: rolling paper into thin tubes that are tall but tip instantly; guide students toward a wider base. Encourage a quick sketch before any tape is used.",
      teacherGuide: {
        setup: [
          "Clear a flat table for each student or team and set out 5 sheets of paper and about 30 cm of tape each.",
          "Set up one 'testing station' with a ruler or tape measure so every tower is measured the same way.",
          "Plan the session in two rounds: a first build (about 10 minutes), a test-and-talk pause, then a redesign (about 10 minutes).",
        ],
        materialsPrep: [
          "Pre-tear the tape into 30 cm strips so time is not lost pulling tape off the roll.",
          "Keep a small cup of coins at the testing station for the optional 'hold a coin on top' test.",
        ],
        safetyNotes: [
          "Low risk overall. Scissors stay on the table and are passed handle-first.",
        ],
        learningObjectives: [
          "Name the steps of the engineering design process and that a first try is a prototype.",
          "Explain that a wider, lower base makes a tower more stable.",
          "Change a design based on what a test showed, instead of guessing.",
        ],
        commonFailures: [
          "Thin rolled tubes that are tall but tip instantly - the base is too narrow.",
          "Too much tape near the top, adding weight where the tower is weakest.",
          "Building the whole tower before testing, so a flaw only shows up at the very end.",
        ],
        questionsToAsk: [
          "\"Where is the weight going?\" - points them to the base and balance.",
          "\"What part failed first when it fell over?\"",
          "\"What changed between your first tower and your second?\"",
          "\"How could you make it taller using the same amount of paper?\"",
        ],
        easierVersion:
          "Give a target height to reach (for example, 30 cm) instead of 'as tall as possible,' and let students start from pre-rolled paper tubes.",
        harderVersion:
          "Require the tower to hold a coin on top for 10 seconds, or cap the tape at 15 cm so material choices matter more.",
        cleanup: [
          "Flatten and recycle the paper towers; keep any tape-free sheets as scrap.",
          "Collect the coins and rulers back at the testing station.",
        ],
      },
    },
    {
      slug: "lesson-2",
      order: 2,
      comparedMaterials: ["Popsicle sticks", "Straws", "Cardboard", "Paper", "Tape"],
      diagram: "bridge-forces",
      title: "Build It Strong",
      projectName: "Bridge or Platform Strength Challenge",
      summary:
        "Students learn why triangles and good supports make structures strong by building a small bridge or platform that has to hold as much weight as possible without collapsing.",
      estimatedTime: "50-60 minutes",
      concepts: [
        {
          term: "Structure",
          definition: "Something built to hold itself up and carry a load, like a bridge or a shelf.",
        },
        {
          term: "Load",
          definition: "The weight a structure has to carry, including the weight of the structure itself.",
        },
        {
          term: "Support",
          definition: "A part that holds up the load and passes the force down to the ground.",
        },
        {
          term: "Triangle bracing",
          definition:
            "Adding triangle shapes to a design, because triangles keep their shape under load better than squares.",
        },
        {
          term: "Material strength",
          definition:
            "How much force a material can take before it bends or breaks. Shape can make a weak material act strong.",
        },
      ],
      designBrief:
        "Build a bridge or raised platform that spans a gap of about 20 cm and holds as many coins (or washers) as possible before it bends too far or collapses.",
      problem:
        "A small town is cut off by a gap - a stream, a ravine, a washed-out road - and needs supplies to get across. Your job is to build a bridge or raised platform that spans the gap and holds as much weight as possible without bending too far or collapsing.",
      realWorldConnection: {
        intro:
          "Every structure that holds something up is solving your bridge's problem: carry a load across a distance without bending or breaking. The same ideas hold up a bookshelf and a highway overpass.",
        appearsIn: ["Bridges", "Shelves", "Roofs", "Tables", "Playground structures"],
      },
      constraints: [
        "The span must cross a set gap - for example, the distance between two stacks of books.",
        "Use only the materials provided (craft sticks, paper, index cards, and tape).",
        "The load has to rest on the deck, not be taped or tied on.",
      ],
      materials: [
        "Popsicle sticks",
        "Straws",
        "Index cards",
        "Tape",
        "String",
        "Cups or books for supports",
        "Coins, washers, or small weights",
      ],
      substitutions: [
        "Rolled paper tubes instead of straws",
        "Stacked books instead of cups for the supports",
        "Washers or metal nuts instead of coins",
      ],
      buildSteps: [
        "Set up your gap first: place two cups or book stacks about 20 cm apart. That gap is what your structure has to cross.",
        "Build the deck - the flat part supplies rest on - so it reaches from one side to the other.",
        "Add supports underneath or along the sides to carry the weight down to the table.",
        "Try adding triangles: three sticks joined into a triangle where the deck meets the supports.",
        "Leave the middle testable. You will load weight there, so make it strong without overbuilding it.",
      ],
      redesignPrompts: [
        "If it bent in the middle, add a support or a triangle brace under that spot.",
        "If a joint pulled apart, add tape or string to hold that connection tighter.",
        "If it twisted sideways, connect the two sides so they move together.",
        "If one material kept failing, swap it for a stronger shape - a folded card or a tube - and test again.",
      ],
      realWorldExamples: [
        "Truss bridges are built from rows of triangles so they can carry heavy trains.",
        "Roof frames use triangles so the roof does not sag under snow.",
        "A folded piece of cardboard is far stronger than a flat one - shape adds strength.",
      ],
      testingChallenges: [
        {
          test: "Load test",
          howTo: "Add coins one at a time to the center of the deck, counting as you go.",
          measure: "Number of coins held before it collapses",
        },
        {
          test: "Bend test",
          howTo: "Watch the deck as weight is added and mark when it starts to sag.",
          measure: "How many coins before it bends more than a finger's width",
        },
        {
          test: "Triangle test",
          howTo: "Compare a square-braced version to a triangle-braced version with the same materials.",
          measure: "Which design holds more, and by how many coins",
        },
      ],
      reflectionQuestions: [
        "Where did your structure bend first?",
        "What part carried the most weight?",
        "Did triangles help?",
        "Which material worked best?",
        "What would you change with fewer materials?",
      ],
      extensionChallenges: [
        "Rebuild to hold the same load using fewer craft sticks.",
        "Make the bridge span a wider gap without adding a support in the middle.",
        "Design a platform that spreads the load so a stack of coins does not tip.",
      ],
      teacherNotes:
        "Run a quick side-by-side of a square frame versus a triangle-braced frame so students feel why triangles matter. Common mistake: piling all the weight at one edge; show students to load the center for a fair test. Watch fingers when structures collapse, and use light coins or washers rather than heavy objects.",
      teacherGuide: {
        setup: [
          "Set up each team's gap ahead of time: two equal book stacks (or cups) about 20 cm apart.",
          "Put the load - a cup of coins or washers - at a shared testing station.",
          "Demonstrate once: a flat card versus a folded card, and a square versus a triangle, so students feel why shape matters.",
        ],
        materialsPrep: [
          "Count out about 20 craft sticks and a few index cards per team so everyone starts even.",
          "Use light coins or metal washers, never heavy objects, so a collapse is safe.",
        ],
        safetyNotes: [
          "Structures snap when they fail - keep faces back and fingers off the deck during a load test.",
          "If skewers are used, they are pointed; supervise closely or swap them for straws with younger students.",
        ],
        learningObjectives: [
          "Explain load and support, and how force travels down into the supports.",
          "Show that triangles hold their shape under load better than squares.",
          "Compare materials and pick a stronger shape for a weak material.",
        ],
        commonFailures: [
          "Weight piled at one edge instead of the center - not a fair test.",
          "Joints taped weakly, so the structure pulls apart at a connection before the material fails.",
          "A flat, unbraced deck that sags in the middle.",
        ],
        questionsToAsk: [
          "\"Where did it bend or break first, and why that spot?\"",
          "\"What is carrying the most weight right now?\"",
          "\"Where could a triangle help?\"",
          "\"How could you hold the same weight using fewer craft sticks?\"",
        ],
        easierVersion:
          "Shorten the gap to 10-12 cm and pre-build the two supports so students focus only on the deck.",
        harderVersion:
          "Widen the gap, ban a support in the middle, or set a material budget such as 12 craft sticks.",
        cleanup: [
          "Peel tape off reusable craft sticks and sort them back into a bin.",
          "Return coins and washers to the testing station and recycle the failed decks.",
        ],
      },
    },
    {
      slug: "lesson-3",
      order: 3,
      comparedMaterials: ["Cardboard", "Popsicle sticks", "String", "Rubber bands", "Tape"],
      diagram: "lever",
      title: "Make It Move",
      projectName: "Cardboard Grabber or Mini Crane",
      summary:
        "Students explore simple machines by building a cardboard grabber or mini crane that uses levers and pivots to reach out, lift, and move a small object.",
      estimatedTime: "50-60 minutes",
      concepts: [
        {
          term: "Simple machine",
          definition: "A basic tool that makes work easier, like a lever, a pulley, or a wheel.",
        },
        {
          term: "Lever",
          definition: "A stiff bar that turns around a fixed point to lift or move something.",
        },
        {
          term: "Pivot",
          definition: "The fixed point a lever turns around, also called a fulcrum.",
        },
        {
          term: "Mechanical advantage",
          definition:
            "When a machine lets a small push move a bigger load, or reach farther than your arm can.",
        },
        {
          term: "Motion",
          definition: "How the parts of a machine move - sliding, turning, opening, or lifting.",
        },
      ],
      designBrief:
        "Build a grabber or crane from cardboard and fasteners that can reach at least 20 cm, pick up a light object like a crumpled paper ball, and set it down in a target spot.",
      problem:
        "Something needs to be moved, but you cannot touch it with your hands - it is too far, too high, or in an awkward spot. Design a tool that can reach out and move or lift a small object for you, worked entirely from your end.",
      realWorldConnection: {
        intro:
          "Machines that reach, grab, and lift all rely on levers and pivots - the same parts in your grabber. A small movement at your hand becomes a bigger or stronger movement at the far end.",
        appearsIn: ["Cranes", "Excavators", "Scissors", "Claw machines", "Elevators", "Robotic arms"],
      },
      constraints: [
        "The machine must be worked by hand from one end - no reaching in with your other hand to help.",
        "Use cardboard, craft sticks, brass fasteners or string, and tape.",
        "The object must be lifted and released, not just pushed.",
      ],
      materials: [
        "Cardboard",
        "Brass fasteners",
        "String",
        "Straws",
        "Tape",
        "Popsicle sticks",
        "Rubber bands",
        "Cups or small objects to lift",
      ],
      substitutions: [
        "A knotted string joint instead of a brass fastener",
        "Straws or skewers instead of popsicle sticks",
        "A crumpled paper ball or cotton ball as the object to lift",
      ],
      buildSteps: [
        "Pick your machine: a grabber that opens and closes, or a crane that lifts with a string. Both use the same ideas.",
        "Find your pivot - the point your parts turn around - and join two pieces there with a brass fastener.",
        "Make handles or a pull-string long enough to work the machine from your end without touching the object.",
        "Add the grip or hook that actually holds the object.",
        "Test the movement early and often. Joints usually need adjusting before the machine works smoothly.",
      ],
      redesignPrompts: [
        "If the arm flopped or bent, use a stiffer piece or add a second layer of cardboard.",
        "If a joint was too loose it wobbled; too tight it would not move. Adjust the fastener until it is snug.",
        "If the grip kept dropping the object, add texture, a hook, or a deeper cup to hold it better.",
        "If a crane string slipped, tie it off or wind it around a spool for control.",
      ],
      realWorldExamples: [
        "A construction crane is a giant lever that pivots to lift heavy loads.",
        "Scissors and a seesaw are levers that turn around a pivot point.",
        "A claw machine and a robot arm use joints, just like the fasteners in your grabber.",
      ],
      testingChallenges: [
        {
          test: "Reach test",
          howTo: "Measure how far the grabber extends from where your hand holds it.",
          measure: "Reach in centimeters",
        },
        {
          test: "Grip test",
          howTo: "Try to pick up the object and hold it in the air for five seconds.",
          measure: "Does it hold, slip, or drop the object?",
        },
        {
          test: "Place test",
          howTo: "Move the lifted object to a target circle and let it go.",
          measure: "How many out of five tries land in the target",
        },
      ],
      reflectionQuestions: [
        "Was your design strong, or easy to move?",
        "Where did it bend?",
        "What part acted like a lever?",
        "What made the movement better or worse?",
        "How could you improve the grip or lifting power?",
      ],
      extensionChallenges: [
        "Add a second joint so your grabber can bend around a corner.",
        "Redesign the grip so it can pick up a rounded object like a ball.",
        "Make the crane lift the object straight up instead of swinging it.",
      ],
      teacherNotes:
        "Let students feel the pivot idea first with a craft-stick seesaw before they build. Common mistake: fasteners pinched so tight the arm cannot move, or so loose it flops; aim for a snug joint. Managing string tension is the tricky part of a crane - a grabber is the simpler starting point for younger students.",
      teacherGuide: {
        setup: [
          "Set out cardboard strips, brass fasteners, string, and tape per team, plus one light object to lift such as a crumpled paper ball.",
          "Mark a 'target spot' on each table so students can practice placing the object, not just lifting it.",
          "Demonstrate a pivot first: pin two craft sticks with a fastener and show how they turn around it.",
        ],
        materialsPrep: [
          "Pre-punch fastener holes in a few cardboard strips for students who struggle with the poke-through step.",
          "Cut string into roughly 40 cm lengths for the crane builders.",
        ],
        safetyNotes: [
          "Brass fasteners and any hole-poking tool are sharp - poke holes down onto the cardboard on the table, never toward a hand.",
          "Scissors are passed handle-first and stay on the table.",
        ],
        learningObjectives: [
          "Point to the pivot and explain that a lever turns around it.",
          "Explain that string can pull but not push.",
          "Explain that a small movement at one end can make a bigger or stronger movement at the other.",
        ],
        commonFailures: [
          "Fasteners pinched too tight so the arm will not move, or too loose so it flops.",
          "A grip that pushes the object away instead of closing on it.",
          "A crane string with no way to hold tension, so the load drops.",
        ],
        questionsToAsk: [
          "\"Where is the pivot, and what happens if you move it?\"",
          "\"Which part acted like a lever?\"",
          "\"What made the grip drop the object?\"",
          "\"How could you get more lifting power without adding more cardboard?\"",
        ],
        easierVersion:
          "Start everyone on a two-strip 'clothespin' grabber and skip the crane, so there is only one pivot to manage.",
        harderVersion:
          "Require the machine to reach 30 cm, or to pick up a rounded object like a ball.",
        cleanup: [
          "Recover reusable brass fasteners and string into a small container.",
          "Recycle cardboard scraps and keep larger offcuts for next time.",
        ],
      },
    },
    {
      slug: "lesson-4",
      order: 4,
      diagram: "flight",
      title: "Design for Flight",
      projectName: "Paper Glider or Mars Lander",
      summary:
        "Students investigate the forces of flight by building a paper glider or a drop-test Mars lander, then testing how weight and balance change the way it flies or lands.",
      estimatedTime: "50-60 minutes",
      concepts: [
        {
          term: "Aerospace engineering",
          definition:
            "Designing things that move through the air and space, like planes, drones, parachutes, and spacecraft.",
        },
        {
          term: "Weight",
          definition: "The pull of gravity. Weight pulls every object down toward the ground.",
        },
        {
          term: "Drag",
          definition: "The way air pushes back on a moving object and slows it down.",
        },
        {
          term: "Balance",
          definition:
            "How the weight is spread out. Balance decides whether a design flies steady or tips and spins.",
        },
        {
          term: "Small changes",
          definition:
            "One small change - a fold, a paper clip, a bit of cushioning - can change how something flies or falls.",
        },
      ],
      designBrief:
        "Build a paper glider that flies straight and far, or a Mars lander that protects a small payload from a drop. Test it, change one thing, and test again.",
      problem:
        "Design something that moves safely through the air. Pick your path: a glider that flies far and straight, or a lander that protects a small object when it falls and hits the ground. Either way, air and gravity are working against you.",
      realWorldConnection: {
        intro:
          "Anything that flies or falls is fighting the same two forces your design does: gravity pulling it down, and air pushing against it. Aerospace engineers shape their designs to control both.",
        appearsIn: ["Airplanes", "Parachutes", "Helicopters", "Spacecraft", "Drones"],
      },
      constraints: [
        "Same launch every time for a fair test - same spot, same gentle push, or same drop height.",
        "Glider path: start with one sheet of paper and a paper clip. Lander path: use cups, paper, tape, and cushioning.",
        "Change only one thing between tests (one fold, one clip, or one cushion).",
      ],
      materials: [
        "Paper",
        "Index cards",
        "Straws",
        "Tape",
        "String",
        "Coffee filters",
        "Cups",
        "Cotton balls",
        "Rubber bands",
        "A plastic egg, ping pong ball, or small toy to protect",
      ],
      substitutions: [
        "A crumpled paper ball instead of a plastic egg or ping pong ball",
        "A plastic bag instead of a coffee filter for a parachute",
        "Rolled paper instead of straws",
      ],
      buildSteps: [
        "Pick your path: a glider that flies far and straight, or a lander that protects a small object when it drops.",
        "Glider: fold or cut a wing shape and start light. You can add a paper clip later to change the balance.",
        "Lander: build a cup or box to hold the object, then add cushioning, legs, or a parachute to soften the landing.",
        "Keep your first version simple so you can see what one change does.",
        "Set up a fair test before building too far: same launch spot for gliders, same drop height for landers.",
      ],
      redesignPrompts: [
        "If a glider dived, move a little weight (a paper clip) toward the back, or bend the tail flaps up.",
        "If a glider curved or spun, check that both wings match and the nose is straight.",
        "If a lander's object got damaged, add more cushioning or slow the fall with a coffee-filter parachute.",
        "If a lander tipped over, widen its base or move its weight lower.",
        "Change one thing at a time so you know which change actually helped.",
      ],
      realWorldExamples: [
        "Airplane wings are shaped to make lift as they push through the air.",
        "Real Mars landers use airbags, crushable legs, or parachutes to survive the landing.",
        "A paper airplane with a bent nose dives - balance decides its whole flight path.",
      ],
      testingChallenges: [
        {
          test: "Glider - distance",
          howTo: "Launch the same way three times and measure how far it travels each time.",
          measure: "Farthest distance in centimeters",
        },
        {
          test: "Glider - accuracy",
          howTo: "Aim at a target on the floor and launch five times the same way.",
          measure: "How many of five landings are near the target",
        },
        {
          test: "Glider - stability",
          howTo: "Watch how the glider moves through the air.",
          measure: "Straight, curved, or nose-dive",
        },
        {
          test: "Lander - protect the object",
          howTo: "Drop the lander from a set height and check the object after each drop.",
          measure: "Did the object survive undamaged? (yes / no)",
        },
        {
          test: "Lander - compare designs",
          howTo: "Test two different landing designs from the same height.",
          measure: "Which design protects the object better",
        },
      ],
      reflectionQuestions: [
        "Did heavier designs fly better or worse?",
        "What happened when the design was unbalanced?",
        "What slowed the fall?",
        "What made the landing safer?",
        "What did you change after testing?",
      ],
      extensionChallenges: [
        "Get your glider to turn in a wide circle instead of flying straight.",
        "Make a lander that protects two coins instead of one from the same drop.",
        "Find the lightest lander that still keeps the payload safe.",
      ],
      teacherNotes:
        "This is the lesson where the idea of changing one variable at a time really lands - insist on a fair launch or drop height. Common mistake: throwing the glider harder to get more distance, which hides what the design change did. Let each student pick the glider or lander path based on space; landers work well where students cannot throw safely.",
      teacherGuide: {
        setup: [
          "Decide by space: gliders need open floor to launch; landers need a safe drop height like a chair or step. Split the group by path.",
          "Mark a launch line and a floor target for gliders; mark one set drop height for landers.",
          "Keep paper clips within reach for changing a glider's balance one clip at a time.",
        ],
        materialsPrep: [
          "Pre-fold one sample dart glider to show a starting point without dictating a single design.",
          "For landers, provide a small object to protect (ping pong ball or crumpled paper) and cushioning such as cotton balls and coffee filters.",
        ],
        safetyNotes: [
          "Gliders are thrown - launch in one direction only, never toward faces, and one team at a time.",
          "For landers, drop from a stable step or chair with an adult beside it. No climbing.",
        ],
        learningObjectives: [
          "Explain weight (gravity pulling down) and drag (air pushing back).",
          "Show how moving weight changes a glider's balance and flight path.",
          "Run a controlled test by changing only one thing at a time.",
        ],
        commonFailures: [
          "Throwing the glider harder to get distance, which hides what the design change actually did.",
          "A nose-heavy glider that dives, or mismatched wings that make it spin.",
          "A lander with cushioning on the wrong side, so the object still takes the impact.",
        ],
        questionsToAsk: [
          "\"What one thing did you change, and what happened?\"",
          "\"Where is the weight - front, back, or center?\"",
          "\"What slowed the fall down?\"",
          "\"Can you make the lander lighter and still protect the object?\"",
        ],
        easierVersion:
          "Everyone flies the same basic dart glider first and only adds or moves one paper clip, so the change being tested is obvious.",
        harderVersion:
          "Add a floor target for accuracy, or require a lander to protect its object from a higher drop.",
        cleanup: [
          "Recycle the paper gliders; keep intact landers for a second test day.",
          "Collect paper clips, cotton balls, and the protected objects back into their bins.",
        ],
      },
    },
    {
      slug: "lesson-5",
      order: 5,
      comparedMaterials: ["Cardboard", "Paper", "Straws", "String", "Tape"],
      diagram: "material-layers",
      title: "Engineer for People and the Planet",
      projectName: "Water Filter, Flood Barrier, or Product Redesign",
      summary:
        "Students take on real-world engineering by designing a model water filter, a flood barrier, or a redesign of an everyday product, weighing what real users need against real constraints.",
      estimatedTime: "50-60 minutes",
      concepts: [
        {
          term: "Engineering for people",
          definition:
            "Engineers often solve problems for real people, not just for fun. The people who will use a design come first.",
        },
        {
          term: "Materials matter",
          definition:
            "Different materials behave differently - some soak up water, some block it, some bend or break. Picking the right one is part of the design.",
        },
        {
          term: "Constraint",
          definition:
            "A limit on your design, like which materials you can use, how big it can be, or how much time you have.",
        },
        {
          term: "Tradeoff",
          definition:
            "When making one thing better makes another thing harder, so you have to choose what matters most.",
        },
        {
          term: "Design for the user",
          definition:
            "Good designs start from what the user actually needs, and get tested by someone using them.",
        },
      ],
      designBrief:
        "Pick one challenge: build a filter that makes dirty water clearer, a barrier that keeps water from a small house, or a redesign of an everyday object that solves a problem for a specific user.",
      problem:
        "Design a solution that helps people or protects the environment. First decide who you are helping and what problem you are solving for them, then build a model that does the job with the materials you have.",
      realWorldConnection: {
        intro:
          "A lot of engineering is not about gadgets - it is about keeping people safe, healthy, and able to do everyday things. These designs solve real problems for real communities.",
        appearsIn: [
          "Clean water systems",
          "Flood protection",
          "Recycling",
          "Safer products",
          "Reusable packaging",
        ],
      },
      constraints: [
        "Name your user and the one problem you are solving for them before you build.",
        "Use only the provided materials, and note any that cost money or could harm the environment.",
        "Safety: for water filter models, filtered water is for testing only and must never be tasted or drunk.",
      ],
      materials: [
        "Cups",
        "Coffee filters",
        "Cotton balls",
        "Gravel",
        "Sand",
        "Cardboard",
        "Tape",
        "Straws",
        "Paper",
        "Index cards",
        "A water testing container",
      ],
      substitutions: [
        "A cut plastic bottle instead of a cup for the filter",
        "A baking tray or foil to hold the water for a flood barrier",
        "Clay or playdough to shape a barrier wall",
      ],
      buildSteps: [
        "Choose your challenge: a water filter, a flood barrier, or a redesign of an everyday object.",
        "Name your user and the one problem you are solving for them before you build anything.",
        "Filter: layer materials - cotton, sand, gravel, a coffee filter - inside a cup so water passes through them.",
        "Flood barrier: shape a wall or channel that keeps water away from a small paper or cardboard house.",
        "Redesign: study the object, find the one thing that annoys the user, and change just that part.",
      ],
      redesignPrompts: [
        "Filter: if the water is still cloudy, add another layer or a finer material like a coffee filter on top.",
        "Filter: if it drains too slowly, use coarser layers or a wider container.",
        "Flood barrier: if water leaked through, seal the gaps or make the wall taller where it failed.",
        "Redesign: watch where your user got stuck, and fix that one spot.",
        "Notice the tradeoff - did making it better in one way make it worse in another?",
      ],
      realWorldExamples: [
        "Water treatment plants pass water through layers of sand and gravel to clean it.",
        "Cities build levees and sandbag walls to hold back rising rivers.",
        "Product engineers redesign packaging to use less plastic while still protecting what is inside.",
      ],
      testingChallenges: [
        {
          test: "Water filter - clarity",
          howTo: "Pour the same cloudy water through and compare it to the starting container.",
          measure: "Clearer, a little clearer, or no change",
        },
        {
          test: "Flood barrier - keep the house dry",
          howTo: "Pour a set amount of water against the barrier and check the house behind it.",
          measure: "Dry, a little wet, or soaked",
        },
        {
          test: "Product redesign - user test",
          howTo: "Have a partner act as the user and try the redesigned object.",
          measure: "Did it solve their problem? What still needs work?",
        },
      ],
      reflectionQuestions: [
        "Who were you designing for?",
        "What problem did your design solve?",
        "What material worked best?",
        "What tradeoff did you make?",
        "What would you improve for a real user?",
      ],
      extensionChallenges: [
        "Improve your filter so it also works faster, not just cleaner.",
        "Design your barrier so it can be reused instead of thrown away.",
        "Redesign your product to use one less material without losing what makes it work.",
      ],
      teacherNotes:
        "This lesson connects engineering to fairness and the environment, so give time for the 'who is this for' conversation before building. Reinforce firmly that filtered water is never for drinking. Common mistake: jumping to a solution before naming the user and problem; hold students at the planning step a little longer here.",
      teacherGuide: {
        setup: [
          "Set up as many of the three stations as you can: filter (cups, sand, gravel, cotton, cloudy water), flood barrier (tray, water, a small paper house), and product redesign (cardboard, tape, an everyday object).",
          "Make cloudy 'dirty' water ahead of time by stirring a little dirt or pepper into a jug - nothing unsafe.",
          "Keep a tray, bucket, or sink area nearby to catch water and spills.",
        ],
        materialsPrep: [
          "Pre-cut plastic bottles into filter housings if you are using bottles.",
          "Pour equal cups of cloudy water in advance so every team tests with the same starting water.",
        ],
        safetyNotes: [
          "Filtered water is for looking at only - students must NOT taste or drink any water in this lesson. Say it aloud and post it at the station.",
          "Wipe spills up right away to prevent slips, and keep all water away from devices.",
        ],
        learningObjectives: [
          "Explain that engineers design for a specific user and a real problem.",
          "Name a constraint and a tradeoff in their own design.",
          "Choose a material based on how it behaves - soaks up, blocks, or filters water.",
        ],
        commonFailures: [
          "Jumping to building before naming the user and the problem.",
          "Filter layers packed too loosely, so cloudy water runs straight through.",
          "A flood barrier with gaps at the edges where water sneaks past.",
        ],
        questionsToAsk: [
          "\"Who is this for, and what problem are you solving for them?\"",
          "\"What tradeoff did you make - what got worse when something got better?\"",
          "\"Which material worked best, and why do you think that is?\"",
          "\"What would a real user still struggle with?\"",
        ],
        easierVersion:
          "Assign one path - usually the water filter - to the whole group, and give them the user and problem already named.",
        harderVersion:
          "Add a second goal, like a filter that is also fast or a barrier that can be reused, which forces a clear tradeoff.",
        cleanup: [
          "Pour used water into a sink or bucket, not the trash; wring out and bin any soaked materials.",
          "Dry and save cups, trays, and cardboard that are still usable.",
        ],
      },
    },
    {
      slug: "final-challenge",
      order: 6,
      isFinal: true,
      title: "Final Engineering Challenge",
      projectName: "Rescue Mission Design Challenge",
      summary:
        "In the capstone, students combine everything from the course - structures, forces, motion, and testing - to design a system that moves a supply package across a dangerous area and delivers it undamaged.",
      estimatedTime: "60-75 minutes",
      conceptsReviewed: [
        "Engineering design process",
        "Structures",
        "Forces",
        "Materials",
        "Motion",
        "Testing",
        "Failure",
        "Redesign",
        "Constraints",
        "Tradeoffs",
      ],
      concepts: [
        {
          term: "System",
          definition: "Several parts working together toward one goal, like a structure plus a moving part.",
        },
        {
          term: "Combining ideas",
          definition:
            "Using more than one engineering idea at once - strength, motion, and balance in a single design.",
        },
        {
          term: "Constraints and tradeoffs",
          definition: "Meeting all the rules of a challenge while choosing what to make best.",
        },
        {
          term: "Iteration",
          definition: "Testing and improving your design again and again until it meets the goal.",
        },
      ],
      designBrief:
        "Design and build a system that moves a supply package across a hazard zone - a gap, a 'river', or a drop - and delivers it undamaged to the other side. Use the structure, motion, materials, and testing skills from the whole course.",
      problem:
        "A supply package needs to travel across a dangerous area, avoid damage, and arrive safely. Your job is to design a system that moves or protects the package across the hazard using only the materials you are given. This is your final challenge - it pulls together everything from the whole course.",
      realWorldConnection: {
        intro:
          "Real rescue and delivery missions face exactly this problem: get something valuable across a dangerous place without damaging it. Engineers combine structures, motion, and protection to pull it off.",
        appearsIn: [
          "Search-and-rescue teams",
          "Cargo drones",
          "Aid drops",
          "Cable cars",
          "Delivery systems",
        ],
      },
      solutionPaths: [
        "A bridge to carry the package across a gap",
        "A zipline carrier that slides the package across",
        "A parachute drop system that lowers it gently",
        "A crane or grabber that lifts and places it",
        "A protective package that survives the trip",
        "A small vehicle or sled that ferries it across",
      ],
      constraints: [
        "The package must cross the hazard zone without being carried by hand.",
        "It has to arrive undamaged - crossing alone is not enough.",
        "Use only the materials provided.",
        "You get three test runs, and you may improve your design between runs.",
      ],
      materials: [
        "Paper",
        "Cardboard",
        "Cups",
        "String",
        "Tape",
        "Straws",
        "Popsicle sticks",
        "Rubber bands",
        "Index cards",
        "Paper clips",
        "A small object to use as the package",
      ],
      substitutions: [
        "A toy, eraser, or small box as the package",
        "Yarn instead of string",
        "Rolled paper tubes instead of straws",
      ],
      buildSteps: [
        "Pick one solution path and sketch it before you build.",
        "Build a simple first version - a prototype - that you can actually test, not a perfect final model.",
        "Set up your hazard zone and decide how you will run the same test each time.",
        "Make the package easy to load and, if your design moves, easy to release at the end.",
        "Leave room to change things - you will test, find what fails, and improve.",
      ],
      redesignPrompts: [
        "If the package fell or got damaged, add protection or slow it down at the end of the trip.",
        "If a structure sagged or broke, add a triangle brace or a support where it failed.",
        "If a moving part stuck or slipped, adjust the tension, the pivot, or the slope.",
        "Change one thing, run the same test again, and see if it helped.",
        "Watch the tradeoffs - a heavier, stronger design may move more slowly.",
      ],
      realWorldExamples: [
        "Search-and-rescue teams use pulleys and ziplines to move people across canyons and rivers.",
        "Cargo cranes and cable cars combine a strong structure with a moving line.",
        "Disaster engineers design bridges and lifts that go up fast and still hold a load.",
      ],
      testingChallenges: [
        {
          test: "Crossing test",
          howTo: "Run the mission from start to finish across the hazard zone.",
          measure: "Did the package reach the other side? (yes / no)",
        },
        {
          test: "Safe-arrival test",
          howTo: "Check the package at the end of each run.",
          measure: "Undamaged and upright, or dropped/damaged?",
        },
        {
          test: "Reliability test",
          howTo: "Run the mission three times without rebuilding from scratch.",
          measure: "How many of the three runs succeed",
        },
      ],
      reflectionQuestions: [
        "Which ideas from earlier lessons did you combine, and how did they work together?",
        "What failed on your first run, and how did you use that to improve the design?",
        "Which constraint or tradeoff shaped your design the most?",
        "If you had another week, what is the first thing you would redesign?",
      ],
      presentationPrompts: [
        "What problem did you solve?",
        "What did you build?",
        "What failed at first?",
        "What did you improve?",
        "Which earlier lesson helped you most?",
        "What would you change with more time?",
      ],
      extensionChallenges: [
        "Deliver two packages in a single run without adding much weight.",
        "Make the crossing work over a longer or more dangerous hazard zone.",
        "Add a way to lower the package gently at the end instead of dropping it.",
      ],
      teacherNotes:
        "Treat this as a showcase of the whole course rather than a new idea. Hold students to a real planning sketch that names which earlier skills they are using. Budget time for at least two test-and-improve rounds - the iteration is the point. A short gallery walk where teams demo their rescue makes a strong finish.",
      teacherGuide: {
        setup: [
          "Set up one shared 'hazard zone' - a taped gap on the floor or between two tables - about 40-60 cm across.",
          "Lay out the full materials table and have teams choose a solution path before they start building.",
          "Plan for three timed test runs with redesign time between them.",
        ],
        materialsPrep: [
          "Give every team the same kind of 'package' object (a small box, eraser, or toy) so results are comparable.",
          "Keep string, tape, and paper clips well stocked - zipline and crane builds use them up fastest.",
        ],
        safetyNotes: [
          "Ziplines need an anchor - use taped-down string or a chair, never anything at head height that could snap back.",
          "Keep feet clear of the hazard zone and run one team's test at a time.",
        ],
        learningObjectives: [
          "Combine structures, motion, materials, and testing into one working system.",
          "Use the full design process, including at least one redesign after a failed run.",
          "Explain the constraints and tradeoffs that shaped their design.",
        ],
        commonFailures: [
          "Building too big to finish and test in time - push for a simple, testable first version.",
          "The package arrives but is damaged, because protection was an afterthought.",
          "A moving part (zipline or crane) with no tension control, so the package sticks or drops.",
        ],
        questionsToAsk: [
          "\"Which earlier lesson does this build use the most?\"",
          "\"What failed on your first run, and what one thing will you change?\"",
          "\"Where is the package most likely to get damaged?\"",
          "\"What tradeoff did you make - speed, strength, or weight?\"",
        ],
        easierVersion:
          "Narrow the hazard zone and steer teams toward the protective-package or bridge paths, which need the fewest moving parts.",
        harderVersion:
          "Require two packages, a longer hazard zone, or a gentle landing with no dropping the package at the end.",
        cleanup: [
          "Untape the hazard zone and recover string, paper clips, and package objects.",
          "Keep the best builds for a showcase and recycle the rest.",
        ],
      },
    },
  ],
}

/** Path to the course overview page. */
export const engineeringFundamentalsPath = `/courses/${engineeringFundamentalsCurriculum.slug}`

/** Path to a single lesson page, e.g. "/courses/engineering-fundamentals/lesson-1". */
export function engineeringLessonPath(slug: string): string {
  return `${engineeringFundamentalsPath}/${slug}`
}

/** Path to a lesson's printable student worksheet. */
export function engineeringWorksheetPath(slug: string): string {
  return `${engineeringLessonPath(slug)}/worksheet`
}

/** Path to a lesson's parent/teacher guide. */
export function engineeringTeacherGuidePath(slug: string): string {
  return `${engineeringLessonPath(slug)}/teacher-guide`
}

/** Looks up a lesson by its slug. */
export function getEngineeringLesson(slug: string): EngineeringLesson | undefined {
  return engineeringFundamentalsCurriculum.lessons.find((lesson) => lesson.slug === slug)
}

/**
 * Resolves a lesson's `comparedMaterials` names into their property rows,
 * preserving the given order and dropping any name without a defined property.
 */
export function getEngineeringMaterialProperties(names: string[]): EngineeringMaterialProperty[] {
  return names
    .map((name) => engineeringFundamentalsCurriculum.materialProperties.find((m) => m.name === name))
    .filter((m): m is EngineeringMaterialProperty => Boolean(m))
}

/** All lesson slugs in order, for generateStaticParams and navigation. */
export function engineeringLessonSlugs(): string[] {
  return engineeringFundamentalsCurriculum.lessons.map((lesson) => lesson.slug)
}

/** The lesson before the given one in course order, or null if it is the first. */
export function previousEngineeringLesson(slug: string): EngineeringLesson | null {
  const lesson = getEngineeringLesson(slug)
  if (!lesson || lesson.order <= 1) return null
  return engineeringFundamentalsCurriculum.lessons.find((l) => l.order === lesson.order - 1) ?? null
}

/** The lesson after the given one in course order, or null if it is the last. */
export function nextEngineeringLesson(slug: string): EngineeringLesson | null {
  const lesson = getEngineeringLesson(slug)
  if (!lesson || lesson.order >= engineeringFundamentalsCurriculum.totalLessons) return null
  return engineeringFundamentalsCurriculum.lessons.find((l) => l.order === lesson.order + 1) ?? null
}
