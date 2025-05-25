const Marca = require('../models/Marca');

class MarcaController {
    // GET /marcas - Listar todas as marcas
    static async index(req, res) {
        try {
            const marcas = await Marca.findAll();
            res.status(200).json({
                success: true,
                message: 'Marcas encontradas com sucesso',
                data: marcas
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
module.exports = MarcaController;