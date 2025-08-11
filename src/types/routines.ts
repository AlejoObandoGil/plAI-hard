// src/types/routines.ts

export interface Routine {
  id: string
  user_id: string
  name: string
  description: string | null
  objective: string | null
  day_of_the_week: string | null
  is_public?: boolean
  created_at: string
  updated_at: string | null
}

export interface RoutineFormData {
  name: string
  description: string
  objective: string
  day_of_the_week: string
  is_public?: boolean
}
