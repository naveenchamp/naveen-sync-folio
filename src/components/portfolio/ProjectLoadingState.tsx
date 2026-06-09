import { Loader2 } from "lucide-react";

const ProjectLoadingState = () => (
  <section className="py-20 bg-transparent">
    <div className="container mx-auto px-6">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-muted-foreground">Loading projects from GitHub...</p>
      </div>
    </div>
  </section>
);

export default ProjectLoadingState;
