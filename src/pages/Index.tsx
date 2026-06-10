import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import JourneySection from "@/components/portfolio/JourneySection";
import DigitalDashboard from "@/components/portfolio/DigitalDashboard";
import FeaturedShowcase from "@/components/portfolio/FeaturedShowcase";
import AILab from "@/components/portfolio/AILab";
import ContentEngine from "@/components/portfolio/ContentEngine";
import SkillsGalaxy from "@/components/portfolio/SkillsGalaxy";
import Achievements from "@/components/portfolio/Achievements";
import CurrentMission from "@/components/portfolio/CurrentMission";
import AskAI from "@/components/portfolio/AskAI";
import MissionBrief from "@/components/portfolio/MissionBrief";
import Footer from "@/components/portfolio/Footer";
import Background from "@/components/portfolio/Background";

const Index = () => (
  <div className="relative min-h-screen">
    <Background />
    <Navigation />
    <main className="relative z-10">
      <HeroSection />
      <JourneySection />
      <DigitalDashboard />
      <FeaturedShowcase />
      <AILab />
      <ContentEngine />
      <SkillsGalaxy />
      <Achievements />
      <CurrentMission />
      <AskAI />
      <MissionBrief />
    </main>
    <Footer />
  </div>
);

export default Index;
