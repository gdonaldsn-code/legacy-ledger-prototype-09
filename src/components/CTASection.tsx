import { ArrowRight, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 hero-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 md:mb-6 font-black">Start Your Legacy Today</h2>
          <p className="text-lg md:text-xl text-blue-soft mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto">
            Whether you're planning ahead or need immediate help, Legacy Ledger is here to guide your family 
            through life's most important financial transitions with dignity and care.
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {/* Quick Action Cards */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-trust-accent mx-auto mb-3 md:mb-4" />
              <h4 className="text-white font-semibold mb-2 text-sm md:text-base">Discovery Report</h4>
              <p className="text-blue-soft text-xs md:text-sm mb-3 md:mb-4">Get immediate help finding accounts</p>
              <Button variant="comfort" size="sm" className="w-full text-xs md:text-sm py-2 md:py-3">
                Order Now - $299
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
              <Phone className="h-6 w-6 md:h-8 md:w-8 text-trust-accent mx-auto mb-3 md:mb-4" />
              <h4 className="text-white font-semibold mb-2 text-sm md:text-base">Concierge Service</h4>
              <p className="text-blue-soft text-xs md:text-sm mb-3 md:mb-4">We handle everything for you</p>
              <Button variant="hero" size="sm" className="w-full text-xs md:text-sm py-2 md:py-3">
                Get Help - $699
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
              <ArrowRight className="h-6 w-6 md:h-8 md:w-8 text-trust-accent mx-auto mb-3 md:mb-4" />
              <h4 className="text-white font-semibold mb-2 text-sm md:text-base">Legacy Protection</h4>
              <p className="text-blue-soft text-xs md:text-sm mb-3 md:mb-4">Plan ahead for your family</p>
              <Button variant="comfort" size="sm" className="w-full text-xs md:text-sm py-2 md:py-3">
                Free Trial
              </Button>
            </div>
          </div>

          {/* Main CTA */}
          <div className="space-y-3 md:space-y-4">
            <Button variant="hero" size="lg" className="text-sm md:text-lg px-8 md:px-12 py-3 md:py-4">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <p className="text-blue-soft/80 text-xs md:text-sm">
              Speak with our estate specialists about your specific needs
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-blue-soft/80 text-xs md:text-sm">
              <span>✓ 30-day money-back guarantee</span>
              <span>✓ No hidden fees</span>
              <span>✓ HIPAA compliant</span>
              <span>✓ Estate attorney backed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;