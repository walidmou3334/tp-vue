<!--
  TODO 5 (bonus) : réécrivez ce composant en Composition API avec <script setup>.
  Il doit être strictement équivalent à BookCard.vue :
    - une props "book" (objet requis, avec le même validator)
    - deux évènements émis : "toggle-fav" et "delete-book"
    - un computed "libelleFavori" qui vaut "Retirer des favoris" si le livre
      est déjà favori, sinon "Ajouter aux favoris" (utilisez-le sur le bouton)
  Indice : import { computed } from 'vue', puis defineProps() / defineEmits()
  (ce sont des macros disponibles sans import dans <script setup>).
-->
<template>
  <div class="book" :class="{ favori: book.isFav }">
    <h3>{{ book.title }}</h3>
    <p>{{ book.author }} -- {{ book.year }}</p>
    <span class="badge-favori" v-if="book.isFav">Favori</span>
    <div>
      <!-- TODO 5 : utilisez libelleFavori comme texte du bouton -->
      <button @click="$emit('toggle-fav', book)">Favori</button>
      <button @click="$emit('delete-book', book)">Supprimer</button>
    </div>
    <slot name="actions"></slot>
  </div>
</template>

<script setup>
// TODO 5 : props, emits et computed à déclarer ici
</script>
