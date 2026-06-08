import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "@/config/portfolio";

const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--gradient-hero)] pt-20 pb-16 px-4">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto z-10">
        <div className="text-center space-y-8 fade-in max-w-4xl mx-auto">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Projects auto-sync from GitHub — always up to date.</span>
          </div>

          <div className="space-y-6">
            <h1 className="heading-xl font-display gradient-text leading-tight">
              {PERSONAL_INFO.heroHeadline}
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {PERSONAL_INFO.heroSubtext}
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Button size="lg" className="bg-primary hover:bg-primary/90 glow-effect" onClick={scrollToProjects}>
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glow-effect"
              asChild
            >
              <a
                href={PERSONAL_INFO.resumePath}
                download={PERSONAL_INFO.resumeFilename}
                className="flex items-center gap-2"
              >
                <Download className="w-5 h-5" /> Download Resume
              </a>
            </Button>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4 pt-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted/30 hover:bg-muted/60 text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted/30 hover:bg-muted/60 text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="pt-8">
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <span className="text-sm">Scroll to explore</span>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
