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
        <select
          v-model="selectedBodyPart"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las partes del cuerpo</option>
          <option v-for="bodyPart in bodyParts" :key="bodyPart" :value="bodyPart">
            {{ bodyPart }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="exercise in filteredExercises"
          :key="exercise.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <img :src="exercise.gifUrl" :alt="exercise.name" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ exercise.name }}</h2>
            <div class="flex flex-col gap-2 text-gray-600">
              <div class="flex items-center gap-2">
                <span class="text-sm">Parte del cuerpo:</span>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {{ exercise.bodyPart }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm">Objetivo:</span>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {{ exercise.target }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm">Equipo:</span>
                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  {{ exercise.equipment }}
                </span>
              </div>
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

    <div v-if="exerciseStore.loading" class="flex justify-center items-center h-64">
      <LoadingSpinner />
    </div>

    <div v-else-if="exerciseStore.error" class="text-red-500 text-center py-8">
      <p>{{ exerciseStore.error }}</p>
    </div>

    <div v-else-if="filteredExercises.length === 0" class="text-center py-8">
      <p class="text-gray-600">No se encontraron ejercicios que coincidan con tu búsqueda</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useExerciseStore } from '../stores/exercise'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const exerciseStore = useExerciseStore()

const searchQuery = ref('')
const selectedBodyPart = ref('')

const bodyParts = computed(() => {
  if (!exerciseStore.exercises.length) return []
  return [...new Set(exerciseStore.exercises.map((e) => e.bodyPart))]
})

const filteredExercises = computed(() => {
  console.log('Filtered exercises:', exerciseStore.exercises)
  return exerciseStore.exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesBodyPart = !selectedBodyPart.value || exercise.bodyPart === selectedBodyPart.value
    return matchesSearch && matchesBodyPart
  })
})

onMounted(() => {
  exerciseStore.fetchExercises()
})
</script>
