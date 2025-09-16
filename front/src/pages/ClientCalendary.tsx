import {
	Typography
} from "@material-tailwind/react"
import { useLocation } from "react-router-dom";
import Calendary from "../Components/Calendary/Calendary";

export default function ClientCalendary() {
	const location = useLocation();
	const user = location.state?.cliente;
	return (
		<>
			<div className="fixed top-0 left-0 w-full px-4 py-0 shadow truncate overflow-hidden">
				{/*@ts-ignore*/}
				<Typography variant="lead">
					{`Programacion del cliente ${user?.name}`}
				</Typography>
			</div>
			<Calendary mode="cliente" idClient={user?.id}/>
		</>
	);
}