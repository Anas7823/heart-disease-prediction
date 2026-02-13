// Je cree la section Optuna avec la figure et les hyperparametres
"use client";

import { FigureViewer } from "@/components/ui/FigureViewer";
import { GlassCard } from "@/components/ui/GlassCard";
import { FIGURE_PATHS, BEST_PARAMS, MODEL_METRICS } from "@/lib/constants";

const PARAMS_DISPLAY = [
  { key: "max_depth", label: "Profondeur max", value: BEST_PARAMS.max_depth },
  { key: "learning_rate", label: "Learning rate", value: BEST_PARAMS.learning_rate },
  { key: "min_child_weight", label: "Min child weight", value: BEST_PARAMS.min_child_weight },
  { key: "gamma", label: "Gamma (regularisation)", value: BEST_PARAMS.gamma },
  { key: "subsample", label: "Subsample", value: BEST_PARAMS.subsample },
  { key: "colsample_bytree", label: "Col. sample / arbre", value: BEST_PARAMS.colsample_bytree },
  { key: "reg_alpha", label: "Reg. Alpha (L1)", value: BEST_PARAMS.reg_alpha },
  { key: "reg_lambda", label: "Reg. Lambda (L2)", value: BEST_PARAMS.reg_lambda },
];

export function OptunaSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <FigureViewer
          src={FIGURE_PATHS.training.optuna}
          alt="Optimisation Optuna - convergence des hyperparametres"
          caption="Convergence de l'optimisation Optuna sur 100 trials"
        />
      </div>

      <div className="space-y-4">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Hyperparametres optimaux</h3>
            <span className="text-xs font-mono text-accent-red">
              {MODEL_METRICS.optunaTrials} trials
            </span>
          </div>
          <div className="space-y-3">
            {PARAMS_DISPLAY.map((param) => (
              <div
                key={param.key}
                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <span className="text-sm text-text-secondary">
                  {param.label}
                </span>
                <span className="font-mono text-sm font-medium text-text-primary">
                  {param.value}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <p className="text-sm text-text-secondary mb-2">
              Arbres dans le modele final
            </p>
            <p className="text-4xl font-mono font-bold gradient-text">
              {MODEL_METRICS.bestIteration.toLocaleString()}
            </p>
            <p className="text-xs text-text-muted mt-2">
              Avec early stopping a l&apos;iteration optimale
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
