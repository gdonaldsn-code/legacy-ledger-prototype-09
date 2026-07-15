import { Heart, Clock, DollarSign, Brain, Zap, Shield, ArrowRight, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhyLegacySection = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Prevent Asset Loss",
      description: "Automated discovery helps prevent your family's assets from disappearing into unclaimed property databases.",
      gradient: "from-electric-blue to-cyber-teal",
      highlight: "Fewer lost accounts"
    },
    {
      icon: Heart,
      title: "Reduce Emotional Burden",
      description: "We handle the paperwork and phone calls so families can focus on healing and remembrance.",
      gradient: "from-cyber-teal to-neon-purple",
      highlight: "Less on your plate"
    },
    {
      icon: Zap,
      title: "Accelerate Resolution",
      description: "Estate discovery that traditionally takes months can move much faster with dedicated support.",
      gradient: "from-neon-purple to-success-green",
      highlight: "Faster resolution"
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background with neural networks */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 neural-gradient rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 md:w-72 md:h-72 mesh-gradient rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 lg:mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-electric-blue to-cyber-teal bg-clip-text text-transparent font-bold text-sm tracking-wider uppercase mb-6">
            <Target className="h-4 w-4 text-electric-blue" />
            Why It Matters
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 md:mb-6 font-black">Why Families Choose Legacy Ledger</h2>
          <p className="text-lg md:text-xl text-blue-soft max-w-4xl mx-auto leading-relaxed">
            Technology paired with compassionate support, so families get real help during a hard time.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto mb-12 md:mb-16 lg:mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Animated glow background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-20 rounded-3xl blur-xl group-hover:opacity-40 transition-all duration-500`} />
              
              <div className="relative glass-morphism p-6 md:p-10 rounded-3xl border border-white/20 backdrop-blur-xl interactive-card">
                <div className="text-center space-y-4 md:space-y-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${benefit.gradient} rounded-2xl shadow-glow group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                      <h3 className="text-white text-lg md:text-xl font-bold">{benefit.title}</h3>
                      <span className="text-xs font-semibold text-electric-blue bg-electric-blue/10 px-2 md:px-3 py-1 rounded-full">
                        {benefit.highlight}
                      </span>
                    </div>
                    <p className="text-blue-soft leading-relaxed text-sm md:text-base">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Our commitment */}
        <div className="max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="glass-morphism rounded-3xl p-6 md:p-12 border border-white/20 text-center">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <Heart className="h-8 w-8 md:h-12 md:w-12 text-electric-blue" />
                <div className="h-1 bg-gradient-to-r from-electric-blue to-cyber-teal rounded-full w-16 md:w-24" />
              </div>

              <blockquote className="text-lg md:text-xl lg:text-2xl text-blue-soft leading-relaxed">
                Our goal is simple: make sure no family loses track of what a loved one left behind,
                and handle the process with the same care we'd want for our own family.
              </blockquote>

              <Button variant="hero" size="lg" className="group text-sm md:text-base px-6 md:px-8 py-3 md:py-4">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLegacySection;