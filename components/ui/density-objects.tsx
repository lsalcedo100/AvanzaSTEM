import type { SVGProps } from "react"
import { type Loc, floatsInWater } from "@/components/ui/density-model"

// ---------------------------------------------------------------------------
// Data model
// ---------------------------------------------------------------------------

export type ObjectKey =
  | "cork"
  | "ice"
  | "penny"
  | "grape"
  | "tomato"
  | "wood"
  | "plastic"
  | "rock"
  | "aluminum"
  | "steel"
  | "ring"
  | "mysteryA"
  | "mysteryB"

// Categories are structured so new groups can be added by dropping in more
// entries below — nothing else needs to change.
export type ObjectCategory = "everyday" | "nature" | "engineering" | "mystery"

export interface DensityObject {
  id: ObjectKey
  /** Localized display name. */
  nameLoc: Loc
  /** Localized material. */
  materialLoc: Loc
  /** Localized kid-friendly one-liner about how it behaves. */
  blurbLoc: Loc
  /** Localized real-world note shown in the collection. */
  noteLoc: Loc
  category: ObjectCategory
  /** grams — simplified for kids; kept so mass ≈ density × volume. */
  mass: number
  /** cm³ — simplified for kids. */
  volume: number
  /** g/cm³ */
  density: number
  /** Which illustrated vector to render (see ObjectArt). */
  svgType: ObjectKey
  /** 0 = unlocked from the start; otherwise the level whose completion unlocks it. */
  unlockLevel: number
}

