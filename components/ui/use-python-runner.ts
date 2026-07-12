"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import {
  MAX_OUTPUT_CHARS,
  RUN_TIMEOUT_MS,
  type WorkerRequest,
  type WorkerResponse,
} from "@/components/ui/python-sandbox-shared"

/** A formatted, beginner-friendly error plus the parts the UI needs to help. */
export type FormattedPythonError = {
  text: string
  /** 1-based line in the student's code, when the traceback names one. */
  line: number | null
  /** The exception class (e.g. "NameError"), used to offer a hint. */
  errorType: string | null
}

/**
 * Turn a raw Pyodide/Python traceback into a short message that keeps the real
 * Python error (type + message) and points at the offending line when the
 * traceback provides one. If the text doesn't look like a normal Python
 * exception, fall back to a generic message instead of leaking raw
 * Pyodide/WASM internals.
 */
export function formatPythonError(raw: string, genericMessage: string): FormattedPythonError {
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
      return {
        text:
          lineNumber !== null
            ? `${errorType} on line ${lineNumber}: ${message}`
            : `${errorType}: ${message}`,
        line: lineNumber,
        errorType,
      }
    }
  }

  return { text: genericMessage, line: null, errorType: null }
}

export type RunnerStatus = "idle" | "loading" | "running" | "waiting" | "done"
/** How a finished run ended - drives the terminal footer and status bar. */
export type RunOutcome = "completed" | "stopped" | "error" | null

/**
 * Headless controller for the in-browser Python runner: it owns the web worker
 * (Pyodide, loaded from a CDN on first run), the terminal text, inline input()
 * handling, an execution timeout, run timing, and beginner-friendly error
 * formatting. It renders nothing - the editor chrome (workspace card, IDE
 * panels, ...) reads this state and calls {@link run}/{@link stop}/{@link submitInput}.
 *
 * This is the single Python execution engine in the app. Every editor surface
 * (home playground, lesson pages, standalone IDE) drives the same worker
 * through this hook - do not fork a second runner.
 */
