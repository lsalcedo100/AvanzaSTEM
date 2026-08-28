import type { Curriculum, CurriculumWeek } from "./index.ts"
import { introToPythonCurriculum } from "./index.ts"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type DeepPartial,
  type LocaleOverlays,
} from "../../../lib/localize-content.ts"
import type { Language } from "../../../i18n/translations.ts"

/**
 * Translations for the Intro to Python course.
 *
 * Sparse overlays merged onto the English `introToPythonCurriculum` by
 * `lib/localize-content`. Only prose lives here: slugs, week numbers, hrefs,
 * answer keys, and diagram/accent identifiers stay shared with English so the
 * course cannot structurally drift between locales.
 *
 * Untranslated strings fall through to English automatically, so this file can
 * grow one week at a time.
 */
const es: DeepPartial<Curriculum> = {
  title: "Introducción a la Programación en Python",
  subtitle: "Un programa de programación para principiantes de 8 semanas",
  description:
    "Un currículo de programación para principiantes de 8 semanas donde los estudiantes aprenden Python creando pequeños juegos, programas interactivos y retos de depuración.",
  gradeRange: "3.º a 6.º grado",
  estimatedTimePerWeek: "50-60 minutos",
  requirement: "Funciona en el navegador, sin instalar nada",
  summary:
    "Estudiantes sin experiencia previa aprenden a leer y escribir Python de verdad, una idea a la vez. Cada semana presenta un solo concepto y termina con un pequeño proyecto que el estudiante puede ejecutar y presumir. Para la última semana, los estudiantes combinan todo lo aprendido para diseñar y construir su propio minijuego.",
  format: [
    "Un concepto por semana, enseñado en orden para que cada semana se apoye en la anterior.",
    "Cada lección termina con un proyecto que los estudiantes escriben y ejecutan por su cuenta.",
    "Retos cortos de práctica, depuración y ampliación permiten a los estudiantes practicar a su propio ritmo.",
    "Todo el código se ejecuta en el área de juego de Python del navegador, así que no hace falta instalar nada.",
  ],
  outcomes: [
    "Cómo las computadoras siguen instrucciones",
    "Cómo las variables guardan información",
    "Cómo los programas toman decisiones",
    "Cómo los bucles repiten acciones",
    "Cómo las funciones organizan el código",
    "Cómo las listas y el azar hacen los programas más interesantes",
    "Cómo encontrar y corregir errores en el código",
    "Cómo diseñar y construir un pequeño proyecto final",
  ],
  lessonFlow: [
    { title: "Aprende la idea", description: "Lee una explicación breve y sencilla del único concepto nuevo de la semana." },
    { title: "Prueba el código inicial", description: "Ejecuta un código inicial que funciona en el navegador y cámbialo para ver qué pasa." },
    { title: "Arregla un ejemplo con error", description: "Encuentra y repara un pequeño error en un fragmento roto, como hacen los programadores de verdad." },
    { title: "Crea un miniproyecto", description: "Usa la nueva idea para escribir y ejecutar un pequeño programa tuyo." },
    { title: "Reflexiona sobre lo que cambió", description: "Responde una pregunta corta que conecta el código con tu propia forma de pensar." },
  ],
  facilitator: {
    audience:
      "Este currículo está escrito para el adulto que dirige la sesión: personal de biblioteca con un club de programación, un maestro que agrega una unidad de enriquecimiento, una persona voluntaria en un taller o un padre que guía a un solo estudiante. No hace falta experiencia en programación: cada lección te dice qué decir y qué observar.",
    studentNeeds: [
      "Una computadora, laptop o Chromebook con un navegador web moderno (Chrome, Edge, Safari o Firefox).",
      "Una conexión a internet para abrir las páginas de las lecciones y cargar el área de juego de Python en el navegador.",
      "Opcional: papel para planear el código y audífonos si se trabaja en las lecciones de forma individual.",
    ],
    runningTheLesson: [
      "Abre la página de la lección de la semana y lean juntos, en grupo, La idea y el vocabulario.",
      "Demuestra el código inicial una vez en una pantalla compartida, ejecutándolo para que todos vean la salida.",
      "Dales tiempo a los estudiantes para ejecutar el código inicial por su cuenta y probar el mini reto.",
      "Circula mientras trabajan, usando las preguntas sugeridas para comprobar que entendieron.",
      "Cierra con el reto de depuración y la pregunta de reflexión como discusión de todo el grupo.",
      "Calcula de 50 a 60 minutos. Si falta tiempo, el mini reto o la reflexión pueden mandarse a casa.",
    ],
    supportingBeginners: [
      "Recuérdales que los mensajes de error son parte normal de programar, no una señal de fracaso.",
      "Anímalos a escribir los cambios a mano en lugar de copiarlos, para que la sintaxis se les quede.",
      "Empareja a quien programa por primera vez con un compañero, o siéntalo donde puedas revisar seguido.",
      "Lee el código en voz alta en palabras sencillas (\"print muestra este texto en la pantalla\") para construir vocabulario.",
      "Deja que quien termine antes pruebe el reto de ampliación en lugar de esperar al grupo.",
    ],
  },
  weeks: [
    {
      facilitation: {
        goal: "Los estudiantes entienden que el código es un conjunto de instrucciones ordenadas y escriben su primer programa usando print().",
        materials: [
          "Computadoras o tabletas con un navegador web",
          "La página de la lección de la Semana 1 abierta en el área de juego",
          "Opcional: un pizarrón para escribir juntos ejemplos de líneas print()",
        ],
        explain: [
          "Un programa es una lista de instrucciones que la computadora sigue en orden, de arriba hacia abajo.",
          "print() muestra en la pantalla exactamente lo que está dentro de las comillas.",
          "Cada print() necesita paréntesis, y el texto necesita comillas alrededor.",
        ],
        commonMistakes: [
          "Dejar el texto sin comillas, como print(Hola) en lugar de print(\"Hola\").",
          "Paréntesis faltantes o mal emparejados.",
          "Esperar que la computadora adivine el significado: imprime exactamente lo que se escribe.",
        ],
        questionsToAsk: [
          "¿Qué crees que va a imprimir esta línea antes de ejecutarla?",
          "¿Qué pasa si intercambiamos el orden de dos líneas print?",
          "¿Por qué la computadora mostró un error en esta línea?",
        ],
        offlineActivity:
          "Jueguen a \"instrucciones de robot\": un estudiante le da a otro órdenes habladas paso a paso para dibujar una figura simple. Los pasos faltantes o desordenados muestran qué tan literalmente siguen las instrucciones las computadoras.",
      },
      title: "¿Qué es Python?",
      description:
        "La primera lección. Los estudiantes descubren qué es realmente el código: instrucciones exactas que la computadora sigue en orden. Escriben y ejecutan su propio programa en Python usando print() para poner palabras en la pantalla, y ven qué pasa cuando una instrucción se escribe mal.",
      learningGoals: [
        "Decir, con sus propias palabras, qué es un programa.",
        "Escribir y ejecutar un programa que use print() para mostrar texto.",
        "Explicar por qué la computadora ejecuta las líneas en orden, de arriba hacia abajo.",
        "Leer un mensaje de error corto y arreglar una comilla faltante.",
      ],
      vocabulary: [
        { term: "programa", definition: "Un conjunto de instrucciones exactas que la computadora sigue, una línea a la vez." },
        { term: "print()", definition: "Un comando de Python que muestra en la pantalla el texto que pongas entre comillas." },
        { term: "cadena", definition: "Un texto entre comillas, como \"Hola\"." },
        { term: "salida", definition: "Lo que el programa muestra en la pantalla cuando se ejecuta." },
        { term: "error", definition: "El mensaje que Python muestra cuando una línea está escrita de una forma que no puede seguir." },
      ],
      estimatedTime: "50-60 minutos",
      mainConcept:
        "El código es una lista de instrucciones, y la computadora las sigue en orden sin adivinar. print() es la primera instrucción que vas a aprender: muestra exactamente el texto que está entre las comillas. Cambia las palabras entre comillas y la pantalla cambia con ellas.",
      projectName: "Tarjeta de presentación digital",
      starterCode:
        "# Tarjeta de presentación digital\n# Cambia las palabras entre comillas para que la tarjeta hable de ti.\n\nprint(\"Hola, soy Alex.\")\nprint(\"Tengo 10 años.\")\nprint(\"El último juego que jugué fue futbol.\")",
      expectedOutput: "Hola, soy Alex.\nTengo 10 años.\nEl último juego que jugué fue futbol.",
      miniChallenge:
        "Agrega dos líneas más a tu tarjeta: una sobre un juego o pasatiempo que te guste, y otra sobre algo que quieras construir este año.",
      debuggingChallenge: {
        brokenCode: "print(Hola)",
        prompt:
          "Esta línea debería imprimir la palabra Hola, pero en vez de eso detiene el programa con un error. Fíjate en qué falta alrededor de la palabra Hola. Todo texto en Python lo necesita.",
        solution: "Pon comillas alrededor del texto:\nprint(\"Hola\")",
      },
      extensionChallenge:
        "Agrega una línea en blanco a tu tarjeta escribiendo print() sin nada dentro de los paréntesis. Úsala para dividir tu tarjeta en dos secciones ordenadas.",
      reflectionQuestion:
        "La computadora siguió tus líneas en el orden exacto en que las escribiste. En el juego que construirás al final de este programa, el orden también importará. ¿Qué saldría mal si un juego imprimiera \"¡Ganaste!\" antes de que el jugador siquiera tomara un turno?",
      teacherNotes:
        "La gran idea es que la computadora es literal: imprime exactamente lo que está entre comillas, en orden, y nada más. Los dos errores que más verás son una comilla faltante y un paréntesis faltante. Trátalos como los primeros errores que los estudiantes encuentran y arreglan, no como un fracaso. Pídeles que lean su salida en voz alta para comprobar que dice lo que querían.",
    },
    {
      facilitation: {
        goal: "Los estudiantes guardan información en variables y las usan para construir frases con print().",
        materials: [
          "Computadoras con navegador y la página de la lección de la Semana 2",
          "Opcional: sobres etiquetados o notas adhesivas para representar las variables como cajas",
        ],
        explain: [
          "Una variable es una caja con etiqueta que guarda un valor que puedes reutilizar.",
          "Los valores de texto (cadenas) van entre comillas; los valores numéricos no.",
          "Una f-string te deja meter una variable dentro de una frase usando llaves.",
        ],
        commonMistakes: [
          "Poner comillas alrededor del nombre de una variable dentro de una f-string, lo que imprime el nombre en vez de su valor.",
          "Ponerle comillas a números que deberían seguir siendo numéricos.",
          "Nombrar las variables de forma inconsistente, con espacios o mayúsculas sueltas.",
        ],
        questionsToAsk: [
          "¿Qué hay guardado en esta variable ahora mismo?",
          "¿Cuáles de estos valores son texto y cuáles son números?",
          "¿Cómo podríamos describir a otra persona sin reescribir cada línea?",
        ],
        offlineActivity:
          "Reparte sobres etiquetados (nombre, edad, animal favorito) y pide a los estudiantes que metan un papelito en cada uno. Leer los sobres en voz alta representa cómo una variable guarda y reutiliza un valor.",
      },
      title: "Variables y tipos de datos",
      description:
        "Los estudiantes le dan memoria al programa. Guardan palabras y números en variables y luego los reutilizan para construir frases, así que cambiar una línea cambia todo el programa. Este es el primer paso hacia un juego que puede hablar de un jugador por su nombre y llevar la cuenta de un puntaje.",
      learningGoals: [
        "Crear una variable y guardar un valor en ella con =.",
        "Distinguir entre texto (una cadena) y un número.",
        "Usar una variable dentro de una frase impresa con una f-string.",
        "Encontrar y arreglar una variable que se usó de forma equivocada.",
      ],
      vocabulary: [
        { term: "variable", definition: "Una caja con nombre que guarda un valor para que puedas usarlo después." },
        { term: "asignar", definition: "Poner un valor dentro de una variable usando el signo =." },
        { term: "entero", definition: "Un número completo sin punto decimal, como 10." },
        { term: "f-string", definition: "Una frase que empieza con f, donde todo lo que va dentro de { } se rellena desde una variable." },
      ],
      estimatedTime: "50-60 minutos",
      mainConcept:
        "Una variable es una caja con etiqueta: pones un valor dentro una vez y luego usas su nombre donde quieras ese valor. El texto va entre comillas (una cadena); los números no. Con una f-string puedes meter una variable directo en una frase, así que un programa puede saludar a un jugador por su nombre en vez de decir lo mismo cada vez.",
      projectName: "Generador de perfil",
      starterCode:
        "# Generador de perfil\n# Pon tus propios datos y ejecútalo para ver tu perfil de jugador.\n\nnombre = \"Alex\"\nedad = 10\njuego_favorito = \"futbol\"\n\nprint(f\"Jugador: {nombre}\")\nprint(f\"Edad: {edad}\")\nprint(f\"Juego favorito: {juego_favorito}\")",
      expectedOutput: "Jugador: Alex\nEdad: 10\nJuego favorito: futbol",
      miniChallenge:
        "Agrega una variable llamada puntaje y ponla en 0, luego imprime una línea como Puntaje: 0. Vas a llevar un puntaje exactamente así en tu juego final.",
      debuggingChallenge: {
        brokenCode: "nombre = \"Alex\"\nprint(f\"Me llamo nombre.\")",
        prompt:
          "Esto debería imprimir Me llamo Alex, pero imprime la palabra nombre. El valor de la variable no se está rellenando. ¿Qué tiene que ir alrededor de nombre dentro de una f-string?",
        solution: "Pon llaves alrededor de la variable para que Python rellene su valor:\nprint(f\"Me llamo {nombre}.\")",
      },
      extensionChallenge:
        "Agrega una variable numérica llamada mejor_puntaje e imprime una frase que use tanto nombre como mejor_puntaje, por ejemplo: El mejor puntaje de Alex es 25.",
      reflectionQuestion:
        "Cambiaste lo que dice el programa con solo cambiar una variable. ¿Por qué eso es mejor que escribir el nombre del jugador una y otra vez en cada línea?",
      teacherNotes:
        "Refuerza dos reglas: las cadenas llevan comillas, los números no; y dentro de una f-string una variable solo funciona si lleva llaves. El error clásico es poner comillas al nombre de una variable para que se imprima literalmente, y vale la pena dejar que los estudiantes lo descubran. Mantén los nombres de variables en minúsculas y descriptivos (puntaje, no x).",
    },
    {
      facilitation: {
        goal: "Los estudiantes usan input() para recoger respuestas y responder a ellas, convirtiendo un programa en una conversación de ida y vuelta.",
        materials: [
          "Computadoras con navegador y la página de la lección de la Semana 3",
          "Opcional: un guion impreso para el juego de roles del chatbot sin computadora",
        ],
        explain: [
          "input() hace una pregunta y se detiene hasta que el usuario escribe una respuesta y presiona Enter.",
          "La respuesta se puede guardar en una variable y usar más adelante en el programa.",
          "input() siempre devuelve texto.",
        ],
        commonMistakes: [
          "Olvidar las comillas alrededor del texto de la pregunta dentro de input().",
          "Esperar que el programa siga antes de que el usuario presione Enter.",
          "Intentar hacer matemáticas con una respuesta sin convertirla en número (eso viene la próxima semana).",
        ],
        questionsToAsk: [
          "¿Dónde se detiene el programa y espera al usuario?",
          "¿En qué se diferencia esto del programa de la semana pasada, que solo imprimía?",
          "¿Qué debería responder el programa usando la respuesta?",
        ],
        offlineActivity:
          "Hagan un juego de roles de chatbot: un estudiante es el programa y solo puede responder usando un guion impreso más las respuestas que le dé el usuario. Muestra cómo la entrada alimenta la respuesta.",
      },
      title: "Entrada e interacción",
      description:
        "Los programas empiezan a escuchar. Los estudiantes usan input() para hacerle una pregunta al jugador, esperar la respuesta y usarla en lo que el programa contesta. Al final tienen un chatbot corto que responde a lo que escribas.",
      learningGoals: [
        "Usar input() para obtener una respuesta de quien ejecuta el programa.",
        "Guardar una respuesta en una variable y usarla después.",
        "Explicar que el programa se detiene en input() hasta que el usuario escribe algo.",
        "Arreglar una línea input() a la que le faltan las comillas.",
      ],
      vocabulary: [
        { term: "input()", definition: "Un comando de Python que hace una pregunta y espera a que el usuario escriba una respuesta." },
        { term: "mensaje", definition: "El texto que input() muestra para decirle al usuario qué escribir." },
        { term: "usuario", definition: "La persona que usa el programa; en un juego, el jugador." },
      ],
      estimatedTime: "50-60 minutos",
      mainConcept:
        "input() es la forma en que un programa escucha. Muestra un mensaje, luego se detiene y espera a que el jugador escriba y presione Enter. Su respuesta se guarda en una variable, así que el programa puede usarla (su nombre, su adivinanza, su elección) en lo que haga después. Ten en cuenta: input() siempre devuelve texto.",
      projectName: "Mini chatbot",
      starterCode:
        "# Mini chatbot\n# El programa hace preguntas y luego responde usando tus respuestas.\n\nnombre = input(\"¿Cómo te llamo? \")\nprint(f\"Mucho gusto, {nombre}.\")\n\njuego = input(\"¿Qué juego te gusta ahorita? \")\nprint(f\"¿{juego}? Buena elección. Pronto construiremos uno nuestro.\")",
      expectedOutput:
        "¿Cómo te llamo? Alex\nMucho gusto, Alex.\n¿Qué juego te gusta ahorita? futbol\n¿futbol? Buena elección. Pronto construiremos uno nuestro.",
      miniChallenge:
        "Agrega una pregunta más, tal vez su color o animal favorito, y usa la respuesta en la contestación del programa.",
      debuggingChallenge: {
        brokenCode: "nombre = input(¿Cómo te llamo? )",
        prompt:
          "Ejecutar esto provoca un error antes de que siquiera aparezca la pregunta. El mensaje dentro de input() es texto para que lo lea el usuario. ¿Qué necesita alrededor todo texto?",
        solution: "El mensaje es texto, así que necesita comillas:\nnombre = input(\"¿Cómo te llamo? \")",
      },
      extensionChallenge:
        "Pide el nombre del jugador y su juego favorito, luego imprime una frase que use los dos, como: ¡Alex está listo para jugar futbol!",
      reflectionQuestion:
        "La semana pasada tu programa siempre decía lo mismo. Ahora te responde. ¿Qué podrías preguntarle a un jugador al inicio de un juego para que sienta que es sobre él?",
      teacherNotes:
        "input() siempre devuelve texto, incluso cuando el usuario escribe un número: eso se vuelve importante en la Semana 5, donde comparamos números y usamos int(). Vigila las comillas faltantes alrededor del mensaje. En el área de trabajo, tanto el mensaje como la respuesta escrita aparecen en el panel de salida, así que la salida esperada muestra una conversación de ejemplo.",
    },
    {
      facilitation: {
        goal: "Los estudiantes usan if, elif y else para que el programa haga cosas distintas según la respuesta.",
        materials: [
          "Computadoras con navegador y la página de la lección de la Semana 4",
          "Opcional: un pizarrón o espacio en el piso para dibujar o caminar un árbol de decisiones",
        ],
        explain: [
          "Una condición es una pregunta que es verdadera o falsa.",
          "El código con sangría debajo de un if se ejecuta solo cuando su condición es verdadera.",
          "elif y else se encargan de los demás casos.",
          "Comparar valores usa dos signos de igual (==); un solo signo de igual (=) guarda un valor.",
        ],
        commonMistakes: [
          "Usar = en lugar de == al comparar dos valores.",
          "Olvidar la sangría del código bajo if, elif o else.",
          "Olvidar que las comparaciones de texto distinguen mayúsculas (\"Tierra\" no es \"tierra\").",
        ],
        questionsToAsk: [
          "¿Qué condición estamos comprobando aquí?",
          "¿Qué rama se va a ejecutar si la respuesta es esta?",
          "¿Por qué el programa eligió esa respuesta?",
        ],
        offlineActivity:
          "Hagan un árbol de decisiones en el piso con cinta o letreros: los estudiantes contestan una pregunta de sí o no y caminan a la rama que corresponde. Hace visible el if/elif/else.",
      },
      title: "Condicionales",
      description:
        "El programa empieza a tomar decisiones. Los estudiantes usan if, elif y else para que haga cosas distintas según la respuesta del jugador. Construyen un cuestionario corto que revisa respuestas y contesta a cada una: el corazón de cualquier juego que se pueda ganar o perder.",
      learningGoals: [
        "Escribir una sentencia if que se ejecute solo cuando una condición es verdadera.",
        "Agregar elif y else para manejar las demás respuestas.",
        "Comparar la respuesta del jugador con un valor esperado usando ==.",
        "Arreglar la confusión común entre = y ==.",
      ],
      vocabulary: [
        { term: "condición", definition: "Una pregunta con respuesta verdadera o falsa, como respuesta == \"Tierra\"." },
        { term: "if", definition: "Ejecuta las líneas con sangría de abajo solo cuando su condición es verdadera." },
        { term: "elif", definition: "Comprueba otra condición cuando las de arriba resultaron falsas." },
        { term: "else", definition: "Se ejecuta cuando ninguna de las condiciones de arriba fue verdadera." },
        { term: "==", definition: "Comprueba si dos valores son iguales (distinto de =, que guarda un valor)." },
      ],
      estimatedTime: "55-60 minutos",
      mainConcept:
        "Un condicional deja que el programa elija. Python comprueba una condición (algo que es verdadero o falso) y ejecuta las líneas con sangría debajo solo si la condición es verdadera. Con if, elif y else, un programa puede reaccionar de una forma ante una respuesta correcta, de otra ante una casi correcta y de otra ante una equivocada. Así es como un juego decide si anotaste, ganaste o perdiste.",
      projectName: "Cuestionario de trivia o de personalidad",
      starterCode:
        "# Cuestionario de trivia\n# Haz una pregunta y luego revisa la respuesta.\n\nrespuesta = input(\"¿En qué planeta vivimos? \")\n\nif respuesta == \"Tierra\":\n    print(\"¡Correcto! 1 punto.\")\nelif respuesta == \"tierra\":\n    print(\"Buena idea, cuidado con la T mayúscula. Te lo contamos.\")\nelse:\n    print(\"No exactamente. La respuesta es Tierra.\")",
      expectedOutput: "¿En qué planeta vivimos? Tierra\n¡Correcto! 1 punto.",
      miniChallenge:
        "Agrega una segunda pregunta con su propio if / else, para que tu cuestionario tenga dos preguntas seguidas.",
      debuggingChallenge: {
        brokenCode:
          "respuesta = input(\"¿En qué planeta vivimos? \")\nif respuesta = \"Tierra\":\n    print(\"¡Correcto!\")",
        prompt:
          "Python muestra un error en la línea del if. Un solo signo de igual guarda un valor en una variable. ¿Qué usas cuando quieres comprobar si dos cosas son iguales?",
        solution: "Comparar dos valores necesita dos signos de igual:\nif respuesta == \"Tierra\":",
      },
      extensionChallenge:
        "Conviértelo en un cuestionario de personalidad: haz una pregunta de \"qué prefieres\" e imprime un resultado distinto para cada opción usando if, elif y else.",
      reflectionQuestion:
        "Tu programa ahora reacciona distinto a respuestas distintas. En tu juego final, ¿cuál es una decisión que el programa tendrá que tomar, y qué debería pasar en cada caso?",
      teacherNotes:
        "Dos puntos de atención: la sangría (las líneas debajo de un if deben ir con sangría) y = frente a == (guardar frente a comparar). La comparación de cadenas es exacta y distingue mayúsculas, que es justo lo que la línea elif viene a resaltar. Deja que los estudiantes se topen solos con el error de = / ==: el mensaje apunta directo a él.",
    },
    {
      facilitation: {
        goal: "Los estudiantes usan un bucle while para repetir acciones y darle al jugador más de un intento.",
        materials: [
          "Computadoras con navegador y la página de la lección de la Semana 5",
          "Opcional: papel para el juego de adivinar mayor/menor sin computadora",
        ],
        explain: [
          "Un bucle repite código para que no tengas que volver a escribirlo.",
          "Un bucle while sigue mientras su condición se mantenga verdadera.",
          "Algo dentro del bucle debe hacer que la condición se vuelva falsa en algún momento, o se ejecuta para siempre.",
          "int() convierte el texto escrito en un número para poder compararlo.",
        ],
        commonMistakes: [
          "Escribir un bucle cuya condición nunca se vuelve falsa (un bucle infinito).",
          "Olvidar int(), así que un \"7\" escrito nunca es igual al número 7 y el bucle nunca termina.",
          "Olvidar los dos puntos al final de la línea while.",
        ],
        questionsToAsk: [
          "¿Qué tiene que pasar para que este bucle se detenga?",
          "¿Qué cambia en cada vuelta del bucle?",
          "¿Por qué este bucle podría ejecutarse para siempre, y cómo lo arreglaríamos?",
        ],
        offlineActivity:
          "Jueguen a adivinar en papel: un estudiante piensa un número del 1 al 10 mientras otro adivina y recibe \"más alto\" o \"más bajo\". Contar los intentos representa el bucle y la comparación.",
      },
      title: "Bucles",
      description:
        "En lugar de copiar una línea una y otra vez, los estudiantes hacen que el programa se repita. Usando un bucle while, construyen un juego de Adivina el Número que sigue preguntando hasta que el jugador gana, dando pistas de demasiado alto y demasiado bajo en el camino. Por ahora el secreto es fijo; en la Semana 7 se vuelve aleatorio.",
      learningGoals: [
        "Usar un bucle while para repetir líneas hasta que algo cambie.",
        "Darle al jugador tantos intentos como necesite con un bucle.",
        "Combinar un bucle con un if para reaccionar a cada intento.",
        "Encontrar y arreglar un bucle que nunca se detiene.",
      ],
      vocabulary: [
        { term: "bucle", definition: "Código que se repite en lugar de ejecutarse una sola vez." },
        { term: "while", definition: "Repite las líneas de abajo mientras su condición se mantenga verdadera." },
        { term: "int()", definition: "Convierte texto escrito como \"7\" en el número 7 para que puedas compararlo." },
        { term: "bucle infinito", definition: "Un bucle que nunca se detiene porque su condición nunca se vuelve falsa." },
      ],
      estimatedTime: "60 minutos",
      mainConcept:
        "Un bucle repite código para que no tengas que escribirlo cien veces. Un bucle while sigue mientras su condición sea verdadera: perfecto para un juego que debe seguir preguntando hasta que el jugador gane. Algo dentro del bucle tiene que volver falsa la condición en algún momento, o se ejecuta para siempre. Como input() devuelve texto, usamos int() para convertir el intento en un número que podamos comparar.",
      projectName: "Juego de adivinar el número",
      starterCode:
        "# Adivina el número\n# Por ahora el secreto es 7. En la Semana 7 lo harás aleatorio.\n\nsecreto = 7\nintento = 0\n\nwhile intento != secreto:\n    intento = int(input(\"Adivina un número del 1 al 10: \"))\n    if intento < secreto:\n        print(\"Muy bajo.\")\n    elif intento > secreto:\n        print(\"Muy alto.\")\n\nprint(\"¡Lo lograste!\")",
      expectedOutput:
        "Adivina un número del 1 al 10: 4\nMuy bajo.\nAdivina un número del 1 al 10: 9\nMuy alto.\nAdivina un número del 1 al 10: 7\n¡Lo lograste!",
      miniChallenge:
        "Agrega un contador de intentos: empieza con intentos = 0, súmale 1 dentro del bucle, y después del bucle imprime cuántos intentos tomó.",
      debuggingChallenge: {
        brokenCode:
          "secreto = 7\nintento = 0\nwhile intento != secreto:\n    intento = input(\"Adivina un número del 1 al 10: \")",
        prompt:
          "Este juego nunca termina, ni siquiera cuando el jugador escribe 7. El secreto es el número 7, pero input() devuelve el texto \"7\". ¿Por qué no son iguales, y qué convierte texto en número?",
        solution: "Convierte el texto escrito en número con int():\nintento = int(input(\"Adivina un número del 1 al 10: \"))",
      },
      extensionChallenge:
        "Cambia el rango a 1 a 100 y dale al jugador solo 7 intentos. Detén el bucle e imprime ¡Se acabaron los intentos! si se le agotan.",
      reflectionQuestion:
        "Un bucle te dejó preguntar una y otra vez sin repetirte. ¿Qué parte de tu juego final podría necesitar repetirse: los turnos, las preguntas, las rondas?",
      teacherNotes:
        "El momento clave es el bucle infinito: algo dentro del bucle debe cambiar la variable que revisa la condición, o nunca termina. Presenta int() solo hasta donde haga falta para comparar números. Deja el secreto fijo esta semana para que los estudiantes puedan predecir y comprobar el comportamiento; el azar llega en la Semana 7.",
    },
    {
      facilitation: {
        goal: "Los estudiantes definen y llaman funciones para reutilizar código y mantener los programas organizados.",
        materials: [
          "Computadoras con navegador y la página de la lección de la Semana 6",
          "Opcional: una tarjeta de receta impresa para representar una función reutilizable",
        ],
        explain: [
          "Una función es una receta reutilizable: la defines una vez y luego la llamas cuando la necesites.",
          "def crea una función; escribir su nombre con paréntesis la llama.",
          "Un parámetro es una entrada que la función acepta, escrita dentro de sus paréntesis.",
          "Definir una función no la ejecuta; llamarla sí.",
        ],
        commonMistakes: [
          "Definir una función pero nunca llamarla.",
          "Llamar una función sin el argumento que requiere.",
          "Olvidar los dos puntos después de la línea def, o no poner sangría en el cuerpo de la función.",
        ],
        questionsToAsk: [
          "¿Qué hace esta función y qué necesita para hacer su trabajo?",
          "¿Dónde se define la función y dónde se llama?",
          "¿Cómo se vería este programa si no pudiéramos usar funciones?",
        ],
        offlineActivity:
          "Escriban una receta sencilla (por ejemplo, doblar un avión de papel) como pasos con nombre, y luego \"llámenla\" dos veces con entradas distintas, como papeles de colores diferentes. Muestra el define-una-vez, reutiliza-muchas.",
      },
      title: "Funciones",
      description:
        "Conforme los programas crecen, los estudiantes empaquetan código en funciones que pueden nombrar y reutilizar. Construyen pequeñas funciones de ayuda (saludar al jugador, mostrar el puntaje) y las llaman cuando hacen falta, que es exactamente cómo el juego final se mantendrá organizado.",
      learningGoals: [
        "Definir una función con def y ejecutarla llamando su nombre.",
        "Pasar información a una función usando un parámetro.",
        "Explicar por qué las funciones te evitan repetir código.",
        "Arreglar una llamada a función a la que le falta su argumento.",
      ],
      vocabulary: [
        { term: "función", definition: "Un bloque de código con nombre que puedes ejecutar una y otra vez llamando su nombre." },
        { term: "def", definition: "La palabra clave que crea una nueva función." },
        { term: "parámetro", definition: "Una entrada que una función recibe, escrita dentro de sus paréntesis." },
        { term: "llamar", definition: "Ejecutar una función escribiendo su nombre con paréntesis, como saludar(\"Alex\")." },
      ],
      estimatedTime: "60 minutos",
      mainConcept:
        "Una función es una receta reutilizable. Escribes los pasos una sola vez después de def y le das un nombre; a partir de ahí, ejecutas todos esos pasos solo con llamar el nombre. Un parámetro te deja darle a la función información distinta cada vez, así que una sola función saludar puede darle la bienvenida a cualquier jugador. Escribir una función no la ejecuta; llamarla sí.",
      projectName: "Funciones de ayuda para un juego",
      starterCode:
        "# Funciones de ayuda para un juego\n# Escribe cada ayudante una vez y luego reutilízalo.\n\ndef saludar(jugador):\n    print(f\"¡Bienvenido, {jugador}!\")\n\ndef mostrar_puntaje(puntos):\n    print(f\"Puntaje: {puntos}\")\n\nsaludar(\"Alex\")\nmostrar_puntaje(0)\nmostrar_puntaje(10)",
      expectedOutput: "¡Bienvenido, Alex!\nPuntaje: 0\nPuntaje: 10",
      miniChallenge:
        "Escribe una nueva función llamada fin_del_juego() que imprima ¡Gracias por jugar! y llámala al final del programa.",
      debuggingChallenge: {
        brokenCode: "def saludar(jugador):\n    print(f\"¡Bienvenido, {jugador}!\")\n\nsaludar()",
        prompt:
          "Esto se detiene con un error sobre un argumento faltante. La función saludar pide un jugador dentro de sus paréntesis. Mira la última línea: ¿qué se le olvidó darle a la llamada?",
        solution: "Dale un valor a la función cuando la llames:\nsaludar(\"Alex\")",
      },
      extensionChallenge:
        "Escribe una función siguiente_nivel(nivel) que imprima una línea como ¡Llegaste al nivel 5! usando el número que le pases, y luego llámala con varios niveles distintos.",
      reflectionQuestion:
        "Escribiste mostrar_puntaje una vez y la usaste dos veces. En tu juego final, ¿qué es algo que harás más de una vez y que podría volverse una función?",
      teacherNotes:
        "Separa dos ideas con claridad: definir una función no la ejecuta; llamarla sí. El error frecuente es definir una función con un parámetro y luego llamarla con paréntesis vacíos. Mantén cada función corta y con un solo trabajo para que la ganancia (la reutilización) sea evidente.",
    },
    {
      facilitation: {
        goal: "Los estudiantes guardan muchos valores en una lista y usan random.choice() para hacer los programas impredecibles.",
        materials: [
          "Computadoras con navegador y la página de la lección de la Semana 7",
          "Opcional: una bolsa o tazón con papelitos para sacar al azar",
        ],
        explain: [
          "Una lista guarda muchos valores en una sola variable, escritos entre corchetes.",
          "import random trae la caja de herramientas de azar.",
          "random.choice() elige al azar un elemento de una lista, así que cada ejecución puede ser distinta.",
        ],
        commonMistakes: [
          "Olvidar import random arriba (\"random no está definido\").",
          "Faltar comas o corchetes al escribir una lista.",
          "Esperar la misma salida en cada ejecución y pensar que el azar es un error.",
        ],
        questionsToAsk: [
          "¿Cuántos resultados distintos podría producir este programa?",
          "¿Qué hace que cada ejecución sea diferente?",
          "¿Qué podríamos agregar a la lista para cambiar el juego?",
        ],
        offlineActivity:
          "Pongan varios papelitos con resultados en una bolsa y pidan a los estudiantes que saquen uno para armar una historia al azar en voz alta. Representa una lista más una elección aleatoria.",
      },
      title: "Listas y azar",
      description:
        "Los programas se vuelven impredecibles. Los estudiantes guardan varios valores en una lista y usan random.choice() para elegir uno al azar, así que el programa hace algo distinto en cada ejecución. Construyen un juego corto de aventura cuyo camino y premio cambian cada vez, y conocen import por primera vez, porque ahora sí lo necesitan.",
      learningGoals: [
        "Crear una lista y leer elementos de ella.",
        "Usar random.choice() para elegir un elemento al azar de una lista.",
        "Explicar por qué import random tiene que ir primero.",
        "Arreglar un programa que usa random sin importarlo.",
      ],
      vocabulary: [
        { term: "lista", definition: "Una colección ordenada de valores dentro de corchetes, como [\"a\", \"b\", \"c\"]." },
        { term: "elemento", definition: "Un valor guardado en una lista." },
        { term: "import", definition: "Trae herramientas extra que Python no carga por defecto, como el módulo random." },
        { term: "random.choice()", definition: "Elige al azar un elemento de una lista." },
      ],
      estimatedTime: "60 minutos",
      mainConcept:
        "Una lista guarda muchos valores en una sola variable, escritos entre corchetes. random.choice() mete la mano en una lista y saca un elemento al azar, así que el programa puede sorprender al jugador. Para usar random primero lo traes con import random arriba: la primera vez que necesitas una herramienta que no viene incorporada. Las listas más el azar son lo que hace que un juego se sienta distinto cada vez que lo juegas.",
      projectName: "Juego de aventura aleatorio",
      starterCode:
        "# Juego de aventura aleatorio\n# Cada ejecución elige un camino y un premio al azar.\n\nimport random\n\ncaminos = [\"un bosque oscuro\", \"una cueva silenciosa\", \"un puente colgante\"]\npremios = [\"una moneda de oro\", \"un mapa viejo\", \"una llave oxidada\"]\n\ncamino = random.choice(caminos)\npremio = random.choice(premios)\n\nprint(f\"Te metes por {camino}.\")\nprint(f\"Al final, encuentras {premio}.\")",
      expectedOutput: "Te metes por una cueva silenciosa.\nAl final, encuentras un mapa viejo.",
      miniChallenge:
        "Agrega una tercera lista de personajes que el jugador se encuentra en el camino, elige uno al azar e imprime una línea sobre él.",
      debuggingChallenge: {
        brokenCode:
          "caminos = [\"un bosque oscuro\", \"una cueva silenciosa\"]\ncamino = random.choice(caminos)\nprint(camino)",
        prompt:
          "Python dice que random no está definido. Este programa usa random.choice(), pero random es una herramienta que hay que traer primero. ¿Qué única línea va hasta arriba?",
        solution: "Trae la herramienta random hasta arriba:\nimport random",
      },
      extensionChallenge:
        "Pregunta el nombre del jugador con input() al inicio y luego úsalo en la historia aleatoria para que la aventura se sienta suya.",
      reflectionQuestion:
        "Dos jugadores ejecutan esto y obtienen historias distintas. ¿Por qué eso hace que un juego sea más divertido de jugar más de una vez?",
      teacherNotes:
        "Como la salida es aleatoria, la salida esperada es solo un ejemplo: las ejecuciones van a variar, y ese es justo el punto. Refuerza que import va hasta arriba. Las listas se indexan desde 0, pero random.choice() hace que los estudiantes todavía no necesiten índices; mantén el foco en elegir de una lista.",
    },
    {
      facilitation: {
        goal: "Los estudiantes planean y construyen su propio minijuego, combinando todo lo del programa.",
        materials: [
          "Computadoras con navegador y la página de la lección de la Semana 8",
          "Papel para planear el juego antes de programar",
        ],
        explain: [
          "Los programas reales combinan muchas ideas pequeñas que se aprendieron por separado.",
          "Empieza con un plan corto por escrito, luego agrega una función a la vez y prueba sobre la marcha.",
          "Un juego pequeño que funciona le gana a uno ambicioso que no se ejecuta.",
        ],
        commonMistakes: [
          "Intentar escribir todo el juego de golpe en lugar de en pasos pequeños y probados.",
          "Volver a meter errores anteriores (dos puntos faltantes, = frente a ==, olvidar int()).",
          "Saltarse el plan y quedarse atorado.",
        ],
        questionsToAsk: [
          "¿Cuál es la versión más pequeña de tu juego que podría ejecutarse?",
          "¿Qué idea de qué semana vas a usar aquí?",
          "Te salió un error: ¿qué te dice el mensaje?",
        ],
        offlineActivity:
          "Pide a los estudiantes que diseñen su juego primero en papel: la meta, qué escribe el jugador y qué responde el programa. Quien no tenga computadora igual puede completar y presentar el diseño.",
      },
      title: "Constructor del juego final",
      description:
        "El proyecto final. Los estudiantes planean y construyen su propio juego pequeño en Python, combinando todo: variables para llevar el puntaje, input para los movimientos del jugador, condicionales para decidir qué pasa, un bucle para seguir jugando, funciones para mantener el orden y una lista con random para que no se vuelva repetitivo. Parten de un esqueleto que funciona y lo hacen suyo.",
      learningGoals: [
        "Planear un juego pequeño en papel antes de escribir código.",
        "Combinar variables, entrada, condicionales, bucles, funciones y azar en un solo programa.",
        "Probar el juego, encontrar errores y arreglarlos sobre la marcha.",
        "Convertir el esqueleto en un juego que sea suyo.",
      ],
      vocabulary: [
        { term: "plan", definition: "Un esquema corto de lo que un programa debe hacer, escrito antes de programarlo." },
        { term: "esqueleto", definition: "Un programa pequeño que funciona y desde el cual empiezas a construir." },
        { term: "probar", definition: "Ejecutar tu programa con distintas entradas para ver si funciona." },
        { term: "error", definition: "Una falla en el código que hace que el programa haga algo equivocado." },
      ],
      estimatedTime: "60 minutos (o dos sesiones)",
      mainConcept:
        "Los programas reales se construyen a partir de piezas pequeñas que ya conoces, agregadas una a la vez. Empieza con un plan y un esqueleto que se ejecute, luego agrega una función, pruébala y solo entonces agrega la siguiente. Un juego pequeño que funciona es una victoria real, más que uno grande que nunca se ejecuta.",
      projectName: "Construye tu propio minijuego en Python",
      starterCode:
        "# Construye tu propio minijuego\n# Un esqueleto que funciona. Léelo, ejecútalo y luego hazlo tuyo.\n\nimport random\n\ndef bienvenida(jugador):\n    print(f\"¡Bienvenido, {jugador}! Adivina mi número secreto para ganar.\")\n\njugador = input(\"¿Cómo te llamas? \")\nbienvenida(jugador)\n\nsecreto = random.choice([1, 2, 3, 4, 5])\nintentos = 0\nintento = 0\n\nwhile intento != secreto:\n    intento = int(input(\"Elige un número del 1 al 5: \"))\n    intentos = intentos + 1\n    if intento != secreto:\n        print(\"No, inténtalo otra vez.\")\n\nprint(f\"¡Lo lograste en {intentos} intentos, {jugador}!\")",
      expectedOutput:
        "¿Cómo te llamas? Alex\n¡Bienvenido, Alex! Adivina mi número secreto para ganar.\nElige un número del 1 al 5: 2\nNo, inténtalo otra vez.\nElige un número del 1 al 5: 4\nNo, inténtalo otra vez.\nElige un número del 1 al 5: 5\n¡Lo lograste en 3 intentos, Alex!",
      miniChallenge:
        "Dale una pista al jugador: dentro del bucle, imprime Muy bajo o Muy alto después de cada intento fallido, como hiciste en la Semana 5.",
      debuggingChallenge: {
        brokenCode:
          "secreto = random.choice([1, 2, 3])\nintento = 0\nwhile intento != secreto\n    intento = int(input(\"Elige un número: \"))",
        prompt:
          "Python señala la línea del while con un error de sintaxis. Toda línea que abre un bloque (if, while, def) termina con el mismo símbolo pequeño. Mira el final de esa línea.",
        solution: "Las líneas que abren un bloque terminan con dos puntos:\nwhile intento != secreto:",
      },
      extensionChallenge:
        "Rediseña el esqueleto para hacer tu propio juego: una ronda de trivia, una historia con opciones o una carrera por el mejor puntaje. Usa al menos una lista, una función y un bucle.",
      reflectionQuestion:
        "Construiste un juego con las ocho ideas de este programa. ¿En qué idea de qué semana te apoyaste más, y por qué?",
      teacherNotes:
        "Anímalos a hacer un plan en papel primero: la meta, qué escribe el jugador y qué responde el programa. Como el juego usa azar, trata la salida esperada como un ejemplo. Celebra los juegos pequeños que funcionan por encima de los ambiciosos que no. Una sesión corta donde los estudiantes jueguen los juegos de los demás es un cierre potente.",
    },
  ],
}

