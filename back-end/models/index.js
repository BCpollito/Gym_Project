const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Importar modelos
const Workouts = require('./Workouts');
const Bloques = require('./Bloques');
const WorkoutExercises = require('./WorkoutExercises');
const Ejercicio = require('./Ejercicio');
const Descansos = require('./Descansos');
const WorkoutElementos = require('./WorkoutElementos');
const ClientWorkout = require('./ClientWorkout');
const Registro = require('./Registro');

// Relaciones

// Workout → Bloques
Workouts.hasMany(Bloques, {
  foreignKey: 'workoutID',
  onDelete: 'CASCADE',
});
Bloques.belongsTo(Workouts, { foreignKey: 'workoutID' });

// Bloques → WorkoutExercises
Bloques.hasMany(WorkoutExercises, {
  foreignKey: 'bloqueID',
  onDelete: 'CASCADE',
});
WorkoutExercises.belongsTo(Bloques, { foreignKey: 'bloqueID' });

// Ejercicio → WorkoutExercises
Ejercicio.hasMany(WorkoutExercises, {
  foreignKey: 'ejercicioID',
  onDelete: 'CASCADE',
});
WorkoutExercises.belongsTo(Ejercicio, { foreignKey: 'ejercicioID' });

// Workout → Descansos
Workouts.hasMany(Descansos, {
  foreignKey: 'workoutID',
  onDelete: 'CASCADE',
});
Descansos.belongsTo(Workouts, { foreignKey: 'workoutID' });

// Workout → WorkoutElementos
Workouts.hasMany(WorkoutElementos, {
  foreignKey: 'workoutID',
  onDelete: 'CASCADE',
});
WorkoutElementos.belongsTo(Workouts, { foreignKey: 'workoutID' });

// Registro → ClientWorkout
Registro.hasMany(ClientWorkout, {
  foreignKey: 'clienteID',
  onDelete: 'CASCADE',
});
ClientWorkout.belongsTo(Registro, { foreignKey: 'clienteID' });

module.exports = {
  sequelize,
  Sequelize,
  Workouts,
  Bloques,
  WorkoutExercises,
  Ejercicio,
  Descansos,
  WorkoutElementos,
  ClientWorkout,
  Registro
};
