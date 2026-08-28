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

import { translations, type Translations } from "../../../i18n/translations.ts"

/**
 * The final-project wording. Every id - project type, plan field, test kind,
 * requirement - stays English because the saved studio project keys on them.
 */
export type FinalProjectStrings = Translations["courseUi"]["ai"]["finalProject"]

const EN: FinalProjectStrings = translations.en.courseUi.ai.finalProject

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

/** The machine-readable half of each type; the prose comes from the strings. */
const TYPE_DATA: {
  id: ProjectType
  planFieldIds: string[]
  importSourceId?: string
  policyOnly?: boolean
}[] = [
  { id: "blueprint", planFieldIds: ["dataNeeded", "rulesOrPatterns", "systemSteps", "successMeasure"] },
  { id: "chatbot", importSourceId: "w4l1-act", planFieldIds: ["intents", "keywords", "branches", "fallback", "humanHelp"] },
  { id: "classifier", importSourceId: "w3l2-act", planFieldIds: ["categories", "features", "trainingExamples", "testingExamples", "labelPlan"] },
  { id: "recommender", importSourceId: "w4l3-act", planFieldIds: ["itemFeatures", "userPreferences", "scoringLogic", "explanationLogic", "lowData"] },
  { id: "ethics", policyOnly: true, planFieldIds: ["evidence", "affectedUsers", "risks", "safeguards", "approvalCriteria"] },
]

export const projectTypes = (S: FinalProjectStrings = EN): ProjectTypeDef[] =>
  TYPE_DATA.map((d) => {
    const t = (S.types as Record<string, {
      name: string
      summary: string
      importLabel?: string
      planFields: Record<string, { label: string; hint: string }>
    }>)[d.id]
    return {
      id: d.id,
      name: t.name,
      summary: t.summary,
      planFields: d.planFieldIds.map((id) => ({ id, label: t.planFields[id].label, hint: t.planFields[id].hint })),
      importSourceId: d.importSourceId,
      importLabel: t.importLabel,
      policyOnly: d.policyOnly,
    }
  })

/** The English base, for code that only needs the ids and the field ids. */
export const PROJECT_TYPES: ProjectTypeDef[] = projectTypes()

export function getProjectType(id: string | null, S: FinalProjectStrings = EN): ProjectTypeDef | undefined {
  return projectTypes(S).find((t) => t.id === id)
}

/* ========================================================================== */
/* Test cases                                                                  */
/* ========================================================================== */

export type TestKind = "normal" | "difficult" | "missing-input" | "unexpected-input" | "edge" | "harmful"

const TEST_KIND_IDS: TestKind[] = ["normal", "difficult", "missing-input", "unexpected-input", "edge", "harmful"]

export const testKinds = (S: FinalProjectStrings = EN): { id: TestKind; label: string; hint: string }[] =>
  TEST_KIND_IDS.map((id) => {
    const t = (S.testKinds as Record<string, { label: string; hint: string }>)[id]
    return { id, label: t.label, hint: t.hint }
  })

