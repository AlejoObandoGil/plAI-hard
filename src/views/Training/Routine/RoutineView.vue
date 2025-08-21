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
import { ref, onMounted } from 'vue'
import { useRoutinesStore } from '@/stores/routine'
import { useToast, POSITION } from 'vue-toastification'
import DeleteConfirmationToast from '@/components/commons/DeleteConfirmationToast.vue'
import RoutineCrud from '@/components/routines/RoutineCrud.vue'
import RoutineFormModal from '@/components/routines/RoutineFormModal.vue'
import type { Routine, RoutineFormData } from '@/types/routines'

const toast = useToast()
const routinesStore = useRoutinesStore()
const routines = routinesStore.routines

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
      toast.success('Rutina actualizada correctamente')
    } else {
      // Crear nueva rutina
      await routinesStore.createRoutine(data)
      toast.success('Rutina creada correctamente')
    }
    closeModal()
  } catch (error) {
    console.error('Error al guardar la rutina:', error)
    toast.error('Error al guardar la rutina. Por favor, inténtalo de nuevo.')
  }
}
async function onDelete(routine: Routine) {
  const toast = useToast()

  toast.warning(
    {
      component: DeleteConfirmationToast,
      props: {
        message: '¿Estás seguro de que quieres eliminar esta rutina?',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
      },
      listeners: {
        confirm: async () => {
          try {
            await routinesStore.deleteRoutine(routine.id)
            toast.success('Rutina eliminada correctamente')
          } catch (error) {
            console.error('Error al eliminar la rutina:', error)
            toast.error('No se pudo eliminar la rutina. Por favor, inténtalo de nuevo.')
          }
        },
        cancel: () => {
          toast.clear()
        },
      },
    },
    {
      position: POSITION.TOP_CENTER,
      timeout: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      hideProgressBar: true,
    },
  )
}
</script>
