export interface WorkoutElement {
	IDelement: number;
    workoutID: number;
    tipo: "Bloque" | "Descanso" ;
    elementoID: number; 
    orden: number;
}