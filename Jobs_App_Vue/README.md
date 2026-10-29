# TP – Jobs App (Vue.js + JSON Server)

Application de gestion d'offres d'emploi réalisée à partir de l'énoncé du TP de Pr. Ahmed Bentajer.

## Pré-requis
- Node.js 20.19+ ou 22.12+ et npm
- Deux terminaux (pour le serveur API et le serveur Vue)

## Installation

Ouvrir le dossier `Jobs_App_Vue` dans VS Code, puis exécuter :

```bash
npm install
```

## Démarrer le projet

**Terminal 1 (API JSON Server) :**

```bash
npm run api
```

Ouvrir `http://localhost:3000/jobs` pour vérifier le JSON.

**Terminal 2 (Vue/Vite) :**

```bash
npm run dev
```

Ouvrir l'adresse indiquée par Vite (en général `http://localhost:5173`).

Ne pas lancer le projet par Live Server : il utilise Vite et des composants `.vue`.

## Fonctionnalités
- Liste des offres : `/`
- Recherche par titre, description ou ville et filtre par type de contrat
- Ajout avec formulaire : `/add`
- Détails d'une offre : `/jobs/:id`
- Modification avec formulaire prérempli : `/jobs/:id/edit`
- Suppression avec confirmation
- Requêtes REST via `fetch` (GET, POST, PATCH, DELETE)
- Page 404 pour les routes inexistantes

## Structure

```text
Jobs_App_Vue/
  db.json
  package.json
  src/
    App.vue
    main.js
    style.css
    router/index.js
    services/jobsApi.js
    components/FilterNav.vue
    components/JobForm.vue
    views/Home.vue
    views/JobDetail.vue
    views/AddJob.vue
    views/EditJob.vue
    views/NotFound.vue
```

## Données
Le fichier JSON initial fourni avec le sujet contenait des tâches de type Todo, pas des emplois.
Ce projet contient un `db.json` d'exemple avec des offres fictives correspondant aux champs demandés.
JSON Server enregistre les créations, modifications et suppressions dans `db.json`.

## Correspondance avec l'énoncé
- `Home.vue` : liste des emplois et bouton d'ajout
- `FilterNav.vue` : filtres
- `JobDetail.vue` : détails, modification et suppression
- `AddJob.vue` : création d'un emploi
- `EditJob.vue` : édition avec préremplissage
- `JobForm.vue` : formulaire réutilisé pour ajout et édition (ajout technique)
- `jobsApi.js` : appels à JSON Server (ajout technique)
- `NotFound.vue` : page d'erreur 404 (ajout technique)

L'architecture proposée par le sujet est adaptable. Ici, la page détails est séparée
et la page édition est accessible par `/jobs/:id/edit`.

Le sujet évoque le rôle d'administrateur sans demander d'authentification ; ce TP ne contient donc ni compte ni connexion. Les actions de gestion sont accessibles dans la démonstration locale.

## Aide
Si la page affiche « Connexion impossible à JSON Server », vérifier que `npm run api` est lancé,
puis ouvrir `http://localhost:3000/jobs` dans le navigateur.
