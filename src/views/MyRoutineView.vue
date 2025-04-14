<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Mi Rutina Semanal</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="day in weeklyRoutine" :key="day.day" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">{{ day.day }}</h2>

        <div v-if="day.exercises.length === 0" class="text-gray-500">
          <p>No hay ejercicios programados</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="exercise in day.exercises" :key="exercise.id" class="border rounded p-3">
            <h3 class="font-medium">{{ exercise.name }}</h3>
            <p class="text-sm text-gray-600">{{ exercise.target }}</p>
            <button
              @click="removeExerciseFromDay(day.day, exercise.id)"
              class="mt-2 text-red-500 text-sm hover:text-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>

        <button @click="clearDay(day.day)" class="mt-4 text-red-500 hover:text-red-700">
          Limpiar día
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoutineStore } from '../stores/routine'

const routineStore = useRoutineStore()
const { weeklyRoutine, removeExerciseFromDay, clearDay } = routineStore
</script>
