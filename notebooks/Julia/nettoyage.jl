using CSV, DataFrames, Plots, StatsPlots

# --- 1. COLLECTE ---
println("Chargement du fichier train.csv...")
train_path = joinpath(@__DIR__, "..", "..", "data", "raw", "train.csv")
df = CSV.read(train_path, DataFrame)

# --- 2. NETTOYAGE ---

# Transformation de la cible : "Presence" -> 1, "Absence" -> 0
# C'est obligatoire pour que Julia puisse faire des calculs
df[!, :"Heart Disease"] = [x == "Presence" ? 1 : 0 for x in df[!, :"Heart Disease"]]

# Renommer les colonnes pour enlever les espaces (évite les erreurs de code)
rename!(df, 
    "Chest pain type" => "chest_pain",
    "Heart Disease" => "target",
    "EKG results" => "ekg_results",
    "FBS over 120" => "fbs_over_120",
    "Max HR" => "max_hr",
    "Exercise angina" => "exercise_angina",
    "ST depression" => "st_depression",
    "Slope of ST" => "slope_st",
    "Number of vessels fluro" => "vessels_fluro"
)

# On vérifie s'il reste des valeurs manquantes
println("\nDiagnostic final des valeurs manquantes :")
println(describe(df, :nmissing))

# --- 3. VISUALISATION ---
println("\nGénération du graphique...")

# On compare l'âge des personnes malades (target=1) vs saines (target=0)
p = @df df boxplot(:target, :Age, 
    title="Répartition de l'Âge selon la Maladie",
    xlabel="Maladie (0 = Absence, 1 = Presence)",
    ylabel="Âge",
    legend=false,
    color=:indianred)

display(p) # Affiche le graphique dans Cursor
savefig("graphique_age.png") # Sauvegarde l'image dans ton projet

# --- 4. STRUCTURATION ---
# On crée le nouveau fichier CSV propre et structuré
CSV.write("heart_disease_cleaned.csv", df)

println("\nTERMINÉ : Le fichier 'heart_disease_cleaned.csv' est prêt !")