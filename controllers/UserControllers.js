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

    // POST /users - Criar novo usuário
    static async create(req, res) {
        try {
            const { nome, email, senha } = req.body;

            // Validação básica
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    success: false,
                    message: 'Nome, email e senha são obrigatórios'
                });
            }

            const newUser = await User.create({ nome, email, senha });

            res.status(201).json({
                success: true,
                message: 'Usuário criado',
                data: newUser
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: error.message
            });
        }
    }

    // PUT /users/:id - Atualizar usuário
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;

            // Validação básica
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    success: false,
                    message: 'Nome, email e senha são obrigatórios'
                });
            }

            // Verificar se usuário existe
            const existingUser = await User.findById(id);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            const updatedUser = await User.update(id, { nome, email, senha });

            res.status(200).json({
                success: true,
                message: 'Usuário atualizado com sucesso',
                data: updatedUser
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: error.message
            });
        }
    }

    // DELETE /users/:id - Deletar usuário
    static async delete(req, res) {
        try {
            const { id } = req.params;

            // Verificar se usuário existe
            const existingUser = await User.findById(id);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            const deleted = await User.delete(id);

            if (deleted) {
                res.status(200).json({
                    success: true,
                    message: 'Usuário deletado com sucesso'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Erro ao deletar usuário'
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

    // POST /users/login - Login do usuário
    static async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    success: false,
                    message: 'Email e senha são obrigatórios'
                });
            }

            const user = await User.findByEmail(email);
            if (!user || user.senha !== senha) {
                return res.status(401).json({
                    success: false,
                    message: 'Email ou senha incorretos'
                });
            }

            const userResponse = {
                id: user.id,
                nome: user.nome,
                email: user.email
            };

            res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso',
                data: userResponse
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

module.exports = UserController;