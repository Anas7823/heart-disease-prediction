// Je cree le diagramme du pipeline d'entrainement
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PIPELINE_STEPS } from "@/lib/constants";
import { ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PipelineFlow() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".pipeline-node", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {PIPELINE_STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2 md:gap-3">
          <div className="pipeline-node glass px-4 py-3 text-center min-w-[100px]">
            <span className="block text-[10px] font-mono text-accent-red mb-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="block text-xs font-semibold">{step.label}</span>
          </div>
          {i < PIPELINE_STEPS.length - 1 && (
            <ChevronRight size={16} className="text-text-muted shrink-0 hidden md:block" />
          )}
        </div>
      ))}
    </div>
  );
}
