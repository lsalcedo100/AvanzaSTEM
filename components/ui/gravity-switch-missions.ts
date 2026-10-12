/**
 * Gravity Switch: Zero-G Lab — the six missions, as data.
 *
 * A mission is a room (`world`), a starting gravity setting, what the player is
 * allowed to touch, and the objectives and fail conditions the game watches
 * for. Nothing here knows how to simulate or draw anything; the physics
 * manager builds a world from `world`, and a later evaluator reads
 * `objectives` and `failConditions` against the live objects.
 *
 * Mission copy lives beside the mission (as the Density and Circuit labs do)
 * so each mission is one self-contained block to edit, and `validateMissions`
 * is what the tests run so a typo in an id fails fast instead of at play time.
 *
 * Coordinates: px in a 960 × 540 room, origin top-left, y down. Obstacles and
 * zones are given by their top-left corner; objects by their centre.
 */

import { GRAVITY_PRESETS, OBJECT_SPECS, ROOM_HEIGHT, ROOM_WIDTH } from "./gravity-switch-config.ts"
import type {
  GravityPresetId,
  MissionDefinition,
  MissionId,
  Obstacle,
  Rect,
  RoomWalls,
  WorldConfig,
  Zone,
} from "./gravity-switch-types.ts"

const CLOSED: RoomWalls = { floor: true, ceiling: true, left: true, right: true }

function room(partial: Partial<WorldConfig>): WorldConfig {
  return {
    width: ROOM_WIDTH,
    height: ROOM_HEIGHT,
    walls: CLOSED,
    air: "vacuum",
    obstacles: [],
    zones: [],
    objects: [],
    ...partial,
  }
}

/** Two thin lips either side of a goal zone so a ball settles into it. */
function basketLips(idPrefix: string, zone: Rect): Obstacle[] {
  const lipWidth = 8
  const lipHeight = Math.round(zone.height * 0.9)
  const y = zone.y + zone.height - lipHeight
  return [
    { id: `${idPrefix}-left`, kind: "wall", x: zone.x - lipWidth, y, width: lipWidth, height: lipHeight },
    { id: `${idPrefix}-right`, kind: "wall", x: zone.x + zone.width, y, width: lipWidth, height: lipHeight },
  ]
}

const DROP_IN_BASKET: Zone = { id: "basket", kind: "goal", x: 420, y: 470, width: 120, height: 70 }
/**
 * Bank Shot's cup. The zone starts below the lip tops, so a centre inside it
 * means the ball is between the lips. The cup sits to the right of where the
 * zero-g diagonal from the bumper crosses lip height (x ≈ 390 at y = 460), so
 * a ball that is never pulled down sails past the mouth and lands short.
 */
const BANK_SHOT_CUP: Zone = { id: "cup", kind: "goal", x: 430, y: 470, width: 160, height: 70 }
const BANK_SHOT_LIPS: Obstacle[] = [
  { id: "cup-lip-left", kind: "wall", x: 422, y: 460, width: 8, height: 80 },
  { id: "cup-lip-right", kind: "wall", x: 590, y: 460, width: 8, height: 80 },
]
const MOON_SHOT_CUP: Zone = { id: "cup", kind: "goal", x: 590, y: 440, width: 160, height: 100 }

