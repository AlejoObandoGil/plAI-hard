<template>
  <form class="flex flex-col gap-4" @submit.prevent>
    <div class="flex gap-2">
      <button type="button" class="btn btn-ghost w-full" @click="resetFilters">
        Limpiar filtros
      </button>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Nivel</label>
      <select v-model="filters.level" class="input-select">
        <option value="">Selecciona nivel</option>
        <option v-for="level in filterOptions.levels" :key="level" :value="level">
          {{ level }}
        </option>
      </select>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Fuerza</label>
      <select v-model="filters.force" class="input-select">
        <option value="">Selecciona tipo de fuerza</option>
        <option v-for="force in filterOptions.forces" :key="force" :value="force">
          {{ force }}
        </option>
      </select>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Mecánica</label>
      <select v-model="filters.mechanic" class="input-select">
        <option value="">Selecciona mecánica</option>
        <option v-for="mechanic in filterOptions.mechanics" :key="mechanic" :value="mechanic">
          {{ mechanic }}
        </option>
      </select>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Equipamiento</label>
      <select v-model="filters.equipment" class="input-select">
        <option value="">Selecciona equipo</option>
        <option v-for="eq in filterOptions.equipment" :key="eq" :value="eq">
          {{ eq }}
        </option>
      </select>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Categoría</label>
      <select v-model="filters.category" class="input-select">
        <option value="">Selecciona categoría</option>
        <option v-for="category in filterOptions.categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Músculos principales</label>
      <div class="flex flex-wrap gap-2">
        <label v-for="muscle in filterOptions.muscles" :key="muscle" class="flex items-center gap-1 text-primary">
          <input
            type="checkbox"
            :value="muscle"
            v-model="filters.primaryMuscles"
            class="input-checkbox"
          />
          <span>{{ muscle }}</span>
        </label>
      </div>
    </div>
    <div>
      <label class="block mb-1 font-semibold text-primary">Músculos secundarios</label>
      <div class="flex flex-wrap gap-2">
        <label
          v-for="muscle in muscles"
          :key="muscle + '-sec'"
          class="flex items-center gap-1 text-primary"
        >
          <input
            type="checkbox"
            :value="muscle"
            v-model="filters.secondaryMuscles"
            class="input-checkbox"
          />
          <span>{{ muscle }}</span>
        </label>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useExercisesStore } from '../../stores/exercises'
import { onMounted } from 'vue'

const exercisesStore = useExercisesStore()
const { filters, filterOptions } = exercisesStore

onMounted(async () => {
  await exercisesStore.loadFilterOptions()
})

function resetFilters() {
  filters.level = null
  filters.force = null
  filters.mechanic = null
  filters.equipment = null
  filters.category = null
  filters.primaryMuscles = []
  filters.secondaryMuscles = []
  // Emitir evento para que el padre cierre el drawer/modal si aplica
  emit('reset')
}

const emit = defineEmits(['reset'])
</script>
