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

    // POST /carros - Criar novo carro
    static async create(req, res) {
        try {
            const { modelo, potencia, ano_fabricacao, marca_id, user_id } = req.body;

            if (!modelo || !potencia || !marca_id || !user_id) {
                return res.status(400).json({
                    success: false,
                    message: 'Modelo, potência, marca_id e user_id são obrigatórios'
                });
            }

            if (typeof potencia !== 'number' || potencia <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Potência deve ser um número maior que zero'
                });
            }

            if (ano_fabricacao && (typeof ano_fabricacao !== 'number' || ano_fabricacao < 1900 || ano_fabricacao > new Date().getFullYear() + 1)) {
                return res.status(400).json({
                    success: false,
                    message: 'Ano de fabricação deve ser um ano válido'
                });
            }

            const newCarro = await Carro.create({ 
                modelo, 
                potencia, 
                ano_fabricacao, 
                marca_id, 
                user_id 
            });
            
            res.status(201).json({
                success: true,
                message: 'Carro criado com sucesso',
                data: newCarro
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: error.message
            });
        }
    }
    // PUT /carros/:id - Atualizar carro (sem validação)
static async update(req, res) {
    try {
        const { id } = req.params;
        const { modelo, potencia, ano_fabricacao, marca_id, user_id } = req.body;

        const existingCarro = await Carro.findById(id);
        if (!existingCarro) {
            return res.status(404).json({
                success: false,
                message: 'Carro não encontrado'
            });
        }

        const updatedCarro = await Carro.update(id, { 
            modelo, 
            potencia, 
            ano_fabricacao, 
            marca_id, 
            user_id 
        });

        res.status(200).json({
            success: true,
            message: 'Carro atualizado com sucesso',
            data: updatedCarro
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

// DELETE /carros/:id - Deletar carro
    static async delete(req, res) {
        try {
            const { id } = req.params;

            // Verificar se carro existe
            const existingCarro = await Carro.findById(id);
            if (!existingCarro) {
                return res.status(404).json({
                    success: false,
                    message: 'Carro não encontrado'
                });
            }

            const deleted = await Carro.delete(id);
            
            if (deleted) {
                res.status(200).json({
                    success: true,
                    message: 'Carro deletado com sucesso'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Erro ao deletar carro'
                });
            }
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