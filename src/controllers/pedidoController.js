const Pedido = require("../models/pedido");

exports.listar = async (req, res) => {
  const pedidos = await Pedido.listar();
  res.render("pedidos", { pedidos });
};

exports.criar = async (req, res) => {
  const { usuario_id, cep, cidade, endereco, numero, bairro, metodo_pagamento, subtotal, total } = req.body;
  await Pedido.criar({ usuario_id, cep, cidade, endereco, numero, bairro, metodo_pagamento, subtotal, total });
  res.redirect("/pedidos");
};