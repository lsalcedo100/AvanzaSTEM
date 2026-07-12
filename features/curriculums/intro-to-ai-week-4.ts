/**
 * Intro to AI — Week 4: Text AI, Chatbots, and Recommendations.
 *
 * Authored content only; conforms to the types in `intro-to-ai-types.ts`. Every
 * id is stable and unique (prefixed by the owning lesson id). No interactive
 * engines are wired up yet, so each activity is a `briefing`. No text is sent to
 * any external AI service — the chatbot and next-text activities use built-in,
 * described examples only.
 */
import type { CourseWeek, Lesson } from "./intro-to-ai-types.ts"

const lessonRuleBasedChatbot: Lesson = {
  id: "w4l1",
  slug: "rule-based-chatbot",
  order: 1,
  title: "Build a Rule-Based Chatbot",
  summary:
    "Design a chatbot the old-fashioned way — with keywords, intents, and a decision tree — and discover why it needs a fallback for everything it wasn't built to handle.",
  estimatedTime: "50-60 minutes",
  objectives: [
    { id: "w4l1-o1", text: "Explain how a rule-based chatbot uses keywords to guess a user's intent." },
    { id: "w4l1-o2", text: "Map a set of intents and replies as a decision tree." },
    { id: "w4l1-o3", text: "Explain why a chatbot needs a fallback for messages it doesn't understand." },
    { id: "w4l1-o4", text: "Compare a rule-based chatbot with an AI that learns from examples." },
  ],
  materials: [
    { id: "w4l1-m1", name: "This lesson in a web browser", optional: false },
    { id: "w4l1-m2", name: "Paper and pencil, or a notes app", optional: false },
    { id: "w4l1-m3", name: "A ruler or straightedge for drawing a tidy tree diagram", optional: true, note: "Only helps make the decision tree neat; freehand is fine." },
  ],
  vocabulary: [
    { id: "w4l1-v1", term: "Keyword", definition: "An important word the chatbot looks for in a message to figure out what the person wants, like 'hours' or 'price'." },
    { id: "w4l1-v2", term: "Intent", definition: "What the person is actually trying to do or ask, such as 'find the opening hours' — even if they word it many different ways." },
    { id: "w4l1-v3", term: "Decision tree", definition: "A branching set of yes/no or if/then choices that leads from a message to a reply, like a flowchart." },
    { id: "w4l1-v4", term: "Fallback", definition: "The safety reply a chatbot gives when it doesn't match any keyword or intent, such as 'Sorry, I didn't understand that.'" },
  ],
  openingScenario: {
    id: "w4l1-open",
    prompt: "A pizza shop's chat window answers 'What time do you close?' instantly, but replies 'Sorry, I didn't understand' when you type 'when do you shut?' Both questions mean the same thing. Why does one work and the other fail?",
    context: "Hold on to your guess — by the end you'll be able to explain exactly what went wrong.",
  },
  predictionPrompt: {
    id: "w4l1-pred",
    prompt: "Predict: if a chatbot only knows the keyword 'close', how many different ways could a customer ask about closing time without ever using that word?",
    howToCheck: "As you read, list phrasings a customer might use, then count how many miss the keyword 'close'.",
  },
  concepts: [
    {
      id: "w4l1-c1",
      title: "Keywords: the words the chatbot watches for",
      body: [
        "A rule-based chatbot doesn't understand language the way you do. Instead, a person gives it a list of keywords to look for. When your message contains a keyword like 'hours', 'open', or 'close', the bot picks the reply that a human wrote for that word.",
        "This is fast and predictable, but fragile. If you ask the same thing using different words, the keyword isn't there, and the bot misses it completely.",
      ],
      examples: [
        "Keyword 'hours' → reply with the opening hours",
        "Keyword 'price' or 'cost' → reply with the menu prices",
        "Keyword 'refund' → reply with the return policy",
      ],
    },
    {
      id: "w4l1-c2",
      title: "Intent: what the person actually wants",
      body: [
        "Behind the words is an intent — the thing the person is really trying to do. 'What time do you close?', 'Are you open late?', and 'When do you shut?' are three different sentences with one intent: find out the hours.",
        "Good chatbot design groups many keywords and phrasings under the same intent. The more keywords you attach to an intent, the more ways of asking the bot can catch — but a person still has to think of them in advance.",
      ],
      examples: [
        "Intent 'get hours' matches keywords: hours, open, close, closing, late, when",
        "Intent 'find location' matches: where, address, directions, located",
        "Intent 'place order' matches: order, buy, delivery, pickup",
      ],
    },
    {
      id: "w4l1-c3",
      title: "Decision tree and fallback: routing a message to a reply",
      body: [
        "A rule-based chatbot follows a decision tree: check for the first intent's keywords; if found, give that reply; if not, check the next intent; and so on down the branches. Each branch ends in a reply a person wrote.",
        "But no list of keywords covers every possible message. When nothing matches, the tree reaches its last branch: the fallback. The fallback is an honest 'I didn't understand that' plus, in good designs, a hint about what the bot can help with. Without a fallback, an unmatched message would get no reply at all.",
      ],
      examples: [
        "Message 'when do you shut?' with no 'hours' keyword → falls through to the fallback",
        "Fallback reply: 'Sorry, I can help with hours, location, and orders. Try asking about one of those.'",
      ],
    },
  ],
  workedExample: {
    id: "w4l1-we",
    title: "Tracing a message through the tree",
    steps: [
      "The bot has three intents set up by a person: 'get hours' (keywords: hours, open, close), 'find location' (where, address), and 'place order' (order, delivery).",
      "A customer types: 'How much is a large pizza?'",
      "Branch 1 — does it contain hours, open, or close? No. Move on.",
      "Branch 2 — does it contain where or address? No. Move on.",
      "Branch 3 — does it contain order or delivery? No. Move on.",
      "No branch matched, so the tree reaches the fallback: 'Sorry, I didn't understand. I can help with hours, location, and orders.' The customer really wanted the price — an intent the bot was never given.",
    ],
    takeaway: "A rule-based bot can only answer intents someone built in; anything else falls through to the fallback, even when the question is perfectly clear to a human.",
  },
  visuals: [
    {
      id: "w4l1-vis1",
      kind: "decision-tree",
      title: "How a rule-based chatbot routes a message",
      summary:
        "A decision tree that starts at the top with the incoming message and flows downward through one check per intent. Node 1 asks: 'Does the message contain hours, open, or close?' If yes, the branch ends in the reply 'We're open 11am to 10pm.' If no, it flows down to Node 2: 'Does it contain where or address?' If yes, the branch ends in 'We're at 5 Main Street.' If no, it flows to Node 3: 'Does it contain order or delivery?' If yes, the branch ends in 'Order online or call 555-1234.' If no, the final branch is the fallback: 'Sorry, I didn't understand. I can help with hours, location, and orders.' Every yes-branch is a leaf with a human-written reply; the very last no-branch is always the fallback so no message is left unanswered.",
      caption: "Each intent is one check; the last branch is the fallback that catches everything unmatched.",
      tree: {
        id: "msg",
        label: "Incoming message",
        branches: [
          { condition: "it mentions hours, open, or close", child: { id: "hours", label: "Reply: \"We're open 11am to 10pm.\"" } },
          { condition: "it mentions where or address", child: { id: "loc", label: "Reply: \"We're at 5 Main Street.\"" } },
          { condition: "it mentions order or delivery", child: { id: "order", label: "Reply: \"Order online or call 555-1234.\"" } },
          { condition: "none of the above match", child: { id: "fallback", label: "Fallback: \"Sorry, I didn't understand. I can help with hours, location, and orders.\"" } },
        ],
      },
    },
    {
      id: "w4l1-vis2",
      kind: "table",
      title: "Same intent, many wordings",
      summary:
        "A table showing that one intent, 'get hours', can be asked many ways. Rows: 'What time do you close?' contains the keyword 'close', so it matches. 'Are you open late?' contains 'open', so it matches. 'When do you shut?' contains no listed keyword, so it misses and hits the fallback. 'Still serving?' contains no listed keyword, so it also misses. The lesson: adding more keywords catches more wordings, but a human must think of them all.",
      table: {
        columns: ["Customer message", "Keyword found?", "Result"],
        rows: [
          ["What time do you close?", "close", "Matches 'get hours'"],
          ["Are you open late?", "open", "Matches 'get hours'"],
          ["When do you shut?", "none", "Falls to fallback"],
          ["Still serving food?", "none", "Falls to fallback"],
        ],
      },
    },
  ],
  activity: {
    id: "w4l1-act",
    kind: "rule-chatbot",
    title: "Rule-Based Chatbot Builder",
    goal: "Build a working rule-based chatbot from a template — intents, keywords, a follow-up branch, and a fallback — and test it in a live preview that shows exactly which rule matched.",
    status: "interactive",
    overview:
      "Start from a safe template (library, recycling, museum, club, or homework helper) and edit it with structured controls — no code. Add and reorder intents, give each keywords and a response, add a follow-up branch, and set a fallback, a privacy boundary, and a human-help option. A decision-tree outline and live validation flag dead ends, unreachable nodes, and a missing fallback. Then chat with your bot in a live preview that shows the matched rule for every reply, and keep a test transcript you can clear without deleting the bot. Nothing is sent to any external service; the matching is real, deterministic keyword matching.",
    steps: [
      "Pick a template and edit the welcome, intents (keywords + responses), a follow-up branch, and the fallback.",
      "Watch the decision-tree outline and the checks for dead ends, unreachable nodes, and a missing fallback.",
      "Test the bot live: normal questions, unexpected input, and asking for a human.",
      "Read the rule trace for each reply and the test-transcript log.",
    ],
    materials: ["The built-in chatbot builder and templates in this activity"],
    successCriteria: [
      "A chatbot with at least three intents, a follow-up branch, a fallback, a privacy boundary, and a human-help option.",
      "The validation checks pass (no dead ends, unreachable nodes, or missing fallback).",
      "The bot is tested with normal and unexpected input, and the matched rule is visible.",
    ],
    dataset: {
      id: "w4l1-act-ds",
      name: "Chatbot templates (safe topics)",
      description: "Five built-in, editable rule-based chatbot templates on safe topics (school library, recycling, museum, club, homework planning). No medical, legal, or crisis advice; nothing is sent to an external service; matching is deterministic keyword matching.",
      columns: ["Template", "Intents", "Follow-up branch", "Fallback"],
      rowCount: 5,
    },
  },
  knowledgeCheck: {
    id: "w4l1-kc",
    instructions: "Answer these to check that you understand how a rule-based chatbot works.",
    passThreshold: 2,
    questions: [
      {
        id: "w4l1-kc-q1",
        kind: "single",
        prompt: "What is an 'intent' in a chatbot?",
        explanation: "An intent is the goal behind a message — what the person wants — no matter which exact words they use.",
        choices: [
          { id: "w4l1-kc-q1-a", text: "The exact words the person typed", correct: false, explanation: "The exact words are just the message; many different words can share one intent." },
          { id: "w4l1-kc-q1-b", text: "What the person is really trying to do or ask", correct: true, explanation: "Correct — the intent is the underlying goal, like 'find the hours', however it's worded." },
          { id: "w4l1-kc-q1-c", text: "The reply the chatbot sends", correct: false, explanation: "That's the output reply, not the intent behind the person's message." },
          { id: "w4l1-kc-q1-d", text: "A word the bot didn't recognize", correct: false, explanation: "An unrecognized word leads to the fallback; it isn't the definition of an intent." },
        ],
      },
      {
        id: "w4l1-kc-q2",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "A rule-based chatbot needs a fallback so that messages it doesn't match still get some reply.",
        answer: true,
        explanation: "True — without a fallback, any message that misses every keyword would get no answer at all. The fallback is the catch-all last branch.",
      },
      {
        id: "w4l1-kc-q3",
        kind: "ordering",
        prompt: "Put the steps of how a rule-based chatbot answers a message in the right order.",
        explanation: "The bot receives the message, checks it against each intent's keywords in turn, sends the matching reply, and uses the fallback only if nothing matched.",
        items: [
          { id: "w4l1-kc-q3-i1", text: "A message arrives from the person" },
          { id: "w4l1-kc-q3-i2", text: "The bot checks the message for each intent's keywords, branch by branch" },
          { id: "w4l1-kc-q3-i3", text: "If a branch matches, the bot sends that branch's reply" },
          { id: "w4l1-kc-q3-i4", text: "If no branch matched, the bot sends the fallback reply" },
        ],
        correctOrder: ["w4l1-kc-q3-i1", "w4l1-kc-q3-i2", "w4l1-kc-q3-i3", "w4l1-kc-q3-i4"],
      },
    ],
  },
  challenge: {
    id: "w4l1-ch",
    title: "Break your own chatbot",
    prompt: "Take the chatbot you designed and try to fool it. Find three messages a real person might send that your keywords miss.",
    steps: [
      "Write three messages that mean something your bot should handle, but avoid all of your keywords.",
      "Trace each one through your tree and confirm it hits the fallback.",
      "For each, decide: could you fix it by adding a keyword, or is it too different to catch with rules?",
    ],
    successCriteria: [
      "Three messages that reach the fallback even though a human would understand them.",
      "For each, a note on whether a keyword could fix it.",
      "One clear example that keywords alone cannot solve.",
    ],
  },
  reflection: [
    { id: "w4l1-r1", prompt: "What is one kind of question your chatbot handled well, and one it kept getting wrong?" },
    { id: "w4l1-r2", prompt: "How would learning from thousands of real messages help a chatbot catch wordings you never thought of?" },
  ],
  recap: {
    id: "w4l1-recap",
    summary: "A rule-based chatbot matches keywords to guess a user's intent, routes the message through a decision tree, and uses a fallback for anything it can't match.",
    keyPoints: [
      "Keywords are the words the bot watches for; intents are what the person really wants.",
      "A decision tree checks one intent per branch and ends in a fallback.",
      "Rule-based bots only handle intents someone built in — everything else falls through.",
    ],
  },
  extension: {
    id: "w4l1-ext",
    title: "From rules to learning",
    gradeBand: "7-8",
    body: [
      "Big real chatbots don't rely on keyword lists alone. Many use machine learning trained on thousands of real messages, so they can recognize an intent even from wordings no one typed in by hand.",
      "Describe one advantage and one risk of a learning-based chatbot compared with your rule-based one. Think about what happens when the training messages don't include the way some people speak.",
    ],
  },
}

