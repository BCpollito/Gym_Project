import { useCallback, useEffect, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { ClientsWorkout } from "../../types/ClientsWorkout";
import axios from "axios";

export function useClientWorkoutDnDate(initialItems: ClientsWorkout[] = [], onMove?: (movedWorkoutId: number, newDateAssign: string) => Promise<void> | void) {
    const [items, setItems] = useState<ClientsWorkout[]>(initialItems ?? []);

    useEffect(() => {
        setItems(initialItems ?? []);
    }, [initialItems]);

    // helper para mover dentro de un array
    const reorder = useCallback((list: ClientsWorkout[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }, []);

    // helper para eliminar item por id del array y devolver el item removido + nuevo array
    const removeByIndex = useCallback((list: ClientsWorkout[], index: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return { removed, newList: result };
    }, []);

    // onDragEnd generalizado para droppableId = fecha (YYYY-MM-DD)
    const onDragEnd = useCallback(async (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        // si no hubo cambio de contenedor ni de índice, no hacemos nada
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const sourceDate = source.droppableId;
        const destDate = destination.droppableId;

        // Trabajamos con una copia del estado items agrupada por dateAssign
        const groups = new Map<string, ClientsWorkout[]>();
        for (const it of items) {
            const arr = groups.get(it.dateAssign) ?? [];
            arr.push(it);
            groups.set(it.dateAssign, arr);
        }

        // Si droppableId no corresponde a un date (p.ej. empty cells), aseguramos existencia
        if (!groups.has(sourceDate)) groups.set(sourceDate, []);
        if (!groups.has(destDate)) groups.set(destDate, []);

        const sourceList = groups.get(sourceDate) ?? [];
        const destList = groups.get(destDate) ?? [];

        // Encontrar el elemento a mover en sourceList por índice
        const { removed, newList: newSourceList } = removeByIndex(sourceList, source.index);

        if (!removed) {
            // Nada que mover
            return;
        }

        // Si se mueve dentro del mismo droppable (mismo date), reordenamos
        if (sourceDate === destDate) {
            const reordered = reorder(sourceList, source.index, destination.index);

            try {
                const response = await axios.put<{
                    message: string;
                    success: boolean;
                }>('/client-workouts/reorder', {
                    ids: reordered.map(item => item.id)
                });

                if (response.data.success === true) {
                    console.log(response.data.message);
                }
            } catch (error: any) {
                const message = error.response?.data?.message || error;
                alert("Error: " + message);
            }

            groups.set(sourceDate, reordered);
        } else {
            // mover a otro droppable: insertamos en destList en destination.index
            const newDestList = Array.from(destList);
            // actualizamos la propiedad dateAssign del removed al destDate
            const moved = { ...removed, dateAssign: destDate };
            newDestList.splice(destination.index, 0, moved);

            groups.set(sourceDate, newSourceList);
            groups.set(destDate, newDestList);
        }

        // Reconstruimos items en orden arbitrario (por simplicidad mantenemos el orden original de items,
        // pero reemplazando los grupos actualizados). Esto conserva todos los demás campos.
        const merged: ClientsWorkout[] = [];
        // iterar por keys de groups y concatenar
        for (const arr of groups.values()) {
            for (const w of arr) merged.push(w);
        }

        setItems(merged);

        // Si se movió a otra fecha, llamar onMove con id y nueva fecha para persistir (si se proporcionó)
        if (sourceDate !== destDate && onMove) {
            try {
                // el removed pudo haber sido actualizado con el nuevo date (moved)
                const movedWorkout = { ...removed, dateAssign: destDate };
                
                const response = await axios.put<{
                    message: string;
                    success: boolean;
                }>(`/client-workout/update-date${movedWorkout.id}`, {
                    dateAssign: destDate
                });
                console.log(response.data.message);

                await onMove(Number(draggableId), destDate);
            } catch (error: any) {
                const message = error.response?.data?.message || error;
                alert("Error: " + message);
            }
        }
    }, [items, onMove, removeByIndex, reorder]);

    return {
        items,
        setItems,
        onDragEnd,
    };
}