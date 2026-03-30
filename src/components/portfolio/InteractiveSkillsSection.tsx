import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { SKILL_CATEGORIES } from "@/config/portfolio";

const InteractiveSkillsSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".skill-card");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Skills & Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical skills, honed through real-world projects and continuous learning.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILL_CATEGORIES.map((category, categoryIndex) => (
              <Card
                key={category.category}
                data-index={categoryIndex}
                className={`skill-card p-6 bg-card border-border hover:shadow-lg transition-all duration-500 ${
                  visibleCards.includes(categoryIndex) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="heading-sm text-primary">{category.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center justify-center">
                          <span className="font-medium text-foreground">{skill.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSkillsSection;
