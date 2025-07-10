const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Dia = sequelize.define(
  "Dia",
  {
    ID_dia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_semana: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Semana,
        key: "ID_semana",
      },
    },
    Dia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Dias",
  }
);

module.exports = Dia;