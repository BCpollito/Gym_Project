const express = require('express');
const router = express.Router();
const Ejercicios = require('../controllers/ejercicioController');

router.post('/ejercicio', Ejercicios.createEjercicio);
router.get('/ejercicio', Ejercicios.getEjercicios);
router.put('/ejercicio/:id', Ejercicios.updateEjercicio);
router.delete('/ejercicio/:id', Ejercicios.deleteEjercicio);

module.exports = router;
