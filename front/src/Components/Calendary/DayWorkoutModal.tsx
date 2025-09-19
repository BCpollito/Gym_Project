import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
	Button,
	List,
	ListItem,
	Card
} from "@material-tailwind/react";
import { ClientsWorkout } from "../../types/ClientsWorkout";

interface wokoutClientData {
	open: boolean;
	onClose: () => void;
	day: number | null;
	workoutsDay?: ClientsWorkout[];
}

export default function DayWorkoutModal(wokoutClientData: wokoutClientData) {
	return (
		<>
			{/*@ts-ignore*/}
			<Dialog color="red" open={open}
				handler={wokoutClientData.onClose}
				className="max-h-[80svh]"
			>
				{/*@ts-ignore*/}
				<DialogHeader>
					{/*@ts-ignore*/}
					<Typography variant="h3">{`Programacion dia ${wokoutClientData.day}`}</Typography>
				</DialogHeader>
				{/*@ts-ignore*/}
				<DialogBody className="overflow-y-scroll max-h-[50svh]">
					{/*@ts-ignore*/}
					<Card className="w-full">
						{/*@ts-ignore*/}
						<List color="red" className="w-full">
							{wokoutClientData.workoutsDay?.map((w) => (
								//@ts-ignore
								<ListItem className="bg-green-200">
									{/*@ts-ignore*/}
									<Typography color="blue-gray" className="font-bold line-clamp-1">{w.Workout.nombre}</Typography>

								</ListItem>
							))}
						</List>
					</Card>
				</DialogBody>
				{/*@ts-ignore*/}
				<DialogFooter>
					{/*@ts-ignore*/}
					<Button variant="outlined" color="red" onClick={wokoutClientData.onClose}>Cerrar</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
}