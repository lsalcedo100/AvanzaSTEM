/**
 * Week 4 — Rule-Based Chatbot Builder engine (framework-free, deterministic).
 *
 * There is NO external chatbot or generative-AI API. Matching is real, ordered,
 * keyword-based rule matching over normalized text: the same message always
 * produces the same response, and every response reports exactly which rule or
 * keyword matched. The bot never pretends to understand open language, and it is
 * explicitly scoped away from medical, legal, crisis, or other high-risk advice.
 *
 * Stable ids throughout; safe to persist. No personal data is used or required.
 */

/* ========================================================================== */
/* Data model                                                                 */
/* ========================================================================== */

import { translations, type Translations } from "../../../../i18n/translations.ts"

/**
 * The Week 4 chatbot wording. Keywords are translated too - a Spanish student
 * types "horario", not "hours" - while every id stays English so a saved bot
 * keeps its structure.
 */
export type Week4ChatbotStrings = Translations["courseUi"]["ai"]["week4Chatbot"]

const EN: Week4ChatbotStrings = translations.en.courseUi.ai.week4Chatbot

/** Comma-separated keyword lists are stored as one string per language. */
function kw(list: string): string[] {
  return list.split(",").map((k) => k.trim()).filter(Boolean)
}

export type BranchOption = {
  id: string
  label: string
  keywords: string[]
  response: string
}

export type Branch = {
  question: string
  options: BranchOption[]
}

export type Intent = {
  id: string
  name: string
  keywords: string[]
  response: string
  /** Optional one-level follow-up branch (a decision-tree node with children). */
  branch?: Branch
}

export type ChatbotSpec = {
  id: string
  templateId: string
  name: string
  welcome: string
  intents: Intent[]
  fallback: string
  /** Shown when a message asks for a person / help desk. */
  humanHelp: string
  /** A privacy boundary reminder (never ask for personal info). */
  privacyNote: string
  /** Ending / restart guidance. */
  endingNote: string
}

/* ========================================================================== */
/* Templates (safe topics only)                                               */
/* ========================================================================== */

export type Template = { id: string; name: string; description: string; build: () => ChatbotSpec }

function baseSpec(
  S: Week4ChatbotStrings,
  over: Partial<ChatbotSpec> & { id: string; templateId: string; name: string },
): ChatbotSpec {
  return {
    welcome: S.baseWelcome,
    intents: [],
    fallback: S.baseFallback,
    humanHelp: S.baseHumanHelp,
    privacyNote: S.basePrivacyNote,
    endingNote: S.baseEndingNote,
    ...over,
  }
}

type TemplateStrings = Week4ChatbotStrings["templates"]["library"]

/** Builds one template's spec from its translated strings. */
function specFrom(S: Week4ChatbotStrings, templateId: string, t: TemplateStrings, ids: string[][]): ChatbotSpec {
  return baseSpec(S, {
    id: `bot-${templateId}`,
    templateId,
    name: t.specName,
    welcome: t.welcome,
    intents: t.intents.map((intent, i) => {
      const [intentId, ...optionIds] = ids[i]
      const base: Intent = { id: intentId, name: intent.name, keywords: kw(intent.keywords), response: intent.response }
      const branch = (intent as { question?: string; options?: { label: string; keywords: string; response: string }[] })
      if (branch.question && branch.options) {
        base.branch = {
          question: branch.question,
          options: branch.options.map((o, j) => ({
            id: optionIds[j],
            label: o.label,
            keywords: kw(o.keywords),
            response: o.response,
          })),
        }
      }
      return base
    }),
  })
}

/** The stable node ids per template: [intentId, ...optionIds] for each intent. */
const TEMPLATE_IDS: Record<string, string[][]> = {
  library: [["in-hours"], ["in-renew", "op-yes", "op-no"], ["in-card"]],
  recycling: [["in-paper"], ["in-plastic"], ["in-where"]],
  museum: [["in-exhibit", "op-ground", "op-upper"], ["in-tickets"], ["in-facilities"]],
  club: [["in-when"], ["in-join"], ["in-do"]],
  homework: [["in-plan", "op-many", "op-one"], ["in-breaks"], ["in-focus"]],
}

export const templates = (S: Week4ChatbotStrings = EN): Template[] =>
  (Object.keys(TEMPLATE_IDS) as (keyof Week4ChatbotStrings["templates"])[]).map((id) => {
    const t = S.templates[id]
    return {
      id,
      name: t.name,
      description: t.description,
      build: () => specFrom(S, id, t, TEMPLATE_IDS[id]),
    }
  })

