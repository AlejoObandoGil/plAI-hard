<template>
  <div
    class="card hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-accent-dark/60 flex flex-col h-full min-h-[540px]"
  >
    <ExerciseGif
      v-if="exercise.images && exercise.images.length > 0"
      :images="exercise.images"
      :alt="exercise.name"
      :intervalMs="1500"
      class="w-full rounded-xl"
    />
    <div class="p-2 flex flex-col flex-1">
      <h2 class="text-2xl font-bold mb-2 flex items-center gap-2 text-primary">
        {{ exercise.name }}
      </h2>
      <div v-if="exercise.primaryMuscles && exercise.primaryMuscles.length" class="mb-1">
        <span class="font-semibold text-sm text-primary">Músculos principales: </span>
        <span class="text-sm">
          {{ exercise.primaryMuscles.join(', ') }}
        </span>
      </div>
      <div v-if="exercise.secondaryMuscles && exercise.secondaryMuscles.length" class="mb-4">
        <span class="font-semibold text-sm text-info">Músculos secundarios: </span>
        <span class="text-sm text-info/80">
          {{ exercise.secondaryMuscles.join(', ') }}
        </span>
      </div>
      <div v-else class="mb-4"></div>
      <div class="flex flex-col flex-1">
        <div class="flex flex-wrap gap-2 mb-3">
          <span
            class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold shadow"
            >Nivel: {{ exercise.level }}</span
          >
          <span
            class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold shadow"
            >Fuerza: {{ exercise.force }}</span
          >
          <span
            class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold shadow"
            >Equipo: {{ exercise.equipment }}</span
          >
          <span
            v-if="exercise.mechanic"
            class="px-3 py-1 bg-info/10 text-info rounded-full text-xs font-semibold shadow"
            >Mecánica: {{ exercise.mechanic }}</span
          >
          <span
            class="px-3 py-1 bg-accent-card text-primary rounded-full text-xs font-semibold shadow border border-primary/20"
            >Categoría: {{ exercise.category }}</span
          >
        </div>
        <router-link
          :to="{ name: 'exercise-details', params: { id: exercise.id } }"
          class="btn btn-primary mt-auto"
        >
          Ver detalles
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExerciseGif from './ExerciseGif.vue'
import { defineProps } from 'vue'

const props = defineProps({
  exercise: {
    type: Object,
    required: true
  }
})
</script>
