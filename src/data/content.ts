export interface Profile {
  name: string;
  short: string;
  brand: string;
  role: string;
  discipline: string[];
  location: string;
  email: string;
  support: string;
  statement: string[];
  metrics: { value: string; label: string }[];
  socials: { github: string; linkedin: string; telegram?: string; portfolio: string };
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
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
  support:
    "AI engineer building intelligent systems at the edge — deep learning, LLM tooling and low-latency cloud platforms. Software shouldn't merely function — it should possess intelligence, razor-sharp speed and aesthetic precision.",
  statement: ["I BUILD", "DIGITAL", "SYSTEMS."],
  metrics: [
    { value: "12+", label: "Production systems" },
    { value: "8+", label: "Model architectures" },
    { value: "45+", label: "OSS contributions" },
    { value: "<120MS", label: "Edge latency" },
  ],
  socials: {
    github: "https://github.com/nfsprogramming",
    linkedin: "https://linkedin.com/in/nfsprogramming",
    telegram: "https://t.me/nfsprogramming",
    portfolio: "https://nifras-dark-room.vercel.app",
  },
};

export const projects: Project[] = [
  {
    id: "purescan-ai",
    index: "01",
    title: "PureScan AI",
    subtitle: "Edge AI document intelligence — privacy-first mobile scanner",
    summary:
      "High-performance edge scanner running on-device computer vision and neural OCR to extract, classify and sanitize documents — zero telemetry, zero cloud, sub-50ms latency.",
    tag: "EDGE AI",
    role: "Full-Stack & ML Engineer",
    status: "LIVE",
    year: "2026",
    stack: ["Flutter", "TFLite", "OpenCV", "FastAPI"],
    accent: "#00f0ff",
    github: "https://github.com/nfsprogramming/PureScan-AI",
  },
  {
    id: "sattam-ai",
    index: "02",
    title: "Sattam AI",
    subtitle: "Multilingual legal intelligence — case law copilot",
    summary:
      "Legal knowledge retrieval and jurisprudence reasoning engine parsing statutory acts, synthesizing litigation briefs and translating complex clauses across regional languages.",
    tag: "LEGAL",
    role: "AI Engineer",
    status: "LIVE",
    year: "2026",
    stack: ["Next.js", "LangChain", "Vector RAG", "ChromaDB"],
    accent: "#00e599",
    github: "https://github.com/nfsprogramming/Sattam-AI",
  },
  {
    id: "aditya-l1",
    index: "03",
    title: "Aditya-L1 Nowcast",
    subtitle: "Space weather deep learning on ISRO satellite data",
    summary:
      "Deep learning research pipeline analyzing X-ray flux time-series from ISRO's Aditya-L1 solar observatory to nowcast M- and X-class coronal mass ejections up to 12 hours ahead.",
    tag: "SOLAR",
    role: "Deep Learning Researcher",
    status: "RESEARCH",
    year: "2025—26",
    stack: ["PyTorch", "LSTM-Transformer", "SciPy", "XSM Data"],
    accent: "#ffb703",
    github:
      "https://github.com/nfsprogramming/Solar-flare-forecasting-nowcasting-using-Aditya-L1-X-ray-data",
  },
  {
    id: "resume-analyzer",
    index: "04",
    title: "Smart Resume Analyzer",
    subtitle: "Neural ATS parsing — semantic skill matching",
    summary:
      "AI recruitment engine analyzing applicant CVs against job descriptions using transformer embeddings, keyword density scoring and automated improvement suggestions.",
    tag: "ATS",
    role: "NLP Engineer",
    status: "LIVE",
    year: "2026",
    stack: ["React", "FastAPI", "SpaCy", "Hugging Face"],
    accent: "#8a2be2",
    github: "https://github.com/nfsprogramming/AI-Smart-Perfomance-Anlayzer",
  },
  {
    id: "dynamic-island",
    index: "05",
    title: "Dynamic Island",
    subtitle: "Hardware cutout-anchored notification & media pill",
    summary:
      "Native Android service anchoring a persistent interactive pill to camera cutouts — spring-physics expansion, media state awareness and zero idle battery drain.",
    tag: "ANDROID",
    role: "Android Engineer",
    status: "LIVE",
    year: "2026",
    stack: ["Kotlin", "Accessibility API", "WindowInsets", "Gradle"],
    accent: "#00f0ff",
    github: "https://github.com/nfsprogramming/Dynamic-Island",
  },
  {
    id: "telegram-drive",
    index: "06",
    title: "Telegram Drive",
    subtitle: "Encrypted cloud storage on MTProto infrastructure",
    summary:
      "Zero-cost distributed storage using Telegram as a chunked binary backend — client-side AES-256 GCM encryption before transmission, instant streaming previews.",
    tag: "CLOUD",
    role: "Systems Engineer",
    status: "LIVE",
    year: "2026",
    stack: ["Node.js", "MTProto", "AES-256", "React"],
    accent: "#00e599",
    github: "https://github.com/nfsprogramming",
  },
];

export const stackRows: string[][] = [
  ["REACT", "NEXT.JS", "TYPESCRIPT", "GO", "PYTHON", "FLUTTER", "FASTAPI", "POSTGRESQL"],
  ["PYTORCH", "TENSORFLOW LITE", "OPENCV", "LANGCHAIN", "SUPABASE", "WEBGL", "GSAP", "DOCKER"],
];

export const marqueeWords = [
  "BUILD",
  "BREAK",
  "REBUILD",
  "EXPERIMENT",
  "SHIP",
  "REPEAT",
];
