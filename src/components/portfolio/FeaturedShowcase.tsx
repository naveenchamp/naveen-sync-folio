import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FEATURED_PROJECTS } from "@/config/portfolio";
import ProjectArchive from "./ProjectArchive";

const FeaturedShowcase = () => {
  const [archiveOpen, setArchiveOpen] = useState(false);

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
            <span className="section-eyebrow">Featured Work</span>
            <h2 className="heading-lg mt-4 mb-4">Project Command Center</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A handful of products and experiments I'm most proud of.
            </p>
          </motion.div>

          <div className="space-y-8">
            {FEATURED_PROJECTS.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="glass rounded-3xl overflow-hidden group hover:border-primary/40 transition-all"
              >
                <div className={`grid lg:grid-cols-[1.1fr_1fr] gap-0 ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                  <div className="relative aspect-video lg:aspect-auto overflow-hidden bg-muted/20 [direction:ltr]">
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/10 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <Badge className="bg-primary/20 text-primary border-primary/40 backdrop-blur-md">
                        {p.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono bg-background/60 backdrop-blur-md px-2 py-1 rounded-md">
                        0{i + 1}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 lg:p-10 [direction:ltr]">
                    <h3 className="font-display text-2xl lg:text-3xl font-bold mb-5 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-primary/80 font-semibold mb-1">Problem</div>
                        <p className="text-sm text-foreground/85 leading-relaxed">{p.problem}</p>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-secondary font-semibold mb-1">Solution</div>
                        <p className="text-sm text-foreground/85 leading-relaxed">{p.solution}</p>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-primary/80 font-semibold mb-1">Impact</div>
                        <p className="text-sm text-foreground/85 leading-relaxed">{p.impact}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tech.map((t) => (
                        <Badge key={t} variant="outline" className="text-xs bg-background/40 border-border/70">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button size="sm" variant="outline" asChild className="border-primary/40 hover:bg-primary/10">
                        <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" /> Code
                        </a>
                      </Button>
                      {p.liveUrl && (
                        <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setArchiveOpen(true)}
              className="border-primary/40 hover:bg-primary/10 hover:border-primary"
            >
              Browse Full Project Archive <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <ProjectArchive open={archiveOpen} onOpenChange={setArchiveOpen} />
    </section>
  );
};

export default FeaturedShowcase;