export const MISSIONS: MissionDefinition[] = [
  {
    id: "drop-in",
    text: {
      name: { en: "Drop In", es: "Déjala caer", zh: "落下来", pt: "Deixe cair" },
      learning: { en: "What gravity does to a still object.", es: "Qué le hace la gravedad a un objeto quieto.", zh: "引力会对静止的物体做什么。", pt: "O que a gravidade faz com um objeto parado." },
      objective: {
        en: "Flip gravity on and drop the ball into the basket.",
        es: "Enciende la gravedad y deja caer la pelota en la canasta.",
        zh: "打开引力，让球落进篮子里。",
        pt: "Ligue a gravidade e deixe a bola cair na cesta.",
      },
      hint: {
        en: "Gravity always pulls straight down. Look at where the ball is floating right now.",
        es: "La gravedad siempre tira hacia abajo. Mira dónde está flotando la pelota ahora.",
        zh: "引力总是竖直向下拉。先看看球现在飘在哪里。",
        pt: "A gravidade sempre puxa para baixo. Veja onde a bola está flutuando agora.",
      },
      concept: {
        en: "Gravity is a force that pulls objects toward the ground.",
        es: "La gravedad es una fuerza que tira de los objetos hacia el suelo.",
        zh: "引力是一种把物体拉向地面的力。",
        pt: "A gravidade é uma força que puxa os objetos para o chão.",
      },
      success: {
        en: "Straight down into the basket. Gravity pulled the ball toward the ground the moment you switched it on.",
        es: "Directo a la canasta. La gravedad tiró de la pelota hacia el suelo en cuanto la encendiste.",
        zh: "球直直落进了篮子。你一打开引力，它就把球拉向了地面。",
        pt: "Direto na cesta. A gravidade puxou a bola para o chão assim que você a ligou.",
      },
      failure: {
        en: "The ball only falls when gravity is on. Flip the big switch and watch it drop.",
        es: "La pelota solo cae cuando la gravedad está encendida. Mueve el interruptor grande y mira cómo cae.",
        zh: "只有打开引力，球才会掉下来。按下大开关，看着它落下。",
        pt: "A bola só cai quando a gravidade está ligada. Vire o interruptor grande e veja ela cair.",
      },
    },
    world: room({
      zones: [DROP_IN_BASKET],
      obstacles: basketLips("basket-lip", DROP_IN_BASKET),
      objects: [{ id: "ball", kind: "ball", x: 480, y: 110 }],
    }),
    gravity: { preset: "earth", switchOn: false },
    allowedPresets: ["earth"],
    switchLocked: false,
    allowPush: false,
    objectives: [{ kind: "rest-in-zone", objectId: "ball", zoneId: "basket" }],
    ordered: true,
    failConditions: [{ kind: "time-limit", ms: 20_000 }],
    tryNext: "falling-ball-off",
  },
  {
    id: "hang-time",
    text: {
      name: { en: "Hang Time", es: "Tiempo en el aire", zh: "悬停时刻", pt: "Tempo no ar" },
      learning: { en: "What a moving object does when nothing pulls on it.", es: "Qué hace un objeto en movimiento cuando nada tira de él.", zh: "没有任何力拉它时，运动的物体会怎样。", pt: "O que um objeto em movimento faz quando nada o puxa." },
      objective: {
        en: "Flip gravity off as the ball rolls off the ledge so it glides across the gap, then flip it back on to land on the far platform.",
        es: "Apaga la gravedad cuando la pelota salga de la repisa para que cruce el hueco flotando, y vuelve a encenderla para aterrizar en la plataforma de enfrente.",
        zh: "球滚出平台时关掉引力，让它飘过缺口；再打开引力，让它落在对面的平台上。",
        pt: "Desligue a gravidade quando a bola sair da borda para ela cruzar o vão flutuando, depois ligue de novo para pousar na plataforma do outro lado.",
      },
      hint: {
        en: "The Moon's gentle gravity gives you time. Once gravity is off, nothing pulls the ball down, so it keeps its sideways speed in a straight line. Turn gravity back on when it is above the far platform.",
        es: "La gravedad suave de la Luna te da tiempo. Con la gravedad apagada nada tira de la pelota hacia abajo: conserva su velocidad lateral en línea recta. Enciende la gravedad cuando esté encima de la plataforma de enfrente.",
        zh: "月球温和的引力给了你反应时间。引力一关，就没有东西往下拉球，它会保持横向速度沿直线前进。等它到了对面平台上方再打开引力。",
        pt: "A gravidade suave da Lua dá tempo a você. Com a gravidade desligada nada puxa a bola para baixo: ela mantém a velocidade lateral em linha reta. Ligue a gravidade quando ela estiver sobre a plataforma do outro lado.",
      },
      concept: {
        en: "A moving object keeps moving in a straight line at the same speed until a force changes it. Gravity is the force that bends a thrown ball's path into a curve.",
        es: "Un objeto en movimiento sigue en línea recta a la misma velocidad hasta que una fuerza lo cambia. La gravedad es la fuerza que curva el camino de una pelota lanzada.",
        zh: "运动的物体会以同样的速度沿直线一直运动，直到有力改变它。引力就是把抛出的球的路线弯成曲线的那个力。",
        pt: "Um objeto em movimento continua em linha reta na mesma velocidade até que uma força mude isso. A gravidade é a força que curva o caminho de uma bola lançada.",
      },
      success: {
        en: "It glided straight across and landed. Nothing was pulling the ball down, so it never curved toward the gap.",
        es: "Cruzó en línea recta y aterrizó. Nada tiraba de la pelota hacia abajo, así que nunca se curvó hacia el hueco.",
        zh: "它直直地飘了过去，稳稳落地。没有东西往下拉球，所以它没有向缺口弯下去。",
        pt: "Ela atravessou em linha reta e pousou. Nada puxava a bola para baixo, então ela nunca curvou para o vão.",
      },
      failure: {
        en: "It did not make it across. Flip gravity off the moment the ball rolls off the edge, then flip it back on above the far platform.",
        es: "No logró cruzar. Apaga la gravedad justo cuando la pelota salga del borde y vuelve a encenderla encima de la plataforma de enfrente.",
        zh: "它没能过去。球一滚出边缘就关掉引力，到了对面平台上方再打开。",
        pt: "Ela não conseguiu atravessar. Desligue a gravidade no momento em que a bola sair da borda e ligue de novo sobre a plataforma do outro lado.",
      },
    },
    // A ledge on the left, a 400 px gap with a pit, and a lower platform on the
    // right. Moon gravity is what makes the timing kind: a flip up to about
    // 0.6 s after the edge still arrives above the far platform, where on Earth
    // the downward speed picked up in a tenth of a second would already be too
    // much. With gravity left on, the ball drops into the pit a full metre
    // short of the far side. The platform's face is a separate "cliff" body so
    // touching its top, and only its top, counts as landing.
    world: room({
      obstacles: [
        { id: "ledge-left", kind: "platform", x: 0, y: 320, width: 300, height: 220 },
        { id: "cliff", kind: "wall", x: 700, y: 470, width: 8, height: 70 },
        { id: "ledge-right", kind: "platform", x: 708, y: 470, width: 252, height: 70 },
      ],
      zones: [
        { id: "gap-air", kind: "target", x: 300, y: 160, width: 400, height: 310 },
        { id: "pit", kind: "hazard", x: 300, y: 500, width: 400, height: 40 },
        { id: "landing", kind: "goal", x: 760, y: 400, width: 180, height: 70 },
      ],
      // Rolling right at 2.6 m/s with matching spin (ω = v / r), so it rolls rather than skids.
      objects: [{ id: "ball", kind: "ball", x: 110, y: 302, velocity: { x: 2.6, y: 0 }, angularVelocity: 8.67 }],
    }),
    gravity: { preset: "moon", switchOn: true },
    allowedPresets: ["moon"],
    switchLocked: false,
    allowPush: false,
    trailsByDefault: true,
    objectives: [
      {
        kind: "enter-zone",
        objectId: "ball",
        zoneId: "gap-air",
        gravity: { switchOn: false },
        label: { en: "Glide over the gap", es: "Flota sobre el hueco", zh: "飘过缺口", pt: "Flutue sobre o vão" },
      },
      {
        kind: "bounce-off",
        objectId: "ball",
        obstacleId: "ledge-right",
        label: { en: "Land on the far platform", es: "Aterriza en la plataforma", zh: "落在对面平台上", pt: "Pouse na plataforma" },
      },
    ],
    ordered: true,
    failConditions: [
      { kind: "touch-hazard", zoneId: "pit" },
      { kind: "time-limit", ms: 25_000 },
    ],
    tryNext: "zero-g-push",
  },
  {
    id: "straight-up",
    text: {
      name: { en: "Straight Up", es: "Directo hacia arriba", zh: "一路向上", pt: "Direto para cima" },
      learning: { en: "How gravity changes a ball that is moving upward.", es: "Cómo cambia la gravedad una pelota que va hacia arriba.", zh: "引力如何改变一个正在向上运动的球。", pt: "Como a gravidade muda uma bola que está subindo." },
      objective: {
        en: "The spring fires the ball upward. Switch gravity off while it is rising so it keeps going and escapes through the hatch.",
        es: "El resorte lanza la pelota hacia arriba. Apaga la gravedad mientras sube para que siga subiendo y salga por la escotilla.",
        zh: "弹簧把球向上弹出。趁它还在上升时关掉引力，让它一直往上飞，从舱口出去。",
        pt: "A mola lança a bola para cima. Desligue a gravidade enquanto ela sobe para que continue subindo e saia pela escotilha.",
      },
      hint: {
        en: "Try it once with gravity left on and watch: the ball slows, stops, and comes back down. Then try flipping the switch off right after launch.",
        es: "Pruébalo una vez con la gravedad encendida y mira: la pelota frena, se detiene y vuelve a bajar. Luego apaga el interruptor justo después del lanzamiento.",
        zh: "先试一次不关引力，看看：球会变慢、停住，然后掉回来。再试试发射后马上关掉开关。",
        pt: "Tente uma vez com a gravidade ligada e veja: a bola desacelera, para e volta a cair. Depois tente desligar o interruptor logo depois do lançamento.",
      },
      concept: {
        en: "Gravity pulls a rising ball back: it slows it down, stops it, then speeds it up on the way down. Without gravity, the ball keeps its upward speed.",
        es: "La gravedad tira de una pelota que sube: la frena, la detiene y luego la acelera hacia abajo. Sin gravedad, la pelota conserva su velocidad hacia arriba.",
        zh: "引力会把上升的球拉回来：先让它变慢、停住，再让它加速下落。没有引力，球就会保持向上的速度。",
        pt: "A gravidade puxa uma bola que sobe: desacelera, para e depois acelera para baixo. Sem gravidade, a bola mantém a velocidade para cima.",
      },
      success: {
        en: "Out through the hatch! With gravity off, nothing slowed the ball down, so it kept rising at the speed the spring gave it.",
        es: "¡Salió por la escotilla! Sin gravedad nada frenó la pelota, así que siguió subiendo a la velocidad que le dio el resorte.",
        zh: "从舱口飞出去了！引力关掉后没有东西让球减速，它就以弹簧给的速度一直往上飞。",
        pt: "Saiu pela escotilha! Sem gravidade nada freou a bola, então ela continuou subindo na velocidade que a mola deu.",
      },
      failure: {
        en: "Gravity slowed the ball, stopped it, and pulled it back down. Flip gravity off while the ball is still going up.",
        es: "La gravedad frenó la pelota, la detuvo y la trajo de vuelta. Apaga la gravedad mientras la pelota todavía esté subiendo.",
        zh: "引力让球减速、停住，又把它拉了回来。要趁球还在往上升的时候关掉引力。",
        pt: "A gravidade desacelerou a bola, parou e puxou de volta. Desligue a gravidade enquanto a bola ainda estiver subindo.",
      },
    },
    // A spring under the ball and a hatch in the roof. The spring gives 10 m/s:
    // on Earth that is a 5 m hop that falls back short of the roof, and with
    // gravity off it is a straight climb out through the hatch. The switch
    // must go off within the second the ball is still rising.
    world: room({
      walls: { floor: true, ceiling: false, left: true, right: true },
      obstacles: [
        { id: "roof-left", kind: "wall", x: 0, y: 0, width: 420, height: 24 },
        { id: "roof-right", kind: "wall", x: 540, y: 0, width: 420, height: 24 },
      ],
      zones: [{ id: "hatch", kind: "target", x: 420, y: 0, width: 120, height: 70 }],
      launchers: [{ id: "spring", objectId: "ball", x: 440, y: 500, width: 80, height: 40, speed: 10 }],
      objects: [{ id: "ball", kind: "ball", x: 480, y: 482 }],
    }),
    gravity: { preset: "earth", switchOn: true },
    allowedPresets: ["earth"],
    switchLocked: false,
    allowPush: false,
    trailsByDefault: true,
    objectives: [
      {
        kind: "exit",
        objectId: "ball",
        side: "ceiling",
        gravity: { switchOn: false },
        label: { en: "Out through the hatch", es: "Sal por la escotilla", zh: "从舱口出去", pt: "Saia pela escotilha" },
      },
    ],
    ordered: true,
    failConditions: [{ kind: "time-limit", ms: 15_000 }],
    tryNext: "falling-ball-off",
  },
  {
    id: "hammer-and-feather",
    text: {
      name: { en: "Hammer and Feather", es: "Martillo y pluma", zh: "锤子和羽毛", pt: "Martelo e pena" },
      learning: { en: "Whether heavy things fall faster than light things.", es: "Si las cosas pesadas caen más rápido que las ligeras.", zh: "重的东西是不是比轻的落得快。", pt: "Se coisas pesadas caem mais rápido que coisas leves." },
      objective: {
        en: "Guess which lands first, then flip gravity on and drop them both at the same instant.",
        es: "Adivina cuál llega primero al suelo; luego enciende la gravedad y suéltalos a la vez.",
        zh: "先猜猜哪个先落地，再打开引力，让它们同时落下。",
        pt: "Adivinhe qual chega primeiro ao chão, depois ligue a gravidade e solte os dois ao mesmo tempo.",
      },
      hint: {
        en: "This room has no air at all. Think about what usually slows a feather down, and whether that can happen here.",
        es: "En esta sala no hay nada de aire. Piensa en qué suele frenar a una pluma y si eso puede pasar aquí.",
        zh: "这个房间里一点空气都没有。想想平时是什么让羽毛落得慢，这里还会这样吗？",
        pt: "Esta sala não tem ar nenhum. Pense no que costuma frear uma pena e se isso pode acontecer aqui.",
      },
      concept: {
        en: "Gravity speeds up every object the same way, heavy or light. On Earth it is the air pushing back on the feather that makes it drift down slowly.",
        es: "La gravedad acelera todos los objetos por igual, pesados o ligeros. En la Tierra es el aire empujando a la pluma lo que la hace bajar despacio.",
        zh: "引力让所有物体以同样的方式加速，不管轻还是重。在地球上，是空气托着羽毛，才让它慢慢飘下来。",
        pt: "A gravidade acelera todos os objetos do mesmo jeito, pesados ou leves. Na Terra é o ar empurrando a pena que a faz descer devagar.",
      },
      success: {
        en: "They hit the ground together. The hammer weighs sixty times more than the feather, and it made no difference: with no air in the way, gravity pulled both down at exactly the same rate.",
        es: "Llegaron al suelo juntos. El martillo pesa sesenta veces más que la pluma y no importó: sin aire de por medio, la gravedad tiró de los dos exactamente al mismo ritmo.",
        zh: "它们同时落地了。锤子比羽毛重六十倍，可这一点影响都没有：没有空气阻挡，引力把两者以完全相同的速度拉了下来。",
        pt: "Chegaram ao chão juntos. O martelo pesa sessenta vezes mais que a pena e não fez diferença: sem ar no caminho, a gravidade puxou os dois exatamente no mesmo ritmo.",
      },
      failure: {
        en: "They did not land together this time. Flip gravity on and let both fall freely.",
        es: "Esta vez no aterrizaron juntos. Enciende la gravedad y deja que los dos caigan libremente.",
        zh: "这次它们没有同时落地。打开引力，让两者自由落下。",
        pt: "Desta vez eles não pousaram juntos. Ligue a gravidade e deixe os dois caírem livremente.",
      },
    },
    // Same drop height for both: their bottoms sit on one line, so a fair
    // race ends in a tie to within a few milliseconds. Airless, as the Moon is.
    world: room({
      air: "vacuum",
      zones: [{ id: "ground", kind: "target", x: 300, y: 520, width: 360, height: 20 }],
      objects: [
        { id: "hammer", kind: "hammer", x: 380, y: 120 },
        { id: "feather", kind: "feather", x: 580, y: 125 },
      ],
    }),
    gravity: { preset: "moon", switchOn: false },
    allowedPresets: ["moon"],
    switchLocked: false,
    allowPush: false,
    trailsByDefault: true,
    prediction: {
      prompt: {
        en: "Which one will hit the ground first?",
        es: "¿Cuál llegará primero al suelo?",
        zh: "哪个会先落地？",
        pt: "Qual vai chegar primeiro ao chão?",
      },
      choices: [
        { id: "hammer", label: { en: "The hammer", es: "El martillo", zh: "锤子", pt: "O martelo" } },
        { id: "feather", label: { en: "The feather", es: "La pluma", zh: "羽毛", pt: "A pena" } },
        { id: "same", label: { en: "Both at the same time", es: "Los dos a la vez", zh: "同时落地", pt: "Os dois ao mesmo tempo" } },
      ],
      // Any guess is accepted; this only feeds the "good guess" record.
      correctId: "same",
    },
    objectives: [
      {
        kind: "land-together",
        objectIds: ["hammer", "feather"],
        toleranceMs: 150,
        label: { en: "Drop them together", es: "Suéltalos a la vez", zh: "让它们一起落下", pt: "Solte os dois juntos" },
      },
    ],
    ordered: true,
    failConditions: [{ kind: "time-limit", ms: 30_000 }],
    tryNext: "heavy-light",
  },
  {
    id: "bank-shot",
    text: {
      name: { en: "Bank Shot", es: "Tiro de rebote", zh: "反弹入袋", pt: "Tiro de tabela" },
      learning: { en: "How a bounce and gravity each change a ball's path.", es: "Cómo un rebote y la gravedad cambian, cada uno, el camino de una pelota.", zh: "反弹和引力分别会怎样改变球的路线。", pt: "Como um quique e a gravidade mudam, cada um, o caminho de uma bola." },
      objective: {
        en: "The ball drifts into the angled bumper and bounces away. Flip gravity on at the right moment to curve it down into the cup.",
        es: "La pelota flota hasta el parachoques inclinado y rebota. Enciende la gravedad en el momento justo para curvarla hacia la taza.",
        zh: "球飘向斜着的弹板并反弹回来。在合适的时机打开引力，让它弯下来落进杯子。",
        pt: "A bola flutua até o para-choque inclinado e quica. Ligue a gravidade no momento certo para curvá-la para dentro do copo.",
      },
      hint: {
        en: "Watch the trail. Without gravity the bounce goes in a straight line and misses. Gravity bends it down: flip sooner to land nearer the bumper, later to land farther away.",
        es: "Mira la estela. Sin gravedad el rebote sigue en línea recta y no entra. La gravedad la curva hacia abajo: enciende antes para caer cerca del parachoques, después para caer más lejos.",
        zh: "看轨迹。没有引力时，反弹后球会沿直线飞出去，进不了杯子。引力会把它往下弯：早开落得离弹板近，晚开落得远。",
        pt: "Observe o rastro. Sem gravidade o quique segue em linha reta e erra. A gravidade curva para baixo: ligue antes para cair perto do para-choque, depois para cair mais longe.",
      },
      concept: {
        en: "A bounce changes which way the ball is going. Gravity does not change its sideways motion at all; it only pulls the ball down faster and faster.",
        es: "Un rebote cambia la dirección de la pelota. La gravedad no cambia nada su movimiento lateral: solo tira de ella hacia abajo cada vez más rápido.",
        zh: "反弹改变的是球的运动方向。引力完全不改变它的横向运动，只是把它越来越快地往下拉。",
        pt: "Um quique muda a direção da bola. A gravidade não muda nada o movimento lateral: só puxa a bola para baixo cada vez mais rápido.",
      },
      success: {
        en: "Banked it. The bumper sent the ball off at an angle, and switching gravity on bent that straight line into the curve that ended in the cup.",
        es: "¡Rebote perfecto! El parachoques lanzó la pelota en ángulo, y encender la gravedad convirtió esa línea recta en la curva que terminó en la taza.",
        zh: "反弹成功！弹板让球斜着飞出去，打开引力把那条直线弯成了落进杯子的曲线。",
        pt: "Tabela perfeita! O para-choque mandou a bola em ângulo, e ligar a gravidade transformou essa linha reta na curva que terminou no copo.",
      },
      failure: {
        en: "It missed the cup. After the bounce, flip gravity on a little earlier to land closer to the bumper, or later to land farther away.",
        es: "No entró en la taza. Después del rebote, enciende la gravedad un poco antes para caer más cerca del parachoques, o un poco después para caer más lejos.",
        zh: "没进杯子。反弹之后，早一点开引力会落得离弹板近些，晚一点开会落得远些。",
        pt: "Errou o copo. Depois do quique, ligue a gravidade um pouco antes para cair mais perto do para-choque, ou depois para cair mais longe.",
      },
    },
    // Zero-g start. The ball drifts right along the top, meets a bumper tilted
    // 22.5° off vertical and comes away down-left at 45° with 96% of its speed.
    // Measured on the engine: left alone it lands at x ≈ 310; gravity from the
    // bounce onward lands it at x ≈ 596; the cup at 430-590 catches flips made
    // 0.3 to 1.7 s after the bounce, a window of about a second and a half.
    world: room({
      obstacles: [
        { id: "bumper", kind: "bumper", x: 708, y: 40, width: 24, height: 240, angle: -Math.PI / 8 },
        ...BANK_SHOT_LIPS,
      ],
      zones: [BANK_SHOT_CUP],
      objects: [{ id: "ball", kind: "ball", x: 240, y: 140, velocity: { x: 2.6, y: 0 } }],
    }),
    gravity: { preset: "earth", switchOn: false },
    allowedPresets: ["earth"],
    switchLocked: false,
    allowPush: false,
    trailsByDefault: true,
    objectives: [
      {
        kind: "bounce-off",
        objectId: "ball",
        obstacleId: "bumper",
        label: { en: "Hit the bumper", es: "Golpea el parachoques", zh: "撞上弹板", pt: "Acerte o para-choque" },
      },
      {
        kind: "enter-zone",
        objectId: "ball",
        zoneId: "cup",
        label: { en: "Sink it in the cup", es: "Métela en la taza", zh: "落进杯子", pt: "Acerte o copo" },
      },
    ],
    ordered: true,
    failConditions: [{ kind: "time-limit", ms: 25_000 }],
  },
  {
    id: "moon-shot",
    text: {
      name: { en: "Moon Shot", es: "Tiro lunar", zh: "月球投篮", pt: "Arremesso lunar" },
      learning: { en: "How the strength of gravity changes a throw.", es: "Cómo cambia un lanzamiento según la fuerza de la gravedad.", zh: "引力的强弱如何改变一次投掷。", pt: "Como a força da gravidade muda um arremesso." },
      objective: {
        en: "The launcher fires the ball the same way every time. On Earth it falls short of the cup. Pick the planet whose gravity lets it fly far enough.",
        es: "El lanzador dispara la pelota igual cada vez. En la Tierra se queda corta. Elige el planeta cuya gravedad la deje volar lo suficiente.",
        zh: "发射器每次都用同样的方式发球。在地球上，球够不到杯子。选一个引力能让它飞得够远的星球。",
        pt: "O lançador dispara a bola do mesmo jeito toda vez. Na Terra ela cai antes do copo. Escolha o planeta cuja gravidade a deixa voar longe o bastante.",
      },
      hint: {
        en: "Weaker gravity pulls the ball down more slowly, so the same launch stays up longer and travels farther. Which planet here pulls the least?",
        es: "Una gravedad más débil tira de la pelota hacia abajo más despacio: el mismo lanzamiento dura más en el aire y llega más lejos. ¿Qué planeta de aquí tira menos?",
        zh: "引力越弱，把球往下拉得越慢，同样的发射就能在空中待得更久、飞得更远。这里哪个星球的引力最弱？",
        pt: "Uma gravidade mais fraca puxa a bola para baixo mais devagar: o mesmo lançamento fica mais tempo no ar e vai mais longe. Qual planeta daqui puxa menos?",
      },
      concept: {
        en: "The launch never changed; only gravity did. Weaker gravity means a higher, longer arc from exactly the same push.",
        es: "El lanzamiento nunca cambió; solo cambió la gravedad. Con menos gravedad, el mismo empujón hace un arco más alto y más largo.",
        zh: "发射从来没变，变的只是引力。引力更弱时，同样的一推能画出更高、更长的弧线。",
        pt: "O lançamento nunca mudou; só a gravidade mudou. Com menos gravidade, o mesmo empurrão faz um arco mais alto e mais longo.",
      },
      success: {
        en: "All the way to the cup. The Moon pulls about six times less than Earth, so the very same launch stayed in the air longer and flew six times farther.",
        es: "Llegó hasta la taza. La Luna tira unas seis veces menos que la Tierra, así que el mismo lanzamiento duró más en el aire y voló seis veces más lejos.",
        zh: "一路飞进了杯子。月球的引力只有地球的约六分之一，所以同样的发射在空中待得更久，飞出了六倍远。",
        pt: "Chegou até o copo. A Lua puxa cerca de seis vezes menos que a Terra, então o mesmíssimo lançamento ficou mais tempo no ar e voou seis vezes mais longe.",
      },
      failure: {
        en: "It fell short. Gravity pulled the ball down before it could reach the cup. Try a planet that pulls more gently.",
        es: "Se quedó corta. La gravedad tiró de la pelota hacia abajo antes de que llegara a la taza. Prueba un planeta que tire más suave.",
        zh: "球没飞到。引力在它到达杯子之前就把它拉了下来。试试引力更温和的星球。",
        pt: "Caiu antes. A gravidade puxou a bola para baixo antes de ela chegar ao copo. Tente um planeta que puxe mais de leve.",
      },
    },
    // A spring angled 45° fires at 4 m/s from the bottom-left. Measured on the
    // engine, the ball first comes down past cup height at x ≈ 645 on the
    // Moon, at x ≈ 406 on Mars and x ≈ 242 on Earth. The cup spans 590-750 so
    // the Moon shot drops cleanly between its lips. The floor either side of
    // the cup is a hazard so a short shot ends the attempt at once, with the
    // explanation.
    world: room({
      obstacles: [...basketLips("cup-lip", MOON_SHOT_CUP)],
      zones: [
        MOON_SHOT_CUP,
        { id: "floor-left", kind: "hazard", x: 180, y: 530, width: 402, height: 10 },
        { id: "floor-right", kind: "hazard", x: 758, y: 530, width: 202, height: 10 },
      ],
      launchers: [{ id: "spring", objectId: "ball", x: 80, y: 500, width: 80, height: 40, speed: 4, angle: Math.PI / 4 }],
      objects: [{ id: "ball", kind: "ball", x: 120, y: 482 }],
    }),
    gravity: { preset: "earth", switchOn: true },
    allowedPresets: ["earth", "moon", "mars", "jupiter"],
    switchLocked: true,
    allowPush: false,
    trailsByDefault: true,
    objectives: [
      {
        kind: "enter-zone",
        objectId: "ball",
        zoneId: "cup",
        label: { en: "Reach the cup", es: "Llega a la taza", zh: "飞到杯子里", pt: "Chegue ao copo" },
      },
    ],
    ordered: true,
    failConditions: [
      { kind: "touch-hazard", zoneId: "floor-left" },
      { kind: "touch-hazard", zoneId: "floor-right" },
      { kind: "time-limit", ms: 20_000 },
    ],
  },
]

