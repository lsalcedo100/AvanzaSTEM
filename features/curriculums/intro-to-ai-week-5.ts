/**
 * Intro to AI — Week 5: Fairness, Privacy, and Reliable Information.
 *
 * Authored content only; conforms to the types in `intro-to-ai-types.ts`. Every
 * id is stable and unique (prefixed by the owning lesson id). No interactive
 * engines are wired up yet, so each activity is a `briefing`. Activities use only
 * built-in, described datasets and scenarios — no real personal data is collected,
 * and no camera, microphone, or coding is required.
 */
import type { CourseWeek, Lesson } from "./intro-to-ai-types.ts"

const lessonFairnessAudit: Lesson = {
  id: "w5l1",
  slug: "audit-a-dataset-for-fairness",
  order: 1,
  title: "Audit a Dataset for Fairness",
  summary:
    "Learn how uneven examples create bias, read group-level results to see who a system works well for, and audit a dataset for fairness.",
  estimatedTime: "50-60 minutes",
  objectives: [
    { id: "w5l1-o1", text: "Define bias and representation and explain how they are connected." },
    { id: "w5l1-o2", text: "Read a group-level result to compare how well a system works for different groups." },
    { id: "w5l1-o3", text: "Explain what fairness means when an AI treats groups differently." },
    { id: "w5l1-o4", text: "Audit a described dataset and name one way its examples are unbalanced." },
  ],
  materials: [
    { id: "w5l1-m1", name: "This lesson in a web browser", optional: false },
    { id: "w5l1-m2", name: "Paper and pencil, or a notes app", optional: false },
  ],
  vocabulary: [
    { id: "w5l1-v1", term: "Bias", definition: "When a system regularly works better or worse for some people or things than others, usually because of the examples it learned from." },
    { id: "w5l1-v2", term: "Representation", definition: "How much a group shows up in a dataset. A group is well represented if it has many examples, and underrepresented if it has few." },
    { id: "w5l1-v3", term: "Group-level result", definition: "A score measured separately for each group, instead of one number for everyone, so you can see who a system works well for." },
    { id: "w5l1-v4", term: "Fairness", definition: "Treating groups in a way people would agree is even and reasonable, so one group is not left worse off without a good reason." },
  ],
  openingScenario: {
    id: "w5l1-open",
    prompt: "A voice assistant understands one friend almost every time but keeps mishearing another friend who has a different accent. The software is the same for both. Why might it work so differently for the two of them?",
    context: "Keep your first guess in mind — you will test it against real group-level numbers later in the lesson.",
  },
  predictionPrompt: {
    id: "w5l1-pred",
    prompt: "Predict: if a face-recognition system learned mostly from photos of adults, do you think it will work equally well on photos of children?",
    howToCheck: "As you read the concepts and the group-level chart below, look for whether the number of examples for a group changes how well the system works for that group.",
  },
  concepts: [
    {
      id: "w5l1-c1",
      title: "Bias comes from the examples, not from the computer 'wanting' anything",
      body: [
        "A computer does not have opinions or feelings. When we say an AI is biased, we mean it regularly works better for some people or things than others. Almost always, that happens because of the examples it learned from.",
        "If a system learns from examples that are uneven, it becomes good at the common cases and weaker at the rare ones. The software is doing exactly what it was trained to do — the unevenness came from the data people gave it.",
      ],
      examples: [
        "A speech system trained mostly on one accent understands that accent best.",
        "A photo classifier trained mostly on daytime pictures struggles at night.",
        "A translation tool trained on formal writing handles slang poorly.",
      ],
    },
    {
      id: "w5l1-c2",
      title: "Representation: who is in the examples, and how much",
      body: [
        "Representation is about how much each group shows up in the data. A group is well represented when it has many examples and underrepresented when it has few. A dataset can have thousands of examples and still leave some groups with almost none.",
        "Underrepresentation is one of the biggest sources of bias. A model can only learn patterns it has seen. If a group barely appears in the examples, the model has little to learn from, so it tends to make more mistakes for that group.",
      ],
      examples: [
        "A dataset of 10,000 dog photos with only 20 photos of one breed.",
        "A medical dataset collected mostly from adults, with few children.",
        "A handwriting dataset with lots of print but very little cursive.",
      ],
    },
    {
      id: "w5l1-c3",
      title: "Group-level results show what one overall score hides",
      body: [
        "It is tempting to judge a system by a single number, like 'it is 92 percent accurate.' But one number is an average across everyone. It can look great while still failing badly for a smaller group whose mistakes get buried in the average.",
        "A group-level result measures accuracy separately for each group. When you break the score apart, you can see who the system works well for and who it works poorly for. Fairness questions almost always need group-level results, not just one overall number.",
      ],
      examples: [
        "Overall 92 percent, but only 74 percent for one accent group.",
        "Overall high accuracy, but far more errors on night photos than day photos.",
        "A test that passes on average yet fails often for left-handed writers.",
      ],
    },
    {
      id: "w5l1-c4",
      title: "Fairness: is anyone left worse off without a good reason?",
      body: [
        "Fairness means treating groups in a way people would agree is even and reasonable. It does not always require identical results, but it does ask whether one group is being left worse off, and whether there is a good reason for the gap.",
        "Fairness is a human judgment, not something the computer decides. People have to look at the group-level results, decide whether a gap is acceptable, and take responsibility for fixing it — often by collecting more balanced examples.",
      ],
      examples: [
        "Deciding a 74 percent versus 92 percent accuracy gap is too large to ship.",
        "Choosing to gather more examples from underrepresented groups.",
        "Asking who is harmed if the system makes a mistake for a particular group.",
      ],
    },
  ],
  workedExample: {
    id: "w5l1-we",
    title: "Auditing a smile-detector dataset",
    steps: [
      "Name the task. A camera app tries to snap a photo when everyone is smiling. Input: a face. Output: 'smiling' or 'not smiling'.",
      "Look at representation. The training set has 8,000 photos of adults and only 500 photos of young children.",
      "Predict the effect. With so few child examples, the model has little to learn about how children smile, so it will likely make more mistakes on children.",
      "Check the group-level result, not just the average. Overall accuracy is 90 percent, but split by group it is 94 percent for adults and 71 percent for children.",
      "Make the fairness call. The gap is large and children are worse off with no good reason, so the fair fix is to collect more child examples and re-test before shipping.",
    ],
    takeaway: "Audit a dataset by asking who is underrepresented, then check group-level results to see whether that unevenness turned into unfair mistakes.",
  },
  visuals: [
    {
      id: "w5l1-vis1",
      kind: "bar-chart",
      title: "Accuracy by group: one average hides a real gap",
      summary:
        "A bar chart of a speech-recognition system's accuracy measured separately for four accent groups, in percent. The overall average is 88 percent, but the groups are uneven: Accent group A 94 percent, Accent group B 91 percent, Accent group C 82 percent, and Accent group D 74 percent. Groups C and D, which had the fewest training examples, score far below the average, so the single overall number hides a real gap of about 20 points between the best and worst groups.",
      caption: "Break the average apart, and the system clearly works better for some groups than others.",
      chart: {
        unit: "% accuracy",
        bars: [
          { label: "Overall average", value: 88 },
          { label: "Accent group A", value: 94 },
          { label: "Accent group B", value: 91 },
          { label: "Accent group C", value: 82 },
          { label: "Accent group D", value: 74 },
        ],
      },
    },
    {
      id: "w5l1-vis2",
      kind: "table",
      title: "Representation lines up with the accuracy gap",
      summary:
        "A table linking how many training examples each accent group had to its accuracy. Group A: 5,000 examples, 94 percent accuracy. Group B: 4,200 examples, 91 percent. Group C: 900 examples, 82 percent. Group D: 400 examples, 74 percent. The groups with the fewest examples have the lowest accuracy, showing how underrepresentation turns into bias.",
      table: {
        columns: ["Accent group", "Training examples", "Accuracy"],
        rows: [
          ["A", "5,000", "94%"],
          ["B", "4,200", "91%"],
          ["C", "900", "82%"],
          ["D", "400", "74%"],
        ],
      },
    },
  ],
  activity: {
    id: "w5l1-act",
    kind: "fairness-audit",
    title: "Fairness Audit",
    goal: "Audit a fictional school's STEM-program recommender: see how an overall accuracy hides a weak result for a smaller group, then fix it by limiting a proxy feature and adding under-represented examples.",
    status: "interactive",
    overview:
      "A made-up school recommends after-school STEM programs. A transparent nearest-neighbor model predicts a good fit; you compare the overall accuracy with the accuracy for each group (Hillside and the smaller, farther Riverside). The flawed model over-relies on a misleading proxy feature — 'lives near campus' — which tracks neighborhood, not fit, and it was trained with too few good-fit Riverside examples. Lower the proxy's weight and add the missing examples, then rerun and compare to the flawed baseline. Everything is fictional and deterministic; improving representation helps but never guarantees perfect fairness.",
    steps: [
      "Read the overall accuracy, then the accuracy for each group — notice the gap.",
      "Lower the weight of the misleading 'near campus' proxy feature.",
      "Add the missing good-fit examples for the under-represented Riverside group.",
      "Rerun and compare group-level accuracy, false approvals, and missed students before and after.",
    ],
    materials: ["The built-in fairness audit in this activity"],
    successCriteria: [
      "The group-level gap hidden by the overall number is identified.",
      "The proxy feature is limited and under-represented examples are added.",
      "Before/after group accuracy is compared, noting fairness improved but isn't guaranteed.",
    ],
    dataset: {
      id: "w5l1-act-ds",
      name: "STEM-program recommender audit set",
      description: "A fictional, deterministic dataset for a school STEM-program recommender: student records with a group label (Hillside/Riverside), relevant features, a misleading 'near campus' proxy, uneven group representation, and a held-back test set. No real or personal data.",
      columns: ["Group", "Features", "Proxy feature", "Good fit?"],
      rowCount: 4,
    },
  },
  knowledgeCheck: {
    id: "w5l1-kc",
    instructions: "Answer these to check that you can spot bias, read group-level results, and judge fairness.",
    passThreshold: 2,
    questions: [
      {
        id: "w5l1-kc-q1",
        kind: "single",
        prompt: "Where does bias in an AI system most often come from?",
        explanation: "A computer has no opinions; bias almost always traces back to uneven examples in the training data.",
        choices: [
          { id: "w5l1-kc-q1-a", text: "The computer decides it dislikes a group.", correct: false, explanation: "Software has no likes or dislikes; it only reflects patterns in its data." },
          { id: "w5l1-kc-q1-b", text: "The examples it learned from were uneven, so it learned some groups better than others.", correct: true, explanation: "Correct — uneven representation in the data is the most common source of bias." },
          { id: "w5l1-kc-q1-c", text: "The computer is too slow.", correct: false, explanation: "Speed has nothing to do with whether a system is biased." },
          { id: "w5l1-kc-q1-d", text: "Bias only happens when someone hacks the system.", correct: false, explanation: "Bias usually comes from ordinary uneven data, not from hacking." },
        ],
      },
      {
        id: "w5l1-kc-q2",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "A single overall accuracy number is enough to prove that a system is fair to every group.",
        answer: false,
        explanation: "One overall number is an average that can hide poor results for a smaller group; you need group-level results to judge fairness.",
      },
      {
        id: "w5l1-kc-q3",
        kind: "scenario",
        prompt: "Based on the group-level results, what is the most reasonable next step?",
        scenario: "A photo app reports 90 percent accuracy overall. Broken down by group, it is 95 percent for adults and 70 percent for children. The training set had very few photos of children.",
        explanation: "The low child score lines up with too few child examples, so the fair fix is to collect more child examples and re-test.",
        choices: [
          { id: "w5l1-kc-q3-a", text: "Ship it, because 90 percent overall is good enough.", correct: false, explanation: "The 90 percent average hides that the system works poorly for children." },
          { id: "w5l1-kc-q3-b", text: "Collect more photos of children to balance the data, then test again.", correct: true, explanation: "Correct — more balanced representation directly targets the cause of the gap." },
          { id: "w5l1-kc-q3-c", text: "Delete the adult photos so the numbers match.", correct: false, explanation: "Throwing away good data does not help children and weakens the system for everyone." },
          { id: "w5l1-kc-q3-d", text: "Nothing, because computers cannot be biased.", correct: false, explanation: "The group-level gap is clear evidence of bias that should be addressed." },
        ],
      },
    ],
  },
  challenge: {
    id: "w5l1-ch",
    title: "Design a fairer dataset",
    prompt: "Pick a simple AI task and plan a dataset that would be fair across groups before any model is trained.",
    steps: [
      "Choose a task, such as reading handwriting or recognizing pets.",
      "List the groups the system should work well for.",
      "Decide roughly how many examples each group needs so none is underrepresented.",
      "Write how you would check the result with a group-level accuracy, not just an overall average.",
    ],
    successCriteria: [
      "At least three groups the system should serve are named.",
      "A plan gives each group enough examples to avoid underrepresentation.",
      "The plan checks fairness using group-level results.",
    ],
  },
  reflection: [
    { id: "w5l1-r1", prompt: "Think of a tool you use that might work better for some people than others. Whose examples might be missing from its data?" },
    { id: "w5l1-r2", prompt: "Why can a system look fair when you read only its overall score, yet be unfair when you read its group-level results?" },
  ],
  recap: {
    id: "w5l1-recap",
    summary: "Bias usually comes from uneven representation, and only group-level results reveal whether a system is fair to every group.",
    keyPoints: [
      "Bias means a system regularly works better for some groups than others, usually because of its examples.",
      "Underrepresented groups tend to get more mistakes because the model saw fewer of them.",
      "A single overall score can hide a real gap; group-level results show who the system works for.",
      "Fairness is a human judgment about whether a gap is acceptable and how to fix it.",
    ],
  },
  extension: {
    id: "w5l1-ext",
    title: "When equal accuracy still is not fair",
    gradeBand: "7-8",
    body: [
      "Sometimes two groups have the same accuracy, but the mistakes matter more for one of them. Imagine a system that flags library books as 'overdue.' A wrong flag might be a minor annoyance for one group but block another group from borrowing at all.",
      "Pick a decision an AI might make, and describe a case where equal accuracy across groups still leads to an unfair outcome because the cost of a mistake is not equal. What extra information would you need to notice that?",
    ],
  },
}

