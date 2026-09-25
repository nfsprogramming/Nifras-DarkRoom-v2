export interface Profile {
  name: string;
  short: string;
  brand: string;
  role: string;
  discipline: string[];
  location: string;
  email: string;
  statement: string[];
  aboutHeadline: string[];
  aboutDetails: { label: string; text: string }[];
  socials: { github: string; linkedin: string; telegram?: string; portfolio: string };
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  idea?: string;
  arch?: string[];
  figures?: string[];
  tag: string;
  role: string;
  status: string;
  year: string;
  stack: string[];
  accent: string;
  github?: string;
}

export const profile: Profile = {
  name: "Mohamed Nifras S S",
  short: "NIFRAS",
  brand: "NFS",
  role: "AI & DATA SCIENCE",
  discipline: ["DEVELOPER", "BUILDER", "EXPERIMENTER"],
  location: "COIMBATORE / INDIA",
  email: "mohamednifras.nfs@gmail.com",
  statement: ["BUILDING DIGITAL SYSTEMS", "THAT THINK, MOVE AND SCALE."],
  aboutHeadline: ["CURIOUS BY DEFAULT.", "BUILDING BY CHOICE."],
  aboutDetails: [
    {
      label: "EDUCATION",
      text: "B.Tech — AI & Data Science. Building for the campus that taught me: the DSCE App started as a student need.",
    },
    {
      label: "CURRENT FOCUS",
      text: "Local AI. On-device inference, LLM tooling, and systems that think at the edge.",
    },
    {
      label: "DEVELOPMENT INTERESTS",
      text: "System design, latency budgets, motion, and interfaces that feel engineered rather than assembled.",
    },
    {
      label: "AI INTERESTS",
      text: "LLM fine-tuning, RAG pipelines, time-series forecasting, computer vision.",
    },
    {
      label: "HARDWARE EXPERIMENTATION",
      text: "Android internals, sensors, single-board computers — software that talks to physical devices.",
    },
    {
      label: "OPEN SOURCE",
      text: "45+ public repositories — tools, experiments and production systems.",
    },
  ],
  socials: {
    github: "https://github.com/nfsprogramming",
    linkedin: "https://linkedin.com/in/nfsprogramming",
    telegram: "https://t.me/nfsprogramming",
    portfolio: "https://nifras-dark-room-v2.vercel.app",
  },
};

