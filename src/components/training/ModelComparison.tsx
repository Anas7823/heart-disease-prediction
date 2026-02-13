// Je cree la section de comparaison des 3 modeles
"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { MODEL_METRICS } from "@/lib/constants";
import { Crown, Clock } from "lucide-react";

interface ModelColumn {
  name: string;
  author: string;
  algo: string;
  auc: number | null;
  f1: number | null;
  features: number | null;
  trees: number | null;
  status: "active" | "pending";
}

const MODELS: ModelColumn[] = [
  {
    name: "Modele A",
    author: "Hakim",
    algo: "XGBoost",
    auc: MODEL_METRICS.auc,
    f1: MODEL_METRICS.f1,
    features: 20,
    trees: MODEL_METRICS.bestIteration,
    status: "active",
  },
  {
    name: "Modele B",
    author: "Collegue 1",
    algo: "En attente",
    auc: null,
    f1: null,
    features: null,
    trees: null,
    status: "pending",
  },
  {
    name: "Modele C",
    author: "Collegue 2",
    algo: "En attente",
    auc: null,
    f1: null,
    features: null,
    trees: null,
    status: "pending",
  },
];

const ROWS = [
  { label: "Algorithme", key: "algo" },
  { label: "AUC", key: "auc" },
  { label: "F1-Score", key: "f1" },
  { label: "Features", key: "features" },
  { label: "Arbres", key: "trees" },
] as const;

export function ModelComparison() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {MODELS.map((model) => (
        <GlassCard
          key={model.name}
          className={
            model.status === "active"
              ? "border-accent-red/30"
              : "opacity-60"
          }
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">{model.name}</h3>
              <p className="text-xs text-text-muted">{model.author}</p>
            </div>
            {model.status === "active" ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-accent-red">
                <Crown size={12} />
                Principal
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock size={12} />
                En attente
              </span>
            )}
          </div>

          <div className="space-y-3">
            {ROWS.map((row) => {
              const val = model[row.key as keyof ModelColumn];
              return (
                <div
                  key={row.key}
                  className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0"
                >
                  <span className="text-xs text-text-secondary">
                    {row.label}
                  </span>
                  <span className="font-mono text-sm">
                    {val !== null ? (
                      typeof val === "number" && val < 10
                        ? val.toFixed(4)
                        : val?.toLocaleString()
                    ) : (
                      <span className="text-text-muted">--</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
