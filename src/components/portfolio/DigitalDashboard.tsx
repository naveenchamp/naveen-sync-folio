import { motion } from "framer-motion";
import { Target, BookOpen, Hammer, Handshake } from "lucide-react";

type Accent = "primary" | "secondary";
const widgets: { icon: typeof Target; title: string; color: Accent; items: string[] }[] = [
  {
    icon: Target,
    title: "Current Focus",
    color: "primary",
    items: ["AI Applications", "Full Stack Development", "Product Building", "Automation Systems"],
  },
  {
    icon: BookOpen,
    title: "Currently Learning",
    color: "secondary",
    items: ["Agentic AI", "Advanced System Design", "Scalable Architecture", "Product Strategy"],
  },
  {
    icon: Hammer,
    title: "Building Now",
    color: "primary",
    items: ["Smart Spaces", "AI Workflow Systems", "Content Automation Tools", "Personal AI Assistants"],
  },
  {
    icon: Handshake,
    title: "Open To",
    color: "secondary",
    items: ["Internships", "Freelance Projects", "Startup Collaborations", "Open Source"],
  },
];

const accentStyles: Record<Accent, { box: string; icon: string; dot: string; bullet: string }> = {
  primary: {
    box: "bg-primary/15 border-primary/40",
    icon: "text-primary",
    dot: "bg-primary",
    bullet: "bg-primary",
  },
  secondary: {
    box: "bg-secondary/15 border-secondary/40",
    icon: "text-secondary",
    dot: "bg-secondary",
    bullet: "bg-secondary",
  },
};

const DigitalDashboard = () => (
  <section id="dashboard" className="relative py-28 scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-eyebrow">Live Status</span>
          <h2 className="heading-lg mt-4 mb-4">Digital Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A live snapshot of where my attention is right now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {widgets.map((w, i) => {
            const s = accentStyles[w.color];
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 hover:-translate-y-1 hover:border-primary/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${s.box}`}>
                      <w.icon className={`w-5 h-5 ${s.icon}`} />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${s.dot}`} />
                    Live
                  </div>
                </div>
                <ul className="space-y-2">
                  {w.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-3 text-sm text-foreground/85 px-3 py-2 rounded-lg bg-background/40 border border-border/50 group-hover:border-border transition-colors"
                    >
                      <span className={`w-1 h-1 rounded-full ${s.bullet}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default DigitalDashboard;
