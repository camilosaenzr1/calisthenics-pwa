import Dexie, { type EntityTable } from 'dexie';

export interface User {
  id?: number;
  name: string;
  age: number;
  height: number;
  weight: number;
  activity_level: string;
  goal: string;
  created_at: string;
}

export interface BiometricLog {
  id?: number;
  user_id: number;
  date: string;
  weight: number;
  waist?: number;
}

export interface Exercise {
  id?: number;
  name: string;
  pattern: string;
  level: number;
  description: string;
  media_url?: string;
  next_level_criteria?: string;
}

export interface WorkoutLog {
  id?: number;
  user_id: number;
  date: string;
  exercise_id: number;
  sets: number;
  reps: number;
  completed: boolean;
}

export interface Meal {
  id?: number;
  name: string;
  type: string; // 'breakfast', 'lunch', 'dinner', 'snack'
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface NutritionLog {
  id?: number;
  user_id: number;
  date: string; // YYYY-MM-DD
  water_glasses: number;
  meals_eaten: number[]; // Array of meal IDs
}

const db = new Dexie('CalisthenicsNutritionDB') as Dexie & {
  users: EntityTable<User, 'id'>;
  biometrics: EntityTable<BiometricLog, 'id'>;
  exercises: EntityTable<Exercise, 'id'>;
  workout_logs: EntityTable<WorkoutLog, 'id'>;
  meals: EntityTable<Meal, 'id'>;
  nutrition_logs: EntityTable<NutritionLog, 'id'>;
};

db.version(1).stores({
  users: '++id, name',
  biometrics: '++id, user_id, date',
  exercises: '++id, pattern, level',
  workout_logs: '++id, user_id, date, exercise_id',
  meals: '++id, type, name',
  nutrition_logs: '++id, user_id, date'
});

export { db };
