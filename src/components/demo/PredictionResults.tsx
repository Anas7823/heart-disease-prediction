// Je cree le composant d'affichage des resultats avec animations SHAP, texte interpretatif et transitions
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { PredictionResponse } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { RiskGauge } from "./RiskGauge";
import { Crown, Timer, Users, FileText, ArrowLeft, RotateCcw } from "lucide-react";
import { clsx } from "clsx";

interface PredictionResultsProps {
  result: PredictionResponse;
  onReset: () => void;
  onModify: () => void;
}

// Je definis les variantes de couleur par niveau de risque
const RISK_COLORS: Record<string, { text: string; bg: string }> = {
  Faible: { text: "text-accent-emerald", bg: "shadow-accent-emerald/10" },
  Modere: { text: "text-accent-warning", bg: "shadow-accent-warning/10" },
  Eleve: { text: "text-accent-rose", bg: "shadow-accent-rose/10" },
  "Tres eleve": { text: "text-accent-rose", bg: "shadow-accent-rose/20" },
};

// Je definis les noms lisibles des features
const FEATURE_LABELS: Record<string, string> = {
  risk_composite: "Score composite de risque",
  max_hr: "Frequence cardiaque max",
  thallium: "Test au thallium",
  slope_of_st: "Pente du segment ST",
  number_of_vessels_fluro: "Vaisseaux (fluoroscopie)",
  exercise_angina: "Angine a l'effort",
  sex: "Sexe",
  chest_pain_type: "Type douleur thoracique",
  age_hr_ratio: "Ratio age/FC",
  stress_score: "Score de stress",
  ekg_results: "Resultats ECG",
  cholesterol: "Cholesterol",
  age: "Age",
  st_depression: "Depression ST",
  bp: "Pression arterielle",
};

// Je genere le texte interpretatif en langage naturel
function generateInterpretation(
  result: PredictionResponse
): string {
  const { consensus, feature_contributions } = result;
  const prob = (consensus.probability * 100).toFixed(0);
  const level = consensus.risk_level.toLowerCase();

  // Je recupere les 3 premiers facteurs
  const topFactors = Object.entries(feature_contributions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([name]) => FEATURE_LABELS[name] || name);

  if (consensus.prediction === 0) {
    return `Le modele estime une probabilite de ${prob}% de maladie cardiaque, correspondant a un risque ${level}. `
      + `Les indicateurs cliniques les plus influents dans cette evaluation sont : ${topFactors[0]}, ${topFactors[1]} et ${topFactors[2]}. `
      + `Le profil du patient se situe en dessous du seuil de décision (42%).`;
  }

  return `Le modele identifie un risque ${level} avec une probabilite de ${prob}%. `
    + `Les facteurs les plus determinants sont : ${topFactors[0]}, ${topFactors[1]} et ${topFactors[2]}. `
    + `Le profil du patient depasse le seuil de décision clinique (42%), ce qui motive une attention particuliere.`;
}

