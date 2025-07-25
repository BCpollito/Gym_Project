const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Bloques = require("./Bloques");
const Ejercicio = require("./Ejercicio");

const WorkoutExercises = sequelize.define("WorkoutExercises", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  bloqueID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Bloques,
      key: "id",
    },
  },
  ejercicioID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ejercicio,
      key: "ID_ejercicio",
    },
  },
  series: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  objetivo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tiempoDescanso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  instrucciones: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = WorkoutExercises;