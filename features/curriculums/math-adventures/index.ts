/**
 * Math Adventures - a 10-week math curriculum for grades 2-5.
 *
 * This file is the single source of truth for the course. Like
 * `engineering-fundamentals.ts` and `science-experiments.ts`, it is intentionally
 * data-driven: the course hub page and the individual weekly lesson pages read
 * from this structure so that content can be reviewed and edited here without
 * touching layout code.
 *
 * Design intent: every week is framed as a themed "adventure" that turns an
 * abstract math idea into something concrete a student can picture, touch, and
 * play with (a number-line hunt, a pizza shop, a graph of real votes). Each week
 * follows the same rhythm - story hook, main lesson, worked examples, an
 * interactive activity, a hands-on challenge, checkpoints, and a stretch problem
 * - so students always know the shape of a lesson. The course builds toward a
 * capstone in Week 10 where students design a paper "math city" that uses every
 * skill from the first nine weeks.
 *
 * Editing guidance:
 * - Keep `materials` to cheap, classroom/home-friendly supplies (paper, coins,
 *   rulers, dice). No week should require a computer to complete.
 * - `examples` are meant to render as worked solutions: show the problem, the
 *   answer, and the reasoning a student can follow.
 * - Weeks build on each other. Place value (Week 4) assumes number sense
 *   (Week 1); the final city (Week 10) assumes everything, so keep the earlier
 *   concepts intact when editing.
 */

/** A single math term and its kid-friendly, concrete definition. */
export type MathVocabTerm = {
  term: string
  definition: string
}

/**
 * One worked example: the problem, the answer, and the reasoning shown step by
 * step so a student (or parent) can follow how the answer was reached.
 */
export type MathExample = {
  /** The problem or prompt, e.g. "Compare 348 and 384". */
  problem: string
  /** The final answer, e.g. "348 < 384". */
  solution: string
  /** Plain-language reasoning for why the answer is correct. */
  explanation: string
}

/** A quick self-check question and its answer, used after the main lesson. */
export type MathCheckpoint = {
  question: string
  answer: string
}

/** A harder, single "boss" problem with a hint and the worked answer. */
export type MathChallengeProblem = {
  prompt: string
  /** A nudge that helps without giving the answer away. */
  hint: string
  answer: string
}

/**
 * The kinds of interactive widget a week can use. Each value names a distinct
 * on-screen activity so a lesson page can pick the right component to render.
 */
export type MathActivityType =
  | "number-line"
  | "card-sort"
  | "input-output-machine"
  | "place-value-builder"
  | "fraction-model"
  | "estimation-station"
  | "shape-explorer"
  | "money-counter"
  | "graph-builder"
  | "city-planner"

/**
 * The interactive activity for a week. `sampleData` and `activityConfig` are
 * both optional and loosely typed on purpose: each activity type reads the
 * shape it needs, and the lesson page decides how to render it.
 */
export type MathInteractiveActivity = {
  /** Which interactive widget this week uses. */
  type: MathActivityType
  title: string
  /** What the student should do, in order. */
  instructions: string[]
  /** One or two sentences tying the activity back to the week's math idea. */
  conceptConnection: string
  /**
   * Optional seed data the widget renders - number lists, card pairs, graph
   * rows, coin sets. Shape varies by activity type.
   */
  sampleData?: unknown
  /** Optional configuration knobs for the widget (ranges, targets, options). */
  activityConfig?: Record<string, unknown>
}

/** The hands-on, off-screen build or game for a week. */
export type MathHandsOnChallenge = {
  title: string
  /** Ordered, plain-language steps a student can follow with an adult. */
  instructions: string[]
  /** What success looks like, so students know when they are done. */
  successLooksLike: string
}

/** One week of the course: a themed math adventure. */
export type MathLesson = {
  /** Stable id, e.g. "math-week-1". */
  id: string
  /** URL slug, e.g. "number-detectives". */
  slug: string
  /** 1-based week position in the course. */
  weekNumber: number
  /** Full lesson title shown in the lesson header. */
  title: string
  /** Compact title for schedules, chips, and prev/next links. */
  shortTitle: string
  /** The adventure framing for the week, e.g. "The Number Detective Agency". */
  theme: string
  /** One or two sentences describing what the week covers. */
  description: string
  /** How long the whole lesson takes, e.g. "45-60 minutes". */
  estimatedTime: string
  /** Grade band this week is tuned for. */
  gradeRange: string
  /** The specific math skills practiced this week. */
  skillFocus: string[]
  /** Concrete "students will be able to..." outcomes. */
  learningGoals: string[]
  /** The core ideas the week is built around. */
  keyConcepts: string[]
  /** A short story hook that opens the lesson. */
  introStory: string
  /** The main teaching, as short paragraphs meant to be read in order. */
  mainLesson: string[]
  /** Worked examples that model the skill. */
  examples: MathExample[]
  /** The on-screen interactive activity. */
  interactiveActivity: MathInteractiveActivity
  /** The off-screen hands-on build or game. */
  handsOnChallenge: MathHandsOnChallenge
  /** Quick checks for understanding after the main lesson. */
  checkpointQuestions: MathCheckpoint[]
  /** An open-ended question that asks students to explain their thinking. */
  reflectionQuestion: string
  /** A single harder "boss" problem for the week. */
  challengeProblem: MathChallengeProblem
  /** An optional stretch task for students who want more. */
  extensionChallenge: string
  /** The week's vocabulary. */
  vocabulary: MathVocabTerm[]
  /** Cheap, common supplies needed for the hands-on parts. */
  materials: string[]
  /** Slug of the next week, or null if this is the last. */
  nextLessonSlug: string | null
  /** Slug of the previous week, or null if this is the first. */
  previousLessonSlug: string | null
  /** Marks the capstone week so pages can frame it differently. */
  isFinalProject: boolean
}

/** Course-level metadata plus the ordered list of weekly lessons. */
export type MathCurriculum = {
  /** Course title for headers and cards. */
  title: string
  /** URL slug for the course landing route. */
  slug: string
  /** One-sentence description for the hub header and metadata. */
  description: string
  /** Grade band the course is designed for. */
  gradeRange: string
  /** Number of weekly lessons in the course. */
  totalWeeks: number
  /** Typical time to complete one week. */
  estimatedTimePerLesson: string
  /** High-level topics covered across the course, for chips and cards. */
  topics: string[]
  /** Title of the Week 10 capstone. */
  finalProjectTitle: string
  /** What students build and demonstrate in the capstone. */
  finalProjectDescription: string
  /** The ten weeks, in order. */
  lessons: MathLesson[]
}

