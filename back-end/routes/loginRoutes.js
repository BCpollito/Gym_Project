const express = require('express');
const router = express.Router();
const Login = require('../controllers/loginController');

router.post('/login', Login.login);

module.exports = router;