<template>
  <div class="min-h-screen text-primary px-4 py-8">
    <div class="container mx-auto px-4 py-4 flex flex-col lg:flex-row gap-5">
      <!-- Sidebar filtros desktop / Drawer mobile -->
      <aside
        class="hidden lg:block w-full max-w-xs sticky top-8 self-start z-10 max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar"
      >
        <ExerciseFilters ref="filterDrawer" />
      </aside>

      <div class="flex-1">
        <div class="flex flex-col sm:flex-row sm:items-center mb-2">
          <ExerciseSearch
            v-model="searchQuery"
            placeholder="Buscar ejercicio..."
            class="flex-1 min-w-0"
          />

          <button class="lg:hidden btn btn-secondary" @click="openFilters">
            <span class="material-icons align-middle">Filtrar ejercicios</span>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ExerciseCard
            v-for="exercise in exercisesStore.exercises"
            :key="exercise.id"
            :exercise="exercise"
          />
          <div ref="loadMoreTrigger" class="h-10 col-span-full"></div>
        </div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useExercisesStore, filters } from '../stores/exercises'
import ExerciseFilters from '../components/exercise/ExerciseFilters.vue'
import ExerciseCard from '../components/exercise/ExerciseCard.vue'
import ExerciseSearch from '../components/exercise/ExerciseSearch.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const exercisesStore = useExercisesStore()
const searchQuery = ref('')
const filterDrawer = ref()
const loadMoreTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

async function loadMore() {
  if (!exercisesStore.loading && exercisesStore.hasMore) {
    await exercisesStore.fetchExercises(false)
  }
}

function openFilters() {
  filterDrawer.value.openMobile()
}

onMounted(() => {
  exercisesStore.fetchExercises(true)
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    { threshold: 1 },
  )
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})

onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value)
  }
})

watch(
  () => [
    searchQuery.value,
    filters.level,
    filters.force,
    filters.mechanic,
    filters.equipment,
    filters.category,
    filters.primaryMuscles.slice(),
    filters.secondaryMuscles.slice(),
  ],
  () => {
    exercisesStore.fetchExercises(true, searchQuery.value)
    // Re-observar el trigger tras cada filtro/búsqueda
    if (observer && loadMoreTrigger.value) {
      observer.unobserve(loadMoreTrigger.value)
      observer.observe(loadMoreTrigger.value)
    }
  },
)
</script>
