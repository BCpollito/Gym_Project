const Dia = require("../models/Dia");

// Crear un nuevo día
exports.createDia = async (req, res) => {
  try {
    const { ID_semana, name } = req.body;
    const nuevoDia = await Dia.create({ ID_semana, Dia: name });
    res.status(201).json(nuevoDia);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el día" });
  }
};

// Obtener todos los días de una semana
exports.getDiasBySemana = async (req, res) => {
  try {
    const { id_semana } = req.params;
    const dias = await Dia.findAll({ where: { ID_semana: id_semana } });
    res.json(dias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los días" });
  }
};

// Actualizar un día
exports.updateDia = async (req, res) => {
  try {
    const { id } = req.params;
    const { Dia } = req.body;
    await Dia.update({ Dia }, { where: { ID_dia: id } });
    res.json({ message: "Día actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el día" });
  }
};

// Eliminar un día
exports.deleteDia = async (req, res) => {
  try {
    const { id } = req.params;
    await Dia.destroy({ where: { ID_dia: id } });
    res.json({ message: "Día eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el día" });
  }
};