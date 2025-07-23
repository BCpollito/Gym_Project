const Ejercicio = require("../models/Ejercicio");

// Crear un nuevo ejercicio
exports.createEjercicio = async (req, res) => {
  try {
    const { Nombre, Descripcion, Link, Tag } = req.body;

    if (!Nombre.trim() || !Link.trim() || !Tag.trim()) {
      return res.json({ success: false, message: "Algunos Campos son obligatorios" });
    } else {
      const nuevoEjercicio = await Ejercicio.create({
        Nombre,
        Descripcion,
        Link,
        Tag,
      });
      return res.status(201).json({ nuevoEjercicio: nuevoEjercicio, message: "Ejercicio creado exitosamente", success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todos los ejercicios
exports.getEjercicios = async (req, res) => {
  try {
    const ejercicios = await Ejercicio.findAll();
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los ejercicios" });
  }
};

// Actualizar un ejercicio
exports.updateEjercicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Descripcion, Link, Tag } = req.body;

    if (!Nombre.trim() || !Link.trim() || !Tag.trim()) {
      return res.json({ success: false, message: "Algunos Campos son obligatorios" });
    } else {
      await Ejercicio.update(
        { Nombre, Descripcion, Link, Tag },
        { where: { ID_ejercicio: id } }
      );
    }

    return res.json({ message: "Ejercicio actualizado", success: true });
  } catch (error) {
    res.status(500).json({ error: error });
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