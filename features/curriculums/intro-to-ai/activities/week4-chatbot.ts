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

function baseSpec(over: Partial<ChatbotSpec> & { id: string; templateId: string; name: string }): ChatbotSpec {
  return {
    welcome: "Hi! I'm a helper bot. I can answer a few things — pick a topic or type a keyword.",
    intents: [],
    fallback: "Sorry, I didn't catch that. I can only help with a few topics — try a keyword, or type 'help' to reach a person.",
    humanHelp: "No problem — a real person can help. Ask a staff member at the front desk, or email the office.",
    privacyNote: "Please don't type personal information (full name, address, phone). I only answer general questions.",
    endingNote: "That's everything I can do here. Type 'restart' to begin again.",
    ...over,
  }
}

export const TEMPLATES: Template[] = [
  {
    id: "library",
    name: "School library helper",
    description: "Answers questions about hours, borrowing, and library cards.",
    build: () =>
      baseSpec({
        id: "bot-library",
        templateId: "library",
        name: "Library Helper",
        welcome: "Welcome to the school library helper! I can help with hours, renewing a book, or getting a library card.",
        intents: [
          { id: "in-hours", name: "Opening hours", keywords: ["hours", "open", "close", "time"], response: "The library is open 8am–4pm on school days." },
          {
            id: "in-renew",
            name: "Renew a book",
            keywords: ["renew", "overdue", "extend", "keep"],
            response: "You can renew a book once online or at the desk.",
            branch: {
              question: "Is your book already overdue? (type 'yes' or 'no')",
              options: [
                { id: "op-yes", label: "Overdue", keywords: ["yes", "overdue", "late"], response: "Overdue books can't be renewed online — please bring it to the desk." },
                { id: "op-no", label: "Not overdue", keywords: ["no", "not"], response: "Great — you can renew it online from your account page." },
              ],
            },
          },
          { id: "in-card", name: "Library card", keywords: ["card", "join", "sign up", "register"], response: "To get a library card, bring your student ID to the front desk." },
        ],
      }),
  },
  {
    id: "recycling",
    name: "Recycling guide",
    description: "Explains which bin common classroom items go in (as a teaching example).",
    build: () =>
      baseSpec({
        id: "bot-recycling",
        templateId: "recycling",
        name: "Recycling Guide",
        welcome: "Hi! I'm a recycling guide for our classroom. Ask about paper, plastic, or where a bin is. (Rules vary by place — check your local ones too.)",
        intents: [
          { id: "in-paper", name: "Paper", keywords: ["paper", "cardboard", "card"], response: "Clean paper and cardboard go in the blue paper bin." },
          { id: "in-plastic", name: "Plastic", keywords: ["plastic", "bottle", "wrapper"], response: "Empty, clean plastic bottles go in the yellow bin. Wrappers usually go in general waste." },
          { id: "in-where", name: "Bin location", keywords: ["where", "bin", "located", "find"], response: "The recycling bins are by the classroom door, next to the sink." },
        ],
      }),
  },
  {
    id: "museum",
    name: "Museum visitor helper",
    description: "Helps a visitor find exhibits, tickets, and facilities.",
    build: () =>
      baseSpec({
        id: "bot-museum",
        templateId: "museum",
        name: "Museum Helper",
        welcome: "Welcome to the science museum helper! I can help with exhibits, tickets, or facilities.",
        intents: [
          {
            id: "in-exhibit",
            name: "Exhibits",
            keywords: ["exhibit", "see", "show", "dinosaur", "space"],
            response: "Our main exhibits are Space, Dinosaurs, and the Robotics Lab.",
            branch: {
              question: "Which floor do you want — 'ground' or 'upper'?",
              options: [
                { id: "op-ground", label: "Ground floor", keywords: ["ground", "bottom", "first"], response: "The ground floor has Space and the gift shop." },
                { id: "op-upper", label: "Upper floor", keywords: ["upper", "top", "second"], response: "The upper floor has Dinosaurs and the Robotics Lab." },
              ],
            },
          },
          { id: "in-tickets", name: "Tickets", keywords: ["ticket", "price", "cost", "entry"], response: "Student tickets are free with a school group; adults are $8." },
          { id: "in-facilities", name: "Facilities", keywords: ["toilet", "bathroom", "cafe", "food", "water"], response: "Restrooms and the cafe are on the ground floor near the entrance." },
        ],
      }),
  },
  {
    id: "club",
    name: "Club information bot",
    description: "Shares meeting times, how to join, and what a club does.",
    build: () =>
      baseSpec({
        id: "bot-club",
        templateId: "club",
        name: "Science Club Bot",
        welcome: "Hey! I'm the Science Club bot. Ask about meeting times, how to join, or what we do.",
        intents: [
          { id: "in-when", name: "Meeting time", keywords: ["when", "meet", "time", "day"], response: "The club meets Thursdays at lunch in Room 12." },
          { id: "in-join", name: "How to join", keywords: ["join", "sign up", "member", "how"], response: "To join, just come to a Thursday meeting — no sign-up needed!" },
          { id: "in-do", name: "What we do", keywords: ["do", "activities", "projects", "about"], response: "We build small science projects, like circuits and simple robots." },
        ],
      }),
  },
  {
    id: "homework",
    name: "Homework-planning helper",
    description: "Helps a student plan homework time (general tips only).",
    build: () =>
      baseSpec({
        id: "bot-homework",
        templateId: "homework",
        name: "Homework Planner",
        welcome: "Hi! I can help you plan homework time with general tips. I can't do your homework for you, though!",
        intents: [
          {
            id: "in-plan",
            name: "Make a plan",
            keywords: ["plan", "schedule", "organize", "start"],
            response: "A simple plan: list your tasks, guess how long each takes, and do the hardest one first.",
            branch: {
              question: "Do you have a lot of tasks or just one — type 'many' or 'one'?",
              options: [
                { id: "op-many", label: "Many tasks", keywords: ["many", "lots", "several"], response: "Break it up: do a 20-minute block, take a short break, then the next task." },
                { id: "op-one", label: "One task", keywords: ["one", "single", "just"], response: "For one task, set a timer for 20 minutes and focus only on that." },
              ],
            },
          },
          { id: "in-breaks", name: "Breaks", keywords: ["break", "rest", "tired"], response: "Short breaks help — try 20 minutes of work, then a 5-minute break." },
          { id: "in-focus", name: "Focus tips", keywords: ["focus", "distracted", "concentrate", "phone"], response: "Put your phone in another room and keep only what you need on your desk." },
        ],
      }),
  },
]

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id)
}

