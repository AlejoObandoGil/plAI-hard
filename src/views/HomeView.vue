<script setup lang="ts">
// Main view component
</script>

<template>
  <div class="min-h-screen text-primary px-7 py-8">
    <h1 class="mb-8">Bienvenido a pl<span class="text-secondary">AI</span> Hard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <router-link
        to="/exercises"
        class="card app-card hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-accent-dark/60 flex flex-col min-h-[240px] p-6"
      >
        <h2 class="mb-4 text-2xl font-bold flex items-center gap-2 text-primary">
          Explorar Ejercicios
        </h2>
        <p class="text-primary/70 flex-1">
          Descubre una amplia biblioteca de ejercicios y encuentra los que mejor se adapten a tus
          objetivos.
        </p>
        <span class="btn btn-ghost mt-6 self-end">Ir</span>
      </router-link>

      <router-link
        to="/training"
        class="card app-card hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-accent-dark/60 flex flex-col min-h-[240px] p-6"
      >
        <h2 class="mb-4 text-2xl font-bold flex items-center gap-2 text-primary">Entrenamiento</h2>
        <p class="text-primary/70 flex-1">
          Crea y gestiona tus rutinas, historial y progreso de entrenamiento.
        </p>
        <span class="btn btn-ghost mt-6 self-end">Ir</span>
      </router-link>
    </div>
  </div>
</template>
