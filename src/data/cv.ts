// All CV content lives here. Edit this file to update the site.

export const profile = {
  name: "Gean T. Raz",
  firstLine: "Gean T.",
  secondLine: "Raz",
  title: "Full-stack web developer & junior game engineer",
  photo: "/imgs/profile.jpg",
  status: "Open to internships, OJT and freelance work",
  intro:
    "I'm a fourth-year BS Information Technology student at Davao del Norte State College. I build full-stack web apps, mobile apps and games: FastAPI and Next.js systems, Flutter clients, and Roblox worlds in Lua.",
  objective:
    "To join a development team as an intern or junior developer where I can ship real web systems, learn from experienced engineers, and grow into a full-stack role with a foot in game engineering.",
};

export const basicInfo = {
  location: "Davao del Norte, Philippines",
  email: "geanraz0721@gmail.com",
  // Add a number here if you want it shown, e.g. "+63 9XX XXX XXXX"
  phone: "",
  availability: "Available for remote or on-site work",
  description:
    "I like knowing how everything fits together, from the database to the deploy. When something breaks, I'd rather understand why than patch around it. That habit started with fixing and upgrading my own PC, which led to an NC II in Computer Systems Servicing, and carried over into code.",
  interests: [
    {
      title: "Web development",
      text: "My main field. Full-stack systems with clean APIs and responsive interfaces.",
    },
    {
      title: "Game engineering",
      text: "Mechanics, systems architecture and game pipelines in Lua and Roblox Studio.",
    },
    {
      title: "Data & AI tooling",
      text: "Data cleaning, analysis and AI-assisted workflows, as in my capstone, Smartalyze.",
    },
    {
      title: "IoT & hardware",
      text: "Small IoT builds and hands-on PC repair and upgrades, backed by an NC II in Computer Systems Servicing.",
    },
    {
      title: "Content creation",
      text: "Videos on YouTube documenting what I build and learn along the way.",
    },
  ],
};

export const education = [
  {
    school: "Davao del Norte State College (DNSC)",
    program: "Bachelor of Science in Information Technology",
    period: "Fourth year, BSIT 4-C",
    current: true,
    highlights: [
      "Capstone: Smartalyze, a data cleaning and analysis platform shipped as a web app and a Flutter mobile app",
      "Built and deployed final projects for Cybersecurity, Data Mining and IT415 (Application Development and Emerging Technologies)",
      "Pitched Smartalyze as a startup concept for Technopreneurship",
    ],
  },
  {
    school: "Panabo City Senior High School",
    program: "Senior High School, TVL-ICT strand (Computer Systems Servicing)",
    period: "Graduated 2023",
    current: false,
    highlights: ["Earned TESDA National Certificate II (NC II) in Computer Systems Servicing"],
  },
];

export type SkillGroup = {
  group: string;
  items: { name: string; icon?: string; core?: boolean }[];
};

// `core: true` = used in shipped projects; these get highlighted on the page.
export const skillGroups: SkillGroup[] = [
  {
    group: "Languages",
    items: [
      { name: "TypeScript", icon: "typescript", core: true },
      { name: "JavaScript", icon: "javascript", core: true },
      { name: "Python", icon: "python", core: true },
      { name: "Dart", icon: "dart", core: true },
      { name: "Lua", icon: "lua", core: true },
      { name: "PHP", icon: "php" },
      { name: "C++", icon: "cplusplus" },
      { name: "C#", icon: "dotnet" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
    ],
  },
  {
    group: "Frameworks & libraries",
    items: [
      { name: "Next.js", icon: "nextjs", core: true },
      { name: "React", icon: "react", core: true },
      { name: "FastAPI", icon: "fastapi", core: true },
      { name: "Flutter", icon: "flutter", core: true },
      { name: "Tailwind CSS", icon: "tailwind", core: true },
      { name: "Django", icon: "django" },
      { name: "Flask", icon: "flask" },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "pandas", icon: "pandas", core: true },
      { name: "scikit-learn", icon: "sklearn" },
    ],
  },
  {
    group: "Databases & deployment",
    items: [
      { name: "PostgreSQL", icon: "postgresql", core: true },
      { name: "Neon", icon: "neon", core: true },
      { name: "MySQL", icon: "mysql" },
      { name: "SQLite", icon: "sqlite" },
      { name: "Vercel", icon: "vercel", core: true },
      { name: "Render", icon: "render", core: true },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git", icon: "git", core: true },
      { name: "GitHub", icon: "github", core: true },
      { name: "VS Code", icon: "vscode" },
      { name: "Roblox Studio", icon: "roblox", core: true },
      { name: "Claude Code", icon: "claude" },
      { name: "Figma", icon: "figma" },
      { name: "PC hardware & servicing" },
    ],
  },
];

