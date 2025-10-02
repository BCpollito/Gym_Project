import { ClientsWorkout } from "../ClientsWorkout";

export interface WorkoutClientData {
	idClient?: number;
	open: boolean;
	onClose: () => void;
	day: { day: number, month: number, year: number } | null;
	workoutsDay?: ClientsWorkout[];
	signback?: () => void;
}