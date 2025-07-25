const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Workouts = sequelize.define("Workouts", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Workouts;
