/**
 * Week 1 interactive-activity data and deterministic engines.
 *
 * Framework-free so the logic (classification evaluation, the rule engine) is
 * fully unit-testable and shared by the React components in
 * components/pages/intro-to-ai/activities/. There is NO randomness anywhere:
 * every result is a pure function of the student's input and this data.
 *
 * Stable ids throughout; safe to reference from progress. No personal data.
 */

/* ========================================================================== */
/* Activity 1 — AI Detective                                                  */
/* ========================================================================== */

export type DetectiveCategory = "ml" | "fixed-rule" | "non-ai" | "uncertain"

export const DETECTIVE_CATEGORIES: { id: DetectiveCategory; label: string; short: string }[] = [
  { id: "ml", label: "Machine-learning system", short: "Learns patterns from examples" },
  { id: "fixed-rule", label: "Fixed-rule automation or traditional program", short: "Follows rules a person wrote" },
  { id: "non-ai", label: "Non-AI tool", short: "A tool a person directly controls" },
  { id: "uncertain", label: "Not enough information", short: "Could be more than one — we can't tell yet" },
]

export type DetectiveSystem = {
  id: string
  name: string
  description: string
  input: string
  output: string
  /** Selectable evidence statements the student can cite for their decision. */
  evidence: { id: string; text: string }[]
  /** The most appropriate classification for the lesson. */
  bestCategory: DetectiveCategory
  /** Other classifications that are also defensible (ambiguity is honored). */
  alsoReasonable: DetectiveCategory[]
  /** Plain-language explanation shown after answering. */
  reasoning: string
  /** Whether the deciding factor is a written rule or a learned pattern. */
  ruleOrPattern: string
  /** For uncertain systems: what you'd need to know to decide. */
  infoNeeded?: string
}

