<template>
  <div class="relative">
    <button @click="$emit('toggle')" class="flex items-center">
      <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
        <span class="text-accent font-medium">JD</span>
      </div>
    </button>
    <div v-if="open" class="absolute right-0 mt-2 w-48 bg-accent-card rounded-lg shadow-lg py-2 z-50">
      <a href="#" class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary">Mi Perfil</a>
      <a href="#" class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary">Configuración</a>
      <a href="#" class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary">Cerrar Sesión</a>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits(['toggle'])
</script>