export const mathAdventuresCurriculum: MathCurriculum = {
  title: "Math Adventures",
  slug: "math-adventures",
  description:
    "A 10-week math course for grades 2-5 where each week turns a big math idea - number sense, operations, patterns, place value, fractions, measurement, geometry, time and money, and data - into a hands-on adventure, building up to a final project where students design their own math city.",
  gradeRange: "Grades 2-5",
  totalWeeks: 10,
  estimatedTimePerLesson: "45-60 minutes",
  topics: [
    "Number Sense",
    "Operations",
    "Patterns",
    "Place Value",
    "Fractions",
    "Measurement",
    "Geometry",
    "Time & Money",
    "Data & Graphs",
    "Problem Solving",
  ],
  finalProjectTitle: "Build a Math City",
  finalProjectDescription:
    "Over the final week, students design a paper city on a grid where every part uses math they have learned: buildings are geometric shapes with measured heights, a bakery sells items in fractions, a bank counts money and makes change, and a survey of the city's residents becomes a bar graph. Students present their city and explain the math behind three of its features.",
  lessons: [
    {
      id: "math-week-1",
      slug: "number-detectives",
      weekNumber: 1,
      title: "Number Detectives",
      shortTitle: "Number Detectives",
      theme: "The Number Detective Agency: cracking cases with number clues",
      description:
        "Students become detectives who read the clues inside a number - how big it is, which digits it holds, and how it can be broken apart - to compare, estimate, and identify mystery numbers.",
      estimatedTime: "45-60 minutes",
      gradeRange: "Grades 2-5",
      skillFocus: [
        "Number sense",
        "Comparing numbers",
        "Estimating",
        "Decomposing numbers",
      ],
      learningGoals: [
        "Compare two numbers using greater than (>), less than (<), and equal to (=) by looking at place value from the largest digit first.",
        "Estimate about how many objects are in a group by rounding to the nearest ten or hundred, and explain why an exact count is not always needed.",
        "Decompose a number into hundreds, tens, and ones (for example, 256 = 200 + 50 + 6) and rebuild it.",
      ],
      keyConcepts: [
        "A digit's value depends on its place in the number.",
        "To compare numbers, line them up and check the biggest place first.",
        "Estimating gives a fast, close-enough answer when an exact count is slow.",
      ],
      introStory:
        "The Number Detective Agency just got a case. Someone left a single clue on the door: 'I am a three-digit number. My hundreds digit is 4, my tens digit is bigger than 7, and my ones digit is 0.' The chief hands you a magnifying glass and asks, 'Which numbers could fit?' To close the case, you'll need to read numbers the way a detective reads clues.",
      mainLesson: [
        "Every number is made of digits, and where a digit sits tells you how much it is worth. In 256, the 2 is not just 'two' - it sits in the hundreds place, so it means 200. The 5 is in the tens place, so it means 50, and the 6 in the ones place means 6. Reading a number's places is the detective's first move.",
        "To compare two numbers, line them up by their places and check the biggest place first. Comparing 348 and 384, both have 3 hundreds, so it's a tie there. Move to the tens: 348 has 4 tens, 384 has 8 tens. Eight tens beats four tens, so 384 is greater. We write 348 < 384. The symbol always opens toward the bigger number, like a mouth eating the larger snack.",
        "Sometimes you don't need the exact count - you need a good guess fast. Estimating means rounding to a nearby, friendly number. If a jar looks like it has about 60 marbles, you don't have to count all 58; 'about 60' is close enough to compare jars or plan a game.",
        "Decomposing means breaking a number into its parts. 256 comes apart into 200 + 50 + 6. Detectives do this to see a number's hidden structure, and it makes adding and subtracting much easier later in the course.",
      ],
      examples: [
        {
          problem: "Compare 348 and 384 using >, <, or =.",
          solution: "348 < 384",
          explanation:
            "Hundreds are equal (3 = 3). Move to the tens: 4 tens vs 8 tens. Since 8 tens is more, 384 is the larger number, so 348 is less than 384.",
        },
        {
          problem: "Decompose 407 into hundreds, tens, and ones.",
          solution: "407 = 400 + 0 + 7",
          explanation:
            "The 4 is in the hundreds place (400), there are no tens (0), and the 7 is in the ones place. The 0 is a placeholder that keeps the 4 and 7 in the right spots.",
        },
        {
          problem: "About how many is 58 rounded to the nearest ten?",
          solution: "About 60",
          explanation:
            "58 sits between 50 and 60. Because the ones digit is 8 (which is 5 or more), we round up to 60. 'About 60' is close enough for a quick estimate.",
        },
      ],
      interactiveActivity: {
        type: "number-line",
        title: "Mystery Number Hunt",
        instructions: [
          "Read each clue that appears above the number line.",
          "Drag the detective marker to the spot on the line where the mystery number should be.",
          "Use the 'greater than' and 'less than' hints to narrow the range until only one number is left.",
        ],
        conceptConnection:
          "Placing a number on a line forces you to think about its size compared to its neighbors - the same reasoning you use to compare and estimate.",
        sampleData: {
          rangeStart: 0,
          rangeEnd: 100,
          clues: [
            "The number is greater than 40.",
            "The number is less than 60.",
            "The tens digit is odd.",
            "The ones digit is 0.",
          ],
          answer: 50,
        },
        activityConfig: {
          tickInterval: 10,
          showEstimateBand: true,
        },
      },
      handsOnChallenge: {
        title: "Number Clue Cards",
        instructions: [
          "Write five different three-digit numbers, each on its own index card.",
          "On a second set of cards, write one clue for each number (for example, 'I have 2 hundreds and my ones digit is 9').",
          "Trade clue cards with a partner and try to match each clue to the right number.",
        ],
        successLooksLike:
          "You can explain out loud why a clue matches its number by naming the value in each place (hundreds, tens, ones).",
      },
      checkpointQuestions: [
        {
          question: "Which is greater, 512 or 521? How do you know?",
          answer:
            "521 is greater. The hundreds are equal (5 = 5), but 521 has 2 tens versus 512's 1 ten, so 521 wins at the tens place.",
        },
        {
          question: "Decompose 630 into its parts.",
          answer: "630 = 600 + 30 + 0.",
        },
        {
          question: "Round 43 to the nearest ten.",
          answer: "40, because the ones digit (3) is less than 5, so we round down.",
        },
      ],
      reflectionQuestion:
        "When would estimating be more helpful than counting the exact amount? Describe a real moment when 'about how many' is good enough.",
      challengeProblem: {
        prompt:
          "I am a three-digit number between 300 and 400. My tens digit is double my ones digit, and my ones digit is 3. What number am I?",
        hint: "Start with the ones digit (3), then figure out the tens digit by doubling it. The hundreds digit must keep you between 300 and 400.",
        answer:
          "363. The hundreds digit is 3 (to stay between 300 and 400), the ones digit is 3, and the tens digit is double 3, which is 6.",
      },
      extensionChallenge:
        "Make a 'wanted poster' for a mystery number with exactly four clues so that only one number in the world fits all four. Test it on a family member.",
      vocabulary: [
        { term: "Digit", definition: "One of the symbols 0-9 that make up a number." },
        {
          term: "Place value",
          definition: "How much a digit is worth based on its position (ones, tens, hundreds).",
        },
        {
          term: "Greater than (>)",
          definition: "A symbol showing the number on the left is larger.",
        },
        {
          term: "Less than (<)",
          definition: "A symbol showing the number on the left is smaller.",
        },
        {
          term: "Estimate",
          definition: "A smart, close-enough guess made by rounding to a friendly number.",
        },
        {
          term: "Decompose",
          definition: "To break a number into the parts that make it, like 256 = 200 + 50 + 6.",
        },
      ],
      materials: ["Index cards", "Pencil", "A jar of small objects to estimate (optional)"],
      nextLessonSlug: "operation-quest",
      previousLessonSlug: null,
      isFinalProject: false,
    },
    {
      id: "math-week-2",
      slug: "operation-quest",
      weekNumber: 2,
      title: "Operation Quest",
      shortTitle: "Operation Quest",
      theme: "Four heroes on a quest: Add, Subtract, Multiply, and Divide",
      description:
        "Students meet the four operations as characters with special powers and learn to choose the right one for a story problem - joining, taking away, making equal groups, or sharing.",
      estimatedTime: "45-60 minutes",
      gradeRange: "Grades 2-5",
      skillFocus: [
        "Addition",
        "Subtraction",
        "Multiplication thinking",
        "Division thinking",
        "Choosing operations",
      ],
      learningGoals: [
        "Match a story problem to the right operation by asking what is happening: joining, separating, making equal groups, or sharing equally.",
        "Explain multiplication as repeated equal groups (4 x 3 means four groups of three) and division as splitting into equal groups.",
        "Solve a two-step word problem and explain which operation was used at each step.",
      ],
      keyConcepts: [
        "Addition joins amounts; subtraction finds a difference or takes away.",
        "Multiplication is a fast way to add equal groups.",
        "Division splits a total into equal groups or finds how many are in each group.",
      ],
      introStory:
        "A bridge is out on the road to Math Mountain, and four heroes step up. Add can join two groups into one. Subtract can find what's missing. Multiply can build many equal groups in a flash. Divide can share a treasure fairly. But each hero only works on the right kind of problem - pick the wrong hero and the bridge stays broken. Your quest: send the right hero for each challenge.",
      mainLesson: [
        "The secret to word problems is not the numbers - it's figuring out what is happening in the story. Are two groups coming together? That's addition. Is something being taken away, or are you comparing to find a difference? That's subtraction.",
        "Multiplication is the hero for equal groups. '4 baskets with 3 apples each' is 4 x 3 = 12. Instead of adding 3 + 3 + 3 + 3, you multiply. The clue is the phrase 'each' or 'every' - it signals equal groups.",
        "Division is the sharing and splitting hero. If 12 apples are shared equally among 4 friends, each friend gets 12 / 4 = 3. Division answers two kinds of questions: 'how many in each group?' and 'how many groups can I make?'",
        "Some quests take two steps. 'You have 20 dollars, buy a book for 8, then split the rest with a friend.' Step one is subtraction (20 - 8 = 12). Step two is division (12 / 2 = 6). Naming the operation at each step keeps you from getting lost.",
      ],
      examples: [
        {
          problem: "A class has 6 tables with 4 students at each table. How many students?",
          solution: "6 x 4 = 24 students",
          explanation:
            "The words 'at each table' signal equal groups, so this is multiplication: six groups of four is twenty-four.",
        },
        {
          problem: "There are 15 cookies to share equally among 5 kids. How many each?",
          solution: "15 / 5 = 3 cookies each",
          explanation:
            "Sharing equally is division. Split 15 into 5 equal groups; each group has 3.",
        },
        {
          problem: "A game costs $18. You have $25. How much is left after buying it?",
          solution: "$25 - $18 = $7",
          explanation:
            "Spending money takes an amount away, so this is subtraction. The difference between 25 and 18 is 7.",
        },
      ],
      interactiveActivity: {
        type: "card-sort",
        title: "Pick the Right Hero",
        instructions: [
          "Read each story problem card as it appears.",
          "Drag the card onto the hero it needs: Add, Subtract, Multiply, or Divide.",
          "After sorting, solve two of the problems and check your answers.",
        ],
        conceptConnection:
          "Sorting problems by operation builds the habit of asking 'what is happening here?' before reaching for numbers - the most important skill in word problems.",
        sampleData: {
          problems: [
            { text: "8 red marbles and 5 blue marbles together", operation: "add", answer: 13 },
            { text: "A ribbon 12 cm long, cut off 5 cm", operation: "subtract", answer: 7 },
            { text: "3 rows of 6 chairs", operation: "multiply", answer: 18 },
            { text: "20 stickers shared among 4 kids", operation: "divide", answer: 5 },
          ],
        },
        activityConfig: {
          heroes: ["add", "subtract", "multiply", "divide"],
          shuffle: true,
        },
      },
      handsOnChallenge: {
        title: "Dice Operation Duel",
        instructions: [
          "Roll two dice to get two numbers.",
          "Draw an operation card (+, -, x, or /) from a face-down pile.",
          "Solve the problem your roll and card create; if the card is division and it doesn't divide evenly, re-roll one die.",
          "Score a point for each correct answer and play to 10.",
        ],
        successLooksLike:
          "You can carry out all four operations with small numbers and say a quick word-problem story that matches each roll.",
      },
      checkpointQuestions: [
        {
          question: "Which operation solves '5 bags with 7 apples each'? What is the answer?",
          answer: "Multiplication. 5 x 7 = 35 apples.",
        },
        {
          question: "Write 4 + 4 + 4 as a multiplication.",
          answer: "3 x 4 = 12 (three groups of four).",
        },
        {
          question: "24 pencils split into boxes of 6. How many boxes?",
          answer: "Division: 24 / 6 = 4 boxes.",
        },
      ],
      reflectionQuestion:
        "How can you tell whether a story problem needs multiplication or addition? What word or clue helps you decide?",
      challengeProblem: {
        prompt:
          "A baker makes 4 trays of muffins with 6 muffins on each tray. She sells 9 muffins. How many muffins are left?",
        hint: "This is a two-step quest. First find the total number of muffins, then take away the ones she sold.",
        answer:
          "15 muffins. Step 1: 4 x 6 = 24 muffins made. Step 2: 24 - 9 = 15 muffins left.",
      },
      extensionChallenge:
        "Write your own two-step word problem where the first step is multiplication and the second is subtraction. Give it to someone and check that they name both operations.",
      vocabulary: [
        { term: "Operation", definition: "A math action: adding, subtracting, multiplying, or dividing." },
        { term: "Sum", definition: "The answer to an addition problem." },
        { term: "Difference", definition: "The answer to a subtraction problem." },
        { term: "Product", definition: "The answer to a multiplication problem." },
        { term: "Quotient", definition: "The answer to a division problem." },
        {
          term: "Equal groups",
          definition: "Groups that all have the same number of things, the heart of multiplying and dividing.",
        },
      ],
      materials: ["Two dice", "Index cards for operation symbols", "Pencil and paper"],
      nextLessonSlug: "pattern-machine",
      previousLessonSlug: "number-detectives",
      isFinalProject: false,
    },
    {
      id: "math-week-3",
      slug: "pattern-machine",
      weekNumber: 3,
      title: "Pattern Machine",
      shortTitle: "Pattern Machine",
      theme: "The Pattern Machine: feed it a number, discover its rule",
      description:
        "Students find and extend patterns, skip count, and crack the hidden rule of an input-output machine, learning that a rule you can name lets you predict what comes next.",
      estimatedTime: "45-60 minutes",
      gradeRange: "Grades 2-5",
      skillFocus: [
        "Patterns",
        "Sequences",
        "Skip counting",
        "Input-output rules",
      ],
      learningGoals: [
        "Extend a growing or repeating number pattern and describe its rule in words (for example, 'add 5 each time').",
        "Skip count by 2s, 5s, 10s, 3s, and 4s, and connect skip counting to multiplication.",
        "Figure out the rule of an input-output machine by comparing what goes in with what comes out.",
      ],
      keyConcepts: [
        "A pattern follows a rule, and naming the rule lets you predict the next term.",
        "Skip counting is repeated addition and the foundation of multiplication.",
        "An input-output rule does the same thing to every number you feed it.",
      ],
      introStory:
        "In the back of the workshop sits the Pattern Machine, all gears and dials. Drop a 2 in the top and a 6 rolls out the bottom. Drop in 5, and out comes 15. The machine won't tell you its secret - but if you watch carefully, you can figure out the rule it's using. Once you know the rule, you can predict every number it will ever make.",
      mainLesson: [
        "A pattern is a sequence that follows a rule. In 3, 6, 9, 12, ... the rule is 'add 3 each time.' Once you name the rule, you can jump ahead: the next term is 15, and you didn't have to draw every step to know it.",
        "Skip counting is patterning you already know. Counting by 5s - 5, 10, 15, 20 - is adding 5 over and over. This is exactly why skip counting and multiplication are cousins: counting by 5s four times gets you to 20, and 4 x 5 = 20.",
        "Patterns can repeat (red, blue, red, blue) or grow (2, 4, 8, 16, where the rule is 'double'). The trick is to check what changes from one term to the next. If the same amount is added each time, the rule is 'add that amount.'",
        "An input-output machine applies one rule to every input. If 2 becomes 6 and 5 becomes 15, the machine multiplies by 3. Test your rule on a third pair to be sure - a good rule works for every input, not just one.",
      ],
      examples: [
        {
          problem: "What comes next: 4, 8, 12, 16, ___?",
          solution: "20",
          explanation:
            "Each term goes up by 4 (the rule is 'add 4'). 16 + 4 = 20. This is also skip counting by 4s.",
        },
        {
          problem: "A machine turns 3 into 8, 5 into 10, and 6 into 11. What is its rule?",
          solution: "Add 5",
          explanation:
            "Compare each input to its output: 3 to 8 is +5, 5 to 10 is +5, 6 to 11 is +5. The same rule works for all three, so the rule is 'add 5'.",
        },
        {
          problem: "Skip count by 5s to find 6 x 5.",
          solution: "30",
          explanation:
            "5, 10, 15, 20, 25, 30 - six jumps of five lands on 30, which is exactly 6 x 5.",
        },
      ],
      interactiveActivity: {
        type: "input-output-machine",
        title: "Crack the Machine's Rule",
        instructions: [
          "Watch the machine turn each input number into an output.",
          "After three examples, type your guess for the rule (like 'x 2' or '+ 4').",
          "Feed the machine one more number to test your rule before you lock it in.",
        ],
        conceptConnection:
          "Guessing the rule from input-output pairs is the same reasoning as finding the pattern in a sequence - you look for what stays the same from one step to the next.",
        sampleData: {
          rounds: [
            { rule: "x 2", pairs: [[2, 4], [3, 6], [5, 10]], test: 7, answer: 14 },
            { rule: "+ 4", pairs: [[1, 5], [6, 10], [8, 12]], test: 10, answer: 14 },
            { rule: "x 3", pairs: [[2, 6], [4, 12], [5, 15]], test: 6, answer: 18 },
          ],
        },
        activityConfig: {
          allowedRuleTypes: ["add", "multiply"],
          testsPerRound: 1,
        },
      },
      handsOnChallenge: {
        title: "Build a Pattern Chain",
        instructions: [
          "Use two colors of paper strips or beads to build a repeating pattern at least 12 long.",
          "Next to it, build a growing number pattern using tally marks or dots (start with a rule like 'add 3').",
          "Ask a partner to name both rules and predict the next three terms.",
        ],
        successLooksLike:
          "Your partner can state the rule of each pattern in words and correctly continue it three more steps.",
      },
      checkpointQuestions: [
        {
          question: "Continue the pattern: 10, 20, 30, 40, ___, ___.",
          answer: "50, 60 (the rule is 'add 10', or skip counting by 10s).",
        },
        {
          question: "A machine turns 4 into 12 and 6 into 18. What is the rule?",
          answer: "Multiply by 3 (4 x 3 = 12, 6 x 3 = 18).",
        },
        {
          question: "How is skip counting by 2s related to multiplication?",
          answer: "Each skip adds 2, so counting by 2s five times equals 5 x 2 = 10.",
        },
      ],
      reflectionQuestion:
        "Why is it useful to know the rule of a pattern instead of just the next number? What can a rule do that a single answer cannot?",
      challengeProblem: {
        prompt:
          "A machine turns 1 into 3, 2 into 5, and 3 into 7. What will it do to 10?",
        hint: "This rule has two steps. Notice the output goes up by 2 each time the input goes up by 1 - so multiplying is involved, plus a little extra.",
        answer:
          "21. The rule is 'multiply by 2, then add 1' (1x2+1=3, 2x2+1=5, 3x2+1=7). For 10: 10 x 2 + 1 = 21.",
      },
      extensionChallenge:
        "Invent a two-step machine rule (like 'x 3 then - 1'), make a table of four inputs and outputs, and challenge someone to crack it.",
      vocabulary: [
        { term: "Pattern", definition: "A sequence that follows a rule you can name." },
        { term: "Rule", definition: "The instruction that tells you how to get from one term to the next." },
        { term: "Sequence", definition: "An ordered list of numbers or shapes." },
        {
          term: "Skip counting",
          definition: "Counting forward by the same amount each time, like 5, 10, 15.",
        },
        { term: "Input", definition: "The number you put into a machine or rule." },
        { term: "Output", definition: "The number that comes out after the rule is applied." },
      ],
      materials: ["Colored paper strips or beads", "Pencil and paper for tables"],
      nextLessonSlug: "place-value-city",
      previousLessonSlug: "operation-quest",
      isFinalProject: false,
    },
    {
      id: "math-week-4",
      slug: "place-value-city",
      weekNumber: 4,
      title: "Place Value City",
      shortTitle: "Place Value City",
      theme: "Place Value City: every digit lives on its own street",
      description:
        "Students explore how ones, tens, hundreds, and thousands each have a 'street' in a number, write numbers in expanded form, and compare large numbers by checking the biggest place first.",
      estimatedTime: "45-60 minutes",
      gradeRange: "Grades 2-5",
      skillFocus: [
        "Ones, tens, hundreds, thousands",
        "Expanded form",
        "Comparing numbers",
      ],
      learningGoals: [
        "Identify the value of each digit in numbers up to the thousands place.",
        "Write a number in expanded form (2,345 = 2,000 + 300 + 40 + 5) and back again.",
        "Compare four-digit numbers by starting at the largest place value.",
      ],
      keyConcepts: [
        "Each place is worth ten times the place to its right.",
        "Expanded form shows the value hiding inside every digit.",
        "Comparing starts at the biggest place and moves right until the digits differ.",
      ],
      introStory:
        "Welcome to Place Value City, where every digit has an address. The ones live on Ones Street, the tens on Tens Avenue, the hundreds on Hundreds Boulevard, and the thousands up on Thousands Hill. Move a digit to a new street and its whole value changes - a 7 on Ones Street is worth 7, but move it to Hundreds Boulevard and it's suddenly worth 700. Today you're the city planner.",
      mainLesson: [
        "In our number system, each place is worth ten times the one to its right. Ones, then tens (ten ones), then hundreds (ten tens), then thousands (ten hundreds). That is why moving a digit one street to the left makes it ten times bigger.",
        "In 2,345 the 2 lives on Thousands Hill and is worth 2,000; the 3 is worth 300; the 4 is worth 40; and the 5 is worth 5. Reading each digit by its street is how you find its true value.",
        "Expanded form writes those values out as a sum: 2,345 = 2,000 + 300 + 40 + 5. It makes the hidden structure visible and is a huge help when adding or subtracting big numbers.",
        "To compare two numbers, start at the biggest place and move right until the digits are different. Comparing 3,412 and 3,398: the thousands tie (3 = 3), but at the hundreds place 4 beats 3, so 3,412 is greater. You never have to check the smaller places once you find a difference.",
      ],
      examples: [
        {
          problem: "What is the value of the 6 in 4,682?",
          solution: "600",
          explanation:
            "The 6 sits in the hundreds place (Hundreds Boulevard), so it is worth 6 hundreds, which is 600.",
        },
        {
          problem: "Write 5,207 in expanded form.",
          solution: "5,000 + 200 + 0 + 7",
          explanation:
            "5 thousands + 2 hundreds + 0 tens + 7 ones. The 0 shows there are no tens but keeps the other digits in place.",
        },
        {
          problem: "Compare 3,412 and 3,398.",
          solution: "3,412 > 3,398",
          explanation:
            "Thousands are equal (3 = 3). At the hundreds place, 4 is greater than 3, so 3,412 is the larger number. No need to check tens or ones.",
        },
      ],
      interactiveActivity: {
        type: "place-value-builder",
        title: "Build the Address",
        instructions: [
          "Read the target number shown at the top.",
          "Drag digit tiles onto the correct streets: Thousands, Hundreds, Tens, and Ones.",
          "Check your build by reading the expanded form the city displays.",
        ],
        conceptConnection:
          "Placing each digit on the right street makes the abstract idea of place value physical - you see that the same digit means different amounts on different streets.",
        sampleData: {
          places: ["thousands", "hundreds", "tens", "ones"],
          rounds: [
            { target: 2345, expanded: "2,000 + 300 + 40 + 5" },
            { target: 5207, expanded: "5,000 + 200 + 0 + 7" },
            { target: 1090, expanded: "1,000 + 0 + 90 + 0" },
          ],
        },
        activityConfig: {
          maxPlace: "thousands",
          showExpandedForm: true,
        },
      },
      handsOnChallenge: {
        title: "Place Value Card Flip",
        instructions: [
          "Make four labeled columns on paper: Thousands, Hundreds, Tens, Ones.",
          "Draw digit cards (0-9) and place each one in any column to build a number.",
          "Race a partner to build the largest number possible, then say each number in expanded form to prove whose is bigger.",
        ],
        successLooksLike:
          "You can build a four-digit number, read the value of every digit, and use expanded form to justify which number is larger.",
      },
      checkpointQuestions: [
        {
          question: "What is the value of the 8 in 8,140?",
          answer: "8,000 (it is in the thousands place).",
        },
        {
          question: "Write 3,406 in expanded form.",
          answer: "3,000 + 400 + 0 + 6.",
        },
        {
          question: "Which is greater, 6,721 or 6,712?",
          answer: "6,721. Thousands and hundreds tie; at the tens place 2 beats 1.",
        },
      ],
      reflectionQuestion:
        "Why does the same digit, like 5, mean different amounts in 5,000 and 500 and 50? Explain using the idea of streets or places.",
      challengeProblem: {
        prompt:
          "Use the digits 4, 0, 7, and 2 exactly once each to build the largest possible four-digit number and the smallest possible four-digit number. What is the difference between them?",
        hint: "For the largest, put the biggest digits on the left. For the smallest, put small digits left - but a number can't start with 0.",
        answer:
          "Largest is 7,420 and smallest is 2,047. Their difference is 7,420 - 2,047 = 5,373.",
      },
      extensionChallenge:
        "Extend Place Value City to ten-thousands. Build a five-digit number, write it in expanded form, and explain how far away Ten-Thousands Tower is from Ones Street.",
      vocabulary: [
        { term: "Ones place", definition: "The rightmost place, counting single units." },
        { term: "Tens place", definition: "The place worth ten times the ones." },
        { term: "Hundreds place", definition: "The place worth ten times the tens." },
        { term: "Thousands place", definition: "The place worth ten times the hundreds." },
        {
          term: "Expanded form",
          definition: "A number written as the sum of each digit's value, like 300 + 40 + 5.",
        },
        {
          term: "Standard form",
          definition: "A number written the normal way, with digits side by side, like 345.",
        },
      ],
      materials: ["Digit cards 0-9", "Paper with labeled place-value columns", "Pencil"],
      nextLessonSlug: "fraction-pizza-shop",
      previousLessonSlug: "pattern-machine",
      isFinalProject: false,
    },
    {
      id: "math-week-5",
      slug: "fraction-pizza-shop",
      weekNumber: 5,
      title: "Fraction Pizza Shop",
      shortTitle: "Fraction Pizza Shop",
      theme: "The Fraction Pizza Shop: every slice tells a story",
      description:
        "Students run a pizza shop to learn that a fraction names equal parts of a whole - the denominator tells how many equal parts the whole is cut into, and the numerator tells how many are used - and compare and find equivalent fractions with pizza and fraction-bar models.",
      estimatedTime: "45-60 minutes",
      gradeRange: "Grades 2-5",
      skillFocus: [
        "Fractions as equal parts",
        "Numerator and denominator",
        "Comparing simple fractions",
        "Equivalent fractions",
      ],
      learningGoals: [
        "Explain that the denominator tells how many equal parts a whole is split into and the numerator tells how many of those parts are used.",
        "Compare two fractions with the same denominator, and use a model to compare fractions like 1/2 and 1/3.",
        "Show with pizza or fraction-bar models that fractions such as 1/2 and 2/4 are equivalent.",
      ],
      keyConcepts: [
        "Fractions only work when the parts are equal.",
        "The denominator is the number of equal parts; the numerator is how many you take.",
        "Different fractions can name the same amount (equivalent fractions).",
      ],
      introStory:
        "Business is booming at the Fraction Pizza Shop. A customer orders 'half a pizza,' the next wants 'three fourths,' and a third asks for 'two sixths.' The catch: every pizza must be cut into equal slices, or the orders won't be fair. As today's pizza chef, you'll learn to read every order like a fraction - and to spot when two different orders are secretly the same amount.",
      mainLesson: [
        "A fraction describes equal parts of a whole. The bottom number, the denominator, tells how many equal parts the whole is cut into. The top number, the numerator, tells how many of those parts you are talking about. In 3/4, the pizza is cut into 4 equal slices and you have 3 of them.",
        "Equal parts matter. If you cut a pizza into four pieces but one is huge and three are tiny, you cannot call a small piece '1/4.' A fourth means one of four equal slices. This is the rule that makes fractions fair.",
        "When two fractions have the same denominator, the one with the bigger numerator is bigger - 3/4 is more than 1/4 because you have more of the same-sized slices. When denominators differ, a model helps: cut one pizza into halves and another into thirds, and you can see 1/2 is bigger than 1/3, because splitting into fewer parts makes each part larger.",
        "Some fractions look different but name the same amount. Cut a pizza in half, then cut each half again: now you have four pieces, and two of them (2/4) cover exactly the same amount as the original one half (1/2). Fractions that name the same amount are called equivalent.",
      ],
      examples: [
        {
          problem: "In the fraction 5/8, what does each number mean?",
          solution: "8 = equal parts in the whole; 5 = parts being used",
          explanation:
            "The denominator 8 says the whole is cut into 8 equal slices. The numerator 5 says we are talking about 5 of those slices.",
        },
        {
          problem: "Which is bigger, 2/3 or 1/3?",
          solution: "2/3",
          explanation:
            "Same denominator (thirds), so compare the numerators: 2 slices of the same size are more than 1 slice.",
        },
        {
          problem: "Is 1/2 equivalent to 2/4?",
          solution: "Yes",
          explanation:
            "Cutting each half of a pizza into two makes four equal pieces; two of them (2/4) cover the same amount as one half (1/2), so they are equivalent.",
        },
      ],
      interactiveActivity: {
        type: "fraction-model",
        title: "Fill the Pizza Order",
        instructions: [
          "Read the customer's order, like '3/4 of a pizza.'",
          "Set the number of equal slices to match the denominator, then shade slices to match the numerator.",
          "For bonus rounds, drag a second pizza to show an equivalent fraction for the same order.",
        ],
        conceptConnection:
          "Setting the denominator (slices) and then the numerator (shaded slices) separately makes the two jobs of a fraction concrete and hard to mix up.",
        sampleData: {
          orders: [
            { fraction: "3/4", denominator: 4, numerator: 3 },
            { fraction: "2/6", denominator: 6, numerator: 2, equivalent: "1/3" },
            { fraction: "1/2", denominator: 2, numerator: 1, equivalent: "2/4" },
          ],
        },
        activityConfig: {
          maxSlices: 8,
          showEquivalentHint: true,
        },
      },
      handsOnChallenge: {
        title: "Paper Pizza Fractions",
        instructions: [
          "Cut three paper circles ('pizzas') the same size.",
          "Fold and cut one into halves, one into fourths, and one into eighths, keeping the slices equal.",
          "Build orders by combining slices, then find two different ways to make one half (for example, 2/4 and 4/8).",
        ],
        successLooksLike:
          "You can lay slices on top of each other to prove two fractions are equivalent and explain why the parts must be equal.",
      },
      checkpointQuestions: [
        {
          question: "In 4/6, which number is the denominator and what does it tell you?",
          answer: "6 is the denominator; it tells you the whole is cut into 6 equal parts.",
        },
        {
          question: "Which is larger, 3/5 or 2/5?",
          answer: "3/5, because with equal fifths, three parts are more than two.",
        },
        {
          question: "Name a fraction equivalent to 1/2.",
          answer: "2/4 (also 3/6 or 4/8) - all name the same amount.",
        },
      ],
      reflectionQuestion:
        "Why must the pieces of a pizza be equal before we can call one piece '1/4'? What goes wrong if they aren't equal?",
      challengeProblem: {
        prompt:
          "Maria ate 2/4 of a pizza and Sam ate 1/2 of an identical pizza. Who ate more, or did they eat the same amount? Prove it.",
        hint: "Try drawing both pizzas with equal slices, or find a fraction equivalent to one of the amounts so both have the same denominator.",
        answer:
          "They ate the same amount. 2/4 is equivalent to 1/2, so both ate half the pizza.",
      },
      extensionChallenge:
        "Design a pizza-shop menu with three deals written as fractions, then find an equivalent fraction for each deal so customers see they're getting a fair amount.",
      vocabulary: [
        { term: "Fraction", definition: "A number that names equal parts of a whole." },
        { term: "Numerator", definition: "The top number; how many equal parts you have." },
        { term: "Denominator", definition: "The bottom number; how many equal parts the whole is split into." },
        { term: "Whole", definition: "The complete thing before it is cut into parts." },
        {
          term: "Equivalent fractions",
          definition: "Different fractions that name the same amount, like 1/2 and 2/4.",
        },
        { term: "Equal parts", definition: "Parts that are exactly the same size." },
      ],
      materials: ["Paper circles", "Scissors", "Crayons or markers"],
      nextLessonSlug: "measurement-mission",
      previousLessonSlug: "place-value-city",
      isFinalProject: false,
    },
    {
      id: "math-week-6",
      slug: "measurement-mission",
      weekNumber: 6,
      title: "Measurement Mission",
      shortTitle: "Measurement Mission",
      theme: "Measurement Mission: choose the right tool and unit for the job",
      description:
        "Students measure length, height, weight, and capacity, estimate before they measure, and learn to pick the sensible unit - you measure a pencil in centimeters, not kilometers.",
      estimatedTime: "45-60 minutes",
      gradeRange: "Grades 2-5",
      skillFocus: [
        "Length and height",
        "Weight",
        "Capacity",
        "Estimation",
        "Appropriate units",
      ],
      learningGoals: [
        "Measure length and height with a ruler and read the measurement to the nearest unit.",
        "Choose an appropriate unit for an object (centimeters vs meters, grams vs kilograms, milliliters vs liters).",
        "Estimate a measurement first, then measure, and compare how close the estimate was.",
      ],
      keyConcepts: [
        "Measurement answers 'how much?' - how long, how heavy, how much it holds.",
        "The right unit fits the size of the object.",
        "Estimating first makes you a sharper, faster measurer over time.",
      ],
      introStory:
        "Mission Control has a problem: the plans for the new clubhouse list every size as 'kind of big' and 'sort of heavy.' Builders can't work with that. Your mission is to measure the real thing - the length of the door, the height of the shelf, the weight of the toolbox, and how much water the cooler holds - and report each one with a number and the right unit.",
      mainLesson: [
        "Measuring means comparing an object to a unit and counting how many units fit. A ruler marked in centimeters lets you count how many centimeters long a pencil is. Line up the zero mark with one end and read the number at the other end.",
        "Length and height use units like centimeters and meters. Weight (how heavy) uses grams and kilograms. Capacity (how much a container holds) uses milliliters and liters. Matching the measurement to its unit family is the first step of any measurement.",
        "The right unit fits the object's size. A pencil is about 18 centimeters - measuring it in meters would give a tiny, awkward number like 0.18. A door is about 2 meters - measuring it in centimeters (200) works but meters is friendlier. Big things get big units; small things get small units.",
        "Great measurers estimate first. Before you measure the shelf, guess: 'about 1 meter.' Then measure and compare. Each time you check your guess against the real number, your estimates get sharper - a skill that saves time when you don't need an exact number.",
      ],
      examples: [
        {
          problem: "Which unit is best to measure the length of a classroom: centimeters or meters?",
          solution: "Meters",
          explanation:
            "A classroom is several meters long. Using centimeters would give a huge, clumsy number, so meters is the sensible unit.",
        },
        {
          problem: "A water bottle holds about 500 of what unit?",
          solution: "Milliliters",
          explanation:
            "Capacity of a small bottle is measured in milliliters; 500 mL is half a liter, a typical bottle size.",
        },
        {
          problem: "You estimate a book is 20 cm tall and measure 24 cm. How far off was your estimate?",
          solution: "4 cm",
          explanation:
            "Subtract the estimate from the real measurement: 24 - 20 = 4 cm. Your guess was close, only 4 centimeters short.",
        },
      ],
      interactiveActivity: {
        type: "estimation-station",
        title: "Estimate, Then Measure",
        instructions: [
          "Look at each object shown and pick the best unit from the choices.",
          "Type your estimate for the measurement.",
          "Reveal the real measurement and see how close your estimate was; earn points for good unit choices and close guesses.",
        ],
        conceptConnection:
          "Choosing a unit and estimating before measuring builds number sense about size - you learn what a centimeter, a kilogram, and a liter actually feel like.",
        sampleData: {
          items: [
            { object: "new pencil", quantity: "length", unit: "cm", actual: 18 },
            { object: "classroom door", quantity: "height", unit: "m", actual: 2 },
            { object: "bag of apples", quantity: "weight", unit: "kg", actual: 1 },
            { object: "juice box", quantity: "capacity", unit: "mL", actual: 200 },
          ],
        },
        activityConfig: {
          unitChoices: ["cm", "m", "g", "kg", "mL", "L"],
          scoreCloseness: true,
        },
      },
      handsOnChallenge: {
        title: "Measure the Room Scavenger Hunt",
        instructions: [
          "Make a list of five objects around you (a book, a spoon, a chair, a cup, a shoe).",
          "For each one, first write your estimate and the unit you'll use.",
          "Measure each object with a ruler, scale, or measuring cup and record the real number next to your estimate.",
        ],
        successLooksLike:
          "Your chart shows an estimate, a chosen unit, and a real measurement for each object, and you can point to which estimates were closest.",
      },
      checkpointQuestions: [
        {
          question: "What unit would you use to weigh a watermelon: grams or kilograms?",
          answer: "Kilograms - a watermelon is heavy, so kilograms give a sensible number.",
        },
        {
          question: "Capacity measures what about a container?",
          answer: "How much it can hold (like milliliters or liters of water).",
        },
        {
          question: "You guessed 30 cm and measured 27 cm. How far off were you?",
          answer: "3 cm (30 - 27 = 3).",
        },
      ],
      reflectionQuestion:
        "Why does it matter to pick the right unit? Describe an object and a unit that would be a silly, mismatched pair.",
      challengeProblem: {
        prompt:
          "A ribbon is 2 meters long. You cut off three pieces, each 40 centimeters long. How many centimeters of ribbon are left?",
        hint: "First change 2 meters into centimeters (1 meter = 100 cm). Then subtract the pieces you cut off.",
        answer:
          "80 cm left. 2 meters = 200 cm; three 40-cm pieces = 120 cm cut off; 200 - 120 = 80 cm remaining.",
      },
      extensionChallenge:
        "Measure three family members' heights in centimeters and put them in order from shortest to tallest, then find the difference between the tallest and shortest.",
      vocabulary: [
        { term: "Length", definition: "How long something is from end to end." },
        { term: "Height", definition: "How tall something is from bottom to top." },
        { term: "Weight", definition: "How heavy something is." },
        { term: "Capacity", definition: "How much a container can hold." },
        { term: "Unit", definition: "A standard amount used to measure, like a centimeter or a liter." },
        { term: "Estimate", definition: "A close-enough guess made before measuring exactly." },
      ],
      materials: ["Ruler or tape measure", "Kitchen scale (optional)", "Measuring cup (optional)", "Paper for a chart"],
      nextLessonSlug: "geometry-explorer",
      previousLessonSlug: "fraction-pizza-shop",
      isFinalProject: false,
    },
    {
      id: "math-week-7",
      slug: "geometry-explorer",
      weekNumber: 7,
      title: "Geometry Explorer",
      shortTitle: "Geometry Explorer",
      theme: "Geometry Explorer: mapping the world of shapes",
      description:
        "Students explore 2D and 3D shapes by their attributes - sides, corners, faces, edges, and vertices - and discover lines of symmetry by folding shapes so both halves match.",
      estimatedTime: "45-60 minutes",
      gradeRange: "Grades 2-5",
      skillFocus: [
        "2D shapes",
        "3D shapes",
        "Sides and corners",
        "Faces and edges",
        "Symmetry",
      ],
      learningGoals: [
        "Name 2D shapes by counting their sides and corners (a triangle has 3 sides and 3 corners).",
        "Describe 3D shapes by their faces, edges, and vertices (a cube has 6 faces, 12 edges, 8 vertices).",
        "Find a line of symmetry by folding a shape so both halves match exactly.",
      ],
      keyConcepts: [
        "2D shapes are flat; we count their sides and corners.",
        "3D shapes are solid; we count their faces, edges, and vertices.",
        "A shape has a line of symmetry when it can be folded into two matching halves.",
      ],
      introStory:
        "You're the newest Geometry Explorer, and the map in front of you is covered in shapes nobody has named yet. Some are flat, like the tiles on a floor; others are solid, like blocks you can hold. Your explorer's toolkit is simple: count the sides, count the corners, count the faces and edges - and fold to find hidden symmetry. Every shape you describe correctly gets pinned to the map.",
      mainLesson: [
        "Flat shapes are called 2D (two-dimensional). We identify them by counting sides (the straight edges) and corners, also called vertices (where two sides meet). A triangle has 3 sides and 3 corners; a square has 4 equal sides and 4 corners; a pentagon has 5 sides and 5 corners.",
        "Solid shapes are 3D (three-dimensional) - you can hold them. We describe them by faces (the flat surfaces), edges (where two faces meet), and vertices (the pointed corners). A cube has 6 square faces, 12 edges, and 8 vertices. A rectangular box (rectangular prism) has the same counts but its faces are rectangles.",
        "2D and 3D shapes are related: the faces of a 3D shape are 2D shapes. A cube's faces are squares; a can (cylinder) has two circle faces. Knowing your flat shapes helps you describe the solids they build.",
        "A shape has a line of symmetry if you can fold it so the two halves land exactly on top of each other. A square has 4 lines of symmetry; a rectangle has 2; a heart has 1 (straight down the middle). Folding is the surest test: if the halves don't match, that fold isn't a line of symmetry.",
      ],
      examples: [
        {
          problem: "How many sides and corners does a hexagon have?",
          solution: "6 sides and 6 corners",
          explanation:
            "'Hex' means six. A hexagon has 6 straight sides, and each pair of sides meets at a corner, so it has 6 corners too.",
        },
        {
          problem: "How many faces, edges, and vertices does a cube have?",
          solution: "6 faces, 12 edges, 8 vertices",
          explanation:
            "A cube is like a box with 6 square faces. Each place where two faces meet is an edge (12 of them), and each pointed corner is a vertex (8 of them).",
        },
        {
          problem: "How many lines of symmetry does a rectangle (not a square) have?",
          solution: "2",
          explanation:
            "You can fold a rectangle in half top-to-bottom and left-to-right and both halves match, but the diagonal folds do not match - so there are 2 lines of symmetry.",
        },
      ],
      interactiveActivity: {
        type: "shape-explorer",
        title: "Sort and Fold the Shapes",
        instructions: [
          "Sort each shape into the 2D bin or the 3D bin.",
          "For 2D shapes, enter the number of sides and corners; for 3D shapes, enter faces, edges, and vertices.",
          "Use the fold tool to test each 2D shape for lines of symmetry and count how many it has.",
        ],
        conceptConnection:
          "Sorting by dimension and counting attributes turns shape names into something you can reason about, and the fold tool makes symmetry a thing you see rather than memorize.",
        sampleData: {
          shapes2D: [
            { name: "triangle", sides: 3, corners: 3, linesOfSymmetry: 3 },
            { name: "square", sides: 4, corners: 4, linesOfSymmetry: 4 },
            { name: "rectangle", sides: 4, corners: 4, linesOfSymmetry: 2 },
            { name: "hexagon", sides: 6, corners: 6, linesOfSymmetry: 6 },
          ],
          shapes3D: [
            { name: "cube", faces: 6, edges: 12, vertices: 8 },
            { name: "rectangular prism", faces: 6, edges: 12, vertices: 8 },
            { name: "square pyramid", faces: 5, edges: 8, vertices: 5 },
          ],
        },
        activityConfig: {
          enableFoldTool: true,
        },
      },
      handsOnChallenge: {
        title: "Build and Fold Shapes",
        instructions: [
          "Cut out 2D shapes from paper and fold each one to find all its lines of symmetry; mark each fold line with a pencil.",
          "Build a cube or box from a net (a flattened pattern) and count its faces, edges, and vertices as you fold it up.",
          "Make a shape chart listing each shape and its attributes.",
        ],
        successLooksLike:
          "Your chart correctly lists sides/corners for flat shapes and faces/edges/vertices for solids, and your folded shapes show their true lines of symmetry.",
      },
      checkpointQuestions: [
        {
          question: "What 2D shape has 4 equal sides and 4 corners?",
          answer: "A square.",
        },
        {
          question: "How many edges does a cube have?",
          answer: "12 edges.",
        },
        {
          question: "How many lines of symmetry does a square have?",
          answer: "4 (two through the middles of the sides and two through the corners).",
        },
      ],
      reflectionQuestion:
        "How are 2D and 3D shapes connected? Pick a 3D shape and describe the 2D shapes you see in its faces.",
      challengeProblem: {
        prompt:
          "A shape has 5 faces, 8 edges, and 5 vertices. One face is a square and the rest are triangles. What 3D shape is it?",
        hint: "Picture a shape with a flat bottom and triangle sides that meet at a single point on top.",
        answer:
          "A square pyramid. Its square base plus four triangular faces make 5 faces, and the base's corners plus the top point make 5 vertices.",
      },
      extensionChallenge:
        "Design a symmetrical butterfly or mask by drawing one half, folding, and tracing so both sides match. Then mark its line of symmetry.",
      vocabulary: [
        { term: "2D shape", definition: "A flat shape with length and width, like a triangle or square." },
        { term: "3D shape", definition: "A solid shape you can hold, like a cube or sphere." },
        { term: "Side", definition: "A straight edge of a 2D shape." },
        { term: "Vertex (corner)", definition: "A point where two or more sides or edges meet." },
        { term: "Face", definition: "A flat surface of a 3D shape." },
        { term: "Edge", definition: "The line where two faces of a 3D shape meet." },
        {
          term: "Line of symmetry",
          definition: "A fold line that splits a shape into two matching halves.",
        },
      ],
      materials: ["Paper", "Scissors", "Shape nets to fold (optional)", "Pencil"],
      nextLessonSlug: "time-and-money-challenge",
      previousLessonSlug: "measurement-mission",
      isFinalProject: false,
    },
    {
      id: "math-week-8",
      slug: "time-and-money-challenge",
      weekNumber: 8,
      title: "Time and Money Challenge",
      shortTitle: "Time & Money",
      theme: "The Time and Money Challenge: run your day and your wallet",
      description:
        "Students read clocks, figure out how much time passes between events, count coins and bills, make change, and plan a simple budget - the math people use every single day.",
      estimatedTime: "45-60 minutes",
      gradeRange: "Grades 2-5",
      skillFocus: [
        "Telling time",
        "Elapsed time",
        "Counting money",
        "Making change",
        "Simple budgets",
      ],
      learningGoals: [
        "Tell time on an analog clock to the nearest five minutes and match it to digital time.",
        "Find elapsed time between two times using a number line or counting up (from 2:15 to 3:00 is 45 minutes).",
        "Count a mix of coins and bills, make change by counting up, and plan a purchase within a budget.",
      ],
      keyConcepts: [
        "The short hand shows the hour; the long hand shows the minutes.",
        "Elapsed time is the gap between a start time and an end time.",
        "Making change means counting up from the price to the amount paid.",
      ],
      introStory:
        "You've been handed the keys to run the school store for a day - and a schedule to keep. The bus arrives at 3:00, so you need to know how long until then. A customer buys a 65-cent pencil with a dollar and waits for change. And you have exactly $5 to restock supplies. Time and money run the whole day, and today they run through you.",
      mainLesson: [
        "On an analog clock, the short hand points to the hour and the long hand points to the minutes. Each number the long hand passes is 5 minutes, so when it points to the 3, that's 15 minutes past the hour. '2:15' means the hour is 2 and 15 minutes have passed.",
        "Elapsed time is how much time goes by between a start and an end. To find it, count up. From 2:15 to 3:00, count 45 minutes (15 up to :30 is 15, then to 3:00 is another 30, totaling 45). A number line of times makes this easy to see.",
        "Money is counted by value. A quarter is 25 cents, a dime is 10, a nickel is 5, a penny is 1. Count from the biggest coins down: a quarter, two dimes, and a nickel is 25 + 10 + 10 + 5 = 50 cents. Bills work the same way at a larger scale.",
        "Making change means counting up from the price to what the customer paid. If a pencil costs 65 cents and they pay with a dollar (100 cents), count up: 65 to 70 (a nickel), 70 to 100 (three dimes) - so 35 cents change. A budget takes this further: with $5, you plan purchases so the total stays at or under what you have.",
      ],
      examples: [
        {
          problem: "The hour hand is between 4 and 5, the minute hand points to 6. What time is it?",
          solution: "4:30",
          explanation:
            "The minute hand on the 6 means 30 minutes past (6 x 5 = 30). The hour hand is just past 4, so it's 4:30.",
        },
        {
          problem: "How much time passes from 1:45 to 2:30?",
          solution: "45 minutes",
          explanation:
            "Count up: 1:45 to 2:00 is 15 minutes, then 2:00 to 2:30 is 30 minutes. 15 + 30 = 45 minutes.",
        },
        {
          problem: "An item costs 65 cents and you pay with $1. How much change?",
          solution: "35 cents",
          explanation:
            "Count up from 65 to 100: that's 35 cents. So the change is 35 cents (a quarter and a dime).",
        },
      ],
      interactiveActivity: {
        type: "money-counter",
        title: "Run the School Store",
        instructions: [
          "For each sale, drag coins and bills into the tray to reach the price shown.",
          "When a customer overpays, count up to make the correct change.",
          "Keep your restock budget in view and stop before you go over.",
        ],
        conceptConnection:
          "Building exact amounts and counting up for change turns money into hands-on addition and subtraction with a real purpose.",
        sampleData: {
          coins: [
            { name: "penny", value: 1 },
            { name: "nickel", value: 5 },
            { name: "dime", value: 10 },
            { name: "quarter", value: 25 },
          ],
          bills: [{ name: "one dollar", value: 100 }, { name: "five dollars", value: 500 }],
          sales: [
            { item: "pencil", price: 65, paidWith: 100, change: 35 },
            { item: "eraser", price: 40, paidWith: 100, change: 60 },
            { item: "notebook", price: 150, paidWith: 200, change: 50 },
          ],
          budgetCents: 500,
        },
        activityConfig: {
          currency: "cents",
          makeChangeByCountingUp: true,
        },
      },
      handsOnChallenge: {
        title: "Store and Schedule Role-Play",
        instructions: [
          "Set out play or real coins and price three 'store' items with tags.",
          "Take turns being cashier and customer: pay with coins, and the cashier counts up to make change.",
          "Then make a simple day schedule with three events and figure out the elapsed time between each pair.",
        ],
        successLooksLike:
          "You can make correct change by counting up and state how many minutes pass between two events on your schedule.",
      },
      checkpointQuestions: [
        {
          question: "What time is it when the hour hand is past 7 and the minute hand points to 3?",
          answer: "7:15 (the minute hand on 3 means 15 minutes past).",
        },
        {
          question: "How long from 6:20 to 7:00?",
          answer: "40 minutes (count up: 20 minutes to 6:40, then 20 more to 7:00... 40 minutes total).",
        },
        {
          question: "You buy a 70-cent snack with $1. What is your change?",
          answer: "30 cents.",
        },
      ],
      reflectionQuestion:
        "Why is counting up a helpful way to make change? How is it connected to subtraction?",
      challengeProblem: {
        prompt:
          "You have $5 to spend. You buy a marker for $1.25 and a notebook for $2.50. How much money is left, and could you also buy a $1.50 eraser?",
        hint: "Add the two purchases first, subtract from $5, then compare what's left to the price of the eraser.",
        answer:
          "$1.25 left. The marker and notebook cost $1.25 + $2.50 = $3.75; $5.00 - $3.75 = $1.25. You cannot buy the $1.50 eraser, because $1.25 is not enough.",
      },
      extensionChallenge:
        "Plan a $10 party-snack budget: list at least three items with prices, keep the total at or under $10, and show the change you'd get from a $10 bill.",
      vocabulary: [
        { term: "Analog clock", definition: "A clock with hour and minute hands." },
        { term: "Digital clock", definition: "A clock that shows the time as numbers, like 4:30." },
        { term: "Elapsed time", definition: "The amount of time that passes between a start and an end." },
        { term: "Change", definition: "The money you get back when you pay more than the price." },
        { term: "Budget", definition: "A plan for how much money you can spend." },
        {
          term: "Value",
          definition: "How much a coin or bill is worth, like a quarter being 25 cents.",
        },
      ],
      materials: ["Play or real coins and bills", "Paper price tags", "A clock or drawn clock face"],
      nextLessonSlug: "data-detective",
      previousLessonSlug: "geometry-explorer",
      isFinalProject: false,
    },
    {
      id: "math-week-9",
      slug: "data-detective",
      weekNumber: 9,
      title: "Data Detective",
      shortTitle: "Data Detective",
      theme: "The Data Detective: turning tally marks into answers",
      description:
        "Students collect data with tally charts, display it in bar graphs and pictographs, and read graphs to answer questions and compare categories - finding the story hidden in the numbers.",
      estimatedTime: "45-60 minutes",
      gradeRange: "Grades 2-5",
      skillFocus: [
        "Tally charts",
        "Bar graphs",
        "Pictographs",
        "Interpreting data",
        "Comparing categories",
      ],
      learningGoals: [
        "Collect data with a tally chart and count tallies in groups of five.",
        "Build a bar graph and a pictograph from a data set, including a key for the pictograph.",
        "Read a graph to answer 'how many,' 'which is most/least,' and 'how many more' questions.",
      ],
      keyConcepts: [
        "Data is information we collect, and a chart keeps it organized.",
        "Bar graphs use bar height and pictographs use pictures to compare categories.",
        "Reading a graph means comparing categories and finding differences.",
      ],
      introStory:
        "A mystery is buzzing around the classroom: what is everyone's favorite fruit? Rumors say apples, but the Data Detective doesn't trust rumors - the Data Detective collects evidence. You'll survey the class, make tally marks for every vote, then turn those marks into a graph so clear that anyone can see the answer at a glance.",
      mainLesson: [
        "Data is information we gather to answer a question. To keep it organized, we use a tally chart: one mark for each item, and every fifth mark drawn across the previous four so we can count by fives. Tally marks make counting a big survey fast and accurate.",
        "A bar graph shows data with bars - the taller the bar, the more there is in that category. Bars make it easy to compare: the tallest bar is the 'most' and the shortest is the 'least,' and you can see it in one glance without doing any arithmetic.",
        "A pictograph uses a picture to stand for a number of items, explained by a key (for example, one apple picture = 2 votes). If a row has 3 apple pictures and each stands for 2 votes, that category has 6 votes. The key is essential - without it, you can't tell what the pictures mean.",
        "The real detective work is reading the graph. You answer questions like 'How many chose bananas?', 'Which fruit was most popular?', and 'How many more chose apples than grapes?' That last one is a subtraction: find both bars and take the difference.",
      ],
      examples: [
        {
          problem: "A tally chart shows apples with four vertical marks and one line crossing them. How many votes is that?",
          solution: "5 votes",
          explanation:
            "Four marks with a fifth crossing them is one group of five, which equals 5 votes.",
        },
        {
          problem: "In a pictograph, each apple = 2 votes. A row has 4 apple pictures. How many votes?",
          solution: "8 votes",
          explanation:
            "Multiply the number of pictures by the key value: 4 pictures x 2 votes each = 8 votes.",
        },
        {
          problem: "A bar graph shows apples = 9 and grapes = 4. How many more chose apples?",
          solution: "5 more",
          explanation:
            "Find both bars and subtract: 9 - 4 = 5. Five more people chose apples than grapes.",
        },
      ],
      interactiveActivity: {
        type: "graph-builder",
        title: "From Tallies to Graph",
        instructions: [
          "Enter the survey results as tally marks for each category.",
          "Switch to bar-graph view and drag each bar to the right height.",
          "Switch to pictograph view, set the key, and answer the three questions the detective asks about your data.",
        ],
        conceptConnection:
          "Turning the same data set into tallies, a bar graph, and a pictograph shows that a graph is just an easier-to-read picture of the numbers you collected.",
        sampleData: {
          question: "What is your favorite fruit?",
          results: [
            { category: "Apple", count: 8 },
            { category: "Banana", count: 5 },
            { category: "Grapes", count: 4 },
            { category: "Orange", count: 3 },
          ],
          pictographKey: 2,
          questions: [
            "Which fruit is most popular?",
            "How many chose oranges?",
            "How many more chose apples than grapes?",
          ],
        },
        activityConfig: {
          views: ["tally", "bar", "pictograph"],
          maxCount: 12,
        },
      },
      handsOnChallenge: {
        title: "Run Your Own Survey",
        instructions: [
          "Pick a question with four choices (favorite color, pet, sport, or snack).",
          "Ask at least ten people and record each answer with a tally mark.",
          "Turn your tallies into a bar graph on grid paper, then write two questions your graph can answer.",
        ],
        successLooksLike:
          "Your bar graph has labeled categories and a clear scale, and you can answer 'which is most' and 'how many more' from it.",
      },
      checkpointQuestions: [
        {
          question: "How do tally marks help you count a big survey?",
          answer: "They group counts into fives, so you can count quickly by 5s instead of one by one.",
        },
        {
          question: "In a pictograph where each star = 5, a row has 3 stars. How many is that?",
          answer: "15 (3 stars x 5 = 15).",
        },
        {
          question: "A bar graph shows dogs = 7 and cats = 10. How many more chose cats?",
          answer: "3 more (10 - 7 = 3).",
        },
      ],
      reflectionQuestion:
        "Why is a graph easier to understand than a long list of tally marks? What does a graph let you see quickly?",
      challengeProblem: {
        prompt:
          "A pictograph of pets uses one paw = 4 pets. Dogs have 5 paws, cats have 3 paws, and fish have 2 paws. How many pets are there in all, and which is the most popular?",
        hint: "Find each category's count by multiplying paws by 4, then add all the categories together.",
        answer:
          "40 pets total, and dogs are the most popular. Dogs = 5 x 4 = 20, cats = 3 x 4 = 12, fish = 2 x 4 = 8; 20 + 12 + 8 = 40.",
      },
      extensionChallenge:
        "Collect data on two different days and make two bar graphs side by side. Write one sentence describing how the results changed between the days.",
      vocabulary: [
        { term: "Data", definition: "Information you collect to answer a question." },
        { term: "Tally chart", definition: "A chart that records counts with marks grouped in fives." },
        { term: "Bar graph", definition: "A graph that compares categories using the height of bars." },
        { term: "Pictograph", definition: "A graph that uses pictures to stand for amounts." },
        { term: "Key", definition: "A note telling how many items each picture in a pictograph stands for." },
        { term: "Category", definition: "One group or choice being counted, like 'apples'." },
      ],
      materials: ["Grid paper", "Pencil", "A question to survey", "Ruler for straight bars"],
      nextLessonSlug: "build-a-math-city",
      previousLessonSlug: "time-and-money-challenge",
      isFinalProject: false,
    },
    {
      id: "math-week-10",
      slug: "build-a-math-city",
      weekNumber: 10,
      title: "Build a Math City",
      shortTitle: "Math City",
      theme: "The final project: design a city that runs on math",
      description:
        "Students combine every skill from the course to design a paper city on a grid - geometric buildings with measured heights, a bakery that sells fractions, a bank that makes change, and a survey of residents shown as a graph - then present the math behind it.",
      estimatedTime: "60-90 minutes",
      gradeRange: "Grades 2-5",
      skillFocus: [
        "Geometry",
        "Measurement",
        "Money",
        "Fractions",
        "Operations",
        "Data",
        "Problem solving",
      ],
      learningGoals: [
        "Apply geometry, measurement, fractions, money, operations, and data together to design and build a paper city.",
        "Explain the math behind at least three features of the city using correct vocabulary from the course.",
        "Solve a multi-step planning problem, such as staying within a building budget while meeting a size requirement.",
      ],
      keyConcepts: [
        "Real projects use many kinds of math at the same time.",
        "Planning means using operations, measurement, and money together to meet goals.",
        "Explaining your math clearly is part of finishing a project.",
      ],
      introStory:
        "The mayor of Math City has one job left before the grand opening: the whole city needs to be designed, and it needs to work. Every building is a shape, every street has a length, the bakery sells slices as fractions, the bank makes change, and the city planner wants a graph of what residents like best. You've trained for nine weeks. Now you're the chief designer - build a city that runs on math.",
      mainLesson: [
        "This week you pull together everything you've learned. A city is the perfect project because it needs all of it at once: shapes for buildings, measurements for streets, fractions at the bakery, money at the bank, operations for planning, and data to understand the residents.",
        "Start with geometry and measurement. Draw your city on grid paper. Each building is a 2D or 3D shape - label its sides and corners, or faces and edges - and give it a measured height and a street a measured length. The grid keeps everything to scale.",
        "Add money and fractions. Open a bakery that sells items as fractions of a whole (half a pie, 1/4 of a cake) and a bank that handles purchases and makes change. Set prices and show at least one transaction where a customer pays and receives correct change.",
        "Finish with data and a plan. Survey a few 'residents' (family or classmates) about their favorite part of the city and show the results in a bar graph or pictograph. Then meet a challenge: design your city within a set building budget, using operations to make sure the costs add up correctly. When you present, explain the math behind at least three features.",
      ],
      examples: [
        {
          problem: "A building is a rectangular prism 4 cm tall on a base that is 3 cm by 2 cm. Name its shape and its number of faces.",
          solution: "Rectangular prism, 6 faces",
          explanation:
            "A box shape is a rectangular prism. Like a cube, it has 6 faces (top, bottom, and four sides), plus 12 edges and 8 vertices.",
        },
        {
          problem: "The bakery sells a pie in fourths for 50 cents a slice. A customer buys 3 slices with $2. What is the change?",
          solution: "50 cents change",
          explanation:
            "Three slices at 50 cents each cost 3 x 50 = 150 cents ($1.50). Paying with $2.00: 200 - 150 = 50 cents change.",
        },
        {
          problem: "You have a building budget of $20. A house costs $6, a school $9, and a park $4. Can you build all three?",
          solution: "Yes, with $1 left",
          explanation:
            "Add the costs: 6 + 9 + 4 = 19. Since 19 is less than 20, you can build all three and have 20 - 19 = $1 left in the budget.",
        },
      ],
      interactiveActivity: {
        type: "city-planner",
        title: "Design Math City",
        instructions: [
          "Place building shapes on the grid and set each one's height and base measurements.",
          "Open the bakery and bank: set fraction prices and complete at least one change-making transaction.",
          "Survey residents, turn the results into a graph, and keep your total building cost within the budget shown.",
        ],
        conceptConnection:
          "The city planner brings every unit of the course together, so each choice - a shape, a length, a price, a graph - draws on a different week's math at the same time.",
        sampleData: {
          gridSize: 10,
          buildingCosts: { house: 6, school: 9, park: 4, shop: 5 },
          budget: 20,
          bakeryItems: [
            { item: "pie slice", fraction: "1/4", priceCents: 50 },
            { item: "half cake", fraction: "1/2", priceCents: 120 },
          ],
          surveyQuestion: "Favorite part of Math City?",
          surveyCategories: ["Park", "Bakery", "School", "Shop"],
        },
        activityConfig: {
          requireBudgetCheck: true,
          requireGraph: true,
          minExplainedFeatures: 3,
        },
      },
      handsOnChallenge: {
        title: "Build and Present Your Paper City",
        instructions: [
          "On grid paper or a poster, draw and label your city: shapes for buildings, measured street lengths, a bakery with fraction prices, and a bank.",
          "Run one survey of at least six people and add a bar graph or pictograph of the results to your city.",
          "Prepare a short presentation that explains the math behind three features (for example, the shape of a building, the change made at the bank, and what the graph shows).",
        ],
        successLooksLike:
          "Your finished city uses geometry, measurement, fractions, money, and data, stays within the building budget, and you can clearly explain the math behind three of its parts.",
      },
      checkpointQuestions: [
        {
          question: "Name two kinds of math your city uses and where each shows up.",
          answer:
            "Answers vary; for example, geometry in the building shapes and money at the bank when making change.",
        },
        {
          question: "Your budget is $15 and your buildings cost $12. How much is left?",
          answer: "$3 (15 - 12 = 3).",
        },
        {
          question: "The bakery sells a cake in halves. How many slices are in one whole cake?",
          answer: "2 slices, because halves means two equal parts.",
        },
      ],
      reflectionQuestion:
        "Which math skill from the course was most useful for building your city, and why? What surprised you about using several kinds of math at once?",
      challengeProblem: {
        prompt:
          "Your city has a $30 building budget. You must include a school ($9) and a park ($4), and you want the tallest possible skyscraper with the money left over. A skyscraper is built from blocks that each cost $3 and add 2 cm of height. What is the tallest skyscraper you can afford?",
        hint: "First spend on the required buildings, see how much money is left, then figure out how many whole $3 blocks you can buy and how much height each one adds.",
        answer:
          "10 cm tall. School + park = 9 + 4 = 13, leaving 30 - 13 = 17. Each block costs $3, and $17 buys 5 whole blocks ($15) with $2 left over. Five blocks x 2 cm each = 10 cm.",
      },
      extensionChallenge:
        "Add a public transit line to your city: mark bus stops on the grid, give the route a total measured length, and make a schedule showing the elapsed time between the first and last stop.",
      vocabulary: [
        { term: "Design", definition: "To plan and create something with a purpose." },
        { term: "Scale", definition: "Keeping sizes in proportion, often using a grid." },
        { term: "Budget", definition: "A plan for how much you can spend." },
        { term: "Transaction", definition: "A buy-or-sell exchange of money for goods." },
        {
          term: "Multi-step problem",
          definition: "A problem that takes more than one operation or stage to solve.",
        },
      ],
      materials: ["Grid paper or poster board", "Ruler", "Crayons or markers", "Play money", "Scissors and tape"],
      nextLessonSlug: null,
      previousLessonSlug: "data-detective",
      isFinalProject: true,
    },
  ],
}