export const AI_DETECTIVE_SYSTEMS: DetectiveSystem[] = [
  {
    id: "sys-calculator",
    name: "Calculator",
    description: "A basic calculator app that adds, subtracts, multiplies, and divides.",
    input: "The numbers and operation you type",
    output: "The exact answer",
    evidence: [
      { id: "e1", text: "It gives the same answer every time for the same input" },
      { id: "e2", text: "A person wrote the exact rules for arithmetic" },
      { id: "e3", text: "It never needed examples to learn from" },
    ],
    bestCategory: "fixed-rule",
    alsoReasonable: [],
    reasoning:
      "A calculator follows exact arithmetic rules a person wrote. It never learned from examples, so it is a traditional fixed-rule program, not AI.",
    ruleOrPattern: "Fixed rule: arithmetic is spelled out directly in code.",
  },
  {
    id: "sys-voice-assistant",
    name: "Voice assistant",
    description: "A smart speaker that understands spoken questions and answers them.",
    input: "Your spoken words",
    output: "Recognized text and a spoken response",
    evidence: [
      { id: "e1", text: "It handles many voices and accents it has never heard before" },
      { id: "e2", text: "It was trained on huge amounts of recorded speech" },
      { id: "e3", text: "Its speech recognition improves as it sees more examples" },
    ],
    bestCategory: "ml",
    alsoReasonable: [],
    reasoning:
      "Turning varied speech into text and understanding language is far too messy for hand-written rules. Voice assistants commonly use machine learning trained on lots of speech and text.",
    ruleOrPattern: "Learned pattern: speech and language models trained on examples.",
  },
  {
    id: "sys-sliding-door",
    name: "Automatic sliding door",
    description: "A shop door that opens when a motion sensor detects someone approaching.",
    input: "Motion detected by a sensor",
    output: "The door opens or closes",
    evidence: [
      { id: "e1", text: "It opens whenever motion is sensed — one simple rule" },
      { id: "e2", text: "It does not recognize who or what is moving" },
      { id: "e3", text: "A person set the rule 'motion → open'" },
    ],
    bestCategory: "fixed-rule",
    alsoReasonable: ["non-ai"],
    reasoning:
      "The door follows one fixed rule: if the sensor sees motion, open. It doesn't learn or recognize anything, so it is fixed-rule automation — automatic, but not AI.",
    ruleOrPattern: "Fixed rule: motion detected → open.",
  },
  {
    id: "sys-recommendation-feed",
    name: "Video recommendation feed",
    description: "A video app that lines up which clips to show you next.",
    input: "What you've watched, liked, and skipped",
    output: "A ranked list of videos to suggest",
    evidence: [
      { id: "e1", text: "It learns your taste from your past behavior" },
      { id: "e2", text: "Different people get different recommendations" },
      { id: "e3", text: "It was trained on patterns from millions of viewers" },
    ],
    bestCategory: "ml",
    alsoReasonable: [],
    reasoning:
      "There's no simple rule for 'what you'll like next.' Recommendation feeds commonly use machine learning that finds patterns in what you and others watched.",
    ruleOrPattern: "Learned pattern: predictions from viewing history.",
  },
  {
    id: "sys-motion-light",
    name: "Motion-sensor light",
    description: "An outdoor light that switches on when its sensor detects movement.",
    input: "Movement near the sensor",
    output: "The light turns on for a while",
    evidence: [
      { id: "e1", text: "One rule: movement → light on" },
      { id: "e2", text: "It doesn't tell a person from an animal" },
      { id: "e3", text: "It never learned from examples" },
    ],
    bestCategory: "fixed-rule",
    alsoReasonable: ["non-ai"],
    reasoning:
      "Like the sliding door, this is one fixed rule (movement turns the light on). It doesn't recognize anything or learn, so it's fixed-rule automation, not AI.",
    ruleOrPattern: "Fixed rule: movement → light on.",
  },
  {
    id: "sys-face-unlock",
    name: "Face-unlock system",
    description: "A phone that unlocks when it recognizes its owner's face.",
    input: "A camera image of a face",
    output: "Unlock or stay locked",
    evidence: [
      { id: "e1", text: "It recognizes a face in many lighting conditions and angles" },
      { id: "e2", text: "It learned facial patterns from example images" },
      { id: "e3", text: "It can still work when you change your hairstyle" },
    ],
    bestCategory: "ml",
    alsoReasonable: [],
    reasoning:
      "Recognizing a specific face across angles and lighting needs learned patterns. Face unlock commonly uses machine-learning image recognition.",
    ruleOrPattern: "Learned pattern: image recognition trained on face examples.",
  },
  {
    id: "sys-microwave-timer",
    name: "Microwave timer",
    description: "A microwave that runs for the exact time you set, then stops.",
    input: "The time you enter",
    output: "The microwave runs, then turns off",
    evidence: [
      { id: "e1", text: "It runs for exactly the time you set, every time" },
      { id: "e2", text: "No examples were needed" },
      { id: "e3", text: "A person wrote the countdown rule" },
    ],
    bestCategory: "fixed-rule",
    alsoReasonable: [],
    reasoning:
      "A timer counts down exactly as programmed. It's a traditional fixed-rule program with no learning at all.",
    ruleOrPattern: "Fixed rule: run for the set time, then stop.",
  },
  {
    id: "sys-spam-filter",
    name: "Email spam filter",
    description: "A filter that sorts incoming email into 'spam' and 'not spam.'",
    input: "An email message",
    output: "A label: spam or not spam",
    evidence: [
      { id: "e1", text: "It catches new spam it has never seen exactly before" },
      { id: "e2", text: "It learned from millions of emails people marked" },
      { id: "e3", text: "Some simple filters also use fixed blocklists" },
    ],
    bestCategory: "ml",
    alsoReasonable: ["uncertain"],
    reasoning:
      "Most modern spam filters use machine learning trained on labeled email, so 'machine-learning system' fits best. But implementations vary — some also use simple fixed blocklist rules — so 'not enough information' can be reasonable if you don't know the details.",
    ruleOrPattern: "Usually a learned pattern, sometimes mixed with fixed rules.",
    infoNeeded: "Whether this particular filter learns from examples or only uses fixed blocklists.",
  },
  {
    id: "sys-rc-car",
    name: "Remote-controlled toy car",
    description: "A toy car a child drives with a handheld remote.",
    input: "Button presses on the remote",
    output: "The car moves as directed",
    evidence: [
      { id: "e1", text: "A person makes every decision about where it goes" },
      { id: "e2", text: "It has no sensing or decision-making of its own" },
      { id: "e3", text: "It never acts on its own" },
    ],
    bestCategory: "non-ai",
    alsoReasonable: [],
    reasoning:
      "The car does exactly what the person commands and makes no decisions itself. It's a non-AI tool controlled by a human — not automation and not AI.",
    ruleOrPattern: "Neither: a person is in direct control.",
  },
  {
    id: "sys-weather",
    name: "Weather-prediction system",
    description: "A service that forecasts tomorrow's weather.",
    input: "Measurements like temperature, pressure, and wind",
    output: "A forecast (for example, chance of rain)",
    evidence: [
      { id: "e1", text: "Some forecasts use physics equations (numerical rules)" },
      { id: "e2", text: "Some forecasts use machine learning on past weather" },
      { id: "e3", text: "Many modern systems combine both" },
    ],
    bestCategory: "uncertain",
    alsoReasonable: ["ml", "fixed-rule"],
    reasoning:
      "Weather systems can use physics-based equations, machine learning, or both. Without knowing which, the honest answer is 'not enough information.' If it learns from past weather it's machine learning; if it only solves fixed equations it's a rule-based program.",
    ruleOrPattern: "Depends: could be numerical rules, learned patterns, or a mix.",
    infoNeeded: "Whether this system solves fixed physics equations, learns from past weather data, or both.",
  },
  {
    id: "sys-spell-checker",
    name: "Spell checker",
    description: "A tool that flags misspelled words as you type.",
    input: "The words you type",
    output: "Flags and suggested corrections",
    evidence: [
      { id: "e1", text: "Some checkers just compare words to a dictionary list" },
      { id: "e2", text: "Some use statistics or language models to guess intent" },
      { id: "e3", text: "You can't tell which just by using it" },
    ],
    bestCategory: "uncertain",
    alsoReasonable: ["fixed-rule", "ml"],
    reasoning:
      "Spell checkers vary a lot. A simple one compares words to a fixed dictionary (rule-based). A smarter one uses statistics or a language model (machine learning). Without knowing which, 'not enough information' is the most honest answer.",
    ruleOrPattern: "Mixed: dictionary rules, statistics, or language models.",
    infoNeeded: "Whether this checker uses a fixed dictionary, a statistical model, or a language model.",
  },
  {
    id: "sys-preprogrammed-robot",
    name: "Robot toy following a set path",
    description: "A toy robot that always drives the same preprogrammed path.",
    input: "Its built-in program (the same path each time)",
    output: "The robot drives the fixed path",
    evidence: [
      { id: "e1", text: "It repeats the exact same path every time" },
      { id: "e2", text: "It doesn't sense or adapt to its surroundings" },
      { id: "e3", text: "A person programmed the path in advance" },
    ],
    bestCategory: "fixed-rule",
    alsoReasonable: [],
    reasoning:
      "A robot body doesn't make it intelligent. This one just repeats a fixed, preprogrammed path with no sensing or learning, so it's fixed-rule automation.",
    ruleOrPattern: "Fixed rule: follow the preprogrammed path.",
  },
]