// NOTE: densities are rounded/simplified for a kids' science demo. `mass` is
// chosen so that mass ≈ density × volume stays internally consistent, letting
// the game explain density = mass / volume without lying about the numbers.
export const DENSITY_OBJECTS: DensityObject[] = [
  {
    id: "cork",
    nameLoc: { en: "Cork", es: "Corcho", zh: "软木塞" },
    materialLoc: { en: "Tree bark", es: "Corteza de árbol", zh: "树皮" },
    blurbLoc: {
      en: "Super light — it always floats to the top.",
      es: "Súper ligero: siempre flota hasta arriba.",
      zh: "非常轻——总是浮到最上面。",
    },
    noteLoc: {
      en: "Cork comes from the spongy bark of the cork oak tree.",
      es: "El corcho viene de la corteza esponjosa del alcornoque.",
      zh: "软木来自栓皮栎那层松软的树皮。",
    },
    category: "everyday",
    density: 0.24,
    volume: 5,
    mass: 1.2,
    svgType: "cork",
    unlockLevel: 0,
  },
  {
    id: "ice",
    nameLoc: { en: "Ice cube", es: "Cubo de hielo", zh: "冰块" },
    materialLoc: { en: "Frozen water", es: "Agua congelada", zh: "冻结的水" },
    blurbLoc: {
      en: "Frozen water floats — that's why icebergs don't sink.",
      es: "El agua congelada flota: por eso los icebergs no se hunden.",
      zh: "冻结的水会浮——所以冰山不会沉下去。",
    },
    noteLoc: {
      en: "Water is one of the rare things that gets lighter when it freezes.",
      es: "El agua es una de las pocas cosas que se vuelve más ligera al congelarse.",
      zh: "水是少数几种结冰后反而变轻的物质之一。",
    },
    category: "nature",
    density: 0.92,
    volume: 10,
    mass: 9.2,
    svgType: "ice",
    unlockLevel: 0,
  },
  {
    id: "penny",
    nameLoc: { en: "Penny", es: "Moneda", zh: "硬币" },
    materialLoc: { en: "Copper", es: "Cobre", zh: "铜" },
    blurbLoc: {
      en: "Metal is heavy for its size, so it drops fast.",
      es: "El metal pesa mucho para su tamaño, así que cae rápido.",
      zh: "金属体积小却很重，所以会快速下沉。",
    },
    noteLoc: {
      en: "Old pennies were mostly copper — about 9× denser than water.",
      es: "Las monedas antiguas eran casi todo cobre: unas 9 veces más densas que el agua.",
      zh: "旧硬币几乎都是铜——密度约为水的 9 倍。",
    },
    category: "everyday",
    density: 8.96,
    volume: 0.35,
    mass: 3.14,
    svgType: "penny",
    unlockLevel: 0,
  },
  {
    id: "grape",
    nameLoc: { en: "Grape", es: "Uva", zh: "葡萄" },
    materialLoc: { en: "Fruit", es: "Fruta", zh: "水果" },
    blurbLoc: {
      en: "Just a little heavier than water, so it sinks slowly.",
      es: "Apenas un poco más pesada que el agua, así que se hunde despacio.",
      zh: "只比水稍重一点，所以会慢慢下沉。",
    },
    noteLoc: {
      en: "A grape sinks in water but floats in honey or corn syrup.",
      es: "Una uva se hunde en agua pero flota en miel o jarabe de maíz.",
      zh: "葡萄在水里会沉，但在蜂蜜或玉米糖浆里会浮。",
    },
    category: "nature",
    density: 1.05,
    volume: 4,
    mass: 4.2,
    svgType: "grape",
    unlockLevel: 1,
  },
  {
    id: "tomato",
    nameLoc: { en: "Tomato", es: "Tomate", zh: "番茄" },
    materialLoc: { en: "Fruit", es: "Fruta", zh: "水果" },
    blurbLoc: {
      en: "Almost exactly as heavy as water for its size.",
      es: "Casi igual de pesado que el agua para su tamaño.",
      zh: "同样大小下几乎和水一样重。",
    },
    noteLoc: {
      en: "Ripe tomatoes sit very close to water, hovering near the surface.",
      es: "Los tomates maduros están muy cerca del agua y flotan junto a la superficie.",
      zh: "熟番茄的密度非常接近水，会停在水面附近。",
    },
    category: "nature",
    density: 1.02,
    volume: 100,
    mass: 102,
    svgType: "tomato",
    unlockLevel: 1,
  },
  {
    id: "wood",
    nameLoc: { en: "Wood block", es: "Bloque de madera", zh: "木块" },
    materialLoc: { en: "Pine wood", es: "Madera de pino", zh: "松木" },
    blurbLoc: {
      en: "Lighter than water, so it bobs on top.",
      es: "Más ligera que el agua, así que flota arriba.",
      zh: "比水轻，所以会浮在上面。",
    },
    noteLoc: {
      en: "Most wood floats because it's full of tiny air pockets.",
      es: "La mayoría de la madera flota porque está llena de diminutas bolsas de aire.",
      zh: "大多数木头会浮，因为里面充满了小气孔。",
    },
    category: "nature",
    density: 0.65,
    volume: 20,
    mass: 13,
    svgType: "wood",
    unlockLevel: 2,
  },
  {
    id: "plastic",
    nameLoc: { en: "Plastic cap", es: "Tapa de plástico", zh: "塑料瓶盖" },
    materialLoc: { en: "Polypropylene", es: "Polipropileno", zh: "聚丙烯" },
    blurbLoc: {
      en: "This kind of plastic is just light enough to float.",
      es: "Este tipo de plástico es lo bastante ligero para flotar.",
      zh: "这种塑料刚好轻到能浮起来。",
    },
    noteLoc: {
      en: "Some plastics float and some sink — it depends on the type.",
      es: "Algunos plásticos flotan y otros se hunden: depende del tipo.",
      zh: "有些塑料会浮、有些会沉——取决于种类。",
    },
    category: "everyday",
    density: 0.9,
    volume: 2,
    mass: 1.8,
    svgType: "plastic",
    unlockLevel: 2,
  },
  {
    id: "rock",
    nameLoc: { en: "Rock", es: "Roca", zh: "石头" },
    materialLoc: { en: "Granite", es: "Granito", zh: "花岗岩" },
    blurbLoc: {
      en: "Much denser than water — it drops straight to the bottom.",
      es: "Mucho más densa que el agua: se va derecho al fondo.",
      zh: "密度比水大得多——会直接沉到底。",
    },
    noteLoc: {
      en: "Rocks are packed tight with minerals, so they sink in water.",
      es: "Las rocas están repletas de minerales, por eso se hunden en el agua.",
      zh: "石头里紧密地塞满了矿物，所以在水里会沉。",
    },
    category: "nature",
    density: 2.65,
    volume: 8,
    mass: 21.2,
    svgType: "rock",
    unlockLevel: 3,
  },
  {
    id: "aluminum",
    nameLoc: { en: "Aluminum cube", es: "Cubo de aluminio", zh: "铝块" },
    materialLoc: { en: "Aluminum", es: "Aluminio", zh: "铝" },
    blurbLoc: {
      en: "A light metal, but still much denser than water.",
      es: "Un metal ligero, pero aún mucho más denso que el agua.",
      zh: "一种轻金属，但密度仍远大于水。",
    },
    noteLoc: {
      en: "Aluminum is light for a metal, which is why airplanes use it.",
      es: "El aluminio es ligero para ser un metal, por eso lo usan los aviones.",
      zh: "铝在金属里算轻的，所以飞机会用它。",
    },
    category: "engineering",
    density: 2.7,
    volume: 8,
    mass: 21.6,
    svgType: "aluminum",
    unlockLevel: 4,
  },
  {
    id: "steel",
    nameLoc: { en: "Steel bolt", es: "Perno de acero", zh: "钢螺栓" },
    materialLoc: { en: "Steel", es: "Acero", zh: "钢" },
    blurbLoc: {
      en: "Heavy metal — it sinks in water, but floats on mercury!",
      es: "Metal pesado: se hunde en agua, ¡pero flota en mercurio!",
      zh: "重金属——在水里会沉，但能浮在水银上！",
    },
    noteLoc: {
      en: "Steel sinks in water yet floats on mercury, which is far denser.",
      es: "El acero se hunde en agua pero flota en mercurio, que es mucho más denso.",
      zh: "钢在水里会沉，却能浮在密度大得多的水银上。",
    },
    category: "engineering",
    density: 7.85,
    volume: 4,
    mass: 31.4,
    svgType: "steel",
    unlockLevel: 5,
  },
  {
    id: "ring",
    nameLoc: { en: "Gold ring", es: "Anillo de oro", zh: "金戒指" },
    materialLoc: { en: "Gold", es: "Oro", zh: "黄金" },
    blurbLoc: {
      en: "One of the heaviest things here — it sinks instantly.",
      es: "Una de las cosas más pesadas aquí: se hunde al instante.",
      zh: "这里最重的东西之一——瞬间下沉。",
    },
    noteLoc: {
      en: "Pure gold is 19.3 g/cm³. Jewelry gold is mixed with other metals, so it's a bit lighter.",
      es: "El oro puro tiene 19.3 g/cm³. El oro de joyería se mezcla con otros metales, así que pesa un poco menos.",
      zh: "纯金为 19.3 g/cm³。首饰用金掺了其他金属，所以会轻一些。",
    },
    category: "engineering",
    density: 19.3,
    volume: 0.5,
    mass: 9.65,
    svgType: "ring",
    unlockLevel: 6,
  },
  {
    id: "mysteryA",
    nameLoc: { en: "Candle wax", es: "Cera de vela", zh: "蜡烛蜡" },
    materialLoc: { en: "Paraffin wax", es: "Cera de parafina", zh: "石蜡" },
    blurbLoc: {
      en: "Surprise! This solid is lighter than water, so it floats.",
      es: "¡Sorpresa! Este sólido es más ligero que el agua, así que flota.",
      zh: "惊喜！这种固体比水轻，所以会浮。",
    },
    noteLoc: {
      en: "Candle wax is a solid that still floats — density beats being solid.",
      es: "La cera de vela es un sólido que aún flota: la densidad importa más que ser sólido.",
      zh: "蜡烛蜡是固体却依然会浮——决定沉浮的是密度而非软硬。",
    },
    category: "mystery",
    density: 0.9,
    volume: 10,
    mass: 9,
    svgType: "mysteryA",
    unlockLevel: 7,
  },
  {
    id: "mysteryB",
    nameLoc: { en: "Lead sinker", es: "Plomada", zh: "铅坠" },
    materialLoc: { en: "Lead", es: "Plomo", zh: "铅" },
    blurbLoc: {
      en: "Surprise! Tiny but incredibly heavy — it plummets.",
      es: "¡Sorpresa! Pequeño pero increíblemente pesado: se desploma.",
      zh: "惊喜！体积虽小却重得惊人——直接坠底。",
    },
    noteLoc: {
      en: "Lead is so dense that a small piece feels shockingly heavy.",
      es: "El plomo es tan denso que un trozo pequeño se siente sorprendentemente pesado.",
      zh: "铅的密度极大，一小块也重得吓人。",
    },
    category: "mystery",
    density: 11.34,
    volume: 2,
    mass: 22.68,
    svgType: "mysteryB",
    unlockLevel: 8,
  },
]