/** The English base, for callers that pass no strings. */
export const TEMPLATES: Template[] = templates()

export function getTemplate(id: string, S: Week4ChatbotStrings = EN): Template | undefined {
  return templates(S).find((t) => t.id === id)
}

/* ========================================================================== */
/* Normalization + keyword matching                                            */
/* ========================================================================== */

/** Lowercases, strips punctuation, and collapses whitespace. Deterministic. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

/** True for scripts written without spaces between words (CJK, kana). */
function unspaced(text: string): boolean {
  return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/.test(text)
}

export function tokenize(text: string): string[] {
  const n = normalize(text)
  return n === "" ? [] : n.split(" ")
}

/** True if a (possibly multi-word) keyword is present in the message. */
export function matchesKeyword(message: string, keyword: string): boolean {
  const normKeyword = normalize(keyword)
  if (!normKeyword) return false
  const normMessage = normalize(message)
  // Chinese and Japanese are typed without spaces, so a whole-token test would
  // never fire; fall back to containment for those keywords.
  if (unspaced(normKeyword)) return normMessage.includes(normKeyword)
  if (normKeyword.includes(" ")) return ` ${normMessage} `.includes(` ${normKeyword} `)
  return tokenize(normMessage).includes(normKeyword)
}

const humanKeywords = (S: Week4ChatbotStrings) => kw(S.humanKeywords)
const restartKeywords = (S: Week4ChatbotStrings) => kw(S.restartKeywords)

export function matchesAny(message: string, keywords: string[]): string | null {
  for (const k of keywords) if (matchesKeyword(message, k)) return k
  return null
}

/* ========================================================================== */
/* Conversation engine                                                         */
/* ========================================================================== */

export type ConvoState = { awaitingBranchIntentId: string | null }
export const initialConvoState: ConvoState = { awaitingBranchIntentId: null }

export type MatchKind = "intent" | "branch-option" | "fallback" | "human-help" | "restart"

export type TurnResult = {
  messages: string[]
  matchKind: MatchKind
  /** The intent/option id (or "human"/"restart"/null for fallback). */
  matchedId: string | null
  matchedLabel: string
  matchedKeyword: string | null
  usedFallback: boolean
  /** Human-readable trace of why this matched. */
  explanation: string
  state: ConvoState
}

/**
 * Runs one conversation turn. Deterministic and fully explainable. Global
 * commands (human help, restart) win first; then a pending branch is matched;
 * otherwise intents are matched in order; else the fallback fires.
 */
export function respond(spec: ChatbotSpec, state: ConvoState, userText: string, S: Week4ChatbotStrings = EN): TurnResult {
  const human = matchesAny(userText, humanKeywords(S))
  if (human) {
    return {
      messages: [spec.humanHelp],
      matchKind: "human-help",
      matchedId: "human",
      matchedLabel: S.humanHelpLabel,
      matchedKeyword: human,
      usedFallback: false,
      explanation: S.explainHuman.replace("{kw}", human),
      state: { awaitingBranchIntentId: null },
    }
  }

  const restart = matchesAny(userText, restartKeywords(S))
  if (restart) {
    return {
      messages: [spec.welcome],
      matchKind: "restart",
      matchedId: "restart",
      matchedLabel: S.restartLabel,
      matchedKeyword: restart,
      usedFallback: false,
      explanation: S.explainRestart.replace("{kw}", restart),
      state: { awaitingBranchIntentId: null },
    }
  }

  // Pending follow-up branch.
  if (state.awaitingBranchIntentId) {
    const intent = spec.intents.find((i) => i.id === state.awaitingBranchIntentId)
    const branch = intent?.branch
    if (branch) {
      for (const opt of branch.options) {
        const kw = matchesAny(userText, opt.keywords)
        if (kw) {
          return {
            messages: [opt.response, spec.endingNote],
            matchKind: "branch-option",
            matchedId: opt.id,
            matchedLabel: S.branchLabel.replace("{intent}", intent!.name).replace("{option}", opt.label),
            matchedKeyword: kw,
            usedFallback: false,
            explanation: S.explainBranch
              .replace("{intent}", intent!.name)
              .replace("{option}", opt.label)
              .replace("{kw}", kw),
            state: { awaitingBranchIntentId: null },
          }
        }
      }
      // No branch option matched.
      return {
        messages: [spec.fallback],
        matchKind: "fallback",
        matchedId: null,
        matchedLabel: S.fallbackLabel,
        matchedKeyword: null,
        usedFallback: true,
        explanation: S.explainNoBranch.replace("{options}", branch.options.map((o) => o.label).join(", ")),
        state: { awaitingBranchIntentId: null },
      }
    }
  }

  // Top-level intents, in order.
  for (const intent of spec.intents) {
    const kw = matchesAny(userText, intent.keywords)
    if (kw) {
      const messages = [intent.response]
      let nextState: ConvoState = { awaitingBranchIntentId: null }
      if (intent.branch) {
        messages.push(intent.branch.question)
        nextState = { awaitingBranchIntentId: intent.id }
      }
      return {
        messages,
        matchKind: "intent",
        matchedId: intent.id,
        matchedLabel: intent.name,
        matchedKeyword: kw,
        usedFallback: false,
        explanation: S.explainIntent.replace("{intent}", intent.name).replace("{kw}", kw),
        state: nextState,
      }
    }
  }

  return {
    messages: [spec.fallback],
    matchKind: "fallback",
    matchedId: null,
    matchedLabel: S.fallbackLabel,
    matchedKeyword: null,
    usedFallback: true,
    explanation: S.explainFallback,
    state: { awaitingBranchIntentId: null },
  }
}

