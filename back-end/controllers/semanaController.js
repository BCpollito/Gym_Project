const Semana = require("../models/Semana");
const Dia = require("../models/Dia");
const Ejercicio = require("../models/Ejercicio");

// Crear una nueva semana
exports.createSemana = async (req, res) => {
  try {
    const { Nombre, ClienteID } = req.body;

    const nuevaSemana = await Semana.create({ Nombre, ClienteID });
    res.status(201).json(nuevaSemana);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la semana" });
  }
};

// Obtener todas las semanas
exports.getAllSemanas = async (req, res) => {
  try {
    const semanas = await Semana.findAll();
    res.json(semanas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las semanas" });
  }
};

// Obtener las semanas de un cliente específico
exports.getSemanasByCliente = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar las semanas correspondientes al cliente por su ID
    const semanas = await Semana.findAll({
      where: { ClienteID: id },
      include: [
        {
          model: Dia,
          include: [Ejercicio],
        },
      ],
    });

    if (semanas.length > 0) {
      res.json(semanas);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron semanas para este cliente" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las semanas del cliente" });
  }
};

// Actualizar una semana
exports.updateSemana = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre } = req.body;
    await Semana.update({ Nombre }, { where: { ID_semana: id } });
    res.json({ message: "Semana actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la semana" });
  }
};

// Eliminar una semana
exports.deleteSemana = async (req, res) => {
  try {
    const { id } = req.params;
    await Semana.destroy({ where: { ID_semana: id } });
    res.json({ message: "Semana eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la semana" });
  }
};