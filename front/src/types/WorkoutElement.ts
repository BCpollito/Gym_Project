export interface WorkoutElement {
    workoutID: number;
    tipo: "Bloque" | "Descanso" ;
    elementoID: number; 
    orden: number;
}