const lessonPrivacyMinimize: Lesson = {
  id: "w5l2",
  slug: "protect-privacy-minimize-data",
  order: 2,
  title: "Protect Privacy and Minimize Data",
  summary:
    "Learn what counts as personal data, why consent matters, and how data minimization keeps an AI feature working while collecting far less about people.",
  estimatedTime: "45-55 minutes",
  objectives: [
    { id: "w5l2-o1", text: "Define privacy and personal data and give examples of each." },
    { id: "w5l2-o2", text: "Explain what consent means and why it must be informed." },
    { id: "w5l2-o3", text: "Apply data minimization to keep only the data a feature truly needs." },
    { id: "w5l2-o4", text: "Redesign a described feature so it collects less personal data." },
  ],
  materials: [
    { id: "w5l2-m1", name: "This lesson in a web browser", optional: false },
    { id: "w5l2-m2", name: "Paper and pencil, or a notes app", optional: false },
  ],
  vocabulary: [
    { id: "w5l2-v1", term: "Privacy", definition: "A person's right to control who can see and use information about them." },
    { id: "w5l2-v2", term: "Personal data", definition: "Any information that is about a particular person, such as a name, address, exact location, birthday, photo, or messages." },
    { id: "w5l2-v3", term: "Consent", definition: "A person clearly agreeing to let their data be collected or used, after being told plainly what will happen with it." },
    { id: "w5l2-v4", term: "Data minimization", definition: "Collecting and keeping only the data a feature truly needs to work, and no more." },
  ],
  openingScenario: {
    id: "w5l2-open",
    prompt: "A free flashlight app asks to see your contacts, your exact location, and your photos before it will turn on the light. A flashlight only needs to control the light. Why might an app ask for far more data than its job requires?",
    context: "Hold on to your answer — by the end you will be able to redesign a feature so it stops over-collecting.",
  },
  predictionPrompt: {
    id: "w5l2-pred",
    prompt: "Predict: for a weather app to show today's forecast, which is enough — your city, or your exact street address and full location history?",
    howToCheck: "As you read about data minimization, decide the smallest piece of data that still lets the feature do its job.",
  },
  concepts: [
    {
      id: "w5l2-c1",
      title: "Privacy and personal data: what needs protecting",
      body: [
        "Privacy is your right to control who can see and use information about you. Personal data is any information that is about a particular person — a name, a home address, an exact location, a birthday, a photo of a face, or private messages.",
        "Not all data is personal. 'It rained on Tuesday' is not about any one person. But 'Ana was at the park at 4:00' is personal data, because it tells someone about a specific person. AI features often run on personal data, which is exactly why privacy matters here.",
      ],
      examples: [
        "Personal data: full name, home address, exact GPS location, face photo.",
        "Usually not personal: the current weather, a public bus schedule.",
        "Sensitive personal data: health information, private messages.",
      ],
    },
    {
      id: "w5l2-c2",
      title: "Consent means an informed yes, not a hidden one",
      body: [
        "Consent is a person clearly agreeing to let their data be collected or used. For consent to be real, it must be informed: the person is told, in plain language, what data is taken and what it is used for, and they can say no.",
        "Consent buried in fine print, pre-checked boxes, or a confusing pop-up is not real consent, because the person never truly understood or freely chose. Good design asks clearly and makes 'no' an easy, safe option.",
      ],
      examples: [
        "Clear consent: 'Share your location so we can show nearby stops? Yes / No.'",
        "Not real consent: a long agreement that hides data sharing in paragraph 40.",
        "Not real consent: an app that will not work unless you allow unrelated tracking.",
      ],
    },
    {
      id: "w5l2-c3",
      title: "Data minimization: collect only what the job needs",
      body: [
        "Data minimization is a simple, powerful rule: collect and keep only the data a feature actually needs to work. If a feature can do its job with less, it should. Data you never collect cannot be leaked, misused, or seen by the wrong people.",
        "To minimize, ask for each piece of data, 'Does the feature truly need this to work?' A weather forecast needs your general area, not your exact address or your entire location history. Cutting the extra data keeps the feature useful while lowering the risk to people.",
      ],
      examples: [
        "A forecast that uses your city instead of your precise GPS trail.",
        "A step counter that stores today's total, not everywhere you walked.",
        "A sign-up that asks for a nickname instead of your legal full name.",
      ],
    },
    {
      id: "w5l2-c4",
      title: "Less data, same job: minimization in practice",
      body: [
        "Minimizing does not mean breaking the feature. Most features can be redesigned to need less by using a broader or shorter-lived version of the data. Instead of an exact location, use a general area. Instead of keeping data forever, delete it once the task is done.",
        "This is a design choice made by people. When you build or judge an AI feature, you can push for the version that collects the least personal data while still doing its job — that is respecting privacy by design, not by accident.",
      ],
      examples: [
        "Turn 'exact address' into 'city' for a weather feature.",
        "Turn 'keep forever' into 'delete after the trip ends' for a map route.",
        "Turn 'real name and birthday' into 'nickname only' for a game leaderboard.",
      ],
    },
  ],
  workedExample: {
    id: "w5l2-we",
    title: "Minimizing a school bus-tracker feature",
    steps: [
      "Name the feature's job. Show a student when their bus is about five minutes away so they can head to the stop.",
      "List what a careless version might collect. The student's exact GPS location all day, their full name, their home address, and their whole location history.",
      "Ask the minimization question for each item. To alert 'bus is near your stop,' the feature needs the one stop the student uses — not a full day of tracking.",
      "Redesign with less. Let the student pick their stop from a list. Store only that stop, and only compare it to the bus location while the bus is running.",
      "Check consent. Ask clearly, 'Alert you when the bus nears your stop? Yes / No,' and make sure the student and family understand and can decline.",
    ],
    takeaway: "Start from the feature's real job, then keep only the smallest data that still does that job — and ask for it with clear consent.",
  },
  visuals: [
    {
      id: "w5l2-vis1",
      kind: "before-after",
      title: "Redesigning a feature to collect less",
      summary:
        "A before-and-after comparison of a bus-tracker feature. Before (over-collecting): stores the student's exact location all day, full legal name, home address, and complete location history kept forever. After (minimized): stores only the one bus stop the student selected, checked against the bus location only while the bus is running, and deleted at the end of the day. The 'after' version does the same job — alerting the student when the bus is near — while holding far less personal data.",
      caption: "Same job, far less personal data: the minimized design lowers the risk to the student.",
    },
    {
      id: "w5l2-vis2",
      kind: "table",
      title: "Does the feature really need it?",
      summary:
        "A table testing each piece of data a weather feature might request against whether it is truly needed. General area or city: needed, because the forecast is local. Exact GPS address: not needed, the city is enough. Full location history: not needed, only current area matters. Contacts list: not needed, unrelated to weather. The rule of thumb is to keep only rows marked 'needed'.",
      table: {
        columns: ["Data requested", "Needed for a local forecast?", "Keep it?"],
        rows: [
          ["General area or city", "Yes — forecast is local", "Keep"],
          ["Exact GPS address", "No — city is enough", "Drop"],
          ["Full location history", "No — only current area matters", "Drop"],
          ["Contacts list", "No — unrelated to weather", "Drop"],
        ],
      },
    },
  ],
  activity: {
    id: "w5l2-act",
    kind: "privacy-minimize",
    title: "Privacy and Data Minimization Lab",
    goal: "For several fictional apps, classify each data field as required, helpful, unnecessary, or too sensitive — then compare with guidance on safer alternatives, consent, and how long to keep data.",
    status: "interactive",
    overview:
      "Pick a fictional app (book recommender, event reminder, recycling helper, study planner, or museum guide) and go field by field — first name, exact birthday, age range, exact location, voice recording, photo, device id, and more — deciding whether it is required, helpful but optional, unnecessary, or too sensitive for that purpose. Reveal the guidance to see why each field may or may not be needed, a safer alternative, whether consent is needed, how long to keep it, and whether on-device processing lowers the risk. The goal is data minimization — collecting only what's truly needed. Nothing personal is entered; the apps and fields are built in.",
    steps: [
      "Choose an app and read its purpose.",
      "Classify each data field: required, helpful, unnecessary, or too sensitive.",
      "Reveal the guidance and compare, reading the safer alternative, consent, and retention for each.",
      "Notice how the same field can be required for one app and unnecessary for another.",
    ],
    materials: ["The built-in privacy lab in this activity"],
    successCriteria: [
      "Every field is classified for at least one app.",
      "Unnecessary and too-sensitive fields are recognized (data minimization).",
      "The safer alternatives, consent needs, and retention guidance are read.",
    ],
    dataset: {
      id: "w5l2-act-ds",
      name: "App scenarios and data fields",
      description: "Five built-in fictional app scenarios and thirteen possible data fields, each with an authored answer key (recommended classification, why, safer alternative, consent, retention, on-device processing). No real personal data is entered.",
      columns: ["App", "Data field", "Classification", "Safer alternative"],
      rowCount: 5,
    },
  },
  knowledgeCheck: {
    id: "w5l2-kc",
    instructions: "Answer these to check that you understand personal data, consent, and data minimization.",
    passThreshold: 2,
    questions: [
      {
        id: "w5l2-kc-q1",
        kind: "multiple",
        prompt: "Which of these count as personal data? Select all that apply.",
        explanation: "Personal data is information about a particular person; a public bus schedule is not about any one person.",
        choices: [
          { id: "w5l2-kc-q1-a", text: "A person's home address", correct: true, explanation: "Correct — a home address is information about a specific person." },
          { id: "w5l2-kc-q1-b", text: "A photo showing someone's face", correct: true, explanation: "Correct — a face photo identifies a particular person, so it is personal data." },
          { id: "w5l2-kc-q1-c", text: "The public bus schedule for a city", correct: false, explanation: "A public schedule is not about any one person, so it is not personal data." },
          { id: "w5l2-kc-q1-d", text: "A person's exact location right now", correct: true, explanation: "Correct — an exact location tells where a specific person is, so it is personal data." },
        ],
      },
      {
        id: "w5l2-kc-q2",
        kind: "scenario",
        prompt: "Which choice best follows data minimization?",
        scenario: "A quiz-game app needs a name to show on the score list. It offers three options for what to collect from each player.",
        explanation: "The leaderboard only needs a display name, so a nickname is the least personal data that still does the job.",
        choices: [
          { id: "w5l2-kc-q2-a", text: "Collect a nickname the player types in.", correct: true, explanation: "Correct — a nickname does the job with the least personal data." },
          { id: "w5l2-kc-q2-b", text: "Collect the player's full legal name and birthday.", correct: false, explanation: "The leaderboard does not need a legal name or birthday, so this over-collects." },
          { id: "w5l2-kc-q2-c", text: "Collect the player's contacts and location too.", correct: false, explanation: "Contacts and location are unrelated to showing a score, so this is far more than needed." },
        ],
      },
      {
        id: "w5l2-kc-q3",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "Hiding an agreement to share data deep in fine print, where users are unlikely to read it, still counts as real, informed consent.",
        answer: false,
        explanation: "Informed consent means the person is told clearly and can freely choose; data sharing hidden in fine print is not informed consent.",
      },
    ],
  },
  challenge: {
    id: "w5l2-ch",
    title: "Minimize a feature you use",
    prompt: "Pick a common app feature and redesign it to collect the least personal data while still working.",
    steps: [
      "Describe the feature and its real job in one sentence.",
      "List the personal data it might collect.",
      "Cross out everything the job does not truly need.",
      "Write the minimized version and one clear consent question for it.",
    ],
    successCriteria: [
      "The feature's job is stated clearly.",
      "At least one piece of unnecessary personal data is removed.",
      "A clear consent question is written with an easy way to decline.",
    ],
  },
  reflection: [
    { id: "w5l2-r1", prompt: "Which app on your device do you think collects more data than its job needs? What could it drop?" },
    { id: "w5l2-r2", prompt: "Why does collecting less personal data protect people even if no one ever misuses it?" },
  ],
  recap: {
    id: "w5l2-recap",
    summary: "Privacy means controlling personal data; consent must be informed, and data minimization keeps only what a feature truly needs.",
    keyPoints: [
      "Personal data is information about a particular person, like a name, address, or exact location.",
      "Real consent is informed and freely given, not hidden in fine print.",
      "Data minimization means collecting only what the feature needs to work.",
      "Data you never collect cannot be leaked or misused, so less data means less risk.",
    ],
  },
  extension: {
    id: "w5l2-ext",
    title: "The trade-off behind 'free' apps",
    gradeBand: "7-8",
    body: [
      "Many apps are free because they collect and use data about their users. That does not make every free app harmful, but it does mean the question 'what does this app get from me?' is worth asking.",
      "Pick a free app or service and describe the possible trade: what does the user get, and what data might the company collect in return? Which pieces of that data would data minimization say the app does not actually need?",
    ],
  },
}

