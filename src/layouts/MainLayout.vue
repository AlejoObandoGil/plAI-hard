<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header Mobile -->
    <header class="bg-accent-card text-accent p-4 shadow-soft md:hidden">
      <div class="flex justify-between items-center px-4">
        <h1 class="text-xl font-display">plAI Hard</h1>
        <button @click="isMobileSidebarOpen = true">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!isMobileSidebarOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- Header Desktop -->
    <header class="hidden md:block bg-accent-card text-accent p-4 shadow-soft relative">
      <div class="px-7">
        <div class="grid grid-cols-3 items-center">
          <!-- Logo -->
          <div class="col-start-1">
            <h1 class="text-2xl font-display">plAI Hard</h1>
          </div>

          <!-- Navegación Centrada -->
          <nav class="col-start-2 flex justify-center items-center space-x-8">
            <router-link
              to="/"
              class="hover:text-secondary transition-colors"
              active-class="text-secondary"
            >
              Inicio
            </router-link>
            <router-link
              to="/exercises"
              class="hover:text-secondary transition-colors"
              active-class="text-secondary"
            >
              Ejercicios
            </router-link>
            <router-link
              to="/my-routine"
              class="hover:text-secondary transition-colors"
              active-class="text-secondary"
            >
              Mi Rutina
            </router-link>
            <router-link
              to="/about"
              class="hover:text-secondary transition-colors"
              active-class="text-secondary"
            >
              Info
            </router-link>
          </nav>

          <!-- Avatar y Dropdown -->
          <div class="col-start-3 flex justify-end">
            <div class="relative">
              <button @click="isProfileOpen = !isProfileOpen" class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <span class="text-accent font-medium">JD</span>
                </div>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="isProfileOpen"
                class="absolute right-0 mt-2 w-48 bg-accent-card rounded-lg shadow-lg py-2 z-50"
              >
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
                <a
                  href="#"
                  class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary"
                  >Cerrar Sesión</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar móvil -->
    <transition name="slide">
      <div
        v-if="isMobileSidebarOpen"
        class="fixed inset-0 z-50 bg-black/30 flex justify-end"
        @click.self="isMobileSidebarOpen = false"
      >
        <div class="w-64 bg-accent-card h-full shadow-xl p-6 flex flex-col animate-slide-in-right">
          <button class="self-end mb-6" @click="isMobileSidebarOpen = false">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
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
          <a
            href="#"
            class="block px-4 py-2 text-primary hover:bg-primary-light hover:text-secondary"
            >Cerrar Sesión</a
          >
        </div>
      </div>
    </transition>

    <!-- Main Content -->
    <main class="flex-1 px-4 pb-20 md:pb-4">
      <slot></slot>
    </main>

    <!-- Mobile Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-accent-card text-accent md:hidden">
      <div class="flex justify-around items-center h-16">
        <router-link to="/" class="flex flex-col items-center p-2" active-class="text-secondary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span class="text-xs mt-1">Inicio</span>
        </router-link>
        <router-link
          to="/exercises"
          class="flex flex-col items-center p-2"
          active-class="text-secondary"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span class="text-xs mt-1">Ejercicios</span>
        </router-link>
        <router-link
          to="/my-routine"
          class="flex flex-col items-center p-2"
          active-class="text-secondary"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span class="text-xs mt-1">Mi Rutina</span>
        </router-link>
        <router-link
          to="/about"
          class="flex flex-col items-center p-2"
          active-class="text-secondary"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-xs mt-1">Info</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isProfileOpen = ref(false)
const isMobileSidebarOpen = ref(false)
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
.router-link-active {
  @apply text-secondary;
}
</style>
