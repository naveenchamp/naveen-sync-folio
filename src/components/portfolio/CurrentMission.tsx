import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const priorities = [
  { label: "AI-powered applications", progress: 78 },
  { label: "Smart Spaces ecosystem", progress: 64 },
  { label: "Educational content systems", progress: 52 },
  { label: "Scalable full-stack products", progress: 70 },
  { label: "Startup & product strategy", progress: 45 },
];

const CurrentMission = () => (
  <section id="mission" className="relative py-28 scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow">Right Now</span>
          <h2 className="heading-lg mt-4 mb-4">What I'm Building Right Now</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining software, AI, and product thinking to improve how people learn, work, and live.
          </p>
        </motion.div>

        <div className="glass rounded-3xl p-6 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <Activity className="w-3.5 h-3.5 text-primary" />
              Live Mission Status
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">ACTIVE</span>
            </div>
          </div>

          <div className="space-y-5">
            {priorities.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground/90 font-medium">{p.label}</span>
                  <span className="text-primary font-mono text-xs">{p.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CurrentMission;
