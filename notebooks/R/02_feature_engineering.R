# ==============================================================================
# 02_feature_engineering.R
# ==============================================================================

# 1. Chargement des librairies
if(!require(tidyverse)) install.packages("tidyverse")
if(!require(caret)) install.packages("caret")
if(!require(recipes)) install.packages("recipes")

library(tidyverse)
library(caret)
library(recipes)
library(janitor)

# 2. Chargement des données
df <- read_csv("C:/Users/anase/Documents/Master_II/Langage R/Heart_attack/data/raw/train.csv") %>% 
  clean_names()

# VÉRIFICATION : Affiche les noms pour être sûr
print("Colonnes disponibles :")
print(names(df))

# ==============================================================================
# ÉTAPE A : Nettoyage & Typage
# ==============================================================================

# Transformation des types
df <- df %>%
  mutate(
    # Cible
    heart_disease = as.factor(heart_disease),
    
    # Variables catégorielles
    sex = as.factor(sex),
    chest_pain_type = as.factor(chest_pain_type),
    fbs_over_120 = as.factor(fbs_over_120),
    
    ekg_results = as.factor(ekg_results),       # Au lieu de rest_ecg
    exercise_angina = as.factor(exercise_angina),
    slope_of_st = as.factor(slope_of_st),       # Au lieu de slope
    thallium = as.factor(thallium)              # Au lieu de thal
  )

df$cholesterol[df$cholesterol == 0] <- NA
print(paste("Cholestérols manquants (0) traités :", sum(is.na(df$cholesterol))))

# ==============================================================================
# ÉTAPE B : Feature Engineering (Recette)
# ==============================================================================

# Création de la recette
rec <- recipe(heart_disease ~ ., data = df) %>%
  
  # 1. IMPUTATION
  step_impute_knn(cholesterol, neighbors = 5) %>%
  
  # 2. CRÉATION DE VARIABLES
  # Attention : 'oldpeak' s'appelle 'st_depression' chez vous
  step_interact(terms = ~ age:st_depression) %>%
  
  # Ratio Cardio (Cholestérol / Max HR)
  step_mutate(risk_ratio = cholesterol / (max_hr + 1)) %>%
  
  # 3. TRANSFORMATION
  # Log sur st_depression (votre 'oldpeak')
  step_log(st_depression, offset = 1) %>%
  
  # 4. ENCODAGE (One-Hot)
  step_dummy(all_nominal(), -all_outcomes()) %>%
  
  # 5. NETTOYAGE (Variance nulle)
  step_nzv(all_predictors())

# ==============================================================================
# ÉTAPE C : Exécution
# ==============================================================================

print("Préparation et cuisson de la recette...")
prep_rec <- prep(rec, training = df)
df_processed <- bake(prep_rec, new_data = df)

# Vérification finale
print("Dimension finale :")
print(dim(df_processed))

# ==============================================================================
# ÉTAPE D : Sauvegarde
# ==============================================================================

output_dir <- "C:/Users/anase/Documents/Master_II/Langage R/Heart_attack/data/processed"
dir.create(output_dir, showWarnings = FALSE)
write_csv(df_processed, paste0(output_dir, "/train_processed.csv"))

print("✅ Succès ! Fichier 'train_processed.csv' prêt pour le modèle.")