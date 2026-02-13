// Je cree le client API pour communiquer avec le backend FastAPI

import type {
  PatientInput,
  PredictionResponse,
  ModelsInfo,
  HealthResponse,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Je fais la requete avec gestion d'erreur et timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: "Erreur inconnue",
      }));
      throw new ApiError(
        error.detail || `Erreur HTTP ${response.status}`,
        response.status
      );
    }

    return response.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError(
        "Le serveur ne repond pas. Verifiez que le backend est en cours d'execution.",
        0
      );
    }
    throw new ApiError(
      "Impossible de contacter le serveur. Verifiez votre connexion.",
      0
    );
  } finally {
    clearTimeout(timeout);
  }
}

export const api = {
  predict(patient: PatientInput): Promise<PredictionResponse> {
    // Je soumets les donnees patient pour obtenir la prediction
    return request<PredictionResponse>("/predict", {
      method: "POST",
      body: JSON.stringify(patient),
    });
  },

  getModels(): Promise<ModelsInfo> {
    // Je recupere les informations sur les modeles charges
    return request<ModelsInfo>("/models");
  },

  healthCheck(): Promise<HealthResponse> {
    // Je verifie que le backend est disponible
    return request<HealthResponse>("/health");
  },
};
