<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center py-8">
    <h2 class="text-2xl font-bold mb-6 text-blue-800">Mis Rutinas</h2>
    <RoutineCrud
      :routines="routines"
      @create="openCreateModal"
      @edit="openEditModal"
      @delete="onDelete"
    />
    <RoutineFormModal
      :visible="modalVisible"
      :routine="selectedRoutine"
      @close="closeModal"
      @save="onSaveRoutine"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRoutinesStore } from '@/stores/routine'
import RoutineCrud from '@/components/routines/RoutineCrud.vue'
import RoutineFormModal from '@/components/routines/RoutineFormModal.vue'
import type { Routine } from '@/types/routines'

const routinesStore = useRoutinesStore()
const routines = routinesStore.routines
const loading = routinesStore.loading
const error = routinesStore.error

const modalVisible = ref(false)
const selectedRoutine = ref<Routine | null>(null)

onMounted(() => {
  routinesStore.fetchRoutines()
})

function openCreateModal() {
  selectedRoutine.value = null
  modalVisible.value = true
}
function openEditModal(routine: Routine) {
  selectedRoutine.value = routine
  modalVisible.value = true
}
function closeModal() {
  modalVisible.value = false
}
async function onSaveRoutine(data: RoutineFormData) {
  try {
    if (selectedRoutine.value) {
      // Actualizar rutina
      await routinesStore.updateRoutine(selectedRoutine.value.id, data)
    } else {
      // Crear nueva rutina
      await routinesStore.createRoutine(data)
    }
    closeModal()
  } catch (error) {
    console.error('Error al guardar la rutina:', error)
  }
}

async function onDelete(routine: Routine) {
  try {
    if (confirm('¿Estás seguro de que quieres eliminar esta rutina?')) {
      await routinesStore.deleteRoutine(routine.id)
    }
  } catch (error) {
    console.error('Error al eliminar la rutina:', error)
  }
}
</script>