export const OBJECT_BY_ID: Record<ObjectKey, DensityObject> =
  DENSITY_OBJECTS.reduce(
    (acc, o) => {
      acc[o.id] = o
      return acc
    },
    {} as Record<ObjectKey, DensityObject>,
  )

// Order in which categories are shown.
export const OBJECT_CATEGORIES: ObjectCategory[] = [
  "everyday",
  "nature",
  "engineering",
  "mystery",
]

/** Object ids that are available before completing any level. */
export const STARTER_OBJECT_IDS: ObjectKey[] = DENSITY_OBJECTS.filter(
  (o) => o.unlockLevel === 0,
).map((o) => o.id)

/** Objects unlocked by completing a given level (empty for levels that unlock none). */
export function objectsUnlockedByLevel(levelId: number): ObjectKey[] {
  return DENSITY_OBJECTS.filter((o) => o.unlockLevel === levelId).map((o) => o.id)
}

/** Convenience: does this object float in plain water? */
export function objectFloatsInWater(o: DensityObject): boolean {
  return floatsInWater(o.density)
}

// ---------------------------------------------------------------------------
// Illustrated vector art — one consistent flat "lab-game" style:
//   • single dark outline weight (STROKE_W) with rounded joins
//   • flat fills + soft white highlight overlays (no gradients → no id clashes)
//   • a faint contact shadow so objects feel grounded, not pasted on
// ---------------------------------------------------------------------------

