import { useState, useEffect } from "react";
import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import EnhancedProjectsSection from "@/components/portfolio/EnhancedProjectsSection";
import InteractiveSkillsSection from "@/components/portfolio/InteractiveSkillsSection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import BlogSection from "@/components/portfolio/BlogSection";
import InnovationSection from "@/components/portfolio/InnovationSection";
import ResumeDisplay from "@/components/portfolio/ResumeDisplay";
import EnhancedContactSection from "@/components/portfolio/EnhancedContactSection";
import Footer from "@/components/portfolio/Footer";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import ScrollAnimations from "@/components/portfolio/ScrollAnimations";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources
    const preloadImages = [
      '/naveen-resume.pdf',
      // Add other critical assets
    ];

    Promise.all(
      preloadImages.map(src => {
        return new Promise((resolve) => {
          if (src.endsWith('.pdf')) {
            // For PDFs, just resolve immediately
            resolve(src);
          } else {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => resolve(src);
            img.src = src;
          }
        });
      })
    ).then(() => {
      // Minimum loading time for better UX
      setTimeout(() => setIsLoading(false), 2000);
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollAnimations />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <EnhancedProjectsSection />
        <InteractiveSkillsSection />
        <TestimonialsSection />
        <InnovationSection />
        <BlogSection />
        <ResumeDisplay />
        <EnhancedContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
