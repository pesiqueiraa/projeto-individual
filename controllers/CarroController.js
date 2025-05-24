const Carro = require('../models/Carro');

class CarroController {
    // GET /carros - Listar todos os carros
    static async index(req, res) {
        try {
            const carros = await Carro.findAll();
            res.status(200).json({
                success: true,
                message: 'Carros encontrados com sucesso',
                data: carros
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: error.message
            });
        }
    }
}

module.exports = CarroController;