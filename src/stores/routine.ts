// src/stores/routine.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
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
    const toast = useToast()
    try {
      loading.value = true
      error.value = null

      if (!authStore.isAuthenticated) {
        const errorMsg = 'No se pudo autenticar al usuario. Por favor, inicia sesión nuevamente.'
        error.value = errorMsg
        toast.error(errorMsg, {
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: true,
          hideProgressBar: false,
          closeButton: 'button',
          icon: true,
          rtl: false
        })
        throw new Error(errorMsg)
      }

      // Validar datos requeridos
      if (!formData.name?.trim()) {
        const errorMsg = 'El nombre de la rutina es requerido'
        error.value = errorMsg
        toast.warning(errorMsg, {
          timeout: 4000,
          closeOnClick: true,
          draggable: true
        })
        throw new Error(errorMsg)
      }

      if (!formData.day_of_the_week) {
        const errorMsg = 'Debes seleccionar un día de la semana'
        error.value = errorMsg
        toast.warning(errorMsg, {
          timeout: 4000,
          closeOnClick: true,
          draggable: true
        })
        throw new Error(errorMsg)
      }

      // Preparar datos para insertar
      const routineData = {
        ...formData,
        user_id: authStore.user?.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error: supabaseError } = await supabase
        .from('routines')
        .insert([routineData])
        .select()
        .single()

      if (supabaseError) {
        console.error('Error al crear la rutina:', supabaseError)
        const errorMsg = `Error al guardar la rutina: ${supabaseError.message}`
        toast.error('No se pudo guardar la rutina', {
          timeout: 5000,
          closeOnClick: true,
          draggable: true
        })
        throw new Error(errorMsg)
      }

      // Actualizar el estado local
      routines.value = [data, ...routines.value]
      
      // Mostrar notificación de éxito
      toast.success('Rutina creada correctamente', {
        timeout: 3000,
        closeOnClick: true,
        draggable: true
      })
      
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido al crear la rutina'
      console.error('Error en createRoutine:', err)
      
      if (!errorMsg.includes('No se pudo autenticar') && 
          !errorMsg.includes('nombre de la rutina') && 
          !errorMsg.includes('día de la semana')) {
        toast.error('Error al procesar la solicitud', {
          timeout: 5000,
          closeOnClick: true,
          draggable: true
        })
      }
      
      error.value = errorMsg
      throw err // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    } finally {
      loading.value = false
    }
  }

  async function updateRoutine(id: string, formData: RoutineFormData) {
    const toast = useToast()
    try {
      loading.value = true
      error.value = null

      if (!authStore.isAuthenticated) {
        const errorMsg = 'No se pudo autenticar al usuario. Por favor, inicia sesión nuevamente.'
        error.value = errorMsg
        toast.error(errorMsg, {
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: true,
          hideProgressBar: false,
          closeButton: 'button',
          icon: true,
          rtl: false
        })
        throw new Error(errorMsg)
      }

      // Validar datos requeridos
      if (!formData.name?.trim()) {
        const errorMsg = 'El nombre de la rutina es requerido'
        error.value = errorMsg
        toast.warning(errorMsg, {
          timeout: 4000,
          closeOnClick: true,
          draggable: true
        })
        throw new Error(errorMsg)
      }

      if (!formData.day_of_the_week) {
        const errorMsg = 'Debes seleccionar un día de la semana'
        error.value = errorMsg
        toast.warning(errorMsg, {
          timeout: 4000,
          closeOnClick: true,
          draggable: true
        })
        throw new Error(errorMsg)
      }

      const updateData = {
        ...formData,
        updated_at: new Date().toISOString()
      }

      const { data, error: supabaseError } = await supabase
        .from('routines')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', authStore.user?.id)
        .select()
        .single()

      if (supabaseError) {
        console.error('Error al actualizar la rutina:', supabaseError)
        const errorMsg = `Error al actualizar la rutina: ${supabaseError.message}`
        toast.error('No se pudo actualizar la rutina', {
          timeout: 5000,
          closeOnClick: true,
          draggable: true
        })
        throw new Error(errorMsg)
      }

      // Actualizar el estado local
      const index = routines.value.findIndex(r => r.id === id)
      if (index !== -1) {
        routines.value[index] = data
      }
      
      // Mostrar notificación de éxito
      toast.success('Rutina actualizada correctamente', {
        timeout: 3000,
        closeOnClick: true,
        draggable: true
      })
      
      return data
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido al actualizar la rutina'
      console.error('Error en updateRoutine:', err)
      
      if (!errorMsg.includes('No se pudo autenticar') && 
          !errorMsg.includes('nombre de la rutina') && 
          !errorMsg.includes('día de la semana')) {
        toast.error('Error al procesar la solicitud', {
          timeout: 5000,
          closeOnClick: true,
          draggable: true
        })
      }
      
      error.value = errorMsg
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteRoutine(id: string) {
    const toast = useToast()
    try {
      loading.value = true
      error.value = null

      if (!authStore.isAuthenticated) {
        const errorMsg = 'No se pudo autenticar al usuario. Por favor, inicia sesión nuevamente.'
        error.value = errorMsg
        toast.error(errorMsg, {
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: true,
          hideProgressBar: false,
          closeButton: 'button',
          icon: true,
          rtl: false
        })
        throw new Error(errorMsg)
      }

      const { error: supabaseError } = await supabase
        .from('routines')
        .delete()
        .eq('id', id)
        .eq('user_id', authStore.user?.id)

      if (supabaseError) {
        console.error('Error al eliminar la rutina:', supabaseError)
        const errorMsg = `Error al eliminar la rutina: ${supabaseError.message}`
        toast.error('No se pudo eliminar la rutina', {
          timeout: 5000,
          closeOnClick: true,
          draggable: true
        })
        throw new Error(errorMsg)
      }

      // Actualizar el estado local
      routines.value = routines.value.filter(r => r.id !== id)
      
      // Mostrar notificación de éxito
      toast.success('Rutina eliminada correctamente', {
        timeout: 3000,
        closeOnClick: true,
        draggable: true
      })
      
      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido al eliminar la rutina'
      console.error('Error en deleteRoutine:', err)
      
      if (!errorMsg.includes('No se pudo autenticar')) {
        toast.error('Error al procesar la solicitud', {
          timeout: 5000,
          closeOnClick: true,
          draggable: true
        })
      }
      
      error.value = errorMsg
      throw err
    }
  }

  async function getRoutineById(id: string): Promise<Routine | null> {
    try {
      loading.value = true
      error.value = null

      const { data, error: supabaseError } = await supabase
        .from('routines')
        .select('*')
        .eq('id', id)
        .single()

      if (supabaseError) throw supabaseError
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al obtener la rutina'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    routines: computed(() => routines.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    selectedRoutine: computed(() => selectedRoutine.value),
    fetchRoutines,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutineById,
    setSelectedRoutine: (routine: Routine | null) => {
      selectedRoutine.value = routine
    }
  }
})
