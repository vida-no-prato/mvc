const { connect } = require('../database/connection');

async function listarCategorias() {
  const conn = await connect();
  const [rows] = await conn.execute('SELECT * FROM categorias');
  conn.end();
  return rows;
}

module.exports = { listarCategorias };