import type { WorkerRequest, WorkerResponse } from "./python-sandbox-shared"

const PYODIDE_VERSION = "0.26.4"
const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`
const PYODIDE_SCRIPT_URL = `${PYODIDE_INDEX_URL}pyodide.js`
const PYODIDE_SCRIPT_INTEGRITY =
  "sha384-i3R37b3tF+HWudsUf1VSEOY2YxwSNMqY8DQa9Z0O3xh+NkJ9o+yjcGyIi5huj+nB"

type PyodideAPI = {
  runPythonAsync: (code: string) => Promise<unknown>
  setStdout: (opts: { batched?: (s: string) => void }) => void
  setStderr: (opts: { batched?: (s: string) => void }) => void
  globals: { set: (name: string, value: unknown) => void }
}

let pyodidePromise: Promise<PyodideAPI> | null = null

/**
 * Fetch the pinned Pyodide script with SRI verification and execute it in
 * the worker's global scope (the same effect as `importScripts`, but with
 * integrity checking, no credentials, and no referrer leakage).
 */
function loadPyodideInWorker(): Promise<PyodideAPI> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      const response = await fetch(PYODIDE_SCRIPT_URL, {
        integrity: PYODIDE_SCRIPT_INTEGRITY,
        mode: "cors",
        credentials: "omit",
        referrerPolicy: "no-referrer",
      })
      if (!response.ok) {
        throw new Error("Failed to load Pyodide script")
      }
      const scriptText = await response.text()
      // Indirect eval runs in the worker's global scope, so this sets
      // `self.loadPyodide` just like importScripts would.
      ;(0, eval)(scriptText)

      const loadPyodide = (
        self as unknown as {
          loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideAPI>
        }
      ).loadPyodide
      if (!loadPyodide) {
        throw new Error("loadPyodide not found after script load")
      }
      return loadPyodide({ indexURL: PYODIDE_INDEX_URL })
    })().catch((err) => {
      pyodidePromise = null
      throw err
    })
  }
  return pyodidePromise
}

/**
 * Driver script run before the user's code. It rewrites `input(...)` calls
 * (and any function that calls them, directly or indirectly) into
 * `await input(...)`, wraps the whole program in an async function, and
 * routes `input()` through `__avanza_request_input__`, a JS callback that
 * returns a Promise resolved when the main thread sends back a value.
 *
 * It also installs a guarded `__import__` for the user's module namespace
 * only (not for this driver code) that blocks `js`, `pyodide_js`, and
 * `micropip` as defense in depth against reaching outside the sandbox.
 */
const DRIVER_SOURCE = `
import ast
import builtins as __avanza_builtins__


def __avanza_has_direct_input(node):
    for child in ast.iter_child_nodes(node):
        if isinstance(child, (ast.FunctionDef, ast.AsyncFunctionDef, ast.Lambda)):
            continue
        if isinstance(child, ast.Call) and isinstance(child.func, ast.Name) and child.func.id == "input":
            return True
        if __avanza_has_direct_input(child):
            return True
    return False


def __avanza_calls_any(node, names):
    found = []

    def walk(n, top):
        for child in ast.iter_child_nodes(n):
            if isinstance(child, (ast.FunctionDef, ast.AsyncFunctionDef, ast.Lambda)) and not top:
                continue
            if isinstance(child, ast.Call):
                target = None
                if isinstance(child.func, ast.Name):
                    target = child.func.id
                elif isinstance(child.func, ast.Attribute):
                    target = child.func.attr
                if target in names:
                    found.append(target)
            walk(child, False)

    walk(node, True)
    return found


class __AvanzaAwaitInput(ast.NodeTransformer):
    def __init__(self, async_names):
        self.async_names = async_names

    def visit_Call(self, node):
        self.generic_visit(node)
        target = None
        if isinstance(node.func, ast.Name):
            target = node.func.id
        elif isinstance(node.func, ast.Attribute):
            target = node.func.attr
        if target == "input" or target in self.async_names:
            return ast.copy_location(ast.Await(value=node), node)
        return node

    def visit_FunctionDef(self, node):
        self.generic_visit(node)
        if node.name in self.async_names:
            return ast.copy_location(
                ast.AsyncFunctionDef(
                    name=node.name,
                    args=node.args,
                    body=node.body,
                    decorator_list=node.decorator_list,
                    returns=node.returns,
                    type_comment=getattr(node, "type_comment", None),
                    type_params=getattr(node, "type_params", []),
                ),
                node,
            )
        return node


