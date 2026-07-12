"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"
import {
  BODY_COLORS,
  BODY_SHAPES,
  CREATURE_CATEGORIES,
  STARTER_CREATURES,
  WITHHELD_CREATURES,
  classify,
  describeRule,
  fieldType,
  runRulesOver,
  validateRuleSet,
  type Creature,
  type Rule,
  type RuleField,
  type RuleOp,
  RULE_FIELDS,
} from "@/features/curriculums/intro-to-ai-week1-activities"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"

type RBState = {
  rules: Rule[]
  predictions: Record<string, string>
  revealed: boolean
  revision: string
}

const DEFAULT_RULES: Rule[] = [
  { id: "r1", field: "hasWings", op: "is", value: true, category: "Sky Creature" },
  { id: "r2", field: "livesInWater", op: "is", value: true, category: "Water Creature" },
  { id: "r3", field: "legs", op: "atLeast", value: 1, category: "Land Creature" },
]

const EMPTY: RBState = { rules: DEFAULT_RULES, predictions: {}, revealed: false, revision: "" }

function parseState(raw: string | undefined): RBState {
  if (!raw) return EMPTY
  try {
    const d = JSON.parse(raw) as Partial<RBState>
    return {
      rules: Array.isArray(d.rules) && d.rules.length > 0 ? (d.rules as Rule[]) : DEFAULT_RULES,
      predictions: d.predictions && typeof d.predictions === "object" ? (d.predictions as Record<string, string>) : {},
      revealed: d.revealed === true,
      revision: typeof d.revision === "string" ? d.revision : "",
    }
  } catch {
    return EMPTY
  }
}

let ruleCounter = 100
const nextRuleId = () => `r${++ruleCounter}`

function defaultOpFor(field: RuleField): RuleOp {
  return fieldType(field) === "boolean" ? "is" : fieldType(field) === "number" ? "atLeast" : "equals"
}

function defaultValueFor(field: RuleField): string | number | boolean {
  const t = fieldType(field)
  return t === "boolean" ? true : t === "number" ? 1 : BODY_COLORS[0]
}

