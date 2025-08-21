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
          class="p-2 rounded-full bg-secondary hover:bg-secondary-dark text-white shadow transition"
        >
          <PencilIcon class="w-5 h-5" />
        </button>
        <button
          @click="$emit('remove', exercise.id)"
          class="p-2 rounded-full bg-error hover:bg-error-dark text-white shadow transition"
        >
          <TrashIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RoutineExercise } from '@/types/exerciseRoutine'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps<{
  exercise: RoutineExercise
  index: number
}>()

defineEmits<{
  (e: 'edit', exercise: RoutineExercise): void
  (e: 'remove', id: string): void
}>()
</script>