export const projects: Project[] = [
  {
    id: "techaa-purinjikoo",
    index: "01",
    title: "Techaa Purinjikoo",
    subtitle: "AI-POWERED LEARNING PLATFORM",
    summary:
      "Adaptive learning platform that personalizes study paths, grades instantly and speaks the learner's language.",
    challenge:
      "Static, one-size-fits-all content — learners disengage long before they progress.",
    solution:
      "Adaptive engine in Go with per-learner state, realtime sync on Supabase, and a Flutter front-end.",
    result: "Personalized learning loops running in production for real students.",
    idea: "Learning should feel less like studying and more like exploring.",
    arch: ["FLUTTER", "GO API", "SUPABASE", "LEARNING SYSTEM"],
    figures: [
      "FIRST PROTOTYPE",
      "SYSTEM ARCHITECTURE",
      "THE INTERFACE",
      "ADAPTIVE PATHS",
    ],
    tag: "EDU",
    role: "FULL-STACK / AI",
    status: "LIVE",
    year: "2026",
    stack: ["FLUTTER", "GO", "SUPABASE"],
    accent: "#b6ff2e",
  },
  {
    id: "dsce-app",
    index: "02",
    title: "DSCE App",
    subtitle: "FULL-STACK COLLEGE ECOSYSTEM",
    summary:
      "The campus in one app — attendance, notes, events and communication for the whole college.",
    challenge:
      "Campus life scattered across five disconnected systems that never talked to each other.",
    solution:
      "Unified Flutter app on FastAPI + PostgreSQL — one identity, one feed, every service.",
    result: "A daily-driver ecosystem used across the college.",
    tag: "CAMPUS",
    role: "FULL-STACK",
    status: "LIVE",
    year: "2025",
    stack: ["FLUTTER", "FASTAPI", "POSTGRESQL"],
    accent: "#00f0ff",
  },
  {
    id: "calyxion-studio",
    index: "03",
    title: "Calyxion Studio",
    subtitle: "COLLABORATIVE DEVELOPMENT ENVIRONMENT",
    summary:
      "A shared workspace where builders prototype, review and ship together in realtime.",
    challenge: "Creative teams lose context jumping between tools to collaborate.",
    solution:
      "Realtime collaborative environment — Next.js front, Go services, WebRTC channels.",
    result: "Early builds in active testing with collaborating builders.",
    idea: "A development environment built around collaboration.",
    arch: ["NEXT.JS", "GO SERVICES", "WEBRTC CHANNELS", "CRDT STATE"],
    figures: [
      "WORKSPACE CONCEPT",
      "REALTIME ARCHITECTURE",
      "COLLABORATION UI",
      "THE WORKSPACE",
    ],
    tag: "COLLAB",
    role: "FULL-STACK",
    status: "BUILDING",
    year: "2026",
    stack: ["NEXT.JS", "GO", "WEBRTC"],
    accent: "#8a2be2",
  },
  {
    id: "terramesh-ai",
    index: "04",
    title: "TerraMesh AI",
    subtitle: "MINE SAFETY INTELLIGENCE",
    summary:
      "Edge-deployed vision and sensing that watches for hazards before they become incidents.",
    challenge: "Mines are dangerous precisely because monitoring is manual, delayed and offline.",
    solution:
      "Edge AI pipeline — PyTorch detection models running on local hardware, alerting in realtime.",
    result: "Research-stage hazard detection running on edge devices.",
    idea: "Turning underground uncertainty into measurable signals.",
    arch: ["SENSOR NODES", "LORA MESH", "EDGE GATEWAY", "PYTORCH MODELS", "RISK ENGINE"],
    figures: [
      "MINE MAP",
      "SENSOR NODE",
      "EDGE PREDICTION",
      "RISK VISUALIZATION",
    ],
    tag: "SAFETY",
    role: "AI ENGINEER",
    status: "RESEARCH",
    year: "2026",
    stack: ["PYTORCH", "EDGE AI", "GO"],
    accent: "#ffb703",
  },
  {
    id: "nfs-smartshare",
    index: "05",
    title: "NFS SmartShare",
    subtitle: "LOCAL FILE SHARING SYSTEM",
    summary:
      "Zero-internet file movement across devices on the same network — no servers, no accounts.",
    challenge: "Sharing files offline still means cables, clunky apps or cloud round-trips.",
    solution:
      "Go discovery and transfer layer with a Flutter interface — pure local-network protocol.",
    result: "Experimental builds moving files with no internet at all.",
    tag: "LOCAL",
    role: "SYSTEMS",
    status: "EXPERIMENTAL",
    year: "2026",
    stack: ["GO", "FLUTTER", "MDNS"],
    accent: "#00e599",
  },
  {
    id: "sattam-ai",
    index: "06",
    title: "SattamAI",
    subtitle: "MULTILINGUAL LEGAL INTELLIGENCE",
    summary:
      "Legal knowledge retrieval and reasoning engine that parses statutes, synthesizes briefs and translates clauses across regional languages.",
    challenge: "Legal knowledge is locked in statutes, precedent and language most people can't parse.",
    solution:
      "Hybrid dense-sparse RAG over thousands of rulings with multilingual translation.",
    result: "94.8% clause-level semantic accuracy in retrieval testing.",
    tag: "LEGAL",
    role: "AI ENGINEER",
    status: "LIVE",
    year: "2026",
    stack: ["NEXT.JS", "LANGCHAIN", "CHROMADB"],
    accent: "#00e599",
    github: "https://github.com/nfsprogramming/Sattam-AI",
  },
  {
    id: "dynamic-island",
    index: "07",
    title: "Dynamic Island",
    subtitle: "ANDROID SYSTEM UI EXPERIMENT",
    summary:
      "Native Android service anchoring a persistent interactive pill to the hardware cutout — spring physics, media state, zero idle drain.",
    challenge: "Android cutouts were dead pixels — everyone simply accepted the hole.",
    solution:
      "WindowInsets-anchored pill with spring physics, media session awareness and accessibility integration.",
    result: "0% idle battery drain — a system UI layer that feels native.",
    tag: "ANDROID",
    role: "ANDROID ENGINEER",
    status: "LIVE",
    year: "2026",
    stack: ["KOTLIN", "WINDOWINSETS", "GRADLE"],
    accent: "#00f0ff",
    github: "https://github.com/nfsprogramming/Dynamic-Island",
  },
  {
    id: "scholar-ai",
    index: "08",
    title: "Scholar AI",
    subtitle: "OFFLINE KNOWLEDGE SYSTEM",
    summary:
      "A knowledge engine that runs entirely on-device — study anywhere, no connection required.",
    challenge: "Students without stable internet get locked out of modern AI tools.",
    solution: "Quantized local models with on-device RAG over curated material.",
    result: "Building toward fully offline AI tutoring.",
    idea: "Knowledge without the cloud.",
    arch: ["CURATED MATERIAL", "LOCAL RAG", "QUANTIZED MODEL", "DEVICE"],
    figures: [
      "THE READING VIEW",
      "LOCAL PIPELINE",
      "MODEL QUANTIZATION",
      "OFFLINE SYNC",
    ],
    tag: "KNOWLEDGE",
    role: "AI / MOBILE",
    status: "BUILDING",
    year: "2026",
    stack: ["FLUTTER", "TFLITE", "RAG"],
    accent: "#b6ff2e",
  },
  {
    id: "mineguard",
    index: "09",
    title: "MineGuard",
    subtitle: "MINING SAFETY PLATFORM",
    summary:
      "The safety net around TerraMesh — dashboards, alerting and response coordination for hazardous sites.",
    challenge: "Detection without response coordination doesn't save lives.",
    solution: "Central platform aggregating edge signals into actionable, routed alerts.",
    result: "Research collaboration exploring deployment paths.",
    tag: "SAFETY",
    role: "FULL-STACK / AI",
    status: "RESEARCH",
    year: "2026",
    stack: ["PYTORCH", "FASTAPI", "DOCKER"],
    accent: "#ff7043",
  },
];

