<template>
  <header class="hidden md:block bg-accent-card text-accent p-4 shadow-soft relative">
    <div class="px-7">
      <div class="grid grid-cols-3 items-center">
        <div class="col-start-1">
          <h1 class="text-2xl font-display">pl<span class="text-secondary">AI</span> Hard</h1>
        </div>
        <nav class="col-start-2 flex justify-center items-center space-x-8">
          <router-link
            to="/"
            class="hover:text-secondary transition-colors"
            active-class="text-secondary"
            >Inicio</router-link
          >
          <router-link
            to="/exercises"
            class="hover:text-secondary transition-colors"
            active-class="text-secondary"
            >Ejercicios</router-link
          >
          <router-link
            to="/training"
            class="hover:text-secondary transition-colors"
            active-class="text-secondary"
            >Entrenamiento</router-link
          >
          <router-link
            to="/about"
            class="hover:text-secondary transition-colors"
            active-class="text-secondary"
            >Info</router-link
          >
        </nav>
        <div class="col-start-3 flex justify-end">
          <template v-if="isAuthenticated">
            <!-- Avatar y dropdown de usuario -->
            <ProfileDropdown :open="dropdownOpen" @toggle="dropdownOpen = !dropdownOpen" />
          </template>
          <template v-else>
            <!-- Botón acceder -->
            <button
              @click="goToLogin"
              class="flex items-center px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              <svg
                class="w-5 h-5 mr-2"
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
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import ProfileDropdown from './ProfileDropdown.vue'

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const dropdownOpen = ref(false)

function goToLogin() {
  router.push('/login')
}
</script>
