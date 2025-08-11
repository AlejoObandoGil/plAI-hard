<template>
  <div
    class="bg-accent-card border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 card-animate-pop card-hover-effect"
  >
    <div class="flex-1 text-left">
      <h3 class="text-xl font-bold text-primary mb-1">{{ routine.name }}</h3>
      <p v-if="routine.description" class="text-gray-400 text-sm mb-1">{{ routine.description }}</p>
      <div v-if="routine.objective || routine.day_of_the_week" class="flex flex-wrap gap-2 mt-1">
        <span
          v-if="routine.objective"
          class="px-2 py-1 rounded bg-secondary/10 text-secondary text-xs font-semibold"
          >{{ routine.objective }}</span
        >
        <span
          v-if="routine.day_of_the_week"
          class="px-2 py-1 rounded bg-tertiary/10 text-tertiary text-xs font-semibold"
          >{{ routine.day_of_the_week }}</span
        >
      </div>
    </div>
    <div class="flex gap-2">
      <router-link
        :to="{ name: 'routine-details', params: { id: routine.id } }"
        class="p-2 rounded-full bg-primary hover:bg-primary-dark text-white shadow transition"
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </router-link>
      <button
        @click="emit('edit')"
        class="p-2 rounded-full bg-secondary hover:bg-secondary-dark text-white shadow transition"
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
            d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z"
          />
        </svg>
      </button>
      <button
        @click="emit('delete')"
        class="p-2 rounded-full bg-error hover:bg-error-dark text-white shadow transition"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Routine } from '../../../types/routines'
import { RouterLink } from 'vue-router'

defineProps<{
  routine: Routine
}>()

const emit = defineEmits<{
  edit: []
  delete: []
}>()
</script>
