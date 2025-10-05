const pool = require("../config/banco-dados");
const bcrypt = require('bcryptjs'); // Certifique-se de que bcryptjs está importado

class Usuario {
  static async listar() {
    const [rows] = await pool.query("SELECT id, nome, email, telefone FROM usuarios");
    return rows;
  }

  static async criar({ nome, email, telefone, senha }) {
    // Criptografa a senha antes de salvar
    const hash = await bcrypt.hash(senha, 10); // MODIFICADO

    const [result] = await pool.query(
      "INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)",
      // Salva o hash, e não a senha original
      [nome, email, telefone, hash] // MODIFICADO
    );
    return result.insertId;
  }

  // Adicionando a função buscarPorEmail que estava faltando neste arquivo
  static async buscarPorEmail(email) {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    return rows[0];
  }
}

module.exports = Usuario;