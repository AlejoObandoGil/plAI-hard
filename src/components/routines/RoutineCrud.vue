<template>
  <div class="w-full max-w-3xl mx-auto">
    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-12">
      <div class="text-center text-red-400">
        <p class="mb-2">Error al cargar las rutinas</p>
        <p class="text-sm">{{ error }}</p>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
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
          :routine="routine"
          @edit="$emit('edit', routine)"
          @delete="$emit('delete', routine)"
        />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-12">
        <div class="text-center">
          <p class="text-gray-400 mb-2">¡No tienes ninguna rutina creada!</p>
          <p class="text-gray-400">¡Crea una nueva rutina para comenzar!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoutineItemCard from './RoutineItemCard.vue'
import { ref, computed } from 'vue'
import { useRoutinesStore } from '@/stores/routine'
import type { Routine } from '@/types/routines'

const routinesStore = useRoutinesStore()
const routines = computed(() => routinesStore.routines)
const loading = computed(() => routinesStore.loading)
const error = computed(() => routinesStore.error)

const selectedRoutine = ref<Routine | null>(null)
const search = ref('')

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'edit', routine: Routine): void
  (e: 'delete', routine: Routine): void
}>()

function handleEdit(routine: Routine) {
  selectedRoutine.value = routine
  emit('edit', routine)
}

function handleDelete(routine: Routine) {
  emit('delete', routine)
}

const filteredRoutines = computed(() => {
  return routines.value.filter((r) => r.name.toLowerCase().includes(search.value.toLowerCase()))
})
</script>
