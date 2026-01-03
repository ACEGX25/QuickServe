import { motion } from "framer-motion";

interface IconProps {
  className?: string;
  size?: number;
}

export const LionIcon = ({ className = "", size = 48 }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <circle cx="32" cy="32" r="28" className="fill-primary/10" />
    <path
      d="M32 12C20.954 12 12 20.954 12 32s8.954 20 20 20 20-8.954 20-20S43.046 12 32 12z"
      className="fill-primary/20"
    />
    <path
      d="M32 16c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zm0 28c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z"
      className="fill-primary"
    />
    <circle cx="27" cy="30" r="2" className="fill-primary" />
    <circle cx="37" cy="30" r="2" className="fill-primary" />
    <path
      d="M32 36c-2 0-3.5 1-3.5 2s1.5 2 3.5 2 3.5-1 3.5-2-1.5-2-3.5-2z"
      className="fill-primary"
    />
    <path
      d="M22 24c-2-4-6-6-8-4s0 6 2 8M42 24c2-4 6-6 8-4s0 6-2 8"
      className="stroke-primary"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M20 20c-3-2-6-1-7 1s1 5 4 6M44 20c3-2 6-1 7 1s-1 5-4 6"
      className="stroke-primary"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);

export const WolfIcon = ({ className = "", size = 48 }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <circle cx="32" cy="32" r="28" className="fill-primary/10" />
    <path
      d="M20 18l-4-8 8 6 8-4 8 4 8-6-4 8"
      className="fill-primary/30"
    />
    <path
      d="M32 50c-10 0-16-8-16-18 0-8 6-14 16-14s16 6 16 14c0 10-6 18-16 18z"
      className="fill-primary/20"
    />
    <ellipse cx="32" cy="36" rx="12" ry="10" className="fill-card" />
    <circle cx="26" cy="32" r="2.5" className="fill-primary" />
    <circle cx="38" cy="32" r="2.5" className="fill-primary" />
    <ellipse cx="32" cy="38" rx="3" ry="2" className="fill-primary" />
    <path
      d="M29 42l3 4 3-4"
      className="stroke-primary"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 18l-2-6M44 18l2-6"
      className="stroke-primary"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);

export const DeerIcon = ({ className = "", size = 48 }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <circle cx="32" cy="32" r="28" className="fill-primary/10" />
    <path
      d="M22 12c-2-4 0-8 2-8s4 4 4 8c0 2-1 4-3 4s-3-2-3-4z"
      className="fill-primary/40"
    />
    <path
      d="M42 12c2-4 0-8-2-8s-4 4-4 8c0 2 1 4 3 4s3-2 3-4z"
      className="fill-primary/40"
    />
    <path
      d="M19 10c-2-3-1-6 1-6s3 2 3 5M45 10c2-3 1-6-1-6s-3 2-3 5"
      className="stroke-primary"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <ellipse cx="32" cy="38" rx="14" ry="16" className="fill-primary/20" />
    <ellipse cx="32" cy="40" rx="10" ry="12" className="fill-card" />
    <circle cx="27" cy="36" r="2" className="fill-primary" />
    <circle cx="37" cy="36" r="2" className="fill-primary" />
    <ellipse cx="32" cy="44" rx="2.5" ry="1.5" className="fill-primary" />
    <path
      d="M28 48c2 2 6 2 8 0"
      className="stroke-primary"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </motion.svg>
);

export const QuickServeLogo = ({ className = "", size = 40 }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http:/2000/svg"
    className={className}
    whileHover={{ rotate: 360 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(152 69% 40%)" />
        <stop offset="100%" stopColor="hsl(160 84% 39%)" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />
    <path
      d="M16 24l6 6 10-12"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="24"
      cy="24"
      r="18"
      stroke="white"
      strokeWidth="2"
      strokeOpacity="0.3"
      fill="none"
    />
  </motion.svg>
);
