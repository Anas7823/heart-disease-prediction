// Je cree la grille de metriques du modele
"use client";

import { MetricCard } from "@/components/ui/MetricCard";
import { MODEL_METRICS } from "@/lib/constants";

const METRICS = [
  {
    label: "ROC-AUC (Validation)",
    value: MODEL_METRICS.auc,
    decimals: 5,
    description: "Capacite a distinguer les cas positifs des negatifs",
    highlight: true,
  },
  {
    label: "F1-Score",
    value: MODEL_METRICS.f1,
    decimals: 4,
    description: "Moyenne harmonique de la precision et du rappel",
  },
  {
    label: "PR-AUC",
    value: MODEL_METRICS.prAuc,
    decimals: 5,
    description: "Performance Precision-Recall, robuste au desequilibre",
  },
  {
    label: "Brier Score",
    value: MODEL_METRICS.brierScore,
    decimals: 5,
    description: "Calibration des probabilites (plus bas = mieux)",
  },
  {
    label: "KS Statistic",
    value: MODEL_METRICS.ksStatistic,
    decimals: 4,
    description: "Separation maximale entre les distributions",
  },
  {
    label: "Seuil optimal",
    value: MODEL_METRICS.optimalThreshold,
    decimals: 2,
    description: "Seuil de decision maximisant le F1-Score",
  },
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {METRICS.map((metric) => (
        <MetricCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          decimals={metric.decimals}
          description={metric.description}
          highlight={metric.highlight}
        />
      ))}
    </div>
  );
}
