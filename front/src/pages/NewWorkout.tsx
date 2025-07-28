import { IconButton, Typography } from "@material-tailwind/react";
import { ChevronsLeft } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Workout } from "../types/workout";

export default function NewWorkout() {
  const { id } = useParams();
  const [workout, setworkout] = useState<Workout | null>(null);

  useEffect(() => {
    const getWorkout = async () => {
      try {
        const workout = await axios.get<Workout>(`/workouts/${id}`);
        setworkout(workout.data);
      } catch (error) {
        console.log("Error al obtener el workout: ", error);
      }
    }; 
    getWorkout(); 
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full px-4 py-0 shadow">
        <div className="flex items-center justify-between w-full">
            <IconButton size="sm" color="white" variant="filled" className="shadow-sm shadow-secondary rounded-full"><ChevronsLeft/></IconButton>
            <div>
                <Typography color="gray" variant="small">Crear nuevo workout</Typography>
                <Typography variant="h4">{workout?.nombre}</Typography>
            </div>            
        </div>
      </div>
    </>
  );
}
