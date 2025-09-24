const Produto = require("../models/produto");

exports.listar = async (req, res) => {
  const produtos = await Produto.listar();
  res.json(produtos);
};

exports.criar = async (req, res) => {
  const { categoria_id, nome, descricao, preco, emoji } = req.body;
  await Produto.criar({ categoria_id, nome, descricao, preco, emoji });
  res.json({ success: true });
};

exports.editar = async (req, res) => {
  const { id } = req.params;
  const { categoria_id, nome, descricao, preco, emoji } = req.body;
  await Produto.editar(id, { categoria_id, nome, descricao, preco, emoji });
  res.json({ success: true });
};

exports.excluir = async (req, res) => {
  const { id } = req.params;
  await Produto.excluir(id);
  res.json({ success: true });
};