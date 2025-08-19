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
            
            <p class="text-gray-400 text-center py-8">
              Añade ejercicios a esta rutina para comenzar tu entrenamiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRoutinesStore } from '@/stores/routine'
import type { Routine } from '@/types/routines'

const route = useRoute()
const routinesStore = useRoutinesStore()

const routine = ref<Routine | null>(null)
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
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al cargar la rutina'
    console.error('Error fetching routine:', err)
  } finally {
    loading.value = false
  }
}

function addExercise() {
  // Implementar lógica para agregar ejercicio
  console.log('Agregar ejercicio a la rutina:', routine.value?.id)
}

onMounted(() => {
  fetchRoutine()
})
</script>