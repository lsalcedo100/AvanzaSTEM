"use client"

import "leaflet/dist/leaflet.css"
import { useEffect, useMemo, useRef, useState } from "react"
import { Globe, Maximize2 } from "lucide-react"

import {
  MAP_REGIONS,
  REACH,
  type LatLngBounds,
  type MapRegion,
  type MapRegionId,
  type MapView,
} from "@/features/workshops/regions"
import type {
  InternationalPartner,
  Library,
  PartnerCountry,
} from "@/features/workshops/locations"
import {
  formatSessionDate,
  nextSession,
  partnerPrimaryName,
  partnerSecondLine,
} from "@/features/workshops/format"

/**
 * Google Maps needs a billing-enabled browser key. When one is not configured
 * (local checkouts, previews, or a key that fails auth at runtime) the map
 * falls back to Leaflet on Esri National Geographic tiles, which need no key. Both
 * engines draw the same HTML pins through the same adapter, so the page looks
 * and behaves the same either way.
 */
const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
/**
 * Advanced markers (the HTML pins) require a map ID. Set a styled one in the
 * Google Cloud console to brand the basemap; the documented demo ID keeps the
 * pins working with default styling until then.
 */
const GOOGLE_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID"

/**
 * Esri's National Geographic basemap rather than standard OpenStreetMap tiles.
 * At the continental zoom the Latin America panel sits at (Panama to southern
 * Chile), OSM draws little more than flat beige land, while this one keeps
 * coloured relief, ocean depth, borders and major cities. Its tiles stop at
 * zoom 16, so the map is capped there too rather than zooming into blank tiles.
 */
const BASEMAP_TILES =
  "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
const BASEMAP_MAX_ZOOM = 16
/** Kept to one line: the worldwide view repeats it under three narrow panels. */
const BASEMAP_ATTRIBUTION =
  'Tiles &copy; <a href="https://www.esri.com">Esri</a> &amp; National Geographic'

const TONE = {
  upcoming: "#8b5cf6",
  active: "#f97316",
  placeholder: "#1a1a2e",
  hosted: "#f97316",
  scheduled: "#1abc9c",
} as const

/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------------------------------------------------------------------------
// Engine loading
// ---------------------------------------------------------------------------

let googleScript: Promise<any> | null = null
let googleAuthFailed = false
const authFailureListeners = new Set<() => void>()

/**
 * Injects the Google Maps script once per page load. Google reports an invalid
 * key or disabled billing through the global `gm_authFailure` hook rather than
 * a rejected promise, so that is wired to the listener set the engine hook
 * watches: a bad key drops to Leaflet instead of leaving a dead grey map.
 */
function loadGoogleMaps(): Promise<any> {
  if (googleScript) return googleScript
  googleScript = new Promise((resolve, reject) => {
    const w = window as any
    w.gm_authFailure = () => {
      googleAuthFailed = true
      authFailureListeners.forEach((fn) => fn())
    }
    if (w.google?.maps?.marker) {
      resolve(w.google)
      return
    }
    const callback = "__afzGoogleMapsReady"
    w[callback] = () => resolve(w.google)
    const script = document.createElement("script")
    script.src =
      "https://maps.googleapis.com/maps/api/js" +
      `?key=${encodeURIComponent(GOOGLE_KEY as string)}` +
      `&v=weekly&libraries=marker&loading=async&callback=${callback}`
    script.async = true
    script.onerror = () => reject(new Error("Google Maps failed to load"))
    document.head.appendChild(script)
  })
  return googleScript
}

type Engine = { kind: "google"; api: any } | { kind: "leaflet"; api: any }

function useMapEngine() {
  const [engine, setEngine] = useState<Engine | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    let cancelled = false

    const fallBackToLeaflet = () =>
      import("leaflet")
        .then((mod) => {
          if (cancelled) return
          setEngine({ kind: "leaflet", api: mod })
          setStatus("ready")
        })
        .catch(() => {
          if (!cancelled) setStatus("error")
        })

    if (!GOOGLE_KEY || googleAuthFailed) {
      fallBackToLeaflet()
      return () => {
        cancelled = true
      }
    }

    // A key that fails auth mid-flight swaps the whole map over to Leaflet.
    const onAuthFailure = () => {
      if (!cancelled) fallBackToLeaflet()
    }
    authFailureListeners.add(onAuthFailure)

    loadGoogleMaps()
      .then((api) => {
        if (cancelled) return
        if (googleAuthFailed) {
          fallBackToLeaflet()
          return
        }
        setEngine({ kind: "google", api })
        setStatus("ready")
      })
      .catch(fallBackToLeaflet)

    return () => {
      cancelled = true
      authFailureListeners.delete(onAuthFailure)
    }
  }, [])

  return { engine, status }
}

