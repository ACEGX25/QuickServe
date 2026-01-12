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

const API_BASE = "http://localhost:8080";

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

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Login failed",
          description: data?.message || "Invalid credentials",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }


      // 🔐 Persist auth (unchanged from old logic)
      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting...",
      });

      localStorage.setItem("token", data.token);

      const rawRole = data.role;

// Normalize role into array
      const roles: string[] = Array.isArray(rawRole)
          ? rawRole
          : typeof rawRole === "string"
              ? rawRole.replace(/[\[\]\s]/g, "").split(",")
              : [];

// 🚨 ADMIN FIRST
      if (roles.includes("ROLE_ADMIN")) {
        navigate("/admin");
        return;
      }

// 🚨 PROVIDER
      if (roles.includes("ROLE_PROVIDER")) {
        if (!data.detailsFilled) {
          navigate("/provider/onboard");
        } else {
          navigate("/provider");
        }
        return;
      }

// 🚨 CUSTOMER (default)
      navigate("/customer");
    } catch (err) {
      console.error(err);
      toast({
        title: "Network error",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <PageTransition>
        <div className="min-h-screen flex">
          {/* Left */}
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

              <h2 className="text-3xl font-display font-bold mb-2">
                Welcome back
              </h2>
              <p className="text-muted-foreground mb-8">
                Sign in to continue to your dashboard
              </p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 bg-secondary/50"
                        required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 bg-secondary/50"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <AnimatedButton
                    type="submit"
                    className="w-full h-12"
                    glowOnHover
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <motion.div
                          className="h-5 w-5 border-2 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                      />
                  ) : (
                      <>
                        Sign In <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                  )}
                </AnimatedButton>
              </form>

              <p className="mt-8 text-center text-muted-foreground">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary font-semibold">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>

          {/* Right (unchanged visual) */}
          <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-emerald-light to-accent items-center justify-center">
            <GlassCard className="text-center">
              <QuickServeLogo size={80} />
            </GlassCard>
          </div>
        </div>
      </PageTransition>
  );
};

export default Login;
