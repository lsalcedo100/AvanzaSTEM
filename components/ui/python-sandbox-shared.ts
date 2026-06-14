// Shared types and constants for the Python sandbox worker and the React
// component that drives it. Keeping these in their own module avoids
// importing the worker's runtime code into the main UI bundle.

/** Hard wall-clock limit for a single run before the worker is terminated. */
export const RUN_TIMEOUT_MS = 5000

/** Maximum combined stdout+stderr characters before the run is stopped. */
export const MAX_OUTPUT_CHARS = 16000

export type WorkerRequest =
  | { type: "run"; code: string }
  | { type: "input"; value: string }

export type WorkerResponse =
  | { type: "pyodide_ready" }
  | { type: "stdout"; text: string }
  | { type: "stderr"; text: string }
  | { type: "input_request"; prompt: string }
  | { type: "error"; message: string }
  | { type: "done" }
  | { type: "load_error"; message: string }
