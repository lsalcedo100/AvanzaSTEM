/**
 * Final Project Studio — data model, validation, and migration (framework-free).
 *
 * A guided, persistent project notebook where students design, prototype, test,
 * and present a responsible AI helper OR conclude that AI should not be used. The
 * studio state is a single versioned object serialized to the SAME localStorage
 * used by every other activity (via the progress hook's `activities` record, under
 * the reserved key below) — no second storage system is introduced. Everything
 * here is pure and deterministic so it is fully unit-testable; the React studio
 * component holds only UI concerns (debounced save, dialogs, focus).
 *
 * Privacy: no real names, schools, or contact details are required; project text
 * stays on the device and is never sent to any external service.
 */

export const STUDIO_ACTIVITY_ID = "final-project-studio"
export const STUDIO_VERSION = 1 as const

/* ========================================================================== */
/* Project types                                                              */
/* ========================================================================== */

export type ProjectType = "blueprint" | "chatbot" | "classifier" | "recommender" | "ethics"

export type PlanField = { id: string; label: string; hint: string }

export type ProjectTypeDef = {
  id: ProjectType
  name: string
  summary: string
  /** Type-adaptive fields for Section 4 (data / rules plan). */
  planFields: PlanField[]
  /** The earlier activity a prototype can be imported from, if any. */
  importSourceId?: string
  importLabel?: string
  /** When true, this type is a policy/ethics proposal (AI may not be built). */
  policyOnly?: boolean
}

export const PROJECT_TYPES: ProjectTypeDef[] = [
  {
    id: "blueprint",
    name: "No-Code AI System Blueprint",
    summary: "Plan an AI system on paper — no live model built.",
    planFields: [
      { id: "dataNeeded", label: "Data the system would need", hint: "What examples or information would it use?" },
      { id: "rulesOrPatterns", label: "Rules or patterns", hint: "Would it follow clear rules, or learn patterns from data?" },
      { id: "systemSteps", label: "How it works, step by step", hint: "Input → processing → output." },
      { id: "successMeasure", label: "How you'd measure success", hint: "What would 'working well' look like?" },
    ],
  },
  {
    id: "chatbot",
    name: "Rule-Based Help Chatbot",
    summary: "Build a limited-purpose chatbot using the Week 4 tools.",
    importSourceId: "w4l1-act",
    importLabel: "Week 4 chatbot",
    planFields: [
      { id: "intents", label: "Intents", hint: "The main things users will ask about." },
      { id: "keywords", label: "Keywords or choices", hint: "The words that trigger each intent." },
      { id: "branches", label: "Follow-up branches", hint: "Any question the bot asks back." },
      { id: "fallback", label: "Fallback", hint: "What it says when it doesn't understand." },
      { id: "humanHelp", label: "Human-help route", hint: "How a user reaches a person." },
    ],
  },
  {
    id: "classifier",
    name: "Image-Classification Investigation",
    summary: "Train, test, and improve a classifier using the Week 3 lab.",
    importSourceId: "w3l2-act",
    importLabel: "Week 3 classifier",
    planFields: [
      { id: "categories", label: "Categories", hint: "The labels the model chooses between." },
      { id: "features", label: "Features", hint: "What the model looks at in each image." },
      { id: "trainingExamples", label: "Training examples", hint: "What it learns from." },
      { id: "testingExamples", label: "Testing examples", hint: "Held-back examples to check it." },
      { id: "labelPlan", label: "Label plan", hint: "How examples get their correct labels." },
    ],
  },
  {
    id: "recommender",
    name: "Recommendation System",
    summary: "Build and explain recommendations using the Week 4 system.",
    importSourceId: "w4l3-act",
    importLabel: "Week 4 recommender",
    planFields: [
      { id: "itemFeatures", label: "Item features", hint: "What describes each item." },
      { id: "userPreferences", label: "User preferences", hint: "What the system learns from choices." },
      { id: "scoringLogic", label: "Scoring logic", hint: "How items are scored." },
      { id: "explanationLogic", label: "Explanation logic", hint: "How it explains each recommendation." },
      { id: "lowData", label: "Low-data behavior", hint: "What it does with too little information." },
    ],
  },
  {
    id: "ethics",
    name: "“Should We Use AI?” Ethics & Policy Proposal",
    summary: "Evaluate a proposed AI system and recommend approval, limits, safeguards, or rejection.",
    policyOnly: true,
    planFields: [
      { id: "evidence", label: "Evidence", hint: "What shows the problem is real." },
      { id: "affectedUsers", label: "Affected users", hint: "Who is helped or harmed." },
      { id: "risks", label: "Risks", hint: "What could go wrong." },
      { id: "safeguards", label: "Safeguards", hint: "Protections you'd require." },
      { id: "approvalCriteria", label: "Approval criteria", hint: "What would have to be true to approve it." },
    ],
  },
]

