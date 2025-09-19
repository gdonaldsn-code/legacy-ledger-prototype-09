import { Brain, Zap, Shield, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorksSection = () => {
  const preplanningSteps = [
    {
      icon: Shield,
      title: "Secure Digital Vault",
      description: "Secure encrypted storage for all financial accounts, passwords, and critical documents with military-grade security.",
      highlight: "256-bit encryption"
    },
    {
      icon: Brain,
      title: "Smart Executor Network",
      description: "Intelligent assignment system with multi-factor authentication and automated verification protocols.",
      highlight: "Digitally verified"
    },
    {
      icon: Zap,
      title: "Automated Release Protocol",
      description: "Automated release system with legal validation ensures seamless access when your family needs it most.",
      highlight: "Instant activation"
    }
  ];

  const discoverySteps = [
    {
      icon: Brain,
      title: "Comprehensive Digital Asset Search",
      description: "Sophisticated search technology scans 11,000+ financial institutions and 30,000+ medical institutions using specialized identification processes.",
      highlight: "99.3% accuracy"
    },
    {
      icon: Sparkles,
      title: "Intelligence Report",
      description: "Comprehensive digital analysis with account details, estimated values, and legal action roadmaps.",
      highlight: "Real-time data"
    },
    {
      icon: CheckCircle,
      title: "Concierge Execution",
      description: "White-glove service where our experts handle all paperwork, calls, and legal processes on your behalf.",
      highlight: "100% managed"
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Advanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-comfort-bg via-white to-blue-pale/30" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-4 md:top-20 md:left-10 w-36 h-36 md:w-72 md:h-72 neural-gradient rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-10 right-4 md:bottom-20 md:right-10 w-48 h-48 md:w-96 md:h-96 mesh-gradient rounded-full blur-3xl opacity-15" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 lg:mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-electric-blue to-cyber-teal bg-clip-text text-transparent font-bold text-sm tracking-wider uppercase mb-4">
            <Zap className="h-4 w-4 text-electric-blue" />
            Our Process
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-navy-deep mb-4 md:mb-6 font-black">How Legacy Ledger Works</h2>
          <p className="text-lg md:text-xl text-navy-light max-w-4xl mx-auto leading-relaxed">
            Two distinct service offerings: pre-planning digital estate organization for living clients, 
            and posthumous asset identification and recovery services for estate administrators.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-12 md:gap-16 lg:gap-20 max-w-7xl mx-auto">
          {/* Pre-Planning Path */}
          <div className="space-y-6 md:space-y-8 animate-slide-up">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 neural-gradient rounded-2xl mb-4 md:mb-6 shadow-neural">
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl text-navy-deep mb-2 md:mb-3 font-bold">Proactive Legacy Protection</h3>
              <p className="text-navy-light text-sm md:text-base">For individuals planning their digital estate</p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {preplanningSteps.map((step, index) => (
                <div key={index} className="group interactive-card glass-morphism p-6 md:p-8 rounded-3xl border border-white/30 backdrop-blur-xl">
                  <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-electric-blue to-cyber-teal rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-sm md:text-lg">{index + 1}</span>
                      </div>
                    </div>
                    <div className="space-y-3 md:space-y-4 flex-grow text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                        <step.icon className="h-5 w-5 md:h-6 md:w-6 text-electric-blue" />
                        <h4 className="font-bold text-navy-deep text-base md:text-lg">{step.title}</h4>
                        <span className="text-xs font-semibold text-cyber-teal bg-cyber-teal/10 px-2 md:px-3 py-1 rounded-full">
                          {step.highlight}
                        </span>
                      </div>
                      <p className="text-navy-light leading-relaxed text-sm md:text-base">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 md:pt-8">
              <Button variant="neural" size="lg" className="w-full group text-sm md:text-base py-3 md:py-4">
                Start Legacy Protection - $5-10/month
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Post-Death Discovery Path */}
          <div className="space-y-6 md:space-y-8 animate-slide-up mt-12 xl:mt-0" style={{ animationDelay: '0.2s' }}>
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyber-teal to-neon-purple rounded-2xl mb-4 md:mb-6 shadow-neural">
                <Brain className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl text-navy-deep mb-2 md:mb-3 font-bold">AI-Powered Discovery</h3>
              <p className="text-navy-light text-sm md:text-base">For families needing immediate assistance</p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {discoverySteps.map((step, index) => (
                <div key={index} className="group interactive-card glass-morphism p-6 md:p-8 rounded-3xl border border-white/30 backdrop-blur-xl">
                  <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-neon-purple to-cyber-teal rounded-2xl flex items-center justify-center shadow-neural group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-sm md:text-lg">{index + 1}</span>
                      </div>
                    </div>
                    <div className="space-y-3 md:space-y-4 flex-grow text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                        <step.icon className="h-5 w-5 md:h-6 md:w-6 text-neon-purple" />
                        <h4 className="font-bold text-navy-deep text-base md:text-lg">{step.title}</h4>
                        <span className="text-xs font-semibold text-neon-purple bg-neon-purple/10 px-2 md:px-3 py-1 rounded-full">
                          {step.highlight}
                        </span>
                      </div>
                      <p className="text-navy-light leading-relaxed text-sm md:text-base">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 md:pt-8">
              <Button variant="quantum" size="lg" className="w-full group text-sm md:text-base py-3 md:py-4">
                Request AI Discovery Report
                <Sparkles className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="glass-morphism p-12 rounded-3xl border border-white/30 backdrop-blur-xl max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Zap className="h-8 w-8 text-electric-blue" />
                <h3 className="text-2xl font-bold text-navy-deep">Ready to Secure Your Legacy?</h3>
              </div>
              <p className="text-navy-light text-lg leading-relaxed">
                Join thousands of families who have protected their digital wealth with our AI-powered platform.
              </p>
              <Button variant="hero" size="xl" className="group">
                Book Free AI Consultation
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;