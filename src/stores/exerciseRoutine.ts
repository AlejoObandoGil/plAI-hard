import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase'

export const useExerciseRoutineStore = defineStore('exerciseRoutine', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function addExerciseToRoutine(payload: {
    routineId: string
    exerciseId: string
    sets?: number | null
    reps?: number | null
    weight?: number | null
    tempo?: string | null
    restSeconds?: number | null
    order?: number | null
    notes?: string | null
  }) {
    try {
      loading.value = true
      error.value = null

      const { data, error: supabaseError } = await supabase
        .from('routine_exercises')
        .insert({
          routine_id: payload.routineId,
          exercise_id: payload.exerciseId,
          sets: payload.sets,
          reps: payload.reps,
          weight: payload.weight,
          tempo: payload.tempo,
          rest_seconds: payload.restSeconds,
          order: payload.order,
          notes: payload.notes
        })
        .select()
        .single()

      if (supabaseError) throw supabaseError
      return data
    } catch (err) {
      console.error('Error adding exercise to routine:', err)
      error.value = err instanceof Error ? err.message : 'Error al agregar ejercicio a la rutina'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getRoutineExercises(routineId: string) {
    try {
      loading.value = true
      error.value = null

      const { data, error: supabaseError } = await supabase
        .from('routine_exercises')
        .select(`
          *,
          exercises (*)
        `)
        .eq('routine_id', routineId)
        .order('order', { ascending: true })

      if (supabaseError) throw supabaseError
      return data
    } catch (err) {
      console.error('Error fetching routine exercises:', err)
      error.value = err instanceof Error ? err.message : 'Error al cargar los ejercicios de la rutina'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateRoutineExercise(
    id: string,
    updates: {
      sets?: number | null
      reps?: number | null
      weight?: number | null
      tempo?: string | null
      restSeconds?: number | null
      order?: number | null
      notes?: string | null
    }
  ) {
    try {
      loading.value = true
      error.value = null

      // Mapear los campos a los nombres de columna de la base de datos
      const dbUpdates = {
        sets: updates.sets,
        reps: updates.reps,
        weight: updates.weight,
        tempo: updates.tempo,
        rest_seconds: updates.restSeconds,
        order: updates.order,
        notes: updates.notes,
        updated_at: new Date().toISOString()
      }

      const { data, error: supabaseError } = await supabase
        .from('routine_exercises')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single()

      if (supabaseError) throw supabaseError
      return data
    } catch (err) {
      console.error('Error updating routine exercise:', err)
      error.value = err instanceof Error ? err.message : 'Error al actualizar el ejercicio de la rutina'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function removeExerciseFromRoutine(id: string) {
    try {
      loading.value = true
      error.value = null

      const { error: supabaseError } = await supabase
        .from('routine_exercises')
        .delete()
        .eq('id', id)

      if (supabaseError) throw supabaseError
      return true
    } catch (err) {
      console.error('Error removing exercise from routine:', err)
      error.value = err instanceof Error ? err.message : 'Error al eliminar el ejercicio de la rutina'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    addExerciseToRoutine,
    getRoutineExercises,
    updateRoutineExercise,
    removeExerciseFromRoutine,
  }
})
