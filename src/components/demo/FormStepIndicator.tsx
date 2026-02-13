// Je cree l'indicateur de progression des etapes du formulaire
"use client";

import { FORM_STEPS } from "@/lib/constants";
import { clsx } from "clsx";
import { Check } from "lucide-react";

interface FormStepIndicatorProps {
  currentStep: number;
  showResult: boolean;
}

export function FormStepIndicator({
  currentStep,
  showResult,
}: FormStepIndicatorProps) {
  const allSteps = [...FORM_STEPS.map((s) => s.label), "Resultat"];

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mb-8 overflow-x-auto pb-2">
      {allSteps.map((label, i) => {
        const isActive = showResult ? i === allSteps.length - 1 : i === currentStep;
        const isCompleted = showResult ? i < allSteps.length - 1 : i < currentStep;

        return (
          <div key={label} className="flex items-center gap-1 md:gap-2">
            <div
              className={clsx(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                isActive && "gradient-bg text-white shadow-lg shadow-accent-red/20",
                isCompleted && "bg-accent-emerald/15 text-accent-emerald",
                !isActive && !isCompleted && "bg-white/5 text-text-muted"
              )}
            >
              {isCompleted ? (
                <Check size={12} />
              ) : (
                <span className="font-mono">{i + 1}</span>
              )}
              <span className="hidden md:inline">{label}</span>
            </div>
            {i < allSteps.length - 1 && (
              <div
                className={clsx(
                  "w-4 md:w-8 h-px transition-colors duration-300",
                  isCompleted ? "bg-accent-emerald" : "bg-white/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
