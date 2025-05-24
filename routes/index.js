const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserControllers.js')

// Rota para listar todos os usuários
router.get('/users', UserController.index)

// Rota para listar user específico
router.get('/users/:id', UserController.show)

// Rota para criar user
router.post('/users', UserController.create)

module.exports = router;