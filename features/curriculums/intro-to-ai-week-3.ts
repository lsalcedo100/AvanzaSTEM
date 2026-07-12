/**
 * Intro to AI — Week 3: Image Recognition and Model Mistakes.
 *
 * Authored content only; conforms to the types in `intro-to-ai-types.ts`. Every
 * id is stable and unique (prefixed by the owning lesson id). No interactive
 * engines are wired up yet, so each activity is a `briefing`.
 */
import type { CourseWeek, Lesson } from "./intro-to-ai-types.ts"

const lessonHowClassifierWorks: Lesson = {
  id: "w3l1",
  slug: "how-an-image-classifier-works",
  order: 1,
  title: "How an Image Classifier Works",
  summary:
    "Follow a photo from pixels to a label, and learn how an image classifier turns visual features into a prediction with a confidence score.",
  estimatedTime: "45-55 minutes",
  objectives: [
    { id: "w3l1-o1", text: "Explain that an image is made of pixels a computer reads as numbers." },
    { id: "w3l1-o2", text: "Describe how a classifier uses visual features to make a prediction." },
    { id: "w3l1-o3", text: "Read a confidence score and say what it does and does not mean." },
    { id: "w3l1-o4", text: "Trace an image through a classifier from input to labeled output." },
  ],
  materials: [
    { id: "w3l1-m1", name: "This lesson in a web browser", optional: false },
    { id: "w3l1-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w3l1-m3", name: "The built-in labeled image sets shown in the lesson", optional: false, note: "Described in the lesson — you do not upload any of your own photos." },
  ],
  vocabulary: [
    { id: "w3l1-v1", term: "Pixel", definition: "One tiny dot in an image. A picture is a grid of pixels, and the computer stores each one as numbers for its color and brightness." },
    { id: "w3l1-v2", term: "Visual feature", definition: "A pattern in a picture the classifier pays attention to, such as edges, colors, shapes, or textures." },
    { id: "w3l1-v3", term: "Classification", definition: "Sorting something into one of a set of named groups, called categories or classes." },
    { id: "w3l1-v4", term: "Prediction", definition: "The category the classifier chooses as its best guess for an input image." },
    { id: "w3l1-v5", term: "Confidence", definition: "A number, often shown as a percent, for how sure the classifier is about its prediction. Higher means more sure, but not always more correct." },
  ],
  openingScenario: {
    id: "w3l1-open",
    prompt: "You show a photo app a picture and it instantly says 'cat, 96% sure'. It has never seen this exact photo before. How could a computer, which only sees numbers, decide it is a cat?",
    context: "Keep your first guess in mind — you will check it after you see how pixels become a prediction.",
  },
  predictionPrompt: {
    id: "w3l1-pred",
    prompt: "Predict: when a classifier looks at a photo, do you think it recognizes the whole 'cat' at once, or does it build its answer from smaller patterns like edges and shapes?",
    howToCheck: "Read the concepts below and see how pixels turn into visual features, and how features turn into a prediction.",
  },
  concepts: [
    {
      id: "w3l1-c1",
      title: "A picture is a grid of pixels, and pixels are numbers",
      body: [
        "A computer cannot 'see' a photo the way you do. To a computer, an image is a grid of tiny dots called pixels, and each pixel is stored as numbers that describe its color and brightness. A small photo can have hundreds of thousands of pixels.",
        "So the very first thing a classifier receives is not a 'cat' — it is a big grid of numbers. Everything the classifier decides has to be built up from those numbers.",
      ],
      examples: [
        "A black-and-white pixel might be stored as one number from 0 (black) to 255 (white).",
        "A color pixel is often stored as three numbers: how much red, green, and blue it has.",
        "A 100 by 100 photo is 10,000 pixels — a lot of numbers for one small picture.",
      ],
    },
    {
      id: "w3l1-c2",
      title: "From pixels to visual features",
      body: [
        "Working with raw pixels alone is hard, so a classifier looks for visual features: useful patterns like edges, corners, colors, textures, and shapes. Pointy triangular shapes near the top might be a feature that often shows up with cats (ears).",
        "The classifier learned which features matter by studying many labeled examples in earlier training. It was not told 'cats have pointy ears' as a rule — it found patterns like that from the examples, the same learning idea from earlier weeks.",
      ],
      examples: [
        "Edges where a dark area meets a light area",
        "Round shapes, which might be eyes or wheels",
        "Textures like fur, scales, or smooth metal",
      ],
    },
    {
      id: "w3l1-c3",
      title: "Prediction and confidence",
      body: [
        "After adding up the visual features, the classifier makes a prediction: it picks the category that best matches, like 'cat' or 'dog'. Along with the prediction it usually reports a confidence — a number for how sure it is, often shown as a percent.",
        "Confidence is useful but tricky. A high confidence means the features matched one category strongly, not that the answer is definitely right. A classifier can be confidently wrong, which is exactly the kind of mistake you will study this week.",
      ],
      examples: [
        "'Dog, 91%': the features matched dog much more than any other category.",
        "'Cat 55%, dog 45%': the classifier is unsure — the picture had features of both.",
        "A confident 98% can still be wrong if the photo is unusual.",
      ],
    },
  ],
  workedExample: {
    id: "w3l1-we",
    title: "Following one photo from pixels to a label",
    steps: [
      "Input: a photo of a cat arrives as a grid of pixels — just numbers for color and brightness.",
      "Find features: the classifier detects edges, then two pointy shapes near the top, round eye shapes, and a fur texture.",
      "Score each category: those features match 'cat' strongly and 'dog' only a little.",
      "Predict with confidence: it outputs 'cat' with 96% confidence because cat features scored much higher than the others.",
      "Output: the label 'cat' and the confidence are shown to you. The whole answer was built from pixels, not from the computer truly 'seeing' a cat.",
    ],
    takeaway: "A classifier turns pixels into visual features, scores each category from those features, and reports the best match as a prediction with a confidence.",
  },
  visuals: [
    {
      id: "w3l1-vis1",
      kind: "flow",
      title: "From pixels to a labeled prediction",
      summary:
        "A four-step flow. Step 1: Input image, drawn as a grid of pixels (numbers). Step 2: Find visual features — edges, shapes, colors, textures. Step 3: Score each category from the features — for example cat 96, dog 3, rabbit 1. Step 4: Output the top category as the prediction with its confidence: 'cat, 96%'. The arrow makes clear the label is built up from pixels, not seen directly.",
      caption: "Every prediction is built from pixels, through features, into a scored guess.",
    },
    {
      id: "w3l1-vis2",
      kind: "bar-chart",
      title: "Confidence across categories for one photo",
      summary:
        "A bar chart of the classifier's confidence for each category on a single cat photo, in percent. Cat is by far the tallest bar at 96 percent, dog is 3 percent, and rabbit is 1 percent. The tallest bar is the prediction; its height is the confidence. The bars add up to about 100 percent because the classifier is splitting its certainty across the categories.",
      caption: "The tallest bar is the prediction; its height is the confidence.",
      chart: {
        unit: "% confidence",
        bars: [
          { label: "Cat", value: 96 },
          { label: "Dog", value: 3 },
          { label: "Rabbit", value: 1 },
        ],
      },
    },
  ],
  activity: {
    id: "w3l1-act",
    kind: "classifier-walkthrough",
    title: "Classifier Walkthrough",
    goal: "Follow a built-in picture from pixels to a labeled prediction, and see how confidence compares the categories without guaranteeing the answer.",
    status: "interactive",
    overview:
      "Pick a generated shape picture and see it the way a computer does — a 16×16 grid of numbered pixels. The activity shows the visual features it measured from those pixels, its prediction, and a confidence bar for every category, with a plain-language explanation of the closest training pictures it matched. A worked example shows a case where the model is confident and still wrong. An optional, on-device-only image upload lets you try your own picture; it is never saved or sent anywhere.",
    steps: [
      "Choose a picture and view its pixel grid.",
      "Read the visual features the model measured from the pixels.",
      "Read the prediction and the confidence bar for each category, and the explanation of what it matched.",
      "See the confident-but-wrong example, and note that confidence is not certainty.",
    ],
    materials: ["The built-in generated pictures in this activity", "Optional: your own drawing to upload (processed only on your device)"],
    successCriteria: [
      "A picture is traced from pixels to features to a prediction.",
      "The confidence bars are read as a comparison between categories, not a guarantee.",
      "The confident-but-wrong case is understood.",
    ],
    dataset: {
      id: "w3l1-act-ds",
      name: "Generated shape pictures (labeled)",
      description: "Locally generated 16×16 pixel pictures of circles, triangles, and squares, each drawn from a spec (no files fetched or uploaded). The classifier and its confidence are computed on-device from the pixels.",
      columns: ["picture", "true label", "predicted label", "confidence"],
      rowCount: 9,
    },
  },
  knowledgeCheck: {
    id: "w3l1-kc",
    instructions: "Answer these to check that you understand how an image classifier turns pixels into a prediction.",
    passThreshold: 2,
    questions: [
      {
        id: "w3l1-kc-q1",
        kind: "single",
        prompt: "What does an image classifier actually receive as its input?",
        explanation: "To a computer, an image is a grid of pixels stored as numbers; the classifier builds everything else from those numbers.",
        choices: [
          { id: "w3l1-kc-q1-a", text: "The name of the object in the photo", correct: false, explanation: "The name is the output the classifier tries to produce, not the input it starts with." },
          { id: "w3l1-kc-q1-b", text: "A grid of pixels stored as numbers", correct: true, explanation: "Correct — the classifier starts from pixels (numbers for color and brightness) and builds up from there." },
          { id: "w3l1-kc-q1-c", text: "A written list of the object's features", correct: false, explanation: "No one hands the classifier a feature list; it finds features from the pixels itself." },
          { id: "w3l1-kc-q1-d", text: "A confidence score", correct: false, explanation: "Confidence is part of the output, produced at the end, not the input." },
        ],
      },
      {
        id: "w3l1-kc-q2",
        kind: "ordering",
        prompt: "Put the steps of image classification in order, from receiving the photo to showing the answer.",
        explanation: "A classifier goes from pixels, to visual features, to a score for each category, to the top prediction with its confidence.",
        items: [
          { id: "w3l1-kc-q2-i1", text: "Receive the image as a grid of pixels" },
          { id: "w3l1-kc-q2-i2", text: "Find visual features like edges, shapes, and textures" },
          { id: "w3l1-kc-q2-i3", text: "Score how well the features match each category" },
          { id: "w3l1-kc-q2-i4", text: "Output the top category as the prediction with its confidence" },
        ],
        correctOrder: ["w3l1-kc-q2-i1", "w3l1-kc-q2-i2", "w3l1-kc-q2-i3", "w3l1-kc-q2-i4"],
      },
      {
        id: "w3l1-kc-q3",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "A prediction with 98% confidence is guaranteed to be correct.",
        answer: false,
        explanation: "False — high confidence means the features matched one category strongly, but a classifier can still be confidently wrong, especially on unusual photos.",
      },
    ],
  },
  challenge: {
    id: "w3l1-ch",
    title: "Be the classifier",
    prompt: "Pick a simple object you can picture (an apple, a bicycle, a house) and describe how a classifier could tell it apart from a close cousin using visual features.",
    steps: [
      "Choose your object and one similar object it could be confused with (apple vs. tomato, bicycle vs. motorcycle).",
      "List three visual features that would push a prediction toward your object.",
      "List one feature that both objects share, which could make the classifier unsure.",
    ],
    successCriteria: [
      "A pair of similar objects is chosen.",
      "Three distinguishing visual features are listed.",
      "One shared feature that could lower confidence is named.",
    ],
  },
  reflection: [
    { id: "w3l1-r1", prompt: "Now that you know a photo is just pixels to a computer, what surprised you most about how it reaches a label?" },
    { id: "w3l1-r2", prompt: "When would you want to see the confidence score before trusting a classifier's prediction?" },
  ],
  recap: {
    id: "w3l1-recap",
    summary: "An image classifier turns a grid of pixels into visual features, scores each category, and outputs the best match as a prediction with a confidence.",
    keyPoints: [
      "To a computer, an image is a grid of pixels stored as numbers.",
      "Classifiers work from visual features like edges, shapes, colors, and textures.",
      "A prediction comes with a confidence, and high confidence does not guarantee a correct answer.",
    ],
  },
  extension: {
    id: "w3l1-ext",
    title: "Why confidence can fool you",
    gradeBand: "7-8",
    body: [
      "Confidence tells you how strongly the features matched a category, not how correct the answer is. A classifier trained only on clear daytime photos might be 95% confident and wrong on a blurry night photo, because the unusual pixels still happened to match one category best.",
      "Describe a situation where you would want a system to say 'I am not sure' instead of giving a confident answer. Why might a designer set a rule like 'if confidence is below 60%, ask a human'?",
    ],
  },
}

