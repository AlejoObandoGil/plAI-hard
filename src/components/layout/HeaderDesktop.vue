<template>
  <header class="hidden md:block bg-accent-card text-accent p-4 shadow-soft relative">
    <div class="px-7">
      <div class="grid grid-cols-3 items-center">
        <div class="col-start-1">
          <h1 class="text-2xl font-display">plAI Hard</h1>
        </div>
        <nav class="col-start-2 flex justify-center items-center space-x-8">
          <router-link to="/" class="hover:text-secondary transition-colors" active-class="text-secondary">Inicio</router-link>
          <router-link to="/exercises" class="hover:text-secondary transition-colors" active-class="text-secondary">Ejercicios</router-link>
          <router-link to="/my-routine" class="hover:text-secondary transition-colors" active-class="text-secondary">Mi Rutina</router-link>
          <router-link to="/about" class="hover:text-secondary transition-colors" active-class="text-secondary">Info</router-link>
        </nav>
        <div class="col-start-3 flex justify-end">
          <slot name="profile-dropdown"></slot>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// No props ni lógica local, el dropdown se pasa por slot
</script>
