import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import CredibilitySection from "@/components/CredibilitySection";
import WhyLegacySection from "@/components/WhyLegacySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <PricingSection />
      <CredibilitySection />
      <WhyLegacySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
