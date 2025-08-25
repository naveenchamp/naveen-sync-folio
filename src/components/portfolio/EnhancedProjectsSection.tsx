import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Loader2, AlertCircle, Star, Calendar } from "lucide-react";
import { useEffect } from "react";
import projectPlaceholder from "@/assets/project-placeholder.jpg";
import ProjectFilters from "./ProjectFilters";

interface GitHubRepo {
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

interface RepoWithImage extends GitHubRepo {
  image: string;
  readmeDescription?: string;
}

// Fallback project data when GitHub API is rate limited
const fallbackProjects: RepoWithImage[] = [
  {
    id: 1,
    name: "React-Task-Manager",
    description: "A modern task management application built with React and TypeScript. Features drag-and-drop functionality, real-time updates, and responsive design.",
    html_url: "https://github.com/naveenchamp",
    homepage: "",
    topics: ["react", "typescript", "tailwindcss"],
    language: "TypeScript",
    stargazers_count: 15,
    updated_at: "2024-01-15",
    fork: false,
    image: projectPlaceholder,
    readmeDescription: "A comprehensive task management solution with modern UI/UX design patterns."
  },
  {
    id: 2,
    name: "E-Commerce-Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    html_url: "https://github.com/naveenchamp",
    homepage: "",
    topics: ["react", "nodejs", "mongodb", "stripe"],
    language: "JavaScript",
    stargazers_count: 23,
    updated_at: "2024-02-10",
    fork: false,
    image: projectPlaceholder,
    readmeDescription: "Complete e-commerce platform with secure payment processing and inventory management."
  },
  {
    id: 3,
    name: "Weather-Dashboard",
    description: "Real-time weather dashboard with location-based forecasts, interactive maps, and data visualization.",
    html_url: "https://github.com/naveenchamp",
    homepage: "",
    topics: ["react", "api", "charts", "weather"],
    language: "JavaScript",
    stargazers_count: 8,
    updated_at: "2024-01-28",
    fork: false,
    image: projectPlaceholder,
    readmeDescription: "Interactive weather application with comprehensive forecast data and visualizations."
  }
];

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch('https://api.github.com/users/naveenchamp/repos?per_page=20&sort=updated');
    
    if (response.status === 403) {
      console.warn('GitHub API rate limit exceeded, using fallback data');
      throw new Error('RATE_LIMITED');
    }
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    console.log('Fetched GitHub repos:', repos.length);
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
};