const STROKE = "#1f2937"
const STROKE_W = 2.5

type ArtProps = { type: ObjectKey } & SVGProps<SVGSVGElement>

export function ObjectArt({ type, ...props }: ArtProps) {
  switch (type) {
    case "cork":
      return <CorkArt {...props} />
    case "ice":
      return <IceArt {...props} />
    case "grape":
      return <GrapeArt {...props} />
    case "tomato":
      return <TomatoArt {...props} />
    case "penny":
      return <PennyArt {...props} />
    case "ring":
      return <RingArt {...props} />
    case "wood":
      return <WoodArt {...props} />
    case "plastic":
      return <PlasticArt {...props} />
    case "rock":
      return <RockArt {...props} />
    case "aluminum":
      return <AluminumArt {...props} />
    case "steel":
      return <SteelArt {...props} />
    case "mysteryA":
      return <MysteryArt tint="#8b5cf6" {...props} />
    case "mysteryB":
      return <MysteryArt tint="#f97316" {...props} />
  }
}

function Svg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      strokeLinejoin="round"
      strokeLinecap="round"
      {...props}
    />
  )
}

function Shadow({ ry = 3, rx = 15 }: { ry?: number; rx?: number }) {
  return <ellipse cx="32" cy="57" rx={rx} ry={ry} fill="#000" opacity="0.08" />
}

function CorkArt(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <Shadow />
      <rect
        x="20"
        y="16"
        width="24"
        height="38"
        rx="6"
        fill="#d9a066"
        stroke={STROKE}
        strokeWidth={STROKE_W}
      />
      <ellipse
        cx="32"
        cy="17"
        rx="12"
        ry="4.5"
        fill="#e8b984"
        stroke={STROKE}
        strokeWidth={STROKE_W}
      />
      <line x1="22" y1="30" x2="42" y2="30" stroke="#b07d43" strokeWidth="2" opacity="0.6" />
      <line x1="22" y1="40" x2="42" y2="40" stroke="#b07d43" strokeWidth="2" opacity="0.6" />
      <rect x="23" y="22" width="4" height="27" rx="2" fill="#fff" opacity="0.25" />
    </Svg>
  )
}

function IceArt(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <Shadow rx={16} />
      <polygon points="32,12 50,21 32,30 14,21" fill="#e0f2fe" stroke={STROKE} strokeWidth={STROKE_W} />
      <polygon points="14,21 32,30 32,52 14,43" fill="#7dd3fc" stroke={STROKE} strokeWidth={STROKE_W} />
      <polygon points="50,21 32,30 32,52 50,43" fill="#bae6fd" stroke={STROKE} strokeWidth={STROKE_W} />
      <polygon points="32,12 40,16 32,20 24,16" fill="#fff" opacity="0.5" />
      <line x1="20" y1="31" x2="20" y2="40" stroke="#fff" strokeWidth="2" opacity="0.45" />
    </Svg>
  )
}

