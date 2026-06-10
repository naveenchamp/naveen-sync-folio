import { motion } from "framer-motion";
import { Award, GraduationCap, Trophy, Users, Hammer } from "lucide-react";

const items = [
  {
    icon: Trophy,
    title: "OpenAI Buildathon",
    subtitle: "State-Level Participant",
    description: "Participated in the OpenAI Academy × NxtWave Buildathon and submitted Student Companion.",
  },
  {
    icon: GraduationCap,
    title: "Generative AI Mastery",
    subtitle: "Workshop Completion",
    description: "Completed advanced AI learning programs focused on practical, real-world implementation.",
  },
  {
    icon: Award,
    title: "Student Companion",
    subtitle: "Featured Submission",
    description: "Built and submitted an AI-powered productivity solution for students.",
  },
  {
    icon: Users,
    title: "Community Learning",
    subtitle: "Building in Public",
    description: "Actively sharing knowledge and learning through projects, posts, and content.",
  },
  {
    icon: Hammer,
    title: "Continuous Builder",
    subtitle: "20+ Projects Shipped",
    description: "Consistently developing real-world projects to sharpen technical and product skills.",
  },
];

const Achievements = () => (
  <section id="recognition" className="relative py-28 scroll-mt-20">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-eyebrow">Recognition</span>
          <h2 className="heading-lg mt-4 mb-4">Achievements & Recognition</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milestones, certifications, and moments that shaped my path.
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
              className="glass rounded-2xl p-6 hover:-translate-y-1 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 border border-primary/40 flex items-center justify-center shrink-0">
                  <it.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-secondary font-semibold">
                    {it.subtitle}
                  </div>
                  <h3 className="font-display text-lg font-semibold mt-1 mb-2">{it.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{it.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Achievements;