// ---------------------------------------------------------------------------
// Pins
// ---------------------------------------------------------------------------

type PinSpec = {
  id: string
  lat: number
  lng: number
  tone: string
  title: string
  popupHtml: string | null
  active: boolean
  selectable: boolean
  variant: "pin" | "user"
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;",
  )
}

/**
 * The pin markup nests two elements on purpose. The wrapper stays on the venue's
 * true coordinates and carries the anchor dot; only the inner pin is translated
 * by the de-overlap pass and scaled with the zoom. So a pin can slide clear of
 * its neighbours without the map lying about where the venue is.
 */
function pinMarkup(spec: PinSpec, forGoogle: boolean) {
  if (spec.variant === "user") {
    return `<div class="afz-pinwrap afz-pinwrap--user${forGoogle ? " afz-pinwrap--gm-user" : ""}"><div class="afz-userpin"><span></span></div></div>`
  }
  return `<div class="afz-pinwrap${forGoogle ? " afz-pinwrap--gm" : ""}" style="--pin-tone:${spec.tone}"><i class="afz-pin__anchor" aria-hidden="true"></i><div class="afz-pin${spec.active ? " afz-pin--active" : ""}"><div class="afz-pin__shadow"></div><div class="afz-pin__head"><span></span></div></div></div>`
}

function elementFor(spec: PinSpec, forGoogle: boolean) {
  const host = document.createElement("div")
  host.innerHTML = pinMarkup(spec, forGoogle)
  return host.firstElementChild as HTMLElement
}

// ---------------------------------------------------------------------------
// Map adapters: one thin interface over Google Maps and Leaflet
// ---------------------------------------------------------------------------

type FitOptions = { padding: number; maxZoom: number; animate: boolean }

type AdapterOptions = {
  interactive: boolean
  onSelect: (id: string) => void
}

type MapAdapter = {
  /** Removes markers and the map itself; the panel owns the container node. */
  teardown(): void
  fit(bounds: LatLngBounds, opts: FitOptions): void
  render(pins: PinSpec[]): void
  openPopup(id: string): void
  /** Pixel coordinates at the current zoom, or null before the map settles. */
  project(lat: number, lng: number): { x: number; y: number } | null
  zoom(): number
  /** The `.afz-pinwrap` element per pin id, for the de-overlap pass. */
  elements(): Map<string, HTMLElement>
  /** Re-measure after the container changes size, then restore the framing. */
  resize(): void
  onIdle(cb: () => void): () => void
}

function createGoogleAdapter(
  g: any,
  container: HTMLElement,
  { interactive, onSelect }: AdapterOptions,
): MapAdapter {
  const map = new g.maps.Map(container, {
    mapId: GOOGLE_MAP_ID,
    center: { lat: 20, lng: 0 },
    zoom: 2,
    disableDefaultUI: true,
    zoomControl: interactive,
    clickableIcons: false,
    keyboardShortcuts: interactive,
    gestureHandling: interactive ? "cooperative" : "none",
    isFractionalZoomEnabled: true,
  })

  const info = new g.maps.InfoWindow({
    disableAutoPan: !interactive,
    headerDisabled: true,
  })

  let markers: any[] = []
  const els = new Map<string, HTMLElement>()
  const anchors = new Map<string, { marker: any; popupHtml: string | null }>()
  let lastFit: { bounds: LatLngBounds; opts: FitOptions } | null = null

  const clear = () => {
    info.close()
    markers.forEach((m) => {
      m.map = null
    })
    markers = []
    els.clear()
    anchors.clear()
  }

  const showPopup = (id: string) => {
    const entry = anchors.get(id)
    if (!entry?.popupHtml) return
    info.setContent(entry.popupHtml)
    info.open({ map, anchor: entry.marker })
  }

  const fit = (bounds: LatLngBounds, opts: FitOptions) => {
    lastFit = { bounds, opts }
    map.fitBounds(
      new g.maps.LatLngBounds(
        { lat: bounds.south, lng: bounds.west },
        { lat: bounds.north, lng: bounds.east },
      ),
      opts.padding,
    )
    // fitBounds has no maxZoom of its own; clamp once the fit has applied.
    g.maps.event.addListenerOnce(map, "idle", () => {
      const z = map.getZoom()
      if (typeof z === "number" && z > opts.maxZoom) map.setZoom(opts.maxZoom)
    })
  }

  return {
    teardown() {
      clear()
      g.maps.event.clearInstanceListeners(map)
    },
    fit,
    render(pins) {
      clear()
      pins.forEach((spec) => {
        const el = elementFor(spec, true)
        const marker = new g.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: spec.lat, lng: spec.lng },
          content: el,
          title: spec.title,
          gmpClickable: Boolean(spec.popupHtml || spec.selectable),
          // Southern pins sit in front, matching how the eye reads a map.
          zIndex: spec.active ? 10_000 : Math.round(1000 - spec.lat * 10),
        })
        if (spec.popupHtml || spec.selectable) {
          marker.addListener("gmp-click", () => {
            if (spec.selectable) onSelect(spec.id)
            showPopup(spec.id)
          })
        }
        markers.push(marker)
        anchors.set(spec.id, { marker, popupHtml: spec.popupHtml })
        els.set(spec.id, el)
      })
    },
    openPopup: showPopup,
    project(lat, lng) {
      const proj = map.getProjection?.()
      const z = map.getZoom()
      if (!proj || typeof z !== "number") return null
      const point = proj.fromLatLngToPoint(new g.maps.LatLng(lat, lng))
      if (!point) return null
      const scale = 2 ** z
      return { x: point.x * scale, y: point.y * scale }
    },
    zoom() {
      return map.getZoom() ?? 2
    },
    elements() {
      return els
    },
    resize() {
      // Google re-measures on its own; re-applying the fit keeps the framing.
      if (lastFit) fit(lastFit.bounds, lastFit.opts)
    },
    onIdle(cb) {
      const listener = map.addListener("idle", cb)
      return () => listener.remove()
    },
  }
}

