import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/naveenchamp",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/naveen-reddy-tippasani",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:naveen.tippasani@gmail.com",
      label: "Email"
    }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text mb-2">Naveen.dev</h3>
            <p className="text-muted-foreground text-sm">
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-end gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> by Naveen
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            This portfolio automatically syncs with my GitHub repositories. 
            <span className="gradient-text font-semibold"> Always up to date!</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;