// Je cree le composant MetricCard avec animation de comptage
"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  description?: string;
  highlight?: boolean;
  className?: string;
}

export function MetricCard({
  label,
  value,
  suffix = "",
  prefix = "",
  decimals = 2,
  description,
  highlight,
  className,
}: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useGSAP(
    () => {
      if (!ref.current) return;
      const counter = { val: 0 };
      gsap.to(counter, {
        val: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => setDisplayValue(counter.val),
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={clsx(
        "glass p-6 text-center",
        highlight && "border-accent-red/30 shadow-lg shadow-accent-red/5",
        className
      )}
    >
      <p className="text-xs sm:text-sm text-text-secondary mb-2 uppercase tracking-wider font-medium">
        {label}
      </p>
      <p className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold gradient-text">
        {prefix}
        {displayValue.toFixed(decimals)}
        {suffix}
      </p>
      {description && (
        <p className="text-xs text-text-muted mt-3 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
