import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import EnhancedProjectsSection from "@/components/portfolio/EnhancedProjectsSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import InnovationSection from "@/components/portfolio/InnovationSection";
import ResumeDisplay from "@/components/portfolio/ResumeDisplay";
import EnhancedContactSection from "@/components/portfolio/EnhancedContactSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <EnhancedProjectsSection />
        <TechStackSection />
        <InnovationSection />
        <ResumeDisplay />
        <EnhancedContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