const lessonContentInvestigation: Lesson = {
  id: "w5l3",
  slug: "investigate-ai-content",
  order: 3,
  title: "Investigate AI Content and Make an Ethics Decision",
  summary:
    "Learn to verify AI-made and online content by finding the original source, checking context, and confirming independently — then make an ethics decision with human oversight and a right to appeal.",
  estimatedTime: "50-60 minutes",
  objectives: [
    { id: "w5l3-o1", text: "Define deepfake and misinformation and explain how they can mislead." },
    { id: "w5l3-o2", text: "Verify a claim by finding its original source and checking context." },
    { id: "w5l3-o3", text: "Use independent confirmation from separate, trustworthy sources." },
    { id: "w5l3-o4", text: "Explain why important AI decisions need human oversight and a right to appeal." },
  ],
  materials: [
    { id: "w5l3-m1", name: "This lesson in a web browser", optional: false },
    { id: "w5l3-m2", name: "Paper and pencil, or a notes app", optional: false },
  ],
  vocabulary: [
    { id: "w5l3-v1", term: "Deepfake", definition: "A photo, video, or audio clip made or changed by AI to show a person saying or doing something they did not really say or do." },
    { id: "w5l3-v2", term: "Misinformation", definition: "False or misleading information that spreads, whether or not the person sharing it means to deceive." },
    { id: "w5l3-v3", term: "Original source", definition: "The first place a claim, quote, or image actually came from, before it was copied or reshared." },
    { id: "w5l3-v4", term: "Context", definition: "The full surrounding story — when, where, and why something happened — that gives a fact its real meaning." },
    { id: "w5l3-v5", term: "Independent confirmation", definition: "Checking a claim against two or more separate, trustworthy sources that did not simply copy each other." },
    { id: "w5l3-v6", term: "Human oversight", definition: "A person reviewing and staying responsible for an AI's important decisions, instead of letting the software decide alone." },
    { id: "w5l3-v7", term: "Appeal", definition: "The right to ask a person to review and possibly change a decision an AI made about you." },
  ],
  openingScenario: {
    id: "w5l3-open",
    prompt: "A video clip spreads online showing a famous scientist saying something shocking. It looks and sounds real. Before you believe it or share it, what would you want to check first?",
    context: "AI can now make convincing fake images, video, and audio, so 'it looks real' is no longer enough to trust something.",
  },
  predictionPrompt: {
    id: "w5l3-pred",
    prompt: "Predict: if the same surprising claim appears on five accounts that all copied one post, does that make it five independent confirmations?",
    howToCheck: "As you read about independent confirmation, decide whether copies of one source count as separate confirmations.",
  },
  concepts: [
    {
      id: "w5l3-c1",
      title: "Deepfakes and misinformation: why 'it looks real' is not proof",
      body: [
        "A deepfake is a photo, video, or audio clip that AI made or changed to show a person saying or doing something they never did. Because AI keeps getting better at this, a clip can look and sound convincing and still be fake.",
        "Misinformation is false or misleading information that spreads. It is not always a deepfake, and the person sharing it does not always mean to mislead — a real photo can spread with a false caption. Either way, the fix is the same: do not trust something just because it looks real or many people shared it.",
      ],
      examples: [
        "A video with a person's mouth and voice altered by AI to fake a quote.",
        "A real old photo reshared with a false claim that it happened today.",
        "A made-up 'statistic' repeated so often it starts to feel true.",
      ],
    },
    {
      id: "w5l3-c2",
      title: "Find the original source and check the context",
      body: [
        "To verify a claim, trace it back to its original source — the first place it actually came from, before it was copied and reshared. A screenshot of a quote is not the source; the real article, video, or official page is. If you cannot find any original source, that is a warning sign.",
        "Then check the context: when, where, and why it happened. A real photo can be misleading if it is old, from a different place, or missing the surrounding story. Context is what turns a stray fact into an honest one.",
      ],
      examples: [
        "Tracing a quote back to the full interview it was clipped from.",
        "Finding that a 'breaking' photo is actually from an event years ago.",
        "Reading the whole statement to see a quote was cut off mid-sentence.",
      ],
    },
    {
      id: "w5l3-c3",
      title: "Independent confirmation: separate sources, not echoes",
      body: [
        "One source can be wrong, so strong claims need independent confirmation: two or more separate, trustworthy sources that did not simply copy each other. Ten accounts resharing the same post are still just one source echoing around, not ten confirmations.",
        "To confirm independently, look for reporting or records that reached the claim on their own — a different news organization, an official page, an expert. If independent sources agree, the claim is far more likely to be true. If only one source has it, stay cautious.",
      ],
      examples: [
        "Two separate news outlets that each reported a story on their own.",
        "An official organization's own page confirming its own announcement.",
        "Noticing five 'sources' all link back to the same single post.",
      ],
    },
    {
      id: "w5l3-c4",
      title: "Human oversight and the right to appeal",
      body: [
        "AI can help flag possible fakes or sort information, but it makes mistakes, so important decisions need human oversight — a person who reviews the decision and stays responsible for it. This matters most when a decision affects someone's life, like flagging a post as fake, grading work, or blocking an account.",
        "People affected by an AI decision should also have the right to appeal: to ask a human to review the decision and change it if the AI got it wrong. Oversight and appeal are how we keep people, not software, in charge of decisions that matter.",
      ],
      examples: [
        "A person reviewing posts an AI flagged before any are removed.",
        "A student asking a teacher to re-check an AI-graded answer.",
        "A user appealing to a human after an AI wrongly locked their account.",
      ],
    },
  ],
  workedExample: {
    id: "w5l3-we",
    title: "Investigating a shocking viral clip",
    steps: [
      "Pause before sharing. The clip is surprising and emotional, which is exactly when misinformation spreads fastest.",
      "Find the original source. Search for the full video or the official statement, not just the short clip someone reposted.",
      "Check the context. Notice the clip was cut from a longer talk where the person said the opposite; the quote was taken out of context.",
      "Confirm independently. Look for a separate, trustworthy source. No independent outlet reports the shocking claim — a strong sign it is not real.",
      "Decide with oversight and appeal. Because the stakes are high, a human moderator, not the AI alone, reviews it and labels it misleading, and the original poster can appeal if they have real evidence.",
    ],
    takeaway: "Verify by source and context, confirm independently, and keep a human in charge with a way to appeal before acting on a serious claim.",
  },
  visuals: [
    {
      id: "w5l3-vis1",
      kind: "flow",
      title: "A verification checklist for online content",
      summary:
        "A four-step flow for checking a claim before believing or sharing it. Step 1: Find the original source (the first place it came from, not a screenshot). Step 2: Check the context (when, where, and why it happened). Step 3: Confirm independently (two or more separate, trustworthy sources that did not copy each other). Step 4: Decide with human oversight and keep a right to appeal. If any step fails, do not share it as true.",
      caption: "Run the four steps in order; a claim that fails a step should not be shared as true.",
    },
    {
      id: "w5l3-vis2",
      kind: "table",
      title: "Real confirmation versus an echo",
      summary:
        "A table telling apart real independent confirmation from an echo of one source. Five reposts of the same original post: not independent, because they all trace to one source. Two different news outlets reporting on their own: independent, because they reached the claim separately. An official organization confirming its own news: independent and trustworthy. One anonymous account with no source: not confirmation, treat with caution.",
      table: {
        columns: ["What you found", "Independent confirmation?"],
        rows: [
          ["Five reposts of the same original post", "No — one source echoing"],
          ["Two separate news outlets, each reporting on its own", "Yes — independent"],
          ["An official organization confirming its own news", "Yes — trustworthy source"],
          ["One anonymous account with no linked source", "No — verify before trusting"],
        ],
      },
    },
  ],
  activity: {
    id: "w5l3-act",
    kind: "content-investigation",
    title: "Content Investigation and Ethics Decision",
    goal: "Investigate fictional posts using source-and-context evidence, then act as an ethics committee on proposed AI systems and design an appeal process.",
    status: "interactive",
    overview:
      "Part 1: investigate a library of fictional posts — an honestly-labeled AI illustration, a real photo with a misleading caption, a fabricated quote, a false date, a source-less claim, a reliably-sourced claim, and an emotional chain post. For each, run the seven source-and-context checks (who published it, is there an original source, is the date right, does the caption match the context, is there evidence, do independent sources confirm it, does it rush your emotions) and judge whether to trust, question, or leave it unconfirmed. Visual 'tells' like strange hands are treated as unreliable, and the activity does not claim to detect AI content perfectly. Part 2: weigh six proposed AI systems as an ethics committee, choosing a decision and safeguards — with feedback based on whether your safeguards fit the stakes, not one 'correct' answer. Part 3: design an appeal process. All fictional; nothing is sent anywhere.",
    steps: [
      "For each post, read the seven evidence checks and judge: trust, question, or leave unconfirmed.",
      "Compare with the recommendation and the teaching note about source and context.",
      "As an ethics committee, choose a decision and safeguards for a proposed AI system.",
      "Design an appeal process: disclosure, explanation, reviewer, correction, documentation, and override.",
    ],
    materials: ["The built-in content investigation, ethics committee, and appeal designer in this activity"],
    successCriteria: [
      "Posts are judged using source and context evidence, not a visual trick.",
      "An ethics decision is made with safeguards that fit the stakes.",
      "A complete appeal process is designed with human oversight and a way to correct mistakes.",
    ],
    dataset: {
      id: "w5l3-act-ds",
      name: "Posts, ethics scenarios, and appeal designer",
      description: "A built-in library of eight fictional posts (each with seven source-and-context evidence checks and a recommended verdict), six ethics-committee scenarios (with stakes, likely mistakes, and key safeguards), and a six-part appeal-process designer. All fictional; no real accounts, people, or personal data.",
      columns: ["Post / scenario", "Evidence or stakes", "Recommended verdict / safeguards"],
      rowCount: 8,
    },
  },
  knowledgeCheck: {
    id: "w5l3-kc",
    instructions: "Answer these to check that you can verify content and reason about oversight and appeal.",
    passThreshold: 2,
    questions: [
      {
        id: "w5l3-kc-q1",
        kind: "ordering",
        prompt: "Put the steps of verifying a surprising claim in a sensible order.",
        explanation: "Verify by finding the original source, checking its context, confirming with independent sources, and only then deciding what to do.",
        items: [
          { id: "w5l3-kc-q1-i1", text: "Find the original source the claim came from" },
          { id: "w5l3-kc-q1-i2", text: "Check the context: when, where, and why it happened" },
          { id: "w5l3-kc-q1-i3", text: "Confirm it with two or more independent sources" },
          { id: "w5l3-kc-q1-i4", text: "Decide what to do, with a human reviewing the decision" },
        ],
        correctOrder: ["w5l3-kc-q1-i1", "w5l3-kc-q1-i2", "w5l3-kc-q1-i3", "w5l3-kc-q1-i4"],
      },
      {
        id: "w5l3-kc-q2",
        kind: "single",
        prompt: "Which of these is true independent confirmation of a claim?",
        explanation: "Independent confirmation needs separate sources that reached the claim on their own, not copies of one post.",
        choices: [
          { id: "w5l3-kc-q2-a", text: "The same post reshared by many accounts", correct: false, explanation: "Reshares of one post are a single source echoing, not independent confirmation." },
          { id: "w5l3-kc-q2-b", text: "Two separate, trustworthy sources that each reported it on their own", correct: true, explanation: "Correct — separate sources that did not copy each other are real independent confirmation." },
          { id: "w5l3-kc-q2-c", text: "One anonymous account that says 'trust me'", correct: false, explanation: "A single unnamed account with no source is not confirmation at all." },
          { id: "w5l3-kc-q2-d", text: "The claim feeling true because it is surprising", correct: false, explanation: "A feeling is not evidence; surprising claims especially need checking." },
        ],
      },
      {
        id: "w5l3-kc-q3",
        kind: "scenario",
        prompt: "What is the most responsible way to handle this AI decision?",
        scenario: "A school app uses AI to flag essays it predicts were copied. It flags Priya's essay, which she actually wrote herself.",
        explanation: "AI can be wrong, so a human should review the flag and Priya should be able to appeal to a person.",
        choices: [
          { id: "w5l3-kc-q3-a", text: "Automatically give a zero, because the AI is never wrong.", correct: false, explanation: "AI does make mistakes, so acting on the flag with no human review is unfair." },
          { id: "w5l3-kc-q3-b", text: "Have a teacher review the flag, and let Priya appeal and explain.", correct: true, explanation: "Correct — human oversight plus a right to appeal protects people from AI errors." },
          { id: "w5l3-kc-q3-c", text: "Hide the flag from Priya so she cannot argue.", correct: false, explanation: "Hiding the decision removes any chance to appeal, which is unfair to Priya." },
          { id: "w5l3-kc-q3-d", text: "Delete the essay so no one has to decide.", correct: false, explanation: "Deleting her work punishes Priya and still gives her no fair review." },
        ],
      },
    ],
  },
  challenge: {
    id: "w5l3-ch",
    title: "Write a verification guide",
    prompt: "Make a short guide a friend could use to check whether a viral post is trustworthy before sharing it.",
    steps: [
      "Write the four steps: original source, context, independent confirmation, and a human check.",
      "For each step, add one plain question the friend can ask themselves.",
      "Add one line about when a decision needs human oversight and a way to appeal.",
    ],
    successCriteria: [
      "All four verification steps appear in a clear order.",
      "Each step has a simple, usable question.",
      "The guide mentions human oversight and the right to appeal.",
    ],
  },
  reflection: [
    { id: "w5l3-r1", prompt: "Think of a time something surprising spread online. What would have helped people check it before sharing?" },
    { id: "w5l3-r2", prompt: "Why is the right to appeal an AI decision important, even when the AI is usually correct?" },
  ],
  recap: {
    id: "w5l3-recap",
    summary: "Because AI can fake and spread convincing content, verify by source and context, confirm independently, and keep humans in charge with a right to appeal.",
    keyPoints: [
      "Deepfakes and misinformation mean 'it looks real' is not proof.",
      "Trace claims to the original source and check the context around them.",
      "Independent confirmation needs separate sources, not copies of one post.",
      "Important AI decisions need human oversight and a right to appeal.",
    ],
  },
  extension: {
    id: "w5l3-ext",
    title: "When speed fights accuracy",
    gradeBand: "7-8",
    body: [
      "Online, being first often gets more attention than being right, so misleading content can spread before anyone verifies it. Careful verification takes time that a fast-moving feed does not reward.",
      "Describe a situation where the pressure to share quickly clashes with the steps for verifying a claim. What could a platform, or a person, do to make the accurate choice easier than the fast one?",
    ],
  },
}