const zh: DeepPartial<Curriculum> = {
  title: "Python 编程入门",
  subtitle: "为期 8 周的编程入门课程",
  description:
    "为期 8 周的编程入门课程，学生通过制作小游戏、互动程序和调试挑战来学习 Python。",
  gradeRange: "3 至 6 年级",
  estimatedTimePerWeek: "50-60 分钟",
  requirement: "在浏览器里运行，无需安装",
  summary:
    "没有任何基础的学生也能一次学一个概念，学会读写真正的 Python。每周只引入一个概念，并以一个学生能运行、能拿出来展示的小项目收尾。到最后一周，学生会把学过的一切结合起来，设计并做出自己的小游戏。",
  format: [
    "每周一个概念，按顺序讲授，让每一周都建立在上一周之上。",
    "每一课都以一个学生自己写、自己运行的项目结束。",
    "简短的小挑战、调试挑战和拓展挑战，让学生按自己的节奏练习。",
    "所有代码都在浏览器的 Python 练习区运行，无需安装任何东西。",
  ],
  outcomes: [
    "计算机如何按指令执行",
    "变量如何保存信息",
    "程序如何做出判断",
    "循环如何重复动作",
    "函数如何组织代码",
    "列表和随机如何让程序更有意思",
    "如何找出并修正代码里的错误",
    "如何设计并完成一个小型结课项目",
  ],
  lessonFlow: [
    { title: "学习这个概念", description: "读一段简短、通俗的说明，只讲本周唯一的新概念。" },
    { title: "试一试起始代码", description: "在浏览器里运行可用的起始代码，并改动它看看会怎样。" },
    { title: "修好一个出错的例子", description: "像真正的程序员那样，在一段坏掉的代码里找出并修好一个小错误。" },
    { title: "做一个小项目", description: "用新学的概念，写出并运行一个属于你自己的小程序。" },
    { title: "回顾有什么变化", description: "回答一个简短的问题，把代码和你自己的思考联系起来。" },
  ],
  facilitator: {
    audience:
      "这套课程是写给带课的大人看的：开编程社团的图书馆工作人员、增加拓展单元的老师、工作坊志愿者，或者带着一个孩子学习的家长。不需要编程背景——每一课都会告诉你该说什么、该留意什么。",
    studentNeeds: [
      "一台带现代浏览器（Chrome、Edge、Safari 或 Firefox）的电脑、笔记本或 Chromebook。",
      "能上网，以便打开课程页面并加载浏览器里的 Python 练习区。",
      "可选：用来规划代码的纸，以及单独学习时用的耳机。",
    ],
    runningTheLesson: [
      "打开本周的课程页面，全班一起读「这个概念」和词汇表。",
      "在共享屏幕上演示一次起始代码，并运行它，让所有人都看到输出。",
      "留时间让学生自己运行起始代码，并试着做小挑战。",
      "学生做题时在教室里走动，用建议的问题检查他们是否真的理解。",
      "以调试挑战和反思问题作为全班讨论收尾。",
      "预留 50 到 60 分钟。如果时间紧张，小挑战或反思可以带回家做。",
    ],
    supportingBeginners: [
      "让学生放心：报错是编程中很正常的一部分，并不代表失败。",
      "鼓励他们动手打字修改，而不是复制粘贴，这样语法才记得住。",
      "让第一次写代码的学生和同伴配对，或安排在你方便随时查看的位置。",
      "用大白话把代码读出来（「print 会把这段文字显示在屏幕上」），帮助建立词汇。",
      "让提前完成的学生去做拓展挑战，而不是干等全班。",
    ],
  },
  weeks: [
    {
      facilitation: {
        goal: "学生理解代码是一组有顺序的指令，并用 print() 写出自己的第一个程序。",
        materials: [
          "带浏览器的电脑或平板",
          "打开到练习区的第 1 周课程页面",
          "可选：一块白板，用来一起写 print() 的例句",
        ],
        explain: [
          "程序是一串指令，计算机会按顺序从上往下执行。",
          "print() 会把引号里的内容原封不动地显示在屏幕上。",
          "每个 print() 都需要括号，文字则需要用引号包起来。",
        ],
        commonMistakes: [
          "文字忘了加引号，比如写成 print(你好) 而不是 print(\"你好\")。",
          "括号漏写或没有配对。",
          "指望计算机猜出你的意思——它只会原样打印你输入的内容。",
        ],
        questionsToAsk: [
          "在运行之前，你觉得这行会打印出什么？",
          "如果把两行 print 的顺序调换会怎样？",
          "计算机为什么在这一行报错？",
        ],
        offlineActivity:
          "玩「机器人指令」：一个学生用口头的分步命令指挥另一个学生画出一个简单图形。步骤缺失或顺序错乱，就能看出计算机执行指令有多死板。",
      },
      title: "什么是 Python？",
      description:
        "第一课。学生会弄明白代码究竟是什么：计算机按顺序执行的精确指令。他们会用 print() 写出并运行自己的 Python 程序，把文字显示到屏幕上，也会看到一条指令写错时会发生什么。",
      learningGoals: [
        "用自己的话说出程序是什么。",
        "写出并运行一个用 print() 显示文字的程序。",
        "解释计算机为什么按从上到下的顺序执行各行。",
        "读懂一条简短的报错信息，并补上漏掉的引号。",
      ],
      vocabulary: [
        { term: "程序", definition: "计算机一行一行照着执行的一组精确指令。" },
        { term: "print()", definition: "一个 Python 命令，会把你放在引号里的文字显示到屏幕上。" },
        { term: "字符串", definition: "引号里的一段文字，比如 \"你好\"。" },
        { term: "输出", definition: "程序运行时显示在屏幕上的内容。" },
        { term: "报错", definition: "当某一行写成 Python 无法执行的样子时，它显示的信息。" },
      ],
      estimatedTime: "50-60 分钟",
      mainConcept:
        "代码就是一串指令，计算机会按顺序执行，不会自己去猜。print() 是你要学的第一条指令：它会原样显示引号之间的文字。改掉引号里的词，屏幕上的内容也跟着改。",
      projectName: "电子自我介绍卡",
      starterCode:
        "# 电子自我介绍卡\n# 改掉引号里的词，让这张卡片变成关于你的。\n\nprint(\"你好，我是 Alex。\")\nprint(\"我今年 10 岁。\")\nprint(\"我最近玩的是足球。\")",
      expectedOutput: "你好，我是 Alex。\n我今年 10 岁。\n我最近玩的是足球。",
      miniChallenge: "给你的卡片再加两行：一行写你喜欢的游戏或爱好，一行写你今年想做出来的东西。",
      debuggingChallenge: {
        brokenCode: "print(你好)",
        prompt:
          "这一行本该打印出「你好」，结果却让程序报错停下。看看「你好」两边缺了什么。Python 里每一段文字都需要它。",
        solution: "给文字加上引号：\nprint(\"你好\")",
      },
      extensionChallenge:
        "写一个括号里什么都不放的 print()，给卡片加一个空行。用它把卡片分成整齐的两部分。",
      reflectionQuestion:
        "计算机完全按你写的顺序执行了这些行。在这门课最后你要做的游戏里，顺序同样重要。如果一个游戏在玩家还没出手之前就打印「你赢了！」，会出什么问题？",
      teacherNotes:
        "核心观点是：计算机很死板——它只会按顺序原样打印引号里的东西，多一点都不会。你最常见到的两个错误是漏引号和漏括号。把它们当成学生找到并修好的第一批 bug，而不是失败。让学生把自己的输出读出来，检查它说的是不是自己想说的。",
    },
    {
      facilitation: {
        goal: "学生把信息存进变量，并用它们配合 print() 拼出句子。",
        materials: [
          "带浏览器的电脑和第 2 周课程页面",
          "可选：贴了标签的信封或便利贴，用来把变量比作盒子",
        ],
        explain: [
          "变量就是一个贴了标签的盒子，里面存着可以反复使用的值。",
          "文字值（字符串）要加引号；数字值不用。",
          "f-string 可以用花括号把变量塞进句子里。",
        ],
        commonMistakes: [
          "在 f-string 里给变量名加引号，结果打印出的是名字而不是它的值。",
          "给本该是数字的值加了引号。",
          "变量命名不统一，出现空格或多余的大写字母。",
        ],
        questionsToAsk: [
          "这个变量现在存的是什么？",
          "这些值里哪些是文字，哪些是数字？",
          "要描述另一个人，我们怎样才能不用把每一行都重写一遍？",
        ],
        offlineActivity:
          "发下贴了标签的信封（姓名、年龄、最喜欢的动物），让学生往每个信封里放一张纸条。把信封读出来，就演示了变量如何保存并重复使用一个值。",
      },
      title: "变量与数据类型",
      description:
        "学生给程序装上记忆。他们把词语和数字存进变量，再用它们拼出句子，于是改一行就能改变整个程序。这是通向一个能叫出玩家名字、能记分的游戏的第一步。",
      learningGoals: [
        "用 = 创建一个变量并把值存进去。",
        "分清文字（字符串）和数字。",
        "用 f-string 把变量放进打印出来的句子里。",
        "找出并修好一个用错了的变量。",
      ],
      vocabulary: [
        { term: "变量", definition: "一个有名字的盒子，用来保存值，方便以后再用。" },
        { term: "赋值", definition: "用 = 号把一个值放进变量里。" },
        { term: "整数", definition: "没有小数点的整数，比如 10。" },
        { term: "f-string", definition: "以 f 开头的句子，{ } 里的内容会用变量的值填进去。" },
      ],
      estimatedTime: "50-60 分钟",
      mainConcept:
        "变量就是贴了标签的盒子：你把一个值放进去一次，之后想用这个值的地方写它的名字就行。文字要加引号（字符串），数字不用。有了 f-string，你可以把变量直接塞进句子里，于是程序可以叫出玩家的名字，而不是每次都说同一句话。",
      projectName: "自我介绍生成器",
      starterCode:
        "# 自我介绍生成器\n# 填上你自己的信息，然后运行，看看你的玩家档案。\n\nname = \"Alex\"\nage = 10\nfavorite_game = \"足球\"\n\nprint(f\"玩家：{name}\")\nprint(f\"年龄：{age}\")\nprint(f\"最喜欢的游戏：{favorite_game}\")",
      expectedOutput: "玩家：Alex\n年龄：10\n最喜欢的游戏：足球",
      miniChallenge:
        "加一个叫 score 的变量并设为 0，然后打印一行，比如 得分：0。在最后的游戏里，你就会这样记分。",
      debuggingChallenge: {
        brokenCode: "name = \"Alex\"\nprint(f\"我的名字是 name。\")",
        prompt:
          "这段本该打印「我的名字是 Alex」，结果却打印出 name 这个词。变量的值没有被填进去。在 f-string 里，name 两边得加上什么？",
        solution: "给变量加上花括号，Python 才会填入它的值：\nprint(f\"我的名字是 {name}。\")",
      },
      extensionChallenge:
        "再加一个数字变量 high_score，并打印一句同时用到 name 和 high_score 的话，比如：Alex 的最好成绩是 25。",
      reflectionQuestion:
        "你只改了一个变量，程序说的话就变了。这为什么比在每一行里一遍遍打玩家的名字更好？",
      teacherNotes:
        "强化两条规则：字符串要加引号，数字不加；在 f-string 里，变量必须加花括号才有效。经典的 bug 就是给变量名加引号，结果被原样打印出来，值得让学生自己发现。变量名保持小写且见名知意（用 score，不要用 x）。",
    },
    {
      facilitation: {
        goal: "学生用 input() 收集回答并作出回应，把程序变成一场双向对话。",
        materials: [
          "带浏览器的电脑和第 3 周课程页面",
          "可选：一份印好的脚本，用于不上机的聊天机器人角色扮演",
        ],
        explain: [
          "input() 会提出一个问题，并暂停，直到用户输入答案并按下回车。",
          "答案可以存进变量，在程序后面继续使用。",
          "input() 拿回来的永远是文字。",
        ],
        commonMistakes: [
          "忘了给 input() 里的提示文字加引号。",
          "以为用户还没按回车，程序就会继续往下跑。",
          "还没把答案转成数字就想拿它做运算（那是下周的内容）。",
        ],
        questionsToAsk: [
          "程序在哪里停下来等用户？",
          "这和上周那个只会打印的程序有什么不同？",
          "程序应该用这个答案回应些什么？",
        ],
        offlineActivity:
          "做一次聊天机器人角色扮演：一个学生扮演程序，只能用一份印好的脚本加上用户给出的答案来回应。这展示了输入如何驱动回应。",
      },
      title: "输入与互动",
      description:
        "程序开始学会倾听。学生用 input() 向玩家提问、等待回答，并把这个回答用在程序的回应里。到最后，他们会做出一个短小的聊天机器人，能对你输入的内容作出回应。",
      learningGoals: [
        "用 input() 从运行程序的人那里获取答案。",
        "把答案存进变量，稍后再使用。",
        "解释程序会在 input() 处暂停，直到用户输入内容。",
        "修好一行漏了引号的 input()。",
      ],
      vocabulary: [
        { term: "input()", definition: "一个 Python 命令，会提出问题并等待用户输入答案。" },
        { term: "提示语", definition: "input() 显示出来、告诉用户该输入什么的那句话。" },
        { term: "用户", definition: "使用这个程序的人——在游戏里就是玩家。" },
      ],
      estimatedTime: "50-60 分钟",
      mainConcept:
        "input() 是程序倾听的方式。它显示一句提示，然后停下来，等玩家输入并按回车。玩家的回答被存进变量，程序就能在接下来的动作里用上它——名字、猜测、选择。记住一点：input() 拿回来的永远是文字。",
      projectName: "迷你聊天机器人",
      starterCode:
        "# 迷你聊天机器人\n# 程序先提问，再用你的回答来回应。\n\nname = input(\"我该怎么称呼你？ \")\nprint(f\"很高兴认识你，{name}。\")\n\ngame = input(\"你最近在玩什么游戏？ \")\nprint(f\"{game}？眼光不错。我们很快也会做一个自己的。\")",
      expectedOutput:
        "我该怎么称呼你？ Alex\n很高兴认识你，Alex。\n你最近在玩什么游戏？ 足球\n足球？眼光不错。我们很快也会做一个自己的。",
      miniChallenge: "再加一个问题——也许是最喜欢的颜色或动物——并在程序的回应里用上这个答案。",
      debuggingChallenge: {
        brokenCode: "name = input(我该怎么称呼你？ )",
        prompt:
          "运行这段代码，问题还没显示出来就报错了。input() 里的那句话是给用户看的文字。所有文字两边都需要什么？",
        solution: "提示语是文字，所以需要加引号：\nname = input(\"我该怎么称呼你？ \")",
      },
      extensionChallenge:
        "先问玩家的名字和最喜欢的游戏，然后打印一句同时用到两者的话，比如：Alex 准备好玩足球了！",
      reflectionQuestion:
        "上周你的程序总是说同一句话。现在它会回答你了。在游戏一开始，你可以问玩家什么，才能让游戏感觉是为他而做的？",
      teacherNotes:
        "input() 永远返回文字，哪怕用户输入的是数字——这一点在第 5 周比较数字、用到 int() 时会变得很重要。留意提示语两边漏掉的引号。在编程区里，提示语和用户输入都会出现在输出面板里，所以「预期输出」展示的是一段示例对话。",
    },
    {
      facilitation: {
        goal: "学生用 if、elif 和 else，让程序根据答案做出不同的反应。",
        materials: [
          "带浏览器的电脑和第 4 周课程页面",
          "可选：白板或地面空间，用来画出或走一遍决策树",
        ],
        explain: [
          "条件就是一个非真即假的问题。",
          "缩进在 if 下面的代码，只有条件为真时才会执行。",
          "elif 和 else 处理其他情况。",
          "比较两个值要用两个等号（==）；一个等号（=）是赋值。",
        ],
        commonMistakes: [
          "比较两个值时用了 = 而不是 ==。",
          "忘了给 if、elif 或 else 下面的代码加缩进。",
          "忘了文字比较区分大小写（\"Earth\" 不等于 \"earth\"）。",
        ],
        questionsToAsk: [
          "我们在这里检查的是什么条件？",
          "如果答案是这个，会走哪一条分支？",
          "程序为什么选了那个回应？",
        ],
        offlineActivity:
          "用胶带或指示牌在地上摆一棵决策树：学生回答一个「是/否」问题，然后走到对应的分支上。这让 if/elif/else 变得看得见。",
      },
      title: "条件判断",
      description:
        "程序开始做选择。学生用 if、elif 和 else，让程序根据玩家的答案做不同的事。他们会做一个简短的问答游戏，检查答案并对每一种作出回应——这正是任何有输赢的游戏的核心。",
      learningGoals: [
        "写一个只有条件为真时才执行的 if 语句。",
        "加上 elif 和 else 来处理其他答案。",
        "用 == 把玩家的答案和预期值作比较。",
        "修好 = 和 == 这个常见的混淆。",
      ],
      vocabulary: [
        { term: "条件", definition: "一个答案非真即假的问题，比如 answer == \"Earth\"。" },
        { term: "if", definition: "只有条件为真时，才执行它下面缩进的那些行。" },
        { term: "elif", definition: "当上面的条件都为假时，再检查另一个条件。" },
        { term: "else", definition: "当上面所有条件都不为真时执行。" },
        { term: "==", definition: "检查两个值是否相等（不同于 =，那是赋值）。" },
      ],
      estimatedTime: "55-60 分钟",
      mainConcept:
        "条件判断让程序能够选择。Python 检查一个条件——一个非真即假的东西——只有在条件为真时，才执行它下面缩进的行。有了 if、elif 和 else，程序可以对正确答案给一种反应，对接近的答案给另一种，对错误答案再给一种。游戏就是这样判断你得分、获胜还是失败的。",
      projectName: "知识问答或性格测试",
      starterCode:
        "# 知识问答\n# 提一个问题，然后检查答案。\n\nanswer = input(\"我们住在哪个星球上？ \")\n\nif answer == \"地球\":\n    print(\"答对了！得 1 分。\")\nelif answer == \"地球。\":\n    print(\"思路没错，注意别多打标点。这次算你对。\")\nelse:\n    print(\"不太对。答案是地球。\")",
      expectedOutput: "我们住在哪个星球上？ 地球\n答对了！得 1 分。",
      miniChallenge: "再加第二个问题，配上它自己的 if / else，让你的问答有连着的两道题。",
      debuggingChallenge: {
        brokenCode: "answer = input(\"我们住在哪个星球上？ \")\nif answer = \"地球\":\n    print(\"答对了！\")",
        prompt:
          "Python 在 if 那一行报错。一个等号是把值存进变量。想检查两样东西是否相同，该用什么？",
        solution: "比较两个值需要两个等号：\nif answer == \"地球\":",
      },
      extensionChallenge:
        "把它改成性格测试：提一个「你更愿意选哪个」的问题，用 if、elif 和 else 为每个选项打印不同的结果。",
      reflectionQuestion:
        "你的程序现在会对不同答案做出不同反应。在你的结课游戏里，程序需要做出的一个判断是什么？每种选择又该发生什么？",
      teacherNotes:
        "两个重点：缩进（if 下面的行必须缩进）和 = 与 ==（赋值与比较）。字符串比较是完全精确的，elif 那一行正是为了凸显这一点。让学生自己撞上 = / == 的错误——报错信息会直接指出来。",
    },
    {
      facilitation: {
        goal: "学生用 while 循环重复动作，让玩家有不止一次机会。",
        materials: [
          "带浏览器的电脑和第 5 周课程页面",
          "可选：用来玩「猜大猜小」纸上游戏的纸",
        ],
        explain: [
          "循环会重复执行代码，这样你就不用一遍遍重写。",
          "while 循环只要条件还为真就一直跑下去。",
          "循环里必须有东西最终让条件变为假，否则它会永远跑下去。",
          "int() 把输入的文字变成数字，好拿来比较。",
        ],
        commonMistakes: [
          "写出一个条件永远不会变为假的循环（死循环）。",
          "忘了用 int()，于是输入的 \"7\" 永远不等于数字 7，循环也就停不下来。",
          "忘了在 while 那一行末尾加冒号。",
        ],
        questionsToAsk: [
          "要让这个循环停下来，必须发生什么？",
          "每跑一遍循环，有什么在变化？",
          "这个循环为什么可能永远跑下去？我们该怎么修？",
        ],
        offlineActivity:
          "玩纸上猜数游戏：一个学生心里想一个 1 到 10 的数，另一个来猜，只被告知「大了」或「小了」。数一数猜了几次，就模拟了循环和比较。",
      },
      title: "循环",
      description:
        "学生不再一行行复制，而是让程序自己重复。他们用 while 循环做一个「猜数字」游戏，一直问到玩家猜中为止，中途还会给出太大、太小的提示。这一周答案是固定的；到第 7 周它会变成随机的。",
      learningGoals: [
        "用 while 循环重复执行代码，直到某个东西发生变化。",
        "用循环让玩家想猜多少次就猜多少次。",
        "把循环和 if 结合起来，对每一次猜测作出回应。",
        "找出并修好一个永远停不下来的循环。",
      ],
      vocabulary: [
        { term: "循环", definition: "会重复执行、而不是只跑一次的代码。" },
        { term: "while", definition: "只要条件还为真，就一直重复它下面的那些行。" },
        { term: "int()", definition: "把输入的文字（比如 \"7\"）变成数字 7，好拿来比较。" },
        { term: "死循环", definition: "因为条件永远不会变为假而永远停不下来的循环。" },
      ],
      estimatedTime: "60 分钟",
      mainConcept:
        "循环会重复执行代码，省得你写一百遍。while 循环只要条件为真就一直跑——特别适合那种「一直问到玩家猜中为止」的游戏。循环里必须有东西最终让条件变为假，否则它会永远跑下去。因为 input() 给回来的是文字，我们用 int() 把猜测变成可以比较的数字。",
      projectName: "猜数字游戏",
      starterCode:
        "# 猜数字\n# 这一周答案固定是 7。到第 7 周你会把它改成随机的。\n\nsecret = 7\nguess = 0\n\nwhile guess != secret:\n    guess = int(input(\"猜一个 1 到 10 的数： \"))\n    if guess < secret:\n        print(\"太小了。\")\n    elif guess > secret:\n        print(\"太大了。\")\n\nprint(\"你猜中了！\")",
      expectedOutput:
        "猜一个 1 到 10 的数： 4\n太小了。\n猜一个 1 到 10 的数： 9\n太大了。\n猜一个 1 到 10 的数： 7\n你猜中了！",
      miniChallenge:
        "加一个次数计数器：先写 tries = 0，在循环里给它加 1，循环结束后打印一共猜了几次。",
      debuggingChallenge: {
        brokenCode: "secret = 7\nguess = 0\nwhile guess != secret:\n    guess = input(\"猜一个 1 到 10 的数： \")",
        prompt:
          "这个游戏永远结束不了，哪怕玩家输入了 7。答案是数字 7，但 input() 给回来的是文字 \"7\"。它们为什么不相等？什么能把文字变成数字？",
        solution: "用 int() 把输入的文字变成数字：\nguess = int(input(\"猜一个 1 到 10 的数： \"))",
      },
      extensionChallenge:
        "把范围改成 1 到 100，并且只给玩家 7 次机会。次数用完就跳出循环，并打印「机会用完了！」。",
      reflectionQuestion:
        "循环让你可以一遍遍地问，而不用重复写自己。在你的结课游戏里，哪一部分可能需要重复——回合、问题，还是每一局？",
      teacherNotes:
        "关键的教学时刻是死循环：循环里必须有东西改变条件所检查的那个变量，否则它永远不会结束。int() 只讲到能比较数字为止就够了。这一周保持答案固定，好让学生能预测并核对程序的行为——随机性要到第 7 周才登场。",
    },
    {
      facilitation: {
        goal: "学生定义并调用函数，以复用代码并让程序保持条理。",
        materials: [
          "带浏览器的电脑和第 6 周课程页面",
          "可选：一张印好的食谱卡，用来比喻可复用的函数",
        ],
        explain: [
          "函数是一份可复用的食谱：定义一次，之后需要时随时调用。",
          "def 用来创建函数；写出它的名字加括号就是调用它。",
          "参数是函数接受的输入，写在它的括号里。",
          "定义函数并不会运行它——调用才会。",
        ],
        commonMistakes: [
          "定义了函数却从来不调用。",
          "调用函数时没给它需要的参数。",
          "忘了 def 那行末尾的冒号，或者函数体没有缩进。",
        ],
        questionsToAsk: [
          "这个函数做什么？它需要什么才能完成任务？",
          "函数是在哪里定义的，又是在哪里被调用的？",
          "如果不能用函数，这个程序会变成什么样？",
        ],
        offlineActivity:
          "把一份简单的食谱（比如折纸飞机）写成一串有名字的步骤，然后用不同的输入「调用」它两次，比如换不同颜色的纸。这展示了「定义一次、复用多次」。",
      },
      title: "函数",
      description:
        "随着程序变大，学生把代码打包成可以命名、可以复用的函数。他们会写一些小的辅助函数——问候玩家、显示得分——并在需要时调用，最后的游戏正是靠这一点保持条理的。",
      learningGoals: [
        "用 def 定义一个函数，并通过调用它的名字来运行。",
        "用参数把信息传进函数。",
        "解释函数为什么能让你不必重复写代码。",
        "修好一次漏掉参数的函数调用。",
      ],
      vocabulary: [
        { term: "函数", definition: "一段有名字的代码，调用它的名字就能反复运行。" },
        { term: "def", definition: "用来创建新函数的关键字。" },
        { term: "参数", definition: "函数接受的输入，写在它的括号里。" },
        { term: "调用", definition: "写出函数名并加上括号来运行它，比如 greet(\"Alex\")。" },
      ],
      estimatedTime: "60 分钟",
      mainConcept:
        "函数是一份可复用的食谱。你在 def 后面把步骤写一次并给它取个名字；之后只要调用这个名字，就能跑完所有这些步骤。参数让你每次都能给函数不同的信息，所以一个 greet 函数就能欢迎任何玩家。写出函数并不会运行它，调用才会。",
      projectName: "游戏辅助函数",
      starterCode:
        "# 游戏辅助函数\n# 每个辅助函数只写一次，然后重复使用。\n\ndef greet(player):\n    print(f\"欢迎你，{player}！\")\n\ndef show_score(points):\n    print(f\"得分：{points}\")\n\ngreet(\"Alex\")\nshow_score(0)\nshow_score(10)",
      expectedOutput: "欢迎你，Alex！\n得分：0\n得分：10",
      miniChallenge: "写一个新函数 game_over()，让它打印「谢谢游玩！」，并在程序最后调用它。",
      debuggingChallenge: {
        brokenCode: "def greet(player):\n    print(f\"欢迎你，{player}！\")\n\ngreet()",
        prompt:
          "这段代码报错，说缺少一个参数。greet 函数在括号里要一个 player。看看最后一行——调用时忘了给它什么？",
        solution: "调用函数时把值给它：\ngreet(\"Alex\")",
      },
      extensionChallenge:
        "写一个函数 next_level(level)，让它用你传进去的数字打印一行，比如「你到达第 5 关了！」，然后用几个不同的关卡数分别调用它。",
      reflectionQuestion:
        "你把 show_score 写了一次，却用了两次。在你的结课游戏里，有什么事你会做不止一次、可以变成一个函数？",
      teacherNotes:
        "把两件事分清楚：定义函数不会运行它，调用才会。常见的 bug 是定义了带参数的函数，调用时却写成空括号。让每个函数都短小、只做一件事，这样「复用」这个好处才明显。",
    },
    {
      facilitation: {
        goal: "学生把多个值存进列表，并用 random.choice() 让程序变得不可预测。",
        materials: [
          "带浏览器的电脑和第 7 周课程页面",
          "可选：一个装着纸条的袋子或碗，用来随机抽取",
        ],
        explain: [
          "列表把多个值装在一个变量里，写在方括号中。",
          "import random 把随机工具箱引进来。",
          "random.choice() 从列表里随机挑一个，所以每次运行都可能不同。",
        ],
        commonMistakes: [
          "忘了在最上面写 import random（会提示「random 未定义」）。",
          "写列表时漏了逗号或方括号。",
          "以为每次运行输出都应该一样，把随机当成了 bug。",
        ],
        questionsToAsk: [
          "这个程序总共可能产生多少种结果？",
          "是什么让每次运行都不一样？",
          "我们往列表里加点什么，就能改变这个游戏？",
        ],
        offlineActivity:
          "在袋子里放几张写着结果的纸条，让学生抽一张，然后大声接龙编一个随机故事。这就模拟了一个列表加一次随机选择。",
      },
      title: "列表与随机",
      description:
        "程序开始变得不可预测。学生把几个值存进列表，并用 random.choice() 随机挑出一个，于是程序每次运行都会做点不一样的事。他们会做一个短小的冒险游戏，路线和奖品每次都不同——也第一次遇到 import，因为现在他们真的需要它了。",
      learningGoals: [
        "创建一个列表，并从中读取元素。",
        "用 random.choice() 从列表里随机取一个元素。",
        "解释为什么 import random 必须写在最前面。",
        "修好一个用了 random 却没有导入它的程序。",
      ],
      vocabulary: [
        { term: "列表", definition: "方括号里一组有顺序的值，比如 [\"a\", \"b\", \"c\"]。" },
        { term: "元素", definition: "列表里存的其中一个值。" },
        { term: "import", definition: "引入 Python 默认不加载的额外工具，比如 random 模块。" },
        { term: "random.choice()", definition: "从列表里随机挑出一个元素。" },
      ],
      estimatedTime: "60 分钟",
      mainConcept:
        "列表把多个值装进一个变量里，写在方括号中。random.choice() 会伸进列表里随机抓出一个元素，让程序能给玩家惊喜。要用 random，先在最上面写 import random 把它引进来——这是你第一次需要一个不是内置的工具。列表加上随机，正是让游戏每次玩起来都不一样的原因。",
      projectName: "随机冒险游戏",
      starterCode:
        "# 随机冒险游戏\n# 每次运行都会随机挑一条路和一件奖品。\n\nimport random\n\npaths = [\"一片黑森林\", \"一个安静的山洞\", \"一座绳索桥\"]\nprizes = [\"一枚金币\", \"一张旧地图\", \"一把生锈的钥匙\"]\n\npath = random.choice(paths)\nprize = random.choice(prizes)\n\nprint(f\"你走进了{path}。\")\nprint(f\"在尽头，你找到了{prize}。\")",
      expectedOutput: "你走进了一个安静的山洞。\n在尽头，你找到了一张旧地图。",
      miniChallenge: "再加第三个列表，装上玩家一路上遇到的角色，随机挑一个，并打印一句关于他的话。",
      debuggingChallenge: {
        brokenCode: "paths = [\"一片黑森林\", \"一个安静的山洞\"]\npath = random.choice(paths)\nprint(path)",
        prompt:
          "Python 说 random 未定义。这个程序用了 random.choice()，但 random 是一个必须先引进来的工具。最上面该加哪一行？",
        solution: "在最上面把 random 工具引进来：\nimport random",
      },
      extensionChallenge:
        "在开头用 input() 问玩家的名字，然后把它用进这个随机故事里，让冒险感觉是属于他的。",
      reflectionQuestion:
        "两个玩家运行同一个程序，却得到不同的故事。这为什么会让一个游戏更值得反复玩？",
      teacherNotes:
        "因为输出是随机的，「预期输出」只是其中一种可能——每次运行都会不同，而这正是重点。反复强调 import 要写在最上面。列表的下标从 0 开始，但用 random.choice() 学生还不需要下标；把重点放在「从列表里挑一个」上。",
    },
    {
      facilitation: {
        goal: "学生规划并做出自己的小游戏，把整门课学到的东西结合起来。",
        materials: [
          "带浏览器的电脑和第 8 周课程页面",
          "写代码前用来规划游戏的纸",
        ],
        explain: [
          "真正的程序，是把许多分开学过的小概念组合起来。",
          "先写一份简短的计划，然后一次加一个功能，边加边测试。",
          "一个能跑起来的小游戏，胜过一个跑不起来的宏大游戏。",
        ],
        commonMistakes: [
          "想一口气把整个游戏写完，而不是分成一小步一小步地测试。",
          "又犯回之前的错误（漏冒号、= 与 ==、忘了 int()）。",
          "跳过计划，然后卡住。",
        ],
        questionsToAsk: [
          "你的游戏最小、能跑起来的版本是什么样的？",
          "这里你打算用哪一周学到的概念？",
          "你遇到了报错——这条信息在告诉你什么？",
        ],
        offlineActivity:
          "让学生先在纸上设计自己的游戏：目标是什么、玩家输入什么、程序回应什么。没有电脑的学生同样可以完成并展示这份设计。",
      },
      title: "结课游戏制作",
      description:
        "结课项目。学生规划并做出自己的 Python 小游戏，把一切结合起来：用变量记分、用 input 接收玩家的操作、用条件判断决定发生什么、用循环让游戏继续、用函数保持条理，再用列表加 random 让它保持新鲜。他们从一个能跑的骨架出发，把它改造成自己的作品。",
      learningGoals: [
        "写代码之前先在纸上规划一个小游戏。",
        "在一个程序里结合变量、输入、条件判断、循环、函数和随机。",
        "测试游戏，找出 bug，并随手修好。",
        "把骨架改造成属于自己的游戏。",
      ],
      vocabulary: [
        { term: "计划", definition: "在写代码之前写下的、关于程序该做什么的简短提纲。" },
        { term: "骨架", definition: "一个能跑起来的小程序，你在它的基础上往上搭。" },
        { term: "测试", definition: "用不同的输入运行你的程序，看看它是否正常。" },
        { term: "bug", definition: "代码里的错误，会让程序做错事。" },
      ],
      estimatedTime: "60 分钟（或分两次上）",
      mainConcept:
        "真正的程序是由你已经掌握的小块拼起来的，一次加一块。先有一份计划和一个能跑的骨架，然后加一个功能、测试它，之后再加下一个。一个能跑起来的小游戏就是真正的胜利——胜过一个永远跑不起来的大游戏。",
      projectName: "做出你自己的 Python 小游戏",
      starterCode:
        "# 做出你自己的小游戏\n# 一个能跑的骨架。读一读，跑一跑，然后把它变成你自己的。\n\nimport random\n\ndef welcome(player):\n    print(f\"欢迎你，{player}！猜中我的秘密数字就算赢。\")\n\nplayer = input(\"你叫什么名字？ \")\nwelcome(player)\n\nsecret = random.choice([1, 2, 3, 4, 5])\ntries = 0\nguess = 0\n\nwhile guess != secret:\n    guess = int(input(\"选一个 1 到 5 的数： \"))\n    tries = tries + 1\n    if guess != secret:\n        print(\"不对，再试一次。\")\n\nprint(f\"{player}，你用了 {tries} 次就猜中了！\")",
      expectedOutput:
        "你叫什么名字？ Alex\n欢迎你，Alex！猜中我的秘密数字就算赢。\n选一个 1 到 5 的数： 2\n不对，再试一次。\n选一个 1 到 5 的数： 4\n不对，再试一次。\n选一个 1 到 5 的数： 5\nAlex，你用了 3 次就猜中了！",
      miniChallenge:
        "给玩家一点提示：在循环里，每猜错一次就打印「太小了」或「太大了」，就像你在第 5 周做的那样。",
      debuggingChallenge: {
        brokenCode: "secret = random.choice([1, 2, 3])\nguess = 0\nwhile guess != secret\n    guess = int(input(\"选一个数： \"))",
        prompt:
          "Python 指着 while 那一行报了语法错误。每一行开启代码块的语句——if、while、def——结尾都有同一个小符号。看看那行的末尾。",
        solution: "开启代码块的行要以冒号结尾：\nwhile guess != secret:",
      },
      extensionChallenge:
        "把骨架重新设计成你自己的游戏：一轮问答、一个带选择的故事，或者一个刷最高分的挑战。至少用上一个列表、一个函数和一个循环。",
      reflectionQuestion:
        "你用这门课的八个概念做出了一个游戏。你最依赖哪一周的概念？为什么？",
      teacherNotes:
        "鼓励他们先在纸上写计划：目标是什么、玩家输入什么、程序回应什么。因为游戏用到了随机，把「预期输出」当成一个示例即可。要多肯定那些能跑起来的小游戏，而不是跑不起来的宏大构想。用一小段时间让学生互相玩对方的游戏，是很有力的收尾。",
    },
  ],
}

