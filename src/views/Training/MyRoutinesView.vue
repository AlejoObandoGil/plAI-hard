<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center py-8">
    <h2 class="text-2xl font-bold mb-6 text-blue-800">Mis Rutinas</h2>
    <RoutineCrud :routines="mockRoutines" @create="openCreateModal" @edit="openEditModal" @delete="onDelete" />
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
import RoutineCrud from '@/components/routines/RoutineCrud.vue'
import RoutineFormModal from '@/components/routines/RoutineFormModal.vue'

const mockRoutines = ref([
  {
    id: '1',
    name: 'Rutina Full Body',
    description: 'Entrenamiento completo para todo el cuerpo',
    objective: 'Fuerza',
    day_of_the_week: 'Lunes',
    is_public: false,
  },
  {
    id: '2',
    name: 'Piernas y Glúteos',
    description: 'Rutina enfocada en tren inferior',
    objective: 'Hipertrofia',
    day_of_the_week: 'Miércoles',
    is_public: true,
  },
])

const modalVisible = ref(false)
const selectedRoutine = ref<any>(null)

function openCreateModal() {
  selectedRoutine.value = null
  modalVisible.value = true
}
function openEditModal(routine: any) {
  selectedRoutine.value = routine
  modalVisible.value = true
}
function closeModal() {
  modalVisible.value = false
}
function onSaveRoutine(data: any) {
  // Aquí irá la lógica real con Supabase
  if (selectedRoutine.value) {
    // Editar
    const idx = mockRoutines.value.findIndex(r => r.id === selectedRoutine.value.id)
    if (idx !== -1) mockRoutines.value[idx] = { ...selectedRoutine.value, ...data }
  } else {
    // Crear
    mockRoutines.value.push({ ...data, id: Date.now().toString() })
  }
  closeModal()
}
function onDelete(routine: any) {
  // Aquí irá la lógica real con Supabase
  mockRoutines.value = mockRoutines.value.filter(r => r.id !== routine.id)
}
</script>
