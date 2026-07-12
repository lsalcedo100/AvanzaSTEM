/**
 * Intro to AI — Week 6: AI Design Studio (capstone week).
 *
 * Authored content only; conforms to the types in `intro-to-ai-types.ts`. Every
 * id is stable and unique (prefixed by the owning lesson id). No interactive
 * engines are wired up yet, so each activity is a `briefing`.
 *
 * This is the final week. It prepares students for the separate Final Project
 * studio and Final Assessment (authored elsewhere): defining a real problem,
 * deciding whether AI fits, designing inputs/outputs/labels/features/rules,
 * prototyping and testing, and presenting responsibly.
 */
import type { CourseWeek, Lesson } from "./intro-to-ai-types.ts"

const lessonChooseTheRightProblem: Lesson = {
  id: "w6l1",
  slug: "choose-the-right-problem",
  order: 1,
  title: "Choose the Right Problem and Tool",
  summary:
    "Start a design project the way real teams do: name a user need, write a clear problem definition, and decide whether AI is even the right tool for the job.",
  estimatedTime: "50-60 minutes",
  objectives: [
    { id: "w6l1-o1", text: "Turn a user need into a clear, one-sentence problem definition." },
    { id: "w6l1-o2", text: "Judge AI suitability: decide whether a problem is a good fit for AI or for fixed rules." },
    { id: "w6l1-o3", text: "Name the input and output your project would use." },
    { id: "w6l1-o4", text: "Explain why choosing the right problem matters before building anything." },
  ],
  materials: [
    { id: "w6l1-m1", name: "This lesson in a web browser", optional: false },
    { id: "w6l1-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w6l1-m3", name: "Your notes from Weeks 1-5", optional: true, note: "For recalling how AI learns from examples." },
  ],
  vocabulary: [
    { id: "w6l1-v1", term: "User need", definition: "A real problem a specific person or group has that they want solved, described from their point of view." },
    { id: "w6l1-v2", term: "Problem definition", definition: "A clear, one-sentence statement of exactly what you are trying to solve and for whom." },
    { id: "w6l1-v3", term: "AI suitability", definition: "How well a problem fits AI, which learns patterns from many examples, versus a fixed rule a person can just write." },
    { id: "w6l1-v4", term: "Input", definition: "The information the system would take in, like a photo, a sentence, or a set of numbers." },
    { id: "w6l1-v5", term: "Output", definition: "The result the system would give back, like a label, a prediction, or a suggestion." },
  ],
  openingScenario: {
    id: "w6l1-open",
    prompt: "A school club says, 'We want to use AI!' But for what? A design team never starts with the tool — it starts with a person who has a problem. Whose problem would your project solve, and what exactly is it?",
    context: "This week you plan a real project. Everything starts with the problem, not the technology.",
  },
  predictionPrompt: {
    id: "w6l1-pred",
    prompt: "Predict: of these two ideas — 'sort library book photos into fiction and non-fiction' and 'unlock a door with the correct password' — which one is a better fit for AI?",
    howToCheck: "As you read, ask whether each task is too messy for a person to write exact rules, or whether one clear rule already solves it.",
  },
  concepts: [
    {
      id: "w6l1-c1",
      title: "Start with a user need, not a tool",
      body: [
        "Good projects begin with a real person who has a real problem — a user need. 'Kids in my class forget which recycling bin to use' is a user need. 'I want to use AI' is not; it names a tool, not a problem.",
        "When you start from a user need, you can tell later whether your project actually helped. You describe the need from the user's point of view: who they are, and what is hard for them right now.",
      ],
      examples: [
        "A gardener can't tell which leaves show plant disease",
        "New students get lost finding classrooms on their first day",
        "A pen-pal club gets messages in languages members don't read",
      ],
    },
    {
      id: "w6l1-c2",
      title: "Write a clear problem definition",
      body: [
        "Once you have a user need, you write a problem definition: one clear sentence that says exactly what you are solving and for whom. A sharp definition keeps a project from drifting. 'Help sixth graders sort classroom waste into recycling, compost, and trash from a photo' is specific enough to build and to test.",
        "A vague definition like 'make recycling better' can't be tested — you would never know if you succeeded. A good problem definition names the user, the task, and what a good result looks like.",
      ],
      examples: [
        "Vague: 'Help with plants.' Clear: 'Tell a gardener whether a tomato leaf photo looks healthy or diseased.'",
        "Vague: 'Make school easier.' Clear: 'Give a new student directions to a room from its number.'",
      ],
    },
    {
      id: "w6l1-c3",
      title: "Decide AI suitability: is AI even the right tool?",
      body: [
        "Not every problem needs AI. AI shines when a task is too messy to write exact rules for but you have many examples to learn from — like telling healthy leaves from diseased ones in photos. A problem that one clear rule already solves does not need AI: 'unlock if the password matches' is a rule, not a learning task.",
        "To judge AI suitability, ask three questions: Is the task too messy for hand-written rules? Could you collect many labeled examples? And is it okay if the system is sometimes wrong? If the answers are yes, AI may fit. If a simple rule works, use the rule — it is cheaper, clearer, and easier to check.",
      ],
      examples: [
        "Good fit for AI: sorting photos of waste into recycling, compost, or trash.",
        "Bad fit for AI: turning on the hallway lights at 7:00 a.m. — that's a fixed rule.",
        "Bad fit for AI: a task where being wrong even once could seriously hurt someone.",
      ],
    },
  ],
  workedExample: {
    id: "w6l1-we",
    title: "From a fuzzy wish to a buildable project",
    steps: [
      "Start with the wish: 'I want to use AI to help the recycling club.'",
      "Find the user need: club members and other students often put waste in the wrong bin because they can't tell what's recyclable.",
      "Write the problem definition: 'Help students decide which of three bins — recycling, compost, or trash — an item belongs in, from a photo of the item.'",
      "Name input and output: Input is a photo of one item; Output is a label — 'recycling', 'compost', or 'trash'.",
      "Check AI suitability: Too messy for exact rules? Yes, items vary a lot. Can you collect many labeled photos? Yes. Okay to be sometimes wrong (a person still checks)? Yes. AI fits.",
    ],
    takeaway: "A buildable project has a real user need, a one-sentence problem definition, a named input and output, and a yes on AI suitability.",
  },
  visuals: [
    {
      id: "w6l1-vis1",
      kind: "decision-tree",
      title: "Should this problem use AI?",
      summary:
        "A decision tree for AI suitability. Start: 'Can one clear rule solve it?' If yes, use a rule, not AI. If no, ask 'Can you collect many labeled examples?' If no, AI probably won't work yet. If yes, ask 'Is it okay if it's sometimes wrong, with a person checking?' If no, be very cautious or don't use AI. If yes, AI may be a good fit.",
      caption: "Use a rule when a rule works; save AI for messy tasks with examples and human checking.",
    },
    {
      id: "w6l1-vis2",
      kind: "table",
      title: "Problem definition checklist",
      summary:
        "A table of what a strong problem definition includes. User: names a specific person or group. Task: says exactly what to decide or produce. Input: names what the system takes in. Output: names what it gives back. Testable: you could tell later whether it worked.",
      table: {
        columns: ["Part", "Question it answers", "Weak example", "Strong example"],
        rows: [
          ["User", "Who has this problem?", "'People'", "'New sixth-grade students'"],
          ["Task", "What exactly are we solving?", "'Help with directions'", "'Give a route to a room from its number'"],
          ["Input", "What goes in?", "'Some info'", "'A room number'"],
          ["Output", "What comes out?", "'An answer'", "'Step-by-step directions'"],
        ],
      },
    },
  ],
  activity: {
    id: "w6l1-act",
    kind: "problem-tool-fit",
    title: "Problem-Tool Fit Studio",
    goal: "Choose a project problem, write its problem definition, and decide whether AI is the right tool.",
    status: "briefing",
    overview:
      "You will review a set of candidate problems, pick one (or bring your own user need), and turn it into a buildable project brief: a user need, a one-sentence problem definition, a named input and output, and a decision about AI suitability. This is the seed of your Final Project.",
    steps: [
      "Read the candidate problems and choose one that interests you, or write your own user need.",
      "Write the user need from the user's point of view: who they are and what is hard.",
      "Write a one-sentence problem definition naming the user, the task, and what a good result looks like.",
      "Name the input and the output your system would use.",
      "Run the AI-suitability check and write one sentence: does AI fit, or would a simple rule do?",
    ],
    materials: ["Paper and pencil, or a notes app"],
    successCriteria: [
      "A user need written from the user's point of view.",
      "A one-sentence problem definition that names the user, task, and a testable result.",
      "A named input and output.",
      "A clear AI-suitability decision with a one-sentence reason.",
    ],
    dataset: {
      id: "w6l1-act-ds",
      name: "Candidate project problems",
      description: "A built-in set of starter problems for the studio: sort classroom waste from a photo, flag plant-disease leaves, group lost-and-found items, translate pen-pal messages, sort library books by topic, and 'unlock a locker with a password' (a rules-only trap to reject). Each card lists a rough user, a possible input, and a possible output.",
      columns: ["Problem", "Possible user", "Possible input", "Possible output"],
      rowCount: 8,
    },
  },
  knowledgeCheck: {
    id: "w6l1-kc",
    instructions: "Check that you can define a problem and judge whether AI fits it.",
    passThreshold: 2,
    questions: [
      {
        id: "w6l1-kc-q1",
        kind: "single",
        prompt: "Which is the strongest problem definition?",
        explanation: "A strong problem definition names the user, the exact task, and a result you could test later.",
        choices: [
          { id: "w6l1-kc-q1-a", text: "Use AI to make the school better.", correct: false, explanation: "This names a tool and a wish, not a specific user, task, or testable result." },
          { id: "w6l1-kc-q1-b", text: "Help new students find a classroom by giving directions from its room number.", correct: true, explanation: "Correct — it names the user (new students), the task (directions), and a testable result." },
          { id: "w6l1-kc-q1-c", text: "Do something cool with photos.", correct: false, explanation: "There is no user, no task, and nothing you could test." },
          { id: "w6l1-kc-q1-d", text: "Make recycling better for everyone.", correct: false, explanation: "It's too vague — you could never tell whether it worked." },
        ],
      },
      {
        id: "w6l1-kc-q2",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "If one clear rule already solves a problem, you should still use AI because AI is more advanced.",
        answer: false,
        explanation: "False — if a simple rule works, use the rule. It is cheaper, clearer, and easier to check than AI.",
      },
      {
        id: "w6l1-kc-q3",
        kind: "scenario",
        prompt: "Which project is the best fit for AI?",
        scenario: "A club is choosing between: (A) ring a bell exactly when class ends, or (B) tell from a photo whether a plant leaf looks healthy or diseased.",
        explanation: "The bell is one clear time rule. Telling healthy leaves from diseased ones is messy and needs many labeled examples, which fits AI.",
        choices: [
          { id: "w6l1-kc-q3-a", text: "Ringing a bell when class ends", correct: false, explanation: "That's a fixed time rule — no learning needed, so AI doesn't fit." },
          { id: "w6l1-kc-q3-b", text: "Telling a healthy leaf from a diseased one in a photo", correct: true, explanation: "Correct — it's too messy for hand rules and has learnable examples, so AI fits." },
          { id: "w6l1-kc-q3-c", text: "Both fit AI equally well", correct: false, explanation: "The bell is a simple rule and doesn't need AI." },
        ],
      },
    ],
  },
  challenge: {
    id: "w6l1-ch",
    title: "Three problems, one keeper",
    prompt: "Come up with three user needs, then pick the one that best fits AI and defend your choice.",
    steps: [
      "Write three different user needs, each from a real user's point of view.",
      "For each, name a possible input and output.",
      "Run the AI-suitability check on all three and choose the best fit.",
      "Write two sentences defending why your keeper fits AI better than the others.",
    ],
    successCriteria: [
      "Three user needs, each with an input and output.",
      "An AI-suitability decision for each.",
      "A chosen problem with a two-sentence defense.",
    ],
  },
  reflection: [
    { id: "w6l1-r1", prompt: "Why is it tempting to start with the tool ('let's use AI') instead of the problem, and what goes wrong when you do?" },
    { id: "w6l1-r2", prompt: "Which part of writing a problem definition was hardest: naming the user, the task, or the testable result?" },
  ],
  recap: {
    id: "w6l1-recap",
    summary: "Great AI projects start from a real user need, a clear problem definition, and an honest check of whether AI is the right tool at all.",
    keyPoints: [
      "A user need describes a real person's problem, not a tool you want to use.",
      "A problem definition names the user, the task, the input, the output, and a testable result.",
      "Judge AI suitability: use a rule when a rule works; save AI for messy tasks with many examples.",
    ],
  },
  extension: {
    id: "w6l1-ext",
    title: "Opportunity or hype?",
    gradeBand: "7-8",
    body: [
      "Companies sometimes add 'AI' to a product mostly for marketing, even when a simple rule would work better. That can waste money and make a product harder to trust and check.",
      "Find a real product or app that advertises an 'AI' feature. Decide whether the task truly needs AI or whether a fixed rule would do. Write a short paragraph explaining your judgment.",
    ],
  },
}

