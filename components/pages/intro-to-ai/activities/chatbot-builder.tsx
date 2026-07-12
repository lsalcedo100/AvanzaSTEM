"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUp, Plus, RotateCcw, Send, Trash2 } from "lucide-react"
import {
  TEMPLATES,
  getTemplate,
  respond,
  validateChatbot,
  initialConvoState,
  type ChatbotSpec,
  type Intent,
  type BranchOption,
  type ConvoState,
  type TurnResult,
} from "@/features/curriculums/intro-to-ai-week4-chatbot"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"
import { ConfirmDialog } from "@/components/pages/intro-to-ai/ui"

let idCounter = 1000
const uid = (p: string) => `${p}-${++idCounter}`

function parseSpec(raw: string | undefined): ChatbotSpec {
  if (raw) {
    try {
      const d = JSON.parse(raw) as ChatbotSpec
      if (d && Array.isArray(d.intents)) return d
    } catch {
      /* fall through */
    }
  }
  return getTemplate("library")!.build()
}

const kwText = (kw: string[]) => kw.join(", ")
const parseKw = (text: string) => text.split(",").map((s) => s.trim()).filter(Boolean)

type TranscriptEntry = { id: string; role: "user" | "bot"; text: string; trace?: TurnResult }

export function ChatbotBuilderActivity({ activity, progress }: ActivityComponentProps) {
  const [spec, setSpec] = useState<ChatbotSpec>(() => getTemplate("library")!.build())
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [convo, setConvo] = useState<ConvoState>(initialConvoState)
  const [input, setInput] = useState("")
  const [showTrace, setShowTrace] = useState(true)
  const [confirm, setConfirm] = useState<null | { title: string; description: string; onConfirm: () => void }>(null)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setSpec(parseSpec(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: ChatbotSpec) => {
    setSpec(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }
  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const issues = validateChatbot(spec)
  const errors = issues.filter((i) => i.level === "error")
  const warnings = issues.filter((i) => i.level === "warning")

  /* ---- spec editing ---- */
  const setField = <K extends keyof ChatbotSpec>(k: K, v: ChatbotSpec[K]) => persist({ ...spec, [k]: v })
  const updateIntent = (id: string, patch: Partial<Intent>) => persist({ ...spec, intents: spec.intents.map((i) => (i.id === id ? { ...i, ...patch } : i)) })
  const addIntent = () => persist({ ...spec, intents: [...spec.intents, { id: uid("in"), name: "New intent", keywords: [], response: "" }] })
  const removeIntent = (id: string) => persist({ ...spec, intents: spec.intents.filter((i) => i.id !== id) })
  const moveIntent = (index: number, dir: -1 | 1) => {
    const t = index + dir
    if (t < 0 || t >= spec.intents.length) return
    const intents = [...spec.intents]
    ;[intents[index], intents[t]] = [intents[t], intents[index]]
    persist({ ...spec, intents })
  }
  const addBranch = (id: string) => updateIntent(id, { branch: { question: "Which option? (type a keyword)", options: [{ id: uid("op"), label: "Option A", keywords: [], response: "" }] } })
  const removeBranch = (id: string) => updateIntent(id, { branch: undefined })
  const updateOption = (intentId: string, optId: string, patch: Partial<BranchOption>) => {
    const intent = spec.intents.find((i) => i.id === intentId)
    if (!intent?.branch) return
    updateIntent(intentId, { branch: { ...intent.branch, options: intent.branch.options.map((o) => (o.id === optId ? { ...o, ...patch } : o)) } })
  }
  const addOption = (intentId: string) => {
    const intent = spec.intents.find((i) => i.id === intentId)
    if (!intent?.branch) return
    updateIntent(intentId, { branch: { ...intent.branch, options: [...intent.branch.options, { id: uid("op"), label: "New option", keywords: [], response: "" }] } })
  }
  const removeOption = (intentId: string, optId: string) => {
    const intent = spec.intents.find((i) => i.id === intentId)
    if (!intent?.branch) return
    updateIntent(intentId, { branch: { ...intent.branch, options: intent.branch.options.filter((o) => o.id !== optId) } })
  }

  /* ---- conversation ---- */
  const send = (text: string) => {
    const message = text.trim()
    if (!message) return
    const result = respond(spec, convo, message)
    setTranscript((t) => [
      ...t,
      { id: uid("u"), role: "user", text: message },
      ...result.messages.map((m, i) => ({ id: uid("b"), role: "bot" as const, text: m, trace: i === 0 ? result : undefined })),
    ])
    setConvo(result.state)
    setInput("")
    announce(`Bot: ${result.messages[0]}`)
  }
  const restart = () => {
    setConvo(initialConvoState)
    setTranscript((t) => [...t, { id: uid("sys"), role: "bot", text: `— conversation restarted —\n${spec.welcome}` }])
    announce("Conversation restarted.")
  }
  const clearTranscript = () => {
    setTranscript([])
    setConvo(initialConvoState)
    announce("Transcript cleared. Your chatbot is unchanged.")
  }

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        "Pick a template, then edit the welcome, intents (keywords + response), a follow-up branch, and the fallback.",
        "Watch the decision-tree outline and the validation checks for dead ends, unreachable nodes, and a missing fallback.",
        "Test your bot in the live preview — try normal questions, unexpected input, and asking for a human.",
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => setConfirm({ title: "Reset the chatbot?", description: "This replaces your current chatbot with a fresh library template. This can't be undone.", onConfirm: () => { persist(getTemplate("library")!.build()); clearTranscript() } })}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Template */}
      <div className="mt-4">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Start from a template</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={spec.templateId === t.id}
              onClick={() => setConfirm({ title: `Load “${t.name}”?`, description: "This replaces your current chatbot. Your saved work for this activity will be overwritten.", onConfirm: () => { persist(t.build()); clearTranscript() } })}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                spec.templateId === t.id ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:border-avanza-green/50 hover:text-foreground"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{getTemplate(spec.templateId)?.description}</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Editor column */}
        <div>
          <h4 className="text-sm font-bold text-foreground">Build your bot</h4>

          <Field label="Welcome message" value={spec.welcome} onChange={(v) => setField("welcome", v)} loaded={progress.loaded} idBase="cb-welcome" />

          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">Intents (checked in order)</p>
          <ol className="mt-2 space-y-3">
            {spec.intents.map((intent, i) => (
              <li key={intent.id} className="rounded-md border border-border p-3">
                <div className="flex items-center gap-2">
                  <input
                    aria-label={`Intent ${i + 1} name`}
                    value={intent.name}
                    onChange={(e) => updateIntent(intent.id, { name: e.target.value })}
                    className="flex-1 rounded-md border border-border bg-card px-2 py-1 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                  />
                  <IconBtn label={`Move intent ${i + 1} up`} disabled={i === 0} onClick={() => moveIntent(i, -1)}><ArrowUp className="h-3.5 w-3.5" aria-hidden /></IconBtn>
                  <IconBtn label={`Move intent ${i + 1} down`} disabled={i === spec.intents.length - 1} onClick={() => moveIntent(i, 1)}><ArrowDown className="h-3.5 w-3.5" aria-hidden /></IconBtn>
                  <IconBtn label={`Delete intent ${intent.name}`} onClick={() => setConfirm({ title: `Delete “${intent.name}”?`, description: "This removes the intent and its follow-up.", onConfirm: () => removeIntent(intent.id) })}><Trash2 className="h-3.5 w-3.5" aria-hidden /></IconBtn>
                </div>
                <label className="mt-2 block text-xs text-muted-foreground">
                  Keywords (comma-separated)
                  <input
                    value={kwText(intent.keywords)}
                    onChange={(e) => updateIntent(intent.id, { keywords: parseKw(e.target.value) })}
                    className="mt-1 w-full rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                    placeholder="hours, open, time"
                  />
                </label>
                <label className="mt-2 block text-xs text-muted-foreground">
                  Response
                  <textarea
                    value={intent.response}
                    onChange={(e) => updateIntent(intent.id, { response: e.target.value })}
                    rows={2}
                    className="mt-1 w-full rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                  />
                </label>

                {intent.branch ? (
                  <div className="mt-2 rounded-md border border-avanza-purple/30 bg-avanza-purple/5 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wide text-avanza-purple-dark">Follow-up branch</span>
                      <IconBtn label="Remove follow-up branch" onClick={() => removeBranch(intent.id)}><Trash2 className="h-3.5 w-3.5" aria-hidden /></IconBtn>
                    </div>
                    <input
                      aria-label="Follow-up question"
                      value={intent.branch.question}
                      onChange={(e) => updateIntent(intent.id, { branch: { ...intent.branch!, question: e.target.value } })}
                      className="mt-1 w-full rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                    />
                    <ul className="mt-2 space-y-2">
                      {intent.branch.options.map((opt) => (
                        <li key={opt.id} className="rounded border border-border/70 p-2">
                          <div className="flex items-center gap-2">
                            <input aria-label="Option label" value={opt.label} onChange={(e) => updateOption(intent.id, opt.id, { label: e.target.value })} className="flex-1 rounded border border-border bg-card px-2 py-0.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green" />
                            <IconBtn label={`Delete option ${opt.label}`} onClick={() => removeOption(intent.id, opt.id)}><Trash2 className="h-3 w-3" aria-hidden /></IconBtn>
                          </div>
                          <input aria-label="Option keywords" value={kwText(opt.keywords)} onChange={(e) => updateOption(intent.id, opt.id, { keywords: parseKw(e.target.value) })} placeholder="keywords" className="mt-1 w-full rounded border border-border bg-card px-2 py-0.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green" />
                          <input aria-label="Option response" value={opt.response} onChange={(e) => updateOption(intent.id, opt.id, { response: e.target.value })} placeholder="response" className="mt-1 w-full rounded border border-border bg-card px-2 py-0.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green" />
                        </li>
                      ))}
                    </ul>
                    <button type="button" onClick={() => addOption(intent.id)} className="mt-2 inline-flex items-center gap-1 rounded border border-border px-2 py-0.5 text-xs font-semibold text-foreground hover:border-avanza-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"><Plus className="h-3 w-3" aria-hidden /> Add option</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => addBranch(intent.id)} className="mt-2 inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:border-avanza-green/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"><Plus className="h-3 w-3" aria-hidden /> Add follow-up branch</button>
                )}
              </li>
            ))}
          </ol>
          <button type="button" onClick={addIntent} className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"><Plus className="h-3.5 w-3.5" aria-hidden /> Add intent</button>

          <Field label="Fallback response (unsupported input)" value={spec.fallback} onChange={(v) => setField("fallback", v)} loaded={progress.loaded} idBase="cb-fallback" />
          <Field label="Human-help option" value={spec.humanHelp} onChange={(v) => setField("humanHelp", v)} loaded={progress.loaded} idBase="cb-human" />
          <Field label="Privacy boundary" value={spec.privacyNote} onChange={(v) => setField("privacyNote", v)} loaded={progress.loaded} idBase="cb-priv" />
          <Field label="Ending / restart note" value={spec.endingNote} onChange={(v) => setField("endingNote", v)} loaded={progress.loaded} idBase="cb-end" />
        </div>

        {/* Outline + validation + preview column */}
        <div>
          <h4 className="text-sm font-bold text-foreground">Decision-tree outline</h4>
          <TreeOutline spec={spec} issues={issues} />

          <div className="mt-4 rounded-md border border-border p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Checks</p>
            {errors.length === 0 && warnings.length === 0 ? (
              <p className="mt-1 text-sm text-avanza-green-dark">All checks pass — no dead ends, unreachable nodes, or missing fallback.</p>
            ) : (
              <ul className="mt-1 space-y-1 text-sm">
                {errors.map((e, i) => (
                  <li key={`e${i}`} className="text-avanza-orange-dark">⚠ {e.message}</li>
                ))}
                {warnings.map((w, i) => (
                  <li key={`w${i}`} className="text-muted-foreground">Note: {w.message}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Live preview */}
          <div className="mt-4 rounded-md border border-border">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
              <p className="text-sm font-bold text-foreground">Live preview</p>
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <input type="checkbox" checked={showTrace} onChange={(e) => setShowTrace(e.target.checked)} className="focus-visible:ring-2 focus-visible:ring-avanza-green" /> Show rule trace
                </label>
              </div>
            </div>
            <p className="px-3 pt-2 text-xs text-avanza-orange-dark">{spec.privacyNote}</p>
            <div className="max-h-72 overflow-y-auto px-3 py-2" role="log" aria-label="Chat transcript" aria-live="polite">
              {transcript.length === 0 ? (
                <p className="text-sm text-muted-foreground">Send a message to test your bot. Try a keyword, an unexpected message, or “talk to a person”.</p>
              ) : (
                <ul className="space-y-2">
                  {transcript.map((entry) => (
                    <li key={entry.id} className={entry.role === "user" ? "text-right" : "text-left"}>
                      <span className={`inline-block whitespace-pre-line rounded-md px-3 py-1.5 text-sm ${entry.role === "user" ? "bg-avanza-green/15 text-foreground" : "bg-secondary text-foreground"}`}>
                        <span className="sr-only">{entry.role === "user" ? "You said: " : "Bot said: "}</span>
                        {entry.text}
                      </span>
                      {showTrace && entry.trace && (
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {entry.trace.usedFallback ? "↳ Fallback: " : `↳ Matched ${entry.trace.matchedLabel}: `}
                          {entry.trace.explanation}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-border px-3 py-2"
            >
              <label htmlFor="cb-input" className="sr-only">Your message</label>
              <input id="cb-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" className="flex-1 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green" />
              <button type="submit" aria-label="Send message" className="inline-flex items-center rounded-md bg-avanza-green px-3 py-1.5 text-sm font-bold text-avanza-dark hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"><Send className="h-4 w-4" aria-hidden /></button>
            </form>
            <div className="flex flex-wrap gap-2 border-t border-border px-3 py-2">
              <PreviewBtn onClick={() => send("do you sell pizza on the moon")}>Test unexpected input</PreviewBtn>
              <PreviewBtn onClick={() => send("can I talk to a person")}>Ask for a human</PreviewBtn>
              <PreviewBtn onClick={restart}><RotateCcw className="mr-1 h-3 w-3" aria-hidden />Restart chat</PreviewBtn>
              <PreviewBtn onClick={clearTranscript}>Clear transcript</PreviewBtn>
            </div>
          </div>

          {/* Transcript log */}
          {transcript.some((t) => t.trace) && (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Test transcript log</p>
              <div className="mt-1 overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <caption className="sr-only">A log of each user message, the matched intent or fallback, the branch path, and whether the fallback was used.</caption>
                  <thead>
                    <tr className="text-left">
                      <th className="border-b border-border px-2 py-1 font-semibold text-foreground">You said</th>
                      <th className="border-b border-border px-2 py-1 font-semibold text-foreground">Matched</th>
                      <th className="border-b border-border px-2 py-1 font-semibold text-foreground">Fallback?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transcript.filter((t) => t.trace).map((t) => (
                      <tr key={`log-${t.id}`}>
                        <td className="border-b border-border/60 px-2 py-1 text-muted-foreground">{transcriptUserFor(transcript, t.id)}</td>
                        <td className="border-b border-border/60 px-2 py-1 text-foreground">{t.trace!.matchedLabel}</td>
                        <td className="border-b border-border/60 px-2 py-1">{t.trace!.usedFallback ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirm !== null}
        title={confirm?.title ?? ""}
        description={confirm?.description ?? ""}
        confirmLabel="Yes, continue"
        destructive
        onConfirm={() => {
          confirm?.onConfirm()
          setConfirm(null)
        }}
        onCancel={() => setConfirm(null)}
      />
    </ActivityFrame>
  )
}

/** Finds the user message immediately preceding a bot entry (for the log table). */
function transcriptUserFor(transcript: TranscriptEntry[], botId: string): string {
  const idx = transcript.findIndex((t) => t.id === botId)
  for (let i = idx - 1; i >= 0; i--) if (transcript[i].role === "user") return transcript[i].text
  return "—"
}

function Field({ label, value, onChange, idBase }: { label: string; value: string; onChange: (v: string) => void; loaded: boolean; idBase: string }) {
  return (
    <label htmlFor={idBase} className="mt-4 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
      {label}
      <textarea id={idBase} value={value} onChange={(e) => onChange(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-border bg-card px-2 py-1 text-sm font-normal normal-case text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green" />
    </label>
  )
}

function TreeOutline({ spec, issues }: { spec: ChatbotSpec; issues: ReturnType<typeof validateChatbot> }) {
  const flagFor = (nodeId: string) => issues.filter((i) => i.nodeId === nodeId)
  return (
    <div className="mt-2 rounded-md border border-border p-3 text-sm">
      <ul className="space-y-1">
        <li className="font-semibold text-foreground">▸ Welcome: <span className="font-normal text-muted-foreground">{spec.welcome || "(empty)"}</span></li>
        {spec.intents.map((intent) => {
          const flags = flagFor(intent.id)
          return (
            <li key={intent.id} className="border-l border-border pl-3">
              <span className="font-medium text-foreground">If keyword [{intent.keywords.join(", ") || "—"}] → {intent.name}</span>
              {flags.map((f, i) => (
                <span key={i} className={`ml-2 text-xs ${f.level === "error" ? "text-avanza-orange-dark" : "text-muted-foreground"}`}>({f.message})</span>
              ))}
              {intent.branch && (
                <ul className="mt-0.5 space-y-0.5 border-l border-border pl-3">
                  <li className="text-xs text-muted-foreground">? {intent.branch.question}</li>
                  {intent.branch.options.map((o) => {
                    const of = flagFor(o.id)
                    return (
                      <li key={o.id} className="text-xs text-foreground">
                        → [{o.keywords.join(", ") || "—"}] {o.label}
                        {of.map((f, i) => (
                          <span key={i} className="ml-1 text-avanza-orange-dark">({f.message})</span>
                        ))}
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
        <li className="font-semibold text-foreground">▸ Fallback: <span className="font-normal text-muted-foreground">{spec.fallback || "(missing!)"}</span></li>
      </ul>
    </div>
  )
}

function IconBtn({ label, disabled, onClick, children }: { label: string; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} className="inline-flex h-6 w-6 items-center justify-center rounded border border-border text-foreground hover:border-avanza-green/60 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1">
      {children}
    </button>
  )
}

function PreviewBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center rounded-md border border-border px-2 py-1 text-xs font-semibold text-muted-foreground hover:border-avanza-green/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1">
      {children}
    </button>
  )
}
