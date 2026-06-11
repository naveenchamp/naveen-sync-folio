import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PERSONAL_INFO } from "@/config/portfolio";
import {
  useGitHubRepos,
  getProjectTitle,
  getProjectDescription,
  getTechStack,
} from "@/hooks/useGitHubRepos";
import ProjectArchive from "./ProjectArchive";

const FeaturedShowcase = () => {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const { displayRepos, isLoading, isUsingFallbackData, isRateLimited } = useGitHubRepos();

  const featured = [...displayRepos]
    .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()))
    .slice(0, 5);

  return (
    <section id="projects" className="relative py-28 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="section-eyebrow">Featured Work · Live from GitHub</span>
            <h2 className="heading-lg mt-4 mb-4">Project Command Center</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pulled directly from{" "}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @{PERSONAL_INFO.githubUsername}
              </a>
              {isUsingFallbackData && (
                <span className="block text-xs text-muted-foreground/80 mt-2">
                  {isRateLimited ? "GitHub rate limit reached — showing snapshot." : "GitHub temporarily unavailable — showing snapshot."}
                </span>
              )}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="w-6 h-6 mr-3 animate-spin" /> Loading projects from GitHub…
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((repo, i) => (
                <motion.article
                  key={repo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass rounded-3xl overflow-hidden group hover:border-primary/40 transition-all flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted/20">
                    <img
                      src={repo.image}
                      alt={getProjectTitle(repo.name)}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/10 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      {repo.language && (
                        <Badge className="bg-primary/20 text-primary border-primary/40 backdrop-blur-md">
                          {repo.language}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground font-mono bg-background/60 backdrop-blur-md px-2 py-1 rounded-md">
                        0{i + 1}
                      </span>
                    </div>
                    {repo.stargazers_count > 0 && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 text-xs bg-background/60 backdrop-blur-md px-2 py-1 rounded-md">
                        <Star className="w-3 h-3 text-primary" /> {repo.stargazers_count}
                      </div>
                    )}
                  </div>

                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="font-display text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {getProjectTitle(repo.name)}
                    </h3>
                    <p className="text-sm text-foreground/85 leading-relaxed mb-5 flex-1">
                      {getProjectDescription(repo)}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {getTechStack(repo).map((t) => (
                        <Badge key={t} variant="outline" className="text-xs bg-background/40 border-border/70">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto">
                      <Button size="sm" variant="outline" asChild className="border-primary/40 hover:bg-primary/10">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" /> Code
                        </a>
                      </Button>
                      {repo.homepage && (
                        <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <div className="text-center mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setArchiveOpen(true)}
              className="border-primary/40 hover:bg-primary/10 hover:border-primary"
            >
              Browse Full Project Archive <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" /> View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      <ProjectArchive open={archiveOpen} onOpenChange={setArchiveOpen} />
    </section>
  );
};

export default FeaturedShowcase;
