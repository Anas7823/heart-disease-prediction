// Je cree la page de diagnostic IA interactive avec formulaire multi-step et appel API reel
"use client";

import { useReducer, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { DEFAULT_PATIENT, PATIENT_PRESETS, FORM_STEPS } from "@/lib/constants";
import type { PatientInput, PredictionResponse } from "@/lib/types";
import { FormStepIndicator } from "@/components/demo/FormStepIndicator";
import { PatientForm } from "@/components/demo/PatientForm";
import { PredictionResults } from "@/components/demo/PredictionResults";
import { AnalysisLoader } from "@/components/demo/AnalysisLoader";
import { GlassCard } from "@/components/ui/GlassCard";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { AlertTriangle, Wifi, WifiOff, Activity } from "lucide-react";
import { clsx } from "clsx";

// --- State management ---

interface DemoState {
  currentStep: number;
  patientData: PatientInput;
  isLoading: boolean;
  result: PredictionResponse | null;
  error: string | null;
  apiHealthy: boolean | null;
}

type DemoAction =
  | { type: "SET_FIELD"; field: keyof PatientInput; value: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; step: number }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; result: PredictionResponse }
  | { type: "SUBMIT_ERROR"; error: string }
  | { type: "RESET" }
  | { type: "LOAD_PRESET"; data: PatientInput }
  | { type: "SET_API_HEALTH"; healthy: boolean };

const initialState: DemoState = {
  currentStep: 0,
  patientData: { ...DEFAULT_PATIENT },
  isLoading: false,
  result: null,
  error: null,
  apiHealthy: null,
};

function reducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        patientData: { ...state.patientData, [action.field]: action.value },
      };
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, FORM_STEPS.length - 1),
      };
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0) };
    case "GO_TO_STEP":
      return { ...state, currentStep: action.step, result: null, error: null };
    case "SUBMIT_START":
      return { ...state, isLoading: true, error: null };
    case "SUBMIT_SUCCESS":
      return { ...state, isLoading: false, result: action.result };
    case "SUBMIT_ERROR":
      return { ...state, isLoading: false, error: action.error };
    case "RESET":
      return { ...initialState, apiHealthy: state.apiHealthy };
    case "LOAD_PRESET":
      return {
        ...state,
        patientData: { ...action.data },
        currentStep: FORM_STEPS.length - 1,
        result: null,
        error: null,
      };
    case "SET_API_HEALTH":
      return { ...state, apiHealthy: action.healthy };
    default:
      return state;
  }
}

// --- Component ---

export default function DemoPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Je verifie la disponibilite du backend au chargement
  useEffect(() => {
    api
      .healthCheck()
      .then(() => dispatch({ type: "SET_API_HEALTH", healthy: true }))
      .catch(() => dispatch({ type: "SET_API_HEALTH", healthy: false }));
  }, []);

  // Je soumets les donnees patient pour la prediction
  const handleSubmit = useCallback(async () => {
    dispatch({ type: "SUBMIT_START" });
    try {
      const result = await api.predict(state.patientData);
      dispatch({ type: "SUBMIT_SUCCESS", result });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue.";
      dispatch({ type: "SUBMIT_ERROR", error: message });
    }
  }, [state.patientData]);

  const handlePreset = useCallback(
    async (data: PatientInput) => {
      dispatch({ type: "LOAD_PRESET", data });
      dispatch({ type: "SUBMIT_START" });
      try {
        const result = await api.predict(data);
        dispatch({ type: "SUBMIT_SUCCESS", result });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Une erreur inattendue est survenue.";
        dispatch({ type: "SUBMIT_ERROR", error: message });
      }
    },
    []
  );

  const showResult = state.result !== null;

  // Je definis les couleurs des presets
  const presetColors: Record<string, string> = {
    emerald: "border-accent-emerald/30 hover:border-accent-emerald/60",
    warning: "border-accent-warning/30 hover:border-accent-warning/60",
    rose: "border-accent-rose/30 hover:border-accent-rose/60",
  };

  return (
    <div className="min-h-screen relative">
      {/* Particules ambiantes */}
      <ParticlesBackground />

      {/* Hero avec video de fond */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <VideoBackground src="/videos/hero_demo.mp4" />
        <div className="section-container relative z-10 text-center py-24 md:py-36">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Diagnostic IA
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base px-4">
            Renseignez les donnees cliniques du patient et obtenez une
            prediction basee sur les vrais modeles d&apos;intelligence
            artificielle.
          </p>
        </div>
      </section>

      {/* Status API */}
      <div className="section-container mb-6 relative z-10">
        <div className="flex items-center justify-center gap-2 text-xs">
          {state.apiHealthy === null ? (
            <span className="text-text-muted flex items-center gap-1">
              <Activity size={12} className="animate-pulse" />
              Connexion au serveur...
            </span>
          ) : state.apiHealthy ? (
            <span className="text-accent-emerald flex items-center gap-1">
              <Wifi size={12} />
              Serveur connecte
            </span>
          ) : (
            <span className="text-accent-rose flex items-center gap-1">
              <WifiOff size={12} />
              Serveur indisponible - Verifiez que le backend est lance
            </span>
          )}
        </div>
      </div>

      {/* Presets */}
      {!showResult && !state.isLoading && (
        <div className="section-container mb-8 relative z-10">
          <p className="text-center text-xs text-text-muted mb-3">
            Profils types (appel API reel)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {PATIENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePreset(preset.data)}
                disabled={state.isLoading || state.apiHealthy === false}
                className={clsx(
                  "glass px-4 py-3 rounded-xl text-left transition-all duration-300 disabled:opacity-40",
                  presetColors[preset.color]
                )}
              >
                <span className="block text-sm font-medium">
                  {preset.label}
                </span>
                <span className="block text-xs text-text-muted mt-0.5">
                  {preset.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="section-container pb-20 relative z-10">
        {/* Indicateur d'etapes */}
        <FormStepIndicator
          currentStep={state.currentStep}
          showResult={showResult}
        />

        {/* Erreur */}
        {state.error && (
          <div className="max-w-2xl mx-auto mb-6">
            <GlassCard
              className="border-accent-rose/30"
              hover={false}
              animate={false}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-accent-rose shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-semibold text-accent-rose mb-1">
                    Erreur de prediction
                  </p>
                  <p className="text-xs text-text-secondary">{state.error}</p>
                  <button
                    onClick={handleSubmit}
                    className="mt-3 text-xs font-medium text-accent-red hover:text-accent-red-light transition-colors"
                  >
                    Reessayer
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Loading cinematique */}
        {state.isLoading && <AnalysisLoader />}

        {/* Formulaire ou Resultats */}
        {!state.isLoading && !showResult && (
          <PatientForm
            currentStep={state.currentStep}
            patientData={state.patientData}
            onFieldChange={(field, value) =>
              dispatch({ type: "SET_FIELD", field, value })
            }
            onNext={() => dispatch({ type: "NEXT_STEP" })}
            onPrev={() => dispatch({ type: "PREV_STEP" })}
            onSubmit={handleSubmit}
            isLoading={state.isLoading}
          />
        )}

        {!state.isLoading && showResult && state.result && (
          <PredictionResults
            result={state.result}
            onReset={() => dispatch({ type: "RESET" })}
            onModify={() => dispatch({ type: "GO_TO_STEP", step: 0 })}
          />
        )}
      </div>
    </div>
  );
}