/**
 * Development-only scenario: a ball drifting through every kind of objective in
 * about ten seconds with no player input except one answer. It is how the
 * framework is tested end to end, and it only appears in the mission list in
 * development builds. Never part of the progression.
 */
export const DEV_MISSION: MissionDefinition = {
  id: "dev-check",
  text: {
    name: { en: "Dev check", es: "Prueba dev", zh: "开发检查", pt: "Teste dev" },
    learning: { en: "Framework check.", es: "Prueba del sistema.", zh: "框架检查。", pt: "Teste do sistema." },
    objective: {
      en: "A ball drifts through every objective type. Answer the question when it comes up.",
      es: "Una pelota pasa por todos los tipos de objetivo. Responde la pregunta cuando aparezca.",
      zh: "一个球会依次经过每一种目标。问题出现时回答它。",
      pt: "Uma bola passa por todos os tipos de objetivo. Responda à pergunta quando ela aparecer.",
    },
    hint: {
      en: "Nothing to do but watch, and answer: after the bumper the ball travels left.",
      es: "Solo mira y responde: después del parachoques la pelota va hacia la izquierda.",
      zh: "只需观察并回答：撞过弹板后，球会向左运动。",
      pt: "Só observe e responda: depois do para-choque a bola vai para a esquerda.",
    },
    concept: {
      en: "Every objective kind fires from real physics.",
      es: "Cada tipo de objetivo se activa con física real.",
      zh: "每种目标都是由真实物理触发的。",
      pt: "Cada tipo de objetivo dispara a partir da física real.",
    },
    success: {
      en: "All objective kinds completed in order.",
      es: "Todos los tipos de objetivo se completaron en orden.",
      zh: "所有目标类型都按顺序完成了。",
      pt: "Todos os tipos de objetivo foram concluídos em ordem.",
    },
  },
  world: room({
    walls: { floor: true, ceiling: true, left: false, right: true },
    obstacles: [{ id: "bumper", kind: "bumper", x: 820, y: 150, width: 24, height: 240 }],
    zones: [
      { id: "gate", kind: "target", x: 420, y: 200, width: 100, height: 140 },
      { id: "float", kind: "goal", x: 300, y: 180, width: 320, height: 180 },
      { id: "lava", kind: "hazard", x: 0, y: 0, width: 960, height: 40 },
    ],
    objects: [{ id: "ball", kind: "ball", x: 200, y: 270, velocity: { x: 3, y: 0 } }],
  }),
  gravity: { preset: "earth", switchOn: false },
  allowedPresets: ["earth"],
  switchLocked: false,
  allowPush: true,
  objectives: [
    { kind: "enter-zone", objectId: "ball", zoneId: "gate", label: { en: "Through the gate", es: "Por la puerta", zh: "穿过门", pt: "Pelo portão" } },
    { kind: "bounce-off", objectId: "ball", obstacleId: "bumper", label: { en: "Hit the bumper", es: "Golpea el parachoques", zh: "撞上弹板", pt: "Acerte o para-choque" } },
    {
      kind: "answer",
      label: { en: "Answer", es: "Responde", zh: "回答", pt: "Responda" },
      prompt: { en: "Which way is the ball moving now?", es: "¿Hacia dónde se mueve la pelota ahora?", zh: "球现在往哪边运动？", pt: "Para que lado a bola está indo agora?" },
      choices: [
        { id: "left", label: { en: "Left", es: "Izquierda", zh: "向左", pt: "Esquerda" } },
        { id: "right", label: { en: "Right", es: "Derecha", zh: "向右", pt: "Direita" } },
      ],
      correctId: "left",
    },
    { kind: "hover-in-zone", objectId: "ball", zoneId: "float", durationMs: 1000, label: { en: "Cross the float zone", es: "Cruza la zona", zh: "穿过漂浮区", pt: "Atravesse a zona" } },
    { kind: "exit", objectId: "ball", side: "left", gravity: { switchOn: false }, label: { en: "Leave through the left", es: "Sal por la izquierda", zh: "从左边离开", pt: "Saia pela esquerda" } },
  ],
  ordered: true,
  failConditions: [
    { kind: "time-limit", ms: 30_000 },
    { kind: "touch-hazard", zoneId: "lava" },
    { kind: "out-of-bounds" },
  ],
}

