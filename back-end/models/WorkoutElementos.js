const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Workouts = require("./Workouts");

const WorkoutElementos = sequelize.define("WorkoutElementos", {
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
  tipo: {
    type: DataTypes.ENUM('bloque', 'descanso'),
    allowNull: false,
  },
  elementoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "workout_elementos",
  timestamps: false,
});

module.exports = WorkoutElementos;
