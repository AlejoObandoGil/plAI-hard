<template>
  <div
    class="bg-accent-dark/50 rounded-lg p-4 border border-white/5 hover:border-primary/30 transition-colors"
  >
    <div class="flex items-start justify-between">
      <div>
        <h3 class="font-semibold text-lg text-white">
          {{ index + 1 }}.
          {{ exercise.exercise?.nameSpanish || exercise.exercise?.name || 'Ejercicio sin nombre' }}
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
          @click="$emit('edit', exercise)"
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
          @click="$emit('remove', exercise.id)"
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
</template>

<script setup lang="ts">
import type { RoutineExercise } from '@/types/exerciseRoutine'

defineProps<{
  exercise: RoutineExercise
  index: number
}>()

defineEmits<{
  (e: 'edit', exercise: RoutineExercise): void
  (e: 'remove', id: string): void
}>()
</script>
