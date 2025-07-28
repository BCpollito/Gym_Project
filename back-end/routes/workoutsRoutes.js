const express = require("express");
const router = express.Router();
const Workouts = require("../controllers/workoutsController");

router.post('/workouts', Workouts.createWorkout);
router.get('/workouts', Workouts.getAllWorkout);
router.put('/workouts/:id', Workouts.updateWorkout);
router.delete('/workouts/:id', Workouts.deleteWorkout);

module.exports = router;