/** Ids in progression order. The dev scenario is not one of them. */
export const MISSION_IDS: MissionId[] = MISSIONS.map((mission) => mission.id)

const MISSION_BY_ID = new Map<MissionId, MissionDefinition>([
  ...MISSIONS.map((mission): [MissionId, MissionDefinition] => [mission.id, mission]),
  [DEV_MISSION.id, DEV_MISSION],
])

export function getMission(id: MissionId): MissionDefinition {
  const mission = MISSION_BY_ID.get(id)
  if (!mission) throw new Error(`Unknown Gravity Switch mission: ${id}`)
  return mission
}

export function isMissionId(value: unknown): value is MissionId {
  return typeof value === "string" && MISSION_BY_ID.has(value as MissionId)
}

/** 0-based position in the progression. */
export function missionIndex(id: MissionId): number {
  return MISSION_IDS.indexOf(id)
}

/** The mission after this one, or null at the end of the list. */
export function nextMissionId(id: MissionId): MissionId | null {
  const index = missionIndex(id)
  return index >= 0 && index < MISSION_IDS.length - 1 ? MISSION_IDS[index + 1] : null
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function rectInsideRoom(rect: Rect, world: WorldConfig): boolean {
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.x >= 0 &&
    rect.y >= 0 &&
    rect.x + rect.width <= world.width &&
    rect.y + rect.height <= world.height
  )
}

