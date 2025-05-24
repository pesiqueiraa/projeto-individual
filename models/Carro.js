const db = require('../config/database');

class Carro {
    constructor(id, modelo, potencia, ano_fabricacao, marca_id, user_id, marca_nome = null, marca_logo = null) {
        this.id = id;
        this.modelo = modelo;
        this.potencia = potencia;
        this.ano_fabricacao = ano_fabricacao;
        this.marca_id = marca_id;
        this.user_id = user_id;
        this.marca_nome = marca_nome;
        this.marca_logo = marca_logo;
    }

    // Buscar todos os carros
    static async findAll() {
        try {
            const result = await db.query(`
                SELECT c.*, m.nome as marca_nome, m.logo_url as marca_logo 
                FROM carro c 
                LEFT JOIN marca m ON c.marca_id = m.id 
                ORDER BY c.id
            `);
            return result.rows.map(row => new Carro(
                row.id,
                row.modelo,
                row.potencia,
                row.ano_fabricacao,
                row.marca_id,
                row.user_id,
                row.marca_nome,
                row.marca_logo
            ));
        } catch (error) {
            throw new Error('Erro ao buscar carros: ' + error.message);
        }
    }

        // Buscar carro por ID
    static async findById(id) {
        try {
            const result = await db.query(`
                SELECT c.*, m.nome as marca_nome, m.logo_url as marca_logo 
                FROM carro c 
                LEFT JOIN marca m ON c.marca_id = m.id 
                WHERE c.id = $1
            `, [id]);
            if (result.rows.length === 0) {
                return null;
            }
            const row = result.rows[0];
            return new Carro(
                row.id, 
                row.modelo, 
                row.potencia, 
                row.ano_fabricacao, 
                row.marca_id, 
                row.user_id,
                row.marca_nome,
                row.marca_logo
            );
        } catch (error) {
            throw new Error('Erro ao buscar carro: ' + error.message);
        }
    }

    // Buscar carros por usuário
    static async findByUserId(userId) {
        try {
            const result = await db.query(`
                SELECT c.*, m.nome as marca_nome, m.logo_url as marca_logo 
                FROM carro c 
                LEFT JOIN marca m ON c.marca_id = m.id 
                WHERE c.user_id = $1 
                ORDER BY c.id
            `, [userId]);
            return result.rows.map(row => new Carro(
                row.id, 
                row.modelo, 
                row.potencia, 
                row.ano_fabricacao, 
                row.marca_id, 
                row.user_id,
                row.marca_nome,
                row.marca_logo
            ));
        } catch (error) {
            throw new Error('Erro ao buscar carros do usuário: ' + error.message);
        }
    }

    // Criar novo carro
    static async create(carroData) {
        try {
            const { modelo, potencia, ano_fabricacao, marca_id, user_id } = carroData;
            const result = await db.query(
                'INSERT INTO carro (modelo, potencia, ano_fabricacao, marca_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [modelo, potencia, ano_fabricacao, marca_id, user_id]
            );
            const row = result.rows[0];
            return new Carro(row.id, row.modelo, row.potencia, row.ano_fabricacao, row.marca_id, row.user_id);
        } catch (error) {
            throw new Error('Erro ao criar carro: ' + error.message);
        }
    }
    // Atualizar carro
    static async update(id, carroData) {
        try {
            const { modelo, potencia, ano_fabricacao, marca_id, user_id } = carroData;
            const result = await db.query(
                'UPDATE carro SET modelo = $1, potencia = $2, ano_fabricacao = $3, marca_id = $4, user_id = $5 WHERE id = $6 RETURNING *',
                [modelo, potencia, ano_fabricacao, marca_id, user_id, id]
            );
            if (result.rows.length === 0) {
                return null;
            }
            const row = result.rows[0];
            return new Carro(row.id, row.modelo, row.potencia, row.ano_fabricacao, row.marca_id, row.user_id);
        } catch (error) {
            throw new Error('Erro ao atualizar carro: ' + error.message);
        }
    }

        // Deletar carro
    static async delete(id) {
        try {
            const result = await db.query('DELETE FROM carro WHERE id = $1 RETURNING *', [id]);
            return result.rows.length > 0;
        } catch (error) {
            throw new Error('Erro ao deletar carro: ' + error.message);
        }
    }
}

module.exports = Carro;