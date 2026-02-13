// Je cree la section des distributions avec onglets et figures EDA
"use client";

import { useState } from "react";
import { FigureViewer } from "@/components/ui/FigureViewer";
import { clsx } from "clsx";

const TABS = [
  { id: "numerical", label: "Variables numeriques" },
  { id: "categorical", label: "Variables categoriques" },
] as const;

const NUMERICAL_FIGURES = [
  { name: "age", label: "Age", histNum: "04", violinNum: "05" },
  { name: "bp", label: "Pression arterielle", histNum: "06", violinNum: "07" },
  { name: "cholesterol", label: "Cholesterol", histNum: "08", violinNum: "09" },
  { name: "max_hr", label: "FC maximale", histNum: "10", violinNum: "11" },
  { name: "st_depression", label: "Depression ST", histNum: "12", violinNum: "13" },
];

const CATEGORICAL_FIGURES = [
  { name: "sex", label: "Sexe", countNum: "14", rateNum: "15" },
  { name: "chest_pain_type", label: "Type douleur", countNum: "16", rateNum: "17" },
  { name: "fbs_over_120", label: "Glycemie > 120", countNum: "18", rateNum: "19" },
  { name: "ekg_results", label: "ECG", countNum: "20", rateNum: "21" },
  { name: "exercise_angina", label: "Angine effort", countNum: "22", rateNum: "23" },
  { name: "slope_of_st", label: "Pente ST", countNum: "24", rateNum: "25" },
  { name: "number_of_vessels_fluro", label: "Vaisseaux", countNum: "26", rateNum: "27" },
  { name: "thallium", label: "Thallium", countNum: "28", rateNum: "29" },
];

export function DistributionCharts() {
  const [activeTab, setActiveTab] = useState<"numerical" | "categorical">(
    "numerical"
  );

  return (
    <div>
      {/* Onglets */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300",
              activeTab === tab.id
                ? "gradient-bg text-white shadow-lg shadow-accent-red/20"
                : "glass text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu numerique */}
      {activeTab === "numerical" && (
        <div className="space-y-6">
          {NUMERICAL_FIGURES.map((fig) => (
            <div key={fig.name} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FigureViewer
                src={`/figures/eda/numerical/fig_${fig.histNum}_${fig.name}_hist_kde.png`}
                alt={`Histogramme - ${fig.label}`}
                caption={`${fig.label} - Distribution (histogramme + KDE)`}
              />
              <FigureViewer
                src={`/figures/eda/numerical/fig_${fig.violinNum}_${fig.name}_violin.png`}
                alt={`Violin plot - ${fig.label}`}
                caption={`${fig.label} - Distribution par classe (violin plot)`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Contenu categorique */}
      {activeTab === "categorical" && (
        <div className="space-y-6">
          {CATEGORICAL_FIGURES.map((fig) => (
            <div key={fig.name} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FigureViewer
                src={`/figures/eda/categorical/fig_${fig.countNum}_${fig.name}_count.png`}
                alt={`Distribution - ${fig.label}`}
                caption={`${fig.label} - Frequence par categorie`}
              />
              <FigureViewer
                src={`/figures/eda/categorical/fig_${fig.rateNum}_${fig.name}_disease_rate.png`}
                alt={`Taux de maladie - ${fig.label}`}
                caption={`${fig.label} - Taux de maladie par categorie`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
