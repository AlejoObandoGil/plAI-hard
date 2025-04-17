import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { exerciseDB } from '@/api/exerciseDB' // Comentado: API externa ya no se usa

export interface Exercise {
  id: string
  name: string
  force: string
  level: string
  mechanic: string | null
  equipment: string
  primaryMuscles: string[]
  secondaryMuscles: string[]
  instructions: string[]
  category: string
  images: string[]
}

export const useExerciseStore = defineStore('exercise', () => {
  const exercises = ref<Exercise[]>([])
  const selectedExercise = ref<Exercise | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // --- NUEVO MÉTODO: JSON LOCAL --- //
  const fetchExercises = async () => {
    loading.value = true
    try {
      const response = await fetch('/data/exercises.json')
      if (!response.ok) throw new Error('No se pudo cargar el archivo JSON')
      const data = await response.json()
      if (Array.isArray(data)) {
        exercises.value = data.map((exercise: any) => ({
          id: exercise.id,
          name: exercise.name,
          force: exercise.force,
          level: exercise.level,
          mechanic: exercise.mechanic,
          equipment: exercise.equipment,
          primaryMuscles: exercise.primaryMuscles,
          secondaryMuscles: exercise.secondaryMuscles,
          instructions: exercise.instructions,
          category: exercise.category,
          images: exercise.images,
        }))
      } else {
        error.value = 'Formato de JSON inválido'
      }
    } catch (err: any) {
      error.value = err.message || 'Error al cargar los ejercicios'
      console.error('Error fetching exercises from JSON:', err)
    } finally {
      loading.value = false
    }
  }

  // Puedes adaptar este método para buscar por id en el JSON cargado
  const getExerciseById = (id: string) => {
    selectedExercise.value = exercises.value.find((e) => e.id === id) || null
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

// --- MÉTODO ANTIGUO: API EXTERNA --- //
/*
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
  */
