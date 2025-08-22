import { Exercise } from "./Exercises";

export interface PropsModal {
  open: boolean;
  onClose: () => void;
  refresh?: () => void;
  modo?: "crear" | "Ver" | "Bloque" | "Descanso" | "Ejercicio";
  ejercicioExistente?: Exercise | null;
  idworkout?: string | null;
  elementorder?: number | null;
}
