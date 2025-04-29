<template>
  <div class="w-full max-w-3xl mx-auto">
    <!-- Botón Crear Rutina -->
    <div class="flex justify-end mb-6">
      <button
        class="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white font-bold shadow-soft hover:bg-primary-dark transition card-animate-pop"
        @click="$emit('create')"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        Crear rutina
      </button>
    </div>
    <!-- Lista de Rutinas -->
    <div v-if="routines.length > 0" class="flex flex-col gap-4">
      <RoutineItemCard
        v-for="routine in routines"
        :key="routine.id"
        :name="routine.name"
        :description="routine.description"
        :objective="routine.objective"
        :day-of-the-week="routine.day_of_the_week"
        @edit="$emit('edit', routine)"
        @delete="$emit('delete', routine)"
      />
    </div>
    <div v-else class="flex flex-col items-center justify-center py-12">
      <!-- <img src="/img/empty-routines.svg" alt="Sin rutinas" class="w-32 h-32 mb-4 opacity-70" /> -->
      <p class="text-gray-400 text-lg font-semibold">
        Aún no tienes rutinas creadas.<br />¡Haz clic en "Crear rutina" para comenzar!
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import RoutineItemCard from './RoutineItemCard.vue'

defineProps<{
  routines: Array<{
    id: string
    name: string
    description?: string
    objective?: string
    day_of_the_week?: string
  }>
}>()

defineEmits(['create', 'edit', 'delete'])
</script>
