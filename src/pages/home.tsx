import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star, Users, Calendar, Shield } from "lucide-react";
import { QuickServeLogo, DeerIcon, WolfIcon, LionIcon } from "@/components/icons/AnimalIcons";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageTransition, FadeInSection } from "@/components/layout/PageTransition";
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";


const features = [
  { icon: Star, title: "Top-Rated Providers", description: "Access verified, highly-rated local professionals" },
  { icon: Calendar, title: "Easy Booking", description: "Book appointments in seconds with real-time availability" },
  { icon: Shield, title: "Secure Payments", description: "Safe and protected transactions every time" },
  { icon: Users, title: "Trusted Community", description: "Join thousands of satisfied customers" },
];

const Index = () => {

  const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <QuickServeLogo size={36} />
              <span className="text-xl font-display font-bold gradient-text">QuickServe</span>
            </div>

            
            <div className="flex items-center gap-3">
              <Link to="/login">
                <AnimatedButton variant="ghost">Sign In</AnimatedButton>
              </Link>
              <Link to="/register">
                <AnimatedButton className="bg-primary hover:bg-primary/90" glowOnHover>
                  Get Started
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-mint/20 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

          <div className="container mx-auto text-center relative z-10">
            <FadeInSection>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
                Discover Local Services
                <br />
                <span className="gradient-text">Book in Seconds</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Connect with trusted professionals in your area. From home repairs to wellness services – QuickServe brings quality to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <AnimatedButton size="lg" className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg" glowOnHover>
                    Start Exploring
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </AnimatedButton>
                </Link>
                <Link to="/login">
                  <AnimatedButton size="lg" variant="outline" className="h-14 px-8 text-lg">
                    I'm a Provider
                  </AnimatedButton>
                </Link>
              </div>
            </FadeInSection>

            {/* Role Cards */}
            <FadeInSection delay={0.3}>
              <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
                {[
                  { Icon: DeerIcon, title: "Customers", desc: "Find & book services", link: "/register" },
                  { Icon: WolfIcon, title: "Providers", desc: "Grow your business", link: "/register" },
                  { Icon: LionIcon, title: "Admins", desc: "Manage platform", link: "/login" },
                ].map((role, i) => (
                  <Link to={role.link} key={role.title}>
                    <GlassCard variant="glow" className="text-center hover:scale-105 transition-transform cursor-pointer">
                      <role.Icon size={64} className="mx-auto mb-4" />
                      <h3 className="font-display font-bold text-lg text-foreground">{role.title}</h3>
                      <p className="text-muted-foreground text-sm">{role.desc}</p>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-12">
                Why Choose <span className="gradient-text">QuickServe</span>?
              </h2>
            </FadeInSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <FadeInSection key={feature.title} delay={i * 0.1}>
                  <GlassCard className="text-center h-full">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </GlassCard>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
{/* Footer */}
<footer className="py-4 px-4 border-t border-border bg-card/50 backdrop-blur">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3">

    {/* Brand */}
    <div
      onClick={scrollToTop}
      className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
    >
      <QuickServeLogo size={24} />
      <span className="font-display font-medium text-sm text-foreground">
        QuickServe
      </span>
    </div>

    {/* Social Icons */}
    <div className="flex items-center gap-4">
      {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
        <button
          key={i}
          onClick={scrollToTop}
          className="p-1.5 rounded-full bg-secondary/60 hover:bg-primary/20 hover:scale-105 transition-all"
        >
          <Icon className="h-4 w-4 text-muted-foreground hover:text-primary" />
        </button>
      ))}
    </div>

    {/* Back to top */}
    <button
      onClick={scrollToTop}
      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition"
    >
      Back to top
      <ArrowUp className="h-4 w-4" />
    </button>

  </div>

  {/* Copyright */}
  <p className="text-center text-xs text-muted-foreground mt-2">
    © 2026 QuickServe. Built for local trust.
  </p>
</footer>

      </div>
    </PageTransition>
  );
};

export default Index;
