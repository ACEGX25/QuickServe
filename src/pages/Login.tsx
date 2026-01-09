import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { QuickServeLogo } from "@/components/icons/AnimalIcons";
import { PageTransition } from "@/components/layout/PageTransition";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting...",
      });
      // Demo: redirect based on email pattern
      if (email.includes("admin")) {
        navigate("/admin");
      } else if (email.includes("provider")) {
        navigate("/provider");
      } else {
        navigate("/customer");
      }
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <QuickServeLogo size={48} />
              <h1 className="text-2xl font-display font-bold gradient-text">
                QuickServe
              </h1>
            </div>

            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Welcome back
            </h2>
            <p className="text-muted-foreground mb-8">
              Sign in to continue to your dashboard
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-secondary/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-secondary/50 border-border focus:border-primary focus:ring-primary/20 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <AnimatedButton
                type="submit"
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                glowOnHover
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </AnimatedButton>
            </form>

            <p className="mt-8 text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-emerald-light to-accent items-center justify-center p-12 relative overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-foreground/20 blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-mint/30 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
          </div>

          <GlassCard
            variant="strong"
            className="relative z-10 max-w-lg text-center bg-card/10 border-primary-foreground/20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <QuickServeLogo size={80} className="mx-auto mb-6" />
              <h3 className="text-2xl font-display font-bold text-primary-foreground mb-4">
                Discover Local Services
              </h3>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Connect with trusted service providers in your area. From home repairs to wellness services – QuickServe brings quality services to your doorstep.
              </p>
            </motion.div>
          </GlassCard>

          {/* Decorative Elements */}
          <motion.div
            className="absolute bottom-10 left-10 w-20 h-20 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-10 right-10 w-16 h-16 rounded-full bg-mint/30 backdrop-blur-sm"
            animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
