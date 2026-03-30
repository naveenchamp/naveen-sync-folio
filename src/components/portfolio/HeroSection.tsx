import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/config/portfolio";

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < PERSONAL_INFO.heroText.length) {
        setDisplayedText(PERSONAL_INFO.heroText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--gradient-hero)]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="text-center space-y-8 fade-in">
          <div className="space-y-6">
            <h1 className="heading-xl min-h-[120px] md:min-h-[140px]">
              <span className="block">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {PERSONAL_INFO.heroSubtext}{" "}
              <span className="gradient-text font-semibold">Let's build the future together.</span>
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <Button variant="outline" size="lg" className="glow-effect group" asChild>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" /> GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" className="glow-effect group" asChild>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" /> LinkedIn
              </a>
            </Button>
            <Button size="lg" className="glow-effect group bg-primary border-0" asChild>
              <a href="#contact" className="flex items-center gap-2">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" /> Let's Chat
              </a>
            </Button>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <span className="text-sm">Scroll to explore</span>
              <ArrowDown className="w-5 h-5 animate-bounce group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
