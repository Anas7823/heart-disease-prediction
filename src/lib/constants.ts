// Je centralise toutes les constantes de l'application

import type { FeatureConfig, FormStep, PatientPreset, PatientInput } from "./types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Je definis les metriques du modele principal (extraites de model_meta.json)
export const MODEL_METRICS = {
  auc: 0.95607,
  aucBlend: 0.95645,
  prAuc: 0.94953,
  f1: 0.8778,
  brierScore: 0.08052,
  ksStatistic: 0.7781,
  optimalThreshold: 0.42,
  optunaTrials: 100,
  bestIteration: 1787,
  trainSize: 504000,
  valSize: 126000,
  totalPatients: 630000,
  adversarialAuc: 0.5019,
} as const;

// Je definis les hyperparametres optimaux trouves par Optuna
export const BEST_PARAMS = {
  max_depth: 3,
  learning_rate: 0.023,
  min_child_weight: 5,
  gamma: 1.147,
  subsample: 0.853,
  colsample_bytree: 0.5,
  reg_alpha: 1.502,
  reg_lambda: 0.003,
} as const;

// Je definis l'importance SHAP pour les visualisations (triee par importance)
export const SHAP_IMPORTANCE: Record<string, number> = {
  risk_composite: 0.1104,
  max_hr: 0.0619,
  thallium: 0.0514,
  slope_of_st: 0.048,
  number_of_vessels_fluro: 0.0438,
  exercise_angina: 0.0436,
  sex: 0.0408,
  chest_pain_type: 0.0353,
  age_hr_ratio: 0.0348,
  stress_score: 0.0322,
  ekg_results: 0.0206,
  cholesterol: 0.0127,
  age: 0.012,
  st_depression: 0.011,
  bp: 0.0054,
  hr_reserve: 0.0022,
  age_x_maxhr: 0.0011,
  bp_chol_ratio: 0.0009,
  fbs_over_120: 0.0003,
  age_decade: 0.0,
};

// Je configure chaque feature pour le formulaire patient
export const FEATURE_CONFIGS: FeatureConfig[] = [
  {
    key: "age",
    label: "Age",
    description: "Age du patient en années",
    type: "slider",
    min: 18,
    max: 100,
    step: 1,
    unit: "ans",
    defaultValue: 54,
    zones: { green: [18, 45], orange: [45, 60], red: [60, 100] },
  },
  {
    key: "sex",
    label: "Sexe biologique",
    description: "Sexe biologique du patient",
    type: "select",
    options: [
      { value: 0, label: "Femme" },
      { value: 1, label: "Homme" },
    ],
    defaultValue: 1,
  },
  {
    key: "chest_pain_type",
    label: "Type de douleur thoracique",
    description: "Classification de la douleur ressentie au niveau de la poitrine",
    type: "select",
    options: [
      {
        value: 1,
        label: "Angine typique",
        description: "Douleur classique a l'effort, soulagee au repos",
      },
      {
        value: 2,
        label: "Angine atypique",
        description: "Douleur inhabituelle, localisation variable",
      },
      {
        value: 3,
        label: "Non-angineuse",
        description: "Probablement pas d'origine cardiaque",
      },
      {
        value: 4,
        label: "Asymptomatique",
        description: "Aucune douleur - decouverte fortuite",
      },
    ],
    defaultValue: 4,
  },
  {
    key: "bp",
    label: "Pression arterielle au repos",
    description: "Tension arterielle systolique mesuree au repos",
    type: "slider",
    min: 60,
    max: 200,
    step: 5,
    unit: "mmHg",
    defaultValue: 130,
    zones: { green: [60, 130], orange: [130, 150], red: [150, 200] },
  },
  {
    key: "cholesterol",
    label: "Cholesterol serique",
    description: "Cholesterol total dans le sang",
    type: "slider",
    min: 100,
    max: 600,
    step: 5,
    unit: "mg/dL",
    defaultValue: 243,
    zones: { green: [100, 200], orange: [200, 280], red: [280, 600] },
  },
  {
    key: "fbs_over_120",
    label: "Glycemie a jeun > 120 mg/dL",
    description: "Indicateur de diabete potentiel",
    type: "toggle",
    options: [
      { value: 0, label: "Non" },
      { value: 1, label: "Oui" },
    ],
    defaultValue: 0,
  },
  {
    key: "ekg_results",
    label: "Resultats ECG au repos",
    description: "Electrocardiogramme realise au repos",
    type: "select",
    options: [
      {
        value: 0,
        label: "Normal",
        description: "Pas d'anomalie detectee",
      },
      {
        value: 1,
        label: "Anomalie ST-T",
        description: "Inversion onde T ou elevation/depression ST",
      },
      {
        value: 2,
        label: "Hypertrophie VG",
        description: "Hypertrophie ventriculaire gauche (criteres de Estes)",
      },
    ],
    defaultValue: 0,
  },
  {
    key: "max_hr",
    label: "Frequence cardiaque maximale",
    description: "FC maximale atteinte lors du test d'effort",
    type: "slider",
    min: 60,
    max: 220,
    step: 1,
    unit: "bpm",
    defaultValue: 157,
    zones: { red: [60, 120], orange: [120, 150], green: [150, 220] },
  },
  {
    key: "exercise_angina",
    label: "Angine induite par l'effort",
    description: "Douleur thoracique declenchee pendant l'exercice physique",
    type: "toggle",
    options: [
      { value: 0, label: "Non" },
      { value: 1, label: "Oui" },
    ],
    defaultValue: 0,
  },
  {
    key: "st_depression",
    label: "Depression du segment ST",
    description: "Affaissement du segment ST induit par l'exercice par rapport au repos",
    type: "slider",
    min: 0,
    max: 6,
    step: 0.1,
    unit: "mm",
    defaultValue: 0.1,
    zones: { green: [0, 1], orange: [1, 2.5], red: [2.5, 6] },
  },
  {
    key: "slope_of_st",
    label: "Pente du segment ST",
    description: "Pente du segment ST au pic de l'effort",
    type: "select",
    options: [
      {
        value: 1,
        label: "Ascendante",
        description: "Generalement normal",
      },
      {
        value: 2,
        label: "Plate",
        description: "Possiblement anormal",
      },
      {
        value: 3,
        label: "Descendante",
        description: "Souvent pathologique",
      },
    ],
    defaultValue: 1,
  },
  {
    key: "number_of_vessels_fluro",
    label: "Vaisseaux colores (fluoroscopie)",
    description: "Nombre de vaisseaux majeurs colores par fluoroscopie",
    type: "select",
    options: [
      { value: 0, label: "0 vaisseau" },
      { value: 1, label: "1 vaisseau" },
      { value: 2, label: "2 vaisseaux" },
      { value: 3, label: "3 vaisseaux" },
    ],
    defaultValue: 0,
  },
  {
    key: "thallium",
    label: "Test au thallium",
    description: "Resultat du test de perfusion myocardique au thallium",
    type: "select",
    options: [
      {
        value: 3,
        label: "Normal",
        description: "Perfusion cardiaque normale",
      },
      {
        value: 6,
        label: "Defaut fixe",
        description: "Cicatrice d'un ancien infarctus",
      },
      {
        value: 7,
        label: "Defaut reversible",
        description: "Ischemie active - le plus a risque",
      },
    ],
    defaultValue: 3,
  },
];

