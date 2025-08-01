const express = require('express');
const router = express.Router();
const Descansos = require("../controllers/descansosController")

router.post("/descansos", Descansos.createDescanso);
router.put("/descansos/:id", Descansos.updateDescanso);

module.exports = router;