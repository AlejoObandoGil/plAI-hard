import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Exercise {
  id: string
  name: string
  bodyPart: string
  target: string
  equipment: string
  gifUrl: string
}

export const useExerciseStore = defineStore('exercise', () => {
  const exercises = ref<Exercise[]>([])
  const selectedExercise = ref<Exercise | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchExercises = async () => {
    loading.value = true
    try {
      // Here we'll implement the ExerciseDB API call
      // For now we'll just mock the data
      exercises.value = []
    } catch (err: unknown) {
      error.value = 'Error al cargar los ejercicios'
    } finally {
      loading.value = false
    }
  }

  const getExerciseById = async (id: string) => {
    loading.value = true
    try {
      // We'll implement the ExerciseDB API call for a specific exercise
      selectedExercise.value = null
    } catch (err: unknown) {
      error.value = 'Error al cargar el ejercicio'
    } finally {
      loading.value = false
    }
  }

  return {
    exercises,
    selectedExercise,
    loading,
    error,
    fetchExercises,
    getExerciseById,
  }
})
