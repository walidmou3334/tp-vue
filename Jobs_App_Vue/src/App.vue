<template>
  <header class="site-header">
    <div class="container header-row">
      <RouterLink class="site-title" to="/">Jobs App</RouterLink>
      <nav aria-label="Navigation principale">
        <RouterLink :to="{ name: 'home' }">Offres</RouterLink>
        <RouterLink :to="{ name: 'add-job' }">Ajouter une offre</RouterLink>
      </nav>
    </div>
  </header>

  <main class="container main-content">
    <RouterView />
  </main>

  <footer class="site-footer">
    <div class="container">TP – Gestion des emplois | Vue.js et JSON Server</div>
  </footer>
</template>
