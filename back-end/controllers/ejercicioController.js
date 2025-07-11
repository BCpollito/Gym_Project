const Ejercicio = require("../models/Ejercicio");

// Crear un nuevo ejercicio
exports.createEjercicio = async (req, res) => {
  try {
    const { Nombre, Descripcion, ID_dia } = req.body;
    const nuevoEjercicio = await Ejercicio.create({
      Nombre,
      Descripcion,
      ID_dia,
    });
    res.status(201).json(nuevoEjercicio);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el ejercicio" });
  }
};

// Obtener todos los ejercicios de un día
exports.getEjerciciosByDia = async (req, res) => {
  try {
    const { id_dia } = req.params;
    const ejercicios = await Ejercicio.findAll({ where: { ID_dia: id_dia } });
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los ejercicios" });
  }
};

// Actualizar un ejercicio
exports.updateEjercicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Descripcion } = req.body;
    await Ejercicio.update(
      { Nombre, Descripcion },
      { where: { ID_ejercicio: id } }
    );
    res.json({ message: "Ejercicio actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el ejercicio" });
  }
};

// Eliminar un ejercicio
exports.deleteEjercicio = async (req, res) => {
  try {
    const { id } = req.params;
    await Ejercicio.destroy({ where: { ID_ejercicio: id } });
    res.json({ message: "Ejercicio eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el ejercicio" });
  }
};