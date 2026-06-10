const Background = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
    {/* Base navy */}
    <div className="absolute inset-0 bg-background" />

    {/* Subtle grid */}
    <div
      className="absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          "linear-gradient(to right, hsl(226 40% 18% / 0.7) 1px, transparent 1px), linear-gradient(to bottom, hsl(226 40% 18% / 0.7) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
      }}
    />

    {/* Purple glow top-left */}
    <div
      className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full blur-3xl opacity-30"
      style={{ background: "radial-gradient(circle, hsl(264 88% 66% / 0.6), transparent 70%)" }}
    />
    {/* Blue glow bottom-right */}
    <div
      className="absolute -bottom-40 -right-40 w-[640px] h-[640px] rounded-full blur-3xl opacity-25"
      style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.55), transparent 70%)" }}
    />
    {/* Center subtle accent */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-10"
      style={{ background: "radial-gradient(ellipse, hsl(264 88% 66% / 0.4), transparent 70%)" }}
    />
  </div>
);

export default Background;
