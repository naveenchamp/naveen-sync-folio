import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Github, ExternalLink, Star } from "lucide-react";
import { useGitHubRepos, getProjectTitle, getProjectDescription, getTechStack } from "@/hooks/useGitHubRepos";

const FILTERS = ["All", "AI", "Full Stack", "Frontend", "Experiments"] as const;

const categorize = (topics: string[], language: string | null) => {
  const t = topics.map((x) => x.toLowerCase());
  if (t.some((x) => ["ai", "openai", "llm", "ml", "gpt"].includes(x))) return "AI";
  if (t.some((x) => ["node", "nodejs", "express", "backend", "fullstack"].includes(x)) || language === "Python") return "Full Stack";
  if (t.some((x) => ["react", "frontend", "ui", "tailwindcss"].includes(x)) || language === "TypeScript" || language === "JavaScript") return "Frontend";
  return "Experiments";
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectArchive = ({ open, onOpenChange }: Props) => {
  const { displayRepos, isLoading } = useGitHubRepos();
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");
  const [search, setSearch] = useState("");

  const repos = useMemo(() => {
    return displayRepos.filter((r) => {
      const cat = categorize(r.topics, r.language);
      const matchFilter = filter === "All" || cat === filter;
      const matchSearch =
        !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.description?.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [displayRepos, filter, search]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col bg-card/95 backdrop-blur-2xl border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Project Archive</DialogTitle>
          <DialogDescription>
            Live feed from my GitHub. Filter by category or search by name.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-3 pb-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background/60"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Button
                key={f}
                size="sm"
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
                className={filter === f ? "bg-primary" : "border-border/70"}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto flex-1 -mx-1 px-1">
          {isLoading ? (
            <div className="py-12 text-center text-muted-foreground">Loading projects…</div>
          ) : repos.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">No projects match.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((r) => (
                <div key={r.id} className="glass rounded-xl p-5 hover:border-primary/40 transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">{getProjectTitle(r.name)}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" />
                      {r.stargazers_count}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{getProjectDescription(r)}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {getTechStack(r).map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px] bg-background/40">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild className="flex-1 h-8 text-xs">
                      <a href={r.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 mr-1.5" /> Code
                      </a>
                    </Button>
                    {r.homepage && (
                      <Button size="sm" asChild className="flex-1 h-8 text-xs bg-primary">
                        <a href={r.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1.5" /> Live
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectArchive;
