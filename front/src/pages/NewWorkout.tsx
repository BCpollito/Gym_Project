import {
  IconButton,
  Typography,
  Button,
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
} from "@material-tailwind/react";
import { ChevronsLeft, Plus } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutList, CirclePause } from "lucide-react";
import { FullWorkoutResponse } from "../types/FullWorkoutResponse";
import SlideUpSelectelement from "../Components/SlideUpSelectelement";
import LibreriaExercises from "../Components/libreriaExercises";

export default function NewWorkout() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [fullworkout, setfullworkout] = useState<FullWorkoutResponse | null>(
    null
  );

  const [refreshdata, setrefreshdata] = useState(false);
  const refresh = () => {
    setrefreshdata((prev) => !prev);
  };

  const [open, setopen] = useState(false);
  const handleClose = () => {
    setopen(false);
  };

  const [openViewExercises, setopenViewExercises] = useState(false);
  const [bloqueid, setbloqueid] = useState<number | null>(null);
  const handleCloseExercises = () => {
    setopenViewExercises(false);
  };

  useEffect(() => {
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
  }, [refreshdata]);

  const [exerciseID, setexerciseID] = useState<number | null>(null);
  const getexerciseid = (id: number) => {
    setexerciseID(id);
    console.log(id);
  }

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
          <Accordion
            className={`${
              elemento.tipo === "Bloque" ? "bg-blue-50" : "bg-green-50"
            } mb-2 rounded-lg px-2`}
            key={index}
            open={elemento.tipo === "Bloque" ? true : false}
          >
            <AccordionHeader
              className={`relative gap-x-2 py-0 px-0 h-12 max-h-12 justify-start border-b-0 ${
                elemento.tipo === "Bloque" ? " text-blue-500" : "text-green-500"
              }`}
            >
              {elemento.tipo === "Bloque" ? (
                <div className="rounded-sm p-1 bg-blue-gray-400 bg-opacity-20">
                  <LayoutList />
                </div>
              ) : (
                <div className="rounded-sm p-1 bg-green-300 bg-opacity-20">
                  <CirclePause />
                </div>
              )}
              <div className="w-full justify-start overflow-hidden whitespace-nowrap">
                {elemento.tipo === "Bloque" ? (
                  <Typography
                    className="font-black"
                    variant="paragraph"
                  >{`${elemento.data.nombre}`}</Typography>
                ) : (
                  <Typography
                    className="font-black"
                    variant="paragraph"
                  >{`Descanso de ${elemento.data.duracionSegundos} segundos`}</Typography>
                )}
                {elemento.tipo === "Bloque" && (
                  <Typography color="gray" className="text-xs">
                    {elemento.data.descripcion}
                  </Typography>
                )}
              </div>
              {elemento.tipo === "Bloque" && (
                <div className="absolute right-0 p-0">
                  <Button
                    variant="text"
                    size="sm"
                    className="font-thin flex flex-col items-center p-0 rounded-sm"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      setopenViewExercises(true);
                      setbloqueid(elemento.data.id);
                    }}
                  >
                    <Plus />
                    ejercicio
                  </Button>
                </div>
              )}
            </AccordionHeader>
            <AccordionBody className="p-0">
              {elemento.tipo === "Bloque" &&
              elemento.data.WorkoutExercises.length > 0 ? (
                <List>
                  {elemento.data.WorkoutExercises.map((we) => (
                    <ListItem key={we.id}>
                      {we.Ejercicio.Nombre} - {we.Ejercicio.Descripcion}
                    </ListItem>
                  ))}
                </List>
              ) : null}
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
      <SlideUpSelectelement
        open={open}
        onClose={handleClose}
        idworkout={id}
        refresh={refresh}
      />

      {openViewExercises && (
        <Dialog
          open={openViewExercises}
          handler={handleCloseExercises}
          size="xxl"
          className="!max-w-none !w-screen !h-screen overflow-hidden bg-white px-2"
        >
          <DialogHeader className="p-0">
            añadir ejercicio a workout
          </DialogHeader>
          <LibreriaExercises classNamemodify={true} closeSelf={handleCloseExercises} exerciseID={getexerciseid} />
          <DialogFooter className="justify-start text-center gap-1">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={handleCloseExercises}
            >
              <ChevronsLeft />
            </IconButton>
            Regresar
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
}
