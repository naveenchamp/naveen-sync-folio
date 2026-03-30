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

const Index = () => (
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

export default Index;
