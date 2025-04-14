<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Ejercicios</h1>

    <div v-if="loading" class="text-center">
      <p>Cargando ejercicios...</p>
    </div>

    <div v-else-if="error" class="text-red-500">
      <p>{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="exercise in exercises"
        :key="exercise.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img :src="exercise.gifUrl" :alt="exercise.name" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ exercise.name }}</h2>
          <p class="text-gray-600 mb-2">Parte del cuerpo: {{ exercise.bodyPart }}</p>
          <p class="text-gray-600 mb-2">Objetivo: {{ exercise.target }}</p>
          <p class="text-gray-600 mb-4">Equipo: {{ exercise.equipment }}</p>
          <router-link
            :to="{ name: 'exercise-details', params: { id: exercise.id } }"
            class="text-blue-500 hover:text-blue-700"
          >
            Ver detalles
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useExerciseStore } from '../stores/exercise'

const exerciseStore = useExerciseStore()
const { exercises, loading, error, fetchExercises } = exerciseStore

onMounted(() => {
  fetchExercises()
})
</script>