const lessonHowLanguageModelsPredict: Lesson = {
  id: "w4l2",
  slug: "how-language-models-predict-text",
  order: 2,
  title: "How Language Models Predict Text",
  summary:
    "Look inside the AI behind autocomplete and chat assistants: it breaks text into pieces and predicts the likely next piece — which sounds fluent but is not the same as being true.",
  estimatedTime: "50-60 minutes",
  objectives: [
    { id: "w4l2-o1", text: "Explain that a language model predicts the likely next piece of text." },
    { id: "w4l2-o2", text: "Describe how text is split into tokens (pieces) that the model works with." },
    { id: "w4l2-o3", text: "Explain how a prompt starts and steers the prediction." },
    { id: "w4l2-o4", text: "Explain why fluent-sounding output is not the same as true or correct output." },
  ],
  materials: [
    { id: "w4l2-m1", name: "This lesson in a web browser", optional: false },
    { id: "w4l2-m2", name: "Paper and pencil, or a notes app", optional: false },
  ],
  vocabulary: [
    { id: "w4l2-v1", term: "Language model", definition: "An AI trained on huge amounts of text that predicts what text is likely to come next." },
    { id: "w4l2-v2", term: "Token (text piece)", definition: "A small chunk of text the model works with — often a word or part of a word, like 'play', 'ing', or a punctuation mark." },
    { id: "w4l2-v3", term: "Likely next text", definition: "The pieces the model estimates are most probable to follow, based on patterns in the text it learned from." },
    { id: "w4l2-v4", term: "Prompt", definition: "The starting text you give a language model, which it continues by predicting what comes next." },
    { id: "w4l2-v5", term: "Fluent", definition: "Reading smoothly and sounding natural. Fluent text can still be wrong, because sounding right is not the same as being right." },
  ],
  openingScenario: {
    id: "w4l2-open",
    prompt: "Type 'Once upon a' on a phone and it suggests 'time'. Type 'The capital of Australia is' into a chat assistant and it might smoothly answer 'Sydney' — which is wrong; it's Canberra. If both answers sound natural, how does the AI decide what to say?",
    context: "Keep this in mind: sounding right and being right are two different things.",
  },
  predictionPrompt: {
    id: "w4l2-pred",
    prompt: "Predict: when you type 'peanut butter and', what word do you think a language model is most likely to add, and why that one?",
    howToCheck: "As you read, notice that the model picks the piece that most often followed similar text in what it learned from.",
  },
  concepts: [
    {
      id: "w4l2-c1",
      title: "Text is broken into pieces called tokens",
      body: [
        "A language model doesn't read whole essays at once. It breaks text into small pieces called tokens. A token is often a word, but long or unusual words get split — 'unbelievable' might become 'un', 'believ', and 'able'. Spaces and punctuation count too.",
        "Working in tokens lets the model handle any text, even words it has never seen, by combining familiar pieces.",
      ],
      examples: [
        "'I love pizza' → tokens: 'I', ' love', ' pizza'",
        "'playing' → tokens: 'play', 'ing'",
        "A period '.' is its own token",
      ],
    },
    {
      id: "w4l2-c2",
      title: "The model predicts the likely next piece",
      body: [
        "A language model has one core job: given the text so far, predict the next token. It learned from enormous amounts of text which pieces tend to follow which. After 'peanut butter and', the piece 'jelly' is very likely, so that's what it predicts.",
        "It does this over and over — predict a piece, add it, then predict the next — to build whole sentences. Your prompt is the starting text that sets everything in motion; change the prompt and the likely next pieces change too.",
      ],
      examples: [
        "Prompt 'The sky is' → likely next piece 'blue'",
        "Prompt 'Dear Principal,' → likely next pieces start a polite letter",
        "Prompt 'def add(a, b):' → likely next pieces look like computer code",
      ],
    },
    {
      id: "w4l2-c3",
      title: "Fluent is not the same as true",
      body: [
        "Here's the most important idea in this lesson. A language model predicts what text is likely, not what is true. 'Likely' means it fits the patterns of language it learned — not that a person checked the facts.",
        "So a model can produce a smooth, confident, grammatical sentence that is simply wrong. This is sometimes called a made-up or 'hallucinated' answer. Fluent output means the words fit together well; it says nothing about whether the claim is correct. Always check important facts against a trusted source, not just because the AI 'sounded sure'.",
      ],
      examples: [
        "A model may state a fake book title in a perfectly natural sentence",
        "It may confidently give a wrong date that reads smoothly",
        "It may invent a source that sounds real but doesn't exist",
      ],
    },
  ],
  workedExample: {
    id: "w4l2-we",
    title: "Predicting piece by piece from a prompt",
    steps: [
      "Prompt: 'The best part of summer is'.",
      "The model splits it into tokens and looks at the patterns of text that followed similar starts.",
      "It predicts the most likely next piece — maybe ' swimming' — and adds it.",
      "Now the text is 'The best part of summer is swimming'; it predicts again, maybe ' in', then ' the', then ' pool'.",
      "Piece by piece it builds a fluent sentence. Notice: at no point did it check whether swimming truly is the best part of summer — it only followed likely patterns.",
    ],
    takeaway: "A language model builds text one likely piece at a time from your prompt; the result sounds natural but is a prediction, not a verified fact.",
  },
  visuals: [
    {
      id: "w4l2-vis1",
      kind: "flow",
      title: "Predict, add, repeat",
      summary:
        "A loop shown as a flow. Start: the prompt text. Step 1: split into tokens (pieces). Step 2: predict the most likely next piece. Step 3: add that piece to the text. An arrow loops from Step 3 back to Step 2 to predict again, and again, growing the text one piece at a time until it stops. The flow highlights that each step only asks 'what piece is likely next?', never 'is this true?'.",
      caption: "The model repeats one question — what piece is likely next — never 'is this correct?'.",
    },
    {
      id: "w4l2-vis2",
      kind: "bar-chart",
      title: "How likely is each next piece after 'The sky is'",
      summary:
        "A bar chart of made-up-but-realistic likelihoods for the next piece after the prompt 'The sky is'. 'blue' is by far the tallest bar at about 60 out of 100, 'clear' is around 15, 'falling' around 8, 'grey' around 7, and 'green' is a very short bar at about 2. The model tends to pick a high bar, which is why it usually says 'blue' — but a short bar like 'green' is still possible, and 'likely' never means 'checked to be true'.",
      chart: {
        unit: "likelihood out of 100",
        bars: [
          { label: "blue", value: 60 },
          { label: "clear", value: 15 },
          { label: "falling", value: 8 },
          { label: "grey", value: 7 },
          { label: "green", value: 2 },
        ],
      },
    },
  ],
  activity: {
    id: "w4l2-act",
    kind: "next-text-prediction",
    title: "Next-Text Prediction Lab",
    goal: "Run a small, local next-word predictor: see the likely next words for a prompt, change a word to watch the probabilities shift, and judge whether fluent text is actually true.",
    status: "interactive",
    overview:
      "A tiny n-gram model, built from a curated local word list, predicts the most likely next words for a prompt and shows their relative likelihoods as a small chart — no external language model and no network. Swap a word (storm → parade) or add your own words and the predictions recompute deterministically, with an explanation of whether it used the last two words or backed off to one. Then judge the fluency cards: smooth, confident sentences that can still invent a date, a quote, or a false claim, each with a way to verify it.",
    steps: [
      "Pick a prompt and read the most likely next words and their likelihoods.",
      "Swap a word or add your own words, and watch the probabilities change.",
      "Read the explanation of what the model matched — it is pattern-matching, not understanding.",
      "Judge the fluency cards: decide true / false / need-to-check, then reveal and see how to verify.",
    ],
    materials: ["The built-in next-text prediction lab in this activity"],
    successCriteria: [
      "The likely next words are read for at least two prompts, including a word swap.",
      "The effect of changing context on the probabilities is observed.",
      "A fluent-but-false card is identified, with a way to verify it.",
    ],
    dataset: {
      id: "w4l2-act-ds",
      name: "Local corpus + fluency cards",
      description: "A small, curated, age-appropriate word list the local n-gram model is built from, plus fluency cards — smooth sentences that are true or fluent-but-false (an invented date, a misattributed quote) with verification notes. No text is sent to any AI service.",
      columns: ["Prompt", "Likely next words", "Continuation", "Actually true?"],
      rowCount: 12,
    },
  },
  knowledgeCheck: {
    id: "w4l2-kc",
    instructions: "Answer these to check that you understand how a language model predicts text.",
    passThreshold: 2,
    questions: [
      {
        id: "w4l2-kc-q1",
        kind: "single",
        prompt: "What is a language model actually doing when it writes an answer?",
        explanation: "A language model predicts the likely next piece of text over and over; it is not looking up checked facts.",
        choices: [
          { id: "w4l2-kc-q1-a", text: "Looking up verified facts in a trusted encyclopedia", correct: false, explanation: "It doesn't verify facts; it predicts likely text, which can be wrong." },
          { id: "w4l2-kc-q1-b", text: "Predicting the likely next piece of text, again and again", correct: true, explanation: "Correct — it builds text one likely piece at a time based on learned patterns." },
          { id: "w4l2-kc-q1-c", text: "Copying a whole answer word-for-word from one website", correct: false, explanation: "It generates text piece by piece from patterns, not by copying one page." },
          { id: "w4l2-kc-q1-d", text: "Asking a human for the answer each time", correct: false, explanation: "No human is answering; the model predicts on its own." },
        ],
      },
      {
        id: "w4l2-kc-q2",
        kind: "true-false",
        prompt: "Decide if the statement is true or false.",
        statement: "If a language model's answer is fluent and sounds confident, that proves the answer is true.",
        answer: false,
        explanation: "False — fluent means the words fit together smoothly, not that the claim is correct. A model can state something wrong very smoothly, so important facts must be checked.",
      },
      {
        id: "w4l2-kc-q3",
        kind: "scenario",
        prompt: "What is the smartest next move in this scenario?",
        scenario: "For a report, Priya asks a chat assistant when a famous bridge was built. It replies with a smooth sentence and a specific year that she has never seen before.",
        explanation: "The answer is a prediction of likely text, not a checked fact, so Priya should confirm the year with a trusted source before using it.",
        choices: [
          { id: "w4l2-kc-q3-a", text: "Use the year right away because the sentence sounded confident", correct: false, explanation: "Sounding confident is fluency, not proof; the model may have predicted a wrong year." },
          { id: "w4l2-kc-q3-b", text: "Check the year against a trusted source before using it", correct: true, explanation: "Correct — verify important facts, because the model predicts likely text, not checked truth." },
          { id: "w4l2-kc-q3-c", text: "Assume it must be wrong and ignore it completely", correct: false, explanation: "It might be right or wrong; the point is to verify, not to blindly trust or reject." },
        ],
      },
    ],
  },
  challenge: {
    id: "w4l2-ch",
    title: "Likely versus true detective",
    prompt: "Collect two examples where 'likely next text' and 'true' pull in different directions.",
    steps: [
      "Write one prompt where the likely continuation is also true (for example, 'Two plus two is').",
      "Write one prompt where a likely-sounding continuation could easily be false (for example, a specific date or a book's author).",
      "For the risky one, describe exactly how you would check whether the answer is true.",
    ],
    successCriteria: [
      "One prompt where likely and true match.",
      "One prompt where a fluent answer could be false.",
      "A clear plan for verifying the risky answer with a trusted source.",
    ],
  },
  reflection: [
    { id: "w4l2-r1", prompt: "When is it fine to trust a fluent AI answer, and when should you always double-check it?" },
    { id: "w4l2-r2", prompt: "How did seeing text as 'pieces with likelihoods' change how you think about AI writing?" },
  ],
  recap: {
    id: "w4l2-recap",
    summary: "A language model splits text into pieces and predicts the likely next piece from a prompt; the output sounds fluent but is a prediction, not a checked fact.",
    keyPoints: [
      "Text is broken into tokens (pieces); the model predicts the likely next one, over and over.",
      "Your prompt is the starting text that steers the predictions.",
      "Fluent is not the same as true — always verify important facts.",
    ],
  },
  extension: {
    id: "w4l2-ext",
    title: "Why models make things up",
    gradeBand: "7-8",
    body: [
      "Because a language model always predicts the most likely-looking text, it will confidently fill a gap even when it has no real information — producing a made-up answer that fits the pattern of a true one. People call this a 'hallucination'.",
      "Explain in a few sentences why a system built to predict likely text would invent a fake source rather than say 'I don't know', and suggest one habit that protects you from being fooled.",
    ],
  },
}

