import type { RoboticsCurriculum, RoboticsModule } from "./index.ts"
import { roboticsCurriculum } from "./index.ts"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type DeepPartial,
  type LocaleOverlays,
} from "../../../lib/localize-content.ts"
import type { Language } from "../../../i18n/translations.ts"

/**
 * Translations for the Robotics & Automation course.
 *
 * Sparse overlays merged onto the English `roboticsCurriculum` by
 * `lib/localize-content`. Only prose lives here: slugs, week numbers, hrefs,
 * answer keys, and diagram/accent identifiers stay shared with English so the
 * course cannot structurally drift between locales.
 *
 * Untranslated strings fall through to English automatically, so this file can
 * grow one week at a time.
 */
const es: DeepPartial<RoboticsCurriculum> = {
  title: "Robótica y Automatización",
  subtitle: "Aprende cómo los robots perciben, piensan y actúan, y luego diseña, construye, programa, prueba y mejora uno que ayude.",
  description: "Un curso de robótica de 8 semanas para 4.º a 6.º grado. Los estudiantes aprenden qué hace que algo sea un robot, construyen una base que se mueve, programan instrucciones exactas, agregan sensores, hacen que los robots reaccionen con ciclos y condiciones, depuran para lograr confiabilidad, planean una misión autónoma y terminan diseñando un robot que resuelve un problema real. Cada semana se trabaja con un kit físico, con un simulador en el navegador o sin dispositivos, con materiales de casa.",
  gradeRange: "Grados 4 a 6",
  duration: "8 semanas",
  estimatedTimePerModule: "60 a 90 minutos",
  requirement: "Un kit de robótica, un navegador o materiales de casa: con cualquiera de las tres opciones funciona",
  summary: "Robótica y Automatización enseña cómo funcionan los robots de verdad, construyendo una idea a la vez. Los estudiantes empiezan por separar los robots de las máquinas comunes, luego arman una base con ruedas, le dan instrucciones exactas, le agregan sensores y hacen que reaccione al mundo con ciclos y condiciones. Las últimas semanas se centran en depurar para lograr confiabilidad y en planear una misión autónoma y segura, y el curso cierra con un proyecto final en el que cada estudiante diseña, construye o simula, programa, prueba y mejora un robot que hace un trabajo útil. Todo el curso se puede seguir de tres maneras (con un kit programable, con un simulador en el navegador o sin dispositivos, con cartón y programación en papel), así que cualquier salón, biblioteca o casa puede participar.",
  format: [
    "Una gran idea de robótica y una misión principal por semana, en un orden que va sumando.",
    "Cada semana funciona de tres maneras: con un kit físico, con un simulador en el navegador o sin dispositivos, con materiales de casa.",
    "Cada semana sigue el mismo recorrido: aprender, explorar, construir, programar, probar y reflexionar.",
    "Los estudiantes predicen, prueban y registran resultados reales, y depuran cuando algo sale mal.",
    "El curso termina con un proyecto final y una rúbrica en los que los estudiantes diseñan un robot que ayuda.",
  ],
  learningGoals: [
    "Explicar qué hace que algo sea un robot y cómo percibe, decide y actúa",
    "Construir una base de robot estable que se mueva",
    "Programar secuencias exactas de instrucciones",
    "Usar sensores, umbrales y calibración",
    "Hacer que los robots reaccionen con ciclos y condiciones",
    "Depurar problemas mecánicos, de programación y de sensores para lograr confiabilidad",
    "Planear una misión autónoma y segura con un diagrama de flujo",
    "Diseñar, construir, programar, probar y mejorar un robot que ayude",
  ],
  equipmentPaths: [
    {
      label: "Kit de robótica",
      description: "Un kit de robótica programable con motores y sensores (de cualquier marca). Es la mejor opción cuando el grupo o la familia ya tiene uno.",
      needs: "Un kit de robótica programable con al menos un motor y un sensor, además de su aplicación o programa.",
    },
    {
      label: "Simulador en el navegador",
      description: "Un robot de bloques que arrastras y manejas sobre una cuadrícula en el navegador. No hace falta ningún equipo y funciona en cualquier computadora o tableta.",
      needs: "Una computadora o tableta con un navegador web moderno.",
    },
    {
      label: "Sin dispositivos / materiales de casa",
      description: "Un robot de cartón y cuerda, más programación en papel. Es la mejor opción cuando no hay kit ni dispositivos confiables.",
      needs: "Cartón, cinta adhesiva, cuerda, marcadores y material de reciclaje de todos los días.",
    },
  ],
  modules: [
    {
      title: "¿Qué hace que algo sea un robot?",
      subtitle: "Separa los robots de las máquinas comunes y traza cómo un robot percibe, piensa y actúa.",
      summary: "Los estudiantes descubren qué hace realmente que algo sea un robot y no solo una máquina. Aprenden que un robot percibe el mundo, decide qué hacer y luego actúa (el ciclo de entrada, procesamiento y salida), y que un programa es lo que le permite repetir el trabajo por su cuenta. Investigan aparatos reales, representan uno como sistema robótico y bosquejan un robot útil propio.",
      mainMission: "Decidir qué cuenta como robot, y luego representar y diseñar un robot que haga un trabajo útil.",
      estimatedTime: "60 a 75 minutos",
      learningGoals: [
        {
          text: "Explicar qué hace que algo sea un robot y no una simple máquina",
        },
        {
          text: "Describir el ciclo de entrada, procesamiento y salida en un aparato real",
        },
        {
          text: "Explicar el papel del controlador como el cerebro del robot",
        },
        {
          text: "Identificar los sensores y los actuadores de un robot",
        },
        {
          text: "Distinguir entre sistemas autónomos y sistemas por control remoto",
        },
        {
          text: "Diseñar un sistema robótico para una tarea útil",
        },
        {
          text: "Bosquejar un robot útil y rotular sus entradas, su procesamiento y sus salidas",
        },
      ],
      vocabulary: [
        {
          term: "Robot",
          definition: "Una máquina que puede percibir su entorno, decidir qué hacer y actuar por su cuenta siguiendo un programa.",
        },
        {
          term: "Máquina",
          definition: "Una herramienta que hace un trabajo, como una bicicleta o una engrapadora. Una máquina solo es un robot si puede percibir y decidir por sí sola.",
        },
        {
          term: "Entrada",
          definition: "Información que el robot recibe del mundo, casi siempre a través de un sensor.",
        },
        {
          term: "Procesamiento",
          definition: "El paso de \"pensar\", en el que el controlador usa las entradas para decidir qué hacer.",
        },
        {
          term: "Salida",
          definition: "La acción que realiza el robot, como mover una rueda o encender una luz.",
        },
        {
          term: "Controlador",
          definition: "El \"cerebro\" del robot: la pequeña computadora que ejecuta el programa y toma las decisiones.",
        },
        {
          term: "Sensor",
          definition: "Una pieza que mide algo del mundo, como la distancia, la luz o el contacto.",
        },
        {
          term: "Actuador",
          definition: "Una pieza que hace que algo se mueva o suceda, como un motor, una rueda o un zumbador.",
        },
        {
          term: "Programa",
          definition: "Un conjunto de instrucciones que el controlador sigue para hacer un trabajo siempre de la misma manera.",
        },
        {
          term: "Autónomo",
          definition: "Que actúa por su cuenta, usando sensores y un programa, sin que una persona lo maneje.",
        },
        {
          term: "Por control remoto",
          definition: "Manejado por una persona en tiempo real, por ejemplo con una palanca de mando o una aplicación.",
        },
      ],
      concepts: [
        {
          title: "Qué es de verdad un robot",
          body: [
            "La gente le llama robot a todo tipo de cosas, pero un robot de verdad tiene tres capacidades: puede percibir el mundo, decidir qué hacer y actuar, y puede hacerlo por su cuenta siguiendo un programa.",
            "Un cochecito de juguete que empujas no es un robot. Un carro que se da cuenta de que tiene una pared enfrente y se detiene solo se acerca más, porque percibe y decide.",
          ],
          examples: [
            "Una aspiradora robot",
            "Una caja de autocobro que escanea los productos",
            "Una puerta automática que detecta que te acercas",
          ],
        },
        {
          title: "Máquinas frente a robots",
          body: [
            "Todo robot es una máquina, pero no toda máquina es un robot. Una engrapadora y una bicicleta son máquinas: hacen un trabajo, pero es una persona la que toma todas las decisiones.",
            "La línea divisoria está en percibir y decidir. Si el aparato puede recibir información y cambiar lo que hace por causa de ella, está actuando como un robot.",
          ],
          examples: [
            "Bicicleta = máquina",
            "Aspiradora robot = robot",
            "Tostadora sin sensor = máquina",
            "Tostadora que detecta cuándo está listo el pan = parecida a un robot",
          ],
        },
        {
          title: "Entradas, procesamiento y salidas",
          body: [
            "Los robots trabajan en ciclo: entrada, luego procesamiento, luego salida. Primero un sensor da una entrada (por ejemplo, \"la pared está cerca\"). Luego el controlador hace el procesamiento (decide \"debo detenerme\"). Después un actuador produce la salida (las ruedas se detienen).",
            "Este ciclo se repite una y otra vez, muchas veces por segundo, y así es como el robot sigue reaccionando a un mundo que cambia.",
          ],
        },
        {
          title: "Las tres partes principales: controlador, sensores y actuadores",
          body: [
            "Un robot tiene un controlador (su cerebro), uno o varios sensores (con los que percibe) y uno o varios actuadores (con los que actúa).",
            "El controlador ejecuta el programa. Los sensores le mandan las entradas. Los actuadores llevan a cabo sus salidas. Quítale los sensores y no podrá percibir; quítale el controlador y no podrá decidir.",
          ],
          examples: [
            "Controlador: la tarjeta con la computadora pequeña",
            "Sensores: de distancia, de luz, de contacto, de color",
            "Actuadores: motores, ruedas, pinzas, zumbadores, luces",
          ],
        },
        {
          title: "Un programa lo vuelve repetible",
          body: [
            "Un programa es la lista de instrucciones que sigue el controlador. Como el robot sigue un programa, puede hacer el mismo trabajo una y otra vez sin que una persona lo guíe paso a paso.",
            "Cambia el programa y el robot se comportará distinto, aunque tenga el mismo cuerpo y los mismos sensores. Por eso la robótica tiene tanto que ver con las instrucciones como con la construcción.",
          ],
        },
        {
          title: "Autónomo frente a control remoto",
          body: [
            "Un sistema autónomo ejecuta su propio programa y usa sus sensores para decidir, sin que nadie lo maneje. Un sistema por control remoto hace exactamente lo que una persona le indica, momento a momento.",
            "Un dron que se vuela con un mando va por control remoto. Una aspiradora robot que limpia un cuarto sola es autónoma. Muchos robots reales pueden funcionar de las dos maneras en distintos momentos.",
          ],
          examples: [
            "Autónomos: la aspiradora robot, un vehículo explorador de Marte haciendo un recorrido planeado",
            "Por control remoto: un carrito a control remoto, un dron con palanca de mando",
          ],
        },
        {
          title: "Robots y máquinas por todos lados",
          body: [
            "Aplícale la prueba de percibir, decidir y actuar a las cosas que ves todos los días. Algunas son robots de verdad, otras son solo máquinas y otras están a medio camino.",
            "Una puerta corrediza automática te detecta y se abre: decide. Un vehículo explorador de Marte, un brazo robótico programado y una bocina que se controla con la voz perciben, deciden y actúan, así que son robots. Un carrito a control remoto solo hace lo que una persona le dice. Una tostadora sencilla y un juguete de cuerda ni perciben ni deciden nada. Una lavadora está a medio camino: detecta el agua y sigue un programa, pero solo repite ciclos fijos.",
          ],
          examples: [
            "Robots: puerta corrediza automática, vehículo explorador de Marte, brazo robótico, bocina controlada por voz",
            "Solo máquinas: carrito a control remoto, tostadora sencilla, juguete de cuerda",
            "A medio camino: lavadora",
          ],
        },
      ],
      materials: [
        {
          name: "Tres o cuatro aparatos de todos los días para investigar (juguete, teléfono, linterna, aspiradora robot, etc.)",
        },
        {
          name: "Hoja de trabajo Mapa del sistema robótico (imprimible)",
        },
        {
          name: "Lápiz y papel para bosquejar",
        },
        {
          name: "Un kit de robótica programable, si hay uno disponible",
        },
        {
          name: "Computadora o tableta con un navegador",
        },
        {
          name: "Cajas recicladas, marcadores y material de manualidades para armar un modelo de robot",
        },
      ],
      activities: [
        {
          title: "Investigación: ¿robot o no?",
          goal: "Clasificar aparatos reales como robot, máquina o intermedio, y defender cada elección con la prueba de percibir, decidir y actuar.",
          shared: [
            "Observa cada aparato y hazte tres preguntas: ¿puede percibir algo?, ¿puede decidir por su cuenta?, ¿puede actuar? Un robot de verdad puede hacer las tres cosas solo.",
            "Coloca cada aparato en una línea que va de \"solo una máquina\" a \"robot completo\" y escribe una razón que explique dónde lo pusiste.",
          ],
          variants: {
            kit: {
              title: "Investiga el robot de tu kit y otros tres aparatos",
              materials: [
                "Un kit de robótica programable",
                "Tres aparatos de todos los días",
              ],
              instructions: [
                "Enciende el robot del kit y déjalo ejecutar un comportamiento sencillo de los que ya trae. Observa qué percibe y qué hace.",
                "Compáralo con una linterna, un juguete de cuerda y un teléfono. Para cada uno decide si percibe, decide y actúa: sí o no.",
                "Coloca los cuatro aparatos en la línea de máquina a robot y da una razón para cada uno.",
              ],
              safetyNotes: [
                "Mantén los dedos lejos de las ruedas y los engranes mientras el robot esté en marcha.",
              ],
              expectedResult: "El robot del kit queda cerca del extremo de \"robot\" porque percibe, decide y actúa; la linterna y el juguete de cuerda quedan cerca de \"máquina\".",
              successCriteria: [
                "Cada aparato tiene una respuesta de percibir, decidir y actuar",
                "Cada ubicación tiene una razón escrita",
              ],
              troubleshooting: [
                {
                  problem: "El robot solo avanza en línea recta y nunca reacciona",
                  fix: "Carga un comportamiento que use un sensor (por ejemplo, detenerse ante una pared) para que los estudiantes lo vean decidir.",
                },
              ],
              extension: "Busca en tu casa un aparato difícil de clasificar y explica por qué queda a medio camino.",
            },
            simulator: {
              title: "Compara los robots del simulador con aparatos reales",
              materials: [
                "Simulador en el navegador",
                "Tres aparatos de todos los días",
              ],
              instructions: [
                "Abre el simulador y pon a andar un robot que reaccione ante una pared. Fíjate en la entrada (pared detectada) y en la salida (detenerse).",
                "Compáralo con una linterna, un juguete de cuerda y un teléfono usando percibir, decidir y actuar.",
                "Coloca los cuatro en la línea de máquina a robot y da tus razones.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; toma un descanso de la pantalla si lo necesitas.",
              ],
              expectedResult: "Los estudiantes ven al robot del simulador reaccionar ante una entrada y lo ubican cerca del extremo de robot.",
              successCriteria: [
                "Cada aparato tiene una respuesta de percibir, decidir y actuar",
                "Cada ubicación tiene una razón escrita",
              ],
              troubleshooting: [
                {
                  problem: "No queda claro qué está percibiendo el robot del simulador",
                  fix: "Señala la lectura del sensor en el simulador y relaciónala con la acción del robot.",
                },
              ],
              extension: "Predice cómo se comportaría el robot del simulador con el sensor apagado y luego pruébalo.",
            },
            unplugged: {
              title: "Clasifica aparatos de casa con la prueba del robot",
              materials: [
                "Cuatro aparatos de todos los días (o tarjetas con dibujos)",
                "Hoja de trabajo Mapa del sistema robótico",
              ],
              instructions: [
                "Reúne cuatro aparatos, por ejemplo una linterna, un juguete de cuerda, un dispensador automático de jabón y un teléfono.",
                "Para cada uno decide si percibe, decide y actúa (sí o no), y actúalo con un compañero si tienes dudas.",
                "Colócalos en la línea de máquina a robot y escribe una razón para cada uno.",
              ],
              safetyNotes: [
                "Usa solo objetos seguros y de uso diario; no abras aparatos electrónicos.",
              ],
              expectedResult: "El dispensador de jabón y el teléfono quedan más cerca de robot; la linterna y el juguete de cuerda quedan más cerca de máquina.",
              successCriteria: [
                "Cada aparato tiene una respuesta de percibir, decidir y actuar",
                "Cada ubicación tiene una razón escrita",
              ],
              troubleshooting: [
                {
                  problem: "Todo parece ser \"solo una máquina\"",
                  fix: "Pregunta cuál de los aparatos cambia lo que hace sin que intervenga una persona: esa es la pista de que percibe y decide.",
                },
              ],
              extension: "Agrega un quinto aparato misterioso que sea difícil de ubicar y debátanlo en grupo.",
            },
          },
        },
        {
          title: "Mapa del sistema robótico",
          goal: "Representar un aparato real como sistema robótico: rotular sus entradas, su procesamiento, sus salidas, su controlador, sus sensores y sus actuadores.",
          shared: [
            "Elige un aparato que perciba y decida. En la hoja del mapa, dibuja flechas para el ciclo de entrada, procesamiento y salida.",
            "Luego rotula las tres partes: cuál pieza es el controlador, cuáles son los sensores y cuáles son los actuadores.",
          ],
          variants: {
            kit: {
              title: "Traza el mapa del robot de tu kit",
              materials: [
                "El robot del kit",
                "Hoja de trabajo Mapa del sistema robótico",
              ],
              instructions: [
                "Localiza el controlador (la tarjeta principal), los sensores y los actuadores (los motores) en el robot del kit.",
                "Completa el ciclo de entrada, procesamiento y salida para un comportamiento, por ejemplo \"detenerse antes de una pared\".",
                "Rotula cada pieza real en tu mapa.",
              ],
              safetyNotes: [
                "Maneja el robot con cuidado; no jales los cables.",
              ],
              expectedResult: "Un mapa terminado que muestra entrada (lectura del sensor) -> procesamiento (el controlador decide) -> salida (el motor actúa), con las piezas reales rotuladas.",
              successCriteria: [
                "La entrada, el procesamiento y la salida están completos",
                "El controlador, el sensor y el actuador están rotulados",
              ],
              troubleshooting: [
                {
                  problem: "No se distingue el sensor del actuador",
                  fix: "Un sensor mide; un actuador mueve. Pregunta cuál de las dos piezas provoca el movimiento.",
                },
              ],
            },
            simulator: {
              title: "Traza el mapa de un robot del simulador",
              materials: [
                "Simulador en el navegador",
                "Hoja de trabajo Mapa del sistema robótico",
              ],
              instructions: [
                "En el simulador, identifica la lectura del sensor (la entrada) y los bloques de movimiento (la salida).",
                "Describe el procesamiento: ¿qué regla convierte la entrada en la salida?",
                "Completa el ciclo en el mapa y rotula el controlador, el sensor y el actuador.",
              ],
              safetyNotes: [
                "No hay riesgos físicos.",
              ],
              expectedResult: "Un mapa completo del robot del simulador con un ciclo claro de entrada, procesamiento y salida.",
              successCriteria: [
                "La entrada, el procesamiento y la salida están completos",
                "El controlador, el sensor y el actuador están rotulados",
              ],
              troubleshooting: [
                {
                  problem: "La casilla de procesamiento quedó en blanco",
                  fix: "Escribe la regla así: \"si el sensor dice X, entonces haz Y\".",
                },
              ],
            },
            unplugged: {
              title: "Traza el mapa de un aparato automático de tu casa",
              materials: [
                "Un aparato como una puerta automática, un dispensador de jabón o una aspiradora robot (o un dibujo de alguno)",
                "Hoja de trabajo Mapa del sistema robótico",
              ],
              instructions: [
                "Elige un aparato automático que hayas visto funcionar.",
                "Averigua qué percibe (la entrada), cómo parece decidir (el procesamiento) y qué hace (la salida).",
                "Completa el ciclo y rotula dónde estarían el controlador, el sensor y el actuador.",
              ],
              safetyNotes: [
                "No desarmes electrodomésticos de verdad; trabaja a partir de la observación.",
              ],
              expectedResult: "Un mapa completo de un aparato automático real con el ciclo y las tres partes rotuladas.",
              successCriteria: [
                "La entrada, el procesamiento y la salida están completos",
                "El controlador, el sensor y el actuador están rotulados",
              ],
              troubleshooting: [
                {
                  problem: "No queda claro cuál es el controlador",
                  fix: "Es el \"cerebro\" escondido que recibe el mensaje del sensor y le ordena al actuador que actúe.",
                },
              ],
            },
          },
        },
        {
          title: "Reto de diseño: Robot Útil",
          goal: "Inventar un robot que haga un trabajo útil y bosquejarlo con sus entradas, su procesamiento y sus salidas rotulados.",
          shared: [
            "Piensa en un problema pequeño y real de tu casa o tu escuela con el que un robot podría ayudar.",
            "Bosqueja tu robot y rotula al menos un sensor (entrada), la decisión que toma (procesamiento) y al menos un actuador (salida).",
          ],
          variants: {
            kit: {
              title: "Diseña un ayudante inspirándote en tu kit",
              materials: [
                "El robot del kit como referencia",
                "Lápiz y papel",
              ],
              instructions: [
                "Fíjate en lo que pueden hacer los sensores y los motores de tu kit para sacar ideas.",
                "Bosqueja un robot útil y rotula su entrada, su procesamiento y su salida.",
                "Escribe una oración sobre el trabajo que hace y a quién ayuda.",
              ],
              safetyNotes: [
                "Esta semana no hay que construir nada; es solo un boceto de diseño.",
              ],
              expectedResult: "Un boceto rotulado de un robot ayudante verosímil con un trabajo bien definido.",
              successCriteria: [
                "Hay al menos un sensor y un actuador rotulados",
                "La decisión del procesamiento está escrita",
                "Se nombra el trabajo y a quién ayuda",
              ],
              troubleshooting: [
                {
                  problem: "El robot no tiene ningún sensor",
                  fix: "Pregunta: ¿cómo sabe cuándo actuar? Ahí es donde va un sensor.",
                },
              ],
              extension: "Haz una lista de los sensores reales de tu kit que le quedarían bien a tu diseño.",
            },
            simulator: {
              title: "Diseña un ayudante que después podrías armar en el simulador",
              materials: [
                "Lápiz y papel",
                "Simulador en el navegador como referencia",
              ],
              instructions: [
                "Bosqueja un robot útil que pudiera trabajar sobre una cuadrícula, como un ayudante de entregas.",
                "Rotula su entrada, su procesamiento y su salida.",
                "Escribe la única regla que sigue, con la forma \"si... entonces...\".",
              ],
              safetyNotes: [
                "No hay riesgos físicos.",
              ],
              expectedResult: "Un boceto rotulado con una regla clara de si-entonces que el simulador podría ejecutar más adelante.",
              successCriteria: [
                "Hay al menos un sensor y un actuador rotulados",
                "La decisión del procesamiento está escrita como si-entonces",
                "Se nombra el trabajo y a quién ayuda",
              ],
              troubleshooting: [
                {
                  problem: "La idea es demasiado grande para dibujarla",
                  fix: "Redúcela a un solo trabajo que el robot haga sobre una cuadrícula pequeña.",
                },
              ],
              extension: "Dibuja el mapa de la cuadrícula sobre la que trabajaría tu ayudante.",
            },
            unplugged: {
              title: "Diseña y arma un robot ayudante de papel",
              materials: [
                "Lápiz y papel",
                "Cajas recicladas y marcadores (opcional)",
              ],
              instructions: [
                "Bosqueja un robot útil para un problema real de tu casa.",
                "Rotula la entrada, el procesamiento y la salida, y nombra el sensor y el actuador.",
                "Si tienes materiales, arma un modelo rápido con una caja para mostrar las partes.",
              ],
              safetyNotes: [
                "Si vas a armar un modelo, usa tijeras seguras para niños y hazlo con un adulto.",
              ],
              expectedResult: "Un boceto rotulado (y un modelo opcional) de un robot ayudante con un trabajo bien definido.",
              successCriteria: [
                "Hay al menos un sensor y un actuador rotulados",
                "La decisión del procesamiento está escrita",
                "Se nombra el trabajo y a quién ayuda",
              ],
              troubleshooting: [
                {
                  problem: "El modelo no tiene ninguna parte que se mueva",
                  fix: "Agrégale una tapa, una rueda o un brazo que haga las veces de actuador.",
                },
              ],
              extension: "Ponle un nombre a tu modelo y escríbele un \"manual de uso\" de una sola oración.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de la investigación: ¿cuál de tus aparatos crees que es \"el más robot\", y por qué?",
          howToCheck: "Compara tu predicción con el lugar donde el grupo lo colocó en la línea de máquina a robot después de aplicar la prueba de percibir, decidir y actuar.",
        },
      ],
      knowledgeCheck: {
        instructions: "Responde estas preguntas para comprobar que puedes distinguir un robot de una máquina y nombrar sus partes.",
        questions: [
          {
            prompt: "Decide qué tipo de sistema es este.",
            scenario: "Un carrito de juguete avanza cuando aprietas un botón en un mando y da vuelta cuando mueves una palanca. Nunca cambia lo que hace por su cuenta.",
            options: [
              {
                text: "Un robot autónomo",
                feedback: "Nunca decide nada por su cuenta, así que no es autónomo.",
              },
              {
                text: "Una máquina por control remoto",
                feedback: "Correcto: una persona toma todas las decisiones con el mando, así que va por control remoto.",
              },
              {
                text: "No es una máquina en absoluto",
                feedback: "Sí es una máquina; hace un trabajo cuando una persona la controla.",
              },
              {
                text: "Una máquina con sensor de distancia",
                feedback: "Nada en la situación mide distancias; quien percibe es la persona.",
              },
            ],
            explanation: "Una persona decide cada movimiento con el mando, así que va por control remoto y no es un robot autónomo.",
          },
          {
            prompt: "¿Cuáles de estos son actuadores? Selecciona todos los que correspondan.",
            options: [
              {
                text: "Un motor que hace girar una rueda",
                feedback: "Sí: un motor hace que algo se mueva, así que es un actuador.",
              },
              {
                text: "Un sensor de distancia",
                feedback: "Ese es un sensor: mide, no actúa.",
              },
              {
                text: "Un zumbador que hace un sonido",
                feedback: "Sí: un zumbador actúa sobre el mundo, así que es un actuador.",
              },
              {
                text: "Una luz que el robot enciende",
                feedback: "Sí: una luz es una salida que el robot puede encender, así que es un actuador.",
              },
            ],
            explanation: "Los actuadores son las piezas que actúan: motores, zumbadores y luces. Un sensor solo mide, así que no es un actuador.",
          },
          {
            prompt: "¿Qué hace que algo sea un robot y no solo una máquina?",
            options: [
              {
                text: "Que esté hecho de metal",
                feedback: "El material no importa: muchos robots son de plástico y muchas cosas de metal no son robots.",
              },
              {
                text: "Que pueda percibir, decidir y actuar por su cuenta",
                feedback: "Correcto: percibir, decidir y actuar por sí mismo es la prueba del robot.",
              },
              {
                text: "Que tenga un interruptor de encendido y apagado",
                feedback: "Muchas máquinas comunes tienen interruptores y no pueden decidir nada.",
              },
              {
                text: "Que sea caro",
                feedback: "El precio no tiene nada que ver con que algo sea un robot.",
              },
            ],
            explanation: "Un robot percibe el mundo, decide qué hacer y actúa, y hace todo eso por su cuenta siguiendo un programa.",
          },
          {
            prompt: "En el ciclo de entrada, procesamiento y salida, ¿cuál es el paso de \"procesamiento\"?",
            options: [
              {
                text: "El robot mide el mundo con un sensor",
                feedback: "Ese es el paso de la entrada.",
              },
              {
                text: "El robot mueve una rueda o enciende una luz",
                feedback: "Ese es el paso de la salida.",
              },
              {
                text: "El controlador decide qué hacer con la entrada",
                feedback: "Correcto: el procesamiento es el paso en el que el controlador decide.",
              },
              {
                text: "El robot carga su batería",
                feedback: "Cargarse no forma parte del ciclo de percibir, decidir y actuar.",
              },
            ],
            explanation: "El procesamiento es el paso de \"pensar\": el controlador toma la entrada y decide qué salida producir.",
          },
          {
            prompt: "¿Cuál parte de un robot es el actuador?",
            options: [
              {
                text: "El motor que hace girar la rueda",
                feedback: "Sí: un actuador hace que algo se mueva o suceda.",
              },
              {
                text: "El sensor de distancia",
                feedback: "Ese es un sensor: mide, no actúa.",
              },
              {
                text: "La tarjeta del controlador",
                feedback: "El controlador decide; no es la parte que actúa.",
              },
              {
                text: "La batería",
                feedback: "La batería da energía, pero no es la parte que actúa.",
              },
            ],
            explanation: "Los actuadores son las piezas que actúan: motores, ruedas, pinzas, zumbadores y luces.",
          },
          {
            prompt: "Una aspiradora robot limpia un cuarto sola, sin que nadie la maneje. Este es un ejemplo de un sistema:",
            options: [
              {
                text: "Por control remoto",
                feedback: "Por control remoto significa que una persona lo maneja en tiempo real.",
              },
              {
                text: "Autónomo",
                feedback: "Correcto: ejecuta su propio programa y usa sensores para decidir.",
              },
              {
                text: "Que no es un robot",
                feedback: "Percibe, decide y actúa, así que sí es un robot.",
              },
              {
                text: "Descompuesto",
                feedback: "Funcionar por su cuenta es exactamente lo que debe hacer un robot autónomo.",
              },
            ],
            explanation: "Los sistemas autónomos usan su propio programa y sus sensores para decidir, sin que nadie los maneje.",
          },
          {
            prompt: "¿Por qué un robot necesita un programa?",
            options: [
              {
                text: "Para verse más moderno",
                feedback: "Un programa tiene que ver con el comportamiento, no con la apariencia.",
              },
              {
                text: "Para poder hacer un trabajo siempre igual y por su cuenta, una y otra vez",
                feedback: "Correcto: el programa son las instrucciones que le permiten repetir un trabajo sin una persona.",
              },
              {
                text: "Para poder pesar más",
                feedback: "Un programa no tiene nada que ver con el peso.",
              },
              {
                text: "Para no necesitar sensores",
                feedback: "Los programas suelen usar sensores; no los reemplazan.",
              },
            ],
            explanation: "Un programa es la lista de instrucciones que sigue el controlador para que el robot pueda repetir un trabajo por sí solo.",
          },
        ],
      },
      reflection: [
        {
          prompt: "¿Qué trabajo le confiarías a un robot? ¿Qué trabajo debería seguir haciendo una persona? Explica tu respuesta.",
        },
        {
          prompt: "Piensa en un robot que hayas visto. ¿Qué percibe, qué decide y qué hace?",
        },
        {
          prompt: "¿Qué trabajo te gustaría más que hiciera por ti un robot útil, y qué sensor necesitaría?",
        },
      ],
      journalPrompts: [
        {
          prompt: "Bosqueja tu Robot Útil y rotula su entrada, su procesamiento y su salida.",
        },
        {
          prompt: "Escribe una oración sobre el trabajo que hace tu robot y a quién ayuda.",
        },
      ],
      simulatorMissions: [
        {
          title: "Observa a un robot reaccionar",
          objective: "Ejecuta el robot de ejemplo y observa cómo se detiene cuando su sensor detecta una pared.",
          successCriteria: [
            "El robot se detiene antes de la pared",
            "El estudiante puede nombrar la entrada y la salida",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Qué hace que un robot sea un robot",
          focus: "Percibir, decidir, actuar y el ciclo de entrada, procesamiento y salida.",
        },
        {
          title: "Investigación: ¿robot o no?",
          focus: "Clasificar aparatos reales con la prueba de percibir, decidir y actuar.",
        },
        {
          title: "Mapa del sistema robótico",
          focus: "Trazar la entrada, el procesamiento, la salida y las partes de un aparato.",
        },
        {
          title: "Reto de diseño: Robot Útil",
          focus: "Bosquejar un robot ayudante con las partes rotuladas.",
        },
        {
          title: "Comprobación de conocimientos",
          focus: "Cinco preguntas sobre los robots, sus partes y el ciclo.",
        },
        {
          title: "Reflexión",
          focus: "Escribir sobre máquinas y robots y sobre un ayudante que te gustaría tener.",
        },
      ],
      safetyNotes: [
        {
          text: "Mantén los dedos, el cabello y la ropa suelta lejos de las ruedas y los engranes en movimiento de los robots del kit.",
        },
        {
          text: "No abras ni desarmes electrodomésticos de verdad; investígalos observando cómo funcionan.",
        },
        {
          text: "Toma un descanso corto de la pantalla si te cansan los ojos al usar el simulador.",
        },
      ],
      printableResources: [
        {
          title: "Mapa del sistema robótico",
          description: "Una hoja de una página para trazar la entrada, el procesamiento, la salida, el controlador, los sensores y los actuadores de un aparato.",
        },
        {
          title: "Página de diseño del Robot Útil",
          description: "Espacio para bosquejar y rotular las entradas, el procesamiento y las salidas de un robot ayudante.",
        },
        {
          title: "Guía docente de la semana 1",
          description: "Preparación, conducción de la clase, ideas equivocadas frecuentes y preguntas para la lección de robot o no.",
        },
      ],
      completion: {
        summary: "Termina la semana 1 trazando el mapa de un aparato como sistema robótico, bosquejando un robot útil y aprobando la comprobación de conocimientos.",
        requirements: [
          {
            label: "Completar el Mapa del sistema robótico de un aparato",
          },
          {
            label: "Bosquejar y rotular un Robot Útil",
          },
          {
            label: "Obtener al menos 4 de 5 en la comprobación de conocimientos",
          },
          {
            label: "Escribir tu reflexión",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Reúne tres o cuatro aparatos de uso diario que vayan desde lo claramente-una-máquina hasta lo claramente-un-robot.",
          "Imprime la hoja de trabajo Mapa del sistema robótico, una por estudiante o por pareja.",
          "Si usas kits, cárgalos y déjales precargado un comportamiento sencillo con sensor; si usas el simulador, ábrelo en cada dispositivo.",
        ],
        prep: [
          "Haz tú mismo la clasificación de robot o no para poder orientar los casos dudosos.",
          "Ten a la mano el ejemplo de una aspiradora robot o de una puerta automática como sistema autónomo conocido.",
        ],
        facilitation: [
          "Empieza con la prueba de percibir, decidir y actuar y con el ciclo de entrada, procesamiento y salida, antes de sacar ningún aparato.",
          "Haz la investigación de robot o no, insistiendo en que los estudiantes justifiquen cada ubicación.",
          "Modela un Mapa del sistema robótico entre todos y luego deja que las parejas tracen el de un segundo aparato.",
          "Cierra con el boceto del Robot Útil y la comprobación de conocimientos.",
        ],
        commonMisconceptions: [
          "\"Todo lo electrónico es un robot\": una linterna es electrónica, pero no puede decidir.",
          "\"Si se mueve, es un robot\": un juguete de cuerda se mueve, pero no percibe ni decide.",
          "Confundir sensor con actuador: uno mide y el otro actúa.",
        ],
        questionsToAsk: [
          "¿Cómo sabe este aparato cuándo tiene que actuar?",
          "¿Qué pasaría si le quitáramos el sensor?",
          "¿Aquí decide una persona o decide el aparato?",
        ],
        easierVersion: "Usa tarjetas con dibujos de aparatos y clasifíquenlas en grupo, en lugar de trazar el ciclo completo.",
        harderVersion: "Pide a los estudiantes que tracen el mapa de un aparato que pueda ser autónomo y por control remoto, y que expliquen cuándo es cada cosa.",
      },
      nextWeek: {
        teaser: "La próxima semana dejamos de hablar de robots y empezamos a construir uno que de verdad se mueva.",
        prepare: [
          "Guarda un par de cajas de cartón resistentes y algunas tapas de botella si vas por la ruta sin dispositivos.",
          "Carga tu kit o guarda el simulador en tus marcadores.",
          "Piensa en qué hace que algo con ruedas se voltee o se mantenga firme.",
        ],
      },
    },
    {
      title: "Construir un robot que se mueva",
      subtitle: "Convierte el giro de un motor en un rodar parejo y diseña un chasis que avance sin voltearse.",
      summary: "Ahora que los estudiantes saben qué es un robot, construyen uno que de verdad se mueve. Aprenden cómo un motor hace girar un eje, cómo las ruedas y los engranes convierten ese giro en movimiento, y cómo los engranes cambian velocidad por fuerza de giro (par motor). Investigan por qué algunas bases con ruedas se voltean y otras se mantienen firmes (la fricción y la tracción dan agarre, y un centro de masa bajo y ancho da estabilidad) y conocen la tracción diferencial, en la que mover las dos ruedas a distinta velocidad es lo que dirige al robot. Después, cada estudiante construye y prueba su propia base rodante.",
      mainMission: "Construir una base rodante estable y probar cómo cambian su movimiento las ruedas, los engranes y el chasis que elijas.",
      estimatedTime: "65 a 80 minutos",
      learningGoals: [
        {
          text: "Explicar cómo el motor, el eje y las ruedas convierten el giro en rodadura",
        },
        {
          text: "Identificar las ruedas, los ejes y los engranes de una base rodante",
        },
        {
          text: "Comparar velocidad y par motor, y cómo los engranes cambian uno por el otro",
        },
        {
          text: "Usar la fricción y la tracción para explicar por qué las ruedas agarran o patinan",
        },
        {
          text: "Reconocer diseños de chasis estables e inestables",
        },
        {
          text: "Explicar cómo la separación entre las ruedas y el centro de masa afectan el equilibrio",
        },
        {
          text: "Construir o simular una base rodante y dirigirla con tracción diferencial",
        },
        {
          text: "Probar un diseño y mejorarlo a partir de los resultados",
        },
      ],
      vocabulary: [
        {
          term: "Motor",
          definition: "Una pieza que gira cuando recibe energía y le da al robot el movimiento que necesita para rodar.",
        },
        {
          term: "Eje",
          definition: "Una varilla a la que se sujeta una rueda, de modo que cuando el eje gira, la rueda gira con él.",
        },
        {
          term: "Rueda",
          definition: "Una pieza redonda que hace rodar al robot por el suelo cuando su eje gira.",
        },
        {
          term: "Engrane",
          definition: "Una rueda dentada que se traba con otra para transmitir el giro y cambiar su velocidad o su fuerza.",
        },
        {
          term: "Velocidad",
          definition: "Qué tan rápido se mueve el robot. Un engrane pequeño que mueve uno grande hace que las ruedas giren más despacio.",
        },
        {
          term: "Par motor",
          definition: "La fuerza de giro que tiene un motor o un engrane. Más par motor significa más fuerza para mover un robot pesado o para subir.",
        },
        {
          term: "Fricción",
          definition: "La fuerza de roce entre dos superficies que se tocan. Frena el deslizamiento y hace que las ruedas agarren en lugar de girar en el mismo sitio.",
        },
        {
          term: "Tracción",
          definition: "Qué tan bien agarra una rueda al suelo. Con buena tracción, la rueda empuja al robot hacia adelante en lugar de patinar.",
        },
        {
          term: "Equilibrio",
          definition: "Repartir el peso del robot para que se mantenga derecho y no se voltee.",
        },
        {
          term: "Estabilidad",
          definition: "Qué tan difícil es voltear un robot. Una base baja y ancha es más estable que una alta y angosta.",
        },
        {
          term: "Centro de masa",
          definition: "El punto promedio donde se concentra el peso del robot. Cuanto más bajo esté el centro de masa, más difícil es voltearlo.",
        },
        {
          term: "Chasis",
          definition: "El armazón o la base del robot que mantiene unidos los motores, las ruedas y todo lo demás.",
        },
        {
          term: "Tracción diferencial",
          definition: "Una forma de dirigir moviendo las dos ruedas laterales a distinta velocidad: el robot gira hacia el lado de la rueda más lenta.",
        },
      ],
      prerequisites: [
        {
          reason: "En la semana 1 se nombraron los motores y las ruedas como actuadores; la semana 2 muestra cómo esos actuadores mueven realmente al robot, así que los estudiantes necesitan antes la idea de percibir, decidir y actuar.",
        },
      ],
      concepts: [
        {
          title: "Del motor que gira al robot que rueda",
          body: [
            "Un motor gira cuando recibe energía, pero un motor girando por sí solo no va a ninguna parte. Para moverse, el robot conecta el motor a un eje, y el eje sostiene las ruedas. Cuando el motor hace girar el eje, las ruedas giran y el robot rueda.",
            "Así que la cadena es: el motor gira, el eje da vueltas, las ruedas ruedan. Si algún eslabón de esa cadena está flojo o falta, el giro nunca llega al suelo y el robot se queda quieto.",
          ],
          examples: [
            "Un motor que hace girar un eje pelado, sin rueda, solo gira en el aire",
            "Una rueda encajada en un eje que gira hace avanzar al robot",
          ],
        },
        {
          title: "Los engranes cambian velocidad por par motor",
          body: [
            "Los engranes son ruedas dentadas que se traban entre sí para que una haga girar a la otra. Cuando un engrane pequeño mueve uno grande, el grande gira más despacio pero con más fuerza de giro. Cuando uno grande mueve uno pequeño, el pequeño gira más rápido pero con menos fuerza.",
            "Esa fuerza de giro se llama par motor. Los engranes te dejan elegir: un robot lento y fuerte que puede subir o empujar, o uno rápido y más débil que se desliza veloz por un piso plano. No puedes tener la máxima velocidad y el máximo par motor al mismo tiempo: cambias uno por el otro.",
          ],
          examples: [
            "Una bicicleta en marcha baja: lenta, pero fácil de pedalear cuesta arriba (mucho par motor)",
            "Una bicicleta en marcha alta: rápida en plano, pero difícil de arrancar (poco par motor)",
          ],
        },
        {
          title: "Fricción y tracción: cómo agarran las ruedas",
          body: [
            "La fricción es la fuerza de roce entre dos superficies que se tocan. Sin fricción, una rueda girando solo patinaría en el mismo sitio y el robot no iría a ninguna parte, como unas llantas sobre hielo.",
            "La tracción es qué tan bien agarra una rueda al suelo, y viene de la fricción. Una llanta de hule sobre una alfombra tiene mucha tracción; una rueda lisa de plástico sobre un piso resbaloso tiene muy poca. Con buena tracción, el giro de la rueda se convierte en avance de verdad.",
          ],
          examples: [
            "Las llantas de hule agarran el camino (mucha tracción)",
            "Una rueda que gira sobre una superficie mojada o lisa (poca tracción)",
            "Ponerle una liga alrededor a una rueda resbalosa para que agarre mejor",
          ],
        },
        {
          title: "Equilibrio, estabilidad y centro de masa",
          body: [
            "El centro de masa es el punto promedio donde se concentra el peso del robot. Un robot se voltea cuando su centro de masa se inclina más allá de sus ruedas.",
            "Para que un robot sea más estable, mantén su centro de masa bajo y su base ancha. Una base baja y ancha es difícil de voltear; una alta, angosta y pesada por arriba se voltea fácil. Por eso los autos de carreras son bajos y anchos, y por eso una torre de bloques se cae cuando se hace demasiado alta.",
          ],
          examples: [
            "Una base baja y ancha se mantiene derecha al dar vuelta",
            "Una torre alta de piezas se voltea cuando el robot frena de golpe",
            "Poner la batería pesada abajo en el chasis para bajar el centro de masa",
          ],
        },
        {
          title: "Diseño del chasis: el armazón del robot",
          body: [
            "El chasis es el armazón que mantiene unidos los motores, los ejes, las ruedas y la batería. Un buen chasis mantiene las ruedas bien alineadas, sujeta los motores con firmeza y coloca las piezas pesadas abajo.",
            "Las decisiones de diseño importan: unas ruedas demasiado separadas o demasiado juntas, un motor flojo o un armazón que se bambolea cambian la forma en que se mueve el robot. El chasis no es solo una caja: decide si el robot rueda derecho, gira limpiamente y se mantiene en pie.",
          ],
          examples: [
            "Ruedas bien alineadas para que el robot ruede en línea recta",
            "Un armazón firme para que el motor no se bambolee",
            "El peso abajo y centrado sobre las ruedas",
          ],
        },
        {
          title: "Tracción diferencial: dirigir con la velocidad",
          body: [
            "La mayoría de los robots pequeños se dirigen con tracción diferencial: dos ruedas, una de cada lado, y cada una movida por su propio motor. Cuando las dos ruedas giran a la misma velocidad, el robot avanza derecho.",
            "Para girar, haces que las ruedas vayan a distinta velocidad. El robot se curva hacia el lado de la rueda más lenta. Si una rueda va hacia adelante y la otra hacia atrás, el robot gira sobre su propio eje. No hay volante: la diferencia de velocidad entre las ruedas es la dirección.",
          ],
          examples: [
            "Las dos ruedas a la misma velocidad: derecho hacia adelante",
            "La rueda izquierda más lenta que la derecha: el robot se curva a la izquierda",
            "La rueda izquierda hacia adelante y la derecha hacia atrás: el robot gira sobre su propio eje",
          ],
        },
      ],
      materials: [
        {
          name: "Hoja de trabajo Bitácora de pruebas del chasis (imprimible)",
        },
        {
          name: "Lápiz, papel y una regla o cinta métrica",
        },
        {
          name: "Una rampa corta o una pila de libros para formar una pendiente para la prueba de volcadura",
        },
        {
          name: "Un kit de robótica programable con dos motores, ruedas, ejes y engranes",
        },
        {
          name: "Ruedas y engranes surtidos del kit para intercambiar y comparar",
        },
        {
          name: "Computadora o tableta con el simulador del navegador",
        },
        {
          name: "Cartón para el chasis, además de cinta adhesiva y tijeras",
        },
        {
          name: "Tapas de botella o de frasco para las ruedas, y palitos de brocheta o popotes para los ejes",
        },
        {
          name: "Ligas, monedas o plastilina para agregar agarre y peso",
        },
        {
          name: "Una canica o pelotita para representar cómo se desplaza el centro de masa",
        },
      ],
      activities: [
        {
          title: "Investigación virtual del chasis",
          goal: "Explorar cómo el tamaño de las ruedas, los engranes y la forma de la base cambian el movimiento, el agarre y el equilibrio de una base rodante.",
          shared: [
            "Vas a cambiar una sola cosa a la vez (el tamaño de las ruedas, los engranes, el ancho de la base o el peso) y observar cómo se mueve la base. Cambiar una sola cosa a la vez es la manera de saber qué provocó cada efecto.",
            "Después de cada cambio, anota qué pasó con la velocidad, el agarre y la estabilidad. Escribe qué configuración rodó derecho y rápido, y cuál se mantuvo más firme.",
          ],
          variants: {
            kit: {
              title: "Intercambia ruedas y engranes reales en una base del kit",
              materials: [
                "Un kit de robótica programable con dos motores",
                "Ruedas y engranes surtidos del kit",
                "Hoja de trabajo Bitácora de pruebas del chasis",
              ],
              instructions: [
                "Arma una base sencilla de dos motores y hazla avanzar derecho por el piso a una velocidad fija.",
                "Cambia las ruedas por un par más grande o más pequeño y recorre la misma distancia otra vez. Anota el cambio de velocidad.",
                "Cambia los engranes (o la potencia del motor) para que las ruedas giren más despacio, y siente cuánto más cuesta detener la base: eso es más par motor.",
                "Ponle una pieza alta encima, luego baja el peso, y observa cuál de las dos versiones se voltea más fácil.",
              ],
              safetyNotes: [
                "Mantén los dedos, el cabello y la ropa suelta lejos de los engranes y las ruedas en movimiento.",
                "Apaga el motor antes de cambiar ruedas o engranes.",
              ],
              expectedResult: "Las ruedas más grandes ruedan más rápido pero cuestan más de arrancar; una relación de engranes más baja da más par motor; una base baja y ancha es la más difícil de voltear.",
              successCriteria: [
                "Se probaron y registraron al menos tres configuraciones",
                "Cada cambio describe su efecto en la velocidad, el agarre o la estabilidad",
                "Se señala una configuración como la más estable, con una razón",
              ],
              troubleshooting: [
                {
                  problem: "La base se curva en lugar de ir derecho",
                  fix: "Revisa que las dos ruedas estén bien apretadas y que los motores giren a la misma velocidad; una rueda floja o motores disparejos hacen que se curve.",
                },
                {
                  problem: "Una rueda gira pero la base no se mueve",
                  fix: "La rueda está patinando: hay poca tracción. Prueba con una rueda que agarre mejor o con una superficie más áspera.",
                },
              ],
              extension: "Encuentra la combinación de ruedas y engranes que sube tu rampa sin atascarse.",
            },
            simulator: {
              title: "Prueba distintas opciones de chasis en el simulador",
              materials: [
                "Simulador en el navegador",
                "Hoja de trabajo Bitácora de pruebas del chasis",
              ],
              instructions: [
                "Abre la misión del laboratorio de chasis y recorre la cuadrícula con la base predeterminada, anotando su velocidad.",
                "Cambia el ajuste del tamaño de las ruedas, vuelve a ejecutar y registra cómo cambian la velocidad y el agarre.",
                "Ajusta los engranes hacia más par motor y sube la pendiente del simulador; verás cómo una relación baja sube donde una alta se atasca.",
                "Sube y baja el centro de masa de la base, luego toma una curva rápida y observa con qué ajuste se voltea o se tambalea.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; toma un descanso de la pantalla si te cansan los ojos.",
              ],
              expectedResult: "El simulador muestra que las ruedas grandes van más rápido, que una relación de engranes baja da más par motor para subir, y que un centro de masa bajo se mantiene derecho en las curvas.",
              successCriteria: [
                "Se probaron y registraron al menos tres configuraciones",
                "Cada cambio describe su efecto en la velocidad, el agarre o la estabilidad",
                "Se señala una configuración como la más estable, con una razón",
              ],
              troubleshooting: [
                {
                  problem: "Todas las configuraciones se manejan igual",
                  fix: "Asegúrate de haber cambiado el ajuste y de haber vuelto a ejecutar; cambia un solo ajuste a la vez para que el efecto se note.",
                },
                {
                  problem: "La base siempre se voltea en las curvas",
                  fix: "Baja el centro de masa o ensancha la base, y luego toma la curva un poco más despacio.",
                },
              ],
              extension: "Encuentra el único ajuste que más mejora la subida de la base por la pendiente.",
            },
            unplugged: {
              title: "Compara bases de cartón con ruedas caseras",
              materials: [
                "Cartón para dos bases pequeñas",
                "Tapas de botella y palitos de brocheta o popotes",
                "Ligas, monedas o plastilina (opcional)",
                "Una rampa o una pila de libros",
                "Hoja de trabajo Bitácora de pruebas del chasis",
              ],
              instructions: [
                "Haz una base sencilla de cartón con tapas como ruedas sobre ejes de brocheta y déjala rodar por una rampa suave.",
                "Cámbiale las tapas por unas más grandes, hazla rodar otra vez y anota el cambio en qué tan lejos y qué tan rápido llega.",
                "Enrolla ligas alrededor de las ruedas para darles agarre, luego hazla rodar sobre una superficie lisa y compárala con las tapas peladas: eso es la tracción.",
                "Construye una versión alta y una baja y ancha, e inclina cada una en la rampa para ver cuál se voltea primero.",
              ],
              safetyNotes: [
                "Usa tijeras seguras para niños y hazlo con un adulto para cortar el cartón y los agujeros de los ejes.",
                "Mantén tapadas o sin punta las brochetas.",
              ],
              expectedResult: "Las ruedas más grandes ruedan más lejos, las ruedas con ligas agarran mejor, y la base baja y ancha se voltea en un ángulo más pronunciado que la alta.",
              successCriteria: [
                "Se probaron y registraron al menos tres configuraciones",
                "Cada cambio describe su efecto en la velocidad, el agarre o la estabilidad",
                "Se señala una configuración como la más estable, con una razón",
              ],
              troubleshooting: [
                {
                  problem: "La base rueda chueca",
                  fix: "Alinea los ejes para que queden paralelos y que las ruedas sean del mismo tamaño de cada lado.",
                },
                {
                  problem: "Las ruedas se arrastran en lugar de rodar",
                  fix: "Puede que el eje esté atorado. Haz el agujero un poco más grande para que el eje gire libremente.",
                },
              ],
              extension: "Pon una moneda abajo en la base y luego arriba, y descubre qué colocación la mantiene más firme en la rampa.",
            },
          },
        },
        {
          title: "Reto de la base rodante",
          goal: "Construir una base rodante que avance derecho, se mantenga en pie y pueda dirigirse con tracción diferencial.",
          shared: [
            "Construye una base con dos ruedas motrices, una de cada lado, más un apoyo adelante o atrás para que no se voltee. Mantén las piezas pesadas abajo y las ruedas bien alineadas.",
            "Prueba tres cosas: ¿rueda derecho?, ¿puede dirigirse moviendo las ruedas a distinta velocidad?, ¿se mantiene en pie cuando frena y cuando gira? Corrige una cosa a la vez hasta que las tres funcionen.",
          ],
          variants: {
            kit: {
              title: "Base rodante con kit físico",
              materials: [
                "Un kit de robótica programable con dos motores, ruedas y ejes",
                "Una rampa o libros para la prueba de volcadura",
                "Hoja de trabajo Bitácora de pruebas del chasis",
              ],
              instructions: [
                "Arma un chasis que sujete con firmeza dos motores, cada uno moviendo una rueda lateral, con una rueda loca o una zapata que equilibre el tercer punto de apoyo.",
                "Mantén la batería y las piezas pesadas abajo y centradas para que el centro de masa quede bajo.",
                "Hazla avanzar y ajústala hasta que ruede derecho, y luego mueve las dos ruedas a distinta velocidad para hacerla girar.",
                "Pon a prueba su estabilidad frenando de golpe y avanzando por una pendiente ligera.",
              ],
              safetyNotes: [
                "Mantente lejos de las ruedas y los engranes en movimiento mientras avanza.",
                "Haz las pruebas en un espacio despejado, lejos de bordes y escaleras.",
              ],
              expectedResult: "Una base de kit que rueda derecho, gira por tracción diferencial y se mantiene en pie al frenar y en una pendiente suave.",
              successCriteria: [
                "Rueda derecho durante al menos un metro",
                "Gira a la izquierda y a la derecha cambiando la velocidad de las ruedas",
                "Se mantiene en pie al frenar de golpe",
                "Los motores y las ruedas están bien sujetos",
              ],
              troubleshooting: [
                {
                  problem: "Siempre se desvía hacia un lado",
                  fix: "Puede que un motor sea más rápido o que una rueda esté floja; iguala la velocidad de los motores y aprieta las dos ruedas.",
                },
                {
                  problem: "Se va de frente cuando frena",
                  fix: "El centro de masa está demasiado alto o demasiado adelante; baja el peso y córrelo hacia atrás, sobre las ruedas.",
                },
              ],
              extension: "Prográmala para que recorra una línea recta y luego un cuadrado, usando giros de tracción diferencial.",
            },
            simulator: {
              title: "Reto de chasis en el simulador",
              materials: [
                "Simulador en el navegador",
                "Hoja de trabajo Bitácora de pruebas del chasis",
              ],
              instructions: [
                "Abre la misión de construcción de chasis y arma una base de dos ruedas con tracción diferencial.",
                "Elige el tamaño de las ruedas y un centro de masa bajo para que la base sea estable, y luego recorre la cuadrícula en línea recta.",
                "Hazla girar poniendo velocidades distintas en la rueda izquierda y la derecha, y practica un giro a la izquierda, uno a la derecha y un giro sobre su propio eje.",
                "Toma una curva rápida y sube la pendiente del simulador para comprobar que no se voltea.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; guarda tu trabajo con frecuencia.",
              ],
              expectedResult: "Una base de simulador que avanza derecho, se dirige por tracción diferencial y se mantiene en pie en las curvas y en la pendiente.",
              successCriteria: [
                "Rueda derecho a lo largo de la cuadrícula",
                "Gira a la izquierda y a la derecha cambiando la velocidad de las ruedas",
                "Gira sobre su propio eje con las ruedas en sentidos opuestos",
                "Se mantiene en pie en una curva rápida",
              ],
              troubleshooting: [
                {
                  problem: "La base solo avanza derecho, nunca gira",
                  fix: "Pon valores distintos en la velocidad de las dos ruedas; con velocidades iguales siempre va derecho.",
                },
                {
                  problem: "La base se voltea en las curvas",
                  fix: "Baja el centro de masa o separa más las ruedas, y luego gira con más suavidad.",
                },
              ],
              extension: "Recorre un cuadrado completo con la base usando solo giros de tracción diferencial.",
            },
            unplugged: {
              title: "Base rodante con materiales de casa",
              materials: [
                "Cartón para el chasis",
                "Tapas de botella para las ruedas y palitos de brocheta o popotes para los ejes",
                "Cinta adhesiva, tijeras y una o dos ligas",
                "Ligas, monedas o plastilina para dar agarre y peso (opcional)",
                "Una rampa o libros para la prueba de volcadura",
                "Hoja de trabajo Bitácora de pruebas del chasis",
              ],
              instructions: [
                "Corta una base de cartón baja y ancha y haz dos agujeros paralelos para los ejes, de modo que las ruedas queden bien alineadas.",
                "Encaja las tapas como ruedas en los ejes de brocheta y agrégale al frente una zapata pequeña (una lengüeta de cartón doblada) para que se apoye en tres puntos.",
                "Dale un empujón y ajusta los ejes hasta que ruede derecho; después empuja un lado más que el otro para verla girar: eso es dirección diferencial hecha a mano.",
                "Ponle peso abajo en la base e inclínala en la rampa para comprobar que se mantiene en pie más tiempo que una versión alta.",
              ],
              safetyNotes: [
                "Usa tijeras seguras para niños con un adulto y mantén sin punta las brochetas.",
                "Haz las pruebas sobre una mesa, bien lejos de la orilla.",
              ],
              expectedResult: "Una base de cartón que rueda bastante derecho, que se puede dirigir moviendo un lado más que el otro y que se mantiene en pie en una pendiente suave.",
              successCriteria: [
                "Rueda derecho durante al menos medio metro",
                "Se puede dirigir moviendo un lado más que el otro",
                "Se mantiene en pie en la rampa más tiempo que una versión alta",
                "Las ruedas quedan paralelas y giran libremente",
              ],
              troubleshooting: [
                {
                  problem: "Rueda chueca",
                  fix: "Los ejes no están paralelos o las ruedas son de distinto tamaño; endereza los agujeros y empareja las ruedas.",
                },
                {
                  problem: "Las ruedas patinan sobre la mesa",
                  fix: "Enrolla una liga alrededor de cada rueda para darle tracción.",
                },
              ],
              extension: "Haz correr dos de tus bases y usa la bitácora de pruebas para explicar cuál rodó más derecho y por qué.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de la prueba de volcadura: ¿cuál base crees que aguanta más tiempo en pie sobre la rampa, la alta y angosta o la baja y ancha? ¿Por qué?",
          howToCheck: "Inclina cada base en la rampa (o usa la pendiente del simulador) y observa cuál se voltea primero; compáralo con tu predicción.",
        },
        {
          prompt: "Antes de cambiar los engranes: ¿crees que una relación más baja hará que la base sea más rápida o más fuerte para subir? Predice qué va a perder a cambio.",
          howToCheck: "Cambia los engranes para que las ruedas giren más despacio, sube la rampa y comprueba si sube mejor pero avanza más lento.",
        },
      ],
      testRecords: [
        {
          title: "Prueba de velocidad y rectitud de la base rodante",
          instructions: "Marca una línea de salida y una de llegada separadas un metro. Haz avanzar la base desde la salida y registra cuántos segundos tarda y qué tan desviada termina de la línea. Repítelo tres veces.",
          columns: [
            null,
            "Tiempo hasta la llegada (segundos)",
            "Desviación de la línea recta (cm)",
            "Notas",
          ],
          measure: "El tiempo que tarda en recorrer la distancia y cuánto se desvió la base de la línea recta",
        },
        {
          title: "Prueba de estabilidad ante volcaduras",
          instructions: "Coloca la base en la rampa y levántala poco a poco hasta que la base se voltee. Registra el ángulo de volcadura (o el número de libros) para una configuración baja y ancha y para una alta y angosta.",
          columns: [
            "Configuración",
            "Se voltea con cuántos libros / a qué ángulo",
            "¿Se mantuvo en pie? (S/N)",
          ],
          measure: "El ángulo o la altura de la rampa a la que se voltea cada configuración",
        },
      ],
      knowledgeCheck: {
        instructions: "Responde estas preguntas para comprobar que entiendes cómo se mueve un robot y cómo se mantiene firme.",
        questions: [
          {
            prompt: "Diagnostica el problema de diseño.",
            scenario: "El robot de un estudiante es alto y angosto, con la batería montada arriba. Avanza derecho sin problema, pero se voltea cada vez que toma una curva rápida.",
            options: [
              {
                text: "El centro de masa está demasiado alto",
                feedback: "Correcto: un robot alto y pesado por arriba tiene el centro de masa alto y se voltea fácil, sobre todo en las curvas.",
              },
              {
                text: "Las ruedas tienen demasiada tracción",
                feedback: "La tracción es algo bueno; la volcadura viene de ser alto y pesado por arriba.",
              },
              {
                text: "El motor tiene muy poco par motor",
                feedback: "Avanza sin problema, así que el par motor no es la causa de la volcadura.",
              },
              {
                text: "Los ejes son demasiado largos",
                feedback: "Unos ejes más largos (ruedas más separadas) lo harían MÁS estable, no menos.",
              },
            ],
            explanation: "Alto y pesado por arriba significa un centro de masa alto, y eso se voltea en las curvas rápidas. Baja el peso o separa más las ruedas.",
          },
          {
            prompt: "¿Cómo hace un motor que gira para que un robot ruede por el piso?",
            options: [
              {
                text: "El motor hace girar un eje, y el eje hace girar las ruedas",
                feedback: "Correcto: el motor gira, el eje da vueltas, las ruedas ruedan; esa es la cadena que mueve al robot.",
              },
              {
                text: "El motor sopla aire hacia atrás para empujar al robot",
                feedback: "Los robots con ruedas avanzan porque las ruedas giran, no porque soplen aire.",
              },
              {
                text: "El motor hace que el robot pese menos",
                feedback: "Un motor no cambia el peso del robot; lo que aporta es movimiento de giro.",
              },
              {
                text: "Las ruedas giran solas, sin el motor",
                feedback: "Las ruedas solo giran porque el motor hace girar el eje en el que están montadas.",
              },
            ],
            explanation: "El motor hace girar un eje, el eje hace girar las ruedas que lleva puestas, y esas ruedas al girar hacen rodar al robot.",
          },
          {
            prompt: "Cambias los engranes de un robot para que sus ruedas giren más despacio. ¿Qué ganas y qué pierdes?",
            options: [
              {
                text: "Ganas velocidad y pierdes par motor",
                feedback: "Es al revés: unas ruedas más lentas tienen más par motor, no más velocidad.",
              },
              {
                text: "Ganas par motor (fuerza de giro) y pierdes velocidad",
                feedback: "Correcto: los engranes cambian velocidad por par motor; con ruedas más lentas puede empujar o subir con más fuerza.",
              },
              {
                text: "Ganas velocidad y par motor a la vez",
                feedback: "No puedes tener la máxima velocidad y el máximo par motor al mismo tiempo; los engranes cambian uno por el otro.",
              },
              {
                text: "Pierdes velocidad y par motor a la vez",
                feedback: "Bajar la relación de engranes no hace perder las dos cosas: cambia velocidad por más par motor.",
              },
            ],
            explanation: "Los engranes cambian velocidad por par motor. Hacer que las ruedas giren más despacio da más fuerza de giro para subir o empujar.",
          },
          {
            prompt: "Las ruedas de un robot giran rápido, pero casi no se mueve sobre un piso liso y resbaloso. ¿Cuál es el problema?",
            options: [
              {
                text: "Demasiado par motor",
                feedback: "El problema es el agarre, no la fuerza de giro.",
              },
              {
                text: "El motor está apagado",
                feedback: "Las ruedas están girando, así que está claro que el motor funciona.",
              },
              {
                text: "Poca tracción: las ruedas patinan en lugar de agarrar",
                feedback: "Correcto: con poca fricción hay poca tracción, así que las ruedas patinan en lugar de empujar al robot hacia adelante.",
              },
              {
                text: "El centro de masa está demasiado bajo",
                feedback: "Un centro de masa bajo ayuda a la estabilidad; no hace que las ruedas patinen.",
              },
            ],
            explanation: "Los pisos lisos dan poca fricción, así que las ruedas tienen poca tracción y patinan en el mismo sitio en lugar de hacer avanzar al robot.",
          },
          {
            prompt: "¿Cuál base de robot es la más difícil de voltear?",
            options: [
              {
                text: "Una base alta y angosta con las piezas pesadas arriba",
                feedback: "Esa es la más fácil de voltear: un centro de masa alto se voltea enseguida.",
              },
              {
                text: "Una base baja y ancha con las piezas pesadas cerca del suelo",
                feedback: "Correcto: una base baja y ancha con un centro de masa bajo es la más estable.",
              },
              {
                text: "Una base con las ruedas más grandes, sin importar su forma",
                feedback: "El tamaño de las ruedas cambia la velocidad y el agarre, no principalmente la volcadura; para la estabilidad importan la forma y dónde va el peso.",
              },
              {
                text: "La base más colorida",
                feedback: "El color no tiene nada que ver con la estabilidad.",
              },
            ],
            explanation: "Una base baja y ancha mantiene el centro de masa bajo y dentro de las ruedas, y eso la hace difícil de voltear.",
          },
          {
            prompt: "En la tracción diferencial, ¿cómo gira a la izquierda un robot de dos ruedas?",
            options: [
              {
                text: "Usa un volante, como un carro",
                feedback: "Los robots de tracción diferencial no tienen volante; se dirigen con la velocidad de las ruedas.",
              },
              {
                text: "La rueda izquierda gira más despacio que la derecha",
                feedback: "Correcto: el robot se curva hacia el lado de la rueda más lenta, así que una rueda izquierda más lenta lo hace girar a la izquierda.",
              },
              {
                text: "Las dos ruedas aceleran juntas",
                feedback: "Con las ruedas a la misma velocidad el robot va derecho, no gira.",
              },
              {
                text: "El motor se inclina hacia un lado",
                feedback: "Los motores no se inclinan; quien dirige es la diferencia de velocidad entre las ruedas.",
              },
            ],
            explanation: "En la tracción diferencial el robot gira hacia el lado de la rueda más lenta, así que frenar la rueda izquierda lo dirige a la izquierda.",
          },
        ],
      },
      reflection: [
        {
          prompt: "¿Qué cambio mecánico marcó la mayor diferencia en el movimiento de tu robot, y por qué?",
        },
        {
          prompt: "¿Qué cambio hizo que tu base fuera la más estable, y por qué ayudó?",
        },
        {
          prompt: "Describe cómo dirigirías tu robot a la izquierda usando únicamente sus dos ruedas.",
        },
      ],
      journalPrompts: [
        {
          prompt: "Dibuja tu base rodante de perfil y rotula el motor, el eje, las ruedas y dónde queda el peso.",
        },
        {
          prompt: "Registra los resultados de tu prueba de velocidad y rectitud y cuál configuración rodó mejor.",
        },
        {
          prompt: "Escribe una oración sobre qué cambiarías para que tu base fuera más estable.",
        },
      ],
      simulatorMissions: [
        {
          title: "Avanza derecho y firme",
          objective: "Arma una base de tracción diferencial que recorra la cuadrícula en línea recta sin desviarse ni voltearse.",
          successCriteria: [
            "La base llega al otro extremo de la cuadrícula",
            "Se mantiene sobre una línea recta",
            "Se mantiene en pie todo el recorrido",
          ],
        },
        {
          title: "Dirige con tracción diferencial",
          objective: "Usa velocidades distintas en la rueda izquierda y la derecha para girar la base a la izquierda, a la derecha y sobre su propio eje.",
          successCriteria: [
            "La base gira a la izquierda y a la derecha cambiando la velocidad de las ruedas",
            "La base gira sobre su propio eje con las ruedas en sentidos opuestos",
            "La base no se voltea durante los giros",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Cómo se mueven los robots",
          focus: "Motor, eje, ruedas, engranes que cambian velocidad por par motor, fricción y tracción.",
        },
        {
          title: "Mantenerse en pie",
          focus: "Equilibrio, estabilidad, centro de masa, diseño del chasis y tracción diferencial.",
        },
        {
          title: "Investigación virtual del chasis",
          focus: "Cambiar una cosa a la vez y registrar su efecto en la velocidad, el agarre y la estabilidad.",
        },
        {
          title: "Predice cuál base es la más firme",
          focus: "Adivinar qué base aguanta más tiempo en pie antes de la prueba de volcadura.",
        },
        {
          title: "Reto de la base rodante",
          focus: "Construir una base que ruede derecho, se dirija y se mantenga en pie.",
        },
        {
          title: "Pruebas de velocidad y volcadura",
          focus: "Registrar la velocidad, la rectitud y el ángulo de volcadura de cada configuración.",
        },
        {
          title: "Comprobación de conocimientos",
          focus: "Cinco preguntas sobre movimiento, par motor, tracción, estabilidad y dirección.",
        },
        {
          title: "Reflexión",
          focus: "Escribir sobre engranes, estabilidad y dirección por tracción diferencial.",
        },
      ],
      safetyNotes: [
        {
          text: "Mantén los dedos, el cabello y la ropa suelta lejos de las ruedas y los engranes en movimiento, y apaga el motor antes de cambiar piezas.",
        },
        {
          text: "Usa tijeras seguras para niños con un adulto para cortar el cartón y los agujeros de los ejes, y mantén sin punta las brochetas.",
        },
        {
          text: "Prueba las bases rodantes en un espacio despejado, lejos de las orillas de las mesas, las escaleras y los desniveles.",
        },
        {
          text: "Guarda tu trabajo con frecuencia para que al recargar el navegador no se pierdan tu chasis ni tu bitácora de pruebas.",
        },
      ],
      printableResources: [
        {
          title: "Bitácora de pruebas del chasis",
          description: "Una hoja para registrar los cambios de ruedas, engranes y base y su efecto en la velocidad, el agarre y la estabilidad.",
        },
        {
          title: "Registro de pruebas de velocidad y volcadura",
          description: "Tablas para la prueba de velocidad y rectitud en un metro y para la prueba de volcadura en la rampa.",
        },
        {
          title: "Página para dibujar la base rodante",
          description: "Espacio para dibujar la base de perfil y rotular el motor, el eje, las ruedas y el peso.",
        },
        {
          title: "Guía docente de la semana 2",
          description: "Preparación, conducción de la clase, ideas equivocadas frecuentes y preguntas para la lección de construir un robot que se mueva.",
        },
      ],
      completion: {
        summary: "Termina la semana 2 investigando opciones de chasis, construyendo una base rodante que se dirija y se mantenga en pie, registrando tus pruebas de velocidad y volcadura, y aprobando la comprobación de conocimientos.",
        requirements: [
          {
            label: "Completar la Investigación virtual del chasis y registrar tres configuraciones",
          },
          {
            label: "Construir una base rodante que ruede derecho, se dirija y se mantenga en pie",
          },
          {
            label: "Registrar las pruebas de velocidad y rectitud y de volcadura",
          },
          {
            label: "Obtener al menos 4 de 5 en la comprobación de conocimientos",
          },
          {
            label: "Escribir tu reflexión",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Pon a la vista ruedas, engranes y piezas de chasis (kit), o cartón, tapas, brochetas y cinta (sin dispositivos), ordenados para que los estudiantes puedan intercambiarlos rápido.",
          "Imprime la Bitácora de pruebas del chasis y el registro de pruebas de velocidad y volcadura, uno por estudiante o por pareja.",
          "Marca en el piso un carril de prueba de un metro y arma una rampa o una pila de libros para la prueba de volcadura.",
          "Si usas el simulador, abre la misión del laboratorio de chasis en cada dispositivo.",
        ],
        prep: [
          "Construye tú mismo una base rodante que funcione, para poder mostrar un ejemplo estable y detectar los problemas de bamboleo más comunes.",
          "Haz la prueba de volcadura con una base alta y con una baja y ancha, para poder anticipar lo que verán los estudiantes.",
          "Ten ligas de repuesto a la mano para arreglar las ruedas con poca tracción.",
        ],
        facilitation: [
          "Empieza con la cadena motor-eje-rueda y con los engranes que cambian velocidad por par motor, antes de que empiece cualquier construcción.",
          "Haz la Investigación virtual del chasis, insistiendo en que los estudiantes cambien una sola cosa a la vez y registren cada resultado.",
          "Pide a los estudiantes que predigan cuál base será la más firme y luego haz la prueba de volcadura para comprobarlo.",
          "Pasa a la construcción de la base rodante, luego a las pruebas de velocidad y volcadura, y cierra con la comprobación de conocimientos y la reflexión.",
        ],
        commonMisconceptions: [
          "\"Ruedas más grandes siempre significan un mejor robot\": las ruedas grandes dan velocidad, pero necesitan más par motor para arrancar y pueden elevar la base.",
          "\"Bajar la relación de engranes hace al robot más lento y más débil\": lo hace más lento, pero más fuerte; cambia velocidad por par motor.",
          "\"Si la rueda gira, el robot se está moviendo\": sobre un piso resbaloso puede girar en el mismo sitio, sin tracción.",
          "\"Un robot se dirige con un volante\": los robots de tracción diferencial se dirigen moviendo las ruedas a distinta velocidad.",
          "\"Los robots más altos son más firmes\": una base baja y ancha con el centro de masa bajo es mucho más difícil de voltear.",
        ],
        questionsToAsk: [
          "¿Por dónde tiene que pasar el giro del motor para llegar al suelo?",
          "Si quieres que este robot suba, ¿necesitas más velocidad o más par motor?",
          "¿Por qué esta rueda patina en lugar de agarrar?",
          "¿Hacia dónde va a girar el robot si la rueda izquierda va más despacio?",
          "¿Dónde está el peso, y cómo podrías hacer que esta base fuera más difícil de voltear?",
        ],
        easierVersion: "Dales a los estudiantes una base ya construida y pídeles solo que cambien las ruedas y hagan la prueba de volcadura en la rampa, en lugar de armar el chasis desde cero.",
        harderVersion: "Rétalos a ajustar los engranes de su base para lograr la mejor subida por la rampa y a recorrer un cuadrado preciso usando solo giros de tracción diferencial.",
      },
      nextWeek: {
        teaser: "La próxima semana tu base rodante recibe un cerebro: vas a escribir tu primer programa para que el robot recorra por su cuenta un trayecto planeado.",
        prepare: [
          "Deja tu base rodante armada y funcionando para poder programarla la próxima semana.",
          "Carga tu kit o guarda en tus marcadores el simulador y su editor de bloques.",
          "Piensa cómo le dirías a alguien los pasos exactos para caminar de la puerta a una silla sin ir mirándolo.",
        ],
      },
    },
    {
      title: "Dar instrucciones exactas",
      subtitle: "Convierte un recorrido en un plan claro paso a paso y luego programa al robot para que lo siga al pie de la letra.",
      summary: "Los estudiantes aprenden que las computadoras siguen las instrucciones al pie de la letra y con toda exactitud: el robot hace lo que de verdad le dijiste, no lo que querías decir. Escriben un algoritmo (un plan claro paso a paso) como pseudocódigo en lenguaje común, y luego lo convierten en un programa formado por una secuencia recta de comandos de movimiento con tiempos, distancias y giros. Predicen dónde va a terminar el robot antes de ejecutarlo, y después ejecutan y comparan. Esta es una semana de puras secuencias: todavía no hay ciclos, condiciones ni sensores, solo comandos exactos y ordenados para llevar al robot por un recorrido de entrega o un laberinto hasta la meta.",
      mainMission: "Planear una secuencia exacta de comandos de avance y giro, predecir dónde termina, y luego programar al robot para que siga un recorrido hasta la meta.",
      estimatedTime: "60 a 75 minutos",
      learningGoals: [
        {
          text: "Explicar que un programa es una secuencia de comandos que la computadora sigue en orden, al pie de la letra y con exactitud",
        },
        {
          text: "Escribir un algoritmo como pseudocódigo (un plan claro paso a paso en lenguaje común) antes de programar",
        },
        {
          text: "Controlar el recorrido de un robot con comandos de distancia, tiempo y giro en el orden correcto",
        },
        {
          text: "Predecir dónde va a terminar el robot antes de ejecutar el programa, y luego comprobar la predicción",
        },
        {
          text: "Programar al robot para que siga un recorrido de entrega o un laberinto hasta la meta usando solo una secuencia de comandos",
        },
      ],
      vocabulary: [
        {
          term: "Programa",
          definition: "Una lista de instrucciones que una computadora sigue para hacer un trabajo. Esta semana, un programa es una secuencia de comandos de movimiento.",
        },
        {
          term: "Comando",
          definition: "Una sola instrucción que el robot puede llevar a cabo, como \"avanza\" o \"gira a la derecha\".",
        },
        {
          term: "Secuencia",
          definition: "Comandos que se ejecutan uno tras otro, en orden, de arriba abajo. El orden importa.",
        },
        {
          term: "Algoritmo",
          definition: "Un plan claro paso a paso para hacer una tarea, sin pasos faltantes ni pasos confusos.",
        },
        {
          term: "Pseudocódigo",
          definition: "Escribir los pasos de un plan en lenguaje común antes de convertirlos en código de verdad.",
        },
        {
          term: "Evento",
          definition: "El momento que pone en marcha un programa, como apretar \"Iniciar\" o un bloque de \"al tocar\".",
        },
        {
          term: "Tiempo",
          definition: "Cuánto dura un comando, medido en segundos: una forma de controlar qué tan lejos llega el robot.",
        },
        {
          term: "Distancia",
          definition: "Qué tanto se mueve el robot en un comando, muchas veces indicado en centímetros o en casillas de la cuadrícula.",
        },
        {
          term: "Giro",
          definition: "Un comando que hace rotar al robot en su sitio, normalmente una cantidad fija de grados, como 90.",
        },
        {
          term: "Velocidad",
          definition: "Qué tan rápido funcionan los motores. A más velocidad, más distancia recorrida en el mismo tiempo.",
        },
        {
          term: "Predicción",
          definition: "Tu mejor conjetura sobre dónde va a terminar el robot, hecha antes de ejecutar el programa.",
        },
      ],
      prerequisites: [
        {
          reason: "Necesitas la base rodante que construiste en la semana 2, porque los programas de la semana 3 hacen que esa base se mueva.",
        },
        {
          reason: "Vas a usar la idea de la semana 1 de que un programa es el conjunto de instrucciones que sigue un controlador.",
        },
      ],
      concepts: [
        {
          title: "Las computadoras siguen las instrucciones al pie de la letra",
          body: [
            "Un robot hace exactamente lo que le dices, no lo que querías decir. Si dices \"avanza\" pero se te olvida decir cuánto, el robot no puede adivinar; hace algo incorrecto o no hace nada. Las computadoras son rápidas e incansables, pero no tienen sentido común.",
            "Esta es la idea más importante de la semana. Cuando un robot se porta mal, casi siempre está siguiendo bien tus instrucciones: lo que pasa es que tus instrucciones no decían lo que tú querías.",
          ],
          examples: [
            "\"Haz un sándwich\" falla si no dices \"primero abre la bolsa del pan\"",
            "A un robot al que le dices \"gira\" pero no cuánto, se pasa o se queda corto",
            "\"Ve a la puerta\" no le dice nada a un robot: necesita \"avanza 3 casillas, gira a la izquierda\"",
          ],
        },
        {
          title: "Un programa es una secuencia de comandos",
          body: [
            "Un programa es una lista de comandos que el robot ejecuta uno tras otro, de arriba abajo. Cada comando es una instrucción pequeña, como \"avanza\" o \"gira a la derecha\". Ejecutarlos en orden se llama secuencia.",
            "El orden importa. \"Gira a la derecha y luego avanza\" manda al robot a un lugar completamente distinto que \"avanza y luego gira a la derecha\", aunque los comandos sean los mismos.",
          ],
          examples: [
            "avanza 2 casillas -> gira a la derecha -> avanza 1 casilla",
            "Intercambiar dos comandos cambia dónde termina el robot",
          ],
        },
        {
          title: "Los eventos ponen en marcha un programa",
          body: [
            "Un programa no se ejecuta hasta que algo lo pone en marcha. Ese momento de arranque se llama evento: apretar un botón de \"Iniciar\", tocar un bloque de \"al tocar\" o hacer clic en Ejecutar en el simulador.",
            "Esta semana cada programa tiene un evento arriba que dispara la secuencia, y a partir de ahí los comandos corren de corrido, en orden.",
          ],
          examples: [
            "\"Al apretar Iniciar\" al principio del programa",
            "Hacer clic en Ejecutar en el simulador",
            "Tocar el botón de arranque en la aplicación del kit",
          ],
        },
        {
          title: "Algoritmos y pseudocódigo: planea antes de programar",
          body: [
            "Un algoritmo es un plan claro paso a paso para una tarea, con cada paso bien explicado y nada dejado a medias. Antes de escribir código de verdad, quienes programan escriben primero el plan en lenguaje común: a ese plan en lenguaje común se le llama pseudocódigo.",
            "El pseudocódigo te deja pensar el recorrido sin pelearte todavía con los bloques. Puedes escribir \"avanza 3, gira a la izquierda, avanza 2, alto\", comprobar que tiene sentido, y solo entonces armarlo con comandos.",
          ],
          examples: [
            "Pseudocódigo: \"avanza 3 casillas, gira 90 a la izquierda, avanza 2 casillas, alto\"",
            "Un algoritmo no tiene pasos faltantes ni huecos de \"ya sabes a qué me refiero\"",
          ],
        },
        {
          title: "Controlar la distancia con el tiempo, la velocidad y los giros",
          body: [
            "Esta semana diriges al robot con tres herramientas: qué tanto se mueve (distancia), cuánto dura ese movimiento (tiempo) y cuánto rota (giro). En muchos kits, la distancia sale de combinar tiempo y velocidad: más velocidad durante más tiempo cubre más terreno.",
            "Los giros hacen rotar al robot en su sitio, normalmente por grados. Un giro de 90 grados es un cuarto de vuelta (un ángulo recto) y deja al robot alineado con el siguiente tramo del recorrido. Acertar con la cantidad de giro es lo que mantiene al robot en su ruta.",
          ],
          examples: [
            "avanza a velocidad 50 durante 2 segundos",
            "gira 90 grados a la derecha para quedar frente al siguiente pasillo",
            "media vuelta = 180 grados para regresar por donde viniste",
          ],
        },
        {
          title: "Predice antes de ejecutar",
          body: [
            "Antes de ejecutar un programa, haz una predicción: recorre la secuencia con el dedo y marca dónde crees que se va a detener el robot y hacia dónde va a quedar mirando. Comprometerte primero con una conjetura hace que se note enseguida cuando un paso está mal.",
            "Después ejecútalo y compara. Si el robot termina en otro lado, la diferencia te dice exactamente qué comando hay que arreglar: tal vez un giro era de 90 cuando debía ser de 180, o un avance se quedó una casilla corto.",
          ],
          examples: [
            "Predicción: \"termina en la estrella, mirando hacia arriba\"",
            "Si se detiene una casilla antes, un comando de distancia se quedó corto",
          ],
        },
      ],
      materials: [
        {
          name: "Mapa del recorrido o laberinto con salida, meta y casillas de cuadrícula (imprimible)",
        },
        {
          name: "Hoja de planeación de pseudocódigo (imprimible)",
        },
        {
          name: "Hoja de registro para predecir y comprobar (imprimible)",
        },
        {
          name: "Lápiz y papel",
        },
        {
          name: "La base rodante que construiste en la semana 2, con su aplicación o programa",
        },
        {
          name: "Cinta de papel y un objeto pequeño para entregar (una tapa de botella o un bloque)",
          note: "La cinta marca el recorrido y la meta en el piso.",
        },
        {
          name: "Computadora o tableta con el simulador del navegador",
        },
        {
          name: "Tarjetas de flechas y comandos (avanza, retrocede, gira a la izquierda, gira a la derecha, espera, alto)",
        },
        {
          name: "Una cuadrícula en el piso hecha con cinta, o una cuadrícula impresa para mover una ficha",
        },
      ],
      activities: [
        {
          title: "Reto de programación del recorrido de entrega",
          goal: "Programar al robot para que siga un recorrido o laberinto desde la salida hasta la meta usando solo una secuencia de comandos exactos de avance y giro.",
          shared: [
            "Observa el mapa y localiza la salida, la meta y los muros o giros que hay a lo largo del recorrido. Primero traza la ruta con el dedo.",
            "Escribe el plan como pseudocódigo en lenguaje común (avances, giros y distancias en orden) antes de armar nada. Que sea una secuencia recta: esta semana no hay ciclos, ni condiciones, ni sensores.",
            "Convierte el pseudocódigo en comandos, ejecútalo, y si el robot no llega a la meta, corrige exactamente el comando que estaba mal.",
          ],
          variants: {
            kit: {
              title: "Recorre el trayecto de entrega con el robot de tu kit",
              instructions: [
                "Marca con cinta un recorrido en el piso, con una casilla de salida, una de meta y uno o dos giros. Pon el objeto pequeño en la salida como la entrega.",
                "Traza la ruta y escribe el pseudocódigo: por ejemplo, \"avanza 40 cm, gira 90 a la derecha, avanza 20 cm, alto\".",
                "Mide o cronometra un avance para saber qué tanto se mueve el robot, y luego llena las distancias o los tiempos reales.",
                "Arma la secuencia de comandos en la aplicación, aprieta Iniciar (el evento) y observa cómo el robot sigue el recorrido.",
                "Si no llega a la meta, cambia solo el comando que estaba mal (la cantidad de giro o la distancia de un avance) y vuelve a ejecutar.",
              ],
              safetyNotes: [
                "Mantén los dedos, el cabello y la ropa suelta lejos de las ruedas mientras el robot avanza.",
                "Despeja la zona del recorrido para que el robot no se topé con pies ni con patas de mesa.",
              ],
              expectedResult: "El robot sigue la secuencia desde la salida hasta la meta y se detiene en la casilla de meta con la entrega.",
              successCriteria: [
                "El pseudocódigo se escribió antes de programar",
                "El programa es una secuencia recta de comandos de avance y giro",
                "El robot llega a la meta y se detiene ahí",
              ],
              troubleshooting: [
                {
                  problem: "El robot se pasa de la meta o se queda corto",
                  fix: "Ajusta la distancia o el tiempo de ese comando de avance; un cambio pequeño en segundos lo mueve bastante.",
                },
                {
                  problem: "El robot gira de más o de menos",
                  fix: "Revisa los grados del giro (prueba con 90 para un cuarto de vuelta) y confirma si es a la izquierda o a la derecha.",
                },
              ],
              extension: "Agrega una segunda entrega: alarga la secuencia para que el robot siga hasta una segunda casilla de meta después de la primera.",
            },
            simulator: {
              title: "Programa el laberinto con bloques sobre una cuadrícula",
              instructions: [
                "Abre la misión del laberinto en el simulador y localiza la casilla de salida y la de meta.",
                "Traza la ruta por las casillas libres y escribe el pseudocódigo en pasos de cuadrícula, por ejemplo \"avanza 3, gira a la izquierda, avanza 2, alto\".",
                "Arrastra bloques de movimiento para formar una secuencia debajo del bloque de evento \"al iniciar\": solo bloques de avance y de giro.",
                "Ejecuta el programa y observa cómo el robot recorre la cuadrícula un comando a la vez.",
                "Si se estrella contra un muro o no llega a la meta, corrige exactamente el bloque que estaba mal y vuelve a ejecutar.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; toma un descanso corto de la pantalla si te cansan los ojos.",
              ],
              expectedResult: "El robot del simulador sigue la secuencia de bloques por el laberinto y cae en la casilla de meta.",
              successCriteria: [
                "El pseudocódigo se escribió antes de armar los bloques",
                "Solo se usaron bloques de secuencia (sin ciclos, condicionales ni sensores)",
                "El robot llega a la casilla de meta",
              ],
              troubleshooting: [
                {
                  problem: "El robot se mete contra un muro",
                  fix: "Vuelve a contar las casillas libres; seguramente a un bloque de avance le sobra una casilla.",
                },
                {
                  problem: "El robot queda mirando hacia el lado equivocado después de un giro",
                  fix: "Cambia el giro a la izquierda por uno a la derecha, o revisa cuántas casillas van antes del giro.",
                },
              ],
              extension: "Vuelve a hacer el laberinto con la menor cantidad posible de bloques, juntando varios avances en pasos más largos.",
            },
            unplugged: {
              title: "Escribe un programa de tarjetas que un compañero siga al pie de la letra",
              instructions: [
                "Arma una cuadrícula en el piso o usa la cuadrícula impresa, con una salida y una meta. Una persona es el \"robot\" y la otra es quien programa.",
                "Quien programa traza la ruta y escribe el pseudocódigo, y luego acomoda en secuencia las tarjetas de flechas y comandos.",
                "El \"robot\" sigue las tarjetas exactamente y al pie de la letra (una casilla por tarjeta de avance, un cuarto de vuelta por tarjeta de giro), haciendo solo lo que dice cada tarjeta, nada más.",
                "Di \"Inicia\" (el evento) y ejecuta las tarjetas de arriba abajo sin ayudarle al robot.",
                "Si el robot no llega a la meta, encuentra la única tarjeta que estaba mal, cámbiala y vuelve a ejecutar.",
              ],
              safetyNotes: [
                "Camina despacio sobre la cuadrícula del piso y mantén el paso libre de sillas y mochilas.",
              ],
              expectedResult: "El \"robot\" camina la secuencia de tarjetas y cae en la casilla de meta, haciendo solo lo que dicen las tarjetas.",
              successCriteria: [
                "El pseudocódigo se escribió antes de acomodar las tarjetas",
                "El programa de tarjetas es una secuencia recta",
                "Seguir las tarjetas al pie de la letra lleva hasta la meta",
              ],
              troubleshooting: [
                {
                  problem: "El robot \"hace trampa\" y corrige los pasos sobre la marcha",
                  fix: "Recuérdales que hay que seguir las tarjetas al pie de la letra: la idea es encontrar el error en las instrucciones, no taparlo.",
                },
                {
                  problem: "El robot termina mirando hacia el lado equivocado",
                  fix: "Hay una tarjeta de giro del lado equivocado o falta una; revisa izquierda y derecha.",
                },
              ],
              extension: "Intercambien programas de tarjetas con otra pareja y ejecuten el del otro equipo sin ver antes el mapa.",
            },
          },
        },
        {
          title: "Predice y luego comprueba el final",
          goal: "Predecir dónde se va a detener el robot y hacia dónde va a quedar mirando antes de ejecutar una secuencia dada, y luego ejecutarla y comparar.",
          shared: [
            "Toma una secuencia corta de comandos y trázala a mano sobre el mapa. Marca en papel dónde crees que termina el robot y hacia dónde queda mirando.",
            "Comprométete con tu predicción antes de ejecutar nada: escríbela primero.",
            "Ejecuta el programa, compara el final real con tu predicción y explica cualquier diferencia nombrando el comando que la causó.",
          ],
          variants: {
            kit: {
              title: "Predice dónde se detiene el robot de tu kit",
              instructions: [
                "Toma una secuencia de 4 a 6 comandos (la tuya o una que te den) y trázala sobre el recorrido marcado con cinta.",
                "En la hoja de registro, marca la casilla en la que predices que se va a detener el robot y hacia dónde va a mirar.",
                "Ejecuta la secuencia y marca dónde se detuvo el robot en realidad.",
                "Compara: si hay diferencia, señala el comando (un giro o una distancia) que explica esa brecha.",
              ],
              safetyNotes: [
                "Mantente lejos de las ruedas mientras el robot hace su prueba de predicción.",
              ],
              expectedResult: "Una predicción escrita junto al punto real donde se detuvo, con una razón para cualquier diferencia.",
              successCriteria: [
                "La predicción se escribió antes de ejecutar",
                "Se registró el final real",
                "Cualquier diferencia se explica nombrando un comando",
              ],
              troubleshooting: [
                {
                  problem: "La predicción y el resultado quedan lejísimos cada vez",
                  fix: "Vuelve a medir qué tanto mueve al robot un comando de avance; tu estimación de distancia está desviada.",
                },
              ],
              extension: "Predice el final de una secuencia que tenga tres giros.",
            },
            simulator: {
              title: "Predice la casilla final del robot",
              instructions: [
                "Observa una secuencia de bloques dada en el simulador, sin ejecutarla.",
                "En la hoja de registro, escribe en qué casilla de la cuadrícula predices que va a caer el robot y hacia dónde va a mirar.",
                "Ejecuta el programa y lee la casilla final real.",
                "Compara y nombra el bloque responsable de cualquier diferencia.",
              ],
              safetyNotes: [
                "No hay riesgos físicos.",
              ],
              expectedResult: "Una casilla predicha escrita antes de ejecutar, junto a la casilla real, con una razón para cualquier diferencia.",
              successCriteria: [
                "La predicción se escribió antes de ejecutar",
                "Se registró la casilla final real",
                "Cualquier diferencia se liga a un bloque concreto",
              ],
              troubleshooting: [
                {
                  problem: "Se pierde el hilo al trazar la secuencia",
                  fix: "Traza un comando a la vez con el dedo y ve marcando cada casilla conforme avanzas.",
                },
              ],
              extension: "Predice cuántas casillas recorre el robot en total y luego cuéntalas durante la ejecución.",
            },
            unplugged: {
              title: "Predice dónde cae el robot de tarjetas",
              instructions: [
                "Quien programa acomoda una secuencia de tarjetas pero todavía no la ejecuta.",
                "Cada quien escribe una predicción: en qué casilla va a terminar el \"robot\" y hacia dónde va a mirar.",
                "Ejecuten las tarjetas, con el \"robot\" caminándolas al pie de la letra.",
                "Comparen las predicciones con el final real y comenten qué tarjeta provocó cualquier sorpresa.",
              ],
              safetyNotes: [
                "Mantengan despejada la cuadrícula del piso para que quien camina pueda moverse con seguridad.",
              ],
              expectedResult: "Predicciones escritas junto a la casilla final real, con una tarjeta señalada para cualquier diferencia.",
              successCriteria: [
                "La predicción se escribió antes de caminar las tarjetas",
                "Se registró el final real",
                "La diferencia se liga a una tarjeta concreta",
              ],
              troubleshooting: [
                {
                  problem: "Cada quien predice algo distinto",
                  fix: "Tracen las tarjetas juntos, una por una: un trazo compartido muestra dónde se separan las predicciones.",
                },
              ],
              extension: "Esconde una tarjeta boca abajo y predice cómo cambia el final cuando se descubre y se agrega.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de ejecutar tu programa de entrega, ¿en qué casilla predices que se va a detener el robot, y hacia dónde va a estar mirando?",
          howToCheck: "Ejecuta la secuencia, marca la casilla y la dirección reales en las que se detuvo, y compáralas con tu predicción en la hoja de registro.",
        },
        {
          prompt: "¿Cuántos comandos (pasos) crees que necesita tu programa para llegar a la meta?",
          howToCheck: "Cuenta los comandos de tu secuencia final ya funcionando y compáralos con tu conjetura.",
        },
      ],
      testRecords: [
        {
          title: "Registro de final predicho contra final real",
          instructions: "En cada intento, escribe la casilla final que predices antes de ejecutar, luego ejecuta la secuencia y registra dónde terminó el robot en realidad. Anota qué comando cambiaste para el siguiente intento.",
          columns: [
            "Intento",
            "Casilla final predicha",
            "Casilla final real",
            "Comando cambiado para el siguiente intento",
          ],
          measure: "La posición final predicha frente a la posición final real a lo largo de los intentos",
        },
      ],
      knowledgeCheck: {
        instructions: "Responde estas preguntas para comprobar que entiendes las secuencias, los algoritmos, el pseudocódigo y cómo controlar el recorrido del robot.",
        questions: [
          {
            prompt: "Pon estos pasos en el orden correcto para programar al robot para que haga una tarea.",
            items: [
              {
                text: "Planear los pasos como un algoritmo",
              },
              {
                text: "Escribir los pasos como comandos exactos",
              },
              {
                text: "Ejecutar el programa en el robot",
              },
              {
                text: "Comprobar si hizo lo que esperabas",
              },
            ],
            explanation: "Primero planeas el algoritmo, lo conviertes en comandos exactos, lo ejecutas y luego revisas el resultado: es el mismo ciclo que usa quien programa.",
          },
          {
            prompt: "El robot arranca mirando hacia arriba. Traza este programa. ¿Hacia dónde queda mirando al final?",
            program: [
              "gira a la derecha",
              "gira a la derecha",
              "gira a la izquierda",
            ],
            options: [
              {
                text: "Mirando hacia arriba",
                feedback: "Dos giros a la derecha y luego uno a la izquierda dan un giro neto a la derecha, no vuelven al punto de partida.",
              },
              {
                text: "Mirando a la derecha",
                feedback: "Correcto: dos giros a la derecha y luego uno a la izquierda lo dejan con un giro neto en el sentido de las manecillas, mirando a la derecha.",
              },
              {
                text: "Mirando hacia abajo",
                feedback: "Para mirar hacia abajo harían falta dos giros netos a la derecha; este programa solo hace uno.",
              },
              {
                text: "Mirando a la izquierda",
                feedback: "Para mirar a la izquierda haría falta un giro neto a la izquierda; aquí los giros a la derecha ganan por uno.",
              },
            ],
            explanation: "Derecha, derecha e izquierda equivale a un giro neto a la derecha. Si arranca mirando hacia arriba, un giro a la derecha lo deja mirando a la derecha.",
          },
          {
            prompt: "Tu robot hizo algo incorrecto aunque ejecutó todo tu programa. ¿Qué es lo más probable que haya pasado?",
            options: [
              {
                text: "El robot decidió ser creativo",
                feedback: "Los robots no improvisan: siguen el programa al pie de la letra.",
              },
              {
                text: "Siguió tus instrucciones exactamente, pero tus instrucciones no eran lo que querías",
                feedback: "Correcto: las computadoras siguen los comandos al pie de la letra, así que un resultado incorrecto casi siempre significa una instrucción incorrecta.",
              },
              {
                text: "El robot ignoró el programa",
                feedback: "Sí ejecutó el programa; el error estaba en el programa mismo.",
              },
              {
                text: "Los programas nunca funcionan a la primera, a propósito",
                feedback: "Los programas sí pueden funcionar al primer intento; cuando no, es un problema de instrucciones que se puede arreglar.",
              },
            ],
            explanation: "Las computadoras siguen las instrucciones al pie de la letra y con exactitud. Un resultado incorrecto casi siempre significa que las instrucciones no decían lo que querías.",
          },
          {
            prompt: "¿Qué es una secuencia?",
            options: [
              {
                text: "Comandos que se ejecutan uno tras otro, en orden",
                feedback: "Correcto: una secuencia ejecuta los comandos de arriba abajo, y el orden importa.",
              },
              {
                text: "Un comando que se repite para siempre",
                feedback: "Eso es un ciclo, que viene más adelante en el curso.",
              },
              {
                text: "Un comando que decide a partir de un sensor",
                feedback: "Eso es una condición; esta semana no hay sensores ni condiciones.",
              },
              {
                text: "Todos los comandos ejecutándose exactamente al mismo tiempo",
                feedback: "En una secuencia, los comandos se ejecutan de uno en uno y en orden, no todos a la vez.",
              },
            ],
            explanation: "Una secuencia son comandos que se llevan a cabo uno tras otro, en orden: intercambiar dos comandos puede cambiar todo el resultado.",
          },
          {
            prompt: "¿Qué es el pseudocódigo?",
            options: [
              {
                text: "Un código secreto que solo las computadoras pueden leer",
                feedback: "Es justo al revés: el pseudocódigo está hecho para que las personas lo lean con facilidad.",
              },
              {
                text: "El plan de un programa escrito en lenguaje común antes de programarlo",
                feedback: "Correcto: el pseudocódigo escribe los pasos en lenguaje común para que puedas planear antes de construir.",
              },
              {
                text: "Un programa descompuesto lleno de errores",
                feedback: "El pseudocódigo es una herramienta de planeación, no un programa descompuesto.",
              },
              {
                text: "El evento que pone en marcha un programa",
                feedback: "Eso es un evento; el pseudocódigo es el plan de pasos escrito.",
              },
            ],
            explanation: "El pseudocódigo consiste en escribir primero los pasos de tu algoritmo en lenguaje común, para poder planear el recorrido antes de convertirlo en comandos de verdad.",
          },
          {
            prompt: "Tu robot llega al punto correcto pero queda mirando hacia el lado equivocado. ¿Qué comando deberías revisar?",
            options: [
              {
                text: "Un comando de distancia de avance",
                feedback: "La distancia afecta dónde se detiene, no hacia dónde queda mirando.",
              },
              {
                text: "El evento de Iniciar",
                feedback: "El evento solo pone en marcha el programa; no fija la dirección.",
              },
              {
                text: "Un comando de giro: los grados o la dirección",
                feedback: "Correcto: los giros fijan hacia dónde mira el robot, así que revisa la cantidad del giro o si es a la izquierda o a la derecha.",
              },
              {
                text: "El comando de alto",
                feedback: "El alto solo termina la ejecución; no hace rotar al robot.",
              },
            ],
            explanation: "Los giros controlan hacia dónde mira el robot. Terminar mirando al lado equivocado apunta a un giro con los grados o la dirección equivocados.",
          },
          {
            prompt: "En un kit que funciona por tiempo, ¿cómo harías que el robot recorriera más distancia en un solo comando de avance?",
            options: [
              {
                text: "Hacer funcionar los motores durante más tiempo (o a mayor velocidad)",
                feedback: "Correcto: más tiempo, o más velocidad, cubre más distancia.",
              },
              {
                text: "Agregar un comando de giro",
                feedback: "Un giro hace rotar al robot; no agrega distancia hacia adelante.",
              },
              {
                text: "Cambiar el evento de Iniciar",
                feedback: "El evento solo pone en marcha el programa; no fija la distancia.",
              },
              {
                text: "Escribir el comando de otro color",
                feedback: "El color no influye en cómo se mueve el robot.",
              },
            ],
            explanation: "La distancia sale del tiempo y la velocidad: funcionar más tiempo, o más rápido, hace que el robot avance más en un solo comando.",
          },
        ],
      },
      reflection: [
        {
          prompt: "¿Qué instrucción provocó el error más grande, y cómo la hiciste más precisa?",
        },
        {
          prompt: "¿De qué te sirvió escribir primero el pseudocódigo, antes de armar los comandos de verdad?",
        },
        {
          prompt: "Cuando tu predicción no coincidió con lo que hizo el robot, ¿cómo encontraste qué comando había que arreglar?",
        },
      ],
      journalPrompts: [
        {
          prompt: "Escribe el pseudocódigo de tu recorrido de entrega en lenguaje común, un paso por renglón.",
        },
        {
          prompt: "Dibuja el mapa de tu recorrido y marca la casilla en la que predices que se va a detener, antes de ejecutar.",
        },
        {
          prompt: "¿Cuántos comandos necesitó tu programa final ya funcionando?",
        },
      ],
      savedPrograms: [
        {
          title: "Secuencia del recorrido de entrega",
          description: "Una secuencia recta de comandos de avance y giro que lleva al robot desde la salida hasta la casilla de meta. Solo secuencia: sin ciclos, condiciones ni sensores.",
        },
        {
          title: "Reto de secuencia en el laberinto",
          description: "Planea una secuencia ordenada de comandos de avance y giro que lleve al robot alrededor del muro hasta la meta y luego lo detenga. Predice el final antes de ejecutarla. Solo secuencia: sin ciclos, condiciones ni sensores.",
        },
      ],
      simulatorMissions: [
        {
          title: "Entrega en la casilla de meta",
          objective: "Programa una secuencia de bloques de avance y giro que lleve al robot desde la casilla de salida hasta la de meta.",
          successCriteria: [
            "El robot llega a la casilla de meta",
            "Solo se usan bloques de secuencia (sin ciclos, condicionales ni sensores)",
            "El robot se detiene en la meta",
          ],
        },
        {
          title: "Secuencia a través del laberinto",
          objective: "Lleva al robot por un laberinto de muros hasta la meta usando solo una secuencia ordenada de comandos de movimiento.",
          successCriteria: [
            "El robot esquiva todos los muros",
            "El robot llega a la casilla de meta",
            "El programa es una secuencia recta",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Instrucciones exactas, secuencias y eventos",
          focus: "Las computadoras siguen los comandos al pie de la letra; un programa es una secuencia ordenada que arranca con un evento.",
        },
        {
          title: "Algoritmos, pseudocódigo y control del recorrido",
          focus: "Planear un algoritmo como pseudocódigo; controlar la distancia con el tiempo, la velocidad y los giros.",
        },
        {
          title: "Retos de programación de entrega y laberinto",
          focus: "Planear el pseudocódigo y luego programar una secuencia para llegar a la meta: primero el recorrido de entrega y después el laberinto alrededor de un muro.",
        },
        {
          title: "Predice y luego comprueba el final",
          focus: "Predecir la casilla de llegada y la dirección antes de ejecutar, y luego comparar.",
        },
        {
          title: "Registrar lo predicho contra lo real",
          focus: "Llenar el registro de predicho contra real a lo largo de los intentos.",
        },
        {
          title: "Comprobación de conocimientos",
          focus: "Cinco preguntas sobre secuencias, algoritmos, pseudocódigo y giros.",
        },
        {
          title: "Reflexión",
          focus: "Escribir sobre las instrucciones literales, el pseudocódigo y cómo encontrar el comando equivocado.",
        },
      ],
      safetyNotes: [
        {
          text: "Mantén los dedos, el cabello y la ropa suelta lejos de las ruedas mientras el robot ejecuta su programa.",
        },
        {
          text: "Despeja el recorrido en el piso de pies, mochilas y patas de silla antes de ejecutar, para que el robot tenga una ruta segura.",
        },
        {
          text: "Camina despacio sobre la cuadrícula del piso cuando te toque hacer de robot, para que nadie se tropiece.",
        },
        {
          text: "Toma un descanso corto de la pantalla si te cansan los ojos al usar el simulador.",
        },
      ],
      printableResources: [
        {
          title: "Mapa de recorrido y laberinto",
          description: "Un mapa con cuadrícula, con salida, meta y muros, para planear una ruta de entrega.",
        },
        {
          title: "Hoja de planeación de pseudocódigo",
          description: "Espacio con renglones para escribir un algoritmo como pasos en lenguaje común antes de programar.",
        },
        {
          title: "Registro para predecir y comprobar",
          description: "Una tabla para registrar las casillas finales predichas y las reales a lo largo de los intentos.",
        },
        {
          title: "Guía docente de la semana 3",
          description: "Preparación, conducción de la clase, ideas equivocadas frecuentes y preguntas para la lección de instrucciones exactas.",
        },
      ],
      completion: {
        summary: "Termina la semana 3 escribiendo el pseudocódigo de un recorrido, programando una secuencia que llegue a la meta, prediciendo y registrando un final, y aprobando la comprobación de conocimientos.",
        requirements: [
          {
            label: "Escribir el pseudocódigo de tu recorrido de entrega antes de programar",
          },
          {
            label: "Programar una secuencia que llegue a la meta",
          },
          {
            label: "Predecir un final y registrar lo predicho contra lo real",
          },
          {
            label: "Obtener al menos 4 de 5 en la comprobación de conocimientos",
          },
          {
            label: "Escribir tu reflexión",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprime el mapa de recorrido y laberinto, la hoja de planeación de pseudocódigo y el registro para predecir y comprobar, uno para cada estudiante o pareja.",
          "Para los kits, marca con cinta en el piso un recorrido sencillo con uno o dos giros y pon a la mano un objeto pequeño de entrega; para el simulador, abre la misión de entrega en cada dispositivo.",
          "Para la ruta sin dispositivos, arma una cuadrícula de cinta en el piso o reparte cuadrículas impresas y tarjetas de flechas y comandos.",
        ],
        prep: [
          "Recorre tú mismo un trayecto para saber más o menos cuánto avanza el robot del kit con un comando y cuánto rota con un giro de 90 grados.",
          "Prepara una secuencia corta con un error a propósito que puedas ejecutar, para que los estudiantes vean a un robot seguir al pie de la letra unas instrucciones equivocadas.",
          "Ten las bases rodantes de la semana 2 cargadas y listas.",
        ],
        facilitation: [
          "Abre con la idea de las instrucciones literales: da una instrucción deliberadamente vaga y pide a un estudiante que la siga al pie de la letra para que se vea qué sale mal.",
          "Enseña secuencia, evento, algoritmo y pseudocódigo antes de programar nada; insiste en que el pseudocódigo se escriba antes que los comandos.",
          "Haz el reto de entrega y después la actividad de predecir y comprobar, prediciendo siempre antes de ejecutar.",
          "Pide a los estudiantes que registren lo predicho contra lo real, y cierra con la comprobación de conocimientos y la reflexión.",
        ],
        commonMisconceptions: [
          "\"El robot hizo lo que yo quería decir\": hace lo que dijiste, al pie de la letra, no lo que tenías en mente.",
          "Que el orden da igual: intercambiar un giro y un avance manda al robot a un lugar completamente distinto.",
          "Que \"gira\" y \"avanza\" son el mismo tipo de comando: un giro cambia hacia dónde mira, un avance cambia dónde está.",
          "Saltarse el plan de pseudocódigo y armar los bloques a prueba y error.",
        ],
        questionsToAsk: [
          "¿Qué le dijiste exactamente al robot que hiciera en este paso?",
          "¿Dónde predices que se va a detener, y hacia dónde va a mirar?",
          "El robot no llegó a la meta: ¿qué comando, uno solo, explica eso?",
          "¿Tu programa seguiría funcionando si se intercambiaran dos comandos?",
        ],
        easierVersion: "Usa un recorrido corto y recto con un solo giro, y dales a los estudiantes una plantilla de pseudocódigo para llenar en lugar de escribirlo desde cero.",
        harderVersion: "Agrega un laberinto más largo con varios giros y rétalos a llegar a la meta con la menor cantidad de comandos.",
      },
      nextWeek: {
        teaser: "La próxima semana el robot gana sentidos: le agregamos un sensor para que pueda darse cuenta de lo que pasa a su alrededor, en vez de solo ejecutar una secuencia fija.",
        prepare: [
          "Guarda tu mejor pseudocódigo de entrega; vas a comparar una secuencia fija con un robot que reacciona.",
          "Carga tu kit o guarda el simulador en tus marcadores, y busca tus piezas de sensores si vas por la ruta del kit.",
          "Piensa en alguna vez en que un conjunto fijo de pasos falló porque algo en el camino cambió.",
        ],
      },
    },
    {
      title: "Darle sentidos al robot",
      subtitle: "Lee valores reales de sensores, encuentra umbrales y calibra un robot para poder confiar en lo que percibe.",
      summary: "Ahora que el robot se mueve y sigue instrucciones, los estudiantes le dan sentidos. Conocen los sensores de contacto, de distancia, de luz y de color, y aprenden que una lectura de sensor es un número que el robot puede medir. Descubren que un umbral es un punto de corte que convierte los números en \"cerca o lejos\" y \"claro u oscuro\", que todos los sensores tienen límites de detección, y que las lecturas bailan un poco (ruido), así que hay que tomar varias y calibrarlas para este cuarto y este robot. Después de leer y calibrar, programan un alto basado en un sensor: el robot avanza y usa su sensor de distancia para frenar justo antes de una pared, así que por fin un umbral controla una acción real. El comportamiento automático completo, con ciclos y condiciones a lo largo de toda una misión, llega la próxima semana.",
      mainMission: "Leer un sensor en distintas condiciones, encontrar un umbral y calibrarlo para que las lecturas sean confiables en este cuarto.",
      estimatedTime: "70 a 85 minutos",
      learningGoals: [
        {
          text: "Nombrar los sensores de contacto, distancia, luz y color, y qué mide cada uno",
        },
        {
          text: "Leer el valor de un sensor y explicar que una lectura es un número, no un sí o no",
        },
        {
          text: "Encontrar un umbral que separe cerca de lejos, o claro de oscuro",
        },
        {
          text: "Explicar los límites de detección, el ruido y por qué se toman varias lecturas",
        },
        {
          text: "Calibrar un sensor para que sus lecturas sean confiables en este cuarto y con este robot",
        },
      ],
      vocabulary: [
        {
          term: "Sensor de contacto",
          definition: "Un sensor que indica si lo están presionando o no, como un botón o un parachoques.",
        },
        {
          term: "Sensor de distancia",
          definition: "Un sensor que mide qué tan lejos está el objeto más cercano, normalmente en centímetros.",
        },
        {
          term: "Sensor de luz",
          definition: "Un sensor que mide qué tan claro u oscuro está, y da un número más alto cuando hay mucha luz.",
        },
        {
          term: "Sensor de color",
          definition: "Un sensor que lee el color de la superficie que tiene justo enfrente, como rojo, azul o blanco.",
        },
        {
          term: "Lectura del sensor",
          definition: "El número que te da un sensor en un momento dado, como 20 centímetros o un brillo de 47.",
        },
        {
          term: "Umbral",
          definition: "Un número de corte que tú eliges y que separa dos casos, como \"más cerca de 15 cm significa cerca\".",
        },
        {
          term: "Límite de detección",
          definition: "El punto a partir del cual un sensor ya no puede percibir, como un sensor de distancia que no lee más allá de unos 2 metros.",
        },
        {
          term: "Calibración",
          definition: "Ajustar o revisar un sensor para que sus lecturas sean correctas en este cuarto y con este robot.",
        },
        {
          term: "Ruido",
          definition: "Pequeños bailoteos en una lectura aunque nada cambie, que es la razón por la que se toman varias lecturas.",
        },
        {
          term: "Confiabilidad",
          definition: "Qué tanto puedes confiar en que un sensor te dé la misma lectura correcta cada vez.",
        },
        {
          term: "Ensayo",
          definition: "Una sola medición dentro de una prueba; normalmente se hacen varios ensayos y se comparan.",
        },
        {
          term: "Línea base",
          definition: "Una lectura inicial que tomas en una condición conocida y estable, para comparar con ella las demás lecturas.",
        },
      ],
      prerequisites: [
        {
          reason: "Los sensores se montan sobre la base móvil que construiste en la semana 2, para poder probar el robot en distintos puntos.",
        },
        {
          reason: "Leer un valor de sensor y reportarlo es una secuencia planeada de instrucciones exactas, que se enseñó en la semana 3.",
        },
      ],
      concepts: [
        {
          title: "Cuatro sentidos que puede tener un robot",
          body: [
            "Un robot percibe el mundo a través de sensores. Cuatro de los más comunes son el sensor de contacto (¿lo están presionando?), el de distancia (¿qué tan lejos está lo más cercano?), el de luz (¿qué tanta claridad hay?) y el de color (¿de qué color es la superficie?).",
            "Cada sensor mide una sola cosa. Un sensor de distancia no puede decir de qué color es algo, y un sensor de color no puede decir a qué distancia está. Elegir el sensor adecuado para cada trabajo es parte de la robótica.",
          ],
          examples: [
            "Contacto: el botón de un timbre",
            "Distancia: el pitido de reversa de un carro",
            "Luz: la pantalla de un teléfono que se atenúa en la oscuridad",
            "Color: una máquina que separa el reciclaje por color",
          ],
        },
        {
          title: "Una lectura es un número, no un sí o un no",
          body: [
            "La mayoría de los sensores no dicen solo \"sí\" o \"no\": dan un número al que se le llama lectura del sensor. Un sensor de distancia podría marcar 12 centímetros; uno de luz podría marcar un brillo de 47.",
            "Como es un número, la lectura cambia de a poquito conforme cambia el mundo. Si acercas una pared, el número de la distancia se hace más chico. Si el cuarto se ilumina, el número de la luz se hace más grande.",
          ],
          examples: [
            "Sensor de distancia: 12 cm, 30 cm, 85 cm",
            "Sensor de luz: de 10 (oscuro) hasta 90 (muy claro)",
            "El sensor de contacto es la excepción: normalmente marca presionado o no presionado",
          ],
        },
        {
          title: "Un umbral convierte los números en decisiones",
          body: [
            "Un umbral es un número de corte que tú eliges para separar dos casos. Si escoges 15 centímetros, cualquier lectura por debajo de 15 significa \"cerca\" y cualquier lectura por encima de 15 significa \"lejos\".",
            "El robot no puede escoger tu umbral por ti: lo encuentras observando las lecturas y eligiendo un valor que separe con claridad los casos que te importan. Esta semana solo encuentras y anotas umbrales; la próxima semana el robot los usará para reaccionar.",
          ],
          examples: [
            "Corte entre cerca y lejos en 15 cm",
            "Corte entre claro y oscuro en un brillo de 40",
            "Corte de un seguidor de línea entre la línea negra y el piso blanco",
          ],
        },
        {
          title: "Límites de detección: todo sensor tiene un alcance",
          body: [
            "Ningún sensor puede percibirlo todo. Un sensor de distancia deja de funcionar más allá de cierto alcance: puede leer bien hasta unos 2 metros y dar puras tonterías más allá. Ese punto más lejano en el que todavía percibe es su límite de detección.",
            "Los sensores también tienen un límite por lo cerca: pon una pared demasiado pegada a un sensor de distancia y la lectura se vuelve rara. Conocer los límites te dice dónde puedes confiar en el sensor y dónde no.",
          ],
          examples: [
            "Un sensor de distancia que no lee más allá de unos 2 m",
            "Un sensor de color que necesita la superficie muy cerca, casi tocándola",
            "Un sensor de luz confundido por una ventana muy luminosa",
          ],
        },
        {
          title: "Ruido: por qué una sola lectura no basta",
          body: [
            "Apunta un sensor de distancia a una pared que no se mueve y léela varias veces. Puedes obtener 30, 31, 30, 29, 31: el número baila un poco aunque nada haya cambiado. A ese bailoteo se le llama ruido.",
            "Por el ruido, una sola lectura te puede engañar. Quienes hacen ciencia y robótica toman varias lecturas y usan la de en medio o el promedio, que es mucho más confiable que un solo número.",
          ],
          examples: [
            "Lecturas de 30, 31, 30, 29, 31 sobre una pared quieta",
            "Un sensor de luz que parpadea cuando pasa una nube",
            "Tomar de 3 a 5 lecturas y compararlas",
          ],
        },
        {
          title: "Calibración y confiabilidad",
          body: [
            "Calibrar significa revisar o ajustar un sensor para que sus lecturas sean correctas en este cuarto y con este robot. Un sensor de luz lee distinto en un cuarto soleado que en uno oscuro, así que el mismo umbral no funciona en todas partes: lo calibras para el cuarto en el que estás.",
            "Un sensor que ya calibraste y probaste es confiable: puedes contar con que te dé siempre la misma respuesta correcta. La confiabilidad es lo que importa de verdad: un robot que percibe mal, actúa mal.",
          ],
          examples: [
            "Tomar una lectura \"oscura\" y una \"clara\" y poner el punto medio como umbral",
            "Volver a revisar el umbral de distancia después de cambiarse de cuarto",
            "Confirmar que el sensor de color distingue el rojo del azul sobre tus superficies reales",
          ],
        },
      ],
      materials: [
        {
          name: "Hoja de trabajo Bitácora de lecturas del sensor (imprimible)",
        },
        {
          name: "Cinta métrica o regla para fijar distancias conocidas",
        },
        {
          name: "Lápiz y papel para anotar las lecturas",
        },
        {
          name: "Un robot programable con sensor de contacto, distancia, luz o color",
        },
        {
          name: "Una pared, un libro o una caja para colocar a distancias medidas",
        },
        {
          name: "Una linterna y tarjetas de colores para las pruebas de luz y de color",
        },
        {
          name: "Computadora o tableta con el simulador del navegador",
        },
        {
          name: "Una venda para los ojos o una bufanda para la actividad del sensor humano",
        },
        {
          name: "Tarjetas en tonos claros y oscuros (o tiras en escala de grises) para clasificar",
        },
      ],
      activities: [
        {
          title: "Laboratorio de investigación de sensores",
          goal: "Medir cómo cambia la lectura de un sensor conforme cambia una condición, y encontrar un umbral que separe con claridad dos casos.",
          shared: [
            "Elige una condición para ir cambiando paso a paso (la distancia a una pared, el brillo o el color de la superficie) y lee el sensor en cada paso.",
            "Anota cada lectura en la bitácora. Luego observa los números y elige un umbral: un valor de corte que separe \"cerca de lejos\" o \"claro de oscuro\".",
            "Recuerda: esta semana el robot solo lee y reporta. Tú eres quien decide qué significan los números.",
          ],
          variants: {
            kit: {
              title: "Lee un sensor real en condiciones medidas",
              materials: [
                "Un robot programable con un sensor",
                "Cinta métrica o regla",
                "Una pared o una caja",
                "Hoja de trabajo Bitácora de lecturas del sensor",
              ],
              instructions: [
                "Monta el sensor y carga un programa corto que lea el sensor y muestre o reporte el valor (leer sensor, luego esperar, luego alto).",
                "Para un sensor de distancia: coloca una pared a 10 cm, 20 cm, 40 cm y 80 cm y anota la lectura en cada caso. Para un sensor de luz: lee el valor bajo una luz brillante, con la luz normal del cuarto, y tapado con la mano.",
                "Observa tus números y elige un umbral; por ejemplo, una distancia por debajo de la cual llamarías \"cerca\" a algo, o un brillo por debajo del cual lo llamarías \"oscuro\".",
                "Escribe tu umbral en la bitácora y una oración que explique por qué elegiste ese número.",
              ],
              safetyNotes: [
                "Mantén el robot sobre la mesa o el piso para que no se caiga mientras lees la pantalla.",
              ],
              expectedResult: "Una tabla de lecturas que claramente se hacen más chicas conforme la pared se acerca (o más grandes conforme hay más luz), y un umbral elegido que separa cerca de lejos.",
              successCriteria: [
                "Se registraron al menos cuatro lecturas en condiciones distintas",
                "Las lecturas cambian en una dirección que tiene sentido",
                "Se elige un valor de umbral y se justifica en una oración",
              ],
              troubleshooting: [
                {
                  problem: "La lectura brinca de un lado a otro y no se estabiliza",
                  fix: "Eso es ruido: toma tres lecturas en cada distancia y usa la de en medio.",
                },
                {
                  problem: "La lectura de distancia se queda atorada en un número grande, hagas lo que hagas",
                  fix: "Puede que estés más allá del límite de detección del sensor o apuntando al vacío; apúntalo directo a una pared plana a menos de un metro.",
                },
              ],
              extension: "Cámbiate a otro cuarto, vuelve a leer tus condiciones y comprueba si tu umbral todavía sirve o hay que recalibrarlo.",
            },
            simulator: {
              title: "Lee el sensor del simulador conforme cambian las condiciones",
              materials: [
                "Simulador en el navegador",
                "Hoja de trabajo Bitácora de lecturas del sensor",
              ],
              instructions: [
                "Abre el simulador y conduce el robot de modo que una pared (o una casilla de color o brillante) quede a distintas distancias o niveles de brillo.",
                "En cada posición, lee el valor del sensor en pantalla (leer sensor, esperar, alto) y anota el número en la bitácora.",
                "Estudia los números y elige un umbral que separe cerca de lejos, o claro de oscuro.",
                "Escribe el umbral y una oración que explique tu elección.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; toma un descanso de la pantalla si te cansan los ojos.",
              ],
              expectedResult: "Una tabla registrada en la que el valor del sensor del simulador cambia de a poquito junto con la condición, y un umbral elegido con buen criterio.",
              successCriteria: [
                "Se registraron al menos cuatro lecturas en condiciones distintas",
                "Las lecturas cambian en una dirección que tiene sentido",
                "Se elige un valor de umbral y se justifica en una oración",
              ],
              troubleshooting: [
                {
                  problem: "La lectura del simulador cambia un poquito cada vez, aunque el robot esté quieto",
                  fix: "Ese ruido está simulado a propósito: toma unas cuantas lecturas y usa el valor de en medio.",
                },
                {
                  problem: "No queda claro cuál número de la pantalla es el del sensor",
                  fix: "Busca el valor que cambia cuando acercas la pared: ese es el de la distancia.",
                },
              ],
              extension: "Sube el ruido simulado (o agrega una segunda pared) y comprueba si tu umbral sigue separando bien los casos.",
            },
            unplugged: {
              title: "Sé un sensor humano y produce lecturas",
              materials: [
                "Venda para los ojos o bufanda",
                "Tarjetas claras y oscuras",
                "Hoja de trabajo Bitácora de lecturas del sensor",
              ],
              instructions: [
                "Para una prueba de contacto o distancia: un estudiante se venda los ojos y estira la mano despacio mientras su compañero sostiene una tarjeta como si fuera una \"pared\". El \"sensor\" con los ojos vendados dice un número del 1 (lejos, no la alcanza a sentir) al 5 (tocándola) conforme la pared se acerca paso a paso.",
                "Para una prueba de luz: ordena un montón de tarjetas de la más oscura a la más clara y dale a cada una un número de brillo del 1 (la más oscura) al 5 (la más clara).",
                "Anota cada \"lectura\" en la bitácora, tal como un sensor de verdad reportaría un número.",
                "Elige un umbral: ¿de qué número en adelante cuenta como \"cerca\" o \"claro\"? Anótalo con una razón.",
              ],
              safetyNotes: [
                "Despeja el piso y guía al estudiante con los ojos vendados para que nadie se tropiece ni se golpee.",
              ],
              expectedResult: "Una bitácora de \"lecturas de sensor\" humanas que suben conforme la pared se acerca o la tarjeta es más clara, además de un umbral elegido.",
              successCriteria: [
                "Se registraron al menos cuatro lecturas en condiciones distintas",
                "Las lecturas cambian en una dirección que tiene sentido",
                "Se elige un valor de umbral y se justifica en una oración",
              ],
              troubleshooting: [
                {
                  problem: "Dos estudiantes dan números distintos para la misma tarjeta",
                  fix: "Eso se parece al ruido entre sensores: pónganse de acuerdo en una escala común y vuelvan a leer, que es una forma de calibración.",
                },
                {
                  problem: "Todo saca el mismo número",
                  fix: "Separa más las condiciones (una pared mucho más cerca, una tarjeta mucho más oscura) para que las lecturas se distingan bien.",
                },
              ],
              extension: "Cambien de \"sensor\" y vean si otra persona da las mismas lecturas; comenten por qué importa la calibración.",
            },
          },
        },
        {
          title: "Reto de calibración y umbral",
          goal: "Lidiar con el ruido tomando varias lecturas y luego calibrar un umbral de claro u oscuro (o cerca o lejos) que funcione de forma confiable en este cuarto.",
          shared: [
            "Elige una condición estable y toma varias lecturas de lo mismo sin cambiar nada; fíjate cuánto baila el número. Ese bailoteo es el ruido.",
            "Toma una lectura en una condición claramente \"baja\" y otra en una claramente \"alta\" (oscuro contra claro, o cerca contra lejos). Pon tu umbral a la mitad para que separe limpiamente las dos.",
            "Pon a prueba tu umbral: comprueba que las lecturas de la condición baja caigan de un lado y las de la condición alta del otro. Si no, ajústalo: eso es calibrar.",
          ],
          variants: {
            kit: {
              title: "Calibra un umbral en el sensor real",
              materials: [
                "Un robot programable con sensor de luz o de distancia",
                "Tarjetas de colores o de distintos tonos, o una pared",
                "Hoja de trabajo Bitácora de lecturas del sensor",
              ],
              instructions: [
                "Lee cinco veces el mismo objetivo quieto y anota los cinco números para ver el ruido.",
                "Lee tres veces una superficie claramente \"oscura\" (o una pared lejana), y luego tres veces una claramente \"clara\" (o una pared cercana).",
                "Pon tu umbral justo a la mitad entre el promedio oscuro y el promedio claro.",
                "Pruébalo: muéstrale al sensor varias superficies oscuras y claras y confirma que cada una cae del lado correcto de tu umbral. Ajústalo si alguna cae del lado equivocado.",
              ],
              safetyNotes: [
                "Mantén los cables lejos de las ruedas mientras mueves el robot para probar superficies.",
              ],
              expectedResult: "Un umbral calibrado que clasifica correctamente las superficies oscuras y claras (o cercanas y lejanas) en este cuarto, a lo largo de varias comprobaciones.",
              successCriteria: [
                "Se registraron cinco lecturas de ruido",
                "Se registraron los promedios oscuro y claro",
                "Se fijó un umbral entre ellos",
                "Las superficies de prueba se clasifican bien, o el umbral se ajusta hasta lograrlo",
              ],
              troubleshooting: [
                {
                  problem: "A veces una superficie cae del lado equivocado",
                  fix: "Puede que las dos condiciones estén demasiado juntas, o que el ruido sea grande; mueve el umbral o usa superficies con más contraste.",
                },
                {
                  problem: "Todo el conjunto de lecturas se corrió desde hace rato",
                  fix: "Cambió la luz del cuarto: recalibra ahora mismo, que es justamente por lo que la calibración importa.",
                },
              ],
              extension: "Lleva el robot a un lugar más soleado o más oscuro y calibra un umbral nuevo para ese cuarto.",
            },
            simulator: {
              title: "Calibra un umbral en el simulador",
              materials: [
                "Simulador en el navegador con brillo o ruido ajustables",
                "Hoja de trabajo Bitácora de lecturas del sensor",
              ],
              instructions: [
                "Lee cinco veces el sensor del simulador sobre una casilla quieta para ver el ruido simulado, y anota los números.",
                "Lee tres veces una casilla oscura y tres veces una casilla clara; saca el promedio de cada grupo.",
                "Pon tu umbral entre los dos promedios.",
                "Recorre una mezcla de casillas oscuras y claras, leyendo cada una, y confirma que se clasifican bien. Ajusta el umbral si alguna queda del lado equivocado.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; ve guardando tu bitácora conforme avanzas.",
              ],
              expectedResult: "Un umbral que separa correctamente las casillas oscuras y claras del simulador a lo largo de varias comprobaciones.",
              successCriteria: [
                "Se registraron cinco lecturas de ruido",
                "Se registraron los promedios oscuro y claro",
                "Se fijó un umbral entre ellos",
                "Las casillas de prueba se clasifican bien, o el umbral se ajusta hasta lograrlo",
              ],
              troubleshooting: [
                {
                  problem: "Las casillas se siguen clasificando mal aunque el umbral esté a la mitad",
                  fix: "Sube el contraste entre las casillas o baja el ruido simulado, y vuelve a calibrar.",
                },
                {
                  problem: "Cuesta trabajo sacar el promedio",
                  fix: "Suma las tres lecturas y divide entre tres, o simplemente usa la lectura de en medio de las tres.",
                },
              ],
              extension: "Sube el ruido simulado y averigua qué tan separadas tienen que estar las condiciones para que el umbral siga siendo confiable.",
            },
            unplugged: {
              title: "Calibra un clasificador humano de claro u oscuro",
              materials: [
                "Un juego de tarjetas en escala de grises o claras y oscuras",
                "Venda para los ojos (opcional)",
                "Hoja de trabajo Bitácora de lecturas del sensor",
              ],
              instructions: [
                "Pide a un estudiante que califique la misma tarjeta cinco veces sin ver sus respuestas anteriores; fíjense en las pequeñas diferencias (el ruido).",
                "Califiquen tres veces una tarjeta claramente oscura y tres veces una claramente clara, y saquen el promedio de cada una.",
                "Elijan un número de umbral entre el promedio oscuro y el claro: de ahí para arriba es \"claro\", por debajo es \"oscuro\".",
                "Revuelvan las tarjetas y clasifíquenlas usando solo el umbral, y luego comprueben a simple vista. Ajusten el umbral si alguna tarjeta quedó mal clasificada.",
              ],
              safetyNotes: [
                "No hay riesgos; mantengan despejada la zona de trabajo.",
              ],
              expectedResult: "Un número de umbral que le permite a un \"sensor\" humano clasificar correctamente un montón de tarjetas revueltas en claras y oscuras.",
              successCriteria: [
                "Se registraron cinco lecturas de ruido",
                "Se registraron los promedios oscuro y claro",
                "Se fijó un umbral entre ellos",
                "Las tarjetas revueltas se clasifican bien, o el umbral se ajusta hasta lograrlo",
              ],
              troubleshooting: [
                {
                  problem: "Dos personas fijan umbrales distintos",
                  fix: "Por eso importa la calibración: pónganse de acuerdo en una sola escala y un solo umbral para todo el grupo.",
                },
                {
                  problem: "Las tarjetas intermedias son difíciles de clasificar",
                  fix: "Los valores intermedios están cerca del umbral; eso es normal, anótenlos como los casos más difíciles.",
                },
              ],
              extension: "Agreguen unas cuantas tarjetas grises intermedias, difíciles, y comenten por qué a los sensores les cuesta trabajo justo en el umbral.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de medir: si un sensor de distancia marca 20 cm cuando la pared está a 20 cm, ¿qué predices que va a marcar cuando muevas la pared a 40 cm? ¿Un número más grande o más chico, y más o menos cuál?",
          howToCheck: "Coloca la pared a 40 cm, lee el sensor tres veces y compara la lectura de en medio con tu predicción.",
        },
        {
          prompt: "Predice: si lees cinco veces seguidas la misma pared quieta, ¿vas a obtener exactamente el mismo número cada vez?",
          howToCheck: "Toma cinco lecturas sin mover nada y observa si coinciden exactamente o si bailan un poco (ruido).",
        },
      ],
      testRecords: [
        {
          title: "Tabla de distancia contra lectura",
          instructions: "Coloca la pared (o fija la condición) en cada distancia de la lista, toma la lectura del sensor y anota el número. Si baila, usa la de en medio de tres lecturas.",
          columns: [
            "Distancia fijada (cm)",
            "Lectura del sensor",
            "¿Cerca o lejos?",
          ],
          measure: "La lectura del sensor en cada distancia fijada, y si dirías que es cerca o lejos",
        },
        {
          title: "Comprobación de ruido con tres ensayos",
          instructions: "Elige una condición y no la cambies. Lee el sensor tres veces seguidas y anota cada lectura para ver cuánto baila.",
          columns: [
            "Ensayo",
            "Lectura del sensor",
            "Diferencia con el ensayo 1",
          ],
          measure: "Cuánto cambia la lectura entre ensayos cuando nada está cambiando (el ruido)",
        },
      ],
      knowledgeCheck: {
        instructions: "Responde estas preguntas para comprobar que entiendes las lecturas de sensores, los umbrales, el ruido y la calibración.",
        questions: [
          {
            prompt: "Relaciona cada sensor con lo que mide.",
            pairs: [
              {
                left: "Sensor de distancia",
                right: "Qué tan lejos está algo",
              },
              {
                left: "Sensor de luz",
                right: "Qué tanta claridad hay",
              },
              {
                left: "Sensor de contacto",
                right: "Si algo está presionado",
              },
              {
                left: "Sensor de color",
                right: "De qué color es una superficie",
              },
            ],
            explanation: "Cada sensor mide una sola cosa: distancia, nivel de luz, contacto o color.",
          },
          {
            prompt: "Con tus propias palabras, ¿qué es un umbral de sensor?",
            sampleAnswer: "Un umbral es un número de corte. Si la lectura queda de un lado, el robot decide una cosa, y si queda del otro, decide otra, como \"más cerca de 15 cm significa que hay una pared cerca\".",
            keywords: [
              "corte",
              "valor",
              "numer",
              "decid",
              "cerca",
              "lejos",
              "linea",
            ],
            explanation: "Un umbral es un valor de corte que convierte el número de un sensor en una decisión de sí o no.",
          },
          {
            prompt: "¿Qué es una lectura de sensor?",
            options: [
              {
                text: "El número que te da un sensor en un momento dado",
                feedback: "Correcto: una lectura es un número medido, como 20 cm o un brillo de 47.",
              },
              {
                text: "El nombre del sensor",
                feedback: "El nombre te dice de qué tipo es; la lectura es el número que mide.",
              },
              {
                text: "El color del robot",
                feedback: "El color del robot no tiene nada que ver con lo que mide un sensor.",
              },
              {
                text: "Un comando que mueve al robot",
                feedback: "Eso es un comando para un actuador; una lectura es una entrada, no una acción.",
              },
            ],
            explanation: "Una lectura de sensor es el número que reporta un sensor en un momento dado, y cambia de a poquito conforme cambia el mundo.",
          },
          {
            prompt: "Un sensor de distancia marca 30 cm frente a una pared y 12 cm frente a una pared más cercana. ¿Qué te dice esto sobre cómo funciona la lectura?",
            options: [
              {
                text: "La lectura se hace más grande cuando las cosas se acercan",
                feedback: "Es al revés: lo que está más cerca da un número de distancia más chico.",
              },
              {
                text: "La lectura se hace más chica cuando las cosas se acercan",
                feedback: "Correcto: un objeto más cercano significa menos centímetros, así que una lectura más chica.",
              },
              {
                text: "La lectura es al azar y no significa nada",
                feedback: "Cambia en una dirección clara y con sentido según la distancia.",
              },
              {
                text: "El sensor está descompuesto",
                feedback: "Así es exactamente como se comporta un sensor de distancia que funciona bien.",
              },
            ],
            explanation: "La lectura de un sensor de distancia se achica conforme el objeto se acerca, y por eso puedes convertirla en una decisión de cerca o lejos.",
          },
          {
            prompt: "Quieres que el robot trate como \"cerca\" todo lo que esté a menos de 15 cm. ¿Cómo se llama ese número 15?",
            options: [
              {
                text: "Un límite de detección",
                feedback: "Un límite de detección es lo más lejos que puede percibir un sensor, no el corte que tú elegiste.",
              },
              {
                text: "Ruido",
                feedback: "El ruido es el pequeño bailoteo de las lecturas, no un valor de corte.",
              },
              {
                text: "Un umbral",
                feedback: "Correcto: un umbral es el número de corte que eliges para separar cerca de lejos.",
              },
              {
                text: "Un actuador",
                feedback: "Un actuador es una pieza que actúa; 15 cm es un valor, no una pieza.",
              },
            ],
            explanation: "Un umbral es un valor de corte que tú eliges y que separa dos casos, como cerca frente a lejos o claro frente a oscuro.",
          },
          {
            prompt: "Lees cinco veces la misma pared quieta y obtienes 30, 31, 30, 29, 31. ¿Por qué bailan los números?",
            options: [
              {
                text: "La pared se sigue moviendo",
                feedback: "La pared no se mueve; el bailoteo ocurre aunque nada cambie.",
              },
              {
                text: "Por el ruido, así que se toman varias lecturas",
                feedback: "Correcto: el ruido hace que las lecturas bailen un poco, así que lees varias y usas la de en medio.",
              },
              {
                text: "El umbral está mal",
                feedback: "Un umbral es un corte que tú eliges; no hace que las lecturas bailen.",
              },
              {
                text: "Al sensor se le acabó la batería",
                feedback: "Un sensor sin batería no leería nada; los pequeños bailoteos son ruido normal.",
              },
            ],
            explanation: "El ruido es el bailoteo pequeño y normal de las lecturas aunque nada cambie, así que en robótica se toman varias lecturas y se usa la de en medio o el promedio.",
          },
          {
            prompt: "Tu umbral de claro u oscuro funcionó en el salón, pero falla en un cuarto soleado. ¿Qué deberías hacer?",
            options: [
              {
                text: "Darte por vencido: los sensores de luz no sirven afuera",
                feedback: "Los sensores de luz funcionan bien; solo hay que ajustarlos a la nueva luz.",
              },
              {
                text: "Calibrar el sensor para el cuarto nuevo y fijar un umbral nuevo",
                feedback: "Correcto: la calibración ajusta tus lecturas y tu umbral a la luz de este cuarto.",
              },
              {
                text: "Hacer que el robot avance más rápido",
                feedback: "La velocidad no tiene nada que ver con leer bien la luz.",
              },
              {
                text: "Ponerle más ruedas",
                feedback: "Las ruedas no cambian cómo un sensor de luz mide el brillo.",
              },
            ],
            explanation: "El mismo umbral no funciona en todos los cuartos, así que calibras el sensor a la nueva luz y eliges un umbral nuevo que separe de forma confiable lo claro de lo oscuro.",
          },
        ],
      },
      reflection: [
        {
          prompt: "¿Cuándo te dio tu sensor una lectura inesperada, y qué pudo haberla causado?",
        },
        {
          prompt: "Leíste varias veces un objeto quieto y obtuviste números un poco distintos. ¿Por qué pasa eso, y qué hiciste al respecto?",
        },
        {
          prompt: "¿Por qué un robot que percibe perfecto en un cuarto puede necesitar una nueva calibración en otro cuarto?",
        },
      ],
      journalPrompts: [
        {
          prompt: "Registra las lecturas de tu sensor en todas las condiciones que probaste y el umbral que elegiste.",
        },
        {
          prompt: "Anota tu número de umbral y una oración que explique por qué lo escogiste.",
        },
        {
          prompt: "Anota cuánto bailaron tus lecturas cuando nada cambiaba, y cuántas lecturas tomaste.",
        },
      ],
      savedPrograms: [
        {
          title: "Reto de alto por sensor",
          description: "Programa al robot para que avance mientras vigila su sensor de distancia y luego se detenga en la casilla justo antes de la pared, usando el umbral que encontraste. Haz tres ensayos, ajusta la velocidad o el umbral entre uno y otro, y explica tu ajuste final en las notas.",
        },
      ],
      simulatorMissions: [
        {
          title: "Lee un sensor en distintas condiciones",
          objective: "Conduce el robot para que la pared quede a distintas distancias, lee el sensor en cada una y anota los valores sin hacer que el robot reaccione.",
          successCriteria: [
            "Se tomaron al menos tres lecturas del sensor a distintas distancias",
            "Las lecturas cambian en una dirección que tiene sentido",
            "No se usaron bloques de condición ni de repetición: el robot solo lee y reporta",
          ],
        },
        {
          title: "Encuentra un umbral de claro y oscuro",
          objective: "Lee el sensor sobre casillas oscuras y claras y registra suficientes valores para elegir un umbral que las separe.",
          successCriteria: [
            "Se registraron lecturas oscuras y claras",
            "Se eligió un valor de umbral entre ellas",
            "El umbral separa correctamente las casillas registradas",
          ],
        },
        {
          title: "Detente antes de la pared",
          objective: "Haz avanzar al robot y usa el sensor de distancia para detenerlo en la casilla justo antes de la pared, y luego avisa que la misión está completa.",
          successCriteria: [
            "El robot se detiene en la casilla justo antes de la pared",
            "El sensor de distancia decide cuándo detenerse",
            "El robot avisa que la misión está completa y no choca con la pared",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Cuatro sentidos y qué es una lectura",
          focus: "Sensores de contacto, distancia, luz y color; una lectura es un número, no un sí o no.",
        },
        {
          title: "Predice las lecturas",
          focus: "Adivinar cómo cambia una lectura con la distancia, y si una pared quieta da el mismo número dos veces.",
        },
        {
          title: "Laboratorio de investigación de sensores",
          focus: "Leer un sensor en distintas condiciones y encontrar un umbral.",
        },
        {
          title: "Reto de calibración y umbral",
          focus: "Lidiar con el ruido y luego calibrar un umbral confiable para este cuarto.",
        },
        {
          title: "Reto de alto por sensor",
          focus: "Programar al robot para que avance y use el sensor de distancia para detenerse antes de la pared; hacer tres ensayos y afinar el umbral.",
        },
        {
          title: "Comprobación de conocimientos",
          focus: "Cinco preguntas sobre lecturas, umbrales, ruido y calibración.",
        },
        {
          title: "Reflexión",
          focus: "Escribir sobre los umbrales, el ruido y por qué importa la calibración.",
        },
      ],
      safetyNotes: [
        {
          text: "Mantén el robot sobre una superficie estable y cuídate de las ruedas al moverlo entre los puntos de prueba.",
        },
        {
          text: "Guía a quien haga de \"sensor humano\" con los ojos vendados y despeja el piso para que nadie se tropiece.",
        },
        {
          text: "No apuntes la linterna directo a los ojos de nadie cuando pruebes los sensores de luz.",
        },
        {
          text: "Guarda tu bitácora de lecturas con frecuencia para que al recargar el navegador no se pierdan tus datos.",
        },
      ],
      printableResources: [
        {
          title: "Bitácora de lecturas del sensor",
          description: "Tablas para registrar lecturas de sensores en distintas condiciones, una comprobación de ruido con tres ensayos y el umbral elegido.",
        },
        {
          title: "Página de umbral y calibración",
          description: "Espacio para anotar lecturas, calcular promedios y escribir y justificar un umbral calibrado.",
        },
        {
          title: "Guía docente de la semana 4",
          description: "Preparación, conducción de la clase, ideas equivocadas frecuentes y preguntas para la lección de lectura de sensores y calibración.",
        },
      ],
      completion: {
        summary: "Termina la semana 4 leyendo un sensor en distintas condiciones, registrando los valores, eligiendo y calibrando un umbral, y aprobando la comprobación de conocimientos.",
        requirements: [
          {
            label: "Registrar lecturas de sensores en distintas condiciones en el Laboratorio de investigación de sensores",
          },
          {
            label: "Elegir y calibrar un umbral en el Reto de calibración y umbral",
          },
          {
            label: "Obtener al menos 4 de 5 en la comprobación de conocimientos",
          },
          {
            label: "Escribir tu reflexión",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprime la Bitácora de lecturas del sensor para cada estudiante o pareja.",
          "Prepara un punto medido con una cinta métrica marcada a 10, 20, 40 y 80 cm, y una pared o caja para colocar ahí.",
          "Si usas kits, monta un sensor y deja precargado un programa corto de leer y reportar; si usas el simulador, ábrelo en cada dispositivo; para la ruta sin dispositivos, prepara una venda para los ojos y un juego de tarjetas claras y oscuras.",
        ],
        prep: [
          "Haz tú primero el laboratorio de sensores para conocer las lecturas reales y los límites de detección de tu sensor.",
          "Toma con anticipación cinco lecturas de un objeto quieto para poder mostrarles a los estudiantes cómo se ve el ruido.",
          "Decide cuáles serán las dos condiciones bien diferenciadas (oscuro contra claro, o cerca contra lejos) que usarás en el reto de calibración.",
        ],
        facilitation: [
          "Empieza con los cuatro sensores y con la idea principal de que una lectura es un número y no un sí o no, antes de medir nada.",
          "Pide a los estudiantes que primero predigan las lecturas, y luego haz el Laboratorio de investigación de sensores anotando cada valor.",
          "Insiste en que esta semana el robot solo lee y reporta: son los estudiantes, y no el robot, quienes deciden qué significan los números; las reacciones automáticas llegan la próxima semana.",
          "Haz el Reto de calibración y umbral, mostrando el ruido con lecturas repetidas y fijando el umbral entre dos condiciones bien diferenciadas.",
        ],
        commonMisconceptions: [
          "\"Un sensor da un sí o un no\": la mayoría da un número que cambia de a poquito junto con el mundo.",
          "\"Con una lectura basta\": por el ruido conviene tomar varias y usar la de en medio o el promedio.",
          "\"El mismo umbral sirve en todas partes\": la luz y las superficies cambian de un cuarto a otro, así que se calibra para el lugar donde estás.",
          "\"El sensor está descompuesto porque el número baila\": un bailoteo pequeño es ruido normal, no una falla.",
        ],
        questionsToAsk: [
          "¿Qué número leíste, y qué significa: cerca o lejos, claro u oscuro?",
          "¿Por qué tomaste más de una lectura en el mismo punto?",
          "¿Dónde fijaste tu umbral, y cómo lo decidiste?",
          "¿Tu umbral seguiría funcionando en un cuarto más iluminado? ¿Cómo lo comprobarías?",
        ],
        easierVersion: "Usa un solo sensor y dos condiciones bien diferenciadas (una pared cerca y una lejos), y fijen el umbral entre todos.",
        harderVersion: "Pide a los estudiantes que comparen dos sensores, que expresen el ruido como un rango y que calibren un umbral que funcione en dos cuartos distintos.",
      },
      nextWeek: {
        teaser: "La próxima semana el robot deja de solo reportar números y empieza a reaccionar a ellos por su cuenta, usando ciclos y condiciones con los umbrales que encontraste.",
        prepare: [
          "Guarda los umbrales que calibraste esta semana: los vas a usar para que el robot decida la próxima semana.",
          "Carga tu kit o guarda el simulador en tus marcadores.",
          "Piensa en una regla sencilla como \"si la pared está más cerca que mi umbral, entonces gira\": eso es lo que vas a construir.",
        ],
      },
    },
    {
      title: "Hacer que los robots reaccionen",
      subtitle: "Combina sensores con ciclos y condiciones para que un robot reaccione al mundo por su cuenta.",
      summary: "Esta es la gran semana de programación. Los estudiantes toman los sensores de la semana 4 y las secuencias de la semana 3 y los combinan con ciclos y condiciones para que un robot pueda reaccionar solo. Aprenden que un ciclo repite pasos, que un ciclo infinito se repite hasta que alguien lo detiene, y que un ciclo de repetir-hasta se ejecuta hasta que una condición se vuelve verdadera. Conocen las condiciones y las decisiones booleanas (verdadero o falso), y luego usan si y si/si no para elegir acciones. Programan la evasión de obstáculos (repetir en ciclo, leer el sensor de distancia y, si hay algo cerca, girar) y exploran el seguimiento de línea revisando un sensor de luz o de color para dirigirse y mantenerse sobre una línea.",
      mainMission: "Programar un robot que reaccione por su cuenta: que repita en ciclo, revise un sensor y use si/si no para esquivar obstáculos o seguir una línea.",
      estimatedTime: "70 a 85 minutos",
      learningGoals: [
        {
          text: "Explicar cómo repiten pasos un ciclo, un ciclo infinito y un ciclo de repetir-hasta",
        },
        {
          text: "Describir una condición como una revisión que es verdadera o falsa (booleana)",
        },
        {
          text: "Usar si para ejecutar pasos solo cuando una condición es verdadera, y si/si no para elegir entre dos acciones",
        },
        {
          text: "Programar la evasión de obstáculos repitiendo en ciclo, leyendo un sensor de distancia y girando cuando algo está cerca",
        },
        {
          text: "Explicar cómo el seguimiento de línea revisa una y otra vez un sensor de luz o de color para dirigirse y mantenerse sobre una línea",
        },
      ],
      vocabulary: [
        {
          term: "Ciclo",
          definition: "Un bloque que repite uno o varios pasos en lugar de que los escribas una y otra vez.",
        },
        {
          term: "Ciclo infinito",
          definition: "Un ciclo que sigue repitiendo sus pasos una y otra vez hasta que detienes el programa.",
        },
        {
          term: "Repetir-hasta",
          definition: "Un ciclo que repite sus pasos hasta que una condición se vuelve verdadera, y entonces se detiene y sigue adelante.",
        },
        {
          term: "Condición",
          definition: "Una revisión sobre el mundo, como \"¿está cerca la pared?\", que siempre es verdadera o falsa.",
        },
        {
          definition: "Un bloque que ejecuta sus pasos solo cuando su condición es verdadera, y los salta cuando es falsa.",
        },
        {
          term: "Si/si no",
          definition: "Un bloque que ejecuta un conjunto de pasos cuando la condición es verdadera y otro conjunto distinto cuando es falsa.",
        },
        {
          term: "Booleano",
          definition: "Un valor que solo puede ser una de dos cosas: verdadero o falso. Las condiciones dan una respuesta booleana.",
        },
        {
          term: "Evasión de obstáculos",
          definition: "Un comportamiento en el que el robot repite en ciclo, lee un sensor de distancia y se aparta cuando algo está cerca.",
        },
        {
          term: "Seguimiento de línea",
          definition: "Un comportamiento en el que el robot revisa constantemente un sensor de luz o de color y se dirige para mantenerse sobre una línea marcada.",
        },
        {
          term: "Comportamiento reactivo",
          definition: "Cuando un robot cambia lo que hace según lo que percibe, en tiempo real, en lugar de seguir una lista fija.",
        },
      ],
      prerequisites: [
        {
          reason: "Reaccionar sigue siendo ejecutar un programa, así que se apoya en las secuencias de instrucciones exactas de la semana 3.",
        },
        {
          reason: "Un robot solo puede reaccionar a lo que puede percibir, así que esta semana hacen falta los sensores de distancia, luz y color de la semana 4.",
        },
      ],
      concepts: [
        {
          title: "Ciclos: repetir sin volver a escribir",
          body: [
            "En la semana 3 escribiste todos los pasos uno tras otro. Eso funciona, pero si quieres que el robot revise su sensor cien veces, no vas a querer escribir el mismo paso cien veces. Un ciclo es un bloque que repite los pasos por ti.",
            "Un ciclo de repetición sencillo ejecuta sus pasos un número fijo de veces, como \"repite 4 veces: avanza, gira a la derecha\" para hacer un cuadrado. El ciclo lleva la cuenta, así que tu programa se mantiene corto.",
          ],
          examples: [
            "Repetir 4 veces para recorrer un cuadrado",
            "Repetir 3 veces para tocar una puerta",
            "Repetir 10 veces para avanzar poquito a poquito y revisar",
          ],
        },
        {
          title: "Ciclos infinitos y ciclos de repetir-hasta",
          body: [
            "Un ciclo infinito repite sus pasos una y otra vez y nunca se detiene solo: sigue hasta que detienes el programa. Los robots usan ciclos infinitos para no dejar de observar el mundo, como \"por siempre: lee el sensor y reacciona\".",
            "Un ciclo de repetir-hasta es distinto: repite sus pasos hasta que una condición se vuelve verdadera, y entonces se detiene y sigue adelante. \"Repite hasta que la pared esté cerca: avanza\" significa seguir avanzando, pero en cuanto la pared esté cerca, dejar de repetir.",
          ],
          examples: [
            "Por siempre: no dejar de revisar el sensor de distancia",
            "Repite hasta encontrar la línea: avanza",
            "Repite hasta que se apriete el botón: espera",
          ],
        },
        {
          title: "Las condiciones son verdaderas o falsas (booleanas)",
          body: [
            "Una condición es una pregunta sobre el mundo que solo se puede responder con sí o no; en programación decimos verdadero o falso. A un valor que solo puede ser verdadero o falso se le llama booleano.",
            "\"¿La pared está a menos de 10 cm?\" es una condición. Ahorita puede ser verdadera; un segundo después, cuando el robot se mueva, puede ser falsa. Las condiciones son la forma en que un robot convierte la lectura de un sensor en un sí o no bien claro sobre el que puede actuar.",
          ],
          examples: [
            "¿La pared está cerca? -> verdadero o falso",
            "¿El sensor está sobre la línea oscura? -> verdadero o falso",
            "¿El botón está apretado? -> verdadero o falso",
          ],
        },
        {
          title: "Si y si/si no: elegir qué hacer",
          body: [
            "Un bloque si ejecuta sus pasos solo cuando su condición es verdadera. \"Si la pared está cerca, gira a la derecha\" significa que el robot gira únicamente cuando de verdad hay una pared cerca; si no, se salta el giro.",
            "Un bloque si/si no elige entre dos acciones: ejecuta un conjunto de pasos cuando la condición es verdadera y otro distinto cuando es falsa. \"Si la pared está cerca, gira a la derecha; si no, avanza\" significa que el robot siempre hace una cosa o la otra, según lo que perciba.",
          ],
          examples: [
            "Si se perdió la línea, gira para volver a encontrarla",
            "Si/si no: pared cerca -> gira, si no -> avanza",
            "Si el objeto es rojo, gira hacia el contenedor rojo",
          ],
        },
        {
          title: "Evasión de obstáculos = ciclo + sensor + si/si no",
          body: [
            "Ahora junta todo. La evasión de obstáculos es un ciclo infinito que lee el sensor de distancia y usa si/si no para decidir: si hay algo cerca, apártate; si no, sigue avanzando. Como el ciclo se repite muchas veces por segundo, el robot reacciona en el instante en que aparece un obstáculo.",
            "Este es el patrón que hay detrás de los carros que se estacionan solos y de las aspiradoras robot: percibir, decidir y actuar, una y otra vez, sin parar.",
          ],
          examples: [
            "Por siempre: lee la distancia; si está cerca gira, si no avanza",
            "Una aspiradora robot dando tumbos por un cuarto",
            "Un vehículo explorador rodeando una roca",
          ],
        },
        {
          title: "Seguimiento de línea: revisar sin parar y corregir el rumbo",
          body: [
            "El seguimiento de línea usa un sensor de luz o de color apuntando al piso. Una línea oscura refleja menos luz que un piso claro, así que el sensor puede distinguir \"sobre la línea\" de \"fuera de la línea\". El robot revisa una y otra vez, sin parar, y corrige el rumbo para mantenerse sobre la línea.",
            "Una regla sencilla: si el sensor ve la línea, curva hacia un lado; si no, curva de regreso hacia el otro. El robot nunca avanza perfectamente derecho: va zigzagueando por la orilla de la línea, corrigiendo todo el tiempo. Ese revisar y corregir constante es el comportamiento reactivo.",
          ],
          examples: [
            "Robots de almacén que siguen cintas pegadas en el piso",
            "Un carrito de fábrica sobre una línea pintada",
            "Repetir hasta la marca final: seguir la línea",
          ],
        },
      ],
      materials: [
        {
          name: "Hoja de planeación del programa de bloques (imprimible)",
        },
        {
          name: "Juego de tarjetas de decisión si/si no (imprimible)",
        },
        {
          name: "Registro de pruebas de reacción (imprimible)",
        },
        {
          name: "Un kit de robótica programable con sensor de distancia y sensor de luz o de color",
        },
        {
          name: "Cajas o libros para armar una pista pequeña de obstáculos",
        },
        {
          name: "Cinta oscura (o una línea impresa) sobre un piso claro para el seguimiento de línea",
        },
        {
          name: "Computadora o tableta con el simulador del navegador",
        },
        {
          name: "Tarjetas de programa (por siempre, si, si/si no, avanza, gira, leer sensor, alto) y una cuadrícula en el piso o una línea de cinta",
        },
        {
          name: "Un compañero que haga de robot y siga las tarjetas",
        },
      ],
      activities: [
        {
          title: "Programa de evasión de obstáculos",
          goal: "Programar un robot para que repita en ciclo, lea un sensor de distancia y use si/si no para girar cuando algo está cerca y avanzar cuando el camino está libre.",
          shared: [
            "El patrón siempre es el mismo: ciclo infinito, leer el sensor de distancia, y luego si/si no: si hay algo cerca, gira; si no, avanza.",
            "Primero decide tu regla de cercanía (por ejemplo, \"a menos de 10 cm cuenta como cerca\"). Después arma el ciclo para que el robot siga reaccionando todo el tiempo que esté funcionando.",
          ],
          variants: {
            kit: {
              title: "Esquiva obstáculos reales con un robot de kit",
              materials: [
                "Un kit de robótica con sensor de distancia",
                "Cajas o libros para una pista de obstáculos",
                "Hoja de planeación del programa de bloques",
              ],
              instructions: [
                "Acomoda algunos obstáculos (cajas o libros) con huecos por los que el robot pueda pasar.",
                "Arma un ciclo infinito. Dentro de él, lee el sensor de distancia.",
                "Agrega un si/si no: si la distancia es menor que tu valor de cercanía, gira; si no, avanza un poco.",
                "Ejecútalo y observa al robot repetir el ciclo, percibir y esquivar los obstáculos por su cuenta.",
              ],
              safetyNotes: [
                "Mantén los dedos lejos de las ruedas mientras el robot avanza.",
                "Dale al robot un piso despejado, sin cables ni escalones.",
              ],
              expectedResult: "El robot avanza por su cuenta y se aparta cada vez que un obstáculo se acerca, sin que nadie lo maneje.",
              successCriteria: [
                "El programa usa un ciclo infinito (o de repetición)",
                "El programa lee el sensor de distancia dentro del ciclo",
                "El programa usa si/si no para girar cuando hay algo cerca y avanzar cuando está libre",
                "El robot esquiva al menos un obstáculo por sí solo",
              ],
              troubleshooting: [
                {
                  problem: "El robot se va derechito contra los obstáculos",
                  fix: "Revisa que el si de verdad esté leyendo el sensor, y que tu valor de cercanía sea mayor que la lectura cuando hay una pared justo enfrente.",
                },
                {
                  problem: "El robot gira sobre su propio eje sin parar",
                  fix: "Puede que tu valor de cercanía sea tan grande que siempre crea que hay algo cerca; bájalo, o agrega un avance corto en el si no.",
                },
              ],
              extension: "Agrega una segunda regla con si/si no para que el robot a veces gire a la izquierda y otras a la derecha, y así pueda salir de las esquinas.",
            },
            simulator: {
              title: "Esquiva muros sobre una cuadrícula en el simulador",
              materials: [
                "Simulador en el navegador",
                "Hoja de planeación del programa de bloques",
              ],
              instructions: [
                "Abre la misión de la pista de obstáculos, con muros sobre la cuadrícula.",
                "Arrastra un ciclo infinito al área de trabajo y pon dentro un bloque de leer sensor (distancia).",
                "Agrega un si/si no: si hay un muro cerca al frente, gira a la izquierda (o a la derecha); si no, avanza.",
                "Ejecuta la misión y observa cómo el robot repite el ciclo y va sorteando los muros hasta llegar a la meta.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; toma un descanso de la pantalla si te cansan los ojos.",
              ],
              expectedResult: "El robot del simulador sigue avanzando y gira cada vez que detecta un muro adelante, abriéndose paso por la cuadrícula por su cuenta.",
              successCriteria: [
                "El programa usa un ciclo infinito",
                "El programa tiene un bloque de leer sensor dentro del ciclo",
                "El programa usa si/si no para girar cuando un muro está cerca y avanzar cuando está libre",
                "El robot llega a la meta sin que nadie lo maneje",
              ],
              troubleshooting: [
                {
                  problem: "El robot se sale de la cuadrícula o se estrella contra un muro",
                  fix: "Asegúrate de que el leer sensor y el si/si no estén dentro del ciclo, no después de él, para que la revisión ocurra en cada paso.",
                },
                {
                  problem: "El robot solo gira y nunca avanza",
                  fix: "Pon el avance en la rama del si no, para que se mueva siempre que el camino de adelante esté libre.",
                },
              ],
              extension: "Activa más muros o un hueco más angosto y ajusta el programa para que el robot siga pasando.",
            },
            unplugged: {
              title: "Recorre una pista de obstáculos con tarjetas de si y un robot humano",
              materials: [
                "Tarjetas de programa (por siempre, leer sensor, si/si no, avanza, gira, alto)",
                "Un compañero que haga de robot",
                "Objetos que sirvan de obstáculos",
              ],
              instructions: [
                "Acomoda en el piso algunos objetos como obstáculos, dejando huecos entre ellos.",
                "Acomoda las tarjetas: una tarjeta de por siempre y, dentro de ella, una de leer sensor (\"mira adelante: ¿hay algo cerca?\") y una de si/si no.",
                "Escribe el si/si no: si hay algo cerca, gira; si no, da un paso adelante.",
                "Sin vendas: tu compañero es el robot y solo puede hacer exactamente lo que dice la tarjeta en turno, revisando \"¿está cerca?\" en cada vuelta del ciclo.",
              ],
              safetyNotes: [
                "Usa objetos suaves y seguros como obstáculos.",
                "Despeja el piso de cualquier cosa con la que alguien pueda tropezarse.",
              ],
              expectedResult: "El robot humano repite el ciclo de tarjetas, revisa si hay obstáculos en cada vuelta y se aparta cuando alguno está cerca, sin chocar nunca con ellos.",
              successCriteria: [
                "Las tarjetas incluyen un ciclo, un leer sensor y un si/si no",
                "El robot vuelve a revisar la condición en cada vuelta del ciclo",
                "El robot gira solo cuando hay algo cerca y da un paso adelante cuando está libre",
                "La pista se termina sin choques",
              ],
              troubleshooting: [
                {
                  problem: "El robot \"hace trampa\" y simplemente rodea los obstáculos",
                  fix: "Recuérdale que un robot solo puede seguir las tarjetas; tiene que revisar de verdad la condición y actuar según ella.",
                },
                {
                  problem: "El robot se le olvida seguir revisando",
                  fix: "La tarjeta de por siempre significa volver arriba cada vez; señálala después de cada acción.",
                },
              ],
              extension: "Agrega un si/si no que gire a la izquierda cerca de un muro izquierdo y a la derecha cerca de uno derecho.",
            },
          },
        },
        {
          title: "Exploración del seguimiento de línea",
          goal: "Usar un sensor de luz o de color con repetir-hasta y si para que un robot se mantenga sobre una línea marcada.",
          shared: [
            "El seguimiento de línea es un comportamiento de revisar sin parar: una y otra vez, lee el sensor de luz o de color y corrige el rumbo para quedarte sobre la línea.",
            "Con una regla sencilla basta: si el sensor está sobre la línea, curva hacia un lado; si no, curva hacia el otro. Métela en un ciclo de repetir-hasta que termine cuando el robot llegue a la marca final.",
          ],
          variants: {
            kit: {
              title: "Sigue una línea de cinta con un sensor de luz o de color",
              materials: [
                "Un kit de robótica con sensor de luz o de color",
                "Una línea de cinta oscura sobre un piso claro",
                "Hoja de planeación del programa de bloques",
              ],
              instructions: [
                "Pega una línea de cinta oscura sobre un piso claro, con una marca clara de inicio y otra de final.",
                "Apunta el sensor de luz o de color hacia el piso y revisa su lectura sobre la línea y fuera de la línea.",
                "Arma un ciclo de repetir-hasta (hasta la marca final) con un si adentro: si el sensor está fuera de la línea, corrige el rumbo hacia ella; si no, sigue curvando por la orilla.",
                "Ejecútalo y observa al robot zigzaguear a lo largo de la línea y detenerse al final.",
              ],
              safetyNotes: [
                "Mantén los dedos lejos de las ruedas durante las corridas.",
                "Pega la línea bien plana para que nadie se tropiece.",
              ],
              expectedResult: "El robot sigue la línea de cinta, corrigiendo de lado a lado conforme avanza, y se detiene en la marca final.",
              successCriteria: [
                "El programa lee el sensor de luz o de color dentro de un ciclo",
                "El programa usa un si (o un si/si no) para corregir el rumbo según la lectura",
                "El robot se mantiene más o menos sobre la línea en la mayor parte de su recorrido",
                "El robot se detiene en la marca final",
              ],
              troubleshooting: [
                {
                  problem: "El robot pierde la línea de inmediato",
                  fix: "Vuelve a revisar tus lecturas sobre la línea y fuera de ella y pon el umbral entre las dos; tienen que ser claramente distintas.",
                },
                {
                  problem: "El robot da vueltas en círculos",
                  fix: "Haz que los giros de corrección sean pequeños; los giros grandes se pasan de la línea cada vez.",
                },
              ],
              extension: "Agrégale una curva o una bifurcación a la línea y ajusta la regla de dirección para que el robot la siga siguiendo.",
            },
            simulator: {
              title: "Sigue una línea sobre la cuadrícula en el simulador",
              materials: [
                "Simulador en el navegador",
                "Hoja de planeación del programa de bloques",
              ],
              instructions: [
                "Abre la misión de seguimiento de línea, con un camino marcado a lo largo de la cuadrícula.",
                "Agrega un ciclo de repetir-hasta configurado para correr hasta que el robot llegue a la casilla final.",
                "Adentro, pon un bloque de leer sensor (luz o color) y un si/si no: si está fuera de la línea, gira de regreso hacia ella; si no, avanza.",
                "Ejecuta la misión y observa cómo el robot va corrigiendo el rumbo por la línea hasta la meta.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; toma descansos de la pantalla cuando lo necesites.",
              ],
              expectedResult: "El robot del simulador sigue el camino marcado, corrigiendo el rumbo para no salirse, y se detiene al llegar a la casilla final.",
              successCriteria: [
                "El programa usa un ciclo de repetir-hasta",
                "El programa lee el sensor de luz o color en cada vuelta del ciclo",
                "El programa usa si/si no para corregir el rumbo según la lectura",
                "El robot llega al final de la línea",
              ],
              troubleshooting: [
                {
                  problem: "El ciclo nunca termina",
                  fix: "Revisa que la condición del repetir-hasta (llegar a la casilla final) de verdad pueda volverse verdadera a lo largo del camino.",
                },
                {
                  problem: "El robot se desvía de la línea",
                  fix: "Asegúrate de que el leer sensor y el si/si no estén dentro del ciclo, para que revise y corrija en cada paso.",
                },
              ],
              extension: "Elige un mapa con una línea más curvilínea y afina la corrección de rumbo para que el robot le siga el paso.",
            },
            unplugged: {
              title: "Actúa el seguimiento de línea con una regla, sobre una línea de cinta",
              materials: [
                "Una línea de cinta en el piso con inicio y final",
                "La regla de seguimiento de línea escrita en una tarjeta",
                "Un compañero que haga de robot",
              ],
              instructions: [
                "Pega una línea de cinta en el piso con una marca clara de inicio y otra de final.",
                "Escribe la regla: \"Sigue avanzando hasta llegar al final. En cada paso revisa: ¿tus pies están sobre la línea? Si sí, da un paso adelante sobre ella; si no, gira un poquito hacia la línea y da un paso\".",
                "Tu compañero es el robot: solo puede seguir la regla, revisando sus pies contra la línea en cada paso, sin nunca mirar adelante para planear.",
                "Repite hasta que llegue a la marca final, y ahí se detiene.",
              ],
              safetyNotes: [
                "Caminen despacio y mantengan el paso despejado para que nadie se tropiece.",
                "Pega la línea bien plana.",
              ],
              expectedResult: "El robot humano sigue la línea de cinta paso a paso, corrigiendo hacia ella cada vez que un pie se sale, y se detiene al final.",
              successCriteria: [
                "El robot vuelve a revisar en cada paso si está sobre la línea",
                "El robot corrige hacia la línea cuando se sale de ella",
                "El robot sigue la regla, y no su propio criterio",
                "El robot se detiene en la marca final",
              ],
              troubleshooting: [
                {
                  problem: "El robot simplemente recorre toda la línea de corrido, sin revisar",
                  fix: "Eso es una persona planeando por adelantado: haz que se detenga y vuelva a revisar la condición en cada paso, como un ciclo.",
                },
                {
                  problem: "El robot se pone a discutir hacia qué lado girar",
                  fix: "Escribe la regla de modo que \"fuera de la línea\" siempre signifique girar hacia la línea, para que no quede nada a la adivinanza.",
                },
              ],
              extension: "Agrégale una curva a la línea y observa si la misma regla sigue manteniendo al robot sobre ella.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de ejecutar el programa de obstáculos: cuando el robot se encuentre una pared, ¿qué predices que va a hacer, y por qué?",
          howToCheck: "Ejecuta el programa frente a una pared tres veces y compara lo que el robot hace en realidad con tu predicción.",
        },
        {
          prompt: "Predice: si sacas el leer sensor del ciclo, ¿cómo van a cambiar las reacciones del robot?",
          howToCheck: "Saca la lectura del sensor del ciclo, ejecútalo y observa si el robot todavía reacciona a los obstáculos que aparecen.",
        },
      ],
      testRecords: [
        {
          title: "Prueba de confiabilidad de la evasión de obstáculos",
          instructions: "Coloca el robot frente a un obstáculo y ejecuta el programa. Anota si se apartó a tiempo. Repítelo tres veces desde el mismo punto de partida.",
          columns: [
            null,
            "¿Esquivó el obstáculo? (S/N)",
            "Qué fue lo que hizo",
          ],
          measure: "En cuántos de los tres intentos el robot logró esquivar el obstáculo",
        },
      ],
      knowledgeCheck: {
        instructions: "Responde estas preguntas para comprobar que entiendes los ciclos, las condiciones y cómo reaccionan los robots.",
        questions: [
          {
            prompt: "Decide si esta afirmación es verdadera o falsa.",
            statement: "Un ciclo infinito se detiene solo después de unos segundos.",
            explanation: "Falso. Un ciclo infinito sigue repitiéndose hasta que algo lo detiene: no termina por sí mismo.",
          },
          {
            prompt: "¿Qué hace un ciclo en un programa?",
            options: [
              {
                text: "Hace que el robot se mueva más rápido",
                feedback: "La velocidad viene de los motores, no de un ciclo.",
              },
              {
                text: "Repite uno o varios pasos en lugar de escribirlos una y otra vez",
                feedback: "Correcto: un ciclo repite pasos para que tu programa se mantenga corto.",
              },
              {
                text: "Detiene al robot",
                feedback: "Detener es lo que hace un bloque de alto, no un ciclo.",
              },
              {
                text: "Le agrega un sensor nuevo",
                feedback: "Un ciclo repite pasos; no agrega piezas.",
              },
            ],
            explanation: "Un ciclo repite pasos por ti, para que el robot pueda hacer o revisar algo una y otra vez sin un programa larguísimo.",
          },
          {
            prompt: "¿Cuál es la diferencia entre un ciclo infinito y un ciclo de repetir-hasta?",
            options: [
              {
                text: "Un ciclo infinito se ejecuta una vez; uno de repetir-hasta se ejecuta dos veces",
                feedback: "Ninguno se ejecuta una o dos veces fijas: los dos siguen repitiéndose.",
              },
              {
                text: "Un ciclo infinito se repite hasta que detienes el programa; uno de repetir-hasta se repite hasta que una condición se vuelve verdadera",
                feedback: "Correcto: el infinito sigue hasta que lo detienes; el de repetir-hasta se detiene solo cuando su condición es verdadera.",
              },
              {
                text: "Son exactamente lo mismo",
                feedback: "Se detienen por razones distintas, así que no son lo mismo.",
              },
              {
                text: "Un ciclo infinito necesita un sensor y uno de repetir-hasta no",
                feedback: "Cualquiera de los dos puede usar un sensor; la diferencia está en cómo se detienen.",
              },
            ],
            explanation: "Un ciclo infinito solo se detiene cuando tú detienes el programa; un ciclo de repetir-hasta se detiene solo en cuanto su condición se vuelve verdadera.",
          },
          {
            prompt: "Una condición como \"¿está cerca la pared?\" solo puede ser:",
            options: [
              {
                text: "Un número en centímetros",
                feedback: "El sensor da un número, pero la condición lo convierte en una respuesta de sí o no.",
              },
              {
                text: "Verdadera o falsa (un booleano)",
                feedback: "Correcto: una condición siempre responde verdadero o falso, y a eso se le llama booleano.",
              },
              {
                text: "Un color",
                feedback: "Una condición es una revisión de sí o no, no un color.",
              },
              {
                text: "Una velocidad de motor",
                feedback: "La velocidad es una salida; una condición es una revisión de verdadero o falso.",
              },
            ],
            explanation: "Una condición es una revisión que siempre es verdadera o falsa, y a un valor de verdadero o falso se le llama booleano.",
          },
          {
            prompt: "¿Qué hace un bloque si/si no?",
            options: [
              {
                text: "Ejecuta un conjunto de pasos cuando la condición es verdadera y otro distinto cuando es falsa",
                feedback: "Correcto: el si/si no elige entre dos acciones según la condición.",
              },
              {
                text: "Repite un paso diez veces",
                feedback: "Eso es un ciclo de repetición, no un si/si no.",
              },
              {
                text: "Siempre ejecuta los dos conjuntos de pasos",
                feedback: "El si/si no ejecuta solo una rama: la verdadera o la falsa, nunca las dos.",
              },
              {
                text: "Lee un sensor",
                feedback: "Eso lo hace un bloque de leer sensor; el si/si no decide qué hacer con la lectura.",
              },
            ],
            explanation: "Un bloque si/si no elige entre dos acciones: los pasos del \"si\" cuando la condición es verdadera, y los del \"si no\" cuando es falsa.",
          },
          {
            prompt: "¿Cómo funciona la evasión de obstáculos?",
            options: [
              {
                text: "El robot recorre una ruta fija que le indicaron una sola vez",
                feedback: "Eso es una secuencia sencilla sin reacción; la evasión de obstáculos usa el sensor en vivo.",
              },
              {
                text: "Un ciclo lee el sensor de distancia y, si hay algo cerca, el robot gira; si no, avanza",
                feedback: "Correcto: repetir en ciclo, leer el sensor y usar si/si no para girar cuando hay algo cerca y avanzar cuando está libre.",
              },
              {
                text: "El robot espera a que una persona lo maneje para rodear cada obstáculo",
                feedback: "Eso sería control remoto, no reaccionar por su cuenta.",
              },
              {
                text: "El robot se apaga cuando ve un obstáculo",
                feedback: "Se aparta y sigue adelante; no se apaga.",
              },
            ],
            explanation: "La evasión de obstáculos es un ciclo que lee el sensor de distancia y usa si/si no para girar cuando hay algo cerca y avanzar cuando el camino está libre.",
          },
        ],
      },
      reflection: [
        {
          prompt: "¿Qué decisión toma tu robot una y otra vez, y qué información usa para tomarla?",
        },
        {
          prompt: "¿Por qué un robot que reacciona necesita un ciclo alrededor de la revisión de su sensor, en lugar de revisar una sola vez?",
        },
        {
          prompt: "Describe un robot real que reaccione al mundo y nombra la condición que revisa.",
        },
      ],
      journalPrompts: [
        {
          prompt: "Dibuja tu programa de evasión de obstáculos como un ciclo con un leer sensor y un si/si no adentro.",
        },
        {
          prompt: "Escribe la única regla de seguimiento de línea que sigue tu robot, con la forma \"si... entonces... si no...\".",
        },
        {
          prompt: "Anota en cuántos de tus tres intentos con obstáculos el robot logró esquivarlo.",
        },
      ],
      savedPrograms: [
        {
          title: "Programa de evasión de obstáculos",
          description: "Un ciclo infinito que lee el sensor de distancia y usa si/si no para girar cuando hay algo cerca y avanzar cuando el camino está libre.",
        },
        {
          title: "Programa de seguimiento de línea",
          description: "Un ciclo de repetir-hasta que lee el sensor de luz o de color en cada paso y usa un si para volver a colocarse sobre la línea, deteniéndose en la marca final.",
        },
      ],
      simulatorMissions: [
        {
          title: "Pista de obstáculos",
          objective: "Programa al robot para que repita en ciclo, lea el sensor de distancia y use si/si no para sortear los muros y llegar a la meta por su cuenta.",
          successCriteria: [
            "El robot esquiva todos los muros sin que nadie lo maneje",
            "El programa usa un ciclo con una lectura de sensor y un si/si no adentro",
            "El robot llega a la casilla de meta",
          ],
        },
        {
          title: "Seguimiento de línea",
          objective: "Usa un ciclo de repetir-hasta y un sensor de luz o de color para mantener al robot sobre la línea marcada hasta que llegue a la casilla final.",
          successCriteria: [
            "El robot se mantiene sobre la línea marcada casi todo el camino",
            "El programa lee el sensor de luz o color en cada vuelta del ciclo",
            "El robot se detiene al final de la línea",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Ciclos y condiciones",
          focus: "Ciclos, ciclos infinitos, repetir-hasta, condiciones, booleanos, si y si/si no.",
        },
        {
          title: "Programa de evasión de obstáculos",
          focus: "Repetir en ciclo, leer el sensor de distancia y usar si/si no para girar cuando hay algo cerca.",
        },
        {
          title: "Predice la reacción ante la pared",
          focus: "Predecir qué hace el robot cuando se encuentra una pared, y luego comprobarlo.",
        },
        {
          title: "Prueba de confiabilidad de la reacción",
          focus: "Hacer tres intentos y anotar si el robot esquivó el obstáculo.",
        },
        {
          title: "Exploración del seguimiento de línea",
          focus: "Usar un sensor de luz o color con repetir-hasta y si para mantenerse sobre una línea.",
        },
        {
          title: "Comprobación de conocimientos",
          focus: "Cinco preguntas sobre ciclos, condiciones y cómo reaccionan los robots.",
        },
        {
          title: "Reflexión",
          focus: "Escribir sobre la diferencia entre si y si/si no, y por qué reaccionar necesita un ciclo.",
        },
      ],
      safetyNotes: [
        {
          text: "Mantén los dedos, el cabello y la ropa suelta lejos de las ruedas en movimiento mientras un robot que reacciona avanza, porque cambia de dirección por su cuenta.",
        },
        {
          text: "Pega bien planas las líneas de cinta y las piezas de la pista de obstáculos, y despeja el piso para que nadie se tropiece durante las corridas.",
        },
        {
          text: "Guarda tu programa de bloques con frecuencia para que al recargar el navegador no se pierda tu trabajo.",
        },
      ],
      printableResources: [
        {
          title: "Hoja de planeación del programa de bloques",
          description: "Una página para planear un ciclo con un leer sensor y un si/si no antes de armarlo.",
        },
        {
          title: "Tarjetas de decisión si/si no",
          description: "Tarjetas imprimibles de por siempre, leer sensor, si y si/si no para las actividades sin dispositivos de obstáculos y de línea.",
        },
        {
          title: "Registro de pruebas de reacción",
          description: "Una tabla para anotar tres intentos de evasión de obstáculos y si el robot los esquivó.",
        },
        {
          title: "Guía docente de la semana 5",
          description: "Preparación, conducción de la clase, ideas equivocadas frecuentes y preguntas para la lección de robots que reaccionan.",
        },
      ],
      completion: {
        summary: "Termina la semana 5 programando un comportamiento de evasión de obstáculos, explorando el seguimiento de línea, registrando tres intentos de reacción y aprobando la comprobación de conocimientos.",
        requirements: [
          {
            label: "Armar un programa de evasión de obstáculos con un ciclo, una lectura de sensor y un si/si no",
          },
          {
            label: "Explorar el seguimiento de línea con un sensor de luz o color y un ciclo",
          },
          {
            label: "Hacer tres intentos de reacción y registrar los resultados",
          },
          {
            label: "Obtener al menos 4 de 5 en la comprobación de conocimientos",
          },
          {
            label: "Escribir tu reflexión",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprime la hoja de planeación, las tarjetas de decisión si/si no y el registro de pruebas de reacción para cada estudiante o pareja.",
          "Para los kits: cárgalos, móntales un sensor de distancia y uno de luz o color, y prepara una pista pequeña de obstáculos y una línea de cinta.",
          "Para el simulador, abre las misiones de pista de obstáculos y de seguimiento de línea en cada dispositivo.",
        ],
        prep: [
          "Programa tú primero el patrón de evasión de obstáculos para conocer un valor de cercanía que funcione con tu sensor.",
          "Revisa las lecturas del sensor de luz o color sobre la línea y fuera de ella, con la cinta y el piso que vas a usar de verdad.",
          "Recorta con anticipación las tarjetas de por siempre, si y si/si no de la ruta sin dispositivos.",
        ],
        facilitation: [
          "Enseña los ciclos, la diferencia entre infinito y repetir-hasta, y las condiciones (verdadero o falso) antes de programar nada, apoyándote en el ciclo de percibir, decidir y actuar de la semana 1.",
          "Armen juntos el patrón de evasión de obstáculos (por siempre, leer sensor, si/si no) y luego deja que las parejas lo adapten.",
          "Haz la predicción y la prueba de reacción de tres intentos, para que los estudiantes vean que reaccionar tiene que ver con la confiabilidad, no con una corrida con suerte.",
          "Explora el seguimiento de línea como un comportamiento de revisar y corregir sin parar; espera zigzagueo, no líneas perfectamente rectas.",
          "Cierra con la comprobación de conocimientos y la reflexión.",
        ],
        commonMisconceptions: [
          "\"Al robot le basta con revisar una vez\": sin un ciclo reacciona una sola vez y después deja de responder.",
          "\"El si/si no ejecuta las dos ramas\": ejecuta solo la rama verdadera o solo la falsa.",
          "\"Un giro más grande sigue mejor la línea\": las correcciones grandes se pasan; las pequeñas y frecuentes son las que funcionan.",
          "Confundir el número del sensor con la condición: el sensor da un número, la condición lo convierte en verdadero o falso.",
        ],
        questionsToAsk: [
          "¿Dónde está el ciclo, y qué hace que se detenga?",
          "¿Cuál es la condición aquí, y cuándo es verdadera?",
          "¿Qué hace el robot en el \"si no\", y por qué le hace falta uno?",
          "¿Cómo se da cuenta el robot de que se salió de la línea?",
        ],
        easierVersion: "Dales a los estudiantes un programa casi terminado con el si/si no vacío, para que solo tengan que llenar \"gira\" y \"avanza\".",
        harderVersion: "Pide a los estudiantes que combinen los dos comportamientos (seguir una línea pero esquivar un obstáculo colocado sobre ella) usando si/si no anidados.",
      },
      nextWeek: {
        teaser: "La próxima semana tu robot que reacciona no siempre se va a portar bien, así que vamos a aprender a depurar y a lograr que funcione de manera confiable todas las veces.",
        prepare: [
          "Guarda tus programas de evasión de obstáculos y de seguimiento de línea; la próxima semana vamos a romper y arreglar versiones de ellos.",
          "Fíjate en alguna vez que tu robot reaccionó mal hoy: ese es un error que puedes llevarte a la semana 6.",
          "Carga tu kit o guarda el simulador en tus marcadores.",
        ],
      },
    },
    {
      title: "Depuración y confiabilidad",
      subtitle: "Averigua por qué un robot se porta mal (por lo mecánico, por la programación o por los sensores) y demuestra que funciona una y otra vez.",
      summary: "Los estudiantes toman los robots reactivos que construyeron y los vuelven confiables. Aprenden que depurar es el trabajo de averiguar por qué el resultado real es distinto del resultado esperado, y que los errores vienen en tres familias: mecánicos (algo físico), de programación (una instrucción equivocada o faltante) y de sensores (una lectura, un umbral o una calibración mal). Practican con misiones de depuración preparadas a propósito, conocen las variables y los contadores para guardar y llevar la cuenta de valores, y hacen ensayos de confiabilidad (la misma tarea tres veces) anotando lo esperado frente a lo real para demostrar que el robot de verdad funciona.",
      mainMission: "Diagnosticar y corregir errores mecánicos, de programación y de sensores, y luego demostrar que un robot es confiable con una prueba de tres corridas.",
      estimatedTime: "70 a 85 minutos",
      learningGoals: [
        {
          text: "Explicar la depuración como averiguar por qué el resultado real difiere del resultado esperado",
        },
        {
          text: "Distinguir los errores mecánicos, de programación y de sensores a partir de sus síntomas",
        },
        {
          text: "Usar una variable o un contador para guardar o llevar la cuenta de un valor en un programa",
        },
        {
          text: "Hacer un ensayo de confiabilidad: repetir la misma tarea tres veces y anotar lo esperado frente a lo real",
        },
        {
          text: "Diagnosticar un robot que se porta mal y describir la solución",
        },
      ],
      vocabulary: [
        {
          term: "Depuración",
          definition: "El trabajo de averiguar por qué el resultado real de un robot es distinto del resultado esperado, y luego corregirlo.",
        },
        {
          term: "Variable",
          definition: "Un lugar con nombre dentro de un programa que guarda un valor que puede cambiar mientras el programa se ejecuta.",
        },
        {
          term: "Contador",
          definition: "Una variable que se usa para contar: empieza en un número y sube de uno en uno cada vez que pasa algo.",
        },
        {
          term: "Valor guardado",
          definition: "Un número o un dato que un programa conserva en una variable para poder usarlo o cambiarlo después.",
        },
        {
          term: "Valor de calibración",
          definition: "Un número que mides y guardas para que las lecturas de un sensor signifiquen lo correcto, como el nivel de luz de un piso blanco.",
        },
        {
          term: "Resultado esperado",
          definition: "Lo que DEBERÍA pasar cuando el programa funciona bien, o sea lo que predices antes de probar.",
        },
        {
          term: "Resultado real",
          definition: "Lo que SÍ pasó cuando de verdad ejecutaste el robot, y que observas y anotas.",
        },
        {
          term: "Caso de prueba",
          definition: "Una situación específica que preparas a propósito para probar, como \"una pared a exactamente 15 cm\".",
        },
        {
          term: "Error mecánico",
          definition: "Un problema físico del cuerpo del robot, como una rueda floja, un cable que se arrastra o un engrane atascado.",
        },
        {
          term: "Error de programación",
          definition: "Una equivocación en las instrucciones: un bloque o un número equivocado, faltante o fuera de orden.",
        },
        {
          term: "Error de sensor",
          definition: "Un problema al percibir: una lectura mala, un umbral equivocado o un sensor que necesita calibrarse.",
        },
        {
          term: "Confiabilidad",
          definition: "Qué tan bien hace un robot el mismo trabajo correctamente una y otra vez, demostrado con ensayos repetidos.",
        },
      ],
      prerequisites: [
        {
          reason: "Vas a depurar los robots reactivos que construiste en la semana 5, que usan ciclos y condiciones.",
        },
        {
          reason: "Los errores de sensores, los umbrales y la calibración se apoyan en los sensores que se presentaron en la semana 4.",
        },
      ],
      concepts: [
        {
          title: "Qué es depurar en realidad",
          body: [
            "Cada vez que ejecutas un programa tienes dos resultados en la cabeza: el esperado (lo que DEBERÍA pasar) y el real (lo que SÍ pasó). Cuando coinciden, el robot está funcionando. Cuando no, hay un error, y depurar es el trabajo detectivesco de averiguar por qué difieren.",
            "Quienes depuran bien no andan picándole al robot al azar: comparan lo esperado con lo real, observan el síntoma con atención y cambian una sola cosa a la vez para poder saber qué fue lo que lo arregló.",
          ],
          examples: [
            "Esperado: detenerse ante la pared. Real: se estrelló contra la pared. -> Hay un error que encontrar.",
            "Esperado: girar a la izquierda. Real: giró a la derecha. -> Compara el bloque con lo que querías decir.",
          ],
        },
        {
          title: "Las tres familias de errores",
          body: [
            "Los errores vienen en tres familias, y nombrar la familia ya es media solución. Un error mecánico es un problema físico del cuerpo del robot: una rueda floja, un cable arrastrándose por el piso, un engrane que patina. Un error de programación es una equivocación en las instrucciones: un número equivocado, un bloque faltante o bloques en el orden incorrecto. Un error de sensor es un problema al percibir: una lectura mala, un umbral puesto en el valor equivocado o un sensor que necesita calibrarse.",
            "El truco está en leer el síntoma y adivinar primero la familia. Si el robot se porta mal exactamente igual todas y cada una de las veces, el error suele estar en el programa. Si a veces funciona y a veces no, sospecha de algo mecánico o de una lectura de sensor inestable.",
          ],
          examples: [
            "Mecánico: el robot se desvía hacia un lado porque una rueda está floja.",
            "Programación: el robot gira 2 segundos en vez de 1 porque el número está mal.",
            "Sensor: el robot nunca se detiene porque el umbral de distancia es demasiado chico.",
          ],
        },
        {
          title: "Variables y contadores: guardar y llevar la cuenta de valores",
          body: [
            "A veces un programa necesita recordar un número. Una variable es una cajita con nombre que guarda un valor, y ese valor puede cambiar mientras el programa se ejecuta. Un contador es una variable especial que se usa para contar: empieza en cero y sube de uno en uno cada vez que pasa algo, como cada vez que el robot esquiva un obstáculo.",
            "Las variables también guardan valores de calibración: números que mides una vez y almacenas para que las lecturas de un sensor signifiquen lo correcto. Guardar un valor significa que después puedes usarlo, cambiarlo y revisarlo, en lugar de andar adivinando.",
          ],
          examples: [
            "Un contador que suma 1 cada vez que se esquiva un obstáculo.",
            "Un valor de calibración guardado para el nivel de luz del piso blanco.",
            "Una variable que recuerda cuántas vueltas lleva dadas el ciclo.",
          ],
        },
        {
          title: "Confiabilidad: demostrarla con ensayos repetidos",
          body: [
            "Un robot que funciona una vez tal vez solo tuvo suerte. Confiabilidad significa hacer el mismo trabajo correctamente una y otra vez, y no puedes afirmarlo sin pruebas. La prueba es un ensayo de confiabilidad: ejecutas la misma tarea varias veces, con el mismo caso de prueba en cada corrida, y anotas el resultado esperado y el real en cada una.",
            "Si las tres corridas coinciden con lo que esperabas, el robot es confiable para ese caso de prueba. Si una corrida sale distinta, encontraste un error que estaba escondido a plena vista, y esa corrida fallida es justo la pista que necesitas.",
          ],
          examples: [
            "Ejecuta la tarea de detenerse ante la pared 3 veces desde el mismo punto de partida y anota cada una.",
            "Esperado \"se detiene\" en las tres corridas; real \"se detiene, se detiene, choca\" significa que la corrida 3 tiene un error.",
          ],
        },
      ],
      materials: [
        {
          name: "Registro de prueba de tres corridas (imprimible)",
        },
        {
          name: "Hoja de trabajo Detective de errores, con las tres familias (imprimible)",
        },
        {
          name: "Lápiz y papel para anotar los resultados",
        },
        {
          name: "Un robot reactivo construido en la semana 5, con al menos un sensor",
        },
        {
          name: "Cinta métrica o regla para preparar el mismo caso de prueba en cada corrida",
        },
        {
          name: "Computadora o tableta con el simulador del navegador",
        },
        {
          name: "El robot de cartón, las tarjetas de programa y la pista de piso con cinta de semanas anteriores",
        },
        {
          name: "Notas adhesivas o una hoja de conteo que haga las veces de contador",
        },
      ],
      activities: [
        {
          title: "Misiones de Detective de errores",
          goal: "Diagnosticar un robot que se porta mal: decidir si el error es mecánico, de programación o de sensor, y luego corregirlo.",
          shared: [
            "En cada misión, primero escribe el resultado esperado y el resultado real. La diferencia entre los dos es el síntoma que estás investigando.",
            "Hazte la pregunta de las tres familias: ¿esto es físico (mecánico), de instrucciones (programación) o un problema al percibir (sensor)? Usa el síntoma para adivinar antes de tocar nada.",
            "Cambia UNA sola cosa a la vez, vuelve a ejecutar y anota si el resultado real ya coincide con el esperado.",
          ],
          variants: {
            kit: {
              title: "Depura un robot de kit que se porta mal",
              materials: [
                "Un robot reactivo de la semana 5",
                "Hoja de trabajo Detective de errores",
                "Cinta métrica",
              ],
              instructions: [
                "Pide a un adulto o a un compañero que le meta en secreto un error a un robot que ya funcionaba (aflojar una rueda, cambiar un número en un bloque o poner un umbral malo).",
                "Ejecuta el robot y escribe en la hoja el resultado esperado y el resultado real.",
                "Decide la familia del error a partir del síntoma y luego investiga por orden las causas más probables.",
                "Corrige la única cosa de la que sospechas, vuelve a ejecutar y confirma que el resultado real ya coincide con el esperado.",
              ],
              safetyNotes: [
                "Apaga el robot antes de apretar ruedas o mover cables.",
                "Mantén los dedos lejos de las partes en movimiento mientras funciona.",
              ],
              expectedResult: "El estudiante nombra la familia correcta del error, hace una sola corrección dirigida, y el resultado real del robot vuelve a coincidir con el esperado.",
              successCriteria: [
                "Se anotaron tanto el resultado esperado como el real",
                "Se identificó correctamente la familia del error",
                "Se hizo un cambio a la vez",
                "El robot funciona después de la corrección",
              ],
              troubleshooting: [
                {
                  problem: "Corregir \"todo\" de golpe, así que no se sabe cuál era la causa",
                  fix: "Deshaz todos los cambios menos uno; haz un solo cambio, vuelve a ejecutar y comprueba si era ese.",
                },
                {
                  problem: "No queda claro cuál es la familia del error",
                  fix: "Ejecútalo tres veces: si el resultado equivocado es el mismo todas las veces, apunta a la programación; si los resultados cambian, apunta a algo mecánico o a un sensor inestable.",
                },
              ],
              extension: "Métele un error al robot de un compañero y a ver si logra diagnosticar la familia solo con el síntoma.",
            },
            simulator: {
              title: "Depura un programa descompuesto en el simulador",
              materials: [
                "Simulador en el navegador",
                "Hoja de trabajo Detective de errores",
              ],
              instructions: [
                "Abre una misión del simulador que traiga un programa roto a propósito (un número equivocado, un bloque faltante o un umbral de sensor mal puesto).",
                "Predice el resultado esperado, ejecútalo y anota el resultado real.",
                "Como en el simulador no hay ruedas flojas, decide a partir del síntoma si es un error de programación o de umbral de sensor.",
                "Cambia un bloque o un número, vuelve a ejecutar desde el mismo punto de partida y confirma que los resultados ya coinciden.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; toma un descanso de la pantalla si lo necesitas.",
              ],
              expectedResult: "El estudiante identifica un error de programación o de sensor, corrige un solo bloque o valor, y el robot completa la misión tal como se esperaba.",
              successCriteria: [
                "Se registraron tanto el resultado esperado como el real",
                "Se identificó correctamente la familia del error",
                "En cada intento se cambió un solo bloque o número",
                "La misión se logra después de la corrección",
              ],
              troubleshooting: [
                {
                  problem: "El ciclo nunca termina",
                  fix: "Ese es un síntoma de programación: revisa que la condición del repetir-hasta de verdad pueda volverse verdadera.",
                },
                {
                  problem: "El robot no le hace caso a la pared",
                  fix: "Lee el valor del sensor en el simulador y revisa que el umbral esté del lado correcto: es un error de sensor.",
                },
              ],
              extension: "Descompón tú mismo un programa que funcione y luego reta a un compañero a encontrar y nombrar el error.",
            },
            unplugged: {
              title: "Depura un programa de tarjetas actuado sobre la pista del piso",
              materials: [
                "Robot de cartón",
                "Tarjetas de programa",
                "Pista de piso con cinta",
                "Hoja de trabajo Detective de errores",
              ],
              instructions: [
                "Pide a un compañero que le meta un error a un programa de tarjetas que funciona (intercambiar dos tarjetas, cambiar un \"avanza 2\" por \"avanza 4\" o escribir una regla \"si\" equivocada) o que doble el parachoques de papel del robot.",
                "Escribe el resultado esperado, luego \"ejecuta\" el programa moviendo el modelo tarjeta por tarjeta y anota el resultado real.",
                "Decide la familia: un parachoques doblado es mecánico, una tarjeta intercambiada o equivocada es de programación, y una regla \"si\" equivocada es un error de sensor.",
                "Corrige una tarjeta o una pieza, vuelve a ejecutar y confirma que los resultados coinciden.",
              ],
              safetyNotes: [
                "Usa tijeras seguras para niños con un adulto si vas a rehacer un parachoques.",
              ],
              expectedResult: "El estudiante nombra la familia correcta del error, corrige una tarjeta o una pieza, y la corrida actuada coincide con el resultado esperado.",
              successCriteria: [
                "Se anotaron tanto el resultado esperado como el real",
                "Se identificó correctamente la familia del error",
                "Se cambió una tarjeta o una pieza a la vez",
                "La corrida funciona después de la corrección",
              ],
              troubleshooting: [
                {
                  problem: "El \"robot\" se ejecuta distinto cada vez",
                  fix: "Haz que cada tarjeta sea una instrucción exacta para que el resultado real se pueda repetir: así es como se detecta el error de verdad.",
                },
                {
                  problem: "No queda claro si es una tarjeta o el parachoques",
                  fix: "Lee las tarjetas en voz alta exactamente como están escritas; si están bien, el error es mecánico.",
                },
              ],
              extension: "Arma una misión en la que se escondan a la vez dos errores de familias distintas.",
            },
          },
        },
        {
          title: "Ensayo de confiabilidad de tres corridas",
          goal: "Demostrar que un robot es confiable ejecutando la misma tarea tres veces y comparando el resultado esperado con el real en cada corrida.",
          shared: [
            "Elige una tarea bien definida y un caso de prueba (exactamente la misma preparación en cada corrida). Escribe el resultado esperado una sola vez: es el mismo para las tres corridas.",
            "Ejecuta la tarea tres veces SIN cambiar nada entre corrida y corrida. Anota el resultado real y marca ¿Coincide? (sí o no) en cada una.",
            "Tres coincidencias significan confiable para ese caso de prueba. Cualquier diferencia es un error que hay que cazar con los pasos del Detective de errores.",
          ],
          variants: {
            kit: {
              title: "Ensayo de confiabilidad con el robot del kit",
              materials: [
                "Un robot reactivo de la semana 5",
                "Registro de prueba de tres corridas",
                "Cinta métrica",
              ],
              instructions: [
                "Elige una tarea como \"detenerse antes de la pared\" y coloca la pared a la misma distancia en cada corrida: ese es tu caso de prueba.",
                "Escribe el resultado esperado: \"el robot se detiene sin tocar la pared\".",
                "Ejecútalo tres veces desde exactamente el mismo punto de partida, anotando el resultado real y ¿Coincide? cada vez.",
                "Si alguna corrida no coincide, diagnostica la familia del error, corrígelo y vuelve a hacer las tres corridas.",
              ],
              safetyNotes: [
                "Mantén despejada la zona de prueba y aléjate de las partes en movimiento.",
                "Regresa el robot a la misma línea de salida en cada corrida.",
              ],
              expectedResult: "Una tabla de tres corridas completa; un robot confiable coincide con el resultado esperado en las tres.",
              successCriteria: [
                "Se usa el mismo caso de prueba en las tres corridas",
                "El resultado esperado se escribió una sola vez",
                "Se anotaron tres resultados reales y su ¿Coincide?",
                "Cualquier diferencia se investiga",
              ],
              troubleshooting: [
                {
                  problem: "Los resultados se van corriendo a lo largo de las tres corridas",
                  fix: "Revisa las baterías y la posición de salida: una batería que se está agotando es una causa mecánica o de energía de la falta de confiabilidad.",
                },
                {
                  problem: "Coincide dos veces y a la tercera falla",
                  fix: "La corrida que falló es tu pista: revisa la lectura del sensor y el montaje físico justo después de esa corrida.",
                },
              ],
              extension: "Agrega una cuarta y una quinta corrida y observa si la confiabilidad se sostiene conforme se descarga la batería.",
            },
            simulator: {
              title: "Ensayo de confiabilidad en el simulador",
              materials: [
                "Simulador en el navegador",
                "Registro de prueba de tres corridas",
              ],
              instructions: [
                "Elige una misión y usa la misma casilla de salida y el mismo mapa en cada corrida: ese es tu caso de prueba.",
                "Escribe el resultado esperado antes de ejecutar.",
                "Ejecuta el programa tres veces sin cambiarlo, anotando el resultado real y ¿Coincide? en cada corrida.",
                "Si alguna corrida sale distinta, encuentra el error de programación o de sensor y vuelve a hacer las tres corridas.",
              ],
              safetyNotes: [
                "Guarda tu trabajo con frecuencia para que una recarga no borre el registro.",
              ],
              expectedResult: "Una tabla de tres corridas completa que muestra si el robot del simulador se comporta igual en cada corrida.",
              successCriteria: [
                "La misma salida y el mismo mapa en las tres corridas",
                "El resultado esperado se escribió una sola vez",
                "Se anotaron tres resultados reales y su ¿Coincide?",
                "Cualquier diferencia se investiga",
              ],
              troubleshooting: [
                {
                  problem: "Las corridas salen distintas aunque no se cambió nada",
                  fix: "Revisa que la casilla de salida sea realmente idéntica y que el ciclo termine por una condición bien definida, no de milagro.",
                },
                {
                  problem: "Todas las corridas coinciden perfecto y se siente demasiado fácil",
                  fix: "Prueba un caso más difícil (una pared más cerca, un giro más cerrado) para ver dónde se rompe la confiabilidad.",
                },
              ],
              extension: "Cambia el caso de prueba por uno más difícil y haz otros tres ensayos para encontrar el límite.",
            },
            unplugged: {
              title: "Ensayo de confiabilidad con el programa de tarjetas",
              materials: [
                "Robot de cartón",
                "Tarjetas de programa",
                "Pista de piso con cinta",
                "Registro de prueba de tres corridas",
              ],
              instructions: [
                "Elige una tarea y un punto de salida fijo en la pista del piso: el mismo caso de prueba en cada corrida.",
                "Escribe el resultado esperado, por ejemplo \"el modelo termina en la casilla de llegada\".",
                "Pide al mismo compañero que \"ejecute\" exactamente las mismas tarjetas tres veces, anotando el resultado real y ¿Coincide? en cada corrida.",
                "Si dos corridas no concuerdan, los pasos son ambiguos o hay una tarjeta equivocada: corrígelo y vuelve a hacer las tres corridas.",
              ],
              safetyNotes: [
                "Mantén despejada la pista del piso para que nadie se tropiece.",
              ],
              expectedResult: "Una tabla de tres corridas completa; un programa de tarjetas confiable deja el modelo en el mismo lugar en las tres.",
              successCriteria: [
                "La misma salida y las mismas tarjetas en las tres corridas",
                "El resultado esperado se escribió una sola vez",
                "Se anotaron tres resultados reales y su ¿Coincide?",
                "Cualquier diferencia se investiga",
              ],
              troubleshooting: [
                {
                  problem: "Cada persona termina en un lugar distinto",
                  fix: "Reescribe las tarjetas como pasos exactos y sin ambigüedad, para que el resultado real se pueda repetir.",
                },
                {
                  problem: "La misma persona termina en lugares distintos",
                  fix: "Marca el punto de salida y el largo de los pasos para que el caso de prueba sea de verdad idéntico en cada corrida.",
                },
              ],
              extension: "Intercambien programas de tarjetas con otro equipo y hagan un ensayo de confiabilidad de tres corridas con el suyo.",
            },
          },
        },
        {
          title: "Contador de obstáculos",
          goal: "Usar una variable como contador que suma uno cada vez que el robot esquiva un obstáculo, y luego leer el valor guardado.",
          shared: [
            "Pon una variable contador en 0 al principio. Cada vez que el robot detecte y esquive un obstáculo, súmale 1 al contador.",
            "Ese es un valor guardado: el contador recuerda cuántos obstáculos se atendieron, y puedes revisarlo al final.",
            "Predice cuántos obstáculos hay en la pista y luego compara tu predicción con el valor final del contador.",
          ],
          variants: {
            kit: {
              title: "Cuenta los obstáculos esquivados con el robot del kit",
              materials: [
                "Un robot reactivo de la semana 5",
                "Una pista corta de obstáculos",
                "Lápiz y papel",
              ],
              instructions: [
                "Pon en 0 una variable llamada \"obstáculos\" al principio del programa.",
                "Mantén un ciclo que lea el sensor; dentro de la rama \"si hay obstáculo\", gira para esquivarlo Y súmale 1 a \"obstáculos\".",
                "Recorre la pista y luego muestra o lee el valor final del contador.",
                "Compara el contador con la cantidad de obstáculos que en realidad colocaste.",
              ],
              safetyNotes: [
                "Mantén la pista libre de manos y pies mientras el robot avanza.",
              ],
              expectedResult: "El valor final del contador es igual al número de obstáculos que el robot esquivó de verdad.",
              successCriteria: [
                "El contador empieza en 0",
                "Suma 1 solo cuando se esquiva un obstáculo",
                "Se lee el valor guardado final",
                "Se compara con el conteo real",
              ],
              troubleshooting: [
                {
                  problem: "El contador queda demasiado alto",
                  fix: "El robot está sumando 1 más de una vez por obstáculo: asegúrate de que la cuenta ocurra una vez por detección, no en cada vuelta del ciclo.",
                },
                {
                  problem: "El contador se queda en 0",
                  fix: "Revisa que el paso de sumar 1 esté dentro de la rama \"si hay obstáculo\" y no fuera de ella: es un error de programación.",
                },
              ],
              extension: "Agrega una regla: cuando el contador llegue a 3, el robot se detiene y avisa que terminó.",
            },
            simulator: {
              title: "Cuenta los obstáculos esquivados en el simulador",
              materials: [
                "Simulador en el navegador",
                "Lápiz y papel",
              ],
              instructions: [
                "Usa un bloque de fijar variable para poner \"obstáculos\" en 0 al principio.",
                "Dentro de un ciclo, lee el sensor; cuando detecte un obstáculo, gira para esquivarlo y súmale 1 a \"obstáculos\".",
                "Ejecuta la misión de la cuadrícula y lee el contador al final.",
                "Compara el contador con la cantidad de obstáculos que hay en la cuadrícula.",
              ],
              safetyNotes: [
                "No hay riesgos físicos.",
              ],
              expectedResult: "El contador es igual al número de obstáculos que el robot del simulador esquivó en la cuadrícula.",
              successCriteria: [
                "Un bloque de fijar variable arranca el contador en 0",
                "Suma 1 por cada obstáculo esquivado",
                "Se lee el valor final",
                "Coincide con la cantidad de obstáculos de la cuadrícula",
              ],
              troubleshooting: [
                {
                  problem: "El contador cuenta de más",
                  fix: "El sumar 1 se dispara en cada vuelta del ciclo mientras toca un mismo obstáculo; cuenta solo una vez por cada detección nueva.",
                },
                {
                  problem: "El contador nunca cambia",
                  fix: "Confirma que el bloque de sumar 1 esté dentro de la condición del sensor, y no en el ciclo pelón.",
                },
              ],
              extension: "Guarda una segunda variable para los \"giros hechos\" y compárala con el contador de obstáculos.",
            },
            unplugged: {
              title: "Cuenta los obstáculos esquivados con un conteo de rayitas",
              materials: [
                "Robot de cartón",
                "Tarjetas de programa",
                "Obstáculos en la pista del piso",
                "Hoja de conteo o notas adhesivas",
              ],
              instructions: [
                "Escribe \"contador = 0\" al principio de tus tarjetas de programa y usa una hoja de conteo como el valor guardado.",
                "Mientras \"ejecutas\" el modelo, cada vez que se dispare la tarjeta \"si el parachoques toca un obstáculo, gira\", haz una rayita.",
                "Al final, cuenta las rayitas: ese es el valor guardado del contador.",
                "Compara el conteo con la cantidad de obstáculos que colocaste.",
              ],
              safetyNotes: [
                "Mantén despejada la pista del piso para que nadie se tropiece con los obstáculos.",
              ],
              expectedResult: "El conteo de rayitas coincide con el número de obstáculos que esquivó el modelo.",
              successCriteria: [
                "El contador empieza en 0",
                "Se agrega una rayita por cada obstáculo esquivado",
                "El conteo final se lee como el valor guardado",
                "Coincide con el conteo real",
              ],
              troubleshooting: [
                {
                  problem: "Salen demasiadas rayitas",
                  fix: "Haz una rayita solo cuando de verdad se dispare la tarjeta de \"gira para esquivar\", no en cada paso.",
                },
                {
                  problem: "Se olvidó reiniciar el contador",
                  fix: "Empieza siempre una corrida nueva poniendo el contador de vuelta en 0: el valor guardado tiene que arrancar limpio.",
                },
              ],
              extension: "Agrega una tarjeta de regla: \"si contador = 3, alto\" y comprueba que el valor guardado puede disparar una acción.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de tu ensayo de confiabilidad de tres corridas, predice cuál corrida (si es que alguna) no va a coincidir con el resultado esperado, y por qué.",
          howToCheck: "Haz las tres corridas, anota lo real frente a lo esperado y el ¿Coincide?, y compara tu predicción con lo que de verdad pasó.",
        },
        {
          prompt: "Mira el síntoma del Detective de errores antes de tocar el robot: predice a qué familia pertenece el error, si mecánica, de programación o de sensor.",
          howToCheck: "Investiga las causas probables y comprueba si la familia que predijiste fue la que resultó ser.",
        },
        {
          prompt: "Para el contador de obstáculos, predice el valor guardado final antes de recorrer la pista.",
          howToCheck: "Recorre la pista, lee el contador y compáralo con tu número predicho y con la cantidad real de obstáculos.",
        },
      ],
      testRecords: [
        {
          title: "Prueba de confiabilidad de tres corridas",
          instructions: "Elige una tarea y un caso de prueba. Escribe el resultado esperado una sola vez, y luego ejecuta la misma tarea tres veces sin cambiar nada. Anota el resultado real y si coincidió en cada corrida.",
          columns: [
            null,
            "Resultado esperado",
            "Resultado real",
            "¿Coincide? (S/N)",
          ],
          measure: "Si el resultado real coincidió con el esperado en cada una de las tres corridas",
        },
        {
          title: "Registro de diagnóstico de errores",
          instructions: "En cada misión de depuración, anota el síntoma, la familia de error que sospechas, el único cambio que probaste y si eso corrigió la diferencia.",
          columns: [
            "Síntoma",
            "Familia sospechosa",
            "Único cambio probado",
            "¿Corregido? (S/N)",
          ],
          measure: "Qué familia de error era la responsable y si un solo cambio dirigido la corrigió",
        },
      ],
      debuggingMissions: [
        {
          title: "El robot que gira sobre su propio eje",
          scenario: "Un robot que debería avanzar derecho se pone a girar en el mismo sitio, dando vueltas y vueltas como si una rueda avanzara y la otra retrocediera.",
          symptom: "Los dos motores funcionan, pero el robot rota en lugar de avanzar, y gira igual en todas las corridas.",
          hint: "Observa las ruedas: las dos giran, pero en sentidos opuestos, y nada está flojo. Piensa en cómo está conectado o configurado uno de los motores, no en los comandos de avance.",
          likelyCauses: [
            "Un motor está conectado al revés, así que su rueda gira en el sentido equivocado.",
            "La configuración de dirección de un motor está invertida respecto a la del otro.",
            "Los dos motores están montados como espejo, pero se manejan como si apuntaran hacia el mismo lado.",
          ],
          fix: "Cambia la conexión del motor invertido (o voltea la configuración de dirección de ese motor) para que las dos ruedas avancen juntas. Vuelve a ejecutar y confirma que el robot ahora va derecho en lugar de girar.",
        },
        {
          title: "La pared ante la que no se detiene",
          scenario: "Un robot debería avanzar y detenerse cuando su sensor de distancia diga que la pared está cerca, pero se mete de frente contra la pared y sigue empujando sin detenerse nunca.",
          symptom: "En todas las corridas el robot nunca se detiene: el resultado real es un choque, aunque el programa sí tiene una instrucción de alto.",
          hint: "El sensor lee bien y el bloque de alto está ahí. Lee en voz alta la comparación que está dentro del ciclo: conforme la pared se acerca, ¿la condición que debería detener al robot llega a volverse verdadera alguna vez?",
          likelyCauses: [
            "La comparación está al revés: se detiene cuando la distancia es \"mayor que\" en lugar de \"menor que\", así que nunca es verdadera mientras el robot se acerca.",
            "Los dos lados de la comparación están intercambiados.",
            "El operador equivocado (un > donde debía ir un <) impide que la condición de alto se dispare alguna vez.",
          ],
          fix: "Invierte el operador de comparación (o intercambia sus dos lados) para que la condición de alto se vuelva verdadera cuando la distancia se haga chica. Vuelve a ejecutar y confirma que el robot se detiene antes de la pared.",
        },
        {
          title: "El contador que cuenta de más",
          scenario: "Un robot pasa junto a tres marcas y debería reportar un conteo de 3, pero reporta un número enorme, como 47.",
          symptom: "El valor final del contador es muchísimo más grande que la cantidad de objetos reales: crece en cada vuelta del ciclo en lugar de una vez por objeto.",
          hint: "Observa cómo sube el contador mientras avanza. ¿Suma 1 una vez por objeto, o una vez en cada pasada del ciclo aunque no haya un objeto nuevo enfrente?",
          likelyCauses: [
            "El \"suma 1\" está fuera de la revisión de \"¿veo un objeto?\", así que cuenta en cada vuelta del ciclo.",
            "El contador nunca se reinicia a 0 al empezar la corrida.",
            "El robot se queda junto al mismo objeto durante varias vueltas del ciclo y lo cuenta cada vez.",
          ],
          fix: "Reinicia el contador a 0 al principio y mueve el \"suma 1\" dentro de la condición que detecta un objeto NUEVO. Vuelve a ejecutar y confirma que el conteo final coincide con la cantidad real de objetos.",
        },
        {
          title: "El seguidor de línea que falla con mucha luz",
          scenario: "Un robot seguidor de línea funcionaba perfecto ayer. Hoy, en un cuarto mucho más iluminado, se sale derechito de la línea todas las veces, y el programa no ha cambiado.",
          symptom: "El robot ignora la línea y no corrige el rumbo, aunque el mismo código sí corregía bien con la luz de ayer.",
          hint: "El código es idéntico al de ayer; lo que cambió es el cuarto. Lee hoy el valor de luz en vivo sobre la línea y fuera de ella, y compara los dos con el umbral del programa.",
          likelyCauses: [
            "El umbral de luz se calibró para el cuarto más oscuro de ayer y ahora está mal.",
            "La luz más fuerte subió todas las lecturas por encima del umbral, así que \"sobre la línea\" nunca se registra.",
            "El sensor no se recalibró para las condiciones de luz de hoy.",
          ],
          fix: "Lee los valores de luz de hoy sobre la línea y fuera de ella, elige un umbral nuevo a la mitad entre los dos, guarda ese valor de calibración y vuelve a ejecutar. El robot debería seguir la línea otra vez.",
        },
        {
          title: "El robot que nunca termina",
          scenario: "Un robot debería avanzar, esquivar algunos obstáculos y luego detenerse en la meta, pero sigue avanzando y esquivando para siempre y nunca termina, ni siquiera después de llegar a la meta.",
          symptom: "El robot nunca termina su programa: repite sin fin su comportamiento de esquivar y avanzar, sin detenerse.",
          hint: "Lo de esquivar funciona bien. El problema es que el robot nunca sale del ciclo. Busca una salida: ¿hay alguna condición que termine el ciclo una vez que llega a la meta?",
          likelyCauses: [
            "El comportamiento está dentro de un ciclo infinito sin salida.",
            "Un repetir-hasta tiene una condición que nunca puede volverse verdadera.",
            "No hay un \"alto seguro\" ni un \"misión cumplida\" para cuando llegue a la meta.",
          ],
          fix: "Agrégale una salida: un repetir-hasta que termine en la meta, o un \"si estoy en la meta, entonces alto\", para que el ciclo pueda terminar. Vuelve a ejecutar y confirma que el robot se detiene al llegar a la meta.",
        },
        {
          title: "El código bueno que aun así se desvía",
          scenario: "El programa de un robot es correcto y no ha cambiado (la semana pasada iba derecho), pero ahora se curva hacia un lado cada vez que avanza, incluso en un tramo corto y sin obstáculos.",
          symptom: "En lugar de ir derecho, el robot se desvía hacia un lado igual en todas las corridas, aunque el código no ha cambiado.",
          hint: "Falla igual en todas las corridas, pero el programa quedó demostrado la semana pasada. Antes de tocar el código, mira el cuerpo y las ruedas del robot, o la superficie y el montaje simulados.",
          likelyCauses: [
            "Una rueda o un eje está flojo o no quedó bien asentado.",
            "Un cable o una pieza se arrastra por el piso de un lado, o una rueda roza el armazón.",
            "En el simulador, algún ajuste de superficie o de alineación hace que un lado patine.",
          ],
          fix: "No le muevas al código. Vuelve a asentar y aprieta las dos ruedas, quita cualquier cable o basurita que se arrastre (o reinicia la superficie y la alineación simuladas). Vuelve a ejecutar y confirma que ya avanza derecho.",
        },
        {
          title: "El alto que llega demasiado tarde",
          scenario: "Un robot usa su sensor de distancia para detenerse antes de una pared. A velocidad lenta se detiene perfecto, pero cuando se le sube la velocidad se pasa y le pega a la pared, con exactamente el mismo umbral.",
          symptom: "A alta velocidad el robot se detiene demasiado tarde y choca con la pared; a baja velocidad ese mismísimo programa se detiene a tiempo.",
          hint: "El umbral que sirve cuando va lento no alcanza cuando va rápido: el robot recorre más distancia entre una lectura y la siguiente. Piensa cómo trabajan juntas la velocidad y el umbral de frenado, y cambia solo uno de los dos a la vez.",
          likelyCauses: [
            "A alta velocidad el robot recorre más distancia entre lecturas, así que un umbral muy cercano se dispara demasiado tarde.",
            "El umbral se ajustó para una velocidad más lenta que la que el robot está usando ahora.",
            "El sensor se lee con tan poca frecuencia que a esa velocidad no alcanza a detectar la pared a tiempo.",
          ],
          fix: "Cambia una sola cosa a la vez: o bajas la velocidad de avance, o subes el umbral de distancia para que se detenga antes. Vuelve a ejecutar a la velocidad que quieres y confirma que se detiene a tiempo.",
        },
      ],
      knowledgeCheck: {
        instructions: "Responde estas preguntas para comprobar que puedes depurar errores por familia y demostrar que un robot es confiable.",
        questions: [
          {
            prompt: "Diagnostica el tipo de error más probable.",
            scenario: "Un robot seguidor de línea funcionaba ayer. Hoy se pasa de largo la línea todas las veces, aunque el código no ha cambiado. Hoy el cuarto está mucho más iluminado.",
            options: [
              {
                text: "Un error de programación",
                feedback: "El código no cambió, así que lo más seguro es que el programa no sea el problema.",
              },
              {
                text: "Un error de sensor que necesita recalibración",
                feedback: "Correcto: la luz más fuerte cambió las lecturas, así que hay que recalibrar el umbral de luz.",
              },
              {
                text: "Un error mecánico",
                feedback: "Aquí no hay nada que apunte a una rueda floja ni a una pieza arrastrándose.",
              },
              {
                text: "El robot ya se descompuso para siempre",
                feedback: "Es muy probable que se arregle con solo recalibrar el sensor para la nueva luz.",
              },
            ],
            explanation: "El mismo código, más un cambio de iluminación, más lecturas malas, apunta a un error de sensor y calibración, no a uno de programa ni mecánico.",
          },
          {
            prompt: "¿Qué es depurar?",
            options: [
              {
                text: "Hacer que el robot vaya más rápido",
                feedback: "La velocidad no es depurar: depurar es encontrar y corregir por qué algo sale mal.",
              },
              {
                text: "Averiguar por qué el resultado real es distinto del esperado, y luego corregirlo",
                feedback: "Correcto: depurar es comparar lo esperado con lo real y cazar la causa de esa diferencia.",
              },
              {
                text: "Borrar todo el programa y empezar de cero",
                feedback: "Empezar de cero esconde el error en lugar de encontrarlo, y lo más probable es que repitas la equivocación.",
              },
              {
                text: "Ponerle más sensores al robot",
                feedback: "Más sensores no arreglan un error que todavía no has diagnosticado.",
              },
            ],
            explanation: "Depurar es el trabajo detectivesco de encontrar por qué el resultado real difiere del esperado, y luego corregir esa causa.",
          },
          {
            prompt: "Un robot iba derecho la semana pasada. Su programa no ha cambiado, pero ahora se curva hacia un lado en cada corrida. ¿Qué familia de error es la más probable?",
            options: [
              {
                text: "Un error de programación",
                feedback: "El programa no ha cambiado, así que lo más seguro es que las instrucciones no sean la causa.",
              },
              {
                text: "Un error de sensor",
                feedback: "Que se desvíe al ir derecho normalmente no tiene que ver con la lectura de un sensor.",
              },
              {
                text: "Un error mecánico",
                feedback: "Correcto: una rueda floja o una pieza arrastrándose es una causa física (mecánica) de que se desvíe.",
              },
              {
                text: "No hay ningún error",
                feedback: "El resultado real no coincide con el esperado, así que sí hay un error que encontrar.",
              },
            ],
            explanation: "Cuando el código no ha cambiado y el robot se desvía siempre para el mismo lado, sospecha de un error mecánico, como una rueda floja o un cable que se arrastra.",
          },
          {
            prompt: "¿Qué es un contador?",
            options: [
              {
                text: "Un sensor que mide distancias",
                feedback: "Ese es un sensor de distancia, no un contador.",
              },
              {
                text: "Una variable que empieza en un número y sube de uno en uno cada vez que pasa algo",
                feedback: "Correcto: un contador es una variable que se usa para contar, sumando 1 en cada evento.",
              },
              {
                text: "Un bloque que detiene al robot",
                feedback: "Ese es un bloque de alto; un contador lleva un total que se va acumulando.",
              },
              {
                text: "El nivel de batería del robot",
                feedback: "El nivel de batería no es un contador que tú fijes en tu programa.",
              },
            ],
            explanation: "Un contador es una variable que guarda una cuenta acumulada: empieza en un número y sube de uno en uno cada vez que ocurre un evento.",
          },
          {
            prompt: "En un ensayo de confiabilidad, ¿qué es el \"resultado esperado\"?",
            options: [
              {
                text: "Lo que pasó en realidad cuando ejecutaste el robot",
                feedback: "Ese es el resultado real: lo que observas después de ejecutar.",
              },
              {
                text: "Lo que DEBERÍA pasar si el programa funciona bien",
                feedback: "Correcto: el resultado esperado es lo que predices que debería pasar, antes de probar.",
              },
              {
                text: "La cantidad de sensores que tiene el robot",
                feedback: "Eso es un conteo de piezas, no el resultado esperado de una corrida.",
              },
              {
                text: "El tiempo más rápido posible",
                feedback: "La velocidad no es el resultado esperado, a menos que sea justamente lo que estés probando.",
              },
            ],
            explanation: "El resultado esperado es lo que debería pasar; lo comparas con el resultado real en cada corrida para ver si el robot es confiable.",
          },
          {
            prompt: "¿Por qué se ejecuta la misma tarea tres veces en un ensayo de confiabilidad?",
            options: [
              {
                text: "Para demostrar que el robot funciona una y otra vez, y no solo una vez por suerte",
                feedback: "Sí: la confiabilidad es hacer bien el trabajo repetidamente, y tres corridas que coinciden son la prueba.",
              },
              {
                text: "Porque las dos primeras corridas son solo de práctica",
                feedback: "Cada corrida es un dato real; anotas y comparas las tres.",
              },
              {
                text: "Para acabarse la batería más rápido",
                feedback: "La idea es tener pruebas de confiabilidad, no gastar energía.",
              },
              {
                text: "Porque una sola corrida va contra las reglas",
                feedback: "No es una regla: es que una sola corrida no puede demostrar la confiabilidad como sí lo hacen varias.",
              },
            ],
            explanation: "Varias corridas que coinciden demuestran la confiabilidad; si el resultado real de una corrida no coincide con el esperado, encontraste un error que corregir.",
          },
        ],
      },
      reflection: [
        {
          prompt: "¿Qué cambiaste por haberlo probado, en lugar de por adivinar?",
        },
        {
          prompt: "¿Qué te hizo saber sobre tu robot ejecutar la tarea tres veces, comparado con ejecutarla una sola vez?",
        },
        {
          prompt: "¿Por qué cambiar una sola cosa a la vez hace más fácil depurar? ¿Qué te salió mal (o bien) cuando lo intentaste?",
        },
      ],
      journalPrompts: [
        {
          prompt: "Llena tu tabla de confiabilidad de tres corridas: el resultado esperado, y el resultado real y el ¿Coincide? de cada corrida.",
        },
        {
          prompt: "Para una de las misiones de depuración, escribe el síntoma, la familia del error y el único cambio que lo corrigió.",
        },
        {
          prompt: "Anota el valor guardado final de tu contador de obstáculos y cómo se comparó con la cantidad real de obstáculos.",
        },
      ],
      savedPrograms: [
        {
          title: "Programa del contador de obstáculos",
          description: "Un programa que pone un contador en 0, repite un ciclo para leer el sensor, y le suma 1 al contador cada vez que esquiva un obstáculo.",
        },
        {
          title: "Arregla el frenado descompuesto",
          description: "Se supone que este programa detiene al robot en la casilla justo antes de la pared, pero un valor equivocado en su revisión de distancia hace que se detenga en el lugar incorrecto. Predice la familia del error, cambia el único valor de la condición del repetir-hasta y vuelve a ejecutar hasta que se detenga bien.",
        },
      ],
      simulatorMissions: [
        {
          title: "Arregla el frenado descompuesto",
          objective: "El robot se detiene en el lugar equivocado porque el valor de su revisión de distancia está desfasado por uno. Diagnostica si es un error de programación o de umbral de sensor y corrige ese único valor para que se detenga en la casilla justo antes de la pared.",
          successCriteria: [
            "El robot se detiene en la casilla justo antes de la pared",
            "Solo se cambió un valor",
            "El estudiante nombra la familia del error",
          ],
        },
        {
          title: "Contar y esquivar",
          objective: "Recorre una cuadrícula con obstáculos, esquiva cada uno y usa un contador que termine siendo igual a la cantidad de obstáculos esquivados.",
          successCriteria: [
            "El robot esquiva todos los obstáculos",
            "El contador empieza en 0 y suma 1 por cada obstáculo esquivado",
            "El contador final coincide con la cantidad de obstáculos",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Depuración y las tres familias de errores",
          focus: "Resultado esperado frente al real, y errores mecánicos, de programación y de sensores.",
        },
        {
          title: "Predice la familia del error",
          focus: "Leer cada síntoma y predecir su familia antes de investigar.",
        },
        {
          title: "Misiones de Detective de errores",
          focus: "Diagnosticar y corregir errores mecánicos, de programación y de sensores, un cambio a la vez.",
        },
        {
          title: "Contador de obstáculos",
          focus: "Usar una variable como contador para llevar la cuenta de los obstáculos esquivados.",
        },
        {
          title: "Ensayo de confiabilidad de tres corridas",
          focus: "Ejecutar la misma tarea tres veces, anotando lo esperado frente a lo real y el ¿Coincide?.",
        },
        {
          title: "Comprobación de conocimientos",
          focus: "Cinco preguntas sobre depuración, familias de errores, contadores y confiabilidad.",
        },
        {
          title: "Reflexión",
          focus: "Escribir sobre un error que encontraste y sobre lo que te dijeron las tres corridas.",
        },
      ],
      safetyNotes: [
        {
          text: "Apaga el robot antes de apretar ruedas, mover cables o revisar piezas mecánicas.",
        },
        {
          text: "Mantén la zona de prueba y la pista de obstáculos libres de manos, pies y cosas tiradas durante las corridas.",
        },
        {
          text: "Usa tijeras seguras para niños con un adulto si vas a rehacer un parachoques de papel o alguna pieza del modelo.",
        },
        {
          text: "Guarda tu programa y tu registro de pruebas con frecuencia para que al recargar el navegador no se pierdan tus resultados.",
        },
      ],
      printableResources: [
        {
          title: "Registro de prueba de confiabilidad de tres corridas",
          description: "Una tabla para el resultado esperado y para el resultado real y el ¿Coincide? de las tres corridas.",
        },
        {
          title: "Hoja del Detective de errores",
          description: "Una guía de las tres familias de errores con espacio para anotar el síntoma, la familia sospechosa, el único cambio probado y la solución.",
        },
        {
          title: "Página de bitácora de depuración y contador",
          description: "Espacio para anotar un error diagnosticado y el valor guardado final del contador de obstáculos.",
        },
        {
          title: "Guía docente de la semana 6",
          description: "Preparación, cómo sembrar errores, conducción de la clase, ideas equivocadas frecuentes y preguntas para la lección de depuración y confiabilidad.",
        },
      ],
      completion: {
        summary: "Termina la semana 6 diagnosticando un error mecánico, uno de programación y uno de sensor, haciendo un ensayo de confiabilidad de tres corridas y aprobando la comprobación de conocimientos.",
        requirements: [
          {
            label: "Diagnosticar y corregir al menos un error de cada familia, anotando el síntoma y la solución",
          },
          {
            label: "Completar un ensayo de confiabilidad de tres corridas con lo esperado frente a lo real anotado",
          },
          {
            label: "Usar una variable contador para llevar la cuenta de los obstáculos esquivados",
          },
          {
            label: "Obtener al menos 4 de 5 en la comprobación de conocimientos",
          },
          {
            label: "Escribir tu reflexión",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprime el registro de prueba de tres corridas y la hoja del Detective de errores, uno por estudiante o pareja.",
          "Ten listos para depurar los robots reactivos de la semana pasada (o las misiones del simulador o los programas de tarjetas).",
          "Prepara un caso de prueba repetible: marca una línea de salida y una distancia fija a la pared o al obstáculo, para que las corridas sean de verdad idénticas.",
        ],
        prep: [
          "Prepara con anticipación un error sembrado de cada familia: aflojar una rueda (mecánico), cambiar un número de giro (programación) y poner un umbral malo (sensor).",
          "Practica leer el valor del sensor en vivo en tu kit o en el simulador, para poder guiar las correcciones de umbral.",
          "Decide cómo van a \"sumar 1\" a un contador los estudiantes con tu equipo, y prueba tú mismo una vez el programa del contador de obstáculos.",
        ],
        facilitation: [
          "Enseña lo esperado frente a lo real y las tres familias de errores antes de tocar ningún robot.",
          "Pide a los estudiantes que primero predigan la familia del error a partir del síntoma y luego investiguen; no dejes que le piquen al azar.",
          "Insiste en cambiar una sola cosa a la vez y volver a ejecutar, para que se sepa cuál fue la causa de la corrección.",
          "Reserva tiempo para el ensayo completo de confiabilidad de tres corridas; una sola corrida con suerte no es prueba de nada.",
        ],
        commonMisconceptions: [
          "\"Funcionó una vez, así que ya está arreglado\": la confiabilidad necesita varias corridas que coincidan, no una.",
          "Dar por hecho que todo error está en el código: muchos son mecánicos (rueda floja, cable arrastrándose) o de sensor (umbral equivocado).",
          "Cambiar varias cosas a la vez, así que nadie puede saber cuál fue el cambio que de verdad lo arregló.",
          "Creer que una variable y un contador son cosas distintas: un contador es simplemente una variable que se usa para contar.",
        ],
        questionsToAsk: [
          "¿Qué esperabas que pasara, y qué pasó en realidad?",
          "¿Falla igual en todas las corridas o solo a veces? ¿Qué te dice eso sobre la familia?",
          "¿Cuál fue la ÚNICA cosa que cambiaste, y coincidió con tu predicción?",
          "¿Cómo sabes que tu robot es confiable y no que simplemente tuvo suerte?",
        ],
        easierVersion: "Dales a los estudiantes un error sembrado a la vez, con la familia ya nombrada, para que practiquen la corrección y la prueba de tres corridas sin tener además que diagnosticar la familia.",
        harderVersion: "Siembra a la vez dos errores de familias distintas, o exige un contador que dispare una acción (como detenerse después de 3 obstáculos) que los estudiantes también tengan que probar por confiabilidad.",
      },
      nextWeek: {
        teaser: "La próxima semana ponemos la confiabilidad a trabajar: vamos a planear una misión autónoma completa que el robot ejecute con seguridad por su cuenta.",
        prepare: [
          "Guarda tu registro de prueba de tres corridas y tu hoja del Detective de errores: un comportamiento confiable es la base de la misión de la próxima semana.",
          "Piensa en un trabajo que tu robot pudiera hacer de principio a fin sin que nadie lo maneje.",
          "Carga tu kit, guarda el simulador en tus marcadores, o reúne tu robot de cartón y tu pista.",
        ],
      },
    },
    {
      title: "Planear una misión autónoma",
      subtitle: "Convierte un trabajo real en un plan: requisitos, restricciones, un diagrama de flujo y una misión autónoma segura.",
      summary: "Los estudiantes aprenden cómo planean quienes hacen ingeniería el trabajo de un robot antes de construirlo. Distinguen los sistemas autónomos (que deciden solos con sensores y un programa) de los que van por control remoto (que maneja una persona), y luego escriben requisitos, restricciones y criterios para una misión y sopesan las concesiones. Dibujan el diagrama de flujo de un programa autónomo, con cuadros de acción y rombos de decisión, incluido un alto seguro, y hacen una misión corta de práctica guiada como ensayo del proyecto final de la próxima semana.",
      mainMission: "Planear una misión autónoma con requisitos, restricciones y un diagrama de flujo, y luego ensayarla con una misión corta de práctica guiada.",
      estimatedTime: "60 a 75 minutos",
      learningGoals: [
        {
          text: "Explicar la diferencia entre un sistema autónomo y uno por control remoto",
        },
        {
          text: "Escribir requisitos, restricciones y criterios de éxito para la misión de un robot",
        },
        {
          text: "Describir una concesión dentro del plan de un robot y elegir usando el proceso de diseño de ingeniería",
        },
        {
          text: "Dibujar el diagrama de flujo de un programa autónomo con cuadros de acción, rombos de decisión y un alto seguro",
        },
        {
          text: "Hacer una misión autónoma corta y guiada y comparar el resultado con sus criterios de éxito",
        },
      ],
      vocabulary: [
        {
          term: "Autónomo",
          definition: "Que actúa por su cuenta: el robot usa sus sensores y un programa para decidir qué hacer, sin que nadie lo maneje.",
        },
        {
          term: "Por control remoto",
          definition: "Manejado por una persona en tiempo real, momento a momento, por ejemplo con una palanca de mando o una aplicación.",
        },
        {
          term: "Requisito",
          definition: "Algo que el robot TIENE que hacer para que cuente como cumplir la misión, como \"llegar a la zona de entrega\".",
        },
        {
          term: "Restricción",
          definition: "Un límite dentro del cual tienes que trabajar, como el tiempo, el tamaño, los materiales o el presupuesto.",
        },
        {
          term: "Criterios",
          definition: "Las medidas con las que juzgas el éxito, como \"se detiene a menos de 5 cm de la pared\" o \"termina en menos de 30 segundos\".",
        },
        {
          term: "Concesión",
          definition: "Ceder algo de una cosa buena para conseguir más de otra, como ir más despacio para ser más confiable.",
        },
        {
          term: "Proceso de diseño de ingeniería",
          definition: "El ciclo que se repite en la ingeniería: planear, construir, probar y mejorar.",
        },
        {
          term: "Iteración",
          definition: "Una vuelta completa al ciclo de diseño: probar tu plan o tu robot, encontrar un problema y mejorarlo.",
        },
        {
          term: "Eficiencia",
          definition: "Hacer bien el trabajo con menos: menos pasos, menos tiempo o menos energía.",
        },
        {
          term: "Alto seguro",
          definition: "Un comportamiento programado que detiene al robot con seguridad cuando termina el trabajo o cuando algo se le atraviesa.",
        },
        {
          term: "Robótica responsable",
          definition: "Pensar en la seguridad y en cuándo debe seguir mandando una persona en lugar del robot.",
        },
        {
          term: "Diagrama de flujo",
          definition: "Un esquema paso a paso de un programa que usa cuadros para las acciones y rombos para las decisiones.",
        },
      ],
      prerequisites: [
        {
          reason: "El plan de una misión tiene que decir qué sensor usa el robot como entrada, algo que se presentó en la semana 4.",
        },
        {
          reason: "El diagrama de flujo y la misión de práctica usan ciclos y condiciones para reaccionar al mundo, que se enseñaron en la semana 5.",
        },
        {
          reason: "Juzgar un plan con criterios de éxito y ejecutarlo más de una vez se apoya en los hábitos de confiabilidad y pruebas de la semana 6.",
        },
      ],
      concepts: [
        {
          title: "Autónomo frente a control remoto",
          body: [
            "Hay dos maneras en que un robot puede hacer un trabajo. Cuando va por control remoto, una persona lo maneja en tiempo real y decide cada movimiento. Cuando es autónomo, el robot ejecuta su propio programa y usa sus sensores para decidir por sí mismo, sin que nadie lo maneje.",
            "Esta semana se trata de misiones autónomas, porque la próxima vas a construir un robot que tiene que hacer su trabajo solo. Eso significa que todas las decisiones hay que planearlas de antemano y escribirlas en el programa.",
          ],
          examples: [
            "Autónomos: una aspiradora robot, un vehículo explorador de Marte haciendo un recorrido planeado, un robot de entregas en la banqueta",
            "Por control remoto: un carrito a control remoto, un dron con cámara manejado con palanca, un robot de rescate que una persona conduce viendo el video",
          ],
        },
        {
          title: "Requisitos, restricciones y criterios",
          body: [
            "Antes de construir, se planea. Un requisito es lo que el robot TIENE que hacer: \"llevar el bloque a la zona azul\". Una restricción es un límite dentro del cual hay que trabajar: \"en menos de 30 segundos\", \"usando un solo sensor\", \"que no sea más grande que una caja de zapatos\". Los criterios son la forma en que vas a juzgar el éxito: \"se detiene dentro de la zona\" y \"nunca golpea la pared\".",
            "Escribir todo esto primero mantiene honesto el plan. Si no puedes decir si el robot hizo el trabajo, es que tus criterios todavía no están lo bastante claros.",
          ],
          examples: [
            "Requisito: \"encontrar el objetivo y detenerse\"",
            "Restricción: \"terminar en menos de un minuto\"",
            "Criterio: \"se detiene a menos de 5 cm del objetivo\"",
          ],
        },
        {
          title: "Concesiones y el proceso de diseño de ingeniería",
          body: [
            "Casi nunca se puede tener todo a la vez. Una concesión es ceder algo de una cosa para conseguir más de otra. Un robot que va rápido puede perderse la lectura del sensor y chocar; frenarlo cambia velocidad por confiabilidad. Rara vez hay una sola respuesta \"correcta\": eliges la concesión que mejor le queda a tus requisitos y restricciones.",
            "En ingeniería esto se maneja con el proceso de diseño: planear, construir, probar, mejorar, y luego volver a empezar. Cada vuelta es una iteración. También se piensa en la eficiencia: hacer el trabajo con menos pasos, menos tiempo o menos energía, sin romper tus criterios.",
          ],
          examples: [
            "Rápido frente a confiable",
            "Programa sencillo frente a poder con más obstáculos",
            "Menos pasos (eficiente) frente a más revisiones cuidadosas",
          ],
        },
        {
          title: "Diagramas de flujo: dibujar el programa antes de programarlo",
          body: [
            "Un diagrama de flujo es un dibujo de los pasos de tu programa. Las acciones van en rectángulos (\"avanzar\", \"detenerse\"). Las decisiones van en rombos y hacen una pregunta de sí o no (\"¿Hay una pared adelante?\"), con una flecha de salida para el \"sí\" y otra para el \"no\". Las flechas conectan los cuadros para que puedas seguir el camino que va a tomar el robot.",
            "Dibujar primero el diagrama de flujo te deja encontrar problemas antes de construir. Un buen diagrama autónomo siempre incluye un ciclo que no deja de revisar un sensor y un final claro, que es donde va tu alto seguro.",
          ],
          examples: [
            "Rectángulo = acción",
            "Rombo = una decisión de sí o no",
            "Flechas = el orden de los pasos",
          ],
        },
        {
          title: "Detenerse con seguridad y robótica responsable",
          body: [
            "Un robot autónomo decide por su cuenta, así que necesita una manera de detenerse con seguridad: un comportamiento programado que lo pare cuando el trabajo está hecho o cuando algo (o alguien) se le atraviesa. Sin un alto seguro, un robot autónomo puede seguir metiéndose contra una pared o contra una persona.",
            "Esto es parte de la robótica responsable: pensar en la seguridad y en cuándo debe seguir mandando una persona. Los robots autónomos son buenísimos para los trabajos aburridos y repetitivos, pero para cualquier cosa riesgosa (cerca de gente, o donde un error podría lastimar a alguien) una persona debe poder supervisar, tomar el control o apagarlo.",
            "Quienes diseñan de manera responsable también piensan en la privacidad: un robot con cámara o micrófono recoge información sobre las personas, así que solo recoges lo que el trabajo de verdad necesita. Se planea para las fallas: si un sistema se descompone, ¿quién es responsable, y falla de forma segura deteniéndose en lugar de seguir de frente? Y se decide en qué trabajos el robot solo debería asistir a una persona en vez de controlarlo todo: un robot puede pasarle un instrumento a una enfermera, pero la decisión médica la toma una persona.",
            "Por último, los buenos robots se diseñan pensando en usuarios y necesidades distintas: quienes los usan pueden ser jóvenes o mayores, pueden no leer el mismo idioma, o pueden necesitar botones más grandes, sonidos o luces. Diseñar para personas reales y variadas es parte de hacer robótica de manera responsable.",
          ],
          examples: [
            "Una aspiradora robot se detiene y retrocede al borde de una escalera",
            "Un robot de entregas se detiene cuando alguien se le cruza enfrente",
            "Una persona mantiene la mano cerca del botón de paro durante las pruebas",
            "Un robot doméstico solo graba lo que necesita y avisa antes de hacerlo",
            "Una alerta usa a la vez una luz y un sonido, para que más gente pueda notarla",
          ],
        },
        {
          title: "Robots autónomos en el mundo real",
          body: [
            "Los robots autónomos ya hacen trabajos de verdad, casi siempre aburridos, sucios o peligrosos, y casi siempre con gente supervisando. Ver ejemplos reales te ayuda a planear tu propia misión: cada uno percibe el mundo, decide con un programa, actúa, y tiene una manera de detenerse con seguridad.",
            "Mientras los lees, fíjate en el patrón de la semana 1: entrada (un sensor), procesamiento (una decisión), salida (una acción), más un alto seguro y una persona que puede intervenir.",
          ],
          examples: [
            "Los robots de entrega de almacén llevan estantes a los trabajadores y detectan a otros robots para no chocar",
            "Los vehículos exploradores de Marte recorren rutas planeadas por su cuenta, porque las órdenes desde la Tierra tardan minutos en llegar",
            "Los robots agrícolas recorren los surcos para revisar las plantas o arrancar la hierba mala",
            "Los robots de búsqueda y rescate entran a escombros o humo, donde es demasiado peligroso para una persona",
            "Los robots de inspección submarina revisan tuberías, cascos y cables donde un buzo no puede ir con seguridad",
            "Los brazos robóticos de fábrica sueldan y ensamblan la misma pieza con precisión, una y otra vez, detrás de una barrera de seguridad",
            "Las herramientas quirúrgicas robóticas le permiten a quien opera hacer movimientos más firmes y pequeños, y esa persona mantiene el control todo el tiempo",
          ],
        },
      ],
      materials: [
        {
          name: "Hoja de trabajo Ficha de planeación de la misión (imprimible)",
        },
        {
          name: "Página de diagrama de flujo con cuadros de acción y rombos de decisión (imprimible)",
        },
        {
          name: "Lápiz, goma y papel",
        },
        {
          name: "Un recorrido corto marcado o una \"zona\" a la que llegar (cinta, vasos o una caja)",
        },
        {
          name: "Un kit de robótica programable con al menos un sensor",
        },
        {
          name: "Computadora o tableta con el simulador del navegador",
        },
        {
          name: "El modelo de robot de cartón y las tarjetas de programa de semanas anteriores",
        },
        {
          name: "Cronómetro o temporizador, para revisar una restricción de tiempo",
        },
      ],
      activities: [
        {
          title: "Escribe un plan de misión",
          goal: "Convertir un trabajo autónomo pequeño en un plan: requisitos, restricciones, criterios de éxito y una concesión que tuviste que sopesar.",
          shared: [
            "Elige una misión autónoma pequeña, como \"llegar a la zona y detenerse\" o \"buscar hasta encontrar el objetivo\". Escríbela arriba de la Ficha de planeación de la misión.",
            "Llena la ficha: requisitos (lo que TIENE que hacer), restricciones (límites como el tiempo, el tamaño o un solo sensor) y criterios (cómo vas a juzgar el éxito). Después nombra una concesión que tuviste que sopesar, como velocidad frente a confiabilidad.",
          ],
          variants: {
            kit: {
              title: "Planea una misión para el robot de tu kit",
              materials: [
                "Hoja de trabajo Ficha de planeación de la misión",
                "El robot del kit como referencia",
                "Una zona marcada o un recorrido corto",
              ],
              instructions: [
                "Elige una misión que tu kit de verdad pueda hacer esta semana, como llegar a una zona marcada con cinta y detenerse.",
                "Escribe los requisitos y luego las restricciones que impone tu kit (su velocidad, su único sensor, el espacio que tienes).",
                "Escribe criterios de éxito medibles y luego nombra una concesión; por ejemplo, ir más despacio para leer el sensor de forma confiable.",
              ],
              safetyNotes: [
                "Este paso se hace en papel; mantén el robot apagado mientras planeas.",
              ],
              expectedResult: "Una ficha completa con al menos dos requisitos, dos restricciones, dos criterios medibles y una concesión nombrada.",
              successCriteria: [
                "Los requisitos dicen lo que el robot TIENE que hacer",
                "Las restricciones enumeran límites reales",
                "Los criterios son medibles (un número o un sí o no bien claro)",
                "Se nombra una concesión",
              ],
              troubleshooting: [
                {
                  problem: "Los requisitos y las restricciones se ven iguales",
                  fix: "Un requisito es un trabajo (\"llegar a la zona\"); una restricción es un límite (\"en menos de 30 segundos\"). Clasifica cada renglón en uno u otro.",
                },
              ],
              extension: "Agrega una segunda versión más difícil de la misión y enumera qué requisito nuevo trae consigo.",
            },
            simulator: {
              title: "Planea una misión de cuadrícula para el simulador",
              materials: [
                "Hoja de trabajo Ficha de planeación de la misión",
                "Simulador en el navegador como referencia",
              ],
              instructions: [
                "Elige una misión de cuadrícula, como \"llegar a la casilla de meta y detenerse\" o \"recorrer la fila hasta que el sensor detecte el objetivo\".",
                "Escribe los requisitos y luego las restricciones que impone la cuadrícula (su tamaño, un solo bloque de sensor, un límite de pasos).",
                "Escribe criterios medibles (llega a la casilla de meta, se detiene ahí) y luego nombra una concesión, como usar más pasos para esquivar los muros.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; toma un descanso de la pantalla si lo necesitas.",
              ],
              expectedResult: "Una ficha completa para una misión de cuadrícula con requisitos, restricciones, criterios y una concesión bien claros.",
              successCriteria: [
                "Los requisitos dicen lo que el robot TIENE que hacer",
                "Las restricciones enumeran límites reales",
                "Los criterios son medibles",
                "Se nombra una concesión",
              ],
              troubleshooting: [
                {
                  problem: "Los criterios no se pueden comprobar en el simulador",
                  fix: "Escribe criterios que el simulador pueda mostrar, como \"cae en la casilla de meta\" o \"se detiene antes del borde\".",
                },
              ],
              extension: "Planea la misma misión en una cuadrícula más grande y anota qué restricción se pone más difícil.",
            },
            unplugged: {
              title: "Planea una misión de pista de piso para tu modelo",
              materials: [
                "Hoja de trabajo Ficha de planeación de la misión",
                "Modelo de robot de cartón",
                "Un camino o una zona marcados con cinta en el piso",
              ],
              instructions: [
                "Elige una misión que tu modelo pueda \"caminar\" a lo largo de un camino de cinta, como \"llegar a la caja y detenerse\".",
                "Escribe los requisitos y luego las restricciones (el largo del camino, un sensor improvisado como un parachoques de papel, un límite de tiempo).",
                "Escribe criterios medibles que puedas observar, y luego nombra una concesión, como menos pasos frente a revisar el parachoques más seguido.",
              ],
              safetyNotes: [
                "Mantén despejado el camino del piso para que nadie se tropiece mientras actúan la misión.",
              ],
              expectedResult: "Una ficha completa para una misión de pista de piso con requisitos, restricciones, criterios y una concesión bien claros.",
              successCriteria: [
                "Los requisitos dicen lo que el robot TIENE que hacer",
                "Las restricciones enumeran límites reales",
                "Los criterios son medibles",
                "Se nombra una concesión",
              ],
              troubleshooting: [
                {
                  problem: "No hay una manera clara de juzgar el éxito",
                  fix: "Agrega una marca física, como una \"zona\" de cinta, para que el éxito sea algo que puedas ver y señalar.",
                },
              ],
              extension: "Intercambien fichas con otro equipo y revisen si sus criterios son lo bastante claros para poder juzgarlos.",
            },
          },
        },
        {
          title: "Dibuja el diagrama de flujo de la misión",
          goal: "Convertir el plan de la misión en un diagrama de flujo con cuadros de acción, al menos un rombo de decisión, un ciclo que revise un sensor y un alto seguro.",
          shared: [
            "En la página del diagrama, empieza en un cuadro de \"Inicio\" y termina en un cuadro de \"Alto seguro\". Pon las acciones en rectángulos y cada decisión de sí o no en un rombo, con una flecha de \"sí\" y otra de \"no\".",
            "Tu diagrama autónomo tiene que revisar un sensor una y otra vez (un ciclo) y tiene que terminar en un alto seguro: el robot se detiene cuando el trabajo está hecho o cuando algo se le atraviesa.",
          ],
          variants: {
            kit: {
              title: "Haz el diagrama de flujo de la misión de tu kit",
              materials: [
                "Página de diagrama de flujo",
                "Tu Ficha de planeación de la misión ya completa",
              ],
              instructions: [
                "Escribe en orden los pasos de la misión: Inicio y luego las acciones (avanzar, etc.).",
                "Agrega un rombo de decisión para la revisión del sensor, como \"¿Hay una pared adelante?\", con un camino de \"sí\" y uno de \"no\".",
                "Haz que el camino del \"no\" regrese en ciclo para seguir avanzando y revisando; manda el camino del \"sí\" al cuadro de Alto seguro.",
              ],
              safetyNotes: [
                "Este es un paso de papel; todavía no hace falta que ningún robot se ponga a andar.",
              ],
              expectedResult: "Un diagrama de flujo desde Inicio hasta Alto seguro, con cuadros de acción, al menos un rombo de decisión, un ciclo de regreso y un final claro.",
              successCriteria: [
                "Las acciones están en rectángulos",
                "Al menos una decisión está en un rombo con flechas de sí y no",
                "Un ciclo no deja de revisar el sensor",
                "Termina en un alto seguro",
              ],
              troubleshooting: [
                {
                  problem: "El diagrama de flujo nunca se detiene",
                  fix: "Todo diagrama autónomo necesita una salida: manda una flecha desde una decisión hasta el cuadro de Alto seguro.",
                },
              ],
              extension: "Agrega un segundo rombo de decisión para que el robot maneje dos lecturas de sensor distintas.",
            },
            simulator: {
              title: "Haz el diagrama de flujo de tu misión de cuadrícula",
              materials: [
                "Página de diagrama de flujo",
                "Tu Ficha de planeación de la misión ya completa",
              ],
              instructions: [
                "Enumera los pasos de la misión de cuadrícula: Inicio y luego las acciones de movimiento por la cuadrícula.",
                "Agrega un rombo de decisión para el bloque del sensor, como \"¿Llegué a la meta?\" o \"¿Hay un obstáculo adelante?\", con flechas de sí y no.",
                "Haz que el camino del \"no\" regrese en ciclo para seguir avanzando y revisando; manda el camino del \"sí\" al cuadro de Alto seguro.",
              ],
              safetyNotes: [
                "No hay riesgos físicos.",
              ],
              expectedResult: "Un diagrama de flujo que corresponda a un programa que podrías armar en el simulador, y que termine en un alto seguro.",
              successCriteria: [
                "Las acciones están en rectángulos",
                "Al menos una decisión está en un rombo con flechas de sí y no",
                "Un ciclo no deja de revisar el sensor",
                "Termina en un alto seguro",
              ],
              troubleshooting: [
                {
                  problem: "No queda claro cuál bloque es la decisión",
                  fix: "La decisión está donde el programa le hace al sensor una pregunta de sí o no: eso se convierte en un rombo.",
                },
              ],
              extension: "Traslada el diagrama directamente a los bloques de repetir-hasta y de si del simulador antes de armarlo.",
            },
            unplugged: {
              title: "Haz el diagrama de flujo de tu misión de pista de piso",
              materials: [
                "Página de diagrama de flujo",
                "Tu Ficha de planeación de la misión ya completa",
              ],
              instructions: [
                "Escribe en orden los pasos de la misión de piso, empezando en un cuadro de Inicio.",
                "Agrega un rombo de decisión para la revisión del sensor improvisado, como \"¿El parachoques está tocando la pared?\", con flechas de sí y no.",
                "Haz que el \"no\" regrese en ciclo para seguir avanzando y revisando; manda el \"sí\" al cuadro de Alto seguro.",
              ],
              safetyNotes: [
                "Este paso es solo de papel; lo van a actuar después con un compañero.",
              ],
              expectedResult: "Un diagrama de flujo dibujado a mano, desde Inicio hasta Alto seguro, que un compañero pudiera seguir para ejecutar la misión.",
              successCriteria: [
                "Las acciones están en rectángulos",
                "Al menos una decisión está en un rombo con flechas de sí y no",
                "Un ciclo no deja de revisar el sensor",
                "Termina en un alto seguro",
              ],
              troubleshooting: [
                {
                  problem: "Un compañero se confunde al seguirlo",
                  fix: "Haz que cada cuadro sea una acción exacta, y asegúrate de que cada rombo tenga exactamente dos flechas rotuladas.",
                },
              ],
              extension: "Convierte cada cuadro del diagrama en una tarjeta de programa para la siguiente actividad.",
            },
          },
        },
        {
          title: "Misión autónoma de práctica guiada",
          goal: "Ejecutar una misión autónoma corta (llegar a una zona, reaccionar ante un obstáculo y detenerse con seguridad) como ensayo del proyecto final de la próxima semana.",
          shared: [
            "Arma el programa directo de tu diagrama de flujo: una secuencia para avanzar, un ciclo que no deje de revisar un sensor, una condición que reaccione ante un obstáculo y un alto seguro cuando el robot llegue a la zona o se tope con el obstáculo.",
            "Ejecútalo, obsérvalo contra tus criterios de éxito y anota una cosa que mejorarías; ese paso de mejorar es una iteración, justo lo que vas a hacer mucho más la próxima semana.",
          ],
          variants: {
            kit: {
              title: "Ejecuta la misión de práctica en el robot de tu kit",
              materials: [
                "Kit de robótica con un sensor",
                "Zona marcada o recorrido corto",
                "Tu diagrama de flujo",
              ],
              instructions: [
                "Arma un recorrido corto: una línea de salida, una zona a la que llegar y un obstáculo en el camino.",
                "Programa una secuencia de avance, un ciclo que revise el sensor de distancia o de contacto, una condición que reaccione ante el obstáculo y un alto seguro en la zona.",
                "Ejecútalo una vez desde la línea de salida y compáralo con tus criterios de éxito; anota una mejora.",
              ],
              safetyNotes: [
                "Mantén despejada la zona de prueba y los dedos lejos de las ruedas mientras funciona.",
                "Mantente listo para detener el robot si se sale del recorrido.",
              ],
              expectedResult: "El robot del kit llega a la zona, reacciona ante el obstáculo y se detiene con seguridad en lugar de empujarlo.",
              successCriteria: [
                "Llega a la zona",
                "Reacciona ante el obstáculo en lugar de ignorarlo",
                "Se detiene con seguridad (no sigue avanzando)",
                "Se anota una mejora",
              ],
              troubleshooting: [
                {
                  problem: "El robot ignora el obstáculo",
                  fix: "Revisa el umbral del sensor y que el ciclo no deje de leerlo, como en el trabajo de confiabilidad de la semana 6.",
                },
                {
                  problem: "El robot se pasa de la zona",
                  fix: "Baja la velocidad de avance o agrega una revisión de distancia antes del alto: es una concesión de velocidad por confiabilidad.",
                },
              ],
              extension: "Mueve el obstáculo a otro lugar y confirma que el robot sigue reaccionando y deteniéndose.",
            },
            simulator: {
              title: "Ejecuta la misión de práctica en el simulador",
              materials: [
                "Simulador en el navegador",
                "Tu diagrama de flujo",
              ],
              instructions: [
                "Prepara una cuadrícula con una casilla de salida, una zona de meta y un obstáculo en el camino.",
                "Arma el programa: bloques de movimiento, un ciclo de repetir-hasta que revise el bloque del sensor, una condición si para el obstáculo y un bloque de alto en la meta.",
                "Ejecútalo desde la casilla de salida, compáralo con tus criterios de éxito y anota una mejora.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; guarda tu programa para que una recarga no lo borre.",
              ],
              expectedResult: "El robot del simulador llega a la zona de meta, reacciona ante el obstáculo y se detiene al terminar.",
              successCriteria: [
                "Llega a la zona de meta",
                "Reacciona ante el obstáculo en lugar de ignorarlo",
                "Se detiene con seguridad al terminar",
                "Se anota una mejora",
              ],
              troubleshooting: [
                {
                  problem: "El robot atraviesa el obstáculo",
                  fix: "Asegúrate de que la condición si lea el sensor dentro del ciclo, antes del movimiento.",
                },
                {
                  problem: "El ciclo nunca termina",
                  fix: "Revisa que la condición del repetir-hasta de verdad se vuelva verdadera cuando el robot llegue a la meta.",
                },
              ],
              extension: "Agrega un segundo obstáculo y confirma que el mismo programa sigue terminando con seguridad.",
            },
            unplugged: {
              title: "Ejecuta la misión de práctica con tarjetas y un compañero",
              materials: [
                "Modelo de robot de cartón",
                "Tarjetas de programa",
                "Pista de piso con cinta, con una zona y un obstáculo",
                "Tu diagrama de flujo",
              ],
              instructions: [
                "Marca con cinta en el piso una línea de salida, una zona y un obstáculo.",
                "Convierte tu diagrama de flujo en tarjetas de programa: tarjetas de avanzar, una de repetir, una tarjeta de si para el sensor improvisado (\"si el parachoques toca el obstáculo, gira\") y una tarjeta de alto en la zona.",
                "Pide a un compañero que \"ejecute\" las tarjetas moviendo el modelo paso a paso; compáralo con los criterios y anota una mejora.",
              ],
              safetyNotes: [
                "Mantén despejada la pista del piso para que quien mueve el modelo no se tropiece.",
              ],
              expectedResult: "Un compañero puede seguir las tarjetas para llevar el modelo hasta la zona, reaccionar ante el obstáculo y detenerse.",
              successCriteria: [
                "Llega a la zona",
                "Reacciona ante el obstáculo en lugar de ignorarlo",
                "Se detiene con seguridad al final",
                "Se anota una mejora",
              ],
              troubleshooting: [
                {
                  problem: "El compañero lo ejecuta distinto de como tú lo pensabas",
                  fix: "Haz que cada tarjeta sea una instrucción exacta, como las secuencias de la semana 3, para que solo haya una manera de leerla.",
                },
                {
                  problem: "No hay ninguna reacción ante el obstáculo",
                  fix: "Agrega una tarjeta de si que diga qué hacer cuando el parachoques toque el obstáculo.",
                },
              ],
              extension: "Intercambien programas de tarjetas con otro equipo y ejecuten la misión de práctica del otro.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de ejecutarla, predice: ¿tu misión de práctica va a cumplir todos sus criterios de éxito al primer intento, y cuál criterio es el que más probablemente falle?",
          howToCheck: "Ejecuta la misión de práctica guiada y compara lo que pasa con cada criterio de éxito que escribiste en tu ficha.",
        },
      ],
      testRecords: [
        {
          title: "La misión de práctica frente a sus criterios",
          instructions: "Ejecuta la misión de práctica guiada desde el mismo punto de partida cada vez. En cada corrida, anota qué pasó y compáralo con los criterios de éxito de tu ficha.",
          columns: [
            null,
            "¿Llegó a la zona? (S/N)",
            "¿Reaccionó ante el obstáculo? (S/N)",
            "¿Se detuvo con seguridad? (S/N)",
            "Qué mejorar",
          ],
          measure: "Si se cumplió cada criterio de éxito, y qué cambiar para el proyecto final",
        },
      ],
      knowledgeCheck: {
        instructions: "Responde estas preguntas para comprobar que puedes planear una misión autónoma y leer un diagrama de flujo.",
        questions: [
          {
            prompt: "Un robot de entregas llega solo a una zona de descarga, usando sus sensores y su programa, sin que nadie lo maneje. Este robot es:",
            options: [
              {
                text: "Por control remoto",
                feedback: "Por control remoto significa que una persona lo maneja en tiempo real, y aquí nadie lo está manejando.",
              },
              {
                text: "Autónomo",
                feedback: "Correcto: usa sus propios sensores y su programa para decidir, sin que nadie lo maneje.",
              },
              {
                text: "No es un robot",
                feedback: "Percibe, decide y actúa, así que sí es un robot.",
              },
              {
                text: "Descompuesto",
                feedback: "Hacer el trabajo por su cuenta es exactamente lo que debe hacer un robot autónomo.",
              },
            ],
            explanation: "Un sistema autónomo usa sus propios sensores y su programa para decidir, sin que nadie lo maneje; uno por control remoto lo conduce una persona en tiempo real.",
          },
          {
            prompt: "\"El robot debe llegar a la zona azul\" y \"tiene que terminar en menos de 30 segundos\". ¿Cuál es el requisito y cuál la restricción?",
            options: [
              {
                text: "Llegar a la zona es el requisito; el límite de 30 segundos es la restricción",
                feedback: "Correcto: un requisito es lo que TIENE que hacer; una restricción es un límite dentro del cual trabajas.",
              },
              {
                text: "Llegar a la zona es la restricción; el límite de 30 segundos es el requisito",
                feedback: "Es al revés: llegar a la zona es el trabajo (requisito); el límite de tiempo es la restricción.",
              },
              {
                text: "Las dos son restricciones",
                feedback: "Una de las dos es el trabajo que el robot tiene que hacer, y eso la vuelve un requisito.",
              },
              {
                text: "Las dos son requisitos",
                feedback: "Un límite de tiempo es un límite dentro del cual trabajas, o sea una restricción, no un trabajo que hacer.",
              },
            ],
            explanation: "Un requisito es lo que el robot TIENE que hacer; una restricción es un límite como el tiempo, el tamaño, los materiales o el presupuesto, dentro del cual hay que trabajar.",
          },
          {
            prompt: "En un diagrama de flujo, ¿qué significa un rombo?",
            options: [
              {
                text: "Una acción que hace el robot",
                feedback: "Las acciones van en rectángulos, no en rombos.",
              },
              {
                text: "Una decisión de sí o no",
                feedback: "Sí: un rombo hace una pregunta de sí o no y tiene una flecha de salida para cada respuesta.",
              },
              {
                text: "El final del programa",
                feedback: "El final suele ser un cuadro de alto, no un rombo de decisión.",
              },
              {
                text: "Cuánto tarda un paso",
                feedback: "Un diagrama de flujo muestra pasos y decisiones dentro de las figuras, no tiempos.",
              },
            ],
            explanation: "En un diagrama de flujo, los rectángulos llevan acciones y los rombos llevan decisiones de sí o no, cada uno con una flecha de \"sí\" y otra de \"no\".",
          },
          {
            prompt: "Tu robot avanza rápido pero a veces se pierde la lectura del sensor y choca. Lo frenas para que lea de forma confiable. Esta decisión es un ejemplo de:",
            options: [
              {
                text: "Un requisito",
                feedback: "Esto no es un trabajo que el robot tenga que hacer; es una elección entre dos cosas buenas.",
              },
              {
                text: "Una concesión",
                feedback: "Correcto: cediste algo de velocidad para ganar confiabilidad. Eso es una concesión.",
              },
              {
                text: "Un alto seguro",
                feedback: "Un alto seguro es una parada programada; cambiar la velocidad es una concesión de diseño.",
              },
              {
                text: "Una restricción",
                feedback: "Una restricción es un límite fijo; aquí tú elegiste ceder velocidad a cambio de confiabilidad.",
              },
            ],
            explanation: "Una concesión es ceder algo de una cosa (velocidad) para conseguir más de otra (confiabilidad), y en ingeniería se sopesan usando el proceso de diseño.",
          },
          {
            prompt: "¿Por qué un robot autónomo necesita un alto seguro en su programa?",
            options: [
              {
                text: "Para que se vea terminado",
                feedback: "Un alto seguro tiene que ver con la seguridad y el control, no con la apariencia.",
              },
              {
                text: "Para que se detenga con seguridad cuando el trabajo está hecho o algo se le atraviesa, en lugar de metérsele encima",
                feedback: "Correcto: como nadie lo está manejando, el programa mismo tiene que detener al robot con seguridad.",
              },
              {
                text: "Para que pueda ir más rápido",
                feedback: "Un alto seguro detiene al robot; no tiene nada que ver con la velocidad.",
              },
              {
                text: "Para que nunca necesite un sensor",
                feedback: "Un alto seguro normalmente depende de un sensor para saber cuándo detenerse.",
              },
            ],
            explanation: "Como un robot autónomo decide por su cuenta, su programa necesita un alto seguro para detenerse cuando el trabajo está hecho o algo se le atraviesa; eso es parte de la robótica responsable.",
          },
        ],
      },
      reflection: [
        {
          prompt: "¿Qué te costó más trabajo escribir para tu misión: los requisitos, las restricciones o los criterios? ¿Por qué?",
        },
        {
          prompt: "Describe una concesión de tu plan. ¿Qué cediste, y qué obtuviste a cambio?",
        },
        {
          prompt: "Robótica responsable: nombra un trabajo en el que un robot autónomo de verdad ayuda, y una situación en la que una persona debería seguir mandando. Explica tu razonamiento.",
        },
      ],
      journalPrompts: [
        {
          prompt: "Escribe tu mini ficha de planeación: la misión, sus requisitos, sus restricciones y sus criterios de éxito.",
        },
        {
          prompt: "Dibuja el diagrama de flujo de tu misión autónoma con cuadros de acción, al menos un rombo de decisión y un alto seguro.",
        },
        {
          prompt: "Después de la corrida de práctica, marca cuáles criterios de éxito cumplió tu misión.",
        },
      ],
      savedPrograms: [
        {
          title: "Programa de la misión de práctica guiada",
          description: "El programa autónomo de práctica armado a partir de tu diagrama de flujo: avanzar, un ciclo que no deja de revisar un sensor, una condición que reacciona ante un obstáculo y un alto seguro en la zona.",
        },
      ],
      simulatorMissions: [
        {
          title: "Misión de práctica: llegar a la zona",
          objective: "Llegar solo a la zona de meta, reaccionar ante un obstáculo en el camino y detenerse con seguridad al llegar.",
          successCriteria: [
            "El robot llega a la zona de meta",
            "El robot reacciona ante el obstáculo en lugar de atravesarlo",
            "El robot se detiene con seguridad al llegar",
          ],
        },
        {
          title: "Misión de práctica: buscar y detenerse",
          objective: "Recorrer la fila buscando hasta que el sensor detecte el objetivo, y entonces detenerse con seguridad ahí mismo.",
          successCriteria: [
            "El robot sigue buscando hasta que el sensor detecta el objetivo",
            "El robot se detiene en cuanto encuentra el objetivo",
            "El robot no se sale del borde de la cuadrícula",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Autónomo frente a control remoto, y las palabras de la planeación",
          focus: "Autónomo frente a control remoto; requisitos, restricciones, criterios, concesiones y el proceso de diseño.",
        },
        {
          title: "Escribe un plan de misión",
          focus: "Requisitos, restricciones, criterios y una concesión en la ficha de planeación.",
        },
        {
          title: "Dibuja el diagrama de flujo de la misión",
          focus: "Cuadros de acción, un rombo de decisión, un ciclo y un alto seguro.",
        },
        {
          title: "Predice el resultado",
          focus: "Predecir si la misión va a cumplir sus criterios y cuál es el que más probablemente falle.",
        },
        {
          title: "Misión autónoma de práctica guiada",
          focus: "Hacer el ensayo de llegar a la zona, reaccionar y detenerse con seguridad.",
        },
        {
          title: "Compara con los criterios",
          focus: "Registrar la corrida y compararla con los criterios de éxito.",
        },
        {
          title: "Comprobación de conocimientos",
          focus: "Cinco preguntas sobre planeación, autonomía, diagramas de flujo y altos seguros.",
        },
        {
          title: "Reflexión",
          focus: "Concesiones y robótica responsable.",
        },
      ],
      safetyNotes: [
        {
          text: "Durante la corrida de práctica, mantén despejada la zona de prueba y mantente listo para detener el robot si se sale del recorrido; mantén los dedos lejos de las ruedas en movimiento.",
        },
        {
          text: "Programa siempre un alto seguro para que un robot autónomo se detenga cuando el trabajo está hecho o algo se le atraviesa, en lugar de meterse contra una pared o una persona.",
        },
        {
          text: "Mantén despejada la pista de piso marcada con cinta para que nadie se tropiece mientras actúan la misión.",
        },
        {
          text: "Guarda tu programa y tu bitácora con frecuencia para que al recargar el navegador no se pierda tu plan.",
        },
      ],
      printableResources: [
        {
          title: "Ficha de planeación de la misión",
          description: "Una ficha de una página para escribir la misión, los requisitos, las restricciones, los criterios de éxito y una concesión.",
        },
        {
          title: "Página del diagrama de flujo de la misión",
          description: "Una página para dibujar el programa autónomo como diagrama de flujo, con cuadros de acción, rombos de decisión y un alto seguro.",
        },
        {
          title: "Registro de prueba de la misión de práctica",
          description: "Una tabla corta para registrar la corrida de práctica y compararla con los criterios de éxito de la misión.",
        },
        {
          title: "Guía docente de la semana 7",
          description: "Preparación, conducción de la clase, ideas equivocadas frecuentes y preguntas para la lección de planeación de misiones.",
        },
      ],
      completion: {
        summary: "Termina la semana 7 escribiendo un plan de misión, dibujando su diagrama de flujo con un alto seguro, ejecutando la misión de práctica guiada frente a sus criterios, y aprobando la comprobación de conocimientos.",
        requirements: [
          {
            label: "Completar la Ficha de planeación de la misión con requisitos, restricciones, criterios y una concesión",
          },
          {
            label: "Dibujar el diagrama de flujo de la misión con un rombo de decisión y un alto seguro",
          },
          {
            label: "Ejecutar la misión de práctica guiada y registrarla frente a sus criterios",
          },
          {
            label: "Obtener al menos 4 de 5 en la comprobación de conocimientos",
          },
          {
            label: "Escribir tu reflexión",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprime la Ficha de planeación de la misión, la página del diagrama de flujo y el registro de prueba de la misión de práctica, uno por estudiante o equipo.",
          "Prepara un recorrido corto de práctica (una línea de salida, una zona marcada y un obstáculo) para las rutas del kit y sin dispositivos.",
          "Si usas kits, cárgalos y confirma que un sensor funcione; si usas el simulador, ábrelo y carga una cuadrícula de 6x6.",
        ],
        prep: [
          "Escribe tú mismo una ficha de misión de ejemplo para poder modelar la diferencia entre requisitos, restricciones y criterios.",
          "Bosqueja un diagrama de flujo de ejemplo con un rombo de decisión y un alto seguro, para mostrar cómo se ve.",
          "Ten pensadas una o dos misiones para ofrecerles a los equipos que se atoren al elegir.",
        ],
        facilitation: [
          "Empieza con la diferencia entre autónomo y control remoto y con el vocabulario de la planeación, antes de construir nada.",
          "Haz que los equipos escriban primero la ficha; revisa que los criterios sean medibles antes de que sigan adelante.",
          "Modela cómo pasar una ficha a un diagrama de flujo y luego deja que los equipos dibujen el suyo.",
          "Haz que todos predigan, ejecuten una vez la misión de práctica guiada y la registren frente a los criterios; mantén el alto seguro en primer plano, como ensayo de la próxima semana.",
        ],
        commonMisconceptions: [
          "Confundir requisitos con restricciones: un requisito es el trabajo, una restricción es un límite.",
          "\"Autónomo solo significa que se mueve\": moverse no basta; tiene que decidir por sí mismo con sensores y un programa.",
          "Olvidar el alto seguro, o dibujar un diagrama de flujo sin manera de terminar.",
          "Creer que una concesión significa que una opción está simplemente \"mal\", en vez de ser un equilibrio entre dos cosas buenas.",
        ],
        questionsToAsk: [
          "¿Ese renglón es un requisito (un trabajo) o una restricción (un límite)?",
          "¿Cómo vas a comprobar de verdad si el robot cumplió ese criterio?",
          "¿Dónde termina tu diagrama de flujo, y qué hace que el robot se detenga con seguridad?",
          "¿Qué cediste para obtener otra cosa, y valió la pena?",
        ],
        easierVersion: "Dales a los equipos una misión ya hecha y una ficha llena a medias, para que se concentren en el diagrama de flujo y el alto seguro.",
        harderVersion: "Exige dos rombos de decisión y un segundo criterio de éxito, y pide a los equipos que justifiquen por escrito su concesión.",
      },
      nextWeek: {
        teaser: "La próxima semana es el proyecto final: vas a diseñar, construir o simular, programar, probar y mejorar un robot que cumpla una misión útil que tú elijas, usando exactamente la planeación que practicaste hoy.",
        prepare: [
          "Guarda tu Ficha de planeación de la misión y tu diagrama de flujo: puedes reutilizarlos o mejorarlos para el proyecto final.",
          "Dale una hojeada a las cinco misiones del proyecto final (entrega, búsqueda y rescate, inspección, clasificación y ayuda de accesibilidad) y piensa cuál escogerías.",
          "Carga tu kit o guarda el simulador en tus marcadores, y reúne el cartón y los materiales de semanas anteriores.",
        ],
      },
    },
    {
      title: "Diseña un robot que ayude",
      subtitle: "Elige una misión real y diseña, construye, programa, prueba y mejora un robot que la cumpla.",
      summary: "Este es el proyecto final. Los estudiantes eligen una misión (entrega, búsqueda y rescate, inspección, clasificación o ayuda de accesibilidad) y juntan todo lo del curso: una ficha de planeación, un boceto rotulado, un diagrama de entrada, procesamiento y salida, un diagrama de flujo, un diseño mecánico que se mueva, al menos un sensor, y un programa que use una secuencia, un ciclo y una condición, con un comportamiento de alto seguro. Hacen tres corridas de prueba, documentan una mejora y explican de qué manera ayuda su robot.",
      mainMission: "Diseñar, construir o simular, programar, probar y mejorar un robot que cumpla una misión útil que tú elijas.",
      estimatedTime: "90 a 120 minutos (se puede repartir en dos sesiones)",
      learningGoals: [
        {
          text: "Convertir una necesidad real en una misión de robot con requisitos y restricciones",
        },
        {
          text: "Planear un robot con una ficha, un boceto rotulado, un diagrama de entrada, procesamiento y salida, y un diagrama de flujo",
        },
        {
          text: "Construir o simular un robot que use al menos un sensor y que se mueva de forma confiable",
        },
        {
          text: "Escribir un programa que use una secuencia, un ciclo, una condición y un alto seguro",
        },
        {
          text: "Probar el robot tres veces, documentar una mejora y explicar de qué manera ayuda",
        },
      ],
      vocabulary: [
        {
          term: "Misión",
          definition: "El trabajo útil que eliges para que lo haga tu robot.",
        },
        {
          term: "Ficha de planeación",
          definition: "Un plan corto por escrito que describe la misión, los requisitos y las restricciones antes de construir.",
        },
        {
          term: "Diagrama de entrada, procesamiento y salida",
          definition: "Un dibujo que muestra qué percibe tu robot, cómo decide y qué hace.",
        },
        {
          term: "Diagrama de flujo",
          definition: "Un esquema paso a paso de tu programa que usa cuadros para las acciones y rombos para las decisiones.",
        },
        {
          term: "Iteración",
          definition: "Mejorar tu diseño probándolo, encontrando un problema y cambiándolo.",
        },
        {
          term: "Alto seguro",
          definition: "Un comportamiento que hace que el robot se detenga con seguridad cuando el trabajo está hecho o algo se le atraviesa.",
        },
        {
          term: "Rúbrica",
          definition: "Una tabla que describe cómo se ve un trabajo inicial, en desarrollo, competente y ejemplar.",
        },
      ],
      prerequisites: [
        {
          reason: "El robot final necesita una base estable que se mueva, del trabajo de chasis de la semana 2.",
        },
        {
          reason: "El programa es una secuencia planeada de instrucciones exactas, que se enseñó en la semana 3.",
        },
        {
          reason: "El robot tiene que usar al menos un sensor, presentado en la semana 4.",
        },
        {
          reason: "El programa tiene que incluir un ciclo y una condición, que se enseñaron en la semana 5.",
        },
        {
          reason: "Las tres corridas de prueba y la mejora documentada usan los hábitos de depuración y confiabilidad de la semana 6.",
        },
        {
          reason: "La ficha de planeación, el diagrama de flujo y el alto seguro vienen de la planeación de misiones autónomas de la semana 7.",
        },
      ],
      concepts: [
        {
          title: "Juntar todo el curso",
          body: [
            "El proyecto final no es una idea nueva: son todas las ideas del curso funcionando a la vez. Tu robot va a percibir (semana 4), decidir con ciclos y condiciones (semana 5), moverse sobre una base sólida (semana 2), seguir una secuencia planeada (semana 3), ser probado y mejorado (semana 6), y ejecutar una misión autónoma segura (semana 7).",
            "Empieza por la misión y trabaja hacia atrás: ¿qué necesita este trabajo que el robot perciba, decida y haga?",
          ],
        },
        {
          title: "Elegir una misión que importe",
          body: [
            "Una buena misión resuelve un problema pequeño y real para una persona real. \"Entregar un recado al otro lado del salón\" es mejor que \"hacer de todo\", porque de verdad puedes construirlo y probarlo.",
            "Elige una misión que puedas terminar en el tiempo que tienes, con los sensores y las piezas que de verdad tienes.",
          ],
          examples: [
            "Entrega",
            "Búsqueda y rescate",
            "Inspección",
            "Clasificación",
            "Ayuda de accesibilidad",
          ],
        },
        {
          title: "Planea antes de construir",
          body: [
            "Quienes hacen ingeniería de manera profesional planean primero en papel. Tu ficha de planeación nombra la misión, los requisitos (lo que tiene que hacer) y las restricciones (límites como el tiempo, el tamaño o los materiales).",
            "Después dibujas un boceto rotulado, un diagrama de entrada, procesamiento y salida, y un diagrama de flujo del programa. Planear primero te ahorra tener que reconstruir después.",
          ],
        },
        {
          title: "Probar, mejorar y explicar",
          body: [
            "Ejecuta tu robot tres veces y anota qué pasa en cada corrida, no solo si \"funcionó\". A los robots de verdad se los juzga por hacer el trabajo de forma confiable, no por lograrlo una vez con suerte.",
            "Encuentra una cosa que mejorar, cámbiala y anota el resultado. Por último, explica en unas cuantas oraciones de qué manera ayuda tu robot y cómo sabes que funciona.",
          ],
        },
      ],
      materials: [
        {
          name: "Ficha de planeación del proyecto final (imprimible)",
        },
        {
          name: "Páginas de diagrama de flujo y de boceto (imprimibles)",
        },
        {
          name: "Registro de prueba de tres corridas (imprimible)",
        },
        {
          name: "Rúbrica del proyecto final (imprimible)",
        },
        {
          name: "Un kit de robótica programable con al menos un sensor",
        },
        {
          name: "Computadora o tableta con el simulador del navegador",
        },
        {
          name: "Cartón, tapas de botella, popotes, cinta adhesiva, cuerda y marcadores",
        },
        {
          name: "Un kit de materiales de todo el curso, de las semanas anteriores",
        },
      ],
      activities: [
        {
          title: "Diseña, construye, programa y prueba tu robot ayudante",
          goal: "Llevar la misión elegida desde el plan hasta un robot probado y mejorado que use un sensor, una secuencia, un ciclo, una condición y un alto seguro.",
          shared: [
            "Completa primero la ficha de planeación: misión, requisitos, restricciones. Luego dibuja el boceto rotulado, el diagrama de entrada, procesamiento y salida, y el diagrama de flujo.",
            "Construye o prepara el robot para que se mueva de forma confiable y use al menos un sensor. Escribe el programa con una secuencia, un ciclo, una condición y un alto seguro.",
            "Haz tres corridas de prueba, anota cada una, haz una mejora y escribe tu explicación final de cómo ayuda el robot.",
          ],
          variants: {
            kit: {
              title: "Construye y programa la misión en un kit de robótica",
              materials: [
                "Kit de robótica con al menos un sensor",
                "Páginas de planeación, diagrama de flujo y registro de pruebas",
              ],
              instructions: [
                "Termina la ficha de planeación y los diagramas antes de tocar el kit.",
                "Construye una base estable para tu misión y móntale el sensor que necesites.",
                "Programa una secuencia que haga el trabajo, un ciclo que no deje de revisar el sensor, una condición que reaccione, y un alto seguro al final.",
                "Haz tres pruebas, anota cada corrida, mejora una cosa y vuelve a probar.",
              ],
              safetyNotes: [
                "Mantente lejos de las partes en movimiento durante las corridas de prueba.",
                "Dale al robot una zona de prueba despejada y sin obstáculos.",
              ],
              expectedResult: "Un robot de kit que completa su misión en al menos dos de las tres corridas y se detiene con seguridad.",
              successCriteria: [
                "Usa al menos un sensor",
                "El programa tiene una secuencia, un ciclo y una condición",
                "Tiene un alto seguro",
                "Se anotaron tres corridas",
                "Se documentó una mejora",
              ],
              troubleshooting: [
                {
                  problem: "El robot funciona una vez pero luego ya no",
                  fix: "Aplica la lista de confiabilidad de la semana 6: la misma posición de salida, baterías nuevas y volver a revisar el umbral del sensor.",
                },
                {
                  problem: "El robot nunca reacciona al sensor",
                  fix: "Muestra la lectura del sensor y confirma que tu umbral está del lado correcto del valor real.",
                },
              ],
              extension: "Agrega un segundo sensor o un contador para que el robot resuelva una versión más difícil de la misión.",
            },
            simulator: {
              title: "Diseña y programa la misión en el simulador",
              materials: [
                "Simulador en el navegador",
                "Páginas de planeación, diagrama de flujo y registro de pruebas",
              ],
              instructions: [
                "Termina primero la ficha de planeación y los diagramas.",
                "Elige o arma un mapa de cuadrícula que le quede a tu misión.",
                "Arma el programa con bloques de movimiento, un ciclo, una condición de sensor y un bloque de alto.",
                "Ejecútalo tres veces desde el mismo punto de partida, anota cada corrida, mejora una cosa y vuelve a ejecutar.",
              ],
              safetyNotes: [
                "No hay riesgos físicos; toma descansos de la pantalla cuando lo necesites.",
              ],
              expectedResult: "Un robot de simulador que completa la misión en la cuadrícula y se detiene al terminar.",
              successCriteria: [
                "Usa al menos un bloque de sensor",
                "El programa tiene una secuencia, un ciclo y una condición",
                "Tiene un alto",
                "Se anotaron tres corridas",
                "Se documentó una mejora",
              ],
              troubleshooting: [
                {
                  problem: "El robot se sale de la cuadrícula",
                  fix: "Agrega un repetir-hasta o una condición de sensor para que se detenga en el borde o en la meta.",
                },
                {
                  problem: "El ciclo nunca termina",
                  fix: "Revisa que la condición del repetir-hasta de verdad se vuelva verdadera durante la corrida.",
                },
              ],
              extension: "Vuelve a armar la misma misión en una cuadrícula más grande o más llena de obstáculos.",
            },
            unplugged: {
              title: "Haz un modelo y \"ejecuta\" la misión con un programa de papel",
              materials: [
                "Modelo de robot de cartón",
                "Cuerda y una cuadrícula en el piso o un camino de cinta",
                "Tarjetas de programa",
              ],
              instructions: [
                "Termina primero la ficha de planeación y los diagramas.",
                "Construye un robot de cartón con una parte que se mueva y un sensor improvisado (como un \"parachoques\" de papel).",
                "Escribe el programa en tarjetas usando una secuencia, una repetición y un si, más una tarjeta de alto.",
                "\"Ejecuta\" el programa moviendo el modelo tarjeta por tarjeta tres veces, anotando cada corrida y mejorando un paso.",
              ],
              safetyNotes: [
                "Usa tijeras seguras para niños con un adulto al construir el modelo.",
              ],
              expectedResult: "Un robot de cartón y un programa de tarjetas que un compañero pueda seguir para completar la misión igual dos veces seguidas.",
              successCriteria: [
                "El modelo tiene una parte que se mueve y un sensor improvisado",
                "El programa de tarjetas tiene una secuencia, una repetición y un si",
                "Tiene una tarjeta de alto",
                "Se anotaron tres corridas",
                "Se documentó una mejora",
              ],
              troubleshooting: [
                {
                  problem: "Dos personas \"ejecutan\" el programa de manera distinta",
                  fix: "Los pasos son ambiguos: reescríbelos para que sean exactos, como las instrucciones de la semana 3.",
                },
                {
                  problem: "No hay dónde meter una condición",
                  fix: "Agrega una tarjeta de si, como \"si el parachoques toca la pared, gira a la derecha\".",
                },
              ],
              extension: "Intercambien programas con otro grupo y ejecuten la misión del otro.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de tu primera corrida de prueba, predice: ¿qué parte de la misión es la que más probablemente falle?",
          howToCheck: "Compara tu predicción con lo que de verdad sale mal en las tres corridas de prueba.",
        },
      ],
      testRecords: [
        {
          title: "Prueba de tres corridas de la misión final",
          instructions: "Ejecuta la misión completa tres veces desde el mismo montaje inicial. Anota qué pasó en cada corrida y si la misión se logró.",
          columns: [
            null,
            "Qué pasó",
            "¿Misión cumplida? (S/N)",
            "Qué cambiar",
          ],
          measure: "Si la misión se logró y qué cambió entre una corrida y otra",
        },
      ],
      knowledgeCheck: {
        instructions: "Comprueba que puedes explicar las decisiones que hay detrás de tu proyecto final.",
        questions: [
          {
            prompt: "¿Por qué en ingeniería se escribe una ficha de planeación y se dibuja un diagrama de flujo antes de construir?",
            options: [
              {
                text: "Para que el proyecto tarde más",
                feedback: "Planear en realidad ahorra tiempo, porque evita tener que reconstruir.",
              },
              {
                text: "Para pensar bien la misión, los requisitos y los pasos antes de gastar materiales",
                feedback: "Correcto: planear primero en papel evita errores caros más adelante.",
              },
              {
                text: "Porque no está permitido construir",
                feedback: "Construir es justamente la meta; la planeación solo va antes.",
              },
              {
                text: "Para decorar el robot",
                feedback: "Una ficha y un diagrama de flujo tienen que ver con el plan, no con la decoración.",
              },
            ],
            explanation: "Una ficha y un diagrama de flujo te dejan resolver la misión, los requisitos, las restricciones y los pasos antes de construir.",
          },
          {
            prompt: "Tu programa tiene que incluir una condición. ¿Qué le permite hacer una condición a tu robot?",
            options: [
              {
                text: "Repetir el mismo movimiento para siempre, pase lo que pase",
                feedback: "Eso describe un ciclo pelón, sin ninguna decisión.",
              },
              {
                text: "Elegir una acción a partir de lo que lee un sensor",
                feedback: "Correcto: una condición (si / si-si no) hace que el robot decida a partir de la entrada del sensor.",
              },
              {
                text: "Moverse más rápido",
                feedback: "La velocidad la fijan los motores, no una condición.",
              },
              {
                text: "Cargar su batería",
                feedback: "Las condiciones tienen que ver con decisiones, no con la energía.",
              },
            ],
            explanation: "Una condición le permite al robot elegir una acción a partir de la lectura de un sensor, que es el corazón de reaccionar al mundo.",
          },
          {
            prompt: "¿Por qué se ejecuta la misión tres veces en lugar de una?",
            options: [
              {
                text: "Para demostrar que funciona de forma confiable, y no solo una vez por suerte",
                feedback: "Sí: la confiabilidad a lo largo de varias corridas es lo que vuelve confiable a un robot.",
              },
              {
                text: "Porque la primera corrida no cuenta",
                feedback: "Cada corrida cuenta como dato; se anotan las tres.",
              },
              {
                text: "Para gastar la batería",
                feedback: "Probar tiene que ver con juntar evidencia, no con acabarse la batería.",
              },
              {
                text: "Para que se vea muy ocupado",
                feedback: "Las pruebas repetidas tienen que ver con resultados confiables, no con apariencias.",
              },
            ],
            explanation: "Tres corridas muestran si el robot hace el trabajo de forma confiable, que es como se juzga a los robots de verdad.",
          },
          {
            prompt: "¿Qué es un comportamiento de \"alto seguro\"?",
            options: [
              {
                text: "Apagar el robot quitándole la batería",
                feedback: "Eso es un apagado manual, no un alto seguro programado.",
              },
              {
                text: "Un comportamiento programado que detiene al robot cuando el trabajo está hecho o algo se le atraviesa",
                feedback: "Correcto: un alto seguro es parte del programa y protege a las personas y al robot.",
              },
              {
                text: "Avanzar hasta que el robot se estrelle",
                feedback: "Estrellarse es justo lo contrario de detenerse con seguridad.",
              },
              {
                text: "Hacer que el robot vaya más rápido al final",
                feedback: "Acelerar no es detenerse con seguridad.",
              },
            ],
            explanation: "Un alto seguro es un comportamiento programado que detiene al robot cuando termina o cuando percibe un obstáculo.",
          },
        ],
      },
      reflection: [
        {
          prompt: "¿De qué manera ayuda tu robot a alguien? Explica la misión en dos o tres oraciones.",
        },
        {
          prompt: "¿Cuál fue la única mejora que hiciste después de probar, y cómo cambió el resultado?",
        },
        {
          prompt: "Si tuvieras otra semana, ¿qué le agregarías o cambiarías después?",
        },
      ],
      journalPrompts: [
        {
          prompt: "Escribe tu ficha de planeación: misión, requisitos y restricciones.",
        },
        {
          prompt: "Dibuja tu boceto rotulado y tu diagrama de entrada, procesamiento y salida.",
        },
        {
          prompt: "Anota tus tres corridas de prueba y la mejora que hiciste.",
        },
        {
          prompt: "Escribe tu explicación final de cómo ayuda el robot.",
        },
      ],
      savedPrograms: [
        {
          title: "Programa de la misión final",
          description: "El programa que ejecuta la misión que elegiste: una secuencia, un ciclo, una condición de sensor y un alto seguro.",
        },
      ],
      simulatorMissions: [
        {
          title: "Misión final (simulador)",
          objective: "Completar la misión que elegiste sobre la cuadrícula usando un sensor, un ciclo, una condición y un alto seguro.",
          successCriteria: [
            "El robot llega a la meta de la misión",
            "El robot usa una condición de sensor",
            "El robot se detiene con seguridad al terminar",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Elige tu misión",
          focus: "Escoger entre entrega, búsqueda y rescate, inspección, clasificación o ayuda de accesibilidad.",
        },
        {
          title: "Planea en papel",
          focus: "Ficha de planeación, boceto rotulado, diagrama de entrada, procesamiento y salida, y diagrama de flujo.",
        },
        {
          title: "Construye o prepara el robot",
          focus: "Una base estable que se mueva, con al menos un sensor.",
        },
        {
          title: "Programa la misión",
          focus: "Secuencia, ciclo, condición y alto seguro.",
        },
        {
          title: "Tres corridas de prueba y una mejora",
          focus: "Anotar cada corrida, cambiar una cosa y volver a probar.",
        },
        {
          title: "Explica de qué manera ayuda",
          focus: "Explicación final y reflexión.",
        },
        {
          title: "Comparte y califica",
          focus: "Presentar el robot y calificarlo con la rúbrica.",
        },
      ],
      safetyNotes: [
        {
          text: "Reserva una zona despejada y sin obstáculos para las corridas de prueba y mantente lejos de las partes en movimiento.",
        },
        {
          text: "Usa tijeras seguras para niños con un adulto al construir el modelo de cartón.",
        },
        {
          text: "Guarda tu programa y tu bitácora con frecuencia para que al recargar el navegador no se pierda tu trabajo.",
        },
      ],
      printableResources: [
        {
          title: "Ficha de planeación del proyecto final",
          description: "Misión, requisitos, restricciones, boceto y diagrama de entrada, procesamiento y salida.",
        },
        {
          title: "Página de diagrama de flujo del proyecto final",
          description: "Una página para dibujar el diagrama de flujo del programa con cuadros de acción y rombos de decisión.",
        },
        {
          title: "Registro de prueba de tres corridas",
          description: "Una tabla para anotar las tres corridas de prueba finales y la mejora que se hizo.",
        },
        {
          title: "Rúbrica del proyecto final",
          description: "La rúbrica de calificación que cubre planeación, diseño mecánico, programación, pruebas y comunicación.",
        },
        {
          title: "Guía docente de la semana 8",
          description: "Cómo llevar el proyecto final en una o dos sesiones, incluidas indicaciones para calificar.",
        },
      ],
      completion: {
        summary: "Termina el curso completando el proyecto final: planear, construir o simular, programar, hacer tres pruebas, documentar una mejora y explicar de qué manera ayuda el robot.",
        requirements: [
          {
            label: "Completar la ficha de planeación, el boceto, el diagrama de entrada, procesamiento y salida, y el diagrama de flujo",
          },
          {
            label: "Construir o preparar un robot que se mueva y use al menos un sensor",
          },
          {
            label: "Escribir un programa con una secuencia, un ciclo, una condición y un alto seguro",
          },
          {
            label: "Hacer tres corridas de prueba y documentar una mejora",
          },
          {
            label: "Escribir la explicación final de cómo ayuda el robot",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprime la ficha de planeación, la página del diagrama de flujo, el registro de pruebas y la rúbrica para cada estudiante o equipo.",
          "Aparta una zona despejada de piso o de mesa para construir y probar.",
          "Decide si el proyecto final se hace en una sola sesión larga o si se reparte la planeación y la construcción en dos.",
        ],
        prep: [
          "Repasa las cinco misiones posibles y, si se puede, prepara un ejemplo resuelto de cada una.",
          "Ten listos y cargados los materiales de las semanas anteriores y los kits o sensores.",
          "Lee la rúbrica para que la calificación sea pareja.",
        ],
        facilitation: [
          "Insiste en que el plan esté terminado antes de que empiece cualquier construcción: es lo que más predice el éxito.",
          "Ve pasando entre los equipos durante la construcción y la programación; haz preguntas en lugar de arreglarles los robots.",
          "Reserva tiempo para las tres corridas de prueba y para la mejora; no dejes que la construcción se coma toda la sesión.",
          "Cierra con presentaciones cortas calificadas con la rúbrica.",
        ],
        commonMisconceptions: [
          "\"Funcionó una vez, así que ya está\": la vara es la confiabilidad a lo largo de tres corridas.",
          "\"El plan es una pérdida de tiempo\": las construcciones sin plan suelen atorarse o acabar rehechas.",
          "Saltarse el alto seguro porque la misión \"de todos modos se acaba\".",
        ],
        questionsToAsk: [
          "¿Qué percibe, qué decide y qué hace tu robot?",
          "¿Dónde está el ciclo y dónde está la condición en tu programa?",
          "¿Qué pasó a lo largo de tus tres corridas, y qué cambiaste?",
        ],
        easierVersion: "Ofrece una misión y una cuadrícula o recorrido ya preparados, para que los estudiantes se concentren en programar y probar en lugar de diseñar desde cero.",
        harderVersion: "Exige dos sensores, una variable contador, o una misión con más de una meta.",
      },
      nextWeek: {
        teaser: "Terminaste el curso: ahora ya puedes diseñar, construir, programar, probar y mejorar un robot que ayuda.",
        prepare: [
          "Muéstrale tu robot a tu familia o a tus compañeros y explícales cómo funciona.",
          "Guarda tu ficha de planeación y tu diagrama de flujo; son el arranque de tu próximo proyecto de robótica.",
          "Prueba una misión nueva de la lista, de las que no elegiste.",
        ],
      },
      finalProject: {
        title: "Diseña un robot que ayude",
        overview: "Elige una misión y luego planea, construye o simula, programa, prueba y mejora un robot que la cumpla. Tu robot tiene que usar al menos un sensor y un programa con una secuencia, un ciclo y una condición, y tiene que detenerse con seguridad. Vas a hacer tres corridas de prueba, una mejora documentada, y explicar de qué manera ayuda tu robot.",
        missionChoices: [
          {
            name: "Entrega",
            scenario: "Algo tiene que llegar de un lugar a otro cruzando un cuarto o un recorrido.",
            exampleGoal: "Llevar un objeto pequeño a una zona de entrega marcada y detenerse ahí.",
            sensorIdeas: [
              "Sensor de distancia para detenerse en la zona",
              "Sensor de contacto para detectar la llegada",
            ],
          },
          {
            name: "Búsqueda y rescate",
            scenario: "Una \"persona\" o un objeto está perdido en algún punto de una zona marcada y hay que encontrarlo.",
            exampleGoal: "Recorrer una cuadrícula buscando hasta que el robot detecte el objetivo, y entonces detenerse y avisar.",
            sensorIdeas: [
              "Sensor de color para detectar el objetivo",
              "Sensor de distancia para esquivar los muros mientras busca",
            ],
          },
          {
            name: "Inspección",
            scenario: "Hay que revisar un camino, una tubería o una hilera en busca de un problema.",
            exampleGoal: "Seguir una línea marcada y detenerse cuando detecte un hueco o una falla marcada.",
            sensorIdeas: [
              "Sensor de luz o de color para seguir la línea",
              "Sensor de distancia para detectar una obstrucción",
            ],
          },
          {
            name: "Clasificación",
            scenario: "Hay que separar objetos en grupos.",
            exampleGoal: "Detectar el color de un objeto y girar hacia el contenedor que le corresponde.",
            sensorIdeas: [
              "Sensor de color para leer el objeto",
              "Sensor de contacto para confirmar que lo levantó",
            ],
          },
          {
            name: "Ayuda de accesibilidad",
            scenario: "Alguien necesita ayuda para hacer una tarea de todos los días.",
            exampleGoal: "Detectar un obstáculo en un pasillo y avisar o despejar un camino seguro.",
            sensorIdeas: [
              "Sensor de distancia para detectar obstáculos",
              "Zumbador o luz como salida de aviso",
            ],
          },
          {
            name: "Tu propia misión",
            scenario: "Tienes una idea de robot que ayuda a alguien y no está en esta lista. Propónla: mientras se mueva, perciba, decida y se detenga con seguridad, cuenta.",
            exampleGoal: "Describe tu propio trabajo útil para el robot y luego cumple los mismos componentes obligatorios que las demás misiones.",
            sensorIdeas: [
              "Elige el sensor que le quede a tu trabajo (de distancia, de contacto, de luz o de color)",
              "Confirma con tu docente que tu idea cumple los requisitos",
            ],
          },
        ],
        requirements: [
          {
            label: "Ficha de planeación",
            description: "La misión, los requisitos y las restricciones, escritos antes de construir.",
          },
          {
            label: "Boceto rotulado",
            description: "Un dibujo del robot con sus partes rotuladas.",
          },
          {
            label: "Diagrama de entrada, procesamiento y salida",
            description: "Un diagrama de lo que el robot percibe, decide y hace.",
          },
          {
            label: "Diagrama de flujo",
            description: "Un diagrama de flujo paso a paso del programa.",
          },
          {
            label: "Diseño mecánico que se mueva",
            description: "Una base estable que se mueva de forma confiable.",
          },
          {
            label: "Al menos un sensor",
            description: "El robot usa un sensor como entrada.",
          },
          {
            label: "Una secuencia",
            description: "El programa ejecuta los pasos en un orden planeado.",
          },
          {
            label: "Un ciclo",
            description: "El programa repite una acción o una revisión.",
          },
          {
            label: "Una condición",
            description: "El programa toma una decisión a partir de la lectura de un sensor.",
          },
          {
            label: "Comportamiento de alto seguro",
            description: "El robot se detiene con seguridad al terminar o cuando algo le bloquea el paso.",
          },
          {
            label: "Tres corridas de prueba",
            description: "La misión se ejecuta y se registra tres veces.",
          },
          {
            label: "Una mejora documentada",
            description: "Se hace un cambio después de probar y se registra su efecto.",
          },
          {
            label: "Explicación final",
            description: "Una explicación corta de cómo ayuda el robot y cómo sabes que funciona.",
          },
          {
            label: "Un segundo sensor o un contador (opcional avanzado)",
            description: "Un sensor extra o una variable contador para una misión más difícil.",
          },
        ],
        rubric: [
          {
            name: "Problema y planeación",
            description: "Un problema y una persona usuaria bien definidos, más la ficha, el boceto, el diagrama de entrada, procesamiento y salida, y el diagrama de flujo.",
            levels: [
              {
                descriptor: "Casi no hay plan; se empezó a construir sin un problema, una ficha ni diagramas claros.",
              },
              {
                descriptor: "El problema está enunciado, pero algunos documentos de planeación están incompletos o vagos.",
              },
              {
                descriptor: "Un problema y una persona usuaria claros, con una ficha, un boceto, un diagrama de entrada, procesamiento y salida, y un diagrama de flujo completos y acordes con lo construido.",
              },
              {
                descriptor: "La planeación está completa y clara, y muestra requisitos, restricciones y concesiones bien pensados.",
              },
            ],
          },
          {
            name: "Diseño mecánico o del entorno",
            description: "Qué tan bien está construido el robot (o configurada la misión del simulador) para moverse y hacer el trabajo.",
            levels: [
              {
                descriptor: "El robot no se mueve de forma confiable o se desarma; o el montaje de la misión no le queda al objetivo.",
              },
              {
                descriptor: "El robot se mueve, pero se bambolea o es inconsistente; o el mapa de la misión está armado solo a grandes rasgos.",
              },
              {
                descriptor: "Una base estable que se mueve de forma confiable y carga su sensor; o un mapa de misión que le queda bien al objetivo.",
              },
              {
                descriptor: "Un diseño resistente y bien equilibrado (o una misión configurada con cuidado) que le queda perfecto al trabajo.",
              },
            ],
          },
          {
            name: "Programación",
            description: "El uso de una secuencia, un ciclo, una condición y un alto seguro.",
            levels: [
              {
                descriptor: "Al programa le faltan casi todas las partes obligatorias, o no se ejecuta.",
              },
              {
                descriptor: "El programa se ejecuta, pero le falta un ciclo, una condición o un alto seguro.",
              },
              {
                descriptor: "El programa usa correctamente una secuencia, un ciclo, una condición y un alto seguro.",
              },
              {
                descriptor: "El programa es eficiente y está bien estructurado, y resuelve la misión con limpieza.",
              },
            ],
          },
          {
            name: "Uso del sensor",
            description: "Si el robot percibe el mundo y usa esa lectura para decidir qué hacer.",
            levels: [
              {
                descriptor: "No se usa ningún sensor, o la lectura nunca se usa para tomar una decisión.",
              },
              {
                descriptor: "Se lee un sensor, pero la lectura casi no influye en lo que hace el robot.",
              },
              {
                descriptor: "Se lee al menos un sensor y un umbral o una condición lo usa para guiar la misión.",
              },
              {
                descriptor: "El uso del sensor está calibrado y es confiable, y guía las decisiones del robot con precisión.",
              },
            ],
          },
          {
            name: "Pruebas y mejora",
            description: "Tres corridas registradas y una mejora documentada.",
            levels: [
              {
                descriptor: "Se probó poco; los resultados no se registraron.",
              },
              {
                descriptor: "Se registraron algunas corridas, pero no se hizo ninguna mejora clara.",
              },
              {
                descriptor: "Se registraron tres corridas y se documentó una mejora junto con su efecto.",
              },
              {
                descriptor: "Pruebas a fondo, con evidencia clara de que la mejora aumentó la confiabilidad.",
              },
            ],
          },
          {
            name: "Explicación y uso responsable",
            description: "Explicar de qué manera ayuda el robot, cómo sabes que funciona, y cómo se usa de forma segura y responsable.",
            levels: [
              {
                descriptor: "No logra explicar con claridad qué hace el robot.",
              },
              {
                descriptor: "Explica el robot, pero no de qué manera ayuda, cómo se probó, ni cómo se mantiene seguro.",
              },
              {
                descriptor: "Explica con claridad la misión, cómo funciona el robot, la evidencia de las pruebas y su alto seguro.",
              },
              {
                descriptor: "Explica el diseño, las decisiones, la evidencia y el uso responsable de forma convincente ante un público.",
              },
            ],
          },
        ],
        variants: {
          kit: {
            title: "Proyecto final en un kit de robótica",
            materials: [
              "Kit de robótica con al menos un sensor",
              "Todas las páginas imprimibles del proyecto",
            ],
            instructions: [
              "Planea, construye y programa sobre el kit.",
              "Usa un sensor real para la condición.",
              "Haz tres corridas de prueba físicas y mejora una cosa.",
            ],
            safetyNotes: [
              "Zona de prueba despejada; mantente lejos de las partes en movimiento.",
            ],
            expectedResult: "Un robot físico que cumple su misión de forma confiable y se detiene con seguridad.",
            successCriteria: [
              "Cumple todos los puntos obligatorios de la rúbrica al nivel competente o superior",
            ],
            troubleshooting: [
              {
                problem: "Las corridas salen inconsistentes",
                fix: "Estandariza la posición de salida y vuelve a revisar el umbral del sensor, como en la semana 6.",
              },
            ],
            extension: "Agrega el segundo sensor o el contador opcionales.",
          },
          simulator: {
            title: "Proyecto final en el simulador del navegador",
            materials: [
              "Simulador en el navegador",
              "Todas las páginas imprimibles del proyecto",
            ],
            instructions: [
              "Planea en papel y luego arma la misión de cuadrícula y el programa en el simulador.",
              "Usa un bloque de sensor para la condición.",
              "Ejecuta tres veces desde el mismo punto de partida y mejora una cosa.",
            ],
            safetyNotes: [
              "Guarda con frecuencia para que una recarga no borre tu trabajo.",
            ],
            expectedResult: "Un robot de simulador que completa la misión de cuadrícula y se detiene al terminar.",
            successCriteria: [
              "Cumple todos los puntos obligatorios de la rúbrica al nivel competente o superior",
            ],
            troubleshooting: [
              {
                problem: "El robot se comporta distinto en cada corrida",
                fix: "Fija la casilla de salida y haz que el ciclo termine con una condición de sensor bien definida.",
              },
            ],
            extension: "Ejecuta la misión en una cuadrícula más grande o más llena de obstáculos.",
          },
          unplugged: {
            title: "Proyecto final como robot de cartón con un programa de tarjetas",
            materials: [
              "Modelo de robot de cartón",
              "Tarjetas de programa",
              "Cuadrícula en el piso o recorrido de cinta",
            ],
            instructions: [
              "Planea en papel y construye un modelo con una parte que se mueva y un sensor improvisado.",
              "Escribe el programa en tarjetas con una secuencia, una repetición y un si.",
              "Pide a un compañero que lo \"ejecute\" tres veces y mejora un paso.",
            ],
            safetyNotes: [
              "Ayuda de un adulto para cortar.",
            ],
            expectedResult: "Un modelo y un programa de tarjetas que un compañero pueda ejecutar igual dos veces seguidas para completar la misión.",
            successCriteria: [
              "Cumple todos los puntos obligatorios de la rúbrica al nivel competente o superior",
            ],
            troubleshooting: [
              {
                problem: "Cada compañero lo ejecuta distinto",
                fix: "Haz que cada tarjeta sea una instrucción exacta y sin ambigüedad.",
              },
            ],
            extension: "Intercambien misiones con otro equipo y ejecuten la del otro.",
          },
        },
      },
    },
  ],
}

const zh: DeepPartial<RoboticsCurriculum> = {
  title: "机器人与自动化",
  subtitle: "先弄懂机器人如何感知、思考和行动，再动手设计、搭建、编程、测试并改进一台能帮上忙的机器人。",
  description: "面向四到六年级的八周机器人课程。学生会弄清楚什么样的东西才算机器人，搭出一个能跑起来的底盘，编写精确的指令，加装传感器，用循环和条件让机器人对外界作出反应，通过调试提高可靠性，规划一次自主任务，最后设计一台能解决真实问题的机器人。每一周都可以用实体套件、浏览器模拟器，或者不插电的家用材料来完成。",
  gradeRange: "四至六年级",
  duration: "8 周",
  estimatedTimePerModule: "60 至 90 分钟",
  requirement: "一套机器人套件、一个浏览器，或者一些家里的材料：三条路线任选其一都行",
  summary: "《机器人与自动化》一次讲透一个概念，带大家弄明白真实的机器人是怎么工作的。学生先把机器人和普通机器区分开，然后搭出一个带轮子的底盘，给它下达精确的指令，加装传感器，再用循环和条件让它对周围的世界作出反应。后几周的重点是通过调试提高可靠性，以及规划一次安全的自主任务；课程以结业项目收尾，每位学生都要设计、搭建或模拟、编程、测试并改进一台能干一件实事的机器人。整门课程有三种上法（可编程套件、浏览器内的模拟器，或者用纸板和纸上编程的不插电方式），所以无论是教室、图书馆还是家里，都能参与进来。",
  format: [
    "每周一个机器人核心概念、一项主线任务，由浅入深层层递进。",
    "每一周都有三种做法：实体套件、浏览器模拟器，或者不插电的家用材料。",
    "每一周都按同样的流程展开：学习、探索、搭建、编程、测试、反思。",
    "学生要先预测，再动手测试并记录真实结果，出问题时还要动手排查。",
    "课程以结业项目和评分量表收尾，学生要设计一台能帮上忙的机器人。",
  ],
  learningGoals: [
    "说清楚什么样的东西才算机器人，以及它如何感知、决策和行动",
    "搭出一个能跑起来的稳固机器人底盘",
    "编写精确的指令序列",
    "使用传感器、阈值和校准",
    "用循环和条件让机器人作出反应",
    "排查机械、程序和传感器方面的问题，提高可靠性",
    "用流程图规划一次安全的自主任务",
    "设计、搭建、编程、测试并改进一台能帮上忙的机器人",
  ],
  equipmentPaths: [
    {
      label: "机器人套件",
      description: "一套带电机和传感器的可编程机器人套件（什么牌子都行）。如果班里或家里已经有一套，这是最好的选择。",
      needs: "一套可编程机器人套件，至少配一个电机和一个传感器，还要有配套的应用或软件。",
    },
    {
      label: "浏览器模拟器",
      description: "在浏览器里用积木块拖拽操控、在网格上行驶的机器人。不需要任何硬件，任何电脑或平板都能用。",
      needs: "一台装有较新网页浏览器的电脑或平板。",
    },
    {
      label: "不插电 / 家用材料",
      description: "用纸板和线做的机器人，再配上纸上编程。如果没有套件、也没有靠得住的电子设备，这是最好的选择。",
      needs: "纸板、胶带、线绳、马克笔，以及日常的可回收材料。",
    },
  ],
  modules: [
    {
      title: "什么样的东西才算机器人？",
      subtitle: "把机器人和普通机器区分开，并理清一台机器人是如何感知、思考和行动的。",
      summary: "学生要弄明白，到底是什么让一样东西成为机器人，而不只是一台机器。他们会知道，机器人先感知世界，再决定要做什么，然后行动，这就是「输入、处理、输出」的循环；而正是程序让它能自己一遍遍地把活儿干下去。他们还要考察身边真实的设备，把其中一件当作机器人系统画出来，并设计一台自己的实用机器人。",
      mainMission: "先判断什么才算机器人，再画出并设计一台能干一件实事的机器人。",
      estimatedTime: "60 至 75 分钟",
      learningGoals: [
        {
          text: "说清楚什么样的东西算机器人，而不只是一台简单的机器",
        },
        {
          text: "描述某个真实设备中「输入、处理、输出」的循环",
        },
        {
          text: "说明控制器作为机器人「大脑」的作用",
        },
        {
          text: "找出一台机器人身上的传感器和执行器",
        },
        {
          text: "分清自主系统和遥控系统",
        },
        {
          text: "为一项有用的任务设计一套机器人系统",
        },
        {
          text: "画出一台实用机器人，并标注它的输入、处理和输出",
        },
      ],
      vocabulary: [
        {
          term: "机器人",
          definition: "一种能感知周围环境、决定要做什么，并按照程序自己行动的机器。",
        },
        {
          term: "机器",
          definition: "能干活的工具，比如自行车或订书机。一台机器只有能自己感知、自己决定，才算得上机器人。",
        },
        {
          term: "输入",
          definition: "机器人从外界获取的信息，通常是通过传感器得到的。",
        },
        {
          term: "处理",
          definition: "「思考」的那一步：控制器根据输入决定接下来要做什么。",
        },
        {
          term: "输出",
          definition: "机器人做出的动作，比如转动一个轮子或点亮一盏灯。",
        },
        {
          term: "控制器",
          definition: "机器人的「大脑」：那台运行程序、做出决定的小型计算机。",
        },
        {
          term: "传感器",
          definition: "用来测量外界某种情况的部件，比如距离、光线或触碰。",
        },
        {
          term: "执行器",
          definition: "让某样东西动起来或让某件事发生的部件，比如电机、轮子或蜂鸣器。",
        },
        {
          term: "程序",
          definition: "控制器要遵循的一组指令，让它每次都用同样的方式把一件活儿干好。",
        },
        {
          term: "自主",
          definition: "靠传感器和程序自己行动，不需要人来操控。",
        },
        {
          term: "遥控",
          definition: "由人实时操控，比如用摇杆或手机应用来控制。",
        },
      ],
      concepts: [
        {
          title: "机器人到底是什么",
          body: [
            "人们把各种各样的东西都叫机器人，但真正的机器人有三项本事：能感知世界、能决定要做什么、能行动，而且能按照程序自己完成这一切。",
            "你推着走的玩具车不是机器人。而一辆能发现前方有墙、自己停下来的车就接近机器人了，因为它会感知，也会决定。",
          ],
          examples: [
            "扫地机器人",
            "会扫描商品的自助结账机",
            "能感应到有人走近的自动门",
          ],
        },
        {
          title: "机器与机器人的区别",
          body: [
            "每台机器人都是机器，但不是每台机器都是机器人。订书机和自行车都是机器：它们能干活，但每个决定都是人做的。",
            "分界线在于会不会感知和决定。如果一件设备能接收信息，并因此改变自己的做法，它就是在像机器人那样工作。",
          ],
          examples: [
            "自行车 = 机器",
            "扫地机器人 = 机器人",
            "没有传感器的烤面包机 = 机器",
            "能感知面包烤好了的烤面包机 = 接近机器人",
          ],
        },
        {
          title: "输入、处理和输出",
          body: [
            "机器人是循环工作的：先输入，再处理，然后输出。传感器先给出一个输入（比如「墙很近了」）。控制器接着做处理（它判断「我该停下来」）。最后执行器产生输出（轮子停转）。",
            "这个循环每秒重复许多次，一刻不停，机器人正是靠它不断对变化的世界作出反应。",
          ],
        },
        {
          title: "三大主要部件：控制器、传感器、执行器",
          body: [
            "一台机器人有一个控制器（它的大脑）、一个或多个传感器（用来感知）以及一个或多个执行器（用来行动）。",
            "控制器负责运行程序。传感器把输入送给它。执行器把它的输出变成动作。拿掉传感器，它就感知不了；拿掉控制器，它就决定不了。",
          ],
          examples: [
            "控制器：那块小小的电路板",
            "传感器：距离、光线、触碰、颜色",
            "执行器：电机、轮子、机械爪、蜂鸣器、灯",
          ],
        },
        {
          title: "有了程序才能反复照做",
          body: [
            "程序就是控制器要遵循的那份指令清单。正因为机器人照着程序做，它才能一遍遍地完成同一件活儿，不用人一步步在旁边指挥。",
            "换一个程序，哪怕机身和传感器都不变，机器人的表现也会不一样。所以说，机器人这门学问既关乎怎么搭，也同样关乎怎么写指令。",
          ],
        },
        {
          title: "自主与遥控",
          body: [
            "自主系统运行自己的程序，靠传感器作决定，没有人在操控。遥控系统则是人说一句、它做一下，完全照着人的指令走。",
            "用遥控器飞的无人机属于遥控。自己把房间打扫干净的扫地机器人属于自主。很多真实的机器人在不同场合两种方式都能用。",
          ],
          examples: [
            "自主：扫地机器人，按预定路线行驶的火星车",
            "遥控：遥控汽车，用摇杆操控的无人机",
          ],
        },
        {
          title: "身边的机器人和机器",
          body: [
            "拿「感知、决定、行动」这套标准去检验你每天见到的东西。有些是真正的机器人，有些只是机器，还有些介于两者之间。",
            "自动感应的推拉门察觉到你就打开，它做了决定。火星车、编好程序的机械臂、语音控制的音箱都会感知、决定和行动，所以都是机器人。遥控汽车只做人让它做的事。普通烤面包机和上发条的玩具则完全不会感知，也不会决定。洗衣机介于两者之间：它能感知水位、也按程序运行，但只是重复固定的流程而已。",
          ],
          examples: [
            "机器人：自动推拉门、火星车、机械臂、语音控制音箱",
            "只是机器：遥控汽车、普通烤面包机、上发条的玩具",
            "介于两者之间：洗衣机",
          ],
        },
      ],
      materials: [
        {
          name: "三四件日常设备，用来考察（玩具、手机、手电筒、扫地机器人等）",
        },
        {
          name: "「机器人系统图」活动纸（可打印）",
        },
        {
          name: "画草图用的铅笔和纸",
        },
        {
          name: "一套可编程机器人套件（如果有的话）",
        },
        {
          name: "带浏览器的电脑或平板",
        },
        {
          name: "回收纸箱、马克笔和手工材料，用来做机器人模型",
        },
      ],
      activities: [
        {
          title: "「是不是机器人」考察",
          goal: "把真实设备分成机器人、机器或介于两者之间，并用「感知、决定、行动」这套标准为每一个判断辩护。",
          shared: [
            "看着每件设备问三个问题：它能感知什么吗？它能自己作决定吗？它能行动吗？真正的机器人这三件事都能自己做到。",
            "把每件设备放到一条从「只是机器」到「完整机器人」的线上，并写一条理由说明你为什么放在那里。",
          ],
          variants: {
            kit: {
              title: "考察你的套件机器人和另外三件设备",
              materials: [
                "一套可编程机器人套件",
                "三件日常设备",
              ],
              instructions: [
                "打开套件机器人，让它跑一段自带的简单行为。看看它感知到什么、又做了什么。",
                "把它和手电筒、上发条的玩具、手机作比较。每一件都判断能不能感知、决定、行动：是或否。",
                "把四件设备都放到从机器到机器人的那条线上，并为每一个说出理由。",
              ],
              safetyNotes: [
                "机器人运转时，手指不要靠近转动的轮子和齿轮。",
              ],
              expectedResult: "套件机器人会落在靠近「机器人」的一端，因为它会感知、决定和行动；手电筒和上发条的玩具则落在靠近「机器」的一端。",
              successCriteria: [
                "每件设备都给出了能否感知、决定、行动的答案",
                "每一个位置都写了理由",
              ],
              troubleshooting: [
                {
                  problem: "机器人只会直着往前开，从来不作反应",
                  fix: "载入一个会用到传感器的行为（比如遇墙停车），让学生看到它作决定的样子。",
                },
              ],
              extension: "在家里找一件难以归类的设备，并解释它为什么处在中间地带。",
            },
            simulator: {
              title: "把模拟器里的机器人和真实设备作比较",
              materials: [
                "浏览器模拟器",
                "三件日常设备",
              ],
              instructions: [
                "打开模拟器，运行一个会对墙作出反应的机器人。留意它的输入（检测到墙）和输出（停车）。",
                "用「感知、决定、行动」把它和手电筒、上发条的玩具、手机作比较。",
                "把四件都放到从机器到机器人的那条线上，并说明理由。",
              ],
              safetyNotes: [
                "没有安全隐患；需要的话让眼睛离开屏幕歇一会儿。",
              ],
              expectedResult: "学生看到模拟器里的机器人对输入作出反应，并把它排在靠近机器人的一端。",
              successCriteria: [
                "每件设备都给出了能否感知、决定、行动的答案",
                "每一个位置都写了理由",
              ],
              troubleshooting: [
                {
                  problem: "看不出模拟器里的机器人在感知什么",
                  fix: "指出模拟器中传感器的读数，并把它和机器人的动作对应起来。",
                },
              ],
              extension: "先预测把传感器关掉后模拟器机器人会怎么走，然后动手试一试。",
            },
            unplugged: {
              title: "用机器人标准给家里的设备分类",
              materials: [
                "四件日常设备（或图片卡）",
                "「机器人系统图」活动纸",
              ],
              instructions: [
                "找来四件设备，比如手电筒、上发条的玩具、自动皂液器和手机。",
                "为每一件判断能否感知、决定、行动（是或否），拿不准就和同伴演一演。",
                "把它们放到从机器到机器人的那条线上，并为每一件写下理由。",
              ],
              safetyNotes: [
                "只用安全的日常物品；不要拆开电子产品。",
              ],
              expectedResult: "皂液器和手机会更靠近机器人那一端；手电筒和上发条的玩具会更靠近机器那一端。",
              successCriteria: [
                "每件设备都给出了能否感知、决定、行动的答案",
                "每一个位置都写了理由",
              ],
              troubleshooting: [
                {
                  problem: "看起来样样都「只是机器」",
                  fix: "问一问：哪件设备不用人插手就会改变自己的做法？那就是它会感知、会决定的线索。",
                },
              ],
              extension: "再加一件难以归类的神秘设备，全班一起讨论它该放在哪里。",
            },
          },
        },
        {
          title: "机器人系统图",
          goal: "把一件真实设备当作机器人系统画出来：标注它的输入、处理、输出、控制器、传感器和执行器。",
          shared: [
            "挑一件会感知、会决定的设备。在系统图纸上，用箭头画出输入、处理、输出的循环。",
            "然后标出三大部件：哪一块是控制器，哪些是传感器，哪些是执行器。",
          ],
          variants: {
            kit: {
              title: "给你的套件机器人画系统图",
              materials: [
                "套件机器人",
                "「机器人系统图」活动纸",
              ],
              instructions: [
                "在套件机器人上找到控制器（主板）、传感器和执行器（电机）。",
                "挑一个行为，比如「到墙前停下」，把输入、处理、输出的循环填完整。",
                "在你的图上标注每一个真实部件。",
              ],
              safetyNotes: [
                "轻拿轻放机器人；不要拉扯线缆。",
              ],
              expectedResult: "一张画完的系统图，显示输入（传感器读数）-> 处理（控制器决定）-> 输出（电机动作），并标注了真实部件。",
              successCriteria: [
                "输入、处理和输出都填好了",
                "控制器、传感器和执行器都标注了",
              ],
              troubleshooting: [
                {
                  problem: "分不清传感器和执行器",
                  fix: "传感器负责测量，执行器负责动作。问一问：哪个部件让东西动起来？",
                },
              ],
            },
            simulator: {
              title: "给模拟器里的机器人画系统图",
              materials: [
                "浏览器模拟器",
                "「机器人系统图」活动纸",
              ],
              instructions: [
                "在模拟器里找出传感器读数（输入）和移动积木块（输出）。",
                "描述处理这一步：是什么规则把输入变成了输出？",
                "在系统图上把循环填完整，并标注控制器、传感器和执行器。",
              ],
              safetyNotes: [
                "没有安全隐患。",
              ],
              expectedResult: "一张画完的模拟器机器人系统图，输入、处理、输出的循环清清楚楚。",
              successCriteria: [
                "输入、处理和输出都填好了",
                "控制器、传感器和执行器都标注了",
              ],
              troubleshooting: [
                {
                  problem: "处理那一栏是空的",
                  fix: "把规则写成「如果传感器说 X，就做 Y」。",
                },
              ],
            },
            unplugged: {
              title: "给家里的一件自动设备画系统图",
              materials: [
                "一件设备，比如自动门、皂液器或扫地机器人（图片也行）",
                "「机器人系统图」活动纸",
              ],
              instructions: [
                "挑一件你亲眼见过它工作的自动设备。",
                "弄清楚它感知什么（输入）、它看起来是怎么决定的（处理）、它又做了什么（输出）。",
                "把循环填完整，并标出控制器、传感器和执行器分别会在哪里。",
              ],
              safetyNotes: [
                "不要拆真的家用电器；靠观察来研究。",
              ],
              expectedResult: "一张画完的真实自动设备系统图，循环和三大部件都标注清楚。",
              successCriteria: [
                "输入、处理和输出都填好了",
                "控制器、传感器和执行器都标注了",
              ],
              troubleshooting: [
                {
                  problem: "搞不清控制器是哪个",
                  fix: "它就是那个藏起来的「大脑」：收到传感器的消息，再吩咐执行器动起来。",
                },
              ],
            },
          },
        },
        {
          title: "「实用机器人」设计挑战",
          goal: "想出一台能干一件实事的机器人，把它画出来，并标注输入、处理和输出。",
          shared: [
            "想一想家里或学校里有什么真实的小问题，是机器人可以帮上忙的。",
            "把你的机器人画出来，至少标注一个传感器（输入）、它作出的判断（处理），以及至少一个执行器（输出）。",
          ],
          variants: {
            kit: {
              title: "从你的套件里找灵感，设计一个帮手",
              materials: [
                "作参考用的套件机器人",
                "铅笔和纸",
              ],
              instructions: [
                "看看你的套件里传感器和电机都能做什么，从中找灵感。",
                "画一台实用机器人，并标注它的输入、处理和输出。",
                "用一句话写清楚它干什么活儿、帮的是谁。",
              ],
              safetyNotes: [
                "本周不需要动手搭建；这只是一份设计草图。",
              ],
              expectedResult: "一张标注清楚的草图，画的是一台说得通的帮手机器人，任务明确。",
              successCriteria: [
                "至少标注了一个传感器和一个执行器",
                "处理环节的判断写下来了",
                "写明了它干什么活儿、帮的是谁",
              ],
              troubleshooting: [
                {
                  problem: "这台机器人没有传感器",
                  fix: "问一句：它怎么知道该动手了？传感器就该放在那个位置。",
                },
              ],
              extension: "列一列你套件里哪些真实的传感器适合用在你的设计上。",
            },
            simulator: {
              title: "设计一个以后能在模拟器里搭出来的帮手",
              materials: [
                "铅笔和纸",
                "作参考用的浏览器模拟器",
              ],
              instructions: [
                "画一台能在网格上工作的实用机器人，比如一个送货帮手。",
                "标注它的输入、处理和输出。",
                "用「如果……就……」的形式，写出它遵循的那一条规则。",
              ],
              safetyNotes: [
                "没有安全隐患。",
              ],
              expectedResult: "一张标注清楚的草图，附带一条明确的「如果……就……」规则，日后模拟器能照着跑。",
              successCriteria: [
                "至少标注了一个传感器和一个执行器",
                "处理环节的判断写成了「如果……就……」的形式",
                "写明了它干什么活儿、帮的是谁",
              ],
              troubleshooting: [
                {
                  problem: "想法太大了，画不下来",
                  fix: "把它缩小到机器人在一小片网格上完成的一件事。",
                },
              ],
              extension: "把你的帮手将要工作的那张网格地图画出来。",
            },
            unplugged: {
              title: "设计并做一个纸做的帮手机器人",
              materials: [
                "铅笔和纸",
                "回收纸箱和马克笔（可选）",
              ],
              instructions: [
                "针对家里一个真实的问题，画一台实用机器人。",
                "标注输入、处理和输出，并写明传感器和执行器分别是什么。",
                "如果手边有材料，用一个纸盒快速做个模型，把各个部件展示出来。",
              ],
              safetyNotes: [
                "如果要做模型，请使用儿童安全剪刀，并在大人陪同下进行。",
              ],
              expectedResult: "一张标注清楚的草图（模型可做可不做），画的是一台任务明确的帮手机器人。",
              successCriteria: [
                "至少标注了一个传感器和一个执行器",
                "处理环节的判断写下来了",
                "写明了它干什么活儿、帮的是谁",
              ],
              troubleshooting: [
                {
                  problem: "模型上没有能动的部件",
                  fix: "加一片小翻板、一个轮子或一条手臂，用来代表执行器。",
                },
              ],
              extension: "给你的模型起个名字，再写一句话当作它的「使用说明书」。",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "考察之前先想一想：你手上哪件设备「最像机器人」？为什么？",
          howToCheck: "用「感知、决定、行动」检验过之后，看看全班把它放在了从机器到机器人那条线的哪个位置，再和你的猜测对照一下。",
        },
      ],
      knowledgeCheck: {
        instructions: "回答这几题，检验一下你能否分清机器人和机器，并说出它们的各个部件。",
        questions: [
          {
            prompt: "判断这是哪一类系统。",
            scenario: "一辆玩具车，你按下手柄上的按钮它就往前开，你拨动操纵杆它就转弯。它从来不会自己改变做法。",
            options: [
              {
                text: "一台自主机器人",
                feedback: "它从来不会自己作任何决定，所以不是自主的。",
              },
              {
                text: "一台遥控机器",
                feedback: "对了：每个决定都是人通过手柄作出的，所以它是遥控的。",
              },
              {
                text: "根本不算机器",
                feedback: "它是机器；有人操控时它就在干活。",
              },
              {
                text: "一台带距离传感器的机器",
                feedback: "题目里没有任何东西在测距离；感知的是人。",
              },
            ],
            explanation: "每一步动作都是人用手柄决定的，所以它是遥控的，不是自主机器人。",
          },
          {
            prompt: "下面哪些是执行器？把符合的都选出来。",
            options: [
              {
                text: "带动轮子转的电机",
                feedback: "对：电机让东西动起来，所以是执行器。",
              },
              {
                text: "距离传感器",
                feedback: "那是传感器：它只测量，不行动。",
              },
              {
                text: "会发出声音的蜂鸣器",
                feedback: "对：蜂鸣器对外界产生了作用，所以是执行器。",
              },
              {
                text: "机器人点亮的一盏灯",
                feedback: "对：灯是机器人能点亮的一种输出，所以是执行器。",
              },
            ],
            explanation: "执行器就是负责行动的部件：电机、蜂鸣器和灯。传感器只负责测量，所以不是执行器。",
          },
          {
            prompt: "什么样的东西才算机器人，而不只是机器？",
            options: [
              {
                text: "它是金属做的",
                feedback: "材料无关紧要：很多机器人是塑料的，很多金属做的东西也不是机器人。",
              },
              {
                text: "它能自己感知、决定和行动",
                feedback: "对了：能自己感知、决定和行动，正是机器人的判断标准。",
              },
              {
                text: "它有开关",
                feedback: "很多普通机器都有开关，可它们什么也决定不了。",
              },
              {
                text: "它很贵",
                feedback: "价格和是不是机器人毫无关系。",
              },
            ],
            explanation: "机器人会感知世界、决定要做什么、然后行动，而且这一切都是它按照程序自己完成的。",
          },
          {
            prompt: "在输入、处理、输出的循环里，「处理」指的是哪一步？",
            options: [
              {
                text: "机器人用传感器测量外界",
                feedback: "那是输入那一步。",
              },
              {
                text: "机器人转动轮子或点亮灯",
                feedback: "那是输出那一步。",
              },
              {
                text: "控制器决定拿这个输入怎么办",
                feedback: "正确：处理就是控制器作决定的那一步。",
              },
              {
                text: "机器人给电池充电",
                feedback: "充电不属于感知、决定、行动这个循环。",
              },
            ],
            explanation: "处理就是「思考」的那一步：控制器接过输入，决定要产生什么输出。",
          },
          {
            prompt: "机器人身上哪个部件是执行器？",
            options: [
              {
                text: "带动轮子转的电机",
                feedback: "对：执行器让某样东西动起来或让某件事发生。",
              },
              {
                text: "距离传感器",
                feedback: "那是传感器：它只测量，不行动。",
              },
              {
                text: "控制器电路板",
                feedback: "控制器负责决定，不是负责行动的那一部分。",
              },
              {
                text: "电池",
                feedback: "电池提供电力，但不是负责行动的那一部分。",
              },
            ],
            explanation: "执行器就是负责行动的部件：电机、轮子、机械爪、蜂鸣器和灯。",
          },
          {
            prompt: "一台扫地机器人没人操控就把房间打扫干净了。这属于哪一类系统：",
            options: [
              {
                text: "遥控",
                feedback: "遥控指的是有人在实时操控它。",
              },
              {
                text: "自主",
                feedback: "正确：它运行自己的程序，靠传感器作决定。",
              },
              {
                text: "根本不是机器人",
                feedback: "它会感知、决定和行动，所以是机器人。",
              },
              {
                text: "坏掉了",
                feedback: "能自己干活，正是自主机器人本该做到的事。",
              },
            ],
            explanation: "自主系统靠自己的程序和传感器作决定，不需要有人操控。",
          },
          {
            prompt: "机器人为什么需要程序？",
            options: [
              {
                text: "为了看上去更高科技",
                feedback: "程序管的是行为，不是外观。",
              },
              {
                text: "这样它才能自己一遍遍地把同一件活儿干得一模一样",
                feedback: "对了：程序就是那份指令，让它不用人在旁边也能重复完成一件活儿。",
              },
              {
                text: "这样它就能更重一些",
                feedback: "程序和重量没有任何关系。",
              },
              {
                text: "这样它就不需要传感器了",
                feedback: "程序常常要用到传感器；它取代不了传感器。",
              },
            ],
            explanation: "程序就是控制器要遵循的那份指令清单，有了它，机器人才能自己重复完成一件活儿。",
          },
        ],
      },
      reflection: [
        {
          prompt: "有哪件事你放心交给机器人去做？又有哪件事应该仍旧由人来做？说说你的理由。",
        },
        {
          prompt: "想一台你见过的机器人。它感知什么、决定什么、又做了什么？",
        },
        {
          prompt: "你最希望一台实用机器人替你做什么事？它需要什么样的传感器？",
        },
      ],
      journalPrompts: [
        {
          prompt: "把你的「实用机器人」画出来，并标注它的输入、处理和输出。",
        },
        {
          prompt: "用一句话写下你的机器人干什么活儿、帮的是谁。",
        },
      ],
      simulatorMissions: [
        {
          title: "看机器人作出反应",
          objective: "运行示例机器人，看它的传感器检测到墙时是怎样停下来的。",
          successCriteria: [
            "机器人在墙前停了下来",
            "学生能说出输入和输出分别是什么",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "什么让机器人成为机器人",
          focus: "感知、决定、行动，以及输入、处理、输出的循环。",
        },
        {
          title: "「是不是机器人」考察",
          focus: "用「感知、决定、行动」给真实设备分类。",
        },
        {
          title: "机器人系统图",
          focus: "画出一件设备的输入、处理、输出和各个部件。",
        },
        {
          title: "「实用机器人」设计挑战",
          focus: "画一台帮手机器人，并标注它的各个部件。",
        },
        {
          title: "知识检测",
          focus: "关于机器人、部件和循环的五道题。",
        },
        {
          title: "反思",
          focus: "写一写机器与机器人的区别，以及你想要什么样的帮手。",
        },
      ],
      safetyNotes: [
        {
          text: "让手指、头发和宽松的衣服远离套件机器人上转动的轮子和齿轮。",
        },
        {
          text: "不要打开或拆解真的家用电器；通过观察它们怎么工作来研究。",
        },
        {
          text: "使用模拟器时如果眼睛累了，就短暂地离开屏幕休息一下。",
        },
      ],
      printableResources: [
        {
          title: "机器人系统图",
          description: "一页纸的表格，用来画出一件设备的输入、处理、输出、控制器、传感器和执行器。",
        },
        {
          title: "「实用机器人」设计页",
          description: "留出空间，用来画出并标注一台帮手机器人的输入、处理和输出。",
        },
        {
          title: "第 1 周教师指南",
          description: "针对「是不是机器人」这一课的课前准备、课堂组织、常见误解和提问建议。",
        },
      ],
      completion: {
        summary: "完成第 1 周：把一件设备当作机器人系统画出来，画出一台实用机器人，并通过知识检测。",
        requirements: [
          {
            label: "为一件设备完成机器人系统图",
          },
          {
            label: "画出并标注一台实用机器人",
          },
          {
            label: "知识检测至少答对 5 题中的 4 题",
          },
          {
            label: "写下你的反思",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "准备三四件日常设备，从明显只是机器的，到明显就是机器人的都有。",
          "打印「机器人系统图」活动纸，每人或每组一份。",
          "如果用套件，先充好电并预先载入一个简单的传感器行为；如果用模拟器，在每台设备上先打开它。",
        ],
        prep: [
          "自己先做一遍「是不是机器人」的分类，这样才能引导那些拿不准的例子。",
          "准备好扫地机器人或自动门的例子，作为大家熟悉的自主系统。",
        ],
        facilitation: [
          "先讲「感知、决定、行动」的判断标准和输入、处理、输出的循环，再把设备拿出来。",
          "开展「是不是机器人」考察，追问学生为每一个位置说明理由。",
          "带着全班一起做一张机器人系统图，然后让学生两人一组画第二件设备。",
          "以「实用机器人」草图和知识检测收尾。",
        ],
        commonMisconceptions: [
          "「只要是电子的就是机器人」：手电筒是电子的，可它不会作决定。",
          "「只要会动就是机器人」：上发条的玩具会动，但它既不感知也不决定。",
          "把传感器和执行器搞混：一个负责测量，一个负责行动。",
        ],
        questionsToAsk: [
          "这件设备怎么知道该动手了？",
          "如果我们把它的传感器拿掉，会发生什么？",
          "这里作决定的是人，还是这件设备？",
        ],
        easierVersion: "用设备图片卡全班一起分类，不必画出完整的循环。",
        harderVersion: "让学生画一件既能自主又能遥控的设备，并说明它在什么情况下分别属于哪一种。",
      },
      nextWeek: {
        teaser: "下周我们不再光是谈机器人，而要真正动手搭一台能跑起来的。",
        prepare: [
          "如果你走的是不插电路线，攒下几个结实的纸箱和一些瓶盖。",
          "给你的套件充好电，或者把模拟器加入收藏夹。",
          "想一想：一个装了轮子的东西，什么情况下会翻倒，什么情况下能稳稳当当。",
        ],
      },
    },
    {
      title: "搭一台能跑起来的机器人",
      subtitle: "把电机的转动变成平稳的滚动，并设计一个跑起来不会翻的底盘。",
      summary: "学生已经知道机器人是什么，现在要动手搭一台真能跑的。他们会学到电机如何带动车轴，轮子和齿轮如何把这份转动变成前进的动作，以及齿轮又是怎样用速度换取转动的力气（扭矩）的。他们还要弄清楚为什么有的轮式底盘会翻、有的却稳稳当当：摩擦力和抓地力负责「抓住地面」，又低又宽的质心负责「站得稳」。接着他们会认识差速驱动，也就是靠两个轮子转速不同来让机器人转向。最后，每位学生都要搭出并测试自己的轮式底盘。",
      mainMission: "搭一个稳固的轮式底盘，并测试轮子、齿轮和底盘的不同选择会怎样改变它的行驶表现。",
      estimatedTime: "65 至 80 分钟",
      learningGoals: [
        {
          text: "说明电机、车轴和轮子是怎样把转动变成滚动的",
        },
        {
          text: "找出轮式底盘上的轮子、车轴和齿轮",
        },
        {
          text: "比较速度和扭矩，以及齿轮如何用一个换取另一个",
        },
        {
          text: "用摩擦力和抓地力解释轮子为什么会抓住地面或者打滑",
        },
        {
          text: "分辨稳固和不稳的底盘设计",
        },
        {
          text: "说明轮距和质心是怎样影响平衡的",
        },
        {
          text: "搭出或模拟一个轮式底盘，并用差速驱动来操控它",
        },
        {
          text: "测试一个设计，并根据结果加以改进",
        },
      ],
      vocabulary: [
        {
          term: "电机",
          definition: "通电后会转动的部件，为机器人提供滚动所需的动力。",
        },
        {
          term: "车轴",
          definition: "一根装着轮子的杆，车轴一转，轮子就跟着转。",
        },
        {
          term: "轮子",
          definition: "圆形的部件，车轴转动时它就带着机器人在地上滚动。",
        },
        {
          term: "齿轮",
          definition: "带齿的轮子，与另一个齿轮咬合，把转动传过去，同时改变转动的速度或力气。",
        },
        {
          term: "速度",
          definition: "机器人跑得有多快。小齿轮带大齿轮，会让轮子转得更慢。",
        },
        {
          term: "扭矩",
          definition: "电机或齿轮所具有的转动力气。扭矩越大，推动沉重的机器人或者爬坡的力量就越足。",
        },
        {
          term: "摩擦力",
          definition: "两个接触面之间的相互摩擦的力。它会减缓滑动，让轮子抓住地面，而不是在原地空转。",
        },
        {
          term: "抓地力",
          definition: "轮子抓住地面的能力。抓地力好，轮子就能把机器人往前推，而不是打滑。",
        },
        {
          term: "平衡",
          definition: "把机器人的重量分布好，让它立得住、不翻倒。",
        },
        {
          term: "稳定性",
          definition: "一台机器人有多难被弄翻。又低又宽的底盘比又高又窄的更稳。",
        },
        {
          term: "质心",
          definition: "机器人重量集中的那个平均位置。质心越低，机器人就越不容易翻。",
        },
        {
          term: "底盘",
          definition: "机器人的车架或者说底座，把电机、轮子和其他所有部件固定在一起。",
        },
        {
          term: "差速驱动",
          definition: "一种转向方式：让两侧的轮子以不同速度转动，机器人就会往转得慢的那一侧偏。",
        },
      ],
      prerequisites: [
        {
          reason: "第 1 周把电机和轮子归为执行器；第 2 周则展示这些执行器究竟是怎样让机器人动起来的，所以学生得先有「感知、决定、行动」这个整体框架。",
        },
      ],
      concepts: [
        {
          title: "从转动的电机到滚动的机器人",
          body: [
            "电机通电就会转，但光是一个转着的电机哪儿也去不了。要动起来，机器人得把电机接到车轴上，车轴再装上轮子。电机带动车轴，轮子跟着转，机器人就滚起来了。",
            "所以这条链条是：电机转动、车轴带动、轮子滚动。链条上任何一环松了或缺了，转动就传不到地面，机器人只能原地不动。",
          ],
          examples: [
            "电机带着一根光秃秃、没装轮子的车轴，只能在空中干转",
            "把轮子套到转动的车轴上，机器人就往前走了",
          ],
        },
        {
          title: "齿轮用速度换扭矩",
          body: [
            "齿轮是带齿的轮子，彼此咬合，一个就能带动另一个。小齿轮带大齿轮时，大齿轮转得更慢，但转动的力气更大。大齿轮带小齿轮时，小齿轮转得更快，但力气更小。",
            "这种转动的力气就叫扭矩。齿轮让你自己选：要么是又慢又有劲、能爬能推的机器人，要么是又快但力气小、在平地上飞驰的机器人。速度和扭矩没法同时拉满，只能用一个换另一个。",
          ],
          examples: [
            "自行车挂低速挡：慢，但上坡蹬起来轻松（扭矩大）",
            "自行车挂高速挡：平地上快，但起步很吃力（扭矩小）",
          ],
        },
        {
          title: "摩擦力和抓地力：轮子是怎么抓住地面的",
          body: [
            "摩擦力是两个接触面之间相互摩擦的力。没有摩擦力，转动的轮子只会在原地打滑，机器人哪儿也去不了，就像轮胎打在冰面上一样。",
            "抓地力指的是轮子抓住地面的能力，它来自摩擦力。橡胶轮胎在地毯上抓地力很足；光滑的塑料轮子在滑溜的地板上就几乎抓不住。抓地力好，轮子的转动才能变成真正的前进。",
          ],
          examples: [
            "橡胶轮胎牢牢抓住路面（抓地力大）",
            "轮子在潮湿或光滑的表面上空转（抓地力小）",
            "在打滑的轮子外面套一根橡皮筋，帮它抓住地面",
          ],
        },
        {
          title: "平衡、稳定性和质心",
          body: [
            "质心是机器人重量集中的那个平均位置。当质心倾斜到轮子以外时，机器人就会翻倒。",
            "要让机器人更稳，就把质心放低、把底盘做宽。又低又宽的底盘很难弄翻；又高又窄、头重脚轻的则一碰就倒。赛车之所以又低又宽就是这个道理，积木塔堆得太高会倒也是同样的道理。",
          ],
          examples: [
            "又低又宽的底盘转弯时也能立得住",
            "零件堆成的高塔，在机器人急停时会倒下来",
            "把沉甸甸的电池装在底盘下部，好把质心压低",
          ],
        },
        {
          title: "底盘设计：机器人的车架",
          body: [
            "底盘就是把电机、车轴、轮子和电池固定在一起的车架。好的底盘会让轮子笔直对齐，把电机牢牢卡住，并把沉重的部件放在低处。",
            "设计上的取舍很要紧：轮子隔得太开或太近、电机没固定牢、车架晃晃悠悠，都会改变机器人的行驶表现。底盘绝不只是个盒子，它决定了机器人能不能走直线、拐弯利不利落、站不站得稳。",
          ],
          examples: [
            "轮子笔直对齐，机器人才能走直线",
            "车架结实，电机才不会晃",
            "重量放低，并压在轮子的正中间",
          ],
        },
        {
          title: "差速驱动：靠速度来转向",
          body: [
            "大多数小型机器人靠差速驱动转向：两个轮子分居两侧，各由自己的电机带动。两个轮子转速相同时，机器人就直着走。",
            "要转弯，就让两个轮子转得不一样快。机器人会朝转得慢的那一侧划出弧线。如果一个轮子往前转、另一个往后转，机器人就会原地打转。这里没有方向盘，轮速之差就是方向盘。",
          ],
          examples: [
            "两轮同速：笔直向前",
            "左轮比右轮慢：机器人向左划弧",
            "左轮向前、右轮向后：机器人原地打转",
          ],
        },
      ],
      materials: [
        {
          name: "「底盘测试记录」活动纸（可打印）",
        },
        {
          name: "铅笔、纸，以及一把直尺或卷尺",
        },
        {
          name: "一段短斜坡，或者一摞书，用来搭出坡面做翻倒测试",
        },
        {
          name: "一套可编程机器人套件，配两个电机、轮子、车轴和齿轮",
        },
        {
          name: "套件里各式各样的轮子和齿轮，用来更换和比较",
        },
        {
          name: "装有浏览器模拟器的电脑或平板",
        },
        {
          name: "做底盘用的纸板，外加胶带和剪刀",
        },
        {
          name: "瓶盖或罐盖当轮子，木签或吸管当车轴",
        },
        {
          name: "橡皮筋、硬币或黏土，用来增加抓地力和重量",
        },
        {
          name: "一颗玻璃弹珠或小球，用来演示质心的移动",
        },
      ],
      activities: [
        {
          title: "底盘虚拟考察",
          goal: "探究轮子大小、齿轮配比和底盘形状会怎样改变一个轮式底盘的行驶、抓地和站立表现。",
          shared: [
            "你每次只改一样东西：轮子大小、齿轮、底盘宽度或者重量，然后观察底盘怎么跑。每次只改一样，才分得清究竟是哪个改动带来了哪个结果。",
            "每改一次，就记下速度、抓地力和稳定性发生了什么变化。写清楚哪一种配置跑得又直又快，哪一种最稳。",
          ],
          variants: {
            kit: {
              title: "在套件底盘上更换真实的轮子和齿轮",
              materials: [
                "一套带两个电机的可编程机器人套件",
                "套件里各式各样的轮子和齿轮",
                "「底盘测试记录」活动纸",
              ],
              instructions: [
                "搭一个简单的双电机底盘，用固定的速度让它在地板上直着开过去。",
                "把轮子换成大一号或小一号的，再跑一遍同样的距离。记下速度的变化。",
                "调整齿轮配比（或电机功率），让轮子转得更慢，再感受一下要让底盘停下来有多费劲：这就是扭矩变大了。",
                "在上面加一个高高的部件，然后再把重量挪到低处，看看哪一种更容易被推翻。",
              ],
              safetyNotes: [
                "让手指、头发和宽松的衣服远离转动的齿轮和轮子。",
                "更换轮子或齿轮之前先把电机关掉。",
              ],
              expectedResult: "轮子越大跑得越快，但起步更费劲；齿轮配比越低扭矩越大；又低又宽的底盘最难被弄翻。",
              successCriteria: [
                "至少测试并记录了三种配置",
                "每一处改动都写明了它对速度、抓地力或稳定性的影响",
                "指出了最稳的那一种配置，并说明了理由",
              ],
              troubleshooting: [
                {
                  problem: "底盘不直着走，老是拐弯",
                  fix: "检查两个轮子是不是都拧紧了、两个电机转速是不是一样；轮子松动或电机不匹配都会让它跑偏。",
                },
                {
                  problem: "轮子在转，底盘却不动",
                  fix: "轮子在打滑，说明抓地力不足。换一个更抓地的轮子，或者换一个更粗糙的地面试试。",
                },
              ],
              extension: "找出能一口气爬上你那道斜坡、中途不熄火的轮子与齿轮组合。",
            },
            simulator: {
              title: "在模拟器里测试不同的底盘方案",
              materials: [
                "浏览器模拟器",
                "「底盘测试记录」活动纸",
              ],
              instructions: [
                "打开底盘实验室任务，用默认底盘穿过网格，记下它的速度。",
                "改变轮子大小的设置，再跑一次，记录速度和抓地力有什么变化。",
                "把齿轮配比往扭矩大的方向调，然后爬模拟器里的坡；看看低配比能爬上去的地方，高配比是怎么熄火的。",
                "把底盘的质心调高再调低，然后来个快速转弯，看看哪种设置会翻倒或者摇晃。",
              ],
              safetyNotes: [
                "没有安全隐患；眼睛累了就离开屏幕歇一会儿。",
              ],
              expectedResult: "模拟器会显示：大轮子跑得更快，低齿轮配比爬坡扭矩更大，质心低的底盘转弯时也立得住。",
              successCriteria: [
                "至少测试并记录了三种配置",
                "每一处改动都写明了它对速度、抓地力或稳定性的影响",
                "指出了最稳的那一种配置，并说明了理由",
              ],
              troubleshooting: [
                {
                  problem: "每种配置跑起来都一个样",
                  fix: "确认你确实改了设置并重新运行了；每次只改一个设置，效果才看得清楚。",
                },
                {
                  problem: "底盘一转弯就翻",
                  fix: "把质心调低或者把底盘加宽，然后转弯时慢一点。",
                },
              ],
              extension: "找出对底盘爬坡帮助最大的那一个设置。",
            },
            unplugged: {
              title: "用家里的轮子比较纸板底盘",
              materials: [
                "做两个小底盘用的纸板",
                "瓶盖，以及木签或吸管",
                "橡皮筋、硬币或黏土（可选）",
                "一道斜坡或一摞书",
                "「底盘测试记录」活动纸",
              ],
              instructions: [
                "用纸板做一个简单底盘，把瓶盖当轮子装在木签车轴上，让它从一道缓坡上滚下来。",
                "换成更大的瓶盖轮子，再滚一次，记下它跑得多远、多快有什么变化。",
                "在轮子外面缠上橡皮筋来增加抓地力，然后在光滑的表面上滚一次，和光秃秃的瓶盖比一比：这就是抓地力。",
                "做一个高的版本和一个又低又宽的版本，分别在斜坡上倾斜，看哪个先翻。",
              ],
              safetyNotes: [
                "切割纸板和车轴孔时，请使用儿童安全剪刀，并在大人陪同下进行。",
                "把木签的尖头包起来或者磨钝。",
              ],
              expectedResult: "大轮子滚得更远，缠了橡皮筋的轮子抓地更好，又低又宽的底盘要倾斜到更陡的角度才会翻。",
              successCriteria: [
                "至少测试并记录了三种配置",
                "每一处改动都写明了它对速度、抓地力或稳定性的影响",
                "指出了最稳的那一种配置，并说明了理由",
              ],
              troubleshooting: [
                {
                  problem: "底盘滚歪了",
                  fix: "把车轴摆正，让它们互相平行，并保证两侧轮子大小一致。",
                },
                {
                  problem: "轮子在蹭着走，不滚",
                  fix: "车轴可能卡住了。把孔稍微扩大一点，让车轴能自由转动。",
                },
              ],
              extension: "先把一枚硬币放在底盘低处，再放到高处，看哪种摆法让它在斜坡上更稳。",
            },
          },
        },
        {
          title: "轮式底盘挑战",
          goal: "搭一个能走直线、立得稳，并且能用差速驱动转向的轮式底盘。",
          shared: [
            "搭一个底盘，两侧各装一个驱动轮，前面或后面再加一个支撑点，免得它翻倒。把沉重的部件放低，让轮子笔直对齐。",
            "测三件事：它走得直吗？让两轮转速不同能不能让它转向？急停和转弯时它站得住吗？每次只改一处，直到三件事都做到为止。",
          ],
          variants: {
            kit: {
              title: "用实体套件搭轮式底盘",
              materials: [
                "一套可编程机器人套件，配两个电机、轮子和车轴",
                "做翻倒测试用的斜坡或几本书",
                "「底盘测试记录」活动纸",
              ],
              instructions: [
                "搭一个能牢牢固定两个电机的底盘，每个电机各带一侧的轮子，再加一个万向轮或滑块作为第三个支撑点来保持平衡。",
                "把电池和沉重的部件放在低处、居中位置，让质心保持在低位。",
                "让它往前开，一边调整一边试，直到能走直线；然后让两轮转速不同，让它转弯。",
                "用急刹车和在缓坡上行驶这两种方式，测一测它的稳定性。",
              ],
              safetyNotes: [
                "行驶过程中请远离转动的轮子和齿轮。",
                "在空旷处测试，远离桌边和楼梯。",
              ],
              expectedResult: "一个用套件搭的底盘，能走直线，能用差速驱动转弯，急停时和在缓坡上都立得住。",
              successCriteria: [
                "至少能直行一米",
                "靠改变轮速能左转和右转",
                "急停时不会翻倒",
                "电机和轮子都固定牢靠",
              ],
              troubleshooting: [
                {
                  problem: "它总是往一边偏",
                  fix: "可能某个电机转得更快，或者某个轮子松了；把两个电机的转速调一致，并把两个轮子都拧紧。",
                },
                {
                  problem: "它一停下来就往前栽",
                  fix: "质心太高或者太靠前了；把重量放低，并往后挪到轮子上方。",
                },
              ],
              extension: "给它编个程序，先走一条直线，再用差速驱动的转弯走出一个正方形。",
            },
            simulator: {
              title: "模拟器底盘挑战",
              materials: [
                "浏览器模拟器",
                "「底盘测试记录」活动纸",
              ],
              instructions: [
                "打开底盘搭建任务，配置一个双轮差速驱动的底盘。",
                "选好轮子大小并把质心设得低一些，让底盘更稳，然后直着穿过网格。",
                "给左右轮设置不同的速度让它转弯，练一练左转、右转和原地打转。",
                "来一次快速转弯，再爬一次模拟器里的坡，确认它不会翻。",
              ],
              safetyNotes: [
                "没有安全隐患；记得常常保存你的成果。",
              ],
              expectedResult: "一个模拟器里的底盘，能走直线，能用差速驱动转向，转弯和爬坡时都立得住。",
              successCriteria: [
                "能直着穿过整片网格",
                "靠改变轮速能左转和右转",
                "两轮反向转动时能原地打转",
                "快速转弯时不会翻倒",
              ],
              troubleshooting: [
                {
                  problem: "底盘只会直着走，从来不转弯",
                  fix: "把两个轮子的速度设成不同的数值；速度一样就永远是直着走。",
                },
                {
                  problem: "底盘转弯时会翻",
                  fix: "把质心调低或者把轮距加宽，然后转弯时轻一点。",
                },
              ],
              extension: "只用差速驱动的转弯，让底盘完整地走出一个正方形。",
            },
            unplugged: {
              title: "用家用材料做轮式底盘",
              materials: [
                "做底盘用的纸板",
                "当轮子的瓶盖，以及当车轴的木签或吸管",
                "胶带、剪刀，还有一两根橡皮筋",
                "橡皮筋、硬币或黏土，用来增加抓地力和重量（可选）",
                "做翻倒测试用的斜坡或几本书",
                "「底盘测试记录」活动纸",
              ],
              instructions: [
                "剪一块又低又宽的纸板底座，戳两个互相平行的车轴孔，好让轮子笔直对齐。",
                "把瓶盖轮子套到木签车轴上，再在前面加一个小滑块（一片折起来的纸板舌），让它靠三个点支撑住。",
                "推它一把，调整车轴直到它能滚直；然后推一侧比另一侧用力，看它拐弯：这就是用手做出来的差速转向。",
                "在底盘低处加上重量，再在斜坡上倾斜，确认它比高版本立得更久。",
              ],
              safetyNotes: [
                "请使用儿童安全剪刀并在大人陪同下操作，木签尖头要磨钝。",
                "在桌面上测试，离桌边远一些。",
              ],
              expectedResult: "一个纸板底盘，滚得基本笔直，靠一侧比另一侧多推一点就能拐弯，在缓坡上也立得住。",
              successCriteria: [
                "至少能直着滚半米",
                "靠一侧比另一侧多推一点就能拐弯",
                "在斜坡上比高版本立得更久",
                "轮子互相平行，而且转动自如",
              ],
              troubleshooting: [
                {
                  problem: "它滚歪了",
                  fix: "车轴没对平行，或者两侧轮子大小不一样；把孔戳正，再把轮子配成一对。",
                },
                {
                  problem: "轮子在桌面上打滑",
                  fix: "在每个轮子外面缠一根橡皮筋，增加抓地力。",
                },
              ],
              extension: "让你的两个底盘比一场赛，并用测试记录说明哪一个滚得更直、为什么。",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "做翻倒测试之前：你觉得在斜坡上哪个底盘立得更久，是又高又窄的还是又低又宽的？为什么？",
          howToCheck: "把每个底盘放在斜坡上倾斜（或者跑一遍模拟器的坡），看哪个先翻，再和你的猜测对照一下。",
        },
        {
          prompt: "换齿轮之前：你觉得把齿轮配比调低，会让底盘更快，还是爬坡更有劲？预测一下它要拿什么去换。",
          howToCheck: "把齿轮调成让轮子转得更慢，然后爬一次斜坡，看看它是不是爬得更好、但跑得更慢了。",
        },
      ],
      testRecords: [
        {
          title: "轮式底盘的速度与直线性测试",
          instructions: "画一条起点线和一条终点线，相隔一米。让底盘从起点出发，记录它用了多少秒，以及终点时偏离直线多远。一共跑三次。",
          columns: [
            null,
            "到达终点用时（秒）",
            "偏离直线多远（厘米）",
            "备注",
          ],
          measure: "跑完这段距离所用的时间，以及底盘偏离直线的程度",
        },
        {
          title: "翻倒稳定性测试",
          instructions: "把底盘放在斜坡上，慢慢抬高斜坡，直到底盘翻倒。分别记录又低又宽和又高又窄两种配置翻倒时的角度（或者垫了几本书）。",
          columns: [
            "配置",
            "垫几本书 / 到什么角度会翻",
            "有没有立住？（是/否）",
          ],
          measure: "每种配置翻倒时的角度或斜坡高度",
        },
      ],
      knowledgeCheck: {
        instructions: "回答这几题，检验一下你是否明白机器人是怎么动起来、又是怎么保持平稳的。",
        questions: [
          {
            prompt: "诊断一下这个设计问题。",
            scenario: "一位学生的机器人又高又窄，电池装在最上面。它直着开没问题，可每次快速转弯都会翻倒。",
            options: [
              {
                text: "质心太高了",
                feedback: "对了：又高又头重脚轻的机器人质心很高，很容易翻，转弯时尤其如此。",
              },
              {
                text: "轮子的抓地力太强了",
                feedback: "抓地力强是好事；翻倒是因为它又高又头重脚轻。",
              },
              {
                text: "电机的扭矩太小了",
                feedback: "它开起来好好的，所以扭矩不是翻倒的原因。",
              },
              {
                text: "车轴太长了",
                feedback: "车轴更长（轮距更宽）反而会让它更稳，而不是更不稳。",
              },
            ],
            explanation: "又高又头重脚轻，意味着质心高，快速转弯时就会翻。把重量放低，或者把轮距加宽。",
          },
          {
            prompt: "转动的电机是怎样让机器人在地板上滚起来的？",
            options: [
              {
                text: "电机带动车轴，车轴再带动轮子",
                feedback: "对了：电机转动、车轴带动、轮子滚动，这就是让机器人动起来的那条链条。",
              },
              {
                text: "电机往后吹气，把机器人推着走",
                feedback: "轮式机器人靠轮子转动前进，不是靠吹气。",
              },
              {
                text: "电机让机器人变轻了",
                feedback: "电机不会改变机器人的重量；它提供的是转动。",
              },
              {
                text: "不用电机，轮子自己就会滚",
                feedback: "轮子会转，正是因为电机带动了它们所在的车轴。",
              },
            ],
            explanation: "电机带动车轴，车轴带动装在上面的轮子，轮子一转，机器人就滚起来了。",
          },
          {
            prompt: "你把机器人的齿轮调低，让轮子转得更慢。你得到了什么，又放弃了什么？",
            options: [
              {
                text: "得到速度，放弃扭矩",
                feedback: "刚好反过来：轮子转得慢，扭矩才更大，速度并不会更快。",
              },
              {
                text: "得到扭矩（转动的力气），放弃速度",
                feedback: "正确：齿轮用速度换扭矩；轮子转得慢，推东西和爬坡的劲头就更足。",
              },
              {
                text: "速度和扭矩都变大",
                feedback: "速度和扭矩没法同时拉满；齿轮只能用一个换另一个。",
              },
              {
                text: "速度和扭矩都变小",
                feedback: "调低齿轮配比不会两样都损失，而是用速度换来了更大的扭矩。",
              },
            ],
            explanation: "齿轮用速度换扭矩。让轮子转得更慢，爬坡和推东西时的转动力气就更大。",
          },
          {
            prompt: "机器人的轮子转得飞快，可在光滑打滑的地板上却几乎不动。问题出在哪儿？",
            options: [
              {
                text: "扭矩太大了",
                feedback: "问题出在抓地力，不是转动的力气。",
              },
              {
                text: "电机关着",
                feedback: "轮子在转，说明电机显然是开着的。",
              },
              {
                text: "抓地力不足：轮子在打滑，抓不住地面",
                feedback: "对了：摩擦力小就意味着抓地力小，于是轮子只会打滑，推不动机器人往前走。",
              },
              {
                text: "质心太低了",
                feedback: "质心低有助于稳定；它不会让轮子打滑。",
              },
            ],
            explanation: "光滑的地板摩擦力很小，轮子抓地力不足，只能在原地打滑，没法让机器人往前走。",
          },
          {
            prompt: "哪一种机器人底盘最难被弄翻？",
            options: [
              {
                text: "又高又窄、沉重部件都堆在上面的底盘",
                feedback: "那是最容易翻的：质心高，一碰就倒。",
              },
              {
                text: "又低又宽、沉重部件都靠近底部的底盘",
                feedback: "正确：又低又宽、质心也低的底盘最稳。",
              },
              {
                text: "轮子最大的底盘，形状怎样都无所谓",
                feedback: "轮子大小主要影响速度和抓地力，而不是会不会翻；决定稳定性的是形状和重量摆放的位置。",
              },
              {
                text: "颜色最鲜艳的底盘",
                feedback: "颜色和稳定性毫无关系。",
              },
            ],
            explanation: "又低又宽的底盘把质心压得很低，而且落在轮子范围之内，所以很难被弄翻。",
          },
          {
            prompt: "在差速驱动里，一台双轮机器人是怎么左转的？",
            options: [
              {
                text: "它像汽车一样用方向盘",
                feedback: "差速驱动的机器人没有方向盘；它们靠轮速来转向。",
              },
              {
                text: "左轮转得比右轮慢",
                feedback: "对了：机器人会朝转得慢的那一侧划弧，所以左轮慢下来它就会左转。",
              },
              {
                text: "两个轮子一起加速",
                feedback: "两轮速度相同，机器人只会直着走，不会转弯。",
              },
              {
                text: "电机往一侧倾斜",
                feedback: "电机不会倾斜；负责转向的是两轮速度之差。",
              },
            ],
            explanation: "在差速驱动里，机器人会朝转得慢的那一侧偏，所以把左轮放慢就能让它左转。",
          },
        ],
      },
      reflection: [
        {
          prompt: "哪一处机械改动对你的机器人行驶影响最大？为什么？",
        },
        {
          prompt: "哪一处改动让你的底盘最稳？它为什么起了作用？",
        },
        {
          prompt: "描述一下：只用那两个轮子，你会怎样让机器人左转。",
        },
      ],
      journalPrompts: [
        {
          prompt: "从侧面画出你的轮式底盘，并标注电机、车轴、轮子，以及重量落在哪里。",
        },
        {
          prompt: "记录你的速度与直线性测试结果，以及哪种配置跑得最好。",
        },
        {
          prompt: "用一句话写下：要让底盘更稳，你会改什么。",
        },
      ],
      simulatorMissions: [
        {
          title: "又直又稳地开过去",
          objective: "配置一个差速驱动底盘，让它直着穿过网格，既不跑偏也不翻倒。",
          successCriteria: [
            "底盘到达网格的另一端",
            "全程保持在一条直线上",
            "全程都没有翻倒",
          ],
        },
        {
          title: "用差速驱动来转向",
          objective: "给左右轮设置不同的速度，让底盘左转、右转，并原地打转。",
          successCriteria: [
            "底盘靠改变轮速能左转和右转",
            "两轮反向转动时底盘能原地打转",
            "转弯过程中底盘没有翻倒",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "机器人是怎么动起来的",
          focus: "电机、车轴、轮子，用速度换扭矩的齿轮，以及摩擦力和抓地力。",
        },
        {
          title: "怎样才立得住",
          focus: "平衡、稳定性、质心、底盘设计和差速驱动。",
        },
        {
          title: "底盘虚拟考察",
          focus: "每次只改一样，并记录它对速度、抓地力和稳定性的影响。",
        },
        {
          title: "预测哪个底盘最稳",
          focus: "在翻倒测试之前，先猜猜哪个底盘立得最久。",
        },
        {
          title: "轮式底盘挑战",
          focus: "搭一个能走直线、能转向、又立得稳的底盘。",
        },
        {
          title: "速度与翻倒测试",
          focus: "记录每种配置的速度、直线性和翻倒角度。",
        },
        {
          title: "知识检测",
          focus: "关于行驶、扭矩、抓地力、稳定性和转向的五道题。",
        },
        {
          title: "反思",
          focus: "写一写齿轮、稳定性和差速驱动转向。",
        },
      ],
      safetyNotes: [
        {
          text: "让手指、头发和宽松的衣服远离转动的轮子和齿轮，换零件之前先把电机关掉。",
        },
        {
          text: "切割纸板和车轴孔时请使用儿童安全剪刀，并在大人陪同下进行，木签尖头要磨钝。",
        },
        {
          text: "在空旷处测试轮式底盘，远离桌边、楼梯和落差处。",
        },
        {
          text: "常常保存你的成果，免得刷新浏览器时把底盘和测试记录弄丢。",
        },
      ],
      printableResources: [
        {
          title: "底盘测试记录",
          description: "一张记录表，用来登记轮子、齿轮和底盘的改动，以及它们对速度、抓地力和稳定性的影响。",
        },
        {
          title: "速度与翻倒测试记录表",
          description: "两张表格，分别用于一米的速度与直线性测试和斜坡上的翻倒测试。",
        },
        {
          title: "轮式底盘绘图页",
          description: "留出空间，用来从侧面画出底盘，并标注电机、车轴、轮子和重量。",
        },
        {
          title: "第 2 周教师指南",
          description: "针对「搭一台能跑的机器人」这一课的课前准备、课堂组织、常见误解和提问建议。",
        },
      ],
      completion: {
        summary: "完成第 2 周：考察各种底盘方案，搭出一个能转向、立得稳的轮式底盘，记录速度与翻倒测试，并通过知识检测。",
        requirements: [
          {
            label: "完成底盘虚拟考察，并记录三种配置",
          },
          {
            label: "搭出一个能走直线、能转向、立得稳的轮式底盘",
          },
          {
            label: "记录速度与直线性测试和翻倒测试",
          },
          {
            label: "知识检测至少答对 5 题中的 4 题",
          },
          {
            label: "写下你的反思",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "把轮子、齿轮和底盘零件（套件路线），或者纸板、瓶盖、木签和胶带（不插电路线）摆出来并分门别类，方便学生快速更换。",
          "打印「底盘测试记录」和速度与翻倒测试记录表，每人或每组一份。",
          "在地板上划出一条一米长的测试跑道，并搭好斜坡或一摞书用于翻倒测试。",
          "如果用模拟器，在每台设备上先打开底盘实验室任务。",
        ],
        prep: [
          "自己先搭一个跑得动的轮式底盘，这样既能展示稳固的范例，也能识别常见的晃动问题。",
          "用一个高底盘和一个又低又宽的底盘各做一次翻倒测试，好预判学生会看到什么。",
          "备一些橡皮筋在手边，用来解决抓地力不足的轮子。",
        ],
        facilitation: [
          "动手搭建之前，先讲清楚电机-车轴-轮子这条链条，以及齿轮怎样用速度换扭矩。",
          "开展底盘虚拟考察，坚持要求学生每次只改一样，并逐条记录结果。",
          "让学生先预测哪个底盘最稳，再做翻倒测试来验证预测。",
          "接着进入轮式底盘的搭建，然后是速度与翻倒测试，最后以知识检测和反思收尾。",
        ],
        commonMisconceptions: [
          "「轮子越大机器人就越好」：大轮子跑得快，但起步要更大的扭矩，还可能把底盘抬高。",
          "「调低齿轮配比会让机器人又慢又弱」：它是变慢了，但更有劲；这是用速度换扭矩。",
          "「轮子在转就说明机器人在动」：在打滑的地板上，它可能只是在原地空转，根本没有抓地力。",
          "「机器人是用方向盘转向的」：差速驱动的机器人靠两轮转速不同来转向。",
          "「机器人越高越结实」：又低又宽、质心也低的底盘要难翻得多。",
        ],
        questionsToAsk: [
          "电机的转动要经过哪些地方才能传到地面？",
          "如果你想让这台机器人爬坡，需要的是更大的速度还是更大的扭矩？",
          "这个轮子为什么在打滑，抓不住地面？",
          "如果左轮慢下来，机器人会往哪边转？",
          "重量在哪里？你要怎么做才能让这个底盘更难被弄翻？",
        ],
        easierVersion: "给学生一个已经搭好的底盘，只让他们换轮子并做斜坡翻倒测试，不必从零开始搭底盘。",
        harderVersion: "让学生挑战：调好底盘的齿轮以取得最佳爬坡表现，并只用差速驱动的转弯走出一个方方正正的正方形。",
      },
      nextWeek: {
        teaser: "下周你的轮式底盘要装上大脑了：你会写下第一个程序，让机器人自己走完一条规划好的路线。",
        prepare: [
          "把你的轮式底盘留着别拆，保持能跑的状态，下周好给它编程。",
          "给你的套件充好电，或者把模拟器和它的积木编辑器加入收藏夹。",
          "想一想：如果不能在旁边看着，你会怎样把「从门口走到椅子那儿」的每一步准确地告诉别人。",
        ],
      },
    },
    {
      title: "把指令说明白",
      subtitle: "把一条路线变成清清楚楚的分步计划，再编程让机器人一步不差地照着走。",
      summary: "学生会明白：计算机是照字面、一丝不苟地执行指令的，机器人做的是你真正说出口的那件事，而不是你心里想的那件事。他们要写出算法，也就是一份清晰的分步计划，先用日常语言写成伪代码，再把它变成一段由移动指令排成直线的程序，其中包含时间、距离和转向。运行之前先预测机器人会停在哪里，然后运行并对照结果。这一周只讲顺序：还没有循环、条件和传感器，只有精确、有序的指令，用来带着机器人穿过送货路线或迷宫抵达终点。",
      mainMission: "规划一串精确的前进与转向指令，预测它会在哪里结束，再编程让机器人沿着路线走到终点。",
      estimatedTime: "60 至 75 分钟",
      learningGoals: [
        {
          text: "说明程序就是一串计算机按顺序、照字面、一丝不苟地执行的指令",
        },
        {
          text: "在写代码之前，先把算法写成伪代码，也就是用日常语言表达的清晰分步计划",
        },
        {
          text: "用距离、时间和转向指令，按正确的顺序控制机器人的路线",
        },
        {
          text: "在运行程序之前先预测机器人会停在哪里，然后验证这个预测",
        },
        {
          text: "只用一串指令，编程让机器人沿着送货路线或穿过迷宫抵达终点",
        },
      ],
      vocabulary: [
        {
          term: "程序",
          definition: "计算机为完成一件活儿而遵循的一份指令清单。这一周，程序就是一串移动指令。",
        },
        {
          term: "指令",
          definition: "机器人能执行的一条命令，比如「向前走」或者「向右转」。",
        },
        {
          term: "顺序",
          definition: "指令一条接一条、按次序从上往下执行。次序很要紧。",
        },
        {
          term: "算法",
          definition: "完成一项任务的清晰分步计划，既不漏步骤，也不含糊其辞。",
        },
        {
          term: "伪代码",
          definition: "在把计划变成真正的代码之前，先用日常语言把步骤写下来。",
        },
        {
          term: "事件",
          definition: "让程序开始运行的那一刻，比如按下「开始」或者触发「被点击时」积木块。",
        },
        {
          term: "时间",
          definition: "一条指令持续多久，以秒计量：这是控制机器人走多远的一种办法。",
        },
        {
          term: "距离",
          definition: "一条指令让机器人移动多远，通常用厘米或网格的格数来设定。",
        },
        {
          term: "转向",
          definition: "让机器人原地旋转的指令，通常按固定的度数来转，比如 90 度。",
        },
        {
          term: "速度",
          definition: "电机转得有多快。速度越快，同样的时间里走的距离就越远。",
        },
        {
          term: "预测",
          definition: "运行程序之前，你对机器人会停在哪里作出的最佳判断。",
        },
      ],
      prerequisites: [
        {
          reason: "你需要第 2 周搭好的轮式底盘，因为第 3 周的程序正是要让那个底盘动起来。",
        },
        {
          reason: "你要用到第 1 周的观念：程序就是控制器所遵循的那份指令。",
        },
      ],
      concepts: [
        {
          title: "计算机是照字面执行指令的",
          body: [
            "机器人做的正是你说的那件事，而不是你想说的那件事。如果你说「向前走」却忘了说走多远，机器人猜不出来；它要么做错，要么干脆不动。计算机又快又不知疲倦，可它们没有常识。",
            "这是本周最重要的一点。机器人出岔子的时候，它几乎总是在正确地执行你的指令，只不过你的指令并不是你真正想要的那样。",
          ],
          examples: [
            "「做个三明治」会失败，如果你没说「先把面包袋打开」",
            "只让机器人「转弯」却不说转多少，它就会转过头或者转不够",
            "「到门口去」对机器人来说毫无意义，它需要的是「前进 3 格，向左转」",
          ],
        },
        {
          title: "程序就是一串按顺序执行的指令",
          body: [
            "程序是一份指令清单，机器人从上往下一条接一条地执行。每条指令都是一个小小的命令，比如「向前走」或者「向右转」。按次序把它们执行下来，就叫顺序结构。",
            "次序很要紧。「先右转，再前进」和「先前进，再右转」会把机器人送到完全不同的地方，哪怕用的是同样几条指令。",
          ],
          examples: [
            "前进 2 格 -> 向右转 -> 前进 1 格",
            "把两条指令调换位置，机器人的落点就变了",
          ],
        },
        {
          title: "事件让程序跑起来",
          body: [
            "程序要等到有什么把它启动了才会跑。这个启动的时刻就叫事件：按下「开始」按钮、点一下「被点击时」积木块，或者在模拟器里点「运行」。",
            "这一周，每个程序最上面都有一个事件负责触发这串指令，接着指令就一路按次序跑到底。",
          ],
          examples: [
            "程序开头的「当按下开始时」",
            "在模拟器里点「运行」",
            "在套件的应用里点一下启动按钮",
          ],
        },
        {
          title: "算法和伪代码：先规划，再编程",
          body: [
            "算法是完成一项任务的清晰分步计划，每一步都交代清楚，不留任何含糊的地方。在动手写真正的代码之前，工程师会先用日常语言把计划写出来，这份日常语言的计划就叫伪代码。",
            "有了伪代码，你就能先把路线想清楚，暂时不用跟积木块较劲。你可以写「前进 3，向左转，前进 2，停」，确认它说得通，然后才把它搭成指令。",
          ],
          examples: [
            "伪代码：「前进 3 格，向左转 90 度，前进 2 格，停」",
            "算法里没有漏掉的步骤，也没有「你懂我意思」这种含糊地带",
          ],
        },
        {
          title: "用时间、速度和转向来控制距离",
          body: [
            "这一周你用三件工具来操控机器人：它走多远（距离）、这个动作持续多久（时间）、它转多少（转向）。在很多套件上，距离是由时间和速度一起决定的：速度更快、时间更长，走过的路就更多。",
            "转向让机器人原地旋转，通常按度数来算。转 90 度就是转四分之一圈，也就是一个直角，正好让机器人对准路线的下一段。转对角度，机器人才不会偏离航向。",
          ],
          examples: [
            "以速度 50 前进 2 秒",
            "向右转 90 度，正对着下一条走廊",
            "掉头 = 180 度，原路返回",
          ],
        },
        {
          title: "先预测，再运行",
          body: [
            "运行程序之前先作个预测：用手指顺着指令走一遍，标出你认为机器人会停在哪里、朝着哪个方向。先把猜测定下来，某一步错了就会一目了然。",
            "然后运行并对照。如果机器人停在了别处，这个差别正好告诉你该改哪条指令：也许某个转向写了 90 度、其实该是 180 度，或者某段前进少了一格。",
          ],
          examples: [
            "预测：「停在星星上，朝上」",
            "如果它提前一格就停了，说明某条距离指令给小了",
          ],
        },
      ],
      materials: [
        {
          name: "带起点、终点和网格方格的路线图或迷宫图（可打印）",
        },
        {
          name: "伪代码规划页（可打印）",
        },
        {
          name: "预测与验证记录页（可打印）",
        },
        {
          name: "铅笔和纸",
        },
        {
          name: "你在第 2 周搭好的轮式机器人底盘，以及配套的应用或软件",
        },
        {
          name: "美纹纸胶带，以及一件用来配送的小物件（一个瓶盖或一块积木）",
          note: "用胶带在地板上标出路线和终点。",
        },
        {
          name: "装有浏览器模拟器的电脑或平板",
        },
        {
          name: "箭头与指令卡（前进、后退、左转、右转、等待、停）",
        },
        {
          name: "用胶带在地板上贴出的网格，或者一张印好的网格，用来移动棋子",
        },
      ],
      activities: [
        {
          title: "送货路线编程挑战",
          goal: "只用一串精确的前进和转向指令，编程让机器人沿路线或穿过迷宫从起点走到终点。",
          shared: [
            "看着地图，找出起点、终点，以及沿途的墙和拐弯处。先用手指把路线描一遍。",
            "动手搭建之前，先用日常语言把计划写成伪代码：按顺序写下前进、转向和距离。保持一串直线式的顺序结构：这一周没有循环、没有条件判断、也没有传感器。",
            "把伪代码变成指令，运行一遍；如果机器人没到终点，就把出错的那一条指令改掉。",
          ],
          variants: {
            kit: {
              title: "用你的套件机器人跑一趟送货路线",
              instructions: [
                "用胶带在地板上贴出一条路线，设一个起点格、一个终点格，还有一两个拐弯。把那件小物件放在起点，当作要送的货。",
                "把路线描一遍，写出伪代码，例如「前进 40 厘米，向右转 90 度，前进 20 厘米，停」。",
                "量一量或者掐表测一次前进动作，弄清楚机器人能走多远，再把真实的距离或时间填进去。",
                "在应用里把这串指令搭好，按下开始（也就是那个事件），看着机器人沿路线走。",
                "如果它没到终点，就只改那条出错的指令（转向的度数或者前进的距离），然后再跑一次。",
              ],
              safetyNotes: [
                "机器人行驶时，让手指、头发和宽松的衣服远离轮子。",
                "把路线区域清空，别让机器人撞到人的脚或者桌腿。",
              ],
              expectedResult: "机器人照着这串指令从起点走到终点，带着货停在终点格上。",
              successCriteria: [
                "编程之前先写好了伪代码",
                "程序是一串直线式的前进与转向指令",
                "机器人到达终点并停在那里",
              ],
              troubleshooting: [
                {
                  problem: "机器人冲过了终点，或者没走到终点就停了",
                  fix: "调整那条前进指令的距离或时间；秒数上一点点变化就能让它挪出不小的一段。",
                },
                {
                  problem: "机器人转过头了，或者转得不够",
                  fix: "检查转向的度数（四分之一圈可以试试 90 度），再确认是左转还是右转。",
                },
              ],
              extension: "再加一次配送：把指令串延长，让机器人送完第一个终点格之后继续前往第二个。",
            },
            simulator: {
              title: "在网格上用积木块给迷宫编程",
              instructions: [
                "在模拟器里打开迷宫任务，找到起点格和终点格。",
                "沿着空着的格子把路线描一遍，用格数写出伪代码，比如「前进 3，向左转，前进 2，停」。",
                "把移动积木块拖到「当开始时」这个事件块下面，排成一串：只用前进和转向的积木块。",
                "运行程序，看机器人一条指令一条指令地走过网格。",
                "如果它撞了墙或者没到终点，就把出错的那一块改掉，再跑一次。",
              ],
              safetyNotes: [
                "没有安全隐患；眼睛累了就短暂地离开屏幕歇一会儿。",
              ],
              expectedResult: "模拟器里的机器人照着这串积木块穿过迷宫，落在终点格上。",
              successCriteria: [
                "搭积木块之前先写好了伪代码",
                "只用了顺序结构的积木块（没有循环、条件判断或传感器）",
                "机器人到达终点格",
              ],
              troubleshooting: [
                {
                  problem: "机器人一头撞进墙里",
                  fix: "把空着的格子重新数一遍；多半是某个前进块多走了一格。",
                },
                {
                  problem: "转完弯以后机器人朝错了方向",
                  fix: "把左转换成右转，或者检查转弯之前一共走了几格。",
                },
              ],
              extension: "把几段前进合并成更长的一步，用尽可能少的积木块重新走一遍迷宫。",
            },
            unplugged: {
              title: "写一份让同伴照字面执行的卡片程序",
              instructions: [
                "在地板上铺出网格，或者用印好的网格，标出起点和终点。一个人当「机器人」，另一个人当程序员。",
                "程序员把路线描一遍并写出伪代码，然后把箭头与指令卡按顺序摆好。",
                "「机器人」严格照字面执行这些卡片：一张前进卡走一格，一张转向卡转四分之一圈，每张卡说什么就做什么，多一点都不做。",
                "喊一声「开始」（这就是事件），然后从上往下执行卡片，中途不要帮机器人的忙。",
                "如果机器人没到终点，就找出那张出错的卡片换掉它，再跑一遍。",
              ],
              safetyNotes: [
                "在地板网格上要慢慢走，并把路上的椅子和书包挪开。",
              ],
              expectedResult: "「机器人」照着这串卡片走，落在终点格上，全程只做卡片上写的事。",
              successCriteria: [
                "摆卡片之前先写好了伪代码",
                "这份卡片程序是一串直线式的顺序",
                "照字面执行卡片就能走到终点",
              ],
              troubleshooting: [
                {
                  problem: "「机器人」半路上自己把步骤纠正了，算是作弊",
                  fix: "提醒他们要照字面执行卡片：这个活动就是要把指令里的错误找出来，而不是把它遮住。",
                },
                {
                  problem: "机器人最后朝错了方向",
                  fix: "有一张转向卡放错了边，或者漏掉了一张；检查一下左和右。",
                },
              ],
              extension: "和另一组交换卡片程序，在没看过对方地图的情况下把对方的程序跑一遍。",
            },
          },
        },
        {
          title: "先预测，再验证结果",
          goal: "在运行一串给定指令之前，先预测机器人会停在哪里、朝着哪个方向，然后运行并对照。",
          shared: [
            "拿一串简短的指令，在地图上用手描一遍。在纸上标出你认为机器人会在哪里结束、朝着哪个方向。",
            "运行任何东西之前，先把你的预测定下来：先写出来。",
            "运行程序，把真实结果和你的预测对照，并指出是哪条指令造成了差别。",
          ],
          variants: {
            kit: {
              title: "预测你的套件机器人会停在哪儿",
              instructions: [
                "拿一串 4 到 6 条的指令（你自己的或者别人给的），在贴好胶带的路线上描一遍。",
                "在记录页上，标出你预测机器人会停在哪一格、朝着哪个方向。",
                "运行这串指令，标出机器人实际停在了哪里。",
                "对照一下：如果有差别，指出是哪条指令（某个转向或某段距离）造成了这个差距。",
              ],
              safetyNotes: [
                "机器人跑预测测试的时候，请远离轮子。",
              ],
              expectedResult: "写下的预测就摆在实际停车点旁边，任何差别都附有原因。",
              successCriteria: [
                "预测是在运行之前写下的",
                "记录了真实的结束位置",
                "任何差别都用一条具体指令来解释",
              ],
              troubleshooting: [
                {
                  problem: "每次预测和结果都差得很远",
                  fix: "重新量一量一条前进指令到底让机器人走了多远；你对距离的估计有偏差。",
                },
              ],
              extension: "预测一串带三个转向的指令会在哪里结束。",
            },
            simulator: {
              title: "预测机器人的终点格",
              instructions: [
                "看一看模拟器里给定的那串积木块，先别运行。",
                "在记录页上写下你预测机器人会落在网格的哪一格、朝着哪个方向。",
                "运行程序，读出真实的终点格。",
                "对照一下，并指出是哪一块积木造成了差别。",
              ],
              safetyNotes: [
                "没有安全隐患。",
              ],
              expectedResult: "运行前写下的预测格，紧挨着真实的格子，任何差距都附有原因。",
              successCriteria: [
                "预测是在运行之前写下的",
                "记录了真实的终点格",
                "任何差别都对应到某一块具体的积木",
              ],
              troubleshooting: [
                {
                  problem: "描指令的时候跟丢了",
                  fix: "用手指一条一条地描，每走一步就把那一格标出来。",
                },
              ],
              extension: "预测机器人一共要走多少格，然后在运行时数一数。",
            },
            unplugged: {
              title: "预测卡片机器人会落在哪儿",
              instructions: [
                "程序员把一串卡片摆好，但先别执行。",
                "每个人都写下自己的预测：「机器人」会停在哪一格、朝着哪个方向。",
                "执行卡片，让「机器人」照字面一步步走出来。",
                "把大家的预测和真实结果对照，讨论是哪张卡片带来了意外。",
              ],
              safetyNotes: [
                "让地板网格保持通畅，好让扮演机器人的人能安全走动。",
              ],
              expectedResult: "写下的预测就摆在真实终点格旁边，任何差别都指明了是哪张卡片造成的。",
              successCriteria: [
                "预测是在照卡片走之前写下的",
                "记录了真实的结束位置",
                "差别对应到某一张具体的卡片",
              ],
              troubleshooting: [
                {
                  problem: "每个人预测的都不一样",
                  fix: "大家一起一张一张地描卡片：一起描一遍，就能看出预测是从哪儿开始分岔的。",
                },
              ],
              extension: "扣着藏起一张卡片，预测把它翻开加进去以后，结局会怎么变。",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "运行你的送货程序之前：你预测机器人会停在哪一格？它会朝着哪个方向？",
          howToCheck: "运行这串指令，标出它真正停下的格子和朝向，再和记录页上你的预测对照。",
        },
        {
          prompt: "你觉得你的程序要用多少条指令（多少步）才能到达终点？",
          howToCheck: "数一数你最终跑通的那串指令有几条，再和你的猜测对照。",
        },
      ],
      testRecords: [
        {
          title: "预测结果与实际结果记录",
          instructions: "每次尝试之前，先写下你预测的终点格，然后运行这串指令，记录机器人实际停在了哪里。再记下你为下一次尝试改了哪条指令。",
          columns: [
            "第几次尝试",
            "预测的终点格",
            "实际的终点格",
            "为下次改动的指令",
          ],
          measure: "历次尝试中预测的终点位置与实际终点位置的对比",
        },
      ],
      knowledgeCheck: {
        instructions: "回答这几题，检验一下你是否理解顺序、算法、伪代码，以及怎样控制机器人的路线。",
        questions: [
          {
            prompt: "把编程让机器人完成一项任务的这些步骤按正确顺序排好。",
            items: [
              {
                text: "把步骤规划成算法",
              },
              {
                text: "把步骤写成精确的指令",
              },
              {
                text: "在机器人上运行程序",
              },
              {
                text: "检查它有没有做到你预期的事",
              },
            ],
            explanation: "先规划算法，再把它变成精确的指令，接着运行，然后检查结果，这正是程序员们用的那个循环。",
          },
          {
            prompt: "机器人一开始朝上。把这个程序走一遍。最后它朝哪个方向？",
            program: [
              "向右转",
              "向右转",
              "向左转",
            ],
            options: [
              {
                text: "朝上",
                feedback: "两次右转加一次左转，净结果是一次右转，并没有回到起始方向。",
              },
              {
                text: "朝右",
                feedback: "对了：两次右转再一次左转，净结果是顺时针转了一次，所以朝右。",
              },
              {
                text: "朝下",
                feedback: "要朝下得净转两次右转；这个程序只净转了一次。",
              },
              {
                text: "朝左",
                feedback: "要朝左得净转一次左转；这里右转多出一次。",
              },
            ],
            explanation: "右、右、左相当于净转了一次右转。从朝上开始，右转一次就变成朝右。",
          },
          {
            prompt: "你的机器人把整个程序都跑完了，做出来的事却不对。最可能是怎么回事？",
            options: [
              {
                text: "机器人决定即兴发挥一下",
                feedback: "机器人不会即兴发挥，它们照字面执行程序。",
              },
              {
                text: "它完全照你的指令做了，只是你的指令并不是你想要的",
                feedback: "对了：计算机照字面执行指令，所以结果不对，通常意味着指令不对。",
              },
              {
                text: "机器人没理会那个程序",
                feedback: "它确实跑了程序；错的是程序本身。",
              },
              {
                text: "程序本来就故意第一次都跑不通",
                feedback: "程序完全可能一次就跑通；跑不通的时候，那是一个能改好的指令问题。",
              },
            ],
            explanation: "计算机照字面、一丝不苟地执行指令。结果不对，几乎总是因为指令说的不是你的本意。",
          },
          {
            prompt: "什么是顺序结构？",
            options: [
              {
                text: "一条接一条、按次序执行的指令",
                feedback: "正确：顺序结构从上往下执行指令，而且次序很要紧。",
              },
              {
                text: "一条会永远重复下去的指令",
                feedback: "那是循环，课程后面才会讲到。",
              },
              {
                text: "一条根据传感器来作判断的指令",
                feedback: "那是条件判断；这一周既没有传感器，也没有条件。",
              },
              {
                text: "所有指令完全同时执行",
                feedback: "在顺序结构里，指令是一条一条按次序执行的，不是一起执行的。",
              },
            ],
            explanation: "顺序结构就是一条接一条、按次序执行的指令：把两条指令调换位置，整个结果都可能变样。",
          },
          {
            prompt: "什么是伪代码？",
            options: [
              {
                text: "只有计算机才看得懂的密码",
                feedback: "恰恰相反：伪代码本来就是写给人看、方便人读的。",
              },
              {
                text: "在动手编程之前，用日常语言写下的程序计划",
                feedback: "对了：伪代码用日常语言写下步骤，好让你在动手搭建之前先做好规划。",
              },
              {
                text: "一个满是错误、跑不动的程序",
                feedback: "伪代码是一种规划工具，不是坏掉的程序。",
              },
              {
                text: "让程序开始运行的那个事件",
                feedback: "那是事件；伪代码是写下来的步骤计划。",
              },
            ],
            explanation: "伪代码就是先用日常语言把算法的步骤写下来，好让你在把它变成真正的指令之前先把路线规划清楚。",
          },
          {
            prompt: "你的机器人停到了正确的位置，方向却不对。你该检查哪条指令？",
            options: [
              {
                text: "某条前进距离的指令",
                feedback: "距离影响的是它停在哪里，不是它朝哪个方向。",
              },
              {
                text: "开始事件",
                feedback: "事件只负责启动程序，它不决定方向。",
              },
              {
                text: "某条转向指令：度数或者方向",
                feedback: "正确：转向决定机器人朝哪个方向，所以要检查转的度数，或者到底是左还是右。",
              },
              {
                text: "停止指令",
                feedback: "停止只是结束运行，它不会让机器人旋转。",
              },
            ],
            explanation: "转向决定机器人的朝向。结束时朝错方向，说明某条转向指令的度数或方向写错了。",
          },
          {
            prompt: "在按时间来控制的套件上，你怎样才能让机器人在一条前进指令里走得更远？",
            options: [
              {
                text: "让电机运转更长时间（或者用更高的速度）",
                feedback: "对了：时间更久，或者速度更快，走的距离就更远。",
              },
              {
                text: "加一条转向指令",
                feedback: "转向只是让机器人旋转，并不会增加前进的距离。",
              },
              {
                text: "改一下开始事件",
                feedback: "事件只负责启动程序，它不决定距离。",
              },
              {
                text: "把这条指令换个颜色写",
                feedback: "颜色对机器人怎么走毫无影响。",
              },
            ],
            explanation: "距离来自时间和速度：跑得久一点或者快一点，一条前进指令就能让机器人走得更远。",
          },
        ],
      },
      reflection: [
        {
          prompt: "哪条指令造成的误差最大？你是怎么把它改得更精确的？",
        },
        {
          prompt: "在动手搭真正的指令之前先写伪代码，对你有什么帮助？",
        },
        {
          prompt: "当你的预测和机器人的实际表现对不上时，你是怎么找出该改哪条指令的？",
        },
      ],
      journalPrompts: [
        {
          prompt: "用日常语言写出你送货路线的伪代码，一行一步。",
        },
        {
          prompt: "画出你的路线图，并在运行之前标出你预测它会停下的格子。",
        },
        {
          prompt: "你最终跑通的程序用了多少条指令？",
        },
      ],
      savedPrograms: [
        {
          title: "送货路线指令串",
          description: "一串直线式的前进与转向指令，把机器人从起点带到终点格。只用顺序结构：没有循环、条件和传感器。",
        },
        {
          title: "迷宫顺序挑战",
          description: "规划一串有序的前进与转向指令，带着机器人绕过那面墙到达终点，然后停下。运行之前先预测结果。只用顺序结构：没有循环、条件和传感器。",
        },
      ],
      simulatorMissions: [
        {
          title: "把货送到终点格",
          objective: "编写一串前进与转向积木块，把机器人从起点格带到终点格。",
          successCriteria: [
            "机器人到达终点格",
            "只用了顺序结构的积木块（没有循环、条件判断或传感器）",
            "机器人停在终点上",
          ],
        },
        {
          title: "用顺序结构穿越迷宫",
          objective: "只用一串有序的移动指令，带着机器人穿过布满墙壁的迷宫到达终点。",
          successCriteria: [
            "机器人避开了每一面墙",
            "机器人到达终点格",
            "程序是一串直线式的顺序",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "精确的指令、顺序结构和事件",
          focus: "计算机照字面执行指令；程序是一串由事件触发、按次序执行的指令。",
        },
        {
          title: "算法、伪代码与路线控制",
          focus: "把算法规划成伪代码；用时间、速度和转向来控制距离。",
        },
        {
          title: "送货与迷宫编程挑战",
          focus: "先规划伪代码，再编写一串指令抵达终点：先走送货路线，再绕过一面墙走迷宫。",
        },
        {
          title: "先预测，再验证结果",
          focus: "运行之前先预测停下的格子和朝向，然后对照。",
        },
        {
          title: "记录预测与实际",
          focus: "把历次尝试的预测与实际结果填进记录表。",
        },
        {
          title: "知识检测",
          focus: "关于顺序、算法、伪代码和转向的五道题。",
        },
        {
          title: "反思",
          focus: "写一写照字面执行的指令、伪代码，以及怎样找出出错的那条指令。",
        },
      ],
      safetyNotes: [
        {
          text: "机器人运行程序时，让手指、头发和宽松的衣服远离轮子。",
        },
        {
          text: "运行之前，把地板路线上的脚、书包和椅子腿清开，给机器人留一条安全的路。",
        },
        {
          text: "扮演机器人在地板网格上走动时要放慢脚步，免得有人绊倒。",
        },
        {
          text: "使用模拟器时如果眼睛累了，就短暂地离开屏幕休息一下。",
        },
      ],
      printableResources: [
        {
          title: "路线与迷宫图",
          description: "一张带网格的地图，标有起点、终点和墙壁，用来规划送货路线。",
        },
        {
          title: "伪代码规划页",
          description: "带横线的空白页，用来在编程之前把算法写成日常语言的步骤。",
        },
        {
          title: "预测与验证记录表",
          description: "一张表格，用来记录历次尝试中预测的终点格和实际的终点格。",
        },
        {
          title: "第 3 周教师指南",
          description: "针对「精确指令」这一课的课前准备、课堂组织、常见误解和提问建议。",
        },
      ],
      completion: {
        summary: "完成第 3 周：为一条路线写出伪代码，编出一串能抵达终点的指令，预测并记录一次结果，并通过知识检测。",
        requirements: [
          {
            label: "在编程之前为你的送货路线写好伪代码",
          },
          {
            label: "编出一串能抵达终点的指令",
          },
          {
            label: "预测一次结果，并记录预测与实际",
          },
          {
            label: "知识检测至少答对 5 题中的 4 题",
          },
          {
            label: "写下你的反思",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "为每位学生或每组打印路线与迷宫图、伪代码规划页，以及预测与验证记录表。",
          "走套件路线的，用胶带在地板上贴一条带一两个拐弯的简单路线，并准备一件用来配送的小物件；走模拟器路线的，在每台设备上打开送货任务。",
          "走不插电路线的，用胶带在地板上铺出网格，或者发下印好的网格以及箭头与指令卡。",
        ],
        prep: [
          "自己先跑一条路线，摸清楚一条前进指令大概能让套件机器人走多远、一次 90 度转向又会转多少。",
          "准备一段故意写错的短指令串拿来运行，让学生亲眼看到机器人照字面执行错误指令的样子。",
          "把第 2 周的轮式底盘充好电、准备就绪。",
        ],
        facilitation: [
          "开场就抛出「照字面执行」这个观念：故意给一条含糊的指令，让一名学生一字不差地照做，看看会出什么岔子。",
          "在动手编程之前先讲顺序、事件、算法和伪代码；坚持要求先写伪代码，再写指令。",
          "先做送货挑战，再做「先预测、再验证」活动，始终坚持运行前先预测。",
          "让学生记录预测与实际，最后以知识检测和反思收尾。",
        ],
        commonMisconceptions: [
          "「机器人做的是我想说的那件事」：它做的是你说出口的那件事，一字不差，而不是你心里想的。",
          "以为次序无所谓：把一个转向和一个前进调换位置，机器人会跑到完全不同的地方。",
          "以为「转」和「走」是同一类指令：转向改变的是朝向，前进改变的是位置。",
          "跳过伪代码规划，直接靠试错去拼积木块。",
        ],
        questionsToAsk: [
          "这一步你到底让机器人做了什么？",
          "你预测它会停在哪里？朝着哪个方向？",
          "机器人没到终点：单单哪一条指令能解释这件事？",
          "如果把其中两条指令调换位置，你的程序还跑得通吗？",
        ],
        easierVersion: "用一条只有一个拐弯的短直路线，并给学生一份伪代码模板去填空，而不是从零开始写。",
        harderVersion: "加一个更长、拐弯更多的迷宫，让学生挑战用最少的指令抵达终点。",
      },
      nextWeek: {
        teaser: "下周机器人要长出感官了：我们会给它加一个传感器，让它能察觉周围的世界，而不是只会跑一串固定的指令。",
        prepare: [
          "把你最好的那份送货伪代码留着；你要拿固定指令串和一台会作出反应的机器人作比较。",
          "给你的套件充好电，或者把模拟器加入收藏夹；走套件路线的，把传感器零件找出来。",
          "回想一次：有没有哪回因为路上有什么变了，一套固定的步骤就失灵了？",
        ],
      },
    },
    {
      title: "让机器人学会感知",
      subtitle: "读取真实的传感器数值，找出阈值，并给机器人做校准，好让它感知到的东西靠得住。",
      summary: "机器人已经会走、也会照指令做事了，这一周学生要给它装上感官。他们会认识触碰、距离、光线和颜色四种传感器，并明白传感器读数是一个机器人能测出来的数字。他们会发现：阈值是一个分界点，能把数字变成「近还是远」「亮还是暗」；每个传感器都有探测极限；读数还会来回小幅跳动（噪声），所以要多测几次，并针对这个房间、这台机器人做校准。读数和校准之后，他们要编写一个由传感器触发的停车程序：机器人一边前进一边用距离传感器在墙前刹住，这样阈值终于控制了一个真实的动作。至于用循环和条件贯穿整个任务的完整自动行为，下周才登场。",
      mainMission: "在不断变化的条件下读取传感器，找出一个阈值，并把它校准到在这个房间里读数可靠为止。",
      estimatedTime: "70 至 85 分钟",
      learningGoals: [
        {
          text: "说出触碰、距离、光线和颜色传感器的名称，以及它们各自测量什么",
        },
        {
          text: "读出传感器数值，并说明读数是一个数字，而不是「是」或「否」",
        },
        {
          text: "找出一个能把近和远、或者亮和暗分开的阈值",
        },
        {
          text: "说明什么是探测极限和噪声，以及为什么要多测几次",
        },
        {
          text: "校准传感器，让它的读数在这个房间、这台机器人上都靠得住",
        },
      ],
      vocabulary: [
        {
          term: "触碰传感器",
          definition: "一种能判断自己有没有被按下的传感器，就像按钮或者保险杠。",
        },
        {
          term: "距离传感器",
          definition: "一种测量最近的物体有多远的传感器，通常以厘米为单位。",
        },
        {
          term: "光线传感器",
          definition: "一种测量环境有多亮或多暗的传感器，光越亮，给出的数字越大。",
        },
        {
          term: "颜色传感器",
          definition: "一种读取正前方表面颜色的传感器，比如红色、蓝色或白色。",
        },
        {
          term: "传感器读数",
          definition: "传感器在某一刻给出的数字，比如 20 厘米，或者亮度 47。",
        },
        {
          term: "阈值",
          definition: "你自己挑的一个分界数字，用来区分两种情况，比如「比 15 厘米还近就算近」。",
        },
        {
          term: "探测极限",
          definition: "超过这一点传感器就感知不到了，比如距离传感器读不出大约 2 米以外的东西。",
        },
        {
          term: "校准",
          definition: "调整或核对传感器，让它的读数在这个房间、这台机器人上是准确的。",
        },
        {
          term: "噪声",
          definition: "什么都没变，读数却还是会小幅跳动，正因如此才要多测几次。",
        },
        {
          term: "可靠性",
          definition: "你能有多信得过一个传感器每次都给出同样、正确的读数。",
        },
        {
          term: "一次测量",
          definition: "一场测试里的单独一次测量；通常要做好几次，然后互相比较。",
        },
        {
          term: "基准读数",
          definition: "在一个已知、稳定的条件下先测出来的读数，用来和其他读数作比较。",
        },
      ],
      prerequisites: [
        {
          reason: "传感器要装在第 2 周搭好的移动底盘上，这样才能把机器人放到不同位置去测试。",
        },
        {
          reason: "读取并报告一个传感器数值，本身就是一串规划好的精确指令，这是第 3 周教过的。",
        },
      ],
      concepts: [
        {
          title: "机器人可以拥有的四种感官",
          body: [
            "机器人靠传感器感知世界。常见的有四种：触碰传感器（有没有被按下？）、距离传感器（最近的东西有多远？）、光线传感器（有多亮？）和颜色传感器（这个表面是什么颜色？）。",
            "每种传感器只测一样东西。距离传感器分不出颜色，颜色传感器也测不出距离。为一件活儿挑对传感器，本身就是机器人学的一部分。",
          ],
          examples: [
            "触碰：门铃按钮",
            "距离：汽车倒车时的提示音",
            "光线：在暗处会自动变暗的手机屏幕",
            "颜色：按颜色分拣回收物的机器",
          ],
        },
        {
          title: "读数是一个数字，不是「是」或「否」",
          body: [
            "大多数传感器不会只说「是」或「否」，它们给出的是一个数字，叫作传感器读数。距离传感器可能读出 12 厘米；光线传感器可能读出亮度 47。",
            "既然是数字，读数就会随着外界的变化平滑地变化。你把墙挪近一些，距离的数字就变小；房间变亮一些，光线的数字就变大。",
          ],
          examples: [
            "距离传感器：12 厘米、30 厘米、85 厘米",
            "光线传感器：从 10（暗）到 90（很亮）",
            "触碰传感器是个例外：它通常只读出按下或没按下",
          ],
        },
        {
          title: "阈值把数字变成判断",
          body: [
            "阈值是你自己挑的一个分界数字，用来区分两种情况。如果你挑 15 厘米，那么小于 15 的读数就算「近」，大于 15 的就算「远」。",
            "机器人没法替你挑阈值：你得观察那些读数，挑一个能把你关心的两种情况干净利落分开的数值。这一周你只负责找出并记下阈值；下一周机器人才会拿它们来作出反应。",
          ],
          examples: [
            "近与远的分界定在 15 厘米",
            "亮与暗的分界定在亮度 40",
            "循线机器人在黑线和白地板之间的分界",
          ],
        },
        {
          title: "探测极限：每个传感器都有量程",
          body: [
            "没有哪个传感器什么都能感知。距离传感器超过一定量程就不管用了：它也许在 2 米以内读得挺准，再远就是一堆废数。它还能感知到的那个最远的点，就是它的探测极限。",
            "传感器还有个「最近」的极限：把墙贴得离距离传感器太近，读数也会变得古怪。摸清这些极限，你就知道哪里可以信它，哪里不能。",
          ],
          examples: [
            "读不出大约 2 米以外的距离传感器",
            "需要表面贴得很近、几乎挨着的颜色传感器",
            "被一扇特别亮的窗户搞糊涂的光线传感器",
          ],
        },
        {
          title: "噪声：为什么只测一次不够",
          body: [
            "把距离传感器对准一堵不动的墙，连着读几次。你可能会得到 30、31、30、29、31：明明什么都没变，数字却在小幅跳动。这种跳动就叫噪声。",
            "有了噪声，只测一次就可能被骗。做科学和做机器人的人都会多测几次，取中间值或平均值，这比单独一个数字可靠得多。",
          ],
          examples: [
            "对着不动的墙测出 30、31、30、29、31",
            "云飘过时忽高忽低的光线传感器",
            "测 3 到 5 次，再互相比较",
          ],
        },
        {
          title: "校准与可靠性",
          body: [
            "校准的意思是核对或调整传感器，让它的读数在这个房间、这台机器人上是准确的。光线传感器在阳光充足的房间和在昏暗的房间读数不一样，所以同一个阈值不可能到处都好使：你得针对身处的这个房间去校准。",
            "校准并测试过的传感器才可靠：你可以信得过它每次都给出同样、正确的答案。可靠性正是关键所在，因为一台感知有误的机器人，做出来的动作也会有误。",
          ],
          examples: [
            "分别测一个「暗」读数和一个「亮」读数，把中点定为阈值",
            "换了房间之后，重新核对距离阈值",
            "确认颜色传感器在你真正用的那些表面上分得清红和蓝",
          ],
        },
      ],
      materials: [
        {
          name: "「传感器读数记录」活动纸（可打印）",
        },
        {
          name: "卷尺或直尺，用来量出已知的距离",
        },
        {
          name: "记录读数用的铅笔和纸",
        },
        {
          name: "一台带触碰、距离、光线或颜色传感器的可编程机器人",
        },
        {
          name: "一堵墙、一本书或一个盒子，放在量好的距离上",
        },
        {
          name: "一支手电筒和一些彩色卡片，用于光线和颜色测试",
        },
        {
          name: "装有浏览器模拟器的电脑或平板",
        },
        {
          name: "做人体传感器活动用的眼罩或围巾",
        },
        {
          name: "深浅不同的卡片（或灰度色条），用来分类",
        },
      ],
      activities: [
        {
          title: "传感器考察实验",
          goal: "测量条件变化时传感器读数如何随之变化，并找出一个能干净利落分开两种情况的阈值。",
          shared: [
            "挑一个条件一步一步地改（到墙的距离、亮度，或者表面的颜色），每改一步就读一次传感器。",
            "把每个读数都记在记录表上。然后看着这些数字挑一个阈值：一个能把「近和远」或者「亮和暗」分开的分界值。",
            "记住：这一周机器人只负责读数和报告。这些数字是什么意思，由你来判断。",
          ],
          variants: {
            kit: {
              title: "在量好的条件下读真实传感器",
              materials: [
                "一台带传感器的可编程机器人",
                "卷尺或直尺",
                "一堵墙或一个盒子",
                "「传感器读数记录」活动纸",
              ],
              instructions: [
                "装上传感器，载入一个能读取传感器并把数值显示或报告出来的短程序（读传感器、等待、停止）。",
                "如果是距离传感器：把墙分别放在 10 厘米、20 厘米、40 厘米和 80 厘米处，逐一记录读数。如果是光线传感器：分别在强光下、在房间正常光线下、以及用手遮住时读一次数值。",
                "看看你的这些数字，挑一个阈值：比如在哪个距离以内你会说东西「近」，或者亮度低到多少你会说「暗」。",
                "把你的阈值写在记录表上，再写一句话说明你为什么挑这个数字。",
              ],
              safetyNotes: [
                "让机器人待在桌上或地上，免得你看显示屏时它掉下去。",
              ],
              expectedResult: "一张读数表，随着墙越来越近，数字明显变小（或者随着变亮，数字明显变大），并挑出了一个能分开近和远的阈值。",
              successCriteria: [
                "在不同条件下至少记录了四个读数",
                "读数变化的方向说得通",
                "挑出了一个阈值数值，并用一句话说明了理由",
              ],
              troubleshooting: [
                {
                  problem: "读数上蹿下跳，就是稳不下来",
                  fix: "那就是噪声：每个距离上测三次，取中间那个值。",
                },
                {
                  problem: "不管怎么弄，距离读数都卡在一个很大的数字上",
                  fix: "你可能已经超出了传感器的探测极限，或者对着空处；把它正对着一米以内的一堵平整的墙。",
                },
              ],
              extension: "换到另一个房间，把你的那些条件重新测一遍，看看你的阈值还管不管用、要不要重新校准。",
            },
            simulator: {
              title: "在条件变化时读取模拟器的传感器",
              materials: [
                "浏览器模拟器",
                "「传感器读数记录」活动纸",
              ],
              instructions: [
                "打开模拟器，开动机器人，让一堵墙（或者一块彩色、明亮的格子）处在不同的距离或亮度上。",
                "在每种设定下读取屏幕上的传感器数值（读传感器、等待、停止），把数字记在记录表上。",
                "研究这些数字，挑一个能分开近和远、或者亮和暗的阈值。",
                "写下这个阈值，再写一句话说明你为什么这么挑。",
              ],
              safetyNotes: [
                "没有安全隐患；眼睛累了就离开屏幕歇一会儿。",
              ],
              expectedResult: "一张记录表，其中模拟器的传感器数值随着条件平滑地变化，并挑出了一个合情合理的阈值。",
              successCriteria: [
                "在不同条件下至少记录了四个读数",
                "读数变化的方向说得通",
                "挑出了一个阈值数值，并用一句话说明了理由",
              ],
              troubleshooting: [
                {
                  problem: "机器人明明没动，模拟器的读数每次却都差一点点",
                  fix: "那是特意模拟出来的噪声：多读几次，取中间那个值。",
                },
                {
                  problem: "不知道屏幕上哪个数字才是传感器的",
                  fix: "找那个在你把墙挪近时会变的数值：那就是距离。",
                },
              ],
              extension: "把模拟噪声调大（或者再加一堵墙），看看你的阈值还分不分得开这两种情况。",
            },
            unplugged: {
              title: "当一回人体传感器，产出读数",
              materials: [
                "眼罩或围巾",
                "深色和浅色卡片",
                "「传感器读数记录」活动纸",
              ],
              instructions: [
                "做触碰或距离测试：一名学生蒙上眼睛慢慢伸出手，同伴举一张卡片当作「墙」。同伴一步步把墙挪近，蒙眼的「传感器」就报出一个 1 到 5 的数字，1 表示很远、完全感觉不到，5 表示已经碰到了。",
                "做光线测试：把一摞卡片从最深到最浅排好，给每张打一个 1 到 5 的亮度分，1 最深、5 最浅。",
                "把每一个「读数」都记在记录表上，就像真的传感器报出一个数字那样。",
                "挑一个阈值：多少分及以上才算「近」或者「亮」？把它连同理由一起写下来。",
              ],
              safetyNotes: [
                "把地面清空，并引导蒙眼的同学，免得有人绊倒或撞到东西。",
              ],
              expectedResult: "一份人体「传感器读数」记录：墙越近、或卡片越浅，数字就越大，并挑出了一个阈值。",
              successCriteria: [
                "在不同条件下至少记录了四个读数",
                "读数变化的方向说得通",
                "挑出了一个阈值数值，并用一句话说明了理由",
              ],
              troubleshooting: [
                {
                  problem: "同一张卡片，两名学生给的数字不一样",
                  fix: "这就好比传感器之间的噪声：先商定一套共同的评分标准，再重新读一遍，这也是一种校准。",
                },
                {
                  problem: "什么都得同一个数字",
                  fix: "把条件拉得更开（墙近得多、卡片深得多），读数的差别自然就明显了。",
                },
              ],
              extension: "换个人来当「传感器」，看看给出的读数是否一样，并讨论校准为什么重要。",
            },
          },
        },
        {
          title: "校准与阈值挑战",
          goal: "靠多测几次来对付噪声，然后校准出一个在这个房间里可靠好用的亮暗（或远近）阈值。",
          shared: [
            "挑一个稳定的条件，什么都别动，对着同一样东西连读几次；留意数字跳动了多少。这个跳动就是噪声。",
            "在一个明显「低」的条件和一个明显「高」的条件下各测一次（暗对亮，或者近对远）。把阈值定在中间，好把两者干净利落地分开。",
            "检验你的阈值：确认低条件的读数都落在一边、高条件的读数都落在另一边。如果不是，就调一调，这就是校准。",
          ],
          variants: {
            kit: {
              title: "在真实传感器上校准阈值",
              materials: [
                "一台带光线或距离传感器的可编程机器人",
                "彩色或深浅不同的卡片，或者一堵墙",
                "「传感器读数记录」活动纸",
              ],
              instructions: [
                "对着同一个不动的目标读五次，把五个数字都记下来，好看清噪声。",
                "对着一个明显「暗」的表面（或一堵远墙）读三次，再对着一个明显「亮」的表面（或一堵近墙）读三次。",
                "把阈值定在暗平均值和亮平均值正中间。",
                "检验一下：给传感器看几个深色和浅色的表面，确认每个都落在阈值的正确一侧。要是有落错边的，就调一调。",
              ],
              safetyNotes: [
                "移动机器人去测试各种表面时，让线缆远离轮子。",
              ],
              expectedResult: "一个校准好的阈值，能在这个房间里经过多次检验，正确地把深色和浅色（或近和远）的表面分开。",
              successCriteria: [
                "记录了五个噪声读数",
                "记录了暗平均值和亮平均值",
                "在两者之间定下了一个阈值",
                "测试表面分类正确，或者把阈值调到分类正确为止",
              ],
              troubleshooting: [
                {
                  problem: "某个表面有时会落错边",
                  fix: "可能两个条件靠得太近，也可能噪声太大；挪一挪阈值，或者换对比更强烈的表面。",
                },
                {
                  problem: "整批读数比先前整体偏移了",
                  fix: "房间的光线变了：现在就重新校准，这正是校准重要的原因。",
                },
              ],
              extension: "把机器人搬到更明亮或更昏暗的地方，为那个房间校准一个新的阈值。",
            },
            simulator: {
              title: "在模拟器里校准阈值",
              materials: [
                "带可调亮度或噪声的浏览器模拟器",
                "「传感器读数记录」活动纸",
              ],
              instructions: [
                "在一块不动的格子上读五次模拟器传感器，看清模拟出来的噪声，并把数字记下来。",
                "在深色格子上读三次，在浅色格子上读三次；各自算出平均值。",
                "把阈值定在两个平均值之间。",
                "开过深浅混杂的一片格子，逐格读数，确认它们都被分对了。要是有落错边的，就调一调阈值。",
              ],
              safetyNotes: [
                "没有安全隐患；边做边保存你的记录。",
              ],
              expectedResult: "一个阈值，能在模拟器里经过多次检验，正确地把深色和浅色格子分开。",
              successCriteria: [
                "记录了五个噪声读数",
                "记录了暗平均值和亮平均值",
                "在两者之间定下了一个阈值",
                "测试格子分类正确，或者把阈值调到分类正确为止",
              ],
              troubleshooting: [
                {
                  problem: "阈值已经定在中间了，格子还是老分错",
                  fix: "把格子之间的对比调强，或者把模拟噪声调小，然后重新校准。",
                },
                {
                  problem: "平均值不好算",
                  fix: "把三个读数加起来再除以三，或者干脆用这三个里中间的那一个。",
                },
              ],
              extension: "把模拟噪声调大，看看两种条件要拉开多远，阈值才依然可靠。",
            },
            unplugged: {
              title: "校准一个人体亮暗分拣器",
              materials: [
                "一套灰度卡片，或者深浅两类卡片",
                "眼罩（可选）",
                "「传感器读数记录」活动纸",
              ],
              instructions: [
                "让一名学生对同一张卡片打五次分，中途不许看自己先前的答案；留意那些细微的差别（噪声）。",
                "对一张明显深色的卡片打三次分，对一张明显浅色的卡片也打三次分，各自算平均值。",
                "在暗平均值和亮平均值之间挑一个阈值数字：达到或超过它就是「亮」，低于它就是「暗」。",
                "把卡片打乱，只按阈值来分类，然后用眼睛核对一遍。要是有哪张分错了，就调一调阈值。",
              ],
              safetyNotes: [
                "没有危险；把桌面收拾干净就行。",
              ],
              expectedResult: "一个阈值数字，能让人体「传感器」把一摞打乱的卡片正确地分成亮的和暗的两堆。",
              successCriteria: [
                "记录了五个噪声读数",
                "记录了暗平均值和亮平均值",
                "在两者之间定下了一个阈值",
                "打乱的卡片分类正确，或者把阈值调到分类正确为止",
              ],
              troubleshooting: [
                {
                  problem: "两个人定出了不同的阈值",
                  fix: "这正是校准重要的原因：全组商定一套共同的评分标准和一个共同的阈值。",
                },
                {
                  problem: "中间那几张卡片很难分",
                  fix: "中间的数值本来就贴着阈值；这很正常，把它们记下来当作最难的例子。",
                },
              ],
              extension: "再加几张不好判断的中灰卡片，讨论一下：为什么传感器恰恰在阈值附近最容易犯难。",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "测量之前先想想：墙在 20 厘米处时距离传感器读出 20 厘米，那你预测把墙挪到 40 厘米时它会读出什么？是更大还是更小的数字，大概是多少？",
          howToCheck: "把墙放到 40 厘米处，读三次传感器，把中间那个读数和你的预测对照。",
        },
        {
          prompt: "预测一下：对着同一堵不动的墙连读五次，每次会得到一模一样的数字吗？",
          howToCheck: "什么都别动，连读五次，看看它们是完全一致，还是会小幅跳动（噪声）。",
        },
      ],
      testRecords: [
        {
          title: "距离与读数对照表",
          instructions: "把墙（或者把条件）设到表上列出的每个距离，读取传感器并记下数字。要是数字在跳，就读三次取中间那个。",
          columns: [
            "设定距离（厘米）",
            "传感器读数",
            "算近还是算远？",
          ],
          measure: "每个设定距离下的传感器读数，以及你会把它算作近还是远",
        },
        {
          title: "三次测量的噪声检查",
          instructions: "挑一个条件，之后不要再改动它。连着读三次传感器，把每次读数都记下来，看看它跳动了多少。",
          columns: [
            "第几次测量",
            "传感器读数",
            "与第 1 次的差值",
          ],
          measure: "什么都没变的情况下，几次测量之间读数变化了多少（也就是噪声）",
        },
      ],
      knowledgeCheck: {
        instructions: "回答这几题，检验一下你是否理解传感器读数、阈值、噪声和校准。",
        questions: [
          {
            prompt: "把每种传感器和它测量的东西连起来。",
            pairs: [
              {
                left: "距离传感器",
                right: "某样东西有多远",
              },
              {
                left: "光线传感器",
                right: "环境有多亮",
              },
              {
                left: "触碰传感器",
                right: "有没有东西被按下",
              },
              {
                left: "颜色传感器",
                right: "一个表面是什么颜色",
              },
            ],
            explanation: "每种传感器只测一样东西：距离、光线强弱、触碰，或者颜色。",
          },
          {
            prompt: "用你自己的话说说，什么是传感器阈值？",
            sampleAnswer: "阈值就是一个分界数字。读数落在它的一边，机器人就作一种判断；落在另一边，就作另一种判断，比如「比 15 厘米还近就说明有墙靠近了」。",
            keywords: [
              "分界",
              "数值",
              "数字",
              "判断",
              "近",
              "远",
              "界线",
            ],
            explanation: "阈值是一个分界数值，它把传感器给出的数字变成一个「是或否」的判断。",
          },
          {
            prompt: "什么是传感器读数？",
            options: [
              {
                text: "传感器在某一刻给出的数字",
                feedback: "对了：读数就是测出来的一个数字，比如 20 厘米，或者亮度 47。",
              },
              {
                text: "传感器的名字",
                feedback: "名字告诉你它属于哪一类；读数才是它测出来的那个数字。",
              },
              {
                text: "机器人的颜色",
                feedback: "机器人是什么颜色，和传感器测什么毫无关系。",
              },
              {
                text: "一条让机器人动起来的指令",
                feedback: "那是给执行器的指令；读数是一种输入，不是动作。",
              },
            ],
            explanation: "传感器读数就是传感器在某一刻报出的数字，它会随着外界的变化平滑地变化。",
          },
          {
            prompt: "距离传感器对着一堵墙读出 30 厘米，对着一堵更近的墙读出 12 厘米。这说明读数是怎么回事？",
            options: [
              {
                text: "东西越近，读数越大",
                feedback: "刚好相反：越近的东西，距离的数字越小。",
              },
              {
                text: "东西越近，读数越小",
                feedback: "正确：物体离得越近，厘米数就越少，读数也就越小。",
              },
              {
                text: "读数是随机的，没什么意义",
                feedback: "它是随着距离朝一个明确、合理的方向变化的。",
              },
              {
                text: "传感器坏了",
                feedback: "一个正常工作的距离传感器就是这么表现的。",
              },
            ],
            explanation: "距离传感器的读数会随着物体靠近而变小，正因如此，你才能把它变成一个「近还是远」的判断。",
          },
          {
            prompt: "你想让机器人把 15 厘米以内的一切都当作「近」。这个数字 15 叫什么？",
            options: [
              {
                text: "探测极限",
                feedback: "探测极限是传感器最远能感知到多远，不是你挑的那个分界点。",
              },
              {
                text: "噪声",
                feedback: "噪声是读数的小幅跳动，不是一个分界数值。",
              },
              {
                text: "阈值",
                feedback: "对了：阈值就是你为区分近和远而挑的那个分界数字。",
              },
              {
                text: "执行器",
                feedback: "执行器是负责动作的部件；15 厘米是一个数值，不是部件。",
              },
            ],
            explanation: "阈值是你自己挑的一个分界数值，用来区分两种情况，比如近与远，或者亮与暗。",
          },
          {
            prompt: "你对着同一堵不动的墙读了五次，得到 30、31、30、29、31。这些数字为什么会跳？",
            options: [
              {
                text: "墙一直在动",
                feedback: "墙并没有动；就算什么都不变，跳动照样会出现。",
              },
              {
                text: "因为有噪声，所以要多测几次",
                feedback: "正确：噪声让读数小幅跳动，所以要读几次并取中间那个。",
              },
              {
                text: "阈值定错了",
                feedback: "阈值是你自己挑的分界点，它不会让读数跳动。",
              },
              {
                text: "传感器没电了",
                feedback: "没电的传感器根本读不出数；小幅跳动是正常的噪声。",
              },
            ],
            explanation: "噪声是读数中那种小小的、正常的跳动，就算什么都没变也会出现，所以做机器人的人都会多测几次，取中间值或平均值。",
          },
          {
            prompt: "你的亮暗阈值在教室里好用，到了阳光充足的房间却失灵了。你该怎么办？",
            options: [
              {
                text: "放弃算了，光线传感器在外面就是不管用",
                feedback: "光线传感器好得很，它只是需要针对新的光线重新设定。",
              },
              {
                text: "为新房间校准传感器，并定一个新的阈值",
                feedback: "正确：校准就是把你的读数和阈值调整到适应这个房间的光线。",
              },
              {
                text: "让机器人跑得更快",
                feedback: "速度和能不能正确读出光线毫无关系。",
              },
              {
                text: "多装几个轮子",
                feedback: "轮子改变不了光线传感器测量亮度的方式。",
              },
            ],
            explanation: "同一个阈值不可能在每个房间都好使，所以你要针对新的光线校准传感器，并挑一个能可靠区分亮暗的新阈值。",
          },
        ],
      },
      reflection: [
        {
          prompt: "你的传感器什么时候给出过出乎意料的读数？可能是什么造成的？",
        },
        {
          prompt: "你对着一个不动的物体读了好几次，得到的数字却略有不同。这是为什么？你又是怎么处理的？",
        },
        {
          prompt: "为什么一台在某个房间里感知得完美无缺的机器人，换个房间还得重新校准？",
        },
      ],
      journalPrompts: [
        {
          prompt: "把你在各种测试条件下的传感器读数和你挑的阈值记录下来。",
        },
        {
          prompt: "写下你的阈值数字，再用一句话说明你为什么挑它。",
        },
        {
          prompt: "记下什么都没变时你的读数跳动了多少，以及你一共测了几次。",
        },
      ],
      savedPrograms: [
        {
          title: "传感器停车挑战",
          description: "编程让机器人一边前进一边盯着距离传感器，然后用你找到的阈值停在墙前的那一格。跑三次，中间调整速度或阈值，并在备注里说明你最终为什么这么设。",
        },
      ],
      simulatorMissions: [
        {
          title: "在不同条件下读取传感器",
          objective: "开动机器人让墙处在不同的距离上，逐一读取传感器并记录数值，但不要让机器人作出反应。",
          successCriteria: [
            "在不同距离上至少取了三个传感器读数",
            "读数变化的方向说得通",
            "没有用条件或重复积木块：机器人只负责读数和报告",
          ],
        },
        {
          title: "找出亮暗阈值",
          objective: "在深色和浅色格子上读取传感器，记录足够多的数值，好挑出一个能把它们分开的阈值。",
          successCriteria: [
            "记录了深色和浅色的读数",
            "在两者之间挑出了一个阈值数值",
            "这个阈值把记录下来的格子正确地分开了",
          ],
        },
        {
          title: "在墙前停住",
          objective: "让机器人往前开，用距离传感器把它停在墙前的那一格，然后发出任务完成的信号。",
          successCriteria: [
            "机器人停在紧挨着墙的那一格里",
            "由距离传感器来决定什么时候停",
            "机器人发出任务完成的信号，并且没有撞墙",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "四种感官，以及什么是读数",
          focus: "触碰、距离、光线和颜色传感器；读数是一个数字，不是「是」或「否」。",
        },
        {
          title: "预测读数",
          focus: "猜一猜读数怎样随距离变化，以及对着不动的墙读两次是否会得到同样的数字。",
        },
        {
          title: "传感器考察实验",
          focus: "在不同条件下读取传感器，并找出一个阈值。",
        },
        {
          title: "校准与阈值挑战",
          focus: "对付噪声，然后为这个房间校准一个可靠的阈值。",
        },
        {
          title: "传感器停车挑战",
          focus: "编程让机器人前进并用距离传感器在墙前停住；跑三次，把阈值调到最合适。",
        },
        {
          title: "知识检测",
          focus: "关于读数、阈值、噪声和校准的五道题。",
        },
        {
          title: "反思",
          focus: "写一写阈值、噪声，以及校准为什么重要。",
        },
      ],
      safetyNotes: [
        {
          text: "把机器人放在稳当的平面上，在各个测试点之间搬动它时当心轮子。",
        },
        {
          text: "给蒙眼扮演「人体传感器」的同学做好引导，并把地面清空，免得有人绊倒。",
        },
        {
          text: "测试光线传感器时，不要用手电筒直射任何人的眼睛。",
        },
        {
          text: "常常保存你的读数记录，免得刷新浏览器时把数据弄丢。",
        },
      ],
      printableResources: [
        {
          title: "传感器读数记录",
          description: "几张表格，用来记录不同条件下的传感器读数、三次测量的噪声检查，以及挑好的阈值。",
        },
        {
          title: "阈值与校准页",
          description: "留出空间记录读数、计算平均值，并写下经过校准的阈值及其理由。",
        },
        {
          title: "第 4 周教师指南",
          description: "针对传感器读数与校准这一课的课前准备、课堂组织、常见误解和提问建议。",
        },
      ],
      completion: {
        summary: "完成第 4 周：在不同条件下读取传感器、记录数值、挑出并校准一个阈值，并通过知识检测。",
        requirements: [
          {
            label: "在传感器考察实验中记录不同条件下的传感器读数",
          },
          {
            label: "在校准与阈值挑战中挑出并校准一个阈值",
          },
          {
            label: "知识检测至少答对 5 题中的 4 题",
          },
          {
            label: "写下你的反思",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "为每位学生或每组打印「传感器读数记录」。",
          "布置一个量好的测试点：卷尺上标出 10、20、40 和 80 厘米，并准备一堵墙或一个盒子放在那里。",
          "走套件路线的，装好传感器并预先载入一个「读数并报告」的短程序；走模拟器路线的，在每台设备上打开它；走不插电路线的，准备好眼罩和一套深浅卡片。",
        ],
        prep: [
          "自己先做一遍传感器实验，摸清你手上这个传感器的真实读数和探测极限。",
          "提前对着一个不动的物体测五次，好向学生展示噪声长什么样。",
          "先定好校准挑战里要用的那两个界限分明的条件（暗对亮，或者近对远）。",
        ],
        facilitation: [
          "开始测量之前，先讲这四种传感器，以及「读数是一个数字，不是是或否」这个核心观点。",
          "先让学生预测读数，再开展传感器考察实验，并把每个数值都记下来。",
          "强调这一周机器人只负责读数和报告：判断这些数字含义的是学生，不是机器人；自动反应下周才会出现。",
          "开展校准与阈值挑战：用重复读数展示噪声，并把阈值定在两个界限分明的条件之间。",
        ],
        commonMisconceptions: [
          "「传感器给出的是是或否」：大多数传感器给的是一个随外界平滑变化的数字。",
          "「测一次就够了」：因为有噪声，应该多测几次，取中间值或平均值。",
          "「同一个阈值到哪儿都好使」：光线和表面会随房间而变，所以要针对所在的地方校准。",
          "「数字在跳，说明传感器坏了」：小幅跳动是正常的噪声，不是故障。",
        ],
        questionsToAsk: [
          "你读到的是什么数字？它意味着什么：近还是远，亮还是暗？",
          "同一个位置你为什么要读不止一次？",
          "你把阈值定在了哪里？是怎么决定的？",
          "换到更亮的房间，你的阈值还管用吗？你会怎么去验证？",
        ],
        easierVersion: "只用一个传感器和两个界限分明的条件（一堵近墙和一堵远墙），并由全班一起把阈值定下来。",
        harderVersion: "让学生比较两个传感器，把噪声表述成一个区间，并校准出一个在两个不同房间都好用的阈值。",
      },
      nextWeek: {
        teaser: "下周机器人不再只是报数字，而要用你找到的阈值，靠循环和条件自己对这些数字作出反应。",
        prepare: [
          "把这一周校准好的阈值留着：下周你要用它们让机器人自己作判断。",
          "给你的套件充好电，或者把模拟器加入收藏夹。",
          "想一条简单的规则，比如「如果墙比我的阈值还近，就转弯」，那正是你接下来要搭的东西。",
        ],
      },
    },
    {
      title: "让机器人作出反应",
      subtitle: "把传感器与循环、条件结合起来，让机器人自己对周围的世界作出反应。",
      summary: "这是编程的重头戏周。学生要把第 4 周的传感器和第 3 周的顺序结构，跟循环和条件组合到一起，让机器人能自己作出反应。他们会学到：循环负责重复步骤，无限循环会一直重复到有人叫停，而「重复直到」循环则一直跑到某个条件变成真为止。他们还会认识条件和布尔（真/假）判断，然后用「如果」和「如果/否则」来选择动作。他们要编写避障程序：循环、读距离传感器，一旦有东西靠近就转弯；还要探索循线，通过查看光线或颜色传感器来调整方向、始终压在线上。",
      mainMission: "编写一个能自己作出反应的机器人程序：它不断循环、查看传感器，并用「如果/否则」来避开障碍或沿线行驶。",
      estimatedTime: "70 至 85 分钟",
      learningGoals: [
        {
          text: "说明循环、无限循环和「重复直到」循环各自是怎样重复步骤的",
        },
        {
          text: "把条件描述成一次非真即假（布尔）的判断",
        },
        {
          text: "用「如果」在条件为真时才执行步骤，用「如果/否则」在两个动作之间作选择",
        },
        {
          text: "用循环读取距离传感器，并在有东西靠近时转弯，从而编出避障程序",
        },
        {
          text: "说明循线是怎样不停查看光线或颜色传感器，来调整方向、始终压在线上的",
        },
      ],
      vocabulary: [
        {
          term: "循环",
          definition: "一种积木块，它替你把一个或多个步骤重复执行，省得你一遍遍地把它们写出来。",
        },
        {
          term: "无限循环",
          definition: "一种一直重复下去的循环，直到你把程序停掉为止。",
        },
        {
          term: "重复直到",
          definition: "一种循环，它会一直重复，直到某个条件变成真，然后停下来继续往下走。",
        },
        {
          term: "条件",
          definition: "一次关于外界情况的判断，比如「墙近不近？」，答案永远非真即假。",
        },
        {
          definition: "一种积木块，只有条件为真时才执行里面的步骤，条件为假时就跳过。",
        },
        {
          term: "如果/否则",
          definition: "一种积木块：条件为真时执行一组步骤，为假时执行另一组步骤。",
        },
        {
          term: "布尔值",
          definition: "一种只能取两个值之一的数据：真或假。条件给出的答案就是布尔值。",
        },
        {
          term: "避障",
          definition: "一种行为：机器人不断循环、读取距离传感器，一旦有东西靠近就避开。",
        },
        {
          term: "循线",
          definition: "一种行为：机器人不停查看光线或颜色传感器，并调整方向，始终压在标出的线上。",
        },
        {
          term: "反应式行为",
          definition: "机器人根据自己实时感知到的情况改变做法，而不是照着一张固定的清单走。",
        },
      ],
      prerequisites: [
        {
          reason: "作出反应仍然要靠运行程序，所以这一周是建立在第 3 周那些精确指令串之上的。",
        },
        {
          reason: "机器人只能对它感知得到的东西作出反应，所以这一周需要第 4 周的距离、光线和颜色传感器。",
        },
      ],
      concepts: [
        {
          title: "循环：不用重写也能重复",
          body: [
            "第 3 周你是把每一步一条条排着写下来的。这样也行得通，但要是想让机器人查一百次传感器，你总不能把同一步写上一百遍。循环就是那种替你重复步骤的积木块。",
            "普通的重复循环会把里面的步骤跑固定的次数，比如「重复 4 次：向前走、向右转」就能走出一个正方形。计数由循环来管，你的程序就能保持短小。",
          ],
          examples: [
            "重复 4 次，走出一个正方形",
            "重复 3 次，敲三下门",
            "重复 10 次，一点一点往前挪并查看",
          ],
        },
        {
          title: "无限循环和「重复直到」循环",
          body: [
            "无限循环会把里面的步骤一遍遍地重复下去，自己永远不停：一直跑到你把程序停掉。机器人靠无限循环来持续观察世界，比如「一直循环：读传感器并作出反应」。",
            "「重复直到」循环不一样：它一直重复，直到某个条件变成真，然后停下来继续往下走。「重复直到墙很近：向前走」的意思是一直往前走，但只要墙一近，就跳出循环。",
          ],
          examples: [
            "一直循环：不停查看距离传感器",
            "重复直到找到线：向前走",
            "重复直到按钮被按下：等待",
          ],
        },
        {
          title: "条件非真即假（布尔）",
          body: [
            "条件是一个关于外界的问题，答案只能是「是」或「否」；在编程里我们说「真」或「假」。一个只可能是真或假的值，就叫布尔值。",
            "「墙是不是比 10 厘米还近？」就是一个条件。此刻它可能为真；一秒之后机器人挪了位置，它可能就为假了。条件就是机器人把传感器读数变成一个可以据以行动的明确「是或否」的办法。",
          ],
          examples: [
            "墙近不近？-> 真或假",
            "传感器是不是在黑线上？-> 真或假",
            "按钮被按下了吗？-> 真或假",
          ],
        },
        {
          title: "「如果」和「如果/否则」：选择该做什么",
          body: [
            "「如果」积木块只有在条件为真时才执行里面的步骤。「如果墙很近，就向右转」的意思是：只有真的有墙靠近了机器人才转弯，否则就跳过这个转弯。",
            "「如果/否则」积木块则在两个动作之间挑一个：条件为真时执行一组步骤，为假时执行另一组。「如果墙很近就向右转，否则就向前走」的意思是：机器人总会做其中一件事，具体做哪一件取决于它感知到了什么。",
          ],
          examples: [
            "如果跟丢了线，就转弯把它找回来",
            "如果/否则：墙近 -> 转弯，否则 -> 向前走",
            "如果物品是红色的，就转向红色的箱子",
          ],
        },
        {
          title: "避障 = 循环 + 传感器 + 如果/否则",
          body: [
            "现在把这些拼到一起。避障就是一个无限循环：读距离传感器，再用「如果/否则」来决定，有东西靠近就避开，否则继续往前开。由于这个循环每秒重复很多次，障碍物一出现，机器人立刻就有反应。",
            "自动泊车的汽车和扫地机器人背后就是这个套路：感知、决定、行动，一遍又一遍，永不停歇。",
          ],
          examples: [
            "一直循环：读距离；近了就转弯，否则向前走",
            "在房间里到处碰壁绕行的扫地机器人",
            "绕开一块石头的火星车",
          ],
        },
        {
          title: "循线：不停查看、随时调整方向",
          body: [
            "循线要用一个朝向地面的光线或颜色传感器。深色的线比浅色的地板反射的光更少，所以传感器能分辨出「在线上」和「离开线」。机器人一遍又一遍地查看，并调整方向，让自己始终压在线上。",
            "有一条简单的规则：如果传感器看到线，就往一边打弯；否则就往另一边打回来。机器人从来不会走出一条笔直的路，它是沿着线的边缘一路扭来扭去、时时刻刻在纠偏。这种不停查看、不停调整，就是反应式行为。",
          ],
          examples: [
            "仓库机器人沿着地面上的胶带行驶",
            "工厂里沿着彩绘线路行驶的小车",
            "重复直到终点标记：一路循线前进",
          ],
        },
      ],
      materials: [
        {
          name: "积木程序规划页（可打印）",
        },
        {
          name: "「如果/否则」决策卡片组（可打印）",
        },
        {
          name: "反应测试记录表（可打印）",
        },
        {
          name: "一套带距离传感器和光线或颜色传感器的可编程机器人套件",
        },
        {
          name: "纸箱或书本，用来搭一个小型障碍赛道",
        },
        {
          name: "浅色地板上的深色胶带（或者印出来的线），用于循线",
        },
        {
          name: "装有浏览器模拟器的电脑或平板",
        },
        {
          name: "程序卡片（一直循环、如果、如果/否则、前进、转弯、读传感器、停），以及地板网格或一条胶带线",
        },
        {
          name: "一位同伴来扮演机器人，照着卡片行动",
        },
      ],
      activities: [
        {
          title: "避障程序",
          goal: "编程让机器人不断循环、读取距离传感器，并用「如果/否则」在有东西靠近时转弯、在前方畅通时前进。",
          shared: [
            "套路始终一样：无限循环，读距离传感器，然后「如果/否则」：有东西靠近就转弯，否则就往前走。",
            "先定好你的「靠近」规则（比如「小于 10 厘米就算近」）。然后把循环搭起来，让机器人在整个运行过程中一直都在作出反应。",
          ],
          variants: {
            kit: {
              title: "用套件机器人躲开真实的障碍物",
              materials: [
                "一套带距离传感器的机器人套件",
                "做障碍赛道用的纸箱或书本",
                "积木程序规划页",
              ],
              instructions: [
                "摆几个障碍物（纸箱或书本），中间留出机器人能开过去的空隙。",
                "搭一个无限循环。在它里面读取距离传感器。",
                "加一个「如果/否则」：如果距离小于你设的「靠近」值，就转弯；否则就往前开一小段。",
                "运行起来，看着机器人一遍遍循环、感知，自己绕开这些障碍物。",
              ],
              safetyNotes: [
                "机器人行驶时，手指要离轮子远一点。",
                "给机器人一块干净的地面，别有电线和台阶。",
              ],
              expectedResult: "机器人自己往前开，一有障碍物靠近就避开，全程不需要人操控。",
              successCriteria: [
                "程序用了无限循环（或重复循环）",
                "程序在循环里读取距离传感器",
                "程序用「如果/否则」在近了时转弯、畅通时前进",
                "机器人独立避开了至少一个障碍物",
              ],
              troubleshooting: [
                {
                  problem: "机器人直愣愣地撞上障碍物",
                  fix: "检查那个「如果」是不是真的在读传感器，以及当墙就在正前方时，你设的「靠近」值是不是比读数更大。",
                },
                {
                  problem: "机器人在原地打转，停不下来",
                  fix: "你的「靠近」值可能太大了，导致它总觉得旁边有东西；把它调小，或者在「否则」里加一小段前进。",
                },
              ],
              extension: "再用「如果/否则」加一条规则，让机器人有时左转、有时右转，好从墙角里脱身。",
            },
            simulator: {
              title: "在模拟器的网格上躲开墙壁",
              materials: [
                "浏览器模拟器",
                "积木程序规划页",
              ],
              instructions: [
                "打开障碍赛道任务，网格上布着墙壁。",
                "把一个无限循环拖到工作区，在它里面放一个读传感器（距离）积木块。",
                "加一个「如果/否则」：如果前方有墙靠近，就左转（或右转）；否则就向前走。",
                "运行任务，看着机器人一路循环、绕开墙壁抵达终点。",
              ],
              safetyNotes: [
                "没有安全隐患；眼睛累了就离开屏幕歇一会儿。",
              ],
              expectedResult: "模拟器里的机器人不停前进，一探测到前方有墙就转弯，自己在网格中穿行。",
              successCriteria: [
                "程序用了无限循环",
                "程序在循环里有一个读传感器积木块",
                "程序用「如果/否则」在墙近时转弯、畅通时前进",
                "机器人在没人操控的情况下抵达终点",
              ],
              troubleshooting: [
                {
                  problem: "机器人开出了网格，或者撞进墙里",
                  fix: "确认读传感器和「如果/否则」是放在循环里面、而不是循环后面，这样每一步才会检查一次。",
                },
                {
                  problem: "机器人只会转弯，从来不往前走",
                  fix: "把前进放进「否则」那一支，这样前方畅通时它才会往前开。",
                },
              ],
              extension: "把墙加多一些，或者把空隙调窄，再调整程序让机器人照样能过去。",
            },
            unplugged: {
              title: "用条件卡片和一个人体机器人跑障碍赛道",
              materials: [
                "程序卡片（一直循环、读传感器、如果/否则、前进、转弯、停）",
                "一位同伴来当机器人",
                "当障碍物用的物品",
              ],
              instructions: [
                "在地上摆几件东西当障碍物，中间留出空隙。",
                "把卡片摆好：一张「一直循环」卡，里面放一张读传感器卡（「往前看：有东西靠近吗？」）和一张「如果/否则」卡。",
                "写下这个「如果/否则」：如果有东西靠近，就转弯；否则就往前迈一步。",
                "不用蒙眼：你的同伴就是机器人，只能严格照当前那张卡片做，每绕一圈循环都要重新判断一次「近不近？」。",
              ],
              safetyNotes: [
                "用柔软安全的物品当障碍物。",
                "把地面上任何可能绊倒人的东西都清开。",
              ],
              expectedResult: "人体机器人一圈圈地照卡片执行，每圈都检查有没有障碍物，一近就避开，从来不撞上去。",
              successCriteria: [
                "卡片里包含一个循环、一个读传感器和一个「如果/否则」",
                "机器人每绕一圈循环都重新判断一次条件",
                "机器人只在有东西靠近时才转弯，畅通时就往前迈步",
                "全程走完赛道，一次都没撞",
              ],
              troubleshooting: [
                {
                  problem: "「机器人」作弊，直接绕着障碍物走",
                  fix: "提醒他机器人只能照卡片来；必须真的去判断那个条件，再按判断结果行动。",
                },
                {
                  problem: "机器人忘了要一直判断",
                  fix: "「一直循环」那张卡的意思就是每次都要回到最上面；每做完一个动作就指一下那张卡。",
                },
              ],
              extension: "再加一个「如果/否则」：靠近左边的墙就左转，靠近右边的墙就右转。",
            },
          },
        },
        {
          title: "循线探索",
          goal: "用光线或颜色传感器，配合「重复直到」和「如果」，让机器人始终沿着标出的线行进。",
          shared: [
            "循线是一种不停查看的行为：一遍又一遍地读光线或颜色传感器，并调整方向，让自己始终压在线上。",
            "一条简单的规则就够用了：如果传感器在线上，就往一边打弯；否则就往另一边打。再把它包进一个「重复直到」循环里，等机器人到达终点标记时结束。",
          ],
          variants: {
            kit: {
              title: "用光线或颜色传感器沿胶带线行驶",
              materials: [
                "一套带光线或颜色传感器的机器人套件",
                "浅色地板上的一条深色胶带线",
                "积木程序规划页",
              ],
              instructions: [
                "在浅色地板上贴一条深色胶带线，两端各做一个清楚的起点和终点标记。",
                "把光线或颜色传感器朝下对着地板，分别看看它在线上和离开线时的读数。",
                "搭一个「重复直到（到达终点标记）」循环，里面放一个「如果」：如果传感器离开了线，就朝线的方向修正；否则就继续沿着边缘打弯。",
                "运行起来，看着机器人一路沿线扭着走，最后在终点停下。",
              ],
              safetyNotes: [
                "运行过程中让手指远离轮子。",
                "把线贴得平平的，免得有人绊倒。",
              ],
              expectedResult: "机器人沿着胶带线行驶，一路左右修正，并在终点标记处停下。",
              successCriteria: [
                "程序在循环里读取光线或颜色传感器",
                "程序用「如果」（或「如果/否则」）根据读数来修正方向",
                "机器人在大部分路程上都大致压在线上",
                "机器人在终点标记处停下",
              ],
              troubleshooting: [
                {
                  problem: "机器人一上来就跟丢了线",
                  fix: "重新核对在线上和离开线时的读数，把阈值定在两者之间；这两个读数必须差得够明显。",
                },
                {
                  problem: "机器人在原地打圈",
                  fix: "把修正的转弯幅度调小；幅度一大，每次都会冲过头。",
                },
              ],
              extension: "给线加一个弯道或一个分岔，再调整方向规则，让机器人照样跟得住。",
            },
            simulator: {
              title: "在模拟器的网格上循线",
              materials: [
                "浏览器模拟器",
                "积木程序规划页",
              ],
              instructions: [
                "打开循线任务，网格上有一条标出来的路径。",
                "加一个「重复直到」循环，设成一直跑到机器人抵达终点格为止。",
                "在里面放一个读传感器（光线/颜色）积木块和一个「如果/否则」：如果离开了线，就朝线的方向转回去；否则就向前走。",
                "运行任务，看着机器人沿线一路修正方向直到终点。",
              ],
              safetyNotes: [
                "没有安全隐患；需要就让眼睛离开屏幕歇一会儿。",
              ],
              expectedResult: "模拟器里的机器人沿着标出的路径行进，一路修正方向不让自己跑偏，到达终点格时停下。",
              successCriteria: [
                "程序用了「重复直到」循环",
                "程序每绕一圈循环都读一次光线或颜色传感器",
                "程序用「如果/否则」根据读数来修正方向",
                "机器人走到了线的尽头",
              ],
              troubleshooting: [
                {
                  problem: "循环永远结束不了",
                  fix: "检查「重复直到」的那个条件（到达终点格）在这条路径上确实有机会变成真。",
                },
                {
                  problem: "机器人渐渐偏离了线",
                  fix: "确认读传感器和「如果/否则」都在循环里面，这样它才会每一步都检查并修正。",
                },
              ],
              extension: "换一张弯道更多的线路图，把方向修正调得更灵敏，让机器人跟得上。",
            },
            unplugged: {
              title: "按规则在胶带线上演一遍循线",
              materials: [
                "地板上一条带起点和终点的胶带线",
                "写在卡片上的循线规则",
                "一位同伴来当机器人",
              ],
              instructions: [
                "在地板上贴一条胶带线，两端各做一个清楚的起点和终点标记。",
                "写下规则：「一直走到终点为止。每走一步都要检查：你的脚在线上吗？在的话，就沿着线往前迈一步；不在的话，就朝线的方向稍微转一点，再迈一步。」",
                "你的同伴就是机器人：他只能照规则来，每一步都要对照自己的脚和线，绝不能提前往前看去做打算。",
                "一直重复，直到他到达终点标记，然后停下。",
              ],
              safetyNotes: [
                "慢慢走，并保持路线通畅，免得有人绊倒。",
                "把线贴得平平整整的。",
              ],
              expectedResult: "人体机器人一步一步地沿着胶带线走，只要有一只脚偏出去就朝线修正，最后在终点停下。",
              successCriteria: [
                "机器人每走一步都重新检查自己在不在线上",
                "偏离时，机器人会朝线的方向修正",
                "机器人照规则走，而不是凭自己的判断走",
                "机器人在终点标记处停下",
              ],
              troubleshooting: [
                {
                  problem: "「机器人」一路顺顺当当走完了整条线，根本没检查",
                  fix: "那是人在提前规划：让他每走一步都停一下，重新判断一次条件，就像循环那样。",
                },
                {
                  problem: "「机器人」为往哪边转跟人争起来了",
                  fix: "把规则写成「离开线就一律朝线的方向转」，这样就没有猜的余地了。",
                },
              ],
              extension: "给线加一个弯，看看同一条规则还能不能让机器人压在线上。",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "运行避障程序之前：机器人碰到墙时，你预测它会怎么做？为什么？",
          howToCheck: "对着一堵墙把程序跑三次，把机器人实际的表现和你的预测对照一下。",
        },
        {
          prompt: "预测一下：如果把读传感器从循环里拿出来，机器人的反应会有什么变化？",
          howToCheck: "把读取传感器那一步挪到循环外面，运行一下，看机器人还会不会对突然出现的障碍物作出反应。",
        },
      ],
      testRecords: [
        {
          title: "避障可靠性测试",
          instructions: "把机器人摆在一个障碍物前面，运行程序。记录它有没有及时避开。从同一个起点重复三次。",
          columns: [
            null,
            "有没有避开障碍物？（是/否）",
            "它做了什么",
          ],
          measure: "三次尝试里，机器人成功避开障碍物的有几次",
        },
      ],
      knowledgeCheck: {
        instructions: "回答这几题，检验一下你是否理解循环、条件，以及机器人是怎样作出反应的。",
        questions: [
          {
            prompt: "判断这句话是对还是错。",
            statement: "无限循环过几秒钟就会自己停下来。",
            explanation: "错。无限循环会一直重复下去，直到有什么把它停住；它自己是不会结束的。",
          },
          {
            prompt: "循环在程序里起什么作用？",
            options: [
              {
                text: "它让机器人跑得更快",
                feedback: "速度来自电机，不是来自循环。",
              },
              {
                text: "它把一个或多个步骤重复执行，省得你一遍遍地写出来",
                feedback: "对了：循环替你重复步骤，你的程序就能保持短小。",
              },
              {
                text: "它让机器人停下来",
                feedback: "让机器人停下来是停止积木块的活儿，不是循环的。",
              },
              {
                text: "它给机器人加一个新传感器",
                feedback: "循环只重复步骤，它加不了硬件。",
              },
            ],
            explanation: "循环替你重复步骤，这样机器人不用一段又长又臭的程序，也能反复地做某件事或查某件事。",
          },
          {
            prompt: "无限循环和「重复直到」循环有什么区别？",
            options: [
              {
                text: "无限循环跑一次；「重复直到」循环跑两次",
                feedback: "两者都不是固定跑一两次，它们都会不停地重复。",
              },
              {
                text: "无限循环会一直重复到你停掉程序；「重复直到」循环会一直重复到某个条件变成真",
                feedback: "正确：无限循环得靠人叫停；「重复直到」循环在条件为真时会自己停下。",
              },
              {
                text: "它们完全一样",
                feedback: "它们停下来的原因不一样，所以并不相同。",
              },
              {
                text: "无限循环需要传感器，「重复直到」循环不需要",
                feedback: "两种循环都可以用传感器；区别在于它们怎么停。",
              },
            ],
            explanation: "无限循环只有在你停掉程序时才会停；「重复直到」循环一旦条件变成真，就会自己停下。",
          },
          {
            prompt: "像「墙近不近？」这样的条件，答案只能是：",
            options: [
              {
                text: "一个以厘米为单位的数字",
                feedback: "传感器给的是数字，但条件把它变成了一个「是或否」的答案。",
              },
              {
                text: "真或假（一个布尔值）",
                feedback: "对了：条件的答案永远是真或假，这就叫布尔值。",
              },
              {
                text: "一种颜色",
                feedback: "条件是一次「是或否」的判断，不是颜色。",
              },
              {
                text: "一个电机转速",
                feedback: "转速是一种输出；条件是一次真假判断。",
              },
            ],
            explanation: "条件是一次非真即假的判断，而只取真或假的值就叫布尔值。",
          },
          {
            prompt: "「如果/否则」积木块是干什么的？",
            options: [
              {
                text: "条件为真时执行一组步骤，为假时执行另一组步骤",
                feedback: "正确：「如果/否则」会根据条件在两个动作之间选一个。",
              },
              {
                text: "它把一个步骤重复十次",
                feedback: "那是重复循环，不是「如果/否则」。",
              },
              {
                text: "它总是把两组步骤都执行一遍",
                feedback: "「如果/否则」只会执行其中一支：要么真的那一支，要么假的那一支，绝不会两支都执行。",
              },
              {
                text: "它读取传感器",
                feedback: "那是读传感器积木块干的；「如果/否则」负责决定拿这个读数怎么办。",
              },
            ],
            explanation: "「如果/否则」积木块在两个动作之间作选择：条件为真时走「如果」那些步骤，为假时走「否则」那些步骤。",
          },
          {
            prompt: "避障是怎么工作的？",
            options: [
              {
                text: "机器人按照事先一次性告诉它的固定路线行驶",
                feedback: "那只是一串不会作出反应的顺序指令；避障要实时用到传感器。",
              },
              {
                text: "一个循环读取距离传感器，如果有东西靠近机器人就转弯；否则就往前走",
                feedback: "对了：循环、读传感器，再用「如果/否则」在近了时转弯、畅通时前进。",
              },
              {
                text: "机器人等着人来操控它绕过每一个障碍物",
                feedback: "那就成了遥控，不是自己作出反应。",
              },
              {
                text: "机器人一看到障碍物就关机",
                feedback: "它是绕开继续走，不是关机。",
              },
            ],
            explanation: "避障就是一个循环：读取距离传感器，并用「如果/否则」在有东西靠近时转弯、在前方畅通时前进。",
          },
        ],
      },
      reflection: [
        {
          prompt: "你的机器人反复在作什么判断？它靠的是什么信息？",
        },
        {
          prompt: "为什么会作出反应的机器人要在传感器检查外面套一个循环，而不是只查一次？",
        },
        {
          prompt: "描述一台会对世界作出反应的真实机器人，并说出它检查的是什么条件。",
        },
      ],
      journalPrompts: [
        {
          prompt: "把你的避障程序画出来：一个循环，里面装着一个读传感器和一个「如果/否则」。",
        },
        {
          prompt: "用「如果……就……否则……」的形式，写下你的机器人所遵循的那一条循线规则。",
        },
        {
          prompt: "记下三次避障尝试里，机器人成功避开障碍物的有几次。",
        },
      ],
      savedPrograms: [
        {
          title: "避障程序",
          description: "一个无限循环，读取距离传感器，并用「如果/否则」在有东西靠近时转弯、在前方畅通时前进。",
        },
        {
          title: "循线程序",
          description: "一个「重复直到」循环，每一步都读取光线或颜色传感器，并用「如果」把机器人拉回线上，到终点标记处停下。",
        },
      ],
      simulatorMissions: [
        {
          title: "障碍赛道",
          objective: "编程让机器人不断循环、读取距离传感器，并用「如果/否则」自己绕过墙壁抵达终点。",
          successCriteria: [
            "机器人在无人操控的情况下避开了每一面墙",
            "程序用了一个循环，里面装着一次传感器读取和一个「如果/否则」",
            "机器人到达终点格",
          ],
        },
        {
          title: "循线",
          objective: "用「重复直到」循环和光线/颜色传感器，让机器人一路压在标出的线上，直到抵达终点格。",
          successCriteria: [
            "机器人在大部分路程上都压在标出的线上",
            "程序每绕一圈循环都读一次光线或颜色传感器",
            "机器人在线的尽头停下",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "循环与条件",
          focus: "循环、无限循环、重复直到、条件、布尔值、如果，以及如果/否则。",
        },
        {
          title: "避障程序",
          focus: "循环、读距离传感器，并用「如果/否则」在近了时转弯。",
        },
        {
          title: "预测遇墙时的反应",
          focus: "先预测机器人碰到墙会怎么做，再动手验证。",
        },
        {
          title: "反应可靠性测试",
          focus: "跑三次，并记录机器人有没有避开障碍物。",
        },
        {
          title: "循线探索",
          focus: "用光线/颜色传感器配合「重复直到」和「如果」，让机器人压在线上。",
        },
        {
          title: "知识检测",
          focus: "关于循环、条件和作出反应的五道题。",
        },
        {
          title: "反思",
          focus: "写一写「如果」和「如果/否则」的区别，以及为什么作出反应离不开循环。",
        },
      ],
      safetyNotes: [
        {
          text: "会作出反应的机器人会自己改变方向，所以它行驶时，让手指、头发和宽松的衣服远离转动的轮子。",
        },
        {
          text: "把胶带线和障碍赛道的道具都贴平放稳，并清空地面，免得运行时有人绊倒。",
        },
        {
          text: "常常保存你的积木程序，免得刷新浏览器时把成果弄丢。",
        },
      ],
      printableResources: [
        {
          title: "积木程序规划页",
          description: "一页纸，用来在动手搭之前先规划好一个带读传感器和「如果/否则」的循环。",
        },
        {
          title: "「如果/否则」决策卡",
          description: "可打印的「一直循环」「读传感器」「如果」和「如果/否则」卡片，用于不插电的障碍和循线活动。",
        },
        {
          title: "反应测试记录表",
          description: "一张表格，用来记录三次避障尝试以及机器人有没有避开障碍物。",
        },
        {
          title: "第 5 周教师指南",
          description: "针对「会作出反应的机器人」这一课的课前准备、课堂组织、常见误解和提问建议。",
        },
      ],
      completion: {
        summary: "完成第 5 周：编出一个避障行为、探索循线、记录三次反应尝试，并通过知识检测。",
        requirements: [
          {
            label: "搭出一个带循环、传感器读取和「如果/否则」的避障程序",
          },
          {
            label: "用光线/颜色传感器和循环探索循线",
          },
          {
            label: "做三次反应尝试并记录结果",
          },
          {
            label: "知识检测至少答对 5 题中的 4 题",
          },
          {
            label: "写下你的反思",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "为每位学生或每组打印规划页、「如果/否则」决策卡和反应测试记录表。",
          "走套件路线的：先充好电，装上距离传感器和光线或颜色传感器，并布置一个小型障碍赛道和一条胶带线。",
          "走模拟器路线的，在每台设备上打开障碍赛道和循线两个任务。",
        ],
        prep: [
          "自己先把避障套路编一遍，好摸清你手上这个传感器适用的「靠近」值。",
          "用你真正要用的那卷胶带和那块地板，核对光线/颜色传感器在线上和离线时的读数。",
          "提前把不插电路线用的「一直循环」「如果」和「如果/否则」卡片剪好。",
        ],
        facilitation: [
          "动手编程之前，先借助第 1 周的「感知、决定、行动」循环，讲清楚循环、无限循环与「重复直到」的区别，以及条件（真/假）。",
          "带着全班一起搭出避障套路（一直循环、读传感器、如果/否则），然后让学生两人一组去改造它。",
          "做预测和三次反应测试，让学生明白「会反应」讲的是可靠性，而不是碰巧成功的那一次。",
          "把循线当作一种不停查看、不停修正的行为来探索；机器人会扭来扭去，别指望笔直。",
          "以知识检测和反思收尾。",
        ],
        commonMisconceptions: [
          "「机器人只要查一次就行了」：没有循环，它只会反应一次，之后就不再有任何回应。",
          "「如果/否则会把两支都执行」：它只会执行为真的那一支，或者为假的那一支。",
          "「转得越大越跟得住线」：大幅修正每次都会冲过头；小幅、频繁的修正才管用。",
          "把传感器数字和条件混为一谈：传感器给的是数字，条件把它变成真或假。",
        ],
        questionsToAsk: [
          "循环在哪里？是什么让它停下来的？",
          "这里的条件是什么？它什么时候为真？",
          "机器人在「否则」那一支里做什么？它为什么需要这一支？",
          "机器人是怎么知道自己偏离了线的？",
        ],
        easierVersion: "给学生一个几乎写好的程序，只把「如果/否则」留空，他们只需要填上「转弯」和「向前走」。",
        harderVersion: "让学生用嵌套的「如果/否则」把两种行为合到一起：既沿线行驶，又要避开压在线上的一个障碍物。",
      },
      nextWeek: {
        teaser: "下周你那台会反应的机器人不会总那么听话，所以我们要学着排查问题，让它每一次都稳稳当当地跑起来。",
        prepare: [
          "把你的避障程序和循线程序保存好；下周我们会把它们的某些版本弄坏，再修好。",
          "留意今天你的机器人有哪一次反应错了：那就是一个可以带到第 6 周的问题。",
          "给你的套件充好电，或者把模拟器加入收藏夹。",
        ],
      },
    },
    {
      title: "调试与可靠性",
      subtitle: "查清机器人为什么不听话（是机械、程序还是传感器的问题），并证明它每一次都能跑好。",
      summary: "学生要把自己做出来的反应式机器人变得靠得住。他们会明白，调试就是弄清楚实际结果为什么和预期结果不一样，而问题一共分三大类：机械类（某个实体部件出了岔子）、程序类（指令写错了或漏了）和传感器类（读数、阈值或校准不对）。他们要在专门设计的调试任务里练手，认识变量和计数器这两样用来存放和跟踪数值的工具，还要做可靠性试验：把同一件任务做三遍，逐次记录预期与实际，用来证明机器人是真的管用。",
      mainMission: "诊断并修好机械、程序和传感器三类问题，然后用三次运行的测试证明机器人是可靠的。",
      estimatedTime: "70 至 85 分钟",
      learningGoals: [
        {
          text: "把调试解释成：弄清楚实际结果为什么和预期结果不一样",
        },
        {
          text: "从症状分辨出机械、程序和传感器三类问题",
        },
        {
          text: "在程序里用变量或计数器来存放或跟踪一个数值",
        },
        {
          text: "做一次可靠性试验：把同一件任务做三遍，并记录预期与实际",
        },
        {
          text: "诊断一台不听话的机器人，并说明该怎么修",
        },
      ],
      vocabulary: [
        {
          term: "调试",
          definition: "弄清楚机器人的实际结果为什么和预期结果不一样，然后把它修好，这整个过程就叫调试。",
        },
        {
          term: "变量",
          definition: "程序里一个有名字的存放处，里面的值在程序运行过程中可以改变。",
        },
        {
          term: "计数器",
          definition: "一个用来计数的变量：它从某个数字开始，每发生一次事情就加一。",
        },
        {
          term: "存放的值",
          definition: "程序放在变量里的一个数字或信息，方便日后取用或修改。",
        },
        {
          term: "校准值",
          definition: "你测出来并保存下来的一个数字，好让传感器的读数含义正确，比如白色地板的亮度值。",
        },
        {
          term: "预期结果",
          definition: "程序运行正确时「应该」发生的事，也就是你在测试之前作出的预测。",
        },
        {
          term: "实际结果",
          definition: "你真的把机器人跑起来之后「确实」发生的事，由你亲眼观察并记录下来。",
        },
        {
          term: "测试用例",
          definition: "你为了测试而特意布置出来的一个具体情境，比如「一堵正好在 15 厘米处的墙」。",
        },
        {
          term: "机械问题",
          definition: "机器人身体上的实体故障，比如轮子松了、线缆拖在地上，或者齿轮卡死了。",
        },
        {
          term: "程序问题",
          definition: "指令上的错误：某个积木块或数字写错了、漏掉了，或者顺序不对。",
        },
        {
          term: "传感器问题",
          definition: "感知环节出的岔子：读数不好、阈值不对，或者传感器需要重新校准。",
        },
        {
          term: "可靠性",
          definition: "机器人一遍又一遍正确完成同一件活儿的本事，靠反复试验来证明。",
        },
      ],
      prerequisites: [
        {
          reason: "你要调试的是第 5 周做出来的反应式机器人，它们用到了循环和条件。",
        },
        {
          reason: "传感器问题、阈值和校准，全都建立在第 4 周介绍的那些传感器之上。",
        },
      ],
      concepts: [
        {
          title: "调试到底是在做什么",
          body: [
            "每次运行程序，你脑子里都装着两个结果：预期结果（「应该」发生什么）和实际结果（「确实」发生了什么）。两者对得上，机器人就是正常的。对不上，就说明有问题，而调试就是那种查明它们为什么不一致的侦探工作。",
            "会调试的人不会瞎捣鼓机器人：他们把预期和实际摆在一起比对，仔仔细细看症状，并且每次只改一样东西，好弄清楚到底是哪一改起了作用。",
          ],
          examples: [
            "预期：在墙前停住。实际：撞上了墙。-> 有问题要查。",
            "预期：左转。实际：右转了。-> 拿积木块和你的本意对一对。",
          ],
        },
        {
          title: "问题的三大家族",
          body: [
            "问题一共分三大家族，能叫出是哪一族，事情就成了一半。机械问题是机器人身体上的实体故障：轮子松了、线缆拖在地上、齿轮打滑。程序问题是指令上的错误：数字写错、少了一块积木，或者积木顺序不对。传感器问题是感知上的毛病：读数不好、阈值设成了错误的数值，或者传感器该校准了。",
            "诀窍是先看症状、先猜家族。如果机器人每一次都以完全一样的方式出错，问题多半在程序里。如果它有时好使、有时不好使，那就怀疑是机械上的毛病，或者传感器读数不稳。",
          ],
          examples: [
            "机械：轮子松了，机器人往一边偏。",
            "程序：数字写错了，机器人转了 2 秒而不是 1 秒。",
            "传感器：距离阈值太小了，机器人怎么也不停。",
          ],
        },
        {
          title: "变量和计数器：存放并跟踪数值",
          body: [
            "有时候程序需要记住一个数字。变量就是一个有名字的小盒子，里面装着一个值，而这个值在程序运行时可以变。计数器是一种专门用来计数的变量：它从零开始，每发生一次事情就加一，比如机器人每躲开一个障碍物就加一。",
            "变量也用来存放校准值：那些你只测一次、然后保存起来的数字，好让传感器的读数含义正确。把一个值存起来，意味着你以后可以取用它、修改它、核对它，而不用靠猜。",
          ],
          examples: [
            "每躲开一个障碍物就加 1 的计数器。",
            "为白色地板的亮度存下来的一个校准值。",
            "一个记着循环已经跑了多少圈的变量。",
          ],
        },
        {
          title: "可靠性：用反复试验来证明",
          body: [
            "只成功过一次的机器人，说不定只是运气好。可靠性指的是一遍又一遍正确完成同一件活儿，而且没有证据你就不能这么宣称。证据就是可靠性试验：你把同一件任务跑好几遍，每一遍都用同样的测试用例，并且每一遍都写下预期结果和实际结果。",
            "如果三次运行都和你的预期一致，那么在这个测试用例上机器人就是可靠的。如果有一次跑得不一样，你就抓到了一个明明摆在眼前却没被发现的问题，而那次失败的运行，正是你需要的线索。",
          ],
          examples: [
            "从同一个起点把「在墙前停住」这件任务跑 3 遍，每一遍都记下来。",
            "预期三次都是「停住」；实际是「停住、停住、撞上」，说明第 3 次运行有问题。",
          ],
        },
      ],
      materials: [
        {
          name: "三次运行测试记录表（可打印）",
        },
        {
          name: "「问题侦探」活动纸，含三大问题家族（可打印）",
        },
        {
          name: "记录结果用的铅笔和纸",
        },
        {
          name: "第 5 周做的一台反应式机器人，至少带一个传感器",
        },
        {
          name: "卷尺或直尺，用来在每次运行时布置出同样的测试用例",
        },
        {
          name: "装有浏览器模拟器的电脑或平板",
        },
        {
          name: "前几周用过的纸板机器人、程序卡片和地板胶带赛道",
        },
        {
          name: "便利贴或计数表，用来当计数器",
        },
      ],
      activities: [
        {
          title: "「问题侦探」任务",
          goal: "诊断一台不听话的机器人：判断问题属于机械、程序还是传感器，然后把它修好。",
          shared: [
            "每个任务都先写下预期结果和实际结果。两者之间的差距，就是你要调查的症状。",
            "问一问三大家族的问题：这是实体故障（机械）、指令出错（程序），还是感知不准（传感器）？动手之前先靠症状猜一猜。",
            "每次只改「一样」东西，再跑一遍，并记下实际结果现在是不是和预期一致了。",
          ],
          variants: {
            kit: {
              title: "调试一台不听话的套件机器人",
              materials: [
                "第 5 周的一台反应式机器人",
                "「问题侦探」活动纸",
                "卷尺",
              ],
              instructions: [
                "请大人或同伴悄悄给一台本来好好的机器人埋一个问题（把轮子拧松、改掉某个积木块里的数字，或者把阈值设坏）。",
                "把机器人跑起来，在活动纸上写下预期结果和实际结果。",
                "根据症状判断问题属于哪一族，然后按顺序逐个排查最可能的原因。",
                "只动你怀疑的那一处，再跑一遍，确认实际结果现在和预期一致了。",
              ],
              safetyNotes: [
                "拧轮子或挪线缆之前，先把机器人关掉。",
                "运行过程中，手指要远离转动的部件。",
              ],
              expectedResult: "学生说出正确的问题家族，做出一处有针对性的修改，机器人的实际结果重新和预期一致。",
              successCriteria: [
                "预期结果和实际结果都写下来了",
                "正确判断出了问题家族",
                "每次只改了一样东西",
                "修改之后机器人能正常工作",
              ],
              troubleshooting: [
                {
                  problem: "一口气把「所有地方」都改了，结果不知道原因是哪一处",
                  fix: "把改动一个一个撤回，只留一处；改一样，跑一遍，看是不是就是它。",
                },
                {
                  problem: "拿不准问题属于哪一族",
                  fix: "跑三遍：每次错得一模一样，多半是程序；每次结果都不同，那就指向机械或者不稳的传感器。",
                },
              ],
              extension: "给同伴的机器人埋一个问题，看他能不能只凭症状就判断出是哪一族。",
            },
            simulator: {
              title: "在模拟器里调试一个坏掉的程序",
              materials: [
                "浏览器模拟器",
                "「问题侦探」活动纸",
              ],
              instructions: [
                "打开一个自带故意写坏的程序的模拟器任务（数字写错、少了一块积木，或者传感器阈值设坏了）。",
                "先预测预期结果，跑一遍，再记下实际结果。",
                "模拟器里不存在松掉的轮子，所以只需根据症状判断这是程序问题还是传感器阈值问题。",
                "改一块积木或一个数字，从同一个起点再跑一遍，确认两个结果现在对上了。",
              ],
              safetyNotes: [
                "没有安全隐患；需要的话让眼睛离开屏幕歇一会儿。",
              ],
              expectedResult: "学生认出这是程序问题还是传感器问题，只改一块积木或一个数值，机器人就按预期完成了任务。",
              successCriteria: [
                "预期结果和实际结果都记录下来了",
                "正确判断出了问题家族",
                "每次尝试只改了一块积木或一个数字",
                "修改之后任务成功了",
              ],
              troubleshooting: [
                {
                  problem: "循环永远结束不了",
                  fix: "这是程序类症状：检查「重复直到」的那个条件是不是真有机会变成真。",
                },
                {
                  problem: "机器人对墙毫无反应",
                  fix: "在模拟器里读一下传感器数值，看看阈值是不是落在它正确的那一侧：这是传感器问题。",
                },
              ],
              extension: "自己动手把一个好用的程序弄坏，然后让同学来找出这个问题并说出它属于哪一族。",
            },
            unplugged: {
              title: "在地板赛道上演一遍卡片程序并调试",
              materials: [
                "纸板机器人",
                "程序卡片",
                "地板胶带赛道",
                "「问题侦探」活动纸",
              ],
              instructions: [
                "请同伴往一份好用的卡片程序里塞一个问题（把两张卡对调、把「前进 2」改成「前进 4」，或者写一条错的「如果」规则），或者把机器人的纸质保险杠弄弯。",
                "先写下预期结果，然后一张卡一张卡地挪动模型来「运行」程序，并记下实际结果。",
                "判断家族：弯掉的保险杠是机械问题，对调或写错的卡片是程序问题，错的「如果」规则是传感器问题。",
                "只改一张卡或一个部件，再跑一遍，确认两个结果对上了。",
              ],
              safetyNotes: [
                "如果要重做保险杠，请使用儿童安全剪刀，并在大人陪同下进行。",
              ],
              expectedResult: "学生说出正确的问题家族，修好一张卡或一个部件，演出来的这一遍就和预期结果一致了。",
              successCriteria: [
                "预期结果和实际结果都写下来了",
                "正确判断出了问题家族",
                "每次只改一张卡或一个部件",
                "修改之后这一遍跑得通了",
              ],
              troubleshooting: [
                {
                  problem: "每次「运行」这个机器人的方式都不一样",
                  fix: "把每张卡都写成一条精确的指令，让实际结果可以重现：这样才找得出真正的问题。",
                },
                {
                  problem: "分不清是卡片的事还是保险杠的事",
                  fix: "把卡片一字不差地念出来；要是卡片没错，那问题就是机械上的。",
                },
              ],
              extension: "设计一个任务，同时藏进两个来自不同家族的问题。",
            },
          },
        },
        {
          title: "三次运行的可靠性试验",
          goal: "把同一件任务跑三遍，每一遍都把预期结果和实际结果对照，以此证明机器人是可靠的。",
          shared: [
            "挑一件明确的任务和一个测试用例（每一遍的布置都完全一样）。预期结果只写一次，因为三遍都一样。",
            "把任务跑三遍，两遍之间「什么都不许改」。逐次记下实际结果，并在「一致吗？」栏里标上是或否。",
            "三次都一致，就说明在这个测试用例上它是可靠的。只要有一次不一致，那就是个问题，用「问题侦探」的步骤去追。",
          ],
          variants: {
            kit: {
              title: "在套件机器人上做可靠性试验",
              materials: [
                "第 5 周的一台反应式机器人",
                "三次运行测试记录表",
                "卷尺",
              ],
              instructions: [
                "挑一件任务，比如「在墙前停住」，每一遍都把墙放在同样的距离上：这就是你的测试用例。",
                "写下预期结果：「机器人在碰到墙之前停住」。",
                "从完全相同的起点跑三遍，每一遍都记下实际结果和「一致吗？」。",
                "如果有哪一遍对不上，就诊断问题属于哪一族并修好，然后三遍重跑。",
              ],
              safetyNotes: [
                "保持测试区域通畅，并远离转动的部件。",
                "每一遍都把机器人放回同一条起跑线。",
              ],
              expectedResult: "一张填好的三次运行表格；可靠的机器人三遍都和预期结果一致。",
              successCriteria: [
                "三遍用的是同一个测试用例",
                "预期结果只写了一次",
                "记录了三个实际结果和对应的「一致吗？」",
                "任何不一致都追查了原因",
              ],
              troubleshooting: [
                {
                  problem: "三遍下来结果一点点地在漂",
                  fix: "检查电池和起始位置：电量渐渐不足，正是造成不可靠的一种机械或供电原因。",
                },
                {
                  problem: "对上了两次，第三次失手",
                  fix: "失手那一遍就是你的线索：那一遍刚跑完就立刻检查传感器读数和实体安装。",
                },
              ],
              extension: "再加第四遍和第五遍，看看电池越用越少时可靠性还撑不撑得住。",
            },
            simulator: {
              title: "在模拟器里做可靠性试验",
              materials: [
                "浏览器模拟器",
                "三次运行测试记录表",
              ],
              instructions: [
                "挑一个任务，每一遍都用同样的起点格和同样的地图：这就是你的测试用例。",
                "运行之前先写下预期结果。",
                "程序一点都不改，连跑三遍，每一遍都记下实际结果和「一致吗？」。",
                "如果有哪一遍跑得不一样，就找出那个程序问题或传感器问题，然后三遍重跑。",
              ],
              safetyNotes: [
                "常常保存你的成果，免得刷新页面把记录弄丢。",
              ],
              expectedResult: "一张填好的三次运行表格，显示模拟器里的机器人每一遍表现是不是都一样。",
              successCriteria: [
                "三遍用的是同样的起点和同样的地图",
                "预期结果只写了一次",
                "记录了三个实际结果和对应的「一致吗？」",
                "任何不一致都追查了原因",
              ],
              troubleshooting: [
                {
                  problem: "明明什么都没改，几遍跑出来却不一样",
                  fix: "检查起点格是不是真的一模一样，以及循环是靠一个明确的条件结束的，而不是碰运气结束的。",
                },
                {
                  problem: "每一遍都对得严丝合缝，感觉太容易了",
                  fix: "换一个更难的测试用例（墙更近、弯更急），看看可靠性在哪里开始崩。",
                },
              ],
              extension: "把测试用例换成更难的，再做三次试验，找出它的极限在哪儿。",
            },
            unplugged: {
              title: "用卡片程序做可靠性试验",
              materials: [
                "纸板机器人",
                "程序卡片",
                "地板胶带赛道",
                "三次运行测试记录表",
              ],
              instructions: [
                "挑一件任务，并在地板赛道上定一个固定的起点：每一遍都用这同一个测试用例。",
                "写下预期结果，比如「模型停在终点格上」。",
                "让同一位同伴把完全相同的卡片「运行」三遍，每一遍都记下实际结果和「一致吗？」。",
                "如果有两遍对不上，说明步骤含糊或者某张卡写错了：改好之后三遍重跑。",
              ],
              safetyNotes: [
                "保持地板赛道通畅，免得有人绊倒。",
              ],
              expectedResult: "一张填好的三次运行表格；可靠的卡片程序三遍都会把模型送到同一个位置。",
              successCriteria: [
                "三遍用的是同样的起点和同样的卡片",
                "预期结果只写了一次",
                "记录了三个实际结果和对应的「一致吗？」",
                "任何不一致都追查了原因",
              ],
              troubleshooting: [
                {
                  problem: "换个人来跑，终点就不一样",
                  fix: "把卡片重写成精确、没有歧义的步骤，好让实际结果能够重现。",
                },
                {
                  problem: "同一个人跑出来的终点也不一样",
                  fix: "把起点位置和步幅都标出来，让测试用例每一遍都真正一模一样。",
                },
              ],
              extension: "和另一组交换卡片程序，拿对方的程序做一次三遍的可靠性试验。",
            },
          },
        },
        {
          title: "障碍物计数器",
          goal: "用一个变量当计数器，机器人每躲开一个障碍物就加一，最后再把这个存放的值读出来。",
          shared: [
            "开头先把计数器变量设成 0。机器人每感知到并躲开一个障碍物，就给计数器加 1。",
            "这就是一个存放的值：计数器记着一共处理了多少个障碍物，你在最后可以查看它。",
            "先预测赛道上有几个障碍物，再把你的预测和计数器的最终值对照一下。",
          ],
          variants: {
            kit: {
              title: "用套件机器人数一数躲开的障碍物",
              materials: [
                "第 5 周的一台反应式机器人",
                "一段短的障碍赛道",
                "铅笔和纸",
              ],
              instructions: [
                "在程序开头，把一个叫「障碍物」的变量设成 0。",
                "保留一个读取传感器的循环；在「如果有障碍物」那一支里，既转弯躲开，也给「障碍物」加 1。",
                "跑完整条赛道，然后显示或读出计数器的最终值。",
                "把计数器和你实际摆放的障碍物数量对照一下。",
              ],
              safetyNotes: [
                "机器人行驶时，让赛道上别有手和脚。",
              ],
              expectedResult: "计数器的最终值等于机器人真正躲开的障碍物数量。",
              successCriteria: [
                "计数器从 0 开始",
                "只有躲开障碍物时才加 1",
                "读出了最终存放的值",
                "把它和真实数量作了对照",
              ],
              troubleshooting: [
                {
                  problem: "计数器数出来太多了",
                  fix: "机器人对同一个障碍物加了不止一次 1：要保证每检测到一次才计一次数，而不是每绕一圈循环就计一次。",
                },
                {
                  problem: "计数器一直停在 0",
                  fix: "检查加 1 这一步是不是在「如果有障碍物」那一支里面，而不是在外面：这是程序问题。",
                },
              ],
              extension: "再加一条规则：计数器到了 3 以后，机器人就停下来并发出完成的信号。",
            },
            simulator: {
              title: "在模拟器里数一数躲开的障碍物",
              materials: [
                "浏览器模拟器",
                "铅笔和纸",
              ],
              instructions: [
                "用一个设置变量的积木块，在开头把「障碍物」设成 0。",
                "在循环里读取传感器；一检测到障碍物，就转弯躲开并给「障碍物」加 1。",
                "跑一遍网格任务，最后读出计数器。",
                "把计数器和网格上障碍物的数量对照一下。",
              ],
              safetyNotes: [
                "没有安全隐患。",
              ],
              expectedResult: "计数器等于模拟器里机器人在网格上躲开的障碍物数量。",
              successCriteria: [
                "有一个设置变量的积木块把计数器起始设为 0",
                "每躲开一个障碍物就加 1",
                "读出了最终值",
                "它和网格上的障碍物数量对得上",
              ],
              troubleshooting: [
                {
                  problem: "计数器数多了",
                  fix: "只要还挨着同一个障碍物，加 1 就每圈触发一次；应该每检测到一个「新的」才计一次。",
                },
                {
                  problem: "计数器一直不变",
                  fix: "确认加 1 的积木块在传感器条件里面，而不是在光秃秃的循环里。",
                },
              ],
              extension: "再存一个变量记录「转弯次数」，拿它和障碍物计数器比一比。",
            },
            unplugged: {
              title: "用画正字的方式数一数躲开的障碍物",
              materials: [
                "纸板机器人",
                "程序卡片",
                "地板赛道上的障碍物",
                "计数表或便利贴",
              ],
              instructions: [
                "在程序卡片最上面写下「计数器 = 0」，并用一张计数表来充当那个存放的值。",
                "「运行」模型的过程中，每当「如果保险杠碰到障碍物就转弯」这张卡被触发，就画一笔。",
                "最后数一数这些笔画：那就是计数器存放的值。",
                "把这个数和你摆放的障碍物数量对照一下。",
              ],
              safetyNotes: [
                "保持地板赛道通畅，免得有人被障碍物绊倒。",
              ],
              expectedResult: "画正字数出来的结果，和模型躲开的障碍物数量一致。",
              successCriteria: [
                "计数器从 0 开始",
                "每躲开一个障碍物就画一笔",
                "最终的笔画数被当作存放的值读了出来",
                "它和真实数量对得上",
              ],
              troubleshooting: [
                {
                  problem: "笔画画得太多了",
                  fix: "只有「转弯躲开」那张卡真的被触发时才画一笔，而不是每走一步都画。",
                },
                {
                  problem: "忘了把计数器清零",
                  fix: "每开始新的一遍，都要先把计数器归 0：存放的值必须从头开始。",
                },
              ],
              extension: "再加一张规则卡：「如果计数器 = 3，就停」，检验一下存放的值能不能触发一个动作。",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "做三次运行的可靠性试验之前，先预测哪一遍（如果有的话）会和预期结果对不上，以及为什么。",
          howToCheck: "把三遍都跑完，记下实际与预期以及「一致吗？」，再把你的预测和真实情况对照。",
        },
        {
          prompt: "碰机器人之前先看「问题侦探」上的症状：预测这个问题属于哪一族，是机械、程序还是传感器。",
          howToCheck: "把可能的原因逐个排查，看看你预测的那一族是不是最终解决问题的那一族。",
        },
        {
          prompt: "对于障碍物计数器，在跑赛道之前先预测最终存放的值会是多少。",
          howToCheck: "跑完赛道，读出计数器，再把它和你预测的数字以及真实的障碍物数量对照。",
        },
      ],
      testRecords: [
        {
          title: "三次运行的可靠性测试",
          instructions: "挑一件任务和一个测试用例。预期结果只写一次，然后什么都不改，把同一件任务跑三遍。逐次记下实际结果，以及这一遍对没对上。",
          columns: [
            null,
            "预期结果",
            "实际结果",
            "一致吗？（是/否）",
          ],
          measure: "三遍里，每一遍的实际结果是否和预期结果一致",
        },
        {
          title: "问题诊断记录",
          instructions: "每个调试任务都记下症状、你怀疑的问题家族、你尝试的那一处改动，以及它有没有把差异解决掉。",
          columns: [
            "症状",
            "怀疑的家族",
            "尝试的那一处改动",
            "修好了吗？（是/否）",
          ],
          measure: "到底是哪一族的问题，以及一处有针对性的改动有没有把它修好",
        },
      ],
      debuggingMissions: [
        {
          title: "在原地打转的机器人",
          scenario: "一台本该笔直向前开的机器人，却在原地打转，一圈一圈地转个不停，就好像一个轮子往前、另一个轮子往后。",
          symptom: "两个电机都在转，机器人却在原地旋转而不是往前走，而且每一遍都朝同一个方向转。",
          hint: "盯着轮子看：两个都在转，但方向相反，而且什么都没松。想一想其中一个电机是怎么接线或怎么设置的，别去想那些行驶指令。",
          likelyCauses: [
            "有一个电机接反了，所以它的轮子转错了方向。",
            "有一个电机的方向设置和另一个是反的。",
            "两个电机是镜像安装的，程序却把它们当成朝同一个方向来驱动。",
          ],
          fix: "把接反的那个电机的接线换过来（或者把那一个电机的方向设置翻过来），让两个轮子一起往前转。再跑一遍，确认机器人现在是笔直向前，而不是原地打转。",
        },
        {
          title: "那堵它不肯停下的墙",
          scenario: "一台机器人本该往前开，等距离传感器说墙近了就停下，可它却一头撞上墙，还一个劲儿往前顶，从来不停。",
          symptom: "每一遍机器人都不停：实际结果就是撞车，尽管程序里确实写着一条停止指令。",
          hint: "传感器读得好好的，停止积木块也在。把循环里那个比较条件大声念出来：随着墙越来越近，那个本该让机器人停下的条件，究竟有没有变成真过？",
          likelyCauses: [
            "比较写反了：它在距离「大于」某值时才停，而不是「小于」，所以机器人越靠近，这个条件反而永远不成立。",
            "比较式的两边写反了。",
            "用错了运算符（本该是 < 却写成了 >），让停止条件永远触发不了。",
          ],
          fix: "把比较运算符反过来（或者把它两边互换），好让距离变小时停止条件变成真。再跑一遍，确认机器人在墙前停住了。",
        },
        {
          title: "数过头的计数器",
          scenario: "一台机器人开过三个标记，本该报出 3，却报了一个像 47 这样的大数。",
          symptom: "计数器的最终值比真实物体的数量大得多：它每绕一圈循环就往上涨，而不是每个物体只涨一次。",
          hint: "一边开一边盯着计数器往上跳。它是每个物体加 1 一次，还是每绕一圈循环就加一次，哪怕前面根本没有新的物体？",
          likelyCauses: [
            "「加 1」写在了「我看见物体了吗？」这个判断的外面，所以每绕一圈都会计数。",
            "每一遍开始时都没有把计数器清零。",
            "机器人在同一个物体旁边待了好几圈，每一圈都把它数了一遍。",
          ],
          fix: "在开头把计数器清零，并把「加 1」挪到检测到「新」物体的那个条件里面。再跑一遍，确认最终计数和真实的物体数量一致。",
        },
        {
          title: "一到亮处就失灵的循线机器人",
          scenario: "一台循线机器人昨天跑得好好的。今天换到一个明亮得多的房间，它每次都径直开出线外，而程序压根没动过。",
          symptom: "机器人对线视而不见，完全不修正方向，尽管同样的代码在昨天的光线下修正得好好的。",
          hint: "代码和昨天一模一样；变的是房间。今天把线上和线外的实时光线数值都读一读，再把这两个数和程序里的阈值比一比。",
          likelyCauses: [
            "光线阈值是照着昨天那个更暗的房间校准的，现在不适用了。",
            "更强的光线把所有读数都抬到了阈值以上，于是「在线上」这个判断永远不成立。",
            "传感器没有针对今天的光线条件重新校准。",
          ],
          fix: "读出今天线上和线外的光线数值，在两者正中间挑一个新阈值，把这个校准值存下来，再跑一遍。机器人应该又能循线了。",
        },
        {
          title: "永远跑不完的机器人",
          scenario: "一台机器人本该往前开、躲开几个障碍物，然后在终点停下，可它一直开、一直躲，永远不结束，就算已经到了终点也不停。",
          symptom: "机器人从来不结束程序：它没完没了地重复着躲避加行驶的行为，一直不停。",
          hint: "躲避这件事本身是好使的。问题在于机器人永远出不了那个循环。找一找出口：有没有哪个条件能在到达终点后结束这个循环？",
          likelyCauses: [
            "这段行为被放进了一个没有出口的无限循环里。",
            "某个「重复直到」的条件永远不可能变成真。",
            "到达终点时既没有「安全停车」，也没有「任务完成」。",
          ],
          fix: "给它加一个出口：用一个在终点结束的「重复直到」，或者一句「如果到了终点就停」，让循环有机会结束。再跑一遍，确认机器人一到终点就停下。",
        },
        {
          title: "代码没毛病，却还是往一边跑偏",
          scenario: "一台机器人的程序是对的，也没改过（上周它还是直着走的），可现在只要一往前开就往一边打弯，哪怕是一段又短又没有障碍物的路。",
          symptom: "机器人不走直线，每一遍都朝同一边跑偏，虽说代码一个字都没改。",
          hint: "它每一遍都以同样的方式出错，可上周就已经证明程序是对的。动代码之前，先看看机器人的机身和轮子，或者模拟环境里的路面和安装设置。",
          likelyCauses: [
            "某个轮子或车轴松了，或者没完全插到位。",
            "有一根线缆或某个部件在一侧拖着地面，或者有个轮子蹭到了车架。",
            "在模拟器里，某项路面或对齐设置让一侧发生了打滑。",
          ],
          fix: "别动代码。把两个轮子重新装好、拧紧，清掉任何拖地的线缆或碎屑（模拟环境里则把路面和对齐设置复位）。再跑一遍，确认它又能走直线了。",
        },
        {
          title: "刹得太晚的那一脚",
          scenario: "一台机器人用距离传感器在墙前刹车。慢速时它停得干干净净，可一旦提速就冲过头撞到墙上，而阈值一模一样没变过。",
          symptom: "高速时机器人停得太晚，撞上了墙；低速时同一个程序却能及时停住。",
          hint: "慢的时候够用的阈值，快起来就不够了：两次读数之间机器人跑得更远。想一想速度和刹车阈值是怎样互相配合的，而且每次只改其中一个。",
          likelyCauses: [
            "高速时机器人在两次读数之间跑得更远，所以一个贴得很近的阈值触发得太晚。",
            "阈值是照着比现在更慢的速度调出来的。",
            "传感器读取的频率太低，在这个速度下来不及发现墙。",
          ],
          fix: "每次只改一样：要么把行驶速度降下来，要么把距离阈值调大好让它更早刹车。用目标速度再跑一遍，确认它能及时停住。",
        },
      ],
      knowledgeCheck: {
        instructions: "回答这几题，检验一下你能否按家族给问题定性，并证明一台机器人是可靠的。",
        questions: [
          {
            prompt: "诊断一下最可能是哪一类问题。",
            scenario: "一台循线机器人昨天还好好的。今天它每次都径直冲过了那条线，可代码根本没改过。今天房间亮得多。",
            options: [
              {
                text: "程序问题",
                feedback: "代码没改过，所以问题多半不在程序上。",
              },
              {
                text: "需要重新校准的传感器问题",
                feedback: "对了：更亮的光线改变了读数，所以光线阈值需要重新校准。",
              },
              {
                text: "机械问题",
                feedback: "题目里没有任何线索指向轮子松动或部件拖地。",
              },
              {
                text: "机器人彻底坏了",
                feedback: "只要针对新的光线重新校准传感器，很可能就修好了。",
              },
            ],
            explanation: "同样的代码，加上变了的光线，再加上不对劲的读数，指向的是传感器与校准的问题，而不是程序或机械问题。",
          },
          {
            prompt: "什么是调试？",
            options: [
              {
                text: "让机器人跑得更快",
                feedback: "速度和调试没关系：调试是找出某件事为什么出岔子并把它修好。",
              },
              {
                text: "弄清楚实际结果为什么和预期结果不一样，然后把它修好",
                feedback: "对了：调试就是把预期和实际比对，并追查这个差距的原因。",
              },
              {
                text: "把整个程序删掉重写",
                feedback: "推倒重来是把问题藏起来，而不是找出来，而且你很可能会再犯同样的错。",
              },
              {
                text: "给机器人多装几个传感器",
                feedback: "问题都还没诊断出来，多装传感器也修不好它。",
              },
            ],
            explanation: "调试是那种侦探工作：找出实际结果为什么和预期结果不一样，然后把那个原因解决掉。",
          },
          {
            prompt: "一台机器人上周还走直线。它的程序没改过，可现在每一遍都往一边打弯。这最可能属于哪一族问题？",
            options: [
              {
                text: "程序问题",
                feedback: "程序没改过，所以指令多半不是原因。",
              },
              {
                text: "传感器问题",
                feedback: "直行时跑偏，通常跟传感器读数没什么关系。",
              },
              {
                text: "机械问题",
                feedback: "正确：轮子松了或部件拖地，是造成跑偏的实体（机械）原因。",
              },
              {
                text: "根本没有问题",
                feedback: "实际结果和预期结果对不上，所以确实有问题要查。",
              },
            ],
            explanation: "代码没改过，机器人却总往同一边偏，那就怀疑机械问题，比如轮子松了或线缆拖地。",
          },
          {
            prompt: "什么是计数器？",
            options: [
              {
                text: "一种测量距离的传感器",
                feedback: "那是距离传感器，不是计数器。",
              },
              {
                text: "一个从某个数字开始、每发生一次事情就加一的变量",
                feedback: "对了：计数器就是一个用来计数的变量，每发生一次事件就加 1。",
              },
              {
                text: "一个让机器人停下来的积木块",
                feedback: "那是停止积木块；计数器保存的是一个不断累加的总数。",
              },
              {
                text: "机器人的电量",
                feedback: "电量不是你在程序里自己设定的计数器。",
              },
            ],
            explanation: "计数器是一个保存累计数目的变量：它从某个数字开始，每发生一次事件就加一。",
          },
          {
            prompt: "在可靠性试验里，「预期结果」指的是什么？",
            options: [
              {
                text: "你把机器人跑起来之后实际发生的事",
                feedback: "那是实际结果：跑完之后你观察到的东西。",
              },
              {
                text: "程序运行正确时「应该」发生的事",
                feedback: "正确：预期结果就是你在测试之前预测应该发生的事。",
              },
              {
                text: "机器人身上传感器的数量",
                feedback: "那是零件的数量，不是一次运行的预期结果。",
              },
              {
                text: "可能跑出来的最快时间",
                feedback: "速度不是预期结果，除非你测的正好就是速度。",
              },
            ],
            explanation: "预期结果是应该发生的事；你每跑一遍都拿它和实际结果对照，看机器人可不可靠。",
          },
          {
            prompt: "在可靠性试验里，为什么要把同一件任务跑三遍？",
            options: [
              {
                text: "为了证明机器人一遍又一遍都能行，而不是碰巧成功了一次",
                feedback: "没错：可靠性就是反复正确地完成这件活儿，而三次一致的运行就是证据。",
              },
              {
                text: "因为前两遍只是练手",
                feedback: "每一遍都是真实数据；三遍都要记录、都要比对。",
              },
              {
                text: "为了让电池更快耗光",
                feedback: "重点是拿出可靠性的证据，不是耗电。",
              },
              {
                text: "因为只跑一遍是违规的",
                feedback: "这不是什么规定：只是一遍根本没法像多遍那样证明可靠性。",
              },
            ],
            explanation: "反复一致的运行才能证明可靠性；如果某一遍的实际结果和预期结果对不上，你就找到了一个要修的问题。",
          },
        ],
      },
      reflection: [
        {
          prompt: "有哪一处改动，你是因为测试过才改的，而不是靠猜的？",
        },
        {
          prompt: "把任务跑三遍，跟只跑一遍相比，让你对自己的机器人多知道了些什么？",
        },
        {
          prompt: "为什么每次只改一样东西会让调试更容易？你这么做的时候，出了什么岔子（或者顺利在哪儿）？",
        },
      ],
      journalPrompts: [
        {
          prompt: "把你的三次运行可靠性表格填完整：预期结果，以及每一遍的实际结果和「一致吗？」。",
        },
        {
          prompt: "挑一个调试任务，写下症状、问题所属的家族，以及那一处把它修好的改动。",
        },
        {
          prompt: "记下你的障碍物计数器最终存放的值，以及它和真实障碍物数量比起来如何。",
        },
      ],
      savedPrograms: [
        {
          title: "障碍物计数器程序",
          description: "一个把计数器设为 0、用循环读取传感器、每躲开一个障碍物就给计数器加 1 的程序。",
        },
        {
          title: "修好坏掉的刹车",
          description: "这个程序本该让机器人停在墙前的那一格，可它距离判断里的一个数值写错了，导致它停错了地方。先预测问题属于哪一族，改动「重复直到」条件里的那一个数值，然后反复运行直到它停对为止。",
        },
      ],
      simulatorMissions: [
        {
          title: "修好坏掉的刹车",
          objective: "机器人停错了地方，因为它距离判断里的数值差了一格。诊断这是程序问题还是传感器阈值问题，并改动那一个数值，让它停在墙前的那一格。",
          successCriteria: [
            "机器人停在紧挨着墙的那一格里",
            "只改动了一个数值",
            "学生说出了问题所属的家族",
          ],
        },
        {
          title: "边数边躲",
          objective: "开过一片布满障碍物的网格，逐个躲开，并用一个计数器，让它最后正好等于躲开的障碍物数量。",
          successCriteria: [
            "机器人躲开了每一个障碍物",
            "计数器从 0 开始，每躲开一个障碍物就加 1",
            "最终的计数和障碍物数量一致",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "调试与三大问题家族",
          focus: "预期结果与实际结果，以及机械、程序和传感器三类问题。",
        },
        {
          title: "预测问题属于哪一族",
          focus: "先读每一个症状，在动手排查之前先预测它属于哪一族。",
        },
        {
          title: "「问题侦探」任务",
          focus: "诊断并修好机械、程序和传感器三类问题，每次只改一样。",
        },
        {
          title: "障碍物计数器",
          focus: "用一个变量当计数器，跟踪躲开了多少障碍物。",
        },
        {
          title: "三次运行的可靠性试验",
          focus: "把同一件任务跑三遍，记录预期与实际以及「一致吗？」。",
        },
        {
          title: "知识检测",
          focus: "关于调试、问题家族、计数器和可靠性的五道题。",
        },
        {
          title: "反思",
          focus: "写一写你找到的一个问题，以及那三遍运行让你明白了什么。",
        },
      ],
      safetyNotes: [
        {
          text: "拧轮子、挪线缆或检查机械部件之前，先把机器人关掉。",
        },
        {
          text: "运行过程中，让测试区和障碍赛道上别有手、脚和杂物。",
        },
        {
          text: "如果要重做纸质保险杠或模型部件，请使用儿童安全剪刀，并在大人陪同下进行。",
        },
        {
          text: "常常保存你的程序和测试记录，免得刷新浏览器把结果弄丢。",
        },
      ],
      printableResources: [
        {
          title: "三次运行可靠性测试记录表",
          description: "一张表格，用来填写预期结果，以及三次运行各自的实际结果和「一致吗？」。",
        },
        {
          title: "「问题侦探」表",
          description: "一份三大问题家族的对照指南，并留出空间记录症状、怀疑的家族、尝试的那一处改动和最终的解决办法。",
        },
        {
          title: "调试与计数器日志页",
          description: "留出空间记录一个诊断出来的问题，以及障碍物计数器最终存放的值。",
        },
        {
          title: "第 6 周教师指南",
          description: "针对调试与可靠性这一课的课前准备、怎样埋设问题、课堂组织、常见误解和提问建议。",
        },
      ],
      completion: {
        summary: "完成第 6 周：分别诊断出一个机械问题、一个程序问题和一个传感器问题，做一次三次运行的可靠性试验，并通过知识检测。",
        requirements: [
          {
            label: "每一族至少诊断并修好一个问题，并记录症状和解决办法",
          },
          {
            label: "完成一次三次运行的可靠性试验，并记录预期与实际",
          },
          {
            label: "用一个计数器变量跟踪躲开的障碍物",
          },
          {
            label: "知识检测至少答对 5 题中的 4 题",
          },
          {
            label: "写下你的反思",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "为每位学生或每组打印三次运行测试记录表和「问题侦探」表。",
          "把上周那些反应式机器人（或模拟器任务、卡片程序）准备好，随时可以拿来调试。",
          "布置一个可重复的测试用例：划出起跑线，并固定墙或障碍物的距离，让每一遍运行都真正一模一样。",
        ],
        prep: [
          "提前每一族各埋一个问题：把轮子拧松（机械）、改掉一个转向数字（程序）、把阈值设坏（传感器）。",
          "练一练在你的套件或模拟器里读取实时传感器数值，这样才好指导学生调整阈值。",
          "想好在你们的设备上学生要怎样给计数器「加 1」，并自己先把障碍物计数器程序跑一遍。",
        ],
        facilitation: [
          "在碰任何机器人之前，先讲清楚预期与实际的区别，以及三大问题家族。",
          "让学生先根据症状预测问题属于哪一族，再动手排查；别让他们瞎捣鼓。",
          "坚持每次只改一样、然后重跑一遍，这样才知道到底是什么把问题解决的。",
          "给完整的三次运行可靠性试验留出时间；碰巧成功的一次算不上证据。",
        ],
        commonMisconceptions: [
          "「跑通过一次，就算修好了」：可靠性需要多次一致的运行，而不是一次。",
          "以为所有问题都出在代码里：很多其实是机械问题（轮子松、线缆拖地）或传感器问题（阈值不对）。",
          "一次改好几样，结果谁也说不清到底是哪一改起了作用。",
          "以为变量和计数器是两码事：计数器不过就是一个拿来计数的变量。",
        ],
        questionsToAsk: [
          "你原本预期会发生什么？实际又发生了什么？",
          "它是每一遍都以同样的方式出错，还是只是偶尔？这说明它属于哪一族？",
          "你改动的那「一样」东西是什么？它和你的预测对上了吗？",
          "你凭什么说你的机器人是可靠的，而不是碰巧走运？",
        ],
        easierVersion: "一次只给学生一个埋好的问题，并直接告诉他们属于哪一族，让他们专心练习修复和三次运行测试，不必同时去判断家族。",
        harderVersion: "同时埋下两个来自不同家族的问题，或者要求做一个能触发动作的计数器（比如躲开 3 个障碍物后就停），并且这个功能同样要经受可靠性测试。",
      },
      nextWeek: {
        teaser: "下周我们要把可靠性用起来：规划一次完整的自主任务，让机器人自己安全地跑完全程。",
        prepare: [
          "保存好你的三次运行测试记录和「问题侦探」表：可靠的行为正是下周那项任务的基础。",
          "想一想有什么活儿，是你的机器人能从头到尾自己做完、不需要任何人操控的。",
          "给你的套件充好电、把模拟器加入收藏夹，或者把你的纸板机器人和赛道准备好。",
        ],
      },
    },
    {
      title: "规划一次自主任务",
      subtitle: "把一件真实的活儿变成一份方案：需求、约束、流程图，以及一次安全的自主任务。",
      summary: "学生要学的是：工程师在动手造之前，是怎样规划机器人这份活儿的。他们先分清自主系统（靠传感器和程序自己作决定）和遥控系统（由人来操控），然后为一项任务写下需求、约束和评判标准，并权衡其中的取舍。他们要画出自主程序的流程图，用矩形表示动作、菱形表示判断，其中还包括一次安全停车；最后跑一次简短的引导练习任务，为下周的结业项目预演。",
      mainMission: "用需求、约束和一张流程图规划一次自主任务，再用一次简短的引导练习任务把它排演一遍。",
      estimatedTime: "60 至 75 分钟",
      learningGoals: [
        {
          text: "说明自主系统和遥控系统的区别",
        },
        {
          text: "为一项机器人任务写下需求、约束和成功标准",
        },
        {
          text: "描述机器人方案中的一处取舍，并用工程设计流程作出选择",
        },
        {
          text: "画出自主程序的流程图，包含动作方框、判断菱形和一次安全停车",
        },
        {
          text: "跑一次简短的引导自主任务，并把结果与它的成功标准对照",
        },
      ],
      vocabulary: [
        {
          term: "自主",
          definition: "靠自己行动：机器人用传感器和程序决定该做什么，不需要有人操控。",
        },
        {
          term: "遥控",
          definition: "由人实时地、一步步地操控，比如用摇杆或手机应用。",
        },
        {
          term: "需求",
          definition: "机器人「必须」做到、才算完成任务的事，比如「到达卸货区」。",
        },
        {
          term: "约束",
          definition: "你必须在里面施展的限制条件，比如时间、尺寸、材料或预算。",
        },
        {
          term: "评判标准",
          definition: "你用来判断成败的尺度，比如「在离墙 5 厘米以内停住」或者「30 秒内跑完」。",
        },
        {
          term: "取舍",
          definition: "放弃一点某样好东西，去换来更多的另一样，比如开慢一点来换取更可靠。",
        },
        {
          term: "工程设计流程",
          definition: "工程师们反复走的那个循环：规划、制作、测试、改进。",
        },
        {
          term: "迭代",
          definition: "在设计循环里走完的一圈：测试你的方案或机器人，找出问题，再把它改好。",
        },
        {
          term: "效率",
          definition: "用更少的东西把活儿干好：更少的步骤、更短的时间，或者更少的能量。",
        },
        {
          term: "安全停车",
          definition: "一段编好的行为，在任务完成或者有东西挡路时，让机器人安全地停下来。",
        },
        {
          term: "负责任的机器人技术",
          definition: "多想想安全，也想想什么时候该由人、而不是机器人来掌控。",
        },
        {
          term: "流程图",
          definition: "程序的分步示意图，用方框表示动作、用菱形表示判断。",
        },
      ],
      prerequisites: [
        {
          reason: "任务方案得写明机器人拿哪个传感器当输入，这在第 4 周介绍过。",
        },
        {
          reason: "流程图和练习任务都要用循环和条件来对外界作出反应，这是第 5 周教的。",
        },
        {
          reason: "用成功标准来评判方案、并且不止跑一遍，靠的是第 6 周养成的可靠性与测试习惯。",
        },
      ],
      concepts: [
        {
          title: "自主与遥控",
          body: [
            "机器人干活有两种方式。遥控的时候，是人实时操控它，每一个动作都由人来决定。自主的时候，机器人跑自己的程序，靠传感器自己作决定，没有人在操控。",
            "这一周讲的是自主任务，因为下周你要造一台必须自己完成工作的机器人。这意味着所有的判断都得提前规划好，并写进程序里。",
          ],
          examples: [
            "自主：扫地机器人、按预定路线行驶的火星车、人行道上的送货机器人",
            "遥控：遥控汽车、用摇杆操控的航拍无人机、由人看着画面驾驶的救援机器人",
          ],
        },
        {
          title: "需求、约束和评判标准",
          body: [
            "动手之前先规划。需求是机器人「必须」做到的事：「把方块送到蓝色区域」。约束是你必须在里面施展的限制：「30 秒之内」「只能用一个传感器」「不能比一个鞋盒大」。评判标准是你判断成败的方式：「停在区域之内」以及「一次也没撞到墙」。",
            "先把这些写下来，方案才不会含糊其辞。如果你都说不清机器人到底有没有把活儿干成，那说明你的标准还不够明确。",
          ],
          examples: [
            "需求：「找到目标并停下」",
            "约束：「一分钟之内完成」",
            "标准：「在离目标 5 厘米以内停住」",
          ],
        },
        {
          title: "取舍与工程设计流程",
          body: [
            "好处几乎不可能一次全占。取舍就是放弃一点这个，去换更多的那个。跑得快的机器人可能来不及读传感器就撞上；把它放慢，就是用速度换可靠性。往往没有唯一「正确」的答案：你要挑一个最贴合自己需求和约束的取舍。",
            "工程师用工程设计流程来应付这件事：规划、制作、测试、改进，然后再来一轮。每走完一圈就是一次迭代。你还要考虑效率：在不打破标准的前提下，用更少的步骤、更短的时间或更少的能量把活儿干完。",
          ],
          examples: [
            "快 对 稳",
            "程序简单 对 能应付更多障碍",
            "步骤更少（效率高）对 检查更仔细",
          ],
        },
        {
          title: "流程图：先把程序画出来，再动手写",
          body: [
            "流程图就是把你程序的步骤画成一张图。动作写在矩形里（「向前走」「停」）。判断写在菱形里，提一个是或否的问题（「前面有墙吗？」），「是」和「否」各引出一条箭头。箭头把各个方框连起来，你就能顺着看出机器人要走的路。",
            "先画流程图，你就能在动手之前发现问题。一张好的自主流程图，总是包含一个不停查看传感器的循环，以及一个明确的收尾，而那正是安全停车该待的地方。",
          ],
          examples: [
            "矩形 = 动作",
            "菱形 = 一次是或否的判断",
            "箭头 = 步骤的先后顺序",
          ],
        },
        {
          title: "安全停车与负责任的机器人技术",
          body: [
            "自主机器人是自己作决定的，所以它需要一种安全停下来的办法：一段编好的行为，在任务完成或者有东西（或有人）挡路时把它停住。没有安全停车，自主机器人可能会一直往墙上或人身上撞。",
            "这正是负责任的机器人技术的一部分：多想想安全，也想想什么时候该由人来掌控。自主机器人特别擅长枯燥重复的活儿，但只要涉及风险（靠近人群，或者一旦出错就可能伤到人），就得有人能监督、能接管、能一键关停。",
            "负责任的设计者还会考虑隐私：带摄像头或麦克风的机器人会收集关于人的信息，所以只收集这份工作真正需要的那些。他们会为失败做好打算：万一系统坏了，谁来负责？它出故障时会安全地停下来，还是照样往前冲？他们也会判断，哪些活儿机器人只该协助人、而不该独自掌控：机器人可以给护士递一件器械，但医疗判断得由人来作。",
            "最后，好的机器人在设计时会顾及不同的用户和需求：使用者可能年幼也可能年长，可能读不懂同一种语言，也可能需要更大的按钮、声音或灯光。为真实而多样的人去设计，本身就是负责任地做机器人的一部分。",
          ],
          examples: [
            "扫地机器人在楼梯边缘停下并后退",
            "有人走到前面时，送货机器人会暂停",
            "测试时有人把手放在停止按钮旁边随时待命",
            "家用机器人只录它需要的内容，而且录之前会先征求同意",
            "警示同时用灯光和声音，好让更多人能注意到",
          ],
        },
        {
          title: "现实世界里的自主机器人",
          body: [
            "自主机器人已经在干实实在在的活儿了，而且几乎都是枯燥、脏累或危险的活儿，也几乎都有人在旁边监督。看看真实的例子，有助于你规划自己的任务：每一个都在感知世界、用程序作决定、然后行动，而且都有一种安全停下来的办法。",
            "读这些例子时，留意第 1 周那个模式：输入（传感器）、处理（判断）、输出（动作），再加上一次安全停车和一个随时能介入的人。",
          ],
          examples: [
            "仓库配送机器人把货架送到工人面前，同时感知其他机器人以免相撞",
            "火星车自己走完规划好的路线，因为从地球发来的指令要好几分钟才能到",
            "农业机器人在作物行间穿行，检查庄稼或者除草",
            "搜救机器人钻进废墟或浓烟，那些地方对人来说太危险了",
            "水下检测机器人去检查管道、船体和线缆，那些地方潜水员没法安全抵达",
            "工厂里的机械臂在安全护栏后面，一遍又一遍精准地焊接和组装同一个零件",
            "机器人手术器械让外科医生的动作更稳、更精细，而全程掌控的始终是医生本人",
          ],
        },
      ],
      materials: [
        {
          name: "「任务规划书」活动纸（可打印）",
        },
        {
          name: "带动作方框和判断菱形的流程图页（可打印）",
        },
        {
          name: "铅笔、橡皮和纸",
        },
        {
          name: "一小段做好标记的路线，或者一个要抵达的「区域」（用胶带、纸杯或一个盒子）",
        },
        {
          name: "一套至少带一个传感器的可编程机器人套件",
        },
        {
          name: "装有浏览器模拟器的电脑或平板",
        },
        {
          name: "前几周做的纸板机器人模型和程序卡片",
        },
        {
          name: "秒表或计时器，用来核对时间方面的约束",
        },
      ],
      activities: [
        {
          title: "写一份任务方案",
          goal: "把一件小小的自主任务变成一份方案：需求、约束、成功标准，以及你不得不权衡的一处取舍。",
          shared: [
            "挑一件小的自主任务，比如「开到区域里停下」或者「一直找到目标为止」。把它写在「任务规划书」的最上面。",
            "填写规划书：需求（它「必须」做到什么）、约束（时间、尺寸、只有一个传感器之类的限制）和评判标准（你要怎样判断成败）。然后点明一处你不得不权衡的取舍，比如速度与可靠性。",
          ],
          variants: {
            kit: {
              title: "为你的套件机器人规划一次任务",
              materials: [
                "「任务规划书」活动纸",
                "作参考用的套件机器人",
                "一个做了标记的区域或一小段路线",
              ],
              instructions: [
                "挑一件你的套件这周真能做到的任务，比如开到胶带标出的区域里然后停下。",
                "先写需求，再写你的套件带来的约束（它的速度、它仅有的一个传感器、你手头的场地）。",
                "写下可衡量的成功标准，然后点明一处取舍，比如开慢一点好把传感器读稳。",
              ],
              safetyNotes: [
                "这一步是在纸上做的；规划的时候把机器人关着。",
              ],
              expectedResult: "一份填好的规划书，至少有两条需求、两条约束、两条可衡量的标准，以及点明的一处取舍。",
              successCriteria: [
                "需求写明了机器人「必须」做到什么",
                "约束列出了真实存在的限制",
                "标准是可衡量的（一个数字，或者一个明确的是与否）",
                "点明了一处取舍",
              ],
              troubleshooting: [
                {
                  problem: "需求和约束看着一个样",
                  fix: "需求是一件要干的活儿（「到达区域」）；约束是一条限制（「30 秒之内」）。把每一行都归到其中一类里去。",
                },
              ],
              extension: "再加一个更难的第二版任务，并列出它带来了什么新的需求。",
            },
            simulator: {
              title: "为模拟器规划一次网格任务",
              materials: [
                "「任务规划书」活动纸",
                "作参考用的浏览器模拟器",
              ],
              instructions: [
                "挑一个网格任务，比如「到达终点格并停下」或者「沿着这一行搜索，直到传感器发现目标」。",
                "先写需求，再写网格带来的约束（网格大小、只有一个传感器积木块、步数上限）。",
                "写下可衡量的标准（到达终点格、并停在那里），然后点明一处取舍，比如为了绕开墙壁而多走几步。",
              ],
              safetyNotes: [
                "没有安全隐患；需要的话让眼睛离开屏幕歇一会儿。",
              ],
              expectedResult: "一份为网格任务填好的规划书，需求、约束、标准和一处取舍都清清楚楚。",
              successCriteria: [
                "需求写明了机器人「必须」做到什么",
                "约束列出了真实存在的限制",
                "标准是可衡量的",
                "点明了一处取舍",
              ],
              troubleshooting: [
                {
                  problem: "标准在模拟器里没法核对",
                  fix: "把标准写成模拟器能显示出来的样子，比如「落在终点格上」或者「在边缘之前停住」。",
                },
              ],
              extension: "把同一个任务放到更大的网格上规划一遍，并记下哪条约束变得更难了。",
            },
            unplugged: {
              title: "为你的模型规划一次地板赛道任务",
              materials: [
                "「任务规划书」活动纸",
                "纸板机器人模型",
                "地板上用胶带贴出的路线或区域",
              ],
              instructions: [
                "挑一件你的模型能沿着胶带路线「走」完的任务，比如「走到盒子那儿并停下」。",
                "先写需求，再写约束（路线长度、一个临时充当传感器的纸质保险杠、一个时间上限）。",
                "写下你眼睛能看得出来的可衡量标准，然后点明一处取舍，比如步骤更少 对 更勤地检查保险杠。",
              ],
              safetyNotes: [
                "保持地板路线通畅，免得演示任务时有人绊倒。",
              ],
              expectedResult: "一份为地板赛道任务填好的规划书，需求、约束、标准和一处取舍都清清楚楚。",
              successCriteria: [
                "需求写明了机器人「必须」做到什么",
                "约束列出了真实存在的限制",
                "标准是可衡量的",
                "点明了一处取舍",
              ],
              troubleshooting: [
                {
                  problem: "没有一个明确的办法来判断成败",
                  fix: "加一个看得见的实体标记，比如一块胶带围出来的「区域」，让成功成为你能看见、能指出来的东西。",
                },
              ],
              extension: "和另一组交换规划书，看看对方的标准是不是清楚到足以拿来评判。",
            },
          },
        },
        {
          title: "画出任务流程图",
          goal: "把任务方案变成一张流程图，其中要有动作方框、至少一个判断菱形、一个查看传感器的循环，以及一次安全停车。",
          shared: [
            "在流程图页上，从一个「开始」方框出发，到一个「安全停车」方框结束。动作放进矩形里，每一次是或否的判断放进菱形里，并配上一条「是」箭头和一条「否」箭头。",
            "你的自主流程图必须不停地查看传感器（也就是一个循环），而且必须终结于一次安全停车：任务完成时或者有东西挡路时，机器人就停下来。",
          ],
          variants: {
            kit: {
              title: "给你的套件任务画流程图",
              materials: [
                "流程图页",
                "你已经填好的「任务规划书」",
              ],
              instructions: [
                "按顺序写下任务的各个步骤：开始，然后是各个动作（向前走等等）。",
                "为传感器的检查加一个判断菱形，比如「前面有墙吗？」，并配上一条「是」的路径和一条「否」的路径。",
                "让「否」那条路径绕回去，继续行驶和检查；把「是」那条路径接到「安全停车」方框。",
              ],
              safetyNotes: [
                "这是纸上的一步；现在还不需要让任何机器人跑起来。",
              ],
              expectedResult: "一张从「开始」到「安全停车」的流程图，包含动作方框、至少一个判断菱形、一条绕回去的循环，以及一个明确的结束。",
              successCriteria: [
                "动作都画在矩形里",
                "至少有一次判断画成了菱形，并配有「是」和「否」的箭头",
                "有一个循环在不停地查看传感器",
                "以安全停车收尾",
              ],
              troubleshooting: [
                {
                  problem: "流程图永远停不下来",
                  fix: "每张自主流程图都需要一个出口：从某个判断引一条箭头到「安全停车」方框。",
                },
              ],
              extension: "再加一个判断菱形，让机器人能应付两种不同的传感器读数。",
            },
            simulator: {
              title: "给你的网格任务画流程图",
              materials: [
                "流程图页",
                "你已经填好的「任务规划书」",
              ],
              instructions: [
                "列出网格任务的各个步骤：开始，然后是在网格上移动的各个动作。",
                "为传感器积木块加一个判断菱形，比如「到终点了吗？」或者「前面有障碍物吗？」，并配上「是」和「否」的箭头。",
                "让「否」那条路径绕回去，继续移动和检查；把「是」那条路径接到「安全停车」方框。",
              ],
              safetyNotes: [
                "没有安全隐患。",
              ],
              expectedResult: "一张与你能在模拟器里搭出来的程序相对应的流程图，并以安全停车收尾。",
              successCriteria: [
                "动作都画在矩形里",
                "至少有一次判断画成了菱形，并配有「是」和「否」的箭头",
                "有一个循环在不停地查看传感器",
                "以安全停车收尾",
              ],
              troubleshooting: [
                {
                  problem: "分不清哪一块积木是那个判断",
                  fix: "程序在哪里向传感器提了一个是或否的问题，判断就在哪里，那一处就画成菱形。",
                },
              ],
              extension: "在动手搭之前，先把流程图直接对应到模拟器的「重复直到」和「如果」积木块上。",
            },
            unplugged: {
              title: "给你的地板赛道任务画流程图",
              materials: [
                "流程图页",
                "你已经填好的「任务规划书」",
              ],
              instructions: [
                "从一个「开始」方框出发，按顺序写下地板任务的各个步骤。",
                "为那个临时充当传感器的检查加一个判断菱形，比如「保险杠碰到墙了吗？」，并配上「是」和「否」的箭头。",
                "让「否」绕回去，继续前进和检查；把「是」接到「安全停车」方框。",
              ],
              safetyNotes: [
                "这一步只在纸上做；稍后再和同伴一起演出来。",
              ],
              expectedResult: "一张手绘的流程图，从「开始」到「安全停车」，同伴照着它就能把任务跑一遍。",
              successCriteria: [
                "动作都画在矩形里",
                "至少有一次判断画成了菱形，并配有「是」和「否」的箭头",
                "有一个循环在不停地查看传感器",
                "以安全停车收尾",
              ],
              troubleshooting: [
                {
                  problem: "同伴照着走的时候一头雾水",
                  fix: "让每个方框都只写一个精确的动作，并确保每个菱形都恰好有两条带标签的箭头。",
                },
              ],
              extension: "把流程图里的每个方框都变成一张程序卡片，留给下一个活动用。",
            },
          },
        },
        {
          title: "引导式自主练习任务",
          goal: "跑一次简短的自主任务（开到一个区域、对一个障碍物作出反应、然后安全停下），为下周的结业项目做预演。",
          shared: [
            "直接照着你的流程图把程序搭出来：一段行驶的顺序指令、一个不停查看传感器的循环、一个对障碍物作出反应的条件，以及机器人到达区域或碰到障碍物时的安全停车。",
            "跑一遍，对照你的成功标准看结果，并记下一处你想改进的地方；那个「改进」的步骤就是一次迭代，也正是你下周要大量去做的事。",
          ],
          variants: {
            kit: {
              title: "在你的套件机器人上跑这次练习任务",
              materials: [
                "带一个传感器的机器人套件",
                "做了标记的区域或一小段路线",
                "你的流程图",
              ],
              instructions: [
                "布置一小段路线：一条起跑线、一个要抵达的区域，还有一个挡在路上的障碍物。",
                "编写一段前进的顺序指令、一个查看距离或触碰传感器的循环、一个对障碍物作出反应的条件，以及到达区域时的安全停车。",
                "从起跑线跑一遍，对照你的成功标准检查一下，并记下一处改进。",
              ],
              safetyNotes: [
                "保持测试区域通畅，机器人运行时手指要离轮子远一点。",
                "随时准备好，一旦机器人跑出路线就把它停下。",
              ],
              expectedResult: "套件机器人开到区域、对障碍物作出反应，并安全地停下来，而不是硬顶过去。",
              successCriteria: [
                "到达了区域",
                "对障碍物作出了反应，而不是视而不见",
                "安全地停下（没有继续往前开）",
                "记下了一处改进",
              ],
              troubleshooting: [
                {
                  problem: "机器人对障碍物视而不见",
                  fix: "检查传感器阈值，以及循环是不是一直在读传感器，就像第 6 周做可靠性时那样。",
                },
                {
                  problem: "机器人冲过了区域",
                  fix: "把行驶速度降下来，或者在停车之前加一次距离检查：这就是拿速度换可靠性的取舍。",
                },
              ],
              extension: "把障碍物挪到新位置，确认机器人照样会作出反应并停下。",
            },
            simulator: {
              title: "在模拟器里跑这次练习任务",
              materials: [
                "浏览器模拟器",
                "你的流程图",
              ],
              instructions: [
                "布置一片网格：一个起点格、一个目标区域，还有一个挡在路上的障碍物。",
                "把程序搭出来：移动积木块、一个查看传感器积木块的「重复直到」循环、一个针对障碍物的「如果」条件，以及到达目标时的停止积木块。",
                "从起点格跑一遍，对照你的成功标准，并记下一处改进。",
              ],
              safetyNotes: [
                "没有安全隐患；把程序保存好，免得刷新页面就没了。",
              ],
              expectedResult: "模拟器里的机器人抵达目标区域、对障碍物作出反应，并在完成时停下。",
              successCriteria: [
                "抵达了目标区域",
                "对障碍物作出了反应，而不是视而不见",
                "完成时安全地停下",
                "记下了一处改进",
              ],
              troubleshooting: [
                {
                  problem: "机器人直接穿过了障碍物",
                  fix: "确认那个「如果」条件是在循环里、并且在移动之前读取传感器的。",
                },
                {
                  problem: "循环永远结束不了",
                  fix: "检查「重复直到」的条件在机器人到达目标时确实会变成真。",
                },
              ],
              extension: "再加一个障碍物，确认同一个程序照样能安全收尾。",
            },
            unplugged: {
              title: "用卡片和一位同伴跑这次练习任务",
              materials: [
                "纸板机器人模型",
                "程序卡片",
                "带一个区域和一个障碍物的地板胶带赛道",
                "你的流程图",
              ],
              instructions: [
                "用胶带在地板上贴出一条起跑线、一个区域和一个障碍物。",
                "把你的流程图变成程序卡片：几张前进卡、一张重复卡、一张针对临时传感器的条件卡（「如果保险杠碰到障碍物就转弯」），以及在区域处的一张停止卡。",
                "请同伴一步步挪动模型来「运行」这些卡片；对照标准检查一下，并记下一处改进。",
              ],
              safetyNotes: [
                "保持地板赛道通畅，免得挪模型的人绊倒。",
              ],
              expectedResult: "同伴照着卡片就能把模型开到区域、对障碍物作出反应，并停下来。",
              successCriteria: [
                "到达了区域",
                "对障碍物作出了反应，而不是视而不见",
                "最后安全地停下",
                "记下了一处改进",
              ],
              troubleshooting: [
                {
                  problem: "同伴跑出来的和你想的不一样",
                  fix: "像第 3 周那些顺序指令一样，让每张卡片都只写一条精确的指令，这样就只有一种读法。",
                },
                {
                  problem: "对障碍物完全没有反应",
                  fix: "加一张条件卡，写清楚保险杠碰到障碍物时该怎么办。",
                },
              ],
              extension: "和另一组交换卡片程序，互相跑一跑对方的练习任务。",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "跑之前先预测：你的练习任务会一次就满足所有成功标准吗？哪一条标准最可能不达标？",
          howToCheck: "跑一遍引导式练习任务，把发生的情况和你写在规划书上的每一条成功标准逐条对照。",
        },
      ],
      testRecords: [
        {
          title: "练习任务与它的标准对照",
          instructions: "每次都从同一个起点跑这次引导式练习任务。每跑一遍，都记下发生了什么，并对照规划书上的成功标准检查一遍。",
          columns: [
            null,
            "到达区域了吗？（是/否）",
            "对障碍物作出反应了吗？（是/否）",
            "安全停下了吗？（是/否）",
            "该改进什么",
          ],
          measure: "每一条成功标准是否达成，以及结业项目里该改什么",
        },
      ],
      knowledgeCheck: {
        instructions: "回答这几题，检验一下你能否规划一次自主任务、并看懂一张流程图。",
        questions: [
          {
            prompt: "一台送货机器人靠自己的传感器和程序，自己开到了卸货区，全程没人操控。这台机器人是：",
            options: [
              {
                text: "遥控的",
                feedback: "遥控意味着有人在实时操控它，可这里根本没人在操控。",
              },
              {
                text: "自主的",
                feedback: "对了：它靠自己的传感器和程序作决定，没有人在操控。",
              },
              {
                text: "根本不是机器人",
                feedback: "它会感知、决定和行动，所以它是机器人。",
              },
              {
                text: "坏掉了",
                feedback: "自己把活儿干完，正是自主机器人本该做到的事。",
              },
            ],
            explanation: "自主系统靠自己的传感器和程序作决定，没有人操控；而遥控系统是由人实时驾驶的。",
          },
          {
            prompt: "「机器人必须到达蓝色区域」和「它必须在 30 秒之内完成」。哪一条是需求，哪一条是约束？",
            options: [
              {
                text: "到达区域是需求；30 秒的限制是约束",
                feedback: "正确：需求是它「必须」做到的事；约束是你必须在里面施展的限制。",
              },
              {
                text: "到达区域是约束；30 秒的限制是需求",
                feedback: "反了：到达区域才是那件要干的活儿（需求）；时间限制是约束。",
              },
              {
                text: "两条都是约束",
                feedback: "其中一条是机器人必须完成的活儿，那就使它成了一条需求。",
              },
              {
                text: "两条都是需求",
                feedback: "时间限制是你必须在里面施展的限制，也就是约束，而不是一件要干的活儿。",
              },
            ],
            explanation: "需求是机器人「必须」做到的事；约束则是时间、尺寸、材料或预算之类的限制，你得在里面施展。",
          },
          {
            prompt: "在流程图里，菱形代表什么？",
            options: [
              {
                text: "机器人做出的一个动作",
                feedback: "动作画在矩形里，不是菱形里。",
              },
              {
                text: "一次是或否的判断",
                feedback: "没错：菱形提一个是或否的问题，每个答案各引出一条箭头。",
              },
              {
                text: "程序的结尾",
                feedback: "结尾通常是一个停止方框，不是判断菱形。",
              },
              {
                text: "某一步要花多长时间",
                feedback: "流程图的图形里装的是步骤和判断，不是时间。",
              },
            ],
            explanation: "在流程图里，矩形装动作，菱形装是或否的判断，每个菱形都配一条「是」箭头和一条「否」箭头。",
          },
          {
            prompt: "你的机器人跑得快，可有时来不及读传感器就撞了。你把它放慢，好让它读得稳。这个选择属于：",
            options: [
              {
                text: "一条需求",
                feedback: "这不是机器人必须完成的活儿；这是在两样好东西之间作选择。",
              },
              {
                text: "一处取舍",
                feedback: "正确：你放弃了一点速度，换来了更高的可靠性。这就是取舍。",
              },
              {
                text: "一次安全停车",
                feedback: "安全停车是编好的一次停止动作；改速度属于设计上的取舍。",
              },
              {
                text: "一条约束",
                feedback: "约束是一条固定的限制；而这里是你自己选择用速度去换可靠性。",
              },
            ],
            explanation: "取舍就是放弃一点这个（速度），去换更多的那个（可靠性），工程师用设计流程来权衡这类选择。",
          },
          {
            prompt: "自主机器人的程序里为什么需要一次安全停车？",
            options: [
              {
                text: "为了让它看上去像做完了",
                feedback: "安全停车关乎安全和掌控，跟外观没关系。",
              },
              {
                text: "为了在任务完成或有东西挡路时安全地停住，而不是径直撞上去",
                feedback: "对了：既然没人在操控，那就得由程序本身把机器人安全地停下来。",
              },
              {
                text: "为了让它能跑得更快",
                feedback: "安全停车是让机器人停下来，跟速度毫无关系。",
              },
              {
                text: "为了让它永远不需要传感器",
                feedback: "安全停车通常正是要靠传感器才知道什么时候该停。",
              },
            ],
            explanation: "自主机器人是自己作决定的，所以它的程序需要一次安全停车，好在任务完成或有东西挡路时停下来，这正是负责任的机器人技术的一部分。",
          },
        ],
      },
      reflection: [
        {
          prompt: "为你的任务写需求、约束还是评判标准最难？为什么？",
        },
        {
          prompt: "描述你方案里的一处取舍。你放弃了什么，又换来了什么？",
        },
        {
          prompt: "负责任的机器人技术：说出一件自主机器人确实帮得上大忙的活儿，以及一种应该由人继续掌控的情形。说说你的理由。",
        },
      ],
      journalPrompts: [
        {
          prompt: "写一份你的迷你规划书：任务本身、它的需求、它的约束，以及它的成功标准。",
        },
        {
          prompt: "画出你这次自主任务的流程图，要有动作方框、至少一个判断菱形，以及一次安全停车。",
        },
        {
          prompt: "练习跑完之后，勾出你的任务满足了哪些成功标准。",
        },
      ],
      savedPrograms: [
        {
          title: "引导式练习任务程序",
          description: "照着你的流程图搭出来的自主练习程序：向前行驶、一个不停查看传感器的循环、一个对障碍物作出反应的条件，以及在区域处的安全停车。",
        },
      ],
      simulatorMissions: [
        {
          title: "练习任务：开到区域",
          objective: "自己开到目标区域，对路上的一个障碍物作出反应，并在抵达时安全停下。",
          successCriteria: [
            "机器人抵达了目标区域",
            "机器人对障碍物作出了反应，而不是直接穿过去",
            "机器人抵达时安全地停下",
          ],
        },
        {
          title: "练习任务：搜索并停下",
          objective: "沿着这一行搜索，直到传感器检测到目标，然后就地安全停下。",
          successCriteria: [
            "机器人一直搜索到传感器检测到目标为止",
            "机器人一找到目标就停下",
            "机器人没有冲出网格的边缘",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "自主与遥控，以及规划用的那些词",
          focus: "自主与遥控；需求、约束、评判标准、取舍，以及设计流程。",
        },
        {
          title: "写一份任务方案",
          focus: "在规划书上写下需求、约束、评判标准和一处取舍。",
        },
        {
          title: "画出任务流程图",
          focus: "动作方框、一个判断菱形、一个循环，以及一次安全停车。",
        },
        {
          title: "预测结果",
          focus: "预测任务会不会满足它的标准，以及哪一条最可能不达标。",
        },
        {
          title: "引导式自主练习任务",
          focus: "把「开到区域、作出反应、安全停车」这套预演跑一遍。",
        },
        {
          title: "对照标准检查",
          focus: "记录这一遍的表现，并和成功标准对照。",
        },
        {
          title: "知识检测",
          focus: "关于规划、自主性、流程图和安全停车的五道题。",
        },
        {
          title: "反思",
          focus: "取舍，以及负责任的机器人技术。",
        },
      ],
      safetyNotes: [
        {
          text: "练习跑动时，保持测试区域通畅，并随时准备好在机器人跑出路线时把它停住；让手指远离转动的轮子。",
        },
        {
          text: "永远要编好一次安全停车，让自主机器人在任务完成或有东西挡路时停下来，而不是硬顶着往墙上或人身上撞。",
        },
        {
          text: "保持地板上的胶带赛道通畅，免得演示任务时有人绊倒。",
        },
        {
          text: "常常保存你的程序和日志，免得刷新浏览器把方案弄丢。",
        },
      ],
      printableResources: [
        {
          title: "任务规划书",
          description: "一页纸的规划书，用来写下任务、需求、约束、成功标准，以及一处取舍。",
        },
        {
          title: "任务流程图页",
          description: "一页纸，用来把自主程序画成流程图，含动作方框、判断菱形和一次安全停车。",
        },
        {
          title: "练习任务测试记录表",
          description: "一张简短的表格，用来记录练习跑动的情况，并和任务的成功标准对照。",
        },
        {
          title: "第 7 周教师指南",
          description: "针对任务规划这一课的课前准备、课堂组织、常见误解和提问建议。",
        },
      ],
      completion: {
        summary: "完成第 7 周：写出一份任务方案，画出带安全停车的流程图，跑一遍引导式练习任务并对照它的标准，然后通过知识检测。",
        requirements: [
          {
            label: "完成任务规划书，写明需求、约束、评判标准和一处取舍",
          },
          {
            label: "画出任务流程图，含一个判断菱形和一次安全停车",
          },
          {
            label: "跑一遍引导式练习任务，并对照它的标准做记录",
          },
          {
            label: "知识检测至少答对 5 题中的 4 题",
          },
          {
            label: "写下你的反思",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "为每位学生或每组打印任务规划书、流程图页，以及练习任务测试记录表。",
          "为套件路线和不插电路线布置一小段练习路线：一条起跑线、一个标记好的区域和一个障碍物。",
          "走套件路线的，先充好电并确认有一个传感器能用；走模拟器路线的，把它打开并载入一张 6x6 的网格。",
        ],
        prep: [
          "自己先写一份示例任务规划书，这样才好示范需求、约束和评判标准之间的区别。",
          "画一张带判断菱形和安全停车的示例流程图，让大家看清它长什么样。",
          "想好一两个任务备选，留给那些挑不定的小组。",
        ],
        facilitation: [
          "动手做之前，先讲自主和遥控的区别，以及规划用的那些词。",
          "让各组先写规划书；在他们往下走之前，先检查那些评判标准是不是可衡量的。",
          "示范怎样把一份规划书变成流程图，然后让各组自己画。",
          "让所有人先预测，把引导式练习任务跑一遍，并对照标准做记录；始终把安全停车放在最显眼的位置，作为下周的预演。",
        ],
        commonMisconceptions: [
          "把需求和约束搞混：需求是那件要干的活儿，约束是一条限制。",
          "「自主不就是会动嘛」：光会动还不够；它得靠传感器和程序自己作决定。",
          "忘了安全停车，或者画出一张根本没法收尾的流程图。",
          "以为取舍就意味着有一个选项纯属「错的」，而不是在两样好东西之间求平衡。",
        ],
        questionsToAsk: [
          "这一行是需求（一件活儿）还是约束（一条限制）？",
          "你打算怎样真正去核对机器人有没有达到那条标准？",
          "你的流程图在哪里结束？是什么让机器人安全地停下来的？",
          "你放弃了什么去换别的东西？这么换值不值？",
        ],
        easierVersion: "给各组一个现成的任务和一份填了一半的规划书，让他们专心弄流程图和安全停车。",
        harderVersion: "要求画两个判断菱形和写第二条成功标准，并让各组用文字说明他们那处取舍的理由。",
      },
      nextWeek: {
        teaser: "下周就是结业项目了：你要设计、搭建或模拟、编程、测试并改进一台机器人，让它完成一项你自己挑的、有用的任务，用的正是你今天练过的这套规划方法。",
        prepare: [
          "把你的任务规划书和流程图留着：结业项目里可以直接沿用，也可以在它们的基础上升级。",
          "把结业项目的五个任务方向（配送、搜救、检测、分拣、无障碍辅助）浏览一遍，想想你会选哪个。",
          "给你的套件充好电或者把模拟器加入收藏夹，再把前几周的纸板和材料都收拢起来。",
        ],
      },
    },
    {
      title: "设计一台能帮上忙的机器人",
      subtitle: "挑一项真实的任务，然后设计、搭建、编程、测试并改进一台能完成它的机器人。",
      summary: "这是结业项目。学生要挑一项任务（配送、搜救、检测、分拣或无障碍辅助），把整门课的东西都汇到一起：一份规划书、一张标注好的草图、一张「输入、处理、输出」示意图、一张流程图、一套能动起来的机械设计、至少一个传感器，以及一个用到顺序、循环和条件、并带有安全停车行为的程序。他们要跑三轮测试，记录一处改进，并说明自己的机器人是怎样帮上忙的。",
      mainMission: "设计、搭建或模拟、编程、测试并改进一台机器人，让它完成一项你自己挑的、有用的任务。",
      estimatedTime: "90 至 120 分钟（可以分两次课上完）",
      learningGoals: [
        {
          text: "把一个真实的需求变成一项带需求和约束的机器人任务",
        },
        {
          text: "用一份规划书、一张标注草图、一张「输入、处理、输出」示意图和一张流程图来规划一台机器人",
        },
        {
          text: "搭出或模拟出一台至少用一个传感器、并且能稳稳当当跑起来的机器人",
        },
        {
          text: "写一个用到顺序、循环、条件和安全停车的程序",
        },
        {
          text: "把机器人测试三遍，记录一处改进，并说明它是怎样帮上忙的",
        },
      ],
      vocabulary: [
        {
          term: "任务",
          definition: "你为自己的机器人挑的那一件有用的活儿。",
        },
        {
          term: "规划书",
          definition: "动手之前写下的一份简短方案，说明任务、需求和约束。",
        },
        {
          term: "「输入、处理、输出」示意图",
          definition: "一张图，画出你的机器人感知什么、怎样作决定、以及做了什么。",
        },
        {
          term: "流程图",
          definition: "你程序的分步示意图，用方框表示动作、用菱形表示判断。",
        },
        {
          term: "迭代",
          definition: "通过测试你的设计、找出问题、再作出改动，把它变得更好。",
        },
        {
          term: "安全停车",
          definition: "一种行为：任务完成或有东西挡路时，让机器人安全地停下来。",
        },
        {
          term: "评分量表",
          definition: "一张表格，说明入门、发展中、熟练和优秀的作品各是什么样子。",
        },
      ],
      prerequisites: [
        {
          reason: "最终的机器人需要一个稳固、能跑的底盘，来自第 2 周的底盘制作。",
        },
        {
          reason: "程序是一串规划好的精确指令，这是第 3 周教的。",
        },
        {
          reason: "机器人必须至少用一个传感器，这在第 4 周介绍过。",
        },
        {
          reason: "程序里必须包含一个循环和一个条件，这是第 5 周教的。",
        },
        {
          reason: "三轮测试和一处记录在案的改进，用的是第 6 周养成的调试与可靠性习惯。",
        },
        {
          reason: "规划书、流程图和安全停车来自第 7 周的自主任务规划。",
        },
      ],
      concepts: [
        {
          title: "把整门课汇到一起",
          body: [
            "结业项目不是什么新想法，而是这门课里所有想法同时开工。你的机器人要感知（第 4 周）、用循环和条件作决定（第 5 周）、在稳固的底盘上行驶（第 2 周）、照着规划好的顺序走（第 3 周）、经过测试和改进（第 6 周），并完成一次安全的自主任务（第 7 周）。",
            "从任务出发，倒着往回推：这件活儿要求机器人感知什么、判断什么、做什么？",
          ],
        },
        {
          title: "挑一项真有意义的任务",
          body: [
            "好的任务是为真实的人解决一个小而真实的问题。「把一张纸条送到教室的另一头」比「什么都干」要好，因为你真的能把它做出来、也能测试。",
            "挑一项你在手头这点时间里做得完的任务，而且要配得上你真正拥有的传感器和零件。",
          ],
          examples: [
            "配送",
            "搜救",
            "检测",
            "分拣",
            "无障碍辅助",
          ],
        },
        {
          title: "先规划，再动手",
          body: [
            "专业的工程师都是先在纸上规划。你的规划书要点明任务、需求（它必须做到什么）和约束（时间、尺寸或材料之类的限制）。",
            "接着你要画一张标注好的草图、一张「输入、处理、输出」示意图，以及程序的流程图。先规划，就不用后面推倒重来。",
          ],
        },
        {
          title: "测试、改进、讲清楚",
          body: [
            "把你的机器人跑三遍，逐次记录发生了什么，而不是只记「成没成」。真实的机器人是按能不能可靠地把活儿干好来评判的，不是靠碰巧成功的那一次。",
            "找一处可以改进的地方，改掉它，并记下结果。最后，用几句话说明你的机器人是怎样帮上忙的，以及你凭什么知道它管用。",
          ],
        },
      ],
      materials: [
        {
          name: "结业项目规划书（可打印）",
        },
        {
          name: "流程图页和草图页（可打印）",
        },
        {
          name: "三次运行测试记录表（可打印）",
        },
        {
          name: "结业项目评分量表（可打印）",
        },
        {
          name: "一套至少带一个传感器的可编程机器人套件",
        },
        {
          name: "装有浏览器模拟器的电脑或平板",
        },
        {
          name: "纸板、瓶盖、吸管、胶带、线绳和马克笔",
        },
        {
          name: "前几周攒下来的整门课材料包",
        },
      ],
      activities: [
        {
          title: "设计、搭建、编程并测试你的帮手机器人",
          goal: "把挑好的任务从方案一路做成一台经过测试和改进的机器人，其中要用到传感器、顺序、循环、条件和安全停车。",
          shared: [
            "先把规划书填完：任务、需求、约束。然后画出标注草图、「输入、处理、输出」示意图和流程图。",
            "把机器人搭好或配置好，让它跑得稳，并且至少用一个传感器。写出带顺序、循环、条件和安全停车的程序。",
            "跑三轮测试，逐轮记录，作出一处改进，并写下你关于机器人怎样帮上忙的最终说明。",
          ],
          variants: {
            kit: {
              title: "在机器人套件上搭建并编写这项任务",
              materials: [
                "至少带一个传感器的机器人套件",
                "规划页、流程图页和测试记录页",
              ],
              instructions: [
                "在碰套件之前，先把规划书和各张示意图做完。",
                "为你的任务搭一个稳固的底盘，并装上你需要的那个传感器。",
                "编写一段能把活儿干完的顺序指令、一个不停查看传感器的循环、一个作出反应的条件，以及结尾处的安全停车。",
                "做三次测试，逐轮记录，改进一处，再测一遍。",
              ],
              safetyNotes: [
                "测试运行时请远离转动的部件。",
                "给机器人一块干净、没有障碍物的测试区域。",
              ],
              expectedResult: "一台用套件搭的机器人，在三轮测试里至少两轮完成任务，并且安全停下。",
              successCriteria: [
                "至少用了一个传感器",
                "程序里有顺序、循环和条件",
                "有安全停车",
                "记录了三轮运行",
                "记录了一处改进",
              ],
              troubleshooting: [
                {
                  problem: "机器人成功了一次，之后就不行了",
                  fix: "照第 6 周的可靠性清单来一遍：同样的起始位置、换新电池、重新核对传感器阈值。",
                },
                {
                  problem: "机器人对传感器毫无反应",
                  fix: "把传感器读数显示出来，确认你的阈值落在真实数值正确的那一侧。",
                },
              ],
              extension: "再加一个传感器或一个计数器，让机器人去挑战这项任务更难的版本。",
            },
            simulator: {
              title: "在模拟器里设计并编写这项任务",
              materials: [
                "浏览器模拟器",
                "规划页、流程图页和测试记录页",
              ],
              instructions: [
                "先把规划书和各张示意图做完。",
                "挑一张或者布置一张配得上你任务的网格地图。",
                "用移动积木块、一个循环、一个传感器条件和一个停止积木块，把程序搭出来。",
                "从同一个起点跑三遍，逐轮记录，改进一处，再跑一遍。",
              ],
              safetyNotes: [
                "没有安全隐患；需要就让眼睛离开屏幕歇一会儿。",
              ],
              expectedResult: "一台模拟器里的机器人，在网格上完成任务并在结束时停下。",
              successCriteria: [
                "至少用了一个传感器积木块",
                "程序里有顺序、循环和条件",
                "有停止",
                "记录了三轮运行",
                "记录了一处改进",
              ],
              troubleshooting: [
                {
                  problem: "机器人开出了网格",
                  fix: "加一个「重复直到」或者一个传感器条件，让它在边缘或终点停住。",
                },
                {
                  problem: "循环永远结束不了",
                  fix: "检查「重复直到」的条件在这一轮里确实会变成真。",
                },
              ],
              extension: "把同一项任务放到更大或者障碍更多的网格上重做一遍。",
            },
            unplugged: {
              title: "做个模型，用纸上程序把任务「跑」一遍",
              materials: [
                "纸板机器人模型",
                "线绳，以及地板网格或胶带路线",
                "程序卡片",
              ],
              instructions: [
                "先把规划书和各张示意图做完。",
                "做一台纸板机器人，要有一个能动的部件和一个临时充当传感器的东西（比如纸做的「保险杠」）。",
                "把程序写在卡片上，用到顺序、重复和条件，再加一张停止卡。",
                "一张卡一张卡地挪动模型，把程序「跑」三遍，逐轮记录，并改进其中一步。",
              ],
              safetyNotes: [
                "做模型时请使用儿童安全剪刀，并在大人陪同下进行。",
              ],
              expectedResult: "一台纸板机器人和一份卡片程序，同伴照着它能用同样的方式完成任务两次。",
              successCriteria: [
                "模型上有一个能动的部件和一个临时充当传感器的东西",
                "卡片程序里有顺序、重复和条件",
                "有一张停止卡",
                "记录了三轮运行",
                "记录了一处改进",
              ],
              troubleshooting: [
                {
                  problem: "两个人「跑」出来的程序不一样",
                  fix: "说明步骤含糊：像第 3 周那些指令一样，把它们重写得精确无误。",
                },
                {
                  problem: "没地方安放条件",
                  fix: "加一张条件卡，比如「如果保险杠碰到墙，就向右转」。",
                },
              ],
              extension: "和另一组交换程序，把对方的任务跑一遍。",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "第一轮测试之前先预测：任务的哪一部分最可能出岔子？",
          howToCheck: "把你的预测和三轮测试里真正出问题的地方对照一下。",
        },
      ],
      testRecords: [
        {
          title: "最终任务的三次运行测试",
          instructions: "从同样的初始布置把整项任务跑三遍。逐轮记录发生了什么，以及任务有没有完成。",
          columns: [
            null,
            "发生了什么",
            "任务完成了吗？（是/否）",
            "该改什么",
          ],
          measure: "任务有没有完成，以及两轮之间改动了什么",
        },
      ],
      knowledgeCheck: {
        instructions: "检验一下你能否说清楚结业项目背后的那些选择。",
        questions: [
          {
            prompt: "工程师为什么要在动手做之前写规划书、画流程图？",
            options: [
              {
                text: "为了让项目做得更久",
                feedback: "规划其实是省时间的，因为它免去了推倒重来。",
              },
              {
                text: "为了在花掉材料之前，把任务、需求和步骤都想清楚",
                feedback: "对了：先在纸上规划，能避免日后代价高昂的错误。",
              },
              {
                text: "因为不许动手做",
                feedback: "动手做正是目标；规划只是排在它前面。",
              },
              {
                text: "为了给机器人做装饰",
                feedback: "规划书和流程图关乎的是方案，不是装饰。",
              },
            ],
            explanation: "规划书和流程图让你在动手之前，把任务、需求、约束和步骤都想明白。",
          },
          {
            prompt: "你的程序里必须有一个条件。条件让你的机器人能做什么？",
            options: [
              {
                text: "不管发生什么，都永远重复同一个动作",
                feedback: "那说的是一个光秃秃的循环，里面没有任何判断。",
              },
              {
                text: "根据传感器读到的东西来选择一个动作",
                feedback: "正确：条件（如果 / 如果-否则）让机器人依据传感器的输入来作决定。",
              },
              {
                text: "跑得更快",
                feedback: "速度是由电机决定的，不是由条件决定的。",
              },
              {
                text: "给自己的电池充电",
                feedback: "条件关乎的是判断，不是供电。",
              },
            ],
            explanation: "条件让机器人能根据传感器读数来挑选动作，这正是「对世界作出反应」的核心。",
          },
          {
            prompt: "为什么要把任务跑三遍，而不是一遍？",
            options: [
              {
                text: "为了证明它稳定管用，而不是碰巧成功了一次",
                feedback: "没错：跑多轮都靠得住，机器人才值得信赖。",
              },
              {
                text: "因为第一轮不算数",
                feedback: "每一轮都是数据；三轮都要记录下来。",
              },
              {
                text: "为了把电池耗光",
                feedback: "测试是为了拿到证据，不是为了耗电。",
              },
              {
                text: "为了显得很忙",
                feedback: "反复测试关乎的是结果可靠，不是场面好看。",
              },
            ],
            explanation: "三轮运行能看出机器人是不是能可靠地把活儿干好，而真实的机器人正是这样被评判的。",
          },
          {
            prompt: "什么是「安全停车」行为？",
            options: [
              {
                text: "把电池拔了，让机器人关机",
                feedback: "那是手动关机，不是编进程序里的安全停车。",
              },
              {
                text: "一段编好的行为：任务完成或有东西挡路时，让机器人停下来",
                feedback: "正确：安全停车是程序的一部分，既保护人，也保护机器人。",
              },
              {
                text: "一直开到机器人撞上去为止",
                feedback: "撞上去恰恰是安全停车的反面。",
              },
              {
                text: "让机器人在最后加速",
                feedback: "加速可算不上安全地停下来。",
              },
            ],
            explanation: "安全停车是一段编好的行为，在机器人完成任务或感知到障碍物时把它停住。",
          },
        ],
      },
      reflection: [
        {
          prompt: "你的机器人是怎样帮到别人的？用两三句话说明这项任务。",
        },
        {
          prompt: "测试之后你作出的那一处改进是什么？它让结果有了什么变化？",
        },
        {
          prompt: "如果再给你一周，接下来你会加点什么、或者改点什么？",
        },
      ],
      journalPrompts: [
        {
          prompt: "写下你的规划书：任务、需求和约束。",
        },
        {
          prompt: "画出你的标注草图和「输入、处理、输出」示意图。",
        },
        {
          prompt: "记录你的三轮测试，以及你作出的那处改进。",
        },
        {
          prompt: "写下你关于机器人怎样帮上忙的最终说明。",
        },
      ],
      savedPrograms: [
        {
          title: "最终任务程序",
          description: "运行你所选任务的那个程序：一段顺序、一个循环、一个传感器条件，以及一次安全停车。",
        },
      ],
      simulatorMissions: [
        {
          title: "最终任务（模拟器）",
          objective: "在网格上完成你挑的那项任务，其中要用到传感器、循环、条件和安全停车。",
          successCriteria: [
            "机器人抵达了任务目标",
            "机器人用了一个传感器条件",
            "机器人完成后安全地停下",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "挑选你的任务",
          focus: "在配送、搜救、检测、分拣和无障碍辅助之间挑一个。",
        },
        {
          title: "先在纸上规划",
          focus: "规划书、标注草图、「输入、处理、输出」示意图、流程图。",
        },
        {
          title: "搭出或配置好机器人",
          focus: "一个稳固、能跑的底盘，至少带一个传感器。",
        },
        {
          title: "为任务编程",
          focus: "顺序、循环、条件和安全停车。",
        },
        {
          title: "三轮测试和一处改进",
          focus: "逐轮记录，改动一处，再测一遍。",
        },
        {
          title: "讲清楚它是怎样帮上忙的",
          focus: "最终说明与反思。",
        },
        {
          title: "展示与评分",
          focus: "展示机器人，并按评分量表打分。",
        },
      ],
      safetyNotes: [
        {
          text: "为测试运行留出一块干净、没有障碍物的区域，并远离转动的部件。",
        },
        {
          text: "做纸板模型时请使用儿童安全剪刀，并在大人陪同下进行。",
        },
        {
          text: "常常保存你的程序和日志，免得刷新浏览器把成果弄丢。",
        },
      ],
      printableResources: [
        {
          title: "结业项目规划书",
          description: "任务、需求、约束、草图，以及「输入、处理、输出」示意图。",
        },
        {
          title: "结业项目流程图页",
          description: "一页纸，用来画出程序的流程图，含动作方框和判断菱形。",
        },
        {
          title: "三次运行测试记录表",
          description: "一张表格，用来记录最终的三轮测试以及作出的那处改进。",
        },
        {
          title: "结业项目评分量表",
          description: "涵盖规划、机械设计、编程、测试和表达的评分量表。",
        },
        {
          title: "第 8 周教师指南",
          description: "怎样在一次或两次课里完成结业项目，其中也包括评分方面的建议。",
        },
      ],
      completion: {
        summary: "完成结业项目，为整门课收尾：规划、搭建或模拟、编程、跑三轮测试、记录一处改进，并说明机器人是怎样帮上忙的。",
        requirements: [
          {
            label: "完成规划书、草图、「输入、处理、输出」示意图和流程图",
          },
          {
            label: "搭出或配置出一台能跑、并且至少用一个传感器的机器人",
          },
          {
            label: "写出一个带顺序、循环、条件和安全停车的程序",
          },
          {
            label: "跑三轮测试，并记录一处改进",
          },
          {
            label: "写下关于机器人怎样帮上忙的最终说明",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "为每位学生或每组打印规划书、流程图页、测试记录表和评分量表。",
          "腾出一块干净的地面或桌面，用来搭建和测试。",
          "决定结业项目是一次长课上完，还是把规划和搭建分到两次课里。",
        ],
        prep: [
          "把五个任务方向都过一遍，条件允许的话，每个都准备一个做好的示例。",
          "把前几周的材料和套件、传感器都准备好并充满电。",
          "先读一遍评分量表，好让打分保持一致。",
        ],
        facilitation: [
          "坚持要求方案做完了才准动手搭：这是最能预示成败的一件事。",
          "搭建和编程时在各组之间走动；多提问，别替他们修机器人。",
          "为三轮测试和那处改进留出时间；别让搭建把整节课都吃掉。",
          "以简短的展示收尾，并按评分量表打分。",
        ],
        commonMisconceptions: [
          "「跑通过一次，就算做完了」：标准是三轮都可靠。",
          "「规划是浪费时间」：没规划就动手的作品，多半会卡住，或者最后返工重做。",
          "因为任务「反正会结束」就省掉安全停车。",
        ],
        questionsToAsk: [
          "你的机器人感知什么、判断什么、又做什么？",
          "你程序里的循环在哪儿？条件又在哪儿？",
          "你那三轮跑下来发生了什么？你改了什么？",
        ],
        easierVersion: "提供一个现成的任务和现成的网格或赛道，让学生把心思放在编程和测试上，而不是从零开始做设计。",
        harderVersion: "要求用两个传感器、一个计数器变量，或者一项有不止一个目标的任务。",
      },
      nextWeek: {
        teaser: "你把这门课学完了：现在你已经能设计、搭建、编程、测试并改进一台能帮上忙的机器人了。",
        prepare: [
          "把你的机器人拿给家人或同学看看，讲讲它是怎么工作的。",
          "把你的规划书和流程图留着；它们就是你下一个机器人项目的起点。",
          "从清单里挑一个你这次没选的任务，试一试。",
        ],
      },
      finalProject: {
        title: "设计一台能帮上忙的机器人",
        overview: "挑一项任务，然后规划、搭建或模拟、编程、测试并改进一台能完成它的机器人。你的机器人必须至少用一个传感器，程序里必须有顺序、循环和条件，而且必须能安全地停下来。你要跑三轮测试，作出一处有记录的改进，并说明你的机器人是怎样帮上忙的。",
        missionChoices: [
          {
            name: "配送",
            scenario: "有东西要从一个地方送到另一个地方，穿过一个房间或一段路线。",
            exampleGoal: "把一件小物品送到标记好的卸货区并停在那里。",
            sensorIdeas: [
              "用距离传感器在区域处停下",
              "用触碰传感器判断是否已经到达",
            ],
          },
          {
            name: "搜救",
            scenario: "一个「人」或一件物品丢在了某片标记好的区域里，需要把它找出来。",
            exampleGoal: "在网格里一直搜索，直到机器人检测到目标，然后停下并发出信号。",
            sensorIdeas: [
              "用颜色传感器发现目标",
              "用距离传感器在搜索时避开墙壁",
            ],
          },
          {
            name: "检测",
            scenario: "有一条路线、一根管道或一行作物需要检查有没有问题。",
            exampleGoal: "沿着标出的线行驶，一旦检测到缺口或标记出来的故障就停下。",
            sensorIdeas: [
              "用光线或颜色传感器循线",
              "用距离传感器发现堵塞",
            ],
          },
          {
            name: "分拣",
            scenario: "有一批物品需要分成几类。",
            exampleGoal: "识别物品的颜色，并转向对应的那个箱子。",
            sensorIdeas: [
              "用颜色传感器读取物品",
              "用触碰传感器确认已经拿到手",
            ],
          },
          {
            name: "无障碍辅助",
            scenario: "有人在做日常事务时需要帮忙。",
            exampleGoal: "发现通道上的障碍物，并发出提醒或者清理出一条安全的通路。",
            sensorIdeas: [
              "用距离传感器发现障碍物",
              "用蜂鸣器或灯作为提醒输出",
            ],
          },
          {
            name: "你自己的任务",
            scenario: "你有一个能帮到别人的机器人点子，可它不在这份清单上。那就提出来吧：只要它会动、会感知、会判断、并且能安全停下，就算数。",
            exampleGoal: "描述你自己给机器人设定的那件有用的活儿，然后满足和其他任务一样的必备要素。",
            sensorIdeas: [
              "挑一个配得上你这件活儿的传感器（距离、触碰、光线或颜色）",
              "和老师确认一下，你的点子是否满足各项要求",
            ],
          },
        ],
        requirements: [
          {
            label: "规划书",
            description: "动手之前写下的任务、需求和约束。",
          },
          {
            label: "标注草图",
            description: "一张机器人的图，各个部件都标注清楚。",
          },
          {
            label: "「输入、处理、输出」示意图",
            description: "一张示意图，画出机器人感知什么、判断什么、做什么。",
          },
          {
            label: "流程图",
            description: "一张程序的分步流程图。",
          },
          {
            label: "能跑起来的机械设计",
            description: "一个稳固、能可靠行驶的底盘。",
          },
          {
            label: "至少一个传感器",
            description: "机器人把一个传感器当作输入来用。",
          },
          {
            label: "一段顺序",
            description: "程序按照规划好的次序执行各个步骤。",
          },
          {
            label: "一个循环",
            description: "程序会重复某个动作或某次检查。",
          },
          {
            label: "一个条件",
            description: "程序会根据传感器读数作出判断。",
          },
          {
            label: "安全停车行为",
            description: "机器人在完成任务或被挡住时能安全地停下来。",
          },
          {
            label: "三轮测试",
            description: "这项任务被运行并记录了三次。",
          },
          {
            label: "一处有记录的改进",
            description: "测试之后作出了一处改动，并记录了它的效果。",
          },
          {
            label: "最终说明",
            description: "一段简短的说明：机器人怎样帮上忙，以及你凭什么知道它管用。",
          },
          {
            label: "第二个传感器或一个计数器（进阶）",
            description: "为更难的任务多加一个传感器，或者一个计数器变量。",
          },
        ],
        rubric: [
          {
            name: "问题与规划",
            description: "问题和使用者是否清晰，再加上规划书、草图、「输入、处理、输出」示意图和流程图。",
            levels: [
              {
                descriptor: "几乎没有方案；没有明确的问题、规划书或示意图就开始动手了。",
              },
              {
                descriptor: "问题说出来了，但有些规划文件不完整或者很含糊。",
              },
              {
                descriptor: "问题和使用者都很清晰，规划书、草图、「输入、处理、输出」示意图和流程图齐全，而且和做出来的东西对得上。",
              },
              {
                descriptor: "规划完整清晰，并体现出对需求、约束和取舍的深思熟虑。",
              },
            ],
          },
          {
            name: "机械设计或环境设计",
            description: "机器人（或者配置好的模拟器任务）为了行驶和完成工作，做得有多到位。",
            levels: [
              {
                descriptor: "机器人跑起来不可靠，或者散架了；又或者任务场景的布置和目标对不上。",
              },
              {
                descriptor: "机器人能跑，但晃晃悠悠、时好时坏；又或者任务地图只是草草搭了个大概。",
              },
              {
                descriptor: "底盘稳固、行驶可靠，还能载着它的传感器；又或者任务地图和目标很相称。",
              },
              {
                descriptor: "结实、平衡得当的设计（或者一份精心配置的任务），和这件活儿严丝合缝。",
              },
            ],
          },
          {
            name: "编程",
            description: "顺序、循环、条件和安全停车的运用。",
            levels: [
              {
                descriptor: "程序缺了大部分必备要素，或者根本跑不起来。",
              },
              {
                descriptor: "程序能跑，但缺了循环、条件或者安全停车。",
              },
              {
                descriptor: "程序正确地用上了顺序、循环、条件和安全停车。",
              },
              {
                descriptor: "程序高效、结构清晰，把任务处理得干净利落。",
              },
            ],
          },
          {
            name: "传感器的运用",
            description: "机器人是否感知了世界，并用那个读数来决定该做什么。",
            levels: [
              {
                descriptor: "没有用任何传感器，或者读数从来没被用来作决定。",
              },
              {
                descriptor: "读了传感器，但那个读数几乎不影响机器人的行为。",
              },
              {
                descriptor: "至少读了一个传感器，并由阈值或条件用它来引导整项任务。",
              },
              {
                descriptor: "传感器经过校准、用得可靠，准确地引导着机器人的每一个判断。",
              },
            ],
          },
          {
            name: "测试与改进",
            description: "三轮有记录的运行，以及一处有记录的改进。",
            levels: [
              {
                descriptor: "几乎没做测试；结果也没有记录。",
              },
              {
                descriptor: "记录了几轮运行，但没有作出明确的改进。",
              },
              {
                descriptor: "记录了三轮运行，并记下了一处改进及其效果。",
              },
              {
                descriptor: "测试相当充分，有清楚的证据表明那处改进提高了可靠性。",
              },
            ],
          },
          {
            name: "表达与负责任的使用",
            description: "说明机器人怎样帮上忙、你凭什么知道它管用，以及它是怎样被安全、负责任地使用的。",
            levels: [
              {
                descriptor: "说不清楚这台机器人到底是做什么的。",
              },
              {
                descriptor: "介绍了机器人，但没讲它怎样帮上忙、怎样测试的，也没讲它如何保持安全。",
              },
              {
                descriptor: "把任务、机器人的工作原理、测试证据和它的安全停车都讲得清清楚楚。",
              },
              {
                descriptor: "面对观众，把设计、取舍、证据和负责任的使用都讲得令人信服。",
              },
            ],
          },
        ],
        variants: {
          kit: {
            title: "在机器人套件上做结业项目",
            materials: [
              "至少带一个传感器的机器人套件",
              "项目的全部可打印页面",
            ],
            instructions: [
              "在套件上规划、搭建并编程。",
              "条件要用真实的传感器来触发。",
              "做三轮实机测试，并改进一处。",
            ],
            safetyNotes: [
              "测试区域要空出来；远离转动的部件。",
            ],
            expectedResult: "一台实体机器人，能可靠地完成它的任务，并安全地停下来。",
            successCriteria: [
              "所有必备的评分项都达到熟练或以上",
            ],
            troubleshooting: [
              {
                problem: "几轮跑下来时好时坏",
                fix: "像第 6 周那样，把起始位置统一固定下来，并重新核对传感器阈值。",
              },
            ],
            extension: "把进阶的第二个传感器或计数器加上去。",
          },
          simulator: {
            title: "在浏览器模拟器里做结业项目",
            materials: [
              "浏览器模拟器",
              "项目的全部可打印页面",
            ],
            instructions: [
              "先在纸上规划，再在模拟器里搭出网格任务和程序。",
              "条件要用一个传感器积木块来触发。",
              "从同一个起点跑三遍，并改进一处。",
            ],
            safetyNotes: [
              "常常保存，免得刷新页面把成果弄丢。",
            ],
            expectedResult: "一台模拟器里的机器人，完成网格任务并在结束时停下。",
            successCriteria: [
              "所有必备的评分项都达到熟练或以上",
            ],
            troubleshooting: [
              {
                problem: "机器人每一轮的表现都不一样",
                fix: "把起点格固定住，并让循环靠一个明确的传感器条件来结束。",
              },
            ],
            extension: "把这项任务放到更大或者障碍更多的网格上跑一遍。",
          },
          unplugged: {
            title: "用纸板机器人和卡片程序做结业项目",
            materials: [
              "纸板机器人模型",
              "程序卡片",
              "地板网格或胶带赛道",
            ],
            instructions: [
              "先在纸上规划，再做一个带能动部件和临时传感器的模型。",
              "把程序写在卡片上，用到顺序、重复和条件。",
              "请同伴「跑」三遍，并改进其中一步。",
            ],
            safetyNotes: [
              "剪裁时要有大人帮忙。",
            ],
            expectedResult: "一个模型和一份卡片程序，同伴用同样的方式跑两遍都能完成这项任务。",
            successCriteria: [
              "所有必备的评分项都达到熟练或以上",
            ],
            troubleshooting: [
              {
                problem: "不同的同伴跑出来的结果不一样",
                fix: "让每张卡片都成为一条精确、没有歧义的指令。",
              },
            ],
            extension: "和另一组交换任务，把对方的任务跑一遍。",
          },
        },
      },
    },
  ],
}

const pt: DeepPartial<RoboticsCurriculum> = {
  title: "Robótica e Automação",
  subtitle: "Aprenda como os robôs percebem, pensam e agem, e depois projete, construa, programe, teste e melhore um robô que ajude.",
  description: "Um curso de robótica de 8 semanas para o 5.º ao 7.º ano. Os estudantes aprendem o que faz de algo um robô, constroem uma base que se move, programam instruções exatas, acrescentam sensores, fazem os robôs reagirem com laços de repetição e condições, depuram para garantir confiabilidade, planejam uma missão autônoma e terminam projetando um robô que resolve um problema real. Toda semana o trabalho acontece com um kit físico, com um simulador no navegador ou sem eletrônicos, com materiais de casa.",
  gradeRange: "5.º ao 7.º ano",
  duration: "8 semanas",
  estimatedTimePerModule: "60 a 90 minutos",
  requirement: "Um kit de robótica, um navegador ou materiais de casa: qualquer um dos três caminhos funciona",
  summary: "Robótica e Automação ensina como os robôs de verdade funcionam, construindo uma ideia de cada vez. Os estudantes começam separando robôs de máquinas comuns, depois montam uma base com rodas, dão a ela instruções exatas, acrescentam sensores e fazem com que ela reaja ao mundo com laços de repetição e condições. As últimas semanas se concentram em depurar para garantir confiabilidade e em planejar uma missão autônoma e segura, e o curso termina com um projeto final em que cada estudante projeta, constrói ou simula, programa, testa e melhora um robô que faz um trabalho útil. O curso inteiro pode ser seguido de três formas (com um kit programável, com um simulador no navegador ou sem eletrônicos, com papelão e programação no papel), então qualquer sala de aula, biblioteca ou casa consegue participar.",
  format: [
    "Uma grande ideia da robótica e uma missão principal por semana, numa ordem que vai somando.",
    "Toda semana funciona de três formas: com um kit físico, com um simulador no navegador ou sem eletrônicos, com materiais de casa.",
    "Cada semana segue o mesmo percurso: aprender, explorar, construir, programar, testar e refletir.",
    "Os estudantes preveem, testam e registram resultados reais, e depuram quando algo dá errado.",
    "O curso termina com um projeto final e uma rubrica em que os estudantes projetam um robô que ajuda.",
  ],
  learningGoals: [
    "Explicar o que faz de algo um robô e como ele percebe, decide e age",
    "Construir uma base de robô estável que se move",
    "Programar sequências exatas de instruções",
    "Usar sensores, limiares e calibração",
    "Fazer os robôs reagirem com laços de repetição e condições",
    "Depurar problemas mecânicos, de programação e de sensores para garantir confiabilidade",
    "Planejar uma missão autônoma e segura com um fluxograma",
    "Projetar, construir, programar, testar e melhorar um robô que ajude",
  ],
  equipmentPaths: [
    {
      label: "Kit de robótica",
      description: "Um kit de robótica programável com motores e sensores (de qualquer marca). É a melhor opção quando a turma ou a família já tem um.",
      needs: "Um kit de robótica programável com pelo menos um motor e um sensor, além do aplicativo ou programa dele.",
    },
    {
      label: "Simulador no navegador",
      description: "Um robô de blocos que você arrasta e dirige numa grade dentro do navegador. Não precisa de equipamento nenhum e funciona em qualquer computador ou tablet.",
      needs: "Um computador ou tablet com um navegador de internet atual.",
    },
    {
      label: "Sem eletrônicos / materiais de casa",
      description: "Um robô de papelão e barbante, mais programação no papel. É a melhor opção quando não há kit nem aparelhos confiáveis.",
      needs: "Papelão, fita adesiva, barbante, canetinhas e material reciclável do dia a dia.",
    },
  ],
  modules: [
    {
      title: "O que faz de algo um robô?",
      subtitle: "Separe os robôs das máquinas comuns e mapeie como um robô percebe, pensa e age.",
      summary: "Os estudantes descobrem o que de fato faz de algo um robô, e não apenas uma máquina. Eles aprendem que um robô percebe o mundo, decide o que fazer e então age (o ciclo de entrada, processamento e saída), e que é o programa que permite a ele repetir o trabalho sozinho. Investigam aparelhos reais, representam um deles como sistema robótico e esboçam um robô útil da própria cabeça.",
      mainMission: "Decidir o que conta como robô, e depois mapear e projetar um robô que faça um trabalho útil.",
      estimatedTime: "60 a 75 minutos",
      learningGoals: [
        {
          text: "Explicar o que faz de algo um robô, e não uma máquina simples",
        },
        {
          text: "Descrever o ciclo de entrada, processamento e saída num aparelho real",
        },
        {
          text: "Explicar o papel do controlador como cérebro do robô",
        },
        {
          text: "Identificar os sensores e os atuadores de um robô",
        },
        {
          text: "Distinguir sistemas autônomos de sistemas por controle remoto",
        },
        {
          text: "Projetar um sistema robótico para uma tarefa útil",
        },
        {
          text: "Esboçar um robô útil e rotular suas entradas, seu processamento e suas saídas",
        },
      ],
      vocabulary: [
        {
          term: "Robô",
          definition: "Uma máquina capaz de perceber o que está à sua volta, decidir o que fazer e agir sozinha seguindo um programa.",
        },
        {
          term: "Máquina",
          definition: "Uma ferramenta que faz um trabalho, como uma bicicleta ou um grampeador. Uma máquina só é um robô se conseguir perceber e decidir sozinha.",
        },
        {
          term: "Entrada",
          definition: "A informação que o robô recebe do mundo, quase sempre por meio de um sensor.",
        },
        {
          term: "Processamento",
          definition: "A etapa de \"pensar\", em que o controlador usa as entradas para decidir o que fazer.",
        },
        {
          term: "Saída",
          definition: "A ação que o robô realiza, como girar uma roda ou acender uma luz.",
        },
        {
          term: "Controlador",
          definition: "O \"cérebro\" do robô: o pequeno computador que executa o programa e toma as decisões.",
        },
        {
          term: "Sensor",
          definition: "Uma peça que mede alguma coisa do mundo, como distância, luz ou toque.",
        },
        {
          term: "Atuador",
          definition: "Uma peça que faz algo se mover ou acontecer, como um motor, uma roda ou uma campainha.",
        },
        {
          term: "Programa",
          definition: "Um conjunto de instruções que o controlador segue para fazer um trabalho sempre do mesmo jeito.",
        },
        {
          term: "Autônomo",
          definition: "Que age por conta própria, usando sensores e um programa, sem ninguém pilotando.",
        },
        {
          term: "Por controle remoto",
          definition: "Pilotado por uma pessoa em tempo real, por exemplo com um joystick ou um aplicativo.",
        },
      ],
      concepts: [
        {
          title: "O que é um robô de verdade",
          body: [
            "As pessoas chamam todo tipo de coisa de robô, mas um robô de verdade tem três capacidades: consegue perceber o mundo, decidir o que fazer e agir, e faz tudo isso sozinho seguindo um programa.",
            "Um carrinho de brinquedo que você empurra não é um robô. Já um carro que percebe uma parede à frente e para sozinho chega mais perto disso, porque percebe e decide.",
          ],
          examples: [
            "Um robô aspirador",
            "Um caixa de autoatendimento que lê os produtos",
            "Uma porta automática que percebe você chegando",
          ],
        },
        {
          title: "Máquinas x robôs",
          body: [
            "Todo robô é uma máquina, mas nem toda máquina é um robô. Um grampeador e uma bicicleta são máquinas: fazem um trabalho, mas quem toma todas as decisões é uma pessoa.",
            "A linha divisória está em perceber e decidir. Se o aparelho consegue receber informação e mudar o que faz por causa dela, ele está agindo como um robô.",
          ],
          examples: [
            "Bicicleta = máquina",
            "Robô aspirador = robô",
            "Torradeira sem sensor = máquina",
            "Torradeira que percebe quando o pão está pronto = parecida com um robô",
          ],
        },
        {
          title: "Entradas, processamento e saídas",
          body: [
            "Os robôs trabalham em ciclo: entrada, depois processamento, depois saída. Primeiro um sensor dá uma entrada (por exemplo, \"a parede está perto\"). Depois o controlador faz o processamento (decide \"preciso parar\"). Em seguida um atuador produz a saída (as rodas param).",
            "Esse ciclo se repete sem parar, várias vezes por segundo, e é assim que o robô continua reagindo a um mundo que muda.",
          ],
        },
        {
          title: "As três partes principais: controlador, sensores e atuadores",
          body: [
            "Um robô tem um controlador (o cérebro dele), um ou mais sensores (com que percebe) e um ou mais atuadores (com que age).",
            "O controlador executa o programa. Os sensores mandam as entradas para ele. Os atuadores realizam as saídas dele. Tire os sensores e ele não consegue perceber; tire o controlador e ele não consegue decidir.",
          ],
          examples: [
            "Controlador: a placa com o pequeno computador",
            "Sensores: de distância, de luz, de toque, de cor",
            "Atuadores: motores, rodas, garras, campainhas, luzes",
          ],
        },
        {
          title: "Um programa deixa tudo repetível",
          body: [
            "Um programa é a lista de instruções que o controlador segue. Como o robô segue um programa, ele consegue fazer o mesmo trabalho de novo e de novo sem que ninguém guie cada passo.",
            "Mude o programa e o robô vai se comportar de outro jeito, mesmo com o mesmo corpo e os mesmos sensores. É por isso que robótica tem tanto a ver com instruções quanto com montagem.",
          ],
        },
        {
          title: "Autônomo x controle remoto",
          body: [
            "Um sistema autônomo executa o próprio programa e usa os sensores para decidir, sem ninguém pilotando. Um sistema por controle remoto faz exatamente o que uma pessoa manda, a cada instante.",
            "Um drone pilotado com um controle é por controle remoto. Um robô aspirador que limpa um cômodo sozinho é autônomo. Muitos robôs de verdade conseguem funcionar das duas formas, em momentos diferentes.",
          ],
          examples: [
            "Autônomos: robô aspirador, um veículo explorador de Marte fazendo um percurso planejado",
            "Por controle remoto: carrinho de controle remoto, um drone num joystick",
          ],
        },
        {
          title: "Robôs e máquinas por todo lado",
          body: [
            "Aplique o teste de perceber, decidir e agir nas coisas que você vê todo dia. Algumas são robôs de verdade, outras são só máquinas e outras ficam no meio do caminho.",
            "Uma porta de correr automática percebe você e abre: ela decide. Um veículo explorador de Marte, um braço robótico programado e uma caixa de som controlada por voz percebem, decidem e agem, então são robôs. Um carrinho de controle remoto só faz o que a pessoa manda. Uma torradeira simples e um brinquedo de corda não percebem nem decidem nada. Uma máquina de lavar fica no meio do caminho: ela percebe a água e segue um programa, mas só repete ciclos fixos.",
          ],
          examples: [
            "Robôs: porta de correr automática, veículo explorador de Marte, braço robótico, caixa de som controlada por voz",
            "Só máquinas: carrinho de controle remoto, torradeira simples, brinquedo de corda",
            "No meio do caminho: máquina de lavar",
          ],
        },
      ],
      materials: [
        {
          name: "Três ou quatro aparelhos do dia a dia para investigar (brinquedo, celular, lanterna, robô aspirador etc.)",
        },
        {
          name: "Folha de atividade Mapa do Sistema Robótico (para imprimir)",
        },
        {
          name: "Lápis e papel para desenhar",
        },
        {
          name: "Um kit de robótica programável, se houver",
        },
        {
          name: "Computador ou tablet com um navegador",
        },
        {
          name: "Caixas recicladas, canetinhas e material de artesanato para montar um modelo de robô",
        },
      ],
      activities: [
        {
          title: "Investigação: é robô ou não?",
          goal: "Classificar aparelhos reais como robô, máquina ou meio-termo, e defender cada escolha com o teste de perceber, decidir e agir.",
          shared: [
            "Olhe cada aparelho e faça três perguntas: ele consegue perceber alguma coisa? Consegue decidir sozinho? Consegue agir? Um robô de verdade consegue fazer as três coisas sozinho.",
            "Coloque cada aparelho numa linha que vai de \"só uma máquina\" até \"robô completo\" e escreva um motivo para o lugar onde você o colocou.",
          ],
          variants: {
            kit: {
              title: "Investigue o robô do seu kit e mais três aparelhos",
              materials: [
                "Um kit de robótica programável",
                "Três aparelhos do dia a dia",
              ],
              instructions: [
                "Ligue o robô do kit e deixe que ele execute um comportamento simples que já vem pronto. Repare no que ele percebe e no que ele faz.",
                "Compare com uma lanterna, um brinquedo de corda e um celular. Para cada um, decida se percebe, decide e age: sim ou não.",
                "Coloque os quatro aparelhos na linha de máquina a robô e dê um motivo para cada um.",
              ],
              safetyNotes: [
                "Mantenha os dedos longe das rodas e engrenagens enquanto o robô estiver funcionando.",
              ],
              expectedResult: "O robô do kit fica perto da ponta do \"robô\" porque percebe, decide e age; a lanterna e o brinquedo de corda ficam perto de \"máquina\".",
              successCriteria: [
                "Cada aparelho tem uma resposta de perceber, decidir e agir",
                "Cada posição tem um motivo escrito",
              ],
              troubleshooting: [
                {
                  problem: "O robô só anda em linha reta e nunca reage",
                  fix: "Carregue um comportamento que use um sensor (como parar diante de uma parede) para os estudantes verem o robô decidir.",
                },
              ],
              extension: "Ache em casa um aparelho difícil de classificar e explique por que ele fica no meio do caminho.",
            },
            simulator: {
              title: "Compare os robôs do simulador com aparelhos reais",
              materials: [
                "Simulador no navegador",
                "Três aparelhos do dia a dia",
              ],
              instructions: [
                "Abra o simulador e coloque para rodar um robô que reage a uma parede. Repare na entrada (parede detectada) e na saída (parar).",
                "Compare com uma lanterna, um brinquedo de corda e um celular, usando perceber, decidir e agir.",
                "Coloque os quatro na linha de máquina a robô, com os motivos.",
              ],
              safetyNotes: [
                "Não há riscos físicos; dê uma pausa na tela se precisar.",
              ],
              expectedResult: "Os estudantes veem o robô do simulador reagir a uma entrada e o colocam perto da ponta do robô.",
              successCriteria: [
                "Cada aparelho tem uma resposta de perceber, decidir e agir",
                "Cada posição tem um motivo escrito",
              ],
              troubleshooting: [
                {
                  problem: "Não está claro o que o robô do simulador está percebendo",
                  fix: "Mostre a leitura do sensor no simulador e relacione com a ação do robô.",
                },
              ],
              extension: "Preveja como o robô do simulador se comportaria com o sensor desligado e depois teste.",
            },
            unplugged: {
              title: "Classifique aparelhos de casa com o teste do robô",
              materials: [
                "Quatro aparelhos do dia a dia (ou cartões com figuras)",
                "Folha de atividade Mapa do Sistema Robótico",
              ],
              instructions: [
                "Junte quatro aparelhos, por exemplo uma lanterna, um brinquedo de corda, um dispenser automático de sabonete e um celular.",
                "Para cada um, decida se percebe, decide e age (sim ou não), e represente com um colega se estiver em dúvida.",
                "Coloque todos na linha de máquina a robô e escreva um motivo para cada um.",
              ],
              safetyNotes: [
                "Use apenas objetos seguros e do dia a dia; não abra aparelhos eletrônicos.",
              ],
              expectedResult: "O dispenser de sabonete e o celular ficam mais perto de robô; a lanterna e o brinquedo de corda ficam mais perto de máquina.",
              successCriteria: [
                "Cada aparelho tem uma resposta de perceber, decidir e agir",
                "Cada posição tem um motivo escrito",
              ],
              troubleshooting: [
                {
                  problem: "Tudo parece ser \"só uma máquina\"",
                  fix: "Pergunte qual aparelho muda o que faz sem uma pessoa mandar: essa é a pista de que ele percebe e decide.",
                },
              ],
              extension: "Acrescente um quinto aparelho misterioso, difícil de posicionar, e debatam em grupo.",
            },
          },
        },
        {
          title: "Mapa do Sistema Robótico",
          goal: "Representar um aparelho real como sistema robótico: rotular suas entradas, seu processamento, suas saídas, seu controlador, seus sensores e seus atuadores.",
          shared: [
            "Escolha um aparelho que perceba e decida. Na folha do mapa, desenhe setas para o ciclo de entrada, processamento e saída.",
            "Depois rotule as três partes: qual peça é o controlador, quais são os sensores e quais são os atuadores.",
          ],
          variants: {
            kit: {
              title: "Mapeie o robô do seu kit",
              materials: [
                "O robô do kit",
                "Folha de atividade Mapa do Sistema Robótico",
              ],
              instructions: [
                "Ache o controlador (a placa principal), os sensores e os atuadores (os motores) no robô do kit.",
                "Preencha o ciclo de entrada, processamento e saída para um comportamento, como \"parar antes da parede\".",
                "Rotule cada peça real no seu mapa.",
              ],
              safetyNotes: [
                "Manuseie o robô com cuidado; não puxe os fios.",
              ],
              expectedResult: "Um mapa pronto mostrando entrada (leitura do sensor) -> processamento (o controlador decide) -> saída (o motor age), com as peças reais rotuladas.",
              successCriteria: [
                "A entrada, o processamento e a saída estão todos preenchidos",
                "O controlador, o sensor e o atuador estão rotulados",
              ],
              troubleshooting: [
                {
                  problem: "Não dá para diferenciar o sensor do atuador",
                  fix: "O sensor mede; o atuador movimenta. Pergunte qual das peças provoca o movimento.",
                },
              ],
            },
            simulator: {
              title: "Mapeie um robô do simulador",
              materials: [
                "Simulador no navegador",
                "Folha de atividade Mapa do Sistema Robótico",
              ],
              instructions: [
                "No simulador, identifique a leitura do sensor (a entrada) e os blocos de movimento (a saída).",
                "Descreva o processamento: que regra transforma a entrada em saída?",
                "Preencha o ciclo no mapa e rotule o controlador, o sensor e o atuador.",
              ],
              safetyNotes: [
                "Não há riscos físicos.",
              ],
              expectedResult: "Um mapa completo do robô do simulador, com um ciclo claro de entrada, processamento e saída.",
              successCriteria: [
                "A entrada, o processamento e a saída estão todos preenchidos",
                "O controlador, o sensor e o atuador estão rotulados",
              ],
              troubleshooting: [
                {
                  problem: "O quadro do processamento ficou em branco",
                  fix: "Escreva a regra assim: \"se o sensor disser X, então faça Y\".",
                },
              ],
            },
            unplugged: {
              title: "Mapeie um aparelho automático da sua casa",
              materials: [
                "Um aparelho como uma porta automática, um dispenser de sabonete ou um robô aspirador (ou uma figura)",
                "Folha de atividade Mapa do Sistema Robótico",
              ],
              instructions: [
                "Escolha um aparelho automático que você já viu funcionando.",
                "Descubra o que ele percebe (a entrada), como parece decidir (o processamento) e o que ele faz (a saída).",
                "Preencha o ciclo e rotule onde estariam o controlador, o sensor e o atuador.",
              ],
              safetyNotes: [
                "Não desmonte eletrodomésticos de verdade; trabalhe a partir da observação.",
              ],
              expectedResult: "Um mapa completo de um aparelho automático real, com o ciclo e as três partes rotuladas.",
              successCriteria: [
                "A entrada, o processamento e a saída estão todos preenchidos",
                "O controlador, o sensor e o atuador estão rotulados",
              ],
              troubleshooting: [
                {
                  problem: "Não está claro qual é o controlador",
                  fix: "É o \"cérebro\" escondido que recebe o recado do sensor e manda o atuador agir.",
                },
              ],
            },
          },
        },
        {
          title: "Desafio de projeto: Robô Útil",
          goal: "Inventar um robô que faça um trabalho útil e desenhá-lo com as entradas, o processamento e as saídas rotulados.",
          shared: [
            "Pense num problema pequeno e real, em casa ou na escola, com o qual um robô poderia ajudar.",
            "Desenhe seu robô e rotule pelo menos um sensor (entrada), a decisão que ele toma (processamento) e pelo menos um atuador (saída).",
          ],
          variants: {
            kit: {
              title: "Projete um ajudante, se inspirando no seu kit",
              materials: [
                "O robô do kit como referência",
                "Lápis e papel",
              ],
              instructions: [
                "Veja o que os sensores e os motores do seu kit conseguem fazer, para tirar ideias.",
                "Desenhe um robô útil e rotule a entrada, o processamento e a saída dele.",
                "Escreva uma frase sobre o trabalho que ele faz e quem ele ajuda.",
              ],
              safetyNotes: [
                "Nesta semana não é preciso montar nada; é só um desenho de projeto.",
              ],
              expectedResult: "Um desenho rotulado de um robô ajudante convincente, com um trabalho bem definido.",
              successCriteria: [
                "Pelo menos um sensor e um atuador estão rotulados",
                "A decisão do processamento está escrita",
                "O trabalho e quem ele ajuda estão nomeados",
              ],
              troubleshooting: [
                {
                  problem: "O robô não tem nenhum sensor",
                  fix: "Pergunte: como ele sabe a hora de agir? É aí que entra um sensor.",
                },
              ],
              extension: "Liste quais sensores de verdade do seu kit combinariam com o seu projeto.",
            },
            simulator: {
              title: "Projete um ajudante que você poderia montar depois no simulador",
              materials: [
                "Lápis e papel",
                "Simulador no navegador, como referência",
              ],
              instructions: [
                "Desenhe um robô útil que pudesse trabalhar numa grade, como um ajudante de entregas.",
                "Rotule a entrada, o processamento e a saída dele.",
                "Escreva a única regra que ele segue, no formato \"se... então...\".",
              ],
              safetyNotes: [
                "Não há riscos físicos.",
              ],
              expectedResult: "Um desenho rotulado com uma regra se-então bem clara, que o simulador poderia executar mais adiante.",
              successCriteria: [
                "Pelo menos um sensor e um atuador estão rotulados",
                "A decisão do processamento está escrita no formato se-então",
                "O trabalho e quem ele ajuda estão nomeados",
              ],
              troubleshooting: [
                {
                  problem: "A ideia é grande demais para desenhar",
                  fix: "Reduza a ideia a um único trabalho que o robô faça numa grade pequena.",
                },
              ],
              extension: "Desenhe o mapa da grade em que o seu ajudante trabalharia.",
            },
            unplugged: {
              title: "Projete e monte um robô ajudante de papel",
              materials: [
                "Lápis e papel",
                "Caixas recicladas e canetinhas (opcional)",
              ],
              instructions: [
                "Desenhe um robô útil para um problema real da sua casa.",
                "Rotule a entrada, o processamento e a saída, e dê nome ao sensor e ao atuador.",
                "Se tiver material, monte rapidinho um modelo com uma caixa para mostrar as partes.",
              ],
              safetyNotes: [
                "Se for montar um modelo, use tesoura sem ponta e faça isso com um adulto.",
              ],
              expectedResult: "Um desenho rotulado (e um modelo, se quiser) de um robô ajudante com um trabalho bem definido.",
              successCriteria: [
                "Pelo menos um sensor e um atuador estão rotulados",
                "A decisão do processamento está escrita",
                "O trabalho e quem ele ajuda estão nomeados",
              ],
              troubleshooting: [
                {
                  problem: "O modelo não tem nenhuma parte que se mexa",
                  fix: "Acrescente uma abinha, uma roda ou um braço para fazer as vezes de atuador.",
                },
              ],
              extension: "Dê um nome ao seu modelo e escreva um \"manual do usuário\" de uma frase só.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes da investigação: qual dos seus aparelhos você acha que é \"o mais robô\", e por quê?",
          howToCheck: "Compare o seu palpite com o lugar onde a turma o colocou na linha de máquina a robô, depois de aplicar o teste de perceber, decidir e agir.",
        },
      ],
      knowledgeCheck: {
        instructions: "Responda a estas perguntas para conferir se você consegue distinguir robôs de máquinas e nomear as partes deles.",
        questions: [
          {
            prompt: "Decida que tipo de sistema é este.",
            scenario: "Um carrinho de brinquedo anda para a frente quando você aperta um botão no controle e vira quando você mexe uma alavanca. Ele nunca muda o que faz por conta própria.",
            options: [
              {
                text: "Um robô autônomo",
                feedback: "Ele nunca decide nada sozinho, então não é autônomo.",
              },
              {
                text: "Uma máquina por controle remoto",
                feedback: "Isso mesmo: uma pessoa toma todas as decisões pelo controle, então é por controle remoto.",
              },
              {
                text: "Não é máquina nenhuma",
                feedback: "É sim uma máquina; ela faz um trabalho quando uma pessoa a comanda.",
              },
              {
                text: "Uma máquina com sensor de distância",
                feedback: "Nada na situação mede distância; quem percebe é a pessoa.",
              },
            ],
            explanation: "Uma pessoa decide cada movimento pelo controle, então é por controle remoto, e não um robô autônomo.",
          },
          {
            prompt: "Quais destes são atuadores? Marque todos que valem.",
            options: [
              {
                text: "Um motor que gira uma roda",
                feedback: "Sim: um motor faz algo se mover, então é um atuador.",
              },
              {
                text: "Um sensor de distância",
                feedback: "Esse é um sensor: ele mede, não age.",
              },
              {
                text: "Uma campainha que faz som",
                feedback: "Sim: uma campainha age sobre o mundo, então é um atuador.",
              },
              {
                text: "Uma luz que o robô acende",
                feedback: "Sim: a luz é uma saída que o robô consegue acender, então é um atuador.",
              },
            ],
            explanation: "Atuadores são as peças que agem: motores, campainhas e luzes. Um sensor só mede, então não é atuador.",
          },
          {
            prompt: "O que faz de algo um robô, e não apenas uma máquina?",
            options: [
              {
                text: "Ser feito de metal",
                feedback: "O material não importa: muitos robôs são de plástico e muitas coisas de metal não são robôs.",
              },
              {
                text: "Conseguir perceber, decidir e agir sozinho",
                feedback: "Isso mesmo: perceber, decidir e agir por conta própria é o teste do robô.",
              },
              {
                text: "Ter um botão de liga e desliga",
                feedback: "Muitas máquinas comuns têm botão e não conseguem decidir nada.",
              },
              {
                text: "Ser caro",
                feedback: "O preço não tem nada a ver com ser ou não um robô.",
              },
            ],
            explanation: "Um robô percebe o mundo, decide o que fazer e age, e faz tudo isso sozinho, seguindo um programa.",
          },
          {
            prompt: "No ciclo de entrada, processamento e saída, qual é a etapa do \"processamento\"?",
            options: [
              {
                text: "O robô mede o mundo com um sensor",
                feedback: "Essa é a etapa da entrada.",
              },
              {
                text: "O robô gira uma roda ou acende uma luz",
                feedback: "Essa é a etapa da saída.",
              },
              {
                text: "O controlador decide o que fazer com a entrada",
                feedback: "Correto: o processamento é a etapa em que o controlador decide.",
              },
              {
                text: "O robô carrega a bateria",
                feedback: "Carregar não faz parte do ciclo de perceber, decidir e agir.",
              },
            ],
            explanation: "O processamento é a etapa de \"pensar\": o controlador pega a entrada e decide que saída produzir.",
          },
          {
            prompt: "Qual parte de um robô é o atuador?",
            options: [
              {
                text: "O motor que gira a roda",
                feedback: "Sim: um atuador faz algo se mover ou acontecer.",
              },
              {
                text: "O sensor de distância",
                feedback: "Esse é um sensor: ele mede, não age.",
              },
              {
                text: "A placa do controlador",
                feedback: "O controlador decide; não é a parte que age.",
              },
              {
                text: "A bateria",
                feedback: "A bateria fornece energia, mas não é a parte que age.",
              },
            ],
            explanation: "Atuadores são as peças que agem: motores, rodas, garras, campainhas e luzes.",
          },
          {
            prompt: "Um robô aspirador limpa um cômodo sozinho, sem ninguém pilotando. Este é um exemplo de um sistema:",
            options: [
              {
                text: "Por controle remoto",
                feedback: "Por controle remoto quer dizer que uma pessoa pilota em tempo real.",
              },
              {
                text: "Autônomo",
                feedback: "Correto: ele executa o próprio programa e usa sensores para decidir.",
              },
              {
                text: "Que não é robô",
                feedback: "Ele percebe, decide e age, então é um robô.",
              },
              {
                text: "Quebrado",
                feedback: "Funcionar sozinho é exatamente o que um robô autônomo deve fazer.",
              },
            ],
            explanation: "Sistemas autônomos usam o próprio programa e os próprios sensores para decidir, sem ninguém pilotando.",
          },
          {
            prompt: "Por que um robô precisa de um programa?",
            options: [
              {
                text: "Para parecer mais moderno",
                feedback: "Um programa tem a ver com comportamento, não com aparência.",
              },
              {
                text: "Para conseguir fazer um trabalho sempre igual e sozinho, de novo e de novo",
                feedback: "Isso mesmo: o programa são as instruções que permitem a ele repetir um trabalho sem uma pessoa.",
              },
              {
                text: "Para conseguir ser mais pesado",
                feedback: "Um programa não tem nada a ver com peso.",
              },
              {
                text: "Para não precisar de sensores",
                feedback: "Os programas costumam usar sensores; eles não substituem os sensores.",
              },
            ],
            explanation: "Um programa é a lista de instruções que o controlador segue para o robô conseguir repetir um trabalho sozinho.",
          },
        ],
      },
      reflection: [
        {
          prompt: "Que trabalho você confiaria a um robô? Que trabalho ainda deveria ser feito por uma pessoa? Explique.",
        },
        {
          prompt: "Pense num robô que você já viu. O que ele percebe, o que ele decide e o que ele faz?",
        },
        {
          prompt: "Que trabalho você mais gostaria que um robô útil fizesse por você, e de que sensor ele precisaria?",
        },
      ],
      journalPrompts: [
        {
          prompt: "Desenhe o seu Robô Útil e rotule a entrada, o processamento e a saída dele.",
        },
        {
          prompt: "Escreva uma frase sobre o trabalho que o seu robô faz e quem ele ajuda.",
        },
      ],
      simulatorMissions: [
        {
          title: "Veja um robô reagir",
          objective: "Execute o robô de exemplo e veja como ele para quando o sensor detecta uma parede.",
          successCriteria: [
            "O robô para antes da parede",
            "O estudante consegue nomear a entrada e a saída",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "O que faz de um robô um robô",
          focus: "Perceber, decidir, agir e o ciclo de entrada, processamento e saída.",
        },
        {
          title: "Investigação: é robô ou não?",
          focus: "Classificar aparelhos reais com o teste de perceber, decidir e agir.",
        },
        {
          title: "Mapa do Sistema Robótico",
          focus: "Mapear a entrada, o processamento, a saída e as partes de um aparelho.",
        },
        {
          title: "Desafio de projeto: Robô Útil",
          focus: "Desenhar um robô ajudante com as partes rotuladas.",
        },
        {
          title: "Verificação de aprendizagem",
          focus: "Cinco perguntas sobre robôs, partes e o ciclo.",
        },
        {
          title: "Reflexão",
          focus: "Escrever sobre máquinas x robôs e sobre um ajudante que você gostaria de ter.",
        },
      ],
      safetyNotes: [
        {
          text: "Mantenha dedos, cabelo e roupas soltas longe das rodas e engrenagens em movimento dos robôs de kit.",
        },
        {
          text: "Não abra nem desmonte eletrodomésticos de verdade; investigue observando o funcionamento deles.",
        },
        {
          text: "Dê uma pausa curta na tela se os seus olhos cansarem durante o uso do simulador.",
        },
      ],
      printableResources: [
        {
          title: "Mapa do Sistema Robótico",
          description: "Uma folha de uma página para mapear a entrada, o processamento, a saída, o controlador, os sensores e os atuadores de um aparelho.",
        },
        {
          title: "Página de projeto do Robô Útil",
          description: "Espaço para desenhar e rotular as entradas, o processamento e as saídas de um robô ajudante.",
        },
        {
          title: "Guia do professor da semana 1",
          description: "Preparação, condução da aula, ideias equivocadas frequentes e perguntas para a aula de robô ou não.",
        },
      ],
      completion: {
        summary: "Termine a semana 1 mapeando um aparelho como sistema robótico, desenhando um robô útil e passando na verificação de aprendizagem.",
        requirements: [
          {
            label: "Completar o Mapa do Sistema Robótico de um aparelho",
          },
          {
            label: "Desenhar e rotular um Robô Útil",
          },
          {
            label: "Acertar pelo menos 4 de 5 na verificação de aprendizagem",
          },
          {
            label: "Escrever a sua reflexão",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Junte três ou quatro aparelhos do dia a dia que vão do claramente-uma-máquina ao claramente-um-robô.",
          "Imprima a folha de atividade Mapa do Sistema Robótico, uma por estudante ou por dupla.",
          "Se for usar kits, carregue-os e deixe um comportamento simples com sensor já carregado; se for usar o simulador, abra-o em cada aparelho.",
        ],
        prep: [
          "Faça você mesmo a classificação de robô ou não, para conseguir orientar os casos duvidosos.",
          "Deixe à mão o exemplo de um robô aspirador ou de uma porta automática como sistema autônomo conhecido.",
        ],
        facilitation: [
          "Comece pelo teste de perceber, decidir e agir e pelo ciclo de entrada, processamento e saída, antes de tirar qualquer aparelho da caixa.",
          "Conduza a investigação de robô ou não, cobrando dos estudantes uma justificativa para cada posição.",
          "Faça um Mapa do Sistema Robótico junto com a turma e depois deixe as duplas mapearem um segundo aparelho.",
          "Encerre com o desenho do Robô Útil e a verificação de aprendizagem.",
        ],
        commonMisconceptions: [
          "\"Tudo que é eletrônico é robô\": uma lanterna é eletrônica, mas não consegue decidir.",
          "\"Se anda, é robô\": um brinquedo de corda anda, mas não percebe nem decide.",
          "Confundir sensor com atuador: um mede e o outro age.",
        ],
        questionsToAsk: [
          "Como este aparelho sabe a hora de agir?",
          "O que aconteceria se a gente tirasse o sensor dele?",
          "Aqui quem decide é uma pessoa ou é o aparelho?",
        ],
        easierVersion: "Use cartões com figuras de aparelhos e classifiquem em grupo, em vez de mapear o ciclo inteiro.",
        harderVersion: "Peça aos estudantes que mapeiem um aparelho que pode ser autônomo e por controle remoto, e que expliquem quando ele é cada coisa.",
      },
      nextWeek: {
        teaser: "Semana que vem a gente para de falar sobre robôs e começa a construir um que realmente anda.",
        prepare: [
          "Guarde algumas caixas de papelão firmes e umas tampinhas de garrafa se você for pelo caminho sem eletrônicos.",
          "Carregue o seu kit ou salve o simulador nos favoritos.",
          "Pense no que faz uma coisa com rodas tombar ou ficar firme.",
        ],
      },
    },
    {
      title: "Construir um robô que anda",
      subtitle: "Transforme o giro de um motor em rolagem firme e projete um chassi que anda sem tombar.",
      summary: "Agora que os estudantes sabem o que é um robô, eles constroem um que realmente anda. Aprendem como um motor gira um eixo, como as rodas e as engrenagens transformam esse giro em movimento, e como as engrenagens trocam velocidade por força de giro (torque). Investigam por que algumas bases com rodas tombam e outras ficam firmes (o atrito e a aderência dão agarre, e um centro de massa baixo e largo dá estabilidade) e conhecem a tração diferencial, em que girar as duas rodas em velocidades diferentes é o que dirige o robô. Depois, cada estudante monta e testa a própria base com rodas.",
      mainMission: "Construir uma base com rodas estável e testar como as escolhas de roda, engrenagem e chassi mudam o jeito de ela andar.",
      estimatedTime: "65 a 80 minutos",
      learningGoals: [
        {
          text: "Explicar como o motor, o eixo e as rodas transformam o giro em rolagem",
        },
        {
          text: "Identificar as rodas, os eixos e as engrenagens de uma base com rodas",
        },
        {
          text: "Comparar velocidade e torque, e como as engrenagens trocam um pelo outro",
        },
        {
          text: "Usar o atrito e a aderência para explicar por que as rodas agarram ou patinam",
        },
        {
          text: "Reconhecer projetos de chassi estáveis e instáveis",
        },
        {
          text: "Explicar como a distância entre as rodas e o centro de massa afetam o equilíbrio",
        },
        {
          text: "Montar ou simular uma base com rodas e dirigi-la com tração diferencial",
        },
        {
          text: "Testar um projeto e melhorá-lo a partir dos resultados",
        },
      ],
      vocabulary: [
        {
          term: "Motor",
          definition: "Uma peça que gira quando recebe energia, dando ao robô o movimento de que ele precisa para rolar.",
        },
        {
          term: "Eixo",
          definition: "Uma haste em que a roda é presa, de modo que, quando o eixo gira, a roda gira junto.",
        },
        {
          term: "Roda",
          definition: "Uma peça redonda que faz o robô rolar pelo chão quando o eixo dela gira.",
        },
        {
          term: "Engrenagem",
          definition: "Uma roda dentada que se encaixa em outra para transmitir o giro e mudar a velocidade ou a força dele.",
        },
        {
          term: "Velocidade",
          definition: "O quão rápido o robô anda. Uma engrenagem pequena girando uma grande faz as rodas girarem mais devagar.",
        },
        {
          term: "Torque",
          definition: "A força de giro que um motor ou uma engrenagem tem. Mais torque significa mais força para mover um robô pesado ou para subir.",
        },
        {
          term: "Atrito",
          definition: "A força de roçamento entre duas superfícies que se tocam. Ela freia o deslizamento e faz as rodas agarrarem em vez de girar no mesmo lugar.",
        },
        {
          term: "Aderência",
          definition: "O quanto uma roda agarra no chão. Com boa aderência, a roda empurra o robô para a frente em vez de patinar.",
        },
        {
          term: "Equilíbrio",
          definition: "Distribuir o peso do robô para que ele fique em pé e não tombe.",
        },
        {
          term: "Estabilidade",
          definition: "O quanto é difícil tombar um robô. Uma base baixa e larga é mais estável do que uma alta e estreita.",
        },
        {
          term: "Centro de massa",
          definition: "O ponto médio onde o peso do robô se concentra. Quanto mais baixo o centro de massa, mais difícil é tombar o robô.",
        },
        {
          term: "Chassi",
          definition: "A estrutura ou base do robô que mantém os motores, as rodas e todo o resto unidos.",
        },
        {
          term: "Tração diferencial",
          definition: "Um jeito de dirigir girando as duas rodas laterais em velocidades diferentes: o robô vira para o lado da roda mais lenta.",
        },
      ],
      prerequisites: [
        {
          reason: "Na semana 1, motores e rodas foram apresentados como atuadores; a semana 2 mostra como esses atuadores de fato movem o robô, então os estudantes precisam antes do quadro de perceber, decidir e agir.",
        },
      ],
      concepts: [
        {
          title: "Do motor que gira ao robô que rola",
          body: [
            "Um motor gira quando recebe energia, mas um motor girando sozinho não vai a lugar nenhum. Para andar, o robô liga o motor a um eixo, e o eixo segura as rodas. Quando o motor gira o eixo, as rodas giram e o robô rola.",
            "Então a corrente é esta: o motor gira, o eixo roda, as rodas rolam. Se algum elo dessa corrente estiver frouxo ou faltando, o giro nunca chega ao chão e o robô fica parado.",
          ],
          examples: [
            "Um motor girando um eixo pelado, sem roda, só gira no ar",
            "Uma roda encaixada num eixo que gira faz o robô andar para a frente",
          ],
        },
        {
          title: "As engrenagens trocam velocidade por torque",
          body: [
            "Engrenagens são rodas dentadas que se encaixam para que uma gire a outra. Quando uma engrenagem pequena gira uma grande, a grande gira mais devagar, mas com mais força de giro. Quando uma grande gira uma pequena, a pequena gira mais rápido, mas com menos força.",
            "Essa força de giro se chama torque. As engrenagens deixam você escolher: um robô lento e forte, capaz de subir ou empurrar, ou um robô rápido e mais fraco, que voa por um piso plano. Você não consegue velocidade máxima e torque máximo ao mesmo tempo: troca um pelo outro.",
          ],
          examples: [
            "Uma bicicleta numa marcha leve: devagar, mas fácil de pedalar na subida (bastante torque)",
            "Uma bicicleta numa marcha pesada: rápida no plano, mas difícil de sair do lugar (pouco torque)",
          ],
        },
        {
          title: "Atrito e aderência: como as rodas agarram",
          body: [
            "Atrito é a força de roçamento entre duas superfícies que se tocam. Sem atrito, uma roda girando só patinaria no lugar e o robô não sairia dali, como pneus no gelo.",
            "Aderência é o quanto uma roda agarra no chão, e ela vem do atrito. Um pneu de borracha no carpete tem muita aderência; uma roda lisa de plástico num piso escorregadio tem pouquíssima. Com boa aderência, o giro da roda vira movimento para a frente de verdade.",
          ],
          examples: [
            "Pneus de borracha agarram no asfalto (muita aderência)",
            "Uma roda girando numa superfície molhada ou lisa (pouca aderência)",
            "Colocar um elástico em volta de uma roda escorregadia para ela agarrar melhor",
          ],
        },
        {
          title: "Equilíbrio, estabilidade e centro de massa",
          body: [
            "O centro de massa é o ponto médio onde o peso do robô se concentra. Um robô tomba quando o centro de massa dele passa para fora das rodas.",
            "Para deixar um robô mais estável, mantenha o centro de massa baixo e a base larga. Uma base baixa e larga é difícil de tombar; uma alta, estreita e pesada em cima tomba fácil. É por isso que carros de corrida são baixos e largos, e por isso que uma torre de blocos cai quando fica alta demais.",
          ],
          examples: [
            "Uma base baixa e larga fica em pé numa curva",
            "Uma torre alta de peças tomba quando o robô freia de repente",
            "Colocar a bateria pesada bem embaixo no chassi para abaixar o centro de massa",
          ],
        },
        {
          title: "Projeto do chassi: a estrutura do robô",
          body: [
            "O chassi é a estrutura que mantém unidos os motores, os eixos, as rodas e a bateria. Um bom chassi mantém as rodas alinhadas, segura os motores com firmeza e coloca as peças pesadas embaixo.",
            "As escolhas de projeto importam: rodas afastadas ou juntas demais, um motor frouxo ou uma estrutura bamba mudam o jeito de o robô andar. O chassi não é só uma caixa: é ele que decide se o robô rola reto, faz curvas limpas e fica em pé.",
          ],
          examples: [
            "Rodas bem alinhadas para o robô rolar em linha reta",
            "Uma estrutura firme para o motor não balançar",
            "O peso mantido embaixo e centralizado sobre as rodas",
          ],
        },
        {
          title: "Tração diferencial: dirigir pela velocidade",
          body: [
            "A maioria dos robôs pequenos é dirigida por tração diferencial: duas rodas, uma de cada lado, cada uma girada pelo próprio motor. Quando as duas rodas giram na mesma velocidade, o robô vai reto.",
            "Para virar, você gira as rodas em velocidades diferentes. O robô faz a curva para o lado da roda mais lenta. Se uma roda vai para a frente e a outra para trás, o robô gira no próprio eixo. Não existe volante: a diferença de velocidade entre as rodas é a direção.",
          ],
          examples: [
            "As duas rodas na mesma velocidade: reto para a frente",
            "Roda esquerda mais lenta que a direita: o robô faz a curva para a esquerda",
            "Roda esquerda para a frente e direita para trás: o robô gira no próprio eixo",
          ],
        },
      ],
      materials: [
        {
          name: "Folha de atividade Registro de Testes do Chassi (para imprimir)",
        },
        {
          name: "Lápis, papel e uma régua ou fita métrica",
        },
        {
          name: "Uma rampa curta ou uma pilha de livros para formar um plano inclinado para o teste de tombamento",
        },
        {
          name: "Um kit de robótica programável com dois motores, rodas, eixos e engrenagens",
        },
        {
          name: "Rodas e engrenagens variadas do kit, para trocar e comparar",
        },
        {
          name: "Computador ou tablet com o simulador no navegador",
        },
        {
          name: "Papelão para o chassi, além de fita adesiva e tesoura",
        },
        {
          name: "Tampinhas de garrafa ou de pote para as rodas e espetinhos de madeira ou canudos para os eixos",
        },
        {
          name: "Elásticos, moedas ou massinha para acrescentar aderência e peso",
        },
        {
          name: "Uma bolinha de gude ou bolinha pequena para mostrar o centro de massa se deslocando",
        },
      ],
      activities: [
        {
          title: "Investigação virtual do chassi",
          goal: "Explorar como o tamanho da roda, as engrenagens e o formato da base mudam o jeito de uma base com rodas andar, agarrar e ficar em pé.",
          shared: [
            "Você vai mudar uma coisa de cada vez (tamanho da roda, engrenagens, largura da base ou peso) e observar como a base anda. Mudar uma coisa de cada vez é o jeito de saber qual mudança causou o quê.",
            "A cada mudança, anote o que aconteceu com a velocidade, a aderência e a estabilidade. Escreva qual montagem rolou reto e rápido, e qual ficou mais firme.",
          ],
          variants: {
            kit: {
              title: "Troque rodas e engrenagens de verdade numa base de kit",
              materials: [
                "Um kit de robótica programável com dois motores",
                "Rodas e engrenagens variadas do kit",
                "Folha de atividade Registro de Testes do Chassi",
              ],
              instructions: [
                "Monte uma base simples com dois motores e faça-a andar reto pelo chão numa velocidade fixa.",
                "Troque as rodas por um par maior ou menor e percorra a mesma distância de novo. Anote a mudança na velocidade.",
                "Mude as engrenagens (ou a potência do motor) para as rodas girarem mais devagar, e sinta o quanto fica mais difícil parar a base: isso é mais torque.",
                "Coloque uma peça alta em cima, depois abaixe o peso, e veja qual das versões tomba mais fácil.",
              ],
              safetyNotes: [
                "Mantenha dedos, cabelo e roupas soltas longe das engrenagens e rodas em movimento.",
                "Desligue o motor antes de trocar rodas ou engrenagens.",
              ],
              expectedResult: "Rodas maiores rolam mais rápido, mas custam mais para sair do lugar; uma relação de engrenagens mais baixa dá mais torque; uma base baixa e larga é a mais difícil de tombar.",
              successCriteria: [
                "Pelo menos três montagens testadas e registradas",
                "Cada mudança descreve o efeito dela na velocidade, na aderência ou na estabilidade",
                "Uma montagem é apontada como a mais estável, com um motivo",
              ],
              troubleshooting: [
                {
                  problem: "A base faz curva em vez de ir reto",
                  fix: "Verifique se as duas rodas estão bem apertadas e se os motores giram na mesma velocidade; uma roda frouxa ou motores desiguais fazem a base curvar.",
                },
                {
                  problem: "Uma roda gira, mas a base não sai do lugar",
                  fix: "A roda está patinando: pouca aderência. Tente uma roda que agarre mais ou uma superfície mais áspera.",
                },
              ],
              extension: "Encontre a combinação de roda e engrenagem que sobe a sua rampa sem travar.",
            },
            simulator: {
              title: "Teste escolhas de chassi no simulador",
              materials: [
                "Simulador no navegador",
                "Folha de atividade Registro de Testes do Chassi",
              ],
              instructions: [
                "Abra a missão do laboratório de chassi e atravesse a grade com a base padrão, anotando a velocidade dela.",
                "Mude o ajuste de tamanho da roda, rode de novo e registre como mudam a velocidade e a aderência.",
                "Ajuste as engrenagens para mais torque e suba o plano inclinado do simulador; veja como uma relação baixa sobe onde uma alta trava.",
                "Suba e abaixe o centro de massa da base, depois faça uma curva rápida e veja em qual ajuste ela tomba ou balança.",
              ],
              safetyNotes: [
                "Não há riscos físicos; dê uma pausa na tela se os olhos cansarem.",
              ],
              expectedResult: "O simulador mostra rodas grandes indo mais rápido, uma relação de engrenagens baixa dando mais torque para subir, e um centro de massa baixo mantendo a base em pé nas curvas.",
              successCriteria: [
                "Pelo menos três montagens testadas e registradas",
                "Cada mudança descreve o efeito dela na velocidade, na aderência ou na estabilidade",
                "Uma montagem é apontada como a mais estável, com um motivo",
              ],
              troubleshooting: [
                {
                  problem: "Todas as montagens andam igual",
                  fix: "Confira se você mudou o ajuste e rodou de novo; mude um ajuste de cada vez para o efeito ficar claro.",
                },
                {
                  problem: "A base sempre tomba nas curvas",
                  fix: "Abaixe o centro de massa ou alargue a base, e depois faça a curva um pouco mais devagar.",
                },
              ],
              extension: "Descubra o único ajuste que mais melhora a subida da base pelo plano inclinado.",
            },
            unplugged: {
              title: "Compare bases de papelão com rodas caseiras",
              materials: [
                "Papelão para duas bases pequenas",
                "Tampinhas de garrafa e espetinhos ou canudos",
                "Elásticos, moedas ou massinha (opcional)",
                "Uma rampa ou uma pilha de livros",
                "Folha de atividade Registro de Testes do Chassi",
              ],
              instructions: [
                "Faça uma base simples de papelão com tampinhas como rodas em eixos de espetinho e deixe rolar por uma rampa suave.",
                "Troque por tampinhas maiores, role de novo e anote a mudança em quão longe e quão rápido ela vai.",
                "Enrole elásticos nas rodas para dar aderência, depois role numa superfície lisa e compare com as tampinhas sem nada: isso é aderência.",
                "Monte uma versão alta e uma baixa e larga, e incline cada uma na rampa para ver qual tomba primeiro.",
              ],
              safetyNotes: [
                "Use tesoura sem ponta com um adulto para cortar o papelão e os furos dos eixos.",
                "Mantenha as pontas dos espetinhos protegidas ou sem ponta.",
              ],
              expectedResult: "Rodas maiores rolam mais longe, rodas com elástico agarram melhor, e a base baixa e larga tomba num ângulo mais inclinado do que a alta.",
              successCriteria: [
                "Pelo menos três montagens testadas e registradas",
                "Cada mudança descreve o efeito dela na velocidade, na aderência ou na estabilidade",
                "Uma montagem é apontada como a mais estável, com um motivo",
              ],
              troubleshooting: [
                {
                  problem: "A base rola torta",
                  fix: "Alinhe os eixos para ficarem paralelos e use rodas do mesmo tamanho de cada lado.",
                },
                {
                  problem: "As rodas deslizam em vez de rolar",
                  fix: "O eixo pode estar preso. Aumente um pouco o furo para o eixo girar livre.",
                },
              ],
              extension: "Coloque uma moeda embaixo na base e depois lá em cima, e descubra qual posição a deixa mais firme na rampa.",
            },
          },
        },
        {
          title: "Desafio da base com rodas",
          goal: "Montar uma base com rodas que anda reto, fica em pé e consegue ser dirigida por tração diferencial.",
          shared: [
            "Monte uma base com duas rodas motrizes, uma de cada lado, mais um apoio na frente ou atrás para ela não tombar. Mantenha as peças pesadas embaixo e as rodas bem alinhadas.",
            "Teste três coisas: ela rola reto? Dá para dirigi-la girando as rodas em velocidades diferentes? Ela fica em pé quando para e quando faz curva? Corrija uma coisa de cada vez até as três funcionarem.",
          ],
          variants: {
            kit: {
              title: "Base com rodas usando kit físico",
              materials: [
                "Um kit de robótica programável com dois motores, rodas e eixos",
                "Uma rampa ou livros para o teste de tombamento",
                "Folha de atividade Registro de Testes do Chassi",
              ],
              instructions: [
                "Monte um chassi que segure firme dois motores, cada um girando uma roda lateral, com um rodízio ou uma sapata para equilibrar o terceiro ponto de apoio.",
                "Mantenha a bateria e as peças pesadas embaixo e centralizadas, para o centro de massa ficar baixo.",
                "Faça-a andar para a frente e ajuste até rolar reto, depois gire as duas rodas em velocidades diferentes para fazê-la virar.",
                "Teste a estabilidade freando de repente e andando por um plano levemente inclinado.",
              ],
              safetyNotes: [
                "Fique longe das rodas e engrenagens em movimento enquanto ela anda.",
                "Teste numa área livre, longe de bordas e escadas.",
              ],
              expectedResult: "Uma base de kit que rola reto, vira por tração diferencial e fica em pé ao frear e num plano levemente inclinado.",
              successCriteria: [
                "Rola reto por pelo menos um metro",
                "Vira para a esquerda e para a direita mudando a velocidade das rodas",
                "Fica em pé ao frear de repente",
                "Os motores e as rodas estão bem presos",
              ],
              troubleshooting: [
                {
                  problem: "Ela sempre puxa para um lado",
                  fix: "Um motor pode estar mais rápido ou uma roda frouxa; iguale a velocidade dos motores e aperte as duas rodas.",
                },
                {
                  problem: "Ela tomba para a frente quando para",
                  fix: "O centro de massa está alto demais ou muito à frente; abaixe o peso e recue-o para cima das rodas.",
                },
              ],
              extension: "Programe-a para percorrer uma linha reta e depois um quadrado, usando curvas de tração diferencial.",
            },
            simulator: {
              title: "Desafio de chassi no simulador",
              materials: [
                "Simulador no navegador",
                "Folha de atividade Registro de Testes do Chassi",
              ],
              instructions: [
                "Abra a missão de montagem de chassi e configure uma base de duas rodas com tração diferencial.",
                "Escolha o tamanho da roda e um centro de massa baixo para a base ficar estável, e depois atravesse a grade em linha reta.",
                "Faça-a virar colocando velocidades diferentes na roda esquerda e na direita, e treine uma curva à esquerda, uma à direita e um giro no próprio eixo.",
                "Faça uma curva rápida e suba o plano inclinado do simulador para conferir que ela não tomba.",
              ],
              safetyNotes: [
                "Não há riscos físicos; salve o seu trabalho com frequência.",
              ],
              expectedResult: "Uma base no simulador que anda reto, é dirigida por tração diferencial e fica em pé nas curvas e no plano inclinado.",
              successCriteria: [
                "Rola reto ao longo da grade",
                "Vira para a esquerda e para a direita mudando a velocidade das rodas",
                "Gira no próprio eixo com as rodas indo em sentidos opostos",
                "Fica em pé numa curva rápida",
              ],
              troubleshooting: [
                {
                  problem: "A base só anda reto, nunca vira",
                  fix: "Coloque valores diferentes na velocidade das duas rodas; velocidades iguais sempre vão reto.",
                },
                {
                  problem: "A base tomba nas curvas",
                  fix: "Abaixe o centro de massa ou afaste mais as rodas, e depois faça a curva com mais suavidade.",
                },
              ],
              extension: "Percorra um quadrado completo com a base usando só curvas de tração diferencial.",
            },
            unplugged: {
              title: "Base com rodas feita de materiais de casa",
              materials: [
                "Papelão para o chassi",
                "Tampinhas de garrafa para as rodas e espetinhos ou canudos para os eixos",
                "Fita adesiva, tesoura e um ou dois elásticos",
                "Elásticos, moedas ou massinha para aderência e peso (opcional)",
                "Uma rampa ou livros para o teste de tombamento",
                "Folha de atividade Registro de Testes do Chassi",
              ],
              instructions: [
                "Corte uma base de papelão baixa e larga e faça dois furos paralelos para os eixos, de modo que as rodas fiquem bem alinhadas.",
                "Encaixe as tampinhas como rodas nos eixos de espetinho e acrescente uma sapata pequena na frente (uma abinha de papelão dobrada) para ela se apoiar em três pontos.",
                "Dê um empurrão e ajuste os eixos até ela rolar reto; depois empurre um lado mais que o outro para vê-la virar: essa é a direção diferencial feita na mão.",
                "Acrescente peso embaixo na base e incline-a na rampa para conferir que ela fica em pé por mais tempo do que uma versão alta.",
              ],
              safetyNotes: [
                "Use tesoura sem ponta com um adulto e mantenha as pontas dos espetinhos protegidas.",
                "Teste numa mesa, bem longe da beirada.",
              ],
              expectedResult: "Uma base de papelão que rola bem reto, que pode ser dirigida girando um lado mais que o outro e que fica em pé num plano levemente inclinado.",
              successCriteria: [
                "Rola reto por pelo menos meio metro",
                "Pode ser dirigida movendo um lado mais que o outro",
                "Fica em pé na rampa por mais tempo do que uma versão alta",
                "As rodas ficam paralelas e giram livres",
              ],
              troubleshooting: [
                {
                  problem: "Ela rola torta",
                  fix: "Os eixos não estão paralelos ou as rodas têm tamanhos diferentes; endireite os furos e iguale as rodas.",
                },
                {
                  problem: "As rodas patinam na mesa",
                  fix: "Enrole um elástico em cada roda para dar aderência.",
                },
              ],
              extension: "Faça uma corrida entre duas das suas bases e use o registro de testes para explicar qual rolou mais reto e por quê.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes do teste de tombamento: qual base você acha que fica em pé por mais tempo na rampa, a alta e estreita ou a baixa e larga? Por quê?",
          howToCheck: "Incline cada base na rampa (ou use o plano inclinado do simulador) e veja qual tomba primeiro; compare com o seu palpite.",
        },
        {
          prompt: "Antes de trocar as engrenagens: você acha que uma relação mais baixa vai deixar a base mais rápida ou mais forte para subir? Preveja o que ela vai perder em troca.",
          howToCheck: "Mude as engrenagens para as rodas girarem mais devagar, suba a rampa e confira se ela sobe melhor mas anda mais devagar.",
        },
      ],
      testRecords: [
        {
          title: "Teste de velocidade e retidão da base com rodas",
          instructions: "Marque uma linha de largada e uma de chegada com um metro de distância. Faça a base andar da largada e registre quantos segundos ela leva e o quanto ela termina fora da linha. Repita três vezes.",
          columns: [
            null,
            "Tempo até a chegada (segundos)",
            "Desvio da linha reta (cm)",
            "Observações",
          ],
          measure: "O tempo para percorrer a distância e o quanto a base se desviou da linha reta",
        },
        {
          title: "Teste de estabilidade contra tombamento",
          instructions: "Coloque a base na rampa e levante a rampa devagar até a base tombar. Registre o ângulo de tombamento (ou o número de livros) para uma montagem baixa e larga e para uma alta e estreita.",
          columns: [
            "Montagem",
            "Tomba com quantos livros / em que ângulo",
            "Ficou em pé? (S/N)",
          ],
          measure: "O ângulo ou a altura da rampa em que cada montagem tomba",
        },
      ],
      knowledgeCheck: {
        instructions: "Responda a estas perguntas para conferir se você entendeu como um robô anda e como ele fica firme.",
        questions: [
          {
            prompt: "Diagnostique o problema de projeto.",
            scenario: "O robô de um estudante é alto e estreito, com a bateria montada em cima. Ele anda reto sem problema, mas tomba toda vez que faz uma curva rápida.",
            options: [
              {
                text: "O centro de massa está alto demais",
                feedback: "Isso mesmo: um robô alto e pesado em cima tem o centro de massa alto e tomba fácil, principalmente nas curvas.",
              },
              {
                text: "As rodas têm aderência demais",
                feedback: "Aderência é coisa boa; o tombamento vem de ser alto e pesado em cima.",
              },
              {
                text: "O motor tem pouco torque",
                feedback: "Ele anda bem, então o torque não é a causa do tombamento.",
              },
              {
                text: "Os eixos são compridos demais",
                feedback: "Eixos mais compridos (rodas mais afastadas) deixariam o robô MAIS estável, não menos.",
              },
            ],
            explanation: "Alto e pesado em cima quer dizer centro de massa alto, e isso tomba nas curvas rápidas. Abaixe o peso ou afaste mais as rodas.",
          },
          {
            prompt: "Como um motor girando faz um robô rolar pelo chão?",
            options: [
              {
                text: "O motor gira um eixo, e o eixo gira as rodas",
                feedback: "Isso mesmo: o motor gira, o eixo roda, as rodas rolam; essa é a corrente que move o robô.",
              },
              {
                text: "O motor sopra ar para trás para empurrar o robô",
                feedback: "Robôs com rodas andam porque as rodas giram, não porque sopram ar.",
              },
              {
                text: "O motor deixa o robô mais leve",
                feedback: "Um motor não muda o peso do robô; o que ele fornece é movimento de giro.",
              },
              {
                text: "As rodas giram sozinhas, sem o motor",
                feedback: "As rodas só giram porque o motor gira o eixo em que elas estão.",
              },
            ],
            explanation: "O motor gira um eixo, o eixo gira as rodas presas nele, e as rodas girando fazem o robô rolar.",
          },
          {
            prompt: "Você troca as engrenagens de um robô para as rodas girarem mais devagar. O que você ganha e o que você abre mão?",
            options: [
              {
                text: "Você ganha velocidade e abre mão de torque",
                feedback: "É o contrário: rodas mais lentas têm mais torque, não mais velocidade.",
              },
              {
                text: "Você ganha torque (força de giro) e abre mão de velocidade",
                feedback: "Correto: as engrenagens trocam velocidade por torque; com rodas mais lentas ele empurra e sobe com mais força.",
              },
              {
                text: "Você ganha velocidade e torque ao mesmo tempo",
                feedback: "Não dá para ter velocidade máxima e torque máximo ao mesmo tempo; as engrenagens trocam um pelo outro.",
              },
              {
                text: "Você perde velocidade e torque ao mesmo tempo",
                feedback: "Reduzir a relação de engrenagens não faz perder os dois: troca velocidade por mais torque.",
              },
            ],
            explanation: "As engrenagens trocam velocidade por torque. Fazer as rodas girarem mais devagar dá mais força de giro para subir ou empurrar.",
          },
          {
            prompt: "As rodas de um robô giram rápido, mas ele quase não sai do lugar num piso liso e escorregadio. Qual é o problema?",
            options: [
              {
                text: "Torque demais",
                feedback: "O problema é o agarre, não a força de giro.",
              },
              {
                text: "O motor está desligado",
                feedback: "As rodas estão girando, então está claro que o motor está funcionando.",
              },
              {
                text: "Pouca aderência: as rodas estão patinando em vez de agarrar",
                feedback: "Isso mesmo: pouco atrito significa pouca aderência, então as rodas patinam em vez de empurrar o robô para a frente.",
              },
              {
                text: "O centro de massa está baixo demais",
                feedback: "Um centro de massa baixo ajuda na estabilidade; ele não faz as rodas patinarem.",
              },
            ],
            explanation: "Pisos lisos dão pouco atrito, então as rodas têm pouca aderência e patinam no lugar em vez de fazer o robô andar.",
          },
          {
            prompt: "Qual base de robô é a mais difícil de tombar?",
            options: [
              {
                text: "Uma base alta e estreita com as peças pesadas lá em cima",
                feedback: "Essa é a mais fácil de tombar: um centro de massa alto tomba rapidinho.",
              },
              {
                text: "Uma base baixa e larga com as peças pesadas perto do chão",
                feedback: "Correto: uma base baixa e larga, com centro de massa baixo, é a mais estável.",
              },
              {
                text: "Uma base com as rodas maiores, não importa o formato",
                feedback: "O tamanho da roda muda a velocidade e a aderência, e não principalmente o tombamento; para a estabilidade o que conta é o formato e onde fica o peso.",
              },
              {
                text: "A base mais colorida",
                feedback: "A cor não tem nada a ver com estabilidade.",
              },
            ],
            explanation: "Uma base baixa e larga mantém o centro de massa baixo e dentro das rodas, o que a torna difícil de tombar.",
          },
          {
            prompt: "Na tração diferencial, como um robô de duas rodas vira à esquerda?",
            options: [
              {
                text: "Ele usa um volante, como um carro",
                feedback: "Robôs de tração diferencial não têm volante; eles são dirigidos pela velocidade das rodas.",
              },
              {
                text: "A roda esquerda gira mais devagar que a direita",
                feedback: "Isso mesmo: o robô faz a curva para o lado da roda mais lenta, então uma roda esquerda mais lenta faz ele virar à esquerda.",
              },
              {
                text: "As duas rodas aceleram juntas",
                feedback: "Com as rodas na mesma velocidade o robô vai reto, não faz curva.",
              },
              {
                text: "O motor se inclina para o lado",
                feedback: "Os motores não se inclinam; quem dirige é a diferença de velocidade entre as rodas.",
              },
            ],
            explanation: "Na tração diferencial o robô vira para o lado da roda mais lenta, então desacelerar a roda esquerda faz ele virar à esquerda.",
          },
        ],
      },
      reflection: [
        {
          prompt: "Que mudança mecânica fez a maior diferença no movimento do seu robô, e por quê?",
        },
        {
          prompt: "Que mudança deixou a sua base mais estável, e por que isso ajudou?",
        },
        {
          prompt: "Descreva como você faria o seu robô virar à esquerda usando apenas as duas rodas dele.",
        },
      ],
      journalPrompts: [
        {
          prompt: "Desenhe a sua base com rodas vista de lado e rotule o motor, o eixo, as rodas e onde fica o peso.",
        },
        {
          prompt: "Registre os resultados do seu teste de velocidade e retidão e qual montagem rolou melhor.",
        },
        {
          prompt: "Escreva uma frase sobre o que você mudaria para deixar a sua base mais estável.",
        },
      ],
      simulatorMissions: [
        {
          title: "Ande reto e firme",
          objective: "Configure uma base de tração diferencial que atravesse a grade em linha reta sem desviar nem tombar.",
          successCriteria: [
            "A base chega ao outro lado da grade",
            "Ela se mantém numa linha reta",
            "Ela fica em pé o caminho inteiro",
          ],
        },
        {
          title: "Dirija com tração diferencial",
          objective: "Use velocidades diferentes na roda esquerda e na direita para virar a base à esquerda, à direita e girá-la no próprio eixo.",
          successCriteria: [
            "A base vira à esquerda e à direita mudando a velocidade das rodas",
            "A base gira no próprio eixo com as rodas indo em sentidos opostos",
            "A base não tomba durante as curvas",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Como os robôs andam",
          focus: "Motor, eixo, rodas, engrenagens trocando velocidade por torque, atrito e aderência.",
        },
        {
          title: "Ficar em pé",
          focus: "Equilíbrio, estabilidade, centro de massa, projeto do chassi e tração diferencial.",
        },
        {
          title: "Investigação virtual do chassi",
          focus: "Mudar uma coisa de cada vez e registrar o efeito na velocidade, na aderência e na estabilidade.",
        },
        {
          title: "Preveja a base mais firme",
          focus: "Adivinhar qual base fica em pé por mais tempo, antes do teste de tombamento.",
        },
        {
          title: "Desafio da base com rodas",
          focus: "Montar uma base que rola reto, é dirigível e fica em pé.",
        },
        {
          title: "Testes de velocidade e tombamento",
          focus: "Registrar a velocidade, a retidão e o ângulo de tombamento de cada montagem.",
        },
        {
          title: "Verificação de aprendizagem",
          focus: "Cinco perguntas sobre movimento, torque, aderência, estabilidade e direção.",
        },
        {
          title: "Reflexão",
          focus: "Escrever sobre engrenagens, estabilidade e direção por tração diferencial.",
        },
      ],
      safetyNotes: [
        {
          text: "Mantenha dedos, cabelo e roupas soltas longe das rodas e engrenagens em movimento, e desligue o motor antes de trocar peças.",
        },
        {
          text: "Use tesoura sem ponta com um adulto para cortar o papelão e os furos dos eixos, e mantenha as pontas dos espetinhos protegidas.",
        },
        {
          text: "Teste as bases com rodas numa área livre, longe das beiradas de mesa, escadas e desníveis.",
        },
        {
          text: "Salve o seu trabalho com frequência para que atualizar o navegador não apague o seu chassi e o seu registro de testes.",
        },
      ],
      printableResources: [
        {
          title: "Registro de Testes do Chassi",
          description: "Uma folha para registrar as mudanças de roda, engrenagem e base e o efeito delas na velocidade, na aderência e na estabilidade.",
        },
        {
          title: "Registro dos testes de velocidade e tombamento",
          description: "Tabelas para o teste de velocidade e retidão de um metro e para o teste de tombamento na rampa.",
        },
        {
          title: "Página de desenho da base com rodas",
          description: "Espaço para desenhar a base vista de lado e rotular o motor, o eixo, as rodas e o peso.",
        },
        {
          title: "Guia do professor da semana 2",
          description: "Preparação, condução da aula, ideias equivocadas e perguntas para a aula de construir um robô que anda.",
        },
      ],
      completion: {
        summary: "Termine a semana 2 investigando escolhas de chassi, montando uma base com rodas que é dirigível e fica em pé, registrando os testes de velocidade e tombamento, e passando na verificação de aprendizagem.",
        requirements: [
          {
            label: "Completar a Investigação virtual do chassi e registrar três montagens",
          },
          {
            label: "Montar uma base com rodas que rola reto, é dirigível e fica em pé",
          },
          {
            label: "Registrar os testes de velocidade e retidão e de tombamento",
          },
          {
            label: "Acertar pelo menos 4 de 5 na verificação de aprendizagem",
          },
          {
            label: "Escrever a sua reflexão",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Deixe à mostra rodas, engrenagens e peças de chassi (kit), ou papelão, tampinhas, espetinhos e fita (sem eletrônicos), separados para os estudantes trocarem rápido.",
          "Imprima o Registro de Testes do Chassi e o registro dos testes de velocidade e tombamento, um por estudante ou por dupla.",
          "Marque no chão uma pista de teste de um metro e monte uma rampa ou uma pilha de livros para o teste de tombamento.",
          "Se for usar o simulador, abra a missão do laboratório de chassi em cada aparelho.",
        ],
        prep: [
          "Monte você mesmo uma base com rodas que funcione, para poder mostrar um exemplo estável e identificar os problemas de balanço mais comuns.",
          "Faça o teste de tombamento com uma base alta e com uma baixa e larga, para conseguir antecipar o que os estudantes vão ver.",
          "Tenha elásticos de reserva à mão para resolver rodas com pouca aderência.",
        ],
        facilitation: [
          "Comece pela corrente motor-eixo-roda e pelas engrenagens que trocam velocidade por torque, antes de qualquer montagem.",
          "Conduza a Investigação virtual do chassi, insistindo para que os estudantes mudem uma coisa de cada vez e registrem cada resultado.",
          "Peça que os estudantes prevejam qual base será a mais firme e depois faça o teste de tombamento para conferir a previsão.",
          "Passe para a montagem da base com rodas, depois para os testes de velocidade e tombamento, e encerre com a verificação de aprendizagem e a reflexão.",
        ],
        commonMisconceptions: [
          "\"Rodas maiores sempre fazem um robô melhor\": rodas maiores dão velocidade, mas exigem mais torque para sair do lugar e podem levantar a base.",
          "\"Reduzir a relação de engrenagens deixa o robô mais lento e mais fraco\": ele fica mais lento, mas mais forte; troca velocidade por torque.",
          "\"Se a roda gira, o robô está andando\": num piso escorregadio ela pode girar no lugar, sem aderência.",
          "\"Robô se dirige com volante\": robôs de tração diferencial são dirigidos girando as rodas em velocidades diferentes.",
          "\"Robôs mais altos são mais firmes\": uma base baixa e larga, com centro de massa baixo, é muito mais difícil de tombar.",
        ],
        questionsToAsk: [
          "Por onde o giro do motor precisa passar para chegar ao chão?",
          "Se você quer que este robô suba, precisa de mais velocidade ou de mais torque?",
          "Por que esta roda está patinando em vez de agarrar?",
          "Para que lado o robô vai virar se a roda esquerda desacelerar?",
          "Onde está o peso, e como você poderia deixar esta base mais difícil de tombar?",
        ],
        easierVersion: "Dê aos estudantes uma base já montada e peça só que troquem as rodas e façam o teste de tombamento na rampa, em vez de montar o chassi do zero.",
        harderVersion: "Desafie os estudantes a ajustar as engrenagens da base para a melhor subida na rampa e a percorrer um quadrado preciso usando só curvas de tração diferencial.",
      },
      nextWeek: {
        teaser: "Semana que vem a sua base com rodas ganha um cérebro: você vai escrever o seu primeiro programa para o robô percorrer sozinho um trajeto planejado.",
        prepare: [
          "Deixe a sua base com rodas montada e funcionando para conseguir programá-la na semana que vem.",
          "Carregue o seu kit ou salve nos favoritos o simulador e o editor de blocos dele.",
          "Pense em como você diria a alguém os passos exatos para caminhar da porta até uma cadeira sem ficar olhando essa pessoa.",
        ],
      },
    },
    {
      title: "Dar instruções exatas",
      subtitle: "Transforme um trajeto num plano claro, passo a passo, e depois programe o robô para segui-lo à risca.",
      summary: "Os estudantes aprendem que os computadores seguem as instruções ao pé da letra e com exatidão: o robô faz o que você realmente mandou, não o que você quis dizer. Eles escrevem um algoritmo (um plano claro, passo a passo) como pseudocódigo em linguagem comum, e depois o transformam num programa feito de uma sequência direta de comandos de movimento, com tempo, distância e curvas. Preveem onde o robô vai parar antes de rodar o programa, e depois rodam e comparam. Esta é uma semana só de sequências: ainda não há laços de repetição, condições nem sensores, apenas comandos exatos e em ordem para levar o robô por um trajeto de entrega ou um labirinto até o objetivo.",
      mainMission: "Planejar uma sequência exata de comandos de avanço e curva, prever onde ela termina, e depois programar o robô para seguir um trajeto até o objetivo.",
      estimatedTime: "60 a 75 minutos",
      learningGoals: [
        {
          text: "Explicar que um programa é uma sequência de comandos que o computador segue em ordem, ao pé da letra e com exatidão",
        },
        {
          text: "Escrever um algoritmo como pseudocódigo (um plano claro, passo a passo, em linguagem comum) antes de programar",
        },
        {
          text: "Controlar o trajeto de um robô com comandos de distância, tempo e curva na ordem certa",
        },
        {
          text: "Prever onde o robô vai parar antes de rodar o programa, e depois conferir a previsão",
        },
        {
          text: "Programar o robô para seguir um trajeto de entrega ou um labirinto até o objetivo usando só uma sequência de comandos",
        },
      ],
      vocabulary: [
        {
          term: "Programa",
          definition: "Uma lista de instruções que um computador segue para fazer um trabalho. Nesta semana, um programa é uma sequência de comandos de movimento.",
        },
        {
          term: "Comando",
          definition: "Uma única instrução que o robô consegue cumprir, como \"ande para a frente\" ou \"vire à direita\".",
        },
        {
          term: "Sequência",
          definition: "Comandos executados um depois do outro, em ordem, de cima para baixo. A ordem importa.",
        },
        {
          term: "Algoritmo",
          definition: "Um plano claro, passo a passo, para realizar uma tarefa, sem passos faltando nem passos vagos.",
        },
        {
          term: "Pseudocódigo",
          definition: "Escrever os passos de um plano em linguagem comum antes de transformá-los em código de verdade.",
        },
        {
          term: "Evento",
          definition: "O momento que dispara um programa, como apertar \"Iniciar\" ou um bloco de \"ao tocar\".",
        },
        {
          term: "Tempo",
          definition: "Quanto dura um comando, medido em segundos: um jeito de controlar até onde o robô vai.",
        },
        {
          term: "Distância",
          definition: "O quanto o robô anda num comando, muitas vezes indicado em centímetros ou em casas da grade.",
        },
        {
          term: "Curva",
          definition: "Um comando que gira o robô no lugar, normalmente por um número fixo de graus, como 90.",
        },
        {
          term: "Velocidade",
          definition: "O quão rápido os motores funcionam. Mais velocidade cobre mais distância no mesmo tempo.",
        },
        {
          term: "Previsão",
          definition: "O seu melhor palpite sobre onde o robô vai parar, feito antes de rodar o programa.",
        },
      ],
      prerequisites: [
        {
          reason: "Você precisa da base com rodas que montou na semana 2, porque os programas da semana 3 fazem essa base andar.",
        },
        {
          reason: "Você vai usar a ideia da semana 1 de que um programa é o conjunto de instruções que um controlador segue.",
        },
      ],
      concepts: [
        {
          title: "Computadores seguem instruções ao pé da letra",
          body: [
            "Um robô faz exatamente o que você manda, e não o que você quis dizer. Se você disser \"ande para a frente\" mas esquecer de dizer o quanto, o robô não consegue adivinhar; ele faz a coisa errada ou não faz nada. Computadores são rápidos e incansáveis, mas não têm bom senso.",
            "Essa é a ideia mais importante da semana. Quando um robô se comporta mal, quase sempre ele está seguindo as suas instruções direitinho: as suas instruções é que não eram o que você queria.",
          ],
          examples: [
            "\"Faça um sanduíche\" dá errado se você não disser \"abra o pacote de pão primeiro\"",
            "Um robô mandado \"virar\" sem dizer o quanto gira demais ou de menos",
            "\"Vá até a porta\" não diz nada a um robô: ele precisa de \"ande 3 casas, vire à esquerda\"",
          ],
        },
        {
          title: "Um programa é uma sequência de comandos",
          body: [
            "Um programa é uma lista de comandos que o robô executa um depois do outro, de cima para baixo. Cada comando é uma instrução pequena, como \"ande para a frente\" ou \"vire à direita\". Executá-los em ordem se chama sequência.",
            "A ordem importa. \"Vire à direita e depois ande para a frente\" manda o robô para um lugar completamente diferente de \"ande para a frente e depois vire à direita\", mesmo sendo os mesmos comandos.",
          ],
          examples: [
            "ande 2 casas -> vire à direita -> ande 1 casa",
            "Trocar dois comandos de lugar muda onde o robô termina",
          ],
        },
        {
          title: "Eventos disparam um programa",
          body: [
            "Um programa não roda até que alguma coisa o dispare. Esse momento de partida se chama evento: apertar um botão \"Iniciar\", tocar num bloco de \"ao tocar\" ou clicar em Rodar no simulador.",
            "Nesta semana, todo programa tem um evento no topo que dispara a sequência, e depois os comandos rodam direto, em ordem.",
          ],
          examples: [
            "\"Ao apertar Iniciar\" no topo do programa",
            "Clicar em Rodar no simulador",
            "Tocar no botão de partida no aplicativo do kit",
          ],
        },
        {
          title: "Algoritmos e pseudocódigo: planeje antes de programar",
          body: [
            "Um algoritmo é um plano claro, passo a passo, para uma tarefa, com cada passo explicado e nada deixado vago. Antes de escrever código de verdade, quem programa escreve primeiro o plano em linguagem comum: esse plano em linguagem comum se chama pseudocódigo.",
            "O pseudocódigo deixa você pensar no trajeto sem ainda brigar com os blocos. Você pode escrever \"ande 3, vire à esquerda, ande 2, pare\", conferir se faz sentido, e só então montar com comandos.",
          ],
          examples: [
            "Pseudocódigo: \"ande 3 casas, vire 90 à esquerda, ande 2 casas, pare\"",
            "Um algoritmo não tem passos faltando nem buracos do tipo \"você entendeu o que eu quis dizer\"",
          ],
        },
        {
          title: "Controlar a distância com tempo, velocidade e curvas",
          body: [
            "Nesta semana você dirige o robô com três ferramentas: o quanto ele anda (distância), quanto tempo esse movimento dura (tempo) e o quanto ele gira (curva). Em muitos kits, a distância vem da combinação de tempo e velocidade: mais velocidade por mais tempo cobre mais terreno.",
            "As curvas giram o robô no lugar, normalmente em graus. Uma curva de 90 graus é um quarto de volta (um ângulo reto) e deixa o robô alinhado com o próximo trecho do trajeto. Acertar o tamanho da curva é o que mantém o robô na rota.",
          ],
          examples: [
            "ande na velocidade 50 por 2 segundos",
            "vire 90 graus à direita para ficar de frente para o próximo corredor",
            "meia volta = 180 graus para voltar pelo mesmo caminho",
          ],
        },
        {
          title: "Preveja antes de rodar",
          body: [
            "Antes de rodar um programa, faça uma previsão: percorra a sequência com o dedo e marque onde você acha que o robô vai parar e para que lado ele vai estar virado. Se comprometer com um palpite antes deixa óbvio quando um passo está errado.",
            "Depois rode e compare. Se o robô terminar em outro lugar, a diferença mostra exatamente qual comando corrigir: talvez uma curva fosse de 90 quando precisava ser 180, ou um avanço tenha ficado uma casa curto.",
          ],
          examples: [
            "Previsão: \"termina na estrela, virado para cima\"",
            "Se ele parar uma casa antes, um comando de distância está pequeno demais",
          ],
        },
      ],
      materials: [
        {
          name: "Mapa de trajeto ou labirinto com largada, objetivo e casas de grade (para imprimir)",
        },
        {
          name: "Folha de planejamento de pseudocódigo (para imprimir)",
        },
        {
          name: "Folha de registro para prever e testar (para imprimir)",
        },
        {
          name: "Lápis e papel",
        },
        {
          name: "A base com rodas que você montou na semana 2, com o aplicativo ou programa dela",
        },
        {
          name: "Fita crepe e um objeto pequeno para entregar (uma tampinha de garrafa ou um bloquinho)",
          note: "A fita marca o trajeto e o objetivo no chão.",
        },
        {
          name: "Computador ou tablet com o simulador no navegador",
        },
        {
          name: "Cartões de setas e comandos (para a frente, para trás, virar à esquerda, virar à direita, esperar, parar)",
        },
        {
          name: "Uma grade no chão feita com fita, ou uma grade impressa para andar com uma peça",
        },
      ],
      activities: [
        {
          title: "Desafio de programação do trajeto de entrega",
          goal: "Programar o robô para seguir um trajeto ou labirinto da largada até o objetivo usando só uma sequência de comandos exatos de avanço e curva.",
          shared: [
            "Olhe o mapa e ache a largada, o objetivo e as paredes ou curvas ao longo do trajeto. Primeiro percorra a rota com o dedo.",
            "Escreva o plano como pseudocódigo em linguagem comum (avanços, curvas e distâncias em ordem) antes de montar qualquer coisa. Mantenha uma sequência direta: nesta semana não há laços, nem verificações, nem sensores.",
            "Transforme o pseudocódigo em comandos, rode, e se o robô errar o objetivo, conserte exatamente o comando que estava errado.",
          ],
          variants: {
            kit: {
              title: "Percorra o trajeto de entrega com o robô do seu kit",
              instructions: [
                "Marque com fita um trajeto no chão, com uma casa de largada, uma de objetivo e uma ou duas curvas. Coloque o objeto pequeno na largada, como sendo a entrega.",
                "Percorra a rota e escreva o pseudocódigo: por exemplo, \"ande 40 cm, vire 90 à direita, ande 20 cm, pare\".",
                "Meça ou cronometre um avanço para descobrir o quanto o robô anda, e depois preencha as distâncias ou os tempos reais.",
                "Monte a sequência de comandos no aplicativo, aperte Iniciar (o evento) e veja o robô seguir o trajeto.",
                "Se ele errar o objetivo, mude só o comando que estava fora (o tamanho de uma curva ou a distância de um avanço) e rode de novo.",
              ],
              safetyNotes: [
                "Mantenha dedos, cabelo e roupas soltas longe das rodas enquanto o robô anda.",
                "Deixe a área do trajeto livre para o robô não esbarrar em pés nem em pés de mesa.",
              ],
              expectedResult: "O robô segue a sequência da largada até o objetivo e para na casa do objetivo com a entrega.",
              successCriteria: [
                "O pseudocódigo foi escrito antes de programar",
                "O programa é uma sequência direta de comandos de avanço e curva",
                "O robô chega ao objetivo e para lá",
              ],
              troubleshooting: [
                {
                  problem: "O robô passa do objetivo ou para antes dele",
                  fix: "Ajuste a distância ou o tempo daquele comando de avanço; uma mudança pequena em segundos já o move bastante.",
                },
                {
                  problem: "O robô gira demais ou de menos",
                  fix: "Confira os graus da curva (tente 90 para um quarto de volta) e confirme se é para a esquerda ou para a direita.",
                },
              ],
              extension: "Acrescente uma segunda entrega: estenda a sequência para o robô seguir até uma segunda casa de objetivo depois da primeira.",
            },
            simulator: {
              title: "Programe o labirinto com blocos numa grade",
              instructions: [
                "Abra a missão do labirinto no simulador e ache a casa de largada e a casa do objetivo.",
                "Percorra a rota pelas casas livres e escreva o pseudocódigo em passos de grade, tipo \"ande 3, vire à esquerda, ande 2, pare\".",
                "Arraste blocos de movimento para formar uma sequência embaixo do bloco de evento \"ao iniciar\": só blocos de andar e de virar.",
                "Rode o programa e veja o robô percorrer a grade um comando de cada vez.",
                "Se ele bater numa parede ou errar o objetivo, conserte exatamente o bloco errado e rode de novo.",
              ],
              safetyNotes: [
                "Não há riscos físicos; dê uma pausa curta na tela se os olhos cansarem.",
              ],
              expectedResult: "O robô do simulador segue a sequência de blocos pelo labirinto e cai na casa do objetivo.",
              successCriteria: [
                "O pseudocódigo foi escrito antes de montar os blocos",
                "Só foram usados blocos de sequência (sem laços, condicionais ou sensores)",
                "O robô chega à casa do objetivo",
              ],
              troubleshooting: [
                {
                  problem: "O robô entra numa parede",
                  fix: "Conte de novo as casas livres; provavelmente sobra uma casa num bloco de avanço.",
                },
                {
                  problem: "O robô fica virado para o lado errado depois de uma curva",
                  fix: "Troque virar à esquerda por virar à direita, ou confira quantas casas vêm antes da curva.",
                },
              ],
              extension: "Refaça o labirinto com o menor número possível de blocos, juntando avanços em passos mais longos.",
            },
            unplugged: {
              title: "Escreva um programa de cartões que um colega siga ao pé da letra",
              instructions: [
                "Monte uma grade no chão ou use a grade impressa, com uma largada e um objetivo. Uma pessoa é o \"robô\" e a outra é quem programa.",
                "Quem programa percorre a rota e escreve o pseudocódigo, e depois organiza os cartões de setas e comandos numa sequência.",
                "O \"robô\" segue os cartões exatamente e ao pé da letra (uma casa por cartão de avanço, um quarto de volta por cartão de curva), fazendo só o que cada cartão diz, nada mais.",
                "Diga \"Inicia\" (o evento) e rode os cartões de cima para baixo, sem ajudar o robô.",
                "Se o robô errar o objetivo, ache o único cartão errado, troque-o e rode de novo.",
              ],
              safetyNotes: [
                "Ande devagar na grade do chão e mantenha o caminho livre de cadeiras e mochilas.",
              ],
              expectedResult: "O \"robô\" caminha a sequência de cartões e cai na casa do objetivo, fazendo só o que os cartões dizem.",
              successCriteria: [
                "O pseudocódigo foi escrito antes de dispor os cartões",
                "O programa de cartões é uma sequência direta",
                "Seguir os cartões ao pé da letra chega ao objetivo",
              ],
              troubleshooting: [
                {
                  problem: "O robô \"cola\" e vai consertando os passos pelo caminho",
                  fix: "Lembre a turma de seguir os cartões ao pé da letra: a graça é achar o erro nas instruções, não escondê-lo.",
                },
                {
                  problem: "O robô termina virado para o lado errado",
                  fix: "Um cartão de curva está no lado errado ou está faltando; confira esquerda e direita.",
                },
              ],
              extension: "Troquem programas de cartões com outra dupla e rodem o do outro grupo sem ver o mapa antes.",
            },
          },
        },
        {
          title: "Preveja e depois teste o final",
          goal: "Prever onde o robô vai parar e para que lado vai estar virado antes de rodar uma sequência dada, e depois rodar e comparar.",
          shared: [
            "Pegue uma sequência curta de comandos e percorra-a à mão no mapa. Marque no papel onde você acha que o robô termina e para que lado ele fica virado.",
            "Comprometa-se com a sua previsão antes de rodar qualquer coisa: escreva primeiro.",
            "Rode o programa, compare o final real com a sua previsão e explique qualquer diferença apontando o comando que a causou.",
          ],
          variants: {
            kit: {
              title: "Preveja onde o robô do seu kit vai parar",
              instructions: [
                "Pegue uma sequência de 4 a 6 comandos (a sua ou uma que lhe deram) e percorra-a no trajeto marcado com fita.",
                "Na folha de registro, marque a casa em que você prevê que o robô vai parar e para que lado ele vai ficar virado.",
                "Rode a sequência e marque onde o robô parou de verdade.",
                "Compare: se houver diferença, aponte o comando (uma curva ou uma distância) que explica essa diferença.",
              ],
              safetyNotes: [
                "Fique longe das rodas enquanto o robô faz o teste de previsão.",
              ],
              expectedResult: "Uma previsão escrita ao lado do ponto real de parada, com um motivo para qualquer diferença.",
              successCriteria: [
                "A previsão foi escrita antes de rodar",
                "O final real foi registrado",
                "Qualquer diferença é explicada apontando um comando",
              ],
              troubleshooting: [
                {
                  problem: "A previsão e o resultado ficam bem longe um do outro toda vez",
                  fix: "Meça de novo o quanto um comando de avanço realmente move o robô; a sua estimativa de distância está fora.",
                },
              ],
              extension: "Preveja o final de uma sequência que tenha três curvas.",
            },
            simulator: {
              title: "Preveja a casa final do robô",
              instructions: [
                "Olhe uma sequência de blocos dada no simulador, sem rodá-la.",
                "Na folha de registro, escreva em que casa da grade você prevê que o robô vai cair e para que lado ele vai ficar virado.",
                "Rode o programa e leia a casa final de verdade.",
                "Compare e aponte o bloco responsável por qualquer diferença.",
              ],
              safetyNotes: [
                "Não há riscos físicos.",
              ],
              expectedResult: "Uma casa prevista escrita antes de rodar, ao lado da casa real, com um motivo para qualquer diferença.",
              successCriteria: [
                "A previsão foi escrita antes de rodar",
                "A casa final real foi registrada",
                "Qualquer diferença é ligada a um bloco específico",
              ],
              troubleshooting: [
                {
                  problem: "Você se perde no meio do caminho ao percorrer a sequência",
                  fix: "Percorra um comando de cada vez com o dedo e vá marcando cada casa conforme avança.",
                },
              ],
              extension: "Preveja quantas casas o robô percorre no total, e depois conte durante a execução.",
            },
            unplugged: {
              title: "Preveja onde o robô de cartões vai cair",
              instructions: [
                "Quem programa organiza uma sequência de cartões, mas ainda não a executa.",
                "Cada um escreve uma previsão: em que casa o \"robô\" vai terminar e para que lado ele vai ficar virado.",
                "Rodem os cartões, com o \"robô\" caminhando ao pé da letra.",
                "Comparem as previsões com o final real e conversem sobre qual cartão causou alguma surpresa.",
              ],
              safetyNotes: [
                "Mantenham a grade do chão livre para quem estiver caminhando poder se mover com segurança.",
              ],
              expectedResult: "Previsões escritas ao lado da casa final real, com um cartão apontado para qualquer diferença.",
              successCriteria: [
                "A previsão foi escrita antes de caminhar os cartões",
                "O final real foi registrado",
                "A diferença é ligada a um cartão específico",
              ],
              troubleshooting: [
                {
                  problem: "Cada um prevê uma coisa diferente",
                  fix: "Percorram os cartões juntos, um de cada vez: um percurso feito em conjunto mostra onde as previsões se separam.",
                },
              ],
              extension: "Esconda um cartão virado para baixo e preveja como o final muda quando ele é revelado e acrescentado.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de rodar o seu programa de entrega, em que casa você prevê que o robô vai parar, e para que lado ele vai estar virado?",
          howToCheck: "Rode a sequência, marque a casa e a direção reais em que ele parou, e compare com a sua previsão na folha de registro.",
        },
        {
          prompt: "Quantos comandos (passos) você acha que o seu programa precisa para chegar ao objetivo?",
          howToCheck: "Conte os comandos da sua sequência final já funcionando e compare com o seu palpite.",
        },
      ],
      testRecords: [
        {
          title: "Registro de final previsto x final real",
          instructions: "A cada tentativa, escreva a casa final que você prevê antes de rodar, depois rode a sequência e registre onde o robô terminou de verdade. Anote qual comando você mudou para a tentativa seguinte.",
          columns: [
            "Tentativa",
            "Casa final prevista",
            "Casa final real",
            "Comando mudado para a próxima tentativa",
          ],
          measure: "A posição final prevista contra a posição final real ao longo das tentativas",
        },
      ],
      knowledgeCheck: {
        instructions: "Responda a estas perguntas para conferir se você entendeu sequências, algoritmos, pseudocódigo e como controlar o trajeto do robô.",
        questions: [
          {
            prompt: "Coloque estes passos na ordem certa para programar o robô a fazer uma tarefa.",
            items: [
              {
                text: "Planejar os passos como um algoritmo",
              },
              {
                text: "Escrever os passos como comandos exatos",
              },
              {
                text: "Rodar o programa no robô",
              },
              {
                text: "Conferir se ele fez o que você esperava",
              },
            ],
            explanation: "Você planeja o algoritmo primeiro, transforma em comandos exatos, roda e depois confere o resultado: é o mesmo ciclo que quem programa usa.",
          },
          {
            prompt: "O robô começa virado para cima. Percorra este programa. Para que lado ele fica virado no final?",
            program: [
              "vire à direita",
              "vire à direita",
              "vire à esquerda",
            ],
            options: [
              {
                text: "Virado para cima",
                feedback: "Duas curvas à direita e depois uma à esquerda dão uma curva líquida à direita; não voltam ao ponto de partida.",
              },
              {
                text: "Virado para a direita",
                feedback: "Isso mesmo: duas à direita e depois uma à esquerda deixam uma curva no sentido horário, virado para a direita.",
              },
              {
                text: "Virado para baixo",
                feedback: "Para ficar virado para baixo seriam necessárias duas curvas líquidas à direita; este programa faz só uma.",
              },
              {
                text: "Virado para a esquerda",
                feedback: "Para ficar virado para a esquerda seria preciso uma curva líquida à esquerda; aqui as curvas à direita ganham por uma.",
              },
            ],
            explanation: "Direita, direita e esquerda equivale a uma curva líquida à direita. Começando virado para cima, uma curva à direita deixa o robô virado para a direita.",
          },
          {
            prompt: "O seu robô fez a coisa errada mesmo tendo rodado o seu programa inteiro. O que provavelmente aconteceu?",
            options: [
              {
                text: "O robô resolveu ser criativo",
                feedback: "Robôs não improvisam: eles seguem o programa ao pé da letra.",
              },
              {
                text: "Ele seguiu as suas instruções exatamente, mas as suas instruções não eram o que você queria",
                feedback: "Isso mesmo: computadores seguem os comandos ao pé da letra, então um resultado errado quase sempre quer dizer uma instrução errada.",
              },
              {
                text: "O robô ignorou o programa",
                feedback: "Ele rodou o programa; o erro estava no próprio programa.",
              },
              {
                text: "Programas nunca funcionam de primeira, de propósito",
                feedback: "Programas podem funcionar na primeira tentativa; quando não funcionam, é um problema de instrução que dá para consertar.",
              },
            ],
            explanation: "Computadores seguem as instruções ao pé da letra e com exatidão. Um resultado errado quase sempre quer dizer que as instruções não diziam o que você queria.",
          },
          {
            prompt: "O que é uma sequência?",
            options: [
              {
                text: "Comandos que rodam um depois do outro, em ordem",
                feedback: "Correto: uma sequência roda os comandos de cima para baixo, e a ordem importa.",
              },
              {
                text: "Um comando que se repete para sempre",
                feedback: "Isso é um laço de repetição, que vem mais adiante no curso.",
              },
              {
                text: "Um comando que decide com base num sensor",
                feedback: "Isso é uma condição; esta semana não tem sensores nem condições.",
              },
              {
                text: "Todos os comandos rodando exatamente ao mesmo tempo",
                feedback: "Numa sequência, os comandos rodam um de cada vez e em ordem, não todos de uma vez.",
              },
            ],
            explanation: "Uma sequência são comandos cumpridos um depois do outro, em ordem: trocar dois comandos de lugar pode mudar o resultado inteiro.",
          },
          {
            prompt: "O que é pseudocódigo?",
            options: [
              {
                text: "Um código secreto que só os computadores conseguem ler",
                feedback: "É o contrário: o pseudocódigo foi feito para as pessoas lerem com facilidade.",
              },
              {
                text: "O plano de um programa escrito em linguagem comum antes de você programá-lo",
                feedback: "Isso mesmo: o pseudocódigo escreve os passos em linguagem comum para você planejar antes de montar.",
              },
              {
                text: "Um programa quebrado, cheio de erros",
                feedback: "Pseudocódigo é uma ferramenta de planejamento, não um programa quebrado.",
              },
              {
                text: "O evento que dispara um programa",
                feedback: "Isso é um evento; o pseudocódigo é o plano de passos escrito.",
              },
            ],
            explanation: "Pseudocódigo é escrever primeiro os passos do seu algoritmo em linguagem comum, para poder planejar o trajeto antes de transformá-lo em comandos de verdade.",
          },
          {
            prompt: "O seu robô chega ao ponto certo, mas fica virado para o lado errado. Que comando você deve conferir?",
            options: [
              {
                text: "Um comando de distância de avanço",
                feedback: "A distância afeta onde ele para, não para que lado ele fica virado.",
              },
              {
                text: "O evento Iniciar",
                feedback: "O evento só dispara o programa; ele não define a direção.",
              },
              {
                text: "Um comando de curva: os graus ou a direção",
                feedback: "Correto: as curvas definem para que lado o robô fica virado, então confira o tamanho da curva ou se é esquerda ou direita.",
              },
              {
                text: "O comando de parar",
                feedback: "Parar só encerra a execução; não gira o robô.",
              },
            ],
            explanation: "As curvas controlam para que lado o robô fica virado. Terminar virado para o lado errado aponta para uma curva com os graus ou a direção errados.",
          },
          {
            prompt: "Num kit que funciona por tempo, como você faria o robô percorrer mais distância num único comando de avanço?",
            options: [
              {
                text: "Deixar os motores funcionando por mais tempo (ou numa velocidade maior)",
                feedback: "Isso mesmo: mais tempo, ou mais velocidade, cobre mais distância.",
              },
              {
                text: "Acrescentar um comando de curva",
                feedback: "Uma curva gira o robô; ela não acrescenta distância para a frente.",
              },
              {
                text: "Mudar o evento Iniciar",
                feedback: "O evento só dispara o programa; ele não define a distância.",
              },
              {
                text: "Escrever o comando com outra cor",
                feedback: "A cor não tem efeito nenhum sobre o jeito de o robô andar.",
              },
            ],
            explanation: "A distância vem do tempo e da velocidade: rodar por mais tempo, ou mais rápido, leva o robô mais longe num único comando de avanço.",
          },
        ],
      },
      reflection: [
        {
          prompt: "Que instrução causou o maior erro, e como você a deixou mais precisa?",
        },
        {
          prompt: "De que forma escrever o pseudocódigo primeiro ajudou você antes de montar os comandos de verdade?",
        },
        {
          prompt: "Quando a sua previsão não bateu com o que o robô fez, como você descobriu qual comando consertar?",
        },
      ],
      journalPrompts: [
        {
          prompt: "Escreva o pseudocódigo do seu trajeto de entrega em linguagem comum, um passo por linha.",
        },
        {
          prompt: "Desenhe o mapa do seu trajeto e marque a casa em que você prevê a parada, antes de rodar.",
        },
        {
          prompt: "De quantos comandos o seu programa final, já funcionando, precisou?",
        },
      ],
      savedPrograms: [
        {
          title: "Sequência do trajeto de entrega",
          description: "Uma sequência direta de comandos de avanço e curva que leva o robô da largada até a casa do objetivo. Só sequência: sem laços, condições nem sensores.",
        },
        {
          title: "Desafio de sequência no labirinto",
          description: "Planeje uma sequência ordenada de comandos de avanço e curva que leve o robô ao redor da parede até o objetivo e depois pare. Preveja o final antes de rodar. Só sequência: sem laços, condições nem sensores.",
        },
      ],
      simulatorMissions: [
        {
          title: "Entregue na casa do objetivo",
          objective: "Programe uma sequência de blocos de avanço e curva que leve o robô da casa de largada até a casa do objetivo.",
          successCriteria: [
            "O robô chega à casa do objetivo",
            "Só são usados blocos de sequência (sem laços, condicionais ou sensores)",
            "O robô para no objetivo",
          ],
        },
        {
          title: "Sequência através do labirinto",
          objective: "Leve o robô por um labirinto de paredes até o objetivo usando só uma sequência ordenada de comandos de movimento.",
          successCriteria: [
            "O robô desvia de todas as paredes",
            "O robô chega à casa do objetivo",
            "O programa é uma sequência direta",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Instruções exatas, sequências e eventos",
          focus: "Computadores seguem comandos ao pé da letra; um programa é uma sequência ordenada disparada por um evento.",
        },
        {
          title: "Algoritmos, pseudocódigo e controle do trajeto",
          focus: "Planejar um algoritmo como pseudocódigo; controlar a distância com tempo, velocidade e curvas.",
        },
        {
          title: "Desafios de programação de entrega e labirinto",
          focus: "Planejar o pseudocódigo e depois programar uma sequência para chegar ao objetivo: primeiro o trajeto de entrega, depois o labirinto em volta de uma parede.",
        },
        {
          title: "Preveja e depois teste o final",
          focus: "Prever a casa de parada e a direção antes de rodar, e depois comparar.",
        },
        {
          title: "Registrar previsto x real",
          focus: "Preencher o registro de previsto x real ao longo das tentativas.",
        },
        {
          title: "Verificação de aprendizagem",
          focus: "Cinco perguntas sobre sequências, algoritmos, pseudocódigo e curvas.",
        },
        {
          title: "Reflexão",
          focus: "Escrever sobre instruções literais, pseudocódigo e como achar o comando errado.",
        },
      ],
      safetyNotes: [
        {
          text: "Mantenha dedos, cabelo e roupas soltas longe das rodas enquanto o robô roda o programa dele.",
        },
        {
          text: "Deixe o trajeto no chão livre de pés, mochilas e pernas de cadeira antes de rodar, para o robô ter uma rota segura.",
        },
        {
          text: "Ande devagar na grade do chão quando estiver fazendo o papel do robô, para ninguém tropeçar.",
        },
        {
          text: "Dê uma pausa curta na tela se os seus olhos cansarem durante o uso do simulador.",
        },
      ],
      printableResources: [
        {
          title: "Mapa de trajeto e labirinto",
          description: "Um mapa quadriculado com largada, objetivo e paredes, para planejar uma rota de entrega.",
        },
        {
          title: "Folha de planejamento de pseudocódigo",
          description: "Espaço pautado para escrever um algoritmo como passos em linguagem comum antes de programar.",
        },
        {
          title: "Registro de prever e testar",
          description: "Uma tabela para registrar as casas finais previstas e as reais ao longo das tentativas.",
        },
        {
          title: "Guia do professor da semana 3",
          description: "Preparação, condução da aula, ideias equivocadas e perguntas para a aula de instruções exatas.",
        },
      ],
      completion: {
        summary: "Termine a semana 3 escrevendo o pseudocódigo de um trajeto, programando uma sequência que chegue ao objetivo, prevendo e registrando um final, e passando na verificação de aprendizagem.",
        requirements: [
          {
            label: "Escrever o pseudocódigo do seu trajeto de entrega antes de programar",
          },
          {
            label: "Programar uma sequência que chegue ao objetivo",
          },
          {
            label: "Prever um final e registrar previsto x real",
          },
          {
            label: "Acertar pelo menos 4 de 5 na verificação de aprendizagem",
          },
          {
            label: "Escrever a sua reflexão",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprima o mapa de trajeto e labirinto, a folha de planejamento de pseudocódigo e o registro de prever e testar para cada estudante ou dupla.",
          "Para os kits, marque com fita um trajeto simples com uma ou duas curvas no chão e deixe à mão um objeto pequeno de entrega; para o simulador, abra a missão de entrega em cada aparelho.",
          "Para o caminho sem eletrônicos, monte uma grade de fita no chão ou distribua grades impressas e cartões de setas e comandos.",
        ],
        prep: [
          "Percorra você mesmo um trajeto para descobrir mais ou menos o quanto um comando de avanço move o robô do kit e o quanto uma curva de 90 graus o gira.",
          "Prepare uma sequência curta com um erro de propósito que você possa rodar, para os estudantes verem um robô seguir instruções erradas ao pé da letra.",
          "Deixe as bases com rodas da semana 2 carregadas e prontas.",
        ],
        facilitation: [
          "Abra com a ideia das instruções literais: dê uma instrução propositalmente vaga e peça a um estudante que a siga exatamente, para ficar claro o que dá errado.",
          "Ensine sequência, evento, algoritmo e pseudocódigo antes de qualquer programação; insista que o pseudocódigo seja escrito antes dos comandos.",
          "Conduza o desafio de entrega e depois a atividade de prever e testar, sempre prevendo antes de rodar.",
          "Peça que os estudantes registrem previsto x real, e encerre com a verificação de aprendizagem e a reflexão.",
        ],
        commonMisconceptions: [
          "\"O robô fez o que eu quis dizer\": ele faz o que você disse, ao pé da letra, não o que você tinha em mente.",
          "Achar que a ordem não importa: trocar uma curva por um avanço manda o robô para um lugar completamente diferente.",
          "Achar que \"virar\" e \"andar\" são o mesmo tipo de comando: uma curva muda para onde ele olha, um avanço muda onde ele está.",
          "Pular o plano em pseudocódigo e montar os blocos por tentativa e erro.",
        ],
        questionsToAsk: [
          "O que exatamente você mandou o robô fazer neste passo?",
          "Onde você prevê que ele vai parar, e para que lado vai estar virado?",
          "O robô errou o objetivo: qual comando, um só, explica isso?",
          "O seu programa continuaria funcionando se dois comandos fossem trocados de lugar?",
        ],
        easierVersion: "Use um trajeto curto e reto, com uma única curva, e dê aos estudantes um modelo de pseudocódigo para preencher, em vez de escrever do zero.",
        harderVersion: "Acrescente um labirinto mais longo, com várias curvas, e desafie os estudantes a chegar ao objetivo com o menor número de comandos.",
      },
      nextWeek: {
        teaser: "Semana que vem o robô ganha sentidos: vamos acrescentar um sensor para ele perceber o mundo em vez de só rodar uma sequência fixa.",
        prepare: [
          "Guarde o seu melhor pseudocódigo de entrega; você vai comparar uma sequência fixa com um robô que reage.",
          "Carregue o seu kit ou salve o simulador nos favoritos, e ache as suas peças de sensor se você estiver no caminho do kit.",
          "Pense numa vez em que um conjunto fixo de passos deu errado porque alguma coisa no caminho mudou.",
        ],
      },
    },
    {
      title: "Dando sentidos ao robô",
      subtitle: "Leia valores reais de sensores, encontre limiares e calibre um robô para poder confiar no que ele percebe.",
      summary: "Agora que o robô anda e segue instruções, os estudantes dão sentidos a ele. Eles conhecem os sensores de toque, distância, luz e cor e aprendem que uma leitura de sensor é um número que o robô consegue medir. Descobrem que um limiar é um ponto de corte que transforma números em \"perto ou longe\" e \"claro ou escuro\", que todo sensor tem limites de detecção, e que as leituras oscilam um pouco (ruído), então é preciso tirar várias e calibrá-las para esta sala e este robô. Depois de ler e calibrar, eles programam uma parada baseada em sensor: o robô anda e usa o sensor de distância para frear bem antes de uma parede, de modo que enfim um limiar controla uma ação de verdade. O comportamento automático completo, com laços de repetição e condições ao longo de uma missão inteira, vem na semana que vem.",
      mainMission: "Ler um sensor em condições variadas, encontrar um limiar e calibrá-lo para as leituras serem confiáveis nesta sala.",
      estimatedTime: "70 a 85 minutos",
      learningGoals: [
        {
          text: "Nomear os sensores de toque, distância, luz e cor, e o que cada um mede",
        },
        {
          text: "Ler o valor de um sensor e explicar que uma leitura é um número, não um sim ou não",
        },
        {
          text: "Encontrar um limiar que separe perto de longe, ou claro de escuro",
        },
        {
          text: "Explicar limites de detecção, ruído e por que se tiram várias leituras",
        },
        {
          text: "Calibrar um sensor para as leituras dele serem confiáveis nesta sala e com este robô",
        },
      ],
      vocabulary: [
        {
          term: "Sensor de toque",
          definition: "Um sensor que indica se está sendo pressionado ou não, como um botão ou um para-choque.",
        },
        {
          term: "Sensor de distância",
          definition: "Um sensor que mede a que distância está o objeto mais próximo, normalmente em centímetros.",
        },
        {
          term: "Sensor de luz",
          definition: "Um sensor que mede o quanto está claro ou escuro, dando um número maior quando há bastante luz.",
        },
        {
          term: "Sensor de cor",
          definition: "Um sensor que lê a cor da superfície bem à frente dele, como vermelho, azul ou branco.",
        },
        {
          term: "Leitura do sensor",
          definition: "O número que um sensor dá num certo momento, como 20 centímetros ou um brilho de 47.",
        },
        {
          term: "Limiar",
          definition: "Um número de corte que você escolhe e que separa dois casos, como \"mais perto do que 15 cm quer dizer perto\".",
        },
        {
          term: "Limite de detecção",
          definition: "O ponto a partir do qual um sensor não consegue mais perceber, como um sensor de distância que não lê além de uns 2 metros.",
        },
        {
          term: "Calibração",
          definition: "Ajustar ou conferir um sensor para as leituras dele ficarem corretas nesta sala e com este robô.",
        },
        {
          term: "Ruído",
          definition: "Pequenas oscilações numa leitura mesmo quando nada muda, e é por isso que se tiram várias leituras.",
        },
        {
          term: "Confiabilidade",
          definition: "O quanto você pode confiar que um sensor vai dar a mesma leitura correta toda vez.",
        },
        {
          term: "Tentativa",
          definition: "Uma única medição dentro de um teste; normalmente se fazem várias tentativas e se comparam.",
        },
        {
          term: "Linha de base",
          definition: "Uma leitura inicial que você tira numa condição conhecida e estável, para comparar as outras leituras com ela.",
        },
      ],
      prerequisites: [
        {
          reason: "Os sensores são montados na base móvel construída na semana 2, para o robô poder ser testado em pontos diferentes.",
        },
        {
          reason: "Ler o valor de um sensor e relatá-lo é uma sequência planejada de instruções exatas, ensinada na semana 3.",
        },
      ],
      concepts: [
        {
          title: "Quatro sentidos que um robô pode ter",
          body: [
            "Um robô percebe o mundo por meio de sensores. Quatro dos mais comuns são o sensor de toque (está sendo pressionado?), o de distância (a que distância está a coisa mais próxima?), o de luz (o quanto está claro?) e o de cor (de que cor é a superfície?).",
            "Cada sensor mede uma coisa só. Um sensor de distância não sabe dizer a cor, e um sensor de cor não sabe dizer a distância. Escolher o sensor certo para cada tarefa faz parte da robótica.",
          ],
          examples: [
            "Toque: o botão de uma campainha",
            "Distância: o bipe de ré de um carro",
            "Luz: a tela de um celular que escurece no escuro",
            "Cor: uma máquina que separa a reciclagem por cor",
          ],
        },
        {
          title: "Uma leitura é um número, não um sim ou um não",
          body: [
            "A maioria dos sensores não diz só \"sim\" ou \"não\": eles dão um número chamado leitura do sensor. Um sensor de distância pode marcar 12 centímetros; um de luz pode marcar um brilho de 47.",
            "Como é um número, a leitura muda aos poucos conforme o mundo muda. Se você aproxima uma parede, o número da distância diminui. Se a sala fica mais clara, o número da luz aumenta.",
          ],
          examples: [
            "Sensor de distância: 12 cm, 30 cm, 85 cm",
            "Sensor de luz: de 10 (escuro) até 90 (bem claro)",
            "O sensor de toque é a exceção: ele costuma marcar pressionado ou não pressionado",
          ],
        },
        {
          title: "Um limiar transforma números em decisões",
          body: [
            "Um limiar é um número de corte que você escolhe para separar dois casos. Se você escolher 15 centímetros, qualquer leitura abaixo de 15 quer dizer \"perto\" e qualquer leitura acima de 15 quer dizer \"longe\".",
            "O robô não escolhe o seu limiar por você: você o encontra observando as leituras e escolhendo um valor que separe bem os casos que lhe interessam. Nesta semana você só encontra e anota limiares; na semana que vem o robô vai usá-los para reagir.",
          ],
          examples: [
            "Corte entre perto e longe em 15 cm",
            "Corte entre claro e escuro num brilho de 40",
            "Corte de um seguidor de linha entre a linha preta e o chão branco",
          ],
        },
        {
          title: "Limites de detecção: todo sensor tem um alcance",
          body: [
            "Nenhum sensor consegue perceber tudo. Um sensor de distância para de funcionar além de certo alcance: ele pode ler bem até uns 2 metros e dar besteira depois disso. Esse ponto mais distante em que ele ainda percebe é o limite de detecção dele.",
            "Os sensores também têm um limite por perto: encoste uma parede perto demais de um sensor de distância e a leitura fica estranha. Conhecer os limites mostra onde você pode confiar no sensor e onde não pode.",
          ],
          examples: [
            "Um sensor de distância que não lê além de uns 2 m",
            "Um sensor de cor que precisa da superfície bem perto, quase encostada",
            "Um sensor de luz confundido por uma janela muito clara",
          ],
        },
        {
          title: "Ruído: por que uma leitura só não basta",
          body: [
            "Aponte um sensor de distância para uma parede que não se mexe e leia várias vezes. Você pode obter 30, 31, 30, 29, 31: o número oscila um pouco mesmo sem nada ter mudado. Essa oscilação se chama ruído.",
            "Por causa do ruído, uma leitura só pode enganar você. Quem faz ciência e robótica tira várias leituras e usa a do meio ou a média, o que é bem mais confiável do que um número só.",
          ],
          examples: [
            "Leituras de 30, 31, 30, 29, 31 numa parede parada",
            "Um sensor de luz que oscila quando passa uma nuvem",
            "Tirar de 3 a 5 leituras e compará-las",
          ],
        },
        {
          title: "Calibração e confiabilidade",
          body: [
            "Calibrar quer dizer conferir ou ajustar um sensor para as leituras dele ficarem corretas nesta sala e com este robô. Um sensor de luz lê diferente numa sala ensolarada e numa sala escura, então o mesmo limiar não funciona em todo lugar: você o calibra para a sala em que está.",
            "Um sensor que você calibrou e testou é confiável: dá para contar que ele vai dar sempre a mesma resposta correta. A confiabilidade é o que mais importa: um robô que percebe errado age errado.",
          ],
          examples: [
            "Tirar uma leitura \"escura\" e uma \"clara\" e usar o meio como limiar",
            "Reconferir o limiar de distância depois de mudar de sala",
            "Confirmar que o sensor de cor distingue vermelho de azul nas suas superfícies de verdade",
          ],
        },
      ],
      materials: [
        {
          name: "Folha de atividade Registro de Leituras do Sensor (para imprimir)",
        },
        {
          name: "Fita métrica ou régua para marcar distâncias conhecidas",
        },
        {
          name: "Lápis e papel para anotar as leituras",
        },
        {
          name: "Um robô programável com sensor de toque, distância, luz ou cor",
        },
        {
          name: "Uma parede, um livro ou uma caixa para colocar em distâncias medidas",
        },
        {
          name: "Uma lanterna e cartões coloridos para os testes de luz e de cor",
        },
        {
          name: "Computador ou tablet com o simulador no navegador",
        },
        {
          name: "Uma venda ou um cachecol para a atividade do sensor humano",
        },
        {
          name: "Cartões em tons claros e escuros (ou tiras em escala de cinza) para separar",
        },
      ],
      activities: [
        {
          title: "Laboratório de investigação de sensores",
          goal: "Medir como a leitura de um sensor muda conforme uma condição muda, e encontrar um limiar que separe bem dois casos.",
          shared: [
            "Escolha uma condição para mudar passo a passo (a distância até uma parede, o brilho ou a cor da superfície) e leia o sensor a cada passo.",
            "Anote cada leitura no registro. Depois olhe os números e escolha um limiar: um valor de corte que separe \"perto de longe\" ou \"claro de escuro\".",
            "Lembre-se: nesta semana o robô só lê e relata. Quem decide o que os números significam é você.",
          ],
          variants: {
            kit: {
              title: "Leia um sensor de verdade em condições medidas",
              materials: [
                "Um robô programável com um sensor",
                "Fita métrica ou régua",
                "Uma parede ou caixa",
                "Folha de atividade Registro de Leituras do Sensor",
              ],
              instructions: [
                "Monte o sensor e carregue um programa curto que leia o sensor e mostre ou relate o valor (ler sensor, depois esperar, depois parar).",
                "Para um sensor de distância: coloque uma parede a 10 cm, 20 cm, 40 cm e 80 cm e anote a leitura em cada caso. Para um sensor de luz: leia o valor sob uma luz forte, sob a luz normal da sala, e com a mão tapando.",
                "Olhe os seus números e escolha um limiar; por exemplo, uma distância abaixo da qual você chamaria alguma coisa de \"perto\", ou um brilho abaixo do qual você a chamaria de \"escura\".",
                "Escreva o seu limiar no registro e uma frase explicando por que escolheu esse número.",
              ],
              safetyNotes: [
                "Mantenha o robô na mesa ou no chão para ele não cair enquanto você lê o visor.",
              ],
              expectedResult: "Uma tabela de leituras que claramente diminuem conforme a parede se aproxima (ou aumentam conforme fica mais claro), e um limiar escolhido que separa perto de longe.",
              successCriteria: [
                "Pelo menos quatro leituras registradas em condições diferentes",
                "As leituras mudam numa direção que faz sentido",
                "Um valor de limiar é escolhido e justificado numa frase",
              ],
              troubleshooting: [
                {
                  problem: "A leitura fica pulando e não se estabiliza",
                  fix: "Isso é ruído: tire três leituras em cada distância e use a do meio.",
                },
                {
                  problem: "A leitura de distância fica travada num número grande, faça o que fizer",
                  fix: "Talvez você esteja além do limite de detecção do sensor ou apontando para o nada; aponte direto para uma parede plana a menos de um metro.",
                },
              ],
              extension: "Mude para outra sala, leia de novo as suas condições e confira se o seu limiar ainda funciona ou precisa ser recalibrado.",
            },
            simulator: {
              title: "Leia o sensor do simulador conforme as condições mudam",
              materials: [
                "Simulador no navegador",
                "Folha de atividade Registro de Leituras do Sensor",
              ],
              instructions: [
                "Abra o simulador e dirija o robô de modo que uma parede (ou uma casa colorida ou clara) fique em distâncias ou níveis de brilho diferentes.",
                "Em cada posição, leia o valor do sensor na tela (ler sensor, esperar, parar) e anote o número no registro.",
                "Estude os números e escolha um limiar que separe perto de longe, ou claro de escuro.",
                "Escreva o limiar e uma frase explicando a sua escolha.",
              ],
              safetyNotes: [
                "Não há riscos físicos; dê uma pausa na tela se os olhos cansarem.",
              ],
              expectedResult: "Uma tabela registrada em que o valor do sensor do simulador muda aos poucos junto com a condição, e um limiar escolhido com bom critério.",
              successCriteria: [
                "Pelo menos quatro leituras registradas em condições diferentes",
                "As leituras mudam numa direção que faz sentido",
                "Um valor de limiar é escolhido e justificado numa frase",
              ],
              troubleshooting: [
                {
                  problem: "A leitura do simulador muda um pouquinho a cada vez, mesmo com o robô parado",
                  fix: "Esse ruído é simulado de propósito: tire algumas leituras e use o valor do meio.",
                },
                {
                  problem: "Não está claro qual número da tela é o do sensor",
                  fix: "Procure o valor que muda quando você aproxima a parede: esse é o da distância.",
                },
              ],
              extension: "Aumente o ruído simulado (ou acrescente uma segunda parede) e veja se o seu limiar ainda separa bem os casos.",
            },
            unplugged: {
              title: "Seja um sensor humano e produza leituras",
              materials: [
                "Venda ou cachecol",
                "Cartões claros e escuros",
                "Folha de atividade Registro de Leituras do Sensor",
              ],
              instructions: [
                "Para um teste de toque ou distância: um estudante fica vendado e estende a mão devagar enquanto um colega segura um cartão como se fosse uma \"parede\". O \"sensor\" vendado diz um número de 1 (longe, não consegue sentir) a 5 (encostando) conforme a parede se aproxima passo a passo.",
                "Para um teste de luz: organize uma pilha de cartões do mais escuro ao mais claro e dê a cada um uma nota de brilho de 1 (o mais escuro) a 5 (o mais claro).",
                "Anote cada \"leitura\" no registro, exatamente como um sensor de verdade relataria um número.",
                "Escolha um limiar: de que número para cima conta como \"perto\" ou \"claro\"? Anote com um motivo.",
              ],
              safetyNotes: [
                "Deixe o chão livre e guie o estudante vendado para ninguém tropeçar nem se esbarrar.",
              ],
              expectedResult: "Um registro de \"leituras de sensor\" humanas que sobem conforme a parede se aproxima ou o cartão fica mais claro, mais um limiar escolhido.",
              successCriteria: [
                "Pelo menos quatro leituras registradas em condições diferentes",
                "As leituras mudam numa direção que faz sentido",
                "Um valor de limiar é escolhido e justificado numa frase",
              ],
              troubleshooting: [
                {
                  problem: "Dois estudantes dão números diferentes para o mesmo cartão",
                  fix: "Isso é parecido com o ruído entre sensores: combinem uma escala comum e leiam de novo, o que é um tipo de calibração.",
                },
                {
                  problem: "Tudo recebe o mesmo número",
                  fix: "Afaste mais as condições (uma parede bem mais perto, um cartão bem mais escuro) para as leituras ficarem bem diferentes.",
                },
              ],
              extension: "Troquem de \"sensor\" e vejam se outra pessoa dá as mesmas leituras; conversem sobre por que a calibração importa.",
            },
          },
        },
        {
          title: "Desafio de calibração e limiar",
          goal: "Lidar com o ruído tirando várias leituras e depois calibrar um limiar de claro ou escuro (ou perto ou longe) que funcione de forma confiável nesta sala.",
          shared: [
            "Escolha uma condição estável e tire várias leituras da mesma coisa sem mudar nada; repare o quanto o número oscila. Essa oscilação é o ruído.",
            "Tire uma leitura numa condição claramente \"baixa\" e outra numa claramente \"alta\" (escuro x claro, ou perto x longe). Coloque o seu limiar no meio, para ele separar bem os dois.",
            "Teste o seu limiar: confira se as leituras da condição baixa caem de um lado e as da condição alta do outro. Se não caírem, ajuste: isso é calibrar.",
          ],
          variants: {
            kit: {
              title: "Calibre um limiar no sensor de verdade",
              materials: [
                "Um robô programável com sensor de luz ou de distância",
                "Cartões coloridos ou em tons diferentes, ou uma parede",
                "Folha de atividade Registro de Leituras do Sensor",
              ],
              instructions: [
                "Leia cinco vezes o mesmo alvo parado e anote os cinco números para enxergar o ruído.",
                "Leia três vezes uma superfície claramente \"escura\" (ou uma parede longe), e depois três vezes uma claramente \"clara\" (ou uma parede perto).",
                "Coloque o seu limiar na metade do caminho entre a média escura e a média clara.",
                "Teste: mostre ao sensor várias superfícies escuras e claras e confirme que cada uma cai do lado certo do seu limiar. Ajuste se alguma cair do lado errado.",
              ],
              safetyNotes: [
                "Mantenha os fios longe das rodas enquanto você move o robô para testar superfícies.",
              ],
              expectedResult: "Um limiar calibrado que separa corretamente superfícies escuras e claras (ou perto e longe) nesta sala, ao longo de várias conferências.",
              successCriteria: [
                "Cinco leituras de ruído registradas",
                "Médias escura e clara registradas",
                "Um limiar definido entre elas",
                "As superfícies de teste são separadas corretamente, ou o limiar é ajustado até isso acontecer",
              ],
              troubleshooting: [
                {
                  problem: "Às vezes uma superfície cai do lado errado",
                  fix: "As duas condições podem estar perto demais uma da outra, ou o ruído está grande; mude o limiar ou use superfícies com mais contraste.",
                },
                {
                  problem: "O conjunto inteiro de leituras se deslocou desde antes",
                  fix: "A luz da sala mudou: recalibre agora, e é exatamente por isso que a calibração importa.",
                },
              ],
              extension: "Leve o robô para um lugar mais ensolarado ou mais escuro e calibre um limiar novo para aquela sala.",
            },
            simulator: {
              title: "Calibre um limiar no simulador",
              materials: [
                "Simulador no navegador com brilho ou ruído ajustáveis",
                "Folha de atividade Registro de Leituras do Sensor",
              ],
              instructions: [
                "Leia o sensor do simulador cinco vezes numa casa parada para enxergar o ruído simulado, e anote os números.",
                "Leia três vezes uma casa escura e três vezes uma casa clara; tire a média de cada grupo.",
                "Coloque o seu limiar entre as duas médias.",
                "Ande por uma mistura de casas escuras e claras, lendo cada uma, e confirme que elas são separadas corretamente. Ajuste o limiar se alguma ficar do lado errado.",
              ],
              safetyNotes: [
                "Não há riscos físicos; vá salvando o seu registro conforme avança.",
              ],
              expectedResult: "Um limiar que separa corretamente as casas escuras e claras no simulador, ao longo de várias conferências.",
              successCriteria: [
                "Cinco leituras de ruído registradas",
                "Médias escura e clara registradas",
                "Um limiar definido entre elas",
                "As casas de teste são separadas corretamente, ou o limiar é ajustado até isso acontecer",
              ],
              troubleshooting: [
                {
                  problem: "As casas continuam sendo separadas errado mesmo com o limiar no meio",
                  fix: "Aumente o contraste entre as casas ou diminua o ruído simulado, e recalibre.",
                },
                {
                  problem: "É difícil calcular a média",
                  fix: "Some as três leituras e divida por três, ou simplesmente use a leitura do meio das três.",
                },
              ],
              extension: "Aumente o ruído simulado e descubra o quanto as condições precisam estar afastadas para o limiar continuar confiável.",
            },
            unplugged: {
              title: "Calibre um separador humano de claro ou escuro",
              materials: [
                "Um conjunto de cartões em escala de cinza ou claros e escuros",
                "Venda (opcional)",
                "Folha de atividade Registro de Leituras do Sensor",
              ],
              instructions: [
                "Peça a um estudante que dê nota ao mesmo cartão cinco vezes sem olhar as respostas anteriores; reparem nas pequenas diferenças (o ruído).",
                "Deem nota três vezes a um cartão claramente escuro e três vezes a um claramente claro, e tirem a média de cada um.",
                "Escolham um número de limiar entre a média escura e a clara: dali para cima é \"claro\", abaixo é \"escuro\".",
                "Embaralhem os cartões e separem usando só o limiar, depois confiram a olho. Ajustem o limiar se algum cartão for separado errado.",
              ],
              safetyNotes: [
                "Não há riscos; mantenham a área de trabalho livre.",
              ],
              expectedResult: "Um número de limiar que permite a um \"sensor\" humano separar corretamente uma pilha embaralhada de cartões em claros e escuros.",
              successCriteria: [
                "Cinco leituras de ruído registradas",
                "Médias escura e clara registradas",
                "Um limiar definido entre elas",
                "Os cartões embaralhados são separados corretamente, ou o limiar é ajustado até isso acontecer",
              ],
              troubleshooting: [
                {
                  problem: "Duas pessoas definem limiares diferentes",
                  fix: "É por isso que a calibração importa: combinem uma única escala e um único limiar para o grupo.",
                },
                {
                  problem: "Os cartões do meio são difíceis de separar",
                  fix: "Os valores do meio ficam perto do limiar; isso é normal, anotem-nos como os casos mais difíceis.",
                },
              ],
              extension: "Acrescentem alguns cartões cinza intermediários, bem difíceis, e conversem sobre por que os sensores se atrapalham bem em cima do limiar.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de medir: se um sensor de distância marca 20 cm quando a parede está a 20 cm, o que você prevê que ele vai marcar quando você levar a parede para 40 cm? Um número maior ou menor, e mais ou menos qual?",
          howToCheck: "Coloque a parede a 40 cm, leia o sensor três vezes e compare a leitura do meio com a sua previsão.",
        },
        {
          prompt: "Preveja: se você ler a mesma parede parada cinco vezes seguidas, vai obter exatamente o mesmo número toda vez?",
          howToCheck: "Tire cinco leituras sem mexer em nada e veja se elas batem exatamente ou se oscilam um pouco (ruído).",
        },
      ],
      testRecords: [
        {
          title: "Tabela de distância x leitura",
          instructions: "Coloque a parede (ou ajuste a condição) em cada distância da lista, tire a leitura do sensor e anote o número. Se oscilar, use a do meio de três leituras.",
          columns: [
            "Distância definida (cm)",
            "Leitura do sensor",
            "Perto ou longe?",
          ],
          measure: "A leitura do sensor em cada distância definida, e se você a chamaria de perto ou longe",
        },
        {
          title: "Verificação de ruído em três tentativas",
          instructions: "Escolha uma condição e não mude nada. Leia o sensor três vezes seguidas e anote cada leitura para ver o quanto ela oscila.",
          columns: [
            "Tentativa",
            "Leitura do sensor",
            "Diferença em relação à tentativa 1",
          ],
          measure: "O quanto a leitura muda entre tentativas quando nada está mudando (o ruído)",
        },
      ],
      knowledgeCheck: {
        instructions: "Responda a estas perguntas para conferir se você entendeu leituras de sensores, limiares, ruído e calibração.",
        questions: [
          {
            prompt: "Ligue cada sensor ao que ele mede.",
            pairs: [
              {
                left: "Sensor de distância",
                right: "A que distância uma coisa está",
              },
              {
                left: "Sensor de luz",
                right: "O quanto está claro",
              },
              {
                left: "Sensor de toque",
                right: "Se alguma coisa está pressionada",
              },
              {
                left: "Sensor de cor",
                right: "De que cor é uma superfície",
              },
            ],
            explanation: "Cada sensor mede uma coisa: distância, nível de luz, toque ou cor.",
          },
          {
            prompt: "Com as suas palavras, o que é um limiar de sensor?",
            sampleAnswer: "Um limiar é um número de corte. Se a leitura fica de um lado dele, o robô decide uma coisa; do outro lado, decide outra, como \"mais perto do que 15 cm quer dizer que tem uma parede perto\".",
            keywords: [
              "corte",
              "valor",
              "numer",
              "decid",
              "perto",
              "longe",
              "linha",
            ],
            explanation: "Um limiar é um valor de corte que transforma o número de um sensor numa decisão de sim ou não.",
          },
          {
            prompt: "O que é uma leitura de sensor?",
            options: [
              {
                text: "O número que um sensor dá num certo momento",
                feedback: "Isso mesmo: uma leitura é um número medido, como 20 cm ou um brilho de 47.",
              },
              {
                text: "O nome do sensor",
                feedback: "O nome diz o tipo dele; a leitura é o número que ele mede.",
              },
              {
                text: "A cor do robô",
                feedback: "A cor do robô não tem nada a ver com o que um sensor mede.",
              },
              {
                text: "Um comando que move o robô",
                feedback: "Isso é um comando de atuador; uma leitura é uma entrada, não uma ação.",
              },
            ],
            explanation: "Uma leitura de sensor é o número que um sensor relata num certo momento, e ela muda aos poucos conforme o mundo muda.",
          },
          {
            prompt: "Um sensor de distância marca 30 cm diante de uma parede e 12 cm diante de uma parede mais próxima. O que isso mostra sobre como a leitura funciona?",
            options: [
              {
                text: "A leitura aumenta quando as coisas se aproximam",
                feedback: "É o contrário: o que está mais perto dá um número de distância menor.",
              },
              {
                text: "A leitura diminui quando as coisas se aproximam",
                feedback: "Correto: um objeto mais perto significa menos centímetros, ou seja, uma leitura menor.",
              },
              {
                text: "A leitura é aleatória e não quer dizer nada",
                feedback: "Ela muda numa direção clara e coerente com a distância.",
              },
              {
                text: "O sensor está quebrado",
                feedback: "É exatamente assim que um sensor de distância funcionando se comporta.",
              },
            ],
            explanation: "A leitura de um sensor de distância diminui conforme o objeto se aproxima, e é assim que dá para transformá-la numa decisão de perto ou longe.",
          },
          {
            prompt: "Você quer que o robô trate como \"perto\" tudo o que estiver a menos de 15 cm. Como se chama esse número 15?",
            options: [
              {
                text: "Um limite de detecção",
                feedback: "Um limite de detecção é o mais longe que um sensor consegue perceber, não o corte que você escolheu.",
              },
              {
                text: "Ruído",
                feedback: "Ruído é a pequena oscilação das leituras, não um valor de corte.",
              },
              {
                text: "Um limiar",
                feedback: "Isso mesmo: um limiar é o número de corte que você escolhe para separar perto de longe.",
              },
              {
                text: "Um atuador",
                feedback: "Um atuador é uma peça que age; 15 cm é um valor, não uma peça.",
              },
            ],
            explanation: "Um limiar é um valor de corte que você escolhe e que separa dois casos, como perto x longe ou claro x escuro.",
          },
          {
            prompt: "Você lê a mesma parede parada cinco vezes e obtém 30, 31, 30, 29, 31. Por que os números oscilam?",
            options: [
              {
                text: "A parede fica se mexendo",
                feedback: "A parede não está se mexendo; a oscilação acontece mesmo sem nada mudar.",
              },
              {
                text: "Por causa do ruído, então você tira várias leituras",
                feedback: "Correto: o ruído faz as leituras oscilarem um pouco, então você lê várias e usa a do meio.",
              },
              {
                text: "O limiar está errado",
                feedback: "Um limiar é um corte que você escolhe; ele não faz as leituras oscilarem.",
              },
              {
                text: "A bateria do sensor acabou",
                feedback: "Um sensor sem bateria não leria nada; pequenas oscilações são ruído normal.",
              },
            ],
            explanation: "Ruído é a oscilação pequena e normal das leituras mesmo quando nada muda, então em robótica se tiram várias leituras e se usa a do meio ou a média.",
          },
          {
            prompt: "O seu limiar de claro ou escuro funcionou na sala de aula, mas falha numa sala ensolarada. O que você deve fazer?",
            options: [
              {
                text: "Desistir: sensores de luz não funcionam fora",
                feedback: "Sensores de luz funcionam bem; eles só precisam ser ajustados para a nova luz.",
              },
              {
                text: "Calibrar o sensor para a sala nova e definir um limiar novo",
                feedback: "Correto: a calibração ajusta as suas leituras e o seu limiar à luz desta sala.",
              },
              {
                text: "Fazer o robô andar mais rápido",
                feedback: "A velocidade não tem nada a ver com ler a luz corretamente.",
              },
              {
                text: "Acrescentar mais rodas",
                feedback: "Rodas não mudam o jeito de um sensor de luz medir o brilho.",
              },
            ],
            explanation: "O mesmo limiar não funciona em toda sala, então você calibra o sensor para a nova luz e escolhe um limiar novo que separe de forma confiável o claro do escuro.",
          },
        ],
      },
      reflection: [
        {
          prompt: "Quando o seu sensor deu uma leitura inesperada, e o que pode ter causado isso?",
        },
        {
          prompt: "Você leu um objeto parado várias vezes e obteve números um pouco diferentes. Por que isso acontece, e o que você fez a respeito?",
        },
        {
          prompt: "Por que um robô que percebe perfeitamente numa sala pode precisar ser calibrado de novo em outra sala?",
        },
      ],
      journalPrompts: [
        {
          prompt: "Registre as leituras do seu sensor em todas as condições que você testou e o limiar que escolheu.",
        },
        {
          prompt: "Anote o seu número de limiar e uma frase explicando por que você o escolheu.",
        },
        {
          prompt: "Anote o quanto as suas leituras oscilaram quando nada mudava, e quantas leituras você tirou.",
        },
      ],
      savedPrograms: [
        {
          title: "Desafio de parada por sensor",
          description: "Programe o robô para andar para a frente enquanto observa o sensor de distância e depois parar na casa bem antes da parede, usando o limiar que você encontrou. Faça três tentativas, ajuste a velocidade ou o limiar entre elas, e explique o seu ajuste final nas observações.",
        },
      ],
      simulatorMissions: [
        {
          title: "Leia um sensor em condições variadas",
          objective: "Dirija o robô para a parede ficar em distâncias diferentes, leia o sensor em cada uma e registre os valores sem fazer o robô reagir.",
          successCriteria: [
            "Pelo menos três leituras do sensor tiradas em distâncias diferentes",
            "As leituras mudam numa direção que faz sentido",
            "Nenhum bloco de condição ou repetição foi usado: o robô só lê e relata",
          ],
        },
        {
          title: "Encontre um limiar de claro e escuro",
          objective: "Leia o sensor em casas escuras e claras e registre valores suficientes para escolher um limiar que as separe.",
          successCriteria: [
            "Leituras escuras e claras registradas",
            "Um valor de limiar escolhido entre elas",
            "O limiar separa corretamente as casas registradas",
          ],
        },
        {
          title: "Pare antes da parede",
          objective: "Faça o robô andar para a frente e use o sensor de distância para pará-lo na casa bem antes da parede, e depois sinalize que a missão foi concluída.",
          successCriteria: [
            "O robô para na casa bem antes da parede",
            "O sensor de distância decide a hora de parar",
            "O robô sinaliza missão concluída e não bate na parede",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Quatro sentidos e o que é uma leitura",
          focus: "Sensores de toque, distância, luz e cor; uma leitura é um número, não um sim ou não.",
        },
        {
          title: "Preveja as leituras",
          focus: "Adivinhar como uma leitura muda com a distância, e se uma parede parada dá o mesmo número duas vezes.",
        },
        {
          title: "Laboratório de investigação de sensores",
          focus: "Ler um sensor em condições variadas e encontrar um limiar.",
        },
        {
          title: "Desafio de calibração e limiar",
          focus: "Lidar com o ruído e depois calibrar um limiar confiável para esta sala.",
        },
        {
          title: "Desafio de parada por sensor",
          focus: "Programar o robô para andar e usar o sensor de distância para parar antes da parede; fazer três tentativas e afinar o limiar.",
        },
        {
          title: "Verificação de aprendizagem",
          focus: "Cinco perguntas sobre leituras, limiares, ruído e calibração.",
        },
        {
          title: "Reflexão",
          focus: "Escrever sobre limiares, ruído e por que a calibração importa.",
        },
      ],
      safetyNotes: [
        {
          text: "Mantenha o robô numa superfície estável e cuidado com as rodas ao movê-lo entre os pontos de teste.",
        },
        {
          text: "Guie quem estiver fazendo o papel de \"sensor humano\" vendado e deixe o chão livre para ninguém tropeçar.",
        },
        {
          text: "Não aponte a lanterna direto para os olhos de ninguém ao testar sensores de luz.",
        },
        {
          text: "Salve o seu registro de leituras com frequência para que atualizar o navegador não apague os seus dados.",
        },
      ],
      printableResources: [
        {
          title: "Registro de Leituras do Sensor",
          description: "Tabelas para registrar leituras de sensor em condições variadas, uma verificação de ruído em três tentativas e o limiar escolhido.",
        },
        {
          title: "Página de limiar e calibração",
          description: "Espaço para anotar leituras, calcular médias e escrever e justificar um limiar calibrado.",
        },
        {
          title: "Guia do professor da semana 4",
          description: "Preparação, condução da aula, ideias equivocadas e perguntas para a aula de leitura de sensores e calibração.",
        },
      ],
      completion: {
        summary: "Termine a semana 4 lendo um sensor em condições variadas, registrando os valores, escolhendo e calibrando um limiar, e passando na verificação de aprendizagem.",
        requirements: [
          {
            label: "Registrar leituras de sensor em condições variadas no Laboratório de investigação de sensores",
          },
          {
            label: "Escolher e calibrar um limiar no Desafio de calibração e limiar",
          },
          {
            label: "Acertar pelo menos 4 de 5 na verificação de aprendizagem",
          },
          {
            label: "Escrever a sua reflexão",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprima o Registro de Leituras do Sensor para cada estudante ou dupla.",
          "Prepare um ponto medido com uma fita métrica marcada em 10, 20, 40 e 80 cm e uma parede ou caixa para colocar ali.",
          "Se for usar kits, monte um sensor e deixe um programa curto de ler e relatar já carregado; se for usar o simulador, abra-o em cada aparelho; para o caminho sem eletrônicos, prepare uma venda e um conjunto de cartões claros e escuros.",
        ],
        prep: [
          "Faça você mesmo o laboratório de sensores primeiro, para conhecer as leituras reais e os limites de detecção do seu sensor.",
          "Tire com antecedência cinco leituras de um objeto parado para poder mostrar aos estudantes como o ruído aparece.",
          "Decida quais serão as duas condições bem distintas (escuro x claro, ou perto x longe) que você vai usar no desafio de calibração.",
        ],
        facilitation: [
          "Comece pelos quatro sensores e pela ideia central de que uma leitura é um número, não um sim ou não, antes de medir qualquer coisa.",
          "Peça que os estudantes primeiro prevejam as leituras, e depois conduza o Laboratório de investigação de sensores anotando cada valor.",
          "Insista que nesta semana o robô só lê e relata: quem decide o que os números significam são os estudantes, não o robô; as reações automáticas vêm na semana que vem.",
          "Conduza o Desafio de calibração e limiar, mostrando o ruído com leituras repetidas e colocando o limiar entre duas condições bem distintas.",
        ],
        commonMisconceptions: [
          "\"Um sensor dá um sim ou um não\": a maioria dá um número que muda aos poucos junto com o mundo.",
          "\"Uma leitura basta\": por causa do ruído, convém tirar várias e usar a do meio ou a média.",
          "\"O mesmo limiar serve em qualquer lugar\": a luz e as superfícies mudam de sala para sala, então você calibra para onde está.",
          "\"O sensor está quebrado porque o número oscila\": uma oscilação pequena é ruído normal, não defeito.",
        ],
        questionsToAsk: [
          "Que número você leu, e o que ele quer dizer: perto ou longe, claro ou escuro?",
          "Por que você tirou mais de uma leitura no mesmo ponto?",
          "Onde você colocou o seu limiar, e como decidiu isso?",
          "O seu limiar continuaria funcionando numa sala mais clara? Como você conferiria isso?",
        ],
        easierVersion: "Use um sensor só e duas condições bem distintas (uma parede perto e uma longe), e definam o limiar juntos, com a turma toda.",
        harderVersion: "Peça que os estudantes comparem dois sensores, expressem o ruído como um intervalo e calibrem um limiar que funcione em duas salas diferentes.",
      },
      nextWeek: {
        teaser: "Semana que vem o robô para de só relatar números e começa a reagir a eles sozinho, usando laços de repetição e condições com os limiares que você encontrou.",
        prepare: [
          "Guarde os limiares que você calibrou nesta semana: você vai usá-los para o robô decidir na semana que vem.",
          "Carregue o seu kit ou salve o simulador nos favoritos.",
          "Pense numa regra simples como \"se a parede estiver mais perto do que o meu limiar, então vire\": é isso que você vai construir.",
        ],
      },
    },
    {
      title: "Fazendo os robôs reagirem",
      subtitle: "Combine sensores com laços de repetição e condições para um robô reagir ao mundo sozinho.",
      summary: "Esta é a grande semana de programação. Os estudantes pegam os sensores da semana 4 e as sequências da semana 3 e combinam tudo com laços de repetição e condições, para o robô conseguir reagir sozinho. Eles aprendem que um laço repete passos, que um laço infinito se repete até alguém pará-lo, e que um laço repetir-até roda até uma condição virar verdadeira. Conhecem as condições e as decisões booleanas (verdadeiro ou falso), e depois usam se e se/senão para escolher ações. Programam o desvio de obstáculos (repetir em laço, ler o sensor de distância e, se houver algo perto, virar) e exploram o seguimento de linha, conferindo um sensor de luz ou de cor para se guiar e continuar em cima de uma linha.",
      mainMission: "Programar um robô que reage sozinho: ele repete em laço, confere um sensor e usa se/senão para desviar de obstáculos ou seguir uma linha.",
      estimatedTime: "70 a 85 minutos",
      learningGoals: [
        {
          text: "Explicar como um laço, um laço infinito e um laço repetir-até repetem passos, cada um do seu jeito",
        },
        {
          text: "Descrever uma condição como uma verificação que é verdadeira ou falsa (booleana)",
        },
        {
          text: "Usar se para rodar passos só quando uma condição é verdadeira, e se/senão para escolher entre duas ações",
        },
        {
          text: "Programar o desvio de obstáculos repetindo em laço, lendo um sensor de distância e virando quando algo está perto",
        },
        {
          text: "Explicar como o seguimento de linha fica conferindo um sensor de luz ou de cor para se guiar e continuar em cima de uma linha",
        },
      ],
      vocabulary: [
        {
          term: "Laço de repetição",
          definition: "Um bloco que repete um ou mais passos, em vez de você escrever tudo de novo várias vezes.",
        },
        {
          term: "Laço infinito",
          definition: "Um laço que fica repetindo os passos dele sem parar, até você parar o programa.",
        },
        {
          term: "Repetir-até",
          definition: "Um laço que repete os passos dele até uma condição virar verdadeira, e aí para e segue em frente.",
        },
        {
          term: "Condição",
          definition: "Uma verificação sobre o mundo, tipo \"a parede está perto?\", que é sempre verdadeira ou falsa.",
        },
        {
          definition: "Um bloco que roda os passos dele só quando a condição é verdadeira, e pula esses passos quando ela é falsa.",
        },
        {
          term: "Se/senão",
          definition: "Um bloco que roda um conjunto de passos quando a condição é verdadeira e outro conjunto quando ela é falsa.",
        },
        {
          term: "Booleano",
          definition: "Um valor que só pode ser uma de duas coisas: verdadeiro ou falso. As condições dão uma resposta booleana.",
        },
        {
          term: "Desvio de obstáculos",
          definition: "Um comportamento em que o robô repete em laço, lê um sensor de distância e se afasta quando algo está perto.",
        },
        {
          term: "Seguimento de linha",
          definition: "Um comportamento em que o robô fica conferindo um sensor de luz ou de cor e se guia para continuar em cima de uma linha marcada.",
        },
        {
          term: "Comportamento reativo",
          definition: "Quando um robô muda o que faz com base no que percebe, em tempo real, em vez de seguir uma lista fixa.",
        },
      ],
      prerequisites: [
        {
          reason: "Reagir continua sendo rodar um programa, então isso se apoia nas sequências de instruções exatas da semana 3.",
        },
        {
          reason: "Um robô só consegue reagir ao que ele percebe, então esta semana precisa dos sensores de distância, luz e cor da semana 4.",
        },
      ],
      concepts: [
        {
          title: "Laços: repetir sem reescrever",
          body: [
            "Na semana 3 você escreveu cada passo em fila. Isso funciona, mas se você quer que o robô confira o sensor cem vezes, não vai querer escrever o mesmo passo cem vezes. Um laço é um bloco que repete os passos para você.",
            "Um laço de repetição simples roda os passos um número fixo de vezes, tipo \"repita 4 vezes: ande para a frente, vire à direita\", para fazer um quadrado. O laço faz a contagem, então o seu programa fica curto.",
          ],
          examples: [
            "Repetir 4 vezes para percorrer um quadrado",
            "Repetir 3 vezes para bater numa porta",
            "Repetir 10 vezes para avançar um pouquinho e conferir",
          ],
        },
        {
          title: "Laços infinitos e laços repetir-até",
          body: [
            "Um laço infinito repete os passos dele sem parar e nunca acaba sozinho: continua até você parar o programa. Os robôs usam laços infinitos para não parar de observar o mundo, tipo \"para sempre: leia o sensor e reaja\".",
            "Um laço repetir-até é diferente: ele repete os passos até uma condição virar verdadeira, e aí para e segue em frente. \"Repita até a parede estar perto: ande para a frente\" quer dizer continuar andando, mas no instante em que a parede estiver perto, parar de repetir.",
          ],
          examples: [
            "Para sempre: não parar de conferir o sensor de distância",
            "Repita até achar a linha: ande para a frente",
            "Repita até o botão ser apertado: espere",
          ],
        },
        {
          title: "Condições são verdadeiras ou falsas (booleanas)",
          body: [
            "Uma condição é uma pergunta sobre o mundo que só pode ser respondida com sim ou não; em programação a gente diz verdadeiro ou falso. Um valor que só pode ser verdadeiro ou falso se chama booleano.",
            "\"A parede está a menos de 10 cm?\" é uma condição. Agora ela pode ser verdadeira; um segundo depois, quando o robô se mexer, pode ser falsa. As condições são o jeito de o robô transformar a leitura de um sensor num sim ou não bem claro, sobre o qual ele pode agir.",
          ],
          examples: [
            "A parede está perto? -> verdadeiro ou falso",
            "O sensor está em cima da linha escura? -> verdadeiro ou falso",
            "O botão está apertado? -> verdadeiro ou falso",
          ],
        },
        {
          title: "Se e se/senão: escolher o que fazer",
          body: [
            "Um bloco se roda os passos dele só quando a condição é verdadeira. \"Se a parede estiver perto, vire à direita\" quer dizer que o robô vira só quando há mesmo uma parede perto; caso contrário, ele pula a curva.",
            "Um bloco se/senão escolhe entre duas ações: roda um conjunto de passos quando a condição é verdadeira e outro quando ela é falsa. \"Se a parede estiver perto, vire à direita; senão, ande para a frente\" quer dizer que o robô sempre faz uma coisa ou outra, dependendo do que percebe.",
          ],
          examples: [
            "Se perdeu a linha, vire para achá-la de novo",
            "Se/senão: parede perto -> vire, senão -> ande para a frente",
            "Se o item for vermelho, vire para a caixa vermelha",
          ],
        },
        {
          title: "Desvio de obstáculos = laço + sensor + se/senão",
          body: [
            "Agora junte tudo. O desvio de obstáculos é um laço infinito que lê o sensor de distância e usa se/senão para decidir: se algo estiver perto, afaste-se; senão, continue andando. Como o laço se repete várias vezes por segundo, o robô reage no instante em que um obstáculo aparece.",
            "É esse o padrão por trás dos carros que estacionam sozinhos e dos robôs aspiradores: perceber, decidir e agir, sem parar.",
          ],
          examples: [
            "Para sempre: leia a distância; se estiver perto vire, senão ande para a frente",
            "Um robô aspirador esbarrando pelo cômodo",
            "Um veículo explorador contornando uma pedra",
          ],
        },
        {
          title: "Seguimento de linha: continue conferindo e corrigindo",
          body: [
            "O seguimento de linha usa um sensor de luz ou de cor apontado para o chão. Uma linha escura reflete menos luz do que um chão claro, então o sensor consegue distinguir \"em cima da linha\" de \"fora da linha\". O robô fica conferindo, de novo e de novo, e se guia para continuar em cima da linha.",
            "Uma regra simples: se o sensor enxergar a linha, faça uma curva para um lado; senão, curve de volta para o outro. O robô nunca anda perfeitamente reto: ele vai serpenteando pela beirada da linha, corrigindo o tempo todo. Esse conferir e corrigir constante é o comportamento reativo.",
          ],
          examples: [
            "Robôs de galpão seguindo fitas coladas no chão",
            "Um carrinho de fábrica sobre uma linha pintada",
            "Repetir até a marca final: continuar seguindo a linha",
          ],
        },
      ],
      materials: [
        {
          name: "Folha de planejamento do programa de blocos (para imprimir)",
        },
        {
          name: "Conjunto de cartões de decisão se/senão (para imprimir)",
        },
        {
          name: "Registro de testes de reação (para imprimir)",
        },
        {
          name: "Um kit de robótica programável com sensor de distância e sensor de luz ou de cor",
        },
        {
          name: "Caixas ou livros para montar uma pistinha de obstáculos",
        },
        {
          name: "Fita escura (ou uma linha impressa) sobre um chão claro para o seguimento de linha",
        },
        {
          name: "Computador ou tablet com o simulador no navegador",
        },
        {
          name: "Cartões de programa (para sempre, se, se/senão, andar, virar, ler sensor, parar) e uma grade no chão ou uma linha de fita",
        },
        {
          name: "Um colega para fazer o papel de robô e seguir os cartões",
        },
      ],
      activities: [
        {
          title: "Programa de desvio de obstáculos",
          goal: "Programar um robô para repetir em laço, ler um sensor de distância e usar se/senão para virar quando algo estiver perto e andar para a frente quando o caminho estiver livre.",
          shared: [
            "O padrão é sempre o mesmo: laço infinito, ler o sensor de distância, e depois se/senão: se algo estiver perto, vire; senão, ande para a frente.",
            "Primeiro decida a sua regra de proximidade (por exemplo, \"menos de 10 cm conta como perto\"). Depois monte o laço para o robô continuar reagindo o tempo todo em que estiver funcionando.",
          ],
          variants: {
            kit: {
              title: "Desvie de obstáculos de verdade com um robô de kit",
              materials: [
                "Um kit de robótica com sensor de distância",
                "Caixas ou livros para uma pista de obstáculos",
                "Folha de planejamento do programa de blocos",
              ],
              instructions: [
                "Espalhe alguns obstáculos (caixas ou livros) com vãos por onde o robô consiga passar.",
                "Monte um laço infinito. Dentro dele, leia o sensor de distância.",
                "Acrescente um se/senão: se a distância for menor que o seu valor de proximidade, vire; senão, ande um pouquinho para a frente.",
                "Rode e veja o robô repetir o laço, perceber e contornar os obstáculos sozinho.",
              ],
              safetyNotes: [
                "Mantenha os dedos longe das rodas enquanto o robô anda.",
                "Dê ao robô um chão livre, sem fios nem degraus.",
              ],
              expectedResult: "O robô anda para a frente sozinho e se afasta toda vez que um obstáculo chega perto, sem ninguém pilotando.",
              successCriteria: [
                "O programa usa um laço infinito (ou de repetição)",
                "O programa lê o sensor de distância dentro do laço",
                "O programa usa se/senão para virar quando está perto e andar quando está livre",
                "O robô desvia de pelo menos um obstáculo sozinho",
              ],
              troubleshooting: [
                {
                  problem: "O robô entra direto nos obstáculos",
                  fix: "Confira se o se está mesmo lendo o sensor, e se o seu valor de proximidade é maior que a leitura quando há uma parede bem na frente.",
                },
                {
                  problem: "O robô gira no lugar sem parar",
                  fix: "O seu valor de proximidade pode estar grande demais, fazendo ele achar que sempre tem algo perto; diminua, ou acrescente um avanço curto no senão.",
                },
              ],
              extension: "Acrescente uma segunda regra com se/senão para o robô virar às vezes à esquerda e às vezes à direita, e assim sair dos cantos.",
            },
            simulator: {
              title: "Desvie de paredes numa grade no simulador",
              materials: [
                "Simulador no navegador",
                "Folha de planejamento do programa de blocos",
              ],
              instructions: [
                "Abra a missão da pista de obstáculos, com paredes na grade.",
                "Arraste um laço infinito para a área de trabalho e coloque dentro dele um bloco de ler sensor (distância).",
                "Acrescente um se/senão: se houver uma parede perto à frente, vire à esquerda (ou à direita); senão, ande para a frente.",
                "Rode a missão e veja o robô repetir o laço e contornar as paredes até chegar ao objetivo.",
              ],
              safetyNotes: [
                "Não há riscos físicos; dê uma pausa na tela se os olhos cansarem.",
              ],
              expectedResult: "O robô do simulador continua andando e vira toda vez que detecta uma parede à frente, se enfiando pela grade sozinho.",
              successCriteria: [
                "O programa usa um laço infinito",
                "O programa tem um bloco de ler sensor dentro do laço",
                "O programa usa se/senão para virar quando uma parede está perto e andar quando está livre",
                "O robô chega ao objetivo sem ninguém pilotando",
              ],
              troubleshooting: [
                {
                  problem: "O robô sai da grade ou entra numa parede",
                  fix: "Confira se o ler sensor e o se/senão estão dentro do laço, e não depois dele, para a verificação acontecer a cada passo.",
                },
                {
                  problem: "O robô só vira e nunca anda para a frente",
                  fix: "Coloque o andar para a frente no ramo do senão, para ele se mover sempre que o caminho à frente estiver livre.",
                },
              ],
              extension: "Ative mais paredes ou um vão mais estreito e ajuste o programa para o robô continuar passando.",
            },
            unplugged: {
              title: "Percorra uma pista de obstáculos com cartões de se e um robô humano",
              materials: [
                "Cartões de programa (para sempre, ler sensor, se/senão, andar, virar, parar)",
                "Um colega para ser o robô",
                "Objetos para servir de obstáculos",
              ],
              instructions: [
                "Espalhe alguns objetos pelo chão como obstáculos, deixando vãos entre eles.",
                "Disponha os cartões: um cartão de para sempre e, dentro dele, um de ler sensor (\"olhe para a frente: tem algo perto?\") e um de se/senão.",
                "Escreva o se/senão: se tiver algo perto, vire; senão, dê um passo para a frente.",
                "Sem venda: o seu colega é o robô e só pode fazer exatamente o que o cartão da vez manda, conferindo \"está perto?\" a cada volta do laço.",
              ],
              safetyNotes: [
                "Use objetos macios e seguros como obstáculos.",
                "Deixe o chão livre de qualquer coisa em que alguém possa tropeçar.",
              ],
              expectedResult: "O robô humano repete o laço de cartões, confere se há obstáculos a cada volta e se afasta quando um está perto, sem nunca bater neles.",
              successCriteria: [
                "Os cartões incluem um laço, um ler sensor e um se/senão",
                "O robô confere a condição de novo a cada volta do laço",
                "O robô vira só quando algo está perto e dá um passo à frente quando está livre",
                "A pista é concluída sem batidas",
              ],
              troubleshooting: [
                {
                  problem: "O robô \"cola\" e simplesmente contorna os obstáculos",
                  fix: "Lembre que um robô só pode seguir os cartões; ele precisa mesmo conferir a condição e agir de acordo com ela.",
                },
                {
                  problem: "O robô esquece de continuar conferindo",
                  fix: "O cartão de para sempre quer dizer voltar ao topo toda vez; aponte para ele depois de cada ação.",
                },
              ],
              extension: "Acrescente um se/senão que vire à esquerda perto de uma parede à esquerda e à direita perto de uma parede à direita.",
            },
          },
        },
        {
          title: "Exploração do seguimento de linha",
          goal: "Usar um sensor de luz ou de cor com repetir-até e se para manter um robô se guiando ao longo de uma linha marcada.",
          shared: [
            "O seguimento de linha é um comportamento de conferir sem parar: de novo e de novo, leia o sensor de luz ou de cor e corrija o rumo para continuar em cima da linha.",
            "Uma regra simples já resolve: se o sensor estiver em cima da linha, curve para um lado; senão, curve para o outro. Coloque isso dentro de um laço repetir-até que termine quando o robô chegar à marca final.",
          ],
          variants: {
            kit: {
              title: "Siga uma linha de fita com um sensor de luz ou de cor",
              materials: [
                "Um kit de robótica com sensor de luz ou de cor",
                "Uma linha de fita escura sobre um chão claro",
                "Folha de planejamento do programa de blocos",
              ],
              instructions: [
                "Cole uma linha de fita escura num chão claro, com uma marca bem visível de início e outra de fim.",
                "Aponte o sensor de luz ou de cor para o chão e confira a leitura dele em cima da linha e fora da linha.",
                "Monte um laço repetir-até (até a marca final) com um se dentro: se o sensor estiver fora da linha, corrija o rumo na direção dela; senão, continue curvando pela beirada.",
                "Rode e veja o robô serpentear ao longo da linha e parar no fim.",
              ],
              safetyNotes: [
                "Mantenha os dedos longe das rodas durante as rodadas.",
                "Cole a linha bem lisa, para ninguém tropeçar.",
              ],
              expectedResult: "O robô segue a linha de fita, corrigindo de um lado para o outro conforme anda, e para na marca final.",
              successCriteria: [
                "O programa lê o sensor de luz ou de cor dentro de um laço",
                "O programa usa um se (ou um se/senão) para corrigir o rumo com base na leitura",
                "O robô fica mais ou menos em cima da linha na maior parte do percurso",
                "O robô para na marca final",
              ],
              troubleshooting: [
                {
                  problem: "O robô perde a linha logo de cara",
                  fix: "Confira de novo as leituras em cima da linha e fora dela e coloque o limiar entre as duas; elas precisam ser bem diferentes.",
                },
                {
                  problem: "O robô fica rodando em círculos",
                  fix: "Faça as curvas de correção pequenas; curvas grandes passam da linha toda vez.",
                },
              ],
              extension: "Acrescente uma curva ou uma bifurcação à linha e ajuste a regra de direção para o robô continuar seguindo.",
            },
            simulator: {
              title: "Siga uma linha na grade do simulador",
              materials: [
                "Simulador no navegador",
                "Folha de planejamento do programa de blocos",
              ],
              instructions: [
                "Abra a missão de seguimento de linha, com um caminho marcado atravessando a grade.",
                "Acrescente um laço repetir-até configurado para rodar até o robô chegar à casa final.",
                "Dentro dele, coloque um bloco de ler sensor (luz ou cor) e um se/senão: se estiver fora da linha, vire de volta na direção dela; senão, ande para a frente.",
                "Rode a missão e veja o robô se guiar ao longo da linha até a chegada.",
              ],
              safetyNotes: [
                "Não há riscos físicos; dê pausas na tela quando precisar.",
              ],
              expectedResult: "O robô do simulador segue o caminho marcado, corrigindo o rumo para não sair dele, e para ao chegar à casa final.",
              successCriteria: [
                "O programa usa um laço repetir-até",
                "O programa lê o sensor de luz ou cor a cada volta do laço",
                "O programa usa se/senão para corrigir o rumo com base na leitura",
                "O robô chega ao fim da linha",
              ],
              troubleshooting: [
                {
                  problem: "O laço nunca acaba",
                  fix: "Confira se a condição do repetir-até (chegar à casa final) realmente consegue virar verdadeira ao longo do caminho.",
                },
                {
                  problem: "O robô sai da linha aos poucos",
                  fix: "Confira se o ler sensor e o se/senão estão dentro do laço, para ele conferir e corrigir a cada passo.",
                },
              ],
              extension: "Escolha um mapa com uma linha mais cheia de curvas e ajuste a correção de rumo para o robô dar conta.",
            },
            unplugged: {
              title: "Encene o seguimento de linha por uma regra, ao longo de uma linha de fita",
              materials: [
                "Uma linha de fita no chão com início e fim",
                "A regra de seguimento de linha escrita num cartão",
                "Um colega para ser o robô",
              ],
              instructions: [
                "Cole uma linha de fita no chão com uma marca bem visível de início e outra de fim.",
                "Escreva a regra: \"Continue até chegar ao fim. A cada passo, confira: os seus pés estão em cima da linha? Se sim, dê um passo à frente sobre ela; se não, vire um pouquinho na direção da linha e dê um passo\".",
                "O seu colega é o robô: ele só pode seguir a regra, conferindo os pés contra a linha a cada passo, sem nunca olhar à frente para planejar.",
                "Repita até ele chegar à marca final, e aí pare.",
              ],
              safetyNotes: [
                "Andem devagar e mantenham o caminho livre, para ninguém tropeçar.",
                "Cole a linha bem lisa no chão.",
              ],
              expectedResult: "O robô humano segue a linha de fita passo a passo, corrigindo na direção dela sempre que um pé sai, e para no fim.",
              successCriteria: [
                "O robô confere a cada passo se está em cima da linha",
                "O robô corrige na direção da linha quando sai dela",
                "O robô segue a regra, e não o próprio julgamento",
                "O robô para na marca final",
              ],
              troubleshooting: [
                {
                  problem: "O robô simplesmente percorre a linha inteira, lisinho, sem conferir",
                  fix: "Isso é uma pessoa planejando à frente: faça ele parar e conferir a condição de novo a cada passo, como um laço.",
                },
                {
                  problem: "O robô fica discutindo para que lado virar",
                  fix: "Escreva a regra de um jeito em que \"fora da linha\" signifique sempre virar na direção da linha, tirando o achismo.",
                },
              ],
              extension: "Acrescente uma curva à linha e veja se a mesma regra ainda mantém o robô em cima dela.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de rodar o programa de obstáculos: quando o robô encontrar uma parede, o que você prevê que ele vai fazer, e por quê?",
          howToCheck: "Rode o programa diante de uma parede três vezes e compare o que o robô faz de verdade com a sua previsão.",
        },
        {
          prompt: "Preveja: se você tirar o ler sensor de dentro do laço, como as reações do robô vão mudar?",
          howToCheck: "Tire a leitura do sensor de dentro do laço, rode e veja se o robô ainda reage aos obstáculos que aparecem.",
        },
      ],
      testRecords: [
        {
          title: "Teste de confiabilidade do desvio de obstáculos",
          instructions: "Coloque o robô diante de um obstáculo e rode o programa. Registre se ele se afastou a tempo. Repita três vezes a partir do mesmo ponto de partida.",
          columns: [
            null,
            "Ele desviou do obstáculo? (S/N)",
            "O que ele fez",
          ],
          measure: "Em quantas das três tentativas o robô conseguiu desviar do obstáculo",
        },
      ],
      knowledgeCheck: {
        instructions: "Responda a estas perguntas para conferir se você entendeu laços, condições e como os robôs reagem.",
        questions: [
          {
            prompt: "Decida se esta afirmação é verdadeira ou falsa.",
            statement: "Um laço infinito para sozinho depois de alguns segundos.",
            explanation: "Falso. Um laço infinito fica se repetindo até alguma coisa pará-lo: ele não acaba por conta própria.",
          },
          {
            prompt: "O que um laço faz num programa?",
            options: [
              {
                text: "Faz o robô andar mais rápido",
                feedback: "A velocidade vem dos motores, não de um laço.",
              },
              {
                text: "Repete um ou mais passos, em vez de escrevê-los de novo e de novo",
                feedback: "Isso mesmo: um laço repete passos para o seu programa ficar curto.",
              },
              {
                text: "Para o robô",
                feedback: "Parar é o que um bloco de parar faz, não um laço.",
              },
              {
                text: "Acrescenta um sensor novo",
                feedback: "Um laço repete passos; ele não acrescenta peças.",
              },
            ],
            explanation: "Um laço repete passos para você, para o robô conseguir fazer ou conferir alguma coisa várias vezes sem um programa enorme.",
          },
          {
            prompt: "Qual é a diferença entre um laço infinito e um laço repetir-até?",
            options: [
              {
                text: "Um laço infinito roda uma vez; um repetir-até roda duas",
                feedback: "Nenhum dos dois roda uma ou duas vezes fixas: os dois ficam se repetindo.",
              },
              {
                text: "Um laço infinito se repete até você parar o programa; um repetir-até se repete até uma condição virar verdadeira",
                feedback: "Correto: o infinito continua até ser parado; o repetir-até para sozinho quando a condição dele fica verdadeira.",
              },
              {
                text: "Eles são exatamente iguais",
                feedback: "Eles param por motivos diferentes, então não são iguais.",
              },
              {
                text: "Um laço infinito precisa de sensor e um repetir-até não",
                feedback: "Qualquer um dos dois pode usar sensor; a diferença é como eles param.",
              },
            ],
            explanation: "Um laço infinito só para quando você para o programa; um laço repetir-até para sozinho assim que a condição dele vira verdadeira.",
          },
          {
            prompt: "Uma condição tipo \"a parede está perto?\" só pode ser:",
            options: [
              {
                text: "Um número em centímetros",
                feedback: "O sensor dá um número, mas a condição transforma isso numa resposta de sim ou não.",
              },
              {
                text: "Verdadeira ou falsa (um booleano)",
                feedback: "Isso mesmo: uma condição sempre responde verdadeiro ou falso, e isso se chama booleano.",
              },
              {
                text: "Uma cor",
                feedback: "Uma condição é uma verificação de sim ou não, não uma cor.",
              },
              {
                text: "Uma velocidade de motor",
                feedback: "Velocidade é uma saída; uma condição é uma verificação de verdadeiro ou falso.",
              },
            ],
            explanation: "Uma condição é uma verificação que é sempre verdadeira ou falsa, e um valor de verdadeiro ou falso se chama booleano.",
          },
          {
            prompt: "O que um bloco se/senão faz?",
            options: [
              {
                text: "Roda um conjunto de passos quando a condição é verdadeira e outro quando ela é falsa",
                feedback: "Correto: o se/senão escolhe entre duas ações com base na condição.",
              },
              {
                text: "Repete um passo dez vezes",
                feedback: "Isso é um laço de repetição, não um se/senão.",
              },
              {
                text: "Roda sempre os dois conjuntos de passos",
                feedback: "O se/senão roda só um ramo: o verdadeiro ou o falso, nunca os dois.",
              },
              {
                text: "Lê um sensor",
                feedback: "Quem faz isso é um bloco de ler sensor; o se/senão decide o que fazer com a leitura.",
              },
            ],
            explanation: "Um bloco se/senão escolhe entre duas ações: os passos do \"se\" quando a condição é verdadeira, e os do \"senão\" quando ela é falsa.",
          },
          {
            prompt: "Como funciona o desvio de obstáculos?",
            options: [
              {
                text: "O robô percorre um trajeto fixo que alguém mandou uma vez só",
                feedback: "Isso é uma sequência simples, sem reação; o desvio de obstáculos usa o sensor ao vivo.",
              },
              {
                text: "Um laço lê o sensor de distância e, se algo estiver perto, o robô vira; senão, ele anda para a frente",
                feedback: "Isso mesmo: repetir em laço, ler o sensor e usar se/senão para virar quando está perto e andar quando está livre.",
              },
              {
                text: "O robô espera uma pessoa pilotá-lo em volta de cada obstáculo",
                feedback: "Isso seria controle remoto, e não reagir sozinho.",
              },
              {
                text: "O robô se desliga quando vê um obstáculo",
                feedback: "Ele se afasta e continua; não se desliga.",
              },
            ],
            explanation: "O desvio de obstáculos é um laço que lê o sensor de distância e usa se/senão para virar quando algo está perto e andar para a frente quando o caminho está livre.",
          },
        ],
      },
      reflection: [
        {
          prompt: "Que decisão o seu robô toma repetidas vezes, e que informação ele usa para isso?",
        },
        {
          prompt: "Por que um robô que reage precisa de um laço em volta da verificação do sensor, em vez de conferir uma vez só?",
        },
        {
          prompt: "Descreva um robô de verdade que reage ao mundo e diga qual condição ele verifica.",
        },
      ],
      journalPrompts: [
        {
          prompt: "Desenhe o seu programa de desvio de obstáculos como um laço com um ler sensor e um se/senão dentro.",
        },
        {
          prompt: "Escreva a única regra de seguimento de linha que o seu robô segue, no formato \"se... então... senão...\".",
        },
        {
          prompt: "Registre em quantas das suas três tentativas com obstáculos o robô conseguiu desviar.",
        },
      ],
      savedPrograms: [
        {
          title: "Programa de desvio de obstáculos",
          description: "Um laço infinito que lê o sensor de distância e usa se/senão para virar quando algo está perto e andar para a frente quando o caminho está livre.",
        },
        {
          title: "Programa de seguimento de linha",
          description: "Um laço repetir-até que lê o sensor de luz ou de cor a cada passo e usa um se para voltar para cima da linha, parando na marca final.",
        },
      ],
      simulatorMissions: [
        {
          title: "Pista de obstáculos",
          objective: "Programe o robô para repetir em laço, ler o sensor de distância e usar se/senão para contornar as paredes e chegar ao objetivo sozinho.",
          successCriteria: [
            "O robô desvia de todas as paredes sem ninguém pilotando",
            "O programa usa um laço com uma leitura de sensor e um se/senão dentro",
            "O robô chega à casa do objetivo",
          ],
        },
        {
          title: "Seguir a linha",
          objective: "Use um laço repetir-até e um sensor de luz ou cor para manter o robô na linha marcada até ele chegar à casa final.",
          successCriteria: [
            "O robô fica na linha marcada na maior parte do caminho",
            "O programa lê o sensor de luz ou cor a cada volta do laço",
            "O robô para no fim da linha",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Laços e condições",
          focus: "Laços, laços infinitos, repetir-até, condições, booleanos, se e se/senão.",
        },
        {
          title: "Programa de desvio de obstáculos",
          focus: "Repetir em laço, ler o sensor de distância e usar se/senão para virar quando está perto.",
        },
        {
          title: "Preveja a reação diante da parede",
          focus: "Prever o que o robô faz quando encontra uma parede, e depois conferir.",
        },
        {
          title: "Teste de confiabilidade da reação",
          focus: "Fazer três tentativas e registrar se o robô desviou do obstáculo.",
        },
        {
          title: "Exploração do seguimento de linha",
          focus: "Usar um sensor de luz ou cor com repetir-até e se para continuar em cima de uma linha.",
        },
        {
          title: "Verificação de aprendizagem",
          focus: "Cinco perguntas sobre laços, condições e como os robôs reagem.",
        },
        {
          title: "Reflexão",
          focus: "Escrever sobre a diferença entre se e se/senão, e por que reagir precisa de um laço.",
        },
      ],
      safetyNotes: [
        {
          text: "Mantenha dedos, cabelo e roupas soltas longe das rodas em movimento enquanto um robô que reage anda, já que ele muda de direção sozinho.",
        },
        {
          text: "Cole as linhas de fita e as peças da pista de obstáculos bem lisas no chão e deixe o piso livre, para ninguém tropeçar durante as rodadas.",
        },
        {
          text: "Salve o seu programa de blocos com frequência para que atualizar o navegador não apague o seu trabalho.",
        },
      ],
      printableResources: [
        {
          title: "Folha de planejamento do programa de blocos",
          description: "Uma página para planejar um laço com um ler sensor e um se/senão antes de montá-lo.",
        },
        {
          title: "Cartões de decisão se/senão",
          description: "Cartões para imprimir de para sempre, ler sensor, se e se/senão, para as atividades sem eletrônicos de obstáculos e de linha.",
        },
        {
          title: "Registro de testes de reação",
          description: "Uma tabela para registrar três tentativas de desvio de obstáculos e se o robô conseguiu desviar.",
        },
        {
          title: "Guia do professor da semana 5",
          description: "Preparação, condução da aula, ideias equivocadas e perguntas para a aula de robôs que reagem.",
        },
      ],
      completion: {
        summary: "Termine a semana 5 programando um comportamento de desvio de obstáculos, explorando o seguimento de linha, registrando três tentativas de reação e passando na verificação de aprendizagem.",
        requirements: [
          {
            label: "Montar um programa de desvio de obstáculos com um laço, uma leitura de sensor e um se/senão",
          },
          {
            label: "Explorar o seguimento de linha com um sensor de luz ou cor e um laço",
          },
          {
            label: "Fazer três tentativas de reação e registrar os resultados",
          },
          {
            label: "Acertar pelo menos 4 de 5 na verificação de aprendizagem",
          },
          {
            label: "Escrever a sua reflexão",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprima a folha de planejamento, os cartões de decisão se/senão e o registro de testes de reação para cada estudante ou dupla.",
          "Para os kits: carregue-os, monte um sensor de distância e um de luz ou cor, e prepare uma pistinha de obstáculos e uma linha de fita.",
          "Para o simulador, abra as missões de pista de obstáculos e de seguimento de linha em cada aparelho.",
        ],
        prep: [
          "Programe você mesmo o padrão de desvio de obstáculos primeiro, para conhecer um valor de proximidade que funcione com o seu sensor.",
          "Confira as leituras do sensor de luz ou cor em cima da linha e fora dela, com a fita e o chão que você vai usar de verdade.",
          "Recorte com antecedência os cartões de para sempre, se e se/senão do caminho sem eletrônicos.",
        ],
        facilitation: [
          "Ensine laços, a diferença entre infinito e repetir-até, e condições (verdadeiro ou falso) antes de qualquer programação, apoiando-se no ciclo de perceber, decidir e agir da semana 1.",
          "Montem juntos o padrão de desvio de obstáculos (para sempre, ler sensor, se/senão) e depois deixe as duplas adaptarem.",
          "Faça a previsão e o teste de reação de três tentativas, para os estudantes verem que reagir tem a ver com confiabilidade, e não com uma rodada de sorte.",
          "Explore o seguimento de linha como um comportamento de conferir e corrigir sem parar; espere serpenteio, e não linhas perfeitamente retas.",
          "Encerre com a verificação de aprendizagem e a reflexão.",
        ],
        commonMisconceptions: [
          "\"O robô só precisa conferir uma vez\": sem um laço, ele reage uma única vez e depois para de responder.",
          "\"O se/senão roda os dois ramos\": ele roda só o ramo verdadeiro ou só o falso.",
          "\"Uma curva maior segue melhor a linha\": correções grandes passam do ponto; as pequenas e frequentes é que funcionam.",
          "Confundir o número do sensor com a condição: o sensor dá um número, a condição transforma isso em verdadeiro ou falso.",
        ],
        questionsToAsk: [
          "Onde está o laço, e o que faz ele parar?",
          "Qual é a condição aqui, e quando ela é verdadeira?",
          "O que o robô faz no \"senão\", e por que ele precisa de um?",
          "Como o robô percebe que saiu da linha?",
        ],
        easierVersion: "Dê aos estudantes um programa quase pronto com o se/senão vazio, para eles só preencherem \"virar\" e \"andar para a frente\".",
        harderVersion: "Peça que os estudantes combinem os dois comportamentos (seguir uma linha, mas desviar de um obstáculo colocado em cima dela) usando se/senão aninhados.",
      },
      nextWeek: {
        teaser: "Semana que vem o seu robô que reage nem sempre vai se comportar, então vamos aprender a depurar e a fazer com que ele funcione de forma confiável todas as vezes.",
        prepare: [
          "Salve os seus programas de desvio de obstáculos e de seguimento de linha; semana que vem a gente vai quebrar e consertar versões deles.",
          "Repare numa vez em que o seu robô reagiu errado hoje: esse é um bug para levar para a semana 6.",
          "Carregue o seu kit ou salve o simulador nos favoritos.",
        ],
      },
    },
    {
      title: "Depuração e confiabilidade",
      subtitle: "Descubra por que um robô se comporta mal (mecânica, programação ou sensor) e prove que ele funciona de novo e de novo.",
      summary: "Os estudantes pegam os robôs reativos que montaram e os tornam confiáveis. Eles aprendem que depurar é o trabalho de descobrir por que o resultado real é diferente do resultado esperado, e que os bugs vêm em três famílias: mecânicos (alguma coisa física), de programação (uma instrução errada ou faltando) e de sensor (uma leitura, um limiar ou uma calibração ruins). Eles praticam com missões de depuração preparadas de propósito, conhecem variáveis e contadores para guardar e acompanhar valores, e fazem ensaios de confiabilidade (a mesma tarefa três vezes) registrando o esperado x o real para provar que o robô funciona mesmo.",
      mainMission: "Diagnosticar e corrigir bugs mecânicos, de programação e de sensor, e depois provar que um robô é confiável com um teste de três rodadas.",
      estimatedTime: "70 a 85 minutos",
      learningGoals: [
        {
          text: "Explicar a depuração como descobrir por que o resultado real difere do resultado esperado",
        },
        {
          text: "Diferenciar bugs mecânicos, de programação e de sensor pelos sintomas deles",
        },
        {
          text: "Usar uma variável ou um contador para guardar ou acompanhar um valor num programa",
        },
        {
          text: "Fazer um ensaio de confiabilidade: repetir a mesma tarefa três vezes e registrar o esperado x o real",
        },
        {
          text: "Diagnosticar um robô que se comporta mal e descrever a solução",
        },
      ],
      vocabulary: [
        {
          term: "Depuração",
          definition: "O trabalho de descobrir por que o resultado real de um robô é diferente do resultado esperado, e depois consertar isso.",
        },
        {
          term: "Variável",
          definition: "Um lugar com nome dentro de um programa, que guarda um valor capaz de mudar enquanto o programa roda.",
        },
        {
          term: "Contador",
          definition: "Uma variável usada para contar: ela começa num número e sobe de um em um cada vez que alguma coisa acontece.",
        },
        {
          term: "Valor guardado",
          definition: "Um número ou um dado que um programa mantém numa variável para poder usar ou mudar depois.",
        },
        {
          term: "Valor de calibração",
          definition: "Um número que você mede e salva para as leituras de um sensor significarem a coisa certa, como o nível de luz de um chão branco.",
        },
        {
          term: "Resultado esperado",
          definition: "O que DEVERIA acontecer quando o programa roda direito, ou seja, o que você prevê antes de testar.",
        },
        {
          term: "Resultado real",
          definition: "O que ACONTECEU quando você de fato rodou o robô, e que você observa e anota.",
        },
        {
          term: "Caso de teste",
          definition: "Uma situação específica que você monta de propósito para testar, tipo \"uma parede a exatamente 15 cm\".",
        },
        {
          term: "Bug mecânico",
          definition: "Um problema físico no corpo do robô, como uma roda frouxa, um fio se arrastando ou uma engrenagem travada.",
        },
        {
          term: "Bug de programação",
          definition: "Um erro nas instruções: um bloco ou número errado, faltando ou fora de ordem.",
        },
        {
          term: "Bug de sensor",
          definition: "Um problema na percepção: uma leitura ruim, um limiar errado, ou um sensor que precisa ser calibrado.",
        },
        {
          term: "Confiabilidade",
          definition: "O quanto um robô faz o mesmo trabalho corretamente de novo e de novo, comprovado por ensaios repetidos.",
        },
      ],
      prerequisites: [
        {
          reason: "Você vai depurar os robôs reativos que montou na semana 5, que usam laços de repetição e condições.",
        },
        {
          reason: "Bugs de sensor, limiares e calibração se apoiam todos nos sensores apresentados na semana 4.",
        },
      ],
      concepts: [
        {
          title: "O que depurar é de verdade",
          body: [
            "Toda vez que você roda um programa, tem dois resultados na cabeça: o esperado (o que DEVERIA acontecer) e o real (o que ACONTECEU). Quando eles batem, o robô está funcionando. Quando não batem, existe um bug, e depurar é o trabalho de detetive de descobrir por que eles diferem.",
            "Quem depura bem não fica cutucando o robô a esmo: compara o esperado com o real, olha o sintoma de perto e muda uma coisa de cada vez, para conseguir saber o que resolveu.",
          ],
          examples: [
            "Esperado: parar diante da parede. Real: bateu na parede. -> Tem um bug para achar.",
            "Esperado: virar à esquerda. Real: virou à direita. -> Compare o bloco com o que você queria dizer.",
          ],
        },
        {
          title: "As três famílias de bugs",
          body: [
            "Os bugs vêm em três famílias, e nomear a família já é meio caminho andado. Um bug mecânico é um problema físico no corpo do robô: uma roda frouxa, um fio se arrastando pelo chão, uma engrenagem que patina. Um bug de programação é um erro nas instruções: um número errado, um bloco faltando, ou blocos fora de ordem. Um bug de sensor é um problema de percepção: uma leitura ruim, um limiar ajustado no valor errado, ou um sensor que precisa de calibração.",
            "O truque é ler o sintoma e chutar a família primeiro. Se o robô erra exatamente do mesmo jeito toda santa vez, o bug costuma estar no programa. Se funciona às vezes e às vezes não, desconfie de alguma coisa mecânica ou de uma leitura de sensor instável.",
          ],
          examples: [
            "Mecânico: o robô puxa para um lado porque uma roda está frouxa.",
            "Programação: o robô vira por 2 segundos em vez de 1 porque o número está errado.",
            "Sensor: o robô nunca para porque o limiar de distância está pequeno demais.",
          ],
        },
        {
          title: "Variáveis e contadores: guardar e acompanhar valores",
          body: [
            "Às vezes um programa precisa lembrar de um número. Uma variável é uma caixinha com nome que guarda um valor, e esse valor pode mudar enquanto o programa roda. Um contador é uma variável especial usada para contar: ela começa em zero e sobe de um em um cada vez que alguma coisa acontece, tipo toda vez que o robô desvia de um obstáculo.",
            "As variáveis também guardam valores de calibração: números que você mede uma vez e armazena para as leituras de um sensor significarem a coisa certa. Guardar um valor quer dizer que depois você pode usá-lo, mudá-lo e conferi-lo, em vez de ficar chutando.",
          ],
          examples: [
            "Um contador que soma 1 a cada obstáculo desviado.",
            "Um valor de calibração guardado para o nível de luz do chão branco.",
            "Uma variável que lembra quantas voltas o laço já deu.",
          ],
        },
        {
          title: "Confiabilidade: provar com ensaios repetidos",
          body: [
            "Um robô que funciona uma vez pode só ter dado sorte. Confiabilidade quer dizer fazer o mesmo trabalho corretamente de novo e de novo, e você não pode afirmar isso sem prova. A prova é um ensaio de confiabilidade: você roda a mesma tarefa várias vezes, com o mesmo caso de teste em cada rodada, e anota o resultado esperado e o resultado real de cada uma.",
            "Se as três rodadas baterem com o que você esperava, o robô é confiável para aquele caso de teste. Se uma rodada sair diferente, você achou um bug que estava escondido à vista de todos, e aquela rodada que falhou é justamente a pista de que você precisa.",
          ],
          examples: [
            "Rode a tarefa de parar diante da parede 3 vezes a partir da mesma largada e anote cada uma.",
            "Esperado \"para\" nas três rodadas; real \"para, para, bate\" quer dizer que a rodada 3 tem um bug.",
          ],
        },
      ],
      materials: [
        {
          name: "Registro de teste de três rodadas (para imprimir)",
        },
        {
          name: "Folha de atividade Detetive de Bugs, com as três famílias (para imprimir)",
        },
        {
          name: "Lápis e papel para anotar os resultados",
        },
        {
          name: "Um robô reativo montado na semana 5, com pelo menos um sensor",
        },
        {
          name: "Fita métrica ou régua para montar o mesmo caso de teste em cada rodada",
        },
        {
          name: "Computador ou tablet com o simulador no navegador",
        },
        {
          name: "O robô de papelão, os cartões de programa e a pista de chão com fita, das semanas anteriores",
        },
        {
          name: "Post-its ou uma folha de marcação para funcionar como contador",
        },
      ],
      activities: [
        {
          title: "Missões de Detetive de Bugs",
          goal: "Diagnosticar um robô que se comporta mal: decidir se o bug é mecânico, de programação ou de sensor, e depois consertá-lo.",
          shared: [
            "Em cada missão, escreva primeiro o resultado esperado e o resultado real. A diferença entre os dois é o sintoma que você está investigando.",
            "Faça a pergunta das três famílias: isso é físico (mecânico), é de instrução (programação), ou é um problema de percepção (sensor)? Use o sintoma para chutar antes de mexer em qualquer coisa.",
            "Mude UMA coisa de cada vez, rode de novo e anote se o resultado real agora bate com o esperado.",
          ],
          variants: {
            kit: {
              title: "Depure um robô de kit que se comporta mal",
              materials: [
                "Um robô reativo da semana 5",
                "Folha de atividade Detetive de Bugs",
                "Fita métrica",
              ],
              instructions: [
                "Peça a um adulto ou colega que coloque em segredo um bug num robô que já funcionava (afrouxar uma roda, mudar um número num bloco, ou ajustar um limiar ruim).",
                "Rode o robô e escreva na folha o resultado esperado e o resultado real.",
                "Decida a família do bug a partir do sintoma, e depois investigue as causas prováveis em ordem.",
                "Conserte a única coisa de que você desconfia, rode de novo e confirme que o resultado real agora bate com o esperado.",
              ],
              safetyNotes: [
                "Desligue o robô antes de apertar rodas ou mexer em fios.",
                "Mantenha os dedos longe das partes em movimento enquanto ele funciona.",
              ],
              expectedResult: "O estudante nomeia a família certa do bug, faz um único conserto direcionado, e o resultado real do robô volta a bater com o esperado.",
              successCriteria: [
                "O resultado esperado e o real foram os dois anotados",
                "A família do bug foi identificada corretamente",
                "Foi feita uma mudança de cada vez",
                "O robô funciona depois do conserto",
              ],
              troubleshooting: [
                {
                  problem: "Consertar \"tudo\" de uma vez, então ninguém sabe qual era a causa",
                  fix: "Desfaça todas as mudanças menos uma; faça uma única mudança, rode de novo e veja se era aquilo.",
                },
                {
                  problem: "Não dá para decidir a família do bug",
                  fix: "Rode três vezes: o mesmo resultado errado toda vez aponta para a programação; resultados diferentes apontam para algo mecânico ou um sensor instável.",
                },
              ],
              extension: "Coloque um bug no robô de um colega e veja se ele consegue diagnosticar a família só pelo sintoma.",
            },
            simulator: {
              title: "Depure um programa quebrado no simulador",
              materials: [
                "Simulador no navegador",
                "Folha de atividade Detetive de Bugs",
              ],
              instructions: [
                "Abra uma missão do simulador que venha com um programa quebrado de propósito (um número errado, um bloco faltando, ou um limiar de sensor ruim).",
                "Preveja o resultado esperado, rode e registre o resultado real.",
                "Como no simulador não existe roda frouxa, decida pelo sintoma se é um bug de programação ou de limiar de sensor.",
                "Mude um bloco ou um número, rode de novo a partir da mesma largada e confirme que os resultados agora batem.",
              ],
              safetyNotes: [
                "Não há riscos físicos; dê uma pausa na tela se precisar.",
              ],
              expectedResult: "O estudante identifica um bug de programação ou de sensor, conserta um único bloco ou valor, e o robô cumpre a missão como esperado.",
              successCriteria: [
                "O resultado esperado e o real foram os dois registrados",
                "A família do bug foi identificada corretamente",
                "Só um bloco ou número foi mudado por tentativa",
                "A missão dá certo depois do conserto",
              ],
              troubleshooting: [
                {
                  problem: "O laço nunca acaba",
                  fix: "Isso é sintoma de programação: confira se a condição do repetir-até realmente consegue virar verdadeira.",
                },
                {
                  problem: "O robô ignora a parede",
                  fix: "Leia o valor do sensor no simulador e confira se o limiar está do lado certo dele: é um bug de sensor.",
                },
              ],
              extension: "Quebre você mesmo um programa que funciona e depois desafie um colega a achar e nomear o bug.",
            },
            unplugged: {
              title: "Depure um programa de cartões encenado na pista do chão",
              materials: [
                "Robô de papelão",
                "Cartões de programa",
                "Pista de chão com fita",
                "Folha de atividade Detetive de Bugs",
              ],
              instructions: [
                "Peça a um colega que enfie um bug num programa de cartões que funciona (trocar dois cartões de lugar, mudar um \"ande 2\" para \"ande 4\", ou escrever uma regra \"se\" errada) ou que entorte o para-choque de papel do robô.",
                "Escreva o resultado esperado, depois \"rode\" o programa movendo o modelo cartão por cartão e anote o resultado real.",
                "Decida a família: um para-choque entortado é mecânico, um cartão trocado ou errado é de programação, e uma regra \"se\" errada é um bug de sensor.",
                "Conserte um cartão ou uma peça, rode de novo e confirme que os resultados batem.",
              ],
              safetyNotes: [
                "Use tesoura sem ponta com um adulto se for refazer um para-choque.",
              ],
              expectedResult: "O estudante nomeia a família certa do bug, conserta um cartão ou uma peça, e a rodada encenada bate com o resultado esperado.",
              successCriteria: [
                "O resultado esperado e o real foram os dois anotados",
                "A família do bug foi identificada corretamente",
                "Um cartão ou uma peça mudada de cada vez",
                "A rodada funciona depois do conserto",
              ],
              troubleshooting: [
                {
                  problem: "O \"robô\" é executado de um jeito diferente a cada vez",
                  fix: "Faça de cada cartão uma instrução exata, para o resultado real ser repetível: é assim que se enxerga o bug de verdade.",
                },
                {
                  problem: "Não dá para saber se é um cartão ou o para-choque",
                  fix: "Leia os cartões em voz alta exatamente como estão escritos; se estiverem certos, o bug é mecânico.",
                },
              ],
              extension: "Crie uma missão em que dois bugs de famílias diferentes fiquem escondidos ao mesmo tempo.",
            },
          },
        },
        {
          title: "Ensaio de confiabilidade de três rodadas",
          goal: "Provar que um robô é confiável rodando a mesma tarefa três vezes e comparando o resultado esperado com o real a cada rodada.",
          shared: [
            "Escolha uma tarefa bem definida e um caso de teste (exatamente a mesma montagem em toda rodada). Escreva o resultado esperado uma vez só: ele é o mesmo para as três rodadas.",
            "Rode a tarefa três vezes SEM mudar nada entre uma rodada e outra. Anote o resultado real e marque Bateu? (sim ou não) em cada uma.",
            "Três acertos querem dizer confiável para esse caso de teste. Qualquer diferença é um bug para caçar com os passos do Detetive de Bugs.",
          ],
          variants: {
            kit: {
              title: "Ensaio de confiabilidade no robô de kit",
              materials: [
                "Um robô reativo da semana 5",
                "Registro de teste de três rodadas",
                "Fita métrica",
              ],
              instructions: [
                "Escolha uma tarefa como \"parar antes da parede\" e coloque a parede na mesma distância em toda rodada: esse é o seu caso de teste.",
                "Escreva o resultado esperado: \"o robô para sem encostar na parede\".",
                "Rode três vezes exatamente a partir da mesma largada, anotando o resultado real e o Bateu? a cada vez.",
                "Se alguma rodada não bater, diagnostique a família do bug e conserte, e depois refaça as três rodadas.",
              ],
              safetyNotes: [
                "Mantenha a área de teste livre e fique longe das partes em movimento.",
                "Volte o robô para a mesma linha de largada a cada rodada.",
              ],
              expectedResult: "Uma tabela de três rodadas preenchida; um robô confiável bate com o resultado esperado nas três.",
              successCriteria: [
                "O mesmo caso de teste é usado nas três rodadas",
                "O resultado esperado foi escrito uma vez só",
                "Três resultados reais e o Bateu? foram registrados",
                "Qualquer diferença é investigada",
              ],
              troubleshooting: [
                {
                  problem: "Os resultados vão mudando ao longo das três rodadas",
                  fix: "Confira as pilhas e a posição de largada: uma bateria acabando é uma causa mecânica ou de energia da falta de confiabilidade.",
                },
                {
                  problem: "Bate duas vezes e depois falha",
                  fix: "A rodada que falhou é a sua pista: examine a leitura do sensor e a montagem física logo depois dessa rodada.",
                },
              ],
              extension: "Acrescente uma quarta e uma quinta rodada e veja se a confiabilidade se mantém conforme a bateria vai descarregando.",
            },
            simulator: {
              title: "Ensaio de confiabilidade no simulador",
              materials: [
                "Simulador no navegador",
                "Registro de teste de três rodadas",
              ],
              instructions: [
                "Escolha uma missão e use a mesma casa de largada e o mesmo mapa em toda rodada: esse é o seu caso de teste.",
                "Escreva o resultado esperado antes de rodar.",
                "Rode o programa três vezes sem mudá-lo, anotando o resultado real e o Bateu? de cada rodada.",
                "Se alguma rodada sair diferente, ache o bug de programação ou de sensor e refaça as três rodadas.",
              ],
              safetyNotes: [
                "Salve o seu trabalho com frequência para uma atualização da página não apagar o registro.",
              ],
              expectedResult: "Uma tabela de três rodadas preenchida, mostrando se o robô do simulador se comporta do mesmo jeito em cada rodada.",
              successCriteria: [
                "A mesma largada e o mesmo mapa nas três rodadas",
                "O resultado esperado foi escrito uma vez só",
                "Três resultados reais e o Bateu? foram registrados",
                "Qualquer diferença é investigada",
              ],
              troubleshooting: [
                {
                  problem: "As rodadas saem diferentes mesmo sem nada ter mudado",
                  fix: "Confira se a casa de largada é mesmo idêntica e se o laço termina por uma condição bem definida, e não por sorte.",
                },
                {
                  problem: "Toda rodada bate perfeitamente e parece fácil demais",
                  fix: "Tente um caso de teste mais difícil (parede mais perto, curva mais fechada) para ver onde a confiabilidade quebra.",
                },
              ],
              extension: "Troque o caso de teste por um mais difícil e faça mais três ensaios para achar o limite.",
            },
            unplugged: {
              title: "Ensaio de confiabilidade com o programa de cartões",
              materials: [
                "Robô de papelão",
                "Cartões de programa",
                "Pista de chão com fita",
                "Registro de teste de três rodadas",
              ],
              instructions: [
                "Escolha uma tarefa e um ponto de largada fixo na pista do chão: o mesmo caso de teste em toda rodada.",
                "Escreva o resultado esperado, tipo \"o modelo termina na casa de chegada\".",
                "Peça ao mesmo colega que \"rode\" exatamente os mesmos cartões três vezes, anotando o resultado real e o Bateu? em cada rodada.",
                "Se duas rodadas discordarem, os passos estão ambíguos ou tem um cartão errado: conserte e refaça as três rodadas.",
              ],
              safetyNotes: [
                "Mantenha a pista do chão livre para ninguém tropeçar.",
              ],
              expectedResult: "Uma tabela de três rodadas preenchida; um programa de cartões confiável deixa o modelo no mesmo lugar nas três.",
              successCriteria: [
                "A mesma largada e os mesmos cartões nas três rodadas",
                "O resultado esperado foi escrito uma vez só",
                "Três resultados reais e o Bateu? foram registrados",
                "Qualquer diferença é investigada",
              ],
              troubleshooting: [
                {
                  problem: "Pessoas diferentes terminam em lugares diferentes",
                  fix: "Reescreva os cartões como passos exatos e sem ambiguidade, para o resultado real ser repetível.",
                },
                {
                  problem: "A mesma pessoa termina em lugares diferentes",
                  fix: "Marque o ponto de largada e o tamanho dos passos, para o caso de teste ser mesmo idêntico em toda rodada.",
                },
              ],
              extension: "Troquem programas de cartões com outra equipe e façam um ensaio de confiabilidade de três rodadas com o deles.",
            },
          },
        },
        {
          title: "Contador de obstáculos",
          goal: "Usar uma variável como contador que soma um a cada obstáculo desviado pelo robô, e depois ler o valor guardado.",
          shared: [
            "Coloque uma variável contador em 0 no começo. Cada vez que o robô perceber e desviar de um obstáculo, some 1 ao contador.",
            "Isso é um valor guardado: o contador lembra quantos obstáculos foram enfrentados, e você pode conferir no final.",
            "Preveja quantos obstáculos existem na pista, e depois compare a sua previsão com o valor final do contador.",
          ],
          variants: {
            kit: {
              title: "Conte os obstáculos desviados no robô de kit",
              materials: [
                "Um robô reativo da semana 5",
                "Uma pista curta de obstáculos",
                "Lápis e papel",
              ],
              instructions: [
                "Coloque em 0 uma variável chamada \"obstáculos\" no começo do programa.",
                "Mantenha um laço que lê o sensor; dentro do ramo \"se tem obstáculo\", vire para desviar E some 1 a \"obstáculos\".",
                "Percorra a pista e depois mostre ou leia o valor final do contador.",
                "Compare o contador com quantos obstáculos você realmente colocou.",
              ],
              safetyNotes: [
                "Mantenha a pista livre de mãos e pés enquanto o robô anda.",
              ],
              expectedResult: "O valor final do contador é igual ao número de obstáculos de que o robô realmente desviou.",
              successCriteria: [
                "O contador começa em 0",
                "Ele soma 1 só quando um obstáculo é desviado",
                "O valor guardado final é lido",
                "Ele é comparado com a contagem real",
              ],
              troubleshooting: [
                {
                  problem: "O contador está alto demais",
                  fix: "O robô está somando 1 mais de uma vez por obstáculo: garanta que a contagem aconteça uma vez por detecção, e não a cada volta do laço.",
                },
                {
                  problem: "O contador fica em 0",
                  fix: "Confira se o passo de somar 1 está dentro do ramo \"se tem obstáculo\", e não fora dele: é um bug de programação.",
                },
              ],
              extension: "Acrescente uma regra: quando o contador chegar a 3, o robô para e avisa que terminou.",
            },
            simulator: {
              title: "Conte os obstáculos desviados no simulador",
              materials: [
                "Simulador no navegador",
                "Lápis e papel",
              ],
              instructions: [
                "Use um bloco de definir variável para colocar \"obstáculos\" em 0 no começo.",
                "Dentro de um laço, leia o sensor; quando ele detectar um obstáculo, vire para desviar e some 1 a \"obstáculos\".",
                "Rode a missão da grade e leia o contador no final.",
                "Compare o contador com o número de obstáculos que há na grade.",
              ],
              safetyNotes: [
                "Não há riscos físicos.",
              ],
              expectedResult: "O contador é igual ao número de obstáculos de que o robô do simulador desviou na grade.",
              successCriteria: [
                "Um bloco de definir variável começa o contador em 0",
                "Ele soma 1 por obstáculo desviado",
                "O valor final é lido",
                "Ele bate com a contagem de obstáculos da grade",
              ],
              troubleshooting: [
                {
                  problem: "O contador conta demais",
                  fix: "O somar 1 dispara a cada volta do laço enquanto encosta num mesmo obstáculo; conte só uma vez por nova detecção.",
                },
                {
                  problem: "O contador nunca muda",
                  fix: "Confirme que o bloco de somar 1 está dentro da condição do sensor, e não no laço puro e simples.",
                },
              ],
              extension: "Guarde uma segunda variável para \"curvas feitas\" e compare com o contador de obstáculos.",
            },
            unplugged: {
              title: "Conte os obstáculos desviados com uma contagem de riscos",
              materials: [
                "Robô de papelão",
                "Cartões de programa",
                "Obstáculos na pista do chão",
                "Folha de contagem ou post-its",
              ],
              instructions: [
                "Escreva \"contador = 0\" no topo dos seus cartões de programa e use uma folha de contagem como valor guardado.",
                "Enquanto você \"roda\" o modelo, cada vez que o cartão \"se o para-choque encostar num obstáculo, vire\" disparar, faça um risquinho.",
                "No final, conte os riscos: esse é o valor guardado do contador.",
                "Compare a contagem com quantos obstáculos você colocou.",
              ],
              safetyNotes: [
                "Mantenha a pista do chão livre para ninguém tropeçar nos obstáculos.",
              ],
              expectedResult: "A contagem de riscos bate com o número de obstáculos de que o modelo desviou.",
              successCriteria: [
                "O contador começa em 0",
                "Um risco é acrescentado por obstáculo desviado",
                "A contagem final é lida como o valor guardado",
                "Ela bate com a contagem real",
              ],
              troubleshooting: [
                {
                  problem: "Riscos demais",
                  fix: "Só faça um risco quando o cartão \"vire para desviar\" realmente disparar, e não a cada passo.",
                },
                {
                  problem: "Esqueceram de zerar o contador",
                  fix: "Comece sempre uma rodada nova colocando o contador de volta em 0: o valor guardado precisa começar do zero.",
                },
              ],
              extension: "Acrescente um cartão de regra: \"se contador = 3, pare\" e teste que o valor guardado consegue disparar uma ação.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes do seu ensaio de confiabilidade de três rodadas, preveja qual rodada (se alguma) não vai bater com o resultado esperado, e por quê.",
          howToCheck: "Faça as três rodadas, registre o real x o esperado e o Bateu?, e compare a sua previsão com o que aconteceu de verdade.",
        },
        {
          prompt: "Olhe o sintoma do Detetive de Bugs antes de encostar no robô: preveja a que família o bug pertence, se mecânica, de programação ou de sensor.",
          howToCheck: "Investigue as causas prováveis e veja se a família que você previu foi a que resolveu.",
        },
        {
          prompt: "Para o contador de obstáculos, preveja o valor guardado final antes de percorrer a pista.",
          howToCheck: "Percorra a pista, leia o contador e compare com o número que você previu e com a contagem real de obstáculos.",
        },
      ],
      testRecords: [
        {
          title: "Teste de confiabilidade de três rodadas",
          instructions: "Escolha uma tarefa e um caso de teste. Escreva o resultado esperado uma vez só, e depois rode a mesma tarefa três vezes sem mudar nada. Anote o resultado real e se ele bateu em cada rodada.",
          columns: [
            null,
            "Resultado esperado",
            "Resultado real",
            "Bateu? (S/N)",
          ],
          measure: "Se o resultado real bateu com o esperado em cada uma das três rodadas",
        },
        {
          title: "Registro de diagnóstico de bugs",
          instructions: "Em cada missão de depuração, registre o sintoma, a família de bug de que você desconfia, a única mudança que você tentou, e se isso corrigiu a diferença.",
          columns: [
            "Sintoma",
            "Família suspeita",
            "Única mudança tentada",
            "Consertou? (S/N)",
          ],
          measure: "Qual família de bug era a responsável e se uma única mudança direcionada resolveu",
        },
      ],
      debuggingMissions: [
        {
          title: "O robô que gira no lugar",
          scenario: "Um robô que deveria andar reto para a frente fica girando no mesmo lugar, rodopiando como se uma roda fosse para a frente e a outra para trás.",
          symptom: "Os dois motores funcionam, mas o robô gira em vez de andar para a frente, e gira do mesmo jeito em toda rodada.",
          hint: "Olhe as rodas: as duas estão girando, mas em sentidos opostos, e nada está frouxo. Pense em como um dos motores está ligado ou configurado, e não nos comandos de andar.",
          likelyCauses: [
            "Um motor está ligado ao contrário, então a roda dele gira no sentido errado.",
            "A configuração de direção de um motor está invertida em relação à do outro.",
            "Os dois motores estão montados em espelho, mas são acionados como se apontassem para o mesmo lado.",
          ],
          fix: "Troque a ligação do motor invertido (ou inverta a configuração de direção só daquele motor) para as duas rodas irem para a frente juntas. Rode de novo e confirme que o robô agora anda reto em vez de girar.",
        },
        {
          title: "A parede diante da qual ele não para",
          scenario: "Um robô deveria andar para a frente e parar quando o sensor de distância dissesse que a parede está perto, mas ele entra direto na parede e continua empurrando sem nunca parar.",
          symptom: "Em toda rodada o robô nunca para: o resultado real é uma batida, mesmo havendo uma instrução de parar no programa.",
          hint: "O sensor lê direitinho e o bloco de parar está lá. Leia em voz alta a comparação que está dentro do laço: conforme a parede se aproxima, a condição que deveria parar o robô chega a virar verdadeira em algum momento?",
          likelyCauses: [
            "A comparação está invertida: ele para quando a distância é \"maior que\" em vez de \"menor que\", então isso nunca é verdade enquanto o robô se aproxima.",
            "Os dois lados da comparação estão trocados.",
            "O operador errado (um > onde era para ser <) impede a condição de parada de disparar.",
          ],
          fix: "Inverta o operador de comparação (ou troque os dois lados dele) para a condição de parada virar verdadeira quando a distância ficar pequena. Rode de novo e confirme que o robô para antes da parede.",
        },
        {
          title: "O contador que conta demais",
          scenario: "Um robô passa por três marcadores e deveria relatar uma contagem de 3, mas relata um número enorme, tipo 47.",
          symptom: "O valor final do contador é muito maior que o número de objetos reais: ele cresce a cada volta do laço em vez de uma vez por objeto.",
          hint: "Olhe o contador subindo enquanto ele anda. Ele soma 1 uma vez por objeto, ou uma vez a cada passagem pelo laço, mesmo sem nenhum objeto novo na frente?",
          likelyCauses: [
            "O \"soma 1\" está fora da verificação \"estou vendo um objeto?\", então ele conta a cada volta do laço.",
            "O contador nunca é zerado no começo da rodada.",
            "O robô fica parado ao lado do mesmo objeto por várias voltas e conta ele toda vez.",
          ],
          fix: "Zere o contador no começo e mova o \"soma 1\" para dentro da condição que detecta um objeto NOVO. Rode de novo e confirme que a contagem final bate com o número real de objetos.",
        },
        {
          title: "O seguidor de linha que falha na claridade",
          scenario: "Um robô seguidor de linha funcionou perfeitamente ontem. Hoje, numa sala bem mais clara, ele sai direto da linha toda vez, e o programa não mudou.",
          symptom: "O robô ignora a linha e não corrige o rumo, mesmo com o código que corrigia certinho na luz de ontem.",
          hint: "O código é idêntico ao de ontem; o que mudou foi a sala. Leia hoje o valor de luz ao vivo em cima da linha e fora dela, e compare os dois com o limiar do programa.",
          likelyCauses: [
            "O limiar de luz foi calibrado para a sala mais escura de ontem e agora está errado.",
            "A luz mais forte subiu todas as leituras acima do limiar, então \"em cima da linha\" nunca é registrado.",
            "O sensor não foi recalibrado para as condições de luz de hoje.",
          ],
          fix: "Leia os valores de luz de hoje em cima da linha e fora dela, escolha um limiar novo na metade do caminho entre os dois, guarde esse valor de calibração e rode de novo. O robô deve voltar a seguir a linha.",
        },
        {
          title: "O robô que nunca termina",
          scenario: "Um robô deveria andar para a frente, desviar de alguns obstáculos e depois parar no objetivo, mas ele continua andando e desviando para sempre e nunca termina, nem depois de chegar ao objetivo.",
          symptom: "O robô nunca encerra o programa: ele repete o comportamento de desviar e andar sem fim, sem parar.",
          hint: "O desviar em si funciona. O problema é que o robô nunca sai do laço. Procure uma saída: existe alguma condição que encerre o laço quando o objetivo for alcançado?",
          likelyCauses: [
            "O comportamento está dentro de um laço infinito sem saída.",
            "Um repetir-até tem uma condição que nunca consegue virar verdadeira.",
            "Não existe uma \"parada segura\" nem um \"missão concluída\" para quando o objetivo for alcançado.",
          ],
          fix: "Acrescente uma saída: um repetir-até que termine no objetivo, ou um \"se estiver no objetivo, então pare\", para o laço poder acabar. Rode de novo e confirme que o robô para ao chegar ao objetivo.",
        },
        {
          title: "O código bom que mesmo assim puxa para o lado",
          scenario: "O programa de um robô está correto e não mudou (semana passada ele andava reto), mas agora ele faz curva para um lado toda vez que anda para a frente, mesmo num trecho curto e sem obstáculos.",
          symptom: "Em vez de andar reto, o robô puxa para um lado do mesmo jeito em toda rodada, embora o código não tenha mudado.",
          hint: "Ele falha do mesmo jeito toda rodada, mas o programa já se provou correto na semana passada. Antes de mexer no código, olhe o corpo e as rodas do robô, ou a superfície e a montagem simuladas.",
          likelyCauses: [
            "Uma roda ou um eixo está frouxo ou não encaixou direito.",
            "Um fio ou uma peça se arrasta pelo chão de um lado, ou uma roda raspa na estrutura.",
            "No simulador, algum ajuste de superfície ou de alinhamento faz um lado escorregar.",
          ],
          fix: "Não mexa no código. Encaixe de novo e aperte as duas rodas, tire qualquer fio ou sujeira que esteja se arrastando (ou reinicie a superfície e o alinhamento simulados). Rode de novo e confirme que ele volta a andar reto.",
        },
        {
          title: "A parada que chega tarde demais",
          scenario: "Um robô usa o sensor de distância para parar antes de uma parede. Em velocidade baixa ele para perfeitamente, mas quando é acelerado passa do ponto e encosta na parede, com exatamente o mesmo limiar.",
          symptom: "Em alta velocidade o robô para tarde demais e bate na parede; em baixa velocidade esse mesmíssimo programa para a tempo.",
          hint: "O limiar que funciona devagar não basta quando ele está rápido: o robô percorre mais distância entre uma leitura e outra. Pense em como a velocidade e o limiar de parada trabalham juntos, e mude só um deles de cada vez.",
          likelyCauses: [
            "Em alta velocidade o robô percorre mais distância entre leituras, então um limiar bem próximo dispara tarde demais.",
            "O limiar foi ajustado para uma velocidade mais baixa do que a que o robô está usando agora.",
            "O sensor é lido tão de vez em quando que, nessa velocidade, não dá tempo de pegar a parede.",
          ],
          fix: "Mude uma coisa de cada vez: ou diminua a velocidade de deslocamento, ou aumente o limiar de distância para ele parar mais cedo. Rode de novo na velocidade desejada e confirme que ele para a tempo.",
        },
      ],
      knowledgeCheck: {
        instructions: "Responda a estas perguntas para conferir se você consegue depurar bugs por família e provar que um robô é confiável.",
        questions: [
          {
            prompt: "Diagnostique o tipo de bug mais provável.",
            scenario: "Um robô seguidor de linha funcionou ontem. Hoje ele passa direto pela linha toda vez, mesmo sem o código ter mudado. Hoje a sala está bem mais clara.",
            options: [
              {
                text: "Um bug de programação",
                feedback: "O código não mudou, então provavelmente o programa não é o problema.",
              },
              {
                text: "Um bug de sensor que precisa de recalibração",
                feedback: "Isso mesmo: a luz mais forte mudou as leituras, então o limiar de luz precisa ser recalibrado.",
              },
              {
                text: "Um bug mecânico",
                feedback: "Nada aqui aponta para uma roda frouxa ou uma peça se arrastando.",
              },
              {
                text: "O robô quebrou de vez",
                feedback: "É bem provável que dê para resolver só recalibrando o sensor para a nova luz.",
              },
            ],
            explanation: "O mesmo código, mais a iluminação mudada, mais leituras ruins, aponta para um bug de sensor e calibração, e não de programa nem mecânico.",
          },
          {
            prompt: "O que é depurar?",
            options: [
              {
                text: "Fazer o robô andar mais rápido",
                feedback: "Velocidade não é depuração: depurar é achar e consertar o motivo de alguma coisa dar errado.",
              },
              {
                text: "Descobrir por que o resultado real é diferente do esperado, e depois consertar isso",
                feedback: "Isso mesmo: depurar é comparar o esperado com o real e caçar a causa dessa diferença.",
              },
              {
                text: "Apagar o programa inteiro e começar do zero",
                feedback: "Começar do zero esconde o bug em vez de achá-lo, e você provavelmente repetiria o erro.",
              },
              {
                text: "Colocar mais sensores no robô",
                feedback: "Mais sensores não consertam um bug que você ainda nem diagnosticou.",
              },
            ],
            explanation: "Depurar é o trabalho de detetive de achar por que o resultado real difere do esperado, e então consertar essa causa.",
          },
          {
            prompt: "Um robô andava reto na semana passada. O programa dele não mudou, mas agora ele faz curva para um lado em toda rodada. Qual família de bug é a mais provável?",
            options: [
              {
                text: "Um bug de programação",
                feedback: "O programa não mudou, então provavelmente as instruções não são a causa.",
              },
              {
                text: "Um bug de sensor",
                feedback: "Puxar para o lado ao andar reto normalmente não tem a ver com a leitura de um sensor.",
              },
              {
                text: "Um bug mecânico",
                feedback: "Correto: uma roda frouxa ou uma peça se arrastando é uma causa física (mecânica) de puxar para o lado.",
              },
              {
                text: "Não existe bug nenhum",
                feedback: "O resultado real não bate com o esperado, então existe sim um bug para achar.",
              },
            ],
            explanation: "Quando o código não mudou e o robô puxa sempre para o mesmo lado, desconfie de um bug mecânico, tipo uma roda frouxa ou um fio se arrastando.",
          },
          {
            prompt: "O que é um contador?",
            options: [
              {
                text: "Um sensor que mede distância",
                feedback: "Isso é um sensor de distância, não um contador.",
              },
              {
                text: "Uma variável que começa num número e sobe de um em um cada vez que alguma coisa acontece",
                feedback: "Isso mesmo: um contador é uma variável usada para contar, somando 1 a cada evento.",
              },
              {
                text: "Um bloco que faz o robô parar",
                feedback: "Isso é um bloco de parar; um contador guarda um total que vai se acumulando.",
              },
              {
                text: "O nível de bateria do robô",
                feedback: "O nível de bateria não é um contador que você define no seu programa.",
              },
            ],
            explanation: "Um contador é uma variável que guarda uma contagem acumulada, começando num número e subindo de um em um a cada evento.",
          },
          {
            prompt: "Num ensaio de confiabilidade, o que é o \"resultado esperado\"?",
            options: [
              {
                text: "O que aconteceu de verdade quando você rodou o robô",
                feedback: "Isso é o resultado real: o que você observa depois de rodar.",
              },
              {
                text: "O que DEVERIA acontecer se o programa funcionar direito",
                feedback: "Correto: o resultado esperado é o que você prevê que deve acontecer, antes de testar.",
              },
              {
                text: "O número de sensores que o robô tem",
                feedback: "Isso é uma contagem de peças, não o resultado esperado de uma rodada.",
              },
              {
                text: "O tempo mais rápido possível",
                feedback: "Velocidade não é o resultado esperado, a não ser que seja justamente isso que você esteja testando.",
              },
            ],
            explanation: "O resultado esperado é o que deveria acontecer; você o compara com o resultado real a cada rodada para ver se o robô é confiável.",
          },
          {
            prompt: "Por que se roda a mesma tarefa três vezes num ensaio de confiabilidade?",
            options: [
              {
                text: "Para provar que o robô funciona de novo e de novo, e não só uma vez por sorte",
                feedback: "Sim: confiabilidade é fazer o trabalho certo repetidamente, e três rodadas que batem são a prova.",
              },
              {
                text: "Porque as duas primeiras rodadas são só treino",
                feedback: "Toda rodada é dado de verdade; você registra e compara as três.",
              },
              {
                text: "Para acabar com a bateria mais rápido",
                feedback: "A ideia é ter prova de confiabilidade, e não gastar energia.",
              },
              {
                text: "Porque uma rodada só é contra as regras",
                feedback: "Não é regra: é que uma rodada só não consegue provar confiabilidade como várias conseguem.",
              },
            ],
            explanation: "Rodadas repetidas que batem provam a confiabilidade; se o resultado real de uma rodada não bater com o esperado, você achou um bug para consertar.",
          },
        ],
      },
      reflection: [
        {
          prompt: "O que você mudou por causa de um teste, e não por chute?",
        },
        {
          prompt: "O que rodar a tarefa três vezes fez você saber sobre o seu robô, comparado com rodar uma vez só?",
        },
        {
          prompt: "Por que mudar uma coisa de cada vez deixa a depuração mais fácil? O que deu errado (ou certo) quando você tentou isso?",
        },
      ],
      journalPrompts: [
        {
          prompt: "Preencha a sua tabela de confiabilidade de três rodadas: o resultado esperado, e o resultado real e o Bateu? de cada rodada.",
        },
        {
          prompt: "Para uma das missões de depuração, escreva o sintoma, a família do bug e a única mudança que resolveu.",
        },
        {
          prompt: "Registre o valor guardado final do seu contador de obstáculos e como ele se comparou ao número real de obstáculos.",
        },
      ],
      savedPrograms: [
        {
          title: "Programa do contador de obstáculos",
          description: "Um programa que coloca um contador em 0, roda um laço para ler o sensor, e soma 1 ao contador cada vez que desvia de um obstáculo.",
        },
        {
          title: "Conserte o freio quebrado",
          description: "Este programa deveria parar o robô na casa bem antes da parede, mas um valor errado na verificação de distância faz ele parar no lugar errado. Preveja a família do bug, mude o único valor na condição do repetir-até, e rode de novo até ele parar direito.",
        },
      ],
      simulatorMissions: [
        {
          title: "Conserte o freio quebrado",
          objective: "O robô para no lugar errado porque o valor da verificação de distância dele está errado por um. Diagnostique se é um bug de programação ou de limiar de sensor e conserte esse único valor para ele parar na casa bem antes da parede.",
          successCriteria: [
            "O robô para na casa bem antes da parede",
            "Só um valor foi mudado",
            "O estudante nomeia a família do bug",
          ],
        },
        {
          title: "Contar e desviar",
          objective: "Percorra uma grade com obstáculos, desvie de cada um, e use um contador que termine igual ao número de obstáculos desviados.",
          successCriteria: [
            "O robô desvia de todos os obstáculos",
            "O contador começa em 0 e soma 1 por obstáculo desviado",
            "O contador final bate com a contagem de obstáculos",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Depuração e as três famílias de bugs",
          focus: "Resultado esperado x real, e bugs mecânicos, de programação e de sensor.",
        },
        {
          title: "Preveja a família do bug",
          focus: "Ler cada sintoma e prever a família dele antes de investigar.",
        },
        {
          title: "Missões de Detetive de Bugs",
          focus: "Diagnosticar e consertar bugs mecânicos, de programação e de sensor, uma mudança de cada vez.",
        },
        {
          title: "Contador de obstáculos",
          focus: "Usar uma variável como contador para acompanhar os obstáculos desviados.",
        },
        {
          title: "Ensaio de confiabilidade de três rodadas",
          focus: "Rodar a mesma tarefa três vezes, registrando o esperado x o real e o Bateu?.",
        },
        {
          title: "Verificação de aprendizagem",
          focus: "Cinco perguntas sobre depuração, famílias de bugs, contadores e confiabilidade.",
        },
        {
          title: "Reflexão",
          focus: "Escrever sobre um bug que você achou e sobre o que as três rodadas mostraram.",
        },
      ],
      safetyNotes: [
        {
          text: "Desligue o robô antes de apertar rodas, mexer em fios ou conferir peças mecânicas.",
        },
        {
          text: "Mantenha a área de teste e a pista de obstáculos livres de mãos, pés e bagunça durante as rodadas.",
        },
        {
          text: "Use tesoura sem ponta com um adulto se for refazer um para-choque de papel ou alguma peça do modelo.",
        },
        {
          text: "Salve o seu programa e o registro de testes com frequência, para que atualizar o navegador não apague os seus resultados.",
        },
      ],
      printableResources: [
        {
          title: "Registro de teste de confiabilidade de três rodadas",
          description: "Uma tabela para o resultado esperado e para o resultado real e o Bateu? ao longo de três rodadas.",
        },
        {
          title: "Folha do Detetive de Bugs",
          description: "Um guia das três famílias de bugs com espaço para registrar o sintoma, a família suspeita, a única mudança tentada e a solução.",
        },
        {
          title: "Página de diário de depuração e contador",
          description: "Espaço para registrar um bug diagnosticado e o valor guardado final do contador de obstáculos.",
        },
        {
          title: "Guia do professor da semana 6",
          description: "Preparação, como plantar bugs, condução da aula, ideias equivocadas e perguntas para a aula de depuração e confiabilidade.",
        },
      ],
      completion: {
        summary: "Termine a semana 6 diagnosticando um bug mecânico, um de programação e um de sensor, fazendo um ensaio de confiabilidade de três rodadas e passando na verificação de aprendizagem.",
        requirements: [
          {
            label: "Diagnosticar e consertar pelo menos um bug de cada família, registrando o sintoma e a solução",
          },
          {
            label: "Completar um ensaio de confiabilidade de três rodadas com o esperado x o real registrados",
          },
          {
            label: "Usar uma variável contador para acompanhar os obstáculos desviados",
          },
          {
            label: "Acertar pelo menos 4 de 5 na verificação de aprendizagem",
          },
          {
            label: "Escrever a sua reflexão",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprima o registro de teste de três rodadas e a folha do Detetive de Bugs, um por estudante ou dupla.",
          "Deixe prontos para depurar os robôs reativos da semana passada (ou as missões do simulador, ou os programas de cartões).",
          "Monte um caso de teste repetível: marque uma linha de largada e uma distância fixa até a parede ou o obstáculo, para as rodadas serem mesmo idênticas.",
        ],
        prep: [
          "Prepare com antecedência um bug plantado de cada família: afrouxar uma roda (mecânico), mudar um número de curva (programação) e ajustar um limiar ruim (sensor).",
          "Treine ler o valor do sensor ao vivo no seu kit ou no simulador, para conseguir orientar os ajustes de limiar.",
          "Decida como os estudantes vão \"somar 1\" a um contador no seu equipamento, e teste você mesmo o programa do contador de obstáculos uma vez.",
        ],
        facilitation: [
          "Ensine o esperado x o real e as três famílias de bugs antes de encostar em qualquer robô.",
          "Peça que os estudantes primeiro prevejam a família do bug pelo sintoma, e só depois investiguem; não deixe que fiquem cutucando a esmo.",
          "Insista em mudar uma coisa de cada vez e rodar de novo, para se saber qual foi a causa do conserto.",
          "Reserve tempo para o ensaio completo de confiabilidade de três rodadas; uma única rodada de sorte não prova nada.",
        ],
        commonMisconceptions: [
          "\"Funcionou uma vez, então está consertado\": confiabilidade precisa de várias rodadas que batem, não de uma.",
          "Achar que todo bug está no código: muitos são mecânicos (roda frouxa, fio se arrastando) ou de sensor (limiar errado).",
          "Mudar várias coisas de uma vez, e aí ninguém consegue dizer qual mudança realmente resolveu.",
          "Achar que variável e contador são coisas diferentes: um contador é só uma variável usada para contar.",
        ],
        questionsToAsk: [
          "O que você esperava que acontecesse, e o que aconteceu de verdade?",
          "Ele falha do mesmo jeito em toda rodada, ou só às vezes? O que isso diz sobre a família?",
          "Qual foi a ÚNICA coisa que você mudou, e ela bateu com a sua previsão?",
          "Como você sabe que o seu robô é confiável e não só deu sorte?",
        ],
        easierVersion: "Dê aos estudantes um bug plantado de cada vez, com a família já indicada, para eles praticarem o conserto e o teste de três rodadas sem ter também de diagnosticar a família.",
        harderVersion: "Plante dois bugs de famílias diferentes ao mesmo tempo, ou exija um contador que dispare uma ação (como parar depois de 3 obstáculos) que os estudantes também tenham de testar quanto à confiabilidade.",
      },
      nextWeek: {
        teaser: "Semana que vem a gente coloca a confiabilidade para trabalhar: planejar uma missão autônoma completa que o robô cumpra com segurança sozinho.",
        prepare: [
          "Guarde o seu registro de teste de três rodadas e a folha do Detetive de Bugs: comportamento confiável é a base da missão da semana que vem.",
          "Pense num trabalho que o seu robô poderia fazer do início ao fim sem ninguém pilotando.",
          "Carregue o seu kit, salve o simulador nos favoritos, ou junte o seu robô de papelão e a sua pista.",
        ],
      },
    },
    {
      title: "Planejar uma missão autônoma",
      subtitle: "Transforme um trabalho de verdade num plano: requisitos, restrições, um fluxograma e uma missão autônoma segura.",
      summary: "Os estudantes aprendem como quem faz engenharia planeja o trabalho de um robô antes de construí-lo. Eles distinguem os sistemas autônomos (que decidem sozinhos com sensores e um programa) dos que são por controle remoto (pilotados por uma pessoa), e depois escrevem requisitos, restrições e critérios para uma missão e pesam as trocas. Desenham o fluxograma de um programa autônomo, com caixas de ação e losangos de decisão, incluindo uma parada segura, e fazem uma missão curta de prática guiada, como ensaio para o projeto final da semana que vem.",
      mainMission: "Planejar uma missão autônoma com requisitos, restrições e um fluxograma, e depois ensaiá-la com uma missão curta de prática guiada.",
      estimatedTime: "60 a 75 minutos",
      learningGoals: [
        {
          text: "Explicar a diferença entre um sistema autônomo e um por controle remoto",
        },
        {
          text: "Escrever requisitos, restrições e critérios de sucesso para a missão de um robô",
        },
        {
          text: "Descrever uma troca no plano de um robô e escolher usando o processo de projeto da engenharia",
        },
        {
          text: "Desenhar o fluxograma de um programa autônomo com caixas de ação, losangos de decisão e uma parada segura",
        },
        {
          text: "Fazer uma missão autônoma curta e guiada e comparar o resultado com os critérios de sucesso dela",
        },
      ],
      vocabulary: [
        {
          term: "Autônomo",
          definition: "Que age por conta própria: o robô usa os sensores e um programa para decidir o que fazer, sem ninguém pilotando.",
        },
        {
          term: "Por controle remoto",
          definition: "Pilotado por uma pessoa em tempo real, a cada instante, por exemplo com um joystick ou um aplicativo.",
        },
        {
          term: "Requisito",
          definition: "Alguma coisa que o robô TEM que fazer para valer como cumprir a missão, tipo \"chegar à zona de entrega\".",
        },
        {
          term: "Restrição",
          definition: "Um limite dentro do qual você tem que trabalhar, como tempo, tamanho, materiais ou orçamento.",
        },
        {
          term: "Critérios",
          definition: "As medidas que você usa para julgar o sucesso, tipo \"para a menos de 5 cm da parede\" ou \"termina em menos de 30 segundos\".",
        },
        {
          term: "Troca",
          definition: "Abrir mão de um pouco de uma coisa boa para ganhar mais de outra, tipo ir mais devagar para ser mais confiável.",
        },
        {
          term: "Processo de projeto da engenharia",
          definition: "O ciclo que se repete na engenharia: planejar, construir, testar e melhorar.",
        },
        {
          term: "Iteração",
          definition: "Uma volta completa no ciclo de projeto: testar o seu plano ou o seu robô, achar um problema e melhorá-lo.",
        },
        {
          term: "Eficiência",
          definition: "Fazer o trabalho bem feito com menos: menos passos, menos tempo ou menos energia.",
        },
        {
          term: "Parada segura",
          definition: "Um comportamento programado que faz o robô parar em segurança quando o trabalho acaba ou quando alguma coisa entra na frente.",
        },
        {
          term: "Robótica responsável",
          definition: "Pensar na segurança e em quando uma pessoa deve continuar no comando, em vez do robô.",
        },
        {
          term: "Fluxograma",
          definition: "Um diagrama passo a passo de um programa, que usa caixas para as ações e losangos para as decisões.",
        },
      ],
      prerequisites: [
        {
          reason: "O plano de uma missão precisa dizer qual sensor o robô usa como entrada, apresentado na semana 4.",
        },
        {
          reason: "O fluxograma e a missão de prática usam laços de repetição e condições para reagir ao mundo, ensinados na semana 5.",
        },
        {
          reason: "Julgar um plano por critérios de sucesso e rodá-lo mais de uma vez se apoia nos hábitos de confiabilidade e teste da semana 6.",
        },
      ],
      concepts: [
        {
          title: "Autônomo x controle remoto",
          body: [
            "Existem dois jeitos de um robô fazer um trabalho. Quando ele é por controle remoto, uma pessoa o pilota em tempo real e decide cada movimento. Quando ele é autônomo, o robô roda o próprio programa e usa os sensores para decidir sozinho, sem ninguém pilotando.",
            "Esta semana é sobre missões autônomas, porque na semana que vem você vai construir um robô que tem que fazer o trabalho dele sozinho. Isso quer dizer que todas as decisões precisam ser planejadas com antecedência e escritas no programa.",
          ],
          examples: [
            "Autônomos: um robô aspirador, um veículo explorador de Marte fazendo um percurso planejado, um robô de entregas na calçada",
            "Por controle remoto: um carrinho de controle remoto, um drone com câmera num joystick, um robô de resgate que uma pessoa dirige pelo vídeo",
          ],
        },
        {
          title: "Requisitos, restrições e critérios",
          body: [
            "Antes de construir, você planeja. Um requisito é o que o robô TEM que fazer: \"levar o bloco até a zona azul\". Uma restrição é um limite dentro do qual você tem que trabalhar: \"em menos de 30 segundos\", \"usando só um sensor\", \"não maior que uma caixa de sapato\". Critérios são como você vai julgar o sucesso: \"para dentro da zona\" e \"nunca esbarra na parede\".",
            "Escrever isso tudo primeiro mantém o plano honesto. Se você não consegue dizer se o robô cumpriu o trabalho, é porque os seus critérios ainda não estão claros o bastante.",
          ],
          examples: [
            "Requisito: \"achar o alvo e parar\"",
            "Restrição: \"terminar em menos de um minuto\"",
            "Critério: \"para a menos de 5 cm do alvo\"",
          ],
        },
        {
          title: "Trocas e o processo de projeto da engenharia",
          body: [
            "Quase nunca dá para ter tudo ao mesmo tempo. Uma troca é abrir mão de um pouco de uma coisa para ganhar mais de outra. Um robô que anda rápido pode perder a leitura do sensor e bater; deixá-lo mais devagar troca velocidade por confiabilidade. Raramente existe uma única resposta \"certa\": você escolhe a troca que melhor combina com os seus requisitos e restrições.",
            "Na engenharia isso é resolvido com o processo de projeto: planejar, construir, testar, melhorar, e então recomeçar. Cada volta dessas é uma iteração. Você também pensa na eficiência: fazer o trabalho com menos passos, menos tempo ou menos energia, sem quebrar os seus critérios.",
          ],
          examples: [
            "Rápido x confiável",
            "Programa simples x dar conta de mais obstáculos",
            "Menos passos (eficiente) x verificações mais cuidadosas",
          ],
        },
        {
          title: "Fluxogramas: desenhar o programa antes de programá-lo",
          body: [
            "Um fluxograma é um desenho dos passos do seu programa. As ações vão em retângulos (\"andar para a frente\", \"parar\"). As decisões vão em losangos e fazem uma pergunta de sim ou não (\"Tem parede à frente?\"), com uma seta de saída para o \"sim\" e outra para o \"não\". As setas ligam as caixas para você conseguir seguir o caminho que o robô vai fazer.",
            "Desenhar o fluxograma primeiro deixa você achar problemas antes de construir. Um bom fluxograma autônomo sempre inclui um laço que fica conferindo um sensor e um final bem definido, que é onde entra a sua parada segura.",
          ],
          examples: [
            "Retângulo = ação",
            "Losango = uma decisão de sim ou não",
            "Setas = a ordem dos passos",
          ],
        },
        {
          title: "Parar em segurança e robótica responsável",
          body: [
            "Um robô autônomo decide sozinho, então ele precisa de um jeito de parar em segurança: um comportamento programado que o faz parar quando o trabalho acaba ou quando alguma coisa (ou alguém) entra na frente. Sem uma parada segura, um robô autônomo pode continuar entrando numa parede ou numa pessoa.",
            "Isso faz parte da robótica responsável: pensar na segurança e em quando uma pessoa deve continuar no comando. Robôs autônomos são ótimos em trabalhos chatos e repetitivos, mas para qualquer coisa arriscada (perto de gente, ou onde um erro possa machucar alguém) uma pessoa precisa poder supervisionar, assumir o controle ou desligar tudo.",
            "Quem projeta de forma responsável também pensa na privacidade: um robô com câmera ou microfone coleta informação sobre as pessoas, então você só coleta o que o trabalho realmente precisa. Planeja-se para a falha: se um sistema quebrar, quem é responsável, e ele falha de um jeito seguro, parando em vez de seguir em frente? E decide-se em quais tarefas o robô deve apenas ajudar uma pessoa, em vez de comandar sozinho: um robô pode entregar um instrumento a uma enfermeira, mas quem toma a decisão médica é uma pessoa.",
            "Por fim, bons robôs são projetados pensando em usuários e necessidades diferentes: quem usa pode ser jovem ou idoso, pode não ler o mesmo idioma, ou pode precisar de botões maiores, de som ou de luzes. Projetar para pessoas reais e variadas faz parte de fazer robótica com responsabilidade.",
          ],
          examples: [
            "Um robô aspirador para e dá ré na beirada de uma escada",
            "Um robô de entregas para quando uma pessoa passa na frente",
            "Uma pessoa mantém a mão perto do botão de parada durante os testes",
            "Um robô doméstico só grava o que precisa e avisa antes de gravar",
            "Um alerta usa luz e som ao mesmo tempo, para mais gente conseguir perceber",
          ],
        },
        {
          title: "Robôs autônomos no mundo real",
          body: [
            "Robôs autônomos já fazem trabalhos de verdade, quase sempre chatos, sujos ou perigosos, e quase sempre com pessoas supervisionando. Olhar exemplos reais ajuda você a planejar a sua própria missão: cada um percebe o mundo, decide com um programa, age, e tem um jeito de parar em segurança.",
            "Enquanto lê, repare no padrão da semana 1: entrada (um sensor), processamento (uma decisão), saída (uma ação), mais uma parada segura e uma pessoa que pode intervir.",
          ],
          examples: [
            "Robôs de entrega de galpão levam prateleiras até os trabalhadores, percebendo outros robôs para não esbarrar",
            "Veículos exploradores de Marte percorrem rotas planejadas sozinhos, porque os comandos da Terra levam minutos para chegar",
            "Robôs agrícolas percorrem as fileiras de plantação para checar as plantas ou arrancar o mato",
            "Robôs de busca e resgate entram em escombros ou fumaça, onde é perigoso demais para uma pessoa",
            "Robôs de inspeção submarina checam tubulações, cascos e cabos onde um mergulhador não consegue ir com segurança",
            "Braços robóticos de fábrica soldam e montam a mesma peça com precisão, de novo e de novo, atrás de uma proteção de segurança",
            "Ferramentas cirúrgicas robóticas permitem movimentos mais firmes e menores, e quem opera continua no comando o tempo todo",
          ],
        },
      ],
      materials: [
        {
          name: "Folha de atividade Briefing de Planejamento da Missão (para imprimir)",
        },
        {
          name: "Página de fluxograma com caixas de ação e losangos de decisão (para imprimir)",
        },
        {
          name: "Lápis, borracha e papel",
        },
        {
          name: "Um percurso curto marcado ou uma \"zona\" para alcançar (fita, copos ou uma caixa)",
        },
        {
          name: "Um kit de robótica programável com pelo menos um sensor",
        },
        {
          name: "Computador ou tablet com o simulador no navegador",
        },
        {
          name: "O modelo de robô de papelão e os cartões de programa das semanas anteriores",
        },
        {
          name: "Cronômetro ou temporizador, para conferir uma restrição de tempo",
        },
      ],
      activities: [
        {
          title: "Escreva um plano de missão",
          goal: "Transformar um pequeno trabalho autônomo num plano: requisitos, restrições, critérios de sucesso e uma troca que você teve de pesar.",
          shared: [
            "Escolha uma missão autônoma pequena, tipo \"chegar à zona e parar\" ou \"procurar até achar o alvo\". Escreva isso no topo do Briefing de Planejamento da Missão.",
            "Preencha o briefing: requisitos (o que ele TEM que fazer), restrições (limites como tempo, tamanho ou um sensor só) e critérios (como você vai julgar o sucesso). Depois aponte uma troca que você teve de pesar, tipo velocidade x confiabilidade.",
          ],
          variants: {
            kit: {
              title: "Planeje uma missão para o robô do seu kit",
              materials: [
                "Folha de atividade Briefing de Planejamento da Missão",
                "O robô do kit como referência",
                "Uma zona marcada ou um percurso curto",
              ],
              instructions: [
                "Escolha uma missão que o seu kit realmente consiga fazer nesta semana, tipo chegar a uma zona marcada com fita e parar.",
                "Escreva os requisitos, e depois as restrições que o seu kit impõe (a velocidade dele, o único sensor, o espaço que você tem).",
                "Escreva critérios de sucesso mensuráveis, e depois aponte uma troca; por exemplo, andar mais devagar para ler o sensor de forma confiável.",
              ],
              safetyNotes: [
                "Esta etapa é no papel; mantenha o robô desligado enquanto você planeja.",
              ],
              expectedResult: "Um briefing completo com pelo menos dois requisitos, duas restrições, dois critérios mensuráveis e uma troca apontada.",
              successCriteria: [
                "Os requisitos dizem o que o robô TEM que fazer",
                "As restrições listam limites reais",
                "Os critérios são mensuráveis (um número ou um sim/não bem claro)",
                "Uma troca é apontada",
              ],
              troubleshooting: [
                {
                  problem: "Os requisitos e as restrições parecem iguais",
                  fix: "Um requisito é um trabalho (\"chegar à zona\"); uma restrição é um limite (\"em menos de 30 segundos\"). Classifique cada linha numa das duas.",
                },
              ],
              extension: "Acrescente uma segunda versão, mais difícil, da missão e liste que requisito novo ela traz.",
            },
            simulator: {
              title: "Planeje uma missão de grade para o simulador",
              materials: [
                "Folha de atividade Briefing de Planejamento da Missão",
                "Simulador no navegador, como referência",
              ],
              instructions: [
                "Escolha uma missão de grade, tipo \"chegar à casa do objetivo e parar\" ou \"percorrer a fileira até o sensor achar o alvo\".",
                "Escreva os requisitos, e depois as restrições que a grade impõe (o tamanho dela, um único bloco de sensor, um limite de passos).",
                "Escreva critérios mensuráveis (chega à casa do objetivo, para lá), e depois aponte uma troca, tipo usar mais passos para desviar das paredes.",
              ],
              safetyNotes: [
                "Não há riscos físicos; dê uma pausa na tela se precisar.",
              ],
              expectedResult: "Um briefing completo para uma missão de grade, com requisitos, restrições, critérios e uma troca bem claros.",
              successCriteria: [
                "Os requisitos dizem o que o robô TEM que fazer",
                "As restrições listam limites reais",
                "Os critérios são mensuráveis",
                "Uma troca é apontada",
              ],
              troubleshooting: [
                {
                  problem: "Os critérios não dá para conferir no simulador",
                  fix: "Escreva critérios que o simulador consiga mostrar, tipo \"cai na casa do objetivo\" ou \"para antes da beirada\".",
                },
              ],
              extension: "Planeje a mesma missão numa grade maior e anote qual restrição fica mais difícil.",
            },
            unplugged: {
              title: "Planeje uma missão de pista de chão para o seu modelo",
              materials: [
                "Folha de atividade Briefing de Planejamento da Missão",
                "Modelo de robô de papelão",
                "Um caminho ou uma zona marcados com fita no chão",
              ],
              instructions: [
                "Escolha uma missão que o seu modelo consiga \"caminhar\" ao longo de um caminho de fita, tipo \"chegar à caixa e parar\".",
                "Escreva os requisitos, e depois as restrições (o comprimento do caminho, um sensor improvisado como um para-choque de papel, um limite de tempo).",
                "Escreva critérios mensuráveis que dê para observar, e depois aponte uma troca, tipo menos passos x conferir o para-choque com mais frequência.",
              ],
              safetyNotes: [
                "Mantenha o caminho no chão livre para ninguém tropeçar enquanto encena a missão.",
              ],
              expectedResult: "Um briefing completo para uma missão de pista de chão, com requisitos, restrições, critérios e uma troca bem claros.",
              successCriteria: [
                "Os requisitos dizem o que o robô TEM que fazer",
                "As restrições listam limites reais",
                "Os critérios são mensuráveis",
                "Uma troca é apontada",
              ],
              troubleshooting: [
                {
                  problem: "Não existe um jeito claro de julgar o sucesso",
                  fix: "Acrescente uma marca física, tipo uma \"zona\" de fita, para o sucesso ser uma coisa que dá para ver e apontar.",
                },
              ],
              extension: "Troquem briefings com outra equipe e vejam se os critérios deles estão claros o bastante para serem julgados.",
            },
          },
        },
        {
          title: "Desenhe o fluxograma da missão",
          goal: "Transformar o plano da missão num fluxograma com caixas de ação, pelo menos um losango de decisão, um laço que confere um sensor e uma parada segura.",
          shared: [
            "Na página do fluxograma, comece numa caixa \"Início\" e termine numa caixa \"Parada segura\". Coloque as ações em retângulos e cada decisão de sim ou não num losango, com uma seta de \"sim\" e uma de \"não\".",
            "O seu fluxograma autônomo tem que ficar conferindo um sensor (um laço) e tem que terminar numa parada segura: o robô para quando o trabalho acaba ou quando alguma coisa entra na frente.",
          ],
          variants: {
            kit: {
              title: "Faça o fluxograma da missão do seu kit",
              materials: [
                "Página de fluxograma",
                "O seu Briefing de Planejamento da Missão já preenchido",
              ],
              instructions: [
                "Escreva os passos da missão em ordem: Início e depois as ações (andar para a frente etc.).",
                "Acrescente um losango de decisão para a verificação do sensor, tipo \"Tem parede à frente?\", com um caminho de \"sim\" e um de \"não\".",
                "Faça o caminho do \"não\" voltar em laço para continuar andando e conferindo; mande o caminho do \"sim\" para a caixa Parada segura.",
              ],
              safetyNotes: [
                "Esta é uma etapa de papel; nenhum robô precisa rodar ainda.",
              ],
              expectedResult: "Um fluxograma do Início até a Parada segura, com caixas de ação, pelo menos um losango de decisão, um laço de volta e um final bem definido.",
              successCriteria: [
                "As ações estão em retângulos",
                "Pelo menos uma decisão está num losango com setas de sim e não",
                "Um laço fica conferindo o sensor",
                "Termina numa parada segura",
              ],
              troubleshooting: [
                {
                  problem: "O fluxograma nunca para",
                  fix: "Todo fluxograma autônomo precisa de uma saída: mande uma seta de uma decisão para a caixa Parada segura.",
                },
              ],
              extension: "Acrescente um segundo losango de decisão, para o robô dar conta de duas leituras de sensor diferentes.",
            },
            simulator: {
              title: "Faça o fluxograma da sua missão de grade",
              materials: [
                "Página de fluxograma",
                "O seu Briefing de Planejamento da Missão já preenchido",
              ],
              instructions: [
                "Liste os passos da missão de grade: Início e depois as ações de movimento pela grade.",
                "Acrescente um losango de decisão para o bloco do sensor, tipo \"Cheguei ao objetivo?\" ou \"Tem obstáculo à frente?\", com setas de sim e não.",
                "Faça o caminho do \"não\" voltar em laço para continuar andando e conferindo; mande o caminho do \"sim\" para a caixa Parada segura.",
              ],
              safetyNotes: [
                "Não há riscos físicos.",
              ],
              expectedResult: "Um fluxograma que corresponde a um programa que você poderia montar no simulador, terminando numa parada segura.",
              successCriteria: [
                "As ações estão em retângulos",
                "Pelo menos uma decisão está num losango com setas de sim e não",
                "Um laço fica conferindo o sensor",
                "Termina numa parada segura",
              ],
              troubleshooting: [
                {
                  problem: "Não está claro qual bloco é a decisão",
                  fix: "A decisão está onde o programa faz ao sensor uma pergunta de sim ou não: isso vira um losango.",
                },
              ],
              extension: "Passe o fluxograma direto para os blocos de repetir-até e de se do simulador, antes de montá-lo.",
            },
            unplugged: {
              title: "Faça o fluxograma da sua missão de pista de chão",
              materials: [
                "Página de fluxograma",
                "O seu Briefing de Planejamento da Missão já preenchido",
              ],
              instructions: [
                "Escreva em ordem os passos da missão de chão, começando numa caixa Início.",
                "Acrescente um losango de decisão para a verificação do sensor improvisado, tipo \"O para-choque está encostando na parede?\", com setas de sim e não.",
                "Faça o \"não\" voltar em laço para continuar andando e conferindo; mande o \"sim\" para a caixa Parada segura.",
              ],
              safetyNotes: [
                "Só etapa de papel; vocês vão encenar depois com um colega.",
              ],
              expectedResult: "Um fluxograma feito à mão, do Início até a Parada segura, que um colega conseguiria seguir para rodar a missão.",
              successCriteria: [
                "As ações estão em retângulos",
                "Pelo menos uma decisão está num losango com setas de sim e não",
                "Um laço fica conferindo o sensor",
                "Termina numa parada segura",
              ],
              troubleshooting: [
                {
                  problem: "Um colega se atrapalha ao seguir o fluxograma",
                  fix: "Faça de cada caixa uma ação exata, e garanta que todo losango tenha exatamente duas setas com rótulo.",
                },
              ],
              extension: "Transforme cada caixa do fluxograma num cartão de programa para a próxima atividade.",
            },
          },
        },
        {
          title: "Missão autônoma de prática guiada",
          goal: "Rodar uma missão autônoma curta (chegar a uma zona, reagir a um obstáculo e parar em segurança) como ensaio para o projeto final da semana que vem.",
          shared: [
            "Monte o programa direto do seu fluxograma: uma sequência para andar, um laço que fica conferindo um sensor, uma condição que reage ao obstáculo, e uma parada segura quando o robô chegar à zona ou encontrar o obstáculo.",
            "Rode, compare com os seus critérios de sucesso e anote uma coisa que você melhoraria; essa etapa de melhorar é uma iteração, exatamente o que você vai fazer muito mais na semana que vem.",
          ],
          variants: {
            kit: {
              title: "Rode a missão de prática no robô do seu kit",
              materials: [
                "Kit de robótica com um sensor",
                "Zona marcada ou percurso curto",
                "O seu fluxograma",
              ],
              instructions: [
                "Monte um percurso curto: uma linha de largada, uma zona para alcançar e um obstáculo no caminho.",
                "Programe uma sequência de avanço, um laço que confere o sensor de distância ou de toque, uma condição que reage ao obstáculo, e uma parada segura na zona.",
                "Rode uma vez a partir da linha de largada e compare com os seus critérios de sucesso; anote uma melhoria.",
              ],
              safetyNotes: [
                "Mantenha a área de teste livre e os dedos longe das rodas enquanto ele anda.",
                "Fique pronto para parar o robô se ele sair do percurso.",
              ],
              expectedResult: "O robô do kit chega à zona, reage ao obstáculo e para em segurança, em vez de empurrá-lo.",
              successCriteria: [
                "Chega à zona",
                "Reage ao obstáculo em vez de ignorá-lo",
                "Para em segurança (não continua andando)",
                "Uma melhoria é anotada",
              ],
              troubleshooting: [
                {
                  problem: "O robô ignora o obstáculo",
                  fix: "Confira o limiar do sensor e se o laço continua lendo o sensor, como no trabalho de confiabilidade da semana 6.",
                },
                {
                  problem: "O robô passa direto pela zona",
                  fix: "Diminua a velocidade de deslocamento ou acrescente uma verificação de distância antes da parada: é uma troca de velocidade por confiabilidade.",
                },
              ],
              extension: "Mude o obstáculo de lugar e confirme que o robô continua reagindo e parando.",
            },
            simulator: {
              title: "Rode a missão de prática no simulador",
              materials: [
                "Simulador no navegador",
                "O seu fluxograma",
              ],
              instructions: [
                "Monte uma grade com uma casa de largada, uma zona de objetivo e um obstáculo no caminho.",
                "Monte o programa: blocos de movimento, um laço repetir-até que confere o bloco do sensor, uma condição se para o obstáculo, e um bloco de parar no objetivo.",
                "Rode a partir da casa de largada, compare com os seus critérios de sucesso e anote uma melhoria.",
              ],
              safetyNotes: [
                "Não há riscos físicos; salve o seu programa para uma atualização da página não apagá-lo.",
              ],
              expectedResult: "O robô do simulador chega à zona de objetivo, reage ao obstáculo e para quando termina.",
              successCriteria: [
                "Chega à zona de objetivo",
                "Reage ao obstáculo em vez de ignorá-lo",
                "Para em segurança quando termina",
                "Uma melhoria é anotada",
              ],
              troubleshooting: [
                {
                  problem: "O robô atravessa o obstáculo",
                  fix: "Garanta que a condição se leia o sensor dentro do laço, antes do movimento.",
                },
                {
                  problem: "O laço nunca acaba",
                  fix: "Confira se a condição do repetir-até de fato vira verdadeira quando o robô chega ao objetivo.",
                },
              ],
              extension: "Acrescente um segundo obstáculo e confirme que o mesmo programa continua terminando em segurança.",
            },
            unplugged: {
              title: "Rode a missão de prática com cartões e um colega",
              materials: [
                "Modelo de robô de papelão",
                "Cartões de programa",
                "Pista de chão com fita, com uma zona e um obstáculo",
                "O seu fluxograma",
              ],
              instructions: [
                "Marque com fita no chão uma linha de largada, uma zona e um obstáculo.",
                "Transforme o seu fluxograma em cartões de programa: cartões de andar para a frente, um de repetir, um cartão de se para o sensor improvisado (\"se o para-choque encostar no obstáculo, vire\") e um cartão de parar na zona.",
                "Peça a um colega que \"rode\" os cartões movendo o modelo passo a passo; compare com os critérios e anote uma melhoria.",
              ],
              safetyNotes: [
                "Mantenha a pista do chão livre para quem move o modelo não tropeçar.",
              ],
              expectedResult: "Um colega consegue seguir os cartões para levar o modelo até a zona, reagir ao obstáculo e parar.",
              successCriteria: [
                "Chega à zona",
                "Reage ao obstáculo em vez de ignorá-lo",
                "Para em segurança no fim",
                "Uma melhoria é anotada",
              ],
              troubleshooting: [
                {
                  problem: "O colega roda de um jeito diferente do que você pretendia",
                  fix: "Faça de cada cartão uma instrução exata, como as sequências da semana 3, para só haver um jeito de ler.",
                },
                {
                  problem: "Não existe nenhuma reação ao obstáculo",
                  fix: "Acrescente um cartão de se que diga o que fazer quando o para-choque encostar no obstáculo.",
                },
              ],
              extension: "Troquem programas de cartões com outra equipe e rodem a missão de prática um do outro.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes de rodar, preveja: a sua missão de prática vai cumprir todos os critérios de sucesso na primeira tentativa? E qual critério tem mais chance de falhar?",
          howToCheck: "Rode a missão de prática guiada e compare o que acontece com cada critério de sucesso que você escreveu no briefing.",
        },
      ],
      testRecords: [
        {
          title: "A missão de prática x os critérios dela",
          instructions: "Rode a missão de prática guiada sempre a partir da mesma largada. Em cada rodada, registre o que aconteceu e compare com os critérios de sucesso do seu briefing.",
          columns: [
            null,
            "Chegou à zona? (S/N)",
            "Reagiu ao obstáculo? (S/N)",
            "Parou em segurança? (S/N)",
            "O que melhorar",
          ],
          measure: "Se cada critério de sucesso foi cumprido, e o que mudar para o projeto final",
        },
      ],
      knowledgeCheck: {
        instructions: "Responda a estas perguntas para conferir se você consegue planejar uma missão autônoma e ler um fluxograma.",
        questions: [
          {
            prompt: "Um robô de entregas chega sozinho a uma zona de descarga, usando os sensores e o programa dele, sem ninguém pilotando. Esse robô é:",
            options: [
              {
                text: "Por controle remoto",
                feedback: "Por controle remoto quer dizer que uma pessoa pilota em tempo real, e aqui ninguém está pilotando.",
              },
              {
                text: "Autônomo",
                feedback: "Isso mesmo: ele usa os próprios sensores e o próprio programa para decidir, sem ninguém pilotando.",
              },
              {
                text: "Não é robô",
                feedback: "Ele percebe, decide e age, então é um robô.",
              },
              {
                text: "Quebrado",
                feedback: "Fazer o trabalho sozinho é exatamente o que um robô autônomo deve fazer.",
              },
            ],
            explanation: "Um sistema autônomo usa os próprios sensores e o próprio programa para decidir, sem ninguém pilotando; um por controle remoto é dirigido por uma pessoa em tempo real.",
          },
          {
            prompt: "\"O robô precisa chegar à zona azul\" e \"ele tem que terminar em menos de 30 segundos\". Qual é o requisito e qual é a restrição?",
            options: [
              {
                text: "Chegar à zona é o requisito; o limite de 30 segundos é a restrição",
                feedback: "Correto: um requisito é o que ele TEM que fazer; uma restrição é um limite dentro do qual você trabalha.",
              },
              {
                text: "Chegar à zona é a restrição; o limite de 30 segundos é o requisito",
                feedback: "É o contrário: chegar à zona é o trabalho (requisito); o limite de tempo é a restrição.",
              },
              {
                text: "As duas são restrições",
                feedback: "Uma das duas é o trabalho que o robô precisa fazer, e isso a torna um requisito.",
              },
              {
                text: "As duas são requisitos",
                feedback: "Um limite de tempo é um limite dentro do qual você trabalha, ou seja, uma restrição, e não um trabalho a fazer.",
              },
            ],
            explanation: "Um requisito é o que o robô TEM que fazer; uma restrição é um limite como tempo, tamanho, materiais ou orçamento, dentro do qual você tem que trabalhar.",
          },
          {
            prompt: "Num fluxograma, o que significa um losango?",
            options: [
              {
                text: "Uma ação que o robô faz",
                feedback: "As ações vão em retângulos, e não em losangos.",
              },
              {
                text: "Uma decisão de sim ou não",
                feedback: "Isso: um losango faz uma pergunta de sim ou não e tem uma seta de saída para cada resposta.",
              },
              {
                text: "O fim do programa",
                feedback: "O fim costuma ser uma caixa de parada, e não um losango de decisão.",
              },
              {
                text: "Quanto tempo um passo demora",
                feedback: "Um fluxograma mostra passos e decisões dentro das formas, e não tempos.",
              },
            ],
            explanation: "Num fluxograma, os retângulos guardam ações e os losangos guardam decisões de sim ou não, cada um com uma seta de \"sim\" e uma de \"não\".",
          },
          {
            prompt: "O seu robô anda rápido, mas às vezes perde a leitura do sensor e bate. Você o deixa mais devagar para ele ler de forma confiável. Essa escolha é um exemplo de:",
            options: [
              {
                text: "Um requisito",
                feedback: "Isso não é um trabalho que o robô precisa fazer; é uma escolha entre duas coisas boas.",
              },
              {
                text: "Uma troca",
                feedback: "Correto: você abriu mão de um pouco de velocidade para ganhar confiabilidade. Isso é uma troca.",
              },
              {
                text: "Uma parada segura",
                feedback: "Uma parada segura é uma parada programada; mudar a velocidade é uma troca de projeto.",
              },
              {
                text: "Uma restrição",
                feedback: "Uma restrição é um limite fixo; aqui você escolheu abrir mão de velocidade em troca de confiabilidade.",
              },
            ],
            explanation: "Uma troca é abrir mão de um pouco de uma coisa (velocidade) para ganhar mais de outra (confiabilidade), e na engenharia isso é pesado usando o processo de projeto.",
          },
          {
            prompt: "Por que um robô autônomo precisa de uma parada segura no programa dele?",
            options: [
              {
                text: "Para ele parecer terminado",
                feedback: "Uma parada segura é sobre segurança e controle, não sobre aparência.",
              },
              {
                text: "Para ele parar em segurança quando o trabalho acaba ou quando alguma coisa entra na frente, em vez de entrar nela",
                feedback: "Isso mesmo: como ninguém está pilotando, é o próprio programa que precisa parar o robô em segurança.",
              },
              {
                text: "Para ele conseguir andar mais rápido",
                feedback: "Uma parada segura faz o robô parar; não tem nada a ver com velocidade.",
              },
              {
                text: "Para ele nunca precisar de sensor",
                feedback: "Uma parada segura normalmente depende de um sensor para saber a hora de parar.",
              },
            ],
            explanation: "Como um robô autônomo decide sozinho, o programa dele precisa de uma parada segura, para ele parar quando o trabalho acaba ou quando alguma coisa entra na frente; isso faz parte da robótica responsável.",
          },
        ],
      },
      reflection: [
        {
          prompt: "O que foi mais difícil de escrever para a sua missão: os requisitos, as restrições ou os critérios? Por quê?",
        },
        {
          prompt: "Descreva uma troca no seu plano. Do que você abriu mão, e o que ganhou em troca?",
        },
        {
          prompt: "Robótica responsável: aponte um trabalho em que um robô autônomo realmente ajuda, e uma situação em que uma pessoa deveria continuar no comando. Explique o seu raciocínio.",
        },
      ],
      journalPrompts: [
        {
          prompt: "Escreva o seu mini briefing de planejamento: a missão, os requisitos, as restrições e os critérios de sucesso dela.",
        },
        {
          prompt: "Desenhe o fluxograma da sua missão autônoma com caixas de ação, pelo menos um losango de decisão e uma parada segura.",
        },
        {
          prompt: "Depois da rodada de prática, marque quais critérios de sucesso a sua missão cumpriu.",
        },
      ],
      savedPrograms: [
        {
          title: "Programa da missão de prática guiada",
          description: "O programa autônomo de prática montado a partir do seu fluxograma: andar para a frente, um laço que fica conferindo um sensor, uma condição que reage a um obstáculo, e uma parada segura na zona.",
        },
      ],
      simulatorMissions: [
        {
          title: "Missão de prática: chegar à zona",
          objective: "Chegar sozinho à zona de objetivo, reagir a um obstáculo no caminho e parar em segurança ao chegar.",
          successCriteria: [
            "O robô chega à zona de objetivo",
            "O robô reage ao obstáculo em vez de atravessá-lo",
            "O robô para em segurança ao chegar",
          ],
        },
        {
          title: "Missão de prática: procurar e parar",
          objective: "Percorrer a fileira procurando até o sensor detectar o alvo, e então parar em segurança ali mesmo.",
          successCriteria: [
            "O robô continua procurando até o sensor detectar o alvo",
            "O robô para assim que acha o alvo",
            "O robô não sai pela beirada da grade",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Autônomo x controle remoto, e as palavras do planejamento",
          focus: "Autônomo x controle remoto; requisitos, restrições, critérios, trocas e o processo de projeto.",
        },
        {
          title: "Escreva um plano de missão",
          focus: "Requisitos, restrições, critérios e uma troca no briefing de planejamento.",
        },
        {
          title: "Desenhe o fluxograma da missão",
          focus: "Caixas de ação, um losango de decisão, um laço e uma parada segura.",
        },
        {
          title: "Preveja o resultado",
          focus: "Prever se a missão vai cumprir os critérios dela e qual tem mais chance de falhar.",
        },
        {
          title: "Missão autônoma de prática guiada",
          focus: "Fazer o ensaio de chegar à zona, reagir e parar em segurança.",
        },
        {
          title: "Confira com os critérios",
          focus: "Registrar a rodada e comparar com os critérios de sucesso.",
        },
        {
          title: "Verificação de aprendizagem",
          focus: "Cinco perguntas sobre planejamento, autonomia, fluxogramas e paradas seguras.",
        },
        {
          title: "Reflexão",
          focus: "Trocas e robótica responsável.",
        },
      ],
      safetyNotes: [
        {
          text: "Durante a rodada de prática, mantenha a área de teste livre e fique pronto para parar o robô se ele sair do percurso; mantenha os dedos longe das rodas em movimento.",
        },
        {
          text: "Programe sempre uma parada segura, para um robô autônomo parar quando o trabalho acaba ou quando alguma coisa entra na frente, em vez de empurrar contra uma parede ou uma pessoa.",
        },
        {
          text: "Mantenha a pista de fita no chão livre para ninguém tropeçar enquanto encena a missão.",
        },
        {
          text: "Salve o seu programa e o seu diário com frequência, para que atualizar o navegador não apague o seu plano.",
        },
      ],
      printableResources: [
        {
          title: "Briefing de Planejamento da Missão",
          description: "Um briefing de uma página para escrever a missão, os requisitos, as restrições, os critérios de sucesso e uma troca.",
        },
        {
          title: "Página do fluxograma da missão",
          description: "Uma página para desenhar o programa autônomo como fluxograma, com caixas de ação, losangos de decisão e uma parada segura.",
        },
        {
          title: "Registro de teste da missão de prática",
          description: "Uma tabela curta para registrar a rodada de prática e compará-la com os critérios de sucesso da missão.",
        },
        {
          title: "Guia do professor da semana 7",
          description: "Preparação, condução da aula, ideias equivocadas e perguntas para a aula de planejamento de missões.",
        },
      ],
      completion: {
        summary: "Termine a semana 7 escrevendo um plano de missão, desenhando o fluxograma dele com uma parada segura, rodando a missão de prática guiada frente aos critérios dela, e passando na verificação de aprendizagem.",
        requirements: [
          {
            label: "Completar o Briefing de Planejamento da Missão com requisitos, restrições, critérios e uma troca",
          },
          {
            label: "Desenhar o fluxograma da missão com um losango de decisão e uma parada segura",
          },
          {
            label: "Rodar a missão de prática guiada e registrá-la frente aos critérios dela",
          },
          {
            label: "Acertar pelo menos 4 de 5 na verificação de aprendizagem",
          },
          {
            label: "Escrever a sua reflexão",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprima o Briefing de Planejamento da Missão, a página do fluxograma e o registro de teste da missão de prática, um por estudante ou equipe.",
          "Monte um percurso curto de prática (uma linha de largada, uma zona marcada e um obstáculo) para os caminhos do kit e sem eletrônicos.",
          "Se for usar kits, carregue-os e confirme que um sensor funciona; se for usar o simulador, abra-o e carregue uma grade 6x6.",
        ],
        prep: [
          "Escreva você mesmo um briefing de missão de exemplo, para conseguir mostrar a diferença entre requisitos, restrições e critérios.",
          "Esboce um fluxograma de exemplo com um losango de decisão e uma parada segura, para mostrar como é o formato.",
          "Tenha uma ou duas missões prontas para oferecer às equipes que travarem na escolha.",
        ],
        facilitation: [
          "Comece pela diferença entre autônomo e controle remoto e pelas palavras do planejamento, antes de qualquer construção.",
          "Faça as equipes escreverem o briefing primeiro; confira se os critérios são mensuráveis antes de elas seguirem em frente.",
          "Mostre como transformar um briefing num fluxograma, e depois deixe as equipes desenharem o delas.",
          "Peça que todos prevejam, rodem uma vez a missão de prática guiada e a registrem frente aos critérios; mantenha a parada segura em primeiro plano, como ensaio para a semana que vem.",
        ],
        commonMisconceptions: [
          "Confundir requisitos com restrições: um requisito é o trabalho, uma restrição é um limite.",
          "\"Autônomo só quer dizer que ele anda\": andar não basta; ele precisa decidir sozinho, com sensores e um programa.",
          "Esquecer a parada segura, ou desenhar um fluxograma sem jeito de terminar.",
          "Achar que uma troca quer dizer que uma escolha está simplesmente \"errada\", em vez de ser um equilíbrio entre duas coisas boas.",
        ],
        questionsToAsk: [
          "Essa linha é um requisito (um trabalho) ou uma restrição (um limite)?",
          "Como você vai conferir de verdade se o robô cumpriu aquele critério?",
          "Onde o seu fluxograma termina, e o que faz o robô parar em segurança?",
          "Do que você abriu mão para ganhar outra coisa, e valeu a pena?",
        ],
        easierVersion: "Dê às equipes uma missão pronta e um briefing meio preenchido, para elas se concentrarem no fluxograma e na parada segura.",
        harderVersion: "Exija dois losangos de decisão e um segundo critério de sucesso, e peça às equipes que justifiquem a troca delas por escrito.",
      },
      nextWeek: {
        teaser: "Semana que vem é o projeto final: você vai projetar, construir ou simular, programar, testar e melhorar um robô que cumpra uma missão útil da sua escolha, usando exatamente o planejamento que você praticou hoje.",
        prepare: [
          "Guarde o seu Briefing de Planejamento da Missão e o seu fluxograma: dá para reaproveitar ou melhorar os dois no projeto final.",
          "Dê uma olhada nas cinco missões do projeto final (entrega, busca e resgate, inspeção, separação e ajuda de acessibilidade) e pense em qual você escolheria.",
          "Carregue o seu kit ou salve o simulador nos favoritos, e junte o papelão e os materiais das semanas anteriores.",
        ],
      },
    },
    {
      title: "Projete um robô que ajude",
      subtitle: "Escolha uma missão de verdade e projete, construa, programe, teste e melhore um robô que a cumpra.",
      summary: "Este é o projeto final. Os estudantes escolhem uma missão (entrega, busca e resgate, inspeção, separação ou ajuda de acessibilidade) e juntam tudo o que viram no curso: um briefing de planejamento, um desenho rotulado, um diagrama de entrada, processamento e saída, um fluxograma, um projeto mecânico que anda, pelo menos um sensor, e um programa que usa uma sequência, um laço e uma condição, com um comportamento de parada segura. Eles fazem três rodadas de teste, documentam uma melhoria e explicam de que forma o robô deles ajuda.",
      mainMission: "Projetar, construir ou simular, programar, testar e melhorar um robô que cumpra uma missão útil da sua escolha.",
      estimatedTime: "90 a 120 minutos (dá para dividir em duas aulas)",
      learningGoals: [
        {
          text: "Transformar uma necessidade real numa missão de robô, com requisitos e restrições",
        },
        {
          text: "Planejar um robô com um briefing, um desenho rotulado, um diagrama de entrada, processamento e saída, e um fluxograma",
        },
        {
          text: "Construir ou simular um robô que use pelo menos um sensor e ande de forma confiável",
        },
        {
          text: "Escrever um programa que use uma sequência, um laço, uma condição e uma parada segura",
        },
        {
          text: "Testar o robô três vezes, documentar uma melhoria e explicar de que forma ele ajuda",
        },
      ],
      vocabulary: [
        {
          term: "Missão",
          definition: "O trabalho útil que você escolhe para o seu robô fazer.",
        },
        {
          term: "Briefing de planejamento",
          definition: "Um plano curto por escrito descrevendo a missão, os requisitos e as restrições antes de construir.",
        },
        {
          term: "Diagrama de entrada, processamento e saída",
          definition: "Um desenho mostrando o que o seu robô percebe, como ele decide e o que ele faz.",
        },
        {
          term: "Fluxograma",
          definition: "Um diagrama passo a passo do seu programa, usando caixas para as ações e losangos para as decisões.",
        },
        {
          term: "Iteração",
          definition: "Melhorar o seu projeto testando-o, achando um problema e mudando alguma coisa.",
        },
        {
          term: "Parada segura",
          definition: "Um comportamento que faz o robô parar em segurança quando o trabalho acaba ou quando alguma coisa entra na frente.",
        },
        {
          term: "Rubrica",
          definition: "Uma tabela que descreve como é um trabalho inicial, em desenvolvimento, proficiente e exemplar.",
        },
      ],
      prerequisites: [
        {
          reason: "O robô final precisa de uma base estável que anda, vinda do trabalho de chassi da semana 2.",
        },
        {
          reason: "O programa é uma sequência planejada de instruções exatas, ensinada na semana 3.",
        },
        {
          reason: "O robô precisa usar pelo menos um sensor, apresentado na semana 4.",
        },
        {
          reason: "O programa precisa incluir um laço e uma condição, ensinados na semana 5.",
        },
        {
          reason: "As três rodadas de teste e a melhoria documentada usam os hábitos de depuração e confiabilidade da semana 6.",
        },
        {
          reason: "O briefing de planejamento, o fluxograma e a parada segura vêm do planejamento de missões autônomas da semana 7.",
        },
      ],
      concepts: [
        {
          title: "Juntando o curso inteiro",
          body: [
            "O projeto final não é uma ideia nova: são todas as ideias do curso funcionando ao mesmo tempo. O seu robô vai perceber (semana 4), decidir com laços e condições (semana 5), andar sobre uma base firme (semana 2), seguir uma sequência planejada (semana 3), ser testado e melhorado (semana 6), e cumprir uma missão autônoma segura (semana 7).",
            "Comece pela missão e vá de trás para a frente: o que esse trabalho exige que o robô perceba, decida e faça?",
          ],
        },
        {
          title: "Escolher uma missão que importa",
          body: [
            "Uma boa missão resolve um problema pequeno e real, para uma pessoa real. \"Entregar um bilhete do outro lado da sala\" é melhor do que \"fazer de tudo\", porque dá mesmo para construir e testar.",
            "Escolha uma missão que você consiga terminar no tempo que tem, com os sensores e as peças que você realmente tem.",
          ],
          examples: [
            "Entrega",
            "Busca e resgate",
            "Inspeção",
            "Separação",
            "Ajuda de acessibilidade",
          ],
        },
        {
          title: "Planeje antes de construir",
          body: [
            "Quem faz engenharia profissionalmente planeja primeiro no papel. O seu briefing de planejamento aponta a missão, os requisitos (o que ele precisa fazer) e as restrições (limites como tempo, tamanho ou materiais).",
            "Depois você desenha um desenho rotulado, um diagrama de entrada, processamento e saída, e um fluxograma do programa. Planejar antes evita que você tenha de reconstruir depois.",
          ],
        },
        {
          title: "Testar, melhorar e explicar",
          body: [
            "Rode o seu robô três vezes e registre o que acontece em cada rodada, e não só se \"funcionou\". Robôs de verdade são julgados por fazer o trabalho de forma confiável, e não por acertar uma vez por sorte.",
            "Ache uma coisa para melhorar, mude, e anote o resultado. Por fim, explique em algumas frases de que forma o seu robô ajuda e como você sabe que ele funciona.",
          ],
        },
      ],
      materials: [
        {
          name: "Briefing de planejamento do projeto final (para imprimir)",
        },
        {
          name: "Páginas de fluxograma e de desenho (para imprimir)",
        },
        {
          name: "Registro de teste de três rodadas (para imprimir)",
        },
        {
          name: "Rubrica do projeto final (para imprimir)",
        },
        {
          name: "Um kit de robótica programável com pelo menos um sensor",
        },
        {
          name: "Computador ou tablet com o simulador no navegador",
        },
        {
          name: "Papelão, tampinhas de garrafa, canudos, fita adesiva, barbante e canetinhas",
        },
        {
          name: "Um kit de materiais do curso inteiro, das semanas anteriores",
        },
      ],
      activities: [
        {
          title: "Projete, construa, programe e teste o seu robô ajudante",
          goal: "Levar a missão escolhida do plano até um robô testado e melhorado, que use um sensor, uma sequência, um laço, uma condição e uma parada segura.",
          shared: [
            "Complete primeiro o briefing de planejamento: missão, requisitos, restrições. Depois desenhe o desenho rotulado, o diagrama de entrada, processamento e saída, e o fluxograma.",
            "Construa ou prepare o robô para ele andar de forma confiável e usar pelo menos um sensor. Escreva o programa com uma sequência, um laço, uma condição e uma parada segura.",
            "Faça três rodadas de teste, registre cada uma, faça uma melhoria e escreva a sua explicação final de como o robô ajuda.",
          ],
          variants: {
            kit: {
              title: "Construa e programe a missão num kit de robótica",
              materials: [
                "Kit de robótica com pelo menos um sensor",
                "Páginas de planejamento, fluxograma e registro de testes",
              ],
              instructions: [
                "Termine o briefing de planejamento e os diagramas antes de encostar no kit.",
                "Construa uma base estável para a sua missão e instale o sensor de que você precisa.",
                "Programe uma sequência que faça o trabalho, um laço que fica conferindo o sensor, uma condição que reage, e uma parada segura no fim.",
                "Faça três testes, registre cada rodada, melhore uma coisa e teste de novo.",
              ],
              safetyNotes: [
                "Fique longe das partes em movimento durante as rodadas de teste.",
                "Dê ao robô uma área de teste livre, sem obstáculos.",
              ],
              expectedResult: "Um robô de kit que cumpre a missão em pelo menos duas das três rodadas e para em segurança.",
              successCriteria: [
                "Usa pelo menos um sensor",
                "O programa tem uma sequência, um laço e uma condição",
                "Tem uma parada segura",
                "Três rodadas registradas",
                "Uma melhoria documentada",
              ],
              troubleshooting: [
                {
                  problem: "O robô funciona uma vez, mas depois não",
                  fix: "Rode a lista de confiabilidade da semana 6: mesma posição de largada, pilhas novas, e reconferir o limiar do sensor.",
                },
                {
                  problem: "O robô nunca reage ao sensor",
                  fix: "Mostre a leitura do sensor e confirme que o seu limiar está do lado certo do valor real.",
                },
              ],
              extension: "Acrescente um segundo sensor ou um contador, para o robô dar conta de uma versão mais difícil da missão.",
            },
            simulator: {
              title: "Projete e programe a missão no simulador",
              materials: [
                "Simulador no navegador",
                "Páginas de planejamento, fluxograma e registro de testes",
              ],
              instructions: [
                "Termine primeiro o briefing de planejamento e os diagramas.",
                "Escolha ou monte um mapa de grade que combine com a sua missão.",
                "Monte o programa com blocos de movimento, um laço, uma condição de sensor e um bloco de parar.",
                "Rode três vezes a partir da mesma largada, registre cada rodada, melhore uma coisa e rode de novo.",
              ],
              safetyNotes: [
                "Não há riscos físicos; dê pausas na tela quando precisar.",
              ],
              expectedResult: "Um robô de simulador que cumpre a missão na grade e para quando termina.",
              successCriteria: [
                "Usa pelo menos um bloco de sensor",
                "O programa tem uma sequência, um laço e uma condição",
                "Tem uma parada",
                "Três rodadas registradas",
                "Uma melhoria documentada",
              ],
              troubleshooting: [
                {
                  problem: "O robô sai da grade",
                  fix: "Acrescente um repetir-até ou uma condição de sensor para ele parar na beirada ou no objetivo.",
                },
                {
                  problem: "O laço nunca acaba",
                  fix: "Confira se a condição do repetir-até de fato vira verdadeira durante a rodada.",
                },
              ],
              extension: "Monte a mesma missão de novo numa grade maior ou mais cheia de obstáculos.",
            },
            unplugged: {
              title: "Faça um modelo e \"rode\" a missão com um programa de papel",
              materials: [
                "Modelo de robô de papelão",
                "Barbante e uma grade no chão ou um caminho de fita",
                "Cartões de programa",
              ],
              instructions: [
                "Termine primeiro o briefing de planejamento e os diagramas.",
                "Construa um robô de papelão com uma parte que se mexe e um sensor improvisado (tipo um \"para-choque\" de papel).",
                "Escreva o programa em cartões usando uma sequência, um repetir e um se, mais um cartão de parar.",
                "\"Rode\" o programa movendo o modelo cartão por cartão três vezes, registrando cada rodada e melhorando um passo.",
              ],
              safetyNotes: [
                "Use tesoura sem ponta com um adulto ao construir o modelo.",
              ],
              expectedResult: "Um robô de papelão e um programa de cartões que um colega consiga seguir para cumprir a missão do mesmo jeito duas vezes.",
              successCriteria: [
                "O modelo tem uma parte que se mexe e um sensor improvisado",
                "O programa de cartões tem uma sequência, um repetir e um se",
                "Tem um cartão de parar",
                "Três rodadas registradas",
                "Uma melhoria documentada",
              ],
              troubleshooting: [
                {
                  problem: "Duas pessoas \"rodam\" o programa de jeitos diferentes",
                  fix: "Os passos estão ambíguos: reescreva-os para ficarem exatos, como as instruções da semana 3.",
                },
                {
                  problem: "Não tem onde encaixar uma condição",
                  fix: "Acrescente um cartão de se, tipo \"se o para-choque encostar na parede, vire à direita\".",
                },
              ],
              extension: "Troquem programas com outro grupo e rodem a missão um do outro.",
            },
          },
        },
      ],
      predictionPrompts: [
        {
          prompt: "Antes da sua primeira rodada de teste, preveja: qual parte da missão tem mais chance de falhar?",
          howToCheck: "Compare a sua previsão com o que realmente dá errado nas três rodadas de teste.",
        },
      ],
      testRecords: [
        {
          title: "Teste de três rodadas da missão final",
          instructions: "Rode a missão inteira três vezes a partir da mesma montagem inicial. Registre o que aconteceu em cada rodada e se a missão foi cumprida.",
          columns: [
            null,
            "O que aconteceu",
            "Missão cumprida? (S/N)",
            "O que mudar",
          ],
          measure: "Se a missão foi cumprida e o que mudou de uma rodada para outra",
        },
      ],
      knowledgeCheck: {
        instructions: "Confira se você consegue explicar as escolhas por trás do seu projeto final.",
        questions: [
          {
            prompt: "Por que na engenharia se escreve um briefing de planejamento e se desenha um fluxograma antes de construir?",
            options: [
              {
                text: "Para o projeto demorar mais",
                feedback: "Planejar na verdade poupa tempo, porque evita ter de refazer tudo.",
              },
              {
                text: "Para pensar bem na missão, nos requisitos e nos passos antes de gastar material",
                feedback: "Isso mesmo: planejar antes no papel evita erros caros lá na frente.",
              },
              {
                text: "Porque não é permitido construir",
                feedback: "Construir é justamente o objetivo; o planejamento só vem antes.",
              },
              {
                text: "Para decorar o robô",
                feedback: "Um briefing e um fluxograma são sobre o plano, e não sobre decoração.",
              },
            ],
            explanation: "Um briefing e um fluxograma deixam você resolver a missão, os requisitos, as restrições e os passos antes de construir.",
          },
          {
            prompt: "O seu programa precisa incluir uma condição. O que uma condição permite ao seu robô fazer?",
            options: [
              {
                text: "Repetir o mesmo movimento para sempre, aconteça o que acontecer",
                feedback: "Isso descreve um laço puro e simples, sem nenhuma decisão.",
              },
              {
                text: "Escolher uma ação com base no que um sensor lê",
                feedback: "Correto: uma condição (se / se-senão) faz o robô decidir a partir da entrada do sensor.",
              },
              {
                text: "Andar mais rápido",
                feedback: "A velocidade é definida pelos motores, não por uma condição.",
              },
              {
                text: "Carregar a bateria dele",
                feedback: "Condições são sobre decisões, não sobre energia.",
              },
            ],
            explanation: "Uma condição permite ao robô escolher uma ação com base na leitura de um sensor, que é o coração de reagir ao mundo.",
          },
          {
            prompt: "Por que você roda a missão três vezes, em vez de uma?",
            options: [
              {
                text: "Para provar que funciona de forma confiável, e não só uma vez por sorte",
                feedback: "Sim: confiabilidade ao longo das rodadas é o que torna um robô digno de confiança.",
              },
              {
                text: "Porque a primeira rodada não conta",
                feedback: "Toda rodada conta como dado; você registra as três.",
              },
              {
                text: "Para acabar com a bateria",
                feedback: "Testar é sobre juntar evidência, e não sobre descarregar a bateria.",
              },
              {
                text: "Para parecer que está bem ocupado",
                feedback: "Testes repetidos são sobre resultados confiáveis, e não sobre aparência.",
              },
            ],
            explanation: "Três rodadas mostram se o robô faz o trabalho de forma confiável, que é como robôs de verdade são julgados.",
          },
          {
            prompt: "O que é um comportamento de \"parada segura\"?",
            options: [
              {
                text: "Desligar o robô tirando a bateria",
                feedback: "Isso é um desligamento manual, e não uma parada segura programada.",
              },
              {
                text: "Um comportamento programado que faz o robô parar quando o trabalho acaba ou quando alguma coisa entra na frente",
                feedback: "Correto: uma parada segura faz parte do programa e protege as pessoas e o robô.",
              },
              {
                text: "Andar até o robô bater",
                feedback: "Bater é justamente o contrário de parar em segurança.",
              },
              {
                text: "Fazer o robô acelerar no fim",
                feedback: "Acelerar não é parar em segurança.",
              },
            ],
            explanation: "Uma parada segura é um comportamento programado que faz o robô parar quando ele termina ou quando percebe um obstáculo.",
          },
        ],
      },
      reflection: [
        {
          prompt: "De que forma o seu robô ajuda alguém? Explique a missão em duas ou três frases.",
        },
        {
          prompt: "Qual foi a única melhoria que você fez depois de testar, e como ela mudou o resultado?",
        },
        {
          prompt: "Se você tivesse mais uma semana, o que acrescentaria ou mudaria depois?",
        },
      ],
      journalPrompts: [
        {
          prompt: "Escreva o seu briefing de planejamento: missão, requisitos e restrições.",
        },
        {
          prompt: "Desenhe o seu desenho rotulado e o seu diagrama de entrada, processamento e saída.",
        },
        {
          prompt: "Registre as suas três rodadas de teste e a melhoria que você fez.",
        },
        {
          prompt: "Escreva a sua explicação final de como o robô ajuda.",
        },
      ],
      savedPrograms: [
        {
          title: "Programa da missão final",
          description: "O programa que roda a missão que você escolheu: uma sequência, um laço, uma condição de sensor e uma parada segura.",
        },
      ],
      simulatorMissions: [
        {
          title: "Missão final (simulador)",
          objective: "Cumprir a missão que você escolheu na grade, usando um sensor, um laço, uma condição e uma parada segura.",
          successCriteria: [
            "O robô chega ao objetivo da missão",
            "O robô usa uma condição de sensor",
            "O robô para em segurança quando termina",
          ],
        },
      ],
      lessonFlow: [
        {
          title: "Escolha a sua missão",
          focus: "Escolher entre entrega, busca e resgate, inspeção, separação ou ajuda de acessibilidade.",
        },
        {
          title: "Planeje no papel",
          focus: "Briefing de planejamento, desenho rotulado, diagrama de entrada, processamento e saída, e fluxograma.",
        },
        {
          title: "Construa ou prepare o robô",
          focus: "Uma base estável que anda, com pelo menos um sensor.",
        },
        {
          title: "Programe a missão",
          focus: "Sequência, laço, condição e parada segura.",
        },
        {
          title: "Três rodadas de teste e uma melhoria",
          focus: "Registrar cada rodada, mudar uma coisa e testar de novo.",
        },
        {
          title: "Explique de que forma ele ajuda",
          focus: "Explicação final e reflexão.",
        },
        {
          title: "Apresente e pontue",
          focus: "Apresentar o robô e pontuá-lo pela rubrica.",
        },
      ],
      safetyNotes: [
        {
          text: "Reserve uma área livre, sem obstáculos, para as rodadas de teste, e fique longe das partes em movimento.",
        },
        {
          text: "Use tesoura sem ponta com um adulto ao construir o modelo de papelão.",
        },
        {
          text: "Salve o seu programa e o seu diário com frequência, para que atualizar o navegador não apague o seu trabalho.",
        },
      ],
      printableResources: [
        {
          title: "Briefing de planejamento do projeto final",
          description: "Missão, requisitos, restrições, desenho e diagrama de entrada, processamento e saída.",
        },
        {
          title: "Página de fluxograma do projeto final",
          description: "Uma página para desenhar o fluxograma do programa, com caixas de ação e losangos de decisão.",
        },
        {
          title: "Registro de teste de três rodadas",
          description: "Uma tabela para registrar as três rodadas finais de teste e a melhoria feita.",
        },
        {
          title: "Rubrica do projeto final",
          description: "A rubrica de pontuação, cobrindo planejamento, projeto mecânico, programação, testes e comunicação.",
        },
        {
          title: "Guia do professor da semana 8",
          description: "Como conduzir o projeto final em uma ou duas aulas, incluindo orientações para pontuar.",
        },
      ],
      completion: {
        summary: "Termine o curso concluindo o projeto final: planejar, construir ou simular, programar, fazer três testes, documentar uma melhoria e explicar de que forma o robô ajuda.",
        requirements: [
          {
            label: "Completar o briefing de planejamento, o desenho, o diagrama de entrada, processamento e saída, e o fluxograma",
          },
          {
            label: "Construir ou preparar um robô que anda e usa pelo menos um sensor",
          },
          {
            label: "Escrever um programa com uma sequência, um laço, uma condição e uma parada segura",
          },
          {
            label: "Fazer três rodadas de teste e documentar uma melhoria",
          },
          {
            label: "Escrever a explicação final de como o robô ajuda",
          },
        ],
      },
      teacherGuidance: {
        setup: [
          "Imprima o briefing de planejamento, a página do fluxograma, o registro de testes e a rubrica para cada estudante ou equipe.",
          "Reserve uma área livre de chão ou de mesa para construir e testar.",
          "Decida se o projeto final vai numa aula longa só, ou se o planejamento e a construção ficam divididos em duas.",
        ],
        prep: [
          "Revise as cinco missões possíveis e, se der, prepare um exemplo resolvido de cada uma.",
          "Deixe prontos e carregados os materiais das semanas anteriores e os kits ou sensores.",
          "Leia a rubrica para a pontuação ficar consistente.",
        ],
        facilitation: [
          "Insista num plano terminado antes de qualquer construção começar: é o que mais prevê o sucesso.",
          "Circule entre as equipes durante a montagem e a programação; faça perguntas em vez de consertar os robôs.",
          "Reserve tempo para as três rodadas de teste e para a melhoria; não deixe a construção comer a aula inteira.",
          "Encerre com apresentações curtas, pontuadas pela rubrica.",
        ],
        commonMisconceptions: [
          "\"Funcionou uma vez, então está pronto\": a régua é a confiabilidade ao longo de três rodadas.",
          "\"O plano é perda de tempo\": construções sem plano costumam travar ou acabar refeitas.",
          "Pular a parada segura porque a missão \"acaba de qualquer jeito\".",
        ],
        questionsToAsk: [
          "O que o seu robô percebe, decide e faz?",
          "Onde está o laço e onde está a condição no seu programa?",
          "O que aconteceu ao longo das suas três rodadas, e o que você mudou?",
        ],
        easierVersion: "Ofereça uma missão e uma grade ou percurso já prontos, para os estudantes se concentrarem em programar e testar, em vez de projetar do zero.",
        harderVersion: "Exija dois sensores, uma variável contador, ou uma missão com mais de um objetivo.",
      },
      nextWeek: {
        teaser: "Você terminou o curso: agora já sabe projetar, construir, programar, testar e melhorar um robô que ajuda.",
        prepare: [
          "Mostre o seu robô para a família ou para os colegas e explique como ele funciona.",
          "Guarde o seu briefing de planejamento e o seu fluxograma; eles são o começo do seu próximo projeto de robótica.",
          "Experimente uma missão nova da lista, entre as que você não escolheu.",
        ],
      },
      finalProject: {
        title: "Projete um robô que ajude",
        overview: "Escolha uma missão e depois planeje, construa ou simule, programe, teste e melhore um robô que a cumpra. O seu robô precisa usar pelo menos um sensor e um programa com uma sequência, um laço e uma condição, e precisa parar em segurança. Você vai fazer três rodadas de teste, uma melhoria documentada, e explicar de que forma o seu robô ajuda.",
        missionChoices: [
          {
            name: "Entrega",
            scenario: "Alguma coisa precisa ir de um lugar a outro atravessando um cômodo ou um percurso.",
            exampleGoal: "Levar um item pequeno até uma zona de entrega marcada e parar lá.",
            sensorIdeas: [
              "Sensor de distância para parar na zona",
              "Sensor de toque para detectar a chegada",
            ],
          },
          {
            name: "Busca e resgate",
            scenario: "Uma \"pessoa\" ou um objeto está perdido em algum ponto de uma área marcada e precisa ser encontrado.",
            exampleGoal: "Vasculhar uma grade até o robô detectar o alvo, e então parar e sinalizar.",
            sensorIdeas: [
              "Sensor de cor para achar o alvo",
              "Sensor de distância para desviar das paredes durante a busca",
            ],
          },
          {
            name: "Inspeção",
            scenario: "Um caminho, um cano ou uma fileira precisa ser checado à procura de um problema.",
            exampleGoal: "Seguir uma linha marcada e parar quando detectar uma falha ou um trecho marcado como defeito.",
            sensorIdeas: [
              "Sensor de luz ou de cor para seguir a linha",
              "Sensor de distância para detectar um entupimento",
            ],
          },
          {
            name: "Separação",
            scenario: "Itens precisam ser separados em grupos.",
            exampleGoal: "Detectar a cor de um item e virar para a caixa correspondente.",
            sensorIdeas: [
              "Sensor de cor para ler o item",
              "Sensor de toque para confirmar que pegou",
            ],
          },
          {
            name: "Ajuda de acessibilidade",
            scenario: "Alguém precisa de ajuda para fazer uma tarefa do dia a dia.",
            exampleGoal: "Detectar um obstáculo numa passagem e avisar ou liberar um caminho seguro.",
            sensorIdeas: [
              "Sensor de distância para detectar obstáculos",
              "Campainha ou luz como saída de alerta",
            ],
          },
          {
            name: "A sua própria missão",
            scenario: "Você tem uma ideia de robô que ajuda alguém, e ela não está nesta lista. Proponha: desde que ele ande, perceba, decida e pare em segurança, vale.",
            exampleGoal: "Descreva o seu próprio trabalho útil para o robô, e depois cumpra os mesmos componentes obrigatórios das outras missões.",
            sensorIdeas: [
              "Escolha o sensor que combina com o seu trabalho (distância, toque, luz ou cor)",
              "Confirme com o seu professor que a sua ideia cumpre os requisitos",
            ],
          },
        ],
        requirements: [
          {
            label: "Briefing de planejamento",
            description: "A missão, os requisitos e as restrições, escritos antes de construir.",
          },
          {
            label: "Desenho rotulado",
            description: "Um desenho do robô com as partes dele rotuladas.",
          },
          {
            label: "Diagrama de entrada, processamento e saída",
            description: "Um diagrama do que o robô percebe, decide e faz.",
          },
          {
            label: "Fluxograma",
            description: "Um fluxograma passo a passo do programa.",
          },
          {
            label: "Projeto mecânico que anda",
            description: "Uma base estável que anda de forma confiável.",
          },
          {
            label: "Pelo menos um sensor",
            description: "O robô usa um sensor como entrada.",
          },
          {
            label: "Uma sequência",
            description: "O programa executa os passos numa ordem planejada.",
          },
          {
            label: "Um laço",
            description: "O programa repete uma ação ou uma verificação.",
          },
          {
            label: "Uma condição",
            description: "O programa toma uma decisão a partir da leitura de um sensor.",
          },
          {
            label: "Comportamento de parada segura",
            description: "O robô para em segurança ao terminar ou quando fica bloqueado.",
          },
          {
            label: "Três rodadas de teste",
            description: "A missão é rodada e registrada três vezes.",
          },
          {
            label: "Uma melhoria documentada",
            description: "Uma mudança é feita depois do teste e o efeito dela é registrado.",
          },
          {
            label: "Explicação final",
            description: "Uma explicação curta de como o robô ajuda e de como você sabe que ele funciona.",
          },
          {
            label: "Um segundo sensor ou um contador (desafio extra)",
            description: "Um sensor a mais ou uma variável contador, para uma missão mais difícil.",
          },
        ],
        rubric: [
          {
            name: "Problema e planejamento",
            description: "Um problema e uma pessoa usuária bem definidos, mais o briefing, o desenho, o diagrama de entrada, processamento e saída, e o fluxograma.",
            levels: [
              {
                descriptor: "Pouco ou nenhum plano; começou a construir sem um problema, um briefing ou diagramas claros.",
              },
              {
                descriptor: "O problema está enunciado, mas alguns documentos de planejamento estão incompletos ou vagos.",
              },
              {
                descriptor: "Um problema e uma pessoa usuária claros, com briefing, desenho, diagrama de entrada, processamento e saída, e fluxograma completos e coerentes com o que foi construído.",
              },
              {
                descriptor: "O planejamento está completo e claro e mostra requisitos, restrições e trocas bem pensados.",
              },
            ],
          },
          {
            name: "Projeto mecânico ou do ambiente",
            description: "O quanto o robô (ou a missão configurada no simulador) está bem montado para andar e fazer o trabalho.",
            levels: [
              {
                descriptor: "O robô não anda de forma confiável ou se desmancha; ou a montagem da missão não combina com o objetivo.",
              },
              {
                descriptor: "O robô anda, mas balança ou é inconstante; ou o mapa da missão está montado só por alto.",
              },
              {
                descriptor: "Base estável que anda de forma confiável e carrega o sensor dela; ou um mapa de missão que combina com o objetivo.",
              },
              {
                descriptor: "Um projeto firme e bem equilibrado (ou uma missão configurada com capricho) que cai como uma luva no trabalho.",
              },
            ],
          },
          {
            name: "Programação",
            description: "O uso de uma sequência, um laço, uma condição e uma parada segura.",
            levels: [
              {
                descriptor: "Ao programa faltam quase todas as partes obrigatórias, ou ele nem roda.",
              },
              {
                descriptor: "O programa roda, mas está faltando um laço, uma condição ou uma parada segura.",
              },
              {
                descriptor: "O programa usa corretamente uma sequência, um laço, uma condição e uma parada segura.",
              },
              {
                descriptor: "O programa é eficiente e bem estruturado, e resolve a missão com elegância.",
              },
            ],
          },
          {
            name: "Uso do sensor",
            description: "Se o robô percebe o mundo e usa essa leitura para decidir o que fazer.",
            levels: [
              {
                descriptor: "Nenhum sensor é usado, ou a leitura nunca é usada para tomar uma decisão.",
              },
              {
                descriptor: "Um sensor é lido, mas a leitura quase não influencia o que o robô faz.",
              },
              {
                descriptor: "Pelo menos um sensor é lido e um limiar ou uma condição usa isso para conduzir a missão.",
              },
              {
                descriptor: "O uso do sensor é calibrado e confiável, guiando as decisões do robô com precisão.",
              },
            ],
          },
          {
            name: "Testes e melhoria",
            description: "Três rodadas registradas e uma melhoria documentada.",
            levels: [
              {
                descriptor: "Testou pouco; os resultados não foram registrados.",
              },
              {
                descriptor: "Algumas rodadas registradas, mas nenhuma melhoria clara foi feita.",
              },
              {
                descriptor: "Três rodadas registradas e uma melhoria documentada junto com o efeito dela.",
              },
              {
                descriptor: "Testes minuciosos, com evidência clara de que a melhoria aumentou a confiabilidade.",
              },
            ],
          },
          {
            name: "Explicação e uso responsável",
            description: "Explicar de que forma o robô ajuda, como você sabe que ele funciona, e como ele é usado com segurança e responsabilidade.",
            levels: [
              {
                descriptor: "Não consegue explicar com clareza o que o robô faz.",
              },
              {
                descriptor: "Explica o robô, mas não de que forma ele ajuda, como foi testado, nem como ele se mantém seguro.",
              },
              {
                descriptor: "Explica com clareza a missão, como o robô funciona, a evidência dos testes e a parada segura dele.",
              },
              {
                descriptor: "Explica o projeto, as decisões, a evidência e o uso responsável de forma convincente para uma plateia.",
              },
            ],
          },
        ],
        variants: {
          kit: {
            title: "Projeto final num kit de robótica",
            materials: [
              "Kit de robótica com pelo menos um sensor",
              "Todas as páginas do projeto para imprimir",
            ],
            instructions: [
              "Planeje, construa e programe no kit.",
              "Use um sensor de verdade para a condição.",
              "Faça três rodadas de teste físicas e melhore uma coisa.",
            ],
            safetyNotes: [
              "Área de teste livre; fique longe das partes em movimento.",
            ],
            expectedResult: "Um robô físico que cumpre a missão dele de forma confiável e para em segurança.",
            successCriteria: [
              "Cumpre todos os itens obrigatórios da rubrica no nível proficiente ou acima",
            ],
            troubleshooting: [
              {
                problem: "As rodadas saem inconstantes",
                fix: "Padronize a posição de largada e reconfira o limiar do sensor, como na semana 6.",
              },
            ],
            extension: "Acrescente o segundo sensor ou o contador do desafio extra.",
          },
          simulator: {
            title: "Projeto final no simulador do navegador",
            materials: [
              "Simulador no navegador",
              "Todas as páginas do projeto para imprimir",
            ],
            instructions: [
              "Planeje no papel e depois monte a missão de grade e o programa no simulador.",
              "Use um bloco de sensor para a condição.",
              "Rode três vezes a partir da mesma largada e melhore uma coisa.",
            ],
            safetyNotes: [
              "Salve com frequência para uma atualização da página não apagar o trabalho.",
            ],
            expectedResult: "Um robô de simulador que cumpre a missão de grade e para quando termina.",
            successCriteria: [
              "Cumpre todos os itens obrigatórios da rubrica no nível proficiente ou acima",
            ],
            troubleshooting: [
              {
                problem: "O robô se comporta de um jeito diferente a cada rodada",
                fix: "Fixe a casa de largada e faça o laço terminar numa condição de sensor bem definida.",
              },
            ],
            extension: "Rode a missão numa grade maior ou mais cheia de obstáculos.",
          },
          unplugged: {
            title: "Projeto final como robô de papelão com um programa de cartões",
            materials: [
              "Modelo de robô de papelão",
              "Cartões de programa",
              "Grade no chão ou percurso de fita",
            ],
            instructions: [
              "Planeje no papel e construa um modelo com uma parte que se mexe e um sensor improvisado.",
              "Escreva o programa em cartões, com uma sequência, um repetir e um se.",
              "Peça a um colega que \"rode\" três vezes e melhore um passo.",
            ],
            safetyNotes: [
              "Ajuda de um adulto para cortar.",
            ],
            expectedResult: "Um modelo e um programa de cartões que um colega consiga rodar do mesmo jeito duas vezes para cumprir a missão.",
            successCriteria: [
              "Cumpre todos os itens obrigatórios da rubrica no nível proficiente ou acima",
            ],
            troubleshooting: [
              {
                problem: "Cada colega roda de um jeito diferente",
                fix: "Faça de cada cartão uma instrução exata e sem ambiguidade.",
              },
            ],
            extension: "Troquem missões com outra equipe e rodem a missão deles.",
          },
        },
      },
    },
  ],
}

const overlays: LocaleOverlays<RoboticsCurriculum> = { es, zh, pt }

/** The Robotics & Automation curriculum in the requested language. */
export const getRoboticsCurriculum = createLocalizedResolver(
  roboticsCurriculum,
  overlays,
)

/** Whether this course has been translated into `language` at all. */
export function roboticsCurriculumHasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

/** All modules in the requested language, in course order. */
export function getRoboticsModules(language: Language): RoboticsModule[] {
  return [...getRoboticsCurriculum(language).modules].sort((a, b) => a.order - b.order)
}

/** The module with this slug, in the requested language. */
export function findRoboticsModule(language: Language, slug: string): RoboticsModule | undefined {
  return getRoboticsCurriculum(language).modules.find((module) => module.slug === slug)
}
