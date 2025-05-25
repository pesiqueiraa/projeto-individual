const db = require('../config/database');



class Marca {
    constructor(id, nome, logo_url) {
        this.id = id;
        this.nome = nome;
        this.logo_url = logo_url;
    }

    // Buscar todas as marcas
    static async findAll() {
        try {
            const result = await db.query('SELECT * FROM marca ORDER BY nome');
            return result.rows.map(row => new Marca(row.id, row.nome, row.logo_url));
        } catch (error) {
            throw new Error('Erro ao buscar marcas: ' + error.message);
        }
    }
}

module.exports = Marca;