"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Play,
  Square,
  Loader2,
  RotateCcw,
  ChevronDown,
  X,
  HelpCircle,
  PanelLeft,
  FileCode2,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"
import {
  PythonCodeEditor,
  type PythonCodeEditorHandle,
  type EditorDiagnostic,
} from "@/components/ui/python-code-editor"
import { PythonTerminal } from "@/components/ui/python-terminal"
import { usePythonRunner } from "@/components/ui/use-python-runner"

// Standalone IDE keeps its own saved code so a student's work here never
// collides with the home-page playground or a lesson editor.
const PYTHON_IDE_STORAGE_KEY = "avanza-python-ide-code"

const FILE_NAME = "main.py"

type Example = { id: string; label: string; code: string }
type PendingConfirm = { type: "reset" } | { type: "example"; example: Example }

/**
 * The standalone Python IDE (/python-ide): a compact, application-style shell -
 * toolbar, file sidebar, editor, output panel, and status bar - built on the
 * same shared primitives as every other editor in the app
 * ({@link PythonCodeEditor}, {@link PythonTerminal}, {@link usePythonRunner}).
 * Only the chrome differs; the Python execution engine is untouched.
 */
export function PythonIdeWorkspace() {
  const { t } = useLanguage()
  const runner = usePythonRunner()

  const [code, setCode] = useState<string>(t.home.pyStarterCode)
  const [hasLoadedSavedCode, setHasLoadedSavedCode] = useState(false)
  const [activeExample, setActiveExample] = useState<string | null>(null)
  const [filesOpen, setFilesOpen] = useState(false)
  const [examplesOpen, setExamplesOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm | null>(null)
  const [cursor, setCursor] = useState<{ line: number; column: number }>({ line: 1, column: 1 })

  const editorRef = useRef<PythonCodeEditorHandle>(null)
  const skipNextCodeSaveRef = useRef(false)

  const examples: Example[] = useMemo(
    () => [
      { id: "hello", label: t.home.pyEgHello, code: t.home.pyEgHelloCode },
      { id: "variables", label: t.home.pyEgVariables, code: t.home.pyEgVariablesCode },
      { id: "input", label: t.home.pyEgInput, code: t.home.pyEgInputCode },
      { id: "if", label: t.home.pyEgIf, code: t.home.pyEgIfCode },
      { id: "loops", label: t.home.pyEgLoops, code: t.home.pyEgLoopsCode },
    ],
    [t],
  )

  // The set of pristine templates (starter + every example). If the buffer
  // matches one of these it holds no custom work, so replacing it is safe and
  // needs no confirmation. Anything else counts as the student's own edits.
  const templates = useMemo(
    () => new Set<string>([t.home.pyStarterCode, ...examples.map((e) => e.code)]),
    [t.home.pyStarterCode, examples],
  )
  const isDirty = hasLoadedSavedCode && code.trim() !== "" && !templates.has(code)

  // Restore locally saved student code once the browser APIs are available.
  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      try {
        const savedCode = window.localStorage.getItem(PYTHON_IDE_STORAGE_KEY)
        if (savedCode !== null) setCode(savedCode)
      } catch {
        // localStorage can be blocked in private or restricted browser contexts.
      } finally {
        setHasLoadedSavedCode(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Keep the student's current editor contents local to this browser.
  useEffect(() => {
    if (!hasLoadedSavedCode) return
    if (skipNextCodeSaveRef.current) {
      skipNextCodeSaveRef.current = false
      return
    }
    try {
      window.localStorage.setItem(PYTHON_IDE_STORAGE_KEY, code)
    } catch {
      // The editor still works if persistence is unavailable.
    }
  }, [code, hasLoadedSavedCode])

  // Close any open menus / the mobile drawer / a confirm dialog on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setExamplesOpen(false)
      setHelpOpen(false)
      setFilesOpen(false)
      setPendingConfirm(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const handleCodeChange = useCallback((next: string) => {
    setCode(next)
    // The moment a student edits, it's no longer the pristine example.
    setActiveExample(null)
  }, [])

  const performLoadExample = useCallback(
    (example: Example) => {
      setCode(example.code)
      setActiveExample(example.id)
      runner.clearOutput()
      setExamplesOpen(false)
      setFilesOpen(false)
      requestAnimationFrame(() => editorRef.current?.focus())
    },
    [runner],
  )

  const performReset = useCallback(() => {
    skipNextCodeSaveRef.current = true
    try {
      window.localStorage.removeItem(PYTHON_IDE_STORAGE_KEY)
    } catch {
      // Nothing else to do if localStorage is unavailable.
    }
    setCode(t.home.pyStarterCode)
    setActiveExample(null)
    runner.clearOutput()
    requestAnimationFrame(() => editorRef.current?.focus())
  }, [runner, t.home.pyStarterCode])

  // Reset always asks first (an explicit, deliberate action). Loading an
  // example only asks when there is real work to lose.
  const requestReset = useCallback(() => {
    setExamplesOpen(false)
    setFilesOpen(false)
    setPendingConfirm({ type: "reset" })
  }, [])

  const requestLoadExample = useCallback(
    (example: Example) => {
      if (isDirty) {
        setExamplesOpen(false)
        setPendingConfirm({ type: "example", example })
        return
      }
      performLoadExample(example)
    },
    [isDirty, performLoadExample],
  )

  const confirmPending = useCallback(() => {
    if (!pendingConfirm) return
    if (pendingConfirm.type === "reset") performReset()
    else performLoadExample(pendingConfirm.example)
    setPendingConfirm(null)
  }, [pendingConfirm, performReset, performLoadExample])

  const runCode = useCallback(() => {
    if (runner.isBusy || code.trim().length === 0) return
    runner.run(code)
  }, [runner, code])

  const diagnostics = useMemo<EditorDiagnostic[]>(
    () =>
      runner.errorLine != null
        ? [{ line: runner.errorLine, message: runner.errorOutput, severity: "error" }]
        : [],
    [runner.errorLine, runner.errorOutput],
  )

  const { status, isBusy, outcome } = runner

  const runLabel =
    status === "loading"
      ? t.home.pyWarming
      : status === "waiting"
        ? t.home.pyWaitingInput
        : status === "running"
          ? t.home.pyRunning
          : t.home.pyRun

  // Status-bar read-out: the execution lifecycle, colour-coded.
  const statusMeta = (() => {
    switch (status) {
      case "loading":
        return { text: t.home.pyStateStarting, tone: "text-amber-300", dot: "bg-amber-300" }
      case "running":
        return { text: t.home.pyStateRunning, tone: "text-amber-300", dot: "bg-amber-300" }
      case "waiting":
        return { text: t.home.pyStateWaiting, tone: "text-amber-300", dot: "bg-amber-300" }
      case "done":
        if (outcome === "error") return { text: t.home.pyStateError, tone: "text-red-400", dot: "bg-red-400" }
        if (outcome === "stopped")
          return { text: t.home.pyStateStopped, tone: "text-amber-300", dot: "bg-amber-300" }
        return { text: t.home.pyStateCompleted, tone: "text-emerald-400", dot: "bg-emerald-400" }
      default:
        return { text: t.home.pyStateReady, tone: "text-emerald-400", dot: "bg-emerald-400" }
    }
  })()

  const sidebarBody = (onNavigate?: () => void) => (
    <SidebarContent
      examples={examples}
      activeExample={activeExample}
      onSelectExample={(ex) => {
        requestLoadExample(ex)
        onNavigate?.()
      }}
      filesLabel={t.home.pyIdeFiles}
      examplesLabel={t.home.pyIdeExamples}
      editedLabel={t.home.pyIdeTabEdited}
      isDirty={isDirty}
    />
  )

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden rounded-lg border border-[#242838] bg-[#0f1120] text-white shadow-[0_20px_60px_-32px_rgba(6,8,20,0.7)] lg:h-[calc(100dvh-5.5rem)] lg:min-h-136">
      {/* Toolbar */}
      <div className="flex h-13 shrink-0 items-center gap-2 border-b border-[#242838] bg-[#161927] px-2 sm:px-3">
        <button
          type="button"
          onClick={() => setFilesOpen(true)}
          className="inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          aria-label={t.home.pyIdeFilesOpen}
          title={t.home.pyIdeTipFiles}
        >
          <PanelLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{t.home.pyIdeFiles}</span>
        </button>

        <div className="flex min-w-0 items-center gap-2 pl-1">
          <Image src="/avanza-logo.svg" alt="" width={22} height={22} className="h-5 w-5 shrink-0" />
          <span className="hidden truncate text-sm font-semibold tracking-tight text-white/90 sm:inline">
            Avanza STEM Python
          </span>
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={requestReset}
            disabled={isBusy}
            aria-label={t.home.pyIdeReset}
            title={t.home.pyIdeTipReset}
            className="inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">{t.home.pyIdeReset}</span>
          </button>

          {/* Examples dropdown (in the sidebar/drawer on small screens). */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setExamplesOpen((v) => !v)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-haspopup="menu"
              aria-expanded={examplesOpen}
              title={t.home.pyIdeTipExamples}
            >
              {t.home.pyIdeExamples}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", examplesOpen && "rotate-180")} />
            </button>
            {examplesOpen && (
              <>
                <button
                  type="button"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={() => setExamplesOpen(false)}
                />
                <div
                  role="menu"
                  className="absolute right-0 top-full z-20 mt-1.5 w-52 overflow-hidden rounded-md border border-[#2b3042] bg-[#161927] py-1 shadow-xl"
                >
                  {examples.map((ex) => (
                    <button
                      key={ex.id}
                      type="button"
                      role="menuitem"
                      onClick={() => requestLoadExample(ex)}
                      className={cn(
                        "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-white/10",
                        activeExample === ex.id ? "text-avanza-green" : "text-white/80",
                      )}
                    >
                      <FileCode2 className="h-3.5 w-3.5 shrink-0 opacity-60" />
                      {ex.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Help */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setHelpOpen((v) => !v)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-haspopup="dialog"
              aria-expanded={helpOpen}
              aria-label={t.home.pyIdeHelp}
              title={t.home.pyIdeTipHelp}
            >
              <HelpCircle className="h-4 w-4" />
              <span className="hidden md:inline">{t.home.pyIdeHelp}</span>
            </button>
            {helpOpen && (
              <>
                <button
                  type="button"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={() => setHelpOpen(false)}
                />
                <div
                  role="dialog"
                  aria-label={t.home.pyIdeHelpTitle}
                  className="absolute right-0 top-full z-20 mt-1.5 w-72 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-md border border-[#2b3042] bg-[#161927] p-4 shadow-xl"
                >
                  <p className="m-0 mb-2 text-sm font-semibold text-white">{t.home.pyIdeHelpTitle}</p>
                  <ul className="m-0 list-none space-y-1.5 p-0 text-sm leading-relaxed text-white/70">
                    <li>{t.home.pyIdeHelpRun}</li>
                    <li>{t.home.pyIdeHelpStop}</li>
                    <li>{t.home.pyIdeHelpExamples}</li>
                    <li>{t.home.pyIdeHelpReset}</li>
                  </ul>
                  <p className="m-0 mt-3 border-t border-white/10 pt-2 font-mono text-xs text-white/45">
                    {t.home.pyIdeRunShortcut}
                  </p>
                  <button
                    type="button"
                    onClick={() => setHelpOpen(false)}
                    className="mt-3 inline-flex h-8 items-center rounded-md bg-white/10 px-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
                  >
                    {t.home.pyIdeHelpClose}
                  </button>
                </div>
              </>
            )}
          </div>

          <span className="mr-0.5 hidden font-mono text-[11px] leading-none text-white/35 xl:inline">
            {t.home.pyIdeRunShortcut}
          </span>

          {isBusy && (
            <button
              type="button"
              onClick={runner.stop}
              aria-label={t.home.pyStop}
              title={t.home.pyIdeTipStop}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-red-500 px-3 text-sm font-semibold text-white transition-colors hover:bg-red-400"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              <span className="hidden sm:inline">{t.home.pyStop}</span>
            </button>
          )}

          <button
            type="button"
            onClick={runCode}
            disabled={isBusy || code.trim().length === 0}
            title={`${t.home.pyIdeTipRun} — ${t.home.pyIdeRunShortcut}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-avanza-green px-3.5 text-sm font-semibold text-avanza-dark transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isBusy ? (
              <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
            ) : (
              <Play className="h-4 w-4 fill-current" />
            )}
            {runLabel}
          </button>
        </div>
      </div>

      {/* Body: sidebar + editor + output */}
      <div className="flex min-h-0 flex-1">
        {/* Desktop file sidebar */}
        <aside className="hidden w-52 shrink-0 flex-col border-r border-[#242838] bg-[#12141f] lg:flex">
          {sidebarBody()}
        </aside>

        {/* Editor + output */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row">
          {/* Editor panel */}
          <div className="flex min-h-72 min-w-0 flex-1 flex-col lg:min-h-0">
            {/* File tab */}
            <div className="flex h-9 shrink-0 items-center border-b border-[#242838] bg-[#12141f] px-2">
              <div className="inline-flex items-center gap-2 rounded-t-md border-b-2 border-avanza-green bg-[#0f1120] py-1.5 pl-3 pr-2">
                <FileCode2 className="h-3.5 w-3.5 text-avanza-green" />
                <span className="font-mono text-xs text-white/85">{FILE_NAME}</span>
                {isDirty && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-white/70"
                    title={t.home.pyIdeTabEdited}
                    aria-label={t.home.pyIdeTabEdited}
                    role="img"
                  />
                )}
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title={t.home.pyIdeCloseFileTip}
                  aria-label={t.home.pyIdeCloseFileTip}
                  className="inline-flex h-5 w-5 cursor-not-allowed items-center justify-center rounded text-white/25"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <PythonCodeEditor
              ref={editorRef}
              code={code}
              onCodeChange={handleCodeChange}
              onRun={runCode}
              onCursorChange={setCursor}
              diagnostics={diagnostics}
              ariaLabel={t.home.pyEditorAria}
              placeholder={t.home.pyPlaceholder}
              containerClassName="min-h-0 flex-1"
            />
          </div>

          {/* Output panel */}
          <div className="flex min-h-56 min-w-0 flex-col border-t border-[#242838] bg-[#0f1120] lg:min-h-0 lg:w-[38%] lg:min-w-68 lg:max-w-[42%] lg:border-l lg:border-t-0">
            <PythonTerminal
              runner={runner}
              title={t.home.pyOutputTitle}
              fileName={FILE_NAME}
              onErrorLineClick={(line) => editorRef.current?.goToLine(line)}
              className="min-h-0 flex-1"
            />
          </div>
        </div>
      </div>

      {/* Status bar: only real, editor-synced information. */}
      <div className="flex h-7 shrink-0 items-center gap-2.5 border-t border-[#242838] bg-[#161927] px-3 font-mono text-[11px] text-white/45">
        <span className={cn("flex items-center gap-1.5", statusMeta.tone)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", statusMeta.dot)} />
          {statusMeta.text}
        </span>
        <span className="text-white/20" aria-hidden="true">|</span>
        <span className="hidden sm:inline">{t.home.pyStatusSpaces}</span>
        <span className="hidden text-white/20 sm:inline" aria-hidden="true">|</span>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="ml-auto text-white/20" aria-hidden="true">|</span>
        <span>
          {t.home.pyStatusLn} {cursor.line}, {t.home.pyStatusCol} {cursor.column}
        </span>
      </div>

      {/* Mobile file drawer */}
      {filesOpen && (
        <div className="absolute inset-0 z-30 flex lg:hidden">
          <button
            type="button"
            aria-label={t.home.pyIdeFilesClose}
            className="absolute inset-0 cursor-default bg-black/50"
            onClick={() => setFilesOpen(false)}
          />
          <aside
            role="dialog"
            aria-label={t.home.pyIdeFiles}
            className="relative flex w-64 max-w-[80%] flex-col border-r border-[#242838] bg-[#12141f] shadow-2xl"
          >
            <div className="flex h-13 shrink-0 items-center justify-between border-b border-[#242838] px-3">
              <span className="text-sm font-semibold text-white/90">{t.home.pyIdeFiles}</span>
              <button
                type="button"
                onClick={() => setFilesOpen(false)}
                aria-label={t.home.pyIdeFilesClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">{sidebarBody(() => setFilesOpen(false))}</div>
          </aside>
        </div>
      )}

      {/* Confirm dialog (reset / switch example) */}
      {pendingConfirm && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label={t.home.pyIdeCancel}
            className="absolute inset-0 cursor-default bg-black/55"
            onClick={() => setPendingConfirm(null)}
          />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-label={
              pendingConfirm.type === "reset"
                ? t.home.pyIdeResetConfirmTitle
                : t.home.pyIdeExampleConfirmTitle
            }
            className="relative w-full max-w-sm rounded-lg border border-[#2b3042] bg-[#161927] p-5 shadow-2xl"
          >
            <p className="m-0 text-base font-semibold text-white">
              {pendingConfirm.type === "reset"
                ? t.home.pyIdeResetConfirmTitle
                : t.home.pyIdeExampleConfirmTitle}
            </p>
            <p className="m-0 mt-1.5 text-sm leading-relaxed text-white/65">
              {pendingConfirm.type === "reset"
                ? t.home.pyIdeResetConfirmBody
                : t.home.pyIdeExampleConfirmBody}
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setPendingConfirm(null)}
                className="inline-flex h-9 items-center rounded-md px-3.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                {t.home.pyIdeCancel}
              </button>
              <button
                type="button"
                autoFocus
                onClick={confirmPending}
                className="inline-flex h-9 items-center rounded-md bg-avanza-green px-3.5 text-sm font-semibold text-avanza-dark transition-colors hover:bg-emerald-400"
              >
                {pendingConfirm.type === "reset" ? t.home.pyIdeConfirmReset : t.home.pyIdeConfirmLoad}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SidebarContent({
  examples,
  activeExample,
  onSelectExample,
  filesLabel,
  examplesLabel,
  editedLabel,
  isDirty,
}: {
  examples: Example[]
  activeExample: string | null
  onSelectExample: (example: Example) => void
  filesLabel: string
  examplesLabel: string
  editedLabel: string
  isDirty: boolean
}) {
  return (
    <nav className="flex flex-col gap-4 p-3 text-sm">
      <div>
        <p className="m-0 px-2 pb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white/35">
          {filesLabel}
        </p>
        <div className="flex items-center gap-2 rounded-md bg-white/5 px-2.5 py-1.5 font-mono text-[13px] text-white/85">
          <FileCode2 className="h-3.5 w-3.5 shrink-0 text-avanza-green" />
          {FILE_NAME}
          {isDirty && (
            <span
              className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70"
              title={editedLabel}
              aria-label={editedLabel}
              role="img"
            />
          )}
        </div>
      </div>

      <div>
        <p className="m-0 px-2 pb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white/35">
          {examplesLabel}
        </p>
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
          {examples.map((ex) => (
            <li key={ex.id}>
              <button
                type="button"
                onClick={() => onSelectExample(ex)}
                className={cn(
                  "w-full rounded-md px-2.5 py-2 text-left transition-colors hover:bg-white/10",
                  activeExample === ex.id ? "bg-white/10 text-avanza-green" : "text-white/75",
                )}
              >
                {ex.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
