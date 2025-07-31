import { WorkoutExercise } from "./WorkoutExercise";

export interface Bloque {
  id: number;
  workoutID: number;
  nombre: string;
  descripcion: string;
  WorkoutExercises: WorkoutExercise[];
}
