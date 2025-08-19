<template>
  <div class="min-h-[60vh] py-8 px-4">
    <!-- Botón de volver -->
    <button
      @click="$router.go(-1)"
      class="flex items-center gap-2 mb-6 text-primary hover:text-secondary transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Volver
    </button>

    <!-- Cargando -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
      <button
        @click="fetchRoutine"
        class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Reintentar
      </button>
    </div>

    <!-- Detalles de la rutina -->
    <div v-else-if="routine" class="max-w-3xl mx-auto">
      <div class="bg-accent-card border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <!-- Encabezado -->
        <div class="bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
          <h1 class="text-3xl font-bold text-primary mb-2">{{ routine.name }}</h1>

          <div class="flex flex-wrap gap-3 mt-4">
            <span
              v-if="routine.objective"
              class="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold"
            >
              {{ routine.objective }}
            </span>
            <span
              v-if="routine.day_of_the_week"
              class="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-sm font-semibold"
            >
              {{ routine.day_of_the_week }}
            </span>
          </div>
        </div>

        <!-- Contenido -->
        <div class="p-6">
          <!-- Descripción -->
          <div v-if="routine.description" class="mb-8">
            <h2 class="text-xl font-bold mb-3 text-primary">Descripción</h2>
            <p class="text-gray-300">{{ routine.description }}</p>
          </div>

          <!-- Sección de ejercicios (próximamente) -->
          <div class="bg-accent-dark/30 rounded-xl p-6 border border-white/5">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-primary">Ejercicios</h2>
              <button
                @click="addExercise"
                class="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Agregar ejercicio
              </button>
            </div>

            <!-- Lista de ejercicios -->
            <div v-if="exercises.length > 0" class="space-y-4">
              <div
                v-for="(exercise, index) in exercises"
                :key="exercise.id"
                class="bg-accent-dark/50 rounded-lg p-4 border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-semibold text-lg text-white">
                      {{ index + 1 }}. {{ exercise.exercises?.name || 'Ejercicio sin nombre' }}
                    </h3>
                    <div class="flex gap-4 mt-2 text-sm text-gray-300">
                      <span v-if="exercise.sets">{{ exercise.sets }} series</span>
                      <span v-if="exercise.reps">{{ exercise.reps }} repeticiones</span>
                      <span v-if="exercise.weight">{{ exercise.weight }} kg</span>
                    </div>
                    <p v-if="exercise.notes" class="text-sm text-gray-400 mt-2">
                      {{ exercise.notes }}
                    </p>
                  </div>
                  <div class="flex gap-2">
                    <button
                      @click="editExercise(exercise)"
                      class="p-1.5 text-gray-400 hover:text-primary transition-colors"
                      title="Editar ejercicio"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="removeExercise(exercise.id)"
                      class="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      title="Eliminar ejercicio"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <p class="text-gray-400">
                Añade ejercicios a esta rutina para comenzar tu entrenamiento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRoutinesStore } from '@/stores/routine'
import { useExerciseRoutineStore } from '@/stores/exerciseRoutine'
import type { Routine } from '@/types/routines'
import type { RoutineExercise } from '@/types/exerciseRoutine'

const route = useRoute()
const router = useRouter()
const routinesStore = useRoutinesStore()
const exerciseRoutineStore = useExerciseRoutineStore()

const routine = ref<Routine | null>(null)
const exercises = ref<RoutineExercise[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchRoutine() {
  try {
    loading.value = true
    error.value = null
    const routineId = route.params.id as string

    if (!routineId) {
      throw new Error('ID de rutina no proporcionado')
    }

    const data = await routinesStore.getRoutineById(routineId)
    if (!data) {
      throw new Error('Rutina no encontrada')
    }

    routine.value = data

    // Cargar los ejercicios de la rutina
    if (data.id) {
      const routineExercises = await exerciseRoutineStore.getRoutineExercises(data.id)
      exercises.value = routineExercises || []
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al cargar la rutina'
    console.error('Error fetching routine:', err)
  } finally {
    loading.value = false
  }
}

function addExercise() {
  if (!routine.value?.id) return

  router.push({
    name: 'exercises',
    query: { routineId: routine.value.id },
  })
}

function editExercise(exercise: RoutineExercise) {
  // Aquí puedes implementar la lógica para editar un ejercicio
  console.log('Editar ejercicio:', exercise)
}

async function removeExercise(exerciseId: string) {
  if (!confirm('¿Estás seguro de que quieres eliminar este ejercicio de la rutina?')) return

  try {
    await exerciseRoutineStore.removeExerciseFromRoutine(exerciseId)
    // Actualizar la lista de ejercicios después de eliminar
    if (routine.value?.id) {
      const routineExercises = await exerciseRoutineStore.getRoutineExercises(routine.value.id)
      exercises.value = routineExercises || []
    }
  } catch (err) {
    console.error('Error al eliminar el ejercicio:', err)
    alert('No se pudo eliminar el ejercicio. Por favor, inténtalo de nuevo.')
  }
}

onMounted(() => {
  fetchRoutine()
})
</script>
