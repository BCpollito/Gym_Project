import { useState, useEffect } from "react";
import axios from "axios";

interface props {
	pulse?: () => void;
}

export const useAssignWorkout = ({pulse}: props) => {

	const handleAssignW = async (workoutid: number, clientid: number, dateToAssign: Date) => {
		const currentDate = new Date();
    	const currentFormatedDate = currentDate.toISOString().split("T")[0];
    	const AssignedFormatedDate = dateToAssign !== null && (dateToAssign.toISOString().split("T")[0])

    	if (dateToAssign === null || AssignedFormatedDate < currentFormatedDate) {
     		return alert("Ingrese una fecha valida");
    	}

    	try {
      		const response = await axios.post<{
        		message: string;
        		success: boolean;
        		error: string
      		}>('/assign-workout', {
        		clienteID: clientid,
       		 	workoutID: workoutid,
      		  	dateAssign: AssignedFormatedDate
      		});

	      if (response.data.success === true) {
	      	pulse();
	        return alert(response.data.message);
	      }

	      if (response.data.success === false) {
	        return alert(response.data.message);
	      }

	      alert(response.data.error);
	    } catch (error) {
	      console.error(error)
	      alert(`error en el servidor: ${error}`)
	    }
	}

	return {
		handleAssignW
	};
}