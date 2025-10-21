import {
	Card,
	Typography,
	IconButton,
	Chip
} from "@material-tailwind/react";
import {
	ChevronLeft,
	ChevronRight,
	RotateCcw,
	Zap
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { CalendaryProps } from "../../types/Calendary/CalendaryProps";
import axios from "axios";
import { ClientsWorkout } from "../../types/ClientsWorkout";
import { mesesDelAño, TABLE_HEAD } from "../../types/Calendary/MonthsOfYears";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useClientWorkoutDnDate } from "../../Hooks/Calendary/useClientWorkoutDnDate";

const FechaActual = new Date();

function pad(n: number) {
	return String(n).padStart(2, "0");
}

function formatDateId(year: number, monthZeroBased: number, day: number) {
	// monthZeroBased is 0..11
	return `${year}-${pad(monthZeroBased + 1)}-${pad(day)}`;
}

function Calendary({ mode, idClient, signBack, setday, setWorkoutsDay, refresh }: CalendaryProps) {
	const [CurrentDate, setCurrentDate] = useState<Date>(new Date(FechaActual.getFullYear(), FechaActual.getMonth(), 1));
	const [Day, setDay] = useState<(number | string)[][]>([]);

	const [WorkoutsOfClient, setWorkouts] = useState<ClientsWorkout[]>([]);
	const [assignedDays, setAssignedDays] = useState<number[]>([]);

	useEffect(() => {
		const getClientsWorkouts = async () => {
			try {
				const response = await axios.get<ClientsWorkout[]>(`/client-workouts/${idClient}`);
				setWorkouts(response.data);
			} catch (error: any) {
				const message = error.response?.data?.message || "error desconocido";
				alert("Error: " + message);
			}
		};

		if (mode === "cliente") {
			getClientsWorkouts();
		}
	}, [mode, idClient, refresh]);

	// Hook para manejar DnD entre días
	// Le pasamos los workouts del cliente y un callback opcional para persistir cada movimiento
	const {
		items: itemsWorkouts,
		setItems: setItemsWorkouts,
		onDragEnd
	} = useClientWorkoutDnDate(WorkoutsOfClient, async (movedWorkoutId: number, newDateAssign: string) => {});

	// Si los workouts iniciales cambian desde props, sincronizamos el hook/state
	useEffect(() => {
		setWorkouts(WorkoutsOfClient); // mantener WorkoutsOfClient local sincronizado si lo necesitas
		// El hook useClientWorkoutDnD ya sincroniza su estado con initialItems via su propio useEffect.
	}, [WorkoutsOfClient]);

	useEffect(() => {
		const newDays: (number | string)[][] = [];

		const year = CurrentDate.getFullYear();
		const month = CurrentDate.getMonth();

		const firstDayOfMonth = new Date(year, month, 1);

		const firstWeekDay = firstDayOfMonth.getDay();

		const lastDayCurrentMonth = new Date(year, month + 1, 0).getDate();

		let dayCounter = 1;

		for (let week = 0; week < 5; week++) {
			const weekDays: (number | string)[] = [];

			for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
				if (week === 0 && dayOfWeek < firstWeekDay) {
					weekDays.push("");
				} else if (dayCounter > lastDayCurrentMonth) {
					weekDays.push("");
				} else {
					weekDays.push(dayCounter);
					dayCounter++;
				}
			}

			newDays.push(weekDays);
		}
		setDay(newDays);

		if (mode === "cliente") {
			// Extrae los días asignados del mes actual desde itemsWorkouts (estado del hook)
			const assigned = itemsWorkouts
				.map(workout => {
					const parts = workout.dateAssign.split('-');
					const workoutDate = new Date(
						Number(parts[0]), // año
						Number(parts[1]) - 1, // mes 
						Number(parts[2]) // día
					);
					if (
						workoutDate.getMonth() === CurrentDate.getMonth() &&
						workoutDate.getFullYear() === CurrentDate.getFullYear()
					) {
						return workoutDate.getDate();
					}
					return null;
				})
				.filter(day => day !== null) as number[];

			setAssignedDays(assigned);
		}
	}, [CurrentDate, itemsWorkouts, mode]);

	// Agrupamos workouts por fecha (YYYY-MM-DD)
	const groupedByDate = useMemo(() => {
		const map = new Map<string, ClientsWorkout[]>();
		for (const w of itemsWorkouts) {
			const key = w.dateAssign;
			const arr = map.get(key) ?? [];
			arr.push(w);
			map.set(key, arr);
		}
		return map;
	}, [itemsWorkouts]);

	const handlePassDate = (sign: "next" | "prev" | "restar") => {
		if (sign === "next") {
			setCurrentDate(new Date(CurrentDate.getFullYear(), CurrentDate.getMonth() + 1, 1));
		}

		if (sign === "prev") {
			setCurrentDate(new Date(CurrentDate.getFullYear(), CurrentDate.getMonth() - 1, 1));
		}

		if (sign === "restar") {
			setCurrentDate(new Date(FechaActual.getFullYear(), FechaActual.getMonth(), 1));
		}
	};

	const showWorkouts = (day: number, month: number, year: number, Workouts: ClientsWorkout[]) => {
		signBack!();
		setday!({ day, month, year });
		setWorkoutsDay!(Workouts);
	};

	// Handler para cuando se completa un drag (lo delegamos al hook)
	const handleDragEnd = (result: DropResult) => {
		onDragEnd(result);
	};

	return (
		<div className="w-full sm:w-sm flex flex-col border border-blue-gray-100 rounded-[10px] p-4">
			<div className="flex items-center justify-between sm:justify-end space-x-4">
				<h6 className="text-sm sm:text-base">
					{`${mesesDelAño[CurrentDate.getMonth()]} - ${CurrentDate.getFullYear()}`}
				</h6>
				<div className="flex items-center space-x-2">
					{(FechaActual.getMonth() != CurrentDate.getMonth() ||
						FechaActual.getFullYear() != CurrentDate.getFullYear()) &&
						//@ts-ignore
						<IconButton
							onClick={() => handlePassDate("restar")}
							size="sm"
							variant="text"
							className="p-2"
						>
							<RotateCcw />
						</IconButton>
					}
					{/*@ts-ignore*/}
					<IconButton
						onClick={() => handlePassDate("prev")}
						size="sm"
						variant="text"
						className="p-2"
					>
						<ChevronLeft />
					</IconButton>
					{/*@ts-ignore*/}
					<IconButton
						onClick={() => handlePassDate("next")}
						size="sm"
						variant="text"
						className="p-2"
					>
						<ChevronRight />
					</IconButton>
				</div>
			</div>

			{/*@ts-ignore*/}
			<Card className="h-full w-full mt-1">
				<div className="overflow-x-auto">
					<DragDropContext onDragEnd={handleDragEnd}>
						<table className="min-w-full table-auto text-left">
							<thead>
								<tr>
									{TABLE_HEAD.map((head) => (
										<th
											key={head}
											className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 sm:p-4"
										>
											{/*@ts-ignore*/}
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal leading-none opacity-70 text-xs sm:text-sm"
											>
												{head}
											</Typography>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{Day.map((days, rowIndex) => (
									<tr key={rowIndex}>
										{days.map((day, colIndex) => {
											const isEmpty = day == "";
											const year = CurrentDate.getFullYear();
											const month = CurrentDate.getMonth(); // 0..11
											const dayNumber = typeof day === "number" ? day : null;
											const dateId = dayNumber ? formatDateId(year, month, dayNumber) : `empty-${rowIndex}-${colIndex}`;
											const dayWorkouts = dayNumber ? (groupedByDate.get(dateId) ?? []) : [];

											const classes = `p-1 pt-0 text-center border border-gray-200
											${isEmpty && 'bg-blue-gray-50 text-blue-gray-200'}`;

											return (
												<td
													onClick={(typeof (day) === "number")
														? () => showWorkouts(day as number, CurrentDate.getMonth(), CurrentDate.getFullYear(),
															itemsWorkouts.filter(w => w.dateAssign === formatDateId(CurrentDate.getFullYear(), CurrentDate.getMonth(), day as number)))
														: () => console.log("En desarrollo")
													}
													key={colIndex}
													className={`${classes}`}
													>
													{/*@ts-ignore*/}
													<Typography className="font-normal text-gray-800">
														{day}
													</Typography>
													<div className="flex flex-col justify-center items-center gap-1">
														{(isEmpty || typeof day !== "number") ? null : (
															// Droppable por día (id = YYYY-MM-DD)
															<Droppable droppableId={dateId}>
																{(provided, snapshot) => (
																	<div
																		ref={provided.innerRef}
																		{...provided.droppableProps}
																		className={`w-full min-h-[2rem] flex flex-col items-center gap-1 ${snapshot.isDraggingOver ? "bg-blue-50" : ""}`}
																	>
																		{dayWorkouts.slice(0, 3).map((w, idx) => (
																			<Draggable key={w.id} draggableId={String(w.id)} index={idx}>
																				{(prov, snap) => (
																					<div
																						ref={prov.innerRef}
																						{...prov.draggableProps}
																						{...prov.dragHandleProps}
																						className="w-14 overflow-hidden whitespace-nowrap p-0 text-left"
																					>
																						<Chip
																							className="text-[10px] py-0 space-x-3 flex rounded rounded-2 cursor-move"
																							size="sm"
																							color="amber"
																							value={w.Workout.nombre}
																							icon={<Zap size={12} className="h-full" />}
																						/>
																					</div>
																				)}
																			</Draggable>
																		))}
																		{provided.placeholder}
																	</div>
																)}
															</Droppable>
														)}
													</div>
												</td>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
					</DragDropContext>
				</div>
			</Card>
		</div>
	);
}

export default Calendary;