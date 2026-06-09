// ============================================================
// Centralized Portfolio Configuration
// ============================================================
import portfolioImg from "@/assets/project-portfolio.jpg";
import weatherImg from "@/assets/project-weather.jpg";
import cricketImg from "@/assets/project-cricket.jpg";

export const PERSONAL_INFO = {
  name: "Naveen Reddy Tippasani",
  brandName: "Naveen.dev",
  title: "Full Stack Developer",
  tagline: "Building the future, one line of code at a time.",
  heroHeadline: "Naveen Reddy Tippasani",
  heroSubtext:
    "Full Stack Developer — I build React frontends, Node.js APIs, and auto-sync my live work straight from GitHub.",
  location: "Kakinada, Andhra Pradesh, 533001",
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
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
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
      { name: "Tailwind CSS" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js" },
      { name: "Python" },
      { name: "REST APIs" },
    ],
  },
  {
    category: "Tools & Other",
    icon: "🛠️",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Figma" },
      { name: "VS Code" },
    ],
  },
];

export interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl: string;
  image?: string;
}

import portfolioImg from "@/assets/project-portfolio.jpg";
import weatherImg from "@/assets/project-weather.jpg";
import cricketImg from "@/assets/project-cricket.jpg";

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: "Portfolio (this site)",
    description: "Live portfolio that auto-syncs projects from GitHub with a polished React UI.",
    tech: ["React", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/naveenchamp",
    image: portfolioImg,
  },
  {
    title: "Weather Forecast App",
    description: "Real-time weather tool with location-based forecasts and clean data viz.",
    tech: ["React", "API", "JavaScript"],
    repoUrl: "https://github.com/naveenchamp",
    image: weatherImg,
  },
  {
    title: "Cricket Data System",
    description: "Backend service that aggregates and serves live cricket stats via REST endpoints.",
    tech: ["Node.js", "Python", "SQL"],
    repoUrl: "https://github.com/naveenchamp",
    image: cricketImg,
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
    description: "See my code & contribute",
    primary: false,
  },
];

export const ABOUT_BADGES = [
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "TypeScript",
  "HTML/CSS",
  "SQL/MySQL",
] as const;

export const SOCIAL_LINKS = [
  { href: PERSONAL_INFO.github, label: "GitHub", iconName: "Github" as const },
  { href: PERSONAL_INFO.linkedin, label: "LinkedIn", iconName: "Linkedin" as const },
  { href: `mailto:${PERSONAL_INFO.email}`, label: "Email", iconName: "Mail" as const },
] as const;
