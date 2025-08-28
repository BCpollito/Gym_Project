import { Bloque } from "./Bloque";
import { Descanso } from "./Descanso";

export type WorkoutElementDetail =
  | { IDelement: number, tipo: 'Bloque'; data: Bloque, orden: number }
  | { IDelement: number, tipo: 'Descanso'; data: Descanso, orden: number };
