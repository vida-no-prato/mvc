const pool = require("../config/banco-dados");

class Produto {
  static async listar() {
    const [rows] = await pool.query(`
      SELECT p.*, c.nome as categoria 
      FROM produtos p 
      JOIN categorias c ON p.categoria_id = c.id
    `);
    return rows;
  }

  static async criar({ categoria_id, nome, descricao, preco, emoji }) {
    await pool.query(
      "INSERT INTO produtos (categoria_id, nome, descricao, preco, emoji) VALUES (?, ?, ?, ?, ?)",
      [categoria_id, nome, descricao, preco, emoji]
    );
  }
}

module.exports = Produto;