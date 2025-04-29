<template>
  <div class="bg-accent-card border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 card-animate-pop card-hover-effect">
    <div class="flex-1 text-left">
      <h3 class="text-xl font-bold text-primary mb-1">{{ name }}</h3>
      <p v-if="description" class="text-gray-400 text-sm mb-1">{{ description }}</p>
      <div v-if="objective || dayOfTheWeek" class="flex flex-wrap gap-2 mt-1">
        <span v-if="objective" class="px-2 py-1 rounded bg-secondary/10 text-secondary text-xs font-semibold">{{ objective }}</span>
        <span v-if="dayOfTheWeek" class="px-2 py-1 rounded bg-tertiary/10 text-tertiary text-xs font-semibold">{{ dayOfTheWeek }}</span>
      </div>
    </div>
    <div class="flex gap-2">
      <button @click="$emit('edit')" class="p-2 rounded-full bg-info hover:bg-info-dark text-white shadow transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" />
        </svg>
      </button>
      <button @click="$emit('delete')" class="p-2 rounded-full bg-error hover:bg-error-dark text-white shadow transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  name: string
  description?: string
  objective?: string
  dayOfTheWeek?: string
}>()
</script>
