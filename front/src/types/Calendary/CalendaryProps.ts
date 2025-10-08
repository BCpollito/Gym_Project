import { ClientsWorkout } from "../ClientsWorkout";

export interface CalendaryProps {
	mode?: "cliente";
	idClient?: number;
	signBack?: () => void;
	setday?: (date :{day: number, month: number, year: number}) => void;
	setWorkoutsDay?: (ClientsWorkout: ClientsWorkout[]) => void;
	refresh?: boolean;
}