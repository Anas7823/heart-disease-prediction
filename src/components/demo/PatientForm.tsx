// Je cree le formulaire multi-step du parcours patient
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FORM_STEPS, FEATURE_CONFIGS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import type { PatientInput } from "@/lib/types";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight, Stethoscope } from "lucide-react";

interface PatientFormProps {
  currentStep: number;
  patientData: PatientInput;
  onFieldChange: (field: keyof PatientInput, value: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function PatientForm({
  currentStep,
  patientData,
  onFieldChange,
  onNext,
  onPrev,
  onSubmit,
  isLoading,
}: PatientFormProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const step = FORM_STEPS[currentStep];
  const isLastStep = currentStep === FORM_STEPS.length - 1;

  useGSAP(
    () => {
      if (!formRef.current) return;
      gsap.from(formRef.current.querySelectorAll(".form-field"), {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { scope: formRef, dependencies: [currentStep] }
  );

  return (
    <div ref={formRef} className="max-w-2xl mx-auto">
      {/* En-tete de l'etape */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{step.label}</h2>
        <p className="text-text-secondary text-sm">{step.description}</p>
      </div>

      {/* Champs du formulaire */}
      <div className="space-y-6">
        {step.fields.map((fieldKey) => {
          const config = FEATURE_CONFIGS.find((f) => f.key === fieldKey);
          if (!config) return null;

          const value = patientData[fieldKey];

          return (
            <div key={fieldKey} className="form-field glass p-5">
              <label className="block mb-1">
                <span className="text-sm font-semibold">{config.label}</span>
                <span className="block text-xs text-text-muted mt-0.5">
                  {config.description}
                </span>
              </label>

              {/* Slider */}
              {config.type === "slider" && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-muted">
                      {config.min} {config.unit}
                    </span>
                    <span className="font-mono text-lg font-bold gradient-text">
                      {typeof value === "number" && config.step && config.step < 1
                        ? value.toFixed(1)
                        : value}
                      {config.unit ? ` ${config.unit}` : ""}
                    </span>
                    <span className="text-xs text-text-muted">
                      {config.max} {config.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    value={value}
                    onChange={(e) =>
                      onFieldChange(fieldKey, parseFloat(e.target.value))
                    }
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-accent-red"
                    aria-label={config.label}
                  />
                  {/* Zones de couleur */}
                  {config.zones && (
                    <div className="flex gap-1 mt-2">
                      {Object.entries(config.zones).map(([color, [min, max]]) => {
                        const totalRange = (config.max || 100) - (config.min || 0);
                        const width = ((max - min) / totalRange) * 100;
                        const colorClass =
                          color === "green"
                            ? "bg-accent-emerald/30"
                            : color === "orange"
                            ? "bg-accent-warning/30"
                            : "bg-accent-rose/30";
                        return (
                          <div
                            key={color}
                            className={`h-1 rounded-full ${colorClass}`}
                            style={{ width: `${width}%` }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Toggle (pour les variables binaires) */}
              {config.type === "toggle" && config.options && (
                <div className="flex gap-3 mt-4">
                  {config.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onFieldChange(fieldKey, opt.value)}
                      className={clsx(
                        "flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300",
                        value === opt.value
                          ? "gradient-bg text-white shadow-lg shadow-accent-red/20"
                          : "glass text-text-secondary hover:text-text-primary"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Select (cartes radio) */}
              {config.type === "select" && config.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {config.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onFieldChange(fieldKey, opt.value)}
                      className={clsx(
                        "p-3 rounded-xl text-left transition-all duration-300",
                        value === opt.value
                          ? "gradient-bg text-white shadow-lg shadow-accent-red/20"
                          : "glass text-text-secondary hover:text-text-primary"
                      )}
                    >
                      <span className="block text-sm font-medium">
                        {opt.label}
                      </span>
                      {opt.description && (
                        <span
                          className={clsx(
                            "block text-xs mt-0.5",
                            value === opt.value
                              ? "text-white/70"
                              : "text-text-muted"
                          )}
                        >
                          {opt.description}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={onPrev}
          disabled={currentStep === 0}
        >
          <ChevronLeft size={16} />
          Precedent
        </Button>

        {isLastStep ? (
          <Button onClick={onSubmit} disabled={isLoading}>
            <Stethoscope size={16} />
            {isLoading ? "Analyse en cours..." : "Lancer le diagnostic"}
          </Button>
        ) : (
          <Button onClick={onNext}>
            Suivant
            <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
