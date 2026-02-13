<div align="center">

# 🫀 Heart Disease Prediction — Multi-Model Consensus Platform

### Predicting Cardiovascular Risk with 95.6% AUC on 630,000 Patients

<img src="heart-disease-prediction/public/figures/training/fig13_dashboard.png" alt="Model Dashboard — XGBoost Performance Overview" width="100%"/>

<br/>

[![AUC-ROC](https://img.shields.io/badge/AUC--ROC-0.956-brightgreen?style=for-the-badge&logo=target)](https://www.kaggle.com/competitions/playground-series-s6e2)
[![F1-Score](https://img.shields.io/badge/F1--Score-0.878-blue?style=for-the-badge&logo=checkmarx)](https://www.kaggle.com/competitions/playground-series-s6e2)
[![PR-AUC](https://img.shields.io/badge/PR--AUC-0.950-orange?style=for-the-badge)](https://www.kaggle.com/competitions/playground-series-s6e2)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![R](https://img.shields.io/badge/R-4.0+-276DC3?style=for-the-badge&logo=r&logoColor=white)](https://www.r-project.org/)
[![Julia](https://img.shields.io/badge/Julia-1.6+-9558B2?style=for-the-badge&logo=julia&logoColor=white)](https://julialang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![XGBoost](https://img.shields.io/badge/XGBoost-3.1.0-FF6600?style=for-the-badge)](https://xgboost.readthedocs.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

<br/>

**A full-stack machine learning platform for cardiovascular disease prediction, combining a polyglot Data Science pipeline (R, Julia, Python) with a production-grade web application (Next.js 14 + FastAPI). Features XGBoost optimized via Bayesian search (Optuna), SHAP explainability, and a multi-model consensus architecture designed for 3 independently trained models.**

</div>

---

## 📑 Table of Contents

- [Highlights](#-highlights)
- [Architecture](#-architecture)
- [Dataset](#-dataset)
- [Exploratory Data Analysis](#-exploratory-data-analysis)
- [Feature Engineering](#-feature-engineering)
- [Statistical Tests](#-statistical-tests)
- [Training](#-training)
- [Results](#-results)
- [Explainability (SHAP)](#-explainability-shap)
- [Web Platform](#-web-platform)
- [API Reference](#-api-reference)
- [Installation & Usage](#-installation--usage)
- [Project Structure](#-project-structure)
- [Lessons Learned](#-lessons-learned)
- [Future Work](#-future-work)
- [Team](#-team)
- [Citation](#-citation)
- [Acknowledgements](#-acknowledgements)

---

## 🌟 Highlights

| Feature | Details |
|:--------|:--------|
| 🏆 **High Performance** | AUC-ROC of 0.956 on 126,000 validation patients |
| 🧠 **Bayesian Optimization** | 100 Optuna trials to find optimal hyperparameters |
| 🔬 **Feature Engineering** | 13 raw clinical features transformed into 20 engineered features |
| 🔍 **Full Explainability** | SHAP analysis on all 20 features with summary, dependence and waterfall plots |
| 📊 **Rigorous EDA** | 43 statistical figures produced in R Studio (distributions, correlations, tests) |
| 🌐 **Polyglot Pipeline** | R (EDA + stats), Julia (data cleaning), Python (ML + API) |
| ⚡ **Real-time Inference** | FastAPI backend serving predictions in < 50ms |
| 🎨 **Premium UI** | Next.js 14 with GSAP animations, glassmorphism design, video backgrounds |
| 🤝 **Multi-Model Consensus** | Architecture supporting 3 independently trained models with weighted voting |
| 🏥 **Medical Disclaimer** | Integrated disclaimer on every page — this is an academic project |

---

## 🏗 Architecture

### System Overview

The project follows a polyglot architecture, leveraging the strengths of each language at each stage of the Data Science pipeline, culminating in a production-ready web application.

```
                          ┌─────────────────────────────────────────────┐
                          │            DATA PIPELINE                    │
                          │                                             │
   Kaggle Dataset         │  ┌─────────┐  ┌─────────┐  ┌───────────┐  │
   630K patients ────────►│  │  Julia   │─►│    R    │─►│  Python   │  │
   13 features            │  │ Cleaning │  │ EDA +   │  │ XGBoost + │  │
                          │  │          │  │ Stats   │  │ Optuna    │  │
                          │  └─────────┘  └─────────┘  └─────┬─────┘  │
                          └───────────────────────────────────┼────────┘
                                                              │
                                                     xgb_model.json
                                                              │
                          ┌───────────────────────────────────┼────────┐
                          │           WEB PLATFORM            │        │
                          │                                   ▼        │
                          │  ┌──────────────┐    ┌────────────────┐   │
                          │  │   Next.js 14  │◄──►│   FastAPI      │   │
                          │  │   Frontend    │    │   Backend      │   │
                          │  │              │    │                │   │
                          │  │  • 4 Pages   │    │  • /predict    │   │
                          │  │  • GSAP      │    │  • /models     │   │
                          │  │  • Recharts  │    │  • /health     │   │
                          │  │  • Tailwind  │    │  • Multi-model │   │
                          │  └──────────────┘    └────────────────┘   │
                          └───────────────────────────────────────────┘
```

### Model Architecture

The core model is an **XGBoost Gradient Boosted Trees** classifier, optimized through Bayesian hyperparameter search.

| Component | Choice | Rationale |
|:----------|:-------|:----------|
| **Algorithm** | XGBoost (histogram) | Best trade-off speed/performance for 630K tabular rows |
| **Optimization** | Optuna (100 trials) | Bayesian search explores hyperparameter space efficiently |
| **Trees** | 1,787 (early stopping) | Stopped at optimal iteration to prevent overfitting |
| **Max Depth** | 3 | Shallow trees = strong regularization, reduces variance |
| **Learning Rate** | 0.023 | Low rate + many trees = stable convergence |
| **Subsample** | 85.3% | Row subsampling for additional regularization |
| **Colsample** | 50.0% | Feature subsampling prevents reliance on single features |
| **Regularization** | L1=1.50, L2=0.003 | L1 promotes sparsity, L2 smooths weights |
| **Features** | 20 (13 raw + 7 engineered) | Feature engineering captures medical domain knowledge |
| **Threshold** | 0.42 (optimized) | Calibrated to maximize F1-Score on validation set |
| **Validation** | Adversarial AUC=0.502 | Confirms no data leakage (indistinguishable from random) |

---

## 📊 Dataset

This project uses the **Playground Series S6E2** dataset from Kaggle — a large-scale synthetic dataset modeled on real cardiovascular clinical data.

| Property | Value |
|:---------|:------|
| **Total Patients** | 630,000 |
| **Train Split** | 504,000 (80%) — stratified |
| **Validation Split** | 126,000 (20%) — stratified |
| **Raw Features** | 13 clinical indicators |
| **Engineered Features** | 7 (total: 20) |
| **Target** | Binary (heart disease: yes/no) |
| **Source** | [Kaggle Playground Series S6E2](https://www.kaggle.com/competitions/playground-series-s6e2) |

### Clinical Features

| # | Feature | Type | Range | Description |
|:-:|:--------|:-----|:------|:------------|
| 1 | `age` | Continuous | 18–100 | Patient age in years |
| 2 | `sex` | Binary | 0/1 | Biological sex (0=Female, 1=Male) |
| 3 | `chest_pain_type` | Categorical | 1–4 | Chest pain classification (1=Typical angina → 4=Asymptomatic) |
| 4 | `bp` | Continuous | 60–200 | Resting blood pressure (mmHg) |
| 5 | `cholesterol` | Continuous | 100–600 | Serum cholesterol (mg/dL) |
| 6 | `fbs_over_120` | Binary | 0/1 | Fasting blood sugar > 120 mg/dL |
| 7 | `ekg_results` | Categorical | 0–2 | Resting ECG results (0=Normal, 1=ST-T abnormality, 2=LV hypertrophy) |
| 8 | `max_hr` | Continuous | 60–220 | Maximum heart rate achieved (bpm) |
| 9 | `exercise_angina` | Binary | 0/1 | Exercise-induced angina |
| 10 | `st_depression` | Continuous | 0–6 | ST depression induced by exercise (mm) |
| 11 | `slope_of_st` | Categorical | 1–3 | Slope of peak exercise ST segment |
| 12 | `number_of_vessels_fluro` | Ordinal | 0–3 | Major vessels colored by fluoroscopy |
| 13 | `thallium` | Categorical | 3/6/7 | Thallium stress test (3=Normal, 6=Fixed defect, 7=Reversible defect) |

---

## 🔎 Exploratory Data Analysis

The EDA was conducted entirely in **R Studio**, producing 43 publication-quality figures covering data quality, distributions, correlations, and multivariate analysis.

### Data Quality

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/data_quality/fig_01_missing_values.png" alt="Missing Values Analysis" width="70%"/>
<p><em>Figure 1 — Missing values analysis across all features. No missing data detected in the dataset.</em></p>
</div>

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/data_quality/fig_02_outliers_overview.png" alt="Outliers Overview" width="80%"/>
<p><em>Figure 2 — Outlier detection overview using IQR method across continuous variables.</em></p>
</div>

### Target Distribution

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/target/fig_03_target_distribution.png" alt="Target Distribution" width="65%"/>
<p><em>Figure 3 — Target variable distribution showing the proportion of heart disease cases in the dataset.</em></p>
</div>

### Numerical Distributions

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/numerical/fig_04_age_histogram_kde.png" alt="Age Distribution" width="45%"/>
<img src="heart-disease-prediction/public/figures/eda/numerical/fig_05_age_violin_boxplot.png" alt="Age Violin" width="45%"/>
<p><em>Figures 4-5 — Age distribution (histogram + KDE) and class-separated violin plot.</em></p>
</div>

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/numerical/fig_10_max_hr_histogram_kde.png" alt="Max HR Distribution" width="45%"/>
<img src="heart-disease-prediction/public/figures/eda/numerical/fig_11_max_hr_violin_boxplot.png" alt="Max HR Violin" width="45%"/>
<p><em>Figures 10-11 — Maximum heart rate distribution. Strong separation between classes — patients with heart disease achieve lower max HR.</em></p>
</div>

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/numerical/fig_12_st_depression_histogram_kde.png" alt="ST Depression Distribution" width="45%"/>
<img src="heart-disease-prediction/public/figures/eda/numerical/fig_13_st_depression_violin_boxplot.png" alt="ST Depression Violin" width="45%"/>
<p><em>Figures 12-13 — ST depression distribution. Higher values strongly associated with heart disease presence.</em></p>
</div>

### Categorical Distributions

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/categorical/fig_28_thallium_countplot.png" alt="Thallium Count" width="45%"/>
<img src="heart-disease-prediction/public/figures/eda/categorical/fig_29_thallium_disease_rate.png" alt="Thallium Disease Rate" width="45%"/>
<p><em>Figures 28-29 — Thallium test results. Reversible defect (7) shows dramatically higher disease rate — the most discriminating categorical variable.</em></p>
</div>

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/categorical/fig_16_chest_pain_type_countplot.png" alt="Chest Pain Count" width="45%"/>
<img src="heart-disease-prediction/public/figures/eda/categorical/fig_17_chest_pain_type_disease_rate.png" alt="Chest Pain Disease Rate" width="45%"/>
<p><em>Figures 16-17 — Chest pain type distribution. Asymptomatic (type 4) has the highest disease rate — a counterintuitive but well-documented clinical finding.</em></p>
</div>

### Correlations

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/correlations/fig_30_correlation.png" alt="Correlation Matrix" width="70%"/>
<p><em>Figure 30 — Correlation matrix revealing multicollinearity patterns and feature-target relationships.</em></p>
</div>

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/correlations/fig_31_pairplot.png" alt="Pairplot" width="85%"/>
<p><em>Figure 31 — Pairplot of key continuous variables, colored by heart disease status.</em></p>
</div>

### Multivariate Analysis

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/multivariate/fig_32_ridgeline.png" alt="Ridgeline Plot" width="80%"/>
<p><em>Figure 32 — Ridgeline plot showing distribution shifts across features between healthy and diseased patients.</em></p>
</div>

<div align="center">
<img src="heart-disease-prediction/public/figures/eda/multivariate/fig_33_heatmap_sex_x_chest_pain_type.png" alt="Interaction Heatmap" width="70%"/>
<p><em>Figure 33 — Interaction heatmap between sex and chest pain type, revealing gender-specific risk patterns.</em></p>
</div>

---

## 🧬 Feature Engineering

7 new features were engineered from the 13 raw clinical variables to capture medically relevant interactions and domain knowledge. The `risk_composite` feature alone accounts for **11% of total SHAP importance** — making it the single most important feature in the model.

| # | Feature | Formula | Medical Rationale |
|:-:|:--------|:--------|:------------------|
| 1 | `hr_reserve` | `(220 - age) - max_hr` | Gap between theoretical and achieved max HR. Low values indicate poor cardiac adaptation. |
| 2 | `bp_chol_ratio` | `bp / (cholesterol + 1)` | Normalizes the vascular interaction between blood pressure and cholesterol. |
| 3 | `stress_score` | `st_depression × (2 if angina else 1)` | Amplifies ST depression severity when exercise angina is present. |
| 4 | `age_x_maxhr` | `age × max_hr` | Captures that high max HR is expected in young patients but abnormal in elderly. |
| 5 | `age_decade` | `floor(age / 10) × 10` | Groups by decade to capture age-related risk thresholds. |
| 6 | `age_hr_ratio` | `age / max_hr` | High ratio = older patient with low max HR = cardiac deconditioning marker. |
| 7 | `risk_composite` | `(thallium=7) + (chest_pain=4) + (vessels>0) + (angina=1) + (slope≥2)` | Sum of 5 binary indicators — the top SHAP feature (11%). |

---

## 📐 Statistical Tests

Rigorous statistical testing was performed in R to quantify the significance of each variable for predicting heart disease.

### Chi-Square Tests (Categorical Variables)

| Variable | Cramer's V | Significance |
|:---------|:----------:|:-------------|
| `thallium` | **0.606** | Very strong association |
| `chest_pain_type` | **0.525** | Strong association |
| `number_of_vessels_fluro` | **0.463** | Strong association |
| `exercise_angina` | **0.442** | Strong association |
| `slope_of_st` | **0.430** | Strong association |
| `sex` | **0.342** | Moderate association |
| `ekg_results` | **0.219** | Weak-moderate association |
| `fbs_over_120` | 0.034 | Negligible association |

### Wilcoxon Tests (Continuous Variables)

| Variable | Effect Size | Interpretation |
|:---------|:----------:|:---------------|
| `max_hr` | **0.887** | Large effect — strongest continuous predictor |
| `st_depression` | **0.866** | Large effect |
| `age` | **0.427** | Small effect |
| `cholesterol` | 0.166 | Small effect |
| `bp` | 0.010 | Negligible effect |

<div align="center">
<img src="heart-disease-prediction/public/figures/statistical_tests/fig_34_significance.png" alt="Statistical Significance" width="75%"/>
<p><em>Figure 34 — Statistical significance of all variables ranked by effect size.</em></p>
</div>

> **Key insight:** `fbs_over_120` (fasting blood sugar) and `bp` (blood pressure) show negligible association with heart disease in this dataset. However, they were retained as features because XGBoost can exploit weak signals in combination with other variables, and their SHAP importance confirms minimal but non-zero contribution.

---

## 🏋️ Training

### Optuna Bayesian Optimization

100 trials of Tree-structured Parzen Estimator (TPE) search were run to find optimal hyperparameters.

<div align="center">
<img src="heart-disease-prediction/public/figures/training/fig01_optuna.png" alt="Optuna Optimization" width="85%"/>
<p><em>Figure — Optuna optimization history. Best trial found at iteration #67 with AUC=0.956.</em></p>
</div>

### Optimal Hyperparameters

| Parameter | Value | Search Range |
|:----------|:------|:------------|
| `max_depth` | **3** | [2, 8] |
| `learning_rate` | **0.023** | [0.005, 0.3] |
| `min_child_weight` | **5** | [1, 10] |
| `gamma` | **1.147** | [0, 5] |
| `subsample` | **0.853** | [0.5, 1.0] |
| `colsample_bytree` | **0.500** | [0.3, 1.0] |
| `reg_alpha` (L1) | **1.502** | [0, 10] |
| `reg_lambda` (L2) | **0.003** | [0, 10] |

### Training Configuration

| Parameter | Value |
|:----------|:------|
| **Best Iteration** | 1,787 trees (early stopping) |
| **Train Size** | 504,000 patients (80%) |
| **Validation Size** | 126,000 patients (20%) |
| **Split Strategy** | Stratified |
| **Adversarial Validation AUC** | 0.502 (no leakage) |
| **Evaluation Metric** | AUC-ROC |
| **XGBoost Version** | 3.1.0 |

### Learning Curves

<div align="center">
<img src="heart-disease-prediction/public/figures/training/fig05_learning.png" alt="Learning Curves" width="80%"/>
<p><em>Figure — Learning curves showing train/validation AUC convergence. Early stopping at iteration 1,787 prevents overfitting.</em></p>
</div>

---

## 📈 Results

### Summary Metrics

| Metric | Value | Interpretation |
|:-------|:-----:|:---------------|
| **AUC-ROC** | **0.956** | Excellent discrimination between classes |
| **AUC (Blend)** | **0.956** | Stable after probability calibration |
| **PR-AUC** | **0.950** | Strong performance under class imbalance |
| **F1-Score** | **0.878** | Good precision-recall balance |
| **Brier Score** | **0.081** | Well-calibrated probability estimates |
| **KS Statistic** | **0.778** | Strong class separation |
| **Optimal Threshold** | **0.42** | Calibrated for clinical sensitivity |

### Evaluation Curves

<div align="center">
<img src="heart-disease-prediction/public/figures/training/fig02_evaluation.png" alt="Evaluation Dashboard" width="90%"/>
<p><em>Figure — Complete evaluation dashboard: ROC curve, Precision-Recall curve, and classification metrics.</em></p>
</div>

### ROC & Precision-Recall

<div align="center">
<img src="heart-disease-prediction/public/figures/evaluation/roc_pr/fig_37_roc.png" alt="ROC Curve" width="45%"/>
<img src="heart-disease-prediction/public/figures/evaluation/roc_pr/fig_38_pr_curve.png" alt="PR Curve" width="45%"/>
<p><em>Figures 37-38 — ROC curve (AUC=0.956) and Precision-Recall curve (PR-AUC=0.950).</em></p>
</div>

### Confusion Matrix

<div align="center">
<img src="heart-disease-prediction/public/figures/evaluation/confusion_matrix/fig_36_confusion_matrix.png" alt="Confusion Matrix" width="55%"/>
<p><em>Figure 36 — Confusion matrix on 126,000 validation patients at threshold=0.42.</em></p>
</div>

### Calibration & Threshold

<div align="center">
<img src="heart-disease-prediction/public/figures/evaluation/calibration/fig_39_prob_dist.png" alt="Probability Distribution" width="45%"/>
<img src="heart-disease-prediction/public/figures/evaluation/calibration/fig_40_threshold.png" alt="Threshold Analysis" width="45%"/>
<p><em>Figures 39-40 — Predicted probability distribution and threshold optimization analysis. Optimal threshold at 0.42 maximizes F1-Score.</em></p>
</div>

### KS Statistic & Lift

<div align="center">
<img src="heart-disease-prediction/public/figures/training/fig07_ks.png" alt="KS Statistic" width="45%"/>
<img src="heart-disease-prediction/public/figures/training/fig06_lift.png" alt="Lift Curve" width="45%"/>
<p><em>Figures — Kolmogorov-Smirnov statistic (0.778) and cumulative lift curve.</em></p>
</div>

---

## 🔍 Explainability (SHAP)

SHAP (SHapley Additive exPlanations) analysis provides complete transparency into the model's decision-making process. Every prediction can be decomposed into individual feature contributions.

### SHAP Feature Importance

| Rank | Feature | SHAP Importance | Category |
|:----:|:--------|:---------------:|:---------|
| 1 | `risk_composite` | **11.04%** | Engineered |
| 2 | `max_hr` | **6.19%** | Raw |
| 3 | `thallium` | **5.14%** | Raw |
| 4 | `slope_of_st` | **4.80%** | Raw |
| 5 | `number_of_vessels_fluro` | **4.38%** | Raw |
| 6 | `exercise_angina` | **4.36%** | Raw |
| 7 | `sex` | **4.08%** | Raw |
| 8 | `chest_pain_type` | **3.53%** | Raw |
| 9 | `age_hr_ratio` | **3.48%** | Engineered |
| 10 | `stress_score` | **3.22%** | Engineered |

> **Key insight:** The engineered `risk_composite` feature dominates with 11% importance — nearly twice the contribution of the next best feature. This validates the domain-driven feature engineering approach.

### SHAP Summary Plot

<div align="center">
<img src="heart-disease-prediction/public/figures/training/fig08_shap_summary.png" alt="SHAP Summary" width="85%"/>
<p><em>Figure — SHAP beeswarm plot showing each feature's impact on model predictions. Red dots indicate high feature values, blue dots indicate low values.</em></p>
</div>

### SHAP High/Low Risk Profiles

<div align="center">
<img src="heart-disease-prediction/public/figures/training/fig09_shap_high.png" alt="SHAP High Risk" width="45%"/>
<img src="heart-disease-prediction/public/figures/training/fig10_shap_low.png" alt="SHAP Low Risk" width="45%"/>
<p><em>Figures — SHAP waterfall plots for high-risk (left) and low-risk (right) patient profiles, showing how each feature pushes the prediction.</em></p>
</div>

### SHAP Dependence

<div align="center">
<img src="heart-disease-prediction/public/figures/training/fig11_shap_dep.png" alt="SHAP Dependence" width="80%"/>
<p><em>Figure — SHAP dependence plots revealing feature interactions and non-linear relationships.</em></p>
</div>

### Feature Importance (Gain)

<div align="center">
<img src="heart-disease-prediction/public/figures/training/fig12_importance.png" alt="Feature Importance" width="75%"/>
<p><em>Figure — XGBoost native feature importance (gain), consistent with SHAP rankings.</em></p>
</div>

---

## 🌐 Web Platform

The web platform transforms the ML pipeline into an interactive, production-ready application.

### Tech Stack

| Layer | Technology | Version |
|:------|:-----------|:--------|
| **Frontend** | Next.js (App Router) | 14.2 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 3.4 |
| **Animations** | GSAP + ScrollTrigger | 3.14 |
| **Charts** | Recharts | 3.7 |
| **Icons** | Lucide React | 0.563 |
| **Backend** | FastAPI | 0.115 |
| **ML Runtime** | XGBoost | 3.1.0 |
| **Validation** | Pydantic | 2.10 |

### Pages

| Page | Route | Description |
|:-----|:------|:------------|
| **Landing** | `/` | Hero section with key statistics, project timeline, results preview |
| **Data** | `/data` | Dataset overview, 30 distribution figures, correlation matrix, statistical tests, feature engineering |
| **Training** | `/training` | Pipeline flow, Optuna optimization, metrics grid, SHAP analysis, model comparison |
| **Diagnostic** | `/demo` | Multi-step patient form (4 steps), real API prediction, consensus results with risk gauge |

### Design System

- **Theme:** Dark medical (`#050505` background, `#DC2626` accent red, `#10B981` emerald)
- **Components:** Glassmorphism cards, gradient buttons, animated metric counters
- **Animations:** GSAP ScrollTrigger reveals, stagger effects, SVG risk gauge
- **Video:** HTML5 `<video>` hero backgrounds with gradient overlays
- **Responsive:** Mobile-first, tested from 320px to 2560px

### Multi-Step Diagnostic Form

The diagnostic form guides the user through 4 clinical steps:

```
Step 1: Profile          Step 2: Clinical         Step 3: Cardiac          Step 4: Stress Test
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  • Age           │     │  • Blood pressure│     │  • Chest pain    │     │  • Exercise      │
│  • Sex           │ ──► │  • Cholesterol   │ ──► │  • ECG results   │ ──► │    angina        │
│                  │     │  • Fasting sugar  │     │  • Thallium test │     │  • ST depression │
│                  │     │  • Max heart rate │     │  • Vessels count │     │  • ST slope      │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                                                  │
                                                                           API POST /predict
                                                                                  │
                                                                                  ▼
                                                                         ┌─────────────────┐
                                                                         │  CONSENSUS       │
                                                                         │  • Risk level    │
                                                                         │  • Probability   │
                                                                         │  • SHAP contrib  │
                                                                         │  • Model accord  │
                                                                         └─────────────────┘
```

---

## 📡 API Reference

### `POST /predict`

Accepts 13 raw clinical features, computes 7 engineered features server-side, runs all loaded models, and returns a weighted consensus.

**Request:**
```json
{
  "age": 65, "sex": 1, "chest_pain_type": 4, "bp": 160,
  "cholesterol": 300, "fbs_over_120": 1, "ekg_results": 2,
  "max_hr": 110, "exercise_angina": 1, "st_depression": 3.5,
  "slope_of_st": 3, "number_of_vessels_fluro": 3, "thallium": 7
}
```

**Response:**
```json
{
  "consensus": {
    "probability": 0.9412,
    "prediction": 1,
    "risk_level": "Tres eleve",
    "agreement": "1/1",
    "confidence": "high"
  },
  "models": [
    {
      "name": "hakim",
      "algo": "XGBoost",
      "probability": 0.9412,
      "prediction": 1,
      "auc": 0.95607,
      "threshold": 0.42,
      "confidence": "Tres elevee"
    }
  ],
  "feature_contributions": {
    "risk_composite": 0.1104,
    "max_hr": 0.0619,
    "thallium": 0.0514
  },
  "processing_time_ms": 12.34,
  "disclaimer": "Cet outil est un projet academique..."
}
```

### `GET /models`

Returns metadata for all loaded models (type, AUC, F1, features, SHAP importance).

### `GET /health`

Health check endpoint returning model count and names.

---

## 🚀 Installation & Usage

### Prerequisites

- **Node.js** 18+ (frontend)
- **Python** 3.10+ (backend)
- **npm** or **yarn**

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/Anas7823/heart-disease-prediction.git
cd heart-disease-prediction/heart-disease-prediction

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

```bash
# Navigate to backend
cd heart-disease-prediction/backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Start API server
uvicorn app:app --reload --port 8000
```

API available at [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI).

### Docker (Backend)

```bash
cd heart-disease-prediction/backend
docker build -t heart-disease-api .
docker run -p 8000:8000 heart-disease-api
```

---

## 📁 Project Structure

```
heart-disease-prediction/
│
├── README.md                                    # This file
├── requirements.txt                             # Global Python dependencies
│
├── data/
│   ├── raw/                                     # Raw Kaggle data (train.csv, test.csv)
│   ├── processed/                               # Cleaned data (train_processed.csv)
│   └── plots/                                   # R/Julia generated plots
│
├── notebooks/
│   ├── Julia/
│   │   └── nettoyage.jl                         # High-performance data cleaning
│   ├── Python/
│   │   ├── 01_eda_exploratory.ipynb             # EDA notebook
│   │   └── 03_model_training.ipynb              # XGBoost training pipeline
│   └── R/
│       ├── 01_eda_exploratory.R                 # Statistical EDA (43 figures)
│       └── 02_feature_engineering.R             # Feature creation & imputation
│
├── models/
│   └── xgboost_heart_disease_v1.joblib          # Trained model (joblib format)
│
├── src/
│   ├── app.py                                   # Streamlit frontend (legacy)
│   ├── preprocessing.py                         # sklearn transformation pipelines
│   └── visualization.py                         # Custom plotting functions
│
└── heart-disease-prediction/                           # Full-stack web platform
    │
    ├── package.json                             # Node.js dependencies
    ├── tailwind.config.ts                       # Design system configuration
    ├── tsconfig.json                            # TypeScript configuration
    │
    ├── backend/
    │   ├── app.py                               # FastAPI server (3 endpoints)
    │   ├── requirements.txt                     # Python API dependencies
    │   ├── Dockerfile                           # Container configuration
    │   └── models/
    │       └── hakim/
    │           ├── xgb_model.json               # XGBoost model (native JSON)
    │           └── model_meta.json              # Metadata (metrics, SHAP, params)
    │
    ├── public/
    │   ├── videos/                              # 4 hero background videos (MP4)
    │   ├── data/                                # CSV data for charts (Chi2, Wilcoxon)
    │   └── figures/
    │       ├── training/                        # 14 training figures (Optuna, SHAP, etc.)
    │       ├── eda/
    │       │   ├── data_quality/                # 3 figures (missing values, outliers)
    │       │   ├── target/                      # 2 figures (target distribution)
    │       │   ├── numerical/                   # 20 figures (histograms, violins)
    │       │   ├── categorical/                 # 32 figures (countplots, disease rates)
    │       │   ├── correlations/                # 2 figures (correlation, pairplot)
    │       │   └── multivariate/                # 2 figures (ridgeline, heatmap)
    │       ├── evaluation/                      # 7 figures (ROC, PR, calibration, etc.)
    │       ├── statistical_tests/               # 1 figure (significance ranking)
    │       └── stacking/                        # 2 figures (stacking analysis)
    │
    └── src/
        ├── app/
        │   ├── layout.tsx                       # Root layout (fonts, theme, glow)
        │   ├── page.tsx                         # Landing page
        │   ├── data/page.tsx                    # Data analysis page
        │   ├── demo/page.tsx                    # Diagnostic IA page
        │   └── training/page.tsx                # Training page
        │
        ├── components/
        │   ├── ui/                              # 7 reusable UI components
        │   │   ├── GlassCard.tsx                # Glassmorphism card with GSAP
        │   │   ├── Button.tsx                   # Gradient button
        │   │   ├── MetricCard.tsx               # Animated metric counter
        │   │   ├── FigureViewer.tsx             # Image viewer with lightbox
        │   │   ├── VideoBackground.tsx          # HTML5 video background
        │   │   └── MedicalDisclaimer.tsx        # Medical disclaimer
        │   │
        │   ├── landing/                         # 4 landing page sections
        │   │   ├── HeroSection.tsx              # Animated hero with GSAP
        │   │   ├── ProblemStats.tsx             # 4 stat cards with count-up
        │   │   ├── TimelineSection.tsx          # Project timeline
        │   │   └── ResultsPreview.tsx           # AUC showcase
        │   │
        │   ├── data/                            # 5 data analysis components
        │   │   ├── DatasetOverview.tsx           # Dataset statistics
        │   │   ├── DistributionCharts.tsx        # 30 figures with tab navigation
        │   │   ├── CorrelationSection.tsx        # Correlation matrix + pairplot
        │   │   ├── StatisticalTests.tsx          # Chi2 + Wilcoxon results
        │   │   └── FeatureEngineeringSection.tsx # 7 engineered features
        │   │
        │   ├── training/                        # 6 training components
        │   │   ├── PipelineFlow.tsx              # Animated pipeline diagram
        │   │   ├── OptunaSection.tsx             # Optuna figure + params table
        │   │   ├── MetricsGrid.tsx               # Performance metrics
        │   │   ├── ShapAnalysis.tsx              # 4 SHAP figures + bar chart
        │   │   ├── ModelComparison.tsx           # 3-model comparison table
        │   │   └── FigureGallery.tsx             # Training figures gallery
        │   │
        │   ├── demo/                            # 4 diagnostic components
        │   │   ├── FormStepIndicator.tsx         # 4-step progress bar
        │   │   ├── PatientForm.tsx               # Multi-step form (sliders, toggles)
        │   │   ├── PredictionResults.tsx         # Consensus panel + SHAP bars
        │   │   └── RiskGauge.tsx                 # SVG semi-circular gauge
        │   │
        │   └── layout/
        │       ├── Navbar.tsx                   # Glass navigation bar
        │       └── Footer.tsx                   # Minimal footer
        │
        └── lib/
            ├── types.ts                         # TypeScript type definitions
            ├── constants.ts                     # All metrics, params, SHAP data
            ├── api.ts                           # API client (predict, models, health)
            ├── features.ts                      # Client-side feature engineering
            └── animations.ts                    # GSAP animation presets
```

---

## 💡 Lessons Learned

1. **Feature engineering > model tuning.** The `risk_composite` feature — a simple sum of 5 binary clinical indicators — became the most important feature (11% SHAP). Domain knowledge outperforms brute-force hyperparameter search.

2. **Threshold optimization is critical.** The default 0.5 threshold yielded suboptimal F1. Systematic threshold search found 0.42 as the optimal cutoff, significantly improving the precision-recall trade-off for clinical applications.

3. **Adversarial validation prevents data leakage.** An adversarial AUC of 0.502 (essentially random) confirmed that our train/validation split is valid and the model isn't exploiting distribution differences.

4. **Shallow trees generalize better.** Despite XGBoost supporting deep trees, `max_depth=3` with 1,787 trees outperformed deeper configurations. The regularization from shallow trees + low learning rate (0.023) proved critical for generalization on 630K patients.

5. **Polyglot pipelines leverage each language's strengths.** R's ggplot2 produced publication-quality EDA figures. Julia's performance enabled efficient data cleaning. Python's ecosystem delivered the ML pipeline and API. Using the right tool for each job improved both quality and productivity.

6. **Calibration matters for medical predictions.** A Brier Score of 0.081 confirms that predicted probabilities are meaningful — when the model says "70% risk", it should be right approximately 70% of the time. This is essential for any clinical decision support system.

---

## 🔮 Future Work

- [ ] **Integrate colleague models** — Add 2 additional independently trained models to the consensus (Anas: XGBoost variant, Mouad: alternative approach)
- [ ] **Stacking ensemble** — Implement a meta-learner combining the 3 base model predictions
- [ ] **Cross-validation** — Replace single train/val split with 5-fold stratified cross-validation
- [ ] **Deploy to production** — Frontend on Vercel, backend on Railway with Docker
- [ ] **Patient history** — Add sessionStorage persistence for form data across page navigation
- [ ] **Confidence intervals** — Display prediction uncertainty bounds alongside point estimates
- [ ] **A/B testing** — Compare consensus vs. best single model performance in production
- [ ] **Multilingual support** — Add English translation for international accessibility

---

## 👥 Team

<div align="center">

**Master Big Data & AI Development — IPSSI Paris — Promotion 2026**

| Member | Role | Contribution |
|:-------|:-----|:-------------|
| **Hakim Djaalal** | ML Lead + Full-Stack | XGBoost/Optuna pipeline, Feature Engineering, FastAPI backend, Next.js platform |
| **Anas El Khiat** | Data Science | EDA, Statistical Analysis, Model training (branch `anas`) |
| **Mouad Aoughane** | Data Science | Data processing, Model training (branch `mouad`) |

<br/>

[![GitHub - Hakim](https://img.shields.io/badge/GitHub-Hakim78-181717?style=for-the-badge&logo=github)](https://github.com/Hakim78)
[![GitHub - Anas](https://img.shields.io/badge/GitHub-Anas7823-181717?style=for-the-badge&logo=github)](https://github.com/Anas7823)

</div>

---

## 📝 Citation

```bibtex
@misc{djaalal2026heartdisease,
  title     = {Heart Disease Prediction: Multi-Model Consensus Platform
               with XGBoost, SHAP Explainability and Full-Stack Web Application},
  author    = {Djaalal, Hakim and El Khiat, Anas and Aoughane, Mouad},
  year      = {2026},
  publisher = {GitHub},
  url       = {https://github.com/Anas7823/heart-disease-prediction}
}
```

---

## 🙏 Acknowledgements

- [Kaggle Playground Series S6E2](https://www.kaggle.com/competitions/playground-series-s6e2) for the competition and dataset
- [XGBoost](https://xgboost.readthedocs.io/) for the gradient boosting framework
- [Optuna](https://optuna.org/) for Bayesian hyperparameter optimization
- [SHAP](https://shap.readthedocs.io/) for model explainability
- [Next.js](https://nextjs.org/) and [Vercel](https://vercel.com/) for the frontend framework
- [FastAPI](https://fastapi.tiangolo.com/) for the high-performance API framework
- [GSAP](https://greensock.com/gsap/) for premium web animations
- [R Studio](https://posit.co/products/open-source/rstudio/) for statistical analysis tooling

---

<div align="center">

**⚠️ Medical Disclaimer**

*This tool is an academic project for educational purposes. It does not constitute a medical diagnosis and does not replace consultation with a healthcare professional. Predictions are based on a statistical model trained on historical data.*

---

**If you found this project useful, please consider giving it a ⭐**

<a href="https://github.com/Anas7823/heart-disease-prediction/stargazers">
<img src="https://img.shields.io/github/stars/Anas7823/heart-disease-prediction?style=social" alt="GitHub Stars"/>
</a>

</div>
