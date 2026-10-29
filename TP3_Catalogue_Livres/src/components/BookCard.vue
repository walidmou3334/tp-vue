<template>
  <article class="book-card">
    <span class="genre">{{ book.genre }}</span>
    <h3>{{ book.title }}</h3>
    <p class="author">{{ book.author }}</p>
    <p v-if="book.year !== null && book.year !== ''" class="year">Année : {{ book.year }}</p>

    <div v-if="book.keywords && book.keywords.length" class="book-keywords">
      <span v-for="mot in book.keywords" :key="mot" class="keyword">{{ mot }}</span>
    </div>

    <div class="book-footer">
      <!-- PARTIE 3 : aucune écriture book.isFav = ... dans l'enfant. -->
      <button
        type="button"
        class="btn btn-favorite"
        @click="$emit('toggle-favorite', book.id)"
      >
        {{ book.isFav ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
      </button>
      <span v-if="book.isFav" class="favorite-badge">Favori</span>

      <!-- PARTIE 4 : le parent fournit ce contenu. -->
      <slot name="actions"></slot>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    // PARTIE 2 : prop obligatoire et validée.
    book: {
      type: Object,
      required: true,
      validator(value) {
        return !!value && typeof value.title === 'string'
          && value.title.trim().length > 0;
      }
    }
  },
  emits: ['toggle-favorite']
};
</script>
