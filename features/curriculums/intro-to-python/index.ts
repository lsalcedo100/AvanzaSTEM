/**
 * Intro to Python Programming - an 8-week beginner curriculum for grades 3-6.
 *
 * This file is the single source of truth for the curriculum. It is intentionally
 * data-driven: the landing page and (later) the individual lesson pages read from
 * this structure so that content can be reviewed and edited here without touching
 * layout code.
 *
 * Editing guidance:
 * - Keep `starterCode` runnable as-is in the browser Python playground
 *   (components/ui/python-playground.tsx). Prefer standard-library-only code.
 * - `expectedOutput` should match what the starter code prints, line for line,
 *   so students can check their work.
 * - Concepts build on each other week to week. Do not introduce a concept in a
 *   project before the week that teaches it (e.g. randomness only appears in
 *   Week 7, so the Week 5 number game uses a fixed secret number).
 */

/** A single vocabulary term and its kid-friendly definition. */
export type CurriculumVocabTerm = {
  term: string
  definition: string
}

/**
 * A find-the-bug exercise. Students see the broken code and a hint about what
 * to look for; the fix is kept separate so the lesson page can hide it behind a
 * "Show solution" toggle instead of giving it away immediately.
 */
export type CurriculumDebuggingChallenge = {
  /** The broken snippet students inspect and fix. */
  brokenCode: string
  /** What to look for, phrased without revealing the fix. */
  prompt: string
  /** The correction, revealed on demand. */
  solution: string
}

/**
 * Facilitator-facing notes for a single week, used on the teacher/librarian
 * resources page. Distinct from `teacherNotes` (a short pacing tip): this is the
 * structured run-the-session guide.
 */
export type CurriculumFacilitation = {
  /** The one goal of the session, in plain facilitator language. */
  goal: string
  /** What the room needs for this specific week. */
  materials: string[]
  /** Points the facilitator should explain or demonstrate. */
  explain: string[]
  /** Mistakes students commonly make this week. */
  commonMistakes: string[]
  /** Questions to ask to check understanding or prompt thinking. */
  questionsToAsk: string[]
  /** A no-computer activity that teaches the same idea when devices are limited. */
  offlineActivity: string
}

/** One week of the curriculum: a lesson plus its project and practice challenges. */
export type CurriculumWeek = {
  /** 1-based week number in the program. */
  week: number
  /** Facilitator run-the-session guide for this week (teacher resources page). */
  facilitation: CurriculumFacilitation
  /** Lesson title shown in the schedule and lesson header. */
  title: string
  /** One or two sentences describing what the week covers. */
  description: string
  /** Concrete, observable things a student should be able to do by the end. */
  learningGoals: string[]
  /** New terms introduced this week, in the order they are taught. */
  vocabulary: CurriculumVocabTerm[]
  /** Rough class time for the lesson and project, e.g. "50-60 minutes". */
  estimatedTime: string
  /** The single most important idea of the week, in plain language. */
  mainConcept: string
  /** Name of the week's build. */
  projectName: string
  /** Runnable starting point for the project. Students extend this. */
  starterCode: string
  /** What the starter code prints, so students can verify their setup. */
  expectedOutput: string
  /** A small task that reinforces the main concept. */
  miniChallenge: string
  /** A short broken-code task; students find and fix the bug. */
  debuggingChallenge: CurriculumDebuggingChallenge
  /** An open-ended stretch task for students who finish early. */
  extensionChallenge: string
  /** A question that connects the code back to the student's own thinking. */
  reflectionQuestion: string
  /** Notes for the instructor: pacing, misconceptions, and facilitation tips. */
  teacherNotes: string
}

/** One step in the recurring shape every lesson follows. */
export type CurriculumLessonStep = {
  title: string
  description: string
}

/** Curriculum-wide guidance for the adult running the program. */
export type CurriculumFacilitatorGuide = {
  /** Who the curriculum is for. */
  audience: string
  /** What each student needs to take part. */
  studentNeeds: string[]
  /** How to run a single session in a library or classroom. */
  runningTheLesson: string[]
  /** How to support students who have never coded before. */
  supportingBeginners: string[]
}

/** Top-level metadata plus the ordered list of weeks. */
export type Curriculum = {
  /** URL slug for the curriculum landing route. */
  slug: string
  title: string
  subtitle: string
  /** One-sentence description for the landing page header. */
  description: string
  /** Grade band this is designed for, e.g. "Grades 3-6". */
  gradeRange: string
  totalWeeks: number
  /** Typical class length per week. */
  estimatedTimePerWeek: string
  /** What a student needs to take part, e.g. a browser. */
  requirement: string
  /** Short paragraph describing the program for families and teachers. */
  summary: string
  /** Plain-language notes about how the program is structured and run. */
  format: string[]
  /** Specific, concrete skills students walk away with. */
  outcomes: string[]
  /** The five-step shape every weekly lesson follows. */
  lessonFlow: CurriculumLessonStep[]
  /** Guidance for the adult facilitating the program (teacher resources page). */
  facilitator: CurriculumFacilitatorGuide
  weeks: CurriculumWeek[]
}