export const labItems = [
  {
    code: "LAB_001",
    title: "LOCAL AI",
    desc: "On-device inference. Quantized TFLite, sub-120ms pipelines, zero cloud.",
  },
  {
    code: "LAB_002",
    title: "WEBGL",
    desc: "Raw GLSL. fbm fields, liquid metal, GPU atmospherics.",
  },
  {
    code: "LAB_003",
    title: "ANDROID",
    desc: "System UI hacking. WindowInsets, cutouts, overlay services.",
  },
  {
    code: "LAB_004",
    title: "EDGE COMPUTING",
    desc: "Inference where the data lives. Sensors to signal in milliseconds.",
  },
  {
    code: "LAB_005",
    title: "AI SYSTEMS",
    desc: "LLM fine-tuning, RAG pipelines, autonomous agents.",
  },
];

export const labTags = [
  "COMPUTER VISION",
  "GENERATIVE UI",
  "SYSTEM DESIGN",
  "HARDWARE",
  "SPACE WEATHER",
];

export const technologies = [
  { n: "01", name: "AI / ML", desc: "PyTorch, fine-tuning, RAG, time-series" },
  { n: "02", name: "FLUTTER", desc: "Cross-platform with native-grade performance" },
  { n: "03", name: "GO", desc: "Typed, fast, boringly reliable backends" },
  { n: "04", name: "TYPESCRIPT", desc: "From interfaces to tooling — everywhere" },
  { n: "05", name: "ANDROID", desc: "Kotlin, system UI, deep platform access" },
  { n: "06", name: "SUPABASE", desc: "Postgres, auth, realtime — instant backends" },
  { n: "07", name: "WEBGL", desc: "Shaders, GPU pipelines, raw performance" },
  { n: "08", name: "NVIDIA NIM", desc: "Local inference microservices" },
  { n: "09", name: "LINUX", desc: "Daily driver, servers, automation" },
  { n: "10", name: "DOCKER", desc: "Reproducible environments everywhere" },
];

