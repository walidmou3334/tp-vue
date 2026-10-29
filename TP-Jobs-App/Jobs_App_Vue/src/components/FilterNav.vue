<template>
  <div class="filters">
    <div class="field">
      <label for="recherche">Rechercher une offre</label>
      <input
        id="recherche"
        type="search"
        :value="search"
        placeholder="Titre, description ou ville"
        @input="$emit('update:search', $event.target.value)"
      />
    </div>

    <div class="field">
      <label for="type">Type de contrat</label>
      <select id="type" :value="type" @change="$emit('update:type', $event.target.value)">
        <option value="">Tous les types</option>
        <option v-for="item in types" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  search: { type: String, default: '' },
  type: { type: String, default: '' },
  types: { type: Array, required: true }
})

defineEmits(['update:search', 'update:type'])
</script>