const lessonTrainAndTest: Lesson = {
  id: "w3l2",
  slug: "train-and-test-a-classifier",
  order: 2,
  title: "Train and Test a Classifier",
  summary:
    "Learn why a classifier is checked on photos it never trained on, and measure how well it does using accuracy on a fair test set.",
  estimatedTime: "45-55 minutes",
  objectives: [
    { id: "w3l2-o1", text: "Explain why a classifier is tested on separate photos it did not train on." },
    { id: "w3l2-o2", text: "Calculate accuracy as correct predictions out of total predictions." },
    { id: "w3l2-o3", text: "Read category-level accuracy and spot which category is weakest." },
    { id: "w3l2-o4", text: "Explain why one overall accuracy number can hide a weak category." },
  ],
  materials: [
    { id: "w3l2-m1", name: "This lesson in a web browser", optional: false },
    { id: "w3l2-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w3l2-m3", name: "The built-in labeled test set shown in the lesson", optional: false, note: "Photos already split into training and test groups; students do not add photos." },
  ],
  vocabulary: [
    { id: "w3l2-v1", term: "Accuracy", definition: "How often a classifier is correct, usually the number of correct predictions divided by the total number of predictions, shown as a percent." },
    { id: "w3l2-v2", term: "Category-level accuracy", definition: "The accuracy measured separately for each category, so you can see which categories the classifier handles well and which it struggles with." },
    { id: "w3l2-v3", term: "Test set", definition: "A group of labeled photos kept aside and never used in training, used to fairly check how well the classifier does on new images." },
    { id: "w3l2-v4", term: "Training set", definition: "The labeled photos the classifier learns its patterns from before it is tested." },
  ],
  openingScenario: {
    id: "w3l2-open",
    prompt: "A classifier gets every single training photo right. Its makers say it is 'perfect'. Then it meets brand-new photos and misses many of them. What went wrong with the way they measured it?",
    context: "Think about the difference between memorizing the answers and actually learning the pattern.",
  },
  predictionPrompt: {
    id: "w3l2-pred",
    prompt: "Predict: if a classifier scores 90% accuracy overall on cats, dogs, and rabbits, do you think it does equally well on all three categories?",
    howToCheck: "Read about category-level accuracy and look at the built-in results table to check your prediction.",
  },
  concepts: [
    {
      id: "w3l2-c1",
      title: "Why you test on photos the classifier never trained on",
      body: [
        "A classifier learns from a training set. If you then test it on those same photos, it can look great just by having memorized them — like a student who saw the exact test questions in advance. That score would not tell you how it does on new photos.",
        "So we keep a separate test set: labeled photos held back and never used in training. Testing on new-to-the-classifier photos is the fair way to measure whether it really learned the pattern.",
      ],
      examples: [
        "Train on 800 pet photos, then test on 200 different pet photos.",
        "A high training score plus a low test score is a warning sign of memorizing.",
        "The test photos must be labeled too, so you can check each prediction.",
      ],
    },
    {
      id: "w3l2-c2",
      title: "Accuracy: how often the classifier is right",
      body: [
        "Accuracy is the simplest score: the number of correct predictions divided by the total number of predictions, written as a percent. If the classifier gets 90 out of 100 test photos right, its accuracy is 90%.",
        "Accuracy is easy to understand, which is why it is so common. But one single number covers everything at once, so it can hide problems — and that is where category-level accuracy comes in.",
      ],
      examples: [
        "45 correct out of 50 photos is 90% accuracy.",
        "Two classifiers can share the same accuracy but make very different mistakes.",
        "Accuracy only makes sense on a labeled set, where you know the right answers.",
      ],
    },
    {
      id: "w3l2-c3",
      title: "Category-level accuracy tells a fuller story",
      body: [
        "Category-level accuracy measures the score for each category on its own. Overall accuracy might be 90%, but the classifier could get cats right 98% of the time and rabbits right only 74% of the time. The overall number quietly averaged the weak category away.",
        "Breaking accuracy down by category shows you exactly where to improve. It is often the first step to finding out which category the classifier confuses — the focus of the next lesson.",
      ],
      examples: [
        "Overall 90%, but cats 98%, dogs 92%, rabbits 74%.",
        "A weak category can be hidden if it has only a few photos in the test set.",
        "Fixing the weakest category usually raises the overall accuracy the most.",
      ],
    },
  ],
  workedExample: {
    id: "w3l2-we",
    title: "Measuring a pet classifier fairly",
    steps: [
      "Split the photos: 800 go into the training set, 200 different ones into the test set.",
      "Train: the classifier learns cat, dog, and rabbit patterns from the 800 training photos only.",
      "Test: run all 200 held-back photos through and compare each prediction to the true label.",
      "Overall accuracy: 180 of the 200 were correct, so 180 ÷ 200 = 90% accuracy.",
      "Category-level: cats 98%, dogs 92%, rabbits 74%. The rabbits are dragging things down, even though the overall 90% looked strong.",
    ],
    takeaway: "Test on held-back photos, compute accuracy as correct over total, then break it down by category to find the weak spot the overall number hides.",
  },
  visuals: [
    {
      id: "w3l2-vis1",
      kind: "bar-chart",
      title: "Category-level accuracy on the test set",
      summary:
        "A bar chart of accuracy per category, in percent, on the 200-photo test set. Cats are 98 percent, dogs are 92 percent, and rabbits are only 74 percent. A dashed reference line marks the 90 percent overall accuracy. The chart makes it obvious that rabbits are the weakest category and are pulling the overall score down, even though the single overall number looked strong.",
      caption: "The overall 90% hides that rabbits are far weaker than cats and dogs.",
      chart: {
        unit: "% accuracy",
        bars: [
          { label: "Cats", value: 98 },
          { label: "Dogs", value: 92 },
          { label: "Rabbits", value: 74 },
        ],
      },
    },
    {
      id: "w3l2-vis2",
      kind: "before-after",
      title: "Why a separate test set is fair",
      summary:
        "Before (unfair): the classifier is tested on the very same photos it trained on, so it can score high just by memorizing them, and the score does not predict how it handles new photos. After (fair): the photos are split so training and testing use different photos; the classifier is scored only on photos it never saw in training, which shows whether it truly learned the pattern.",
      caption: "Testing on new-to-the-classifier photos is what makes the score trustworthy.",
    },
  ],
  activity: {
    id: "w3l2-act",
    kind: "train-test-classifier",
    title: "Train and Test a Classifier",
    goal: "Pick a topic, choose the training pictures, really train an on-device classifier, and read overall accuracy, category-level accuracy, and a confusion matrix on unseen pictures.",
    status: "interactive",
    overview:
      "Choose one of three topics — geometric shapes, school supplies, or recycling items — then select which generated pictures the classifier trains on. Watch the per-category counts and validation warnings, predict the easiest and hardest category, then train. The model computes real features from the pixels and classifies a held-back test set. You read overall and per-category accuracy, a confusion matrix, false positives vs. false negatives for a chosen category, and a per-picture review with confidence bars and explanations. Nothing is uploaded; everything runs on your device.",
    steps: [
      "Choose a topic and read the category definitions.",
      "Select the training pictures and watch the per-category counts and any warnings.",
      "Predict the easiest and hardest category, then train the classifier.",
      "Read overall accuracy, the confusion matrix, category-level accuracy, and the false positive / false negative counts.",
    ],
    materials: ["The built-in generated picture sets in this activity"],
    successCriteria: [
      "A classifier is trained on student-selected pictures and tested on unseen ones.",
      "Overall and per-category accuracy and the confusion matrix are read.",
      "False positives and false negatives are identified for a chosen category.",
    ],
    dataset: {
      id: "w3l2-act-ds",
      name: "Three generated picture topics (train/test)",
      description: "Three locally generated topics — shapes (circle/triangle/square), school supplies (writing/measuring/paper), and recycling (paper/plastic/metal) — each with a training pool and a held-back test set. Pictures are drawn on-device from specs; nothing is fetched or uploaded.",
      columns: ["picture", "split", "true label", "predicted label", "confidence", "correct?"],
      rowCount: 45,
    },
  },
  knowledgeCheck: {
    id: "w3l2-kc",
    instructions: "Answer these to check that you can measure a classifier fairly with accuracy.",
    passThreshold: 2,
    questions: [
      {
        id: "w3l2-kc-q1",
        kind: "single",
        prompt: "A classifier gets 45 out of 50 test photos correct. What is its accuracy?",
        explanation: "Accuracy is correct predictions divided by total predictions: 45 ÷ 50 = 0.90, or 90%.",
        choices: [
          { id: "w3l2-kc-q1-a", text: "45%", correct: false, explanation: "45 is the number correct, not the accuracy; you still have to divide by the total of 50." },
          { id: "w3l2-kc-q1-b", text: "90%", correct: true, explanation: "Correct — 45 ÷ 50 = 0.90, which is 90% accuracy." },
          { id: "w3l2-kc-q1-c", text: "50%", correct: false, explanation: "50 is the total number of photos, not the accuracy." },
          { id: "w3l2-kc-q1-d", text: "5%", correct: false, explanation: "5 is the number it got wrong, not the accuracy." },
        ],
      },
      {
        id: "w3l2-kc-q2",
        kind: "scenario",
        prompt: "Which classifier was measured in a fair way?",
        scenario: "Team A tests its classifier on the exact same 500 photos it trained on and reports 99%. Team B holds back 100 photos, trains on the rest, and tests only on the held-back 100.",
        explanation: "Testing on the same photos used for training rewards memorizing. Team B held photos back, so its score reflects how the classifier does on new images.",
        choices: [
          { id: "w3l2-kc-q2-a", text: "Team A, because 99% is higher", correct: false, explanation: "A high score means little if it came from testing on the training photos; it can be pure memorizing." },
          { id: "w3l2-kc-q2-b", text: "Team B, because it tested on held-back photos", correct: true, explanation: "Correct — testing on photos never used in training is the fair way to measure real performance." },
          { id: "w3l2-kc-q2-c", text: "Both are equally fair", correct: false, explanation: "They are not equal; Team A tested on its own training photos, which is not a fair test." },
          { id: "w3l2-kc-q2-d", text: "Neither can be measured with accuracy", correct: false, explanation: "Both can use accuracy; the issue is which photos the test used." },
        ],
      },
      {
        id: "w3l2-kc-q3",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "One overall accuracy number can hide that the classifier does poorly on a particular category.",
        answer: true,
        explanation: "True — overall accuracy averages all categories together, so a weak category (like rabbits at 74%) can be masked by strong ones. Category-level accuracy reveals it.",
      },
    ],
  },
  challenge: {
    id: "w3l2-ch",
    title: "Split it fairly",
    prompt: "Design a fair train/test plan for a classifier that sorts photos of three kinds of fruit, and describe what you would measure.",
    steps: [
      "Decide how many photos go into the training set and how many are held back for the test set.",
      "Explain why the test photos must not be used during training.",
      "List the accuracy numbers you would report: the overall accuracy and the accuracy for each fruit.",
    ],
    successCriteria: [
      "A clear split of photos into training and test groups.",
      "A reason the test photos must be kept out of training.",
      "Overall accuracy and per-category accuracy are both named as things to report.",
    ],
  },
  reflection: [
    { id: "w3l2-r1", prompt: "Was your prediction about all three categories doing equally well correct? What did the category-level accuracy reveal?" },
    { id: "w3l2-r2", prompt: "Why might it be risky to trust a product that only advertises one overall accuracy number?" },
  ],
  recap: {
    id: "w3l2-recap",
    summary: "A classifier is measured fairly on a held-back test set using accuracy, and breaking accuracy down by category reveals weak spots the overall number hides.",
    keyPoints: [
      "Test on a separate set of photos the classifier never trained on.",
      "Accuracy is correct predictions divided by total predictions.",
      "Category-level accuracy shows which category is weakest, even when the overall score looks strong.",
    ],
  },
  extension: {
    id: "w3l2-ext",
    title: "When accuracy can mislead",
    gradeBand: "7-8",
    body: [
      "Imagine a test set that is 95% cats and only 5% rabbits. A lazy classifier that guesses 'cat' every single time would score 95% accuracy while getting every rabbit wrong. The high accuracy hides a total failure on rabbits.",
      "Explain why the mix of categories in a test set matters. What could you measure or change so that a classifier cannot 'cheat' by ignoring a rare category?",
    ],
  },
}