const pt: DeepPartial<Curriculum> = {
  title: "Introdução à Programação em Python",
  subtitle: "Um curso de programação para iniciantes de 8 semanas",
  description:
    "Um currículo de programação para iniciantes de 8 semanas em que os estudantes aprendem Python criando pequenos jogos, programas interativos e desafios de depuração.",
  gradeRange: "3º ao 6º ano",
  estimatedTimePerWeek: "50 a 60 minutos",
  requirement: "Roda no navegador, sem precisar instalar",
  summary:
    "Estudantes sem experiência prévia aprendem a ler e escrever Python de verdade, uma ideia por vez. Cada semana apresenta um único conceito e termina com um pequeno projeto que o estudante consegue executar e mostrar. Na última semana, os estudantes combinam tudo o que aprenderam para projetar e criar o próprio minijogo.",
  format: [
    "Um conceito por semana, ensinado em ordem, para que cada semana se apoie na anterior.",
    "Cada aula termina com um projeto que os estudantes escrevem e executam sozinhos.",
    "Desafios curtos de prática, depuração e aprofundamento deixam os estudantes praticarem no próprio ritmo.",
    "Todo o código roda na área de treino de Python do navegador, então não é preciso instalar nada.",
  ],
  outcomes: [
    "Como os computadores seguem instruções",
    "Como as variáveis guardam informações",
    "Como os programas tomam decisões",
    "Como os laços repetem ações",
    "Como as funções organizam o código",
    "Como as listas e o acaso deixam os programas mais interessantes",
    "Como encontrar e corrigir erros no código",
    "Como projetar e criar um pequeno projeto final",
  ],
  lessonFlow: [
    { title: "Aprenda a ideia", description: "Leia uma explicação curta e simples do único conceito novo da semana." },
    { title: "Teste o código inicial", description: "Execute um código inicial que funciona no navegador e mude-o para ver o que acontece." },
    { title: "Conserte um exemplo com erro", description: "Encontre e conserte um errinho em um trecho quebrado, como fazem os programadores de verdade." },
    { title: "Crie um miniprojeto", description: "Use a ideia nova para escrever e executar um pequeno programa seu." },
    { title: "Reflita sobre o que mudou", description: "Responda a uma pergunta curta que liga o código ao seu próprio jeito de pensar." },
  ],
  facilitator: {
    audience:
      "Este currículo foi escrito para o adulto que conduz o encontro: equipe de biblioteca tocando um clube de programação, um professor acrescentando uma unidade extra, uma pessoa voluntária em oficina ou um pai orientando um único estudante. Não é preciso ter formação em programação: cada aula diz o que falar e o que observar.",
    studentNeeds: [
      "Um computador, notebook ou Chromebook com um navegador moderno (Chrome, Edge, Safari ou Firefox).",
      "Uma conexão com a internet para abrir as páginas das aulas e carregar a área de treino de Python no navegador.",
      "Opcional: papel para planejar o código e fones de ouvido, se as aulas forem feitas individualmente.",
    ],
    runningTheLesson: [
      "Abra a página da aula da semana e leiam juntos, em grupo, A ideia e o vocabulário.",
      "Demonstre o código inicial uma vez em uma tela compartilhada, executando para todo mundo ver a saída.",
      "Dê tempo para os estudantes executarem o código inicial sozinhos e tentarem o minidesafio.",
      "Circule enquanto eles trabalham, usando as perguntas sugeridas para checar o entendimento.",
      "Feche com o desafio de depuração e a pergunta de reflexão como discussão com a turma inteira.",
      "Reserve de 50 a 60 minutos. Se o tempo apertar, o minidesafio ou a reflexão podem ir para casa.",
    ],
    supportingBeginners: [
      "Deixe claro que mensagens de erro são parte normal de programar, e não sinal de fracasso.",
      "Incentive a digitar as mudanças à mão em vez de copiar, para a sintaxe realmente fixar.",
      "Coloque quem está programando pela primeira vez em dupla, ou sente essa pessoa onde você possa acompanhar de perto.",
      "Leia o código em voz alta em português simples (\"print mostra este texto na tela\") para construir vocabulário.",
      "Deixe quem terminar antes tentar o desafio de aprofundamento em vez de esperar a turma.",
    ],
  },
  weeks: [
    {
      facilitation: {
        goal: "Os estudantes entendem que código é um conjunto de instruções em ordem e escrevem o primeiro programa usando print().",
        materials: [
          "Computadores ou tablets com um navegador",
          "A página da aula da Semana 1 aberta na área de treino",
          "Opcional: um quadro branco para escrever juntos exemplos de linhas print()",
        ],
        explain: [
          "Um programa é uma lista de instruções que o computador segue em ordem, de cima para baixo.",
          "print() mostra na tela exatamente o que está dentro das aspas.",
          "Todo print() precisa de parênteses, e o texto precisa de aspas em volta.",
        ],
        commonMistakes: [
          "Esquecer as aspas em volta do texto, como print(Olá) em vez de print(\"Olá\").",
          "Parênteses faltando ou desemparelhados.",
          "Esperar que o computador adivinhe o sentido: ele imprime exatamente o que foi digitado.",
        ],
        questionsToAsk: [
          "O que você acha que esta linha vai imprimir antes de a gente executar?",
          "O que acontece se a gente trocar a ordem de duas linhas print?",
          "Por que o computador mostrou um erro nesta linha?",
        ],
        offlineActivity:
          "Brinquem de \"instruções de robô\": um estudante dá ao outro comandos falados, passo a passo, para desenhar uma forma simples. Passos faltando ou fora de ordem mostram o quanto os computadores seguem instruções ao pé da letra.",
      },
      title: "O que é Python?",
      description:
        "A primeira aula. Os estudantes descobrem o que código realmente é: instruções exatas que o computador segue em ordem. Eles escrevem e executam o próprio programa em Python usando print() para colocar palavras na tela, e veem o que acontece quando uma instrução é digitada errado.",
      learningGoals: [
        "Dizer, com as próprias palavras, o que é um programa.",
        "Escrever e executar um programa que usa print() para mostrar texto.",
        "Explicar por que o computador executa as linhas em ordem, de cima para baixo.",
        "Ler uma mensagem de erro curta e consertar uma aspa que faltou.",
      ],
      vocabulary: [
        { term: "programa", definition: "Um conjunto de instruções exatas que o computador segue, uma linha por vez." },
        { term: "print()", definition: "Um comando do Python que mostra na tela o texto que você colocar entre aspas." },
        { term: "string", definition: "Um trecho de texto entre aspas, como \"Olá\"." },
        { term: "saída", definition: "O que o programa mostra na tela quando é executado." },
        { term: "erro", definition: "A mensagem que o Python mostra quando uma linha está escrita de um jeito que ele não consegue seguir." },
      ],
      estimatedTime: "50 a 60 minutos",
      mainConcept:
        "Código é uma lista de instruções, e o computador segue essa lista em ordem, sem adivinhar. print() é a primeira instrução que você vai aprender: ela mostra exatamente o texto que está entre as aspas. Mude as palavras entre aspas e a tela muda junto.",
      projectName: "Cartão de apresentação digital",
      starterCode:
        "# Cartão de apresentação digital\n# Mude as palavras entre aspas para o cartão falar de você.\n\nprint(\"Oi, eu sou o Alex.\")\nprint(\"Tenho 10 anos.\")\nprint(\"O último jogo que joguei foi futebol.\")",
      expectedOutput: "Oi, eu sou o Alex.\nTenho 10 anos.\nO último jogo que joguei foi futebol.",
      miniChallenge:
        "Acrescente mais duas linhas ao seu cartão: uma sobre um jogo ou hobby de que você gosta, e outra sobre algo que você quer construir este ano.",
      debuggingChallenge: {
        brokenCode: "print(Olá)",
        prompt:
          "Esta linha deveria imprimir a palavra Olá, mas em vez disso trava o programa com um erro. Veja o que está faltando em volta da palavra Olá. Todo texto em Python precisa disso.",
        solution: "Coloque aspas em volta do texto:\nprint(\"Olá\")",
      },
      extensionChallenge:
        "Acrescente uma linha em branco ao seu cartão escrevendo print() sem nada dentro dos parênteses. Use isso para dividir o cartão em duas partes organizadas.",
      reflectionQuestion:
        "O computador seguiu as suas linhas exatamente na ordem em que você escreveu. No jogo que você vai construir no fim deste curso, a ordem também vai importar. O que daria errado se um jogo imprimisse \"Você venceu!\" antes mesmo de o jogador jogar?",
      teacherNotes:
        "A grande ideia é que o computador é literal: ele imprime exatamente o que está entre aspas, em ordem, e nada mais. Os dois erros que você mais vai ver são aspa faltando e parêntese faltando. Trate-os como os primeiros bugs que os estudantes encontram e consertam, não como fracasso. Peça que leiam a saída em voz alta para conferir se ela diz o que eles queriam.",
    },
    {
      facilitation: {
        goal: "Os estudantes guardam informações em variáveis e as usam para montar frases com print().",
        materials: [
          "Computadores com navegador e a página da aula da Semana 2",
          "Opcional: envelopes etiquetados ou post-its para representar variáveis como caixas",
        ],
        explain: [
          "Uma variável é uma caixa com etiqueta que guarda um valor que dá para reutilizar.",
          "Valores de texto (strings) vão entre aspas; valores numéricos não.",
          "Uma f-string permite colocar uma variável dentro de uma frase usando chaves.",
        ],
        commonMistakes: [
          "Colocar aspas em volta do nome de uma variável dentro de uma f-string, o que imprime o nome em vez do valor.",
          "Colocar aspas em números que deveriam continuar numéricos.",
          "Nomear variáveis de forma inconsistente, com espaços ou letras maiúsculas soltas.",
        ],
        questionsToAsk: [
          "O que está guardado nesta variável agora?",
          "Quais desses valores são texto e quais são números?",
          "Como a gente poderia descrever outra pessoa sem reescrever cada linha?",
        ],
        offlineActivity:
          "Distribua envelopes etiquetados (nome, idade, animal favorito) e peça aos estudantes que coloquem um papelzinho dentro de cada um. Ler os envelopes em voz alta representa como uma variável guarda e reutiliza um valor.",
      },
      title: "Variáveis e tipos de dados",
      description:
        "Os estudantes dão memória ao programa. Eles guardam palavras e números em variáveis e depois os reutilizam para montar frases, de modo que mudar uma linha muda o programa inteiro. Este é o primeiro passo rumo a um jogo que consegue falar do jogador pelo nome e acompanhar uma pontuação.",
      learningGoals: [
        "Criar uma variável e guardar um valor nela com =.",
        "Diferenciar texto (uma string) de um número.",
        "Usar uma variável dentro de uma frase impressa com uma f-string.",
        "Encontrar e consertar uma variável que foi usada do jeito errado.",
      ],
      vocabulary: [
        { term: "variável", definition: "Uma caixa com nome que guarda um valor para você usar depois." },
        { term: "atribuir", definition: "Colocar um valor dentro de uma variável usando o sinal =." },
        { term: "inteiro", definition: "Um número inteiro, sem vírgula decimal, como 10." },
        { term: "f-string", definition: "Uma frase que começa com f, em que tudo dentro de { } é preenchido a partir de uma variável." },
      ],
      estimatedTime: "50 a 60 minutos",
      mainConcept:
        "Uma variável é uma caixa com etiqueta: você coloca um valor dentro uma vez e depois usa o nome dela onde quiser esse valor. Texto vai entre aspas (uma string); números não. Com uma f-string você consegue colocar uma variável direto dentro de uma frase, então um programa pode cumprimentar o jogador pelo nome em vez de dizer sempre a mesma coisa.",
      projectName: "Gerador de perfil",
      starterCode:
        "# Gerador de perfil\n# Preencha com as suas informações e execute para ver o seu perfil de jogador.\n\nnome = \"Alex\"\nidade = 10\njogo_favorito = \"futebol\"\n\nprint(f\"Jogador: {nome}\")\nprint(f\"Idade: {idade}\")\nprint(f\"Jogo favorito: {jogo_favorito}\")",
      expectedOutput: "Jogador: Alex\nIdade: 10\nJogo favorito: futebol",
      miniChallenge:
        "Acrescente uma variável chamada pontos e deixe em 0, depois imprima uma linha como Pontos: 0. Você vai acompanhar a pontuação exatamente assim no seu jogo final.",
      debuggingChallenge: {
        brokenCode: "nome = \"Alex\"\nprint(f\"Meu nome é nome.\")",
        prompt:
          "Isto deveria imprimir Meu nome é Alex, mas imprime a palavra nome. O valor da variável não está sendo preenchido. O que precisa ir em volta de nome dentro de uma f-string?",
        solution: "Coloque chaves em volta da variável para o Python preencher o valor:\nprint(f\"Meu nome é {nome}.\")",
      },
      extensionChallenge:
        "Acrescente uma variável numérica chamada recorde e imprima uma frase que use nome e recorde, como: O melhor resultado do Alex é 25.",
      reflectionQuestion:
        "Você mudou o que o programa diz só mudando uma variável. Por que isso é melhor do que digitar o nome do jogador de novo e de novo em cada linha?",
      teacherNotes:
        "Reforce duas regras: strings levam aspas, números não; e, dentro de uma f-string, uma variável só funciona com chaves em volta. O bug clássico é colocar aspas no nome da variável para ela ser impressa literalmente, e vale deixar os estudantes descobrirem sozinhos. Mantenha os nomes de variável em minúsculas e descritivos (pontos, não x).",
    },
    {
      facilitation: {
        goal: "Os estudantes usam input() para coletar respostas e reagir a elas, transformando um programa em uma conversa de mão dupla.",
        materials: [
          "Computadores com navegador e a página da aula da Semana 3",
          "Opcional: um roteiro impresso para a dramatização do chatbot sem computador",
        ],
        explain: [
          "input() faz uma pergunta e pausa até a pessoa digitar uma resposta e apertar Enter.",
          "A resposta pode ser guardada em uma variável e usada depois no programa.",
          "input() sempre devolve texto.",
        ],
        commonMistakes: [
          "Esquecer as aspas em volta do texto da pergunta dentro de input().",
          "Esperar que o programa siga em frente antes de a pessoa apertar Enter.",
          "Tentar fazer conta com uma resposta sem convertê-la em número (isso vem na próxima semana).",
        ],
        questionsToAsk: [
          "Onde o programa para e espera o usuário?",
          "Em que isso é diferente do programa da semana passada, que só imprimia?",
          "O que o programa deveria responder usando a resposta?",
        ],
        offlineActivity:
          "Façam uma dramatização de chatbot: um estudante é o programa e só pode responder usando um roteiro impresso mais as respostas que o usuário der. Isso mostra como a entrada alimenta a resposta.",
      },
      title: "Entrada e interação",
      description:
        "Os programas começam a escutar. Os estudantes usam input() para fazer uma pergunta ao jogador, esperar a resposta e usá-la no que o programa responde. No fim, eles têm um chatbot curto que responde ao que você digitar.",
      learningGoals: [
        "Usar input() para obter uma resposta de quem está executando o programa.",
        "Guardar uma resposta em uma variável e usá-la depois.",
        "Explicar que o programa pausa em input() até a pessoa digitar algo.",
        "Consertar uma linha input() que está sem as aspas.",
      ],
      vocabulary: [
        { term: "input()", definition: "Um comando do Python que faz uma pergunta e espera a pessoa digitar uma resposta." },
        { term: "prompt", definition: "A mensagem que input() mostra para dizer ao usuário o que digitar." },
        { term: "usuário", definition: "A pessoa que usa o programa; em um jogo, o jogador." },
      ],
      estimatedTime: "50 a 60 minutos",
      mainConcept:
        "input() é como um programa escuta. Ele mostra uma mensagem, depois para e espera o jogador digitar e apertar Enter. A resposta é guardada em uma variável, então o programa pode usá-la no que fizer depois: o nome, o palpite, a escolha. Lembre-se: input() sempre devolve texto.",
      projectName: "Minichatbot",
      starterCode:
        "# Minichatbot\n# O programa faz perguntas e depois responde usando as suas respostas.\n\nnome = input(\"Como posso te chamar? \")\nprint(f\"Prazer em conhecer, {nome}.\")\n\njogo = input(\"Qual jogo você está curtindo agora? \")\nprint(f\"{jogo}? Boa escolha. Logo a gente vai construir um nosso.\")",
      expectedOutput:
        "Como posso te chamar? Alex\nPrazer em conhecer, Alex.\nQual jogo você está curtindo agora? futebol\nfutebol? Boa escolha. Logo a gente vai construir um nosso.",
      miniChallenge:
        "Acrescente mais uma pergunta, talvez a cor ou o animal favorito, e use a resposta na fala do programa.",
      debuggingChallenge: {
        brokenCode: "nome = input(Como posso te chamar? )",
        prompt:
          "Executar isto dá erro antes de a pergunta sequer aparecer. A mensagem dentro de input() é texto para a pessoa ler. Do que todo texto precisa em volta?",
        solution: "A mensagem é texto, então precisa de aspas:\nnome = input(\"Como posso te chamar? \")",
      },
      extensionChallenge:
        "Pergunte o nome do jogador e o jogo favorito dele, depois imprima uma frase que use os dois, como: Alex está pronto para jogar futebol!",
      reflectionQuestion:
        "Na semana passada o seu programa dizia sempre a mesma coisa. Agora ele responde. O que você poderia perguntar ao jogador no começo de um jogo para ele sentir que o jogo é sobre ele?",
      teacherNotes:
        "input() sempre devolve texto, mesmo quando a pessoa digita um número: isso fica importante na Semana 5, quando comparamos números e usamos int(). Fique de olho nas aspas faltando em volta da mensagem. Na área de trabalho, a mensagem e a resposta digitada aparecem no painel de saída, então a saída esperada mostra uma conversa de exemplo.",
    },
    {
      facilitation: {
        goal: "Os estudantes usam if, elif e else para o programa fazer coisas diferentes conforme a resposta.",
        materials: [
          "Computadores com navegador e a página da aula da Semana 4",
          "Opcional: um quadro branco ou espaço no chão para desenhar ou percorrer uma árvore de decisão",
        ],
        explain: [
          "Uma condição é uma pergunta que é verdadeira ou falsa.",
          "O código indentado embaixo de um if só roda quando a condição dele é verdadeira.",
          "elif e else cuidam dos outros casos.",
          "Comparar valores usa dois sinais de igual (==); um sinal de igual (=) guarda um valor.",
        ],
        commonMistakes: [
          "Usar = em vez de == ao comparar dois valores.",
          "Esquecer de indentar o código embaixo de if, elif ou else.",
          "Esquecer que comparações de texto diferenciam maiúsculas (\"Terra\" não é \"terra\").",
        ],
        questionsToAsk: [
          "Qual condição a gente está checando aqui?",
          "Qual ramo vai rodar se a resposta for esta?",
          "Por que o programa escolheu aquela resposta?",
        ],
        offlineActivity:
          "Montem uma árvore de decisão no chão com fita ou placas: os estudantes respondem a uma pergunta de sim ou não e caminham até o ramo correspondente. Isso torna o if/elif/else visível.",
      },
      title: "Condicionais",
      description:
        "O programa começa a fazer escolhas. Os estudantes usam if, elif e else para ele fazer coisas diferentes conforme a resposta do jogador. Eles montam um quiz curto que confere respostas e reage a cada uma: o coração de qualquer jogo que dá para ganhar ou perder.",
      learningGoals: [
        "Escrever um if que só roda quando a condição é verdadeira.",
        "Acrescentar elif e else para lidar com as outras respostas.",
        "Comparar a resposta do jogador com um valor esperado usando ==.",
        "Consertar a confusão comum entre = e ==.",
      ],
      vocabulary: [
        { term: "condição", definition: "Uma pergunta com resposta verdadeira ou falsa, como resposta == \"Terra\"." },
        { term: "if", definition: "Roda as linhas indentadas abaixo dele só quando a condição é verdadeira." },
        { term: "elif", definition: "Checa outra condição quando as de cima deram falso." },
        { term: "else", definition: "Roda quando nenhuma das condições acima foi verdadeira." },
        { term: "==", definition: "Checa se dois valores são iguais (diferente de =, que guarda um valor)." },
      ],
      estimatedTime: "55 a 60 minutos",
      mainConcept:
        "Uma condicional deixa o programa escolher. O Python checa uma condição, algo que é verdadeiro ou falso, e roda as linhas indentadas abaixo só se a condição for verdadeira. Com if, elif e else, um programa pode reagir de um jeito a uma resposta certa, de outro a uma resposta quase certa e de outro a uma errada. É assim que um jogo decide se você pontuou, venceu ou perdeu.",
      projectName: "Quiz de conhecimentos ou de personalidade",
      starterCode:
        "# Quiz de conhecimentos\n# Faça uma pergunta e depois confira a resposta.\n\nresposta = input(\"Em qual planeta a gente vive? \")\n\nif resposta == \"Terra\":\n    print(\"Isso mesmo! 1 ponto.\")\nelif resposta == \"terra\":\n    print(\"A ideia está certa, só cuidado com o T maiúsculo. Vamos contar.\")\nelse:\n    print(\"Não é bem isso. A resposta é Terra.\")",
      expectedOutput: "Em qual planeta a gente vive? Terra\nIsso mesmo! 1 ponto.",
      miniChallenge:
        "Acrescente uma segunda pergunta com o próprio if / else, para o seu quiz ter duas perguntas seguidas.",
      debuggingChallenge: {
        brokenCode: "resposta = input(\"Em qual planeta a gente vive? \")\nif resposta = \"Terra\":\n    print(\"Isso mesmo!\")",
        prompt:
          "O Python mostra um erro na linha do if. Um sinal de igual guarda um valor em uma variável. O que você usa quando quer checar se duas coisas são iguais?",
        solution: "Comparar dois valores precisa de dois sinais de igual:\nif resposta == \"Terra\":",
      },
      extensionChallenge:
        "Transforme em um teste de personalidade: faça uma pergunta do tipo \"o que você prefere\" e imprima um resultado diferente para cada escolha usando if, elif e else.",
      reflectionQuestion:
        "Seu programa agora reage de formas diferentes a respostas diferentes. No seu jogo final, qual é uma decisão que o programa vai precisar tomar, e o que deve acontecer em cada caso?",
      teacherNotes:
        "Dois pontos de atenção: indentação (as linhas embaixo de um if precisam ser indentadas) e = versus == (guardar versus comparar). A comparação de strings é exata e diferencia maiúsculas, que é justamente o que a linha elif está ali para destacar. Deixe os estudantes baterem sozinhos no erro de = / ==: a mensagem aponta direto para ele.",
    },
    {
      facilitation: {
        goal: "Os estudantes usam um laço while para repetir ações e dar ao jogador mais de uma tentativa.",
        materials: [
          "Computadores com navegador e a página da aula da Semana 5",
          "Opcional: papel para o jogo de adivinhação maior/menor sem computador",
        ],
        explain: [
          "Um laço repete o código para você não ter que reescrever.",
          "Um laço while continua enquanto a condição dele se mantiver verdadeira.",
          "Alguma coisa dentro do laço precisa, em algum momento, tornar a condição falsa, senão ele roda para sempre.",
          "int() transforma o texto digitado em número para dar para comparar.",
        ],
        commonMistakes: [
          "Escrever um laço cuja condição nunca fica falsa (um laço infinito).",
          "Esquecer o int(), então um \"7\" digitado nunca é igual ao número 7 e o laço nunca acaba.",
          "Esquecer os dois-pontos no fim da linha do while.",
        ],
        questionsToAsk: [
          "O que precisa acontecer para este laço parar?",
          "O que muda a cada volta do laço?",
          "Por que este laço poderia rodar para sempre, e como a gente consertaria?",
        ],
        offlineActivity:
          "Joguem um jogo de adivinhação no papel: um estudante pensa em um número de 1 a 10 enquanto o outro chuta e ouve \"maior\" ou \"menor\". Contar os chutes representa o laço e a comparação.",
      },
      title: "Laços",
      description:
        "Em vez de copiar uma linha várias vezes, os estudantes fazem o programa repetir. Usando um laço while, eles criam um jogo de Adivinhe o Número que continua perguntando até o jogador acertar, dando dicas de muito alto e muito baixo pelo caminho. Por enquanto o segredo é fixo; na Semana 7 ele vira aleatório.",
      learningGoals: [
        "Usar um laço while para repetir linhas até algo mudar.",
        "Dar ao jogador quantas tentativas ele precisar, com um laço.",
        "Combinar um laço com um if para reagir a cada palpite.",
        "Encontrar e consertar um laço que nunca para.",
      ],
      vocabulary: [
        { term: "laço", definition: "Código que se repete em vez de rodar uma vez só." },
        { term: "while", definition: "Repete as linhas abaixo dele enquanto a condição se mantiver verdadeira." },
        { term: "int()", definition: "Transforma um texto digitado como \"7\" no número 7 para você poder comparar." },
        { term: "laço infinito", definition: "Um laço que nunca para porque a condição dele nunca fica falsa." },
      ],
      estimatedTime: "60 minutos",
      mainConcept:
        "Um laço repete o código para você não escrever cem vezes. Um laço while continua enquanto a condição for verdadeira: perfeito para um jogo que deve continuar perguntando até o jogador ganhar. Alguma coisa dentro do laço precisa tornar a condição falsa em algum momento, senão ele roda para sempre. Como input() devolve texto, usamos int() para transformar o palpite em um número que dá para comparar.",
      projectName: "Jogo de adivinhar o número",
      starterCode:
        "# Adivinhe o número\n# Por enquanto o segredo é 7. Na Semana 7 você vai deixá-lo aleatório.\n\nsegredo = 7\npalpite = 0\n\nwhile palpite != segredo:\n    palpite = int(input(\"Chute um número de 1 a 10: \"))\n    if palpite < segredo:\n        print(\"Muito baixo.\")\n    elif palpite > segredo:\n        print(\"Muito alto.\")\n\nprint(\"Você acertou!\")",
      expectedOutput:
        "Chute um número de 1 a 10: 4\nMuito baixo.\nChute um número de 1 a 10: 9\nMuito alto.\nChute um número de 1 a 10: 7\nVocê acertou!",
      miniChallenge:
        "Acrescente um contador de tentativas: comece com tentativas = 0, some 1 dentro do laço e, depois do laço, imprima quantos palpites foram necessários.",
      debuggingChallenge: {
        brokenCode: "segredo = 7\npalpite = 0\nwhile palpite != segredo:\n    palpite = input(\"Chute um número de 1 a 10: \")",
        prompt:
          "Este jogo nunca acaba, nem quando o jogador digita 7. O segredo é o número 7, mas input() devolve o texto \"7\". Por que eles não são iguais, e o que transforma texto em número?",
        solution: "Transforme o texto digitado em número com int():\npalpite = int(input(\"Chute um número de 1 a 10: \"))",
      },
      extensionChallenge:
        "Mude o intervalo para 1 a 100 e dê ao jogador apenas 7 tentativas. Pare o laço e imprima Acabaram as tentativas! se elas se esgotarem.",
      reflectionQuestion:
        "Um laço deixou você perguntar de novo e de novo sem se repetir. Qual parte do seu jogo final pode precisar repetir: os turnos, as perguntas, as rodadas?",
      teacherNotes:
        "O momento de aprendizado é o laço infinito: alguma coisa dentro do laço precisa mudar a variável que a condição checa, senão ele nunca acaba. Apresente int() só até onde for preciso para comparar números. Mantenha o segredo fixo nesta semana para os estudantes conseguirem prever e conferir o comportamento; a aleatoriedade chega na Semana 7.",
    },
    {
      facilitation: {
        goal: "Os estudantes definem e chamam funções para reutilizar código e manter os programas organizados.",
        materials: [
          "Computadores com navegador e a página da aula da Semana 6",
          "Opcional: um cartão de receita impresso para representar uma função reutilizável",
        ],
        explain: [
          "Uma função é uma receita reutilizável: defina uma vez e depois chame sempre que precisar.",
          "def cria uma função; escrever o nome dela com parênteses a chama.",
          "Um parâmetro é uma entrada que a função aceita, listada dentro dos parênteses dela.",
          "Definir uma função não a executa; chamá-la sim.",
        ],
        commonMistakes: [
          "Definir uma função e nunca chamá-la.",
          "Chamar uma função sem o argumento que ela exige.",
          "Esquecer os dois-pontos depois da linha do def, ou não indentar o corpo da função.",
        ],
        questionsToAsk: [
          "O que esta função faz, e do que ela precisa para fazer o trabalho dela?",
          "Onde a função é definida, e onde ela é chamada?",
          "Como este programa ficaria se a gente não pudesse usar funções?",
        ],
        offlineActivity:
          "Escrevam uma receita simples (por exemplo, dobrar um aviãozinho de papel) como passos com nome, e depois \"chamem\" essa receita duas vezes com entradas diferentes, como papéis de cores diferentes. Isso mostra o definir-uma-vez, reutilizar-muitas.",
      },
      title: "Funções",
      description:
        "Conforme os programas crescem, os estudantes empacotam código em funções que podem nomear e reutilizar. Eles criam pequenas funções auxiliares (cumprimentar o jogador, mostrar a pontuação) e as chamam sempre que precisam, que é exatamente como o jogo final vai se manter organizado.",
      learningGoals: [
        "Definir uma função com def e executá-la chamando o nome dela.",
        "Passar informação para uma função usando um parâmetro.",
        "Explicar por que funções evitam que você repita código.",
        "Consertar uma chamada de função que está sem o argumento.",
      ],
      vocabulary: [
        { term: "função", definition: "Um bloco de código com nome que você pode rodar várias vezes chamando o nome dele." },
        { term: "def", definition: "A palavra-chave que cria uma nova função." },
        { term: "parâmetro", definition: "Uma entrada que a função recebe, listada dentro dos parênteses dela." },
        { term: "chamar", definition: "Executar uma função escrevendo o nome dela com parênteses, como cumprimentar(\"Alex\")." },
      ],
      estimatedTime: "60 minutos",
      mainConcept:
        "Uma função é uma receita reutilizável. Você escreve os passos uma vez depois de def e dá um nome a ela; a partir daí, roda todos esses passos só chamando o nome. Um parâmetro deixa você entregar à função informações diferentes a cada vez, então uma única função cumprimentar consegue receber qualquer jogador. Escrever uma função não a executa; chamá-la sim.",
      projectName: "Funções auxiliares de jogo",
      starterCode:
        "# Funções auxiliares de jogo\n# Escreva cada auxiliar uma vez e depois reutilize.\n\ndef cumprimentar(jogador):\n    print(f\"Bem-vindo, {jogador}!\")\n\ndef mostrar_pontos(pontos):\n    print(f\"Pontos: {pontos}\")\n\ncumprimentar(\"Alex\")\nmostrar_pontos(0)\nmostrar_pontos(10)",
      expectedOutput: "Bem-vindo, Alex!\nPontos: 0\nPontos: 10",
      miniChallenge:
        "Escreva uma função nova chamada fim_de_jogo() que imprima Obrigado por jogar! e chame-a no fim do programa.",
      debuggingChallenge: {
        brokenCode: "def cumprimentar(jogador):\n    print(f\"Bem-vindo, {jogador}!\")\n\ncumprimentar()",
        prompt:
          "Isto para com um erro sobre um argumento faltando. A função cumprimentar pede um jogador nos parênteses dela. Olhe a última linha: o que a chamada esqueceu de dar a ela?",
        solution: "Dê um valor à função quando chamá-la:\ncumprimentar(\"Alex\")",
      },
      extensionChallenge:
        "Escreva uma função proximo_nivel(nivel) que imprima uma linha como Você chegou ao nível 5! usando o número que você passar, e depois chame-a com alguns níveis diferentes.",
      reflectionQuestion:
        "Você escreveu mostrar_pontos uma vez e usou duas. No seu jogo final, o que é algo que você vai fazer mais de uma vez e que poderia virar uma função?",
      teacherNotes:
        "Separe duas ideias com clareza: definir uma função não a executa; chamá-la sim. O bug frequente é definir uma função com parâmetro e depois chamá-la com parênteses vazios. Mantenha cada função curta e fazendo um único trabalho, para o ganho (a reutilização) ficar óbvio.",
    },
    {
      facilitation: {
        goal: "Os estudantes guardam muitos valores em uma lista e usam random.choice() para deixar os programas imprevisíveis.",
        materials: [
          "Computadores com navegador e a página da aula da Semana 7",
          "Opcional: uma sacola ou tigela com papeizinhos para sortear",
        ],
        explain: [
          "Uma lista guarda muitos valores em uma variável só, escrita entre colchetes.",
          "import random traz a caixa de ferramentas do acaso.",
          "random.choice() escolhe um item da lista ao acaso, então cada execução pode ser diferente.",
        ],
        commonMistakes: [
          "Esquecer o import random lá em cima (\"random não está definido\").",
          "Faltar vírgulas ou colchetes ao escrever uma lista.",
          "Esperar a mesma saída a cada execução e achar que a aleatoriedade é um bug.",
        ],
        questionsToAsk: [
          "Quantos resultados diferentes este programa poderia produzir?",
          "O que faz cada execução ser diferente?",
          "O que a gente poderia acrescentar à lista para mudar o jogo?",
        ],
        offlineActivity:
          "Coloquem vários papeizinhos com desfechos em uma sacola e peçam aos estudantes que sorteiem um para montar uma história aleatória em voz alta. Isso representa uma lista mais uma escolha aleatória.",
      },
      title: "Listas e aleatoriedade",
      description:
        "Os programas ficam imprevisíveis. Os estudantes guardam vários valores em uma lista e usam random.choice() para escolher um ao acaso, então o programa faz algo diferente a cada execução. Eles criam um jogo de aventura curto cujo caminho e prêmio mudam toda vez, e conhecem o import pela primeira vez, porque agora eles precisam dele.",
      learningGoals: [
        "Criar uma lista e ler itens dela.",
        "Usar random.choice() para escolher um item aleatório de uma lista.",
        "Explicar por que import random precisa vir primeiro.",
        "Consertar um programa que usa random sem importá-lo.",
      ],
      vocabulary: [
        { term: "lista", definition: "Uma coleção ordenada de valores dentro de colchetes, como [\"a\", \"b\", \"c\"]." },
        { term: "item", definition: "Um valor guardado em uma lista." },
        { term: "import", definition: "Traz ferramentas extras que o Python não carrega por padrão, como o módulo random." },
        { term: "random.choice()", definition: "Escolhe um item de uma lista ao acaso." },
      ],
      estimatedTime: "60 minutos",
      mainConcept:
        "Uma lista guarda muitos valores em uma variável só, escrita entre colchetes. random.choice() enfia a mão em uma lista e puxa um item ao acaso, então o programa consegue surpreender o jogador. Para usar random, primeiro você o traz com import random lá em cima: a primeira vez que você precisa de uma ferramenta que não vem embutida. Listas mais aleatoriedade são o que faz um jogo parecer diferente cada vez que você joga.",
      projectName: "Jogo de aventura aleatório",
      starterCode:
        "# Jogo de aventura aleatório\n# Cada execução sorteia um caminho e um prêmio.\n\nimport random\n\ncaminhos = [\"uma floresta escura\", \"uma caverna silenciosa\", \"uma ponte de cordas\"]\npremios = [\"uma moeda de ouro\", \"um mapa velho\", \"uma chave enferrujada\"]\n\ncaminho = random.choice(caminhos)\npremio = random.choice(premios)\n\nprint(f\"Você segue por {caminho}.\")\nprint(f\"No fim, você encontra {premio}.\")",
      expectedOutput: "Você segue por uma caverna silenciosa.\nNo fim, você encontra um mapa velho.",
      miniChallenge:
        "Acrescente uma terceira lista de personagens que o jogador encontra pelo caminho, sorteie um e imprima uma linha sobre ele.",
      debuggingChallenge: {
        brokenCode: "caminhos = [\"uma floresta escura\", \"uma caverna silenciosa\"]\ncaminho = random.choice(caminhos)\nprint(caminho)",
        prompt:
          "O Python diz que random não está definido. Este programa usa random.choice(), mas random é uma ferramenta que precisa ser trazida antes. Qual única linha vai lá no topo?",
        solution: "Traga a ferramenta random no topo:\nimport random",
      },
      extensionChallenge:
        "Pergunte o nome do jogador com input() no começo e depois use esse nome na história aleatória, para a aventura parecer que é sobre ele.",
      reflectionQuestion:
        "Dois jogadores executam isto e recebem histórias diferentes. Por que isso deixa um jogo mais divertido de jogar mais de uma vez?",
      teacherNotes:
        "Como a saída é aleatória, a saída esperada é só um exemplo: as execuções vão variar, e é esse justamente o ponto. Reforce que o import vai no topo. As listas são indexadas a partir de 0, mas random.choice() faz com que os estudantes ainda não precisem de índices; mantenha o foco em escolher de uma lista.",
    },
    {
      facilitation: {
        goal: "Os estudantes planejam e criam o próprio minijogo, combinando tudo do curso.",
        materials: [
          "Computadores com navegador e a página da aula da Semana 8",
          "Papel para planejar o jogo antes de programar",
        ],
        explain: [
          "Programas de verdade combinam muitas ideias pequenas que foram aprendidas separadamente.",
          "Comece com um plano curto por escrito, depois acrescente um recurso por vez e teste conforme avança.",
          "Um jogo pequeno que funciona vale mais que um ambicioso que não roda.",
        ],
        commonMistakes: [
          "Tentar escrever o jogo inteiro de uma vez em vez de em passos pequenos e testados.",
          "Reintroduzir bugs antigos (dois-pontos faltando, = versus ==, esquecer o int()).",
          "Pular o plano e travar.",
        ],
        questionsToAsk: [
          "Qual é a menor versão do seu jogo que já rodaria?",
          "Qual ideia de qual semana você vai usar aqui?",
          "Você bateu num erro: o que a mensagem está te dizendo?",
        ],
        offlineActivity:
          "Peça aos estudantes que desenhem o jogo no papel primeiro: o objetivo, o que o jogador digita e o que o programa responde. Quem estiver sem computador ainda consegue concluir e apresentar o projeto.",
      },
      title: "Construtor do jogo final",
      description:
        "O projeto final. Os estudantes planejam e criam o próprio joguinho em Python, combinando tudo: variáveis para acompanhar a pontuação, input para as jogadas, condicionais para decidir o que acontece, um laço para continuar jogando, funções para manter a organização e uma lista com random para não ficar repetitivo. Eles partem de um esqueleto que funciona e o deixam com a cara deles.",
      learningGoals: [
        "Planejar um jogo pequeno no papel antes de escrever código.",
        "Combinar variáveis, entrada, condicionais, laços, funções e aleatoriedade em um só programa.",
        "Testar o jogo, encontrar bugs e consertá-los conforme avançam.",
        "Transformar o esqueleto em um jogo que é deles.",
      ],
      vocabulary: [
        { term: "plano", definition: "Um esboço curto do que um programa deve fazer, escrito antes de programar." },
        { term: "esqueleto", definition: "Um pequeno programa que funciona e a partir do qual você começa a construir." },
        { term: "testar", definition: "Executar o seu programa com entradas diferentes para ver se ele funciona." },
        { term: "bug", definition: "Um erro no código que faz o programa fazer a coisa errada." },
      ],
      estimatedTime: "60 minutos (ou dois encontros)",
      mainConcept:
        "Programas de verdade são construídos com pedaços pequenos que você já conhece, acrescentados um por vez. Comece com um plano e um esqueleto que roda, depois acrescente um recurso, teste, e só então acrescente o próximo. Um jogo pequeno que funciona é uma vitória de verdade, mais do que um grande que nunca roda.",
      projectName: "Crie o seu próprio minijogo em Python",
      starterCode:
        "# Crie o seu próprio minijogo\n# Um esqueleto que funciona. Leia, execute e depois deixe com a sua cara.\n\nimport random\n\ndef boas_vindas(jogador):\n    print(f\"Bem-vindo, {jogador}! Adivinhe o meu número secreto para ganhar.\")\n\njogador = input(\"Qual é o seu nome? \")\nboas_vindas(jogador)\n\nsegredo = random.choice([1, 2, 3, 4, 5])\ntentativas = 0\npalpite = 0\n\nwhile palpite != segredo:\n    palpite = int(input(\"Escolha um número de 1 a 5: \"))\n    tentativas = tentativas + 1\n    if palpite != segredo:\n        print(\"Não é esse, tente de novo.\")\n\nprint(f\"Você acertou em {tentativas} tentativas, {jogador}!\")",
      expectedOutput:
        "Qual é o seu nome? Alex\nBem-vindo, Alex! Adivinhe o meu número secreto para ganhar.\nEscolha um número de 1 a 5: 2\nNão é esse, tente de novo.\nEscolha um número de 1 a 5: 4\nNão é esse, tente de novo.\nEscolha um número de 1 a 5: 5\nVocê acertou em 3 tentativas, Alex!",
      miniChallenge:
        "Dê uma dica ao jogador: dentro do laço, imprima Muito baixo ou Muito alto depois de cada palpite errado, do jeito que você fez na Semana 5.",
      debuggingChallenge: {
        brokenCode: "segredo = random.choice([1, 2, 3])\npalpite = 0\nwhile palpite != segredo\n    palpite = int(input(\"Escolha um número: \"))",
        prompt:
          "O Python aponta a linha do while com um erro de sintaxe. Toda linha que abre um bloco (if, while, def) termina com o mesmo símbolo pequeno. Olhe o fim daquela linha.",
        solution: "Linhas que abrem um bloco terminam com dois-pontos:\nwhile palpite != segredo:",
      },
      extensionChallenge:
        "Redesenhe o esqueleto no seu próprio jogo: uma rodada de perguntas, uma história com escolhas ou uma disputa por recorde. Use pelo menos uma lista, uma função e um laço.",
      reflectionQuestion:
        "Você construiu um jogo com as oito ideias deste curso. Em qual ideia de qual semana você mais se apoiou, e por quê?",
      teacherNotes:
        "Incentive um plano no papel primeiro: o objetivo, o que o jogador digita e o que o programa responde. Como o jogo usa aleatoriedade, trate a saída esperada como um exemplo. Valorize jogos pequenos que rodam mais do que ambiciosos que não rodam. Um encontro curto em que os estudantes jogam os jogos uns dos outros é um fecho forte.",
    },
  ],
}

const overlays: LocaleOverlays<Curriculum> = { es, zh, pt }

/** The Intro to Python curriculum in the requested language. */
export const getIntroToPythonCurriculum = createLocalizedResolver(
  introToPythonCurriculum,
  overlays,
)

/** Whether this course has been translated into `language` at all. */
export function pythonCurriculumHasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

/** The week with this number, in the requested language. */
export function findPythonWeek(language: Language, week: number): CurriculumWeek | undefined {
  return getIntroToPythonCurriculum(language).weeks.find((entry) => entry.week === week)
}
