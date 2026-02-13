# Heart Disease Prediction - Multi-Language Project

![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![R](https://img.shields.io/badge/R-4.0%2B-blue)
![Julia](https://img.shields.io/badge/Julia-1.6%2B-purple)
![Status](https://img.shields.io/badge/Status-Active-success)
![Kaggle](https://img.shields.io/badge/Kaggle-Competition-orange)

## Contexte du Projet

Ce projet s'inscrit dans le cadre de la competition Kaggle **[Playground Series S6E2: Predicting Heart Disease](https://www.kaggle.com/competitions/playground-series-s6e2/data)**.

L'objectif est de developper un modele de Machine Learning robuste pour predire la presence de maladies cardiaques chez des patients, en se basant sur des indicateurs cliniques (age, cholesterol, resultats ECG, etc.).

**Particularite du projet :** Ce depot demontre une approche **polyglotte** de la Data Science, tirant parti des forces de chaque langage :
* **R** : Analyse Exploratoire (EDA) et Feature Engineering statistique.
* **Julia** : Nettoyage haute performance des donnees brutes.
* **Python** : Entrainement des modeles (XGBoost), Pipeline ML et MLOps.

---

## Architecture du Projet

```text
Base/
|
├── README.md
├── requirements.txt
├── .gitignore
|
├── data/
│   ├── raw/                  # Donnees brutes (train.csv, test.csv)
│   └── processed/            # Donnees nettoyees pretes pour le ML
|
├── notebooks/                # Experimentation par langage
│   ├── Julia/
│   ├── Python/
│   └── R/
|
├── src/                      # Code source Python
├── models/                   # Artefacts des modeles entraines
|
└── heart-disease-app/        # Plateforme web (Next.js 14 + FastAPI)
    ├── src/                  # Frontend Next.js (App Router, TypeScript, Tailwind)
    ├── backend/              # Backend FastAPI + modele XGBoost (AUC=0.956)
    └── public/               # Figures EDA, training, videos
```

## Stack Technique

- **Frontend** : Next.js 14, TypeScript, Tailwind CSS, GSAP, Recharts
- **Backend** : FastAPI, XGBoost 3.1.0, NumPy, Pydantic
- **Langages** : Python, R, Julia
- **Libraries Python** : scikit-learn, xgboost, pandas, seaborn, joblib
- **Libraries R** : tidyverse, caret, janitor
- **Modelisation** : XGBoost optimise Optuna (100 trials), seuil 0.42, consensus multi-modeles

## Resultats

- **AUC** : 0.956
- **F1-Score** : 0.891
- **Modele** : XGBoost (1787 arbres, 20 features dont 7 engineered)
- **Pipeline** : Feature engineering 13 -> 20 features, optimisation bayesienne Optuna
