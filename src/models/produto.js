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

  static async listarPorCategoria(slug) {
    try {
      const [rows] = await pool.query(`
        SELECT p.*, c.nome as categoria, c.slug as categoria_slug 
        FROM produtos p 
        JOIN categorias c ON p.categoria_id = c.id
        WHERE c.slug = ?
      `, [slug]);
      return rows;
    } catch (err) {
      console.error('Erro ao listar produtos por categoria:', err);
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

  // Forçar exclusão: remove primeiro os itens_pedido que referenciam o produto, depois o produto
  static async excluirComItens(id) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Apaga itens de pedido relacionados (se houver)
      await connection.query("DELETE FROM itens_pedido WHERE produto_id = ?", [id]);

      // Apaga o produto
      await connection.query("DELETE FROM produtos WHERE id = ?", [id]);

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = Produto;