import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Github, Linkedin, Download, Send, MessageSquare, Copy, CheckCircle } from "lucide-react";
import { PERSONAL_INFO, CONTACT_METHODS } from "@/config/portfolio";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Mail, Linkedin, Github, MessageSquare };

const EnhancedContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast({ title: "Copied!", description: `${type} copied to clipboard` });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast({ title: "Failed to copy", description: "Please copy manually", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const body = encodeURIComponent(`Hi Naveen,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    toast({ title: "Email Client Opened!", description: "Your email client should now be open." });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-background/60 backdrop-blur-md scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6 gradient-text">Let's Build Something Together</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Got an idea, a role, or a collaboration in mind? My inbox is open.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 glow-effect" asChild>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2">
                <Mail className="w-5 h-5" /> Send Me an Email
              </a>
            </Button>
            <div className="flex justify-center gap-4 mt-6">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-full bg-muted/30 hover:bg-muted/60 text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 rounded-full bg-muted/30 hover:bg-muted/60 text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-8" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="p-8 bg-card border-border card-hover" id="contact-form">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="heading-sm text-foreground">Send me a message</h3>
                  <p className="text-muted-foreground">Opens your email client with the message pre-filled.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} required className="bg-muted/50 border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleInputChange} required className="bg-muted/50 border-border" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="What's this about?" value={formData.subject} onChange={handleInputChange} required className="bg-muted/50 border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Tell me about your project or idea..." rows={5} value={formData.message} onChange={handleInputChange} required className="bg-muted/50 border-border resize-none" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
                    {isSubmitting ? "Opening Email Client..." : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                  </Button>
                </form>
              </div>
            </Card>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card className="p-8 bg-card border-border">
                <div className="space-y-6">
                  <h3 className="heading-sm text-foreground">Multiple Ways to Connect</h3>
                  <div className="space-y-4">
                    {CONTACT_METHODS.map((contact) => {
                      const Icon = iconMap[contact.iconName];
                      return (
                        <div key={contact.label} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group">
                          <div className={`p-3 rounded-lg ${contact.primary ? "bg-primary/20" : "bg-secondary/20"} group-hover:scale-110 transition-transform`}>
                            <Icon className={`w-5 h-5 ${contact.primary ? "text-primary" : "text-secondary-foreground"}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-foreground">{contact.label}</p>
                              {contact.primary && <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20">Preferred</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{contact.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {contact.label === "Email" && (
                              <Button variant="ghost" size="sm" onClick={() => handleCopy(contact.href.replace("mailto:", ""), "Email")} className="h-8 w-8 p-0">
                                {copied === "Email" ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" asChild>
                              <a href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-primary hover:text-primary/80">
                                {contact.href.startsWith("http") ? "Visit" : "Use"}
                              </a>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card border-border text-center">
                <div className="space-y-4">
                  <h3 className="heading-sm text-foreground">Resume</h3>
                  <p className="text-muted-foreground">Want to know more about my experience and skills?</p>
                  <Button
                    variant="outline"
                    className="glow-effect"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = PERSONAL_INFO.resumePath;
                      link.download = PERSONAL_INFO.resumeFilename;
                      link.target = "_blank";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      toast({ title: "Resume Downloaded!", description: "Resume has been downloaded." });
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" /> Download Resume
                  </Button>
                </div>
              </Card>

              <div className="text-center space-y-4 fade-in">
                <h3 className="text-2xl font-semibold gradient-text">Let's Chat 🚀</h3>
                <p className="text-muted-foreground">Ready to turn your ideas into reality?</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <Badge variant="outline" className="bg-primary/10 border-primary/20">Available for freelance</Badge>
                  <Badge variant="outline" className="bg-secondary/10 border-secondary/20">Open to collaborations</Badge>
                  <Badge variant="outline" className="bg-muted/50">Quick responder</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContactSection;