export function PredictionResults({
  result,
  onReset,
  onModify,
}: PredictionResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { consensus, models, feature_contributions, processing_time_ms } =
    result;
  const riskStyle = RISK_COLORS[consensus.risk_level] || RISK_COLORS["Eleve"];

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Je revele le consensus avec un effet dramatique
      tl.from(".result-consensus", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".result-interpretation",
          { y: 20, opacity: 0, duration: 0.5 },
          "-=0.2"
        )
        .from(
          ".result-model-card",
          { x: -30, opacity: 0, stagger: 0.15, duration: 0.5 },
          "-=0.2"
        )
        .from(
          ".result-factors",
          { y: 20, opacity: 0, duration: 0.5 },
          "-=0.2"
        );

      // Je lance l'animation des barres SHAP avec un stagger
      gsap.from(".shap-bar-fill", {
        width: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1.2,
      });

      gsap.from(".shap-bar-value", {
        opacity: 0,
        x: -10,
        duration: 0.4,
        stagger: 0.1,
        delay: 1.5,
      });
    },
    { scope: containerRef }
  );

  // Je trie les contributions par importance
  const sortedContributions = Object.entries(feature_contributions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);
  const maxContrib = sortedContributions[0]?.[1] || 1;

  const interpretation = generateInterpretation(result);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-8">
      {/* Consensus principal */}
      <div className={`result-consensus glass p-6 sm:p-10 text-center ${riskStyle.bg}`}>
        <p
          className={clsx(
            "text-sm font-semibold uppercase tracking-widest mb-8",
            riskStyle.text
          )}
        >
          Risque {consensus.risk_level}
        </p>

        <RiskGauge probability={consensus.probability} />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mt-8 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-text-secondary">
            <Users size={14} />
            <span>
              Accord :{" "}
              <span className="font-mono font-bold text-text-primary">
                {consensus.agreement}
              </span>{" "}
              modeles
            </span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Timer size={14} />
            <span className="font-mono">{processing_time_ms} ms</span>
          </div>
        </div>
      </div>

      {/* Texte interpretatif */}
      <div className="result-interpretation">
        <GlassCard padding="lg">
          <div className="flex gap-3">
            <FileText size={18} className="text-accent-red shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold mb-2">
                Interpretation du modele
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {interpretation}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Cartes des modeles individuels */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Avis des modeles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {models.map((model, i) => {
            const isPositive = model.prediction === 1;
            return (
              <div
                key={model.name}
                className={clsx(
                  "result-model-card glass p-5",
                  i === 0 && "border-accent-red/30"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-sm font-semibold capitalize">
                      {model.name}
                    </span>
                    <span className="block text-xs text-text-muted font-mono">
                      {model.algo}
                    </span>
                  </div>
                  {i === 0 && (
                    <Crown size={14} className="text-accent-red" />
                  )}
                </div>

                <p
                  className={clsx(
                    "text-3xl font-mono font-bold mb-2",
                    isPositive ? "text-accent-rose" : "text-accent-emerald"
                  )}
                >
                  {(model.probability * 100).toFixed(1)}%
                </p>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Prediction</span>
                    <span
                      className={clsx(
                        "font-mono text-xs font-semibold",
                        isPositive ? "text-accent-rose" : "text-accent-emerald"
                      )}
                    >
                      {isPositive ? "Positif" : "Negatif"}
                    </span>
                  </div>
                  {model.auc && (
                    <div className="flex justify-between">
                      <span className="text-text-muted">AUC</span>
                      <span className="font-mono">{model.auc.toFixed(3)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-text-muted">Confiance</span>
                    <span className="font-mono">{model.confidence}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Emplacements en attente si moins de 3 modeles */}
          {Array.from({ length: Math.max(0, 3 - models.length) }).map(
            (_, i) => (
              <div
                key={`pending-${i}`}
                className="result-model-card glass p-5 opacity-40 flex items-center justify-center"
              >
                <p className="text-sm text-text-muted text-center">
                  Modele en attente
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Facteurs de risque avec barres animees */}
      <div className="result-factors">
        <h3 className="text-lg font-semibold mb-4">
          Facteurs determinants (SHAP)
        </h3>
        <GlassCard padding="lg">
          <div className="space-y-3">
            {sortedContributions.map(([name, value]) => (
              <div key={name} className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs text-text-secondary w-28 sm:w-44 shrink-0 text-right">
                  {FEATURE_LABELS[name] || name}
                </span>
                <div className="flex-1 h-4 sm:h-5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="shap-bar-fill h-full rounded-full gradient-bg"
                    style={{ width: `${(value / maxContrib) * 100}%` }}
                  />
                </div>
                <span className="shap-bar-value font-mono text-[10px] sm:text-xs w-12 sm:w-14 text-right">
                  {(value * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={onModify}
          className="glass glass-hover px-6 py-3 rounded-xl text-sm font-medium text-text-secondary flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          Modifier le profil
        </button>
        <button
          onClick={onReset}
          className="glass glass-hover px-6 py-3 rounded-xl text-sm font-medium text-text-secondary flex items-center gap-2"
        >
          <RotateCcw size={14} />
          Nouveau patient
        </button>
      </div>

      {/* Disclaimer */}
      <MedicalDisclaimer />
    </div>
  );
}
