<template>
  <div class="min-h-screen p-6 flex flex-col items-center">
    <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-8 tracking-tight drop-shadow-lg">
      Rutinas
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
      <TrainingCard
        to="/training/my-routines"
        title="Mis Rutinas"
        description="Crea y gestiona tus rutinas personalizadas."
        icon-bg="bg-primary"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </template>
      </TrainingCard>
      <TrainingCard
        to="/training/history"
        title="Historial"
        description="Consulta tu registro de sesiones anteriores."
        icon-bg="bg-secondary"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-10 h-10"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
          </svg>
        </template>
      </TrainingCard>
      <TrainingCard
        to="/training/progress"
        title="Progreso"
        description="Visualiza tu avance y estadísticas."
        icon-bg="bg-tertiary"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 17l6-6 4 4 8-8"
            />
          </svg>
        </template>
      </TrainingCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import TrainingCard from '@/components/training/TrainingCard.vue'
</script>

<style scoped></style>
