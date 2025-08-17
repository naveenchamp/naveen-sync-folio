import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Loader2, AlertCircle } from "lucide-react";

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

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch('https://api.github.com/users/naveenchamp/repos?sort=updated&per_page=20');
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
};

const ProjectsSection = () => {
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['github-repos'],
    queryFn: fetchGitHubRepos,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

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

  const getProjectDescription = (repo: GitHubRepo) => {
    return repo.description || "Innovative project showcasing modern development practices.";
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

  const filteredRepos = repos?.filter(repo => 
    !repo.name.includes('.') && 
    repo.name !== 'naveenchamp' &&
    !repo.name.toLowerCase().includes('profile')
  ) || [];

  return (
    <section id="projects" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Automatically synced from my GitHub repositories. Each project represents a journey 
              of learning, innovation, and problem-solving.
            </p>
            <div className="w-20 h-1 bg-[var(--gradient-primary)] mx-auto rounded-full mt-6"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRepos.map((repo, index) => (
              <Card 
                key={repo.id} 
                className="group bg-background border-border card-hover overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>📅 {new Date(repo.updated_at).toLocaleDateString()}</span>
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