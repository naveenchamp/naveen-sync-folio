import type { LucideIcon } from "lucide-react";
import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/config/portfolio";

const iconMap: Record<string, LucideIcon> = { Github, Linkedin, Mail };

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text mb-2">{PERSONAL_INFO.brandName}</h3>
            <p className="text-muted-foreground text-sm">{PERSONAL_INFO.tagline}</p>
          </div>

          <div className="flex justify-center space-x-6">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.iconName];

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              );
            })}
          </div>

          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-end gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> by Naveen
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Copyright {currentYear}. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            Project highlights stay current by pulling from my GitHub repositories.
            <span className="gradient-text font-semibold"> Built to reflect active work.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
