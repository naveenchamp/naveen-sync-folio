import { motion } from "framer-motion";
import { Bot, Workflow, MessageSquareCode, Zap, FlaskConical } from "lucide-react";

const items = [
  {
    icon: Bot,
    title: "Custom GPT Systems",
    purpose: "Specialized AI assistants",
    description: "Built for content creation, productivity, and decision-making.",
  },
  {
    icon: MessageSquareCode,
    title: "Claude Projects",
    purpose: "AI-powered workspaces",
    description: "Automate repetitive tasks and streamline knowledge workflows.",
  },
  {
    icon: Zap,
    title: "Prompt Engineering",
    purpose: "Structured prompting systems",
    description: "Reliable, higher-quality outputs from LLMs through disciplined patterns.",
  },
  {
    icon: Workflow,
    title: "Automation Systems",
    purpose: "AI workflows across tools",
    description: "Connect multiple tools to cut manual effort and unlock leverage.",
  },
  {
    icon: FlaskConical,
    title: "AI Research",
    purpose: "Exploring what's next",
    description: "Continuous exploration of agentic systems, evaluations, and emerging APIs.",
  },
];

const AILab = () => (
  <section id="ai-lab" className="relative py-28 scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-eyebrow">Experiments</span>
          <h2 className="heading-lg mt-4 mb-4">AI Lab</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Custom assistants, automation, and prompt systems designed to unlock new possibilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass rounded-2xl p-6 group hover:-translate-y-1 hover:border-primary/40 transition-all relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 border border-primary/40 flex items-center justify-center mb-4">
                  <it.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-secondary mb-1.5 font-semibold">
                  {it.purpose}
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AILab;