const lessonPlanPrototypeTest: Lesson = {
  id: "w6l2",
  slug: "plan-prototype-test",
  order: 2,
  title: "Plan, Prototype, and Test",
  summary:
    "Turn your problem into a plan you can build and check: design the inputs, outputs, features, labels, and rules; make a simple prototype; and test it with real test cases.",
  estimatedTime: "50-65 minutes",
  objectives: [
    { id: "w6l2-o1", text: "Design your system's inputs, outputs, features, labels, and any rules." },
    { id: "w6l2-o2", text: "Explain what a prototype is and make a simple one on paper." },
    { id: "w6l2-o3", text: "Write test cases and use them to find limitations." },
    { id: "w6l2-o4", text: "Improve your design through iteration based on what the tests show." },
  ],
  materials: [
    { id: "w6l2-m1", name: "This lesson in a web browser", optional: false },
    { id: "w6l2-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w6l2-m3", name: "Your problem definition from Lesson 1", optional: true, note: "You'll build the plan on top of it." },
  ],
  vocabulary: [
    { id: "w6l2-v1", term: "Feature", definition: "One measurable clue about an input that a system uses to decide, like an item's color, shape, or size." },
    { id: "w6l2-v2", term: "Label", definition: "The correct answer attached to an example, like tagging a photo 'recycling' so the system can learn from it." },
    { id: "w6l2-v3", term: "Rule", definition: "An exact instruction a person writes, like 'if the item is a glass bottle, label it recycling'." },
    { id: "w6l2-v4", term: "Prototype", definition: "A quick, rough first version of an idea, made to test how it works before building the real thing." },
    { id: "w6l2-v5", term: "Test case", definition: "One example with a known correct answer that you run through your prototype to check whether it works." },
    { id: "w6l2-v6", term: "Iteration", definition: "Repeating the cycle of build, test, and improve so the design gets better each time." },
  ],
  openingScenario: {
    id: "w6l2-open",
    prompt: "You have a problem definition: sort a photo of waste into recycling, compost, or trash. What clues (features) would the system look at? What labels would you teach it? And how would you know, before building anything real, whether your plan is any good?",
    context: "In this lesson you turn your idea into a plan you can actually test on paper.",
  },
  predictionPrompt: {
    id: "w6l2-pred",
    prompt: "Predict: when you first test your prototype with tricky examples, will it get most of them right, or will it fail on some? What kind of example do you think will trip it up?",
    howToCheck: "After you write and 'run' your test cases, compare what actually happened to your prediction.",
  },
  concepts: [
    {
      id: "w6l2-c1",
      title: "Design the pieces: inputs, outputs, features, labels, and rules",
      body: [
        "Before building, design the pieces. The input is what goes in (a photo of one item). The output is what comes out (a label: recycling, compost, or trash). The labels are the set of correct answers you would teach the system and use to check it.",
        "Features are the clues the system uses to decide — an item's material, shape, or whether it's wet or greasy. If part of the task is simple and clear, you can even add a rule: 'if it's a clean glass bottle, label it recycling.' A good plan names all of these so anyone could understand how a decision gets made.",
      ],
      examples: [
        "Input: photo of one item. Output: one of three labels.",
        "Features: material, is-it-wet, is-it-paper, has-food-on-it.",
        "Rule: 'if it's a banana peel, label it compost.'",
      ],
    },
    {
      id: "w6l2-c2",
      title: "A prototype is a rough first version made to test",
      body: [
        "A prototype is a quick, rough version of your idea built to learn from — not the finished product. Yours can be on paper: a set of 'if these features, then this label' cards, or a simple flowchart a classmate could follow by hand. The point is to make the idea concrete enough to try.",
        "Prototypes are meant to be imperfect. Making one cheaply, early, saves you from spending lots of effort building the wrong thing. You can throw a prototype away and that's fine — you kept what you learned.",
      ],
      examples: [
        "A paper flowchart: 'Is it paper? Is it wet? → label.'",
        "A stack of decision cards a friend can follow without you explaining.",
        "A hand-drawn sketch of the app screen showing input and output.",
      ],
    },
    {
      id: "w6l2-c3",
      title: "Test cases reveal limitations, and iteration fixes them",
      body: [
        "A test case is one example with a known correct answer. You run it through your prototype and see if it gets the right label. A handful of good test cases — including tricky ones — quickly shows where your design breaks. Those weak spots are its limitations: the situations where it gets things wrong or can't decide.",
        "Every system has limitations; the goal is to find them on purpose, not be surprised by them later. When a test case fails, you improve the design and test again. That repeat-until-better loop is iteration — the heart of how real products get built.",
      ],
      examples: [
        "Test case: a greasy pizza box. Correct label: trash or compost, not recycling.",
        "Limitation found: the prototype labels all boxes 'recycling', so greasy ones are wrong.",
        "Iteration: add a feature 'has food grease?' and a rule to send greasy boxes elsewhere.",
      ],
    },
  ],
  workedExample: {
    id: "w6l2-we",
    title: "Prototyping and testing a waste sorter",
    steps: [
      "Design the pieces: Input = photo of one item; Output = recycling / compost / trash; Features = material, is-it-paper, is-it-wet, has-food-grease.",
      "Build a paper prototype: decision cards — 'If food scrap → compost. If clean paper or clean bottle → recycling. Else → trash.'",
      "Write test cases with known answers: clean water bottle (recycling), banana peel (compost), greasy pizza box (trash), foil chip bag (trash).",
      "Run the tests by hand: the prototype gets the bottle and banana peel right but labels the greasy pizza box 'recycling' — a failure.",
      "Find the limitation and iterate: add a 'has-food-grease?' feature and a rule so greasy paper goes to trash. Re-run the test cases; now the pizza box passes.",
    ],
    takeaway: "Design the pieces, make a rough prototype, test it with known-answer cases, find its limitations, and iterate until it improves.",
  },
  visuals: [
    {
      id: "w6l2-vis1",
      kind: "flow",
      title: "The build-test-improve loop",
      summary:
        "A loop of four steps that repeats. Step 1: Design the pieces (input, output, features, labels, rules). Step 2: Build a rough prototype. Step 3: Run test cases and record which pass and fail. Step 4: Find limitations and improve. An arrow leads from step 4 back to step 2, showing iteration.",
      caption: "Iteration means going around this loop more than once, improving each time.",
    },
    {
      id: "w6l2-vis2",
      kind: "table",
      title: "A test-case sheet",
      summary:
        "A table of test cases for the waste sorter. Each row has an example, its known correct label, the label the prototype gave, and pass or fail. Clean water bottle: correct recycling, got recycling, pass. Banana peel: correct compost, got compost, pass. Greasy pizza box: correct trash, got recycling, fail. Foil chip bag: correct trash, got trash, pass.",
      table: {
        columns: ["Test case", "Correct label", "Prototype's label", "Result"],
        rows: [
          ["Clean water bottle", "Recycling", "Recycling", "Pass"],
          ["Banana peel", "Compost", "Compost", "Pass"],
          ["Greasy pizza box", "Trash", "Recycling", "Fail"],
          ["Foil chip bag", "Trash", "Trash", "Pass"],
        ],
      },
    },
  ],
  activity: {
    id: "w6l2-act",
    kind: "prototype-plan",
    title: "Prototype Plan Studio",
    goal: "Turn your problem definition into a designed, prototyped, and tested plan you can present.",
    status: "briefing",
    overview:
      "Using your problem from Lesson 1, you will design the inputs, outputs, features, labels, and any rules; sketch a paper prototype; write at least four test cases including tricky ones; 'run' them by hand; and note the limitations you find and one improvement you would make. This becomes the core of your Final Project.",
    steps: [
      "Design the pieces: name your input, output, the labels, three to five features, and any simple rules.",
      "Make a paper prototype: draw a flowchart or write decision cards a classmate could follow without your help.",
      "Write at least four test cases with known correct answers, including two tricky ones.",
      "Run each test case through your prototype by hand and record pass or fail on a test-case sheet.",
      "List the limitations the failures revealed, and write one improvement you would make next (your iteration).",
    ],
    materials: ["Paper and pencil, or a notes app"],
    successCriteria: [
      "Input, output, labels, three to five features, and any rules are named.",
      "A paper prototype a classmate could follow without extra explanation.",
      "At least four test cases with known answers, including tricky ones, run and marked pass/fail.",
      "At least one limitation identified and one improvement (iteration) proposed.",
    ],
    dataset: {
      id: "w6l2-act-ds",
      name: "Test-case starter kit",
      description: "A built-in checklist for writing good test cases: include easy examples, edge cases (wet, greasy, damaged, unusual), and examples that could go two ways. Also includes a blank test-case sheet template (example, correct label, prototype's label, pass/fail) to copy.",
      columns: ["Test-case type", "Why include it", "Example prompt"],
      rowCount: 6,
    },
  },
  knowledgeCheck: {
    id: "w6l2-kc",
    instructions: "Check that you can plan, prototype, and test a design.",
    passThreshold: 2,
    questions: [
      {
        id: "w6l2-kc-q1",
        kind: "multiple",
        prompt: "Which of these are things you should design before building your system? (Choose all that apply.)",
        explanation: "Inputs, outputs, features, and labels are all part of the design. The presentation slides come later and aren't part of designing how decisions get made.",
        choices: [
          { id: "w6l2-kc-q1-a", text: "The input the system takes in", correct: true, explanation: "Correct — naming the input is a core part of the design." },
          { id: "w6l2-kc-q1-b", text: "The output it gives back", correct: true, explanation: "Correct — the output, including the set of labels, must be designed." },
          { id: "w6l2-kc-q1-c", text: "The features it uses to decide", correct: true, explanation: "Correct — features are the clues the system uses, so they're part of the design." },
          { id: "w6l2-kc-q1-d", text: "The color of your presentation slides", correct: false, explanation: "Slide colors are about presenting later, not about how the system makes decisions." },
        ],
      },
      {
        id: "w6l2-kc-q2",
        kind: "ordering",
        prompt: "Put the build-test-improve loop in order for one round of prototyping.",
        explanation: "You design the pieces, build a rough prototype, run test cases, then find limitations and improve — and the loop can repeat.",
        items: [
          { id: "w6l2-kc-q2-i1", text: "Design the pieces (input, output, features, labels, rules)" },
          { id: "w6l2-kc-q2-i2", text: "Build a rough prototype" },
          { id: "w6l2-kc-q2-i3", text: "Run test cases and record pass or fail" },
          { id: "w6l2-kc-q2-i4", text: "Find limitations and improve the design" },
        ],
        correctOrder: ["w6l2-kc-q2-i1", "w6l2-kc-q2-i2", "w6l2-kc-q2-i3", "w6l2-kc-q2-i4"],
      },
      {
        id: "w6l2-kc-q3",
        kind: "scenario",
        prompt: "What should the team do next?",
        scenario: "A team's paper prototype passes every easy test case but labels a greasy pizza box 'recycling' when the correct answer is trash.",
        explanation: "A failed test case revealed a limitation. The right response is to iterate: improve the design (add a grease feature or rule) and test again, not to hide or ignore the failure.",
        choices: [
          { id: "w6l2-kc-q3-a", text: "Ignore the greasy box because the easy cases passed", correct: false, explanation: "Ignoring a known failure leaves a real limitation in the design." },
          { id: "w6l2-kc-q3-b", text: "Improve the design to handle grease, then re-run the test cases", correct: true, explanation: "Correct — that's iteration: fix the limitation the test revealed and test again." },
          { id: "w6l2-kc-q3-c", text: "Delete the greasy pizza box test case so it passes", correct: false, explanation: "Removing a hard test case hides the problem instead of fixing it." },
        ],
      },
    ],
  },
  challenge: {
    id: "w6l2-ch",
    title: "Break your own prototype",
    prompt: "Try hard to make your own prototype fail, then use what you learn to make it better.",
    steps: [
      "Write three especially tricky test cases designed to trip up your prototype.",
      "Run them by hand and record which ones fail.",
      "For each failure, name the limitation it reveals.",
      "Propose one change (an iteration) and predict whether it would fix the failures.",
    ],
    successCriteria: [
      "Three tricky test cases that stress the prototype.",
      "Each failure linked to a named limitation.",
      "One proposed iteration with a prediction of its effect.",
    ],
  },
  reflection: [
    { id: "w6l2-r1", prompt: "Why is it useful to build a rough prototype instead of jumping straight to the finished version?" },
    { id: "w6l2-r2", prompt: "Which test case taught you the most about your design's limitations, and why?" },
  ],
  recap: {
    id: "w6l2-recap",
    summary: "You turn a problem into a testable plan by designing the pieces, building a rough prototype, running known-answer test cases, and iterating to fix the limitations you find.",
    keyPoints: [
      "Design the input, output, labels, features, and any rules before building.",
      "A prototype is a rough version made cheaply to test an idea early.",
      "Test cases reveal limitations; iteration is the loop of improving until it's better.",
    ],
  },
  extension: {
    id: "w6l2-ext",
    title: "How much testing is enough?",
    gradeBand: "7-8",
    body: [
      "Real teams can't test every possible input, so they choose test cases carefully: common cases, edge cases, and cases where a mistake would matter most. A medical AI is tested far more strictly than a game that suggests emoji.",
      "For your project, decide which test cases matter most and why. Write a short 'test plan' explaining how much testing you think is enough before this system could be trusted by real users.",
    ],
  },
}