function duplicates(ids: string[]): string[] {
  const seen = new Set<string>()
  const dupes = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) dupes.add(id)
    seen.add(id)
  }
  return [...dupes]
}

/**
 * Every way a mission definition can be inconsistent with itself, as a list of
 * human-readable problems. Empty means the mission is sound. Rendering and
 * physics trust these invariants, so the tests run this over every mission.
 */
/** Missions and sandbox experiments share the parts the validator reads. */
type Validatable = Omit<
  Pick<MissionDefinition, "id" | "world" | "gravity" | "allowedPresets" | "switchLocked" | "objectives" | "failConditions" | "prediction">,
  "id"
> & { id: string }

export function validateMission(mission: Validatable): string[] {
  const problems: string[] = []
  const { world } = mission
  const at = (message: string) => problems.push(`${mission.id}: ${message}`)

  if (!(world.width > 0 && world.height > 0)) at("room must have a positive size")

  const objectIds = world.objects.map((object) => object.id)
  const obstacleIds = world.obstacles.map((obstacle) => obstacle.id)
  const zoneIds = world.zones.map((zone) => zone.id)
  for (const id of duplicates(objectIds)) at(`duplicate object id "${id}"`)
  for (const id of duplicates(obstacleIds)) at(`duplicate obstacle id "${id}"`)
  for (const id of duplicates(zoneIds)) at(`duplicate zone id "${id}"`)

  for (const object of world.objects) {
    if (!(object.x > 0 && object.x < world.width && object.y > 0 && object.y < world.height)) {
      at(`object "${object.id}" starts outside the room`)
    }
    if (object.velocity && !(Number.isFinite(object.velocity.x) && Number.isFinite(object.velocity.y))) {
      at(`object "${object.id}" has a non-finite starting velocity`)
    }
  }
  for (const obstacle of world.obstacles) {
    if (!rectInsideRoom(obstacle, world)) at(`obstacle "${obstacle.id}" is not inside the room`)
  }
  for (const zone of world.zones) {
    if (!rectInsideRoom(zone, world)) at(`zone "${zone.id}" is not inside the room`)
  }
  const launchers = world.launchers ?? []
  for (const id of duplicates(launchers.map((launcher) => launcher.id))) at(`duplicate launcher id "${id}"`)
  for (const launcher of launchers) {
    if (!rectInsideRoom(launcher, world)) at(`launcher "${launcher.id}" is not inside the room`)
    if (!(launcher.speed > 0)) at(`launcher "${launcher.id}" needs a positive speed`)
    const object = world.objects.find((candidate) => candidate.id === launcher.objectId)
    if (!object) {
      at(`launcher "${launcher.id}" refers to missing object "${launcher.objectId}"`)
      continue
    }
    const spec = OBJECT_SPECS[object.kind]
    const halfHeight = spec.shape.type === "circle" ? spec.shape.radius : spec.shape.height / 2
    if (Math.abs(object.y + halfHeight - launcher.y) > 2) {
      at(`object "${object.id}" does not rest on launcher "${launcher.id}" (bottom ${object.y + halfHeight}, pad top ${launcher.y})`)
    }
    if (object.x < launcher.x || object.x > launcher.x + launcher.width) {
      at(`object "${object.id}" is not above launcher "${launcher.id}"`)
    }
  }

  if (mission.allowedPresets.length === 0) at("allowedPresets must not be empty")
  for (const id of duplicates(mission.allowedPresets)) at(`duplicate allowed preset "${id}"`)
  for (const preset of mission.allowedPresets) {
    if (!(preset in GRAVITY_PRESETS)) at(`unknown gravity preset "${preset}"`)
  }
  if (!mission.allowedPresets.includes(mission.gravity.preset)) {
    at(`starting preset "${mission.gravity.preset}" is not in allowedPresets`)
  }

  const objectSet = new Set(objectIds)
  const obstacleSet = new Set(obstacleIds)
  const zoneById = new Map(world.zones.map((zone) => [zone.id, zone]))
  const needObject = (id: string, where: string) => {
    if (!objectSet.has(id)) at(`${where} refers to missing object "${id}"`)
  }
  const needZone = (id: string, where: string, kinds?: Zone["kind"][]) => {
    const zone = zoneById.get(id)
    if (!zone) return at(`${where} refers to missing zone "${id}"`)
    if (kinds && !kinds.includes(zone.kind)) at(`${where} needs a ${kinds.join(" or ")} zone, "${id}" is a ${zone.kind}`)
  }

  if (mission.objectives.length === 0) at("a mission needs at least one objective")
  mission.objectives.forEach((objective, index) => {
    const where = `objective ${index + 1} (${objective.kind})`
    switch (objective.kind) {
      case "rest-in-zone":
      case "enter-zone":
        needObject(objective.objectId, where)
        needZone(objective.zoneId, where, ["goal", "target"])
        break
      case "hover-in-zone":
        needObject(objective.objectId, where)
        needZone(objective.zoneId, where, ["goal", "target"])
        if (!(objective.durationMs > 0)) at(`${where} needs a positive duration`)
        break
      case "bounce-off":
        needObject(objective.objectId, where)
        if (!obstacleSet.has(objective.obstacleId)) at(`${where} refers to missing obstacle "${objective.obstacleId}"`)
        break
      case "land-together": {
        const [a, b] = objective.objectIds
        needObject(a, where)
        needObject(b, where)
        if (a === b) at(`${where} needs two different objects`)
        if (!(objective.toleranceMs > 0)) at(`${where} needs a positive tolerance`)
        if (!world.walls.floor) at(`${where} needs a floor to land on`)
        break
      }
      case "exit":
        needObject(objective.objectId, where)
        if (world.walls[objective.side]) at(`${where} needs the ${objective.side} side to be open`)
        break
      case "moving":
        needObject(objective.objectId, where)
        if (!(objective.minSpeed > 0)) at(`${where} needs a positive speed`)
        break
      case "gravity-flip":
        if (objective.objectId !== undefined) needObject(objective.objectId, where)
        if (objective.minSpeed !== undefined && objective.minSpeed < 0) at(`${where} needs a non-negative speed`)
        break
      case "answer": {
        if (objective.choices.length < 2) at(`${where} needs at least two choices`)
        for (const id of duplicates(objective.choices.map((choice) => choice.id))) at(`${where} has a duplicate choice "${id}"`)
        if (!objective.choices.some((choice) => choice.id === objective.correctId)) {
          at(`${where} has no choice matching correctId "${objective.correctId}"`)
        }
        break
      }
    }
    if ("gravity" in objective && objective.gravity?.presets) {
      for (const preset of objective.gravity.presets) {
        if (!mission.allowedPresets.includes(preset)) at(`${where} requires preset "${preset}" the player cannot pick`)
      }
    }
  })

  if (mission.prediction) {
    if (mission.prediction.choices.length < 2) at("a prediction needs at least two choices")
    for (const id of duplicates(mission.prediction.choices.map((choice) => choice.id))) at(`duplicate prediction choice "${id}"`)
  }

  mission.failConditions.forEach((condition, index) => {
    const where = `fail condition ${index + 1} (${condition.kind})`
    switch (condition.kind) {
      case "out-of-bounds":
        if (condition.objectId !== undefined) needObject(condition.objectId, where)
        if (world.walls.floor && world.walls.ceiling && world.walls.left && world.walls.right) {
          at(`${where} can never trigger in a fully closed room`)
        }
        break
      case "touch-hazard":
        needZone(condition.zoneId, where, ["hazard"])
        if (condition.objectId !== undefined) needObject(condition.objectId, where)
        break
      case "time-limit":
        if (!(condition.ms > 0)) at(`${where} needs a positive time`)
        break
      case "switch-limit":
        if (!(condition.maxFlips >= 0)) at(`${where} needs a non-negative flip count`)
        if (mission.switchLocked) at(`${where} is pointless when the switch is locked`)
        break
    }
  })

  return problems
}

/** Problems across the whole list, including cross-mission ones such as duplicate ids. */
export function validateMissions(missions: MissionDefinition[] = MISSIONS): string[] {
  const problems = missions.flatMap(validateMission)
  for (const id of duplicates(missions.map((mission) => mission.id))) {
    problems.push(`duplicate mission id "${id}"`)
  }
  return problems
}

/** Presets a mission lets the player pick, in display order. */
export function missionPresets(mission: MissionDefinition): GravityPresetId[] {
  return mission.allowedPresets
}
