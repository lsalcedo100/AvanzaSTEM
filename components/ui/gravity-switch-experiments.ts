/**
 * Gravity Switch: Zero-G Lab — guided sandbox experiments.
 *
 * Each one is predict → do one thing → read what happened. They run in the
 * Zero-G Room on the same tracker the missions use; the prediction is
 * optional and the room keeps running afterwards. Add an experiment by adding
 * an entry here.
 */

import { ROOM_HEIGHT, ROOM_WIDTH } from "./gravity-switch-config.ts"
import type { ExperimentDefinition, ExperimentId, WorldConfig } from "./gravity-switch-types.ts"

function room(partial: Partial<WorldConfig>): WorldConfig {
  return {
    width: ROOM_WIDTH,
    height: ROOM_HEIGHT,
    walls: { floor: true, ceiling: true, left: true, right: true },
    air: "vacuum",
    obstacles: [],
    zones: [],
    objects: [],
    ...partial,
  }
}

export const EXPERIMENTS: ExperimentDefinition[] = [
  {
    id: "falling-ball-off",
    text: {
      name: { en: "Falling ball, gravity off", es: "Pelota cayendo, gravedad apagada", zh: "下落的球，关掉引力", pt: "Bola caindo, gravidade desligada" },
      instruction: {
        en: "Press Go, then flip gravity off while the ball is falling.",
        es: "Pulsa Ir y apaga la gravedad mientras la pelota cae.",
        zh: "按“开始”，然后趁球下落时关掉引力。",
        pt: "Aperte Ir e desligue a gravidade enquanto a bola cai.",
      },
      result: {
        en: "It kept moving downward at the speed it already had. Turning gravity off stops the speeding-up, not the moving: nothing pushed the ball back up or held it still.",
        es: "Siguió bajando a la velocidad que ya tenía. Apagar la gravedad detiene la aceleración, no el movimiento: nada empujó la pelota hacia arriba ni la dejó quieta.",
        zh: "它以原来的速度继续往下运动。关掉引力停下的是“越来越快”，不是运动本身：没有东西把球往上推，也没有东西让它停住。",
        pt: "Ela continuou descendo na velocidade que já tinha. Desligar a gravidade para a aceleração, não o movimento: nada empurrou a bola para cima nem a segurou parada.",
      },
    },
    world: room({ objects: [{ id: "ball", kind: "ball", x: 480, y: 80 }] }),
    gravity: { preset: "earth", switchOn: true },
    prediction: {
      prompt: {
        en: "A ball is already falling. What happens when gravity turns OFF?",
        es: "Una pelota ya está cayendo. ¿Qué pasa cuando la gravedad se APAGA?",
        zh: "球已经在下落。关掉引力会发生什么？",
        pt: "Uma bola já está caindo. O que acontece quando a gravidade é DESLIGADA?",
      },
      choices: [
        { id: "stops", label: { en: "It stops right there", es: "Se para ahí mismo", zh: "它立刻停住", pt: "Ela para ali mesmo" } },
        { id: "up", label: { en: "It starts moving upward", es: "Empieza a subir", zh: "它开始往上飘", pt: "Ela começa a subir" } },
        { id: "down", label: { en: "It keeps moving downward", es: "Sigue bajando", zh: "它继续往下运动", pt: "Ela continua descendo" } },
      ],
      correctId: "down",
    },
    objectives: [{ kind: "gravity-flip", switchOn: false, objectId: "ball", minSpeed: 1.5 }],
    ordered: true,
    failConditions: [],
  },
  {
    id: "heavy-light",
    text: {
      name: { en: "Heavy and light", es: "Pesado y ligero", zh: "重的和轻的", pt: "Pesado e leve" },
      instruction: {
        en: "Press Go, then flip gravity on and watch them drop.",
        es: "Pulsa Ir, enciende la gravedad y mira cómo caen.",
        zh: "按“开始”，然后打开引力，看它们落下。",
        pt: "Aperte Ir, ligue a gravidade e veja os dois caírem.",
      },
      result: {
        en: "They landed together. The bowling ball weighs three hundred times more, but gravity speeds every object up at the same rate. There is no air in here to hold the feather back.",
        es: "Aterrizaron a la vez. La bola de boliche pesa trescientas veces más, pero la gravedad acelera todos los objetos al mismo ritmo. Aquí no hay aire que frene la pluma.",
        zh: "它们同时落地。保龄球重三百倍，但引力让所有物体以同样的速率加速。这里没有空气来拖住羽毛。",
        pt: "Pousaram juntos. A bola de boliche pesa trezentas vezes mais, mas a gravidade acelera todos os objetos no mesmo ritmo. Aqui não há ar para segurar a pena.",
      },
    },
    world: room({
      objects: [
        { id: "bowling", kind: "bowling", x: 380, y: 100 },
        { id: "feather", kind: "feather", x: 580, y: 116 },
      ],
    }),
    gravity: { preset: "earth", switchOn: false },
    prediction: {
      prompt: {
        en: "A bowling ball and a feather, same height, no air. Which lands first?",
        es: "Una bola de boliche y una pluma, a la misma altura, sin aire. ¿Cuál cae primero?",
        zh: "一个保龄球和一根羽毛，同样高度，没有空气。哪个先落地？",
        pt: "Uma bola de boliche e uma pena, na mesma altura, sem ar. Qual chega primeiro?",
      },
      choices: [
        { id: "bowling", label: { en: "The bowling ball", es: "La bola de boliche", zh: "保龄球", pt: "A bola de boliche" } },
        { id: "feather", label: { en: "The feather", es: "La pluma", zh: "羽毛", pt: "A pena" } },
        { id: "same", label: { en: "Both at the same time", es: "Las dos a la vez", zh: "同时落地", pt: "Os dois ao mesmo tempo" } },
      ],
      correctId: "same",
    },
    objectives: [{ kind: "land-together", objectIds: ["bowling", "feather"], toleranceMs: 150 }],
    ordered: true,
    failConditions: [],
  },
  {
    id: "zero-g-push",
    text: {
      name: { en: "A push in zero-g", es: "Un empujón sin gravedad", zh: "零重力下推一把", pt: "Um empurrão sem gravidade" },
      instruction: {
        en: "Press Go, then drag the ball and let go to throw it.",
        es: "Pulsa Ir, arrastra la pelota y suéltala para lanzarla.",
        zh: "按“开始”，然后拖动球并松手，把它扔出去。",
        pt: "Aperte Ir, arraste a bola e solte para arremessá-la.",
      },
      result: {
        en: "It kept exactly the speed you gave it, in a straight line, until it hit a wall. With no gravity and no air, nothing slows a moving object down.",
        es: "Conservó exactamente la velocidad que le diste, en línea recta, hasta chocar con una pared. Sin gravedad y sin aire, nada frena un objeto en movimiento.",
        zh: "它保持着你给它的速度，沿直线一直飞，直到撞上墙。没有引力也没有空气，没有任何东西会让运动的物体慢下来。",
        pt: "Ela manteve exatamente a velocidade que você deu, em linha reta, até bater numa parede. Sem gravidade e sem ar, nada freia um objeto em movimento.",
      },
    },
    world: room({ objects: [{ id: "ball", kind: "ball", x: 300, y: 270 }] }),
    gravity: { preset: "earth", switchOn: false },
    prediction: {
      prompt: {
        en: "You throw the ball. After it leaves your hand, it…",
        es: "Lanzas la pelota. Después de soltarla, la pelota…",
        zh: "你把球扔出去。离手之后，它会……",
        pt: "Você arremessa a bola. Depois que ela sai da sua mão, ela…",
      },
      choices: [
        { id: "slows", label: { en: "Slows down and stops", es: "Frena y se detiene", zh: "慢下来然后停住", pt: "Desacelera e para" } },
        { id: "same", label: { en: "Keeps the same speed", es: "Mantiene la misma velocidad", zh: "保持同样的速度", pt: "Mantém a mesma velocidade" } },
        { id: "faster", label: { en: "Speeds up", es: "Va cada vez más rápido", zh: "越来越快", pt: "Acelera" } },
      ],
      correctId: "same",
    },
    objectives: [{ kind: "moving", objectId: "ball", minSpeed: 1, gravity: { switchOn: false } }],
    ordered: true,
    failConditions: [],
  },
]

export const EXPERIMENT_IDS: ExperimentId[] = EXPERIMENTS.map((experiment) => experiment.id)

const EXPERIMENT_BY_ID = new Map<ExperimentId, ExperimentDefinition>(EXPERIMENTS.map((experiment) => [experiment.id, experiment]))

export function getExperiment(id: ExperimentId): ExperimentDefinition {
  const experiment = EXPERIMENT_BY_ID.get(id)
  if (!experiment) throw new Error(`Unknown Gravity Switch experiment: ${id}`)
  return experiment
}

export function isExperimentId(value: unknown): value is ExperimentId {
  return typeof value === "string" && EXPERIMENT_BY_ID.has(value as ExperimentId)
}
