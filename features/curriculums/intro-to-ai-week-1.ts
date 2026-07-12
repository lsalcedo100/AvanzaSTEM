/**
 * Intro to AI — Week 1: What AI Is and Is Not.
 *
 * Authored content only; conforms to the types in `intro-to-ai-types.ts`. Every
 * id is stable and unique (prefixed by the owning lesson id). No interactive
 * engines are wired up yet, so each activity is a `briefing`.
 */
import type { CourseWeek, Lesson } from "./intro-to-ai-types.ts"

const lessonAiOrNot: Lesson = {
  id: "w1l1",
  slug: "ai-or-not",
  order: 1,
  title: "AI or Not?",
  summary:
    "Sort everyday technology into artificial intelligence and ordinary software, and learn the one question that tells them apart.",
  estimatedTime: "45-55 minutes",
  objectives: [
    { id: "w1l1-o1", text: "Explain what artificial intelligence means in your own words." },
    { id: "w1l1-o2", text: "Tell the difference between AI and ordinary (traditional) software." },
    { id: "w1l1-o3", text: "Give three examples of AI you meet in everyday life." },
  ],
  materials: [
    { id: "w1l1-m1", name: "This lesson in a web browser", optional: false },
    { id: "w1l1-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w1l1-m3", name: "A device you use often (phone, tablet, laptop) to look at its apps", optional: true, note: "For gathering your own examples." },
  ],
  vocabulary: [
    { id: "w1l1-v1", term: "Artificial intelligence (AI)", definition: "Computer software that does tasks that usually seem to need human thinking, such as recognizing pictures, understanding language, or making predictions." },
    { id: "w1l1-v2", term: "Traditional program", definition: "Software that follows exact rules a person wrote, step by step, and does the same thing every time for the same input." },
    { id: "w1l1-v3", term: "Input", definition: "The information you give to a program, like a photo, a sentence, or a button press." },
    { id: "w1l1-v4", term: "Output", definition: "The result a program gives back, like an answer, a label, or an action." },
  ],
  openingScenario: {
    id: "w1l1-open",
    prompt: "A calculator adds numbers. A photo app finds every picture of your dog. Both are software. Is either one 'artificial intelligence'? How could you decide?",
    context: "Keep your first answer in mind — you will check it at the end of the lesson.",
  },
  predictionPrompt: {
    id: "w1l1-pred",
    prompt: "Predict: out of a calculator, a spam filter, a light switch, and a voice assistant, which ones do you think use AI?",
    howToCheck: "As you read the concepts below, decide whether each one just follows fixed rules or learns patterns from examples.",
  },
  concepts: [
    {
      id: "w1l1-c1",
      title: "What 'artificial intelligence' really means",
      body: [
        "Artificial intelligence is software that does jobs that normally seem to need human thinking — like telling a cat from a dog in a photo, understanding a spoken question, or guessing which movie you might like.",
        "The word 'artificial' means made by people, and 'intelligence' points to those thinking-like tasks. AI is not a robot body and it is not alive. It is a program running on a computer.",
      ],
      misconception:
        "A robot is not the same thing as AI. Many robots just follow fixed instructions, and lots of AI (like a spam filter) has no body at all.",
      examples: [
        "A phone that unlocks when it recognizes your face",
        "An app that turns your speech into text",
        "A video site that recommends what to watch next",
      ],
    },
    {
      id: "w1l1-c2",
      title: "Traditional software follows exact rules",
      body: [
        "Most software is a traditional program: a person wrote exact rules, and the computer follows them the same way every time. A calculator always returns 4 for 2 + 2 because someone programmed that rule.",
        "Traditional programs are predictable. If you know the input and the rules, you can know the output. Nobody had to show the calculator thousands of examples of addition — the rule was written directly.",
      ],
      examples: [
        "A calculator app",
        "A light switch controller that turns a bulb on when you tap a button",
        "An alarm that rings at the exact time you set",
      ],
    },
    {
      id: "w1l1-c3",
      title: "AI learns patterns instead of only following written rules",
      body: [
        "AI works differently. Instead of a person writing every rule, the software is shown many examples and finds patterns in them. That is why a photo app can spot a dog it has never seen before — it learned what dogs tend to look like from lots of dog pictures.",
        "So the key question is: did a person write exact rules for this, or did the software learn patterns from examples? If it learned from examples, it is probably AI.",
      ],
      examples: [
        "A spam filter that learned what junk email looks like from millions of messages",
        "A voice assistant that learned to recognize many voices and accents",
        "A map app that predicts traffic from patterns in past trips",
      ],
    },
  ],
  workedExample: {
    id: "w1l1-we",
    title: "Deciding: is a spam filter AI?",
    steps: [
      "Name the input and output. Input: an email. Output: a label, 'spam' or 'not spam'.",
      "Ask: did a person write an exact rule for every email? No — there are too many possible emails, and spammers keep changing their words.",
      "Ask: was it shown examples? Yes — it learned from millions of emails people already marked as spam or not spam.",
      "Because it learned patterns from examples rather than following a fixed hand-written rule, the spam filter is AI.",
    ],
    takeaway: "To classify something, find its input and output, then ask whether it follows written rules or learned from examples.",
  },
  visuals: [
    {
      id: "w1l1-vis1",
      kind: "flow",
      title: "Two ways software can work",
      summary:
        "Two paths from input to output. Traditional path: Input goes into 'Rules a person wrote', which produces the Output. AI path: Input goes into 'Patterns learned from examples', which produces the Output. The difference is the middle box — hand-written rules versus learned patterns.",
      caption: "The middle step is what separates traditional software from AI.",
      beforeAfter: {
        before: { label: "Traditional software", items: ["Input arrives", "Rules a person wrote decide", "Output"] },
        after: { label: "AI", items: ["Input arrives", "Patterns learned from examples decide", "Output"] },
      },
    },
    {
      id: "w1l1-vis2",
      kind: "table",
      title: "Rules vs. learned patterns at a glance",
      summary:
        "A comparison table. Calculator: rules written by a person, same output every time, not AI. Spam filter: patterns learned from examples, can handle new emails, is AI. Light switch: rule written by a person, not AI. Voice assistant: patterns learned from examples, is AI.",
      table: {
        columns: ["Technology", "How it decides", "AI?"],
        rows: [
          ["Calculator", "Fixed rules a person wrote", "No"],
          ["Light switch", "Fixed rule (button → light)", "No"],
          ["Spam filter", "Patterns learned from examples", "Yes"],
          ["Voice assistant", "Patterns learned from examples", "Yes"],
        ],
      },
    },
  ],
  activity: {
    id: "w1l1-act",
    kind: "ai-detective",
    title: "AI Detective",
    goal: "Decide whether each everyday technology uses AI, and give the reason.",
    status: "briefing",
    overview:
      "You will look at a set of everyday technologies and sort each one as 'uses AI' or 'ordinary software'. For each, you write the input, the output, and the one reason for your choice.",
    steps: [
      "For each technology, write down its input and its output.",
      "Ask the key question: fixed rules a person wrote, or patterns learned from examples?",
      "Sort it into 'uses AI' or 'ordinary software' and write your one-sentence reason.",
      "Compare with a partner and talk about any you disagreed on.",
    ],
    materials: ["Paper and pencil, or a notes app"],
    successCriteria: [
      "Every technology has an input and output written down.",
      "Every choice has a clear reason based on rules vs. learned patterns.",
      "You can explain at least one case you found tricky.",
    ],
    dataset: {
      id: "w1l1-act-ds",
      name: "Everyday technology cards",
      description: "A built-in set of familiar technologies (calculator, face unlock, thermostat, photo search, spellchecker, recommendation feed, and more) to sort.",
      rowCount: 12,
    },
  },
  knowledgeCheck: {
    id: "w1l1-kc",
    instructions: "Answer these to check that you can tell AI from ordinary software.",
    passThreshold: 2,
    questions: [
      {
        id: "w1l1-kc-q1",
        kind: "single",
        prompt: "What is the best clue that a piece of software is AI rather than a traditional program?",
        explanation: "AI is defined by learning patterns from examples instead of following only rules a person wrote by hand.",
        choices: [
          { id: "w1l1-kc-q1-a", text: "It runs on a computer.", correct: false, explanation: "All software runs on a computer, so this doesn't tell AI apart from anything else." },
          { id: "w1l1-kc-q1-b", text: "It learned patterns from many examples.", correct: true, explanation: "Correct — learning patterns from examples is the key sign of AI." },
          { id: "w1l1-kc-q1-c", text: "It is fast.", correct: false, explanation: "Speed doesn't decide whether something is AI; a calculator is fast but not AI." },
          { id: "w1l1-kc-q1-d", text: "It has a screen.", correct: false, explanation: "Having a screen is about the device, not about whether the software learns." },
        ],
      },
      {
        id: "w1l1-kc-q2",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "A basic calculator is an example of artificial intelligence.",
        answer: false,
        explanation: "A calculator follows exact rules a person wrote and never learns from examples, so it is traditional software, not AI.",
      },
      {
        id: "w1l1-kc-q3",
        kind: "scenario",
        prompt: "Which technology in this scenario is using AI?",
        scenario: "Maya sets an alarm for 7:00. Her phone also suggests a photo memory 'One year ago' by finding similar pictures of her at the beach.",
        explanation: "The alarm follows a fixed rule (ring at 7:00). Finding similar beach photos requires recognizing patterns in images, which is AI.",
        choices: [
          { id: "w1l1-kc-q3-a", text: "The alarm ringing at 7:00", correct: false, explanation: "The alarm just follows the exact time rule you set — traditional software." },
          { id: "w1l1-kc-q3-b", text: "Grouping similar beach photos into a memory", correct: true, explanation: "Correct — recognizing which photos look similar is a learned-pattern task, so it's AI." },
          { id: "w1l1-kc-q3-c", text: "Neither one uses AI", correct: false, explanation: "The photo memory does use AI to recognize similar images." },
        ],
      },
      {
        id: "w1l1-kc-q4",
        kind: "scenario",
        prompt: "Which of these robots is showing signs of AI?",
        scenario: "Robot A always drives the exact same square path a person programmed. Robot B uses a camera to recognize and pick up only the red blocks it has learned to spot.",
        explanation: "A robot body doesn't make something AI. Robot A just repeats fixed instructions. Robot B recognizes objects from learned patterns, which is AI.",
        choices: [
          { id: "w1l1-kc-q4-a", text: "Robot A, because it moves on its own", correct: false, explanation: "Moving on its own isn't enough — Robot A only repeats a fixed, preprogrammed path." },
          { id: "w1l1-kc-q4-b", text: "Robot B, because it recognizes objects it learned", correct: true, explanation: "Correct — recognizing learned objects is a machine-learning task, so Robot B shows AI." },
          { id: "w1l1-kc-q4-c", text: "Both, because they are both robots", correct: false, explanation: "Being a robot doesn't make something intelligent; Robot A just follows fixed steps." },
        ],
      },
    ],
  },
  challenge: {
    id: "w1l1-ch",
    title: "Find three AIs in your day",
    prompt: "On your own, find three examples of AI you actually used or saw in the last day, and one example of ordinary software.",
    steps: [
      "List three technologies you used recently that learn from examples.",
      "For each, name the input and the output.",
      "Add one example of ordinary software and explain why it is not AI.",
    ],
    successCriteria: [
      "Three real AI examples, each with input and output.",
      "One ordinary-software example with a reason it is not AI.",
    ],
  },
  reflection: [
    { id: "w1l1-r1", prompt: "What surprised you most about which technologies do and don't use AI?" },
    { id: "w1l1-r2", prompt: "Was your prediction at the start correct? What changed your mind?" },
  ],
  recap: {
    id: "w1l1-recap",
    summary: "AI is software that learns patterns from examples, while traditional programs follow exact rules a person wrote.",
    keyPoints: [
      "AI does tasks that seem to need human thinking, like recognizing images or language.",
      "The key question is: written rules, or patterns learned from examples?",
      "Everyday life is full of AI: face unlock, recommendations, voice assistants.",
    ],
  },
  extension: {
    id: "w1l1-ext",
    title: "Where is the line?",
    gradeBand: "7-8",
    body: [
      "Some technologies mix both approaches. A modern email app might use a hand-written rule to block a known bad address AND an AI model to catch new spam it has never seen.",
      "Find one technology you think uses both fixed rules and learned patterns. Describe which part is which, and why a designer might combine them.",
    ],
  },
}

