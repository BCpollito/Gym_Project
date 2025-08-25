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
        console.error("Error al agregar Ejercicio: ", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
}

exports.FindAllByBlockId = async (req, res) => {
    const { idelement } = req.params;
    console.log("ID recibido: ", idelement)
    try {
        const Exercises = await WorkoutExercises.findAll({
            where: {bloqueID : idelement}
        });
        res.status(200).json({
            Exercises
        })        
    } catch (error) {
        console.error("Error al obtener Elemento:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
}