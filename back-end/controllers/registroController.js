const Registro = require("../models/Registro");
const Semana = require("../models/Semana");
const bcrypt = require("bcryptjs|");
const sequelize = require("../config/database");

exports.getAllRegistros = async (req, res) => {
  const registros = await Registro.findAll();
  res.json(registros);
};

exports.getRegistroById = async (req, res) => {
  try {
    const registroEncontrado = await Registro.findByPk(req.params.id);

    if (registroEncontrado) res.json(registroEncontrado);
    else res.status(404).json({ error: "Registro no encontrado" });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el registro" });
  }
};

exports.createRegistro = async (req, res) => {
  try {
    const { usuario, password, name, weight, height, age, sex } = req.body;

    if (
      !usuario.trim() ||
      !password.trim() ||
      !name.trim() ||
      !weight.trim() ||
      !height.trim() ||
      !age.trim() ||
      !sex.trim()
    ) {
      return res.json({ success: true });
    } else {
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear un nuevo registro en la base de datos con el hash de la contraseña
      const nuevoRegistro = await Registro.create({
        usuario,
        password: hashedPassword,
        name,
        weight,
        height,
        age,
        sex,
      });
      res.status(201).json(nuevoRegistro);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Ruta para eliminar un registro
exports.deleteRegistro = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    // Eliminar semanas asociadas al cliente
    await Semana.destroy({
      where: { ClienteID: id },
      transaction,
    });

    // Eliminar el cliente
    await Registro.destroy({
      where: { id: id },
      transaction,
    });

    // Confirmar la transacción
    await transaction.commit();
    console.log("Cliente y semanas asociadas eliminados exitosamente.");

    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    console.error("Error al eliminar cliente y semanas:", error);
    res.status(500).json({ message: "Error al eliminar registro" });
  }
};

//Ruta para editar un registro
exports.editarRegistro = async (req, res) => {
  try {
    const editarRegistro = await Registro.findByPk(req.params.id);
    if (editarRegistro) {
      await editarRegistro.update(req.body);
      res.json(editarRegistro);
    } else {
      res.status(400).json({ error: "Registro no encontrado" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
