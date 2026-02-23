# Utiliser une image Python légère
FROM python:3.10-slim

# Définir le dossier de travail
WORKDIR /app

# Copier les dépendances et installer
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le code du backend (y compris le dossier models/)
COPY . .

# Lancer l'application sur le port 7860 (Port standard Hugging Face Spaces)
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]