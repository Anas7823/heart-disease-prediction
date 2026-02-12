# 🫀 Heart Disease Prediction - Multi-Language Project

![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![R](https://img.shields.io/badge/R-4.0%2B-blue)
![Julia](https://img.shields.io/badge/Julia-1.6%2B-purple)
![Status](https://img.shields.io/badge/Status-Active-success)
![Kaggle](https://img.shields.io/badge/Kaggle-Competition-orange)

## 📋 Contexte du Projet

Ce projet s'inscrit dans le cadre de la compétition Kaggle **[Playground Series S6E2: Predicting Heart Disease](https://www.kaggle.com/competitions/playground-series-s6e2/data)**.

L'objectif est de développer un modèle de Machine Learning robuste pour prédire la présence de maladies cardiaques chez des patients, en se basant sur des indicateurs cliniques (âge, cholestérol, résultats ECG, etc.).

**Particularité du projet :** Ce dépôt démontre une approche **polyglotte** de la Data Science, tirant parti des forces de chaque langage :
* **R** : Analyse Exploratoire (EDA) et Feature Engineering statistique.
* **Julia** : Nettoyage haute performance des données brutes.
* **Python** : Entraînement des modèles (XGBoost), Pipeline ML et MLOps.

---

## 🏗️ Architecture du Projet

La structure du projet sépare clairement les données, les notebooks d'expérimentation et le code source modulaire.

```text
Base/
│
├── README.md                 # Documentation principale du projet
├── requirements.txt          # Dépendances Python (pandas, xgboost, shap...)
├── .gitignore                # Exclusion des fichiers lourds et temporaires
│
├── data/
│   ├── raw/                  # Données brutes (train.csv, test.csv)
│   └── processed/            # Données nettoyées prêtes pour le ML (train_processed.csv)
│
├── notebooks/                # Espace d'expérimentation par langage
│   ├── Julia/
│   │   └── nettoyage.jl             # Script de nettoyage haute performance
│   ├── Python/
│   │   ├── 01_eda_exploratory.ipynb # EDA comparative
│   │   └── 03_model_training.ipynb  # Pipeline, GridSearch & XGBoost
│   └── R/
│       ├── 01_eda_exploratory.R     # Analyse statistique approfondie
│       └── 02_feature_engineering.R # Création de variables et imputation
│
├── src/                      # Code source Python (Scripts de production)
│   ├── __init__.py
│   ├── preprocessing.py      # Pipelines de transformation sklearn
│   └── visualization.py      # Fonctions graphiques personnalisées
│
└── models/                   # Artefacts des modèles entraînés (.joblib, .pkl)

## 🔄 Pipeline Data Science

Le flux de travail suit une méthodologie rigoureuse, allant du nettoyage haute performance à l'inférence, en garantissant la reproductibilité.

```mermaid
graph LR
A[Collecte Data] --> B[Nettoyage & EDA]
B --> C[Feature Engineering]
C --> D[Entraînement Modèle]
D --> E[Optimisation Seuil]
E --> F[Prédiction Finale]


1. Collecte : Importation des données brutes de la compétition Kaggle.

2. Nettoyage & EDA (R/Julia) :
    - Identification des valeurs aberrantes et imputation intelligente.
    - Typage strict des variables (catégorielles vs numériques).

3. Feature Engineering (R) :
    - Création de ratios médicaux (ex: Risk Ratio).
    - Transformation log des variables asymétriques (st_depression).
    - Encodage One-Hot des variables catégorielles.

4. Modélisation (Python) :
    - Utilisation de XGBoost avec accélération histogramme (tree_method='hist').
    - Optimisation des hyperparamètres via RandomizedSearchCV pour gérer la volumétrie (600k+ lignes).
    - Stratégie de validation croisée (StratifiedKFold).

5. Optimisation : Ajustement du seuil de décision (Threshold Tuning) pour maximiser le F1-Score et la sensibilité médicale.


## 🛠️ Stack Technique

Langages : Python, R, Julia.

Libraries Python : scikit-learn, xgboost, pandas, seaborn, joblib.

Libraries R : tidyverse, caret, janitor.

Modélisation : Pipeline Scikit-Learn, Gradient Boosting, Hyperparameter Tuning.

## 🚀 Comment lancer le projet

Installation :
Cloner le dépôt et installer les dépendances Python :

git clone [https://github.com/votre-username/heart-disease-prediction.git](https://github.com/votre-username/heart-disease-prediction.git)
cd heart-disease-prediction
pip install -r requirements.txt

3. Entraînement du modèle
Lancer le script d'entraînement optimisé pour générer le modèle final et les prédictions :

via le notebook : notebooks/Python/03_model_training.ipynb

## 📊 Résultats

Modèle : XGBoost Classifier (Optimisé)
Stratégie : Randomized Search sur 15 itérations + Threshold Tuning.
Métrique Cible : F1-Score (Équilibre Précision/Rappel).
Output : Fichier submission.csv prêt pour Kaggle.