import type { MathCurriculum, MathLesson } from "./index.ts"
import { mathAdventuresCurriculum } from "./index.ts"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type DeepPartial,
  type LocaleOverlays,
} from "../../../lib/localize-content.ts"
import type { Language } from "../../../i18n/translations.ts"

/**
 * Translations for the Math Adventures course.
 *
 * Sparse overlays merged onto the English `mathAdventuresCurriculum` by
 * `lib/localize-content`. Only prose lives here: slugs, week numbers, hrefs,
 * answer keys, and diagram/accent identifiers stay shared with English so the
 * course cannot structurally drift between locales.
 *
 * Untranslated strings fall through to English automatically, so this file can
 * grow one week at a time.
 */
const es: DeepPartial<MathCurriculum> = {
  title: "Aventuras Matemáticas",
  description: "Un curso de matemáticas de 10 semanas para 2.º a 5.º grado, donde cada semana convierte una gran idea matemática (sentido numérico, operaciones, patrones, valor posicional, fracciones, medición, geometría, tiempo y dinero, y datos) en una aventura práctica, hasta llegar a un proyecto final donde los estudiantes diseñan su propia ciudad matemática.",
  gradeRange: "2.º a 5.º grado",
  estimatedTimePerLesson: "45-60 minutos",
  topics: [
    "Sentido numérico",
    "Operaciones",
    "Patrones",
    "Valor posicional",
    "Fracciones",
    "Medición",
    "Geometría",
    "Tiempo y dinero",
    "Datos y gráficas",
    "Resolución de problemas",
  ],
  finalProjectTitle: "Construye una ciudad matemática",
  finalProjectDescription: "Durante la última semana, los estudiantes diseñan una ciudad de papel sobre una cuadrícula donde cada parte usa las matemáticas que aprendieron: los edificios son figuras geométricas con alturas medidas, una panadería vende productos en fracciones, un banco cuenta dinero y da cambio, y una encuesta a los habitantes de la ciudad se convierte en una gráfica de barras. Los estudiantes presentan su ciudad y explican las matemáticas detrás de tres de sus elementos.",
  lessons: [
    {
      title: "Detectives de números",
      shortTitle: "Detectives de números",
      theme: "La Agencia de Detectives Numéricos: resolver casos con pistas de números",
      description: "Los estudiantes se convierten en detectives que leen las pistas escondidas dentro de un número (qué tan grande es, qué dígitos tiene y cómo se puede separar) para comparar, estimar e identificar números misteriosos.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º a 5.º grado",
      skillFocus: [
        "Sentido numérico",
        "Comparar números",
        "Estimar",
        "Descomponer números",
      ],
      learningGoals: [
        "Comparar dos números usando mayor que (>), menor que (<) e igual a (=), revisando el valor posicional desde el dígito más grande.",
        "Estimar más o menos cuántos objetos hay en un grupo redondeando a la decena o centena más cercana, y explicar por qué no siempre hace falta un conteo exacto.",
        "Descomponer un número en centenas, decenas y unidades (por ejemplo, 256 = 200 + 50 + 6) y volver a armarlo.",
      ],
      keyConcepts: [
        "El valor de un dígito depende del lugar que ocupa en el número.",
        "Para comparar números, alinéalos y revisa primero el lugar más grande.",
        "Estimar da una respuesta rápida y bastante cercana cuando contar con exactitud es lento.",
      ],
      introStory: "La Agencia de Detectives Numéricos acaba de recibir un caso. Alguien dejó una sola pista en la puerta: \"Soy un número de tres dígitos. Mi dígito de las centenas es 4, mi dígito de las decenas es mayor que 7 y mi dígito de las unidades es 0\". El jefe te entrega una lupa y pregunta: \"¿Qué números podrían encajar?\". Para cerrar el caso, vas a tener que leer los números como un detective lee las pistas.",
      mainLesson: [
        "Todo número está hecho de dígitos, y el lugar donde está un dígito te dice cuánto vale. En 256, el 2 no es solo \"dos\": está en el lugar de las centenas, así que significa 200. El 5 está en las decenas, así que significa 50, y el 6 en las unidades significa 6. Leer los lugares de un número es el primer movimiento del detective.",
        "Para comparar dos números, alinéalos por sus lugares y revisa primero el lugar más grande. Al comparar 348 y 384, los dos tienen 3 centenas, así que ahí hay empate. Pasa a las decenas: 348 tiene 4 decenas y 384 tiene 8 decenas. Ocho decenas le ganan a cuatro decenas, así que 384 es mayor. Se escribe 348 < 384. El símbolo siempre se abre hacia el número más grande, como una boca que se come el bocado mayor.",
        "A veces no necesitas el conteo exacto, sino una buena estimación rápida. Estimar significa redondear a un número cercano y fácil de manejar. Si un frasco parece tener unas 60 canicas, no tienes que contar las 58; \"como 60\" es suficiente para comparar frascos o planear un juego.",
        "Descomponer significa separar un número en sus partes. 256 se separa en 200 + 50 + 6. Los detectives hacen esto para ver la estructura escondida de un número, y más adelante en el curso facilita muchísimo sumar y restar.",
      ],
      examples: [
        {
          problem: "Compara 348 y 384 usando >, < o =.",
          explanation: "Las centenas son iguales (3 = 3). Pasa a las decenas: 4 decenas contra 8 decenas. Como 8 decenas es más, 384 es el número mayor, así que 348 es menor que 384.",
        },
        {
          problem: "Descompón 407 en centenas, decenas y unidades.",
          explanation: "El 4 está en el lugar de las centenas (400), no hay decenas (0) y el 7 está en las unidades. El 0 es un marcador de lugar que mantiene al 4 y al 7 en su sitio.",
        },
        {
          problem: "¿Cuánto es 58 redondeado a la decena más cercana?",
          solution: "Como 60",
          explanation: "58 está entre 50 y 60. Como el dígito de las unidades es 8 (que es 5 o más), redondeamos hacia arriba, a 60. \"Como 60\" es suficiente para una estimación rápida.",
        },
      ],
      interactiveActivity: {
        title: "Cacería del número misterioso",
        instructions: [
          "Lee cada pista que aparece arriba de la recta numérica.",
          "Arrastra el marcador del detective hasta el punto de la recta donde debería estar el número misterioso.",
          "Usa las pistas de \"mayor que\" y \"menor que\" para ir cerrando el rango hasta que quede un solo número.",
        ],
        conceptConnection: "Ubicar un número en una recta te obliga a pensar en su tamaño comparado con sus vecinos, que es el mismo razonamiento que usas para comparar y estimar.",
        sampleData: {
          clues: [
            "El número es mayor que 40.",
            "El número es menor que 60.",
            "El dígito de las decenas es impar.",
            "El dígito de las unidades es 0.",
          ],
        },
      },
      handsOnChallenge: {
        title: "Tarjetas de pistas numéricas",
        instructions: [
          "Escribe cinco números distintos de tres dígitos, cada uno en su propia ficha.",
          "En un segundo juego de fichas, escribe una pista para cada número (por ejemplo, \"Tengo 2 centenas y mi dígito de las unidades es 9\").",
          "Intercambia las fichas de pistas con un compañero e intenten emparejar cada pista con el número correcto.",
        ],
        successLooksLike: "Puedes explicar en voz alta por qué una pista corresponde a su número, nombrando el valor de cada lugar (centenas, decenas, unidades).",
      },
      checkpointQuestions: [
        {
          question: "¿Cuál es mayor, 512 o 521? ¿Cómo lo sabes?",
          answer: "521 es mayor. Las centenas son iguales (5 = 5), pero 521 tiene 2 decenas frente a 1 decena de 512, así que 521 gana en el lugar de las decenas.",
        },
        {
          question: "Descompón 630 en sus partes.",
        },
        {
          question: "Redondea 43 a la decena más cercana.",
          answer: "40, porque el dígito de las unidades (3) es menor que 5, así que redondeamos hacia abajo.",
        },
      ],
      reflectionQuestion: "¿Cuándo sería más útil estimar que contar la cantidad exacta? Describe un momento real en el que \"más o menos cuántos\" sea suficiente.",
      challengeProblem: {
        prompt: "Soy un número de tres dígitos entre 300 y 400. Mi dígito de las decenas es el doble de mi dígito de las unidades, y mi dígito de las unidades es 3. ¿Qué número soy?",
        hint: "Empieza por el dígito de las unidades (3) y luego saca el de las decenas duplicándolo. El dígito de las centenas debe mantenerte entre 300 y 400.",
        answer: "363. El dígito de las centenas es 3 (para quedar entre 300 y 400), el de las unidades es 3, y el de las decenas es el doble de 3, o sea 6.",
      },
      extensionChallenge: "Haz un \"cartel de se busca\" para un número misterioso con exactamente cuatro pistas, de modo que solo un número en el mundo cumpla las cuatro. Pruébalo con alguien de tu familia.",
      vocabulary: [
        {
          term: "Dígito",
          definition: "Uno de los símbolos del 0 al 9 con los que se forman los números.",
        },
        {
          term: "Valor posicional",
          definition: "Cuánto vale un dígito según la posición que ocupa (unidades, decenas, centenas).",
        },
        {
          term: "Mayor que (>)",
          definition: "Un símbolo que indica que el número de la izquierda es más grande.",
        },
        {
          term: "Menor que (<)",
          definition: "Un símbolo que indica que el número de la izquierda es más pequeño.",
        },
        {
          term: "Estimar",
          definition: "Una suposición inteligente y bastante cercana, hecha redondeando a un número fácil de manejar.",
        },
        {
          term: "Descomponer",
          definition: "Separar un número en las partes que lo forman, como 256 = 200 + 50 + 6.",
        },
      ],
      materials: [
        "Fichas",
        "Lápiz",
        "Un frasco con objetos pequeños para estimar (opcional)",
      ],
    },
    {
      title: "La misión de las operaciones",
      shortTitle: "La misión de las operaciones",
      theme: "Cuatro héroes en una misión: Suma, Resta, Multiplica y Divide",
      description: "Los estudiantes conocen las cuatro operaciones como personajes con poderes especiales y aprenden a elegir la correcta para cada problema: juntar, quitar, formar grupos iguales o repartir.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º a 5.º grado",
      skillFocus: [
        "Suma",
        "Resta",
        "Pensar con la multiplicación",
        "Pensar con la división",
        "Elegir la operación",
      ],
      learningGoals: [
        "Relacionar un problema con la operación correcta preguntándose qué está pasando: juntar, separar, formar grupos iguales o repartir en partes iguales.",
        "Explicar la multiplicación como grupos iguales repetidos (4 x 3 significa cuatro grupos de tres) y la división como repartir en grupos iguales.",
        "Resolver un problema de dos pasos y explicar qué operación se usó en cada paso.",
      ],
      keyConcepts: [
        "La suma junta cantidades; la resta encuentra una diferencia o quita.",
        "La multiplicación es una forma rápida de sumar grupos iguales.",
        "La división separa un total en grupos iguales o averigua cuántos hay en cada grupo.",
      ],
      introStory: "Un puente se cayó en el camino a la Montaña Matemática, y cuatro héroes dan un paso al frente. Suma puede unir dos grupos en uno. Resta puede encontrar lo que falta. Multiplica puede armar muchos grupos iguales en un instante. Divide puede repartir un tesoro de forma justa. Pero cada héroe solo funciona con el tipo de problema correcto: si eliges mal, el puente sigue roto. Tu misión: mandar al héroe adecuado para cada reto.",
      mainLesson: [
        "El secreto de los problemas escritos no son los números, sino descubrir qué está pasando en la historia. ¿Se están juntando dos grupos? Eso es una suma. ¿Se está quitando algo, o estás comparando para hallar una diferencia? Eso es una resta.",
        "La multiplicación es la heroína de los grupos iguales. \"4 canastas con 3 manzanas cada una\" es 4 x 3 = 12. En lugar de sumar 3 + 3 + 3 + 3, multiplicas. La pista está en las palabras \"cada\" o \"cada uno\": señalan grupos iguales.",
        "La división es la heroína de repartir y separar. Si 12 manzanas se reparten en partes iguales entre 4 amigos, a cada uno le tocan 12 / 4 = 3. La división responde dos tipos de preguntas: \"¿cuántos hay en cada grupo?\" y \"¿cuántos grupos puedo formar?\".",
        "Algunas misiones llevan dos pasos. \"Tienes 20 dólares, compras un libro de 8 y repartes el resto con un amigo\". El primer paso es una resta (20 - 8 = 12). El segundo es una división (12 / 2 = 6). Nombrar la operación en cada paso evita que te pierdas.",
      ],
      examples: [
        {
          problem: "Un salón tiene 6 mesas con 4 estudiantes en cada mesa. ¿Cuántos estudiantes hay?",
          solution: "6 x 4 = 24 estudiantes",
          explanation: "Las palabras \"en cada mesa\" señalan grupos iguales, así que esto es una multiplicación: seis grupos de cuatro son veinticuatro.",
        },
        {
          problem: "Hay 15 galletas para repartir en partes iguales entre 5 niños. ¿Cuántas le tocan a cada uno?",
          solution: "15 / 5 = 3 galletas cada uno",
          explanation: "Repartir en partes iguales es dividir. Separa 15 en 5 grupos iguales; cada grupo tiene 3.",
        },
        {
          problem: "Un juego cuesta $18. Tienes $25. ¿Cuánto te queda después de comprarlo?",
          explanation: "Gastar dinero quita una cantidad, así que esto es una resta. La diferencia entre 25 y 18 es 7.",
        },
      ],
      interactiveActivity: {
        title: "Elige al héroe correcto",
        instructions: [
          "Lee cada tarjeta con un problema conforme va apareciendo.",
          "Arrastra la tarjeta hasta el héroe que necesita: Suma, Resta, Multiplica o Divide.",
          "Después de clasificarlas, resuelve dos de los problemas y revisa tus respuestas.",
        ],
        conceptConnection: "Clasificar problemas por operación crea el hábito de preguntarse \"¿qué está pasando aquí?\" antes de lanzarse a los números, que es la habilidad más importante en los problemas escritos.",
        sampleData: {
          problems: [
            {
              text: "8 canicas rojas y 5 canicas azules juntas",
            },
            {
              text: "Un listón de 12 cm de largo, se cortan 5 cm",
            },
            {
              text: "3 filas de 6 sillas",
            },
            {
              text: "20 calcomanías repartidas entre 4 niños",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "Duelo de operaciones con dados",
        instructions: [
          "Tira dos dados para obtener dos números.",
          "Saca una tarjeta de operación (+, -, x o /) de un montón boca abajo.",
          "Resuelve el problema que forman tu tirada y tu tarjeta; si la tarjeta es de división y no da una división exacta, vuelve a tirar un dado.",
          "Anota un punto por cada respuesta correcta y jueguen hasta 10.",
        ],
        successLooksLike: "Puedes hacer las cuatro operaciones con números pequeños y contar rápidamente una historia que corresponda a cada tirada.",
      },
      checkpointQuestions: [
        {
          question: "¿Qué operación resuelve \"5 bolsas con 7 manzanas cada una\"? ¿Cuál es la respuesta?",
          answer: "La multiplicación. 5 x 7 = 35 manzanas.",
        },
        {
          question: "Escribe 4 + 4 + 4 como una multiplicación.",
          answer: "3 x 4 = 12 (tres grupos de cuatro).",
        },
        {
          question: "24 lápices repartidos en cajas de 6. ¿Cuántas cajas hay?",
          answer: "División: 24 / 6 = 4 cajas.",
        },
      ],
      reflectionQuestion: "¿Cómo puedes darte cuenta de si un problema necesita multiplicación o suma? ¿Qué palabra o pista te ayuda a decidir?",
      challengeProblem: {
        prompt: "Una panadera hace 4 charolas de panquecitos con 6 panquecitos en cada charola. Vende 9 panquecitos. ¿Cuántos panquecitos le quedan?",
        hint: "Esta misión tiene dos pasos. Primero halla el total de panquecitos y luego quita los que vendió.",
        answer: "15 panquecitos. Paso 1: 4 x 6 = 24 panquecitos hechos. Paso 2: 24 - 9 = 15 panquecitos restantes.",
      },
      extensionChallenge: "Escribe tu propio problema de dos pasos donde el primero sea una multiplicación y el segundo una resta. Dáselo a alguien y comprueba que nombre las dos operaciones.",
      vocabulary: [
        {
          term: "Operación",
          definition: "Una acción matemática: sumar, restar, multiplicar o dividir.",
        },
        {
          definition: "El resultado de una suma.",
        },
        {
          term: "Diferencia",
          definition: "El resultado de una resta.",
        },
        {
          term: "Producto",
          definition: "El resultado de una multiplicación.",
        },
        {
          term: "Cociente",
          definition: "El resultado de una división.",
        },
        {
          term: "Grupos iguales",
          definition: "Grupos que tienen todos la misma cantidad de cosas, el corazón de multiplicar y dividir.",
        },
      ],
      materials: [
        "Dos dados",
        "Fichas para los símbolos de las operaciones",
        "Lápiz y papel",
      ],
    },
    {
      title: "La máquina de patrones",
      shortTitle: "La máquina de patrones",
      theme: "La máquina de patrones: dale un número y descubre su regla",
      description: "Los estudiantes encuentran y continúan patrones, cuentan salteado y descifran la regla escondida de una máquina de entrada y salida, aprendiendo que una regla que puedes nombrar te deja predecir lo que sigue.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º a 5.º grado",
      skillFocus: [
        "Patrones",
        "Sucesiones",
        "Contar salteado",
        "Reglas de entrada y salida",
      ],
      learningGoals: [
        "Continuar un patrón numérico creciente o repetido y describir su regla con palabras (por ejemplo, \"sumar 5 cada vez\").",
        "Contar salteado de 2 en 2, de 5 en 5, de 10 en 10, de 3 en 3 y de 4 en 4, y conectar el conteo salteado con la multiplicación.",
        "Descubrir la regla de una máquina de entrada y salida comparando lo que entra con lo que sale.",
      ],
      keyConcepts: [
        "Un patrón sigue una regla, y nombrar la regla te permite predecir el siguiente término.",
        "Contar salteado es sumar repetidamente y es la base de la multiplicación.",
        "Una regla de entrada y salida le hace lo mismo a todos los números que le des.",
      ],
      introStory: "Al fondo del taller está la máquina de patrones, llena de engranes y perillas. Le echas un 2 por arriba y por abajo sale un 6. Le echas un 5 y sale un 15. La máquina no te va a contar su secreto, pero si observas con atención, puedes descubrir la regla que está usando. Y una vez que sepas la regla, podrás predecir todos los números que llegue a producir.",
      mainLesson: [
        "Un patrón es una sucesión que sigue una regla. En 3, 6, 9, 12, ... la regla es \"sumar 3 cada vez\". Una vez que nombras la regla, puedes saltar hacia adelante: el siguiente término es 15, y no tuviste que dibujar cada paso para saberlo.",
        "Contar salteado es un patrón que ya conoces. Contar de 5 en 5 (5, 10, 15, 20) es sumar 5 una y otra vez. Por eso mismo contar salteado y multiplicar son primos hermanos: contar de 5 en 5 cuatro veces te lleva a 20, y 4 x 5 = 20.",
        "Los patrones pueden repetirse (rojo, azul, rojo, azul) o crecer (2, 4, 8, 16, donde la regla es \"duplicar\"). El truco está en fijarte en qué cambia de un término al siguiente. Si cada vez se suma la misma cantidad, la regla es \"sumar esa cantidad\".",
        "Una máquina de entrada y salida le aplica una sola regla a cada entrada. Si el 2 se convierte en 6 y el 5 en 15, la máquina multiplica por 3. Comprueba tu regla con un tercer par para estar seguro: una buena regla funciona con todas las entradas, no solo con una.",
      ],
      examples: [
        {
          problem: "¿Qué sigue: 4, 8, 12, 16, ___?",
          explanation: "Cada término sube de 4 en 4 (la regla es \"sumar 4\"). 16 + 4 = 20. Esto también es contar salteado de 4 en 4.",
        },
        {
          problem: "Una máquina convierte el 3 en 8, el 5 en 10 y el 6 en 11. ¿Cuál es su regla?",
          solution: "Sumar 5",
          explanation: "Compara cada entrada con su salida: de 3 a 8 es +5, de 5 a 10 es +5, de 6 a 11 es +5. La misma regla funciona en los tres casos, así que la regla es \"sumar 5\".",
        },
        {
          problem: "Cuenta salteado de 5 en 5 para hallar 6 x 5.",
          explanation: "5, 10, 15, 20, 25, 30: seis saltos de cinco caen en 30, que es exactamente 6 x 5.",
        },
      ],
      interactiveActivity: {
        title: "Descifra la regla de la máquina",
        instructions: [
          "Observa cómo la máquina convierte cada número de entrada en una salida.",
          "Después de tres ejemplos, escribe cuál crees que es la regla (como \"x 2\" o \"+ 4\").",
          "Dale un número más a la máquina para comprobar tu regla antes de confirmarla.",
        ],
        conceptConnection: "Adivinar la regla a partir de pares de entrada y salida es el mismo razonamiento que hallar el patrón de una sucesión: buscas lo que se mantiene igual de un paso al siguiente.",
      },
      handsOnChallenge: {
        title: "Arma una cadena de patrones",
        instructions: [
          "Usa tiras de papel o cuentas de dos colores para armar un patrón que se repita, de al menos 12 elementos.",
          "Junto a él, arma un patrón numérico creciente con rayitas o puntos (empieza con una regla como \"sumar 3\").",
          "Pídele a un compañero que nombre las dos reglas y prediga los siguientes tres términos.",
        ],
        successLooksLike: "Tu compañero puede decir con palabras la regla de cada patrón y continuarlo correctamente tres pasos más.",
      },
      checkpointQuestions: [
        {
          question: "Continúa el patrón: 10, 20, 30, 40, ___, ___.",
          answer: "50, 60 (la regla es \"sumar 10\", o contar salteado de 10 en 10).",
        },
        {
          question: "Una máquina convierte el 4 en 12 y el 6 en 18. ¿Cuál es la regla?",
          answer: "Multiplicar por 3 (4 x 3 = 12, 6 x 3 = 18).",
        },
        {
          question: "¿Cómo se relaciona contar de 2 en 2 con la multiplicación?",
          answer: "Cada salto suma 2, así que contar de 2 en 2 cinco veces es igual a 5 x 2 = 10.",
        },
      ],
      reflectionQuestion: "¿Por qué es útil conocer la regla de un patrón y no solo el siguiente número? ¿Qué puede hacer una regla que una sola respuesta no puede?",
      challengeProblem: {
        prompt: "Una máquina convierte el 1 en 3, el 2 en 5 y el 3 en 7. ¿Qué hará con el 10?",
        hint: "Esta regla tiene dos pasos. Fíjate en que la salida sube de 2 en 2 cada vez que la entrada sube de 1 en 1, así que hay una multiplicación de por medio, más un poquito extra.",
        answer: "21. La regla es \"multiplicar por 2 y luego sumar 1\" (1x2+1=3, 2x2+1=5, 3x2+1=7). Para el 10: 10 x 2 + 1 = 21.",
      },
      extensionChallenge: "Inventa una regla de máquina de dos pasos (como \"x 3 y luego - 1\"), haz una tabla con cuatro entradas y salidas, y rétate a alguien a descifrarla.",
      vocabulary: [
        {
          term: "Patrón",
          definition: "Una sucesión que sigue una regla que puedes nombrar.",
        },
        {
          term: "Regla",
          definition: "La instrucción que te dice cómo pasar de un término al siguiente.",
        },
        {
          term: "Sucesión",
          definition: "Una lista ordenada de números o figuras.",
        },
        {
          term: "Contar salteado",
          definition: "Contar hacia adelante sumando la misma cantidad cada vez, como 5, 10, 15.",
        },
        {
          term: "Entrada",
          definition: "El número que le das a una máquina o a una regla.",
        },
        {
          term: "Salida",
          definition: "El número que sale después de aplicar la regla.",
        },
      ],
      materials: [
        "Tiras de papel de colores o cuentas",
        "Lápiz y papel para las tablas",
      ],
    },
    {
      title: "La ciudad del valor posicional",
      shortTitle: "La ciudad del valor posicional",
      theme: "La ciudad del valor posicional: cada dígito vive en su propia calle",
      description: "Los estudiantes exploran cómo las unidades, decenas, centenas y unidades de millar tienen cada una su \"calle\" dentro de un número, escriben números en forma desarrollada y comparan números grandes revisando primero el lugar más grande.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º a 5.º grado",
      skillFocus: [
        "Unidades, decenas, centenas y unidades de millar",
        "Forma desarrollada",
        "Comparar números",
      ],
      learningGoals: [
        "Identificar el valor de cada dígito en números de hasta cuatro cifras.",
        "Escribir un número en forma desarrollada (2,345 = 2,000 + 300 + 40 + 5) y volver a la forma normal.",
        "Comparar números de cuatro cifras empezando por el valor posicional más grande.",
      ],
      keyConcepts: [
        "Cada lugar vale diez veces el lugar que está a su derecha.",
        "La forma desarrollada muestra el valor que se esconde dentro de cada dígito.",
        "Comparar empieza en el lugar más grande y avanza a la derecha hasta que los dígitos son distintos.",
      ],
      introStory: "Bienvenido a la ciudad del valor posicional, donde cada dígito tiene su dirección. Las unidades viven en la calle de las Unidades, las decenas en la avenida de las Decenas, las centenas en el bulevar de las Centenas, y las unidades de millar allá arriba en la loma de los Millares. Mueve un dígito a otra calle y su valor entero cambia: un 7 en la calle de las Unidades vale 7, pero muévelo al bulevar de las Centenas y de pronto vale 700. Hoy tú eres quien planea la ciudad.",
      mainLesson: [
        "En nuestro sistema numérico, cada lugar vale diez veces el que está a su derecha. Primero las unidades, luego las decenas (diez unidades), después las centenas (diez decenas) y luego los millares (diez centenas). Por eso, mover un dígito una calle hacia la izquierda lo hace diez veces más grande.",
        "En 2,345 el 2 vive en la loma de los Millares y vale 2,000; el 3 vale 300; el 4 vale 40; y el 5 vale 5. Leer cada dígito según su calle es como hallas su verdadero valor.",
        "La forma desarrollada escribe esos valores como una suma: 2,345 = 2,000 + 300 + 40 + 5. Hace visible la estructura escondida y ayuda muchísimo al sumar o restar números grandes.",
        "Para comparar dos números, empieza en el lugar más grande y avanza a la derecha hasta que los dígitos sean distintos. Al comparar 3,412 y 3,398: los millares empatan (3 = 3), pero en el lugar de las centenas el 4 le gana al 3, así que 3,412 es mayor. Una vez que hallas una diferencia, ya no tienes que revisar los lugares más pequeños.",
      ],
      examples: [
        {
          problem: "¿Cuál es el valor del 6 en 4,682?",
          explanation: "El 6 está en el lugar de las centenas (el bulevar de las Centenas), así que vale 6 centenas, o sea 600.",
        },
        {
          problem: "Escribe 5,207 en forma desarrollada.",
          explanation: "5 millares + 2 centenas + 0 decenas + 7 unidades. El 0 muestra que no hay decenas, pero mantiene a los demás dígitos en su lugar.",
        },
        {
          problem: "Compara 3,412 y 3,398.",
          explanation: "Los millares son iguales (3 = 3). En el lugar de las centenas, 4 es mayor que 3, así que 3,412 es el número más grande. No hace falta revisar las decenas ni las unidades.",
        },
      ],
      interactiveActivity: {
        title: "Arma la dirección",
        instructions: [
          "Lee el número objetivo que aparece arriba.",
          "Arrastra las fichas de dígitos a las calles correctas: Millares, Centenas, Decenas y Unidades.",
          "Comprueba lo que armaste leyendo la forma desarrollada que muestra la ciudad.",
        ],
        conceptConnection: "Poner cada dígito en la calle correcta vuelve concreta la idea abstracta del valor posicional: ves que el mismo dígito significa cantidades distintas en calles distintas.",
      },
      handsOnChallenge: {
        title: "Volteo de tarjetas de valor posicional",
        instructions: [
          "Haz cuatro columnas rotuladas en una hoja: Millares, Centenas, Decenas, Unidades.",
          "Saca tarjetas de dígitos (0-9) y coloca cada una en la columna que quieras para formar un número.",
          "Compite con un compañero para formar el número más grande posible, y luego digan cada número en forma desarrollada para demostrar cuál es mayor.",
        ],
        successLooksLike: "Puedes formar un número de cuatro cifras, leer el valor de cada dígito y usar la forma desarrollada para justificar qué número es mayor.",
      },
      checkpointQuestions: [
        {
          question: "¿Cuál es el valor del 8 en 8,140?",
          answer: "8,000 (está en el lugar de los millares).",
        },
        {
          question: "Escribe 3,406 en forma desarrollada.",
        },
        {
          question: "¿Cuál es mayor, 6,721 o 6,712?",
          answer: "6,721. Los millares y las centenas empatan; en el lugar de las decenas, el 2 le gana al 1.",
        },
      ],
      reflectionQuestion: "¿Por qué el mismo dígito, como el 5, significa cantidades distintas en 5,000, 500 y 50? Explícalo usando la idea de calles o lugares.",
      challengeProblem: {
        prompt: "Usa los dígitos 4, 0, 7 y 2 exactamente una vez cada uno para formar el mayor número posible de cuatro cifras y el menor número posible de cuatro cifras. ¿Cuál es la diferencia entre ellos?",
        hint: "Para el mayor, pon los dígitos más grandes a la izquierda. Para el menor, pon los dígitos pequeños a la izquierda, pero un número no puede empezar con 0.",
        answer: "El mayor es 7,420 y el menor es 2,047. Su diferencia es 7,420 - 2,047 = 5,373.",
      },
      extensionChallenge: "Extiende la ciudad del valor posicional hasta las decenas de millar. Forma un número de cinco cifras, escríbelo en forma desarrollada y explica qué tan lejos está la torre de las Decenas de Millar de la calle de las Unidades.",
      vocabulary: [
        {
          term: "Lugar de las unidades",
          definition: "El lugar de más a la derecha, donde se cuentan las unidades sueltas.",
        },
        {
          term: "Lugar de las decenas",
          definition: "El lugar que vale diez veces las unidades.",
        },
        {
          term: "Lugar de las centenas",
          definition: "El lugar que vale diez veces las decenas.",
        },
        {
          term: "Lugar de los millares",
          definition: "El lugar que vale diez veces las centenas.",
        },
        {
          term: "Forma desarrollada",
          definition: "Un número escrito como la suma del valor de cada dígito, como 300 + 40 + 5.",
        },
        {
          term: "Forma normal",
          definition: "Un número escrito de la manera común, con los dígitos uno junto a otro, como 345.",
        },
      ],
      materials: [
        "Tarjetas de dígitos del 0 al 9",
        "Una hoja con columnas rotuladas de valor posicional",
        "Lápiz",
      ],
    },
    {
      title: "La pizzería de las fracciones",
      shortTitle: "La pizzería de las fracciones",
      theme: "La pizzería de las fracciones: cada rebanada cuenta una historia",
      description: "Los estudiantes atienden una pizzería para aprender que una fracción nombra partes iguales de un entero (el denominador dice en cuántas partes iguales se corta el entero y el numerador dice cuántas se usan) y comparan y encuentran fracciones equivalentes con modelos de pizza y de barras de fracciones.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º a 5.º grado",
      skillFocus: [
        "Las fracciones como partes iguales",
        "Numerador y denominador",
        "Comparar fracciones sencillas",
        "Fracciones equivalentes",
      ],
      learningGoals: [
        "Explicar que el denominador dice en cuántas partes iguales se divide un entero y el numerador dice cuántas de esas partes se usan.",
        "Comparar dos fracciones con el mismo denominador, y usar un modelo para comparar fracciones como 1/2 y 1/3.",
        "Mostrar con modelos de pizza o de barras de fracciones que fracciones como 1/2 y 2/4 son equivalentes.",
      ],
      keyConcepts: [
        "Las fracciones solo funcionan cuando las partes son iguales.",
        "El denominador es la cantidad de partes iguales; el numerador es cuántas tomas.",
        "Fracciones distintas pueden nombrar la misma cantidad (fracciones equivalentes).",
      ],
      introStory: "El negocio va viento en popa en la pizzería de las fracciones. Un cliente pide \"media pizza\", el siguiente quiere \"tres cuartos\" y un tercero pide \"dos sextos\". El detalle: cada pizza debe cortarse en rebanadas iguales, o los pedidos no serán justos. Como cocinero de hoy, vas a aprender a leer cada pedido como una fracción, y a detectar cuándo dos pedidos distintos son en secreto la misma cantidad.",
      mainLesson: [
        "Una fracción describe partes iguales de un entero. El número de abajo, el denominador, dice en cuántas partes iguales se corta el entero. El número de arriba, el numerador, dice de cuántas de esas partes estás hablando. En 3/4, la pizza está cortada en 4 rebanadas iguales y tú tienes 3 de ellas.",
        "Que las partes sean iguales importa. Si cortas una pizza en cuatro pedazos pero uno es enorme y tres son diminutos, no puedes llamarle \"1/4\" a un pedacito. Un cuarto significa una de cuatro rebanadas iguales. Esta es la regla que hace justas a las fracciones.",
        "Cuando dos fracciones tienen el mismo denominador, la que tiene el numerador más grande es mayor: 3/4 es más que 1/4 porque tienes más rebanadas del mismo tamaño. Cuando los denominadores son distintos, un modelo ayuda: corta una pizza en mitades y otra en tercios, y verás que 1/2 es más grande que 1/3, porque dividir en menos partes hace que cada parte sea más grande.",
        "Algunas fracciones se ven distintas pero nombran la misma cantidad. Corta una pizza a la mitad y luego corta cada mitad otra vez: ahora tienes cuatro pedazos, y dos de ellos (2/4) cubren exactamente lo mismo que la mitad original (1/2). Las fracciones que nombran la misma cantidad se llaman equivalentes.",
      ],
      examples: [
        {
          problem: "En la fracción 5/8, ¿qué significa cada número?",
          solution: "8 = partes iguales del entero; 5 = partes que se usan",
          explanation: "El denominador 8 dice que el entero se corta en 8 rebanadas iguales. El numerador 5 dice que estamos hablando de 5 de esas rebanadas.",
        },
        {
          problem: "¿Cuál es mayor, 2/3 o 1/3?",
          explanation: "Tienen el mismo denominador (tercios), así que compara los numeradores: 2 rebanadas del mismo tamaño son más que 1 rebanada.",
        },
        {
          problem: "¿1/2 es equivalente a 2/4?",
          explanation: "Cortar cada mitad de una pizza en dos da cuatro pedazos iguales; dos de ellos (2/4) cubren la misma cantidad que una mitad (1/2), así que son equivalentes.",
        },
      ],
      interactiveActivity: {
        title: "Prepara el pedido de pizza",
        instructions: [
          "Lee el pedido del cliente, como \"3/4 de una pizza\".",
          "Ajusta la cantidad de rebanadas iguales para que coincida con el denominador, y luego sombrea rebanadas para que coincidan con el numerador.",
          "En las rondas de bonificación, arrastra una segunda pizza para mostrar una fracción equivalente al mismo pedido.",
        ],
        conceptConnection: "Ajustar primero el denominador (las rebanadas) y después el numerador (las rebanadas sombreadas) vuelve concretas las dos funciones de una fracción y hace difícil confundirlas.",
      },
      handsOnChallenge: {
        title: "Fracciones con pizzas de papel",
        instructions: [
          "Recorta tres círculos de papel (\"pizzas\") del mismo tamaño.",
          "Dobla y corta uno en mitades, otro en cuartos y otro en octavos, cuidando que las rebanadas queden iguales.",
          "Arma pedidos combinando rebanadas y luego halla dos maneras distintas de formar una mitad (por ejemplo, 2/4 y 4/8).",
        ],
        successLooksLike: "Puedes poner unas rebanadas encima de otras para demostrar que dos fracciones son equivalentes y explicar por qué las partes tienen que ser iguales.",
      },
      checkpointQuestions: [
        {
          question: "En 4/6, ¿cuál número es el denominador y qué te dice?",
          answer: "El 6 es el denominador; te dice que el entero está cortado en 6 partes iguales.",
        },
        {
          question: "¿Cuál es mayor, 3/5 o 2/5?",
          answer: "3/5, porque con quintos iguales, tres partes son más que dos.",
        },
        {
          question: "Nombra una fracción equivalente a 1/2.",
          answer: "2/4 (también 3/6 o 4/8): todas nombran la misma cantidad.",
        },
      ],
      reflectionQuestion: "¿Por qué los pedazos de una pizza tienen que ser iguales antes de que podamos llamarle \"1/4\" a un pedazo? ¿Qué sale mal si no son iguales?",
      challengeProblem: {
        prompt: "María se comió 2/4 de una pizza y Sam se comió 1/2 de una pizza idéntica. ¿Quién comió más, o comieron lo mismo? Demuéstralo.",
        hint: "Prueba dibujar las dos pizzas con rebanadas iguales, o halla una fracción equivalente a una de las cantidades para que ambas tengan el mismo denominador.",
        answer: "Comieron lo mismo. 2/4 es equivalente a 1/2, así que los dos se comieron media pizza.",
      },
      extensionChallenge: "Diseña un menú de pizzería con tres promociones escritas como fracciones, y luego halla una fracción equivalente para cada promoción, para que los clientes vean que están recibiendo una cantidad justa.",
      vocabulary: [
        {
          term: "Fracción",
          definition: "Un número que nombra partes iguales de un entero.",
        },
        {
          term: "Numerador",
          definition: "El número de arriba; cuántas partes iguales tienes.",
        },
        {
          term: "Denominador",
          definition: "El número de abajo; en cuántas partes iguales se divide el entero.",
        },
        {
          term: "Entero",
          definition: "La cosa completa, antes de cortarla en partes.",
        },
        {
          term: "Fracciones equivalentes",
          definition: "Fracciones distintas que nombran la misma cantidad, como 1/2 y 2/4.",
        },
        {
          term: "Partes iguales",
          definition: "Partes que son exactamente del mismo tamaño.",
        },
      ],
      materials: [
        "Círculos de papel",
        "Tijeras",
        "Crayones o marcadores",
      ],
    },
    {
      title: "Misión medición",
      shortTitle: "Misión medición",
      theme: "Misión medición: elige la herramienta y la unidad correctas para cada trabajo",
      description: "Los estudiantes miden longitud, altura, peso y capacidad, estiman antes de medir y aprenden a elegir la unidad sensata: un lápiz se mide en centímetros, no en kilómetros.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º a 5.º grado",
      skillFocus: [
        "Longitud y altura",
        "Peso",
        "Capacidad",
        "Estimación",
        "Unidades apropiadas",
      ],
      learningGoals: [
        "Medir longitud y altura con una regla y leer la medida hasta la unidad más cercana.",
        "Elegir una unidad apropiada para cada objeto (centímetros o metros, gramos o kilogramos, mililitros o litros).",
        "Estimar primero una medida, luego medir, y comparar qué tan cerca estuvo la estimación.",
      ],
      keyConcepts: [
        "Medir responde \"¿cuánto?\": qué tan largo, qué tan pesado, cuánto le cabe.",
        "La unidad correcta va de acuerdo con el tamaño del objeto.",
        "Estimar primero te convierte, con el tiempo, en alguien que mide mejor y más rápido.",
      ],
      introStory: "El centro de control tiene un problema: los planos de la nueva casa club anotan todos los tamaños como \"medio grande\" y \"algo pesado\". Con eso nadie puede construir. Tu misión es medir lo real (el largo de la puerta, la altura del estante, el peso de la caja de herramientas y cuánta agua le cabe al garrafón) y reportar cada dato con un número y la unidad correcta.",
      mainLesson: [
        "Medir significa comparar un objeto con una unidad y contar cuántas unidades caben. Una regla marcada en centímetros te deja contar cuántos centímetros mide un lápiz. Alinea la marca del cero con un extremo y lee el número en el otro extremo.",
        "La longitud y la altura usan unidades como centímetros y metros. El peso (qué tan pesado es algo) usa gramos y kilogramos. La capacidad (cuánto le cabe a un recipiente) usa mililitros y litros. Emparejar la medida con su familia de unidades es el primer paso de cualquier medición.",
        "La unidad correcta va de acuerdo con el tamaño del objeto. Un lápiz mide unos 18 centímetros; medirlo en metros daría un número diminuto e incómodo como 0.18. Una puerta mide unos 2 metros; medirla en centímetros (200) funciona, pero los metros son más cómodos. Las cosas grandes llevan unidades grandes; las pequeñas, unidades pequeñas.",
        "Quienes miden bien estiman primero. Antes de medir el estante, adivina: \"como 1 metro\". Luego mide y compara. Cada vez que confrontas tu estimación con el número real, tus estimaciones se afinan, y esa es una habilidad que ahorra tiempo cuando no necesitas un número exacto.",
      ],
      examples: [
        {
          problem: "¿Qué unidad es mejor para medir el largo de un salón: centímetros o metros?",
          solution: "Metros",
          explanation: "Un salón mide varios metros de largo. Usar centímetros daría un número enorme e incómodo, así que los metros son la unidad sensata.",
        },
        {
          problem: "Una botella de agua contiene unos 500 de qué unidad.",
          solution: "Mililitros",
          explanation: "La capacidad de una botella pequeña se mide en mililitros; 500 mL es medio litro, el tamaño típico de una botella.",
        },
        {
          problem: "Estimas que un libro mide 20 cm de alto y al medirlo son 24 cm. ¿Por cuánto te equivocaste?",
          explanation: "Resta la estimación de la medida real: 24 - 20 = 4 cm. Tu estimación estuvo cerca, solo 4 centímetros por debajo.",
        },
      ],
      interactiveActivity: {
        title: "Estima y luego mide",
        instructions: [
          "Observa cada objeto que aparece y elige la mejor unidad entre las opciones.",
          "Escribe tu estimación de la medida.",
          "Revela la medida real y observa qué tan cerca estuvo tu estimación; gana puntos por elegir bien la unidad y por acercarte.",
        ],
        conceptConnection: "Elegir una unidad y estimar antes de medir desarrolla el sentido numérico del tamaño: aprendes cuánto es realmente un centímetro, un kilogramo y un litro.",
        sampleData: {
          items: [
            {
              object: "lápiz nuevo",
            },
            {
              object: "puerta del salón",
            },
            {
              object: "bolsa de manzanas",
            },
            {
              object: "jugo en caja",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "Búsqueda del tesoro: mide el cuarto",
        instructions: [
          "Haz una lista de cinco objetos a tu alrededor (un libro, una cuchara, una silla, una taza, un zapato).",
          "Para cada uno, escribe primero tu estimación y la unidad que vas a usar.",
          "Mide cada objeto con una regla, una báscula o una taza medidora y anota el número real junto a tu estimación.",
        ],
        successLooksLike: "Tu tabla muestra una estimación, una unidad elegida y una medida real para cada objeto, y puedes señalar cuáles estimaciones estuvieron más cerca.",
      },
      checkpointQuestions: [
        {
          question: "¿Qué unidad usarías para pesar una sandía: gramos o kilogramos?",
          answer: "Kilogramos: una sandía es pesada, así que los kilogramos dan un número sensato.",
        },
        {
          question: "¿Qué mide la capacidad de un recipiente?",
          answer: "Cuánto le cabe (por ejemplo, mililitros o litros de agua).",
        },
        {
          question: "Estimaste 30 cm y mediste 27 cm. ¿Por cuánto te equivocaste?",
          answer: "3 cm (30 - 27 = 3).",
        },
      ],
      reflectionQuestion: "¿Por qué importa elegir la unidad correcta? Describe un objeto y una unidad que serían una pareja absurda.",
      challengeProblem: {
        prompt: "Un listón mide 2 metros de largo. Le cortas tres pedazos, cada uno de 40 centímetros. ¿Cuántos centímetros de listón quedan?",
        hint: "Primero convierte los 2 metros a centímetros (1 metro = 100 cm). Después resta los pedazos que cortaste.",
        answer: "Quedan 80 cm. 2 metros = 200 cm; tres pedazos de 40 cm son 120 cm cortados; 200 - 120 = 80 cm restantes.",
      },
      extensionChallenge: "Mide la estatura de tres familiares en centímetros y ordénalos del más bajo al más alto, y luego halla la diferencia entre el más alto y el más bajo.",
      vocabulary: [
        {
          term: "Longitud",
          definition: "Qué tan largo es algo de un extremo al otro.",
        },
        {
          term: "Altura",
          definition: "Qué tan alto es algo de abajo hacia arriba.",
        },
        {
          term: "Peso",
          definition: "Qué tan pesado es algo.",
        },
        {
          term: "Capacidad",
          definition: "Cuánto le cabe a un recipiente.",
        },
        {
          term: "Unidad",
          definition: "Una cantidad estándar que se usa para medir, como un centímetro o un litro.",
        },
        {
          term: "Estimación",
          definition: "Una suposición bastante cercana que se hace antes de medir con exactitud.",
        },
      ],
      materials: [
        "Regla o cinta métrica",
        "Báscula de cocina (opcional)",
        "Taza medidora (opcional)",
        "Papel para una tabla",
      ],
    },
    {
      title: "Explorador de geometría",
      shortTitle: "Explorador de geometría",
      theme: "Explorador de geometría: trazar el mapa del mundo de las figuras",
      description: "Los estudiantes exploran figuras en 2D y cuerpos en 3D por sus atributos (lados, esquinas, caras, aristas y vértices) y descubren ejes de simetría doblando figuras para que las dos mitades coincidan.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º a 5.º grado",
      skillFocus: [
        "Figuras en 2D",
        "Cuerpos en 3D",
        "Lados y esquinas",
        "Caras y aristas",
        "Simetría",
      ],
      learningGoals: [
        "Nombrar figuras en 2D contando sus lados y esquinas (un triángulo tiene 3 lados y 3 esquinas).",
        "Describir cuerpos en 3D por sus caras, aristas y vértices (un cubo tiene 6 caras, 12 aristas y 8 vértices).",
        "Hallar un eje de simetría doblando una figura para que las dos mitades coincidan exactamente.",
      ],
      keyConcepts: [
        "Las figuras en 2D son planas; contamos sus lados y esquinas.",
        "Los cuerpos en 3D son sólidos; contamos sus caras, aristas y vértices.",
        "Una figura tiene un eje de simetría cuando se puede doblar en dos mitades que coinciden.",
      ],
      introStory: "Eres el explorador de geometría más nuevo, y el mapa que tienes enfrente está lleno de figuras que nadie ha nombrado todavía. Algunas son planas, como las losetas de un piso; otras son sólidas, como bloques que puedes sostener. Tu equipo de explorador es sencillo: cuenta los lados, cuenta las esquinas, cuenta las caras y las aristas, y dobla para hallar la simetría escondida. Cada figura que describas correctamente queda marcada en el mapa.",
      mainLesson: [
        "Las figuras planas se llaman figuras en 2D (de dos dimensiones). Las identificamos contando lados (los bordes rectos) y esquinas, también llamadas vértices (donde se juntan dos lados). Un triángulo tiene 3 lados y 3 esquinas; un cuadrado tiene 4 lados iguales y 4 esquinas; un pentágono tiene 5 lados y 5 esquinas.",
        "Los cuerpos sólidos son en 3D (de tres dimensiones): los puedes sostener. Los describimos por sus caras (las superficies planas), aristas (donde se juntan dos caras) y vértices (las esquinas en punta). Un cubo tiene 6 caras cuadradas, 12 aristas y 8 vértices. Una caja rectangular (prisma rectangular) tiene los mismos conteos, pero sus caras son rectángulos.",
        "Las figuras en 2D y los cuerpos en 3D están conectados: las caras de un cuerpo en 3D son figuras en 2D. Las caras de un cubo son cuadrados; una lata (cilindro) tiene dos caras circulares. Conocer las figuras planas te ayuda a describir los sólidos que forman.",
        "Una figura tiene un eje de simetría si puedes doblarla de modo que las dos mitades queden exactamente una encima de la otra. Un cuadrado tiene 4 ejes de simetría; un rectángulo tiene 2; un corazón tiene 1 (justo por la mitad). Doblar es la prueba más segura: si las mitades no coinciden, ese doblez no es un eje de simetría.",
      ],
      examples: [
        {
          problem: "¿Cuántos lados y esquinas tiene un hexágono?",
          solution: "6 lados y 6 esquinas",
          explanation: "\"Hexa\" significa seis. Un hexágono tiene 6 lados rectos, y cada par de lados se junta en una esquina, así que también tiene 6 esquinas.",
        },
        {
          problem: "¿Cuántas caras, aristas y vértices tiene un cubo?",
          solution: "6 caras, 12 aristas, 8 vértices",
          explanation: "Un cubo es como una caja con 6 caras cuadradas. Cada lugar donde se juntan dos caras es una arista (hay 12), y cada esquina en punta es un vértice (hay 8).",
        },
        {
          problem: "¿Cuántos ejes de simetría tiene un rectángulo (que no sea cuadrado)?",
          explanation: "Puedes doblar un rectángulo por la mitad de arriba abajo y de izquierda a derecha, y las dos mitades coinciden, pero los dobleces diagonales no coinciden, así que hay 2 ejes de simetría.",
        },
      ],
      interactiveActivity: {
        title: "Clasifica y dobla las figuras",
        instructions: [
          "Clasifica cada figura en la caja de 2D o en la de 3D.",
          "Para las figuras en 2D, escribe el número de lados y esquinas; para los cuerpos en 3D, escribe caras, aristas y vértices.",
          "Usa la herramienta de doblado para probar los ejes de simetría de cada figura en 2D y cuenta cuántos tiene.",
        ],
        conceptConnection: "Clasificar por dimensión y contar atributos convierte los nombres de las figuras en algo sobre lo que puedes razonar, y la herramienta de doblado hace que la simetría sea algo que ves en lugar de algo que memorizas.",
        sampleData: {
          shapes2D: [
            {
              name: "triángulo",
            },
            {
              name: "cuadrado",
            },
            {
              name: "rectángulo",
            },
            {
              name: "hexágono",
            },
          ],
          shapes3D: [
            {
              name: "cubo",
            },
            {
              name: "prisma rectangular",
            },
            {
              name: "pirámide cuadrangular",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "Arma y dobla figuras",
        instructions: [
          "Recorta figuras en 2D de papel y dobla cada una para hallar todos sus ejes de simetría; marca con lápiz cada línea de doblez.",
          "Arma un cubo o una caja a partir de un desarrollo (un patrón aplanado) y cuenta sus caras, aristas y vértices mientras lo doblas.",
          "Haz una tabla de figuras que liste cada figura y sus atributos.",
        ],
        successLooksLike: "Tu tabla anota correctamente lados y esquinas de las figuras planas y caras, aristas y vértices de los sólidos, y tus figuras dobladas muestran sus verdaderos ejes de simetría.",
      },
      checkpointQuestions: [
        {
          question: "¿Qué figura en 2D tiene 4 lados iguales y 4 esquinas?",
          answer: "Un cuadrado.",
        },
        {
          question: "¿Cuántas aristas tiene un cubo?",
          answer: "12 aristas.",
        },
        {
          question: "¿Cuántos ejes de simetría tiene un cuadrado?",
          answer: "4 (dos por la mitad de los lados y dos por las esquinas).",
        },
      ],
      reflectionQuestion: "¿Cómo se conectan las figuras en 2D con los cuerpos en 3D? Elige un cuerpo en 3D y describe las figuras en 2D que ves en sus caras.",
      challengeProblem: {
        prompt: "Un cuerpo tiene 5 caras, 8 aristas y 5 vértices. Una cara es un cuadrado y las demás son triángulos. ¿Qué cuerpo en 3D es?",
        hint: "Imagina un cuerpo con una base plana y lados triangulares que se juntan en un solo punto en la punta.",
        answer: "Una pirámide cuadrangular. Su base cuadrada más cuatro caras triangulares suman 5 caras, y las esquinas de la base más el punto de arriba suman 5 vértices.",
      },
      extensionChallenge: "Diseña una mariposa o una máscara simétrica dibujando una mitad, doblando y calcando para que los dos lados coincidan. Después marca su eje de simetría.",
      vocabulary: [
        {
          term: "Figura en 2D",
          definition: "Una figura plana con largo y ancho, como un triángulo o un cuadrado.",
        },
        {
          term: "Cuerpo en 3D",
          definition: "Un cuerpo sólido que puedes sostener, como un cubo o una esfera.",
        },
        {
          term: "Lado",
          definition: "Un borde recto de una figura en 2D.",
        },
        {
          term: "Vértice (esquina)",
          definition: "Un punto donde se juntan dos o más lados o aristas.",
        },
        {
          term: "Cara",
          definition: "Una superficie plana de un cuerpo en 3D.",
        },
        {
          term: "Arista",
          definition: "La línea donde se juntan dos caras de un cuerpo en 3D.",
        },
        {
          term: "Eje de simetría",
          definition: "Una línea de doblez que divide una figura en dos mitades que coinciden.",
        },
      ],
      materials: [
        "Papel",
        "Tijeras",
        "Desarrollos de figuras para doblar (opcional)",
        "Lápiz",
      ],
    },
    {
      title: "El reto del tiempo y el dinero",
      shortTitle: "Tiempo y dinero",
      theme: "El reto del tiempo y el dinero: maneja tu día y tu cartera",
      description: "Los estudiantes leen relojes, calculan cuánto tiempo pasa entre dos momentos, cuentan monedas y billetes, dan cambio y planean un presupuesto sencillo: las matemáticas que la gente usa todos los días.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º a 5.º grado",
      skillFocus: [
        "Leer la hora",
        "Tiempo transcurrido",
        "Contar dinero",
        "Dar cambio",
        "Presupuestos sencillos",
      ],
      learningGoals: [
        "Leer la hora en un reloj de manecillas hasta los cinco minutos más cercanos y relacionarla con la hora digital.",
        "Hallar el tiempo transcurrido entre dos horas usando una recta numérica o contando hacia adelante (de 2:15 a 3:00 hay 45 minutos).",
        "Contar una mezcla de monedas y billetes, dar cambio contando hacia adelante y planear una compra dentro de un presupuesto.",
      ],
      keyConcepts: [
        "La manecilla corta marca la hora; la manecilla larga marca los minutos.",
        "El tiempo transcurrido es el espacio entre una hora de inicio y una hora de fin.",
        "Dar cambio significa contar hacia adelante desde el precio hasta la cantidad que se pagó.",
      ],
      introStory: "Te acaban de dar las llaves de la tiendita de la escuela por un día, y también un horario que cumplir. El camión pasa a las 3:00, así que necesitas saber cuánto falta. Un cliente compra un lápiz de 65 centavos con un dólar y espera su cambio. Y tienes exactamente $5 para resurtir los materiales. El tiempo y el dinero manejan el día entero, y hoy pasan por tus manos.",
      mainLesson: [
        "En un reloj de manecillas, la manecilla corta apunta a la hora y la larga apunta a los minutos. Cada número que pasa la manecilla larga son 5 minutos, así que cuando apunta al 3, son 15 minutos después de la hora. \"2:15\" significa que la hora es 2 y han pasado 15 minutos.",
        "El tiempo transcurrido es cuánto tiempo pasa entre un inicio y un final. Para hallarlo, cuenta hacia adelante. De 2:15 a 3:00 cuentas 45 minutos (de 2:15 a 2:30 son 15, y de ahí a 3:00 son otros 30, en total 45). Una recta numérica de horas facilita mucho verlo.",
        "El dinero se cuenta por su valor. Una moneda de 25 centavos vale 25, una de 10 vale 10, una de 5 vale 5 y una de 1 centavo vale 1. Cuenta de las monedas más grandes hacia abajo: una de 25, dos de 10 y una de 5 son 25 + 10 + 10 + 5 = 50 centavos. Los billetes funcionan igual, pero a mayor escala.",
        "Dar cambio significa contar hacia adelante desde el precio hasta lo que pagó el cliente. Si un lápiz cuesta 65 centavos y pagan con un dólar (100 centavos), cuenta hacia adelante: de 65 a 70 (una moneda de 5), de 70 a 100 (tres de 10), o sea 35 centavos de cambio. Un presupuesto va más allá: con $5, planeas tus compras para que el total no pase de lo que tienes.",
      ],
      examples: [
        {
          problem: "La manecilla de la hora está entre el 4 y el 5, y la de los minutos apunta al 6. ¿Qué hora es?",
          explanation: "La manecilla de los minutos en el 6 significa 30 minutos después de la hora (6 x 5 = 30). La manecilla de la hora acaba de pasar el 4, así que son las 4:30.",
        },
        {
          problem: "¿Cuánto tiempo pasa de la 1:45 a las 2:30?",
          solution: "45 minutos",
          explanation: "Cuenta hacia adelante: de 1:45 a 2:00 son 15 minutos, y de 2:00 a 2:30 son 30 minutos. 15 + 30 = 45 minutos.",
        },
        {
          problem: "Un artículo cuesta 65 centavos y pagas con $1. ¿Cuánto cambio te dan?",
          solution: "35 centavos",
          explanation: "Cuenta hacia adelante de 65 a 100: son 35 centavos. Así que el cambio es de 35 centavos (una moneda de 25 y una de 10).",
        },
      ],
      interactiveActivity: {
        title: "Atiende la tiendita de la escuela",
        instructions: [
          "En cada venta, arrastra monedas y billetes a la charola hasta llegar al precio que se muestra.",
          "Cuando un cliente pague de más, cuenta hacia adelante para dar el cambio correcto.",
          "Ten a la vista tu presupuesto para resurtir y detente antes de pasarte.",
        ],
        conceptConnection: "Formar cantidades exactas y contar hacia adelante para dar cambio convierte el dinero en sumas y restas prácticas con un propósito real.",
        sampleData: {
          coins: [
            {
              name: "moneda de 1 centavo",
            },
            {
              name: "moneda de 5 centavos",
            },
            {
              name: "moneda de 10 centavos",
            },
            {
              name: "moneda de 25 centavos",
            },
          ],
          bills: [
            {
              name: "billete de un dólar",
            },
            {
              name: "billete de cinco dólares",
            },
          ],
          sales: [
            {
              item: "lápiz",
            },
            {
              item: "goma de borrar",
            },
            {
              item: "cuaderno",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "Juego de roles: tienda y horario",
        instructions: [
          "Saca monedas de juguete o reales y ponle etiqueta de precio a tres artículos de la \"tienda\".",
          "Túrnense para ser cajero y cliente: el cliente paga con monedas y el cajero cuenta hacia adelante para dar el cambio.",
          "Después arma un horario sencillo del día con tres actividades y calcula el tiempo transcurrido entre cada par.",
        ],
        successLooksLike: "Puedes dar el cambio correcto contando hacia adelante y decir cuántos minutos pasan entre dos actividades de tu horario.",
      },
      checkpointQuestions: [
        {
          question: "¿Qué hora es cuando la manecilla de la hora pasó el 7 y la de los minutos apunta al 3?",
          answer: "7:15 (la manecilla de los minutos en el 3 significa 15 minutos después de la hora).",
        },
        {
          question: "¿Cuánto tiempo hay de las 6:20 a las 7:00?",
          answer: "40 minutos (cuenta hacia adelante: 20 minutos hasta las 6:40, y luego 20 más hasta las 7:00, o sea 40 minutos en total).",
        },
        {
          question: "Compras un refrigerio de 70 centavos con $1. ¿Cuál es tu cambio?",
          answer: "30 centavos.",
        },
      ],
      reflectionQuestion: "¿Por qué contar hacia adelante es una forma útil de dar cambio? ¿Cómo se relaciona con la resta?",
      challengeProblem: {
        prompt: "Tienes $5 para gastar. Compras un marcador de $1.25 y un cuaderno de $2.50. ¿Cuánto dinero te queda, y podrías comprar además una goma de borrar de $1.50?",
        hint: "Primero suma las dos compras, réstalas de $5 y luego compara lo que te queda con el precio de la goma.",
        answer: "Te quedan $1.25. El marcador y el cuaderno cuestan $1.25 + $2.50 = $3.75; $5.00 - $3.75 = $1.25. No puedes comprar la goma de $1.50, porque $1.25 no alcanza.",
      },
      extensionChallenge: "Planea un presupuesto de $10 para los refrigerios de una fiesta: haz una lista de al menos tres artículos con precios, mantén el total en $10 o menos, y muestra el cambio que recibirías de un billete de $10.",
      vocabulary: [
        {
          term: "Reloj de manecillas",
          definition: "Un reloj con manecillas de hora y de minutos.",
        },
        {
          term: "Reloj digital",
          definition: "Un reloj que muestra la hora con números, como 4:30.",
        },
        {
          term: "Tiempo transcurrido",
          definition: "La cantidad de tiempo que pasa entre un inicio y un final.",
        },
        {
          term: "Cambio",
          definition: "El dinero que te devuelven cuando pagas más que el precio.",
        },
        {
          term: "Presupuesto",
          definition: "Un plan de cuánto dinero puedes gastar.",
        },
        {
          term: "Valor",
          definition: "Cuánto vale una moneda o un billete, como una moneda de 25 centavos.",
        },
      ],
      materials: [
        "Monedas y billetes de juguete o reales",
        "Etiquetas de precio de papel",
        "Un reloj o una carátula de reloj dibujada",
      ],
    },
    {
      title: "Detective de datos",
      shortTitle: "Detective de datos",
      theme: "El detective de datos: convertir rayitas de conteo en respuestas",
      description: "Los estudiantes recopilan datos con tablas de conteo, los presentan en gráficas de barras y pictogramas, y leen gráficas para responder preguntas y comparar categorías, hallando la historia escondida en los números.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º a 5.º grado",
      skillFocus: [
        "Tablas de conteo",
        "Gráficas de barras",
        "Pictogramas",
        "Interpretar datos",
        "Comparar categorías",
      ],
      learningGoals: [
        "Recopilar datos con una tabla de conteo y contar las rayitas en grupos de cinco.",
        "Construir una gráfica de barras y un pictograma a partir de un conjunto de datos, incluyendo una clave para el pictograma.",
        "Leer una gráfica para responder preguntas de \"cuántos\", \"cuál es el que más o el que menos\" y \"cuántos más\".",
      ],
      keyConcepts: [
        "Los datos son información que recopilamos, y una tabla los mantiene ordenados.",
        "Las gráficas de barras usan la altura de las barras y los pictogramas usan dibujos para comparar categorías.",
        "Leer una gráfica significa comparar categorías y hallar diferencias.",
      ],
      introStory: "Hay un misterio dando vueltas en el salón: ¿cuál es la fruta favorita de todos? Los rumores dicen que las manzanas, pero el detective de datos no confía en los rumores: el detective de datos recopila evidencia. Vas a encuestar al grupo, hacer una rayita por cada voto y luego convertir esas rayitas en una gráfica tan clara que cualquiera vea la respuesta de un vistazo.",
      mainLesson: [
        "Los datos son información que reunimos para responder una pregunta. Para mantenerlos ordenados usamos una tabla de conteo: una rayita por cada elemento, y cada quinta rayita se dibuja cruzando las cuatro anteriores para poder contar de cinco en cinco. Las rayitas hacen que contar una encuesta grande sea rápido y exacto.",
        "Una gráfica de barras muestra los datos con barras: mientras más alta la barra, más hay en esa categoría. Las barras facilitan la comparación: la barra más alta es la que \"más\" tiene y la más baja la que \"menos\", y lo ves de un vistazo sin hacer ninguna cuenta.",
        "Un pictograma usa un dibujo para representar cierta cantidad de elementos, explicada por una clave (por ejemplo, un dibujo de manzana = 2 votos). Si una fila tiene 3 dibujos de manzana y cada uno representa 2 votos, esa categoría tiene 6 votos. La clave es indispensable: sin ella, no puedes saber qué significan los dibujos.",
        "El verdadero trabajo de detective es leer la gráfica. Respondes preguntas como \"¿Cuántos eligieron plátano?\", \"¿Cuál fruta fue la más popular?\" y \"¿Cuántos más eligieron manzana que uvas?\". Esta última es una resta: halla las dos barras y saca la diferencia.",
      ],
      examples: [
        {
          problem: "Una tabla de conteo muestra las manzanas con cuatro rayitas verticales y una línea cruzándolas. ¿Cuántos votos son?",
          solution: "5 votos",
          explanation: "Cuatro rayitas con una quinta cruzándolas forman un grupo de cinco, que equivale a 5 votos.",
        },
        {
          problem: "En un pictograma, cada manzana = 2 votos. Una fila tiene 4 dibujos de manzana. ¿Cuántos votos son?",
          solution: "8 votos",
          explanation: "Multiplica la cantidad de dibujos por el valor de la clave: 4 dibujos x 2 votos cada uno = 8 votos.",
        },
        {
          problem: "Una gráfica de barras muestra manzanas = 9 y uvas = 4. ¿Cuántos más eligieron manzana?",
          solution: "5 más",
          explanation: "Halla las dos barras y resta: 9 - 4 = 5. Cinco personas más eligieron manzana que uvas.",
        },
      ],
      interactiveActivity: {
        title: "De las rayitas a la gráfica",
        instructions: [
          "Captura los resultados de la encuesta como rayitas de conteo para cada categoría.",
          "Cambia a la vista de gráfica de barras y arrastra cada barra hasta la altura correcta.",
          "Cambia a la vista de pictograma, define la clave y responde las tres preguntas que el detective hace sobre tus datos.",
        ],
        conceptConnection: "Convertir el mismo conjunto de datos en rayitas, en una gráfica de barras y en un pictograma muestra que una gráfica no es más que una imagen fácil de leer de los números que recopilaste.",
        sampleData: {
          question: "¿Cuál es tu fruta favorita?",
          results: [
            {
              category: "Manzana",
            },
            {
              category: "Plátano",
            },
            {
              category: "Uvas",
            },
            {
              category: "Naranja",
            },
          ],
          questions: [
            "¿Cuál fruta es la más popular?",
            "¿Cuántos eligieron naranja?",
            "¿Cuántos más eligieron manzana que uvas?",
          ],
        },
      },
      handsOnChallenge: {
        title: "Haz tu propia encuesta",
        instructions: [
          "Elige una pregunta con cuatro opciones (color, mascota, deporte o botana favorita).",
          "Pregúntale al menos a diez personas y anota cada respuesta con una rayita de conteo.",
          "Convierte tus rayitas en una gráfica de barras en papel cuadriculado y luego escribe dos preguntas que tu gráfica pueda responder.",
        ],
        successLooksLike: "Tu gráfica de barras tiene las categorías rotuladas y una escala clara, y con ella puedes responder \"cuál es el que más\" y \"cuántos más\".",
      },
      checkpointQuestions: [
        {
          question: "¿Cómo te ayudan las rayitas de conteo a contar una encuesta grande?",
          answer: "Agrupan los conteos de cinco en cinco, así puedes contar rápido de 5 en 5 en lugar de uno por uno.",
        },
        {
          question: "En un pictograma donde cada estrella = 5, una fila tiene 3 estrellas. ¿Cuántos son?",
          answer: "15 (3 estrellas x 5 = 15).",
        },
        {
          question: "Una gráfica de barras muestra perros = 7 y gatos = 10. ¿Cuántos más eligieron gatos?",
          answer: "3 más (10 - 7 = 3).",
        },
      ],
      reflectionQuestion: "¿Por qué es más fácil entender una gráfica que una lista larga de rayitas de conteo? ¿Qué te deja ver rápido una gráfica?",
      challengeProblem: {
        prompt: "Un pictograma de mascotas usa una huella = 4 mascotas. Los perros tienen 5 huellas, los gatos 3 huellas y los peces 2 huellas. ¿Cuántas mascotas hay en total y cuál es la más popular?",
        hint: "Halla el conteo de cada categoría multiplicando las huellas por 4, y luego suma todas las categorías.",
        answer: "40 mascotas en total, y los perros son los más populares. Perros = 5 x 4 = 20, gatos = 3 x 4 = 12, peces = 2 x 4 = 8; 20 + 12 + 8 = 40.",
      },
      extensionChallenge: "Recopila datos en dos días distintos y haz dos gráficas de barras una al lado de la otra. Escribe una oración que describa cómo cambiaron los resultados entre un día y otro.",
      vocabulary: [
        {
          term: "Datos",
          definition: "Información que recopilas para responder una pregunta.",
        },
        {
          term: "Tabla de conteo",
          definition: "Una tabla que registra conteos con rayitas agrupadas de cinco en cinco.",
        },
        {
          term: "Gráfica de barras",
          definition: "Una gráfica que compara categorías usando la altura de las barras.",
        },
        {
          term: "Pictograma",
          definition: "Una gráfica que usa dibujos para representar cantidades.",
        },
        {
          definition: "Una nota que indica cuántos elementos representa cada dibujo de un pictograma.",
        },
        {
          term: "Categoría",
          definition: "Un grupo u opción que se está contando, como \"manzanas\".",
        },
      ],
      materials: [
        "Papel cuadriculado",
        "Lápiz",
        "Una pregunta para encuestar",
        "Regla para trazar barras rectas",
      ],
    },
    {
      title: "Construye una ciudad matemática",
      shortTitle: "Ciudad matemática",
      theme: "El proyecto final: diseña una ciudad que funcione con matemáticas",
      description: "Los estudiantes combinan todas las habilidades del curso para diseñar una ciudad de papel sobre una cuadrícula: edificios geométricos con alturas medidas, una panadería que vende fracciones, un banco que da cambio y una encuesta a los habitantes presentada como gráfica, y luego explican las matemáticas que hay detrás.",
      estimatedTime: "60-90 minutos",
      gradeRange: "2.º a 5.º grado",
      skillFocus: [
        "Geometría",
        "Medición",
        "Dinero",
        "Fracciones",
        "Operaciones",
        "Datos",
        "Resolución de problemas",
      ],
      learningGoals: [
        "Aplicar juntas la geometría, la medición, las fracciones, el dinero, las operaciones y los datos para diseñar y construir una ciudad de papel.",
        "Explicar las matemáticas detrás de al menos tres elementos de la ciudad usando el vocabulario correcto del curso.",
        "Resolver un problema de planeación de varios pasos, como mantenerse dentro de un presupuesto de construcción cumpliendo un requisito de tamaño.",
      ],
      keyConcepts: [
        "Los proyectos reales usan muchos tipos de matemáticas al mismo tiempo.",
        "Planear significa usar juntas las operaciones, la medición y el dinero para cumplir metas.",
        "Explicar tus matemáticas con claridad es parte de terminar un proyecto.",
      ],
      introStory: "A la alcaldesa de la Ciudad Matemática le queda una sola tarea antes de la gran inauguración: hay que diseñar la ciudad entera, y tiene que funcionar. Cada edificio es una figura, cada calle tiene un largo, la panadería vende rebanadas como fracciones, el banco da cambio, y quien planea la ciudad quiere una gráfica de lo que más les gusta a los habitantes. Llevas nueve semanas entrenando. Ahora eres el diseñador principal: construye una ciudad que funcione con matemáticas.",
      mainLesson: [
        "Esta semana juntas todo lo que has aprendido. Una ciudad es el proyecto perfecto porque necesita todo a la vez: figuras para los edificios, medidas para las calles, fracciones en la panadería, dinero en el banco, operaciones para planear y datos para entender a los habitantes.",
        "Empieza con la geometría y la medición. Dibuja tu ciudad en papel cuadriculado. Cada edificio es una figura en 2D o un cuerpo en 3D: rotula sus lados y esquinas, o sus caras y aristas, y dale una altura medida, y a cada calle un largo medido. La cuadrícula mantiene todo a escala.",
        "Agrega dinero y fracciones. Abre una panadería que venda productos como fracciones de un entero (medio pay, 1/4 de pastel) y un banco que atienda las compras y dé cambio. Pon precios y muestra al menos una transacción donde un cliente pague y reciba el cambio correcto.",
        "Termina con los datos y un plan. Encuesta a unos cuantos \"habitantes\" (familiares o compañeros) sobre su parte favorita de la ciudad y muestra los resultados en una gráfica de barras o un pictograma. Después enfrenta un reto: diseña tu ciudad dentro de un presupuesto de construcción fijo, usando las operaciones para asegurarte de que los costos cuadren. Cuando presentes, explica las matemáticas detrás de al menos tres elementos.",
      ],
      examples: [
        {
          problem: "Un edificio es un prisma rectangular de 4 cm de alto sobre una base de 3 cm por 2 cm. Nombra su forma y su número de caras.",
          solution: "Prisma rectangular, 6 caras",
          explanation: "Una forma de caja es un prisma rectangular. Igual que un cubo, tiene 6 caras (arriba, abajo y cuatro lados), más 12 aristas y 8 vértices.",
        },
        {
          problem: "La panadería vende un pay en cuartos a 50 centavos la rebanada. Un cliente compra 3 rebanadas con $2. ¿Cuál es el cambio?",
          solution: "50 centavos de cambio",
          explanation: "Tres rebanadas a 50 centavos cada una cuestan 3 x 50 = 150 centavos ($1.50). Pagando con $2.00: 200 - 150 = 50 centavos de cambio.",
        },
        {
          problem: "Tienes un presupuesto de construcción de $20. Una casa cuesta $6, una escuela $9 y un parque $4. ¿Puedes construir los tres?",
          solution: "Sí, y te sobra $1",
          explanation: "Suma los costos: 6 + 9 + 4 = 19. Como 19 es menor que 20, puedes construir los tres y te quedan 20 - 19 = $1 en el presupuesto.",
        },
      ],
      interactiveActivity: {
        title: "Diseña la Ciudad Matemática",
        instructions: [
          "Coloca las figuras de los edificios en la cuadrícula y define la altura y las medidas de la base de cada uno.",
          "Abre la panadería y el banco: pon precios en fracciones y completa al menos una transacción con cambio.",
          "Encuesta a los habitantes, convierte los resultados en una gráfica y mantén el costo total de construcción dentro del presupuesto que se muestra.",
        ],
        conceptConnection: "Quien planea la ciudad reúne todas las unidades del curso, así que cada decisión (una figura, un largo, un precio, una gráfica) echa mano de las matemáticas de una semana distinta al mismo tiempo.",
        sampleData: {
          bakeryItems: [
            {
              item: "rebanada de pay",
            },
            {
              item: "medio pastel",
            },
          ],
          surveyQuestion: "¿Cuál es tu parte favorita de la Ciudad Matemática?",
          surveyCategories: [
            "El parque",
            "La panadería",
            "La escuela",
            "La tienda",
          ],
        },
      },
      handsOnChallenge: {
        title: "Construye y presenta tu ciudad de papel",
        instructions: [
          "En papel cuadriculado o en una cartulina, dibuja y rotula tu ciudad: figuras para los edificios, largos medidos de las calles, una panadería con precios en fracciones y un banco.",
          "Haz una encuesta a por lo menos seis personas y agrega a tu ciudad una gráfica de barras o un pictograma con los resultados.",
          "Prepara una presentación corta que explique las matemáticas detrás de tres elementos (por ejemplo, la forma de un edificio, el cambio que dio el banco y lo que muestra la gráfica).",
        ],
        successLooksLike: "Tu ciudad terminada usa geometría, medición, fracciones, dinero y datos, se mantiene dentro del presupuesto de construcción, y puedes explicar con claridad las matemáticas detrás de tres de sus partes.",
      },
      checkpointQuestions: [
        {
          question: "Nombra dos tipos de matemáticas que usa tu ciudad y dónde aparece cada uno.",
          answer: "Las respuestas varían; por ejemplo, la geometría en las formas de los edificios y el dinero en el banco al dar cambio.",
        },
        {
          question: "Tu presupuesto es de $15 y tus edificios cuestan $12. ¿Cuánto te queda?",
          answer: "$3 (15 - 12 = 3).",
        },
        {
          question: "La panadería vende un pastel en mitades. ¿Cuántas rebanadas hay en un pastel entero?",
          answer: "2 rebanadas, porque mitades significa dos partes iguales.",
        },
      ],
      reflectionQuestion: "¿Qué habilidad matemática del curso te sirvió más para construir tu ciudad, y por qué? ¿Qué te sorprendió de usar varios tipos de matemáticas a la vez?",
      challengeProblem: {
        prompt: "Tu ciudad tiene un presupuesto de construcción de $30. Tienes que incluir una escuela ($9) y un parque ($4), y quieres el rascacielos más alto posible con el dinero que sobre. Un rascacielos se arma con bloques que cuestan $3 cada uno y agregan 2 cm de altura. ¿Cuál es el rascacielos más alto que puedes pagar?",
        hint: "Primero gasta en los edificios obligatorios, mira cuánto dinero queda, y luego averigua cuántos bloques completos de $3 puedes comprar y cuánta altura agrega cada uno.",
        answer: "10 cm de alto. Escuela + parque = 9 + 4 = 13, y quedan 30 - 13 = 17. Cada bloque cuesta $3, y con $17 se compran 5 bloques completos ($15) y sobran $2. Cinco bloques x 2 cm cada uno = 10 cm.",
      },
      extensionChallenge: "Agrega una línea de transporte público a tu ciudad: marca las paradas en la cuadrícula, dale a la ruta un largo total medido y haz un horario que muestre el tiempo transcurrido entre la primera y la última parada.",
      vocabulary: [
        {
          term: "Diseñar",
          definition: "Planear y crear algo con un propósito.",
        },
        {
          term: "Escala",
          definition: "Mantener los tamaños en proporción, muchas veces usando una cuadrícula.",
        },
        {
          term: "Presupuesto",
          definition: "Un plan de cuánto puedes gastar.",
        },
        {
          term: "Transacción",
          definition: "Un intercambio de compra o venta de dinero por mercancía.",
        },
        {
          term: "Problema de varios pasos",
          definition: "Un problema que necesita más de una operación o etapa para resolverse.",
        },
      ],
      materials: [
        "Papel cuadriculado o cartulina",
        "Regla",
        "Crayones o marcadores",
        "Dinero de juguete",
        "Tijeras y cinta adhesiva",
      ],
    },
  ],
}

const zh: DeepPartial<MathCurriculum> = {
  title: "数学大冒险",
  description: "面向 2 至 5 年级的 10 周数学课程。每一周都把一个核心数学概念（数感、运算、规律、数位、分数、测量、几何、时间与金钱、数据）变成一次动手的冒险，最后落到一个总结项目：让学生设计属于自己的数学城市。",
  gradeRange: "2 至 5 年级",
  estimatedTimePerLesson: "45-60 分钟",
  topics: [
    "数感",
    "运算",
    "规律",
    "数位",
    "分数",
    "测量",
    "几何",
    "时间与金钱",
    "数据与图表",
    "解决问题",
  ],
  finalProjectTitle: "建一座数学城市",
  finalProjectDescription: "在最后一周，学生在方格纸上设计一座纸做的城市，城里的每一部分都用到他们学过的数学：楼房是量过高度的几何形状，面包店按分数出售商品，银行数钱并找零，而对城市居民做的一次调查会变成一张条形图。学生展示自己的城市，并讲解其中三个部分背后的数学。",
  lessons: [
    {
      title: "数字侦探",
      shortTitle: "数字侦探",
      theme: "数字侦探社：用数字线索破案",
      description: "学生化身侦探，读懂一个数里藏着的线索（它有多大、由哪些数字组成、可以怎样拆开），用来比较大小、估算，并找出神秘数字。",
      estimatedTime: "45-60 分钟",
      gradeRange: "2 至 5 年级",
      skillFocus: [
        "数感",
        "比较数的大小",
        "估算",
        "拆分数",
      ],
      learningGoals: [
        "从最高位开始看数位，用大于（>）、小于（<）和等于（=）来比较两个数。",
        "通过四舍五入到最接近的十位或百位，估算一组物体大约有多少个，并说明为什么并不总是需要精确计数。",
        "把一个数拆成百位、十位和个位（例如 256 = 200 + 50 + 6），再把它重新组合起来。",
      ],
      keyConcepts: [
        "一个数字值多少，取决于它在数中所处的位置。",
        "比较数的大小时，把它们对齐，先看最高位。",
        "当精确计数太慢时，估算能给出一个又快又足够接近的答案。",
      ],
      introStory: "数字侦探社刚接到一个案子。有人在门上留下了唯一一条线索：「我是一个三位数。我的百位数字是 4，十位数字比 7 大，个位数字是 0。」社长递给你一个放大镜，问道：「哪些数可能符合？」要结案，你得像侦探读线索那样去读数字。",
      mainLesson: [
        "每个数都由数字组成，而数字所在的位置告诉你它值多少。在 256 里，那个 2 不只是「二」：它在百位上，所以表示 200。5 在十位上，表示 50，而个位上的 6 表示 6。读懂一个数的各个数位，是侦探的第一步。",
        "要比较两个数，就按数位把它们对齐，先看最高位。比较 348 和 384 时，两个数都有 3 个百，所以这里打平。往十位看：348 有 4 个十，384 有 8 个十。八个十胜过四个十，所以 384 更大。我们写成 348 < 384。这个符号总是朝着更大的数张开，就像一张嘴要吃掉更大的那份点心。",
        "有时候你不需要精确的数量，而是需要一个又快又好的估计。估算就是四舍五入到一个附近的、好用的整数。如果一个罐子看上去有大约 60 颗弹珠，你不必把那 58 颗全数一遍；「大约 60」已经足够用来比较罐子或安排一个游戏了。",
        "拆分就是把一个数分成它的各个部分。256 可以拆成 200 + 50 + 6。侦探这样做是为了看清一个数藏起来的结构，而且到了课程后面，这会让加法和减法轻松得多。",
      ],
      examples: [
        {
          problem: "用 >、< 或 = 比较 348 和 384。",
          explanation: "百位相同（3 = 3）。往十位看：4 个十对 8 个十。因为 8 个十更多，所以 384 是较大的数，也就是说 348 小于 384。",
        },
        {
          problem: "把 407 拆成百位、十位和个位。",
          explanation: "4 在百位上（400），十位上没有（0），7 在个位上。那个 0 是占位符，让 4 和 7 各自待在正确的位置上。",
        },
        {
          problem: "58 四舍五入到最接近的十位大约是多少？",
          solution: "大约 60",
          explanation: "58 在 50 和 60 之间。因为个位数字是 8（大于或等于 5），所以往上进位到 60。「大约 60」对于快速估算已经足够了。",
        },
      ],
      interactiveActivity: {
        title: "神秘数字大搜寻",
        instructions: [
          "读一读数轴上方出现的每一条线索。",
          "把侦探标记拖到数轴上神秘数字应该在的位置。",
          "用「大于」和「小于」的提示不断缩小范围，直到只剩下一个数。",
        ],
        conceptConnection: "把一个数放到数轴上，会逼你去想它和邻居相比有多大，这正是你比较大小和估算时用的同一种推理。",
        sampleData: {
          clues: [
            "这个数大于 40。",
            "这个数小于 60。",
            "十位上的数字是奇数。",
            "个位上的数字是 0。",
          ],
        },
      },
      handsOnChallenge: {
        title: "数字线索卡",
        instructions: [
          "写出五个不同的三位数，每个写在一张卡片纸上。",
          "在第二套卡片上，为每个数写一条线索（例如「我有 2 个百，个位数字是 9」）。",
          "和同伴交换线索卡，试着把每条线索和正确的数配对。",
        ],
        successLooksLike: "你能说出每个数位（百位、十位、个位）上的值，从而大声解释一条线索为什么对应那个数。",
      },
      checkpointQuestions: [
        {
          question: "512 和 521 哪个更大？你怎么知道的？",
          answer: "521 更大。百位相同（5 = 5），但 521 有 2 个十，而 512 只有 1 个十，所以 521 在十位上取胜。",
        },
        {
          question: "把 630 拆成各个部分。",
        },
        {
          question: "把 43 四舍五入到最接近的十位。",
          answer: "40，因为个位数字（3）小于 5，所以往下舍去。",
        },
      ],
      reflectionQuestion: "什么时候估算会比数出准确数量更有用？描述一个真实的时刻，在那种情况下「大约多少」就够了。",
      challengeProblem: {
        prompt: "我是一个介于 300 和 400 之间的三位数。我的十位数字是个位数字的两倍，而我的个位数字是 3。我是哪个数？",
        hint: "先从个位数字（3）入手，再把它翻倍算出十位数字。百位数字必须让你保持在 300 到 400 之间。",
        answer: "363。百位数字是 3（为了保持在 300 到 400 之间），个位数字是 3，十位数字是 3 的两倍，也就是 6。",
      },
      extensionChallenge: "为一个神秘数字做一张「通缉令」，正好写四条线索，使得全世界只有一个数能同时符合这四条。拿去考考家里人。",
      vocabulary: [
        {
          term: "数字",
          definition: "组成数的 0 到 9 这些符号中的一个。",
        },
        {
          term: "数位值",
          definition: "一个数字根据它所处的位置（个位、十位、百位）而具有的大小。",
        },
        {
          term: "大于（>）",
          definition: "表示左边的数更大的符号。",
        },
        {
          term: "小于（<）",
          definition: "表示左边的数更小的符号。",
        },
        {
          term: "估算",
          definition: "通过四舍五入到一个好用的整数，得出的聪明而足够接近的猜测。",
        },
        {
          term: "拆分",
          definition: "把一个数分成组成它的各个部分，比如 256 = 200 + 50 + 6。",
        },
      ],
      materials: [
        "卡片纸",
        "铅笔",
        "一罐用来估算的小物件（可选）",
      ],
    },
    {
      title: "运算大任务",
      shortTitle: "运算大任务",
      theme: "四位英雄的任务：加、减、乘、除",
      description: "学生把四则运算当成各有绝招的角色来认识，并学会为一道应用题挑出正确的那一个：合并、拿走、组成相等的组，还是平均分。",
      estimatedTime: "45-60 分钟",
      gradeRange: "2 至 5 年级",
      skillFocus: [
        "加法",
        "减法",
        "用乘法思考",
        "用除法思考",
        "选择运算",
      ],
      learningGoals: [
        "通过追问故事里正在发生什么（合并、分开、组成相等的组，还是平均分），把应用题和正确的运算对应起来。",
        "把乘法解释成重复的相等分组（4 x 3 表示四组三个），把除法解释成分成相等的组。",
        "解一道两步应用题，并说明每一步用了哪种运算。",
      ],
      keyConcepts: [
        "加法把数量合起来；减法求出差，或者拿走一部分。",
        "乘法是把相等的组相加的快捷方式。",
        "除法把总数分成相等的组，或者求出每组有多少个。",
      ],
      introStory: "通往数学山的路上有一座桥塌了，四位英雄挺身而出。加法能把两组合成一组。减法能找出少了什么。乘法能一瞬间搭出许多相等的组。除法能公平地分配宝藏。可是每位英雄只对相应类型的问题有效，选错了英雄，桥就还是断的。你的任务：为每个挑战派出正确的那位英雄。",
      mainLesson: [
        "应用题的诀窍不在数字，而在于弄清故事里正在发生什么。是两组合到一起吗？那是加法。是有东西被拿走了，或者你在比较两者求差吗？那是减法。",
        "乘法是相等分组的英雄。「4 个篮子，每个装 3 个苹果」就是 4 x 3 = 12。与其去算 3 + 3 + 3 + 3，不如直接相乘。线索就是「每个」这样的词，它标志着相等的组。",
        "除法是分配和拆分的英雄。如果 12 个苹果平均分给 4 个朋友，每人得到 12 / 4 = 3 个。除法回答两类问题：「每组有多少个？」和「我能分成多少组？」",
        "有些任务需要两步。「你有 20 元，花 8 元买一本书，然后把剩下的和朋友平分。」第一步是减法（20 - 8 = 12）。第二步是除法（12 / 2 = 6）。给每一步的运算命名，能让你不迷路。",
      ],
      examples: [
        {
          problem: "一个班有 6 张桌子，每张桌子坐 4 名学生。一共有多少名学生？",
          solution: "6 x 4 = 24 名学生",
          explanation: "「每张桌子」这个说法标志着相等的组，所以这是乘法：六组四个就是二十四。",
        },
        {
          problem: "有 15 块饼干要平均分给 5 个孩子。每人分到几块？",
          solution: "15 / 5 = 每人 3 块饼干",
          explanation: "平均分就是除法。把 15 分成 5 个相等的组，每组有 3 个。",
        },
        {
          problem: "一个游戏售价 $18。你有 $25。买下它之后还剩多少？",
          explanation: "花钱会拿走一部分，所以这是减法。25 和 18 的差是 7。",
        },
      ],
      interactiveActivity: {
        title: "挑出正确的英雄",
        instructions: [
          "每张应用题卡片出现时，把它读一遍。",
          "把卡片拖到它需要的英雄上：加、减、乘或除。",
          "分好类之后，解出其中两道题并检查答案。",
        ],
        conceptConnection: "按运算给问题分类，会养成先问「这里正在发生什么？」再动数字的习惯，而这正是应用题中最重要的能力。",
        sampleData: {
          problems: [
            {
              text: "8 颗红弹珠和 5 颗蓝弹珠放在一起",
            },
            {
              text: "一条 12 厘米长的丝带，剪掉 5 厘米",
            },
            {
              text: "3 排，每排 6 把椅子",
            },
            {
              text: "20 张贴纸分给 4 个孩子",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "骰子运算对决",
        instructions: [
          "掷两个骰子，得到两个数。",
          "从一摞正面朝下的牌里抽一张运算卡（+、-、x 或 /）。",
          "解出你的点数和卡片组成的算式；如果抽到除法而又除不尽，就重掷其中一个骰子。",
          "每答对一题得一分，先到 10 分者胜。",
        ],
        successLooksLike: "你能用小数字完成四则运算，并为每一次掷出的算式快速编一个相配的小故事。",
      },
      checkpointQuestions: [
        {
          question: "「5 个袋子，每个装 7 个苹果」该用哪种运算？答案是多少？",
          answer: "乘法。5 x 7 = 35 个苹果。",
        },
        {
          question: "把 4 + 4 + 4 写成乘法。",
          answer: "3 x 4 = 12（三组四个）。",
        },
        {
          question: "24 支铅笔，每盒装 6 支。一共有几盒？",
          answer: "除法：24 / 6 = 4 盒。",
        },
      ],
      reflectionQuestion: "你怎么判断一道应用题需要乘法还是加法？哪个词或哪条线索帮你做出判断？",
      challengeProblem: {
        prompt: "一位面包师烤了 4 盘松饼，每盘 6 个。她卖掉了 9 个。还剩多少个松饼？",
        hint: "这是一个两步任务。先算出松饼的总数，再减去她卖掉的那些。",
        answer: "15 个松饼。第一步：4 x 6 = 24 个松饼。第二步：24 - 9 = 15 个剩下。",
      },
      extensionChallenge: "自己写一道两步应用题，第一步用乘法，第二步用减法。把它交给别人，并确认对方能说出这两种运算。",
      vocabulary: [
        {
          term: "运算",
          definition: "一种数学动作：加、减、乘或除。",
        },
        {
          definition: "加法的结果。",
        },
        {
          term: "差",
          definition: "减法的结果。",
        },
        {
          term: "积",
          definition: "乘法的结果。",
        },
        {
          term: "商",
          definition: "除法的结果。",
        },
        {
          term: "相等的组",
          definition: "每一组东西数量都一样的分组，这是乘法和除法的核心。",
        },
      ],
      materials: [
        "两个骰子",
        "写运算符号用的卡片纸",
        "铅笔和纸",
      ],
    },
    {
      title: "规律机器",
      shortTitle: "规律机器",
      theme: "规律机器：喂它一个数，找出它的规则",
      description: "学生寻找并延续规律、跳着数数，并破解一台输入输出机器背后隐藏的规则，从而明白：能说清楚的规则，就能让你预测接下来会出现什么。",
      estimatedTime: "45-60 分钟",
      gradeRange: "2 至 5 年级",
      skillFocus: [
        "规律",
        "数列",
        "跳着数数",
        "输入输出规则",
      ],
      learningGoals: [
        "延续一个递增或重复的数字规律，并用文字描述它的规则（例如「每次加 5」）。",
        "按 2、5、10、3、4 跳着数数，并把跳数与乘法联系起来。",
        "通过比较输入和输出，找出一台输入输出机器的规则。",
      ],
      keyConcepts: [
        "规律遵循一条规则，而说清这条规则，就能预测下一项。",
        "跳着数数就是重复相加，也是乘法的基础。",
        "一条输入输出规则，会对你喂进去的每个数做同样的事。",
      ],
      introStory: "作坊最里面放着规律机器，浑身都是齿轮和旋钮。往上面投进一个 2，底下就滚出一个 6。投进 5，出来的是 15。机器不会告诉你它的秘密，但只要你仔细观察，就能弄清它用的是什么规则。一旦知道了规则，它以后造出的每一个数你都能预测。",
      mainLesson: [
        "规律是一列遵循某条规则的数。在 3、6、9、12、…… 中，规则是「每次加 3」。一旦说清了规则，你就可以往前跳：下一项是 15，而你不必把每一步都画出来才知道。",
        "跳着数数是你已经会的规律。按 5 数（5、10、15、20）就是一次次地加 5。正因如此，跳数和乘法是一对表亲：按 5 跳四次会到 20，而 4 x 5 = 20。",
        "规律可以是重复的（红、蓝、红、蓝），也可以是递增的（2、4、8、16，规则是「翻倍」）。诀窍是看清从一项到下一项变了什么。如果每次都加同样多，规则就是「加那么多」。",
        "输入输出机器对每个输入都用同一条规则。如果 2 变成 6、5 变成 15，那机器就是乘以 3。再用第三对数验证一下你的规则：好的规则对每个输入都成立，而不只是对一个。",
      ],
      examples: [
        {
          problem: "接下来是什么：4、8、12、16、___？",
          explanation: "每一项都往上加 4（规则是「加 4」）。16 + 4 = 20。这同时也是按 4 跳着数数。",
        },
        {
          problem: "一台机器把 3 变成 8，把 5 变成 10，把 6 变成 11。它的规则是什么？",
          solution: "加 5",
          explanation: "把每个输入和它的输出对照一下：3 到 8 是 +5，5 到 10 是 +5，6 到 11 是 +5。同一条规则对三组都成立，所以规则是「加 5」。",
        },
        {
          problem: "按 5 跳着数数，求出 6 x 5。",
          explanation: "5、10、15、20、25、30：六次五的跳跃正好落在 30 上，这正是 6 x 5。",
        },
      ],
      interactiveActivity: {
        title: "破解机器的规则",
        instructions: [
          "观察机器把每个输入数变成什么输出。",
          "看过三个例子后，输入你猜测的规则（比如「x 2」或「+ 4」）。",
          "确认之前，再喂机器一个数来检验你的规则。",
        ],
        conceptConnection: "从输入输出的配对中猜出规则，和在数列中找规律是同一种推理：你都在寻找从一步到下一步保持不变的那个东西。",
      },
      handsOnChallenge: {
        title: "拼一条规律长链",
        instructions: [
          "用两种颜色的纸条或珠子，拼出一个至少 12 个元素的重复规律。",
          "在它旁边，用竖线或圆点拼出一个递增的数字规律（从「加 3」这样的规则开始）。",
          "请同伴说出这两条规则，并预测接下来的三项。",
        ],
        successLooksLike: "你的同伴能用文字说出每个规律的规则，并正确地往下延续三步。",
      },
      checkpointQuestions: [
        {
          question: "接着写下去：10、20、30、40、___、___。",
          answer: "50、60（规则是「加 10」，也就是按 10 跳着数数）。",
        },
        {
          question: "一台机器把 4 变成 12，把 6 变成 18。规则是什么？",
          answer: "乘以 3（4 x 3 = 12，6 x 3 = 18）。",
        },
        {
          question: "按 2 跳着数数和乘法有什么关系？",
          answer: "每跳一次加 2，所以按 2 跳五次就等于 5 x 2 = 10。",
        },
      ],
      reflectionQuestion: "为什么知道一个规律的规则，比只知道下一个数更有用？规则能做到什么，而单个答案做不到？",
      challengeProblem: {
        prompt: "一台机器把 1 变成 3，把 2 变成 5，把 3 变成 7。它会把 10 变成什么？",
        hint: "这条规则有两步。注意输入每增加 1，输出就增加 2，所以里面有乘法，再加上一点点额外的。",
        answer: "21。规则是「乘以 2，再加 1」（1x2+1=3，2x2+1=5，3x2+1=7）。对于 10：10 x 2 + 1 = 21。",
      },
      extensionChallenge: "自己发明一条两步的机器规则（比如「x 3 再 - 1」），做一张有四组输入和输出的表，然后挑战别人来破解它。",
      vocabulary: [
        {
          term: "规律",
          definition: "遵循某条你能说清楚的规则的一列数或图形。",
        },
        {
          term: "规则",
          definition: "告诉你怎样从一项走到下一项的那条指令。",
        },
        {
          term: "数列",
          definition: "按顺序排列的一串数或图形。",
        },
        {
          term: "跳着数数",
          definition: "每次都加同样多地往前数，比如 5、10、15。",
        },
        {
          term: "输入",
          definition: "你放进机器或规则里的那个数。",
        },
        {
          term: "输出",
          definition: "规则作用之后出来的那个数。",
        },
      ],
      materials: [
        "彩色纸条或珠子",
        "画表格用的铅笔和纸",
      ],
    },
    {
      title: "数位城",
      shortTitle: "数位城",
      theme: "数位城：每个数字都住在自己的街道上",
      description: "学生探索个位、十位、百位和千位如何在一个数中各占一条「街」，把数写成展开式，并通过先看最高位来比较大数。",
      estimatedTime: "45-60 分钟",
      gradeRange: "2 至 5 年级",
      skillFocus: [
        "个位、十位、百位、千位",
        "展开式",
        "比较数的大小",
      ],
      learningGoals: [
        "说出千位以内每个数字的值。",
        "把一个数写成展开式（2,345 = 2,000 + 300 + 40 + 5），再写回原来的形式。",
        "从最高数位开始比较四位数的大小。",
      ],
      keyConcepts: [
        "每一位的值都是它右边那一位的十倍。",
        "展开式把藏在每个数字里的值显露出来。",
        "比较从最高位开始，一路向右，直到两个数字不一样为止。",
      ],
      introStory: "欢迎来到数位城，这里每个数字都有自己的地址。个位住在个位街，十位住在十位大道，百位住在百位大街，而千位住在山上的千位岭。把一个数字搬到另一条街，它的整个值就变了：7 在个位街上值 7，可一旦搬到百位大街，它突然就值 700 了。今天，你就是这座城市的规划师。",
      mainLesson: [
        "在我们的数系里，每一位的值都是它右边那一位的十倍。先是个位，然后是十位（十个一），再是百位（十个十），然后是千位（十个百）。这就是为什么把一个数字往左挪一条街，它就大了十倍。",
        "在 2,345 里，2 住在千位岭上，值 2,000；3 值 300；4 值 40；5 值 5。按照街道去读每个数字，就是你找出它真实价值的方法。",
        "展开式把这些值写成一个和：2,345 = 2,000 + 300 + 40 + 5。它让隐藏的结构显现出来，在做大数的加减法时帮助极大。",
        "要比较两个数，从最高位开始，一路向右，直到两个数字不同为止。比较 3,412 和 3,398：千位打平（3 = 3），但在百位上 4 胜过 3，所以 3,412 更大。一旦找到不同之处，你就再也不用去看更低的数位了。",
      ],
      examples: [
        {
          problem: "4,682 中的 6 值多少？",
          explanation: "6 在百位上（百位大街），所以它值 6 个百，也就是 600。",
        },
        {
          problem: "把 5,207 写成展开式。",
          explanation: "5 个千 + 2 个百 + 0 个十 + 7 个一。那个 0 说明没有十位，但它把其他数字固定在各自的位置上。",
        },
        {
          problem: "比较 3,412 和 3,398。",
          explanation: "千位相同（3 = 3）。在百位上，4 大于 3，所以 3,412 是较大的数。不必再看十位和个位。",
        },
      ],
      interactiveActivity: {
        title: "拼出地址",
        instructions: [
          "读一读顶部显示的目标数。",
          "把数字方块拖到正确的街道上：千位、百位、十位和个位。",
          "读一读城市显示的展开式，检查你拼得对不对。",
        ],
        conceptConnection: "把每个数字放到正确的街道上，让数位值这个抽象概念变得具体：你会看到同一个数字在不同的街道上代表着不同的数量。",
      },
      handsOnChallenge: {
        title: "数位翻牌",
        instructions: [
          "在纸上画四栏并写好标题：千位、百位、十位、个位。",
          "抽数字卡（0-9），把每张随意放进某一栏，拼出一个数。",
          "和同伴比赛，看谁能拼出更大的数，然后用展开式念出各自的数，来证明谁的更大。",
        ],
        successLooksLike: "你能拼出一个四位数，读出每个数字的值，并用展开式说明哪个数更大。",
      },
      checkpointQuestions: [
        {
          question: "8,140 中的 8 值多少？",
          answer: "8,000（它在千位上）。",
        },
        {
          question: "把 3,406 写成展开式。",
        },
        {
          question: "6,721 和 6,712 哪个更大？",
          answer: "6,721。千位和百位打平；在十位上 2 胜过 1。",
        },
      ],
      reflectionQuestion: "为什么同一个数字，比如 5，在 5,000、500 和 50 里代表不同的数量？用街道或数位的概念解释一下。",
      challengeProblem: {
        prompt: "用 4、0、7、2 这四个数字，每个正好用一次，拼出最大的四位数和最小的四位数。它们相差多少？",
        hint: "要拼最大的，就把大的数字放左边。要拼最小的，就把小的数字放左边，但一个数不能以 0 开头。",
        answer: "最大的是 7,420，最小的是 2,047。它们的差是 7,420 - 2,047 = 5,373。",
      },
      extensionChallenge: "把数位城扩展到万位。拼出一个五位数，写成展开式，并说明万位塔离个位街有多远。",
      vocabulary: [
        {
          term: "个位",
          definition: "最右边的一位，数的是单个的一。",
        },
        {
          term: "十位",
          definition: "值为个位十倍的那一位。",
        },
        {
          term: "百位",
          definition: "值为十位十倍的那一位。",
        },
        {
          term: "千位",
          definition: "值为百位十倍的那一位。",
        },
        {
          term: "展开式",
          definition: "把一个数写成各数位值相加的形式，比如 300 + 40 + 5。",
        },
        {
          term: "标准写法",
          definition: "按平常的方式书写的数，各数字并排写在一起，比如 345。",
        },
      ],
      materials: [
        "0 到 9 的数字卡",
        "画好数位栏并写上标题的纸",
        "铅笔",
      ],
    },
    {
      title: "分数比萨店",
      shortTitle: "分数比萨店",
      theme: "分数比萨店：每一块都在讲一个故事",
      description: "学生经营一家比萨店，学会分数表示一个整体的若干相等部分（分母表示整体被平均分成几份，分子表示用了其中几份），并借助比萨模型和分数条来比较分数、找出等值分数。",
      estimatedTime: "45-60 分钟",
      gradeRange: "2 至 5 年级",
      skillFocus: [
        "分数就是相等的部分",
        "分子与分母",
        "比较简单分数",
        "等值分数",
      ],
      learningGoals: [
        "说明分母表示一个整体被平均分成几份，分子表示用了其中的几份。",
        "比较两个分母相同的分数，并借助模型比较 1/2 和 1/3 这样的分数。",
        "用比萨模型或分数条证明 1/2 和 2/4 这样的分数是等值的。",
      ],
      keyConcepts: [
        "只有各部分相等时，分数才成立。",
        "分母是相等部分的份数；分子是你取走的份数。",
        "不同的分数可以表示同样多（等值分数）。",
      ],
      introStory: "分数比萨店生意火爆。一位顾客点了「半个比萨」，下一位要「四分之三」，第三位要「六分之二」。麻烦在于：每个比萨都必须切成相等的块，否则这些订单就不公平了。作为今天的比萨师傅，你要学会像读分数一样读懂每一份订单，还要看出两份看似不同的订单其实分量一样。",
      mainLesson: [
        "分数描述的是一个整体中相等的部分。下面那个数，也就是分母，表示整体被平均切成几份。上面那个数，也就是分子，表示你说的是其中的几份。在 3/4 里，比萨被切成 4 块相等的，而你有其中的 3 块。",
        "各部分相等很关键。如果你把比萨切成四块，可其中一块很大、三块很小，那你就不能把一小块叫作「1/4」。四分之一指的是四块相等的中的一块。正是这条规则让分数变得公平。",
        "当两个分数的分母相同时，分子大的那个更大：3/4 比 1/4 多，因为同样大小的块你拿得更多。当分母不同时，模型能帮上忙：把一个比萨切成两半，另一个切成三份，你就能看出 1/2 比 1/3 大，因为分成的份数越少，每一份就越大。",
        "有些分数看起来不一样，却表示同样多。把一个比萨切成两半，再把每一半各切一次：现在你有四块，其中两块（2/4）盖住的分量，和原来的那一半（1/2）完全相同。表示同样多的分数，叫作等值分数。",
      ],
      examples: [
        {
          problem: "在分数 5/8 里，每个数分别表示什么？",
          solution: "8 = 整体中相等的份数；5 = 正在使用的份数",
          explanation: "分母 8 表示整体被切成 8 块相等的。分子 5 表示我们说的是其中的 5 块。",
        },
        {
          problem: "2/3 和 1/3 哪个更大？",
          explanation: "分母相同（都是三分之几），所以比较分子：同样大小的 2 块比 1 块多。",
        },
        {
          problem: "1/2 和 2/4 等值吗？",
          explanation: "把比萨的每一半再切成两块，就得到四块相等的；其中两块（2/4）和一半（1/2）盖住的分量相同，所以它们是等值的。",
        },
      ],
      interactiveActivity: {
        title: "完成比萨订单",
        instructions: [
          "读一读顾客的订单，比如「一个比萨的 3/4」。",
          "把相等块数调整到与分母一致，然后把与分子一样多的块涂上颜色。",
          "在加分回合里，拖出第二个比萨，为同一份订单展示一个等值分数。",
        ],
        conceptConnection: "先设定分母（块数）、再设定分子（涂色的块数），把分数的两项任务分开，变得具体而不容易混淆。",
      },
      handsOnChallenge: {
        title: "纸比萨分数",
        instructions: [
          "剪出三个一样大的纸圆片（「比萨」）。",
          "把一个折并剪成两半，一个剪成四份，一个剪成八份，注意让每一块都相等。",
          "用这些块拼出订单，然后找出两种不同的方法凑出一半（例如 2/4 和 4/8）。",
        ],
        successLooksLike: "你能把一些块叠在另一些上面，证明两个分数等值，并解释为什么各部分必须相等。",
      },
      checkpointQuestions: [
        {
          question: "在 4/6 里，哪个数是分母？它告诉你什么？",
          answer: "6 是分母；它告诉你整体被平均分成了 6 份。",
        },
        {
          question: "3/5 和 2/5 哪个更大？",
          answer: "3/5，因为在相等的五分之一里，三份比两份多。",
        },
        {
          question: "说出一个和 1/2 等值的分数。",
          answer: "2/4（也可以是 3/6 或 4/8），它们表示的分量都一样。",
        },
      ],
      reflectionQuestion: "为什么必须先把比萨切成相等的块，我们才能把其中一块叫作「1/4」？如果它们不相等，会出什么问题？",
      challengeProblem: {
        prompt: "玛丽亚吃了一个比萨的 2/4，山姆吃了一个一模一样的比萨的 1/2。谁吃得更多，还是他们吃得一样多？请证明。",
        hint: "试着把两个比萨都用相等的块画出来，或者给其中一个分量找一个等值分数，让两者的分母相同。",
        answer: "他们吃得一样多。2/4 与 1/2 等值，所以两人都吃了半个比萨。",
      },
      extensionChallenge: "设计一份比萨店菜单，用分数写出三种优惠，然后为每种优惠找出一个等值分数，让顾客看到自己拿到的分量是公道的。",
      vocabulary: [
        {
          term: "分数",
          definition: "表示一个整体中相等部分的数。",
        },
        {
          term: "分子",
          definition: "上面那个数；表示你有多少个相等的部分。",
        },
        {
          term: "分母",
          definition: "下面那个数；表示整体被分成了多少个相等的部分。",
        },
        {
          term: "整体",
          definition: "被切成若干部分之前那个完整的东西。",
        },
        {
          term: "等值分数",
          definition: "表示同样多的不同分数，比如 1/2 和 2/4。",
        },
        {
          term: "相等的部分",
          definition: "大小完全一样的各个部分。",
        },
      ],
      materials: [
        "纸圆片",
        "剪刀",
        "蜡笔或马克笔",
      ],
    },
    {
      title: "测量任务",
      shortTitle: "测量任务",
      theme: "测量任务：为每项工作挑对工具和单位",
      description: "学生测量长度、高度、重量和容量，先估算再测量，并学会挑选合理的单位：铅笔要用厘米量，而不是千米。",
      estimatedTime: "45-60 分钟",
      gradeRange: "2 至 5 年级",
      skillFocus: [
        "长度和高度",
        "重量",
        "容量",
        "估算",
        "合适的单位",
      ],
      learningGoals: [
        "用尺子测量长度和高度，并把读数读到最接近的单位。",
        "为一个物体挑选合适的单位（厘米还是米，克还是千克，毫升还是升）。",
        "先估算一个测量结果，再实际测量，并比较估算差了多少。",
      ],
      keyConcepts: [
        "测量回答的是「多少」：多长、多重、能装多少。",
        "合适的单位要与物体的大小相称。",
        "先估算，会让你日子久了测量得更准也更快。",
      ],
      introStory: "指挥中心遇到了麻烦：新俱乐部小屋的图纸上，所有尺寸都写着「挺大的」和「有点重」。工人们没法照这个施工。你的任务是把真实的数据量出来（门的长度、架子的高度、工具箱的重量，以及饮水机能装多少水），并把每一项都用一个数字加正确的单位报上来。",
      mainLesson: [
        "测量就是把一个物体和一个单位作比较，数一数能容下多少个单位。一把以厘米为刻度的尺子，能让你数出一支铅笔有多少厘米长。把零刻度对准一端，再读另一端的数字。",
        "长度和高度使用厘米、米这样的单位。重量（东西有多沉）使用克和千克。容量（一个容器能装多少）使用毫升和升。把要测的量和它所属的单位家族对上，是任何测量的第一步。",
        "合适的单位要与物体的大小相称。一支铅笔大约 18 厘米，用米来量就会得到 0.18 这样又小又别扭的数字。一扇门大约 2 米，用厘米量（200）也行，但用米更顺手。大东西配大单位，小东西配小单位。",
        "会测量的人都先估算。量架子之前，先猜一猜：「大约 1 米」。然后测量并比较。每一次拿猜测去对照真实数字，你的估算就更准一分，而这项本领会在你不需要精确数字时替你省下时间。",
      ],
      examples: [
        {
          problem: "量一间教室的长度，用厘米还是米更合适？",
          solution: "米",
          explanation: "一间教室有好几米长。用厘米会得到一个庞大又笨拙的数字，所以米才是合理的单位。",
        },
        {
          problem: "一瓶水大约能装 500 什么单位？",
          solution: "毫升",
          explanation: "小瓶子的容量用毫升来量；500 毫升是半升，是很典型的瓶装容量。",
        },
        {
          problem: "你估计一本书高 20 厘米，量出来是 24 厘米。你的估算差了多少？",
          explanation: "用实际测量值减去估算值：24 - 20 = 4 厘米。你猜得挺接近的，只少了 4 厘米。",
        },
      ],
      interactiveActivity: {
        title: "先估算，再测量",
        instructions: [
          "看看显示的每个物体，从选项中挑出最合适的单位。",
          "输入你对这个测量结果的估算。",
          "揭晓真实的测量值，看看你的估算有多接近；单位选得好、猜得准都能得分。",
        ],
        conceptConnection: "先挑单位再估算，能培养关于大小的数感：你会真正体会到一厘米、一千克、一升到底是多少。",
        sampleData: {
          items: [
            {
              object: "新铅笔",
            },
            {
              object: "教室的门",
            },
            {
              object: "一袋苹果",
            },
            {
              object: "盒装果汁",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "量遍房间寻宝记",
        instructions: [
          "列出身边的五样东西（一本书、一把勺子、一把椅子、一个杯子、一只鞋）。",
          "对每一样，先写下你的估算和你打算用的单位。",
          "用尺子、秤或量杯量出每样东西，把真实数字记在你的估算旁边。",
        ],
        successLooksLike: "你的表格里，每样东西都有估算值、所选单位和实际测量值，而且你能指出哪些估算最接近。",
      },
      checkpointQuestions: [
        {
          question: "称一个西瓜，你会用克还是千克？",
          answer: "千克。西瓜很重，用千克才能得到一个合理的数字。",
        },
        {
          question: "容量衡量的是容器的什么？",
          answer: "它能装下多少（比如多少毫升或多少升水）。",
        },
        {
          question: "你猜是 30 厘米，量出来是 27 厘米。你差了多少？",
          answer: "3 厘米（30 - 27 = 3）。",
        },
      ],
      reflectionQuestion: "为什么挑对单位很重要？描述一对物体和单位，它们搭在一起会显得很荒唐。",
      challengeProblem: {
        prompt: "一条丝带长 2 米。你剪下三段，每段 40 厘米。还剩多少厘米的丝带？",
        hint: "先把 2 米换算成厘米（1 米 = 100 厘米）。然后减去你剪下的那些。",
        answer: "还剩 80 厘米。2 米 = 200 厘米；三段 40 厘米共剪下 120 厘米；200 - 120 = 80 厘米。",
      },
      extensionChallenge: "用厘米量出三位家人的身高，从矮到高排好序，再求出最高和最矮之间相差多少。",
      vocabulary: [
        {
          term: "长度",
          definition: "一样东西从一端到另一端有多长。",
        },
        {
          term: "高度",
          definition: "一样东西从下到上有多高。",
        },
        {
          term: "重量",
          definition: "一样东西有多沉。",
        },
        {
          term: "容量",
          definition: "一个容器能装下多少。",
        },
        {
          term: "单位",
          definition: "用来测量的标准量，比如一厘米或一升。",
        },
        {
          term: "估算值",
          definition: "在精确测量之前做出的、足够接近的猜测。",
        },
      ],
      materials: [
        "尺子或卷尺",
        "厨房秤（可选）",
        "量杯（可选）",
        "画表格用的纸",
      ],
    },
    {
      title: "几何探险家",
      shortTitle: "几何探险家",
      theme: "几何探险家：绘制图形世界的地图",
      description: "学生依据边、角、面、棱和顶点等属性来探索平面图形和立体图形，并通过对折使两半重合来发现对称轴。",
      estimatedTime: "45-60 分钟",
      gradeRange: "2 至 5 年级",
      skillFocus: [
        "平面图形",
        "立体图形",
        "边和角",
        "面和棱",
        "对称",
      ],
      learningGoals: [
        "通过数边和数角来说出平面图形的名称（三角形有 3 条边和 3 个角）。",
        "用面、棱和顶点来描述立体图形（正方体有 6 个面、12 条棱、8 个顶点）。",
        "把一个图形对折，使两半完全重合，从而找出它的对称轴。",
      ],
      keyConcepts: [
        "平面图形是平的；我们数它的边和角。",
        "立体图形是实心的；我们数它的面、棱和顶点。",
        "如果一个图形能被折成两个重合的一半，它就有对称轴。",
      ],
      introStory: "你是最新上任的几何探险家，面前这张地图上布满了还没人命名的图形。有些是平的，像地板上的瓷砖；有些是实心的，像你能拿在手里的积木。你的探险装备很简单：数边、数角、数面和棱，再折一折找出藏起来的对称。每描述对一个图形，它就会被钉在地图上。",
      mainLesson: [
        "平的图形叫作平面图形（二维图形）。我们通过数边（那些直的边缘）和角（也叫顶点，是两条边相交的地方）来辨认它们。三角形有 3 条边和 3 个角；正方形有 4 条相等的边和 4 个角；五边形有 5 条边和 5 个角。",
        "实心的图形是立体图形（三维图形），你能把它们拿在手里。我们用面（平的表面）、棱（两个面相交的地方）和顶点（尖尖的角）来描述它们。正方体有 6 个正方形的面、12 条棱和 8 个顶点。长方体（长方体棱柱）的数目一样，只是它的面是长方形。",
        "平面图形和立体图形是相通的：立体图形的面就是平面图形。正方体的面是正方形；一个罐子（圆柱）有两个圆形的面。认得平面图形，能帮你描述由它们构成的立体图形。",
        "如果你能把一个图形折起来，让两半正好落在彼此之上，它就有一条对称轴。正方形有 4 条对称轴；长方形有 2 条；一颗心有 1 条（从正中间竖着下来）。对折是最可靠的检验：如果两半对不上，那道折痕就不是对称轴。",
      ],
      examples: [
        {
          problem: "六边形有多少条边和多少个角？",
          solution: "6 条边和 6 个角",
          explanation: "「六」就是六。六边形有 6 条直边，每两条边相交于一个角，所以它也有 6 个角。",
        },
        {
          problem: "正方体有多少个面、多少条棱、多少个顶点？",
          solution: "6 个面、12 条棱、8 个顶点",
          explanation: "正方体就像一个有 6 个正方形面的盒子。每两个面相交的地方是一条棱（共 12 条），每个尖角是一个顶点（共 8 个）。",
        },
        {
          problem: "一个长方形（不是正方形）有多少条对称轴？",
          explanation: "你可以把长方形上下对折，也可以左右对折，两半都能重合，但沿对角线折就对不上了，所以它有 2 条对称轴。",
        },
      ],
      interactiveActivity: {
        title: "把图形分类并对折",
        instructions: [
          "把每个图形放进平面图形筐或立体图形筐。",
          "对平面图形，填入边数和角数；对立体图形，填入面数、棱数和顶点数。",
          "用对折工具检验每个平面图形的对称轴，数一数它有几条。",
        ],
        conceptConnection: "按维度分类并清点属性，把图形的名字变成可以推理的东西，而对折工具让对称成为你亲眼看见的事，而不是死记硬背的。",
        sampleData: {
          shapes2D: [
            {
              name: "三角形",
            },
            {
              name: "正方形",
            },
            {
              name: "长方形",
            },
            {
              name: "六边形",
            },
          ],
          shapes3D: [
            {
              name: "正方体",
            },
            {
              name: "长方体",
            },
            {
              name: "正四棱锥",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "做图形、折图形",
        instructions: [
          "从纸上剪出平面图形，把每一个都折一折，找出它所有的对称轴；用铅笔把每条折痕描出来。",
          "用展开图（摊平的图样）折出一个正方体或长方体，边折边数它的面、棱和顶点。",
          "做一张图形表，列出每个图形和它的各项属性。",
        ],
        successLooksLike: "你的表格正确列出了平面图形的边数和角数，以及立体图形的面数、棱数和顶点数，而且你折出的图形显示出了真正的对称轴。",
      },
      checkpointQuestions: [
        {
          question: "哪种平面图形有 4 条相等的边和 4 个角？",
          answer: "正方形。",
        },
        {
          question: "正方体有多少条棱？",
          answer: "12 条棱。",
        },
        {
          question: "正方形有多少条对称轴？",
          answer: "4 条（两条穿过边的中点，两条穿过对角）。",
        },
      ],
      reflectionQuestion: "平面图形和立体图形是怎么联系起来的？挑一个立体图形，描述你在它各个面上看到的平面图形。",
      challengeProblem: {
        prompt: "一个立体图形有 5 个面、8 条棱和 5 个顶点。其中一个面是正方形，其余都是三角形。它是哪种立体图形？",
        hint: "想象一个底面是平的、侧面是三角形并在顶上汇于一点的立体图形。",
        answer: "正四棱锥。正方形底面加上四个三角形面共 5 个面，底面的四个角加上顶上那个点共 5 个顶点。",
      },
      extensionChallenge: "画出一半，然后对折并描摹，让两边完全对称，设计一只蝴蝶或一张面具。最后标出它的对称轴。",
      vocabulary: [
        {
          term: "平面图形",
          definition: "有长和宽的平的图形，比如三角形或正方形。",
        },
        {
          term: "立体图形",
          definition: "能拿在手里的实心图形，比如正方体或球。",
        },
        {
          term: "边",
          definition: "平面图形上一条直的边缘。",
        },
        {
          term: "顶点（角）",
          definition: "两条或更多条边、棱相交的那个点。",
        },
        {
          term: "面",
          definition: "立体图形上一块平的表面。",
        },
        {
          term: "棱",
          definition: "立体图形上两个面相交而成的那条线。",
        },
        {
          term: "对称轴",
          definition: "把一个图形分成两个重合的一半的折痕线。",
        },
      ],
      materials: [
        "纸",
        "剪刀",
        "可供折叠的图形展开图（可选）",
        "铅笔",
      ],
    },
    {
      title: "时间与金钱挑战",
      shortTitle: "时间与金钱",
      theme: "时间与金钱挑战：管好你的一天和你的钱包",
      description: "学生读钟表、算出两件事之间过了多久、数硬币和纸币、找零，还要做一份简单的预算，这些都是人们每天都在用的数学。",
      estimatedTime: "45-60 分钟",
      gradeRange: "2 至 5 年级",
      skillFocus: [
        "认读时间",
        "经过的时间",
        "数钱",
        "找零",
        "简单预算",
      ],
      learningGoals: [
        "在指针钟表上读出精确到五分钟的时间，并把它与数字时间对应起来。",
        "用数轴或往前数的方法求出两个时刻之间经过的时间（从 2:15 到 3:00 是 45 分钟）。",
        "数一堆混在一起的硬币和纸币，用往前数的方法找零，并在预算之内计划一次购买。",
      ],
      keyConcepts: [
        "短针指示小时；长针指示分钟。",
        "经过的时间就是开始时刻与结束时刻之间的间隔。",
        "找零就是从价格往前数到顾客付的钱数。",
      ],
      introStory: "你拿到了学校小卖部一天的钥匙，还有一张必须遵守的时间表。校车 3:00 到，所以你得知道还有多久。一位顾客用一美元买了 65 美分的铅笔，正等着找零。而你手上正好有 $5 用来补货。时间和金钱掌管着一整天，而今天，它们要经过你的手。",
      mainLesson: [
        "在指针钟表上，短针指向小时，长针指向分钟。长针每经过一个数字就是 5 分钟，所以当它指向 3 时，就是过了 15 分钟。「2:15」表示小时是 2，已经过了 15 分钟。",
        "经过的时间就是从开始到结束之间过了多久。要求出它，就往前数。从 2:15 到 3:00，数出 45 分钟（从 2:15 到 2:30 是 15 分钟，再到 3:00 又是 30 分钟，一共 45 分钟）。画一条时刻的数轴，会让这一点非常直观。",
        "钱是按面值来数的。25 美分的硬币值 25，10 美分的值 10，5 美分的值 5，1 美分的值 1。从面值大的往小的数：一枚 25 美分、两枚 10 美分和一枚 5 美分就是 25 + 10 + 10 + 5 = 50 美分。纸币也是一样的道理，只是数额更大。",
        "找零就是从价格往前数到顾客付的钱数。如果一支铅笔卖 65 美分，顾客用一美元（100 美分）付账，就往前数：65 到 70（一枚 5 美分），70 到 100（三枚 10 美分），所以找零 35 美分。预算则更进一步：手上有 $5，你要计划各项开支，让总额不超过你有的钱。",
      ],
      examples: [
        {
          problem: "时针在 4 和 5 之间，分针指向 6。现在是几点？",
          explanation: "分针指向 6 表示过了 30 分钟（6 x 5 = 30）。时针刚过 4，所以是 4:30。",
        },
        {
          problem: "从 1:45 到 2:30 过了多久？",
          solution: "45 分钟",
          explanation: "往前数：1:45 到 2:00 是 15 分钟，2:00 到 2:30 是 30 分钟。15 + 30 = 45 分钟。",
        },
        {
          problem: "一件商品卖 65 美分，你用 $1 付账。找零多少？",
          solution: "35 美分",
          explanation: "从 65 往前数到 100：是 35 美分。所以找零 35 美分（一枚 25 美分和一枚 10 美分）。",
        },
      ],
      interactiveActivity: {
        title: "经营学校小卖部",
        instructions: [
          "每笔交易中，把硬币和纸币拖进托盘，凑够显示的价格。",
          "当顾客多付了钱时，往前数出正确的找零。",
          "把补货预算放在眼前，别等超支了才停手。",
        ],
        conceptConnection: "凑出准确的金额、往前数着找零，把钱变成了有真实目的的动手加减法。",
        sampleData: {
          coins: [
            {
              name: "1 美分硬币",
            },
            {
              name: "5 美分硬币",
            },
            {
              name: "10 美分硬币",
            },
            {
              name: "25 美分硬币",
            },
          ],
          bills: [
            {
              name: "一美元纸币",
            },
            {
              name: "五美元纸币",
            },
          ],
          sales: [
            {
              item: "铅笔",
            },
            {
              item: "橡皮",
            },
            {
              item: "笔记本",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "小卖部与时间表角色扮演",
        instructions: [
          "摆出玩具硬币或真硬币，给三件「商品」贴上价签。",
          "轮流当收银员和顾客：顾客用硬币付账，收银员往前数着找零。",
          "然后排一张简单的一日时间表，安排三件事，并算出每两件事之间经过的时间。",
        ],
        successLooksLike: "你能靠往前数找出正确的零钱，并说出时间表上两件事之间过了多少分钟。",
      },
      checkpointQuestions: [
        {
          question: "时针过了 7、分针指向 3 时，是几点？",
          answer: "7:15（分针指向 3 表示过了 15 分钟）。",
        },
        {
          question: "从 6:20 到 7:00 有多久？",
          answer: "40 分钟（往前数：20 分钟到 6:40，再 20 分钟到 7:00，一共 40 分钟）。",
        },
        {
          question: "你用 $1 买了 70 美分的零食。找零多少？",
          answer: "30 美分。",
        },
      ],
      reflectionQuestion: "为什么往前数是一种好用的找零方法？它和减法有什么联系？",
      challengeProblem: {
        prompt: "你有 $5 可以花。你买了一支 $1.25 的马克笔和一本 $2.50 的笔记本。还剩多少钱？你还买得起一块 $1.50 的橡皮吗？",
        hint: "先把两笔开销加起来，从 $5 里减掉，再拿剩下的钱和橡皮的价格比一比。",
        answer: "还剩 $1.25。马克笔和笔记本共 $1.25 + $2.50 = $3.75；$5.00 - $3.75 = $1.25。你买不起 $1.50 的橡皮，因为 $1.25 不够。",
      },
      extensionChallenge: "为一场派对的零食做一份 $10 的预算：列出至少三样商品和价格，把总额控制在 $10 以内，并算出用一张 $10 纸币付账能找回多少。",
      vocabulary: [
        {
          term: "指针钟表",
          definition: "带时针和分针的钟表。",
        },
        {
          term: "电子钟",
          definition: "用数字显示时间的钟表，比如 4:30。",
        },
        {
          term: "经过的时间",
          definition: "从开始到结束之间过去的时间长度。",
        },
        {
          term: "找零",
          definition: "你付的钱多于价格时，退回给你的钱。",
        },
        {
          term: "预算",
          definition: "一份关于你能花多少钱的计划。",
        },
        {
          term: "面值",
          definition: "一枚硬币或一张纸币值多少，比如 25 美分的硬币。",
        },
      ],
      materials: [
        "玩具硬币纸币或真钱",
        "纸做的价签",
        "一个钟表，或画出来的钟面",
      ],
    },
    {
      title: "数据侦探",
      shortTitle: "数据侦探",
      theme: "数据侦探：把计数符号变成答案",
      description: "学生用计数表收集数据，用条形图和象形图把数据呈现出来，并读图来回答问题、比较各类别，从数字中找出藏着的故事。",
      estimatedTime: "45-60 分钟",
      gradeRange: "2 至 5 年级",
      skillFocus: [
        "计数表",
        "条形图",
        "象形图",
        "解读数据",
        "比较各类别",
      ],
      learningGoals: [
        "用计数表收集数据，并以五个一组来清点计数符号。",
        "根据一组数据画出条形图和象形图，象形图还要配上图例。",
        "读图回答「有多少」「哪个最多或最少」和「多出多少」这类问题。",
      ],
      keyConcepts: [
        "数据是我们收集来的信息，而表格让它保持有条理。",
        "条形图用条的高度、象形图用图画来比较各个类别。",
        "读图就是比较各个类别并找出差别。",
      ],
      introStory: "教室里正流传着一个谜团：大家最喜欢的水果是什么？传闻说是苹果，但数据侦探不信传闻，数据侦探只收集证据。你要对全班做一次调查，为每一票画一个计数符号，然后把这些符号变成一张清清楚楚的图，让任何人一眼就能看出答案。",
      mainLesson: [
        "数据是我们为回答一个问题而收集的信息。为了保持条理，我们用计数表：每一项画一道，每画到第五道就横着划过前面四道，这样就能五个五个地数。计数符号让清点一次大规模调查既快又准。",
        "条形图用长条来呈现数据：条越高，那个类别就越多。长条让比较变得容易：最高的条就是「最多」，最矮的就是「最少」，你一眼就能看出来，一点算术都不用做。",
        "象形图用一个图画代表若干个项目，并由图例来说明（例如，一个苹果图案 = 2 票）。如果一行有 3 个苹果图案，每个代表 2 票，那个类别就有 6 票。图例必不可少：没有它，你就不知道这些图案是什么意思。",
        "真正的侦探工作是读图。你要回答这样的问题：「有多少人选了香蕉？」「哪种水果最受欢迎？」「选苹果的比选葡萄的多多少？」最后这个问题是一道减法：找到两个条，求出它们的差。",
      ],
      examples: [
        {
          problem: "计数表上，苹果那一栏有四道竖线和一道横着划过它们的线。这是多少票？",
          solution: "5 票",
          explanation: "四道加上第五道横划，构成一组五个，也就等于 5 票。",
        },
        {
          problem: "在一张象形图里，每个苹果 = 2 票。某一行有 4 个苹果图案。这是多少票？",
          solution: "8 票",
          explanation: "用图案的数量乘以图例的值：4 个图案 x 每个 2 票 = 8 票。",
        },
        {
          problem: "一张条形图显示苹果 = 9、葡萄 = 4。选苹果的多多少？",
          solution: "多 5 个",
          explanation: "找到两个条并相减：9 - 4 = 5。选苹果的人比选葡萄的多五个。",
        },
      ],
      interactiveActivity: {
        title: "从计数符号到图表",
        instructions: [
          "把调查结果按类别录入成计数符号。",
          "切换到条形图视图，把每个条拖到正确的高度。",
          "切换到象形图视图，设定图例，并回答侦探就你的数据提出的三个问题。",
        ],
        conceptConnection: "把同一组数据变成计数符号、条形图和象形图，说明图表不过是你收集到的那些数字更好读的一张画。",
        sampleData: {
          question: "你最喜欢的水果是什么？",
          results: [
            {
              category: "苹果",
            },
            {
              category: "香蕉",
            },
            {
              category: "葡萄",
            },
            {
              category: "橙子",
            },
          ],
          questions: [
            "哪种水果最受欢迎？",
            "有多少人选了橙子？",
            "选苹果的比选葡萄的多多少？",
          ],
        },
      },
      handsOnChallenge: {
        title: "做一次你自己的调查",
        instructions: [
          "选一个有四个选项的问题（最喜欢的颜色、宠物、运动或零食）。",
          "至少问十个人，每个回答都用一个计数符号记下来。",
          "在方格纸上把你的计数符号变成条形图，然后写出两个你的图能回答的问题。",
        ],
        successLooksLike: "你的条形图标注了各个类别，刻度清晰，而且你能用它回答「哪个最多」和「多出多少」。",
      },
      checkpointQuestions: [
        {
          question: "计数符号怎样帮你清点一次大规模调查？",
          answer: "它们把计数按五个一组分好，所以你可以五个五个地快数，而不用一个一个地数。",
        },
        {
          question: "在一张每颗星 = 5 的象形图里，某一行有 3 颗星。那是多少？",
          answer: "15（3 颗星 x 5 = 15）。",
        },
        {
          question: "一张条形图显示狗 = 7、猫 = 10。选猫的多多少？",
          answer: "多 3 个（10 - 7 = 3）。",
        },
      ],
      reflectionQuestion: "为什么一张图比一长串计数符号更容易看懂？图能让你迅速看出什么？",
      challengeProblem: {
        prompt: "一张宠物象形图用一个爪印 = 4 只宠物。狗有 5 个爪印，猫有 3 个爪印，鱼有 2 个爪印。一共有多少只宠物？哪一种最受欢迎？",
        hint: "把每个类别的爪印数乘以 4，求出各自的数量，再把所有类别加起来。",
        answer: "一共 40 只宠物，狗最受欢迎。狗 = 5 x 4 = 20，猫 = 3 x 4 = 12，鱼 = 2 x 4 = 8；20 + 12 + 8 = 40。",
      },
      extensionChallenge: "在两个不同的日子各收集一次数据，并排画出两张条形图。写一句话，描述两天之间结果发生了什么变化。",
      vocabulary: [
        {
          term: "数据",
          definition: "你为回答一个问题而收集的信息。",
        },
        {
          term: "计数表",
          definition: "用五个一组的符号记录数量的表格。",
        },
        {
          term: "条形图",
          definition: "用长条的高度来比较各类别的图表。",
        },
        {
          term: "象形图",
          definition: "用图画来代表数量的图表。",
        },
        {
          definition: "说明象形图中每个图案代表多少个项目的注解。",
        },
        {
          term: "类别",
          definition: "正在被清点的一个组或一个选项，比如「苹果」。",
        },
      ],
      materials: [
        "方格纸",
        "铅笔",
        "一个用来做调查的问题",
        "画直条用的尺子",
      ],
    },
    {
      title: "建一座数学城市",
      shortTitle: "数学城市",
      theme: "总结项目：设计一座靠数学运转的城市",
      description: "学生把课程中的每一项本领结合起来，在方格纸上设计一座纸做的城市：量过高度的几何楼房、卖分数的面包店、会找零的银行，以及做成图表的居民调查，最后讲解背后的数学。",
      estimatedTime: "60-90 分钟",
      gradeRange: "2 至 5 年级",
      skillFocus: [
        "几何",
        "测量",
        "金钱",
        "分数",
        "运算",
        "数据",
        "解决问题",
      ],
      learningGoals: [
        "把几何、测量、分数、金钱、运算和数据一起运用起来，设计并建造一座纸做的城市。",
        "用课程中正确的术语，讲解这座城市至少三个部分背后的数学。",
        "解决一个多步的规划问题，比如在满足尺寸要求的同时不超出建造预算。",
      ],
      keyConcepts: [
        "真实的项目会同时用到许多种数学。",
        "规划意味着把运算、测量和金钱一起用起来去达成目标。",
        "把你的数学讲清楚，也是完成一个项目的一部分。",
      ],
      introStory: "数学城的市长在盛大开城之前还剩最后一件事：整座城市都要设计出来，而且必须运转得起来。每座楼都是一个图形，每条街都有长度，面包店按分数卖东西，银行要找零，而城市规划师想要一张关于居民最喜欢什么的图表。你已经训练了九周。现在你就是总设计师，去建一座靠数学运转的城市吧。",
      mainLesson: [
        "这一周，你要把学过的一切汇集起来。城市是最合适的项目，因为它同时需要所有这些：楼房要用图形，街道要用测量，面包店要用分数，银行要用金钱，规划要用运算，理解居民要用数据。",
        "先从几何和测量开始。在方格纸上画出你的城市。每座楼都是一个平面图形或立体图形，标出它的边和角，或者面和棱，并给它一个量出来的高度，给每条街一个量出来的长度。方格能让一切保持比例。",
        "再加上金钱和分数。开一家按整体的分数出售商品的面包店（半个派、1/4 个蛋糕），再开一家处理购买并找零的银行。定好价格，并展示至少一笔交易：顾客付钱，并拿到正确的找零。",
        "最后落到数据和规划。找几位「居民」（家人或同学）做调查，问他们最喜欢城市的哪一部分，再把结果做成条形图或象形图。然后迎接一个挑战：在给定的建造预算内设计你的城市，用运算确认各项花费加起来没问题。展示时，讲解至少三个部分背后的数学。",
      ],
      examples: [
        {
          problem: "一座楼是长方体，高 4 厘米，底面是 3 厘米乘 2 厘米。说出它的形状名称和面的数目。",
          solution: "长方体，6 个面",
          explanation: "盒子形状就是长方体。和正方体一样，它有 6 个面（顶面、底面和四个侧面），还有 12 条棱和 8 个顶点。",
        },
        {
          problem: "面包店把一个派切成四份，每块卖 50 美分。一位顾客用 $2 买了 3 块。找零多少？",
          solution: "找零 50 美分",
          explanation: "三块，每块 50 美分，一共 3 x 50 = 150 美分（$1.50）。用 $2.00 付账：200 - 150 = 找零 50 美分。",
        },
        {
          problem: "你的建造预算是 $20。一栋房子 $6，一所学校 $9，一个公园 $4。三样都建得起来吗？",
          solution: "可以，还剩 $1",
          explanation: "把花费加起来：6 + 9 + 4 = 19。因为 19 小于 20，所以三样都能建，预算里还剩 20 - 19 = $1。",
        },
      ],
      interactiveActivity: {
        title: "设计数学城",
        instructions: [
          "把楼房的形状放到方格上，为每一座设定高度和底面尺寸。",
          "开设面包店和银行：定好分数价格，并完成至少一笔带找零的交易。",
          "调查居民，把结果做成图表，并让建造总花费保持在显示的预算之内。",
        ],
        conceptConnection: "城市规划师把课程的各个单元汇到一起，所以每一个决定（一个图形、一段长度、一个价格、一张图表）都同时用到了不同周次的数学。",
        sampleData: {
          bakeryItems: [
            {
              item: "一块派",
            },
            {
              item: "半个蛋糕",
            },
          ],
          surveyQuestion: "数学城里你最喜欢哪一部分？",
          surveyCategories: [
            "公园",
            "面包店",
            "学校",
            "商店",
          ],
        },
      },
      handsOnChallenge: {
        title: "建造并展示你的纸城市",
        instructions: [
          "在方格纸或海报纸上画出并标注你的城市：楼房用的图形、量出来的街道长度、一家标着分数价格的面包店，以及一家银行。",
          "对至少六个人做一次调查，把结果做成条形图或象形图，添到你的城市里。",
          "准备一段简短的展示，讲解三个部分背后的数学（例如某座楼的形状、银行找的零钱，以及图表说明了什么）。",
        ],
        successLooksLike: "你完成的城市用上了几何、测量、分数、金钱和数据，没有超出建造预算，而且你能清楚地讲解其中三个部分背后的数学。",
      },
      checkpointQuestions: [
        {
          question: "说出你的城市用到的两种数学，以及它们各自出现在哪里。",
          answer: "答案不唯一；例如，楼房形状里的几何，以及银行找零时的金钱。",
        },
        {
          question: "你的预算是 $15，楼房花了 $12。还剩多少？",
          answer: "$3（15 - 12 = 3）。",
        },
        {
          question: "面包店把蛋糕切成两半来卖。一整个蛋糕有几块？",
          answer: "2 块，因为「一半」意味着两个相等的部分。",
        },
      ],
      reflectionQuestion: "课程里的哪项数学本领对建造你的城市最有用？为什么？同时用上好几种数学，有什么让你意外的地方？",
      challengeProblem: {
        prompt: "你的城市有 $30 的建造预算。你必须包含一所学校（$9）和一个公园（$4），并想用剩下的钱建一座尽可能高的摩天大楼。摩天大楼由积木搭成，每块 $3，能增加 2 厘米高度。你能建得起的最高的摩天大楼是多高？",
        hint: "先把必建的楼花掉，看看还剩多少钱，再算出你能买几块完整的 $3 积木，以及每块增加多少高度。",
        answer: "10 厘米高。学校 + 公园 = 9 + 4 = 13，还剩 30 - 13 = 17。每块积木 $3，$17 能买 5 块完整的（$15），还剩 $2。五块积木 x 每块 2 厘米 = 10 厘米。",
      },
      extensionChallenge: "给你的城市加一条公共交通线路：在方格上标出车站，给这条线路一个量出来的总长度，再做一张时刻表，显示从首站到末站经过的时间。",
      vocabulary: [
        {
          term: "设计",
          definition: "有目的地规划并创造某样东西。",
        },
        {
          term: "比例",
          definition: "让各个尺寸保持相称，通常借助方格来实现。",
        },
        {
          term: "预算",
          definition: "一份关于你能花多少的计划。",
        },
        {
          term: "交易",
          definition: "用钱换商品的一次买卖。",
        },
        {
          term: "多步问题",
          definition: "需要不止一种运算或不止一个阶段才能解决的问题。",
        },
      ],
      materials: [
        "方格纸或海报纸",
        "尺子",
        "蜡笔或马克笔",
        "玩具钞票",
        "剪刀和胶带",
      ],
    },
  ],
}

const pt: DeepPartial<MathCurriculum> = {
  title: "Aventuras Matemáticas",
  description: "Um curso de matemática de 10 semanas para o 2.º ao 5.º ano, em que cada semana transforma uma grande ideia matemática (senso numérico, operações, padrões, valor posicional, frações, medidas, geometria, tempo e dinheiro, e dados) em uma aventura prática, até chegar a um projeto final em que os alunos projetam a própria cidade matemática.",
  gradeRange: "2.º ao 5.º ano",
  estimatedTimePerLesson: "45-60 minutos",
  topics: [
    "Senso numérico",
    "Operações",
    "Padrões",
    "Valor posicional",
    "Frações",
    "Medidas",
    "Geometria",
    "Tempo e dinheiro",
    "Dados e gráficos",
    "Resolução de problemas",
  ],
  finalProjectTitle: "Construa uma cidade matemática",
  finalProjectDescription: "Na última semana, os alunos projetam uma cidade de papel sobre uma malha quadriculada em que cada parte usa a matemática que aprenderam: os prédios são figuras geométricas com alturas medidas, uma padaria vende produtos em frações, um banco conta dinheiro e dá troco, e uma pesquisa com os moradores da cidade vira um gráfico de barras. Os alunos apresentam a cidade e explicam a matemática por trás de três de seus elementos.",
  lessons: [
    {
      title: "Detetives dos números",
      shortTitle: "Detetives dos números",
      theme: "A Agência de Detetives Numéricos: resolvendo casos com pistas de números",
      description: "Os alunos viram detetives que leem as pistas escondidas dentro de um número (o tamanho dele, quais algarismos ele tem e como pode ser separado) para comparar, estimar e identificar números misteriosos.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º ao 5.º ano",
      skillFocus: [
        "Senso numérico",
        "Comparar números",
        "Estimar",
        "Decompor números",
      ],
      learningGoals: [
        "Comparar dois números usando maior que (>), menor que (<) e igual a (=), olhando o valor posicional a partir do algarismo maior.",
        "Estimar aproximadamente quantos objetos há em um grupo arredondando para a dezena ou a centena mais próxima, e explicar por que nem sempre é preciso contar exatamente.",
        "Decompor um número em centenas, dezenas e unidades (por exemplo, 256 = 200 + 50 + 6) e montá-lo de novo.",
      ],
      keyConcepts: [
        "O valor de um algarismo depende do lugar que ele ocupa no número.",
        "Para comparar números, alinhe-os e confira primeiro a maior ordem.",
        "Estimar dá uma resposta rápida e próxima o bastante quando contar exatamente é demorado.",
      ],
      introStory: "A Agência de Detetives Numéricos acabou de receber um caso. Alguém deixou uma única pista na porta: \"Sou um número de três algarismos. Meu algarismo das centenas é 4, meu algarismo das dezenas é maior que 7 e meu algarismo das unidades é 0\". O chefe te entrega uma lupa e pergunta: \"Que números poderiam servir?\". Para fechar o caso, você vai precisar ler números do jeito que um detetive lê pistas.",
      mainLesson: [
        "Todo número é feito de algarismos, e o lugar onde o algarismo fica diz quanto ele vale. Em 256, o 2 não é só \"dois\": ele está na casa das centenas, então significa 200. O 5 está na casa das dezenas, então significa 50, e o 6 nas unidades significa 6. Ler as casas de um número é o primeiro movimento do detetive.",
        "Para comparar dois números, alinhe-os pelas casas e confira primeiro a maior. Comparando 348 e 384, os dois têm 3 centenas, então aí dá empate. Vá para as dezenas: 348 tem 4 dezenas e 384 tem 8 dezenas. Oito dezenas ganham de quatro dezenas, então 384 é maior. Escrevemos 348 < 384. O símbolo sempre abre na direção do número maior, como uma boca comendo o lanche maior.",
        "Às vezes você não precisa da contagem exata, e sim de um bom palpite rápido. Estimar significa arredondar para um número próximo e fácil de usar. Se um pote parece ter umas 60 bolinhas, você não precisa contar as 58; \"mais ou menos 60\" já basta para comparar potes ou planejar um jogo.",
        "Decompor significa separar um número nas partes dele. 256 se separa em 200 + 50 + 6. Os detetives fazem isso para enxergar a estrutura escondida de um número, e isso deixa somar e subtrair bem mais fácil lá na frente no curso.",
      ],
      examples: [
        {
          problem: "Compare 348 e 384 usando >, < ou =.",
          explanation: "As centenas são iguais (3 = 3). Vá para as dezenas: 4 dezenas contra 8 dezenas. Como 8 dezenas é mais, 384 é o número maior, então 348 é menor que 384.",
        },
        {
          problem: "Decomponha 407 em centenas, dezenas e unidades.",
          explanation: "O 4 está na casa das centenas (400), não há dezenas (0) e o 7 está nas unidades. O 0 é um marcador de posição que mantém o 4 e o 7 nos lugares certos.",
        },
        {
          problem: "Quanto é 58 arredondado para a dezena mais próxima?",
          solution: "Mais ou menos 60",
          explanation: "58 fica entre 50 e 60. Como o algarismo das unidades é 8 (que é 5 ou mais), arredondamos para cima, para 60. \"Mais ou menos 60\" já basta para uma estimativa rápida.",
        },
      ],
      interactiveActivity: {
        title: "Caçada ao número misterioso",
        instructions: [
          "Leia cada pista que aparece acima da reta numérica.",
          "Arraste o marcador do detetive até o ponto da reta onde o número misterioso deveria estar.",
          "Use as dicas de \"maior que\" e \"menor que\" para ir estreitando o intervalo até sobrar um único número.",
        ],
        conceptConnection: "Colocar um número em uma reta obriga você a pensar no tamanho dele em relação aos vizinhos, exatamente o mesmo raciocínio que você usa para comparar e estimar.",
        sampleData: {
          clues: [
            "O número é maior que 40.",
            "O número é menor que 60.",
            "O algarismo das dezenas é ímpar.",
            "O algarismo das unidades é 0.",
          ],
        },
      },
      handsOnChallenge: {
        title: "Fichas de pistas numéricas",
        instructions: [
          "Escreva cinco números diferentes de três algarismos, cada um em uma ficha.",
          "Em um segundo conjunto de fichas, escreva uma pista para cada número (por exemplo, \"Tenho 2 centenas e meu algarismo das unidades é 9\").",
          "Troque as fichas de pistas com um colega e tentem ligar cada pista ao número certo.",
        ],
        successLooksLike: "Você consegue explicar em voz alta por que uma pista combina com o número dela, dizendo o valor de cada casa (centenas, dezenas, unidades).",
      },
      checkpointQuestions: [
        {
          question: "Qual é maior, 512 ou 521? Como você sabe?",
          answer: "521 é maior. As centenas são iguais (5 = 5), mas 521 tem 2 dezenas contra 1 dezena de 512, então 521 ganha na casa das dezenas.",
        },
        {
          question: "Decomponha 630 nas partes dele.",
        },
        {
          question: "Arredonde 43 para a dezena mais próxima.",
          answer: "40, porque o algarismo das unidades (3) é menor que 5, então arredondamos para baixo.",
        },
      ],
      reflectionQuestion: "Quando estimar seria mais útil do que contar a quantidade exata? Descreva um momento real em que \"mais ou menos quantos\" já basta.",
      challengeProblem: {
        prompt: "Sou um número de três algarismos entre 300 e 400. Meu algarismo das dezenas é o dobro do meu algarismo das unidades, e meu algarismo das unidades é 3. Que número eu sou?",
        hint: "Comece pelo algarismo das unidades (3) e depois descubra o das dezenas dobrando esse valor. O algarismo das centenas precisa manter você entre 300 e 400.",
        answer: "363. O algarismo das centenas é 3 (para ficar entre 300 e 400), o das unidades é 3, e o das dezenas é o dobro de 3, ou seja, 6.",
      },
      extensionChallenge: "Faça um \"cartaz de procurado\" para um número misterioso com exatamente quatro pistas, de modo que só um número no mundo sirva para as quatro. Teste com alguém da família.",
      vocabulary: [
        {
          term: "Algarismo",
          definition: "Um dos símbolos de 0 a 9 que formam os números.",
        },
        {
          term: "Valor posicional",
          definition: "Quanto um algarismo vale de acordo com a posição dele (unidades, dezenas, centenas).",
        },
        {
          term: "Maior que (>)",
          definition: "Um símbolo que mostra que o número da esquerda é maior.",
        },
        {
          term: "Menor que (<)",
          definition: "Um símbolo que mostra que o número da esquerda é menor.",
        },
        {
          term: "Estimar",
          definition: "Um palpite esperto e próximo o bastante, feito arredondando para um número fácil de usar.",
        },
        {
          term: "Decompor",
          definition: "Separar um número nas partes que o formam, como 256 = 200 + 50 + 6.",
        },
      ],
      materials: [
        "Fichas de cartolina",
        "Lápis",
        "Um pote com objetos pequenos para estimar (opcional)",
      ],
    },
    {
      title: "A missão das operações",
      shortTitle: "A missão das operações",
      theme: "Quatro heróis em uma missão: Soma, Subtração, Multiplicação e Divisão",
      description: "Os alunos conhecem as quatro operações como personagens com poderes especiais e aprendem a escolher a certa para cada problema: juntar, tirar, formar grupos iguais ou repartir.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º ao 5.º ano",
      skillFocus: [
        "Adição",
        "Subtração",
        "Pensar por multiplicação",
        "Pensar por divisão",
        "Escolher a operação",
      ],
      learningGoals: [
        "Ligar um problema à operação certa perguntando o que está acontecendo: juntar, separar, formar grupos iguais ou repartir em partes iguais.",
        "Explicar a multiplicação como grupos iguais repetidos (4 x 3 significa quatro grupos de três) e a divisão como separar em grupos iguais.",
        "Resolver um problema de dois passos e explicar qual operação foi usada em cada passo.",
      ],
      keyConcepts: [
        "A adição junta quantidades; a subtração acha uma diferença ou tira.",
        "A multiplicação é um jeito rápido de somar grupos iguais.",
        "A divisão separa um total em grupos iguais ou descobre quantos há em cada grupo.",
      ],
      introStory: "Uma ponte caiu na estrada para a Montanha Matemática, e quatro heróis se apresentam. Soma consegue juntar dois grupos em um. Subtração consegue achar o que está faltando. Multiplicação consegue montar muitos grupos iguais num piscar de olhos. Divisão consegue repartir um tesouro com justiça. Mas cada herói só funciona no tipo certo de problema: escolha o errado e a ponte continua quebrada. Sua missão: mandar o herói certo para cada desafio.",
      mainLesson: [
        "O segredo dos problemas escritos não são os números, e sim descobrir o que está acontecendo na história. Dois grupos estão se juntando? Isso é adição. Alguma coisa está sendo tirada, ou você está comparando para achar uma diferença? Isso é subtração.",
        "A multiplicação é a heroína dos grupos iguais. \"4 cestas com 3 maçãs cada uma\" é 4 x 3 = 12. Em vez de somar 3 + 3 + 3 + 3, você multiplica. A pista está nas palavras \"cada\" ou \"cada um\": elas sinalizam grupos iguais.",
        "A divisão é a heroína de repartir e separar. Se 12 maçãs são repartidas igualmente entre 4 amigos, cada um fica com 12 / 4 = 3. A divisão responde a dois tipos de pergunta: \"quantos há em cada grupo?\" e \"quantos grupos consigo formar?\".",
        "Algumas missões têm dois passos. \"Você tem 20 reais, compra um livro de 8 e divide o resto com um amigo\". O primeiro passo é subtração (20 - 8 = 12). O segundo é divisão (12 / 2 = 6). Nomear a operação de cada passo evita que você se perca.",
      ],
      examples: [
        {
          problem: "Uma turma tem 6 mesas com 4 alunos em cada mesa. Quantos alunos há?",
          solution: "6 x 4 = 24 alunos",
          explanation: "As palavras \"em cada mesa\" sinalizam grupos iguais, então isso é multiplicação: seis grupos de quatro dão vinte e quatro.",
        },
        {
          problem: "Há 15 biscoitos para repartir igualmente entre 5 crianças. Quantos para cada uma?",
          solution: "15 / 5 = 3 biscoitos para cada uma",
          explanation: "Repartir igualmente é dividir. Separe 15 em 5 grupos iguais; cada grupo fica com 3.",
        },
        {
          problem: "Um jogo custa $18. Você tem $25. Quanto sobra depois de comprá-lo?",
          explanation: "Gastar dinheiro tira uma quantia, então isso é subtração. A diferença entre 25 e 18 é 7.",
        },
      ],
      interactiveActivity: {
        title: "Escolha o herói certo",
        instructions: [
          "Leia cada ficha de problema conforme ela aparece.",
          "Arraste a ficha até o herói de que ela precisa: Soma, Subtração, Multiplicação ou Divisão.",
          "Depois de separar tudo, resolva dois dos problemas e confira suas respostas.",
        ],
        conceptConnection: "Separar problemas por operação cria o hábito de perguntar \"o que está acontecendo aqui?\" antes de correr para os números, que é a habilidade mais importante nos problemas escritos.",
        sampleData: {
          problems: [
            {
              text: "8 bolinhas vermelhas e 5 bolinhas azuis juntas",
            },
            {
              text: "Uma fita de 12 cm de comprimento, com 5 cm cortados",
            },
            {
              text: "3 fileiras de 6 cadeiras",
            },
            {
              text: "20 adesivos repartidos entre 4 crianças",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "Duelo de operações com dados",
        instructions: [
          "Jogue dois dados para obter dois números.",
          "Puxe uma carta de operação (+, -, x ou /) de um monte virado para baixo.",
          "Resolva o problema que a sua jogada e a sua carta formam; se a carta for de divisão e não der divisão exata, jogue um dado de novo.",
          "Marque um ponto por resposta certa e joguem até 10.",
        ],
        successLooksLike: "Você consegue fazer as quatro operações com números pequenos e contar rapidinho uma historinha que combine com cada jogada.",
      },
      checkpointQuestions: [
        {
          question: "Que operação resolve \"5 sacolas com 7 maçãs cada uma\"? Qual é a resposta?",
          answer: "Multiplicação. 5 x 7 = 35 maçãs.",
        },
        {
          question: "Escreva 4 + 4 + 4 como uma multiplicação.",
          answer: "3 x 4 = 12 (três grupos de quatro).",
        },
        {
          question: "24 lápis separados em caixas de 6. Quantas caixas?",
          answer: "Divisão: 24 / 6 = 4 caixas.",
        },
      ],
      reflectionQuestion: "Como você percebe se um problema precisa de multiplicação ou de adição? Que palavra ou pista ajuda você a decidir?",
      challengeProblem: {
        prompt: "Uma padeira faz 4 assadeiras de bolinhos com 6 bolinhos em cada assadeira. Ela vende 9 bolinhos. Quantos bolinhos sobram?",
        hint: "Esta missão tem dois passos. Primeiro ache o total de bolinhos, depois tire os que ela vendeu.",
        answer: "15 bolinhos. Passo 1: 4 x 6 = 24 bolinhos feitos. Passo 2: 24 - 9 = 15 bolinhos restantes.",
      },
      extensionChallenge: "Escreva o seu próprio problema de dois passos em que o primeiro seja multiplicação e o segundo, subtração. Dê para alguém e confira se a pessoa nomeia as duas operações.",
      vocabulary: [
        {
          term: "Operação",
          definition: "Uma ação matemática: somar, subtrair, multiplicar ou dividir.",
        },
        {
          definition: "O resultado de uma adição.",
        },
        {
          term: "Diferença",
          definition: "O resultado de uma subtração.",
        },
        {
          term: "Produto",
          definition: "O resultado de uma multiplicação.",
        },
        {
          term: "Quociente",
          definition: "O resultado de uma divisão.",
        },
        {
          term: "Grupos iguais",
          definition: "Grupos que têm todos a mesma quantidade de coisas, o coração da multiplicação e da divisão.",
        },
      ],
      materials: [
        "Dois dados",
        "Fichas de cartolina para os símbolos das operações",
        "Lápis e papel",
      ],
    },
    {
      title: "A máquina de padrões",
      shortTitle: "A máquina de padrões",
      theme: "A máquina de padrões: dê um número a ela e descubra a regra",
      description: "Os alunos acham e continuam padrões, contam de tantos em tantos e descobrem a regra escondida de uma máquina de entrada e saída, aprendendo que uma regra que você consegue nomear permite prever o que vem depois.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º ao 5.º ano",
      skillFocus: [
        "Padrões",
        "Sequências",
        "Contar de tantos em tantos",
        "Regras de entrada e saída",
      ],
      learningGoals: [
        "Continuar um padrão numérico crescente ou que se repete e descrever a regra dele com palavras (por exemplo, \"somar 5 a cada vez\").",
        "Contar de 2 em 2, de 5 em 5, de 10 em 10, de 3 em 3 e de 4 em 4, e ligar essa contagem à multiplicação.",
        "Descobrir a regra de uma máquina de entrada e saída comparando o que entra com o que sai.",
      ],
      keyConcepts: [
        "Um padrão segue uma regra, e nomear a regra permite prever o próximo termo.",
        "Contar de tantos em tantos é somar repetidamente e é a base da multiplicação.",
        "Uma regra de entrada e saída faz a mesma coisa com todo número que você der a ela.",
      ],
      introStory: "No fundo da oficina fica a máquina de padrões, cheia de engrenagens e botões. Você joga um 2 por cima e sai um 6 por baixo. Joga um 5 e sai um 15. A máquina não vai contar o segredo dela, mas, se você observar com atenção, consegue descobrir a regra que ela está usando. E, uma vez que você souber a regra, poderá prever todos os números que ela algum dia vai produzir.",
      mainLesson: [
        "Um padrão é uma sequência que segue uma regra. Em 3, 6, 9, 12, ... a regra é \"somar 3 a cada vez\". Depois de nomear a regra, você pode pular à frente: o próximo termo é 15, e você não precisou desenhar cada passo para saber disso.",
        "Contar de tantos em tantos é um padrão que você já conhece. Contar de 5 em 5 (5, 10, 15, 20) é somar 5 várias vezes. É exatamente por isso que essa contagem e a multiplicação são primas: contar de 5 em 5 quatro vezes leva você a 20, e 4 x 5 = 20.",
        "Os padrões podem se repetir (vermelho, azul, vermelho, azul) ou crescer (2, 4, 8, 16, em que a regra é \"dobrar\"). O truque é reparar no que muda de um termo para o seguinte. Se a mesma quantidade é somada a cada vez, a regra é \"somar essa quantidade\".",
        "Uma máquina de entrada e saída aplica uma regra só a cada entrada. Se o 2 vira 6 e o 5 vira 15, a máquina multiplica por 3. Teste a sua regra em um terceiro par para ter certeza: uma boa regra funciona para todas as entradas, não só para uma.",
      ],
      examples: [
        {
          problem: "O que vem depois: 4, 8, 12, 16, ___?",
          explanation: "Cada termo sobe de 4 em 4 (a regra é \"somar 4\"). 16 + 4 = 20. Isso também é contar de 4 em 4.",
        },
        {
          problem: "Uma máquina transforma 3 em 8, 5 em 10 e 6 em 11. Qual é a regra dela?",
          solution: "Somar 5",
          explanation: "Compare cada entrada com a saída dela: de 3 para 8 é +5, de 5 para 10 é +5, de 6 para 11 é +5. A mesma regra funciona nos três casos, então a regra é \"somar 5\".",
        },
        {
          problem: "Conte de 5 em 5 para achar 6 x 5.",
          explanation: "5, 10, 15, 20, 25, 30: seis saltos de cinco caem em 30, que é exatamente 6 x 5.",
        },
      ],
      interactiveActivity: {
        title: "Descubra a regra da máquina",
        instructions: [
          "Observe a máquina transformar cada número de entrada em uma saída.",
          "Depois de três exemplos, digite o seu palpite para a regra (como \"x 2\" ou \"+ 4\").",
          "Dê mais um número à máquina para testar a sua regra antes de confirmá-la.",
        ],
        conceptConnection: "Adivinhar a regra a partir de pares de entrada e saída é o mesmo raciocínio de achar o padrão de uma sequência: você procura o que continua igual de um passo para o outro.",
      },
      handsOnChallenge: {
        title: "Monte uma corrente de padrões",
        instructions: [
          "Use tiras de papel ou contas de duas cores para montar um padrão que se repete, com pelo menos 12 elementos.",
          "Ao lado dele, monte um padrão numérico crescente com risquinhos ou pontos (comece com uma regra como \"somar 3\").",
          "Peça a um colega que nomeie as duas regras e preveja os três termos seguintes.",
        ],
        successLooksLike: "Seu colega consegue dizer com palavras a regra de cada padrão e continuá-lo corretamente por mais três passos.",
      },
      checkpointQuestions: [
        {
          question: "Continue o padrão: 10, 20, 30, 40, ___, ___.",
          answer: "50, 60 (a regra é \"somar 10\", ou contar de 10 em 10).",
        },
        {
          question: "Uma máquina transforma 4 em 12 e 6 em 18. Qual é a regra?",
          answer: "Multiplicar por 3 (4 x 3 = 12, 6 x 3 = 18).",
        },
        {
          question: "Como contar de 2 em 2 se relaciona com a multiplicação?",
          answer: "Cada salto soma 2, então contar de 2 em 2 cinco vezes é igual a 5 x 2 = 10.",
        },
      ],
      reflectionQuestion: "Por que é útil conhecer a regra de um padrão, e não apenas o próximo número? O que uma regra consegue fazer que uma única resposta não consegue?",
      challengeProblem: {
        prompt: "Uma máquina transforma 1 em 3, 2 em 5 e 3 em 7. O que ela vai fazer com o 10?",
        hint: "Esta regra tem dois passos. Repare que a saída sobe de 2 em 2 cada vez que a entrada sobe de 1 em 1, então há uma multiplicação envolvida, mais um pouquinho a mais.",
        answer: "21. A regra é \"multiplicar por 2 e depois somar 1\" (1x2+1=3, 2x2+1=5, 3x2+1=7). Para o 10: 10 x 2 + 1 = 21.",
      },
      extensionChallenge: "Invente uma regra de máquina com dois passos (como \"x 3 e depois - 1\"), faça uma tabela com quatro entradas e saídas, e desafie alguém a descobri-la.",
      vocabulary: [
        {
          term: "Padrão",
          definition: "Uma sequência que segue uma regra que você consegue nomear.",
        },
        {
          term: "Regra",
          definition: "A instrução que diz como ir de um termo para o seguinte.",
        },
        {
          term: "Sequência",
          definition: "Uma lista ordenada de números ou figuras.",
        },
        {
          term: "Contagem de tantos em tantos",
          definition: "Contar para a frente somando a mesma quantidade a cada vez, como 5, 10, 15.",
        },
        {
          term: "Entrada",
          definition: "O número que você coloca em uma máquina ou em uma regra.",
        },
        {
          term: "Saída",
          definition: "O número que sai depois que a regra é aplicada.",
        },
      ],
      materials: [
        "Tiras de papel colorido ou contas",
        "Lápis e papel para as tabelas",
      ],
    },
    {
      title: "A cidade do valor posicional",
      shortTitle: "A cidade do valor posicional",
      theme: "A cidade do valor posicional: cada algarismo mora na sua própria rua",
      description: "Os alunos exploram como unidades, dezenas, centenas e milhares têm cada um a sua \"rua\" dentro de um número, escrevem números na forma decomposta e comparam números grandes conferindo primeiro a maior ordem.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º ao 5.º ano",
      skillFocus: [
        "Unidades, dezenas, centenas e milhares",
        "Forma decomposta",
        "Comparar números",
      ],
      learningGoals: [
        "Identificar o valor de cada algarismo em números até a casa dos milhares.",
        "Escrever um número na forma decomposta (2,345 = 2,000 + 300 + 40 + 5) e voltar à forma normal.",
        "Comparar números de quatro algarismos começando pela maior ordem.",
      ],
      keyConcepts: [
        "Cada casa vale dez vezes a casa à direita dela.",
        "A forma decomposta mostra o valor escondido dentro de cada algarismo.",
        "A comparação começa na maior casa e vai para a direita até os algarismos ficarem diferentes.",
      ],
      introStory: "Bem-vindo à cidade do valor posicional, onde cada algarismo tem um endereço. As unidades moram na rua das Unidades, as dezenas na avenida das Dezenas, as centenas no bulevar das Centenas, e os milhares lá em cima na colina dos Milhares. Mude um algarismo de rua e o valor dele inteiro muda: um 7 na rua das Unidades vale 7, mas mova-o para o bulevar das Centenas e de repente ele vale 700. Hoje quem planeja a cidade é você.",
      mainLesson: [
        "No nosso sistema de numeração, cada casa vale dez vezes a que está à direita dela. Primeiro as unidades, depois as dezenas (dez unidades), depois as centenas (dez dezenas) e então os milhares (dez centenas). É por isso que mover um algarismo uma rua para a esquerda o deixa dez vezes maior.",
        "Em 2,345 o 2 mora na colina dos Milhares e vale 2,000; o 3 vale 300; o 4 vale 40; e o 5 vale 5. Ler cada algarismo pela rua dele é como você acha o verdadeiro valor.",
        "A forma decomposta escreve esses valores como uma soma: 2,345 = 2,000 + 300 + 40 + 5. Ela deixa visível a estrutura escondida e ajuda muito ao somar ou subtrair números grandes.",
        "Para comparar dois números, comece na maior casa e vá para a direita até os algarismos ficarem diferentes. Comparando 3,412 e 3,398: os milhares empatam (3 = 3), mas na casa das centenas o 4 ganha do 3, então 3,412 é maior. Depois de achar uma diferença, você nunca precisa conferir as casas menores.",
      ],
      examples: [
        {
          problem: "Qual é o valor do 6 em 4,682?",
          explanation: "O 6 está na casa das centenas (o bulevar das Centenas), então ele vale 6 centenas, ou seja, 600.",
        },
        {
          problem: "Escreva 5,207 na forma decomposta.",
          explanation: "5 milhares + 2 centenas + 0 dezenas + 7 unidades. O 0 mostra que não há dezenas, mas mantém os outros algarismos no lugar.",
        },
        {
          problem: "Compare 3,412 e 3,398.",
          explanation: "Os milhares são iguais (3 = 3). Na casa das centenas, 4 é maior que 3, então 3,412 é o número maior. Não é preciso conferir dezenas nem unidades.",
        },
      ],
      interactiveActivity: {
        title: "Monte o endereço",
        instructions: [
          "Leia o número-alvo mostrado no alto.",
          "Arraste as peças de algarismos para as ruas certas: Milhares, Centenas, Dezenas e Unidades.",
          "Confira o que você montou lendo a forma decomposta que a cidade mostra.",
        ],
        conceptConnection: "Colocar cada algarismo na rua certa torna concreta a ideia abstrata de valor posicional: você vê que o mesmo algarismo significa quantidades diferentes em ruas diferentes.",
      },
      handsOnChallenge: {
        title: "Vira-cartas do valor posicional",
        instructions: [
          "Faça quatro colunas rotuladas no papel: Milhares, Centenas, Dezenas, Unidades.",
          "Puxe cartas de algarismos (0-9) e coloque cada uma na coluna que quiser para formar um número.",
          "Dispute com um colega para formar o maior número possível e depois digam cada número na forma decomposta para provar qual é maior.",
        ],
        successLooksLike: "Você consegue formar um número de quatro algarismos, ler o valor de cada algarismo e usar a forma decomposta para justificar qual número é maior.",
      },
      checkpointQuestions: [
        {
          question: "Qual é o valor do 8 em 8,140?",
          answer: "8,000 (ele está na casa dos milhares).",
        },
        {
          question: "Escreva 3,406 na forma decomposta.",
        },
        {
          question: "Qual é maior, 6,721 ou 6,712?",
          answer: "6,721. Milhares e centenas empatam; na casa das dezenas, o 2 ganha do 1.",
        },
      ],
      reflectionQuestion: "Por que o mesmo algarismo, como o 5, significa quantidades diferentes em 5,000, 500 e 50? Explique usando a ideia de ruas ou casas.",
      challengeProblem: {
        prompt: "Use os algarismos 4, 0, 7 e 2 exatamente uma vez cada um para formar o maior número possível de quatro algarismos e o menor número possível de quatro algarismos. Qual é a diferença entre eles?",
        hint: "Para o maior, ponha os algarismos maiores à esquerda. Para o menor, ponha os algarismos pequenos à esquerda, mas um número não pode começar com 0.",
        answer: "O maior é 7,420 e o menor é 2,047. A diferença entre eles é 7,420 - 2,047 = 5,373.",
      },
      extensionChallenge: "Estenda a cidade do valor posicional até as dezenas de milhar. Forme um número de cinco algarismos, escreva-o na forma decomposta e explique a que distância a torre das Dezenas de Milhar fica da rua das Unidades.",
      vocabulary: [
        {
          term: "Casa das unidades",
          definition: "A casa mais à direita, que conta as unidades avulsas.",
        },
        {
          term: "Casa das dezenas",
          definition: "A casa que vale dez vezes as unidades.",
        },
        {
          term: "Casa das centenas",
          definition: "A casa que vale dez vezes as dezenas.",
        },
        {
          term: "Casa dos milhares",
          definition: "A casa que vale dez vezes as centenas.",
        },
        {
          term: "Forma decomposta",
          definition: "Um número escrito como a soma do valor de cada algarismo, como 300 + 40 + 5.",
        },
        {
          term: "Forma normal",
          definition: "Um número escrito do jeito comum, com os algarismos lado a lado, como 345.",
        },
      ],
      materials: [
        "Cartas de algarismos de 0 a 9",
        "Papel com colunas rotuladas de valor posicional",
        "Lápis",
      ],
    },
    {
      title: "A pizzaria das frações",
      shortTitle: "A pizzaria das frações",
      theme: "A pizzaria das frações: cada fatia conta uma história",
      description: "Os alunos tocam uma pizzaria para aprender que uma fração nomeia partes iguais de um inteiro (o denominador diz em quantas partes iguais o inteiro é cortado e o numerador diz quantas são usadas) e comparam e acham frações equivalentes com modelos de pizza e de barras de fração.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º ao 5.º ano",
      skillFocus: [
        "Frações como partes iguais",
        "Numerador e denominador",
        "Comparar frações simples",
        "Frações equivalentes",
      ],
      learningGoals: [
        "Explicar que o denominador diz em quantas partes iguais um inteiro é dividido e o numerador diz quantas dessas partes são usadas.",
        "Comparar duas frações com o mesmo denominador e usar um modelo para comparar frações como 1/2 e 1/3.",
        "Mostrar com modelos de pizza ou de barras de fração que frações como 1/2 e 2/4 são equivalentes.",
      ],
      keyConcepts: [
        "As frações só funcionam quando as partes são iguais.",
        "O denominador é a quantidade de partes iguais; o numerador é quantas você pega.",
        "Frações diferentes podem nomear a mesma quantidade (frações equivalentes).",
      ],
      introStory: "O movimento está ótimo na pizzaria das frações. Um cliente pede \"meia pizza\", o próximo quer \"três quartos\" e um terceiro pede \"dois sextos\". O detalhe: cada pizza precisa ser cortada em fatias iguais, ou os pedidos não serão justos. Como pizzaiolo de hoje, você vai aprender a ler cada pedido como uma fração, e a perceber quando dois pedidos diferentes são, em segredo, a mesma quantidade.",
      mainLesson: [
        "Uma fração descreve partes iguais de um inteiro. O número de baixo, o denominador, diz em quantas partes iguais o inteiro é cortado. O número de cima, o numerador, diz de quantas dessas partes você está falando. Em 3/4, a pizza está cortada em 4 fatias iguais e você tem 3 delas.",
        "As partes serem iguais faz diferença. Se você cortar uma pizza em quatro pedaços, mas um for enorme e três forem minúsculos, você não pode chamar um pedacinho de \"1/4\". Um quarto significa uma de quatro fatias iguais. É essa a regra que deixa as frações justas.",
        "Quando duas frações têm o mesmo denominador, a de numerador maior é maior: 3/4 é mais que 1/4 porque você tem mais fatias do mesmo tamanho. Quando os denominadores são diferentes, um modelo ajuda: corte uma pizza em metades e outra em terços, e dá para ver que 1/2 é maior que 1/3, porque dividir em menos partes deixa cada parte maior.",
        "Algumas frações parecem diferentes, mas nomeiam a mesma quantidade. Corte uma pizza ao meio e depois corte cada metade de novo: agora você tem quatro pedaços, e dois deles (2/4) cobrem exatamente a mesma quantidade que a metade original (1/2). Frações que nomeiam a mesma quantidade são chamadas de equivalentes.",
      ],
      examples: [
        {
          problem: "Na fração 5/8, o que significa cada número?",
          solution: "8 = partes iguais do inteiro; 5 = partes que estão sendo usadas",
          explanation: "O denominador 8 diz que o inteiro está cortado em 8 fatias iguais. O numerador 5 diz que estamos falando de 5 dessas fatias.",
        },
        {
          problem: "Qual é maior, 2/3 ou 1/3?",
          explanation: "Mesmo denominador (terços), então compare os numeradores: 2 fatias do mesmo tamanho são mais que 1 fatia.",
        },
        {
          problem: "1/2 é equivalente a 2/4?",
          explanation: "Cortar cada metade de uma pizza em duas dá quatro pedaços iguais; dois deles (2/4) cobrem a mesma quantidade que uma metade (1/2), então são equivalentes.",
        },
      ],
      interactiveActivity: {
        title: "Prepare o pedido de pizza",
        instructions: [
          "Leia o pedido do cliente, como \"3/4 de uma pizza\".",
          "Ajuste a quantidade de fatias iguais para bater com o denominador e depois pinte fatias para bater com o numerador.",
          "Nas rodadas bônus, arraste uma segunda pizza para mostrar uma fração equivalente ao mesmo pedido.",
        ],
        conceptConnection: "Ajustar primeiro o denominador (as fatias) e depois o numerador (as fatias pintadas) torna concretas as duas funções de uma fração e difíceis de confundir.",
      },
      handsOnChallenge: {
        title: "Frações com pizzas de papel",
        instructions: [
          "Recorte três círculos de papel (\"pizzas\") do mesmo tamanho.",
          "Dobre e corte um em metades, outro em quartos e outro em oitavos, mantendo as fatias iguais.",
          "Monte pedidos combinando fatias e depois ache dois jeitos diferentes de formar uma metade (por exemplo, 2/4 e 4/8).",
        ],
        successLooksLike: "Você consegue sobrepor fatias para provar que duas frações são equivalentes e explicar por que as partes precisam ser iguais.",
      },
      checkpointQuestions: [
        {
          question: "Em 4/6, qual número é o denominador e o que ele diz?",
          answer: "O 6 é o denominador; ele diz que o inteiro está cortado em 6 partes iguais.",
        },
        {
          question: "Qual é maior, 3/5 ou 2/5?",
          answer: "3/5, porque, com quintos iguais, três partes são mais que duas.",
        },
        {
          question: "Diga uma fração equivalente a 1/2.",
          answer: "2/4 (também 3/6 ou 4/8): todas nomeiam a mesma quantidade.",
        },
      ],
      reflectionQuestion: "Por que os pedaços de uma pizza precisam ser iguais para podermos chamar um pedaço de \"1/4\"? O que dá errado se eles não forem iguais?",
      challengeProblem: {
        prompt: "Maria comeu 2/4 de uma pizza e Sam comeu 1/2 de uma pizza idêntica. Quem comeu mais, ou os dois comeram a mesma coisa? Prove.",
        hint: "Experimente desenhar as duas pizzas com fatias iguais, ou ache uma fração equivalente a uma das quantidades para que as duas fiquem com o mesmo denominador.",
        answer: "Os dois comeram a mesma quantidade. 2/4 é equivalente a 1/2, então os dois comeram meia pizza.",
      },
      extensionChallenge: "Crie um cardápio de pizzaria com três promoções escritas como frações e depois ache uma fração equivalente para cada promoção, para que os clientes vejam que estão levando uma quantidade justa.",
      vocabulary: [
        {
          term: "Fração",
          definition: "Um número que nomeia partes iguais de um inteiro.",
        },
        {
          term: "Numerador",
          definition: "O número de cima; quantas partes iguais você tem.",
        },
        {
          term: "Denominador",
          definition: "O número de baixo; em quantas partes iguais o inteiro é dividido.",
        },
        {
          term: "Inteiro",
          definition: "A coisa completa, antes de ser cortada em partes.",
        },
        {
          term: "Frações equivalentes",
          definition: "Frações diferentes que nomeiam a mesma quantidade, como 1/2 e 2/4.",
        },
        {
          term: "Partes iguais",
          definition: "Partes que são exatamente do mesmo tamanho.",
        },
      ],
      materials: [
        "Círculos de papel",
        "Tesoura",
        "Giz de cera ou canetinhas",
      ],
    },
    {
      title: "Missão medição",
      shortTitle: "Missão medição",
      theme: "Missão medição: escolha a ferramenta e a unidade certas para cada tarefa",
      description: "Os alunos medem comprimento, altura, peso e capacidade, estimam antes de medir e aprendem a escolher a unidade sensata: um lápis se mede em centímetros, não em quilômetros.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º ao 5.º ano",
      skillFocus: [
        "Comprimento e altura",
        "Peso",
        "Capacidade",
        "Estimativa",
        "Unidades apropriadas",
      ],
      learningGoals: [
        "Medir comprimento e altura com uma régua e ler a medida até a unidade mais próxima.",
        "Escolher uma unidade apropriada para cada objeto (centímetros ou metros, gramas ou quilogramas, mililitros ou litros).",
        "Estimar primeiro uma medida, depois medir, e comparar o quanto a estimativa chegou perto.",
      ],
      keyConcepts: [
        "Medir responde \"quanto?\": que comprimento, que peso, quanto cabe.",
        "A unidade certa combina com o tamanho do objeto.",
        "Estimar primeiro deixa você, com o tempo, mais preciso e mais rápido para medir.",
      ],
      introStory: "O centro de controle tem um problema: a planta da nova sede do clube lista todos os tamanhos como \"meio grande\" e \"meio pesado\". Ninguém consegue construir com isso. Sua missão é medir o que é real (o comprimento da porta, a altura da prateleira, o peso da caixa de ferramentas e quanta água cabe no bebedouro) e informar cada um com um número e a unidade certa.",
      mainLesson: [
        "Medir significa comparar um objeto com uma unidade e contar quantas unidades cabem. Uma régua marcada em centímetros deixa você contar quantos centímetros um lápis tem. Alinhe a marca do zero com uma ponta e leia o número na outra ponta.",
        "Comprimento e altura usam unidades como centímetros e metros. O peso (o quanto algo é pesado) usa gramas e quilogramas. A capacidade (o quanto cabe em um recipiente) usa mililitros e litros. Combinar a medida com a família de unidades dela é o primeiro passo de qualquer medição.",
        "A unidade certa combina com o tamanho do objeto. Um lápis tem cerca de 18 centímetros; medi-lo em metros daria um número minúsculo e desconfortável, como 0,18. Uma porta tem cerca de 2 metros; medi-la em centímetros (200) funciona, mas metros é mais confortável. Coisas grandes pedem unidades grandes; coisas pequenas pedem unidades pequenas.",
        "Quem mede bem estima antes. Antes de medir a prateleira, chute: \"mais ou menos 1 metro\". Depois meça e compare. Cada vez que você confronta o seu palpite com o número real, as suas estimativas ficam mais afiadas, e essa é uma habilidade que economiza tempo quando você não precisa de um número exato.",
      ],
      examples: [
        {
          problem: "Qual unidade é melhor para medir o comprimento de uma sala de aula: centímetros ou metros?",
          solution: "Metros",
          explanation: "Uma sala de aula tem vários metros de comprimento. Usar centímetros daria um número enorme e desajeitado, então metros é a unidade sensata.",
        },
        {
          problem: "Uma garrafa de água comporta cerca de 500 de qual unidade?",
          solution: "Mililitros",
          explanation: "A capacidade de uma garrafa pequena é medida em mililitros; 500 mL é meio litro, um tamanho típico de garrafa.",
        },
        {
          problem: "Você estima que um livro tem 20 cm de altura e mede 24 cm. Quanto a sua estimativa errou?",
          explanation: "Subtraia a estimativa da medida real: 24 - 20 = 4 cm. Seu palpite chegou perto, faltaram só 4 centímetros.",
        },
      ],
      interactiveActivity: {
        title: "Estime e depois meça",
        instructions: [
          "Olhe cada objeto mostrado e escolha a melhor unidade entre as opções.",
          "Digite a sua estimativa para a medida.",
          "Revele a medida real e veja o quanto a sua estimativa chegou perto; ganhe pontos por boas escolhas de unidade e por palpites próximos.",
        ],
        conceptConnection: "Escolher uma unidade e estimar antes de medir desenvolve o senso numérico de tamanho: você aprende o que um centímetro, um quilograma e um litro realmente representam.",
        sampleData: {
          items: [
            {
              object: "lápis novo",
            },
            {
              object: "porta da sala de aula",
            },
            {
              object: "sacola de maçãs",
            },
            {
              object: "caixinha de suco",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "Caça ao tesouro: meça a sala",
        instructions: [
          "Faça uma lista de cinco objetos ao seu redor (um livro, uma colher, uma cadeira, uma xícara, um sapato).",
          "Para cada um, escreva primeiro a sua estimativa e a unidade que você vai usar.",
          "Meça cada objeto com uma régua, uma balança ou um copo medidor e anote o número real ao lado da sua estimativa.",
        ],
        successLooksLike: "Sua tabela mostra uma estimativa, uma unidade escolhida e uma medida real para cada objeto, e você consegue apontar quais estimativas chegaram mais perto.",
      },
      checkpointQuestions: [
        {
          question: "Que unidade você usaria para pesar uma melancia: gramas ou quilogramas?",
          answer: "Quilogramas: uma melancia é pesada, então quilogramas dão um número sensato.",
        },
        {
          question: "A capacidade mede o quê em um recipiente?",
          answer: "O quanto ele consegue comportar (como mililitros ou litros de água).",
        },
        {
          question: "Você chutou 30 cm e mediu 27 cm. Quanto você errou?",
          answer: "3 cm (30 - 27 = 3).",
        },
      ],
      reflectionQuestion: "Por que faz diferença escolher a unidade certa? Descreva um objeto e uma unidade que formariam uma dupla sem sentido.",
      challengeProblem: {
        prompt: "Uma fita tem 2 metros de comprimento. Você corta três pedaços, cada um de 40 centímetros. Quantos centímetros de fita sobram?",
        hint: "Primeiro transforme os 2 metros em centímetros (1 metro = 100 cm). Depois subtraia os pedaços que você cortou.",
        answer: "Sobram 80 cm. 2 metros = 200 cm; três pedaços de 40 cm dão 120 cm cortados; 200 - 120 = 80 cm restantes.",
      },
      extensionChallenge: "Meça a altura de três familiares em centímetros e coloque-os em ordem do mais baixo ao mais alto, depois ache a diferença entre o mais alto e o mais baixo.",
      vocabulary: [
        {
          term: "Comprimento",
          definition: "O quanto algo é comprido de uma ponta à outra.",
        },
        {
          term: "Altura",
          definition: "O quanto algo é alto de baixo para cima.",
        },
        {
          term: "Peso",
          definition: "O quanto algo é pesado.",
        },
        {
          term: "Capacidade",
          definition: "O quanto cabe em um recipiente.",
        },
        {
          term: "Unidade",
          definition: "Uma quantidade padrão usada para medir, como um centímetro ou um litro.",
        },
        {
          term: "Estimativa",
          definition: "Um palpite próximo o bastante, feito antes de medir com exatidão.",
        },
      ],
      materials: [
        "Régua ou fita métrica",
        "Balança de cozinha (opcional)",
        "Copo medidor (opcional)",
        "Papel para uma tabela",
      ],
    },
    {
      title: "Explorador de geometria",
      shortTitle: "Explorador de geometria",
      theme: "Explorador de geometria: mapeando o mundo das figuras",
      description: "Os alunos exploram figuras 2D e sólidos 3D pelos atributos deles (lados, cantos, faces, arestas e vértices) e descobrem eixos de simetria dobrando figuras para que as duas metades coincidam.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º ao 5.º ano",
      skillFocus: [
        "Figuras 2D",
        "Sólidos 3D",
        "Lados e cantos",
        "Faces e arestas",
        "Simetria",
      ],
      learningGoals: [
        "Nomear figuras 2D contando os lados e os cantos delas (um triângulo tem 3 lados e 3 cantos).",
        "Descrever sólidos 3D pelas faces, arestas e vértices deles (um cubo tem 6 faces, 12 arestas e 8 vértices).",
        "Achar um eixo de simetria dobrando uma figura para que as duas metades coincidam exatamente.",
      ],
      keyConcepts: [
        "As figuras 2D são planas; contamos os lados e os cantos delas.",
        "Os sólidos 3D são maciços; contamos as faces, arestas e vértices deles.",
        "Uma figura tem eixo de simetria quando pode ser dobrada em duas metades que coincidem.",
      ],
      introStory: "Você é o mais novo explorador de geometria, e o mapa à sua frente está coberto de figuras que ninguém nomeou ainda. Algumas são planas, como os ladrilhos de um piso; outras são maciças, como blocos que você segura na mão. O seu kit de explorador é simples: conte os lados, conte os cantos, conte as faces e as arestas, e dobre para achar a simetria escondida. Cada figura que você descrever corretamente é fixada no mapa.",
      mainLesson: [
        "As figuras planas são chamadas de 2D (bidimensionais). Nós as identificamos contando lados (as bordas retas) e cantos, também chamados de vértices (onde dois lados se encontram). Um triângulo tem 3 lados e 3 cantos; um quadrado tem 4 lados iguais e 4 cantos; um pentágono tem 5 lados e 5 cantos.",
        "Os sólidos são 3D (tridimensionais): você consegue segurá-los. Nós os descrevemos por faces (as superfícies planas), arestas (onde duas faces se encontram) e vértices (os cantos pontudos). Um cubo tem 6 faces quadradas, 12 arestas e 8 vértices. Uma caixa retangular (prisma retangular) tem as mesmas contagens, mas as faces dela são retângulos.",
        "Figuras 2D e sólidos 3D são ligados: as faces de um sólido 3D são figuras 2D. As faces de um cubo são quadrados; uma lata (cilindro) tem duas faces circulares. Conhecer as figuras planas ajuda você a descrever os sólidos que elas formam.",
        "Uma figura tem eixo de simetria se você consegue dobrá-la de modo que as duas metades caiam exatamente uma sobre a outra. Um quadrado tem 4 eixos de simetria; um retângulo tem 2; um coração tem 1 (bem no meio). Dobrar é o teste mais seguro: se as metades não coincidem, aquela dobra não é um eixo de simetria.",
      ],
      examples: [
        {
          problem: "Quantos lados e cantos tem um hexágono?",
          solution: "6 lados e 6 cantos",
          explanation: "\"Hexa\" significa seis. Um hexágono tem 6 lados retos, e cada par de lados se encontra em um canto, então ele também tem 6 cantos.",
        },
        {
          problem: "Quantas faces, arestas e vértices tem um cubo?",
          solution: "6 faces, 12 arestas, 8 vértices",
          explanation: "Um cubo é como uma caixa com 6 faces quadradas. Cada lugar em que duas faces se encontram é uma aresta (são 12), e cada canto pontudo é um vértice (são 8).",
        },
        {
          problem: "Quantos eixos de simetria tem um retângulo (que não seja quadrado)?",
          explanation: "Você pode dobrar um retângulo ao meio de cima para baixo e da esquerda para a direita, e as duas metades coincidem, mas as dobras diagonais não coincidem, então são 2 eixos de simetria.",
        },
      ],
      interactiveActivity: {
        title: "Separe e dobre as figuras",
        instructions: [
          "Separe cada figura na caixa 2D ou na caixa 3D.",
          "Para as figuras 2D, informe o número de lados e cantos; para os sólidos 3D, informe faces, arestas e vértices.",
          "Use a ferramenta de dobra para testar os eixos de simetria de cada figura 2D e conte quantos ela tem.",
        ],
        conceptConnection: "Separar por dimensão e contar atributos transforma os nomes das figuras em algo sobre o que dá para raciocinar, e a ferramenta de dobra faz da simetria algo que você vê em vez de decorar.",
        sampleData: {
          shapes2D: [
            {
              name: "triângulo",
            },
            {
              name: "quadrado",
            },
            {
              name: "retângulo",
            },
            {
              name: "hexágono",
            },
          ],
          shapes3D: [
            {
              name: "cubo",
            },
            {
              name: "prisma retangular",
            },
            {
              name: "pirâmide de base quadrada",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "Monte e dobre figuras",
        instructions: [
          "Recorte figuras 2D de papel e dobre cada uma para achar todos os eixos de simetria dela; marque cada linha de dobra com lápis.",
          "Monte um cubo ou uma caixa a partir de uma planificação (um molde aberto) e conte as faces, arestas e vértices enquanto dobra.",
          "Faça uma tabela de figuras listando cada figura e os atributos dela.",
        ],
        successLooksLike: "Sua tabela lista corretamente lados e cantos das figuras planas e faces, arestas e vértices dos sólidos, e as suas figuras dobradas mostram os verdadeiros eixos de simetria delas.",
      },
      checkpointQuestions: [
        {
          question: "Que figura 2D tem 4 lados iguais e 4 cantos?",
          answer: "Um quadrado.",
        },
        {
          question: "Quantas arestas tem um cubo?",
          answer: "12 arestas.",
        },
        {
          question: "Quantos eixos de simetria tem um quadrado?",
          answer: "4 (dois passando pelo meio dos lados e dois passando pelos cantos).",
        },
      ],
      reflectionQuestion: "Como as figuras 2D e os sólidos 3D se conectam? Escolha um sólido 3D e descreva as figuras 2D que você vê nas faces dele.",
      challengeProblem: {
        prompt: "Um sólido tem 5 faces, 8 arestas e 5 vértices. Uma face é um quadrado e o restante são triângulos. Que sólido 3D é esse?",
        hint: "Imagine um sólido com uma base plana e lados triangulares que se encontram em um único ponto no topo.",
        answer: "Uma pirâmide de base quadrada. A base quadrada mais quatro faces triangulares dão 5 faces, e os cantos da base mais o ponto do topo dão 5 vértices.",
      },
      extensionChallenge: "Crie uma borboleta ou uma máscara simétrica desenhando uma metade, dobrando e decalcando para que os dois lados coincidam. Depois marque o eixo de simetria dela.",
      vocabulary: [
        {
          term: "Figura 2D",
          definition: "Uma figura plana com comprimento e largura, como um triângulo ou um quadrado.",
        },
        {
          term: "Sólido 3D",
          definition: "Um sólido que você consegue segurar, como um cubo ou uma esfera.",
        },
        {
          term: "Lado",
          definition: "Uma borda reta de uma figura 2D.",
        },
        {
          term: "Vértice (canto)",
          definition: "Um ponto onde dois ou mais lados ou arestas se encontram.",
        },
        {
          term: "Face",
          definition: "Uma superfície plana de um sólido 3D.",
        },
        {
          term: "Aresta",
          definition: "A linha onde duas faces de um sólido 3D se encontram.",
        },
        {
          term: "Eixo de simetria",
          definition: "Uma linha de dobra que divide uma figura em duas metades que coincidem.",
        },
      ],
      materials: [
        "Papel",
        "Tesoura",
        "Planificações de figuras para dobrar (opcional)",
        "Lápis",
      ],
    },
    {
      title: "O desafio do tempo e do dinheiro",
      shortTitle: "Tempo e dinheiro",
      theme: "O desafio do tempo e do dinheiro: administre o seu dia e a sua carteira",
      description: "Os alunos leem relógios, calculam quanto tempo passa entre dois momentos, contam moedas e notas, dão troco e planejam um orçamento simples: a matemática que as pessoas usam todo dia.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º ao 5.º ano",
      skillFocus: [
        "Ver as horas",
        "Tempo decorrido",
        "Contar dinheiro",
        "Dar troco",
        "Orçamentos simples",
      ],
      learningGoals: [
        "Ver as horas em um relógio de ponteiros até os cinco minutos mais próximos e relacionar isso ao horário digital.",
        "Achar o tempo decorrido entre dois horários usando uma reta numérica ou contando para a frente (das 2:15 às 3:00 são 45 minutos).",
        "Contar uma mistura de moedas e notas, dar troco contando para a frente e planejar uma compra dentro de um orçamento.",
      ],
      keyConcepts: [
        "O ponteiro curto mostra a hora; o ponteiro comprido mostra os minutos.",
        "O tempo decorrido é o intervalo entre um horário de início e um horário de fim.",
        "Dar troco significa contar para a frente, do preço até a quantia paga.",
      ],
      introStory: "Você acabou de receber as chaves da cantina da escola por um dia, e também um horário para cumprir. O ônibus chega às 3:00, então você precisa saber quanto falta. Um cliente compra um lápis de 65 centavos com um dólar e espera o troco. E você tem exatamente $5 para repor os materiais. O tempo e o dinheiro comandam o dia inteiro, e hoje eles passam pelas suas mãos.",
      mainLesson: [
        "Em um relógio de ponteiros, o ponteiro curto aponta para a hora e o comprido aponta para os minutos. Cada número por que o ponteiro comprido passa são 5 minutos, então, quando ele aponta para o 3, são 15 minutos depois da hora. \"2:15\" significa que a hora é 2 e já passaram 15 minutos.",
        "O tempo decorrido é quanto tempo passa entre um início e um fim. Para achá-lo, conte para a frente. Das 2:15 às 3:00, conte 45 minutos (das 2:15 às 2:30 são 15, e daí até as 3:00 são mais 30, somando 45). Uma reta numérica de horários deixa isso fácil de enxergar.",
        "O dinheiro é contado pelo valor. Uma moeda de 25 centavos vale 25, uma de 10 vale 10, uma de 5 vale 5 e uma de 1 centavo vale 1. Conte das moedas maiores para as menores: uma de 25, duas de 10 e uma de 5 dão 25 + 10 + 10 + 5 = 50 centavos. As notas funcionam do mesmo jeito, só que em escala maior.",
        "Dar troco significa contar para a frente, do preço até o que o cliente pagou. Se um lápis custa 65 centavos e a pessoa paga com um dólar (100 centavos), conte para a frente: de 65 a 70 (uma moeda de 5), de 70 a 100 (três de 10), ou seja, 35 centavos de troco. Um orçamento vai além: com $5, você planeja as compras para que o total fique dentro do que você tem.",
      ],
      examples: [
        {
          problem: "O ponteiro das horas está entre o 4 e o 5, e o dos minutos aponta para o 6. Que horas são?",
          explanation: "O ponteiro dos minutos no 6 significa 30 minutos depois da hora (6 x 5 = 30). O ponteiro das horas passou pouco do 4, então são 4:30.",
        },
        {
          problem: "Quanto tempo passa da 1:45 às 2:30?",
          solution: "45 minutos",
          explanation: "Conte para a frente: da 1:45 às 2:00 são 15 minutos, e das 2:00 às 2:30 são 30 minutos. 15 + 30 = 45 minutos.",
        },
        {
          problem: "Um item custa 65 centavos e você paga com $1. Quanto é o troco?",
          solution: "35 centavos",
          explanation: "Conte para a frente de 65 até 100: são 35 centavos. Então o troco é de 35 centavos (uma moeda de 25 e uma de 10).",
        },
      ],
      interactiveActivity: {
        title: "Administre a cantina da escola",
        instructions: [
          "Em cada venda, arraste moedas e notas para a bandeja até chegar ao preço mostrado.",
          "Quando um cliente pagar a mais, conte para a frente para dar o troco certo.",
          "Deixe o seu orçamento de reposição à vista e pare antes de estourar.",
        ],
        conceptConnection: "Formar quantias exatas e contar para a frente ao dar troco transforma o dinheiro em adição e subtração práticas, com um propósito de verdade.",
        sampleData: {
          coins: [
            {
              name: "moeda de 1 centavo",
            },
            {
              name: "moeda de 5 centavos",
            },
            {
              name: "moeda de 10 centavos",
            },
            {
              name: "moeda de 25 centavos",
            },
          ],
          bills: [
            {
              name: "nota de um dólar",
            },
            {
              name: "nota de cinco dólares",
            },
          ],
          sales: [
            {
              item: "lápis",
            },
            {
              item: "borracha",
            },
            {
              item: "caderno",
            },
          ],
        },
      },
      handsOnChallenge: {
        title: "Encenação: loja e horário",
        instructions: [
          "Separe moedas de brinquedo ou de verdade e coloque etiquetas de preço em três itens da \"loja\".",
          "Revezem-se como caixa e cliente: o cliente paga com moedas e o caixa conta para a frente para dar o troco.",
          "Depois monte um horário simples do dia com três atividades e calcule o tempo decorrido entre cada par.",
        ],
        successLooksLike: "Você consegue dar o troco certo contando para a frente e dizer quantos minutos passam entre duas atividades do seu horário.",
      },
      checkpointQuestions: [
        {
          question: "Que horas são quando o ponteiro das horas passou do 7 e o dos minutos aponta para o 3?",
          answer: "7:15 (o ponteiro dos minutos no 3 significa 15 minutos depois da hora).",
        },
        {
          question: "Quanto tempo há das 6:20 às 7:00?",
          answer: "40 minutos (conte para a frente: 20 minutos até as 6:40, depois mais 20 até as 7:00, somando 40 minutos).",
        },
        {
          question: "Você compra um lanche de 70 centavos com $1. Qual é o seu troco?",
          answer: "30 centavos.",
        },
      ],
      reflectionQuestion: "Por que contar para a frente é um jeito útil de dar troco? Como isso se liga à subtração?",
      challengeProblem: {
        prompt: "Você tem $5 para gastar. Compra uma canetinha por $1.25 e um caderno por $2.50. Quanto dinheiro sobra, e você conseguiria comprar também uma borracha de $1.50?",
        hint: "Some primeiro as duas compras, subtraia de $5 e depois compare o que sobrou com o preço da borracha.",
        answer: "Sobra $1.25. A canetinha e o caderno custam $1.25 + $2.50 = $3.75; $5.00 - $3.75 = $1.25. Você não consegue comprar a borracha de $1.50, porque $1.25 não é o bastante.",
      },
      extensionChallenge: "Planeje um orçamento de $10 para os lanches de uma festa: liste pelo menos três itens com preços, mantenha o total em $10 ou menos, e mostre o troco que você receberia de uma nota de $10.",
      vocabulary: [
        {
          term: "Relógio de ponteiros",
          definition: "Um relógio com ponteiro das horas e ponteiro dos minutos.",
        },
        {
          term: "Relógio digital",
          definition: "Um relógio que mostra a hora em números, como 4:30.",
        },
        {
          term: "Tempo decorrido",
          definition: "A quantidade de tempo que passa entre um início e um fim.",
        },
        {
          term: "Troco",
          definition: "O dinheiro que você recebe de volta quando paga mais que o preço.",
        },
        {
          term: "Orçamento",
          definition: "Um plano de quanto dinheiro você pode gastar.",
        },
        {
          term: "Valor",
          definition: "Quanto uma moeda ou nota vale, como uma moeda de 25 centavos.",
        },
      ],
      materials: [
        "Moedas e notas de brinquedo ou de verdade",
        "Etiquetas de preço de papel",
        "Um relógio ou um mostrador de relógio desenhado",
      ],
    },
    {
      title: "Detetive de dados",
      shortTitle: "Detetive de dados",
      theme: "O detetive de dados: transformando risquinhos de contagem em respostas",
      description: "Os alunos coletam dados com tabelas de contagem, apresentam tudo em gráficos de barras e pictogramas, e leem gráficos para responder perguntas e comparar categorias, achando a história escondida nos números.",
      estimatedTime: "45-60 minutos",
      gradeRange: "2.º ao 5.º ano",
      skillFocus: [
        "Tabelas de contagem",
        "Gráficos de barras",
        "Pictogramas",
        "Interpretar dados",
        "Comparar categorias",
      ],
      learningGoals: [
        "Coletar dados com uma tabela de contagem e contar os risquinhos em grupos de cinco.",
        "Construir um gráfico de barras e um pictograma a partir de um conjunto de dados, incluindo uma legenda para o pictograma.",
        "Ler um gráfico para responder a perguntas de \"quantos\", \"qual é o maior ou o menor\" e \"quantos a mais\".",
      ],
      keyConcepts: [
        "Dados são informações que coletamos, e uma tabela mantém tudo organizado.",
        "Os gráficos de barras usam a altura das barras e os pictogramas usam figuras para comparar categorias.",
        "Ler um gráfico significa comparar categorias e achar diferenças.",
      ],
      introStory: "Tem um mistério zumbindo pela sala: qual é a fruta preferida de todo mundo? Os boatos dizem que é maçã, mas o detetive de dados não confia em boatos: o detetive de dados coleta provas. Você vai entrevistar a turma, fazer um risquinho para cada voto e depois transformar esses risquinhos em um gráfico tão claro que qualquer pessoa vê a resposta de relance.",
      mainLesson: [
        "Dados são informações que reunimos para responder a uma pergunta. Para manter tudo organizado, usamos uma tabela de contagem: um risquinho para cada item, e cada quinto risquinho é desenhado atravessando os quatro anteriores, para que possamos contar de cinco em cinco. Os risquinhos deixam a contagem de uma pesquisa grande rápida e precisa.",
        "Um gráfico de barras mostra os dados com barras: quanto mais alta a barra, mais há naquela categoria. As barras facilitam a comparação: a barra mais alta é a que tem \"mais\" e a mais baixa é a que tem \"menos\", e você vê isso de relance sem fazer conta nenhuma.",
        "Um pictograma usa uma figura para representar certa quantidade de itens, explicada por uma legenda (por exemplo, uma figura de maçã = 2 votos). Se uma linha tem 3 figuras de maçã e cada uma representa 2 votos, aquela categoria tem 6 votos. A legenda é essencial: sem ela, não dá para saber o que as figuras significam.",
        "O verdadeiro trabalho de detetive é ler o gráfico. Você responde a perguntas como \"Quantos escolheram banana?\", \"Qual fruta foi a mais popular?\" e \"Quantos a mais escolheram maçã do que uva?\". Essa última é uma subtração: ache as duas barras e tire a diferença.",
      ],
      examples: [
        {
          problem: "Uma tabela de contagem mostra as maçãs com quatro risquinhos verticais e uma linha atravessando-os. Quantos votos são?",
          solution: "5 votos",
          explanation: "Quatro risquinhos com um quinto atravessando formam um grupo de cinco, que equivale a 5 votos.",
        },
        {
          problem: "Em um pictograma, cada maçã = 2 votos. Uma linha tem 4 figuras de maçã. Quantos votos são?",
          solution: "8 votos",
          explanation: "Multiplique o número de figuras pelo valor da legenda: 4 figuras x 2 votos cada uma = 8 votos.",
        },
        {
          problem: "Um gráfico de barras mostra maçãs = 9 e uvas = 4. Quantos a mais escolheram maçã?",
          solution: "5 a mais",
          explanation: "Ache as duas barras e subtraia: 9 - 4 = 5. Cinco pessoas a mais escolheram maçã do que uva.",
        },
      ],
      interactiveActivity: {
        title: "Dos risquinhos ao gráfico",
        instructions: [
          "Registre os resultados da pesquisa como risquinhos de contagem para cada categoria.",
          "Mude para a visão de gráfico de barras e arraste cada barra até a altura certa.",
          "Mude para a visão de pictograma, defina a legenda e responda às três perguntas que o detetive faz sobre os seus dados.",
        ],
        conceptConnection: "Transformar o mesmo conjunto de dados em risquinhos, em um gráfico de barras e em um pictograma mostra que um gráfico nada mais é do que uma imagem mais fácil de ler dos números que você coletou.",
        sampleData: {
          question: "Qual é a sua fruta preferida?",
          results: [
            {
              category: "Maçã",
            },
            {
              category: "Banana",
            },
            {
              category: "Uva",
            },
            {
              category: "Laranja",
            },
          ],
          questions: [
            "Qual fruta é a mais popular?",
            "Quantos escolheram laranja?",
            "Quantos a mais escolheram maçã do que uva?",
          ],
        },
      },
      handsOnChallenge: {
        title: "Faça a sua própria pesquisa",
        instructions: [
          "Escolha uma pergunta com quatro opções (cor, bicho de estimação, esporte ou lanche preferido).",
          "Pergunte a pelo menos dez pessoas e registre cada resposta com um risquinho de contagem.",
          "Transforme os seus risquinhos em um gráfico de barras no papel quadriculado e depois escreva duas perguntas que o seu gráfico consegue responder.",
        ],
        successLooksLike: "Seu gráfico de barras tem as categorias rotuladas e uma escala clara, e com ele você consegue responder \"qual é o maior\" e \"quantos a mais\".",
      },
      checkpointQuestions: [
        {
          question: "Como os risquinhos de contagem ajudam você a contar uma pesquisa grande?",
          answer: "Eles agrupam as contagens de cinco em cinco, então dá para contar rápido de 5 em 5 em vez de um por um.",
        },
        {
          question: "Em um pictograma em que cada estrela = 5, uma linha tem 3 estrelas. Quantos são?",
          answer: "15 (3 estrelas x 5 = 15).",
        },
        {
          question: "Um gráfico de barras mostra cachorros = 7 e gatos = 10. Quantos a mais escolheram gatos?",
          answer: "3 a mais (10 - 7 = 3).",
        },
      ],
      reflectionQuestion: "Por que um gráfico é mais fácil de entender do que uma lista comprida de risquinhos de contagem? O que um gráfico deixa você ver rapidamente?",
      challengeProblem: {
        prompt: "Um pictograma de bichos de estimação usa uma patinha = 4 bichos. Os cachorros têm 5 patinhas, os gatos têm 3 patinhas e os peixes têm 2 patinhas. Quantos bichos há no total, e qual é o mais popular?",
        hint: "Ache a contagem de cada categoria multiplicando as patinhas por 4 e depois some todas as categorias.",
        answer: "40 bichos no total, e os cachorros são os mais populares. Cachorros = 5 x 4 = 20, gatos = 3 x 4 = 12, peixes = 2 x 4 = 8; 20 + 12 + 8 = 40.",
      },
      extensionChallenge: "Colete dados em dois dias diferentes e faça dois gráficos de barras lado a lado. Escreva uma frase descrevendo como os resultados mudaram de um dia para o outro.",
      vocabulary: [
        {
          term: "Dados",
          definition: "Informações que você coleta para responder a uma pergunta.",
        },
        {
          term: "Tabela de contagem",
          definition: "Uma tabela que registra contagens com risquinhos agrupados de cinco em cinco.",
        },
        {
          term: "Gráfico de barras",
          definition: "Um gráfico que compara categorias usando a altura das barras.",
        },
        {
          term: "Pictograma",
          definition: "Um gráfico que usa figuras para representar quantidades.",
        },
        {
          definition: "Uma nota que diz quantos itens cada figura de um pictograma representa.",
        },
        {
          term: "Categoria",
          definition: "Um grupo ou opção que está sendo contado, como \"maçãs\".",
        },
      ],
      materials: [
        "Papel quadriculado",
        "Lápis",
        "Uma pergunta para pesquisar",
        "Régua para fazer barras retas",
      ],
    },
    {
      title: "Construa uma cidade matemática",
      shortTitle: "Cidade matemática",
      theme: "O projeto final: crie uma cidade que funciona com matemática",
      description: "Os alunos combinam todas as habilidades do curso para projetar uma cidade de papel sobre uma malha quadriculada: prédios geométricos com alturas medidas, uma padaria que vende frações, um banco que dá troco e uma pesquisa com os moradores mostrada em um gráfico, e depois apresentam a matemática por trás de tudo.",
      estimatedTime: "60-90 minutos",
      gradeRange: "2.º ao 5.º ano",
      skillFocus: [
        "Geometria",
        "Medidas",
        "Dinheiro",
        "Frações",
        "Operações",
        "Dados",
        "Resolução de problemas",
      ],
      learningGoals: [
        "Aplicar juntas a geometria, as medidas, as frações, o dinheiro, as operações e os dados para projetar e construir uma cidade de papel.",
        "Explicar a matemática por trás de pelo menos três elementos da cidade usando o vocabulário correto do curso.",
        "Resolver um problema de planejamento com vários passos, como ficar dentro de um orçamento de construção atendendo a uma exigência de tamanho.",
      ],
      keyConcepts: [
        "Projetos reais usam vários tipos de matemática ao mesmo tempo.",
        "Planejar significa usar juntas as operações, as medidas e o dinheiro para alcançar objetivos.",
        "Explicar a sua matemática com clareza faz parte de terminar um projeto.",
      ],
      introStory: "A prefeita da Cidade Matemática tem uma última tarefa antes da grande inauguração: a cidade inteira precisa ser projetada, e precisa funcionar. Cada prédio é uma figura, cada rua tem um comprimento, a padaria vende fatias como frações, o banco dá troco, e quem planeja a cidade quer um gráfico do que os moradores mais gostam. Você treinou por nove semanas. Agora você é o projetista-chefe: construa uma cidade que funciona com matemática.",
      mainLesson: [
        "Nesta semana você junta tudo o que aprendeu. Uma cidade é o projeto perfeito porque precisa de tudo ao mesmo tempo: figuras para os prédios, medidas para as ruas, frações na padaria, dinheiro no banco, operações para planejar e dados para entender os moradores.",
        "Comece pela geometria e pelas medidas. Desenhe a sua cidade no papel quadriculado. Cada prédio é uma figura 2D ou um sólido 3D: rotule os lados e cantos, ou as faces e arestas, e dê a ele uma altura medida, e a cada rua um comprimento medido. A malha mantém tudo em escala.",
        "Acrescente dinheiro e frações. Abra uma padaria que venda produtos como frações de um inteiro (meia torta, 1/4 de bolo) e um banco que cuide das compras e dê troco. Defina preços e mostre pelo menos uma transação em que um cliente paga e recebe o troco certo.",
        "Termine com dados e um plano. Entreviste alguns \"moradores\" (familiares ou colegas) sobre a parte preferida deles na cidade e mostre os resultados em um gráfico de barras ou pictograma. Depois encare um desafio: projete a sua cidade dentro de um orçamento de construção definido, usando as operações para garantir que os custos fechem. Na apresentação, explique a matemática por trás de pelo menos três elementos.",
      ],
      examples: [
        {
          problem: "Um prédio é um prisma retangular de 4 cm de altura sobre uma base de 3 cm por 2 cm. Diga o nome da forma dele e o número de faces.",
          solution: "Prisma retangular, 6 faces",
          explanation: "Uma forma de caixa é um prisma retangular. Igual ao cubo, ele tem 6 faces (topo, base e quatro laterais), mais 12 arestas e 8 vértices.",
        },
        {
          problem: "A padaria vende uma torta em quartos a 50 centavos a fatia. Um cliente compra 3 fatias com $2. Qual é o troco?",
          solution: "50 centavos de troco",
          explanation: "Três fatias a 50 centavos cada custam 3 x 50 = 150 centavos ($1.50). Pagando com $2.00: 200 - 150 = 50 centavos de troco.",
        },
        {
          problem: "Você tem um orçamento de construção de $20. Uma casa custa $6, uma escola $9 e um parque $4. Dá para construir os três?",
          solution: "Sim, e sobra $1",
          explanation: "Some os custos: 6 + 9 + 4 = 19. Como 19 é menor que 20, dá para construir os três e ainda sobram 20 - 19 = $1 no orçamento.",
        },
      ],
      interactiveActivity: {
        title: "Projete a Cidade Matemática",
        instructions: [
          "Coloque as figuras dos prédios na malha e defina a altura e as medidas da base de cada um.",
          "Abra a padaria e o banco: defina preços em frações e conclua pelo menos uma transação com troco.",
          "Entreviste os moradores, transforme os resultados em um gráfico e mantenha o custo total de construção dentro do orçamento mostrado.",
        ],
        conceptConnection: "Quem planeja a cidade reúne todas as unidades do curso, então cada escolha (uma figura, um comprimento, um preço, um gráfico) recorre à matemática de uma semana diferente ao mesmo tempo.",
        sampleData: {
          bakeryItems: [
            {
              item: "fatia de torta",
            },
            {
              item: "meio bolo",
            },
          ],
          surveyQuestion: "Qual é a sua parte preferida da Cidade Matemática?",
          surveyCategories: [
            "O parque",
            "A padaria",
            "A escola",
            "A loja",
          ],
        },
      },
      handsOnChallenge: {
        title: "Construa e apresente a sua cidade de papel",
        instructions: [
          "No papel quadriculado ou em um cartaz, desenhe e rotule a sua cidade: figuras para os prédios, comprimentos medidos das ruas, uma padaria com preços em frações e um banco.",
          "Faça uma pesquisa com pelo menos seis pessoas e acrescente à sua cidade um gráfico de barras ou pictograma com os resultados.",
          "Prepare uma apresentação curta que explique a matemática por trás de três elementos (por exemplo, a forma de um prédio, o troco dado no banco e o que o gráfico mostra).",
        ],
        successLooksLike: "Sua cidade pronta usa geometria, medidas, frações, dinheiro e dados, fica dentro do orçamento de construção, e você consegue explicar com clareza a matemática por trás de três partes dela.",
      },
      checkpointQuestions: [
        {
          question: "Diga dois tipos de matemática que a sua cidade usa e onde cada um aparece.",
          answer: "As respostas variam; por exemplo, geometria nas formas dos prédios e dinheiro no banco na hora de dar troco.",
        },
        {
          question: "Seu orçamento é de $15 e os seus prédios custam $12. Quanto sobra?",
          answer: "$3 (15 - 12 = 3).",
        },
        {
          question: "A padaria vende um bolo em metades. Quantas fatias há em um bolo inteiro?",
          answer: "2 fatias, porque metades significa duas partes iguais.",
        },
      ],
      reflectionQuestion: "Qual habilidade matemática do curso foi a mais útil para construir a sua cidade, e por quê? O que te surpreendeu em usar vários tipos de matemática ao mesmo tempo?",
      challengeProblem: {
        prompt: "Sua cidade tem um orçamento de construção de $30. Você precisa incluir uma escola ($9) e um parque ($4), e quer o arranha-céu mais alto possível com o dinheiro que sobrar. Um arranha-céu é feito de blocos que custam $3 cada e acrescentam 2 cm de altura. Qual é o arranha-céu mais alto que você consegue pagar?",
        hint: "Primeiro gaste com os prédios obrigatórios, veja quanto dinheiro sobrou, depois descubra quantos blocos inteiros de $3 você consegue comprar e quanta altura cada um acrescenta.",
        answer: "10 cm de altura. Escola + parque = 9 + 4 = 13, sobrando 30 - 13 = 17. Cada bloco custa $3, e $17 compram 5 blocos inteiros ($15), sobrando $2. Cinco blocos x 2 cm cada = 10 cm.",
      },
      extensionChallenge: "Acrescente uma linha de transporte público à sua cidade: marque os pontos de ônibus na malha, dê à rota um comprimento total medido e faça um horário mostrando o tempo decorrido entre o primeiro e o último ponto.",
      vocabulary: [
        {
          term: "Projetar",
          definition: "Planejar e criar algo com um propósito.",
        },
        {
          term: "Escala",
          definition: "Manter os tamanhos em proporção, muitas vezes usando uma malha quadriculada.",
        },
        {
          term: "Orçamento",
          definition: "Um plano de quanto você pode gastar.",
        },
        {
          term: "Transação",
          definition: "Uma troca de compra ou venda, de dinheiro por mercadoria.",
        },
        {
          term: "Problema de vários passos",
          definition: "Um problema que exige mais de uma operação ou etapa para ser resolvido.",
        },
      ],
      materials: [
        "Papel quadriculado ou cartolina",
        "Régua",
        "Giz de cera ou canetinhas",
        "Dinheiro de brinquedo",
        "Tesoura e fita adesiva",
      ],
    },
  ],
}

const overlays: LocaleOverlays<MathCurriculum> = { es, zh, pt }

/** The Math Adventures curriculum in the requested language. */
export const getMathAdventuresCurriculum = createLocalizedResolver(
  mathAdventuresCurriculum,
  overlays,
)

/** Whether this course has been translated into `language` at all. */
export function mathCurriculumHasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

/** The lesson with this slug, in the requested language. */
export function findMathLesson(language: Language, slug: string): MathLesson | undefined {
  return getMathAdventuresCurriculum(language).lessons.find((lesson) => lesson.slug === slug)
}