export type DetectiveVerdict = "best" | "reasonable" | "reconsider"

/** Pure, deterministic evaluation of a student's classification. Never "wrong"
 *  for a defensible answer: ambiguous systems accept several categories. */
export function evaluateDetective(system: DetectiveSystem, chosen: DetectiveCategory): DetectiveVerdict {
  if (chosen === system.bestCategory) return "best"
  if (system.alsoReasonable.includes(chosen)) return "reasonable"
  return "reconsider"
}

export function getDetectiveSystem(id: string): DetectiveSystem | undefined {
  return AI_DETECTIVE_SYSTEMS.find((s) => s.id === id)
}

/* ========================================================================== */
/* Activity 2 — Human Rule Builder                                            */
/* ========================================================================== */

export type CreatureFeatures = {
  hasWings: boolean
  legs: number
  bodyColor: string
  hasAntennae: boolean
  bodyShape: string
  livesInWater: boolean
  canGlow: boolean
}

export type Creature = {
  id: string
  name: string
  /** Accessible text description (used as the image alt and for screen readers). */
  description: string
  features: CreatureFeatures
  /** The category the lesson treats as correct, for comparison after running rules. */
  canonicalCategory: string
}

export const CREATURE_CATEGORIES = ["Sky Creature", "Water Creature", "Land Creature"] as const
export type CreatureCategory = (typeof CREATURE_CATEGORIES)[number]

