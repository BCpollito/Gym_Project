import { Exercise } from "./Exercises";
import { Workout } from "./Workout/workout";

export interface PropsModal {
  open: boolean;
  onClose: () => void;
  refresh?: () => void;
  modo?: "crear" | "Ver" | "Bloque" | "Descanso" | "Ejercicio";
  ejercicioExistente?: Exercise | null;
  workoutExistente?: Workout | null; 
  idworkout?: number | null;
  id?: number | null; 
  elementorder?: number | null;
}
