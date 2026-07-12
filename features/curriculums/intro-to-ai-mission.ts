/**
 * AI Review Mission — the scenario-based final assessment (framework-free).
 *
 * The student reviews a fictional AI product and answers objective questions
 * (concepts, result interpretation, fairness/privacy, misinformation) plus writes a
 * final recommendation. Objective questions reuse the shared knowledge-check grader;
 * the written recommendation is evaluated by whether the REQUIRED REASONING is
 * present — never marked wrong just for differing from a preset choice. Everything
 * is fictional and local; no response is sent to any AI grader.
 */
import type { KnowledgeCheckQuestion } from "./intro-to-ai-types.ts"

export const MISSION_ID = "ai-review-mission"

export const MISSION_SCENARIO =
  "Northgate Community School proposes “PathwayAI”, an assistant that (1) recommends after-school programs to students, (2) answers family questions in a chat window, and (3) flags scholarship applications for staff review. Your job on the review board is to check it before it launches."

export type MissionSection = { id: string; title: string; description: string; questionIds: string[] }

/** All objective questions, in section order. `context` powers the
 *  result-interpretation questions; `skillId` maps each to a skill. */
export const MISSION_QUESTIONS: KnowledgeCheckQuestion[] = [
  /* A · Concepts (4) */
  {
    id: "m-a1",
    kind: "single",
    skillId: "sk-identify",
    prompt: "PathwayAI's program recommender learns from thousands of past student choices. What makes this AI rather than a traditional program?",
    explanation: "AI learns patterns from many examples; a traditional program only follows rules a person wrote by hand.",
    choices: [
      { id: "m-a1-a", text: "It learns patterns from many examples.", correct: true, explanation: "Correct — learning patterns from data is the key sign of AI." },
      { id: "m-a1-b", text: "It runs on a fast computer.", correct: false, explanation: "Speed doesn't make something AI." },
      { id: "m-a1-c", text: "It has a chat window.", correct: false, explanation: "A chat window is just an interface, not what makes it AI." },
      { id: "m-a1-d", text: "A person wrote every rule it follows.", correct: false, explanation: "That describes a traditional rule-based program, not AI." },
    ],
  },
  {
    id: "m-a2",
    kind: "single",
    skillId: "sk-split",
    prompt: "The team checked the recommender only on the same students it learned from. Why is that a problem?",
    explanation: "Testing on the training examples can just measure memorization; a fair check uses unseen examples.",
    choices: [
      { id: "m-a2-a", text: "It's fine — reusing the data saves time.", correct: false, explanation: "Reusing training data hides whether it really generalizes." },
      { id: "m-a2-b", text: "The score may just show memorization, not real learning.", correct: true, explanation: "Correct — test on unseen examples to measure generalization." },
      { id: "m-a2-c", text: "The model will run too slowly.", correct: false, explanation: "Speed isn't the issue here." },
      { id: "m-a2-d", text: "It needs more categories.", correct: false, explanation: "The issue is the split, not the number of categories." },
    ],
  },
  {
    id: "m-a3",
    kind: "single",
    skillId: "sk-accuracy",
    prompt: "The chatbot answers a family's question with “95% confidence.” What does that confidence mean?",
    explanation: "Confidence compares the model's options; it is not a guarantee the answer is true — a model can be confident and wrong.",
    choices: [
      { id: "m-a3-a", text: "The answer is 95% certain to be true.", correct: false, explanation: "Confidence is not a promise of truth." },
      { id: "m-a3-b", text: "The model compared its options and this one scored highest — but it could still be wrong.", correct: true, explanation: "Correct — high confidence doesn't guarantee a correct answer." },
      { id: "m-a3-c", text: "95% of families agree with it.", correct: false, explanation: "It's not a vote of people." },
      { id: "m-a3-d", text: "It checked 95 sources.", correct: false, explanation: "Confidence isn't a count of sources." },
    ],
  },
  {
    id: "m-a4",
    kind: "single",
    skillId: "sk-behavior",
    prompt: "PathwayAI keeps recommending the same kind of program to a student who only ever picked sports. What is happening?",
    explanation: "Recommenders lean on past choices, which can create a filter bubble — a narrow feed that hides other options.",
    choices: [
      { id: "m-a4-a", text: "A filter bubble — past choices narrow what it shows.", correct: true, explanation: "Correct — repeated choices can narrow recommendations." },
      { id: "m-a4-b", text: "The model is broken.", correct: false, explanation: "This is expected behavior, not a bug." },
      { id: "m-a4-c", text: "It ran out of programs.", correct: false, explanation: "Other programs exist; they're just not being surfaced." },
      { id: "m-a4-d", text: "It is checking facts.", correct: false, explanation: "Recommending isn't fact-checking." },
    ],
  },

  /* B · Result interpretation (3) — each shows a chart/table first */
  {
    id: "m-b1",
    kind: "single",
    skillId: "sk-bias",
    prompt: "Read the accuracy chart. What does it reveal?",
    explanation: "The overall number looks strong, but one group's accuracy is much lower — a gap the overall score hides.",
    context: {
      id: "m-b1-ctx",
      kind: "bar-chart",
      title: "PathwayAI application-flagging accuracy",
      summary: "Accuracy in percent. Overall: 91%. Group A applicants: 94%. Group B applicants: 62%. The overall number hides that Group B is handled much worse.",
      chart: { unit: "% correct", bars: [{ label: "Overall", value: 91 }, { label: "Group A", value: 94 }, { label: "Group B", value: 62 }] },
    },
    choices: [
      { id: "m-b1-a", text: "The system works well for everyone.", correct: false, explanation: "Group B is at 62% — not well at all." },
      { id: "m-b1-b", text: "A high overall score hides a much worse result for Group B.", correct: true, explanation: "Correct — always read group-level results, not just the overall." },
      { id: "m-b1-c", text: "Group A should be removed.", correct: false, explanation: "The problem is Group B's low accuracy, not Group A." },
      { id: "m-b1-d", text: "Accuracy doesn't matter here.", correct: false, explanation: "Accuracy — especially per group — matters a lot for fairness." },
    ],
  },
  {
    id: "m-b2",
    kind: "single",
    skillId: "sk-mistakes",
    prompt: "Read the confusion matrix. Which mistake is most common?",
    explanation: "The largest off-diagonal cell is 'approve' applications the model flagged as 'review' — a false alarm that creates extra work and stress.",
    context: {
      id: "m-b2-ctx",
      kind: "confusion-matrix",
      title: "Flagging results (rows = actual, columns = predicted)",
      summary: "Actual 'approve' rows: 40 predicted approve, 18 predicted review. Actual 'review' rows: 5 predicted approve, 37 predicted review. The biggest mistake is 18 approvable applications wrongly sent to review.",
      matrix: { labels: ["Approve", "Review"], counts: [[40, 18], [5, 37]] },
    },
    choices: [
      { id: "m-b2-a", text: "Sending 18 approvable applications to review (a false alarm).", correct: true, explanation: "Correct — that off-diagonal 18 is the largest mistake." },
      { id: "m-b2-b", text: "The model makes no mistakes.", correct: false, explanation: "The off-diagonal cells are mistakes." },
      { id: "m-b2-c", text: "Approving 40 correctly.", correct: false, explanation: "That's a correct result, not a mistake." },
      { id: "m-b2-d", text: "Reviewing 37 correctly.", correct: false, explanation: "That's a correct result, not a mistake." },
    ],
  },
  {
    id: "m-b3",
    kind: "single",
    skillId: "sk-accuracy",
    prompt: "For one application, PathwayAI predicts “review” with 54% confidence. What is the responsible read?",
    explanation: "A near-tie confidence means the model is unsure; a person should look, not the AI deciding alone.",
    context: {
      id: "m-b3-ctx",
      kind: "bar-chart",
      title: "Confidence for one application",
      summary: "Confidence: Review 54%, Approve 46%. This is nearly a tie — the model is uncertain.",
      chart: { unit: "% confidence", bars: [{ label: "Review", value: 54 }, { label: "Approve", value: 46 }] },
    },
    choices: [
      { id: "m-b3-a", text: "Trust it — 54% is the highest.", correct: false, explanation: "A near-tie means the model is unsure, not reliable." },
      { id: "m-b3-b", text: "It's nearly a tie, so a person should review this one.", correct: true, explanation: "Correct — low, near-tie confidence calls for human review." },
      { id: "m-b3-c", text: "Reject the application.", correct: false, explanation: "Uncertainty isn't a reason to reject; it's a reason to look." },
      { id: "m-b3-d", text: "Delete the model.", correct: false, explanation: "One uncertain case doesn't mean the tool is useless." },
    ],
  },

  /* C · Fairness / privacy decisions (2) */
  {
    id: "m-c1",
    kind: "multiple",
    skillId: "sk-bias",
    prompt: "Group B applications are handled worse and Group B is under-represented in the training data. Which are good responses? Choose all that apply.",
    explanation: "Add more Group B examples and keep human review for flagged cases; do not hide the gap or drop the group.",
    choices: [
      { id: "m-c1-a", text: "Collect more Group B examples to improve representation.", correct: true, explanation: "Correct — better representation can reduce the gap." },
      { id: "m-c1-b", text: "Have a person review flagged Group B applications.", correct: true, explanation: "Correct — human review protects the affected group." },
      { id: "m-c1-c", text: "Hide the per-group numbers so it looks fair.", correct: false, explanation: "Hiding the gap is the opposite of fair." },
      { id: "m-c1-d", text: "Stop serving Group B entirely.", correct: false, explanation: "Dropping the group is unfair and unnecessary." },
    ],
  },
  {
    id: "m-c2",
    kind: "multiple",
    skillId: "sk-privacy",
    prompt: "To recommend programs, which data does PathwayAI NOT need? Choose all that are unnecessary or too sensitive.",
    explanation: "Program interests are enough; home address, a photo, and a contact list are unnecessary or too sensitive for recommendations.",
    choices: [
      { id: "m-c2-a", text: "The student's exact home address.", correct: true, explanation: "Correct — not needed to recommend programs." },
      { id: "m-c2-b", text: "A photo of the student.", correct: true, explanation: "Correct — unnecessary and sensitive." },
      { id: "m-c2-c", text: "The family's full contact list.", correct: true, explanation: "Correct — exposes others who never agreed." },
      { id: "m-c2-d", text: "Which program topics the student likes.", correct: false, explanation: "This is the useful, low-risk signal the recommender actually needs." },
    ],
  },

  /* D · Misinformation investigation (1) */
  {
    id: "m-d1",
    kind: "multiple",
    skillId: "sk-misinfo",
    prompt: "A viral post claims “PathwayAI rejected 500 students last week!” with a dramatic photo. Which checks should you make before believing it? Choose all that apply.",
    explanation: "Verify the original source, the date, whether the photo's context matches, and whether independent reliable sources confirm it.",
    choices: [
      { id: "m-d1-a", text: "Find the original source of the claim.", correct: true, explanation: "Correct — trace it to a real original source." },
      { id: "m-d1-b", text: "Check the date — is it current or recycled?", correct: true, explanation: "Correct — dates are often changed on reposts." },
      { id: "m-d1-c", text: "Check whether the photo's real context matches the caption.", correct: true, explanation: "Correct — real photos are often reused out of context." },
      { id: "m-d1-d", text: "See if independent, reliable sources confirm it.", correct: true, explanation: "Correct — independent confirmation is the strongest check." },
    ],
  },
]

