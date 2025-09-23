const pool = require("../config/banco-dados");

class Pedido {
  static async listar() {
    const [rows] = await pool.query(`
      SELECT p.*, u.nome as usuario 
      FROM pedidos p 
      JOIN usuarios u ON p.usuario_id = u.id
    `);
    return rows;
  }

  static async criar({ usuario_id, cep, cidade, endereco, numero, bairro, metodo_pagamento, subtotal, total }) {
    const numero_pedido = "PED" + Date.now();
    await pool.query(
      `INSERT INTO pedidos 
        (numero_pedido, usuario_id, cep, cidade, endereco, numero, bairro, metodo_pagamento, subtotal, total) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [numero_pedido, usuario_id, cep, cidade, endereco, numero, bairro, metodo_pagamento, subtotal, total]
    );
  }
}

module.exports = Pedido;