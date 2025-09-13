import { DropResult } from "@hello-pangea/dnd";
import { FullWorkoutResponse } from "../types/Workout/FullWorkoutResponse";
import { WorkoutExercise } from "../types/Workout/WorkoutExercise";

type DnDParams = {
  fullworkout: FullWorkoutResponse | null;
  setfullworkout: (fw: FullWorkoutResponse) => void;
  setActivate: (v: boolean) => void;
  setExercises: (ex: WorkoutExercise[] | null) => void;
  setIdExerciseToBlock: (id: number | undefined) => void;
  setDestblockId: (id: number | undefined) => void;
};

export function useWorkoutDnD({
  fullworkout,
  setfullworkout,
  setActivate,
  setExercises,
  setIdExerciseToBlock,
  setDestblockId,
}: DnDParams) {
  const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !fullworkout) return;

    if (result.type === "BLOCK") {
      const newElementos = reorder(
        fullworkout.elementos,
        result.source.index,
        result.destination.index
      );
      setActivate(true);
      setfullworkout({ ...fullworkout, elementos: newElementos });
      return;
    }

    const sourceBlockId = parseInt(result.source.droppableId.replace("block-", ""));
    const destBlockId = parseInt(result.destination.droppableId.replace("block-", ""));

    const sourceBlock = fullworkout.elementos.find(e => e.IDelement === sourceBlockId);
    const destBlock = fullworkout.elementos.find(e => e.IDelement === destBlockId);
    if (destBlock?.tipo === "Bloque") setDestblockId(destBlock.data.id);

    if (result.type === "EXERCISE") {
      if (!sourceBlock || !destBlock) return;
      if (sourceBlockId === destBlockId) {
        const exercises = sourceBlock.tipo === "Bloque" ? sourceBlock.data.WorkoutExercises : null;
        const newExercises = reorder(
          exercises!,
          result.source.index,
          result.destination.index
        );
        setExercises(newExercises);
        setActivate(true);
        const newElementos = fullworkout.elementos.map(e =>
          (e.IDelement === sourceBlockId && e.tipo === "Bloque")
            ? { ...e, data: { ...e.data, WorkoutExercises: newExercises } }
            : e
        );
        setfullworkout({ ...fullworkout, elementos: newElementos });
      }
    }

    if (sourceBlockId !== destBlockId && sourceBlock?.tipo === "Bloque" && destBlock?.tipo === "Bloque") {
      const sourceExercises = Array.from(sourceBlock.data.WorkoutExercises);
      const destExercises = Array.from(destBlock.data.WorkoutExercises);

      const [movedExercise] = sourceExercises.splice(result.source.index, 1);
      setIdExerciseToBlock(movedExercise.id);
      setActivate(true);

      destExercises.splice(result.destination.index, 0, movedExercise);

      const newElementos = fullworkout.elementos.map(e => {
        if (e.IDelement === sourceBlockId && e.tipo === "Bloque") {
          return { ...e, data: { ...e.data, WorkoutExercises: sourceExercises } };
        }
        if (e.IDelement === destBlockId && e.tipo === "Bloque") {
          return { ...e, data: { ...e.data, WorkoutExercises: destExercises } };
        }
        return e;
      });

      setfullworkout({ ...fullworkout, elementos: newElementos });
    }
  };

  return {
    handleDragEnd,
  };
}