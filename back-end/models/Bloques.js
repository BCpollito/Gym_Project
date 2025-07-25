const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Workouts = require("./Workouts");

const Bloques = sequelize.define("Bloques", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Bloques;