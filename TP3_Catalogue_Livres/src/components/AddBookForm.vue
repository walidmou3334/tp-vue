<template>
  <section class="form-panel">
    <h2>Ajouter un livre</h2>

    <form @submit.prevent="ajouterLivre">
      <label>
        Titre <span class="required">*</span>
        <!-- BONUS : ref + .trim -->
        <input
          ref="titreInput"
          v-model.trim="newBook.title"
          type="text"
          placeholder="Titre du livre"
        />
      </label>

      <label>
        Auteur <span class="required">*</span>
        <!-- BONUS TP2 : .lazy synchronise lors de change -->
        <input
          v-model.lazy="newBook.author"
          type="text"
          placeholder="Nom de l'auteur"
        />
      </label>

      <label>
        Année
        <input v-model.number="newBook.year" type="number" min="0" placeholder="Année" />
      </label>

      <label>
        Genre
        <select v-model="newBook.genre">
          <option value="Roman">Roman</option>
          <option value="Science-fiction">Science-fiction</option>
          <option value="Fantastique">Fantastique</option>
          <option value="Développement">Développement</option>
          <option value="Autre">Autre</option>
        </select>
      </label>

      <label class="checkbox-label">
        <input v-model="newBook.isFav" type="checkbox" />
        Ajouter aux favoris
      </label>

      <label>
        Mot-clé
        <!-- Entrée ajoute un mot-clé sans envoyer le formulaire. -->
        <input
          v-model="nouveauMotCle"
          type="text"
          placeholder="Saisir puis appuyer sur Entrée"
          @keydown.enter.prevent
          @keyup.enter="ajouterMotCle"
        />
      </label>

      <div v-if="newBook.keywords.length" class="chips">
        <span v-for="mot in newBook.keywords" :key="mot" class="chip">
          {{ mot }}
          <button type="button" :aria-label="'Retirer ' + mot" @click="retirerMotCle(mot)">x</button>
        </span>
      </div>

      <button class="btn btn-primary" type="submit" :disabled="!formulaireValide">
        Ajouter le livre
      </button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'AddBookForm',
  emits: ['add-book'],

  data() {
    return {
      newBook: this.livreVide(),
      nouveauMotCle: ''
    };
  },

  computed: {
    formulaireValide() {
      return this.newBook.title.trim() !== '' && this.newBook.author.trim() !== '';
    }
  },

  methods: {
    livreVide() {
      return {
        title: '',
        author: '',
        year: null,
        genre: 'Roman',
        isFav: false,
        keywords: []
      };
    },
    ajouterMotCle() {
      const mot = this.nouveauMotCle.trim();
      if (mot && !this.newBook.keywords.some(
        k => k.toLowerCase() === mot.toLowerCase()
      )) {
        this.newBook.keywords.push(mot);
      }
      this.nouveauMotCle = '';
    },
    retirerMotCle(mot) {
      this.newBook.keywords = this.newBook.keywords.filter(k => k !== mot);
    },
    ajouterLivre() {
      if (!this.formulaireValide) return;

      // L'enfant n'ajoute PAS directement dans books : il émet l'événement.
      this.$emit('add-book', {
        ...this.newBook,
        keywords: [...this.newBook.keywords]
      });

      this.newBook = this.livreVide();
      this.nouveauMotCle = '';
      this.$nextTick(() => this.$refs.titreInput.focus());
    }
  },

  // BONUS : placer le curseur dans le champ titre.
  mounted() {
    this.$refs.titreInput.focus();
  }
};
</script>
