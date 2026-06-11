import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PERSONAL_INFO } from "@/config/portfolio";
import projectPlaceholder from "@/assets/project-placeholder.jpg";

// ============================================================
// Types
// ============================================================

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

export interface RepoWithImage extends Omit<GitHubRepo, "description" | "homepage" | "language"> {
  description: string;
  homepage: string;
  language: string;
  image: string;
  readmeDescription?: string;
}

// ============================================================
// Fallback Data
// ============================================================

const fallbackProjects: RepoWithImage[] = [
  {
    id: 1,
    name: "React-Task-Manager",
    description: "A modern task management application built with React and TypeScript.",
    html_url: PERSONAL_INFO.github,
    homepage: "",
    topics: ["react", "typescript", "tailwindcss"],
    language: "TypeScript",
    stargazers_count: 15,
    updated_at: "2024-01-15",
    fork: false,
    image: projectPlaceholder,
  },
  {
    id: 2,
    name: "E-Commerce-Platform",
    description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
    html_url: PERSONAL_INFO.github,
    homepage: "",
    topics: ["react", "nodejs", "mongodb", "stripe"],
    language: "JavaScript",
    stargazers_count: 23,
    updated_at: "2024-02-10",
    fork: false,
    image: projectPlaceholder,
  },
  {
    id: 3,
    name: "Weather-Dashboard",
    description: "Real-time weather dashboard with location-based forecasts and data visualization.",
    html_url: PERSONAL_INFO.github,
    homepage: "",
    topics: ["react", "api", "charts", "weather"],
    language: "JavaScript",
    stargazers_count: 8,
    updated_at: "2024-01-28",
    fork: false,
    image: projectPlaceholder,
  },
];

// ============================================================
// API Helpers
// ============================================================

const { githubUsername } = PERSONAL_INFO;

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch(
    `https://api.github.com/users/${githubUsername}/repos?per_page=20&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (response.status === 403) throw new Error("RATE_LIMITED");
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

  return response.json();
};

// Deterministic hash → unique gradient per repo
const hashStr = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const LANG_GLYPH: Record<string, string> = {
  TypeScript: "TS",
  JavaScript: "JS",
  Python: "PY",
  HTML: "</>",
  CSS: "#",
  Java: "JV",
  "C++": "C++",
  Go: "GO",
  Rust: "RS",
  Shell: "$_",
};

const getRepoImageUrl = (repo: GitHubRepo) => {
  const h = hashStr(repo.name);
  const hue1 = h % 360;
  const hue2 = (hue1 + 40 + (h % 60)) % 360;
  const glyph = LANG_GLYPH[repo.language ?? ""] ?? (repo.language?.slice(0, 2).toUpperCase() || "·");
  const title = repo.name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const initials = repo.name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase())
    .slice(0, 3)
    .join("");

  // Generate orbs for visual texture
  const orbs = Array.from({ length: 3 }, (_, i) => {
    const oh = (h >> (i * 3)) & 0xff;
    const cx = 80 + ((oh * 7) % 480);
    const cy = 50 + ((oh * 11) % 220);
    const r = 80 + ((oh * 3) % 120);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#orb${i})" opacity="0.55"/>`;
  }).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${hue1},70%,18%)"/>
        <stop offset="100%" stop-color="hsl(${hue2},65%,10%)"/>
      </linearGradient>
      <radialGradient id="orb0"><stop offset="0%" stop-color="hsl(${hue1},90%,60%)" stop-opacity="0.9"/><stop offset="100%" stop-color="hsl(${hue1},90%,60%)" stop-opacity="0"/></radialGradient>
      <radialGradient id="orb1"><stop offset="0%" stop-color="hsl(${hue2},85%,65%)" stop-opacity="0.8"/><stop offset="100%" stop-color="hsl(${hue2},85%,65%)" stop-opacity="0"/></radialGradient>
      <radialGradient id="orb2"><stop offset="0%" stop-color="hsl(${(hue1+180)%360},80%,70%)" stop-opacity="0.6"/><stop offset="100%" stop-color="hsl(${(hue1+180)%360},80%,70%)" stop-opacity="0"/></radialGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="640" height="360" fill="url(#bg)"/>
    <rect width="640" height="360" fill="url(#grid)"/>
    ${orbs}
    <g font-family="ui-monospace,SFMono-Regular,Menlo,monospace" fill="rgba(255,255,255,0.95)">
      <text x="40" y="70" font-size="14" opacity="0.6">~/${githubUsername}/${repo.name}</text>
      <text x="40" y="200" font-size="56" font-weight="800">${initials}</text>
      <text x="40" y="240" font-size="20" font-weight="600" opacity="0.92">${title.slice(0, 32)}</text>
      <text x="40" y="320" font-size="13" opacity="0.6">${(repo.language || "Project").toUpperCase()} · ★ ${repo.stargazers_count}</text>
    </g>
    <g transform="translate(540,60)">
      <rect width="64" height="64" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)"/>
      <text x="32" y="42" text-anchor="middle" font-family="ui-monospace,monospace" font-size="20" font-weight="700" fill="white">${glyph}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const mapRepoWithImage = (repo: GitHubRepo): RepoWithImage => ({
  ...repo,
  description: repo.description ?? "",
  homepage: repo.homepage ?? "",
  language: repo.language ?? "",
  topics: repo.topics ?? [],
  image: getRepoImageUrl(repo),
  readmeDescription: repo.description ?? "",
});

// ============================================================
// Utility Helpers (exported for use in components)
// ============================================================

export const getProjectTitle = (name: string) =>
  name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const getTechStack = (repo: GitHubRepo) => {
  if (repo.topics?.length) return repo.topics.slice(0, 4);
  if (repo.language) return [repo.language];
  return ["General Project"];
};

export const getProjectDescription = (repo: RepoWithImage) => {
  const desc = repo.readmeDescription || repo.description;
  if (desc && desc.length >= 20) return desc;
  const type = repo.topics?.includes("react")
    ? "React application"
    : repo.topics?.includes("javascript")
    ? "JavaScript project"
    : "Web application";
  const features = repo.topics?.slice(0, 2).join(" and ") || "modern web technologies";
  return `A ${type} built with ${features}, showcasing clean code architecture.`;
};

// ============================================================
// Hook
// ============================================================

export function useGitHubRepos() {
  const { data: repos = [], isLoading, error } = useQuery({
    queryKey: ["github-repos", githubUsername],
    queryFn: fetchGitHubRepos,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: (count, err) => (err?.message === "RATE_LIMITED" ? false : count < 2),
  });

  const isRateLimited = error?.message === "RATE_LIMITED";
  const isUsingFallbackData = Boolean(error);

  const displayRepos = useMemo<RepoWithImage[]>(
    () =>
      isUsingFallbackData
        ? fallbackProjects
        : repos
            .filter((repo) => !repo.name.includes(".") && repo.name !== githubUsername && !repo.fork)
            .map(mapRepoWithImage),
    [isUsingFallbackData, repos]
  );

  const categories = useMemo(() => {
    const all = displayRepos.flatMap((repo) => [
      ...repo.topics.map((topic) => topic.toLowerCase()),
      ...(repo.language ? [repo.language.toLowerCase()] : []),
    ]);

    return [...new Set(all)].sort();
  }, [displayRepos]);

  return { displayRepos, categories, isLoading, error, isRateLimited, isUsingFallbackData };
}
