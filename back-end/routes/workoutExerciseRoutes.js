const express = require('express');
const router = express.Router();
const WorkoutExercises = require('../controllers/workoutExerciseController');

router.post('/workoutExercise', WorkoutExercises.addExerciseToBlock);