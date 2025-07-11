const express = require('express');
const router = express.Router();
const RegistroController = require('../controllers/registroController');

router.get('/registros', RegistroController.getAllRegistros);
router.get('/registros/:id', RegistroController.getRegistroById);
router.post('/registros', RegistroController.createRegistro);
router.delete('/registros/:id', RegistroController.deleteRegistro);
router.put('/registros/:id', RegistroController.editarRegistro);

module.exports = router;