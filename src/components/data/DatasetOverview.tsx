// Je cree la section apercu du dataset
"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { FigureViewer } from "@/components/ui/FigureViewer";
import { FIGURE_PATHS, MODEL_METRICS, FEATURE_CONFIGS } from "@/lib/constants";
import { Columns } from "lucide-react";

export function DatasetOverview() {
  return (
    <div className="space-y-8">
      {/* Metriques cles du dataset */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Patients"
          value={MODEL_METRICS.totalPatients}
          decimals={0}
          suffix=""
          highlight
        />
        <MetricCard
          label="Features brutes"
          value={13}
          decimals={0}
        />
        <MetricCard
          label="Features engineered"
          value={7}
          decimals={0}
        />
        <MetricCard
          label="Split train/val"
          value={80}
          decimals={0}
          suffix="% / 20%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution target */}
        <FigureViewer
          src={FIGURE_PATHS.eda.targetDist}
          alt="Distribution de la variable cible"
          caption="Distribution de la variable heart_disease (0 = sain, 1 = malade)"
        />

        {/* Table des features */}
        <GlassCard padding="lg">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Columns size={16} className="text-accent-red" />
            13 features cliniques
          </h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {FEATURE_CONFIGS.map((f) => (
              <div
                key={f.key}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div>
                  <span className="text-sm font-medium">{f.label}</span>
                  <span className="block text-xs text-text-muted font-mono">
                    {f.key}
                  </span>
                </div>
                <span className="text-xs text-text-secondary">
                  {f.type === "slider"
                    ? `${f.min} - ${f.max} ${f.unit || ""}`
                    : f.options?.map((o) => o.label).join(" / ")}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Qualite des donnees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FigureViewer
          src={FIGURE_PATHS.eda.missingValues}
          alt="Valeurs manquantes dans le dataset"
          caption="Analyse des valeurs manquantes"
        />
        <FigureViewer
          src={FIGURE_PATHS.eda.outliers}
          alt="Detection des outliers"
          caption="Detection des valeurs aberrantes"
        />
      </div>
    </div>
  );
}