const lessonConfuseAndImprove: Lesson = {
  id: "w3l3",
  slug: "confuse-and-improve",
  order: 3,
  title: "Confuse and Improve the Model",
  summary:
    "Find the edge cases that fool a classifier, read its mistakes in a confusion matrix, and propose changes that would make it better.",
  estimatedTime: "50-60 minutes",
  objectives: [
    { id: "w3l3-o1", text: "Tell a false positive from a false negative for a category." },
    { id: "w3l3-o2", text: "Identify edge cases that are likely to confuse a classifier." },
    { id: "w3l3-o3", text: "Read a confusion matrix to see which categories get mixed up." },
    { id: "w3l3-o4", text: "Propose a change, such as adding examples, that would reduce a specific mistake." },
  ],
  materials: [
    { id: "w3l3-m1", name: "This lesson in a web browser", optional: false },
    { id: "w3l3-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w3l3-m3", name: "The built-in mistakes set and confusion matrix shown in the lesson", optional: false, note: "Pre-recorded predictions and true labels; students do not upload photos." },
  ],
  vocabulary: [
    { id: "w3l3-v1", term: "False positive", definition: "When the classifier says something IS in a category but it is not — for example, calling a photo 'cat' when it is really a dog." },
    { id: "w3l3-v2", term: "False negative", definition: "When the classifier says something is NOT in a category but it really is — for example, missing a real cat and calling it a dog." },
    { id: "w3l3-v3", term: "Edge case", definition: "An unusual or tricky input near the boundary between categories, like a fluffy dog that looks a bit like a cat, which is easy to get wrong." },
    { id: "w3l3-v4", term: "Confusion matrix", definition: "A table that lines up the true labels against the classifier's predictions, so you can see exactly which categories get mixed up and how often." },
  ],
  openingScenario: {
    id: "w3l3-open",
    prompt: "A pet classifier keeps calling one specific fluffy little dog a 'cat'. It is confident every time. Is this random bad luck, or could there be a pattern in its mistakes you could actually find and fix?",
    context: "This lesson is about finding the pattern in a classifier's mistakes, not just noticing that it makes them.",
  },
  predictionPrompt: {
    id: "w3l3-pred",
    prompt: "Predict: for a cat-dog-rabbit classifier, which two categories do you think get confused with each other most often, and why?",
    howToCheck: "Read the confusion matrix below and see which off-diagonal cell has the most mistakes.",
  },
  concepts: [
    {
      id: "w3l3-c1",
      title: "False positives and false negatives",
      body: [
        "Not all mistakes are the same. A false positive for 'cat' is when the classifier says 'cat' but the photo is not a cat. A false negative for 'cat' is when the photo really is a cat but the classifier says it is something else. Every category has both kinds.",
        "The difference matters because the two mistakes can have very different costs. Missing a real fire alarm (a false negative) could be far more serious than a false alarm (a false positive), so people often care which kind of mistake a system makes.",
      ],
      examples: [
        "False positive for 'cat': a rabbit photo labeled 'cat'.",
        "False negative for 'cat': a real cat photo labeled 'dog'.",
        "A spam filter marking a real message as spam is a false positive for 'spam'.",
      ],
    },
    {
      id: "w3l3-c2",
      title: "Edge cases sit near the boundary",
      body: [
        "Classifiers make most of their mistakes on edge cases: unusual inputs that sit near the boundary between two categories. A fluffy small dog shares features with cats, a rabbit photographed with its ears down loses a key feature, and a dark blurry photo hides features from every category.",
        "Edge cases are not random. If you can predict which inputs are near the boundary, you can predict where the classifier will struggle — and gather better examples for exactly those cases.",
      ],
      examples: [
        "A hairless cat that lacks the usual fur texture.",
        "A dog wearing a costume that hides its shape.",
        "A photo taken in very low light where colors and edges are unclear.",
      ],
    },
    {
      id: "w3l3-c3",
      title: "Reading a confusion matrix, then improving the model",
      body: [
        "A confusion matrix lays the true labels against the predictions in a grid. Numbers on the diagonal (true cat predicted cat) are correct; numbers off the diagonal are mistakes, and each off-diagonal cell tells you exactly which mix-up happened and how often. A big number in the 'true dog, predicted cat' cell means dogs are often mistaken for cats.",
        "Once you can see the biggest mistake, you can improve the model on purpose. The most common fix is adding more, better examples of the confused case — such as more photos of fluffy small dogs — so the classifier learns the features that tell them apart. You improve where the matrix points, then measure again.",
      ],
      examples: [
        "The cell 'true rabbit, predicted cat' being large means rabbits get called cats a lot.",
        "Adding clearer rabbit photos targets that exact mistake.",
        "After a fix, you re-check accuracy and the matrix to confirm the mistake shrank.",
      ],
    },
  ],
  workedExample: {
    id: "w3l3-we",
    title: "From a confusing mistake to a targeted fix",
    steps: [
      "Look at the confusion matrix and find the largest off-diagonal number: 'true rabbit, predicted cat' with 9 mistakes.",
      "Name the mistake type: for the cat category these are false positives (called cat, but really rabbits); for the rabbit category they are false negatives (real rabbits missed).",
      "Ask why: rabbits and cats can share fur texture and rounded shapes, and rabbits with ears down lose the feature that sets them apart — classic edge cases.",
      "Propose a fix: add more rabbit photos to the training set, especially rabbits with ears down and at cat-like angles, so the classifier learns the differences.",
      "Re-measure: test again and check whether the 'true rabbit, predicted cat' cell got smaller and rabbit accuracy went up.",
    ],
    takeaway: "Find the biggest mistake in the confusion matrix, name what kind it is, explain the edge case behind it, add targeted examples, then measure again.",
  },
  visuals: [
    {
      id: "w3l3-vis1",
      kind: "confusion-matrix",
      title: "Confusion matrix for the pet classifier",
      summary:
        "A 3 by 3 confusion matrix for a cat, dog, and rabbit classifier on the test set. Rows are the true label, columns are the predicted label. True cats: 47 predicted cat, 2 dog, 1 rabbit. True dogs: 3 cat, 44 dog, 3 rabbit. True rabbits: 9 cat, 4 dog, 37 rabbit. The diagonal (47, 44, 37) is correct. The largest mistake is 9 in the 'true rabbit, predicted cat' cell, showing rabbits are most often mistaken for cats — the same weak rabbit category from the accuracy chart.",
      caption: "Diagonal cells are correct; the 9 in 'true rabbit, predicted cat' is the biggest mistake to fix.",
      matrix: {
        labels: ["Cat", "Dog", "Rabbit"],
        counts: [
          [47, 2, 1],
          [3, 44, 3],
          [9, 4, 37],
        ],
      },
    },
    {
      id: "w3l3-vis2",
      kind: "before-after",
      title: "Improving the weakest category",
      summary:
        "Before: the training set had few photos of rabbits with their ears down, so many such rabbits were predicted as cats, and rabbit accuracy sat at 74 percent. After: more rabbit photos were added, especially edge cases with ears down and at cat-like angles; the classifier learned the difference, the 'true rabbit, predicted cat' mistakes dropped, and rabbit accuracy rose. The fix targeted the exact mistake the confusion matrix pointed to.",
      caption: "Adding examples aimed at the biggest confusion is how you improve on purpose.",
    },
  ],
  activity: {
    id: "w3l3-act",
    kind: "confusion-improve",
    title: "Confuse and Improve",
    goal: "Try to confuse the classifier with edge cases, then improve a weak model by adding a few varied training pictures and comparing the first and improved models.",
    status: "interactive",
    overview:
      "Part 1: run the classifier on built-in edge cases — a rotated shape, a partly hidden shape, a noisy background, a blur, a tiny shape, a too-thick pencil, and a mixed picture. Predict each result first, then see the model's answer, confidence, and the likely source of confusion, and decide whether the picture belongs in training, testing, or neither. Part 2: a weak starter model has only ever seen circles and squares — never a triangle — so it misses every triangle; add up to four varied pictures, retrain, and compare the first and improved models side by side — training counts, overall and category accuracy, both confusion matrices, and exactly which test pictures were fixed or newly broken. Everything is generated and runs on-device.",
    steps: [
      "For each edge case, predict the model's answer, run it, and read the source of confusion.",
      "Decide whether each edge case belongs in training, testing, or neither.",
      "Add up to four varied pictures to the weak starter model and retrain.",
      "Compare the first and improved models, and explain why your changes helped or did not.",
    ],
    materials: ["The built-in generated edge cases and picture sets in this activity"],
    successCriteria: [
      "Each edge case has a saved prediction and its confusion is explained.",
      "The improved model is built by adding varied training pictures and retraining.",
      "The first and improved models are compared, with fixed and newly-broken pictures identified.",
    ],
    dataset: {
      id: "w3l3-act-ds",
      name: "Generated edge cases + shape train/test sets",
      description: "Locally generated edge-case pictures (rotated, obstructed, noisy, blurred, very small, shared-feature, and mixed) plus the shape training pool and held-back test set used for the first-versus-improved comparison. All drawn on-device from specs; nothing is uploaded.",
      columns: ["picture", "edge-case type", "true label", "predicted label", "confidence", "why (confusion)"],
      rowCount: 16,
    },
  },
  knowledgeCheck: {
    id: "w3l3-kc",
    instructions: "Answer these to check that you can read a classifier's mistakes and improve it.",
    passThreshold: 2,
    questions: [
      {
        id: "w3l3-kc-q1",
        kind: "scenario",
        prompt: "What kind of mistake is this for the 'cat' category?",
        scenario: "A photo is really a rabbit, but the classifier predicts 'cat'.",
        explanation: "The classifier put a non-cat into the cat category, so it is a false positive for cat. (It is also a false negative for rabbit, since a real rabbit was missed.)",
        choices: [
          { id: "w3l3-kc-q1-a", text: "A false positive for cat", correct: true, explanation: "Correct — it said 'cat' about something that is not a cat, which is a false positive for the cat category." },
          { id: "w3l3-kc-q1-b", text: "A false negative for cat", correct: false, explanation: "A false negative for cat would be a real cat the classifier missed; here the photo is not a cat at all." },
          { id: "w3l3-kc-q1-c", text: "A correct prediction", correct: false, explanation: "It is a mistake — the photo is a rabbit, not a cat." },
          { id: "w3l3-kc-q1-d", text: "Not a mistake that a confusion matrix can show", correct: false, explanation: "A confusion matrix shows exactly this: it would appear in the 'true rabbit, predicted cat' cell." },
        ],
      },
      {
        id: "w3l3-kc-q2",
        kind: "multiple",
        prompt: "Which of these are good ways to reduce a specific mistake a confusion matrix reveals? Choose all that apply.",
        explanation: "Targeted improvement means acting on the biggest confusion: add examples of the confused case, focus on the edge cases, and re-measure to confirm the fix. Simply deleting the weak category or hiding confidence does not fix the underlying mistake.",
        choices: [
          { id: "w3l3-kc-q2-a", text: "Add more training examples of the category that gets confused, including edge cases", correct: true, explanation: "Correct — more, better examples of the confused case help the classifier learn the difference." },
          { id: "w3l3-kc-q2-b", text: "Re-test after the change to see if that mistake got smaller", correct: true, explanation: "Correct — you measure again to confirm the fix actually reduced the mistake." },
          { id: "w3l3-kc-q2-c", text: "Delete the weak category so it can never be wrong", correct: false, explanation: "Removing a category doesn't improve the classifier; it just stops it from doing a job it is supposed to do." },
          { id: "w3l3-kc-q2-d", text: "Hide the confidence score so mistakes are less obvious", correct: false, explanation: "Hiding information does not fix any mistake; it only makes the mistakes harder to notice." },
        ],
      },
      {
        id: "w3l3-kc-q3",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "In a confusion matrix, the numbers on the diagonal are the correct predictions.",
        answer: true,
        explanation: "True — a diagonal cell is where the true label and the predicted label match (true cat predicted cat), so those are the correct predictions; off-diagonal cells are the mistakes.",
      },
    ],
  },
  challenge: {
    id: "w3l3-ch",
    title: "Hunt the confusion",
    prompt: "Pick a category pair you expect a classifier to confuse and plan how you would find and fix that confusion.",
    steps: [
      "Choose two similar categories (for example, muffins vs. cupcakes, or wolves vs. dogs).",
      "Describe one edge case near the boundary and predict whether it becomes a false positive or false negative for each category.",
      "Say which cell of a confusion matrix would grow, and what examples you would add to shrink it.",
    ],
    successCriteria: [
      "A believable confused pair with a boundary edge case.",
      "The mistake correctly framed as a false positive or false negative.",
      "A targeted fix tied to a specific confusion-matrix cell.",
    ],
  },
  reflection: [
    { id: "w3l3-r1", prompt: "Was your prediction about which two categories get confused most correct? What did the confusion matrix show?" },
    { id: "w3l3-r2", prompt: "When would a false negative be more dangerous than a false positive, or the other way around? Give a real example." },
  ],
  recap: {
    id: "w3l3-recap",
    summary: "A confusion matrix shows exactly which categories a classifier mixes up, and edge cases explain why; you improve the model by adding targeted examples and measuring again.",
    keyPoints: [
      "False positives and false negatives are different mistakes with different costs.",
      "Edge cases near a category boundary cause most confusions.",
      "Read the confusion matrix, add examples for the biggest mistake, then re-measure.",
    ],
  },
  extension: {
    id: "w3l3-ext",
    title: "Which mistake would you rather make?",
    gradeBand: "7-8",
    body: [
      "For many real systems, you cannot remove all mistakes, so designers choose which kind to lean toward. A medical screening tool might accept more false positives (extra check-ups) to avoid false negatives (a missed illness), while a spam filter might accept more false negatives (some spam gets through) to avoid false positives (losing a real message).",
      "Pick a real classifier and argue which mistake it should avoid most. How could its makers shift the model or its threshold to trade one kind of error for the other?",
    ],
  },
}

