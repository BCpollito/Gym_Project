const { WorkoutExercises } = require("../models");

//añadir ejercicio a bloque
exports.addExerciseToBlock = async (req, res) => {
    try {
        const { bloqueID, ejercicioID, series, objetivo, tiempoDescanso, instrucciones, orden } = req.body;

        if (!bloqueID || !ejercicioID || !series || !objetivo || !tiempoDescanso || !orden) {
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

    }
}