const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Workouts = require("./Workouts");

const Descansos = sequelize.define("Descansos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  workoutID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Workouts,
      key: "id",
    },
  },
  duracionSegundos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "descansos",
  timestamps: false,
});

module.exports = Descansos;
