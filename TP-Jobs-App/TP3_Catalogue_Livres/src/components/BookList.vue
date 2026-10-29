<template>
  <div>
    <!-- Filtres conservés du TP 2, sans modifier la prop books. -->
    <div class="filters">
      <label>
        Rechercher
        <input v-model="recherche" type="search" placeholder="Titre ou auteur" />
      </label>
      <label>
        Genre
        <select v-model="filtreGenre">
          <option value="tous">Tous les genres</option>
          <option value="Roman">Roman</option>
          <option value="Science-fiction">Science-fiction</option>
          <option value="Fantastique">Fantastique</option>
          <option value="Développement">Développement</option>
          <option value="Autre">Autre</option>
        </select>
      </label>
    </div>

    <div v-if="booksAffiches.length" class="books-grid">
      <!-- PARTIE 1 : boucle et props vers BookCard. -->
      <BookCard
        v-for="book in booksAffiches"
        :key="book.id"
        :book="book"
        @toggle-favorite="$emit('toggle-favorite', $event)"
      >
        <!-- PARTIE 4 : contenu fourni au slot nommé actions. -->
        <template #actions>
          <button type="button" class="btn btn-delete" @click.stop="$emit('remove-book', book.id)">
            Supprimer
          </button>
        </template>
      </BookCard>
    </div>
    <p v-else class="empty-state">Aucun livre trouvé.</p>
  </div>
</template>

<script>
import BookCard from './BookCard.vue';

export default {
  name: 'BookList',
  components: { BookCard },
  props: {
    books: {
      type: Array,
      required: true
    }
  },
  emits: ['toggle-favorite', 'remove-book'],

  data() {
    return { recherche: '', filtreGenre: 'tous' };
  },

  computed: {
    booksAffiches() {
      const texte = this.recherche.trim().toLowerCase();
      return this.books.filter(book => {
        const correspondRecherche = book.title.toLowerCase().includes(texte)
          || book.author.toLowerCase().includes(texte);
        const correspondGenre = this.filtreGenre === 'tous'
          || book.genre === this.filtreGenre;
        return correspondRecherche && correspondGenre;
      });
    }
  }
};
</script>
