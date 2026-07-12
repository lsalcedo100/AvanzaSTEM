/**
 * Intro to AI — Week 2: How Data Teaches a Model.
 *
 * Authored content only; conforms to the types in `intro-to-ai-types.ts`. Every
 * id is stable and unique (prefixed by the owning lesson id). No interactive
 * engines are wired up yet, so each activity is a `briefing`.
 */
import type { CourseWeek, Lesson } from "./intro-to-ai-types.ts"

const lessonExamplesLabelsFeatures: Lesson = {
  id: "w2l1",
  slug: "examples-labels-features",
  order: 1,
  title: "Examples, Labels, and Features",
  summary:
    "Open up a dataset and meet its building blocks: each example, the label that says which category it belongs to, and the features that describe it.",
  estimatedTime: "45-55 minutes",
  objectives: [
    { id: "w2l1-o1", text: "Name the parts of a dataset: examples, labels, and features." },
    { id: "w2l1-o2", text: "Read a data table and point to one example, its features, and its label." },
    { id: "w2l1-o3", text: "Explain how features and labels help a model learn a pattern for a category." },
  ],
  materials: [
    { id: "w2l1-m1", name: "This lesson in a web browser", optional: false },
    { id: "w2l1-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w2l1-m3", name: "The built-in fruit dataset shown in this lesson", optional: false, note: "No downloads or outside data needed — it is included here." },
  ],
  vocabulary: [
    { id: "w2l1-v1", term: "Dataset", definition: "A collection of examples gathered together for a model to learn from, often shown as a table of rows and columns." },
    { id: "w2l1-v2", term: "Example", definition: "One item in a dataset — usually one row — like a single fruit, photo, or message." },
    { id: "w2l1-v3", term: "Label", definition: "The correct answer attached to an example, telling which category it belongs to, such as 'apple' or 'banana'." },
    { id: "w2l1-v4", term: "Feature", definition: "A piece of information that describes an example, like its color, weight, or shape. Each feature is usually a column in the table." },
    { id: "w2l1-v5", term: "Category", definition: "One of the groups a model sorts examples into. The labels come from the list of categories." },
    { id: "w2l1-v6", term: "Pattern", definition: "A regularity in the features that tends to go with a category, like 'long and yellow usually means banana'." },
  ],
  openingScenario: {
    id: "w2l1-open",
    prompt: "Imagine a table where each row is one fruit. The columns say its color, its weight, and its shape — and the last column says what the fruit is. If you covered up that last column, could you still guess each fruit? What would you look at?",
    context: "Keep your answer in mind — this lesson names every part of that table.",
  },
  predictionPrompt: {
    id: "w2l1-pred",
    prompt: "Predict: which one piece of information in the fruit table is the 'answer' the model is trying to learn, and which pieces are the clues?",
    howToCheck: "As you read the concepts, match 'answer' to the word label and 'clues' to the word features.",
  },
  concepts: [
    {
      id: "w2l1-c1",
      title: "A dataset is a table of examples",
      body: [
        "A dataset is a collection of examples that a model learns from. The easiest way to picture it is a table: each row is one example, and each column holds one kind of information about that example.",
        "If the dataset is about fruit, one row might be a single banana. If it is about email, one row is one message. The whole point of a dataset is to gather many examples in one place so a model can find patterns across them.",
      ],
      examples: [
        "A table with one row per fruit and columns for color, weight, and shape",
        "A table with one row per email and a column saying 'spam' or 'not spam'",
        "A table with one row per photo and a column naming the animal in it",
      ],
    },
    {
      id: "w2l1-c2",
      title: "Features describe; labels answer",
      body: [
        "In each example, the features are the descriptions — the clues. In the fruit table, color, weight, and shape are features. Features are usually the columns that tell you what an example is like.",
        "The label is the correct answer for that example: the category it belongs to. For a banana, the label is 'banana'. Features and labels play different jobs: features are the clues you look at, and the label is the answer you are trying to match.",
      ],
      examples: [
        "Features of a fruit: color = yellow, shape = long, weight = 120 grams",
        "Label of that fruit: banana",
        "Features of an email: many links, the word 'free'; Label: spam",
      ],
    },
    {
      id: "w2l1-c3",
      title: "Categories and the patterns that fit them",
      body: [
        "A category is one of the groups you can sort examples into. If a dataset only has apples and bananas, then 'apple' and 'banana' are the two categories, and every label is one of them.",
        "A model learns by finding a pattern: a way the features tend to line up with a category. From many labeled fruits it may learn 'long and yellow usually means banana' and 'round and red usually means apple'. Later it can use that pattern to label a new fruit it has never seen, just from its features.",
      ],
      examples: [
        "Categories: apple, banana",
        "Pattern learned: round + red → apple; long + yellow → banana",
        "New fruit with features round and red → the model predicts 'apple'",
      ],
    },
  ],
  workedExample: {
    id: "w2l1-we",
    title: "Reading one row of the fruit dataset",
    steps: [
      "Look at one row: color = yellow, shape = long, weight = 120 grams, fruit = banana.",
      "Find the example: this whole row is one example — a single fruit.",
      "Find the features: color, shape, and weight are the features that describe it.",
      "Find the label: 'banana' is the label — the correct category for this example.",
      "Notice the pattern forming: rows labeled banana keep showing 'yellow' and 'long', so those features become clues for the banana category.",
    ],
    takeaway: "Every example is a row; its features are the describing columns, and its label is the answer column.",
  },
  visuals: [
    {
      id: "w2l1-vis1",
      kind: "table",
      title: "A fruit dataset, labeled",
      summary:
        "A small dataset table. Each row is one example fruit. The Color, Weight, and Shape columns are features. The last column, Fruit, is the label — the category for that example. Row 1: red, 150 grams, round, apple. Row 2: yellow, 120 grams, long, banana. Row 3: green, 160 grams, round, apple. Row 4: yellow, 115 grams, long, banana.",
      caption: "The first three columns are features; the last column is the label.",
      table: {
        columns: ["Color", "Weight (g)", "Shape", "Fruit (label)"],
        rows: [
          ["Red", "150", "Round", "Apple"],
          ["Yellow", "120", "Long", "Banana"],
          ["Green", "160", "Round", "Apple"],
          ["Yellow", "115", "Long", "Banana"],
        ],
      },
    },
    {
      id: "w2l1-vis2",
      kind: "diagram",
      title: "The parts of one example",
      summary:
        "A diagram of a single dataset row. An arrow points to the whole row labeled 'Example'. Three cells (color, weight, shape) are grouped and labeled 'Features — the clues'. One cell at the end (fruit) is labeled 'Label — the answer'. A note reads 'The label names the category this example belongs to.'",
      caption: "Features are the clues that describe an example; the label is its category.",
    },
  ],
  activity: {
    id: "w2l1-act",
    kind: "feature-labeling",
    title: "Dataset Labeling Workspace",
    goal: "Inspect a built-in space-fruit dataset, assign a Safe or Not-safe label to each example using only its features, and hunt down duplicates and missing values.",
    status: "interactive",
    overview:
      "Work in a live data table of fictional space fruit. Each row has eight features — color, shape, texture, seeds, sweetness, glow level, size, and where it grows — but no label yet. Assign labels, filter and sort to investigate, watch for duplicate rows and missing values, then check your labels against the lesson's answer key.",
    steps: [
      "Read each fruit's features in the table.",
      "Assign a Safe or Not-safe label to as many fruits as you can.",
      "Use filter and sort to spot duplicate rows and missing values.",
      "Check your labels against the answer key and note which features decided each one.",
    ],
    materials: ["The built-in space-fruit dataset in this activity", "Optional: paper and pencil for notes"],
    successCriteria: [
      "Most examples are labeled Safe or Not safe.",
      "Duplicate rows and missing values are found using the flags and filters.",
      "Labels are checked against the answer key, with a reason for the pattern.",
    ],
    dataset: {
      id: "w2l1-act-ds",
      name: "Space-fruit labeling set",
      description: "A safe, made-up table of space fruit with eight feature columns and two categories: Safe to eat and Not safe to eat. It includes duplicate rows and a few missing values to discover. No real, personal, or outside data.",
      columns: ["Color", "Shape", "Texture", "Grows in", "Seeds", "Sweetness", "Glow level", "Size"],
      rowCount: 14,
    },
  },
  knowledgeCheck: {
    id: "w2l1-kc",
    instructions: "Answer these to check that you can name the parts of a dataset.",
    passThreshold: 2,
    questions: [
      {
        id: "w2l1-kc-q1",
        kind: "single",
        prompt: "In the fruit table, the column that says 'apple' or 'banana' is the…",
        explanation: "The label is the correct answer for each example — the category it belongs to.",
        choices: [
          { id: "w2l1-kc-q1-a", text: "Feature", correct: false, explanation: "Features are the describing columns like color and weight, not the answer." },
          { id: "w2l1-kc-q1-b", text: "Label", correct: true, explanation: "Correct — the label is the category answer for each example." },
          { id: "w2l1-kc-q1-c", text: "Example", correct: false, explanation: "An example is a whole row, not a single answer column." },
          { id: "w2l1-kc-q1-d", text: "Dataset", correct: false, explanation: "The dataset is the whole table, not one column." },
        ],
      },
      {
        id: "w2l1-kc-q2",
        kind: "multiple",
        prompt: "Which of these are features in a fruit dataset? Choose all that apply.",
        explanation: "Features are the pieces of information that describe an example. Color, weight, and shape all describe the fruit; the fruit's name is the label.",
        choices: [
          { id: "w2l1-kc-q2-a", text: "Color", correct: true, explanation: "Correct — color describes the fruit, so it is a feature." },
          { id: "w2l1-kc-q2-b", text: "Weight", correct: true, explanation: "Correct — weight describes the fruit, so it is a feature." },
          { id: "w2l1-kc-q2-c", text: "Shape", correct: true, explanation: "Correct — shape describes the fruit, so it is a feature." },
          { id: "w2l1-kc-q2-d", text: "The fruit's name (apple/banana)", correct: false, explanation: "The fruit's name is the label — the answer — not a describing feature." },
        ],
      },
      {
        id: "w2l1-kc-q3",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "One example in a dataset is usually a single row in the table.",
        answer: true,
        explanation: "True — each row is one example, and its columns hold that example's features and label.",
      },
    ],
  },
  challenge: {
    id: "w2l1-ch",
    title: "Design your own tiny dataset",
    prompt: "Invent a small dataset for a category you know well, like 'dog or cat' or 'weekday or weekend'.",
    steps: [
      "Choose two categories and write them down as your labels.",
      "Pick three features that would help tell the categories apart.",
      "Make a table with five example rows, filling in the features and the correct label for each.",
    ],
    successCriteria: [
      "Two clear categories used as labels.",
      "Three sensible features chosen.",
      "Five example rows, each with features and a correct label.",
    ],
  },
  reflection: [
    { id: "w2l1-r1", prompt: "Which feature in the fruit table did you find most useful for telling apples from bananas, and why?" },
    { id: "w2l1-r2", prompt: "Was your prediction about the 'answer' column correct? How did the words label and feature help you explain it?" },
  ],
  recap: {
    id: "w2l1-recap",
    summary: "A dataset is a table of examples; each example has features that describe it and a label naming its category, and models learn patterns that link features to categories.",
    keyPoints: [
      "One example is one row; features are the describing columns and the label is the answer column.",
      "Categories are the groups; every label is one of the categories.",
      "A model learns patterns that connect features to a category.",
    ],
  },
  extension: {
    id: "w2l1-ext",
    title: "Which features actually matter?",
    gradeBand: "7-8",
    body: [
      "Not every feature is helpful. In the fruit table, 'shape' and 'color' separate apples from bananas well, but a feature like 'day the fruit was picked' probably tells the model nothing useful.",
      "Look at your own tiny dataset. Which feature does the most work to separate the categories, and is there a feature you could remove without hurting the pattern? Explain your reasoning.",
    ],
  },
}

