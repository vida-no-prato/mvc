const pool = require("../config/banco-dados");

class Pedido {
  static async buscarPorUsuarioId(usuarioId) {
    const [pedidos] = await pool.query(
      `SELECT 
        id, 
        numero_pedido, 
        total, 
        status,
        DATE_FORMAT(data_pedido, '%d/%m/%Y às %H:%i') as data_formatada 
       FROM pedidos 
       WHERE usuario_id = ? 
       ORDER BY data_pedido DESC`,
      [usuarioId]
    );

    for (const pedido of pedidos) {
      const [itens] = await pool.query(
        `SELECT 
          ip.quantidade, 
          ip.preco_unitario, 
          p.nome as produto_nome, 
          p.imagem as produto_imagem
         FROM itens_pedido ip
         JOIN produtos p ON ip.produto_id = p.id
         WHERE ip.pedido_id = ?`,
        [pedido.id]
      );
      pedido.itens = itens;
    }
    return pedidos;
  }

  static async criar(dadosPedido) {
    const { 
        usuario_id, 
        endereco, 
        metodo_pagamento, 
        subtotal, 
        taxa_entrega, 
        total, 
        cart 
    } = dadosPedido;
    
    const numero_pedido = 'VP' + Date.now();
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [pedidoResult] = await connection.query(
        `INSERT INTO pedidos 
            (numero_pedido, usuario_id, cep, cidade, endereco, numero, bairro, metodo_pagamento, subtotal, taxa_entrega, total, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmado')`,
        [
            numero_pedido, 
            usuario_id, 
            endereco.cep, 
            endereco.cidade, 
            endereco.endereco, 
            endereco.numero || 'N/A', 
            endereco.bairro || 'N/A', 
            metodo_pagamento, 
            subtotal, 
            taxa_entrega, 
            total
        ]
      );
      const pedidoId = pedidoResult.insertId;

      for (const item of cart) {
        const itemSubtotal = item.quantity * item.preco;
        await connection.query(
          `INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario, subtotal) 
           VALUES (?, ?, ?, ?, ?)`,
          [pedidoId, item.id, item.quantity, item.preco, itemSubtotal]
        );
      }

      await connection.commit();
      return { success: true, numero_pedido };
    } catch (error) {
      await connection.rollback();
      console.error('Erro ao criar pedido:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = Pedido;