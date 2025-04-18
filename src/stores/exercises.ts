import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase'

const SUPABASE_BUCKET = 'gym-app' // Cambia si tu bucket tiene otro nombre
function getPublicUrl(path: string) {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL.replace(/^https?:\/\//, '')
  return `https://${baseUrl}/storage/v1/object/public/${SUPABASE_BUCKET}/exercises/${path}`
}

export interface Exercise {
  id: string
  name: string
  level: string | null
  force: string | null
  mechanic: string | null
  equipment: string | null
  category: string | null
  primaryMuscles: any[]
  secondaryMuscles: any[]
  instructions: any[]
  images: string[]
}

export const useExercisesStore = defineStore('exercises', () => {
  const exercises = ref<Exercise[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchExercises() {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase
      .from('exercises')
      .select(
        `
        id,
        name,
        level:levels(name),
        force:forces(name),
        mechanic:mechanics(name),
        equipment:equipment(name),
        category:categories(name),
        primaryMuscles:exercise_primary_muscles(muscles(name)),
        secondaryMuscles:exercise_secondary_muscles(muscles(name)),
        instructions:exercise_instructions(instruction, step_number),
        images:exercise_images(image_url)
      `,
      )
      .order('name', { ascending: true })
      .limit(10)
    if (err) {
      error.value = err.message
      exercises.value = []
    } else {
      exercises.value = (data || []).map((ex: any) => ({
        id: ex.id,
        name: ex.name,
        level: ex.level?.name || null,
        force: ex.force?.name || null,
        mechanic: ex.mechanic?.name || null,
        equipment: ex.equipment?.name || null,
        category: ex.category?.name || null,
        primaryMuscles: ex.primaryMuscles || [],
        secondaryMuscles: ex.secondaryMuscles || [],
        instructions: (ex.instructions || []).sort(
          (a: any, b: any) => a.step_number - b.step_number,
        ),
        images: (ex.images || []).map((img: any) => getPublicUrl(img.image_url)),
      }))
    }
    loading.value = false
  }

  return { exercises, loading, error, fetchExercises }
})
