import type { Language } from "@/i18n/translations"

export type ProjectCategoryKey =
  | "engineering"
  | "science"
  | "coding"
  | "robotics"
  | "math"
  | "ai"
  | "optics"

/**
 * Real step-by-step photos for a project guide.
 *
 * Adding a new step photo:
 * 1. Save the photo under `public/images/projects/<slug>/step-<n>-<short-description>.<ext>`
 *    (e.g. `public/images/projects/popsicle-stick-bridge/step-3-glue-triangles.jpg`).
 * 2. Add an entry to that project's `stepImages` array (per language, if the
 *    photo includes language-specific labels/text) with the matching `step`
 *    number and a specific, descriptive `alt` string in the style
 *    "Step 3: gluing the first truss triangle of the popsicle stick bridge".
 * 3. Never use vague alt text like "image", "photo", or "step image".
 *
 * Do not invent placeholder photos - leave `stepImages` undefined/empty for
 * steps that don't have a real photo yet. Guide components render step
 * photos only when an entry exists, so an empty array is always safe.
 */
export type ProjectStepImage = {
  /** 1-based position matching the corresponding entry in `steps`. */
  step: number
  src: string
  /** Descriptive alt text, e.g. "Step 3: gluing the first truss triangle of the popsicle stick bridge". */
  alt: string
}

/**
 * A printable, blank data table rendered at the end of a guide.
 *
 * Projects that ask a student to measure something across several attempts
 * need somewhere to write the numbers down, and a scored project without a
 * record of the earlier attempts is just a demo. `columns` are the headings;
 * `rows` is how many blank rows to print. Guides render this only when the
 * field is present, so omitting it stays the default.
 */
export type ProjectRecordSheet = {
  title: string
  intro: string
  columns: string[]
  rows: number
  footnote?: string
}

/**
 * A starter program shown on a coding guide, rendered as a read-only block
 * after the steps. Kept as data rather than markup so it translates with the
 * rest of the guide: the code itself stays the same across languages, but the
 * strings the program prints, and the surrounding copy, do not.
 */
export type ProjectCodeBlock = {
  title: string
  intro: string
  code: string
  note?: string
}

/**
 * A reference video embedded after the steps. `videoId` is the YouTube id
 * only, never a full URL, so the renderer can pin the privacy-preserving
 * youtube-nocookie host. `startSeconds` honours a timestamp from the source
 * link. `title` is used as the iframe's accessible name.
 */
export type ProjectVideo = {
  videoId: string
  title: string
  startSeconds?: number
  caption?: string
}

export type ProjectGuide = {
  slug: string
  title: string
  category: string
  categoryKey: ProjectCategoryKey
  difficulty: string
  time: string
  /**
   * Hero photo for the guide. An empty string means no authentic photo exists
   * yet: guides and cards then render a plain graph-paper panel rather than a
   * stock or AI-generated stand-in, and the image is dropped from the page's
   * OpenGraph, JSON-LD, and sitemap entries instead of pointing at nothing.
   */
  image: string
  description: string
  introduction: string[]
  why: string
  materials: string[]
  steps: string[]
  /** Optional photos illustrating individual steps, shown inline with the matching step. */
  stepImages?: ProjectStepImage[]
  safety: string
  challenge: string
  /** Optional starter program, rendered after the steps. */
  codeBlock?: ProjectCodeBlock
  /** Optional reference video, rendered after the steps. */
  video?: ProjectVideo
  /** Optional printable blank data table, rendered after the steps. */
  recordSheet?: ProjectRecordSheet
}

const codingThumbnailImage =
  "https://res.cloudinary.com/dw4uprmkk/image/upload/f_auto,q_auto:good,w_1600/gallery-00187.jpg"

const localizedProjectGuides: Record<Language, ProjectGuide[]> = {
  en: [
    {
      slug: "popsicle-stick-bridge",
      title: "Popsicle Stick Truss Bridge",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Easy",
      time: "1-2 hours",
      image: "/images/home/featured-bridge.jpg",
      description:
        "Build a popsicle stick truss bridge with Warren truss triangles, then load test it to see compression and tension in action.",
      introduction: [
        "Bridge engineers do not just glue random pieces together. They design truss bridges that guide forces through a smart pattern of triangles.",
        "In this step-by-step STEM project, your popsicle sticks turn into a Warren-style truss bridge with named parts, force paths, and a load test at the end.",
      ],
      why:
        "A truss bridge spreads force through triangles. The top chord often gets squeezed in compression, the bottom chord gets pulled in tension, and the diagonal web members help move the load across the whole structure.",
      materials: [
        "90 or more popsicle sticks",
        "Hot glue gun and glue sticks",
        "A ruler",
        "A marker or pen",
        "Scissors or sturdy craft cutters",
        "Two sturdy supports for testing, like chairs or tables",
        "Weights for testing, like books or gym plates",
      ],
      steps: [
        "Mark about 16 sticks at the quarter points so your joints line up neatly.",
        "Cut 4 of those sticks in half and use them to splice whole sticks into 2 long rails.",
        "Build the first side truss with 4 triangles, then add 3 more staggered triangles between them.",
        "Flip the truss, glue on the top rail, and sandwich the triangles with another layer of sticks.",
        "Repeat the same layout to build a second matching side truss.",
        "Let both sides harden, then connect them with cross pieces while keeping the bridge square.",
        "Add diagonal braces, let the glue set again, and test the bridge slowly between two supports.",
      ],
      safety:
        "Ask an adult for help with the hot glue gun and when cutting sticks. Fresh glue and the glue tip get very hot, and testing should happen slowly so weights or feet do not slip off the bridge.",
      challenge:
        "Try keeping the same truss pattern but using fewer sticks, then compare how much weight the lighter bridge can still hold.",
    },
    {
      slug: "lego-robot-builder",
      title: "LEGO SPIKE Prime Super Cleanup Robot Guide",
      category: "Robotics",
      categoryKey: "robotics",
      difficulty: "Medium",
      time: "2-3 hours",
      image: "/images/shared/lego-robotics.jpeg",
      description:
        "Build a LEGO SPIKE Prime Super Cleanup-style grabber robot, then program, troubleshoot, and test how well it picks up different objects.",
      introduction: [
        "This project is not just any robot. You are building a grabber-style cleanup machine inspired by LEGO Education's SPIKE Prime Super Cleanup activity.",
        "Avanza STEM is not affiliated with LEGO, but this guide helps students understand the compatible build idea, setup steps, code logic, and troubleshooting behind the lesson.",
      ],
      why:
        "A grabber robot mixes mechanics and programming. The base must stay balanced, the motor must transfer motion into the claw, and the code must tell the machine when to drive, grab, and release.",
      materials: [
        "LEGO Education SPIKE Prime set #45678 or a similar LEGO robotics kit",
        "SPIKE Prime hub",
        "1 large angular motor",
        "1 force sensor",
        "Technic beams, pins, axles, and wheels",
        "Small test objects like crumpled paper, an apple or ball, and a block",
      ],
      steps: [
        "Open the official Super Cleanup lesson and the build books before you begin.",
        "Sort the hub, motor, sensor, wheels, beams, pins, and axles into easy-to-see groups.",
        "Build the wide rolling base first so the robot stays balanced.",
        "Add the front tower and grabber arm support.",
        "Mount the motor, sensor, and front jaws so the robot can grip objects.",
        "Load a simple cleanup routine that tells the robot to grab, move, and release.",
        "Run fair tests with different objects and compare what works best.",
      ],
      safety:
        "Keep tiny LEGO parts away from little brothers, sisters, and pets because they can be a choking hazard. Ask an adult for help charging the hub, connecting cables, and handling any battery-related parts safely.",
      challenge:
        "Compare two different grabber jaw shapes and record which one works better on round, squishy, or rigid objects.",
    },
    {
      slug: "coke-mentos-experiment",
      title: "Coke and Mentos Science Project",
      category: "Science",
      categoryKey: "science",
      difficulty: "Easy",
      time: "30 minutes",
      image: "/images/home/coke-mentos-science-experiment-kids.jpg",
      description:
        "Turn the Coke and Mentos geyser into a science fair project with a hypothesis, variables, data table, and safe comparison tests.",
      introduction: [
        "Get ready for a sky-high splash because this Coke and Mentos science project can make soda shoot up like a rocket fountain.",
        "It is exciting to watch, and with careful variables and measurements, it can become a real science fair experiment instead of just a one-time demo.",
      ],
      why:
        "Soda has carbon dioxide gas dissolved inside it. Mentos candies have lots of tiny bumps that give the gas many places to escape at once, a process called nucleation, so the soda rushes out fast. Diet Coke usually works better than regular Coke because it has less sugar and is not as thick, so the bubbles can race upward more easily and make a taller geyser.",
      materials: [
        "1 two-liter bottle of Diet Coke or other soda",
        "1 roll of Mentos",
        "An open outdoor space",
        "Safety goggles",
        "A piece of paper or an index card",
        "Optional: a tube or paper roll to help drop the Mentos together",
      ],
      steps: [
        "Go outside to an open area like a driveway or yard and put on safety goggles.",
        "Set the soda bottle on flat ground where it will not tip over.",
        "Open the bottle and get your Mentos ready as quickly as you can.",
        "Stack 5 or 6 Mentos in a paper tube or hold them above the bottle opening with an index card under them.",
        "Pull the card away so all the Mentos drop in at the same time.",
        "Step back right away and watch the soda fountain blast upward.",
        "Talk about what happened and measure which soda or number of Mentos made the biggest geyser.",
      ],
      safety:
        "Do this experiment only outside and stand back as soon as the Mentos drop in. Never point the bottle at people, and do not drink the soda after the experiment.",
      challenge:
        "Test two different sodas and compare which one makes the taller fountain.",
    },
    {
      slug: "my-first-python-program",
      title: "First Python Quiz Game for Kids",
      category: "Coding",
      categoryKey: "coding",
      difficulty: "Easy",
      time: "1 hour",
      image: codingThumbnailImage,
      description:
        "Copy, paste, and customize a beginner Python quiz game for kids while learning print(), input(), variables, and if statements.",
      introduction: [
        "Coding is like giving super-clear instructions to a computer so it can do something useful or fun for you.",
        "This beginner Python project is built for kids and first-time coders: you will copy a starter quiz game, run it, then customize the questions and score.",
      ],
      why:
        "Computer programs follow instructions one step at a time. Python uses commands like `print()` to show messages, `input()` to collect answers, and variables to remember information such as a score.",
      materials: [
        "A computer or tablet with internet access",
        "A Python website or app, like Replit or Trinket",
        "Paper to plan your questions",
        "A keyboard",
        "Curiosity and patience",
      ],
      steps: [
        "Open a beginner-friendly Python editor online and start a new project.",
        "Type a `print()` line to welcome the player to your quiz game.",
        "Make a score variable and set it to 0 so your game can count points.",
        "Use `input()` to ask the player a question and store the answer in a variable.",
        "Add an `if` statement to check whether the answer is correct.",
        "Increase the score when the player gets a question right, then show the new score with `print()`.",
        "Run your program, test it, and fix any mistakes until your quiz works smoothly.",
      ],
      safety:
        "Only use trusted coding websites and ask an adult before making accounts online. Do not share your real name, address, or passwords inside your program or in chat boxes.",
      challenge:
        "Add three questions instead of one and make your game print a special message if the player gets a perfect score.",
    },
    {
      slug: "baking-soda-volcano",
      title: "Baking Soda Volcano",
      category: "Science",
      categoryKey: "science",
      difficulty: "Easy",
      time: "1 hour",
      image: "/images/projects/baking-soda-volcano/cover.jpg",
      description:
        "Build a mini volcano and trigger a bubbly eruption with a classic acid-and-base reaction.",
      introduction: [
        "Volcanoes are some of the most dramatic natural wonders on Earth, and now you can build one on your own table.",
        "This project is exciting because you get to mix ingredients, create an eruption, and watch chemistry in action.",
      ],
      why:
        "Baking soda is a base and vinegar is an acid. When they mix, they make a new gas called carbon dioxide, and that gas creates bubbling foam that pours out like an erupting volcano.",
      materials: [
        "Baking soda",
        "Vinegar",
        "A small plastic bottle or cup",
        "Play dough, clay, or aluminum foil",
        "Dish soap",
        "Food coloring",
        "A tray or pan for easy cleanup",
      ],
      steps: [
        "Place your bottle in the middle of a tray so your mess stays in one spot.",
        "Build a volcano shape around the bottle with clay, play dough, or foil, but keep the bottle opening clear.",
        "Put 2 or 3 spoonfuls of baking soda into the bottle.",
        "Add a squirt of dish soap and a few drops of food coloring.",
        "Pour vinegar into the bottle and watch the foamy lava rise up and spill over.",
        "Observe the bubbles closely and talk about the gas being made inside the bottle.",
        "Rinse the tray and try again with different amounts to see how the eruption changes.",
      ],
      safety:
        "Keep the mixture away from your eyes and wash your hands after the experiment. Ask an adult before using food coloring because it can stain clothes and tables.",
      challenge:
        "Try changing the amount of baking soda or vinegar and see which recipe makes the biggest eruption.",
    },
    {
      slug: "simple-circuit-light",
      title: "Simple Circuit Light",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Medium",
      time: "45-60 minutes",
      image: "/images/projects/simple-circuit-light/cover.jpg",
      description:
        "Build a real breadboard LED circuit with a resistor, jumper wires, and a small battery pack.",
      introduction: [
        "Flipping on a light feels ordinary, but inside that tiny click is a complete path for moving electric current.",
        "In this project, you will build a beginner electronics circuit on a breadboard, which lets you connect parts without soldering.",
        "You will also add a resistor in series with the LED. That resistor is important because it limits current so the LED does not burn out.",
      ],
      why:
        "Current flows from the battery's positive side, through a jumper wire, through the resistor, into the LED's long leg, out the LED's short leg, and back to the battery's negative side. The resistor and LED are in series because the current must pass through one and then the other in the same loop. If the LED is backwards, current cannot flow through it correctly and it may not light.",
      materials: [
        "1 small solderless breadboard",
        "1 LED",
        "1 resistor, 220 to 330 ohms",
        "1 low-voltage battery pack, such as 2 AA batteries with red and black leads",
        "3 jumper wires",
        "Optional: small switch for an extra challenge",
      ],
      steps: [
        "Place the breadboard in front of you. Find the red positive rail (+), the blue negative rail (-), and the middle rows where parts plug in.",
        "With the battery pack turned off or disconnected, plug the red battery lead into the + rail and the black battery lead into the - rail.",
        "Put one end of the resistor into the + rail. Put the other end into an empty breadboard row, such as row 10.",
        "Place the LED so the longer leg, called the anode, goes into the same row as the resistor end. Put the shorter leg, called the cathode, into a different row.",
        "Use a jumper wire to connect the LED's short-leg row back to the - rail. Now the resistor and LED are in one series path.",
        "Connect the battery or turn the battery pack on. The LED should light as current flows from +, through the resistor, through the LED, and back to -.",
        "If the LED does not light, disconnect the battery first, then flip the LED around or check that each part is plugged into the correct row.",
      ],
      stepImages: [
        {
          step: 6,
          src: "/images/projects/simple-circuit-light/step-6-lit-circuit.jpg",
          alt: "Step 6: lit LED on the breadboard circuit, with the longer anode lead and shorter cathode lead labeled where they connect to the resistor and negative rail",
        },
      ],
      safety:
        "Use only small low-voltage batteries and never plug your circuit into a wall outlet. Always include the resistor before powering the LED, and disconnect the battery before moving parts around.",
      challenge:
        "Add a small switch in series with the resistor and LED so you can open and close the circuit. You can also compare how the LED changes with a 220 ohm resistor versus a 330 ohm resistor.",
    },
    {
      slug: "elephant-toothpaste-experiment",
      title: "Elephant Toothpaste Experiment",
      category: "Science",
      categoryKey: "science",
      difficulty: "Medium",
      time: "30 minutes",
      image: "/images/projects/elephant-toothpaste-experiment/cover.jpg",
      description:
        "Watch a giant foam tower erupt from a single bottle as hydrogen peroxide breaks apart and releases oxygen in a spectacular exothermic reaction.",
      introduction: [
        "Elephant toothpaste gets its name because the foam that shoots out is so huge it looks like it could belong to an elephant. But this is not just a cool explosion. It is a real chemical reaction you can control.",
        "This experiment teaches you how catalysts speed up reactions, why heat is released when chemicals change, and how oxygen gas turns a liquid into an enormous pile of foam right before your eyes.",
      ],
      why:
        "Hydrogen peroxide naturally breaks down into water and oxygen gas, but it does so very slowly on its own. Adding a catalyst, like yeast mixed with warm water, gives the reaction a shortcut and makes it happen almost instantly. The oxygen gas escapes so quickly that it gets trapped inside the dish soap, creating thousands of bubbles stacked into thick foam. The reaction is also exothermic, meaning it releases heat you can feel when you touch the foam carefully after it settles.",
      materials: [
        "1/2 cup of 6% or 12% hydrogen peroxide (found at beauty supply stores)",
        "1 packet of dry active yeast",
        "3 tablespoons of warm water",
        "A squirt of dish soap",
        "A few drops of food coloring",
        "A 16-ounce or larger plastic bottle or graduated cylinder",
        "A tray or baking sheet for easy cleanup",
        "Safety goggles and gloves",
      ],
      steps: [
        "Put on safety goggles and gloves before handling the hydrogen peroxide.",
        "Set the bottle in the center of the tray so the foam stays contained.",
        "Add the dish soap and a few drops of food coloring directly into the bottle.",
        "Pour the hydrogen peroxide into the bottle and swirl it gently to mix.",
        "In a separate cup, stir the yeast packet into the warm water for about 30 seconds until it dissolves.",
        "Pour the yeast mixture quickly into the bottle and step back right away.",
        "Watch the foam shoot up fast and notice how warm it feels when you touch it carefully after it slows down.",
        "Discuss what happened: what was the catalyst, where did the heat come from, and what was inside all those bubbles?",
      ],
      safety:
        "Always have an adult handle and pour the hydrogen peroxide, which can irritate skin and eyes. Wear safety goggles and gloves throughout the experiment. The foam is warm and safe to touch after it fully settles, but do not let liquid contact eyes or skin during the reaction. Dispose of the foam and any leftover liquid by rinsing them down a drain with plenty of water.",
      challenge:
        "Try two different concentrations of hydrogen peroxide (3% from the drugstore and 6% or higher from a beauty supply store) and compare how tall each foam tower grows.",
    },
    {
      slug: "making-oobleck",
      title: "Making Oobleck",
      category: "Science",
      categoryKey: "science",
      difficulty: "Easy",
      time: "20 minutes",
      image: "/images/projects/making-oobleck/cover.jpg",
      description:
        "Mix just two ingredients to make a mysterious goop that flows like a liquid but turns solid when you squeeze it, and discover the science of non-Newtonian fluids.",
      introduction: [
        "Oobleck is named after a sticky substance in a Dr. Seuss story, and it is just as weird and unpredictable as it sounds. It runs through your fingers like water, but the moment you squeeze or hit it, it goes hard as a rock.",
        "This activity explores a fascinating class of materials called non-Newtonian fluids, and it only takes two ingredients and a few minutes to make a bowlful of science you can actually hold in your hands.",
      ],
      why:
        "Most liquids like water and juice flow at the same rate no matter how hard you push them. Oobleck is different because it is a non-Newtonian fluid, meaning its viscosity (how thick or runny it is) changes depending on pressure. When you push or hit the oobleck quickly, the cornstarch particles lock together and it behaves like a solid. When pressure is released, the particles separate and it flows like a liquid again. This property is called shear thickening, and engineers study materials like this for things like body armor and pothole filler.",
      materials: [
        "2 cups of cornstarch",
        "1 cup of water",
        "A few drops of food coloring (optional)",
        "A large mixing bowl",
        "A spoon or spatula",
        "A rimmed tray to contain the mess",
      ],
      steps: [
        "Pour the cornstarch into the large mixing bowl.",
        "Add the food coloring to the water if you want your oobleck to be colorful.",
        "Slowly pour the water into the cornstarch, stirring as you go. Do not add it all at once.",
        "Keep mixing until the oobleck has no dry lumps and feels strange to stir.",
        "Try poking the surface fast with your finger, then dipping your finger in slowly and notice the difference.",
        "Pick up a handful and squeeze it tight, then open your hand and let it drip.",
        "Talk about what you notice: when does it feel solid? When does it flow like a liquid?",
      ],
      safety:
        "Oobleck is made from food-safe ingredients and is safe to touch, but it can be very messy. Avoid pouring it down drains because cornstarch can build up inside pipes and cause clogs. Instead, let leftover oobleck dry out completely on the tray, then scrape it into the trash. Wash bowls and hands with warm water and let any residue dry before scraping it off.",
      challenge:
        "Try changing the ratio of cornstarch to water by adding a little more of each and notice how the texture changes. You can also place a bag of oobleck on a speaker and watch it dance when you play music with strong bass.",
    },
    {
      slug: "rubber-band-powered-car",
      title: "Rubber Band-Powered Car",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Easy",
      time: "1-2 hours",
      image: "/images/projects/rubber-band-powered-car.jpg",
      description:
        "A simple DIY car that moves without electricity or batteries, just the stored energy of a twisted rubber band powering the wheels and axle forward.",
      introduction: [
        "A rubber band-powered car is one of the most satisfying builds because you do all the work, wind it up, set it down, and then watch physics take over.",
        "You can build one from everyday materials and then start tweaking: change the rubber band, the wheels, or the car weight, and see exactly how each change affects how far it travels.",
      ],
      why:
        "The rubber band stores energy when it is twisted or wound up. When the car is released, the rubber band untwists and transfers that stored energy into the wheels or axle. This changes potential energy into kinetic energy, which is the energy of motion. The car moves best on a smooth, flat surface, and students can improve the design by changing the rubber band, wheels, car length, or car weight.",
      materials: [
        "Cardboard, foam board, or another lightweight material for the car body",
        "4 wheels such as bottle caps, cardboard circles, or small toy wheels",
        "2 wooden skewers, pencils, or straws for axles",
        "Straw pieces to hold the axles in place",
        "1–2 rubber bands",
        "Tape, glue, and scissors",
        "Optional: different wheel sizes or rubber bands for testing improvements",
      ],
      steps: [
        "Build the main body of the car using cardboard, foam board, or another lightweight material.",
        "Attach straw pieces to the bottom of the car body to hold the axles in place.",
        "Slide skewers, pencils, or straws through the axle holders.",
        "Attach the wheels carefully to each end of the axles, making sure they spin smoothly.",
        "Connect one end of the rubber band to the car body and the other end to the rear axle.",
        "Twist or wind the rubber band by turning the rear wheels or axle backward.",
        "Place the car on a smooth, flat surface.",
        "Release the car and watch it move forward using rubber band power.",
      ],
      safety:
        "Ask an adult for help with scissors and sharp skewers. Keep the rubber band away from your face when winding it up since it can snap back. Do not aim the car at anyone when releasing it.",
      challenge:
        "Can your car travel farther? Try a stronger or thicker rubber band, different wheel sizes, or a longer or shorter car body. Test whether a lighter car moves farther than a heavier one, and race against another team to see whose design wins.",
    },
    {
      slug: "lemon-powered-batteries",
      title: "Lemon-Powered Batteries",
      category: "Science",
      categoryKey: "science",
      difficulty: "Easy",
      time: "30-45 minutes",
      image: "/images/projects/lemon-powered-batteries.jpg",
      description:
        "Turn lemons into a real battery and light up an LED by discovering how chemical energy becomes electrical energy.",
      introduction: [
        "Did you know a lemon can power a light? It sounds impossible, but lemons contain acid that can kickstart a chemical reaction between two different metals and produce a small electric current.",
        "This project teaches you how real batteries work, why scientists pair different metals together, and what electrolytes do, all from something you can find in your kitchen.",
      ],
      why:
        "A lemon battery works because of a chemical reaction between two different metals and the acidic lemon juice. The zinc nail and copper piece act as electrodes, while the lemon juice acts as the electrolyte. Electrons move from the zinc through the wires to the copper, creating a small electric current. One lemon may not produce enough power for every device, so connecting multiple lemons in a chain increases the total voltage.",
      materials: [
        "2–4 lemons",
        "Copper coins, copper wire, or copper strips",
        "Zinc nails or galvanized nails (lightly sanded so the surface is clean)",
        "Alligator clip wires",
        "Small LED light, digital clock, or voltmeter",
        "Paper towels for cleanup",
      ],
      steps: [
        "Roll the lemons gently on a table to loosen the juice inside.",
        "Insert one zinc nail and one copper piece into each lemon, making sure they do not touch each other.",
        "Connect the copper piece from one lemon to the zinc nail of the next lemon using alligator clips.",
        "Continue connecting lemons in a chain if using multiple lemons.",
        "Attach the two free ends at either end of the chain to an LED, small digital clock, or voltmeter.",
        "Observe whether the device turns on or how much voltage the lemons produce.",
      ],
      safety:
        "The lemon juice is acidic and can sting if it gets in your eyes, so wash your hands after handling cut lemons. Ask an adult for help pushing nails into the lemons and when connecting the wires. Do not put the wires or clips in your mouth.",
      challenge:
        "Can you power an LED with more than one lemon? Try adding more lemons and see what changes. Swap the lemon for a potato, orange, or apple and compare which fruit produces the most voltage.",
    },
    {
      slug: "balloon-powered-car",
      title: "Balloon-Powered Car",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Easy",
      time: "1-2 hours",
      image: "/images/projects/balloon-powered-car.jpg",
      description:
        "Build a car that runs on air and discover how Newton's Third Law of Motion turns a simple balloon into a powerful engine.",
      introduction: [
        "A balloon-powered car uses the air rushing out of a balloon to push itself forward. When air escapes backward through a straw, the car moves forward. That is Newton's Third Law of Motion at work.",
        "You can build one from everyday recycled materials and then test how small changes in design, like wheel size, car weight, or how tightly the balloon is sealed, make it travel farther.",
      ],
      why:
        "When the balloon is inflated, it stores potential energy in the stretched rubber and compressed air. When the balloon is released, the air escapes backward through the straw. That backward push creates an equal and opposite reaction, pushing the car forward. The stored potential energy becomes kinetic energy, which is the energy of motion.",
      materials: [
        "Small piece of stiff cardboard or a plastic water bottle for the car body",
        "4 plastic bottle caps for wheels",
        "2 wooden skewers or sturdy straws for axles",
        "4 short straw pieces to hold the axles",
        "1 balloon",
        "1 straw",
        "Tape, scissors, and glue",
      ],
      steps: [
        "Tape straw pieces to the underside of the car body to hold the axles.",
        "Slide skewers or straws through the axle holders.",
        "Attach bottle caps to the ends of each axle to create wheels.",
        "Insert a straw into the balloon and tape it tightly so no air leaks out.",
        "Tape the balloon-and-straw engine to the top of the car with the straw pointing off the back.",
        "Blow up the balloon, pinch the straw, place the car on a flat surface, and release it.",
      ],
      safety:
        "Ask an adult for help with scissors and sharp skewers. Make sure the car is placed on a flat, safe surface before releasing it, and keep fingers away from spinning wheels and axles during the test run.",
      challenge:
        "Can your car travel farther? Try using bigger wheels, making the car body lighter, creating a more airtight balloon connection, or racing against another team to see whose design wins.",
    },
    {
      slug: "corner-count",
      title: "The Corner Count",
      category: "Math",
      categoryKey: "math",
      difficulty: "Easy",
      time: "3 x 20 minutes",
      image: "/images/projects/The Corner Count.jpeg",
      description:
        "Count the traffic on your own corner in timed windows across three days, chart what you find, then predict the next count before you go and check it.",
      introduction: [
        "Data does not only live in textbooks. It is out on your street right now, and nobody has written it down yet.",
        "In this project you become the person who writes it down. You pick one spot, count what passes in a fixed window of time, and repeat until a pattern shows up. Then comes the hard part: you predict the next number before you go and count it.",
      ],
      why:
        "A pattern you find yourself is worth more than a pattern you are handed. Counting in equal, fixed windows is what makes numbers comparable, and comparing them is what turns a pile of tally marks into a bar chart with something to say. Predicting before you measure is the whole scientific method in twenty minutes: you commit to an answer, then let the real world tell you how close you were.",
      materials: [
        "A notebook, or the printable tally sheet on this page",
        "A pencil",
        "A timer or a phone clock",
        "A safe spot to stand or sit, well back from the road",
        "An adult to stay with you",
        "Colored pencils or markers for the chart",
      ],
      steps: [
        "Pick one spot you can reach easily and safely, like a window facing the street or a bench set back from the curb. Use the exact same spot every single time.",
        "Pick three things to count. Cars, people walking, and dogs is a good start, but bikes, buses, or delivery vans work just as well.",
        "Set your timer for 10 minutes. Every time one of your three things goes past, make one tally mark. When the timer goes off, stop counting, even if something is halfway past.",
        "Write down the date, the start time, and the weather beside your tallies. Those three notes are what let you compare one window against another later.",
        "Repeat at the same time of day on two more days, so you finish with three windows you can fairly compare.",
        "Draw a bar chart with your three things along the bottom and the counts running up the side. Use one color per day so the three days stand side by side.",
        "Before your fourth count, write down a prediction for each category and one sentence on why you picked that number. Then go and count, and write the real number next to your guess.",
      ],
      safety:
        "Count from a spot an adult has approved, like a window, a porch, or a bench behind a curb, and stay well back from the road. Never step off the sidewalk to see better, and never count alone near traffic. If it is dark or the weather is bad, count from inside.",
      challenge:
        "Change one thing and count again: the time of day, the day of the week, or the corner itself. Which of those three moves the numbers most? Then try predicting a window at a time you have never counted before, and see whether your pattern still holds.",
      recordSheet: {
        title: "Traffic Tally Sheet",
        intro:
          "Print this and fill in one row per counting window. Keep every window exactly the same length, or the numbers cannot be compared.",
        columns: ["Date", "Start time", "Weather", "Cars", "People walking", "Dogs"],
        rows: 4,
        footnote:
          "Before your last window, write your prediction for each column in the margin. Afterward, circle the one you came closest on.",
      },
    },
    {
      slug: "sock-sorter",
      title: "The Sock Sorter",
      category: "AI",
      categoryKey: "ai",
      difficulty: "Easy",
      time: "1 hour",
      image: "/images/projects/The Sock Sorter.png",
      description:
        "Sort thirty of your own things into two piles, write the rules a computer would need to tell them apart, then build three objects on purpose that break your own rules.",
      introduction: [
        "Every time a phone picks a face out of a photo or an app decides a message is spam, something learned the difference from examples. Not from being told the answer, from being shown piles of things.",
        "You are going to do that same job by hand. Two piles, thirty objects, and a set of rules in your own handwriting. Then you are going to try to beat your own rules, which is where professional AI teams spend most of their time.",
      ],
      why:
        "A computer cannot see a sock. It can only measure things about a sock: how long it is, how many colors it has, whether it has a heel. The measurements you choose are called features, and picking them is most of the work. The objects you invent at the end are called edge cases, and they are where real systems fail. Hunting them on purpose is how you learn that a confident answer and a correct answer are not the same thing.",
      materials: [
        "Thirty objects from around the house that split into two clear groups",
        "Paper and a pencil",
        "A ruler",
        "Two boxes, trays, or towels to hold the piles",
        "A phone or tablet camera, optional, for photographing each pile",
      ],
      steps: [
        "Pick two groups you can tell apart at a glance: socks and gloves, forks and spoons, coins and buttons. Gather about fifteen of each and split them into two piles.",
        "Photograph or draw each pile so you have a record. This set is the only thing your rules are allowed to learn from, so it is worth keeping.",
        "Without touching a computer, list every measurement you could take of an object: length in centimeters, number of colors, number of holes, whether it bends, whether it is shiny. These are your features.",
        "Now write your rules, using only those measurements. For example: if it is longer than 12 cm and has no holes, it is a sock. Keep each rule short enough to read out loud in one breath.",
        "Test your rules on all thirty objects, one at a time. Mark every object your rules get wrong and count them. That count is your error rate.",
        "Change one rule, then test all thirty again. Write down both scores so you can see whether the change actually helped.",
        "Now attack your own work. Find or build three objects your rules will get wrong on purpose: a very short sock, a glove with the fingers tucked in, something that is somehow both. Test them, and write down what your rules said and why they were fooled.",
      ],
      safety:
        "Use your own belongings, or ask before you borrow. If you cut or alter anything to build an edge case, get an adult to help with the scissors and pick items nobody minds losing.",
      challenge:
        "Hand your written rules to somebody else, without your piles, and have them sort a fresh set of objects using only what you wrote. Every mistake they make is a rule you thought was clear and was not. That gap, between what you meant and what you actually wrote, is the same gap that puts bugs into real AI systems.",
      recordSheet: {
        title: "Rule Test Log",
        intro:
          "One row per test round. Run your rules over all thirty objects, count what they got wrong, then change one rule and run them again.",
        columns: ["Round", "Rule you changed", "Objects tested", "Got it right", "Got it wrong"],
        rows: 4,
        footnote:
          "If a round makes the score worse, keep the row anyway. A change that hurt is evidence too, and deleting it is how people end up fooling themselves.",
      },
    },
    {
      slug: "teardown-night",
      title: "Teardown Night",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Medium",
      time: "1-2 hours",
      image: "/images/projects/Teardown Night.png",
      description:
        "Take one broken device apart with an adult, lay every piece out in the order it came out, and work out what job each part was doing.",
      introduction: [
        "Most people throw a broken thing away without ever finding out what was inside it. That is a whole engineering lesson going into the trash.",
        "Tonight you open one up. You will not fix it, and you do not need to. The job is to get every piece out, keep them in order, and work out what each one was for.",
      ],
      why:
        "Building something teaches you how one design works. Taking things apart teaches you how a hundred designs work, because every product you open was somebody's answer to a problem and you get to read the answer directly. Laying the pieces out in the order they came out is what makes reassembly possible, and what turns a pile of parts into a map of how the thing was put together.",
      materials: [
        "One broken device nobody wants back: a remote, a wired mouse, wired headphones, an old toaster, a mechanical alarm clock",
        "A small screwdriver set, ideally with Phillips and flat heads",
        "A towel or tray to lay the parts out on",
        "Small bowls, or an ice cube tray, to keep screws in order",
        "A phone camera",
        "An adult, present for the whole project",
      ],
      steps: [
        "With an adult, pick the device and check that it is safe to open: unplugged for at least a day, batteries out, and nothing with a screen or a large capacitor inside.",
        "Photograph the outside from every side before you touch a single screw. That is your record of what it looked like whole.",
        "Find every screw, including the ones hiding under rubber feet and stickers. Put each screw into its own bowl or ice cube tray cup, in the order you removed it.",
        "Open the case slowly. If it will not come apart, there is a screw or a clip you have not found yet. Force is almost never the answer.",
        "Take out one part at a time and lay it on the towel left to right, in the exact order it came out. Photograph the row every few parts.",
        "For each part, write one sentence: what it is, and what job it was doing. If you cannot tell, write your best guess and put a question mark next to it.",
        "Find the part that failed, if you can. Look for burn marks, snapped plastic, a loose wire, or a worn gear. Then decide: could this have been designed so it did not break?",
      ],
      safety:
        "An adult must be present for the entire project. Open only devices that are unplugged, battery-free, and have been sitting for at least a day. Never open a microwave, a television, a monitor, a camera flash, or anything else containing a large capacitor, because those can hold a dangerous charge long after being unplugged. Watch for sharp metal edges and for springs under tension, and wear safety glasses while prying a case open.",
      challenge:
        "Redesign one part. Pick the piece that failed, or the piece that made the device hardest to open, and draw a version that fixes it. Then count the screws: could your version use fewer? Products that come apart easily are easier to repair, and repairable things stay out of the landfill far longer.",
      recordSheet: {
        title: "Parts Inventory",
        intro:
          "One row per part, in the order it came out. Fill in the last column even when you are guessing, and mark the guesses with a question mark.",
        columns: ["#", "Part name", "What it is made of", "Job it was doing"],
        rows: 10,
        footnote:
          "If you attempt to put it back together, run the sheet bottom to top: the last part out is the first part back in.",
      },
    },
    {
      slug: "egg-drop-budget",
      title: "Egg Drop on a Budget",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Hard",
      time: "2 hours",
      image: "/images/projects/Egg Drop on a Budget.jpg",
      description:
        "Protect one raw egg using materials that all cost points. Sketch and predict before you build, drop it three times, and score survival divided by what you spent.",
      introduction: [
        "Anyone can protect an egg if they are allowed unlimited padding. Wrap it in a pillow and you are finished, and you have learned nothing.",
        "So this version charges you. Every straw, every inch of tape, every cotton ball costs points, and your score is whether the egg survived divided by what you spent. Suddenly the design matters far more than the padding.",
      ],
      why:
        "Real engineering almost never asks for the best possible thing. It asks for the best thing you can build within the money, the weight, or the space you were given, which is called designing under constraint. The budget is what turns this from a craft project into an engineering problem. Writing your prediction down before the drop is the other half: if you only decide what you expected after you have seen the result, you can talk yourself into believing you knew all along.",
      materials: [
        "One raw egg per attempt, plus a couple of spares",
        "Drinking straws, 1 point each",
        "Cotton balls, 3 points each",
        "Paper, 1 point per sheet",
        "Cardboard, 2 points per hand-sized piece",
        "String, 1 point per arm length",
        "Tape, 1 point per 10 cm",
        "A plastic bag, 5 points",
        "A ruler, a pencil, and paper for sketching, free",
        "A tarp, trash bag, or old towel for the landing zone",
      ],
      steps: [
        "Agree on a drop height with an adult and use that exact height every round. A second-floor window or the top of a step ladder both work, as long as the landing zone below is clear.",
        "Copy out the price list and set a budget for round one. Fifteen points is a good starting limit.",
        "Sketch your design before you touch any materials. Label which part slows the fall, which part absorbs the impact, and which part holds the egg still.",
        "Write your prediction: will the egg survive, and which part of your design will fail first? One sentence each, and no changing it afterward.",
        "Build it, then add up what you actually spent. If you went over budget, take something off before you drop.",
        "Drop it. Do not throw it downward, just let go. Open it up, photograph the damage, and write what actually happened next to what you predicted.",
        "Run two more rounds, each on a smaller budget than the last. Score every round as survival divided by points spent, and see whether being poorer forced you to get smarter.",
      ],
      safety:
        "An adult must set and approve both the drop height and the landing zone, and must be the one releasing the egg from any height above head level. Keep everyone clear of the landing area before each drop. Raw egg can carry salmonella, so work on a washable surface, wash your hands after every round, and clean up a broken egg right away.",
      challenge:
        "Cut your budget in half and try to keep the egg alive anyway. Then try the opposite: keep the budget the same but double the drop height. Which limit was harder to design around? Most engineering problems have exactly this shape, and working out which constraint is the binding one is most of the skill.",
      recordSheet: {
        title: "Drop Log",
        intro:
          "One row per round. The prediction column gets filled in before the drop, never after.",
        columns: ["Round", "Budget", "Points spent", "Predicted result", "Actual result", "Score"],
        rows: 3,
        footnote:
          "Score is 1 for a surviving egg and 0 for a broken one, divided by the points you spent. A cracked but unbroken egg counts as a half.",
      },
    },
    {
      slug: "bean-race",
      title: "The 30-Day Bean Race",
      category: "Science",
      categoryKey: "science",
      difficulty: "Easy",
      time: "30 days, 5 minutes a day",
      image: "/images/projects/The 30-Day Bean Race.jpg",
      description:
        "Four beans, four cups, and one thing you change on purpose. Measure every morning for thirty days, keep one cup untouched as the control, and find out what actually mattered.",
      introduction: [
        "Most experiments you can finish in an afternoon are over before anything interesting happens. Plants do not work that way. A bean takes its time, and the waiting is what this project is really teaching.",
        "You will start four cups on the same day, change exactly one thing between them, and then measure every single morning for a month. At the end you will have a chart that nobody handed you.",
      ],
      why:
        "The cup where you change nothing is called the control, and it is the most important cup on the windowsill. Without it you cannot tell whether your beans grew because of what you did or because beans grow anyway. Changing only one thing at a time is what lets you claim the change caused the difference, and measuring on a schedule, including on the days when nothing appears to be happening, is what keeps you honest.",
      materials: [
        "Four dried beans of the same kind, from a bag of pinto or kidney beans",
        "Four clear cups or jars, all the same size",
        "Cotton balls, paper towels, or potting soil",
        "Water",
        "A ruler marked in centimeters",
        "Masking tape and a marker for labeling the cups",
        "A notebook and a phone camera",
      ],
      steps: [
        "Soak all four beans in water overnight, so every one of them starts from the same point.",
        "Set up four cups in exactly the same way: damp cotton balls or soil, one bean pressed against the side of the cup so you can watch it, and a label. Cup 1 is your control, and nothing about it changes for thirty days.",
        "Pick one thing to change, and change it only in cups 2, 3, and 4. Amount of light, amount of water, or temperature all work well. Write down precisely what you changed and by how much.",
        "Put all four cups in the same place at the same time, unless light or temperature is the very thing you are testing.",
        "Every morning at roughly the same time, measure the height of each sprout in centimeters and take one photo of each cup from the same angle.",
        "Write all four numbers on your sheet even on the days when nothing has changed. A row of zeros is real data, and skipping it hides how long germination actually took.",
        "On day thirty, draw four lines on one chart, one per cup, with days along the bottom and height up the side. Then put your thirty photos in order and flip through them.",
      ],
      safety:
        "The beans in this project are for planting, not for eating: raw and soaked beans can make you ill. Wash your hands after handling soil, and keep the cups out of reach of pets and small children. If a cup grows mold, have an adult throw that cup out.",
      challenge:
        "Run it a second time, but on day one write down what you expect the chart to look like and sketch the four lines before you have any data at all. Then change something harder to control, like the kind of water or the size of the container, and see whether your prediction still holds.",
      recordSheet: {
        title: "30-Day Growth Log",
        intro:
          "One row per day. Measure at roughly the same time every morning, and write a number down even when that number is zero.",
        columns: ["Day", "Cup 1 (control)", "Cup 2", "Cup 3", "Cup 4", "Notes"],
        rows: 15,
        footnote:
          "Print two copies to cover all thirty days. Heights in centimeters. Use Notes for anything unusual: mold, a leaf opening, a cup you forgot to water.",
      },
    },
    {
      slug: "rover-wheels",
      title: "Rover Wheels vs. Sand",
      category: "Robotics",
      categoryKey: "robotics",
      difficulty: "Medium",
      time: "2 hours",
      image: "",
      description:
        "Build four different wheels from cardboard and bottle caps, run the same chassis over the same tray of sand and gravel, and measure which design actually travels furthest.",
      introduction: [
        "The hardest part of driving on Mars is not the driving. It is that the ground is loose, and a wheel that works perfectly on a smooth floor can dig itself into a hole and stop.",
        "You do not need a robotics kit to work on that problem. You need a tray of sand, one simple rolling chassis, and four sets of wheels you have made different on purpose.",
      ],
      why:
        "Everything except the wheels has to stay the same or you learn nothing: same chassis, same ramp, same sand, same starting point. That is called controlling your variables, and it is what lets you say the wheels caused the difference. Real rover teams do exactly this, running wheel designs across test beds here on Earth, because nobody can be sent to Mars to fix a wheel that turned out wrong.",
      materials: [
        "A shallow tray, baking sheet, or box lid",
        "Sand, dry dirt, or a mix of rice and small gravel",
        "Cardboard for the chassis and for the wheels",
        "Bottle caps, jar lids, and cardboard circles for wheel variations",
        "Wooden skewers, straws, or pencils for axles",
        "Tape, a ruler, and scissors",
        "A book or a board to make a small ramp",
        "Rubber bands and corrugated cardboard for adding tread",
      ],
      steps: [
        "Build one simple chassis: a rectangle of cardboard with two straw axle holders taped underneath. This is the only chassis you get, so make it sturdy, and use it for every single run.",
        "Fill the tray with sand or gravel about two centimeters deep and smooth it flat. Smooth it flat again before every run.",
        "Set a ramp at one end so every run starts with exactly the same push. Mark the release point and never move it.",
        "Make four sets of wheels that each differ in one obvious way: narrow against wide, smooth against treaded, small against large diameter. Write down what makes each set different.",
        "Run set one three times, smoothing the sand between runs. Measure from the end of the ramp to the front of the chassis and write down all three distances.",
        "Repeat for all four sets, three runs each. Twelve runs in total, with no changing the ramp or the chassis in between.",
        "Average the three distances for each set and compare. Then look at the tracks left in the sand, because the wheels that dug in tell you as much as the wheels that did not.",
      ],
      safety:
        "Ask an adult for help with the scissors and with cutting skewers to length, and blunt any sharp skewer end with tape. Run the test on a tray so the sand stays contained, and keep sand and small parts away from pets and young children. Wash your hands afterward.",
      challenge:
        "Add weight. Tape a small object to the chassis and run all four wheel sets again. Does the winner stay the winner? Real rovers get heavier as instruments are added, and a wheel that works empty can fail loaded. After that, try the hardest surface you can build: loose sand on a slope.",
      recordSheet: {
        title: "Wheel Test Results",
        intro:
          "Three runs per wheel set, twelve runs in total. Smooth the sand flat before every single run.",
        columns: [
          "Wheel set",
          "What makes it different",
          "Run 1 (cm)",
          "Run 2 (cm)",
          "Run 3 (cm)",
          "Average",
        ],
        rows: 4,
        footnote:
          "If one run comes out wildly different from the other two, do not delete it. Write down what went wrong beside it, because that is usually where the interesting failure is hiding.",
      },
    },
    {
      slug: "family-chatbot",
      title: "A Chatbot That Only Knows Your Family",
      category: "Coding",
      categoryKey: "coding",
      difficulty: "Medium",
      time: "2 hours",
      image: "/images/projects/A Chatbot That Only KNows Your Family.jpeg",
      description:
        "Write a chatbot in Python that knows your family and nothing else, then ask a real AI assistant the same questions and work out what each one gets wrong.",
      introduction: [
        "A chatbot that knows everything is impressive and almost impossible to understand. A chatbot that knows only your dog's name and your grandmother's birthday is neither, and that is exactly why it is worth building.",
        "Yours takes about thirty lines of Python, written in the editor on this site, with nothing to install. Then you will ask a real AI assistant the same questions your bot can answer, and write down where each one falls over.",
      ],
      why:
        "Your bot looks things up. It holds a dictionary of facts, and when a question does not match one of them it has nothing to offer. A large language model does something completely different: it predicts likely text, which is why it can answer almost anything and why it will sometimes invent an answer with total confidence. Watching both behaviors side by side, on questions where you already know the true answers, is the clearest way to see what these tools are actually doing.",
      materials: [
        "A computer or tablet with a web browser",
        "The Python editor on this site, so there is nothing to install",
        "A list of about ten true facts about your household",
        "Paper and a pencil for the comparison notes",
        "Access to an AI assistant, with an adult, for the last two steps",
      ],
      steps: [
        "Open the Python editor on this site and type in the starter program below, or paste it. Run it and ask about the dog. Then ask it something it has never heard of, and watch what it does.",
        "Replace all three facts with true ones about your own household. Keep each keyword short and lowercase, because that is the word your bot searches the question for.",
        "Add seven more facts, so you have ten. Run the program after every two or three, because a missing comma is far easier to find when you have only added two lines.",
        "Try to break it. Ask about the dog without using the word dog. Ask two things in one sentence. Write down every question that should have worked and did not.",
        "Fix one of those failures. Pointing two different keywords at the same answer is the simplest repair, for example having both 'dog' and your dog's actual name return the same fact.",
        "Now ask an AI assistant, with an adult present, those same ten questions. It cannot possibly know the true answers. Write down what it says anyway.",
        "Fill in the comparison sheet. Your bot says it does not know when it does not know. Note what the assistant does instead, then decide which of those two behaviors you would rather have in something you depend on.",
      ],
      codeBlock: {
        title: "The starter program",
        intro:
          "Thirty lines, and every one of them does something you can point at. The dictionary at the top is the only thing your bot knows; everything below it is the loop that reads a question and searches for a matching keyword.",
        code: `facts = {
    "dog": "Our dog is named Pepper and she is 4 years old.",
    "car": "The car is a blue Honda.",
    "birthday": "Grandma's birthday is March 2nd.",
}

print("Ask me about my family. Type bye to stop.")

while True:
    question = input("> ").lower()

    if question == "bye":
        print("See you later.")
        break

    answer = "I do not know that one."

    for keyword in facts:
        if keyword in question:
            answer = facts[keyword]

    print(answer)`,
        note:
          "The line that matters most is the one setting the answer to 'I do not know that one' before the search runs. That default is what makes your bot admit when it has nothing, and it is the exact behavior a language model does not have.",
      },
      safety:
        "Keep private details out of your facts: no full names, no home address, no phone numbers, no passwords, and no school name. First names or nicknames only. Have an adult with you for the steps that use an AI assistant, and never type your family's details into one.",
      challenge:
        "Give your bot a memory. Store the last keyword it matched in a variable, then let a follow-up like 'how old is she' use that stored keyword instead of searching again. That single feature is the difference between a lookup table and something that feels like a conversation, and it is also where your bot will start getting confused in exactly the ways real assistants do.",
      recordSheet: {
        title: "Bot vs. Assistant",
        intro:
          "Ten questions you already know the true answer to. Fill in all four columns for each one.",
        columns: ["Question", "True answer", "What your bot said", "What the assistant said"],
        rows: 10,
        footnote:
          "Mark every row where the assistant gave a confident answer that was not true. That behavior has a name, hallucination, and this table is you documenting it.",
      },
    },
    {
      slug: "loudest-room",
      title: "The Loudest Room in the House",
      category: "Science",
      categoryKey: "science",
      difficulty: "Medium",
      time: "2 hours",
      image: "",
      description:
        "Measure every room with a phone sound meter, find the loudest one, then build a quiet box from household materials and measure exactly how many decibels each layer buys you.",
      introduction: [
        "Everybody in your house already has an opinion about which room is loudest. Almost nobody has measured it.",
        "A free sound meter app turns a phone into a real instrument. Once you can put a number on the noise, arguments turn into measurements, and you can start engineering toward a target instead of toward a feeling.",
      ],
      why:
        "Decibels do not add up the way ordinary numbers do. The scale is logarithmic, so every 10 decibels is roughly a doubling of how loud something seems, which means taking 10 dB off a sound is a much bigger win than the number makes it look. Measuring the same source from the same distance every single time is what makes your readings comparable, and it is the only reason you can claim it was the towel layer, and not the room, that made the difference.",
      materials: [
        "A phone or tablet with a free sound meter app, chosen with an adult",
        "A steady sound source, such as a second phone playing the same clip at the same volume",
        "A shoebox or small cardboard box",
        "Towels, a blanket, egg carton, bubble wrap, crumpled newspaper",
        "Tape and scissors",
        "A tape measure or a long ruler",
      ],
      steps: [
        "Install a sound meter app with an adult and learn to read it. Most report decibels, written dB, and the number jumps around constantly, so take the middle of the range rather than the highest spike.",
        "Map the background level of every room with nothing running: hold the phone at chest height in the middle of the room, wait ten seconds, and write the number down. That is your baseline.",
        "Now find the loudest room during normal life, with the television on, the dishwasher running, and everybody talking. Same height, same middle of the room, same ten seconds.",
        "Set up a repeatable test. Put your steady sound source on the floor, mark a spot exactly one meter away, and measure from that mark every time. Record the bare reading with no box at all.",
        "Put the sound source inside the empty cardboard box and measure again from the same mark. Write down the drop in decibels.",
        "Add one material at a time: a towel layer, then egg carton, then crumpled newspaper. Measure after every single layer, and never add two materials in the same round.",
        "Chart decibels against the number of layers. Find the layer that bought the biggest drop for the least bulk, and write down why you think it won.",
      ],
      safety:
        "Never test with loud noise close to your ears, and do not turn the source up to make the numbers more dramatic. Sustained sound above roughly 85 dB can damage hearing permanently. Keep the source at a normal listening volume and let the box do the work. Ask an adult before installing any app.",
      challenge:
        "Try quieting a whole room instead of a box. Measure the room, hang a blanket over the largest hard flat surface, then measure again from the exact same spot. Soft things absorb sound while hard flat things bounce it, which is why an empty room echoes and a room with a rug does not. How many decibels can you take off a real room without moving a single piece of furniture?",
      recordSheet: {
        title: "Decibel Log",
        intro:
          "Same spot, same distance, same source, every time. Write down the middle of the range, not the highest spike.",
        columns: ["Test", "What changed", "Reading 1 (dB)", "Reading 2 (dB)", "Reading 3 (dB)", "Average"],
        rows: 8,
        footnote:
          "Three readings per test, because a sound meter never gives the same number twice. If your three readings are far apart, something moved: check the distance before you trust the average.",
      },
    },
    {
      slug: "receipt-detective",
      title: "Receipt Detective",
      category: "Math",
      categoryKey: "math",
      difficulty: "Medium",
      time: "1 hour",
      image: "/images/projects/Receipt Detective.jpeg",
      description:
        "Take one real grocery receipt, work out the cost per unit of everything that comes in more than one size, and find the three places your family is overpaying.",
      introduction: [
        "The price on the shelf is not really the price you are paying. The price you are paying is the price per ounce, and the store almost never puts that part in big letters.",
        "One receipt, a calculator, and about an hour is enough to find it. By the end you will have a one-page recommendation with real numbers behind it, about money your family actually spends.",
      ],
      why:
        "Cost per unit is a unit rate, and unit rates are the hardest idea in elementary math to care about, because they normally arrive as a worksheet with no consequences attached. Here the answer changes what gets bought. Dividing price by size to compare two things that come in different sizes is the same operation whether you are comparing cereal boxes, phone plans, or how far a car goes on a tank, and once you have done it for real it stops being abstract.",
      materials: [
        "One real grocery receipt, used with permission",
        "A calculator, or the one on a phone",
        "Paper and a pencil",
        "The package sizes, which may mean a quick look in the cupboard",
        "An adult to talk the findings through with at the end",
      ],
      steps: [
        "Ask for a receipt and for permission to use it. Copy every item onto your sheet along with what it cost.",
        "Cross off anything that only comes in one size, like a single avocado. You need items where a bigger or smaller version exists on the shelf.",
        "For each item left, find the size printed on the package: ounces, grams, milliliters, or a count like 12 rolls. Write that size beside the price.",
        "Divide price by size for each one. That number is the cost per unit, and it is the only fair way to compare two different sizes of the same thing. Round to the nearest cent.",
        "Look up the price of the other size for three of your items, either online or on the next trip to the store, and work out the cost per unit for those too.",
        "Compare. Find the three items where the size your family bought costs more per unit than the other size that was available.",
        "Write a one-page recommendation: the three items, the cost per unit for each size, what the difference adds up to over a year, and one sentence on when buying the smaller size is still the right call.",
      ],
      safety:
        "This project involves your family's money, so ask before using a receipt and keep what you find inside the house. Never photograph a receipt and post it: receipts can carry the last digits of a card, a store account number, and a record of where your family shops and when.",
      challenge:
        "Test whether bigger is always cheaper. It usually is, which is exactly why stores know shoppers will assume it. Find one item in your kitchen where the larger size costs more per unit than the smaller one. Then work out how much of the big size your family actually finishes before it goes bad, because a lower unit price on food nobody eats is not a saving at all.",
      recordSheet: {
        title: "Cost Per Unit Worksheet",
        intro:
          "One row per item. Divide price by size to fill the last column, and round to the nearest cent.",
        columns: ["Item", "Price", "Size (oz / g / count)", "Cost per unit"],
        rows: 12,
        footnote:
          "Compare like with like only: cost per ounce of cereal against cost per ounce of cereal, never against cost per ounce of milk.",
      },
    },
    {
      slug: "measure-the-school",
      title: "Measure the School Without Touching It",
      category: "Math",
      categoryKey: "math",
      difficulty: "Hard",
      time: "90 minutes",
      image: "/images/projects/Measure the School Without Touching it.jpg",
      description:
        "Find the height of a building using a shadow, a meter stick, and similar triangles. Then measure it a second way with a paper clinometer and see whether the two answers agree.",
      introduction: [
        "You cannot climb a school building with a tape measure. You do not have to. Two thousand years ago people worked out the height of the pyramids from the ground, using nothing but a stick and the sun.",
        "You are going to do it twice, two completely different ways. The interesting part is not either answer on its own. It is whether they agree.",
      ],
      why:
        "The shadow method works because the sun is so far away that its rays arrive essentially parallel, so you and the building cast shadows at the same angle at the same moment. That makes two triangles the same shape at different sizes, which is what similar means, and in similar triangles the ratio of height to shadow is identical. The clinometer method uses a completely unrelated idea, the tangent of an angle. When two unrelated methods land on nearly the same number, that agreement is your evidence. When they do not, one of your measurements is wrong, and working out which one is the real skill.",
      materials: [
        "A sunny day, ideally mid-morning or mid-afternoon when shadows are long and sharp",
        "A meter stick or a tape measure",
        "A friend or an adult to help hold and mark",
        "Chalk or small stones to mark where a shadow ends",
        "A protractor, a drinking straw, string, and a small weight such as a washer, for the clinometer",
        "A calculator with a tan button, for the second method",
      ],
      steps: [
        "Pick a building with a base you can walk right up to and a shadow that falls on flat, open ground. A wall standing on a slope will ruin both methods.",
        "Stand up straight in the sun and have somebody mark where the top of your shadow lands. Measure your shadow, then measure your own height with your shoes on. Write both down along with the time.",
        "Within the next few minutes, measure the building's shadow from the wall out to its tip. Shadows move, so if more than about ten minutes have passed, measure your own shadow again.",
        "Work out the first answer: building height equals your height, multiplied by the building's shadow, divided by your shadow. Write the answer down with its units.",
        "Now build the clinometer. Tape the straw along the flat edge of the protractor, tie the string at the center point, and hang the weight from it so it swings freely.",
        "Walk a measured distance back from the base, sight through the straw at the very top of the building, and have your helper read the angle where the string hangs. Subtract that reading from 90 to get the angle up to the top.",
        "Work out the second answer: height equals your distance from the building, multiplied by the tangent of that angle, plus the height of your eye above the ground. Compare it with the shadow answer and write the difference as a percentage of the larger one.",
      ],
      safety:
        "Stay on the sidewalk or on grounds you are allowed to be on, and ask permission before measuring around a building that is not yours. Never look at the sun, including through the straw. Watch for traffic while pacing out distances, and do the pacing with an adult if the ground runs anywhere near a road.",
      challenge:
        "Get the two answers within five percent of each other. If they are further apart than that, hunt down the cause instead of averaging them: sloping ground, a shadow measured too many minutes later, an eye height you forgot to add, or a roof that overhangs the wall. Then run the whole method on something whose height you can look up, like a basketball hoop at ten feet, and find out how close your version really is.",
      recordSheet: {
        title: "Two Methods, One Building",
        intro:
          "Fill in both halves before you compare them. Writing the units beside every single number is what catches most of the mistakes.",
        columns: ["Measurement", "Value", "Units", "Time taken"],
        rows: 10,
        footnote:
          "Rows to fill: your height, your shadow, the building's shadow, the shadow-method answer, your distance from the base, the angle you read, your eye height, the tangent-method answer, the difference, and that difference as a percentage.",
      },
    },
    {
      slug: "predict-then-launch",
      title: "Predict, Then Launch",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Medium",
      time: "2 hours",
      image: "/images/projects/Predict Then Launch.jpeg",
      description:
        "Use the Catapult Lab on this site to work out how angle and projectile weight change a shot, write your prediction down, then build the real catapult and find out what the simulator could not tell you.",
      introduction: [
        "A simulator gives you the same answer every time you ask it. That is exactly what makes it useful, and it is also the one thing a real catapult made of craft sticks and a rubber band will never do.",
        "So you are going to use both. First the Catapult Lab on the games page, where you can set the angle to the exact degree. Then a real one on the floor, where you cannot.",
      ],
      why:
        "In the simulator, angle and power are numbers you choose. On a real catapult they are whatever came out of how far you happened to pull the arm and how it happened to let go, and neither is the same twice. That is why testing a real machine needs repeated trials and an average, while a simulation needs only one run. Finding out where a model stops matching the world is not a criticism of the model. It is the reason engineers build both.",
      materials: [
        "A computer or tablet to run the Catapult Lab on the games page of this site",
        "About 15 craft sticks or popsicle sticks",
        "Rubber bands",
        "A plastic bottle cap to use as the bucket",
        "Tape, and a glue stick or hot glue with adult help",
        "A tape measure or a long ruler",
        "Three things to launch that are clearly different weights: a cotton ball, a wad of paper, a small eraser",
        "Masking tape to mark a launch line",
      ],
      steps: [
        "Open the Catapult Lab on the games page and take about ten shots just to get a feel for the two controls: Angle in degrees and Power in metres per second.",
        "Hold the Power steady and change only the Angle. Find the angle that sends the shot furthest, then see what happens well above it and well below it.",
        "Now hold the Angle steady and switch the projectile between Standard, Light, and Heavy. Write down which one carries furthest and which one falls shortest.",
        "Write both predictions before you build anything: which angle will work best on a real catapult, and which of your three real objects will fly furthest. One sentence of reasoning for each.",
        "Build the catapult: a stack of sticks as the base, one stick as the throwing arm held by a rubber band at the pivot, and the bottle cap taped on as the bucket. Tape the base down so it cannot slide.",
        "Mark a launch line and pull the arm back to the same marked spot every single time. Fire each of your three objects five times, and measure where every one of them lands.",
        "Average the five distances for each object and compare that against what you predicted. Then look at how spread out those five numbers were for a single object. That spread is the thing the simulator never showed you.",
      ],
      safety:
        "Launch only soft, light objects: cotton balls, paper wads, erasers. Never launch anything hard, sharp, or heavy, and never aim at a person, an animal, a window, or a screen. Everybody stays behind the catapult when it fires. Get adult help for hot glue and for cutting sticks.",
      challenge:
        "Make your real catapult repeatable. The spread in your five shots comes from something changing between them, so hunt it down: a pull that stops in a different place each time, a bucket that tips, a base creeping forward. Fix one thing, then remeasure the spread. Getting five shots to land close together is harder, and far more useful, than getting one shot to land far.",
      recordSheet: {
        title: "Sim vs. Real",
        intro:
          "Five real shots per object, because one shot tells you nothing at all about a machine this inconsistent.",
        columns: [
          "Object",
          "Predicted",
          "Shot 1 (cm)",
          "Shot 2 (cm)",
          "Shot 3 (cm)",
          "Shot 4 (cm)",
          "Shot 5 (cm)",
          "Average",
        ],
        rows: 3,
        footnote:
          "Also write down the largest and the smallest of your five shots for each object. The gap between those two is your spread, and shrinking it is the challenge.",
      },
    },
    {
      slug: "sensor-scavenger-hunt",
      title: "Sensor Scavenger Hunt",
      category: "AI",
      categoryKey: "ai",
      difficulty: "Easy",
      time: "45 minutes",
      image: "/images/projects/Sensor Scavenger Hunt.jpeg",
      description:
        "Find twenty sensors hiding in your home, write down what each one senses and what it decides, then hunt for the one that keeps getting it wrong and design a fix.",
      introduction: [
        "Your home is full of things that are quietly paying attention. Most of them are so ordinary that nobody thinks of them as technology at all.",
        "In forty-five minutes you can find twenty of them. Then comes the better half: finding the one that regularly gets it wrong, because a failure is where you can actually see how the decision was built.",
      ],
      why:
        "Every automatic thing in your home runs the same three-step loop: it senses something, it decides something, and it does something. Input, decision, output. Once you can name those three parts, the difference between a machine following a fixed rule and a machine recognizing a learned pattern stops being mysterious. The failures matter most of all, because a sensor that never fails tells you nothing about how it works, while one that switches the lights off on somebody sitting still tells you exactly what it was really measuring.",
      materials: [
        "Paper and a pencil, or the record sheet on this page",
        "A phone camera, optional",
        "Permission to look around the house",
        "An adult to ask about anything you are unsure of",
      ],
      steps: [
        "Start with the obvious ones to build momentum: a smoke alarm, a thermostat, a phone screen that dims, a fridge, a washing machine that stops when the lid opens.",
        "For each one, write three things down: what it senses, what it decides, and what it does. If you cannot fill in all three, you have not worked that one out yet.",
        "Now hunt the hidden ones. Anything that turns itself on, turns itself off, stops by itself, or changes without being touched is running the loop.",
        "Get to twenty. When you run out indoors, try the car, the street, and the shops: automatic doors, streetlights that come on at dusk, taps in public bathrooms.",
        "Sort your twenty into two piles: the ones following a fixed rule, like a thermostat comparing one number against another, and the ones that seem to recognize a pattern, like a phone finding a face.",
        "Find a failure. A bathroom light that goes out while somebody is still in there, an automatic door that ignores a small child, a phone that unlocks for a sibling. Write down what that sensor was really measuring, which is almost never what you assumed it was.",
        "Invent one sensor your home should have and does not. Draw it, and fill in all three parts of the loop. Then write one sentence on how it could go wrong, because every single one of the twenty you found can.",
      ],
      safety:
        "Look, do not open. This project is about noticing sensors, not taking them apart, so leave smoke alarms, thermostats, and anything plugged into a wall exactly as they are. Never climb to reach something. Ask an adult before touching any appliance, and stay with an adult if you go outside to find the last few.",
      challenge:
        "Time the failure you found. A motion-sensor light that switches off on somebody sitting still has a timeout built into it, and you can measure that timeout: sit completely still and count the seconds until it goes dark, three separate times, then average them. You have just measured a decision that a person somewhere chose, and you are now in a position to say whether they set it too short.",
      recordSheet: {
        title: "Sensor Log",
        intro:
          "One row per sensor, twenty rows in total. If you cannot fill in all three middle columns, you have not worked that sensor out yet.",
        columns: ["#", "What it is", "What it senses", "What it decides", "What it does", "Rule or pattern?"],
        rows: 20,
        footnote:
          "Circle any row where you have actually watched it get things wrong. Those are the rows you come back to for the last two steps.",
      },
    },
    {
      slug: "sunset-in-a-jar",
      title: "Sunset in a Jar",
      category: "Light & Optics",
      categoryKey: "optics",
      difficulty: "Easy",
      time: "45 minutes",
      image: "/images/projects/Sunset in a Jar.jpg",
      description:
        "Shine a flashlight through a jar of milky water and watch it look blue from the side and orange from the end, for exactly the reason the sky and the sunset do.",
      introduction: [
        "The sky is not blue because it reflects the ocean, and the sunset is not orange because the sun changes color. They are the same effect seen from two different angles.",
        "You can put that effect in a jar on the kitchen table with a flashlight and a few drops of milk, and look at it from both angles inside the same minute.",
      ],
      why:
        "White light is every color at once. When it meets something much smaller than its own wavelength, the short blue waves get knocked sideways far more than the long red ones, roughly sixteen times more, and that sideways-scattered light is what you see through the side of the jar. What is left to come out the far end has had its blue stripped out, so it looks warm and orange. In the sky the scatterers are air molecules, and a sunset is redder than noon because the light is travelling through much more air to reach your eye.",
      materials: [
        "A tall clear jar or a straight-sided clear plastic bottle",
        "Water",
        "Milk, only a few drops to begin with",
        "A bright white flashlight, or a phone torch",
        "An eyedropper or a teaspoon",
        "A sheet of white paper to use as a screen",
        "A dark room",
      ],
      steps: [
        "Fill the jar with water and turn the lights off. Shine the flashlight in through one end and look at the beam from the side. In clear water you will barely see it, because there is almost nothing in there to scatter the light.",
        "Add two or three drops of milk and stir. Look from the side again. The beam should now be visible, and faintly blue.",
        "Now look straight down the length of the jar with the flashlight at the far end. Do not look at the flashlight itself, look at the light that has come through the water. It should look warmer than it did going in.",
        "Add one more drop and check both views again. Write down what happens to each color as you go.",
        "Keep adding milk one drop at a time until the beam from the side turns white instead of blue. Write down how many drops that took.",
        "Hold the white paper at the far end and look at the spot the light makes on it. Compare that spot at two drops against the same spot at eight drops.",
        "Explain in one sentence why noon and sunset are different colors even though the sun itself has not changed at all.",
      ],
      safety:
        "Do not look directly into the flashlight, and never use a laser for this project. Use a jar you have permission to use, wipe up spills so nobody slips, and pour the milky water down the drain when you are done.",
      challenge:
        "Milk is a cheat, and a useful one. Its fat droplets are far bigger than air molecules, so your jar imitates the sky rather than copying it, which is why your blue comes out pale instead of vivid. Try to get closer: use less milk in more water, or try a pinch of powdered creamer or a single drop of dish soap instead. Which one gives you the bluest side beam for the least cloudiness?",
      recordSheet: {
        title: "Drop by Drop",
        intro:
          "One row per amount of milk. Look from the side and from the end before you add the next drop.",
        columns: ["Drops of milk", "Color from the side", "Color through the end", "Notes"],
        rows: 8,
        footnote:
          "The row where the side view stops being blue and turns white is the interesting one. Write down what you think changed.",
      },
    },
    {
      slug: "shoebox-camera-obscura",
      title: "Shoebox Camera Obscura",
      category: "Light & Optics",
      categoryKey: "optics",
      difficulty: "Medium",
      time: "1 hour",
      image: "/images/projects/Shoebox Camera Obscura.jpg",
      description:
        "Turn a shoebox into a working camera with one pinhole and no lens, then find out why a smaller hole gives you a sharper picture and a dimmer one.",
      introduction: [
        "Before there were lenses, before there was film, there was a dark room with a small hole in one wall. The picture that lands on the opposite wall is upside down, in full color, and completely real.",
        "A shoebox is a dark room. You need one hole, one piece of tracing paper, and about an hour.",
      ],
      why:
        "Light travels in straight lines. A single point on a bright tree outside is throwing rays in every direction, but only the ones aimed at your tiny hole get through, and those carry straight on to land on one spot inside the box. Rays from the top of the tree end up at the bottom of your picture and rays from the bottom end up at the top, which is why the image arrives upside down. This is also what the back of your eye receives, and your brain quietly flips it for you.",
      materials: [
        "A shoebox with a lid, or any box you can seal light-tight",
        "Aluminum foil",
        "Tracing paper, baking parchment, or thin white paper",
        "A pin or a needle",
        "Black tape, and black paint or black paper for the inside",
        "Scissors and a ruler",
        "A dark cloth or towel to put over your head",
      ],
      steps: [
        "Cut a square hole about 3 cm across in the middle of one end of the box, and a larger viewing window in the opposite end.",
        "Tape tracing paper tightly across the viewing window. This is your screen, and it has to be flat rather than baggy.",
        "Paint or line the inside of the box black. Every bit of stray light bouncing around in there washes out the picture.",
        "Tape a square of foil over the 3 cm hole, then push a pin straight through the center of the foil to make one clean pinhole. Do not wiggle it.",
        "Seal every seam and corner with black tape, then take the box to a bright window or outside on a sunny day.",
        "Put the cloth over your head and over the viewing end, and look at the tracing paper while the pinhole faces something bright. Give your eyes a full minute to adjust before you decide it is not working.",
        "Make a second foil square with a noticeably bigger hole and a third with a smaller one. Swap them in turn and write down what happens to sharpness and to brightness each time.",
      ],
      safety:
        "Never point the box at the sun and never look toward the sun through it, not even on tracing paper. Get adult help with the scissors and with cutting the box. If you spray paint the inside, do that outdoors with an adult.",
      challenge:
        "Find the best hole. Going smaller makes the picture sharper, but only up to a point: below about half a millimeter it starts to blur again, because light passing through a very small opening spreads out instead of continuing straight. That spreading is called diffraction, and it is the same effect that puts stripes on the wall in the double slit project. Find the hole size where your box is sharpest, and record what happens on either side of it.",
      recordSheet: {
        title: "Pinhole Comparison",
        intro:
          "One row per hole. Score sharpness and brightness from 1 to 5, always on the same view through the same window.",
        columns: ["Hole", "Roughly how wide", "Sharpness 1-5", "Brightness 1-5", "What you could make out"],
        rows: 5,
        footnote:
          "Keep the subject and the light the same for every row. If the sun goes behind a cloud between two rows, the brightness column stops meaning anything.",
      },
    },
    {
      slug: "light-pipe-water-stream",
      title: "Bending Light Down a Stream of Water",
      category: "Light & Optics",
      categoryKey: "optics",
      difficulty: "Medium",
      time: "1 hour",
      image: "/images/projects/Bending Light Down a Stream of Water.jpg",
      description:
        "Send a beam of light down a falling stream of water and watch it follow the curve, which is exactly the trick that carries the internet across the ocean floor.",
      introduction: [
        "Light travels in straight lines. That is the whole basis of the camera obscura, and it is true. So how does a signal get down a hair-thin glass fiber that is coiled up under the Atlantic?",
        "The answer is that light can be trapped. Once you have watched it happen inside a stream of water pouring out of a bottle, the cable under the ocean stops being mysterious.",
      ],
      why:
        "When light already inside water arrives at the surface at a shallow enough angle, it does not get out. It reflects back in, completely, every time, which is why this is called total internal reflection. For water the cutoff sits at about 49 degrees; strike the surface at a shallower angle than that and the light stays inside. In a curving stream the light keeps meeting the edge past that cutoff, so it keeps bouncing along and follows the curve down. An optical fiber is this same trick made permanent in glass.",
      materials: [
        "A clear straight-sided plastic bottle with the label peeled off",
        "A nail or a 5 mm drill bit, and an adult to make the hole",
        "A red laser pointer, class 2 or lower, handled only by an adult",
        "A sink, basin, or bucket to catch the water",
        "Tape",
        "A dark room",
      ],
      steps: [
        "An adult makes one clean hole about 5 mm across in the side of the bottle, near the bottom. On thin plastic a heated nail works better than a drill.",
        "Cover the hole with a finger or a piece of tape, fill the bottle with water, and stand it at the edge of the sink so the stream will arc down into the basin.",
        "Turn the lights off. The adult holds the laser flat against the side of the bottle directly opposite the hole, aiming straight across so the beam travels through the water and out through the hole.",
        "Release the stream. Watch where the water lands rather than watching the bottle: you should see a bright spot riding down inside the falling stream and lighting up the point where it hits.",
        "Nudge the aim until the light stays in the stream as long as possible. When it is right the whole curve glows faintly and the landing point is bright.",
        "Now break it on purpose. Put a finger into the stream partway down and watch the light stop there. The bounce only works while the surface stays smooth and unbroken.",
        "Change the curve by raising and lowering the bottle so the stream falls more steeply or more gently. Record which shape carries the light furthest before it leaks out.",
      ],
      safety:
        "The laser is the one genuinely dangerous thing here. An adult holds it at all times and it never leaves their hand. Use a red pointer, class 2 or lower, never green and never anything sold as high power. Never point it at anyone's eyes, at a pet, at a mirror, at a window, or at a shiny tap, because a reflection can find an eye nobody was aiming at. Keep the beam below eye level and pointed down into the sink. An adult makes the hole in the bottle. Mop up water so nobody slips.",
      challenge:
        "Work out the limit. The light escapes the moment the stream breaks into separate droplets, so anything that keeps the stream smooth for longer should carry it further. Try a smaller hole, a fuller bottle for more pressure, and a cleaner edge on the hole itself. Then answer this: why does a real optical fiber never have this problem, given that it is solid glass and cannot break into drops?",
      recordSheet: {
        title: "How Far Did the Light Go",
        intro:
          "One row per attempt. Measure from the hole to the point where the light visibly leaves the stream.",
        columns: ["Attempt", "What you changed", "Stream shape", "Distance light stayed in (cm)"],
        rows: 6,
        footnote:
          "If you cannot see where the light leaves, look for where the stream stops being one smooth rope and becomes separate drops. It is nearly always the same place.",
      },
    },
    {
      slug: "cd-spectroscope",
      title: "Build a Spectroscope from a CD",
      category: "Light & Optics",
      categoryKey: "optics",
      difficulty: "Medium",
      time: "1 hour",
      image: "/images/projects/Build a Spectroscope from a CD.jpg",
      description:
        "Build a real spectroscope from a cereal box and a scrap CD, then find out which lamps give you a smooth rainbow and which give you a handful of separate bright lines.",
      introduction: [
        "A rainbow looks continuous: every color running into the next with nothing missing. Sunlight really is like that. Most of the lamps in your house are not, and you cannot tell by looking at them.",
        "The grooves on a CD are packed closer together than the wavelength of light, which makes the disc a diffraction grating, which makes it the working part of a genuine scientific instrument. The rest of the instrument is a cereal box.",
      ],
      why:
        "A hot solid glows in every color at once, because its atoms are crowded together and jostling, and that is the smooth rainbow you get from sunlight or an old filament bulb. A thin glowing gas does something completely different: a few sharp separate colors, and nothing at all in between. That happens because an electron inside an atom cannot sit just anywhere. It can only occupy certain fixed energy levels, like rungs on a ladder with no space between them, and when it drops from one rung to another it releases a photon whose color is set exactly by the size of that gap. Those separated lines are that rule made visible, and they are one of the results that forced physicists to invent quantum mechanics in the first place.",
      materials: [
        "An empty cereal box, or a similar cardboard box",
        "An old CD or DVD you are allowed to destroy, a DVD works better",
        "A craft knife or scissors, with adult help",
        "Black tape and black paper",
        "Two straight pieces of card to form the slit",
        "A ruler and a pencil",
      ],
      steps: [
        "Tape the top of the cereal box shut so no light gets in, and line the inside with black paper if you can.",
        "Make a narrow slit in one end, about 1 mm wide and 3 cm tall. Two straight card edges taped a millimeter apart give a much cleaner slit than a knife cut does.",
        "With an adult, cut a rough wedge out of the disc. On a DVD, split the two halves apart first and keep the layer that still has the rainbow sheen.",
        "Cut a viewing hole about 2 cm across in the opposite end of the box, low down.",
        "Tape the disc piece inside the box below the viewing hole, tilted at roughly 60 degrees, so that looking through the hole means looking at the disc surface and seeing the slit reflected in it.",
        "Point the slit at a white wall lit by daylight and look through the viewing hole. Adjust the tilt until a band of color appears off to one side, then tape the disc down.",
        "Now look at four sources in turn, never the sun itself: daylight on a wall, an old filament or halogen bulb, a fluorescent tube or energy-saving bulb, and a white LED. Sketch what you see for each.",
      ],
      safety:
        "Never point the spectroscope at the sun and never look toward the sun through it. Use daylight bouncing off a white wall or a cloud instead. Get adult help for cutting the box, and especially for cutting the disc, because CD plastic can crack into sharp splinters. Wear eye protection while cutting the disc if you have any.",
      challenge:
        "Find the lines and work out what made them. A fluorescent tube shows a few bright lines because there is mercury vapor inside it, and the strong green and the pair of yellows come from specific jumps between energy levels in mercury atoms. A white LED is different again: a blue spike plus a broad yellow hump, because it is a blue chip with a coating that converts some of the blue into everything else. Sketch both carefully, then find a neon sign if you can and see how few colors it really contains.",
      recordSheet: {
        title: "Spectrum Sketches",
        intro:
          "One row per light source. Draw what you see rather than describing it, and note whether the colors run into each other or stand apart.",
        columns: ["Light source", "Continuous or separate lines?", "Colors you can pick out", "Anything missing?"],
        rows: 6,
        footnote:
          "The last column is the most useful one. A gap where a color should be tells you something was never emitted at all, and that is as much information as a bright line is.",
      },
    },
    {
      slug: "uv-glow-lab",
      title: "The Glow Rule",
      category: "Light & Optics",
      categoryKey: "optics",
      difficulty: "Easy",
      time: "45 minutes",
      image: "/images/projects/The Glow Rule.jpeg",
      description:
        "Hunt for things that glow under a UV torch, then find the rule every single one of them obeys: the light coming out always has less energy than the light going in.",
      introduction: [
        "Some completely ordinary things are hiding a color. Tonic water, highlighter ink, laundry powder, some white socks, and the security strip in a banknote all look unremarkable until ultraviolet light lands on them.",
        "Finding them is good fun for about ten minutes. The rule underneath is the part worth keeping, and it turns out to be a rule with no exceptions.",
      ],
      why:
        "Ultraviolet light is made of photons carrying more energy than any color your eye can see. When one is absorbed by the right kind of molecule, it lifts an electron up to a higher energy level. The electron gives up a little of that energy as heat, then falls back down and emits a photon of its own. Because some energy was lost on the way, the emitted photon always carries less than the one that was absorbed, and less energy means a longer wavelength, which means a redder color. That is why ultraviolet goes in and blue comes out, and why you will never find something that takes in red and gives back blue. The size of that step down even has a name: the Stokes shift.",
      materials: [
        "A UV flashlight, 395 nm is the common and safest cheap kind",
        "Tonic water, which contains quinine",
        "Highlighter pens, especially yellow and green",
        "Laundry detergent or washing powder",
        "Glow-in-the-dark stars or stickers",
        "White paper and a few sheets of colored paper",
        "A dark room",
      ],
      steps: [
        "Turn out the lights and let your eyes adjust for a couple of minutes. Then sweep the UV torch slowly around a room and write down everything that lights up.",
        "Pour tonic water into a clear glass and shine the torch through it from the side. Compare it against plain water in an identical glass, so you know it is not the glass doing the glowing.",
        "Scribble a yellow highlighter heavily onto white paper and put it under the torch. Write down the color that comes out, not the color the ink looks in daylight.",
        "Sprinkle a little laundry powder onto dark paper and light it up. Detergents have brighteners added on purpose, so that clothes throw back extra blue and look whiter than white.",
        "Write down the color of the torch itself alongside the color that came out of each thing you found, then compare the two columns and look for anything that broke the pattern.",
        "Test the glow-in-the-dark stars. Charge them under the torch for ten seconds, then switch the torch off. Unlike everything else on your list, these keep going.",
        "Time how long the stars stay visible. Then charge them for a full minute and time it again, and write both numbers down.",
      ],
      safety:
        "Never look into the UV torch, never shine it at anybody's eyes or a pet's eyes, and do not hold it against skin for long stretches. Buy a 395 nm torch, which sits only just past violet. Avoid the 254 nm germicidal type completely, because that kind genuinely damages eyes and skin. Ask before using a banknote or an identity document and put it straight back afterward.",
      challenge:
        "Go looking for the exception, and fail to find one. Everything on your list took in a high-energy photon and handed back a lower-energy one, so the color always shifted toward red. Hunt specifically for something that does the opposite. When you cannot find one, you have discovered a rule rather than collected a list of glowing objects, and rules are what physics is actually made of. Then work out why glow-in-the-dark stars can keep emitting for minutes when everything else stops the instant the torch goes off.",
      recordSheet: {
        title: "Glow Log",
        intro:
          "One row per thing you find. The two color columns are the whole point of the table, so compare them once it is full.",
        columns: [
          "Object",
          "Color in normal light",
          "Color going in",
          "Color coming out",
          "Still glowing after the torch is off?",
        ],
        rows: 10,
        footnote:
          "With the table full, check every row: did the light coming out ever carry more energy, meaning bluer, than the light going in? Write your answer underneath.",
      },
    },
    {
      slug: "double-slit-at-home",
      title: "The Double Slit on Your Bedroom Wall",
      category: "Light & Optics",
      categoryKey: "optics",
      difficulty: "Hard",
      time: "2 hours",
      image: "",
      description:
        "Cut two slits into black paper, send a laser through them, and get the striped pattern that convinced physicists light is a wave. Then use those stripes to measure a gap far too small to put a ruler on.",
      introduction: [
        "Two slits, one laser, one wall. If light were simply a stream of tiny bullets you would expect two bright stripes, one behind each slit. You do not get two. You get a whole row of them, evenly spaced, with dark gaps in between.",
        "This is the most repeated experiment in physics, and the version on your bedroom wall is the same experiment. The hard part is not the physics. It is cutting two slits close enough together.",
      ],
      why:
        "Waves leaving the two slits arrive at each point on the wall having travelled slightly different distances. Where that difference is a whole number of wavelengths the two line up and add together into a bright stripe; where it is half a wavelength they cancel and leave darkness. That is interference, and only waves do it. The spacing of the stripes is tied to the wavelength of the light and the gap between the slits by one simple relationship, which means you can run it backwards: measure stripes that are millimeters apart, and calculate a slit gap far too small to measure directly.",
      materials: [
        "A red laser pointer, class 2 or lower, handled only by an adult",
        "Black construction paper, or any thin black card that light cannot pass through",
        "A craft knife or a fresh razor blade, with adult help",
        "A piece of stiff card with a window cut in it",
        "A ruler with millimeter markings, and a tape measure",
        "A dark room with a plain pale wall, ideally 3 meters or more of clear space",
        "A calculator",
        "Tape",
      ],
      steps: [
        "Tape the black paper flat across the window in the card so it is smooth and taut. Hold it up to a lamp first: if light comes through the paper itself, the stripes will be washed out and you need something more opaque.",
        "With an adult, make two straight parallel cuts in the paper about 1 cm long. Lay the blade against a ruler and drag it once. Get the cuts as close together as you possibly can, well under a millimeter apart.",
        "Set the card so the laser shines through both slits at once and continues to a wall at least 3 meters away. Tape everything down, because a card that shifts ruins the measurement.",
        "Darken the room. The adult aims the laser through the slits. Adjust until you see a row of dots or stripes rather than a single blob. One blob means either your slits are too far apart or the beam is only passing through one of them.",
        "Measure the distance from the paper to the wall in meters and write it down. Call it L.",
        "On the wall, measure across as many stripes as you can at once, center to center, then divide by the number of gaps you counted. That average is your fringe spacing, y. Measuring several stripes at once is what makes this accurate.",
        "Calculate the slit separation: d equals the wavelength times L, divided by y. A red pointer is about 650 nanometers, which is 0.000000650 meters. Your answer should land somewhere around a few tenths of a millimeter.",
      ],
      safety:
        "The laser is the serious hazard here, and an adult must hold it for the entire project. Use a red class 2 pointer of 1 mW or less, never green and never anything sold as high power. Never look into the beam, and never point it at a person, a pet, a window, a mirror, a screen, or any shiny metal, because a stray reflection can reach an eye nobody was aiming at. Keep the beam below eye level and aimed at a matte wall. The slits go in matte black paper rather than foil for the same reason: foil throws the beam back into the room. Cutting the slits needs adult supervision and a cutting mat, and a fresh blade cuts more cleanly and slips less than a dull one.",
      challenge:
        "Cut a second card with the slits deliberately closer together, and predict before you measure whether the stripes will spread further apart or bunch closer. Then check. Getting the direction of that relationship right, and being able to say why, is worth more than the number. After that, think about what this experiment does not show you: your laser is firing trillions of photons at once, so what is on your wall is genuinely wave interference. In a laboratory the identical pattern gets built up one photon at a time, arriving as single dots over hours, and that result is far stranger than yours.",
      video: {
        videoId: "2rWDzLwfX64",
        title: "Double Slit Experiment AT HOME",
        startSeconds: 10,
        caption:
          "A home run-through of the same setup. Worth watching before you cut anything, so you know what a working pattern is supposed to look like on the wall.",
      },
      recordSheet: {
        title: "Fringe Measurements",
        intro:
          "Measure the same pattern three times without moving anything. If your three answers disagree, the problem is the measurement rather than the physics.",
        columns: [
          "Trial",
          "Distance to wall L (m)",
          "Stripes measured across",
          "Total width (mm)",
          "Fringe spacing y (mm)",
          "Calculated d (mm)",
        ],
        rows: 3,
        footnote:
          "d equals 0.000000650 times L, divided by y, with y converted into meters first. A slip of a thousand between millimeters and meters is the mistake almost everybody makes here.",
      },
    },
  ],
  es: [
    {
      slug: "popsicle-stick-bridge",
      title: "Puente de Palitos de Helado",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Facil",
      time: "1-2 horas",
      image: "/images/home/featured-bridge.jpg",
      description:
        "Construye un puente de celosia con palitos de helado y observa como los triangulos guian la compresion y la tension durante tu prueba de carga.",
      introduction: [
        "Los ingenieros de puentes no pegan piezas al azar. Disenan estructuras que guian las fuerzas con un patron inteligente de formas fuertes.",
        "Este proyecto es emocionante porque tus palitos de helado se convierten en un puente real con partes, caminos de fuerza y una prueba de carga al final.",
      ],
      why:
        "Un puente de celosia reparte la fuerza a traves de triangulos. La cuerda superior suele comprimirse, la cuerda inferior suele estar en tension y las piezas diagonales ayudan a mover la carga por toda la estructura.",
      materials: [
        "60 o mas palitos de helado",
        "Pistola de silicona caliente y barras de pegamento",
        "Una regla",
        "Un marcador o boligrafo",
        "Tijeras o cortadores resistentes",
        "Dos soportes firmes para la prueba, como sillas o mesas",
        "Pesos para probar, como libros o discos de gimnasio",
      ],
      steps: [
        "Marca unos 16 palitos en los cuartos para que las uniones queden alineadas.",
        "Corta 4 de esos palitos por la mitad y usalos para empalmar palitos completos en 2 rieles largos.",
        "Construye la primera cercha lateral con 4 triangulos y luego agrega otros 3 triangulos escalonados entre ellos.",
        "Voltea la cercha, pega el riel superior y refuerza los triangulos con otra capa de palitos.",
        "Repite el mismo patron para hacer una segunda cercha lateral igual.",
        "Deja que ambos lados se endurezcan y luego conectalos con piezas transversales manteniendo el puente cuadrado.",
        "Agrega refuerzos diagonales, deja que el pegamento se asiente y prueba el puente lentamente entre dos soportes.",
      ],
      safety:
        "Pide ayuda a un adulto con la pistola de silicona y al cortar los palitos. El pegamento fresco y la punta se ponen muy calientes, y la prueba debe hacerse despacio para que los pesos o los pies no se resbalen.",
      challenge:
        "Intenta mantener el mismo patron de cercha usando menos palitos y luego compara cuanto peso puede sostener el puente mas ligero.",
    },
    {
      slug: "lego-robot-builder",
      title: "Robot LEGO con Garra",
      category: "Robotica",
      categoryKey: "robotics",
      difficulty: "Medio",
      time: "2-3 horas",
      image: "/images/shared/lego-robotics.jpeg",
      description:
        "Construye un robot con garra inspirado en la leccion Super Cleanup de LEGO Education y prueba que tan bien recoge distintos objetos.",
      introduction: [
        "Este no es cualquier robot. Estas construyendo una maquina de limpieza con garra inspirada en una leccion real de LEGO Education usada para ensenar pensamiento robotico.",
        "Eso lo hace aun mas genial porque no estas adivinando como podria verse un robot. Estas siguiendo una idea comprobada y aprendiendo por que cada parte esta ahi.",
      ],
      why:
        "Un robot con garra combina mecanica y programacion. La base debe mantenerse equilibrada, el motor debe transferir movimiento a la garra y el codigo debe decirle a la maquina cuando avanzar, agarrar y soltar.",
      materials: [
        "Set LEGO Education SPIKE Prime #45678 o un kit similar de robotica LEGO",
        "Hub SPIKE Prime",
        "1 motor angular grande",
        "1 sensor de fuerza",
        "Vigas Technic, pines, ejes y ruedas",
        "Objetos pequenos para probar, como papel arrugado, una manzana o pelota y un bloque",
      ],
      steps: [
        "Abre la leccion oficial Super Cleanup y los libros de construccion antes de comenzar.",
        "Organiza el hub, motor, sensor, ruedas, vigas, pines y ejes en grupos faciles de ver.",
        "Construye primero la base ancha con ruedas para que el robot se mantenga equilibrado.",
        "Agrega la torre delantera y el soporte del brazo con garra.",
        "Monta el motor, el sensor y las pinzas delanteras para que el robot pueda sujetar objetos.",
        "Carga una rutina simple de limpieza que le diga al robot que agarre, se mueva y suelte.",
        "Haz pruebas justas con diferentes objetos y compara lo que funciona mejor.",
      ],
      safety:
        "Manten las piezas pequenas de LEGO lejos de hermanos pequenos y mascotas porque pueden provocar asfixia. Pide ayuda a un adulto para cargar el hub, conectar cables y manejar las partes relacionadas con la bateria.",
      challenge:
        "Compara dos formas diferentes de garras y anota cual funciona mejor con objetos redondos, blandos o rigidos.",
    },
    {
      slug: "coke-mentos-experiment",
      title: "Experimento de Coca-Cola y Mentos",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Facil",
      time: "30 minutos",
      image: "/images/home/coke-mentos-science-experiment-kids.jpg",
      description:
        "Lanza una fuente de soda al aire libre y aprende por que la superficie de los caramelos hace que el gas escape rapidamente.",
      introduction: [
        "Preparate para una salpicadura enorme porque este experimento puede hacer que la soda salga disparada como una fuente cohete.",
        "Es emocionante de ver y tambien ensena una idea cientifica real que casi parece magia.",
      ],
      why:
        "La soda tiene gas de dioxido de carbono disuelto. Los Mentos tienen muchas pequenas irregularidades que le dan al gas muchos lugares para escapar al mismo tiempo, un proceso llamado nucleacion, por eso la soda sale tan rapido. La Diet Coke suele funcionar mejor que la Coca-Cola regular porque tiene menos azucar y es menos espesa, asi que las burbujas pueden subir mas facilmente y formar un geiser mas alto.",
      materials: [
        "1 botella de dos litros de Diet Coke u otra soda",
        "1 paquete de Mentos",
        "Un espacio abierto al aire libre",
        "Gafas de seguridad",
        "Una hoja de papel o una ficha",
        "Opcional: un tubo o rollo de papel para dejar caer los Mentos juntos",
      ],
      steps: [
        "Ve afuera a un area abierta como una entrada o patio y ponte las gafas de seguridad.",
        "Coloca la botella de soda en un piso plano donde no se caiga.",
        "Abre la botella y prepara tus Mentos lo mas rapido que puedas.",
        "Apila 5 o 6 Mentos en un tubo de papel o sostenlos sobre la abertura con una ficha debajo.",
        "Quita la ficha para que todos los Mentos caigan al mismo tiempo.",
        "Retrocede de inmediato y observa como la fuente de soda sale disparada hacia arriba.",
        "Habla sobre lo que paso y mide que soda o que numero de Mentos produjo el geiser mas grande.",
      ],
      safety:
        "Haz este experimento solo afuera y retrocede en cuanto caigan los Mentos. Nunca apuntes la botella hacia personas y no bebas la soda despues del experimento.",
      challenge:
        "Prueba dos sodas diferentes y compara cual produce la fuente mas alta.",
    },
    {
      slug: "my-first-python-program",
      title: "Mi Primer Programa en Python",
      category: "Programacion",
      categoryKey: "coding",
      difficulty: "Facil",
      time: "1 hora",
      image: codingThumbnailImage,
      description:
        "Escribe un juego de preguntas sencillo y descubre como el codigo puede convertir tus ideas en algo interactivo.",
      introduction: [
        "Programar es como darle instrucciones super claras a una computadora para que haga algo increible por ti.",
        "Este proyecto es divertido porque crearas un programa real que hace preguntas, guarda puntajes y responde al jugador.",
      ],
      why:
        "Los programas siguen instrucciones paso a paso. Python usa comandos como `print()` para mostrar mensajes, `input()` para recibir respuestas y variables para recordar informacion como un puntaje.",
      materials: [
        "Una computadora o tableta con acceso a internet",
        "Una pagina o app de Python, como Replit o Trinket",
        "Papel para planear tus preguntas",
        "Un teclado",
        "Curiosidad y paciencia",
      ],
      steps: [
        "Abre un editor de Python para principiantes en linea y comienza un proyecto nuevo.",
        "Escribe una linea con `print()` para darle la bienvenida al jugador.",
        "Crea una variable llamada score y ponla en 0 para contar los puntos.",
        "Usa `input()` para hacer una pregunta y guardar la respuesta en una variable.",
        "Agrega una sentencia `if` para comprobar si la respuesta es correcta.",
        "Aumenta el puntaje cuando el jugador acierte y muestra el nuevo valor con `print()`.",
        "Ejecuta tu programa, pruebalo y corrige errores hasta que funcione bien.",
      ],
      safety:
        "Usa solo sitios de programacion confiables y pide permiso a un adulto antes de crear cuentas. No compartas tu nombre real, direccion ni contrasenas dentro del programa o en chats.",
      challenge:
        "Agrega tres preguntas en lugar de una y haz que tu juego muestre un mensaje especial si el jugador obtiene una puntuacion perfecta.",
    },
    {
      slug: "baking-soda-volcano",
      title: "Volcan de Bicarbonato",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Facil",
      time: "1 hora",
      image: "/images/projects/baking-soda-volcano/cover.jpg",
      description:
        "Construye un mini volcan y provoca una erupcion espumosa con una reaccion clasica entre acido y base.",
      introduction: [
        "Los volcanes son algunas de las maravillas naturales mas dramaticas de la Tierra, y ahora puedes construir uno en tu propia mesa.",
        "Este proyecto es emocionante porque mezclas ingredientes, creas una erupcion y observas la quimica en accion.",
      ],
      why:
        "El bicarbonato es una base y el vinagre es un acido. Cuando se mezclan, producen un gas nuevo llamado dioxido de carbono, y ese gas crea espuma burbujeante que sale como si fuera lava.",
      materials: [
        "Bicarbonato de sodio",
        "Vinagre",
        "Una botella o vaso pequeno de plastico",
        "Masa moldeable, arcilla o papel aluminio",
        "Jabon para platos",
        "Colorante de comida",
        "Una bandeja para limpiar facilmente",
      ],
      steps: [
        "Coloca tu botella en el centro de una bandeja para que el desorden quede en un solo lugar.",
        "Construye la forma del volcan alrededor de la botella con arcilla, masa o papel aluminio, pero deja libre la abertura.",
        "Pon 2 o 3 cucharadas de bicarbonato dentro de la botella.",
        "Agrega un chorrito de jabon y unas gotas de colorante.",
        "Vierte vinagre en la botella y observa como la lava espumosa sube y se derrama.",
        "Mira las burbujas de cerca y habla sobre el gas que se esta formando dentro de la botella.",
        "Enjuaga la bandeja y vuelve a intentarlo con cantidades diferentes para ver como cambia la erupcion.",
      ],
      safety:
        "Manten la mezcla lejos de tus ojos y lavate las manos despues del experimento. Pide ayuda a un adulto antes de usar colorante porque puede manchar ropa y mesas.",
      challenge:
        "Prueba cambiando la cantidad de bicarbonato o vinagre y descubre que receta produce la erupcion mas grande.",
    },
    {
      slug: "simple-circuit-light",
      title: "Luz de Circuito Simple",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Medio",
      time: "45-60 minutos",
      image: "/images/projects/simple-circuit-light/cover.jpg",
      description:
        "Construye un circuito LED real en una protoboard con una resistencia, cables puente y un portapilas pequeno.",
      introduction: [
        "Encender una luz parece algo normal, pero dentro de ese pequeno clic hay un camino completo por donde se mueve la corriente electrica.",
        "En este proyecto construiras un circuito de electronica para principiantes en una protoboard, que permite conectar piezas sin soldar.",
        "Tambien agregaras una resistencia en serie con el LED. La resistencia es importante porque limita la corriente para que el LED no se queme.",
      ],
      why:
        "La corriente sale del lado positivo de la bateria, pasa por un cable puente, por la resistencia, entra por la pata larga del LED, sale por la pata corta y vuelve al lado negativo de la bateria. La resistencia y el LED estan en serie porque la corriente pasa primero por una pieza y luego por la otra en el mismo lazo. Si el LED esta al reves, la corriente no pasa correctamente y puede que no encienda.",
      materials: [
        "1 protoboard pequena sin soldadura",
        "1 LED",
        "1 resistencia de 220 a 330 ohmios",
        "1 portapilas de bajo voltaje, como 2 baterias AA con cables rojo y negro",
        "3 cables puente",
        "Opcional: un interruptor pequeno para un reto extra",
      ],
      steps: [
        "Coloca la protoboard frente a ti. Encuentra el riel positivo rojo (+), el riel negativo azul (-) y las filas centrales donde se conectan las piezas.",
        "Con el portapilas apagado o desconectado, conecta el cable rojo de la bateria al riel + y el cable negro al riel -.",
        "Pon un extremo de la resistencia en el riel +. Pon el otro extremo en una fila vacia de la protoboard, por ejemplo la fila 10.",
        "Coloca el LED para que la pata mas larga, llamada anodo, quede en la misma fila que el extremo de la resistencia. Pon la pata mas corta, llamada catodo, en otra fila.",
        "Usa un cable puente para conectar la fila de la pata corta del LED al riel -. Ahora la resistencia y el LED estan en un solo camino en serie.",
        "Conecta la bateria o enciende el portapilas. El LED debe encenderse cuando la corriente va de +, pasa por la resistencia, pasa por el LED y regresa a -.",
        "Si el LED no enciende, desconecta primero la bateria y luego voltea el LED o revisa que cada pieza este en la fila correcta.",
      ],
      stepImages: [
        {
          step: 6,
          src: "/images/projects/simple-circuit-light/step-6-lit-circuit.jpg",
          alt: "Paso 6: LED encendido en el circuito de la protoboard, con la pata larga (anodo) y la pata corta (catodo) senaladas donde se conectan a la resistencia y al riel negativo",
        },
      ],
      safety:
        "Usa solo baterias pequenas de bajo voltaje y nunca conectes tu circuito a un enchufe de pared. Siempre incluye la resistencia antes de encender el LED y desconecta la bateria antes de mover piezas.",
      challenge:
        "Agrega un interruptor pequeno en serie con la resistencia y el LED para abrir y cerrar el circuito. Tambien puedes comparar como cambia el LED con una resistencia de 220 ohmios y una de 330 ohmios.",
    },
    {
      slug: "elephant-toothpaste-experiment",
      title: "Experimento Pasta de Dientes de Elefante",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Medio",
      time: "30 minutos",
      image: "/images/projects/elephant-toothpaste-experiment/cover.jpg",
      description:
        "Observa como una enorme torre de espuma erupciona de una botella cuando el peroxido de hidrogeno se descompone y libera oxigeno en una espectacular reaccion exotermica.",
      introduction: [
        "La pasta de dientes de elefante recibe su nombre porque la espuma que sale disparada es tan enorme que pareceria que pertenece a un elefante. Pero no es solo una explosion espectacular: es una reaccion quimica real que tu puedes controlar.",
        "Este experimento te ensena como los catalizadores aceleran las reacciones, por que se libera calor cuando los quimicos cambian y como el gas oxigeno convierte un liquido en una pila gigante de espuma ante tus propios ojos.",
      ],
      why:
        "El peroxido de hidrogeno se descompone naturalmente en agua y gas oxigeno, pero lo hace muy lentamente por si solo. Agregar un catalizador, como levadura mezclada con agua tibia, le da a la reaccion un atajo y hace que ocurra casi al instante. El gas oxigeno escapa tan rapido que queda atrapado dentro del jabon para platos, creando miles de burbujas apiladas en espuma espesa. La reaccion tambien es exotermica, lo que significa que libera calor que puedes sentir cuando tocas la espuma con cuidado despues de que se calme.",
      materials: [
        "1/2 taza de peroxido de hidrogeno al 6% o 12% (se consigue en tiendas de belleza)",
        "1 sobre de levadura seca activa",
        "3 cucharadas de agua tibia",
        "Un chorrito de jabon para platos",
        "Unas gotas de colorante de comida",
        "Una botella de plastico de 500 ml o mas grande, o un cilindro graduado",
        "Una bandeja o charola para facilitar la limpieza",
        "Gafas de seguridad y guantes",
      ],
      steps: [
        "Ponte las gafas de seguridad y los guantes antes de manejar el peroxido de hidrogeno.",
        "Coloca la botella en el centro de la bandeja para que la espuma quede contenida.",
        "Agrega el jabon y unas gotas de colorante directamente en la botella.",
        "Vierte el peroxido de hidrogeno en la botella y agitala suavemente para mezclar.",
        "En un vaso aparte, mezcla el sobre de levadura con el agua tibia durante unos 30 segundos hasta que se disuelva.",
        "Vierte rapidamente la mezcla de levadura en la botella y alejate enseguida.",
        "Observa como la espuma sube disparada y nota el calor que emite cuando la tocas con cuidado despues de que se calme.",
        "Habla sobre lo que paso: que fue el catalizador, de donde vino el calor y que habia dentro de todas esas burbujas.",
      ],
      safety:
        "Siempre pide a un adulto que maneje y vierta el peroxido de hidrogeno, ya que puede irritar la piel y los ojos. Usa gafas de seguridad y guantes durante todo el experimento. La espuma es tibia y segura de tocar despues de que se calme completamente, pero no permitas que el liquido entre en contacto con los ojos o la piel durante la reaccion. Desecha la espuma y el liquido sobrante enjuagandolos por el desague con abundante agua.",
      challenge:
        "Prueba dos concentraciones diferentes de peroxido de hidrogeno: al 3% de la farmacia y al 6% o mas de una tienda de belleza, y compara que tan alta crece cada torre de espuma.",
    },
    {
      slug: "making-oobleck",
      title: "Haciendo Oobleck",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Facil",
      time: "20 minutos",
      image: "/images/projects/making-oobleck/cover.jpg",
      description:
        "Mezcla solo dos ingredientes para crear una sustancia misteriosa que fluye como liquido pero se solidifica al apretarla, y descubre la ciencia de los fluidos no newtonianos.",
      introduction: [
        "El oobleck toma su nombre de una sustancia pegajosa en un cuento del Dr. Seuss, y es tan extrano e impredecible como suena. Corre entre tus dedos como agua, pero en el momento en que lo aprietas o golpeas, se endurece como una roca.",
        "Esta actividad explora una fascinante clase de materiales llamados fluidos no newtonianos, y solo necesitas dos ingredientes y unos minutos para hacer un tazon lleno de ciencia que puedes sostener en tus propias manos.",
      ],
      why:
        "La mayoria de los liquidos como el agua y el jugo fluyen a la misma velocidad sin importar con que fuerza los empujes. El oobleck es diferente porque es un fluido no newtoniano, lo que significa que su viscosidad, es decir que tan espeso o liquido es, cambia segun la presion. Cuando empujas o golpeas el oobleck rapidamente, las particulas de maicena se traban entre si y se comporta como un solido. Cuando se libera la presion, las particulas se separan y fluye como liquido de nuevo. Esta propiedad se llama espesamiento por cizallamiento, y los ingenieros estudian materiales similares para cosas como armaduras corporales y relleno de baches.",
      materials: [
        "2 tazas de maicena",
        "1 taza de agua",
        "Unas gotas de colorante de comida (opcional)",
        "Un tazon grande para mezclar",
        "Una cuchara o espatula",
        "Una bandeja con bordes para contener el desorden",
      ],
      steps: [
        "Vierte la maicena en el tazon grande.",
        "Agrega el colorante al agua si quieres que tu oobleck tenga color.",
        "Vierte el agua lentamente sobre la maicena, revolviendo mientras lo haces; no la agregues toda de una vez.",
        "Sigue mezclando hasta que el oobleck no tenga grumos secos y se sienta extrano al revolver.",
        "Intenta pinchar la superficie rapidamente con el dedo, luego sumerge el dedo lentamente y nota la diferencia.",
        "Toma un punado y apretalo con fuerza, luego abre la mano y deja que gotee.",
        "Habla sobre lo que notas: cuando se siente solido? Cuando fluye como liquido?",
      ],
      safety:
        "El oobleck esta hecho con ingredientes seguros para el contacto con la piel, pero puede ser muy desordenado. Evita vertirlo por el desague porque la maicena puede acumularse dentro de las tuberias y causar obstrucciones. En cambio, deja que el oobleck sobrante se seque completamente en la bandeja y luego raspalo y echalo a la basura. Lava los tazones y las manos con agua tibia y deja que cualquier residuo se seque antes de rasparlo.",
      challenge:
        "Prueba cambiar la proporcion de maicena y agua agregando un poco mas de cada uno y nota como cambia la textura. Tambien puedes poner una bolsa con oobleck sobre un parlante y ver como baila cuando pones musica con mucho bajo.",
    },
    {
      slug: "rubber-band-powered-car",
      title: "Auto Propulsado por Liga",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Facil",
      time: "1-2 horas",
      image: "/images/projects/rubber-band-powered-car.jpg",
      description:
        "Un auto DIY sencillo que se mueve sin electricidad ni baterias, usando solo la energia almacenada de una liga retorcida para impulsar las ruedas y el eje hacia adelante.",
      introduction: [
        "Un auto propulsado por liga es uno de los proyectos mas satisfactorios porque tu haces todo el trabajo: lo enrollas, lo sueltas sobre una superficie plana, y observas como la fisica hace el resto.",
        "Puedes construirlo con materiales del hogar y luego comenzar a ajustarlo: cambia la liga, las ruedas o el peso del auto, y observa exactamente como cada cambio afecta la distancia que recorre.",
      ],
      why:
        "La liga almacena energia cuando se retuerce o enrolla. Al soltar el auto, la liga se desenrolla y transfiere esa energia almacenada a las ruedas o al eje. Esto convierte la energia potencial en energia cinetica, que es la energia del movimiento. El auto funciona mejor en una superficie lisa y plana, y los estudiantes pueden mejorar el diseno cambiando la liga, las ruedas, la longitud o el peso del auto.",
      materials: [
        "Carton, foamy u otro material ligero para el cuerpo del auto",
        "4 ruedas, como tapas de botella, circulos de carton o ruedas de juguete pequenas",
        "2 palitos de madera, lapices o popotes para los ejes",
        "Trozos de popote para sostener los ejes en su lugar",
        "1 a 2 ligas",
        "Cinta adhesiva, pegamento y tijeras",
        "Opcional: diferentes tamanos de ruedas o ligas para probar mejoras",
      ],
      steps: [
        "Construye el cuerpo principal del auto usando carton, foamy u otro material ligero.",
        "Pega trozos de popote en la parte inferior del cuerpo del auto para sostener los ejes.",
        "Desliza palitos, lapices o popotes a traves de los soportes de eje.",
        "Pega las ruedas con cuidado en cada extremo de los ejes, asegurandote de que giren bien.",
        "Conecta un extremo de la liga al cuerpo del auto y el otro extremo al eje trasero.",
        "Retuerce o enrolla la liga girando las ruedas traseras o el eje hacia atras.",
        "Coloca el auto en una superficie lisa y plana.",
        "Suelta el auto y observa como avanza usando la energia de la liga.",
      ],
      safety:
        "Pide ayuda a un adulto con las tijeras y los palitos afilados. Mantén la liga lejos de tu cara al enrollarla porque puede regresar de golpe. No apuntes el auto hacia nadie al soltarlo.",
      challenge:
        "¿Puede tu auto recorrer mas distancia? Prueba con una liga mas resistente o mas gruesa, diferentes tamanos de ruedas o un cuerpo de auto mas largo o corto. Verifica si un auto mas ligero va mas lejos que uno mas pesado y compite contra otro equipo para ver que diseno gana.",
    },
    {
      slug: "lemon-powered-batteries",
      title: "Baterias de Limon",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Facil",
      time: "30-45 minutos",
      image: "/images/projects/lemon-powered-batteries.jpg",
      description:
        "Convierte limones en una bateria real y enciende un LED descubriendo como la energia quimica se convierte en energia electrica.",
      introduction: [
        "¿Sabias que un limon puede encender una luz? Parece imposible, pero el jugo de limon contiene acido que puede iniciar una reaccion quimica entre dos metales diferentes y producir una pequena corriente electrica.",
        "Este proyecto te ensena como funcionan las baterias reales, por que los cientificos combinan metales diferentes y que hacen los electrolitos, con algo que puedes encontrar en tu cocina.",
      ],
      why:
        "Una bateria de limon funciona gracias a una reaccion quimica entre dos metales diferentes y el jugo acido del limon. El clavo de zinc y la pieza de cobre actuan como electrodos, mientras que el jugo de limon actua como electrolito. Los electrones se mueven del zinc al cobre a traves de los cables, creando una pequena corriente electrica. Un solo limon puede no producir suficiente energia, por lo que conectar varios limones en cadena aumenta el voltaje total.",
      materials: [
        "2 a 4 limones",
        "Monedas de cobre, alambre de cobre o tiras de cobre",
        "Clavos de zinc o clavos galvanizados (lijados levemente para limpiar la superficie)",
        "Cables con pinzas de cocodrilo",
        "Foco LED pequeno, reloj digital o voltimetro",
        "Toallas de papel para la limpieza",
      ],
      steps: [
        "Rueda los limones suavemente sobre una mesa para aflojar el jugo por dentro.",
        "Inserta un clavo de zinc y una pieza de cobre en cada limon, asegurandote de que no se toquen entre si.",
        "Conecta la pieza de cobre de un limon al clavo de zinc del siguiente usando pinzas de cocodrilo.",
        "Continua conectando los limones en cadena si usas varios.",
        "Conecta los dos extremos libres de la cadena a un LED, reloj digital pequeno o voltimetro.",
        "Observa si el dispositivo enciende o cuanto voltaje producen los limones.",
      ],
      safety:
        "El jugo de limon es acido y puede arder si te llega a los ojos, asi que lavate las manos despues de manipular limones cortados. Pide ayuda a un adulto para insertar los clavos y conectar los cables. No pongas los cables ni las pinzas en la boca.",
      challenge:
        "¿Puedes encender un LED con mas de un limon? Intenta agregar mas limones y observa que cambia. Cambia el limon por una papa, naranja o manzana y compara cual fruta produce mas voltaje.",
    },
    {
      slug: "balloon-powered-car",
      title: "Auto Propulsado por Globo",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Facil",
      time: "1-2 horas",
      image: "/images/projects/balloon-powered-car.jpg",
      description:
        "Construye un auto que funciona con aire y descubre como la Tercera Ley de Newton convierte un globo en un motor poderoso.",
      introduction: [
        "Un auto propulsado por globo usa el aire que sale del globo para empujarse hacia adelante. Cuando el aire escapa hacia atras por un popote, el auto avanza. Eso es la Tercera Ley del Movimiento de Newton en accion.",
        "Puedes construirlo con materiales reciclados del hogar y luego probar como pequenos cambios en el diseno: como el tamano de las ruedas, el peso del auto o que tan bien esta sellado el globo, lo hacen recorrer mas distancia.",
      ],
      why:
        "Cuando el globo esta inflado, almacena energia potencial en el hule estirado y el aire comprimido. Al soltar el globo, el aire escapa hacia atras por el popote. Ese empuje hacia atras crea una reaccion igual y opuesta que impulsa el auto hacia adelante. La energia potencial almacenada se convierte en energia cinetica, que es la energia del movimiento.",
      materials: [
        "Un trozo pequeno de carton rigido o una botella de plastico para el cuerpo del auto",
        "4 tapas de botella de plastico para las ruedas",
        "2 palitos de madera o popotes resistentes para los ejes",
        "4 trozos cortos de popote para sostener los ejes",
        "1 globo",
        "1 popote",
        "Cinta adhesiva, tijeras y pegamento",
      ],
      steps: [
        "Pega trozos de popote en la parte de abajo del cuerpo del auto para sostener los ejes.",
        "Desliza los palitos o popotes a traves de los soportes de ejes.",
        "Pega las tapas de botella en los extremos de cada eje para crear las ruedas.",
        "Inserta un popote en el globo y pegalo con cinta para que no salga aire.",
        "Pega el motor de globo y popote encima del auto con el popote apuntando hacia la parte trasera.",
        "Infla el globo, pellizca el popote, coloca el auto en una superficie plana y sueltalo.",
      ],
      safety:
        "Pide ayuda a un adulto con las tijeras y los palitos afilados. Asegurate de colocar el auto en una superficie plana y segura antes de soltarlo, y mantén los dedos alejados de las ruedas y ejes giratorios durante la prueba.",
      challenge:
        "¿Puede tu auto recorrer mas distancia? Intenta usar ruedas mas grandes, hacer el cuerpo del auto mas liviano, crear una conexion de globo mas hermetica o competir contra otro equipo para ver que diseno gana.",
    },
    {
      slug: "corner-count",
      title: "El Conteo de la Esquina",
      category: "Matematicas",
      categoryKey: "math",
      difficulty: "Facil",
      time: "3 x 20 minutos",
      image: "/images/projects/The Corner Count.jpeg",
      description:
        "Cuenta el trafico de tu propia esquina en ventanas de tiempo iguales durante tres dias, haz una grafica con lo que encuentres y predice el siguiente conteo antes de ir a comprobarlo.",
      introduction: [
        "Los datos no viven solo en los libros de texto. Estan en tu calle ahora mismo, y nadie los ha anotado todavia.",
        "En este proyecto tu eres quien los anota. Eliges un punto, cuentas lo que pasa en una ventana fija de tiempo y lo repites hasta que aparezca un patron. Despues viene la parte dificil: predices el siguiente numero antes de salir a contarlo.",
      ],
      why:
        "Un patron que tu mismo descubres vale mas que uno que te entregan. Contar en ventanas iguales y fijas es lo que hace que los numeros se puedan comparar, y compararlos es lo que convierte un monton de rayitas en una grafica de barras que dice algo. Predecir antes de medir es el metodo cientifico completo en veinte minutos: te comprometes con una respuesta y dejas que el mundo real te diga que tan cerca estuviste.",
      materials: [
        "Un cuaderno, o la hoja de conteo imprimible de esta pagina",
        "Un lapiz",
        "Un cronometro o el reloj del telefono",
        "Un lugar seguro para pararte o sentarte, bien alejado de la calle",
        "Un adulto que se quede contigo",
        "Lapices de colores o marcadores para la grafica",
      ],
      steps: [
        "Elige un punto al que puedas llegar facil y con seguridad, como una ventana que de a la calle o una banca alejada de la orilla. Usa exactamente el mismo punto todas las veces.",
        "Elige tres cosas para contar. Carros, personas caminando y perros es un buen comienzo, pero bicicletas, autobuses o camionetas de reparto tambien sirven.",
        "Pon el cronometro en 10 minutos. Cada vez que pase una de tus tres cosas, haz una rayita. Cuando suene el cronometro, deja de contar, aunque algo vaya pasando a la mitad.",
        "Anota la fecha, la hora de inicio y el clima junto a tus rayitas. Esas tres notas son las que te dejaran comparar una ventana con otra despues.",
        "Repite a la misma hora del dia durante dos dias mas, para terminar con tres ventanas que puedas comparar de forma justa.",
        "Dibuja una grafica de barras con tus tres cosas abajo y los conteos subiendo por el costado. Usa un color por dia para que los tres dias queden uno junto al otro.",
        "Antes de tu cuarto conteo, escribe una prediccion para cada categoria y una frase que explique por que elegiste ese numero. Despues sal a contar y anota el numero real junto a tu prediccion.",
      ],
      safety:
        "Cuenta desde un lugar que un adulto haya aprobado, como una ventana, un porche o una banca detras de la banqueta, y quedate bien alejado de la calle. Nunca te bajes de la banqueta para ver mejor, y nunca cuentes solo cerca del trafico. Si esta oscuro o hace mal tiempo, cuenta desde adentro.",
      challenge:
        "Cambia una sola cosa y vuelve a contar: la hora del dia, el dia de la semana o la esquina misma. Cual de las tres mueve mas los numeros? Despues intenta predecir una ventana a una hora que nunca hayas contado y comprueba si tu patron sigue funcionando.",
      recordSheet: {
        title: "Hoja de Conteo de Trafico",
        intro:
          "Imprime esta hoja y llena una fila por cada ventana de conteo. Manten todas las ventanas exactamente del mismo largo, o los numeros no se podran comparar.",
        columns: ["Fecha", "Hora de inicio", "Clima", "Carros", "Personas caminando", "Perros"],
        rows: 4,
        footnote:
          "Antes de tu ultima ventana, escribe tu prediccion para cada columna en el margen. Al terminar, encierra en un circulo aquella en la que quedaste mas cerca.",
      },
    },
    {
      slug: "sock-sorter",
      title: "El Clasificador de Calcetines",
      category: "IA",
      categoryKey: "ai",
      difficulty: "Facil",
      time: "1 hora",
      image: "/images/projects/The Sock Sorter.png",
      description:
        "Separa treinta cosas tuyas en dos montones, escribe las reglas que una computadora necesitaria para distinguirlas y despues construye a proposito tres objetos que rompan tus propias reglas.",
      introduction: [
        "Cada vez que un telefono encuentra una cara en una foto o una aplicacion decide que un mensaje es spam, algo aprendio la diferencia a partir de ejemplos. No porque le dieran la respuesta, sino porque le mostraron montones de cosas.",
        "Tu vas a hacer ese mismo trabajo a mano. Dos montones, treinta objetos y un conjunto de reglas escritas con tu propia letra. Despues vas a intentar vencer tus propias reglas, que es donde los equipos profesionales de IA pasan la mayor parte de su tiempo.",
      ],
      why:
        "Una computadora no puede ver un calcetin. Solo puede medir cosas sobre el calcetin: que tan largo es, cuantos colores tiene, si tiene talon. Las medidas que eliges se llaman caracteristicas, y elegirlas es casi todo el trabajo. Los objetos que inventas al final se llaman casos limite, y son donde fallan los sistemas reales. Buscarlos a proposito es como aprendes que una respuesta segura y una respuesta correcta no son lo mismo.",
      materials: [
        "Treinta objetos de la casa que se separen en dos grupos claros",
        "Papel y un lapiz",
        "Una regla",
        "Dos cajas, charolas o toallas para sostener los montones",
        "La camara de un telefono o tableta, opcional, para fotografiar cada monton",
      ],
      steps: [
        "Elige dos grupos que puedas distinguir de un vistazo: calcetines y guantes, tenedores y cucharas, monedas y botones. Junta unos quince de cada uno y separalos en dos montones.",
        "Fotografia o dibuja cada monton para tener un registro. Este conjunto es lo unico de lo que tus reglas pueden aprender, asi que vale la pena guardarlo.",
        "Sin tocar una computadora, haz una lista de todas las medidas que podrias tomar de un objeto: largo en centimetros, numero de colores, numero de agujeros, si se dobla, si brilla. Esas son tus caracteristicas.",
        "Ahora escribe tus reglas usando solo esas medidas. Por ejemplo: si mide mas de 12 cm y no tiene agujeros, es un calcetin. Que cada regla sea lo bastante corta para leerla en voz alta de un tiron.",
        "Prueba tus reglas con los treinta objetos, uno por uno. Marca cada objeto en el que tus reglas se equivoquen y cuentalos. Ese numero es tu tasa de error.",
        "Cambia una sola regla y vuelve a probar los treinta. Anota las dos calificaciones para ver si el cambio de verdad ayudo.",
        "Ahora ataca tu propio trabajo. Encuentra o construye tres objetos con los que tus reglas se van a equivocar a proposito: un calcetin muy corto, un guante con los dedos metidos hacia adentro, algo que de alguna forma sea las dos cosas. Pruebalos y anota que dijeron tus reglas y por que se dejaron enganar.",
      ],
      safety:
        "Usa cosas tuyas, o pide permiso antes de tomarlas prestadas. Si cortas o modificas algo para construir un caso limite, pide a un adulto que te ayude con las tijeras y elige objetos que a nadie le importe perder.",
      challenge:
        "Entrega tus reglas escritas a otra persona, sin tus montones, y pidele que separe un conjunto nuevo de objetos usando solo lo que escribiste. Cada error que cometa es una regla que creias clara y no lo era. Esa distancia, entre lo que querias decir y lo que en realidad escribiste, es la misma que mete errores en los sistemas de IA reales.",
      recordSheet: {
        title: "Registro de Pruebas de Reglas",
        intro:
          "Una fila por ronda de prueba. Pasa tus reglas por los treinta objetos, cuenta en cuantos se equivocaron, despues cambia una regla y vuelve a pasarlas.",
        columns: ["Ronda", "Regla que cambiaste", "Objetos probados", "Acertados", "Fallados"],
        rows: 4,
        footnote:
          "Si una ronda empeora la calificacion, conserva la fila de todos modos. Un cambio que hizo dano tambien es evidencia, y borrarlo es como la gente termina enganandose a si misma.",
      },
    },
    {
      slug: "teardown-night",
      title: "Noche de Desarmado",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Medio",
      time: "1-2 horas",
      image: "/images/projects/Teardown Night.png",
      description:
        "Desarma un aparato descompuesto junto con un adulto, acomoda cada pieza en el orden en que salio y descubre que trabajo hacia cada una.",
      introduction: [
        "Casi toda la gente tira una cosa descompuesta sin averiguar nunca que tenia adentro. Eso es una leccion completa de ingenieria yendose a la basura.",
        "Esta noche abres uno. No lo vas a arreglar, y no hace falta. El trabajo es sacar cada pieza, mantenerlas en orden y descubrir para que servia cada una.",
      ],
      why:
        "Construir algo te ensena como funciona un diseno. Desarmar cosas te ensena como funcionan cien disenos, porque cada producto que abres fue la respuesta de alguien a un problema y tu puedes leer esa respuesta directamente. Acomodar las piezas en el orden en que salieron es lo que hace posible volver a armarlo, y lo que convierte un monton de partes en un mapa de como se construyo la cosa.",
      materials: [
        "Un aparato descompuesto que nadie quiera de vuelta: un control remoto, un raton con cable, audifonos con cable, un tostador viejo, un despertador mecanico",
        "Un juego de desarmadores pequenos, de preferencia de cruz y planos",
        "Una toalla o charola para acomodar las piezas",
        "Tazones pequenos, o una charola de hielos, para mantener los tornillos en orden",
        "La camara de un telefono",
        "Un adulto, presente durante todo el proyecto",
      ],
      steps: [
        "Junto con un adulto, elige el aparato y comprueba que sea seguro abrirlo: desconectado desde hace al menos un dia, sin pilas y sin pantalla ni capacitores grandes adentro.",
        "Fotografia el exterior por todos lados antes de tocar un solo tornillo. Ese es tu registro de como se veia completo.",
        "Busca todos los tornillos, incluidos los que se esconden debajo de las patitas de hule y las calcomanias. Pon cada tornillo en su propio tazon o hueco de la charola de hielos, en el orden en que lo quitaste.",
        "Abre la carcasa despacio. Si no se separa, es que hay un tornillo o un broche que todavia no encuentras. La fuerza casi nunca es la respuesta.",
        "Saca una pieza a la vez y acomodala en la toalla de izquierda a derecha, en el orden exacto en que salio. Fotografia la fila cada pocas piezas.",
        "Para cada pieza, escribe una frase: que es y que trabajo hacia. Si no lo puedes saber, escribe tu mejor suposicion y ponle un signo de interrogacion.",
        "Encuentra la pieza que fallo, si puedes. Busca marcas de quemado, plastico roto, un cable suelto o un engrane desgastado. Despues decide: se podria haber disenado de forma que no se rompiera?",
      ],
      safety:
        "Un adulto debe estar presente durante todo el proyecto. Abre solo aparatos desconectados, sin pilas y que lleven al menos un dia sin usarse. Nunca abras un microondas, una television, un monitor, el flash de una camara ni nada mas que contenga un capacitor grande, porque esos pueden guardar una carga peligrosa mucho despues de haberse desconectado. Cuidado con los bordes filosos de metal y con los resortes tensados, y usa lentes de seguridad mientras haces palanca para abrir la carcasa.",
      challenge:
        "Redisena una pieza. Escoge la que fallo, o la que hizo mas dificil abrir el aparato, y dibuja una version que lo arregle. Despues cuenta los tornillos: podria tu version usar menos? Los productos que se desarman con facilidad son mas faciles de reparar, y las cosas reparables se quedan fuera del basurero mucho mas tiempo.",
      recordSheet: {
        title: "Inventario de Piezas",
        intro:
          "Una fila por pieza, en el orden en que salio. Llena la ultima columna aunque estes adivinando, y marca las suposiciones con un signo de interrogacion.",
        columns: ["#", "Nombre de la pieza", "De que esta hecha", "Trabajo que hacia"],
        rows: 10,
        footnote:
          "Si intentas volver a armarlo, recorre la hoja de abajo hacia arriba: la ultima pieza que salio es la primera que entra.",
      },
    },
    {
      slug: "egg-drop-budget",
      title: "Caida de Huevo con Presupuesto",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Dificil",
      time: "2 horas",
      image: "/images/projects/Egg Drop on a Budget.jpg",
      description:
        "Protege un huevo crudo usando materiales que cuestan puntos. Dibuja y predice antes de construir, tiralo tres veces y califica la supervivencia dividida entre lo que gastaste.",
      introduction: [
        "Cualquiera puede proteger un huevo si le permiten relleno ilimitado. Lo envuelves en una almohada y ya terminaste, y no aprendiste nada.",
        "Por eso esta version te cobra. Cada popote, cada centimetro de cinta, cada bolita de algodon cuesta puntos, y tu calificacion es si el huevo sobrevivio dividido entre lo que gastaste. De pronto el diseno importa mucho mas que el relleno.",
      ],
      why:
        "La ingenieria real casi nunca pide la mejor cosa posible. Pide la mejor cosa que puedas construir con el dinero, el peso o el espacio que te dieron, y eso se llama disenar bajo restriccion. El presupuesto es lo que convierte esto de una manualidad en un problema de ingenieria. Escribir tu prediccion antes de tirarlo es la otra mitad: si decides lo que esperabas hasta despues de ver el resultado, puedes convencerte de que siempre lo supiste.",
      materials: [
        "Un huevo crudo por intento, mas un par de repuestos",
        "Popotes, 1 punto cada uno",
        "Bolitas de algodon, 3 puntos cada una",
        "Papel, 1 punto por hoja",
        "Carton, 2 puntos por pedazo del tamano de tu mano",
        "Hilo, 1 punto por el largo de tu brazo",
        "Cinta, 1 punto por cada 10 cm",
        "Una bolsa de plastico, 5 puntos",
        "Una regla, un lapiz y papel para dibujar, gratis",
        "Una lona, bolsa de basura o toalla vieja para la zona de aterrizaje",
      ],
      steps: [
        "Acuerda con un adulto la altura de caida y usa exactamente esa altura en cada ronda. Una ventana del segundo piso o la parte alta de una escalera de tijera funcionan, siempre que la zona de aterrizaje este despejada.",
        "Copia la lista de precios y fija un presupuesto para la primera ronda. Quince puntos es un buen limite inicial.",
        "Dibuja tu diseno antes de tocar cualquier material. Senala que parte frena la caida, que parte absorbe el impacto y que parte mantiene quieto al huevo.",
        "Escribe tu prediccion: sobrevivira el huevo, y que parte de tu diseno fallara primero? Una frase para cada pregunta, y no se vale cambiarla despues.",
        "Construyelo y despues suma lo que de verdad gastaste. Si te pasaste del presupuesto, quita algo antes de tirarlo.",
        "Tiralo. No lo avientes hacia abajo, solo sueltalo. Abrelo, fotografia los danos y escribe lo que en realidad paso junto a lo que habias predicho.",
        "Haz dos rondas mas, cada una con un presupuesto menor que la anterior. Califica cada ronda como supervivencia entre puntos gastados y observa si tener menos te obligo a ser mas listo.",
      ],
      safety:
        "Un adulto debe fijar y aprobar tanto la altura de caida como la zona de aterrizaje, y debe ser quien suelte el huevo desde cualquier altura por encima de la cabeza. Manten a todos alejados de la zona de aterrizaje antes de cada caida. El huevo crudo puede tener salmonela, asi que trabaja sobre una superficie lavable, lavate las manos despues de cada ronda y limpia de inmediato cualquier huevo roto.",
      challenge:
        "Reduce tu presupuesto a la mitad e intenta mantener vivo el huevo de todos modos. Despues haz lo contrario: deja el mismo presupuesto pero duplica la altura de caida. Cual de los dos limites fue mas dificil de resolver? La mayoria de los problemas de ingenieria tienen exactamente esta forma, y descubrir cual restriccion es la que manda es casi toda la habilidad.",
      recordSheet: {
        title: "Bitacora de Caidas",
        intro:
          "Una fila por ronda. La columna de prediccion se llena antes de la caida, nunca despues.",
        columns: ["Ronda", "Presupuesto", "Puntos gastados", "Resultado predicho", "Resultado real", "Calificacion"],
        rows: 3,
        footnote:
          "La calificacion es 1 si el huevo sobrevivio y 0 si se rompio, dividido entre los puntos que gastaste. Un huevo estrellado pero entero cuenta como medio.",
      },
    },
    {
      slug: "bean-race",
      title: "La Carrera de Frijoles de 30 Dias",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Facil",
      time: "30 dias, 5 minutos al dia",
      image: "/images/projects/The 30-Day Bean Race.jpg",
      description:
        "Cuatro frijoles, cuatro vasos y una sola cosa que cambias a proposito. Mide cada manana durante treinta dias, deja un vaso intacto como control y descubre que fue lo que de verdad importo.",
      introduction: [
        "Casi todos los experimentos que terminas en una tarde se acaban antes de que pase algo interesante. Las plantas no funcionan asi. Un frijol se toma su tiempo, y esa espera es lo que este proyecto realmente ensena.",
        "Vas a arrancar cuatro vasos el mismo dia, cambiar exactamente una cosa entre ellos y medir todas las mananas durante un mes. Al final tendras una grafica que nadie te entrego.",
      ],
      why:
        "El vaso en el que no cambias nada se llama control, y es el vaso mas importante de la ventana. Sin el no puedes saber si tus frijoles crecieron por lo que hiciste o porque los frijoles crecen de todos modos. Cambiar una sola cosa a la vez es lo que te permite afirmar que ese cambio causo la diferencia, y medir con un horario, incluso los dias en que parece que no pasa nada, es lo que te mantiene honesto.",
      materials: [
        "Cuatro frijoles secos del mismo tipo, de una bolsa de frijol pinto o bayo",
        "Cuatro vasos o frascos transparentes, todos del mismo tamano",
        "Bolitas de algodon, servilletas de papel o tierra para macetas",
        "Agua",
        "Una regla marcada en centimetros",
        "Cinta adhesiva y un marcador para etiquetar los vasos",
        "Un cuaderno y la camara de un telefono",
      ],
      steps: [
        "Remoja los cuatro frijoles en agua toda la noche, para que todos empiecen desde el mismo punto.",
        "Prepara los cuatro vasos exactamente igual: algodon humedo o tierra, un frijol pegado a la pared del vaso para que puedas verlo, y una etiqueta. El vaso 1 es tu control, y nada de el cambia durante treinta dias.",
        "Elige una sola cosa para cambiar, y cambiala solo en los vasos 2, 3 y 4. La cantidad de luz, la cantidad de agua o la temperatura funcionan bien. Anota con precision que cambiaste y cuanto.",
        "Pon los cuatro vasos en el mismo lugar y a la misma hora, a menos que la luz o la temperatura sea justo lo que estas probando.",
        "Cada manana, mas o menos a la misma hora, mide la altura de cada brote en centimetros y toma una foto de cada vaso desde el mismo angulo.",
        "Escribe los cuatro numeros en tu hoja incluso los dias en que no cambio nada. Una fila de ceros son datos reales, y saltartela esconde cuanto tardo de verdad la germinacion.",
        "El dia treinta, dibuja cuatro lineas en una sola grafica, una por vaso, con los dias abajo y la altura subiendo por el costado. Despues acomoda tus treinta fotos en orden y pasalas rapido.",
      ],
      safety:
        "Los frijoles de este proyecto son para sembrar, no para comer: los frijoles crudos y remojados pueden enfermarte. Lavate las manos despues de tocar la tierra y manten los vasos fuera del alcance de mascotas y ninos pequenos. Si a un vaso le sale moho, pide a un adulto que tire ese vaso.",
      challenge:
        "Hazlo una segunda vez, pero el dia uno escribe como esperas que se vea la grafica y dibuja las cuatro lineas antes de tener un solo dato. Despues cambia algo mas dificil de controlar, como el tipo de agua o el tamano del recipiente, y comprueba si tu prediccion sigue funcionando.",
      recordSheet: {
        title: "Bitacora de Crecimiento de 30 Dias",
        intro:
          "Una fila por dia. Mide mas o menos a la misma hora cada manana, y anota un numero aunque ese numero sea cero.",
        columns: ["Dia", "Vaso 1 (control)", "Vaso 2", "Vaso 3", "Vaso 4", "Notas"],
        rows: 15,
        footnote:
          "Imprime dos copias para cubrir los treinta dias. Las alturas van en centimetros. Usa Notas para cualquier cosa rara: moho, una hoja que se abre, un vaso que olvidaste regar.",
      },
    },
    {
      slug: "rover-wheels",
      title: "Ruedas de Rover contra la Arena",
      category: "Robotica",
      categoryKey: "robotics",
      difficulty: "Medio",
      time: "2 horas",
      image: "",
      description:
        "Construye cuatro ruedas distintas con carton y tapas de botella, haz correr el mismo chasis sobre la misma charola de arena y grava, y mide cual diseno de verdad llega mas lejos.",
      introduction: [
        "La parte mas dificil de manejar en Marte no es manejar. Es que el suelo esta suelto, y una rueda que funciona perfecto en un piso liso puede excavarse un hoyo y quedarse atorada.",
        "No necesitas un kit de robotica para trabajar en ese problema. Necesitas una charola con arena, un chasis rodante sencillo y cuatro juegos de ruedas que hiciste diferentes a proposito.",
      ],
      why:
        "Todo lo que no sean las ruedas tiene que quedarse igual o no aprendes nada: mismo chasis, misma rampa, misma arena, mismo punto de salida. Eso se llama controlar tus variables, y es lo que te permite decir que las ruedas causaron la diferencia. Los equipos de rovers reales hacen exactamente esto, probando disenos de ruedas en campos de prueba aqui en la Tierra, porque no se puede mandar a nadie a Marte a arreglar una rueda que salio mal.",
      materials: [
        "Una charola poco profunda, bandeja de horno o tapa de caja",
        "Arena, tierra seca o una mezcla de arroz con grava pequena",
        "Carton para el chasis y para las ruedas",
        "Tapas de botella, tapas de frasco y circulos de carton para variar las ruedas",
        "Palitos de brocheta, popotes o lapices para los ejes",
        "Cinta, una regla y tijeras",
        "Un libro o una tabla para hacer una rampa pequena",
        "Ligas y carton corrugado para agregar dibujo a las ruedas",
      ],
      steps: [
        "Construye un chasis sencillo: un rectangulo de carton con dos popotes pegados debajo como soportes de eje. Este es el unico chasis que tendras, asi que hazlo resistente y usalo en absolutamente todas las corridas.",
        "Llena la charola con arena o grava de unos dos centimetros de profundidad y alisala. Vuelve a alisarla antes de cada corrida.",
        "Coloca una rampa en un extremo para que cada corrida empiece con exactamente el mismo empuje. Marca el punto de salida y no lo muevas nunca.",
        "Haz cuatro juegos de ruedas que se diferencien cada uno en una cosa evidente: angostas contra anchas, lisas contra con dibujo, de diametro chico contra grande. Anota que hace distinto a cada juego.",
        "Corre el juego uno tres veces, alisando la arena entre corridas. Mide desde el final de la rampa hasta el frente del chasis y anota las tres distancias.",
        "Repite con los cuatro juegos, tres corridas cada uno. Doce corridas en total, sin cambiar la rampa ni el chasis en el camino.",
        "Saca el promedio de las tres distancias de cada juego y compara. Despues observa las huellas que quedaron en la arena, porque las ruedas que se enterraron te dicen tanto como las que no.",
      ],
      safety:
        "Pide ayuda de un adulto con las tijeras y para cortar los palitos de brocheta a la medida, y cubre con cinta cualquier punta filosa. Haz la prueba sobre una charola para que la arena no se riegue, y manten la arena y las piezas pequenas lejos de mascotas y ninos pequenos. Lavate las manos al terminar.",
      challenge:
        "Agrega peso. Pega un objeto pequeno al chasis y vuelve a correr los cuatro juegos de ruedas. Sigue ganando el mismo? Los rovers reales se vuelven mas pesados conforme les agregan instrumentos, y una rueda que funciona vacia puede fallar cargada. Despues intenta la superficie mas dificil que puedas armar: arena suelta en una pendiente.",
      recordSheet: {
        title: "Resultados de la Prueba de Ruedas",
        intro:
          "Tres corridas por juego de ruedas, doce corridas en total. Alisa la arena antes de cada corrida sin excepcion.",
        columns: [
          "Juego de ruedas",
          "Que lo hace distinto",
          "Corrida 1 (cm)",
          "Corrida 2 (cm)",
          "Corrida 3 (cm)",
          "Promedio",
        ],
        rows: 4,
        footnote:
          "Si una corrida sale muy distinta de las otras dos, no la borres. Anota al lado que salio mal, porque ahi suele esconderse la falla mas interesante.",
      },
    },
    {
      slug: "family-chatbot",
      title: "Un Chatbot Que Solo Conoce a Tu Familia",
      category: "Programacion",
      categoryKey: "coding",
      difficulty: "Medio",
      time: "2 horas",
      image: "/images/projects/A Chatbot That Only KNows Your Family.jpeg",
      description:
        "Escribe en Python un chatbot que conozca a tu familia y nada mas, despues hazle las mismas preguntas a un asistente de IA real y descubre en que se equivoca cada uno.",
      introduction: [
        "Un chatbot que lo sabe todo es impresionante y casi imposible de entender. Un chatbot que solo sabe el nombre de tu perro y el cumpleanos de tu abuela no es ninguna de las dos cosas, y justo por eso vale la pena construirlo.",
        "El tuyo son unas treinta lineas de Python, escritas en el editor de este sitio, sin instalar nada. Despues le haras a un asistente de IA real las mismas preguntas que tu bot puede contestar, y anotaras donde falla cada uno.",
      ],
      why:
        "Tu bot busca cosas. Guarda un diccionario de datos, y cuando una pregunta no coincide con ninguno, no tiene nada que ofrecer. Un modelo de lenguaje grande hace algo completamente distinto: predice texto probable, por eso puede contestar casi cualquier cosa y por eso a veces inventa una respuesta con total seguridad. Ver las dos conductas lado a lado, en preguntas cuya respuesta verdadera ya conoces, es la forma mas clara de entender que hacen en realidad estas herramientas.",
      materials: [
        "Una computadora o tableta con navegador",
        "El editor de Python de este sitio, para no instalar nada",
        "Una lista de unos diez datos verdaderos sobre tu casa",
        "Papel y lapiz para las notas de comparacion",
        "Acceso a un asistente de IA, con un adulto, para los ultimos dos pasos",
      ],
      steps: [
        "Abre el editor de Python de este sitio y escribe el programa inicial de abajo, o pegalo. Ejecutalo y preguntale por el perro. Despues preguntale algo de lo que nunca ha oido hablar y observa que hace.",
        "Cambia los tres datos por datos verdaderos de tu propia casa. Manten cada palabra clave corta y en minusculas, porque esa es la palabra que tu bot busca dentro de la pregunta.",
        "Agrega siete datos mas, hasta tener diez. Ejecuta el programa cada dos o tres, porque una coma que falta es mucho mas facil de encontrar cuando solo agregaste dos lineas.",
        "Intenta romperlo. Pregunta por el perro sin usar la palabra perro. Pregunta dos cosas en una sola oracion. Anota cada pregunta que deberia haber funcionado y no funciono.",
        "Arregla una de esas fallas. Hacer que dos palabras clave distintas apunten a la misma respuesta es la reparacion mas sencilla, por ejemplo que tanto 'perro' como el nombre real de tu perro devuelvan el mismo dato.",
        "Ahora hazle a un asistente de IA, con un adulto presente, esas mismas diez preguntas. Es imposible que conozca las respuestas verdaderas. Anota de todos modos lo que conteste.",
        "Llena la hoja de comparacion. Tu bot dice que no sabe cuando no sabe. Anota que hace el asistente en su lugar y despues decide cual de esas dos conductas preferirias en algo de lo que dependes.",
      ],
      codeBlock: {
        title: "El programa inicial",
        intro:
          "Treinta lineas, y cada una hace algo que puedes senalar con el dedo. El diccionario de arriba es lo unico que tu bot sabe; todo lo de abajo es el ciclo que lee una pregunta y busca una palabra clave que coincida.",
        code: `datos = {
    "perro": "Nuestra perra se llama Pepper y tiene 4 anos.",
    "carro": "El carro es un Honda azul.",
    "cumpleanos": "El cumpleanos de la abuela es el 2 de marzo.",
}

print("Preguntame sobre mi familia. Escribe adios para terminar.")

while True:
    pregunta = input("> ").lower()

    if pregunta == "adios":
        print("Hasta luego.")
        break

    respuesta = "Esa no me la se."

    for clave in datos:
        if clave in pregunta:
            respuesta = datos[clave]

    print(respuesta)`,
        note:
          "La linea mas importante es la que pone la respuesta en 'Esa no me la se' antes de que empiece la busqueda. Ese valor por defecto es lo que hace que tu bot admita cuando no tiene nada, y es exactamente la conducta que un modelo de lenguaje no tiene.",
      },
      safety:
        "Deja fuera de tus datos cualquier cosa privada: nada de nombres completos, direccion de tu casa, numeros de telefono, contrasenas ni el nombre de tu escuela. Solo nombres de pila o apodos. Ten a un adulto contigo en los pasos que usan un asistente de IA, y nunca escribas los datos de tu familia dentro de uno.",
      challenge:
        "Dale memoria a tu bot. Guarda en una variable la ultima palabra clave que encontro, y despues deja que una repregunta como 'cuantos anos tiene' use esa palabra guardada en vez de buscar otra vez. Esa sola funcion es la diferencia entre una tabla de busqueda y algo que se siente como una conversacion, y tambien es donde tu bot empezara a confundirse exactamente igual que los asistentes reales.",
      recordSheet: {
        title: "Tu Bot contra el Asistente",
        intro:
          "Diez preguntas cuya respuesta verdadera ya conoces. Llena las cuatro columnas para cada una.",
        columns: ["Pregunta", "Respuesta verdadera", "Lo que dijo tu bot", "Lo que dijo el asistente"],
        rows: 10,
        footnote:
          "Marca cada fila donde el asistente dio una respuesta segura que no era cierta. Esa conducta tiene nombre, alucinacion, y esta tabla eres tu documentandola.",
      },
    },
    {
      slug: "loudest-room",
      title: "El Cuarto Mas Ruidoso de la Casa",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Medio",
      time: "2 horas",
      image: "",
      description:
        "Mide cada cuarto con un sonometro en el telefono, encuentra el mas ruidoso y despues construye una caja silenciadora con materiales de casa y mide cuantos decibeles te gana cada capa.",
      introduction: [
        "Todos en tu casa ya tienen una opinion sobre cual es el cuarto mas ruidoso. Casi nadie lo ha medido.",
        "Una aplicacion gratuita de sonometro convierte un telefono en un instrumento de verdad. En cuanto puedes ponerle un numero al ruido, las discusiones se vuelven mediciones, y puedes empezar a disenar hacia una meta en vez de hacia una sensacion.",
      ],
      why:
        "Los decibeles no se suman como los numeros normales. La escala es logaritmica, asi que cada 10 decibeles equivalen aproximadamente a duplicar lo fuerte que algo se escucha, lo que significa que quitarle 10 dB a un sonido es un logro mucho mayor de lo que el numero aparenta. Medir la misma fuente desde la misma distancia todas las veces es lo que hace comparables tus lecturas, y es la unica razon por la que puedes afirmar que fue la capa de toalla, y no el cuarto, la que hizo la diferencia.",
      materials: [
        "Un telefono o tableta con una aplicacion gratuita de sonometro, elegida con un adulto",
        "Una fuente de sonido constante, como un segundo telefono que repita el mismo audio al mismo volumen",
        "Una caja de zapatos o una caja de carton pequena",
        "Toallas, una cobija, carton de huevo, plastico de burbujas, periodico arrugado",
        "Cinta y tijeras",
        "Una cinta metrica o una regla larga",
      ],
      steps: [
        "Instala una aplicacion de sonometro con un adulto y aprende a leerla. Casi todas reportan decibeles, escritos dB, y el numero brinca todo el tiempo, asi que toma el punto medio del rango y no el pico mas alto.",
        "Mapea el nivel de fondo de cada cuarto sin nada encendido: sosten el telefono a la altura del pecho en el centro del cuarto, espera diez segundos y anota el numero. Ese es tu punto de partida.",
        "Ahora encuentra el cuarto mas ruidoso durante la vida normal, con la television encendida, el lavavajillas trabajando y todos hablando. Misma altura, mismo centro del cuarto, los mismos diez segundos.",
        "Arma una prueba repetible. Pon tu fuente de sonido constante en el piso, marca un punto a exactamente un metro y mide desde esa marca todas las veces. Anota la lectura sin ninguna caja.",
        "Mete la fuente de sonido dentro de la caja de carton vacia y vuelve a medir desde la misma marca. Anota la caida en decibeles.",
        "Agrega un material a la vez: una capa de toalla, despues carton de huevo, despues periodico arrugado. Mide despues de cada capa, y nunca agregues dos materiales en la misma ronda.",
        "Grafica los decibeles contra el numero de capas. Encuentra la capa que consiguio la mayor caida con el menor bulto y escribe por que crees que gano.",
      ],
      safety:
        "Nunca hagas la prueba con ruido fuerte cerca de tus oidos, y no le subas a la fuente para que los numeros se vean mas dramaticos. El sonido sostenido por encima de unos 85 dB puede danar la audicion de forma permanente. Manten la fuente a un volumen normal de escucha y deja que la caja haga el trabajo. Pide permiso a un adulto antes de instalar cualquier aplicacion.",
      challenge:
        "Intenta silenciar un cuarto entero en vez de una caja. Mide el cuarto, cuelga una cobija sobre la superficie plana y dura mas grande, y vuelve a medir desde exactamente el mismo punto. Las cosas suaves absorben el sonido y las duras y planas lo rebotan, que es la razon por la que un cuarto vacio hace eco y uno con tapete no. Cuantos decibeles le puedes quitar a un cuarto real sin mover un solo mueble?",
      recordSheet: {
        title: "Bitacora de Decibeles",
        intro:
          "Mismo punto, misma distancia, misma fuente, todas las veces. Anota el punto medio del rango, no el pico mas alto.",
        columns: ["Prueba", "Que cambio", "Lectura 1 (dB)", "Lectura 2 (dB)", "Lectura 3 (dB)", "Promedio"],
        rows: 8,
        footnote:
          "Tres lecturas por prueba, porque un sonometro nunca da el mismo numero dos veces. Si las tres salen muy separadas, algo se movio: revisa la distancia antes de confiar en el promedio.",
      },
    },
    {
      slug: "receipt-detective",
      title: "Detective de Tickets",
      category: "Matematicas",
      categoryKey: "math",
      difficulty: "Medio",
      time: "1 hora",
      image: "/images/projects/Receipt Detective.jpeg",
      description:
        "Toma un ticket real del super, calcula el costo por unidad de todo lo que viene en mas de un tamano y encuentra los tres lugares donde tu familia esta pagando de mas.",
      introduction: [
        "El precio del estante no es en realidad el precio que estas pagando. El precio que pagas es el precio por onza, y la tienda casi nunca pone esa parte en letras grandes.",
        "Un ticket, una calculadora y como una hora bastan para encontrarlo. Al final tendras una recomendacion de una pagina con numeros reales detras, sobre dinero que tu familia de verdad gasta.",
      ],
      why:
        "El costo por unidad es una tasa unitaria, y las tasas unitarias son lo mas dificil de las matematicas de primaria para que a alguien le importen, porque normalmente llegan como una hoja de ejercicios sin consecuencias. Aqui la respuesta cambia lo que se compra. Dividir precio entre tamano para comparar dos cosas que vienen en tamanos distintos es la misma operacion sirva para cajas de cereal, planes de telefono o cuanto rinde un tanque de gasolina, y en cuanto lo haces de verdad una vez, deja de ser abstracto.",
      materials: [
        "Un ticket real del super, usado con permiso",
        "Una calculadora, o la del telefono",
        "Papel y lapiz",
        "Los tamanos de los empaques, lo que puede significar una revisada rapida a la alacena",
        "Un adulto con quien platicar los hallazgos al final",
      ],
      steps: [
        "Pide un ticket y permiso para usarlo. Copia cada producto en tu hoja junto con lo que costo.",
        "Tacha todo lo que solo viene en un tamano, como un aguacate suelto. Necesitas productos de los que exista una version mas grande o mas chica en el estante.",
        "Para cada producto que quede, busca el tamano impreso en el empaque: onzas, gramos, mililitros o una cuenta como 12 rollos. Escribe ese tamano junto al precio.",
        "Divide precio entre tamano en cada uno. Ese numero es el costo por unidad, y es la unica forma justa de comparar dos tamanos distintos de la misma cosa. Redondea al centavo mas cercano.",
        "Busca el precio del otro tamano de tres de tus productos, en linea o en la siguiente ida a la tienda, y calcula tambien su costo por unidad.",
        "Compara. Encuentra los tres productos donde el tamano que compro tu familia cuesta mas por unidad que el otro tamano disponible.",
        "Escribe una recomendacion de una pagina: los tres productos, el costo por unidad de cada tamano, cuanto suma la diferencia en un ano y una frase sobre cuando comprar el tamano chico sigue siendo lo correcto.",
      ],
      safety:
        "Este proyecto toca el dinero de tu familia, asi que pide permiso antes de usar un ticket y guarda dentro de casa lo que descubras. Nunca fotografies un ticket para publicarlo: los tickets pueden traer los ultimos digitos de una tarjeta, un numero de cuenta de la tienda y un registro de donde compra tu familia y cuando.",
      challenge:
        "Comprueba si lo mas grande siempre sale mas barato. Casi siempre lo es, y justo por eso las tiendas saben que los compradores lo van a dar por hecho. Encuentra un producto en tu cocina donde el tamano grande cueste mas por unidad que el chico. Despues calcula cuanto del tamano grande se acaba tu familia antes de que se eche a perder, porque un precio por unidad mas bajo en comida que nadie se come no es ningun ahorro.",
      recordSheet: {
        title: "Hoja de Costo por Unidad",
        intro:
          "Una fila por producto. Divide precio entre tamano para llenar la ultima columna y redondea al centavo mas cercano.",
        columns: ["Producto", "Precio", "Tamano (oz / g / piezas)", "Costo por unidad"],
        rows: 12,
        footnote:
          "Compara solo lo comparable: costo por onza de cereal contra costo por onza de cereal, nunca contra costo por onza de leche.",
      },
    },
    {
      slug: "measure-the-school",
      title: "Mide la Escuela sin Tocarla",
      category: "Matematicas",
      categoryKey: "math",
      difficulty: "Dificil",
      time: "90 minutos",
      image: "/images/projects/Measure the School Without Touching it.jpg",
      description:
        "Calcula la altura de un edificio con una sombra, un metro y triangulos semejantes. Despues midelo de una segunda forma con un clinometro de papel y comprueba si las dos respuestas coinciden.",
      introduction: [
        "No puedes trepar un edificio escolar con una cinta metrica. Y no hace falta. Hace dos mil anos ya se calculaba la altura de las piramides desde el suelo, usando nada mas que un palo y el sol.",
        "Lo vas a hacer dos veces, por dos caminos completamente distintos. Lo interesante no es ninguna de las dos respuestas por separado. Es si coinciden.",
      ],
      why:
        "El metodo de la sombra funciona porque el sol esta tan lejos que sus rayos llegan practicamente paralelos, asi que tu y el edificio proyectan sombras con el mismo angulo en el mismo momento. Eso crea dos triangulos con la misma forma y distinto tamano, que es lo que significa semejantes, y en triangulos semejantes la razon entre altura y sombra es identica. El metodo del clinometro usa una idea sin ninguna relacion con esa: la tangente de un angulo. Cuando dos metodos que no tienen nada que ver llegan casi al mismo numero, esa coincidencia es tu evidencia. Cuando no coinciden, alguna de tus medidas esta mal, y averiguar cual es la verdadera habilidad.",
      materials: [
        "Un dia soleado, de preferencia a media manana o media tarde, cuando las sombras son largas y nitidas",
        "Un metro o una cinta metrica",
        "Un amigo o un adulto que ayude a sostener y marcar",
        "Gis o piedritas para marcar donde termina una sombra",
        "Un transportador, un popote, hilo y un peso pequeno como una rondana, para el clinometro",
        "Una calculadora con tecla tan, para el segundo metodo",
      ],
      steps: [
        "Elige un edificio cuya base puedas alcanzar caminando y cuya sombra caiga en suelo plano y despejado. Una pared parada sobre una pendiente arruina los dos metodos.",
        "Parate derecho al sol y pide que alguien marque donde cae la punta de tu sombra. Mide tu sombra y despues mide tu propia estatura con los zapatos puestos. Anota las dos cosas junto con la hora.",
        "En los siguientes minutos, mide la sombra del edificio desde la pared hasta su punta. Las sombras se mueven, asi que si pasaron mas de unos diez minutos, vuelve a medir tu propia sombra.",
        "Saca la primera respuesta: la altura del edificio es igual a tu estatura, multiplicada por la sombra del edificio, dividida entre tu sombra. Anota el resultado con sus unidades.",
        "Ahora arma el clinometro. Pega el popote a lo largo del borde recto del transportador, amarra el hilo en el punto central y cuelga de el el peso para que gire libremente.",
        "Camina hacia atras una distancia medida desde la base, mira por el popote hacia la punta mas alta del edificio y pide a tu ayudante que lea el angulo donde queda colgando el hilo. Resta esa lectura a 90 para obtener el angulo hacia la punta.",
        "Saca la segunda respuesta: la altura es igual a tu distancia al edificio, multiplicada por la tangente de ese angulo, mas la altura de tu ojo sobre el suelo. Comparala con la respuesta de la sombra y anota la diferencia como porcentaje de la mayor.",
      ],
      safety:
        "Quedate en la banqueta o en terreno donde tengas permiso de estar, y pide autorizacion antes de medir alrededor de un edificio que no es tuyo. Nunca mires al sol, tampoco a traves del popote. Fijate en el trafico mientras mides distancias caminando, y hazlo con un adulto si el terreno pasa cerca de una calle.",
      challenge:
        "Logra que las dos respuestas queden dentro de un cinco por ciento una de otra. Si quedan mas separadas, busca la causa en vez de promediarlas: terreno inclinado, una sombra medida demasiados minutos despues, una altura de ojo que olvidaste sumar, o un techo que sobresale de la pared. Despues aplica todo el metodo a algo cuya altura puedas verificar, como un aro de basquetbol a 3.05 metros, y descubre que tan preciso es tu procedimiento.",
      recordSheet: {
        title: "Dos Metodos, un Edificio",
        intro:
          "Llena las dos mitades antes de compararlas. Escribir las unidades junto a cada numero es lo que atrapa casi todos los errores.",
        columns: ["Medida", "Valor", "Unidades", "Hora en que se tomo"],
        rows: 10,
        footnote:
          "Filas por llenar: tu estatura, tu sombra, la sombra del edificio, la respuesta del metodo de la sombra, tu distancia a la base, el angulo que leiste, la altura de tu ojo, la respuesta del metodo de la tangente, la diferencia y esa diferencia en porcentaje.",
      },
    },
    {
      slug: "predict-then-launch",
      title: "Predice y Despues Lanza",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Medio",
      time: "2 horas",
      image: "/images/projects/Predict Then Launch.jpeg",
      description:
        "Usa el Laboratorio de Catapulta de este sitio para descubrir como el angulo y el peso del proyectil cambian un tiro, anota tu prediccion y despues construye la catapulta real para ver lo que el simulador no podia decirte.",
      introduction: [
        "Un simulador te da la misma respuesta cada vez que se lo preguntas. Eso es justo lo que lo hace util, y tambien es la unica cosa que una catapulta real hecha de palitos y una liga jamas va a hacer.",
        "Por eso vas a usar los dos. Primero el Laboratorio de Catapulta de la pagina de juegos, donde puedes fijar el angulo al grado exacto. Despues una real en el piso, donde no puedes.",
      ],
      why:
        "En el simulador, el angulo y la potencia son numeros que tu eliges. En una catapulta real son el resultado de que tanto jalaste el brazo esa vez y de como se solto, y ninguno de los dos sale igual dos veces. Por eso probar una maquina real necesita repeticiones y un promedio, mientras que una simulacion necesita una sola corrida. Descubrir donde un modelo deja de coincidir con el mundo no es una critica al modelo. Es la razon por la que los ingenieros construyen los dos.",
      materials: [
        "Una computadora o tableta para abrir el Laboratorio de Catapulta en la pagina de juegos de este sitio",
        "Unos 15 palitos de madera o abatelenguas",
        "Ligas",
        "Una tapa de botella de plastico para usar como cuchara",
        "Cinta, y pegamento en barra o silicon caliente con ayuda de un adulto",
        "Una cinta metrica o una regla larga",
        "Tres cosas para lanzar con pesos claramente distintos: una bolita de algodon, una bola de papel, una goma pequena",
        "Cinta adhesiva para marcar la linea de lanzamiento",
      ],
      steps: [
        "Abre el Laboratorio de Catapulta en la pagina de juegos y tira unos diez disparos solo para agarrarle el modo a los dos controles: Angulo en grados y Potencia en metros por segundo.",
        "Deja la Potencia fija y cambia solo el Angulo. Encuentra el angulo que manda el tiro mas lejos y despues observa que pasa muy por arriba y muy por debajo de el.",
        "Ahora deja el Angulo fijo y cambia el proyectil entre Standard, Light y Heavy. Anota cual llega mas lejos y cual se queda mas corto.",
        "Escribe las dos predicciones antes de construir nada: que angulo funcionara mejor en una catapulta real y cual de tus tres objetos volara mas lejos. Una frase de razonamiento para cada una.",
        "Construye la catapulta: una pila de palitos como base, un palito como brazo lanzador sujeto con una liga en el pivote, y la tapa de botella pegada como cuchara. Pega la base al piso para que no se deslice.",
        "Marca una linea de lanzamiento y jala el brazo hasta el mismo punto marcado todas las veces. Dispara cada uno de tus tres objetos cinco veces y mide donde cae cada uno.",
        "Promedia las cinco distancias de cada objeto y compara con lo que predijiste. Despues fijate que tan separados quedaron esos cinco numeros para un mismo objeto. Esa dispersion es justo lo que el simulador nunca te mostro.",
      ],
      safety:
        "Lanza unicamente objetos blandos y ligeros: bolitas de algodon, bolas de papel, gomas. Nunca lances nada duro, filoso o pesado, y nunca apuntes a una persona, un animal, una ventana o una pantalla. Todos se quedan detras de la catapulta cuando dispara. Pide ayuda de un adulto para el silicon caliente y para cortar palitos.",
      challenge:
        "Haz que tu catapulta real sea repetible. La dispersion de tus cinco tiros viene de algo que cambia entre uno y otro, asi que persiguelo: un jalon que se detiene en un lugar distinto cada vez, una cuchara que se ladea, una base que se va recorriendo. Arregla una cosa y vuelve a medir la dispersion. Lograr que cinco tiros caigan juntos es mas dificil, y mucho mas util, que lograr que uno caiga lejos.",
      recordSheet: {
        title: "Simulador contra Realidad",
        intro:
          "Cinco tiros reales por objeto, porque un solo tiro no te dice absolutamente nada sobre una maquina tan inconsistente.",
        columns: [
          "Objeto",
          "Prediccion",
          "Tiro 1 (cm)",
          "Tiro 2 (cm)",
          "Tiro 3 (cm)",
          "Tiro 4 (cm)",
          "Tiro 5 (cm)",
          "Promedio",
        ],
        rows: 3,
        footnote:
          "Anota tambien el mayor y el menor de tus cinco tiros de cada objeto. La diferencia entre esos dos es tu dispersion, y reducirla es el desafio.",
      },
    },
    {
      slug: "sensor-scavenger-hunt",
      title: "Busqueda del Tesoro de Sensores",
      category: "IA",
      categoryKey: "ai",
      difficulty: "Facil",
      time: "45 minutos",
      image: "/images/projects/Sensor Scavenger Hunt.jpeg",
      description:
        "Encuentra veinte sensores escondidos en tu casa, anota que detecta y que decide cada uno, y despues busca el que se equivoca seguido y disena un arreglo.",
      introduction: [
        "Tu casa esta llena de cosas que estan poniendo atencion en silencio. Casi todas son tan comunes que nadie las considera tecnologia.",
        "En cuarenta y cinco minutos puedes encontrar veinte. Despues viene la mejor mitad: encontrar el que se equivoca seguido, porque una falla es donde de verdad puedes ver como se construyo la decision.",
      ],
      why:
        "Todo lo automatico de tu casa corre el mismo ciclo de tres pasos: detecta algo, decide algo y hace algo. Entrada, decision, salida. En cuanto puedes nombrar esas tres partes, la diferencia entre una maquina que sigue una regla fija y una que reconoce un patron aprendido deja de ser un misterio. Las fallas son lo mas valioso, porque un sensor que nunca falla no te dice nada de como funciona, mientras que uno que apaga la luz sobre alguien que esta sentado sin moverse te dice exactamente que era lo que estaba midiendo en realidad.",
      materials: [
        "Papel y lapiz, o la hoja de registro de esta pagina",
        "La camara de un telefono, opcional",
        "Permiso para andar revisando la casa",
        "Un adulto a quien preguntarle lo que no tengas claro",
      ],
      steps: [
        "Empieza por los evidentes para agarrar vuelo: un detector de humo, un termostato, la pantalla de un telefono que se atenua, el refrigerador, una lavadora que se detiene cuando abres la tapa.",
        "Para cada uno anota tres cosas: que detecta, que decide y que hace. Si no puedes llenar las tres, todavia no lo has entendido.",
        "Ahora busca los escondidos. Todo lo que se enciende solo, se apaga solo, se detiene solo o cambia sin que nadie lo toque esta corriendo el ciclo.",
        "Llega a veinte. Cuando se te acaben adentro, prueba con el carro, la calle y las tiendas: puertas automaticas, alumbrado que se enciende al anochecer, llaves de agua en banos publicos.",
        "Separa tus veinte en dos grupos: los que siguen una regla fija, como un termostato que compara un numero contra otro, y los que parecen reconocer un patron, como un telefono que encuentra una cara.",
        "Encuentra una falla. Una luz de bano que se apaga con alguien todavia adentro, una puerta automatica que ignora a un nino chico, un telefono que se desbloquea con tu hermano. Anota que estaba midiendo de verdad ese sensor, que casi nunca es lo que suponias.",
        "Inventa un sensor que tu casa deberia tener y no tiene. Dibujalo y llena las tres partes del ciclo. Despues escribe una frase sobre como podria fallar, porque cada uno de los veinte que encontraste puede.",
      ],
      safety:
        "Observa, no abras. Este proyecto es para notar sensores, no para desarmarlos, asi que deja los detectores de humo, los termostatos y cualquier cosa conectada a la pared exactamente como estan. Nunca te trepes para alcanzar algo. Pide permiso a un adulto antes de tocar cualquier aparato, y sal acompanado de un adulto si vas afuera a buscar los ultimos.",
      challenge:
        "Cronometra la falla que encontraste. Una luz con sensor de movimiento que se apaga sobre alguien sentado sin moverse tiene un tiempo de espera programado, y ese tiempo lo puedes medir: quedate completamente quieto y cuenta los segundos hasta que se apague, tres veces distintas, y saca el promedio. Acabas de medir una decision que alguien eligio, y ya puedes opinar si la dejaron demasiado corta.",
      recordSheet: {
        title: "Registro de Sensores",
        intro:
          "Una fila por sensor, veinte filas en total. Si no puedes llenar las tres columnas de en medio, todavia no has resuelto ese sensor.",
        columns: ["#", "Que es", "Que detecta", "Que decide", "Que hace", "Regla o patron?"],
        rows: 20,
        footnote:
          "Encierra en un circulo cada fila donde de verdad lo hayas visto equivocarse. A esas filas vuelves para los ultimos dos pasos.",
      },
    },
    {
      slug: "sunset-in-a-jar",
      title: "Atardecer en un Frasco",
      category: "Luz y Optica",
      categoryKey: "optics",
      difficulty: "Facil",
      time: "45 minutos",
      image: "/images/projects/Sunset in a Jar.jpg",
      description:
        "Alumbra con una linterna un frasco de agua con leche y observa como se ve azul de lado y naranja por el extremo, exactamente por la misma razon que el cielo y el atardecer.",
      introduction: [
        "El cielo no es azul porque refleje el mar, y el atardecer no es naranja porque el sol cambie de color. Son el mismo efecto visto desde dos angulos distintos.",
        "Puedes meter ese efecto en un frasco sobre la mesa de la cocina con una linterna y unas gotas de leche, y mirarlo desde los dos angulos en el mismo minuto.",
      ],
      why:
        "La luz blanca es todos los colores a la vez. Cuando se encuentra con algo mucho mas pequeno que su propia longitud de onda, las ondas azules cortas salen despedidas de lado mucho mas que las rojas largas, unas dieciseis veces mas, y esa luz dispersada de lado es la que ves por el costado del frasco. A lo que le queda por salir del otro extremo ya le quitaron el azul, asi que se ve calido y anaranjado. En el cielo, quienes dispersan son las moleculas del aire, y un atardecer es mas rojo que el mediodia porque la luz atraviesa mucho mas aire para llegar a tu ojo.",
      materials: [
        "Un frasco alto y transparente, o una botella de plastico transparente de lados rectos",
        "Agua",
        "Leche, solo unas gotas al principio",
        "Una linterna blanca y potente, o la del telefono",
        "Un gotero o una cucharita",
        "Una hoja de papel blanco para usar como pantalla",
        "Un cuarto oscuro",
      ],
      steps: [
        "Llena el frasco de agua y apaga las luces. Alumbra por un extremo y mira el haz desde el costado. En agua limpia casi no lo veras, porque no hay practicamente nada adentro que disperse la luz.",
        "Agrega dos o tres gotas de leche y revuelve. Vuelve a mirar de lado. Ahora el haz deberia verse, y con un tono azulado.",
        "Ahora mira a lo largo del frasco con la linterna en el extremo opuesto. No mires la linterna misma, mira la luz que ya paso por el agua. Deberia verse mas calida de como entro.",
        "Agrega una gota mas y revisa las dos vistas otra vez. Anota que le pasa a cada color conforme avanzas.",
        "Sigue agregando leche gota por gota hasta que el haz visto de lado se vuelva blanco en vez de azul. Anota cuantas gotas hicieron falta.",
        "Sosten el papel blanco en el extremo opuesto y observa la mancha de luz que se forma. Compara esa mancha con dos gotas contra la misma mancha con ocho gotas.",
        "Explica en una sola frase por que el mediodia y el atardecer tienen colores distintos aunque el sol no haya cambiado en nada.",
      ],
      safety:
        "No mires directo a la linterna, y nunca uses un laser para este proyecto. Usa un frasco que tengas permiso de usar, limpia lo que se derrame para que nadie resbale y tira el agua con leche por el drenaje al terminar.",
      challenge:
        "La leche es una trampa, y una util. Sus goticas de grasa son mucho mas grandes que las moleculas del aire, asi que tu frasco imita al cielo en vez de copiarlo, y por eso el azul te sale palido en lugar de intenso. Intenta acercarte mas: usa menos leche en mas agua, o prueba con una pizca de sustituto de crema en polvo o una sola gota de jabon. Cual te da el haz lateral mas azul con la menor turbidez?",
      recordSheet: {
        title: "Gota por Gota",
        intro:
          "Una fila por cada cantidad de leche. Mira desde el costado y desde el extremo antes de agregar la siguiente gota.",
        columns: ["Gotas de leche", "Color desde el costado", "Color por el extremo", "Notas"],
        rows: 8,
        footnote:
          "La fila donde la vista lateral deja de ser azul y se vuelve blanca es la interesante. Anota que crees que cambio.",
      },
    },
    {
      slug: "shoebox-camera-obscura",
      title: "Camara Oscura en una Caja de Zapatos",
      category: "Luz y Optica",
      categoryKey: "optics",
      difficulty: "Medio",
      time: "1 hora",
      image: "/images/projects/Shoebox Camera Obscura.jpg",
      description:
        "Convierte una caja de zapatos en una camara que funciona con un solo agujerito y sin lente, y descubre por que un agujero mas pequeno da una imagen mas nitida y mas oscura.",
      introduction: [
        "Antes de que hubiera lentes, antes de que hubiera pelicula, habia un cuarto oscuro con un agujerito en una pared. La imagen que cae en la pared de enfrente esta de cabeza, a todo color, y es completamente real.",
        "Una caja de zapatos es un cuarto oscuro. Necesitas un agujero, un pedazo de papel calca y como una hora.",
      ],
      why:
        "La luz viaja en linea recta. Un solo punto de un arbol iluminado alla afuera lanza rayos en todas direcciones, pero solo los que apuntan a tu agujerito logran pasar, y esos siguen derecho hasta caer en un solo punto dentro de la caja. Los rayos que salen de la copa del arbol terminan abajo en tu imagen y los que salen del tronco terminan arriba, y por eso la imagen llega de cabeza. Esto tambien es lo que recibe el fondo de tu ojo, y tu cerebro la voltea sin que te des cuenta.",
      materials: [
        "Una caja de zapatos con tapa, o cualquier caja que puedas sellar a prueba de luz",
        "Papel aluminio",
        "Papel calca, papel encerado de horno o papel blanco delgado",
        "Un alfiler o una aguja",
        "Cinta negra, y pintura negra o papel negro para el interior",
        "Tijeras y una regla",
        "Una tela o toalla oscura para cubrirte la cabeza",
      ],
      steps: [
        "Corta un agujero cuadrado de unos 3 cm en el centro de un extremo de la caja, y una ventana mas grande en el extremo opuesto.",
        "Pega papel calca bien estirado sobre la ventana. Esa es tu pantalla, y tiene que quedar plana, no floja.",
        "Pinta o forra de negro el interior de la caja. Cada rayo de luz que ande rebotando ahi adentro lava la imagen.",
        "Pega un cuadro de aluminio sobre el agujero de 3 cm y despues atraviesa el centro del aluminio con un alfiler, derecho, para hacer un solo agujerito limpio. No lo muevas en circulos.",
        "Sella todas las uniones y esquinas con cinta negra y lleva la caja a una ventana con mucha luz o afuera en un dia soleado.",
        "Ponte la tela sobre la cabeza y sobre el extremo de la ventana, y mira el papel calca mientras el agujerito apunta a algo brillante. Dale a tus ojos un minuto completo para acostumbrarse antes de decidir que no funciona.",
        "Haz un segundo cuadro de aluminio con un agujero claramente mas grande y un tercero con uno mas chico. Cambialos por turnos y anota que le pasa a la nitidez y al brillo cada vez.",
      ],
      safety:
        "Nunca apuntes la caja al sol ni mires hacia el sol a traves de ella, ni siquiera sobre el papel calca. Pide ayuda de un adulto con las tijeras y para cortar la caja. Si pintas el interior con aerosol, hazlo afuera y con un adulto.",
      challenge:
        "Encuentra el mejor agujero. Hacerlo mas chico da una imagen mas nitida, pero solo hasta cierto punto: por debajo de aproximadamente medio milimetro vuelve a verse borrosa, porque la luz que pasa por una abertura muy pequena se abre en vez de seguir derecho. A esa apertura se le llama difraccion, y es el mismo efecto que pone rayas en la pared en el proyecto de la doble rendija. Encuentra el tamano de agujero donde tu caja se ve mas nitida y anota que pasa a cada lado de ese punto.",
      recordSheet: {
        title: "Comparacion de Agujeritos",
        intro:
          "Una fila por agujero. Califica nitidez y brillo del 1 al 5, siempre con la misma vista por la misma ventana.",
        columns: ["Agujero", "Mas o menos que tan ancho", "Nitidez 1-5", "Brillo 1-5", "Que alcanzabas a distinguir"],
        rows: 5,
        footnote:
          "Manten el mismo motivo y la misma luz en todas las filas. Si el sol se mete detras de una nube entre dos filas, la columna de brillo deja de significar algo.",
      },
    },
    {
      slug: "light-pipe-water-stream",
      title: "Doblar la Luz por un Chorro de Agua",
      category: "Luz y Optica",
      categoryKey: "optics",
      difficulty: "Medio",
      time: "1 hora",
      image: "/images/projects/Bending Light Down a Stream of Water.jpg",
      description:
        "Manda un haz de luz por un chorro de agua que cae y observa como sigue la curva, que es justo el truco con el que el internet cruza el fondo del oceano.",
      introduction: [
        "La luz viaja en linea recta. Esa es toda la base de la camara oscura, y es cierto. Entonces como llega una senal por una fibra de vidrio del grosor de un cabello enrollada bajo el Atlantico?",
        "La respuesta es que la luz se puede atrapar. En cuanto lo hayas visto pasar dentro de un chorro de agua saliendo de una botella, el cable bajo el oceano deja de ser un misterio.",
      ],
      why:
        "Cuando la luz que ya va dentro del agua llega a la superficie con un angulo suficientemente rasante, no sale. Se refleja hacia adentro, por completo, todas las veces, y por eso se le llama reflexion interna total. Para el agua el limite esta alrededor de 49 grados; si golpea la superficie con un angulo mas rasante que ese, la luz se queda adentro. En un chorro curvo la luz sigue encontrando el borde pasado ese limite, asi que sigue rebotando y acompana la curva hacia abajo. Una fibra optica es este mismo truco hecho permanente en vidrio.",
      materials: [
        "Una botella de plastico transparente de lados rectos, sin etiqueta",
        "Un clavo o una broca de 5 mm, y un adulto que haga el agujero",
        "Un apuntador laser rojo, clase 2 o menor, manejado unicamente por un adulto",
        "Un fregadero, una tina o una cubeta para recibir el agua",
        "Cinta",
        "Un cuarto oscuro",
      ],
      steps: [
        "Un adulto hace un agujero limpio de unos 5 mm en el costado de la botella, cerca del fondo. En plastico delgado, un clavo caliente funciona mejor que un taladro.",
        "Tapa el agujero con un dedo o un pedazo de cinta, llena la botella de agua y ponla en la orilla del fregadero para que el chorro caiga en arco dentro de la tarja.",
        "Apaga las luces. El adulto apoya el laser contra el costado de la botella justo enfrente del agujero, apuntando derecho para que el haz atraviese el agua y salga por el agujero.",
        "Suelta el chorro. Mira donde cae el agua en vez de mirar la botella: deberias ver un punto brillante viajando dentro del chorro que cae e iluminando el lugar donde pega.",
        "Ajusta la punteria hasta que la luz se quede en el chorro lo mas posible. Cuando esta bien, toda la curva brilla apenas y el punto de llegada queda muy iluminado.",
        "Ahora rompelo a proposito. Mete un dedo en el chorro a media caida y observa como la luz se detiene ahi. El rebote solo funciona mientras la superficie sigue lisa y sin romperse.",
        "Cambia la curva subiendo y bajando la botella para que el chorro caiga mas parado o mas tendido. Anota con que forma la luz llega mas lejos antes de escaparse.",
      ],
      safety:
        "El laser es lo unico verdaderamente peligroso aqui. Un adulto lo sostiene todo el tiempo y no sale de su mano. Usa un apuntador rojo, clase 2 o menor, nunca verde ni nada vendido como de alta potencia. Nunca lo apuntes a los ojos de nadie, a una mascota, a un espejo, a una ventana ni a una llave brillante, porque un reflejo puede llegar a un ojo al que nadie estaba apuntando. Manten el haz por debajo del nivel de los ojos y dirigido hacia la tarja. El agujero de la botella lo hace un adulto. Seca el agua para que nadie resbale.",
      challenge:
        "Encuentra el limite. La luz se escapa en cuanto el chorro se rompe en gotas separadas, asi que todo lo que mantenga el chorro liso mas tiempo deberia llevarla mas lejos. Prueba con un agujero mas chico, con la botella mas llena para tener mas presion y con un borde mas limpio en el agujero. Despues contesta esto: por que una fibra optica real nunca tiene este problema, si es vidrio solido y no se puede romper en gotas?",
      recordSheet: {
        title: "Que Tan Lejos Llego la Luz",
        intro:
          "Una fila por intento. Mide desde el agujero hasta el punto donde la luz visiblemente abandona el chorro.",
        columns: ["Intento", "Que cambiaste", "Forma del chorro", "Distancia que la luz se quedo (cm)"],
        rows: 6,
        footnote:
          "Si no distingues donde sale la luz, busca donde el chorro deja de ser una cuerda lisa y se vuelve gotas sueltas. Casi siempre es el mismo lugar.",
      },
    },
    {
      slug: "cd-spectroscope",
      title: "Construye un Espectroscopio con un CD",
      category: "Luz y Optica",
      categoryKey: "optics",
      difficulty: "Medio",
      time: "1 hora",
      image: "/images/projects/Build a Spectroscope from a CD.jpg",
      description:
        "Construye un espectroscopio de verdad con una caja de cereal y un CD viejo, y descubre cuales lamparas dan un arcoiris continuo y cuales dan solo unas cuantas lineas brillantes separadas.",
      introduction: [
        "Un arcoiris se ve continuo: cada color pasando al siguiente sin que falte nada. La luz del sol de verdad es asi. Casi ninguna lampara de tu casa lo es, y no lo puedes saber con solo verla.",
        "Los surcos de un CD estan mas juntos que la longitud de onda de la luz, lo que convierte al disco en una rejilla de difraccion, lo que lo convierte en la pieza que trabaja dentro de un instrumento cientifico de verdad. El resto del instrumento es una caja de cereal.",
      ],
      why:
        "Un solido caliente brilla en todos los colores a la vez, porque sus atomos estan apretados y empujandose, y ese es el arcoiris suave que da el sol o un foco viejo de filamento. Un gas delgado que brilla hace algo completamente distinto: unos cuantos colores nitidos y separados, y nada en medio. Eso pasa porque un electron dentro de un atomo no puede quedarse en cualquier lugar. Solo puede ocupar ciertos niveles de energia fijos, como escalones de una escalera sin espacio entre ellos, y cuando cae de un escalon a otro suelta un foton cuyo color queda determinado exactamente por el tamano de ese salto. Esas lineas separadas son esa regla vuelta visible, y son uno de los resultados que obligaron a los fisicos a inventar la mecanica cuantica.",
      materials: [
        "Una caja de cereal vacia, o una caja de carton parecida",
        "Un CD o DVD viejo que tengas permiso de destruir; el DVD funciona mejor",
        "Un cuter o tijeras, con ayuda de un adulto",
        "Cinta negra y papel negro",
        "Dos pedazos de cartulina con borde recto para formar la rendija",
        "Una regla y un lapiz",
      ],
      steps: [
        "Pega la parte de arriba de la caja para que no entre luz, y forra el interior con papel negro si puedes.",
        "Haz una rendija angosta en un extremo, de aproximadamente 1 mm de ancho y 3 cm de alto. Dos bordes rectos de cartulina pegados con un milimetro de separacion dan una rendija mucho mas limpia que un corte con cuter.",
        "Con un adulto, corta una cuna del disco. Si es un DVD, separa primero las dos mitades y quedate con la capa que conserva el brillo de arcoiris.",
        "Corta un agujero de observacion de unos 2 cm en el extremo opuesto de la caja, bien abajo.",
        "Pega el pedazo de disco dentro de la caja debajo del agujero, inclinado a unos 60 grados, de modo que al mirar por el agujero estes viendo la superficie del disco y en ella el reflejo de la rendija.",
        "Apunta la rendija a una pared blanca iluminada por luz de dia y mira por el agujero. Ajusta la inclinacion hasta que aparezca una banda de colores hacia un lado, y ahi pega el disco.",
        "Ahora observa cuatro fuentes por turnos, nunca el sol: luz de dia sobre una pared, un foco viejo de filamento o halogeno, un tubo fluorescente o foco ahorrador, y un LED blanco. Dibuja lo que ves en cada caso.",
      ],
      safety:
        "Nunca apuntes el espectroscopio al sol ni mires hacia el sol a traves de el. Usa luz de dia rebotando en una pared blanca o en una nube. Pide ayuda de un adulto para cortar la caja y sobre todo para cortar el disco, porque el plastico del CD puede astillarse en pedazos filosos. Usa proteccion para los ojos al cortar el disco si tienes.",
      challenge:
        "Encuentra las lineas y averigua que las produjo. Un tubo fluorescente muestra unas pocas lineas brillantes porque adentro hay vapor de mercurio, y el verde intenso y el par de amarillos vienen de saltos especificos entre niveles de energia en los atomos de mercurio. Un LED blanco es distinto otra vez: un pico azul mas una joroba amarilla ancha, porque es un chip azul con una capa que convierte parte de ese azul en todo lo demas. Dibuja los dos con cuidado y despues busca un letrero de neon, para ver que tan pocos colores tiene realmente.",
      recordSheet: {
        title: "Dibujos de Espectros",
        intro:
          "Una fila por fuente de luz. Dibuja lo que ves en vez de describirlo, y anota si los colores se funden entre si o quedan separados.",
        columns: ["Fuente de luz", "Continuo o lineas separadas?", "Colores que distingues", "Falta algo?"],
        rows: 6,
        footnote:
          "La ultima columna es la mas util. Un hueco donde deberia haber un color te dice que ese color nunca se emitio, y eso informa tanto como una linea brillante.",
      },
    },
    {
      slug: "uv-glow-lab",
      title: "La Regla del Brillo",
      category: "Luz y Optica",
      categoryKey: "optics",
      difficulty: "Facil",
      time: "45 minutos",
      image: "/images/projects/The Glow Rule.jpeg",
      description:
        "Busca cosas que brillen bajo una lampara UV y despues encuentra la regla que todas cumplen sin excepcion: la luz que sale siempre tiene menos energia que la luz que entra.",
      introduction: [
        "Algunas cosas completamente comunes esconden un color. El agua tonica, la tinta de un marcador fluorescente, el detergente en polvo, algunos calcetines blancos y la tira de seguridad de un billete se ven de lo mas normales hasta que les cae luz ultravioleta.",
        "Encontrarlas es divertido unos diez minutos. La regla que hay debajo es lo que vale la pena quedarse, y resulta ser una regla sin excepciones.",
      ],
      why:
        "La luz ultravioleta esta hecha de fotones que cargan mas energia que cualquier color que tu ojo pueda ver. Cuando uno de ellos es absorbido por el tipo correcto de molecula, levanta un electron hasta un nivel de energia mas alto. El electron suelta un poco de esa energia como calor, luego vuelve a caer y emite un foton propio. Como perdio algo de energia en el camino, el foton emitido siempre carga menos que el que fue absorbido, y menos energia significa una longitud de onda mas larga, que significa un color mas rojo. Por eso entra ultravioleta y sale azul, y por eso nunca vas a encontrar algo que reciba rojo y devuelva azul. Ese escalon hacia abajo hasta tiene nombre: el corrimiento de Stokes.",
      materials: [
        "Una lampara UV, de 395 nm, que es la version barata mas comun y mas segura",
        "Agua tonica, que contiene quinina",
        "Marcadores fluorescentes, sobre todo amarillo y verde",
        "Detergente o jabon en polvo para ropa",
        "Estrellas o calcomanias que brillan en la oscuridad",
        "Papel blanco y varias hojas de papel de colores",
        "Un cuarto oscuro",
      ],
      steps: [
        "Apaga las luces y deja que tus ojos se acostumbren un par de minutos. Despues pasea la lampara UV despacio por el cuarto y anota todo lo que se encienda.",
        "Sirve agua tonica en un vaso transparente y alumbrala desde un costado. Comparala contra agua simple en un vaso identico, para estar seguro de que no es el vidrio el que brilla.",
        "Raya fuerte con un marcador amarillo sobre papel blanco y ponlo bajo la lampara. Anota el color que sale, no el color que tiene la tinta con luz normal.",
        "Espolvorea un poco de detergente en polvo sobre papel oscuro e ilumina. A los detergentes les agregan blanqueadores opticos a proposito, para que la ropa devuelva azul de mas y se vea mas blanca que blanca.",
        "Anota el color de la lampara junto al color que salio de cada cosa que encontraste, compara las dos columnas y busca si algo rompio el patron.",
        "Prueba las estrellas que brillan en la oscuridad. Cargalas bajo la lampara diez segundos y despues apagala. A diferencia de todo lo demas de tu lista, estas siguen brillando.",
        "Cronometra cuanto tiempo siguen visibles las estrellas. Despues cargalas un minuto completo, vuelve a cronometrar y anota los dos numeros.",
      ],
      safety:
        "Nunca mires dentro de la lampara UV, nunca la apuntes a los ojos de nadie ni de una mascota, y no la dejes pegada a la piel mucho rato. Compra una lampara de 395 nm, que queda apenas pasando el violeta. Evita por completo las de 254 nm de tipo germicida, porque esas si danan ojos y piel. Pide permiso antes de usar un billete o un documento de identidad y devuelvelo de inmediato.",
      challenge:
        "Sal a buscar la excepcion y no la encuentres. Todo lo de tu lista recibio un foton de alta energia y devolvio uno de menor energia, asi que el color siempre se corrio hacia el rojo. Busca especificamente algo que haga lo contrario. Cuando no lo encuentres, habras descubierto una regla en vez de juntar una lista de cosas que brillan, y las reglas son de lo que esta hecha la fisica. Despues averigua por que las estrellas que brillan en la oscuridad pueden seguir emitiendo minutos enteros cuando todo lo demas se apaga en el instante en que quitas la lampara.",
      recordSheet: {
        title: "Bitacora de Brillos",
        intro:
          "Una fila por cada cosa que encuentres. Las dos columnas de color son el punto de toda la tabla, asi que comparalas cuando este llena.",
        columns: [
          "Objeto",
          "Color con luz normal",
          "Color que entra",
          "Color que sale",
          "Sigue brillando al apagar la lampara?",
        ],
        rows: 10,
        footnote:
          "Con la tabla llena, revisa cada fila: alguna vez la luz que salio tenia mas energia, o sea mas azul, que la que entro? Escribe tu respuesta abajo.",
      },
    },
    {
      slug: "double-slit-at-home",
      title: "La Doble Rendija en la Pared de tu Cuarto",
      category: "Luz y Optica",
      categoryKey: "optics",
      difficulty: "Dificil",
      time: "2 horas",
      image: "",
      description:
        "Corta dos rendijas en papel negro, pasa un laser por ellas y obten el patron de rayas que convencio a los fisicos de que la luz es una onda. Despues usa esas rayas para medir una separacion demasiado pequena para una regla.",
      introduction: [
        "Dos rendijas, un laser y una pared. Si la luz fuera simplemente un chorro de balitas, esperarias dos rayas brillantes, una detras de cada rendija. No salen dos. Sale una fila entera, con separacion pareja y huecos oscuros entre ellas.",
        "Este es el experimento mas repetido de la fisica, y la version en la pared de tu cuarto es el mismo experimento. La parte dificil no es la fisica. Es cortar dos rendijas lo bastante juntas.",
      ],
      why:
        "Las ondas que salen de las dos rendijas llegan a cada punto de la pared despues de recorrer distancias ligeramente distintas. Donde esa diferencia es un numero entero de longitudes de onda, las dos se alinean y se suman en una raya brillante; donde es media longitud de onda, se cancelan y dejan oscuridad. Eso es interferencia, y solo las ondas la hacen. La separacion de las rayas queda ligada a la longitud de onda de la luz y a la separacion entre rendijas por una relacion sencilla, lo que significa que puedes ir al reves: mides rayas separadas por milimetros y calculas una separacion de rendijas imposible de medir directamente.",
      materials: [
        "Un apuntador laser rojo, clase 2 o menor, manejado unicamente por un adulto",
        "Papel negro grueso, o cualquier cartulina negra delgada por la que no pase la luz",
        "Un cuter o una navaja de rasurar nueva, con ayuda de un adulto",
        "Un pedazo de cartulina gruesa con una ventana recortada",
        "Una regla con marcas de milimetros, y una cinta metrica",
        "Un cuarto oscuro con una pared clara y lisa, de preferencia con 3 metros o mas de espacio libre",
        "Una calculadora",
        "Cinta",
      ],
      steps: [
        "Pega el papel negro bien estirado y liso sobre la ventana de la cartulina. Primero ponlo a contraluz: si la luz atraviesa el papel, las rayas se van a lavar y necesitas algo mas opaco.",
        "Con un adulto, haz dos cortes rectos y paralelos en el papel, de aproximadamente 1 cm de largo. Apoya la navaja contra una regla y arrastrala una sola vez. Deja los cortes lo mas juntos que puedas, bastante menos de un milimetro.",
        "Coloca la cartulina de modo que el laser pase por las dos rendijas a la vez y siga hasta una pared a por lo menos 3 metros. Pega todo con cinta, porque una cartulina que se mueve arruina la medicion.",
        "Oscurece el cuarto. El adulto apunta el laser por las rendijas. Ajusta hasta ver una fila de puntos o rayas en vez de una sola mancha. Una sola mancha significa que tus rendijas estan muy separadas o que el haz solo pasa por una.",
        "Mide en metros la distancia del papel a la pared y anotala. Llamala L.",
        "En la pared, mide de una vez a lo largo de todas las rayas que puedas, de centro a centro, y divide entre el numero de huecos que contaste. Ese promedio es tu separacion de franjas, y. Medir varias rayas juntas es lo que lo hace preciso.",
        "Calcula la separacion entre rendijas: d es igual a la longitud de onda por L, dividida entre y. Un apuntador rojo es de unos 650 nanometros, o sea 0.000000650 metros. Tu resultado deberia caer alrededor de unas decimas de milimetro.",
      ],
      safety:
        "El laser es el peligro serio aqui, y un adulto debe sostenerlo durante todo el proyecto. Usa un apuntador rojo clase 2 de 1 mW o menos, nunca verde ni nada vendido como de alta potencia. Nunca mires al haz, y nunca lo apuntes a una persona, una mascota, una ventana, un espejo, una pantalla o cualquier metal brillante, porque un reflejo perdido puede llegar a un ojo al que nadie apuntaba. Manten el haz por debajo del nivel de los ojos y dirigido a una pared mate. Las rendijas van en papel negro mate y no en aluminio por la misma razon: el aluminio devuelve el haz hacia el cuarto. Cortar las rendijas requiere supervision de un adulto y una base de corte, y una navaja nueva corta mas limpio y se resbala menos que una gastada.",
      challenge:
        "Corta una segunda cartulina con las rendijas a proposito mas juntas, y predice antes de medir si las rayas se van a separar mas o a juntar mas. Despues comprueba. Acertar la direccion de esa relacion, y poder explicar por que, vale mas que el numero. Despues piensa en lo que este experimento no te muestra: tu laser dispara billones de fotones a la vez, asi que lo que hay en tu pared es genuinamente interferencia de ondas. En un laboratorio el mismo patron se va formando un foton a la vez, llegando como puntos sueltos durante horas, y ese resultado es mucho mas extrano que el tuyo.",
      video: {
        videoId: "2rWDzLwfX64",
        title: "Double Slit Experiment AT HOME",
        startSeconds: 10,
        caption:
          "Una version casera del mismo montaje. Vale la pena verlo antes de cortar nada, para saber como se ve en la pared un patron que si funciona. El video esta en ingles.",
      },
      recordSheet: {
        title: "Mediciones de Franjas",
        intro:
          "Mide el mismo patron tres veces sin mover nada. Si tus tres respuestas no coinciden, el problema es la medicion y no la fisica.",
        columns: [
          "Intento",
          "Distancia a la pared L (m)",
          "Rayas medidas",
          "Ancho total (mm)",
          "Separacion de franjas y (mm)",
          "d calculada (mm)",
        ],
        rows: 3,
        footnote:
          "d es igual a 0.000000650 por L, dividido entre y, con y convertida antes a metros. Equivocarse por mil entre milimetros y metros es el error que comete casi todo el mundo aqui.",
      },
    },
  ],
  zh: [
    {
      slug: "popsicle-stick-bridge",
      title: "冰棒棍桥",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "简单",
      time: "1-2小时",
      image: "/images/home/featured-bridge.jpg",
      description:
        "用冰棒棍搭建一座真正的桁架桥，观察三角形如何在承重测试中引导压缩力和拉力。",
      introduction: [
        "桥梁工程师不会随便把材料粘在一起。他们会用坚固的形状设计结构，让力量沿着清晰的路径传递。",
        "这个项目很有趣，因为你的冰棒棍会变成一座真正的桁架桥，拥有真实的部件名称、受力路径和最后的承重测试。",
      ],
      why:
        "桁架桥通过三角形来分散力量。上弦杆通常承受压缩，下弦杆通常承受拉力，而斜向构件会把重量传到整个结构中。",
      materials: [
        "60根或更多冰棒棍",
        "热熔胶枪和胶棒",
        "一把尺子",
        "记号笔或圆珠笔",
        "剪刀或结实的手工剪",
        "两个结实的测试支撑物，比如椅子或桌子",
        "测试重量，比如书本或健身杠铃片",
      ],
      steps: [
        "先在大约16根冰棒棍的四分之一位置做记号，让接缝更整齐。",
        "把其中4根剪成两半，用来把整根冰棒棍拼接成2条长梁。",
        "先搭出第一侧桁架，做4个三角形，再在中间补上3个错开的三角形。",
        "把桁架翻面，粘上顶部横梁，再加一层冰棒棍增强刚度。",
        "按同样的样式再做第二个一模一样的侧桁架。",
        "等两侧变硬后，用横向连接件把它们连起来，并保持桥身方正。",
        "加上斜撑，等胶水固定，再把桥放在两个支撑物之间慢慢测试。",
      ],
      safety:
        "使用热熔胶枪和剪切冰棒棍时请让大人帮忙。刚挤出的胶和胶枪头都很烫，测试时也要慢慢加重，避免重物或脚滑下来。",
      challenge:
        "试着保持同样的桁架结构，但减少冰棒棍数量，再比较更轻的桥还能承受多少重量。",
    },
    {
      slug: "lego-robot-builder",
      title: "乐高抓取机器人",
      category: "机器人",
      categoryKey: "robotics",
      difficulty: "中等",
      time: "2-3小时",
      image: "/images/shared/lego-robotics.jpeg",
      description:
        "参考 LEGO Education 的 Super Cleanup 课程搭建一个抓取机器人，并测试它抓取不同物体的效果。",
      introduction: [
        "这不只是普通机器人。你要搭建的是一台受真实 LEGO Education 课程启发的抓取清理机器人。",
        "这让它更酷，因为你不是随便猜机器人该长什么样，而是在跟随一个经过验证的设计，并理解每个部件为什么存在。",
      ],
      why:
        "抓取机器人把机械结构和编程结合在一起。底盘要保持平衡，电机要把运动传到夹爪，代码还要告诉机器人什么时候前进、抓取和释放。",
      materials: [
        "LEGO Education SPIKE Prime 套装 #45678 或类似的乐高机器人套件",
        "SPIKE Prime 主控",
        "1个大角电机",
        "1个力传感器",
        "Technic 梁、销、轴和轮子",
        "用于测试的小物体，比如纸团、苹果或球、积木块",
      ],
      steps: [
        "开始前先打开官方 Super Cleanup 课程和搭建手册。",
        "把主控、电机、传感器、轮子、梁、销和轴分类摆好。",
        "先搭建宽底盘，让机器人更稳定。",
        "加上前方立柱和夹爪支架。",
        "安装电机、传感器和前夹爪，让机器人能够抓住物体。",
        "加载一个简单的清理程序，让机器人执行抓取、移动和释放。",
        "用不同物体做公平测试，并比较哪种效果最好。",
      ],
      safety:
        "小乐高零件要远离年幼的弟弟妹妹和宠物，以免误吞。给主控充电、连接线缆和处理电池相关部件时，请让大人帮忙。",
      challenge:
        "比较两种不同形状的夹爪，并记录它们对圆形、柔软或坚硬物体的表现。",
    },
    {
      slug: "coke-mentos-experiment",
      title: "可乐曼妥思实验",
      category: "科学",
      categoryKey: "science",
      difficulty: "简单",
      time: "30分钟",
      image: "/images/home/coke-mentos-science-experiment-kids.jpg",
      description:
        "在户外制造一股喷泉，了解为什么糖果表面的微小结构会让气体迅速释放。",
      introduction: [
        "准备迎接高高喷起的水柱吧，因为这个实验能让汽水像火箭喷泉一样冲上天空。",
        "它看起来很神奇，也能教你一个真正的科学概念。",
      ],
      why:
        "汽水里溶解了二氧化碳气体。曼妥思表面有很多细小凹凸，给气体提供了大量同时逃出的地方，这个过程叫成核，所以汽水会一下子冲出来。健怡可乐通常比普通可乐效果更好，因为它含糖更少、液体也没有那么黏，气泡更容易快速向上冲，形成更高的喷泉。",
      materials: [
        "1瓶两升装健怡可乐或其他汽水",
        "1卷曼妥思",
        "一个开阔的户外空间",
        "护目镜",
        "一张纸或索引卡",
        "可选：一个纸筒，帮助同时放下所有曼妥思",
      ],
      steps: [
        "到车道或院子这样的空旷户外区域，并戴上护目镜。",
        "把汽水瓶放在平坦地面上，确保不会倒下。",
        "打开瓶盖，并尽快准备好曼妥思。",
        "把5到6颗曼妥思叠在纸筒里，或用一张卡片托在瓶口上方。",
        "抽走卡片，让所有曼妥思同时掉进去。",
        "立刻后退，观察汽水喷泉冲向空中。",
        "讨论刚才发生了什么，并测量哪种汽水或多少颗曼妥思能喷得最高。",
      ],
      safety:
        "这个实验只能在户外做，曼妥思掉进去后要立刻后退。不要把瓶子对着人，也不要在实验后饮用汽水。",
      challenge:
        "测试两种不同的汽水，比较哪一种能喷得更高。",
    },
    {
      slug: "my-first-python-program",
      title: "我的第一个 Python 程序",
      category: "编程",
      categoryKey: "coding",
      difficulty: "简单",
      time: "1小时",
      image: codingThumbnailImage,
      description:
        "写一个简单的问答小游戏，看看代码怎样把你的想法变成可以互动的作品。",
      introduction: [
        "编程就像给电脑一组非常清楚的指令，让它替你完成很棒的事情。",
        "这个项目很好玩，因为你会做出一个真正的程序，它会提问、记分，还会对玩家做出回应。",
      ],
      why:
        "计算机程序会一步一步执行指令。Python 用 `print()` 显示信息，用 `input()` 收集答案，用变量记住分数这样的信息。",
      materials: [
        "一台可以上网的电脑或平板",
        "一个 Python 网站或应用，比如 Replit 或 Trinket",
        "用来规划问题的纸张",
        "键盘",
        "好奇心和耐心",
      ],
      steps: [
        "打开一个适合初学者的在线 Python 编辑器，并新建项目。",
        "输入一行 `print()`，欢迎玩家来到你的问答游戏。",
        "创建一个名为 score 的变量，并把它设为 0 来记录分数。",
        "使用 `input()` 提出问题，并把答案存进变量里。",
        "加入一个 `if` 语句来检查答案是否正确。",
        "答对时增加分数，再用 `print()` 显示新的分数。",
        "运行程序，反复测试并修正错误，直到游戏顺畅运行。",
      ],
      safety:
        "只使用可信的编程网站，并在注册账号前先征求大人同意。不要在程序或聊天框里分享真实姓名、住址或密码。",
      challenge:
        "把问题从1个增加到3个，如果玩家全对，就让程序打印一条特别的信息。",
    },
    {
      slug: "baking-soda-volcano",
      title: "小苏打火山",
      category: "科学",
      categoryKey: "science",
      difficulty: "简单",
      time: "1小时",
      image: "/images/projects/baking-soda-volcano/cover.jpg",
      description:
        "搭建一座迷你火山，用经典的酸碱反应制造充满泡沫的喷发。",
      introduction: [
        "火山是地球上最壮观的自然景象之一，现在你也可以在桌面上做出一座。",
        "这个项目很有趣，因为你会混合材料、制造喷发，并亲眼看到化学在发生。",
      ],
      why:
        "小苏打是碱，醋是酸。它们混合后会产生一种叫二氧化碳的新气体，这种气体会制造大量泡沫，像火山熔岩一样涌出来。",
      materials: [
        "小苏打",
        "醋",
        "一个小塑料瓶或杯子",
        "橡皮泥、黏土或铝箔",
        "洗洁精",
        "食用色素",
        "一个托盘，方便清理",
      ],
      steps: [
        "把瓶子放在托盘中央，这样喷发时的液体都能留在一个地方。",
        "用黏土、橡皮泥或铝箔围着瓶子做出火山外形，但要留出瓶口。",
        "往瓶子里加入2到3勺小苏打。",
        "加入一点洗洁精和几滴食用色素。",
        "把醋倒进瓶子里，观察泡沫熔岩升起并流出来。",
        "仔细观察气泡，并讨论瓶子里正在产生的气体。",
        "冲洗托盘后再试一次，改变材料用量，看看喷发会怎样变化。",
      ],
      safety:
        "不要让混合液碰到眼睛，实验后要洗手。使用食用色素前请先问大人，因为它可能会弄脏衣服和桌面。",
      challenge:
        "试着改变小苏打或醋的用量，看看哪一种配方能产生最大的喷发。",
    },
    {
      slug: "simple-circuit-light",
      title: "简单电路小灯",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "中等",
      time: "45-60分钟",
      image: "/images/projects/simple-circuit-light/cover.jpg",
      description:
        "用面包板、电阻、跳线和小电池盒搭建一个真正的 LED 电路。",
      introduction: [
        "打开一盏灯看起来很普通，但背后有一条让电流移动的完整通路。",
        "在这个项目中，你会在面包板上搭建一个适合初学者的电子电路。面包板可以连接零件，不需要焊接。",
        "你还会把电阻和 LED 串联起来。电阻很重要，因为它会限制电流，防止 LED 烧坏。",
      ],
      why:
        "电流从电池正极流出，经过跳线和电阻，进入 LED 的长脚，再从短脚流出，最后回到电池负极。电阻和 LED 是串联的，因为电流必须在同一个回路里先经过一个零件，再经过另一个零件。如果 LED 装反了，电流不能正确通过，LED 可能不会亮。",
      materials: [
        "1块小型免焊面包板",
        "1个 LED",
        "1个 220 到 330 欧姆的电阻",
        "1个低电压电池盒，例如带红黑导线的 2 节 AA 电池盒",
        "3根跳线",
        "可选：一个小开关，用来增加挑战",
      ],
      steps: [
        "把面包板放在面前。找到红色正极电源轨（+）、蓝色负极电源轨（-），以及中间插零件的排孔。",
        "先关闭或断开电池盒，把红色电池线接到 + 电源轨，把黑色电池线接到 - 电源轨。",
        "把电阻的一端插入 + 电源轨，另一端插入面包板中间的空排孔，例如第 10 排。",
        "放入 LED，让较长的脚，也就是阳极，插到电阻另一端所在的同一排。把较短的脚，也就是阴极，插到另一排。",
        "用一根跳线把 LED 短脚所在的那一排接回 - 电源轨。现在电阻和 LED 就在同一条串联通路中。",
        "连接电池或打开电池盒。电流会从 + 出发，经过电阻，经过 LED，再回到 -，LED 应该会亮起来。",
        "如果 LED 不亮，先断开电池，然后把 LED 反过来，或检查每个零件是否插在正确的排孔中。",
      ],
      stepImages: [
        {
          step: 6,
          src: "/images/projects/simple-circuit-light/step-6-lit-circuit.jpg",
          alt: "第 6 步：面包板电路中点亮的 LED，标注了较长的阳极引脚和较短的阴极引脚分别连接到电阻和负极电源轨的位置",
        },
      ],
      safety:
        "这个项目只能使用低电压小电池，绝对不要把电路接到墙上的插座。给 LED 通电前一定要接入电阻，移动零件前要先断开电池。",
      challenge:
        "在电阻和 LED 的串联通路中加入一个小开关，控制电路打开和关闭。你也可以比较 220 欧姆和 330 欧姆电阻会让 LED 有什么不同。",
    },
    {
      slug: "elephant-toothpaste-experiment",
      title: "大象牙膏实验",
      category: "科学",
      categoryKey: "science",
      difficulty: "中等",
      time: "30分钟",
      image: "/images/projects/elephant-toothpaste-experiment/cover.jpg",
      description:
        "看着一瓶液体喷出巨大泡沫柱，当双氧水分解并释放氧气时，会发生一场令人惊叹的放热反应。",
      introduction: [
        "大象牙膏得名于它喷出的泡沫大得像大象才能用的牙膏。但这不只是一场酷炫的爆发，它是一个你可以亲手控制的真实化学反应。",
        "这个实验教你了解催化剂如何加快反应速度、化学变化为什么会释放热量，以及氧气如何将液体瞬间变成一大堆泡沫。",
      ],
      why:
        "双氧水在自然状态下会慢慢分解成水和氧气，但速度非常缓慢。加入催化剂（比如溶于温水的酵母），反应就会加速，几乎瞬间完成。氧气迅速逸出，被洗洁精困住形成千万个气泡，堆叠成厚厚的泡沫。这个反应还是放热反应，泡沫平息后小心触摸，你会感到它还有些温热。",
      materials: [
        "半杯 6% 或 12% 双氧水（在美发用品店可以买到）",
        "1 包干活酵母",
        "3 汤匙温水",
        "少量洗洁精",
        "几滴食用色素",
        "一个 500 毫升或更大的塑料瓶或量筒",
        "一个托盘，方便清理",
        "护目镜和手套",
      ],
      steps: [
        "在接触双氧水之前，先戴好护目镜和手套。",
        "把瓶子放在托盘中央，让泡沫不会到处乱跑。",
        "往瓶子里直接加入洗洁精和几滴食用色素。",
        "把双氧水倒入瓶中，轻轻摇晃混合。",
        "在另一个杯子里，把酵母包倒入温水中搅拌约 30 秒，直到溶解。",
        "迅速把酵母溶液倒进瓶子，然后立刻后退。",
        "观察泡沫迅速涌出，等它完全平息后小心触摸，感受它的温度。",
        "讨论发生了什么：催化剂是什么？热量从哪里来？泡沫里面是什么气体？",
      ],
      safety:
        "双氧水会刺激皮肤和眼睛，请务必由大人负责取用和倒入。全程佩戴护目镜和手套。泡沫完全平息后可以安全触摸，但反应过程中不要让液体接触眼睛或皮肤。实验结束后，用大量清水冲洗托盘，将泡沫和液体安全排入下水道。",
      challenge:
        "分别用药店的 3% 双氧水和美发店的 6% 或更高浓度双氧水做实验，比较两次泡沫柱的高度有什么不同。",
    },
    {
      slug: "making-oobleck",
      title: "制作奥不力克",
      category: "科学",
      categoryKey: "science",
      difficulty: "简单",
      time: "20分钟",
      image: "/images/projects/making-oobleck/cover.jpg",
      description:
        "只需两种材料就能调出一种神奇的东西，它像液体一样流淌，但用手一捏就变成固体，一起来探索非牛顿流体的科学吧。",
      introduction: [
        "奥不力克（Oobleck）这个名字来自苏斯博士的故事里的神奇黏稠物质，它也像故事里写的那样奇怪和难以捉摸。它能像水一样从手指间流过，但一旦你捏紧或拍打它，就会像石头一样变硬。",
        "这个活动探索一类叫非牛顿流体的迷人材料，只需两种材料和几分钟，你就能做出一碗可以用手感受的科学实验。",
      ],
      why:
        "大多数液体，比如水和果汁，不管用多大力推压，流动速度都一样。奥不力克不同，它是一种非牛顿流体，意味着它的粘度（有多稠或多稀）会随压力变化。当你快速按压或拍打它时，玉米淀粉颗粒互相锁住，表现得像固体。压力释放后，颗粒分开，它又像液体一样流动。这种特性叫做剪切增稠，工程师们研究类似材料用于防弹衣和路面修补等领域。",
      materials: [
        "2 杯玉米淀粉",
        "1 杯水",
        "几滴食用色素（可选）",
        "一个大号混合碗",
        "一把勺子或刮刀",
        "一个有边缘的托盘，方便控制散落",
      ],
      steps: [
        "把玉米淀粉倒入大碗中。",
        "如果想让奥不力克有颜色，把食用色素滴入水中。",
        "边搅拌边慢慢把水倒入玉米淀粉，不要一次全倒进去。",
        "继续搅拌直到没有干结块，感觉搅拌起来有点奇怪为止。",
        "用手指快速戳一下表面，然后再慢慢把手指按进去，感受两者的不同。",
        "抓起一把捏紧，然后张开手让它滴落。",
        "说说你观察到了什么：它什么时候像固体？什么时候像液体？",
      ],
      safety:
        "奥不力克由食品级材料制成，接触皮肤是安全的，但会很乱。不要把它倒进下水道，因为玉米淀粉会堵塞管道。剩余的奥不力克应让其在托盘上自然晾干，再刮入垃圾桶丢弃。碗和手用温水冲洗，等残留物干燥后再刮去。",
      challenge:
        "试着调整玉米淀粉和水的比例，各多加一点，观察质地怎样变化。你也可以把一袋奥不力克放在音箱上，播放重低音音乐，看看它如何随节奏舞动。",
    },
    {
      slug: "rubber-band-powered-car",
      title: "橡皮筋动力车",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "简单",
      time: "1-2小时",
      image: "/images/projects/rubber-band-powered-car.jpg",
      description:
        "一辆不需要电力或电池的手工小车，只用扭紧的橡皮筋储存的能量推动车轮和车轴向前转动。",
      introduction: [
        "橡皮筋动力车是最有成就感的手工之一：你完成所有的搭建，把它绕紧，放在平面上，然后看着物理学把剩下的事做完。",
        "你可以用日常材料搭建它，然后开始调整：换橡皮筋、改变轮子或者调整车重，观察每次改动对行驶距离的影响。",
      ],
      why:
        "橡皮筋被扭紧或绕圈时会储存能量。松开小车后，橡皮筋回弹并将储存的能量传递给车轮或车轴。这将势能转化为动能，也就是运动的能量。小车在光滑的平面上跑得最好，学生可以通过改变橡皮筋、轮子、车身长度或车重来优化设计。",
      materials: [
        "纸板、泡沫板或其他轻质材料，用作车身",
        "4个轮子，例如瓶盖、纸板圆圈或小玩具轮子",
        "2根竹签、铅笔或吸管，用作车轴",
        "吸管段，用于固定车轴",
        "1到2根橡皮筋",
        "胶带、胶水和剪刀",
        "可选：不同尺寸的轮子或橡皮筋，用于测试改进效果",
      ],
      steps: [
        "用纸板、泡沫板或其他轻质材料搭建车身主体。",
        "将吸管段粘在车身底部，用来固定车轴。",
        "将竹签、铅笔或吸管穿过轴套。",
        "将轮子仔细安装到每根轴的两端，确保它们能顺畅旋转。",
        "将橡皮筋一端固定在车身上，另一端固定在后轴上。",
        "向后转动后轮或后轴，将橡皮筋扭紧或绕圈。",
        "把小车放在光滑的平面上。",
        "松开小车，看着它靠橡皮筋的力量向前驶去。",
      ],
      safety:
        "使用剪刀和尖竹签时请让大人帮忙。绕紧橡皮筋时让它远离脸部，以免弹回伤人。放车时不要朝着任何人的方向。",
      challenge:
        "能让你的车跑更远吗？试试更粗或更强的橡皮筋、不同尺寸的轮子，或者更长、更短的车身。测试更轻的车是否比更重的跑得更远，和另一组比赛看谁的设计赢。",
    },
    {
      slug: "lemon-powered-batteries",
      title: "柠檬电池",
      category: "科学",
      categoryKey: "science",
      difficulty: "简单",
      time: "30-45分钟",
      image: "/images/projects/lemon-powered-batteries.jpg",
      description:
        "把柠檬变成真正的电池，点亮一个LED灯，探索化学能如何转化为电能。",
      introduction: [
        "你知道柠檬能点亮灯泡吗？听起来不可思议，但柠檬汁里含有酸性物质，能引发两种不同金属之间的化学反应，产生微弱的电流。",
        "这个项目教你了解真实电池的工作原理、科学家为什么要配对不同金属，以及电解质的作用，材料就藏在你家厨房里。",
      ],
      why:
        "柠檬电池靠的是两种不同金属与酸性柠檬汁之间的化学反应。锌钉和铜片充当电极，柠檬汁充当电解质。电子从锌通过导线流向铜，形成微弱的电流。单个柠檬产生的电压可能不够，但将多个柠檬串联起来可以提高总电压。",
      materials: [
        "2到4个柠檬",
        "铜币、铜线或铜条",
        "锌钉或镀锌钉（轻轻打磨表面使其清洁）",
        "带鳄鱼夹的导线",
        "小型LED灯、数字时钟或电压表",
        "纸巾用于清洁",
      ],
      steps: [
        "将柠檬在桌上轻轻滚动，让内部汁液松动。",
        "在每个柠檬上分别插入一根锌钉和一片铜，确保两者不互相接触。",
        "用鳄鱼夹将一个柠檬的铜片连接到下一个柠檬的锌钉。",
        "如果使用多个柠檬，继续按顺序串联连接。",
        "将链条两端的空余导线连接到LED灯、小型数字时钟或电压表。",
        "观察设备是否点亮，或柠檬产生了多少电压。",
      ],
      safety:
        "柠檬汁是酸性的，溅入眼睛会刺痛，切开柠檬后请洗手。插钉子和连接导线时请让大人帮忙。不要把导线或鳄鱼夹放进嘴里。",
      challenge:
        "能用超过一个柠檬点亮LED吗？多加几个柠檬看看有什么变化。换成土豆、橙子或苹果试试，比较哪种水果产生的电压最大。",
    },
    {
      slug: "balloon-powered-car",
      title: "气球动力车",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "简单",
      time: "1-2小时",
      image: "/images/projects/balloon-powered-car.jpg",
      description:
        "造一辆靠空气驱动的小车，探索牛顿第三定律如何让一个简单气球变成强力引擎。",
      introduction: [
        "气球动力车利用从气球里冲出来的空气推动自己前进。当空气通过吸管向后喷出，小车就会向前运动，这就是牛顿第三运动定律在起作用。",
        "你可以用家里常见的废旧材料来搭建它，然后测试轮子大小、车身重量或气球密封程度等细节变化，看看哪些改动能让小车跑得更远。",
      ],
      why:
        "气球充气后，拉伸的橡皮和压缩的空气中储存了势能。松开气球时，空气通过吸管向后喷出。这个向后的推力产生了一个等大反向的作用力，将小车推向前方。储存的势能转化为动能，也就是运动的能量。",
      materials: [
        "一小块硬纸板或塑料水瓶，用作车身",
        "4个塑料瓶盖，用作车轮",
        "2根竹签或结实的吸管，用作车轴",
        "4段短吸管，用于固定车轴",
        "1个气球",
        "1根吸管",
        "胶带、剪刀和胶水",
      ],
      steps: [
        "将短吸管段粘在车身底部，作为车轴的固定套管。",
        "将竹签或吸管穿过轴套。",
        "把瓶盖粘在每根轴的两端，制成车轮。",
        "将一根吸管插入气球口，用胶带紧紧缠绕，确保不漏气。",
        "将气球和吸管组成的动力装置粘在车身顶部，吸管末端朝向车尾。",
        "吹满气球，捏住吸管，将小车放在平坦的地面上，松手放开。",
      ],
      safety:
        "使用剪刀和尖竹签时请让大人帮忙。放开小车前，确保它放在平坦、安全的地面上，测试时手指远离转动的车轮和车轴。",
      challenge:
        "你的车能跑更远吗？试试换更大的轮子、让车身更轻、把气球接口封得更严，或者和另一组比赛，看谁的设计跑得更远。",
    },
    {
      slug: "corner-count",
      title: "街角计数",
      category: "数学",
      categoryKey: "math",
      difficulty: "简单",
      time: "3 x 20分钟",
      image: "/images/projects/The Corner Count.jpeg",
      description:
        "连续三天，在等长的时间窗口里数一数你家街角的车流和人流，把结果画成图表，然后在去数下一次之前先预测结果。",
      introduction: [
        "数据不只存在于课本里。此刻它就在你家门口的街上，只是还没有人把它记下来。",
        "在这个项目里，你就是那个把它记下来的人。你选一个位置，在固定长度的时间窗口里数经过的东西，一直重复到出现规律为止。然后是最难的一步：在你出门去数之前，先预测下一次的数字。",
      ],
      why:
        "自己发现的规律，比别人直接告诉你的规律更有价值。使用等长且固定的时间窗口来计数，才能让这些数字可以互相比较，而比较正是把一堆正字变成一张有话可说的柱状图的关键。先预测再测量，就是把完整的科学方法压缩进二十分钟：你先给出一个答案，然后让真实世界告诉你差了多少。",
      materials: [
        "一个笔记本，或者本页可打印的计数表",
        "一支铅笔",
        "一个计时器或手机上的时钟",
        "一个安全的站立或就座位置，要离马路足够远",
        "一位陪着你的大人",
        "彩色铅笔或马克笔，用来画图表",
      ],
      steps: [
        "选一个你容易到达且安全的位置，比如面向街道的窗户，或者一张离路缘较远的长椅。每一次都要用完全相同的位置。",
        "挑三样东西来数。汽车、走路的人和狗是不错的开始，自行车、公交车或送货车也一样可以。",
        "把计时器设为10分钟。你选的三样东西每经过一个，就画一笔正字。计时器响的时候就停止计数，哪怕有东西刚走到一半。",
        "在正字旁边写下日期、开始时间和天气。正是这三条记录，让你之后能够把不同的窗口拿来比较。",
        "在接下来的两天里，在每天的同一时间重复一次，这样你最后会得到三个可以公平比较的时间窗口。",
        "画一张柱状图，把你数的三样东西放在下方，数量沿着侧边往上排。每一天用一种颜色，让三天的柱子并排站在一起。",
        "在第四次计数之前，为每一类写下一个预测，再写一句话说明你为什么选那个数字。然后去数，把真实的数字写在你的预测旁边。",
      ],
      safety:
        "在大人认可的位置计数，比如窗边、门廊或路缘后方的长椅，并且要离马路足够远。绝对不要为了看得更清楚而走下人行道，也绝对不要独自在车流附近计数。如果天黑了或者天气不好，就在室内数。",
      challenge:
        "只改变一样东西，然后重新数：一天中的时间、一周中的哪一天，或者街角本身。这三样里哪一样让数字变化最大？之后再试着预测一个你从来没数过的时间段，看看你的规律是否依然成立。",
      recordSheet: {
        title: "车流计数表",
        intro:
          "把这张表打印出来，每一个计数窗口填一行。所有窗口的长度必须完全一致，否则这些数字无法比较。",
        columns: ["日期", "开始时间", "天气", "汽车", "走路的人", "狗"],
        rows: 4,
        footnote:
          "在最后一个窗口之前，把你对每一列的预测写在页边。数完之后，把最接近的那一项圈起来。",
      },
    },
    {
      slug: "sock-sorter",
      title: "袜子分拣器",
      category: "人工智能",
      categoryKey: "ai",
      difficulty: "简单",
      time: "1小时",
      image: "/images/projects/The Sock Sorter.png",
      description:
        "把你自己的三十样东西分成两堆，写下计算机要区分它们所需要的规则，然后故意做出三个能骗过你自己规则的物体。",
      introduction: [
        "每当手机从照片里认出一张脸，或者某个应用判断一条消息是垃圾信息，背后都有东西是从例子中学到了区别。不是因为有人直接告诉它答案，而是因为有人给它看了一堆一堆的东西。",
        "你要用手工的方式做同样的工作。两堆东西、三十个物体，以及一套你亲手写下的规则。之后你要设法打败自己的规则，而这正是专业人工智能团队花费大部分时间的地方。",
      ],
      why:
        "计算机看不见一只袜子。它只能测量关于袜子的一些量：有多长、有几种颜色、有没有脚后跟。你所挑选的这些量叫做特征，而挑选特征几乎就是全部的工作。你在最后发明出来的那些物体叫做边界情况，真实系统正是在那里出错。刻意去寻找它们，能让你明白一个自信的答案和一个正确的答案并不是一回事。",
      materials: [
        "家里的三十样物品，要能清楚地分成两组",
        "纸和一支铅笔",
        "一把尺子",
        "两个盒子、托盘或毛巾，用来放两堆东西",
        "手机或平板的相机，可选，用来给每一堆拍照",
      ],
      steps: [
        "挑两组一眼就能分辨的东西：袜子和手套、叉子和勺子、硬币和纽扣。每组各收集大约十五个，分成两堆。",
        "给每一堆拍照或画下来，留个记录。这一套物品是你的规则唯一可以学习的来源，所以值得保存好。",
        "先别碰计算机，把你能对一个物体做的所有测量都列出来：以厘米为单位的长度、颜色的数量、孔的数量、会不会弯、亮不亮。这些就是你的特征。",
        "现在只用这些测量来写你的规则。比如：如果它长于12厘米并且没有孔，那它就是袜子。每条规则都要短到能一口气念出来。",
        "用你的规则逐个测试全部三十个物体。把规则判断错的物体都标出来并数一数。这个数量就是你的错误率。",
        "只改动一条规则，然后重新测试这三十个。把两次的成绩都记下来，看看这次改动到底有没有帮上忙。",
        "现在攻击你自己的成果。找到或做出三个会让你的规则故意判断错误的物体：一只非常短的袜子、一只把手指塞进去的手套、某个不知怎么两样都算的东西。测试它们，写下你的规则是怎么说的，以及它们为什么被骗了。",
      ],
      safety:
        "只用你自己的东西，或者先问过再借。如果你为了做出一个边界情况而要剪裁或改动物品，请让大人帮忙用剪刀，并挑选没有人会心疼弄坏的东西。",
      challenge:
        "把你写下的规则交给另一个人，不给他们看你的两堆东西，让他们只凭你写的内容去分拣一组全新的物品。他们犯的每一个错误，都是一条你以为写清楚了、其实并没有的规则。你想表达的意思和你实际写下的内容之间的这道缝隙，正是让真实人工智能系统出现漏洞的同一道缝隙。",
      recordSheet: {
        title: "规则测试记录",
        intro:
          "每一轮测试填一行。用你的规则跑完全部三十个物体，数一数判断错了多少，然后改动一条规则再跑一遍。",
        columns: ["轮次", "你改动的规则", "测试的物体数", "判断正确", "判断错误"],
        rows: 4,
        footnote:
          "如果某一轮让成绩变差了，也要把这一行保留下来。一次帮了倒忙的改动同样是证据，删掉它正是人们自欺欺人的方式。",
      },
    },
    {
      slug: "teardown-night",
      title: "拆解之夜",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "中等",
      time: "1-2小时",
      image: "/images/projects/Teardown Night.png",
      description:
        "和大人一起拆开一台坏掉的设备，按照拆出来的顺序把每个零件摆好，弄清楚每一个零件原本负责什么工作。",
      introduction: [
        "大多数人把坏掉的东西丢掉时，从来没弄清楚过里面到底有什么。那等于把一整堂工程课扔进了垃圾桶。",
        "今晚你要打开一台。你不需要修好它，也不必修好。你的任务是把每个零件取出来、保持它们的顺序，并弄清楚每一个是做什么用的。",
      ],
      why:
        "动手做东西，教会你一种设计是怎么工作的。拆开东西，则教会你一百种设计是怎么工作的，因为你打开的每一件产品都是某个人对某个问题给出的答案，而你可以直接读到这个答案。按照拆出来的顺序摆放零件，既是之后还能装回去的前提，也是把一堆零件变成一张组装地图的关键。",
      materials: [
        "一台没人想要回去的坏设备：遥控器、有线鼠标、有线耳机、旧烤面包机、机械闹钟",
        "一套小螺丝刀，最好同时有十字头和一字头",
        "一条毛巾或一个托盘，用来摆放零件",
        "小碗，或者一个冰格盘，用来按顺序放螺丝",
        "一部手机相机",
        "一位大人，全程在场",
      ],
      steps: [
        "和大人一起挑选这台设备，并确认打开它是安全的：至少已经拔掉电源一天、电池已取出、里面没有屏幕也没有大容量电容。",
        "在动任何一颗螺丝之前，先把外壳的每一面都拍下来。这就是它完整时的样子的记录。",
        "找出所有螺丝，包括藏在橡胶脚垫和贴纸下面的那些。把每颗螺丝按拆下的顺序，分别放进自己的小碗或冰格盘的格子里。",
        "慢慢地打开外壳。如果它打不开，说明还有一颗螺丝或一个卡扣你没找到。用蛮力几乎从来都不是答案。",
        "一次取出一个零件，按照它出来的确切顺序，从左到右摆在毛巾上。每摆几个零件就给这一排拍一张照。",
        "为每个零件写一句话：它是什么，以及它原本在做什么工作。如果你判断不出来，就写下你最好的猜测，并在旁边加一个问号。",
        "如果可以的话，找出坏掉的那个零件。留意烧焦的痕迹、断裂的塑料、松脱的电线或磨损的齿轮。然后想一想：这个零件本来能不能设计成不会坏？",
      ],
      safety:
        "整个项目必须有大人全程在场。只能打开已经拔掉电源、取出电池并且放置至少一天的设备。绝对不要打开微波炉、电视机、显示器、相机闪光灯，或任何含有大容量电容的东西，因为它们在断电很久之后仍可能储存着危险的电荷。当心锋利的金属边缘和处于压紧状态的弹簧，撬开外壳时要戴上护目镜。",
      challenge:
        "重新设计一个零件。挑出坏掉的那个，或者让这台设备最难拆开的那个，画出一个能解决问题的版本。然后数一数螺丝：你的版本能不能少用几颗？容易拆开的产品更容易修理，而可修理的东西能在垃圾填埋场之外多待很久。",
      recordSheet: {
        title: "零件清单",
        intro:
          "每个零件填一行，按照它拆出来的顺序。即使是在猜，最后一列也要填，并给猜测的内容标上问号。",
        columns: ["编号", "零件名称", "由什么材料制成", "原本负责的工作"],
        rows: 10,
        footnote:
          "如果你打算把它装回去，就从表格的最下面往上读：最后拆出来的零件，是第一个装回去的。",
      },
    },
    {
      slug: "egg-drop-budget",
      title: "有预算的鸡蛋坠落",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "困难",
      time: "2小时",
      image: "/images/projects/Egg Drop on a Budget.jpg",
      description:
        "用每一样都要花积分的材料保护一颗生鸡蛋。动手之前先画图并写下预测，摔三次，用鸡蛋是否完好除以你花掉的积分来打分。",
      introduction: [
        "如果允许无限量的填充物，谁都能保护好一颗鸡蛋。用枕头一裹就完事了，可你什么也没学到。",
        "所以这个版本要向你收费。每一根吸管、每一厘米胶带、每一个棉球都要花积分，你的成绩是鸡蛋是否存活除以你花掉的积分。突然之间，设计比填充物重要得多。",
      ],
      why:
        "真正的工程几乎从不要求做出最好的东西。它要求的是在给定的钱、重量或空间之内你能做出的最好的东西，这叫做在约束条件下设计。预算正是把这件事从手工活变成工程问题的东西。在摔下去之前写下预测则是另一半：如果你等到看见结果之后才决定自己原本的预期，你就能说服自己相信你早就知道了。",
      materials: [
        "每次尝试一颗生鸡蛋，另外再准备两颗备用",
        "吸管，每根1分",
        "棉球，每个3分",
        "纸，每张1分",
        "纸板，每块巴掌大小2分",
        "绳子，每一臂长1分",
        "胶带，每10厘米1分",
        "一个塑料袋，5分",
        "一把尺子、一支铅笔和画图用的纸，免费",
        "一块防水布、垃圾袋或旧毛巾，用作落地区",
      ],
      steps: [
        "和大人一起商定下落高度，并且每一轮都使用完全相同的高度。二楼窗户或者人字梯的顶端都可以，前提是下方的落地区是空的。",
        "把价格表抄下来，为第一轮定一个预算。十五分是个不错的起始上限。",
        "在碰任何材料之前先把你的设计画出来。标出哪一部分负责减慢下落、哪一部分负责吸收冲击、哪一部分负责固定鸡蛋。",
        "写下你的预测：鸡蛋会不会活下来，你设计中的哪一部分会最先失效？每个问题写一句话，之后不许改。",
        "把它做出来，然后把你实际花掉的分数加起来。如果超了预算，就在摔之前拆掉一些东西。",
        "摔下去。不要向下用力扔，松手就行。打开来，把损坏情况拍照，把真实发生的事写在你的预测旁边。",
        "再做两轮，每一轮的预算都比上一轮更少。每一轮的成绩都用存活情况除以花掉的分数，看看变穷是不是逼着你变得更聪明。",
      ],
      safety:
        "下落高度和落地区都必须由大人设定并认可，任何高过头顶的高度都必须由大人来松手。每次下落之前，所有人都要离开落地区。生鸡蛋可能带有沙门氏菌，所以要在可以擦洗的台面上操作，每一轮之后都要洗手，鸡蛋摔破了要立刻清理干净。",
      challenge:
        "把预算砍掉一半，看看还能不能让鸡蛋活下来。然后反过来：预算不变，但把下落高度加倍。哪一个限制更难应付？大多数工程问题都是这个形状的，而判断出哪一个约束才是真正卡住你的那个，几乎就是全部的本事。",
      recordSheet: {
        title: "坠落记录",
        intro:
          "每一轮填一行。预测那一列要在摔之前填，绝不能事后补。",
        columns: ["轮次", "预算", "花掉的分数", "预测结果", "实际结果", "成绩"],
        rows: 3,
        footnote:
          "鸡蛋完好计1分，摔破计0分，再除以你花掉的分数。裂了但没破的鸡蛋算半分。",
      },
    },
    {
      slug: "bean-race",
      title: "30天豆子赛跑",
      category: "科学",
      categoryKey: "science",
      difficulty: "简单",
      time: "30天，每天5分钟",
      image: "/images/projects/The 30-Day Bean Race.jpg",
      description:
        "四颗豆子、四个杯子，以及一样你故意改变的东西。连续三十天每天早上测量，留一个杯子完全不动作为对照，找出真正起作用的是什么。",
      introduction: [
        "大多数一个下午就能做完的实验，往往在有趣的事情发生之前就结束了。植物不是这样。豆子有它自己的节奏，而这份等待正是这个项目真正要教的东西。",
        "你会在同一天开始四个杯子，在它们之间只改变一样东西，然后连续一个月每天早上测量。到最后，你会得到一张没有任何人递给你的图表。",
      ],
      why:
        "那个你什么都不改变的杯子叫做对照组，它是窗台上最重要的一个杯子。没有它，你就无法判断豆子长高是因为你做了什么，还是因为豆子本来就会长。每次只改变一样东西，才让你有资格说是这个改变造成了差别；而按时测量，包括那些看起来什么都没发生的日子，才是让你保持诚实的方式。",
      materials: [
        "同一种干豆子四颗，从一袋花豆或芸豆里挑",
        "四个透明杯子或罐子，大小要完全一样",
        "棉球、厨房纸巾或营养土",
        "水",
        "一把标有厘米的尺子",
        "美纹纸胶带和一支马克笔，用来给杯子贴标签",
        "一个笔记本和一部手机相机",
      ],
      steps: [
        "把四颗豆子一起泡水过夜，让它们都从同一个起点开始。",
        "用完全相同的方式布置四个杯子：湿润的棉球或泥土、一颗贴着杯壁好让你能看见的豆子，再加一个标签。第1号杯是你的对照组，三十天里关于它的一切都不许改变。",
        "挑一样东西来改变，并且只在第2、3、4号杯里改。光照量、浇水量或者温度都很合适。把你改了什么、改了多少准确地记下来。",
        "把四个杯子在同一时间放到同一个地方，除非光照或温度正好就是你要测试的那个变量。",
        "每天早上大致同一时间，用厘米量出每一株芽的高度，并从同一个角度给每个杯子拍一张照。",
        "即使某一天什么都没变，也要把四个数字都写在表上。一整行零也是真实的数据，跳过它会掩盖发芽到底花了多久。",
        "第三十天，在同一张图上画四条线，每个杯子一条，横轴是天数，纵轴是高度。然后把你的三十张照片按顺序排好，快速翻一遍。",
      ],
      safety:
        "这个项目里的豆子是用来种的，不是用来吃的：生的和泡过的豆子可能让你生病。碰过泥土之后要洗手，杯子要放在宠物和小孩子够不到的地方。如果某个杯子长了霉，请大人把那个杯子扔掉。",
      challenge:
        "再做第二遍，但在第一天就写下你预期图表会长什么样，在还没有任何数据之前先把四条线画出来。然后改一样更难控制的东西，比如水的种类或者容器的大小，看看你的预测是否依然成立。",
      recordSheet: {
        title: "30天生长记录",
        intro:
          "每天填一行。每天早上大致在同一时间测量，即使那个数字是零也要写下来。",
        columns: ["天数", "1号杯（对照）", "2号杯", "3号杯", "4号杯", "备注"],
        rows: 15,
        footnote:
          "打印两份就能覆盖全部三十天。高度以厘米为单位。备注栏用来写任何反常的情况：发霉、叶子张开、某天忘了浇水。",
      },
    },
    {
      slug: "rover-wheels",
      title: "巡视车轮子对决沙地",
      category: "机器人",
      categoryKey: "robotics",
      difficulty: "中等",
      time: "2小时",
      image: "",
      description:
        "用纸板和瓶盖做出四种不同的轮子，让同一个底盘在同一盘沙子和砾石上行驶，测出哪一种设计真的跑得最远。",
      introduction: [
        "在火星上行驶，最难的部分并不是行驶本身。难点在于地面是松软的，一个在光滑地板上表现完美的轮子，可能会把自己刨进一个坑里再也出不来。",
        "要研究这个问题，你并不需要机器人套装。你需要的是一盘沙子、一个简单的滚动底盘，以及四组你故意做得不一样的轮子。",
      ],
      why:
        "除了轮子以外的一切都必须保持不变，否则你什么也学不到：同一个底盘、同一个斜坡、同一盘沙子、同一个出发点。这叫做控制变量，正是它让你能够说出差别是轮子造成的。真正的巡视车团队做的就是这件事，他们在地球上的试验场里测试各种轮子设计，因为没有人能被送到火星去修一个设计错了的轮子。",
      materials: [
        "一个浅盘、烤盘或箱子盖",
        "沙子、干土，或者大米和小砾石的混合物",
        "做底盘和轮子用的纸板",
        "瓶盖、罐子盖和纸板圆片，用来做出不同的轮子",
        "木签、吸管或铅笔，用作轮轴",
        "胶带、一把尺子和剪刀",
        "一本书或一块板子，用来搭一个小斜坡",
        "橡皮筋和瓦楞纸板，用来增加胎面花纹",
      ],
      steps: [
        "做一个简单的底盘：一块长方形纸板，下面用胶带粘两根吸管作为轮轴支架。你只有这一个底盘，所以要做结实，并且每一次测试都用它。",
        "在盘子里铺大约两厘米深的沙子或砾石，把表面抹平。每一次测试之前都要重新抹平一遍。",
        "在一端架好斜坡，让每一次测试都获得完全相同的推力。标出释放点，并且永远不要挪动它。",
        "做四组轮子，每一组只在一个明显的地方不同：窄的对宽的、光滑的对有花纹的、直径小的对直径大的。把每一组的不同之处记下来。",
        "第一组跑三次，每次之间都把沙子抹平。从斜坡末端量到底盘前端，把三个距离都记下来。",
        "四组各跑三次，总共十二次，中途不许更换斜坡或底盘。",
        "算出每一组三次距离的平均值再比较。然后看看沙子上留下的车辙，因为那些陷进去的轮子告诉你的信息，和没陷进去的一样多。",
      ],
      safety:
        "使用剪刀和把木签剪到合适长度时，请大人帮忙，并用胶带把尖锐的签头包住。在盘子里做测试，让沙子不会撒得到处都是，并把沙子和小零件放在宠物和幼儿够不到的地方。结束后要洗手。",
      challenge:
        "加上重量。在底盘上粘一个小物件，再把四组轮子全部跑一遍。赢的还是原来那一组吗？真正的巡视车会随着仪器的增加而变重，一个空载时表现良好的轮子，负重后可能会失败。之后再试试你能搭出来的最难的路面：斜坡上的松沙。",
      recordSheet: {
        title: "轮子测试结果",
        intro:
          "每组轮子跑三次，总共十二次。每一次测试之前都必须把沙子抹平。",
        columns: ["轮子组别", "不同之处", "第1次 (厘米)", "第2次 (厘米)", "第3次 (厘米)", "平均值"],
        rows: 4,
        footnote:
          "如果某一次的结果和另外两次差得离谱，不要删掉它。在旁边写下当时出了什么问题，因为最有意思的失败通常就藏在那里。",
      },
    },
    {
      slug: "family-chatbot",
      title: "一个只认识你家人的聊天机器人",
      category: "编程",
      categoryKey: "coding",
      difficulty: "中等",
      time: "2小时",
      image: "/images/projects/A Chatbot That Only KNows Your Family.jpeg",
      description:
        "用 Python 写一个只知道你家里的事、别的一概不懂的聊天机器人，然后拿同样的问题去问真正的人工智能助手，看看两者各自会在哪里出错。",
      introduction: [
        "一个什么都知道的聊天机器人令人惊叹，也几乎无法看懂。一个只知道你家狗的名字和你奶奶生日的聊天机器人，这两样都算不上，而这正是它值得动手做的原因。",
        "你的机器人大约三十行 Python，写在本站的编辑器里，什么都不用安装。之后你会把你的机器人能回答的那些问题，原封不动地拿去问一个真正的人工智能助手，并记下各自在哪里翻车。",
      ],
      why:
        "你的机器人是在查表。它保存着一本事实字典，当一个问题和其中任何一条都对不上时，它就拿不出任何东西。大型语言模型做的是完全不同的事：它预测下一段可能出现的文字，这既是它几乎什么都能回答的原因，也是它有时会满怀自信地编造答案的原因。在你本来就知道正确答案的问题上，把这两种行为并排放在一起看，是理解这些工具究竟在做什么的最清楚的方式。",
      materials: [
        "一台带浏览器的电脑或平板",
        "本站的 Python 编辑器，不需要安装任何东西",
        "一份关于你家的、大约十条真实事实的清单",
        "纸和铅笔，用来做对比记录",
        "在大人陪同下使用人工智能助手的机会，用于最后两个步骤",
      ],
      steps: [
        "打开本站的 Python 编辑器，把下面的起始程序敲进去，或者直接粘贴。运行它，先问问那只狗。然后问一个它从没听说过的东西，看看它会怎么做。",
        "把三条事实全部换成你自己家里的真事。每个关键词都要短、要用小写，因为那正是你的机器人在问题里搜索的那个词。",
        "再加七条事实，凑成十条。每加两三条就运行一次，因为只加了两行的时候，找出漏掉的那个逗号要容易得多。",
        "试着把它弄坏。不用“狗”这个字去问那只狗。在一句话里问两件事。把每一个本该奏效却没奏效的问题都记下来。",
        "修好其中一处失败。让两个不同的关键词指向同一个答案是最简单的修法，比如让“狗”和你家狗的真实名字都返回同一条事实。",
        "现在在大人在场的情况下，把这十个问题原样问给人工智能助手。它根本不可能知道正确答案。不管它说什么，都照样记下来。",
        "填写对比表。你的机器人不知道的时候就会说自己不知道。记下助手在这种情况下会做什么，然后决定：在你要依赖的东西里，你更愿意要哪一种行为。",
      ],
      codeBlock: {
        title: "起始程序",
        intro:
          "三十行，每一行都能用手指出来它在干什么。最上面的字典就是你的机器人知道的全部内容；下面全都是读取问题并搜索匹配关键词的循环。",
        code: `facts = {
    "dog": "我们家的狗叫 Pepper，今年4岁。",
    "car": "家里的车是一辆蓝色的本田。",
    "birthday": "奶奶的生日是3月2日。",
}

print("问我关于我家人的事吧。输入 bye 结束。")

while True:
    question = input("> ").lower()

    if question == "bye":
        print("回头见。")
        break

    answer = "这个我不知道。"

    for keyword in facts:
        if keyword in question:
            answer = facts[keyword]

    print(answer)`,
        note:
          "最重要的一行，是在搜索开始之前先把答案设成“这个我不知道”的那一行。正是这个默认值让你的机器人在没有内容时会承认自己不知道，而这恰恰是语言模型所没有的行为。",
      },
      safety:
        "不要把任何隐私放进你的事实里：不写全名、不写家庭住址、不写电话号码、不写密码、不写学校名称。只用名字或小名。使用人工智能助手的那几个步骤要有大人陪着，并且绝对不要把你家人的具体信息输入进去。",
      challenge:
        "给你的机器人加上记忆。把它上一次匹配到的关键词存进一个变量，然后让“她多大了”这样的追问直接使用存下来的关键词，而不是重新搜索一遍。仅仅这一个功能，就是一张查询表和一个感觉像在对话的东西之间的差别，而这也正是你的机器人开始犯糊涂的地方，糊涂的方式和真实助手一模一样。",
      recordSheet: {
        title: "你的机器人对阵助手",
        intro:
          "十个你本来就知道正确答案的问题。每一个都要把四列都填满。",
        columns: ["问题", "正确答案", "你的机器人说了什么", "助手说了什么"],
        rows: 10,
        footnote:
          "把助手给出了自信却不属实的答案的每一行都标出来。这种行为有个名字，叫幻觉，而这张表就是你亲手记录下来的证据。",
      },
    },
    {
      slug: "loudest-room",
      title: "家里最吵的房间",
      category: "科学",
      categoryKey: "science",
      difficulty: "中等",
      time: "2小时",
      image: "",
      description:
        "用手机上的分贝计测量每一个房间，找出最吵的那间，然后用家里的材料做一个隔音盒，量一量每加一层能换回多少分贝。",
      introduction: [
        "家里每个人都已经有了关于哪个房间最吵的看法。几乎没有人真的量过。",
        "一个免费的分贝计应用能把手机变成一件真正的仪器。一旦你能给噪音标上数字，争论就变成了测量，你也就可以朝着一个目标去设计，而不是朝着一种感觉。",
      ],
      why:
        "分贝不像普通数字那样相加。它的刻度是对数的，每增加10分贝，听起来的响度大约翻一倍，这意味着把一个声音降低10分贝，是一个远比这个数字看上去更大的成果。每一次都从同样的距离测量同一个声源，才让你的读数可以互相比较，也是你能够断言是那层毛巾、而不是这个房间造成了差别的唯一依据。",
      materials: [
        "一部装有免费分贝计应用的手机或平板，应用要和大人一起挑选",
        "一个稳定的声源，比如第二部手机以同样音量循环播放同一段音频",
        "一个鞋盒或小纸箱",
        "毛巾、一条毯子、鸡蛋托、气泡膜、揉皱的报纸",
        "胶带和剪刀",
        "一把卷尺或一把长尺",
      ],
      steps: [
        "和大人一起安装一个分贝计应用，并学会读它。大多数应用显示的是分贝，写作 dB，而这个数字会一直跳动，所以要取范围的中间值，而不是最高的那个尖峰。",
        "在什么都不开的情况下，把每个房间的背景噪音都测一遍：把手机举到胸口高度、站在房间正中，等十秒钟，把数字记下来。这就是你的基准。",
        "现在在正常生活状态下找出最吵的房间：电视开着、洗碗机在转、所有人都在说话。同样的高度、同样的房间正中、同样的十秒钟。",
        "搭建一个可重复的测试。把稳定声源放在地板上，在正好一米远的地方做个标记，之后每一次都从那个标记处测量。先记下完全不加盒子时的读数。",
        "把声源放进空纸箱里，再从同一个标记处测一次。记下分贝下降了多少。",
        "一次只加一种材料：先一层毛巾，再鸡蛋托，再揉皱的报纸。每加一层就测一次，绝不在同一轮里加两种材料。",
        "把分贝对层数画成图。找出用最小的体积换来最大降幅的那一层，并写下你认为它取胜的原因。",
      ],
      safety:
        "绝对不要在靠近耳朵的地方用很大的声音做测试，也不要为了让数字更夸张而把声源调大。持续超过大约85分贝的声音可能造成永久性听力损伤。把声源保持在正常聆听音量，让盒子去干活。安装任何应用之前都要先问过大人。",
      challenge:
        "试着让整个房间安静下来，而不只是一个盒子。先测量房间，把一条毯子挂在最大的一块坚硬平整表面上，然后从完全相同的位置再测一次。柔软的东西吸收声音，坚硬平整的东西反射声音，这就是空房间会有回声、铺了地毯的房间却不会的原因。在不挪动任何一件家具的前提下，你能从一个真实的房间里减掉多少分贝？",
      recordSheet: {
        title: "分贝记录",
        intro:
          "每一次都是同一个位置、同样的距离、同一个声源。记下范围的中间值，不要记最高的尖峰。",
        columns: ["测试", "改变了什么", "读数1 (dB)", "读数2 (dB)", "读数3 (dB)", "平均值"],
        rows: 8,
        footnote:
          "每次测试读三遍，因为分贝计永远不会给出两个相同的数字。如果三个读数相差很远，说明有东西动了：先检查距离，再决定要不要相信这个平均值。",
      },
    },
    {
      slug: "receipt-detective",
      title: "小票侦探",
      category: "数学",
      categoryKey: "math",
      difficulty: "中等",
      time: "1小时",
      image: "/images/projects/Receipt Detective.jpeg",
      description:
        "拿一张真实的超市小票，算出所有有多种规格的商品的单位价格，找出你家多花钱的三个地方。",
      introduction: [
        "货架上的价格并不真的是你正在支付的价格。你真正支付的是每一克、每一毫升的价格，而商店几乎从不把这一部分印成大字。",
        "一张小票、一个计算器，大约一个小时就够了。到最后，你会拿出一份一页纸的建议，背后有真实的数字，讲的是你家实实在在花掉的钱。",
      ],
      why:
        "单位价格就是单位率，而单位率是小学数学里最难让人在意的东西，因为它平时总是以一张毫无后果的习题纸的形式出现。在这里，答案会改变家里买什么。用价格除以规格，来比较两个大小不同的东西，无论比较的是麦片盒、手机套餐，还是一箱油能跑多远，都是同一个运算；而只要你真刀真枪地做过一次，它就不再抽象了。",
      materials: [
        "一张真实的超市小票，要经过同意才能使用",
        "一个计算器，或者手机上的那个",
        "纸和铅笔",
        "各件商品的包装规格，这可能意味着要去橱柜里快速看一眼",
        "一位可以在最后一起讨论结论的大人",
      ],
      steps: [
        "开口要一张小票，并征得使用它的同意。把每一件商品连同它的价格抄到你的表上。",
        "把只有一种规格的东西划掉，比如一个单卖的牛油果。你需要的是货架上还存在更大或更小版本的商品。",
        "对剩下的每一件商品，找到包装上印的规格：克、毫升、盎司，或者像“12卷”这样的数量。把规格写在价格旁边。",
        "把每一件的价格除以规格。这个数字就是单位价格，也是比较同一种东西两种不同规格的唯一公平方式。四舍五入到分。",
        "查一查其中三件商品另一种规格的价格，可以上网查，也可以下次去店里看，然后把它们的单位价格也算出来。",
        "做比较。找出三件商品，它们是家里买的那个规格的单位价格，比当时另一种可选规格更贵。",
        "写一份一页纸的建议：这三件商品、每种规格的单位价格、这个差价一年累计下来是多少，以及一句话说明什么时候买小规格仍然是对的选择。",
      ],
      safety:
        "这个项目牵涉到你家的钱，所以使用小票之前要先征得同意，发现的结果也只留在家里。绝对不要把小票拍照发到网上：小票上可能带有银行卡的后几位、商店会员账号，以及你家在何时何地购物的记录。",
      challenge:
        "验证一下是不是买大的总是更便宜。通常确实如此，而这正是商店知道顾客会想当然的原因。在你家厨房里找出一件大规格反而比小规格单位价格更贵的商品。然后算一算，大规格的东西你家在它变质之前实际能吃掉多少，因为没人吃的食物就算单位价格再低，也根本算不上省钱。",
      recordSheet: {
        title: "单位价格计算表",
        intro:
          "每件商品填一行。用价格除以规格来填最后一列，四舍五入到分。",
        columns: ["商品", "价格", "规格 (克 / 毫升 / 数量)", "单位价格"],
        rows: 12,
        footnote:
          "只比较同类的东西：麦片的每克价格要和麦片的每克价格比，绝不能和牛奶的每克价格比。",
      },
    },
    {
      slug: "measure-the-school",
      title: "不碰学校也能量出它有多高",
      category: "数学",
      categoryKey: "math",
      difficulty: "困难",
      time: "90分钟",
      image: "/images/projects/Measure the School Without Touching it.jpg",
      description:
        "用一道影子、一根米尺和相似三角形算出一栋楼的高度。然后用纸做的测角仪再量一遍，看看两个答案对不对得上。",
      introduction: [
        "你没法带着卷尺爬上一栋教学楼。其实也不需要。两千年前，人们就已经站在地面上算出了金字塔的高度，用的不过是一根棍子和太阳。",
        "你要用两种完全不同的方法各做一遍。有意思的地方不在于其中任何一个答案本身，而在于这两个答案对不对得上。",
      ],
      why:
        "影子法之所以成立，是因为太阳离得太远，射来的光线基本上是平行的，所以在同一时刻，你和那栋楼投下的影子角度是一样的。这就造出了两个形状相同、大小不同的三角形，这正是相似的含义，而在相似三角形里，高与影长之比是完全相同的。测角仪法用的则是一个毫不相干的概念：角的正切。当两种毫无关联的方法算出几乎相同的数字，这份一致本身就是你的证据。当它们对不上时，说明你的某一次测量出了错，而找出是哪一次，才是真正的本事。",
      materials: [
        "一个晴天，最好是上午或下午过半的时候，那时影子又长又清晰",
        "一根米尺或一把卷尺",
        "一位帮忙扶着和做标记的朋友或大人",
        "粉笔或小石子，用来标出影子的末端",
        "一把量角器、一根吸管、一段线和一个小重物（比如垫圈），用来做测角仪",
        "一个带 tan 键的计算器，用于第二种方法",
      ],
      steps: [
        "挑一栋你能走到墙根、并且影子落在平整开阔地面上的楼。立在斜坡上的墙会同时毁掉这两种方法。",
        "在阳光下笔直站好，让别人标出你影子顶端落在哪里。量出你的影长，再穿着鞋量出你自己的身高。把这两个数字连同时间一起记下来。",
        "在接下来的几分钟之内，从墙根量到影子的尖端，得到楼的影长。影子会移动，所以如果已经过去了十分钟以上，就把你自己的影子重新量一次。",
        "算出第一个答案：楼高等于你的身高乘以楼的影长，再除以你的影长。把结果连同单位一起写下来。",
        "现在做测角仪。把吸管沿着量角器的直边贴好，把线系在圆心处，再挂上重物，让它能自由摆动。",
        "从墙根往后退一段量好的距离，透过吸管瞄准楼的最高处，让帮手读出线所停留的角度。用90减去这个读数，就得到看向楼顶的仰角。",
        "算出第二个答案：高度等于你到楼的距离乘以这个角的正切，再加上你眼睛离地的高度。把它和影子法的答案作比较，并把两者的差写成较大那个数字的百分比。",
      ],
      safety:
        "待在人行道上，或者你被允许进入的场地里，测量不属于自己的建筑之前要先征得许可。绝对不要直视太阳，透过吸管也不行。步测距离时要留意车辆，如果测量的地面靠近马路，就要由大人陪着一起走。",
      challenge:
        "设法让两个答案的差距落在百分之五以内。如果差得更多，不要去取平均值，而要去找原因：地面有坡度、影子隔了太多分钟才量、忘了加上眼睛的高度，或者屋顶比墙面往外伸出了一截。之后再把整套方法用在一个你能查到真实高度的东西上，比如3.05米的篮球框，看看你的做法到底有多准。",
      recordSheet: {
        title: "两种方法，同一栋楼",
        intro:
          "在比较之前，先把两半都填完。在每一个数字旁边都写上单位，能抓出绝大多数错误。",
        columns: ["测量项", "数值", "单位", "测量时间"],
        rows: 10,
        footnote:
          "要填的行：你的身高、你的影长、楼的影长、影子法的答案、你到墙根的距离、你读到的角度、你眼睛的高度、正切法的答案、两者之差，以及这个差的百分比。",
      },
    },
    {
      slug: "predict-then-launch",
      title: "先预测，再发射",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "中等",
      time: "2小时",
      image: "/images/projects/Predict Then Launch.jpeg",
      description:
        "用本站的投石机实验室弄清角度和弹丸重量如何改变一次投射，把你的预测写下来，然后动手做一台真的投石机，找出模拟器没能告诉你的事。",
      introduction: [
        "模拟器每次被问到都会给出同一个答案。这正是它有用的地方，也正是一台用冰棒棍和橡皮筋做成的真投石机永远做不到的事。",
        "所以两样你都要用。先用游戏页面上的投石机实验室，在那里你可以把角度设定到精确的度数。然后在地板上用真的那一台，在那里你做不到。",
      ],
      why:
        "在模拟器里，角度和力度是你自己选的数字。在真的投石机上，它们是你这一次恰好把手臂拉到多远、又恰好怎么松手的结果，而这两者都不会有两次完全一样。这就是为什么测试一台真实的机器需要反复试验并取平均值，而一次模拟只需要跑一遍。找出模型从哪里开始与真实世界对不上，并不是在批评这个模型，而恰恰是工程师两样都要做的原因。",
      materials: [
        "一台电脑或平板，用来打开本站游戏页面上的投石机实验室",
        "大约15根冰棒棍或压舌板",
        "橡皮筋",
        "一个塑料瓶盖，用作投射兜",
        "胶带，以及固体胶或在大人帮助下使用的热熔胶",
        "一把卷尺或一把长尺",
        "三样重量明显不同的可投射物：一个棉球、一团纸、一块小橡皮",
        "美纹纸胶带，用来标出发射线",
      ],
      steps: [
        "打开游戏页面上的投石机实验室，先随便打十发，熟悉一下两个控制项：以度为单位的角度，和以米每秒为单位的力度。",
        "把力度固定住，只改变角度。找出能把弹丸送得最远的那个角度，然后看看远高于它和远低于它时会发生什么。",
        "现在把角度固定住，在 Standard、Light 和 Heavy 之间切换弹丸。记下哪一种飞得最远，哪一种落得最近。",
        "在动手做任何东西之前先写下两条预测：在真的投石机上哪个角度效果最好，以及你的三样真实物品里哪一样会飞得最远。每条都写一句理由。",
        "开始做投石机：一摞冰棒棍作底座，一根冰棒棍作投射臂并用橡皮筋固定在支点上，瓶盖用胶带粘上去当投射兜。把底座粘在地板上，别让它滑动。",
        "标出一条发射线，每一次都把臂拉到同一个标记处。三样物品各发射五次，每一次落点都要测量。",
        "算出每样物品五次距离的平均值，再和你的预测对比。然后看看同一样物品的这五个数字分散得有多开。这个分散程度，正是模拟器从来没给你看过的东西。",
      ],
      safety:
        "只发射柔软轻巧的东西：棉球、纸团、橡皮。绝对不要发射任何坚硬、尖锐或沉重的物体，也绝对不要瞄准人、动物、窗户或屏幕。发射时所有人都要待在投石机后方。使用热熔胶和切割冰棒棍时要请大人帮忙。",
      challenge:
        "让你的真投石机变得可重复。五次射击之间的分散，来自它们之间有什么东西在变，所以去把它揪出来：每次停在不同位置的拉伸、会歪掉的投射兜、慢慢往前挪的底座。一次只修一样，然后重新测量分散程度。让五发都落在一起，比让一发落得很远要难得多，也有用得多。",
      recordSheet: {
        title: "模拟对阵现实",
        intro:
          "每样物品实打五发，因为对于一台这么不稳定的机器，一发什么都说明不了。",
        columns: [
          "物品",
          "预测",
          "第1发 (厘米)",
          "第2发 (厘米)",
          "第3发 (厘米)",
          "第4发 (厘米)",
          "第5发 (厘米)",
          "平均值",
        ],
        rows: 3,
        footnote:
          "每样物品还要记下五发里最大和最小的那一个。这两者之间的差距就是你的分散程度，把它缩小就是这次的挑战。",
      },
    },
    {
      slug: "sensor-scavenger-hunt",
      title: "传感器寻宝",
      category: "人工智能",
      categoryKey: "ai",
      difficulty: "简单",
      time: "45分钟",
      image: "/images/projects/Sensor Scavenger Hunt.jpeg",
      description:
        "在你家里找出二十个藏起来的传感器，写下每一个感知什么、决定什么，然后找出那个老是判断错的，并设计一个改进方案。",
      introduction: [
        "你家里到处都是在默默留意着周围的东西。它们中的大多数都太普通了，普通到没有人把它们当成技术。",
        "四十五分钟就足够找出二十个。接下来才是更好的那一半：找出那个经常判断错的，因为失败之处，正是你能真正看清这个决定是怎么被造出来的地方。",
      ],
      why:
        "你家里每一样自动的东西都在跑同一个三步循环：它感知某件事、它决定某件事、它做某件事。输入、决策、输出。一旦你能说出这三个部分，一台遵循固定规则的机器和一台识别已学会的模式的机器之间的差别，就不再神秘了。失败最有价值，因为一个从不出错的传感器什么也不会告诉你，而一个在有人一动不动坐着时把灯关掉的传感器，恰恰会告诉你它真正测量的到底是什么。",
      materials: [
        "纸和铅笔，或者本页的记录表",
        "一部手机相机，可选",
        "在家里四处查看的许可",
        "一位可以随时请教你拿不准的问题的大人",
      ],
      steps: [
        "先从最明显的开始找找感觉：烟雾报警器、恒温器、会自动变暗的手机屏幕、冰箱、开盖就停的洗衣机。",
        "对每一个都写下三件事：它感知什么、它决定什么、它做什么。如果三样填不满，说明你还没弄明白它。",
        "现在去找藏起来的那些。任何会自己打开、自己关闭、自己停下，或者没人碰就发生变化的东西，都在跑这个循环。",
        "凑够二十个。屋里找完了，就到车上、街上和商店里去找：自动门、天黑自动亮起的路灯、公共卫生间的水龙头。",
        "把这二十个分成两堆：遵循固定规则的，比如把一个数字和另一个数字作比较的恒温器；以及看起来在识别某种模式的，比如能找到人脸的手机。",
        "找出一次失败。有人还在里面时就熄灭的卫生间灯、无视小孩子的自动门、用你兄弟姐妹的脸就能解锁的手机。写下那个传感器真正在测量的到底是什么，那几乎从来都不是你以为的东西。",
        "发明一个你家应该有却没有的传感器。把它画出来，并把循环的三个部分都填上。然后写一句话说明它可能怎样出错，因为你找到的那二十个，每一个都会出错。",
      ],
      safety:
        "只看，不要打开。这个项目是要注意到传感器，而不是把它们拆开，所以烟雾报警器、恒温器和任何插在墙上的东西都要原样不动。绝对不要为了够到什么而往上爬。碰任何电器之前都要先问过大人，如果要到户外去找最后几个，也要有大人陪同。",
      challenge:
        "给你找到的那次失败计时。一盏会在有人静坐时熄灭的感应灯，内部设有一个等待时间，而这个时间你是可以量出来的：完全不动地坐着，数着秒直到灯灭，分三次做，然后取平均。你刚刚测出的，是某个人当初做出的一个决定，而现在你有资格评判他们是不是把它设得太短了。",
      recordSheet: {
        title: "传感器记录表",
        intro:
          "每个传感器填一行，一共二十行。如果中间那三列填不满，说明你还没弄明白那个传感器。",
        columns: ["编号", "它是什么", "它感知什么", "它决定什么", "它做什么", "规则还是模式？"],
        rows: 20,
        footnote:
          "把你真正亲眼见过它出错的那些行圈起来。最后两个步骤，你要回到的就是这些行。",
      },
    },
    {
      slug: "sunset-in-a-jar",
      title: "罐子里的日落",
      category: "光与光学",
      categoryKey: "optics",
      difficulty: "简单",
      time: "45分钟",
      image: "/images/projects/Sunset in a Jar.jpg",
      description:
        "用手电筒照射一罐掺了牛奶的水，从侧面看它是蓝色的，从末端看它是橙色的，原因和天空与日落完全相同。",
      introduction: [
        "天空不是因为倒映海洋才变蓝的，日落也不是因为太阳换了颜色才变橙的。它们是同一个效应，只是观看的角度不同。",
        "你可以用一个手电筒和几滴牛奶，把这个效应装进厨房桌上的一个罐子里，并在同一分钟内从两个角度分别看一遍。",
      ],
      why:
        "白光是所有颜色同时存在。当它遇到远小于自身波长的东西时，波长短的蓝光被撞向侧面的程度远远超过波长长的红光，大约是十六倍，而被撞向侧面的这些光，正是你从罐子侧面看到的。剩下能从另一端射出来的光已经被抽走了蓝色，所以看上去温暖发橙。在天空中，负责散射的是空气分子；日落比正午更红，是因为那时的光要穿过厚得多的空气才能到达你的眼睛。",
      materials: [
        "一个细高的透明罐子，或者一个直筒的透明塑料瓶",
        "水",
        "牛奶，一开始只用几滴",
        "一支明亮的白光手电筒，或者手机的手电筒",
        "一个滴管或一把小勺",
        "一张白纸，用作屏幕",
        "一个暗房间",
      ],
      steps: [
        "把罐子装满水，关灯。从一端用手电筒照进去，然后从侧面看这束光。在清水里你几乎看不见它，因为里面几乎没有东西可以散射光。",
        "加入两三滴牛奶并搅匀。再从侧面看。现在这束光应该看得见了，而且带着淡淡的蓝色。",
        "现在把手电筒放在另一端，顺着罐子的长度方向往里看。不要看手电筒本身，要看已经穿过水的那束光。它应该比射入时更偏暖色。",
        "再加一滴，把两个视角都重新看一遍。记下每种颜色随之发生了什么变化。",
        "继续一滴一滴地加牛奶，直到侧面看到的光束由蓝变白。记下一共用了多少滴。",
        "把白纸举在另一端，看光在纸上留下的那块光斑。把两滴时的光斑和八滴时的同一块光斑作比较。",
        "用一句话解释：太阳本身完全没有变化，为什么正午和日落的颜色却不一样。",
      ],
      safety:
        "不要直视手电筒，这个项目也绝对不要使用激光。使用你被允许使用的罐子，洒出来的水要及时擦干净以免有人滑倒，做完之后把带牛奶的水倒进下水道。",
      challenge:
        "牛奶是一种取巧，而且是很有用的取巧。它的脂肪微粒比空气分子大得多，所以你的罐子是在模仿天空而不是复制天空，这也是你看到的蓝色偏淡而不够鲜艳的原因。试着更接近一点：在更多的水里用更少的牛奶，或者改用一小撮奶精粉、一滴洗洁精。哪一种能在浑浊度最低的情况下给出最蓝的侧面光束？",
      recordSheet: {
        title: "一滴一滴地记",
        intro:
          "每一种牛奶用量填一行。在加下一滴之前，先从侧面看一次，再从末端看一次。",
        columns: ["牛奶滴数", "侧面看到的颜色", "从末端透出的颜色", "备注"],
        rows: 8,
        footnote:
          "侧面视角从蓝色变成白色的那一行，就是最有意思的一行。写下你认为发生了什么变化。",
      },
    },
    {
      slug: "shoebox-camera-obscura",
      title: "鞋盒暗箱",
      category: "光与光学",
      categoryKey: "optics",
      difficulty: "中等",
      time: "1小时",
      image: "/images/projects/Shoebox Camera Obscura.jpg",
      description:
        "把一个鞋盒变成一台真的相机，只有一个针孔，没有镜头，然后弄清为什么孔越小画面越清晰、也越暗。",
      introduction: [
        "在有镜头之前、在有胶片之前，先有的是一间墙上开着小孔的暗室。落在对面墙上的那幅画面是倒过来的、彩色的，而且是完完全全真实的。",
        "一个鞋盒就是一间暗室。你需要一个孔、一张描图纸，以及大约一个小时。",
      ],
      why:
        "光沿直线传播。外面一棵被照亮的树上的某一个点，正朝四面八方射出光线，但只有对准你那个小孔的那些能穿过去，而它们会继续沿直线前进，落在盒子内部的某一个点上。从树顶发出的光线落在画面的下方，从树根发出的落在上方，这就是画面倒过来的原因。你眼球后方接收到的也正是这样一幅画面，只不过你的大脑悄悄替你翻了过来。",
      materials: [
        "一个带盖的鞋盒，或任何能封成不透光的盒子",
        "铝箔纸",
        "描图纸、烘焙纸或薄白纸",
        "一根大头针或缝衣针",
        "黑色胶带，以及给内壁用的黑色颜料或黑纸",
        "剪刀和一把尺子",
        "一块深色的布或毛巾，用来罩住头",
      ],
      steps: [
        "在盒子一端的正中间开一个约3厘米见方的孔，在另一端开一个更大的观察窗。",
        "把描图纸绷紧贴在观察窗上。这就是你的屏幕，必须平整，不能松垮。",
        "把盒子内壁涂黑或用黑纸糊上。里面每一缕乱跑的光，都会把画面冲淡。",
        "在3厘米的孔上贴一块铝箔，然后用大头针从铝箔正中间直着扎过去，做出一个干净的针孔。不要来回转动它。",
        "用黑胶带把每一条缝和每一个角都封好，然后把盒子拿到明亮的窗边，或在晴天拿到室外。",
        "把布罩在你的头和观察端上，让针孔对着明亮的东西，同时盯着描图纸看。在断定它不管用之前，先给眼睛整整一分钟去适应。",
        "再做一块孔明显更大的铝箔，和第三块孔更小的。依次换上去，每次都记下清晰度和亮度发生了什么变化。",
      ],
      safety:
        "绝对不要把盒子对准太阳，也绝对不要透过它朝太阳看，哪怕隔着描图纸也不行。使用剪刀和切割盒子时要请大人帮忙。如果要在盒子内部喷漆，必须在户外并有大人陪同。",
      challenge:
        "找出最好的那个孔。孔越小画面越清晰，但只在一定范围内成立：小于大约半毫米之后，画面又会开始变糊，因为光穿过非常小的开口时会散开，而不再笔直前进。这种散开叫做衍射，和双缝项目里在墙上留下条纹的是同一个效应。找出你的盒子最清晰时的孔径，并记下在这个尺寸两侧分别发生了什么。",
      recordSheet: {
        title: "针孔对比",
        intro:
          "每个孔填一行。清晰度和亮度都按1到5打分，并且始终对着同一扇窗、同一个景物。",
        columns: ["孔", "大致多宽", "清晰度 1-5", "亮度 1-5", "你能辨认出什么"],
        rows: 5,
        footnote:
          "每一行都要保持景物和光线相同。如果在两行之间太阳躲进了云里，亮度这一列就失去意义了。",
      },
    },
    {
      slug: "light-pipe-water-stream",
      title: "让光拐弯的水流",
      category: "光与光学",
      categoryKey: "optics",
      difficulty: "中等",
      time: "1小时",
      image: "/images/projects/Bending Light Down a Stream of Water.jpg",
      description:
        "把一束光送进一道落下的水流里，看着它顺着弧线一起弯下去，而这正是互联网穿越大洋海底所用的同一个把戏。",
      introduction: [
        "光沿直线传播。这是暗箱成立的全部基础，而且它是对的。那么信号是怎么沿着盘在大西洋底下、细如发丝的玻璃纤维走过去的呢？",
        "答案是：光可以被困住。当你亲眼看见它发生在一道从瓶子里流出来的水流中之后，海底的那根电缆就不再神秘了。",
      ],
      why:
        "当已经在水里的光以足够平缓的角度抵达水面时，它出不去。它会完整地反射回水中，每一次都是如此，这就是全内反射这个名字的由来。对水来说，这个临界值大约是49度；以比它更平缓的角度打在水面上，光就会留在里面。在一道弯曲的水流中，光不断以超过临界值的角度碰到边界，于是不断反弹，一路跟着弧线往下走。光纤，就是把这同一个把戏用玻璃做成了永久的。",
      materials: [
        "一个撕掉标签的直筒透明塑料瓶",
        "一根钉子或一支5毫米钻头，以及一位负责打孔的大人",
        "一支红色激光笔，2类或更低，只能由大人操作",
        "一个水槽、盆或水桶，用来接水",
        "胶带",
        "一个暗房间",
      ],
      steps: [
        "由大人在瓶子侧面靠近底部的位置打一个干净的孔，直径约5毫米。对于薄塑料，烧热的钉子比钻头更好用。",
        "用手指或一块胶带堵住孔，把瓶子装满水，放在水槽边缘，让水流呈弧线落进盆里。",
        "关灯。大人把激光笔平贴在瓶子侧面、正对孔的另一边，笔直地对着孔射过去，让光束穿过水从孔里出来。",
        "放开水流。看水落下的地方，而不是看瓶子：你应该能看到一个亮点顺着下落的水流一路往下，并把水打到的那个位置照亮。",
        "微调瞄准方向，让光尽可能长地留在水流里。调对的时候，整条弧线会微微发亮，落点会很明亮。",
        "现在故意把它破坏掉。把一根手指伸进水流的中段，看着光就停在那里。只有当水面保持光滑、没有断裂时，这种反弹才成立。",
        "抬高或放低瓶子来改变弧线，让水流落得更陡或更缓。记下哪一种形状能让光在泄漏出去之前走得最远。",
      ],
      safety:
        "激光是这里唯一真正危险的东西。必须由大人全程握着，绝不离手。使用红色、2类或更低的激光笔，绝不要用绿色的，也绝不要用任何标称大功率的。绝不要对着任何人的眼睛、宠物、镜子、窗户或明亮的水龙头照射，因为反射可能会射进一只谁也没瞄准的眼睛。把光束保持在视线高度以下，并朝下对着水槽。瓶子上的孔由大人来打。把水擦干，免得有人滑倒。",
      challenge:
        "找出极限。水流一旦碎成分离的水滴，光就会跑掉，所以任何能让水流保持光滑更久的做法，都应该让光走得更远。试试更小的孔、装得更满的瓶子（水压更大），以及把孔的边缘修得更平整。然后回答这个问题：真正的光纤是实心玻璃、不会碎成水滴，那么它为什么从来不会遇到这个问题？",
      recordSheet: {
        title: "光走了多远",
        intro:
          "每次尝试填一行。从孔量到光明显离开水流的那个位置。",
        columns: ["尝试", "你改变了什么", "水流形状", "光留在里面的距离 (厘米)"],
        rows: 6,
        footnote:
          "如果看不出光是在哪里离开的，就去找水流从一条光滑的绳子变成一颗颗散开水滴的位置。那几乎总是同一个地方。",
      },
    },
    {
      slug: "cd-spectroscope",
      title: "用一张CD做一台分光镜",
      category: "光与光学",
      categoryKey: "optics",
      difficulty: "中等",
      time: "1小时",
      image: "/images/projects/Build a Spectroscope from a CD.jpg",
      description:
        "用一个麦片盒和一张废CD做出一台真正的分光镜，然后找出哪些灯给你的是平滑的彩虹，哪些给你的只是几条分开的亮线。",
      introduction: [
        "彩虹看上去是连续的：每一种颜色都过渡到下一种，中间什么也不缺。太阳光确实是这样的。你家里的绝大多数灯却不是，而光凭肉眼看灯，你根本分辨不出来。",
        "CD上的沟槽排得比光的波长还密，这让这张碟成为一块衍射光栅，也就成了一台真正科学仪器的工作部件。仪器剩下的部分，是一个麦片盒。",
      ],
      why:
        "炽热的固体会同时发出所有颜色的光，因为它的原子挤在一起互相推挤，这就是太阳或老式钨丝灯泡给出的那道平滑彩虹。而稀薄的发光气体做的是完全不同的事：只有几条锐利而分开的颜色，中间什么都没有。这是因为原子内部的电子不能待在任意位置上。它只能占据某些固定的能级，就像一架梯子上没有中间空隙的横档，而当它从一档落到另一档时，就会放出一个光子，这个光子的颜色恰好由那个落差的大小决定。这些分开的亮线，就是这条规则被看见的样子，也正是当年迫使物理学家发明量子力学的证据之一。",
      materials: [
        "一个空麦片盒，或类似的纸盒",
        "一张你被允许毁掉的旧CD或DVD，DVD效果更好",
        "一把美工刀或剪刀，需要大人帮忙",
        "黑胶带和黑纸",
        "两片边缘平直的卡纸，用来做狭缝",
        "一把尺子和一支铅笔",
      ],
      steps: [
        "用胶带把麦片盒顶部封死，不让光进去，条件允许的话在内壁糊上黑纸。",
        "在盒子一端做一条细缝，大约1毫米宽、3厘米高。用两片卡纸的直边隔开一毫米贴好，会比用刀划出来的缝干净得多。",
        "在大人协助下，从碟片上切下一块楔形。如果是DVD，先把两层掰开，留下仍带有彩虹光泽的那一层。",
        "在盒子另一端靠下的位置，开一个约2厘米的观察孔。",
        "把碟片块贴在盒内观察孔的下方，倾斜大约60度，使得你从孔里看进去时，看到的是碟片表面，并在其中看到狭缝的反射。",
        "把狭缝对准一面被日光照亮的白墙，从观察孔往里看。调整倾角，直到侧边出现一条彩色带，然后把碟片固定住。",
        "现在依次观察四种光源，但绝不能是太阳本身：照在墙上的日光、老式钨丝灯或卤素灯、荧光灯管或节能灯，以及白光LED。把每一种看到的样子都画下来。",
      ],
      safety:
        "绝不要把分光镜对准太阳，也绝不要透过它朝太阳看。改用照在白墙或云上的日光。切割盒子要请大人帮忙，切割碟片更要如此，因为CD塑料可能崩裂成锋利的碎片。如果有护目镜，切碟片时请戴上。",
      challenge:
        "找出那些亮线，并弄清是什么产生了它们。荧光灯管会显示出几条亮线，是因为管子里有汞蒸气，而那道很强的绿线和那一对黄线，来自汞原子中特定能级之间的跃迁。白光LED又完全不同：一个蓝色尖峰加上一片宽阔的黄色隆起，因为它是一颗蓝色芯片外面覆了一层涂层，把一部分蓝光转换成了其他颜色。把这两种都仔细画下来，然后如果能找到霓虹灯招牌，去看看它其实只包含多么少的几种颜色。",
      recordSheet: {
        title: "光谱速写",
        intro:
          "每一种光源填一行。把你看到的画下来，而不是用文字描述，并注明这些颜色是彼此融合的还是各自分开的。",
        columns: ["光源", "连续还是分开的亮线？", "你能分辨出的颜色", "有没有缺失的部分？"],
        rows: 6,
        footnote:
          "最后一列最有价值。本该有颜色的地方出现空缺，说明那种颜色压根就没有被发射出来，而这和一条亮线一样是信息。",
      },
    },
    {
      slug: "uv-glow-lab",
      title: "发光的规则",
      category: "光与光学",
      categoryKey: "optics",
      difficulty: "简单",
      time: "45分钟",
      image: "/images/projects/The Glow Rule.jpeg",
      description:
        "用紫外手电筒去搜寻会发光的东西，然后找出它们无一例外都遵守的那条规则：射出来的光，能量总是比射进去的光更低。",
      introduction: [
        "有些再普通不过的东西藏着一种颜色。汤力水、荧光笔的墨水、洗衣粉、某些白袜子，还有钞票上的安全线，在紫外光照上去之前都平平无奇。",
        "把它们找出来，能开心大约十分钟。真正值得留下的是底下那条规则，而它竟然是一条没有例外的规则。",
      ],
      why:
        "紫外光由携带着比你眼睛能看到的任何颜色都更多能量的光子组成。当其中一个被合适的分子吸收时，它会把一个电子抬升到更高的能级。这个电子先以热的形式放掉一小部分能量，然后落回原处，并发出一个属于自己的光子。因为途中损失了一些能量，发出的这个光子携带的能量总是少于被吸收的那个，而能量更少意味着波长更长，也就意味着颜色更红。这就是为什么进去的是紫外、出来的是蓝色，也是为什么你永远找不到一种东西吸收红色却吐出蓝色。这个向下的台阶甚至有个名字：斯托克斯位移。",
      materials: [
        "一支紫外手电筒，395纳米是常见且最安全的廉价款",
        "汤力水，其中含有奎宁",
        "荧光笔，尤其是黄色和绿色的",
        "洗衣液或洗衣粉",
        "夜光星星或夜光贴纸",
        "白纸和几张彩色纸",
        "一个暗房间",
      ],
      steps: [
        "关掉灯，让眼睛适应几分钟。然后用紫外手电筒慢慢扫过整个房间，把所有亮起来的东西都记下来。",
        "把汤力水倒进一个透明玻璃杯，从侧面照进去。再拿一个一模一样的杯子装白水作对照，好确认发光的不是杯子。",
        "用黄色荧光笔在白纸上用力涂一片，放到手电筒下。记下射出来的颜色，而不是墨水在日光下看起来的颜色。",
        "在深色纸上撒一点洗衣粉再照亮。洗衣粉里是特意加了增白剂的，好让衣服反射出额外的蓝光，看起来比白还白。",
        "把手电筒自身的颜色，和你找到的每样东西射出来的颜色并排记下来，然后比较这两列，看看有没有什么打破了这个规律。",
        "测试夜光星星。用手电筒给它们充能十秒，然后把手电筒关掉。和你清单上其他所有东西都不一样，这些还会继续亮。",
        "给星星保持可见的时间计时。然后充能整整一分钟，再计一次时，把两个数字都写下来。",
      ],
      safety:
        "绝不要往紫外手电筒里看，绝不要照向任何人或宠物的眼睛，也不要长时间贴着皮肤照。要买395纳米的手电筒，它只比紫光稍微再往外一点。彻底避开254纳米的杀菌型，因为那一种确实会损伤眼睛和皮肤。使用钞票或身份证件之前要先征得同意，用完立刻放回去。",
      challenge:
        "去寻找例外，然后找不到。你清单上的每一样东西，都是吸收了一个高能光子、交回一个低能光子，所以颜色总是朝红色偏移。专门去找一个反着来的东西。当你找不到时，你收获的就不再是一张会发光的物品清单，而是一条规则，而物理学正是由规则构成的。之后再想一想：为什么在手电筒关掉的一瞬间其他所有东西都熄灭了，夜光星星却能继续发光好几分钟？",
      recordSheet: {
        title: "发光记录",
        intro:
          "每找到一样东西填一行。两列颜色才是整张表的重点，填满之后要把它们对照着看。",
        columns: ["物品", "正常光下的颜色", "射进去的颜色", "射出来的颜色", "关灯后还在发光吗？"],
        rows: 10,
        footnote:
          "表格填满后，逐行检查：射出来的光有没有哪一次带着比射进去的光更多的能量，也就是更偏蓝？把你的答案写在表格下面。",
      },
    },
    {
      slug: "double-slit-at-home",
      title: "卧室墙上的双缝实验",
      category: "光与光学",
      categoryKey: "optics",
      difficulty: "困难",
      time: "2小时",
      image: "",
      description:
        "在黑纸上割出两道缝，让激光穿过去，得到那个曾让物理学家认定光是波的条纹图案。然后用这些条纹，量出一个尺子根本放不上去的间距。",
      introduction: [
        "两道缝、一束激光、一面墙。如果光只是一串小小的子弹，你会预期看到两道亮条纹，每道缝后面各一道。但你得到的不是两道，而是一整排，间隔均匀，中间夹着黑暗的空隙。",
        "这是物理学中被重复得最多的实验，而你卧室墙上的这个版本就是同一个实验。难的地方不在物理，而在于把两道缝割得足够近。",
      ],
      why:
        "从两道缝出发的波，在到达墙上每一点时所走过的距离略有不同。当这个差值恰好是波长的整数倍时，两列波对齐并相加，形成一道亮条纹；当它是半个波长时，两者相消，留下黑暗。这就是干涉，而只有波才会这样。条纹的间距，通过一个简单的关系式与光的波长和两缝的间距联系在一起，这意味着你可以反过来用它：测量相隔几毫米的条纹，算出一个根本无法直接测量的缝间距。",
      materials: [
        "一支红色激光笔，2类或更低，只能由大人操作",
        "黑色美术纸，或任何光透不过去的薄黑色卡纸",
        "一把美工刀或一片全新的剃须刀片，需要大人协助",
        "一块挖了窗口的硬卡纸",
        "一把带毫米刻度的尺子，和一把卷尺",
        "一个有素色浅墙的暗房间，最好有3米以上的空旷距离",
        "一个计算器",
        "胶带",
      ],
      steps: [
        "把黑纸平整绷紧地贴在卡纸的窗口上并用胶带固定。先把它举到灯前看一看：如果光能透过纸本身，条纹就会被冲淡，你需要换更不透光的材料。",
        "在大人协助下，在黑纸上割出两道笔直平行的缝，长约1厘米。把刀片靠着尺子，一次拉过去。两道缝要尽可能靠近，远小于一毫米。",
        "把卡纸架好，让激光同时穿过两道缝，并继续射到至少3米外的墙上。所有东西都用胶带固定，因为卡纸一旦移动，测量就作废了。",
        "把房间弄暗。由大人把激光对准两道缝射过去。调整到你看见的是一排点或条纹，而不是一团光斑。只看到一团，说明要么两缝相距太远，要么光束只穿过了其中一道。",
        "以米为单位量出黑纸到墙的距离并记下来。把它叫做 L。",
        "在墙上，一次性量过尽可能多的条纹，从第一条中心量到最后一条中心，然后除以你数到的间隔数。这个平均值就是你的条纹间距 y。一次量好几条，正是让结果准确的关键。",
        "计算两缝间距：d 等于波长乘以 L，再除以 y。红色激光笔大约是650纳米，也就是0.000000650米。你的答案应该落在零点几毫米的量级上。",
      ],
      safety:
        "激光是这里真正严重的危险，整个项目必须由大人握着它。使用1毫瓦或更低的2类红色激光笔，绝不要用绿色的，也绝不要用任何标称大功率的。绝不要看向光束，也绝不要把它对着人、宠物、窗户、镜子、屏幕或任何光亮的金属，因为一次意外反射就可能射进一只谁也没瞄准的眼睛。把光束保持在视线高度以下，对着一面不反光的墙。缝要割在不反光的黑纸上而不是铝箔上，也是同一个道理：铝箔会把光束反射回房间里。割缝需要大人监督并使用切割垫，而新刀片比钝刀片切得更干净、也更不容易打滑。",
      challenge:
        "再割一块卡纸，故意把两缝割得更近，并在测量之前先预测：墙上的条纹会分得更开，还是挤得更近？然后去验证。把这个关系的方向判断对，并且能说出为什么，比那个数值本身更有价值。之后再想一想这个实验没有告诉你的事：你的激光一次射出的是数以万亿计的光子，所以你墙上看到的确确实实是波的干涉。而在实验室里，同样的图案是一个光子一个光子地累积起来的，在几个小时里以一个个孤立的点的形式到达，那个结果比你的要奇怪得多。",
      video: {
        videoId: "2rWDzLwfX64",
        title: "Double Slit Experiment AT HOME",
        startSeconds: 10,
        caption:
          "同一套装置的家庭版演示。在动手割缝之前值得先看一遍，好知道墙上真正成功的图案应该是什么样子。视频为英文。",
      },
      recordSheet: {
        title: "条纹测量",
        intro:
          "在不动任何东西的前提下，把同一个图案测量三次。如果三个答案对不上，问题出在测量上，而不是物理上。",
        columns: ["次数", "到墙的距离 L (米)", "一次量了几条", "总宽度 (毫米)", "条纹间距 y (毫米)", "算出的 d (毫米)"],
        rows: 3,
        footnote:
          "d 等于 0.000000650 乘以 L，再除以 y，而 y 要先换算成米。在毫米和米之间差了一千倍，是几乎每个人都会犯的错误。",
      },
    },
  ],
  pt: [
    {
      slug: "popsicle-stick-bridge",
      title: "Ponte de Palitos de Picolé",
      category: "Engenharia",
      categoryKey: "engineering",
      difficulty: "Fácil",
      time: "1 a 2 horas",
      image: "/images/home/featured-bridge.jpg",
      description:
        "Construa uma ponte treliçada com palitos de picolé e veja como os triângulos conduzem a compressão e a tração durante o seu teste de carga.",
      introduction: [
        "Engenheiros de pontes não colam peças a esmo. Eles projetam estruturas que conduzem as forças por um padrão inteligente de formas firmes.",
        "Este projeto é empolgante porque seus palitos de picolé viram uma ponte de verdade, com partes, caminhos de força e um teste de carga no final.",
      ],
      why:
        "Uma ponte treliçada distribui a força pelos triângulos. O banzo superior costuma ficar comprimido, o banzo inferior costuma ficar sob tração e as peças diagonais ajudam a levar a carga por toda a estrutura.",
      materials: [
        "60 palitos de picolé ou mais",
        "Pistola de cola quente e bastões de cola",
        "Uma régua",
        "Um marcador ou caneta",
        "Tesoura ou alicate de corte resistente",
        "Dois apoios firmes para o teste, como cadeiras ou mesas",
        "Pesos para testar, como livros ou anilhas de academia",
      ],
      steps: [
        "Marque uns 16 palitos nos pontos de um quarto, para as emendas ficarem alinhadas.",
        "Corte 4 desses palitos ao meio e use-os para emendar palitos inteiros em 2 trilhos longos.",
        "Monte a primeira treliça lateral com 4 triângulos e depois acrescente mais 3 triângulos alternados entre eles.",
        "Vire a treliça, cole o trilho superior e reforce os triângulos com outra camada de palitos.",
        "Repita o mesmo padrão para fazer uma segunda treliça lateral igual.",
        "Deixe as duas laterais endurecerem e depois ligue-as com peças transversais, mantendo a ponte em esquadro.",
        "Acrescente escoras diagonais, deixe a cola firmar e teste a ponte devagar entre dois apoios.",
      ],
      safety:
        "Peça ajuda de um adulto com a pistola de cola quente e na hora de cortar os palitos. A cola recém-saída e o bico ficam bem quentes, e o teste deve ser feito devagar, para que os pesos ou os pés não escorreguem.",
      challenge:
        "Tente manter o mesmo padrão de treliça usando menos palitos e depois compare quanto peso a ponte mais leve consegue sustentar.",
    },
    {
      slug: "lego-robot-builder",
      title: "Robô LEGO com Garra",
      category: "Robótica",
      categoryKey: "robotics",
      difficulty: "Médio",
      time: "2 a 3 horas",
      image: "/images/shared/lego-robotics.jpeg",
      description:
        "Construa um robô com garra inspirado na aula Super Cleanup da LEGO Education e teste como ele recolhe objetos diferentes.",
      introduction: [
        "Este não é um robô qualquer. Você está construindo uma máquina de limpeza com garra inspirada em uma aula real da LEGO Education usada para ensinar raciocínio robótico.",
        "Isso deixa tudo ainda mais legal, porque você não está chutando como um robô poderia ser. Você está seguindo uma ideia testada e entendendo por que cada parte está ali.",
      ],
      why:
        "Um robô com garra combina mecânica e programação. A base precisa se manter equilibrada, o motor precisa transferir movimento para a garra e o código precisa dizer à máquina quando avançar, agarrar e soltar.",
      materials: [
        "Kit LEGO Education SPIKE Prime #45678 ou um kit de robótica LEGO parecido",
        "Hub SPIKE Prime",
        "1 motor angular grande",
        "1 sensor de força",
        "Vigas Technic, pinos, eixos e rodas",
        "Objetos pequenos para testar, como papel amassado, uma maçã ou bolinha e um bloco",
      ],
      steps: [
        "Abra a aula oficial Super Cleanup e os manuais de montagem antes de começar.",
        "Organize o hub, o motor, o sensor, as rodas, as vigas, os pinos e os eixos em grupos fáceis de ver.",
        "Monte primeiro a base larga com rodas, para o robô se manter equilibrado.",
        "Acrescente a torre da frente e o suporte do braço com garra.",
        "Instale o motor, o sensor e as pinças da frente para o robô conseguir segurar objetos.",
        "Carregue uma rotina simples de limpeza que diga ao robô quando agarrar, andar e soltar.",
        "Faça testes justos com objetos diferentes e compare o que funciona melhor.",
      ],
      safety:
        "Mantenha as peças pequenas de LEGO longe de irmãos menores e de animais, porque elas podem causar engasgo. Peça ajuda de um adulto para carregar o hub, conectar os cabos e lidar com as partes ligadas à bateria.",
      challenge:
        "Compare dois formatos diferentes de garra e anote qual funciona melhor com objetos redondos, macios ou rígidos.",
    },
    {
      slug: "coke-mentos-experiment",
      title: "Experimento de Coca-Cola e Mentos",
      category: "Ciências",
      categoryKey: "science",
      difficulty: "Fácil",
      time: "30 minutos",
      image: "/images/home/coke-mentos-science-experiment-kids.jpg",
      description:
        "Lance um chafariz de refrigerante ao ar livre e descubra por que a superfície das balas faz o gás escapar tão rápido.",
      introduction: [
        "Prepare-se para uma bagunça enorme, porque este experimento pode fazer o refrigerante subir feito um chafariz-foguete.",
        "É empolgante de ver e ainda ensina uma ideia científica de verdade que quase parece mágica.",
      ],
      why:
        "O refrigerante tem gás dióxido de carbono dissolvido. Os Mentos têm muitas rugosidades minúsculas que dão ao gás vários lugares para escapar ao mesmo tempo, um processo chamado nucleação, e é por isso que o refrigerante sai tão rápido. A Coca-Cola Zero costuma funcionar melhor que a comum porque tem menos açúcar e é menos encorpada, então as bolhas sobem com mais facilidade e formam um gêiser mais alto.",
      materials: [
        "1 garrafa de dois litros de Coca-Cola Zero ou outro refrigerante",
        "1 pacote de Mentos",
        "Um espaço aberto ao ar livre",
        "Óculos de proteção",
        "Uma folha de papel ou uma ficha de cartolina",
        "Opcional: um tubo ou rolo de papel para soltar os Mentos juntos",
      ],
      steps: [
        "Vá para fora, em um lugar aberto como a garagem ou o quintal, e coloque os óculos de proteção.",
        "Ponha a garrafa de refrigerante em um chão plano, onde ela não caia.",
        "Abra a garrafa e prepare os Mentos o mais rápido que conseguir.",
        "Empilhe 5 ou 6 Mentos em um tubo de papel ou segure-os sobre a abertura com uma ficha embaixo.",
        "Puxe a ficha para que todos os Mentos caiam ao mesmo tempo.",
        "Afaste-se na hora e veja o chafariz de refrigerante subir.",
        "Conversem sobre o que aconteceu e meçam qual refrigerante ou qual quantidade de Mentos gerou o maior gêiser.",
      ],
      safety:
        "Faça este experimento só ao ar livre e afaste-se assim que os Mentos caírem. Nunca aponte a garrafa para pessoas e não beba o refrigerante depois do experimento.",
      challenge:
        "Teste dois refrigerantes diferentes e compare qual produz o chafariz mais alto.",
    },
    {
      slug: "my-first-python-program",
      title: "Meu Primeiro Programa em Python",
      category: "Programação",
      categoryKey: "coding",
      difficulty: "Fácil",
      time: "1 hora",
      image: codingThumbnailImage,
      description:
        "Escreva um jogo de perguntas simples e descubra como o código transforma suas ideias em algo interativo.",
      introduction: [
        "Programar é como dar instruções superclaras a um computador para ele fazer algo incrível por você.",
        "Este projeto é divertido porque você vai criar um programa de verdade, que faz perguntas, guarda a pontuação e responde ao jogador.",
      ],
      why:
        "Os programas seguem instruções passo a passo. O Python usa comandos como `print()` para mostrar mensagens, `input()` para receber respostas e variáveis para lembrar informações, como a pontuação.",
      materials: [
        "Um computador ou tablet com acesso à internet",
        "Um site ou aplicativo de Python, como Replit ou Trinket",
        "Papel para planejar suas perguntas",
        "Um teclado",
        "Curiosidade e paciência",
      ],
      steps: [
        "Abra um editor de Python para iniciantes online e comece um projeto novo.",
        "Escreva uma linha com `print()` para dar as boas-vindas ao jogador.",
        "Crie uma variável chamada score e deixe-a em 0 para contar os pontos.",
        "Use `input()` para fazer uma pergunta e guardar a resposta em uma variável.",
        "Acrescente um `if` para conferir se a resposta está certa.",
        "Aumente a pontuação quando o jogador acertar e mostre o novo valor com `print()`.",
        "Execute seu programa, teste e corrija os erros até funcionar direitinho.",
      ],
      safety:
        "Use apenas sites de programação confiáveis e peça permissão a um adulto antes de criar contas. Não coloque seu nome real, endereço nem senhas dentro do programa ou em conversas.",
      challenge:
        "Acrescente três perguntas em vez de uma e faça o jogo mostrar uma mensagem especial se o jogador tirar a pontuação máxima.",
    },
    {
      slug: "baking-soda-volcano",
      title: "Vulcão de Bicarbonato",
      category: "Ciências",
      categoryKey: "science",
      difficulty: "Fácil",
      time: "1 hora",
      image: "/images/projects/baking-soda-volcano/cover.jpg",
      description:
        "Construa um minivulcão e provoque uma erupção espumosa com a clássica reação entre um ácido e uma base.",
      introduction: [
        "Os vulcões estão entre as maravilhas naturais mais impressionantes da Terra, e agora você pode construir um na sua própria mesa.",
        "Este projeto é empolgante porque você mistura ingredientes, cria uma erupção e vê a química em ação.",
      ],
      why:
        "O bicarbonato é uma base e o vinagre é um ácido. Quando eles se misturam, produzem um gás novo chamado dióxido de carbono, e esse gás forma a espuma borbulhante que transborda como se fosse lava.",
      materials: [
        "Bicarbonato de sódio",
        "Vinagre",
        "Uma garrafa ou copo pequeno de plástico",
        "Massinha, argila ou papel-alumínio",
        "Detergente",
        "Corante alimentício",
        "Uma bandeja para facilitar a limpeza",
      ],
      steps: [
        "Coloque a garrafa no centro de uma bandeja, para a bagunça ficar em um lugar só.",
        "Monte o formato do vulcão em volta da garrafa com argila, massinha ou papel-alumínio, mas deixe a abertura livre.",
        "Coloque 2 ou 3 colheres de sopa de bicarbonato dentro da garrafa.",
        "Acrescente um pouco de detergente e algumas gotas de corante.",
        "Despeje o vinagre na garrafa e veja a lava espumosa subir e transbordar.",
        "Observe as bolhas de perto e conversem sobre o gás que está se formando dentro da garrafa.",
        "Enxágue a bandeja e tente de novo com quantidades diferentes, para ver como a erupção muda.",
      ],
      safety:
        "Mantenha a mistura longe dos olhos e lave as mãos depois do experimento. Peça ajuda de um adulto antes de usar corante, porque ele mancha roupa e mesa.",
      challenge:
        "Experimente mudar a quantidade de bicarbonato ou de vinagre e descubra qual receita produz a maior erupção.",
    },
    {
      slug: "simple-circuit-light",
      title: "Luz com Circuito Simples",
      category: "Engenharia",
      categoryKey: "engineering",
      difficulty: "Médio",
      time: "45 a 60 minutos",
      image: "/images/projects/simple-circuit-light/cover.jpg",
      description:
        "Monte um circuito de LED de verdade em uma protoboard, com um resistor, jumpers e um suporte de pilhas pequeno.",
      introduction: [
        "Acender uma luz parece a coisa mais comum do mundo, mas dentro daquele cliquezinho existe um caminho inteiro por onde a corrente elétrica passa.",
        "Neste projeto você vai montar um circuito de eletrônica para iniciantes em uma protoboard, que permite conectar peças sem solda.",
        "Você também vai colocar um resistor em série com o LED. O resistor é importante porque limita a corrente para o LED não queimar.",
      ],
      why:
        "A corrente sai do lado positivo da pilha, passa por um jumper, atravessa o resistor, entra pela perna comprida do LED, sai pela perna curta e volta ao lado negativo da pilha. O resistor e o LED estão em série porque a corrente passa primeiro por uma peça e depois pela outra, no mesmo laço. Se o LED estiver invertido, a corrente não passa direito e ele pode não acender.",
      materials: [
        "1 protoboard pequena, sem solda",
        "1 LED",
        "1 resistor de 220 a 330 ohms",
        "1 suporte de pilhas de baixa tensão, como 2 pilhas AA com fios vermelho e preto",
        "3 jumpers",
        "Opcional: um interruptor pequeno para um desafio extra",
      ],
      steps: [
        "Coloque a protoboard na sua frente. Encontre o trilho positivo vermelho (+), o trilho negativo azul (-) e as fileiras centrais onde as peças se conectam.",
        "Com o suporte de pilhas desligado ou desconectado, ligue o fio vermelho da pilha ao trilho + e o fio preto ao trilho -.",
        "Coloque uma ponta do resistor no trilho +. Coloque a outra ponta em uma fileira vazia da protoboard, por exemplo a fileira 10.",
        "Posicione o LED de modo que a perna mais comprida, chamada anodo, fique na mesma fileira da ponta do resistor. Coloque a perna mais curta, chamada catodo, em outra fileira.",
        "Use um jumper para ligar a fileira da perna curta do LED ao trilho -. Agora o resistor e o LED estão em um único caminho, em série.",
        "Conecte a pilha ou ligue o suporte. O LED deve acender quando a corrente sai do +, passa pelo resistor, passa pelo LED e volta ao -.",
        "Se o LED não acender, desconecte a pilha primeiro e depois inverta o LED ou confira se cada peça está na fileira certa.",
      ],
      stepImages: [
        {
          step: 6,
          src: "/images/projects/simple-circuit-light/step-6-lit-circuit.jpg",
          alt: "Passo 6: LED aceso no circuito da protoboard, com a perna comprida (anodo) e a perna curta (catodo) indicadas onde se ligam ao resistor e ao trilho negativo",
        },
      ],
      safety:
        "Use apenas pilhas pequenas, de baixa tensão, e nunca ligue seu circuito a uma tomada. Sempre coloque o resistor antes de acender o LED e desconecte a pilha antes de mexer nas peças.",
      challenge:
        "Coloque um interruptor pequeno em série com o resistor e o LED para abrir e fechar o circuito. Você também pode comparar como o LED muda com um resistor de 220 ohms e com um de 330 ohms.",
    },
    {
      slug: "elephant-toothpaste-experiment",
      title: "Experimento da Pasta de Dente de Elefante",
      category: "Ciências",
      categoryKey: "science",
      difficulty: "Médio",
      time: "30 minutos",
      image: "/images/projects/elephant-toothpaste-experiment/cover.jpg",
      description:
        "Veja uma torre enorme de espuma sair de uma garrafa quando o peróxido de hidrogênio se decompõe e libera oxigênio em uma reação exotérmica espetacular.",
      introduction: [
        "A pasta de dente de elefante tem esse nome porque a espuma que dispara é tão grande que pareceria ser de um elefante. Mas não é só uma explosão bonita: é uma reação química de verdade que você consegue controlar.",
        "Este experimento mostra como os catalisadores aceleram as reações, por que há liberação de calor quando as substâncias mudam e como o gás oxigênio transforma um líquido em uma montanha gigante de espuma bem na sua frente.",
      ],
      why:
        "O peróxido de hidrogênio se decompõe naturalmente em água e gás oxigênio, mas faz isso muito devagar sozinho. Acrescentar um catalisador, como fermento biológico misturado com água morna, dá um atalho à reação e faz tudo acontecer quase na hora. O gás oxigênio escapa tão rápido que fica preso no detergente, criando milhares de bolhas empilhadas em uma espuma grossa. A reação também é exotérmica, ou seja, libera calor, que dá para sentir ao tocar a espuma com cuidado depois que ela para.",
      materials: [
        "1/2 xícara de peróxido de hidrogênio a 6% ou 12% (encontrado em lojas de produtos de beleza)",
        "1 envelope de fermento biológico seco",
        "3 colheres de sopa de água morna",
        "Um pouco de detergente",
        "Algumas gotas de corante alimentício",
        "Uma garrafa plástica de 500 ml ou maior, ou uma proveta",
        "Uma bandeja ou assadeira para facilitar a limpeza",
        "Óculos de proteção e luvas",
      ],
      steps: [
        "Coloque os óculos de proteção e as luvas antes de manusear o peróxido de hidrogênio.",
        "Ponha a garrafa no centro da bandeja, para a espuma ficar contida.",
        "Acrescente o detergente e algumas gotas de corante direto na garrafa.",
        "Despeje o peróxido de hidrogênio na garrafa e balance de leve para misturar.",
        "Em um copo à parte, misture o envelope de fermento com a água morna por uns 30 segundos, até dissolver.",
        "Despeje rapidamente a mistura de fermento na garrafa e afaste-se em seguida.",
        "Veja a espuma disparar para cima e note o calor que ela solta quando você a toca com cuidado depois que tudo parar.",
        "Conversem sobre o que aconteceu: qual foi o catalisador, de onde veio o calor e o que havia dentro de todas aquelas bolhas.",
      ],
      safety:
        "Peça sempre a um adulto para manusear e despejar o peróxido de hidrogênio, já que ele pode irritar a pele e os olhos. Use óculos de proteção e luvas durante todo o experimento. A espuma fica morna e é segura de tocar depois que a reação para por completo, mas não deixe o líquido encostar nos olhos nem na pele durante a reação. Descarte a espuma e o líquido que sobrar pelo ralo, com bastante água.",
      challenge:
        "Teste duas concentrações diferentes de peróxido de hidrogênio: a de 3% da farmácia e a de 6% ou mais de uma loja de beleza, e compare até onde cada torre de espuma cresce.",
    },
    {
      slug: "making-oobleck",
      title: "Fazendo Oobleck",
      category: "Ciências",
      categoryKey: "science",
      difficulty: "Fácil",
      time: "20 minutos",
      image: "/images/projects/making-oobleck/cover.jpg",
      description:
        "Misture só dois ingredientes para criar uma substância misteriosa que escorre como líquido mas endurece quando você aperta, e descubra a ciência dos fluidos não newtonianos.",
      introduction: [
        "O oobleck leva o nome de uma gosma de uma história do Dr. Seuss, e é tão estranho e imprevisível quanto parece. Ele escorre entre os dedos feito água, mas na hora em que você aperta ou bate, endurece feito pedra.",
        "Esta atividade explora uma classe fascinante de materiais chamada fluidos não newtonianos, e você só precisa de dois ingredientes e alguns minutos para fazer uma tigela cheia de ciência para segurar nas próprias mãos.",
      ],
      why:
        "A maioria dos líquidos, como água e suco, escorre na mesma velocidade não importa com que força você empurre. O oobleck é diferente porque é um fluido não newtoniano, ou seja, a viscosidade dele, que é o quanto ele é grosso ou ralo, muda conforme a pressão. Quando você empurra ou bate no oobleck rapidamente, as partículas de amido de milho travam umas nas outras e ele se comporta como sólido. Quando a pressão passa, as partículas se soltam e ele volta a escorrer como líquido. Essa propriedade se chama espessamento por cisalhamento, e os engenheiros estudam materiais parecidos para coisas como coletes à prova de balas e tapa-buracos.",
      materials: [
        "2 xícaras de amido de milho",
        "1 xícara de água",
        "Algumas gotas de corante alimentício (opcional)",
        "Uma tigela grande para misturar",
        "Uma colher ou espátula",
        "Uma bandeja com bordas para conter a bagunça",
      ],
      steps: [
        "Coloque o amido de milho na tigela grande.",
        "Acrescente o corante à água, se quiser que o oobleck fique colorido.",
        "Despeje a água devagar sobre o amido, mexendo enquanto isso; não coloque tudo de uma vez.",
        "Continue misturando até o oobleck ficar sem pelotinhas secas e parecer estranho de mexer.",
        "Tente cutucar a superfície rapidamente com o dedo, depois afunde o dedo devagar e note a diferença.",
        "Pegue um punhado e aperte com força, depois abra a mão e deixe escorrer.",
        "Conversem sobre o que vocês notam: quando ele parece sólido? Quando ele escorre feito líquido?",
      ],
      safety:
        "O oobleck é feito com ingredientes seguros para o contato com a pele, mas pode sujar bastante. Evite jogá-lo pelo ralo, porque o amido pode se acumular dentro dos canos e entupir. Em vez disso, deixe o oobleck que sobrar secar por completo na bandeja e depois raspe e jogue no lixo. Lave as tigelas e as mãos com água morna e deixe qualquer resíduo secar antes de raspar.",
      challenge:
        "Experimente mudar a proporção de amido e água, acrescentando um pouco mais de cada um, e note como a textura muda. Você também pode colocar um saquinho com oobleck sobre uma caixa de som e ver a gosma dançar quando você toca uma música com bastante grave.",
    },
    {
      slug: "rubber-band-powered-car",
      title: "Carrinho Movido a Elástico",
      category: "Engenharia",
      categoryKey: "engineering",
      difficulty: "Fácil",
      time: "1 a 2 horas",
      image: "/images/projects/rubber-band-powered-car.jpg",
      description:
        "Um carrinho caseiro simples que anda sem eletricidade nem pilhas, usando só a energia guardada em um elástico torcido para empurrar as rodas e o eixo para a frente.",
      introduction: [
        "Um carrinho movido a elástico é um dos projetos mais satisfatórios, porque você faz todo o trabalho: enrola, solta em uma superfície plana e vê a física cuidar do resto.",
        "Dá para montar com materiais de casa e depois começar a ajustar: troque o elástico, as rodas ou o peso do carrinho e observe exatamente como cada mudança afeta a distância percorrida.",
      ],
      why:
        "O elástico guarda energia quando é torcido ou enrolado. Ao soltar o carrinho, o elástico desenrola e transfere essa energia guardada para as rodas ou para o eixo. Isso transforma energia potencial em energia cinética, que é a energia do movimento. O carrinho funciona melhor em uma superfície lisa e plana, e os estudantes podem melhorar o projeto trocando o elástico, as rodas, o comprimento ou o peso do carrinho.",
      materials: [
        "Papelão, EVA ou outro material leve para o corpo do carrinho",
        "4 rodas, como tampinhas de garrafa, círculos de papelão ou rodinhas de brinquedo",
        "2 palitos de madeira, lápis ou canudos para os eixos",
        "Pedaços de canudo para segurar os eixos no lugar",
        "1 ou 2 elásticos",
        "Fita adesiva, cola e tesoura",
        "Opcional: rodas ou elásticos de tamanhos diferentes para testar melhorias",
      ],
      steps: [
        "Monte o corpo principal do carrinho usando papelão, EVA ou outro material leve.",
        "Cole pedaços de canudo embaixo do corpo do carrinho para segurar os eixos.",
        "Passe os palitos, lápis ou canudos pelos suportes dos eixos.",
        "Cole as rodas com cuidado nas pontas de cada eixo, conferindo se elas giram bem.",
        "Prenda uma ponta do elástico no corpo do carrinho e a outra ponta no eixo traseiro.",
        "Torça ou enrole o elástico girando as rodas traseiras ou o eixo para trás.",
        "Coloque o carrinho em uma superfície lisa e plana.",
        "Solte o carrinho e veja-o avançar com a energia do elástico.",
      ],
      safety:
        "Peça ajuda de um adulto com a tesoura e os palitos pontudos. Mantenha o elástico longe do rosto ao enrolar, porque ele pode estalar de volta. Não aponte o carrinho para ninguém ao soltá-lo.",
      challenge:
        "Seu carrinho consegue ir mais longe? Teste um elástico mais forte ou mais grosso, rodas de tamanhos diferentes ou um corpo mais comprido ou mais curto. Veja se um carrinho mais leve vai mais longe que um mais pesado e dispute com outra equipe para ver qual projeto ganha.",
    },
    {
      slug: "lemon-powered-batteries",
      title: "Pilhas de Limão",
      category: "Ciências",
      categoryKey: "science",
      difficulty: "Fácil",
      time: "30 a 45 minutos",
      image: "/images/projects/lemon-powered-batteries.jpg",
      description:
        "Transforme limões em uma pilha de verdade e acenda um LED descobrindo como a energia química vira energia elétrica.",
      introduction: [
        "Você sabia que um limão pode acender uma luz? Parece impossível, mas o suco de limão tem ácido, capaz de iniciar uma reação química entre dois metais diferentes e produzir uma correntinha elétrica.",
        "Este projeto mostra como as pilhas de verdade funcionam, por que os cientistas combinam metais diferentes e para que servem os eletrólitos, com algo que você acha na sua cozinha.",
      ],
      why:
        "Uma pilha de limão funciona graças a uma reação química entre dois metais diferentes e o suco ácido do limão. O prego de zinco e a peça de cobre funcionam como eletrodos, enquanto o suco de limão funciona como eletrólito. Os elétrons vão do zinco para o cobre pelos fios, criando uma correntinha elétrica. Um limão sozinho pode não gerar energia suficiente, então ligar vários limões em série aumenta a tensão total.",
      materials: [
        "2 a 4 limões",
        "Moedas de cobre, fio de cobre ou tiras de cobre",
        "Pregos de zinco ou pregos galvanizados (lixados de leve para limpar a superfície)",
        "Fios com garras jacaré",
        "Um LED pequeno, um relógio digital ou um voltímetro",
        "Papel-toalha para a limpeza",
      ],
      steps: [
        "Role os limões de leve sobre a mesa para soltar o suco por dentro.",
        "Espete um prego de zinco e uma peça de cobre em cada limão, conferindo se eles não se encostam.",
        "Ligue a peça de cobre de um limão ao prego de zinco do limão seguinte usando as garras jacaré.",
        "Continue ligando os limões em série, se estiver usando vários.",
        "Ligue as duas pontas livres da corrente a um LED, a um reloginho digital ou a um voltímetro.",
        "Veja se o aparelho liga ou quanta tensão os limões produzem.",
      ],
      safety:
        "O suco de limão é ácido e pode arder se cair nos olhos, então lave as mãos depois de mexer com limões cortados. Peça ajuda de um adulto para espetar os pregos e ligar os fios. Não coloque os fios nem as garras na boca.",
      challenge:
        "Você consegue acender um LED com mais de um limão? Tente acrescentar mais limões e veja o que muda. Troque o limão por uma batata, uma laranja ou uma maçã e compare qual fruta produz mais tensão.",
    },
    {
      slug: "balloon-powered-car",
      title: "Carrinho Movido a Balão",
      category: "Engenharia",
      categoryKey: "engineering",
      difficulty: "Fácil",
      time: "1 a 2 horas",
      image: "/images/projects/balloon-powered-car.jpg",
      description:
        "Construa um carrinho que anda com ar e descubra como a Terceira Lei de Newton transforma um balão em um motor potente.",
      introduction: [
        "Um carrinho movido a balão usa o ar que sai do balão para se empurrar para a frente. Quando o ar escapa para trás pelo canudo, o carrinho avança. Isso é a Terceira Lei de Newton em ação.",
        "Dá para montar com materiais recicláveis de casa e depois testar como pequenas mudanças no projeto, como o tamanho das rodas, o peso do carrinho ou o quanto o balão está bem vedado, fazem o carrinho ir mais longe.",
      ],
      why:
        "Quando o balão está cheio, ele guarda energia potencial na borracha esticada e no ar comprimido. Ao soltar o balão, o ar escapa para trás pelo canudo. Esse empurrão para trás cria uma reação igual e contrária que impulsiona o carrinho para a frente. A energia potencial guardada vira energia cinética, que é a energia do movimento.",
      materials: [
        "Um pedaço pequeno de papelão rígido ou uma garrafa PET para o corpo do carrinho",
        "4 tampinhas de garrafa para as rodas",
        "2 palitos de madeira ou canudos resistentes para os eixos",
        "4 pedaços curtos de canudo para segurar os eixos",
        "1 balão",
        "1 canudo",
        "Fita adesiva, tesoura e cola",
      ],
      steps: [
        "Cole pedaços de canudo embaixo do corpo do carrinho para segurar os eixos.",
        "Passe os palitos ou canudos pelos suportes dos eixos.",
        "Cole as tampinhas nas pontas de cada eixo para fazer as rodas.",
        "Encaixe um canudo no balão e prenda com fita, para o ar não vazar.",
        "Cole o motor de balão e canudo em cima do carrinho, com o canudo apontando para trás.",
        "Encha o balão, aperte o canudo, coloque o carrinho em uma superfície plana e solte.",
      ],
      safety:
        "Peça ajuda de um adulto com a tesoura e os palitos pontudos. Coloque o carrinho em uma superfície plana e segura antes de soltar, e mantenha os dedos longe das rodas e dos eixos girando durante o teste.",
      challenge:
        "Seu carrinho consegue ir mais longe? Tente rodas maiores, deixe o corpo do carrinho mais leve, faça uma ligação de balão mais bem vedada ou dispute com outra equipe para ver qual projeto ganha.",
    },
    {
      slug: "corner-count",
      title: "A Contagem da Esquina",
      category: "Matemática",
      categoryKey: "math",
      difficulty: "Fácil",
      time: "3 x 20 minutos",
      image: "/images/projects/The Corner Count.jpeg",
      description:
        "Conte o movimento da sua própria esquina em janelas de tempo iguais ao longo de três dias, faça um gráfico com o resultado e preveja a próxima contagem antes de ir conferir.",
      introduction: [
        "Dados não moram só nos livros didáticos. Eles estão na sua rua agora mesmo, e ninguém ainda os anotou.",
        "Neste projeto, quem anota é você. Você escolhe um ponto, conta o que passa dentro de uma janela fixa de tempo e repete até aparecer um padrão. Depois vem a parte difícil: prever o próximo número antes de sair para contar.",
      ],
      why:
        "Um padrão que você mesmo descobre vale mais do que um padrão que te entregam pronto. Contar em janelas iguais e fixas é o que torna os números comparáveis, e comparar é o que transforma um monte de risquinhos em um gráfico de barras que tem algo a dizer. Prever antes de medir é o método científico inteiro em vinte minutos: você se compromete com uma resposta e deixa o mundo real dizer o quanto você chegou perto.",
      materials: [
        "Um caderno, ou a folha de contagem para imprimir desta página",
        "Um lápis",
        "Um cronômetro ou o relógio do celular",
        "Um lugar seguro para ficar em pé ou sentado, bem longe da rua",
        "Um adulto para ficar com você",
        "Lápis de cor ou canetinhas para o gráfico",
      ],
      steps: [
        "Escolha um ponto fácil e seguro de alcançar, como uma janela virada para a rua ou um banco afastado do meio-fio. Use exatamente o mesmo ponto em todas as vezes.",
        "Escolha três coisas para contar. Carros, pessoas a pé e cachorros é um bom começo, mas bicicletas, ônibus ou vans de entrega funcionam igualmente bem.",
        "Marque 10 minutos no cronômetro. Cada vez que uma das suas três coisas passar, faça um risquinho. Quando o cronômetro tocar, pare de contar, mesmo que alguma coisa esteja passando no meio.",
        "Anote a data, o horário de início e o tempo ao lado dos seus risquinhos. São essas três anotações que vão permitir comparar uma janela com a outra depois.",
        "Repita no mesmo horário do dia por mais dois dias, para terminar com três janelas que dá para comparar de forma justa.",
        "Desenhe um gráfico de barras com as suas três coisas embaixo e as contagens subindo pela lateral. Use uma cor por dia para os três dias ficarem lado a lado.",
        "Antes da quarta contagem, escreva uma previsão para cada categoria e uma frase explicando por que você escolheu aquele número. Depois vá contar e escreva o número real ao lado do seu palpite.",
      ],
      safety:
        "Conte de um lugar aprovado por um adulto, como uma janela, uma varanda ou um banco atrás do meio-fio, e fique bem longe da rua. Nunca desça da calçada para enxergar melhor, e nunca conte sozinho perto do trânsito. Se estiver escuro ou o tempo estiver ruim, conte de dentro de casa.",
      challenge:
        "Mude uma coisa só e conte de novo: o horário do dia, o dia da semana ou a própria esquina. Qual dessas três mexe mais nos números? Depois tente prever uma janela em um horário que você nunca contou e veja se o seu padrão continua valendo.",
      recordSheet: {
        title: "Folha de Contagem de Movimento",
        intro:
          "Imprima esta folha e preencha uma linha por janela de contagem. Mantenha todas as janelas exatamente com a mesma duração, ou os números não poderão ser comparados.",
        columns: ["Data", "Horário de início", "Tempo", "Carros", "Pessoas a pé", "Cachorros"],
        rows: 4,
        footnote:
          "Antes da última janela, escreva sua previsão para cada coluna na margem. No fim, circule aquela em que você chegou mais perto.",
      },
    },
    {
      slug: "sock-sorter",
      title: "O Separador de Meias",
      category: "IA",
      categoryKey: "ai",
      difficulty: "Fácil",
      time: "1 hora",
      image: "/images/projects/The Sock Sorter.png",
      description:
        "Separe trinta coisas suas em duas pilhas, escreva as regras que um computador precisaria para diferenciá-las e depois construa de propósito três objetos que quebrem as suas próprias regras.",
      introduction: [
        "Toda vez que um celular encontra um rosto numa foto ou um aplicativo decide que uma mensagem é spam, alguma coisa aprendeu a diferença a partir de exemplos. Não porque alguém deu a resposta, mas porque alguém mostrou pilhas de coisas.",
        "Você vai fazer esse mesmo trabalho na mão. Duas pilhas, trinta objetos e um conjunto de regras escritas com a sua própria letra. Depois você vai tentar derrotar as suas próprias regras, que é onde as equipes profissionais de IA passam a maior parte do tempo.",
      ],
      why:
        "Um computador não consegue ver uma meia. Ele só consegue medir coisas sobre a meia: o comprimento, quantas cores tem, se tem calcanhar. As medidas que você escolhe se chamam características, e escolhê-las é quase todo o trabalho. Os objetos que você inventa no final se chamam casos extremos, e é neles que os sistemas reais falham. Caçá-los de propósito é como se aprende que uma resposta confiante e uma resposta correta não são a mesma coisa.",
      materials: [
        "Trinta objetos da casa que se dividam em dois grupos bem claros",
        "Papel e um lápis",
        "Uma régua",
        "Duas caixas, bandejas ou toalhas para segurar as pilhas",
        "A câmera de um celular ou tablet, opcional, para fotografar cada pilha",
      ],
      steps: [
        "Escolha dois grupos que dê para diferenciar de relance: meias e luvas, garfos e colheres, moedas e botões. Junte uns quinze de cada e separe em duas pilhas.",
        "Fotografe ou desenhe cada pilha para ter um registro. Esse conjunto é a única coisa com que as suas regras podem aprender, então vale a pena guardar.",
        "Sem encostar num computador, liste todas as medidas que você poderia tirar de um objeto: comprimento em centímetros, número de cores, número de furos, se dobra, se brilha. Essas são as suas características.",
        "Agora escreva as suas regras usando só essas medidas. Por exemplo: se tiver mais de 12 cm e nenhum furo, é uma meia. Cada regra precisa ser curta o bastante para ler em voz alta de uma vez só.",
        "Teste as suas regras nos trinta objetos, um por um. Marque cada objeto em que as regras erraram e conte quantos foram. Esse número é a sua taxa de erro.",
        "Mude uma regra só e teste os trinta de novo. Anote as duas pontuações para ver se a mudança realmente ajudou.",
        "Agora ataque o seu próprio trabalho. Encontre ou construa três objetos em que as suas regras vão errar de propósito: uma meia bem curta, uma luva com os dedos dobrados para dentro, algo que de alguma forma seja as duas coisas. Teste e anote o que as suas regras disseram e por que se deixaram enganar.",
      ],
      safety:
        "Use coisas suas, ou peça antes de pegar emprestado. Se for cortar ou modificar alguma coisa para montar um caso extremo, peça ajuda de um adulto com a tesoura e escolha objetos que ninguém vá sentir falta.",
      challenge:
        "Entregue as suas regras escritas para outra pessoa, sem mostrar as pilhas, e peça que ela separe um conjunto novo de objetos usando só o que você escreveu. Cada erro que ela cometer é uma regra que você achava clara e não era. Essa distância, entre o que você quis dizer e o que de fato escreveu, é a mesma que coloca falhas nos sistemas de IA de verdade.",
      recordSheet: {
        title: "Registro de Testes das Regras",
        intro:
          "Uma linha por rodada de teste. Passe as suas regras pelos trinta objetos, conte quantos elas erraram, depois mude uma regra e passe de novo.",
        columns: ["Rodada", "Regra que você mudou", "Objetos testados", "Acertos", "Erros"],
        rows: 4,
        footnote:
          "Se uma rodada piorar a pontuação, guarde a linha mesmo assim. Uma mudança que atrapalhou também é evidência, e apagá-la é o jeito como as pessoas acabam se enganando.",
      },
    },
    {
      slug: "teardown-night",
      title: "Noite de Desmontagem",
      category: "Engenharia",
      categoryKey: "engineering",
      difficulty: "Médio",
      time: "1 a 2 horas",
      image: "/images/projects/Teardown Night.png",
      description:
        "Desmonte um aparelho quebrado junto com um adulto, coloque cada peça na ordem em que saiu e descubra que trabalho cada uma estava fazendo.",
      introduction: [
        "Quase todo mundo joga fora uma coisa quebrada sem nunca descobrir o que tinha dentro. Isso é uma aula inteira de engenharia indo para o lixo.",
        "Hoje à noite você abre um. Você não vai consertar, e nem precisa. A tarefa é tirar cada peça, manter tudo em ordem e descobrir para que servia cada uma.",
      ],
      why:
        "Construir alguma coisa ensina como um projeto funciona. Desmontar coisas ensina como cem projetos funcionam, porque cada produto que você abre foi a resposta de alguém a um problema, e você consegue ler essa resposta diretamente. Colocar as peças na ordem em que saíram é o que torna a remontagem possível, e o que transforma um monte de peças em um mapa de como a coisa foi montada.",
      materials: [
        "Um aparelho quebrado que ninguém queira de volta: um controle remoto, um mouse com fio, fones com fio, uma torradeira velha, um despertador mecânico",
        "Um jogo de chaves de fenda pequenas, de preferência com pontas Phillips e chatas",
        "Uma toalha ou bandeja para arrumar as peças",
        "Tigelinhas, ou uma forma de gelo, para manter os parafusos em ordem",
        "A câmera de um celular",
        "Um adulto, presente durante o projeto inteiro",
      ],
      steps: [
        "Junto com um adulto, escolha o aparelho e confirme que é seguro abrir: desligado da tomada há pelo menos um dia, sem pilhas e sem tela nem capacitores grandes por dentro.",
        "Fotografe a parte de fora por todos os lados antes de encostar num único parafuso. Esse é o seu registro de como ele era inteiro.",
        "Ache todos os parafusos, inclusive os escondidos embaixo dos pezinhos de borracha e dos adesivos. Coloque cada parafuso na sua própria tigelinha ou espaço da forma de gelo, na ordem em que você tirou.",
        "Abra a carcaça devagar. Se ela não se separar, é porque ainda existe um parafuso ou uma trava que você não achou. Força quase nunca é a resposta.",
        "Tire uma peça de cada vez e coloque na toalha da esquerda para a direita, na ordem exata em que saiu. Fotografe a fileira a cada poucas peças.",
        "Para cada peça, escreva uma frase: o que ela é e que trabalho estava fazendo. Se não der para saber, escreva o seu melhor palpite e coloque um ponto de interrogação do lado.",
        "Ache a peça que falhou, se conseguir. Procure marcas de queimado, plástico rompido, um fio solto ou uma engrenagem gasta. Depois decida: dava para ter sido projetada de um jeito que não quebrasse?",
      ],
      safety:
        "Um adulto precisa estar presente durante o projeto inteiro. Abra somente aparelhos desligados da tomada, sem pilhas e parados há pelo menos um dia. Nunca abra um micro-ondas, uma televisão, um monitor, o flash de uma câmera ou qualquer outra coisa com um capacitor grande dentro, porque esses podem guardar uma carga perigosa muito tempo depois de desligados. Cuidado com bordas de metal afiadas e com molas sob tensão, e use óculos de proteção enquanto faz força para abrir a carcaça.",
      challenge:
        "Redesenhe uma peça. Escolha a que falhou, ou a que deixou o aparelho mais difícil de abrir, e desenhe uma versão que resolva o problema. Depois conte os parafusos: a sua versão conseguiria usar menos? Produtos que se desmontam com facilidade são mais fáceis de consertar, e coisas que dá para consertar ficam muito mais tempo fora do aterro.",
      recordSheet: {
        title: "Inventário de Peças",
        intro:
          "Uma linha por peça, na ordem em que saiu. Preencha a última coluna mesmo quando estiver chutando, e marque os chutes com um ponto de interrogação.",
        columns: ["#", "Nome da peça", "Do que é feita", "Trabalho que fazia"],
        rows: 10,
        footnote:
          "Se você tentar montar de volta, siga a folha de baixo para cima: a última peça a sair é a primeira a voltar.",
      },
    },
    {
      slug: "egg-drop-budget",
      title: "Queda do Ovo com Orçamento",
      category: "Engenharia",
      categoryKey: "engineering",
      difficulty: "Difícil",
      time: "2 horas",
      image: "/images/projects/Egg Drop on a Budget.jpg",
      description:
        "Proteja um ovo cru usando materiais que custam pontos. Desenhe e preveja antes de construir, solte três vezes e pontue a sobrevivência dividida pelo que você gastou.",
      introduction: [
        "Qualquer um consegue proteger um ovo se puder usar enchimento sem limite. Enrola num travesseiro e acabou, e você não aprendeu nada.",
        "Por isso esta versão cobra de você. Cada canudo, cada centímetro de fita, cada bolinha de algodão custa pontos, e a sua nota é se o ovo sobreviveu dividido pelo que você gastou. De repente o projeto importa muito mais do que o enchimento.",
      ],
      why:
        "A engenharia de verdade quase nunca pede a melhor coisa possível. Ela pede a melhor coisa que dá para construir dentro do dinheiro, do peso ou do espaço que te deram, e isso se chama projetar sob restrição. O orçamento é o que transforma isto de um trabalho manual em um problema de engenharia. Escrever a previsão antes de soltar é a outra metade: se você só decide o que esperava depois de ver o resultado, dá para se convencer de que sabia desde o começo.",
      materials: [
        "Um ovo cru por tentativa, mais uns dois reservas",
        "Canudos, 1 ponto cada",
        "Bolinhas de algodão, 3 pontos cada",
        "Papel, 1 ponto por folha",
        "Papelão, 2 pontos por pedaço do tamanho da mão",
        "Barbante, 1 ponto por comprimento de braço",
        "Fita adesiva, 1 ponto a cada 10 cm",
        "Uma sacola plástica, 5 pontos",
        "Uma régua, um lápis e papel para desenhar, de graça",
        "Uma lona, saco de lixo ou toalha velha para a área de queda",
      ],
      steps: [
        "Combine a altura de queda com um adulto e use exatamente essa altura em todas as rodadas. Uma janela de segundo andar ou o topo de uma escada de abrir funcionam, desde que a área de queda esteja livre.",
        "Copie a tabela de preços e defina um orçamento para a primeira rodada. Quinze pontos é um bom limite inicial.",
        "Desenhe o seu projeto antes de encostar em qualquer material. Marque qual parte freia a queda, qual parte absorve o impacto e qual parte segura o ovo parado.",
        "Escreva a sua previsão: o ovo vai sobreviver, e qual parte do seu projeto vai falhar primeiro? Uma frase para cada, e nada de mudar depois.",
        "Construa e depois some o que você realmente gastou. Se passou do orçamento, tire alguma coisa antes de soltar.",
        "Solte. Não jogue para baixo, apenas largue. Abra, fotografe o estrago e escreva o que de fato aconteceu ao lado do que você tinha previsto.",
        "Faça mais duas rodadas, cada uma com orçamento menor que a anterior. Pontue cada rodada como sobrevivência dividida pelos pontos gastos e veja se ficar mais pobre te obrigou a ficar mais esperto.",
      ],
      safety:
        "Um adulto precisa definir e aprovar a altura de queda e a área de pouso, e precisa ser quem solta o ovo de qualquer altura acima da cabeça. Mantenha todo mundo longe da área de queda antes de cada tentativa. Ovo cru pode ter salmonela, então trabalhe sobre uma superfície lavável, lave as mãos depois de cada rodada e limpe imediatamente qualquer ovo quebrado.",
      challenge:
        "Corte o orçamento pela metade e tente manter o ovo vivo assim mesmo. Depois faça o contrário: mantenha o orçamento e dobre a altura da queda. Qual dos dois limites foi mais difícil de contornar? A maioria dos problemas de engenharia tem exatamente esse formato, e descobrir qual restrição é a que realmente pesa é quase toda a habilidade.",
      recordSheet: {
        title: "Registro de Quedas",
        intro:
          "Uma linha por rodada. A coluna de previsão é preenchida antes da queda, nunca depois.",
        columns: ["Rodada", "Orçamento", "Pontos gastos", "Resultado previsto", "Resultado real", "Nota"],
        rows: 3,
        footnote:
          "A nota é 1 para um ovo que sobreviveu e 0 para um quebrado, dividido pelos pontos que você gastou. Um ovo rachado mas inteiro vale meio ponto.",
      },
    },
    {
      slug: "bean-race",
      title: "A Corrida dos Feijões de 30 Dias",
      category: "Ciências",
      categoryKey: "science",
      difficulty: "Fácil",
      time: "30 dias, 5 minutos por dia",
      image: "/images/projects/The 30-Day Bean Race.jpg",
      description:
        "Quatro feijões, quatro copos e uma única coisa que você muda de propósito. Meça toda manhã por trinta dias, deixe um copo intocado como controle e descubra o que de fato fez diferença.",
      introduction: [
        "Quase todo experimento que dá para terminar numa tarde acaba antes de acontecer qualquer coisa interessante. Plantas não funcionam assim. Um feijão leva o tempo dele, e essa espera é o que este projeto está de verdade ensinando.",
        "Você vai começar quatro copos no mesmo dia, mudar exatamente uma coisa entre eles e medir toda manhã por um mês. No fim você vai ter um gráfico que ninguém te entregou pronto.",
      ],
      why:
        "O copo em que você não muda nada se chama controle, e é o copo mais importante do parapeito. Sem ele não dá para saber se os feijões cresceram por causa do que você fez ou porque feijão cresce de qualquer jeito. Mudar uma coisa por vez é o que permite afirmar que foi essa mudança que causou a diferença, e medir com horário fixo, inclusive nos dias em que nada parece acontecer, é o que mantém você honesto.",
      materials: [
        "Quatro feijões secos do mesmo tipo, de um pacote de feijão carioca ou preto",
        "Quatro copos ou potes transparentes, todos do mesmo tamanho",
        "Bolinhas de algodão, papel toalha ou terra para vaso",
        "Água",
        "Uma régua marcada em centímetros",
        "Fita crepe e uma caneta para etiquetar os copos",
        "Um caderno e a câmera de um celular",
      ],
      steps: [
        "Deixe os quatro feijões de molho na água durante a noite, para que todos comecem do mesmo ponto.",
        "Monte os quatro copos exatamente do mesmo jeito: algodão úmido ou terra, um feijão encostado na parede do copo para você conseguir ver, e uma etiqueta. O copo 1 é o seu controle, e nada nele muda durante trinta dias.",
        "Escolha uma coisa para mudar, e mude apenas nos copos 2, 3 e 4. Quantidade de luz, quantidade de água ou temperatura funcionam bem. Anote com precisão o que você mudou e quanto.",
        "Coloque os quatro copos no mesmo lugar e no mesmo horário, a não ser que luz ou temperatura seja justamente o que você está testando.",
        "Toda manhã, mais ou menos no mesmo horário, meça a altura de cada broto em centímetros e tire uma foto de cada copo do mesmo ângulo.",
        "Escreva os quatro números na folha mesmo nos dias em que nada mudou. Uma linha de zeros é dado de verdade, e pular essa linha esconde quanto tempo a germinação realmente levou.",
        "No dia trinta, desenhe quatro linhas em um único gráfico, uma por copo, com os dias embaixo e a altura subindo pela lateral. Depois coloque as trinta fotos em ordem e passe rápido por elas.",
      ],
      safety:
        "Os feijões deste projeto são para plantar, não para comer: feijão cru e de molho pode fazer mal. Lave as mãos depois de mexer na terra e mantenha os copos longe do alcance de animais e de crianças pequenas. Se um copo criar mofo, peça a um adulto para jogar esse copo fora.",
      challenge:
        "Faça de novo, mas no dia um escreva como você espera que o gráfico fique e desenhe as quatro linhas antes de ter qualquer dado. Depois mude alguma coisa mais difícil de controlar, como o tipo de água ou o tamanho do recipiente, e veja se a sua previsão continua valendo.",
      recordSheet: {
        title: "Registro de Crescimento de 30 Dias",
        intro:
          "Uma linha por dia. Meça mais ou menos no mesmo horário toda manhã, e escreva um número mesmo quando esse número for zero.",
        columns: ["Dia", "Copo 1 (controle)", "Copo 2", "Copo 3", "Copo 4", "Observações"],
        rows: 15,
        footnote:
          "Imprima duas cópias para cobrir os trinta dias. As alturas vão em centímetros. Use Observações para qualquer coisa fora do comum: mofo, uma folha abrindo, um copo que você esqueceu de regar.",
      },
    },
    {
      slug: "rover-wheels",
      title: "Rodas de Rover contra a Areia",
      category: "Robótica",
      categoryKey: "robotics",
      difficulty: "Médio",
      time: "2 horas",
      image: "",
      description:
        "Construa quatro rodas diferentes com papelão e tampinhas, rode o mesmo chassi sobre a mesma bandeja de areia e cascalho, e meça qual projeto de fato vai mais longe.",
      introduction: [
        "A parte mais difícil de dirigir em Marte não é dirigir. É que o chão é solto, e uma roda que funciona perfeitamente num piso liso pode cavar um buraco para si mesma e parar de vez.",
        "Você não precisa de um kit de robótica para trabalhar nesse problema. Precisa de uma bandeja de areia, um chassi simples que role e quatro jogos de rodas que você fez diferentes de propósito.",
      ],
      why:
        "Tudo que não sejam as rodas precisa continuar igual, ou você não aprende nada: mesmo chassi, mesma rampa, mesma areia, mesmo ponto de partida. Isso se chama controlar as variáveis, e é o que permite dizer que foram as rodas que causaram a diferença. As equipes de rover de verdade fazem exatamente isso, testando projetos de roda em pistas de teste aqui na Terra, porque não dá para mandar alguém a Marte consertar uma roda que saiu errada.",
      materials: [
        "Uma bandeja rasa, assadeira ou tampa de caixa",
        "Areia, terra seca ou uma mistura de arroz com cascalho miúdo",
        "Papelão para o chassi e para as rodas",
        "Tampinhas de garrafa, tampas de pote e círculos de papelão para variar as rodas",
        "Espetos de madeira, canudos ou lápis para os eixos",
        "Fita adesiva, uma régua e tesoura",
        "Um livro ou uma tábua para fazer uma rampa pequena",
        "Elásticos e papelão ondulado para acrescentar desenho de banda de rodagem",
      ],
      steps: [
        "Construa um chassi simples: um retângulo de papelão com dois canudos colados embaixo como suportes de eixo. Este é o único chassi que você tem, então faça firme e use em absolutamente todas as descidas.",
        "Encha a bandeja com areia ou cascalho com uns dois centímetros de profundidade e alise. Alise de novo antes de cada descida.",
        "Monte uma rampa numa das pontas para que toda descida comece com exatamente o mesmo empurrão. Marque o ponto de soltura e nunca mude de lugar.",
        "Faça quatro jogos de rodas que se diferenciem cada um em uma coisa evidente: estreitas contra largas, lisas contra com desenho, diâmetro pequeno contra grande. Anote o que torna cada jogo diferente.",
        "Rode o jogo um três vezes, alisando a areia entre uma e outra. Meça do fim da rampa até a frente do chassi e anote as três distâncias.",
        "Repita com os quatro jogos, três descidas cada. Doze descidas no total, sem trocar a rampa nem o chassi no meio do caminho.",
        "Tire a média das três distâncias de cada jogo e compare. Depois olhe as marcas deixadas na areia, porque as rodas que afundaram contam tanto quanto as que não afundaram.",
      ],
      safety:
        "Peça ajuda de um adulto com a tesoura e para cortar os espetos no tamanho certo, e cubra qualquer ponta afiada com fita. Faça o teste sobre uma bandeja para a areia não se espalhar, e mantenha areia e peças pequenas longe de animais e de crianças pequenas. Lave as mãos ao terminar.",
      challenge:
        "Acrescente peso. Cole um objeto pequeno no chassi e rode os quatro jogos de rodas de novo. O vencedor continua sendo o mesmo? Os rovers de verdade ficam mais pesados conforme recebem instrumentos, e uma roda que funciona vazia pode falhar carregada. Depois tente a superfície mais difícil que conseguir montar: areia solta numa ladeira.",
      recordSheet: {
        title: "Resultados do Teste de Rodas",
        intro:
          "Três descidas por jogo de rodas, doze descidas no total. Alise a areia antes de cada descida, sem exceção.",
        columns: [
          "Jogo de rodas",
          "O que o torna diferente",
          "Descida 1 (cm)",
          "Descida 2 (cm)",
          "Descida 3 (cm)",
          "Média",
        ],
        rows: 4,
        footnote:
          "Se uma descida sair muito diferente das outras duas, não apague. Escreva ao lado o que deu errado, porque normalmente é ali que está a falha mais interessante.",
      },
    },
    {
      slug: "family-chatbot",
      title: "Um Chatbot Que Só Conhece a Sua Família",
      category: "Programação",
      categoryKey: "coding",
      difficulty: "Médio",
      time: "2 horas",
      image: "/images/projects/A Chatbot That Only KNows Your Family.jpeg",
      description:
        "Escreva em Python um chatbot que conhece a sua família e mais nada, depois faça as mesmas perguntas a um assistente de IA de verdade e descubra onde cada um erra.",
      introduction: [
        "Um chatbot que sabe tudo é impressionante e quase impossível de entender. Um chatbot que só sabe o nome do seu cachorro e o aniversário da sua avó não é nem uma coisa nem outra, e é exatamente por isso que vale a pena construir.",
        "O seu tem umas trinta linhas de Python, escritas no editor deste site, sem instalar nada. Depois você vai fazer a um assistente de IA de verdade as mesmas perguntas que o seu bot consegue responder, e anotar onde cada um escorrega.",
      ],
      why:
        "O seu bot consulta. Ele guarda um dicionário de fatos, e quando uma pergunta não bate com nenhum deles, ele não tem nada a oferecer. Um modelo de linguagem grande faz algo completamente diferente: ele prevê o texto provável, e é por isso que consegue responder quase qualquer coisa e também por isso que às vezes inventa uma resposta com total confiança. Ver os dois comportamentos lado a lado, em perguntas cuja resposta verdadeira você já conhece, é o jeito mais claro de entender o que essas ferramentas realmente fazem.",
      materials: [
        "Um computador ou tablet com navegador",
        "O editor de Python deste site, então não há nada para instalar",
        "Uma lista de uns dez fatos verdadeiros sobre a sua casa",
        "Papel e lápis para as anotações de comparação",
        "Acesso a um assistente de IA, com um adulto, para os dois últimos passos",
      ],
      steps: [
        "Abra o editor de Python deste site e digite o programa inicial abaixo, ou cole. Rode e pergunte sobre o cachorro. Depois pergunte alguma coisa de que ele nunca ouviu falar e veja o que ele faz.",
        "Troque os três fatos por fatos verdadeiros da sua própria casa. Deixe cada palavra-chave curta e em minúsculas, porque é essa a palavra que o seu bot procura dentro da pergunta.",
        "Acrescente mais sete fatos, até ter dez. Rode o programa a cada dois ou três, porque uma vírgula faltando é bem mais fácil de achar quando você só acrescentou duas linhas.",
        "Tente quebrar. Pergunte sobre o cachorro sem usar a palavra cachorro. Pergunte duas coisas numa frase só. Anote toda pergunta que deveria ter funcionado e não funcionou.",
        "Conserte uma dessas falhas. Fazer duas palavras-chave diferentes apontarem para a mesma resposta é o conserto mais simples, por exemplo deixar tanto 'cachorro' quanto o nome real do seu cachorro devolverem o mesmo fato.",
        "Agora faça a um assistente de IA, com um adulto por perto, essas mesmas dez perguntas. Ele não tem como saber as respostas verdadeiras. Anote mesmo assim o que ele responder.",
        "Preencha a folha de comparação. O seu bot diz que não sabe quando não sabe. Anote o que o assistente faz no lugar disso, e depois decida qual desses dois comportamentos você preferiria em algo de que você depende.",
      ],
      codeBlock: {
        title: "O programa inicial",
        intro:
          "Trinta linhas, e dá para apontar o dedo para o que cada uma faz. O dicionário do topo é a única coisa que o seu bot sabe; tudo abaixo dele é o laço que lê uma pergunta e procura uma palavra-chave que combine.",
        code: `fatos = {
    "cachorro": "A nossa cachorra se chama Pepper e tem 4 anos.",
    "carro": "O carro é um Honda azul.",
    "aniversario": "O aniversário da vovó é 2 de março.",
}

print("Me pergunte sobre a minha família. Digite tchau para parar.")

while True:
    pergunta = input("> ").lower()

    if pergunta == "tchau":
        print("Até mais.")
        break

    resposta = "Essa eu não sei."

    for chave in fatos:
        if chave in pergunta:
            resposta = fatos[chave]

    print(resposta)`,
        note:
          "A linha mais importante é a que coloca a resposta em 'Essa eu não sei' antes de a busca começar. Esse valor padrão é o que faz o seu bot admitir quando não tem nada, e é exatamente o comportamento que um modelo de linguagem não tem.",
      },
      safety:
        "Deixe qualquer coisa privada de fora dos seus fatos: nada de nome completo, endereço de casa, número de telefone, senha ou nome da escola. Só primeiro nome ou apelido. Tenha um adulto junto nos passos que usam um assistente de IA, e nunca digite os dados da sua família dentro de um.",
      challenge:
        "Dê memória ao seu bot. Guarde numa variável a última palavra-chave que ele encontrou, e deixe uma pergunta seguinte como 'quantos anos ela tem' usar essa palavra guardada em vez de procurar de novo. Só esse recurso já é a diferença entre uma tabela de consulta e algo que parece uma conversa, e é também onde o seu bot vai começar a se confundir exatamente do jeito que os assistentes de verdade se confundem.",
      recordSheet: {
        title: "Seu Bot contra o Assistente",
        intro:
          "Dez perguntas cuja resposta verdadeira você já conhece. Preencha as quatro colunas para cada uma.",
        columns: ["Pergunta", "Resposta verdadeira", "O que o seu bot disse", "O que o assistente disse"],
        rows: 10,
        footnote:
          "Marque toda linha em que o assistente deu uma resposta confiante que não era verdadeira. Esse comportamento tem nome, alucinação, e esta tabela é você documentando isso.",
      },
    },
    {
      slug: "loudest-room",
      title: "O Cômodo Mais Barulhento da Casa",
      category: "Ciências",
      categoryKey: "science",
      difficulty: "Médio",
      time: "2 horas",
      image: "",
      description:
        "Meça cada cômodo com um decibelímetro no celular, ache o mais barulhento e depois construa uma caixa de silêncio com materiais de casa, medindo quantos decibéis cada camada rende.",
      introduction: [
        "Todo mundo na sua casa já tem uma opinião sobre qual é o cômodo mais barulhento. Quase ninguém mediu.",
        "Um aplicativo gratuito de decibelímetro transforma um celular num instrumento de verdade. Assim que dá para colocar um número no barulho, as discussões viram medições, e você passa a projetar em direção a uma meta em vez de uma sensação.",
      ],
      why:
        "Decibéis não somam do jeito que números comuns somam. A escala é logarítmica, então cada 10 decibéis equivalem mais ou menos a dobrar o quanto algo parece alto, o que significa que tirar 10 dB de um som é uma vitória bem maior do que o número deixa parecer. Medir a mesma fonte da mesma distância todas as vezes é o que torna as leituras comparáveis, e é a única razão pela qual você pode afirmar que foi a camada de toalha, e não o cômodo, que fez a diferença.",
      materials: [
        "Um celular ou tablet com um aplicativo gratuito de decibelímetro, escolhido com um adulto",
        "Uma fonte de som constante, como um segundo celular tocando o mesmo áudio no mesmo volume",
        "Uma caixa de sapato ou caixa de papelão pequena",
        "Toalhas, um cobertor, caixa de ovo, plástico bolha, jornal amassado",
        "Fita adesiva e tesoura",
        "Uma trena ou uma régua comprida",
      ],
      steps: [
        "Instale um aplicativo de decibelímetro com um adulto e aprenda a ler. A maioria mostra decibéis, escrito dB, e o número fica pulando o tempo todo, então pegue o meio da faixa e não o pico mais alto.",
        "Mapeie o nível de fundo de cada cômodo sem nada ligado: segure o celular na altura do peito, no meio do cômodo, espere dez segundos e anote o número. Essa é a sua linha de base.",
        "Agora ache o cômodo mais barulhento durante a vida normal, com a televisão ligada, a máquina rodando e todo mundo conversando. Mesma altura, mesmo meio do cômodo, os mesmos dez segundos.",
        "Monte um teste que dê para repetir. Coloque a fonte de som no chão, marque um ponto a exatamente um metro e meça a partir dessa marca todas as vezes. Anote a leitura sem caixa nenhuma.",
        "Coloque a fonte de som dentro da caixa de papelão vazia e meça de novo a partir da mesma marca. Anote a queda em decibéis.",
        "Acrescente um material por vez: uma camada de toalha, depois caixa de ovo, depois jornal amassado. Meça depois de cada camada, e nunca acrescente dois materiais na mesma rodada.",
        "Faça um gráfico de decibéis contra número de camadas. Ache a camada que rendeu a maior queda com o menor volume e escreva por que você acha que ela ganhou.",
      ],
      safety:
        "Nunca teste com barulho alto perto dos ouvidos, e não aumente a fonte para deixar os números mais dramáticos. Som contínuo acima de mais ou menos 85 dB pode causar perda de audição permanente. Mantenha a fonte num volume normal de escuta e deixe a caixa fazer o trabalho. Peça a um adulto antes de instalar qualquer aplicativo.",
      challenge:
        "Tente silenciar um cômodo inteiro em vez de uma caixa. Meça o cômodo, pendure um cobertor sobre a maior superfície dura e lisa, e meça de novo exatamente do mesmo ponto. Coisas macias absorvem som e coisas duras e lisas devolvem, e é por isso que um cômodo vazio ecoa e um com tapete não. Quantos decibéis dá para tirar de um cômodo de verdade sem mexer em um único móvel?",
      recordSheet: {
        title: "Registro de Decibéis",
        intro:
          "Mesmo ponto, mesma distância, mesma fonte, todas as vezes. Anote o meio da faixa, não o pico mais alto.",
        columns: ["Teste", "O que mudou", "Leitura 1 (dB)", "Leitura 2 (dB)", "Leitura 3 (dB)", "Média"],
        rows: 8,
        footnote:
          "Três leituras por teste, porque um decibelímetro nunca dá o mesmo número duas vezes. Se as três saírem bem diferentes, alguma coisa se mexeu: confira a distância antes de confiar na média.",
      },
    },
    {
      slug: "receipt-detective",
      title: "Detetive de Cupom Fiscal",
      category: "Matemática",
      categoryKey: "math",
      difficulty: "Médio",
      time: "1 hora",
      image: "/images/projects/Receipt Detective.jpeg",
      description:
        "Pegue um cupom fiscal de verdade, calcule o custo por unidade de tudo que vem em mais de um tamanho e ache os três lugares onde a sua família está pagando a mais.",
      introduction: [
        "O preço da prateleira não é de verdade o preço que você está pagando. O preço que você paga é o preço por grama, e o mercado quase nunca coloca essa parte em letra grande.",
        "Um cupom, uma calculadora e cerca de uma hora bastam para achar. No fim você vai ter uma recomendação de uma página com números reais por trás, sobre dinheiro que a sua família realmente gasta.",
      ],
      why:
        "Custo por unidade é uma taxa unitária, e taxas unitárias são a coisa mais difícil da matemática do fundamental de se importar, porque normalmente chegam como uma folha de exercícios sem consequência nenhuma. Aqui a resposta muda o que é comprado. Dividir preço por tamanho para comparar duas coisas que vêm em tamanhos diferentes é a mesma operação, seja comparando caixas de cereal, planos de celular ou quanto um tanque de combustível rende, e depois que você faz isso de verdade uma vez, deixa de ser abstrato.",
      materials: [
        "Um cupom fiscal de verdade, usado com permissão",
        "Uma calculadora, ou a do celular",
        "Papel e lápis",
        "Os tamanhos das embalagens, o que pode significar uma olhada rápida no armário",
        "Um adulto para conversar sobre as descobertas no final",
      ],
      steps: [
        "Peça um cupom e permissão para usar. Copie cada item na sua folha junto com o que custou.",
        "Risque tudo que só vem em um tamanho, como um abacate avulso. Você precisa de itens em que existe uma versão maior ou menor na prateleira.",
        "Para cada item que sobrou, ache o tamanho impresso na embalagem: gramas, mililitros, ou uma contagem como 12 rolos. Escreva esse tamanho ao lado do preço.",
        "Divida preço por tamanho em cada um. Esse número é o custo por unidade, e é a única forma justa de comparar dois tamanhos diferentes da mesma coisa. Arredonde para o centavo mais próximo.",
        "Procure o preço do outro tamanho de três dos seus itens, na internet ou na próxima ida ao mercado, e calcule o custo por unidade deles também.",
        "Compare. Ache os três itens em que o tamanho que a sua família comprou custa mais por unidade do que o outro tamanho que estava disponível.",
        "Escreva uma recomendação de uma página: os três itens, o custo por unidade de cada tamanho, quanto a diferença dá ao longo de um ano, e uma frase sobre quando comprar o tamanho menor ainda é a escolha certa.",
      ],
      safety:
        "Este projeto mexe com o dinheiro da sua família, então peça antes de usar um cupom e mantenha o que você descobrir dentro de casa. Nunca fotografe um cupom para postar: cupons podem trazer os últimos dígitos de um cartão, um número de conta da loja e um registro de onde a sua família compra e quando.",
      challenge:
        "Teste se o maior é sempre mais barato. Quase sempre é, e é justamente por isso que as lojas sabem que os compradores vão presumir isso. Ache um item na sua cozinha em que o tamanho maior custa mais por unidade do que o menor. Depois calcule quanto do tamanho grande a sua família de fato termina antes de estragar, porque um preço por unidade menor em comida que ninguém come não é economia nenhuma.",
      recordSheet: {
        title: "Folha de Custo por Unidade",
        intro:
          "Uma linha por item. Divida preço por tamanho para preencher a última coluna, e arredonde para o centavo mais próximo.",
        columns: ["Item", "Preço", "Tamanho (g / ml / contagem)", "Custo por unidade"],
        rows: 12,
        footnote:
          "Compare igual com igual: custo por grama de cereal contra custo por grama de cereal, nunca contra custo por grama de leite.",
      },
    },
    {
      slug: "measure-the-school",
      title: "Meça a Escola sem Encostar Nela",
      category: "Matemática",
      categoryKey: "math",
      difficulty: "Difícil",
      time: "90 minutos",
      image: "/images/projects/Measure the School Without Touching it.jpg",
      description:
        "Descubra a altura de um prédio usando uma sombra, uma régua de um metro e triângulos semelhantes. Depois meça de um segundo jeito, com um clinômetro de papel, e veja se as duas respostas batem.",
      introduction: [
        "Você não consegue escalar um prédio de escola com uma trena. E nem precisa. Dois mil anos atrás já se calculava a altura das pirâmides a partir do chão, usando nada além de uma vara e o sol.",
        "Você vai fazer isso duas vezes, por dois caminhos completamente diferentes. O interessante não é nenhuma das duas respostas sozinha. É se elas batem.",
      ],
      why:
        "O método da sombra funciona porque o sol está tão longe que os raios chegam praticamente paralelos, então você e o prédio projetam sombras no mesmo ângulo no mesmo momento. Isso cria dois triângulos com a mesma forma e tamanhos diferentes, que é o que semelhantes significa, e em triângulos semelhantes a razão entre altura e sombra é idêntica. O método do clinômetro usa uma ideia sem nenhuma relação com essa: a tangente de um ângulo. Quando dois métodos sem ligação nenhuma chegam quase ao mesmo número, essa concordância é a sua evidência. Quando não chegam, alguma das suas medidas está errada, e descobrir qual é a habilidade de verdade.",
      materials: [
        "Um dia de sol, de preferência no meio da manhã ou no meio da tarde, quando as sombras ficam compridas e nítidas",
        "Uma régua de um metro ou uma trena",
        "Um amigo ou um adulto para ajudar a segurar e marcar",
        "Giz ou pedrinhas para marcar onde a sombra termina",
        "Um transferidor, um canudo, barbante e um peso pequeno como uma arruela, para o clinômetro",
        "Uma calculadora com tecla tan, para o segundo método",
      ],
      steps: [
        "Escolha um prédio cuja base dê para alcançar andando e cuja sombra caia em chão plano e aberto. Uma parede em cima de uma ladeira estraga os dois métodos.",
        "Fique bem em pé no sol e peça para alguém marcar onde cai a ponta da sua sombra. Meça a sua sombra e depois meça a sua própria altura, de sapato. Anote as duas coisas junto com o horário.",
        "Nos minutos seguintes, meça a sombra do prédio, da parede até a ponta. Sombras se mexem, então se já passaram mais de uns dez minutos, meça a sua própria sombra de novo.",
        "Calcule a primeira resposta: a altura do prédio é igual à sua altura, multiplicada pela sombra do prédio, dividida pela sua sombra. Escreva o resultado com as unidades.",
        "Agora monte o clinômetro. Prenda o canudo ao longo da borda reta do transferidor, amarre o barbante no ponto central e pendure o peso nele para que balance livremente.",
        "Ande para trás uma distância medida a partir da base, mire pelo canudo no ponto mais alto do prédio e peça para o seu ajudante ler o ângulo onde o barbante fica parado. Subtraia essa leitura de 90 para achar o ângulo até o topo.",
        "Calcule a segunda resposta: a altura é igual à sua distância até o prédio, multiplicada pela tangente desse ângulo, mais a altura do seu olho em relação ao chão. Compare com a resposta da sombra e escreva a diferença como porcentagem da maior.",
      ],
      safety:
        "Fique na calçada ou em terreno onde você tem permissão de estar, e peça autorização antes de medir em volta de um prédio que não é seu. Nunca olhe para o sol, nem através do canudo. Preste atenção no trânsito ao medir distâncias andando, e faça isso com um adulto se o terreno passar perto de uma rua.",
      challenge:
        "Consiga deixar as duas respostas a menos de cinco por cento uma da outra. Se ficarem mais distantes, procure a causa em vez de tirar média: terreno inclinado, uma sombra medida muitos minutos depois, uma altura de olho que você esqueceu de somar, ou um telhado que avança além da parede. Depois rode o método inteiro em alguma coisa cuja altura dá para conferir, como uma cesta de basquete a 3,05 metros, e descubra o quanto o seu método é preciso de verdade.",
      recordSheet: {
        title: "Dois Métodos, Um Prédio",
        intro:
          "Preencha as duas metades antes de comparar. Escrever a unidade ao lado de cada número é o que pega quase todos os erros.",
        columns: ["Medida", "Valor", "Unidades", "Horário"],
        rows: 10,
        footnote:
          "Linhas para preencher: a sua altura, a sua sombra, a sombra do prédio, a resposta do método da sombra, a sua distância até a base, o ângulo lido, a altura do seu olho, a resposta do método da tangente, a diferença e essa diferença em porcentagem.",
      },
    },
    {
      slug: "predict-then-launch",
      title: "Preveja, Depois Lance",
      category: "Engenharia",
      categoryKey: "engineering",
      difficulty: "Médio",
      time: "2 horas",
      image: "/images/projects/Predict Then Launch.jpeg",
      description:
        "Use o Laboratório de Catapulta deste site para descobrir como o ângulo e o peso do projétil mudam um tiro, anote a sua previsão e depois construa a catapulta de verdade para descobrir o que o simulador não conseguia contar.",
      introduction: [
        "Um simulador dá a mesma resposta toda vez que você pergunta. É exatamente isso que o torna útil, e é também a única coisa que uma catapulta de verdade, feita de palitos e elástico, nunca vai fazer.",
        "Então você vai usar os dois. Primeiro o Laboratório de Catapulta na página de jogos, onde dá para ajustar o ângulo no grau exato. Depois uma de verdade no chão, onde não dá.",
      ],
      why:
        "No simulador, ângulo e potência são números que você escolhe. Numa catapulta de verdade eles são o resultado de o quanto você puxou o braço daquela vez e de como ele soltou, e nenhum dos dois sai igual duas vezes. É por isso que testar uma máquina real exige repetições e uma média, enquanto uma simulação precisa de uma rodada só. Descobrir onde um modelo para de bater com o mundo não é uma crítica ao modelo. É justamente a razão pela qual engenheiros constroem os dois.",
      materials: [
        "Um computador ou tablet para abrir o Laboratório de Catapulta na página de jogos deste site",
        "Uns 15 palitos de picolé ou abaixadores de língua",
        "Elásticos",
        "Uma tampinha de garrafa para servir de concha",
        "Fita adesiva, e cola bastão ou cola quente com ajuda de um adulto",
        "Uma trena ou uma régua comprida",
        "Três coisas para lançar com pesos claramente diferentes: uma bolinha de algodão, uma bola de papel, uma borracha pequena",
        "Fita crepe para marcar a linha de lançamento",
      ],
      steps: [
        "Abra o Laboratório de Catapulta na página de jogos e dê uns dez tiros só para pegar o jeito dos dois controles: Ângulo em graus e Potência em metros por segundo.",
        "Mantenha a Potência fixa e mude só o Ângulo. Ache o ângulo que manda o tiro mais longe, e depois veja o que acontece bem acima e bem abaixo dele.",
        "Agora mantenha o Ângulo fixo e alterne o projétil entre Standard, Light e Heavy. Anote qual vai mais longe e qual cai mais perto.",
        "Escreva as duas previsões antes de construir qualquer coisa: qual ângulo vai funcionar melhor numa catapulta de verdade, e qual dos seus três objetos vai voar mais longe. Uma frase de raciocínio para cada.",
        "Construa a catapulta: uma pilha de palitos como base, um palito como braço de arremesso preso por um elástico no pivô, e a tampinha colada como concha. Prenda a base no chão para ela não deslizar.",
        "Marque uma linha de lançamento e puxe o braço até o mesmo ponto marcado todas as vezes. Lance cada um dos três objetos cinco vezes e meça onde cada um cai.",
        "Tire a média das cinco distâncias de cada objeto e compare com o que você previu. Depois olhe o quanto esses cinco números ficaram espalhados para um mesmo objeto. Essa dispersão é justamente o que o simulador nunca te mostrou.",
      ],
      safety:
        "Lance apenas objetos macios e leves: bolinhas de algodão, bolas de papel, borrachas. Nunca lance nada duro, pontudo ou pesado, e nunca mire numa pessoa, num animal, numa janela ou numa tela. Todo mundo fica atrás da catapulta na hora do disparo. Peça ajuda de um adulto para a cola quente e para cortar palitos.",
      challenge:
        "Deixe a sua catapulta de verdade repetível. A dispersão dos cinco tiros vem de alguma coisa que muda entre eles, então vá atrás: um puxão que para num lugar diferente a cada vez, uma concha que entorta, uma base que vai andando para a frente. Conserte uma coisa e meça a dispersão de novo. Fazer cinco tiros caírem juntos é bem mais difícil, e bem mais útil, do que fazer um cair longe.",
      recordSheet: {
        title: "Simulador contra Realidade",
        intro:
          "Cinco tiros reais por objeto, porque um tiro só não diz absolutamente nada sobre uma máquina tão inconstante.",
        columns: [
          "Objeto",
          "Previsão",
          "Tiro 1 (cm)",
          "Tiro 2 (cm)",
          "Tiro 3 (cm)",
          "Tiro 4 (cm)",
          "Tiro 5 (cm)",
          "Média",
        ],
        rows: 3,
        footnote:
          "Anote também o maior e o menor dos cinco tiros de cada objeto. A diferença entre esses dois é a sua dispersão, e diminuí-la é o desafio.",
      },
    },
    {
      slug: "sensor-scavenger-hunt",
      title: "Caça aos Sensores",
      category: "IA",
      categoryKey: "ai",
      difficulty: "Fácil",
      time: "45 minutos",
      image: "/images/projects/Sensor Scavenger Hunt.jpeg",
      description:
        "Ache vinte sensores escondidos na sua casa, anote o que cada um percebe e o que decide, e depois procure aquele que vive errando e projete um conserto.",
      introduction: [
        "A sua casa é cheia de coisas que estão prestando atenção em silêncio. A maioria é tão comum que ninguém pensa nelas como tecnologia.",
        "Em quarenta e cinco minutos dá para achar vinte. Depois vem a melhor metade: achar aquele que erra com frequência, porque a falha é onde dá para ver de verdade como a decisão foi construída.",
      ],
      why:
        "Toda coisa automática da sua casa roda o mesmo laço de três passos: ela percebe alguma coisa, decide alguma coisa e faz alguma coisa. Entrada, decisão, saída. Assim que você consegue nomear essas três partes, a diferença entre uma máquina que segue uma regra fixa e uma que reconhece um padrão aprendido deixa de ser misteriosa. As falhas são o que mais importa, porque um sensor que nunca erra não te conta nada sobre como funciona, enquanto um que apaga a luz em cima de alguém sentado parado conta exatamente o que ele estava medindo de verdade.",
      materials: [
        "Papel e lápis, ou a folha de registro desta página",
        "A câmera de um celular, opcional",
        "Permissão para dar uma olhada pela casa",
        "Um adulto para perguntar sobre qualquer coisa que você não tiver certeza",
      ],
      steps: [
        "Comece pelos óbvios para pegar embalo: um detector de fumaça, um termostato, uma tela de celular que escurece, a geladeira, uma máquina de lavar que para quando a tampa abre.",
        "Para cada um, escreva três coisas: o que ele percebe, o que ele decide e o que ele faz. Se não der para preencher as três, você ainda não entendeu aquele.",
        "Agora cace os escondidos. Tudo que liga sozinho, desliga sozinho, para sozinho ou muda sem ninguém encostar está rodando o laço.",
        "Chegue a vinte. Quando acabarem os de dentro de casa, tente o carro, a rua e as lojas: portas automáticas, postes que acendem no fim da tarde, torneiras de banheiro público.",
        "Separe os seus vinte em dois grupos: os que seguem uma regra fixa, como um termostato comparando um número com outro, e os que parecem reconhecer um padrão, como um celular achando um rosto.",
        "Ache uma falha. Uma luz de banheiro que apaga com alguém ainda lá dentro, uma porta automática que ignora uma criança pequena, um celular que desbloqueia para o seu irmão. Anote o que aquele sensor estava medindo de verdade, que quase nunca é o que você imaginava.",
        "Invente um sensor que a sua casa deveria ter e não tem. Desenhe e preencha as três partes do laço. Depois escreva uma frase sobre como ele poderia dar errado, porque cada um dos vinte que você achou pode.",
      ],
      safety:
        "Olhe, não abra. Este projeto é sobre reparar em sensores, não sobre desmontá-los, então deixe detectores de fumaça, termostatos e qualquer coisa ligada na tomada exatamente como estão. Nunca suba em nada para alcançar alguma coisa. Peça a um adulto antes de encostar em qualquer eletrodoméstico, e vá acompanhado de um adulto se sair para achar os últimos.",
      challenge:
        "Cronometre a falha que você achou. Uma luz com sensor de presença que apaga em cima de alguém sentado parado tem um tempo de espera programado, e esse tempo dá para medir: fique completamente parado e conte os segundos até apagar, três vezes seguidas, e tire a média. Você acabou de medir uma decisão que alguém escolheu, e agora pode dizer se ela foi deixada curta demais.",
      recordSheet: {
        title: "Registro de Sensores",
        intro:
          "Uma linha por sensor, vinte linhas no total. Se não der para preencher as três colunas do meio, você ainda não resolveu aquele sensor.",
        columns: ["#", "O que é", "O que percebe", "O que decide", "O que faz", "Regra ou padrão?"],
        rows: 20,
        footnote:
          "Circule toda linha em que você realmente viu o sensor errar. É a essas linhas que você volta nos dois últimos passos.",
      },
    },
    {
      slug: "sunset-in-a-jar",
      title: "Pôr do Sol num Pote",
      category: "Luz e Óptica",
      categoryKey: "optics",
      difficulty: "Fácil",
      time: "45 minutos",
      image: "/images/projects/Sunset in a Jar.jpg",
      description:
        "Ilumine com uma lanterna um pote de água com leite e veja como ele fica azul de lado e alaranjado pela ponta, exatamente pelo mesmo motivo que o céu e o pôr do sol.",
      introduction: [
        "O céu não é azul porque reflete o mar, e o pôr do sol não é alaranjado porque o sol muda de cor. São o mesmo efeito visto de dois ângulos diferentes.",
        "Dá para colocar esse efeito dentro de um pote na mesa da cozinha, com uma lanterna e algumas gotas de leite, e olhar dos dois ângulos dentro do mesmo minuto.",
      ],
      why:
        "Luz branca é todas as cores ao mesmo tempo. Quando ela encontra algo muito menor que o próprio comprimento de onda, as ondas azuis curtas são jogadas para o lado muito mais do que as vermelhas longas, cerca de dezesseis vezes mais, e é essa luz espalhada de lado que você vê pela lateral do pote. O que sobra para sair pela outra ponta já teve o azul retirado, então parece quente e alaranjado. No céu, quem espalha são as moléculas do ar, e um pôr do sol é mais vermelho que o meio-dia porque a luz atravessa muito mais ar até chegar ao seu olho.",
      materials: [
        "Um pote alto e transparente, ou uma garrafa plástica transparente de lados retos",
        "Água",
        "Leite, só algumas gotas para começar",
        "Uma lanterna branca e forte, ou a do celular",
        "Um conta-gotas ou uma colher de chá",
        "Uma folha de papel branco para usar de tela",
        "Um cômodo escuro",
      ],
      steps: [
        "Encha o pote de água e apague as luzes. Ilumine por uma das pontas e olhe o feixe pela lateral. Na água limpa você quase não vai vê-lo, porque praticamente não há nada ali dentro para espalhar a luz.",
        "Acrescente duas ou três gotas de leite e mexa. Olhe pela lateral de novo. Agora o feixe deve aparecer, com um tom azulado.",
        "Agora olhe ao longo do comprimento do pote, com a lanterna na ponta oposta. Não olhe para a lanterna em si, olhe para a luz que já atravessou a água. Ela deve parecer mais quente do que quando entrou.",
        "Acrescente mais uma gota e confira as duas visões outra vez. Anote o que acontece com cada cor conforme você avança.",
        "Continue acrescentando leite gota a gota até o feixe visto de lado ficar branco em vez de azul. Anote quantas gotas foram necessárias.",
        "Segure o papel branco na ponta oposta e observe a mancha de luz que se forma nele. Compare essa mancha com duas gotas contra a mesma mancha com oito gotas.",
        "Explique em uma única frase por que o meio-dia e o pôr do sol têm cores diferentes mesmo o sol não tendo mudado em nada.",
      ],
      safety:
        "Não olhe diretamente para a lanterna, e nunca use um laser neste projeto. Use um pote que você tem permissão de usar, seque o que derramar para ninguém escorregar e jogue a água com leite no ralo no final.",
      challenge:
        "O leite é um truque, e um truque útil. As gotículas de gordura dele são bem maiores que as moléculas do ar, então o seu pote imita o céu em vez de copiá-lo, e é por isso que o seu azul sai pálido em vez de vivo. Tente chegar mais perto: use menos leite em mais água, ou experimente uma pitada de creme em pó ou uma única gota de detergente. Qual delas dá o feixe lateral mais azul com a menor turbidez?",
      recordSheet: {
        title: "Gota a Gota",
        intro:
          "Uma linha por quantidade de leite. Olhe pela lateral e pela ponta antes de acrescentar a próxima gota.",
        columns: ["Gotas de leite", "Cor pela lateral", "Cor pela ponta", "Observações"],
        rows: 8,
        footnote:
          "A linha em que a visão lateral deixa de ser azul e fica branca é a interessante. Anote o que você acha que mudou.",
      },
    },
    {
      slug: "shoebox-camera-obscura",
      title: "Câmara Escura numa Caixa de Sapato",
      category: "Luz e Óptica",
      categoryKey: "optics",
      difficulty: "Médio",
      time: "1 hora",
      image: "/images/projects/Shoebox Camera Obscura.jpg",
      description:
        "Transforme uma caixa de sapato numa câmera que funciona, com um furinho só e sem lente, e descubra por que um furo menor dá uma imagem mais nítida e mais escura.",
      introduction: [
        "Antes de existirem lentes, antes de existir filme, existia um quarto escuro com um furinho numa parede. A imagem que cai na parede oposta está de cabeça para baixo, colorida, e é completamente real.",
        "Uma caixa de sapato é um quarto escuro. Você precisa de um furo, um pedaço de papel vegetal e cerca de uma hora.",
      ],
      why:
        "A luz viaja em linha reta. Um único ponto de uma árvore iluminada lá fora está lançando raios em todas as direções, mas só os que apontam para o seu furinho conseguem passar, e esses seguem em frente até cair num único ponto dentro da caixa. Os raios que saem do topo da árvore acabam embaixo na sua imagem e os que saem do tronco acabam em cima, e é por isso que a imagem chega invertida. É também isso que o fundo do seu olho recebe, e o seu cérebro vira a imagem para você sem avisar.",
      materials: [
        "Uma caixa de sapato com tampa, ou qualquer caixa que dê para vedar contra a luz",
        "Papel alumínio",
        "Papel vegetal, papel manteiga ou papel branco fino",
        "Um alfinete ou uma agulha",
        "Fita preta, e tinta preta ou papel preto para o interior",
        "Tesoura e uma régua",
        "Um pano ou toalha escura para cobrir a cabeça",
      ],
      steps: [
        "Corte um furo quadrado de uns 3 cm no meio de uma das pontas da caixa, e uma janela maior na ponta oposta.",
        "Prenda papel vegetal bem esticado sobre a janela. Essa é a sua tela, e precisa ficar plana, não frouxa.",
        "Pinte ou forre o interior da caixa de preto. Cada raio de luz solto quicando ali dentro lava a imagem.",
        "Cole um quadrado de alumínio sobre o furo de 3 cm e depois atravesse o centro do alumínio com um alfinete, reto, para fazer um único furinho limpo. Não fique girando.",
        "Vede todas as emendas e cantos com fita preta e leve a caixa para uma janela bem clara ou para fora num dia de sol.",
        "Ponha o pano sobre a cabeça e sobre a ponta da janela, e olhe o papel vegetal enquanto o furinho aponta para alguma coisa clara. Dê aos seus olhos um minuto inteiro para se ajustar antes de concluir que não funcionou.",
        "Faça um segundo quadrado de alumínio com um furo bem maior e um terceiro com um menor. Troque um por vez e anote o que acontece com a nitidez e com o brilho a cada troca.",
      ],
      safety:
        "Nunca aponte a caixa para o sol nem olhe na direção do sol através dela, nem mesmo pelo papel vegetal. Peça ajuda de um adulto com a tesoura e para cortar a caixa. Se for pintar o interior com spray, faça isso ao ar livre e com um adulto.",
      challenge:
        "Ache o melhor furo. Diminuir deixa a imagem mais nítida, mas só até certo ponto: abaixo de mais ou menos meio milímetro ela volta a borrar, porque a luz que passa por uma abertura muito pequena se abre em vez de continuar reta. Essa abertura tem nome, difração, e é o mesmo efeito que coloca listras na parede no projeto da fenda dupla. Ache o tamanho de furo em que a sua caixa fica mais nítida, e registre o que acontece dos dois lados desse ponto.",
      recordSheet: {
        title: "Comparação de Furinhos",
        intro:
          "Uma linha por furo. Dê nota de 1 a 5 para nitidez e brilho, sempre com a mesma vista pela mesma janela.",
        columns: ["Furo", "Mais ou menos que largura", "Nitidez 1-5", "Brilho 1-5", "O que dava para distinguir"],
        rows: 5,
        footnote:
          "Mantenha o mesmo motivo e a mesma luz em todas as linhas. Se o sol entrar atrás de uma nuvem entre duas linhas, a coluna de brilho perde o sentido.",
      },
    },
    {
      slug: "light-pipe-water-stream",
      title: "Entortando a Luz num Jato de Água",
      category: "Luz e Óptica",
      categoryKey: "optics",
      difficulty: "Médio",
      time: "1 hora",
      image: "/images/projects/Bending Light Down a Stream of Water.jpg",
      description:
        "Mande um feixe de luz por um jato de água caindo e veja a luz acompanhar a curva, que é exatamente o truque que leva a internet pelo fundo do oceano.",
      introduction: [
        "A luz viaja em linha reta. Essa é toda a base da câmara escura, e é verdade. Então como um sinal percorre uma fibra de vidro fina como um fio de cabelo, enrolada no fundo do Atlântico?",
        "A resposta é que a luz pode ser aprisionada. Depois de ver isso acontecer dentro de um jato de água saindo de uma garrafa, o cabo no fundo do oceano deixa de ser um mistério.",
      ],
      why:
        "Quando a luz que já está dentro da água chega à superfície num ângulo suficientemente raso, ela não sai. Ela reflete de volta para dentro, por completo, todas as vezes, e é por isso que isso se chama reflexão interna total. Para a água o limite fica em torno de 49 graus; se ela bate na superfície num ângulo mais raso que esse, a luz continua lá dentro. Num jato curvo, a luz continua encontrando a borda além desse limite, então continua quicando e acompanha a curva até embaixo. Uma fibra óptica é esse mesmo truque tornado permanente no vidro.",
      materials: [
        "Uma garrafa plástica transparente de lados retos, sem o rótulo",
        "Um prego ou uma broca de 5 mm, e um adulto para fazer o furo",
        "Uma caneta laser vermelha, classe 2 ou menor, manuseada apenas por um adulto",
        "Uma pia, bacia ou balde para receber a água",
        "Fita adesiva",
        "Um cômodo escuro",
      ],
      steps: [
        "Um adulto faz um furo limpo de uns 5 mm na lateral da garrafa, perto do fundo. Em plástico fino, um prego aquecido funciona melhor que uma furadeira.",
        "Tape o furo com um dedo ou um pedaço de fita, encha a garrafa de água e apoie na beirada da pia para o jato cair em arco dentro dela.",
        "Apague as luzes. O adulto encosta o laser na lateral da garrafa exatamente do lado oposto ao furo, mirando reto para o feixe atravessar a água e sair pelo furo.",
        "Solte o jato. Olhe onde a água cai em vez de olhar a garrafa: você deve ver um ponto brilhante descendo dentro do jato e iluminando o lugar onde ele bate.",
        "Ajuste a mira até a luz ficar no jato o máximo possível. Quando está certo, a curva inteira brilha de leve e o ponto de chegada fica bem claro.",
        "Agora quebre de propósito. Ponha um dedo no meio do jato e veja a luz parar ali. O salto só funciona enquanto a superfície continua lisa e sem se romper.",
        "Mude a curva subindo e descendo a garrafa, para o jato cair mais em pé ou mais deitado. Anote com qual formato a luz vai mais longe antes de vazar.",
      ],
      safety:
        "O laser é a única coisa realmente perigosa aqui. Um adulto o segura o tempo todo e ele não sai da mão dessa pessoa. Use uma caneta vermelha, classe 2 ou menor, nunca verde e nunca nada vendido como de alta potência. Nunca aponte para os olhos de ninguém, para um animal, um espelho, uma janela ou uma torneira brilhante, porque um reflexo pode alcançar um olho que ninguém estava mirando. Mantenha o feixe abaixo da altura dos olhos e apontado para dentro da pia. O furo na garrafa é feito por um adulto. Seque a água para ninguém escorregar.",
      challenge:
        "Ache o limite. A luz escapa no instante em que o jato se quebra em gotas separadas, então tudo que mantiver o jato liso por mais tempo deveria levá-la mais longe. Experimente um furo menor, a garrafa mais cheia para ter mais pressão, e uma borda mais bem acabada no furo. Depois responda: por que uma fibra óptica de verdade nunca tem esse problema, sendo vidro maciço e não podendo se quebrar em gotas?",
      recordSheet: {
        title: "Até Onde a Luz Foi",
        intro:
          "Uma linha por tentativa. Meça do furo até o ponto em que a luz visivelmente deixa o jato.",
        columns: ["Tentativa", "O que você mudou", "Formato do jato", "Distância que a luz ficou dentro (cm)"],
        rows: 6,
        footnote:
          "Se não der para ver onde a luz sai, procure onde o jato deixa de ser uma corda lisa e vira gotas soltas. Quase sempre é o mesmo lugar.",
      },
    },
    {
      slug: "cd-spectroscope",
      title: "Monte um Espectroscópio com um CD",
      category: "Luz e Óptica",
      categoryKey: "optics",
      difficulty: "Médio",
      time: "1 hora",
      image: "/images/projects/Build a Spectroscope from a CD.jpg",
      description:
        "Monte um espectroscópio de verdade com uma caixa de cereal e um CD velho, e descubra quais lâmpadas dão um arco-íris contínuo e quais dão só umas poucas linhas brilhantes separadas.",
      introduction: [
        "Um arco-íris parece contínuo: cada cor passando para a seguinte sem faltar nada. A luz do sol é mesmo assim. Quase nenhuma lâmpada da sua casa é, e olhando para ela você não tem como saber.",
        "Os sulcos de um CD são mais juntos que o comprimento de onda da luz, o que faz do disco uma rede de difração, o que faz dele a peça que trabalha dentro de um instrumento científico de verdade. O resto do instrumento é uma caixa de cereal.",
      ],
      why:
        "Um sólido quente brilha em todas as cores ao mesmo tempo, porque seus átomos estão apertados e se empurrando, e esse é o arco-íris liso que vem do sol ou de uma lâmpada velha de filamento. Um gás rarefeito que brilha faz algo completamente diferente: umas poucas cores nítidas e separadas, e nada entre elas. Isso acontece porque um elétron dentro de um átomo não pode ficar em qualquer lugar. Ele só pode ocupar certos níveis fixos de energia, como degraus de uma escada sem espaço entre eles, e quando cai de um degrau para outro libera um fóton cuja cor é definida exatamente pelo tamanho daquele salto. Essas linhas separadas são essa regra tornada visível, e são um dos resultados que obrigaram os físicos a inventar a mecânica quântica.",
      materials: [
        "Uma caixa de cereal vazia, ou uma caixa de papelão parecida",
        "Um CD ou DVD velho que você tenha permissão de destruir; o DVD funciona melhor",
        "Um estilete ou tesoura, com ajuda de um adulto",
        "Fita preta e papel preto",
        "Dois pedaços de cartolina de borda reta para formar a fenda",
        "Uma régua e um lápis",
      ],
      steps: [
        "Prenda a parte de cima da caixa com fita para não entrar luz, e forre o interior com papel preto se conseguir.",
        "Faça uma fenda estreita numa das pontas, de mais ou menos 1 mm de largura por 3 cm de altura. Duas bordas retas de cartolina coladas com um milímetro de distância dão uma fenda bem mais limpa que um corte de estilete.",
        "Com um adulto, corte uma cunha do disco. Se for um DVD, separe primeiro as duas metades e fique com a camada que ainda tem o brilho de arco-íris.",
        "Corte um furo de observação de uns 2 cm na ponta oposta da caixa, bem embaixo.",
        "Cole o pedaço de disco dentro da caixa, abaixo do furo, inclinado a uns 60 graus, de modo que olhar pelo furo signifique olhar para a superfície do disco e ver nela o reflexo da fenda.",
        "Aponte a fenda para uma parede branca iluminada pela luz do dia e olhe pelo furo. Ajuste a inclinação até aparecer uma faixa de cores para um dos lados, e então cole o disco no lugar.",
        "Agora observe quatro fontes, uma por vez, jamais o sol: luz do dia numa parede, uma lâmpada velha de filamento ou halógena, uma lâmpada fluorescente tubular ou econômica, e um LED branco. Desenhe o que vê em cada caso.",
      ],
      safety:
        "Nunca aponte o espectroscópio para o sol nem olhe na direção do sol através dele. Use a luz do dia batendo numa parede branca ou numa nuvem. Peça ajuda de um adulto para cortar a caixa e principalmente para cortar o disco, porque o plástico do CD pode lascar em pedaços cortantes. Use proteção nos olhos ao cortar o disco, se tiver.",
      challenge:
        "Ache as linhas e descubra o que as produziu. Uma lâmpada fluorescente mostra algumas linhas brilhantes porque tem vapor de mercúrio dentro, e o verde forte e o par de amarelos vêm de saltos específicos entre níveis de energia nos átomos de mercúrio. Um LED branco é diferente de novo: um pico azul mais uma corcova amarela larga, porque é um chip azul com uma camada que converte parte desse azul em todo o resto. Desenhe os dois com capricho, e depois ache um letreiro de neon, se puder, para ver quão poucas cores ele realmente tem.",
      recordSheet: {
        title: "Desenhos de Espectros",
        intro:
          "Uma linha por fonte de luz. Desenhe o que você vê em vez de descrever, e anote se as cores se misturam umas nas outras ou ficam separadas.",
        columns: ["Fonte de luz", "Contínuo ou linhas separadas?", "Cores que dá para distinguir", "Falta alguma coisa?"],
        rows: 6,
        footnote:
          "A última coluna é a mais útil. Um vão onde deveria haver uma cor está dizendo que aquela cor nunca foi emitida, e isso informa tanto quanto uma linha brilhante.",
      },
    },
    {
      slug: "uv-glow-lab",
      title: "A Regra do Brilho",
      category: "Luz e Óptica",
      categoryKey: "optics",
      difficulty: "Fácil",
      time: "45 minutos",
      image: "/images/projects/The Glow Rule.jpeg",
      description:
        "Procure coisas que brilham sob uma lanterna UV e depois ache a regra que todas elas obedecem sem exceção: a luz que sai sempre tem menos energia que a luz que entra.",
      introduction: [
        "Algumas coisas completamente comuns escondem uma cor. Água tônica, tinta de marca-texto, sabão em pó, algumas meias brancas e a tira de segurança de uma cédula parecem banais até a luz ultravioleta cair sobre elas.",
        "Encontrá-las é divertido por uns dez minutos. A regra por baixo é a parte que vale guardar, e acaba sendo uma regra sem exceções.",
      ],
      why:
        "A luz ultravioleta é feita de fótons que carregam mais energia do que qualquer cor que o seu olho consegue ver. Quando um deles é absorvido pelo tipo certo de molécula, ele levanta um elétron até um nível de energia mais alto. O elétron solta um pouco dessa energia como calor, depois volta a cair e emite um fóton próprio. Como perdeu energia no caminho, o fóton emitido sempre carrega menos do que o que foi absorvido, e menos energia significa comprimento de onda maior, o que significa uma cor mais avermelhada. É por isso que entra ultravioleta e sai azul, e por isso você nunca vai achar algo que recebe vermelho e devolve azul. Esse degrau para baixo tem até nome: o deslocamento de Stokes.",
      materials: [
        "Uma lanterna UV, de 395 nm, que é a versão barata mais comum e mais segura",
        "Água tônica, que contém quinino",
        "Marca-textos, principalmente amarelo e verde",
        "Sabão em pó ou detergente de roupa",
        "Estrelas ou adesivos que brilham no escuro",
        "Papel branco e algumas folhas de papel colorido",
        "Um cômodo escuro",
      ],
      steps: [
        "Apague as luzes e deixe os olhos se ajustarem por uns dois minutos. Depois passe a lanterna UV devagar pelo cômodo e anote tudo que acender.",
        "Ponha água tônica num copo transparente e ilumine pela lateral. Compare com água comum num copo idêntico, para ter certeza de que não é o copo que está brilhando.",
        "Rabisque bastante um marca-texto amarelo em papel branco e coloque sob a lanterna. Anote a cor que sai, não a cor que a tinta tem na luz normal.",
        "Espalhe um pouco de sabão em pó em papel escuro e ilumine. Os sabões levam clareadores de propósito, para que a roupa devolva azul extra e pareça mais branca que branca.",
        "Anote a cor da própria lanterna ao lado da cor que saiu de cada coisa que você achou, compare as duas colunas e procure qualquer coisa que tenha quebrado o padrão.",
        "Teste as estrelas que brilham no escuro. Carregue-as sob a lanterna por dez segundos e depois desligue. Ao contrário de tudo o mais na sua lista, essas continuam.",
        "Cronometre quanto tempo as estrelas ficam visíveis. Depois carregue por um minuto inteiro, cronometre de novo e anote os dois números.",
      ],
      safety:
        "Nunca olhe dentro da lanterna UV, nunca aponte para os olhos de ninguém nem de um animal, e não deixe encostada na pele por muito tempo. Compre uma lanterna de 395 nm, que fica logo depois do violeta. Evite completamente as de 254 nm, do tipo germicida, porque essas realmente machucam olhos e pele. Peça antes de usar uma cédula ou um documento e devolva na hora.",
      challenge:
        "Saia procurando a exceção e não a encontre. Tudo na sua lista recebeu um fóton de alta energia e devolveu um de energia menor, então a cor sempre andou na direção do vermelho. Procure especificamente algo que faça o contrário. Quando não achar, você terá descoberto uma regra em vez de juntado uma lista de coisas brilhantes, e regras são do que a física é feita. Depois descubra por que as estrelas que brilham no escuro conseguem continuar emitindo por minutos enquanto todo o resto para no instante em que a lanterna desliga.",
      recordSheet: {
        title: "Registro de Brilhos",
        intro:
          "Uma linha por coisa encontrada. As duas colunas de cor são o ponto da tabela inteira, então compare as duas quando ela estiver cheia.",
        columns: [
          "Objeto",
          "Cor na luz normal",
          "Cor que entra",
          "Cor que sai",
          "Continua brilhando com a lanterna desligada?",
        ],
        rows: 10,
        footnote:
          "Com a tabela cheia, confira linha por linha: a luz que saiu alguma vez carregou mais energia, ou seja, ficou mais azul, que a luz que entrou? Escreva a sua resposta embaixo.",
      },
    },
    {
      slug: "double-slit-at-home",
      title: "A Fenda Dupla na Parede do seu Quarto",
      category: "Luz e Óptica",
      categoryKey: "optics",
      difficulty: "Difícil",
      time: "2 horas",
      image: "",
      description:
        "Corte duas fendas em papel preto, passe um laser por elas e obtenha o padrão de listras que convenceu os físicos de que a luz é uma onda. Depois use as listras para medir uma distância pequena demais para uma régua.",
      introduction: [
        "Duas fendas, um laser e uma parede. Se a luz fosse simplesmente um monte de balinhas, você esperaria duas listras claras, uma atrás de cada fenda. Não saem duas. Sai uma fileira inteira, com espaçamento regular e vãos escuros no meio.",
        "Este é o experimento mais repetido da física, e a versão na parede do seu quarto é o mesmo experimento. A parte difícil não é a física. É cortar duas fendas próximas o bastante.",
      ],
      why:
        "As ondas que saem das duas fendas chegam a cada ponto da parede tendo percorrido distâncias ligeiramente diferentes. Onde essa diferença é um número inteiro de comprimentos de onda, as duas se alinham e somam, formando uma listra clara; onde é meio comprimento de onda, elas se cancelam e deixam escuridão. Isso é interferência, e só ondas fazem isso. O espaçamento das listras está ligado ao comprimento de onda da luz e à distância entre as fendas por uma relação simples, o que significa que dá para rodar ao contrário: medir listras separadas por milímetros e calcular uma distância entre fendas pequena demais para medir diretamente.",
      materials: [
        "Uma caneta laser vermelha, classe 2 ou menor, manuseada apenas por um adulto",
        "Papel preto de construção, ou qualquer cartolina preta fina que não deixe a luz passar",
        "Um estilete ou uma lâmina de barbear nova, com ajuda de um adulto",
        "Um pedaço de cartolina grossa com uma janela recortada",
        "Uma régua com marcação em milímetros, e uma trena",
        "Um cômodo escuro com uma parede clara e lisa, de preferência com 3 metros ou mais de espaço livre",
        "Uma calculadora",
        "Fita adesiva",
      ],
      steps: [
        "Prenda o papel preto bem esticado e liso sobre a janela da cartolina. Antes disso, ponha contra uma lâmpada: se a luz atravessar o próprio papel, as listras vão sumir e você precisa de algo mais opaco.",
        "Com um adulto, faça dois cortes retos e paralelos no papel, de mais ou menos 1 cm. Apoie a lâmina numa régua e arraste uma vez só. Deixe os cortes o mais perto possível um do outro, bem abaixo de um milímetro.",
        "Posicione a cartolina para o laser passar pelas duas fendas ao mesmo tempo e seguir até uma parede a pelo menos 3 metros. Prenda tudo com fita, porque uma cartolina que se mexe estraga a medição.",
        "Escureça o cômodo. O adulto aponta o laser pelas fendas. Ajuste até ver uma fileira de pontos ou listras em vez de uma mancha só. Uma mancha só significa que as fendas estão longe demais uma da outra ou que o feixe só passa por uma delas.",
        "Meça em metros a distância do papel até a parede e anote. Chame de L.",
        "Na parede, meça de uma vez ao longo de quantas listras conseguir, de centro a centro, e divida pelo número de vãos que você contou. Essa média é o seu espaçamento de franjas, y. Medir várias listras de uma vez é o que torna isso preciso.",
        "Calcule a distância entre as fendas: d é igual ao comprimento de onda vezes L, dividido por y. Uma caneta vermelha tem cerca de 650 nanômetros, ou seja 0,000000650 metros. A sua resposta deve cair em torno de alguns décimos de milímetro.",
      ],
      safety:
        "O laser é o perigo sério aqui, e um adulto precisa segurá-lo durante o projeto inteiro. Use uma caneta vermelha classe 2 de 1 mW ou menos, nunca verde e nunca nada vendido como de alta potência. Nunca olhe para o feixe, e nunca aponte para uma pessoa, um animal, uma janela, um espelho, uma tela ou qualquer metal brilhante, porque um reflexo perdido pode alcançar um olho que ninguém estava mirando. Mantenha o feixe abaixo da altura dos olhos e apontado para uma parede fosca. As fendas vão em papel preto fosco e não em alumínio pelo mesmo motivo: o alumínio devolve o feixe para dentro do cômodo. Cortar as fendas exige supervisão de um adulto e uma base de corte, e uma lâmina nova corta melhor e escorrega menos que uma cega.",
      challenge:
        "Corte uma segunda cartolina com as fendas de propósito mais próximas, e preveja antes de medir se as listras vão se afastar ou se juntar. Depois confira. Acertar a direção dessa relação, e conseguir explicar por quê, vale mais do que o número. Depois pense no que este experimento não te mostra: o seu laser está disparando trilhões de fótons de uma vez, então o que está na sua parede é genuinamente interferência de ondas. Num laboratório, o mesmo padrão vai se formando um fóton por vez, chegando como pontinhos isolados ao longo de horas, e esse resultado é muito mais estranho que o seu.",
      video: {
        videoId: "2rWDzLwfX64",
        title: "Double Slit Experiment AT HOME",
        startSeconds: 10,
        caption:
          "Uma versão caseira da mesma montagem. Vale ver antes de cortar qualquer coisa, para saber como é, na parede, um padrão que realmente funciona. O vídeo está em inglês.",
      },
      recordSheet: {
        title: "Medições das Franjas",
        intro:
          "Meça o mesmo padrão três vezes sem mexer em nada. Se as três respostas não baterem, o problema é a medição e não a física.",
        columns: [
          "Tentativa",
          "Distância até a parede L (m)",
          "Listras medidas",
          "Largura total (mm)",
          "Espaçamento y (mm)",
          "d calculado (mm)",
        ],
        rows: 3,
        footnote:
          "d é igual a 0,000000650 vezes L, dividido por y, com y convertido antes para metros. Errar por mil entre milímetros e metros é o engano que quase todo mundo comete aqui.",
      },
    },
  ],
}

const projectDisplayOrder = new Map(
  ["popsicle-stick-bridge", "lego-robot-builder", "simple-circuit-light"].map((slug, index) => [
    slug,
    index,
  ])
)

function orderProjectGuides(projects: ProjectGuide[]) {
  return [...projects].sort((a, b) => {
    const aOrder = projectDisplayOrder.get(a.slug) ?? Number.MAX_SAFE_INTEGER
    const bOrder = projectDisplayOrder.get(b.slug) ?? Number.MAX_SAFE_INTEGER

    if (aOrder !== bOrder) return aOrder - bOrder
    return projects.indexOf(a) - projects.indexOf(b)
  })
}

export const projectGuides = orderProjectGuides(localizedProjectGuides.en)
export const projectCount = projectGuides.length

export function getProjectGuides(language: Language = "en") {
  return orderProjectGuides(localizedProjectGuides[language] ?? localizedProjectGuides.en)
}

export function getProjectGuide(slug: string, language: Language = "en") {
  return getProjectGuides(language).find((project) => project.slug === slug)
}
