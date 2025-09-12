import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { WorkoutExercise } from "../types/WorkoutExercise";
import { Exercise } from "../types/Exercises";
import { Descanso } from "../types/Descanso";
import { WorkoutElement } from "../types/WorkoutElement";
import { PropsModal } from "../types/PropsModal";

interface UseWorkoutElementFormProps {
  modo: PropsModal["modo"];
  idworkout?: number | null;
  id?: number | string | null;
  elementorder?: number | null;
  ejercicioExistente?: Exercise | null;
  onSuccess?: () => void;
}

export function useWorkoutElementForm({
  modo,
  idworkout,
  id,
  elementorder,
  onSuccess,
  ejercicioExistente
}: UseWorkoutElementFormProps) {
  // Estados del formulario
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [descanso, setDescanso] = useState<number>(0);
  const [series, setSeries] = useState<number | null>(null);
  const [objetivo, setObjetivo] = useState<number | null>(null);
  const [instrucciones, setInstrucciones] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [exerciseOrder, setExerciseOrder] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);

  // Fetch para ejercicios existentes si modo === "Ejercicio"
  useEffect(() => {
    if (modo === "Ejercicio" && id) {
      const getElement = async () => {
        try {
          const response = await axios.get<{ Exercises: WorkoutExercise[] }>(`/workoutExercises/${id}`);
          const ejercicios = response.data.Exercises ?? [];
          const ordenes = ejercicios.map(e => e.orden ?? 0);
          setExerciseOrder(ordenes.length > 0 ? Math.max(...ordenes) : 0);
        } catch (error: any) {
          const message = error.response?.data?.message || "error desconocido";
          alert("Error: " + message)
        }
      };
      getElement();
    }
  }, [modo, id]);

  // Handler para el tiempo de descanso (chip)
  const handleRestTime = useCallback((value: { label: string; value: number }, index: number) => {
    setSelectedIndex(index);
    setDescanso(value.value);
  }, []);

  // Submit handler (Bloque/Ejercicio)
  const handleSubmit = useCallback(async () => {
    setDisabled(true);

    // Validaciones (puedes modularizar y mejorar)
    if (modo === "Bloque") {
      if (!idworkout || !nombre.trim()) {
        setDisabled(false);
        alert("Algunos campos están incompletos");
        return;
      }
      // Crear bloque y elemento
      const response = await axios.post("/bloques", {
        workoutID: idworkout,
        nombre,
        descripcion,
      });
      const responseElement = await axios.post("/workoutElement", {
        workoutID: idworkout,
        tipo: modo,
        elementoID: response.data.newblock.id,
        orden: (elementorder ?? 0) + 1,
      });
      if (response.data.success && responseElement.data.success) {
        onSuccess?.();
      } else {
        alert("Error al agregar el bloque");
      }
    }
    // Si es Ejercicio, lógica similar para ejercicio
    if (modo === "Ejercicio") {
      if (selectedIndex === null || series == 0 || objetivo == 0
        || isNaN(series!) || isNaN(objetivo!) || series === null || objetivo === null) {
        setDisabled(false)
        return alert("algunos campos estan incompletos o invalidos")
      }

      const responseExerciseWorkout = await axios.post<{
        message: string;
        success: boolean;
        newExerciseWorkout: WorkoutExercise;
      }>("/workoutExercise", {
        bloqueID: id,
        ejercicioID: ejercicioExistente?.ID_ejercicio,
        series: series,
        objetivo: objetivo,
        tiempoDescanso: descanso,
        instrucciones: instrucciones,
        orden: exerciseOrder! + 1
      })

      setDescanso(0);
      setInstrucciones("");
      alert(responseExerciseWorkout.data.message);
      onSuccess?.();
    }

    if (modo === "Descanso") {
      console.log("DESCANSO");

      if (selectedIndex !== null) {
        const response = await axios.post<{
          newRest: Descanso;
          success: boolean;
          message: string;
        }>("/descansos", {
          workoutID: idworkout,
          duracionSegundos: descanso,
        });

        const responseElement = await axios.post<{
          success: boolean;
          message: string;
          newElement: WorkoutElement;
        }>("/workoutElement", {
          workoutID: idworkout,
          tipo: modo,
          elementoID: response.data.newRest.id,
          orden: elementorder! + 1,
        });

        if (response.data.success) {
          if (responseElement.data.success) {
            console.log(
              `Se agrego un nuevo elemento tipo: ${responseElement.data.newElement.tipo} al workoutde ID: ${responseElement.data.newElement.workoutID}`
            );
          }
          setDescanso(0);
          onSuccess?.();
          alert(response.data.message);
        }
      }else{
        setDisabled(false)
        return alert("algunos campos estan incompletos")
      }
    }

    setDisabled(false);
  }, [modo, idworkout, nombre, descripcion, elementorder, onSuccess]);

  return {
    // Estados y setters
    nombre, setNombre,
    descripcion, setDescripcion,
    series, setSeries,
    objetivo, setObjetivo,
    instrucciones, setInstrucciones,
    selectedIndex, setSelectedIndex,
    exerciseOrder,
    disabled,
    // Métodos
    handleRestTime,
    handleSubmit,
  };
}