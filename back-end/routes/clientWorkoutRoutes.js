const express = require('express');
const router = express.Router();
const ClientWorkouts = require('../controllers/clientworkoutController');

router.post('/assign-workout', ClientWorkouts.assignWorkoutToClient);
router.get('/client-workouts/:clienteID', ClientWorkouts.getWorkoutsByClientId);
router.delete('/client-workout/:id', ClientWorkouts.deleteClienteWorkout);
router.put('/client-workouts/reorder', ClientWorkouts.reorderClientWorkouts);
router.put('/client-workout/update-date:id', ClientWorkouts.updateClientWorkoutDate);

module.exports = router;