export const introToPythonCurriculum: Curriculum = {
  slug: "intro-to-python",
  title: "Intro to Python Programming",
  subtitle: "An 8-week beginner coding program",
  description:
    "An 8-week beginner coding curriculum where students learn Python by building small games, interactive programs, and debugging challenges.",
  gradeRange: "Grades 3-6",
  totalWeeks: 8,
  estimatedTimePerWeek: "50-60 minutes",
  requirement: "Runs in the browser, no install needed",
  summary:
    "Students with no prior experience learn to read and write real Python, one idea at a time. Each week introduces a single concept and ends with a small project the student can run and show off. By the last week, students combine everything they have learned to design and build their own mini game.",
  format: [
    "One concept per week, taught in order so each week builds on the last.",
    "Every lesson ends with a project students write and run themselves.",
    "Short mini, debugging, and extension challenges let students practice at their own pace.",
    "All code runs in the browser Python playground, so no installation is required.",
  ],
  outcomes: [
    "How computers follow instructions",
    "How variables store information",
    "How programs make decisions",
    "How loops repeat actions",
    "How functions organize code",
    "How lists and randomness make programs more interesting",
    "How to find and fix mistakes in code",
    "How to design and build a small final project",
  ],
  lessonFlow: [
    {
      title: "Learn the idea",
      description: "Read a short, plain-language explanation of the one new concept for the week.",
    },
    {
      title: "Try starter code",
      description: "Run working starter code in the browser and change it to see what happens.",
    },
    {
      title: "Fix a broken example",
      description: "Find and repair a small bug in a broken snippet, the way real programmers do.",
    },
    {
      title: "Build a mini project",
      description: "Use the new idea to write and run a small program of your own.",
    },
    {
      title: "Reflect on what changed",
      description: "Answer a short question that connects the code back to your own thinking.",
    },
  ],
  facilitator: {
    audience:
      "This curriculum is written for the adult leading the session: library staff running a coding club, a teacher adding an enrichment unit, a workshop volunteer, or a parent guiding one student. No programming background is required - each lesson tells you what to say and what to watch for.",
    studentNeeds: [
      "A computer, laptop, or Chromebook with a modern web browser (Chrome, Edge, Safari, or Firefox).",
      "An internet connection to open the lesson pages and load the in-browser Python playground.",
      "Optional: paper for planning code, and headphones if working through lessons individually.",
    ],
    runningTheLesson: [
      "Open the week's lesson page and read The idea and the vocabulary together as a group.",
      "Demonstrate the starter code once on a shared screen, running it so everyone sees the output.",
      "Give students time to run the starter code themselves and try the mini challenge.",
      "Circulate while students work, using the suggested questions to check understanding.",
      "Close with the debugging challenge and the reflection question as a whole-group discussion.",
      "Plan for 50 to 60 minutes. If time is short, the mini challenge or reflection can be sent home.",
    ],
    supportingBeginners: [
      "Reassure students that error messages are a normal part of coding, not a sign of failure.",
      "Encourage typing changes by hand rather than copying, so the syntax has a chance to sink in.",
      "Pair a first-time coder with a partner, or seat them where you can check in often.",
      "Read code out loud in plain English (\"print shows this text on the screen\") to build vocabulary.",
      "Let students who finish early try the extension challenge instead of waiting for the group.",
    ],
  },
  weeks: [
    {
      week: 1,
      facilitation: {
        goal: "Students understand that code is a set of ordered instructions and write their first program using print().",
        materials: [
          "Computers or tablets with a web browser",
          "The Week 1 lesson page open to the playground",
          "Optional: a whiteboard for writing example print() lines together",
        ],
        explain: [
          "A program is a list of instructions the computer follows in order, from top to bottom.",
          "print() shows on the screen exactly what is inside the quotation marks.",
          "Every print() needs parentheses, and text needs quotation marks around it.",
        ],
        commonMistakes: [
          'Leaving off the quotation marks around text, such as print(Hello) instead of print("Hello").',
          "Missing or mismatched parentheses.",
          "Expecting the computer to guess meaning - it prints exactly what is typed.",
        ],
        questionsToAsk: [
          "What do you think this line will print before we run it?",
          "What happens if we swap the order of two print lines?",
          "Why did the computer show an error on this line?",
        ],
        offlineActivity:
          "Play \"robot instructions\": one student gives another step-by-step spoken commands to draw a simple shape. Missing or out-of-order steps show how literally computers follow instructions.",
      },
      title: "What is Python?",
      description:
        "The first lesson. Students find out what code really is: exact instructions the computer follows in order. They write and run their own Python program using print() to put words on the screen, and see what happens when one instruction is typed wrong.",
      learningGoals: [
        "Say, in their own words, what a program is.",
        "Write and run a program that uses print() to show text.",
        "Explain why the computer runs the lines in order, from top to bottom.",
        "Read a short error message and fix a missing quotation mark.",
      ],
      vocabulary: [
        { term: "program", definition: "A set of exact instructions the computer follows, one line at a time." },
        { term: "print()", definition: "A Python command that shows whatever text you put in the quotes on the screen." },
        { term: "string", definition: "A piece of text inside quotation marks, like \"Hello\"." },
        { term: "output", definition: "Whatever the program shows on the screen when it runs." },
        { term: "error", definition: "The message Python shows when a line is written in a way it cannot follow." },
      ],
      estimatedTime: "50-60 minutes",
      mainConcept:
        "Code is a list of instructions, and the computer follows them in order without guessing. print() is the first instruction you will learn: it shows exactly the text between the quotation marks. Change the words in the quotes and the screen changes with them.",
      projectName: "Digital Introduction Card",
      starterCode: [
        "# Digital Introduction Card",
        "# Change the words inside the quotes to make this card about you.",
        "",
        'print("Hi, I\'m Alex.")',
        'print("I\'m 10 years old.")',
        'print("The last game I played was soccer.")',
      ].join("\n"),
      expectedOutput: ["Hi, I'm Alex.", "I'm 10 years old.", "The last game I played was soccer."].join("\n"),
      miniChallenge:
        "Add two more lines to your card: one about a game or hobby you like, and one about something you want to build this year.",
      debuggingChallenge: {
        brokenCode: "print(Hello)",
        prompt:
          "This line should print the word Hello, but it stops the program with an error instead. Look at what is missing around the word Hello. Every piece of text in Python needs it.",
        solution: 'Put quotation marks around the text:\nprint("Hello")',
      },
      extensionChallenge:
        "Add a blank line to your card by writing print() with nothing inside the parentheses. Use it to split your card into two neat sections.",
      reflectionQuestion:
        "The computer followed your lines in the exact order you wrote them. In the game you build at the end of this program, order will matter too. What would go wrong if a game printed \"You win!\" before the player even took a turn?",
      teacherNotes:
        "The big idea is that the computer is literal: it prints exactly what is in the quotes, in order, and nothing more. The two errors you will see most are a missing quotation mark and a missing parenthesis. Treat them as the first bugs students find and fix, not as failure. Have students read their output aloud to check it says what they meant.",
    },
    {
      week: 2,
      facilitation: {
        goal: "Students store information in variables and use them to build sentences with print().",
        materials: [
          "Computers with a browser and the Week 2 lesson page",
          "Optional: labeled envelopes or sticky notes to model variables as boxes",
        ],
        explain: [
          "A variable is a labeled box that stores a value you can reuse.",
          "Text values (strings) go in quotes; number values do not.",
          "An f-string lets you drop a variable inside a sentence using curly braces.",
        ],
        commonMistakes: [
          "Putting quotes around a variable name inside an f-string, which prints the name instead of its value.",
          "Adding quotes to numbers that should stay numeric.",
          "Naming variables inconsistently, with spaces or stray capital letters.",
        ],
        questionsToAsk: [
          "What is stored in this variable right now?",
          "Which of these values are text, and which are numbers?",
          "How could we describe a different person without rewriting every line?",
        ],
        offlineActivity:
          "Hand out labeled envelopes (name, age, favorite animal) and have students put a slip of paper inside each. Reading the envelopes aloud models how a variable holds and reuses a value.",
      },
      title: "Variables and Data Types",
      description:
        "Students give the program a memory. They store words and numbers in variables, then reuse them to build sentences, so changing one line changes the whole program. This is the first step toward a game that can talk about a player by name and keep track of a score.",
      learningGoals: [
        "Make a variable and store a value in it with =.",
        "Tell the difference between text (a string) and a number.",
        "Use a variable inside a printed sentence with an f-string.",
        "Find and fix a variable that was used the wrong way.",
      ],
      vocabulary: [
        { term: "variable", definition: "A named box that stores a value so you can use it again later." },
        { term: "assign", definition: "To put a value into a variable using the = sign." },
        { term: "integer", definition: "A whole number with no decimal point, like 10." },
        { term: "f-string", definition: "A sentence that starts with f, where anything inside { } is filled in from a variable." },
      ],
      estimatedTime: "50-60 minutes",
      mainConcept:
        "A variable is a labeled box: you put a value in it once, then use its name anywhere you want that value. Text goes in quotation marks (a string); numbers do not. With an f-string you can drop a variable straight into a sentence, so a program can greet a player by name instead of saying the same thing every time.",
      projectName: "About Me Generator",
      starterCode: [
        "# About Me Generator",
        "# Fill in your own info, then run it to see your player profile.",
        "",
        'name = "Alex"',
        "age = 10",
        'favorite_game = "soccer"',
        "",
        'print(f"Player: {name}")',
        'print(f"Age: {age}")',
        'print(f"Favorite game: {favorite_game}")',
      ].join("\n"),
      expectedOutput: [
        "Player: Alex",
        "Age: 10",
        "Favorite game: soccer",
      ].join("\n"),
      miniChallenge:
        "Add a variable called score and set it to 0, then print a line like Score: 0. You will track a score exactly like this in your final game.",
      debuggingChallenge: {
        brokenCode: 'name = "Alex"\nprint(f"My name is name.")',
        prompt:
          "This should print My name is Alex, but it prints the word name instead. The variable's value is not getting filled in. What has to go around name inside an f-string?",
        solution:
          'Put curly braces around the variable so Python fills in its value:\nprint(f"My name is {name}.")',
      },
      extensionChallenge:
        "Add a number variable called high_score and print one sentence that uses both name and high_score, like: Alex's best score is 25.",
      reflectionQuestion:
        "You changed what the program says just by changing one variable. Why is that better than typing the player's name over and over in every line?",
      teacherNotes:
        "Reinforce two rules: strings get quotes, numbers do not; and inside an f-string a variable only works with curly braces around it. The classic bug is quoting a variable name so it prints literally, which is worth letting students discover. Keep variable names lowercase and descriptive (score, not x).",
    },
    {
      week: 3,
      facilitation: {
        goal: "Students use input() to collect answers and respond to them, turning a program into a two-way conversation.",
        materials: [
          "Computers with a browser and the Week 3 lesson page",
          "Optional: a printed script for the offline chatbot role-play",
        ],
        explain: [
          "input() asks a question and pauses until the user types an answer and presses Enter.",
          "The answer can be stored in a variable and used later in the program.",
          "input() always gives back text.",
        ],
        commonMistakes: [
          "Forgetting the quotation marks around the prompt text inside input().",
          "Expecting the program to keep going before the user presses Enter.",
          "Trying to do math on an answer without converting it to a number (that comes next week).",
        ],
        questionsToAsk: [
          "Where does the program stop and wait for the user?",
          "How is this different from last week's program that only printed?",
          "What should the program say back using the answer?",
        ],
        offlineActivity:
          "Role-play a chatbot: one student is the program and may respond only using a printed script plus the answers the user gives. It shows how input feeds the response.",
      },
      title: "Input and Interaction",
      description:
        "Programs start listening. Students use input() to ask the player a question, wait for the answer, and use that answer in what the program says back. By the end they have a short chatbot that responds to whatever you type.",
      learningGoals: [
        "Use input() to get an answer from the person running the program.",
        "Store an answer in a variable and use it later.",
        "Explain that the program pauses at input() until the user types something.",
        "Fix an input() line that is missing its quotation marks.",
      ],
      vocabulary: [
        { term: "input()", definition: "A Python command that asks a question and waits for the user to type an answer." },
        { term: "prompt", definition: "The message input() shows to tell the user what to type." },
        { term: "user", definition: "The person using the program - in a game, the player." },
      ],
      estimatedTime: "50-60 minutes",
      mainConcept:
        "input() is how a program listens. It shows a prompt, then stops and waits for the player to type and press Enter. Their answer gets stored in a variable, so the program can use it - their name, their guess, their choice - in what it does next. Keep in mind: input() always gives back text.",
      projectName: "Mini Chatbot",
      starterCode: [
        "# Mini Chatbot",
        "# The program asks questions, then replies using your answers.",
        "",
        'name = input("What should I call you? ")',
        'print(f"Nice to meet you, {name}.")',
        "",
        'game = input("What game are you into right now? ")',
        'print(f"{game}? Good pick. Soon we\'ll build one of our own.")',
      ].join("\n"),
      expectedOutput: [
        "What should I call you? Alex",
        "Nice to meet you, Alex.",
        "What game are you into right now? soccer",
        "soccer? Good pick. Soon we'll build one of our own.",
      ].join("\n"),
      miniChallenge:
        "Add one more question - maybe their favorite color or animal - and use the answer in the program's reply.",
      debuggingChallenge: {
        brokenCode: "name = input(What should I call you? )",
        prompt:
          "Running this causes an error before the question even shows up. The message inside input() is text for the user to read. What does every piece of text need around it?",
        solution:
          'The prompt is text, so it needs quotation marks:\nname = input("What should I call you? ")',
      },
      extensionChallenge:
        "Ask for the player's name and their favorite game, then print one sentence that uses both, like: Alex is ready to play soccer!",
      reflectionQuestion:
        "Last week your program always said the same thing. Now it answers you. What could you ask a player at the start of a game to make it feel like it is about them?",
      teacherNotes:
        "input() always returns text, even when the user types a number - that becomes important in Week 5, where we compare numbers and use int(). Watch for missing quotes around the prompt. In the coding workspace the prompt and the typed answer both appear in the output panel, so the expected output shows a sample conversation.",
    },
    {
      week: 4,
      facilitation: {
        goal: "Students use if, elif, and else so the program does different things depending on the answer.",
        materials: [
          "Computers with a browser and the Week 4 lesson page",
          "Optional: a whiteboard or floor space to draw or walk a decision tree",
        ],
        explain: [
          "A condition is a question that is either true or false.",
          "Code indented under an if runs only when its condition is true.",
          "elif and else handle the other cases.",
          "Comparing values uses two equals signs (==); one equals sign (=) stores a value.",
        ],
        commonMistakes: [
          "Using = instead of == when comparing two values.",
          "Forgetting to indent the code under if, elif, or else.",
          'Forgetting that text comparisons are case-sensitive ("Earth" is not "earth").',
        ],
        questionsToAsk: [
          "What condition are we checking here?",
          "Which branch will run if the answer is this?",
          "Why did the program choose that response?",
        ],
        offlineActivity:
          "Run a decision tree on the floor with tape or signs: students answer a yes/no question and walk to the matching branch. It makes if/elif/else visible.",
      },
      title: "Conditionals",
      description:
        "The program starts making choices. Students use if, elif, and else so it does different things depending on the player's answer. They build a short quiz that checks answers and responds to each one - the core of any game that can be won or lost.",
      learningGoals: [
        "Write an if statement that runs only when a condition is true.",
        "Add elif and else to handle the other answers.",
        "Compare the player's answer to an expected value with ==.",
        "Fix the common mix-up between = and ==.",
      ],
      vocabulary: [
        { term: "condition", definition: "A question with a true or false answer, like answer == \"Earth\"." },
        { term: "if", definition: "Runs the indented lines below it only when its condition is true." },
        { term: "elif", definition: "Checks another condition when the ones above it were false." },
        { term: "else", definition: "Runs when none of the conditions above it were true." },
        { term: "==", definition: "Checks whether two values are equal (different from =, which stores a value)." },
      ],
      estimatedTime: "55-60 minutes",
      mainConcept:
        "A conditional lets the program choose. Python checks a condition - something that is either true or false - and runs the indented lines under it only if the condition is true. With if, elif, and else, a program can react one way to a right answer, another to a close answer, and another to a wrong one. That is how a game decides whether you scored, won, or lost.",
      projectName: "Trivia or Personality Quiz",
      starterCode: [
        "# Trivia Quiz",
        "# Ask a question, then check the answer.",
        "",
        'answer = input("Which planet do we live on? ")',
        "",
        'if answer == "Earth":',
        '    print("Correct! 1 point.")',
        'elif answer == "earth":',
        '    print("Right idea - watch the capital E. We\'ll count it.")',
        "else:",
        '    print("Not quite. The answer is Earth.")',
      ].join("\n"),
      expectedOutput: ["Which planet do we live on? Earth", "Correct! 1 point."].join("\n"),
      miniChallenge:
        "Add a second question with its own if / else, so your quiz has two questions in a row.",
      debuggingChallenge: {
        brokenCode: 'answer = input("Which planet do we live on? ")\nif answer = "Earth":\n    print("Correct!")',
        prompt:
          "Python shows an error on the if line. One equals sign stores a value in a variable. What do you use when you want to check whether two things are the same?",
        solution:
          "Comparing two values needs two equals signs:\nif answer == \"Earth\":",
      },
      extensionChallenge:
        "Turn it into a personality quiz: ask a would-you-rather question and print a different result for each choice using if, elif, and else.",
      reflectionQuestion:
        "Your program now reacts differently to different answers. In your final game, what is one decision the program will need to make, and what should happen for each choice?",
      teacherNotes:
        "Two focus points: indentation (the lines under an if must be indented) and = versus == (store versus compare). String comparison is exact and case-sensitive, which the elif line is there to spotlight. Let students hit the = / == error themselves - the message points right at it.",
    },
    {
      week: 5,
      facilitation: {
        goal: "Students use a while loop to repeat actions and give the player more than one try.",
        materials: [
          "Computers with a browser and the Week 5 lesson page",
          "Optional: paper for the offline higher/lower guessing game",
        ],
        explain: [
          "A loop repeats code so you do not have to rewrite it.",
          "A while loop keeps going as long as its condition stays true.",
          "Something inside the loop must eventually make the condition false, or it runs forever.",
          "int() turns typed text into a number so it can be compared.",
        ],
        commonMistakes: [
          "Writing a loop whose condition never becomes false (an infinite loop).",
          'Forgetting int(), so a typed "7" never equals the number 7 and the loop never ends.',
          "Forgetting the colon at the end of the while line.",
        ],
        questionsToAsk: [
          "What has to happen for this loop to stop?",
          "What changes each time through the loop?",
          "Why might this loop run forever, and how would we fix it?",
        ],
        offlineActivity:
          "Play a paper guessing game: one student thinks of a number 1 to 10 while another guesses and is told \"higher\" or \"lower.\" Counting the guesses models the loop and the comparison.",
      },
      title: "Loops",
      description:
        "Instead of copying a line over and over, students make the program repeat. Using a while loop, they build a Guess the Number game that keeps asking until the player wins, giving too-high and too-low hints along the way. The secret is fixed for now; Week 7 makes it random.",
      learningGoals: [
        "Use a while loop to repeat lines until something changes.",
        "Give the player as many tries as they need with a loop.",
        "Combine a loop with an if to react to each guess.",
        "Find and fix a loop that never stops.",
      ],
      vocabulary: [
        { term: "loop", definition: "Code that repeats instead of running once." },
        { term: "while", definition: "Repeats the lines below it as long as its condition stays true." },
        { term: "int()", definition: "Turns typed text like \"7\" into the number 7 so you can compare it." },
        { term: "infinite loop", definition: "A loop that never stops because its condition never becomes false." },
      ],
      estimatedTime: "60 minutes",
      mainConcept:
        "A loop repeats code so you do not have to write it a hundred times. A while loop keeps going as long as its condition is true - perfect for a game that should keep asking until the player wins. Something inside the loop has to eventually make the condition false, or it runs forever. Since input() gives text, we use int() to turn the guess into a number we can compare.",
      projectName: "Guess the Number Game",
      starterCode: [
        "# Guess the Number",
        "# The secret is 7 for now. In Week 7 you'll make it random.",
        "",
        "secret = 7",
        "guess = 0",
        "",
        "while guess != secret:",
        '    guess = int(input("Guess a number from 1 to 10: "))',
        "    if guess < secret:",
        '        print("Too low.")',
        "    elif guess > secret:",
        '        print("Too high.")',
        "",
        'print("You got it!")',
      ].join("\n"),
      expectedOutput: [
        "Guess a number from 1 to 10: 4",
        "Too low.",
        "Guess a number from 1 to 10: 9",
        "Too high.",
        "Guess a number from 1 to 10: 7",
        "You got it!",
      ].join("\n"),
      miniChallenge:
        "Add a tries counter: start tries = 0, add 1 to it inside the loop, and after the loop print how many guesses it took.",
      debuggingChallenge: {
        brokenCode:
          'secret = 7\nguess = 0\nwhile guess != secret:\n    guess = input("Guess a number from 1 to 10: ")',
        prompt:
          "This game never ends, even when the player types 7. The secret is the number 7, but input() gives back the text \"7\". Why are they not equal, and what turns text into a number?",
        solution:
          'Turn the typed text into a number with int():\nguess = int(input("Guess a number from 1 to 10: "))',
      },
      extensionChallenge:
        "Change the range to 1 to 100 and give the player only 7 tries. Stop the loop and print Out of guesses! if they run out.",
      reflectionQuestion:
        "A loop let you ask again and again without repeating yourself. What part of your final game might need to repeat - the turns, the questions, the rounds?",
      teacherNotes:
        "The teachable moment is the infinite loop: something inside the loop must change the variable the condition checks, or it never ends. Introduce int() only as far as needed to compare numbers. Keep the secret fixed this week so students can predict and check the behavior - randomness arrives in Week 7.",
    },
    {
      week: 6,
      facilitation: {
        goal: "Students define and call functions to reuse code and keep programs organized.",
        materials: [
          "Computers with a browser and the Week 6 lesson page",
          "Optional: a printed recipe card to model a reusable function",
        ],
        explain: [
          "A function is a reusable recipe: define it once, then call it whenever you need it.",
          "def creates a function; writing its name with parentheses calls it.",
          "A parameter is an input the function accepts, listed inside its parentheses.",
          "Defining a function does not run it - calling it does.",
        ],
        commonMistakes: [
          "Defining a function but never calling it.",
          "Calling a function without the argument it requires.",
          "Forgetting the colon after the def line, or not indenting the function body.",
        ],
        questionsToAsk: [
          "What does this function do, and what does it need to do its job?",
          "Where is the function defined, and where is it called?",
          "How would this program look if we could not use functions?",
        ],
        offlineActivity:
          "Write a simple recipe (for example, folding a paper airplane) as named steps, then \"call\" it twice with different inputs such as different paper colors. It shows define-once, reuse-many.",
      },
      title: "Functions",
      description:
        "As programs get bigger, students package code into functions they can name and reuse. They build small helper functions - greet the player, show the score - and call them whenever they are needed, which is exactly how the final game will stay organized.",
      learningGoals: [
        "Define a function with def and run it by calling its name.",
        "Pass information into a function using a parameter.",
        "Explain why functions save you from repeating code.",
        "Fix a function call that is missing its argument.",
      ],
      vocabulary: [
        { term: "function", definition: "A named block of code you can run again and again by calling its name." },
        { term: "def", definition: "The keyword that creates a new function." },
        { term: "parameter", definition: "An input a function takes, listed inside its parentheses." },
        { term: "call", definition: "To run a function by writing its name with parentheses, like greet(\"Alex\")." },
      ],
      estimatedTime: "60 minutes",
      mainConcept:
        "A function is a reusable recipe. You write the steps once after def and give it a name; after that, you run all those steps just by calling the name. A parameter lets you hand the function different information each time, so one greet function can welcome any player. Writing a function does not run it; calling it does.",
      projectName: "Game Helper Functions",
      starterCode: [
        "# Game Helper Functions",
        "# Write each helper once, then reuse it.",
        "",
        "def greet(player):",
        '    print(f"Welcome, {player}!")',
        "",
        "def show_score(points):",
        '    print(f"Score: {points}")',
        "",
        'greet("Alex")',
        "show_score(0)",
        "show_score(10)",
      ].join("\n"),
      expectedOutput: ["Welcome, Alex!", "Score: 0", "Score: 10"].join("\n"),
      miniChallenge:
        "Write a new function called game_over() that prints Thanks for playing! and call it at the end of the program.",
      debuggingChallenge: {
        brokenCode: 'def greet(player):\n    print(f"Welcome, {player}!")\n\ngreet()',
        prompt:
          "This stops with an error about a missing argument. The greet function asks for a player in its parentheses. Look at the last line - what did the call forget to give it?",
        solution:
          'Give the function a value when you call it:\ngreet("Alex")',
      },
      extensionChallenge:
        "Write a function next_level(level) that prints a line like You reached level 5! using the number you pass in, then call it with a few different levels.",
      reflectionQuestion:
        "You wrote show_score once and used it twice. In your final game, what is something you will do more than once that could become a function?",
      teacherNotes:
        "Separate two ideas clearly: defining a function does not run it; calling it does. The frequent bug is defining a function with a parameter, then calling it with empty parentheses. Keep each function short and doing one job so the payoff - reuse - is obvious.",
    },
    {
      week: 7,
      facilitation: {
        goal: "Students store many values in a list and use random.choice() to make programs unpredictable.",
        materials: [
          "Computers with a browser and the Week 7 lesson page",
          "Optional: a bag or bowl with slips of paper to draw from at random",
        ],
        explain: [
          "A list holds many values in one variable, written inside square brackets.",
          "import random brings in the random toolbox.",
          "random.choice() picks one item from a list at random, so each run can be different.",
        ],
        commonMistakes: [
          'Forgetting import random at the top ("random is not defined").',
          "Missing commas or brackets when writing a list.",
          "Expecting the same output every run and thinking the randomness is a bug.",
        ],
        questionsToAsk: [
          "How many possible outcomes could this program produce?",
          "What makes each run different?",
          "What could we add to the list to change the game?",
        ],
        offlineActivity:
          "Put several outcome slips in a bag and have students draw one to build a random story aloud. It models a list plus a random choice.",
      },
      title: "Lists and Randomness",
      description:
        "Programs become unpredictable. Students store several values in a list and use random.choice() to pick one at random, so the program does something different every run. They build a short adventure game whose path and prize change each time - and meet import for the first time, because now they need it.",
      learningGoals: [
        "Make a list and read items from it.",
        "Use random.choice() to pick a random item from a list.",
        "Explain why import random has to come first.",
        "Fix a program that uses random without importing it.",
      ],
      vocabulary: [
        { term: "list", definition: "An ordered collection of values inside square brackets, like [\"a\", \"b\", \"c\"]." },
        { term: "item", definition: "One value stored in a list." },
        { term: "import", definition: "Brings in extra tools Python does not load by default, like the random module." },
        { term: "random.choice()", definition: "Picks one item from a list at random." },
      ],
      estimatedTime: "60 minutes",
      mainConcept:
        "A list holds many values in one variable, written inside square brackets. random.choice() reaches into a list and pulls out one item at random, so the program can surprise the player. To use random you first bring it in with import random at the top - the first time you have needed a tool that is not built in. Lists plus randomness are what make a game feel different every time you play.",
      projectName: "Random Adventure Game",
      starterCode: [
        "# Random Adventure Game",
        "# Each run picks a random path and a random prize.",
        "",
        "import random",
        "",
        'paths = ["a dark forest", "a quiet cave", "a rope bridge"]',
        'prizes = ["a gold coin", "an old map", "a rusty key"]',
        "",
        "path = random.choice(paths)",
        "prize = random.choice(prizes)",
        "",
        'print(f"You head down {path}.")',
        'print(f"At the end, you find {prize}.")',
      ].join("\n"),
      expectedOutput: [
        "You head down a quiet cave.",
        "At the end, you find an old map.",
      ].join("\n"),
      miniChallenge:
        "Add a third list of characters the player meets along the way, pick one at random, and print a line about them.",
      debuggingChallenge: {
        brokenCode: 'paths = ["a dark forest", "a quiet cave"]\npath = random.choice(paths)\nprint(path)',
        prompt:
          "Python says random is not defined. This program uses random.choice(), but random is a tool that has to be brought in first. What single line belongs at the very top?",
        solution: "Bring in the random tool at the top:\nimport random",
      },
      extensionChallenge:
        "Ask the player's name with input() at the start, then use it in the random story so the adventure feels like it is about them.",
      reflectionQuestion:
        "Two players run this and get different stories. Why does that make a game more fun to play more than once?",
      teacherNotes:
        "Because the output is random, the expected output is just one example - runs will differ, and that is the point. Reinforce that import goes at the top. Lists are indexed from 0, but random.choice() means students do not need indexing yet; keep the focus on picking from a list.",
    },
    {
      week: 8,
      facilitation: {
        goal: "Students plan and build their own mini game, combining everything from the program.",
        materials: [
          "Computers with a browser and the Week 8 lesson page",
          "Paper for planning the game before coding",
        ],
        explain: [
          "Real programs combine many small ideas that were learned separately.",
          "Start with a short written plan, then add one feature at a time and test as you go.",
          "A small game that works beats an ambitious one that does not run.",
        ],
        commonMistakes: [
          "Trying to write the whole game at once instead of in small, tested steps.",
          "Reintroducing earlier bugs (missing colons, = versus ==, forgetting int()).",
          "Skipping the plan and getting stuck.",
        ],
        questionsToAsk: [
          "What is the smallest version of your game that could run?",
          "Which week's idea will you use here?",
          "You hit an error - what does the message tell you?",
        ],
        offlineActivity:
          "Have students design their game on paper first: the goal, what the player types, and what the program says back. Students without a computer can still complete and present the design.",
      },
      title: "Final Game Builder",
      description:
        "The final project. Students plan and build their own small Python game, combining everything: variables to track the score, input for the player's moves, conditionals to decide what happens, a loop to keep playing, functions to stay organized, and a list with random to keep it fresh. They start from a working skeleton and make it their own.",
      learningGoals: [
        "Plan a small game on paper before writing code.",
        "Combine variables, input, conditionals, loops, functions, and randomness in one program.",
        "Test the game, find bugs, and fix them as they go.",
        "Change the skeleton into a game that is their own.",
      ],
      vocabulary: [
        { term: "plan", definition: "A short outline of what a program should do, written before you code it." },
        { term: "skeleton", definition: "A small working program you start from and build onto." },
        { term: "test", definition: "Running your program with different inputs to see whether it works." },
        { term: "bug", definition: "A mistake in code that makes the program do the wrong thing." },
      ],
      estimatedTime: "60 minutes (or two sessions)",
      mainConcept:
        "Real programs are built from small pieces you already know, added one at a time. Start with a plan and a skeleton that runs, then add one feature, test it, and only then add the next. A small game that works is a real win - more than a big one that never runs.",
      projectName: "Build Your Own Python Mini Game",
      starterCode: [
        "# Build Your Own Mini Game",
        "# A working skeleton. Read it, run it, then make it yours.",
        "",
        "import random",
        "",
        "def welcome(player):",
        '    print(f"Welcome, {player}! Guess my secret number to win.")',
        "",
        'player = input("What\'s your name? ")',
        "welcome(player)",
        "",
        "secret = random.choice([1, 2, 3, 4, 5])",
        "tries = 0",
        "guess = 0",
        "",
        "while guess != secret:",
        '    guess = int(input("Pick a number from 1 to 5: "))',
        "    tries = tries + 1",
        "    if guess != secret:",
        '        print("Nope, try again.")',
        "",
        'print(f"You got it in {tries} tries, {player}!")',
      ].join("\n"),
      expectedOutput: [
        "What's your name? Alex",
        "Welcome, Alex! Guess my secret number to win.",
        "Pick a number from 1 to 5: 2",
        "Nope, try again.",
        "Pick a number from 1 to 5: 4",
        "Nope, try again.",
        "Pick a number from 1 to 5: 5",
        "You got it in 3 tries, Alex!",
      ].join("\n"),
      miniChallenge:
        "Give the player a hint: inside the loop, print Too low or Too high after each wrong guess, the way you did in Week 5.",
      debuggingChallenge: {
        brokenCode:
          'secret = random.choice([1, 2, 3])\nguess = 0\nwhile guess != secret\n    guess = int(input("Pick a number: "))',
        prompt:
          "Python points at the while line with a syntax error. Every line that starts a block - if, while, def - ends with the same small symbol. Look at the end of that line.",
        solution: "Lines that start a block end with a colon:\nwhile guess != secret:",
      },
      extensionChallenge:
        "Redesign the skeleton into your own game: a trivia round, a story with choices, or a high-score chaser. Use at least one list, one function, and one loop.",
      reflectionQuestion:
        "You built a game out of the eight ideas from this program. Which week's idea did you lean on the most, and why?",
      teacherNotes:
        "Encourage a paper plan first: the goal, what the player types, and what the program says back. Because the game uses randomness, treat the expected output as one example. Celebrate small games that run over ambitious ones that do not. A short session where students play each other's games is a strong finish.",
    },
  ],
}

/** Path to the curriculum landing page. */
export const introToPythonPath = `/curriculums/${introToPythonCurriculum.slug}`

/** Path to the teacher/librarian resources page. */
export const introToPythonTeacherGuidePath = `${introToPythonPath}/teacher-guide`

/** Path to the printable student worksheets page. */
export const introToPythonWorksheetsPath = `${introToPythonPath}/worksheets`

/** URL slug for a given week, e.g. "week-1". */
export function introToPythonWeekSlug(week: number): string {
  return `week-${week}`
}

/** Path to a single week's lesson page. */
export function introToPythonWeekPath(week: number): string {
  return `${introToPythonPath}/${introToPythonWeekSlug(week)}`
}

/** Looks up a week by its 1-based number. */
export function getIntroToPythonWeek(week: number): CurriculumWeek | undefined {
  return introToPythonCurriculum.weeks.find((w) => w.week === week)
}

/** Parses a week slug like "week-3" into its week number, or null if invalid. */
export function parseIntroToPythonWeekSlug(slug: string): number | null {
  const match = /^week-(\d+)$/.exec(slug)
  if (!match) return null
  const week = Number(match[1])
  return getIntroToPythonWeek(week) ? week : null
}
