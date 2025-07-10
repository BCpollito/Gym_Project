const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
        model: registro,
        key: "id",
      },
    },
  },
  {
    tableName: "Semanas",
  }
);

module.exports = Semana;
