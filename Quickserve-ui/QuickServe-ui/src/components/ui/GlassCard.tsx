import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "strong" | "glow";
  children: React.ReactNode;
}

export const GlassCard = ({
  variant = "default",
  className,
  children,
  ...props
}: GlassCardProps) => {
  const variants = {
    default: "glass-card",
    strong: "glass-card-strong",
    glow: "glass-card glow-hover",
  };

  return (
    <motion.div
      className={cn(
        "rounded-2xl p-6",
        variants[variant],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
