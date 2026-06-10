import { motion } from "framer-motion";
import { GraduationCap, Code2, Layers, Brain, Rocket } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

const stages = [
  {
    icon: GraduationCap,
    title: "EEE Student",
    description: "Built an analytical foundation while discovering a passion for software and emerging tech.",
  },
  {
    icon: Code2,
    title: "Frontend Developer",
    description: "Started crafting interactive user experiences and learning how design shapes behaviour.",
  },
  {
    icon: Layers,
    title: "Full Stack Developer",
    description: "Expanded into backend systems, databases, APIs, and end-to-end application development.",
  },
  {
    icon: Brain,
    title: "AI Builder",
    description: "Started leveraging AI tools, automation, and LLM-powered workflows to build smarter products.",
  },
  {
    icon: Rocket,
    title: "Future Founder",
    description: "Exploring startup ideas, digital products, and innovative solutions that create real impact.",
  },
];

const JourneySection = () => (
  <section id="journey" className="relative py-28 scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow">Who is Naveen</span>
          <h2 className="heading-lg mt-4 mb-4">My Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every project, challenge, and experiment has shaped my journey as a developer.
            What started as curiosity evolved into a passion for building products that solve meaningful problems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:sticky lg:top-28"
          >
            <div className="relative mx-auto w-56 h-56">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/40 via-secondary/30 to-transparent blur-2xl" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border/80 glass-strong">
                <img
                  src={profileImage}
                  alt="Naveen Reddy Tippasani"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full glass-strong text-xs font-medium flex items-center gap-2 whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Open to opportunities
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" />
            <div className="space-y-6">
              {stages.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pl-16 group"
                >
                  <div className="absolute left-0 top-1.5 w-12 h-12 rounded-xl glass-strong border border-primary/40 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="glass rounded-2xl p-5 group-hover:-translate-y-1 group-hover:border-primary/40 transition-all">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default JourneySection;
