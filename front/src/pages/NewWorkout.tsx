import {
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { ChevronsLeft, Plus } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SlideUpSelectelement from "../Components/SlideUpSelectelement";
import SlideUpworkoutElement from "../Components/SlideUpworkoutElement";
import LibreriaExercises from "../Components/libreriaExercises";
import WorkoutBlockAccordion from "../Components/WorkoutBlockAccordion";
import { WorkoutExercise } from "../types/WorkoutExercise";
import { useWorkoutData } from "../Hooks/useWorkoutData";
import { useWorkoutDnD } from "../Hooks/useWorkoutDnD";
import { useState } from "react";

export default function NewWorkout() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Custom hook: lógica de datos y control de diálogos
  const {
    fullworkout, setfullworkout,
    LastElement,
    open, setopen, handleClose,
    openViewExercises, setopenViewExercises, bloqueid, setbloqueid, handleCloseExercises,
    openElement, exercise, getexercise, handlerCloseElement,
    DeleteElement, DeleteWorkoutExercise,
    refresh,
  } = useWorkoutData(id);

  // Estados para DnD
  const [ActivateSaveButton, setActivate] = useState(false);
  const [newExercisesArray, setExercises] = useState<WorkoutExercise[] | null>(null);
  const [idexerciseToBlock, setIdExerciseToBlock] = useState<number>();
  const [destBlockId, setDestblockId] = useState<number>();

  // Custom hook: lógica de drag and drop
  const { handleDragEnd } = useWorkoutDnD({
    fullworkout,
    setfullworkout,
    setActivate,
    setExercises,
    setIdExerciseToBlock,
    setDestblockId,
  });

  const handleReorder = async () => {
    try {
      const response = await axios.put<{
        message: string;
        success: boolean;
      }>("/workoutElement", {
        ids: fullworkout!.elementos.map(e => e.IDelement)
      });

      const responseExercise = await axios.put<{
        message: string;
        success: boolean;
      }>("/workoutExercises", {
        ids: newExercisesArray !== null ? newExercisesArray.map(e => e.id) : [],
        exerciseid: idexerciseToBlock,
        blockid: destBlockId,
      });

      if (response.data.success === true || responseExercise.data.success === true) {
        alert(response.data.message + responseExercise.data.message)
        setActivate(false);
        return;
      }

    } catch (error: any) {
      const message = error.response?.data?.message || "error desconocido";
      alert("Error: " + message)
    }
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
            onClick={() =>
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

      <div className="px-4 w-full max-h-[80svh]">
        <div className="max-h-[80svh] overflow-y-auto">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="elementos-droppable" type="BLOCK">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {fullworkout?.elementos.map((elemento, index) => (
                    <WorkoutBlockAccordion
                      key={elemento.IDelement}
                      block={elemento}
                      index={index}
                      draggableId={elemento.IDelement.toString()}
                      DraggableComponent={Draggable}
                      DroppableComponent={Droppable}
                      onClickAddExercise={e => {
                        setbloqueid(e); 
                        setopenViewExercises(true);
                      }}
                  onClickDeleteBlock={e => DeleteElement(e)}
                  onClickDeleteExercise={e => DeleteWorkoutExercise(e)}
          />
        ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* navegacion inferior */}
      <div className="flex gap-2 fixed bottom-0 p-4 w-full shadow-[-1px_-1px_5px_rgba(0,0,0,0.2)]">
        {/*// @ts-ignore*/}
        <Button
          onClick={ActivateSaveButton ? handleReorder : () => navigate("/admin/libreria/activity/workouts")}
          color={ActivateSaveButton ? "lime" : "black"}
          className="w-full rounded-full" size="sm">
          {ActivateSaveButton ? "Guardar" : "Terminar"}
        </Button>
        {/*// @ts-ignore*/}
        <IconButton
          size="sm"
          color="amber"
          className="rounded-full w-10 h-10"
          aria-label="Agregar nuevo ejercicio"
          onClick={() => setopen(true)}
        >
          <Plus />
        </IconButton>
      </div>
      <SlideUpSelectelement
        open={open}
        onClose={handleClose}
        idworkout={Number(id)}
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
