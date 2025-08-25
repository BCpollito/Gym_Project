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
import {
  ChevronsLeft,
  Plus,
  Goal,
  Repeat2,
  LayoutList,
  CirclePause,
  NotebookText,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FullWorkoutResponse } from "../types/FullWorkoutResponse";
import { Exercise } from "../types/Exercises";
import SlideUpSelectelement from "../Components/SlideUpSelectelement";
import SlideUpworkoutElement from "../Components/SlideUpworkoutElement";
import LibreriaExercises from "../Components/libreriaExercises";
import convertirLink from "../services/ConvertLink";

export default function NewWorkout() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [fullworkout, setfullworkout] = useState<FullWorkoutResponse | null>(
    null
  );
  const [LastElement, setLastElement] = useState<number | null>(null)

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

        const ordenes = workoutElements.data.elementos
          .map(e => e.orden ?? 0);

        const LastAdded = ordenes.length > 0 ? Math.max(...ordenes) : 0;

        setLastElement(LastAdded);

      } catch (error) {
        console.log("No se pudieron cargar los elementos del workout");
        console.log(error);
      }
    };
    getWorkoutElements();
  }, [refreshdata]);

  const [openElement, setopenElement] = useState(false);
  const handlerCloseElement = () => {setopenElement(false)};
  const [exercise, setexercise] = useState<Exercise | null>(null);
  const getexercise = (ejercicio: Exercise) => {  
    setopenElement(true);  
    setexercise(ejercicio);
  }

  return (
    <>
      {/* navegacion superior */}
      <div className="fixed top-0 left-0 w-full px-4 py-0 shadow truncate overflow-hidden">
        <div className="flex items-center justify-between w-full">
          {/*// @ts-ignore*/}
          <IconButton
            size="sm"
            color="white"
            variant="filled"
            className="shadow-sm shadow-secondary rounded-full mr-2"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              navigate("/admin/libreria/activity/workouts")
            }
          >
            <ChevronsLeft />
          </IconButton>
          <div className="pt-2 flex-1 min-w-0 text-right">
            {/*// @ts-ignore*/}
            <Typography color="gray" variant="small">
              Crear nuevo workout
            </Typography>
            {/*// @ts-ignore*/}
            <Typography variant="h4" className="truncate">
              {fullworkout?.workout.nombre ?? "Cargando..."}
            </Typography>
          </div>
        </div>
      </div>

      <div className="px-4 w-full">
        {fullworkout?.elementos.map((elemento, index) => (
          // @ts-ignore
          <Accordion
            className={`${
              elemento.tipo === "Bloque" ? "bg-blue-50" : "bg-green-50"
            } mb-2 rounded-lg px-2`}
            key={index}
            open={elemento.tipo === "Bloque" ? true : false}
          >
            {/*// @ts-ignore*/}
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
              <div className="w-8/12 justify-start overflow-hidden whitespace-nowrap">
                {elemento.tipo === "Bloque" ? (
                  // @ts-ignore
                  <Typography
                    className="font-black"
                    variant="paragraph"
                  >{`${elemento.data.nombre}`}</Typography>
                ) : (
                  // @ts-ignore
                  <Typography
                    className="font-black"
                    variant="paragraph"
                  >{`Descanso de ${elemento.data.duracionSegundos} segundos`}</Typography>
                )}
                {elemento.tipo === "Bloque" && (
                  // @ts-ignore
                  <Typography color="gray" className="text-xs">
                    {elemento.data.descripcion}
                  </Typography>
                )}
              </div>
              {elemento.tipo === "Bloque" && (
                <div className="absolute right-0 p-0">
                  {/*// @ts-ignore*/}
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
                // @ts-ignore
                <List className="px-0 pt-0">
                  {elemento.data.WorkoutExercises.map((we) => (
                    // @ts-ignore
                    <ListItem
                      className="px-2 py-1  gap-3 bg-blue-gray-400 bg-opacity-10"
                      key={we.id}
                    >
                      <img
                        className="w-10 h-9 object-cover rounded-sm bg-white"
                        src={convertirLink(we.Ejercicio.Link) || ""}
                        alt={we.Ejercicio.Nombre}
                      />
                      <div>
                        {/*// @ts-ignore*/}
                        <Typography variant="small">
                          {we.Ejercicio.Nombre}
                        </Typography>
                        <div className="flex items-center gap-5">
                          <div className="flex items-center">
                            <Repeat2 size={16} />
                            <span className="text-sm">{we.series}</span>
                          </div>
                          <div className="flex items-center">
                            <Goal size={16} />
                            <span className="text-sm">{we.objetivo}</span>
                          </div>
                          <div className="flex items-center">
                            <CirclePause size={16} />
                            <span className="text-sm">{we.tiempoDescanso}s</span>
                          </div>
                          {/*// @ts-ignore*/}
                          <IconButton
                            color="blue-gray"
                            size="sm"
                            className="h-5"
                            variant="text"
                          >
                            <NotebookText size={16} />
                          </IconButton>
                        </div>
                      </div>
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
        {/*// @ts-ignore*/}
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
        {/*// @ts-ignore*/}
        <Button className="w-full rounded-full" size="sm">
          Guardar workout
        </Button>
      </div>
      <SlideUpSelectelement
        open={open}
        onClose={handleClose}
        idworkout={id}
        elementorder={LastElement}
        refresh={refresh}
      />

      {openViewExercises && (
        // @ts-ignore
        <Dialog
          open={openViewExercises}
          handler={handleCloseExercises}
          size="xxl"
          className="!max-w-none !w-screen !h-screen overflow-hidden bg-white px-2"
        >
          {/*// @ts-ignore*/}
          <DialogHeader className="p-0">
            añadir ejercicio a workout
          </DialogHeader>
          <LibreriaExercises classNamemodify={true} closeSelf={handleCloseExercises} ejercicioExistente={getexercise} />
          {/*// @ts-ignore*/}
          <DialogFooter className="justify-start text-center gap-1">
            {/*// @ts-ignore*/}
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

      {openElement === true && 
        <SlideUpworkoutElement
        open={openElement} 
        onClose={handlerCloseElement} 
        ejercicioExistente={exercise} 
        modo="Ejercicio"
        refresh={refresh}
        id={bloqueid}
        />
      }
    </>
  );
}
