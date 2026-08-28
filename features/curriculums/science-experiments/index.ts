/**
 * Science Experiments - a 6-week hands-on science curriculum for grades 2-4.
 *
 * This file is the single source of truth for the course. Like
 * `engineering-fundamentals.ts` and `intro-to-python.ts`, it is intentionally
 * data-driven: the course hub and the per-week lesson pages read from this
 * structure so the science content can be reviewed and edited here without
 * touching layout code.
 *
 * Design intent: this is a real beginner science course, not a single-experiment
 * page. Every week centers on one safe, low-cost experiment and one big science
 * idea, and every week repeats the same investigation loop so students build the
 * habit of thinking like scientists and engineers:
 *
 *     Ask a question -> make a prediction -> test -> observe -> explain -> improve.
 *
 * The course builds logically: it starts with how scientists and engineers think
 * (week 1), then moves through chemistry (week 2), matter and materials (week 3),
 * forces and motion (week 4), machines and structures (week 5), and finishes with
 * life science and ecosystems (week 6).
 *
 * Editing guidance:
 * - Write for grades 2-4: clear and accurate, never talked-down or vague.
 * - Always explain WHY something happens, not just what to do.
 * - Keep `materials` to cheap, home/classroom-friendly supplies.
 * - Keep `safetyNotes` specific to that week's experiment.
 * - The baking-soda volcano lives in the projects system, not here; week 2 links
 *   to it as an optional related project rather than making it the main lesson.
 */

/** A single vocabulary word and its kid-friendly, accurate definition. */
export type ScienceVocabTerm = {
  /** The word students learn this week, e.g. "prediction". */
  term: string
  /** A short, grade 2-4 definition that stays scientifically honest. */
  definition: string
}

/** One step of the shared investigation loop, shown on the hub and lessons. */
export type ScienceLoopStep = {
  /** The loop stage, e.g. "Ask". */
  stage: string
  /** What a student actually does at this stage. */
  description: string
}

/**
 * An optional related project (from the projects system) that a lesson can point
 * to for extra, hands-on practice. Used by week 2 to keep the baking-soda volcano
 * available without making it the main lesson.
 */
export type ScienceRelatedProject = {
  title: string
  /** Route to the existing project page, e.g. "/projects/baking-soda-volcano". */
  href: string
  /** One line on why it connects to this week. */
  note: string
}

/**
 * Which labeled concept diagram a lesson shows. Each maps to one clean, inline
 * SVG figure in `components/ui/science-diagrams.tsx`.
 */
export type ScienceDiagramKind =
  | "paper-helicopter"
  | "balloon-gas"
  | "ice-insulation"
  | "ramp-forces"
  | "triangle-tower"
  | "plant-growth"

/**
 * One weekly lesson: a big question, the science behind it, one experiment that
 * runs the full investigation loop, and the reflection and challenges around it.
 */
export type ScienceLesson = {
  /** 1-based week number, used for ordering and prev/next navigation. */
  week: number
  /** URL slug, e.g. "think-like-a-scientist". Stable and predictable. */
  slug: string
  /** Lesson title shown in the schedule and lesson header. */
  title: string
  /** The driving question the whole lesson works to answer. */
  bigQuestion: string
  /** The core science idea(s) for the week, in teaching order. */
  mainConcepts: string[]
  /** A clear, grade 2-4 explanation of the idea that stays accurate. */
  explanation: string
  /** The words introduced this week, with honest definitions. */
  vocabulary: ScienceVocabTerm[]
  /** Cheap, common supplies needed for this week's experiment. */
  materials: string[]
  /** Specific safety points for this experiment. */
  safetyNotes: string[]
  /** Name of this week's experiment. */
  activityTitle: string
  /** The labeled concept diagram shown with this lesson's experiment. */
  diagram: ScienceDiagramKind
  /**
   * The step-by-step activity flow. Written to walk students through the shared
   * loop (ask, predict, test, observe, explain, improve) using this experiment.
   */
  steps: string[]
  /** Questions to talk through together after the experiment. */
  discussionQuestions: string[]
  /** One prompt a student writes or draws to reflect on what they learned. */
  reflectionPrompt: string
  /** A short "try to..." challenge that pushes the idea a little further. */
  miniChallenge: string
  /** An optional extension for students who want to keep going. */
  extension: string
  /** The accurate "why does this happen" explanation, in kid-friendly words. */
  whyItHappens: string
  /** How an engineer or designer uses this same idea to solve real problems. */
  engineeringConnection: string
  /** Rough session length, e.g. "45-60 minutes". */
  estimatedTime: string
  /** A short, checkable list of what "done" looks like for this lesson. */
  completionChecklist: string[]
  /** Optional related project link (e.g. the volcano in week 2). */
  relatedProject?: ScienceRelatedProject
}

/** The closing content shown after the last lesson is complete. */
export type ScienceCompletion = {
  title: string
  /** A short paragraph celebrating and summarizing what students learned. */
  summary: string
  /** Big-picture reflection prompts that look back across all six weeks. */
  reflectionPrompts: string[]
  /**
   * Sentence-starter prompts a student finishes on the final completion screen,
   * shown only once every lesson is marked complete.
   */
  finalPrompts: string[]
  /** Concrete ways to keep exploring science after the course. */
  nextSteps: string[]
}

