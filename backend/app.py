# Je cree le serveur FastAPI pour le diagnostic cardiaque multi-modele

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import xgboost as xgb
import numpy as np
import json
from pathlib import Path
from contextlib import asynccontextmanager
import time


# Je stocke les modeles charges en memoire
loaded_models: dict = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Je charge tous les modeles XGBoost disponibles au demarrage."""
    models_dir = Path(__file__).parent / "models"

    for model_dir in models_dir.iterdir():
        if not model_dir.is_dir():
            continue

        model_path = model_dir / "xgb_model.json"
        meta_path = model_dir / "model_meta.json"

        if not model_path.exists():
            continue

        # Je charge le modele XGBoost depuis le JSON natif
        booster = xgb.Booster()
        booster.load_model(str(model_path))

        # Je charge les metadonnees
        meta = {}
        if meta_path.exists():
            with open(meta_path, "r", encoding="utf-8") as f:
                meta = json.load(f)

        loaded_models[model_dir.name] = {
            "booster": booster,
            "meta": meta,
            "threshold": meta.get("optimal_threshold", 0.5),
        }

    if not loaded_models:
        raise RuntimeError("Aucun modele charge. Verifier le dossier models/")

    print(f"[OK] {len(loaded_models)} modele(s) charge(s): {list(loaded_models.keys())}")
    yield
    loaded_models.clear()


app = FastAPI(
    title="Heart Disease Prediction API",
    description="API multi-modele pour la prediction de maladies cardiaques",
    version="1.0.0",
    lifespan=lifespan,
)

# Je configure CORS pour accepter les requetes du frontend Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Schemas Pydantic ---

FEATURE_NAMES = [
    "age", "sex", "chest_pain_type", "bp", "cholesterol",
    "fbs_over_120", "ekg_results", "max_hr", "exercise_angina",
    "st_depression", "slope_of_st", "number_of_vessels_fluro", "thallium",
    "hr_reserve", "bp_chol_ratio", "stress_score", "age_x_maxhr",
    "age_decade", "age_hr_ratio", "risk_composite",
]


class PatientInput(BaseModel):
    age: float = Field(..., ge=18, le=120, description="Age du patient")
    sex: int = Field(..., ge=0, le=1, description="0=Femme, 1=Homme")
    chest_pain_type: int = Field(..., ge=1, le=4, description="Type de douleur thoracique (1-4)")
    bp: float = Field(..., ge=60, le=250, description="Pression arterielle au repos (mmHg)")
    cholesterol: float = Field(..., ge=50, le=700, description="Cholesterol serique (mg/dl)")
    fbs_over_120: int = Field(..., ge=0, le=1, description="Glycemie > 120 mg/dl")
    ekg_results: int = Field(..., ge=0, le=2, description="Resultats ECG (0-2)")
    max_hr: float = Field(..., ge=60, le=220, description="Frequence cardiaque maximale")
    exercise_angina: int = Field(..., ge=0, le=1, description="Angine induite par exercice")
    st_depression: float = Field(..., ge=0.0, le=7.0, description="Depression ST")
    slope_of_st: int = Field(..., ge=1, le=3, description="Pente du segment ST (1-3)")
    number_of_vessels_fluro: int = Field(..., ge=0, le=3, description="Vaisseaux colores par fluoroscopie")
    thallium: int = Field(..., ge=3, le=7, description="Test au thallium (3, 6, 7)")


class ModelResult(BaseModel):
    name: str
    algo: str
    probability: float
    prediction: int
    auc: float | None = None
    threshold: float
    confidence: str


class PredictionResponse(BaseModel):
    consensus: dict
    models: list[ModelResult]
    feature_contributions: dict[str, float]
    processing_time_ms: float
    disclaimer: str


# --- Feature Engineering ---

def compute_engineered_features(patient: PatientInput) -> np.ndarray:
    """Je calcule les 7 features engineered exactement comme pendant l'entrainement."""
    raw = [
        patient.age, patient.sex, patient.chest_pain_type, patient.bp,
        patient.cholesterol, patient.fbs_over_120, patient.ekg_results,
        patient.max_hr, patient.exercise_angina, patient.st_depression,
        patient.slope_of_st, patient.number_of_vessels_fluro, patient.thallium,
    ]

    # Je reproduis les 7 features engineered du pipeline d'entrainement
    hr_reserve = (220 - patient.age) - patient.max_hr
    bp_chol_ratio = patient.bp / (patient.cholesterol + 1)
    stress_score = patient.st_depression * (2 if patient.exercise_angina == 1 else 1)
    age_x_maxhr = patient.age * patient.max_hr
    age_decade = (patient.age // 10) * 10
    age_hr_ratio = patient.age / patient.max_hr
    risk_composite = float(
        (patient.thallium == 7)
        + (patient.chest_pain_type == 4)
        + (patient.number_of_vessels_fluro > 0)
        + (patient.exercise_angina == 1)
        + (patient.slope_of_st >= 2)
    )

    engineered = [
        hr_reserve, bp_chol_ratio, stress_score, age_x_maxhr,
        age_decade, age_hr_ratio, risk_composite,
    ]

    return np.array(raw + engineered, dtype=np.float32).reshape(1, -1)


# --- Endpoints ---

@app.post("/predict", response_model=PredictionResponse)
async def predict(patient: PatientInput):
    """Je fais tourner tous les modeles et je calcule le consensus."""
    if not loaded_models:
        raise HTTPException(status_code=503, detail="Aucun modele disponible")

    start = time.perf_counter()

    # Je calcule les features pour ce patient
    features = compute_engineered_features(patient)
    dmatrix = xgb.DMatrix(features, feature_names=FEATURE_NAMES)

    model_results = []
    probabilities = []
    aucs = []

    for name, model_data in loaded_models.items():
        booster = model_data["booster"]
        meta = model_data["meta"]
        threshold = model_data["threshold"]

        # Je fais la prediction avec le best_iteration si disponible
        best_iter = meta.get("best_iteration", 0)
        if best_iter > 0:
            prob = float(booster.predict(dmatrix, iteration_range=(0, best_iter))[0])
        else:
            prob = float(booster.predict(dmatrix)[0])

        pred = 1 if prob >= threshold else 0
        probabilities.append(prob)

        auc_val = meta.get("auc_validation")
        if auc_val is not None:
            aucs.append(auc_val)

        # Je determine le niveau de confiance
        distance = abs(prob - threshold)
        if distance > 0.3:
            confidence = "Tres elevee"
        elif distance > 0.15:
            confidence = "Elevee"
        else:
            confidence = "Moderee"

        model_results.append(ModelResult(
            name=name,
            algo=meta.get("model_type", "Unknown"),
            probability=round(prob, 4),
            prediction=pred,
            auc=auc_val,
            threshold=threshold,
            confidence=confidence,
        ))

    # Je calcule le consensus pondere par AUC si disponible
    if aucs and len(aucs) == len(probabilities):
        total_auc = sum(aucs)
        weights = [a / total_auc for a in aucs]
        consensus_prob = sum(p * w for p, w in zip(probabilities, weights))
    else:
        consensus_prob = float(np.mean(probabilities))

    # Je determine le niveau de risque
    consensus_threshold = 0.42
    consensus_pred = 1 if consensus_prob >= consensus_threshold else 0

    if consensus_prob < 0.2:
        risk_level = "Faible"
    elif consensus_prob < 0.42:
        risk_level = "Modere"
    elif consensus_prob < 0.7:
        risk_level = "Eleve"
    else:
        risk_level = "Tres eleve"

    # Je determine le niveau d'accord entre les modeles
    predictions = [m.prediction for m in model_results]
    n_positive = sum(predictions)
    n_total = len(predictions)
    agreement = f"{max(n_positive, n_total - n_positive)}/{n_total}"

    if n_positive == n_total or n_positive == 0:
        conf_consensus = "high"
    elif n_positive >= n_total - 1 or n_positive <= 1:
        conf_consensus = "medium"
    else:
        conf_consensus = "low"

    # Je recupere les contributions SHAP du modele principal
    primary_meta = next(iter(loaded_models.values()))["meta"]
    shap_importance = primary_meta.get("feature_importance_shap", {})
    feature_contributions = {
        k: round(v, 4)
        for k, v in sorted(shap_importance.items(), key=lambda x: x[1], reverse=True)
        if v > 0
    }

    elapsed = (time.perf_counter() - start) * 1000

    return PredictionResponse(
        consensus={
            "probability": round(consensus_prob, 4),
            "prediction": consensus_pred,
            "risk_level": risk_level,
            "agreement": agreement,
            "confidence": conf_consensus,
        },
        models=model_results,
        feature_contributions=feature_contributions,
        processing_time_ms=round(elapsed, 2),
        disclaimer="Cet outil est un projet academique. Il ne constitue en aucun cas un avis medical.",
    )


@app.get("/models")
async def get_models():
    """Je retourne les informations sur les modeles charges."""
    result = {}
    for name, data in loaded_models.items():
        meta = data["meta"]
        result[name] = {
            "model_type": meta.get("model_type", "Unknown"),
            "auc_validation": meta.get("auc_validation"),
            "best_f1": meta.get("best_f1"),
            "pr_auc": meta.get("pr_auc"),
            "brier_score": meta.get("brier_score"),
            "optimal_threshold": data["threshold"],
            "n_features": meta.get("n_features"),
            "best_iteration": meta.get("best_iteration"),
            "train_size": meta.get("train_size"),
            "features": meta.get("features", []),
            "feature_importance_shap": meta.get("feature_importance_shap", {}),
        }
    return result


@app.get("/health")
async def health():
    """Je verifie que l'API et les modeles fonctionnent."""
    return {
        "status": "ok",
        "models_loaded": len(loaded_models),
        "model_names": list(loaded_models.keys()),
    }