export const journey = [
  {
    year: "2024",
    event: "STARTED BUILDING",
    desc: "First production apps shipped. Flutter, fundamentals, and the itch to go deeper.",
  },
  {
    year: "2025",
    event: "FULL-STACK + MOBILE",
    desc: "Go, FastAPI, PostgreSQL. Native Android experiments. The DSCE App goes campus-wide.",
  },
  {
    year: "2026",
    event: "AI / LOCAL AI / SYSTEMS",
    desc: "LLM fine-tuning, RAG, on-device inference. Production AI systems that think at the edge.",
  },
  {
    year: "2026+",
    event: "BUILDING BIGGER SYSTEMS",
    desc: "Mine safety intelligence, collaborative environments, offline knowledge. The dark room expands.",
  },
];

export const building = [
  { name: "SCHOLAR AI", desc: "Offline knowledge system", status: "BUILDING" },
  { name: "TERRAMESH AI", desc: "Mine safety intelligence", status: "RESEARCH" },
  { name: "CALYXION STUDIO", desc: "Collaborative development environment", status: "BUILDING" },
  { name: "NFS SMARTSHARE", desc: "Local file sharing system", status: "EXPERIMENTAL" },
  { name: "DYNAMIC ISLAND", desc: "Android system UI experiment", status: "LIVE" },
];

export const marqueeWords = [
  "BUILD",
  "BREAK",
  "REBUILD",
  "EXPERIMENT",
  "SHIP",
  "REPEAT",
];

export const chapters = [
  { n: "00", id: "top", label: "ENTER THE ROOM" },
  { n: "01", id: "intro", label: "WHO I AM" },
  { n: "02", id: "story", label: "WHY I BUILD" },
  { n: "03", id: "build", label: "FIRST EXPERIMENTS" },
  { n: "04", id: "work", label: "THE WORK" },
  { n: "05", id: "process", label: "HOW I BUILD" },
  { n: "06", id: "tech", label: "THE SYSTEMS" },
  { n: "07", id: "failures", label: "THE FAILURES" },
  { n: "08", id: "lab", label: "THE LAB" },
  { n: "09", id: "building", label: "RIGHT NOW" },
  { n: "10", id: "next", label: "WHAT'S NEXT" },
  { n: "11", id: "contact", label: "LET'S BUILD" },
];

export const caseStudyIds = [
  "techaa-purinjikoo",
  "terramesh-ai",
  "calyxion-studio",
  "scholar-ai",
];

export const introStory =
  "I started by taking things apart. Not because I always knew how they worked, but because I wanted to know what was behind them. That curiosity slowly turned into code, systems, interfaces and experiments.";

export const storyChapters = [
  {
    n: "01",
    title: "THE BEGINNING",
    text: "THE FIRST THING I LEARNED WAS THAT BUILDING IS A FORM OF CURIOSITY.",
    body: "Not the tutorials. Not the syntax. The act of making something exist that didn't exist an hour before — that was the hook.",
  },
  {
    n: "02",
    title: "THE SHIFT",
    text: "LEARNING TECHNOLOGY WAS NEVER THE GOAL. BUILDING WITH IT WAS.",
    body: "At some point the question flipped — from \"how does this work?\" to \"what can I build with it?\" — and everything after that became products instead of notes.",
  },
  {
    n: "03",
    title: "THE SYSTEMS",
    text: "THE CURIOSITY SCALED UP.",
    body: "From single apps to full systems. The surface kept changing — but the question underneath stayed the same: what's behind this, and can I build it better?",
    list: ["AI", "FULL STACK", "MOBILE", "SYSTEM DESIGN", "HARDWARE", "LOCAL AI"],
  },
];

export const buildWords = [
  "APPS.",
  "SYSTEMS.",
  "AI.",
  "INTERFACES.",
  "TOOLS.",
  "EXPERIMENTS.",
];

export const archiveExtra = [
  { name: "BANKLINK", year: "2025", category: "FINTECH", status: "ARCHIVED" },
  { name: "DONATE HUB", year: "2025", category: "PLATFORM", status: "ARCHIVED" },
  { name: "INVITO", year: "2025", category: "EVENTS", status: "ARCHIVED" },
];

