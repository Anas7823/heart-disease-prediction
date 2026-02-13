// Je compose la page d'analyse des donnees avec video de fond
"use client";

import { DatasetOverview } from "@/components/data/DatasetOverview";
import { DistributionCharts } from "@/components/data/DistributionCharts";
import { CorrelationSection } from "@/components/data/CorrelationSection";
import { FeatureEngineeringSection } from "@/components/data/FeatureEngineeringSection";
import { StatisticalTests } from "@/components/data/StatisticalTests";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { VideoBackground } from "@/components/ui/VideoBackground";

export default function DataPage() {
  return (
    <>
      {/* Hero avec video de fond */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <VideoBackground src="/videos/hero_data_background.mp4" />
        <div className="section-container relative z-10 text-center py-24 md:py-36">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Les donnees</h1>
          <p className="text-lg sm:text-xl text-text-secondary">
            <span className="font-mono gradient-text">630 000</span> histoires
            de patients
          </p>
          <p className="text-sm text-text-muted max-w-2xl mx-auto mt-4 px-4">
            Exploration approfondie du dataset Kaggle Playground Series S6E2 :
            distributions, correlations, tests statistiques et feature
            engineering.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="pb-20">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-8">Vue d&apos;ensemble</h2>
          <DatasetOverview />
        </div>
      </section>

      {/* Distributions */}
      <section className="section-spacing bg-white/[0.01]">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Distributions</h2>
          <p className="text-text-secondary mb-8 text-sm sm:text-base">
            Exploration visuelle de chaque variable par rapport a la maladie
            cardiaque.
          </p>
          <DistributionCharts />
        </div>
      </section>

      {/* Correlations */}
      <section className="section-spacing">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Correlations et interactions
          </h2>
          <p className="text-text-secondary mb-8 text-sm sm:text-base">
            Relations entre les variables et interactions multivariees.
          </p>
          <CorrelationSection />
        </div>
      </section>

      {/* Tests statistiques */}
      <section className="section-spacing bg-white/[0.01]">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Tests statistiques</h2>
          <p className="text-text-secondary mb-8 text-sm sm:text-base">
            Quantification de la significativite de chaque variable pour
            predire la maladie cardiaque.
          </p>
          <StatisticalTests />
        </div>
      </section>

      {/* Feature Engineering */}
      <section className="section-spacing">
        <div className="section-container">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Feature Engineering</h2>
          <p className="text-text-secondary mb-8 text-sm sm:text-base">
            7 nouvelles features creees a partir des 13 variables brutes pour
            capturer des relations medicalement pertinentes.
          </p>
          <FeatureEngineeringSection />
        </div>
      </section>

      <div className="section-container pb-20">
        <MedicalDisclaimer />
      </div>
    </>
  );
}
