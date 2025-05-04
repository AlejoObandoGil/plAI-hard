// src/types/routines.ts

export interface Routine {
  id: string
  name: string
  description?: string
  objective?: string
  day_of_the_week?: string
  is_public: boolean
  user_id: string
  created_at: string
}

export interface RoutineFormData {
  name: string
  description?: string
  objective?: string
  day_of_the_week?: string
  is_public: boolean
}
