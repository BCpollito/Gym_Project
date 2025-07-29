import { IconButton, Typography, Button } from "@material-tailwind/react";
import { ChevronsLeft, Plus } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Workout } from "../types/workout";
import SlideUpSelectelement from "../Components/SlideUpSelectelement";

export default function NewWorkout() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [workout, setworkout] = useState<Workout | null>(null);

  const [open, setopen] = useState(false);
  const handleClose = () => {
    setopen(false);
  }

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
          <IconButton
            size="sm"
            color="white"
            variant="filled"
            className="shadow-sm shadow-secondary rounded-full"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              navigate("/admin/libreria/activity/workouts")
            }
          >
            <ChevronsLeft />
          </IconButton>
          <div className="pt-2">
            <Typography color="gray" variant="small">
              Crear nuevo workout
            </Typography>
            <Typography variant="h4">{workout?.nombre}</Typography>
          </div>
        </div>
      </div>
      <div className="fixed bottom-[90px] right-4">
        <IconButton
          size="sm"
          color="amber"
          className="rounded-full"
          aria-label="Agregar nuevo ejercicio"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => setopen(true)}
        >
          <Plus />
        </IconButton>
      </div>
      <div className="fixed bottom-0 p-5 w-full shadow-[-1px_-1px_5px_rgba(0,0,0,0.2)]">
        <Button className="w-full rounded-full" size="sm">
          Guardar workout
        </Button>
      </div>
      <SlideUpSelectelement open={open} onClose={handleClose} idworkout={id}/>
    </>
  );
}
