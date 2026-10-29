<template>
  <h1>Catalogue de livres</h1>
  <p class="loading" v-show="store.loading">Chargement du catalogue...</p>

  <!-- TODO 2 : branchez add-book sur addBook -->
  <AddBookForm @add-book="addBook" />

  <!-- TODO 2 : passez store.books en props, et branchez toggle-fav / delete-book -->
  <BookList
    :books="store.books"
    @toggle-fav="toggleFavori"
    @delete-book="deleteBook"
  />
</template>

<script>
import AddBookForm from '../components/AddBookForm.vue'
import BookList from '../components/BookList.vue'
import { store } from '../store/books.js'

export default {
  name: 'HomeView',
  components: { AddBookForm, BookList },
  data() {
    return { store }
  },
  methods: {
    // TODO 2 : génère un id, pousse le livre dans store.books
    addBook(bookData) {
      const nouvelId = store.books.reduce(
        (max, book) => Math.max(max, book.id),
        0
      ) + 1

      store.books.push({
        ...bookData,
        id: nouvelId
      })
    },
    toggleFavori(book) {
      book.isFav = !book.isFav
    },
    deleteBook(book) {
      store.books = store.books.filter(b => b.id !== book.id)
    }
  }
}
</script>
