import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Loader2, AlertCircle, Star, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import projectPlaceholder from "@/assets/project-placeholder.jpg";

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
}

interface RepoWithImage extends GitHubRepo {
  image: string;
  readmeDescription?: string;
}

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch('https://api.github.com/users/naveenchamp/repos?sort=updated&per_page=20');
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
};

const fetchRepoImage = async (repoName: string): Promise<string> => {
  try {
    // First try common screenshot/demo paths
    const commonImagePaths = [
      'preview.png', 'preview.jpg', 'preview.gif',
      'demo.png', 'demo.jpg', 'demo.gif',
      'screenshot.png', 'screenshot.jpg',
      'cover.png', 'cover.jpg',
      'banner.png', 'banner.jpg',
      'thumbnail.png', 'thumbnail.jpg',
      'assets/preview.png', 'assets/demo.png', 'assets/screenshot.png',
      'images/preview.png', 'images/demo.png', 'images/screenshot.png',
      'docs/preview.png', 'docs/demo.png', 'docs/screenshot.png',
      '.github/preview.png', '.github/demo.png', '.github/screenshot.png'
    ];

    // Test each common path
    for (const imagePath of commonImagePaths) {
      try {
        const imageUrl = `https://raw.githubusercontent.com/naveenchamp/${repoName}/main/${imagePath}`;
        const response = await fetch(imageUrl, { method: 'HEAD' });
        if (response.ok) {
          return imageUrl;
        }
      } catch {
        continue;
      }
    }

    // Try to fetch README.md for embedded images
    const readmeResponse = await fetch(`https://api.github.com/repos/naveenchamp/${repoName}/readme`);
    if (readmeResponse.ok) {
      const readmeData = await readmeResponse.json();
      const readmeContent = atob(readmeData.content);
      
      // Look for image URLs in README - multiple patterns
      const imagePatterns = [
        /!\[.*?\]\((.*?\.(?:png|jpg|jpeg|gif|webp|svg))\)/gi,
        /<img[^>]+src=["']([^"']+\.(?:png|jpg|jpeg|gif|webp|svg))["'][^>]*>/gi,
        /https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp|svg)/gi
      ];

      for (const pattern of imagePatterns) {
        const matches = [...readmeContent.matchAll(pattern)];
        for (const match of matches) {
          let imageUrl = match[1] || match[0];
          
          // Convert relative URLs to absolute GitHub URLs
          if (!imageUrl.startsWith('http')) {
            imageUrl = `https://raw.githubusercontent.com/naveenchamp/${repoName}/main/${imageUrl}`;
          }
          
          // Test if the image actually exists
          try {
            const testResponse = await fetch(imageUrl, { method: 'HEAD' });
            if (testResponse.ok) {
              return imageUrl;
            }
          } catch {
            continue;
          }
        }
      }
    }
    
    return projectPlaceholder;
  } catch {
    return projectPlaceholder;
  }
};

const fetchRepoReadme = async (repoName: string): Promise<string> => {
  try {
    const response = await fetch(`https://api.github.com/repos/naveenchamp/${repoName}/readme`);
    if (!response.ok) return '';
    
    const data = await response.json();
    const content = atob(data.content);
    
    // Remove markdown formatting and extract meaningful content
    let cleanContent = content
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]+`/g, '') // Remove inline code
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
      .replace(/#{1,6}\s*/g, '') // Remove headers
      .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Remove bold/italic
      .replace(/^\s*[-*+]\s+/gm, '') // Remove bullet points
      .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered lists
      .replace(/\n{3,}/g, '\n\n') // Normalize line breaks
      .trim();

    // Extract the most relevant description (first substantial paragraph)
    const paragraphs = cleanContent.split('\n\n').filter(p => p.trim().length > 30);
    const description = paragraphs[0] || cleanContent.split('\n').find(line => 
      line.trim().length > 30 && 
      !line.includes('Installation') &&
      !line.includes('Usage') &&
      !line.includes('Getting Started')
    );
    
    return description ? description.substring(0, 150) + (description.length > 150 ? '...' : '') : '';
  } catch {
    return '';
  }
};

const ProjectsSection = () => {
  const [reposWithImages, setReposWithImages] = useState<RepoWithImage[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['github-repos'],
    queryFn: fetchGitHubRepos,
    staleTime: 5 * 60 * 1000,
  });

  // Load images when repos are available
  useEffect(() => {
    const loadImages = async () => {
      if (repos && !imagesLoaded) {
        const filteredRepos = repos.filter(repo => 
          !repo.name.includes('.') && 
          repo.name !== 'naveenchamp' &&
          !repo.name.toLowerCase().includes('profile')
        );

        const reposWithImagePromises = filteredRepos.map(async (repo) => {
          const [image, readmeDescription] = await Promise.all([
            fetchRepoImage(repo.name),
            fetchRepoReadme(repo.name)
          ]);
          return { ...repo, image, readmeDescription } as RepoWithImage;
        });

        const results = await Promise.all(reposWithImagePromises);
        setReposWithImages(results);
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, [repos, imagesLoaded]);

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
    return repo.readmeDescription || repo.description || "Innovative project showcasing modern development practices.";
  };

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

  if (error) {
    return (
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto text-destructive" />
            <p className="mt-4 text-muted-foreground">Failed to load projects. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const displayRepos: RepoWithImage[] = imagesLoaded ? reposWithImages : (repos?.filter(repo => 
    !repo.name.includes('.') && 
    repo.name !== 'naveenchamp' &&
    !repo.name.toLowerCase().includes('profile')
  ).map(repo => ({ ...repo, image: projectPlaceholder })) || []);

  return (
    <section id="projects" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Automatically synced from my GitHub repositories with images from README files. Each project represents a journey 
              of learning, innovation, and problem-solving.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayRepos.map((repo, index) => (
              <Card 
                key={repo.id} 
                className="group bg-background border-border card-hover overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Image */}
                <div className="aspect-video bg-muted/20 overflow-hidden">
                  <img 
                    src={repo.image || projectPlaceholder} 
                    alt={`${repo.name} preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = projectPlaceholder;
                    }}
                  />
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