/* ========================================================================== */
/* Decision-tree validation                                                    */
/* ========================================================================== */

export type ValidationIssue = { level: "error" | "warning"; message: string; nodeId?: string }

/**
 * Validates the chatbot as a decision tree: a missing fallback, dead ends
 * (nothing to say), unreachable nodes (no keywords, so never matched), and the
 * challenge boundaries (privacy note, human help, at least three intents).
 */
export function validateChatbot(spec: ChatbotSpec, S: Week4ChatbotStrings = EN): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (!spec.welcome.trim()) issues.push({ level: "error", message: S.vAddWelcome })
  if (!spec.fallback.trim()) issues.push({ level: "error", message: S.vAddFallback })
  if (spec.intents.length < 3) issues.push({ level: "warning", message: S.vAddIntents.replace("{n}", String(spec.intents.length)) })
  if (!spec.humanHelp.trim()) issues.push({ level: "warning", message: S.vAddHumanHelp })
  if (!spec.privacyNote.trim()) issues.push({ level: "warning", message: S.vAddPrivacy })

  for (const intent of spec.intents) {
    if (intent.keywords.filter((k) => normalize(k)).length === 0) {
      issues.push({ level: "error", message: S.vIntentNoKeywords.replace("{name}", intent.name || intent.id), nodeId: intent.id })
    }
    const hasResponse = intent.response.trim().length > 0
    const hasBranch = !!intent.branch && intent.branch.options.length > 0
    if (!hasResponse && !hasBranch) {
      issues.push({ level: "error", message: S.vIntentDeadEnd.replace("{name}", intent.name || intent.id), nodeId: intent.id })
    }
    if (intent.branch) {
      if (intent.branch.options.length === 0) {
        issues.push({ level: "error", message: S.vBranchNoOptions.replace("{name}", intent.name), nodeId: intent.id })
      }
      if (!intent.branch.question.trim()) {
        issues.push({ level: "warning", message: S.vBranchNoQuestion.replace("{name}", intent.name), nodeId: intent.id })
      }
      for (const opt of intent.branch.options) {
        if (opt.keywords.filter((k) => normalize(k)).length === 0) {
          issues.push({ level: "error", message: S.vOptionNoKeywords.replace("{name}", opt.label || opt.id), nodeId: opt.id })
        }
        if (!opt.response.trim()) {
          issues.push({ level: "error", message: S.vOptionNoResponse.replace("{name}", opt.label || opt.id), nodeId: opt.id })
        }
      }
    }
  }

  // Duplicate/shadowed keywords: an earlier intent that captures a later one's keyword.
  spec.intents.forEach((intent, i) => {
    for (const kw of intent.keywords) {
      const shadowedBy = spec.intents.slice(0, i).find((earlier) => earlier.keywords.some((k) => normalize(k) === normalize(kw)))
      if (shadowedBy) {
        issues.push({
          level: "warning",
          message: S.vShadowed
            .replace("{kw}", kw)
            .replace("{name}", intent.name)
            .replace("{earlier}", shadowedBy.name),
          nodeId: intent.id,
        })
      }
    }
  })

  return issues
}

export function chatbotErrors(spec: ChatbotSpec, S: Week4ChatbotStrings = EN): ValidationIssue[] {
  return validateChatbot(spec, S).filter((i) => i.level === "error")
}