const lessonPresentReviewCareers: Lesson = {
  id: "w6l3",
  slug: "present-review-careers",
  order: 3,
  title: "Present, Review, and Explore AI Careers",
  summary:
    "Finish strong: present your project honestly — including its limitations and the human oversight it needs — give and take helpful feedback, and explore what people who build, govern, and design AI actually do.",
  estimatedTime: "50-65 minutes",
  objectives: [
    { id: "w6l3-o1", text: "Present a project clearly: the problem, your design, your tests, and its limitations." },
    { id: "w6l3-o2", text: "Explain the oversight and responsible use your project needs to be trustworthy." },
    { id: "w6l3-o3", text: "Give and receive specific, kind, useful feedback in a review." },
    { id: "w6l3-o4", text: "Describe several real AI careers — people who build, govern, and design AI." },
  ],
  materials: [
    { id: "w6l3-m1", name: "This lesson in a web browser", optional: false },
    { id: "w6l3-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w6l3-m3", name: "Your plan and test results from Lesson 2", optional: true, note: "You'll present them." },
  ],
  vocabulary: [
    { id: "w6l3-v1", term: "Limitation", definition: "A situation where a system gets things wrong, can't decide, or shouldn't be trusted — something honest projects state openly." },
    { id: "w6l3-v2", term: "Oversight", definition: "A person staying responsible for checking and correcting an AI's decisions, especially when a mistake could matter." },
    { id: "w6l3-v3", term: "Responsible use", definition: "Using AI in a way that is fair, honest, safe, and respects people's privacy, being clear about what it can and can't do." },
    { id: "w6l3-v4", term: "AI career", definition: "A job where people build, study, govern, or design AI systems and how they are used." },
  ],
  openingScenario: {
    id: "w6l3-open",
    prompt: "Two teams present waste-sorting projects. One says, 'It works perfectly!' The other says, 'It's right most of the time, but it struggles with greasy paper, so a person double-checks those.' Which team do you trust more, and why?",
    context: "An honest presentation that names limitations and oversight earns more trust than a big claim.",
  },
  predictionPrompt: {
    id: "w6l3-pred",
    prompt: "Predict: will the strongest projects be the ones that claim no mistakes, or the ones that clearly explain their limitations and how a person keeps watch?",
    howToCheck: "As you read, notice why naming limitations and oversight makes a project more trustworthy, not less.",
  },
  concepts: [
    {
      id: "w6l3-c1",
      title: "Present honestly: problem, design, tests, and limitations",
      body: [
        "A strong presentation tells a clear story: here's the user need and problem definition, here's my design (input, output, features, labels, rules), here's how I tested it, and here's what I found — including its limitations. Naming limitations is not a weakness; it shows you understand your own system.",
        "Avoid overclaiming. 'It works perfectly' is almost never true and quickly loses trust when someone finds a failure. 'It gets most cases right but struggles with X' is honest, and it's exactly what a thoughtful audience wants to hear.",
      ],
      examples: [
        "'Input: a photo of one item. Output: recycling, compost, or trash.'",
        "'It passed 7 of 9 test cases; it fails on greasy paper and shiny foil.'",
        "'Because it can be wrong, a person checks the uncertain cases.'",
      ],
    },
    {
      id: "w6l3-c2",
      title: "Oversight and responsible use make a project trustworthy",
      body: [
        "Because AI can be wrong or unfair, a responsible project plans for human oversight: a person stays responsible for checking and correcting the AI, especially where a mistake could matter. Your presentation should say who oversees the system and when.",
        "Responsible use also means being fair, honest about what the system can do, protecting people's privacy, and not using AI where the risks are too high. Tie together everything from the course: fairness, privacy, limitations, and human decisions all show up in how responsibly a project is designed and described.",
      ],
      examples: [
        "'A student reviews any item the sorter is unsure about before it's thrown away.'",
        "'We don't collect anyone's name or face — only photos of the items.'",
        "'We'd never use this to decide something serious about a person.'",
      ],
    },
    {
      id: "w6l3-c3",
      title: "Reviews work best when feedback is specific and kind — and AI is a career",
      body: [
        "In a review, you give and receive feedback. Useful feedback is specific ('your greasy-paper test case is a great catch; could you add a rule for it?') rather than vague ('it's good') or harsh. Receiving feedback well means listening, asking questions, and treating it as help, not attack. Iteration continues here: reviews often spark your next improvement.",
        "Building AI is also a growing field of work. Machine-learning engineers and data scientists build and train models. Data labelers and annotators create the labeled examples systems learn from. AI ethicists, auditors, and policy makers govern AI — checking it for fairness, safety, and privacy, and writing the rules for how it may be used. UX and product designers decide how people actually interact with AI and stay in control. Teachers, doctors, artists, and many others increasingly use AI as a tool. You don't have to be a programmer to shape how AI is built and used.",
      ],
      examples: [
        "Machine-learning engineer: builds and trains the model.",
        "Data labeler / annotator: creates the labeled examples for learning.",
        "AI ethicist or auditor: checks systems for fairness, safety, and privacy.",
        "Product / UX designer: designs how people use AI and keep oversight.",
      ],
    },
  ],
  workedExample: {
    id: "w6l3-we",
    title: "A trustworthy two-minute presentation",
    steps: [
      "State the problem: 'New students can't tell which bin their waste goes in, so we sort a photo into recycling, compost, or trash.'",
      "Show the design: 'Input is a photo of one item; output is one of three labels; features include material and food-grease.'",
      "Report the tests: 'We ran nine test cases and passed seven; it fails on greasy paper and foil.'",
      "Name limitations and oversight: 'Those are real limits, so a person checks any item it's unsure about before it's thrown away.'",
      "Close with responsible use: 'We collect only item photos, never faces or names, and we wouldn't use it for anything high-stakes.'",
    ],
    takeaway: "The most trustworthy presentation states the problem, the design, honest test results, the limitations, and the human oversight that keeps use responsible.",
  },
  visuals: [
    {
      id: "w6l3-vis1",
      kind: "before-after",
      title: "Overclaiming vs. honest presenting",
      summary:
        "Before (overclaiming): 'Our AI sorts waste perfectly!' — no limitations, no oversight, and it loses trust the moment someone finds a failure. After (honest): 'It passes most cases but fails on greasy paper and foil, so a person checks uncertain items, and we only use item photos.' — states limitations, oversight, and responsible use, and earns more trust.",
      caption: "Honesty about limits and oversight makes a project more trustworthy, not less.",
    },
    {
      id: "w6l3-vis2",
      kind: "table",
      title: "Who builds and governs AI",
      summary:
        "A table of AI careers. Machine-learning engineer: builds and trains models; core skill is designing and testing systems. Data labeler/annotator: creates labeled examples; core skill is careful, consistent labeling. AI ethicist/auditor: governs AI for fairness, safety, privacy; core skill is spotting harms and setting rules. Product/UX designer: designs how people use AI and keep oversight; core skill is understanding users.",
      table: {
        columns: ["Role", "What they do", "A skill they use"],
        rows: [
          ["Machine-learning engineer", "Builds and trains models", "Designing and testing systems"],
          ["Data labeler / annotator", "Creates the labeled examples", "Careful, consistent labeling"],
          ["AI ethicist / auditor", "Governs AI for fairness and safety", "Spotting harms, setting rules"],
          ["Product / UX designer", "Designs how people use AI", "Understanding real users"],
        ],
      },
    },
  ],
  activity: {
    id: "w6l3-act",
    kind: "present-review",
    title: "Present and Review Studio",
    goal: "Present your project honestly and give and receive specific, useful feedback using a review rubric.",
    status: "briefing",
    overview:
      "You will prepare a short, honest presentation of your project — problem, design, tests, limitations, oversight, and responsible use — and then take part in a review, giving other teams specific, kind feedback and receiving theirs, using a shared checklist. Reviews here can spark one more iteration before the Final Project.",
    steps: [
      "Prepare a two-minute presentation covering problem, design, test results, limitations, oversight, and responsible use.",
      "Present to a partner or small group.",
      "As a reviewer, use the review checklist to give at least two specific, kind pieces of feedback per project.",
      "As a presenter, write down the feedback you receive and pick one improvement to make (your next iteration).",
      "Discuss which AI careers each project connects to and which ones interest you.",
    ],
    materials: ["Paper and pencil, or a notes app"],
    successCriteria: [
      "A presentation that includes limitations, oversight, and responsible use — not just what works.",
      "At least two specific, kind pieces of feedback given to others.",
      "Feedback received is recorded and one next improvement is chosen.",
      "At least one AI career your project connects to is named.",
    ],
    dataset: {
      id: "w6l3-act-ds",
      name: "Project review rubric",
      description: "A built-in review checklist teams use to give feedback. Rows cover: clear problem definition; sensible input/output/labels/features; honest test results; named limitations; a human-oversight plan; and responsible use (fairness, privacy, honesty). Each row has a prompt and space for a specific comment.",
      columns: ["Review area", "What to look for", "Specific comment"],
      rowCount: 6,
    },
  },
  knowledgeCheck: {
    id: "w6l3-kc",
    instructions: "Check that you can present responsibly and describe real AI work.",
    passThreshold: 2,
    questions: [
      {
        id: "w6l3-kc-q1",
        kind: "single",
        prompt: "Why should a project presentation include its limitations?",
        explanation: "Naming limitations honestly builds trust and shows you understand your own system; hiding them backfires when a failure is found.",
        choices: [
          { id: "w6l3-kc-q1-a", text: "To make the project look weak so no one asks questions", correct: false, explanation: "Naming limitations isn't about looking weak; it shows understanding and honesty." },
          { id: "w6l3-kc-q1-b", text: "Because honesty about limits builds trust and shows you understand the system", correct: true, explanation: "Correct — honest limits earn trust and prove you know how your system behaves." },
          { id: "w6l3-kc-q1-c", text: "Because every project is required to fail", correct: false, explanation: "Projects aren't required to fail; they're required to be honest about real limits." },
          { id: "w6l3-kc-q1-d", text: "So you don't have to test it", correct: false, explanation: "You find limitations precisely by testing; naming them doesn't replace testing." },
        ],
      },
      {
        id: "w6l3-kc-q2",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "You must be a computer programmer to have any role in building or governing AI.",
        answer: false,
        explanation: "False — data labelers, ethicists, auditors, policy makers, and designers all shape AI without necessarily programming it.",
      },
      {
        id: "w6l3-kc-q3",
        kind: "scenario",
        prompt: "Which response gives the most useful review feedback?",
        scenario: "A classmate presents a plant-disease detector that passed most tests but wasn't tested on blurry photos, and there's no plan for who checks its decisions.",
        explanation: "Specific feedback points to a real gap and suggests a concrete next step, unlike vague praise or a harsh dismissal.",
        choices: [
          { id: "w6l3-kc-q3-a", text: "'It's good.'", correct: false, explanation: "Vague praise gives the presenter nothing to act on." },
          { id: "w6l3-kc-q3-b", text: "'Add a blurry-photo test case and say who oversees uncertain results.'", correct: true, explanation: "Correct — it's specific, kind, and points to concrete next iterations." },
          { id: "w6l3-kc-q3-c", text: "'This will never work, don't bother.'", correct: false, explanation: "Harsh and vague — it isn't specific and doesn't help the project improve." },
        ],
      },
    ],
  },
  challenge: {
    id: "w6l3-ch",
    title: "Meet an AI job",
    prompt: "Research one AI career and connect it to the project you designed this week.",
    steps: [
      "Choose one role: machine-learning engineer, data labeler, AI ethicist or auditor, policy maker, or AI product/UX designer.",
      "Write three to four sentences on what they do day to day and one skill they use.",
      "Explain which part of your own project that role would handle.",
      "Note one thing about that job you'd want to learn more about.",
    ],
    successCriteria: [
      "One AI role described accurately with a skill it uses.",
      "A clear link between the role and part of your project.",
      "One genuine question you have about that career.",
    ],
  },
  reflection: [
    { id: "w6l3-r1", prompt: "Across the whole course, what is the most important thing you'll remember about using AI responsibly?" },
    { id: "w6l3-r2", prompt: "Which AI career sounds most interesting to you, and what would you want to learn next to explore it?" },
  ],
  recap: {
    id: "w6l3-recap",
    summary: "A finished project is presented honestly — problem, design, tests, limitations, oversight, and responsible use — improved through review, and connected to the real people who build and govern AI.",
    keyPoints: [
      "Present the problem, design, and honest test results — including limitations.",
      "Plan human oversight and responsible use so the project can be trusted.",
      "AI is built and governed by many roles, not only programmers.",
    ],
  },
  extension: {
    id: "w6l3-ext",
    title: "Write your project's 'responsible use' label",
    gradeBand: "7-8",
    body: [
      "Some AI systems now ship with a short 'model card' or use label: what the system is for, what it's not for, its known limitations, and who is responsible for overseeing it.",
      "Write a one-paragraph responsible-use label for your own project. State what it should and should not be used for, its main limitations, who provides oversight, and how it protects people's privacy.",
    ],
  },
}

