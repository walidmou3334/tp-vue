<template>
  <div class="page">
    <header class="page-header">
      <h1>Catalogue de livres</h1>
      <p>TP 3 - Composants et cycle de vie</p>
    </header>

    <!-- PARTIE 5 : v-show garde le message dans le DOM. -->
    <p v-show="loading" class="loading">Chargement des livres...</p>

    <div v-if="!loading" class="layout">
      <!-- Le formulaire transmet le nouveau livre au parent. -->
      <AddBookForm @add-book="ajouterLivre" />

      <section class="catalogue">
        <div class="catalogue-top">
          <h2>Liste des livres</h2>
          <p>{{ books.length }} livre(s) - {{ nombreFavoris }} favori(s)</p>
        </div>

        <!-- PARTIE 1 : exactement la prop books du sujet. -->
        <!-- PARTIE 3 : les événements remontent jusqu'au parent. -->
        <BookList
          :books="books"
          @toggle-favorite="toggleFavori"
          @remove-book="supprimerLivre"
        />
      </section>
    </div>
  </div>
</template>

<script>
import initialBooks from './data/books.json';
import AddBookForm from './components/AddBookForm.vue';
import BookList from './components/BookList.vue';

export default {
  name: 'App',
  components: { AddBookForm, BookList },

  data() {
    return {
      // App.vue est le seul propriétaire du tableau books.
      books: [],
      loading: true,
      chargementTimer: null
    };
  },

  computed: {
    nombreFavoris() {
      return this.books.filter(book => book.isFav).length;
    }
  },

  methods: {
    ajouterLivre(nouveauLivre) {
      const nouvelId = this.books.reduce(
        (max, book) => Math.max(max, Number(book.id) || 0), 0
      ) + 1;

      this.books.push({
        ...nouveauLivre,
        id: nouvelId,
        keywords: [...nouveauLivre.keywords]
      });
    },
    supprimerLivre(id) {
      this.books = this.books.filter(book => book.id !== id);
    },
    toggleFavori(id) {
      const book = this.books.find(item => item.id === id);
      if (book) {
        book.isFav = !book.isFav;
      }
    }
  },

  // PARTIE 5 : chargement simulé (600 ms) à la création du composant.
  mounted() {
    this.chargementTimer = setTimeout(() => {
      this.books = initialBooks.map(book => ({
        ...book,
        keywords: Array.isArray(book.keywords) ? [...book.keywords] : []
      }));
      this.loading = false;
    }, 600);
  },

  beforeUnmount() {
    clearTimeout(this.chargementTimer);
  }
};
</script>
