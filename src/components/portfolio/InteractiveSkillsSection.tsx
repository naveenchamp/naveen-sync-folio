import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const InteractiveSkillsSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  
  const skillCategories = [
    {
      category: "Frontend Development",
      icon: "💻",
      skills: [
        { name: "JavaScript (ES6+)" },
        { name: "React.js" },
        { name: "HTML5 & CSS3" },
        { name: "Responsive Design" }
      ]
    },
    {
      category: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Node.js" },
        { name: "Python" },
        { name: "Express.js" },
        { name: "RESTful APIs" },
        { name: "Database Design" },
        { name: "SQL & NoSQL" }
      ]
    },
    {
      category: "Development Tools",
      icon: "🛠️",
      skills: [
        { name: "Git & GitHub" },
        { name: "VS Code" },
        { name: "Chrome DevTools" },
        { name: "NPM/Yarn" },
        { name: "Figma" }
      ]
    },
    {
      category: "Specializations",
      icon: "🚀",
      skills: [
        { name: "Weather Data APIs" },
        { name: "Cricket Analytics" },
        { name: "n8n Automation" }
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
                        className="p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                        style={{ 
                          animationDelay: `${(categoryIndex * 150) + (skillIndex * 50)}ms` 
                        }}
                      >
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