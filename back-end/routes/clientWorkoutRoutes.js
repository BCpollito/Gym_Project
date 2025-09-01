const express = require('express');
const router = express.Router();
const ClientWorkouts = require('../controllers/clientworkoutController');

router.post('/assign-workout', ClientWorkouts.assignWorkoutToClient);
router.get('/client-workouts/:clienteID', ClientWorkouts.getWorkoutsByClientId);
router.delete('/client-workout/:id', ClientWorkouts.deleteClienteWorkout);

module.exports = router;