export const week5: CourseWeek = {
  id: "week-5",
  week: 5,
  title: "Fairness, Privacy, and Reliable Information",
  subtitle: "Audit AI for bias, protect people's data, and check whether the content you see can be trusted.",
  summary:
    "Students learn to judge AI responsibly: how uneven data creates bias and how group-level results reveal it, why privacy and consent matter and how data minimization lowers risk, and how to verify AI-made and online content by finding the original source, checking context, and confirming independently — all while keeping humans in charge through oversight and the right to appeal.",
  bigQuestion: "How can we tell whether an AI system is fair, respects privacy, and gives us information we can trust?",
  estimatedTime: "2.5-3 hours",
  objectives: [
    "Explain how bias comes from uneven representation and read group-level results to detect it.",
    "Define privacy, personal data, and consent, and apply data minimization to a feature.",
    "Verify content using the original source, context, and independent confirmation.",
    "Explain why important AI decisions need human oversight and a right to appeal.",
  ],
  requiredConcepts: [
    "Bias",
    "Representation",
    "Group-level result",
    "Fairness",
    "Privacy",
    "Consent",
    "Personal data",
    "Data minimization",
    "Deepfake",
    "Misinformation",
    "Original source",
    "Context",
    "Independent confirmation",
    "Human oversight",
    "Appeal",
  ],
  lessons: [lessonFairnessAudit, lessonPrivacyMinimize, lessonContentInvestigation],
}
