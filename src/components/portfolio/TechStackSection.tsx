import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TechStackSection = () => {
  const techCategories = [
    {
      category: "Frontend Development",
      skills: [
        { name: "JavaScript (ES6+)", level: "Expert", color: "bg-yellow-500" },
        { name: "React.js", level: "Expert", color: "bg-blue-500" },
        { name: "HTML5 & CSS3", level: "Expert", color: "bg-orange-500" },
        { name: "Responsive Design", level: "Expert", color: "bg-green-500" }
      ]
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Node.js", level: "Advanced", color: "bg-green-600" },
        { name: "Python", level: "Expert", color: "bg-blue-700" },
        { name: "RESTful APIs", level: "Expert", color: "bg-purple-500" },
        { name: "Database Design", level: "Advanced", color: "bg-indigo-500" },
        { name: "Express.js", level: "Advanced", color: "bg-gray-600" },
        { name: "SQL & NoSQL", level: "Advanced", color: "bg-orange-600" }
      ]
    },
    {
      category: "Development Tools",
      skills: [
        { name: "Git & GitHub", level: "Expert", color: "bg-red-500" },
        { name: "VS Code", level: "Expert", color: "bg-blue-600" },
        { name: "Chrome DevTools", level: "Advanced", color: "bg-green-600" },
        { name: "NPM/Yarn", level: "Learning", color: "bg-red-600" },
        { name: "Figma", level: "Intermediate", color: "bg-pink-500" }
      ]
    },
    {
      category: "Specializations & Learning",
      skills: [
        { name: "Machine Learning", level: "Learning", color: "bg-emerald-500" },
        { name: "Weather Data APIs", level: "Expert", color: "bg-sky-500" },
        { name: "Cricket Analytics", level: "Expert", color: "bg-green-700" },
        { name: "n8n", level: "Learning", color: "bg-purple-400" },
        { name: "Tailwind CSS Basic", level: "Learning", color: "bg-cyan-400" },
        { name: "TypeScript Basic", level: "Learning", color: "bg-blue-600" },
        { name: "React Learning", level: "Learning", color: "bg-blue-500" }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "text-success";
      case "Advanced": return "text-primary";
      case "Intermediate": return "text-warning";
      case "Learning": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section id="tech-stack" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Tech Stack</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive toolkit built through years of hands-on experience and continuous learning.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Tech Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {techCategories.map((category, categoryIndex) => (
              <Card 
                key={category.category} 
                className="p-6 bg-card border-border card-hover"
                style={{ animationDelay: `${categoryIndex * 150}ms` }}
              >
                <div className="space-y-6">
                  <h3 className="heading-sm text-primary">{category.category}</h3>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skill.name} 
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-3 h-3 rounded-full ${skill.color} group-hover:scale-110 transition-transform`}
                          ></div>
                          <span className="font-medium text-foreground">{skill.name}</span>
                        </div>
                        
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getLevelColor(skill.level)} border-current`}
                        >
                          {skill.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom Message */}
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground">
              🚀 <span className="font-semibold text-primary">
                Always exploring new technologies and pushing the boundaries of what's possible.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;