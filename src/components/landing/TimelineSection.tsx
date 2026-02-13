// Je cree la timeline du pipeline de notre projet
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PIPELINE_STEPS } from "@/lib/constants";
import {
  Database,
  Search,
  Wrench,
  Brain,
  BarChart3,
  Rocket,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEP_ICONS = [Database, Search, Wrench, Brain, BarChart3, Rocket];

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".timeline-step", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="section-spacing">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Notre approche
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Du dataset brut au diagnostic IA : un pipeline rigoureux en 6
            etapes.
          </p>
        </div>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Ligne verticale */}
          <div className="timeline-line absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-red via-accent-red-dark to-transparent" />

          <div className="space-y-8">
            {PIPELINE_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div
                  key={step.id}
                  className="timeline-step relative flex items-start gap-6 md:gap-8"
                >
                  {/* Point sur la timeline */}
                  <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl gradient-bg flex items-center justify-center shrink-0 shadow-lg shadow-accent-red/20">
                    <Icon size={20} className="text-white" />
                  </div>

                  {/* Contenu */}
                  <div className="glass p-5 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-accent-red">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold">{step.label}</h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
