"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Play, Square, Terminal, Loader2, RotateCcw, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"
import {
  MAX_OUTPUT_CHARS,
  RUN_TIMEOUT_MS,
  type WorkerRequest,
  type WorkerResponse,
} from "@/components/ui/python-sandbox-shared"

/**
 * Turn a raw Pyodide/Python traceback into a short, beginner-friendly
 * message that points at the user's code instead of internal frames. If the
 * text doesn't look like a normal Python exception, fall back to a generic
 * message instead of leaking raw Pyodide/WASM internals.
 */
function formatPythonError(raw: string, genericMessage: string): string {
  const lines = raw.split("\n")

  // Frames belonging to the sandbox driver itself (not the student's code)
  // shouldn't be reported as "the line" an error happened on.
  const DRIVER_FRAMES = new Set(["<module>", "__avanza_guarded_import__"])

  let lineNumber: number | null = null
  for (const line of lines) {
    const match = line.match(/File "<exec>", line (\d+)(?:, in (\S+))?/)
    if (match && !DRIVER_FRAMES.has(match[2])) lineNumber = Number(match[1])
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    const match = lines[i].trim().match(/^([A-Za-z_][\w.]*(?:Error|Exception|Warning)):\s*(.*)$/)
    if (match) {
      const [, errorType, message] = match
      return lineNumber !== null
        ? `${errorType} on line ${lineNumber}: ${message}`
        : `${errorType}: ${message}`
    }
  }

  return genericMessage
}

const PYTHON_KEYWORDS = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await", "break",
  "class", "continue", "def", "del", "elif", "else", "except", "finally",
  "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal",
  "not", "or", "pass", "raise", "return", "try", "while", "with", "yield",
])

// Common builtins beginners reach for, highlighted alongside true keywords.
const PYTHON_BUILTINS = new Set([
  "print", "input", "len", "range", "str", "int", "float", "bool", "list",
  "dict", "set", "tuple", "type", "sum", "max", "min", "sorted", "reversed",
  "enumerate", "zip", "map", "filter", "open", "abs", "round", "isinstance",
  "super", "object", "Exception", "ValueError", "TypeError", "IndexError",
  "KeyError", "frozenset", "bytes", "format", "id", "iter", "next", "hasattr",
  "getattr", "setattr", "callable", "repr", "all", "any", "pow", "chr", "ord",
])

// Matches comments and strings first (so keywords inside them are left
// alone), then bare identifiers that may be keywords or builtins.
const PYTHON_TOKEN_RE =
  /#[^\n]*|"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|[A-Za-z_]\w*/g

const PYTHON_PLAYGROUND_STORAGE_KEY = "avanza-python-playground-code"

// True if the token at `index` is accessed as an attribute (e.g. `obj.list`),
// in which case it shouldn't be treated as a builtin.
function isAttributeAccess(source: string, index: number): boolean {
  return index > 0 && source[index - 1] === "."
}

function highlightPythonKeywords(source: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let key = 0

  for (const match of source.matchAll(PYTHON_TOKEN_RE)) {
    const token = match[0]
    const index = match.index ?? 0
    if (index > lastIndex) nodes.push(source.slice(lastIndex, index))

    if (PYTHON_KEYWORDS.has(token)) {
      nodes.push(
        <span key={key++} className="text-[#c792ea]">
          {token}
        </span>,
      )
    } else if (PYTHON_BUILTINS.has(token) && !isAttributeAccess(source, index)) {
      nodes.push(
        <span key={key++} className="text-[#61afef]">
          {token}
        </span>,
      )
    } else {
      nodes.push(token)
    }
    lastIndex = index + token.length
  }

  if (lastIndex < source.length) nodes.push(source.slice(lastIndex))
  return nodes
}

