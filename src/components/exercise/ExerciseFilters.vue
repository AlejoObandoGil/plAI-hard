<template>
  <!-- Desktop Sidebar -->
  <aside class="hidden lg:block w-72 shrink-0 bg-accent-card rounded-xl shadow p-4 h-fit sticky top-8">
    <h2 class="font-bold mb-4 text-lg">Filtros</h2>
    <ExerciseFiltersForm :filters="filters" @reset="onReset" />
  </aside>

  <!-- Mobile Drawer -->
  <Teleport to="body">
    <transition name="slide">
      <div v-if="showMobile" class="fixed inset-0 z-50 flex bg-black/40" @click.self="closeMobile">
        <div class="w-64 bg-accent-card text-primary p-4 shadow-xl h-full overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-lg">Filtros</h2>
            <button @click="closeMobile" class="text-xl">&times;</button>
          </div>
          <ExerciseFiltersForm :filters="filters" @reset="onReset" />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { filters } from '../../stores/exercises'
import ExerciseFiltersForm from './ExerciseFiltersForm.vue'

const showMobile = ref(false)

function openMobile() {
  showMobile.value = true
}
function closeMobile() {
  showMobile.value = false
}
function onReset() {
  // Puedes agregar lógica extra si necesitas
  closeMobile()
}

// Exponer para el padre
defineExpose({ openMobile })
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
