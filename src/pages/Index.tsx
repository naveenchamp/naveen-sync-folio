import { useState, useEffect } from "react";
import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import EnhancedProjectsSection from "@/components/portfolio/EnhancedProjectsSection";
import InteractiveSkillsSection from "@/components/portfolio/InteractiveSkillsSection";
import InnovationSection from "@/components/portfolio/InnovationSection";
import ResumeDisplay from "@/components/portfolio/ResumeDisplay";
import EnhancedContactSection from "@/components/portfolio/EnhancedContactSection";
import Footer from "@/components/portfolio/Footer";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import ScrollAnimations from "@/components/portfolio/ScrollAnimations";

const LOADING_DURATION_MS = 2000;

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
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
        <InnovationSection />
        <ResumeDisplay />
        <EnhancedContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