export function PythonPlayground() {
  const { t } = useLanguage()

  const [code, setCode] = useState<string>(t.home.pyStarterCode)
  const [hasLoadedSavedCode, setHasLoadedSavedCode] = useState(false)
  const [terminalText, setTerminalText] = useState<string>("")
  const [errorOutput, setErrorOutput] = useState<string>("")
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "waiting" | "done">("idle")
  const [awaitingInput, setAwaitingInput] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLPreElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const workerRef = useRef<Worker | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const outputCharsRef = useRef(0)
  const stderrBufferRef = useRef("")
  const pyodideLoadedRef = useRef(false)
  const onWorkerMessageRef = useRef<(msg: WorkerResponse) => void>(() => {})
  const skipNextCodeSaveRef = useRef(false)

  const lineCount = code.split("\n").length
  const lineNumberDigits = Math.max(2, String(lineCount).length)
  const gutterWidth = `calc(${lineNumberDigits}ch + 2rem)`
  const highlightedCode = useMemo(() => highlightPythonKeywords(code), [code])

  // Restore locally saved student code once the browser APIs are available.
  useEffect(() => {
    let cancelled = false

    queueMicrotask(() => {
      if (cancelled) return
      try {
        const savedCode = window.localStorage.getItem(PYTHON_PLAYGROUND_STORAGE_KEY)
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
      window.localStorage.setItem(PYTHON_PLAYGROUND_STORAGE_KEY, code)
    } catch {
      // The editor still works if persistence is unavailable.
    }
  }, [code, hasLoadedSavedCode])

  // Auto-scroll the terminal to the latest output / input prompt.
  useEffect(() => {
    const el = terminalRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [terminalText, errorOutput, awaitingInput])

  // Focus the inline input as soon as the program asks for input.
  useEffect(() => {
    if (awaitingInput) inputRef.current?.focus()
  }, [awaitingInput])

  const clearRunTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Create a worker for running user code. Pyodide itself isn't loaded until
  // the worker receives its first "run" message.
  const createWorker = useCallback(() => {
    pyodideLoadedRef.current = false
    const worker = new Worker(new URL("./python-playground.worker.ts", import.meta.url), {
      type: "module",
    })
    worker.onmessage = (e: MessageEvent<WorkerResponse>) => onWorkerMessageRef.current(e.data)
    worker.onerror = () => onWorkerMessageRef.current({ type: "load_error", message: "" })
    return worker
  }, [])

  // Terminate the active worker (if any) and spin up a fresh one so the next
  // run always starts clean.
  const resetWorker = useCallback(() => {
    clearRunTimeout()
    const worker = workerRef.current
    if (worker) {
      worker.onmessage = null
      worker.onerror = null
      worker.terminate()
    }
    workerRef.current = createWorker()
  }, [clearRunTimeout, createWorker])

  // Create the worker once on mount and clean it up on unmount.
  useEffect(() => {
    workerRef.current = createWorker()
    return () => {
      clearRunTimeout()
      const worker = workerRef.current
      if (worker) {
        worker.onmessage = null
        worker.onerror = null
        worker.terminate()
      }
      workerRef.current = null
    }
  }, [createWorker, clearRunTimeout])

  const finishRun = useCallback(() => {
    clearRunTimeout()
    setAwaitingInput(false)
    setStatus("done")
  }, [clearRunTimeout])

  const handleTimeout = useCallback(() => {
    resetWorker()
    setAwaitingInput(false)
    setInputValue("")
    setErrorOutput(t.home.pyTimeoutError)
    setStatus("done")
  }, [resetWorker, t.home.pyTimeoutError])

  const startRunTimeout = useCallback(() => {
    clearRunTimeout()
    timeoutRef.current = setTimeout(handleTimeout, RUN_TIMEOUT_MS)
  }, [clearRunTimeout, handleTimeout])

  const onWorkerMessage = useCallback(
    (msg: WorkerResponse) => {
      switch (msg.type) {
        case "pyodide_ready":
          pyodideLoadedRef.current = true
          setStatus("running")
          break

        case "stdout":
        case "stderr": {
          outputCharsRef.current += msg.text.length
          if (outputCharsRef.current > MAX_OUTPUT_CHARS) {
            resetWorker()
            setAwaitingInput(false)
            setInputValue("")
            setErrorOutput(t.home.pyOutputCapError)
            setStatus("done")
            break
          }
          if (msg.type === "stdout") {
            setTerminalText((prev) => prev + msg.text + "\n")
          } else {
            stderrBufferRef.current += msg.text + "\n"
          }
          break
        }

        case "input_request":
          // Pause the run timeout while we wait on the student to type.
          clearRunTimeout()
          setTerminalText((prev) => prev + msg.prompt)
          setStatus("waiting")
          setAwaitingInput(true)
          break

        case "error":
          setErrorOutput(formatPythonError(msg.message, t.home.pyGenericError))
          finishRun()
          break

        case "done":
          if (stderrBufferRef.current) {
            setErrorOutput(formatPythonError(stderrBufferRef.current, t.home.pyGenericError))
          }
          finishRun()
          break

        case "load_error":
          setErrorOutput(msg.message ? `${t.home.pyLoadFailed} ${msg.message}` : t.home.pyLoadFailed)
          finishRun()
          break
      }
    },
    [clearRunTimeout, finishRun, resetWorker, t.home.pyGenericError, t.home.pyLoadFailed, t.home.pyOutputCapError],
  )

  // Keep the worker's message handler pointed at the latest closure without
  // needing to recreate the worker every time translations or callbacks change.
  useEffect(() => {
    onWorkerMessageRef.current = onWorkerMessage
  }, [onWorkerMessage])

  const submitInput = useCallback(() => {
    const value = inputValue
    setTerminalText((prev) => prev + value + "\n")
    setAwaitingInput(false)
    setInputValue("")
    setStatus("running")
    startRunTimeout()
    const message: WorkerRequest = { type: "input", value }
    workerRef.current?.postMessage(message)
  }, [inputValue, startRunTimeout])

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        submitInput()
      }
    },
    [submitInput],
  )

  const handleRun = useCallback(() => {
    setErrorOutput("")
    setTerminalText("")
    setAwaitingInput(false)
    setInputValue("")
    outputCharsRef.current = 0
    stderrBufferRef.current = ""

    if (!workerRef.current) workerRef.current = createWorker()

    setStatus(pyodideLoadedRef.current ? "running" : "loading")
    startRunTimeout()

    const message: WorkerRequest = { type: "run", code }
    workerRef.current.postMessage(message)
  }, [code, createWorker, startRunTimeout])

  const handleStop = useCallback(() => {
    resetWorker()
    setAwaitingInput(false)
    setInputValue("")
    setTerminalText((prev) => (prev && !prev.endsWith("\n") ? `${prev}\n` : prev) + `${t.home.pyStopped}\n`)
    setStatus("done")
  }, [resetWorker, t.home.pyStopped])

  const handleClear = useCallback(() => {
    skipNextCodeSaveRef.current = true
    try {
      window.localStorage.removeItem(PYTHON_PLAYGROUND_STORAGE_KEY)
    } catch {
      // Nothing else to do if localStorage is unavailable.
    }
    setCode("")
    setTerminalText("")
    setErrorOutput("")
    setAwaitingInput(false)
    setInputValue("")
    requestAnimationFrame(() => textareaRef.current?.focus())
  }, [])

  const isBusy = status === "loading" || status === "running" || status === "waiting"

  return (
    <section className="relative overflow-hidden bg-[#fff8e8] py-20 md:py-24">
      {/* Notebook dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 22%, rgba(46,204,113,0.18) 0 5px, transparent 6px), radial-gradient(circle at 86% 18%, rgba(139,92,246,0.16) 0 4px, transparent 5px), radial-gradient(circle at 18% 82%, rgba(249,115,22,0.16) 0 4px, transparent 5px), radial-gradient(circle at 82% 86%, rgba(26,188,156,0.18) 0 5px, transparent 6px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-green">
            {t.home.pyEyebrow}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.home.pyTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.home.pyDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Editor card */}
            <div className="flex flex-col overflow-hidden rounded-2xl bg-[#0f1024] shadow-[0_20px_50px_-24px_rgba(15,16,36,0.55)] ring-1 ring-avanza-dark/10">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#16172e] px-4 py-2.5">
                <span className="font-mono text-xs font-medium text-white/40">main.py</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={isBusy}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white/55 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t.home.pyClear}
                  </button>
                  {isBusy && (
                    <button
                      type="button"
                      onClick={handleStop}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-400"
                    >
                      <Square className="h-3.5 w-3.5 fill-current" />
                      {t.home.pyStop}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleRun}
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
              <div className="flex h-105 overflow-hidden">
                <div
                  ref={gutterRef}
                  aria-hidden="true"
                  className="shrink-0 select-none overflow-hidden bg-[#0c0d1f] px-3 py-4 text-right font-mono text-[13px] leading-[1.6] tabular-nums text-white/25"
                  style={{ width: gutterWidth, minWidth: gutterWidth }}
                >
                  {Array.from({ length: lineCount }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="relative min-w-0 flex-1">
                  <pre
                    ref={highlightRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 m-0 overflow-hidden whitespace-pre px-4 py-4 font-mono text-[13px] leading-[1.6] text-[#d8dee9]"
                  >
                    {highlightedCode}
                  </pre>
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => handleEditorKeyDown(e, textareaRef, setCode)}
                    onScroll={(e) => {
                      const { scrollLeft, scrollTop } = e.currentTarget
                      if (highlightRef.current) {
                        highlightRef.current.scrollLeft = scrollLeft
                        highlightRef.current.scrollTop = scrollTop
                      }
                      if (gutterRef.current) {
                        gutterRef.current.scrollTop = scrollTop
                      }
                    }}
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                    wrap="off"
                    aria-label={t.home.pyEditorAria}
                    className="absolute inset-0 h-full w-full resize-none overflow-auto bg-transparent px-4 py-4 font-mono text-[13px] leading-[1.6] text-transparent caret-avanza-green outline-none placeholder:text-white/25"
                    placeholder={t.home.pyPlaceholder}
                  />
                </div>
              </div>
            </div>

            {/* Terminal card */}
            <div className="flex flex-col overflow-hidden rounded-2xl bg-[#0f1024] shadow-[0_20px_50px_-24px_rgba(15,16,36,0.55)] ring-1 ring-avanza-dark/10">
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#16172e] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white/55">
                <Terminal className="h-3.5 w-3.5 text-avanza-green" />
                {t.home.pyOutputTitle}
              </div>

              <div
                ref={terminalRef}
                onClick={() => awaitingInput && inputRef.current?.focus()}
                className={cn(
                  "h-105 overflow-y-auto overflow-x-hidden p-4 font-mono text-[13px] leading-[1.6] [-webkit-overflow-scrolling:touch]",
                  awaitingInput && "cursor-text",
                )}
              >
                {status === "loading" ? (
                  <div className="flex items-center gap-2 text-amber-300">
                    <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                    <span className="font-sans text-sm font-medium">{t.home.pyWarmingLong}</span>
                  </div>
                ) : (
                  <>
                    {!terminalText && !errorOutput && !awaitingInput && (
                      <p className="m-0 font-sans text-sm text-white/40">{t.home.pyOutputEmpty}</p>
                    )}

                    {(terminalText || awaitingInput) && (
                      <pre className="m-0 whitespace-pre-wrap break-words text-[#d8dee9]">
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

                    {errorOutput && (
                      <div
                        className={cn(
                          "rounded-lg bg-red-950/40 p-3 ring-1 ring-red-500/20",
                          (terminalText || awaitingInput) && "mt-3",
                        )}
                      >
                        <p className="m-0 mb-1 flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-wide text-red-400">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          {t.home.pyErrorLabel}
                        </p>
                        <pre className="m-0 whitespace-pre-wrap break-words text-red-300">
                          {errorOutput}
                        </pre>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const INDENT = "    " // 4 spaces (Python convention)

/**
 * Editor key handling: smart auto-indent for Python.
 * - Enter on a line ending with ':' or '\\' adds an extra indent level.
 * - Enter normally preserves the previous line's leading whitespace.
 * - Tab inserts 4 spaces (or indents the selected lines if a range is selected).
 * - Shift+Tab dedents one level on the current line / selected lines.
 * - Backspace at the start of an indented line removes one indent level.
 */
function handleEditorKeyDown(
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  ref: React.RefObject<HTMLTextAreaElement | null>,
  setValue: (next: string) => void,
) {
  const ta = ref.current
  if (!ta) return
  const value = ta.value
  const start = ta.selectionStart
  const end = ta.selectionEnd

  const lineStart = value.lastIndexOf("\n", start - 1) + 1
  const lineEnd = value.indexOf("\n", end)
  const lineEndIdx = lineEnd === -1 ? value.length : lineEnd
  const currentLine = value.slice(lineStart, start)
  const leading = currentLine.match(/^[\t ]*/)?.[0] ?? ""

  if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
    // Determine if previous (current) line ends with `:` (block opener) or `\\`
    const beforeCursor = value.slice(lineStart, start)
    const trimmed = beforeCursor.replace(/\s+$/, "")
    const opensBlock = /[:\\]$/.test(trimmed)
    const indent = leading + (opensBlock ? INDENT : "")
    e.preventDefault()
    const next = value.slice(0, start) + "\n" + indent + value.slice(end)
    setValue(next)
    requestAnimationFrame(() => {
      const pos = start + 1 + indent.length
      ta.selectionStart = ta.selectionEnd = pos
    })
    return
  }

  if (e.key === "Tab") {
    e.preventDefault()
    // Multi-line indent / dedent if a range covers a newline
    const hasMulti = value.slice(start, end).includes("\n") || start !== end
    if (hasMulti) {
      const segStart = value.lastIndexOf("\n", start - 1) + 1
      const segEndIdx = lineEndIdx
      const segment = value.slice(segStart, segEndIdx)
      let updated: string
      if (e.shiftKey) {
        updated = segment
          .split("\n")
          .map((l) => (l.startsWith(INDENT) ? l.slice(INDENT.length) : l.replace(/^\t/, "")))
          .join("\n")
      } else {
        updated = segment
          .split("\n")
          .map((l) => INDENT + l)
          .join("\n")
      }
      const next = value.slice(0, segStart) + updated + value.slice(segEndIdx)
      setValue(next)
      const delta = updated.length - segment.length
      requestAnimationFrame(() => {
        ta.selectionStart = segStart
        ta.selectionEnd = segEndIdx + delta
      })
      return
    }
    if (e.shiftKey) {
      // Dedent current line one level
      if (currentLine.startsWith(INDENT)) {
        const next =
          value.slice(0, lineStart) +
          currentLine.slice(INDENT.length) +
          value.slice(start)
        setValue(next)
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = Math.max(
            lineStart,
            start - INDENT.length,
          )
        })
      }
      return
    }
    // Insert 4 spaces
    const next = value.slice(0, start) + INDENT + value.slice(end)
    setValue(next)
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + INDENT.length
    })
    return
  }

  if (e.key === "Backspace" && start === end && start > 0) {
    // If cursor is at the end of the leading whitespace and that whitespace is
    // a multiple of INDENT, eat one full indent on backspace.
    const beforeCursor = value.slice(lineStart, start)
    if (beforeCursor.length > 0 && /^[ ]+$/.test(beforeCursor) && beforeCursor.length % INDENT.length === 0) {
      e.preventDefault()
      const next = value.slice(0, start - INDENT.length) + value.slice(start)
      setValue(next)
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start - INDENT.length
      })
    }
    return
  }
}
