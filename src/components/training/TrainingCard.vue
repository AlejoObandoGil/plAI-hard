<template>
  <RouterLink :to="to" class="group focus:outline-none">
    <div
      class="card card-animate-pop card-hover-effect bg-accent-card border border-white/10 rounded-2xl shadow-xl p-8 flex flex-col items-center transition-all duration-200 hover:scale-105 cursor-pointer"
    >
      <div :class="['icon', iconBg, 'group-hover:shadow-strong']">
        <slot name="icon" />
      </div>
      <h2 class="text-xl font-bold mb-2 drop-shadow text-accent">{{ title }}</h2>
      <p class="text-white/80 text-center text-base">{{ description }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  to: string
  title: string
  description: string
  iconBg: string
}>()
</script>

<style scoped>
.icon {
  @apply rounded-full p-4 mb-4 shadow-lg transition-colors duration-200 text-white flex items-center justify-center;
}
</style>