export const week6: CourseWeek = {
  id: "week-6",
  week: 6,
  title: "AI Design Studio",
  subtitle: "Bring it all together: define a real problem, decide if AI fits, design and test a prototype, and present it responsibly.",
  summary:
    "In the capstone week, students work like a design team: they turn a user need into a clear problem definition, judge whether AI is the right tool, design the inputs, outputs, features, labels, and rules, build and test a paper prototype, find its limitations through test cases, and present the result honestly — with human oversight and responsible use — while exploring the careers of people who build and govern AI. This week prepares students for the separate Final Project studio and Final Assessment.",
  bigQuestion: "How do you take an idea from a real problem all the way to a tested, responsibly presented AI project?",
  estimatedTime: "2.5-3 hours",
  objectives: [
    "Turn a user need into a clear problem definition and judge whether AI suits it.",
    "Design a system's inputs, outputs, features, labels, and rules.",
    "Build a prototype, test it with test cases, find its limitations, and iterate.",
    "Present a project responsibly with oversight, and describe real AI careers.",
  ],
  requiredConcepts: [
    "User need",
    "Problem definition",
    "AI suitability",
    "Input",
    "Output",
    "Feature",
    "Label",
    "Rule",
    "Prototype",
    "Test case",
    "Limitation",
    "Oversight",
    "Iteration",
    "Responsible use",
  ],
  lessons: [lessonChooseTheRightProblem, lessonPlanPrototypeTest, lessonPresentReviewCareers],
  isFinal: true,
}