const lessonRulesVsLearned: Lesson = {
  id: "w1l2",
  slug: "rules-vs-learned-patterns",
  order: 2,
  title: "Rules Versus Learned Patterns",
  summary:
    "Look closely at automation and machine learning: when a person writes the rules, and when the software learns patterns from examples instead.",
  estimatedTime: "45-55 minutes",
  objectives: [
    { id: "w1l2-o1", text: "Define automation and machine learning and tell them apart." },
    { id: "w1l2-o2", text: "Trace how input, rules, and output work in a traditional program." },
    { id: "w1l2-o3", text: "Explain how a learned pattern replaces hand-written rules in machine learning." },
  ],
  materials: [
    { id: "w1l2-m1", name: "This lesson in a web browser", optional: false },
    { id: "w1l2-m2", name: "Paper and pencil, or a notes app", optional: false },
  ],
  vocabulary: [
    { id: "w1l2-v1", term: "Automation", definition: "Making a task happen by itself using fixed rules, without a person doing each step." },
    { id: "w1l2-v2", term: "Machine learning", definition: "A kind of AI where software learns patterns from many examples instead of being given every rule." },
    { id: "w1l2-v3", term: "Rule", definition: "An exact instruction a person writes, like 'if the temperature is below 68, turn on the heat'." },
    { id: "w1l2-v4", term: "Learned pattern", definition: "A regularity the software figured out from examples, used to make decisions on new inputs." },
  ],
  openingScenario: {
    id: "w1l2-open",
    prompt: "A thermostat turns on the heat when a room drops below 68 degrees. A music app builds you a playlist of songs 'you might like'. Both act on their own. Are they doing the same kind of thinking?",
  },
  predictionPrompt: {
    id: "w1l2-pred",
    prompt: "Predict: which of the two — the thermostat or the playlist maker — needed someone to show it thousands of examples?",
    howToCheck: "Read the concepts and decide which one runs on a fixed rule and which one learned a pattern.",
  },
  concepts: [
    {
      id: "w1l2-c1",
      title: "Automation: a task that runs itself on fixed rules",
      body: [
        "Automation means a task happens automatically by following rules a person set. A thermostat automates heating: 'if the room is below 68, turn on the heat.' No one has to flip a switch, but a human still wrote the exact rule.",
        "Automation can be very useful and still not be AI. The machine is not learning — it is faithfully repeating instructions.",
      ],
      examples: [
        "A thermostat heating a room at a set temperature",
        "An automatic door opening when a sensor is pressed",
        "A dishwasher running a timed wash cycle",
      ],
    },
    {
      id: "w1l2-c2",
      title: "Input, rule, output: the shape of a traditional program",
      body: [
        "Traditional programs and simple automation share the same shape: an input comes in, a rule decides what to do, and an output comes out. Input: room temperature. Rule: below 68 → heat on. Output: the heater turns on.",
        "Because a person wrote the rule, you can predict the output for any input. This is powerful for tasks with clear, unchanging rules.",
      ],
      examples: [
        "Input: a coin; Rule: coin detected → dispense gum; Output: gum",
        "Input: a password; Rule: matches stored password → unlock; Output: unlocked",
      ],
    },
    {
      id: "w1l2-c3",
      title: "Machine learning: the software finds the pattern",
      body: [
        "Some tasks are too messy for a person to write every rule. What rule tells a good song recommendation from a bad one for you? Instead, machine learning shows the software many examples — songs you liked and skipped — and it learns a pattern it can apply to new songs.",
        "The big shift: in machine learning, a learned pattern takes the place of hand-written rules. People still choose the examples and check the results, but they don't spell out every rule.",
      ],
      examples: [
        "A playlist maker that learned your taste from songs you played and skipped",
        "A handwriting reader that learned letter shapes from many samples",
      ],
    },
  ],
  workedExample: {
    id: "w1l2-we",
    title: "Rule or learned pattern? Two ways to sort fruit",
    steps: [
      "Task: sort photos of apples and bananas.",
      "Rule way: a person writes 'if the shape is long and yellow → banana, else apple'. This works until a green banana or a yellow apple shows up.",
      "Learned way: show the software hundreds of labeled apple and banana photos; it learns the patterns of each, including tricky colors.",
      "The rule way is simple but brittle. The learned way handles new, unusual examples better — that's why messy tasks use machine learning.",
    ],
    takeaway: "Use fixed rules when the rule is clear and unchanging; use machine learning when the pattern is too messy to write by hand.",
  },
  visuals: [
    {
      id: "w1l2-vis1",
      kind: "flow",
      title: "Input, rule, output",
      summary:
        "A three-step flow: Input (room temperature) → Rule ('below 68 → heat on') → Output (heater turns on). This is the shape of automation and traditional programs.",
      caption: "In automation, a person writes the rule in the middle.",
      flow: {
        nodes: [
          { id: "in", label: "Input", note: "Room temperature" },
          { id: "rule", label: "Rule", note: "Below 68 → heat on" },
          { id: "out", label: "Output", note: "Heater turns on" },
        ],
      },
    },
    {
      id: "w1l2-vis2",
      kind: "before-after",
      title: "Where the pattern comes from",
      summary:
        "Before (traditional): a person writes the rule, then the program uses it. After (machine learning): a person collects labeled examples, the software learns a pattern from them, then the program uses that learned pattern. The person's job shifts from writing rules to choosing good examples.",
      beforeAfter: {
        before: { label: "Traditional", items: ["A person writes the rule", "The program follows the rule"] },
        after: { label: "Machine learning", items: ["A person collects labeled examples", "The software learns a pattern", "The program uses the learned pattern"] },
      },
    },
  ],
  activity: {
    id: "w1l2-act",
    kind: "rule-builder",
    title: "Rule-Builder Challenge",
    goal: "Try to write fixed rules for a task, then see where fixed rules break and learning would help.",
    status: "briefing",
    overview:
      "You will write step-by-step rules to sort a small set of items (for example, 'is this animal a bird?'). Then you'll test your rules against tricky examples and mark where they fail — the exact places a learned pattern would do better.",
    steps: [
      "Pick the task and write your rules as clear 'if … then …' steps.",
      "Run your rules by hand on the easy examples.",
      "Now try the tricky examples (a penguin, an ostrich) and mark where your rules give the wrong answer.",
      "Write one sentence: why would learning from many examples handle these better?",
    ],
    materials: ["Paper and pencil, or a notes app"],
    successCriteria: [
      "At least three clear rules written as 'if … then …'.",
      "At least one tricky example where the rules fail is identified.",
      "A sentence explaining why learned patterns handle messy cases better.",
    ],
    dataset: {
      id: "w1l2-act-ds",
      name: "Is-it-a-bird cards",
      description: "A built-in set of animals, including easy cases and tricky ones (penguin, bat, ostrich) to test hand-written rules.",
      rowCount: 10,
    },
  },
  knowledgeCheck: {
    id: "w1l2-kc",
    instructions: "Check that you can tell automation from machine learning.",
    passThreshold: 2,
    questions: [
      {
        id: "w1l2-kc-q1",
        kind: "single",
        prompt: "What is the main difference between automation and machine learning?",
        explanation: "Automation follows fixed rules a person wrote; machine learning finds patterns from examples.",
        choices: [
          { id: "w1l2-kc-q1-a", text: "Automation is faster than machine learning.", correct: false, explanation: "Speed isn't the difference; both can be fast or slow." },
          { id: "w1l2-kc-q1-b", text: "Automation follows written rules; machine learning learns patterns from examples.", correct: true, explanation: "Correct — that's the core difference." },
          { id: "w1l2-kc-q1-c", text: "Only machine learning uses a computer.", correct: false, explanation: "Both run on computers." },
          { id: "w1l2-kc-q1-d", text: "They are two names for the same thing.", correct: false, explanation: "They are different: rules vs. learned patterns." },
        ],
      },
      {
        id: "w1l2-kc-q2",
        kind: "ordering",
        prompt: "Put the steps of a traditional program in order.",
        explanation: "A traditional program takes an input, applies a rule, and produces an output.",
        items: [
          { id: "w1l2-kc-q2-i1", text: "An input arrives (like a temperature reading)" },
          { id: "w1l2-kc-q2-i2", text: "A rule a person wrote decides what to do" },
          { id: "w1l2-kc-q2-i3", text: "An output happens (like the heater turning on)" },
        ],
        correctOrder: ["w1l2-kc-q2-i1", "w1l2-kc-q2-i2", "w1l2-kc-q2-i3"],
      },
      {
        id: "w1l2-kc-q3",
        kind: "scenario",
        prompt: "Which task is a better fit for machine learning than for hand-written rules?",
        scenario: "You want software that (A) turns on a fan when the room is above 80 degrees, or (B) tells whether a photo shows a dog or a cat.",
        explanation: "The fan is a clear fixed rule. Telling dogs from cats in any photo is too messy for hand-written rules and fits machine learning.",
        choices: [
          { id: "w1l2-kc-q3-a", text: "Turning on a fan above 80 degrees", correct: false, explanation: "That's a clear rule — automation handles it fine." },
          { id: "w1l2-kc-q3-b", text: "Telling a dog from a cat in a photo", correct: true, explanation: "Correct — that pattern is too messy to write by hand, so machine learning fits." },
          { id: "w1l2-kc-q3-c", text: "Both are equally easy to write as rules", correct: false, explanation: "The photo task is very hard to capture with fixed rules." },
        ],
      },
    ],
  },
  challenge: {
    id: "w1l2-ch",
    title: "Rule it or learn it?",
    prompt: "Come up with two tasks: one that fixed rules handle well, and one that needs machine learning.",
    steps: [
      "Describe a task where a person can easily write the rule. State the rule.",
      "Describe a task that is too messy for fixed rules. Explain why.",
      "For the messy task, what examples would you collect to teach it?",
    ],
    successCriteria: [
      "One clear rule-based task with its rule.",
      "One learning-based task with a reason rules won't work.",
      "A description of the examples needed to teach the messy task.",
    ],
  },
  reflection: [
    { id: "w1l2-r1", prompt: "When is it better to write rules yourself instead of using machine learning?" },
    { id: "w1l2-r2", prompt: "Where did your hand-written rules break during the activity?" },
  ],
  recap: {
    id: "w1l2-recap",
    summary: "Automation repeats fixed rules; machine learning learns patterns from examples for tasks too messy to rule out by hand.",
    keyPoints: [
      "Traditional programs follow input → rule → output.",
      "Machine learning replaces hand-written rules with a learned pattern.",
      "People still pick the examples and check the results in machine learning.",
    ],
  },
  extension: {
    id: "w1l2-ext",
    title: "Who decides the examples?",
    gradeBand: "7-8",
    body: [
      "In machine learning, the examples a system learns from are chosen by people. That means human decisions are built into every model — which examples to include, and what the correct label is.",
      "Think of a task you'd teach a model. Who would choose the examples, and how could their choices change what the model learns?",
    ],
  },
}