/** The English base, for code that only needs the ids and their order. */
export const TEST_KINDS = testKinds()

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
export function validateProject(p: StudioProject, S: FinalProjectStrings = EN): Requirement[] {
  const type = getProjectType(p.type, S)
  const sec = (id: string) => (S.sections as Record<string, string>)[id]
  const lbl = (id: string) => (S.requirements as Record<string, string>)[id]
  const notUsingAi = p.appropriateness.useAi === "no"
  const req: Requirement[] = []
  const add = (id: string, section: string, label: string, met: boolean, required = true) => req.push({ id, section, label, met, required })

  add("type", sec("setup"), lbl("type"), !!p.type)

  // Section 1 — define
  add("d-title", sec("define"), lbl("d-title"), filled(p.define.title))
  add("d-who", sec("define"), lbl("d-who"), filled(p.define.who))
  add("d-why", sec("define"), lbl("d-why"), filled(p.define.whyMatters))
  add("d-evidence", sec("define"), lbl("d-evidence"), filled(p.define.evidence))

  // Section 2 — appropriateness
  add("a-usai", sec("appropriate"), lbl("a-usai"), p.appropriateness.useAi !== "")
  add("a-conc", sec("appropriate"), lbl("a-conc"), filled(p.appropriateness.conclusion))
  add("a-ifwrong", sec("appropriate"), lbl("a-ifwrong"), filled(p.appropriateness.ifWrong))

  // Section 3 — inputs/outputs
  add("io-in", sec("io"), lbl("io-in"), filled(p.io.inputs))
  add("io-out", sec("io"), lbl("io-out"), filled(p.io.outputs))
  add("io-missing", sec("io"), lbl("io-missing"), filled(p.io.missingUnclear))

  // Section 4 — plan (relaxed when not using AI, or for policy-only types the plan is the proposal)
  if (type) {
    const planRequired = !notUsingAi || !!type.policyOnly
    const planMet = type.planFields.every((f) => filled(p.plan[f.id] ?? ""))
    add("plan", sec("plan"), lbl("plan").replace("{name}", type.name), planMet, planRequired)
  }

  // Section 5 — prototype (relaxed when not using AI)
  add("proto", sec("prototype"), lbl("proto"), filled(p.prototype.flow) || filled(p.prototype.notes) || filled(p.prototype.importSnapshot), !notUsingAi)

  // Section 6 — tests (>= 6 cases covering all six kinds, each with an input and a pass/fail)
  const kindsCovered = new Set(p.tests.filter((t) => filled(t.input)).map((t) => t.kind))
  const completeTests = p.tests.filter((t) => filled(t.input) && t.pass !== "").length
  add("tests-count", sec("tests"), lbl("tests-count"), completeTests >= 6)
  add("tests-kinds", sec("tests"), lbl("tests-kinds"), TEST_KIND_IDS.every((k) => kindsCovered.has(k)))

  // Section 7 — limitations (safety)
  add("lim-cannot", sec("limitations"), lbl("lim-cannot"), filled(p.limitations.cannotHandle))
  add("lim-refuse", sec("limitations"), lbl("lim-refuse"), filled(p.limitations.refuse))
  add("lim-review", sec("limitations"), lbl("lim-review"), filled(p.limitations.humanReview))

  // Section 8 — privacy (safety)
  add("pr-necessary", sec("privacy"), lbl("pr-necessary"), filled(p.privacy.necessary))
  add("pr-donot", sec("privacy"), lbl("pr-donot"), filled(p.privacy.doNotCollect))
  add("pr-processing", sec("privacy"), lbl("pr-processing"), filled(p.privacy.processing))
  add("pr-retention", sec("privacy"), lbl("pr-retention"), filled(p.privacy.retention))
  add("pr-delete", sec("privacy"), lbl("pr-delete"), filled(p.privacy.deleteCorrect))

  // Section 9 — fairness (safety; group-testing relaxed when not using AI)
  add("fa-rep", sec("fairness"), lbl("fa-rep"), filled(p.fairness.represented))
  add("fa-missing", sec("fairness"), lbl("fa-missing"), filled(p.fairness.missing))
  add("fa-invest", sec("fairness"), lbl("fa-invest"), filled(p.fairness.investigate))
  add("fa-group", sec("fairness"), lbl("fa-group"), filled(p.fairness.groupTesting), !notUsingAi)

  // Section 10 — oversight & appeal (safety)
  add("ov-reviewer", sec("oversight"), lbl("ov-reviewer"), filled(p.oversight.reviewer))
  add("ov-final", sec("oversight"), lbl("ov-final"), filled(p.oversight.finalDecision))
  add("ov-explain", sec("oversight"), lbl("ov-explain"), filled(p.oversight.explanation))
  add("ov-correct", sec("oversight"), lbl("ov-correct"), filled(p.oversight.correction))
  add("ov-override", sec("oversight"), lbl("ov-override"), filled(p.oversight.override))

  // Section 11 — wrap-up
  add("wrap-next", sec("presentation"), lbl("wrap-next"), filled(p.wrapUp.nextImprovement))

  return req
}

export function projectComplete(p: StudioProject, S: FinalProjectStrings = EN): boolean {
  return validateProject(p, S).every((r) => !r.required || r.met)
}

export function completionSummary(p: StudioProject, S: FinalProjectStrings = EN): { met: number; total: number; remaining: Requirement[] } {
  const reqs = validateProject(p, S).filter((r) => r.required)
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
export function summarizeImport(sourceId: string, raw: string | undefined, S: FinalProjectStrings = EN): ImportResult {
  if (!raw) return { ok: false, summary: S.impNoSaved }
  try {
    const data = JSON.parse(raw) as Record<string, unknown>
    if (sourceId === "w4l1-act") {
      const intents = Array.isArray(data.intents) ? (data.intents as { name?: string }[]) : []
      const names = intents.map((i) => i.name).filter(Boolean).slice(0, 6).join(", ")
      return {
        ok: intents.length > 0,
        summary: intents.length
          ? S.impChatbot
              .replace("{name}", str(data.name) || S.impUntitled)
              .replace("{n}", String(intents.length))
              .replace("{names}", names)
              .replace("{fallback}", str(data.fallback) ? S.impYes : S.impNo)
          : S.impChatbotEmpty,
      }
    }
    if (sourceId === "w3l2-act") {
      const training = (data.training as Record<string, unknown>) ?? {}
      const topic = str(data.topic)
      const counts = Object.values(training).map((v) => (Array.isArray(v) ? v.length : 0)).reduce((a, b) => a + b, 0)
      return {
        ok: !!topic,
        summary: topic
          ? S.impClassifier.replace("{topic}", topic).replace("{n}", String(counts))
          : S.impClassifierEmpty,
      }
    }
    if (sourceId === "w4l3-act") {
      const ratings = (data.ratings as Record<string, unknown>) ?? {}
      const n = Object.keys(ratings).length
      return { ok: n > 0, summary: n ? S.impRecommender.replace("{n}", String(n)) : S.impRecommenderEmpty }
    }
    return { ok: false, summary: S.impNotImportable }
  } catch {
    return { ok: false, summary: S.impUnreadable }
  }
}
