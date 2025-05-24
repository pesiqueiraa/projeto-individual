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
}

module.exports = User;