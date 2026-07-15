import { Heart, Brain, Sparkles, CheckCircle, ArrowRight, Check, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const steps = [
  {
    icon: Brain,
    title: "Comprehensive Digital Asset Search",
    description:
      "We search financial institutions and public unclaimed-property databases to build a picture of what accounts and assets exist.",
  },
  {
    icon: Sparkles,
    title: "Intelligence Report",
    description: "A clear account summary with estimated values and a roadmap for next steps.",
  },
  {
    icon: CheckCircle,
    title: "Concierge Execution",
    description: "Our team can handle the paperwork, calls, and legal processes on your behalf.",
  },
];

const plans = [
  {
    name: "AI Discovery Report",
    price: "$299",
    period: "one-time",
    icon: Brain,
    gradient: "from-electric-blue to-cyber-teal",
    features: [
      "Automated account discovery across financial institutions",
      "Digital asset mapping & estimated valuation",
      "Professional estate summary with legal guidance",
      "Step-by-step closure instructions & documentation",
    ],
    cta: "Request Discovery Report",
  },
  {
    name: "Concierge Execution",
    price: "$699",
    period: "full-service",
    icon: Rocket,
    gradient: "from-neon-purple via-electric-blue to-cyber-teal",
    features: [
      "Everything in AI Discovery Report",
      "Full account closure & asset recovery management",
      "Legal document preparation & submission",
      "Dedicated concierge specialist assigned",
    ],
    cta: "Get Full Service",
  },
];

const FindAccounts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-navy-deep to-navy-medium">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 glass-morphism px-4 py-2 rounded-full border border-white/20 text-sm text-white mb-6">
            <Heart className="h-4 w-4 text-electric-blue" />
            For families navigating a loss
          </div>
          <h1 className="text-white mb-6">Find What Your Loved One Left Behind</h1>
          <p className="text-lg md:text-xl text-blue-soft leading-relaxed mb-8 max-w-2xl mx-auto">
            We know this is a hard time. We're here to help you find their accounts and assets,
            and handle as much of the process as you need us to.
          </p>
          <Button onClick={() => navigate("/register?intent=discovery")} variant="hero" size="lg" className="group">
            Start Discovery
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.title} className="p-6 rounded-2xl border border-border bg-card shadow-soft">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-navy-deep to-navy-medium">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className="glass-morphism rounded-3xl p-8 border border-white/20">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 shadow-glow`}>
                  <plan.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-blue-soft ml-2 text-sm">{plan.period}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success-green flex-shrink-0 mt-0.5" />
                      <span className="text-blue-soft text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => navigate("/register?intent=discovery")} variant="hero" size="lg" className="w-full">
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FindAccounts;