export function getProjectType(id: string | null): ProjectTypeDef | undefined {
  return PROJECT_TYPES.find((t) => t.id === id)
}

/* ========================================================================== */
/* Test cases                                                                  */
/* ========================================================================== */

export type TestKind = "normal" | "difficult" | "missing-input" | "unexpected-input" | "edge" | "harmful"

export const TEST_KINDS: { id: TestKind; label: string; hint: string }[] = [
  { id: "normal", label: "Normal case", hint: "A typical, expected input." },
  { id: "difficult", label: "Difficult case", hint: "Harder but valid." },
  { id: "missing-input", label: "Missing-input case", hint: "A required piece is missing." },
  { id: "unexpected-input", label: "Unexpected-input case", hint: "Something the system wasn't built for." },
  { id: "edge", label: "Edge case", hint: "Right at the boundary." },
  { id: "harmful", label: "Potentially harmful mistake", hint: "A wrong answer that could cause harm." },
]

export type TestCase = {
  id: string
  kind: TestKind
  input: string
  expected: string
  actual: string
  pass: "pass" | "fail" | ""
  explanation: string
  improvement: string
}

/* ========================================================================== */
/* Project shape                                                               */
/* ========================================================================== */

export type UseAi = "yes" | "no" | ""

export type StudioProject = {
  version: number
  type: ProjectType | null
  define: { title: string; who: string; whyMatters: string; currentHandling: string; evidence: string }
  appropriateness: {
    optionAi: string
    optionRules: string
    optionChecklist: string
    optionHuman: string
    optionCombination: string
    patterns: string
    rulesCould: string
    ifWrong: string
    highStakes: string
    necessary: string
    useAi: UseAi
    conclusion: string
  }
  io: { inputs: string; outputs: string; userAction: string; systemResponse: string; missingUnclear: string }
  plan: Record<string, string>
  prototype: { importSource: string; importSnapshot: string; flow: string; notes: string }
  tests: TestCase[]
  limitations: { falsePos: string; falseNeg: string; cannotHandle: string; refuse: string; humanReview: string; classroomLimits: string }
  privacy: { necessary: string; optional: string; doNotCollect: string; processing: string; retention: string; deleteCorrect: string }
  fairness: { represented: string; missing: string; proxies: string; groupTesting: string; investigate: string }
  oversight: { reviewer: string; when: string; finalDecision: string; explanation: string; correction: string; override: string }
  wrapUp: { nextImprovement: string }
  updatedAt: string | null
}

export function emptyProject(): StudioProject {
  return {
    version: STUDIO_VERSION,
    type: null,
    define: { title: "", who: "", whyMatters: "", currentHandling: "", evidence: "" },
    appropriateness: {
      optionAi: "", optionRules: "", optionChecklist: "", optionHuman: "", optionCombination: "",
      patterns: "", rulesCould: "", ifWrong: "", highStakes: "", necessary: "", useAi: "", conclusion: "",
    },
    io: { inputs: "", outputs: "", userAction: "", systemResponse: "", missingUnclear: "" },
    plan: {},
    prototype: { importSource: "", importSnapshot: "", flow: "", notes: "" },
    tests: [],
    limitations: { falsePos: "", falseNeg: "", cannotHandle: "", refuse: "", humanReview: "", classroomLimits: "" },
    privacy: { necessary: "", optional: "", doNotCollect: "", processing: "", retention: "", deleteCorrect: "" },
    fairness: { represented: "", missing: "", proxies: "", groupTesting: "", investigate: "" },
    oversight: { reviewer: "", when: "", finalDecision: "", explanation: "", correction: "", override: "" },
    wrapUp: { nextImprovement: "" },
    updatedAt: null,
  }
}

