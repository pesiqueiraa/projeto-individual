const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserControllers.js')

// Rota para listar todos os usuários
router.get('/users', UserController.index)

module.exports = router;