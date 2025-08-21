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
        <EyeIcon class="w-5 h-5" />
      </router-link>
      <button
        @click="emit('edit')"
        class="p-2 rounded-full bg-secondary hover:bg-secondary-dark text-white shadow transition"
      >
        <PencilIcon class="w-5 h-5" />
      </button>
      <button
        @click="emit('delete')"
        class="p-2 rounded-full bg-error hover:bg-error-dark text-white shadow transition"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Routine } from '@/types/routines'
import { RouterLink } from 'vue-router'
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps<{
  routine: Routine
}>()

const emit = defineEmits<{
  edit: []
  delete: []
}>()
</script>