/** Top-level course metadata plus the ordered list of weekly lessons. */
export type ScienceCurriculum = {
  /** URL slug for the course landing route. */
  slug: string
  title: string
  subtitle: string
  /** One-sentence description for the hub header and metadata. */
  description: string
  /** Grade band this is designed for. */
  gradeRange: string
  /** Number of weekly lessons in the course. */
  totalLessons: number
  /** How long the whole course runs. */
  duration: string
  /** Typical session length per lesson. */
  estimatedTimePerLesson: string
  /** What a student needs to take part. */
  requirement: string
  /** Short paragraph describing the course for families and teachers. */
  summary: string
  /** What the course is trying to help students do. */
  goals: string[]
  /** Specific skills and understandings students walk away with. */
  learningOutcomes: string[]
  /** The common supplies used across the whole course, as one flat list. */
  materials: string[]
  /** A reassuring note about materials. */
  materialsNote: string
  /** Course-wide safety habits that apply to every experiment. */
  safetyNotes: string[]
  /** The investigation loop every lesson repeats. */
  investigationLoop: ScienceLoopStep[]
  /** Plain-language notes on how the course is structured and run. */
  format: string[]
  /** Closing reflection and completion content. */
  completion: ScienceCompletion
  /** The six weekly lessons, in order. */
  lessons: ScienceLesson[]
}

