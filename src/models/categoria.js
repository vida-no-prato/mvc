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

  static async temProdutos(id) {
    const [rows] = await pool.query("SELECT COUNT(*) AS cnt FROM produtos WHERE categoria_id = ?", [id]);
    return rows && rows[0] && rows[0].cnt > 0;
  }

  // Forçar exclusão de categoria: antes apaga todos os produtos da categoria (e itens_pedido relacionados)
  static async excluirComProdutos(id) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Busca produtos desta categoria
      const [produtos] = await connection.query("SELECT id FROM produtos WHERE categoria_id = ?", [id]);

      // Para cada produto, apaga itens_pedido e o produto
      for (const p of produtos) {
        await connection.query("DELETE FROM itens_pedido WHERE produto_id = ?", [p.id]);
        await connection.query("DELETE FROM produtos WHERE id = ?", [p.id]);
      }

      // Por fim, apaga a categoria
      await connection.query("DELETE FROM categorias WHERE id = ?", [id]);

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = Categoria;