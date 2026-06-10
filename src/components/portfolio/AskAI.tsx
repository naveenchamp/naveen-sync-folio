import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Send, Sparkles, Loader2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SUGGESTED = [
  "Who is Naveen?",
  "What projects has Naveen built?",
  "What technologies does Naveen use?",
  "Tell me about Smart Spaces.",
  "Why should I hire Naveen?",
  "What is Naveen building right now?",
];

type Msg = { role: "user" | "assistant"; content: string };

const AskAI = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setStreaming(true);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const SUPABASE_URL = (supabase as unknown as { supabaseUrl: string }).supabaseUrl;
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/ask-naveen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (resp.status === 429) {
        toast({ title: "Rate limit", description: "Please slow down and try again.", variant: "destructive" });
        setMessages((m) => m.slice(0, -1));
        return;
      }
      if (resp.status === 402) {
        toast({ title: "AI credits exhausted", description: "Please try again later.", variant: "destructive" });
        setMessages((m) => m.slice(0, -1));
        return;
      }
      if (!resp.ok || !resp.body) throw new Error("Request failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistant = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              assistant += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: assistant };
                return copy;
              });
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      setMessages((m) => m.slice(0, -1));
    } finally {
      setStreaming(false);
    }
  };

  return (
    <section id="ask-ai" className="relative py-28 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="section-eyebrow">Interactive</span>
            <h2 className="heading-lg mt-4 mb-4">Ask AI About Naveen</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Talk to a custom AI assistant trained on Naveen's work, skills, and projects.
            </p>
          </motion.div>

          <div className="glass-strong rounded-3xl overflow-hidden shadow-[var(--shadow-elevation)]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between bg-background/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Naveen AI Assistant</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="h-[440px] overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/40 flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Hi! I'm Naveen's AI assistant. Ask me anything about his projects, skills, or what he's building.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-xl">
                    {SUGGESTED.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="text-xs px-3 py-1.5 rounded-full glass hover:border-primary/50 hover:text-primary transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "glass text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.role === "assistant" && !m.content && streaming ? (
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      ) : m.role === "assistant" ? (
                        <div className="prose prose-sm prose-invert max-w-none prose-p:my-1.5 prose-headings:mt-2 prose-headings:mb-1">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      ) : (
                        m.content
                      )}
                    </div>
                    {m.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-foreground" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-4 border-t border-border/60 bg-background/40 flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Naveen..."
                disabled={streaming}
                className="bg-background/60 border-border/60"
              />
              <Button type="submit" disabled={streaming || !input.trim()} className="bg-primary hover:bg-primary/90">
                {streaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskAI;
