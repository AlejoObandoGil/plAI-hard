<template>
  <main class="min-h-screen flex flex-col justify-center items-center px-4">
    <div class="w-full max-w-sm bg-accent-card rounded-2xl shadow-soft p-6 flex flex-col gap-6">
      <h2 class="text-2xl font-display text-center text-primary mb-2">Recuperar contraseña</h2>
      <form @submit.prevent="handleForgotPassword" class="flex flex-col gap-4">
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
        <button
          :disabled="loading"
          type="submit"
          class="w-full bg-primary text-white rounded-lg py-2 font-bold mt-2 hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center"
        >
          <span v-if="!loading">Enviar enlace de recuperación</span>
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
      <div
        v-if="success"
        class="bg-success/10 border border-success text-success rounded-lg px-4 py-2 text-center text-sm"
      >
        {{ success }}
      </div>
      <div
        v-if="error"
        class="bg-error/10 border border-error text-error rounded-lg px-4 py-2 text-center text-sm"
      >
        {{ error }}
      </div>
      <div class="flex flex-col gap-2 mt-2 text-center">
        <router-link to="/login" class="text-primary hover:underline">Volver a iniciar sesión</router-link>
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
const success = ref('')

watchEffect(() => {
  if (isAuthenticated.value) {
    router.replace('/')
  }
})

async function handleForgotPassword() {
  success.value = ''
  error.value = ''
  const result = await authStore.forgotPassword(email.value)
  if (result?.success) {
    success.value = '¡Te hemos enviado un enlace de recuperación a tu correo!'
  } else if (result?.error) {
    error.value = result.error
  }
}
</script>
