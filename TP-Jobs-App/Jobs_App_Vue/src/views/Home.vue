<template>
  <section class="heading-row">
    <div>
      <h1>Offres d'emploi</h1>
      <p class="muted">Consultez les offres disponibles et recherchez un poste.</p>
    </div>
    <RouterLink class="button button-primary" :to="{ name: 'add-job' }">Ajouter une offre</RouterLink>
  </section>

  <FilterNav v-model:search="search" v-model:type="type" :types="typesDisponibles" />

  <p v-if="loading" class="message" role="status">Chargement des offres...</p>
  <div v-else-if="error" class="message message-error" role="alert">
    <p>{{ error }}</p>
    <button class="button button-secondary" @click="chargerOffres">Réessayer</button>
  </div>
  <template v-else>
    <p class="result-count">{{ offresFiltrees.length }} offre(s) trouvée(s)</p>
    <div v-if="offresFiltrees.length" class="job-grid">
      <article v-for="job in offresFiltrees" :key="job.id" class="card job-card">
        <div class="job-meta">
          <span>{{ job.type || 'Autre' }}</span>
          <span>{{ job.location || 'Ville non précisée' }}</span>
        </div>
        <h2>{{ job.title }}</h2>
        <p class="description-preview">{{ job.description }}</p>
        <div class="job-bottom">
          <p><strong>{{ formatSalaire(job.salary) }}</strong> / mois</p>
          <RouterLink class="button button-secondary" :to="{ name: 'job-detail', params: { id: job.id } }">Voir détails</RouterLink>
        </div>
      </article>
    </div>
    <p v-else class="message">Aucune offre ne correspond à votre recherche.</p>
  </template>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import FilterNav from '../components/FilterNav.vue'
import { getJobs } from '../services/jobsApi.js'

const jobs = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')
const type = ref('')

const typesDisponibles = computed(() => [...new Set(jobs.value.map(job => job.type).filter(Boolean))].sort())
const offresFiltrees = computed(() => {
  const text = search.value.trim().toLocaleLowerCase('fr')
  return jobs.value.filter(job => {
    const matchesText = [job.title, job.description, job.location]
      .some(value => String(value || '').toLocaleLowerCase('fr').includes(text))
    return matchesText && (!type.value || job.type === type.value)
  })
})

function formatSalaire(value) {
  return `${Number(value).toLocaleString('fr-FR')} DH`
}

async function chargerOffres() {
  loading.value = true
  error.value = ''
  try {
    const result = await getJobs()
    if (!Array.isArray(result)) throw new Error('Les données reçues ne sont pas une liste de jobs.')
    jobs.value = result
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(chargerOffres)
</script>
