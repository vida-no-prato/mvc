const { connect } = require('../database/connection');
const bcrypt = require('bcryptjs');

async function criarUsuario(nome, email, telefone, senha) {
  const conn = await connect();
  const hash = await bcrypt.hash(senha, 10);
  const [result] = await conn.execute(
    'INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)',
    [nome, email, telefone, hash]
  );
  conn.end();
  return result.insertId;
}

async function buscarPorEmail(email) {
  const conn = await connect();
  const [rows] = await conn.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  conn.end();
  return rows[0];
}

module.exports = { criarUsuario, buscarPorEmail };