// Je definis les etapes du formulaire multi-step
export const FORM_STEPS: FormStep[] = [
  {
    id: "profile",
    label: "Profil",
    description: "Informations demographiques",
    fields: ["age", "sex"],
  },
  {
    id: "clinical",
    label: "Clinique",
    description: "Données cliniques de base",
    fields: ["bp", "cholesterol", "fbs_over_120", "max_hr"],
  },
  {
    id: "cardiac",
    label: "Cardiaque",
    description: "Examens cardiaques",
    fields: ["chest_pain_type", "ekg_results", "thallium", "number_of_vessels_fluro"],
  },
  {
    id: "stress",
    label: "Effort",
    description: "Tests d'effort",
    fields: ["exercise_angina", "st_depression", "slope_of_st"],
  },
];

// Je definis les valeurs par defaut du patient (medianes du dataset)
export const DEFAULT_PATIENT: PatientInput = {
  age: 54,
  sex: 1,
  chest_pain_type: 4,
  bp: 130,
  cholesterol: 243,
  fbs_over_120: 0,
  ekg_results: 0,
  max_hr: 157,
  exercise_angina: 0,
  st_depression: 0.1,
  slope_of_st: 1,
  number_of_vessels_fluro: 0,
  thallium: 3,
};

// Je definis les 3 presets patients pour la demo
export const PATIENT_PRESETS: PatientPreset[] = [
  {
    id: "healthy",
    label: "Patient sain",
    description: "35 ans, sportif, aucun facteur de risque",
    color: "emerald",
    data: {
      age: 35,
      sex: 1,
      chest_pain_type: 3,
      bp: 120,
      cholesterol: 180,
      fbs_over_120: 0,
      ekg_results: 0,
      max_hr: 185,
      exercise_angina: 0,
      st_depression: 0.0,
      slope_of_st: 1,
      number_of_vessels_fluro: 0,
      thallium: 3,
    },
  },
  {
    id: "moderate",
    label: "Patient modere",
    description: "55 ans, cholesterol eleve, anomalie ECG",
    color: "warning",
    data: {
      age: 55,
      sex: 1,
      chest_pain_type: 2,
      bp: 145,
      cholesterol: 260,
      fbs_over_120: 1,
      ekg_results: 1,
      max_hr: 140,
      exercise_angina: 0,
      st_depression: 1.5,
      slope_of_st: 2,
      number_of_vessels_fluro: 1,
      thallium: 3,
    },
  },
  {
    id: "high_risk",
    label: "Patient a risque",
    description: "65 ans, angine, thallium anormal, 3 vaisseaux",
    color: "rose",
    data: {
      age: 65,
      sex: 1,
      chest_pain_type: 4,
      bp: 160,
      cholesterol: 300,
      fbs_over_120: 1,
      ekg_results: 2,
      max_hr: 110,
      exercise_angina: 1,
      st_depression: 3.5,
      slope_of_st: 3,
      number_of_vessels_fluro: 3,
      thallium: 7,
    },
  },
];

