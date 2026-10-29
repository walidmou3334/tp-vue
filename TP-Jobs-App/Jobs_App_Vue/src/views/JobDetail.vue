<template>
  <div>
    <RouterLink class="back-link" :to="{ name: 'home' }">Retour aux offres</RouterLink>

    <p v-if="loading" class="message" role="status">Chargement de l'offre...</p>
    <p v-else-if="error" class="message message-error" role="alert">{{ error }}</p>

    <article v-else-if="job" class="card detail-card">
      <div class="job-meta">
        <span>{{ job.type || 'Autre' }}</span>
        <span>{{ job.location || 'Ville non précisée' }}</span>
      </div>
      <h1>{{ job.title }}</h1>
      <div class="detail-list">
        <p><strong>Salaire :</strong> {{ formatSalaire(job.salary) }} / mois</p>
        <p><strong>Expérience :</strong> {{ job.experience }} an(s)</p>
        <p><strong>Date de création :</strong> {{ formatDate(job.createdAt) }}</p>
      </div>
      <h2>Description</h2>
      <p class="full-description">{{ job.description }}</p>
      <div class="actions with-divider">
        <RouterLink class="button button-primary" :to="{ name: 'edit-job', params: { id: job.id } }">Modifier</RouterLink>
        <button class="button button-danger" :disabled="deleting" @click="supprimer">{{ deleting ? 'Suppression...' : 'Supprimer' }}</button>
      </div>
    </article>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getJob, deleteJob } from '../services/jobsApi.js'

const route = useRoute()
const router = useRouter()
const job = ref(null)
const loading = ref(true)
const error = ref('')
const deleting = ref(false)

function formatSalaire(value) {
  return `${Number(value).toLocaleString('fr-FR')} DH`
}
function formatDate(value) {
  if (!value) return 'Non précisée'
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('fr-FR')
}

async function charger() {
  loading.value = true
  error.value = ''
  job.value = null
  try {
    job.value = await getJob(route.params.id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function supprimer() {
  if (!job.value || deleting.value) return
  const ok = window.confirm(`Voulez-vous vraiment supprimer l'offre « ${job.value.title} » ?`)
  if (!ok) return
  deleting.value = true
  error.value = ''
  try {
    await deleteJob(job.value.id)
    await router.push({ name: 'home' })
  } catch (err) {
    error.value = err.message
  } finally {
    deleting.value = false
  }
}

onMounted(charger)
watch(() => route.params.id, charger)
</script>
