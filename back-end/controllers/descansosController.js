/* const { Descansos } = require("../models");

//crear bloque
exports.createblock = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre.trim()) {
            return res.json({ success: false, message: "El nombre es obligatorio" });
        } else {
            const newblock = await Bloques.create({
                nombre,
                descripcion
            });
            return res.status(201).json({ newblock: newblock, message: "bloque creado exitosamente", success: true });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//actualizar workout
exports.updateBlock = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        if (!nombre.trim()) {
            return res.json({ success: false, message: "El nombre es obligatorio" });
        } else {
            await Bloques.update(
                { nombre, descripcion },
                { where: { id: id } }
            );
            return res.status(201).json({ message: "Bloque actualizado exitosamente", success: true });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        await Bloques.destroy({ where: { id: id } });
        return res.json({ message: "Bloque eliminado satisfactoriamente" })
    } catch (error) {
        return res.json({ error: `Algo salio mal: ${error}` });
    }
}; */