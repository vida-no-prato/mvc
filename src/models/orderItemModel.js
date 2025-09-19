const { connect } = require('../database/connection');

async function adicionarItem(pedido_id, produto_id, quantidade, preco_unitario) {
  const conn = await connect();
  const subtotal = quantidade * preco_unitario;
  await conn.execute(
    `INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario, subtotal)
     VALUES (?, ?, ?, ?, ?)`,
    [pedido_id, produto_id, quantidade, preco_unitario, subtotal]
  );
  conn.end();
}

module.exports = { adicionarItem };