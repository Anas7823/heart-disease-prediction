// Je cree la section SHAP avec les figures et le graphique d'importance
"use client";

import { FigureViewer } from "@/components/ui/FigureViewer";
import { GlassCard } from "@/components/ui/GlassCard";
import { FIGURE_PATHS, SHAP_IMPORTANCE } from "@/lib/constants";

// Je prepare les donnees pour l'affichage du top 10
const TOP_FEATURES = Object.entries(SHAP_IMPORTANCE)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 10);

const maxShap = TOP_FEATURES[0][1];

// Je definis les noms lisibles des features
const FEATURE_LABELS: Record<string, string> = {
  risk_composite: "Score composite de risque",
  max_hr: "FC maximale",
  thallium: "Test au thallium",
  slope_of_st: "Pente du segment ST",
  number_of_vessels_fluro: "Vaisseaux (fluoroscopie)",
  exercise_angina: "Angine a l'effort",
  sex: "Sexe",
  chest_pain_type: "Type douleur thoracique",
  age_hr_ratio: "Ratio age/FC",
  stress_score: "Score de stress",
};

export function ShapAnalysis() {
  return (
    <div className="space-y-8">
      {/* Bar chart SHAP custom */}
      <GlassCard padding="lg">
        <h3 className="font-semibold mb-6">
          Importance SHAP - Top 10 features
        </h3>
        <div className="space-y-3">
          {TOP_FEATURES.map(([name, value]) => (
            <div key={name} className="flex items-center gap-2 sm:gap-4">
              <span className="text-[10px] sm:text-xs text-text-secondary w-24 sm:w-48 shrink-0 text-right">
                {FEATURE_LABELS[name] || name}
              </span>
              <div className="flex-1 h-4 sm:h-6 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full gradient-bg transition-all duration-700"
                  style={{ width: `${(value / maxShap) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-text-primary w-12 sm:w-16 text-right">
                {value.toFixed(4)}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-4">
          Le score composite de risque (risk_composite) est la feature la plus
          discriminante avec 11% d&apos;importance SHAP moyenne.
        </p>
      </GlassCard>

      {/* Figures SHAP du notebook */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FigureViewer
          src={FIGURE_PATHS.training.shapSummary}
          alt="SHAP Summary Plot - Vue globale de l'importance"
          caption="SHAP Summary Plot"
        />
        <FigureViewer
          src={FIGURE_PATHS.training.importance}
          alt="Feature Importance - Classement des variables"
          caption="Feature Importance"
        />
        <FigureViewer
          src={FIGURE_PATHS.training.shapHigh}
          alt="SHAP pour patients a haut risque"
          caption="SHAP - Patients a haut risque"
        />
        <FigureViewer
          src={FIGURE_PATHS.training.shapLow}
          alt="SHAP pour patients a faible risque"
          caption="SHAP - Patients a faible risque"
        />
      </div>
    </div>
  );
}
