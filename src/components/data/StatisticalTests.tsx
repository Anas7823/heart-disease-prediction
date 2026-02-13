// Je cree la section des tests statistiques (Chi2 et Wilcoxon)
"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { FigureViewer } from "@/components/ui/FigureViewer";
import { CHI2_RESULTS, WILCOXON_RESULTS, FIGURE_PATHS } from "@/lib/constants";

// Je definis les noms lisibles pour les features
const LABELS: Record<string, string> = {
  thallium: "Thallium",
  chest_pain_type: "Douleur thoracique",
  number_of_vessels_fluro: "Vaisseaux fluro.",
  exercise_angina: "Angine effort",
  slope_of_st: "Pente ST",
  sex: "Sexe",
  ekg_results: "ECG",
  fbs_over_120: "Glycemie > 120",
  max_hr: "FC maximale",
  st_depression: "Depression ST",
  age: "Age",
  cholesterol: "Cholesterol",
  bp: "Pression arterielle",
};

export function StatisticalTests() {
  const maxChi2 = CHI2_RESULTS[0].cramers_v;
  const maxWilcoxon = WILCOXON_RESULTS[0].effect;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chi2 / Cramer */}
        <GlassCard padding="lg">
          <h3 className="font-semibold mb-2">
            Test Chi2 - Variables categoriques
          </h3>
          <p className="text-xs text-text-muted mb-6">
            V de Cramer : mesure l&apos;association entre chaque variable
            categorique et la maladie cardiaque.
          </p>
          <div className="space-y-3">
            {CHI2_RESULTS.map((r) => (
              <div key={r.variable} className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs text-text-secondary w-20 sm:w-32 shrink-0 text-right">
                  {LABELS[r.variable] || r.variable}
                </span>
                <div className="flex-1 h-3 sm:h-4 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent-red-dark transition-all duration-700"
                    style={{
                      width: `${(r.cramers_v / maxChi2) * 100}%`,
                    }}
                  />
                </div>
                <span className="font-mono text-[10px] sm:text-xs w-10 sm:w-12 text-right">
                  {r.cramers_v.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Wilcoxon */}
        <GlassCard padding="lg">
          <h3 className="font-semibold mb-2">
            Test de Wilcoxon - Variables numeriques
          </h3>
          <p className="text-xs text-text-muted mb-6">
            Taille d&apos;effet : mesure la difference de distribution entre
            patients sains et malades.
          </p>
          <div className="space-y-3">
            {WILCOXON_RESULTS.map((r) => (
              <div key={r.variable} className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs text-text-secondary w-20 sm:w-32 shrink-0 text-right">
                  {LABELS[r.variable] || r.variable}
                </span>
                <div className="flex-1 h-3 sm:h-4 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent-red transition-all duration-700"
                    style={{
                      width: `${(r.effect / maxWilcoxon) * 100}%`,
                    }}
                  />
                </div>
                <span className="font-mono text-[10px] sm:text-xs w-10 sm:w-12 text-right">
                  {r.effect.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <FigureViewer
        src={FIGURE_PATHS.statisticalTests.significance}
        alt="Significativite statistique de toutes les variables"
        caption="Vue d'ensemble de la significativite statistique"
      />
    </div>
  );
}
