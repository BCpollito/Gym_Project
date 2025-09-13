import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FullWorkoutResponse } from "../types/Workout/FullWorkoutResponse";
import { Exercise } from "../types/Exercises";

export function useWorkoutData(id: string | undefined) {
  const [fullworkout, setfullworkout] = useState<FullWorkoutResponse | null>(null);
  const [LastElement, setLastElement] = useState<number | null>(null);
  const [refreshdata, setrefreshdata] = useState(false);

  // Helpers para dialogs
  const [open, setopen] = useState(false);
  const [openViewExercises, setopenViewExercises] = useState(false);
  const [bloqueid, setbloqueid] = useState<number | null>(null);
  const [openElement, setopenElement] = useState(false);
  const [exercise, setexercise] = useState<Exercise | null>(null);

  const refresh = useCallback(() => setrefreshdata(prev => !prev), []);

  useEffect(() => {
    if (!id) return;
    const getWorkoutElements = async () => {
      try {
        const workoutElements = await axios.get<FullWorkoutResponse>(
          `/workouts/${id}?include=full`
        );
        setfullworkout(workoutElements.data);

        const ordenes = workoutElements.data.elementos.map(e => e.orden ?? 0);
        const LastAdded = ordenes.length > 0 ? Math.max(...ordenes) : 0;
        setLastElement(LastAdded);

      } catch (error) {
        console.log("No se pudieron cargar los elementos del workout");
        console.log(error);
      }
    };
    getWorkoutElements();
  }, [id, refreshdata]);

  // CRUDs
  const DeleteElement = useCallback(async (IDelement: number) => {
    const sino = window.confirm("Seguro que deseas eliminar?");
    if (sino) {
      try {
        const response = await axios.delete(`/workoutElement/${IDelement}`);
        if (response.data.message) window.alert(response.data.message);
        if (response.data.error) window.alert(response.data.error);
        refresh();
      } catch (error) {
        console.error("Error al crear el ejercicio:", error);
      }
    }
  }, [refresh]);

  const DeleteWorkoutExercise = useCallback(async (WorkoutExerciseID: number) => {
    const sino = window.confirm("Seguro que deseas eliminar?");
    if (sino) {
      try {
        const response = await axios.delete(`/workoutExercise/${WorkoutExerciseID}`);
        if (response.data.message) window.alert(response.data.message);
        if (response.data.error) window.alert(response.data.error);
        refresh();
      } catch (error) {
        console.error("Error al crear el ejercicio:", error);
      }
    }
  }, [refresh]);

  // Dialog helpers
  const handleClose = () => setopen(false);
  const handleCloseExercises = () => setopenViewExercises(false);
  const handlerCloseElement = () => setopenElement(false);
  const getexercise = (ejercicio: Exercise) => {
    setopenElement(true);
    setexercise(ejercicio);
  };

  return {
    fullworkout, setfullworkout,
    LastElement,
    open, setopen, handleClose,
    openViewExercises, setopenViewExercises, bloqueid, setbloqueid, handleCloseExercises,
    openElement, exercise, getexercise, handlerCloseElement,
    DeleteElement, DeleteWorkoutExercise,
    refresh,
  };
}