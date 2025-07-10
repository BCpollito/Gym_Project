const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Registro = sequelize.define(
    "registro",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        weight: { type: DataTypes.STRING, allowNull: false },
        height: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.STRING, allowNull: false },
        sex: { type: DataTypes.STRING, allowNull: false },
        isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { timestamps: false }
);

module.exports = Registro;


