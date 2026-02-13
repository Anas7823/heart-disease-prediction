// Je cree la section feature engineering avec formules et calculateur
"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ENGINEERED_FEATURES, computeEngineeredFeatures } from "@/lib/features";
import { DEFAULT_PATIENT } from "@/lib/constants";
import type { PatientInput } from "@/lib/types";
import { Zap } from "lucide-react";

export function FeatureEngineeringSection() {
  const [patient] = useState<PatientInput>(DEFAULT_PATIENT);
  const computed = computeEngineeredFeatures(patient);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <p className="text-sm font-mono text-text-secondary">
          <span className="font-bold text-accent-red">13</span> features brutes
          {" "}vers{" "}
          <span className="font-bold text-accent-red">20</span> features
        </p>
      </div>

      {/* Cartes features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ENGINEERED_FEATURES.map((feat) => (
          <GlassCard key={feat.name}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm">{feat.label}</h3>
                <span className="text-xs font-mono text-text-muted">
                  {feat.name}
                </span>
              </div>
              <Zap size={14} className="text-accent-red shrink-0" />
            </div>
            <div className="glass p-3 mb-3 rounded-lg">
              <code className="text-xs font-mono text-accent-red-light">
                {feat.formula}
              </code>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed mb-3">
              {feat.description}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-xs text-text-muted">
                Valeur (patient median)
              </span>
              <span className="font-mono text-sm font-medium text-accent-red">
                {computed[feat.name as keyof typeof computed]?.toFixed(3)}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
