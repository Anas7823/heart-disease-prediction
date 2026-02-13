// Je cree l'animation de chargement cinematique avec tracé ECG et messages sequentiels
"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ANALYSIS_STEPS = [
  { text: "Calcul des features engineered...", duration: 1200 },
  { text: "Interrogation du modele XGBoost (1 787 arbres)...", duration: 1500 },
  { text: "Analyse SHAP des contributions...", duration: 1000 },
  { text: "Generation du consensus...", duration: 800 },
];

export function AnalysisLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);

  // Je fais defiler les messages sequentiellement
  useEffect(() => {
    if (stepIndex >= ANALYSIS_STEPS.length - 1) return;
    const timer = setTimeout(() => {
      setStepIndex((prev) => prev + 1);
    }, ANALYSIS_STEPS[stepIndex].duration);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.from(".loader-content", {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto py-16">
      <div className="loader-content glass p-8 sm:p-12 text-center">
        {/* Ligne ECG animee */}
        <div className="flex justify-center mb-8">
          <svg
            viewBox="0 0 400 80"
            className="w-full max-w-[400px] h-20"
            aria-label="Animation ECG en cours"
          >
            {/* Ligne de fond */}
            <line
              x1="0" y1="40" x2="400" y2="40"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />

            {/* Trace ECG anime */}
            <path
              d="M0,40 L60,40 L70,40 L80,20 L90,60 L100,10 L110,70 L120,35 L130,40 L200,40 L210,40 L220,20 L230,60 L240,10 L250,70 L260,35 L270,40 L340,40 L350,40 L360,20 L370,60 L380,10 L390,70 L400,40"
              fill="none"
              stroke="url(#ecgGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ecg-trace"
            />

            {/* Point lumineux qui suit le trace */}
            <circle r="4" fill="#DC2626" className="ecg-dot">
              <animateMotion
                dur="2.5s"
                repeatCount="indefinite"
                path="M0,40 L60,40 L70,40 L80,20 L90,60 L100,10 L110,70 L120,35 L130,40 L200,40 L210,40 L220,20 L230,60 L240,10 L250,70 L260,35 L270,40 L340,40 L350,40 L360,20 L370,60 L380,10 L390,70 L400,40"
              />
            </circle>
            <circle r="8" fill="#DC2626" opacity="0.3" className="ecg-dot-glow">
              <animateMotion
                dur="2.5s"
                repeatCount="indefinite"
                path="M0,40 L60,40 L70,40 L80,20 L90,60 L100,10 L110,70 L120,35 L130,40 L200,40 L210,40 L220,20 L230,60 L240,10 L250,70 L260,35 L270,40 L340,40 L350,40 L360,20 L370,60 L380,10 L390,70 L400,40"
              />
            </circle>

            <defs>
              <linearGradient id="ecgGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#DC2626" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#DC2626" stopOpacity="1" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Message principal */}
        <p className="text-lg sm:text-xl font-semibold mb-3">
          Analyse en cours
        </p>

        {/* Messages sequentiels */}
        <div className="h-6 flex items-center justify-center">
          <p
            key={stepIndex}
            className="text-sm text-text-secondary animate-fade-in"
          >
            {ANALYSIS_STEPS[stepIndex].text}
          </p>
        </div>

        {/* Barre de progression */}
        <div className="mt-8 mx-auto max-w-xs">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full gradient-bg rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${((stepIndex + 1) / ANALYSIS_STEPS.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {ANALYSIS_STEPS.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i <= stepIndex ? "bg-accent-red" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