const lessonTrainingVsTesting: Lesson = {
  id: "w2l2",
  slug: "training-vs-testing",
  order: 2,
  title: "Training Data Versus Testing Data",
  summary:
    "See why a model is taught on one set of examples and checked on another, and how testing on unseen examples measures whether it really learned the pattern.",
  estimatedTime: "45-55 minutes",
  objectives: [
    { id: "w2l2-o1", text: "Explain the difference between training data and testing data." },
    { id: "w2l2-o2", text: "Describe why a model must be tested on examples it did not learn from." },
    { id: "w2l2-o3", text: "Define generalization and accuracy and connect them to testing." },
  ],
  materials: [
    { id: "w2l2-m1", name: "This lesson in a web browser", optional: false },
    { id: "w2l2-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w2l2-m3", name: "The built-in animal dataset shown in this lesson", optional: false, note: "Included here — no outside data or downloads." },
  ],
  vocabulary: [
    { id: "w2l2-v1", term: "Training", definition: "Showing a model many labeled examples so it can learn the pattern that links features to a category." },
    { id: "w2l2-v2", term: "Testing", definition: "Checking a model on new labeled examples it did not learn from, to see how well it really works." },
    { id: "w2l2-v3", term: "Training data", definition: "The examples a model learns from during training." },
    { id: "w2l2-v4", term: "Testing data", definition: "A separate set of examples, held back from training, used only to check the model." },
    { id: "w2l2-v5", term: "Generalization", definition: "How well a model works on new examples it has never seen, not just the ones it learned from." },
    { id: "w2l2-v6", term: "Accuracy", definition: "The share of test examples a model labels correctly, often written as a fraction or a percent." },
  ],
  openingScenario: {
    id: "w2l2-open",
    prompt: "A teacher hands out a practice worksheet, then gives a quiz with the exact same questions and answers. If everyone scores 100 percent, does that prove they learned the material — or just that they memorized those answers?",
    context: "Hold onto this — a model checked on the very examples it learned from has the same problem.",
  },
  predictionPrompt: {
    id: "w2l2-pred",
    prompt: "Predict: if you test a model only on the same examples it trained on, will its score tell you how well it handles brand-new examples?",
    howToCheck: "Read the concepts and decide what a fair test needs: seen examples or unseen ones.",
  },
  concepts: [
    {
      id: "w2l2-c1",
      title: "Training: learning the pattern from examples",
      body: [
        "Training is the step where a model looks at many labeled examples and learns a pattern that connects features to categories. The examples used for this are the training data.",
        "During training, the model gets to see both the features and the correct label for each example, so it can adjust until its guesses tend to match the labels.",
      ],
      examples: [
        "Showing a model 100 labeled animal rows so it learns 'has wings usually means bird'",
        "Feeding a spam filter thousands of emails already marked spam or not spam",
      ],
    },
    {
      id: "w2l2-c2",
      title: "Testing: a fair check on unseen examples",
      body: [
        "If you only checked a model on the same examples it learned from, it could just repeat answers it already memorized — like a student quizzed on the exact worksheet they practiced. That would not prove it learned anything useful.",
        "So we hold back some examples as testing data. The model never trains on them. Testing means running the model on this separate, unseen set and comparing its guesses to the true labels. That is a fair check of what it actually learned.",
      ],
      examples: [
        "Keep 20 animal rows aside; train on the other 80; then test on the 20 held-back rows",
        "A practice set to study from and a separate quiz to be graded on",
      ],
    },
    {
      id: "w2l2-c3",
      title: "Generalization and accuracy",
      body: [
        "Generalization is how well a model does on new examples it has never seen. A model that generalizes well learned the real pattern, not just the exact training rows. Testing on unseen data is how we measure generalization.",
        "Accuracy is a simple score for that check: out of all the test examples, what share did the model label correctly? If it labels 18 out of 20 test animals right, its accuracy is 18/20, or 90 percent. High accuracy on unseen test data is the sign that a model truly generalizes.",
      ],
      examples: [
        "16 of 20 test examples correct → accuracy 80 percent",
        "A model that scores high on training rows but low on test rows did not generalize",
      ],
    },
  ],
  workedExample: {
    id: "w2l2-we",
    title: "Splitting 20 animals into training and testing",
    steps: [
      "Start with a dataset of 20 labeled animals (each row has features and a 'bird' or 'not bird' label).",
      "Split it: put 15 rows in the training set and hold back 5 rows as the testing set.",
      "Train: let the model learn the pattern using only the 15 training rows.",
      "Test: show the model the 5 held-back rows without their labels and record its guesses.",
      "Score accuracy: compare its 5 guesses to the true labels. If 4 are right, accuracy is 4/5, or 80 percent — a measure of how well it generalizes.",
    ],
    takeaway: "Train on one part of the data, test on a held-back part, and measure accuracy on the unseen part to judge generalization.",
  },
  visuals: [
    {
      id: "w2l2-vis1",
      kind: "before-after",
      title: "Split the data, then check",
      summary:
        "Two stages. Stage 1 (Training): the training data — most of the rows — flows into the model, which learns a pattern. Stage 2 (Testing): the held-back testing data, which the model never saw, flows in; the model's guesses are compared to the true labels to get an accuracy score. The key point: the testing rows are kept completely separate from training.",
      caption: "The model learns from training data and is graded on separate testing data.",
    },
    {
      id: "w2l2-vis2",
      kind: "bar-chart",
      title: "Same model, two scores",
      summary:
        "A bar chart comparing one model's accuracy on the data it trained on versus on unseen test data, measured in percent. Bar 1, 'On training data', is 98 percent. Bar 2, 'On unseen test data', is 82 percent. The test score is the honest measure of how well the model generalizes; a much lower test bar warns that the model mostly memorized.",
      chart: {
        unit: "% correct",
        bars: [
          { label: "On training data", value: 98 },
          { label: "On unseen test data", value: 82 },
        ],
      },
    },
  ],
  activity: {
    id: "w2l2-act",
    kind: "train-test-split",
    title: "Train, Test, and Change the Data",
    goal: "Split a space-fruit dataset into training and testing sets, run a transparent model, then experiment with how balanced, unbalanced, and mislabeled data change the results.",
    status: "interactive",
    overview:
      "Divide sixteen space fruit into a training set the model learns from and a testing set it is checked on. The model is a simple, inspectable k-nearest-neighbors classifier — it compares each test fruit to the most similar training fruits and copies their most common label, and it shows you exactly which neighbors decided each prediction. Then run three experiments — balanced, unbalanced, and incorrectly-labeled data — against the same held-back test set, predicting each result first.",
    steps: [
      "Predict why some examples must be hidden from training, then split the fruit into training and testing.",
      "Run the model and read its overall accuracy and per-category results.",
      "For each experiment, predict what will happen, run it, and compare the outcome to your prediction.",
      "Optional (grades 7–8): open the accuracy math to compute correct ÷ total as a percent.",
    ],
    materials: ["The built-in space-fruit dataset in this activity", "Optional: paper and pencil for notes"],
    successCriteria: [
      "Every fruit is placed in exactly one set, with both categories represented in the test set.",
      "The model is run and its accuracy and per-category results are read.",
      "Each experiment has a saved prediction and the result is compared to it.",
    ],
    dataset: {
      id: "w2l2-act-ds",
      name: "Space-fruit training and testing set",
      description: "A safe, made-up, correctly-labeled space-fruit dataset (Safe / Not safe) split into training and held-back testing examples, with balanced, unbalanced, and mislabeled experiment versions. No real, personal, or outside data.",
      columns: ["Color", "Shape", "Texture", "Grows in", "Seeds", "Sweetness", "Glow level", "Size"],
      rowCount: 32,
    },
  },
  knowledgeCheck: {
    id: "w2l2-kc",
    instructions: "Answer these to check that you understand training, testing, and accuracy.",
    passThreshold: 2,
    questions: [
      {
        id: "w2l2-kc-q1",
        kind: "single",
        prompt: "Why do we test a model on examples it did not train on?",
        explanation: "Testing on unseen examples checks whether the model learned the real pattern instead of just memorizing the training rows.",
        choices: [
          { id: "w2l2-kc-q1-a", text: "To make testing take longer", correct: false, explanation: "The goal is a fair check, not to slow things down." },
          { id: "w2l2-kc-q1-b", text: "To see if it really learned the pattern, not just memorized the answers", correct: true, explanation: "Correct — unseen examples reveal whether the model generalizes." },
          { id: "w2l2-kc-q1-c", text: "Because there are too many training examples", correct: false, explanation: "The amount of training data is not the reason; the reason is fairness of the check." },
          { id: "w2l2-kc-q1-d", text: "To give the model easier questions", correct: false, explanation: "Test examples are not meant to be easier — they are meant to be new." },
        ],
      },
      {
        id: "w2l2-kc-q2",
        kind: "scenario",
        prompt: "Whose test result is a fair measure of learning?",
        scenario: "Ava studies a practice sheet, then is quizzed on brand-new questions of the same kind. Ben studies a practice sheet, then is quizzed on the exact same questions with the answers shown during practice.",
        explanation: "Ava is tested on new questions, so her score shows real learning (generalization). Ben's quiz repeats the practice questions, so a high score could just be memorization.",
        choices: [
          { id: "w2l2-kc-q2-a", text: "Ava's, because her quiz used new questions", correct: true, explanation: "Correct — testing on new questions measures whether she generalized." },
          { id: "w2l2-kc-q2-b", text: "Ben's, because he saw the answers already", correct: false, explanation: "Seeing the exact answers first makes his high score possibly just memorization." },
          { id: "w2l2-kc-q2-c", text: "Both are equally fair", correct: false, explanation: "They are not equal — Ben's repeated questions make his result unreliable." },
        ],
      },
      {
        id: "w2l2-kc-q3",
        kind: "single",
        prompt: "A model labels 15 out of 20 test examples correctly. What is its accuracy?",
        explanation: "Accuracy is the share labeled correctly: 15 out of 20 is 15/20, which equals 75 percent.",
        choices: [
          { id: "w2l2-kc-q3-a", text: "About 75 percent", correct: true, explanation: "Correct — 15 divided by 20 is 0.75, or 75 percent." },
          { id: "w2l2-kc-q3-b", text: "About 15 percent", correct: false, explanation: "15 is the number correct, not the share; the share is 15 out of 20." },
          { id: "w2l2-kc-q3-c", text: "About 50 percent", correct: false, explanation: "Half of 20 would be 10 correct, but the model got 15 correct." },
          { id: "w2l2-kc-q3-d", text: "About 95 percent", correct: false, explanation: "95 percent of 20 would be 19 correct, not 15." },
        ],
      },
    ],
  },
  challenge: {
    id: "w2l2-ch",
    title: "Plan a fair test",
    prompt: "Design a fair training-and-testing plan for a model that sorts messages into 'question' or 'not a question'.",
    steps: [
      "Decide how many example messages you would collect in total.",
      "Choose how to split them into a training set and a testing set, and say why.",
      "Explain how you would compute accuracy from the test results.",
    ],
    successCriteria: [
      "A clear total number of examples and a training/testing split.",
      "A reason the testing set is kept separate from training.",
      "A correct description of how accuracy would be measured.",
    ],
  },
  reflection: [
    { id: "w2l2-r1", prompt: "Why can a model score very high on its training data yet still fail on new examples?" },
    { id: "w2l2-r2", prompt: "How is holding back testing data like the way a teacher writes a quiz that is different from the practice sheet?" },
  ],
  recap: {
    id: "w2l2-recap",
    summary: "Models train on one set of examples and are tested on a separate, unseen set; accuracy on that unseen test data measures how well the model generalizes.",
    keyPoints: [
      "Training data teaches the model; testing data checks it.",
      "Testing rows must be held back and never seen during training.",
      "Generalization is doing well on new examples; accuracy is the share of test examples labeled correctly.",
    ],
  },
  extension: {
    id: "w2l2-ext",
    title: "When training looks great but testing looks bad",
    gradeBand: "7-8",
    body: [
      "Sometimes a model scores almost perfectly on its training data but poorly on the test data. This usually means it memorized the exact training rows instead of learning the general pattern.",
      "Describe a case where this could happen — for example, a model that memorized specific fruits by their exact weight. What could you change about the data or the split to get a more honest picture of how it will perform?",
    ],
  },
}