export const MISSION_SECTIONS: MissionSection[] = [
  { id: "A", title: "Concepts", description: "AI vs. rules, training vs. testing, confidence, and recommendation behavior.", questionIds: ["m-a1", "m-a2", "m-a3", "m-a4"] },
  { id: "B", title: "Reading the results", description: "Overall vs. group results, model mistakes, and uncertainty.", questionIds: ["m-b1", "m-b2", "m-b3"] },
  { id: "C", title: "Fairness & privacy", description: "Under-represented data, unnecessary personal data, and human review.", questionIds: ["m-c1", "m-c2"] },
  { id: "D", title: "Misinformation", description: "Source, date, context, and independent evidence.", questionIds: ["m-d1"] },
]

/* ---- E · Written recommendation ---- */

export type RecommendationDecision = "approve" | "approve-safeguards" | "limited-pilot" | "reject"

export const RECOMMENDATION_DECISIONS: { id: RecommendationDecision; label: string }[] = [
  { id: "approve", label: "Approve" },
  { id: "approve-safeguards", label: "Approve with safeguards" },
  { id: "limited-pilot", label: "Limited pilot" },
  { id: "reject", label: "Reject" },
]

export const REASON_FIELDS: { id: string; label: string; hint: string }[] = [
  { id: "benefits", label: "Benefits", hint: "What good could it do?" },
  { id: "mistakes", label: "Likely mistakes", hint: "What could go wrong?" },
  { id: "privacy", label: "Privacy", hint: "What data is and isn't needed?" },
  { id: "fairness", label: "Fairness", hint: "Who might be treated unequally?" },
  { id: "oversight", label: "Human oversight", hint: "Who reviews, and when?" },
  { id: "appeal", label: "Appeal process", hint: "How can someone challenge a result?" },
]