/* ========================================================================== */
/* Normalization + keyword matching                                            */
/* ========================================================================== */

/** Lowercases, strips punctuation, and collapses whitespace. Deterministic. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
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
  if (normKeyword.includes(" ")) return ` ${normMessage} `.includes(` ${normKeyword} `)
  return tokenize(normMessage).includes(normKeyword)
}

const HUMAN_KEYWORDS = ["human", "person", "someone", "agent", "staff", "real person", "help desk", "help me"]
const RESTART_KEYWORDS = ["restart", "start over", "reset", "begin again", "start again"]

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
export function respond(spec: ChatbotSpec, state: ConvoState, userText: string): TurnResult {
  const human = matchesAny(userText, HUMAN_KEYWORDS)
  if (human) {
    return {
      messages: [spec.humanHelp],
      matchKind: "human-help",
      matchedId: "human",
      matchedLabel: "Human help",
      matchedKeyword: human,
      usedFallback: false,
      explanation: `Matched the human-help request because your message contained “${human}”.`,
      state: { awaitingBranchIntentId: null },
    }
  }

  const restart = matchesAny(userText, RESTART_KEYWORDS)
  if (restart) {
    return {
      messages: [spec.welcome],
      matchKind: "restart",
      matchedId: "restart",
      matchedLabel: "Restart",
      matchedKeyword: restart,
      usedFallback: false,
      explanation: `Restarted the conversation because your message contained “${restart}”.`,
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
            matchedLabel: `${intent!.name} → ${opt.label}`,
            matchedKeyword: kw,
            usedFallback: false,
            explanation: `Followed the “${intent!.name}” branch to “${opt.label}” because your message contained “${kw}”.`,
            state: { awaitingBranchIntentId: null },
          }
        }
      }
      // No branch option matched.
      return {
        messages: [spec.fallback],
        matchKind: "fallback",
        matchedId: null,
        matchedLabel: "Fallback",
        matchedKeyword: null,
        usedFallback: true,
        explanation: `No branch option matched, so the fallback answered. Expected one of: ${branch.options.map((o) => o.label).join(", ")}.`,
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
        explanation: `Matched the intent “${intent.name}” because your message contained the keyword “${kw}”.`,
        state: nextState,
      }
    }
  }

  return {
    messages: [spec.fallback],
    matchKind: "fallback",
    matchedId: null,
    matchedLabel: "Fallback",
    matchedKeyword: null,
    usedFallback: true,
    explanation: "No intent keyword matched your message, so the fallback answered.",
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
export function validateChatbot(spec: ChatbotSpec): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (!spec.welcome.trim()) issues.push({ level: "error", message: "Add a welcome message so users know what the bot can do." })
  if (!spec.fallback.trim()) issues.push({ level: "error", message: "Add a fallback response for messages the bot doesn't understand." })
  if (spec.intents.length < 3) issues.push({ level: "warning", message: `Add at least 3 intents (you have ${spec.intents.length}).` })
  if (!spec.humanHelp.trim()) issues.push({ level: "warning", message: "Add a human-help option so users can reach a person." })
  if (!spec.privacyNote.trim()) issues.push({ level: "warning", message: "Add a privacy boundary reminding users not to share personal info." })

  for (const intent of spec.intents) {
    if (intent.keywords.filter((k) => normalize(k)).length === 0) {
      issues.push({ level: "error", message: `Intent “${intent.name || intent.id}” has no keywords, so it can never be matched (unreachable).`, nodeId: intent.id })
    }
    const hasResponse = intent.response.trim().length > 0
    const hasBranch = !!intent.branch && intent.branch.options.length > 0
    if (!hasResponse && !hasBranch) {
      issues.push({ level: "error", message: `Intent “${intent.name || intent.id}” is a dead end — it has no response and no follow-up.`, nodeId: intent.id })
    }
    if (intent.branch) {
      if (intent.branch.options.length === 0) {
        issues.push({ level: "error", message: `The follow-up for “${intent.name}” has no options — it's a dead end.`, nodeId: intent.id })
      }
      if (!intent.branch.question.trim()) {
        issues.push({ level: "warning", message: `The follow-up for “${intent.name}” has no question.`, nodeId: intent.id })
      }
      for (const opt of intent.branch.options) {
        if (opt.keywords.filter((k) => normalize(k)).length === 0) {
          issues.push({ level: "error", message: `Option “${opt.label || opt.id}” has no keywords, so it can never be reached (unreachable).`, nodeId: opt.id })
        }
        if (!opt.response.trim()) {
          issues.push({ level: "error", message: `Option “${opt.label || opt.id}” has no response — it's a dead end.`, nodeId: opt.id })
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
          message: `Keyword “${kw}” in “${intent.name}” is also in the earlier intent “${shadowedBy.name}”, which will always match first.`,
          nodeId: intent.id,
        })
      }
    }
  })

  return issues
}

export function chatbotErrors(spec: ChatbotSpec): ValidationIssue[] {
  return validateChatbot(spec).filter((i) => i.level === "error")
}
