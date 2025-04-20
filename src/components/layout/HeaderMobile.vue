<template>
  <header class="bg-accent-card text-accent p-4 shadow-soft md:hidden">
    <div class="flex justify-between items-center px-4">
      <h1 class="text-xl font-display">plAI Hard</h1>
      <button @click="$emit('open-sidebar')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(['open-sidebar'])
</script>
