"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Loader2, AlertTriangle, TriangleAlert, Copy, Check, Trash2, Square, Terminal } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"
import type { PythonRunner } from "@/components/ui/use-python-runner"
import type { Translations } from "@/i18n/translations"

// Maps a Python exception class to a short, reliable beginner hint. Only these
// well-understood error types get a hint - everything else shows the real
// Python error alone, never a vague custom message.
const ERROR_HELP_KEYS: Partial<Record<string, keyof Translations["home"]>> = {
  SyntaxError: "pyErrHelpSyntaxError",
  IndentationError: "pyErrHelpIndentationError",
  TabError: "pyErrHelpIndentationError",
  NameError: "pyErrHelpNameError",
  UnboundLocalError: "pyErrHelpNameError",
  TypeError: "pyErrHelpTypeError",
  ValueError: "pyErrHelpValueError",
  IndexError: "pyErrHelpIndexError",
  KeyError: "pyErrHelpKeyError",
  ZeroDivisionError: "pyErrHelpZeroDivisionError",
  AttributeError: "pyErrHelpAttributeError",
  ModuleNotFoundError: "pyErrHelpModuleNotFoundError",
  ImportError: "pyErrHelpModuleNotFoundError",
  RecursionError: "pyErrHelpRecursionError",
}

export type PythonTerminalProps = {
  runner: PythonRunner
  /** Header label, e.g. the translated "Terminal". */
  title: string
  /** Classes for the panel (parent supplies height/border). */
  className?: string
  /** Classes for the scroll body (padding lives here). */
  bodyClassName?: string
  /** Optional plain-text note shown when a run completes without an error. */
  finishedMessage?: string
  /** Filename shown in the "Running ..." line and used for the run echo. */
  fileName?: string
  /** Click handler for the "Go to line" reference on an error. */
  onErrorLineClick?: (line: number) => void
}

function formatSeconds(ms: number): string {
  return (ms / 1000).toFixed(2)
}

/**
 * The output panel: a compact terminal header (title + Clear / Copy / Stop) over
 * a scrollable, monospace read-out. It shows the run lifecycle (Running... →
 * output → Finished in Xs / Stopped), keeps stdout, warnings, and errors
 * visually distinct with restrained colour, and turns a located Python error
 * into a clickable "Go to line" plus a short beginner hint. The real Python
 * error text is always preserved.
 */
