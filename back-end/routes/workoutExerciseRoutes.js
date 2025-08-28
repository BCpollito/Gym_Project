const express = require('express');
const router = express.Router();
const WorkoutExercises = require('../controllers/workoutExerciseController');

router.get('/workoutExercises/:idelement', WorkoutExercises.FindAllByBlockId);
router.post('/workoutExercise', WorkoutExercises.addExerciseToBlock);
router.delete('/workoutExercise/:idelement', WorkoutExercises.DeleteByID);

module.exports = router;