const pool = require("../config/banco-dados");

class Usuario {
  static async listar() {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    return rows;
  }

  static async criar({ nome, email, telefone, senha }) {
    await pool.query(
      "INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)",
      [nome, email, telefone, senha]
    );
  }
}

module.exports = Usuario;