export const softSkills = [
  {
    name: "Problem solving",
    proof: "Debugging across the stack, from FastAPI routes to Flutter widgets to Lua game logic.",
  },
  {
    name: "Teamwork",
    proof: "Led team final projects and split work cleanly across web, mobile and backend repos.",
  },
  {
    name: "Communication",
    proof: "Presented and defended a capstone, pitched a startup concept, and explain my work on video.",
  },
  {
    name: "Self-directed learning",
    proof: "Picked up Flutter, FastAPI and Roblox Studio on my own to build what I wanted to make.",
  },
];

export type ProjectKind = "Web" | "Mobile" | "Game";

export type Project = {
  name: string;
  summary: string;
  role?: string;
  kinds: ProjectKind[];
  stack: string[];
  image?: string;
  imageAlt?: string;
  repo?: string;
  live?: string;
  status?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Smartalyze",
    featured: true,
    role: "Capstone project",
    summary:
      "A data cleaning and analysis platform for non-technical users. Upload a CSV, Excel or JSON file, or snap a photo of a printed table, then clean, explore, detect anomalies, forecast trends with linear regression, and export the results without writing code. Ships as a web app and a Flutter mobile app on one shared Postgres database.",
    kinds: ["Web", "Mobile"],
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "pandas", "PostgreSQL", "Flutter"],
    image: "/imgs/projects/smartalyze.png",
    imageAlt: "Smartalyze promotional website hero",
    repo: "https://github.com/raz-gean/Smartalyze-Web",
    live: "https://smartalyze-promotional-website.vercel.app/",
  },
  {
    name: "SizzleBites POS Kiosk",
    summary:
      "A touchscreen self-service kiosk for a food and dessert outlet. Customers browse five categories, build an order, pay by cash, QR or card, and receive a digital receipt. Built for the IT415 practical exam.",
    kinds: ["Web"],
    stack: ["React", "Vite", "Tailwind CSS"],
    image: "/imgs/projects/kiosk.png",
    imageAlt: "SizzleBites kiosk order screen with coffee menu",
    repo: "https://github.com/raz-gean/KioskiSystem_IT415",
    live: "https://kioskiapp-it415razeranalterado.vercel.app",
  },
  {
    name: "Secure Registration & Login",
    summary:
      "A full-stack authentication system for our Cybersecurity final project. Passwords are hashed with PBKDF2-HMAC-SHA256 at 260,000 iterations, with a per-user salt, a server-side pepper, constant-time comparison and JWT sessions.",
    kinds: ["Web"],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "JWT"],
    image: "/imgs/projects/cybersec.png",
    imageAlt: "Dark sign-in screen of the CyberSec Auth system",
    live: "https://cyber-security-team-raz-final-proj.vercel.app",
  },
  {
    name: "Showspree",
    summary:
      "A movie discovery site powered by the TMDB API. Browse trending films, search by title or genre, and open full details with cast, ratings and trailers.",
    kinds: ["Web"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "TMDB API"],
    image: "/imgs/projects/showspree.png",
    imageAlt: "Showspree home page with trending movies",
    repo: "https://github.com/raz-gean/Showspree",
  },
  {
    name: "Death Valley",
    status: "In development",
    summary:
      "A tactical Roblox dueling game: hunt or be hunted. Players stalk each other across varied terrain, using camouflage, cover, sound and decoys to get the upper hand.",
    kinds: ["Game"],
    stack: ["Roblox Studio", "Lua", "Game design"],
    image: "/imgs/projects/death-valley.png",
    imageAlt: "Death Valley key art: a crosshair over a Roblox character, captioned Hunt? Hunted?",
  },
  {
    name: "FindMed",
    summary:
      "A Flutter mobile app for finding and tracking medicines, with shortcuts for quick lookups. A second version stores data locally with SQLite.",
    kinds: ["Mobile"],
    stack: ["Flutter", "Dart", "SQLite"],
    repo: "https://github.com/raz-gean/Flutter_FindMed",
  },
];

