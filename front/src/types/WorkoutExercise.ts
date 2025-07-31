import { Exercise } from "./Exercises";

export interface WorkoutExercise {
  id: number;
  bloqueID: number;
  ejercicioID: number;
  series: number;
  objetivo: number;
  tiempoDescanso: number;
  instrucciones: string;
  orden: number;
  Ejercicio: Exercise;
}