export function RuleBuilderActivity({ activity, progress }: ActivityComponentProps) {
  const [state, setState] = useState<RBState>(EMPTY)
  const [ranStarters, setRanStarters] = useState(false)
  const [ranWithheld, setRanWithheld] = useState(false)
  const [issues, setIssues] = useState<string[]>([])
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: RBState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }

  const updateRule = (id: string, patch: Partial<Rule>) =>
    persist({ ...state, rules: state.rules.map((r) => (r.id === id ? { ...r, ...patch } : r)) })

  const addRule = () =>
    persist({
      ...state,
      rules: [...state.rules, { id: nextRuleId(), field: "hasWings", op: "is", value: true, category: CREATURE_CATEGORIES[0] }],
    })

  const removeRule = (id: string) => persist({ ...state, rules: state.rules.filter((r) => r.id !== id) })

  const moveRule = (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= state.rules.length) return
    const rules = [...state.rules]
    ;[rules[index], rules[target]] = [rules[target], rules[index]]
    persist({ ...state, rules })
  }

  const runStarters = () => {
    const v = validateRuleSet(state.rules)
    setIssues(v.issues)
    if (!v.valid) return
    setRanStarters(true)
    announce(`Ran ${state.rules.length} rules on ${STARTER_CREATURES.length} starter creatures.`)
  }

  const runWithheld = () => {
    const v = validateRuleSet(state.rules)
    setIssues(v.issues)
    if (!v.valid) return
    setRanWithheld(true)
    announce(`Ran your rules on ${WITHHELD_CREATURES.length} tricky creatures. Compare with your predictions.`)
  }

  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const starterRuns = ranStarters ? runRulesOver(state.rules, STARTER_CREATURES) : []
  const withheldRuns = ranWithheld ? runRulesOver(state.rules, WITHHELD_CREATURES) : []
  const starterAgree = starterRuns.filter((r) => r.agrees).length

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        "Build an ordered list of rules. Rules are checked top to bottom; the first match wins.",
        "Run your rules on the starter creatures to see which rule matched each one.",
        "Then reveal the tricky creatures, predict what your rules will do, and revise.",
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        setRanStarters(false)
        setRanWithheld(false)
        setIssues([])
        persist(EMPTY)
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Rule editor */}
      <h4 className="mt-4 text-sm font-bold text-foreground">Your rules (checked in order)</h4>
      <ol className="mt-2 space-y-2">
        {state.rules.map((rule, i) => (
          <li key={rule.id} className="rounded-md border border-border bg-card p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">Rule {i + 1}</span>
              <RuleEditor rule={rule} onChange={(patch) => updateRule(rule.id, patch)} />
              <span className="ml-auto flex gap-1">
                <IconBtn label={`Move rule ${i + 1} up`} disabled={i === 0} onClick={() => moveRule(i, -1)}>
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                </IconBtn>
                <IconBtn label={`Move rule ${i + 1} down`} disabled={i === state.rules.length - 1} onClick={() => moveRule(i, 1)}>
                  <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                </IconBtn>
                <IconBtn label={`Delete rule ${i + 1}`} onClick={() => removeRule(rule.id)}>
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                </IconBtn>
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{describeRule(rule)}</p>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={addRule}
        className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden /> Add a rule
      </button>

      {issues.length > 0 && (
        <div className="mt-3 rounded-md border border-avanza-orange/40 bg-avanza-orange/10 p-3 text-sm text-avanza-orange-dark" role="alert">
          <p className="font-semibold">Fix these before running:</p>
          <ul className="mt-1 list-disc pl-5">
            {issues.map((iss, i) => (
              <li key={i}>{iss}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Run on starters */}
      <div className="mt-5">
        <button
          type="button"
          onClick={runStarters}
          className="inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          Run my rules on the examples
        </button>
        {ranStarters && (
          <div className="mt-3">
            <p className="text-sm text-muted-foreground">
              {starterAgree} of {starterRuns.length} matched the expected category.
            </p>
            <RunTable runs={starterRuns} creatures={STARTER_CREATURES} rules={state.rules} />
          </div>
        )}
      </div>

      {/* Withheld / tricky creatures */}
      {ranStarters && (
        <div className="mt-8 border-t border-border pt-6">
          <h4 className="text-sm font-bold text-foreground">Tricky creatures</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            These new creatures are designed to trip up simple rules. Predict what your rules will do, then run them.
          </p>
          {!state.revealed ? (
            <button
              type="button"
              onClick={() => persist({ ...state, revealed: true })}
              className="mt-3 inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-avanza-green-dark transition-colors hover:border-avanza-green hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              Reveal the tricky creatures
            </button>
          ) : (
            <div className="mt-4 space-y-4">
              {WITHHELD_CREATURES.map((creature) => (
                <WithheldCard
                  key={creature.id}
                  creature={creature}
                  prediction={state.predictions[creature.id] ?? ""}
                  onPredict={(cat) => persist({ ...state, predictions: { ...state.predictions, [creature.id]: cat } })}
                  result={ranWithheld ? classify(state.rules, creature) : null}
                />
              ))}

              <button
                type="button"
                onClick={runWithheld}
                className="inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
              >
                Run my rules on the tricky creatures
              </button>

              {ranWithheld && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {withheldRuns.filter((r) => r.agrees).length} of {withheldRuns.length} matched the expected category. Where your rules
                    disagreed, revise them below.
                  </p>
                  <label htmlFor="rb-revision" className="mt-3 block text-sm font-medium text-foreground">
                    Why did your original rules fail, and what did you change?
                  </label>
                  <textarea
                    id="rb-revision"
                    key={`rb-revision:${progress.loaded}`}
                    defaultValue={state.revision}
                    onBlur={(e) => persist({ ...state, revision: e.target.value })}
                    rows={3}
                    className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                    placeholder="e.g. My 'has wings → Sky' rule sent Divewing to the sky, but it lives underwater."
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Learning comparison */}
      <div className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-sm font-bold text-foreground">Fixed-rule program (what you just built)</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>A human writes explicit rules</li>
            <li>Behavior is predictable and easy to explain</li>
            <li>Can fail when a situation wasn&apos;t covered</li>
          </ul>
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-sm font-bold text-foreground">Machine-learning system</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Learns patterns from examples</li>
            <li>May handle varied examples better</li>
            <li>Can make mistakes that are hard to explain</li>
            <li>Still depends on human choices and the data it&apos;s given</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground sm:col-span-2">
          Neither is always better. Fixed rules shine when the rule is clear; machine learning helps when the pattern is too messy to write
          by hand — but it needs good examples and careful checking.
        </p>
      </div>
    </ActivityFrame>
  )
}

function RuleEditor({ rule, onChange }: { rule: Rule; onChange: (patch: Partial<Rule>) => void }) {
  const type = fieldType(rule.field)
  const selectCls =
    "rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"

  return (
    <span className="flex flex-wrap items-center gap-1.5">
      <span className="text-sm text-muted-foreground">If</span>
      <label className="sr-only">Feature</label>
      <select
        className={selectCls}
        value={rule.field}
        onChange={(e) => {
          const field = e.target.value as RuleField
          onChange({ field, op: defaultOpFor(field), value: defaultValueFor(field) })
        }}
      >
        {RULE_FIELDS.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label}
          </option>
        ))}
      </select>

      <label className="sr-only">Condition</label>
      {type === "boolean" ? (
        <select className={selectCls} value={rule.op} onChange={(e) => onChange({ op: e.target.value as RuleOp })}>
          <option value="is">is true</option>
          <option value="isNot">is false</option>
        </select>
      ) : type === "number" ? (
        <>
          <select className={selectCls} value={rule.op} onChange={(e) => onChange({ op: e.target.value as RuleOp })}>
            <option value="atLeast">is at least</option>
            <option value="atMost">is at most</option>
            <option value="equals">equals</option>
          </select>
          <label className="sr-only">Value</label>
          <input
            type="number"
            min={0}
            className={`${selectCls} w-16`}
            value={Number(rule.value)}
            onChange={(e) => onChange({ value: Number(e.target.value) })}
          />
        </>
      ) : (
        <>
          <span className="text-sm text-muted-foreground">is</span>
          <label className="sr-only">Value</label>
          <select className={selectCls} value={String(rule.value)} onChange={(e) => onChange({ value: e.target.value })}>
            {(rule.field === "bodyShape" ? BODY_SHAPES : BODY_COLORS).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </>
      )}

      <span className="text-sm text-muted-foreground">then</span>
      <label className="sr-only">Category</label>
      <select className={selectCls} value={rule.category} onChange={(e) => onChange({ category: e.target.value })}>
        {CREATURE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </span>
  )
}

function RunTable({ runs, creatures, rules }: { runs: ReturnType<typeof runRulesOver>; creatures: Creature[]; rules: Rule[] }) {
  const ruleIndex = (id: string | null) => (id ? rules.findIndex((r) => r.id === id) + 1 : null)
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-left">
            <th className="border-b border-border px-2 py-2 font-semibold text-foreground">Creature</th>
            <th className="border-b border-border px-2 py-2 font-semibold text-foreground">Matched rule</th>
            <th className="border-b border-border px-2 py-2 font-semibold text-foreground">Your rules say</th>
            <th className="border-b border-border px-2 py-2 font-semibold text-foreground">Expected</th>
            <th className="border-b border-border px-2 py-2 font-semibold text-foreground">Agrees?</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => {
            const creature = creatures.find((c) => c.id === run.creatureId)!
            const ri = ruleIndex(run.matchedRuleId)
            return (
              <tr key={run.creatureId}>
                <td className="border-b border-border/60 px-2 py-2 text-foreground">{creature.name}</td>
                <td className="border-b border-border/60 px-2 py-2 text-muted-foreground">{ri ? `Rule ${ri}` : "No rule matched"}</td>
                <td className="border-b border-border/60 px-2 py-2 text-foreground">{run.predictedCategory ?? "Unclassified"}</td>
                <td className="border-b border-border/60 px-2 py-2 text-muted-foreground">{run.canonicalCategory}</td>
                <td className="border-b border-border/60 px-2 py-2">
                  {run.agrees ? (
                    <span className="font-semibold text-avanza-green-dark">Yes ✓</span>
                  ) : (
                    <span className="font-semibold text-avanza-orange-dark">No — differs ✕</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function WithheldCard({
  creature,
  prediction,
  onPredict,
  result,
}: {
  creature: Creature
  prediction: string
  onPredict: (cat: string) => void
  result: { category: string | null } | null
}) {
  return (
    <div className="rounded-md border border-border p-4">
      <div className="flex items-start gap-3">
        <CreatureGlyph creature={creature} />
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">{creature.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{creature.description}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <label htmlFor={`predict-${creature.id}`} className="text-xs font-semibold text-muted-foreground">
          Your prediction:
        </label>
        <select
          id={`predict-${creature.id}`}
          value={prediction}
          onChange={(e) => onPredict(e.target.value)}
          className="rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
        >
          <option value="">Choose…</option>
          {CREATURE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="Unclassified">No rule will match</option>
        </select>
      </div>
      {result && (
        <p className="mt-3 rounded-md bg-secondary px-3 py-2 text-sm" aria-live="polite">
          <span className="text-muted-foreground">Your rules said: </span>
          <span className="font-semibold text-foreground">{result.category ?? "Unclassified"}</span>
          <span className="text-muted-foreground"> · Expected: </span>
          <span className="font-semibold text-foreground">{creature.canonicalCategory}</span>
          {prediction && (
            <>
              <span className="text-muted-foreground"> · You predicted: </span>
              <span className="font-semibold text-foreground">{prediction}</span>
            </>
          )}
        </p>
      )}
    </div>
  )
}

const COLOR_HEX: Record<string, string> = {
  yellow: "#eab308",
  blue: "#3b82f6",
  green: "#22c55e",
  brown: "#a16207",
  gray: "#6b7280",
}

/** Restrained, abstract creature glyph built from features. Not a mascot; the
 *  text description is the source of truth (used as the accessible label). */
function CreatureGlyph({ creature }: { creature: Creature }) {
  const f = creature.features
  const fill = COLOR_HEX[f.bodyColor] ?? "#6b7280"
  return (
    <svg viewBox="0 0 64 64" width={56} height={56} role="img" aria-label={creature.description} className="flex-none rounded-md border border-border bg-secondary/40">
      {f.livesInWater && (
        <path d="M4 50 q8 -6 16 0 t16 0 t16 0 t16 0" fill="none" stroke="currentColor" className="text-avanza-teal" strokeWidth="1.5" opacity="0.7" />
      )}
      {f.canGlow && <circle cx="32" cy="30" r="20" fill="none" stroke={fill} strokeWidth="1" strokeDasharray="2 3" opacity="0.8" />}
      {f.hasWings && (
        <>
          <path d="M32 28 L14 18 L20 32 Z" fill={fill} opacity="0.55" />
          <path d="M32 28 L50 18 L44 32 Z" fill={fill} opacity="0.55" />
        </>
      )}
      {f.bodyShape === "long" ? (
        <rect x="18" y="26" width="28" height="12" rx="6" fill={fill} />
      ) : f.bodyShape === "spiky" ? (
        <polygon points="32,18 40,30 36,42 28,42 24,30" fill={fill} />
      ) : f.bodyShape === "finned" ? (
        <>
          <ellipse cx="32" cy="32" rx="12" ry="9" fill={fill} />
          <path d="M32 23 L36 15 L40 24 Z" fill={fill} opacity="0.7" />
        </>
      ) : (
        <circle cx="32" cy="32" r="11" fill={fill} />
      )}
      {f.hasAntennae && (
        <>
          <line x1="28" y1="23" x2="24" y2="14" stroke={fill} strokeWidth="1.5" />
          <line x1="36" y1="23" x2="40" y2="14" stroke={fill} strokeWidth="1.5" />
        </>
      )}
      {Array.from({ length: Math.min(f.legs, 6) }).map((_, i) => (
        <line
          key={i}
          x1={24 + i * 3}
          y1="42"
          x2={22 + i * 3}
          y2="50"
          stroke={fill}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}

function IconBtn({ label, disabled, onClick, children }: { label: string; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"
    >
      {children}
    </button>
  )
}