export function PythonTerminal({
  runner,
  title,
  className,
  bodyClassName,
  finishedMessage,
  fileName = "main.py",
  onErrorLineClick,
}: PythonTerminalProps) {
  const { t } = useLanguage()
  const {
    status,
    isBusy,
    outcome,
    durationMs,
    terminalText,
    errorOutput,
    errorLine,
    errorType,
    warningOutput,
    hasOutput,
    awaitingInput,
    inputValue,
    setInputValue,
    inputRef,
    terminalRef,
    handleInputKeyDown,
  } = runner

  const [copied, setCopied] = useState(false)
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => {
    if (copyResetRef.current) clearTimeout(copyResetRef.current)
  }, [])

  const hasStarted = status !== "idle"
  const helpKey = errorType ? ERROR_HELP_KEYS[errorType] : undefined
  const errorHelp = helpKey ? t.home[helpKey] : null

  // Assemble the visible transcript as plain text for Copy.
  const buildCopyText = useCallback(() => {
    const parts: string[] = []
    if (hasStarted) parts.push(`${t.home.pyRunningProgram} ${fileName}`)
    if (terminalText) parts.push(terminalText.replace(/\n$/, ""))
    if (warningOutput) parts.push(`${t.home.pyWarningLabel}: ${warningOutput}`)
    if (errorOutput) parts.push(`${t.home.pyErrorLabel}: ${errorOutput}`)
    if (status === "done" && outcome === "completed" && durationMs !== null) {
      parts.push(`${t.home.pyFinishedIn} ${formatSeconds(durationMs)}s`)
    }
    if (status === "done" && outcome === "stopped") parts.push(t.home.pyStateStopped)
    return parts.join("\n")
  }, [
    hasStarted,
    terminalText,
    warningOutput,
    errorOutput,
    status,
    outcome,
    durationMs,
    fileName,
    t.home,
  ])

  const handleCopy = useCallback(() => {
    const text = buildCopyText()
    if (!text) return
    void navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      if (copyResetRef.current) clearTimeout(copyResetRef.current)
      copyResetRef.current = setTimeout(() => setCopied(false), 1500)
    })
  }, [buildCopyText])

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      {/* Terminal header */}
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-white/10 bg-white/3 pl-3 pr-2">
        <Terminal className="h-3.5 w-3.5 text-avanza-green" />
        <span className="text-xs font-semibold uppercase tracking-wide text-white/55">{title}</span>
        <div className="ml-auto flex items-center gap-0.5">
          {isBusy ? (
            <button
              type="button"
              onClick={runner.stop}
              aria-label={t.home.pyStop}
              title={t.home.pyStop}
              className="inline-flex h-7 items-center gap-1.5 rounded-md bg-red-500 px-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-400"
            >
              <Square className="h-3 w-3 fill-current" />
              {t.home.pyStop}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!hasOutput}
                aria-label={t.home.pyCopyOutput}
                title={t.home.pyTipCopy}
                className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-avanza-green" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{copied ? t.home.pyCopied : t.home.pyCopyOutput}</span>
              </button>
              <button
                type="button"
                onClick={runner.clearOutput}
                disabled={!hasOutput}
                aria-label={t.home.pyClearOutput}
                title={t.home.pyTipClear}
                className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t.home.pyClearOutput}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Scrollable body */}
      <div
        ref={terminalRef}
        onClick={() => awaitingInput && inputRef.current?.focus()}
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overflow-x-hidden font-mono text-[13px] leading-[1.6] [-webkit-overflow-scrolling:touch]",
          awaitingInput && "cursor-text",
          bodyClassName ?? "p-4",
        )}
      >
        {!hasStarted && !hasOutput ? (
          <p className="m-0 font-sans text-sm text-white/50">{t.home.pyTerminalEmpty}</p>
        ) : (
          <>
            {hasStarted && (
              <p className="m-0 text-white/45">
                <span className="text-avanza-green">{"› "}</span>
                {t.home.pyRunningProgram} {fileName}
              </p>
            )}

            {status === "loading" && (
              <div className="mt-1 flex items-center gap-2 text-amber-300">
                <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                <span className="font-sans text-sm font-medium">{t.home.pyWarmingLong}</span>
              </div>
            )}

            {(terminalText || awaitingInput) && (
              <pre className="m-0 mt-1 whitespace-pre-wrap break-words text-[#d8dee9]">
                {terminalText}
                {awaitingInput && (
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    aria-label={t.home.pyInputAria}
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                    autoFocus
                    className="inline-block min-w-[1ch] border-none bg-transparent p-0 font-mono text-[13px] leading-[1.6] text-avanza-green caret-avanza-green outline-none"
                    style={{ width: `${Math.max(inputValue.length, 1)}ch` }}
                  />
                )}
              </pre>
            )}

            {warningOutput && (
              <div className="mt-3 rounded-lg bg-amber-950/30 p-3 ring-1 ring-amber-500/20">
                <p className="m-0 mb-1 flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-wide text-amber-400">
                  <TriangleAlert className="h-3.5 w-3.5" />
                  {t.home.pyWarningLabel}
                </p>
                <pre className="m-0 whitespace-pre-wrap break-words text-amber-200/90">{warningOutput}</pre>
              </div>
            )}

            {errorOutput && (
              <div className="mt-3 rounded-lg bg-red-950/40 p-3 ring-1 ring-red-500/20">
                <p className="m-0 mb-1 flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-wide text-red-400">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {t.home.pyErrorLabel}
                </p>
                <pre className="m-0 whitespace-pre-wrap break-words text-red-300">{errorOutput}</pre>
                {errorLine !== null && onErrorLineClick && (
                  <button
                    type="button"
                    onClick={() => onErrorLineClick(errorLine)}
                    className="mt-2 inline-flex items-center rounded-md bg-red-500/15 px-2 py-1 font-sans text-xs font-medium text-red-200 underline decoration-red-300/40 underline-offset-2 transition-colors hover:bg-red-500/25"
                  >
                    {t.home.pyGoToLine.replace("{n}", String(errorLine))}
                  </button>
                )}
                {errorHelp && (
                  <p className="m-0 mt-2 font-sans text-xs leading-relaxed text-red-200/70">{errorHelp}</p>
                )}
              </div>
            )}

            {status === "done" && outcome === "completed" && durationMs !== null && (
              <p className="m-0 mt-3 text-emerald-300/90">
                {t.home.pyFinishedIn} {formatSeconds(durationMs)}s
              </p>
            )}

            {status === "done" && outcome === "stopped" && (
              <p className="m-0 mt-3 text-amber-300/90">{t.home.pyStateStopped}</p>
            )}

            {finishedMessage && status === "done" && outcome === "completed" && (
              <p className="m-0 mt-1 font-sans text-sm text-emerald-300/80">{finishedMessage}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
