<template>
  <form class="card form" @submit.prevent="envoyer">
    <div class="field">
      <label for="title">Titre du poste <span class="required">*</span></label>
      <input id="title" v-model.trim="form.title" type="text" required maxlength="120" placeholder="Ex. Développeur Vue.js" />
    </div>

    <div class="field">
      <label for="description">Description <span class="required">*</span></label>
      <textarea id="description" v-model.trim="form.description" required rows="5" placeholder="Décrivez les missions du poste"></textarea>
    </div>

    <div class="form-grid">
      <div class="field">
        <label for="salary">Salaire (DH / mois) <span class="required">*</span></label>
        <input id="salary" v-model.number="form.salary" type="number" min="0" step="1" required />
      </div>
      <div class="field">
        <label for="experience">Expérience (années) <span class="required">*</span></label>
        <input id="experience" v-model.number="form.experience" type="number" min="0" step="1" required />
      </div>
      <div class="field">
        <label for="createdAt">Date de création <span class="required">*</span></label>
        <input id="createdAt" v-model="form.createdAt" type="date" required />
      </div>
      <div class="field">
        <label for="type">Type de contrat</label>
        <select id="type" v-model="form.type">
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Stage">Stage</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label for="location">Ville</label>
      <input id="location" v-model.trim="form.location" type="text" maxlength="100" placeholder="Ex. Safi" />
    </div>

    <p v-if="validationError" class="message message-error" role="alert">{{ validationError }}</p>
    <div class="actions">
      <button class="button button-primary" type="submit" :disabled="busy">{{ busy ? 'Enregistrement...' : submitLabel }}</button>
      <RouterLink class="button button-secondary" :to="{ name: 'home' }">Annuler</RouterLink>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  job: { type: Object, default: null },
  busy: { type: Boolean, default: false },
  submitLabel: { type: String, default: 'Enregistrer' }
})
const emit = defineEmits(['submit'])
const validationError = ref('')

function valeursInitiales() {
  return {
    title: '',
    description: '',
    salary: 0,
    experience: 0,
    createdAt: new Date().toISOString().slice(0, 10),
    type: 'CDI',
    location: ''
  }
}

const form = reactive(valeursInitiales())

watch(() => props.job, (job) => {
  Object.assign(form, valeursInitiales(), job || {})
  validationError.value = ''
}, { immediate: true })

function envoyer() {
  validationError.value = ''
  if (!form.title.trim() || !form.description.trim()) {
    validationError.value = 'Le titre et la description sont obligatoires.'
    return
  }
  if (!Number.isFinite(Number(form.salary)) || Number(form.salary) < 0 ||
      !Number.isFinite(Number(form.experience)) || Number(form.experience) < 0 ||
      !Number.isInteger(Number(form.experience))) {
    validationError.value = 'Vérifiez le salaire et le nombre d’années d’expérience.'
    return
  }
  if (!form.createdAt) {
    validationError.value = 'La date de création est obligatoire.'
    return
  }

  // Copie sans id : JSON Server génère l'id lors d'un ajout.
  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim(),
    salary: Number(form.salary),
    experience: Number(form.experience),
    createdAt: form.createdAt,
    type: form.type,
    location: form.location.trim()
  })
}
</script>
