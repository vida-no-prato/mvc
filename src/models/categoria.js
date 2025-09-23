const pool = require("../config/banco-dados");

class Categoria {
  static async listar() {
    const [rows] = await pool.query("SELECT * FROM categorias");
    return rows;
  }

  static async criar({ nome, slug, emoji }) {
    await pool.query(
      "INSERT INTO categorias (nome, slug, emoji) VALUES (?, ?, ?)",
      [nome, slug, emoji]
    );
  }
}

module.exports = Categoria;