const express = require('express');
const router = express.Router();
const Bloques = require("../controllers/bloquesController")

router.post("/bloques", Bloques.createblock);
router.put("/bloques/:id", Bloques.updateBlock);
router.delete("/bloques/:id",Bloques.deleteWorkout);

module.exports = router;