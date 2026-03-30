import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PERSONAL_INFO } from "@/config/portfolio";
import projectPlaceholder from "@/assets/project-placeholder.jpg";

// ============================================================
// Types
// ============================================================

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

export interface RepoWithImage extends GitHubRepo {
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
    `https://api.github.com/users/${githubUsername}/repos?per_page=20&sort=updated`
  );

  if (response.status === 403) throw new Error("RATE_LIMITED");
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

  return response.json();
};

const fetchRepoImage = async (repoName: string): Promise<string> => {
  const branches = ["main", "master"];
  const paths = ["preview.png", "demo.png", "screenshot.png"];

  for (const branch of branches) {
    for (const path of paths) {
      try {
        const url = `https://raw.githubusercontent.com/${githubUsername}/${repoName}/${branch}/${path}`;
        const res = await fetch(url, { method: "HEAD" });
        if (res.ok) return url;
      } catch {
        continue;
      }
    }
  }

  return projectPlaceholder;
};

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
  const [reposWithImages, setReposWithImages] = useState<RepoWithImage[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { data: repos, isLoading, error } = useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchGitHubRepos,
    staleTime: 10 * 60 * 1000,
    retry: (count, err) => (err?.message === "RATE_LIMITED" ? false : count < 2),
  });

  const isRateLimited = error?.message === "RATE_LIMITED";

  const displayRepos = useMemo<RepoWithImage[]>(
    () => (isRateLimited || reposWithImages.length === 0 ? fallbackProjects : reposWithImages),
    [isRateLimited, reposWithImages]
  );

  const categories = useMemo(() => {
    const all = displayRepos.flatMap((r) => r.topics || []);
    return [...new Set(all)].sort();
  }, [displayRepos]);

  // Load images in batches
  useEffect(() => {
    if (imagesLoaded) return;

    if (isRateLimited || (error && !repos)) {
      setReposWithImages(fallbackProjects);
      setImagesLoaded(true);
      return;
    }

    if (!repos) return;

    const filtered = repos.filter(
      (r) => !r.name.includes(".") && r.name !== githubUsername && !r.fork
    );

    (async () => {
      const BATCH = 3;
      const results: RepoWithImage[] = [];

      for (let i = 0; i < filtered.length; i += BATCH) {
        const batch = filtered.slice(i, i + BATCH);
        const loaded = await Promise.all(
          batch.map(async (repo) => {
            const image = await fetchRepoImage(repo.name);
            return { ...repo, image, readmeDescription: repo.description || "" } as RepoWithImage;
          })
        );
        results.push(...loaded);
        if (i + BATCH < filtered.length) await new Promise((r) => setTimeout(r, 800));
      }

      setReposWithImages(results);
      setImagesLoaded(true);
    })();
  }, [repos, imagesLoaded, error, isRateLimited]);

  return { displayRepos, categories, isLoading, error, isRateLimited };
}
