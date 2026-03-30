import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Globe, Sparkles, MessageSquare } from "lucide-react";
import { PERSONAL_INFO, ABOUT_BADGES } from "@/config/portfolio";

const highlights = [
  { icon: Lightbulb, title: "What excites me", description: "Reimagining how technology solves everyday challenges" },
  { icon: Globe, title: "My journey", description: "Built apps from weather tools to cricket data systems" },
  { icon: Sparkles, title: "Beyond code", description: "I see bugs as puzzles, projects as stories" },
  { icon: MessageSquare, title: "Always open", description: "Ready for collaborations and new opportunities" },
];

const AboutSection = () => (
  <section id="about" className="py-20 bg-background">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="heading-lg mb-6">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 slide-up">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-foreground">
                I'm <span className="text-[hsl(270_95%_75%)] font-semibold">{PERSONAL_INFO.name}</span>,
                a passionate Full Stack Developer with a mission to turn bold ideas into elegant digital experiences.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                From crafting pixel-perfect frontends to building scalable backends, I thrive at the
                intersection of creativity and code.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                My journey spans building weather forecast tools, cricket data systems, AI-driven search
                applications, and educational platforms.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="heading-sm text-foreground">Core Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {ABOUT_BADGES.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm py-1 px-3 bg-card border-border hover:bg-card-hover transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item, i) => (
              <Card key={i} className="p-6 card-hover border-border bg-card group" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 fade-in">
          <p className="text-xl text-muted-foreground">
            ✨ <span className="text-primary font-semibold">Beyond code, I see user interactions as opportunities to inspire trust and delight.</span>
          </p>
          <p className="text-lg text-muted-foreground mt-4">
            📩 Always open to collaborations — let's build the future together.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
