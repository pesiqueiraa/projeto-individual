const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserControllers.js')
const CarroController = require('../controllers/CarroController.js')
const MarcaController = require('../controllers/MarcaController.js')

// ==== User ====
// Rota para listar todos os usuários
router.get('/users', UserController.index)

// Rota para listar user específico
router.get('/users/:id', UserController.show)

// Rota para criar user
router.post('/users', UserController.create)

// Rota para atualizar user
router.put('/users/:id', UserController.update)


// Rota para deletar user 
router.delete('/users/:id', UserController.delete);

// Rota para login do user
router.post('/users/login', UserController.login)

// ==== Carro ====

// Rota para listar todos os carros
router.get('/carros', CarroController.index);  

// Rota para criar carros
router.post('/carros', CarroController.create);

// Rota para atualizar carro
router.put('/carros/:id', CarroController.update);     


// Rota para deletar carro
router.delete('/carros/:id', CarroController.delete);     

// ==== Marca ====

// Rota para listar todas as marcas de carro
router.get('/marcas', MarcaController.index)

// Rota para mostrar uma marca especifica
router.get('/marcas/:id', MarcaController.show)

// Rota para criar marca
router.post('/marcas', MarcaController.create);    
module.exports = router;