export const scienceExperimentsCurriculum: ScienceCurriculum = {
  slug: "science-experiments",
  title: "Science Experiments",
  subtitle:
    "Six weeks of hands-on experiments where students learn to think like scientists and engineers - asking questions, testing ideas, and explaining what they find.",
  description:
    "A 6-week hands-on science course for grades 2-4. Each week centers on one safe, low-cost experiment and one big idea, from chemical reactions to forces to living things, all built around the same question-test-explain-improve loop real scientists use.",
  gradeRange: "Grades 2-4",
  totalLessons: 6,
  duration: "6 weeks",
  estimatedTimePerLesson: "45-60 minutes",
  requirement: "Common household materials, no lab or computer needed",
  summary:
    "Students learn science the way scientists actually work: they start with a question, make a prediction, run a fair test, observe carefully, explain what happened with evidence, and then improve their test or design. Each week is one experiment built from cheap, everyday materials - paper, baking soda, ice, a toy car, seeds - paired with one big science idea. The course builds from how scientists and engineers think, through chemistry, matter, forces, and machines, and finishes with living things and ecosystems.",
  goals: [
    "Help students see science as something they do, not just read about.",
    "Build the habit of testing ideas instead of guessing.",
    "Teach real, accurate science ideas in words a second-to-fourth grader understands.",
    "Show how scientists and engineers use the same loop to figure things out and make things better.",
  ],
  learningOutcomes: [
    "Ask a science question and make a prediction before testing.",
    "Run a fair test by changing only one thing at a time.",
    "Observe carefully and record results with words, numbers, or drawings.",
    "Use evidence to explain why something happened.",
    "Improve a test or a design after seeing the results.",
    "Explain a chemical reaction, states of matter, forces and friction, simple machines, and what living things need.",
  ],
  materials: [
    "Paper, index cards, and a few paper clips",
    "Scissors, a ruler or tape measure, and pencils",
    "Baking soda, white vinegar, and a balloon",
    "An empty plastic bottle and a small funnel (or rolled paper)",
    "Ice cubes and a few small cups or containers",
    "Materials to test as insulation: foil, cotton or a sock, paper towel, foam",
    "A toy car or something that rolls, plus a board or stiff cardboard for a ramp",
    "Different surfaces to test: a towel, sandpaper, and a smooth floor",
    "Craft sticks or straws, tape, and small weights like coins or washers",
    "Dried beans or fast-growing seeds, clear cups, and paper towels",
    "A notebook or the printable worksheet to record predictions and results",
  ],
  materialsNote:
    "You do not need everything at once - each week uses only a small handful of supplies, and most weeks list swaps for anything you do not have on hand.",
  safetyNotes: [
    "An adult should be nearby for every experiment.",
    "Never taste or eat experiment materials, even food items like baking soda or seeds.",
    "Keep liquids away from faces and eyes, and wipe up spills right away so no one slips.",
    "Wash hands after each experiment.",
    "Carry and pass scissors with the handle first, and keep them on the table.",
    "Wear safety goggles if you have a pair, especially for the vinegar reaction.",
    "Use only safe, everyday household materials.",
  ],
  investigationLoop: [
    {
      stage: "Ask",
      description: "Start with a real question about what will happen.",
    },
    {
      stage: "Predict",
      description: "Make a smart guess and write it down before you test.",
    },
    {
      stage: "Test",
      description: "Run a fair test, changing only one thing at a time.",
    },
    {
      stage: "Observe",
      description: "Watch closely and record what really happens.",
    },
    {
      stage: "Explain",
      description: "Use your evidence to say why it happened.",
    },
    {
      stage: "Improve",
      description: "Change something and test again to learn more.",
    },
  ],
  format: [
    "One big question and one experiment each week, in an order that builds up ideas.",
    "Every lesson follows the same loop: ask, predict, test, observe, explain, improve.",
    "Students record predictions and results, then compare them.",
    "All experiments use cheap, common materials and need no lab or computer.",
    "Weeks connect: the way of thinking from week 1 is used in every week after it.",
  ],
  completion: {
    title: "You think like a scientist and an engineer",
    summary:
      "Over six weeks you did real science. You made a helicopter fall slowly, filled a balloon with gas you made yourself, kept ice frozen longer, raced a car down a ramp, built a machine or a tower, and grew a living thing. Every time, you used the same loop: you asked a question, made a prediction, ran a fair test, observed closely, explained your results with evidence, and improved your work. That loop is what scientists and engineers use every day - and now you can use it on any question you have.",
    reflectionPrompts: [
      "Which experiment surprised you the most, and why?",
      "Which prediction turned out to be wrong? What did being wrong teach you?",
      "Where in your everyday life have you seen one of these science ideas?",
      "If you could redo one experiment to test something new, what would you change?",
    ],
    finalPrompts: [
      "My favorite experiment was...",
      "The biggest surprise was...",
      "One thing I learned about science was...",
      "One design I improved was...",
      "One experiment I want to try next is...",
      "I can think like a scientist by...",
      "I can think like an engineer by...",
    ],
    nextSteps: [
      "Pick your favorite week and design a brand-new fair test for it.",
      "Teach one experiment to a family member and explain why it happens.",
      "Start a science notebook and write down questions you want to test next.",
      "Try one of the related projects, like building a baking-soda volcano.",
    ],
  },
  lessons: [
    {
      week: 1,
      slug: "think-like-a-scientist",
      title: "Think Like a Scientist and Engineer",
      bigQuestion: "How do scientists and engineers figure out what is true and make their ideas better?",
      mainConcepts: [
        "Scientists ask questions, make predictions, test their ideas, observe the results, and use evidence to explain what they find.",
        "Engineers solve problems by creating something, testing it, and improving the design.",
        "A fair test changes only one thing at a time so you know what made the difference.",
      ],
      explanation:
        "A scientist is anyone who asks a careful question about the world and then finds a way to test the answer instead of just guessing. An engineer takes what scientists learn and uses it to build and improve things that solve problems. Both of them use the same trick: they change one thing, test it, watch what happens, and try again. This week you will drop a paper helicopter - a folded paper twirler that spins as it falls - and figure out how to make it fall as slowly as you can. To do that, you cannot just guess. You have to run a fair test: keep everything the same except the one thing you want to study, so you know exactly what changed the result.",
      vocabulary: [
        {
          term: "Prediction",
          definition: "A smart guess about what will happen, made before you test it.",
        },
        {
          term: "Observation",
          definition: "Something you notice by watching closely, using your senses.",
        },
        {
          term: "Variable",
          definition: "The one thing you change in a test, like how long the blades are.",
        },
        {
          term: "Fair test",
          definition: "A test where you change only one thing and keep everything else the same.",
        },
        {
          term: "Evidence",
          definition: "What you observe and record that helps prove your explanation is true.",
        },
        {
          term: "Redesign",
          definition: "Changing your design after a test to make it work better.",
        },
      ],
      materials: [
        "2 sheets of paper",
        "Scissors",
        "A ruler",
        "A few paper clips",
        "A timer or phone stopwatch",
        "A safe spot to drop from, like standing next to a chair (with an adult)",
      ],
      safetyNotes: [
        "Have an adult help with any drop from up high - do not climb on wobbly furniture.",
        "Keep the drop area clear so no one walks underneath.",
        "Carry scissors with the point down and cut on a table.",
      ],
      activityTitle: "Paper Helicopter Drop Test",
      diagram: "paper-helicopter",
      steps: [
        "Ask: Which paper helicopter will fall the slowest? That is the question you are testing.",
        "Cut a strip of paper about 3 cm wide and 20 cm long. Cut a slit halfway down and fold the two top flaps out in opposite directions to make the blades. Slide one paper clip onto the bottom.",
        "Predict: Do you think longer blades or shorter blades will make it fall slower? Write down your prediction before you test.",
        "Test fairly: Drop the helicopter from the same height every time and change only ONE thing - the blade length. Do not push it; just let go.",
        "Observe: Time how many seconds it takes to reach the floor and watch how it spins. Do this a few times to be sure.",
        "Record your results next to your prediction.",
        "Improve: Make a second helicopter with a different blade length and test it the same way. Which one falls slower now?",
      ],
      discussionQuestions: [
        "Was your prediction right? How do you know?",
        "What one thing did you change, and what did you keep the same?",
        "Why would it be unfair to change the blade length AND the height at the same time?",
        "What made the helicopter fall more slowly?",
      ],
      reflectionPrompt:
        "Draw your best paper helicopter and write one sentence about what made it fall the slowest.",
      miniChallenge:
        "Using only one sheet of paper, design the helicopter that stays in the air the longest. Time it to prove it.",
      extension:
        "Add a second and third paper clip, one at a time, and test how extra weight changes the fall. Keep everything else the same.",
      whyItHappens:
        "As the helicopter falls, gravity pulls it down, but the air pushes up against the angled blades and makes them spin. A spinning helicopter pushes against a lot of air, and that air resistance slows it down - so it drifts instead of dropping. Longer blades catch more air and spin more, so they usually fall more slowly. Adding weight makes gravity's pull win a little more, so it falls faster.",
      engineeringConnection:
        "Engineers who design real helicopters, parachutes, and even the spinning 'helicopter' seeds that fall from maple trees all use the same idea: shape and air resistance can control how fast something falls. And just like you, engineers change one thing at a time and test again - that is called redesign.",
      estimatedTime: "45-60 minutes",
      completionChecklist: [
        "I asked a question and wrote a prediction before testing.",
        "I ran a fair test by changing only one thing.",
        "I recorded how long my helicopter took to fall.",
        "I explained why my helicopter fell slowly or quickly.",
        "I redesigned it and tested again.",
      ],
    },
    {
      week: 2,
      slug: "chemical-reactions",
      title: "Chemical Reactions",
      bigQuestion: "What happens when two things mix together and make something brand new?",
      mainConcepts: [
        "Some mixtures do not just sit together - they react and make something new.",
        "Baking soda and vinegar react to make a gas called carbon dioxide.",
        "Bubbles and gas can be evidence that a chemical reaction happened.",
      ],
      explanation:
        "When you mix sand and water, you still have sand and water - you could dry it out and get them back. That is just a mixture. But some things do something different when they meet: they react and make a brand-new substance that was not there before. Baking soda and vinegar do exactly this. When they touch, they react and make carbon dioxide, a gas you cannot see. This week you will trap that gas inside a balloon. The fizzing and the balloon puffing up are your evidence that a real chemical reaction happened - not just a mix.",
      vocabulary: [
        {
          term: "Chemical reaction",
          definition: "When substances combine and change into something new.",
        },
        {
          term: "Gas",
          definition: "A form of matter, like air, that spreads out to fill its space.",
        },
        {
          term: "Carbon dioxide",
          definition: "The gas made when baking soda and vinegar react. It is in the air too.",
        },
        {
          term: "Evidence",
          definition: "What you see or measure that shows something really happened.",
        },
        {
          term: "Matter",
          definition: "Anything that takes up space, including solids, liquids, and gases.",
        },
      ],
      materials: [
        "1 tablespoon of baking soda",
        "About half a cup of white vinegar",
        "A balloon",
        "An empty plastic water bottle",
        "A small funnel, or a piece of paper rolled into one",
        "A measuring spoon",
      ],
      safetyNotes: [
        "Vinegar can sting eyes - keep it away from faces and do not splash it.",
        "Never drink the vinegar or eat the baking soda.",
        "An adult should help stretch the balloon over the bottle.",
        "Do this over a sink or tray, and wipe up spills so no one slips.",
      ],
      activityTitle: "Balloon Gas Reaction",
      diagram: "balloon-gas",
      steps: [
        "Ask: Can two things you mix make enough gas to blow up a balloon? That is your question.",
        "Pour about half a cup of vinegar into the empty bottle.",
        "Use the funnel to put 1 tablespoon of baking soda inside the balloon.",
        "Predict: How big do you think the balloon will get? Draw or write your prediction first.",
        "Stretch the mouth of the balloon over the top of the bottle, but keep the baking soda up in the balloon so it does not fall in yet.",
        "Test: Lift the balloon straight up so the baking soda drops down into the vinegar.",
        "Observe: Watch the mixture fizz and the balloon fill up. Notice how big it gets compared to your prediction.",
        "Improve: Try again with a little more or a little less baking soda and see how the balloon size changes.",
      ],
      discussionQuestions: [
        "What did you see, hear, or feel that tells you a reaction happened?",
        "Where did the gas that filled the balloon come from?",
        "Was the fizzing a new thing, or was it just the baking soda and vinegar mixing?",
        "What do you think would happen with twice as much baking soda?",
      ],
      reflectionPrompt:
        "Write or draw what happened to the balloon, and explain in one sentence where the gas came from.",
      miniChallenge:
        "Figure out the amounts of baking soda and vinegar that fill the balloon the biggest without popping it.",
      extension:
        "Test whether warm vinegar makes the reaction go faster than cold vinegar. Keep the amounts the same so it is a fair test.",
      whyItHappens:
        "Baking soda and vinegar are made of tiny pieces. When they meet, those pieces rearrange and form new substances - one of them is carbon dioxide gas. A gas takes up much more space than the liquid did, so it rises up and fills the balloon. The fizzing bubbles you see are that gas escaping the liquid. Because a brand-new substance is made, this is a chemical reaction, not just a mixture.",
      engineeringConnection:
        "Engineers and bakers use gas-making reactions on purpose. Baking soda is what makes bread, muffins, and pancakes rise - the carbon dioxide makes tiny bubbles inside. Some fire extinguishers and party poppers also use fast gas reactions. Controlling how much and how fast is an engineering job.",
      estimatedTime: "45-60 minutes",
      completionChecklist: [
        "I predicted how big the balloon would get.",
        "I mixed the baking soda and vinegar safely.",
        "I observed the fizzing and the balloon filling up.",
        "I can explain that the gas is carbon dioxide made by a reaction.",
        "I tested a new amount to see what changed.",
      ],
      relatedProject: {
        title: "Baking Soda Volcano",
        href: "/projects/baking-soda-volcano",
        note: "Want to see the same reaction on a bigger scale? Build a baking-soda volcano - it uses the exact same carbon dioxide reaction you made in the balloon.",
      },
    },
    {
      week: 3,
      slug: "states-of-matter",
      title: "States of Matter and Materials",
      bigQuestion: "Why do some things stay cold longer than others?",
      mainConcepts: [
        "Matter can be a solid, a liquid, or a gas.",
        "Ice melting is a state change - solid water turning into liquid water.",
        "Materials have properties, and some materials slow down heat better than others.",
      ],
      explanation:
        "Everything around you is matter, and matter usually comes in three forms: solid, liquid, and gas. Water is special because you can see it as all three - ice is solid, water is liquid, and steam is gas. When ice melts, it is not disappearing; it is changing from a solid into a liquid. That change happens because heat moves into the ice from the warmer room. This week you will try to slow that down. Different materials - foil, cotton, a paper towel - let heat move through them at different speeds. A material that slows heat down is called an insulator, and finding the best one is your job.",
      vocabulary: [
        {
          term: "Solid",
          definition: "Matter that keeps its own shape, like an ice cube.",
        },
        {
          term: "Liquid",
          definition: "Matter that flows and takes the shape of its container, like water.",
        },
        {
          term: "Gas",
          definition: "Matter that spreads out to fill its space, like steam or air.",
        },
        {
          term: "State change",
          definition: "When matter changes form, like a solid melting into a liquid.",
        },
        {
          term: "Insulation",
          definition: "A material that slows down heat moving from one place to another.",
        },
        {
          term: "Heat",
          definition: "Energy that moves from warmer things to cooler things.",
        },
      ],
      materials: [
        "3 or more ice cubes that are the same size",
        "Small cups or containers, one per material",
        "Materials to test: foil, cotton or a sock, a paper towel, foam or a plastic bag",
        "A plate or tray to catch melt water",
        "A timer",
      ],
      safetyNotes: [
        "Ice is very cold - do not hold it against your skin for a long time.",
        "Melt water makes floors slippery, so wipe up drips right away.",
        "Keep the cups on a tray so water does not spread everywhere.",
      ],
      activityTitle: "Ice Melt Insulation Challenge",
      diagram: "ice-insulation",
      steps: [
        "Ask: Which material will keep an ice cube frozen the longest?",
        "Wrap each ice cube in a different material. Leave one ice cube with nothing wrapped around it - that one is your control to compare against.",
        "Predict: Rank the materials from best to worst at keeping the ice cold. Write your ranking down.",
        "Test fairly: Use same-size ice cubes, put them all in the same room, and start them at the same time.",
        "Observe: Check every 10 minutes. Notice which cubes are melting fastest and which are still solid.",
        "Record which material kept its ice frozen the longest, and how much melt water each one made.",
        "Improve: Take your best material and add a second layer, or combine two materials, and test if the ice lasts even longer.",
      ],
      discussionQuestions: [
        "Which material was the best insulator? Which was the worst?",
        "Why do you think the bare ice cube (the control) matters?",
        "Where does the heat that melts the ice come from?",
        "Which of these materials do you have in your winter clothes?",
      ],
      reflectionPrompt:
        "Write which material kept the ice frozen longest and one sentence explaining why you think it worked best.",
      miniChallenge:
        "Design a mini 'cooler' out of the materials you have that keeps an ice cube frozen the longest.",
      extension:
        "Test whether an ice cube melts faster in a sunny spot or a shady spot. Keep the cubes the same size.",
      whyItHappens:
        "The room is warmer than the ice, and heat always moves from warmer things to cooler things. When heat moves into the ice, it gives the solid water enough energy to change into liquid water - that is melting. Good insulators like cotton and foam are full of trapped air, and trapped air is very slow at passing heat along. So the ice inside stays cold longer. Thin, tightly packed materials let heat through faster, so that ice melts sooner.",
      engineeringConnection:
        "Engineers use insulation everywhere: inside coolers and thermoses to keep things cold or hot, inside the walls of houses to save energy, and in winter coats to keep your body heat in. Choosing the right material for the job is exactly what you did in this challenge.",
      estimatedTime: "45-60 minutes",
      completionChecklist: [
        "I set up same-size ice cubes with different materials and one bare control.",
        "I predicted which material would work best.",
        "I checked and recorded the melting over time.",
        "I can name the solid-to-liquid state change and explain melting.",
        "I improved my best insulator and tested again.",
      ],
    },
    {
      week: 4,
      slug: "forces-motion-friction",
      title: "Forces, Motion, and Friction",
      bigQuestion: "What makes things speed up, slow down, or stop?",
      mainConcepts: [
        "A force is a push or a pull.",
        "Gravity is a force that pulls objects down, including down a ramp.",
        "Friction is a force that slows motion when two surfaces rub together.",
        "The texture of a surface changes how far or fast something moves across it.",
      ],
      explanation:
        "Nothing moves or stops on its own - it takes a force, which is just a push or a pull. Gravity is a pull that tugs everything toward the ground. When you put a toy car at the top of a ramp, gravity pulls it down, and it speeds up. But when the car reaches the floor, it does not roll forever. Another force, friction, works against the motion. Friction happens when two surfaces rub against each other, and it slows things down. This week you will race a car down a ramp onto different surfaces and see how much the surface changes how far it travels.",
      vocabulary: [
        {
          term: "Force",
          definition: "A push or a pull that can start, stop, or change motion.",
        },
        {
          term: "Gravity",
          definition: "The force that pulls objects down toward the ground.",
        },
        {
          term: "Friction",
          definition: "A force that slows motion when two surfaces rub together.",
        },
        {
          term: "Motion",
          definition: "When something is moving from one place to another.",
        },
        {
          term: "Surface",
          definition: "The outside layer of something, like the top of a floor or a towel.",
        },
      ],
      materials: [
        "A toy car or anything that rolls",
        "A board or piece of stiff cardboard for a ramp",
        "A few books to prop the ramp up",
        "A tape measure or ruler",
        "Surfaces to test: bare floor, a towel, sandpaper, and foil",
        "Tape to hold surfaces flat",
      ],
      safetyNotes: [
        "Keep the ramp steady so it does not slide or tip.",
        "Clear the path so the car does not roll into anyone.",
        "Do not roll heavy objects toward feet or off high tables.",
      ],
      activityTitle: "Ramp Racer Surface Test",
      diagram: "ramp-forces",
      steps: [
        "Ask: On which surface will the car roll the farthest after leaving the ramp?",
        "Build a ramp by propping a board on some books. Mark a starting line at the top.",
        "Predict: Order the surfaces from 'car rolls farthest' to 'car stops soonest.' Write it down.",
        "Test fairly: Let the car go from the same starting line every time without pushing it, and keep the ramp the same height. Change only the surface at the bottom.",
        "Observe: Measure how far the car travels past the end of the ramp on each surface.",
        "Record each distance next to your prediction.",
        "Improve: Try to make the car go even farther - lift the ramp higher, or pick the smoothest surface - and test what actually helps most.",
      ],
      discussionQuestions: [
        "Which surface let the car roll farthest? Which stopped it fastest?",
        "Why is it important to let the car go instead of pushing it?",
        "What force pulled the car down the ramp? What force slowed it at the bottom?",
        "Where do you feel friction in real life?",
      ],
      reflectionPrompt:
        "Write which surface let the car travel farthest and explain why using the word friction.",
      miniChallenge:
        "Set a target line on the floor and adjust your ramp so the car stops as close to it as you can.",
      extension:
        "Raise the ramp higher and measure how the extra height changes the distance. Keep the same car and surface.",
      whyItHappens:
        "Gravity pulls the car down the ramp, giving it motion and speed. When the car reaches the floor, friction between its wheels and the surface pushes back against that motion and slows it down. Rough or soft surfaces like sandpaper and a towel grip the wheels more, so there is more friction and the car stops sooner. Smooth surfaces have less friction, so the car keeps rolling farther. A higher ramp gives gravity more of a head start, so the car starts faster.",
      engineeringConnection:
        "Engineers use friction on purpose when they want things to stop or grip - like the rubber on shoe soles, car brakes, and tires. They also work to reduce friction when they want things to move easily - like wheels, slides, and the smooth blades of ice skates. Knowing when you want more or less friction is a real engineering choice.",
      estimatedTime: "45-60 minutes",
      completionChecklist: [
        "I built a ramp and kept it the same height for each test.",
        "I predicted how each surface would change the distance.",
        "I measured how far the car rolled on each surface.",
        "I can explain the roles of gravity and friction.",
        "I changed something and tested to make the car go farther or hit a target.",
      ],
    },
    {
      week: 5,
      slug: "simple-machines-structures",
      title: "Simple Machines, Structures, and Stability",
      bigQuestion: "How can simple tools and smart shapes help us do hard jobs?",
      mainConcepts: [
        "Simple machines make work easier.",
        "Ramps, levers, wheels, and pulleys help us move or lift things.",
        "Structures are stronger when they have a stable base and use support shapes like triangles.",
        "Good designs are tested and then improved.",
      ],
      explanation:
        "A simple machine is a simple tool that makes a hard job easier - like a ramp, a lever, a wheel, or a pulley. A lever, for example, is a stiff bar that turns on a resting point, and it lets a small push lift a heavy load. Structures like towers and bridges have a different job: they have to hold weight without falling. A wide base keeps a structure from tipping, and triangles are the secret shape that keeps it from bending. This week you choose your challenge: build a simple machine that lifts a weight, or build a structure that stands tall and strong. Either way, you will test it and then make it better.",
      vocabulary: [
        {
          term: "Simple machine",
          definition: "A simple tool that makes work easier, like a lever or a ramp.",
        },
        {
          term: "Lever",
          definition: "A stiff bar that turns on a resting point to lift or move a load.",
        },
        {
          term: "Pulley",
          definition: "A wheel with a rope over it that helps lift things.",
        },
        {
          term: "Structure",
          definition: "Something built to hold weight or stand up, like a tower or bridge.",
        },
        {
          term: "Stable",
          definition: "Steady and hard to tip over.",
        },
        {
          term: "Brace",
          definition: "A support, often a triangle shape, that stops a structure from bending.",
        },
      ],
      materials: [
        "For a machine: a ruler and a pencil for a lever, or a spool and string for a pulley",
        "Small weights to lift, like a stack of coins or a small toy",
        "For a structure: index cards, straws, or craft sticks",
        "Tape",
        "A ruler",
        "Coins or washers to test how much weight it holds",
      ],
      safetyNotes: [
        "Keep fingers out from under levers and weights when they drop.",
        "Keep test weights small and low so nothing heavy falls on anyone.",
        "Cut and pass scissors safely, point down.",
      ],
      activityTitle: "Mini Machine or Tower Challenge (pick one)",
      diagram: "triangle-tower",
      steps: [
        "Ask: How can a simple machine or a strong shape help me lift or hold more? Pick the machine path or the tower path.",
        "Machine path: Lay a ruler across a pencil to make a lever. Put a small weight on one end.",
        "Tower path: Build the tallest tower you can from cards or straws and tape that can still hold a weight on top.",
        "Predict: For the lever, guess where to put the pencil to lift the weight most easily. For the tower, guess how many coins it will hold. Write it down.",
        "Test: For the lever, press the other end and slide the pencil to different spots. For the tower, add coins one at a time until it bends or tips.",
        "Observe: Notice which pencil position made lifting easiest, or how many coins the tower held before it failed.",
        "Improve: Move the pencil closer to the weight, or add triangle braces and a wider base to the tower, then test again.",
      ],
      discussionQuestions: [
        "What made lifting the weight easier, or what made the tower stronger?",
        "Why do you think triangles hold up better than squares?",
        "Where does a wide base help something stay standing?",
        "What simple machines have you used today without noticing?",
      ],
      reflectionPrompt:
        "Draw your machine or tower and label the part that did the most work to make the job easier.",
      miniChallenge:
        "Machine path: lift the heaviest weight you can with your lever. Tower path: build the tower that holds the most coins.",
      extension:
        "Add a second simple machine - like a pulley to lift your load - or combine a ramp and a lever to move something.",
      whyItHappens:
        "A lever turns on its resting point, called a fulcrum. When you move the fulcrum closer to the load, a small push on the far end can lift a big weight - the machine trades a longer push for an easier one. Structures work differently: a wide base spreads the weight out and lowers the chance of tipping, and triangles keep their shape under weight while squares fold and bend. That is why braced, wide-based towers hold so much more.",
      engineeringConnection:
        "Engineers build these ideas into real life every day: seesaws and bottle openers are levers, cranes and flagpoles use pulleys, wheelchair ramps are inclined planes, and bridges and skyscrapers are braced with triangles and wide bases. And like you, engineers always test a design and then improve it.",
      estimatedTime: "50-60 minutes",
      completionChecklist: [
        "I built a simple machine or a structure.",
        "I made a prediction before testing it.",
        "I tested how much it could lift or hold.",
        "I can explain how a lever, or a wide base and triangles, made the job easier.",
        "I improved my design and tested it again.",
      ],
    },
    {
      week: 6,
      slug: "life-science-ecosystems",
      title: "Life Science and Ecosystems",
      bigQuestion: "What do living things need to grow and survive?",
      mainConcepts: [
        "Living things need water, air, light, space, and the right environment to survive.",
        "Plants and animals interact with the living and nonliving parts of their ecosystem.",
        "Scientists observe living systems over time to learn how they change.",
        "Engineers can design tools that help living things grow or survive.",
      ],
      explanation:
        "Living things - plants, animals, even you - need certain things to stay alive: water, air, light, space, and a place that suits them. All of the living and nonliving things in one area, working together, make an ecosystem. A garden has plants and bugs (living) and also soil, water, and sunlight (nonliving), and they all depend on each other. Unlike a one-day experiment, living things change slowly, so scientists watch them over days and weeks. This week you will grow a seed and change one thing about how it lives, then observe over time which conditions help it grow best.",
      vocabulary: [
        {
          term: "Living",
          definition: "Something that grows, needs food or water, and can make more of itself, like a plant.",
        },
        {
          term: "Nonliving",
          definition: "Something that is not alive, like water, rocks, or sunlight.",
        },
        {
          term: "Ecosystem",
          definition: "All the living and nonliving things in one area, working together.",
        },
        {
          term: "Environment",
          definition: "The surroundings a living thing lives in.",
        },
        {
          term: "Germinate",
          definition: "When a seed starts to grow and sprout into a plant.",
        },
        {
          term: "Survive",
          definition: "To stay alive by getting what you need.",
        },
      ],
      materials: [
        "A few dried beans or fast-growing seeds",
        "Clear cups or resealable plastic bags",
        "Paper towels",
        "Water",
        "A sunny windowsill and a dark spot like a cupboard",
        "A notebook to record what you see each day",
      ],
      safetyNotes: [
        "Do not eat the seeds or beans, even though they are food.",
        "Wash your hands after handling seeds, soil, or wet paper towels.",
        "Wipe up any water so no one slips.",
      ],
      activityTitle: "Seed Growth Lab",
      diagram: "plant-growth",
      steps: [
        "Ask: What does a seed need to grow best - water, light, or both?",
        "Fold a damp paper towel into each clear cup and tuck a seed against the side so you can watch it.",
        "Set up seeds with different conditions: one with water and light, one with water in the dark, and one with light but no water.",
        "Predict: Which seed do you think will grow best? Write down your prediction.",
        "Test fairly: Keep the seeds the same and change only one condition at a time.",
        "Observe over time: Check every day for about a week. Draw and measure what you see, and write the date.",
        "Explain and improve: Compare the seeds, explain which conditions helped, then design a better setup and grow another seed to test it.",
      ],
      discussionQuestions: [
        "Which seed grew the best, and which grew the worst?",
        "What happened to the seed with no water? With no light?",
        "Why do scientists have to watch this experiment for many days?",
        "What living and nonliving things did your seed need?",
      ],
      reflectionPrompt:
        "Draw how your best seed changed over the week and write one sentence about what living things need.",
      miniChallenge:
        "Design the best growing setup you can and predict how tall your seed will grow in one week.",
      extension:
        "Build a mini ecosystem in a clear jar with soil, a small plant, and a little water, and observe how it changes over two weeks.",
      whyItHappens:
        "A seed holds a tiny baby plant and a small store of food. When it gets water, air, and warmth, it germinates - the baby plant wakes up, uses its stored food, and sprouts. Once leaves appear, the plant needs light to make its own food and keep growing. That is why the seed with no water cannot start, and the seed in the dark sprouts but then grows weak and pale. What you see is direct evidence of what living things need to survive.",
      engineeringConnection:
        "Engineers design tools that help living things grow and survive: greenhouses that trap warmth and light, drip systems that water plants slowly, self-watering pots, and even habitats and shelters for animals. Understanding what living things need is the first step to designing something that helps them.",
      estimatedTime: "45-60 minutes (plus daily check-ins for a week)",
      completionChecklist: [
        "I set up seeds with different conditions and one fair change.",
        "I predicted which seed would grow best.",
        "I observed and recorded the seeds over several days.",
        "I can explain what living things need to survive.",
        "I designed a better setup and tested it.",
      ],
    },
  ],
}