def __avanza_prepare(source):
    tree = ast.parse(source, filename="<exec>", mode="exec")

    by_name = {}
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            by_name.setdefault(node.name, []).append(node)

    async_names = set()
    changed = True
    while changed:
        changed = False
        for name, nodes in by_name.items():
            if name in async_names:
                continue
            for node in nodes:
                if __avanza_has_direct_input(node) or __avanza_calls_any(node, async_names):
                    async_names.add(name)
                    changed = True
                    break

    tree = __AvanzaAwaitInput(async_names).visit(tree)
    ast.fix_missing_locations(tree)

    wrapper = ast.AsyncFunctionDef(
        name="__avanza_main__",
        args=ast.arguments(
            posonlyargs=[], args=[], vararg=None, kwonlyargs=[],
            kw_defaults=[], kwarg=None, defaults=[],
        ),
        body=tree.body or [ast.Pass()],
        decorator_list=[],
        returns=None,
        type_params=[],
    )
    module = ast.Module(body=[wrapper], type_ignores=[])
    ast.fix_missing_locations(module)
    return module


async def __avanza_input__(prompt=""):
    value = await __avanza_request_input__(str(prompt))
    return "" if value is None else value


# Block dangerous imports for the user's code only. The driver above keeps
# using the real builtins, so Pyodide's own setup is unaffected.
__avanza_blocked_imports__ = frozenset({"js", "pyodide_js", "micropip"})
__avanza_real_import__ = __avanza_builtins__.__import__


def __avanza_guarded_import__(name, globals=None, locals=None, fromlist=(), level=0):
    root = name.split(".")[0]
    if root in __avanza_blocked_imports__:
        raise ImportError("Importing '%s' is not allowed in this sandbox." % root)
    return __avanza_real_import__(name, globals, locals, fromlist, level)


__avanza_safe_builtins__ = dict(vars(__avanza_builtins__))
__avanza_safe_builtins__["__import__"] = __avanza_guarded_import__

__avanza_module__ = __avanza_prepare(__avanza_source__)
__avanza_scope__ = {
    "__name__": "__main__",
    "input": __avanza_input__,
    "__builtins__": __avanza_safe_builtins__,
}
exec(compile(__avanza_module__, "<exec>", "exec"), __avanza_scope__)
await __avanza_scope__["__avanza_main__"]()
`

let pendingInputResolve: ((value: string) => void) | null = null

function requestInputFromMain(prompt: string): Promise<string> {
  return new Promise<string>((resolve) => {
    pendingInputResolve = resolve
    postMessage({ type: "input_request", prompt } satisfies WorkerResponse)
  })
}

function errorMessageFrom(err: unknown): string {
  return err && typeof err === "object" && "message" in err
    ? String((err as { message?: unknown }).message)
    : String(err)
}

async function runCode(code: string) {
  let pyodide: PyodideAPI
  try {
    pyodide = await loadPyodideInWorker()
  } catch (err) {
    postMessage({ type: "load_error", message: errorMessageFrom(err) } satisfies WorkerResponse)
    return
  }

  postMessage({ type: "pyodide_ready" } satisfies WorkerResponse)

  pyodide.setStdout({
    batched: (s: string) => postMessage({ type: "stdout", text: s } satisfies WorkerResponse),
  })
  pyodide.setStderr({
    batched: (s: string) => postMessage({ type: "stderr", text: s } satisfies WorkerResponse),
  })

  pyodide.globals.set("__avanza_source__", code)
  pyodide.globals.set("__avanza_request_input__", requestInputFromMain)

  try {
    await pyodide.runPythonAsync(DRIVER_SOURCE)
    postMessage({ type: "done" } satisfies WorkerResponse)
  } catch (err) {
    postMessage({ type: "error", message: errorMessageFrom(err) } satisfies WorkerResponse)
  }
}

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const msg = e.data
  if (msg.type === "input") {
    const resolve = pendingInputResolve
    pendingInputResolve = null
    resolve?.(msg.value)
    return
  }
  if (msg.type === "run") {
    pendingInputResolve = null
    void runCode(msg.code)
  }
}
