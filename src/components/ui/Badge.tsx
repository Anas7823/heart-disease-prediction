// Je cree le composant Badge colore pour les niveaux de risque
import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "red" | "emerald" | "warning" | "rose" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

const variantClasses = {
  red: "bg-accent-red/15 text-accent-red border-accent-red/30",
  emerald: "bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30",
  warning: "bg-accent-warning/15 text-accent-warning border-accent-warning/30",
  rose: "bg-accent-rose/15 text-accent-rose border-accent-rose/30",
  neutral: "bg-white/5 text-text-secondary border-white/10",
};

export function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium rounded-full border",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3.5 py-1 text-sm",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