function createLeafletAdapter(
  L: any,
  container: HTMLElement,
  { interactive, onSelect }: AdapterOptions,
): MapAdapter {
  const map = L.map(container, {
    center: [20, 0],
    zoom: 2,
    maxZoom: BASEMAP_MAX_ZOOM,
    zoomSnap: 0.25,
    worldCopyJump: false,
    scrollWheelZoom: false,
    zoomControl: interactive,
    dragging: interactive,
    touchZoom: interactive,
    doubleClickZoom: interactive,
    boxZoom: interactive,
    keyboard: interactive,
    attributionControl: true,
  })

  L.tileLayer(BASEMAP_TILES, {
    attribution: BASEMAP_ATTRIBUTION,
    maxZoom: BASEMAP_MAX_ZOOM,
  }).addTo(map)
  // The inset panels are too narrow for the "Leaflet" prefix as well as the
  // tile credit; the full map keeps it.
  if (!interactive) map.attributionControl.setPrefix(false)

  let markers: any[] = []
  const els = new Map<string, HTMLElement>()
  const byId = new Map<string, any>()
  let lastFit: { bounds: LatLngBounds; opts: FitOptions } | null = null

  const clear = () => {
    markers.forEach((m) => m.remove())
    markers = []
    els.clear()
    byId.clear()
  }

  const fit = (bounds: LatLngBounds, opts: FitOptions) => {
    lastFit = { bounds, opts }
    map.fitBounds(
      [
        [bounds.south, bounds.west],
        [bounds.north, bounds.east],
      ],
      {
        padding: [opts.padding, opts.padding],
        maxZoom: opts.maxZoom,
        animate: opts.animate,
        duration: 0.8,
      },
    )
  }

  return {
    teardown() {
      clear()
      map.remove()
    },
    fit,
    render(pins) {
      clear()
      pins.forEach((spec) => {
        const isUser = spec.variant === "user"
        const marker = L.marker([spec.lat, spec.lng], {
          icon: L.divIcon({
            className: "",
            html: pinMarkup(spec, false),
            iconSize: isUser ? [22, 22] : [32, 42],
            iconAnchor: isUser ? [11, 11] : [16, 38],
            popupAnchor: [0, -32],
          }),
          title: spec.title,
          interactive: !isUser,
          keyboard: spec.selectable,
          riseOnHover: true,
          // Southern pins sit in front, matching how the eye reads a map.
          zIndexOffset: spec.active ? 10_000 : 0,
        }).addTo(map)

        if (spec.popupHtml) {
          marker.bindPopup(spec.popupHtml, { closeButton: false, offset: [0, -4] })
        }
        if (spec.selectable) {
          marker.on("click", () => onSelect(spec.id))
          marker.on("keypress", (e: { originalEvent: KeyboardEvent }) => {
            if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
              onSelect(spec.id)
            }
          })
        }

        markers.push(marker)
        byId.set(spec.id, marker)
        // Leaflet positions its own icon node, so the nudge goes on the wrapper
        // inside it rather than on the node Leaflet writes transforms to.
        const wrap = marker.getElement()?.querySelector(".afz-pinwrap")
        if (wrap) els.set(spec.id, wrap as HTMLElement)
      })
    },
    openPopup(id) {
      byId.get(id)?.openPopup?.()
    },
    project(lat, lng) {
      const point = map.project([lat, lng], map.getZoom())
      return { x: point.x, y: point.y }
    },
    zoom() {
      return map.getZoom()
    },
    elements() {
      return els
    },
    resize() {
      map.invalidateSize({ animate: false })
      if (lastFit) fit(lastFit.bounds, { ...lastFit.opts, animate: false })
    },
    onIdle(cb) {
      map.on("moveend zoomend", cb)
      return () => map.off("moveend zoomend", cb)
    },
  }
}

