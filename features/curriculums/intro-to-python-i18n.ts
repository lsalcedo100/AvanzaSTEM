import type { Curriculum, CurriculumWeek } from "@/features/curriculums/intro-to-python"
import { introToPythonCurriculum } from "@/features/curriculums/intro-to-python"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type DeepPartial,
  type LocaleOverlays,
} from "@/lib/localize-content"
import type { Language } from "@/i18n/translations"

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

const overlays: LocaleOverlays<Curriculum> = { es }

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
