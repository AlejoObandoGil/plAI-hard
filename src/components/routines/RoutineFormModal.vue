<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        class="bg-accent-card p-6 rounded-2xl shadow-2xl w-full max-w-md relative animate-fade-in"
      >
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 p-2 rounded-full hover:bg-accent/10 text-gray-400 hover:text-primary transition"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 class="text-xl font-bold mb-4 text-primary">
          {{ routine ? 'Editar Rutina' : 'Crear Rutina' }}
        </h3>
        <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-semibold text-primary mb-1">Nombre *</label>
            <input
              v-model="form.name"
              required
              maxlength="60"
              class="input"
              placeholder="Ej: Rutina Full Body"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-primary mb-1"
              >Descripción (Opcional)</label
            >
            <textarea
              v-model="form.description"
              maxlength="160"
              class="input"
              rows="2"
              placeholder="Descripción breve"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-semibold text-primary mb-1">Objetivo (Opcional)</label>
            <input
              v-model="form.objective"
              maxlength="40"
              class="input"
              placeholder="Ej: Fuerza, Hipertrofia..."
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-primary mb-1">Día de la semana *</label>
            <select v-model="form.day_of_the_week" class="input-select">
              <option value="">Selecciona un día</option>
              <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
          <!-- <div class="flex items-center gap-2">
            <input type="checkbox" v-model="form.is_public" id="is_public" class="input-checkbox" />
            <label for="is_public" class="text-sm text-primary">Rutina pública</label>
          </div> -->
          <button
            type="submit"
            class="w-full py-2 rounded-xl bg-primary text-white font-bold shadow-soft hover:bg-primary/90 transition mt-2"
          >
            {{ routine ? 'Guardar cambios' : 'Crear rutina' }}
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Routine, RoutineFormData } from '@/types/routines'

const props = defineProps<{
  visible: boolean
  routine?: Routine | null
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: RoutineFormData): void
}>()

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

const form = ref({
  name: '',
  description: '',
  objective: '',
  day_of_the_week: '',
  is_public: false,
})

watch(
  () => props.routine,
  (r) => {
    if (r) {
      form.value = {
        name: r.name || '',
        description: r.description || '',
        objective: r.objective || '',
        day_of_the_week: r.day_of_the_week || '',
        is_public: !!r.is_public,
      }
    } else {
      form.value = {
        name: '',
        description: '',
        objective: '',
        day_of_the_week: '',
        is_public: false,
      }
    }
  },
  { immediate: true },
)

function onSubmit() {
  if (!form.value.name.trim()) {
    alert('El nombre es requerido')
    return
  }
  if (!form.value.day_of_the_week.trim()) {
    alert('El día de la semana es requerido')
    return
  }
  emit('save', {
    name: form.value.name.trim(),
    description: form.value.description.trim(),
    objective: form.value.objective.trim(),
    day_of_the_week: form.value.day_of_the_week,
    is_public: form.value.is_public,
  })
}
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 rounded-lg border border-primary/20 bg-accent/5 text-muted focus:outline-none focus:ring-2 focus:ring-primary transition;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
