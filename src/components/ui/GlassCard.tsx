// Je cree le composant GlassCard reutilisable avec effet glassmorphism
"use client";

import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function GlassCard({
  children,
  className,
  hover = true,
  animate = true,
  padding = "md",
  onClick,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animate || !ref.current) return;
      gsap.from(ref.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={clsx(
        "glass",
        paddingMap[padding],
        hover && "glass-hover",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
