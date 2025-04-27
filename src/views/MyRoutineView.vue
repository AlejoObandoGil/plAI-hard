<template>
  <!-- <div class="min-h-screen bg-accent-dark text-primary px-4 py-8">
    <h1 class="mb-8">Mi Rutina Semanal</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="day in weeklyRoutine" :key="day.day" class="card p-6">
        <h2 class="mb-4">{{ day.day }}</h2>

        <div v-if="day.exercises.length === 0" class="text-primary/60">
          <p>No hay ejercicios programados</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="exercise in day.exercises" :key="exercise.id" class="border rounded p-3 bg-accent">
            <h3 class="font-medium">{{ exercise.name }}</h3>
            <p class="text-sm text-primary/70">{{ exercise.target }}</p>
            <button
              @click="removeExerciseFromDay(day.day, exercise.id)"
              class="mt-2 btn btn-secondary text-xs"
            >
              Eliminar
            </button>
          </div>
        </div>

        <button @click="clearDay(day.day)" class="mt-4 btn btn-primary text-xs">
          Limpiar día
        </button>
      </div>
    </div>
  </div> -->
  <div></div>
</template>

<script setup lang="ts"></script>
