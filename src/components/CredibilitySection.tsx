import { TrendingUp, Users, Shield, Award, Brain, Zap, Target, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataVisualization from "./DataVisualization";

const CredibilitySection = () => {
  const trustMetrics = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit encryption on every account and document you store with us",
      highlight: "Encrypted & secure"
    },
    {
      icon: Brain,
      title: "Automated Discovery",
      description: "Automated search across financial institutions and public unclaimed-property records",
      highlight: "Real-time analysis"
    },
    {
      icon: Award,
      title: "Built for Estate Planning",
      description: "Designed around standard estate-planning and probate processes",
      highlight: "Process-driven"
    },
    {
      icon: Globe,
      title: "Secure Cloud Storage",
      description: "Your documents and data are encrypted at rest and in transit",
      highlight: "Enterprise grade"
    }
  ];

  const impactStats = [
    { value: "3.4M", label: "Annual deaths in the US requiring estate management" },
    { value: "87%", label: "Estimated to have complex digital financial footprints" },
    { value: "6+ months", label: "Typical family discovery timeline without help" },
    { value: "45%", label: "Estimated to miss accounts without professional help" }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Advanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-comfort-bg via-white to-blue-pale/50" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-48 h-48 md:w-96 md:h-96 neural-gradient rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-1/4 right-0 w-36 h-36 md:w-72 md:h-72 mesh-gradient rounded-full blur-3xl opacity-15" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-electric-blue to-cyber-teal bg-clip-text text-transparent font-bold text-sm tracking-wider uppercase mb-6">
            <TrendingUp className="h-4 w-4 text-electric-blue" />
            The Landscape
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-navy-deep mb-4 md:mb-6 font-black">Digital Assets Are Easy to Lose Track Of</h2>
          <p className="text-lg md:text-xl text-navy-light max-w-4xl mx-auto leading-relaxed">
            As more of our financial lives move online, it's gotten harder for families to know what
            accounts and assets a loved one had. Legacy Ledger helps close that gap.
          </p>
        </div>

        {/* Hero statistic with interactive visualization */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-16 lg:mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass-morphism rounded-3xl p-6 md:p-12 border border-white/30 backdrop-blur-xl shadow-floating">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <TrendingUp className="h-8 w-8 md:h-12 md:w-12 text-electric-blue" />
                  <div className="h-1 bg-gradient-to-r from-electric-blue to-cyber-teal rounded-full flex-grow" />
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-electric-blue to-cyber-teal bg-clip-text text-transparent">
                    $30B+
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-navy-deep">
                    Lost in the Digital Estate Gap
                  </h3>
                  <p className="text-navy-light text-base md:text-lg leading-relaxed">
                    Unclaimed digital assets across the United States continue to grow.
                    Our discovery platform helps keep your family's legacy from becoming another statistic.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <DataVisualization />
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto mb-12 md:mb-16 lg:mb-20">
          {trustMetrics.map((metric, index) => (
            <div
              key={index}
              className="group interactive-card glass-morphism p-6 md:p-8 rounded-3xl border border-white/30 backdrop-blur-xl animate-slide-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-electric-blue to-cyber-teal rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <metric.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-electric-blue bg-electric-blue/10 px-2 md:px-3 py-1 rounded-full">
                    {metric.highlight}
                  </div>
                </div>
                
                <div className="space-y-2 md:space-y-3">
                  <h4 className="font-bold text-navy-deep text-base md:text-lg">{metric.title}</h4>
                  <p className="text-navy-light text-sm leading-relaxed">{metric.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market impact statistics */}
        <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-navy-deep mb-3 md:mb-4">Why This Matters</h3>
            <p className="text-navy-light text-base md:text-lg max-w-3xl mx-auto">
              Estimates that illustrate the growing complexity of digital estate management in America.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {impactStats.map((stat, index) => (
              <div key={index} className="group">
                <div className="glass-morphism p-6 md:p-8 rounded-3xl border border-white/30 text-center space-y-3 md:space-y-4 interactive-card">
                  <div className="text-3xl md:text-4xl font-black text-navy-deep">{stat.value}</div>
                  <p className="text-navy-light text-sm leading-relaxed">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-slide-up" style={{ animationDelay: '1s' }}>
          <div className="glass-morphism rounded-3xl p-12 border border-white/30 backdrop-blur-xl max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Target className="h-8 w-8 text-electric-blue" />
                <h3 className="text-2xl font-bold text-navy-deep">Ready to Get Started?</h3>
              </div>
              <p className="text-navy-light text-lg leading-relaxed">
                Protect your family's digital legacy, or find out what a loved one left behind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" className="group">
                  Start Discovery
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="glass" size="xl">
                  <Brain className="mr-2 h-6 w-6" />
                  View Live Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;