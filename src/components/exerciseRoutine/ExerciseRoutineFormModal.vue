<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 p-4 overflow-y-auto"
    >
      <div class="card w-full max-w-md relative animate-fade-in my-8">
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
        <h3 class="text-xl font-bold mb-4 text-primary">Agregar a mi rutina</h3>
        <p v-if="error" class="text-error text-sm mb-4">{{ error }}</p>
        <form @submit.prevent="onSubmit" class="flex flex-col gap-3 sm:gap-4">
          <div>
            <label class="block text-sm font-semibold text-primary mb-1">Rutina *</label>
            <select
              v-model="form.routineId"
              class="input-select w-full"
              :class="{ error: formErrors.routineId }"
              :disabled="loading"
            >
              <option value="">Selecciona una rutina</option>
              <option v-for="routine in routines" :key="routine.id" :value="routine.id">
                {{ routine.name }}
              </option>
            </select>
            <p v-if="formErrors.routineId" class="text-error">{{ formErrors.routineId }}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-primary mb-1">Series *</label>
              <input
                v-model.number="form.sets"
                type="number"
                min="1"
                max="20"
                class="input w-full"
                :class="{ error: formErrors.sets }"
                :disabled="loading"
                @input="formErrors.sets = ''"
              />
              <p v-if="formErrors.sets" class="text-error text-xs mt-1">{{ formErrors.sets }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-primary mb-1">Repeticiones *</label>
              <input
                v-model.number="form.reps"
                type="number"
                min="1"
                class="input w-full"
                :class="{ error: formErrors.reps }"
                :disabled="loading"
                @input="formErrors.reps = ''"
              />
              <p v-if="formErrors.reps" class="text-error text-xs mt-1">{{ formErrors.reps }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-primary mb-1">Peso (kg)</label>
              <input
                v-model.number="form.weight"
                type="number"
                min="0"
                step="0.5"
                class="input w-full"
                :class="{ error: formErrors.weight }"
                :disabled="loading"
                placeholder="Ej: 20.5"
                @input="formErrors.weight = ''"
              />
              <p v-if="formErrors.weight" class="text-error text-xs mt-1">
                {{ formErrors.weight }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-primary mb-1"
                >Tiempo de descanso (seg)</label
              >
              <input
                v-model.number="form.restSeconds"
                type="number"
                min="0"
                class="input w-full"
                :class="{ error: formErrors.restSeconds }"
                :disabled="loading"
                placeholder="Ej: 60"
                @input="formErrors.restSeconds = ''"
              />
              <p v-if="formErrors.restSeconds" class="text-error text-xs mt-1">
                {{ formErrors.restSeconds }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-primary mb-1">Tempo (opcional)</label>
              <input
                v-model="form.tempo"
                type="text"
                class="input w-full"
                :disabled="loading"
                placeholder="Ej: 2-0-1-0"
              />
              <p class="text-xs text-gray-500 mt-1">Formato: concéntrico-pausa-excéntrico-pausa</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-primary mb-1"
                >Orden en la rutina *</label
              >
              <input
                v-model.number="form.order"
                type="number"
                min="0"
                class="input w-full"
                :class="{ error: formErrors.order }"
                :disabled="loading"
                placeholder="0"
                @input="formErrors.order = ''"
              />
              <p v-if="formErrors.order" class="text-error text-xs mt-1">{{ formErrors.order }}</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-primary mb-1">Notas (Opcional)</label>
            <textarea
              v-model="form.notes"
              class="input w-full resize-none text-sm sm:text-base"
              rows="2"
              maxlength="160"
              :disabled="loading"
              placeholder="Ej: Mantener la espalda recta"
            ></textarea>
          </div>

          <div class="flex flex-col sm:flex-row justify-end gap-3 mt-4 w-full">
            <button
              type="button"
              @click="$emit('close')"
              class="btn btn-outline w-full sm:w-auto"
              :disabled="loading"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary w-full sm:w-auto"
              :disabled="loading"
              :class="{ 'opacity-50': loading }"
            >
              <span v-if="loading">Guardando...</span>
              <span v-else>Guardar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../services/supabase'

const props = defineProps<{
  visible: boolean
  exerciseId: string
}>()

const emit = defineEmits(['close', 'saved'])

interface Routine {
  id: string
  name: string
  description: string | null
  objective: string | null
  dayOfTheWeek: string | null
  isPublic?: boolean
  createdAt: string
  updatedAt: string | null
}

const loading = ref(false)
const error = ref<string | null>(null)
const routines = ref<Routine[]>([])

const form = ref({
  routineId: '',
  sets: null as number | null,
  reps: null as number | null,
  weight: null as number | null,
  tempo: '',
  restSeconds: null as number | null,
  order: null as number | null,
  notes: '',
})

const formErrors = ref<Record<string, string>>({})

onMounted(async () => {
  await loadRoutines()
})

async function loadRoutines() {
  try {
    loading.value = true
    error.value = null

    const { data, error: fetchError } = await supabase
      .from('routines')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) throw fetchError
    routines.value = data || []
  } catch (err) {
    console.error('Error loading routines:', err)
    error.value = err instanceof Error ? err.message : 'Error al cargar las rutinas'
  } finally {
    loading.value = false
  }
}

function validateForm() {
  const errors: Record<string, string> = {}

  // Validar campos obligatorios
  if (!form.value.routineId) {
    errors.routineId = 'Selecciona una rutina'
  }

  if (form.value.sets === null || form.value.sets === undefined) {
    errors.sets = 'Las series son requeridas'
  } else if (form.value.sets < 1 || form.value.sets > 20) {
    errors.sets = 'Las series deben estar entre 1 y 20'
  }

  if (form.value.reps === null || form.value.reps === undefined) {
    errors.reps = 'Las repeticiones son requeridas'
  } else if (form.value.reps < 1) {
    errors.reps = 'Las repeticiones deben ser mayores a 0'
  }

  if (form.value.weight !== null && form.value.weight !== undefined && form.value.weight < 0) {
    errors.weight = 'El peso no puede ser negativo'
  }

  if (form.value.restSeconds !== null && form.value.restSeconds !== undefined && form.value.restSeconds < 0) {
    errors.restSeconds = 'El tiempo de descanso no puede ser negativo'
  }

  if (form.value.order === null || form.value.order === undefined) {
    errors.order = 'El orden es requerido'
  } else if (form.value.order < 0) {
    errors.order = 'El orden no puede ser negativo'
  }

  formErrors.value = errors
  return Object.keys(errors).length === 0
}

async function onSubmit() {
  if (!validateForm()) return

  try {
    loading.value = true
    error.value = null

    const { data, error: insertError } = await supabase
      .from('routine_exercises')
      .insert({
        routine_id: form.value.routineId,
        exercise_id: props.exerciseId,
        sets: form.value.sets,
        reps: form.value.reps,
        weight: form.value.weight,
        tempo: form.value.tempo || null,
        rest_seconds: form.value.restSeconds,
        notes: form.value.notes || null,
        order: form.value.order,
      })
      .select()
      .single()

    if (insertError) throw insertError

    emit('saved', data)
    emit('close')
  } catch (err) {
    console.error('Error adding exercise to routine:', err)
    error.value = err instanceof Error ? err.message : 'Error al agregar el ejercicio a la rutina'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
