const db = require('../config/database');
class User {
    constructor(id, nome, email, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
    // Buscar todos os usuários
    static async findAll() {
        try {
            const result = await db.query('SELECT * FROM users ORDER BY id');
            return result.rows.map(row => new User(row.id, row.nome, row.email, row.senha));
        } catch (error) {
            throw new Error('Erro ao buscar usuários: ' + error.message);
        }
    }

    // Buscar user por id
    static async findById(id) {
        try {
            const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
            if (result.rows.length === 0) {
                return null
            }
            const row = result.rows[0]
            return new User(row.id, row.nome, row.email, row.senha);
        } catch (error) {
            throw new Error('Erro ao buscar usuário: ' + error.message)
        }
    }

    // Criar novo usuário
    static async create(userData) {
        try {
            const { nome, email, senha } = userData;
            const result = await db.query(
                'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
                [nome, email, senha]
            );
            const row = result.rows[0];
            return new User(row.id, row.nome, row.email, row.senha);
        } catch (error) {
            console.error('Erro no model User.create:', error);
            throw error;
        }

    }

    // Atualizar usuário
    static async update(id, userData) {
        try {
            const { nome, email, senha } = userData;
            const result = await db.query(
                'UPDATE users SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
                [nome, email, senha, id]
            );
            if (result.rows.length === 0) {
                return null;
            }
            const row = result.rows[0];
            return new User(row.id, row.nome, row.email, row.senha);
        } catch (error) {
            throw new Error('Erro ao atualizar usuário: ' + error.message);
        }
    }
}

module.exports = User;