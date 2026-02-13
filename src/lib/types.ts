// Je definis tous les types partages de l'application

export interface PatientInput {
  age: number;
  sex: number;
  chest_pain_type: number;
  bp: number;
  cholesterol: number;
  fbs_over_120: number;
  ekg_results: number;
  max_hr: number;
  exercise_angina: number;
  st_depression: number;
  slope_of_st: number;
  number_of_vessels_fluro: number;
  thallium: number;
}

export interface ModelResult {
  name: string;
  algo: string;
  probability: number;
  prediction: number;
  auc: number | null;
  threshold: number;
  confidence: string;
}

export interface ConsensusResult {
  probability: number;
  prediction: number;
  risk_level: string;
  agreement: string;
  confidence: string;
}

export interface PredictionResponse {
  consensus: ConsensusResult;
  models: ModelResult[];
  feature_contributions: Record<string, number>;
  processing_time_ms: number;
  disclaimer: string;
}

export interface ModelInfo {
  model_type: string;
  auc_validation: number | null;
  best_f1: number | null;
  pr_auc: number | null;
  brier_score: number | null;
  optimal_threshold: number;
  n_features: number | null;
  best_iteration: number | null;
  train_size: number | null;
  features: string[];
  feature_importance_shap: Record<string, number>;
}

export type ModelsInfo = Record<string, ModelInfo>;

export interface HealthResponse {
  status: string;
  models_loaded: number;
  model_names: string[];
}

export interface FormStep {
  id: string;
  label: string;
  description: string;
  fields: (keyof PatientInput)[];
}

export interface FeatureOption {
  value: number;
  label: string;
  description?: string;
}

export interface FeatureConfig {
  key: keyof PatientInput;
  label: string;
  description: string;
  type: "slider" | "toggle" | "select";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: FeatureOption[];
  defaultValue: number;
  zones?: { green: [number, number]; orange: [number, number]; red: [number, number] };
}

export interface PatientPreset {
  id: string;
  label: string;
  description: string;
  color: string;
  data: PatientInput;
}
