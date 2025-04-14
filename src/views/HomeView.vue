<script setup lang="ts">
// Main view component
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Bienvenido a plAI hard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <router-link
        to="/exercises"
        class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <h2 class="text-2xl font-semibold mb-4">Explorar Ejercicios</h2>
        <p class="text-gray-600">
          Descubre nuestra amplia biblioteca de ejercicios y encuentra los que mejor se adapten a
          tus objetivos.
        </p>
      </router-link>

      <router-link
        to="/my-routine"
        class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <h2 class="text-2xl font-semibold mb-4">Mi Rutina</h2>
        <p class="text-gray-600">
          Crea y gestiona tu rutina personalizada de entrenamiento para la semana.
        </p>
      </router-link>
    </div>
  </div>
</template>
