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
}

module.exports = User;