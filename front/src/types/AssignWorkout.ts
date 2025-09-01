export interface AssignWorkout {
	ClienteID?: ((id: number) => void);
	Assign: boolean;
	closeSelf?: () => void;
}