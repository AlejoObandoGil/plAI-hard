<template>
  <div class="min-h-screen text-primary px-4 py-8">
    <div class="container mx-auto px-4 py-8">
      <h1
        class="mb-10 text-center text-4xl font-display font-bold tracking-wide uppercase text-primary"
      >
        Ejercicios
      </h1>

      <ExerciseSearch v-model="searchQuery" placeholder="Buscar ejercicio..." />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ExerciseCard
          v-for="exercise in filteredExercises"
          :key="exercise.id"
          :exercise="exercise"
        />
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import ExerciseSearch from '@/components/exercise/ExerciseSearch.vue'
import ExerciseCard from '@/components/exercise/ExerciseCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useExercisesStore } from '../stores/exercises'

const exercisesStore = useExercisesStore()
const searchQuery = ref('')

const filteredExercises = computed(() => {
  if (!searchQuery.value) return exercisesStore.exercises
  const q = searchQuery.value.toLowerCase()
  return exercisesStore.exercises.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.category?.toLowerCase().includes(q) ||
      e.force?.toLowerCase().includes(q) ||
      e.level?.toLowerCase().includes(q) ||
      e.equipment?.toLowerCase().includes(q),
  )
})

onMounted(() => {
  exercisesStore.fetchExercises()
})
</script>
