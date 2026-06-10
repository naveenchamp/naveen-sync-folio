import { useState } from "react";
import { motion } from "framer-motion";
import { SKILL_CATEGORIES } from "@/config/portfolio";

const SkillsGalaxy = () => {
  const [active, setActive] = useState(SKILL_CATEGORIES[0].category);
  const current = SKILL_CATEGORIES.find((c) => c.category === active) ?? SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="relative py-28 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="section-eyebrow">Stack</span>
            <h2 className="heading-lg mt-4 mb-4">Skills Galaxy</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              An orbit of the tools I build with daily.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Category list */}
            <div className="space-y-2">
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setActive(cat.category)}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all border ${
                    active === cat.category
                      ? "bg-primary/15 border-primary/50 text-foreground shadow-[0_0_30px_hsl(var(--primary)/0.2)]"
                      : "glass hover:border-primary/30 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-medium">{cat.category}</span>
                  <span className="ml-auto text-xs opacity-60">{cat.skills.length}</span>
                </button>
              ))}
            </div>

            {/* Orbit visualization */}
            <div className="relative glass rounded-3xl p-6 md:p-10 min-h-[460px] flex items-center justify-center overflow-hidden">
              {/* Orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[200, 320, 440].map((s) => (
                  <div
                    key={s}
                    className="absolute rounded-full border border-border/40"
                    style={{ width: s, height: s }}
                  />
                ))}
              </div>

              {/* Core */}
              <motion.div
                key={current.category}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-secondary/30 border border-primary/60 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-[0_0_60px_hsl(var(--primary)/0.4)]"
              >
                <span className="text-3xl mb-1">{current.icon}</span>
                <span className="text-xs font-semibold uppercase tracking-wider">{current.category}</span>
              </motion.div>

              {/* Skill chips orbiting */}
              <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 p-12 z-20">
                {current.skills.map((s, i) => {
                  const angle = (i / current.skills.length) * Math.PI * 2;
                  const radius = 170;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1, x, y }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full glass-strong text-xs font-medium border-primary/30 hover:border-primary hover:scale-110 transition-all whitespace-nowrap cursor-default"
                    >
                      {s.name}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsGalaxy;
