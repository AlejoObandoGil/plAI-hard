import { defineStore } from 'pinia'
import { ref } from 'vue'
import { exerciseDB } from '@/api/exerciseDB'

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
      const response = await exerciseDB.get('/exercises')
      console.log('API response:', response.data)

      if (response.data && Array.isArray(response.data)) {
        exercises.value = response.data.map((exercise: any) => ({
          id: exercise.id,
          name: exercise.name,
          bodyPart: exercise.bodyPart,
          target: exercise.target,
          equipment: exercise.equipment,
          gifUrl: exercise.gifUrl,
        }))
        console.log('Processed exercises:', exercises.value)
      } else {
        console.error('Invalid response format:', response.data)
        error.value = 'Formato de respuesta inválido'
      }
    } catch (err: unknown) {
      error.value = 'Error al cargar los ejercicios'
      console.error('Error fetching exercises:', err)
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
