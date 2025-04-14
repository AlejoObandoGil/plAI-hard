<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center">
      <p>Cargando ejercicio...</p>
    </div>

    <div v-else-if="error" class="text-red-500">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="selectedExercise" class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          :src="selectedExercise.gifUrl"
          :alt="selectedExercise.name"
          class="w-full h-64 object-cover"
        />
        <div class="p-6">
          <h1 class="text-3xl font-bold mb-4">{{ selectedExercise.name }}</h1>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 class="text-sm font-semibold text-gray-500">Parte del cuerpo</h2>
              <p class="text-lg">{{ selectedExercise.bodyPart }}</p>
            </div>
            <div>
              <h2 class="text-sm font-semibold text-gray-500">Objetivo</h2>
              <p class="text-lg">{{ selectedExercise.target }}</p>
            </div>
            <div>
              <h2 class="text-sm font-semibold text-gray-500">Equipo</h2>
              <p class="text-lg">{{ selectedExercise.equipment }}</p>
            </div>
          </div>

          <button
            @click="addToRoutine"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Agregar a mi rutina
          </button>
        </div>
      </div>

      <router-link to="/exercises" class="mt-6 inline-block text-blue-500 hover:text-blue-700">
        ← Volver a la lista de ejercicios
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useExerciseStore } from '../stores/exercise'
import { useRoutineStore } from '../stores/routine'

const route = useRoute()
const exerciseStore = useExerciseStore()
const routineStore = useRoutineStore()

const { selectedExercise, loading, error, getExerciseById } = exerciseStore

const addToRoutine = () => {
  if (selectedExercise) {
    // For now we add to Monday by default
    // Later we'll implement a day selector
    routineStore.addExerciseToDay('Lunes', selectedExercise)
  }
}

onMounted(() => {
  if (route.params.id) {
    getExerciseById(route.params.id as string)
  }
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      getExerciseById(newId as string)
    }
  },
)
</script>
