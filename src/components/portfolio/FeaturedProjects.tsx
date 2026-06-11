import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Pin } from "lucide-react";
import { FEATURED_PROJECTS } from "@/config/portfolio";
import projectPlaceholder from "@/assets/project-placeholder.jpg";

const FeaturedProjects = () => (
  <div className="mb-16">
    <div className="flex items-center gap-2 mb-6">
      <Pin className="w-5 h-5 text-primary" />
      <h3 className="heading-md text-foreground">Featured Projects</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {FEATURED_PROJECTS.map((project) => (
        <Card
          key={project.title}
          className="group bg-background border-border card-hover overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="aspect-video bg-muted/20 overflow-hidden">
            <img
              src={project.image || projectPlaceholder}
              alt={`${project.title} preview`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 space-y-4">
            <h4 className="heading-sm group-hover:text-primary transition-colors">{project.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="text-xs bg-muted/40 border-border">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              {project.liveUrl && (
                <Button size="sm" className="flex-1 bg-primary" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </Button>
              )}
              <Button size="sm" variant="outline" className="flex-1" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default FeaturedProjects;
