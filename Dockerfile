# Étape 1 : Construire l'application React/Frontend
# Utilise une image Node.js pour compiler l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances et les installer
COPY package*.json ./

RUN npm install

# Copier le reste du code source de l'application
COPY . .

# Construire l'application pour la production
# La sortie sera dans le dossier 'dist'
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
# Utilise une image Nginx légère pour servir les fichiers statiques
FROM nginx:alpine

# Copier la configuration Nginx
COPY ./docker/nginx/frontend.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers de construction depuis l'étape 1,
# en utilisant le bon nom de dossier (dist)
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port par défaut de Nginx
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
