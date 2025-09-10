const { WorkoutElementos, Bloques, Descansos } = require("../models")

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

        const WorkoutElement = await WorkoutElementos.findByPk(id)

        if (WorkoutElement.tipo === 'Bloque') {
            await Bloques.destroy({
                where: {
                    id: WorkoutElement.elementoID
                }
            })
        }

        if (WorkoutElement.tipo === "Descanso") {
            await Descansos.destroy({
                where: {
                    id: WorkoutElement.elementoID
                }
            })
        }

        await WorkoutElementos.destroy({ where: { id: id } });
        return res.json({ message: `${WorkoutElement.tipo} eliminado satisfactoriamente` })

    } catch (error) {
        return res.json({ error: `Algo salio mal: ${error}` });
    }
}

exports.reorder = async (req, res) => {
    const { ids = [] } = req.body;

    try {

            await Promise.all(
                ids.map((id, i) =>
                    WorkoutElementos.update(
                        { orden: i + 1 },
                        { where: { id } }
                    )
                )
            );

        return res.status(200).json({success: true, message: "👍"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Algo salio mal: ${error.message || error}`, success: false });
    }
}