<template>
  <header class="bg-accent-card text-accent p-4 shadow-soft md:hidden">
    <div class="flex justify-between items-center px-4">
      <h1 class="text-2xl font-display">pl<span class="text-secondary">AI</span> Hard</h1>
      <div class="flex items-center space-x-2">
        <template v-if="!isAuthenticated">
          <button
            @click="goToLogin"
            class="flex items-center px-3 py-1 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <svg
              class="w-5 h-5 mr-1"
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
        <template v-else>
          <!-- Avatar que despliega el sidebar -->
          <button
            @click="$emit('open-sidebar')"
            class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <span class="text-accent font-medium text-lg">{{ userInitials }}</span>
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

const userInitials = computed(() => {
  if (!user.value?.email) return 'U'
  const name = user.value.email.split('@')[0]
  return name.slice(0, 2).toUpperCase()
})

function goToLogin() {
  router.push('/login')
}

defineEmits(['open-sidebar'])
</script>
