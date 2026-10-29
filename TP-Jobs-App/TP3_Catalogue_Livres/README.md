# TP 3 - Composants & cycle de vie (Vue.js)

Projet Vite + Vue.js 3 (Options API), dans le prolongement du TP 2 "Catalogue de livres".

## Démarrage

Prérequis : Node.js et npm.

```bash
npm install
npm run dev
```

Ouvrir l'adresse affichée dans le terminal (habituellement `http://localhost:5173/`).

**Important** : ne pas lancer `index.html` par double-clic ou Live Server. C'est un projet Vite.

## Structure

- `src/App.vue` : propriétaire du tableau `books`, gère les actions et le chargement simulé.
- `src/components/AddBookForm.vue` : état du formulaire, validation, mots-clés, émission `add-book`, focus avec `ref` et `mounted`.
- `src/components/BookList.vue` : prop `books` requise, recherche/filtrage, boucle sur les `BookCard`, slot nommé `actions` et transfert d'événements.
- `src/components/BookCard.vue` : prop `book` validée et événement `toggle-favorite` sans mutation directe.
- `src/data/books.json` : données d'exemple reprises du TP 2.
- `src/style.css` : design simple, sans emojis.

## Correspondance avec le sujet

1. Props et affichage : `BookList` reçoit une liste et crée des `BookCard`.
2. Validation de la prop `book` : `Object`, `required`, `validator` du titre.
3. Flux à sens unique : l'enfant émet `toggle-favorite`, `App.vue` change l'état.
4. Slot nommé `actions` : le bouton Supprimer de `BookList.vue` est injecté dans `BookCard.vue`.
5. `mounted()` : `App.vue` charge `initialBooks` après 600 ms, avec `v-show="loading"`.
6. Bonus : `ref="titreInput"` et focus au `mounted()` du formulaire.

Les fonctionnalités du TP 2 sont conservées (ajout, suppression, favoris, recherche, genre et mots-clés).

## Remarque

Le sujet mentionne un projet `starter/` fourni par l'enseignant, mais ce fichier n'était pas joint. Ce projet est une réalisation autonome basée sur le TP 2 précédent, et non une modification du starter original.
