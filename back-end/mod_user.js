// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Registro = sequelize.define('Registro', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Registro;
