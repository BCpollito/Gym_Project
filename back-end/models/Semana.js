const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Registro = require("./Registro");

const Semana = sequelize.define(
  "Semana",
  {
    ID_semana: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ClienteID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Registro,
        key: "id",
      },
    },
  },
  {
    tableName: "Semanas",
  }
);

module.exports = Semana;
