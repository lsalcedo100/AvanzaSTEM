"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Play, Square, Loader2, RotateCcw } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"
import {
  PythonCodeEditor,
  type PythonCodeEditorHandle,
  type EditorDiagnostic,
} from "@/components/ui/python-code-editor"
import { PythonTerminal } from "@/components/ui/python-terminal"
import { usePythonRunner } from "@/components/ui/use-python-runner"

/**
 * Reusable in-browser Python coding workspace: an editable code area, a Run /
 * Reset toolbar, and a terminal that shows printed output, inline input()
 * prompts, and beginner-friendly errors. Python runs in a web worker (via
 * Pyodide loaded from a CDN at runtime), so the page never freezes and nothing
 * is added to the app bundle.
 *
 * The editor, terminal, and execution engine are shared primitives
 * ({@link PythonCodeEditor}, {@link PythonTerminal}, {@link usePythonRunner}).
 * This component supplies the marketing/lesson two-card chrome; the standalone
 * IDE reuses the same primitives with its own app-shell layout.
 */
export type PythonWorkspaceProps = {
  /** Code the editor starts with. */
  starterCode: string
  /** localStorage key so each workspace persists the student's edits independently. */
  storageKey: string
  /**
   * Value the reset button restores. Defaults to `starterCode` (used by
   * lessons). The home playground passes "" to reproduce its "Clear" behavior.
   */
  resetTo?: string
  /** Label for the reset button. Defaults to the translated "Clear" label. */
  resetLabel?: string
  /** Optional plain-text message shown when a run finishes without an error. */
  finishedMessage?: string
  className?: string
}

export function PythonWorkspace({
  starterCode,
  storageKey,
  resetTo,
  resetLabel,
  finishedMessage,
  className,
}: PythonWorkspaceProps) {
  const { t } = useLanguage()
  const runner = usePythonRunner()

  const [code, setCode] = useState<string>(starterCode)
  const [hasLoadedSavedCode, setHasLoadedSavedCode] = useState(false)
  const editorRef = useRef<PythonCodeEditorHandle>(null)
  const skipNextCodeSaveRef = useRef(false)

  const resetValue = resetTo ?? starterCode
  const secondaryLabel = resetLabel ?? t.home.pyClear

  // Restore locally saved student code once the browser APIs are available.
  useEffect(() => {
    let cancelled = false

    queueMicrotask(() => {
      if (cancelled) return
      try {
        const savedCode = window.localStorage.getItem(storageKey)
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
  }, [storageKey])

  // Keep the student's current editor contents local to this browser.
  useEffect(() => {
    if (!hasLoadedSavedCode) return
    if (skipNextCodeSaveRef.current) {
      skipNextCodeSaveRef.current = false
      return
    }

    try {
      window.localStorage.setItem(storageKey, code)
    } catch {
      // The editor still works if persistence is unavailable.
    }
  }, [code, hasLoadedSavedCode, storageKey])

  const handleReset = useCallback(() => {
    skipNextCodeSaveRef.current = true
    try {
      window.localStorage.removeItem(storageKey)
    } catch {
      // Nothing else to do if localStorage is unavailable.
    }
    setCode(resetValue)
    runner.clearOutput()
    requestAnimationFrame(() => editorRef.current?.focus())
  }, [resetValue, storageKey, runner])

  const { status, isBusy } = runner

  const handleEditorRun = useCallback(() => {
    if (runner.isBusy || code.trim().length === 0) return
    runner.run(code)
  }, [runner, code])

  const handleCodeChange = useCallback(
    (next: string) => {
      setCode(next)
      // Once the code is edited, a previous run's error no longer applies -
      // clear it from the terminal (the editor underline clears itself).
      if (runner.status === "done" && runner.outcome === "error") runner.clearOutput()
    },
    [runner],
  )

  const diagnostics = useMemo<EditorDiagnostic[]>(
    () =>
      runner.errorLine != null
        ? [{ line: runner.errorLine, message: runner.errorOutput, severity: "error" }]
        : [],
    [runner.errorLine, runner.errorOutput],
  )

  return (
    <div className={cn("grid gap-6 lg:grid-cols-2", className)}>
      {/* Editor card */}
      <div className="flex flex-col overflow-hidden rounded-2xl bg-[#0f1024] shadow-[0_20px_50px_-24px_rgba(15,16,36,0.55)] ring-1 ring-avanza-dark/10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-white/10 bg-[#16172e] px-4 py-2.5">
          <span className="font-mono text-xs font-medium text-white/40">main.py</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={isBusy}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white/55 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {secondaryLabel}
            </button>
            {isBusy && (
              <button
                type="button"
                onClick={runner.stop}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-400"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
                {t.home.pyStop}
              </button>
            )}
            <button
              type="button"
              onClick={() => runner.run(code)}
              disabled={isBusy || code.trim().length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg bg-avanza-green px-3.5 py-1.5 text-xs font-bold text-avanza-dark transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isBusy ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
              ) : (
                <Play className="h-3.5 w-3.5 fill-current" />
              )}
              {status === "loading"
                ? t.home.pyWarming
                : status === "waiting"
                  ? t.home.pyWaitingInput
                  : status === "running"
                    ? t.home.pyRunning
                    : t.home.pyRun}
            </button>
          </div>
        </div>

        {/* Code area */}
        <PythonCodeEditor
          ref={editorRef}
          code={code}
          onCodeChange={handleCodeChange}
          onRun={handleEditorRun}
          diagnostics={diagnostics}
          ariaLabel={t.home.pyEditorAria}
          placeholder={t.home.pyPlaceholder}
          containerClassName="h-105"
        />
      </div>

      {/* Terminal card */}
      <div className="flex flex-col overflow-hidden rounded-2xl bg-[#0f1024] shadow-[0_20px_50px_-24px_rgba(15,16,36,0.55)] ring-1 ring-avanza-dark/10">
        <PythonTerminal
          runner={runner}
          title={t.home.pyOutputTitle}
          finishedMessage={finishedMessage}
          onErrorLineClick={(line) => editorRef.current?.goToLine(line)}
          className="h-105 min-h-0 lg:h-full"
        />
      </div>
    </div>
  )
}
