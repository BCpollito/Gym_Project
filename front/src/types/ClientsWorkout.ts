import { Workout } from "./Workout/workout";

export interface ClientsWorkout {
  id: number; 
  clienteID: number; 
  workoutID: number; 
  dateAssign: string;
  Workout: Workout;
}