/** Path to the course overview (hub) page. */
export const mathAdventuresPath = `/courses/${mathAdventuresCurriculum.slug}`

/** Path to a single week's lesson page, e.g. "/courses/math-adventures/number-detectives". */
export function mathLessonPath(slug: string): string {
  return `${mathAdventuresPath}/${slug}`
}

/** Looks up a lesson by its slug. */
export function getMathLessonBySlug(slug: string): MathLesson | undefined {
  return mathAdventuresCurriculum.lessons.find((lesson) => lesson.slug === slug)
}

/** Looks up a lesson by its 1-based week number. */
export function getMathLessonByWeek(weekNumber: number): MathLesson | undefined {
  return mathAdventuresCurriculum.lessons.find((lesson) => lesson.weekNumber === weekNumber)
}

/** All lesson slugs in course order, for generateStaticParams and navigation. */
export function mathLessonSlugs(): string[] {
  return mathAdventuresCurriculum.lessons.map((lesson) => lesson.slug)
}

/** The lesson after the given one, or null if it is the last week. */
export function getNextMathLesson(slug: string): MathLesson | null {
  const lesson = getMathLessonBySlug(slug)
  if (!lesson || !lesson.nextLessonSlug) return null
  return getMathLessonBySlug(lesson.nextLessonSlug) ?? null
}

