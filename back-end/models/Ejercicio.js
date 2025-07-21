const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ejercicio = sequelize.define(
  "Ejercicio",
  {
    ID_ejercicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Tag: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    tableName: "Ejercicios",
  }
);

module.exports = Ejercicio;