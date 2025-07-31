import {
  IconButton,
  Typography,
  Button,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { ChevronsLeft, Plus } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WorkoutElementDetail } from "../types/WorkoutElementDetail";
import { FullWorkoutResponse } from "../types/FullWorkoutResponse";
import SlideUpSelectelement from "../Components/SlideUpSelectelement";

export default function NewWorkout() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [fullworkout, setfullworkout] = useState<FullWorkoutResponse | null>(
    null
  );

  const [open, setopen] = useState(false);
  const handleClose = () => {
    setopen(false);
  };

  useEffect(() => {
    if (!open) {
      const getWorkoutElements = async () => {
        try {
          const workoutElements = await axios.get<FullWorkoutResponse>(
            `/workouts/${id}?include=full`
          );
          setfullworkout(workoutElements.data);
          console.log(workoutElements.data);
        } catch (error) {
          console.log("No se pudieron cargar los elementos del workout");
          console.log(error);
        }
      };
      getWorkoutElements();
    }
  }, [open]);

  return (
    <>
      {/* navegacion superior */}
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
            <Typography variant="h4">
              {fullworkout?.workout.nombre ?? "Cargando..."}
            </Typography>
          </div>
        </div>
      </div>

      <div className="px-4 w-full">
        {fullworkout?.elementos.map((elemento, index) => (
          <Accordion key={index} open={false}>
            <AccordionHeader>
              {elemento.tipo === "bloque"
                ? `Bloque #${elemento.data.nombre}`
                : `Descanso - ${elemento.data.duracionSegundos} segundos`}
            </AccordionHeader>
            <AccordionBody>
              {elemento.tipo === "bloque" ? (
                <ul className="list-disc pl-5">
                  {elemento.data.WorkoutExercises.map((we) => (
                    <li key={we.id}>
                      {we.Ejercicio.Nombre} - {we.Ejercicio.Descripcion}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Descanso programado</p>
              )}
            </AccordionBody>
          </Accordion>
        ))}
      </div>

      {/* navegacion inferior */}
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
      <SlideUpSelectelement open={open} onClose={handleClose} idworkout={id} />
    </>
  );
}