const lessonRecommendations: Lesson = {
  id: "w4l3",
  slug: "build-and-question-recommendations",
  order: 3,
  title: "Build and Question Recommendations",
  summary:
    "See how recommendation systems use similarity and your feedback to suggest what's next — and question how the same system can trap you in a filter bubble.",
  estimatedTime: "50-60 minutes",
  objectives: [
    { id: "w4l3-o1", text: "Explain how a recommendation system uses similarity to suggest items." },
    { id: "w4l3-o2", text: "Describe how your feedback (likes, skips, watch time) trains recommendations." },
    { id: "w4l3-o3", text: "Explain what a filter bubble is and how recommendations can create one." },
    { id: "w4l3-o4", text: "Audit a recommendation feed and suggest ways to see a wider range." },
  ],
  materials: [
    { id: "w4l3-m1", name: "This lesson in a web browser", optional: false },
    { id: "w4l3-m2", name: "Paper and pencil, or a notes app", optional: false },
  ],
  vocabulary: [
    { id: "w4l3-v1", term: "Recommendation", definition: "A suggestion of something you might like next — a video, song, product, or post — chosen by an AI system." },
    { id: "w4l3-v2", term: "Similarity", definition: "How alike two items or two people are. Recommenders suggest items similar to ones you liked, or that similar people liked." },
    { id: "w4l3-v3", term: "Feedback", definition: "The signals you give a system — likes, skips, clicks, watch time — that it uses to learn your tastes." },
    { id: "w4l3-v4", term: "Filter bubble", definition: "When a system keeps showing you similar things, so you mostly see one narrow slice of ideas or content and miss the rest." },
  ],
  openingScenario: {
    id: "w4l3-open",
    prompt: "You watch one video about skateboarding tricks. Soon your whole feed is skateboarding, and videos about anything else disappear. How did the app decide to show you only this — and what might you be missing?",
    context: "You'll learn both how this is built and why it's worth questioning.",
  },
  predictionPrompt: {
    id: "w4l3-pred",
    prompt: "Predict: if a music app only ever played you songs similar to your three favorites, what kinds of music would you probably never discover?",
    howToCheck: "As you read, connect your answer to how similarity and feedback narrow what a feed shows.",
  },
  concepts: [
    {
      id: "w4l3-c1",
      title: "Recommendations run on similarity",
      body: [
        "A recommendation system suggests items by measuring similarity. If you liked a video, it looks for other videos that are similar — same topic, style, or creator — or for videos that people similar to you also liked. Then it puts those at the top of your feed.",
        "This is genuinely useful: it helps you find things you'd enjoy without searching. The system is answering 'what is most similar to what this person already liked?'",
      ],
      examples: [
        "Liked a cooking video → recommends more cooking videos",
        "'People who bought this also bought…' on a shopping site",
        "A song station built from one artist you like",
      ],
    },
    {
      id: "w4l3-c2",
      title: "Your feedback trains the system",
      body: [
        "The system doesn't know your taste in advance — it learns from your feedback. Every like, skip, click, replay, and even how long you watch is a signal. Watch to the end, and it counts as a strong 'more like this'. Skip after two seconds, and it counts as 'less like this'.",
        "So you are constantly training your own feed, often without meaning to. Pausing on a video long enough can nudge the system to show you more of that kind, whether or not you actually wanted more.",
      ],
      examples: [
        "Finishing a video → more of that topic",
        "Skipping quickly → fewer of that kind",
        "Liking a post → more from that creator and similar creators",
      ],
    },
    {
      id: "w4l3-c3",
      title: "Filter bubbles: when similarity narrows your world",
      body: [
        "Here's the honest trade-off. Because the system keeps showing you what's most similar to what you already liked, your feed can get narrower and narrower. This is called a filter bubble: you end up seeing one slice of content and miss other topics, viewpoints, and creators entirely.",
        "Filter bubbles matter beyond entertainment. If a news or opinion feed only shows you views you already agree with, you might think everyone agrees, and rarely meet good ideas that challenge you. Filter bubbles aren't caused by 'bad' AI — they're a side effect of a system doing exactly what it was built to do: maximize similarity to your past behavior. Knowing this lets you push back — by searching for new topics, following different creators, or using controls that add variety.",
      ],
      examples: [
        "A feed that becomes only one hobby after a single video",
        "A news feed that shows only one side of an issue",
        "A shopping site that never shows you a cheaper or different brand",
      ],
    },
  ],
  workedExample: {
    id: "w4l3-we",
    title: "How one click can shrink a feed",
    steps: [
      "You open a video app; the feed is mixed: sports, science, music, comedy, cooking.",
      "You watch one science video all the way through. That's strong positive feedback.",
      "The system finds videos most similar to it and moves them up, because similarity says 'show more like the thing they finished'.",
      "You watch a couple more science videos; each finish is more feedback pointing the same way.",
      "Now the feed is mostly science. The music and comedy videos, which you might also love, rarely appear — you've slipped into a filter bubble built from your own feedback.",
      "To widen it, you deliberately search a new topic, skip a few science videos, or use a 'not interested' control to send different feedback.",
    ],
    takeaway: "Similarity plus your feedback makes recommendations helpful, but the same loop can quietly narrow your feed into a filter bubble unless you act to widen it.",
  },
  visuals: [
    {
      id: "w4l3-vis1",
      kind: "flow",
      title: "The recommendation feedback loop",
      summary:
        "A circular flow with four stages. Stage 1: you watch, like, or skip something (feedback). Stage 2: the system updates its guess of your taste. Stage 3: it finds items most similar to what you liked. Stage 4: it shows you those items, which shapes what you watch next — and the arrow loops back to Stage 1. The caption notes that the loop is helpful but tends to tighten around a narrow set of items over time, forming a filter bubble.",
      caption: "The loop learns fast, but each turn can pull your feed toward a narrower set of similar items.",
    },
    {
      id: "w4l3-vis2",
      kind: "before-after",
      title: "A feed before and after a filter bubble",
      summary:
        "Before: a balanced feed with five topics in roughly equal shares — sports, science, music, comedy, and cooking. After: following one finished science video and a few more, the same feed is now mostly science with only tiny slivers of the others. The shift shows how similarity and feedback can turn a varied feed into a narrow one, and points to actions (search new topics, skip, mark 'not interested') that restore variety.",
    },
  ],
  activity: {
    id: "w4l3-act",
    kind: "recommendation-audit",
    title: "Recommendation-System Builder",
    goal: "Build a content-based recommender: rate items, choose which features matter, read recommendations that each explain themselves, and run a filter-bubble experiment.",
    status: "interactive",
    overview:
      "Rate items from a fictional catalog and set how much each feature matters. A transparent, deterministic recommender builds a preference profile and scores every other item by weighted feature similarity — and every recommendation comes with a plain-language “why you're seeing this” and the features that raised or lowered its score. A low-data warning appears when there isn't enough to go on. Then run the filter-bubble experiment: rate one topic only and watch the feed narrow, snapshot it, add a different topic or turn on Explore mode, and compare. No accounts or personal data — only the built-in catalog.",
    steps: [
      "Rate several items you like or don't from the catalog.",
      "Choose which features matter with the weight sliders.",
      "Read the recommendations and the explanation and contributing features for each.",
      "Run the filter-bubble experiment: one topic only, snapshot, then add a topic or Explore mode and compare.",
    ],
    materials: ["The built-in recommendation builder and catalog in this activity"],
    successCriteria: [
      "A profile is built by rating items, and recommendations are generated.",
      "Every recommendation has an explanation, and the low-data warning is understood.",
      "The filter-bubble experiment is run and the narrowing (and how to widen it) is described.",
    ],
    dataset: {
      id: "w4l3-act-ds",
      name: "Fictional learning-activity catalog",
      description: "A built-in, made-up catalog of learning items (activities, books, games, exhibits) across six topics, each with structured features (topic, type, difficulty, length, format, age range, fictional popularity). No personal data or accounts; scoring and explanations are deterministic and on-device.",
      columns: ["Item", "Topic", "Type", "Difficulty", "Format", "Age range"],
      rowCount: 24,
    },
  },
  knowledgeCheck: {
    id: "w4l3-kc",
    instructions: "Answer these to check that you can explain and question recommendations.",
    passThreshold: 2,
    questions: [
      {
        id: "w4l3-kc-q1",
        kind: "single",
        prompt: "What does a recommendation system mainly use to decide what to suggest next?",
        explanation: "Recommenders suggest items similar to what you liked, or that similar people liked — that's similarity.",
        choices: [
          { id: "w4l3-kc-q1-a", text: "The similarity between items, and between people's tastes", correct: true, explanation: "Correct — it finds items similar to what you liked, or liked by similar people." },
          { id: "w4l3-kc-q1-b", text: "A random pick with no pattern", correct: false, explanation: "Recommendations aren't random; they're driven by similarity and your feedback." },
          { id: "w4l3-kc-q1-c", text: "The alphabetical order of titles", correct: false, explanation: "Order by title isn't how recommenders choose what to show." },
          { id: "w4l3-kc-q1-d", text: "Whatever is newest, regardless of your tastes", correct: false, explanation: "Newness can matter a little, but the main driver is similarity to your tastes." },
        ],
      },
      {
        id: "w4l3-kc-q2",
        kind: "multiple",
        prompt: "Which of these are ways to widen a feed and escape a filter bubble? (Choose all that apply.)",
        explanation: "Sending different feedback and deliberately seeking variety both push the system away from a narrow bubble; passively finishing similar videos only tightens it.",
        choices: [
          { id: "w4l3-kc-q2-a", text: "Search for a brand-new topic you haven't watched before", correct: true, explanation: "Correct — new searches give the system fresh signals and broaden your recommendations." },
          { id: "w4l3-kc-q2-b", text: "Follow creators who are different from your usual ones", correct: true, explanation: "Correct — different creators add variety the similarity loop wouldn't offer on its own." },
          { id: "w4l3-kc-q2-c", text: "Keep watching only videos exactly like the last one to the end", correct: false, explanation: "That's strong 'more like this' feedback, which tightens the bubble instead of widening it." },
          { id: "w4l3-kc-q2-d", text: "Use a 'not interested' control on repetitive suggestions", correct: true, explanation: "Correct — that sends 'less like this' feedback and makes room for other topics." },
        ],
      },
      {
        id: "w4l3-kc-q3",
        kind: "scenario",
        prompt: "Which choice best explains what is happening in this scenario?",
        scenario: "After Sam finishes several videos arguing one side of a school debate, his feed stops showing the other side entirely, and he starts to feel like everyone agrees with him.",
        explanation: "The system keeps recommending content similar to what Sam finished, narrowing his feed to one viewpoint — a filter bubble, which matters most for news and opinions.",
        choices: [
          { id: "w4l3-kc-q3-a", text: "The app ran out of videos about the other side", correct: false, explanation: "The other side still exists; the system just stopped surfacing it because it's less similar to what Sam watched." },
          { id: "w4l3-kc-q3-b", text: "Sam is in a filter bubble built from his own feedback", correct: true, explanation: "Correct — similarity plus his finishes narrowed the feed to one viewpoint, a filter bubble." },
          { id: "w4l3-kc-q3-c", text: "The system is broken and showing random content", correct: false, explanation: "It's working as designed; maximizing similarity is exactly what created the bubble." },
        ],
      },
    ],
  },
  challenge: {
    id: "w4l3-ch",
    title: "Design a bubble-buster feature",
    prompt: "Invent one feature for a video or music app that helps people escape filter bubbles while keeping recommendations useful.",
    steps: [
      "Describe the feature and what button or control the user would see.",
      "Explain how it changes the feedback or similarity the system uses.",
      "Name one downside — for example, some users may not want more variety — and how you'd handle it.",
    ],
    successCriteria: [
      "A clear feature with a control the user can use.",
      "An explanation of how it widens the feed.",
      "One honest downside and a response to it.",
    ],
  },
  reflection: [
    { id: "w4l3-r1", prompt: "Where in your own life have you noticed a feed getting narrower over time?" },
    { id: "w4l3-r2", prompt: "When is a filter bubble mostly harmless, and when could it actually matter?" },
  ],
  recap: {
    id: "w4l3-recap",
    summary: "Recommendation systems use similarity and your feedback to suggest what's next, which is helpful but can narrow your feed into a filter bubble unless you act to widen it.",
    keyPoints: [
      "Recommenders suggest items similar to what you (or people like you) liked.",
      "Your likes, skips, and watch time are feedback that trains your feed.",
      "The same loop can create filter bubbles; searching and varied feedback widen the feed.",
    ],
  },
  extension: {
    id: "w4l3-ext",
    title: "Who benefits from your feedback?",
    gradeBand: "7-8",
    body: [
      "Recommendation systems are often designed to keep you watching, because more watch time can mean more profit for the company. That goal doesn't always match your goal of learning widely or spending your time well.",
      "Explain how a company's goal (more watch time) and a user's goal (variety, well-spent time) can pull in different directions, and suggest one honest design change that would serve users better even if it lowered watch time.",
    ],
  },
}

