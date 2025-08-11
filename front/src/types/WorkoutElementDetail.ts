import { Bloque } from "./Bloque";
import { Descanso } from "./Descanso";

export type WorkoutElementDetail =
  | { tipo: 'Bloque'; data: Bloque }
  | { tipo: 'Descanso'; data: Descanso };
