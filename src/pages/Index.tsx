import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import EnhancedProjectsSection from "@/components/portfolio/EnhancedProjectsSection";
import InteractiveSkillsSection from "@/components/portfolio/InteractiveSkillsSection";
import InnovationSection from "@/components/portfolio/InnovationSection";
import ResumeDisplay from "@/components/portfolio/ResumeDisplay";
import EnhancedContactSection from "@/components/portfolio/EnhancedContactSection";
import Footer from "@/components/portfolio/Footer";
import ScrollAnimations from "@/components/portfolio/ScrollAnimations";
import SplineBackground from "@/components/portfolio/SplineBackground";

const Index = () => (
  <div className="relative min-h-screen bg-transparent">
    <SplineBackground />
    <ScrollAnimations />
    <Navigation />
    <main className="relative z-10">
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

export default Index;