// ---------------------------------------------------------------------------
// De-overlap
// ---------------------------------------------------------------------------

const GOLDEN_ANGLE = 2.399963229728653

/**
 * Finds a spot at least `minDist` pixels clear of everything already placed,
 * walking outward along a golden-angle spiral so displaced pins fan out evenly
 * instead of drifting the same way. Gives up after ten rings rather than
 * flinging a pin far from its venue.
 */
function freeSpot(
  point: { x: number; y: number },
  placed: { x: number; y: number }[],
  minDist: number,
) {
  const collides = (c: { x: number; y: number }) =>
    placed.some((q) => Math.hypot(q.x - c.x, q.y - c.y) < minDist)
  if (!collides(point)) return point
  for (let i = 1; i <= 10; i += 1) {
    const angle = i * GOLDEN_ANGLE
    const radius = minDist * 0.55 * Math.sqrt(i)
    const candidate = {
      x: point.x + Math.cos(angle) * radius,
      y: point.y + Math.sin(angle) * radius,
    }
    if (!collides(candidate)) return candidate
  }
  return point
}

/**
 * Nudges colliding pins apart in screen space. Runs on every settle, because how
 * much two venues overlap depends entirely on the current zoom: the Clifton and
 * Verona pins sit on top of each other at a statewide fit and nowhere near each
 * other three zoom levels in.
 */
function separatePins(adapter: MapAdapter, pins: PinSpec[], pinScale: number) {
  const els = adapter.elements()
  const minDist = Math.max(14, 26 * pinScale)
  const placed: { x: number; y: number }[] = []

  // North first: the pin that moves is the northern one, and it drifts up into
  // open sky rather than down across its neighbour.
  ;[...pins]
    .sort((a, b) => b.lat - a.lat)
    .forEach((spec) => {
      const el = els.get(spec.id)
      const point = adapter.project(spec.lat, spec.lng)
      if (!el || !point) return
      const target =
        spec.variant === "user" ? point : freeSpot(point, placed, minDist)
      placed.push(target)
      const dx = target.x - point.x
      const dy = target.y - point.y
      el.style.setProperty("--afz-nx", `${dx}px`)
      el.style.setProperty("--afz-ny", `${dy}px`)
      el.classList.toggle("afz-pinwrap--nudged", Math.hypot(dx, dy) > 6)
    })
}

/** Pins shrink as the view widens, so a dense cluster reads as dense, not messy. */
function pinScaleFor(zoom: number, base: number) {
  return Math.min(1, Math.max(0.6, 0.6 + (zoom - 5) * 0.08)) * base
}

// ---------------------------------------------------------------------------
// A single map panel
// ---------------------------------------------------------------------------