/** Feature fields available to build rules on, with their value type. */
export const RULE_FIELDS = [
  { id: "hasWings", label: "Has wings", type: "boolean" },
  { id: "livesInWater", label: "Lives in water", type: "boolean" },
  { id: "hasAntennae", label: "Has antennae", type: "boolean" },
  { id: "canGlow", label: "Can glow", type: "boolean" },
  { id: "legs", label: "Number of legs", type: "number" },
  { id: "bodyColor", label: "Body color", type: "string" },
  { id: "bodyShape", label: "Body shape", type: "string" },
] as const

export type RuleField = (typeof RULE_FIELDS)[number]["id"]
export type RuleOp = "is" | "isNot" | "equals" | "atLeast" | "atMost"

export type Rule = {
  id: string
  field: RuleField
  op: RuleOp
  value: string | number | boolean
  category: string
}

export const BODY_COLORS = ["yellow", "blue", "green", "brown", "gray"]
export const BODY_SHAPES = ["round", "long", "finned", "spiky"]

/** The six starter creatures. A simple rule set (wings → Sky, water → Water,
 *  else Land) classifies all of these correctly. */
export const STARTER_CREATURES: Creature[] = [
  {
    id: "cr-flitterbug",
    name: "Flitterbug",
    description: "A small round yellow creature with two wings, six legs, and antennae. It lives on land and does not glow.",
    features: { hasWings: true, legs: 6, bodyColor: "yellow", hasAntennae: true, bodyShape: "round", livesInWater: false, canGlow: false },
    canonicalCategory: "Sky Creature",
  },
  {
    id: "cr-gleamfish",
    name: "Gleamfish",
    description: "A long blue creature with no wings and no legs. It lives in water and can glow.",
    features: { hasWings: false, legs: 0, bodyColor: "blue", hasAntennae: false, bodyShape: "long", livesInWater: true, canGlow: true },
    canonicalCategory: "Water Creature",
  },
  {
    id: "cr-trundle",
    name: "Trundle",
    description: "A round brown creature with four legs and no wings. It lives on land and does not glow.",
    features: { hasWings: false, legs: 4, bodyColor: "brown", hasAntennae: false, bodyShape: "round", livesInWater: false, canGlow: false },
    canonicalCategory: "Land Creature",
  },
  {
    id: "cr-sparkmoth",
    name: "Sparkmoth",
    description: "A gray creature with two wings, six legs, and antennae. It lives on land and can glow.",
    features: { hasWings: true, legs: 6, bodyColor: "gray", hasAntennae: true, bodyShape: "round", livesInWater: false, canGlow: true },
    canonicalCategory: "Sky Creature",
  },
  {
    id: "cr-puddler",
    name: "Puddler",
    description: "A green creature with four legs and no wings. It lives in water and does not glow.",
    features: { hasWings: false, legs: 4, bodyColor: "green", hasAntennae: false, bodyShape: "round", livesInWater: true, canGlow: false },
    canonicalCategory: "Water Creature",
  },
  {
    id: "cr-rockback",
    name: "Rockback",
    description: "A round gray creature with six legs and no wings. It lives on land and does not glow.",
    features: { hasWings: false, legs: 6, bodyColor: "gray", hasAntennae: false, bodyShape: "spiky", livesInWater: false, canGlow: false },
    canonicalCategory: "Land Creature",
  },
]

