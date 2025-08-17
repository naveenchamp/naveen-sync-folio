import { Card } from "@/components/ui/card";
import { Brain, Puzzle, Lightbulb, Rocket } from "lucide-react";

const InnovationSection = () => {
  const principles = [
    {
      icon: Brain,
      title: "Curiosity First",
      description: "I approach problems with curiosity - every challenge is an opportunity to learn something new."
    },
    {
      icon: Puzzle,
      title: "Problem Solving",
      description: "Every bug is a puzzle waiting to be solved, every feature is a chance to innovate."
    },
    {
      icon: Lightbulb,
      title: "User-Centric",
      description: "Creating solutions that feel intuitive for users while being scalable for the future."
    },
    {
      icon: Rocket,
      title: "Future-Ready",
      description: "Great code isn't just written — it's crafted with intention and long-term vision."
    }
  ];

  return (
    <section id="innovation" className="py-20 bg-card relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">How I Think</h2>
            <div className="w-20 h-1 bg-[var(--gradient-primary)] mx-auto rounded-full"></div>
          </div>

          {/* Main Philosophy */}
          <div className="text-center mb-16 slide-up">
            <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-background border-border card-hover">
              <blockquote className="space-y-6">
                <p className="text-xl md:text-2xl leading-relaxed text-foreground font-light">
                  "I approach problems with <span className="gradient-text font-semibold">curiosity first</span> — 
                  every bug is a puzzle, every feature is an opportunity, and every project is a chance to 
                  <span className="gradient-text font-semibold"> reimagine what's possible</span>."
                </p>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  My focus is on creating solutions that feel intuitive for users while being scalable for the future. 
                  I believe great code isn't just written — it's 
                  <span className="text-primary font-semibold"> crafted with intention, empathy, and vision</span>.
                </p>
                
                <div className="pt-4">
                  <cite className="text-lg font-semibold gradient-text">— Naveen Reddy Tippasani</cite>
                </div>
              </blockquote>
            </Card>
          </div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <Card 
                key={principle.title} 
                className="p-6 bg-background border-border card-hover text-center group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <principle.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="heading-sm text-foreground">{principle.title}</h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 fade-in">
            <div className="max-w-3xl mx-auto space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Innovation Through Collaboration
              </h3>
              <p className="text-lg text-muted-foreground">
                The best solutions emerge when diverse perspectives unite around a shared vision. 
                Let's build something extraordinary together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;