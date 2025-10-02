import {
	Typography,
	IconButton
} from "@material-tailwind/react";
import {
	ChevronsLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendary from "../Components/Calendary/Calendary";
import DayWorkoutModal from "../Components/Calendary/DayWorkoutModal";
import { ClientsWorkout } from "../types/ClientsWorkout";
import NewElement from "../Components/Calendary/NewElement";
import { useState } from "react";

export default function ClientCalendary() {
	const location = useLocation();
	const user = location.state?.cliente;

	const navigate = useNavigate();

	const [opendayWorkouts, setOpenDayWorkouts] = useState<boolean>(false);
	const [workoutday, setWorkoutday] = useState<{ day: number, month: number, year: number } | null>(null)
	const [workoutSday, setWorkoutSday] = useState<ClientsWorkout[]>([])
	const [openAddNew, setOpenAddNew] = useState<boolean>(false);

	const [refresh, setrefresh] = useState(false);

	return (
		<>
			<div className="fixed top-0 left-0 w-full px-4 py-0 shadow truncate overflow-hidden">
				<div className="flex items-center justify-between w-full">
					{/*// @ts-ignore*/}
					<IconButton
						size="sm"
						color="white"
						variant="filled"
						className="shadow-sm shadow-secondary rounded-full mr-2"
						onClick={() =>
							navigate("/admin/clientes")
						}
					>
						<ChevronsLeft />
					</IconButton>
					<div className="pt-2 flex-1 min-w-0 text-right">
						{/*// @ts-ignore*/}
						<Typography color="gray" variant="small">
							Programacion cliente
						</Typography>
						{/*// @ts-ignore*/}
						<Typography variant="h4" className="truncate flex items-center justify-end">
							{user.name}
						</Typography>
					</div>
				</div>
			</div>
			<Calendary 
				mode="cliente"
				idClient={user?.id}
				signBack={() => setOpenDayWorkouts(true)}
				setday={(e) => setWorkoutday(e)}
				setWorkoutsDay={(e) => setWorkoutSday(e)}
				refresh={refresh}
			/>

			{opendayWorkouts &&
				<DayWorkoutModal
					open={opendayWorkouts}
					onClose={() => setOpenDayWorkouts(false)}
					day={workoutday}
					workoutsDay={workoutSday} 
					signback={() => setOpenAddNew(true)}
				/>					
			}
			{openAddNew && 
				<NewElement
				idClient={user?.id}
				open={openAddNew}
				onClose={() => setOpenAddNew(false)}
				day={workoutday}
				signback={() => {setrefresh(!refresh); setOpenAddNew(false);}}
				/>
			}
		</>
	);
}