const fetchRepoImage = async (repoName: string): Promise<string> => {
  try {
    console.log(`Fetching image for repo: ${repoName}`);
    
    // Try both main and master branches for image paths
    const branches = ['main', 'master'];
    const commonImagePaths = [
      'preview.png', 'demo.png', 'screenshot.png',
      'assets/preview.png', 'assets/demo.png', 'assets/screenshot.png',
      'images/preview.png', 'images/demo.png', 
      'docs/preview.png', 'public/preview.png'
    ];

    // Test each branch and path combination
    for (const branch of branches) {
      for (let i = 0; i < Math.min(commonImagePaths.length, 3); i++) {
        const imagePath = commonImagePaths[i];
        try {
          const imageUrl = `https://raw.githubusercontent.com/naveenchamp/${repoName}/${branch}/${imagePath}`;
          const response = await fetch(imageUrl, { method: 'HEAD' });
          if (response.ok) {
            console.log(`Found image for ${repoName}: ${imagePath} on ${branch}`);
            return imageUrl;
          }
        } catch (error) {
          console.warn(`Failed to check ${imagePath} for ${repoName} on ${branch}:`, error);
          continue;
        }
      }
    }

    // Try to fetch README.md for embedded images
    try {
      const readmeResponse = await fetch(`https://api.github.com/repos/naveenchamp/${repoName}/readme`);
      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json();
        const readmeContent = atob(readmeData.content);
        
        // Look for relevant project images, excluding generic tutorial/template images
        const imagePatterns = [
          /!\[.*?\]\((https?:\/\/[^\s)]+\.(?:png|jpg|jpeg|gif|webp))\)/gi,
          /<img[^>]+src=["'](https?:\/\/[^"']+\.(?:png|jpg|jpeg|gif|webp))["'][^>]*>/gi
        ];

        for (const pattern of imagePatterns) {
          const matches = [...readmeContent.matchAll(pattern)];
          for (const match of matches) {
            const imageUrl = match[1] || match[0];
            
            // Filter out irrelevant/generic images
            const isRelevantImage = imageUrl && 
              imageUrl.startsWith('http') &&
              !imageUrl.includes('assets.ccbp.in') && // Exclude tutorial platform images
              !imageUrl.includes('github.com/user-attachments') && // Exclude generic GitHub attachments
              !imageUrl.toLowerCase().includes('logo') &&
              !imageUrl.toLowerCase().includes('icon') &&
              !imageUrl.toLowerCase().includes('badge') &&
              (imageUrl.toLowerCase().includes('output') || 
               imageUrl.toLowerCase().includes('demo') || 
               imageUrl.toLowerCase().includes('screenshot') ||
               imageUrl.toLowerCase().includes('preview') ||
               imageUrl.includes(repoName.toLowerCase()));
            
            if (isRelevantImage) {
              try {
                const testResponse = await fetch(imageUrl, { method: 'HEAD' });
                if (testResponse.ok) {
                  console.log(`Found relevant README image for ${repoName}: ${imageUrl}`);
                  return imageUrl;
                }
              } catch {
                continue;
              }
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to fetch README for ${repoName}:`, error);
    }
    
    return projectPlaceholder;
  } catch (error) {
    console.error(`Error fetching image for ${repoName}:`, error);
    return projectPlaceholder;
  }
};

const fetchRepoReadme = async (repoName: string): Promise<string> => {
  try {
    const response = await fetch(`https://api.github.com/repos/naveenchamp/${repoName}/readme`);
    
    if (response.status === 403) {
      console.warn(`Rate limited when fetching README for ${repoName}`);
      return '';
    }
    
    if (!response.ok) return '';
    
    const data = await response.json();
    const content = atob(data.content);
    
    // Extract meaningful content with improved parsing
    let cleanContent = content
      .replace(/```[\s\S]*?```/g, '') 
      .replace(/`[^`]+`/g, '') 
      .replace(/!\[.*?\]\(.*?\)/g, '') 
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') 
      .replace(/#{1,6}\s*/g, '') 
      .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') 
      .replace(/^\s*[-*+]\s+/gm, '') 
      .replace(/^\s*\d+\.\s+/gm, '') 
      .replace(/\n{3,}/g, '\n\n') 
      .trim();

    const paragraphs = cleanContent.split('\n\n').filter(p => p.trim().length > 30);
    const description = paragraphs[0] || cleanContent.split('\n').find(line => 
      line.trim().length > 30 && 
      !line.includes('Installation') &&
      !line.includes('Usage') &&
      !line.includes('Getting Started')
    );
    
    return description ? description.substring(0, 150) + (description.length > 150 ? '...' : '') : '';
  } catch (error) {
    console.warn(`Error fetching README for ${repoName}:`, error);
    return '';
  }
};

// Helper functions moved outside component to prevent re-creation on each render
const getProjectTitle = (name: string) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getTechStack = (repo: GitHubRepo) => {
  if (repo.topics && repo.topics.length > 0) {
    return repo.topics.slice(0, 4);
  }
  if (repo.language) {
    return [repo.language];
  }
  return ['General Project'];
};

const getProjectDescription = (repo: RepoWithImage) => {
  const description = repo.readmeDescription || repo.description;
  if (!description || description.length < 20) {
    // Generate meaningful descriptions based on repo name and topics
    const projectType = repo.topics?.includes('react') ? 'React application' : 
                       repo.topics?.includes('javascript') ? 'JavaScript project' :
                       repo.topics?.includes('typescript') ? 'TypeScript application' :
                       'Web application';
    
    const features = repo.topics?.slice(0, 2).join(' and ') || 'modern web technologies';
    return `A ${projectType} built with ${features}, showcasing innovative development practices and clean code architecture.`;
  }
  return description;
};

const ProjectsSection = () => {
  const [reposWithImages, setReposWithImages] = useState<RepoWithImage[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['github-repos'],
    queryFn: fetchGitHubRepos,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on rate limit errors
      if (error?.message === 'RATE_LIMITED') return false;
      return failureCount < 2;
    },
  });

  // Load images when repos are available or use fallback
  useEffect(() => {
    const loadImages = async () => {
      // Use fallback data if GitHub API failed due to rate limiting
      if (error?.message === 'RATE_LIMITED' || (error && !repos)) {
        console.log('Using fallback project data due to API issues');
        setReposWithImages(fallbackProjects);
        setImagesLoaded(true);
        return;
      }

      if (repos && !imagesLoaded) {
        console.log('Loading images for repos...');
        setImageLoadErrors([]);
        
        const filteredRepos = repos.filter(repo => 
          !repo.name.includes('.') && 
          repo.name !== 'naveenchamp' &&
          !repo.name.toLowerCase().includes('profile') &&
          !repo.fork
        );

        console.log('Filtered repos:', filteredRepos.length);

        // Process repos in batches to avoid overwhelming the API
        const batchSize = 3;
        const reposWithImageResults: RepoWithImage[] = [];

        for (let i = 0; i < filteredRepos.length; i += batchSize) {
          const batch = filteredRepos.slice(i, i + batchSize);
          
          const batchPromises = batch.map(async (repo) => {
            try {
              // Only fetch images, skip README to avoid rate limits
              const image = await fetchRepoImage(repo.name);
              return { ...repo, image, readmeDescription: repo.description || '' } as RepoWithImage;
            } catch (error) {
              console.error(`Error loading data for ${repo.name}:`, error);
              setImageLoadErrors(prev => [...prev, repo.name]);
              return { ...repo, image: projectPlaceholder, readmeDescription: '' } as RepoWithImage;
            }
          });

          const batchResults = await Promise.all(batchPromises);
          reposWithImageResults.push(...batchResults);
          
          // Add delay between batches
          if (i + batchSize < filteredRepos.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }

        console.log('Loaded repos with images:', reposWithImageResults.length);
        setReposWithImages(reposWithImageResults);
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, [repos, imagesLoaded, error]);


  if (isLoading) {
    return (
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Loading projects from GitHub...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && error.message !== 'RATE_LIMITED') {
    return (
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto text-destructive" />
            <p className="mt-4 text-muted-foreground">Unable to load live projects. Showing sample projects instead.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Show fallback projects if rate limited or failed, otherwise show loaded repos
  const displayRepos: RepoWithImage[] = (error?.message === 'RATE_LIMITED' || reposWithImages.length === 0) 
    ? fallbackProjects 
    : reposWithImages;

  // Get unique categories from repos
  const categories = useMemo(() => {
    const allTopics = displayRepos.flatMap(repo => repo.topics || []);
    return [...new Set(allTopics)].sort();
  }, [displayRepos]);

  // Filter repos based on search and category
  const filteredRepos = useMemo(() => {
    return displayRepos.filter(repo => {
      const matchesSearch = searchTerm === "" || 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getProjectDescription(repo).toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
        repo.topics?.includes(selectedCategory) ||
        repo.language?.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [displayRepos, searchTerm, selectedCategory]);

  const shouldShowRateLimitWarning = error?.message === 'RATE_LIMITED';

  return (
    <section id="projects" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {shouldShowRateLimitWarning 
                ? "Showing sample projects due to API rate limits. Live GitHub sync will resume shortly."
                : "Automatically synced from my GitHub repositories. Each project represents a journey of learning, innovation, and problem-solving."
              }
            </p>
            {shouldShowRateLimitWarning && (
              <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg inline-block">
                <p className="text-sm text-warning">⚠️ GitHub API temporarily unavailable - showing sample projects</p>
              </div>
            )}
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Project Filters */}
          <div className="mb-12">
            <ProjectFilters
              categories={categories}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchTerm}
            />
          </div>

          {/* Projects Grid */}
          {filteredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRepos.map((repo, index) => (
              <Card 
                key={repo.id} 
                className="group bg-background border-border card-hover overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                 {/* Project Image */}
                <div className="aspect-video bg-muted/20 overflow-hidden relative">
                  <img 
                    src={repo.image || projectPlaceholder} 
                    alt={`${getProjectTitle(repo.name)} preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error(`Image failed to load for ${repo.name}`);
                      e.currentTarget.src = projectPlaceholder;
                    }}
                    onLoad={() => {
                      console.log(`Image loaded successfully for ${repo.name}`);
                    }}
                  />
                  {imageLoadErrors.includes(repo.name) && (
                    <div className="absolute top-2 right-2 bg-warning/20 text-warning text-xs px-2 py-1 rounded">
                      ⚠️ Image issue
                    </div>
                  )}
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Project Header */}
                  <div className="space-y-2">
                    <h3 className="heading-sm group-hover:text-primary transition-colors">
                      {getProjectTitle(repo.name)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {getProjectDescription(repo)}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {getTechStack(repo).map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="text-xs bg-muted/50 border-border"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 group/btn"
                      asChild
                    >
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        Code
                      </a>
                    </Button>
                    
                    {repo.homepage && (
                      <Button 
                        size="sm" 
                        className="flex-1 group/btn bg-primary"
                        asChild
                      >
                        <a 
                          href={repo.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No projects found matching your criteria.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* View More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="glow-effect"
              asChild
            >
              <a 
                href="https://github.com/naveenchamp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;