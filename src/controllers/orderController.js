const { criarPedido, listarPedidos } = require('../models/orderModel');
const { adicionarItem } = require('../models/orderItemModel');

async function novoPedido(req, res) {
  try {
    const { dadosPedido, itens } = req.body;
    const pedidoId = await criarPedido(dadosPedido);

    for (let item of itens) {
      await adicionarItem(pedidoId, item.produto_id, item.quantidade, item.preco_unitario);
    }

    res.json({ mensagem: 'Pedido criado com sucesso!', pedidoId });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function getPedidos(req, res) {
  const { usuario_id } = req.params;
  const pedidos = await listarPedidos(usuario_id);
  res.json(pedidos);
}

module.exports = { novoPedido, getPedidos };