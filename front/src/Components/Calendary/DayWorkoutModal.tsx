import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
	Button,
	List,
	ListItem,
	IconButton
} from "@material-tailwind/react";
import {
	Zap,
	X
} from "lucide-react";
import { WorkoutClientData } from "../../types/Calendary/WorkoutClientData";
import { mesesDelAño } from "../../types/Calendary/MonthsOfYears";

export default function DayWorkoutModal({ open, onClose, day, workoutsDay, signback }: WorkoutClientData) {
	const handleAddNew = () => {
		signback!();
		onClose();
	}
	return (
		<>
			{/*@ts-ignore*/}
			<Dialog color="red" open={open}
				handler={onClose}
				className="h-[90svh]"
			>
				{/*@ts-ignore*/}
				<DialogHeader className="flex justify-between pb-0">
					<div>
						{/*@ts-ignore*/}
						<Typography variant="h5">{`${day.day} ${mesesDelAño[day.month]} ${day.year}`}</Typography>
						{/*@ts-ignore*/}
						<Typography>Tareas del dia</Typography>
					</div>
					{/*@ts-ignore*/}
					<IconButton className="mb-5" onClick={onClose} variant="text" size="sm"><X /></IconButton>
				</DialogHeader>
				{/*@ts-ignore*/}
				<DialogBody className="overflow-y-scroll h-[68svh] pt-0">
					{/*@ts-ignore*/}
					{/*@ts-ignore*/}
					<List color="red" className="w-full">
						{workoutsDay?.map((w) => (
							//@ts-ignore
							<ListItem className="border border-gray-500 p-2 grid grid-cols-1 rounded rounded-1">
								{/*@ts-ignore*/}
								<Typography variant="paragraph" className="font-bold line-clamp-1">{w.Workout.nombre}</Typography>
								<span className="flex text-xs items-center gap-1"><Zap size={15} />Workout</span>
							</ListItem>
						))}
					</List>
				</DialogBody>
				{/*@ts-ignore*/}
				<DialogFooter>
					{/*@ts-ignore*/}
					<Button onClick={handleAddNew} variant="gradient" color="amber">Añadir nuevo</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
}