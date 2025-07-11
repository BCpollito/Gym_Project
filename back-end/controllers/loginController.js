const Registro = require("../models/Registro");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const usuarioEncontrado = await Registro.findOne({ where: { usuario } });
    if (!usuarioEncontrado)
      return res
        .status(401)
        .json({ success: false, message: "Usuario o contraseña incorrectos" });

    const match = await bcrypt.compare(password, usuarioEncontrado.password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Usuario o contraseña incorrectos" });

    const role = usuarioEncontrado.isAdmin ? "admin" : "user";
    return res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      role,
      data: usuarioEncontrado,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};