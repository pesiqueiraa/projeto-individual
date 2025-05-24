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
}

module.exports = UserController;