function GrapeArt(props: SVGProps<SVGSVGElement>) {
  // Drawn back-to-front so the lower berries overlap the upper ones cleanly.
  const berries: Array<[number, number]> = [
    [32, 24],
    [24, 31],
    [40, 31],
    [20, 40],
    [32, 40],
    [44, 40],
    [26, 49],
    [38, 49],
  ]
  return (
    <Svg {...props}>
      <ellipse cx="32" cy="58" rx="13" ry="2.5" fill="#000" opacity="0.08" />
      <path d="M32 16 L32 23" stroke="#6b4423" strokeWidth="3" />
      <path
        d="M33 15 q8 -6 11 0 q-6 5 -11 0 z"
        fill="#4ade80"
        stroke={STROKE}
        strokeWidth="1.6"
      />
      {berries.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="7" fill="#7c3aed" stroke={STROKE} strokeWidth="2" />
          <circle cx={cx - 2.3} cy={cy - 2.3} r="1.8" fill="#fff" opacity="0.5" />
        </g>
      ))}
    </Svg>
  )
}

function TomatoArt(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <Shadow rx={16} />
      <ellipse cx="32" cy="37" rx="19" ry="17" fill="#ef4444" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="25" cy="30" rx="6" ry="4" fill="#fff" opacity="0.3" transform="rotate(-30 25 30)" />
      {/* leafy calyx */}
      <g fill="#22c55e" stroke={STROKE} strokeWidth="1.6">
        <path d="M32 22 C 26 14, 20 15, 22 21 C 26 23, 30 23, 32 22 Z" />
        <path d="M32 22 C 38 14, 44 15, 42 21 C 38 23, 34 23, 32 22 Z" />
        <path d="M32 22 C 30 13, 34 13, 32 22 Z" />
      </g>
      <path d="M32 12 L32 20" stroke="#15803d" strokeWidth="2.5" />
    </Svg>
  )
}

function PennyArt(props: SVGProps<SVGSVGElement>) {
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15)
  const star = Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? 8 : 3.4
    const ang = (Math.PI / 180) * (i * 36 - 90)
    return `${(32 + Math.cos(ang) * r).toFixed(1)},${(32 + Math.sin(ang) * r).toFixed(1)}`
  }).join(" ")
  return (
    <Svg {...props}>
      <Shadow rx={16} />
      <circle cx="32" cy="32" r="20" fill="#c8823c" stroke={STROKE} strokeWidth={STROKE_W} />
      <g stroke="#9c5f28" strokeWidth="1.5" opacity="0.7">
        {ticks.map((a) => {
          const rad = (a * Math.PI) / 180
          return (
            <line
              key={a}
              x1={(32 + Math.cos(rad) * 18).toFixed(1)}
              y1={(32 + Math.sin(rad) * 18).toFixed(1)}
              x2={(32 + Math.cos(rad) * 20).toFixed(1)}
              y2={(32 + Math.sin(rad) * 20).toFixed(1)}
            />
          )
        })}
      </g>
      <circle cx="32" cy="32" r="15" fill="none" stroke="#9c5f28" strokeWidth="1.5" opacity="0.6" />
      <polygon points={star} fill="#e0a35e" stroke="#9c5f28" strokeWidth="1" />
      <path d="M23 26 a13 13 0 0 1 8 -5" fill="none" stroke="#fff" strokeWidth="2.5" opacity="0.3" />
    </Svg>
  )
}

function RingArt(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <ellipse cx="32" cy="58" rx="13" ry="2.5" fill="#000" opacity="0.08" />
      {/* band: gold stroke with dark inner/outer outlines */}
      <circle cx="32" cy="42" r="14" fill="none" stroke="#f59e0b" strokeWidth="7" />
      <circle cx="32" cy="42" r="17.5" fill="none" stroke={STROKE} strokeWidth="2" />
      <circle cx="32" cy="42" r="10.5" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M22 34 a14 14 0 0 1 8 -6" fill="none" stroke="#fde68a" strokeWidth="2.5" opacity="0.8" />
      {/* gem */}
      <polygon points="32,8 40,17 32,24 24,17" fill="#a5f3fc" stroke={STROKE} strokeWidth="2" />
      <polyline points="24,17 32,17 40,17" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <polyline points="32,17 32,24" fill="none" stroke={STROKE} strokeWidth="1.2" opacity="0.6" />
      <polygon points="32,8 36,13 32,17 28,13" fill="#e0fbff" opacity="0.7" />
    </Svg>
  )
}

