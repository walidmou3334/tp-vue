<template>
  <div class="form-page">
    <h1>Modifier une offre</h1>
    <p class="muted">Modifiez les informations, puis enregistrez.</p>
    <p v-if="loading" class="message" role="status">Chargement de l'offre...</p>
    <p v-else-if="error" class="message message-error" role="alert">{{ error }}</p>
    <JobForm v-if="!loading && job" :job="job" :busy="busy" submit-label="Enregistrer les modifications" @submit="modifier" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import JobForm from '../components/JobForm.vue'
import { getJob, updateJob } from '../services/jobsApi.js'

const route = useRoute()
const router = useRouter()
const job = ref(null)
const loading = ref(true)
const busy = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    job.value = await getJob(route.params.id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

async function modifier(payload) {
  if (busy.value) return
  busy.value = true
  error.value = ''
  try {
    await updateJob(route.params.id, payload)
    await router.push({ name: 'job-detail', params: { id: route.params.id } })
  } catch (err) {
    error.value = err.message
  } finally {
    busy.value = false
  }
}
</script>
