const sequelize = require("../config/database");
const Registro = require("./Registro");
const Semana = require("./Semana");
const Dia = require("./Dia");
const Ejercicio = require("./Ejercicio");

// Definir relaciones
Registro.hasMany(Semana, { foreignKey: "ClienteID", onDelete: "CASCADE" });
Semana.belongsTo(Registro, { foreignKey: "ClienteID" });

Semana.hasMany(Dia, { foreignKey: "ID_semana", onDelete: "CASCADE" });
Dia.belongsTo(Semana, { foreignKey: "ID_semana" });

Dia.hasMany(Ejercicio, { foreignKey: "ID_dia", onDelete: "CASCADE" });
Ejercicio.belongsTo(Dia, { foreignKey: "ID_dia" });

module.exports = {
  sequelize,
  Registro,
  Semana,
  Dia,
  Ejercicio,
};