/* ========================================================================== */
/* Migration / safe loading                                                    */
/* ========================================================================== */

function str(v: unknown): string {
  return typeof v === "string" ? v : ""
}
function coerceRecord(v: unknown, base: Record<string, string>): Record<string, string> {
  const out = { ...base }
  if (v && typeof v === "object") for (const k of Object.keys(base)) out[k] = str((v as Record<string, unknown>)[k])
  return out
}
function coercePlan(v: unknown): Record<string, string> {
  const out: Record<string, string> = {}
  if (v && typeof v === "object") for (const [k, val] of Object.entries(v as Record<string, unknown>)) if (typeof val === "string") out[k] = val
  return out
}
function coerceTests(v: unknown): TestCase[] {
  if (!Array.isArray(v)) return []
  const kinds = new Set(TEST_KINDS.map((k) => k.id))
  return v
    .filter((t): t is Record<string, unknown> => !!t && typeof t === "object")
    .map((t, i) => ({
      id: str(t.id) || `tc-${i}`,
      kind: kinds.has(t.kind as TestKind) ? (t.kind as TestKind) : "normal",
      input: str(t.input),
      expected: str(t.expected),
      actual: str(t.actual),
      pass: t.pass === "pass" || t.pass === "fail" ? (t.pass as "pass" | "fail") : "",
      explanation: str(t.explanation),
      improvement: str(t.improvement),
    }))
}

/**
 * Version-routed, defensive loader. Coerces every field with defaults so a
 * malformed or partial saved project recovers as much as possible instead of being
 * wiped. Unknown/newer versions are coerced, not discarded.
 */
export function migrateStudio(data: unknown): StudioProject {
  const base = emptyProject()
  if (!data || typeof data !== "object") return base
  const d = data as Record<string, unknown>
  const type = PROJECT_TYPES.some((t) => t.id === d.type) ? (d.type as ProjectType) : null
  const useAiRaw = (d.appropriateness as Record<string, unknown> | undefined)?.useAi
  return {
    version: STUDIO_VERSION,
    type,
    define: coerceRecord(d.define, base.define) as StudioProject["define"],
    appropriateness: {
      ...(coerceRecord(d.appropriateness, base.appropriateness) as StudioProject["appropriateness"]),
      useAi: useAiRaw === "yes" || useAiRaw === "no" ? (useAiRaw as UseAi) : "",
    },
    io: coerceRecord(d.io, base.io) as StudioProject["io"],
    plan: coercePlan(d.plan),
    prototype: coerceRecord(d.prototype, base.prototype) as StudioProject["prototype"],
    tests: coerceTests(d.tests),
    limitations: coerceRecord(d.limitations, base.limitations) as StudioProject["limitations"],
    privacy: coerceRecord(d.privacy, base.privacy) as StudioProject["privacy"],
    fairness: coerceRecord(d.fairness, base.fairness) as StudioProject["fairness"],
    oversight: coerceRecord(d.oversight, base.oversight) as StudioProject["oversight"],
    wrapUp: coerceRecord(d.wrapUp, base.wrapUp) as StudioProject["wrapUp"],
    updatedAt: typeof d.updatedAt === "string" ? d.updatedAt : null,
  }
}

export function parseStudio(raw: string | undefined): StudioProject {
  if (!raw) return emptyProject()
  try {
    return migrateStudio(JSON.parse(raw))
  } catch {
    return emptyProject()
  }
}

/* ========================================================================== */
/* Changing project type — what would be lost                                  */
/* ========================================================================== */

/** Sections whose content is tied to the project type (lost on a type change). */
export function typeSpecificFilled(p: StudioProject): boolean {
  const planFilled = Object.values(p.plan).some((v) => v.trim().length > 0)
  const protoFilled = [p.prototype.flow, p.prototype.notes, p.prototype.importSnapshot].some((v) => v.trim().length > 0)
  return planFilled || protoFilled
}

