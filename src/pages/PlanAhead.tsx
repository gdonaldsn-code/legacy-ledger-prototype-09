import { Shield, Brain, Zap, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const steps = [
  {
    icon: Shield,
    title: "Secure Digital Vault",
    description:
      "Encrypted storage for your financial accounts, passwords, and critical documents.",
  },
  {
    icon: Brain,
    title: "Smart Executor Network",
    description:
      "Assign the people you trust, with identity verification before they ever get access.",
  },
  {
    icon: Zap,
    title: "Automated Release Protocol",
    description:
      "Access is released to your executor only when the time comes — nothing before.",
  },
];

const features = [
  "Encrypted digital vault with secure access",
  "Ongoing financial account monitoring",
  "Executor access with identity verification",
  "Legal document vault with version history",
  "Automated release protocols when the time comes",
  "Estate planning consultation included",
];

const PlanAhead = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-navy-deep to-navy-medium">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 glass-morphism px-4 py-2 rounded-full border border-white/20 text-sm text-white mb-6">
            <Shield className="h-4 w-4 text-electric-blue" />
            For proactive planners
          </div>
          <h1 className="text-white mb-6">Plan Ahead for Your Family's Future</h1>
          <p className="text-lg md:text-xl text-blue-soft leading-relaxed mb-8 max-w-2xl mx-auto">
            Organize your accounts, documents, and wishes now — so the people you love aren't
            left guessing later.
          </p>
          <Button onClick={() => navigate("/register?intent=planning")} variant="hero" size="lg" className="group">
            Start Legacy Protection
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
        <div className="container mx-auto px-4 md:px-6 max-w-lg">
          <div className="glass-morphism rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-cyber-teal to-success-green flex items-center justify-center mb-4 shadow-glow">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Legacy Protection</h3>
            <div className="flex items-baseline justify-center mb-6">
              <span className="text-4xl font-black text-white">$5-10</span>
              <span className="text-blue-soft ml-2">/month</span>
            </div>
            <div className="space-y-3 text-left mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success-green flex-shrink-0 mt-0.5" />
                  <span className="text-blue-soft text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <Button onClick={() => navigate("/register?intent=planning")} variant="hero" size="lg" className="w-full">
              Start Free 30-Day Trial
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlanAhead;
