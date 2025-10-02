import {
	Dialog,
	DialogBody,
	DialogHeader,
	Typography,
	Accordion,
	AccordionHeader,
	AccordionBody,
	IconButton
} from "@material-tailwind/react"
import { X, Zap, ChevronDown  } from "lucide-react";
import { WorkoutClientData } from "../../types/Calendary/WorkoutClientData"
import { mesesDelAño } from "../../types/Calendary/MonthsOfYears"
import { useState } from "react"
import LibraryWorkout from "../Workout/libraryWorkout";
import { useAssignWorkout } from "../../Hooks/Calendary/useAssignWorkout"

export default function NewElement({idClient ,open, onClose, day, signback}: WorkoutClientData) {
	const [openAcc, setopenAcc] = useState(0);
	const handleopenAcc = (value: number) => setopenAcc(openAcc === value ? 0 : value)

	const pulse = () => {
		signback();
	}

	const {
		handleAssignW
	} = useAssignWorkout({pulse});

	return (
		//@ts-ignore
		<Dialog open={open} handler={onClose} size="xxl">
			{/*@ts-ignore*/}
			<DialogHeader>
				<div>
					{/*@ts-ignore*/}
					<Typography variant="h5">{`${day.day} ${mesesDelAño[day.month]} ${day.year}`}</Typography>
					{/*@ts-ignore*/}
					<Typography>Añadir Nueva Tarea</Typography>
				</div>
				{/*@ts-ignore*/}
				<IconButton className="mb-5" onClick={onClose} variant="text" size="sm"><X /></IconButton>
			</DialogHeader>
			{/*@ts-ignore*/}
			<DialogBody className="p-0">
				{/*@ts-ignore*/}
				<Accordion open={openAcc === 1} 
				className="px-2" 
				icon={
					<ChevronDown className={`${openAcc === 1 && "rotate-180"} transition-transform`}/>
				}>
					{/*@ts-ignore*/}
					<AccordionHeader 
					className={`border p-2 shadow-md bg-orange-50 ${openAcc === 1 && "border-b-0 shadow-none"}`}
					onClick={() => handleopenAcc(1)}>
						<div className="w-full gap-2 flex justify-start">
							<Zap fill="orange" color="orange"/><span>Workout</span>
						</div>
					</AccordionHeader>
					<AccordionBody className="py-0 border-2 border-t-0 bg-orange-50">
						<LibraryWorkout workoutid={(e) => handleAssignW(e, idClient, new Date(day.year, day.month, day.day))}/>				
					</AccordionBody>
				</Accordion>
			</DialogBody>
		</Dialog>
	)
}