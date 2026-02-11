### Compétition

Compétition Predicting Heart Disease
https://www.kaggle.com/competitions/playground-series-s6e2/data

### Architecture

Base/
│
├── README.md             # Présentation pro du projet (Objectif, résultats, comment lancer)
├── requirements.txt      # Liste des dépendances (pandas, scikit-learn, xgboost, shap...)
├── .gitignore            # Pour ignorer les gros fichiers CSV et modèles
│
├── data/
│   ├── raw/              # Les fichiers originaux (train.csv, test.csv)
│   ├── processed/        # Les données nettoyées et feature-engineered
│
├── notebooks/            # Jupyter Notebooks pour l'exploration
│   ├── 01_eda_exploratory.ipynb    # Analyse exploratoire pure
│   ├── 02_feature_engineering.ipynb # Tests de création de variables
│   └── 03_model_training.ipynb      # Entraînement et tuning
│
├── src/                  # Code source Python (scripts réutilisables)
│   ├── __init__.py
│   ├── preprocessing.py  # Fonctions de nettoyage
│   └── visualization.py  # Fonctions pour générer les graphiques
│
└── models/               # Les modèles entraînés (.pkl ou .json)


### Pipeline projet

Collecte data > Nettoyer > Visualiser (Faux positif...) > Structuré > RAG