
# 1. Configuration et Chargement "Propre"


library(tidyverse)  # Le couteau suisse (dplyr, ggplot2, purrr...)
library(patchwork)  # Pour combiner les graphiques (A + B)
library(corrplot)   # Pour la matrice de corrélation
library(janitor)    # Pour nettoyer les noms de colonnes sales

# Configuration du thème global (Look professionnel)
theme_set(theme_minimal(base_size = 14) +
            theme(plot.title = element_text(face = "bold", hjust = 0.5)))

# Chargement des données
df <- read_csv("C:/Users/anase/Documents/Master_II/Langage R/Heart_attack/data/raw/train.csv") %>% 
  clean_names() # Convertit "Heart Disease" en "heart_disease", etc.

# Définition de la cible et des types de colonnes
target_col <- "heart_disease"

# Identification automatique des colonnes (plus robuste que manuel)
# On exclut l'ID et la cible
num_cols <- df %>% select(where(is.numeric)) %>% names() %>% setdiff(c("id", target_col))
cat_cols <- df %>% select(where(is.character), where(is.factor)) %>% names() %>% setdiff(c("id", target_col))

# Si tes catégories sont codées en chiffres (ex: Sex = 0/1), on les force manuellement ici :
# Adapte cette liste selon ton CSV réel
cat_cols_manual <- c("sex", "chest_pain_type", "fbs_over_120", "ekg_results", 
                     "exercise_angina", "slope_of_st", "thallium")
num_cols <- setdiff(names(df), c(cat_cols_manual, target_col, "id"))

print(paste("Dataset chargé :", nrow(df), "lignes."))


# 2. Analyse de la Cible (Target Balance)


# Figure 1 : Distribution de la cible
p1 <- df %>%
  ggplot(aes(x = factor(heart_disease), fill = factor(heart_disease))) +
  geom_bar() +
  scale_fill_manual(values = c("#3498db", "#e74c3c"), labels = c("Sain", "Malade")) +
  geom_text(stat='count', aes(label=..count..), vjust=-0.5) +
  labs(title = "Figure 1: Distribution de la Maladie (Cible)",
       x = "Maladie (0=Non, 1=Oui)", y = "Nombre de patients", fill = "Statut")

print(p1)


# 3. Analyse Automatisée des Variables Numériques (12+ Figures)


analyze_numeric <- function(col_name) {
  
  # Graphique A : Distribution (Histogramme + Densité)
  p_dist <- df %>%
    ggplot(aes(x = .data[[col_name]], fill = factor(heart_disease))) +
    geom_histogram(aes(y = ..density..), alpha = 0.5, position = "identity", bins = 30) +
    geom_density(alpha = 0.7) +
    scale_fill_manual(values = c("#3498db", "#e74c3c")) +
    labs(title = paste("Dist. de", col_name), x = col_name) +
    theme(legend.position = "none")
  
  # Graphique B : Boxplot (vs Target)
  p_box <- df %>%
    ggplot(aes(x = factor(heart_disease), y = .data[[col_name]], fill = factor(heart_disease))) +
    geom_boxplot(alpha = 0.8, outlier.colour = "red") +
    scale_fill_manual(values = c("#3498db", "#e74c3c")) +
    labs(title = paste("Impact", col_name), x = "Maladie") +
    theme(legend.position = "none")
  
  # Combinaison avec Patchwork
  combined_plot <- p_dist + p_box + 
    plot_annotation(title = paste("Analyse de :", col_name))
  
  print(combined_plot)
}

# Lancement de la boucle sur toutes les colonnes numériques
walk(num_cols, ~ plot_categorical(.x, df))


# ==============================================================================
# 4. Analyse Automatisée des Variables Catégorielles
# ==============================================================================

plot_categorical <- function(col_name, data) {
  
  # --- SÉCURITÉ : Conversion locale temporaire ---
  plot_data <- data %>%
    mutate(target_numeric = as.numeric(as.character(.data[[target_col]])))
  
  # Calcul des stats
  summary_stats <- plot_data %>%
    group_by(.data[[col_name]]) %>%
    summarise(
      taux_maladie = mean(target_numeric, na.rm = TRUE),
      count = n()
    )
  
  # Plot A
  p1 <- ggplot(plot_data, aes(x = factor(.data[[col_name]]))) +
    geom_bar(fill = "grey70") +
    labs(title = paste("Volume:", col_name))
  
  # Plot B
  p2 <- ggplot(summary_stats, aes(x = factor(.data[[col_name]]), y = taux_maladie, fill = factor(.data[[col_name]]))) +
    geom_col() +
    scale_fill_viridis_d(option = "D", guide = "none") +
    geom_hline(yintercept = mean(plot_data$target_numeric, na.rm=TRUE), color="red", linetype="dashed") +
    labs(title = paste("Risque Maladie :", col_name), 
         x = col_name, y = "Probabilité (0-1)")
  
  print(p1 + p2)
}

# Lancement corrigé
walk(cat_cols_manual, function(col) plot_categorical(col, df))

# ==============================================================================
# 5. Matrice de Corrélation & Sauvegarde
# ==============================================================================

# Sélection numérique
df_corr_ready <- df %>% select(where(is.numeric)) 
M <- cor(df_corr_ready, use = "complete.obs")

# Affichage direct dans RStudio
corrplot(M, method = "color", type = "upper", order = "hclust", 
         addCoef.col = "black", number.cex = 0.7, 
         tl.col = "black", tl.srt = 45, diag = FALSE, 
         col = colorRampPalette(c("#3498db", "white", "#e74c3c"))(200),
         title = "Matrice de Corrélation", mar = c(0,0,2,0))

# Sauvegarde PNG (Avec création du dossier)
output_dir <- "C:/Users/anase/Documents/Master_II/Langage R/Heart_attack/data/plots"
dir.create(output_dir, showWarnings = FALSE) # Sécurité

png(paste0(output_dir, "/correlation_matrix.png"), width = 1000, height = 1000, res = 100)
corrplot(M, method = "color", type="upper", order="hclust", 
         addCoef.col = "black", number.cex = 0.7, 
         tl.col="black", tl.srt=45, diag=FALSE, 
         col=colorRampPalette(c("#3498db", "white", "#e74c3c"))(200),
         mar=c(0,0,2,0))
dev.off()

print("Analyse terminée et image sauvegardée !")