function MapPanel({
  engine,
  region,
  pins,
  activeId,
  onSelect,
  interactive,
  ariaLabel,
  basePinScale,
}: {
  engine: Engine
  region: MapRegion
  pins: PinSpec[]
  activeId: string | null
  onSelect: (id: string) => void
  interactive: boolean
  ariaLabel: string
  basePinScale: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const adapterRef = useRef<MapAdapter | null>(null)
  const [ready, setReady] = useState(false)

  const onSelectRef = useRef(onSelect)
  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  // Build the map once per engine. Re-running would tear down the user's view.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const adapter = (
      engine.kind === "google" ? createGoogleAdapter : createLeafletAdapter
    )(engine.api, container, {
      interactive,
      onSelect: (id) => onSelectRef.current(id),
    })
    adapterRef.current = adapter
    setReady(true)

    // The panel is a flex/grid child, so its box can settle after the map is
    // built, and it resizes again when the browser window does.
    const observer = new ResizeObserver(() => adapter.resize())
    observer.observe(container)

    return () => {
      observer.disconnect()
      adapter.teardown()
      adapterRef.current = null
      setReady(false)
      container.innerHTML = ""
    }
  }, [engine, interactive])

  // Frame the region. Separate from marker rendering so selecting a pin never
  // yanks the view back to the region's default framing.
  useEffect(() => {
    if (!ready) return
    adapterRef.current?.fit(region.bounds, {
      padding: interactive ? 48 : 22,
      maxZoom: region.maxZoom,
      animate: true,
    })
  }, [ready, region, interactive])

  // Markers, plus the collision pass that keeps them from piling up.
  useEffect(() => {
    const adapter = adapterRef.current
    const container = containerRef.current
    if (!ready || !adapter) return
    adapter.render(pins)

    const settle = () => {
      const scale = pinScaleFor(adapter.zoom(), basePinScale)
      container?.style.setProperty("--afz-pin-scale", scale.toFixed(3))
      separatePins(adapter, pins, scale)
    }
    settle()
    const off = adapter.onIdle(settle)
    // Google's projection is not available synchronously after the first render.
    const retry = window.setTimeout(settle, 300)
    return () => {
      off()
      window.clearTimeout(retry)
    }
  }, [ready, pins, basePinScale])

  useEffect(() => {
    if (!ready || !activeId) return
    adapterRef.current?.openPopup(activeId)
  }, [ready, activeId])

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label={ariaLabel}
      className="afz-map absolute inset-0 h-full w-full bg-[#e9eef2]"
    />
  )
}

// ---------------------------------------------------------------------------
// The finder map
// ---------------------------------------------------------------------------

export type MapLabels = {
  noUpcomingDate: string
  planningArea: string
  notScheduled: string
  nextSession: string
  tentative: string
  scheduled: string
  hosted: string
  minhang: string
}

export type RegionLabels = Record<MapRegionId | "world", string> & {
  tablistAria: string
  sites: string
  expand: string
}

export type ReachLabels = {
  countries: string
  continents: string
  venues: string
  planned: string
}