const lessonRepairTheDataset: Lesson = {
  id: "w2l3",
  slug: "repair-the-dataset",
  order: 3,
  title: "Repair the Dataset",
  summary:
    "Play data detective: hunt down duplicates, incorrect labels, and unbalanced categories, then fix them so a model can learn a fair, accurate pattern.",
  estimatedTime: "45-60 minutes",
  objectives: [
    { id: "w2l3-o1", text: "Spot common data problems: duplicates, incorrect labels, and unbalanced categories." },
    { id: "w2l3-o2", text: "Explain how each problem can hurt a model's accuracy or fairness." },
    { id: "w2l3-o3", text: "Repair a small dataset so its examples are correct and its categories are balanced." },
  ],
  materials: [
    { id: "w2l3-m1", name: "This lesson in a web browser", optional: false },
    { id: "w2l3-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w2l3-m3", name: "The built-in messy dataset shown in this lesson", optional: false, note: "Included here — no outside data, downloads, or personal information." },
  ],
  vocabulary: [
    { id: "w2l3-v1", term: "Balanced data", definition: "A dataset where each category has a fair, roughly equal number of examples, so the model learns every category well." },
    { id: "w2l3-v2", term: "Duplicate", definition: "An example that appears more than once in a dataset, which can make the model over-focus on that repeated case." },
    { id: "w2l3-v3", term: "Incorrect label", definition: "An example given the wrong answer, like a banana labeled 'apple', which teaches the model a false pattern." },
    { id: "w2l3-v4", term: "Accuracy", definition: "The share of examples a model labels correctly; bad data usually lowers it." },
    { id: "w2l3-v5", term: "Generalization", definition: "How well a model works on new examples; clean, balanced data helps a model generalize." },
  ],
  openingScenario: {
    id: "w2l3-open",
    prompt: "A student is teaching a model to tell apples from bananas. Their table has 18 apples and only 2 bananas, one banana is copied three times, and one apple is labeled 'banana' by mistake. What could go wrong when the model learns from this?",
    context: "By the end of the lesson you will be able to name and fix all three problems.",
  },
  predictionPrompt: {
    id: "w2l3-pred",
    prompt: "Predict: if a dataset has 18 apples and only 2 bananas, which category do you think the model will learn better, and why?",
    howToCheck: "Read the concept on balanced data and check whether more examples for a category helps the model learn it.",
  },
  concepts: [
    {
      id: "w2l3-c1",
      title: "Duplicates: the same example counted twice",
      body: [
        "A duplicate is an example that shows up more than once. It might look harmless, but a duplicated row makes the model treat that one case as if it were many, giving it too much weight.",
        "If one exact banana appears three times, the model may over-focus on that specific banana instead of learning what bananas look like in general. Removing duplicates keeps each real example counting once.",
      ],
      examples: [
        "The identical banana row copied three times in the table",
        "The same photo pasted into a dataset twice",
      ],
    },
    {
      id: "w2l3-c2",
      title: "Incorrect labels: the wrong answer teaches the wrong pattern",
      body: [
        "An incorrect label is an example marked with the wrong category — like an apple accidentally labeled 'banana'. Because a model trusts its labels as the truth, a wrong label teaches it a false pattern.",
        "Even a few incorrect labels can lower accuracy, because the model tries to satisfy answers that were never right. Fixing a label means changing it to the correct category (or removing the example if you can't tell).",
      ],
      examples: [
        "A round red fruit labeled 'banana'",
        "A cat photo labeled 'dog' in an animal dataset",
      ],
    },
    {
      id: "w2l3-c3",
      title: "Balanced data: give every category a fair share",
      body: [
        "Balanced data means each category has a fair, roughly equal number of examples. If a dataset has 18 apples but only 2 bananas, the model sees far more apples and may barely learn what a banana looks like — so it guesses 'apple' too often.",
        "Balancing the categories — by collecting more banana examples, or trimming down the apples — helps the model learn every category and generalize fairly. Clean, correct, balanced data is the foundation of an accurate model.",
      ],
      examples: [
        "10 apples and 10 bananas is more balanced than 18 apples and 2 bananas",
        "A model trained mostly on one category tends to over-predict that category",
      ],
    },
  ],
  workedExample: {
    id: "w2l3-we",
    title: "Repairing a messy fruit table step by step",
    steps: [
      "Start with a messy table: 18 apples and 2 bananas, one banana row copied three times, and one apple labeled 'banana'.",
      "Find duplicates: the identical banana appears three times, so remove two copies and keep one.",
      "Fix incorrect labels: the round red fruit labeled 'banana' is really an apple, so change its label to 'apple'.",
      "Check balance: now the categories are very lopsided, so add more real banana examples until apples and bananas are roughly even.",
      "Result: a clean, correctly labeled, balanced dataset the model can learn a fair pattern from.",
    ],
    takeaway: "Repair a dataset by removing duplicates, fixing wrong labels, and balancing the categories before a model learns from it.",
  },
  visuals: [
    {
      id: "w2l3-vis1",
      kind: "bar-chart",
      title: "Before and after balancing",
      summary:
        "A bar chart of how many examples each category has, counted in examples. Before repair: Apple 18, Banana 2 — very unbalanced. After repair: Apple 10, Banana 10 — balanced. Balancing the categories gives the model a fair chance to learn both fruits instead of over-predicting apple.",
      chart: {
        unit: "examples",
        bars: [
          { label: "Apple (before)", value: 18 },
          { label: "Banana (before)", value: 2 },
          { label: "Apple (after)", value: 10 },
          { label: "Banana (after)", value: 10 },
        ],
      },
    },
    {
      id: "w2l3-vis2",
      kind: "table",
      title: "Three problems and their repairs",
      summary:
        "A table matching each data problem to its fix and why it matters. Duplicate: an example repeated; fix by removing extra copies; matters because it over-weights one case. Incorrect label: wrong answer on an example; fix by correcting the label; matters because it teaches a false pattern. Unbalanced categories: one category has far more examples; fix by adding to the smaller category or trimming the larger; matters because the model under-learns the rare category.",
      table: {
        columns: ["Problem", "How to repair", "Why it matters"],
        rows: [
          ["Duplicate", "Remove the extra copies", "One case gets too much weight"],
          ["Incorrect label", "Change it to the correct category", "A wrong answer teaches a false pattern"],
          ["Unbalanced categories", "Add to the small category or trim the large one", "The model under-learns the rare category"],
        ],
      },
    },
  ],
  activity: {
    id: "w2l3-act",
    kind: "dataset-repair",
    title: "Repair the Flawed Dataset",
    goal: "Fix a messy space-fruit dataset — remove duplicates, correct wrong labels, and improve balance — then re-run the model and compare before and after.",
    status: "interactive",
    overview:
      "Start with a flawed space-fruit training set that has duplicate rows, several incorrect labels, and a heavy imbalance toward Safe. Remove duplicates, fix labels, and add more of the rare category to balance it — while the testing fruit stay hidden and unchanged. Then check your work and re-run the transparent model to see a full before-and-after comparison of dataset health and accuracy.",
    steps: [
      "Inspect the flawed dataset; the duplicate rows are flagged automatically.",
      "Fix labels that look wrong and remove duplicate copies.",
      "Add examples of the under-represented category to improve balance.",
      "Check your dataset and re-run the model, then compare the before-and-after results.",
    ],
    materials: ["The built-in flawed space-fruit dataset in this activity", "Optional: paper and pencil for notes"],
    successCriteria: [
      "Duplicate rows are removed and wrong labels are corrected.",
      "The categories are made more balanced by adding examples.",
      "The model is re-run and the before/after accuracy is compared.",
    ],
    dataset: {
      id: "w2l3-act-ds",
      name: "Flawed space-fruit dataset",
      description: "A safe, made-up space-fruit training set with planted problems — duplicate rows, incorrect labels, and imbalance toward Safe — plus a held-back testing set and spare correctly-labeled examples to add. No real, personal, or outside data.",
      columns: ["Color", "Shape", "Texture", "Grows in", "Seeds", "Sweetness", "Glow level", "Size"],
      rowCount: 18,
    },
  },
  knowledgeCheck: {
    id: "w2l3-kc",
    instructions: "Answer these to check that you can spot and fix data problems.",
    passThreshold: 2,
    questions: [
      {
        id: "w2l3-kc-q1",
        kind: "multiple",
        prompt: "Which of these are problems you should fix before training a model? Choose all that apply.",
        explanation: "Duplicates, incorrect labels, and unbalanced categories all hurt what a model learns, so all three should be repaired.",
        choices: [
          { id: "w2l3-kc-q1-a", text: "The same example repeated several times", correct: true, explanation: "Correct — duplicates over-weight one case and should be removed." },
          { id: "w2l3-kc-q1-b", text: "An example given the wrong label", correct: true, explanation: "Correct — an incorrect label teaches a false pattern and should be fixed." },
          { id: "w2l3-kc-q1-c", text: "One category with far more examples than another", correct: true, explanation: "Correct — unbalanced categories make the model under-learn the rare one." },
          { id: "w2l3-kc-q1-d", text: "The table having clear column names", correct: false, explanation: "Clear column names are helpful, not a problem to fix." },
        ],
      },
      {
        id: "w2l3-kc-q2",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "A dataset with 18 apples and only 2 bananas is well balanced.",
        answer: false,
        explanation: "False — balanced data means roughly equal examples per category. With 18 apples and 2 bananas, the model would barely learn bananas.",
      },
      {
        id: "w2l3-kc-q3",
        kind: "ordering",
        prompt: "Put the dataset-repair steps in a sensible order.",
        explanation: "First inspect the data, then remove duplicates and fix wrong labels so each example is correct, then balance the categories, and finally retrain and check accuracy.",
        items: [
          { id: "w2l3-kc-q3-i1", text: "Inspect the dataset to find problems" },
          { id: "w2l3-kc-q3-i2", text: "Remove duplicate rows and correct wrong labels" },
          { id: "w2l3-kc-q3-i3", text: "Balance the categories" },
          { id: "w2l3-kc-q3-i4", text: "Retrain the model and check its accuracy" },
        ],
        correctOrder: ["w2l3-kc-q3-i1", "w2l3-kc-q3-i2", "w2l3-kc-q3-i3", "w2l3-kc-q3-i4"],
      },
    ],
  },
  challenge: {
    id: "w2l3-ch",
    title: "Break it, then fix it",
    prompt: "Take a clean tiny dataset, add each of the three problems on purpose, then repair it and describe the effect.",
    steps: [
      "Start with a small, clean, balanced dataset of two categories.",
      "Add a duplicate row, change one label to be incorrect, and remove examples so one category is much larger.",
      "Now repair all three problems and explain, for each, how the fix should help the model's accuracy or fairness.",
    ],
    successCriteria: [
      "All three problems are added on purpose and clearly marked.",
      "All three are repaired.",
      "Each repair has a reason tied to accuracy or fairness.",
    ],
  },
  reflection: [
    { id: "w2l3-r1", prompt: "Which of the three data problems do you think is the hardest to notice, and why?" },
    { id: "w2l3-r2", prompt: "How does cleaning and balancing a dataset connect to the training-and-testing idea from the last lesson?" },
  ],
  recap: {
    id: "w2l3-recap",
    summary: "Duplicates, incorrect labels, and unbalanced categories all hurt a model; repairing them produces clean, balanced data that improves accuracy and helps the model generalize fairly.",
    keyPoints: [
      "Remove duplicates so no single example is over-weighted.",
      "Correct incorrect labels so the model does not learn a false pattern.",
      "Balance the categories so the model learns each one and generalizes fairly.",
    ],
  },
  extension: {
    id: "w2l3-ext",
    title: "When you can't collect more data",
    gradeBand: "7-8",
    body: [
      "Balancing by adding more examples of the rare category is ideal, but sometimes you cannot easily collect more. Another option is to trim the larger category down so the counts match — though that means throwing away some real examples.",
      "For the messy fruit table, argue which approach you would choose — add more bananas or remove some apples — and explain the trade-off each choice makes for the model's accuracy and fairness.",
    ],
  },
}

export const week2: CourseWeek = {
  id: "week-2",
  week: 2,
  title: "How Data Teaches a Model",
  subtitle: "See how examples, labels, and features become the data a model learns from — and why clean, balanced data matters.",
  summary:
    "Students look inside a dataset to find its examples, labels, and features; learn why a model is trained on one set of examples and tested on another to measure generalization and accuracy; and practice repairing real data problems like duplicates, incorrect labels, and unbalanced categories.",
  bigQuestion: "How does data teach a model, and what makes data good enough to learn from?",
  estimatedTime: "2.5-3 hours",
  objectives: [
    "Identify the examples, labels, features, and categories in a dataset.",
    "Explain how patterns link features to categories.",
    "Describe why models are trained on one set of data and tested on another, and define generalization and accuracy.",
    "Find and repair duplicates, incorrect labels, and unbalanced categories.",
  ],
  requiredConcepts: [
    "Dataset",
    "Example",
    "Label",
    "Feature",
    "Category",
    "Pattern",
    "Training",
    "Testing",
    "Balanced data",
    "Duplicate",
    "Incorrect label",
    "Generalization",
    "Accuracy",
  ],
  lessons: [lessonExamplesLabelsFeatures, lessonTrainingVsTesting, lessonRepairTheDataset],
}
