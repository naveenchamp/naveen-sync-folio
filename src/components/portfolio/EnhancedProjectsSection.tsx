import { useMemo, useState } from "react";
import { Calendar, ExternalLink, Github, Search, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getProjectDescription,
  getProjectTitle,
  getTechStack,
  useGitHubRepos,
} from "@/hooks/useGitHubRepos";
import { PERSONAL_INFO } from "@/config/portfolio";
import projectPlaceholder from "@/assets/project-placeholder.jpg";
import ProjectFilters from "./ProjectFilters";
import ProjectLoadingState from "./ProjectLoadingState";
import FeaturedProjects from "./FeaturedProjects";

const EnhancedProjectsSection = () => {
  const { displayRepos, categories, isLoading, isRateLimited, isUsingFallbackData } =
    useGitHubRepos();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRepos = useMemo(() => {
    if (!displayRepos?.length) return [];

    return displayRepos.filter((repo) => {
      const matchesSearch =
        !searchTerm ||
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        repo.topics?.some((topic) => topic.toLowerCase() === selectedCategory.toLowerCase()) ||
        repo.language?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [displayRepos, searchTerm, selectedCategory]);

  if (isLoading) return <ProjectLoadingState />;

  return (
    <section id="projects" className="py-20 bg-background/60 backdrop-blur-md scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <FeaturedProjects />
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {isUsingFallbackData
                ? isRateLimited
                  ? "Showing fallback project snapshots while GitHub API limits reset."
                  : "Showing fallback project snapshots while GitHub data is temporarily unavailable."
                : "Selected work pulled directly from my GitHub profile."}
            </p>
            {isUsingFallbackData && (
              <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg inline-block">
                <p className="text-sm text-warning">
                  {isRateLimited ? "GitHub API temporarily unavailable" : "GitHub data temporarily unavailable"}
                </p>
              </div>
            )}
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>

          <div className="mb-12 bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Explore Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Browse by technology or search by project name
                </p>
              </div>
            </div>
            <ProjectFilters
              categories={categories}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchTerm}
            />
          </div>

          {filteredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRepos.map((repo, index) => (
                <Card
                  key={repo.id}
                  className="group bg-background border-border card-hover overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video bg-muted/20 overflow-hidden">
                    <img
                      src={repo.image || projectPlaceholder}
                      alt={`${getProjectTitle(repo.name)} preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(event) => {
                        event.currentTarget.src = projectPlaceholder;
                      }}
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="heading-sm group-hover:text-primary transition-colors">
                        {getProjectTitle(repo.name)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {getProjectDescription(repo)}
                      </p>
                    </div>

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

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" /> Code
                        </a>
                      </Button>
                      {repo.homepage && (
                        <Button size="sm" className="flex-1 bg-primary" asChild>
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" /> Live Demo
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

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="glow-effect" asChild>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-5 h-5" /> View All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedProjectsSection;