/** The lesson before the given one, or null if it is the first week. */
export function getPreviousMathLesson(slug: string): MathLesson | null {
  const lesson = getMathLessonBySlug(slug)
  if (!lesson || !lesson.previousLessonSlug) return null
  return getMathLessonBySlug(lesson.previousLessonSlug) ?? null
}

/** A snapshot of how far through the course a learner is. */
export type MathCourseProgressSummary = {
  /** Total number of weeks in the course. */
  totalWeeks: number
  /** How many weeks have been completed. */
  completedWeeks: number
  /** How many weeks remain. */
  remainingWeeks: number
  /** Completion as a whole-number percent (0-100). */
  percentComplete: number
  /** The next lesson to work on, or null if the course is finished. */
  nextLesson: MathLesson | null
  /** True when every week is complete. */
  allComplete: boolean
}

/**
 * Summarizes course progress from a list of completed lesson slugs. This is a
 * pure helper so both the hub page and a future progress UI can share the same
 * math; it does not read localStorage itself (a hook can pass its stored slugs
 * in, mirroring the pattern used by the engineering and science courses).
 */
export function getMathCourseProgressSummary(
  completedSlugs: string[],
): MathCourseProgressSummary {
  const validSlugs = new Set(mathLessonSlugs())
  const completedWeeks = new Set(completedSlugs.filter((slug) => validSlugs.has(slug))).size
  const totalWeeks = mathAdventuresCurriculum.totalWeeks
  const remainingWeeks = Math.max(0, totalWeeks - completedWeeks)
  const percentComplete =
    totalWeeks === 0 ? 0 : Math.round((completedWeeks / totalWeeks) * 100)

  // The next lesson to resume: the lowest week number not yet completed.
  const nextLesson =
    mathAdventuresCurriculum.lessons.find((lesson) => !completedSlugs.includes(lesson.slug)) ?? null

  return {
    totalWeeks,
    completedWeeks,
    remainingWeeks,
    percentComplete,
    nextLesson,
    allComplete: completedWeeks >= totalWeeks,
  }
}
