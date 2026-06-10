import { motion } from "framer-motion";
import { Lightbulb, Search, PenTool, Send, BarChart3, Linkedin, Youtube, Instagram, Twitter } from "lucide-react";

const flow = [
  { icon: Lightbulb, label: "Idea", desc: "Spotting trends & insights" },
  { icon: Search, label: "Research", desc: "Validating & deepening" },
  { icon: PenTool, label: "Creation", desc: "Writing & designing" },
  { icon: Send, label: "Distribution", desc: "Publishing everywhere" },
  { icon: BarChart3, label: "Analytics", desc: "Learning what worked" },
];

const platforms = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
];

const ContentEngine = () => (
  <section id="content-engine" className="relative py-28 scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-eyebrow">Distribution</span>
          <h2 className="heading-lg mt-4 mb-4">Content Engine</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Turning ideas into educational, engaging content across platforms.
          </p>
        </motion.div>

        {/* Flow */}
        <div className="relative glass rounded-3xl p-6 md:p-10 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
            {flow.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/20 border border-primary/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-semibold text-sm">{step.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{step.desc}</div>
                {i < flow.length - 1 && (
                  <div className="hidden md:block absolute top-7 -right-2 w-4 h-px bg-gradient-to-r from-primary/60 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {platforms.map((p) => (
            <div
              key={p.label}
              className="glass rounded-xl px-5 py-4 flex items-center gap-3 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <p.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ContentEngine;
