<template>
  <div class="card empty-page">
    <h1>Page introuvable</h1>
    <p>Cette adresse n'existe pas.</p>
    <RouterLink class="button button-primary" :to="{ name: 'home' }">Retour à l'accueil</RouterLink>
  </div>
</template>