export const week3: CourseWeek = {
  id: "week-3",
  week: 3,
  title: "Image Recognition and Model Mistakes",
  subtitle: "See how an image classifier turns pixels into predictions, measure how well it works, and find and fix the mistakes it makes.",
  summary:
    "Students open up image classification: how a classifier reads pixels as visual features to make a prediction with a confidence, how to measure it fairly using accuracy and category-level accuracy on a held-back test set, and how to read a confusion matrix to find false positives, false negatives, and edge cases — then improve the model with targeted examples.",
  bigQuestion: "How does a classifier turn pixels into a prediction, and how do we find and fix the mistakes it makes?",
  estimatedTime: "2.5-3 hours",
  objectives: [
    "Explain how an image classifier turns pixels into visual features, a prediction, and a confidence.",
    "Measure a classifier fairly using accuracy and category-level accuracy on a separate test set.",
    "Tell false positives from false negatives and spot the edge cases that cause them.",
    "Read a confusion matrix and propose targeted improvements to reduce a specific mistake.",
  ],
  requiredConcepts: [
    "Pixel",
    "Visual feature",
    "Classification",
    "Prediction",
    "Confidence",
    "Accuracy",
    "False positive",
    "False negative",
    "Edge case",
    "Confusion matrix",
    "Category-level accuracy",
  ],
  lessons: [lessonHowClassifierWorks, lessonTrainAndTest, lessonConfuseAndImprove],
}
