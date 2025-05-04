// src/stores/routine.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/services/supabase'
import type { Routine, RoutineFormData } from '@/types/routines'
import { useAuthStore } from './auth'

export const useRoutinesStore = defineStore('routines', () => {
  const authStore = useAuthStore()
  const routines = ref<Routine[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedRoutine = ref<Routine | null>(null)

  async function fetchRoutines() {
    try {
      loading.value = true
      error.value = null

      if (!authStore.isAuthenticated) {
        error.value = 'Usuario no autenticado'
        throw new Error('Usuario no autenticado')
      }

      const { data, error: supabaseError } = await supabase
        .from('routines')
        .select('*')
        .eq('user_id', authStore.user?.id)
        .order('created_at', { ascending: false })

      if (supabaseError) throw supabaseError

      routines.value = data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createRoutine(formData: RoutineFormData) {
    try {
      loading.value = true
      error.value = null

      if (!authStore.isAuthenticated) {
        error.value = 'Usuario no autenticado'
        throw new Error('Usuario no autenticado')
      }

      const { data, error: supabaseError } = await supabase
        .from('routines')
        .insert([
          {
            ...formData,
            user_id: authStore.user?.id,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single()

      if (supabaseError) throw supabaseError

      // Actualizar el estado local
      routines.value = [...routines.value, data]
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateRoutine(id: string, formData: RoutineFormData) {
    try {
      loading.value = true
      error.value = null

      if (!authStore.isAuthenticated) {
        error.value = 'Usuario no autenticado'
        throw new Error('Usuario no autenticado')
      }

      const { data, error: supabaseError } = await supabase
        .from('routines')
        .update({
          ...formData
        })
        .eq('id', id)
        .eq('user_id', authStore.user?.id)
        .select()
        .single()

      if (supabaseError) throw supabaseError

      // Actualizar el estado local
      const index = routines.value.findIndex(r => r.id === id)
      if (index !== -1) {
        routines.value[index] = data
      }
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteRoutine(id: string) {
    try {
      loading.value = true
      error.value = null

      if (!authStore.isAuthenticated) {
        error.value = 'Usuario no autenticado'
        throw new Error('Usuario no autenticado')
      }

      const { error: supabaseError } = await supabase
        .from('routines')
        .delete()
        .eq('id', id)
        .eq('user_id', authStore.user?.id)

      if (supabaseError) throw supabaseError

      // Actualizar el estado local
      routines.value = routines.value.filter(r => r.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    routines: computed(() => routines.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    selectedRoutine,
    fetchRoutines,
    createRoutine,
    updateRoutine,
    deleteRoutine
  }
})
