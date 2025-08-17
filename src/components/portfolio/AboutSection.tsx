import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Globe, Sparkles, MessageSquare } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Lightbulb,
      title: "What excites me",
      description: "Reimagining how technology solves everyday challenges"
    },
    {
      icon: Globe,
      title: "My journey",
      description: "Built apps from weather tools to cricket data systems"
    },
    {
      icon: Sparkles,
      title: "Beyond code",
      description: "I see bugs as puzzles, projects as stories"
    },
    {
      icon: MessageSquare,
      title: "Always open",
      description: "Ready for collaborations and new opportunities"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">About Me</h2>
            <div className="w-20 h-1 bg-[var(--gradient-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Main Content */}
            <div className="space-y-6 slide-up">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-foreground">
                  I'm <span className="gradient-text font-semibold">Naveen Reddy Tippasani</span>, 
                  a passionate Full Stack Developer with a mission to turn bold ideas into elegant digital experiences.
                </p>
                
                <p className="text-lg leading-relaxed text-muted-foreground">
                  From crafting pixel-perfect frontends to building scalable backends, I thrive at the 
                  intersection of creativity and code. I believe great software isn't just written — it's crafted 
                  with intention, empathy, and a deep understanding of user needs.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  My journey spans building weather forecast tools, cricket data systems, AI-driven search 
                  applications, and educational platforms. Each project teaches me something new about the 
                  endless possibilities of code.
                </p>
              </div>

              {/* Skills Badges */}
              <div className="space-y-3">
                <h3 className="heading-sm text-foreground">Core Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "Python", "React", "Node.js", "HTML/CSS", "APIs", "Databases"].map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="text-sm py-1 px-3 bg-card border-border hover:bg-card-hover transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <Card 
                  key={index} 
                  className="p-6 card-hover border-border bg-card group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 fade-in">
            <p className="text-xl text-muted-foreground">
              ✨ <span className="gradient-text font-semibold">
                Beyond code, I see user interactions as opportunities to inspire trust and delight.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;