export const processSteps = [
  { n: "01", word: "QUESTION", quote: "What exactly are we trying to solve?" },
  { n: "02", word: "EXPLORE", quote: "Understand the problem before writing the solution." },
  { n: "03", word: "DESIGN", quote: "Turn the idea into an experience." },
  { n: "04", word: "BUILD", quote: "Make the system real." },
  { n: "05", word: "BREAK", quote: "Find what doesn't work." },
  { n: "06", word: "REFINE", quote: "Remove everything unnecessary." },
  { n: "07", word: "SHIP", quote: "Put it into the real world." },
];

export const workbenchLabels = [
  { text: "CODE", pos: "left-[6%] top-[16%]" },
  { text: "DESIGN", pos: "right-[8%] top-[24%]" },
  { text: "TEST", pos: "right-[4%] top-[58%]" },
  { text: "BREAK", pos: "right-[14%] bottom-[12%]" },
  { text: "REBUILD", pos: "left-[10%] bottom-[16%]" },
  { text: "SHIP", pos: "left-[38%] top-[6%]" },
];

export const xrayLayers = [
  { name: "FRONTEND", tech: "REACT / FLUTTER", purpose: "What the user touches", role: "INTERFACE" },
  { name: "API", tech: "GO / FASTAPI", purpose: "Where requests become logic", role: "ORCHESTRATION" },
  { name: "DATABASE", tech: "POSTGRESQL / SUPABASE", purpose: "Where state survives", role: "MEMORY" },
  { name: "AI", tech: "PYTORCH / TFLITE", purpose: "Where the system thinks", role: "INTELLIGENCE" },
  { name: "INFRASTRUCTURE", tech: "DOCKER / LINUX", purpose: "Where everything runs", role: "FOUNDATION" },
];

export const failureStatements = [
  "THE FIRST VERSION WAS TOO COMPLEX.",
  "THE UI LOOKED GOOD BUT FELT SLOW.",
  "THE MODEL WAS TOO LARGE.",
  "THE ARCHITECTURE HAD TO CHANGE.",
  "THE FIRST IDEA WASN'T THE FINAL IDEA.",
];

export const rightNowStatements = [
  "BUILDING AI SYSTEMS.",
  "EXPLORING LOCAL MODELS.",
  "EXPERIMENTING WITH HARDWARE.",
  "DESIGNING BETTER INTERFACES.",
  "LEARNING SOMETHING NEW.",
];

export const futureList = [
  "LOCAL AI",
  "ROBOTICS",
  "EDGE COMPUTING",
  "ADVANCED 3D INTERFACES",
  "AI AGENTS",
  "SYSTEM DESIGN",
];

export const wallItems = [
  { label: "[ ARCHIVE / 001 ]", fig: "FIG. 01", caption: "DSCE APP — ATTENDANCE VIEW", meta: "2025" },
  { label: "[ ARCHIVE / 002 ]", fig: "FIG. 02", caption: "TERRAMESH — MINE MAP", meta: "2026" },
  { label: "[ ARCHIVE / 003 ]", fig: "FIG. 03", caption: "CODE — GO SERVICES", meta: "2026" },
  { label: "[ ARCHIVE / 004 ]", fig: "FIG. 04", caption: "HARDWARE — SENSOR NODE", meta: "2026" },
  { label: "[ ARCHIVE / 005 ]", fig: "FIG. 05", caption: "WEBGL — SHADER STUDY", meta: "2026" },
  { label: "[ ARCHIVE / 006 ]", fig: "FIG. 06", caption: "CALYXION — WORKSPACE UI", meta: "2026" },
  { label: "[ ARCHIVE / 007 ]", fig: "FIG. 07", caption: "SCHOLAR — READING VIEW", meta: "2026" },
  { label: "[ ARCHIVE / 008 ]", fig: "FIG. 08", caption: "NFS — THE ROOM", meta: "2026" },
];

export const finalNote =
  "This website is not a finished resume. It is a snapshot of what I'm building, what I'm learning, and where curiosity takes me next.";
