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

        // GET /marcas/:id - Buscar marca por ID
    static async show(req, res) {
        try {
            const { id } = req.params;
            const marca = await Marca.findById(id);
            
            if (!marca) {
                return res.status(404).json({
                    success: false,
                    message: 'Marca não encontrada'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Marca encontrada com sucesso',
                data: marca
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