/** Returns a project with the type changed and type-specific sections cleared. */
export function changeType(p: StudioProject, next: ProjectType): StudioProject {
  return { ...p, type: next, plan: {}, prototype: { importSource: "", importSnapshot: "", flow: "", notes: "" } }
}

/* ========================================================================== */
/* Validation / completion                                                     */
/* ========================================================================== */

export type Requirement = { id: string; section: string; label: string; met: boolean; required: boolean }

const filled = (s: string) => s.trim().length > 0

/**
 * Builds the requirement checklist. Safety sections (limitations, privacy,
 * fairness, oversight/appeal, tests) are REQUIRED — a project is never "complete"
 * while they are blank. When the student concludes AI should NOT be used, the
 * build-specific requirements (plan, prototype, fairness group-testing) relax,
 * because there is nothing to build — but the policy reasoning stays required.
 */
export function validateProject(p: StudioProject): Requirement[] {
  const type = getProjectType(p.type)
  const notUsingAi = p.appropriateness.useAi === "no"
  const req: Requirement[] = []
  const add = (id: string, section: string, label: string, met: boolean, required = true) => req.push({ id, section, label, met, required })

  add("type", "Setup", "Choose a project type", !!p.type)

  // Section 1 — define
  add("d-title", "Define the problem", "Problem title", filled(p.define.title))
  add("d-who", "Define the problem", "Who experiences it", filled(p.define.who))
  add("d-why", "Define the problem", "Why it matters", filled(p.define.whyMatters))
  add("d-evidence", "Define the problem", "Evidence the problem is real", filled(p.define.evidence))

  // Section 2 — appropriateness
  add("a-usai", "Is AI appropriate?", "Decide whether to use AI", p.appropriateness.useAi !== "")
  add("a-conc", "Is AI appropriate?", "Explain your conclusion", filled(p.appropriateness.conclusion))
  add("a-ifwrong", "Is AI appropriate?", "What happens if it's wrong", filled(p.appropriateness.ifWrong))

  // Section 3 — inputs/outputs
  add("io-in", "Inputs & outputs", "Inputs", filled(p.io.inputs))
  add("io-out", "Inputs & outputs", "Outputs", filled(p.io.outputs))
  add("io-missing", "Inputs & outputs", "What happens with missing/unclear input", filled(p.io.missingUnclear))

  // Section 4 — plan (relaxed when not using AI, or for policy-only types the plan is the proposal)
  if (type) {
    const planRequired = !notUsingAi || !!type.policyOnly
    const planMet = type.planFields.every((f) => filled(p.plan[f.id] ?? ""))
    add("plan", "Data / rules plan", `Fill the ${type.name} plan`, planMet, planRequired)
  }

  // Section 5 — prototype (relaxed when not using AI)
  add("proto", "Prototype", "Describe or import a prototype", filled(p.prototype.flow) || filled(p.prototype.notes) || filled(p.prototype.importSnapshot), !notUsingAi)

  // Section 6 — tests (>= 6 cases covering all six kinds, each with an input and a pass/fail)
  const kindsCovered = new Set(p.tests.filter((t) => filled(t.input)).map((t) => t.kind))
  const completeTests = p.tests.filter((t) => filled(t.input) && t.pass !== "").length
  add("tests-count", "Test cases", "At least 6 completed test cases", completeTests >= 6)
  add("tests-kinds", "Test cases", "Cover all six case kinds", TEST_KINDS.every((k) => kindsCovered.has(k.id)))

  // Section 7 — limitations (safety)
  add("lim-cannot", "Mistakes & limitations", "Situations it can't handle", filled(p.limitations.cannotHandle))
  add("lim-refuse", "Mistakes & limitations", "When it should refuse to decide", filled(p.limitations.refuse))
  add("lim-review", "Mistakes & limitations", "Cases needing human review", filled(p.limitations.humanReview))

  // Section 8 — privacy (safety)
  add("pr-necessary", "Privacy review", "Necessary data", filled(p.privacy.necessary))
  add("pr-donot", "Privacy review", "Data that should not be collected", filled(p.privacy.doNotCollect))
  add("pr-processing", "Privacy review", "Where processing happens", filled(p.privacy.processing))
  add("pr-retention", "Privacy review", "How long data is kept", filled(p.privacy.retention))
  add("pr-delete", "Privacy review", "How a user deletes or corrects data", filled(p.privacy.deleteCorrect))

  // Section 9 — fairness (safety; group-testing relaxed when not using AI)
  add("fa-rep", "Fairness review", "Who is represented", filled(p.fairness.represented))
  add("fa-missing", "Fairness review", "Who might be missing", filled(p.fairness.missing))
  add("fa-invest", "Fairness review", "How you'd investigate unequal results", filled(p.fairness.investigate))
  add("fa-group", "Fairness review", "Group-level testing plan", filled(p.fairness.groupTesting), !notUsingAi)

  // Section 10 — oversight & appeal (safety)
  add("ov-reviewer", "Human oversight & appeal", "Who reviews results", filled(p.oversight.reviewer))
  add("ov-final", "Human oversight & appeal", "Who makes the final decision", filled(p.oversight.finalDecision))
  add("ov-explain", "Human oversight & appeal", "How a user asks for an explanation", filled(p.oversight.explanation))
  add("ov-correct", "Human oversight & appeal", "How a result is corrected", filled(p.oversight.correction))
  add("ov-override", "Human oversight & appeal", "How an AI result can be overridden", filled(p.oversight.override))

  // Section 11 — wrap-up
  add("wrap-next", "Presentation", "Your next improvement", filled(p.wrapUp.nextImprovement))

  return req
}

