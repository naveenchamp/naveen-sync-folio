// ============================================================
// Centralized Portfolio Configuration
// ============================================================
import portfolioImg from "@/assets/project-portfolio.jpg";
import weatherImg from "@/assets/project-weather.jpg";
import cricketImg from "@/assets/project-cricket.jpg";

export const PERSONAL_INFO = {
  name: "Naveen Reddy Tippasani",
  brandName: "Naveen.dev",
  title: "Full Stack Developer & AI Builder",
  tagline: "Building the future through code, creativity, and curiosity.",
  heroHeadline: "Building AI-Powered Products & Modern Digital Experiences.",
  heroSubtext:
    "Full Stack Developer and AI Builder transforming ideas into scalable digital products.",
  location: "Kakinada, Andhra Pradesh, India",
  phone: "9390661948",
  email: "naveenreddytippasani777.7@gmail.com",
  github: "https://github.com/naveenchamp",
  githubUsername: "naveenchamp",
  linkedin: "https://www.linkedin.com/in/naveen-reddy-tippasani-5500402a5/",
  youtube: "",
  resumePath: "/naveen-resume.pdf",
  resumeFilename: "Naveen_Reddy_Tippasani_Resume.pdf",
  openToWork: true,
} as const;

export const NAV_ITEMS = [
  { href: "#journey", label: "Journey" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#projects", label: "Projects" },
  { href: "#ai-lab", label: "AI Lab" },
  { href: "#skills", label: "Skills" },
  { href: "#ask-ai", label: "Ask AI" },
  { href: "#contact", label: "Contact" },
] as const;

export interface Skill { name: string; }
export interface SkillCategory { category: string; icon: string; skills: Skill[]; }

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Python" },
      { name: "REST APIs" },
      { name: "Authentication" },
    ],
  },
  {
    category: "AI & Automation",
    icon: "🧠",
    skills: [
      { name: "OpenAI APIs" },
      { name: "Prompt Engineering" },
      { name: "Workflow Design" },
      { name: "AI Integrations" },
    ],
  },
  {
    category: "Databases",
    icon: "🗄️",
    skills: [
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Firebase" },
      { name: "SQL" },
    ],
  },
  {
    category: "Cloud & Deploy",
    icon: "☁️",
    skills: [
      { name: "Vercel" },
      { name: "Netlify" },
      { name: "Render" },
    ],
  },
  {
    category: "Tools",
    icon: "🛠️",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Postman" },
      { name: "Figma" },
    ],
  },
];

export interface FeaturedProject {
  id: string;
  title: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  liveUrl?: string;
  repoUrl: string;
  image?: string;
  category: "AI" | "Full Stack" | "Frontend" | "Experiment";
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "student-companion",
    title: "Student Companion",
    problem: "Students juggle resources, schedules, and productivity tools across many apps.",
    solution: "AI-powered student productivity platform that centralizes learning resources and simplifies workflows.",
    impact: "Submitted to the OpenAI Buildathon and recognized for participation.",
    tech: ["React", "AI APIs", "Node.js", "Database"],
    repoUrl: "https://github.com/naveenchamp",
    image: portfolioImg,
    category: "AI",
  },
  {
    id: "smart-spaces",
    title: "Smart Spaces",
    problem: "Smart-home solutions are expensive, complex, and hard to integrate.",
    solution: "A modular smart-home ecosystem built around affordability, adaptability, and intelligent automation.",
    impact: "A scalable vision for smart living accessible to a broader audience.",
    tech: ["IoT", "AI", "Automation"],
    repoUrl: "https://github.com/naveenchamp",
    image: weatherImg,
    category: "AI",
  },
  {
    id: "finfluencer-arena",
    title: "Finfluencer Arena",
    problem: "Most young people learn finance through passive content with no hands-on practice.",
    solution: "Gamified platform where users act as financial influencers managing virtual portfolios.",
    impact: "Drives financial literacy through simulation and community engagement.",
    tech: ["Product Design", "Full Stack", "Social"],
    repoUrl: "https://github.com/naveenchamp",
    image: cricketImg,
    category: "Full Stack",
  },
  {
    id: "realtime-chat",
    title: "Real-Time Chat Application",
    problem: "Traditional messaging apps often lack responsiveness and rich real-time updates.",
    solution: "Real-time messaging platform supporting instant communication and live presence.",
    impact: "Hands-on understanding of scalable communication architectures.",
    tech: ["React", "Node.js", "WebSockets", "Express"],
    repoUrl: "https://github.com/naveenchamp",
    image: portfolioImg,
    category: "Full Stack",
  },
  {
    id: "ai-workflow",
    title: "AI Workflow System",
    problem: "Content creation and repetitive tasks burn a huge amount of time.",
    solution: "AI-assisted workflows that automate research, content generation, and productivity tasks.",
    impact: "Cut manual effort significantly and accelerated my content pipeline.",
    tech: ["OpenAI", "Automation", "Prompt Engineering"],
    repoUrl: "https://github.com/naveenchamp",
    image: weatherImg,
    category: "AI",
  },
];

export interface ContactMethod {
  label: string;
  value: string;
  href: string;
  description: string;
  primary: boolean;
  iconName: "Mail" | "Linkedin" | "Github" | "MessageSquare";
}

export const CONTACT_METHODS: ContactMethod[] = [
  {
    iconName: "Mail",
    label: "Email",
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    description: "Best for detailed discussions",
    primary: true,
  },
  {
    iconName: "Linkedin",
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: PERSONAL_INFO.linkedin,
    description: "Professional networking",
    primary: false,
  },
  {
    iconName: "Github",
    label: "GitHub",
    value: "Follow on GitHub",
    href: PERSONAL_INFO.github,
    description: "Code & contributions",
    primary: false,
  },
];

export const ABOUT_BADGES = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "HTML/CSS",
  "SQL/MySQL",
  "OpenAI APIs",
] as const;

export const SOCIAL_LINKS = [
  { href: PERSONAL_INFO.github, label: "GitHub", iconName: "Github" as const },
  { href: PERSONAL_INFO.linkedin, label: "LinkedIn", iconName: "Linkedin" as const },
  { href: `mailto:${PERSONAL_INFO.email}`, label: "Email", iconName: "Mail" as const },
] as const;
