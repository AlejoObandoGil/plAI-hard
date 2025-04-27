<template>
  <div class="min-h-screen text-primary px-4 py-8">
    <div v-if="loading" class="text-center">
      <p>Cargando ejercicio...</p>
    </div>

    <div v-else-if="error" class="text-red-500">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="exercise" class="max-w-2xl mx-auto">
      <div
        class="card app-card overflow-hidden border border-accent-dark/60 rounded-xl shadow-soft bg-gradient-to-b from-accent-card/80 to-accent-dark/80 flex flex-col min-h-[420px]"
      >
        <ExerciseGif
          v-if="exercise.images && exercise.images.length > 0"
          :images="exercise.images"
          :alt="exercise.name"
          :intervalMs="1500"
        />
        <div class="p-6 flex flex-col flex-1">
          <h1 class="mb-4">{{ exercise.name }}</h1>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 class="text-sm font-semibold text-primary/60">Nivel</h2>
              <p class="text-lg">{{ exercise.level || 'N/A' }}</p>
            </div>
            <div>
              <h2 class="text-sm font-semibold text-primary/60">Fuerza</h2>
              <p class="text-lg">{{ exercise.force || 'N/A' }}</p>
            </div>
            <div>
              <h2 class="text-sm font-semibold text-primary/60">Equipo</h2>
              <p class="text-lg">{{ exercise.equipment || 'N/A' }}</p>
            </div>
            <div>
              <h2 class="text-sm font-semibold text-primary/60">Categoría</h2>
              <p class="text-lg">{{ exercise.category || 'N/A' }}</p>
            </div>
          </div>

          <div class="mb-4">
            <span class="font-semibold text-sm text-primary">Músculos principales:</span>
            <span class="text-sm text-secondary">
              <span v-for="pm in exercise.primaryMuscles" :key="pm.muscles?.name">
                {{ pm.muscles?.name }}<br />
              </span>
            </span>
          </div>
          <div
            v-if="exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0"
            class="mb-4"
          >
            <span class="font-semibold text-sm text-info">Músculos secundarios:</span>
            <span class="text-sm text-info/80">
              <span v-for="sm in exercise.secondaryMuscles" :key="sm.muscles?.name">
                {{ sm.muscles?.name }}<br />
              </span>
            </span>
          </div>

          <div v-if="exercise.instructions && exercise.instructions.length > 0" class="mb-4">
            <h2 class="font-semibold text-sm mb-1 text-accent">Instrucciones:</h2>
            <ol class="list-decimal ml-6 text-accent/80">
              <li v-for="step in exercise.instructions" :key="step.step_number">
                {{ step.instruction }}
              </li>
            </ol>
          </div>

          <button @click="addToRoutine" class="btn btn-secondary w-full mt-4">
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
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useExercisesStore } from '@/stores/exercises'
import ExerciseGif from '@/components/exercise/ExerciseGif.vue'

const route = useRoute()
const exercisesStore = useExercisesStore()

const loading = computed(() => exercisesStore.loading)
const error = computed(() => exercisesStore.error)
const exercise = computed(() => {
  return exercisesStore.exercises.find((e) => e.id === route.params.id)
})

const addToRoutine = () => {
  // Aquí puedes implementar la lógica para agregar el ejercicio a la rutina
  alert('Próximamente: agregar a rutina')
}

onMounted(() => {
  if (exercisesStore.exercises.length === 0) {
    exercisesStore.fetchExercises()
  }
})
</script>