/** Withheld creatures designed to expose weaknesses in simple rules. */
export const WITHHELD_CREATURES: Creature[] = [
  {
    id: "cr-divewing",
    name: "Divewing",
    description: "A blue creature with two wings that lives underwater. It has no legs and does not glow. Even though it has wings, it is a water animal.",
    features: { hasWings: true, legs: 0, bodyColor: "blue", hasAntennae: false, bodyShape: "long", livesInWater: true, canGlow: false },
    canonicalCategory: "Water Creature",
  },
  {
    id: "cr-finray",
    name: "Finray",
    description: "A brown land creature with four legs and decorative fins on its back. It has no wings and lives on land.",
    features: { hasWings: false, legs: 4, bodyColor: "brown", hasAntennae: false, bodyShape: "finned", livesInWater: false, canGlow: false },
    canonicalCategory: "Land Creature",
  },
  {
    id: "cr-tornwing",
    name: "Tornwing",
    description: "A gray creature whose wings are torn and cannot fly, so it has no working wings. It walks on two legs and lives on land.",
    features: { hasWings: false, legs: 2, bodyColor: "gray", hasAntennae: true, bodyShape: "long", livesInWater: false, canGlow: false },
    canonicalCategory: "Land Creature",
  },
  {
    id: "cr-voidling",
    name: "Voidling",
    description: "A small green creature with no wings, no legs, and no antennae. It lives on land and does not glow — an unusual combination.",
    features: { hasWings: false, legs: 0, bodyColor: "green", hasAntennae: false, bodyShape: "round", livesInWater: false, canGlow: false },
    canonicalCategory: "Land Creature",
  },
]

/** Evaluates one rule against a creature. Deterministic. */
export function evalRule(rule: Rule, creature: Creature): boolean {
  const value = creature.features[rule.field]
  switch (rule.op) {
    case "is":
      return value === true
    case "isNot":
      return value === false
    case "equals":
      return String(value) === String(rule.value)
    case "atLeast":
      return typeof value === "number" && value >= Number(rule.value)
    case "atMost":
      return typeof value === "number" && value <= Number(rule.value)
    default:
      return false
  }
}

export type ClassifyResult = {
  category: string | null
  matchedRuleId: string | null
}

/**
 * Applies rules in order; the FIRST matching rule decides the category. Returns
 * `{ category: null }` when no rule matches (an honest "unclassified"). Purely
 * deterministic — no randomness.
 */
export function classify(rules: Rule[], creature: Creature): ClassifyResult {
  for (const rule of rules) {
    if (evalRule(rule, creature)) return { category: rule.category, matchedRuleId: rule.id }
  }
  return { category: null, matchedRuleId: null }
}

export type RuleSetValidation = { valid: boolean; issues: string[] }

/** Rejects invalid/incomplete rule sets before they run. */
export function validateRuleSet(rules: Rule[]): RuleSetValidation {
  const issues: string[] = []
  if (rules.length === 0) issues.push("Add at least one rule.")
  rules.forEach((rule, i) => {
    const n = i + 1
    if (!rule.field) issues.push(`Rule ${n}: choose a feature.`)
    if (!rule.op) issues.push(`Rule ${n}: choose a condition.`)
    if (!rule.category) issues.push(`Rule ${n}: choose a category to assign.`)
    if ((rule.op === "equals" || rule.op === "atLeast" || rule.op === "atMost") && (rule.value === "" || rule.value === null || rule.value === undefined)) {
      issues.push(`Rule ${n}: enter a value.`)
    }
  })
  return { valid: issues.length === 0, issues }
}

export function fieldType(field: RuleField): "boolean" | "number" | "string" {
  return RULE_FIELDS.find((f) => f.id === field)?.type ?? "string"
}

const FIELD_LABEL: Record<RuleField, string> = {
  hasWings: "it has wings",
  livesInWater: "it lives in water",
  hasAntennae: "it has antennae",
  canGlow: "it can glow",
  legs: "the number of legs",
  bodyColor: "the body color",
  bodyShape: "the body shape",
}

/** Human-readable, deterministic description of a rule for the preview. */
export function describeRule(rule: Rule): string {
  const subject = FIELD_LABEL[rule.field]
  const type = fieldType(rule.field)
  let condition: string
  if (type === "boolean") {
    condition = rule.op === "isNot" ? `NOT (${subject})` : subject
  } else if (rule.op === "atLeast") {
    condition = `${subject} is at least ${rule.value}`
  } else if (rule.op === "atMost") {
    condition = `${subject} is at most ${rule.value}`
  } else {
    condition = `${subject} is ${rule.value}`
  }
  return `If ${condition} → ${rule.category || "?"}`
}

