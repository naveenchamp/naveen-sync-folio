import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const InteractiveSkillsSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  
  const skillCategories = [
    {
      category: "Frontend Development",
      icon: "💻",
      skills: [
        { name: "JavaScript (ES6+)", level: 95, experience: "4+ years" },
        { name: "React.js", level: 90, experience: "3+ years" },
        { name: "HTML5 & CSS3", level: 95, experience: "4+ years" },
        { name: "TypeScript", level: 75, experience: "2+ years" },
        { name: "Tailwind CSS", level: 85, experience: "2+ years" },
        { name: "Responsive Design", level: 90, experience: "4+ years" }
      ]
    },
    {
      category: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 85, experience: "3+ years" },
        { name: "Python", level: 90, experience: "4+ years" },
        { name: "Express.js", level: 80, experience: "3+ years" },
        { name: "RESTful APIs", level: 90, experience: "3+ years" },
        { name: "Database Design", level: 85, experience: "3+ years" },
        { name: "SQL & NoSQL", level: 80, experience: "3+ years" }
      ]
    },
    {
      category: "Development Tools",
      icon: "🛠️",
      skills: [
        { name: "Git & GitHub", level: 95, experience: "4+ years" },
        { name: "VS Code", level: 95, experience: "4+ years" },
        { name: "Chrome DevTools", level: 85, experience: "3+ years" },
        { name: "NPM/Yarn", level: 80, experience: "3+ years" },
        { name: "Figma", level: 70, experience: "2+ years" },
        { name: "Docker", level: 60, experience: "1+ year" }
      ]
    },
    {
      category: "Specializations",
      icon: "🚀",
      skills: [
        { name: "Machine Learning", level: 65, experience: "1+ year" },
        { name: "Weather Data APIs", level: 90, experience: "2+ years" },
        { name: "Cricket Analytics", level: 85, experience: "2+ years" },
        { name: "Data Visualization", level: 75, experience: "2+ years" },
        { name: "n8n Automation", level: 70, experience: "1+ year" },
        { name: "CI/CD Pipelines", level: 60, experience: "1+ year" }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const getSkillColor = (level: number) => {
    if (level >= 90) return "text-emerald-500";
    if (level >= 80) return "text-blue-500";
    if (level >= 70) return "text-yellow-500";
    return "text-orange-500";
  };

  const getProgressColor = (level: number) => {
    if (level >= 90) return "bg-emerald-500";
    if (level >= 80) return "bg-blue-500";
    if (level >= 70) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Skills & Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical skills, honed through real-world projects and continuous learning.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <Card 
                key={category.category}
                data-index={categoryIndex}
                className={`skill-card p-6 bg-card border-border hover:shadow-lg transition-all duration-500 ${
                  visibleCards.includes(categoryIndex) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  animationDelay: `${categoryIndex * 150}ms`,
                  transitionDelay: `${categoryIndex * 100}ms`
                }}
              >
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="heading-sm text-primary">{category.category}</h3>
                  </div>
                  
                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skill.name}
                        className="space-y-2 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                        style={{ 
                          animationDelay: `${(categoryIndex * 150) + (skillIndex * 50)}ms` 
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getSkillColor(skill.level)} border-current`}
                            >
                              {skill.experience}
                            </Badge>
                            <span className={`text-sm font-semibold ${getSkillColor(skill.level)}`}>
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <Progress 
                            value={visibleCards.includes(categoryIndex) ? skill.level : 0}
                            className="h-2 bg-muted"
                          />
                          <div 
                            className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(skill.level)}`}
                            style={{ 
                              width: visibleCards.includes(categoryIndex) ? `${skill.level}%` : '0%',
                              transitionDelay: `${(categoryIndex * 100) + (skillIndex * 100)}ms`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Skills Summary */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">4+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSkillsSection;