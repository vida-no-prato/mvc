const Categoria = require("../models/categoria");

exports.listar = async (req, res) => {
  const categorias = await Categoria.listar();
  res.json(categorias);
   console.log(req.body);
};

exports.criar = async (req, res) => {
  console.log(req.body);
  const { nome, chave, emoji, descricao } = req.body;
  await Categoria.criar({ nome, chave, emoji, descricao });
  res.json({ success: true });
};

exports.editar = async (req, res) => {
  const { id } = req.params;
  const { nome, chave, emoji, descricao } = req.body;
  await Categoria.editar(id, { nome, chave, emoji, descricao });
  res.json({ success: true });
};

exports.excluir = async (req, res) => {
  const { id } = req.params;
  await Categoria.excluir(id);
  res.json({ success: true });
};