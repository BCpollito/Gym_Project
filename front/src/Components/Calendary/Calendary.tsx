import {
	Card,
	Typography,
	IconButton
} from "@material-tailwind/react";
import {
	ChevronLeft,
	ChevronRight,
	RotateCcw
} from "lucide-react";
import { useState, useEffect } from "react";
import { CalendaryProps } from "../../types/Calendary/CalendaryProps";
import axios from "axios";
import { ClientsWorkout } from "../../types/ClientsWorkout";

const TABLE_HEAD = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sab", "Dom"];

const FechaActual = new Date();
const mesesDelAño = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre"];

function Calendary({ mode, idClient }: CalendaryProps) {
	const [CurrentDate, setCurrentDate] = useState<Date>(new Date(FechaActual.getFullYear(), FechaActual.getMonth() + 1, 0));
	const [Day, setDay] = useState<(number | string)[][]>([]);

	const [WorkoutsOfClient, setWorkouts] = useState<ClientsWorkout[]>([]);

	if (mode === "cliente") {
		const getClientsWorkouts = async () => {
			try {
				const response = await axios.get<ClientsWorkout[]>(`/client-workouts/${idClient}`)
				setWorkouts(response.data)
			} catch (error: any) {
				const message = error.response?.data?.message || "error desconocido";
				alert("Error: " + message)
			}
		}
		useEffect(() => {
			getClientsWorkouts();
		}, [])
	}

	useEffect(() => {
		const newDays: (number | string)[][] = [];

		for (let Sem = 0; Sem < 5; Sem++) {
			newDays.push([]);
		}

		let a = 0;
		let d = 1;
		while (d <= CurrentDate.getDate()) {
			if (!newDays[a]) {
				newDays[a] = [];
			}

			if (newDays[a].length < 7 && d <= CurrentDate.getDate()) {
				newDays[a].push(d);
				d++;
			}

			if (d > CurrentDate.getDate()) {
				while (newDays[a].length < 7) {
					newDays[a].push("");
				}
			}

			if (newDays[a].length === 7) {
				a++;
			}
		}
		setDay(newDays);
	}, [CurrentDate])

	const handlePassDate = (sign: "next" | "prev" | "restar") => {
		if (sign === "next") {
			setCurrentDate(new Date(CurrentDate.getFullYear(), CurrentDate.getMonth() + 2, 0));
		}

		if (sign === "prev") {
			setCurrentDate(new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), 0));
		}

		if (sign === "restar") {
			setCurrentDate(new Date(FechaActual.getFullYear(), FechaActual.getMonth() + 1, 0));
		}
	};


	return (
		<div className="w-full sm:w-sm flex flex-col border border-blue-gray-100 rounded-[10px] p-4">
			<h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">CALENDARIO</h1>

			<div className="flex items-center justify-between sm:justify-end mt-4 space-x-4">
				<h6 className="text-sm sm:text-base">
					{`${mesesDelAño[CurrentDate.getMonth()]} - ${CurrentDate.getFullYear()}`}
				</h6>
				<div className="flex items-center space-x-2">
					{FechaActual.getMonth() != CurrentDate.getMonth() &&
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
			<Card className="h-full w-full mt-4">
				<div className="overflow-x-auto">
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
										const isEmpty = day === "";
										const isLast = rowIndex === Day.length - 1;
										const classes = `p-2 sm:p-4 text-center ${isEmpty ? 'bg-gray-100' : ''} ${isLast ? '' : 'border border-gray-200'}`;
										return (
											<td key={colIndex} className={classes}>
												<span className={`font-normal ${isEmpty ? 'text-gray-400' : 'text-gray-800'}`}>
													{isEmpty ? '' : day}
												</span>
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>
		</div>
	);

}

export default Calendary;