export function usePythonRunner() {
  const { t } = useLanguage()

  const [terminalText, setTerminalText] = useState<string>("")
  const [errorOutput, setErrorOutput] = useState<string>("")
  const [errorLine, setErrorLine] = useState<number | null>(null)
  const [errorType, setErrorType] = useState<string | null>(null)
  const [warningOutput, setWarningOutput] = useState<string>("")
  const [status, setStatus] = useState<RunnerStatus>("idle")
  const [outcome, setOutcome] = useState<RunOutcome>(null)
  const [durationMs, setDurationMs] = useState<number | null>(null)
  const [awaitingInput, setAwaitingInput] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const workerRef = useRef<Worker | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const outputCharsRef = useRef(0)
  const stderrBufferRef = useRef("")
  const pyodideLoadedRef = useRef(false)
  const onWorkerMessageRef = useRef<(msg: WorkerResponse) => void>(() => {})

  // Guards against a second run starting while one is already in flight, and
  // accumulates active (non-input-waiting) execution time for accurate timing.
  const runningRef = useRef(false)
  const runStartRef = useRef<number | null>(null)
  const activeMsRef = useRef(0)

  // Auto-scroll the terminal to the latest output / input prompt.
  useEffect(() => {
    const el = terminalRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [terminalText, errorOutput, warningOutput, awaitingInput])

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
  // run always starts clean. This is how Stop / timeout actually halt an
  // infinite loop: the whole WASM environment is torn down.
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

  // Stop counting active execution time and return the total for this run.
  const settleTiming = useCallback(() => {
    const now = performance.now()
    const total = activeMsRef.current + (runStartRef.current !== null ? now - runStartRef.current : 0)
    activeMsRef.current = total
    runStartRef.current = null
    return total
  }, [])

  // Move a finished run into its terminal state, recording how it ended and how
  // long the program actually ran (input waiting excluded).
  const finishRun = useCallback(
    (nextOutcome: Exclude<RunOutcome, null>) => {
      clearRunTimeout()
      const total = settleTiming()
      runningRef.current = false
      setDurationMs(total)
      setOutcome(nextOutcome)
      setAwaitingInput(false)
      setStatus("done")
    },
    [clearRunTimeout, settleTiming],
  )

  const startRunTimeout = useCallback(() => {
    clearRunTimeout()
    timeoutRef.current = setTimeout(() => {
      resetWorker()
      setInputValue("")
      setErrorOutput(t.home.pyTimeoutError)
      setErrorType(null)
      setErrorLine(null)
      finishRun("error")
    }, RUN_TIMEOUT_MS)
  }, [clearRunTimeout, resetWorker, finishRun, t.home.pyTimeoutError])

  // Begin (or resume) the active-execution phase: mark running, restart the
  // execution timeout, and start the clock.
  const beginRunning = useCallback(() => {
    runStartRef.current = performance.now()
    setStatus("running")
    startRunTimeout()
  }, [startRunTimeout])

  const onWorkerMessage = useCallback(
    (msg: WorkerResponse) => {
      switch (msg.type) {
        case "pyodide_ready":
          pyodideLoadedRef.current = true
          beginRunning()
          break

        case "stdout":
        case "stderr": {
          outputCharsRef.current += msg.text.length
          if (outputCharsRef.current > MAX_OUTPUT_CHARS) {
            resetWorker()
            setInputValue("")
            setErrorOutput(t.home.pyOutputCapError)
            setErrorType(null)
            setErrorLine(null)
            finishRun("error")
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
          // Pause the timeout and the run clock while we wait on the student.
          clearRunTimeout()
          settleTiming()
          setTerminalText((prev) => prev + msg.prompt)
          setStatus("waiting")
          setAwaitingInput(true)
          break

        case "error": {
          // A non-fatal message on stderr (e.g. a warning printed before the
          // crash) is shown separately from the fatal exception.
          if (stderrBufferRef.current) setWarningOutput(stderrBufferRef.current.replace(/\n$/, ""))
          const formatted = formatPythonError(msg.message, t.home.pyGenericError)
          setErrorOutput(formatted.text)
          setErrorType(formatted.errorType)
          setErrorLine(formatted.line)
          finishRun("error")
          break
        }

        case "done":
          // The program finished normally. Anything on stderr is a warning, not
          // a crash, so it never masquerades as a red error.
          if (stderrBufferRef.current) setWarningOutput(stderrBufferRef.current.replace(/\n$/, ""))
          finishRun("completed")
          break

        case "load_error":
          setErrorOutput(msg.message ? `${t.home.pyLoadFailed} ${msg.message}` : t.home.pyLoadFailed)
          setErrorType(null)
          setErrorLine(null)
          finishRun("error")
          break
      }
    },
    [
      beginRunning,
      clearRunTimeout,
      settleTiming,
      finishRun,
      resetWorker,
      t.home.pyGenericError,
      t.home.pyLoadFailed,
      t.home.pyOutputCapError,
    ],
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
    beginRunning()
    const message: WorkerRequest = { type: "input", value }
    workerRef.current?.postMessage(message)
  }, [inputValue, beginRunning])

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        submitInput()
      }
    },
    [submitInput],
  )

  const run = useCallback(
    (code: string) => {
      // Prevent a second, overlapping run from corrupting the environment.
      if (runningRef.current) return
      runningRef.current = true

      setErrorOutput("")
      setErrorType(null)
      setErrorLine(null)
      setWarningOutput("")
      setTerminalText("")
      setOutcome(null)
      setDurationMs(null)
      setAwaitingInput(false)
      setInputValue("")
      outputCharsRef.current = 0
      stderrBufferRef.current = ""
      activeMsRef.current = 0
      runStartRef.current = null

      if (!workerRef.current) workerRef.current = createWorker()

      if (pyodideLoadedRef.current) {
        // Environment is warm: start executing (and timing) immediately.
        beginRunning()
      } else {
        // First run downloads Pyodide; don't start the execution timeout until
        // the program actually begins (pyodide_ready), so a slow download is
        // never mistaken for a slow program.
        setStatus("loading")
      }

      const message: WorkerRequest = { type: "run", code }
      workerRef.current.postMessage(message)
    },
    [createWorker, beginRunning],
  )

  const stop = useCallback(() => {
    resetWorker()
    settleTiming()
    runningRef.current = false
    setAwaitingInput(false)
    setInputValue("")
    setDurationMs(null)
    setOutcome("stopped")
    setStatus("done")
  }, [resetWorker, settleTiming])

  // Clear the terminal back to a fresh, idle state, keeping the user's code.
  const clearOutput = useCallback(() => {
    setTerminalText("")
    setErrorOutput("")
    setErrorType(null)
    setErrorLine(null)
    setWarningOutput("")
    setOutcome(null)
    setDurationMs(null)
    setStatus("idle")
    setAwaitingInput(false)
    setInputValue("")
  }, [])

  const isBusy = status === "loading" || status === "running" || status === "waiting"
  const hasOutput = terminalText !== "" || errorOutput !== "" || warningOutput !== "" || status === "done"

  return {
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
    run,
    stop,
    submitInput,
    clearOutput,
  }
}

export type PythonRunner = ReturnType<typeof usePythonRunner>
