const pool = require("../config/banco-dados");

class Categoria {
  static async listar() {
    const [rows] = await pool.query(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM produtos p WHERE p.categoria_id = c.id) AS total_produtos
      FROM categorias c
    `);
    return rows;
  }

  static async criar({ nome, chave, emoji, descricao }) {
    await pool.query(
      "INSERT INTO categorias (nome, slug, emoji, descricao) VALUES (?, ?, ?, ?)",
      [nome, chave, emoji, descricao]
    );
  }

  static async editar(id, { nome, chave, emoji, descricao }) {
    await pool.query(
      "UPDATE categorias SET nome=?, slug=?, emoji=?, descricao=? WHERE id=?",
      [nome, chave, emoji, descricao, id]
    );
  }

  static async excluir(id) {
    await pool.query("DELETE FROM categorias WHERE id=?", [id]);
  }
}

module.exports = Categoria;