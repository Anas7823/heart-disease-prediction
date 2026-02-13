// Je definis le feature engineering cote client pour l'affichage interactif

import type { PatientInput } from "./types";

export interface EngineeredFeatures {
  hr_reserve: number;
  bp_chol_ratio: number;
  stress_score: number;
  age_x_maxhr: number;
  age_decade: number;
  age_hr_ratio: number;
  risk_composite: number;
}

export function computeEngineeredFeatures(
  patient: PatientInput
): EngineeredFeatures {
  // Je reproduis le feature engineering pour l'affichage en temps reel
  return {
    hr_reserve: 220 - patient.age - patient.max_hr,
    bp_chol_ratio: patient.bp / (patient.cholesterol + 1),
    stress_score:
      patient.st_depression * (patient.exercise_angina === 1 ? 2 : 1),
    age_x_maxhr: patient.age * patient.max_hr,
    age_decade: Math.floor(patient.age / 10) * 10,
    age_hr_ratio: patient.age / patient.max_hr,
    risk_composite:
      (patient.thallium === 7 ? 1 : 0) +
      (patient.chest_pain_type === 4 ? 1 : 0) +
      (patient.number_of_vessels_fluro > 0 ? 1 : 0) +
      (patient.exercise_angina === 1 ? 1 : 0) +
      (patient.slope_of_st >= 2 ? 1 : 0),
  };
}

// Je fournis les descriptions des features engineered pour la page Data
export const ENGINEERED_FEATURES = [
  {
    name: "hr_reserve",
    label: "Reserve cardiaque",
    formula: "(220 - age) - max_hr",
    description:
      "Ecart entre la FC maximale theorique et la FC atteinte. Une valeur basse indique une mauvaise adaptation cardiaque.",
  },
  {
    name: "bp_chol_ratio",
    label: "Ratio pression/cholesterol",
    formula: "bp / (cholesterol + 1)",
    description:
      "Rapport entre la pression arterielle et le cholesterol total, normalisant l'interaction vasculaire.",
  },
  {
    name: "stress_score",
    label: "Score de stress",
    formula: "st_depression x (2 si angine, 1 sinon)",
    description:
      "Amplifie la depression ST si une angine est presente, capturant la severite du stress cardiaque.",
  },
  {
    name: "age_x_maxhr",
    label: "Interaction age-FC",
    formula: "age x max_hr",
    description:
      "Capture le fait qu'une FC maximale elevee est attendue chez les jeunes mais anormale chez les ages.",
  },
  {
    name: "age_decade",
    label: "Decennie d'age",
    formula: "floor(age / 10) x 10",
    description:
      "Regroupement par tranches de 10 ans pour capturer les seuils de risque lies aux decennies de vie.",
  },
  {
    name: "age_hr_ratio",
    label: "Ratio age/FC",
    formula: "age / max_hr",
    description:
      "Un ratio eleve indique un patient age avec une faible FC max, marqueur de deconditionnement cardiaque.",
  },
  {
    name: "risk_composite",
    label: "Score composite de risque",
    formula: "(thallium=7) + (chest_pain=4) + (vessels>0) + (angine=1) + (slope>=2)",
    description:
      "Somme de 5 indicateurs binaires identifies comme les plus discriminants. Feature #1 en importance SHAP (11%).",
  },
];
