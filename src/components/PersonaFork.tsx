import { Shield, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PersonaFork = () => {
  const navigate = useNavigate();

  const paths = [
    {
      icon: Shield,
      title: "I'm Planning Ahead",
      description:
        "Organize your accounts, documents, and wishes now, so your family isn't left guessing later.",
      cta: "See Legacy Protection",
      route: "/plan-ahead",
    },
    {
      icon: Heart,
      title: "I Need Help Now",
      description:
        "A loved one has passed and you need to find their accounts and assets. We can help you start today.",
      cta: "See Discovery Options",
      route: "/find-accounts",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Which describes you?
          </h2>
          <p className="text-muted-foreground">We'll point you to the right place.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {paths.map((path) => (
            <button
              key={path.route}
              onClick={() => navigate(path.route)}
              className="group text-left p-6 md:p-8 rounded-2xl border border-border bg-card shadow-soft hover:shadow-elevated transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <path.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{path.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {path.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {path.cta}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonaFork;