// Je definis le disclaimer medical
export const MEDICAL_DISCLAIMER =
  "Cet outil est un projet academique a visée éducative. Il ne constitue en aucun cas un diagnostic medical et ne remplace pas la consultation d'un professionnel de santé. Les predictions sont basées sur un modele statistique entraine sur des données historiques.";

// Je definis les chemins vers les figures statiques
export const FIGURE_PATHS = {
  training: {
    optuna: "/figures/training/fig01_optuna.png",
    evaluation: "/figures/training/fig02_evaluation.png",
    threshold: "/figures/training/fig03_threshold.png",
    calibration: "/figures/training/fig04_calibration.png",
    learning: "/figures/training/fig05_learning.png",
    lift: "/figures/training/fig06_lift.png",
    ks: "/figures/training/fig07_ks.png",
    shapSummary: "/figures/training/fig08_shap_summary.png",
    shapHigh: "/figures/training/fig09_shap_high.png",
    shapLow: "/figures/training/fig10_shap_low.png",
    shapDep: "/figures/training/fig11_shap_dep.png",
    importance: "/figures/training/fig12_importance.png",
    dashboard: "/figures/training/fig13_dashboard.png",
    submission: "/figures/training/fig14_submission.png",
  },
  eda: {
    missingValues: "/figures/eda/data_quality/fig_01_missing_values.png",
    outliers: "/figures/eda/data_quality/fig_02_outliers.png",
    outliersOverview: "/figures/eda/data_quality/fig_02_outliers_overview.png",
    target: "/figures/eda/target/fig_03_target.png",
    targetDist: "/figures/eda/target/fig_03_target_distribution.png",
    correlation: "/figures/eda/correlations/fig_30_correlation.png",
    pairplot: "/figures/eda/correlations/fig_31_pairplot.png",
    ridgeline: "/figures/eda/multivariate/fig_32_ridgeline.png",
    heatmap: "/figures/eda/multivariate/fig_33_heatmap_sex_x_chest_pain_type.png",
  },
  evaluation: {
    modelComparison: "/figures/evaluation/fig_35_model_comparison.png",
    confusionMatrix: "/figures/evaluation/confusion_matrix/fig_36_confusion_matrix.png",
    roc: "/figures/evaluation/roc_pr/fig_37_roc.png",
    prCurve: "/figures/evaluation/roc_pr/fig_38_pr_curve.png",
    probDist: "/figures/evaluation/calibration/fig_39_prob_dist.png",
    threshold: "/figures/evaluation/calibration/fig_40_threshold.png",
    featImportance: "/figures/evaluation/feature_importance/fig_41_feat_importance.png",
  },
  stacking: {
    penalty: "/figures/stacking/fig_42_stack_penalty.png",
    weights: "/figures/stacking/fig_43_stack_weights.png",
  },
  statisticalTests: {
    significance: "/figures/statistical_tests/fig_34_significance.png",
  },
} as const;

// Je definis les etapes du pipeline pour la page Training
export const PIPELINE_STEPS = [
  {
    id: "collect",
    label: "Collecte",
    description: "630K patients, 13 features cliniques, Kaggle Playground S6E2",
  },
  {
    id: "eda",
    label: "Exploration",
    description: "Distributions, correlations, tests statistiques (Chi2, Wilcoxon)",
  },
  {
    id: "features",
    label: "Features",
    description: "13 features brutes vers 20 features engineered (risk_composite, hr_reserve...)",
  },
  {
    id: "training",
    label: "Entrainement",
    description: "XGBoost + Optuna (100 trials), validation adversariale, early stopping",
  },
  {
    id: "evaluation",
    label: "Evaluation",
    description: "ROC-AUC, Precision-Recall, Calibration, SHAP explainability",
  },
  {
    id: "deploy",
    label: "Deploiement",
    description: "API FastAPI multi-modele, consensus 3 IA, interface web Next.js",
  },
] as const;

// Je definis les resultats des tests statistiques pour la page Data
export const CHI2_RESULTS = [
  { variable: "thallium", cramers_v: 0.6058, sig: true },
  { variable: "chest_pain_type", cramers_v: 0.5252, sig: true },
  { variable: "number_of_vessels_fluro", cramers_v: 0.4632, sig: true },
  { variable: "exercise_angina", cramers_v: 0.4419, sig: true },
  { variable: "slope_of_st", cramers_v: 0.4298, sig: true },
  { variable: "sex", cramers_v: 0.3424, sig: true },
  { variable: "ekg_results", cramers_v: 0.2191, sig: true },
  { variable: "fbs_over_120", cramers_v: 0.0336, sig: true },
];

export const WILCOXON_RESULTS = [
  { variable: "max_hr", effect: 0.8867, label: "Grand" },
  { variable: "st_depression", effect: 0.8659, label: "Grand" },
  { variable: "age", effect: 0.4265, label: "Petit" },
  { variable: "cholesterol", effect: 0.1664, label: "Petit" },
  { variable: "bp", effect: 0.0104, label: "Negligeable" },
];
