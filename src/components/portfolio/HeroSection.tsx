import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Cpu, Activity, Brain, Layers, Target, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "@/config/portfolio";

const useCounter = (end: number, duration = 1600, start = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return val;
};

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const projects = useCounter(20, 1500, mounted);
  const techs = useCounter(5, 1100, mounted);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const focusAreas = ["AI", "Full Stack", "Product"];
  const techStack = ["React", "Node.js", "Python", "OpenAI", "TypeScript"];

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-20 px-4">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong text-xs font-medium tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-foreground">OPENAI BUILDATHON PARTICIPANT</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* LEFT */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs uppercase tracking-[0.4em] text-primary/90 mb-5"
            >
              {PERSONAL_INFO.name}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-display font-bold leading-[1.05] tracking-tight text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block text-foreground">Building </span>
              <span className="block gradient-text">AI-Powered Products</span>
              <span className="block text-foreground/90 text-4xl md:text-5xl lg:text-6xl mt-2">
                & Modern Digital Experiences.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 text-lg md:text-xl text-foreground/80 font-medium"
            >
              Full Stack Developer <span className="text-primary mx-1.5">·</span>
              AI Builder <span className="text-primary mx-1.5">·</span>
              Future Founder
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              Transforming ideas into scalable digital products — from full-stack apps to AI workflows
              and product concepts like <span className="text-primary font-semibold">Smart Spaces</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                onClick={() => scrollTo("projects")}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-[0_8px_30px_hsl(var(--primary)/0.35)] px-6"
              >
                Explore My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("contact")}
                className="border-primary/40 hover:bg-primary/10 hover:border-primary px-6"
              >
                Let's Connect
              </Button>
              <Button size="lg" variant="ghost" asChild className="hover:bg-primary/5 px-6">
                <a href={PERSONAL_INFO.resumePath} download={PERSONAL_INFO.resumeFilename}>
                  <Download className="w-4 h-4 mr-2" /> Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { v: `${projects}+`, l: "Projects Built" },
                { v: `${techs}+`, l: "Tech Mastered" },
                { v: "AI + FS", l: "Focus" },
                { v: "Open", l: "To Opportunities" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="glass rounded-xl px-4 py-3 hover:border-primary/50 hover:-translate-y-0.5 transition-all"
                >
                  <div className="text-2xl font-bold gradient-text font-display">{m.v}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Digital Identity Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent blur-3xl rounded-full -z-10" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass-strong rounded-3xl p-7 relative overflow-hidden"
            >
              {/* Subtle scanline */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="flex items-center justify-between mb-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                  <Activity className="w-3 h-3 text-primary" /> Digital Identity
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-mono text-primary">ACTIVE</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-display text-xl font-bold">Naveen Reddy</div>
                  <div className="text-xs text-muted-foreground">Full Stack Developer · AI Builder</div>
                </div>
              </div>

              <div className="space-y-4 mb-5">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1.5">Status</div>
                  <div className="text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Building Smart Spaces
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1.5">Focus Areas</div>
                  <div className="flex flex-wrap gap-1.5">
                    {focusAreas.map((f) => (
                      <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1.5">Tech Stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1.5">Availability</div>
                  <div className="text-sm font-medium text-foreground">Open to internships, freelance, collabs</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                {[
                  { i: Brain, l: "AI" },
                  { i: Layers, l: "Full Stack" },
                  { i: Target, l: "Product" },
                ].map(({ i: Icon, l }) => (
                  <div key={l} className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-primary/10 transition-colors">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-20 flex justify-center">
          <button
            onClick={() => scrollTo("journey")}
            className="group inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs uppercase tracking-[0.3em]">Discover My Journey</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
