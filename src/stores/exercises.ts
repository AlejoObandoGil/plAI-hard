import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { supabase } from '../services/supabase'

const SUPABASE_BUCKET = 'gym-app'
function getPublicUrl(path: string) {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL.replace(/^https?:\/\//, '')
  const urlStorage = `https://${baseUrl}/storage/v1/object/public/${SUPABASE_BUCKET}/exercises/${path}`
  return urlStorage
}

export interface Exercise {
  id: string
  name: string
  level: string | null
  force: string | null
  mechanic: string | null
  equipment: string | null
  category: string | null
  primaryMuscles: string[]
  secondaryMuscles: string[]
  instructions: string[]
  images: string[]
}

export const filters = reactive({
  level: null as string | null,
  force: null as string | null,
  mechanic: null as string | null,
  equipment: null as string | null,
  category: null as string | null,
  primaryMuscles: [] as string[],
  secondaryMuscles: [] as string[],
})

export const useExercisesStore = defineStore('exercises', () => {
  const exercises = ref<Exercise[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const page = ref(0)
  const limit = ref(15)
  const hasMore = ref(true)
  const search = ref('')

  async function fetchExercises(reset = false, searchQuery = '') {
    if (loading.value) return
    loading.value = true
    error.value = null
    if (reset) {
      exercises.value = []
      page.value = 0
      hasMore.value = true
      search.value = searchQuery
    }
    const from = page.value * limit.value
    const to = from + limit.value - 1
    let query = supabase
      .from('exercises_search_view_spanish')
      .select('*')
      .order('name', { ascending: true })
      .range(from, to)

    if (search.value) {
      query = query.or(`name.ilike.%${search.value}%,primary_muscles_str.ilike.%${search.value}%`)
    }

    if (filters.level) query = query.eq('level', filters.level)
    if (filters.force) query = query.eq('force', filters.force)
    if (filters.mechanic) query = query.eq('mechanic', filters.mechanic)
    if (filters.equipment) query = query.eq('equipment', filters.equipment)
    if (filters.category) query = query.eq('category', filters.category)
    if (filters.primaryMuscles.length)
      query = query.contains('primary_muscles', filters.primaryMuscles)
    if (filters.secondaryMuscles.length)
      query = query.contains('secondary_muscles', filters.secondaryMuscles)

    const { data, error: err } = await query
    if (err) {
      error.value = err.message
      if (reset) exercises.value = []
    } else {
      const newExercises = (data || []).map((ex: any) => ({
        id: ex.id,
        name: ex.name,
        level: ex.level || null,
        force: ex.force || null,
        mechanic: ex.mechanic || null,
        equipment: ex.equipment || null,
        category: ex.category || null,
        primaryMuscles: ex.primary_muscles || [],
        secondaryMuscles: ex.secondary_muscles || [],
        instructions: (ex.instructions || []).sort(
          (a: any, b: any) => a.step_number - b.step_number,
        ),
        images: (ex.images || []).map((img: any) => getPublicUrl(img.image_url)),
      }))
      if (reset) {
        exercises.value = newExercises
      } else {
        exercises.value = [...exercises.value, ...newExercises]
      }
      if (newExercises.length < limit.value) {
        hasMore.value = false
      } else {
        page.value++
      }
    }
    loading.value = false
  }

  function resetExercises() {
    exercises.value = []
    page.value = 0
    hasMore.value = true
    search.value = ''
  }

  // Obtener opciones para los filtros
  const filterOptions = reactive({
    levels: [] as string[],
    forces: [] as string[],
    mechanics: [] as string[],
    equipment: [] as string[],
    categories: [] as string[],
    muscles: [] as string[],
  })

  // Cargar opciones de filtros
  async function loadFilterOptions() {
    try {
      const [levels, forces, mechanics, equipment, categories, muscles] = await Promise.all([
        supabase.from('levels').select('name_spanish'),
        supabase.from('forces').select('name_spanish'),
        supabase.from('mechanics').select('name_spanish'),
        supabase.from('equipment').select('name_spanish'),
        supabase.from('categories').select('name_spanish'),
        supabase.from('muscles').select('name_spanish'),
      ])

      filterOptions.levels = (levels.data || []).map((l: any) => l.name_spanish)
      filterOptions.forces = (forces.data || []).map((f: any) => f.name_spanish)
      filterOptions.mechanics = (mechanics.data || []).map((m: any) => m.name_spanish)
      filterOptions.equipment = (equipment.data || []).map((e: any) => e.name_spanish)
      filterOptions.categories = (categories.data || []).map((c: any) => c.name_spanish)
      filterOptions.muscles = (muscles.data || []).map((m: any) => m.name_spanish)
    } catch (error) {
      console.error('Error cargando opciones de filtro:', error)
      throw error
    }
  }

  return { 
    exercises, 
    loading, 
    error, 
    fetchExercises, 
    hasMore, 
    resetExercises, 
    search, 
    filters,
    filterOptions,
    loadFilterOptions
  }
})