export type RecommendationAnswer = { decision: RecommendationDecision | ""; reasons: Record<string, string> }

export function emptyRecommendation(): RecommendationAnswer {
  return { decision: "", reasons: {} }
}

/**
 * Evaluates the written recommendation by the PRESENCE of required reasoning — a
 * decision must be chosen and every reason area must have a real answer. Any of the
 * four decisions can be valid; it is never "wrong" merely for differing from a
 * preset choice.
 */
export function evaluateRecommendation(answer: RecommendationAnswer): { complete: boolean; hasDecision: boolean; missing: string[] } {
  const hasDecision = answer.decision !== ""
  const missing = REASON_FIELDS.filter((f) => (answer.reasons[f.id] ?? "").trim().length < 3).map((f) => f.id)
  return { complete: hasDecision && missing.length === 0, hasDecision, missing }
}

export function parseRecommendation(raw: string | undefined): RecommendationAnswer {
  if (!raw) return emptyRecommendation()
  try {
    const d = JSON.parse(raw) as Partial<RecommendationAnswer>
    const decision = RECOMMENDATION_DECISIONS.some((x) => x.id === d.decision) ? (d.decision as RecommendationDecision) : ""
    const reasons: Record<string, string> = {}
    if (d.reasons && typeof d.reasons === "object") for (const f of REASON_FIELDS) reasons[f.id] = typeof (d.reasons as Record<string, unknown>)[f.id] === "string" ? (d.reasons as Record<string, string>)[f.id] : ""
    return { decision, reasons }
  } catch {
    return emptyRecommendation()
  }
}

export const MISSION_PASS_THRESHOLD = 7 // of 10 objective questions — not perfection

/* ---- Final course reflection (saved as course reflections) ---- */

export const FINAL_REFLECTION_PROMPTS: { id: string; prompt: string }[] = [
  { id: "final-r1", prompt: "What changed about how you think AI works?" },
  { id: "final-r2", prompt: "Which model mistake taught you the most?" },
  { id: "final-r3", prompt: "When should people NOT use AI?" },
  { id: "final-r4", prompt: "What would you improve in your final project?" },
  { id: "final-r5", prompt: "Which AI-related career or role interests you?" },
]

