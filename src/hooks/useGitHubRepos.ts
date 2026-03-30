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

const getRepoImageUrl = (repoName: string) =>
  `https://opengraph.githubassets.com/1/${githubUsername}/${repoName}`;

const mapRepoWithImage = (repo: GitHubRepo): RepoWithImage => ({
  ...repo,
  description: repo.description ?? "",
  homepage: repo.homepage ?? "",
  language: repo.language ?? "",
  topics: repo.topics ?? [],
  image: getRepoImageUrl(repo.name),
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
