import { useEffect, useRef, useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Download,
  Rocket,
  Sparkles,
  Cpu,
  Activity,
  Brain,
  Layers,
  Target,
} from "lucide-react";
import { PERSONAL_INFO } from "@/config/portfolio";

/* --------------------------- Animated Counter --------------------------- */
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

/* --------------------------- Magnetic Button --------------------------- */
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </div>
  );
};

/* --------------------------- Hero --------------------------- */
const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useEffect(() => setMounted(true), []);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    setParallax({ x, y });
  };

  const projects = useCounter(15, 1500, mounted);
  const repos = useCounter(50, 1800, mounted);
  const buildathons = useCounter(1, 1000, mounted);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      onMouseMove={onMouseMove}
      className="relative min-h-screen overflow-hidden pt-24 pb-16 px-4"
    >
      {/* Subtle vignette only — let the 3D background breathe, no green/white wash */}
      <div
        className="absolute inset-0 -z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)/0.55) 80%)",
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Top badge */}
        <div
          className={`mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/40 text-sm text-primary backdrop-blur-md shadow-[0_0_30px_hsl(var(--primary)/0.25)]">
            <Rocket className="w-4 h-4" />
            <span className="font-medium">OpenAI Buildathon Participant</span>
            <span className="relative flex h-2 w-2 ml-1">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          {/* LEFT: Copy + CTAs */}
          <div
            style={{
              transform: `translate(${parallax.x * -0.3}px, ${parallax.y * -0.3}px)`,
            }}
            className="transition-transform duration-300 ease-out"
          >
            <p
              className={`text-sm uppercase tracking-[0.3em] text-primary/80 mb-4 transition-all duration-700 delay-100 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
            >
              {PERSONAL_INFO.name}
            </p>

            <h1
              className={`font-display font-bold leading-[1.05] tracking-tight text-5xl md:text-6xl lg:text-7xl transition-all duration-700 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="block text-foreground">Building </span>
              <span className="block gradient-text">AI-powered products</span>
              <span className="block text-foreground">
                & modern digital experiences.
              </span>
            </h1>

            <p
              className={`mt-6 text-lg md:text-xl text-foreground/80 font-medium transition-all duration-700 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Full Stack Developer
              <span className="text-primary mx-2">•</span>
              AI Builder
              <span className="text-primary mx-2">•</span>
              Product Creator
            </p>

            <p
              className={`mt-5 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed transition-all duration-700 delay-[400ms] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              I transform ideas into real-world applications using modern web
              technologies, AI systems, and product-first thinking — from
              full-stack tools to future-focused concepts like{" "}
              <span className="text-primary font-semibold">SMART SPACES</span>.
            </p>

            {/* CTAs */}
            <div
              className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 delay-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Magnetic>
                <Button
                  size="lg"
                  onClick={() => scrollTo("projects")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_40px_hsl(var(--primary)/0.45)] px-6"
                >
                  Explore My Work
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary/40 hover:bg-primary/10 hover:border-primary px-6"
                >
                  <a
                    href={PERSONAL_INFO.resumePath}
                    download={PERSONAL_INFO.resumeFilename}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Resume
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => scrollTo("contact")}
                  className="text-foreground hover:text-primary hover:bg-primary/5 px-6"
                >
                  Let's Connect →
                </Button>
              </Magnetic>
            </div>

            {/* Metrics */}
            <div
              className={`mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 transition-all duration-700 delay-[650ms] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {[
                { v: `${projects}+`, l: "Projects Built" },
                { v: `${repos}+`, l: "GitHub Repos" },
                { v: `${buildathons}+`, l: "Buildathons" },
                { v: "AI + FS", l: "Developer" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="group rounded-xl border border-border/60 bg-card/40 backdrop-blur-md px-4 py-3 hover:border-primary/60 hover:bg-card/70 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.2)]"
                >
                  <div className="text-2xl font-bold gradient-text font-display">
                    {m.v}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Floating Dashboard Card */}
          <div
            style={{
              transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)`,
            }}
            className={`relative transition-all duration-700 delay-300 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Glow */}
            <div className="absolute -inset-6 bg-primary/20 blur-3xl rounded-full -z-10" />

            {/* Main card */}
            <div
              className="relative rounded-2xl border border-primary/30 bg-card/70 backdrop-blur-xl p-6 shadow-[0_20px_60px_hsl(var(--primary)/0.25)]"
              style={{ animation: "floatCard 6s ease-in-out infinite" }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  Currently Building
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-primary font-medium">LIVE</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    SMART SPACES
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Modular smart-living ecosystem
                  </p>
                </div>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed mb-5">
                Integrating AI, automation, and connected devices to make
                everyday homes intelligent, adaptive, and human-first.
              </p>

              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Research & Product Validation</span>
                  <span className="text-primary font-semibold">64%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
                    style={{
                      width: mounted ? "64%" : "0%",
                      transition: "width 1.8s ease-out 600ms",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                {[
                  { i: Brain, l: "AI" },
                  { i: Layers, l: "Full Stack" },
                  { i: Target, l: "Product" },
                ].map(({ i: Icon, l }, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Small floating chips */}
            <div
              className="absolute -top-4 -left-6 hidden md:flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-md border border-border/70 px-3 py-1.5 text-xs shadow-lg"
              style={{ animation: "floatCard 5s ease-in-out 0.5s infinite" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-foreground/90">AI Builder</span>
            </div>
            <div
              className="absolute -bottom-3 -right-3 hidden md:flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-md border border-border/70 px-3 py-1.5 text-xs shadow-lg"
              style={{ animation: "floatCard 7s ease-in-out 1s infinite" }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-foreground/90">Shipping weekly</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollTo("about")}
            className="group inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs uppercase tracking-[0.3em]">
              Discover My Journey
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-primary" />
          </button>
        </div>
      </div>

      {/* Local keyframes */}
      <style>{`
        @keyframes floatY {
          from { transform: translateY(0); }
          to   { transform: translateY(-24px); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
