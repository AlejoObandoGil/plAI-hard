<template>
  <main class="min-h-screen flex flex-col justify-center items-center px-4">
    <div class="w-full max-w-sm bg-accent-card rounded-2xl shadow-soft p-6 flex flex-col gap-6">
      <h2 class="text-2xl font-display text-center text-primary mb-2">Crear cuenta</h2>
      <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <div>
          <label class="text-sm text-primary mb-1 block">Email</label>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full px-4 py-2 rounded-lg border border-primary/20 focus:border-primary outline-none bg-accent-dark"
          />
        </div>
        <div>
          <label class="text-sm text-primary mb-1 block">Contraseña</label>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="new-password"
            minlength="6"
            class="w-full px-4 py-2 rounded-lg border border-primary/20 focus:border-primary outline-none bg-accent-dark"
          />
        </div>
        <div>
          <label class="text-sm text-primary mb-1 block">Repetir contraseña</label>
          <input
            v-model="repeatPassword"
            type="password"
            required
            autocomplete="new-password"
            minlength="6"
            class="w-full px-4 py-2 rounded-lg border border-primary/20 focus:border-primary outline-none bg-accent-dark"
          />
        </div>
        <button
          :disabled="loading"
          type="submit"
          class="w-full bg-primary text-white rounded-lg py-2 font-bold mt-2 hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center"
        >
          <span v-if="!loading">Crear cuenta</span>
          <svg
            v-else
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </button>
      </form>
      <button
        @click="handleRegisterWithGoogle"
        :disabled="loading"
        class="w-full flex items-center justify-center gap-2 bg-white border border-primary/20 text-primary font-semibold rounded-lg py-2 hover:bg-primary/10 transition-colors disabled:opacity-60"
      >
        <svg class="w-5 h-5" viewBox="0 0 48 48">
          <g>
            <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.09 2.97 30.47 0.5 24 0.5 14.61 0.5 6.44 6.44 2.69 14.35l7.98 6.2C12.14 14.38 17.58 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.44-4.74H24v9.24h12.39c-.54 2.9-2.19 5.36-4.67 7.03l7.25 5.64C43.55 37.07 46.1 31.27 46.1 24.5z"/>
            <path fill="#FBBC05" d="M10.67 28.55A14.48 14.48 0 019.5 24c0-1.57.27-3.1.75-4.55l-7.98-6.2A23.456 23.456 0 000 24c0 3.74.9 7.26 2.5 10.35l8.17-6.35z"/>
            <path fill="#EA4335" d="M24 47.5c6.47 0 12.09-2.14 16.64-5.83l-7.25-5.64c-2.02 1.36-4.6 2.17-7.39 2.17-6.42 0-11.86-4.88-13.33-11.35l-8.17 6.35C6.44 41.56 14.61 47.5 24 47.5z"/>
          </g>
        </svg>
        Registrarse con Google
      </button>
      <div
        v-if="error"
        class="bg-error/10 border border-error text-error rounded-lg px-4 py-2 text-center text-sm"
      >
        {{ error }}
      </div>
      <div class="flex flex-col gap-2 mt-2 text-center">
        <router-link to="/login" class="text-primary hover:underline">¿Ya tienes cuenta? Inicia sesión</router-link>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticated, loading, error } = storeToRefs(authStore)

const email = ref('')
const password = ref('')
const repeatPassword = ref('')

watchEffect(() => {
  if (isAuthenticated.value) {
    router.replace('/')
  }
})

async function handleRegister() {
  if (password.value !== repeatPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }
  await authStore.register(email.value, password.value)
}

async function handleRegisterWithGoogle() {
  await authStore.loginWithProvider('google')
}
</script>