export function projectComplete(p: StudioProject): boolean {
  return validateProject(p).every((r) => !r.required || r.met)
}

export function completionSummary(p: StudioProject): { met: number; total: number; remaining: Requirement[] } {
  const reqs = validateProject(p).filter((r) => r.required)
  const remaining = reqs.filter((r) => !r.met)
  return { met: reqs.length - remaining.length, total: reqs.length, remaining }
}

/* ========================================================================== */
/* Safe import of earlier activity work                                         */
/* ========================================================================== */

export type ImportResult = { ok: boolean; summary: string }

/**
 * Reads a saved earlier-activity blob and produces a short, safe human-readable
 * snapshot (never a brittle deep copy of state). Best-effort: malformed data
 * returns `ok: false` rather than throwing.
 */
export function summarizeImport(sourceId: string, raw: string | undefined): ImportResult {
  if (!raw) return { ok: false, summary: "No saved work found for that activity yet." }
  try {
    const data = JSON.parse(raw) as Record<string, unknown>
    if (sourceId === "w4l1-act") {
      const intents = Array.isArray(data.intents) ? (data.intents as { name?: string }[]) : []
      const names = intents.map((i) => i.name).filter(Boolean).slice(0, 6).join(", ")
      return { ok: intents.length > 0, summary: intents.length ? `Chatbot “${str(data.name) || "Untitled"}” with ${intents.length} intents: ${names}. Fallback set: ${str(data.fallback) ? "yes" : "no"}.` : "The chatbot has no intents yet." }
    }
    if (sourceId === "w3l2-act") {
      const training = (data.training as Record<string, unknown>) ?? {}
      const topic = str(data.topic)
      const counts = Object.values(training).map((v) => (Array.isArray(v) ? v.length : 0)).reduce((a, b) => a + b, 0)
      return { ok: !!topic, summary: topic ? `Classifier on topic “${topic}” with ${counts} selected training pictures.` : "No topic selected yet in the classifier lab." }
    }
    if (sourceId === "w4l3-act") {
      const ratings = (data.ratings as Record<string, unknown>) ?? {}
      const n = Object.keys(ratings).length
      return { ok: n > 0, summary: n ? `Recommender profile from ${n} rated item(s).` : "No items rated in the recommender yet." }
    }
    return { ok: false, summary: "That activity can't be imported here." }
  } catch {
    return { ok: false, summary: "That saved work couldn't be read (it may be from a different version)." }
  }
}
