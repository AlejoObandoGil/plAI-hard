import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'
import type { User } from '@supabase/supabase-js'
import { ref, computed } from 'vue'

// Tipos para mayor claridad y ayuda de TypeScript
type AuthUser = User | null

export const useAuthStore = defineStore('auth', () => {
  // Estado reactivo
  const user = ref<AuthUser>(null) // Usuario actual
  const loading = ref(false) // Estado de carga
  const error = ref<string | null>(null) // Mensaje de error

  // Getter para saber si hay usuario autenticado
  const isAuthenticated = computed(() => !!user.value)

  // Acción: Registrar usuario con email y password
  async function register(email: string, password: string) {
    loading.value = true
    error.value = null
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    loading.value = false
    if (signUpError) {
      error.value = signUpError.message
      return false
    }
    user.value = data.user
    return true
  }

  // Acción: Login con email y password
  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    loading.value = false
    if (signInError) {
      error.value = signInError.message
      return false
    }
    user.value = data.user
    return true
  }

  // Acción: Logout
  async function logout() {
    loading.value = true
    error.value = null
    const { error: signOutError } = await supabase.auth.signOut()
    loading.value = false
    if (signOutError) {
      error.value = signOutError.message
      return false
    }
    user.value = null
    return true
  }

  // Acción: Cargar usuario actual (útil al recargar la página)
  async function fetchUser() {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
  }

  // Acción: Enviar email para resetear contraseña
  async function resetPassword(email: string) {
    loading.value = true
    error.value = null
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email)
    loading.value = false
    if (resetError) {
      error.value = resetError.message
      return false
    }
    return true
  }

  // Acción: Login con proveedor OAuth (Google, GitHub, etc.)
  async function loginWithProvider(provider: 'google' | 'facebook') {
    loading.value = true
    error.value = null
    // Esto abrirá una ventana emergente o redirigirá al usuario al flujo de OAuth
    const { error: oauthError } = await supabase.auth.signInWithOAuth({ provider })
    loading.value = false
    if (oauthError) {
      error.value = oauthError.message
      return false
    }
    // El usuario será redirigido de vuelta a tu app al finalizar el flujo
    return true
  }

  // Escuchar cambios de sesión (login/logout desde otras pestañas)
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })

  // Al inicializar la store, intentamos cargar el usuario actual
  fetchUser()

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    resetPassword,
    loginWithProvider,
  }
})

/*
SUGERENCIAS:
- Puedes extender esta store para soportar login con Google, GitHub, etc., usando supabase.auth.signInWithOAuth({ provider: 'google' })
- Siempre maneja loading y error en la UI para mejor experiencia.
- Puedes proteger rutas usando el getter isAuthenticated.
*/
