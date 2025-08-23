import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, Calendar } from "lucide-react";

const GitHubStats = () => {
  const stats = [
    {
      icon: Github,
      label: "Repositories",
      value: "15+",
      description: "Public projects"
    },
    {
      icon: Star,
      label: "Stars Earned",
      value: "50+",
      description: "Community appreciation"
    },
    {
      icon: GitFork,
      label: "Contributions",
      value: "200+",
      description: "This year"
    },
    {
      icon: Calendar,
      label: "Active Since",
      value: "2020",
      description: "Years of coding"
    }
  ];

  const topLanguages = [
    { name: "JavaScript", percentage: 35, color: "bg-yellow-500" },
    { name: "TypeScript", percentage: 25, color: "bg-blue-500" },
    { name: "Python", percentage: 20, color: "bg-green-500" },
    { name: "CSS", percentage: 15, color: "bg-purple-500" },
    { name: "Others", percentage: 5, color: "bg-gray-500" }
  ];

  return (
    <section className="py-12 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label}
                className="p-4 text-center bg-background border-border hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Top Languages */}
          <Card className="p-6 bg-background border-border">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Github className="w-5 h-5 text-primary" />
                Most Used Languages
              </h3>
              
              <div className="space-y-3">
                {topLanguages.map((lang) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{lang.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {lang.percentage}%
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${lang.color}`}
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;