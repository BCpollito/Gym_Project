const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Workouts = require('./Workouts');
const Registro = require('./Registro');

const ClientWorkout = sequelize.define("ClientWorkout", {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    clienteID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Registro,
            key: 'id'
        }
    },
    workoutID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Workouts,
            key: 'id'
        }
    },
    dateAssign:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, {
    timestamps: false,
});

module.exports = ClientWorkout;