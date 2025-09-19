import {
	Typography,
	IconButton
} from "@material-tailwind/react";
import {
	ChevronsLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendary from "../Components/Calendary/Calendary";

export default function ClientCalendary() {
	const location = useLocation();
	const user = location.state?.cliente;

	const navigate = useNavigate();
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
			<Calendary mode="cliente" idClient={user?.id} />
		</>
	);
}