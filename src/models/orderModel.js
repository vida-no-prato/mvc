const { connect } = require('../database/connection');

async function criarPedido(dados) {
  const conn = await connect();
  const {
    numero_pedido, usuario_id, cep, cidade, endereco, numero,
    bairro, complemento, observacoes, metodo_pagamento,
    cartao_numero, cartao_nome, troco_para, subtotal, taxa_entrega, total
  } = dados;

  const [result] = await conn.execute(
    `INSERT INTO pedidos 
    (numero_pedido, usuario_id, cep, cidade, endereco, numero, bairro, complemento, observacoes,
     metodo_pagamento, cartao_numero, cartao_nome, troco_para, subtotal, taxa_entrega, total) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [numero_pedido, usuario_id, cep, cidade, endereco, numero, bairro, complemento, observacoes,
     metodo_pagamento, cartao_numero, cartao_nome, troco_para, subtotal, taxa_entrega, total]
  );
  conn.end();
  return result.insertId;
}

async function listarPedidos(usuario_id) {
  const conn = await connect();
  const [rows] = await conn.execute(
    `SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY data_pedido DESC`,
    [usuario_id]
  );
  conn.end();
  return rows;
}

module.exports = { criarPedido, listarPedidos };
