import { Bloque } from "./Bloque";
import { Descanso } from "./Descanso";

export type WorkoutElementDetail =
  | { tipo: 'Bloque'; data: Bloque, orden: number }
  | { tipo: 'Descanso'; data: Descanso, orden: number };
