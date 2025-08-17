import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import InnovationSection from "@/components/portfolio/InnovationSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <TechStackSection />
        <InnovationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
