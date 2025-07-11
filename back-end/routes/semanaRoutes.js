const express = require('express');
const router = express.Router();
const SemanaController = require('../controllers/semanaController');

// Rutas para la semana
router.post("/semana", SemanaController.createSemana);
// Obtener todas las semanas
router.get("/semanas", SemanaController.getAllSemanas);
//obtener semanas por cliente
router.get("/semanas/cliente/:id", SemanaController.getSemanasByCliente);
router.put("/semanas/:id", SemanaController.updateSemana);
router.delete("/semanas/:id", SemanaController.deleteSemana);

module.exports = router;
