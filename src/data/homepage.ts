// Homepage copy for the redesign. Facts (projects, links, covers, experience) still
// come from portfolioData.ts; this file only holds the tightened wording, curated
// tags and the [placeholders] still to be filled in.

export const links = {
  email: "bisunajaime@gmail.com",
  resume: "/files/JaimeBisunaResume.pdf",
  github: "https://github.com/bisunajaime",
  linkedin: "https://www.linkedin.com/in/jose-jaime-bisuna",
};

export const hero = {
  //   keeps "Bisuña —" together; ‑ is a non-breaking hyphen so "full-stack" never splits.
  headline: "Hi, I'm Jaime Bisuña — a full‑stack developer building web and mobile products.",
  lead: "5+ years shipping React, TypeScript and .NET/C# apps and the APIs behind them. Lately I build AI-assisted tools. Based in Metro Manila, Philippines.",
};

export const work = {
  intro: "Recent projects I built. All six are AI-assisted.",
  featuredCount: 6,
};

const RESULT_PLACEHOLDER = "[Add project result here]";

/** Card copy for featured projects, keyed by project name in portfolioData. */
/** coverSmall: optional 800w copy of cover_img for phones and 1x screens. */
export const projectCopy: Record<string, { summary: string; tags: string[]; result?: string; coverSmall?: string }> = {
  Unlockr: {
    coverSmall: "/assets/images/unlockr/cover-800.webp",
    summary: "Paste a paywalled article link and read it clean. Unlockr finds a free copy in public archives, with an AI assistant that summarizes it and answers follow-up questions.",
    tags: ["Next.js", "TypeScript", "OpenRouter", "ComfyUI"],
  },
  FitForge: {
    coverSmall: "/assets/images/fitforge/cover-800.webp",
    summary: "A private AI fitting room. Upload a photo, add screenshots of clothes you like, and see the whole outfit on you — then restyle it with a sentence. Runs on your own machine.",
    tags: ["React", "TypeScript", "FastAPI", "ComfyUI"],
  },
  "Branching Tales": {
    coverSmall: "/assets/images/branchingtales/cover-800.webp",
    summary: "Illustrated choose-your-own-adventure stories. Pick a protagonist, make choices the story remembers, and find every ending — each tale drawn in its own art style.",
    tags: ["Next.js", "TypeScript", "ComfyUI", "Cloudflare R2"],
  },
  PackPal: {
    coverSmall: "/assets/images/packpal/cover-800.webp",
    summary: "A travel packing list generator. Say where you're going and what you'll do, and get a weather-aware list plus an AI trip assistant to fine-tune it.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Clerk"],
  },
  PlateLoad: {
    coverSmall: "/assets/images/plateload/cover-800.webp",
    summary: "A mobile-first barbell plate calculator. Enter a target weight and it finds every symmetric way to load it with the plates your gym actually owns.",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS"],
  },
  "Greenwash Laundry POS": {
    coverSmall: "/assets/images/greenwash/cover-800.webp",
    summary: "A point-of-sale system for a laundry business: admin dashboard, real-time order updates, and a Flutter app for Android tablets.",
    tags: ["React", "Node.js", "PostgreSQL", "Flutter"],
  },
};

export const resultPlaceholder = RESULT_PLACEHOLDER;
export const missingDemoPlaceholder = "[Add demo link]";

/** One-line copy for "Earlier work"; projects sharing a label (the two NeedL apps) collapse into one row. */
export const earlierCopy: Record<string, { label: string; line: string }> = {
  Wallection: { label: "Wallection", line: "A directory of wallpapers I generate locally with ComfyUI." },
  "NeedL - Patient": { label: "NeedL", line: "Two mobile apps: patients book lab tests at nearby clinics; medtechs manage bookings and reports." },
  "NeedL - Medtech": { label: "NeedL", line: "Two mobile apps: patients book lab tests at nearby clinics; medtechs manage bookings and reports." },
  Cinemalist: { label: "Cinemalist", line: "Trending movies, TV shows and actors from the TMDB API. Published on Google Play." },
  "Hlobe@Gome": { label: "Hlobe@Gome", line: "Speed, data usage and connected devices for Huawei-based home routers like Globe@Home." },
  "Task Management Board": { label: "Task Management Board", line: "A Jira/Trello-style board with drag and drop, built with React and Redux." },
  "Spotify Clone": { label: "Spotify Clone", line: "Music browsing and playlist management, built with React and Context API." },
  "FlutterPH #UIChallenge": { label: "FlutterPH #UIChallenge", line: "An online store UI built in Flutter for the FlutterPH community challenge." },
  "Covid19-Tracker": { label: "Covid19-Tracker", line: "Case counts and status by country, built during the COVID-19 quarantine." },
};

export const impactPlaceholder = "[Add what you shipped here — 1–2 lines on impact]";

export const about = {
  paragraphs: [
    "I focus on dependable architecture, accessible UI, and shipping features that solve real user problems — clean UI systems on the front, reliable APIs behind them.",
    "Lately I build AI-assisted apps that run on local models: image generation with ComfyUI on my own workstation, and assistants through OpenRouter.",
  ],
  skills: [
    { label: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "SASS", "Tailwind CSS", "Bootstrap", "Material Design"] },
    { label: "Mobile", items: ["React Native", "Flutter/Dart"] },
    { label: "Backend & data", items: ["Node", "Express", "Java", "C#", "ASP.NET Core", "PHP", "Laravel", "Python", "FastAPI", "RESTful API", "MySQL", "MSSQL", "PostgreSQL", "Firebase"] },
    { label: "Tools", items: ["Git", "GitHub", "Jira", "Trello", "Postman", "Netlify", "Vercel", "Microsoft Azure", "MS Teams Development", "ComfyUI"] },
    { label: "Design", items: ["Figma", "AdobeXD"] },
  ],
};

export const contact = {
  heading: "Let's build something useful.",
  body: "Email is the fastest way to reach me.",
};

export const footer = {
  location: "Metro Manila, Philippines",
};
