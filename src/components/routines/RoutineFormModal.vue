<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div class="card w-full max-w-md relative animate-fade-in">
        <button
          @click="$emit('close')"
          class="btn-minimal absolute top-3 right-3 p-2 rounded-full hover:bg-accent/10 text-gray-400 hover:text-primary"
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
              :disabled="loading"
              maxlength="60"
              class="input w-full"
              :class="{ error: formErrors.name }"
              placeholder="Ej: Rutina Full Body"
              @input="delete formErrors.name"
            />
            <p v-if="formErrors.name" class="text-error">{{ formErrors.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-primary mb-1"
              >Descripción (Opcional)</label
            >
            <textarea
              v-model="form.description"
              :disabled="loading"
              maxlength="160"
              class="input w-full resize-none"
              rows="2"
              placeholder="Descripción breve"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-semibold text-primary mb-1">Objetivo (Opcional)</label>
            <input
              v-model="form.objective"
              :disabled="loading"
              maxlength="40"
              class="input w-full"
              placeholder="Ej: Fuerza, Hipertrofia..."
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-primary mb-1">Día de la semana *</label>
            <select
              v-model="form.day_of_the_week"
              :disabled="loading"
              class="input-select w-full"
              :class="{ error: formErrors.day_of_the_week }"
              @change="delete formErrors.day_of_the_week"
            >
              <option value="">Selecciona un día</option>
              <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
            </select>
            <p v-if="formErrors.day_of_the_week" class="text-error">
              {{ formErrors.day_of_the_week }}
            </p>
          </div>
          <!-- <div class="flex items-center gap-2">
            <input type="checkbox" v-model="form.is_public" id="is_public" class="input-checkbox" />
            <label for="is_public" class="text-sm text-primary">Rutina pública</label>
          </div> -->
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary w-full mt-2 flex items-center justify-center gap-2"
            :class="{ 'opacity-70 cursor-not-allowed': loading }"
          >
            <span v-if="loading" class="animate-spin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span>{{ routine ? 'Guardar cambios' : 'Crear rutina' }}</span>
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'
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
const loading = ref(false)
const formErrors = reactive<Record<string, string>>({})

const form = ref<RoutineFormData>({
  name: '',
  description: '',
  objective: '',
  day_of_the_week: '',
  is_public: false,
})

// Reset form when modal is opened/closed or routine changes
watch(
  () => [props.visible, props.routine],
  ([isVisible]) => {
    if (isVisible) {
      form.value = {
        name: props.routine?.name || '',
        description: props.routine?.description || '',
        objective: props.routine?.objective || '',
        day_of_the_week: props.routine?.day_of_the_week || '',
        is_public: props.routine?.is_public || false,
      }
      // Reset errors
      Object.keys(formErrors).forEach((key) => delete formErrors[key])
    }
  },
  { immediate: true },
)

function validateForm() {
  let isValid = true

  // Reset errors
  Object.keys(formErrors).forEach((key) => delete formErrors[key])

  // Validate required fields
  if (!form.value.name?.trim()) {
    formErrors.name = 'El nombre es requerido'
    isValid = false
  } else if (form.value.name.trim().length < 3) {
    formErrors.name = 'El nombre debe tener al menos 3 caracteres'
    isValid = false
  }

  if (!form.value.day_of_the_week) {
    formErrors.day_of_the_week = 'Debes seleccionar un día de la semana'
    isValid = false
  }

  return isValid
}

function onSubmit() {
  if (!validateForm()) {
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
