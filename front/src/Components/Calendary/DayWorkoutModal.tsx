import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
	Button,
	List,
	ListItem,
	IconButton,
} from "@material-tailwind/react";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "@hello-pangea/dnd";
import {
	Zap,
	X
} from "lucide-react";
import { WorkoutClientData } from "../../types/Calendary/WorkoutClientData";
import { mesesDelAño } from "../../types/Calendary/MonthsOfYears";
import { useAssignWorkout } from "../../Hooks/Calendary/useAssignWorkout"
import { ClientsWorkout } from "../../types/ClientsWorkout";
import { useClientWorkoutDnD } from "../../Hooks/useClientWorkoutDnD";

export default function DayWorkoutModal({ open, onClose, day, workoutsDay, signback }: WorkoutClientData) {

	// Usamos el hook que contiene la lógica del DnD y el estado
	const {
		items: workoutsDayFilter,
		setItems,
		onDragEnd,
	} = useClientWorkoutDnD(workoutsDay ?? []);

	const pulse = () => {
		console.log("recibido");
	}

	const {
		DeleteWorkoutClient
	} = useAssignWorkout({ pulse });

	const handleAddNew = () => {
		signback!();
		onClose();
	}

	const WorkoutOptions = (id: number, name: string) => {
		const sino = window.confirm(`Eliminar ${name}?`)

		if (sino) {
			DeleteWorkoutClient(id);
			// Actualizamos el estado local del hook
			setItems(prev => prev.filter(WK => WK.id !== id));
		}
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

				{/* DnD context */}
				{/*@ts-ignore*/}
				<DialogBody className="overflow-y-scroll h-[68svh] pt-0">
					{/*@ts-ignore*/}
					<DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
						{/*@ts-ignore*/}
						<Droppable droppableId="workouts-list">
							{(provided) => (
								//@ts-ignore
								<List
									color="red"
									className="w-full"
									ref={provided.innerRef as any}
									{...provided.droppableProps}
								>
									{workoutsDayFilter?.map((w, index) => (
										<Draggable key={w.id} draggableId={String(w.id)} index={index}>
											{(prov) => (
												// Envolver el ListItem en un wrapper que reciba las props del draggable
												<div
													ref={prov.innerRef}
													{...prov.draggableProps}
													{...prov.dragHandleProps}
													className="mb-2"
												>
													{/*@ts-ignore*/}
													<ListItem
														onClick={() => WorkoutOptions(w.id, w.Workout.nombre)}
														className="border border-gray-500 p-2 grid grid-cols-1 rounded rounded-1 cursor-move"
													>
														{/*@ts-ignore*/}
														<Typography variant="paragraph" className="font-bold line-clamp-1">{w.Workout.nombre}</Typography>
														<span className="flex text-xs items-center gap-1"><Zap size={15} />Workout</span>
													</ListItem>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</List>
							)}
						</Droppable>
					</DragDropContext>
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