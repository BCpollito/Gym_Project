import { Bloque } from "./Bloque";
import { Descanso } from "./Descanso";

export type WorkoutElementDetail =
  | { tipo: 'bloque'; data: Bloque }
  | { tipo: 'descanso'; data: Descanso };