/** Runs a validated rule set over a list of creatures; reports match vs. canonical. */
export type CreatureRun = {
  creatureId: string
  predictedCategory: string | null
  matchedRuleId: string | null
  canonicalCategory: string
  agrees: boolean
}

export function runRulesOver(rules: Rule[], creatures: Creature[]): CreatureRun[] {
  return creatures.map((c) => {
    const { category, matchedRuleId } = classify(rules, c)
    return {
      creatureId: c.id,
      predictedCategory: category,
      matchedRuleId,
      canonicalCategory: c.canonicalCategory,
      agrees: category === c.canonicalCategory,
    }
  })
}

/* ========================================================================== */
/* Weekly challenge — Device Investigation example library                    */
/* ========================================================================== */

export type DeviceExample = {
  id: string
  name: string
  input: string
  output: string
  possibleFixedRules: string
  possibleLearnedPatterns: string
  suggestedCategory: DetectiveCategory
  evidence: string
  infoNeeded: string
}

/** Built-in examples so students never have to describe a personal device. */
export const DEVICE_EXAMPLES: DeviceExample[] = [
  {
    id: "dev-thermostat",
    name: "Thermostat",
    input: "Room temperature",
    output: "Turns heating or cooling on/off",
    possibleFixedRules: "If below the set temperature, turn on heat",
    possibleLearnedPatterns: "A 'smart' thermostat might learn your daily schedule",
    suggestedCategory: "fixed-rule",
    evidence: "A basic thermostat follows one temperature rule and doesn't learn.",
    infoNeeded: "Whether it learns your schedule (smart) or just follows a set point.",
  },
  {
    id: "dev-photo-search",
    name: "Photo search ('find dogs')",
    input: "Your photos and a search word",
    output: "Photos that match the word",
    possibleFixedRules: "None obvious — 'what is a dog' is hard to write as a rule",
    possibleLearnedPatterns: "Learned what dogs look like from many labeled images",
    suggestedCategory: "ml",
    evidence: "Recognizing objects in any photo needs learned patterns.",
    infoNeeded: "Little — image search is a classic machine-learning task.",
  },
  {
    id: "dev-elevator",
    name: "Elevator",
    input: "Button presses",
    output: "Moves to the chosen floor and opens",
    possibleFixedRules: "Go to requested floors in an efficient order",
    possibleLearnedPatterns: "Usually none — most elevators just follow rules",
    suggestedCategory: "fixed-rule",
    evidence: "Elevators follow scheduling rules, not learned patterns.",
    infoNeeded: "Whether it uses any prediction of busy times (rare).",
  },
  {
    id: "dev-translator",
    name: "Language translator app",
    input: "Text in one language",
    output: "Text in another language",
    possibleFixedRules: "Old translators used word-by-word dictionary rules",
    possibleLearnedPatterns: "Modern ones learned from millions of translated sentences",
    suggestedCategory: "ml",
    evidence: "Modern translation apps commonly use machine learning.",
    infoNeeded: "Whether it's an old rule-based translator or a modern learned one.",
  },
  {
    id: "dev-vending",
    name: "Vending machine",
    input: "Money and a selection",
    output: "Dispenses the chosen item",
    possibleFixedRules: "If enough money and item in stock, dispense it",
    possibleLearnedPatterns: "None in a basic machine",
    suggestedCategory: "fixed-rule",
    evidence: "A vending machine follows fixed rules with no learning.",
    infoNeeded: "Whether a fancy model predicts restocking (uncommon).",
  },
]

export const DEVICE_FIELDS: { id: keyof Omit<DeviceExample, "id" | "suggestedCategory">; label: string; hint: string }[] = [
  { id: "name", label: "Device or system name", hint: "A device, not your name. e.g. 'thermostat'." },
  { id: "input", label: "Input", hint: "What information goes in?" },
  { id: "output", label: "Output", hint: "What does it produce or do?" },
  { id: "possibleFixedRules", label: "Possible fixed rules", hint: "Rules a person might have written." },
  { id: "possibleLearnedPatterns", label: "Possible learned patterns", hint: "Anything it might have learned from examples." },
  { id: "evidence", label: "Evidence for your classification", hint: "Why do you think so?" },
  { id: "infoNeeded", label: "Information still needed", hint: "What would help you be more sure?" },
]
