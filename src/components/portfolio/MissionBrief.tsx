import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { PERSONAL_INFO } from "@/config/portfolio";

const MISSION_TYPES = [
  "Website Development",
  "AI Product Development",
  "Startup Collaboration",
  "Internship Opportunity",
  "Freelance Project",
];

const MissionBrief = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const subject = encodeURIComponent(
      `Mission Brief: ${selected.length ? selected.join(", ") : "New Inquiry"}`
    );
    const body = encodeURIComponent(
      `Hi Naveen,\n\nMission types: ${selected.join(", ") || "—"}\n\n${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    toast({ title: "Mission dispatched", description: "Your email client should be open." });
    setSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-28 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="section-eyebrow">Initiate Contact</span>
            <h2 className="heading-lg mt-4 mb-4">Let's Build Something Meaningful</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Looking for a developer, collaborator, or someone passionate about building products?
              File a mission brief — I'll get back to you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
            <form onSubmit={submit} className="glass-strong rounded-3xl p-8 space-y-6">
              <div>
                <Label className="text-xs uppercase tracking-widest text-primary mb-3 block">
                  Mission Type
                </Label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {MISSION_TYPES.map((t) => (
                    <label
                      key={t}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                        selected.includes(t)
                          ? "bg-primary/15 border-primary/60 text-foreground"
                          : "glass hover:border-primary/30"
                      }`}
                    >
                      <Checkbox
                        checked={selected.includes(t)}
                        onCheckedChange={() => toggle(t)}
                      />
                      <span className="text-sm font-medium">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="m-name" className="text-xs uppercase tracking-widest text-muted-foreground">Name</Label>
                  <Input
                    id="m-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-background/60"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="m-email" className="text-xs uppercase tracking-widest text-muted-foreground">Email</Label>
                  <Input
                    id="m-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-background/60"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="m-msg" className="text-xs uppercase tracking-widest text-muted-foreground">Message</Label>
                <Textarea
                  id="m-msg"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-background/60 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold"
              >
                <Rocket className="w-4 h-4 mr-2" /> Initiate Mission
              </Button>
            </form>

            <div className="space-y-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                  <div className="text-sm font-medium">{PERSONAL_INFO.email}</div>
                </div>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/15 border border-secondary/40 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">LinkedIn</div>
                  <div className="text-sm font-medium">Connect with me</div>
                </div>
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center">
                  <Github className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">GitHub</div>
                  <div className="text-sm font-medium">@{PERSONAL_INFO.githubUsername}</div>
                </div>
              </a>

              <div className="glass-strong rounded-2xl p-6 text-center">
                <Send className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground italic">
                  "Building the future through code, creativity, and curiosity."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionBrief;
