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
          v-for="exercise in exercisesStore.exercises"
          :key="exercise.id"
          :exercise="exercise"
        />
      </div>

      <div ref="loadMoreTrigger" class="h-10"></div>

      <div v-if="exercisesStore.loading" class="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>

      <div v-else-if="exercisesStore.error" class="text-red-500 text-center py-8">
        <p>{{ exercisesStore.error }}</p>
      </div>

      <div v-else-if="exercisesStore.exercises.length === 0" class="text-center py-8">
        <p class="text-gray-600">No se encontraron ejercicios que coincidan con tu búsqueda</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue'
import ExerciseSearch from '@/components/exercise/ExerciseSearch.vue'
import ExerciseCard from '@/components/exercise/ExerciseCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useExercisesStore } from '../stores/exercises'

const exercisesStore = useExercisesStore()
const searchQuery = ref('')
const loadMoreTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let debounceTimeout: ReturnType<typeof setTimeout> | null = null

async function loadMore() {
  if (!exercisesStore.loading && exercisesStore.hasMore) {
    await exercisesStore.fetchExercises(false, searchQuery.value)
  }
}

onMounted(() => {
  exercisesStore.fetchExercises(true, searchQuery.value)

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  }, { threshold: 1 })

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})

onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value)
  }
})

watch(searchQuery, (newVal) => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    exercisesStore.fetchExercises(true, newVal)
  }, 400)
})
</script>
