import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Exercise } from './exercise'

interface RoutineDay {
  day: string
  exercises: Exercise[]
}

export const useRoutineStore = defineStore('routine', () => {
  const weeklyRoutine = ref<RoutineDay[]>([
    { day: 'Lunes', exercises: [] },
    { day: 'Martes', exercises: [] },
    { day: 'Miércoles', exercises: [] },
    { day: 'Jueves', exercises: [] },
    { day: 'Viernes', exercises: [] },
    { day: 'Sábado', exercises: [] },
    { day: 'Domingo', exercises: [] },
  ])

  const addExerciseToDay = (day: string, exercise: Exercise) => {
    const dayIndex = weeklyRoutine.value.findIndex((d) => d.day === day)
    if (dayIndex !== -1) {
      weeklyRoutine.value[dayIndex].exercises.push(exercise)
    }
  }

  const removeExerciseFromDay = (day: string, exerciseId: string) => {
    const dayIndex = weeklyRoutine.value.findIndex((d) => d.day === day)
    if (dayIndex !== -1) {
      weeklyRoutine.value[dayIndex].exercises = weeklyRoutine.value[dayIndex].exercises.filter(
        (ex) => ex.id !== exerciseId,
      )
    }
  }

  const clearDay = (day: string) => {
    const dayIndex = weeklyRoutine.value.findIndex((d) => d.day === day)
    if (dayIndex !== -1) {
      weeklyRoutine.value[dayIndex].exercises = []
    }
  }

  return {
    weeklyRoutine,
    addExerciseToDay,
    removeExerciseFromDay,
    clearDay,
  }
})
