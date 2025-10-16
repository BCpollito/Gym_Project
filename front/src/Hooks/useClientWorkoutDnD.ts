import { useCallback, useEffect, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { ClientsWorkout } from "../types/ClientsWorkout";

export function useClientWorkoutDnD(initialItems: ClientsWorkout[] = []) {
	const [items, setItems] = useState<ClientsWorkout[]>(initialItems ?? []);

	// Si cambian los props iniciales, sincronizamos el state
	useEffect(() => {
		setItems(initialItems ?? []);
	}, [initialItems]);

	const reorder = useCallback((list: ClientsWorkout[], startIndex: number, endIndex: number) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	}, []);

	const onDragEnd = useCallback((result: DropResult) => {
		const { destination, source } = result;
		if (!destination) return;
		// Si no hay cambio de índice, salir
		if (destination.index === source.index) return;

		setItems(prev => {
			const newList = reorder(prev, source.index, destination.index);
			return newList;
		});
	}, [reorder]);

	return {
		items,
		setItems,
		onDragEnd,
	};
}