export const experience = [
  {
    role: "Freelance workflow developer",
    org: "Remote, private client",
    period: "2026 – present",
    points: [
      "Build Python tooling and AI-assisted pipelines that plan, draft and validate long-form fiction manuscripts",
      "Wrote automated checks for continuity, length, repetition and rule violations",
      "Six manuscripts delivered through the pipeline and approved by the client",
    ],
  },
  {
    role: "Full-stack developer, Smartalyze capstone",
    org: "Davao del Norte State College",
    period: "2025 – 2026",
    points: [
      "Built the Next.js frontend and FastAPI backend, including OCR table import, dataset versioning and ML forecasting",
      "Separated a Flutter mobile client sharing the same Neon Postgres database",
      "Deployed the backend on Render and the frontend and promo site on Vercel",
    ],
  },
  {
    role: "Team lead, final projects",
    org: "Cybersecurity and Data Mining courses",
    period: "2026",
    points: [
      "Led Team Raz through a deployed secure authentication system and a data mining lesson video series",
      "Split the work, reviewed code and assembled the final documentation and videos",
    ],
  },
  {
    role: "Content creator",
    org: "YouTube, @GeanDev",
    period: "Ongoing",
    points: ["Record honest, unpolished videos documenting what I build and learn"],
  },
];

export const achievements = [
  {
    title: "Capstone completed: Smartalyze",
    detail: "Web and mobile data analysis platform, BSIT capstone at DNSC.",
    year: "2026",
  },
  {
    title: "Technopreneurship pitch",
    detail: "Pitched Smartalyze Mobile as a startup concept.",
    year: "2026",
  },
  {
    title: "Cybersecurity final project",
    detail: "Deployed a hardened registration and login system with PBKDF2, salt and pepper.",
    year: "2026",
  },
  {
    title: "Data Mining final project",
    detail: "Produced a lesson video series demonstrating four data mining techniques with Smartalyze.",
    year: "2026",
  },
  {
    title: "IT415 practical exam",
    detail: "Fully implemented and deployed the SizzleBites POS kiosk.",
    year: "2026",
  },
];

// Add certificates, seminars, trainings or workshops here; the list only shows when non-empty.
export const certifications: { title: string; issuer: string; year: string; link?: string }[] = [
  {
    title: "NC II in Computer Systems Servicing",
    issuer: "TESDA, earned at Panabo City Senior High School",
    year: "2023",
  },
];

export const links = {
  github: { label: "GitHub", handle: "raz-gean", href: "https://github.com/raz-gean" },
  linkedin: { label: "LinkedIn", handle: "in/GeanRaz", href: "https://linkedin.com/in/GeanRaz" },
  facebook: { label: "Facebook", handle: "gean.raz", href: "https://facebook.com/gean.raz" },
  youtube: { label: "YouTube", handle: "@GeanDev", href: "https://youtube.com/@GeanDev" },
};

export const githubUser = "raz-gean";
