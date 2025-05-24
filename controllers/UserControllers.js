const User = require('../models/User.js')

class UserController {
    // GET /users - Listar todos os usuários
    static async index(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({
                message: 'Users encontrados',
                data: users
            });
        } catch (error) {
            res.status(500).json({
                message: 'Erro interno do servidor',
                error: error.message
            });
        }
    }

        // GET /users/:id - Listar user específico

    static async show(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id)

            if (!user) {
                return res.status(404).json({
                    message: 'Usuario não encontrado'
                })
            }
            res.status(200).json({
                message: "Usuario encontrado",
                data: user
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: error.message
            });
        }
    }
}

module.exports = UserController;