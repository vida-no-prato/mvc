const pool = require("../config/banco-dados");

class Produto {
  static async listar() {
    try {
      const [rows] = await pool.query(`
        SELECT p.*, c.nome as categoria, c.slug as categoria_slug 
        FROM produtos p 
        JOIN categorias c ON p.categoria_id = c.id
      `);
      return rows;
    } catch (err) {
      console.error('Erro ao listar produtos:', err);
      return [];
    }
  }

  static async criar({ categoria_id, nome, descricao, preco, emoji, imagem }) {
    await pool.query(
      "INSERT INTO produtos (categoria_id, nome, descricao, preco, emoji, imagem) VALUES (?, ?, ?, ?, ?, ?)",
      [categoria_id, nome, descricao, preco, emoji, imagem]
    );
  }

  static async editar(id, { categoria_id, nome, descricao, preco, emoji, imagem }) {
    await pool.query(
      "UPDATE produtos SET categoria_id=?, nome=?, descricao=?, preco=?, emoji=?, imagem=? WHERE id=?",
      [categoria_id, nome, descricao, preco, emoji, imagem, id]
    );
  }

  static async excluir(id) {
    await pool.query("DELETE FROM produtos WHERE id=?", [id]);
  }
}

module.exports = Produto;