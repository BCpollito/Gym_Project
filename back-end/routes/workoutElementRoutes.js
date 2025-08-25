const express = require("express");
const router = express.Router();
const WorkoutElementos = require("../controllers/workoutElementosController");

router.post("/workoutElement", WorkoutElementos.createElement);
router.delete("/workoutElement/:id", WorkoutElementos.deleteElement);

module.exports = router;