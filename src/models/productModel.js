const { connect } = require('../database/connection');

async function listarProdutos() {
  const conn = await connect();
  const [rows] = await conn.execute(
    `SELECT p.*, c.nome AS categoria 
     FROM produtos p 
     JOIN categorias c ON p.categoria_id = c.id`
  );
  conn.end();
  return rows;
}

module.exports = { listarProdutos };
