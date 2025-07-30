const { WorkoutElementos } = require("../models")

exports.createElement = async (req, res) => {
    try {
        const { workoutID, tipo, elementoID, orden } = req.body;

        const newElement = await WorkoutElementos.create({
            workoutID,
            tipo,
            elementoID,
            orden
        });
        return res.status(201).json({ newElement: newElement, message: "nuevo elemento agregado", success: true });

    } catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
};

exports.deleteElement = async (req, res) => {
    try {
        const { id } = req.params;
        await WorkoutElementos.destroy({ where: { id: id } });
        return res.json({ message: "Bloque eliminado satisfactoriamente" })
    } catch (error) {
        return res.json({ error: `Algo salio mal: ${error}` });
    }
}