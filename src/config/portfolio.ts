// ============================================================
// Centralized Portfolio Configuration
// Update this file to change content across the entire site.
// ============================================================

export const PERSONAL_INFO = {
  name: "Naveen Reddy Tippasani",
  brandName: "Naveen.dev",
  title: "Full Stack Developer",
  tagline: "Building the future, one line of code at a time.",
  heroText: "Hi, I'm Naveen 👋 Full Stack Developer building solutions that connect ideas with execution.",
  heroSubtext: "Passionate about turning bold ideas into elegant digital experiences.",
  location: "Kakinada, Andhra Pradesh, 533001",
  phone: "9390661948",
  email: "naveenreddytippasani777.7@gmail.com",
  github: "https://github.com/naveenchamp",
  githubUsername: "naveenchamp",
  linkedin: "https://www.linkedin.com/in/naveen-reddy-tippasani-5500402a5/",
  resumePath: "/naveen-resume.pdf",
  resumeFilename: "Naveen_Reddy_Tippasani_Resume.pdf",
} as const;

export const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export interface Skill {
  name: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: "💻",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "React JS" },
      { name: "TypeScript" },
    ],
  },
  {
    category: "Backend Development",
    icon: "⚙️",
    skills: [
      { name: "Python" },
      { name: "Node JS" },
      { name: "SQL / MySQL / SQLite" },
    ],
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
  {
    iconName: "MessageSquare",
    label: "Direct Message",
    value: "Quick message via form",
    href: "#contact-form",
    description: "Use the form on the left",
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
