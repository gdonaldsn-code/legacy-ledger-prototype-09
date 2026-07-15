import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DataVisualization from "./DataVisualization";
import DiscoveryModal from "./discovery/DiscoveryModal";
import LiveDemo from "./LiveDemo";
import heroImage from "@/assets/hero-sunrise.jpg";

const HeroSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showReport, setShowReport] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleStartDiscovery = () => {
    setShowReport(true);
  };

  const handleViewDemo = () => {
    setShowDemo(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero text and CTA */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 animate-slide-up text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 md:gap-3 glass-morphism px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/30 text-sm md:text-base">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-electric-blue" />
                <span className="text-white font-medium">Estate & Legacy Support</span>
              </div>

              {/* Main headline */}
              <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight md:leading-[0.9] font-black">
                Discover Hidden Wealth
                <br />
                <span className="relative">
                  Accounts & Assets
                  <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-electric-blue/20 to-cyber-teal/20 rounded-xl blur-xl" />
                </span>
              </h1>
                
                <p className="text-lg md:text-xl lg:text-2xl text-blue-soft leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  AI-powered discovery platform that finds hidden financial accounts and digital assets 
                  <span className="text-cyber-teal font-semibold"> in minutes, not months</span>.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <Button onClick={handleStartDiscovery} variant="hero" size="lg" className="group text-sm md:text-base px-6 md:px-8 py-3 md:py-4">
                  Start Discovery Scan
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button onClick={handleViewDemo} variant="glass" size="lg" className="text-sm md:text-base px-6 md:px-8 py-3 md:py-4">
                  <Shield className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  View Live Demo
                </Button>
              </div>

              {/* Trust indicators with modern styling */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 pt-6 md:pt-8">
                {[
                  "Bank-Level Security",
                  "Automated Discovery",
                  "Built for Estate Planning"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 md:gap-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-electric-blue to-cyber-teal rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-blue-soft font-medium group-hover:text-white transition-colors text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive data visualization */}
            <div className="space-y-6 md:space-y-8 animate-slide-up mt-8 lg:mt-0" style={{ animationDelay: '0.3s' }}>
              <DataVisualization />
              
              {/* Feature showcase */}
              <div className="glass-morphism p-6 md:p-8 rounded-3xl border border-white/20 backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-success-green rounded-full animate-pulse" />
                    <span className="text-white font-semibold">Live Estate Scanning</span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { label: "Financial Institutions", progress: 95, color: "from-electric-blue to-cyber-teal" },
                      { label: "Digital Assets Found", progress: 87, color: "from-cyber-teal to-neon-purple" },
                      { label: "Report Readiness", progress: 92, color: "from-neon-purple to-success-green" }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-soft">{item.label}</span>
                          <span className="text-white font-semibold">{item.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 delay-${index * 200}`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      
      {/* Discovery Report Modal */}
      <DiscoveryModal isOpen={showReport} onClose={() => setShowReport(false)} />
      
      {/* Live Demo Modal */}
      <LiveDemo isOpen={showDemo} onClose={() => setShowDemo(false)} />
    </section>
  );
};

export default HeroSection;