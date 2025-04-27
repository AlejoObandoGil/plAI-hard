<template>
  <div class="relative">
    <button @click="$emit('toggle')" class="flex items-center">
      <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
        <span class="text-accent font-medium text-lg">{{ userInitials }}</span>
      </div>
    </button>
    <div
      v-if="open"
      class="absolute right-0 mt-2 w-48 bg-accent-card rounded-lg shadow-lg py-2 z-50"
    >
      <a href="#" class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary"
        >Mi Perfil</a
      >
      <a href="#" class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary"
        >Configuración</a
      >
      <button
        @click="handleLogout"
        class="block w-full text-left px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary"
      >
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

defineProps<{ open: boolean }>()
defineEmits(['toggle'])

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const userInitials = computed(() => {
  if (!user.value?.email) return 'U'
  const name = user.value.email.split('@')[0]
  return name.slice(0, 2).toUpperCase()
})

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}
</script>