export function WorkshopFinderMap({
  libraries,
  internationalPartners,
  userLatLng,
  activeId,
  onSelect,
  view,
  onViewChange,
  language,
  ariaLabel,
  loadingLabel,
  errorLabel,
  legend,
  labels,
  countryNames,
  regionLabels,
  reachLabels,
}: {
  libraries: (Library & { miles?: number })[]
  internationalPartners: InternationalPartner[]
  userLatLng: { lat: number; lng: number } | null
  activeId: string | null
  onSelect: (id: string) => void
  view: MapView
  onViewChange: (view: MapView) => void
  language: string
  ariaLabel: string
  loadingLabel: string
  errorLabel: string
  legend: {
    upcoming: string
    active: string
    coming: string
    scheduled: string
    you: string
  }
  labels: MapLabels
  countryNames: Record<PartnerCountry, string>
  regionLabels: RegionLabels
  reachLabels: ReachLabels
}) {
  const { engine, status } = useMapEngine()

  const pinsByRegion = useMemo(() => {
    const njPins: PinSpec[] = libraries.map((lib) => {
      const upcomingNext =
        lib.status === "upcoming" ? nextSession(lib.sessions) : null
      const statusLine =
        lib.status === "upcoming"
          ? {
              color: "#6d28d9",
              text: upcomingNext
                ? `${labels.nextSession}: ${formatSessionDate(upcomingNext, language)}${lib.tentative ? ` (${labels.tentative})` : ""}`
                : labels.tentative,
            }
          : lib.status === "active"
            ? { color: "#2ecc71", text: labels.noUpcomingDate }
            : { color: "#1a1a2e", text: labels.planningArea }
      return {
        id: lib.id,
        lat: lib.lat,
        lng: lib.lng,
        tone: TONE[lib.status],
        title: lib.name,
        active: lib.id === activeId,
        selectable: true,
        variant: "pin" as const,
        popupHtml:
          `<div style="min-width:180px;font-family:inherit">` +
          `<p style="margin:0;font-weight:800;font-size:13px;color:#1a1a2e">${escapeHtml(lib.name)}</p>` +
          `<p style="margin:2px 0 0;font-size:11px;color:#6b7280">${escapeHtml(lib.city)}, NJ &middot; ZIP ${escapeHtml(lib.zip)}</p>` +
          `<p style="margin:6px 0 0;font-size:11px;font-weight:700;color:${statusLine.color}">${escapeHtml(statusLine.text)}</p>` +
          (lib.status === "placeholder"
            ? `<p style="margin:2px 0 0;font-size:11px;color:#6b7280">${escapeHtml(labels.notScheduled)}</p>`
            : "") +
          `</div>`,
      }
    })

    if (userLatLng) {
      njPins.push({
        id: "__you",
        lat: userLatLng.lat,
        lng: userLatLng.lng,
        tone: "#2ecc71",
        title: legend.you,
        active: false,
        selectable: false,
        variant: "user",
        popupHtml: null,
      })
    }

    const partnerPin = (partner: InternationalPartner): PinSpec => {
      const hosted = partner.status === "hosted"
      const headline = partnerPrimaryName(partner, language)
      const place = [
        partnerSecondLine(partner, language, { minhang: labels.minhang }),
        countryNames[partner.country],
      ]
        .filter(Boolean)
        .join(" · ")
      return {
        id: partner.id,
        lat: partner.lat,
        lng: partner.lng,
        tone: hosted ? TONE.hosted : TONE.scheduled,
        title: headline,
        active: partner.id === activeId,
        selectable: true,
        variant: "pin",
        popupHtml:
          `<div style="min-width:180px;font-family:inherit">` +
          `<p style="margin:0;font-weight:800;font-size:13px;color:#1a1a2e">${escapeHtml(headline)}</p>` +
          `<p style="margin:2px 0 0;font-size:11px;color:#6b7280">${escapeHtml(place)}</p>` +
          `<p style="margin:6px 0 0;font-size:11px;font-weight:700;color:${hosted ? "#c2410c" : "#0f766e"}">${escapeHtml(hosted ? labels.hosted : labels.scheduled)}</p>` +
          `</div>`,
      }
    }

    return {
      nj: njPins,
      latam: internationalPartners.filter((p) => p.country !== "CN").map(partnerPin),
      china: internationalPartners.filter((p) => p.country === "CN").map(partnerPin),
    } satisfies Record<MapRegionId, PinSpec[]>
  }, [
    libraries,
    internationalPartners,
    userLatLng,
    activeId,
    language,
    labels,
    legend.you,
    countryNames,
  ])

  const regionById = useMemo(
    () =>
      Object.fromEntries(MAP_REGIONS.map((r) => [r.id, r])) as Record<
        MapRegionId,
        MapRegion
      >,
    [],
  )

  const tabs: { id: MapView; label: string; count: number }[] = [
    {
      id: "world",
      label: regionLabels.world,
      count: MAP_REGIONS.reduce((n, r) => n + r.siteCount, 0),
    },
    ...MAP_REGIONS.map((r) => ({
      id: r.id as MapView,
      label: regionLabels[r.id],
      count: r.siteCount,
    })),
  ]

  return (
    <div
      /*
       * The map runs full-bleed under the floating navbar, so the bar would sit
       * on top of the tabs and the pins. This tells the navbar to fade out for
       * as long as the map is passing behind it; see components/layout/navbar.tsx.
       */
      data-navbar-yield
      className="flex flex-col bg-[#fcfaf3] lg:min-h-[calc(100vh-80px)]"
    >
      {/* Region tabs: the point of the whole layout is that reaching Shanghai
          is one click, not a long zoom out across the Pacific. */}
      <div
        role="tablist"
        aria-label={regionLabels.tablistAria}
        className="flex shrink-0 gap-1 overflow-x-auto border-b border-avanza-dark/10 px-3 py-2"
      >
        {tabs.map((tab) => {
          const selected = view === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onViewChange(tab.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-colors ${
                selected
                  ? "bg-avanza-dark text-primary-foreground"
                  : "text-avanza-dark/60 hover:bg-avanza-dark/5 hover:text-avanza-dark"
              }`}
            >
              {tab.id === "world" && <Globe aria-hidden="true" className="h-3.5 w-3.5" />}
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                  selected ? "bg-white/15" : "bg-avanza-dark/8"
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Map body. Worldwide lays the three clusters out as inset panels, the
          device a US map uses for Alaska and Hawaii: no ocean, every panel
          framed tight on its own pins. */}
      <div
        className={`relative flex-1 ${
          view === "world"
            ? "min-h-[560px] lg:min-h-[320px]"
            : "min-h-[420px] lg:min-h-[280px]"
        }`}
      >
        {status === "ready" && engine
          ? view === "world"
            ? (
                /* Three tall columns rather than a wide stack: northern New
                   Jersey and the Latin American venues are both tall, narrow
                   footprints, so a portrait panel fills with pins where a
                   landscape one fills with ocean. */
                <div className="absolute inset-0 grid grid-rows-3 gap-px bg-avanza-dark/12 lg:grid-cols-3 lg:grid-rows-1">
                  {MAP_REGIONS.map((region) => (
                    <div
                      key={region.id}
                      className="relative overflow-hidden bg-[#e9eef2]"
                    >
                      <MapPanel
                        engine={engine}
                        region={region}
                        pins={pinsByRegion[region.id]}
                        activeId={activeId}
                        onSelect={onSelect}
                        interactive={false}
                        ariaLabel={`${ariaLabel}: ${regionLabels[region.id]}`}
                        basePinScale={0.78}
                      />
                      <button
                        type="button"
                        onClick={() => onViewChange(region.id)}
                        className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-extrabold text-avanza-dark shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                      >
                        {regionLabels[region.id]}
                        <span className="font-bold tabular-nums text-avanza-dark/45">
                          {region.siteCount} {regionLabels.sites}
                        </span>
                        <Maximize2 aria-hidden="true" className="h-3 w-3 text-avanza-teal" />
                        <span className="sr-only">{regionLabels.expand}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )
            : (
                <MapPanel
                  key="focus"
                  engine={engine}
                  region={regionById[view]}
                  pins={pinsByRegion[view]}
                  activeId={activeId}
                  onSelect={onSelect}
                  interactive
                  ariaLabel={`${ariaLabel}: ${regionLabels[view]}`}
                  basePinScale={1}
                />
              )
          : null}

        {status === "loading" && <MapOverlay label={loadingLabel} />}
        {status === "error" && <MapOverlay label={errorLabel} tone="error" />}
      </div>

      {/* Reach strip: the numbers a tightly framed map cannot state on its own. */}
      <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3 border-t border-avanza-dark/10 bg-[#fcfaf3] px-4 py-3">
        <Stat value={REACH.countries} label={reachLabels.countries} />
        <Stat value={REACH.continents} label={reachLabels.continents} />
        <Stat value={REACH.venues} label={reachLabels.venues} />
        <Stat value={REACH.planned} label={reachLabels.planned} muted />

        <div className="flex w-full flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[10px] font-bold uppercase tracking-wider text-avanza-dark/50 xl:ml-auto xl:w-auto">
          <LegendDot className="bg-avanza-purple" label={legend.upcoming} />
          <LegendDot className="bg-avanza-orange" label={legend.active} />
          <LegendDot className="bg-avanza-dark" label={legend.coming} />
          <LegendDot className="bg-avanza-teal" label={legend.scheduled} />
          {userLatLng && <LegendDot className="bg-avanza-green" label={legend.you} />}
        </div>
      </div>

      <PinStyles />
    </div>
  )
}

function Stat({
  value,
  label,
  muted = false,
}: {
  value: number
  label: string
  muted?: boolean
}) {
  return (
    <p className="flex items-baseline gap-1.5">
      <span
        className={`text-lg font-extrabold leading-none tabular-nums ${
          muted ? "text-avanza-dark/45" : "text-avanza-dark"
        }`}
      >
        {value}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-avanza-dark/50">
        {label}
      </span>
    </p>
  )
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${className}`} />
      {label}
    </span>
  )
}

function MapOverlay({
  label,
  tone = "neutral",
}: {
  label: string
  tone?: "neutral" | "error"
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center ${
        tone === "error" ? "bg-white/95" : "bg-white/85"
      } backdrop-blur-sm`}
    >
      <div className="flex flex-col items-center gap-3 text-sm font-bold text-avanza-dark">
        {tone === "neutral" && (
          <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-avanza-green" />
        )}
        {label}
      </div>
    </div>
  )
}

/** Inline style block: keeps the pin DOM markup self-contained. */
function PinStyles() {
  return (
    <style>{`
      /* The wrapper stays on the venue's real coordinates; the pin inside it is
         what the de-overlap pass moves and what the zoom scales. */
      .afz-pinwrap {
        position: relative;
        width: 32px;
        height: 42px;
        --afz-nx: 0px;
        --afz-ny: 0px;
      }
      .afz-pinwrap--gm { transform: translateY(4px); }
      .afz-pinwrap--user { width: 22px; height: 22px; }
      .afz-pinwrap--gm-user { transform: translateY(11px); }
      .afz-pin__anchor {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--pin-tone, #f97316);
        border: 1.5px solid #fff;
        box-shadow: 0 1px 3px rgba(26,26,46,0.35);
        transform: translate(-50%, 50%);
        opacity: 0;
        transition: opacity 160ms ease;
      }
      /* Only shown once a pin has actually been moved, so it reads as "the venue
         is here, the pin stepped aside". */
      .afz-pinwrap--nudged .afz-pin__anchor { opacity: 0.9; }
      .afz-pin {
        position: absolute;
        inset: 0;
        cursor: pointer;
        transform-origin: 50% 100%;
        transform: translate(var(--afz-nx), var(--afz-ny)) scale(var(--afz-pin-scale, 1));
        transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .afz-pin:hover {
        transform: translate(var(--afz-nx), calc(var(--afz-ny) - 2px))
          scale(calc(var(--afz-pin-scale, 1) * 1.08));
      }
      .afz-pin__head {
        position: absolute;
        inset: 0 0 6px 0;
        background: var(--pin-tone, #f97316);
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 10px -3px rgba(26,26,46,0.5);
        border: 2.5px solid white;
      }
      .afz-pin__head span {
        position: absolute;
        top: 50%; left: 50%;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: white;
        transform: translate(-50%, -50%);
      }
      .afz-pin__shadow {
        position: absolute;
        bottom: 0; left: 50%;
        width: 12px; height: 4px;
        background: rgba(26,26,46,0.25);
        border-radius: 50%;
        filter: blur(1px);
        transform: translateX(-50%);
      }
      .afz-pin--active .afz-pin__head {
        animation: afz-pulse 1.4s ease-in-out infinite;
      }
      .afz-pin--active::after {
        content: '';
        position: absolute;
        bottom: 0; left: 50%;
        width: 38px; height: 38px;
        border-radius: 50%;
        border: 2px solid var(--pin-tone, #f97316);
        opacity: 0.6;
        transform: translate(-50%, 25%);
        animation: afz-ring 1.4s ease-out infinite;
      }
      @keyframes afz-pulse {
        0%, 100% { transform: rotate(-45deg) scale(1); }
        50% { transform: rotate(-45deg) scale(1.1); }
      }
      @keyframes afz-ring {
        0% { opacity: 0.6; transform: translate(-50%, 25%) scale(0.6); }
        100% { opacity: 0; transform: translate(-50%, 25%) scale(1.4); }
      }
      .afz-userpin { position: relative; width: 22px; height: 22px; }
      .afz-userpin span {
        position: absolute;
        inset: 0;
        background: #2ecc71;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 0 rgba(46,204,113,0.5);
        animation: afz-user 1.6s ease-out infinite;
      }
      @keyframes afz-user {
        0% { box-shadow: 0 0 0 0 rgba(46,204,113,0.5); }
        70% { box-shadow: 0 0 0 14px rgba(46,204,113,0); }
        100% { box-shadow: 0 0 0 0 rgba(46,204,113,0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .afz-pin,
        .afz-pin--active .afz-pin__head,
        .afz-pin--active::after,
        .afz-userpin span { animation: none !important; transition: none !important; }
      }
      /* Brand the popups of both engines. */
      .afz-map .leaflet-popup-content-wrapper {
        border-radius: 12px !important;
        box-shadow: 0 18px 40px -18px rgba(26,26,46,0.4) !important;
      }
      .afz-map .leaflet-popup-tip { box-shadow: none !important; }
      /* Leaflet 1.9 blends tiles with plus-lighter to hide seams, but at the
         fractional zooms these panels fit to, the anti-aliased tile edges add
         up to bright white grid lines across the basemap. Plain compositing
         leaves no visible seam. */
      .afz-map .leaflet-tile-container img.leaflet-tile {
        mix-blend-mode: normal;
      }
      .afz-map .leaflet-control-attribution {
        font-size: 10px;
        line-height: 1.4;
      }
      .afz-map .gm-style-iw { border-radius: 12px !important; }
      /* Clamp both engines' stacking inside the map so panes, controls and
         popups can never escape and overlap the navbar (z-50) or page text. */
      .afz-map .leaflet-pane,
      .afz-map .leaflet-tile,
      .afz-map .leaflet-marker-icon,
      .afz-map .leaflet-marker-shadow,
      .afz-map .leaflet-tile-container,
      .afz-map .leaflet-pane > svg,
      .afz-map .leaflet-pane > canvas,
      .afz-map .leaflet-zoom-box,
      .afz-map .leaflet-image-layer,
      .afz-map .leaflet-layer { z-index: 1; }
      .afz-map .leaflet-overlay-pane,
      .afz-map .leaflet-shadow-pane { z-index: 2; }
      .afz-map .leaflet-marker-pane { z-index: 3; }
      .afz-map .leaflet-tooltip-pane { z-index: 4; }
      .afz-map .leaflet-popup-pane { z-index: 5; }
      .afz-map .leaflet-top,
      .afz-map .leaflet-bottom { z-index: 6; }
    `}</style>
  )
}
