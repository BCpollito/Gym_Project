const { WorkoutExercises } = require("../models");

//añadir ejercicio a bloque
exports.addExerciseToBlock = async (req, res) => {
    try {
        const { bloqueID, ejercicioID, series, objetivo, tiempoDescanso, instrucciones, orden } = req.body;

        if (!bloqueID || !ejercicioID || !series || !objetivo || !orden) {
            return res.status(400).json({ success: false, message: "Faltan datos obligatorios" });
        }

        const newWorkoutExercise = await WorkoutExercises.create({
            bloqueID, ejercicioID, series, objetivo, tiempoDescanso, instrucciones, orden
        });
        res.status(201).json({
            message: "Ejercicio añadido al bloque exitosamente",
            success: true,
            workoutExercise: newWorkoutExercise
        });
    } catch (error) {
        console.error("Error al agregar Ejercicio: ", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
}

exports.FindAllByBlockId = async (req, res) => {
    const { idelement } = req.params;
    try {
        const Exercises = await WorkoutExercises.findAll({
            where: { bloqueID: idelement }
        });
        res.status(200).json({
            Exercises
        })
    } catch (error) {
        console.error("Error al obtener Elemento:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
}

exports.DeleteByID = async (req, res) => {
    const { idelement } = req.params;

    try {
        await WorkoutExercises.destroy({
            where: {
                id: idelement
            }
        });

        return res.json({ message: "ejercicio eliminado del workout" });
    } catch (error) {
        return res.json({ error: error });
    }
}

exports.reorder = async (req, res) => {
    const { ids = [], exerciseid, blockid } = req.body;

    try {

        if (ids && ids.length > 0) {
            await Promise.all(
                ids.map((id, i) =>
                    WorkoutExercises.update(
                        { orden: i + 1 },
                        { where: { id } }
                    )
                )
            );
            console.log("movido internamente");
        }

        if (exerciseid && blockid) {
            await WorkoutExercises.update(
                { bloqueID: blockid },
                { where: { id: exerciseid } }
            );
            console.log("movido entre bloques")
        }

        return res.status(200).json({ success: true, message: "👍" });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Algo salio mal: ${error.message || error}`, success: false });
    }
}