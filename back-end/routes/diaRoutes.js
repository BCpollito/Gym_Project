const express = require('express');
const router = express.Router();
const DiaController = require('../controllers/diaController');

router.post('/dia', DiaController.createDia); 
router.get('/dia/:id_semana', DiaController.getDiasBySemana); 
router.put('/dia/:id', DiaController.updateDia);
router.delete('/dia/:id', DiaController.deleteDia);

module.exports = router;