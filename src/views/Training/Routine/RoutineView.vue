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
import { useToast } from 'vue-toastification'
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
  try {
    // Mostrar confirmación con toast personalizado
    const confirmed = await new Promise<boolean>((resolve) => {
      const toastId = toast.warning('¿Estás seguro de que quieres eliminar esta rutina?', {
        timeout: false,
        closeOnClick: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        icon: 'warning',
        onClick: () => {
          // Evitar que el toast se cierre al hacer clic
        },
        onClose: () => {
          // Resolver como falso si se cierra sin seleccionar una opción
          resolve(false)
        }
      })

      // Crear contenedor para los botones
      const buttonsContainer = document.createElement('div')
      buttonsContainer.className = 'flex gap-2 mt-2 justify-end'

      // Botón de confirmar
      const confirmButton = document.createElement('button')
      confirmButton.className = 'btn btn-error btn-sm'
      confirmButton.textContent = 'Sí, eliminar'
      confirmButton.onclick = () => {
        toast.dismiss(toastId)
        resolve(true)
      }

      // Botón de cancelar
      const cancelButton = document.createElement('button')
      cancelButton.className = 'btn btn-ghost btn-sm'
      cancelButton.textContent = 'Cancelar'
      cancelButton.onclick = () => {
        toast.dismiss(toastId)
        resolve(false)
      }

      // Agregar botones al contenedor
      buttonsContainer.appendChild(confirmButton)
      buttonsContainer.appendChild(cancelButton)

      // Agregar botones al toast
      const toastElement = document.querySelector(`#${toastId}`)
      if (toastElement) {
        toastElement.appendChild(buttonsContainer)
      }
    })

    if (confirmed) {
      await routinesStore.deleteRoutine(routine.id)
      toast.success('Rutina eliminada correctamente')
    }
  } catch (error) {
    console.error('Error al eliminar la rutina:', error)
    toast.error('Error al eliminar la rutina. Por favor, inténtalo de nuevo.')
  }
}
</script>
