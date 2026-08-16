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

// Pyodide's runtime (the loader script, the WASM binary and the stdlib
// archive) is ~10 MB. It is immutable for a pinned version, so it is stored in
// the Cache Storage API under a version-stamped name: every later worker -
// after a Stop, after a timeout, after a page navigation, on a later visit -
// reads it back from disk instead of downloading it again. That is what makes
// "downloads once" in the UI actually true.
const ASSET_CACHE_NAME = `avanza-pyodide-v${PYODIDE_VERSION}`

let assetCachePromise: Promise<Cache | null> | null = null

/**
 * Open (once) the version-stamped asset cache, dropping caches left behind by
 * an earlier pinned version. Resolves to `null` where Cache Storage isn't
 * available (non-secure contexts), in which case every fetch just goes to the
 * network as before.
 */
function openAssetCache(): Promise<Cache | null> {
  if (!assetCachePromise) {
    assetCachePromise =
      typeof caches === "undefined"
        ? Promise.resolve(null)
        : (async () => {
            const keys = await caches.keys()
            await Promise.all(
              keys
                .filter((key) => key.startsWith("avanza-pyodide-v") && key !== ASSET_CACHE_NAME)
                .map((key) => caches.delete(key)),
            )
            return caches.open(ASSET_CACHE_NAME)
          })().catch(() => null)
  }
  return assetCachePromise
}

let cachingFetchInstalled = false

/**
 * Route Pyodide's own asset requests (WASM, stdlib zip, lockfile) through the
 * asset cache. Pyodide fetches these itself with no hook to pass a cache into,
 * so the worker's `fetch` is wrapped instead. Only same-version Pyodide CDN
 * GETs are touched; everything else falls through untouched.
 */
function installCachingFetch() {
  if (cachingFetchInstalled) return
  cachingFetchInstalled = true

  const scope = self as unknown as { fetch: typeof fetch }
  const realFetch = scope.fetch.bind(self)

  scope.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = input instanceof Request ? input : null
    const url = request ? request.url : String(input)
    const method = init?.method ?? request?.method ?? "GET"

    // The loader script is verified against its pinned hash separately, so it
    // must not be served from here unchecked.
    const cacheable =
      method === "GET" && url.startsWith(PYODIDE_INDEX_URL) && url !== PYODIDE_SCRIPT_URL
    if (!cacheable) return realFetch(input, init)

    const cache = await openAssetCache()
    if (!cache) return realFetch(input, init)

    const hit = await cache.match(url)
    if (hit) return hit

    const response = await realFetch(input, init)
    // A cross-origin response is only replayable if it isn't opaque; an opaque
    // body would break WebAssembly.instantiateStreaming on the next read.
    if (response.ok && response.type !== "opaque") {
      try {
        await cache.put(url, response.clone())
      } catch {
        // A full or disabled storage bucket just means no caching this time.
      }
    }
    return response
  }
}

/** Base64 SHA-384 of `text`, in the same encoding SRI's `sha384-` prefix uses. */
async function sha384Base64(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-384", new TextEncoder().encode(text))
  const bytes = new Uint8Array(digest)
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

/**
 * Return the pinned Pyodide loader script, preferring the cached copy. A cached
 * copy is re-verified against {@link PYODIDE_SCRIPT_INTEGRITY} before use, so
 * reading from disk keeps exactly the guarantee the SRI download gives.
 */
async function fetchPyodideScript(): Promise<string> {
  const canVerify = typeof crypto !== "undefined" && !!crypto.subtle
  const cache = canVerify ? await openAssetCache() : null
  const expected = PYODIDE_SCRIPT_INTEGRITY.replace("sha384-", "")

  if (cache) {
    const hit = await cache.match(PYODIDE_SCRIPT_URL)
    if (hit) {
      const cachedText = await hit.text()
      if ((await sha384Base64(cachedText)) === expected) return cachedText
      await cache.delete(PYODIDE_SCRIPT_URL)
    }
  }

  const response = await fetch(PYODIDE_SCRIPT_URL, {
    integrity: PYODIDE_SCRIPT_INTEGRITY,
    mode: "cors",
    credentials: "omit",
    referrerPolicy: "no-referrer",
  })
  if (!response.ok) {
    throw new Error("Failed to load Pyodide script")
  }
  if (cache) {
    try {
      await cache.put(PYODIDE_SCRIPT_URL, response.clone())
    } catch {
      // Caching is best-effort; the script is already in hand either way.
    }
  }
  return response.text()
}

/**
 * Fetch the pinned Pyodide script with SRI verification and execute it in
 * the worker's global scope (the same effect as `importScripts`, but with
 * integrity checking, no credentials, and no referrer leakage).
 */
function loadPyodideInWorker(): Promise<PyodideAPI> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      installCachingFetch()
      const scriptText = await fetchPyodideScript()
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
  if (msg.type === "preload") {
    // Warm up in the background. A failure here is deliberately silent: the
    // next real run calls the same (retried) loader and reports the error then.
    void loadPyodideInWorker().then(
      () => postMessage({ type: "preloaded" } satisfies WorkerResponse),
      () => {},
    )
    return
  }
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
