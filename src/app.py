import streamlit as st
import pandas as pd
import joblib
import numpy as np

# ==============================================================================
# 1. CONFIGURATION DE LA PAGE
# ==============================================================================
st.set_page_config(
    page_title="HeartGuard AI - Diagnostic",
    page_icon="🫀",
    layout="wide",
    initial_sidebar_state="expanded"
)

# CSS pour améliorer le look
st.markdown("""
    <style>
    .main {
        background-color: #f5f5f5;
    }
    .stButton>button {
        width: 100%;
        background-color: #ff4b4b;
        color: white;
        height: 3em;
        font-size: 20px;
    }
    </style>
    """, unsafe_allow_html=True)

# ==============================================================================
# 2. CHARGEMENT DU MODÈLE
# ==============================================================================
@st.cache_resource
def load_pipeline():
    # On charge le Pipeline complet (qui contient le scaler et le modèle)
    try:
        model = joblib.load('models/xgboost_heart_disease_v1.joblib')
        return model
    except FileNotFoundError:
        st.error("⚠️ Fichier modèle introuvable. Vérifiez que 'models/xgboost_heart_disease_v1.joblib' existe.")
        return None

pipeline = load_pipeline()

# ==============================================================================
# 3. INTERFACE UTILISATEUR (SIDEBAR)
# ==============================================================================
with st.sidebar:
    st.image("https://cdn-icons-png.flaticon.com/512/2966/2966486.png", width=100)
    st.title("HeartGuard AI")
    st.info("Ce modèle utilise XGBoost pour estimer le risque de maladie cardiaque basé sur des données cliniques.")
    st.write("---")
    st.write("Developed for Kaggle Playground S6E2")

# ==============================================================================
# 4. FORMULAIRE DE SAISIE
# ==============================================================================
st.title("🫀 Diagnostic Prédictif")
st.markdown("### Veuillez renseigner les paramètres cliniques du patient")

with st.form("patient_data"):
    # On divise l'écran en 3 colonnes pour faire propre
    c1, c2, c3 = st.columns(3)

    with c1:
        st.subheader("👤 Profil")
        age = st.number_input("Âge", 20, 100, 50)
        sex = st.radio("Sexe", ["Homme", "Femme"], horizontal=True)
        # Mapping Sexe : Homme=1, Femme=0
        sex_val = 1 if sex == "Homme" else 0
        
        cp = st.selectbox("Type de Douleur Thoracique (Chest Pain)", 
                          options=[1, 2, 3, 4], 
                          format_func=lambda x: f"Type {x} " + {1:"(Angine Typique)", 2:"(Angine Atypique)", 3:"(Douleur non angineuse)", 4:"(Asymptomatique)"}[x])

    with c2:
        st.subheader("📊 Constantes")
        bp = st.number_input("Pression Artérielle (Au repos)", 90, 200, 120, help="mm Hg")
        chol = st.number_input("Cholestérol", 100, 600, 200, help="mg/dl")
        fbs = st.selectbox("Glycémie à jeun > 120 mg/dl ?", ["Non", "Oui"])
        fbs_val = 1 if fbs == "Oui" else 0
        
        ekg = st.selectbox("Résultats ECG (Repos)", [0, 1, 2], help="0: Normal, 1: Anomalie ST-T, 2: Hypertrophie")

    with c3:
        st.subheader("❤️ Coeur & Effort")
        max_hr = st.number_input("Fréquence Cardiaque Max", 60, 220, 150)
        ex_angina = st.selectbox("Angine induite par l'effort ?", ["Non", "Oui"])
        ex_angina_val = 1 if ex_angina == "Oui" else 0
        
        oldpeak = st.number_input("Dépression ST (Oldpeak)", 0.0, 10.0, 1.0, step=0.1)
        slope = st.selectbox("Pente ST (Slope)", [1, 2, 3])
        st.write("---")
    c4, c5 = st.columns(2)
    with c4:
        vessels = st.slider("Nombre de vaisseaux colorés (Fluoroscopie)", 0, 3, 0)
    with c5:
        thallium = st.selectbox("Thallium Test", options=[3, 6, 7], format_func=lambda x: f"{x} ({'Normal' if x==3 else 'Défaut Fixe' if x==6 else 'Défaut Réversible'})")

    submit_btn = st.form_submit_button("LANCER L'ANALYSE")

# ==============================================================================
# 5. PRÉDICTION
# ==============================================================================
if submit_btn and pipeline is not None:
    # 1. Création du DataFrame avec les noms de colonnes EXACTS de l'entraînement
    input_data = pd.DataFrame({
        'age': [age],
        'sex': [sex_val],
        'chest_pain_type': [cp],
        'bp': [bp],
        'cholesterol': [chol],
        'fbs_over_120': [fbs_val],
        'ekg_results': [ekg],
        'max_hr': [max_hr],
        'exercise_angina': [ex_angina_val],
        'st_depression': [oldpeak],
        'slope_of_st': [slope],
        'number_of_vessels_fluro': [vessels],
        'thallium': [thallium]
    })

    # 2. Prédiction
    try:
        with st.spinner('Analyse par le modèle XGBoost en cours...'):
            # Le pipeline s'occupe de tout (Scaling, OneHot, etc.)
            prediction = pipeline.predict(input_data)[0]
            probability = pipeline.predict_proba(input_data)[0][1] # Proba d'être malade (classe 1)

        # 3. Affichage des résultats
        st.write("---")
        col_res1, col_res2 = st.columns([1, 2])

        with col_res1:
            # Jauge de probabilité
            st.metric("Probabilité de Maladie", f"{probability:.1%}")
            
        with col_res2:
            if prediction == 1:
                st.error("🔴 RÉSULTAT : PRÉSENCE DE MALADIE CARDIAQUE")
                st.write(f"Le modèle estime un risque élevé ({probability:.2f}). Veuillez consulter un cardiologue.")
            else:
                st.success("🟢 RÉSULTAT : ABSENCE DE MALADIE")
                st.write(f"Le modèle estime un risque faible ({probability:.2f}).")

        # Barre de progression visuelle
        st.progress(float(probability))

    except Exception as e:
        st.error(f"Une erreur est survenue lors de la prédiction : {e}")
        st.write("Détails pour le débogage :", input_data)