import { motion } from "framer-motion";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  glowOnHover?: boolean;
}

export const AnimatedButton = ({
  className,
  children,
  glowOnHover = false,
  ...props
}: AnimatedButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          glowOnHover && "hover:shadow-glow",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};
