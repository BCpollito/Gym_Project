const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Dia = require("./Dia");

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
    ID_dia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Dia,
        key: "ID_dia",
      },
    },
  },
  {
    tableName: "Ejercicios",
  }
);

module.exports = Ejercicio;