const lessonDeviceInvestigation: Lesson = {
  id: "w1l3",
  slug: "device-investigation",
  order: 3,
  title: "Week 1 Device Investigation",
  summary:
    "Investigate the devices and apps around you, map their inputs and outputs, and uncover the human decisions behind the AI features you rely on.",
  estimatedTime: "45-60 minutes",
  objectives: [
    { id: "w1l3-o1", text: "Investigate real devices and apps to find AI features." },
    { id: "w1l3-o2", text: "Map the input and output of an AI feature you use." },
    { id: "w1l3-o3", text: "Identify the human decisions behind an everyday AI." },
  ],
  materials: [
    { id: "w1l3-m1", name: "This lesson in a web browser", optional: false },
    { id: "w1l3-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w1l3-m3", name: "A device you use often, to explore its apps and settings", optional: true, note: "No account changes or personal data needed — just look at features." },
  ],
  vocabulary: [
    { id: "w1l3-v1", term: "AI feature", definition: "A part of an app or device that uses AI, like photo search, autocomplete, or recommendations." },
    { id: "w1l3-v2", term: "Human decision", definition: "A choice a person made when building an AI, such as which examples to use or what counts as a correct answer." },
    { id: "w1l3-v3", term: "Everyday AI", definition: "AI you meet in normal daily life, often without noticing it." },
  ],
  openingScenario: {
    id: "w1l3-open",
    prompt: "You probably used several AIs before lunch without noticing. Which apps on a phone or laptop do you think have a hidden AI feature inside them?",
  },
  predictionPrompt: {
    id: "w1l3-pred",
    prompt: "Predict how many AI features you'll be able to find across the apps and devices you use most.",
    howToCheck: "Investigate each app and count the features that learn patterns rather than follow fixed rules.",
  },
  concepts: [
    {
      id: "w1l3-c1",
      title: "AI is hiding in plain sight",
      body: [
        "Many apps use AI quietly. Your keyboard suggests the next word, your camera brightens faces, your map predicts arrival times, and your video app lines up the next clip. These are all AI features working in the background.",
        "Being able to spot them is a real skill. Once you look for 'learned patterns', you start noticing AI everywhere.",
      ],
      examples: [
        "Keyboard word suggestions",
        "Photo search by what's in the picture ('dog', 'beach')",
        "Estimated arrival time in a maps app",
      ],
    },
    {
      id: "w1l3-c2",
      title: "Every AI feature has an input and an output",
      body: [
        "You can understand any AI feature by naming its input and output. Autocomplete: input is the letters you've typed, output is a suggested next word. Photo search: input is your photos and a search word, output is the matching pictures.",
        "Mapping input and output turns a mysterious feature into something you can explain and question.",
      ],
    },
    {
      id: "w1l3-c3",
      title: "People made decisions behind every AI",
      body: [
        "An AI feature did not appear on its own. People decided what it should do, which examples to train it on, and what a 'correct' answer looks like. Those human decisions shape how the AI behaves — and whether it works well for everyone.",
        "When an AI does something surprising or unfair, it often traces back to a human decision, like which examples were collected.",
      ],
      examples: [
        "Deciding that autocorrect should suggest common words",
        "Choosing which photos to show a photo-search model while it learns",
      ],
    },
  ],
  workedExample: {
    id: "w1l3-we",
    title: "Investigating autocomplete",
    steps: [
      "Pick the feature: the keyboard suggesting your next word.",
      "Input: the letters and words you've typed so far.",
      "Output: one or more suggested next words.",
      "Learned or ruled? It learned common word patterns from huge amounts of text — that's AI.",
      "Human decision: people chose the text it learned from, which is why it suggests some words and not others.",
    ],
    takeaway: "Any AI feature becomes clear once you name its input, its output, and a human decision behind it.",
  },
  visuals: [
    {
      id: "w1l3-vis1",
      kind: "diagram",
      title: "Anatomy of an everyday AI feature",
      summary:
        "A labeled diagram of an AI feature. On the left: 'Input' (what you give it). In the middle: 'Learned pattern' (trained from examples chosen by people). On the right: 'Output' (what it gives back). A note points to the middle: 'Human decisions: which examples, what counts as correct.'",
      caption: "Input and output are visible; the learned pattern and human decisions are hidden inside.",
    },
  ],
  activity: {
    id: "w1l3-act",
    kind: "device-investigation",
    title: "Device Investigation",
    goal: "Investigate the apps and devices you use and document the AI features you find.",
    status: "briefing",
    overview:
      "You will investigate familiar apps and devices, list the AI features you find, and for each one map the input, the output, and one human decision behind it. No accounts, personal data, camera, or microphone are needed — you are just describing features.",
    steps: [
      "List the apps and devices you use most.",
      "For each, find any feature that learns patterns (recommendations, autocomplete, photo search, face brightening, and so on).",
      "For at least three features, write the input, the output, and one human decision behind it.",
      "Share your most surprising find with the group.",
    ],
    materials: ["Paper and pencil, or a notes app", "A device you use often (optional)"],
    successCriteria: [
      "At least three AI features found across your apps and devices.",
      "Each has an input, an output, and one human decision documented.",
      "You can explain why each feature is AI and not fixed rules.",
    ],
    dataset: {
      id: "w1l3-act-ds",
      name: "Common apps checklist",
      description: "A built-in checklist of common app types (messaging, maps, photos, video, music, browser) with hints about where AI features often hide, for learners without a device handy.",
      rowCount: 8,
    },
  },
  knowledgeCheck: {
    id: "w1l3-kc",
    instructions: "Check that you can investigate and explain everyday AI.",
    passThreshold: 2,
    questions: [
      {
        id: "w1l3-kc-q1",
        kind: "single",
        prompt: "What are the two things you should name to understand any AI feature?",
        explanation: "Naming the input and the output turns a mysterious feature into one you can explain.",
        choices: [
          { id: "w1l3-kc-q1-a", text: "Its price and its brand", correct: false, explanation: "Price and brand don't explain how the feature works." },
          { id: "w1l3-kc-q1-b", text: "Its input and its output", correct: true, explanation: "Correct — input and output are the key to understanding any AI feature." },
          { id: "w1l3-kc-q1-c", text: "Its color and its size", correct: false, explanation: "These describe the device, not the AI feature." },
          { id: "w1l3-kc-q1-d", text: "Its battery and its screen", correct: false, explanation: "These are hardware parts, not how the AI decides." },
        ],
      },
      {
        id: "w1l3-kc-q2",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "The way an AI behaves can be traced back to human decisions, like which examples it learned from.",
        answer: true,
        explanation: "True — people decide the examples, the labels, and what counts as correct, and those choices shape the AI's behavior.",
      },
      {
        id: "w1l3-kc-q3",
        kind: "scenario",
        prompt: "Which is an example of an everyday AI feature?",
        scenario: "On the bus, Leo's phone suggests the word 'library' as he types 'lib', and his headphones pause when he takes them off.",
        explanation: "Word suggestion learned patterns from lots of text, so it's an AI feature. The headphone pause is a fixed rule from a sensor.",
        choices: [
          { id: "w1l3-kc-q3-a", text: "The headphones pausing when removed", correct: false, explanation: "That's a fixed sensor rule, not a learned pattern." },
          { id: "w1l3-kc-q3-b", text: "The keyboard suggesting 'library'", correct: true, explanation: "Correct — word suggestion learned patterns from text, so it's AI." },
          { id: "w1l3-kc-q3-c", text: "Neither is an AI feature", correct: false, explanation: "The word suggestion is an AI feature." },
        ],
      },
      {
        id: "w1l3-kc-q4",
        kind: "scenario",
        prompt: "What is the most honest classification here?",
        scenario: "A friend says a weather app 'is definitely AI.' But you don't know whether it uses physics equations, machine learning from past weather, or both.",
        explanation: "Without knowing how it works inside, you can't be sure. Some weather systems use fixed equations, some use machine learning, and many combine both — so 'not enough information' is the honest answer.",
        choices: [
          { id: "w1l3-kc-q4-a", text: "It's definitely machine learning", correct: false, explanation: "You can't be sure — it might use physics equations instead of learning from examples." },
          { id: "w1l3-kc-q4-b", text: "It's definitely a fixed-rule program", correct: false, explanation: "You can't be sure of that either — it might learn from past weather data." },
          { id: "w1l3-kc-q4-c", text: "Not enough information to say for sure", correct: true, explanation: "Correct — without knowing what's inside, the honest answer is that you need more information." },
        ],
      },
    ],
  },
  challenge: {
    id: "w1l3-ch",
    title: "AI feature field guide",
    prompt: "Make a short 'field guide' of five AI features you found, like a nature guide but for AI.",
    steps: [
      "Choose five AI features from your investigation.",
      "For each, write a name, its input, its output, and one human decision behind it.",
      "Rank them from 'most helpful' to 'least helpful' for you, with a reason.",
    ],
    successCriteria: [
      "Five AI features, each with input, output, and a human decision.",
      "A ranking with at least one clear reason.",
    ],
  },
  reflection: [
    { id: "w1l3-r1", prompt: "Which AI feature do you rely on most without thinking about it?" },
    { id: "w1l3-r2", prompt: "Now that you can spot the human decisions behind AI, what questions do you want to ask about the AI you use?" },
  ],
  recap: {
    id: "w1l3-recap",
    summary: "Everyday AI is everywhere; you can understand any feature by naming its input, output, and the human decisions behind it.",
    keyPoints: [
      "AI features often work quietly in the background of apps you use.",
      "Every AI feature has an input and an output you can name.",
      "Human decisions — especially which examples were used — shape how AI behaves.",
    ],
  },
  extension: {
    id: "w1l3-ext",
    title: "Design a better everyday AI",
    gradeBand: "7-8",
    body: [
      "Pick one everyday AI feature you found and imagine you could improve it. What extra examples would help it work better for more people?",
      "Write a short proposal: the feature, one problem it has, and the examples or human decisions that could fix it.",
    ],
  },
}

export const week1: CourseWeek = {
  id: "week-1",
  week: 1,
  title: "What AI Is and Is Not",
  subtitle: "Tell artificial intelligence apart from ordinary software, and spot the AI already around you.",
  summary:
    "Students learn what artificial intelligence really means, how it differs from traditional programs and automation, and how to recognize the everyday AI they already use — always asking whether software follows written rules or learns patterns from examples.",
  bigQuestion: "What makes something 'artificial intelligence' instead of ordinary software?",
  estimatedTime: "2.5-3 hours",
  objectives: [
    "Define artificial intelligence and tell it apart from traditional software.",
    "Explain the difference between automation and machine learning.",
    "Trace input, rules, output, and learned patterns.",
    "Recognize everyday AI and the human decisions behind it.",
  ],
  requiredConcepts: [
    "Artificial intelligence",
    "Automation",
    "Traditional programs",
    "Machine learning",
    "Input",
    "Rule",
    "Output",
    "Learned pattern",
    "Human decisions behind AI",
  ],
  lessons: [lessonAiOrNot, lessonRulesVsLearned, lessonDeviceInvestigation],
}
