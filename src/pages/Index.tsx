import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import PersonaFork from "@/components/PersonaFork";
import PricingSection from "@/components/PricingSection";
import CredibilitySection from "@/components/CredibilitySection";
import WhyLegacySection from "@/components/WhyLegacySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AIGuidanceChat from "@/components/AIGuidanceChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <HeroSection />
      <PersonaFork />
      <PricingSection />
      <CredibilitySection />
      <WhyLegacySection />
      <CTASection />
      <Footer />
      <AIGuidanceChat />
    </div>
  );
};

export default Index;
