import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Github, Linkedin, Download, Send, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "naveen.tippasani@gmail.com",
      href: "mailto:naveen.tippasani@gmail.com"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "naveenchamp",
      href: "https://github.com/naveenchamp"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "naveen-reddy-tippasani",
      href: "https://linkedin.com/in/naveen-reddy-tippasani"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Ready to build the future together?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you have a project in mind, want to collaborate, or just want to chat about tech,
              I'd love to hear from you.
            </p>
            <div className="w-20 h-1 bg-[var(--gradient-primary)] mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 bg-card border-border card-hover">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="heading-sm text-foreground">Send me a message</h3>
                  <p className="text-muted-foreground">
                    Let's discuss your ideas and how we can bring them to life.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-muted/50 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-muted/50 border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-muted/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or idea..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-muted/50 border-border resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[var(--gradient-primary)] hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </Card>

            {/* Contact Info & Actions */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <Card className="p-8 bg-card border-border">
                <div className="space-y-6">
                  <h3 className="heading-sm text-foreground">Get in touch</h3>
                  
                  <div className="space-y-4">
                    {contactInfo.map((contact) => (
                      <a
                        key={contact.label}
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <contact.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{contact.label}</p>
                          <p className="text-sm text-muted-foreground">{contact.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Resume Download */}
              <Card className="p-8 bg-card border-border text-center">
                <div className="space-y-4">
                  <h3 className="heading-sm text-foreground">Resume</h3>
                  <p className="text-muted-foreground">
                    Want to know more about my experience and skills?
                  </p>
                  <Button 
                    variant="outline" 
                    className="glow-effect"
                    onClick={() => {
                      toast({
                        title: "Resume Download",
                        description: "Resume download feature coming soon!",
                      });
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              </Card>

              {/* Call to Action */}
              <div className="text-center space-y-4 fade-in">
                <h3 className="text-2xl font-semibold gradient-text">Let's Chat 🚀</h3>
                <p className="text-muted-foreground">
                  Ready to turn your ideas into reality? I'm always excited to collaborate 
                  on innovative projects and explore new possibilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;