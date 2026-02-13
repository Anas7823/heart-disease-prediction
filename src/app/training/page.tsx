// Je compose la page d'entrainement avec toutes les sections et video de fond
"use client";

import { PipelineFlow } from "@/components/training/PipelineFlow";
import { OptunaSection } from "@/components/training/OptunaSection";
import { MetricsGrid } from "@/components/training/MetricsGrid";
import { ShapAnalysis } from "@/components/training/ShapAnalysis";
import { ModelComparison } from "@/components/training/ModelComparison";
import { FigureGallery } from "@/components/training/FigureGallery";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { VideoBackground } from "@/components/ui/VideoBackground";

export default function TrainingPage() {
  return (
    <>
      {/* Hero avec video de fond */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <VideoBackground src="/videos/hero_training.mp4" />
        <div className="section-container relative z-10 text-center py-24 md:py-36">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            L&apos;entrainement
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary mb-4">
            <span className="font-mono gradient-text">100</span> essais.{" "}
            <span className="font-mono gradient-text">1 787</span> arbres.{" "}
            <span className="font-mono gradient-text">3</span> modeles.{" "}
            <span className="font-mono gradient-text">1</span> consensus.
          </p>
          <p className="text-sm text-text-muted max-w-2xl mx-auto px-4">
            De l&apos;optimisation des hyperparametres a l&apos;explainability
            SHAP, chaque etape a ete pensée pour maximiser la performance tout
            en garantissant l&apos;interpretabilite.
          </p>
        </div>
      </section>

      {/* Pipeline */}
      <section className="pb-20">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center">
            Pipeline complet
          </h2>
          <PipelineFlow />
        </div>
      </section>

      {/* Optuna */}
      <section className="section-spacing bg-white/[0.01]">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Optimisation Optuna
          </h2>
          <p className="text-text-secondary mb-8 text-sm sm:text-base">
            100 trials de recherche bayesienne pour trouver les meilleurs
            hyperparametres.
          </p>
          <OptunaSection />
        </div>
      </section>

      {/* Metriques */}
      <section className="section-spacing">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Metriques de performance
          </h2>
          <p className="text-text-secondary mb-8 text-sm sm:text-base">
            Evaluation complete sur 126 000 patients de validation.
          </p>
          <MetricsGrid />
        </div>
      </section>

      {/* Figures d'evaluation */}
      <section className="pb-20">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-8">
            Courbes d&apos;evaluation
          </h2>
          <FigureGallery />
        </div>
      </section>

      {/* SHAP */}
      <section className="section-spacing bg-white/[0.01]">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Explainability SHAP
          </h2>
          <p className="text-text-secondary mb-8 text-sm sm:text-base">
            Le modele n&apos;est pas une boite noire : je sais exactement
            quelles features influencent chaque prediction.
          </p>
          <ShapAnalysis />
        </div>
      </section>

      {/* Comparaison modeles */}
      <section className="section-spacing">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Comparaison des 3 modeles
          </h2>
          <p className="text-text-secondary mb-8 text-sm sm:text-base">
            Chaque membre de l&apos;equipe a entraine son modele
            independamment. Les modeles des collegues seront integres a
            reception.
          </p>
          <ModelComparison />
        </div>
      </section>

      <div className="section-container pb-20">
        <MedicalDisclaimer />
      </div>
    </>
  );
}
