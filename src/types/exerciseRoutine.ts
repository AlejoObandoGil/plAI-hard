export interface Exercise {
  id: string
  name: string
  nameSpanish: string
  bodyPart?: string
  equipment?: string
  target?: string
  gifUrl?: string
  createdAt?: string
  updatedAt?: string | null

  // Propiedades alternativas para compatibilidad con la base de datos
  name_spanish?: string
  body_part?: string
  gif_url?: string
  created_at?: string
  updated_at?: string | null
}

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
  exercise?: Exercise

  // Propiedades alternativas para compatibilidad con la base de datos
  routine_id?: string
  exercise_id?: string
  rest_seconds?: number | null
  created_at?: string
  updated_at?: string | null
}
