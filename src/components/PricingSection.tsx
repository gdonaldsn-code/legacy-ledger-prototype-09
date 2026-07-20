import { useState } from "react";
import { Check, Star, Shield, Zap, Brain, Rocket, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { PricingPlanId } from "@/integrations/stripe/client";

const PricingSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [checkingOutPlan, setCheckingOutPlan] = useState<PricingPlanId | null>(null);

  const plans: Array<{
    id: PricingPlanId;
    name: string;
    description: string;
    price: string;
    period: string;
    popular: boolean;
    gradient: string;
    icon: typeof Brain;
    features: string[];
    cta: string;
    highlight: string;
  }> = [
    {
      id: "legacy-protection",
      name: "Legacy Protection",
      description: "Proactive digital estate planning platform",
      price: "$5-10",
      period: "/month",
      popular: false,
      gradient: "from-cyber-teal to-success-green",
      icon: Shield,
      features: [
        "Encrypted digital vault with secure access",
        "Ongoing financial account monitoring",
        "Executor access with identity verification",
        "Legal document vault with version history",
        "Automated release protocols when the time comes",
        "Estate planning consultation included"
      ],
      cta: "Start Protection",
      highlight: "Free 30-day trial"
    },
    {
      id: "discovery-report",
      name: "AI Discovery Report",
      description: "Perfect for immediate estate scanning needs",
      price: "$299",
      period: "one-time",
      popular: false,
      gradient: "from-electric-blue to-cyber-teal",
      icon: Brain,
      features: [
        "Automated account discovery across financial institutions",
        "Digital asset mapping & estimated valuation",
        "Alerts for suspicious or at-risk account activity",
        "Professional estate summary with legal guidance",
        "Step-by-step closure instructions & documentation",
        "Priority support with estate specialists"
      ],
      cta: "Request Discovery Report",
      highlight: "Automated search"
    },
    {
      id: "concierge-execution",
      name: "Concierge Execution",
      description: "Complete white-glove estate management",
      price: "$699",
      period: "full-service",
      popular: true,
      gradient: "from-neon-purple via-electric-blue to-cyber-teal",
      icon: Rocket,
      features: [
        "Everything in AI Discovery Report",
        "Full account closure & asset recovery management",
        "Legal document preparation & submission",
        "Real-time progress tracking with live updates",
        "Direct communication with financial institutions",
        "Estate distribution coordination & tax guidance",
        "Dedicated concierge specialist assigned"
      ],
      cta: "Get Full Service",
      highlight: "100% managed"
    }
  ];

  const handleCtaClick = async (planId: PricingPlanId) => {
    if (!user) {
      navigate("/register");
      return;
    }

    setCheckingOutPlan(planId);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data, error } = await supabase.functions.invoke("create-checkout-session", {
      body: { planId, origin: window.location.origin },
      headers: session ? { Authorization: `Bearer ${session.access_token}` } : undefined,
    });

    setCheckingOutPlan(null);

    if (error || !data?.url) {
      toast({
        title: "Couldn't start checkout",
        description: error?.message ?? "Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    window.location.href = data.url;
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Advanced background with animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-medium to-navy-light" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 neural-gradient rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-0 right-1/4 w-36 h-36 md:w-72 md:h-72 mesh-gradient rounded-full blur-3xl opacity-15 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 lg:mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-electric-blue to-cyber-teal bg-clip-text text-transparent font-bold text-sm tracking-wider uppercase mb-6">
            <Sparkles className="h-4 w-4 text-electric-blue" />
            Simple Pricing
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 md:mb-6 font-black">Choose the Right Plan for Your Family</h2>
          <p className="text-lg md:text-xl text-blue-soft max-w-4xl mx-auto leading-relaxed">
            Transparent pricing designed for every family's needs.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group animate-slide-up ${
                plan.popular 
                  ? 'transform lg:scale-105 lg:-translate-y-4' 
                  : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 md:-top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="glass-morphism px-4 md:px-6 py-1 md:py-2 rounded-full border border-white/30 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-white font-semibold text-xs md:text-sm">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-electric-blue" />
                      Most Popular
                    </div>
                  </div>
                </div>
              )}

              {/* Animated background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-20 rounded-3xl blur-xl group-hover:opacity-40 transition-all duration-500`} />
              
              {/* Main card */}
              <div className="relative glass-morphism rounded-3xl p-6 md:p-8 border border-white/20 backdrop-blur-xl h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                  <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl mb-4 shadow-glow group-hover:scale-110 transition-transform`}>
                    <plan.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  
                  <h3 className="text-white text-lg md:text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-blue-soft text-sm leading-relaxed">{plan.description}</p>
                  
                  <div className="mt-4 md:mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl md:text-4xl font-black text-white">{plan.price}</span>
                      {plan.period && (
                        <span className="text-blue-soft ml-2 font-medium text-sm md:text-base">{plan.period}</span>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-2 mt-2 text-xs font-semibold text-cyber-teal bg-cyber-teal/10 px-2 md:px-3 py-1 rounded-full">
                      <Zap className="h-3 w-3" />
                      {plan.highlight}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-success-green" />
                      </div>
                      <span className="text-blue-soft text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button
                    onClick={() => handleCtaClick(plan.id)}
                    disabled={checkingOutPlan === plan.id}
                    variant={plan.popular ? "quantum" : "hero"}
                    size="lg"
                    className="w-full group text-sm md:text-base py-3 md:py-4"
                  >
                    {checkingOutPlan === plan.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="glass-morphism rounded-3xl p-8 border border-white/20 backdrop-blur-xl max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Shield, label: "30-day money-back guarantee" },
                { icon: Zap, label: "No hidden fees or charges" },
                { icon: Brain, label: "Automated & continuously improving" },
                { icon: Star, label: "Built around estate-planning best practices" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-3 group">
                  <item.icon className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300 group-hover:scale-110 transition-transform" />
                  <span className="text-blue-soft text-sm font-medium group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="space-y-4">
            <h3 className="text-white text-2xl font-bold">Need Enterprise Solutions?</h3>
            <p className="text-blue-soft">Custom AI integration for law firms, financial advisors, and estate planning professionals.</p>
            <Button variant="glass" size="lg" className="group" asChild>
              <a href="mailto:support@legacyledger.xyz">
              Contact Enterprise Team
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;