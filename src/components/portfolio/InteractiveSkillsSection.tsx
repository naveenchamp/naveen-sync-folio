import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SKILL_CATEGORIES } from "@/config/portfolio";

const InteractiveSkillsSection = () => (
  <section id="skills" className="py-20 bg-background scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="heading-lg mb-6">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Grouped by where they live in the stack.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <Card
              key={category.category}
              className="p-6 bg-card border-border card-hover hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="heading-sm text-primary">{category.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="text-sm py-1.5 px-3 bg-muted/40 border border-border hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      {skill.name}
                    </Badge>
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

export default InteractiveSkillsSection;
