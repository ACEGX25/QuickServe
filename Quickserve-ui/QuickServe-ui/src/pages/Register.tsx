import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { QuickServeLogo, LionIcon, WolfIcon, DeerIcon } from "@/components/icons/AnimalIcons";
import { PageTransition } from "@/components/layout/PageTransition";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type UserRole = "customer" | "provider" | "admin";

const roles = [
  {
    id: "customer" as UserRole,
    title: "Customer",
    description: "Find and book local services",
    Icon: DeerIcon,
  },
  {
    id: "provider" as UserRole,
    title: "Service Provider",
    description: "Offer your services to customers",
    Icon: WolfIcon,
  },
  {
    id: "admin" as UserRole,
    title: "Administrator",
    description: "Manage platform and users",
    Icon: LionIcon,
  },
];

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole | "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleSelect = (role: UserRole) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.fullName || !formData.email)) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    if (step === 2) {
      if (!formData.password || !formData.confirmPassword) {
        toast({
          title: "Missing password",
          description: "Please enter and confirm your password",
          variant: "destructive",
        });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match",
          variant: "destructive",
        });
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role) {
      toast({
        title: "Select a role",
        description: "Please select your account type",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Welcome to QuickServe. Redirecting...",
      });
      if (formData.role === "admin") {
        navigate("/admin");
      } else if (formData.role === "provider") {
        navigate("/provider");
      } else {
        navigate("/customer");
      }
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-mint-light/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <motion.div
          className="w-full max-w-lg relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <QuickServeLogo size={48} />
            <h1 className="text-2xl font-display font-bold gradient-text">
              QuickServe
            </h1>
          </div>

          <GlassCard variant="strong" className="relative">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <motion.div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    )}
                    animate={step === s ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </motion.div>
                  {s < 3 && (
                    <div
                      className={cn(
                        "w-12 h-1 mx-2 rounded-full transition-all duration-300",
                        step > s ? "bg-primary" : "bg-secondary"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-display font-bold text-foreground">
                        Create your account
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        Let's start with your basic info
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Mike"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className="pl-10 h-12 bg-secondary/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10 h-12 bg-secondary/50"
                          required
                        />
                      </div>
                    </div>

                    <AnimatedButton
                      type="button"
                      onClick={handleNext}
                      className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                      glowOnHover
                    >
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </AnimatedButton>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-display font-bold text-foreground">
                        Secure your account
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        Create a strong password
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10 pr-10 h-12 bg-secondary/50"
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

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="pl-10 h-12 bg-secondary/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <AnimatedButton
                        type="button"
                        onClick={handleBack}
                        variant="outline"
                        className="flex-1 h-12 text-base font-semibold"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </AnimatedButton>
                      <AnimatedButton
                        type="button"
                        onClick={handleNext}
                        className="flex-1 h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                        glowOnHover
                      >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </AnimatedButton>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-display font-bold text-foreground">
                        Choose your role
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        Select how you'll use QuickServe
                      </p>
                    </div>

                    <div className="space-y-4">
                      {roles.map(({ id, title, description, Icon }) => (
                        <motion.button
                          key={id}
                          type="button"
                          onClick={() => handleRoleSelect(id)}
                          className={cn(
                            "w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-300 text-left",
                            formData.role === id
                              ? "border-primary bg-primary/10 shadow-md"
                              : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50"
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon size={56} />
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{title}</h3>
                            <p className="text-sm text-muted-foreground">{description}</p>
                          </div>
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                              formData.role === id
                                ? "border-primary bg-primary"
                                : "border-border"
                            )}
                          >
                            {formData.role === id && <Check className="h-4 w-4 text-primary-foreground" />}
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <AnimatedButton
                        type="button"
                        onClick={handleBack}
                        variant="outline"
                        className="flex-1 h-12 text-base font-semibold"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </AnimatedButton>
                      <AnimatedButton
                        type="submit"
                        className="flex-1 h-12 text-base font-semibold bg-primary hover:bg-primary/90"
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
                            Create Account
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </AnimatedButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <p className="mt-6 text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Register;
