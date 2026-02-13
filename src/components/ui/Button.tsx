// Je cree le composant Button avec variantes gradient et glass
import { ReactNode, ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "gradient" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "gradient",
  size = "md",
  className,
  disabled,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    gradient:
      "gradient-bg text-white font-semibold hover:opacity-90 shadow-lg shadow-accent-red/20",
    glass: "glass glass-hover text-text-primary font-medium",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5 font-medium",
  };

  return (
    <button
      className={clsx(
        "rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
