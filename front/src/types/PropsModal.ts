import { Exercise } from "./Exercises";

export interface PropsModal {
  open: boolean;
  onClose: () => void;
  modo?: "crear" | "Ver";
  ejercicioExistente?: Exercise | null;
}
