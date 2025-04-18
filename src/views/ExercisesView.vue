<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Ejercicios</h1>

    <div class="mb-8">
      <div class="flex flex-col md:flex-row gap-4 mb-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar ejercicio..."
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="exercise in filteredExercises"
          :key="exercise.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <ExerciseGif
            v-if="exercise.images && exercise.images.length > 0"
            :images="exercise.images"
            :alt="exercise.name"
            :intervalMs="1500"
          />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ exercise.name }}</h2>
            <div class="flex flex-wrap gap-2 mb-2">
              <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >Nivel: {{ exercise.level }}</span
              >
              <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                >Fuerza: {{ exercise.force }}</span
              >
              <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
                >Equipo: {{ exercise.equipment }}</span
              >
              <span
                v-if="exercise.mechanic"
                class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                >Mecánica: {{ exercise.mechanic }}</span
              >
              <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                >Categoría: {{ exercise.category }}</span
              >
            </div>
            <div class="mb-2">
              <span class="font-semibold text-sm">Músculos principales:</span>
              <span class="text-sm">
                <span v-for="pm in exercise.primaryMuscles" :key="pm.muscles?.name">
                  {{ pm.muscles?.name }}<br />
                </span>
              </span>
            </div>
            <div v-if="exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0" class="mb-2">
              <span class="font-semibold text-sm">Músculos secundarios:</span>
              <span class="text-sm">
                <span v-for="sm in exercise.secondaryMuscles" :key="sm.muscles?.name">
                  {{ sm.muscles?.name }}<br />
                </span>
              </span>
            </div>
            <router-link
              :to="{ name: 'exercise-details', params: { id: exercise.id } }"
              class="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Ver detalles
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="exercisesStore.loading" class="flex justify-center items-center h-64">
      <LoadingSpinner />
    </div>

    <div v-else-if="exercisesStore.error" class="text-red-500 text-center py-8">
      <p>{{ exercisesStore.error }}</p>
    </div>

    <div v-else-if="filteredExercises.length === 0" class="text-center py-8">
      <p class="text-gray-600">No se encontraron ejercicios que coincidan con tu búsqueda</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useExercisesStore } from '../stores/exercises'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ExerciseGif from '../components/ExerciseGif.vue'

const exercisesStore = useExercisesStore()

const searchQuery = ref('')

const filteredExercises = computed(() => {
  return exercisesStore.exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesSearch
  })
})

onMounted(() => {
  exercisesStore.fetchExercises()
})
</script>
