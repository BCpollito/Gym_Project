import { ClientsWorkout } from "../ClientsWorkout";

export interface CalendaryProps {
	mode?: "cliente";
	idClient?: number;
	signBack?: () => void;
	setday?: (date :{day: number, month: string, year: Number}) => void;
	setWorkoutsDay?: (ClientsWorkout: ClientsWorkout[]) => void;
	refresh?: boolean;
}