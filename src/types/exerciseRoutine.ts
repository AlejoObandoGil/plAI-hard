export interface RoutineExercise {
  id: string
  routineId: string
  exerciseId: string
  sets: number | null
  reps: number | null
  weight: number | null
  tempo: string | null
  restSeconds: number | null
  order: number | null
  notes: string | null
  createdAt: string
  updatedAt: string | null
  exercises?: {
    id: string
    name: string
    bodyPart?: string
    equipment?: string
    target?: string
    gifUrl?: string
  }
}
