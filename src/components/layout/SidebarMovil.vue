<template>
  <transition name="slide">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 bg-black/30 flex justify-end"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="w-64 bg-accent-card h-full shadow-xl p-6 flex flex-col animate-slide-in-right">
        <button class="self-end mb-6" @click="$emit('update:modelValue', false)">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <template v-if="isAuthenticated">
          <!-- Avatar y menú de usuario -->
          <div class="flex flex-col items-center mb-6">
            <div class="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-2">
              <span class="text-accent font-medium text-2xl">{{ userInitials }}</span>
            </div>
            <span class="text-primary font-semibold">{{ userEmail }}</span>
          </div>
          <a
            href="#"
            class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary"
            >Mi Perfil</a
          >
          <a
            href="#"
            class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary"
            >Configuración</a
          >
          <button
            @click="logout"
            class="block w-full text-left px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary"
          >
            Cerrar Sesión
          </button>
        </template>
        <template v-else>
          <button
            @click="goToLogin"
            class="block w-full px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary rounded mb-2"
          >
            <svg
              class="w-5 h-5 inline mr-2"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.246.805 5.879 2.146M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Acceder
          </button>
        </template>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

const userEmail = computed(() => user.value?.email || '')
const userInitials = computed(() => {
  if (!user.value?.email) return 'U'
  const name = user.value.email.split('@')[0]
  return name.slice(0, 2).toUpperCase()
})

function goToLogin() {
  router.push('/login')
  // Cierra el sidebar
  emit('update:modelValue', false)
}

function logout() {
  authStore.logout()
  router.push('/login')
  emit('update:modelValue', false)
}
</script>

<style scoped>
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slide-in-right {
  animation: slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