export const week4: CourseWeek = {
  id: "week-4",
  week: 4,
  title: "Text AI, Chatbots, and Recommendations",
  subtitle: "See how AI handles language and suggestions — from keyword chatbots to text prediction to the feeds that shape what you see.",
  summary:
    "Students explore the AI behind everyday text and suggestions: they build a rule-based chatbot with keywords, intents, and a fallback; look inside language models that predict the likely next piece of text and learn why fluent output is not the same as true output; and audit recommendation systems that run on similarity and feedback, honestly examining how they can create filter bubbles.",
  bigQuestion: "How does AI work with language and suggestions — and when should we question what it tells or shows us?",
  estimatedTime: "2.5-3 hours",
  objectives: [
    "Build a rule-based chatbot using keywords, intents, a decision tree, and a fallback.",
    "Explain how a language model predicts the likely next piece of text from a prompt.",
    "Explain why fluent AI output is not the same as true or correct output.",
    "Audit how recommendations use similarity and feedback, and how they form filter bubbles.",
  ],
  requiredConcepts: [
    "Keyword",
    "Intent",
    "Decision tree",
    "Fallback",
    "Language model",
    "Token or text piece",
    "Likely next text",
    "Prompt",
    "Recommendation",
    "Similarity",
    "Feedback",
    "Filter bubble",
  ],
  lessons: [lessonRuleBasedChatbot, lessonHowLanguageModelsPredict, lessonRecommendations],
}
