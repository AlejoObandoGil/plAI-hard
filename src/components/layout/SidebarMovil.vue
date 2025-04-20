<template>
  <transition name="slide">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 bg-black/30 flex justify-end"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="w-64 bg-accent-card h-full shadow-xl p-6 flex flex-col animate-slide-in-right">
        <button class="self-end mb-6" @click="$emit('update:modelValue', false)">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <a href="#" class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary">Mi Perfil</a>
        <a href="#" class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary">Configuración</a>
        <a href="#" class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary">Cerrar Sesión</a>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])
</script>

<style scoped>
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in-right {
  animation: slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
