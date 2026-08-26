import type { BlogSlug } from "@/features/blog/posts"

/**
 * Spanish, Chinese and Portuguese meta descriptions for blog posts.
 *
 * Search Console (6 months to 2026-08-13) showed the /es/blog/* and /zh/blog/*
 * routes taking ~3,300 impressions at an average position around 7 but a
 * combined CTR near 0.4%: every localized post rendered a Spanish or Chinese
 * <title> above an English <meta name="description">, so the SERP snippet was
 * in the wrong language for the searcher. These are translations of the
 * English descriptions in BLOG_POST_META, kept to roughly 150 characters for
 * Spanish and Portuguese and 45-55 characters for Chinese so they survive
 * snippet truncation.
 *
 * Only the meta description changes; no on-page copy is affected.
 */
export const LOCALIZED_BLOG_DESCRIPTIONS: Record<"es" | "zh" | "pt", Record<BlogSlug, string>> = {
  es: {
    "5-easy-science-experiments":
      "Prueba 5 experimentos de ciencia fáciles en casa con materiales que ya tienes. Actividades seguras, divertidas y educativas para niños de 2.º grado en adelante.",
    "building-a-community-stem-workshops":
      "Descubre cómo los talleres STEM gratuitos están cambiando vidas en comunidades hispanas de Nueva Jersey y cómo llevar uno a tu propio vecindario.",
    "getting-started-with-lego-robotics":
      "Los kits de robótica LEGO son una gran introducción al STEM. Aprende qué kit elegir, qué aprenderá tu hijo y cómo empezar en casa paso a paso.",
    "how-to-build-the-strongest-popsicle-stick-bridge":
      "Conoce los secretos de ingeniería de un puente fuerte de palitos de helado: triángulos, caminos de carga y uniones, en una guía paso a paso para jóvenes.",
    "math-games-that-make-learning-fun":
      "Seis juegos que convierten la práctica de matemáticas en diversión, de 2.º a 5.º grado. Desarrolla sentido numérico, fracciones y lógica sin hojas sueltas.",
    "what-is-ai-explaining-to-kids":
      "La inteligencia artificial explicada para niños. Aprende cómo la IA aprende de los datos, dónde ya está en la vida diaria y cómo pensar críticamente sobre ella.",
    "why-every-kid-should-learn-to-code":
      "Programar enseña resolución de problemas, creatividad y lógica. Aprende cómo iniciar a tu hijo en Python paso a paso, sin ninguna experiencia previa.",
    "why-triangles-are-an-engineers-secret-weapon":
      "El triángulo es la forma más fuerte en ingeniería. Descubre por qué se usan triángulos en puentes, celosías y torres, y cómo aplicarlo en tu puente de palitos.",
    "how-engineers-think-when-something-breaks":
      "Cuando una estructura falla, te da información. Conoce la mentalidad de ingeniería que convierte una construcción rota en un segundo intento más fuerte.",
    "design-a-mars-rover-out-of-cardboard":
      "Un reto de ingeniería para niños: diseña un rover marciano de cartón con objetivos, restricciones y preguntas reales, como los ingenieros de la NASA.",
    "what-is-ai-actually-doing-when-it-answers-you":
      "La IA no busca en internet ni consulta datos guardados: predice texto probable a partir de patrones. Esto es lo que significa y por qué puede equivocarse.",
    "how-to-think-like-an-inventor-in-20-minutes":
      "Un reto de diseño de 20 minutos para niños: encuentra un problema real, dibuja una solución, construye un prototipo y pruébalo, como en los talleres de Avanza.",
    "why-your-first-design-is-usually-not-your-best-one":
      "La ingeniería mejora con pruebas y observación, no con planes perfectos. Mira cómo un grupo de estudiantes usó una prueba de puente para saber qué mejorar.",
    "the-engineering-of-a-backpack":
      "Tu mochila resuelve una docena de problemas de ingeniería a la vez. Explora cómo las correas, los cierres, los materiales y los bolsillos son decisiones.",
    "what-makes-a-stem-workshop-fun":
      "Una mirada tras bambalinas a cómo Avanza STEM diseña actividades para que los estudiantes construyan, prueben y descubran, en lugar de solo mirar y escuchar.",
    "engineering-inside-school-bus":
      "Un autobús escolar está lleno de decisiones de ingeniería. Descubre cómo el color, los asientos, los espejos y las salidas de emergencia protegen a los niños.",
    "why-airplane-wings-are-curved":
      "Las alas de avión son curvas porque la forma controla el flujo de aire. Descubre cómo el perfil alar crea sustentación y mantiene al avión en el cielo.",
    "how-elevators-know-where-to-go":
      "Los ascensores usan botones, sensores, motores, contrapesos y lógica de control para mover personas con seguridad. Así funciona todo tras ese simple botón.",
    "why-buildings-sway-in-wind":
      "Sí, los edificios altos se balancean con el viento, y están diseñados así. Descubre cuánto se mueven y por qué la flexibilidad los hace más seguros.",
    "engineering-behind-soccer-ball":
      "Un balón de fútbol es un sistema cuidadosamente diseñado. La forma, la presión de aire, los paneles y los materiales cambian cómo rueda, rebota y se curva.",
    "why-manhole-covers-are-round":
      "Las tapas de alcantarilla son redondas porque esa forma es segura, fuerte, fácil de mover e imposible de dejar caer por el hueco. Un diseño, varios problemas.",
    "how-roller-coasters-stay-on-track":
      "Las montañas rusas usan gravedad, impulso, ruedas que sujetan el riel por tres lados y curvas bien diseñadas para no salirse, incluso de cabeza. Así funciona.",
    "why-chairs-break":
      "La resistencia de una silla depende del reparto del peso, el material, la calidad de las uniones y la forma. Descubre por qué una silla floja es una alerta.",
    "hidden-engineering-water-bottle":
      "Las botellas de plástico de un solo uso son maravillas ligeras de ingeniería, pero su diseño en PET, la rosca del tapón y los microplásticos traen compromisos.",
    "can-ai-actually-think":
      "La IA responde preguntas, escribe historias y ayuda a aprender. ¿Pero piensa de verdad? Descubre cómo usa el reconocimiento de patrones y en qué se diferencia.",
    "why-ai-sometimes-gets-things-wrong":
      "La IA hace predicciones basadas en patrones. Descubre por qué da respuestas seguras pero equivocadas, qué son las alucinaciones y cómo verificar lo que dice.",
    "how-does-your-phone-recognize-your-face":
      "Tu teléfono usa cámaras, sensores y aprendizaje automático para comparar patrones de rostro, no para entenderte. Así funciona y por qué importa la privacidad.",
    "why-does-autocorrect-make-weird-mistakes":
      "El autocorrector predice palabras según patrones. Descubre por qué cambia palabras correctas, falla con nombres y jerga, y cómo se relaciona con la IA.",
    "what-happens-when-you-ask-ai-a-question":
      "Cuando le haces una pregunta a la IA, sigue un proceso de instrucción, entrenamiento y predicción. Conoce cada paso y por qué ayudan las preguntas claras.",
    "should-kids-trust-everything-ai-says":
      "La IA puede ser útil y creativa, pero también equivocarse. Aprende a pensar como detective con la IA, qué temas requieren cuidado y cómo cuidar tu privacidad.",
    "how-do-video-games-use-ai":
      "Los videojuegos usan IA para mover enemigos, decidir acciones de los NPC y ajustar la dificultad. Descubre cómo las reglas los hacen parecer inteligentes.",
    "is-a-robot-the-same-thing-as-ai":
      "Un robot es una máquina física; la IA es software que decide. Pueden trabajar juntos, pero son distintos. Conoce los sensores, motores y qué hace cada parte.",
    "how-do-robots-know-where-they-are":
      "Los robots usan cámaras, sensores de ruedas, GPS, lidar y más para estimar su posición. Descubre cómo perciben, mapean y navegan el mundo que los rodea.",
    "why-robots-are-bad-at-easy-human-tasks":
      "Doblar ropa y abrir puertas es simple para las personas y muy difícil para los robots. Descubre por qué las tareas cotidianas son un reto para la robótica.",
    "what-makes-a-robot-a-robot":
      "Un robot percibe con sensores, decide con un controlador y actúa con actuadores. Conoce las tres partes que definen a un robot y por qué no debe parecer humano.",
    "how-mars-rovers-drive-without-a-driver":
      "Marte está demasiado lejos para un control remoto. Descubre cómo los rovers usan cámaras, ruedas, instrucciones desde la Tierra y navegación autónoma.",
    "why-robot-hands-are-so-hard-to-make":
      "Agarrar objetos distintos exige movimiento, fuerza, suavidad y tacto a la vez. Descubre por qué las manos robóticas son uno de los mayores retos de la robótica.",
    "how-factory-robots-build-cars":
      "Los robots de fábrica sueldan, pintan y mueven piezas con precisión. Descubre cómo se programan los brazos robóticos y cómo trabajan junto a las personas.",
    "why-is-the-sky-blue-but-sunsets-are-orange":
      "El cielo se ve azul de día, pero al atardecer se vuelve naranja o rojo. Descubre cómo la luz solar, el aire y la dispersión crean ambos colores.",
    "why-do-your-ears-pop-on-an-airplane":
      "Los oídos se tapan en el avión porque la presión del aire cambia al subir o aterrizar. Descubre cómo el tímpano y la trompa de Eustaquio equilibran la presión.",
    "why-does-metal-feel-colder-than-wood":
      "El metal y la madera pueden estar a la misma temperatura, pero el metal se siente más frío porque roba calor más rápido. Así funciona la conductividad térmica.",
    "why-do-bikes-stay-balanced-when-moving":
      "Las bicicletas se mantienen en equilibrio por el movimiento, la dirección, el diseño de las ruedas y las correcciones del ciclista. Conoce la física detrás.",
    "why-do-we-slip-on-ice":
      "El hielo resbala porque tiene poca fricción, y una fina capa de agua hace aún más difícil que tus zapatos agarren. Descubre la ciencia detrás del resbalón.",
    "how-do-noise-canceling-headphones-work":
      "Los audífonos con cancelación de ruido usan micrófonos y ondas sonoras opuestas para reducir el ruido antes de que llegue a tus oídos. Así funciona la física.",
    "why-do-some-things-float-and-others-sink":
      "Flotar o hundirse depende de la densidad, la forma y cuánta agua desplaza un objeto. Descubre por qué un barco de acero flota y una piedra pequeña se hunde.",
    "why-do-magnets-stick-to-some-metals-but-not-others":
      "Los imanes se pegan al hierro, el acero y el níquel porque sus regiones magnéticas se alinean. El cobre y el aluminio no funcionan igual. Descubre por qué.",
  },
  zh: {
    "5-easy-science-experiments":
      "用家里常见的材料在家做 5 个简单的科学实验。安全、有趣又有教育意义，适合二年级以上的孩子。",
    "building-a-community-stem-workshops":
      "看看免费 STEM 工作坊如何改变新泽西西班牙裔社区的生活，以及如何把这样的工作坊带到你的社区。",
    "getting-started-with-lego-robotics":
      "乐高机器人套件是很好的 STEM 入门方式。了解该选哪一套、孩子能学到什么，以及如何在家开始。",
    "how-to-build-the-strongest-popsicle-stick-bridge":
      "了解坚固冰棍棒桥背后的工程秘密：三角形、传力路径和胶接点，一步步带小小工程师把桥搭起来。",
    "math-games-that-make-learning-fun":
      "六个把数字练习变成游戏的数学游戏，适合二到五年级。培养数感、分数和逻辑，不需要练习册。",
    "what-is-ai-explaining-to-kids":
      "为孩子讲解人工智能。了解 AI 如何从数据中学习、它已经出现在生活的哪些地方，以及如何批判地看待它。",
    "why-every-kid-should-learn-to-code":
      "编程培养解决问题的能力、创造力和逻辑思维。了解如何带孩子从 Python 开始，零基础也可以。",
    "why-triangles-are-an-engineers-secret-weapon":
      "三角形是工程中最坚固的形状。了解桥梁、桁架和高塔为什么使用三角形，以及如何用在你的冰棍棒桥上。",
    "how-engineers-think-when-something-breaks":
      "结构失效时也会给你信息。了解工程师的思维方式，把一次失败的搭建变成更结实的第二次尝试。",
    "design-a-mars-rover-out-of-cardboard":
      "给孩子的动手工程挑战：用纸板设计火星车，带有真实的设计目标、限制条件和反思问题，就像 NASA 工程师那样。",
    "what-is-ai-actually-doing-when-it-answers-you":
      "AI 并不搜索互联网，也不查找存好的事实，而是根据模式预测可能的文字。了解这意味着什么，以及它为什么会出错。",
    "how-to-think-like-an-inventor-in-20-minutes":
      "给孩子的 20 分钟设计挑战：找到真实问题、画出方案、做出粗略原型并测试，这就是 Avanza STEM 的发明循环。",
    "why-your-first-design-is-usually-not-your-best-one":
      "工程靠测试和观察进步，而不是靠完美的计划。看一组学生如何通过桥梁测试，弄清下一步要改进什么。",
    "the-engineering-of-a-backpack":
      "你的书包同时解决了十几个工程问题。看看背带、拉链、材料和口袋如何都是刻意的设计决定。",
    "what-makes-a-stem-workshop-fun":
      "幕后揭秘 Avanza STEM 如何设计活动，让学生真正动手搭建、测试和发现，而不是只看别人讲解。",
    "engineering-inside-school-bus":
      "校车里藏着许多工程决定。了解颜色、座椅、后视镜、转弯半径和紧急出口如何一起把孩子安全送达。",
    "why-airplane-wings-are-curved":
      "飞机机翼是弯的，因为形状决定气流。了解翼型设计如何产生升力，以及让飞机留在空中的为什么是机翼。",
    "how-elevators-know-where-to-go":
      "电梯依靠按钮、传感器、电机、配重和控制逻辑安全运送乘客。了解按下按钮之后整个系统如何运作。",
    "why-buildings-sway-in-wind":
      "高楼是故意会晃的。了解柔性为什么让摩天大楼在大风和地震中更安全，以及工程师如何用调谐质量阻尼器减晃。",
    "engineering-behind-soccer-ball":
      "足球是一个精心设计的系统。形状、气压、拼块设计和材料都会影响它如何滚动、弹跳和在空中拐弯。",
    "why-manhole-covers-are-round":
      "井盖是圆的，因为这个形状安全、结实、容易搬动，而且不会掉进洞里。一个设计同时解决多个问题。",
    "how-roller-coasters-stay-on-track":
      "过山车利用重力、动量、从三面夹住轨道的车轮和精心设计的环形轨道留在轨道上，即使倒过来也不掉。",
    "why-chairs-break":
      "椅子的强度取决于受力分布、材料选择、接头质量和形状。了解为什么摇晃的椅子是危险信号。",
    "hidden-engineering-water-bottle":
      "一次性塑料水瓶是轻量化的工程杰作，但 PET 设计、瓶盖螺纹、微塑料和废弃物都带来取舍。",
    "can-ai-actually-think":
      "AI 能回答问题、写故事、帮你学习。但它真的在思考吗？了解 AI 如何做模式识别，以及它和人脑的区别。",
    "why-ai-sometimes-gets-things-wrong":
      "AI 依靠模式做预测。了解它为什么会给出自信却错误的答案、什么是幻觉，以及如何核实 AI 说的话。",
    "how-does-your-phone-recognize-your-face":
      "手机用摄像头、传感器和机器学习比对人脸特征，而不是真的认识你。了解人脸识别原理和隐私为何重要。",
    "why-does-autocorrect-make-weird-mistakes":
      "自动更正根据模式预测词语。了解它为什么会改掉正确的词、为何搞不定名字和俚语，以及它与 AI 的关系。",
    "what-happens-when-you-ask-ai-a-question":
      "你向 AI 提问时，它会经过提示、训练和预测的过程。了解从问题到回答的每一步，以及清晰提问为何有用。",
    "should-kids-trust-everything-ai-says":
      "AI 有用又有创意，但也会出错。学会像侦探一样看待 AI、哪些话题要格外小心，以及如何保护隐私。",
    "how-do-video-games-use-ai":
      "电子游戏用 AI 控制敌人移动、NPC 选择和难度。了解行为规则如何让角色显得聪明，并试着设计你的游戏 AI。",
    "is-a-robot-the-same-thing-as-ai":
      "机器人是实体机器，AI 是做决定的软件。它们可以合作，但并不相同。了解传感器、电机和各部分的作用。",
    "how-do-robots-know-where-they-are":
      "机器人用摄像头、轮式传感器、GPS、激光雷达等估计自己的位置。了解机器人如何感知、建图并导航。",
    "why-robots-are-bad-at-easy-human-tasks":
      "叠衣服和开门对人很简单，对机器人却很难。了解日常任务为什么难住机器人，工程师又在如何解决。",
    "what-makes-a-robot-a-robot":
      "机器人用传感器感知、用控制器决策、用执行器行动。了解定义机器人的三个部分，以及它为何不必长得像人。",
    "how-mars-rovers-drive-without-a-driver":
      "火星太远，无法遥控驾驶。了解火星车如何用摄像头、轮子、来自地球的指令和自主导航探索另一颗行星。",
    "why-robot-hands-are-so-hard-to-make":
      "抓取不同物体需要同时具备运动、力量、轻柔和触觉。了解为什么机械手是机器人领域最难的挑战之一。",
    "how-factory-robots-build-cars":
      "工厂机器人以精准和稳定完成焊接、喷漆和搬运零件。了解机械臂如何编程、如何保证安全，以及如何与工人协作。",
    "why-is-the-sky-blue-but-sunsets-are-orange":
      "白天天空是蓝的，日落时却变成橙色或红色。了解阳光、空气分子和散射如何共同造出这两种颜色。",
    "why-do-your-ears-pop-on-an-airplane":
      "坐飞机耳朵会堵，是因为爬升和降落时气压变化。了解鼓膜和咽鼓管如何平衡耳内外的压力。",
    "why-does-metal-feel-colder-than-wood":
      "金属和木头可以是同一温度，但金属摸起来更冷，因为它把手上的热量带走得更快。了解热导率的原理。",
    "why-do-bikes-stay-balanced-when-moving":
      "自行车靠运动、转向、车轮设计和骑车人不断的细微修正保持平衡。了解自行车稳定性背后的物理。",
    "why-do-we-slip-on-ice":
      "冰很滑，是因为摩擦力小，而薄薄一层水会让鞋子更难抓地。了解打滑背后的科学原理。",
    "how-do-noise-canceling-headphones-work":
      "降噪耳机用麦克风和相反的声波，在噪音进入耳朵之前把它抵消。了解背后的声波物理原理。",
    "why-do-some-things-float-and-others-sink":
      "浮起还是下沉取决于密度、形状，以及物体排开多少水。了解为什么钢铁做的船会浮，而一块小石头会沉。",
    "why-do-magnets-stick-to-some-metals-but-not-others":
      "磁铁能吸住铁、钢和镍，因为这些金属内部的微小磁畴会排列整齐。铜和铝则不一样。了解其中原因。",
  },
  pt: {
    "5-easy-science-experiments":
      "Faça 5 experimentos de ciências fáceis em casa com materiais que você já tem. Atividades seguras, divertidas e educativas para crianças a partir do 2º ano.",
    "building-a-community-stem-workshops":
      "Descubra como as oficinas de STEM gratuitas estão mudando vidas em comunidades hispânicas de Nova Jersey e como levar uma para o seu próprio bairro.",
    "getting-started-with-lego-robotics":
      "Os kits de robótica LEGO são uma ótima porta de entrada para o STEM. Veja qual kit escolher, o que seu filho vai aprender e como começar em casa passo a passo.",
    "how-to-build-the-strongest-popsicle-stick-bridge":
      "Conheça os segredos de engenharia de uma ponte forte de palitos de picolé: triângulos, caminhos de carga e emendas, em um guia passo a passo para jovens.",
    "math-games-that-make-learning-fun":
      "Seis jogos que transformam a prática de matemática em diversão, do 2º ao 5º ano. Desenvolva senso numérico, frações e lógica sem folhas de exercícios.",
    "what-is-ai-explaining-to-kids":
      "A inteligência artificial explicada para crianças. Veja como a IA aprende com dados, onde ela já está no dia a dia e como pensar sobre ela com senso crítico.",
    "why-every-kid-should-learn-to-code":
      "Programar ensina resolução de problemas, criatividade e lógica. Veja como iniciar seu filho no Python passo a passo, sem nenhuma experiência prévia.",
    "why-triangles-are-an-engineers-secret-weapon":
      "O triângulo é a forma mais firme da engenharia. Descubra por que pontes, treliças e torres usam triângulos, e como aplicar isso na sua ponte de palitos.",
    "how-engineers-think-when-something-breaks":
      "Quando uma estrutura falha, ela te dá informação. Conheça a mentalidade de engenharia que transforma uma construção quebrada em uma segunda tentativa melhor.",
    "design-a-mars-rover-out-of-cardboard":
      "Um desafio de engenharia para crianças: projete um rover de Marte de papelão com objetivos, restrições e perguntas reais, como os engenheiros da NASA.",
    "what-is-ai-actually-doing-when-it-answers-you":
      "A IA não busca na internet nem consulta dados guardados: ela prevê o texto provável a partir de padrões. Veja o que isso significa e por que ela pode errar.",
    "how-to-think-like-an-inventor-in-20-minutes":
      "Um desafio de criação de 20 minutos para crianças: ache um problema real, desenhe uma solução, monte um protótipo e teste, como nas oficinas da Avanza.",
    "why-your-first-design-is-usually-not-your-best-one":
      "A engenharia melhora com testes e observação, não com planos perfeitos. Veja como um grupo de estudantes usou um teste de ponte para saber o que melhorar.",
    "the-engineering-of-a-backpack":
      "Sua mochila resolve uma dúzia de problemas de engenharia ao mesmo tempo. Explore como alças, zíperes, materiais e bolsos são decisões de projeto.",
    "what-makes-a-stem-workshop-fun":
      "Um olhar dos bastidores sobre como a Avanza STEM planeja atividades para que os estudantes construam, testem e descubram, em vez de só olhar e escutar.",
    "engineering-inside-school-bus":
      "Um ônibus escolar é cheio de decisões de engenharia. Descubra como a cor, os bancos, os espelhos e as saídas de emergência protegem as crianças.",
    "why-airplane-wings-are-curved":
      "As asas dos aviões são curvas porque a forma controla o fluxo de ar. Descubra como o perfil aerodinâmico cria sustentação e mantém o avião no céu.",
    "how-elevators-know-where-to-go":
      "Os elevadores usam botões, sensores, motores, contrapesos e lógica de controle para transportar pessoas com segurança. Veja o que há por trás do botão.",
    "why-buildings-sway-in-wind":
      "Sim, os prédios altos balançam com o vento, e eles são projetados assim. Descubra quanto eles se movem e por que a flexibilidade os deixa mais seguros.",
    "engineering-behind-soccer-ball":
      "Uma bola de futebol é um sistema cuidadosamente projetado. A forma, a pressão do ar, os gomos e os materiais mudam como ela rola, quica e faz curva.",
    "why-manhole-covers-are-round":
      "As tampas de bueiro são redondas porque essa forma é segura, resistente, fácil de mover e impossível de cair no buraco. Um desenho, vários problemas.",
    "how-roller-coasters-stay-on-track":
      "As montanhas-russas usam gravidade, impulso, rodas que agarram o trilho por três lados e curvas bem projetadas para não sair, mesmo de cabeça para baixo.",
    "why-chairs-break":
      "A resistência de uma cadeira depende da distribuição do peso, do material, da qualidade das junções e da forma. Veja por que uma cadeira bamba é um alerta.",
    "hidden-engineering-water-bottle":
      "As garrafas plásticas descartáveis são maravilhas leves da engenharia, mas o projeto em PET, a rosca da tampa e os microplásticos têm um custo.",
    "can-ai-actually-think":
      "A IA responde perguntas, escreve histórias e ajuda a aprender. Mas será que ela pensa? Descubra como ela usa reconhecimento de padrões e no que isso difere.",
    "why-ai-sometimes-gets-things-wrong":
      "A IA faz previsões com base em padrões. Descubra por que ela dá respostas confiantes mas erradas, o que são alucinações e como conferir o que ela diz.",
    "how-does-your-phone-recognize-your-face":
      "Seu celular usa câmeras, sensores e aprendizado de máquina para comparar padrões do rosto, não para entender você. Veja como funciona e por que a privacidade importa.",
    "why-does-autocorrect-make-weird-mistakes":
      "O corretor automático prevê palavras por padrões. Descubra por que ele troca palavras certas, se atrapalha com nomes e gírias, e como isso se liga à IA.",
    "what-happens-when-you-ask-ai-a-question":
      "Quando você faz uma pergunta à IA, ela segue um processo de instrução, treinamento e previsão. Conheça cada etapa e por que perguntas claras ajudam.",
    "should-kids-trust-everything-ai-says":
      "A IA pode ser útil e criativa, mas também pode errar. Aprenda a pensar como detetive com a IA, quais assuntos pedem cuidado e como proteger sua privacidade.",
    "how-do-video-games-use-ai":
      "Os videogames usam IA para mover inimigos, decidir as ações dos NPCs e ajustar a dificuldade. Descubra como as regras os fazem parecer inteligentes.",
    "is-a-robot-the-same-thing-as-ai":
      "Um robô é uma máquina física; a IA é um software que decide. Eles podem trabalhar juntos, mas são diferentes. Conheça sensores, motores e o papel de cada parte.",
    "how-do-robots-know-where-they-are":
      "Os robôs usam câmeras, sensores nas rodas, GPS, lidar e mais para estimar a própria posição. Descubra como eles percebem, mapeiam e navegam pelo mundo.",
    "why-robots-are-bad-at-easy-human-tasks":
      "Dobrar roupa e abrir portas é simples para as pessoas e muito difícil para os robôs. Descubra por que as tarefas do dia a dia desafiam a robótica.",
    "what-makes-a-robot-a-robot":
      "Um robô percebe com sensores, decide com um controlador e age com atuadores. Conheça as três partes que definem um robô e por que ele não precisa ser humanoide.",
    "how-mars-rovers-drive-without-a-driver":
      "Marte está longe demais para controle remoto. Descubra como os rovers usam câmeras, rodas, instruções vindas da Terra e navegação autônoma.",
    "why-robot-hands-are-so-hard-to-make":
      "Segurar objetos diferentes exige movimento, força, delicadeza e tato ao mesmo tempo. Descubra por que as mãos robóticas são um dos maiores desafios da robótica.",
    "how-factory-robots-build-cars":
      "Os robôs de fábrica soldam, pintam e movem peças com precisão. Descubra como os braços robóticos são programados e como eles trabalham ao lado das pessoas.",
    "why-is-the-sky-blue-but-sunsets-are-orange":
      "O céu parece azul de dia, mas no fim da tarde fica laranja ou vermelho. Descubra como a luz do sol, o ar e o espalhamento criam as duas cores.",
    "why-do-your-ears-pop-on-an-airplane":
      "Os ouvidos tampam no avião porque a pressão do ar muda na subida e na descida. Descubra como o tímpano e a tuba auditiva equilibram a pressão.",
    "why-does-metal-feel-colder-than-wood":
      "O metal e a madeira podem estar na mesma temperatura, mas o metal parece mais frio porque rouba calor mais rápido. É assim que funciona a condução térmica.",
    "why-do-bikes-stay-balanced-when-moving":
      "As bicicletas se equilibram pelo movimento, pela direção, pelo desenho das rodas e pelas correções de quem pedala. Conheça a física por trás disso.",
    "why-do-we-slip-on-ice":
      "O gelo escorrega porque tem pouco atrito, e uma fina camada de água dificulta ainda mais a aderência dos sapatos. Descubra a ciência do escorregão.",
    "how-do-noise-canceling-headphones-work":
      "Os fones com cancelamento de ruído usam microfones e ondas sonoras opostas para reduzir o barulho antes que ele chegue aos ouvidos. Veja a física por trás.",
    "why-do-some-things-float-and-others-sink":
      "Flutuar ou afundar depende da densidade, da forma e de quanta água o objeto desloca. Descubra por que um navio de aço flutua e uma pedrinha afunda.",
    "why-do-magnets-stick-to-some-metals-but-not-others":
      "Os ímãs grudam no ferro, no aço e no níquel porque as regiões magnéticas deles se alinham. Cobre e alumínio não funcionam assim. Descubra o motivo.",
  },
}
