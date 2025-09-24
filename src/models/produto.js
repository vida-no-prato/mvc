const pool = require("../config/banco-dados");

class Produto {
  static async listar() {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.nome as categoria 
      FROM produtos p 
      JOIN categorias c ON p.categoria_id = c.id
    `);
    return rows;
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    return [];
  }
}

  static async criar({ categoria_id, nome, descricao, preco, emoji }) {
    await pool.query(
      "INSERT INTO produtos (categoria_id, nome, descricao, preco, emoji) VALUES (?, ?, ?, ?, ?)",
      [categoria_id, nome, descricao, preco, emoji]
    );
  }

  static async editar(id, { categoria_id, nome, descricao, preco, emoji }) {
    await pool.query(
      "UPDATE produtos SET categoria_id=?, nome=?, descricao=?, preco=?, emoji=? WHERE id=?",
      [categoria_id, nome, descricao, preco, emoji, id]
    );
  }

  static async excluir(id) {
    await pool.query("DELETE FROM produtos WHERE id=?", [id]);
  }
}

module.exports = Produto;