function WoodArt(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <Shadow rx={17} />
      {/* a chunky plank drawn in slight 3-D */}
      <polygon points="14,26 44,20 50,28 20,34" fill="#d8a763" stroke={STROKE} strokeWidth={STROKE_W} />
      <polygon points="20,34 50,28 50,44 20,50" fill="#b9843f" stroke={STROKE} strokeWidth={STROKE_W} />
      <polygon points="14,26 20,34 20,50 14,42" fill="#a06e33" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* wood grain */}
      <path d="M24 39 q9 -2 22 -4" fill="none" stroke="#8a5f28" strokeWidth="1.4" opacity="0.7" />
      <path d="M24 44 q9 -2 22 -4" fill="none" stroke="#8a5f28" strokeWidth="1.4" opacity="0.5" />
      <polygon points="14,26 44,20 46,22 16,28" fill="#fff" opacity="0.2" />
    </Svg>
  )
}

function PlasticArt(props: SVGProps<SVGSVGElement>) {
  const ridges = Array.from({ length: 18 }, (_, i) => (i * 20 * Math.PI) / 180)
  return (
    <Svg {...props}>
      <Shadow rx={15} />
      <circle cx="32" cy="34" r="18" fill="#38bdf8" stroke={STROKE} strokeWidth={STROKE_W} />
      {/* ribbed edge of a bottle cap */}
      <g stroke="#0284c7" strokeWidth="1.6" opacity="0.75">
        {ridges.map((rad, i) => (
          <line
            key={i}
            x1={(32 + Math.cos(rad) * 15).toFixed(1)}
            y1={(34 + Math.sin(rad) * 15).toFixed(1)}
            x2={(32 + Math.cos(rad) * 18).toFixed(1)}
            y2={(34 + Math.sin(rad) * 18).toFixed(1)}
          />
        ))}
      </g>
      <circle cx="32" cy="34" r="11" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.4" />
      <path d="M25 28 a10 10 0 0 1 7 -4" fill="none" stroke="#fff" strokeWidth="2.4" opacity="0.5" />
    </Svg>
  )
}

function RockArt(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <Shadow rx={17} />
      <polygon
        points="16,40 22,24 38,20 50,32 46,48 26,50"
        fill="#94a3b8"
        stroke={STROKE}
        strokeWidth={STROKE_W}
      />
      {/* facets */}
      <polygon points="22,24 38,20 34,34 24,36" fill="#cbd5e1" opacity="0.7" />
      <polygon points="38,20 50,32 46,48 34,34" fill="#64748b" opacity="0.5" />
      <circle cx="30" cy="42" r="1.6" fill="#475569" />
      <circle cx="40" cy="38" r="1.3" fill="#475569" />
    </Svg>
  )
}

function AluminumArt(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <Shadow rx={16} />
      {/* isometric cube */}
      <polygon points="32,14 48,22 32,30 16,22" fill="#e2e8f0" stroke={STROKE} strokeWidth={STROKE_W} />
      <polygon points="16,22 32,30 32,50 16,42" fill="#94a3b8" stroke={STROKE} strokeWidth={STROKE_W} />
      <polygon points="48,22 32,30 32,50 48,42" fill="#cbd5e1" stroke={STROKE} strokeWidth={STROKE_W} />
      <polygon points="20,23 32,29 32,32 20,26" fill="#fff" opacity="0.4" />
    </Svg>
  )
}

function SteelArt(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <Shadow rx={13} />
      {/* hex bolt head */}
      <polygon points="24,12 40,12 47,22 40,32 24,32 17,22" fill="#cbd5e1" stroke={STROKE} strokeWidth={STROKE_W} />
      <polygon points="27,17 37,17 41,22 37,27 27,27 23,22" fill="none" stroke="#64748b" strokeWidth="1.6" />
      {/* shaft with threads */}
      <rect x="26" y="32" width="12" height="20" fill="#94a3b8" stroke={STROKE} strokeWidth={STROKE_W} />
      <g stroke="#475569" strokeWidth="1.3" opacity="0.7">
        <line x1="26" y1="37" x2="38" y2="39" />
        <line x1="26" y1="42" x2="38" y2="44" />
        <line x1="26" y1="47" x2="38" y2="49" />
      </g>
      <rect x="27" y="14" width="3" height="16" fill="#fff" opacity="0.35" />
    </Svg>
  )
}

function MysteryArt({ tint, ...props }: { tint: string } & SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <Shadow rx={16} />
      <rect x="16" y="18" width="32" height="32" rx="6" fill={tint} stroke={STROKE} strokeWidth={STROKE_W} />
      <rect x="20" y="22" width="8" height="8" rx="2" fill="#fff" opacity="0.25" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="26"
        fontWeight="800"
        fill="#fff"
      >
        ?
      </text>
    </Svg>
  )
}
