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
} from "@/features/curriculums/intro-to-ai/final-project"
import { introToAiPath } from "@/features/curriculums/intro-to-ai"
import { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { Breadcrumbs } from "@/components/pages/intro-to-ai/shared"
import { SaveState, ConfirmDialog } from "@/components/pages/intro-to-ai/ui"
import { PrintButton } from "@/components/ui/print-button"
import { useLanguage } from "@/components/providers/language-provider"
import type { Translations } from "@/i18n/translations"

type StudioStrings = Translations["courseUi"]["ai"]["studio"]

/** The final-project studio wording in the reader's language. */
function useS(): StudioStrings {
  return useLanguage().t.courseUi.ai.studio
}

/** The shared Intro to AI chrome (used for the breadcrumb). */
function useShared() {
  return useLanguage().t.courseUi.ai.shared
}

// The section names double as ids for the outline and the requirement grouping,
// so they stay English; `sectionLabel` supplies the display text.
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

/** Display name for a section id, in the reader's language. */
function sectionLabel(name: SectionName, S: StudioStrings): string {
  const map: Record<SectionName, string> = {
    Setup: S.fpSetup,
    "Define the problem": S.fpSecDefine,
    "Is AI appropriate?": S.fpRepIsAiAppropriate,
    "Inputs & outputs": S.fpSecIo,
    "Data / rules plan": S.fpSecPlan,
    Prototype: S.fpRepPrototype,
    "Test cases": S.fpSecTests,
    "Mistakes & limitations": S.fpSecLimitations,
    "Privacy review": S.fpSecPrivacy,
    "Fairness review": S.fpSecFairness,
    "Human oversight & appeal": S.fpSecOversight,
    Presentation: S.fpPresentation,
  }
  return map[name]
}

let tcCounter = 0
const nextTcId = () => `tc-${Date.now()}-${++tcCounter}`

export function IntroToAiFinalProjectContent() {
  const S = useS()
  const shared = useShared()
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
        title: S.fpChangeTypeTitle,
        description: S.fpChangeTypeBody,
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
    announce(result.ok ? S.fpImported : result.summary)
  }

  if (presenting) return <Presentation project={project} onExit={() => setPresenting(false)} />

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Breadcrumbs trail={[{ label: shared.courseTitle, href: introToAiPath }, { label: S.fpStudioName }]} />
          <div className="flex items-center gap-3">
            <SaveState status={p.saveStatus} idleHint={S.fpAutoSaves} />
          </div>
        </div>
        <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

        <header className="mt-6 border-b border-border pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{S.fpEyebrow}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">{S.fpTitle}</h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">
            Work through each section like a design notebook. Your draft saves automatically on this device — nothing is sent anywhere. Don&apos;t include your full name, school, or contact details.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className={`text-sm font-semibold ${complete ? "text-avanza-green-dark" : "text-muted-foreground"}`}>
              {complete ? S.fpAllSectionsComplete : `${summary.met} of ${summary.total} required items done`}
            </span>
            <button
              type="button"
              onClick={() => setPresenting(true)}
              className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:border-avanza-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              {S.fpPresentationMode}
            </button>
            <button
              type="button"
              onClick={() => setConfirm({ title: S.fpResetTitle, description: S.fpResetBody, onConfirm: () => { update(emptyProject()); setSection("Setup"); announce(S.fpProjectReset) } })}
              className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:border-avanza-orange/60 hover:text-avanza-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-2"
            >
              {S.fpResetProject}
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-8 md:grid-cols-[16rem_1fr]">
          {/* Section navigation (vertical list, not a horizontal-only stepper) */}
          <nav aria-label={S.fpProjectSections}>
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
                      <span className="flex-1">{i}. {sectionLabel(name, S)}</span>
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
        confirmLabel={S.fpYesContinue}
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
  const S = useS()
  return (
    <SectionShell title={S.fpChooseType} intro="Pick a direction. You can change it later — your problem, privacy, fairness, and oversight work is kept, but the data plan and prototype (which are tied to the type) will be cleared.">
      <div className="space-y-3" role="radiogroup" aria-label={S.fpProjectType}>
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
  const S = useS()
  const d = project.define
  return (
    <SectionShell title={S.fpSec1} intro={S.fpStartFromNeed}>
      <TextArea id="d-title" label={S.fpProblemTitle} value={d.title} onChange={(v) => set("define", "title", v)} />
      <TextArea id="d-who" label={S.fpWhoExperiences} value={d.who} onChange={(v) => set("define", "who", v)} />
      <TextArea id="d-why" label={S.fpWhyMatters} value={d.whyMatters} onChange={(v) => set("define", "whyMatters", v)} />
      <TextArea id="d-cur" label={S.fpHandledNow} value={d.currentHandling} onChange={(v) => set("define", "currentHandling", v)} />
      <TextArea id="d-ev" label={S.fpEvidenceExists} hint={S.fpHowKnowReal} value={d.evidence} onChange={(v) => set("define", "evidence", v)} />
    </SectionShell>
  )
}

function AppropriatenessSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const S = useS()
  const a = project.appropriateness
  return (
    <SectionShell title={S.fpSec2} intro={S.fpCompareHonestly}>
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{S.fpCompareApproaches}</p>
      <TextArea id="a-ai" label={S.fpApproachAi} value={a.optionAi} onChange={(v) => set("appropriateness", "optionAi", v)} />
      <TextArea id="a-rules" label={S.fpApproachRules} value={a.optionRules} onChange={(v) => set("appropriateness", "optionRules", v)} />
      <TextArea id="a-check" label={S.fpApproachChecklist} value={a.optionChecklist} onChange={(v) => set("appropriateness", "optionChecklist", v)} />
      <TextArea id="a-human" label={S.fpApproachHuman} value={a.optionHuman} onChange={(v) => set("appropriateness", "optionHuman", v)} />
      <TextArea id="a-combo" label={S.fpApproachMixed} value={a.optionCombination} onChange={(v) => set("appropriateness", "optionCombination", v)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextArea id="a-pat" label={S.fpQPatterns} value={a.patterns} onChange={(v) => set("appropriateness", "patterns", v)} />
        <TextArea id="a-rc" label={S.fpQRules} value={a.rulesCould} onChange={(v) => set("appropriateness", "rulesCould", v)} />
        <TextArea id="a-iw" label={S.fpQWrong} value={a.ifWrong} onChange={(v) => set("appropriateness", "ifWrong", v)} />
        <TextArea id="a-hs" label={S.fpQHighStakes} value={a.highStakes} onChange={(v) => set("appropriateness", "highStakes", v)} />
      </div>
      <TextArea id="a-nec" label={S.fpQNecessary} value={a.necessary} onChange={(v) => set("appropriateness", "necessary", v)} />
      <fieldset>
        <legend className="text-sm font-semibold text-foreground">{S.fpYourDecision}</legend>
        <div className="mt-1 flex gap-2">
          {(["yes", "no"] as const).map((val) => (
            <button key={val} type="button" aria-pressed={a.useAi === val} onClick={() => set("appropriateness", "useAi", val)} className={`rounded-md border px-3 py-1.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${a.useAi === val ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {val === "yes" ? S.fpUseAi : S.fpDoNotUseAi}
            </button>
          ))}
        </div>
      </fieldset>
      <TextArea id="a-conc" label={S.fpExplainConclusion} value={a.conclusion} onChange={(v) => set("appropriateness", "conclusion", v)} />
    </SectionShell>
  )
}

function IoSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const S = useS()
  const io = project.io
  return (
    <SectionShell title={S.fpSec3}>
      <TextArea id="io-in" label={S.fpInputs} value={io.inputs} onChange={(v) => set("io", "inputs", v)} />
      <TextArea id="io-out" label={S.fpOutputs} value={io.outputs} onChange={(v) => set("io", "outputs", v)} />
      <TextArea id="io-ua" label={S.fpUserAction} value={io.userAction} onChange={(v) => set("io", "userAction", v)} />
      <TextArea id="io-sr" label={S.fpSystemResponse} value={io.systemResponse} onChange={(v) => set("io", "systemResponse", v)} />
      <TextArea id="io-mu" label={S.fpMissingInput} value={io.missingUnclear} onChange={(v) => set("io", "missingUnclear", v)} />
    </SectionShell>
  )
}

function PlanSection({ project, update, typeDef }: { project: StudioProject; update: (p: StudioProject) => void; typeDef?: ReturnType<typeof getProjectType> }) {
  const S = useS()
  if (!typeDef) return <SectionShell title={S.fpSec4}><p className="text-sm text-muted-foreground">{S.fpChooseTypeFirst}</p></SectionShell>
  return (
    <SectionShell title={S.fpSec4Alt} intro={`These fields fit a ${typeDef.name}.`}>
      {typeDef.planFields.map((f) => (
        <TextArea key={f.id} id={`plan-${f.id}`} label={f.label} hint={f.hint} value={project.plan[f.id] ?? ""} onChange={(v) => update({ ...project, plan: { ...project.plan, [f.id]: v } })} />
      ))}
    </SectionShell>
  )
}

function PrototypeSection({ project, set, typeDef, onImport, notUsingAi }: { project: StudioProject; set: SetFn; typeDef?: ReturnType<typeof getProjectType>; onImport: () => void; notUsingAi: boolean }) {
  const S = useS()
  return (
    <SectionShell title={S.fpSec5} intro={notUsingAi ? S.fpNoAiNote : S.fpDescribePrototype}>
      {typeDef?.importSourceId && !notUsingAi && (
        <div className="rounded-md border border-border p-3">
          <p className="text-sm text-foreground">
            {S.fpReuse.split("{label}")[0]}
            <span className="font-semibold">{typeDef.importLabel}</span>
            {S.fpReuse.split("{label}")[1]}
          </p>
          <button type="button" onClick={onImport} className="mt-2 inline-flex items-center rounded-md bg-avanza-green px-3 py-1.5 text-sm font-bold text-avanza-dark hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
            Import {typeDef.importLabel}
          </button>
          {project.prototype.importSnapshot && <p className="mt-2 rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground" aria-live="polite">{project.prototype.importSnapshot}</p>}
        </div>
      )}
      <TextArea id="pr-flow" label={S.fpSystemFlow} value={project.prototype.flow} onChange={(v) => set("prototype", "flow", v)} rows={3} />
      <TextArea id="pr-notes" label={S.fpPrototypeNotes} value={project.prototype.notes} onChange={(v) => set("prototype", "notes", v)} />
    </SectionShell>
  )
}

function TestsSection({ project, addTest, setTest, removeTest }: { project: StudioProject; addTest: () => void; setTest: (id: string, patch: Partial<TestCase>) => void; removeTest: (id: string) => void }) {
  const S = useS()
  const covered = new Set(project.tests.filter((t) => t.input.trim()).map((t) => t.kind))
  return (
    <SectionShell title={S.fpSec6} intro={S.fpAddSixCases}>
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
                {S.fpCaseKind}
                <select value={t.kind} onChange={(e) => setTest(t.id, { kind: e.target.value as TestKind })} className="ml-2 rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green">
                  {TEST_KINDS.map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}
                </select>
              </label>
              <button type="button" onClick={() => removeTest(t.id)} aria-label={S.fpRemoveTestCase} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-avanza-orange/60 hover:text-avanza-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-1">
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <TextArea id={`t-in-${t.id}`} label={S.fpInput} value={t.input} onChange={(v) => setTest(t.id, { input: v })} />
              <TextArea id={`t-exp-${t.id}`} label={S.fpExpectedOutput} value={t.expected} onChange={(v) => setTest(t.id, { expected: v })} />
              <TextArea id={`t-act-${t.id}`} label={S.fpActualOutput} value={t.actual} onChange={(v) => setTest(t.id, { actual: v })} />
              <div>
                <span className="block text-sm font-semibold text-foreground">{S.fpResult}</span>
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
              <TextArea id={`t-ex-${t.id}`} label={S.fpYourExplanation} value={t.explanation} onChange={(v) => setTest(t.id, { explanation: v })} />
              <TextArea id={`t-imp-${t.id}`} label={S.fpPlannedImprovement} value={t.improvement} onChange={(v) => setTest(t.id, { improvement: v })} />
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={addTest} className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
        <Plus className="h-3.5 w-3.5" aria-hidden /> {S.fpAddTestCase}
      </button>
    </SectionShell>
  )
}

function LimitationsSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const S = useS()
  const l = project.limitations
  return (
    <SectionShell title={S.fpSec7}>
      <TextArea id="l-fp" label={S.fpFalsePositives} value={l.falsePos} onChange={(v) => set("limitations", "falsePos", v)} />
      <TextArea id="l-fn" label={S.fpFalseNegatives} value={l.falseNeg} onChange={(v) => set("limitations", "falseNeg", v)} />
      <TextArea id="l-ch" label={S.fpCannotHandle} value={l.cannotHandle} onChange={(v) => set("limitations", "cannotHandle", v)} />
      <TextArea id="l-rf" label={S.fpShouldRefuse} value={l.refuse} onChange={(v) => set("limitations", "refuse", v)} />
      <TextArea id="l-hr" label={S.fpNeedsReview} value={l.humanReview} onChange={(v) => set("limitations", "humanReview", v)} />
      <TextArea id="l-cl" label={S.fpClassroomLimits} value={l.classroomLimits} onChange={(v) => set("limitations", "classroomLimits", v)} />
    </SectionShell>
  )
}

function PrivacySection({ project, set }: { project: StudioProject; set: SetFn }) {
  const S = useS()
  const pr = project.privacy
  return (
    <SectionShell title={S.fpSec8} intro={S.fpCollectOnlyNeeded}>
      <TextArea id="p-nec" label={S.fpNecessaryData} value={pr.necessary} onChange={(v) => set("privacy", "necessary", v)} />
      <TextArea id="p-opt" label={S.fpOptionalData} value={pr.optional} onChange={(v) => set("privacy", "optional", v)} />
      <TextArea id="p-dn" label={S.fpDoNotCollect} value={pr.doNotCollect} onChange={(v) => set("privacy", "doNotCollect", v)} />
      <TextArea id="p-proc" label={S.fpWhereProcessing} hint={S.fpOnDeviceOrServer} value={pr.processing} onChange={(v) => set("privacy", "processing", v)} />
      <TextArea id="p-ret" label={S.fpHowLongKept} value={pr.retention} onChange={(v) => set("privacy", "retention", v)} />
      <TextArea id="p-del" label={S.fpDeleteCorrect} value={pr.deleteCorrect} onChange={(v) => set("privacy", "deleteCorrect", v)} />
    </SectionShell>
  )
}

function FairnessSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const S = useS()
  const f = project.fairness
  return (
    <SectionShell title={S.fpSec9}>
      <TextArea id="f-rep" label={S.fpWhoRepresented} value={f.represented} onChange={(v) => set("fairness", "represented", v)} />
      <TextArea id="f-miss" label={S.fpWhoMissing} value={f.missing} onChange={(v) => set("fairness", "missing", v)} />
      <TextArea id="f-px" label={S.fpProxyFeatures} value={f.proxies} onChange={(v) => set("fairness", "proxies", v)} />
      <TextArea id="f-gt" label={S.fpGroupTesting} value={f.groupTesting} onChange={(v) => set("fairness", "groupTesting", v)} />
      <TextArea id="f-inv" label={S.fpInvestigate} value={f.investigate} onChange={(v) => set("fairness", "investigate", v)} />
    </SectionShell>
  )
}

function OversightSection({ project, set }: { project: StudioProject; set: SetFn }) {
  const S = useS()
  const o = project.oversight
  return (
    <SectionShell title={S.fpSec10}>
      <TextArea id="o-rev" label={S.fpWhoReviews} value={o.reviewer} onChange={(v) => set("oversight", "reviewer", v)} />
      <TextArea id="o-when" label={S.fpWhenReview} value={o.when} onChange={(v) => set("oversight", "when", v)} />
      <TextArea id="o-fd" label={S.fpFinalDecision} value={o.finalDecision} onChange={(v) => set("oversight", "finalDecision", v)} />
      <TextArea id="o-ex" label={S.fpAskExplanation} value={o.explanation} onChange={(v) => set("oversight", "explanation", v)} />
      <TextArea id="o-co" label={S.fpHowCorrected} value={o.correction} onChange={(v) => set("oversight", "correction", v)} />
      <TextArea id="o-ov" label={S.fpHowOverridden} value={o.override} onChange={(v) => set("oversight", "override", v)} />
    </SectionShell>
  )
}

function WrapUpSection({ project, set, onPresent, remaining }: { project: StudioProject; set: SetFn; onPresent: () => void; remaining: Requirement[] }) {
  const S = useS()
  return (
    <SectionShell title={S.fpSec11}>
      <TextArea id="w-next" label={S.fpNextImprovement} hint={S.fpIfKeptWorking} value={project.wrapUp.nextImprovement} onChange={(v) => set("wrapUp", "nextImprovement", v)} />
      <div className="rounded-md border border-border p-4">
        <p className="text-sm font-bold text-foreground">{S.fpStillNeeded}</p>
        {remaining.length === 0 ? (
          <p className="mt-1 text-sm text-avanza-green-dark">{S.fpAllComplete}</p>
        ) : (
          <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm text-muted-foreground">
            {remaining.map((r) => <li key={r.id}>{r.section}: {r.label}</li>)}
          </ul>
        )}
      </div>
      <button type="button" onClick={onPresent} className="inline-flex items-center gap-2 rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
        <Printer className="h-4 w-4" aria-hidden /> {S.fpOpenPresentation}
      </button>
    </SectionShell>
  )
}

/* -------------------------------------------------------------------------- */
/* Presentation / print mode                                                   */
/* -------------------------------------------------------------------------- */

function Presentation({ project, onExit }: { project: StudioProject; onExit: () => void }) {
  const S = useS()
  const typeDef = getProjectType(project.type)
  const useAiText = project.appropriateness.useAi === "yes" ? S.fpUseAiYes : project.appropriateness.useAi === "no" ? S.fpUseAiNo : S.fpUseAiNone

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3 print-hidden">
          <button type="button" onClick={onExit} className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:border-avanza-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
            ← Back to editing
          </button>
          <PrintButton label={S.fpPrintReport} tone="green" />
        </div>

        <article className="mt-6">
          <header className="border-b border-border pb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">AI Project Report {typeDef ? `· ${typeDef.name}` : ""}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-foreground">{project.define.title || S.fpUntitledProject}</h1>
          </header>

          <Block title={S.fpRepProblem}><dl><ReportField label={S.fpRepIntendedUsers} value={project.define.who} /><ReportField label={S.fpRepWhyMatters} value={project.define.whyMatters} /><ReportField label={S.fpRepCurrentlyHandled} value={project.define.currentHandling} /><ReportField label={S.fpRepEvidenceReal} value={project.define.evidence} /></dl></Block>

          <Block title={S.fpRepIsAiAppropriate}><p className="text-sm font-semibold text-foreground">{useAiText}</p><dl><ReportField label={S.fpRepReasoning} value={project.appropriateness.conclusion} /><ReportField label={S.fpRepIfWrong} value={project.appropriateness.ifWrong} /><ReportField label={S.fpRepHighStakes} value={project.appropriateness.highStakes} /></dl></Block>

          <Block title={S.fpRepInputsOutputs}><dl><ReportField label={S.fpInputs} value={project.io.inputs} /><ReportField label={S.fpOutputs} value={project.io.outputs} /><ReportField label={S.fpUserAction} value={project.io.userAction} /><ReportField label={S.fpSystemResponse} value={project.io.systemResponse} /><ReportField label={S.fpRepMissingUnclear} value={project.io.missingUnclear} /></dl></Block>

          {typeDef && (
            <Block title={S.fpRepHowItWorks}><dl>{typeDef.planFields.map((f) => <ReportField key={f.id} label={f.label} value={project.plan[f.id] ?? ""} />)}</dl></Block>
          )}

          <Block title={S.fpRepPrototype}><dl><ReportField label={S.fpRepSystemFlow} value={project.prototype.flow} /><ReportField label={S.fpRepNotes} value={project.prototype.notes} /><ReportField label={S.fpRepImportedWork} value={project.prototype.importSnapshot} /></dl></Block>

          {project.tests.length > 0 && (
            <Block title={S.fpRepTestResults}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <caption className="sr-only">{S.fpTestsCaption}</caption>
                  <thead><tr className="text-left">
                    <th className="border-b border-border px-2 py-1 font-semibold text-foreground">{S.fpKind}</th>
                    <th className="border-b border-border px-2 py-1 font-semibold text-foreground">{S.fpInput}</th>
                    <th className="border-b border-border px-2 py-1 font-semibold text-foreground">{S.fpExpected}</th>
                    <th className="border-b border-border px-2 py-1 font-semibold text-foreground">{S.fpActual}</th>
                    <th className="border-b border-border px-2 py-1 font-semibold text-foreground">{S.fpResult}</th>
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

          <Block title={S.fpRepMistakes}><dl><ReportField label={S.fpFalsePositives} value={project.limitations.falsePos} /><ReportField label={S.fpRepFalseNegatives} value={project.limitations.falseNeg} /><ReportField label={S.fpRepCannotHandle} value={project.limitations.cannotHandle} /><ReportField label={S.fpRepShouldRefuse} value={project.limitations.refuse} /><ReportField label={S.fpRepNeedsReview} value={project.limitations.humanReview} /><ReportField label={S.fpRepClassroomLimits} value={project.limitations.classroomLimits} /></dl></Block>

          <Block title={S.fpRepPrivacy}><dl><ReportField label={S.fpNecessaryData} value={project.privacy.necessary} /><ReportField label={S.fpOptionalData} value={project.privacy.optional} /><ReportField label={S.fpRepDoNotCollect} value={project.privacy.doNotCollect} /><ReportField label={S.fpRepProcessingLocation} value={project.privacy.processing} /><ReportField label={S.fpRepRetention} value={project.privacy.retention} /><ReportField label={S.fpRepDeleteCorrect} value={project.privacy.deleteCorrect} /></dl></Block>

          <Block title={S.fpRepFairness}><dl><ReportField label={S.fpRepRepresented} value={project.fairness.represented} /><ReportField label={S.fpRepPossiblyMissing} value={project.fairness.missing} /><ReportField label={S.fpRepProxyFeatures} value={project.fairness.proxies} /><ReportField label={S.fpRepGroupTesting} value={project.fairness.groupTesting} /><ReportField label={S.fpRepInvestigating} value={project.fairness.investigate} /></dl></Block>

          <Block title={S.fpRepOversight}><dl><ReportField label={S.fpRepReviewer} value={project.oversight.reviewer} /><ReportField label={S.fpRepWhenReviewed} value={project.oversight.when} /><ReportField label={S.fpRepFinalDecision} value={project.oversight.finalDecision} /><ReportField label={S.fpRepExplanationRequest} value={project.oversight.explanation} /><ReportField label={S.fpRepCorrectionPath} value={project.oversight.correction} /><ReportField label={S.fpRepOverride} value={project.oversight.override} /></dl></Block>

          <Block title={S.fpRepNextImprovement}><dl><ReportField label={S.fpRepWhatNext} value={project.wrapUp.nextImprovement} /></dl></Block>
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