/** Path to the course overview page. */
export const scienceExperimentsPath = `/courses/${scienceExperimentsCurriculum.slug}`

/** Path to a single lesson page, e.g. "/courses/science-experiments/chemical-reactions". */
export function scienceLessonPath(slug: string): string {
  return `${scienceExperimentsPath}/${slug}`
}

/** Path to a lesson's printable student worksheet. */
export function scienceWorksheetPath(slug: string): string {
  return `${scienceLessonPath(slug)}/worksheet`
}

/** Path to a lesson's parent/teacher guide. */
export function scienceTeacherGuidePath(slug: string): string {
  return `${scienceLessonPath(slug)}/teacher-guide`
}

/** Looks up a lesson by its slug. */
export function getScienceLesson(slug: string): ScienceLesson | undefined {
  return scienceExperimentsCurriculum.lessons.find((lesson) => lesson.slug === slug)
}

/** Looks up a lesson by its week number. */
export function getScienceWeek(week: number): ScienceLesson | undefined {
  return scienceExperimentsCurriculum.lessons.find((lesson) => lesson.week === week)
}

/** All lesson slugs in order, for generateStaticParams and navigation. */
export function scienceLessonSlugs(): string[] {
  return scienceExperimentsCurriculum.lessons.map((lesson) => lesson.slug)
}

/** The lesson before the given one in course order, or null if it is the first. */
export function previousScienceLesson(slug: string): ScienceLesson | null {
  const lesson = getScienceLesson(slug)
  if (!lesson || lesson.week <= 1) return null
  return scienceExperimentsCurriculum.lessons.find((l) => l.week === lesson.week - 1) ?? null
}

/** The lesson after the given one in course order, or null if it is the last. */
export function nextScienceLesson(slug: string): ScienceLesson | null {
  const lesson = getScienceLesson(slug)
  if (!lesson || lesson.week >= scienceExperimentsCurriculum.totalLessons) return null
  return scienceExperimentsCurriculum.lessons.find((l) => l.week === lesson.week + 1) ?? null
}
