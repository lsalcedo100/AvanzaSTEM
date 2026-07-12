"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Plus, Printer, Trash2 } from "lucide-react"
import {
  PROJECT_TYPES,
  TEST_KINDS,
  STUDIO_ACTIVITY_ID,
  emptyProject,
  parseStudio,
  getProjectType,
  changeType,
  typeSpecificFilled,
  validateProject,
  completionSummary,
  projectComplete,
  summarizeImport,
  type StudioProject,
  type ProjectType,
  type TestCase,
  type TestKind,
  type Requirement,
} from "@/features/curriculums/intro-to-ai-final-project"
import { introToAiPath } from "@/features/curriculums/intro-to-ai"
import { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { Breadcrumbs } from "@/components/pages/intro-to-ai/shared"
import { SaveState, ConfirmDialog } from "@/components/pages/intro-to-ai/ui"
import { PrintButton } from "@/components/ui/print-button"

const SECTION_ORDER = [
  "Setup",
  "Define the problem",
  "Is AI appropriate?",
  "Inputs & outputs",
  "Data / rules plan",
  "Prototype",
  "Test cases",
  "Mistakes & limitations",
  "Privacy review",
  "Fairness review",
  "Human oversight & appeal",
  "Presentation",
] as const
type SectionName = (typeof SECTION_ORDER)[number]

let tcCounter = 0
const nextTcId = () => `tc-${Date.now()}-${++tcCounter}`

export function IntroToAiFinalProjectContent() {
  const p = useIntroToAiProgress()
  const [project, setProject] = useState<StudioProject>(emptyProject)
  const [section, setSection] = useState<SectionName>("Setup")
  const [presenting, setPresenting] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [confirm, setConfirm] = useState<null | { title: string; description: string; onConfirm: () => void }>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const announceRef = useRef<HTMLParagraphElement>(null)
  const hydrated = useRef(false)

  // Hydrate exactly once when storage is ready, so a later debounced save (which
  // updates the progress object) can never clobber in-flight edits.
  useEffect(() => {
    if (p.loaded && !hydrated.current) {
      hydrated.current = true
      setProject(parseStudio(p.progress.activities[STUDIO_ACTIVITY_ID]))
    }
  }, [p.loaded, p.progress.activities])

  const saveActivity = p.saveActivity
  const commit = useCallback(
    (next: StudioProject) => {
      saveActivity(STUDIO_ACTIVITY_ID, JSON.stringify({ ...next, updatedAt: new Date().toISOString() }))
      setDirty(false)
    },
    [saveActivity],
  )

  // Debounced auto-save (600ms after the last edit).
  const update = useCallback(
    (next: StudioProject) => {
      setProject(next)
      setDirty(true)
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => commit(next), 600)
    },
    [commit],
  )

  // Before-unload protection only when there is genuinely unsaved data.
  useEffect(() => {
    if (!dirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [dirty])

  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const requirements = validateProject(project)
  const summary = completionSummary(project)
  const complete = projectComplete(project)
  const typeDef = getProjectType(project.type)

  const sectionStatus = (name: SectionName): "empty" | "started" | "done" => {
    const reqs = requirements.filter((r) => r.section === name)
    if (reqs.length === 0) return "started"
    const met = reqs.filter((r) => r.met).length
    if (met === 0) return "empty"
    return met === reqs.length ? "done" : "started"
  }

  /* ---- generic field setter ---- */
  function set<S extends keyof StudioProject>(sec: S, key: keyof StudioProject[S], value: string) {
    update({ ...project, [sec]: { ...(project[sec] as object), [key]: value } } as StudioProject)
  }

  /* ---- type change ---- */
  const pickType = (t: ProjectType) => {
    if (project.type === t) return
    if (project.type && typeSpecificFilled(project)) {
      setConfirm({
        title: "Change project type?",
        description: "Your data/rules plan and prototype are tied to the current type and will be cleared. The rest of your project is kept.",
        onConfirm: () => {
          update(changeType(project, t))
          announce(`Project type changed to ${getProjectType(t)!.name}.`)
        },
      })
    } else {
      update({ ...project, type: t })
    }
  }

  /* ---- tests ---- */
  const addTest = () => {
    const covered = new Set(project.tests.map((t) => t.kind))
    const kind = (TEST_KINDS.find((k) => !covered.has(k.id))?.id ?? "normal") as TestKind
    update({ ...project, tests: [...project.tests, { id: nextTcId(), kind, input: "", expected: "", actual: "", pass: "", explanation: "", improvement: "" }] })
  }
  const setTest = (id: string, patch: Partial<TestCase>) => update({ ...project, tests: project.tests.map((t) => (t.id === id ? { ...t, ...patch } : t)) })
  const removeTest = (id: string) => update({ ...project, tests: project.tests.filter((t) => t.id !== id) })

  /* ---- import ---- */
  const doImport = () => {
    if (!typeDef?.importSourceId) return
    const result = summarizeImport(typeDef.importSourceId, p.progress.activities[typeDef.importSourceId])
    update({ ...project, prototype: { ...project.prototype, importSource: typeDef.importSourceId, importSnapshot: result.summary } })
    announce(result.ok ? "Imported your earlier work." : result.summary)
  }

  if (presenting) return <Presentation project={project} onExit={() => setPresenting(false)} />

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Breadcrumbs trail={[{ label: "Intro to AI", href: introToAiPath }, { label: "Final project studio" }]} />
          <div className="flex items-center gap-3">
            <SaveState status={p.saveStatus} idleHint="Auto-saves on this device" />
          </div>
        </div>
        <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

        <header className="mt-6 border-b border-border pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Week 6 · Final Project Studio</p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">Design a responsible AI project</h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">
            Work through each section like a design notebook. Your draft saves automatically on this device — nothing is sent anywhere. Don&apos;t include your full name, school, or contact details.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className={`text-sm font-semibold ${complete ? "text-avanza-green-dark" : "text-muted-foreground"}`}>
              {complete ? "All required sections complete" : `${summary.met} of ${summary.total} required items done`}
            </span>
            <button
              type="button"
              onClick={() => setPresenting(true)}
              className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:border-avanza-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              Presentation mode
            </button>
            <button
              type="button"
              onClick={() => setConfirm({ title: "Reset the whole project?", description: "This clears every section and can't be undone. Your other course work is not affected.", onConfirm: () => { update(emptyProject()); setSection("Setup"); announce("Project reset.") } })}
              className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:border-avanza-orange/60 hover:text-avanza-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-2"
            >
              Reset project
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-8 md:grid-cols-[16rem_1fr]">
          {/* Section navigation (vertical list, not a horizontal-only stepper) */}
          <nav aria-label="Project sections">
            <ol className="space-y-1">
              {SECTION_ORDER.map((name, i) => {
                const status = sectionStatus(name)
                const active = name === section
                return (
                  <li key={name}>
                    <button
                      type="button"
                      aria-current={active ? "step" : undefined}
                      onClick={() => setSection(name)}
                      className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                        active ? "border-avanza-green bg-avanza-green/10 font-semibold text-foreground" : "border-transparent text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[10px] font-bold ${
                          status === "done" ? "border-avanza-green bg-avanza-green/20 text-avanza-green-dark" : status === "started" ? "border-avanza-purple/50 text-avanza-purple-dark" : "border-border text-muted-foreground"
                        }`}
                        aria-hidden
                      >
                        {status === "done" ? "✓" : i}
                      </span>
                      <span className="flex-1">{i}. {name}</span>
                      <span className="sr-only">
                        {status === "done" ? " (complete)" : status === "started" ? " (in progress)" : " (not started)"}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          {/* Section editor */}
          <div>
            {section === "Setup" && <SetupSection project={project} onPick={pickType} />}
            {section === "Define the problem" && <DefineSection project={project} set={set} />}
            {section === "Is AI appropriate?" && <AppropriatenessSection project={project} set={set} />}
            {section === "Inputs & outputs" && <IoSection project={project} set={set} />}
            {section === "Data / rules plan" && <PlanSection project={project} update={update} typeDef={typeDef} />}
            {section === "Prototype" && <PrototypeSection project={project} set={set} typeDef={typeDef} onImport={doImport} notUsingAi={project.appropriateness.useAi === "no"} />}
            {section === "Test cases" && <TestsSection project={project} addTest={addTest} setTest={setTest} removeTest={removeTest} />}
            {section === "Mistakes & limitations" && <LimitationsSection project={project} set={set} />}
            {section === "Privacy review" && <PrivacySection project={project} set={set} />}
            {section === "Fairness review" && <FairnessSection project={project} set={set} />}
            {section === "Human oversight & appeal" && <OversightSection project={project} set={set} />}
            {section === "Presentation" && <WrapUpSection project={project} set={set} onPresent={() => setPresenting(true)} remaining={summary.remaining} />}
          </div>
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
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared field helpers                                                        */
/* -------------------------------------------------------------------------- */

function TextArea({ id, label, hint, value, onChange, rows = 2 }: { id: string; label: string; hint?: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">{label}</label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green" />
    </div>
  )
}

function SectionShell({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section aria-label={title}>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      {intro && <p className="mt-1 text-sm text-muted-foreground">{intro}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

type SetFn = <S extends keyof StudioProject>(sec: S, key: keyof StudioProject[S], value: string) => void

/* -------------------------------------------------------------------------- */
/* Sections                                                                    */
/* -------------------------------------------------------------------------- */

function SetupSection({ project, onPick }: { project: StudioProject; onPick: (t: ProjectType) => void }) {
  return (
    <SectionShell title="Choose a project type" intro="Pick a direction. You can change it later — your problem, privacy, fairness, and oversight work is kept, but the data plan and prototype (which are tied to the type) will be cleared.">
      <div className="space-y-3" role="radiogroup" aria-label="Project type">
        {PROJECT_TYPES.map((t) => {
          const selected = project.type === t.id
          return (
            <button key={t.id} type="button" role="radio" aria-checked={selected} onClick={() => onPick(t.id)} className={`block w-full rounded-lg border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 ${selected ? "border-avanza-green bg-avanza-green/10" : "border-border hover:border-avanza-green/50 hover:bg-avanza-green/5"}`}>
              <span className="block text-sm font-bold text-foreground">{t.name}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{t.summary}</span>
            </button>
          )
        })}
      </div>
    </SectionShell>
  )
}

function DefineSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const d = project.define
  return (
    <SectionShell title="1 · Define the problem" intro="Start from a real need — not a vague “AI app”.">
      <TextArea id="d-title" label="Problem title" value={d.title} onChange={(v) => set("define", "title", v)} />
      <TextArea id="d-who" label="Who experiences this problem?" value={d.who} onChange={(v) => set("define", "who", v)} />
      <TextArea id="d-why" label="Why does it matter?" value={d.whyMatters} onChange={(v) => set("define", "whyMatters", v)} />
      <TextArea id="d-cur" label="How is it handled now?" value={d.currentHandling} onChange={(v) => set("define", "currentHandling", v)} />
      <TextArea id="d-ev" label="Evidence the problem actually exists" hint="How do you know it's real? Who says so?" value={d.evidence} onChange={(v) => set("define", "evidence", v)} />
    </SectionShell>
  )
}

function AppropriatenessSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const a = project.appropriateness
  return (
    <SectionShell title="2 · Should you use AI?" intro="Compare the options honestly. It's a valid, respected answer that AI should NOT be used.">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Compare the approaches</p>
      <TextArea id="a-ai" label="AI / machine-learning system" value={a.optionAi} onChange={(v) => set("appropriateness", "optionAi", v)} />
      <TextArea id="a-rules" label="Traditional rule-based program" value={a.optionRules} onChange={(v) => set("appropriateness", "optionRules", v)} />
      <TextArea id="a-check" label="Checklist or search tool" value={a.optionChecklist} onChange={(v) => set("appropriateness", "optionChecklist", v)} />
      <TextArea id="a-human" label="Human decision" value={a.optionHuman} onChange={(v) => set("appropriateness", "optionHuman", v)} />
      <TextArea id="a-combo" label="Combination of tools + human review" value={a.optionCombination} onChange={(v) => set("appropriateness", "optionCombination", v)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextArea id="a-pat" label="Does it involve patterns or predictions?" value={a.patterns} onChange={(v) => set("appropriateness", "patterns", v)} />
        <TextArea id="a-rc" label="Could clear rules solve it?" value={a.rulesCould} onChange={(v) => set("appropriateness", "rulesCould", v)} />
        <TextArea id="a-iw" label="What happens if the system is wrong?" value={a.ifWrong} onChange={(v) => set("appropriateness", "ifWrong", v)} />
        <TextArea id="a-hs" label="Is the decision high-stakes?" value={a.highStakes} onChange={(v) => set("appropriateness", "highStakes", v)} />
      </div>
      <TextArea id="a-nec" label="Is AI actually necessary?" value={a.necessary} onChange={(v) => set("appropriateness", "necessary", v)} />
      <fieldset>
        <legend className="text-sm font-semibold text-foreground">Your decision</legend>
        <div className="mt-1 flex gap-2">
          {(["yes", "no"] as const).map((val) => (
            <button key={val} type="button" aria-pressed={a.useAi === val} onClick={() => set("appropriateness", "useAi", val)} className={`rounded-md border px-3 py-1.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${a.useAi === val ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {val === "yes" ? "Use AI" : "Do NOT use AI"}
            </button>
          ))}
        </div>
      </fieldset>
      <TextArea id="a-conc" label="Explain your conclusion" value={a.conclusion} onChange={(v) => set("appropriateness", "conclusion", v)} />
    </SectionShell>
  )
}

function IoSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const io = project.io
  return (
    <SectionShell title="3 · Inputs and outputs">
      <TextArea id="io-in" label="Inputs" value={io.inputs} onChange={(v) => set("io", "inputs", v)} />
      <TextArea id="io-out" label="Outputs" value={io.outputs} onChange={(v) => set("io", "outputs", v)} />
      <TextArea id="io-ua" label="User action" value={io.userAction} onChange={(v) => set("io", "userAction", v)} />
      <TextArea id="io-sr" label="System response" value={io.systemResponse} onChange={(v) => set("io", "systemResponse", v)} />
      <TextArea id="io-mu" label="What happens when input is missing or unclear?" value={io.missingUnclear} onChange={(v) => set("io", "missingUnclear", v)} />
    </SectionShell>
  )
}

function PlanSection({ project, update, typeDef }: { project: StudioProject; update: (p: StudioProject) => void; typeDef?: ReturnType<typeof getProjectType> }) {
  if (!typeDef) return <SectionShell title="4 · Data / rules plan"><p className="text-sm text-muted-foreground">Choose a project type first (Setup section).</p></SectionShell>
  return (
    <SectionShell title="4 · Plan the data, features, labels, or rules" intro={`These fields fit a ${typeDef.name}.`}>
      {typeDef.planFields.map((f) => (
        <TextArea key={f.id} id={`plan-${f.id}`} label={f.label} hint={f.hint} value={project.plan[f.id] ?? ""} onChange={(v) => update({ ...project, plan: { ...project.plan, [f.id]: v } })} />
      ))}
    </SectionShell>
  )
}

function PrototypeSection({ project, set, typeDef, onImport, notUsingAi }: { project: StudioProject; set: SetFn; typeDef?: ReturnType<typeof getProjectType>; onImport: () => void; notUsingAi: boolean }) {
  return (
    <SectionShell title="5 · Prototype" intro={notUsingAi ? "You decided not to use AI — describe the non-AI process (or proposal) you'd build instead." : "Describe your prototype, or import your earlier work."}>
      {typeDef?.importSourceId && !notUsingAi && (
        <div className="rounded-md border border-border p-3">
          <p className="text-sm text-foreground">Reuse your <span className="font-semibold">{typeDef.importLabel}</span>.</p>
          <button type="button" onClick={onImport} className="mt-2 inline-flex items-center rounded-md bg-avanza-green px-3 py-1.5 text-sm font-bold text-avanza-dark hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
            Import {typeDef.importLabel}
          </button>
          {project.prototype.importSnapshot && <p className="mt-2 rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground" aria-live="polite">{project.prototype.importSnapshot}</p>}
        </div>
      )}
      <TextArea id="pr-flow" label="System flow (input → processing → output)" value={project.prototype.flow} onChange={(v) => set("prototype", "flow", v)} rows={3} />
      <TextArea id="pr-notes" label="Prototype notes" value={project.prototype.notes} onChange={(v) => set("prototype", "notes", v)} />
    </SectionShell>
  )
}

function TestsSection({ project, addTest, setTest, removeTest }: { project: StudioProject; addTest: () => void; setTest: (id: string, patch: Partial<TestCase>) => void; removeTest: (id: string) => void }) {
  const covered = new Set(project.tests.filter((t) => t.input.trim()).map((t) => t.kind))
  return (
    <SectionShell title="6 · Test cases" intro="Add at least six cases — one of each kind below. Save the input, expected vs actual output, pass/fail, and a planned improvement.">
      <div className="flex flex-wrap gap-1 text-xs">
        {TEST_KINDS.map((k) => (
          <span key={k.id} className={`rounded border px-2 py-0.5 font-semibold ${covered.has(k.id) ? "border-avanza-green/50 bg-avanza-green/10 text-avanza-green-dark" : "border-border text-muted-foreground"}`}>
            {covered.has(k.id) ? "✓ " : ""}{k.label}
          </span>
        ))}
      </div>
      <ul className="space-y-3">
        {project.tests.map((t) => (
          <li key={t.id} className="rounded-md border border-border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-semibold text-muted-foreground">
                Case kind
                <select value={t.kind} onChange={(e) => setTest(t.id, { kind: e.target.value as TestKind })} className="ml-2 rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green">
                  {TEST_KINDS.map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}
                </select>
              </label>
              <button type="button" onClick={() => removeTest(t.id)} aria-label="Remove test case" className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-avanza-orange/60 hover:text-avanza-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-1">
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <TextArea id={`t-in-${t.id}`} label="Input" value={t.input} onChange={(v) => setTest(t.id, { input: v })} />
              <TextArea id={`t-exp-${t.id}`} label="Expected output" value={t.expected} onChange={(v) => setTest(t.id, { expected: v })} />
              <TextArea id={`t-act-${t.id}`} label="Actual output" value={t.actual} onChange={(v) => setTest(t.id, { actual: v })} />
              <div>
                <span className="block text-sm font-semibold text-foreground">Result</span>
                <div className="mt-1 flex gap-1">
                  {(["pass", "fail"] as const).map((r) => (
                    <button key={r} type="button" aria-pressed={t.pass === r} onClick={() => setTest(t.id, { pass: t.pass === r ? "" : r })} className={`rounded-md border px-2.5 py-1 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${t.pass === r ? (r === "pass" ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-avanza-orange bg-avanza-orange/15 text-avanza-orange-dark") : "border-border text-muted-foreground hover:text-foreground"}`}>
                      {r === "pass" ? "Pass" : "Fail"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <TextArea id={`t-ex-${t.id}`} label="Your explanation" value={t.explanation} onChange={(v) => setTest(t.id, { explanation: v })} />
              <TextArea id={`t-imp-${t.id}`} label="Planned improvement" value={t.improvement} onChange={(v) => setTest(t.id, { improvement: v })} />
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={addTest} className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
        <Plus className="h-3.5 w-3.5" aria-hidden /> Add a test case
      </button>
    </SectionShell>
  )
}

function LimitationsSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const l = project.limitations
  return (
    <SectionShell title="7 · Mistakes and limitations">
      <TextArea id="l-fp" label="Likely false positives" value={l.falsePos} onChange={(v) => set("limitations", "falsePos", v)} />
      <TextArea id="l-fn" label="Likely false negatives (if applicable)" value={l.falseNeg} onChange={(v) => set("limitations", "falseNeg", v)} />
      <TextArea id="l-ch" label="Situations it cannot handle" value={l.cannotHandle} onChange={(v) => set("limitations", "cannotHandle", v)} />
      <TextArea id="l-rf" label="When should it refuse to decide?" value={l.refuse} onChange={(v) => set("limitations", "refuse", v)} />
      <TextArea id="l-hr" label="Cases requiring human review" value={l.humanReview} onChange={(v) => set("limitations", "humanReview", v)} />
      <TextArea id="l-cl" label="Known limits of this classroom prototype" value={l.classroomLimits} onChange={(v) => set("limitations", "classroomLimits", v)} />
    </SectionShell>
  )
}

function PrivacySection({ project, set }: { project: StudioProject; set: SetFn }) {
  const pr = project.privacy
  return (
    <SectionShell title="8 · Privacy review" intro="Collect only what you truly need.">
      <TextArea id="p-nec" label="Necessary data" value={pr.necessary} onChange={(v) => set("privacy", "necessary", v)} />
      <TextArea id="p-opt" label="Optional data" value={pr.optional} onChange={(v) => set("privacy", "optional", v)} />
      <TextArea id="p-dn" label="Data that should NOT be collected" value={pr.doNotCollect} onChange={(v) => set("privacy", "doNotCollect", v)} />
      <TextArea id="p-proc" label="Where does processing happen?" hint="On the device, or on a server?" value={pr.processing} onChange={(v) => set("privacy", "processing", v)} />
      <TextArea id="p-ret" label="How long is data kept?" value={pr.retention} onChange={(v) => set("privacy", "retention", v)} />
      <TextArea id="p-del" label="How can a user delete or correct their data?" value={pr.deleteCorrect} onChange={(v) => set("privacy", "deleteCorrect", v)} />
    </SectionShell>
  )
}

function FairnessSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const f = project.fairness
  return (
    <SectionShell title="9 · Fairness review">
      <TextArea id="f-rep" label="Who is represented in your examples?" value={f.represented} onChange={(v) => set("fairness", "represented", v)} />
      <TextArea id="f-miss" label="Who or what might be missing?" value={f.missing} onChange={(v) => set("fairness", "missing", v)} />
      <TextArea id="f-px" label="Possible proxy features to watch for" value={f.proxies} onChange={(v) => set("fairness", "proxies", v)} />
      <TextArea id="f-gt" label="Group-level testing plan (if applicable)" value={f.groupTesting} onChange={(v) => set("fairness", "groupTesting", v)} />
      <TextArea id="f-inv" label="How would you investigate unequal results?" value={f.investigate} onChange={(v) => set("fairness", "investigate", v)} />
    </SectionShell>
  )
}

function OversightSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const o = project.oversight
  return (
    <SectionShell title="10 · Human oversight and appeal">
      <TextArea id="o-rev" label="Who reviews results?" value={o.reviewer} onChange={(v) => set("oversight", "reviewer", v)} />
      <TextArea id="o-when" label="When does review happen?" value={o.when} onChange={(v) => set("oversight", "when", v)} />
      <TextArea id="o-fd" label="Who makes the final decision?" value={o.finalDecision} onChange={(v) => set("oversight", "finalDecision", v)} />
      <TextArea id="o-ex" label="How does a user ask for an explanation?" value={o.explanation} onChange={(v) => set("oversight", "explanation", v)} />
      <TextArea id="o-co" label="How is a result corrected?" value={o.correction} onChange={(v) => set("oversight", "correction", v)} />
      <TextArea id="o-ov" label="How can an AI recommendation be overridden?" value={o.override} onChange={(v) => set("oversight", "override", v)} />
    </SectionShell>
  )
}

function WrapUpSection({ project, set, onPresent, remaining }: { project: StudioProject; set: SetFn; onPresent: () => void; remaining: Requirement[] }) {
  return (
    <SectionShell title="11 · Wrap up and present">
      <TextArea id="w-next" label="Your next improvement" hint="If you kept working, what would you do next?" value={project.wrapUp.nextImprovement} onChange={(v) => set("wrapUp", "nextImprovement", v)} />
      <div className="rounded-md border border-border p-4">
        <p className="text-sm font-bold text-foreground">Still needed to finish</p>
        {remaining.length === 0 ? (
          <p className="mt-1 text-sm text-avanza-green-dark">Everything required is complete — you&apos;re ready to present.</p>
        ) : (
          <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm text-muted-foreground">
            {remaining.map((r) => <li key={r.id}>{r.section}: {r.label}</li>)}
          </ul>
        )}
      </div>
      <button type="button" onClick={onPresent} className="inline-flex items-center gap-2 rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
        <Printer className="h-4 w-4" aria-hidden /> Open presentation mode
      </button>
    </SectionShell>
  )
}

/* -------------------------------------------------------------------------- */
/* Presentation / print mode                                                   */
/* -------------------------------------------------------------------------- */

function Presentation({ project, onExit }: { project: StudioProject; onExit: () => void }) {
  const typeDef = getProjectType(project.type)
  const useAiText = project.appropriateness.useAi === "yes" ? "Yes — AI is appropriate here" : project.appropriateness.useAi === "no" ? "No — AI should not be used here" : "Not decided"

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3 print-hidden">
          <button type="button" onClick={onExit} className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:border-avanza-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
            ← Back to editing
          </button>
          <PrintButton label="Print project report" tone="green" />
        </div>

        <article className="mt-6">
          <header className="border-b border-border pb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">AI Project Report {typeDef ? `· ${typeDef.name}` : ""}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-foreground">{project.define.title || "Untitled project"}</h1>
          </header>

          <Block title="Problem"><dl><ReportField label="Intended users" value={project.define.who} /><ReportField label="Why it matters" value={project.define.whyMatters} /><ReportField label="Currently handled by" value={project.define.currentHandling} /><ReportField label="Evidence it's real" value={project.define.evidence} /></dl></Block>

          <Block title="Is AI appropriate?"><p className="text-sm font-semibold text-foreground">{useAiText}</p><dl><ReportField label="Reasoning" value={project.appropriateness.conclusion} /><ReportField label="If it's wrong" value={project.appropriateness.ifWrong} /><ReportField label="High-stakes?" value={project.appropriateness.highStakes} /></dl></Block>

          <Block title="Inputs and outputs"><dl><ReportField label="Inputs" value={project.io.inputs} /><ReportField label="Outputs" value={project.io.outputs} /><ReportField label="User action" value={project.io.userAction} /><ReportField label="System response" value={project.io.systemResponse} /><ReportField label="Missing / unclear input" value={project.io.missingUnclear} /></dl></Block>

          {typeDef && (
            <Block title="How it works — plan"><dl>{typeDef.planFields.map((f) => <ReportField key={f.id} label={f.label} value={project.plan[f.id] ?? ""} />)}</dl></Block>
          )}

          <Block title="Prototype"><dl><ReportField label="System flow" value={project.prototype.flow} /><ReportField label="Notes" value={project.prototype.notes} /><ReportField label="Imported work" value={project.prototype.importSnapshot} /></dl></Block>

          {project.tests.length > 0 && (
            <Block title="Test results">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <caption className="sr-only">Test cases with input, expected and actual output, and pass or fail.</caption>
                  <thead><tr className="text-left">
                    <th className="border-b border-border px-2 py-1 font-semibold text-foreground">Kind</th>
                    <th className="border-b border-border px-2 py-1 font-semibold text-foreground">Input</th>
                    <th className="border-b border-border px-2 py-1 font-semibold text-foreground">Expected</th>
                    <th className="border-b border-border px-2 py-1 font-semibold text-foreground">Actual</th>
                    <th className="border-b border-border px-2 py-1 font-semibold text-foreground">Result</th>
                  </tr></thead>
                  <tbody>
                    {project.tests.map((t) => (
                      <tr key={t.id}>
                        <td className="border-b border-border/60 px-2 py-1 text-muted-foreground">{TEST_KINDS.find((k) => k.id === t.kind)?.label}</td>
                        <td className="border-b border-border/60 px-2 py-1 text-foreground">{t.input || "—"}</td>
                        <td className="border-b border-border/60 px-2 py-1 text-muted-foreground">{t.expected || "—"}</td>
                        <td className="border-b border-border/60 px-2 py-1 text-muted-foreground">{t.actual || "—"}</td>
                        <td className="border-b border-border/60 px-2 py-1 font-semibold">{t.pass === "pass" ? "Pass" : t.pass === "fail" ? "Fail" : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Block>
          )}

          <Block title="Mistakes and limitations"><dl><ReportField label="Likely false positives" value={project.limitations.falsePos} /><ReportField label="Likely false negatives" value={project.limitations.falseNeg} /><ReportField label="Can't handle" value={project.limitations.cannotHandle} /><ReportField label="Should refuse to decide" value={project.limitations.refuse} /><ReportField label="Needs human review" value={project.limitations.humanReview} /><ReportField label="Classroom-prototype limits" value={project.limitations.classroomLimits} /></dl></Block>

          <Block title="Privacy"><dl><ReportField label="Necessary data" value={project.privacy.necessary} /><ReportField label="Optional data" value={project.privacy.optional} /><ReportField label="Do NOT collect" value={project.privacy.doNotCollect} /><ReportField label="Processing location" value={project.privacy.processing} /><ReportField label="Retention" value={project.privacy.retention} /><ReportField label="Delete / correct" value={project.privacy.deleteCorrect} /></dl></Block>

          <Block title="Fairness"><dl><ReportField label="Represented" value={project.fairness.represented} /><ReportField label="Possibly missing" value={project.fairness.missing} /><ReportField label="Proxy features" value={project.fairness.proxies} /><ReportField label="Group testing plan" value={project.fairness.groupTesting} /><ReportField label="Investigating unequal results" value={project.fairness.investigate} /></dl></Block>

          <Block title="Human oversight and appeal"><dl><ReportField label="Reviewer" value={project.oversight.reviewer} /><ReportField label="When reviewed" value={project.oversight.when} /><ReportField label="Final decision" value={project.oversight.finalDecision} /><ReportField label="Explanation request" value={project.oversight.explanation} /><ReportField label="Correction path" value={project.oversight.correction} /><ReportField label="Override" value={project.oversight.override} /></dl></Block>

          <Block title="Next improvement"><dl><ReportField label="What I'd do next" value={project.wrapUp.nextImprovement} /></dl></Block>
        </article>
      </div>
    </div>
  )
}

function ReportField({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null
  return (
    <div className="mt-2">
      <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 whitespace-pre-line text-sm text-foreground">{value}</dd>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="mt-6 print-avoid-break">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-1">{children}</div>
    </section>
  )
}
