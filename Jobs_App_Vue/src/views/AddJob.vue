<template>
  <div class="form-page">
    <h1>Ajouter une offre</h1>
    <p class="muted">Remplissez les informations de l'emploi.</p>
    <p v-if="error" class="message message-error" role="alert">{{ error }}</p>
    <JobForm submit-label="Ajouter l'offre" :busy="busy" @submit="ajouter" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import JobForm from '../components/JobForm.vue'
import { createJob } from '../services/jobsApi.js'

const router = useRouter()
const busy = ref(false)
const error = ref('')

async function ajouter(payload) {
  if (busy.value) return
  busy.value = true
  error.value = ''
  try {
    const created = await createJob(payload)
    await router.push({ name: 'job-detail', params: { id: created.id } })
  } catch (err) {
    error.value = err.message
  } finally {
    busy.value = false
  }
}
</script>
